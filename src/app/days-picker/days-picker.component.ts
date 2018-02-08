import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { VertPositionService } from '../shared';
import * as moment from 'moment';

@Component({
	selector: 'mtc-days-picker',
	templateUrl: './days-picker.component.html',
	styleUrls: ['./days-picker.component.less']
})

export class DaysPickerComponent implements OnInit {
	@ViewChild('daysPicker') daysPicker: ElementRef;
	@Input() set isAfter(date){
		if(date === 'lastWeek'){
			date = moment().startOf('week');
		}
		this._isAfter = date;
	}
	@Input() isBefore: any;
	@Input() isDay:any = false;
	type:any = 'week';
	@Input() set date(date){
		if(date){
			if(date === 'thisWeek' || date === 'today'){
				date = moment();
			}
			this.type = this.isDay ? 'day' : 'week' ;
			this.startDate = date.clone().startOf(this.type);
		}
	};
	startDate = moment().startOf(this.type);
	@Output() changeWeek = new EventEmitter();
	@Output() dateChange = new EventEmitter();
	showCalendar = false;
	calendarSize: number;
	get endDate() {
		if(!this.isDay){
			return this.startDate.clone().endOf('week');
		}
	}
	_isAfter;
	get isAfter(){
		return this._isAfter;
	}

	constructor(private vertPosition: VertPositionService) { }

	ngOnInit() {}

	clickArrow(direction){
		this.startDate = this.startDate[direction](1, this.type).clone();
		this.emitDate();
	}

	emitDate(){
		this.isDay ? this.dateChange.emit(this.startDate): this.changeWeek.emit([this.startDate, this.endDate]);
	}

	setOffPage(): number {
		this.calendarSize = 220;
		if (this.daysPicker.nativeElement) {
			return this.vertPosition.setPositionIfOffPage(this.daysPicker.nativeElement.getBoundingClientRect(), this.calendarSize)
		}
	}

}
