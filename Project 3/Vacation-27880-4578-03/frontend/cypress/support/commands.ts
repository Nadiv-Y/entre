/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Cypress {
    interface Chainable {
        login(username?: string, password?: string): Chainable<Element>;
        register(_user: any): Chainable<Element>;
    }
}

Cypress.Commands.add('login', (username = 'testuser', password = 'password') => {
    cy.session([username, password], () => {
        cy.log('Preparing login via API');
        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/auth/login',
            body: { username, password },
        }).then((resp) => {
            const token = resp.body.token;
            if (token) {
                localStorage.setItem('token', token);
                cy.log('Token stored in localStorage');
            } else {
                cy.log('No token found in response body');
            }
        });
    });
});

Cypress.Commands.overwrite('login', (_originalFn, username = 'testuser', password = 'password') => {
    cy.visit('/login');
    cy.get('input[name="username"]').clear().type(username);
    cy.get('input[name="password"]').clear().type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('register', (user) => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
});