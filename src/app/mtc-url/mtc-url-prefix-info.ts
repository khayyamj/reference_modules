export interface MTCUrlPrefixInfo {
	dev: string;
	test: string;
	stage: string;
	beta: string;
	support: string;
	prod: string;
	[propName: string]: string;
}
