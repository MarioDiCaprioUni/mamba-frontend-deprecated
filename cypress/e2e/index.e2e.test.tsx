import { SERVER_URL } from "../../variables";


describe('/index', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');

        cy.intercept('POST', `${SERVER_URL}/login`, {
            statusCode: 200,
            body: {
                valid: true
            }
        }).as('login');

    });


    it('should display login form if not logged in and submission works', () => {
        cy.get(`[data-test="loginForm"]`).should('be.visible');
        
        cy.get(`[data-test="loginUsername"]`).type('Hello');
        cy.get(`[data-test="loginPassword"]`).type('World');
        cy.get(`[data-test="loginSubmitButton"]`).click();
        
        cy  .wait('@login')
            .its('response.body')
            .should('have.property', 'valid')
            .and('equal', true);
    });

});
