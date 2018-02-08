import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-checkbox-table-row',
	templateUrl: './checkbox-table-row.component.html',
	styleUrls: ['./checkbox-table-row.component.less']
})
export class CheckboxTableRowComponent implements OnInit {

	@Input() row;
	@Input() columns;
	@ViewChild('input') private input: ElementRef;

	hoveredIcon;
	editingCellInRow:boolean;

	constructor() { }

	ngOnInit() {
	}

	isColumnType(column){
		if(column.editing && this.editingCellInRow){return 'editing';}
		if(column.mtcDate){return 'mtcDate';}
		if(column.telephone){return 'telephone';}
		if(column.yesNo){return 'yesNo';}
		if(column.isArray){return 'isArray';}
		if(column.icon){return 'isIcon';}
		return 0;
	}

	getIconColor(icon, row,cell){
		const hover = cell === this.hoveredIcon;

		if(typeof icon.iconColor === 'function'){
			return icon.iconColor(row, hover);
		} else if(icon.iconColor){
			return icon.iconColor;
		}
	}

	iconFunction(row, column){
		if(column.iconFunction){
			event.stopPropagation();
			column.iconFunction(row, row[column.attr]);
		}
	}

	setToEditable(column){
		if(column.editFunction){
			event.stopPropagation();
			if(!this.editingCellInRow){
				column.editing = true;
				this.editingCellInRow = true;
				setTimeout(()=>{this.input.nativeElement.focus()});
			}
		}
	}

	save(column,cell,row){
		event.stopPropagation();
		this.editingCellInRow = false;
		column.editing = false;
		if(typeof column.editFunction === 'function'){
			column.editFunction(cell,row);
		}
	}
}
