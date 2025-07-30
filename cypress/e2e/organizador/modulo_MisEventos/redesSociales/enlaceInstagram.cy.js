describe('Enlace Instagram', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click({force: true})
        cy.get('[data-cy="input-email"]').type('himexxiii@gmail.com')
        cy.get('[data-cy="input-password"]').type('Organizador9!')
        cy.get('[data-cy="btn-login"]').click()
        cy.viewport(1360, 768)
        cy.wait(2000)
        cy.get('[data-cy="perfil-imagen"]').should('be.visible')
    });

    it('Icono compartir Instagram', () => {
       //cy.wait(4500)  
        cy.get('[data-cy="perfil-instagram"]').should('be.visible').and('have.attr', 'href', 'https://instagram.com/fifa20')
        cy.get('[data-cy="perfil-instagram"]').click()
    });
})