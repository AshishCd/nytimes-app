import { IMostViewedArticles } from "../../src/interface/type";
import { getApiUrl } from "../../src/utils";

describe('cypress-nytimes', () => {
  const apiUrl = getApiUrl(1);
  const apiKey = Cypress.env('NYT_API_KEY');
  const url = `${apiUrl}?api-key=${apiKey}`;

  //header elements
  it('renders default elements on the screen', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cypress-main-header"]').should("exist").should("have.text", "Today's Most Popular Articles");
    cy.get('[data-testid="cypress-sidebar-header"]').should("exist").should("have.text", "Past week");
  });

  beforeEach(() => {
    // Clear all previous intercepts and aliases to ensure a clean state
    cy.intercept(url).as('getArticles');  // Re-establish alias if needed
  });

  //fetch api call
  it('should fetch all articles correctly', () => {
    cy.request(url).then((response) => {
      // Check if the response status is 200
      expect(response.status).to.eq(200);

      // Check if the response body has the 'results' property
      expect(response.body).to.have.property('results');

      // Check if the 'results' array is not empty
      expect(response.body.results).to.be.an('array').that.is.not.empty;

      // Store the results in Cypress's test context
      cy.wrap(response.body.results).as('articlesData');

      // Loop through each article and check required properties
      response.body.results.forEach((article: IMostViewedArticles) => {
        expect(article).to.have.property('title');
        expect(article).to.have.property('url');
        expect(article).to.have.property('abstract');
      });
    });
  });
})