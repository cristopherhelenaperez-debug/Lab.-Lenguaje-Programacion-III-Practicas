# 🎓 EduManage - Sistema de Gestión de Alumnos con CRUD y SQLite

Aplicación web académica desarrollada para la gestión y control de registros de estudiantes, implementando operaciones completas **CRUD (Insertar, Modificar, Borrar y Consultar)** respaldadas por una base de datos relacional local en SQLite y un servidor backend en Node.js (Express).

---

## 🛠️ Tecnologías Utilizadas
* **Frontend:** HTML5, CSS3 (Diseño responsivo y moderno), JavaScript Vanilla (peticiones asíncronas `fetch`).
* **Backend:** Node.js, Express.
* **Base de Datos:** SQLite3 (Persistencia local en archivo).

---

## 📐 Características y Reglas de Negocio
1. **Desglose de Calificaciones por Apartados:**
   * **1er Parcial:** Máximo 20 puntos.
   * **2do Parcial:** Máximo 20 puntos.
   * **Examen Final:** Máximo 30 puntos.
   * **Asignaciones:** Máximo 30 puntos.
2. **Cálculo Automático y Validación:** Sumatoria total sobre 100 puntos con restricciones estrictas de puntaje máximo para prevenir notas inválidas.
3. **Estatus Académico Dinámico:** El sistema asigna automáticamente el estatus de **Aprobado** (>= 70 pts) o **Reprobado** (< 70 pts).
4. **Materias de Secundaria Soportadas:** Matemáticas, Letras, Ciencias Sociales, Química, Física, Informática e Idiomas.

---

## 🚀 Instrucciones de Instalación y Ejecución Local

1. Clonar o descargar este repositorio en tu computadora.
2. Asegurarte de tener instalado [Node.js](https://nodejs.org/).
3. Abrir la terminal en la raíz del proyecto e instalar las dependencias necesarias:
    ```powershell
    npm install
4. Iniciar el servidor backend:
    node server.js
5. Abrir tu navegador web e ingresar a la siguiente URL:
👉 http://localhost:3000
(Opcional) Si deseas poblar la base de datos con 20 registros artificiales iniciales, ejecuta el seed.js:
    node seed.js
