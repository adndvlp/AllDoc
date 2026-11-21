# Dataset SQL: negocio-relacional@1

Semilla fija de una empresa que vende productos: **13 tablas y 379 filas**.
Es el contexto inicial de SQL; `productos-basico@1` conserva las tres filas
y el esquema anteriores para pandas. Cambiar de apunte SQL reutiliza el mismo
entorno vivo y el mismo borrador.

El [manifiesto](../../src/practice/datasets/business-manifest.ts) fija columnas,
tipos, nulabilidad, valores predeterminados y restricciones. Las
[filas](../../src/practice/datasets/rows/business.ts) no dependen del reloj ni
del azar. El [registro de versión](../verification/sql-point-2/dataset.json)
incluye cantidades y SHA-256. Una modificación posterior de la semilla
publicada requiere otra versión.

## Tablas y relaciones

Todas las tablas tienen `id` como PK salvo las dos claves compuestas indicadas.
Los IDs se proporcionan explícitamente; no se declara identidad/autoincremento.

| Tabla | Filas | Relaciones y uso |
| --- | ---: | --- |
| categorias | 6 | `nombre` UNIQUE; `descripcion` opcional, DEFAULT NULL |
| proveedores | 6 | País y email opcional; dos proveedores sin productos |
| productos | 18 | `categoria` → categorias.nombre; proveedor opcional; precio, stock y activo |
| clientes | 24 | Email UNIQUE; ciudad, fecha de alta y teléfono opcional |
| departamentos | 4 | Nombre UNIQUE |
| empleados | 12 | Departamento; gerente opcional que referencia a empleados; salario y fecha de ingreso |
| pedidos | 48 | Cliente; empleado opcional; fecha y estado |
| detalle_pedidos | 96 | PK (pedido_id, producto_id); cantidad, precio unitario y descuento |
| pagos | 43 | Pedido; fecha, importe y método |
| almacenes | 3 | Nombre y ciudad |
| inventario | 54 | PK (almacen_id, producto_id); unidades |
| movimientos_stock | 41 | Producto, almacén y empleado opcional; fecha, tipo y cantidad |
| cuentas | 24 | Cliente UNIQUE; saldo y fecha de apertura |

`productos.categoria` referencia una columna de texto UNIQUE para conservar
el campo que ya usan los ejemplos y borradores. No existe un segundo
`categoria_id` modificable que pueda contradecirlo. Cambiar o borrar una
categoría referenciada requiere resolver sus productos primero.

Las FK se activan y se comprueban al preparar cada conexión SQLite. PK,
UNIQUE, NOT NULL, CHECK y DEFAULT se crean mediante DDL real. Los CHECK
impiden precios/stock/saldos negativos, cantidades e importes no positivos,
descuentos fuera de 0–100 y valores desconocidos en estados, métodos o tipos.

Eliminar un pedido elimina sus detalles y pagos; eliminar un proveedor deja
NULL en `productos.proveedor_id`. Eliminar un empleado deja NULL en pedidos
y movimientos que lo referencian, pero sus subordinados deben resolverse
primero. Inventario depende de productos con CASCADE y cuentas de clientes
con CASCADE. Las demás FK usan la acción restrictiva del motor.

## Representación

- Dinero: **enteros de pesos MXN**, sin centavos en esta semilla. `precio`,
  `precio_unitario`, `importe`, `salario` y `saldo` son INTEGER en SQLite;
  Oracle usa NUMBER(19,0). No se atribuye precisión decimal fija a REAL.
- `descuento`: porcentaje entero. El importe neto de una línea se calcula
  con `cantidad * precio_unitario * (100 - descuento) / 100.0`.
- Fechas: valores ISO `YYYY-MM-DD`, TEXT en SQLite y DATE en los scripts de
  los demás motores. Hay datos de distintos meses y años, entre 2023 y 2026.
- Booleanos: `activo` se materializa como entero 0/1, con CHECK y DEFAULT 1.
- Texto: Unicode. SQLite/PostgreSQL usan TEXT; SQL Server, NVARCHAR; Oracle,
  NVARCHAR2; MySQL/MariaDB, VARCHAR con utf8mb4 e InnoDB.
- NULL y cadena vacía son casos distintos en los teléfonos de SQLite y los
  motores que los distinguen. Oracle trata la cadena vacía como NULL; su
  exportación conserva esa semántica propia del motor.

