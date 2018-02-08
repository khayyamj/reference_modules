import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from '../click-outside';
import { MatInputModule, MatCardModule } from '@angular/material';
import { PipeModule } from '../pipes';
import { DaysPickerComponent } from './index';
import { SharedModule } from '../shared';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
	declarations: [
		DaysPickerComponent
	],
	imports: [
		CommonModule,
		ClickOutsideModule,
		MatInputModule,
		FlexLayoutModule,
		MatCardModule,
		PipeModule,
		SharedModule
	],
	exports: [
		DaysPickerComponent
	],
	providers: [
	]
})
export class DaysPickerModule { }
