> # QA Automation - Ticketazo

Este repositorio contiene pruebas automatizadas E2E usando Cypress para el sistema Ticketazo.

# Objetivo:
Automatizar la validación de los flujos funcionales principales de Ticketazo desde la perspectiva de los diferentes roles del sistema.

# Estructura de ramas:

* **main:** Rama principal protegida. Solo se actualiza por pull request.

* **qa-organizador:** Casos de prueba del rol organizador. Responsable: Jairo

* qa-cliente: Casos de prueba del rol cliente.

# Casos de prueba implementados:

* Login de Organizador:

* Login exitoso como admin@admin.com con contraseña admin

* Validación de visibilidad del botón "Cargar Evento"

* Confirmación de redireccionamiento correcto tras login

# Cómo correr las pruebas:

+ Instalar dependencias:
`npm install`

+ Abrir Cypress en modo interactivo:
`npx cypress open`

# Requisitos:

- Cypress versión 12 o superior
- Node.js versión 18 o superior
- Acceso al sitio: https://vps-3696213-x.dattaweb.com/

# Créditos:

Proyecto desarrollado por el equipo 9 de QA Challenge - XAcademy