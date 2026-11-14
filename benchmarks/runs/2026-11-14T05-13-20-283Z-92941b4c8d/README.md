# Medición posterior al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `92941b4c8d7bd75022c9b0d3793d27e705975980c3eb2db2c0b03cac7d47781c`.  
**Inicio:** 2026-11-14T05:13:20.283Z.  
**Build:** complete. **Navegador:** not-requested.

Esta ejecución contribuye al punto 8 del SDD. Comparar con la referencia inicial; no sobrescribe ejecuciones anteriores. Condiciones en [report.json](report.json).

## Bundle de producción

Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.

| Conjunto | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JS total | 29 | 630057 | 208659 |
| CSS total | 1 | 105773 | 21120 |
| HTML total | 11 | 312070 | 79540 |

| Página | JS inicial gzip | CSS inicial gzip |
| --- | ---: | ---: |
| 404.html | 156177 | 21120 |
| apuntes/analisis-de-datos/pandas/dataframe.html | 156177 | 21120 |
| apuntes/analisis-de-datos/sql/comentarios.html | 156177 | 21120 |
| apuntes/analisis-de-datos/sql/limit.html | 156177 | 21120 |
| apuntes/analisis-de-datos/sql/order-by.html | 156177 | 21120 |
| apuntes/analisis-de-datos/sql/select.html | 156177 | 21120 |
| apuntes/analisis-de-datos/sql/where.html | 156177 | 21120 |
| apuntes/analisis-de-datos.html | 156177 | 21120 |
| apuntes/desarrollo-web.html | 156177 | 21120 |
| apuntes/ia.html | 156177 | 21120 |
| index.html | 156177 | 21120 |

Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


88 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: 15 altas y 15 bajas por perfil; no existe referencia previa de esta función.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
