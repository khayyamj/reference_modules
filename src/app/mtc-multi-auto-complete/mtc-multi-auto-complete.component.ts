import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Component({
	selector: 'mtc-multi-auto-complete',
	templateUrl: './mtc-multi-auto-complete.component.html',
	styleUrls: ['./mtc-multi-auto-complete.component.less'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MTCMultiAutoCompleteComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => MTCMultiAutoCompleteComponent),
			multi: true,
		}
	]
})
export class MTCMultiAutoCompleteComponent implements OnInit, ControlValueAccessor, Validator {
	@ViewChild('input') private input: ElementRef;
	@ViewChild('multis') private multis: ElementRef;
	@Output() itemChosenChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() focusChange: EventEmitter<any> = new EventEmitter<any>();

	//returns an [] that if passed back into autocomplete will return the same chips and Items selected
	@Output() chipsChange: EventEmitter<any> = new EventEmitter<any>();
	@Input() displayBy = 'name';
	@Input() partial = false;
	@Input() items: any[] = [];
	@Input() set itemChosen(value) {
		if (typeof value === 'object' && value.length) {
			if (!_.isEqual(this.multiItems, value)) {
				this.multiChips = [];

				//sets multiItems to include only those who have aren't multiChips
				this.multiItems = value.filter((chip) => {
					if (chip.display) {
						//if item is multiChip then add it to chips
						this.multiChips.push(chip);
						return false;
					}
					return true;
				});

				//if chips where not in the string make a chip for each chosenItem passed in
				if (!this.multiChips.length) {
					this.multiChips = this.multiItems.map((multiItem) => {
						return { display: multiItem[this.displayBy], childItems: [multiItem] };
					});
				}
			}
		} else if (value === undefined) {
			this.multiChips = [];
			this.multiItems = [];
			this.searchText = '';
			this.multiHeight = 20;
		}
	};
	@Input() placeholder: string;
	@Input() required: boolean;
	@Input() set disabled(bool) {
		bool ? this.childControl.disable() : this.childControl.enable();
	}
	public formChange: (value: any) => void;
	public childControl = new FormControl();
	public searchText = '';
	public multiItems = [];
	public multiChips: any[] = [];
	public showDropDown: boolean;
	public searchResults = [];
	public notAnother = true;
	private confirmBackspace: boolean;
	public multiOffSet = 0;
	public keyPress: Subject<any> = new Subject<any>();
	public multiHeight: any;

	constructor() {
		this.childControl.setValidators(this.validate.bind(this));
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.formChange && this.itemChosen) {
				this.formChange(this.itemChosen);
			}
		});
	}

	onKeyUp(keyPress: KeyboardEvent) {

		switch (keyPress.key) {
			case 'ArrowUp':
			case 'ArrowDown':
			case 'Enter':
				this.keyPress.next(keyPress.key);
				keyPress.stopPropagation();
				break;
			case 'Tab':
				this.setFocus(true);
				break;
			case 'Backspace':
				if (!this.searchText.length && this.multiItems.length && this.confirmBackspace) {
					this.removeMultiItems(this.multiChips.pop().childItems);
					this.changeValues();
					this.setFocus(false);
				}
				this.confirmBackspace = !this.searchText.length;
				this.search();
				break;
			default:
				this.confirmBackspace = !this.searchText.length;
				this.search();
		}
	}

	chooseItem(chosenItem: any) {
		this.notAnother = true;
		if (chosenItem === this.searchResults[0] && this.partial) {
			this.multiChips.push({ display: '"' + this.searchText + '"', childItems: this.searchResults.slice(1) });
			this.multiItems = this.multiItems.concat(this.searchResults.slice(1));
		} else {
			this.multiChips.push({ display: chosenItem[this.displayBy], childItems: [chosenItem] });
			this.multiItems.push(chosenItem);
		}
		this.searchText = '';
		this.search();
		this.changeValues();
		this.input.nativeElement.blur();
		this.setFocus(false);
		this.multiOffSet = this.multiChips ? -20 : 0;
		setTimeout(() => {
			this.multiHeight = this.multis.nativeElement.offsetHeight;
		});
	}

	search() {
		//pull out items that match search text
		this.searchResults = this.items.filter((item) => {
			return item[this.displayBy] && _.includes(item[this.displayBy].toLowerCase(), this.searchText.toLowerCase());
		});

		//remove items that have already been selected
		_.pullAllWith(this.searchResults, this.multiItems, (result, item) => { return result[this.displayBy] === item[this.displayBy] });

		//if partial add all item containing chip
		if (this.partial) {
			this.searchResults.unshift({ [this.displayBy]: 'Add all options containing "' + this.searchText + '"' });
			this.showDropDown = this.searchResults.length > 1;
		} else {
			this.showDropDown = this.searchResults.length > 0;
		}
	}

	removeMultiItems(items) {
		this.multiItems = this.multiItems.filter((item) => {
			return !_.find(items, item);
		});
	}

	removeItem(chip, i) {
		this.removeMultiItems(chip.childItems)
		this.multiChips.splice(i, 1);
		this.changeValues();
		setTimeout(() => {
			this.multiHeight = this.multis.nativeElement.offsetHeight;
		});
	}

	setFocus(bool) {
		this.focusChange.emit(bool);
		setTimeout(() => {
			this.showDropDown = bool;
			if (bool) {
				this.search();
			}
		}, 200);
	}

	onAdd() {
		this.notAnother = false;
		this.input.nativeElement.focus();
		this.setFocus(true);
	}

	changeValues() {
		this.chipsChange.emit(this.multiItems.concat(this.multiChips));
		this.itemChosenChange.emit(this.multiItems);
		if (this.formChange) {
			this.formChange(this.multiItems);
		}
	}

	writeValue(value: any) { }

	registerOnChange(formChange: (value: any) => void) {
		this.formChange = formChange;
	}

	registerOnTouched() { }

	public validate(control: FormControl) {
		if (control.parent && !control.value) {
			this.childControl.setValue('');
			this.childControl.markAsUntouched({ onlySelf: true });
			this.childControl.markAsPristine({ onlySelf: true })
		}
		if (this.required && !this.searchText && !this.multiItems.length) {
			return { required: true };
		}
		if (this.items && this.items.length && this.searchText) {
			const arr = this.items.filter((item) => {
				return item[this.displayBy] && (item[this.displayBy].indexOf(this.searchText) > -1);
			});
			if (arr.length === 0) {
				return { invalidInput: true }
			}
		}
	}
}
