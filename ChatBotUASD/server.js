const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar la API oficial de Google GenAI
// Tomará automáticamente la clave del archivo .env (process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI();

// Instrucción de Sistema (System Prompt) estricta para el modelo
const SYSTEM_INSTRUCTION = `
Eres el Asistente Inteligente oficial del Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD).
Tu objetivo es responder de forma clara, natural, coherente y fundamentada a las consultas de los usuarios sobre el Estatuto Orgánico de la UASD (disponible en: https://postgrado.uasd.edu.do/wp-content/uploads/2024/06/ESTATUTO-ORGANICO-UASD.pdf).

REGLAS CRÍTICAS DE COMPORTAMIENTO:
1. Libertad de expresión: Puedes redactar las respuestas con flexibilidad y naturalidad conversacional, explicando los conceptos de forma didáctica.
2. Restricción de dominio: Si el usuario realiza una pregunta que NO tiene relación con el Estatuto Orgánico de la UASD, la vida universitaria, sus reglamentos o sus autoridades, DEBES rechazarla educadamente respondiendo estrictamente: "Lo siento, pero esa consulta está fuera de mi área de conocimiento. Solo estoy autorizado para responder preguntas relacionadas con el Estatuto Orgánico de la UASD."
3. Honestidad institucional: Si una pregunta está relacionada con la UASD pero el dato específico no se encuentra en el documento normativo, debes responder con franqueza: "No dispongo de información específica sobre ese detalle en el Estatuto Orgánico de la UASD."
`;

// Endpoint de la API del Chatbot con IA real
app.post('/api/chat', async (req, res) => {
    const { mensaje } = req.body;

    if (!mensaje) {
        return res.status(400).json({ error: "El mensaje es obligatorio." });
    }

    try {
        // Llamada al modelo Gemini con el modelo actualizado
        const response = await ai.models.generateContent({
            model: 'gemini-4-hydrogen', // <-- Actualizado aquí
            contents: mensaje,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.3,
            }
        });

        const respuestaIA = response.text;
        res.json({ respuesta: respuestaIA });

    } catch (error) {
        console.error("Error al conectar con la IA:", error);
        res.status(500).json({ error: "Ocurrió un error al procesar tu consulta con la Inteligencia Artificial." });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor del Chatbot UASD con IA corriendo en http://localhost:${PORT}`);
});