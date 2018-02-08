export class SMSCarrier {
	static ATT: SMSCarrier = new SMSCarrier('A');
	static TMOBILE: SMSCarrier = new SMSCarrier('T');
	static ROGERS: SMSCarrier = new SMSCarrier('R');
	static BELLCANADA: SMSCarrier = new SMSCarrier('B');
	static TELCEL: SMSCarrier = new SMSCarrier('M');
	static SPRINT: SMSCarrier = new SMSCarrier('S');
	static CELLULARONE: SMSCarrier = new SMSCarrier('C');
	static USCELLULAR: SMSCarrier = new SMSCarrier('U');
	static NEXTEL: SMSCarrier = new SMSCarrier('N');

	static isValidCarrier(carrier: SMSCarrier) {
		return [SMSCarrier.ATT, SMSCarrier.TMOBILE, SMSCarrier.ROGERS, SMSCarrier.BELLCANADA,
					SMSCarrier.TELCEL, SMSCarrier.SPRINT, SMSCarrier.CELLULARONE, SMSCarrier.USCELLULAR,
					SMSCarrier.NEXTEL].indexOf(carrier) !== -1;
	}

	constructor(public code: string) { }
}
