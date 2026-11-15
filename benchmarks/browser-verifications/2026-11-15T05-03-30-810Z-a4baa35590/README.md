# Firefox/WebKit — matriz funcional

Estado: **matrix-ready-for-review**.

Matriz funcional Firefox/WebKit. Las referencias visuales y aceptación consolidada corresponden a los puntos 4 y 5.

Fuente: `a4baa3559048a59580da4756d33a071040afe2f8e041b1c4235fe2d9b6bb0527`. Playwright: 1.65.1.

| Proyecto | Caso | Estado | Duración ms |
| --- | --- | --- | ---: |
| webkit-estrecho | APP-01 | passed | 4115 |
| webkit-tableta | APP-01 | passed | 2988 |
| webkit-escritorio | APP-01 | passed | 2712 |
| webkit-estrecho | APP-02 | passed | 2852 |
| webkit-tableta | APP-02 | passed | 1425 |
| webkit-escritorio | APP-02 | passed | 1382 |
| webkit-estrecho | APP-03 | passed | 2067 |
| webkit-tableta | APP-03 | passed | 1851 |
| webkit-escritorio | APP-03 | passed | 1917 |
| webkit-estrecho | APP-04 | passed | 2311 |
| webkit-tableta | APP-04 | passed | 2307 |
| webkit-escritorio | APP-04 | passed | 2308 |
| webkit-estrecho | APP-05 | passed | 2989 |
| webkit-tableta | APP-05 | passed | 3108 |
| webkit-escritorio | APP-05 | passed | 3550 |
| webkit-estrecho | APP-06 | passed | 1628 |
| webkit-tableta | APP-06 | passed | 1515 |
| webkit-escritorio | APP-06 | passed | 1880 |
| webkit-estrecho | SQL-01 | passed | 2147 |
| webkit-tableta | SQL-01 | passed | 2130 |
| webkit-escritorio | SQL-01 | passed | 2506 |
| webkit-estrecho | SQL-02 | passed | 1577 |
| webkit-tableta | SQL-02 | passed | 1802 |
| webkit-escritorio | SQL-02 | passed | 2128 |
| webkit-estrecho | SQL-03 | passed | 2141 |
| webkit-tableta | SQL-03 | passed | 2260 |
| webkit-escritorio | SQL-03 | passed | 2561 |
| webkit-estrecho | SQL-04 | passed | 1994 |
| webkit-tableta | SQL-04 | passed | 2142 |
| webkit-escritorio | SQL-04 | passed | 2534 |
| webkit-escritorio | SQL-05 | passed | 1808 |
| webkit-estrecho | PY-01 | passed | 9503 |
| webkit-tableta | PY-01 | passed | 10926 |
| webkit-escritorio | PY-01 | passed | 11247 |
| webkit-estrecho | PY-02 | passed | 9222 |
| webkit-tableta | PY-02 | passed | 10158 |
| webkit-escritorio | PY-02 | passed | 10541 |
| webkit-estrecho | PY-03 | passed | 9874 |
| webkit-tableta | PY-03 | passed | 11823 |
| webkit-escritorio | PY-03 | passed | 13902 |
| webkit-estrecho | PY-04 | passed | 10432 |
| webkit-tableta | PY-04 | passed | 11060 |
| webkit-escritorio | PY-04 | passed | 13433 |
| webkit-escritorio | PY-05 | passed | 13636 |
| webkit-estrecho | FLOW-01 | passed | 18998 |
| webkit-tableta | FLOW-01 | passed | 24203 |
| webkit-escritorio | FLOW-01 | passed | 22128 |
| webkit-estrecho | FLOW-02 | passed | 1715 |
| webkit-tableta | FLOW-02 | passed | 3088 |
| webkit-escritorio | FLOW-02 | passed | 2222 |
| webkit-estrecho | SQL-06 | passed | 2195 |
| webkit-tableta | SQL-06 | passed | 2419 |
| webkit-escritorio | SQL-06 | passed | 2299 |
| webkit-estrecho | SQL-07 | passed | 3465 |
| webkit-tableta | SQL-07 | passed | 3931 |
| webkit-escritorio | SQL-07 | passed | 3784 |
| webkit-estrecho | SQL-08 | passed | 1455 |
| webkit-tableta | SQL-08 | passed | 1742 |
| webkit-escritorio | SQL-08 | passed | 1564 |
| webkit-estrecho | SQL-09 | passed | 1352 |
| webkit-tableta | SQL-09 | passed | 1718 |
| webkit-escritorio | SQL-09 | passed | 1500 |
| webkit-estrecho | PY-06 | passed | 18695 |
| webkit-tableta | PY-06 | passed | 20496 |
| webkit-escritorio | PY-06 | passed | 19927 |
| webkit-estrecho | PY-07 | passed | 20786 |
| webkit-tableta | PY-07 | passed | 20381 |
| webkit-escritorio | PY-07 | passed | 20738 |
| webkit-estrecho | PY-08 | passed | 11155 |
| webkit-tableta | PY-08 | passed | 10360 |
| webkit-escritorio | PY-08 | passed | 10308 |
| webkit-estrecho | PY-09 | passed | 10609 |
| webkit-tableta | PY-09 | passed | 9289 |
| webkit-escritorio | PY-09 | passed | 9267 |
| webkit-escritorio | ERR-01 | passed | 3524 |
| webkit-escritorio | ERR-02 | passed | 2859 |
| webkit-escritorio | SQL-10 | passed | 4691 |
| webkit-escritorio | SQL-11 | passed | 12153 |
| webkit-escritorio | SQL-12 | passed | 2580 |
| webkit-escritorio | SQL-13 | passed | 2426 |
| webkit-escritorio | PY-10 | passed | 19497 |
| webkit-escritorio | PY-11 | passed | 29494 |
| webkit-escritorio | PY-12 | passed | 11443 |
| webkit-escritorio | PY-13 | passed | 12975 |

