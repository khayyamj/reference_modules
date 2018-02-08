
var clientId = '';
var url = '';
var env = '';
clientId = '04be4ca8-b8c2-439e-ae75-ba4b5e86f2dc';

var contentUrls = [
	'http://localhost:8080',
	'https://devapplications.mtc.byu.edu',
	'https://testapplications.mtc.byu.edu',
	'https://betaapplications.mtc.byu.edu',
	'https://stageapplications.mtc.byu.edu',
	'https://supportapplications.mtc.byu.edu',
	'https://api.mtc.byu.edu',
	'https://app.mtc.byu.edu'
];

var scopes = [
	'https://api.mtc.byu.edu/messaging',
	'https://app.mtc.byu.edu/missionaryserverside',
	'https://api.mtc.byu.edu/mtc',
	'https://api.mtc.byu.edu/missionary',
	'https://app.mtc.byu.edu/mtctools',
	'https://api.mtc.byu.edu/standards',
	'https://api.mtc.byu.edu/note'
];


MTCAuth.configure({
	clientId: clientId,
	contentUrls: contentUrls,
	scopes: scopes,
	redirectUri: true,
	options: {
		requestAuths: ''
	},
	newTabRedirectUri: false
});
