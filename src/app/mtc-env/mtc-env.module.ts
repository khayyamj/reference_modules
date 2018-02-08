import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTCEnvComponent } from './mtc-env.component';
import { MTCAPIVersionsComponent } from './mtc-api-versions';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [ MTCEnvComponent, MTCAPIVersionsComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule
	],
	exports: [
		MTCEnvComponent
	],
	providers: [],
	entryComponents: [MTCAPIVersionsComponent]
}) export class MTCEnvModule {

}
