# Comparación del rediseño

Estado: **complete**.

Referencia: /Users/andresitopacheco/Desktop/workspace/Projects/AllDoc/benchmarks/runs/2026-11-13T05-50-13-968Z-543ae4e484. Medición posterior: /Users/andresitopacheco/Desktop/workspace/Projects/AllDoc/benchmarks/runs/2026-11-14T00-03-39-837Z-14f3739c0a.

El presupuesto de 100 ms se evalúa con el mismo proxy DOM + siguiente rAF de la referencia. No es INP de campo ni una medición exacta de píxeles presentados.

## Bundle

Bytes gzip por archivo. El total del build y los assets declarados en HTML se comparan por separado.

| Conjunto | Antes | Después | Diferencia | Cambio |
| --- | ---: | ---: | ---: | ---: |
| JS total | 198248 | 201730 | 3482 | 1.76% |
| CSS total | 20886 | 21063 | 177 | 0.85% |
| 404.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| 404.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos/sql/comentarios.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos/sql/comentarios.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos/sql/limit.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos/sql/limit.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos/sql/order-by.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos/sql/order-by.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos/sql/select.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos/sql/select.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos/sql/where.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos/sql/where.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/analisis-de-datos.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/analisis-de-datos.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/desarrollo-web.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/desarrollo-web.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| apuntes/ia.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| apuntes/ia.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |
| index.html: JS declarado | 158281 | 154901 | -3380 | -2.14% |
| index.html: CSS declarado | 20886 | 21063 | 177 | 0.85% |

## Interacciones

| Perfil | Acción | Muestras | p95 antes (ms) | p95 después (ms) | Presupuesto | Sin Event Timing |
| --- | --- | ---: | ---: | ---: | --- | ---: |
| laptop | warmSearchOpen | 30 | 32.10 | 32.00 | met | 0 |
| laptop | warmSearchResults | 30 | 32.10 | 32.00 | met | 0 |
| laptop | typeW | 30 | 26.20 | 20.10 | met | 27 |
| laptop | navigateToWhere | 30 | 33.20 | 35.30 | met | 0 |
| laptop | toggleSql | 30 | 32.40 | 33.00 | met | 0 |
| laptop | toggleFavorite | 30 | N/D | 33.00 | met | 0 |
| celular | warmSearchOpen | 30 | 30.90 | 31.60 | met | 0 |
| celular | warmSearchResults | 30 | 30.90 | 31.60 | met | 0 |
| celular | typeW | 30 | 31.40 | 17.90 | met | 27 |
| celular | navigateToWhere | 30 | 52.70 | 54.00 | met | 0 |
| celular | toggleSql | 30 | 31.60 | 31.30 | met | 0 |
| celular | toggleFavorite | 30 | N/D | 30.80 | met | 0 |

Favoritos se mide por primera vez: no se inventa una diferencia contra una función ausente en la referencia. Los resultados de búsqueda con índice cargado reutilizan las mismas 30 aperturas; no son muestras independientes adicionales.

## Primera apertura

| Perfil | Diálogo antes | Diálogo después | Resultados antes | Resultados después |
| --- | ---: | ---: | ---: | ---: |
| laptop | 36.40 | 35.00 | 64.70 | 48.00 |
| celular | 62.60 | 100.80 | 97.50 | 136.40 |

Cada apertura fría es una muestra única; no tiene percentiles. Las entradas Event Timing ausentes conservan su falta de cobertura y no se sustituyen por cero.

## Condiciones y pendientes

Las condiciones de equipo, navegador, CPU, viewport, caché y red coinciden para las acciones compartidas.
- La herramienta cambió: revisar el diff y conservar el método de las acciones comunes.
- celular: 1 tareas de más de 50 ms; revisar su fase y trazas antes de atribuirlas al nuevo código.

Las tareas de más de 50 ms se conservan con su fase. Cuando hay una traza de diagnóstico, corresponde a una reproducción separada después de medir, para no alterar la comparación con la referencia sin tracing. Revisar antes de atribuir una tarea al código nuevo.
