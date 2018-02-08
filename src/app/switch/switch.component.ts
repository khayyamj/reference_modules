import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mtc-switch',
	templateUrl: './switch.component.html',
	styleUrls: ['./switch.component.less']
})
export class SwitchComponent {
	@Input() model;
	@Output() modelChange = new EventEmitter();

	constructor() {
	}

	public onChange(model) {
		this.modelChange.emit(model);
	}
}
