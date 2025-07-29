describe('GU_002 - Carga válida de colaborador', () => {
  
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();
    cy.contains('Editar Perfil').click();
  });

  it('Debe permitir cargar un colaborador con datos válidos', () => {
    cy.viewport(1920, 1080);


    // Paso 3: Ingresar datos del colaborador
    const correo = `colaborador_${Date.now()}@mail.com`; // Evita duplicados
    const nombre = 'Juan Pérez';
    const telefono = '1123456789';

    cy.get('input[aria-label="Correo electrónico"]').clear().type(correo);
    cy.get('input[aria-label="Nombre"]').eq(1).clear().type(nombre);
    cy.get('input[aria-label="numero de telefono"]').clear().type(telefono);

    // Paso 4: Hacer clic en el botón correcto "Cargar" (solo una vez)
    cy.get('input[aria-label="Correo electrónico"]')
      .parents()
      .then(($parents) => {
        for (let i = 0; i < $parents.length; i++) {
          const $el = Cypress.$($parents[i]);
          if ($el.find('button:contains("Cargar")').length > 0) {
            cy.wrap($el).within(() => {
              cy.contains('button', 'Cargar').click();
            });
            break; // Evita múltiples clics
          }
        }
      });

    // Paso 5: Verificar que el colaborador se haya agregado a la tabla
    cy.get('table').should('contain', correo);
    cy.get('table').should('contain', nombre);
    cy.get('table').should('contain', telefono);
  });
});
