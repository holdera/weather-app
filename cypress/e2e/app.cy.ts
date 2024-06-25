const siteLocation = 'http://localhost:3000';
describe('weather app', () => {
	it('app gets users location and propagates data into the app', () => {
		cy.visit(siteLocation);
		cy.wait(15000);
		cy.get('h1').contains('Current location');
	});

	it('dropdowns work', () => {
		cy.visit(siteLocation);
		cy.wait(15000);
		cy.get(':nth-child(2) > [data-test="day-item-btn"]').click();
		cy.get('h3').contains('Weather Forecast');
		cy.wait(5000);
	});

	it('drag dropdown content horizontally', () => {
		cy.visit(siteLocation);
		cy.wait(15000);
		cy.get(':nth-child(2) > [data-test="day-item-btn"]').click();
		cy.get('#0-dropdown-data')
			.trigger('mousedown', { which: 1, pageX: 600, pageY: 100 }) // Starting point
			.trigger('mousemove', { which: 1, pageX: 300, pageY: 100 }) // Drag to the left
			.trigger('mouseup');
	});
});
