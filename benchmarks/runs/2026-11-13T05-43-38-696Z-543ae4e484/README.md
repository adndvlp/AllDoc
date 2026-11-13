# Referencia previa al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `543ae4e484a129c91f0976155ee140eae180bbf8a32637d358a036f20638ebb6`.  
**Inicio:** 2026-11-13T05:43:38.696Z.  
**Build:** complete. **Navegador:** failed.

Esta ejecución registra el punto 1 del SDD. No modifica el diseño de la app. Los datos completos y las condiciones están en [report.json](report.json).

## Bundle de producción

Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.

| Conjunto | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JS total | 23 | 605939 | 198248 |
| CSS total | 1 | 103683 | 20886 |
| HTML total | 10 | 204429 | 51623 |

| Página | JS inicial gzip | CSS inicial gzip |
| --- | ---: | ---: |
| 404.html | 158281 | 20886 |
| apuntes/analisis-de-datos/sql/comentarios.html | 158281 | 20886 |
| apuntes/analisis-de-datos/sql/limit.html | 158281 | 20886 |
| apuntes/analisis-de-datos/sql/order-by.html | 158281 | 20886 |
| apuntes/analisis-de-datos/sql/select.html | 158281 | 20886 |
| apuntes/analisis-de-datos/sql/where.html | 158281 | 20886 |
| apuntes/analisis-de-datos.html | 158281 | 20886 |
| apuntes/desarrollo-web.html | 158281 | 20886 |
| apuntes/ia.html | 158281 | 20886 |
| index.html | 158281 | 20886 |

Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


35 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: no aplicable porque la función todavía no existe.

## Pendientes de esta ejecución

- screenshots-celular-pequeno: locator.click: Timeout 30000ms exceeded. Call log: [2m  - waiting for locator('summary[aria-label^="Elegir color de texto:"]')[22m [2m    - locator resolved to <summary class="trigger_RSH8" aria-label="Elegir color de texto: Azul">…</summary>[22m [2m  - attempting click action[22m [2m    2 × waiting for element to be visible, enabled and stable[22m [2m      - element is visible, enabled and stable[22m [2m      - scrolling into view if needed[22m [2m      - done scrolling[22m [2m      - <div class="inputRow__8EZ">…</div> from <div class="search_Jr_l">…</div> subtree intercepts pointer events[22m [2m    - retrying click action[22m [2m    - waiting 20ms[22m [2m    2 × waiting for element to be visible, enabled and stable[22m [2m      - element is visible, enabled and stable[22m [2m      - scrolling into view if needed[22m [2m      - done scrolling[22m [2m      - <div class="inputRow__8EZ">…</div> from <div class="search_Jr_l">…</div> subtree intercepts pointer events[22m [2m    - retrying click action[22m [2m      - waiting 100ms[22m [2m    58 × waiting for element to be visible, enabled and stable[22m [2m       - element is visible, enabled and st

Una ejecución parcial conserva evidencia válida de las etapas terminadas y no acredita las que faltan. Para obtener una ejecución completa, ejecutar `npm run baseline` en un entorno que pueda iniciar Chromium.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
