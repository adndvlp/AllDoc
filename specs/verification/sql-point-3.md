# SQL — punto 3: fichas SELECT → CAST y dialectos

Estado: **completado**. Implementación del
[tercer punto del SDD](../sql-sdd.md).
La [evidencia estructurada](sql-point-3/green.json) registra comprobaciones y hashes.

## Entrega

Se publican **53 destinos en los primeros 14 grupos**, de SELECT a CAST.
Incluyen definiciones, variantes del concepto, ejemplos de negocio y claves
breves. Las cinco identidades y URLs anteriores permanecen; los ocho IDs
de sus ejemplos también se conservan. Hay **61 ejemplos SQLite** con salidas
de referencia sobre `negocio-relacional@1`.

Se revisan las 32 fuentes de entrada de ese bloque. Una queda parcialmente
resuelta: el archivo original CAST mezcla conversión y concatenación; la
conversión ya se publica y la concatenación corresponde al punto 4. El
[registro editorial](sql-point-3/editorial-review.json) conserva cada origen,
hash y destinos publicados/pendientes. AS y Comentarios tienen la procedencia
adicional indicada en el inventario. Los originales y su snapshot no cambian.

Se explican las condiciones desconocidas con NULL, NOT IN con NULL, extremos
incluidos, desempates, multiplicación de filas, diferencias entre ON y WHERE,
ausencias de un JOIN externo y conversión real con CAST. Las referencias
tempranas a NULL tienen aclaración y enlace. No aparecen GROUP BY ni los
bloques editoriales posteriores antes de su entrega.

## Contenido modular y rutas

- [Metadata publicada](../../src/content/sql/published.ts): definiciones e
  identidades ligeras compartidas por navegación, búsqueda y fichas.
- [Cuerpos](../../src/content/notes/sql/): un módulo por grupo, con sus
  resultados de referencia separados. Las páginas MDX importan su grupo.
- [Renderer](../../src/components/SqlNotes/index.tsx): selector, ejemplos,
  acciones locales, descarga de datos, apartados y fuentes desplegables.
- [Preparación](../../scripts/prepare-sql-notes.mjs): genera los MDX y las
  salidas por grupo usando SQLite nativo. Las pruebas vuelven a ejecutar
  todo el SQL en SQLite WASM.

La identidad de un concepto se separa de `docId`, que identifica su archivo
para Docusaurus. Así, una Definición nueva puede vivir en
`between/definicion.mdx` y publicarse en `/sql/between`; sus enlaces de
catálogo y paginación siguen resolviendo correctamente. Los cinco archivos
históricos mantienen también sus IDs físicos. No se publican números de orden.

La auditoría encuentra **59 páginas y 14 chunks de grupo**. Los cuerpos
permanecen fuera de la carga de portada; el agregador completo `notes/sql.ts`
se usa para validación nativa, no desde las páginas. Dataset, editor y motor
conservan sus límites de carga diferida.

La reorganización jerárquica completa del catálogo/sidebar y la entrada
Lenguajes corresponden al punto 6. En esta entrega los apartados de cada
ficha permiten acceder a su grupo; un destino secundario abre ese despliegue.

## Seis dialectos y práctica

El selector aparece solo en SQL. Empieza en SQLite y conserva una selección
validada en `alldoc:sql-dialect:v1`. `?dialect=...` prevalece para esa navegación;
un valor desconocido o ambiguo muestra SQLite sin borrar una preferencia válida.
El almacenamiento bloqueado permite seguir seleccionando en memoria.

Se mantienen el concepto, el despliegue y el scroll al cambiar de dialecto.
Las variantes están en el módulo del grupo; no hay una petición asíncrona
por selección que pueda restaurar una respuesta antigua. Tampoco se sustituye
el borrador, se reinicia su VM ni se ejecuta código por seleccionar un dialecto.

Las diferencias incluyen TOP/FETCH y OFFSET, fechas explícitas, tipos de
CAST y ausencia de FULL OUTER JOIN nativo en MySQL/MariaDB. Las páginas sin
esa operación muestran una explicación, una alternativa y la descarga de
preparación; no producen SQL o resultados ficticios. Las funciones usan el
código declarado en cada variante, sin traducir el SQL libre del usuario.

Las acciones dicen **Probar en SQLite** o **Probar equivalente en SQLite**.
Preparan código solo al pulsarlas, sin ejecutarlo. El panel anuncia
**Motor local: SQLite**. Copiar conserva el SQL del dialecto documental.
Las salidas editoriales desplegables se muestran al elegir SQLite y se
identifican como resultados de ese motor con los datos iniciales.

