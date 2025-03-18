# 🏴‍☠️ One Piece - Vue 3 Project 🏴‍☠️

## 📋 Descripción

Este proyecto está desarrollado con Vue 3 y Vite, creando una aplicación web temática de One Piece. Navega por el Grand Line con esta aplicación moderna y eficiente.

## 🚀 Demo en Vivo

**¡Visita la versión desplegada!** 👉 [https://danielaguilar19.github.io/OnePiece/](https://danielaguilar19.github.io/OnePiece/)

## 🛠️ Configuración de IDE Recomendada

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y deshabilitar Vetur)

## ⚙️ Soporte de TypeScript para Importaciones `.vue`

TypeScript no puede manejar información de tipos para importaciones `.vue` por defecto, por lo que reemplazamos la CLI `tsc` con `vue-tsc` para verificación de tipos. En editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje TypeScript reconozca los tipos de `.vue`.

## 📝 Personalizar Configuración

Consulta la [Referencia de Configuración de Vite](https://vitejs.dev/config/).

## 🔍 Instalación del Proyecto

```sh
npm install
```

## 💻 Comandos Disponibles

### ▶️ Compilar con Hot-Reload para Desarrollo

```sh
npm run dev
```

### 📦 Verificar Tipos, Compilar y Minificar para Producción

```sh
npm run build
```

### ✅ Ejecutar Pruebas Unitarias con [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### 🧪 Ejecutar Pruebas End-to-End con [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

Esto ejecuta las pruebas end-to-end contra el servidor de desarrollo de Vite.
Es mucho más rápido que la compilación de producción.
Pero aún se recomienda probar la compilación de producción con `test:e2e` antes de implementar (por ejemplo, en entornos CI):

```sh
npm run build
npm run test:e2e
```

### 🧹 Linting con [ESLint](https://eslint.org/)

```sh
npm run lint
```
