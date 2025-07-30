const viewports = [
  { name: 'Desktop Full HD', width: 1920, height: 1080 },
  { name: 'Desktop HD', width: 1280, height: 800 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 }
];

viewports.forEach(({ name, width, height }) => {
  describe(`Login de Organizador - Vista responsive: ${name}`, () => {
    beforeEach(() => {
      cy.viewport(width, height);
      cy.visit('/');
      cy.contains('Login').click({ force: true });
    });

    it('debería loguearse exitosamente y mostrar la sección "Mis entradas"', () => {
      cy.get('input[type="email"]').type('himexxiii@gmail.com');
      cy.get('input[type="password"]').type('Organizador9!');
      cy.contains('Login').click();

      if (width < 1024) {
        cy.get('.lg\\:hidden .justify-end .z-0').click();
        cy.contains('Mis entradas').click({ force: true });
      } else {
        cy.contains('Mis entradas').click();
      }

      cy.url().should('include', '/tickets/list');

      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Ver evento")').length > 0) {
          cy.get('button:contains("Ver evento")').should('have.length.at.least', 1);
        } else {
          cy.contains('No tienes entradas compradas').should('exist');
        }

        if ($body.text().includes('Gestionar Salas')) {
          cy.log('Es un Organizador CON local físico');
        } else {
          cy.log('Es un Organizador SIN local físico');
        }
      });
    });

    it('debería mostrar error si el email es incorrecto', () => {
      cy.get('input[type="email"]').type('incorrecto@mail.com');
      cy.get('input[type="password"]').type('Organizador9!');
      cy.contains('Login').click();

      cy.get('[data-cy="error-message"]', { timeout: 6000 })
        .should('be.visible')
        .and('contain.text', 'Correo o contraseña incorrectos');
    });

    it('debería mostrar error si la contraseña es incorrecta', () => {
      cy.get('input[type="email"]').type('himexxiii@gmail.com');
      cy.get('input[type="password"]').type('ContraseñaIncorrecta!');
      cy.contains('Login').click();

      cy.get('[data-cy="error-message"]', { timeout: 6000 })
        .should('be.visible')
        .and('contain.text', 'Correo o contraseña incorrectos');
    });

    it('debería mostrar errores si los campos están vacíos', () => {
      cy.contains('Login').click();

      cy.get('input:invalid').should('have.length.at.least', 2);
    });
  });
});
