import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

	transform(value: any): any {
		if(value === '0' || value==='false' || value==='N') {
			value = false;
		}
		return value ? 'Yes' : 'No';
	}

}
