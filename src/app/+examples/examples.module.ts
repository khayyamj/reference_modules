import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTCCommonModule } from '../common.module';
import { ExamplesComponent } from './examples.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';
import { PipeModule } from '../pipes';

@NgModule({
	declarations: [
		ExamplesComponent
	],
	imports: [
		CommonModule,
		MTCCommonModule,
		FormsModule,
		MatCheckboxModule,
		MatButtonModule,
		PipeModule
	],
	providers: [

	]
})
export class MTCExamplesModule {

};
