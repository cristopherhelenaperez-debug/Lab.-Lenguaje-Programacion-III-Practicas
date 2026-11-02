const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'alumnos.db');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('📦 Conectado a la base de datos para inserción masiva...');
    }
});

// Lista de 20 alumnos sin acentos y con las nuevas materias de secundaria
const alumnosMasivos = [
    ["2026-0101", "Carlos", "Perez", "2003-04-12", "Av. 27 de Febrero", "809-555-0101", "Matematicas", 18, 19, 28, 27],
    ["2026-0102", "Maria", "Gomez", "2002-09-15", "Calle El Sol", "809-555-0102", "Letras", 10, 12, 15, 18],
    ["2026-0103", "Jose", "Martinez", "2001-11-20", "Ensanche Naco", "809-555-0103", "Ciencias Sociales", 20, 20, 30, 30],
    ["2026-0104", "Ana", "Rodriguez", "2004-01-05", "Piantini", "809-555-0104", "Quimica", 5, 8, 10, 12],
    ["2026-0105", "Luis", "Fernandez", "2002-07-22", "Bella Vista", "809-555-0105", "Fisica", 19, 18, 29, 28],
    ["2026-0106", "Sofia", "Lopez", "2003-03-30", "Los Prados", "809-555-0106", "Informatica", 12, 14, 20, 19],
    ["2026-0107", "David", "Torres", "2001-12-10", "Gazcue", "809-555-0107", "Idiomas", 15, 16, 25, 24],
    ["2026-0108", "Laura", "Ramirez", "2004-05-18", "Arroyo Hondo", "809-555-0108", "Matematicas", 8, 7, 12, 10],
    ["2026-0109", "Jorge", "Cruz", "2002-08-25", "Villa Mella", "809-555-0109", "Letras", 17, 19, 27, 26],
    ["2026-0110", "Carmen", "Ortiz", "2003-10-02", "Los Alcarrizos", "809-555-0110", "Ciencias Sociales", 6, 9, 14, 11],
    ["2026-0111", "Miguel", "Silva", "2001-06-14", "Herrera", "809-555-0111", "Quimica", 20, 19, 30, 29],
    ["2026-0112", "Elena", "Rojas", "2004-02-28", "Naco", "809-555-0112", "Fisica", 14, 13, 22, 20],
    ["2026-0113", "Gabriel", "Acosta", "2002-11-11", "Serralles", "809-555-0113", "Informatica", 16, 17, 26, 25],
    ["2026-0114", "Valeria", "Mendoza", "2003-07-09", "Bani", "809-555-0114", "Idiomas", 10, 11, 16, 15],
    ["2026-0115", "Alejandro", "Castillo", "2001-09-03", "Santiago", "809-555-0115", "Matematicas", 18, 18, 28, 28],
    ["2026-0116", "Daniela", "Jimenez", "2004-04-19", "La Romana", "809-555-0116", "Letras", 7, 6, 10, 9],
    ["2026-0117", "Ricardo", "Vargas", "2002-12-31", "San Cristobal", "809-555-0117", "Ciencias Sociales", 19, 20, 29, 30],
    ["2026-0118", "Paula", "Castro", "2003-01-22", "Higuey", "809-555-0118", "Quimica", 13, 14, 21, 22],
    ["2026-0119", "Francisco", "Morales", "2001-05-17", "Puerto Plata", "809-555-0119", "Fisica", 15, 15, 25, 25],
    ["2026-0120", "Lucia", "Guerrero", "2004-08-14", "San Francisco", "809-555-0120", "Informatica", 9, 8, 11, 12]
];

db.serialize(() => {
    const query = `INSERT OR IGNORE INTO alumnos (matricula, nombre, apellido, fechaNacimiento, direccion, telefono, curso, parcial1, parcial2, examenFinal, asignaciones, calificacionTotal, estatus) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let insertados = 0;

    alumnosMasivos.forEach(alumno => {
        const [mat, nom, ape, fnac, dir, tel, cur, p1, p2, ef, asg] = alumno;
        const total = p1 + p2 + ef + asg;
        const estatus = total >= 70 ? "Aprobado" : "Reprobado";

        db.run(query, [mat, nom, ape, fnac, dir, tel, cur, p1, p2, ef, asg, total, estatus], function(err) {
            if (!err && this.changes > 0) {
                insertados++;
            }
        });
    });

    setTimeout(() => {
        console.log(`✅ ¡Se han inyectado exitosamente ${insertados} alumnos con materias de secundaria!`);
        db.close();
    }, 1000);
});