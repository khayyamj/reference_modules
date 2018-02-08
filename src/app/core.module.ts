import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MTCURL } from './mtc-url/mtc-url.service';
import { MTCUser } from './mtc-user/mtc-user.service';
import { MTCEmail, MTCSMS } from './messaging';


import { StorageApiService } from './+storage/storage-api.service';

import { MTCDialogService } from './dialog/dialog.service';
import { MTCToastService } from './mtc-toast/mtc-toast.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [MTCURL, MTCUser, StorageApiService, MTCDialogService, MTCToastService, MTCEmail, MTCSMS],
})
export class MTCCoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: MTCCoreModule,
			providers: []
		};
	}
	constructor (@Optional() @SkipSelf() parentModule: MTCCoreModule) {
		if (parentModule) {
			throw new Error('MTCCoreModule is already loaded. Import it in the AppModule only');
		}
	}
};
