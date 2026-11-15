# Firefox/WebKit — matriz funcional

Estado: **subset-ready-for-review**.

Matriz funcional Firefox/WebKit. Las referencias visuales y aceptación consolidada corresponden a los puntos 4 y 5.

Fuente: `a4baa3559048a59580da4756d33a071040afe2f8e041b1c4235fe2d9b6bb0527`. Playwright: 1.65.1.

| Proyecto | Caso | Estado | Duración ms |
| --- | --- | --- | ---: |
| firefox-estrecho | FLOW-01 | passed | 29332 |
| firefox-tableta | FLOW-01 | passed | 26899 |
| firefox-escritorio | FLOW-01 | passed | 30733 |
| webkit-estrecho | FLOW-01 | passed | 20413 |
| webkit-tableta | FLOW-01 | passed | 22046 |
| webkit-escritorio | FLOW-01 | passed | 21212 |
| firefox-estrecho | FLOW-02 | passed | 3846 |
| firefox-tableta | FLOW-02 | passed | 2931 |
| firefox-escritorio | FLOW-02 | passed | 2900 |
| webkit-estrecho | FLOW-02 | passed | 2837 |
| webkit-tableta | FLOW-02 | passed | 2475 |
| webkit-escritorio | FLOW-02 | passed | 2759 |

Casos originales: results.json. Configuración, invariantes y versiones: [verification.json](verification.json).

Las capturas adjuntas son diagnóstico, sin crear ni actualizar referencias. La revisión del punto 3 se registra aparte.

## Evidencia por requisito

Se contrasta con el catálogo completo. Los casos no seleccionados permanecen incompletos; un filtro no acredita la matriz.

