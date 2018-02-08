export class AuthConfig {
	clientId: string;
	contentUrls: string[];
	scopes: string[];
	redirectUri: boolean | string;
	options: {
		requestAuths: string;
	};
	newTabRedirectUri: boolean | string;
	isMobileApp?: boolean;
}
