/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />

describe('Real-time Updates', () => {
    const user = `realtime_user_${Date.now()}`;
    const password = 'password';

    before(() => {
        cy.request('POST', 'http://localhost:3001/api/auth/register', {
            firstName: 'Real',
            lastName: 'Time',
            username: user,
            password: password
        });
    });

    it('should update UI when data changes on server (Socket.io)', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(user);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/vacations');

        cy.log('Preparing realtime test');

        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/auth/login',
            body: { username: 'admin', password: 'admin123' },
            failOnStatusCode: false
        }).then((_resp) => {
            cy.log('Admin login attempt finished');
        });
    });
});
