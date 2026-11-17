document.addEventListener("DOMContentLoaded", () => {
    const inputCedula = document.getElementById("input-cedula");
    const btnValidar = document.getElementById("btn-validar");
    const resultadoContainer = document.getElementById("resultado-container");
    const resultadoTexto = document.getElementById("resultado-texto");

    // Máscara automática de formato xxx-xxxxxxx-x
    inputCedula.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, ""); // Solo números
        if (val.length > 3 && val.length <= 10) {
            val = val.slice(0, 3) + "-" + val.slice(3);
        } else if (val.length > 10) {
            val = val.slice(0, 3) + "-" + val.slice(3, 10) + "-" + val.slice(10, 11);
        }
        e.target.value = val;
    });

    btnValidar.addEventListener("click", () => {
        const cedulaCompleta = inputCedula.value.trim();
        validarCedulaDominicana(cedulaCompleta);
    });

    function validarCedulaDominicana(ced) {
        // Remover guiones para el cálculo numérico
        const limpia = ced.replace(/-/g, "");

        // 1. Validar longitud estricta (11 dígitos)
        if (limpia.length !== 11) {
            mostrarResultado(false, "⚠️ La cédula debe contener exactamente 11 dígitos (Formato: xxx-xxxxxxx-x).");
            return;
        }

        const base = limpia.substring(0, 10);
        const verificadorIngresado = parseInt(limpia.substring(10, 11), 10);

        let suma = 0;

        // 2. Aplicar algoritmo Módulo 10 (Luhn)
        for (let i = 0; i < base.length; i++) {
            let mult = (i % 2 === 0) ? 1 : 2;
            let resultado = parseInt(base[i], 10) * mult;

            if (resultado > 9) {
                let resStr = resultado.toString();
                resultado = parseInt(resStr[0], 10) + parseInt(resStr[1], 10);
            }
            suma += resultado;
        }

        let digitoCalculado = (10 - (suma % 10)) % 10;

        // 3. Comprobar dígito verificador y serie distinta de 000
        if (digitoCalculado === verificadorIngresado && base.substring(0, 3) !== "000") {
            mostrarResultado(true, `✅ ¡Cédula Válida! (${ced}) - Pertenece a una estructura correcta.`);
        } else {
            mostrarResultado(false, `❌ Cédula Inválida. El dígito de control no coincide con el algoritmo.`);
        }
    }

    function mostrarResultado(esValido, mensaje) {
        resultadoContainer.classList.remove("hidden", "valido", "invalido");
        if (esValido) {
            resultadoContainer.classList.add("valido");
        } else {
            resultadoContainer.classList.add("invalido");
        }
        resultadoTexto.textContent = mensaje;
    }
});