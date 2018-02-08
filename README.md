# MTC Modules

This module provides a component which displays environment and version info about the app. It will display the environment and version number of your app in the bottom left corner of your app at all times, in all environments except production.

**NOTE:** Examples of most of these components and services can be viewed by cloning this project and serving it

```shell
ng serve
```

### Setup

Install `mtc-modules` into your project with npm:

```shell
npm install --save git+ssh://git@bitbucket.mtc.byu.edu/amod/mtc-modules.git
```

In your `app.module.ts` file (i.e. the root module of your application) import the `MTCCoreModule` and `MTCCommonModule` like so:

```javascript
import { MTCCommonModule, MTCCoreModule } from 'mtc-modules';
```

```javascript
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MTCCoreModule.forRoot(),
		MTCCommonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

This will allow you to use any of the services, components, or directives included inside the MTCModules.

### MTC Environment

Add the component selector to your `app.component.html` file (i.e. the root component html file):

```html
<mtc-env [includeVersion]="true"></mtc-env>
```

**NOTE:** The MTCEnvComponent receives includeVersion as an input.  When set to true the component will look for a version.json file to find the current version.  Make sure to include that file if you set includeVersion to true.

### Time Picker

A time picker component is available for use.  To use it include the following html:

```html
<mtc-time-picker [time]="time" (changeTime)="time = $event" [autoSwitch]="false"></mtc-time-picker>
```

If autoSwitch is enabled then the clock will change from hours to minutes automatically when an hour is selected.
You can view an example by cloning this project and serving it by running ng serve.

### Date Picker

A date picker component is available for use.
To use it include the following html:

```html
<mtc-date-picker [dateFormat]="MM/DD/YY" [(date)]="date" [(endDate)]="endDate" [title]="'DATE'" (dateChange)="date = $event"
(endDateChange)="date = $event" [yearPicker]="false" [isAfter]="date" [isBefore]="date" [setDisabled]="myFunction()"
[control]="formControl"></mtc-date-picker>
```
The default date format is DD MMM YYYY.

The `[setDisabled]` input takes a function that returns a boolean value for a specific date. Without an input, this function defaults to setting disabled dates based on the `[isAfter]` and `[isBefore]` inputs.

The `[isAfter]` and `[isBefore]` inputs take a date object or the string `"'today'"` which will default to the current day. These inputs will disable dates before, or after the specified date respectively.

When using form validation pass the form control for the date-picker into the `[control]` input to pass on validators from the parent component. The date-picker will display validation messages internally, ex. `[control]="form.controls.controlName"`

Add the  `[endDate]` input only when you want the date picker to be a range date picker

### MTC Switch

A switch toggle is available for use.  To use it include the following html:

```html
<mtc-switch [model]="switch" (changedSwitch)="switch = $event"></mtc-switch>
```

### Click Outside Directive

The click outside directive is used to call a particular function when a click event falls outside a div.

```html
<div (clickOutside)="handleClickOutside()">
```

In this case the function handleClickOutside will be called anytime a user clicks outside the div.

### MTC Auto Complete

A type-ahead like component is available for use. By default this component only selects one items at a time. But if the 'multi' input is set to true the component will allow for multiple items to be chosen. itemChosen has two-way binding and can be treated like ngModel. However do not set or initialize itemChosen to null as this will break the component

* **items** - the list of items that will populate the drop-down
* **itemChosen** - the item that was chosen from the list
* **displayBy** - choose the attribute of the item that you wish to display in the drop-down, defaults to name
* **control** - the control on the form, needed for form validation
* **disabled** - can disable a auto-complete if not a control in a form, if it is a control, disable the control when it is passed in
```html
<mtc-auto-complete [(itemChosen)]="parentVar" [items]="searchableItems" [displayBy]="'attributeOfItemToDisplayBy'" name="controlName" [control]="form.controls.controlName"></mtc-auto-complete>

