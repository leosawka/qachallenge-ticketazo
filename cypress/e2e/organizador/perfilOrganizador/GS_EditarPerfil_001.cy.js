describe('GS_EditarPerfil_001 - Editar nombre de empresa y nombre de usuario', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();      
    cy.contains('Editar Perfil').click();
  });

  it('Debe permitir modificar el nombre y nombre de usuario, y reflejar los cambios luego de guardar', () => {
    cy.get('input[aria-label="Nombre"]').first().clear().type('Empresa QA Cypress');
    cy.get('input[aria-label="Nombre de usuario"]').first().clear().type('qa_organizador');

    cy.contains('Guardar Cambios').click();

    cy.reload();

    cy.get('input[aria-label="Nombre"]').should('have.value', 'Empresa QA Cypress');
    cy.get('input[aria-label="Nombre de usuario"]').should('have.value', 'qa_organizador');
  });
});