| Proyecto | Requisito | Estado | Casos aprobados / requeridos |
| --- | --- | --- | --- |
| firefox-estrecho | CB-01 | incomplete | 0 / 1 |
| firefox-estrecho | CB-02 | incomplete | 0 / 1 |
| firefox-estrecho | CB-03 | incomplete | 0 / 1 |
| firefox-estrecho | CB-04 | incomplete | 0 / 1 |
| firefox-estrecho | CB-05 | incomplete | 0 / 1 |
| firefox-estrecho | CB-06 | incomplete | 0 / 2 |
| firefox-estrecho | CB-07 | incomplete | 0 / 2 |
| firefox-estrecho | CB-08 | incomplete | 0 / 2 |
| firefox-estrecho | CB-09 | incomplete | 0 / 2 |
| firefox-estrecho | CB-10 | incomplete | 0 / 2 |
| firefox-estrecho | CB-11 | incomplete | 0 / 2 |
| firefox-estrecho | CB-12 | passed | 1 / 1 |
| firefox-estrecho | CB-13 | incomplete | 0 / 2 |
| firefox-estrecho | CB-14 | not-applicable | 0 / 0 |
| firefox-estrecho | CB-15 | incomplete | 0 / 4 |
| firefox-estrecho | CB-16 | incomplete | 0 / 2 |
| firefox-estrecho | CB-17 | incomplete | 1 / 2 |
| firefox-estrecho | CB-18 | incomplete | 0 / 1 |
| firefox-estrecho | CB-19 | incomplete | 1 / 2 |
| firefox-estrecho | CB-20 | not-applicable | 0 / 0 |
| firefox-tableta | CB-01 | incomplete | 0 / 1 |
| firefox-tableta | CB-02 | incomplete | 0 / 1 |
| firefox-tableta | CB-03 | incomplete | 0 / 1 |
| firefox-tableta | CB-04 | incomplete | 0 / 1 |
| firefox-tableta | CB-05 | incomplete | 0 / 1 |
| firefox-tableta | CB-06 | incomplete | 0 / 2 |
| firefox-tableta | CB-07 | incomplete | 0 / 2 |
| firefox-tableta | CB-08 | incomplete | 0 / 2 |
| firefox-tableta | CB-09 | incomplete | 0 / 2 |
| firefox-tableta | CB-10 | incomplete | 0 / 2 |
| firefox-tableta | CB-11 | incomplete | 0 / 2 |
| firefox-tableta | CB-12 | passed | 1 / 1 |
| firefox-tableta | CB-13 | incomplete | 0 / 2 |
| firefox-tableta | CB-14 | not-applicable | 0 / 0 |
| firefox-tableta | CB-15 | incomplete | 0 / 4 |
| firefox-tableta | CB-16 | incomplete | 0 / 2 |
| firefox-tableta | CB-17 | incomplete | 1 / 2 |
| firefox-tableta | CB-18 | incomplete | 0 / 1 |
| firefox-tableta | CB-19 | incomplete | 1 / 2 |
| firefox-tableta | CB-20 | not-applicable | 0 / 0 |
| firefox-escritorio | CB-01 | incomplete | 0 / 1 |
| firefox-escritorio | CB-02 | incomplete | 0 / 1 |
| firefox-escritorio | CB-03 | incomplete | 0 / 1 |
| firefox-escritorio | CB-04 | incomplete | 0 / 1 |
| firefox-escritorio | CB-05 | incomplete | 0 / 1 |
| firefox-escritorio | CB-06 | incomplete | 0 / 2 |
| firefox-escritorio | CB-07 | incomplete | 0 / 4 |
| firefox-escritorio | CB-08 | incomplete | 0 / 2 |
| firefox-escritorio | CB-09 | incomplete | 0 / 2 |
| firefox-escritorio | CB-10 | incomplete | 0 / 2 |
| firefox-escritorio | CB-11 | incomplete | 0 / 2 |
| firefox-escritorio | CB-12 | passed | 1 / 1 |
| firefox-escritorio | CB-13 | incomplete | 0 / 2 |
| firefox-escritorio | CB-14 | incomplete | 0 / 4 |
| firefox-escritorio | CB-15 | incomplete | 0 / 6 |
| firefox-escritorio | CB-16 | incomplete | 0 / 2 |
| firefox-escritorio | CB-17 | incomplete | 1 / 2 |
| firefox-escritorio | CB-18 | incomplete | 0 / 1 |
| firefox-escritorio | CB-19 | incomplete | 1 / 3 |
| firefox-escritorio | CB-20 | incomplete | 0 / 6 |
| webkit-estrecho | CB-01 | incomplete | 0 / 1 |
| webkit-estrecho | CB-02 | incomplete | 0 / 1 |
| webkit-estrecho | CB-03 | incomplete | 0 / 1 |
| webkit-estrecho | CB-04 | incomplete | 0 / 1 |
| webkit-estrecho | CB-05 | incomplete | 0 / 1 |
| webkit-estrecho | CB-06 | incomplete | 0 / 2 |
| webkit-estrecho | CB-07 | incomplete | 0 / 2 |
| webkit-estrecho | CB-08 | incomplete | 0 / 2 |
| webkit-estrecho | CB-09 | incomplete | 0 / 2 |
| webkit-estrecho | CB-10 | incomplete | 0 / 2 |
| webkit-estrecho | CB-11 | incomplete | 0 / 2 |
| webkit-estrecho | CB-12 | passed | 1 / 1 |
| webkit-estrecho | CB-13 | incomplete | 0 / 2 |
| webkit-estrecho | CB-14 | not-applicable | 0 / 0 |
| webkit-estrecho | CB-15 | incomplete | 0 / 4 |
| webkit-estrecho | CB-16 | incomplete | 0 / 2 |
| webkit-estrecho | CB-17 | incomplete | 1 / 2 |
| webkit-estrecho | CB-18 | incomplete | 0 / 1 |
| webkit-estrecho | CB-19 | incomplete | 1 / 2 |
| webkit-estrecho | CB-20 | not-applicable | 0 / 0 |
| webkit-tableta | CB-01 | incomplete | 0 / 1 |
| webkit-tableta | CB-02 | incomplete | 0 / 1 |
| webkit-tableta | CB-03 | incomplete | 0 / 1 |
| webkit-tableta | CB-04 | incomplete | 0 / 1 |
| webkit-tableta | CB-05 | incomplete | 0 / 1 |
| webkit-tableta | CB-06 | incomplete | 0 / 2 |
| webkit-tableta | CB-07 | incomplete | 0 / 2 |
| webkit-tableta | CB-08 | incomplete | 0 / 2 |
| webkit-tableta | CB-09 | incomplete | 0 / 2 |
| webkit-tableta | CB-10 | incomplete | 0 / 2 |
| webkit-tableta | CB-11 | incomplete | 0 / 2 |
| webkit-tableta | CB-12 | passed | 1 / 1 |
| webkit-tableta | CB-13 | incomplete | 0 / 2 |
| webkit-tableta | CB-14 | not-applicable | 0 / 0 |
| webkit-tableta | CB-15 | incomplete | 0 / 4 |
| webkit-tableta | CB-16 | incomplete | 0 / 2 |
| webkit-tableta | CB-17 | incomplete | 1 / 2 |
| webkit-tableta | CB-18 | incomplete | 0 / 1 |
| webkit-tableta | CB-19 | incomplete | 1 / 2 |
| webkit-tableta | CB-20 | not-applicable | 0 / 0 |
| webkit-escritorio | CB-01 | incomplete | 0 / 1 |
| webkit-escritorio | CB-02 | incomplete | 0 / 1 |
| webkit-escritorio | CB-03 | incomplete | 0 / 1 |
| webkit-escritorio | CB-04 | incomplete | 0 / 1 |
| webkit-escritorio | CB-05 | incomplete | 0 / 1 |
| webkit-escritorio | CB-06 | incomplete | 0 / 2 |
| webkit-escritorio | CB-07 | incomplete | 0 / 4 |
| webkit-escritorio | CB-08 | incomplete | 0 / 2 |
| webkit-escritorio | CB-09 | incomplete | 0 / 2 |
| webkit-escritorio | CB-10 | incomplete | 0 / 2 |
| webkit-escritorio | CB-11 | incomplete | 0 / 2 |
| webkit-escritorio | CB-12 | passed | 1 / 1 |
| webkit-escritorio | CB-13 | incomplete | 0 / 2 |
| webkit-escritorio | CB-14 | incomplete | 0 / 4 |
| webkit-escritorio | CB-15 | incomplete | 0 / 6 |
| webkit-escritorio | CB-16 | incomplete | 0 / 2 |
| webkit-escritorio | CB-17 | incomplete | 1 / 2 |
| webkit-escritorio | CB-18 | incomplete | 0 / 1 |
| webkit-escritorio | CB-19 | incomplete | 1 / 3 |
| webkit-escritorio | CB-20 | incomplete | 0 / 6 |
