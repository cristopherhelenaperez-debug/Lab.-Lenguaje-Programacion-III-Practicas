const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve los archivos HTML/CSS/JS

// Conexión y Creación de la Base de Datos SQLite (Archivo local: alumnos.db)
const dbFile = path.join(__dirname, 'alumnos.db');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('📦 Conectado exitosamente a la base de datos SQLite (alumnos.db)');
    }
});

// Crear la Tabla Alumnos con sus restricciones si no existe
db.run(`CREATE TABLE IF NOT EXISTS alumnos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fechaNacimiento TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    curso TEXT NOT NULL,
    parcial1 REAL CHECK(parcial1 >= 0 AND parcial1 <= 20),
    parcial2 REAL CHECK(parcial2 >= 0 AND parcial2 <= 20),
    examenFinal REAL CHECK(examenFinal >= 0 AND examenFinal <= 30),
    asignaciones REAL CHECK(asignaciones >= 0 AND asignaciones <= 30),
    calificacionTotal REAL,
    estatus TEXT
)`, (err) => {
    if (err) console.error("Error al crear la tabla:", err.message);
    else console.log("📋 Tabla 'alumnos' verificada o creada correctamente.");
});

// --- ENDPOINTS DEL CRUD (API REST) ---

// 1. CONSULTAR TODOS LOS ALUMNOS (READ)
app.get('/api/alumnos', (req, res) => {
    const query = `SELECT * FROM alumnos`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 2. INSERTAR NUEVO ALUMNO (CREATE)
app.post('/api/alumnos', (req, res) => {
    const { matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones } = req.body;
    
    const calificacionTotal = parseFloat(parcial1) + parseFloat(parcial2) + parseFloat(examenFinal) + parseFloat(asignaciones);
    const estatus = calificacionTotal >= 70 ? "Aprobado" : "Reprobado";

    const query = `INSERT INTO alumnos (matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones, calificacionTotal, estatus) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones, calificacionTotal, estatus];

    db.run(query, params, function(err) {
        if (err) {
            res.status(400).json({ error: "Error al registrar. ¿La matrícula ya está registrada?" });
        } else {
            res.json({ id: this.lastID, message: "Alumno registrado con éxito", calificacionTotal, estatus });
        }
    });
});

// 3. MODIFICAR ALUMNO EXISTENTE (UPDATE)
app.put('/api/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const { matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones } = req.body;

    const calificacionTotal = parseFloat(parcial1) + parseFloat(parcial2) + parseFloat(examenFinal) + parseFloat(asignaciones);
    const estatus = calificacionTotal >= 70 ? "Aprobado" : "Reprobado";

    const query = `UPDATE alumnos SET matricula = ?, nombre = ?, apellido = ?, fechaNacimiento = ?, direccion = ?, telefono = ?, curso = ?, parcial1 = ?, parcial2 = ?, examenFinal = ?, asignaciones = ?, calificacionTotal = ?, estatus = ? WHERE id = ?`;
    
    const params = [matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones, calificacionTotal, estatus, id];

    db.run(query, params, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: "Alumno actualizado correctamente", calificacionTotal, estatus });
        }
    });
});

// 4. BORRAR ALUMNO (DELETE)
app.delete('/api/alumnos/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM alumnos WHERE id = ?`;

    db.run(query, id, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ message: "Alumno eliminado correctamente" });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});