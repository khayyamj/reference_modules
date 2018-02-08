import { Injectable } from '@angular/core';
import { MTCUrlPrefixInfo} from './mtc-url-prefix-info';

@Injectable()
export class MTCURL {
	urls: any = {};
	env: string;

	constructor() {
		this.env = this.getEnvironment();
	}

	getPrefix (key: string): string {
		let prefix = '//test-apps.mtc.byu.edu/';
		prefix = this.urls[key][this.env];
		return prefix;
	}

	provideUrls (key: string, routeUrls: MTCUrlPrefixInfo): void {
		for (const k in routeUrls) {
			if (routeUrls[k][(routeUrls[k].length)-1] === '/') {
				throw new Error('Imporperly Formatted URL');
			}
		}
		this.urls[key] = routeUrls;
	}

	getEnvironment(): string {
		let env = 'dev';
		if (window.location.hostname.includes('test-apps.mtc.byu.edu')) {
			env = 'test';
		} else if (window.location.hostname.includes('stage-apps.mtc.byu.edu')) {
			env = 'stage';
		} else if (window.location.hostname.includes('beta-apps.mtc.byu.edu')) {
			env = 'beta';
		} else if (window.location.hostname.includes('support-apps.mtc.byu.edu')) {
			env = 'support';
		} else if (window.location.hostname.includes('cdn.mtc.byu.edu')
			|| window.location.hostname.includes('tall.mtc.byu.edu')
			|| window.location.hostname === 'apps.mtc.byu.edu') {
			env = 'prod';
		}
		return env;
	}
}
