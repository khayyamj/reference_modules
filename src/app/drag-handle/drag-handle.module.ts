import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragHandleComponent } from './drag-handle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatIconModule
	],
	declarations: [DragHandleComponent],
	exports: [DragHandleComponent],
})
export class DragHandleModule { }
