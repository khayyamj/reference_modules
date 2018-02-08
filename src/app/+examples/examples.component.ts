import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SimpleConfirmationComponent } from '../dialog';
import { MTCToastService } from '../mtc-toast';
import * as moment from 'moment';
import { CheckboxTableColumn, CheckboxTableConfig } from '../checkbox-table';

@Component({
	selector: 'app-examples',
	templateUrl: './examples.component.html',
	styleUrls: ['./examples.component.less']
})
export class ExamplesComponent implements OnInit {

	toast = [];
	toastType = 'success';
	toastLocation = 'bottom right';
	includeVersion = true;
	likesSimpleConfirmation = false;
	hasOpenedSimple = false;
	overlayOpen = false;
	switch = false;
	timeTitle = 'Picker Title';
	date: any = new Date();
	sunday = moment().day(0).add(1,'w').startOf('day');
	monday = moment().day(1).add(8,'d').startOf('day');
	endDate: any = moment(new Date()).add(10, 'days').toDate();
	time: Date = new Date();
	items: any[] = [
		{ name: 'Zack' , id:1},
		{ name: 'Matt', id:2},
		{ name: 'Bryan', id:3},
		{ name: 'Braden', id:4 },
		{ name: 'Amy', id:5},
		{ name: 'Michael', id:6},
		{ name: 'Tomi', id:7},
		{ name: 'Freddie', id:8},
		{ name: 'Devin', id:9},
		{ name: 'Blake', id:10},
		{ name: 'Andrew', id:11},
		{ name: 'Kaden', id:12},
		{ name: 'Khayyam', id:13},
		{ name: 'Tatiana', id:14}
	];
	columns:CheckboxTableColumn[] = [
		{title:'Name', attr:'name', width:30, fixed: true, editFunction:()=>{console.log('saved');}},
		{title:'Phone Number', attr:'phoneNumber', fixed: true, telephone: true},
		{title:'Major', attr:'major', fixed: true},
		{title:'ID', attr:'id', width:50, type:'number', editFunction:()=>{console.log('saved')}},
		{title: 'icon', icon: 'add', iconColor: (row,hover) => hover ? '#4D6594' : '#F2813A' , iconFunction: (row) => row.id='F2813A'},
		{title:'Favorite Pizza, which is sometimes gross', attr:'pizza',width:10, isBold: true},
		{title:'Weird', attr:'isWeird',width:10, yesNo: true},
		{title:'Favorite Color', attr:'color',width:10},
		{title:'Home State', attr:'homeState',width:10},
		{title:'Favorite State', attr:'favoriteState',width:10},
		{title:'Nick Name', attr:'nickName', width:10},
		{title:'Today', attr:'date', mtcDate:true},
		{title:'Lucky Numbers', attr: 'array', isArray: {displayBy:'abbrev', tooltip:'name'}},
	];

	checkboxTableConfig:CheckboxTableConfig = {
		topButtons: [
			{text: 'Correct Pizza Choices', function: (rows) => rows.forEach(r => r.pizza = 'Pepperoni')},
			{text: 'All Scrollable', function: this.myButtonFunction.bind(this), alwaysVisible:true},
			{text: 'Add Column', function: this.addColumn.bind(this), alwaysVisible:true},
			{text: 'Remove Column', function: this.removeColumn.bind(this), alwaysVisible:true},
			{text: 'Set to Four Columns', function: this.setToFourColumns.bind(this), alwaysVisible:true},
			{text: 'Manage Columns', function: this.manageColumns.bind(this), alwaysVisible: true},
			{text: 'lots of rows', function: this.addRows.bind(this), alwaysVisible:true}
		],
		rowButtons: [
			{text: 'Correct Pizza', function: (r) => r.pizza = 'Pepperoni'},
			{text: 'Change Color', function: (r) => r.color = 'Blue'},
			{icon: 'delete', function: (r) => r.name = '', iconColor:'#F2813A'},
			{text: 'Erase Name',function: (r) => r.name = ''}
		]
	};

