import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'mini-calendar',
	templateUrl: './mini-calendar.component.html',
	styleUrls: ['./mini-calendar.component.less']
})
export class MiniCalendarComponent implements OnInit {
	@ViewChild('miniCalendar') miniCalendar: ElementRef;
	@Input() showWeek: boolean;
	@Input() firstDate: any;
	@Input() secondDate: any;
	@Input() range: boolean;
	@Input() yearPicker: boolean;
	@Input() isAfter: any;
	@Input() isBefore: any;

	@Output() changeFirstDate = new EventEmitter();
	@Output() changeSecondDate = new EventEmitter();
	@Output() offPage = new EventEmitter();

	public month: any;
	public weeks: any[];
	public dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	public hoverDate: any;
	private secondDateSelected: boolean;

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
	};

	constructor() { }

	ngOnInit() {
		if(this.secondDate){
			this.secondDateSelected = true;
		}
		const start = this.firstDate ?  moment(this.firstDate) : moment();
		this.month = start.clone();
		start.date(1);
		this._setMonthStartDay(start.day(0));
		this._buildMonth(start);
		this.checkIfOffPage();
	}

	@HostListener('document:keypress', ['$event'])
		handleKeyboardEvent(event: KeyboardEvent) {
			if(event.key === 'Enter'){
				if(this.firstDate && !this.secondDateSelected) {
					this.secondDate = this.firstDate;
					if(this.range){
						this.changeSecondDate.emit(this.secondDate);
					}
					this.changeFirstDate.emit((this.firstDate,'close'));
				}
			}
	}

	public getHighlight(day){
		if(this.showWeek && this.isInWeek(day)) {
			return;
		} else if(this.range) {
			if(this.firstDate && this.firstDate.isSame(day) && this.secondDate && this.secondDate.isSame(day)){
				return 'both';
			} else if (this.firstDate && this.firstDate.isBefore(day) && this.secondDate && this.secondDate.isAfter(day)){
				return 'in-range';
			} else if (this.secondDate && this.secondDate.isSame(day)){
				return 'right';
			} else if (this.firstDate && this.firstDate.isSame(day) || this.hoverDate && this.hoverDate.isSame(day)) {
				return 'left';
			}
		} else if (this.firstDate && this.firstDate.isSame(day) || this.hoverDate && this.hoverDate.isSame(day)){
			return 'both';
		}
	}

	public droppedDay(droppedOnDay,DraggedDay){
		if(!this.firstDate.isSame(this.secondDate)) {
			this.firstDate.isSame(DraggedDay.date) ? this.firstSelect(droppedOnDay) : this.secondSelect(droppedOnDay);
		} else {
			this.firstSelect(droppedOnDay);
			this.secondSelect(droppedOnDay);
		}
	}
	public setDropZones(day){
		if(this.firstDate && this.firstDate.isAfter(day)){
			return ['zone1'];
		} else if (this.secondDate && this.secondDate.isBefore(day)) {
			return ['zone2'];
		} else {
			return ['zone1','zone2'];
		}
	}
	public setDragDropZones(day){
		if(this.firstDate && this.firstDate.isSame(day.date) && this.secondDate && this.secondDate.isSame(day.date)) {
			return ['zone1','zone2'];
		} else if(this.firstDate && this.firstDate.isSame(day.date)){
			return ['zone1'];
		} else {
			return ['zone2'];
		}
	}

	public daySelect(day){
		if(!day.isCurrentMonth) {
			if(day.date.isBefore(this.month,'month')){
				this.previous();
			} else {
				this.next();
			}
		}
		if(!this.range || !this.firstDate){
			this.firstSelect(day);
		} else if (this.range && this.firstDate && (this.secondDateSelected || this.firstDate.isAfter(day.date))){
			this.firstSelect(day);
			this.secondDate = null;
			this.changeSecondDate.emit(null);
			this.secondDateSelected = false;
		} else if (this.range && this.firstDate.isSameOrBefore(day.date)){
			this.secondDateSelected = true;
			this.secondSelect(day);
		}
	}
	public firstSelect(day) {
		if (!day.disabled) {
			this.firstDate = day.date;
			this.changeFirstDate.emit(this.firstDate);
		}
	};

	public secondSelect(day) {
		if (!day.disabled) {
			this.secondDate = day.date;
			this.changeSecondDate.emit(this.secondDate);
		}
	};

	public setHoverDate(day){
		this.hoverDate = day;
		if(this.firstDate && this.range && !this.secondDateSelected && this.firstDate.isSameOrBefore(day)){
			this.changeSecondDate.emit(this.hoverDate);
		}
	}

	public isInWeek(day) {
		if (this.firstDate && this.firstDate.isSame) {
			if (this.showWeek) {
				const tempMoment = this.firstDate.clone().startOf('week');
				const otherTempMoment = this.firstDate.clone().endOf('week');
				return tempMoment.isSame(day) || (tempMoment.isBefore(day) && otherTempMoment.isAfter(day));
			} else {
				return this.firstDate.isSame(day) || (this.secondDate && this.secondDateSelected ? this.secondDate.isSame(day) : false);
			}
		}
		return false;
	};

	public next() {
		const next = this.month.clone();
		this._setMonthStartDay(next.month(next.month() + 1).date(1));
		this.month.month(this.month.month() + 1);
		this._buildMonth(next);
	};

	public previous() {
		const previous = this.month.clone();
		this._setMonthStartDay(previous.month(previous.month() - 1).date(1));
		this.month.month(this.month.month() - 1);
		this._buildMonth(previous);
	};

	public nextYear() {
		//make Array length 12 and fill with 1s to iterate
		Array(12).fill(1).forEach(() => {
			this.next();
		});
	}

	public previousYear() {
		//make Array length 12 and fill with 1s to iterate
		Array(12).fill(1).forEach(() => {
			this.previous();
		});
	}

	public _setMonthStartDay(date) {
		date.startOf('week');
	}

	public _buildWeek(date, month) {
		const days = [];
		for (let i = 0; i < 7; i++) {
			days.push({
				name: date.format('dd').substring(0, 1),
				numb: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(new Date(), 'day'),
				disabled: this.setDisabled(date),
				date: date
			});
			date = date.clone();
			date.add(1, 'd');
		}
		return days;
	}

	public _buildMonth(start) {
		this.weeks = [];
		const date = start.clone();
		let done = false;
		let monthIndex = date.month();
		let count = 0;
		while (!done) {
			this.weeks.push({ days: this._buildWeek(date.clone(), this.month) });
			date.add(1, 'w');
			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
		}
	}

	public checkIfOffPage() {
		//emits if calender is of page                    bottom of top part of calendar + height of rest of cal
		this.offPage.emit(this.miniCalendar.nativeElement.getBoundingClientRect().bottom + 230 > document.body.clientHeight);
	}

	public canDrag(date){
		return this.range && ((this.firstDate && this.firstDate.isSame(date)) || (this.secondDate && this.secondDate.isSame(date)));
	}

	public checkHoverDay() {
		if(!this.secondDateSelected){
			this.hoverDate = null;
			this.changeSecondDate.emit(this.firstDate);
		}
	}
}
