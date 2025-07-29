describe('GU_003 - Evitar carga de colaborador duplicado', () => {
  const emailDuplicado = 'colaboradorprueba@test.com'; // Asegurate que exista en la app
  const nombre = 'Juan Pérez';
  const telefono = '1123456789';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();
    cy.contains('Editar Perfil').click();
  });

  it('No debe permitir cargar un colaborador con correo ya existente y mostrar mensaje de error', () => {
    // Ingresar datos duplicados
    cy.get('input[aria-label="Correo electrónico"]').clear().type(emailDuplicado);
    cy.get('input[aria-label="Nombre"]').eq(1).clear().type(nombre);
    cy.get('input[aria-label="numero de telefono"]').clear().type(telefono);

    // Clic en botón "Cargar" dentro del parent correcto
    cy.get('input[aria-label="Correo electrónico"]')
      .parents()
      .then(($parents) => {
        for (let i = 0; i < $parents.length; i++) {
          const $el = Cypress.$($parents[i]);
          if ($el.find('button:contains("Cargar")').length > 0) {
            cy.wrap($el).within(() => {
              cy.contains('button', 'Cargar').click();
            });
            break;
          }
        }
      });

    // Validar mensaje de error visible y texto esperado
    cy.contains('Error')
      .should('be.visible')
      .parent()
      .should('contain.text', 'No se pudo autorizar al usuario');
  });
});
