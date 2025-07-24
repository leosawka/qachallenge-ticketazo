describe('Login del organizador', () => {
  it('debería loguearse con credenciales válidas', () => {
    cy.visit('/');

    cy.contains('Login').click({ force: true });

    cy.get('input[type="email"]').type('himexxiii@gmail.com');
    cy.get('input[type="password"]').type('Organizador9!');
    cy.contains('Login').click();

    cy.contains('Cargar Evento').should('exist');
  });
});
