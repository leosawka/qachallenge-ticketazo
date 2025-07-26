describe('Registrar cuenta', () => {
  it('passes', () => {
    cy.visit('https://ticketazo.com.ar/')
   cy.get('.justify-end > .text-sm').click()
   cy.get('[data-cy="btn-register-user"]').click()
   
   
    
    cy.get('[data-cy="input-nombres"]').type('Gisela')
    cy.get( '[data-cy="input-apellido"]').type('Dandrea')
    cy.get( '[data-cy="input-telefono"]').type('3512148638')
    cy.get( '[data-cy="input-dni"]').type('37732364')
    
   cy.get('[data-cy="select-provincia"]').click()
   cy.get('[data-cy="select-provincia"]').type('Cordoba')
   
   cy.get('[data-cy="select-localidad"]').click()
   cy.get('[data-cy="select-localidad"]').type('Cordoba')
   
  cy.get( '[data-cy="input-email"]').type('giseladandrea@gmail.com')
  cy.get( '[data-cy="input-confirmar-email"]').type('giseladandrea@gmail.com')
  cy.get( '[data-cy="input-password"]').type('Nala0512+')
  cy.get( '[data-cy="input-repetir-password"]').type('Nala0512+') 

  
  cy.get('[data-cy="btn-registrarse"]').should('have.text', 'Registrarse')
  
    
     })
})