# Punto 6: Pyodide, pandas y análisis Python

Estado: completado. Código, motores reales, suite completa y comparación visual
independiente aprobados. Las acciones de ejemplos y la aceptación global
permanecen en los puntos 7 y 8.

## Implementación

El perfil pandas ejecuta Python con Pyodide 314.0.8, Python 3.14.2 y el build
compatible pandas 3.0.2/NumPy 2.4.6. Jedi 0.20.1 y Parso 0.8.7 son las versiones
estables resueltas al preparar la entrega. El [manifiesto](../../src/practice/adapters/python/packages.ts)
fija las siete dependencias, fuentes y SHA-256. Una preparación normal reutiliza
ese pin; actualizarlo es una acción explícita.

El transporte, frame y panel se comparten con SQL. Cada perfil crea su Worker;
el frame, SDK, WASM, stdlib y wheels se sirven desde el origen estático separado.
No se añade un backend de ejecución. pandas/Jedi no entran en la descarga inicial.

Se conserva un namespace por sesión: variables, mutaciones y DataFrames nuevos
persisten entre ejecuciones, incluidos los cambios anteriores a un error.
La selección se mide en UTF-16 y los errores conservan la posición en el archivo
original. La última expresión DataFrame/Series se convierte en una tabla JSON
acotada; se capturan stdout/stderr, valores escalares y errores reales. Los
proxies temporales no cruzan a React y el namespace se libera al disponer el núcleo.

Reiniciar Python reconstruye su frame/Worker, recuperando también módulos
modificados por el usuario. Cancelar o superar diez segundos conserva el texto
y descarta la VM ocupada. SQL mantiene su adaptador y el mismo contrato.

El completador usa el runtime del workspace, sin crear otra VM por consulta.
Jedi analiza el documento sin ejecutarlo; las columnas proceden del esquema
registrado para la forma directa `productos["..."]`, también con comillas simples.
El análisis no invoca propiedades de los objetos del usuario. Las respuestas
incluyen identidad, generación, revisión y rangos UTF-16; al cambiar texto o
perfil se aborta su espera y se ignoran respuestas antiguas. Durante una ejecución
se mantiene el editor y se anuncia que el análisis está pausado.

## TDD y regresiones

- [Contrato](practice-point-6-contract-red.json): Python y sus mensajes, misma
  VM para ejecución/análisis y limpieza si falla crear el completador.
- [Assets](practice-point-6-assets-red.json) y [pin](practice-point-6-pins-red.json):
  cierre transitivo, rutas, ciclos, checksum y reutilización de versiones compatibles.
- [Núcleo real](practice-point-6-python-red.json): siete fallos funcionales con
  Pyodide, pandas y Jedi ya instalados, antes de implementar resultados/estado.
- [Editor](practice-point-6-editor-red.json): datos del proveedor, abortos y
  respuesta retrasada que no sustituye la consulta actual.
- [Interacción](practice-point-6-interaction-red.json): botón y atajo comparten
  el permiso de ejecutar solo el workspace habilitado y listo.
- [Propiedades del usuario](practice-point-6-analysis-red.json): sugerir una
  columna no debe invocar su getter Python. La implementación anterior lo hacía.
- [Orden de preparación](practice-point-6-initialization-red.json) y
  [fallos de paquetes](practice-point-6-load-errors-red.json): dobles limitados
  al ciclo de vida prueban que se espera la carga y se rechaza una VM parcial.
- [Esquema retrasado](practice-point-6-schema-red.json): una solicitud de
  sugerencias no puede invalidar la inspección de la última ejecución.
- [Funciones conservadas](practice-point-6-traceback-red.json): un error en una
  función de una ejecución anterior conserva su mensaje y señala la llamada
  del documento actual. Se identifican los objetos de código compilados en la
  ejecución para evitar atribuirle posiciones de una versión anterior.
- [Límites y limpieza](practice-point-6-output-red.json) y
  [mensaje del límite](practice-point-6-limit-message-red.json): rechazar código
  grande no produce un error secundario de limpieza; superar stdout se explica
  como límite de 1 MiB, con un único final y posibilidad de ejecutar después.
- [Distribución del motor](practice-point-6-runtime-assets-red.json): el SDK
  publicado conserva exactamente los bytes instalados de Pyodide, su WASM y
  stdlib; Webpack no vuelve a minificar el SDK. Los siete wheels y todos los
  archivos del manifiesto se comprueban con SHA-256 en un build temporal real.
- [UI roja](practice-point-6-ui-red.json): el botón pandas estaba desactivado.
  [La primera ejecución real en celular](practice-point-6-ui-smoke-green.json)
  acredita el filtro y sus valores numéricos.