La matriz tiene 138 celdas revisadas y 402 pendientes, de 540 totales. Se
revisan las 366 resoluciones de ejemplo/dialecto; dos corresponden a la
ausencia de FULL OUTER JOIN y el resto ofrece una acción SQLite declarada.
Las capacidades de los bloques posteriores siguen pendientes.

Las fuentes oficiales y sus versiones están en
[first-block-sources.ts](../../src/content/sql/first-block-sources.ts): SQLite
3.54.1, PostgreSQL 19, MySQL 9.7, SQL Server 2025 (17.x), MariaDB 12.3 y Oracle
Database 26. Es revisión documental; no acredita ejecución en esos cinco
servidores externos. La referencia MariaDB se contrasta también con su
[rama LTS vigente](https://mariadb.org/mariadb-server-12-3-11-8-11-4-and-10-11-q4-2026-maintenance-releases/).

## TDD y comprobaciones

La [fase roja nativa](sql-point-3/red.log) falla por publicación incompleta,
capacidades pendientes, selector sin comportamiento y salidas antiguas.
La [fase roja de UI](sql-point-3/ui-red.json) registra la ausencia del selector.

Durante la integración se conservan otros dos defectos comprobados:

- [Preset cliente](sql-point-3/red-client.log): el spread de Set del contrato
  anterior no conserva la matriz con Babel. Se usa Array.from y se prueban
  las acciones con el preset real de Docusaurus.
- [Texto cubierto](sql-point-3/ui-red-overlap.json): el botón de práctica
  cubría letras del recordatorio de Comentarios en celular. Se acorta la
  definición y su clave, conservando ambos ejemplos y el tamaño tipográfico.
  La nueva prueba comprueba las posiciones de las letras, no solo el alto
  de su contenedor.

El [caso sin salida verificada](sql-point-3/red-unverified.log) también falla
antes de impedir que habilite una acción local.

| Comprobación | Resultado |
| --- | --- |
| [Código](sql-point-3/native.log) | 368 aprobadas; [TAP](sql-point-3/native.tap) |
| [Tipos de aplicación](sql-point-3/types-app.log) y [pruebas](sql-point-3/types-tests.log) | Aprobados |
| [Build](sql-point-3/build.log) y [auditoría](sql-point-3/production.json) | Aprobados |
| [pandas nativo](sql-point-3/pandas.log) | Aprobado |
| [Selector y variantes](sql-point-3/ui-dialects-update.json) | 12 aprobadas en celular/laptop |
| [Primera regresión editorial](sql-point-3/ui-editorial-before-compact.json) | 86 aprobadas, dos omisiones previstas; anterior a la corrección de solapamiento |
| [Regresión con la corrección](sql-point-3/ui-editorial-update.json) | 88 aprobadas, dos omisiones previstas |
| [Comparación final](sql-point-3/ui-editorial-compare.json) | 88 aprobadas, dos omisiones previstas; sin actualizar capturas |

La suite nativa verifica las 61 consultas contra SQLite WASM, columnas y
filas exactas, tipos efectivos de CAST y casos límite de NULL, CASE y anti
join. También comprueba documentos, identidad, búsqueda, paginación,
unicidad de ejemplos, preferencias y compilación cliente.

Las pruebas de navegador afectadas cubren selector y enlace compartido,
preparación explícita, borrador, resultados, copiar, navegación, búsqueda,
datos vivos, error, cancelación, timeout, 320 px y texto al 200%. La regresión
pandas mantiene su dataset y sus resultados. Las dos omisiones son rotación
en laptop y scroll independiente del sidebar de escritorio en celular.

La aceptación de este punto usa Chromium de Playwright en celular/laptop.
Las referencias Firefox/WebKit y las evidencias históricas permanecen
intactas; la comparación global de tres motores y la medición son del punto 9.

Se inspeccionan 26 referencias modificadas y seis imágenes nuevas, con
selector, fuentes, grupos desplegados, datos/resultados, menú, paletas y
texto ampliado. Las otras 195 referencias conservan sus bytes, incluidas
las 52 de Firefox/WebKit. La [revisión visual](sql-point-3/visual-review.json)
registra el conjunto y sus hashes. No se aumenta el umbral de comparación
ni se aceptan reintentos como aprobación.
