describe('ticketazo', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click({force: true})
        cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com')
        cy.get('[data-cy="input-password"]').type('Organizador9!')
        cy.get('[data-cy="btn-login"]').click()
        cy.viewport(1360, 768)
        cy.contains('Mis Eventos').should('exist').click()
    });
    
    it('Limpiar Fechas', () => {
        //cy.wait(2000)
        cy.get()        
    });
})