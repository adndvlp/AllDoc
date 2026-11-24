# Punto 9 · Cierre de SQL

Punto completado. Los resultados por ejecución están en `benchmarks/sql-verifications/` y el [acta de cierre](sql-point-9/closure.json) conserva los hashes de la evidencia.

La [verificación final](sql-point-9/native-final.json) aprobó 420 pruebas de código, los tipos y los builds de la app y del runtime. El inventario editorial y la auditoría de entrega se ejecutaron sobre la misma fuente que la comparación final de Chromium.

La primera captura específica de SQL pasó los 60 casos en Firefox 159 y WebKit 27.2. Se revisaron las 36 imágenes de los seis proyectos y se incorporaron como referencias con los mismos hashes. [Revisión visual](sql-point-9/sql-visual-review.json).

La primera comparación pasó 24 casos y falló las 36 comprobaciones visuales al buscar las referencias en la raíz del proyecto. La configuración corregida usa la carpeta revisada cuando la ruta de candidatas está vacía. Playwright reprodujo el fallo con una referencia de prueba y después verificó las rutas de comparación y captura. Ese ajuste conservó los hashes de las 36 imágenes. [Rojo](sql-point-9/red-ruta-referencias.log), [verde](sql-point-9/green-ruta-referencias.log).

La segunda comparación pasó 57 de 60 casos. Las tres diferencias fueron en el mismo ejemplo con JOIN. El desplazamiento horizontal residual del editor cambiaba la posición de la consulta y del menú aunque las sugerencias coincidían. La prueba ahora fija el origen de la vista antes de abrir el menú y verifica esa posición. La nueva captura se limita a los seis casos de JOIN.

Los seis casos de JOIN pasaron la comparación con los tres PNG revisados. Junto con los 54 casos fuera de JOIN ya aprobados, la comparación de SQL cubre los 60 casos de Firefox y WebKit. [Revisión de JOIN](sql-point-9/sql-join-review.json), [comparación](sql-point-9/sql-comparison.json).

En la suite visual de la app se corrigieron dos supuestos de los recorridos anteriores. La búsqueda de «filtrar» incluye ahora WHERE y una ficha de subconsultas, así que la prueba comprueba la ruta exacta de WHERE. Para fotografiar los datos tras ejecutar, la prueba vuelve al inicio del panel de práctica y verifica que la tabla esté a la vista. Pasaron los 12 casos afectados y las seis portadas con 153 conceptos de SQL. La comparación final pasó los 26 casos y conservó los hashes de las 52 imágenes revisadas. [Revisión de la app](sql-point-9/app-visual-review.json), [comparación](sql-point-9/app-visual-comparison.json).

La matriz funcional pasó inicialmente 160 casos de 168. Los ocho fallos estaban en dos recorridos que intentaban medir el editor o la tabla antes de llevarlos a la vista. Ahora las pruebas desplazan el cuerpo de práctica y comprueban el acceso al código al 200% y el desplazamiento horizontal de la tabla sin mover el lector ni el encabezado. Pasaron ambos recorridos en los seis proyectos. Los informes acreditan 156 casos conservados más esos 12 casos corregidos. [Matriz funcional](sql-point-9/functional-comparison.json).

Los 329 casos de captura Chromium pasaron. La revisión de sus 273 diferencias detectó que, a 320 px y al 200%, la reserva de espacio para copiar partía palabras como `VARCHAR2` y `PRIMARY`. Se incorporaron 246 referencias y se reservaron las 27 diferencias de zoom. En fichas SQL muy estrechas, el control de copiar se coloca debajo del bloque y los identificadores conservan su forma. El desbordamiento horizontal queda dentro del bloque de código. La prueba nueva comprueba la palabra completa y la posición del control. [Revisión de Chromium](sql-point-9/chromium-visual-review.json), [defecto observado](sql-point-9/narrow-code-red.json).

Los 35 casos de zoom Chromium pasaron con el código legible. En la comprobación equivalente en WebKit, el selector nativo quedó en 38 px y falló la exigencia de 44 px. Tras ajustar su apariencia en la ficha estrecha, pasaron los nueve casos afectados de Chromium y los seis de Firefox/WebKit. Se revisaron las capturas resultantes. [Evidencia del ajuste](sql-point-9/narrow-code-green.json).

