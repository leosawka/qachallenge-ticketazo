const viewports = [
    {name: 'Desktop Full HD', width: 1920, height:1080},
    // {name: 'Desktop HD', width: 1280, height:800},
    // {name: 'Tablet', width: 768, height:1024},
    // {name: 'Mobile', width: 375, height:667}
]

viewports.forEach(({name, width, height}) => {
    describe(`Registro de Organizador. Tamaño ${name}`, ()=> {
        let email;

        beforeEach(() => {
            const timestamp = Date.now();
            email = `org${timestamp}@yopmail.com`
            cy.viewport(width, height);
            cy.visit('/')
            cy.contains('Login').click({ force: true });
            cy.contains('¿Queres crear tus eventos?').click();
            cy.url().should('include', '/auth/registerClient')
            cy.get('[data-cy="input-razon-social"]').type(`Empresa Demo ${timestamp}`);
            cy.get('[data-cy="input-cuit"]').type('20304567891');
            cy.get('[data-cy="select-provincia"]').click().type('Córdoba');
            cy.wait(500);
            cy.get('ul li').contains('Córdoba').click();
            cy.get('[data-cy="select-localidad"]').click().type('Córdoba');
            cy.wait(500);
            cy.get('ul li').contains('Córdoba').click();
            cy.get('[data-cy="input-direccion"]').type('Av Siempreviva 742');
            cy.get('[data-cy="input-telefono"]').type('3511234567');
            cy.get('[data-cy="input-email"]').type(email);
            cy.get('[data-cy="input-confirmar-email"]').type(email);
            cy.wait(1000);
            cy.visit(`https://yopmail.com/?${email}`);
            cy.get('iframe#ifinbox').then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).contains('Activar cuenta').invoke('attr', 'href').then((activationLink) => {
                cy.visit(activationLink);
            });
            });
            cy.get('[data-cy="input-password"]').type('Test1234!');
            cy.get('[data-cy="input-repetir-password"]').type('Test1234!');

            // NO activamos el switch de "Cuento con establecimiento propio" => SIN local

            cy.contains('Registrarse').click();

            // Login después del registro
            cy.contains('Login').click({ force: true });
            cy.get('input[type="email"]').type(email);
            cy.get('input[type="password"]').type('Test1234!');
            cy.contains('Login').click();
        });

        it('debería mostrar menú de organizador SIN local', () => {
            cy.contains('Cargar Evento').should('exist');
            cy.contains('Mis eventos').should('exist');
            cy.contains('Gestionar Salas').should('not.exist');
        });
    });
})