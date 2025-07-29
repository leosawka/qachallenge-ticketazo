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
    cy.get('[data-cy="option-lugar-18"]').click()
    cy.contains('Seleccionar sala').click()

    cy.get('[role="option"]').then(($opciones) => {
      const total = $opciones.length
      const indiceAleatorio = Math.floor(Math.random() * total)
    cy.wrap($opciones[indiceAleatorio]).click()
    })
    const texto = 'a '.repeat(4);
    cy.get('[data-cy="input-info"]').type(texto);
    cy.wait(1000)

    cy.get('.rounded-b-large > .z-0').click()

    //Preventa
    cy.get('input[aria-label="Activar Preventa"]').check({ force: true });
    cy.contains('Seleccionar entrada').click()
    cy.get('.gap-1').click()
    cy.get('.mb-2 > .max-w-sm > .relative').type('50')
    cy.get(':nth-child(3) > .group > .relative > .inline-flex').type('15000')
    cy.get('.flex.gap-2 > [data-filled="true"] > .relative').type('12000')
    cy.get('.flex.gap-2 > :nth-child(2) > .relative').type('10')
    cy.contains('General').click()
    cy.contains('Seleccionar entrada').click()
    cy.get('.gap-1').click()
    cy.contains('Siguiente').click()

  });
});

