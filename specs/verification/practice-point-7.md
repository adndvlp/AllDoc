# Punto 7: ejemplos y recuperación

Estado: completado. Código, tipos, build, suite completa y comparación visual
independiente aprobados. La aceptación global permanece en el punto 8.

## Comportamiento

Las ocho variantes SQL y el ejemplo de pandas tienen IDs estables. Cada ficha
ofrece «Probar» con el nombre accesible «Probar este ejemplo: …». Abre la práctica
y prepara el código del ejemplo, sin ejecutarlo. La acción es explícita y
conserva una revisión anterior; no abre un modal de confirmación por ejemplo.
Los títulos, consultas y resultados editoriales se conservan.

«Opciones de código» agrupa «Restaurar código inicial», «Recuperar código
anterior» y, cuando falla la persistencia, «Reintentar guardado». La recuperación
cambia solo archivos y archivo activo: mantiene el dataset, el entorno actual
y una revisión monotónica. Restaurar código no ejecuta ni reinicia datos.
El foco llega al editor al terminar su montaje y vuelve al código después de
restaurar. Esc cierra las opciones antes de cerrar la práctica modal.

El borrador conserva como máximo un backup de código por workspace. Editar no
lo reemplaza; una sustitución idéntica no lo consume ni anuncia una recuperación
inexistente. Recuperarlo consume esa revisión anterior. Cada snapshot mantiene
el límite de 1 MiB y la validación de rutas/archivos. No se persisten resultados
ni el heap de Python.

IndexedDB conserva el formato 1 con el campo opcional `previous`; los registros
anteriores siguen siendo válidos. Un backup corrupto o de otro workspace no
descarta el código principal válido. La escritura CAS guarda código y backup
juntos, incluida la copia de conflicto. La versión escrita y su backup se
capturan antes de esperar una escritura pendiente.

Si falla el guardado, ambos códigos permanecen en memoria. Reintentar crea otra
conexión y guarda la revisión actual, conservando la comparación CAS y los
registros de otras pestañas. No cambia recientes, favoritos ni la paleta.

## TDD y comprobaciones

- [Acciones y persistencia en rojo](practice-point-7-actions-red.json): nueve
  fallos funcionales antes de añadir sustitución, backup, recuperación y reintento.
- [IDs y presentación en rojo](practice-point-7-examples-red.json): faltaban los
  IDs SQL y las acciones accesibles; se conserva la comprobación editorial del
  punto 2, excluyendo únicamente los nuevos IDs de metadata.
- [Aviso sin backup](practice-point-7-noop-red.json): una sustitución idéntica
  no debe prometer recuperar un código anterior inexistente.
- [UI roja](practice-point-7-ui-red.json): el botón de ejemplo todavía no existía.
- [Foco](practice-point-7-focus-red.json): el código se preparaba, pero intentar
  enfocarlo antes del montaje asíncrono de CodeMirror dejaba el foco fuera.
- [Menú](practice-point-7-menu-red.json): el `summary` existía, pero faltaba su
  rol de botón en la consulta accesible. Se conserva su apertura nativa.
- [Intención tras la descarga fallida](practice-point-7-load-intent-red.json):
  reintentar antes de tener editor perdía el ejemplo elegido y cargaba `SELECT *`.
  El controlador conserva la solicitud hasta aplicarla, ligada al concepto y
  workspace; cerrar o cambiar de contexto descarta esa sustitución pendiente.

La [primera comprobación en celular](practice-point-7-smoke-green.json) pasó
los cinco casos: apertura sin ejecución, backup tras recargar, datos mutados
conservados al restaurar código, fallo del Worker con reintento y recuperación
de IndexedDB real tras un bloqueo. La captura del menú al 200% fue revisada.

La [comprobación ampliada en celular](practice-point-7-cellular-green.json)
pasó los siete casos, sin omisiones, fallos ni casos inestables. Añade el ejemplo
de pandas sobre su VM viva y la recuperación del ejemplo después de fallar la
primera descarga del panel, sin ejecución automática.

La primera ejecución completa se detuvo durante la preparación de pandas.
El [diagnóstico de descarga](practice-point-7-download-regression.json) conserva
la respuesta HTTP 200 de Jedi con `net::ERR_INVALID_CHUNKED_ENCODING`; no se
cuenta como fase roja funcional ni como fallo de las mutaciones del programa.
Se extrajo el handler estático y se añadió una [prueba HTTP roja](practice-point-7-http-red.json)
que mostraba la respuesta sin longitud fija. Ahora GET/HEAD anuncian el tamaño
exacto y el GET entrega los bytes binarios intactos sin transferencia chunked.
La prueba usa `ServerResponse` real con un socket en memoria, sin abrir puertos.
Se conservan la whitelist de archivos, MIME, caché y CSP. La [prueba HTTP y el
caso de pandas corregidos](practice-point-7-http-green.json) pasaron: variables,
mutaciones, inspección y reinicio de la VM se comprobaron en el tamaño de 320 px.

Pasan 175 pruebas de código, con las pruebas reales de SQLite/Pyodide anteriores.
Los [registros de código, tipos y build](practice-point-7-code-green.json)
conservan sus salidas y hashes de las fuentes y herramientas comprobadas.

La [suite completa con actualización](practice-point-7-ui-update.json) pasó
558 casos, con nueve omisiones previstas, sin fallos ni casos inestables. Incluye
los 49 casos de acciones de ejemplos en los siete tamaños. Se revisaron 97
capturas: 90 modificadas y siete nuevas del menú al 200%. Hay 165 referencias;
se conservaron sus hashes y los de las herramientas antes de comparar.

La [comparación independiente](practice-point-7-green.json) pasó también 558
casos, con nueve omisiones previstas, sin fallos ni casos inestables. Se
verificaron la misma fuente, las mismas herramientas y las 165 referencias
sin cambios. La ejecución no recibió `--update-snapshots` y no actualizó
las imágenes revisadas.

El [inventario de producción](../../benchmarks/runs/2026-11-14T20-23-27-832Z-f45b8f014c/README.md)
registra 159643 bytes gzip de JS inicial y 22566 de CSS: 411 bytes más en conjunto
que el punto 6. El incremento frente al punto 3 es de 4908 bytes, dentro de los
5 KiB propuestos. Es una medición de archivos; no acredita latencia ni INP.

## Guía aplicada y límites

Se consultó la copia local de [modern-web-guidance](../../tmp/modern-web-guidance/skills/modern-web-guidance/SKILL.md).
La búsqueda por CLI no estaba en el caché de npm (`ENOTCACHED`); se leyó el
contenido local de [content-first-noise-reduction](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/content-first-noise-reduction.md).
Se aplicó «Use non-blocking messages for everything else»: la sustitución ofrece
una revisión recuperable y las acciones secundarias quedan en un desplegable,
con avisos de estado en lugar de interrumpir cada ejemplo con una confirmación.
Se mantiene el encabezado fijo y el scroll de AllDoc conforme a las preferencias
del usuario; no se aplica la sugerencia de ocultarlo al desplazar.

La sandbox devuelve EPERM al abrir el servidor local; las comprobaciones de
Chromium se ejecutan desde la terminal del usuario. Los viewports emulados no
acreditan Safari ni dispositivos físicos. La aceptación y medición global
de rendimiento permanecen en el punto 8.
