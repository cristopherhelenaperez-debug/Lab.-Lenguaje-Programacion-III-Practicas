import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de la prueba de carga (Simulando usuarios en AbbaTech)
export const options = {
    vus: 10,          // 10 Usuarios Virtuales concurrentes
    duration: '15s',  // Duración de la prueba: 15 segundos
};

export default function () {
  // Petición simulando la carga del e-commerce AbbaTech
    const res = http.get('https://test-api.k6.io/public/crocodiles/');

    // Verificaciones (Checks)
    check(res, {
        'status es 200': (r) => r.status === 200,
        'tiempo de respuesta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}