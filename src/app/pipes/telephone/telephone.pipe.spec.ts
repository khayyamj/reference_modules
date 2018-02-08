/* tslint:disable:no-unused-variable */

import { TelephonePipe } from './telephone.pipe';

describe('Pipe: MissingInfo', () => {
	let pipe: TelephonePipe;

	beforeEach(() => {
		pipe = new TelephonePipe();
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should transform the input', () => {
		expect(pipe.transform('123-123-1234')).toEqual('(123) 123-1234');
		expect(pipe.transform('1123-123-1234')).toEqual('1 (123) 123-1234');
		expect(pipe.transform('11123-123-1234')).toEqual('111 (23) 123-1234');
		expect(pipe.transform('111123-123-1234')).toEqual('111123-123-1234');
		expect(pipe.transform('')).toEqual('');
		expect(pipe.transform('(123)123-1234')).toEqual('(123)123-1234');
	});
});
