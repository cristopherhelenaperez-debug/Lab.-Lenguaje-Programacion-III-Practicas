// Estructura JSON inicial con opciones principales y submenús
const defaultMenuData = [
    {
        id: "m1",
        nombre: "Inicio",
        icono: "🏠",
        enlace: "#inicio",
        submenus: []
    },
    {
        id: "m2",
        nombre: "Estudiantes",
        icono: "👨‍🎓",
        enlace: "#estudiantes",
        submenus: [
            { id: "sm201", nombre: "Nuevo Registro", enlace: "#estudiantes-nuevo" },
            { id: "sm202", nombre: "Listado General", enlace: "#estudiantes-lista" }
    ]
    },
    {
        id: "m3",
        nombre: "Cursos y Materias",
        icono: "📚",
        enlace: "#cursos",
        submenus: [
            { id: "sm301", nombre: "Asignar Cursos", enlace: "#cursos-asignar" },
            { id: "sm302", nombre: "Calificaciones", enlace: "#cursos-notas" }
    ]
    },
    {
        id: "m4",
        nombre: "Gestión de Menú",
        icono: "⚙️",
        enlace: "#admin-menu",
        submenus: []
    }
];