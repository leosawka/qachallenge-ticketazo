const categorias = [
  { nombre: "Recital", eventos: ["sinfonia metallica", "los piojos en river"] },
  { nombre: "Teatro", eventos: ["reservoir dogs", "esperando la carroza", "el eternauta"] },
  { nombre: "StandUp", eventos: ["test multipe horario", "evento multiple free"] },
  { nombre: "Fiesta", eventos: [] },
  { nombre: "Conferencia", eventos: [] },
  { nombre: "Deportes", eventos: [] },
  { nombre: "Feria", eventos: [] },
  { nombre: "Festival", eventos: ["test", "festival test"] },
  { nombre: "Exposición", eventos: ["tesis cervantes"] },
  { nombre: "Otro", eventos: [] }
  
];

describe('Filtrado de eventos - casos representativos', () => {
  beforeEach(() => {
    cy.viewport(1400, 900);
    cy.visit('https://vps-3696213-x.dattaweb.com/');
  });

  // FILTRO-01: Filtrar por categoría
  it('FILTRO-01: debería filtrar correctamente por categoría', () => {
    cy.get('button[aria-label="Categoría"]').first().click();
    cy.contains('span', 'Recital').should('exist').click({ force: true });

    cy.get('[data-cy^="evento-card-"]').each(($card) => {
      cy.wrap($card).find('[data-cy="evento-titulo"]').invoke('text').should('not.be.empty');
      // Si tienes info de categoría en el card, valida aquí
    });
  });

  // FILTRO-02: Filtrar por provincia y localidad
  it('FILTRO-02: debería filtrar correctamente por provincia y localidad', () => {
    cy.contains('span', 'Provincia').click({ force: true });
    cy.contains('span', 'Ciudad Autónoma de Buenos Aires').click({ force: true });

    cy.contains('span', 'Localidad').click({ force: true });
    cy.contains('span', 'Belgrano').click({ force: true });

    cy.get('[data-cy^="evento-card-"]').each(($card) => {
      cy.wrap($card).find('[data-cy="evento-titulo"]').invoke('text').should('not.be.empty');
      // Si tienes info de localidad en el card, valida aquí
    });
  });

  // FILTRO-03: Filtrar por cercanía
  it('FILTRO-03: debería mostrar solo eventos cercanos al activar el filtro "Eventos cercanos"', () => {
    cy.get('#locationFilter').check({ force: true });
    cy.get('[data-cy^="evento-card-"]').should('exist');
    cy.get('[data-cy^="evento-card-"]').each(($card) => {
      cy.wrap($card).find('[data-cy="evento-titulo"]').invoke('text').should('not.be.empty');
      // Si tienes info de cercanía en el card, valida aquí
    });
  });

  // FILTRO-04: Limpiar filtros
  it('FILTRO-04: al limpiar filtros se restauran los eventos iniciales', () => {
    cy.get('button[aria-label="Categoría"]').first().click();
    cy.contains('span', 'Recital').should('exist').click({ force: true });

    cy.get('[data-cy^="evento-card-"]').then($filtrados => {
      const filtradosCount = $filtrados.length;

      cy.get('button').contains('Limpiar filtros').click();
      cy.wait(500);

      cy.get('[data-cy^="evento-card-"]').its('length').should('be.gte', filtradosCount);
    });
  });

  // FILTRO-05: Filtrar por nombre de evento
  it('FILTRO-05: debería filtrar correctamente por nombre de evento', () => {
    cy.get('input[aria-label="Search"]').type('tesis cervantes');
    cy.get('[data-cy^="evento-card-"]').should('exist');
    cy.get('[data-cy^="evento-card-"]').each(($card) => {
      cy.wrap($card).find('[data-cy="evento-titulo"]').invoke('text').should('match', /tesis cervantes/i);
    });
  });

  
  
});