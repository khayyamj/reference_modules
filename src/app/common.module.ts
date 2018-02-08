import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MTCMultiAutoCompleteComponent, MTCMultiAutoCompleteModule } from './mtc-multi-auto-complete';
import { MTCFileModule, MTCFileComponent } from './+storage/file';
import { MTCLayoutModule, MTCLayoutComponent } from './layout/';
import { MTCEnvModule, MTCEnvComponent } from './mtc-env';
import { MTCDialogComponent, SimpleConfirmationComponent, MTCDialogModule, DynamicContentComponent } from './dialog';
import { MTCToastComponent, MTCToastModule } from './mtc-toast';
import { ClickOutsideDirective, ClickOutsideModule } from './click-outside';
import { TimePickerModule, TimePickerComponent, ClockPickerComponent } from './time-picker';
import { MTCAutoCompleteComponent, MTCAutoCompleteModule, AlphaNumericDirective, NumericDirective } from './mtc-auto-complete';
import { DatePickerComponent, DatePickerModule } from './date-picker';
import { DaysPickerModule, DaysPickerComponent } from './days-picker';
import { SwitchComponent, SwitchModule } from './switch';
import { CheckboxTableComponent, CheckboxTableModule, ManageColumnsComponent } from './checkbox-table';
import {DragHandleModule } from './drag-handle';
import { PipeModule } from './pipes';
import { MiniCalendarComponent, SharedModule } from './shared';
@NgModule({
	declarations: [
	],
	imports: [
		CommonModule,
		FormsModule,
		MTCFileModule,
		MTCLayoutModule,
		MTCEnvModule,
		MTCDialogModule,
		MTCToastModule,
		ClickOutsideModule,
		DaysPickerModule,
		TimePickerModule,
		PipeModule,
		MTCAutoCompleteModule,
		MTCMultiAutoCompleteModule,
		DatePickerModule,
		SwitchModule,
		CheckboxTableModule,
		DragHandleModule,
		SharedModule
	],
	providers: [],
	exports: [
		MTCFileComponent,
		CheckboxTableComponent,
		ManageColumnsComponent,
		MTCLayoutComponent,
		MTCEnvComponent,
		MTCDialogComponent,
		MTCToastComponent,
		DaysPickerComponent,
		SimpleConfirmationComponent,
		DynamicContentComponent,
		ClickOutsideDirective,
		TimePickerComponent,
		ClockPickerComponent,
		MTCAutoCompleteComponent,
		MTCMultiAutoCompleteComponent,
		DatePickerComponent,
		SwitchComponent,
		AlphaNumericDirective,
		NumericDirective,
		DragHandleModule,
		MiniCalendarComponent
	]
})
export class MTCCommonModule { };
