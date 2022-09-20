import { mount } from "cypress/react";
import { SERVER_URL } from "../../../variables";
import { Providers } from "../../../pages/_app";
import LoginPanel from "./LoginPanel";


describe('<LoginPanel>', () => {

    beforeEach(() => {

        cy.intercept('POST', `${SERVER_URL}/login`, {
            statusCode: 200,
            body: {
                valid: true
            }
        }).as('login');

    });


    it('should login client', () => {
        mount(
            <Providers>
                <LoginPanel />
            </Providers>
        );

        cy.get(`[data-test="username"]`).type('Hello');
        cy.get(`[data-test="password"]`).type('World');
        cy.get(`[data-test="login"]`).click();

        cy  .wait('@login')
            .its('response.statusCode')
            .should('equal', 200);
    });
});
