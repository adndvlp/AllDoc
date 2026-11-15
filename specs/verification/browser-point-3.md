# Compatibilidad — punto 3: matriz funcional

Estado: **completado**. Hay 168 casos funcionales aprobados en los seis proyectos
Firefox/WebKit, sin casos pendientes, omitidos ni inestables dentro del alcance
declarado. Pasan las 231 pruebas de código, los tipos de aplicación/pruebas y
los builds de producción. La [aceptación del punto](browser-point-3-green.json)
conserva versiones, hashes, procedencia y cobertura por requisito.

La evidencia reúne ejecuciones compatibles; no representa una única ejecución
de 168 casos. Las referencias visuales nuevas y la aceptación global del SDD
siguen pendientes de los puntos 4 y 5.

## Resultado por proyecto

| Proyecto | Casos aprobados | Viewport inicial |
| --- | ---: | --- |
| firefox-estrecho | 24 | 390×844 |
| firefox-tableta | 24 | 768×1024 |
| firefox-escritorio | 36 | 1280×800 |
| webkit-estrecho | 24 | 390×844 |
| webkit-tableta | 24 | 768×1024 |
| webkit-escritorio | 36 | 1280×800 |
| Total | 168 | Seis proyectos |

Playwright 1.65.1, Firefox 159.0 y WebKit 27.2, en macOS arm64 con Apple M1 y
Node 26. La versión estable de Playwright comprobada en el
[registro oficial](https://registry.npmjs.org/@playwright/test/latest) coincide
con la instalada. No se cambiaron dependencias, SDK ni wheels.

`scripts/lib/browser-cases.ts` identifica cada caso, archivo, alcance y
requisitos CB-01 a CB-20. Los casos `@desktop` se excluyen por configuración
antes de ejecutar en otros tamaños. La evaluación registra 120 celdas de
requisito/proyecto: cada una exige todos sus casos aplicables o declara el
alcance exclusivo de escritorio. No acredita un requisito completo con un solo
caso ni convierte un filtro en una aprobación global.

La cobertura incluye navegación, catálogo, búsqueda, teclado, diálogos y foco;
preferencias, favoritos, recientes y borradores en IndexedDB; adaptación al
200% y 320 px; scroll independiente; ejecución real SQL/pandas, sugerencias
SQL/Jedi, selección, errores y recuperación; esquema vivo, reinicio y código
anterior; resultados seguros, aislamiento, cancelación, timeout y reintentos.

## Procedencia de los 168 casos

| Ejecución original | Casos utilizados | Selección |
| --- | ---: | --- |
| [04:51 — matriz parcial](../../benchmarks/browser-verifications/2026-11-15T04-51-29-570Z-a4baa35590/README.md) | 81 | Firefox, excepto APP-04 |
| [04:59 — corrección de foco](../../benchmarks/browser-verifications/2026-11-15T04-59-35-262Z-a4baa35590/README.md) | 3 | APP-04 de Firefox; los seis casos de esta ejecución pasaron |
| [05:03 — WebKit completo](../../benchmarks/browser-verifications/2026-11-15T05-03-30-810Z-a4baa35590/README.md) | 84 | Los tres proyectos WebKit; 306 s |

La primera ejecución aprobó los 84 casos de Firefox y se detuvo en una
expectativa de foco de APP-04 en WebKit. La corrección afecta solo esa prueba:
se distingue la eliminación por toque/click de la eliminación con teclado,
que requiere enfocar el botón antes de esperar el retorno del foco. Después
pasaron APP-04 en los seis proyectos y los 84 casos completos de WebKit.

El [verificador de consolidación](browser-point-3-consolidate.mjs) compara
fuente, paquetes, entorno, binarios, configuración efectiva y referencias.
Comprueba el puerto/origen real de cada ejecución y todos los hashes de la
herramienta. La única diferencia permitida está dentro de APP-04; el resto de
ese archivo coincide byte por byte. El
[archivo anterior archivado](browser-point-3-application-before-focus.txt)
se reconstruyó revirtiendo la corrección conocida y su SHA-256 coincide con el
registrado antes del cambio.

Los [resultados derivados](browser-point-3-consolidated-results.json) conservan
la procedencia de cada caso. El verificador rechaza duplicados, casos ausentes,
reintentos, contadores incompatibles y cambios sin revisión. Recalcula la
cobertura desde los resultados reales. Los informes originales, incluido el
estado parcial y sus errores, permanecen intactos.
La [revisión de compatibilidad](browser-point-3-consolidation-review.json)
registra las comprobaciones y la selección 81 + 3 + 84.

La consolidación puede reproducirse sin abrir navegadores:

```sh
node --experimental-strip-types specs/verification/browser-point-3-consolidate.mjs benchmarks/browser-verifications/2026-11-15T05-03-30-810Z-a4baa35590
```

## TDD y correcciones de las pruebas

Se conservan las fases rojas y los resultados posteriores. Los cambios de
esta entrega son de configuración, pruebas y herramientas; no fue necesario
modificar la aplicación.

- Matriz y evaluación: [seis proyectos](browser-point-3-matrix-red.json),
  [cobertura por requisito](browser-point-3-coverage-red.json),
  [origen efectivo](browser-point-3-origin-red.json) y
  [consolidación estricta](browser-point-3-consolidation-red.json).
- Adaptación: la [medición al 200%](browser-point-3-viewport-red.json) comprueba
  el contenedor del editor; el documento de código puede desplazar internamente.
- Scroll: se corrigen la [lectura del menú cerrado](browser-point-3-sidebar-red.json),
  la [espera al extremo](browser-point-3-scroll-settle-red.json),
  la [distancia real](browser-point-3-scroll-distance-red.json),
  la [expansión final](browser-point-3-sidebar-expansion-red.json) y
  la [identificación de la tabla que desplaza](browser-point-3-table-scroll-red.json).
  Se mantienen las comprobaciones de contención y regiones independientes.
- Persistencia: la [expectativa del código inicial](browser-point-3-initial-code-red.json)
  usa los bytes canónicos del contrato en lugar de `innerText`, conservando la
  comparación exacta con IndexedDB. El [verde aislado](browser-point-3-initial-code-green.json)
  contiene los seis casos PY-07 aprobados.
- Favoritos: la [expectativa de foco](browser-point-3-favorites-focus-red.json)
  reproduce la diferencia entre click y teclado; APP-04 pasó después en los seis
  proyectos, además del recorrido completo de WebKit.

Las [231 pruebas de código y ambos controles de tipos](browser-point-3-local-green.json)
pasaron con la herramienta final. Los informes originales conservan también
los manifiestos del runtime, inventarios y auditorías de rutas del build.

Los intentos con `ENOSPC` y binarios ausentes se registran como problemas de
entorno, no como fallos funcionales TDD. La
[limpieza documentada](browser-point-3-disk-cleanup.json) recuperó caché
regenerable y deduplicó artefactos idénticos mediante enlaces duros, conservando
rutas y bytes. El [diagnóstico de instalación](browser-point-3-installation-block.json)
se resolvió reinstalando los binarios antes de las ejecuciones aprobadas.

## Revisión y alcance pendiente

Se inspeccionaron [doce capturas de diagnóstico](browser-point-3-diagnostic-review.json)
de diálogos/contexto y adaptación al 200%, procedentes de ambos motores y los
seis proyectos. La revisión registra el viewport real y sus observaciones;
no son referencias de comparación de píxeles.

La fuente de aplicación conserva el SHA-256
`a4baa3559048a59580da4756d33a071040afe2f8e041b1c4235fe2d9b6bb0527`.
Las 165 referencias Chromium y su configuración permanecen intactas.

La [condición de scroll](browser-point-3-scroll-capability.json) está explícita:
Playwright rechaza rueda en WebKit móvil. Esos dos proyectos comprueban scroll
del DOM, contención CSS y posiciones independientes; los demás usan rueda.
Los controles táctiles se prueban con `tap`. No se acredita física de gestos,
hardware real ni Safari comercial.

El siguiente punto genera y revisa referencias propias de Firefox/WebKit.
La comparación visual estricta, regresión Chromium pertinente y aceptación
global corresponden al cierre posterior del SDD.
