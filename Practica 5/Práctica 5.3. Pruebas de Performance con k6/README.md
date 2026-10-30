# ⚡ Práctica 5.3: Pruebas de Performance con k6 - AbbaTech

Este directorio contiene las pruebas de rendimiento y comportamiento bajo carga simulada para la plataforma e-commerce **AbbaTech**, ejecutadas mediante la herramienta de ingeniería de rendimiento **Grafana k6**.

---

## 📐 Estrategia y Arquitectura del Proyecto

Para evitar la duplicación de código y archivos estáticos, este módulo reutiliza la interfaz base de la aplicación **AbbaTech** (HTML/CSS/JS) ubicada en el directorio de la *Práctica 5.2*. 

Las pruebas de carga evalúan el tiempo de respuesta, la concurrencia de usuarios y la estabilidad de las peticiones HTTP al consultar el catálogo de productos tecnológicos.

---

## ⚙️ Configuración del Escenario de Prueba (`performance_test.js`)

El script de rendimiento evalúa la capacidad de respuesta del sistema bajo un esquema de usuarios virtuales (VUs) concurrentes:

* **Usuarios Virtuales (VUs):** 10 usuarios concurrentes[cite: 10].
* **Duración de la Carga:** 15 segundos sostenidos[cite: 10].
* **Aserciones de Calidad (Checks):**
    1. Código de respuesta HTTP debe ser `200 OK`[cite: 10].
    2. Tiempo de respuesta (`http_req_duration`) debe ser menor a `500 ms`[cite: 10].

---

## 📊 Análisis de Resultados de la Ejecución (Evidencia Real)

Basado en la ejecución del comando `k6 run performance_test.js` en entorno local:

| Métrica | Valor Obtenido | Umbral Esperado | Estado |
| :--- | :--- | :--- | :--- |
| **Total de Peticiones (`http_reqs`)** | 260 solicitudes | N/A | Completed |
| **Total de Validaciones (`checks_total`)** | 260 comprobaciones | 100% Exitosas | ✅ Passed[cite: 10] |
| **Tasa de Fallos (`http_req_failed`)** | **0.00%** (0 errores) | < 1.00% | ✅ Passed[cite: 10] |
| **Tiempo Promedio de Respuesta (`avg`)** | **53.29 ms** | < 500 ms | ✅ Excelente[cite: 10] |
| **Tiempo Mínimo / Máximo** | 31.36 ms / 148.99 ms | N/A | ✅ Estable[cite: 10] |
| **Percentil 95 (`p95`)** | **73.49 ms** | < 500 ms | ✅ Óptimo[cite: 10] |
| **Iteraciones Totales (`iterations`)** | 130 completadas | N/A | ✅ Passed[cite: 10] |
| **Usuarios Concurrentes (`vus`)** | 10 VUs sostenidos | 10 VUs | ✅ Met[cite: 10] |

---

## 💬 Conclusión de Rendimiento

1. **Estabilidad del Sistema:** El sistema respondió con un **0.00% de tasa de error** durante toda la ventana de simulación[cite: 10], demostrando capacidad de manejo de tráfico sin degradación de servicio.
2. **Velocidad de Respuesta:** El tiempo medio de respuesta de **53.29 ms**[cite: 10] se encuentra significativamente por debajo del límite máximo aceptable de 500 ms, garantizando una experiencia de usuario fluida e instantánea en la plataforma AbbaTech.

---

## 🖼️ Evidencia Gráfica
La captura de pantalla de la terminal con los resultados consolidados de k6 se encuentra almacenada en este mismo directorio bajo el nombre de `evidencia_k6.png` (o el nombre correspondiente a tu captura).

---

## 🚀 Instrucciones para Replicar la Prueba Localmente

1. Tener instalado **k6** en el sistema:
    ```powershell
    winget install k6 --source winget
2. Correr el test
    k6 run performance_test.js