La primera comparación de zoom pasó cinco de seis casos. En WebKit tableta, el bloque apareció 11 px más arriba en la imagen. Las comprobaciones del ancho, la palabra completa, el foco y la altura del selector se cumplieron. El test ahora alinea el inicio del bloque dentro del lector y comprueba que la página sigue en su posición. [Evidencia de la diferencia](sql-point-9/zoom-alignment-red.json).

El ajuste inicial de encuadre pasó las siete capturas Chromium y cinco en Firefox/WebKit. WebKit estrecho reajustó el lector después de calcular el desplazamiento inicial. La prueba ahora espera las fuentes y vuelve a medir tras dos cuadros de animación. WebKit estrecho y tableta fijan el mismo tamaño de 320×568 con emulación táctil y comparten la referencia revisada de ese estado. Pasó la comparación de los seis proyectos Firefox/WebKit. [Revisión del encuadre](sql-point-9/zoom-alignment-review.json).

La comparación completa de Chromium ejecutó los 882 casos. Pasaron 865 y se registraron nueve omisiones previstas. Siete diferencias de `CREATE TABLE` eran de un píxel tras el ajuste del selector. Se revisaron las imágenes producidas por el build final. En iPad horizontal, pandas mostró el mismo borrador con dos píxeles de desplazamiento del panel. La prueba fija el inicio del panel antes de capturar. Los ocho casos pasaron la comparación dirigida. El cierre consolida 873 aprobados y nueve omisiones previstas en los siete tamaños. [Comparación Chromium](sql-point-9/chromium-comparison.json).

Tres omisiones corresponden al separador en modo modal. Sus controles se comprueban en los tamaños con panel acoplado. Dos corresponden al giro en equipos sin emulación táctil. El giro se prueba en los cinco proyectos táctiles. Las otras cuatro corresponden al scroll del sidebar fijo en tamaños que usan el panel móvil. Las pruebas de temas móviles y las de scroll con sidebar fijo aportan cobertura para ambas disposiciones.

| Criterios | Evidencia |
| --- | --- |
| SA-01 a SA-03 | Inventario de 99 fuentes, 11 vacíos resueltos, 34 grupos y 153 fichas. Los 166 ejemplos se ejecutan con SQLite WASM desde la semilla en las pruebas de los tres bloques. |
| SA-04 y SA-12 | Auditoría de las 996 combinaciones entre ejemplo y dialecto. Comprueba fuente oficial, versión, explicación y tipo de acción. La ejecución que acreditan los ejemplos corresponde a SQLite. |
| SA-05 a SA-13 | Pruebas de catálogo y rutas compartidas, dataset relacional, transacciones, regiones, adaptación, completado, ejecución explícita, recuperación y pandas. Ver informes de cada suite. |
| SA-14 | Cumplido. Auditoría de carga diferida e inventario de JS/CSS. Los 14 escenarios de completado cumplen el presupuesto de 100 ms con 30 muestras cada uno. [Mediciones](sql-point-9/measurements.json). |
| SA-15 | Fallos funcionales y comprobación posterior en [rojo](sql-point-9/red-muestras.log) y [verde](sql-point-9/green-muestras.log). Se acreditan 873 aprobados y nueve omisiones en Chromium, 168 funcionales y 26 visuales de Firefox/WebKit y 66 casos específicos de SQL en estos dos motores. Los informes conservan los hashes de las referencias revisadas. |

## Revisión editorial y de fuentes

El inventario generado vincula cada ejemplo con su ficha, la salida SQLite y las variantes documentales. Cada variante incluye las URL, versión declarada, forma de ejecución y hash del SQL. Los casos revisados incluyen LIMIT sin orden garantizado, TOP y FETCH FIRST, FULL OUTER JOIN y sus alternativas, marcos de ventana con empates y confirmaciones implícitas en transacciones.