<mtc-multi-auto-complete [(itemChosen)]="parentVar" [items]="searchableItems" [displayBy]="'attributeOfItemToDisplayBy'" name="controlName" [control]="form.controls.controlName"></mtc-multi-auto-complete>
```
### MTC Checkbox Table

A checkbox table is available for use. Required inputs are *columns* and *rows* and there is an optional *config* input as well.

1. **Columns** is an array of CheckboxTableColumn objects. Object attributes are:
	* *title*: The label of the column (Required)
	* *attr*: The property of the row that will be shown in the cell
	* *text*: Override attr with a predefined text
	* *isBold*: Make the text of *prop* or *text* bold in the column
	* *icon*: String that is the name of the material icon to be displayed in the column
	* *iconColor*: String or function that sets material icon color
	* *width*: Flex percentage amount that can be either a number or a string
	* *mtcDate*: Force the column to be formatted using mtcDate pipe
	* *telephone*: Force the column to be formatted using telephone pipe
	* *yesNo*: Force the column to be formatted using YesNo pipe
	* *showTooltip*: Display a tooltip on hover or not
	* *sortAsc*: Sort rows by this column
	* *alignCenter*: Center align the text in the column
	* *overflow*: Sets the column overflow to either wrap or ellipses
	* *fixed*: Makes the column stay static and not scrollable
	* *visible*: Whether or not the column will show up in the table (Default: `true`)
	* *showTwoLines*: sets the column values to wrap to a second line and not ellipsis
	* *isArray*: object that defines array display {displayBy: '', tooltip: ''}
	* *iconFunction*: function to run by icons that are within a row instead of at the end with buttons
		* You will need to bind the function to the parent scope: `editFunction: somefunction.bind(this)`
	* *type*: type of column data, ie: number text, important when a column is editable
	* *editFunction*: function to run when cell is edited and clicked outside of, sets a column to be editable
		* if you need to edit but don't need to run a function, just set editFunction to true
		* You will need to bind the function to the parent scope: `editFunction: somefunction.bind(this)`

2. **Rows** is an array of row data

3. **Config** is a CheckboxTableConfig object
	* *removeCheckboxes*: Turns the checkbox table into a simple display without checkboxes (Default: `false`)
	* *placeholder*: What will display in the rows section when there are no rows passed in (Default: `No items to display`)
	* *maxHeight*: A number value for the maximum pixel height of the entire table (Default: `360`)
	* *rowHeight*: A number value for the desired pixel height of each row (Default: `48`)
	* *headerHeight*: A number value that sets only the table header to be a specific height (Default: `48`)
	* *buttonColumnWidth*: A number value that sets the width of a column that contains buttons (Default: `9`)
	* *fixedColumnsWidth*: A number value for the percent of the table that will be fixed columns (Default: `0`)
	* *topButtons*: An array of button objects that sets the buttons that are located above the header. Button object:
		* *text*: The label of the button
		* *function*: The function that will execute when the button is clicked
			* You will need to bind the function to the parent scope: `function: somefunction.bind(this)`
		* *alwaysVisible*: Boolean sets whether or not the button is always visible
		* **NOTE:** The "Manage Columns" Button is a special topButton that opens the manage columns dialog:
			* Pass in a button object: `{text: 'Manage Columns', function: manageColumnsFunction.bind(this), alwaysVisible: true}`
			* The manageColumnsFunction will have one parameter: `manageColumnsFunction(newColumns)` the newColumns object:
				* *columns*: An array of column objects that will have the *fixed* and *visible* attributes changed based on what the user did inside the dialog.
				* *saveAsDefault*: Whether or not the user checked the 'Save As Default' checkbox (Default: `false`)
	* *rowButtons* - An object that sets the buttons that are located inside each row
		* The row button object is the same as the top button **except** it does not have the *alwaysVisible* attribute
	* **NOTE:** *removeCheckboxes* and *placeholder* can be passed in as their own inputs if an entire config object is not needed

Add the component selector into the desired `component-name.component.html` file.

```html
<mtc-checkbox-table [columns]="columns" [rows]="rows" [config]="checkboxTableConfig"></mtc-checkbox-table>
```

To size the checkbox table, put it in a div with the class mtc-checkbox-table-container and give that a height


### MTC Toast

Add the component selector to your `app.component.html` file (i.e. the root component html file):

```html
<mtc-toast></mtc-toast>
```

Add the MTC Toast service anywhere you need to open a dialog like so:

```javascript
import { MTCToastService } from 'mtc-modules';

//...

constructor(private mtcToastService : MTCToastService){}
```

The MTCToastService has several functions

To open a toast: success, warning, error, and info

```javascript
//for the functions success, warning, error, and info
//content is a string that will be set as the toast content

//for success, warning, and error functions
//put the text you want to be set to a color and bold inside the strong tag

