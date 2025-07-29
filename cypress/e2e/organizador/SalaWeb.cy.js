describe('Pestaña Gestionar Salas - Versión Web', () => {

  beforeEach(() => {
    // Modo escritorio
    cy.viewport(1280, 800);
    cy.visit('https://vps-3696213-x.dattaweb.com/');

    // Abrir formulario login
    cy.get('.z-0').first().click({ force: true });

    // Completar credenciales y login
    cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com');
    cy.get('[data-cy="input-password"]').type('Organizador9!');
    cy.get('[data-cy="btn-login"]').click();

    // Esperar redirección (puede ir a dashboard o seatsLayout)
    cy.location('pathname', { timeout: 20000 }).should((path) => {
      expect(['/dashboard', '/seatsLayout', '/']).to.include(path);
    });


    // Clic en botón de "Gestionar Salas"
    cy.get('a[href="/seatsLayout"]', { timeout: 10000 }).should('be.visible').click();

    // Validar que estamos en la sección correcta
    cy.url({ timeout: 10000 }).should('include', '/seatsLayout');
    cy.contains('Gestionar Salas').should('be.visible');
  });


  it('Intenta crear una sala sin nombre y valida errores', () => {
    //cy.contains('Sala Nueva').click();
    cy.get('[data-cy="select-sala"] > .inline-flex').click()
    cy.get('[data-cy="input-nombre-sala"]').click()
    cy.contains('Guardar').click();

    // Validar mensaje de error 
    cy.contains('Nombre requerido').should('exist'); 
  });



  it('Crea una nueva sala y guarda correctamente', () => {

    const ahora = new Date();
    const nombreSala = `Web ${ahora}`;


    cy.get('[data-cy="select-sala"] > .inline-flex').click();
    cy.get('[data-cy="input-nombre-sala"]').type(nombreSala);
    // Espera que el overlay desaparezca antes de guardar
    cy.get('[data-slot="wrapper"]').should('not.exist');
     // Click en botón "Guardar"
    cy.get('[data-cy="btn-guardar-layout"]').click()
        .should('be.visible')
        .click({ force: true });

    //cy.get('button[data-cy="btn-nueva-seccion"]')
    //.should('be.visible')
    //.click({ force: true });
    
    // cy.get('[data-cy="btn-guardar-layout"]').click()
    //    .should('be.visible')
    //    .click({ force: true });
    //cy.contains('button', 'Guardar').click({ force: true });
    cy.get('.flex-row > .bg-primary').click({ force: true });



    // Validar mensaje de guardado
    //cy.contains('guardada', { timeout: 60000 }).should('exist');
    cy.wait(2000);
    cy.contains('guardada').should('exist');


  });

  

});
