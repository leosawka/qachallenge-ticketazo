describe('Creacion de evento', () => {
  it('debería loguearse con credenciales válidas y crear un evento con datos aleatorios', () => {

    const tituloAleatorio = `evento${Math.floor(Math.random() * 10000)}`;
    const hora = String(Math.floor(Math.random() * 24)).padStart(2, '0'); // entre 00 y 23
    const minutos = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // entre 00 y 59
    const duracionEvento = `${hora}:${minutos}`; // formato hh:mm

    cy.visit('/');
    cy.contains('Login').click({ force: true });
    cy.get('input[type="email"]').type('himexxiii@gmail.com');
    cy.get('input[type="password"]').type('Organizador9!');
    cy.contains('Login').click();

    cy.get('button[aria-label="Toggle menu"]').click();
    cy.get(':nth-child(2) > .pb-4').click();

    cy.get('[data-cy="switch-multifecha"] > .font-inherit').click();

    cy.get('[data-cy="input-titulo"]').type(tituloAleatorio);
    cy.get('[data-cy="select-edad"]').click();
    cy.get('[data-cy="option-edad-ATP"]').click();
    cy.get('[data-cy="select-genero"] > .inline-flex').click();
    cy.get('[data-cy="option-genero-Fiesta"]').click();

    cy.get('[data-type="hour"]').first().focus().type('{selectall}{backspace}').type(hora, { force: true });
    cy.get('[data-type="minute"]').first().focus().type('{selectall}{backspace}').type(minutos, { force: true });

    cy.get('[data-cy="select-lugar-evento"]').click();
    cy.get('[data-cy="option-lugar-18"]').click();
    cy.contains('Seleccionar sala').click();

    cy.get('[role="option"]').then(($opciones) => {
      const total = $opciones.length;
      const indiceAleatorio = Math.floor(Math.random() * total);
      cy.wrap($opciones[indiceAleatorio]).click();
    });

    const texto = 'a '.repeat(4);
    cy.get('[data-cy="input-info"]').type(texto);
    cy.wait(1000);

    const randomMes = Math.floor(Math.random() * 12) + 1;
    const diaMes = new Date(2025, randomMes, 0).getDate();
    const randomDia = Math.floor(Math.random() * diaMes) + 1;
    const año = '2025';

    cy.get('[data-type="day"]').first().focus().type('{selectall}{backspace}').type(randomDia, { force: true });
    cy.get('[data-type="month"]').first().focus().type('{selectall}{backspace}').type(randomMes, { force: true });
    cy.get('[data-type="year"]').first().focus().type(año);

    cy.get('[data-cy="input-horario-0-0"]').within(() => {
      cy.get('[data-type="hour"]').first().focus().type('{selectall}{backspace}').type(hora, { force: true });
      cy.get('[data-type="minute"]').first().focus().type('{selectall}{backspace}').type(minutos, { force: true });
    });

    cy.get('.bg-primary').click();

    cy.get('[data-cy="input-horario-0-1"]').within(() => {
      cy.get('[data-type="hour"]').first().focus().type('{selectall}{backspace}').type(hora, { force: true });
      cy.get('[data-type="minute"]').first().focus().type('{selectall}{backspace}').type(minutos, { force: true });
    });

    cy.get('.rounded-b-large > .z-0').click();
  });
});
