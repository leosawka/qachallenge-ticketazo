describe('Login y menú hamburguesa', () => {

  beforeEach(() => {
    cy.viewport('iphone-6'); // por menú burguer
    cy.visit('https://vps-3696213-x.dattaweb.com/')

    // Abrir formulario Login
    cy.get('.z-0').first().click({ force: true });
    cy.get('[data-cy="input-email"]', { timeout: 10000 }).should('be.visible');
  })

  it('Valida login con datos correctos', () => {
    cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com');
    cy.get('[data-cy="input-password"]').type('Organizador9!');
    cy.get('[data-cy="btn-login"]').click();

    // Validar que URL cambie a dashboard
    cy.url({ timeout: 10000 });
  });
      
    // Abrir menú hamburguesa
  it('Abre menú burguer y entra a Gestionar Salas', () => {
    // Primero hacer login para estar autenticado
    cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com');
    cy.get('[data-cy="input-password"]').type('Organizador9!');
    cy.get('[data-cy="btn-login"]').click();

    cy.url({ timeout: 10000 });

    // Abrir menú hamburguesa
    cy.get('button[aria-label="Toggle menu"]', { timeout: 10000 }).should('be.visible').click();
   
   // Esperar y clicar enlace Gestionar Salas en menú móvil
    cy.get('ul.absolute.pt-2.pl-8', { timeout: 10000 }).should('be.visible');
    cy.get('ul.absolute.pt-2.pl-8').find('a[href="/seatsLayout"]').should('have.length', 1).click({ force: true });

    // Validar url en Gestionar Salas
    cy.url({ timeout: 10000 }).should('include', '/seatsLayout');
  });
    

  
});


