import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MtcDatePipe } from '../pipes';
import { VertPositionService } from '../shared';

@Component({
	selector: 'mtc-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.less'],
	providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DatePickerComponent }]
})
export class DatePickerComponent implements ControlValueAccessor {
	@ViewChild('datePicker') datePicker: ElementRef
	@Input() title: string;
	@Input() showWeek: boolean;
	@Input() disabled: boolean;
	@Input() error: boolean;
	@Input() position: string;
	@Input() yearPicker: boolean;
	@Input() isAfter: any;
	@Input() isBefore: any;
	@Input() required = false;

	@Output() dateChange = new EventEmitter();
	@Output() endDateChange = new EventEmitter();
	range: boolean;
	dateFormat = 'DD MMM YYYY';
	internalStartDate: any;
	internalEndDate: any;
	showCalendar = false;
	offPage = false;
	displayDate: any;
	childControl = new FormControl();
	hover: boolean;
	formChange: (value: any) => void;
	calendarSize: number;

	@Input() setDisabled(date) {
		let disabled = false;
		if (this.isAfter) {
			if (this.isAfter === 'today') {
				this.isAfter = new Date();
			}
			if (date.isBefore(this.isAfter, 'day')) {
				disabled = true;
			}
		}
		if (this.isBefore) {
			if (this.isBefore === 'today') {
				this.isBefore = new Date();
			}
			if (date.isAfter(this.isBefore, 'day')) {
				disabled = true;
			}
		}
		return disabled;
	}
	@Input() set control(formControl) {
		if (formControl) {
			this.childControl.setErrors(formControl.errors);
			formControl.valueChanges.subscribe(() => {
				setTimeout(() => {
					this.childControl.setErrors(formControl.errors);
					this.childControl.setValue(formControl.value);
				});
			});
		}
	}
	@Input() set endDate(value) {
		this.range = true;
		if (value && moment(value).isValid()) {
			value = this.setDay(value);
			this.internalEndDate = moment(value);
		} else {
			this.internalEndDate = undefined;
			this.getDisplayDate();
		}
	}
	get endDate() {
		return this.internalEndDate ? moment(this.internalEndDate) : this.internalEndDate;
	}
	@Input() set date(value) {
		if (value && moment(value).isValid()) {
			value = this.setDay(value);
			this.internalStartDate = moment(value);
		} else {
			this.internalStartDate = undefined;
		}
		this.getDisplayDate();
	}
	get date() {
		return this.internalStartDate ? moment(this.internalStartDate) : this.internalStartDate;
	}

	constructor(public mtcDate: MtcDatePipe, private vertPosition: VertPositionService) { }

	setOffPage(): number {
		this.calendarSize = 220 + (this.yearPicker ? 40 : 0);
		if (this.datePicker.nativeElement) {
			return this.vertPosition.setPositionIfOffPage(this.datePicker.nativeElement.getBoundingClientRect(), this.calendarSize)
		}
	}

	public toggleCalendar() {
		if (!this.disabled) {
			this.showCalendar = !this.showCalendar;
		}
	}

	public hasTitle() {
		return this.title && this.title !== '';
	}

	public changeFirstDate(newDate) {
		if (newDate !== 'close') {
			const day = this.setDay(newDate);
			let emitDate;
			if (this.showWeek) {
				emitDate = moment(newDate).startOf('week');
				this.internalStartDate = emitDate.format(this.dateFormat);
			} else {
				emitDate = moment(newDate).startOf('day');
				this.internalStartDate = day.format(this.dateFormat);
			}
			if (!this.range) {
				this.showCalendar = false;
			}
			this.dateChange.emit(emitDate.toDate());
			if (this.formChange && !this.range) {
				this.formChange(emitDate.toDate());
			}
			this.getDisplayDate();
		} else {
			this.showCalendar = false;
		}
	}

	changeSecondDate(newDate) {
		if (newDate) {
			newDate = this.setDay(newDate);
			this.internalEndDate = newDate.format(this.dateFormat);
			this.endDateChange.emit(newDate.toDate());
		} else {
			this.internalEndDate = null;
			this.endDateChange.emit(null);
		}
		if (this.formChange) {
			this.formChange([this.date, this.endDate]);
		}
		this.getDisplayDate();
	}

	setDay(date: any = new Date()) {
		if (this.showWeek) {
			return moment(new Date(date)).add(1, 'week').startOf('week');
		} else {
			return moment(new Date(date)).startOf('day');
		}
	}

	getDisplayDate() {
		setTimeout(() => {
			this.displayDate = this.mtcDate.transform(this.internalStartDate, this.internalEndDate);
		});
	}

	changeDisplayDate() {
		if (this.displayDate) {
			let newDate = this.displayDate.split('- ');
			newDate = newDate.map((date) => { return date.split(''); });
			if (this.range && !newDate[1]) {
				newDate[1] = newDate[0];
			}
			if (newDate[1]) {
				newDate[1].forEach((letter, index) => { if (!newDate[0][index]) { newDate[0][index] = letter; } });
				this.endDate = this.setDay(newDate[1].join(''));
				this.endDateChange.emit(this.setDay(this.internalEndDate));
			}
			this.date = this.setDay(newDate[0].join(''));
			this.dateChange.emit(this.internalStartDate);
			this.getDisplayDate();
		} else {
			this.internalEndDate = null;
			this.endDateChange.emit(null);
			this.internalStartDate = null;
			this.dateChange.emit(null);
		}
	}

	writeValue(value: any) { }

	registerOnChange(formChange: (value: any) => void) {
		this.formChange = formChange;
	}
	registerOnTouched() { }

	isReadOnly() {
		return this.disabled || (this.range ? (!this.date || !this.endDate) : !this.date);
	}
}
