import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MTCMultiAutoCompleteComponent } from './mtc-multi-auto-complete.component';
import { SharedModule } from '../shared';
import { MatInputModule } from '@angular/material';

@NgModule({
	declarations: [MTCMultiAutoCompleteComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		MatInputModule
	],
	exports: [
		MTCMultiAutoCompleteComponent,
	],
	providers: []
}) export class MTCMultiAutoCompleteModule {
}
