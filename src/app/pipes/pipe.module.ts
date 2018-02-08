import { NgModule } from '@angular/core';
import { MtcDatePipe } from './mtc-date';
import { MtcTimePipe } from './mtc-time';
import { TelephonePipe } from './telephone';
import { MomentPipe } from './moment-pipe';
import { YesNoPipe } from './yes-no';
import { DatePipe } from '@angular/common';

@NgModule({
	imports: [],
	declarations: [
		MtcDatePipe,
		MtcTimePipe,
		TelephonePipe,
		MomentPipe,
		YesNoPipe
	],
	exports: [
		MtcDatePipe,
		MtcTimePipe,
		TelephonePipe,
		MomentPipe,
		YesNoPipe
	],
	providers: [
		DatePipe,
		MtcDatePipe,
		MtcTimePipe,
		TelephonePipe,
		MomentPipe,
		YesNoPipe
	]
})

export class PipeModule {}
