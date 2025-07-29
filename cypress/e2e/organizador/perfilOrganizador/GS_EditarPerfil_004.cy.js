describe('GS_EditarPerfil_004 - Validación de redes sociales con URLs inválidas', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();       // Login usando tu comando
    cy.contains('Editar Perfil').click();
  });

  it('Debe impedir guardar si las URLs de redes sociales son inválidas', () => {
    // Paso 3: Ingresar valores mal formateados en redes sociales
    cy.get('input[aria-label="LinkedIn"]').clear().type('linkedin.com/in/diegoperez');  //  no es URL
    cy.get('input[aria-label="Twitter"]').clear().type('twitter.com/pepexd');           //  no es URL
    cy.get('input[aria-label="Instagram"]').clear().type('instagram.com/fifa20');       // no es URL
    cy.get('input[aria-label="TikTok"]').clear().type('www.tiktok.com/@messi10');       //  no es URL

    // Paso 4: Guardar cambios
    cy.contains('Guardar Cambios').click();

    // Paso 5: Verificar que aparece mensaje de error general
    cy.contains('Ingresa una URL.').should('be.visible');
  });
});
