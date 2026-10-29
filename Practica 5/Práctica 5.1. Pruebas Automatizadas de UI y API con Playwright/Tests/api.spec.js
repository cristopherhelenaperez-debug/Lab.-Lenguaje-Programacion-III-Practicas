const { test, expect } = require('@playwright/test');

test.describe('Pruebas de API - Datos Deportivos', () => {

  // PRUEBA API 1: Validar respuesta 200 OK y estructura JSON de posts/deportes
    test('Caso API 1: Obtener listado de eventos/datos con Status 200 y formato JSON correcto', async ({ request }) => {
        // Usamos JSONPlaceholder simulando consulta de eventos deportivos
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

        // 1. Validar Codigo HTTP 200
        expect(response.status()).toBe(200);

        // 2. Validar que la respuesta sea JSON y contenga los campos requeridos
        const body = await response.json();
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('title');
        expect(typeof body.title).toBe('string');
    });

  // PRUEBA API 2: Validar código HTTP 404 al consultar una ruta/recurso inexistente
    test('Caso API 2: Validar manejo de error HTTP 404 al consultar un recurso que no existe', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');

        // 1. Validar Codigo HTTP 404
        expect(response.status()).toBe(404);
    });

});