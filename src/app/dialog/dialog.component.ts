import { Component, OnInit } from '@angular/core';
import { MTCDialogService } from './dialog.service';

@Component({
	selector: 'mtc-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.less']
})
export class MTCDialogComponent implements OnInit {

	component: any = null;
	width = 300;
	enableOutsideClick = true;

	constructor(private mtcDialogService: MTCDialogService) {}

	ngOnInit() {
		this.mtcDialogService.component$.subscribe((config) => {
			if(config) {
				this.component = config.component;
				this.width = config.width;
				this.enableOutsideClick = config.enableOutsideClick;
			}else{
				this.component = null;
			}
		});
	}

	getStyle(dimension: number) {
		return `${dimension}px`;
	}

	isOpen(){
		return this.component !== null;
	}

	cancel(){
		if(this.enableOutsideClick){
			this.mtcDialogService.cancel();
		}
	}

}
