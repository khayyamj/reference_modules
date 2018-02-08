import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePickerComponent } from './time-picker.component';
import { ClockPickerComponent } from './clock-picker';
import { ClickOutsideModule } from '../click-outside';
import { MatInputModule, MatCardModule } from '@angular/material';
import { PipeModule } from '../pipes';

@NgModule({
	declarations: [
		TimePickerComponent,
		ClockPickerComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ClickOutsideModule,
		MatInputModule,
		MatCardModule,
		PipeModule,
		ReactiveFormsModule
	],
	exports: [
		TimePickerComponent,
		ClockPickerComponent,
	],
	providers: [
	]
}) export class TimePickerModule {

}
