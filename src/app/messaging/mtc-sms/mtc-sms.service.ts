import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SMSOptions } from './mtc-sms-options';
import { SMSCarrier } from './mtc-sms-carriers';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Action } from '../mtc-email/mtc-email.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class MTCSMS {
	process: Subject<any> = new Subject<any>();
	resolved = true;
	carrier: SMSCarrier = null;

	constructor(private _http: HttpClient){}

	public setCarrier(carrier: SMSCarrier){
		if(SMSCarrier.isValidCarrier(carrier)){
			this.carrier = carrier;
		}
	}

	public send(options: SMSOptions) {
		if (this.carrier !== null){
			options.recipients = options.recipients.split(',').map(number => number.trim() + this.carrier.code).join(',');
		}

		this.resolved = false;

		return Observable.create((observer: any) => {
			this.process.next(Action.QueryStart);

			this._http.post('https://api.mtc.byu.edu/messaging/v1/sms', options)
				.finally(() => {
					this.process.next(Action.QueryStop);
				})
				.subscribe((res) => {
					this.resolved = true;
					observer.next(res);
					observer.complete();
				},
				(err) => {
					observer.error(err);
				});
		});
	}
}
