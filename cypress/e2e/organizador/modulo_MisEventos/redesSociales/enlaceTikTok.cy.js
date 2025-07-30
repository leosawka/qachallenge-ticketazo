describe('Enlace TikTok', () => {
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

    it('Icono compartir TikTok', () => {
        cy.get('[data-cy="perfil-tiktok"]').should('be.visible').and('have.attr', 'href', 'https://www.tiktok.com/@messi10')
        cy.get('[data-cy="perfil-tiktok"]').click()
    });
})