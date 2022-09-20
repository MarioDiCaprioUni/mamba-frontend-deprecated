import { SERVER_URL } from "../../variables";


describe('/register', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/register');

        cy.intercept('POST', `${SERVER_URL}/register`, {
            statusCode: 200,
            body: {
                valid: true
            }
        }).as('register');

    });

    it('should show login form and submission works', () => {
        cy.get(`[data-test="registerForm"]`).should('be.visible');

        cy.get(`[data-test="registerUsername"]`).type('Hello');
        cy.get(`[data-test="registerEmail"]`).type('helloworld@gmail.com');
        cy.get(`[data-test="registerPassword"]`).type('World');
        cy.get(`[data-test="registerTermsAndServices"]`).click();
        cy.get(`[data-test="registerSubmitButton"]`).click();

        cy  .wait('@register')
            .its('response.body')
            .should('have.property', 'valid')
            .and('equal', true);
    });

});
