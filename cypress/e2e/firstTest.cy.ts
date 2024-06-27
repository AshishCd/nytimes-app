describe('cypress-nytimes', () => {
  it('renders default elements on the screen', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cypress-main-header"]').should("exist").should("have.text", "Today's Most Popular Articles");
    cy.get('[data-testid="cypress-sidebar-header"]').should("exist").should("have.text", "Past week");
  });

  it("renders artciles on the screen", () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cypress-article-title-100000009537185"]').should("exist").should("have.text", "Roger Federer’s Graduation Speech Becomes an Online Hit");
  })
})