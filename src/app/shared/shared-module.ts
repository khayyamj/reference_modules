import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { AutoCompleteDropdownComponent } from './auto-complete-dropdown';
import { MiniCalendarComponent } from './mini-calendar';
import { VertPositionService } from './vert-position';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
	declarations: [
		AutoCompleteDropdownComponent,
		MiniCalendarComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		DndModule.forRoot(),
	],
	exports: [
		AutoCompleteDropdownComponent,
		MiniCalendarComponent,
		FlexLayoutModule,
	],
	providers: [
		VertPositionService,
	]
}) export class SharedModule {
}
