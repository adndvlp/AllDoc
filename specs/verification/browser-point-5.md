# Compatibilidad — punto 5: aceptación final

Estado: **completado**. La [aceptación revisada](browser-point-5-green.json)
registra CA-01 a CA-12 aprobados. La campaña conserva 26 comparaciones visuales
y 168 casos funcionales Firefox/WebKit aprobados; la regresión Chromium reúne
558 aprobaciones y nueve omisiones previstas, con procedencia por caso.
Pasaron 275 pruebas de código en 48 archivos, cuatro comprobaciones adicionales
del cierre, tipos de aplicación/pruebas y build/runtime.

## Comando y alcance

```sh
npm run verify:browser
```

El comando comprueba el espacio y la aprobación de las referencias, y exige
Firefox, WebKit y Chromium antes del código/build. No descarga binarios.
Construye una sola vez y comparte los orígenes separados entre tres fases:

| Fase | Casos |
| --- | ---: |
| Comparación visual Firefox/WebKit, sin actualización | 26 |
| Matriz funcional Firefox/WebKit | 168 |
| Regresión Chromium en sus siete proyectos | 567 descubiertos: 558 aprobaciones esperadas y nueve omisiones previstas |

El orden detecta primero diferencias visuales. Las nueve omisiones Chromium
conservan proyecto, archivo, título y motivo original; no se aceptan omisiones
nuevas ni se cuentan como aprobadas. Un fallo, resultado ausente, interrupción,
reintento, caso inestable, contador incompatible o referencia cambiada impide
cerrar la entrega. Cada suite conserva sus resultados originales y su
descubrimiento para comprobar cada identidad.

Las referencias nuevas exigen los 52 PNG y seis manifiestos ligados a la
aprobación del punto 4. También se exige que los 165 PNG Chromium coincidan con
los conservados allí. Se comprueban las versiones/entorno antes de comparar y
hashes de fuente, herramientas, paquetes, referencias y evidencia al terminar.
No se amplía `maxDiffPixelRatio: 0.001` ni se actualizan referencias ausentes.

No se repite la campaña de rendimiento: la herramienta contrasta las fuentes
del producto, configuración y lockfile con la generación aprobada. Un cambio
de esos caminos deja pendiente la aceptación hasta revisar la regresión o
medición afectada. No se declara INP de campo ni hardware físico.

## Coste y diagnóstico

Dos workers, sin reintentos. El progreso informa cada quince segundos de
contadores y casos/fases activos; los fallos muestran un diagnóstico breve.
Advertencias y detalles quedan en los logs. Los streams de logs usan el manejo
de errores de ENOSPC ya probado. El verificador limpia solo servidores,
temporales y lock propios; no reutiliza el servidor personal ni `.runtime-build`.

```sh
npm run verify:browser -- --list
npm run verify:browser -- --suite=visual --project=webkit-estrecho --grep=VIS-05
npm run verify:browser -- --code-only
```

La selección exige solo el motor correspondiente. Los modos filtrados y de
código/build conservan la aceptación global incompleta, incluso si terminan
con código cero. `--list` no ejecuta casos ni inicia motores, build o servidores.

## TDD y evidencia

La [fase roja](browser-point-5-red.json) registra configuración heredada sin
comparación estricta, ausencia del evaluador de aceptación, salida no compacta
y selección WebKit que exigía incorrectamente Firefox. Las correcciones
conservan los contratos originales; no se modificaron fuentes del producto.

Las pruebas de código comprueban aprobación ligada a hashes, rechazo de huecos,
duplicados, omisiones nuevas, reintentos y resultados antiguos, las doce
condiciones de cierre y el preflight de los tres motores. Los casos parciales
no se presentan como ejecución final ni como nuevas pruebas de la app.

La [primera comprobación local](../../benchmarks/browser-verifications/2026-11-15T06-30-52-505Z-5d2023cce7/README.md)
aprobó 260 casos de código, tipos y build/runtime con invariantes intactas.
Ese modo no ejecutó UI ni completa los criterios. Los resultados posteriores
se registrarán con sus fuentes y herramientas efectivas.

La [comprobación local final](browser-point-5-local-green.json) aprobó 265
casos de código en 47 archivos, tipos, build/runtime, rutas e invariantes.
Conserva los 52 PNG y seis manifiestos aprobados, los 165 PNG Chromium y la
fuente del producto intactos. La aceptación global sigue incompleta porque
este modo no ejecuta UI. En esa comprobación faltaba Chromium; después se
instaló y los tres motores arrancaron en la pasada completa.

