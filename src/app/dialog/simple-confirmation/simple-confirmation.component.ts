import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'simple-confirmation',
	templateUrl: './simple-confirmation.component.html',
	styleUrls: ['./simple-confirmation.component.less']
})
export class SimpleConfirmationComponent implements OnInit {
	dataInput: {
		cancelButtonText: string,
		confirmationButtonText: string,
		content: string,
		title: string
	};

	@Input() config: any;
	@Output() confirmation = new EventEmitter<boolean>();

	constructor(private dialogRef: MatDialogRef<any>,
		@Inject(MAT_DIALOG_DATA) private data: any) {
		this.dataInput = {
			cancelButtonText: 'cancel',
			confirmationButtonText: 'remove',
			content: 'Are you sure?',
			title: ''
		};
	}

	ngOnInit() {
		this.dataInput = this.config || this.data || this.dataInput;
	}

	cancel() {
		if (this.config) {
			this.confirmation.emit(false);
		} else {
			this.dialogRef.close(false);
		}
	}

	remove() {
		if (this.config) {
			this.confirmation.emit(true);
		} else {
			this.dialogRef.close(true);
		}
	}
}
