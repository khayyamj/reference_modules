import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
	selector: '[numeric]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => NumericDirective), multi: true }
	]
})

export class NumericDirective implements Validator {
	constructor() {}

	validate(c: FormControl): { [key: string]: any } {
		return new RegExp(/^[0-9]*$/).test(c.value) || c.value === null ? null : {notNumbers: true };
	}
}
