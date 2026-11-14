# Referencia de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `ef2041a80bd56cf7ad84577125be527a73de8f9d20710a18021e27bead16ee25`.  
**Inicio:** 2026-11-14T10:02:25.794Z.  
**Build:** complete. **Navegador:** not-requested.

Esta ejecución registra una referencia. No modifica el diseño de la app. Los datos completos y las condiciones están en [report.json](report.json).

## Bundle de producción

Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.

| Conjunto | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JS total | 44 | 1177612 | 394721 |
| CSS total | 1 | 111604 | 22358 |
| HTML total | 11 | 318450 | 81594 |

| Página | JS inicial gzip | CSS inicial gzip |
| --- | ---: | ---: |
| 404.html | 159440 | 22358 |
| apuntes/analisis-de-datos/pandas/dataframe.html | 159440 | 22358 |
| apuntes/analisis-de-datos/sql/comentarios.html | 159440 | 22358 |
| apuntes/analisis-de-datos/sql/limit.html | 159440 | 22358 |
| apuntes/analisis-de-datos/sql/order-by.html | 159440 | 22358 |
| apuntes/analisis-de-datos/sql/select.html | 159440 | 22358 |
| apuntes/analisis-de-datos/sql/where.html | 159440 | 22358 |
| apuntes/analisis-de-datos.html | 159440 | 22358 |
| apuntes/desarrollo-web.html | 159440 | 22358 |
| apuntes/ia.html | 159440 | 22358 |
| index.html | 159440 | 22358 |

Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


145 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Este modo no mide favoritos; usar --post-redesign para incluirlos.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
