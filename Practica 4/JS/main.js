document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos desde localStorage o usar el JSON por defecto
    let menuData = JSON.parse(localStorage.getItem('menuData')) || defaultMenuData;

    const menuContainer = document.getElementById('dynamic-menu');
    const addForm = document.getElementById('add-menu-form');
    const viewPanel = document.getElementById('view-panel');
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');

  // Funciones de Sanitización (Seguridad)
    function sanitizeInput(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

  // 1. Renderizar el Menú Dinámicamente desde la Estructura JSON
    function renderMenu(data) {
        menuContainer.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'menu-item';

            const hasSubmenu = item.submenus && item.submenus.length > 0;
            
            const link = document.createElement('a');
            link.className = 'menu-link';
            link.href = item.enlace;
            link.innerHTML = `
            <span>${item.icono || '📌'} ${sanitizeInput(item.nombre)}</span>
            ${hasSubmenu ? '<span>▼</span>' : ''}
            `;

        // Evento al hacer clic en una opción principal
            link.addEventListener('click', (e) => {
            if (hasSubmenu) {
                e.preventDefault();
                const submenuEl = li.querySelector('.submenu');
                submenuEl.classList.toggle('open');
            } else {
                updateView(item.nombre, item.enlace);
            }
            });

            li.appendChild(link);

        // Renderizar Submenú si existe
            if (hasSubmenu) {
                const ulSub = document.createElement('ul');
                ulSub.className = 'submenu';
                item.submenus.forEach(sub => {
                    const subLi = document.createElement('li');
                    const subLink = document.createElement('a');
                    subLink.className = 'submenu-link';
                    subLink.href = sub.enlace;
                    subLink.textContent = sub.nombre;
                    subLink.addEventListener('click', (e) => {
                        e.stopPropagation();
                        updateView(`${item.nombre} > ${sub.nombre}`, sub.enlace);
                    });
                    subLi.appendChild(subLink);
                    ulSub.appendChild(subLi);
                });
                li.appendChild(ulSub);
            }
            menuContainer.appendChild(li);
        });
    }

  // 2. Evento para Actualización Dinámica del Área de Contenido
    function updateView(title, path) {
        viewPanel.innerHTML = `
            <div class="card">
            <h2>Módulo: ${sanitizeInput(title)}</h2>
            <p>Se ha cargado dinámicamente la ruta: <code>${sanitizeInput(path)}</code></p>
            </div>
        `;
    }

  // 3. Agregar Nueva Opción al Menú (Validación + Sin Recargar Página)
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('menu-id').value.trim();
        const nombre = document.getElementById('menu-nombre').value.trim();
        const icono = document.getElementById('menu-icono').value.trim();
        const enlace = document.getElementById('menu-enlace').value.trim();

        // Validación de ID Único
        const idExiste = menuData.some(item => item.id === id);
        if (idExiste) {
            alert('Error: El ID ingresado ya existe. Por favor use un ID único.');
            return;
        }

        // Validación básica de formato de enlace
        if (!enlace.startsWith('#') && !enlace.startsWith('http')) {
            alert('El enlace debe comenzar con "#" o ser una URL válida.');
            return;
        }

        // Insertar nueva opción
        const newItem = {
            id: sanitizeInput(id),
            nombre: sanitizeInput(nombre),
            icono: sanitizeInput(icono) || '📌',
            enlace: sanitizeInput(enlace),
            submenus: []
        };

        menuData.push(newItem);
        
        // Guardar en localStorage para mantener persistencia
        localStorage.setItem('menuData', JSON.stringify(menuData));

        // Renderizar de nuevo sin recargar la página
        renderMenu(menuData);
            addForm.reset();
            alert('¡Opción agregada al menú dinámico con éxito!');
        });

    // Toggle Menú Móvil Responsive
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
    });

  // Render inicial
    renderMenu(menuData);
});