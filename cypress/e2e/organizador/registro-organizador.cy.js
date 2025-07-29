import { createMailTmAccount } from '../../support/mailTmHelper';

describe('Validaciones del Registro de Organizador', () => {
  const password = 'Test1234!';
  let email;
  let timestamp;

  beforeEach(() => {
    timestamp = Date.now();
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.contains('Login').click({ force: true });
    cy.contains('¿Queres crear tus eventos?').click();
    cy.url().should('include', '/auth/registerClient');
  });

  it('debería mostrar errores si los campos obligatorios están vacíos', () => {
		cy.contains('Registrarse').click();

		cy.get('input:invalid, select:invalid').should('have.length.at.least', 10);
	});

  it('debería mostrar error si los emails no coinciden', () => {
		const timestamp = Date.now();
		const password = 'Test1234!';

		cy.get('[data-cy="input-razon-social"]').type(`Empresa QA ${timestamp}`);
		cy.get('[data-cy="input-cuit"]').type('20304567891');
		cy.get('[data-cy="select-provincia"]').click().type('Córdoba{enter}');
		cy.get('li').contains('Córdoba').first().click({ force: true });
		cy.get('[data-cy="select-localidad"]').click().type('Córdoba{enter}');
		cy.get('li').contains('Córdoba').first().click({ force: true });
		cy.get('[data-cy="input-direccion"]').type('Av Siempreviva 742');
		cy.get('[data-cy="input-telefono"]').type('3511234567');
		cy.get('[data-cy="input-email"]').type('test1@mail.com');
		cy.get('[data-cy="input-confirmar-email"]').type('test2@mail.com'); // diferente
		cy.get('[data-cy="input-password"]').type(password);
		cy.get('[data-cy="input-repetir-password"]').type(password);

		cy.contains('Registrarse').click();

		cy.get('[data-cy="error-message"]', { timeout: 6000 })
			.should('be.visible')
			.and('contain.text', 'Los correos electrónicos no coinciden');
	});

  it('debería mostrar error si las contraseñas no coinciden', () => {
		const timestamp = Date.now();

		cy.get('[data-cy="input-razon-social"]').type(`Empresa QA ${timestamp}`);
		cy.get('[data-cy="input-cuit"]').type('20304567891');
		cy.get('[data-cy="select-provincia"]').click().type('Córdoba{enter}');
		cy.get('li').contains('Córdoba').first().click({ force: true });
		cy.get('[data-cy="select-localidad"]').click().type('Córdoba{enter}');
		cy.get('li').contains('Córdoba').first().click({ force: true });
		cy.get('[data-cy="input-direccion"]').type('Av Siempreviva 742');
		cy.get('[data-cy="input-telefono"]').type('3511234567');
		cy.get('[data-cy="input-email"]').type('test@mail.com');
		cy.get('[data-cy="input-confirmar-email"]').type('test@mail.com');
		cy.get('[data-cy="input-password"]').type('Test1234!');
		cy.get('[data-cy="input-repetir-password"]').type('Distinta123!');

		cy.contains('Registrarse').click();

		cy.get('[data-cy="error-message"]', { timeout: 6000 })
			.should('be.visible')
			.and('contain.text', 'Las contraseñas no coinciden');
	});


  it('debería mostrar error si el CUIT es inválido', () => {
    cy.get('[data-cy="input-cuit"]').type('123');
    cy.contains('Registrarse').click();

    // Se hace flexible al contenido real que podría cambiar
    cy.get('body').then(($body) => {
      const text = $body.text();
      const contieneErrorCuit =
        text.includes('CUIT inválido') ||
        text.includes('CUIT incorrecto') ||
        text.includes('Formato de CUIT') ||
        text.toLowerCase().includes('cuit');

      expect(contieneErrorCuit, 'Se esperaba un mensaje de error sobre CUIT').to.be.true;
    });
  });

  it('debería registrar exitosamente si todo es correcto', () => {
    cy.wrap(null)
      .then(() => createMailTmAccount())
      .then(({ address }) => {
        email = address;

        cy.get('[data-cy="input-razon-social"]').type(`Empresa QA ${timestamp}`);
        cy.get('[data-cy="input-cuit"]').type('20304567891');

        cy.get('[data-cy="select-provincia"]').click().type('Córdoba{enter}');
        cy.get('li').contains('Córdoba').first().click({ force: true });

        cy.get('[data-cy="select-localidad"]').click().type('Córdoba{enter}');
        cy.get('li').contains('Córdoba').first().click({ force: true });

        cy.get('[data-cy="input-direccion"]').type('Av Siempreviva 742');
        cy.get('[data-cy="input-telefono"]').type('3511234567');
        cy.get('[data-cy="input-email"]').type(email);
        cy.get('[data-cy="input-confirmar-email"]').type(email);
        cy.get('[data-cy="input-password"]').type(password);
        cy.get('[data-cy="input-repetir-password"]').type(password);
        cy.contains('Registrarse').click();

        cy.on('window:alert', (msg) => {
          expect(msg).to.include('Cliente registrado con éxito');
        });

        cy.url().should('include', '/auth/login');
      });
  });
});
