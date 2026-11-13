# Referencia previa al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `543ae4e484a129c91f0976155ee140eae180bbf8a32637d358a036f20638ebb6`.  
**Inicio:** 2026-11-13T05:45:32.409Z.  
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

5 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.

- celular-pequeno: [inicio](screenshots/celular-pequeno/inicio.png) · [select](screenshots/celular-pequeno/select.png) · [comentarios](screenshots/celular-pequeno/comentarios.png) · [menu](screenshots/celular-pequeno/menu.png) · [buscador](screenshots/celular-pequeno/buscador.png) · [color-texto](screenshots/celular-pequeno/color-texto.png)
- celular: [inicio](screenshots/celular/inicio.png) · [select](screenshots/celular/select.png) · [comentarios](screenshots/celular/comentarios.png) · [menu](screenshots/celular/menu.png) · [buscador](screenshots/celular/buscador.png) · [color-texto](screenshots/celular/color-texto.png)
- celular-horizontal: [inicio](screenshots/celular-horizontal/inicio.png) · [select](screenshots/celular-horizontal/select.png) · [comentarios](screenshots/celular-horizontal/comentarios.png) · [menu](screenshots/celular-horizontal/menu.png) · [buscador](screenshots/celular-horizontal/buscador.png) · [color-texto](screenshots/celular-horizontal/color-texto.png)
- ipad: [inicio](screenshots/ipad/inicio.png) · [select](screenshots/ipad/select.png) · [comentarios](screenshots/ipad/comentarios.png) · [menu](screenshots/ipad/menu.png) · [buscador](screenshots/ipad/buscador.png) · [color-texto](screenshots/ipad/color-texto.png)
- ipad-horizontal: [inicio](screenshots/ipad-horizontal/inicio.png) · [select](screenshots/ipad-horizontal/select.png) · [comentarios](screenshots/ipad-horizontal/comentarios.png) · [menu](screenshots/ipad-horizontal/menu.png) · [buscador](screenshots/ipad-horizontal/buscador.png) · [color-texto](screenshots/ipad-horizontal/color-texto.png)

35 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: no aplicable porque la función todavía no existe.

## Pendientes de esta ejecución

- screenshots-laptop: locator.click: Timeout 30000ms exceeded. Call log: [2m  - waiting for locator('.theme-doc-sidebar-container .theme-doc-sidebar-menu').getByRole('button', { name: 'Pandas', exact: true })[22m 

Una ejecución parcial conserva evidencia válida de las etapas terminadas y no acredita las que faltan. Para obtener una ejecución completa, ejecutar `npm run baseline` en un entorno que pueda iniciar Chromium.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
