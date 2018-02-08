/// <reference path="../mtc-auth/mtc-auth2.d.ts"/>

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class MTCAuthInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = MTCAuth.getToken();

		if (token) {
			const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token.accessToken}`) });
			return next.handle(authReq);
		}else{
			return next.handle(req);
		}
	}
}
