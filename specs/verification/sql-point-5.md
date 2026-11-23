# SQL · punto 5: ALTER TABLE → Transacciones

Estado: completado. Código, tipos, build y comparación UI sin actualizar referencias aprobados: 130 casos UI aprobados, dos omisiones justificadas y catorce capturas revisadas.

Se publican 48 fichas y 50 ejemplos nuevos. Los 34 grupos contienen sus 153 destinos completos y 166 programas verificados en SQLite WASM. Las cinco identidades anteriores permanecen estables. Se conserva la semilla `negocio-relacional@1` y el panel no cambia de motor al elegir un dialecto.

## Revisión editorial

- ALTER/DROP: añadir, renombrar y eliminar columnas/tablas, valores por defecto sobre filas existentes, condiciones de existencia y dependencias. SQL Server usa `sp_rename` y `ADD ... WITH VALUES` en los casos correspondientes. [SQLite](https://sqlite.org/lang_altertable.html), [SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-table-transact-sql?view=sql-server-ver17).
- Vistas: consulta nombrada, JOIN, creación condicional y reemplazo. PostgreSQL/MySQL/SQL Server no reciben `CREATE VIEW IF NOT EXISTS`; MariaDB y Oracle 26 sí lo admiten. PostgreSQL conserva las columnas anteriores al reemplazar y añade la nueva. SQL Server separa lotes con GO del cliente. SQLite prepara DROP seguido de CREATE. [PostgreSQL](https://www.postgresql.org/docs/19/sql-createview.html), [MariaDB](https://mariadb.com/docs/server/server-usage/views/create-view), [Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/CREATE-VIEW.html).
- Índices: simple/compuesto, UNIQUE, catálogo específico por RDBMS y eliminación. Un índice puede ayudar; el optimizador decide su uso. Se elimina la afirmación de que una segunda columna nunca puede aprovecharse. MySQL no recibe el DROP INDEX IF EXISTS de MariaDB. [SQLite y skip-scan](https://sqlite.org/optoverview.html#skipscan), [MySQL](https://dev.mysql.com/doc/refman/9.7/en/drop-index.html), [MariaDB](https://mariadb.com/docs/server/reference/sql-statements/data-definition/drop/drop-index).
- Subconsultas, conjuntos y CTE: escalares/listas/EXISTS/NOT EXISTS, duplicados, columnas compatibles, orden global y consulta nombrada por sentencia. Una CTE no se presenta como variable ni como materialización garantizada. Oracle 26 reconoce EXCEPT y MINUS. [PostgreSQL](https://www.postgresql.org/docs/19/queries-union.html), [SQLite WITH](https://sqlite.org/lang_with.html), [Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html).
- Ventanas: filas conservadas, partición y orden de cálculo separados del orden de salida, marcos ROWS/RANGE con empates, posiciones deterministas, RANK/DENSE_RANK y LAG/LEAD. [SQLite](https://sqlite.org/windowfunctions.html), [PostgreSQL](https://www.postgresql.org/docs/19/functions-window.html), [SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver17).
- Transacciones: COMMIT/ROLLBACK, bloque abierto entre ejecuciones, configuración de autocommit del cliente y diferencias de DDL. La transferencia SQLite comprueba una fila afectada tras débito y crédito; una violación NOT NULL con OR ROLLBACK revierte el bloque ante saldo insuficiente o cuenta ausente. Los ejemplos procedurales externos se copian y no habilitan preparación como SQLite. [SQLite](https://sqlite.org/lang_transaction.html), [conflictos](https://sqlite.org/lang_conflict.html), [PostgreSQL](https://www.postgresql.org/docs/19/tutorial-transactions.html), [MySQL DDL](https://dev.mysql.com/doc/refman/9.7/en/implicit-commit.html), [Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/26/lnpls/transaction-processing-and-control.html).

La [revisión del inventario](sql-point-5/editorial-review.json) cubre los 99 archivos originales con hashes y destinos; 33 pertenecen a este bloque. Los once vacíos quedan completos, incluido el de PARTITION BY/ORDER BY y marco de ventana. El snapshot original y las evidencias anteriores permanecen intactos. La matriz completa tiene 540 capacidades revisadas documentalmente (90 por seis dialectos). No acredita ejecuciones en cinco servidores externos.

## TDD y comprobaciones

| Comprobación | Resultado / evidencia |
| --- | --- |
| Rojo funcional | [red.log](sql-point-5/red.log): faltan fichas, variantes, búsqueda y secuencias del tercer bloque |
| Ajustes durante la fase verde | [green-first.log](sql-point-5/green-first.log): detecta alias ausentes y DROP INDEX condicional de MySQL; corregidos antes del cierre |
| Código | [native.log](sql-point-5/native.log): 386 aprobadas |
| Tipos | [aplicación](sql-point-5/types-app.log) y [pruebas](sql-point-5/types-tests.log): aprobados |
| Generación | [prepare.log](sql-point-5/prepare.log): 153 fichas, 166 salidas SQLite |
| Build y rutas | [build.log](sql-point-5/build.log), [production.json](sql-point-5/production.json): 159 páginas, un h1 por página y cero cuerpos de apuntes cargados por portada |
| Regresión interrumpida | [ui-editorial-crash.json](sql-point-5/ui-editorial-crash.json): Chromium se cerró en browserContext.newPage antes del caso al 200%; nueve aprobados, un cierre de página, un caso interrumpido y 121 sin ejecutar. No acredita fallo de las comprobaciones de la interfaz |
| Repetición focalizada tras el cierre de Chromium | [ui-reading-compare.json](sql-point-5/ui-reading-compare.json): navegación y texto al 200% aprobados en celular, un worker, sin actualizar referencias |
| Ajuste del test del buscador ampliado | [ui-editorial-search-failure.json](sql-point-5/ui-editorial-search-failure.json): la prueba exigía un solo resultado global para SELECT. Se exige ahora el concepto exacto y primer enlace; las comprobaciones de consulta, foco, Esc e IME se mantienen |
| Buscador tras el ajuste | [ui-search-update.json](sql-point-5/ui-search-update.json): veinte aprobados en celular/laptop con un worker. [Cuatro capturas modificadas revisadas](sql-point-5/visual-review-search.json) |
| Regresión completa | [ui-editorial-update.json](sql-point-5/ui-editorial-update.json): 130 aprobados, dos omisiones previstas; [seis capturas modificadas revisadas](sql-point-5/visual-review-regression.json), otras 229 referencias intactas |
| Comparación final sin actualizar | [ui-editorial-compare.json](sql-point-5/ui-editorial-compare.json), [estado y hashes](sql-point-5/status.json): mismos 132 casos, 130 aprobados y dos omisiones; catorce capturas revisadas y otras 229 referencias intactas |
| UI nueva | [ui-third-update.json](sql-point-5/ui-third-update.json), [revisión visual](sql-point-5/visual-review-new.json): doce casos aprobados, ocho capturas revisadas; las 235 referencias anteriores siguen intactas |
| Regresión afectada descubierta | [ui-editorial-discovery.log](sql-point-5/ui-editorial-discovery.log): 132 casos, incluyendo búsqueda y pandas; ejecución pendiente |

Cada programa SQLite se ejecuta completo desde semilla limpia mediante el parser real. Hay comprobaciones independientes para empates/marcos, saldo esperado y rollback ante cada cuenta ausente o insuficiencia de saldo; se verifica que el error no deje abierta la transacción. También se comprueban transacciones entre ejecuciones, DDL revertido en SQLite y rechazo UNIQUE real. Los resultados no se fabrican a partir de capturas.

El nuevo resultado de subconsultas al buscar «filtrar» es válido: WHERE sigue primero. Las pruebas del buscador seleccionan la identidad exacta para no confundir ambas fichas. No se cambia el algoritmo de búsqueda ni se ocultan coincidencias.

## Cierre

`npm run test:ui:sql:editorial -- --workers=1` completó los mismos 132 casos sin actualizar referencias. Se verificaron identidad de los casos, ausencia de errores globales/reintentos y hashes de las catorce capturas revisadas.

Las dos omisiones corresponden a rotación en laptop (se ejecuta en celular) y scroll del sidebar de escritorio en celular (se ejecuta en laptop). No se omite ningún caso del tercer bloque.

Las referencias previas están guardadas en [screenshots-before.json](sql-point-5/screenshots-before.json). La comparación global de siete tamaños y Firefox/WebKit pertenece al punto 9. No se modifican el umbral visual, el dataset, el layout del editor ni el completado de columnas.
