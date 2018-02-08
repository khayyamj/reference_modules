import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MTCToastService {

	private id = 0;

	private componentSource: Subject<any> = new Subject<any>();

	public component$: any = this.componentSource.asObservable();


	constructor() { }

	public info(content: string, config:any={}){
		return this.makeToastObject('info',content,config);
	}

	public success(content: string, config:any={}){
		return this.makeToastObject('success',content,config);
	}

	public error(content: string, config:any={}){
		return this.makeToastObject('error',content,config);
	}

	public warning(content: string, config:any={}){
		return this.makeToastObject('warning',content,config);
	}

	makeToastObject(type,content,config){
		this.id++;
		const toast = Object.assign({
			type:type,
			content: content,
			id: this.id,
		},config);
		this.componentSource.next(toast);
		return toast;
	}

	public clear(toastObj) {
		if(toastObj){
			toastObj.clear = true;
			this.componentSource.next(toastObj);
		}
	}
}
