# Aceptación de práctica — punto 8

Estado: **partial**. Modo: full.

Fuente: `1aa4fd443d3509b263fa0fc9616099f7773839f46e29ffebcc3fcc73e00ed963`. Inicio: 2026-11-15T01:37:54.068Z.

Los tiempos son un proxy de laboratorio DOM + siguiente rAF. No son INP de campo. La carga fría y la ejecución se registran por separado.

## Comprobaciones

- 01-código: passed (01-código.log).
- 02-tipos-app: passed (02-tipos-app.log).
- 03-tipos-pruebas: passed (03-tipos-pruebas.log).
- 04-build: passed (04-build.log).
- 05-runtime: passed (verification.json).

## Rendimiento

| Tamaño | Perfil | Acción | Muestras | p95 ms | Límite ms | Estado |
| --- | --- | --- | ---: | ---: | ---: | --- |
| laptop | sql-sqlite | open | 30 | 32.70 | 100 | met |
| laptop | sql-sqlite | close | 30 | 32.80 | 100 | met |
| laptop | sql-sqlite | write | 30 | 22.40 | 100 | met |
| laptop | sql-sqlite | completionKeyword | 30 | 83.90 | 100 | met |
| laptop | sql-sqlite | completionColumns | 30 | 83.30 | 100 | met |
| laptop | sql-sqlite | context | 30 | 32.30 | 100 | met |
| laptop | python-pandas | open | 30 | 32.60 | 100 | met |
| laptop | python-pandas | close | 30 | 33.10 | 100 | met |
| laptop | python-pandas | write | 30 | 22.30 | 100 | met |
| laptop | python-pandas | completionKeyword | 30 | 87.50 | 300 | met |
| laptop | python-pandas | completionColumns | 30 | 82.40 | 300 | met |
| laptop | python-pandas | context | 30 | 32.80 | 100 | met |
| celular | sql-sqlite | open | 30 | 32.00 | 100 | met |
| celular | sql-sqlite | close | 30 | 32.40 | 100 | met |
| celular | sql-sqlite | write | 30 | 30.70 | 100 | met |
| celular | sql-sqlite | completionKeyword | 30 | 84.50 | 100 | met |
| celular | sql-sqlite | completionColumns | 30 | 84.40 | 100 | met |
| celular | sql-sqlite | context | 30 | 93.30 | 100 | met |
| celular | python-pandas | open | 30 | 31.50 | 100 | met |
| celular | python-pandas | close | 30 | 31.30 | 100 | met |
| celular | python-pandas | write | 30 | 30.20 | 100 | met |
| celular | python-pandas | completionKeyword | 30 | 93.00 | 300 | met |
| celular | python-pandas | completionColumns | 30 | 86.00 | 300 | met |
| celular | python-pandas | context | 30 | 100.60 | 100 | exceeded |

Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).

La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.

## Criterios

| ID | Criterio | Evidencia ejecutada |
| --- | --- | --- |

Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.

## Revisión y límites

Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.


Fallo en 06-mediciones:

```text
Mediciones incompletas, presupuesto excedido o reproducción de traza fallida. Consultar measurements.json y verification.json
```
