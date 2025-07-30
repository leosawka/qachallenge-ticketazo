describe('Creacion de evento de inicio a fin con 1 fecha y 1 funcion', () => {
  it('debería loguearse con credenciales válidas', () => {
    const tituloAleatorio = `evento${Math.floor(Math.random() * 10000)}`;
    const hora = String(Math.floor(Math.random() * 24)).padStart(2, '0'); // entre 00 y 23
    const minutos = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // entre 00 y 59
    const duracionEvento = `${hora}:${minutos}`;
    
    cy.visit('/');
    cy.contains('Login').click({ force: true });
    cy.get('input[type="email"]').type('himexxiii@gmail.com');
    cy.get('input[type="password"]').type('Organizador9!');
    cy.contains('Login').click();
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.get(':nth-child(2) > .pb-4').click();
    cy.get('[data-cy="input-titulo"]').type(tituloAleatorio);

     const randomMes = Math.floor(Math.random() * 12) + 1;
    const diaMes = new Date(2025, randomMes, 0).getDate();
    const randomDia = Math.floor(Math.random() * diaMes) + 1;
    const año = '2026';

    cy.get('[data-type="day"]').first().focus().type('{selectall}{backspace}').type(randomDia, { force: true });
    cy.get('[data-type="month"]').first().focus().type('{selectall}{backspace}').type(randomMes, { force: true });
    cy.get('[data-type="year"]').first().focus().type(año);

    cy.get('[data-cy="select-edad"]').click();
    cy.get('[data-cy="option-edad-ATP"]').click();
    cy.get('[data-cy="select-genero"] > .inline-flex').click();
    cy.get('[data-cy="option-genero-Fiesta"]').click();
    
    cy.get('[data-cy="input-horario"]').within(() => {
    cy.get('[data-type="hour"]').first().focus().type('{selectall}{backspace}').type(hora, { force: true });
    cy.get('[data-type="minute"]').first().focus().type('{selectall}{backspace}').type(minutos, { force: true })
    })

    cy.get('[data-cy="input-duracion"]').within(() => {
    cy.get('[data-type="hour"]').first().focus().type('{selectall}{backspace}').type(hora, { force: true });
    cy.get('[data-type="minute"]').first().focus().type('{selectall}{backspace}').type(minutos, { force: true })  
    })

     cy.get('[data-cy="select-lugar-evento"]').click();
    cy.contains('li', 'Otro').click();
    cy.get(':nth-child(9) > .relative').type('Espacio Mascara')
    cy.get(':nth-child(10) > .relative').type('Santa fe')
    cy.get(':nth-child(11) > .relative').type('920')
    cy.get(':nth-child(12) > .relative').type('xs5000')
    cy.get('input[aria-label="Provincia"]').click()
    cy.contains('Córdoba').click();
    cy.get('input[aria-label="Localidad"]').click()
    cy.contains('Agua de Oro').click();
    
    const texto = 'a '.repeat(4);
    cy.get('[data-cy="input-info"]').type(texto);
    cy.wait(1000)
  cy.get('.rounded-b-large > .z-0').click()

    cy.contains('Seleccionar entrada').click()
    cy.contains('li','VIP').click();
    cy.get('.max-w-sm > .tap-highlight-transparent').type('30')
    cy.get(':nth-child(3) > .group > .tap-highlight-transparent').type('15000')
    cy.contains('Siguiente').click()

  
    cy.contains('Siguiente').click()
    cy.wait(2000)
    cy.contains('Confirmar').click()
    

  });
});

