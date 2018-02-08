import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CheckboxTableColumn } from './../../checkbox-table';
import * as _ from 'lodash';

@Component({
	selector: 'app-missionary-custom-search-manage-columns',
	templateUrl: './manage-columns.component.html',
	styleUrls: ['./manage-columns.component.less']
})
export class ManageColumnsComponent implements OnInit {

	columns: CheckboxTableColumn[];
	saveAsDefault = false;
	showSaveCheckbox = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
				public dialog: MatDialogRef<ManageColumnsComponent>){}

	ngOnInit() {
		this.columns = _.cloneDeep(this.data.columns);
		if(this.data.buttonFunction) {
			this.showSaveCheckbox = true;
		}
	}

	change(setting,column){
		if(setting === 'fixed' && !column.fixed){
			column.visible = true;
		}
		if(setting === 'visible' && column.visible){
			column.fixed = false;
		}
		column[setting] = !column[setting];
		this.columns =  this.columns.filter(c => c.fixed)
									.concat(this.columns.filter(c => !c.fixed).filter(c => c.visible))
									.concat(this.columns.filter(c => !c.visible));
	}

	save(){
		this.dialog.close({
			columns:this.columns,
			saveAsDefault:this.saveAsDefault
		});
	}

	onItemDrop(column,toIndex) {
		const nextColumn = this.columns[toIndex + 1];
		if(nextColumn) {
			column.fixed = nextColumn.fixed;
			column.visible = nextColumn.visible;
		} else {
			column.fixed = false;
			column.visible = false;
		}
	}

}
