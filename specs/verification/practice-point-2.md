# Práctica — punto 2: dataset común y miniapunte pandas

Estado: completado con TDD. Pasaron 84 pruebas de código y 302 de UI, con seis
omisiones previstas, sin fallos ni resultados inestables. Se revisaron las
14 vistas pandas nuevas y las diez capturas existentes que cambiaron.

[Fase roja](practice-point-2-red.json) ·
[Roja de paginación explícita](practice-point-2-red-pagination.json) ·
[Contenido SQL previo](practice-point-2-before.json) ·
[Evidencia verde e integridad](practice-point-2-green.json) ·
[SDD](../practice-sdd.md).

## Datos y materialización

`productos-basico@1` tiene tres columnas y tres filas, con precio entero:
Teclado/Accesorios/500, Mouse/Accesorios/250 y Monitor/Pantallas/3500.
El manifiesto describe el esquema sin importar filas; el módulo de filas es
inmutable y separado. SQL, pandas y sus resultados editoriales lo comparten.

| Archivo | Responsabilidad |
| --- | --- |
| [manifest.ts](../../src/practice/datasets/manifest.ts) | Identidad, versión, tabla y columnas, sin filas |
| [rows/products.ts](../../src/practice/datasets/rows/products.ts) | Fuente tipada e inmutable de los tres productos |
| [index.ts](../../src/practice/datasets/index.ts) | Resolver dataset/runtime y materializar bajo demanda con AbortSignal |
| [materialize.ts](../../src/practice/datasets/materialize.ts) | JSON, esquema, preparación SQL/Python y ejemplo pandas |

Cada llamada genera nuevos bytes y esquema. La modificación de una copia no
altera la fuente ni otra materialización. Dataset o runtime desconocidos se
rechazan; una operación abortada no prepara un entorno alternativo.

El bootstrap SQLite tiene formato JSON `alldoc/sql-seed@1`: una lista de
sentencias SQL y sus parámetros. El futuro adaptador ejecutará cada sentencia
enlazando esos valores; no debe tratar todo el JSON como SQL ni interpolar valores.
La prueba de comillas y texto SQL confirma que permanecen como datos.

El bootstrap Python lee los JSON con columnas y filas tipadas y crea `productos`
como DataFrame. Los precios siguen siendo enteros. No crea una columna `id`,
que modificaría SELECT *. Esta etapa materializa datos y contenido; todavía no
inicializa SQLite WASM o Pyodide en el navegador.

## Ficha y navegación

Se publica `/apuntes/analisis-de-datos/pandas/dataframe` dentro de Pandas, en
«Tablas y archivos». La definición describe una tabla y hay un solo ejemplo de
ocho líneas generado desde los datos canónicos. El resultado comienza cerrado;
el índice 0–2 aparece como encabezado de fila, separado de nombre/categoría/precio.

SQL y pandas comparten [ConceptNote](../../src/components/ConceptNote/index.tsx).
El wrapper SQL conserva sus selectores y la misma presentación. Se mantienen
las ocho consultas, resultados, explicaciones y metadata SQL, comprobados contra
el registro anterior. La paginación deriva de conceptos de la misma herramienta
y respeta un `null` explícito en frontmatter; SQL no pasa a DataFrame al llegar
a Comentarios.

El catálogo, sidebar, favoritos, recientes y búsqueda usan la nueva metadata;
son seis conceptos totales, cinco de SQL. Las categorías permanecen contraídas
y solo navegan los enlaces de conceptos. Los perfiles de práctica permanecen
pendientes: no aparece aún un editor o ejecución ficticia.

## TDD y comprobaciones actuales

La fase roja se ejecutó con todos los imports resueltos y stubs de comportamiento:
siete fallos funcionales de ocho casos. Faltaban tablas tipadas, DataFrame y
paginación por herramienta. Se conservó como aprobado el caso que protege el
contenido SQL previo. Un caso posterior confirmó que `??` reemplazaba un null
explícito de paginación; se corrigió distinguiendo null de undefined.

