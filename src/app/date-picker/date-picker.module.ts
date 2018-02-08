import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { DatePickerComponent } from './date-picker.component';
import { SharedModule } from '../shared';
import { ClickOutsideModule } from '../click-outside';
import { MatInputModule, MatCardModule } from '@angular/material'
@NgModule({
	declarations: [
		DatePickerComponent,
	],
	imports: [
		DndModule.forRoot(),
		CommonModule,
		FormsModule,
		ClickOutsideModule,
		ReactiveFormsModule,
		MatInputModule,
		MatCardModule,
		SharedModule
	],
	providers: [ ],
	exports: [
		DatePickerComponent,
	]
})
export class DatePickerModule {
	constructor () { }
};
