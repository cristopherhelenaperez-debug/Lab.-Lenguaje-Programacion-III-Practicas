document.addEventListener("DOMContentLoaded", () => {
    const btnTabRegistro = document.getElementById("tab-btn-registro");
    const btnTabConsulta = document.getElementById("tab-btn-consulta");
    const seccionRegistro = document.getElementById("seccion-registro");
    const seccionConsulta = document.getElementById("seccion-consulta");

    const formAlumno = document.getElementById("form-alumno");
    const formTitulo = document.getElementById("form-titulo");
    const alumnoIdInput = document.getElementById("alumno-id");
    const btnGuardar = document.getElementById("btn-guardar");
    const btnCancelar = document.getElementById("btn-cancelar");
    const tablaBody = document.getElementById("tabla-alumnos-body");
    const inputBuscar = document.getElementById("input-buscar");

    let listaAlumnos = [];

    // Navegación por pestañas
    btnTabRegistro.addEventListener("click", () => activarTab(btnTabRegistro, seccionRegistro));
    btnTabConsulta.addEventListener("click", () => {
        activarTab(btnTabConsulta, seccionConsulta);
        obtenerAlumnos();
    });

    function activarTab(btn, seccion) {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        seccion.classList.add("active");
    }

    // --- 1. CONSULTAR ALUMNOS (READ) ---
    async function obtenerAlumnos() {
        try {
            const response = await fetch('http://localhost:3000/api/alumnos');
            listaAlumnos = await response.json();
            renderizarTabla();
        } catch (error) {
            console.error("Error al obtener los alumnos:", error);
            alert("⚠️ No se pudo conectar con el servidor.");
        }
    }

    function renderizarTabla(filtro = "") {
        tablaBody.innerHTML = "";
        const filtrados = listaAlumnos.filter(a => 
            a.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            a.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
            a.matricula.toLowerCase().includes(filtro.toLowerCase()) ||
            a.curso.toLowerCase().includes(filtro.toLowerCase())
        );

        if (filtrados.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#718096;">No se encontraron registros en la base de datos.</td></tr>`;
            return;
        }

        filtrados.forEach(a => {
            const badgeEstatus = a.estatus === "Aprobado" 
                ? `<span style="color: green; font-weight: bold;">🟢 Aprobado</span>` 
                : `<span style="color: red; font-weight: bold;">🔴 Reprobado</span>`;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${a.matricula}</strong></td>
                <td>${a.nombre} ${a.apellido}</td>
                <td>${a.curso}</td>
                <td><strong>${a.calificacionTotal} pts</strong></td>
                <td>${badgeEstatus}</td>
                <td>
                    <button class="btn btn-edit" onclick="prepararEdicion(${a.id})">✏️ Editar</button>
                    <button class="btn btn-delete" onclick="eliminarAlumno(${a.id})">🗑️ Borrar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }

    // --- 2. INSERTAR / MODIFICAR (CREATE & UPDATE) ---
    formAlumno.addEventListener("submit", async (e) => {
        e.preventDefault();

        const p1 = parseFloat(document.getElementById("parcial1").value);
        const p2 = parseFloat(document.getElementById("parcial2").value);
        const ef = parseFloat(document.getElementById("examenFinal").value);
        const asg = parseFloat(document.getElementById("asignaciones").value);

        // Restricciones de puntaje máximo
        if (p1 < 0 || p1 > 20) { alert("⚠️ El 1er Parcial debe ser entre 0 y 20 puntos."); return; }
        if (p2 < 0 || p2 > 20) { alert("⚠️ El 2do Parcial debe ser entre 0 y 20 puntos."); return; }
        if (ef < 0 || ef > 30) { alert("⚠️ El Examen Final debe ser entre 0 y 30 puntos."); return; }
        if (asg < 0 || asg > 30) { alert("⚠️ Las Asignaciones deben ser entre 0 y 30 puntos."); return; }

        const id = alumnoIdInput.value;
        const alumnoData = {
            matricula: document.getElementById("matricula").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            telefono: document.getElementById("telefono").value,
            curso: document.getElementById("curso").value,
            direccion: document.getElementById("direccion").value,
            parcial1: p1,
            parcial2: p2,
            examenFinal: ef,
            asignaciones: asg
        };

        try {
            let response;
            if (id) {
                // Actualizar (PUT)
                response = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alumnoData)
                });
            } else {
                // Insertar (POST)
                response = await fetch('http://localhost:3000/api/alumnos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alumnoData)
                });
            }

            const resultado = await response.json();
            if (!response.ok) throw new Error(resultado.error || "Error al procesar la solicitud");

            alert(`✅ Operación exitosa. Nota Total: ${resultado.calificacionTotal}/100 (${resultado.estatus})`);
            resetearFormulario();
            activarTab(btnTabConsulta, seccionConsulta);
            obtenerAlumnos();

        } catch (error) {
            alert(`❌ Error: ${error.message}`);
        }
    });

    // --- 3. PREPARAR EDICIÓN ---
    window.prepararEdicion = (id) => {
        const alumno = listaAlumnos.find(a => a.id === id);
        if (!alumno) return;

        alumnoIdInput.value = alumno.id;
        document.getElementById("matricula").value = alumno.matricula;
        document.getElementById("nombre").value = alumno.nombre;
        document.getElementById("apellido").value = alumno.apellido;
        document.getElementById("fechaNacimiento").value = alumno.fechaNacimiento;
        document.getElementById("telefono").value = alumno.telefono;
        document.getElementById("curso").value = alumno.curso;
        document.getElementById("direccion").value = alumno.direccion;
        document.getElementById("parcial1").value = alumno.parcial1;
        document.getElementById("parcial2").value = alumno.parcial2;
        document.getElementById("examenFinal").value = alumno.examenFinal;
        document.getElementById("asignaciones").value = alumno.asignaciones;

        formTitulo.textContent = "Modificar Registro de Alumno";
        btnGuardar.textContent = "🔄 Actualizar Alumno";
        btnCancelar.classList.remove("hidden");
        activarTab(btnTabRegistro, seccionRegistro);
    };

    // --- 4. BORRAR ALUMNO (DELETE) ---
    window.eliminarAlumno = async (id) => {
        if (confirm("¿Estás seguro de eliminar este registro de la base de datos?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/alumnos/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error("No se pudo eliminar el registro");

                alert("🗑️ Alumno eliminado correctamente.");
                obtenerAlumnos();
            } catch (error) {
                alert(`❌ Error: ${error.message}`);
            }
        }
    };

    btnCancelar.addEventListener("click", resetearFormulario);

    function resetearFormulario() {
        formAlumno.reset();
        alumnoIdInput.value = "";
        formTitulo.textContent = "Registrar Nuevo Alumno";
        btnGuardar.textContent = "💾 Guardar Alumno";
        btnCancelar.classList.add("hidden");
    }

    inputBuscar.addEventListener("input", (e) => renderizarTabla(e.target.value));

    // Carga inicial al abrir la página
    obtenerAlumnos();
});