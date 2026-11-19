document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const suggestionBtns = document.querySelectorAll(".suggestion-btn");

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = userInput.value.trim();
        if (texto === "") return;

        agregarMensaje(texto, "user");
        userInput.value = "";
        enviarAlServidor(texto);
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const pregunta = btn.textContent;
            agregarMensaje(pregunta, "user");
            enviarAlServidor(pregunta);
        });
    });

    function agregarMensaje(texto, remitente) {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message");
        mensajeDiv.classList.add(remitente === "user" ? "user-message" : "bot-message");

        const contenidoDiv = document.createElement("div");
        contenidoDiv.classList.add("message-content");
        contenidoDiv.textContent = texto;

        mensajeDiv.appendChild(contenidoDiv);
        chatMessages.appendChild(mensajeDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function enviarAlServidor(pregunta) {
        const idTemp = "temp-" + Date.now();
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message", "bot-message");
        mensajeDiv.id = idTemp;
        mensajeDiv.innerHTML = `<div class="message-content" style="color: #718096; font-style: italic;">Analizando el Estatuto Orgánico de la UASD...</div>`;
        chatMessages.appendChild(mensajeDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensaje: pregunta })
            });

            const data = await response.json();
            
            const elemTemp = document.getElementById(idTemp);
            if (elemTemp) elemTemp.remove();

            if (response.ok) {
                agregarMensaje(data.respuesta, "bot");
            } else {
                agregarMensaje("Lo siento, ocurrió un error al consultar el servidor.", "bot");
            }
        } catch (error) {
            const elemTemp = document.getElementById(idTemp);
            if (elemTemp) elemTemp.remove();
            agregarMensaje("Error de conexión con el servidor backend.", "bot");
        }
    }
});