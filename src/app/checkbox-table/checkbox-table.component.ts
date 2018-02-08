import {Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import { CheckboxTableColumn } from './column.model';
import { CheckboxTableConfig } from './config.model';
import { ManageColumnsComponent } from './manage-columns';
import * as _ from 'lodash';
import { MtcDatePipe, MtcTimePipe, TelephonePipe, YesNoPipe } from '../pipes';

@Component({
	selector: 'mtc-checkbox-table',
	templateUrl: './checkbox-table.component.html',
	styleUrls: ['./checkbox-table.component.less']
})
export class CheckboxTableComponent implements OnInit {
	@ViewChild('scrollingDiv') scrollingDiv: ElementRef;
	@ViewChild('headerDiv') headerDiv: ElementRef;
	@ViewChild('tableData') tableData: ElementRef;
	@ViewChild('downloadResults') downloadResults: ElementRef;

	@Output() columnsChange = new EventEmitter();

	@Input() set rows(value){
		this.allSelected = false;
		this._rows = value;
		setTimeout(() => this.setVirtualScroll());
	};
	get rows(){
		return this._rows;
	}
	@Input() placeholder = 'No items to display';
	@Input() set config(config: CheckboxTableConfig) {
		this.hoverState = config.rowFunction || config.topButtons;
		Object.assign(this._config, config);
		if(config.rowHeight && !config.headerHeight) {
			this._config.headerHeight = config.rowHeight;
		}
	}
	@Input() set columns(cols: CheckboxTableColumn[]) {
		if(!_.isEqual(cols,this.columns)){
			cols = _.cloneDeep(cols);
			this._fixedColumns = [];
			this._columns = [];
			this.fixedColumnsWidth = 0;

			cols.forEach((col) => {
				if(col.visible === undefined) {
					col.visible = true;
				}
				if(col.fixed) {
					this._fixedColumns.push(col);
				} else if(col.visible) {
					this._columns.push(col);
				}
			});
			this._allColumns = cols;
			this.setColumns();
		}
	}
	get columns() {
		return this._columns;
	}

	_allColumns: CheckboxTableColumn[] = [];
	_columns: CheckboxTableColumn[] = [];
	_fixedColumns: CheckboxTableColumn[] = [];

	get config() {
		return this._config;
	}
	_config: CheckboxTableConfig = {
		rowHeight: 48,
		headerHeight: 48,
		buttonColumnWidth: 8,
		resultsCountName: true
	};
	_rows:any[] = [];

	topRowIndex = 0;
	bottomRowIndex = 0;
	fixedColumnsWidth;
	scroll = 0
	frameCount = 0;
	columnMinWidthPX = 120;
	showLeftArrow: boolean;
	showRightArrow: boolean;
	allSelected: boolean;
	shiftPressed: boolean;
	hoverState: boolean;
	lastSelected;
	hoveredIcon = '';
	scrollableColumnTransform = '';
	arrowsColumnWidth;
	constructor(private dialog: MatDialog,
				private mtcDatePipe: MtcDatePipe,
				private mtcTimePipe: MtcTimePipe,
				private telephonePipe: TelephonePipe,
				private yesNoPipe: YesNoPipe) {}

	ngOnInit() {
		setTimeout(() =>{
			this.bottomRowIndex =  Math.floor(this.tableData.nativeElement.clientHeight /this.config.rowHeight);
		});
	}

	getButtonsWidth() {
		if(!this.arrowsColumnWidth){
			this.arrowsColumnWidth = 6600 / this.headerDiv.nativeElement.clientWidth;
		}

		if(this.config.rowButtons){
			return this.config.rowButtons.length * this.config.buttonColumnWidth;
		} else if(this.columns.length){
			return this.arrowsColumnWidth;
		} else {
			return 0;
		}
	}

	setColumns() {
		const maxVisibleColumnsWidth = this.headerDiv.nativeElement.clientWidth + (1 - (this.getButtonsWidth() / 100));
		let totalVisibleColumnsWidth = 0;
		let totalFixedColumnsWidth = 0;
		const scrollableColumnsWidthMin = this.columns ? (100 * (this.columnMinWidthPX / this.headerDiv.nativeElement.clientWidth)) : 0;

		this._allColumns.forEach((column) => {
			if(column.visible || column.fixed) {
				totalVisibleColumnsWidth += column.width ? column.width : (100 * this.columnMinWidthPX / maxVisibleColumnsWidth);
				if(column.fixed){
					totalFixedColumnsWidth += column.width ? column.width : (100 * this.columnMinWidthPX / maxVisibleColumnsWidth);
				}
			}
		});


		let fixedColumnsWidthPercentAsDecimal = totalFixedColumnsWidth / 100;
		const rowButtonColumnsWidth = this.config.rowButtons ? this.config.rowButtons.length * this.config.buttonColumnWidth : 0;

		if(totalVisibleColumnsWidth <= (100 - rowButtonColumnsWidth)) {
			this._fixedColumns = this._fixedColumns.concat(this._columns);
			this._columns = [];
			this.fixedColumnsWidth = 100 - this.getButtonsWidth();
			fixedColumnsWidthPercentAsDecimal = this.fixedColumnsWidth / 100;
			this.setFixedColumnsWidth(fixedColumnsWidthPercentAsDecimal);
		} else if((totalFixedColumnsWidth + scrollableColumnsWidthMin) > (100 - this.getButtonsWidth())){
			this._columns = this._fixedColumns.concat(this._columns);
			this._fixedColumns = [];
			this.fixedColumnsWidth = 0;
			this.setScrollableColumns(0);
		} else {
			this.fixedColumnsWidth = totalFixedColumnsWidth;
			setTimeout((this.setScrollableColumns(fixedColumnsWidthPercentAsDecimal),1000));
		}
	}

	setScrollableColumns(fixedColumnsWidth) {
		const tableWidthPX = this.headerDiv.nativeElement.clientWidth
		const headerWidthPX = this.headerDiv.nativeElement.clientWidth * (1 - this.getButtonsWidth() / 100);

		const tableWidthToColumnWidthRatio = tableWidthPX / (headerWidthPX - (fixedColumnsWidth * tableWidthPX));
		let minWidth = 100 * (this.columnMinWidthPX / (headerWidthPX - (fixedColumnsWidth * tableWidthPX)));

		this.frameCount = 0;
		let frameWidth = 0;
		let fittingColumns: any = [];

		if(minWidth > 50){
			minWidth = 100;
		}

		this.columns.forEach((col) => {

			col.columnWidth = col.width ? (col.width * tableWidthToColumnWidthRatio) : 0;

			if(!col.columnWidth || (col.columnWidth < minWidth)) {
				col.columnWidth = minWidth;
			} else if(col.columnWidth > 100){
				col.columnWidth = 100;
			}

			if((frameWidth + col.columnWidth) > 100) {
				this.frameCount++;
				fittingColumns.forEach((fitCol) => {
					fitCol.columnWidth = fitCol.columnWidth / (frameWidth / 100);
				});
				fittingColumns = [];
				frameWidth = col.columnWidth;
			} else {
				frameWidth += col.columnWidth;
			}
			fittingColumns.push(col)

		});
		if(fixedColumnsWidth){
			this.setFixedColumnsWidth(fixedColumnsWidth);
		}

	}

	setFixedColumnsWidth(fixedColumnsWidthPercentAsDecimal) {
		this._fixedColumns.forEach((col)=>{
			col.columnWidth = col.width/fixedColumnsWidthPercentAsDecimal;
		});
	}

	setScroll(direction) {
		if(direction === 'left' && this.scroll !== 0) {
			this.scroll--;
		} else if(direction === 'right' && this.scroll !== this.frameCount) {
			this.scroll++;
		}
		this.scrollableColumnTransform = 'translateX(' + (-this.scroll * this.scrollingDiv.nativeElement.clientWidth) + 'px)'
	}

	topButtonClick(button) {
		if(button.text === 'Manage Columns') {
			this.openManageColumnsDialog(button.function);
		} else {
			button.function(this.rows.filter(row => row.selected), this.rows);
		}
	}

	openManageColumnsDialog(buttonFunction) {
		this.dialog.open(ManageColumnsComponent,{
			height: '620px',
			width: '400px',
			data: {
				columns: this._allColumns,
				buttonFunction: buttonFunction
			}
		}).afterClosed().subscribe((columnInfo) => {
			if(columnInfo) {
				this.columnsChange.emit(columnInfo.columns);
				this.columns = columnInfo.columns;
				this.scroll = 0;
				if(columnInfo.saveAsDefault) {
					buttonFunction(columnInfo.columns);
				}
			}
		});
	}

	showTableButton(button) {
		return button.alwaysVisible || (this.config.topButtons.length && this.rows.some(row => row.selected));
	}

	selectIndex(index,event) {
		if(this.shiftPressed) {
			this.selectRowsBetweenIndexes([index,this.lastSelected],event);
		}
		setTimeout(() => {
			this.rows[index].selected = event.checked;
			if(!event.checked) {
				this.allSelected = false;
			} else {
				this.allSelected = this.rows.every(row => row.selected);
			}
		},0);
		this.lastSelected = index;
	}

	selectRowsBetweenIndexes(indexes,event) {
		indexes.sort();
		this.rows.forEach((row,index) => {
			if((index >= indexes[0]) && (index <= (indexes[1] - 1))) {
				row.selected = event.checked;
			}
		});
	}

	selectAll() {
		this.allSelected = !this.allSelected;
		this.rows.forEach((row) => {
			row.selected = this.allSelected;
		});
	}

	clickRow(index,event) {
		if(this.config.topButtons){
			this.shiftPressed = event.shiftKey;
			event.checked = !this.rows[index].selected;
			this.selectIndex(index,event);
			event.stopPropagation();
		}

		if(this.config.rowFunction){
			this.config.rowFunction(this.rows[index]);
		}
	}

	handleClick(button,row) {
		event.stopPropagation();
		button.function(row,this.rows);
	}

	sortByColumn(column) {
		let toSort = [];
		//clear any sorting indications
		if(this._fixedColumns) {
			toSort = toSort.concat(this._fixedColumns);
		}
		if(this.columns) {
			toSort = toSort.concat(this.columns);
		}
		toSort.forEach((c) => {
			if(column !== c) {
				c.sortAsc = null;
			}
		});
		column.sortAsc = !column.sortAsc;
		this.rows.sort((a,b) => {
			const aAttr = a[column.attr] || '0'; //if falsy value cast to 0
			const bAttr = b[column.attr] || '0'; //if falsy value cast to 0
			if(isNaN(aAttr) || isNaN(bAttr)) {
				return column.sortAsc ? aAttr.localeCompare(bAttr) : bAttr.localeCompare(aAttr);
			} else {
				return column.sortAsc ? parseFloat(aAttr) - parseFloat(bAttr) : parseFloat(bAttr) - parseFloat(aAttr);
			}
		});
	}

	getIconColor(icon, row,cell){
		const hover = cell === this.hoveredIcon;

		if(typeof icon.iconColor === 'function'){
			return icon.iconColor(row, hover);
		} else if(icon.iconColor){
			return icon.iconColor;
		}
	}

	shouldIconHide(button){
		//TODO uncomment this when styling for buttons showing all the time is fixed
		return typeof button.iconColor !== 'function';
	}

	setVirtualScroll(){
		this.topRowIndex = Math.floor(this.tableData.nativeElement.scrollTop/this.config.rowHeight);
		this.bottomRowIndex = this.topRowIndex + Math.floor(this.tableData.nativeElement.clientHeight / this.config.rowHeight);
	}

	export(){
		const exportColumns = this._fixedColumns.concat(this._columns).filter((col) => !col.icon);
		const csv = 'data:text/csv;charset=utf-8, ' +
		exportColumns.map(c => c.title).join(',') + '\n' +
		this.rows.map((row) => {
			return exportColumns.map((column) => {
				let value = '';

				if(column.mtcDate){value = this.mtcDatePipe.transform(row[column.attr]);
				} else if(column.telephone){value = this.telephonePipe.transform(row[column.attr]);
				} else if(column.yesNo){value = this.yesNoPipe.transform(row[column.attr]);
				} else if(column.isArray){ value = row[column.attr].toString();
				} else if(!value){return row[column.attr] ? `"${row[column.attr]}"` : ``;}
				return `"${value}"`;
			}).join(',');
		}).join('\n');

		this.downloadResults.nativeElement.setAttribute('href', encodeURI(csv));
	}

	getTopComponentsSize(){
		if(this.config.resultsCountName && (this.config.topButtons ? !this.config.export : this.config.export)){
			return this.config.headerHeight + 51;
		} else if((this.config.resultsCountName || this.config.topButtons) && this.config.export){
			return this.config.headerHeight + 99;
		} else {
			return this.config.headerHeight + 3;
		}
	}
}
