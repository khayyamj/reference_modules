import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'mtc-clock-picker',
	templateUrl: './clock-picker.component.html',
	styleUrls: ['./clock-picker.component.less']
})
export class ClockPickerComponent implements OnInit {

	@ViewChild('clockPicker') private clockPicker: ElementRef;
	@Output() offPage = new EventEmitter();

	_time: any;
	minutes = 30;
	hours = 12;
	@Input() type = 'hours';
	@Input() autoSwitch: boolean;
	@Input() set time(time:any){
		if(time){
			this._time = time;
			this.hours = time.hours() > 12 ? time.hours() - 12 : time.hours();
			this.minutes = time.minutes();
		}
	}

	@Input() color = '#43B2E5';  // MTC Accent Blue

	get time(){
		return this._time;
	}
	@Output() changeTime = new EventEmitter();
	mouseDown = false;
	hoverAngle: number;
	highlightedMinute = false;
	clockNumbers: Array<any> = [];

	constructor(private datePipe: DatePipe) {
		this.createClockFace();
	}

	ngOnInit() {
		this.checkIfOffPage();
	}

	createClockFace():void {
		for (let i = 1; i <= 60; i++) {
			this.clockNumbers.push({
				tick: i,
				topPosition: 91 - (85 * Math.sin( (90 - (i * 6)) * Math.PI / 180 )),
				leftPosition: 91 + (85 * Math.cos((90 - (i * 6)) * Math.PI / 180)),
				minuteAngle: i * 6,
			})
		}
	}

	calculateMinutes(time:any){
		switch(this.type){
			case 'hours':
				const hours = time.hours() > 12 ? time.hours() - 12 : time.hours();
				this.minutes = hours * 5;
				break;
			case 'minutes':
				this.minutes = time.minutes();
				break;
		}
	}

	handleMouseDown() {
		this.mouseDown = true;
	}

	handleMouseUp() {
		this.mouseDown = false;
	}

	changeTimeLocal(event:any) {
		const containerCoords = event.currentTarget.getClientRects()[0];
		const x = event.clientX - ((event.currentTarget.offsetWidth / 2) + containerCoords.left);
		const y = event.clientY - ((event.currentTarget.offsetHeight / 2) + containerCoords.top);

		let degrees = Math.round((Math.atan2(y,x) * (180 / Math.PI))) + 90;
		if(degrees < 0){
			degrees = 360 + degrees;
		}
		if(event.type === 'mousemove' && !this.mouseDown){
			this.hoverAngle = degrees;
			return;
		}
		if(this.type === 'hours'){
			const additive = this._time.hours() < 12 ? 0 : 12;
			this.hours = Math.round(degrees / 30);
			if(this.hours === 12){
				this.hours = 0;
			}
			this._time.hours(this.hours + additive);
		}else{
			this.minutes = Math.round(degrees / 6);
			if(this.minutes === 60){
				this.minutes = 0;
			}
			this._time.minutes(this.minutes);
		}
		this.changeTime.emit(this._time);
		if(['mouseup', 'click'].indexOf(event.type) !== -1 && this.type === 'hours' && this.autoSwitch){
			this.type = 'minutes';
		}
	}

	changeMeridiem() {
		const additive = this._time.hours() < 12 ? 12 : -12;
		this._time.hours(this._time.hours()+additive);
		this.changeTime.emit(this._time);
	}

	isAM(){
		if(this._time){
			const meridiem = this.datePipe.transform(this._time.toDate(), 'a');
			return meridiem === 'AM';
		}
	}

	getRotationMinutes() {
		return this.type === 'hours' ? this.hours * 5 : this.minutes;
	}

	getDisplayNum(tick:string) {
		const n = Number(tick);
		if(this.type === 'hours'){
			return n % 5 ? null : n / 5;
		}else{
			return n % 5 ? ' ' : n === 60 ? 0 : n;
		}
	}

	hoverHighlight(hoverAngle: number, minuteAngle: number, minute: number): boolean {
		if (this.type === 'hours' && hoverAngle - 14 <= minuteAngle && hoverAngle + 15 >= minuteAngle) {
			return true;
		} else if (hoverAngle - 2 <= minuteAngle && hoverAngle + 3 >= minuteAngle) {
			minute % 5 !== 0 ? this.highlightedMinute = true : this.highlightedMinute = false;
			return true;
		} else {
			this.highlightedMinute = false;
			return false;
		}
	}

	checkIfOffPage(){
		if(this.clockPicker){
			if(this.clockPicker.nativeElement.getBoundingClientRect().bottom > document.body.clientHeight){
				this.offPage.emit(true);
			} else {
				this.offPage.emit(false);
			}
		}
	}

}
