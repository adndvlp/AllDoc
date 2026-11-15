# Compatibilidad — punto 4: referencias visuales

Estado: **completado**. Pasaron los 26 casos visuales y se aprobaron las
52 capturas de los seis proyectos tras inspeccionarlas. Los seis manifiestos
conservan entorno, versiones y hashes. Pasan las 248 pruebas de código, los tipos
de aplicación/pruebas y el build de producción con su runtime.
La [aceptación del punto](browser-point-4-green.json) conserva la procedencia;
la comparación estricta y aceptación global siguen en el punto 5.

La [ejecución de generación](../../benchmarks/browser-verifications/2026-11-15T06-01-15-407Z-92ea50e9f6/README.md)
aprobó 26 casos, sin fallos, omisiones ni casos inestables, en 71 s.
Usó Playwright 1.65.1, Firefox 159.0 y WebKit 27.2 en macOS arm64/Apple M1,
Node 26. App, runtime y auditoría de rutas están aprobados en ese informe.

## Suite dedicada

| Caso | Capturas | Proyectos |
| --- | --- | --- |
| VIS-01 | Portada con catálogo y buscador | Los seis |
| VIS-02 | Código SQL, resultado real y datos de productos | Los seis |
| VIS-03 | Resultado real pandas y sugerencias Jedi visibles | Los seis |
| VIS-04 | Práctica con búsqueda y temas; sidebar en escritorio | Los seis |
| VIS-05 | 320×568 y 844×390, texto al 200% | Los dos estrechos |

Son 26 casos y 52 PNG. Cada imagen utiliza el viewport efectivo del proyecto,
salvo los dos estados reducidos identificados. Se comprueban filas y columnas
de los motores reales, sugerencia DataFrame, diálogos y ausencia de
desbordamiento antes de capturar. No se emplean motores o resultados simulados.

La captura espera hidratación, fuentes, logos, guardado y estados observables.
Playwright estabiliza animaciones y caret; una hoja específica oculta únicamente
el cursor dibujado por CodeMirror. No se enmascaran código, datos ni controles.
Se mantiene `maxDiffPixelRatio: 0.001`.

## Generación y comparación

```sh
npm run test:browser:update
```

El comando genera únicamente las referencias de Firefox/WebKit. No repite los
168 casos funcionales ni la suite Chromium. Cada proyecto guarda PNG y
`manifest.json` bajo `tests/cross-browser/__screenshots__/{projectName}/`.

Los manifiestos registran versiones, SO/arquitectura, opciones de renderizado,
fuente y herramientas, hashes y dimensiones/escala de texto reales. Se generan
como `awaiting-review`. La revisión de las imágenes se registra aparte;
generar no equivale a aprobar. El informe conserva resultados y metadatos
originales bajo `benchmarks/browser-verifications/`.

Se puede repetir solo un proyecto completo:

```sh
npm run test:browser:update -- --project=webkit-estrecho
```

La comparación independiente está disponible para la fase posterior:

```sh
npm run test:browser -- --visual
```

Comprueba manifiesto, hashes y compatibilidad de entorno/binario antes del
build. Usa `--update-snapshots=none`, también ante imágenes ausentes, y exige
hashes iguales al terminar. `--project`/`--grep` permiten un recorrido acotado,
que se declara parcial. Generar con `--grep` se rechaza para no publicar un
manifiesto de proyecto incompleto. Los puertos efímeros se excluyen de la
identidad del entorno de renderizado.

## TDD y comprobaciones locales

La fase roja reproduce el rechazo de `--visual` y la falta del descubrimiento
dedicado. Otras pruebas reproducen el rechazo ausente de una política de
tolerancia alterada y la validación incorrecta de estados de un caso filtrado.
Las correcciones mantienen la política inmutable, comprueban imágenes exactas
y verifican los estados realmente capturados tanto al generar como al comparar.

La [evidencia TDD](browser-point-4-red.json) conserva comandos, fallos y logs.
El [verde local](browser-point-4-local-green.json) registra 248 pruebas de código,
tipos y descubrimiento de los 26 casos. Las pruebas exigen rechazo de entorno
incompatible, edición manual, PNG ajenos, huecos, duplicados, reintentos y
contadores que no coincidan con los casos originales.

El fallo local por ejecutables ausentes se conserva como problema de entorno,
no como fase roja funcional. La generación aprobada es la ejecución real
posterior a reinstalar los binarios y liberar espacio.

## Revisión aprobada

La [revisión de las 52 imágenes](browser-point-4-visual-review.json) registra
cada PNG, viewport, escala de texto, observación y SHA-256. Se inspeccionaron
en catorce hojas de revisión y se contrastaron también dos originales de
sugerencias pandas a tamaño real: los controles están completos. La vista
reducida había producido una impresión de recorte que los originales descartaron.

La portada, datos/resultados reales, sugerencias y convivencia de diálogos
conservan texto legible y regiones contenidas. En SQL, una línea larga mantiene
el desplazamiento interno del editor al situar el cursor al final. A 320 px y
texto al 200%, los controles se reorganizan y el código queda por debajo del
primer viewport del panel; la captura horizontal muestra controles y código.
Las diferencias de foco y controles táctiles se conservan por proyecto.

Se verificaron los hashes de fuente, herramientas, seis manifiestos y 52 PNG,
las dimensiones contra los estados registrados, y los 165 PNG Chromium contra
su referencia anterior. Los manifiestos originales permanecen `awaiting-review`;
la aprobación separada se liga a sus hashes y no altera los resultados originales.

No se ejecutó aún la comparación visual independiente sin actualización ni la
regresión final de Chromium. Ambas forman parte de la aceptación del punto 5.

## ENOSPC durante el build

El [intento interrumpido](browser-point-4-enospc.json) quedó sin informe final:
el stream del log emitió ENOSPC sin manejador. Se reprodujeron con TDD tanto
el fallo durante la escritura como el fallo al vaciar el log después de salir
el proceso. Ahora se espera el cierre, se propaga el error y se termina el hijo
si sigue activo. Un código cero del proceso no oculta un fallo de escritura.
También se comprueban salida normal, error de arranque y fallo al abrir el log.

La herramienta mide bloques disponibles al usuario en el proyecto y temporal,
con un margen operativo de 512 MiB antes de arrancar navegadores y build.
Ese margen no representa el tamaño final ni garantiza espacio frente a otras
escrituras. Una prueba de la CLI inyecta espacio cero y exige un único
diagnóstico, informe parcial y ausencia de navegador/build.

El bloqueo y temporal vacíos del intento abortado tenían fechas de creación
con 1 ms de diferencia dentro del build fallido. Se archivó el bloqueo junto
al informe y se retiró únicamente ese temporal vacío. No se borraron dependencias,
referencias, datos ni informes anteriores. Se registró el espacio liberado por
el usuario y pasó el [build posterior](../../benchmarks/browser-verifications/2026-11-15T05-53-08-411Z-92ea50e9f6/README.md).

La validación final de código usa concurrencia 2: 248 aprobados, sin omisiones.
Se conserva el fallo anterior de completado SQLite bajo la ejecución de
concurrencia predeterminada; el caso pasó aislado y en el conjunto acotado,
sin cambiar su expectativa, el presupuesto del completado ni código de producto.
El registro local conserva ambos resultados y el comando efectivo.
