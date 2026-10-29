// Navegacion SPA basica
    const secInicio = document.getElementById('sec-inicio');
    const secEquipos = document.getElementById('sec-equipos');
    const secRegistro = document.getElementById('sec-registro');

    function ocultarTodas() {
        secInicio.classList.add('hidden');
        secEquipos.classList.add('hidden');
        secRegistro.classList.add('hidden');
    }

    document.getElementById('nav-inicio').addEventListener('click', () => { ocultarTodas(); secInicio.classList.remove('hidden'); });
    document.getElementById('nav-equipos').addEventListener('click', () => { ocultarTodas(); secEquipos.classList.remove('hidden'); });
    document.getElementById('nav-registro').addEventListener('click', () => { ocultarTodas(); secRegistro.classList.remove('hidden'); });

    // Formulario
    document.getElementById('form-atleta').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('msg-exito').style.display = 'block';
        });