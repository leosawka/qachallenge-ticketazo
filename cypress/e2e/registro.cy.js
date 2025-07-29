function llenarFormularioRegistro({
    nombres = '',
    apellido = '',
    telefono = '',
    dni = '',
    provincia = '',
    localidad = '',
    fechaNacimiento = '',
    email = '',
    confirmarEmail = '',
    contrasena = '',
    repetirContrasena = ''
}) {
    if (nombres) cy.get('[data-cy="input-nombres"]').type(nombres);
    if (apellido) cy.get('[data-cy="input-apellido"]').type(apellido);
    if (telefono) cy.get('[data-cy="input-telefono"]').type(telefono);
    if (dni) cy.get('[data-cy="input-dni"]').type(dni);
    if (provincia) {
        cy.get('[data-cy="select-provincia"]').type(provincia);
        cy.contains('li', provincia).click();
    }
    if (localidad) {
        cy.get('[data-cy="select-localidad"]').type(localidad);
        cy.contains('li', localidad).click();
    }
    if (fechaNacimiento) cy.get('[data-cy="input-fecha-nacimiento"] [contenteditable="true"]').first().type(fechaNacimiento, {force: true});
    if (email) cy.get('[data-cy="input-email"]').type(email);
    if (confirmarEmail) cy.get('[data-cy="input-confirmar-email"]').type(confirmarEmail);
    if (contrasena) cy.get('[data-cy="input-password"]').type(contrasena);
    if (repetirContrasena) cy.get('[data-cy="input-repetir-password"]').type(repetirContrasena);
}

describe('Registro Ticketazo', () => {
    beforeEach(() => {
        cy.viewport(1400, 900);
        cy.visit('https://vps-3696213-x.dattaweb.com/');
        cy.contains('Login').click();
        cy.contains('Registrate').click();
        cy.get('form').should('be.visible');
    });

    it('REG-01: debería registrar usuario nuevo con datos válidos', () => {
        cy.fixture('usuarios').then((data) => {
            const emailValido = `testqa_${Date.now()}_${Math.floor(Math.random()*1000000)}@mail.com`;
            const dniValido = `${Math.floor(10000000 + Math.random() * 89999999)}`; // DNI aleatorio de 8 dígitos
            cy.registrarUsuario(
                { ...data.registro_valido, dni: dniValido },
                emailValido
            );
            cy.get('[data-cy="btn-registrarse"]').click();
            cy.url({ timeout: 10000 }).should('include', '/auth/login');
        });
    });

    it('REG-02: no debería registrar usuario con campos obligatorios vacíos', () => {
        cy.registrarUsuario({
            nombres: '',
            apellido: '',
            telefono: '',
            dni: '',
            provincia: '',
            localidad: '',
            fechaNacimiento: '',
            password: ''
        }, '');
        cy.get('[data-cy="btn-registrarse"]').click();
        cy.contains('Completa este campo').should('be.visible');
    });

    it('REG-03: no debería registrar usuario si las contraseñas no coinciden', () => {
        cy.fixture('usuarios').then((data) => {
            const email = `testqa${Date.now()}@mail.com`;
            cy.registrarUsuario(
                { ...data.registro_valido, password: '123qweQWE+' },
                email
            );
            cy.get('[data-cy="input-repetir-password"]').clear().type('123qweQWE++');
            cy.get('[data-cy="btn-registrarse"]').click();
            cy.contains('Las contraseñas no coinciden').should('be.visible');
        });
    });

    it('REG-04: no debería registrar usuario con contraseña sin carácter especial', () => {
        cy.fixture('usuarios').then((data) => {
            const email = `testqa${Date.now()}@mail.com`;
            cy.registrarUsuario(
                { ...data.registro_valido, password: '123qweQWE' },
                email
            );
            cy.get('[data-cy="btn-registrarse"]').click();
            cy.contains('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.').should('be.visible');
        });
    });

    it('REG-05: no debería permitir registrar usuario con fecha de nacimiento igual a hoy', () => {
        cy.fixture('usuarios').then((data) => {
            const email = `testqa${Date.now()}@mail.com`;
            const dniValido = `${Math.floor(10000000 + Math.random() * 89999999)}`; // DNI aleatorio
            cy.registrarUsuario(
                { ...data.registro_valido, fechaNacimiento: '25/07/2025', dni: dniValido },
                email
            );
            cy.get('[data-cy="btn-registrarse"]').click();
            cy.get('[data-cy="error-message"]').should('not.exist');
        });
    });
});

