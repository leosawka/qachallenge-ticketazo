describe('GS_EditarPerfil_002 - Validación campo Teléfono', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();       // Login centralizado
    cy.contains('Editar Perfil').click();
  });

  it('Debe permitir guardar letras y símbolos en Teléfono (comportamiento incorrecto)', () => {
    // Paso 3: Ingresar caracteres inválidos en Teléfono
    cy.get('input[aria-label="Teléfono"]').clear().type('abc@!#');

    // Paso 4: Guardar cambios
    cy.contains('Guardar Cambios').click();

    // Paso 5: Recargar y verificar persistencia
    cy.reload();
    cy.get('input[aria-label="Teléfono"]').should('have.value', 'abc@!#');
  });
});
