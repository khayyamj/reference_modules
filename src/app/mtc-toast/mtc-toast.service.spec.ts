/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MTCToastService } from './mtc-toast.service';

describe('MTCToastService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MTCToastService]
		});
	});

	it('should ...', inject([MTCToastService], (service: MTCToastService) => {
		expect(service).toBeTruthy();
	}));
});
