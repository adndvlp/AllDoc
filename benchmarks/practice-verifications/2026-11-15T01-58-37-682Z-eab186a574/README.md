# Aceptación de práctica — punto 8

Estado: **partial**. Modo: full.

Fuente: `eab186a5744af50b4a3c666c577f6c964748c782b0a24d84ccf07b07d0c6cf46`. Inicio: 2026-11-15T01:58:37.682Z.

Los tiempos son un proxy de laboratorio DOM + siguiente rAF. No son INP de campo. La carga fría y la ejecución se registran por separado.

## Comprobaciones

- 01-código: passed (01-código.log).
- 02-tipos-app: passed (02-tipos-app.log).
- 03-tipos-pruebas: passed (03-tipos-pruebas.log).
- 04-build: passed (04-build.log).
- 05-runtime: passed (verification.json).
- 06-mediciones: passed (verification.json).

## Rendimiento

| Tamaño | Perfil | Acción | Muestras | p95 ms | Límite ms | Estado |
| --- | --- | --- | ---: | ---: | ---: | --- |
| laptop | sql-sqlite | open | 30 | 31.80 | 100 | met |
| laptop | sql-sqlite | close | 30 | 31.80 | 100 | met |
| laptop | sql-sqlite | write | 30 | 31.60 | 100 | met |
| laptop | sql-sqlite | completionKeyword | 30 | 84.70 | 100 | met |
| laptop | sql-sqlite | completionColumns | 30 | 84.80 | 100 | met |
| laptop | sql-sqlite | context | 30 | 32.50 | 100 | met |
| laptop | python-pandas | open | 30 | 32.50 | 100 | met |
| laptop | python-pandas | close | 30 | 32.30 | 100 | met |
| laptop | python-pandas | write | 30 | 25.40 | 100 | met |
| laptop | python-pandas | completionKeyword | 30 | 85.20 | 300 | met |
| laptop | python-pandas | completionColumns | 30 | 85.60 | 300 | met |
| laptop | python-pandas | context | 30 | 32.40 | 100 | met |
| celular | sql-sqlite | open | 30 | 30.70 | 100 | met |
| celular | sql-sqlite | close | 30 | 30.40 | 100 | met |
| celular | sql-sqlite | write | 30 | 33.30 | 100 | met |
| celular | sql-sqlite | completionKeyword | 30 | 84.20 | 100 | met |
| celular | sql-sqlite | completionColumns | 30 | 84.50 | 100 | met |
| celular | sql-sqlite | context | 30 | 99.80 | 100 | met |
| celular | python-pandas | open | 30 | 31.10 | 100 | met |
| celular | python-pandas | close | 30 | 31.70 | 100 | met |
| celular | python-pandas | write | 30 | 31.40 | 100 | met |
| celular | python-pandas | completionKeyword | 30 | 90.80 | 300 | met |
| celular | python-pandas | completionColumns | 30 | 86.30 | 300 | met |
| celular | python-pandas | context | 30 | 96.50 | 100 | met |

Muestras y fases: [measurements.json](measurements.json). Bundle inicial: [bundle-comparison.json](bundle-comparison.json).

La referencia anterior a práctica permite comparar bytes iniciales. No contiene latencias de un panel que aún no existía.

## Criterios

| ID | Criterio | Evidencia ejecutada |
| --- | --- | --- |

Los casos concretos y sus proyectos están en verification.json. Las referencias visuales deben permanecer idénticas durante la ejecución.

## Revisión y límites

Pendiente revisar las capturas de screenshots/ y las trazas de traces/. Las trazas son reproducciones posteriores y no sustituyen las muestras.

- Firefox: ejecutable no instalado; casos SQL/pandas no ejecutados.
- WebKit: ejecutable no instalado; casos SQL/pandas no ejecutados.

Fallo en 08-UI-sin-actualizar-referencias:

```text
08-UI-sin-actualizar-referencias: código 1. mi-c9565-cías-sin-contenido-ficticio-celular-pequeno/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/artifacts/catalog-páginas-de-área-mi-c9565-cías-sin-contenido-ficticio-celular-pequeno/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/artifacts/catalog-páginas-de-área-mi-c9565-cías-sin-contenido-ficticio-celular-pequeno/trace.zip
    Usage:

        npx playwright show-trace test-results/artifacts/catalog-páginas-de-área-mi-c9565-cías-sin-contenido-ficticio-celular-pequeno/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  1 failed
    [celular-pequeno] › tests/ui/catalog.spec.ts:89:1 › páginas de área: mismo catálogo, sidebar independiente y áreas vacías sin contenido ficticio 
  1 interrupted
    [celular-pequeno] › tests/ui/header.spec.ts:158:1 › menú de temas: modal con inicio, foco contenido y cierre con Esc sin mover el apunte 
  558 did not run
  7 passed (10.0s)
  1 error was not a part of any test, see above for details

```
