import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MTCToastService } from './mtc-toast.service';

@Component({
	selector: 'mtc-toast',
	templateUrl: './mtc-toast.component.html',
	styleUrls: ['./mtc-toast.component.less'],
	encapsulation: ViewEncapsulation.Native
})
export class MTCToastComponent implements OnInit {

	toastLocations = [{
			location: 'top right',
			toasts: []
		}, {
			location: 'top left',
			toasts: []
		}, {
			location: 'bottom right',
			toasts: []
		}, {
			location: 'bottom left',
			toasts: []
		}];

	constructor(private mtcToastService: MTCToastService) { }

	ngOnInit() {
		this.mtcToastService.component$.subscribe((config) => {
			if (!config.clear) {
				if(!config.position){
					config.position = 'bottom right';
				}
				this.getLocationByToast(config).toasts.push(config);
				if (config.timeout === null || config.timeout === undefined) {
					config.timeout = 5000;
				}
				if(config.timeout !== 0){
					setTimeout(() => { this.killToast(config); }, config.timeout);
				}
			} else {
				this.killToast(config);
			}
		});
	}

	getLocationByToast(toast){
		return this.toastLocations.find((loc) => {
			return loc.location === toast.position;
		});
	}


	killToast(toastToKill) {
		const currentToasts = this.getLocationByToast(toastToKill).toasts;
		const index = currentToasts.findIndex((toast) => {
			return toast.id === toastToKill.id;
		});
		currentToasts.splice(index,1);
	}
}
