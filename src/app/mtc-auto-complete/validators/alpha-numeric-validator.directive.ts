import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
	selector: '[alphaNumeric]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => AlphaNumericDirective), multi: true }
	]
})

export class AlphaNumericDirective implements Validator {
	constructor() {}

	validate(c: FormControl): { [key: string]: any } {
		return new RegExp(/[&\/\\#+()$~%'"*?<>{}!@\[\]=_`|]/).test(c.value) ? {specialCharacters: true } : null;
	}
}
