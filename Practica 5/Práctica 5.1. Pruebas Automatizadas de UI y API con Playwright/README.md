# ⚽ SportZone - Pruebas Automatizadas de UI y API con Playwright

Este repositorio contiene la implementación de una **Aplicación Web de Gestión Deportiva (SportZone)** junto con su suite de **Pruebas Automatizadas de Interfaz de Usuario (UI) y servicios API REST** desarrollada con **Playwright**, correspondiente a la Práctica de Laboratorio.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
* **Framework de Pruebas:** Playwright.
* **Entorno de Ejecución:** Node.js.
* **Servicios API:** API REST pública con respuestas en formato JSON.

## 📋 Descripción del Proyecto

La aplicación **SportZone** permite a los usuarios:
1. Navegar entre las distintas secciones de la plataforma (Inicio, Lista de Equipos y Registro de Atletas).
2. Consultar la lista de equipos participantes.
3. Completar y procesar el formulario de registro para nuevos atletas.

Sobre esta aplicación y servicios externos se diseñó una suite de pruebas automatizadas para validar la calidad del software en la capa visual y en la capa de datos.

## 🧪 Casos de Prueba Automatizados

### Pruebas de Interfaz de Usuario (UI) - `tests/ui.spec.js`
1. **Caso 1: Navegación entre Secciones:** Valida que al hacer clic en las pestañas del menú (`#nav-equipos`, `#nav-registro`), las secciones correspondientes se muestren u oculten dinámicamente sin recargar la página.
2. **Caso 2: Validación de Renderizado de Datos:** Verifica la carga correcta de los elementos en la lista de equipos y valida el contenido esperado del primer registro.
3. **Caso 3: Envío de Formulario:** Simula el ingreso de datos en el formulario de atleta (nombre y deporte), ejecuta el envío y confirma la aparición del mensaje de éxito.

### Pruebas de API REST - `tests/api.spec.js`
1. **Caso API 1: Petición Exitosa (Status 200 y Estructura JSON):** Realiza una consulta GET, valida que el código de respuesta HTTP sea `200` y verifica que la estructura de la respuesta contenga las propiedades esperadas en formato JSON.
2. **Caso API 2: Manejo de Errores (Status 404 Not Found):** Realiza una consulta a un recurso inexistente y valida que la API retorne el código HTTP `404` adecuadamente.


## 🚀 Guía de Instalación y Ejecución Paso a Paso

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu equipo.

### 2. Clonar e Instalar Dependencias
Abre la terminal en la raíz del proyecto y ejecuta:

```bash
# Instalar las dependencias de Node.js
npm install

# Instalar los navegadores necesarios para Playwright
npx playwright install

# Correr las prubas
npm test

# Visulizar resultados
npm run report

# Para visualizar al bot haciendo las pruebas
npx playwright test tests/ui.spec.js --headed