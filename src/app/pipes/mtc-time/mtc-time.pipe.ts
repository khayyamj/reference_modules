import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Pipe({
	name: 'mtcTime'
})
export class MtcTimePipe implements PipeTransform {

	transform(value: any): any {
		if(_.isNil(value)){
			return value;
		}
		if(_.isString(value)){
			value = new Date(value);
		}

		//Change the format of the time below
		return moment(value).format('h:mm A');
	}

}
