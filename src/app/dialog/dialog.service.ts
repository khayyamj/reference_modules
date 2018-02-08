import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MTCDialogService {

	private passableData: any;

	private componentSource: Subject<any> = new Subject<any>();

	public component$: any = this.componentSource.asObservable();

	private dataSource: Subject<any>;

	constructor() {}

	public show(component: any, width = 300, data: any = null, enableOutsideClick: any = true) {
		this.componentSource.next({
			component: component,
			width: width,
			enableOutsideClick: enableOutsideClick
		});
		this.dataSource = new Subject<any>();
		this.passableData = data;
		return this.dataSource.asObservable();
	}

	public hide(data){
		this.componentSource.next(null);
		this.dataSource.next(data);
		this.dataSource.complete();
	}

	public cancel(){
		this.componentSource.next(null);
		this.dataSource.complete();
	}

	public getData(){
		return this.passableData;
	}

}
