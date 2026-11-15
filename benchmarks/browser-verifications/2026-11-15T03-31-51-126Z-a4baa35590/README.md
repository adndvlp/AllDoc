# Firefox/WebKit — práctica en escritorio

Estado: **desktop-ready-for-review**.

Escritorio: editor, sugerencias y ejecución real SQL/pandas. La matriz restante y las referencias visuales son puntos posteriores.

Fuente: `a4baa3559048a59580da4756d33a071040afe2f8e041b1c4235fe2d9b6bb0527`. Playwright: 1.65.1.

| Proyecto | Caso | Estado | Duración ms |
| --- | --- | --- | ---: |
| firefox-escritorio | SQL-01 | passed | 3520 |
| webkit-escritorio | SQL-01 | passed | 3332 |
| firefox-escritorio | SQL-02 | passed | 3353 |
| webkit-escritorio | SQL-02 | passed | 1493 |
| firefox-escritorio | SQL-03 | passed | 2507 |
| webkit-escritorio | SQL-03 | passed | 2224 |
| firefox-escritorio | SQL-04 | passed | 2344 |
| webkit-escritorio | SQL-04 | passed | 2765 |
| firefox-escritorio | SQL-05 | passed | 1501 |
| webkit-escritorio | SQL-05 | passed | 1753 |
| firefox-escritorio | PY-01 | passed | 12384 |
| webkit-escritorio | PY-01 | passed | 10084 |
| firefox-escritorio | PY-02 | passed | 11761 |
| webkit-escritorio | PY-02 | passed | 8979 |
| firefox-escritorio | PY-03 | passed | 15649 |
| webkit-escritorio | PY-03 | passed | 10358 |
| firefox-escritorio | PY-04 | passed | 12140 |
| webkit-escritorio | PY-04 | passed | 10567 |
| firefox-escritorio | PY-05 | passed | 11937 |
| webkit-escritorio | PY-05 | passed | 8003 |

Casos originales: results.json. Configuración, invariantes y versiones: [verification.json](verification.json).

Las capturas adjuntas son diagnóstico, sin crear ni actualizar referencias. La revisión y aceptación del punto 2 se registran aparte.

## Revisión del punto 2

Completada: veinte casos aprobados, sin omisiones ni reintentos. Se revisaron las ocho capturas adjuntas; véase [review.json](review.json). La aceptación y el TDD se conservan en [browser-point-2.md](../../../specs/verification/browser-point-2.md). Las referencias visuales nuevas y la matriz restante corresponden a los puntos posteriores.
