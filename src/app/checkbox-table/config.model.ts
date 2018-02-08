export interface CheckboxTableConfig {
	placeholder?;		//also a seperate input if it's all you need to pass in
	rowHeight?;			//height of all rows including header if headerHeight is left out of config
	headerHeight?;		//sets only table header to be specific height
	buttonColumnWidth?
	topButtons?;
	rowButtons?;
	rowFunction?;
	resultsCountName?;
	export?:boolean;
}
