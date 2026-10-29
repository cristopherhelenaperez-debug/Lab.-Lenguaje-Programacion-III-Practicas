const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on', // Toma capturas de pantalla automaticamente
        trace: 'on-first-retry',
    },
        reporter: [['html', { open: 'never' }]], // Genera un reporte HTML visual
        webServer: {
        command: 'npx http-server . -p 8080',
        port: 8080,
        reuseExistingServer: !process.env.CI,
    },
});