describe('Authentication Flow', () => {
    const uniqueUser = `testuser_${Date.now()}`;
    const password = 'password';

    it('should register a new user and redirect to vacations', () => {
        cy.visit('/register');

        // Fill form
        cy.get('input[name="firstName"]').type('Test');
        cy.get('input[name="lastName"]').type('User');
        cy.get('input[name="username"]').type(uniqueUser);
        cy.get('input[name="password"]').type(password);

        // Submit
        cy.get('button[type="submit"]').click();

        // Verify redirect to /vacations (or login then vacations?)
        // Assuming successful registration auto-logs in or redirects to login
        // Let's check URL
        // If auto-login:
        cy.url().should('include', '/vacations');
        cy.contains(`Hello ${uniqueUser}`).should('not.exist'); // Optional greeting check
    });

    it('should login with existing user', () => {
        // We can use the user created above if we persist state? 
        // Ideally we should seed the DB or use a known user.
        // Let's use the one we just made, but 'it' blocks are independent?
        // Cypress clears storage between tests.
        // So we need to create it again or rely on seeding.
        // For simplicity, let's create a NEW user for this test or assume we can reuse if we knew the DB state.
        // Better: Register again with NEW unique name.

        const loginUser = `login_user_${Date.now()}`;

        // Register first to ensure user exists (SETUP)
        cy.request('POST', 'http://localhost:3001/api/auth/register', {
            firstName: 'Login',
            lastName: 'User',
            username: loginUser,
            password: password
        });

        cy.visit('/login');
        cy.get('input[name="username"]').type(loginUser);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/vacations');
    });
});