const content = "this is a <strong>successful<strong> toast message";
this.mtcToastService.function(content);
//function is which function you want to use
```

defaults:
	closes after 5 seconds
	no close button
	location is in the button right corner

Defaults can be changed by including what you want to change in a config object and passing it in

```javascript
config={
	timeout:8000,//time in milliseconds the toast will be open, you can set it to 0 and the toast will stay open forever
	position: 'bottom left',//other options include 'top right' and 'top left'
	canClose: true// true if you want there to be a close button
};//only include in the config object what you want to change from default

this.mtcToastService.functions(content, config);

```

The above functions will pass back a toast object for each toast which can be passed into the clear function to close that toast

```javascript
toast=this.mtcToastService.functions(title, content);
this.mtcToastService.clear(toast);
```

### Telephone Pipe

This pipe is used to format a set of numbers into a telephone format.

```html
<div>{{number | telephone}}</div>
```


### MTC Dialog

Add the component selector to your `app.component.html` file (i.e. the root component html file):

```html
<mtc-dialog></mtc-dialog>
```

For the layout selectors used by mtc-dialog and other mtc-module components, make sure that you have included the mtc-layout component selector in your `app.component.html` file (i.e. the root component html file):

```html
<mtc-layout></mtc-layout>
```

Add the MTC Dialog service anywhere you need to open a dialog like so:

```javascript
import { MTCDialogService } from 'mtc-modules';

//...

constructor(private mtcDialogService : MTCDialogService){}
```

The component that you want to display in the dialog also needs to be imported

```javascript
import { SampleDialog } from 'some-file-path';
```

**NOTE:** This component also needs to be added to the entryComponents array in your root module file:

```javascript
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MTCCoreModule.forRoot(),
		MTCCommonModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [
	    SampleDialog
	]
})
export class AppModule { }
```

The MTCDialogService has several functions that can be used to open and close popups.

1) Show

```javascript
//ComponentToDisplay is the component that will show up in the popup
//Width designate the size of the popup to be displayed
//passableData is any object that needs to be passed into the popup
this.mtcDialogService.show(ComponentToDisplay, width, passableData).subscribe((data) => {
	//Code to run once popup is closed
	//data will be whatever is passed into the hide event
});
```

2) getData

```javascript
this.importantDataFromParent = this.mtcDialogService.getData();
//Any data passed as the third parameter into show can be retrieved by calling getData inside the ComponentToDisplay
```

3) Hide

```javascript
this.mtcDialogService.hide(importantData);
//The hide function closes the popup and passes the data into any function subscribing to the show function.
//See the show function from above
```

4) Cancel

```javascript
this.mtcDialogService.cancel();
//The cancel function will close the dialog but will not pass any data through the subscriber to show.
```

### Simple Confirmation

One commonly used dialog is a popup to ask a simple question like "Are you sure you want to delete?" or "Do you like cake?".  The simple confirmation is the easiest way to build a dialog.

Warning: The innerHTML bound the user has an opportunity to do html injection. Clean user input before displaying any portion in the simple confirmation dialog.

```javascript
import { MTCDialogService, SimpleConfirmationComponent } from 'mtc-modules';

//...
//In this case config describes the parts of the simple confirmation popup.
//The following config example will make a popup that asks: 'Are you sure?'
//with a cancel and a remove button.  This is also the default configuration
//of this popup.

//If you want to remove either button you can pass in the boolean false instead of a string.
config = {
	cancelButtonText: 'cancel',
	confirmationButtonText: 'remove',
	content: 'Are you sure?'
};
this.mtcDialogService.show(SimpleConfirmationComponent, width, height, config).subscribe((data) => {
    //Data will be true if the person clicked the confirmation button
    //or false if they clicked the cancelbutton
});
```

**NOTE:** SimpleConfirmationComponent also needs to be added to the entryComponents array in your root module file:

```javascript
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MTCCoreModule.forRoot(),
		MTCCommonModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [
	    SimpleConfirmationComponent
	]
})
export class AppModule { }
```

#### MTC Storage API

In the HTML add the input file component. If you want images, you can specify a preview flag and the component will show a preview of the image after you upload it to the input component:

```html
<mtc-file [preview]="true" [name]="'Upload Image'" (onFileSelected)="onImageFileSelected($event)"></mtc-file>
```

Then in the component's typescript file, import the StorageApiService from mtc-modules and add the onFileSelected callback function:

```javascript
import { StorageApiService } from 'mtc-modules';

constructor(private storageService: StorageApiService) {}

