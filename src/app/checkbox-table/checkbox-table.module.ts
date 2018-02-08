import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CheckboxTableComponent} from './checkbox-table.component';
import {ManageColumnsComponent} from './manage-columns';
import { CheckboxTableRowComponent } from './checkbox-table-row';
import { ClickOutsideModule } from '../click-outside';
import {DndModule} from 'ng2-dnd';
import { DragHandleModule } from '../drag-handle';
import { PipeModule } from '../pipes';
import {
	MatCheckboxModule,
	MatButtonModule,
	MatDialogModule,
	MatTooltipModule,
	MatInputModule
} from '@angular/material';

@NgModule({
	imports: [
		DndModule.forRoot(),
		FormsModule,
		CommonModule,
		FlexLayoutModule,
		MatCheckboxModule,
		MatButtonModule,
		MatDialogModule,
		PipeModule,
		MatTooltipModule,
		DragHandleModule,
		MatInputModule,
		ClickOutsideModule
	],
	exports: [
		CheckboxTableComponent,
		ManageColumnsComponent,
	],
	providers: [
	],
	declarations: [
		CheckboxTableComponent,
		ManageColumnsComponent,
		CheckboxTableRowComponent
	],
	entryComponents: [ManageColumnsComponent]
})
export class CheckboxTableModule {}
