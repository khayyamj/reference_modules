import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef, forwardRef, OnInit } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'mtc-auto-complete',
	templateUrl: './mtc-auto-complete.component.html',
	styleUrls: ['./mtc-auto-complete.component.less'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting:forwardRef(() => MTCAutoCompleteComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => MTCAutoCompleteComponent),
			multi: true,
		}
	]
})
export class MTCAutoCompleteComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
	@ViewChild('dropdown') private dropdown: ElementRef;
	@Output() itemChosenChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() focusChange: EventEmitter<any> = new EventEmitter<any>();
	@Input() items:any = [];
	@Input() displayBy = 'name';
	@Input() placeholder: string;
	@Input() required: boolean;
	//Only for non-form auto-completes, if form disable control and pass control to set control
	@Input() set disabled(bool) {
		bool ? this.childControl.disable() : this.childControl.enable();
	}
	@Input()  set itemChosen(value){
		this._itemChosen = value;
		this.setChildControl(value);
	};
	public formChange: (value: any) => void;
	public childControl = new FormControl();
	public searchText= '';
	public showDropDown: boolean;
	public searchResults:any[] = [];
	public keyPress:Subject<any> = new Subject<any>();
	private _itemChosen: any;
	get itemChosen(){
		return this._itemChosen;
	}

	constructor() {
	}
	ngOnInit() {
		this.childControl.setValidators(this.validate.bind(this));
		setTimeout(()=>{
			this.setChildControl(this.itemChosen);
			if(this.formChange && this.itemChosen) {
				this.formChange(this.itemChosen);
			}
		});
	}
	ngOnChanges(changes) {
		if (changes.itemChosen && changes.itemChosen.currentValue && changes.itemChosen.currentValue !== changes.itemChosen.previousValue) {
			this.searchText = typeof changes.itemChosen.currentValue === 'object' ? changes.itemChosen.currentValue[this.displayBy] : changes.itemChosen.currentValue;
			if (!this.searchText) {
				this.searchText = '';
			}
		}
	}
	onKeyUp(keyPress:any) {

		switch (keyPress.key) {
			case 'ArrowUp':
			case 'ArrowDown':
			case 'Enter':
				this.keyPress.next(keyPress.key);
				break;
			case 'Tab':
				this.setFocus(true);
				break;
			default:
				const returnObject:any = {input:true};
				this.showDropDown = true;
				returnObject[this.displayBy] = this.searchText;
				this.changeValues(returnObject);
				this.search();
		}
	}

	chooseItem(searchResult: any) {
		this.searchText = searchResult[this.displayBy];
		this.showDropDown = false;
		this.changeValues(searchResult);
	}
	setChildControl(value: any){
		let setValue = '';
		if(value && value[this.displayBy]) {
			setValue = value[this.displayBy];
		} else if(typeof value === 'string') {
			setValue = value;
		}
		this.childControl.setValue(setValue);
	}
	search() {
		const lower = _.replace(String(this.searchText).toLowerCase(),new RegExp('/[?\\+*()\[\]]/','g'),'');
		if(this.items){
			this.searchResults = this.items.filter((item) => {
				const regex: RegExp = new RegExp('(^' + lower + '|\\s' + lower + ')');
				return this.filterFunction(item, regex);
			}, this);
			this.searchResults.forEach((item, index) => {
				item.mtcAutoCompleteIndex = index;
			});
		}
	}

	getDisplayName(item:any) {
		if (item[this.displayBy]) {
			return item[this.displayBy];
		}
	}

	setFocus(bool:any) {
		if(this.childControl.enabled) {
			this.focusChange.emit(bool);
			setTimeout(() => {
				this.showDropDown = bool;
				if (bool) {
					this.search();
				}
			}, 200);
		}
	}

	filterFunction(item:any, regex:RegExp) {
		if (item[this.displayBy]) {
			return item[this.displayBy].toLowerCase().match(regex) !== null;
		} else {
			return false;
		}
	};
	changeValues(value:any){
		this.itemChosenChange.emit(value);
		if(this.formChange) {
			this.formChange(value);
		}
	}

	writeValue(value: any) {}

	registerOnChange(formChange: (value: any) => void) {
		this.formChange = formChange;
	}

	registerOnTouched() { }

	//Put all custom validators here
	public validate(control:FormControl) {
		if(control.parent && !control.value) {
			this.childControl.setValue('');
			this.childControl.markAsUntouched({onlySelf:true});
			this.childControl.markAsPristine({onlySelf:true});
		}
		if(this.required && !this.searchText) {
			return {required:true};
		}
		if(this.items && this.items.length && this.searchText) {
			const arr = this.items.filter((item) => {
				return item[this.displayBy] === this.searchText;
			});
			if(arr.length === 0) {
				return {invalidInput:true};
			}
		}
	}
}
