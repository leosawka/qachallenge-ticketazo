describe('Login Ticketazo', () => {

    beforeEach(() => {
        cy.viewport(1400, 900);
        cy.visit('https://vps-3696213-x.dattaweb.com/');
    });

    afterEach(() => {
       
        cy.get('body').then($body => {
            if ($body.find('button:contains("Logout")').length) {
                cy.contains('Logout').click();
            }
        });
    });

    it('LOGIN-01: debería mostrar error con credenciales inválidas', () => {
        cy.fixture('usuarios').then((usuarios) => {
            cy.login(usuarios.invalido.email, usuarios.invalido.password);
            cy.contains('Correo o contraseña incorrectos').should('be.visible');
            cy.contains('Logout').should('not.exist');
        });
    });

    it('LOGIN-02: debería loguearse correctamente con credenciales válidas', () => {
        cy.fixture('usuarios').then((usuarios) => {
            cy.login(usuarios.valido.email, usuarios.valido.password);
            cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/');
            cy.contains('Logout').should('be.visible');
        });
    });

    it('LOGIN-03: no debería permitir login con email vacío', () => {
        cy.login('', '123qweQWE');
        cy.contains('Correo o contraseña incorrectos').should('be.visible');
        cy.contains('Logout').should('not.exist');
    });

    it('LOGIN-04: no debería permitir login con contraseña vacía', () => {
        cy.login('violeta.alfonso@gmail.com', '');
        cy.contains('Correo o contraseña incorrectos').should('be.visible');
        cy.contains('Logout').should('not.exist');
    });

    it('LOGIN-05: no debería permitir login con ambos campos vacíos', () => {
        cy.contains('Login').click();
        cy.contains('button', 'Login').click();
        cy.contains('Correo o contraseña incorrectos').should('be.visible');
        cy.contains('Logout').should('not.exist');
    });

    it('LOGIN-06: no debería permitir login con email mal formado', () => {
        cy.contains('Login').click();
        cy.get('input[type="email"]').type('violeta.alfonsogmail.com');
        cy.get('input[type="password"]').type('123qweQWE+');
        cy.contains('button', 'Login').click();
        cy.contains('Correo o contraseña incorrectos').should('be.visible');
        cy.contains('Logout').should('not.exist');
    });

    it('LOGIN-07: debería mostrar el formulario de recuperación de contraseña', () => {
        cy.contains('Login').click();
        cy.contains('¿Olvidaste tu contraseña?').should('be.visible').click();
        cy.url().should('include', '/auth/forgotPassword');
    });

    it('LOGIN-08: debería mostrar el formulario de registro', () => {
        cy.contains('Login').click();
        cy.contains('Registrate').should('be.visible').click();
        cy.url().should('include', '/register');
    });

    it('LOGIN-09: debería permitir acceso al home y mostrar eventos sin logueo', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/');
        cy.get('[data-cy^="evento-card-"]').should('exist');
        cy.contains('Login').should('be.visible');
        cy.contains('Logout').should('not.exist');
    });

    it('LOGIN-10: debería permitir cerrar sesión desde cualquier pantalla', () => {
        cy.fixture('usuarios').then((usuarios) => {
            cy.login(usuarios.valido.email, usuarios.valido.password);
            cy.contains('Logout').should('be.visible').click();
            cy.contains('Login').should('be.visible');
            cy.contains('Logout').should('not.exist');
        });
    });

});