	pizzas = ['Pepperoni','Cheese','Supreme','Pepperoni, Sausage, Bacon, Chicken, and Ham'];
	colors = ['Blue','Green','Yellow','Pink'];
	telephoneNums = ['801-422-0000', '(901)-323-3232', '2398472388', '897-987-2349', '329 903-2343', '291 191 1919'];
	isWeird = [true, false, 'true', 'false', 0, 1, '0', '1'];
	states = ['Idaho','Utah','Nevada','Arizona'];
	majors = ['Computer Science','Information Systems','Geology'];
	rows = this.items.map((item,index) => {
		return {
			id:index,
			name:item.name,
			phoneNumber: this.telephoneNums[Math.floor(Math.random()*this.telephoneNums.length)],
			pizza:this.pizzas[Math.floor(Math.random()*this.pizzas.length)],
			isWeird:this.isWeird[Math.floor(Math.random()*this.isWeird.length)],
			color:this.colors[Math.floor(Math.random()*this.colors.length)],
			homeState:this.states[Math.floor(Math.random()*this.states.length)],
			favoriteState:this.states[Math.floor(Math.random()*this.states.length)],
			major:this.majors[Math.floor(Math.random()*this.majors.length)],
			nickName:item.name.substring(0,2),
			date:this.endDate,
			array:[{name:'Free T-shirt', abbrev:4}, {name:'promotion', abbrev:14}, {name:'new car', abbrev:21}, {name:'found dollar', abbrev:8}]
		}
	});
	extraRows = this.items.map((item,index) => {
		return {
			id:index,
			name:item.name,
			phoneNumber: this.telephoneNums[Math.floor(Math.random()*this.telephoneNums.length)],
			pizza:this.pizzas[Math.floor(Math.random()*this.pizzas.length)],
			isWeird:this.isWeird[Math.floor(Math.random()*this.isWeird.length)],
			color:this.colors[Math.floor(Math.random()*this.colors.length)],
			homeState:this.states[Math.floor(Math.random()*this.states.length)],
			favoriteState:this.states[Math.floor(Math.random()*this.states.length)],
			major:this.majors[Math.floor(Math.random()*this.majors.length)],
			nickName:item.name.substring(0,2),
			date:this.endDate,
			array:[{name:'Free T-shirt', abbrev:4}, {name:'promotion', abbrev:14}, {name:'new car', abbrev:21}, {name:'found dollar', abbrev:8}]
		}
	});
	chosen = { name: 'Bryan' };
	chosenMulti = [{ name: 'Bryan', id: 3 },{name:'Amy', id:5},{name:'Khayyam', id:13}, {display:'"y"', childItems:[{name: 'Khayyam', id:13},{name: 'Amy', id:5}]}, {display:'Bryan', childItems:[{name:'Bryan', id:3}]}];
	number = '';

	constructor(private dialog: MatDialog,
				private mtcToastService: MTCToastService,
				) {}

	ngOnInit(){
		for(let i = 0;i < 7; i++){
			this.extraRows = this.extraRows.concat(this.extraRows);
		}
	}

	addRows(){
		this.rows = this.extraRows;
	}

	fileSelected(event) {
		console.log(event);
	}

	myButtonFunction() {
		this.columns = [
			{title:'ID', attr:'id', width:50},
			{title:'Name', attr:'name', width:60},
			{title:'Favorite Pizza', attr:'pizza',width:10},
			{title:'Favorite Color', attr:'color',width:10},
			{title:'Home State', attr:'homeState',width:10},
			{title:'Favorite State', attr:'favoriteState',width:10},
			{title:'Major', attr:'major'},
			{title:'Nick Name', attr:'nickName', width:10},
		];
	}

	setToFourColumns() {
		this.columns = [
			{title:'ID', attr:'id', width:30, fixed:true},
			{title:'Name', attr:'name', width:30},
			{title:'Favorite Pizza', attr:'pizza',width:10},
			{title:'Favorite Color', attr:'color',width:10}
		];
	}

	addColumn(){
		this.columns = this.columns.concat([{title:'Favorite Pizza', attr:'pizza',width:10},]);
	}

	removeColumn(){
		this.columns = this.columns.slice(0,this.columns.length-1);
		console.log(this.columns);
	}

	manageColumns(newColumns) {
		console.log('Default Columns Saved In Database... (not really)');
	}

	openSimpleConfirmation() {
		const config = {
			cancelButtonText: 'No',
			confirmationButtonText: 'Yes',
			content: 'Do you like this simple confirmation dialog?',
			title: 'Happy day :)'
		};
		this.dialog.open(SimpleConfirmationComponent, {
			width: '400px',
			data: config
		}).afterClosed().subscribe((data) => {
			this.likesSimpleConfirmation = data;
			this.hasOpenedSimple = true;
		});
	}

	openClickOutsideOverlay(event) {
		this.overlayOpen = !this.overlayOpen;
		event.stopPropagation();
	}

	closeClickOutsideOverlay() {
		this.overlayOpen = false;
	}

	itemChange(chosen) {
		this.chosen = chosen;
	}

	itemChangeMulti(chosen) {
		this.chosenMulti = chosen;
	}

	filterFunction(item, regex) {
		return item.name.toLowerCase().match(regex) !== null;
	}

	openMTCToast() {
		const config = {
			position: this.toastLocation,
			canClose: true,
			timeout:0
		};
		let toast;
		switch (this.toastType) {
			case 'info':
				toast = this.mtcToastService.info('content of a neutral toast', config);
				break;
			case 'success':
				toast = this.mtcToastService.success('content of a toast displayed <strong>correctly</strong>', config);
				break;
			case 'error':
				toast = this.mtcToastService.error('content of a <strong>failed</strong> toast', config);
				break;
			case 'warning':
				toast = this.mtcToastService.warning('<strong>Warning</strong> content of stuff and stuff might break', config);
				break;
		}
		this.toast.push(toast);
	}

	clearMTCToasts() {
		this.toast.forEach((toast)=>{
			this.mtcToastService.clear(toast);
		});
	}

	closeToast() {

	}
}
