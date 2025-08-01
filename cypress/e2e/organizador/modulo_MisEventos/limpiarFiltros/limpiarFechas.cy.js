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
    
    it('Limpiar Fechas', () => {
        //cy.get('[data-slot="selector-button"]').click({force: true})
        //cy.get(':nth-child(5) > :nth-child(2) > .w-8 > span').should('be.visible').click()
        cy.get('[data-slot="segment"]').eq(0).type('29')
        cy.get('[data-slot="segment"]').eq(2).type('7')
        cy.get('[data-slot="segment"]').eq(4).type('2025')
        cy.get('[data-slot="segment"]').eq(6).type('5')
        cy.get('[data-slot="segment"]').eq(8).type('8')
        cy.get('[data-slot="segment"]').eq(9).type('2025')
        cy.contains('Limpiar filtros').click()   
    });
})