El [fallo de inicialización observado en navegador](practice-point-6-initialization-regression.json)
se conserva como diagnóstico, no como fase roja por ausencia de un módulo.
La descarga respondió, pero Jedi no estaba importable al preparar el núcleo.
Se pasó de la precarga implícita a esperar `loadPackage` explícitamente y sus
errores antes del núcleo. Las pruebas de orden usan dobles; las de conformidad
siguen ejecutando Pyodide real.

Pasan 162 pruebas de código, incluidos los límites UTF-8, tipos y namespaces
reales. [Código, tipos y build](practice-point-6-code-green.json) registran sus
salidas, fuente y hashes de las herramientas.

La [comprobación de pandas en celular y laptop](practice-point-6-python-ui-green.json)
pasó los 18 casos sin omisiones, fallos ni casos inestables. Se revisaron sus
cuatro capturas de resultados y esquema. Incluye carga retrasada, Jedi e
inserción real, estado persistente del intérprete, errores, selección, reinicio,
cancelación, timeout, aislamiento y cambios SQL ↔ pandas.

La [suite completa con actualización](practice-point-6-ui-update.json) pasó
509 casos, con nueve omisiones previstas y ningún fallo o caso inestable. Se
revisaron las 21 capturas nuevas o modificadas: catorce de resultados/esquema
y siete del editor de pandas; hay 158 referencias en total. Algunas capturas
del editor muestran «Guardando…», por lo que se añadió una espera explícita de
«Guardado local» antes de capturar. La [actualización acotada de borradores](practice-point-6-reviewed-references.json)
pasó los siete casos sin omisiones ni fallos; se revisaron sus imágenes y se
guardaron los hashes de las 158 referencias. Playwright reemplazó la de celular
horizontal y conservó las otras dentro de la tolerancia configurada.

La [comparación independiente](practice-point-6-green.json) pasó 509 casos,
con nueve omisiones previstas, sin fallos ni casos inestables. Se verificaron
la misma fuente, las mismas herramientas y los hashes de las 158 referencias
sin cambios. La ejecución no recibió `--update-snapshots`; no se actualizaron
las capturas revisadas. Los 63 casos específicos de Python pasaron dentro de
esta suite en los siete tamaños.

El [inventario de producción](../../benchmarks/runs/2026-11-14T10-02-25-794Z-ef2041a80b/README.md)
registra 159440 bytes gzip de JS inicial y 22358 de CSS: 161 bytes más de JS
que el punto 5. Es una medición de archivos; no acredita latencia ni INP.

## Límites y publicación

Se conservan 1 MiB de código/salida y 200 filas por resultado. La inspección
devuelve previews acotadas; no transporta pandas ni handles Python a la interfaz.
Los enteros grandes se representan como texto tipado, las fechas como ISO y
los valores ausentes como null. No se amplían las capacidades a red, figuras,
instalación libre de paquetes o un servicio LSP.

La [guía de publicación](../practice-runtime-deployment.md) describe el caché,
los dos sitios estáticos, MIME y CSP. La preparación inicial de pandas es una
descarga de motor/paquetes: no se promete que sea instantánea. El rendimiento
del motor frío y los presupuestos de interacción se medirán en la aceptación
global del punto 8, con condiciones declaradas.

La sandbox impide abrir el servidor (EPERM); Chromium se ejecuta desde la terminal
del usuario. Emular iPad/iPhone no equivale a probar Safari o dispositivos físicos.
Las acciones de ejemplos y el endurecimiento restante corresponden al punto 7.

## Fuentes y guía aplicada

- [Pyodide: carga de paquetes](https://pyodide.org/en/stable/usage/loading-packages.html),
  [JavaScript API](https://pyodide.org/en/stable/usage/api/js-api.html) y
  [bundlers](https://pyodide.org/en/stable/usage/working-with-bundlers.html): SDK,
  instalación compatible y archivos propios del runtime.
- [API de Jedi](https://jedi.readthedocs.io/en/latest/docs/api.html): `Script`
  analiza el texto; no se usa el namespace de objetos como un intérprete de sugerencias.
- Copia local de [modern-web-guidance](../../tmp/modern-web-guidance/skills/modern-web-guidance/SKILL.md):
  se mantiene el origen separado y la CSP del punto 5. Se consultó
  [conditional-async-dependencies](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/performance/conditional-async-dependencies.md):
  «wrap your conditional import() orchestration in a standard async function».
  Se secuencia SDK → paquetes → núcleo desde el Worker; no se introduce una
  cadena de top-level await en módulos hermanos del sitio.
