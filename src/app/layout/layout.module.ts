import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MTCLayoutComponent } from './layout.component';

@NgModule({
	declarations: [	MTCLayoutComponent ],
	imports: [
		CommonModule
	],
	providers: [ ],
	exports: [MTCLayoutComponent]
})
export class MTCLayoutModule {
	constructor () { }
};
