import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Pipe({
	name: 'mtcDate'
})
export class MtcDatePipe implements PipeTransform {
	longDateFormat = 'DD MMM YYYY';

	transform(date: any, endDate: any = null ): any {
		if(_.isNil(date)){
			return '';
		}
		date = moment(new Date(date));
		if (endDate) {
			endDate = moment(new Date(endDate));
			const endingDisplay = moment(endDate).format(this.longDateFormat);
			let startingDisplay;
			if (endDate.isSame(date, 'day')) {
				return endingDisplay;
			} else if (endDate.isSame(date, 'month')) {
				startingDisplay = date.format('DD');
			} else if (endDate.isSame(date, 'year')) {
				startingDisplay = date.format('DD MMM');
			} else {
				startingDisplay = moment(date).format(this.longDateFormat);
			}
			return startingDisplay + ' - ' + endingDisplay;
		} else {
			return date.format(this.longDateFormat);
		}
	}

}