| Comprobación | Resultado |
| --- | --- |
| Pruebas de código | 84 aprobadas; ocho casos nuevos |
| Tipos de app y pruebas | Aprobados |
| `npm run test:practice-data` | Aprobado con Python 3.12.2 y pandas 2.3.2 del entorno |
| Verificación nativa pandas | Preparación, reinicio, ejemplo ejecutado, columnas, índice, precio entero y resultado editorial |
| Build aislado y auditoría | Aprobados; once páginas, un h1 por página y zoom permitido |
| Cuerpos y filas en el cargador de portada | Ninguno |
| HTML de DataFrame | Título único, Python resaltado, resultado cerrado e índice semántico comprobados |
| UI con actualización prevista | 302 aprobadas, seis omisiones, cero fallos e inestables |
| UI con comparación independiente | 302 aprobadas, seis omisiones, cero fallos e inestables |
| Capturas revisadas | 14 nuevas y diez cambios antes/después; 102 referencias totales |

Las versiones Python/pandas anteriores corresponden a la verificación nativa;
no fijan la futura versión del runtime Pyodide ni añaden una dependencia Python
al sitio. El comando nativo es adicional: `npm test` no exige pandas instalado.

El [build registrado](../../benchmarks/runs/2026-11-14T05-13-20-283Z-92941b4c8d/README.md)
se generó en modo bundle-only. Conserva partial porque no solicitó navegador;
no acredita tiempos o capturas nuevos. Su auditoría identifica `notes-sql`,
`notes-pandas` y `notes-data-products`, sin ninguno en el cargador de portada.
La regla de separación de chunks incluye ahora las filas compartidas para que
no terminen incidentalmente en un common solicitado por la portada.

Se escribieron dos casos UI nuevos antes de integrar la ficha: navegación desde
Pandas, búsqueda, favorito, copia real, tabla con índice y reflujo al 200%.
La suite existente se ajustó a seis conceptos y a DataFrame dentro de Pandas;
sus comprobaciones SQL y de contención permanecen.

Chromium no pudo iniciarse desde la sandbox. El usuario ejecutó desde su terminal
`npm run test:ui:update && npm run test:ui`; se conservaron el [informe de
actualización](practice-point-2-ui-update.json) y el de [comparación independiente](practice-point-2-ui-compare.json).
Ambos tienen 302 aprobadas, seis omisiones previstas y cero fallos o inestables.
El segundo conserva `updateSnapshots: default`, frente a `changed` del primero.
Las seis omisiones siguen siendo scroll de sidebar de escritorio en cuatro
tamaños compactos y rotación en laptop/escritorio.

La fuente congelada coincide con build y verificación:
`92941b4c8d7bd75022c9b0d3793d27e705975980c3eb2db2c0b03cac7d47781c`.
Se comprobaron también los hashes de las pruebas y de las 102 referencias.
La revisión incluyó las siete parejas normal/200%, un original de escritorio
y los diez cambios de catálogo/menú comparados con sus imágenes anteriores.
La ficha cabe completa en 390×844 a escala normal; pantallas cortas y ampliación
usan scroll del lector. No se observaron defectos nuevos.

El HTML de portada declara 156177 bytes gzip de JS frente a 154901 del punto 1:
1276 bytes adicionales, dentro del presupuesto propuesto de 5 KiB. El JS total
es 208659 bytes y el CSS 21120; el total incluye la nueva ruta y chunks diferidos,
no es la descarga inicial. El fragmento compartido de tres productos ocupa
246 bytes gzip y forma parte también de los ejemplos editoriales; se carga al
leer esas fichas, no desde la portada o el registro ligero. No se descargan
editor o motores de práctica, y no se incorporaron dependencias nuevas.

Esta etapa acredita datos, contenido y UI de las fichas. Los tiempos de ejecución
en Pyodide, el editor y el panel contextual se validarán en sus puntos respectivos;
la prueba nativa no los sustituye.

## Guías utilizadas

El CLI de Modern Web Guidance no estaba disponible en caché; se consultaron las
guías locales ya presentes en el proyecto. No se instalaron paquetes para leerlas.

- [content-first-noise-reduction](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/content-first-noise-reduction.md): mantuve el resultado secundario en details cerrado, siguiendo «It starts closed»; la ficha conserva un único ejemplo y no añade un editor activo.
- [respect-os-text-scale](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/accessibility/respect-os-text-scale.md): reutilicé tipografía relativa y wrapping, siguiendo «Test that text can be resized to at least 200%», con una prueba específica de la ficha nueva.
