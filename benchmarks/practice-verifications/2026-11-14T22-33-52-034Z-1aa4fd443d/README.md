# Aceptación de práctica — punto 8

Estado: **code-only-complete**. Modo: code-only.

Fuente: `1aa4fd443d3509b263fa0fc9616099f7773839f46e29ffebcc3fcc73e00ed963`. Inicio: 2026-11-14T22:33:52.034Z.

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

Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).

La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.

## Criterios

| ID | Criterio | Evidencia ejecutada |
| --- | --- | --- |
| PA-01 | Contexto habilitado | pending; 9 casos de código y 0 UI. |
| PA-02 | Workspaces por herramienta | pending; 22 casos de código y 0 UI. |
| PA-03 | Cambio abierto y colapsado | pending; 22 casos de código y 0 UI. |
| PA-04 | Cargas tardías y reintento | pending; 22 casos de código y 0 UI. |
| PA-05 | Persistencia de borradores | pending; 6 casos de código y 0 UI. |
| PA-06 | Ejemplos y revisión anterior | pending; 10 casos de código y 0 UI. |
| PA-07 | Miniapunte pandas | pending; 8 casos de código y 0 UI. |
| PA-08 | Ocho ejemplos SQL | pending; 10 casos de código y 0 UI. |
| PA-09 | Dataset común tipado | pending; 8 casos de código y 0 UI. |
| PA-10 | Mutación y reinicio | pending; 10 casos de código y 0 UI. |
| PA-11 | Completado SQL | pending; 2 casos de código y 0 UI. |
| PA-12 | Completado pandas/Jedi | pending; 10 casos de código y 0 UI. |
| PA-13 | Respuestas de sugerencias obsoletas | pending; 3 casos de código y 0 UI. |
| PA-14 | Éxito, error, timeout y cancelación | pending; 22 casos de código y 0 UI. |
| PA-15 | Detener conserva edición | pending; 22 casos de código y 0 UI. |
| PA-16 | Identidad de respuestas | pending; 6 casos de código y 0 UI. |
| PA-17 | Salidas seguras y acotadas | pending; 6 casos de código y 0 UI. |
| PA-18 | Extensibilidad mediante contrato | verified; 9 casos de código y 0 UI. |
| PA-19 | Perfil futuro sin ejecución ficticia | verified; 7 casos de código y 0 UI. |
| PA-20 | Diálogo único y foco | pending; 7 casos de código y 0 UI. |
| PA-21 | Scroll independiente | pending; 7 casos de código y 0 UI. |
| PA-22 | Adaptación y accesibilidad | pending; 7 casos de código y 0 UI. |
| PA-23 | Almacenamiento no disponible o corrupto | pending; 6 casos de código y 0 UI. |
| PA-24 | Carga diferida y liberación | pending; 22 casos de código y 0 UI. |
| PA-25 | Rendimiento y bundle | pending; 8 casos de código y 0 UI. |
| PA-26 | Aislamiento entre orígenes | pending; 3 casos de código y 0 UI. |
| PA-27 | Regresión global y capturas | pending; 7 casos de código y 0 UI. |

Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.

## Revisión y límites

Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.

- Modo código: no se abrieron puertos ni navegadores. No acredita tiempos, interacción o capturas.