// If you want the file immediately uploaded to the storage API upon selecting the file (which you probably won't want to do), you can do it like this:
onImageFileSelected(file) {
	this.storageService.submitFile(file).subscribe((uploadDetails) => {
		/** uploadDetails looks like this:
		{
			extension: ".jpg",
			mimeType: "image/jpeg",
			sha1: "kBWpRHvSHhQfS33jpQaZXNB0JhI=",
			url: "https://cdn.mtc.byu.edu/storage/5ad9e458-a4f9-4252-b6aa-b6be8305762f/dev/e53b3810-2856-4e26-b7ab-4867420491c2.jpg"
		}
		**/
	});
}
```

#### MTC Email

First import the service into the component that needs it and inject it into the constructor:

```javascript
import { MTCEmail } from 'mtc-modules';

constructor(private email: MTCEmail) {}
```

After injecting the email service into your constructor you can call send at any time like so:

```javascript
sendEmail() {
	this.email.send({
	    recipients: 'bob@gmail.com, joe@gmail.com', // Required
        from: 'me@me.me', // see note below
        subject: 'Hey bro',
        text: '<div>Supports HTML markup</div>', // Required
        recipientType: 'bcc' // Can be bcc, cc or to (defaults to to)
	}).subscribe((res) => { console.log('success!') }, (err) => { console.log('failed!') });
}
```

**NOTE:** You do not have to include a "from" e-mail address. If you don't then the e-mail will automatically say it was sent from the MTC messaging API. If you do include a personal e-mail address then the recipients may receive a "phishing" notice saying that the e-mail wasn't sent directly from the "from" address you provided. You can also leave the subject blank.

**NOTE:** It is very important that you subscribe to the observer returned from send.  If you don't the email will never actually be sent.


#### MTC SMS

First import the service into the component that needs it and inject it into the constructor:

```javascript
import { MTCSMS } from 'mtc-modules';

constructor(privprivate sms: MTCSMS) {}
```

After injecting the sms service into your constructor you can call send at any time like so:

```javascript
sendText() {
	this.sms.send({
	    recipients: '8013367333A, 8103367222S', // Required
        from: 'me@me.me', // Required
        body: 'lets be best bros', // Required
	}).subscribe((res) => { console.log('success!') }, (err) => { console.log('failed!') });
}
```

**NOTE:** The to phone number must include a letter indicating which carrier the phone number uses.
#### Carrier Codes
T - T-Mobile
R - Rogers
B - Bell Canada
M - TelCel
A - AT&T
S - Sprint
C - Cellular One
U - US Cellular
N - Nextel

The SMSCarrier interface contains static members with each of these codes. You can access them like so:
```javascript
import { SMSCarrier } from 'mtc-modules';

//...
getATTCarrierCode(){
    return SMSCarrier.ATT.code; //returns A
}
```


Alternatively, if every number you are sending to has the same carrier, you can set the carrier with a function call like so:

```javascript
import { SMSCarrier } from 'mtc-modules';

//...

sendTextToSprintCustomers() {
    this.sms.setCarrier(SMSCarrier.SPRINT);
	this.sms.send({
	    recipients: '8013367333, 8103367222',
        from: 'me@me.me',
        body: 'bacon',
	}).subscribe((res) => { console.log('success!') }, (err) => { console.log('failed!') });
}

//...
```

# MTC Auth 2

### Setup

You must also include the MTC Auth service in your application. This can be done in one of two ways.

1) copy ./src/mtc-auth.js into the public folder of your project. Then insert
```html
	<script src="mtc-auth.js"></script>
```
into the body tag of your index.html

2) Paste the following script tag into the body of your index.html
```html
	<script src="https://apps.mtc.byu.edu/auth/mtc-auth2.js"></script>
```


### Configure

You will then need to create a new javascript file in your public file. There is an example of a possible file in the examples folder. But it should look something like this.

```javascript

	MTCAuth.configure({
		redirectUri: true,
		clientId: '123456789',
		contentUrls: ['someUrl'],
		newTabRedirectUri: true,
		scopes: ['someScopeUre'],
		options: {
			requestAuths:'anyRequestedAuths'
		}
	});
