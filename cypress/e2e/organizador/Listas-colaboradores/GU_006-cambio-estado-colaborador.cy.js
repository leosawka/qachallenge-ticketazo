describe('GU_006 - Cambio de estado del colaborador', () => {
  const email = 'colaboradorprueba@test.com';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();       // Comando de login reutilizable
    cy.contains('Editar Perfil').click();
  });

  it('Debe cambiar el estado del colaborador y reflejarlo en la tabla', () => {
    // Buscar fila por email
    cy.contains('tr', email).as('filaColaborador');

    // Clic en el botón del estado
    cy.get('@filaColaborador').find('button[data-cy^="select-estado"]').click();

    // Clic en "Aceptado"
    cy.contains('li', 'Aceptado', { timeout: 6000 }).should('be.visible').click();

    // Verificar que el estado cambió
    cy.get('@filaColaborador')
      .find('button[data-cy^="select-estado"] span[data-slot="value"]')
      .should('have.text', 'Aceptado');

    // Refrescar y verificar persistencia
    cy.reload();
    cy.contains('tr', email).as('filaColaboradorRecargada');
    cy.get('@filaColaboradorRecargada')
      .find('button[data-cy^="select-estado"] span[data-slot="value"]')
      .should('have.text', 'Aceptado');
  });
});
