export interface EmailOptions {
	recipients: string;
	from?: string;
	subject?: string;
	text: string;
	recipientType?: string;
}
