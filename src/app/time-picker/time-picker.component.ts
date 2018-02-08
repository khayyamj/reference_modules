import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';
import * as moment from 'moment';

@Component({
	selector: 'mtc-time-picker',
	templateUrl: './time-picker.component.html',
	styleUrls: ['./time-picker.component.less'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TimePickerComponent },
		{ provide: NG_VALIDATORS, multi: true, useExisting: TimePickerComponent },
	]

})
export class TimePickerComponent implements OnInit, ControlValueAccessor, Validator {
	private _time: any;
	@Input() set time(time: Date) {
		if (time) {
			this._time = moment(time);
			let amPm;
			let noonAdjusted;
			if(this._time.hours() < 12) {
				amPm = 'am';
				noonAdjusted = this._time.hours() || 12;
			} else {
				amPm = 'pm';
				noonAdjusted = this._time.hours() - 12 || 12;
			}
			const hoursLeadingZeros = noonAdjusted < 10 ? '0' : '';
			const minutesLeadingZeros = this._time.minutes() < 10 ? '0' : '';
			const fullTime =  hoursLeadingZeros + noonAdjusted + ':' + minutesLeadingZeros + this._time.minutes() + ' ' + amPm;
			this.inputTime = fullTime;
			this.childControl.setValue(fullTime);
		}
	}
	get time() {
		return this._time;
	}
	@Output() changeTime = new EventEmitter();

	@Input() title: any;
	@Input() autoSwitch = false;
	@Input() isFormControl = false;
	@Input() required = false;
	public inputTime;
	public showClock = false;
	public dropUp = false;
	public childControl = new FormControl();
	private formChange: (value: any) => void;
	validTimeExpression = /(0?[1-9]|1[0-2]):[0-5][0-9](\s{1})?(am|pm)$/i;


	constructor() { this.childControl.setValidators(this.validate.bind(this)); }

	ngOnInit() {
		this.childControl.valueChanges.debounceTime(1000).subscribe(newTime => {
			if (this.validTimeExpression.test(newTime) && newTime !== this.inputTime) {
				const times = newTime.split(':');
				const minutes = times[1].substring(0,2)
				const amPm = times[1].substring(2).toLowerCase().includes('am') ? 0 : 12;
				const hours = times[0] === '12'? amPm : Number(times[0]) + amPm;
				this._time = moment(this._time);
				this._time.hours(hours);
				this._time.minutes(minutes);
				this.setTime(this._time);
			}
		});
	}

	toggleOpen() {
		if (!this._time) {
			this.time = new Date();
		}
		this.setTime(this._time);
		this.showClock = !this.showClock;
	}

	setTime(time: any) {
		if (this.formChange) {
			this.formChange(time);
		}
		this.time = time;
		this.changeTime.emit(this.time);
	}

	writeValue(value: any) {
		this.time = value;
	}

	registerOnChange(formChange: (value: any) => void) {
		this.formChange = formChange;
	}

	registerOnTouched() { }

	public validate(control) {
		if (control.value === '' && this.required) {
			return { required: true }
		}
		if (!this.validTimeExpression.test(control.value)) {
			return { invalidInput: true }
		}
	}

}
