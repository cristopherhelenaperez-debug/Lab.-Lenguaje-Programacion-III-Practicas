const { test, expect } = require('@playwright/test');

test.describe('Pruebas de UI - App Deportiva SportZone', () => {

    test.beforeEach(async ({ page }) => {
        // Carga la aplicacion web
        await page.goto(`file://${process.cwd()}/index.html`);
    });

  // PRUEBA 1: Validar navegacion entre secciones del menú
    test('Caso 1: Navegación correcta entre pestañas del menú', async ({ page }) => {
        // Clic en pestaña Equipos
        await page.click('#nav-equipos');
        await expect(page.locator('#sec-equipos')).toBeVisible();
        await expect(page.locator('#sec-inicio')).toBeHidden();

        // Clic en pestaña Registro
        await page.click('#nav-registro');
        await expect(page.locator('#sec-registro')).toBeVisible();
    });

  // PRUEBA 2: Validar visualización de la lista de equipos
    test('Caso 2: Verificar que la lista de equipos carga correctamente', async ({ page }) => {
        await page.click('#nav-equipos');
        const listaEquipos = page.locator('#lista-equipos li');
        
        // Verificar que existen exactamente 3 equipos listados
        await expect(listaEquipos).toHaveCount(3);
        await expect(listaEquipos.first()).toContainText('Real Madrid');
    });

  // PRUEBA 3: Validar envío del formulario de registro de atletas
    test('Caso 3: Completar y enviar formulario de registro de atleta', async ({ page }) => {
        await page.click('#nav-registro');

        // Llenar campos del formulario
        await page.fill('#nombre', 'Carlos Alcaraz');
        await page.selectOption('#deporte', 'Fútbol');
        await page.click('#btn-guardar');

        // Validar mensaje de confirmacion
        const msgExito = page.locator('#msg-exito');
        await expect(msgExito).toBeVisible();
        await expect(msgExito).toHaveText('¡Atleta registrado con éxito!');
    });

});