## Primera pasada completa y caso al 200%

La [ejecución completa](../../benchmarks/browser-verifications/2026-11-15T06-43-03-136Z-5d2023cce7/README.md)
aprobó las 26 comparaciones visuales y los 168 casos funcionales. Chromium
alcanzó 441 aprobaciones y siete omisiones previstas; se detuvo en la captura
`practice-200.png` de laptop. Otro caso quedó interrumpido y 117 no llegaron
a ejecutarse. El informe parcial y sus fallos se conservan intactos.

La [revisión posterior al aborto](browser-point-5-first-run-review.json)
verificó fuente, herramientas, paquetes, referencias y revisión antes de
modificar las pruebas. La traza conserva la línea de código con tamaño fijo
de 16 px tras `fill`; el contenedor estaba al 200% y la prueba solo comprobaba
ese contenedor. La preparación ahora usa teclas y mide también `.cm-line`.
Mantiene texto, instancia, controles, ausencia de desbordamiento y la captura
original. El cambio se limita a ese caso y conserva los números de línea.

La [evidencia roja del ajuste](browser-point-5-chromium-red.json) liga el fallo,
la traza y los hashes anteriores. También se corrigió el diagnóstico del
evaluador para priorizar el fallo real frente a los casos no ejecutados.
El [ajuste pasó en los siete tamaños](../../benchmarks/browser-verifications/2026-11-15T07-41-58-702Z-5d2023cce7/README.md),
contra las capturas originales. La fuente, herramientas, referencias, revisión
y paquetes conservaron sus hashes durante esa ejecución.

## Cierre y procedencia

La [última pasada](../../benchmarks/browser-verifications/2026-11-15T07-46-52-079Z-5d2023cce7/README.md)
completó laptop y escritorio: 160 aprobaciones y dos omisiones previstas, sin
fallos ni reintentos. También aprobó las 275 pruebas de código, los tipos y el
build/runtime, y comprobó las invariantes. No se repitieron los proyectos ya
completados ni las fases Firefox/WebKit.

La [evidencia consolidada](browser-point-5-acceptance.json) es un documento
derivado, no una ejecución nueva de Playwright. Conserva los informes originales
con su estado y sus errores; selecciona los siguientes casos reales:

| Procedencia | Selección Chromium | Aprobados | Omitidos previstos |
| --- | --- | ---: | ---: |
| Primera pasada | Cinco proyectos de celular/tableta, excluyendo el caso modificado al 200% | 393 | 7 |
| Pasada de zoom | Solo ese caso corregido en los cinco proyectos anteriores | 5 | 0 |
| Última pasada | Todos los casos de laptop y escritorio | 160 | 2 |
| Total | 567 identidades únicas del descubrimiento original | 558 | 9 |

Los dos casos de zoom de escritorio se toman de la última pasada para evitar
contarlos dos veces. La [revisión previa a la reanudación](browser-point-5-resume-review.json)
fija los cambios de herramientas por ruta y hash. Las fuentes del producto,
paquetes, referencias y revisión coinciden entre las tres ejecuciones; las
configuraciones efectivas coinciden al excluir sus puertos efímeros propios.
El [ensamblador](browser-point-5-consolidate.mjs) rechaza huecos, duplicados,
fallos seleccionados, reintentos, resultados inestables y actualización de
referencias. Sus siete pruebas forman parte de las 275. El
[cierre](browser-point-5-close.mjs) verifica las fuentes y vuelve a evaluar los
doce criterios; sus cuatro pruebas adicionales tienen
[evidencia roja y verde](browser-point-5-close-tdd.json).

Se conservaron los 52 PNG y seis manifiestos aprobados de Firefox/WebKit y los
165 PNG de Chromium, sin regenerarlos ni ampliar la tolerancia. La comparación
visual independiente aprobó los 26 casos. Los 168 casos funcionales cubren
CB-01 a CB-20 según los proyectos y disposiciones exigidos.

Motores utilizados: Firefox 159.0, WebKit 27.2 y Chromium 159.0.8154.6,
distribuidos por Playwright 1.65.1, en macOS Darwin 27.0.0 arm64 y Node 26.0.0.
El alcance sigue siendo automatización de Playwright; no acredita aparatos
físicos, Safari comercial ni INP de campo. La aplicación y sus datos no
cambiaron, por lo que no se repitió la campaña de rendimiento.
