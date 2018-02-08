export interface CheckboxTableColumn {
	title;				//this is the label of the column
	attr?;				//the property of the row that will be shown in the cell
	text?;				//override prop with a predefined text
	icon?;				//string that is the name of the material icon
	iconColor?;			//set icon color if different than default
	width?;				//percentage amount that binds to flex can be either a number or string
	mtcDate?;			//force the column to be formatted using mtcDate pipe
	yesNo?;				//force the column to be formatted using yesNo pipe
	telephone?;			//force the column to be formatted using telephone pipe
	showTooltip?;		//display a tooltip on hover or not
	fixed?;				//stay static and never scrollable
	isBold?;			//should the text be bold
	sortAsc?;			//sorts rows by this column
	showTwoLines?;		//whether or not the text in the cell should wrap on overflow or show ellipses
	visible?;			//whether or not the column will show up in the table
	columnWidth?;		//Used by the checkbox table. Don't pass anything in
	isArray?: { displayBy?: string, tooltip?: string };	//sets column to expect arrays
	iconFunction?;		//function ran when clicking on function
	type?;				//type of column values
	editFunction?;		//function to run when saving an edit
	editing?:boolean;	// internal value set to should column value is being edited
}
