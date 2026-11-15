# Aceptación de práctica — punto 8

Estado: **ui-only-complete**. Modo: ui-only.

Fuente: `eab186a5744af50b4a3c666c577f6c964748c782b0a24d84ccf07b07d0c6cf46`. Inicio: 2026-11-15T02:09:04.909Z.

Los tiempos son un proxy de laboratorio DOM + siguiente rAF. No son INP de campo. La carga fría y la ejecución se registran por separado.

## Comprobaciones

- 01-código: passed (01-código.log).
- 02-tipos-app: passed (02-tipos-app.log).
- 03-tipos-pruebas: passed (03-tipos-pruebas.log).
- 04-build: passed (04-build.log).
- 05-runtime: passed (verification.json).
- 08-UI-sin-actualizar-referencias: passed (08-UI-sin-actualizar-referencias.log).

## Rendimiento

| Tamaño | Perfil | Acción | Muestras | p95 ms | Límite ms | Estado |
| --- | --- | --- | ---: | ---: | ---: | --- |

Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).

La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.

## Criterios

| ID | Criterio | Evidencia ejecutada |
| --- | --- | --- |
| PA-01 | Contexto habilitado | verified; 9 casos de código y 7 UI. |
| PA-02 | Workspaces por herramienta | verified; 26 casos de código y 7 UI. |
| PA-03 | Cambio abierto y colapsado | verified; 26 casos de código y 7 UI. |
| PA-04 | Cargas tardías y reintento | verified; 26 casos de código y 7 UI. |
| PA-05 | Persistencia de borradores | verified; 6 casos de código y 7 UI. |
| PA-06 | Ejemplos y revisión anterior | verified; 10 casos de código y 7 UI. |
| PA-07 | Miniapunte pandas | verified; 8 casos de código y 7 UI. |
| PA-08 | Ocho ejemplos SQL | verified; 10 casos de código y 7 UI. |
| PA-09 | Dataset común tipado | verified; 8 casos de código y 7 UI. |
| PA-10 | Mutación y reinicio | verified; 10 casos de código y 7 UI. |
| PA-11 | Completado SQL | verified; 2 casos de código y 7 UI. |
| PA-12 | Completado pandas/Jedi | verified; 10 casos de código y 7 UI. |
| PA-13 | Respuestas de sugerencias obsoletas | verified; 3 casos de código y 7 UI. |
| PA-14 | Éxito, error, timeout y cancelación | verified; 26 casos de código y 7 UI. |
| PA-15 | Detener conserva edición | verified; 26 casos de código y 7 UI. |
| PA-16 | Identidad de respuestas | verified; 6 casos de código y 7 UI. |
| PA-17 | Salidas seguras y acotadas | verified; 6 casos de código y 7 UI. |
| PA-18 | Extensibilidad mediante contrato | verified; 9 casos de código y 0 UI. |
| PA-19 | Perfil futuro sin ejecución ficticia | verified; 7 casos de código y 0 UI. |
| PA-20 | Diálogo único y foco | verified; 7 casos de código y 7 UI. |
| PA-21 | Scroll independiente | verified; 7 casos de código y 4 UI. |
| PA-22 | Adaptación y accesibilidad | verified; 7 casos de código y 7 UI. |
| PA-23 | Almacenamiento no disponible o corrupto | verified; 6 casos de código y 7 UI. |
| PA-24 | Carga diferida y liberación | verified; 26 casos de código y 7 UI. |
| PA-25 | Rendimiento y bundle | pending; 8 casos de código y 0 UI. |
| PA-26 | Aislamiento entre orígenes | verified; 3 casos de código y 7 UI. |
| PA-27 | Regresión global y capturas | verified; 7 casos de código y 7 UI. |

Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.

## Revisión y límites

Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.

- Modo UI: no mide rendimiento ni repite otros navegadores. Se necesita evidencia compatible separada para cerrar la aceptación global.
