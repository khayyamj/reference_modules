'use strict';

import {AuthConfig} from './mtc-auth2-config';

const TOKEN_REFRESH_REDUCTION = (60 * 1000 * 5); // 5 minutes
const AUTH_SESSION_STORAGE_KEY = 'mtc-auth2';
const LOGOUT_URL = 'https://auth.mtc.byu.edu/oauth2/logout';
class HTMLDialogElement {
	show: Function;
}

class MTCAuthService {

	private config: any = {
		clientId: '',
		contentUrls: [],
		scopes: [],
		redirectUri: true,
		options: {
			requestAuths: ''
		},
		newTabRedirectUri: false
	};

	private currentlyAuthing  = false;

	private listenerTimeout: number;

	private windowListeners: any = [];

	public configure (_config: AuthConfig): void {
		this.config = _config;
		const token = this.getToken();
		if (this.isValidToken(token)) {
			this.setEventListeners();
		} else {
			this.authenticate(true);
		}
	};

	public isAuthenticated (): boolean {
		const token = this.getToken();
		if (token != null && this.isValidToken(token)) {
			return true;
		}
		return false;
	}

	public authenticate (initialAuth?: boolean): void {
		if(this.config.isMobileApp){
			this.authenticateForMobile();
			return;
		}
		// CHECK IF TOKEN EXISTS IN URL
		if (window.location.href.includes('#access_token')) {
			const token = this.stripToken(window.location.href);
			if (token == null) {
				console.log('NO TOKEN FOR SOME WEIRD REASON, THIS SHOULD NOT HAPPEN!');
			}
			//Remove token from URL
			this.removeHash();
			this.setEventListeners();
			//added error catching just incase someone has session stroage disabled.
			try {
				const hash = window.sessionStorage.getItem('hash');
				if (hash) {
					window.location.href += hash;
					window.sessionStorage.removeItem('hash');
				}
			} catch (err) {}
		} else {
			// IF NO TOKEN, REDIRECT AND AUTHENTICATE
			if (this.config.newTabRedirectUri && !initialAuth) {
				this.currentlyAuthing = true;
				this.iframeRefresh();
			} else {
				//added error catching just incase someone has session stroage disabled.
				try {
					let hash: string;
					if (this.config.redirectUri === true) {
						hash = window.location.hash;
					} else {
						hash = window.location.href.substr(this.config.redirectUri.length);
					}
					window.sessionStorage.setItem('hash', hash);
				} catch (err) {}
				window.location.href = this.buildUrl(this.config);
			}
		}
	}

	private authenticateForMobile(){
		const ref = window.open(this.buildUrl(this.config),'_blank');
		ref.addEventListener('loadstart', (event:any) => {
			if (typeof String.prototype.startsWith !== 'function') {
				String.prototype.startsWith = function (str){
					return this.indexOf(str) === 0;
				};
			}
			if((event.url).startsWith('http://localhost:8100/')) {
				const token = this.stripToken(window.location.href);
				ref.close();
			}
		});
	}

	private iframeRefresh () {
		//I don't like this but I don't know how else to do it
		(<any>window).onChildClosed = (token: any) => {
			this.saveToken({
				accessToken: token.access_token,
				expiresIn: token.expires_in
			});
			this.currentlyAuthing = false;
			(<any>window).onAuthed();
			this.setEventListeners();
		};
		const mywindow = window.open(this.buildIframeUrl(this.config));
		if (!mywindow) {
			this.createDialog(con => {
				if (con) {
					this.iframeRefresh();
				} else {
					window.location.href = this.buildUrl(this.config);
				}
			});
		}
	}

	private createDialog(callback:Function){
		const dialog:any = document.createElement('Dialog');
		document.querySelector('body').appendChild(dialog);
		const ok = document.createElement('button');
		ok.innerText = 'ok';
		const cancel = document.createElement('button');
		cancel.innerText = 'cancel';
		dialog.appendChild(ok);
		dialog.appendChild(cancel);
		//TODO this wont compile with this in it
		// property show does not exist on dialog
		dialog.show();
	}

	private buildIframeUrl (config: any) {
		// Take config and build Auth URL from object
		let redirectUri: string;
		if (typeof config.newTabRedirectUri === 'string') {
			redirectUri =  config.newTabRedirectUri.toString();
		} else {
			redirectUri = window.location.href.split('#')[0];
			redirectUri += redirectUri.charAt(redirectUri.length - 1) !== '/' ? '/' : '';
			redirectUri += 'iframeRefresh.html';
		}
		const url = `https://auth.mtc.byu.edu/oauth2/auth?client_id=${config.clientId}&scope=${config.scopes.join(' ').replace(/\s/g, '%20')}` +
					`&state=&response_type=token&redirect_uri=${redirectUri}`;
		if (config.options && config.options.requestAuths) {
			url.concat('&request_auths=').concat(config.options.requestAuths);
		}
		return url;
	}

