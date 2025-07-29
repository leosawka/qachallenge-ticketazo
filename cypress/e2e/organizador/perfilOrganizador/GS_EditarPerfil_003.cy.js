describe('GS_EditarPerfil_003 - Validación de campos obligatorios', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();       // Login reutilizado
    cy.contains('Editar Perfil').click();
  });

  it('Debe impedir guardar si los campos obligatorios están vacíos', () => {
    // Paso 3: Borrar campos obligatorios
    cy.get('input[aria-label="Nombre"]').first().clear();
    cy.get('input[aria-label="Nombre de usuario"]').first().clear();
    cy.get('input[aria-label="Teléfono"]').clear();

    // Paso 4: Guardar cambios
    cy.contains('Guardar Cambios').click();

    // Paso 5: Verificar que aparece el mensaje de error general
    cy.contains('Hubo un problema al actualizar el perfil.').should('be.visible');
  });
});
