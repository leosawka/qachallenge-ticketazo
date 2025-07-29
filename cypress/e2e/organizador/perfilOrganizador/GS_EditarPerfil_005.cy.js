describe('GS_EditarPerfil_005 - Guardar redes sociales con URLs válidas', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();       // Login centralizado
    cy.contains('Editar Perfil').click();
  });

  it('Debe guardar correctamente las URLs válidas de redes sociales', () => {
    // Paso 1: Ingresar URLs válidas
    cy.get('input[aria-label="LinkedIn"]').clear().type('https://linkedin.com/in/diegoperez');
    cy.get('input[aria-label="Twitter"]').clear().type('https://twitter.com/pepexd');
    cy.get('input[aria-label="Instagram"]').clear().type('https://instagram.com/fifa20');
    cy.get('input[aria-label="TikTok"]').clear().type('https://www.tiktok.com/@messi10');

    // Paso 2: Guardar Cambios
    cy.contains('Guardar Cambios').click();

    // Paso 3: Verificar que los datos persisten tras recargar
    cy.reload();

    cy.get('input[aria-label="LinkedIn"]').should('have.value', 'https://linkedin.com/in/diegoperez');
    cy.get('input[aria-label="Twitter"]').should('have.value', 'https://twitter.com/pepexd');
    cy.get('input[aria-label="Instagram"]').should('have.value', 'https://instagram.com/fifa20');
    cy.get('input[aria-label="TikTok"]').should('have.value', 'https://www.tiktok.com/@messi10');
  });
});
