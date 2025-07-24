# QA Automation - Ticketazo

Este repositorio contiene pruebas automatizadas E2E usando Cypress para el sistema Ticketazo.

---

# 🎯 Objetivo

Automatizar la validación de los flujos funcionales principales de Ticketazo desde la perspectiva de los diferentes roles del sistema: organizador, comprador y administrador.

---

# 🌱 Primeros pasos con Git y GitHub (para principiantes)

## 🧰 Requisitos previos
- Tener Git instalado: https://git-scm.com/downloads
- Tener Node.js instalado (versión 18 o superior): https://nodejs.org/
- Tener una cuenta de GitHub (gratuita): https://github.com

---

## ✅ Clonar este repositorio

1. Abrí una terminal (PowerShell o Git Bash).
2. Navegá a la carpeta donde quieras clonar el proyecto, por ejemplo:
`cd "C:\Users\TuUsuario\Documentos\GitHub"`
3. Ejecutá el siguiente comando:
`git clone https://github.com/leosawka/qachallenge-ticketazo.git`
4. Entrá a la carpeta del proyecto:
`cd qachallenge-ticketazo`
---

## 🛠 Crear tu propia rama de trabajo

1. Verificá que estás dentro de la carpeta del proyecto:
`cd qachallenge-ticketazo`
2. Creamos una nueva rama:
`git checkout -b qa-tu-nombre`
3. A partir de ahí, todo lo que desarrolles se hará dentro de tu propia rama.

---

## 🚀 Subir tus cambios

1. Guardá los archivos modificados.
2. En la terminal:
```
git add .
git commit -m "feat: agrego pruebas para el login de comprador"
git push origin qa-tu-nombre
```
---

## 📤 Crear Pull Request (PR)

1. Andá a [https://github.com/leosawka/qachallenge-ticketazo](https://github.com/leosawka/qachallenge-ticketazo)
2. GitHub te va a sugerir crear un PR desde tu rama (`qa-tu-nombre`) hacia `main`
3. Click en **Compare & pull request** → **Create pull request**

---

# 🌿 Estructura de ramas

- **main**: Rama principal protegida. Solo se actualiza por pull request.
- **qa-organizador**: Casos de prueba del rol organizador (Responsable: Jairo)
- **qa-cliente**: Casos de prueba del rol comprador
- **qa-admin**: Casos de prueba del rol administrador (solo se aprueban operaciones, no crea contenido)

---

# ✅ Casos de prueba implementados

### Login de Organizador

- Login exitoso como `himexxiii@gmail.com` con contraseña `Organizador9!`
- Validación de visibilidad del botón "Cargar Evento"
- Confirmación de acceso al menú con opciones exclusivas del rol organizador

> ⚠️ El usuario `admin@admin.com` con contraseña `admin` solo se utiliza para validar o aprobar ciertas operaciones, **no es un organizador funcional**.

> ⚠️ Aún falta crear el usuario organizador sin local físico y el usuario del rol comprador.

---

# 🔁 Cómo correr las pruebas

## 1. Instalar dependencias (solo la primera vez):
`npm install`
## 2. Ejecutar Cypress en modo visual:
`npx cypress open`
---

# 📌 Requisitos técnicos

- Cypress versión 12 o superior
- Node.js versión 18 o superior
- Acceso al entorno QA: https://vps-3696213-x.dattaweb.com/

---

# 👥 Créditos

Proyecto desarrollado por el equipo 9 de QA Challenge - XAcademy