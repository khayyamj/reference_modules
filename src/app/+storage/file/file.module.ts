import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTCFileComponent } from './file.component';
import {MTCLayoutModule} from '../../layout/layout.module';
import { MatIconModule } from '@angular/material'

@NgModule({
	declarations: [ MTCFileComponent ],
	imports: [
		CommonModule,
		MTCLayoutModule,
		MatIconModule
	],
	providers: [],
	// schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	exports: [MTCFileComponent]
})
export class MTCFileModule {

};
