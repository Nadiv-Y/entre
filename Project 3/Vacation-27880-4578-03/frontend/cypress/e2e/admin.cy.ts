/// <reference types="cypress" />

describe('Admin Flow', () => {

    it('should login, edit a vacation, and view reports', () => {
        // 1. Login
        cy.visit('/login');

        // Wait for Form
        cy.get('input[name="username"]', { timeout: 15000 }).should('be.visible').type('admin');
        cy.get('input[name="password"]', { timeout: 15000 }).should('be.visible').type('admin123');
        cy.get('button[type="submit"]').click();

        // 2. Wait for successful login (proof: Logout button in Header)
        cy.contains('button', 'Logout', { timeout: 30000 }).should('be.visible');
        cy.url().should('include', '/vacations');

        // Wait for content to load (CircularProgress should disappear, or content appear)
        cy.contains('button', 'Add Vacation', { timeout: 20000 }).should('be.visible');

        // 3. Edit a vacation
        // We look for the first card and click Edit
        cy.get('.MuiCard-root', { timeout: 15000 }).should('have.length.at.least', 1);
        cy.get('.MuiCard-root').first().within(() => {
            cy.contains('Edit').click();
        });

        // Modal should open
        cy.get('div[role="dialog"]', { timeout: 15000 }).should('be.visible');

        // Change price and save
        const newPrice = '1337.00';
        cy.get('input[name="price"]').clear().type(newPrice);
        cy.contains('button', 'Save').click();

        // Modal should close
        cy.get('div[role="dialog"]').should('not.exist');

        // Verify the update
        cy.contains('$' + newPrice, { timeout: 15000 }).should('be.visible');

        // 4. View reports
        // Click link in header or visit URL
        cy.visit('/admin/reports');
        cy.url().should('include', '/admin/reports');
        cy.get('canvas', { timeout: 15000 }).should('be.visible');
        cy.contains('Vacation Reports').should('be.visible');
    });
});
