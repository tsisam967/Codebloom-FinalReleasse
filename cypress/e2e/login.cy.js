describe('CodeBloom Signup and Login Flow', () => {
  const email = 'testuser@codebloom.com';
  const password = 'testpassword';

  it('Signs up and logs in successfully', () => {
    cy.visit('https://codebloom-frontend.onrender.com');
    cy.contains('Signup').click();

    // Fill signup form (no "full name" field)
    cy.get('input[placeholder="Enter email"]').type(email);
    cy.get('input[placeholder="Enter password"]').type(password);
    cy.contains('Sign Up').click();

    // ✅ Confirm redirect to profile (not logout button)
    cy.url({ timeout: 10000 }).should('include', '/profile');

    // ✅ Then log out if needed
    cy.contains('Logout').click();

    // Go to login
    cy.contains('Login').click();

    // Fill login form
    cy.get('input[placeholder="Enter email"]').type(email);
    cy.get('input[placeholder="Enter password"]').type(password);
    cy.contains('Log In').click();

    // ✅ Confirm login success again
    cy.url({ timeout: 10000 }).should('include', '/profile');
  });
});
