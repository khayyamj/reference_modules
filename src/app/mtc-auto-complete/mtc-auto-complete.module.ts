import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MTCAutoCompleteComponent } from './mtc-auto-complete.component';
import { AlphaNumericDirective, NumericDirective } from './validators';
import { SharedModule } from '../shared';
import { MatInputModule } from '@angular/material';


@NgModule({
	declarations: [MTCAutoCompleteComponent, AlphaNumericDirective, NumericDirective],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		MatInputModule
	],
	exports: [
		MTCAutoCompleteComponent,
		AlphaNumericDirective,
		NumericDirective
	],
	providers: []
}) export class MTCAutoCompleteModule {
}
