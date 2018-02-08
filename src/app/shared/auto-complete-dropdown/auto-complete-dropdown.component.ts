import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
	selector: 'auto-complete-dropdown',
	templateUrl: './auto-complete-dropdown.component.html',
	styleUrls: ['./auto-complete-dropdown.component.less']
})
export class AutoCompleteDropdownComponent implements OnChanges, OnInit {
	@ViewChild('dropdown') private dropdown: ElementRef;
	@Input() items: Array<any>;
	@Input() displayBy: string;
	@Input() currentItemIndex = 0;
	@Output() currentItemIndexChange: EventEmitter<any> = new EventEmitter<any>();
	@Input() set keyPress(keySubject) {
		keySubject.subscribe((key) => {
			if (key === 'ArrowUp' && this.currentItemIndex > 0) {
				this.currentItemIndex--;
			} else if (key === 'ArrowDown' && this.currentItemIndex + 1 < this.items.length) {
				this.currentItemIndex++;
			} else if (key === 'Enter') {
				if (this.items && this.items.length !== 0 && this.currentItemIndex > -1) {
					this.currentItemIndexChange.emit(this.currentItemIndex);
				}
			}
			this.scrollToItemAt();
		});
	}
	@Input() multiOffSet = 0;
	offPage: number;
	startingTop: number;
	offset: number;

	ngOnChanges() {
		this.checkIfOffPage();
	}

	ngOnInit() {
		const parentTop = this.dropdown.nativeElement.parentElement.parentElement.getBoundingClientRect().top;
		const childTop = this.dropdown.nativeElement.getBoundingClientRect().top
		this.offset = childTop - parentTop;
		this.startingTop = parentTop;
		this.checkIfOffPage();
	}

	scrollToItemAt() {
		//30 is the size of a item, after 5 rows start scrolling
		if (30 * this.currentItemIndex > this.dropdown.nativeElement.scrollTop + 30 * 5) {
			this.dropdown.nativeElement.scrollTop += 30;
		} else {
			this.dropdown.nativeElement.scrollTop -= 30;
		}
	}

	selectItem() {
		this.currentItemIndexChange.emit(this.currentItemIndex);
	}

	checkIfOffPage() {
		const maxItemsInList = 8;
		const itemSize = 30
		const maxListHeight = 230;
		const borderSpace = 2;
		const inputSize = 70;
		const raiseDropDownUp = 19;
		const space = this.items.length < maxItemsInList ? this.items.length * itemSize : maxListHeight;

		if (this.dropdown) {
			if (this.startingTop + borderSpace + space + this.multiOffSet > document.body.clientHeight) {
				this.offPage = space + inputSize + this.offset;
			} else {
				this.offPage = this.offset + raiseDropDownUp + this.multiOffSet;
			}
		}
	}
}
