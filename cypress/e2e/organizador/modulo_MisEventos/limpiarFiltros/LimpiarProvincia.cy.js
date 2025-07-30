describe('ticketazo', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click({force: true})
        cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com')
        cy.get('[data-cy="input-password"]').type('Organizador9!')
        cy.get('[data-cy="btn-login"]').click()
        cy.viewport(1360, 768)
        cy.contains('Mis Eventos').should('be.visible').click()
        cy.wait(4000)
        cy.get('[data-cy="perfil-imagen"]').should('be.visible')
    });
    
    it('Limpiar provincia', () => {
        cy.get('[data-slot="value"]').eq(1).click({force: true})
        cy.get('[data-slot="content"]').should('be.visible')
        cy.contains('[role="option"]', 'Chubut').should('be.visible').click()
        cy.contains('Limpiar filtros').click()   
        cy.get('[data-slot="value"]').eq(1).should('have.value', '')
    });
})