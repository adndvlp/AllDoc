# Aceptación Firefox/WebKit — punto 5

Estado: **partial**. Modo: full.

Fuente: `5d2023cce70b83c736dfc1e2f7a0351d35d3fe81dbaf39c2482b7a75aadee435`.

## Comprobaciones

| Fase | Estado |
| --- | --- |
| space | passed |
| preflight | passed |
| native | passed |
| typesApp | passed |
| typesTests | passed |
| buildApp | passed |
| runtime | passed |
| discovery-visual | passed |
| assessment-visual | passed |
| suite-visual | passed |
| discovery-functional | passed |
| assessment-functional | passed |
| suite-functional | passed |
| discovery-chromium | passed |

## Criterios

| ID | Criterio | Estado |
| --- | --- | --- |
| CA-01 | Motores requeridos iniciados y versionados | passed |
| CA-02 | Seis proyectos y configuración efectiva de la matriz | passed |
| CA-03 | CB-01 a CB-20 completos según alcance | passed |
| CA-04 | Ejecución real SQL y pandas | passed |
| CA-05 | Edición, sugerencias, estado y recuperación | passed |
| CA-06 | Navegación, diálogos, foco, scroll y adaptación | passed |
| CA-07 | Aislamiento y entrega de producción | passed |
| CA-08 | Referencias aprobadas comparadas sin actualización | pending |
| CA-09 | Regresión Chromium y referencias conservadas | pending |
| CA-10 | Código, tipos, build y herramientas aprobados con TDD | passed |
| CA-11 | Procedencia, invariantes y progreso | pending |
| CA-12 | Alcance sin atribuir hardware físico ni Safari comercial | passed |

[Datos completos](verification.json). Resultados originales y descubrimiento están en los subdirectorios de cada suite.

Se conservan las omisiones previstas de Chromium como omisiones. Ninguna referencia se actualiza. Se prueban distribuciones Playwright; no hardware físico, Safari comercial ni INP de campo. No se repiten los benchmarks de rendimiento del producto sin cambios.

Fallo en suite-chromium: Caso Chromium sin aprobación estricta: escritorio/portada: catálogo completo contraído, despliegues independientes y navegación directa a un concepto
