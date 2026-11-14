# Comparación del rediseño

Estado: **incomplete**.

Referencia: /Users/andresitopacheco/Desktop/workspace/Projects/AllDoc/benchmarks/runs/2026-11-13T05-50-13-968Z-543ae4e484. Medición posterior: /Users/andresitopacheco/Desktop/workspace/Projects/AllDoc/benchmarks/runs/2026-11-13T23-55-02-627Z-14f3739c0a.

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
| laptop | warmSearchOpen | 0 | 32.10 | N/D | pending | 0 |
| laptop | warmSearchResults | 0 | 32.10 | N/D | pending | 0 |
| laptop | typeW | 0 | 26.20 | N/D | pending | 0 |
| laptop | navigateToWhere | 0 | 33.20 | N/D | pending | 0 |
| laptop | toggleSql | 0 | 32.40 | N/D | pending | 0 |
| laptop | toggleFavorite | 0 | N/D | N/D | pending | 0 |
| celular | warmSearchOpen | 0 | 30.90 | N/D | pending | 0 |
| celular | warmSearchResults | 0 | 30.90 | N/D | pending | 0 |
| celular | typeW | 0 | 31.40 | N/D | pending | 0 |
| celular | navigateToWhere | 0 | 52.70 | N/D | pending | 0 |
| celular | toggleSql | 0 | 31.60 | N/D | pending | 0 |
| celular | toggleFavorite | 0 | N/D | N/D | pending | 0 |

Favoritos se mide por primera vez: no se inventa una diferencia contra una función ausente en la referencia. Los resultados de búsqueda con índice cargado reutilizan las mismas 30 aperturas; no son muestras independientes adicionales.

## Primera apertura

| Perfil | Diálogo antes | Diálogo después | Resultados antes | Resultados después |
| --- | ---: | ---: | ---: | ---: |
| laptop | 36.40 | N/D | 64.70 | N/D |
| celular | 62.60 | N/D | 97.50 | N/D |

Cada apertura fría es una muestra única; no tiene percentiles. Las entradas Event Timing ausentes conservan su falta de cobertura y no se sustituyen por cero.

## Condiciones y pendientes

- Ejecución actual incompleta
- Falta navegador: name
- Falta navegador: version
- Perfil incompleto o repetido: laptop
- laptop/warmSearchOpen: faltan 30 muestras válidas y estados equilibrados
- laptop/warmSearchResults: faltan 30 muestras válidas y estados equilibrados
- laptop/typeW: faltan 30 muestras válidas y estados equilibrados
- laptop/navigateToWhere: faltan 30 muestras válidas y estados equilibrados
- laptop/toggleSql: faltan 30 muestras válidas y estados equilibrados
- laptop/toggleFavorite: faltan 30 muestras válidas y estados equilibrados
- Perfil incompleto o repetido: celular
- celular/warmSearchOpen: faltan 30 muestras válidas y estados equilibrados
- celular/warmSearchResults: faltan 30 muestras válidas y estados equilibrados
- celular/typeW: faltan 30 muestras válidas y estados equilibrados
- celular/navigateToWhere: faltan 30 muestras válidas y estados equilibrados
- celular/toggleSql: faltan 30 muestras válidas y estados equilibrados
- celular/toggleFavorite: faltan 30 muestras válidas y estados equilibrados
- laptop: cpuRate distinto
- laptop: viewport distinto
- laptop: reducedMotion distinto
- celular: cpuRate distinto
- celular: viewport distinto
- celular: reducedMotion distinto
- La herramienta cambió: revisar el diff y conservar el método de las acciones comunes.

Las tareas de más de 50 ms se conservan con su fase. Cuando hay una traza de diagnóstico, corresponde a una reproducción separada después de medir, para no alterar la comparación con la referencia sin tracing. Revisar antes de atribuir una tarea al código nuevo.
