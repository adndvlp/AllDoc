# Medición posterior al rediseño de AllDoc

**Estado:** partial.  
**Fuente SHA-256:** `14f3739c0a2d727b772ce6e5f1f65123a3b068b3dfb56ab5161ea88022aeade2`.  
**Inicio:** 2026-11-14T04:24:34.687Z.  
**Build:** complete. **Navegador:** not-run.

Esta ejecución contribuye al punto 8 del SDD. Comparar con la referencia inicial; no sobrescribe ejecuciones anteriores. Condiciones en [report.json](report.json).

## Bundle de producción

Bytes por archivo, sin cabeceras HTTP; gzip nivel 9. El total del build incluye chunks diferidos y no equivale a la descarga inicial.

| Conjunto | Archivos | Bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| JS total | 25 | 611931 | 201730 |
| CSS total | 1 | 105402 | 21063 |
| HTML total | 10 | 281600 | 72894 |

| Página | JS inicial gzip | CSS inicial gzip |
| --- | ---: | ---: |
| 404.html | 154901 | 21063 |
| apuntes/analisis-de-datos/sql/comentarios.html | 154901 | 21063 |
| apuntes/analisis-de-datos/sql/limit.html | 154901 | 21063 |
| apuntes/analisis-de-datos/sql/order-by.html | 154901 | 21063 |
| apuntes/analisis-de-datos/sql/select.html | 154901 | 21063 |
| apuntes/analisis-de-datos/sql/where.html | 154901 | 21063 |
| apuntes/analisis-de-datos.html | 154901 | 21063 |
| apuntes/desarrollo-web.html | 154901 | 21063 |
| apuntes/ia.html | 154901 | 21063 |
| index.html | 154901 | 21063 |

Los iniciales de esta tabla son referencias externas declaradas en el HTML. Las solicitudes observadas en navegador, cuando están disponibles, se guardan aparte en los JSON de tiempos. Inventario con hashes: [bundle.json](bundle.json).

## Capturas

0 proyectos capturados en esta ejecución. Se esperan 7, con seis estados por proyecto.


88 referencias UI anteriores archivadas en prior-ui-references/. Son copias de archivos existentes, no capturas nuevas de esta fuente.

## Tiempos

El proxy DOM incluye espera hasta rAF y no es INP ni medición de píxeles presentados. Las entradas Event Timing y sus subpartes se guardan solo cuando el navegador las emite. Favoritos: 15 altas y 15 bajas por perfil; no existe referencia previa de esta función.

## Pendientes de esta ejecución

- server: listen EPERM: operation not permitted 127.0.0.1

Una ejecución parcial conserva evidencia válida de las etapas terminadas y no acredita las que faltan. Para obtener una ejecución completa, ejecutar `npm run baseline` en un entorno que pueda iniciar Chromium.

## Reproducción y comparación

Ejecutar `npm run baseline` en el mismo equipo, con versiones, CPU, red y viewport equivalentes y sin otras tareas intensivas. Cada ejecución crea una carpeta nueva. Comparar los perfiles y campos equivalentes; no mezclar el total de JS con la descarga inicial ni el proxy DOM con INP.

Procedimiento: [benchmarks/README.md](../../README.md).
