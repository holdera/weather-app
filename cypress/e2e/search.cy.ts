const testingLocation = 'http://localhost:3000';

describe('Search tool', () => {
	beforeEach(() => {
		cy.visit(testingLocation);
		cy.wait(17000);
	});

	it('user can successfully search a city and see data', () => {
		cy.get('#city').type('rome');
		cy.get('#search-btn').click();
		cy.get('h1').contains('Rome');
		cy.wait(9000);
	});

	it('user cannot successfully search a city if there the text field is empty', () => {
		cy.get('#search-btn').click();
		cy.get('[data-test="error-city"]').contains(
			'Please add a city in the text field above'
		);
	});

	it('Error message displays if users adds an invalid value to search tool', () => {
		cy.get('#city').type('hghghg');
		cy.get('#search-btn').click();
		cy.get('#hero-error h1').contains('Error');
		cy.get('#hero-error p').contains(
			'Search value is not valid. Please try again.'
		);
	});
});
