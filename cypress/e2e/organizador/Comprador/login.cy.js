describe('template spec', () => {
  it('passes', () => {
    cy.visit(' https://ticketazo.com.ar/')
    cy.get('.justify-end > .text-sm').click() 
    cy.get('[data-cy="input-email"]').type('giseladandreaok@gmail.com')
    cy.get('[data-cy="input-password"]').type('Nala0512+')
    cy.get('[data-cy="btn-login"]').click()
    
     cy.get('[data-cy="btn-login"]').should('have.text', 'Login')

})
})