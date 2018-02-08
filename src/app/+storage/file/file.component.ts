import { Component, OnInit, Output, EventEmitter, ElementRef, Input } from '@angular/core';

import { StorageApiService } from '../storage-api.service';

@Component({
	selector: 'mtc-file',
	templateUrl: './file.component.html',
	styleUrls: ['./file.component.less']
})
export class MTCFileComponent implements OnInit {

	@Input('name') name;
	@Input('preview') preview;

	file: File;
	storageData: any;
	@Output() onFileDiscarded = new EventEmitter;
	@Output() onFileSelected = new EventEmitter<File>();

	constructor(private el: ElementRef, private storageService: StorageApiService) {	}

	ngOnInit() { }

	onChange (event) {
		this.file = event.target.files[0];
		this.onFileSelected.emit(this.file);
		const reader = new FileReader();
		reader.onload = (e: any) => {
			const img = this.el.nativeElement.querySelector('img');
			if (img != null) {
				img.setAttribute('src', e.target.result);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	}
	discard() {
		this.onFileDiscarded.emit();
		this.file = undefined;
	}
}
