import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTCDialogComponent } from './dialog.component';
import { DynamicContentComponent } from './dynamic-content';
import { SimpleConfirmationComponent } from './simple-confirmation/simple-confirmation.component';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [
		MTCDialogComponent,
		SimpleConfirmationComponent,
		DynamicContentComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		FlexLayoutModule
	],
	exports: [
		SimpleConfirmationComponent,
		MTCDialogComponent,
		DynamicContentComponent
	],
	providers: [
	]
}) export class MTCDialogModule {

}
