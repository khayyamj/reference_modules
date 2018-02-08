import { NewDevTrainingPage } from './app.po';

describe('new-dev-training App', () => {
	let page: NewDevTrainingPage;

	beforeEach(() => {
		page = new NewDevTrainingPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
