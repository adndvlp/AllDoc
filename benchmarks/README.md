# Referencia de AllDoc antes del rediseño

Este procedimiento implementa el punto 1 del [SDD](../specs/alldoc-sdd.md): registrar capturas, tamaños del bundle de producción y tiempos para comparar la app actual con el rediseño. No modifica la interfaz ni actualiza las capturas esperadas de la suite UI.

## Referencia registrada

El punto 1 está completado con la [referencia previa al rediseño](runs/2026-11-13T05-50-13-968Z-543ae4e484/README.md), ejecutada desde la terminal del usuario y verificada en el proyecto: 42 capturas nuevas, inventario del build y 240 muestras de interacciones, más dos primeras aperturas del buscador. Conserva entorno, versiones, condiciones y hashes.

La [revisión de la evidencia](runs/2026-11-13T05-50-13-968Z-543ae4e484/review.md) documenta integridad de archivos, revisión visual, métricas y sus límites. Esta es la referencia que debe compararse con el rediseño. Las ejecuciones parciales anteriores conservan su estado y no sustituyen a esta referencia completa.

## Ejecutar

```sh
npm run baseline
```

Reutiliza las dependencias instaladas. Requiere que Chromium de Playwright pueda ejecutarse en el entorno. Cada ejecución crea una carpeta independiente en `benchmarks/runs/` con fecha UTC y huella de fuente; no sobrescribe las anteriores.

Para registrar únicamente el build y los tamaños:

```sh
npm run baseline -- --bundle-only
```

Este modo deja expresamente pendientes las capturas nuevas y los tiempos. Una ejecución que no puede iniciar servidor o navegador también conserva su evidencia anterior, se marca como parcial y termina con código distinto de cero. No cambiar flags de seguridad del navegador para forzar su ejecución.

## Evidencia generada

| Archivo | Contenido |
| --- | --- |
| `README.md` | Resumen legible, condiciones y cualquier etapa pendiente |
| `report.json` | Entorno, versiones instaladas, huella SHA-256 de fuentes y herramienta, etapas y manifiesto de capturas |
| `bundle.json` | Inventario JS/CSS/HTML con bytes, gzip y hashes; totales y assets declarados por página |
| `screenshots/<proyecto>/*.png` | Capturas nuevas de inicio, SELECT, Comentarios, menú expandido, búsqueda y selector de texto |
| `timings-laptop.json` | Primera apertura y muestras de interacciones en `1280×800`, CPU 1× |
| `timings-celular.json` | Lo mismo en `390×844` emulado, CPU 4× |
| `prior-ui-references/` | Copias con hashes de las referencias UI anteriores; procedencia distinta de las capturas nuevas |
| `build.log`, `failure.log` | Diagnóstico local, si corresponde; los logs no se versionan |

Los artefactos de referencia (JSON, Markdown y PNG) se pueden versionar. El build y sus archivos generados se crean en directorios propios y temporales, que se limpian al finalizar. Se usa un servidor estático en un puerto local efímero; no se inicia, detiene o reutiliza el servidor de desarrollo de `3000` ni el servidor UI de `4173`.

Se utiliza el nombre estable `.docusaurus-baseline` para los archivos internos de Docusaurus, porque cambiar esa ruta puede cambiar los IDs de módulos y el bundle aunque la app sea idéntica. Un lock propio impide dos ejecuciones de referencia simultáneas; ambas carpetas internas quedan cubiertas por `.docusaurus*/` en `.gitignore`.

## Condiciones de la medición

- Build de producción y versiones instaladas, sin actualizar dependencias durante la referencia.
- Servidor local con gzip nivel 9 y sin caché HTTP. No hay simulación de una conexión móvil: se registra explícitamente como red local.
- Contextos nuevos sin historial ni almacenamiento del usuario. Las capturas usan acento azul, excepto el estado del selector violeta.
- Capturas en los siete tamaños de `playwright.config.ts`, con movimiento reducido y dimensiones del viewport. Espera de fuentes, imágenes y desplegables antes de capturar.
- Medición secuencial en laptop y celular emulado; CPU 1× y 4× respectivamente; movimiento normal. La emulación no equivale a un teléfono real.
- Primera apertura del buscador con índice sin cargar y, aparte, treinta muestras por acción con índice cargado: abrir buscador, escribir `w`, abrir WHERE desde un resultado y alternar SQL (quince aperturas y quince cierres).
- Guardar/quitar favorito se documenta como no aplicable en la app previa al rediseño. No se inventa un tiempo de referencia.

## Interpretar los tiempos

`domResponseMs` mide desde el timestamp del evento del navegador hasta que se cumple una condición DOM y llega el siguiente `requestAnimationFrame`. Evita incluir las esperas y comunicación del runner, pero es un **proxy de disponibilidad DOM**, no una medición exacta de píxeles presentados ni INP.

Las muestras conservan las entradas nativas `PerformanceEventTiming` que el navegador emite con `durationThreshold: 16`, sus IDs de interacción y sus subpartes (espera, procesamiento y presentación). El navegador cuantiza y omite duraciones inferiores al umbral; una entrada ausente se guarda como `null`, nunca como cero. Los percentiles calculados solo sobre entradas emitidas tienen cobertura parcial y se etiquetan así. Las muestras sin soporte tampoco se convierten en éxitos de rendimiento.

Los percentiles usan nearest rank; se guardan mediana, p95, mínimo, máximo y tamaño de muestra. También se conservan tareas largas y recursos observados. No se calcula INP a partir del máximo de treinta clicks ni se declara que se cumple el percentil 75 de usuarios reales. Esta referencia contribuye a CA-23; el criterio completo requiere la comparación tras implementar y comprobar sus presupuestos.

## Comparar después

Repetir `npm run baseline` con las mismas condiciones y conservar ambas carpetas. Comparar los perfiles equivalentes, su primera apertura y las distribuciones con índice cargado. Revisar cambios en CPU, navegador, versiones, red, movimiento y herramienta antes de atribuir una diferencia a la app.

Para bundle, comparar por separado el total del build, los assets JS/CSS declarados en cada HTML y las solicitudes observadas del navegador. El total incluye chunks de otras rutas y de carga diferida. Gzip representa el contenido comprimido, sin cabeceras HTTP; los recursos observados pueden incluirlas y registrar caché. No son magnitudes intercambiables.

La lista de assets declarados incluye scripts externos locales, hojas de estilo, preloads JS/CSS y modulepreloads, sin duplicar archivos. Los imports que ejecuta el runtime pueden añadir descargas que solo se confirman en la captura de recursos del navegador.

Las referencias UI antiguas se archivan para que una futura actualización de snapshots no borre la evidencia disponible. Sus hashes no prueban con qué revisión se capturaron originalmente y no sustituyen las capturas nuevas de la ejecución.

## Fundamento

Se aplicó [Modern Web Guidance: interaction-paint-timing](../tmp/modern-web-guidance/skills/modern-web-guidance/guides/performance/interaction-paint-timing.md): “does not track subsequent asynchronous paints”. Por eso se registra por separado la disponibilidad del diálogo, la llegada de resultados y la navegación, sin confundirlas con respuesta hasta el siguiente frame.

Las APIs opcionales se detectan mediante `PerformanceObserver.supportedEntryTypes`. Referencias: [PerformanceEventTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming), [CDPSession de Playwright](https://playwright.dev/docs/api/class-cdpsession) y [emulación de CPU de Chromium](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setCPUThrottlingRate).