```

The following are the currently available options for the configuration object:

* **clientId**: ID of your Auth client.
* **contentUrls**: Array of API prefixes that need to have the `Authorization` header attached for authentication. The MTCAuth service will ensure that a valid token is possessed by the user before getting content from these API's and will soon automatically refresh your token in the background when it expires.
* **scopes**: Array of scope strings.
* **redirectUri**: The URL you want auth to take the user back to after authentication. If you just want the user to go back to where they started, set this as `true`.
* **options**: A map of additional key/value pairs to include on the request to auth. See "BYU Sign In" for more info.
* **newTabRedirectUri**: In order to use this we recommend you take the iframeRefresh.html file and place it in your public folder. This parameter can be set to true if you are using hash routing or it can be set to the baseurl/iframeRefresh.html. You will have to register a new redirectURI for your app. That looks like baseurl/iframeRefresh.html e.g. https://test-apps.mtc.byu.edu/arc/iframeRefresh.html

##### BYU Sign In

If your app needs BYU authentication in addition to LDS Account, you can add the following block to the config:

* **requestAuths**: A string to request additional authentication. Allowed values are:
	* **byulogin**: Require a user to sign in to BYU every time they visit your app in addition to LDS Account.
	* **byurequired**: This option ensures a user has bound their BYU account to their LDS account by making sure they sign in to BYU at least once if they never have, otherwise signing in to BYU isn't necessary.
	* **byu**: The option to sign in to BYU is given to the user, but they have the option to reject it.

```javascript
options: {
	requestAuths: 'byurequired'
}
```

***Note:** We now watch for an expiring token and in the last 5 minutes of the token it will refresh the token behind the scene. After the token has expired it will reauthenticate when the user interacts with the page immediately. instead of waiting for a refresh.
* Watch for expiring token and refresh before it expires. (decide on this part later)


### Log Out

To log out, simply create a function which calls `MTCAuth`'s logout method:

```javascript
logout() {
	MTCAuth.logout();
}
```

Next, inject the various services you'll be using into your constructor, like so:

```javascript
constructor(private userService: MTCUser) {}
```


### MTC User

Immediately following the authentication `if` statement, simply add the following code to get the user after the app is authenticated, as is shown below:

```javascript
if(!this.auth.isAuthenticated()) {
	this.auth.authenticate();
}
this.userService.getUser().subscribe((user) => {
	// Do something with `user`
});
```

That will go get the info on the user from Auth's `tokeninfo` endpoint using the currently logged in user's `accessToken`. This returns an object of type `MTCAuthUser`, which is importable from the `mtc-auth2` library. (shown above)

There is also a `hasRole()` method you can access. This returns a `boolean` as to whether or not the user has that role. Make sure before running that method, you run `getUser()` to ensure the user is defined.

```javascript
this.userService.getUser().subscribe(() => {
	let isDeveloper = this.userService.hasRole('developer');
});
```

### MTC Http

Wherever you need to use the http service in your app, simply declare it in your constructor:

```javascript
constructor(private http: MTCHttp) {}
```

You can then use it like so:

```javascript
this.http.get(ENDPOINT_URL).subscribe((response) => {
    let data = response.json();
	// Do something with `data`.  The json function needs to be called if you want the data to be a java object.
});
```

The supported methods are `get()`, `put()`, `post()`, and `delete()`.
During authentication the http service will keep track of all requests and make them again after the token has been refreshed. If a request comes back as unauthorized the application will refresh its token several times and remake the request in an attempt to authorize the request.

**NOTE:** You must subscribe to the observer returned from the http request or the call will not go through.


### MTC URL

You will need to provide the MTCURL once for your application you can register a set of urls like so:

```javascript
this.urlProvider.provideUrls('{{urlId}}', {
	dev: 'http://devapplications.mtc.byu.edu/standards/v1',
	test: 'http://testapplications.mtc.byu.edu/standards/v1',
	stage: 'http://stageapplications.mtc.byu.edu/standards/v1',
	beta: 'http://betaapplications.mtc.byu.edu/standards/v1',
	prod: 'http://app.mtc.byu.edu/standards/v1',
	support:'http://devapplications.mtc.byu.edu/standards/v1'
});
```

All keys are required.
**NOTE:** It is also required that the url ends with a character besides a '/'; This is to avoid confusion when using the service


To retrieve a prefix you simply call:

```javascript
this.urlProvider.getPrefix('{{urlId}}');
```

This will return the url that was registered to the given urlId. Currently there are no requirements on urlId's.
But if they are registered more than once the last registration will be the one to take effect.


The last method is getEnvironment. It returns a string prefix associated with the hostname that the script is currently running on.


