import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MTCAuthUser } from './mtc-user-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const TOKEN_INFO_URL = 'https://auth.mtc.byu.edu/oauth2/tokeninfo?access_token=';

@Injectable()
export class MTCUser {
	currUser: MTCAuthUser = {
		id: 'UNAUTHENTICATED_USER',
		name: 'Anonymous',
		roles: []
	};

	constructor(private http: HttpClient) {}

	private extractData(token: any): MTCAuthUser {
		this.currUser = Object.assign({}, token.user);
		this.currUser.environment = token.environment;
		return this.currUser;
	}

	public getUser(): Observable<MTCAuthUser> {
		const token = MTCAuth.getToken();
		// Check if we already have user
		if (this.currUser.id === 'UNAUTHENTICATED_USER' && (token && token.accessToken)) {
			// Get user from tokeninfo endpoint
			return this.http.get(TOKEN_INFO_URL + token.accessToken)
				.map((res) => this.extractData(res));
		} else {
			// Either user is unauthenticated or user already exists, either way send back whatever is in this.currUser
			return Observable.create((observer: any) => {
				observer.next(this.currUser);
				observer.complete();
			});
		}
	}

	public hasRole(role: string): boolean {
		if (!this.currUser || this.currUser.id === 'UNAUTHENTICATED_USER') {
			throw new Error('User roles is undefined, make sure you call getUser');
		}
		return this.currUser.roles.includes(role);
	}
}