Casos originales: results.json. Configuración, invariantes y versiones: [verification.json](verification.json).

Las capturas adjuntas son diagnóstico, sin crear ni actualizar referencias. La revisión del punto 3 se registra aparte.

Revisión completada: estos 84 casos de WebKit se reúnen con 84 casos de Firefox de ejecuciones compatibles para cerrar el punto 3. La [evidencia y procedencia de los 168 casos](../../../specs/verification/browser-point-3.md) conserva los informes originales y la diferencia de herramienta revisada. El estado original de esta ejecución no se altera.

## Evidencia por requisito

Se contrasta con el catálogo completo. Los casos no seleccionados permanecen incompletos; un filtro no acredita la matriz.

| Proyecto | Requisito | Estado | Casos aprobados / requeridos |
| --- | --- | --- | --- |
| webkit-estrecho | CB-01 | passed | 1 / 1 |
| webkit-estrecho | CB-02 | passed | 1 / 1 |
| webkit-estrecho | CB-03 | passed | 1 / 1 |
| webkit-estrecho | CB-04 | passed | 1 / 1 |
| webkit-estrecho | CB-05 | passed | 1 / 1 |
| webkit-estrecho | CB-06 | passed | 2 / 2 |
| webkit-estrecho | CB-07 | passed | 2 / 2 |
| webkit-estrecho | CB-08 | passed | 2 / 2 |
| webkit-estrecho | CB-09 | passed | 2 / 2 |
| webkit-estrecho | CB-10 | passed | 2 / 2 |
| webkit-estrecho | CB-11 | passed | 2 / 2 |
| webkit-estrecho | CB-12 | passed | 1 / 1 |
| webkit-estrecho | CB-13 | passed | 2 / 2 |
| webkit-estrecho | CB-14 | not-applicable | 0 / 0 |
| webkit-estrecho | CB-15 | passed | 4 / 4 |
| webkit-estrecho | CB-16 | passed | 2 / 2 |
| webkit-estrecho | CB-17 | passed | 2 / 2 |
| webkit-estrecho | CB-18 | passed | 1 / 1 |
| webkit-estrecho | CB-19 | passed | 2 / 2 |
| webkit-estrecho | CB-20 | not-applicable | 0 / 0 |
| webkit-tableta | CB-01 | passed | 1 / 1 |
| webkit-tableta | CB-02 | passed | 1 / 1 |
| webkit-tableta | CB-03 | passed | 1 / 1 |
| webkit-tableta | CB-04 | passed | 1 / 1 |
| webkit-tableta | CB-05 | passed | 1 / 1 |
| webkit-tableta | CB-06 | passed | 2 / 2 |
| webkit-tableta | CB-07 | passed | 2 / 2 |
| webkit-tableta | CB-08 | passed | 2 / 2 |
| webkit-tableta | CB-09 | passed | 2 / 2 |
| webkit-tableta | CB-10 | passed | 2 / 2 |
| webkit-tableta | CB-11 | passed | 2 / 2 |
| webkit-tableta | CB-12 | passed | 1 / 1 |
| webkit-tableta | CB-13 | passed | 2 / 2 |
| webkit-tableta | CB-14 | not-applicable | 0 / 0 |
| webkit-tableta | CB-15 | passed | 4 / 4 |
| webkit-tableta | CB-16 | passed | 2 / 2 |
| webkit-tableta | CB-17 | passed | 2 / 2 |
| webkit-tableta | CB-18 | passed | 1 / 1 |
| webkit-tableta | CB-19 | passed | 2 / 2 |
| webkit-tableta | CB-20 | not-applicable | 0 / 0 |
| webkit-escritorio | CB-01 | passed | 1 / 1 |
| webkit-escritorio | CB-02 | passed | 1 / 1 |
| webkit-escritorio | CB-03 | passed | 1 / 1 |
| webkit-escritorio | CB-04 | passed | 1 / 1 |
| webkit-escritorio | CB-05 | passed | 1 / 1 |
| webkit-escritorio | CB-06 | passed | 2 / 2 |
| webkit-escritorio | CB-07 | passed | 4 / 4 |
| webkit-escritorio | CB-08 | passed | 2 / 2 |
| webkit-escritorio | CB-09 | passed | 2 / 2 |
| webkit-escritorio | CB-10 | passed | 2 / 2 |
| webkit-escritorio | CB-11 | passed | 2 / 2 |
| webkit-escritorio | CB-12 | passed | 1 / 1 |
| webkit-escritorio | CB-13 | passed | 2 / 2 |
| webkit-escritorio | CB-14 | passed | 4 / 4 |
| webkit-escritorio | CB-15 | passed | 6 / 6 |
| webkit-escritorio | CB-16 | passed | 2 / 2 |
| webkit-escritorio | CB-17 | passed | 2 / 2 |
| webkit-escritorio | CB-18 | passed | 1 / 1 |
| webkit-escritorio | CB-19 | passed | 3 / 3 |
| webkit-escritorio | CB-20 | passed | 6 / 6 |
