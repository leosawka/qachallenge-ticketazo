describe('GS_EditarPerfil_007 - Editar todos los permisos del colaborador', () => {
  const emailColaborador = 'permisocolaborador@test.com';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginComoOrganizador();
    cy.contains('Editar Perfil').click();
  });

  it('Debe activar todos los permisos y validar que se mantengan tras refrescar', () => {
    // Buscar fila del colaborador por su email
    cy.contains('tr', emailColaborador).as('fila');

    // Click en botón editar permisos
    cy.get('@fila').find('[data-cy="btn-editar-permisos-6"]').click();

    // Esperar que el modal esté visible
    cy.contains('div.bg-white', 'Editar permisos').should('be.visible');

    // Marcar todos los checkboxes solo si están desmarcados
    cy.contains('div.bg-white', 'Editar permisos').within(() => {
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row)
          .find('input[type="checkbox"]')
          .then(($checkbox) => {
            if (!$checkbox.prop('checked')) {
              cy.wrap($checkbox).check({ force: true });
            }
          });
      });

      // Guardar
      cy.contains('button', 'Guardar').click();
    });

    // Refrescar la página para validar persistencia
    cy.reload();
    cy.contains('Editar Perfil').click();

    // Volver a abrir el modal
    cy.contains('tr', emailColaborador).as('fila');
    cy.get('@fila').find('[data-cy="btn-editar-permisos-6"]').click();

    // Validar que cada checkbox esté marcado
    cy.contains('div.bg-white', 'Editar permisos').within(() => {
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('input[type="checkbox"]').should('be.checked');
      });
    });
  });
});
