describe('Vacations Flow', () => {
    const username = `vacation_user_${Date.now()}`;
    const password = 'password';

    before(() => {
        cy.request('POST', 'http://localhost:3001/api/auth/register', {
            firstName: 'Vacation',
            lastName: 'Tester',
            username: username,
            password: password
        });
    });

    it('should follow a vacation and see it move to top', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/vacations');

        // Initially, no vacations are followed.
        // Let's find Rome (which is typically not at the top in date sort)
        cy.contains('.MuiCard-root', 'Rome').as('romeCard');

        // Check it's not the first one
        cy.get('.MuiCard-root').first().should('not.contain', 'Rome');

        // Follow Rome
        cy.get('@romeCard').find('button').contains('Likes').click();

        // Now Rome should be at the top because it's the only one followed
        cy.get('.MuiCard-root').first().should('contain', 'Rome');

        // Unfollow Rome
        cy.get('.MuiCard-root').first().find('button').contains('Like').click();

        // Rome should no longer be at the top (unless it's the earliest/latest depending on sort)
        // But it should at least not have the 'contained' style anymore
        cy.contains('.MuiCard-root', 'Rome').find('button').should('have.class', 'MuiButton-outlined');
    });
});