- Consultas y límites. [SQLite](https://sqlite.org/lang_select.html), [PostgreSQL 19](https://www.postgresql.org/docs/19/sql-select.html), [MySQL 9.7](https://dev.mysql.com/doc/refman/9.7/en/select.html), [SQL Server 2025](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17), [MariaDB](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select), [Oracle Database 26](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html).
- Casos de JOIN, ventanas y transacciones. [JOIN en MySQL](https://dev.mysql.com/doc/refman/9.7/en/join.html), [ventanas en SQLite](https://sqlite.org/windowfunctions.html), [transacciones en SQLite](https://sqlite.org/lang_transaction.html), [confirmación implícita en MySQL](https://dev.mysql.com/doc/refman/9.7/en/implicit-commit.html).

## Verificación

| Comando | Alcance |
| --- | --- |
| `npm run verify:sql -- --list` | Descubrimiento sin inicio de navegadores ni escritura en el informe habitual de Playwright. |
| `npm run verify:sql -- --code-only` | Código, tipos, inventario editorial, build, runtime y auditoría de rutas y carga diferida. |
| `npm run verify:sql -- --suite=sql --capture` | Casos actuales de SQL en Firefox y WebKit, en estrecho, tableta y escritorio. Candidatas en el directorio de la ejecución. |
| `npm run verify:sql -- --suite=visual --capture` | Candidatas de la suite visual de Firefox y WebKit para la app completa. |
| `npm run verify:sql -- --suite=chromium --capture` | Candidatas de los siete tamaños Chromium. Admite `--project` y `--grep` para acotar la ejecución. |
| `npm run verify:sql -- --suite=functional` | Matriz funcional de la app en los seis proyectos Firefox y WebKit. |
| `npm run verify:sql -- --measure` | Apertura, escritura, navegación, dialecto y completado en un build de producción. |

Cada ejecución con `--capture` toma imágenes nuevas en el directorio de candidatas. El archivo `changed-references.json` identifica cambios y adiciones por hash. Las referencias visuales de este cierre van en `tests/sql-browser/app-screenshots` y las de la matriz histórica permanecen en su directorio original. Tras aprobar las imágenes se trasladan a su destino y se comparan con `--update-snapshots=none`. La comparación exige los mismos casos descubiertos, cero reintentos y las omisiones justificadas de Chromium.

El descubrimiento actual incluye 882 casos Chromium, 168 funcionales Firefox/WebKit, 26 visuales Firefox/WebKit y 66 casos SQL específicos en esos dos motores. Los 66 incluyen los seis casos de lectura al 200% añadidos durante la revisión visual. Los conteos de aprobación y omisión se toman del informe de cada ejecución.

## Rendimiento

La [referencia anterior a SQL](sql-point-9/baseline.json) conserva el origen y hash de los inventarios. En la portada y SELECT, el JS inicial comprimido pasó de 159 651 a 195 733 bytes y el CSS de 22 566 a 23 260 bytes en el build final del ajuste de zoom. La auditoría encontró 313 páginas y 38 chunks de cuerpos, con cero cuerpos de apuntes en la carga de portada.

Las mediciones usan el tiempo del evento hasta observar el cambio en el DOM y el siguiente cuadro de animación. El celular de referencia usa 390×844 y CPU 4×. La laptop usa 1280×800 y CPU 1×. Se mide el menú real con palabra clave, columna, prefijo, acceso calificado, alias con JOIN, CTE y columna añadida al esquema. La medición de concepto y dialecto describe su latencia de laboratorio. Las series de laboratorio y la matriz de navegadores corresponden a dispositivos emulados por Playwright.

Las mediciones se tomaron antes del ajuste CSS de lectura estrecha. Ese ajuste se aplica en fichas SQL con un área de contenido de hasta 10 rem. Las dos vistas de medición se configuran con texto al 100% y un área mayor de 10 rem.

| Medida (ms) | Celular | Laptop |
| --- | ---: | ---: |
| Mayor p95 de completado entre los siete escenarios | 83.7 | 85.4 |
| Volver a abrir el editor preparado, p95 | 32.0 | 32.6 |
| Cambiar de dialecto, p95 | 28.9 | 27.5 |
| Cambiar de concepto, p95 | 44.9 | 32.2 |
| Primera apertura hasta el editor | 423.4 | 97.6 |
| Primera apertura hasta SQLite listo | 526.8 | 181.6 |
