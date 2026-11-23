# SQL · punto 8: autocompletado y ejecución

Estado: punto 8 completado. Pasan 415 pruebas de código, tipos y builds. La comparación final de navegador termina con 83 aprobados y una omisión prevista por el separador inexistente en modo modal. Las cuatro capturas nuevas revisadas conservan sus hashes y las 265 referencias previas permanecen intactas.

La entrega conserva el parser y las palabras clave de CodeMirror SQL. El proveedor actual permite acceder a columnas mediante el nombre de tabla o un alias calificado, pero no obtiene columnas del FROM para un SELECT sin calificar. Tampoco resuelve las proyecciones de CTE/subconsultas. La prueba inicial del adaptador solo cubría `SELECT ventas.`; no acreditaba el caso que necesita el usuario.

Se evalúan el [proveedor oficial de esquema](https://github.com/codemirror/lang-sql/blob/main/src/complete.ts) y la implementación instalada de `@codemirror/lang-sql@6.10.0`. El nuevo proveedor usa su árbol sintáctico y el esquema vivo, conservando el proveedor oficial de tablas y el de palabras clave. Se carga en el chunk SQL al necesitarlo; no se añaden dependencias ni se modifica el perfil Python.

El resolutor distingue sentencias, fuentes y alias de cada SELECT. Ofrece columnas de las fuentes resueltas, califica nombres ambiguos de JOIN, mantiene los calificadores al insertar y reemplaza el identificador completo aunque el cursor esté dentro del prefijo. Antes de FROM ofrece alternativas con su tabla identificada. Reconoce proyecciones sencillas de CTE/subconsultas: columnas conocidas, alias AS explícitos, columnas declaradas y comodines; no evalúa expresiones para inventar nombres. La recursión de análisis está acotada. Comentarios y literales no generan sugerencias de esquema.

El adaptador conserva opciones de esquema y palabras clave con rangos compatibles, filtra prefijos antes del límite de representación y conserva las identidades del protocolo. El gestor rechaza respuestas del workspace, archivo, revisión, generación o esquema anteriores. Ejecutar durante la preparación no encola trabajo. Tras perder el entorno por cancelación o timeout, la siguiente acción habilitada prepara otro motor y ejecuta el código conservado; los atajos adicionales durante esa carga se descartan. El atajo comprueba `compositionStarted`, también antes del primer cambio IME, y no cae en el binding de insertar una línea vacía; Enter sin modificadores conserva su comportamiento.

## Evidencia TDD

- [red-completion-confirmed.log](sql-point-8/red-completion-confirmed.log): ocho pruebas fallidas y dos aprobadas sobre el lenguaje real de CodeMirror. Cubre columnas sin alias, inserción de prefijos/cursor intermedio, JOIN ambiguo, alternativas antes de FROM, proyecciones, alcances, comentarios/literales y serialización del adaptador. Alias calificados y nombres entre comillas ya funcionan. Se aceptan ambos delimitadores válidos de SQLite, sin imponer un estilo de comillas.
- [red-execution-schema.log](sql-point-8/red-execution-schema.log): dos fallos reales; el controlador encolaba una ejecución solicitada durante la preparación y la inspección de un CREATE no proporcionaba columnas sin calificar.
- [green-execution.log](sql-point-8/green-execution.log): la sesión rechaza ejecutar si el motor no está listo; su suite completa pasa. La preparación no deja trabajo pendiente.
- [ui-red.json](sql-point-8/ui-red.json): el editor real no ofrece `precio` en `SELECT pre FROM productos;`.
- [red-boundaries.log](sql-point-8/red-boundaries.log): las comas de ORDER BY no deben convertirse en posiciones de tabla; FROM/JOIN incompletos sí ofrecen tablas.
- [red-ambiguous-prefix.log](sql-point-8/red-ambiguous-prefix.log): el prefijo `nom` conserva las candidatas calificadas `p.nombre`/`v.nombre` del adaptador.
- [red-stale-schema.log](sql-point-8/red-stale-schema.log): una inspección nueva invalida una respuesta pendiente del esquema anterior aunque no cambie la revisión del texto.
- [ui-first.json](sql-point-8/ui-first.json): ocho aprobados y seis fallidos. CTE/tablas fallaban por la transformación de iteradores del preset cliente; IME permitía ejecutar antes del primer cambio de la composición.
- [ui-corrections-green.json](sql-point-8/ui-corrections-green.json): los seis casos fallidos pasan en celular/laptop, sin omisiones ni reintentos; las cuatro capturas revisadas y las 265 referencias previas conservan sus hashes.
- [ui-regression-first.json](sql-point-8/ui-regression-first.json): 75 aprobados, una omisión prevista y ocho fallos de recuperación. El guard nuevo exigía un recurso ya preparado antes de permitir la reconstrucción explícita tras cancelar/timeout.
- [red-recovery.log](sql-point-8/red-recovery.log): dos pruebas reproducen la pérdida de esa reconstrucción. Cada una cubre SQL y pandas. [green-recovery.log](sql-point-8/green-recovery.log): 39 comprobaciones de sesión/preset cliente aprobadas; se reconstruye una sola vez, conserva el código y descarta otro atajo mientras carga.
- [red-client-iterators.log](sql-point-8/red-client-iterators.log): reproduce el `replaceAll` sobre un valor no string bajo el preset real. Las conversiones Map/Set usan `Array.from` en vez de spread de iteradores.
- [green-client.log](sql-point-8/green-client.log): 66 comprobaciones focalizadas aprobadas, incluido el preset cliente.
- [native.log](sql-point-8/native.log): 415 aprobadas, sin fallos.
- [Tipos de aplicación](sql-point-8/types-app.log), [tipos de pruebas](sql-point-8/types-tests.log), [build de aplicación](sql-point-8/build.log) y [build del runtime](sql-point-8/build-runtime.log) aprobados.
- [production.json](sql-point-8/production.json): 313 páginas, 38 assets de cuerpos y ninguno cargado por la portada; sin errores de auditoría.
- [visual-review.json](sql-point-8/visual-review.json): cuatro capturas de columnas/JOIN revisadas; las 265 referencias anteriores permanecen iguales.
- [comparison.json](sql-point-8/comparison.json) y [ui-regression-compare.json](sql-point-8/ui-regression-compare.json): 83 aprobados, una omisión prevista, cero fallos y cero casos inestables en celular/laptop, sin actualizar referencias. Incluye la inserción real mediante toque/teclado, selección y documento en macOS/Windows, IME, preparación y recuperación real de SQL/pandas tras cancelación/timeout.
- [screenshots-before.json](sql-point-8/screenshots-before.json): hashes de las 265 referencias previas al punto 8.

## Cierre

`npm run test:ui:sql:completion:regression` completó los 84 casos de cinco archivos en celular/laptop: 83 aprobados y una omisión prevista. Incluye las pruebas nuevas y las existentes de SQLite, edición/historial, acciones y pandas. El informe está archivado y la comprobación posterior de hashes confirma que la comparación usó las cuatro capturas revisadas y no modificó ninguna referencia previa.

La revisión editorial, la matriz global de navegadores y la medición completa corresponden al punto 9.
