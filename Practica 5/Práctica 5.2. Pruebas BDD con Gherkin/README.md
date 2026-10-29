# 💻 Pruebas BDD con Gherkin - E-Commerce AbbaTech

Este repositorio contiene la definición y documentación de pruebas de comportamiento (**BDD - Behavior Driven Development**) redactadas en sintaxis **Gherkin** para el portal e-commerce de tecnología **AbbaTech**.

---

## 🎯 Funcionalidad Principal Evaluada
Interacción del usuario en el portal **AbbaTech**:
1. Cambio de tema visual en tiempo real (Modo Claro / Modo Oscuro).
2. Asistencia virtual interactiva a través del widget **AbbaBot v2.6**.

---

## 📜 Descripción de los 5 Escenarios BDD

### 1. Escenario Exitoso: Alternar a Modo Oscuro
* **Gherkin:** `Escenario: Cambiar dinámicamente entre el modo claro y modo oscuro`
* **Explicación:** Valida que al presionar el botón `#theme-toggle`, la página aplique la clase CSS `dark-mode` al `<body>` y actualice el ícono del botón a un sol (`☀️`).

### 2. Escenario Exitoso: Opciones Rápidas de AbbaBot
* **Gherkin:** `Escenario: Interacción con las opciones rápidas del asistente virtual AbbaBot`
* **Explicación:** Comprueba que al presionar la opción rápida *"Servicios Seguros"*, el bot responda automáticamente con la información del catálogo de computadoras, laptops y smartphones.

### 3. Escenario Exitoso: Consulta de Contacto en el Chat
* **Gherkin:** `Escenario: Consultar información sobre el soporte técnico escribiendo en el chat`
* **Explicación:** Verifica que al escribir palabras clave como *"contacto"* en el formulario del chat, el script de `main.js` procese la entrada y retorne la información del teléfono y formulario de contacto.

### 4. Escenario de Error: Envío de Mensaje Vacío
* **Gherkin:** `Escenario: Intento de envío de mensaje vacío en el chatbot AbbaBot`
* **Explicación:** Valida el manejo de validación en `main.js`, asegurando que no se agreguen globos de texto al chat ni se consuma procesamiento si el usuario intenta enviar el campo de texto en blanco.

### 5. Escenario de Error: Respuesta por Defecto ante Entradas Desconocidas
* **Gherkin:** `Escenario: Consulta con palabras no reconocidas por el bot`
* **Explicación:** Evalúa el comportamiento del bot ante entradas que no coinciden con ninguna palabra clave configurada, confirmando que retorne una respuesta clara por defecto sin romper la ejecución del script.

---

## 📁 Estructura del Proyecto

```text
.
├── CSS/
│   └── pyme.css
├── JS/
│   └── main.js
├── index.html
├── muebles.feature
└── README.md