	private setEventListeners () {
		const token = this.getToken();
		const now = new Date().getTime();

		const timeoutDelay = token.expiresAt - now - TOKEN_REFRESH_REDUCTION;
		const that = this;
		if (timeoutDelay > 0) {
			this.listenerTimeout = window.setTimeout(() => {
				const service = new WindowEventListenersService();
				this.windowListeners.push(service.on('click', () => that.refreshToken()));
				this.windowListeners.push(service.on('keypress', () => that.refreshToken()));
				this.windowListeners.push(service.on('mousemove', () => that.refreshToken()));
				this.listenerTimeout = window.setTimeout(() => {
					this.removeEventListeners();
					this.windowListeners.push(service.on('click', () => that.reauth()));
					this.windowListeners.push(service.on('keypress', () => that.reauth()));
					this.windowListeners.push(service.on('mousemove',  () => that.reauth()));
					this.listenerTimeout = null;
				}, TOKEN_REFRESH_REDUCTION);
			},timeoutDelay);
		} else {
			this.refreshToken();
		}
	}

	private refreshToken () {
		const tokenString = this.getToken().accessToken;

		const that = this;
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const token = JSON.parse(this.responseText);
				that.saveToken({
					accessToken: token.access_token,
					expiresIn: token.expires_in
				});
				that.setEventListeners();
			} else {
				that.authenticate();
			}
		};

		xhttp.open('GET', this.buildRefreshUrl(this.config,tokenString), true);
		xhttp.setRequestHeader('Accept', 'application/json');
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.setRequestHeader('Authorization', `Bearer ${tokenString}`);
		xhttp.send();

		if (this.listenerTimeout) {
			window.clearTimeout(this.listenerTimeout);
		}

		//TODO implement refresh token when it is added to oauth
		//Currently we get a Method Not Allowed error here
		this.removeEventListeners();
	}

	private removeEventListeners () {
		this.windowListeners.forEach((listener) => {
			listener();
		})
		this.windowListeners = [];
	}

	private buildRefreshUrl (config: any, tokenString: string) {
		// Take config and build Auth refresh URL from object

		const redirectUri = (typeof config.redirectUri === 'string') ? config.redirectUri : window.location.href;
		//TODO figure out what url to call to refresh the token
		return `https://auth.mtc.byu.edu/oauth2/auth?client_id=${config.clientId}&scope=${config.scopes.join(' ').replace(/\s/g, '%20')}` +
				`&response_type=token&redirect_uri=${redirectUri}&state=initial&access_token=${tokenString}`;
	}


	private buildUrl (config: any) {
		// Take config and build Auth URL from object

		const redirectUri = (typeof config.redirectUri === 'string') ? config.redirectUri : window.location.href;
		const url = `https://auth.mtc.byu.edu/oauth2/auth?client_id=${config.clientId}&scope=${config.scopes.join(' ').replace(/\s/g, '%20')}` +
					`&state=&response_type=token&redirect_uri=${redirectUri}`;
		if (config.options && config.options.requestAuths) {
			url.concat('&request_auths=').concat(config.options.requestAuths);
		}
		return url;
	}

	private reauth () {
		if (!this.currentlyAuthing) {
			this.currentlyAuthing = true;
			this.removeEventListeners();
			this.authenticate();
		}
	}

	private stripToken (path:string) {
		const params: any = {}, queryString = path.substring(path.indexOf('#access_token')+1), regex = /([^&=]+)=([^&]*)/g;
		let m: any;
		while (m = regex.exec(queryString)) {
			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		if (params && params.access_token && params.expires_in) {
			const token = {
				accessToken: params.access_token,
				expiresIn: params.expires_in
			};
			this.saveToken(token);
			return true;
		}
		return false;
	}

	private removeHash () {
		history.pushState('', document.title, window.location.pathname + window.location.search);
	}

	private saveToken (token: any) {
		const now = Date.now();
		token.expiresAt = token.expiresAt || (now + (token.expiresIn * 1000));
		window.sessionStorage[AUTH_SESSION_STORAGE_KEY + '-' + this.config.clientId] = JSON.stringify(token);
	}

	public getToken () {
		const stringToken = window.sessionStorage[AUTH_SESSION_STORAGE_KEY + '-' + this.config.clientId];
		if (stringToken != null) {
			const token = JSON.parse(stringToken);
			const valid = this.isValidToken(token);
			if (valid) {
				// Make sure token is updated with new "expiresAt"
				this.saveToken(token);
			}
			return token;
		} else {
			// No token
			return null;
		}
	}

	private isValidToken (token: any) {
		const now = new Date().getTime();
		return (token && token.expiresAt > now);
	}

	public isAuthenticating () {
		return this.currentlyAuthing;
	}

	public logout () {
		// TODO: implement this
		delete window.sessionStorage[AUTH_SESSION_STORAGE_KEY + '-' + this.config.clientId]
		window.location.href = LOGOUT_URL;
	}
}

class WindowEventListenersService {
	on (event: string, listeners: EventListener ) {
		window.addEventListener(event, listeners);
		return function () {
			window.removeEventListener(event, listeners);
		};
	};
}

const MTCAuth = new MTCAuthService();
