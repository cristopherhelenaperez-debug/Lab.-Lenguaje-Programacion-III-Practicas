# 🤖 Chatbot Web Inteligente - Estatuto Orgánico de la UASD

Aplicación web académica desarrollada como proyecto final para la asignatura **Laboratorio de Lenguaje de Programación III – Web**. Consiste en un asistente virtual interactivo potenciado por Inteligencia Artificial diseñado para responder consultas institucionales basándose exclusivamente en el **Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD)**.

---

## 🚀 Características Principales
* **Interfaz de Conversación Moderna:** Diseño tipo chat limpio, intuitivo y completamente responsivo (adaptado para computadoras, tabletas y teléfonos móviles).
* **Preguntas Sugeridas Preelaboradas:** Panel lateral interactivo con las consultas más frecuentes sobre la estructura, autoridades, derechos, deberes y normativas de la UASD.
* **Inteligencia Artificial Generativa:** Integración con la API de Google Gemini mediante el SDK oficial (`@google/genai`), permitiendo procesar lenguaje natural con total libertad de redacción.
* **Restricción de Dominio Estricta (*Guardrails*):** El bot está programado mediante instrucciones de sistema (*System Instructions*) para rechazar amablemente cualquier consulta que se encuentre fuera del ámbito del Estatuto Orgánico o la vida universitaria.
* **Arquitectura Cliente-Servidor:** Frontend basado en HTML5/CSS3/JavaScript y Backend robusto gestionado en Node.js con Express.

---

## 🛠️ Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3 (Variables, Flexbox, Diseño Responsive), JavaScript Vanilla (Fetch API y manipulación del DOM).
* **Backend:** Node.js, Express.
* **Inteligencia Artificial:** Google GenAI SDK (`gemini-4-hydrogen`)[cite: 2].
* **Entorno y Seguridad:** `dotenv` para la gestión de variables de entorno (API Keys).

---

## 📂 Estructura del Proyecto
```text
ChatbotUASD/
├── public/
│   ├── index.html       # Interfaz visual principal del chat
│   ├── CSS/
│   │   └── chat.css     # Estilos modernos de la interfaz
│   └── JS/
│       └── chat.js      # Lógica de comunicación asíncrona (Fetch) con el backend
├── server.js            # Servidor Express y controlador de la IA
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación oficial del proyecto 
```
## ⚙️ Instrucciones de Instalación y Ejecución Local
1. Clonar o descargar este repositorio en tu computadora.

2. Asegúrate de tener instalado Node.js.

3. Abre tu terminal en la raíz del proyecto (ChatbotUASD/) e instala las dependencias necesarias:
    npm install

4. Configura tu API Key de Gemini:

    Genera una clave gratuita en Google AI Studio.
    Crea un archivo llamado exactamente .env en la raíz del proyecto en VS Code.
    Agrega tu llave de la siguiente manera:
        Fragmento de código en el archivo .env 
        export GEMINI_API_KEY="tu_clave_api_aqui"
    
6. Iniciar el servidor backend:
    Abre la consola en la carpeta donde est eel server.js y ejecuta:
    node server.js

7. Abre tu navegador web e ingresa a la siguiente dirección:
👉 http://localhost:3000