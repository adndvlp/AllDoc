# SQL · punto 4: funciones de texto → CREATE TABLE

Estado: completado. Código, tipos, build y comparación UI sin actualizar referencias aprobados. 98 casos UI aprobados, dos omisiones justificadas y diez capturas revisadas.

Se publican 52 fichas nuevas en nueve grupos, con 55 ejemplos propios de negocio. El total pasa a 105 fichas SQL y 116 ejemplos. Cada programa se verifica íntegro en SQLite WASM desde `negocio-relacional@1` limpio; las salidas desplegables de DML/DDL corresponden al último SELECT del programa. La sesión libre del lector conserva sus cambios entre fichas y solo ejecuta por una acción explícita.

## Contenido y diferencias

- Texto: mayúsculas/minúsculas, caracteres frente a bytes, subcadena, TRIM, REPLACE escalar y concatenación. `LEN` excluye espacios finales; SQLite integrado convierte ASCII en UPPER/LOWER. [SQLite](https://sqlite.org/lang_corefunc.html), [SQL Server LEN](https://learn.microsoft.com/en-us/sql/t-sql/functions/len-transact-sql?view=sql-server-ver17), [MySQL](https://dev.mysql.com/doc/refman/9.7/en/string-functions.html).
- Números y agregación: división decimal, ROUND/ABS, COUNT con NULL, DISTINCT, ausencia de filas, SUM/AVG/MIN/MAX. La concatenación global precede a GROUP BY, con orden y separador explícitos en GROUP_CONCAT, STRING_AGG y LISTAGG. [SQLite](https://sqlite.org/lang_aggfunc.html), [PostgreSQL](https://www.postgresql.org/docs/19/functions-aggregate.html), [Oracle LISTAGG](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/LISTAGG.html).
- GROUP BY/HAVING y orden lógico: columnas agrupadas completas y distinción entre interpretación y plan físico. [SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17).
- INSERT/UPDATE/DELETE: ejemplos completos con resultado final, selección explícita del SELECT de comprobación y explicación del alcance sin WHERE. IGNORE no oculta fallos de FK en SQLite; REPLACE puede borrar e insertar, perder valores y propagar cascadas. Los dialectos sin esa semántica muestran explicación y enlace a su variante SQLite, sin apuntar a un anti join ajeno. [SQLite conflictos](https://sqlite.org/lang_conflict.html), [PostgreSQL INSERT](https://www.postgresql.org/docs/19/sql-insert.html), [MariaDB REPLACE](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/changing-deleting-data/replace).
- CREATE TABLE: tipos y afinidad, clave explícita e identidad por motor, NOT NULL, UNIQUE, DEFAULT, CHECK, una o varias FK, CASCADE y SET NULL. Oracle 26 incluye IF NOT EXISTS; SQL Server no lo incluye dentro de CREATE TABLE. [Oracle 26](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/CREATE-TABLE.html), [SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17).

Las variantes externas tienen revisión documental y fuentes fechadas/versionadas en `second-block-sources.ts`. No se han ejecutado servidores PostgreSQL, MySQL, MariaDB, SQL Server u Oracle. El panel continúa ejecutando SQLite. Las fuentes originales y su snapshot permanecen intactos: [revisión editorial](sql-point-4/editorial-review.json), 34 archivos cubiertos y diez vacíos completados. También se cierra la referencia a concatenación procedente del apunte original CAST.

## TDD y comprobaciones

| Comprobación | Evidencia | Resultado |
| --- | --- | --- |
| Rojo: faltan las 52 fichas/capacidades/programas | [red.log](sql-point-4/red.log) | Cuatro fallos funcionales |
| Rojo: alternativa específica del concepto | [red-alternative.log](sql-point-4/red-alternative.log) | Falta el destino SQLite |
| Rojo: búsqueda por nombres de otros dialectos | [red-search.log](sql-point-4/red-search.log) | CHAR_LENGTH no encuentra el concepto |
| Rojo: fecha explícita para DELETE | [red-dates.log](sql-point-4/red-dates.log) | Oracle recibe un literal dependiente de la sesión |
| Código | [native.log](sql-point-4/native.log) | 377 aprobadas |
| Tipos de aplicación y pruebas | [aplicación](sql-point-4/types-app.log), [pruebas](sql-point-4/types-tests.log) | Aprobados |
| Generación y build | [generación](sql-point-4/prepare.log), [build](sql-point-4/build.log) | 105 fichas, 116 resultados; build aprobado |
| Rutas, h1, zoom y cuerpos fuera de portada | [production.json](sql-point-4/production.json) | 111 páginas; ningún cuerpo cargado por portada |
| Regresión UI | [ui-editorial-update.json](sql-point-4/ui-editorial-update.json), [revisión visual](sql-point-4/visual-review-regression.json) | 98 aprobados, dos omisiones previstas; dos referencias del catálogo cambiadas, otras 225 intactas |
| Comparación final sin actualizar | [ui-editorial-compare.json](sql-point-4/ui-editorial-compare.json), [estado y hashes](sql-point-4/status.json) | Mismos cien casos: 98 aprobados y dos omisiones; diez capturas revisadas y otras 225 referencias sin cambios |
| UI focalizada | [ui-second-update.json](sql-point-4/ui-second-update.json), [revisión visual](sql-point-4/visual-review-new.json) | Diez casos aprobados, ocho capturas revisadas en celular/laptop |

Las pruebas ejecutan los programas completos mediante el parser del motor. No separan SQL por punto y coma ni reutilizan datos modificados por otro ejemplo. Además de comparar las salidas guardadas, comprueban valores independientes conocidos y rechazos reales de PK/UNIQUE/NOT NULL/CHECK/FK. El preset de Babel del cliente verifica las acciones de los seis dialectos para todo el corpus publicado.

## Cierre

`npm run test:ui:sql:editorial` completó la comparación final sin actualizar las referencias. Se comprobaron la identidad de los cien casos, la ausencia de errores globales/reintentos y los hashes de las imágenes revisadas frente a la ejecución anterior.

Las dos omisiones corresponden a rotación en laptop (se ejecuta en celular) y scroll de sidebar de escritorio en celular (se ejecuta en laptop). No se omite ningún caso del segundo bloque.

Las referencias previas están registradas en [screenshots-before.json](sql-point-4/screenshots-before.json). No se amplía el umbral visual. La matriz global de siete tamaños Chromium y Firefox/WebKit se mantiene para el punto 9; este documento no la acredita.

ALTER TABLE y los grupos posteriores quedan planificados. El catálogo jerárquico/área Lenguajes, el nuevo layout del panel y el completado de columnas pertenecen a los puntos 6–8.
