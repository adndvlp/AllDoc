# Medición posterior al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `f18e0e6d66bfef1656ee18be891a23d228d2506607cf44e3868e4b4b629db451`.  
**Inicio:** 2026-11-13T23:45:36.842Z.  
**Build:** complete. **Navegador:** not-requested.

Esta ejecución contribuye al punto 8 del SDD. Comparar con la referencia inicial; no sobrescribe ejecuciones anteriores. Condiciones en [report.json](report.json).

## Bundle de producción

Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.

| Conjunto | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JS total | 24 | 611574 | 201448 |
| CSS total | 1 | 105402 | 21063 |
| HTML total | 10 | 281600 | 72889 |

| Página | JS inicial gzip | CSS inicial gzip |
| --- | ---: | ---: |
| 404.html | 154842 | 21063 |
| apuntes/analisis-de-datos/sql/comentarios.html | 154842 | 21063 |
| apuntes/analisis-de-datos/sql/limit.html | 154842 | 21063 |
| apuntes/analisis-de-datos/sql/order-by.html | 154842 | 21063 |
| apuntes/analisis-de-datos/sql/select.html | 154842 | 21063 |
| apuntes/analisis-de-datos/sql/where.html | 154842 | 21063 |
| apuntes/analisis-de-datos.html | 154842 | 21063 |
| apuntes/desarrollo-web.html | 154842 | 21063 |
| apuntes/ia.html | 154842 | 21063 |
| index.html | 154842 | 21063 |

Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


88 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: 15 altas y 15 bajas por perfil; no existe referencia previa de esta función.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
