import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from './switch.component';

@NgModule({
	declarations: [	SwitchComponent ],
	imports: [
		CommonModule,
		FormsModule
	],
	providers: [ ],
	exports: [ SwitchComponent ]
})
export class SwitchModule {
	constructor () { }
};