Las existencias iniciales de cada producto coinciden con la suma de inventario.
La semilla no instala triggers de negocio: después de modificar datos, el
usuario puede construir sus propios controles o actualizar las tablas que
correspondan. Los movimientos representan las entradas de la instantánea
inicial, no un historial contable completo.

## Casos para practicar

Hay clientes sin pedidos y otros con varios; pedidos sin pagos, con un pago
parcial o con varios; productos sin ventas o sin proveedor; categorías sin
productos; gerentes y subordinados; salarios repetidos; valores NULL, cero,
cadena vacía y texto con acentos. Las ausencias conservan las FK válidas.

Esta consulta combina tres tablas, CTE, agregación y ranking. Suma importes
brutos de todos los pedidos; no descuenta ni excluye los cancelados:

```sql
WITH ventas AS (
  SELECT c.id, SUM(d.cantidad * d.precio_unitario) AS total
  FROM clientes c
  JOIN pedidos p ON p.cliente_id = c.id
  JOIN detalle_pedidos d ON d.pedido_id = p.id
  GROUP BY c.id
)
SELECT id, total, DENSE_RANK() OVER (ORDER BY total DESC) AS posicion
FROM ventas
ORDER BY total DESC, id;
```

Empieza con `(3, 17550, 1)`, `(6, 16450, 2)` y `(9, 11400, 3)`.
Los clientes 17 y 18 suman 2000 cada uno y comparten rango. Las pruebas
ejecutan esta consulta en SQLite WASM y comparan los números.

El usuario puede crear tablas/vistas, modificar filas y ejecutar BEGIN,
COMMIT y ROLLBACK en llamadas separadas. Inspeccionar Datos no confirma la
transacción. Reiniciar entorno reconstruye la semilla y conserva el código;
las reglas anteriores de cancelación, timeout y aislamiento siguen vigentes.

## Scripts para otros RDBMS

Los seis archivos están en
[`static/sql/datasets/negocio-relacional-1/`](../../static/sql/datasets/negocio-relacional-1/):
`sqlite.sql`, `postgresql.sql`, `mysql.sql`, `sqlserver.sql`, `mariadb.sql` y
`oracle.sql`. Se sirven desde `/sql/datasets/negocio-relacional-1/<motor>.sql`.
No requieren un servidor AllDoc ni contienen conexiones o credenciales.

Se importan una sola vez en una base o esquema de práctica vacío y con
codificación Unicode, utilizando el cliente del RDBMS elegido. No incluyen
DROP, CREATE DATABASE ni USE. Las tablas se crean en orden de dependencia y
los datos se insertan después. No se promete atomicidad del DDL entre motores;
MySQL y Oracle pueden confirmar operaciones de creación de tablas.

La sintaxis adapta identificadores, fechas, Unicode y transacciones.
Oracle usa identificadores entre comillas en mayúsculas para que las
consultas sin comillas resuelvan los nombres habituales. MySQL/MariaDB fijan
InnoDB para aplicar las FK y `SET NAMES utf8mb4` para leer el archivo UTF-8.

Los archivos se regeneran desde la misma semilla con:

```sh
node --experimental-strip-types scripts/export-sql-dataset.mjs
```

Se ha comprobado la importación completa del archivo SQLite. Los otros
cinco tienen validación del generador y revisión de sintaxis documental;
no se han ejecutado aquí en servidores de esos RDBMS.

Referencias consultadas: [SQLite FK](https://sqlite.org/foreignkeys.html),
[SQLite CREATE TABLE](https://sqlite.org/lang_createtable.html),
[PostgreSQL CREATE TABLE](https://www.postgresql.org/docs/19/sql-createtable.html),
[MySQL FK](https://dev.mysql.com/doc/refman/9.7/en/create-table-foreign-keys.html),
[MariaDB FK](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/optimization-and-indexes/foreign-keys),
[SQL Server CREATE TABLE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17)
y [Oracle literales](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Literals.html).

## Migración del borrador SQL

La primera apertura busca el borrador SQL `productos-basico@1` si no existe
ya el de `negocio-relacional@1`. Copia sus archivos y revisión sin ejecutarlos,
con la metadata del entorno nuevo. El registro original queda intacto y la
copia también se guarda como revisión anterior recuperable.

La escritura usa CAS con destino ausente: otra pestaña que haya creado o
editado el destino conserva su registro. La copia perdedora queda en el
almacén de recuperación. Una recarga no repite una migración ya guardada.
Un fallo de almacenamiento mantiene el código en memoria y permite reintentar;
cerrar durante la lectura no escribe un borrador vacío. No se migra pandas.
