# SQL — punto 2: dataset relacional y migración

Estado: **completado**. Entrega del [segundo punto del SDD](../sql-sdd.md).
La [evidencia estructurada](sql-point-2/green.json) registra resultados y hashes.
La [guía del dataset](../sql/negocio-relacional.md) documenta tablas, relaciones,
representación, consultas y uso de los scripts. Los puntos 3 a 9 siguen pendientes.

## Resultado

- SQL prepara `negocio-relacional@1`: trece tablas y 379 filas deterministas.
  La semilla incluye ventas, personal, inventario, pagos y cuentas, con
  ausencias válidas, NULL, cadenas vacías, ceros y empates de ranking.
- PK simples/compuestas, FK, UNIQUE, NOT NULL, CHECK, DEFAULT, CASCADE y
  SET NULL se materializan mediante DDL. SQLite activa y comprueba las FK
  antes de entregar la conexión. La preparación inicial es transaccional.
- Las consultas del usuario conservan sus transacciones entre ejecuciones;
  inspeccionar el esquema no hace COMMIT. Reiniciar elimina cambios y tablas
  creadas en esa sesión, conservando el código.
- El borrador SQL anterior se copia una vez sin ejecutarlo. El origen queda
  intacto; el destino guarda también una revisión recuperable. CAS evita
  sustituir la edición ganadora de otra conexión. Un fallo de almacenamiento
  conserva el código en memoria y admite reintento.
- Se publican seis scripts estáticos, con sintaxis propia para SQLite,
  PostgreSQL, MySQL, SQL Server, MariaDB y Oracle. No contienen DROP ni
  credenciales y no crean conexiones a servidores del usuario.
- pandas conserva `productos-basico@1`, sus columnas y tres filas. Sus fuentes
  originales y el lockfile no cambian; los hashes están en [dataset.json](sql-point-2/dataset.json).

El perfil y el entorno SQL declaran el nuevo dataset. El bootstrap resuelve
la semilla por el perfil y mantiene `consulta.sql` y `SELECT * FROM productos;`.
Las filas siguen en un chunk diferido: la auditoría de producción conserva
once páginas y los seis scripts publicados, sin añadir las filas al HTML
ni a los scripts iniciales de la portada.

## TDD

Se conservan los fallos funcionales anteriores a cada cambio:

- [Dataset y restricciones](sql-point-2/red-data.log): seis fallos; el caso
  independiente del registro demuestra que el materializador anterior
  aceptaba una FK inválida.
- [Migración](sql-point-2/red-migration.log): cuatro fallos de las expectativas
  de copia, CAS y respaldo. El quinto caso quedó cancelado porque todavía
  no se leía el origen; esa cancelación no se cuenta como un fallo funcional.
- [Empate de ranking](sql-point-2/red-ranking.log): el resultado exigido falla
  antes de introducir las dos ventas empatadas de la semilla final.
- [Exportaciones](sql-point-2/red-exports.log): el generador pendiente no
  produce aún los scripts pedidos.
- [Motor de exportación](sql-point-2/red-export-engine.log): MySQL/MariaDB
  no fijaban InnoDB; la corrección agrega el motor y `SET NAMES utf8mb4`.
- [Orden del preflight](sql-point-2/red-preflight-order.log): el verificador
  histórico comprobaba las capturas antes de avisar del navegador ausente.
  Ahora comprueba primero el motor seleccionado; conserva todos los
  controles de referencias y procedencia posteriores.

Los casos verdes están en la suite completa y en los registros enfocados de
[exportaciones](sql-point-2/green-exports.log) y
[preflight](sql-point-2/green-preflight-order.log).

## Comprobaciones

| Comprobación | Resultado |
| --- | --- |
| [Código nativo](sql-point-2/native.log) | 305 aprobadas, cero fallos u omisiones; [TAP](sql-point-2/native.tap) |
| [Tipos de aplicación](sql-point-2/types-app.log) y [pruebas](sql-point-2/types-tests.log) | Aprobados |
| [Build](sql-point-2/build.log) y [auditoría](sql-point-2/production.json) | Aprobados; once páginas, filas diferidas, seis SQL publicados |
| [pandas nativo](sql-point-2/pandas.log) | Bootstrap, reset, ejemplo, tipos y salida editorial conservados |
| [Casos nuevos en navegador](sql-point-2/ui-business-update.json) | Seis aprobados: dataset y migración en celular/laptop |
| [Regresión con actualización](sql-point-2/ui-regression-update.json) | 61 aprobados; una omisión prevista |
| [Comparación final](sql-point-2/ui-regression-compare.json) | 61 aprobados; la misma omisión; sin actualizar referencias |

Los casos nuevos usan SQLite WASM real, JOIN/CTE/ranking con cifras exactas,
errores FK, tablas libres y reinicio. La migración se comprueba con IndexedDB
real, recarga sin ejecución e independencia de dos conexiones con CAS.
La regresión mantiene selección, errores parciales, sugerencias, timeout,
cancelación, acciones de código, adaptación y almacenamiento.

La omisión corresponde al separador en el panel modal de celular; esa
disposición no tiene un separador que arrastrar. No hay reintentos, casos
inestables aprobados ni incremento del umbral de imágenes.

## Capturas y alcance comprobado

Se inspeccionaron cuatro imágenes nuevas de Datos/resultado del CTE y las
seis referencias SQL afectadas por el esquema y las filas adicionales.
Las otras 159 referencias Chromium previas conservan sus bytes. La
[revisión visual](sql-point-2/visual-review.json) guarda nombres y hashes.
Las referencias Firefox/WebKit y las evidencias históricas no se reescriben.

Estas ejecuciones usan Chromium de Playwright en viewports de celular y
laptop. No acreditan hardware físico ni una ejecución nueva de la matriz
completa Firefox/WebKit. Los ayudantes compartidos de sus pruebas se adaptan
al nuevo contexto SQL; la aceptación integral corresponde al punto 9.

El script SQLite se importa completo en una base real y se verifica su
integridad. Los otros cinco scripts se contrastan con el generador y con
documentación oficial; no se han arrancado servidores de esos RDBMS.

Los cuerpos editoriales actuales todavía muestran sus ejemplos anteriores;
la ampliación editorial, los controles de dialecto, el panel de tres regiones
y el completado contextual pertenecen a los puntos posteriores del SDD.
