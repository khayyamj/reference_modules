import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailOptions } from './mtc-email-options';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/finally';

export enum Action { QueryStart, QueryStop };

@Injectable()
export class MTCEmail {
	process: Subject<any> = new Subject<any>();
	resolved = true;

	constructor(private _http: HttpClient){}

	public send(options: EmailOptions) {
		this.resolved = false;

		return Observable.create((observer: any) => {
			this.process.next(Action.QueryStart);

			this._http.post('https://api.mtc.byu.edu/messaging/v1/email', options)
				.finally(() => {
					this.process.next(Action.QueryStop);
				})
				.subscribe((res) => {
					observer.next(res);
					observer.complete();
					this.resolved = true;
				},
				(err) => {
					observer.error(err);
				});
		});
	}
}
