/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MTCDialogComponent } from '../dialog';

describe('MTCDialogComponent', () => {
	let component: MTCDialogComponent;
	let fixture: ComponentFixture<MTCDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MTCDialogComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MTCDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
