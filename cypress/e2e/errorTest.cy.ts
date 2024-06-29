import { getApiUrl } from "../../src/utils";

describe("fetch Articles", () => {
  const apiUrl = getApiUrl(1);
  const apiKey = Cypress.env("NYT_API_KEY");
  const url = `${apiUrl}?api-key=${apiKey}`;

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.intercept("GET", url, {
      statusCode: 404,
    }).as("fail");
  });

  it("should check fetch for error", () => {
    cy.get(`[data-testid="error-div"]`)
      .should("exist")
      .should(
        "have.text",
        "Error: Network response was not ok, Too many calls"
      );
  });
});
