# Snowflake

**Clave** `snowflake`

**Área** Análisis de datos e Ingeniería de datos (ubicación propuesta; no consta en el catálogo entregado).

**Resumen** Plataforma de datos en la nube para consultar, almacenar, transformar, compartir y gobernar datos con SQL y APIs.

**Alcance** Fundamentos, SQL del dialecto Snowflake, carga y ELT, almacenamiento, rendimiento, costos, seguridad, colaboración, Python/Snowpark, desarrollo y servicios especializados. Complementa las fichas de SQL de AllDoc: recupera lo común con ejemplos Snowflake y profundiza en las diferencias. Las fichas avanzadas con infraestructura externa enseñan el flujo y su comprobación, no sustituyen un laboratorio de administración.

**Entorno** Snowflake (servicio cloud), Snowsight o cliente SQL conectado a una cuenta; no MySQL Workbench ni SQLite. Los ejemplos son de elaboración propia y sus resultados son esperados, no ejecutados contra una cuenta. Algunas funcionalidades requieren permisos, edición, región, integraciones, paquetes o consumo de créditos. Revisar la disponibilidad antes de habilitarlas.

## Datos compartidos

Los ejemplos SQL usan `ALLDOC_LAB.PRACTICE` y `ALLDOC_WH`. En una cuenta de pruebas, un administrador puede crear estos recursos o asignar equivalentes. No ejecutar DDL sobre producción. Para cada ficha, ejecutar solo su ejemplo tras esta preparación. Los objetos auxiliares con prefijo `DEMO_` se crean en la ficha correspondiente; cuando una ficha depende de otra se indica. Los ejemplos administrativos son procedimientos condicionados a permisos, no requisitos para leer las fichas.

### Preparación del laboratorio

```sql
-- Un rol autorizado debe disponer de CREATE WAREHOUSE y CREATE DATABASE.
CREATE WAREHOUSE IF NOT EXISTS ALLDOC_WH
  WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
CREATE DATABASE IF NOT EXISTS ALLDOC_LAB;
CREATE SCHEMA IF NOT EXISTS ALLDOC_LAB.PRACTICE;
USE WAREHOUSE ALLDOC_WH;
USE DATABASE ALLDOC_LAB;
USE SCHEMA PRACTICE;
ALTER SESSION SET TIMEZONE = 'UTC';

CREATE OR REPLACE TABLE CUSTOMERS (
  CUSTOMER_ID NUMBER PRIMARY KEY, NAME VARCHAR NOT NULL,
  COUNTRY VARCHAR, SIGNUP_DATE DATE
);
INSERT INTO CUSTOMERS VALUES
 (1,'Ana','Mexico','2026-01-01'),(2,'Luis','Mexico','2026-01-05'),
 (3,'Marta','Spain','2026-01-10'),(4,'John','USA','2026-01-15'),
 (5,'Pedro','Mexico','2026-02-01'),(6,'Diego',NULL,'2026-02-02');
CREATE OR REPLACE TABLE ORDERS (
 ORDER_ID NUMBER PRIMARY KEY, CUSTOMER_ID NUMBER NOT NULL REFERENCES CUSTOMERS(CUSTOMER_ID),
 AMOUNT NUMBER(12,2) NOT NULL, ORDER_DATE DATE, STATUS VARCHAR, COUPON VARCHAR
);
INSERT INTO ORDERS VALUES
 (101,1,100,'2026-02-01','completed',NULL),
 (102,1,200,'2026-02-03','completed','SAVE'),
 (103,2,300,'2026-02-03','completed',NULL),
 (104,2,100,'2026-02-04','cancelled',NULL),
 (105,3,200,'2026-03-01','completed','SAVE'),
 (106,3,100,'2026-03-02','completed',NULL),
 (107,4,400,'2026-03-03','completed',NULL),
 (108,1,50,'2026-03-04','pending',NULL);
CREATE OR REPLACE TABLE PRODUCTS (PRODUCT_ID NUMBER PRIMARY KEY, NAME VARCHAR, CATEGORY VARCHAR, PRICE NUMBER(12,2));
INSERT INTO PRODUCTS VALUES (1,'Mouse','Electronics',100),(2,'Chair','Furniture',200),(3,'Desk','Furniture',300),(4,'Lamp','Furniture',50);
CREATE OR REPLACE TABLE ORDER_ITEMS (ITEM_ID NUMBER PRIMARY KEY, ORDER_ID NUMBER REFERENCES ORDERS(ORDER_ID), PRODUCT_ID NUMBER REFERENCES PRODUCTS(PRODUCT_ID), QUANTITY NUMBER, UNIT_PRICE NUMBER(12,2));
INSERT INTO ORDER_ITEMS VALUES (1,101,1,1,100),(2,102,2,1,200),(3,103,3,1,300),(4,104,1,1,100),(5,105,1,2,100),(6,106,1,1,100),(7,107,2,2,200),(8,108,4,1,50);
CREATE OR REPLACE TABLE LEADS (LEAD_ID NUMBER, EMAIL VARCHAR, SOURCE VARCHAR);
INSERT INTO LEADS VALUES (1,'ana@example.com','ads'),(2,'ana@example.com','organic'),(3,'luis@example.com','ads'),(4,NULL,'ads');
CREATE OR REPLACE TABLE EVENTS (EVENT_ID NUMBER, PAYLOAD VARIANT);
INSERT INTO EVENTS SELECT 1, PARSE_JSON('{"customer_id":1,"event":"purchase","items":[{"sku":"A","qty":2},{"sku":"B","qty":1}]}');
INSERT INTO EVENTS SELECT 2, PARSE_JSON('{"customer_id":2,"event":"visit","items":[]}');
```

Preparación reproducible: 6 clientes, 8 pedidos, 4 productos, 8 líneas, 4 leads y 2 eventos. Los seis pedidos completados suman 1300; febrero 600 y marzo 700. Pedro y Diego no tienen pedidos. Los importes de Ana, Luis y Marta empatan en 300 de ventas completadas; John suma 400. Las fechas están fijadas para no depender del día real. Las restricciones PK/FK en estas tablas estándar son informativas. Volver a ejecutar la preparación repone las tablas de muestra; no elimina otros objetos del laboratorio.

Para las fichas de carga, crear localmente `ventas.csv` con el siguiente contenido (UTF-8):

```csv
order_id,customer_id,amount,order_date,status,coupon
201,1,80,2026-03-05,completed,
202,2,120,2026-03-06,completed,SAVE
```

Para Python: `pip install "snowflake-connector-python[pandas]" snowflake-snowpark-python` en un entorno virtual. Configurar una conexión llamada `alldoc` en `connections.toml` con la cuenta, usuario, rol, warehouse, base y esquema anteriores y un método de autenticación permitido (por ejemplo SSO con `externalbrowser` si la organización lo admite). No guardar credenciales en los apuntes. Cada ejemplo Python que use `session` requiere una sesión abierta: `from snowflake.snowpark import Session; session = Session.builder.config("connection_name", "alldoc").create()`. Ejecuta la ficha antes de `session.close()`. Los ejemplos del conector abren y cierran su propia conexión.

## Arquitectura

**Clave** `arquitectura`

### Definición

**Clave** `definicion`

**Definición** Snowflake separa los datos persistentes, el cómputo y los servicios de control para que puedan administrarse independientemente.

**Búsqueda** Arquitectura; Definición; reconocer las tres capas

**Para recordar** Guardar datos no equivale a ejecutar consultas.

#### Reconocer las tres capas

1. Una tienda carga ORDERS al almacenamiento.
2. Un warehouse ejecuta el informe de ventas.
3. Cloud Services autentica, resuelve metadatos y coordina la consulta.

**Resultado esperado** Se distinguen almacenamiento, procesamiento y coordinación.

### Storage

**Clave** `storage`

**Definición** El almacenamiento conserva los datos de las tablas estándar en un formato columnar administrado por Snowflake.

**Búsqueda** Storage; comprobar tamaño registrado

**Para recordar** No tienes que administrar archivos de tabla ni discos del warehouse.

#### Comprobar tamaño registrado

```sql
SHOW TABLES LIKE 'ORDERS';
```

**Resultado esperado** Fila de ORDERS con metadatos como rows y bytes; los valores de almacenamiento dependen del servicio.

### Compute y Cloud Services

**Clave** `compute-y-cloud-services`

**Definición** Compute aporta CPU y memoria para procesar; Cloud Services coordina autenticación, catálogo, optimización y otros servicios.

**Búsqueda** Compute y Cloud Services; identificar el recurso de una sesión

**Para recordar** Dos warehouses pueden leer las mismas tablas sin compartir sus recursos de cómputo.

#### Identificar el recurso de una sesión

```sql
SELECT CURRENT_WAREHOUSE(), CURRENT_ACCOUNT();
```

**Resultado esperado** ALLDOC_WH y el identificador de tu cuenta.

### Organización y nube

**Clave** `organizacion-y-nube`

**Definición** Una organización agrupa cuentas; cada cuenta pertenece a una región y plataforma cloud (AWS, Azure o Google Cloud).

**Búsqueda** Organización y nube; consultar ubicación lógica

**Para recordar** Cuenta, región y edición condicionan servicios, conectividad y replicación.

#### Consultar ubicación lógica

```sql
SELECT CURRENT_ORGANIZATION_NAME(), CURRENT_ACCOUNT_NAME(), CURRENT_REGION();
```

**Resultado esperado** Nombre de organización, cuenta y región reales.

### Micro-partitions

**Clave** `micro-partitions`

**Definición** Snowflake divide automáticamente los datos de tablas estándar en unidades físicas columnares con metadatos.

**Búsqueda** Micro-partitions; consultar una sola fecha

**Para recordar** No se crean particiones manuales como en algunos motores.

#### Consultar una sola fecha

```sql
SELECT ORDER_ID FROM ORDERS WHERE ORDER_DATE = '2026-02-03' ORDER BY ORDER_ID;
```

**Resultado esperado** 102 y 103; en tablas grandes el filtro puede reducir las particiones escaneadas.

## Contexto y Snowsight

**Clave** `contexto-y-snowsight`

### Definición

**Clave** `definicion`

**Definición** Una sesión conserva el rol, warehouse, base y esquema que se usan al resolver nombres y ejecutar operaciones.

**Búsqueda** Contexto y Snowsight; Definición; ver el contexto

**Para recordar** Comprueba el contexto antes de ejecutar SQL.

#### Ver el contexto

```sql
SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();
```

**Resultado esperado** Rol autorizado, ALLDOC_WH, ALLDOC_LAB, PRACTICE.

### Database y Schema

**Clave** `database-y-schema`

**Definición** Una base contiene esquemas; un esquema contiene objetos como tablas y vistas.

**Búsqueda** Database y Schema; consultar sin depender del esquema activo

**Para recordar** El nombre completo es database.schema.objeto.

#### Consultar sin depender del esquema activo

```sql
SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS;
```

**Resultado esperado** 8.

### USE ROLE y USE WAREHOUSE

**Clave** `use-role-y-use-warehouse`

**Definición** USE cambia el rol o warehouse activo y también permite seleccionar base y esquema.

**Búsqueda** USE ROLE y USE WAREHOUSE; seleccionar recursos

**Para recordar** Cambiar de rol no concede permisos nuevos.

#### Seleccionar recursos

```sql
USE WAREHOUSE ALLDOC_WH;
USE DATABASE ALLDOC_LAB;
USE SCHEMA PRACTICE;
```

**Resultado esperado** Las consultas posteriores utilizan ese contexto. Para cambiar rol, usa USE ROLE seguido de un rol que te hayan asignado.

### Identificadores y mayúsculas

**Clave** `identificadores-y-mayusculas`

**Definición** Los nombres sin comillas dobles se normalizan a mayúsculas; entre comillas conservan su escritura por defecto.

**Búsqueda** Identificadores y mayúsculas; comparar alias

**Para recordar** Comillas simples para texto; dobles para identificadores.

#### Comparar alias

```sql
SELECT 1 AS total, 2 AS "Total";
```

**Resultado esperado** Columnas TOTAL y Total con valores 1 y 2.

### Snowsight y Worksheets

**Clave** `snowsight-y-worksheets`

**Definición** Snowsight permite explorar objetos, ejecutar SQL y revisar resultados e historial.

**Búsqueda** Snowsight y Worksheets; ejecutar la primera consulta

**Para recordar** El editor usa una cuenta real y puede consumir créditos.

**Nota** La navegación puede variar según la interfaz habilitada.

#### Ejecutar la primera consulta

1. Abre un editor SQL/worksheet disponible en Projects o Workspaces.
2. Selecciona el rol y ALLDOC_WH, ejecuta USE SCHEMA ALLDOC_LAB.PRACTICE.
3. Ejecuta SELECT COUNT(*) FROM ORDERS;

**Resultado esperado** Resultado de una fila con 8; la consulta queda en el historial.

### Notebooks

**Clave** `notebooks`

**Definición** Los notebooks combinan celdas SQL, Python y texto para análisis reproducible.

**Búsqueda** Notebooks; explorar ventas en un notebook

**Para recordar** El runtime y los paquetes determinan qué código puede ejecutarse.

#### Explorar ventas en un notebook

1. Crea un notebook de prueba con recursos autorizados.
2. En una celda SQL ejecuta SELECT SUM(AMOUNT) FROM ALLDOC_LAB.PRACTICE.ORDERS WHERE STATUS='completed'.
3. Revisa la tabla de salida y detén el runtime al terminar.

**Resultado esperado** 1300; el resultado queda asociado a la celda.

## Virtual Warehouses

**Clave** `virtual-warehouses`

### Definición

**Clave** `definicion`

**Definición** Un virtual warehouse es un recurso de cómputo independiente que ejecuta consultas, cargas y DML.

**Búsqueda** Virtual Warehouses; Definición; consultar warehouses disponibles

**Para recordar** Suspenderlo no borra las tablas.

#### Consultar warehouses disponibles

```sql
SHOW WAREHOUSES LIKE 'ALLDOC_WH';
```

**Resultado esperado** Una fila con tamaño, estado y parámetros del warehouse si tienes permisos.

### Sizing y scale up

**Clave** `sizing-y-scale-up`

**Definición** Aumentar el tamaño asigna más recursos a cada clúster para cargas que lo necesitan.

**Búsqueda** Sizing y scale up; cambiar tamaño en laboratorio

**Para recordar** Un tamaño mayor no garantiza aceleración proporcional.

**Nota** Requiere MODIFY y puede aumentar créditos mientras está activo.

#### Cambiar tamaño en laboratorio

```sql
ALTER WAREHOUSE ALLDOC_WH SET WAREHOUSE_SIZE='SMALL';
ALTER WAREHOUSE ALLDOC_WH SET WAREHOUSE_SIZE='XSMALL';
```

**Resultado esperado** El tamaño cambia a SMALL y vuelve a XSMALL.

### Auto-suspend y auto-resume

**Clave** `auto-suspend-y-auto-resume`

**Definición** La suspensión automática detiene el cómputo tras inactividad; la reanudación automática lo activa cuando una operación lo requiere.

**Búsqueda** Auto-suspend y auto-resume; configurar inactividad

**Para recordar** Suspender frecuentemente reduce inactividad pero pierde caché local.

#### Configurar inactividad

```sql
ALTER WAREHOUSE ALLDOC_WH SET AUTO_SUSPEND=60 AUTO_RESUME=TRUE;
```

**Resultado esperado** Se solicita suspensión tras 60 segundos de inactividad y reanudación ante trabajo.

### Scale out y multi-cluster

**Clave** `scale-out-y-multi-cluster`

**Definición** Un warehouse multi-cluster puede añadir clústeres para atender consultas concurrentes.

**Búsqueda** Scale out y multi-cluster; planificar carga concurrente

**Para recordar** Scale up mejora capacidad por clúster; scale out atiende concurrencia.

**Nota** Multi-cluster requiere edición compatible y puede consumir más créditos.

#### Planificar carga concurrente

1. En un warehouse de prueba con edición compatible, fija MIN_CLUSTER_COUNT=1 y MAX_CLUSTER_COUNT=2.
2. Revisa el historial de carga en horas de concurrencia.
3. Devuelve el máximo a 1.

**Resultado esperado** Se habilita capacidad adicional si la política de escalamiento lo requiere.

### Suspender y reanudar

**Clave** `suspender-y-reanudar`

**Definición** SUSPEND y RESUME permiten controlar manualmente el estado del warehouse.

**Búsqueda** Suspender y reanudar; detener cómputo tras una prueba

**Para recordar** Suspender es distinto de DROP.

**Nota** No hacerlo sobre un warehouse compartido en uso.

#### Detener cómputo tras una prueba

```sql
ALTER WAREHOUSE ALLDOC_WH SUSPEND;
SHOW WAREHOUSES LIKE 'ALLDOC_WH';
```

**Resultado esperado** Estado suspendido tras terminar operaciones activas; una consulta posterior puede reanudarlo.

## SELECT y filtros

**Clave** `select-y-filtros`

### Definición

**Clave** `definicion`

**Definición** SELECT elige columnas o expresiones; FROM indica la fuente, WHERE filtra filas.

**Búsqueda** SELECT y filtros; Definición; mostrar compras completadas

**Para recordar** WHERE ocurre lógicamente antes de SELECT.

#### Mostrar compras completadas

```sql
SELECT ORDER_ID, AMOUNT FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID;
```

**Resultado esperado** 101:100, 102:200, 103:300, 105:200, 106:100, 107:400.

### Alias y comentarios

**Clave** `alias-y-comentarios`

**Definición** AS asigna un nombre al resultado; los comentarios -- y /* */ documentan consultas.

**Búsqueda** Alias y comentarios; mostrar importe con nombre de negocio

**Para recordar** Un alias no renombra la columna física.

#### Mostrar importe con nombre de negocio

```sql
-- Importe del pedido
SELECT ORDER_ID AS ID, AMOUNT AS TOTAL FROM ORDERS WHERE ORDER_ID=101;
```

**Resultado esperado** ID=101, TOTAL=100.

### SELECT EXCLUDE, REPLACE y RENAME

**Clave** `select-exclude-replace-y-rename`

**Definición** Snowflake amplía SELECT * para excluir, sustituir expresiones o renombrar columnas del resultado.

**Búsqueda** SELECT EXCLUDE, REPLACE y RENAME; omitir cupón y cambiar importe visible

**Para recordar** No modifica la tabla original; EXCLUDE precede a REPLACE/RENAME.

#### Omitir cupón y cambiar importe visible

```sql
SELECT * EXCLUDE COUPON REPLACE (AMOUNT*2 AS AMOUNT) RENAME AMOUNT AS DOBLE FROM ORDERS WHERE ORDER_ID=101;
```

**Resultado esperado** Una fila sin COUPON; DOBLE=200, ORDER_ID=101 y demás columnas originales.

### Operadores AND, OR, NOT

**Clave** `operadores-and-or-not`

**Definición** Los operadores lógicos combinan condiciones; AND tiene precedencia sobre OR.

**Búsqueda** Operadores AND, OR, NOT; seleccionar pedidos relevantes

**Para recordar** Usa paréntesis para expresar la intención.

#### Seleccionar pedidos relevantes

```sql
SELECT ORDER_ID FROM ORDERS WHERE STATUS='completed' AND (AMOUNT>=300 OR CUSTOMER_ID=1) ORDER BY ORDER_ID;
```

**Resultado esperado** 101, 102, 103, 107.

### IN y BETWEEN

**Clave** `in-y-between`

**Definición** IN compara con una lista; BETWEEN incluye ambos límites.

**Búsqueda** IN y BETWEEN; filtrar importe y cliente

**Para recordar** NOT IN con NULL puede producir UNKNOWN; para fechas con hora suele convenir un rango semiabierto.

#### Filtrar importe y cliente

```sql
SELECT ORDER_ID FROM ORDERS WHERE CUSTOMER_ID IN (1,2) AND AMOUNT BETWEEN 100 AND 200 ORDER BY ORDER_ID;
```

**Resultado esperado** 101, 102, 104.

### LIKE, ILIKE y patrones

**Clave** `like-ilike-y-patrones`

**Definición** LIKE compara patrones sensibles a mayúsculas; ILIKE ignora esa diferencia. % representa cero o más caracteres y _ uno.

**Búsqueda** LIKE, ILIKE y patrones; buscar nombres con a inicial

**Para recordar** No confundir patrones LIKE con expresiones regulares.

#### Buscar nombres con a inicial

```sql
SELECT NAME FROM CUSTOMERS WHERE NAME ILIKE 'a%';
```

**Resultado esperado** Ana.

### ORDER BY, LIMIT y OFFSET

**Clave** `order-by-limit-y-offset`

**Definición** ORDER BY ordena el resultado; LIMIT limita filas y OFFSET omite las primeras.

**Búsqueda** ORDER BY, LIMIT y OFFSET; recuperar el segundo y tercer mayor pedido

**Para recordar** Añade un desempate estable para paginar.

#### Recuperar el segundo y tercer mayor pedido

```sql
SELECT ORDER_ID, AMOUNT FROM ORDERS ORDER BY AMOUNT DESC, ORDER_ID LIMIT 2 OFFSET 1;
```

**Resultado esperado** 103:300 y 102:200.

### DISTINCT

**Clave** `distinct`

**Definición** DISTINCT elimina combinaciones de valores repetidas del resultado.

**Búsqueda** DISTINCT; listar estados

**Para recordar** Con varias columnas, la combinación completa debe ser distinta.

#### Listar estados

```sql
SELECT DISTINCT STATUS FROM ORDERS ORDER BY STATUS;
```

**Resultado esperado** cancelled, completed, pending.

## NULL y condicionales

**Clave** `null-y-condicionales`

### Definición

**Clave** `definicion`

**Definición** NULL representa un valor ausente o desconocido; una condición puede ser TRUE, FALSE o UNKNOWN.

**Búsqueda** NULL y condicionales; Definición; localizar países ausentes

**Para recordar** WHERE conserva solo condiciones TRUE.

#### Localizar países ausentes

```sql
SELECT CUSTOMER_ID FROM CUSTOMERS WHERE COUNTRY IS NULL;
```

**Resultado esperado** 6.

### IS NOT NULL e igualdad segura

**Clave** `is-not-null-e-igualdad-segura`

**Definición** IS NOT NULL descarta ausentes; IS NOT DISTINCT FROM compara también dos NULL como iguales.

**Búsqueda** IS NOT NULL e igualdad segura; comparar dos ausentes

**Para recordar** NULL = NULL no devuelve TRUE.

#### Comparar dos ausentes

```sql
SELECT NULL = NULL AS NORMAL, NULL IS NOT DISTINCT FROM NULL AS SEGURA;
```

**Resultado esperado** NORMAL=NULL, SEGURA=TRUE.

### COALESCE, NVL y NULLIF

**Clave** `coalesce-nvl-y-nullif`

**Definición** COALESCE elige el primer valor no nulo, NVL ofrece dos alternativas y NULLIF devuelve NULL si dos valores son iguales.

**Búsqueda** COALESCE, NVL y NULLIF; sustituir ausentes y proteger división

**Para recordar** NULLIF(denominador,0) evita dividir por cero.

#### Sustituir ausentes y proteger división

```sql
SELECT COALESCE(NULL,'Unknown'), NVL(NULL,0), 10/NULLIF(0,0);
```

**Resultado esperado** Unknown, 0, NULL.

### CASE e IFF

**Clave** `case-e-iff`

**Definición** CASE elige entre varias condiciones; IFF(condición, valor_si_true, otro) resuelve dos ramas.

**Búsqueda** CASE e IFF; clasificar pedidos

**Para recordar** CASE evalúa condiciones en orden y devuelve la primera coincidente.

#### Clasificar pedidos

```sql
SELECT ORDER_ID, CASE WHEN AMOUNT>=300 THEN 'High' WHEN AMOUNT>=100 THEN 'Medium' ELSE 'Low' END AS SEGMENT, IFF(STATUS='completed',1,0) AS VALID FROM ORDERS WHERE ORDER_ID IN (103,108) ORDER BY ORDER_ID;
```

**Resultado esperado** 103:High,1; 108:Low,0.

## Tipos y conversiones

**Clave** `tipos-y-conversiones`

### Definición

**Clave** `definicion`

**Definición** Los tipos definen cómo se almacenan e interpretan valores; convertir explícitamente evita ambigüedades.

**Búsqueda** Tipos y conversiones; Definición; declarar un importe

**Para recordar** NUMBER con escala fija sirve para importes; FLOAT es aproximado.

#### Declarar un importe

```sql
SELECT 12.34::NUMBER(10,2) AS PRICE, TYPEOF(TO_VARIANT(12.34)) AS T;
```

**Resultado esperado** PRICE=12.34, T=DECIMAL.

### NUMBER, FLOAT, VARCHAR, BOOLEAN

**Clave** `number-float-varchar-boolean`

**Definición** NUMBER representa números de precisión fija, FLOAT aproximados, VARCHAR texto y BOOLEAN valores lógicos.

**Búsqueda** NUMBER, FLOAT, VARCHAR, BOOLEAN; convertir cuatro valores

**Para recordar** No almacenes cantidades como texto si vas a calcular.

#### Convertir cuatro valores

```sql
SELECT CAST('12.50' AS NUMBER(8,2)), CAST('1.5' AS FLOAT), CAST(7 AS VARCHAR), CAST('true' AS BOOLEAN);
```

**Resultado esperado** 12.50, 1.5, texto 7, TRUE.

### CAST, :: y TRY_CAST

**Clave** `cast-y-try-cast`

**Definición** CAST y :: convierten tipos; TRY_CAST devuelve NULL para conversiones admitidas que fallan.

**Búsqueda** CAST, :: y TRY_CAST; limpiar un importe inválido

**Para recordar** TRY_CAST admite expresiones de origen string; no silencia cualquier error SQL.

#### Limpiar un importe inválido

```sql
SELECT '42'::NUMBER AS OK, TRY_CAST('oops' AS NUMBER) AS BAD, TRY_TO_NUMBER('15.5',10,1) AS N;
```

**Resultado esperado** 42, NULL, 15.5.

### DATE y TIMESTAMP

**Clave** `date-y-timestamp`

**Definición** DATE representa un día; TIMESTAMP_NTZ no guarda zona, LTZ usa zona de sesión al mostrar y TZ conserva un offset.

**Búsqueda** DATE y TIMESTAMP; convertir una marca temporal

**Para recordar** TZ conserva el offset, no el nombre de la zona con sus reglas futuras.

#### Convertir una marca temporal

```sql
SELECT TO_DATE('2026-02-03','YYYY-MM-DD'), TO_TIMESTAMP_NTZ('2026-02-03 10:30:00');
```

**Resultado esperado** 2026-02-03 y 2026-02-03 10:30:00 sin zona.

## Funciones de texto y números

**Clave** `funciones-de-texto-y-numeros`

### Definición

**Clave** `definicion`

**Definición** Las funciones escalares calculan un valor por fila, sin agrupar el resultado.

**Búsqueda** Funciones de texto y números; Definición; normalizar nombres

**Para recordar** Una expresión escalar no reduce la cantidad de filas.

#### Normalizar nombres

```sql
SELECT CUSTOMER_ID, UPPER(NAME) AS NAME FROM CUSTOMERS WHERE CUSTOMER_ID=1;
```

**Resultado esperado** 1, ANA.

### UPPER, LOWER, LENGTH y TRIM

**Clave** `upper-lower-length-y-trim`

**Definición** Cambian capitalización, miden caracteres y eliminan espacios de los extremos.

**Búsqueda** UPPER, LOWER, LENGTH y TRIM; limpiar una etiqueta

**Para recordar** TRIM no elimina espacios internos.

#### Limpiar una etiqueta

```sql
SELECT UPPER('mx'), LOWER('ANA'), LENGTH('Ana'), TRIM(' Ana ');
```

**Resultado esperado** MX, ana, 3, Ana.

### SUBSTRING, REPLACE y CONCAT

**Clave** `substring-replace-y-concat`

**Definición** SUBSTRING extrae parte del texto, REPLACE sustituye apariciones y CONCAT une cadenas.

**Búsqueda** SUBSTRING, REPLACE y CONCAT; construir un código

**Para recordar** SUBSTRING usa posiciones desde 1; CONCAT devuelve NULL si un argumento es NULL.

#### Construir un código

```sql
SELECT CONCAT('MX','-',SUBSTRING('2026',3,2)), REPLACE('A-B','-','/');
```

**Resultado esperado** MX-26, A/B.

### SPLIT y REGEXP

**Clave** `split-y-regexp`

**Definición** SPLIT devuelve un ARRAY; REGEXP_LIKE prueba una expresión regular y REGEXP_REPLACE transforma coincidencias.

**Búsqueda** SPLIT y REGEXP; normalizar y separar texto

**Para recordar** REGEXP_LIKE ancla implícitamente el patrón a ambos extremos.

#### Normalizar y separar texto

```sql
SELECT SPLIT('A,B',','), REGEXP_LIKE('MX-12','MX-[0-9]+'), REGEXP_REPLACE('A123','[0-9]+','');
```

**Resultado esperado** Array ["A","B"], TRUE, A.

### ROUND, ABS, CEIL, FLOOR y MOD

**Clave** `round-abs-ceil-floor-y-mod`

**Definición** Redondean, obtienen magnitud, techo, piso y residuo.

**Búsqueda** ROUND, ABS, CEIL, FLOOR y MOD; calcular indicadores

**Para recordar** ROUND cambia precisión, no equivale a truncar.

#### Calcular indicadores

```sql
SELECT ROUND(10/3,2), ABS(-5), CEIL(2.1), FLOOR(2.9), MOD(7,3);
```

**Resultado esperado** 3.33, 5, 3, 2, 1.

## Fechas y series temporales

**Clave** `fechas-y-series-temporales`

### Definición

**Clave** `definicion`

**Definición** Las funciones de fechas extraen componentes, agrupan periodos y calculan diferencias.

**Búsqueda** Fechas y series temporales; Definición; ventas mensuales

**Para recordar** Mantén DATE/TIMESTAMP en lugar de cadenas para comparar.

#### Ventas mensuales

```sql
SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS MONTH, SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1 ORDER BY 1;
```

**Resultado esperado** 2026-02-01:600; 2026-03-01:700.

### YEAR, MONTH y EXTRACT

**Clave** `year-month-y-extract`

**Definición** Extraen componentes de una fecha; EXTRACT permite elegir la unidad.

**Búsqueda** YEAR, MONTH y EXTRACT; extraer periodo

**Para recordar** Agrupar solo por MONTH mezcla años.

#### Extraer periodo

```sql
SELECT YEAR('2026-03-04'::DATE), MONTH('2026-03-04'::DATE), EXTRACT(DAY FROM '2026-03-04'::DATE);
```

**Resultado esperado** 2026, 3, 4.

### DATEADD, DATEDIFF y CURRENT_DATE

**Clave** `dateadd-datediff-y-current-date`

**Definición** DATEADD desplaza una fecha; DATEDIFF mide la diferencia en la unidad elegida; CURRENT_DATE usa la zona de sesión.

**Búsqueda** DATEADD, DATEDIFF y CURRENT_DATE; medir días hasta compra

**Para recordar** DATEDIFF(unidad,inicio,fin) calcula fin menos inicio.

#### Medir días hasta compra

```sql
SELECT DATEDIFF(DAY,c.SIGNUP_DATE,o.ORDER_DATE) AS DAYS FROM CUSTOMERS c JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID WHERE o.ORDER_ID=101;
```

**Resultado esperado** 31 días.

### DATE_TRUNC, TIME_SLICE y TO_CHAR

**Clave** `date-trunc-time-slice-y-to-char`

**Definición** DATE_TRUNC baja a una unidad; TIME_SLICE asigna intervalos regulares; TO_CHAR formatea texto.

**Búsqueda** DATE_TRUNC, TIME_SLICE y TO_CHAR; crear intervalos de 15 minutos

**Para recordar** Para agrupar conserva la fecha; para presentar usa texto.

#### Crear intervalos de 15 minutos

```sql
SELECT TIME_SLICE('2026-03-04 10:22:00'::TIMESTAMP_NTZ,15,'MINUTE'), TO_CHAR('2026-03-04'::DATE,'YYYY-MM');
```

**Resultado esperado** 2026-03-04 10:15:00 y 2026-03.

### Rangos de fechas

**Clave** `rangos-de-fechas`

**Definición** Los filtros semiabiertos incluyen el comienzo y excluyen el inicio del periodo siguiente.

**Búsqueda** Rangos de fechas; obtener compras completadas de febrero

**Para recordar** Evita BETWEEN con el último día si hay horas.

#### Obtener compras completadas de febrero

```sql
SELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';
```

**Resultado esperado** 600.

## Agregación y GROUP BY

**Clave** `agregacion-y-group-by`

### Definición

**Clave** `definicion`

**Definición** Una agregación reduce varias filas a un valor; GROUP BY define grupos sobre los que se calcula.

**Búsqueda** Agregación y GROUP BY; Definición; calcular ventas por cliente

**Para recordar** Sin GROUP BY, el conjunto filtrado es un grupo global.

#### Calcular ventas por cliente

```sql
SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY CUSTOMER_ID ORDER BY CUSTOMER_ID;
```

**Resultado esperado** 1:300, 2:300, 3:300, 4:400.

### COUNT y COUNT DISTINCT

**Clave** `count-y-count-distinct`

**Definición** COUNT(*) cuenta filas, COUNT(columna) cuenta valores no nulos y COUNT(DISTINCT columna) cuenta distintos no nulos.

**Búsqueda** COUNT y COUNT DISTINCT; comparar tres conteos

**Para recordar** Los NULL no cuentan en COUNT(columna).

#### Comparar tres conteos

```sql
SELECT COUNT(*), COUNT(COUPON), COUNT(DISTINCT CUSTOMER_ID) FROM ORDERS;
```

**Resultado esperado** 8, 2, 4.

### SUM, AVG, MIN y MAX

**Clave** `sum-avg-min-y-max`

**Definición** Suman, promedian y encuentran extremos, ignorando NULL.

**Búsqueda** SUM, AVG, MIN y MAX; resumir compras completadas

**Para recordar** AVG divide entre los valores no nulos, no necesariamente COUNT(*).

#### Resumir compras completadas

```sql
SELECT SUM(AMOUNT), ROUND(AVG(AMOUNT),2), MIN(AMOUNT), MAX(AMOUNT) FROM ORDERS WHERE STATUS='completed';
```

**Resultado esperado** 1300, 216.67, 100, 400.

### COUNT_IF y agregación condicional

**Clave** `count-if-y-agregacion-condicional`

**Definición** COUNT_IF cuenta condiciones verdaderas; SUM de CASE permite construir métricas condicionadas.

**Búsqueda** COUNT_IF y agregación condicional; medir tasa de finalización

**Para recordar** Usa COALESCE si necesitas cero en lugar de NULL cuando no hay coincidencias.

#### Medir tasa de finalización

```sql
SELECT COUNT_IF(STATUS='completed') AS COMPLETED, 100.0*SUM(IFF(STATUS='completed',1,0))/NULLIF(COUNT(*),0) AS PCT FROM ORDERS;
```

**Resultado esperado** 6 y 75%.

### LISTAGG

**Clave** `listagg`

**Definición** LISTAGG concatena valores en un grupo como texto y WITHIN GROUP fija el orden.

**Búsqueda** LISTAGG; enumerar países distintos

**Para recordar** No confundir con GROUP_CONCAT de MySQL.

#### Enumerar países distintos

```sql
SELECT LISTAGG(DISTINCT COUNTRY,', ') WITHIN GROUP (ORDER BY COUNTRY) FROM CUSTOMERS;
```

**Resultado esperado** Mexico, Spain, USA.

### HAVING y GROUP BY ALL

**Clave** `having-y-group-by-all`

**Definición** HAVING filtra grupos; GROUP BY ALL agrupa por las expresiones no agregadas del SELECT.

**Búsqueda** HAVING y GROUP BY ALL; clientes con más de una compra completada

**Para recordar** WHERE filtra antes de calcular grupos.

#### Clientes con más de una compra completada

```sql
SELECT CUSTOMER_ID,COUNT(*) AS N FROM ORDERS WHERE STATUS='completed' GROUP BY ALL HAVING COUNT(*)>1 ORDER BY CUSTOMER_ID;
```

**Resultado esperado** 1:2, 3:2.

### ROLLUP, CUBE y GROUPING SETS

**Clave** `rollup-cube-y-grouping-sets`

**Definición** Generan subtotales por distintas combinaciones de dimensiones; GROUPING identifica columnas agregadas a un nivel superior.

**Búsqueda** ROLLUP, CUBE y GROUPING SETS; ventas por cliente y total general

**Para recordar** ROLLUP es jerárquico; CUBE incluye todas las combinaciones; GROUPING SETS elige combinaciones concretas.

#### Ventas por cliente y total general

```sql
SELECT CUSTOMER_ID,SUM(AMOUNT),GROUPING(CUSTOMER_ID) AS IS_TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY ROLLUP(CUSTOMER_ID) ORDER BY IS_TOTAL,CUSTOMER_ID;
```

**Resultado esperado** 1:300,2:300,3:300,4:400 y NULL:1300 con IS_TOTAL=1.

### MEDIAN, percentiles y aproximaciones

**Clave** `median-percentiles-y-aproximaciones`

**Definición** MEDIAN obtiene el centro; PERCENTILE_CONT interpola un percentil; APPROX_COUNT_DISTINCT estima cardinalidad.

**Búsqueda** MEDIAN, percentiles y aproximaciones; medir distribución de importes

**Para recordar** Un percentil no es un porcentaje de ventas; una estimación no es un conteo exacto.

#### Medir distribución de importes

```sql
SELECT MEDIAN(AMOUNT), PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY AMOUNT), APPROX_COUNT_DISTINCT(CUSTOMER_ID) FROM ORDERS WHERE STATUS='completed';
```

**Resultado esperado** 200, 200 y una estimación cercana a 4.

## JOIN y cardinalidad

**Clave** `join-y-cardinalidad`

### Definición

**Clave** `definicion`

**Definición** JOIN combina filas según una condición; el número de coincidencias determina cuántas filas genera.

**Búsqueda** JOIN y cardinalidad; Definición; traer el nombre del comprador

**Para recordar** Una clave repetida puede multiplicar filas y métricas.

#### Traer el nombre del comprador

```sql
SELECT o.ORDER_ID,c.NAME FROM ORDERS o JOIN CUSTOMERS c ON o.CUSTOMER_ID=c.CUSTOMER_ID WHERE o.ORDER_ID=101;
```

**Resultado esperado** 101, Ana.

### INNER JOIN, ON y USING

**Clave** `inner-join-on-y-using`

**Definición** INNER JOIN devuelve coincidencias; USING simplifica la igualdad cuando las columnas tienen el mismo nombre.

**Búsqueda** INNER JOIN, ON y USING; combinar por columna compartida

**Para recordar** No requiere una FK declarada para funcionar.

#### Combinar por columna compartida

```sql
SELECT ORDER_ID,NAME FROM ORDERS JOIN CUSTOMERS USING(CUSTOMER_ID) WHERE ORDER_ID=102;
```

**Resultado esperado** 102, Ana.

### LEFT, RIGHT y FULL OUTER JOIN

**Clave** `left-right-y-full-outer-join`

**Definición** Los joins externos conservan filas sin coincidencia del lado elegido (o de ambos lados en FULL).

**Búsqueda** LEFT, RIGHT y FULL OUTER JOIN; conservar clientes sin pedidos

**Para recordar** Las columnas del lado ausente son NULL.

#### Conservar clientes sin pedidos

```sql
SELECT c.CUSTOMER_ID,o.ORDER_ID FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID WHERE c.CUSTOMER_ID=5;
```

**Resultado esperado** 5, NULL; RIGHT JOIN invirtiendo las tablas conserva lo mismo; FULL también conservaría pedidos huérfanos si existieran.

### Anti join y semi join

**Clave** `anti-join-y-semi-join`

**Definición** Un anti join busca filas sin coincidencia; un semi join comprueba existencia sin multiplicar filas.

**Búsqueda** Anti join y semi join; encontrar clientes sin pedido

**Para recordar** NOT EXISTS evita problemas de NOT IN con NULL.

#### Encontrar clientes sin pedido

```sql
SELECT c.CUSTOMER_ID FROM CUSTOMERS c WHERE NOT EXISTS (SELECT 1 FROM ORDERS o WHERE o.CUSTOMER_ID=c.CUSTOMER_ID) ORDER BY 1;
```

**Resultado esperado** 5 y 6. Con EXISTS se obtienen 1, 2, 3 y 4.

### Filtros en ON y WHERE

**Clave** `filtros-en-on-y-where`

**Definición** En un LEFT JOIN un filtro en ON limita coincidencias sin eliminar la fila izquierda; en WHERE puede eliminarla.

**Búsqueda** Filtros en ON y WHERE; contar completados incluyendo clientes sin compras

**Para recordar** Para contar cero coincidencias usa COUNT de una clave derecha no nula.

#### Contar completados incluyendo clientes sin compras

```sql
SELECT c.CUSTOMER_ID,COUNT(o.ORDER_ID) FROM CUSTOMERS c LEFT JOIN ORDERS o ON c.CUSTOMER_ID=o.CUSTOMER_ID AND o.STATUS='completed' GROUP BY 1 ORDER BY 1;
```

**Resultado esperado** 1:2, 2:1, 3:2, 4:1, 5:0, 6:0.

### CROSS JOIN y self join

**Clave** `cross-join-y-self-join`

**Definición** CROSS JOIN combina cada fila con todas las de la otra fuente; self join une una tabla consigo misma mediante alias.

**Búsqueda** CROSS JOIN y self join; contar parejas cliente-producto

**Para recordar** Controla el producto cartesiano antes de agregar.

#### Contar parejas cliente-producto

```sql
SELECT COUNT(*) FROM CUSTOMERS CROSS JOIN PRODUCTS;
```

**Resultado esperado** 24 pares.

### JOIN múltiple y granularidad

**Clave** `join-multiple-y-granularidad`

**Definición** Cada join puede cambiar la granularidad: pedido, línea o cliente.

**Búsqueda** JOIN múltiple y granularidad; ingresos por categoría

**Para recordar** Al sumar ventas por producto usa cantidad por precio de línea, no el total del pedido repetido.

#### Ingresos por categoría

```sql
SELECT p.CATEGORY,SUM(i.QUANTITY*i.UNIT_PRICE) AS SALES FROM ORDER_ITEMS i JOIN ORDERS o ON o.ORDER_ID=i.ORDER_ID JOIN PRODUCTS p ON p.PRODUCT_ID=i.PRODUCT_ID WHERE o.STATUS='completed' GROUP BY 1 ORDER BY 1;
```

**Resultado esperado** Electronics:400, Furniture:900.

### ASOF JOIN

**Clave** `asof-join`

**Definición** Busca la fila temporal más cercana de la derecha que satisface la dirección definida en MATCH_CONDITION.

**Búsqueda** ASOF JOIN; encontrar el tipo de cambio anterior

**Para recordar** ON agrupa por claves de igualdad; evita empates en timestamps derechos si necesitas determinismo.

#### Encontrar el tipo de cambio anterior

```sql
WITH t AS (SELECT 1 AS ID,'2026-02-03'::DATE AS D,'USD' AS CCY), r AS (SELECT 'USD' AS CCY,'2026-02-01'::DATE AS D,17 AS RATE UNION ALL SELECT 'USD','2026-02-04'::DATE,18) SELECT t.ID,r.RATE FROM t ASOF JOIN r MATCH_CONDITION(t.D>=r.D) ON t.CCY=r.CCY;
```

**Resultado esperado** 1, 17.

## Subconsultas, conjuntos y CTE

**Clave** `subconsultas-conjuntos-y-cte`

### Definición

**Clave** `definicion`

**Definición** Una consulta puede consumir el resultado de otra mediante subconsultas, CTE o tablas derivadas.

**Búsqueda** Subconsultas, conjuntos y CTE; Definición; filtrar compras sobre el promedio

**Para recordar** Usa un CTE para nombrar resultados que necesites volver a consultar.

#### Filtrar compras sobre el promedio

```sql
SELECT ORDER_ID FROM ORDERS WHERE AMOUNT>(SELECT AVG(AMOUNT) FROM ORDERS) ORDER BY 1;
```

**Resultado esperado** 102,103,105,107.

### Subconsulta escalar y correlacionada

**Clave** `subconsulta-escalar-y-correlacionada`

**Definición** Una escalar devuelve un único valor; una correlacionada depende de la fila exterior.

**Búsqueda** Subconsulta escalar y correlacionada; detectar compras mayores al promedio de su cliente

**Para recordar** Snowflake limita algunas posiciones de subconsultas correlacionadas escalares; un agregado sin GROUP BY puede garantizar una fila.

#### Detectar compras mayores al promedio de su cliente

```sql
SELECT o.ORDER_ID FROM ORDERS o WHERE o.AMOUNT>(SELECT AVG(x.AMOUNT) FROM ORDERS x WHERE x.CUSTOMER_ID=o.CUSTOMER_ID) ORDER BY 1;
```

**Resultado esperado** 102,103,105.

### IN, EXISTS, ANY y ALL

**Clave** `in-exists-any-y-all`

**Definición** IN verifica pertenencia, EXISTS existencia, ANY/SOME al menos una comparación y ALL todas las comparaciones.

**Búsqueda** IN, EXISTS, ANY y ALL; buscar ventas superiores a todos los pedidos cancelados

**Para recordar** Revisa restricciones de subconsultas y NULL; ANY/ALL se usan en WHERE.

#### Buscar ventas superiores a todos los pedidos cancelados

```sql
SELECT ORDER_ID FROM ORDERS WHERE AMOUNT>ALL(SELECT AMOUNT FROM ORDERS WHERE STATUS='cancelled') ORDER BY 1;
```

**Resultado esperado** 102,103,105,107.

### CTE y múltiples WITH

**Clave** `cte-y-multiples-with`

**Definición** WITH define resultados con nombre para una sola sentencia; los CTE posteriores pueden leer los anteriores.

**Búsqueda** CTE y múltiples WITH; contar clientes con ventas de al menos 300

**Para recordar** No presupongas que se materializan físicamente.

#### Contar clientes con ventas de al menos 300

```sql
WITH s AS (SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1), f AS (SELECT * FROM s WHERE TOTAL>=300) SELECT COUNT(*) FROM f;
```

**Resultado esperado** 4.

### CTE recursivo y CONNECT BY

**Clave** `cte-recursivo-y-connect-by`

**Definición** Un CTE recursivo usa un término inicial y otro que consume la iteración anterior; CONNECT BY permite recorrer jerarquías.

**Búsqueda** CTE recursivo y CONNECT BY; generar tres niveles

**Para recordar** Define una condición de parada y protege contra ciclos.

#### Generar tres niveles

```sql
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i+1 FROM n WHERE i<3) SELECT i FROM n ORDER BY i;
```

**Resultado esperado** 1,2,3.

### UNION, UNION ALL y BY NAME

**Clave** `union-union-all-y-by-name`

**Definición** UNION elimina duplicados; UNION ALL los conserva; BY NAME alinea columnas por nombre en Snowflake.

**Búsqueda** UNION, UNION ALL y BY NAME; combinar dos listas de países

**Para recordar** Sin BY NAME, la posición determina la correspondencia.

#### Combinar dos listas de países

```sql
SELECT COUNTRY FROM CUSTOMERS WHERE CUSTOMER_ID=1 UNION ALL SELECT COUNTRY FROM CUSTOMERS WHERE CUSTOMER_ID=2;
```

**Resultado esperado** Dos filas Mexico; UNION sin ALL devolvería una.

### INTERSECT y EXCEPT

**Clave** `intersect-y-except`

**Definición** INTERSECT conserva filas compartidas; EXCEPT (MINUS) conserva las de la izquierda que no están a la derecha.

**Búsqueda** INTERSECT y EXCEPT; clientes sin pedidos por diferencia

**Para recordar** Alinea columnas y tipos compatibles.

#### Clientes sin pedidos por diferencia

```sql
SELECT CUSTOMER_ID FROM CUSTOMERS EXCEPT SELECT CUSTOMER_ID FROM ORDERS ORDER BY 1;
```

**Resultado esperado** 5,6.

## Funciones de ventana y QUALIFY

**Clave** `funciones-de-ventana-y-qualify`

### Definición

**Clave** `definicion`

**Definición** Una ventana calcula sobre filas relacionadas sin colapsarlas como GROUP BY.

**Búsqueda** Funciones de ventana y QUALIFY; Definición; mostrar ventas totales junto a cada pedido

**Para recordar** OVER define partición, orden y, cuando aplica, marco.

#### Mostrar ventas totales junto a cada pedido

```sql
SELECT ORDER_ID,AMOUNT,SUM(AMOUNT) OVER() AS TOTAL FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID;
```

**Resultado esperado** Seis filas y TOTAL=1300 en cada una.

### PARTITION BY y ORDER BY

**Clave** `partition-by-y-order-by`

**Definición** PARTITION BY separa ventanas; ORDER BY establece el orden del cálculo dentro de cada una.

**Búsqueda** PARTITION BY y ORDER BY; numerar pedidos por cliente

**Para recordar** El ORDER BY de OVER no garantiza el orden de salida.

#### Numerar pedidos por cliente

```sql
SELECT ORDER_ID,CUSTOMER_ID,ROW_NUMBER() OVER(PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE,ORDER_ID) AS N FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY N;
```

**Resultado esperado** 101:1,102:2,108:3.

### ROW_NUMBER, RANK y DENSE_RANK

**Clave** `row-number-rank-y-dense-rank`

**Definición** ROW_NUMBER da posiciones únicas; RANK comparte puestos con saltos; DENSE_RANK comparte puestos sin saltos.

**Búsqueda** ROW_NUMBER, RANK y DENSE_RANK; comparar puestos de gasto

**Para recordar** Para ROW_NUMBER añade desempate; para preservar empates en RANK no lo añadas al orden de la ventana.

#### Comparar puestos de gasto

```sql
WITH s AS (SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1) SELECT CUSTOMER_ID,RANK() OVER(ORDER BY TOTAL DESC) AS R,DENSE_RANK() OVER(ORDER BY TOTAL DESC) AS DR,ROW_NUMBER() OVER(ORDER BY TOTAL DESC,CUSTOMER_ID) AS RN FROM s ORDER BY RN;
```

**Resultado esperado** 4:1,1,1; 1:2,2,2; 2:2,2,3; 3:2,2,4.

### LAG, LEAD y FIRST_VALUE

**Clave** `lag-lead-y-first-value`

**Definición** LAG/LEAD leen filas anteriores/siguientes; FIRST_VALUE obtiene el primer valor del marco.

**Búsqueda** LAG, LEAD y FIRST_VALUE; comparar pedidos de ana

**Para recordar** Define el orden y el marco cuando sea relevante.

#### Comparar pedidos de Ana

```sql
SELECT ORDER_ID,LAG(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID) AS PREV,LEAD(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID) AS NEXT_AMOUNT FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY ORDER_DATE,ORDER_ID;
```

**Resultado esperado** 101:NULL,200;102:100,50;108:200,NULL.

### LAST_VALUE y marcos ROWS/RANGE

**Clave** `last-value-y-marcos-rows-range`

**Definición** ROWS cuenta filas físicas de la ventana; RANGE agrupa por valores del orden; LAST_VALUE lee el último valor del marco.

**Búsqueda** LAST_VALUE y marcos ROWS/RANGE; acumulado por pedido

**Para recordar** Declara el marco explícito, especialmente con empates y LAST_VALUE.

#### Acumulado por pedido

```sql
SELECT ORDER_ID,SUM(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RUNNING FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_DATE,ORDER_ID;
```

**Resultado esperado** 101:100,102:300,103:600,105:800,106:900,107:1300.

### Promedio móvil

**Clave** `promedio-movil`

**Definición** Un marco acotado aplica una agregación a las últimas filas o a un intervalo.

**Búsqueda** Promedio móvil; promedio de hasta dos compras consecutivas

**Para recordar** Dos filas precedentes no significan dos días si faltan fechas.

#### Promedio de hasta dos compras consecutivas

```sql
SELECT ORDER_ID,AVG(AMOUNT) OVER(ORDER BY ORDER_DATE,ORDER_ID ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MOV FROM ORDERS WHERE CUSTOMER_ID=1 ORDER BY ORDER_DATE,ORDER_ID;
```

**Resultado esperado** 101:100,102:150,108:125.

### NTILE, PERCENT_RANK y CUME_DIST

**Clave** `ntile-percent-rank-y-cume-dist`

**Definición** NTILE divide filas en cubetas; PERCENT_RANK mide posición relativa y CUME_DIST proporción acumulada de filas.

**Búsqueda** NTILE, PERCENT_RANK y CUME_DIST; comparar posiciones relativas

**Para recordar** NTILE puede separar empates; CUME_DIST incluye todos los empates.

#### Comparar posiciones relativas

```sql
SELECT x,NTILE(2) OVER(ORDER BY x) AS B,PERCENT_RANK() OVER(ORDER BY x) AS PR,CUME_DIST() OVER(ORDER BY x) AS CD FROM (SELECT COLUMN1 AS x FROM VALUES(10),(20),(30),(40)) ORDER BY x;
```

**Resultado esperado** Cubetas 1,1,2,2; PR 0,1/3,2/3,1; CD .25,.5,.75,1.

### QUALIFY

**Clave** `qualify`

**Definición** QUALIFY filtra después de calcular las funciones de ventana, sin requerir un CTE adicional.

**Búsqueda** QUALIFY; último pedido de cada cliente

**Para recordar** WHERE no puede filtrar directamente ROW_NUMBER de la misma consulta.

#### Último pedido de cada cliente

```sql
SELECT CUSTOMER_ID,ORDER_ID FROM ORDERS QUALIFY ROW_NUMBER() OVER(PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE DESC,ORDER_ID DESC)=1 ORDER BY 1;
```

**Resultado esperado** 1:108,2:104,3:106,4:107.

### RATIO_TO_REPORT

**Clave** `ratio-to-report`

**Definición** Calcula el valor de una fila dividido por la suma de su partición.

**Búsqueda** RATIO_TO_REPORT; participación de cada pedido completado

**Para recordar** Multiplica por 100 para expresar porcentaje.

#### Participación de cada pedido completado

```sql
SELECT ORDER_ID,ROUND(100*RATIO_TO_REPORT(AMOUNT) OVER(),2) AS PCT FROM ORDERS WHERE STATUS='completed' AND CUSTOMER_ID=1 ORDER BY 1;
```

**Resultado esperado** 101:33.33%,102:66.67%.

## Transformaciones y utilidades SQL

**Clave** `transformaciones-y-utilidades-sql`

### Definición

**Clave** `definicion`

**Definición** Las transformaciones reorganizan resultados, generan filas o reutilizan salidas sin cambiar necesariamente tablas fuente.

**Búsqueda** Transformaciones y utilidades SQL; Definición; generar tres filas

**Para recordar** Distingue la forma del resultado del almacenamiento físico.

#### Generar tres filas

```sql
SELECT ROW_NUMBER() OVER(ORDER BY SEQ4()) AS N FROM TABLE(GENERATOR(ROWCOUNT=>3)) ORDER BY N;
```

**Resultado esperado** 1,2,3.

### PIVOT

**Clave** `pivot`

**Definición** PIVOT convierte valores de una dimensión en columnas mediante una agregación.

**Búsqueda** PIVOT; ventas por estado en columnas

**Para recordar** Define categorías conocidas o revisa la variación de columnas de un pivot dinámico.

#### Ventas por estado en columnas

```sql
SELECT * FROM (SELECT CUSTOMER_ID,STATUS,AMOUNT FROM ORDERS) PIVOT(SUM(AMOUNT) FOR STATUS IN ('completed' AS DONE,'cancelled' AS CANCELLED,'pending' AS PENDING)) ORDER BY CUSTOMER_ID;
```

**Resultado esperado** Cuatro filas: cliente 1 DONE=300 PENDING=50; 2 DONE=300 CANCELLED=100; 3 DONE=300; 4 DONE=400; celdas ausentes NULL.

### UNPIVOT

**Clave** `unpivot`

**Definición** UNPIVOT transforma columnas en filas de atributo y valor; por defecto excluye NULL.

**Búsqueda** UNPIVOT; pasar meses a filas

**Para recordar** Las columnas de valores deben tener tipos compatibles.

#### Pasar meses a filas

```sql
SELECT MONTH_NAME,SALES FROM (SELECT 600 AS FEB,700 AS MAR) UNPIVOT(SALES FOR MONTH_NAME IN (FEB,MAR)) ORDER BY MONTH_NAME;
```

**Resultado esperado** FEB:600, MAR:700.

### TABLESAMPLE

**Clave** `tablesample`

**Definición** SAMPLE/TABLESAMPLE obtiene una muestra por filas o bloques según el método.

**Búsqueda** TABLESAMPLE; explorar una muestra pequeña

**Para recordar** Una muestra aleatoria no es lo mismo que LIMIT; no garantiza representatividad.

#### Explorar una muestra pequeña

```sql
SELECT ORDER_ID FROM ORDERS SAMPLE (3 ROWS);
```

**Resultado esperado** Tres filas de ORDERS, selección variable.

### RESULT_SCAN y LAST_QUERY_ID

**Clave** `result-scan-y-last-query-id`

**Definición** RESULT_SCAN permite consultar un resultado previo autorizado, normalmente hasta 24 horas después.

**Búsqueda** RESULT_SCAN y LAST_QUERY_ID; filtrar salida previa

**Para recordar** Ejecuta las dos sentencias consecutivamente; el orden original no se garantiza.

#### Filtrar salida previa

```sql
SELECT ORDER_ID,AMOUNT FROM ORDERS;
SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID())) WHERE AMOUNT>300;
```

**Resultado esperado** 107,400.

### MATCH_RECOGNIZE

**Clave** `match-recognize`

**Definición** Busca patrones de secuencias de filas con PARTITION BY, ORDER BY, PATTERN y DEFINE.

**Búsqueda** MATCH_RECOGNIZE; encontrar finalización seguida de cancelación

**Para recordar** Es para secuencias, no expresiones regulares de texto.

#### Encontrar finalización seguida de cancelación

```sql
SELECT * FROM ORDERS MATCH_RECOGNIZE (PARTITION BY CUSTOMER_ID ORDER BY ORDER_DATE,ORDER_ID MEASURES FIRST(A.ORDER_ID) AS START_ID, LAST(B.ORDER_ID) AS END_ID ONE ROW PER MATCH PATTERN (A B) DEFINE A AS STATUS='completed', B AS STATUS='cancelled');
```

**Resultado esperado** Cliente 2, START_ID=103, END_ID=104.

### Orden lógico y físico

**Clave** `orden-logico-y-fisico`

**Definición** FROM/JOIN, WHERE, GROUP BY, HAVING, ventanas, QUALIFY, DISTINCT, ORDER BY y LIMIT describen el procesamiento lógico; el optimizador decide el plan real.

**Búsqueda** Orden lógico y físico; consultar un plan

**Para recordar** No deduzcas el plan físico solo del orden textual.

#### Consultar un plan

```sql
EXPLAIN USING TEXT SELECT CUSTOMER_ID,SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed' GROUP BY 1;
```

**Resultado esperado** Plan compilado con operaciones de lectura, filtro y agregación; detalles pueden cambiar.

## Objetos y DDL

**Clave** `objetos-y-ddl`

### Definición

**Clave** `definicion`

**Definición** DDL define objetos de la base de datos; CREATE, ALTER y DROP cambian su estructura.

**Búsqueda** Objetos y DDL; Definición; crear una tabla desde una consulta

**Para recordar** DDL normalmente confirma una transacción activa y se ejecuta en su propia transacción.

#### Crear una tabla desde una consulta

```sql
CREATE OR REPLACE TABLE DEMO_DONE AS SELECT * FROM ORDERS WHERE STATUS='completed';
SELECT COUNT(*) FROM DEMO_DONE;
```

**Resultado esperado** 6 filas; ORDERS permanece intacta.

### CREATE, ALTER, DROP y TRUNCATE

**Clave** `create-alter-drop-y-truncate`

**Definición** CREATE crea objetos, ALTER modifica estructura, DROP elimina el objeto y TRUNCATE vacía sus filas.

**Búsqueda** CREATE, ALTER, DROP y TRUNCATE; modificar una tabla aislada

**Para recordar** IF EXISTS evita fallar si el objeto no existe; OR REPLACE puede reemplazar datos y permisos.

#### Modificar una tabla aislada

```sql
CREATE OR REPLACE TABLE DEMO_DDL(ID NUMBER);
ALTER TABLE DEMO_DDL ADD COLUMN LABEL VARCHAR;
ALTER TABLE DEMO_DDL RENAME COLUMN LABEL TO NAME;
INSERT INTO DEMO_DDL VALUES(1,'A');
TRUNCATE TABLE DEMO_DDL;
SELECT COUNT(*) FROM DEMO_DDL;
DROP TABLE IF EXISTS DEMO_DDL;
```

**Resultado esperado** Conteo 0 tras vaciarla; al final el objeto ya no existe.

### Permanent, Temporary y Transient

**Clave** `permanent-temporary-y-transient`

**Definición** Las permanentes persisten y tienen protección de recuperación; las temporales viven en la sesión y las transient persisten sin Fail-safe.

**Búsqueda** Permanent, Temporary y Transient; crear dos tipos de tabla de trabajo

**Para recordar** Una temporal puede ocultar una tabla homónima; elige según retención requerida.

#### Crear dos tipos de tabla de trabajo

```sql
CREATE OR REPLACE TEMP TABLE DEMO_TEMP AS SELECT ORDER_ID FROM ORDERS;
CREATE OR REPLACE TRANSIENT TABLE DEMO_TRANSIENT AS SELECT ORDER_ID FROM ORDERS;
```

**Resultado esperado** Ambas contienen 8 filas; la primera desaparece al cerrar la sesión, la segunda no.

### PRIMARY KEY, FOREIGN KEY y UNIQUE

**Clave** `primary-key-foreign-key-y-unique`

**Definición** En tablas estándar PK, FK y UNIQUE describen relaciones pero no se comprueban automáticamente; las tablas hybrid sí aplican esas restricciones.

**Búsqueda** PRIMARY KEY, FOREIGN KEY y UNIQUE; detectar claves repetidas

**Para recordar** Valida unicidad y referencias en la carga; no supongas integridad por declarar una clave.

#### Detectar claves repetidas

```sql
SELECT CUSTOMER_ID,COUNT(*) FROM CUSTOMERS GROUP BY 1 HAVING COUNT(*)>1;
```

**Resultado esperado** Ninguna fila con el dataset inicial.

### NOT NULL, DEFAULT y CHECK

**Clave** `not-null-default-y-check`

**Definición** NOT NULL impide ausentes, DEFAULT asigna un valor omitido y CHECK impone condiciones en tablas estándar compatibles con la funcionalidad actual.

**Búsqueda** NOT NULL, DEFAULT y CHECK; proteger cantidades positivas

**Para recordar** CHECK para tablas estándar es GA desde abril de 2026; antes no estaba disponible como hoy. Un CHECK no sustituye NOT NULL.

**Nota** Verificar restricciones y compatibilidad de cargas antes de añadir CHECK a tablas existentes.

#### Proteger cantidades positivas

```sql
CREATE OR REPLACE TABLE DEMO_CHECK(ID NUMBER NOT NULL, QTY NUMBER NOT NULL DEFAULT 1 CHECK(QTY>0));
INSERT INTO DEMO_CHECK(ID) VALUES(1);
SELECT * FROM DEMO_CHECK;
```

**Resultado esperado** 1,1. Intentar insertar QTY=0 falla por CHECK.

### Sequences, NEXTVAL e IDENTITY

**Clave** `sequences-nextval-e-identity`

**Definición** Las secuencias y las columnas IDENTITY/AUTOINCREMENT generan identificadores numéricos.

**Búsqueda** Sequences, NEXTVAL e IDENTITY; crear identificador automático

**Para recordar** No garantizan ausencia de huecos ni orden cronológico estricto.

#### Crear identificador automático

```sql
CREATE OR REPLACE TABLE DEMO_SEQ(ID NUMBER IDENTITY(1,1), LABEL VARCHAR);
INSERT INTO DEMO_SEQ(LABEL) VALUES('A');
SELECT * FROM DEMO_SEQ;
```

**Resultado esperado** Una fila con ID generado y LABEL=A.

### SHOW, DESCRIBE y GET_DDL

**Clave** `show-describe-y-get-ddl`

**Definición** SHOW lista objetos visibles, DESCRIBE muestra estructura y GET_DDL devuelve SQL de definición.

**Búsqueda** SHOW, DESCRIBE y GET_DDL; inspeccionar orders

**Para recordar** Los metadatos visibles dependen del rol.

#### Inspeccionar ORDERS

```sql
SHOW TABLES LIKE 'ORDERS';
DESCRIBE TABLE ORDERS;
SELECT GET_DDL('TABLE','ORDERS');
```

**Resultado esperado** Metadatos de ORDERS, sus seis columnas y texto DDL de la tabla.

## DML y transacciones

**Clave** `dml-y-transacciones`

### Definición

**Clave** `definicion`

**Definición** DML modifica filas; INSERT agrega, UPDATE cambia, DELETE elimina y MERGE combina operaciones según coincidencia.

**Búsqueda** DML y transacciones; Definición; crear una copia aislada para cambios

**Para recordar** Prueba el filtro con SELECT antes de escribir.

#### Crear una copia aislada para cambios

```sql
CREATE OR REPLACE TABLE DEMO_DML CLONE ORDERS;
SELECT COUNT(*) FROM DEMO_DML;
```

**Resultado esperado** 8 filas en una copia independiente a nivel lógico.

### INSERT, UPDATE y DELETE

**Clave** `insert-update-y-delete`

**Definición** INSERT agrega filas; UPDATE y DELETE actúan sobre las filas que cumplen WHERE.

**Búsqueda** INSERT, UPDATE y DELETE; corregir y borrar un registro de prueba

**Para recordar** Sin WHERE, UPDATE o DELETE puede afectar toda la tabla.

#### Corregir y borrar un registro de prueba

```sql
CREATE OR REPLACE TABLE DEMO_DML CLONE ORDERS;
INSERT INTO DEMO_DML VALUES(999,1,10,'2026-03-05','pending',NULL);
UPDATE DEMO_DML SET STATUS='completed' WHERE ORDER_ID=999;
DELETE FROM DEMO_DML WHERE ORDER_ID=999;
SELECT COUNT(*) FROM DEMO_DML;
```

**Resultado esperado** 8 filas al final, el pedido 999 ya no existe.

### MERGE y upsert

**Clave** `merge-y-upsert`

**Definición** MERGE modifica o inserta registros según una clave de coincidencia; también puede eliminar con una rama adecuada.

**Búsqueda** MERGE y upsert; actualizar o insertar una venta

**Para recordar** Deduplica la fuente antes de MERGE para evitar resultados no deterministas.

#### Actualizar o insertar una venta

```sql
CREATE OR REPLACE TABLE DEMO_MERGE(ID NUMBER,AMOUNT NUMBER);
INSERT INTO DEMO_MERGE VALUES(1,10);
MERGE INTO DEMO_MERGE t USING (SELECT COLUMN1 AS ID,COLUMN2 AS AMOUNT FROM VALUES(1,20),(2,30)) s ON t.ID=s.ID WHEN MATCHED THEN UPDATE SET t.AMOUNT=s.AMOUNT WHEN NOT MATCHED THEN INSERT(ID,AMOUNT) VALUES(s.ID,s.AMOUNT);
SELECT * FROM DEMO_MERGE ORDER BY ID;
```

**Resultado esperado** 1:20, 2:30.

### BEGIN, COMMIT y ROLLBACK

**Clave** `begin-commit-y-rollback`

**Definición** BEGIN inicia una transacción explícita; COMMIT confirma sus cambios y ROLLBACK los deshace.

**Búsqueda** BEGIN, COMMIT y ROLLBACK; deshacer una cancelación de prueba

**Para recordar** Prepara las tablas antes de BEGIN; DDL puede confirmar implícitamente.

#### Deshacer una cancelación de prueba

```sql
CREATE OR REPLACE TABLE DEMO_TX CLONE ORDERS;
BEGIN;
UPDATE DEMO_TX SET STATUS='cancelled' WHERE ORDER_ID=101;
ROLLBACK;
SELECT STATUS FROM DEMO_TX WHERE ORDER_ID=101;
```

**Resultado esperado** completed.

### AUTOCOMMIT y aislamiento

**Clave** `autocommit-y-aislamiento`

**Definición** AUTOCOMMIT confirma sentencias fuera de una transacción explícita por defecto; Snowflake emplea READ COMMITTED en tablas estándar.

**Búsqueda** AUTOCOMMIT y aislamiento; consultar configuración

**Para recordar** Una transacción no confirma cambios de otra sesión sin COMMIT; distintas sentencias pueden ver cambios confirmados entretanto.

**Nota** Evita cambiar parámetros de transacción en medio de una transacción activa.

#### Consultar configuración

```sql
SHOW PARAMETERS LIKE 'AUTOCOMMIT' IN SESSION;
```

**Resultado esperado** Valor de sesión (TRUE por defecto).

## Vistas y tablas especializadas

**Clave** `vistas-y-tablas-especializadas`

### Definición

**Clave** `definicion`

**Definición** Una vista almacena una definición de consulta y una tabla almacena datos; hay variantes para necesidades de acceso, frescura y compatibilidad.

**Búsqueda** Vistas y tablas especializadas; Definición; crear una vista de ventas

**Para recordar** Una vista normal no guarda por sí misma los resultados.

#### Crear una vista de ventas

```sql
CREATE OR REPLACE VIEW DEMO_SALES_V AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';
SELECT SUM(AMOUNT) FROM DEMO_SALES_V;
```

**Resultado esperado** 1300.

### Secure Views

**Clave** `secure-views`

**Definición** Una secure view reduce la exposición de su definición y de ciertos detalles internos ante consumidores no propietarios.

**Búsqueda** Secure Views; exponer solo los campos permitidos

**Para recordar** No reemplaza las políticas ni los privilegios; puede tener un costo de rendimiento.

#### Exponer solo los campos permitidos

```sql
CREATE OR REPLACE SECURE VIEW DEMO_PUBLIC_V AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';
SELECT COUNT(*) FROM DEMO_PUBLIC_V;
```

**Resultado esperado** 6 filas, sin campos de cliente ni cupón.

### Materialized Views

**Clave** `materialized-views`

**Definición** Una vista materializada mantiene resultados persistidos para consultas compatibles y requiere mantenimiento automático.

**Búsqueda** Materialized Views; materializar un filtro repetido

**Para recordar** A diferencia de una vista normal, consume almacenamiento y mantenimiento; existen restricciones de SQL.

**Nota** Requiere edición y permisos compatibles; genera consumo adicional.

#### Materializar un filtro repetido

```sql
CREATE MATERIALIZED VIEW IF NOT EXISTS DEMO_MV AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';
SELECT SUM(AMOUNT) FROM DEMO_MV;
DROP MATERIALIZED VIEW IF EXISTS DEMO_MV;
```

**Resultado esperado** 1300; al finalizar se elimina la vista de prueba.

### External Tables

**Clave** `external-tables`

**Definición** Una external table expone archivos externos mediante metadatos, sin cargar las filas a una tabla estándar de Snowflake.

**Búsqueda** External Tables; consultar archivos parquet externos

**Para recordar** El almacenamiento fuente permanece fuera de Snowflake; comprueba refresco de metadatos.

**Nota** Necesita bucket y permisos externos; no hay archivos de nube en el laboratorio local.

#### Consultar archivos Parquet externos

1. Configura un external stage autorizado con archivos Parquet.
2. Crea una external table con LOCATION apuntando a ese stage y formato PARQUET.
3. Refresca sus metadatos cuando corresponda y consulta SELECT COUNT(*) FROM la tabla creada.

**Resultado esperado** Conteo de filas de los archivos registrados, según el dataset externo.

### Hybrid Tables e índices

**Clave** `hybrid-tables-e-indices`

**Definición** Hybrid Tables están orientadas a cargas operativas de baja latencia y aplican PK/FK/UNIQUE; admiten índices secundarios.

**Búsqueda** Hybrid Tables e índices; crear una tabla operativa

**Para recordar** Las tablas estándar no usan CREATE INDEX convencional; en ellas se optimiza de otra forma.

**Nota** Requiere soporte regional, permisos y recursos; no usar para el laboratorio básico.

#### Crear una tabla operativa

```sql
CREATE HYBRID TABLE IF NOT EXISTS DEMO_HYBRID(ID NUMBER PRIMARY KEY, LABEL VARCHAR);
SHOW HYBRID TABLES LIKE 'DEMO_HYBRID';
```

**Resultado esperado** Objeto hybrid visible si la cuenta y región lo permiten.

### Iceberg, External Volumes y catálogo

**Clave** `iceberg-external-volumes-y-catalogo`

**Definición** Iceberg es un formato abierto de tablas; un external volume autoriza almacenamiento de nube y una catalog integration conecta catálogos compatibles cuando procede.

**Búsqueda** Iceberg, External Volumes y catálogo; registrar un dataset abierto

**Para recordar** Distingue catálogo administrado por Snowflake de catálogo externo.

**Nota** No se puede reproducir sin almacenamiento y catálogo autorizados.

#### Registrar un dataset abierto

1. Configura un external volume con permisos restringidos sobre el bucket de prueba.
2. Selecciona catálogo Snowflake o una integración externa compatible.
3. Crea la Iceberg table con la configuración de catálogo y ubicación.
4. Consulta sus filas y comprueba el catálogo/metadatos.

**Resultado esperado** La tabla expone el dataset Iceberg y conserva su formato abierto; los datos dependen del bucket.

### Delta Direct

**Clave** `delta-direct`

**Definición** Permite consultar datos Delta Lake mediante las opciones de interoperabilidad de Snowflake compatibles con ese formato.

**Búsqueda** Delta Direct; evaluar una tabla delta externa

**Para recordar** Comprueba soporte del catálogo, protocolo Delta y restricciones antes de decidir entre lectura directa o conversión.

**Nota** Depende de la disponibilidad y modalidad de interoperabilidad en la cuenta.

#### Evaluar una tabla Delta externa

1. En una cuenta compatible, configura el acceso al almacenamiento con un dataset Delta existente.
2. Sigue la guía oficial de Delta Direct para registrar la tabla y sus metadatos.
3. Compara COUNT(*) con el snapshot de origen y verifica cambios tras refrescar.

**Resultado esperado** Conteo coherente con el snapshot registrado; no se presupone escritura ni actualización automática.

## Time Travel y clonación

**Clave** `time-travel-y-clonacion`

### Definición

**Clave** `definicion`

**Definición** Time Travel permite consultar estados históricos y restaurar objetos dentro de su retención configurada.

**Búsqueda** Time Travel y clonación; Definición; consultar retención

**Para recordar** No es un historial ilimitado; comprueba tipo de tabla y edición.

#### Consultar retención

```sql
SHOW PARAMETERS LIKE 'DATA_RETENTION_TIME_IN_DAYS' IN TABLE ORDERS;
```

**Resultado esperado** Valor de retención efectivo para ORDERS.

### AT y BEFORE

**Clave** `at-y-before`

**Definición** AT consulta un instante histórico; BEFORE recupera el estado anterior a un punto o sentencia.

**Búsqueda** AT y BEFORE; ver el importe antes de una actualización

**Para recordar** El identificador de consulta y la retención deben ser válidos.

#### Ver el importe antes de una actualización

```sql
CREATE OR REPLACE TABLE DEMO_HISTORY CLONE ORDERS;
UPDATE DEMO_HISTORY SET AMOUNT=999 WHERE ORDER_ID=101;
SET QID=LAST_QUERY_ID();
SELECT AMOUNT FROM DEMO_HISTORY BEFORE(STATEMENT=>$QID) WHERE ORDER_ID=101;
```

**Resultado esperado** 100, siempre que Time Travel esté habilitado y el estado anterior siga retenido.

### UNDROP

**Clave** `undrop`

**Definición** UNDROP recupera objetos eliminados durante el periodo de Time Travel.

**Búsqueda** UNDROP; restaurar una tabla de prueba

**Para recordar** Evita conflictos de nombre y recupera antes de vencer la retención.

**Nota** Necesita retención mayor a cero.

#### Restaurar una tabla de prueba

```sql
CREATE OR REPLACE TABLE DEMO_UNDROP AS SELECT ORDER_ID FROM ORDERS;
DROP TABLE DEMO_UNDROP;
UNDROP TABLE DEMO_UNDROP;
SELECT COUNT(*) FROM DEMO_UNDROP;
```

**Resultado esperado** 8 filas recuperadas.

### Zero-copy Cloning

**Clave** `zero-copy-cloning`

**Definición** CLONE crea una copia lógica de un objeto compatible compartiendo inicialmente almacenamiento, hasta que las modificaciones divergen.

**Búsqueda** Zero-copy Cloning; probar una modificación sin tocar origen

**Para recordar** No significa costo cero para siempre ni que todos los objetos se clonen igual.

#### Probar una modificación sin tocar origen

```sql
CREATE OR REPLACE TABLE DEMO_CLONE CLONE ORDERS;
UPDATE DEMO_CLONE SET AMOUNT=999 WHERE ORDER_ID=101;
SELECT (SELECT AMOUNT FROM ORDERS WHERE ORDER_ID=101) AS ORIGINAL,(SELECT AMOUNT FROM DEMO_CLONE WHERE ORDER_ID=101) AS COPY;
```

**Resultado esperado** ORIGINAL=100, COPY=999.

### Fail-safe

**Clave** `fail-safe`

**Definición** Fail-safe ofrece recuperación gestionada por Snowflake después de Time Travel para datos elegibles de tablas permanentes.

**Búsqueda** Fail-safe; responder a pérdida fuera de retención

**Para recordar** No se consulta mediante SQL ni reemplaza una estrategia de respaldo; temporales y transient no tienen Fail-safe.

#### Responder a pérdida fuera de retención

1. Comprueba si el objeto sigue en Time Travel.
2. Si ya venció y es elegible, solicita evaluación a soporte de Snowflake.
3. Registra alcance y verifica lo que se pueda recuperar.

**Resultado esperado** Evaluación de recuperación, no garantía de restauración.

## Variables y Snowflake Scripting

**Clave** `variables-y-snowflake-scripting`

### Definición

**Clave** `definicion`

**Definición** Las variables permiten reutilizar valores y Snowflake Scripting añade bloques procedimentales al SQL.

**Búsqueda** Variables y Snowflake Scripting; Definición; reutilizar un umbral

**Para recordar** Distingue variable de sesión ($nombre), variable local y parámetros bind.

#### Reutilizar un umbral

```sql
SET MIN_AMOUNT=200;
SELECT COUNT(*) FROM ORDERS WHERE AMOUNT>=$MIN_AMOUNT;
UNSET MIN_AMOUNT;
```

**Resultado esperado** 4.

### IDENTIFIER y SQL dinámico

**Clave** `identifier-y-sql-dinamico`

**Definición** IDENTIFIER interpreta una variable como nombre de objeto; EXECUTE IMMEDIATE ejecuta una sentencia construida o almacenada.

**Búsqueda** IDENTIFIER y SQL dinámico; consultar una tabla elegida

**Para recordar** Parametriza valores y limita identificadores permitidos; no concatenes entrada sin validar.

#### Consultar una tabla elegida

```sql
SET T='ORDERS';
SELECT COUNT(*) FROM IDENTIFIER($T);
UNSET T;
```

**Resultado esperado** 8.

### Bloques, variables y IF

**Clave** `bloques-variables-y-if`

**Definición** Un bloque SQL Scripting declara variables, ejecuta sentencias y puede devolver un valor.

**Búsqueda** Bloques, variables y IF; evaluar un umbral en un bloque

**Para recordar** Usa := para asignar y RETURN para devolver el resultado.

#### Evaluar un umbral en un bloque

```sql
EXECUTE IMMEDIATE $$
DECLARE n NUMBER DEFAULT 8;
BEGIN
 IF (n >= 5) THEN RETURN 'OK'; END IF;
 RETURN 'LOW';
END;
$$;
```

**Resultado esperado** OK.

### Bucles, cursores y excepciones

**Clave** `bucles-cursores-y-excepciones`

**Definición** FOR permite recorrer intervalos o resultados; un cursor recorre filas; EXCEPTION maneja errores previstos.

**Búsqueda** Bucles, cursores y excepciones; acumular tres valores

**Para recordar** Prefiere SQL por conjuntos cuando no necesitas lógica fila por fila.

#### Acumular tres valores

```sql
EXECUTE IMMEDIATE $$
DECLARE n NUMBER DEFAULT 0;
BEGIN
 FOR i IN 1 TO 3 DO n := n+i; END FOR;
 RETURN n;
END;
$$;
```

**Resultado esperado** 6.

### EXECUTE IMMEDIATE y binds

**Clave** `execute-immediate-y-binds`

**Definición** USING suministra parámetros a SQL dinámico sin interpolarlos como texto.

**Búsqueda** EXECUTE IMMEDIATE y binds; ejecutar una consulta parametrizada

**Para recordar** Los parámetros de valor no son nombres de tabla; para nombres utiliza IDENTIFIER.

#### Ejecutar una consulta parametrizada

```sql
EXECUTE IMMEDIATE $$
DECLARE stmt VARCHAR DEFAULT 'SELECT COUNT(*) FROM ORDERS WHERE AMOUNT > ?';
 n NUMBER DEFAULT 200;
 rs RESULTSET;
BEGIN
 rs := (EXECUTE IMMEDIATE :stmt USING (n));
 RETURN TABLE(rs);
END;
$$;
```

**Resultado esperado** 2.

## Stages y formatos de archivos

**Clave** `stages-y-formatos-de-archivos`

### Definición

**Clave** `definicion`

**Definición** Un stage es una ubicación de archivos para importar, exportar o procesar datos.

**Búsqueda** Stages y formatos de archivos; Definición; preparar un stage de laboratorio

**Para recordar** Interno: almacenamiento de Snowflake; externo: bucket o contenedor cloud autorizado.

#### Preparar un stage de laboratorio

```sql
CREATE STAGE IF NOT EXISTS DEMO_STAGE;
SHOW STAGES LIKE 'DEMO_STAGE';
```

**Resultado esperado** Stage interno nombrado visible en PRACTICE.

### User, Table y Named Stage

**Clave** `user-table-y-named-stage`

**Definición** @~ identifica el stage del usuario, @%tabla el de una tabla y @nombre un stage con objeto propio.

**Búsqueda** User, Table y Named Stage; listar archivos de stages

**Para recordar** Cada tipo tiene permisos y usos distintos; el named stage puede reutilizarse entre tablas.

**Nota** Crea DEMO_STAGE con la ficha Definición.

#### Listar archivos de stages

```sql
LIST @~;
LIST @%ORDERS;
LIST @DEMO_STAGE;
```

**Resultado esperado** Listado de archivos existentes en cada ubicación; vacío si no hay archivos.

### External Stage y Storage Integration

**Clave** `external-stage-y-storage-integration`

**Definición** Una storage integration permite a Snowflake acceder a ubicaciones cloud autorizadas sin guardar claves de nube en SQL de cada stage.

**Búsqueda** External Stage y Storage Integration; conectar un bucket de pruebas

**Para recordar** Restringe ubicaciones y configura confianza IAM con el proveedor.

**Nota** Necesita infraestructura externa.

#### Conectar un bucket de pruebas

1. Un administrador crea la storage integration para el proveedor y prefijo permitido.
2. Configura la confianza y permisos cloud según DESCRIBE INTEGRATION.
3. Crea un external stage con URL y STORAGE_INTEGRATION.
4. Ejecuta LIST sobre el stage.

**Resultado esperado** Archivos del prefijo autorizado; los demás quedan fuera de alcance.

### FILE FORMAT para CSV

**Clave** `file-format-para-csv`

**Definición** Un file format define cómo interpretar archivos; CSV necesita delimitador, encabezado y reglas para vacíos.

**Búsqueda** FILE FORMAT para CSV; definir el formato del csv compartido

**Para recordar** SKIP_HEADER omite encabezados; EMPTY_FIELD_AS_NULL convierte campos vacíos a NULL.

#### Definir el formato del CSV compartido

```sql
CREATE OR REPLACE FILE FORMAT DEMO_CSV TYPE=CSV SKIP_HEADER=1 FIELD_OPTIONALLY_ENCLOSED_BY='"' EMPTY_FIELD_AS_NULL=TRUE;
```

**Resultado esperado** Formato nombrado listo para ventas.csv.

### JSON, Parquet, Avro, ORC y XML

**Clave** `json-parquet-avro-orc-y-xml`

**Definición** Los formatos estructurados o semiestructurados requieren opciones de lectura específicas; Parquet conserva tipos y almacena por columnas.

**Búsqueda** JSON, Parquet, Avro, ORC y XML; crear formatos para dos fuentes

**Para recordar** No uses opciones CSV para formatos binarios.

#### Crear formatos para dos fuentes

```sql
CREATE OR REPLACE FILE FORMAT DEMO_JSON TYPE=JSON;
CREATE OR REPLACE FILE FORMAT DEMO_PARQUET TYPE=PARQUET;
```

**Resultado esperado** Dos formatos registrados; AVRO, ORC y XML también tienen tipos de formato propios.

### PUT, GET, LIST y REMOVE

**Clave** `put-get-list-y-remove`

**Definición** PUT sube archivos a stages internos; GET descarga; LIST enumera y REMOVE elimina archivos del stage.

**Búsqueda** PUT, GET, LIST y REMOVE; subir el csv y comprobarlo

**Para recordar** PUT/GET requieren un cliente que los soporte y acceso al sistema de archivos local.

**Nota** Conserva el archivo hasta completar los ejemplos COPY. En Snowsight también se puede cargar desde la interfaz si está habilitada.

#### Subir el CSV y comprobarlo

1. Crea DEMO_STAGE.
2. En Snowflake CLI o un cliente compatible, ajusta la ruta y ejecuta PUT file:///ruta/ventas.csv @DEMO_STAGE AUTO_COMPRESS=FALSE OVERWRITE=TRUE;
3. Ejecuta LIST @DEMO_STAGE;
4. Para descargar, utiliza GET @DEMO_STAGE/ventas.csv file:///ruta/salida/;
5. REMOVE @DEMO_STAGE/ventas.csv elimina el archivo cuando termines las fichas de carga.

**Resultado esperado** El listado muestra ventas.csv después de PUT; GET crea una copia local; REMOVE lo retira.

## COPY INTO y calidad de carga

**Clave** `copy-into-y-calidad-de-carga`

### Definición

**Clave** `definicion`

**Definición** COPY INTO tabla importa archivos desde un stage; COPY INTO ubicación exporta resultados a archivos.

**Búsqueda** COPY INTO y calidad de carga; Definición; importar ventas.csv en una tabla aislada

**Para recordar** Cargar no es lo mismo que consultar directamente un stage.

**Nota** Requiere el archivo y formato de las fichas Stages; no altera ORDERS.

#### Importar ventas.csv en una tabla aislada

```sql
CREATE OR REPLACE TABLE DEMO_LOAD LIKE ORDERS;
COPY INTO DEMO_LOAD FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);
SELECT COUNT(*) FROM DEMO_LOAD;
```

**Resultado esperado** 2 filas cargadas.

### Consultar archivos y metadatos

**Clave** `consultar-archivos-y-metadatos`

**Definición** Las columnas $1, $2... representan campos del archivo; METADATA$FILENAME y METADATA$FILE_ROW_NUMBER identifican su origen.

**Búsqueda** Consultar archivos y metadatos; inspeccionar csv antes de cargar

**Para recordar** Guarda trazabilidad al cargar si necesitas investigar errores.

**Nota** Requiere DEMO_STAGE/ventas.csv y DEMO_CSV.

#### Inspeccionar CSV antes de cargar

```sql
SELECT $1::NUMBER AS ID,$3::NUMBER AS AMOUNT,METADATA$FILENAME AS FILE_NAME,METADATA$FILE_ROW_NUMBER AS LINE FROM @DEMO_STAGE/ventas.csv (FILE_FORMAT=>DEMO_CSV) ORDER BY ID;
```

**Resultado esperado** IDs 201 y 202, montos 80 y 120, nombre de archivo y número de fila registrados por Snowflake.

### VALIDATION_MODE y ON_ERROR

**Clave** `validation-mode-y-on-error`

**Definición** VALIDATION_MODE comprueba archivos sin cargar; ON_ERROR decide qué hacer ante errores durante la carga.

**Búsqueda** VALIDATION_MODE y ON_ERROR; validar el archivo compartido

**Para recordar** CONTINUE puede dejar una carga parcial; revisa filas rechazadas y reconcilia conteos.

**Nota** La validación no admite todas las modalidades de COPY con transformación.

#### Validar el archivo compartido

```sql
CREATE OR REPLACE TABLE DEMO_VALIDATE LIKE ORDERS;
COPY INTO DEMO_VALIDATE FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV) VALIDATION_MODE=RETURN_ALL_ERRORS;
SELECT COUNT(*) FROM DEMO_VALIDATE;
```

**Resultado esperado** No se esperan errores y conteo 0: no se insertaron filas.

### Transformar durante COPY

**Clave** `transformar-durante-copy`

**Definición** COPY puede seleccionar campos y aplicar transformaciones compatibles antes de insertar.

**Búsqueda** Transformar durante COPY; cargar solo id e importe

**Para recordar** Usa una tabla de destino con columnas y tipos correspondientes.

**Nota** Requiere el CSV compartido en el stage.

#### Cargar solo ID e importe

```sql
CREATE OR REPLACE TABLE DEMO_MINI(ID NUMBER,AMOUNT NUMBER(12,2));
COPY INTO DEMO_MINI FROM (SELECT $1::NUMBER,$3::NUMBER(12,2) FROM @DEMO_STAGE/ventas.csv) FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);
SELECT * FROM DEMO_MINI ORDER BY ID;
```

**Resultado esperado** 201:80,202:120.

### INFER_SCHEMA y Schema Evolution

**Clave** `infer-schema-y-schema-evolution`

**Definición** INFER_SCHEMA detecta columnas y tipos de archivos compatibles; Schema Evolution permite incorporar ciertos cambios de estructura en cargas configuradas.

**Búsqueda** INFER_SCHEMA y Schema Evolution; inferir columnas de parquet

**Para recordar** Revisa tipos inferidos y privilegios antes de permitir evolución automática.

**Nota** El archivo Parquet no forma parte del CSV compartido.

#### Inferir columnas de Parquet

1. Sube un archivo Parquet de prueba con columnas id y amount a un stage.
2. Crea DEMO_PARQUET como formato PARQUET.
3. Ejecuta SELECT * FROM TABLE(INFER_SCHEMA(LOCATION=>'@DEMO_STAGE/ejemplo.parquet',FILE_FORMAT=>'DEMO_PARQUET'));
4. Para evolución, configura ENABLE_SCHEMA_EVOLUTION y MATCH_BY_COLUMN_NAME según los requisitos oficiales.

**Resultado esperado** Metadatos de id y amount con sus tipos inferidos; la tabla no cambia al ejecutar INFER_SCHEMA.

### Historial e idempotencia de COPY

**Clave** `historial-e-idempotencia-de-copy`

**Definición** Snowflake registra archivos cargados y puede evitar su recarga; esa protección tiene límites temporales y depende del destino.

**Búsqueda** Historial e idempotencia de COPY; repetir una carga

**Para recordar** FORCE=TRUE puede duplicar filas; conserva un control de lotes y claves de negocio.

#### Repetir una carga

```sql
CREATE OR REPLACE TABLE DEMO_REPEAT LIKE ORDERS;
COPY INTO DEMO_REPEAT FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);
COPY INTO DEMO_REPEAT FROM @DEMO_STAGE/ventas.csv FILE_FORMAT=(FORMAT_NAME=DEMO_CSV);
SELECT COUNT(*) FROM DEMO_REPEAT;
```

**Resultado esperado** 2 filas, no 4, si el archivo no cambió y la metadata de carga sigue vigente.

### Unloading y exportación

**Clave** `unloading-y-exportacion`

**Definición** COPY INTO @stage escribe datos de una tabla o consulta en archivos de salida.

**Búsqueda** Unloading y exportación; exportar pedidos completados

**Para recordar** Usa un prefijo de salida distinto al de entrada; protege datos sensibles antes de exportar.

#### Exportar pedidos completados

```sql
COPY INTO @DEMO_STAGE/export/demo_done.csv FROM (SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed' ORDER BY ORDER_ID) FILE_FORMAT=(TYPE=CSV COMPRESSION=NONE) HEADER=TRUE SINGLE=TRUE OVERWRITE=TRUE;
LIST @DEMO_STAGE/export/;
```

**Resultado esperado** Archivo de salida con encabezado y seis filas, si el stage existe.

## Datos semiestructurados

**Clave** `datos-semiestructurados`

### Definición

**Clave** `definicion`

**Definición** VARIANT conserva valores de estructura flexible, incluidos objetos y arreglos, sin exigir una columna física por atributo.

**Búsqueda** Datos semiestructurados; Definición; consultar un atributo json

**Para recordar** Extraer una propiedad devuelve VARIANT; convierte a tipo escalar para calcular.

#### Consultar un atributo JSON

```sql
SELECT EVENT_ID,PAYLOAD:event::VARCHAR AS EVENT FROM EVENTS ORDER BY EVENT_ID;
```

**Resultado esperado** 1:purchase,2:visit.

### PARSE_JSON, OBJECT y ARRAY

**Clave** `parse-json-object-y-array`

**Definición** PARSE_JSON interpreta texto JSON; OBJECT_CONSTRUCT y ARRAY_CONSTRUCT crean estructuras a partir de expresiones SQL.

**Búsqueda** PARSE_JSON, OBJECT y ARRAY; construir una estructura

**Para recordar** JSON mal formado da error; TRY_PARSE_JSON devuelve NULL cuando falla.

#### Construir una estructura

```sql
SELECT OBJECT_CONSTRUCT('id',1,'items',ARRAY_CONSTRUCT('A','B')) AS DATA;
```

**Resultado esperado** Objeto con id=1 e items=["A","B"]; orden de claves no garantizado.

### Rutas y tipos

**Clave** `rutas-y-tipos`

**Definición** Los operadores : y [] navegan propiedades y arreglos; los nombres JSON distinguen mayúsculas.

**Búsqueda** Rutas y tipos; extraer primer producto

**Para recordar** Los índices de ARRAY comienzan en cero.

#### Extraer primer producto

```sql
SELECT PAYLOAD:items[0]:sku::VARCHAR AS SKU,PAYLOAD:items[0]:qty::NUMBER AS QTY FROM EVENTS WHERE EVENT_ID=1;
```

**Resultado esperado** A,2.

### NULL SQL y null JSON

**Clave** `null-sql-y-null-json`

**Definición** NULL SQL representa ausencia; JSON null es un valor dentro de VARIANT y puede detectarse con IS_NULL_VALUE.

**Búsqueda** NULL SQL y null JSON; comparar dos rutas

**Para recordar** Una propiedad inexistente y una propiedad JSON null no son idénticas.

#### Comparar dos rutas

```sql
SELECT IS_NULL_VALUE(PARSE_JSON('{"a":null}'):a) AS JSON_NULL, PARSE_JSON('{}'):a IS NULL AS MISSING;
```

**Resultado esperado** TRUE, TRUE.

### LATERAL y FLATTEN

**Clave** `lateral-y-flatten`

**Definición** FLATTEN convierte un arreglo u objeto en filas; LATERAL permite usar columnas de la fila izquierda como entrada.

**Búsqueda** LATERAL y FLATTEN; expandir productos de eventos

**Para recordar** OUTER=>TRUE conserva una fila para expansiones vacías.

#### Expandir productos de eventos

```sql
SELECT e.EVENT_ID,f.VALUE:sku::VARCHAR AS SKU,f.VALUE:qty::NUMBER AS QTY FROM EVENTS e,LATERAL FLATTEN(INPUT=>e.PAYLOAD:items) f ORDER BY e.EVENT_ID,f.INDEX;
```

**Resultado esperado** 1:A,2 y 1:B,1; el evento 2 no produce filas.

## Snowpipe y streaming

**Clave** `snowpipe-y-streaming`

### Definición

**Clave** `definicion`

**Definición** Snowpipe carga archivos de forma continua; Snowpipe Streaming ingiere filas directamente sin exigir archivos intermedios.

**Búsqueda** Snowpipe y streaming; Definición; elegir ingesta de ventas

**Para recordar** Elige carga masiva para lotes, Snowpipe para archivos frecuentes y streaming para eventos de baja latencia.

#### Elegir ingesta de ventas

1. Un ERP deja CSV cada hora: usa COPY programado o Snowpipe si requiere automatización por eventos.
2. Una aplicación emite eventos individuales: evalúa Snowpipe Streaming.

**Resultado esperado** Dos patrones distintos de ingesta, según latencia y origen.

### Pipes y AUTO_INGEST

**Clave** `pipes-y-auto-ingest`

**Definición** Un pipe define un COPY; AUTO_INGEST permite dispararlo con notificaciones cloud configuradas.

**Búsqueda** Pipes y AUTO_INGEST; definir un pipe sin activar notificaciones

**Para recordar** Las notificaciones requieren configuración en el proveedor; no basta crear el objeto.

**Nota** Requiere stage y formato. No activar notificaciones en un entorno no autorizado.

#### Definir un pipe sin activar notificaciones

```sql
CREATE OR REPLACE TABLE DEMO_PIPE_TARGET LIKE ORDERS;
CREATE OR REPLACE PIPE DEMO_PIPE AS COPY INTO DEMO_PIPE_TARGET FROM @DEMO_STAGE FILE_FORMAT=(FORMAT_NAME=DEMO_CSV) PATTERN='.*ventas[.]csv';
SHOW PIPES LIKE 'DEMO_PIPE';
```

**Resultado esperado** Pipe registrado; no presupone que los archivos se cargaron automáticamente.

### Snowpipe Streaming y Kafka

**Clave** `snowpipe-streaming-y-kafka`

**Definición** Streaming ingiere filas con SDK/API compatibles; el conector Kafka facilita enviar eventos de topics a Snowflake.

**Búsqueda** Snowpipe Streaming y Kafka; validar un lote de eventos

**Para recordar** Configura offsets, errores, esquema y garantías de entrega según el cliente.

**Nota** Requiere cliente, autenticación e infraestructura externa.

#### Validar un lote de eventos

1. En un entorno de pruebas configura el SDK o conector Kafka autorizado y una tabla destino.
2. Envía dos eventos con IDs de negocio conocidos.
3. Comprueba los IDs en el destino y revisa el offset/estado de ingestión.

**Resultado esperado** Los dos eventos aparecen según la semántica de entrega configurada; el retraso es variable.

### Notification Integrations y monitorización

**Clave** `notification-integrations-y-monitorizacion`

**Definición** Una integración de notificación conecta servicios de mensajería o notificaciones soportados; el historial y estado permiten detectar retrasos.

**Búsqueda** Notification Integrations y monitorización; comprobar estado del pipe

**Para recordar** El pipe puede existir y no recibir notificaciones válidas.

**Nota** Requiere DEMO_PIPE de la ficha anterior y permisos.

#### Comprobar estado del pipe

```sql
SELECT SYSTEM$PIPE_STATUS('DEMO_PIPE');
```

**Resultado esperado** JSON de estado y métricas disponibles del pipe; depende de la cuenta y actividad.

## Streams y CDC

**Clave** `streams-y-cdc`

### Definición

**Clave** `definicion`

**Definición** Un stream expone cambios desde un offset de una tabla u objeto compatible, facilitando procesamiento incremental (CDC).

**Búsqueda** Streams y CDC; Definición; crear stream y detectar inserción

**Para recordar** Consultar un stream no consume su offset; una transacción DML que lo consume y confirma sí lo avanza.

#### Crear stream y detectar inserción

```sql
CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER,AMOUNT NUMBER);
CREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC;
INSERT INTO DEMO_CDC VALUES(1,10);
SELECT ID,METADATA$ACTION,METADATA$ISUPDATE FROM DEMO_STREAM;
```

**Resultado esperado** 1, INSERT, FALSE.

### Standard y Append-only Streams

**Clave** `standard-y-append-only-streams`

**Definición** Standard captura el delta neto de inserciones y eliminaciones, incluidas actualizaciones; append-only captura inserciones de tablas compatibles.

**Búsqueda** Standard y Append-only Streams; observar una actualización

**Para recordar** Append-only no sirve para replicar borrados o modificaciones.

#### Observar una actualización

```sql
CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER,AMOUNT NUMBER);
INSERT INTO DEMO_CDC VALUES(1,10);
CREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC;
UPDATE DEMO_CDC SET AMOUNT=20 WHERE ID=1;
SELECT AMOUNT,METADATA$ACTION,METADATA$ISUPDATE FROM DEMO_STREAM ORDER BY AMOUNT;
```

**Resultado esperado** 10:DELETE,TRUE y 20:INSERT,TRUE.

### Consumir cambios y offsets

**Clave** `consumir-cambios-y-offsets`

**Definición** Insertar desde el stream a una tabla en una transacción confirmada avanza su offset.

**Búsqueda** Consumir cambios y offsets; consumir inserciones de un stream

**Para recordar** Crea una tabla destino por consumidor y no compartas un stream entre procesos independientes.

#### Consumir inserciones de un stream

```sql
CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER);
CREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC APPEND_ONLY=TRUE;
CREATE OR REPLACE TABLE DEMO_CDC_OUT(ID NUMBER);
INSERT INTO DEMO_CDC VALUES(1);
INSERT INTO DEMO_CDC_OUT SELECT ID FROM DEMO_STREAM;
SELECT COUNT(*) FROM DEMO_STREAM;
```

**Resultado esperado** 0 pendientes tras confirmar el INSERT; DEMO_CDC_OUT contiene 1.

### Staleness y recuperación

**Clave** `staleness-y-recuperacion`

**Definición** Un stream puede quedar obsoleto si no se consume antes de perderse la historia necesaria de su fuente.

**Búsqueda** Staleness y recuperación; inspeccionar vigencia

**Para recordar** Comprueba STALE_AFTER y recrea/reconcilia con un backfill si pierdes cambios.

**Nota** Requiere DEMO_STREAM.

#### Inspeccionar vigencia

```sql
SHOW STREAMS LIKE 'DEMO_STREAM';
```

**Resultado esperado** Metadatos de stale y stale_after según configuración; no se presupone que esté vencido.

## Tasks y orquestación

**Clave** `tasks-y-orquestacion`

### Definición

**Clave** `definicion`

**Definición** Una task ejecuta SQL o procedimientos con un horario, un disparador o dependencias de otras tasks.

**Búsqueda** Tasks y orquestación; Definición; crear una tarea manual de prueba

**Para recordar** Una task nueva se crea suspendida; actívala solo si quieres consumo programado.

#### Crear una tarea manual de prueba

```sql
CREATE OR REPLACE TABLE DEMO_TASK_OUT(RUN_AT TIMESTAMP_LTZ);
CREATE OR REPLACE TASK DEMO_TASK WAREHOUSE=ALLDOC_WH AS INSERT INTO DEMO_TASK_OUT VALUES(CURRENT_TIMESTAMP());
SHOW TASKS LIKE 'DEMO_TASK';
```

**Resultado esperado** Task registrada en estado suspendido, tabla vacía.

### SCHEDULE, CRON y ejecución manual

**Clave** `schedule-cron-y-ejecucion-manual`

**Definición** SCHEDULE admite intervalos o CRON con zona horaria; EXECUTE TASK inicia una ejecución bajo demanda.

**Búsqueda** SCHEDULE, CRON y ejecución manual; probar la tarea creada

**Para recordar** La ejecución es asíncrona; revisa historial antes de esperar resultados.

**Nota** Requiere la task de Definición y privilegios de ejecución.

#### Probar la tarea creada

```sql
EXECUTE TASK DEMO_TASK;
SELECT * FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(TASK_NAME=>'DEMO_TASK',RESULT_LIMIT=>10));
```

**Resultado esperado** Tras completar con éxito, historial SUCCEEDED y una fila nueva en DEMO_TASK_OUT.

### Triggered Tasks y SYSTEM$STREAM_HAS_DATA

**Clave** `triggered-tasks-y-system-stream-has-data`

**Definición** Una triggered task puede ejecutar trabajo cuando un stream contiene cambios, evitando sondeos continuos en la consulta de negocio.

**Búsqueda** Triggered Tasks y SYSTEM$STREAM_HAS_DATA; vincular el stream append-only a una tarea

**Para recordar** La condición puede dar falsos positivos; el DML debe tolerar lotes vacíos.

**Nota** Activar solo en laboratorio y suspender al terminar.

#### Vincular el stream append-only a una tarea

```sql
CREATE OR REPLACE TABLE DEMO_CDC(ID NUMBER);
CREATE OR REPLACE STREAM DEMO_STREAM ON TABLE DEMO_CDC APPEND_ONLY=TRUE;
CREATE OR REPLACE TABLE DEMO_CDC_OUT(ID NUMBER);
CREATE OR REPLACE TASK DEMO_TRIGGER WAREHOUSE=ALLDOC_WH WHEN SYSTEM$STREAM_HAS_DATA('DEMO_STREAM') AS INSERT INTO DEMO_CDC_OUT SELECT ID FROM DEMO_STREAM;
```

**Resultado esperado** Task suspendida y preparada; al reanudarla e insertar un ID en DEMO_CDC, puede consumirlo y guardarlo en DEMO_CDC_OUT.

### Task Graphs y dependencias

**Clave** `task-graphs-y-dependencias`

**Definición** AFTER define dependencias en un grafo de tasks; una raíz coordina la ejecución de sus descendientes.

**Búsqueda** Task Graphs y dependencias; encadenar carga y control

**Para recordar** Las dependencias evitan transformar antes de cargar; habilita hijos antes de la raíz.

#### Encadenar carga y control

```sql
CREATE OR REPLACE TASK DEMO_ROOT WAREHOUSE=ALLDOC_WH AS SELECT 1;
CREATE OR REPLACE TASK DEMO_CHILD WAREHOUSE=ALLDOC_WH AFTER DEMO_ROOT AS SELECT 2;
SHOW TASKS;
```

**Resultado esperado** Dos tasks suspendidas, con DEMO_CHILD dependiente de DEMO_ROOT.

### Serverless, errores y limpieza

**Clave** `serverless-errores-y-limpieza`

**Definición** Una task serverless usa cómputo administrado; las tasks también admiten configuraciones de reintento, timeout y suspensión tras fallos.

**Búsqueda** Serverless, errores y limpieza; detener una tarea de prueba

**Para recordar** Serverless no usa el presupuesto del warehouse como si fuera el mismo recurso.

**Nota** Para una task serverless omite WAREHOUSE al crearla y configura permisos/recursos según el caso; consulta historial antes de borrar.

#### Detener una tarea de prueba

```sql
ALTER TASK DEMO_TASK SUSPEND;
DROP TASK IF EXISTS DEMO_TASK;
```

**Resultado esperado** Se detiene la programación y se elimina la task; no borra DEMO_TASK_OUT.

## Dynamic Tables

**Clave** `dynamic-tables`

### Definición

**Clave** `definicion`

**Definición** Una dynamic table mantiene resultados de una consulta con una meta de frescura y un warehouse de refresco.

**Búsqueda** Dynamic Tables; Definición; mantener ventas por cliente

**Para recordar** No necesita definir manualmente cada paso incremental, pero no admite cualquier SQL.

**Nota** Genera consumo mientras refresca; suspende o elimina tras la prueba.

#### Mantener ventas por cliente

```sql
CREATE OR REPLACE DYNAMIC TABLE DEMO_DT TARGET_LAG='5 minutes' WAREHOUSE=ALLDOC_WH REFRESH_MODE=INCREMENTAL AS SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1;
SELECT * FROM DEMO_DT ORDER BY CUSTOMER_ID;
```

**Resultado esperado** Tras inicialización exitosa: 1:300,2:300,3:300,4:400.

### TARGET_LAG y DOWNSTREAM

**Clave** `target-lag-y-downstream`

**Definición** TARGET_LAG expresa una meta de atraso respecto a datos fuente; DOWNSTREAM delega el momento de refresco a consumidores dependientes.

**Búsqueda** TARGET_LAG y DOWNSTREAM; cambiar meta de frescura

**Para recordar** No es un horario exacto ni una garantía de latencia.

#### Cambiar meta de frescura

```sql
ALTER DYNAMIC TABLE DEMO_DT SET TARGET_LAG='10 minutes';
SHOW DYNAMIC TABLES LIKE 'DEMO_DT';
```

**Resultado esperado** Meta de 10 minutos configurada para DEMO_DT.

### REFRESH_MODE e historial

**Clave** `refresh-mode-e-historial`

**Definición** INCREMENTAL procesa cambios compatibles; FULL recalcula el conjunto; AUTO selecciona un modo soportado al crear el objeto. Otros modos dependen de la versión.

**Búsqueda** REFRESH_MODE e historial; comprobar estado y detener refresco

**Para recordar** Comprueba el modo efectivo, fallos de refresh y costo; no asumas que AUTO siempre es incremental.

#### Comprobar estado y detener refresco

```sql
SHOW DYNAMIC TABLES LIKE 'DEMO_DT';
ALTER DYNAMIC TABLE DEMO_DT SUSPEND;
```

**Resultado esperado** Modo y estado visibles; refrescos automáticos suspendidos tras la segunda sentencia.

### Elegir Dynamic Tables, Streams o Tasks

**Clave** `elegir-dynamic-tables-streams-o-tasks`

**Definición** Dynamic Tables sirven para resultados declarativos; Streams y Tasks permiten controlar cambios, procedimientos, MERGE y efectos laterales.

**Búsqueda** Elegir Dynamic Tables, Streams o Tasks; diseñar un pipeline de reporting

**Para recordar** Elige según control, SQL compatible, latencia y costo.

#### Diseñar un pipeline de reporting

1. Usa una dynamic table para totales de ventas declarativos.
2. Usa stream + task para una dimensión SCD2 que requiere cerrar intervalos y abrir versiones.
3. Comprueba frescura, duplicados y consumo de ambos.

**Resultado esperado** Dos patrones con mecanismos de actualización distintos.

## ELT y modelado analítico

**Clave** `elt-y-modelado-analitico`

### Definición

**Clave** `definicion`

**Definición** ELT carga datos primero y los transforma dentro de Snowflake; ETL transforma antes de cargar.

**Búsqueda** ELT y modelado analítico; Definición; diseñar tres capas

**Para recordar** Separa fuentes crudas, datos limpios y modelos de consumo.

#### Diseñar tres capas

1. RAW conserva archivos/registros recibidos.
2. STAGING normaliza tipos y claves.
3. MART publica métricas y dimensiones verificadas.

**Resultado esperado** El informe usa MART; la investigación de errores puede volver a RAW.

### Hechos, dimensiones y granularidad

**Clave** `hechos-dimensiones-y-granularidad`

**Definición** Una tabla de hechos contiene eventos o medidas; una dimensión aporta atributos de negocio para filtrar o agrupar.

**Búsqueda** Hechos, dimensiones y granularidad; medir ventas con una dimensión

**Para recordar** Define qué representa una fila antes de elegir medidas y joins.

#### Medir ventas con una dimensión

```sql
SELECT c.COUNTRY,SUM(o.AMOUNT) AS SALES FROM ORDERS o JOIN CUSTOMERS c USING(CUSTOMER_ID) WHERE o.STATUS='completed' GROUP BY 1 ORDER BY 1;
```

**Resultado esperado** Mexico:600, Spain:300, USA:400.

### Star Schema y Snowflake Schema

**Clave** `star-schema-y-snowflake-schema`

**Definición** El esquema estrella conecta hechos con dimensiones relativamente desnormalizadas; snowflake schema normaliza dimensiones en tablas adicionales.

**Búsqueda** Star Schema y Snowflake Schema; diseñar dimensiones de productos

**Para recordar** El modelo snowflake no es lo mismo que la plataforma Snowflake.

#### Diseñar dimensiones de productos

1. Estrella: FACT_ORDER_ITEMS → DIM_PRODUCT con categoría incorporada.
2. Snowflake schema: FACT_ORDER_ITEMS → DIM_PRODUCT → DIM_CATEGORY.
3. Compara los joins necesarios para ventas por categoría.

**Resultado esperado** Misma métrica con uno o dos joins de dimensiones, respectivamente.

### SCD tipo 1

**Clave** `scd-tipo-1`

**Definición** Una Slowly Changing Dimension tipo 1 sobrescribe atributos y conserva solo el estado actual.

**Búsqueda** SCD tipo 1; actualizar país de un cliente

**Para recordar** Úsala si no necesitas el valor histórico de la dimensión.

#### Actualizar país de un cliente

```sql
CREATE OR REPLACE TABLE DEMO_DIM1 CLONE CUSTOMERS;
UPDATE DEMO_DIM1 SET COUNTRY='Canada' WHERE CUSTOMER_ID=1;
SELECT COUNTRY FROM DEMO_DIM1 WHERE CUSTOMER_ID=1;
```

**Resultado esperado** Canada; el país anterior no queda como fila de dimensión.

### SCD tipo 2

**Clave** `scd-tipo-2`

**Definición** SCD2 conserva versiones de atributos mediante fechas de vigencia y una clave de versión o equivalente.

**Búsqueda** SCD tipo 2; registrar cambio de país

**Para recordar** Cierra la versión anterior y abre la nueva en una operación coherente; evita intervalos solapados.

#### Registrar cambio de país

```sql
CREATE OR REPLACE TABLE DEMO_DIM2(ID NUMBER,COUNTRY VARCHAR,VALID_FROM DATE,VALID_TO DATE);
INSERT INTO DEMO_DIM2 VALUES(1,'Mexico','2026-01-01',NULL);
BEGIN;
UPDATE DEMO_DIM2 SET VALID_TO='2026-03-01' WHERE ID=1 AND VALID_TO IS NULL;
INSERT INTO DEMO_DIM2 VALUES(1,'Canada','2026-03-01',NULL);
COMMIT;
SELECT COUNTRY,VALID_FROM,VALID_TO FROM DEMO_DIM2 ORDER BY VALID_FROM;
```

**Resultado esperado** Mexico desde enero hasta inicio de marzo; Canada desde marzo, sin fecha de cierre.

### Incrementales, backfills e idempotencia

**Clave** `incrementales-backfills-e-idempotencia`

**Definición** Una carga incremental procesa datos nuevos o modificados; un backfill reprocesa periodos anteriores.

**Búsqueda** Incrementales, backfills e idempotencia; reprocesar febrero

**Para recordar** Un mismo lote repetido debe producir el mismo estado final; usa claves y límites de periodo, no solo timestamps de llegada.

#### Reprocesar febrero

```sql
CREATE OR REPLACE TABLE DEMO_MART LIKE ORDERS;
BEGIN;
DELETE FROM DEMO_MART WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';
INSERT INTO DEMO_MART SELECT * FROM ORDERS WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';
COMMIT;
SELECT COUNT(*) FROM DEMO_MART;
```

**Resultado esperado** 4 filas de febrero. Repetir únicamente el bloque BEGIN–COMMIT mantiene 4, si la fuente no cambia.

### Deduplicación y validaciones

**Clave** `deduplicacion-y-validaciones`

**Definición** La calidad de datos comprueba unicidad, campos obligatorios, relaciones, valores permitidos y consistencia de métricas.

**Búsqueda** Deduplicación y validaciones; elegir un lead por correo

**Para recordar** No uses DISTINCT para ocultar una multiplicación de filas por JOIN.

#### Elegir un lead por correo

```sql
SELECT LEAD_ID,EMAIL FROM LEADS WHERE EMAIL IS NOT NULL QUALIFY ROW_NUMBER() OVER(PARTITION BY EMAIL ORDER BY LEAD_ID DESC)=1 ORDER BY LEAD_ID;
```

**Resultado esperado** 2:ana@example.com y 3:luis@example.com.

### Data Metric Functions

**Clave** `data-metric-functions`

**Definición** Las DMF son funciones de métricas de calidad que pueden ejecutarse o asociarse a objetos compatibles con programación y expectativas.

**Búsqueda** Data Metric Functions; medir nulos en correos

**Para recordar** Distingue medir anomalías de corregir automáticamente los datos.

**Nota** Requiere disponibilidad de DMF y permisos para usar las funciones del sistema.

#### Medir nulos en correos

```sql
SELECT SNOWFLAKE.CORE.NULL_COUNT(SELECT EMAIL FROM LEADS);
```

**Resultado esperado** 1.

## Métricas de negocio

**Clave** `metricas-de-negocio`

### Definición

**Clave** `definicion`

**Definición** El análisis transforma preguntas de negocio en medidas, dimensiones, filtros, periodo y granularidad definidos.

**Búsqueda** Métricas de negocio; Definición; calcular ticket promedio

**Para recordar** Aclara denominador, estados válidos y unidad de análisis antes de escribir SQL.

#### Calcular ticket promedio

```sql
SELECT ROUND(SUM(AMOUNT)/NULLIF(COUNT(*),0),2) AS AOV FROM ORDERS WHERE STATUS='completed';
```

**Resultado esperado** 216.67 por pedido completado.

### Cohortes y retención

**Clave** `cohortes-y-retencion`

**Definición** Una cohorte agrupa entidades por fecha de inicio; retención mide cuántas vuelven a estar activas en un periodo posterior.

**Búsqueda** Cohortes y retención; medir clientes de febrero que vuelven en marzo

**Para recordar** Define actividad y denominador, no confundas usuarios con eventos.

#### Medir clientes de febrero que vuelven en marzo

```sql
WITH f AS (SELECT DISTINCT CUSTOMER_ID FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01'), m AS (SELECT DISTINCT CUSTOMER_ID FROM ORDERS WHERE STATUS='completed' AND ORDER_DATE>='2026-03-01' AND ORDER_DATE<'2026-04-01') SELECT COUNT(m.CUSTOMER_ID) AS RETAINED,COUNT(*) AS COHORT_SIZE,100.0*COUNT(m.CUSTOMER_ID)/NULLIF(COUNT(*),0) AS PCT FROM f LEFT JOIN m USING(CUSTOMER_ID);
```

**Resultado esperado** 0 retenidos de 2, 0%. La cohorte se define por actividad en febrero, no por registro inicial.

### Funnels y conversión

**Clave** `funnels-y-conversion`

**Definición** Un funnel mide cuántas entidades alcanzan pasos definidos, normalmente en orden y dentro de un periodo.

**Búsqueda** Funnels y conversión; medir conversión simple de clientes registrados

**Para recordar** Para un funnel secuencial, comprueba timestamps y orden; contar eventos no equivale a contar usuarios.

#### Medir conversión simple de clientes registrados

```sql
SELECT COUNT(DISTINCT IFF(o.STATUS='completed',c.CUSTOMER_ID,NULL)) AS BUYERS,COUNT(DISTINCT c.CUSTOMER_ID) AS SIGNUPS,100.0*BUYERS/NULLIF(SIGNUPS,0) AS PCT FROM CUSTOMERS c LEFT JOIN ORDERS o USING(CUSTOMER_ID);
```

**Resultado esperado** 4 compradores de 6 registrados, aproximadamente 66.67%. Es una conversión de dos estados, no un funnel temporal completo.

### Comparación entre periodos

**Clave** `comparacion-entre-periodos`

**Definición** Una métrica por periodo puede compararse con la anterior mediante LAG; el crecimiento se divide entre el periodo base.

**Búsqueda** Comparación entre periodos; comparar ventas mensuales

**Para recordar** Si faltan periodos, crea calendario antes de LAG si necesitas meses consecutivos.

#### Comparar ventas mensuales

```sql
WITH m AS (SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS M,SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1), p AS (SELECT *,LAG(SALES) OVER(ORDER BY M) AS PREV FROM m) SELECT M,SALES,PREV,ROUND(100*(SALES-PREV)/NULLIF(PREV,0),2) AS GROWTH FROM p ORDER BY M;
```

**Resultado esperado** Febrero:600,NULL,NULL; marzo:700,600,16.67%.

## Rendimiento y diagnóstico

**Clave** `rendimiento-y-diagnostico`

### Definición

**Clave** `definicion`

**Definición** Optimizar implica identificar el trabajo costoso y reducir lecturas, movimiento de datos o esperas sin cambiar el resultado.

**Búsqueda** Rendimiento y diagnóstico; Definición; localizar una consulta de ventas

**Para recordar** Mide antes y después con la misma carga y condiciones de caché.

#### Localizar una consulta de ventas

```sql
ALTER SESSION SET QUERY_TAG='alldoc-performance';
SELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed';
```

**Resultado esperado** 1300 y una consulta identificable por QUERY_TAG en el historial.

### Query History y Query Profile

**Clave** `query-history-y-query-profile`

**Definición** Query History muestra ejecuciones; Query Profile desglosa operadores y estadísticas de la ejecución real.

**Búsqueda** Query History y Query Profile; inspeccionar una consulta ejecutada

**Para recordar** EXPLAIN estima el plan; el perfil mide lo que ocurrió.

#### Inspeccionar una consulta ejecutada

1. Ejecuta la consulta de la ficha Definición.
2. En Snowsight abre Query History y selecciona esa consulta.
3. Abre Query Profile y revisa tiempo, filas, bytes y operadores.

**Resultado esperado** Perfil de la consulta de ventas; los valores físicos dependen del entorno.

### Pruning y filtros

**Clave** `pruning-y-filtros`

**Definición** El optimizador puede descartar micro-partitions con metadatos incompatibles con un filtro.

**Búsqueda** Pruning y filtros; comparar rango y función

**Para recordar** Evita transformar innecesariamente la columna filtrada; no todos los filtros consiguen pruning.

#### Comparar rango y función

```sql
SELECT COUNT(*) FROM ORDERS WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';
```

**Resultado esperado** 4; en tablas grandes el rango puede reducir particiones escaneadas. En el laboratorio no se espera una diferencia significativa.

### Clustering Keys y Automatic Clustering

**Clave** `clustering-keys-y-automatic-clustering`

**Definición** Una clave de clustering ayuda a mantener proximidad física de datos con valores relacionados; el mantenimiento automático puede reorganizarlos.

**Búsqueda** Clustering Keys y Automatic Clustering; estimar organización física

**Para recordar** Úsala solo cuando el beneficio de pruning justifique costo en tablas grandes.

#### Estimar organización física

```sql
SELECT SYSTEM$CLUSTERING_INFORMATION('ORDERS','(ORDER_DATE)');
```

**Resultado esperado** JSON de información de clustering; la tabla pequeña no justifica activar clustering.

### Cachés

**Clave** `caches`

**Definición** Snowflake puede reutilizar resultados persistidos y datos locales del warehouse; Cloud Services también mantiene metadatos.

**Búsqueda** Cachés; controlar reutilización de resultados

**Para recordar** Una segunda ejecución rápida no demuestra por sí sola un mejor plan.

#### Controlar reutilización de resultados

```sql
ALTER SESSION SET USE_CACHED_RESULT=FALSE;
SELECT SUM(AMOUNT) FROM ORDERS;
ALTER SESSION UNSET USE_CACHED_RESULT;
```

**Resultado esperado** 1450; se evita reutilizar el resultado persistido en esa prueba, no necesariamente otras cachés.

### Search Optimization y Query Acceleration

**Clave** `search-optimization-y-query-acceleration`

**Definición** Search Optimization acelera patrones selectivos elegibles con estructuras administradas; Query Acceleration aporta cómputo adicional a partes elegibles de consultas.

**Búsqueda** Search Optimization y Query Acceleration; evaluar antes de habilitar

**Para recordar** Ambos tienen costo y condiciones de elegibilidad diferentes.

**Nota** Requieren funcionalidades/ediciones compatibles.

#### Evaluar antes de habilitar

1. Selecciona una tabla grande y una consulta selectiva repetitiva.
2. Inspecciona el perfil y elegibilidad de Search Optimization o Query Acceleration.
3. Estima costo y compara tiempos en un entorno autorizado.

**Resultado esperado** Decisión fundamentada en costo y latencia; no se modifica el laboratorio.

### Spilling y Query Queuing

**Clave** `spilling-y-query-queuing`

**Definición** Spilling ocurre cuando datos intermedios desbordan memoria a almacenamiento; queuing indica espera por recursos u otros factores.

**Búsqueda** Spilling y Query Queuing; diagnosticar un join pesado

**Para recordar** Revisa volumen intermedio y concurrencia antes de aumentar tamaño.

#### Diagnosticar un join pesado

1. En Query Profile localiza bytes spilled to local/remote storage.
2. Compara filas de entrada y salida del join.
3. En Query History revisa tiempos de cola.

**Resultado esperado** Evidencia para reducir cardinalidad, ajustar tamaño o separar workloads.

### Query Insights, Query Hash y estadísticas

**Clave** `query-insights-query-hash-y-estadisticas`

**Definición** Query Insights señala patrones diagnosticables; los hashes agrupan consultas similares y las estadísticas describen operadores ejecutados.

**Búsqueda** Query Insights, Query Hash y estadísticas; ver estadísticas de operadores

**Para recordar** Agrupar por hash ayuda a priorizar consultas recurrentes, no sustituye verificar cada plan.

**Nota** Requiere permisos sobre la consulta y una ejecución con perfil disponible.

#### Ver estadísticas de operadores

```sql
SELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed';
SELECT OPERATOR_TYPE,OPERATOR_STATISTICS FROM TABLE(GET_QUERY_OPERATOR_STATS(LAST_QUERY_ID()));
```

**Resultado esperado** Operadores y estadísticas disponibles de la consulta anterior.

## Costos y monitoreo

**Clave** `costos-y-monitoreo`

### Definición

**Clave** `definicion`

**Definición** El costo combina cómputo medido en créditos, almacenamiento y otros servicios o transferencias según modalidad.

**Búsqueda** Costos y monitoreo; Definición; ver uso de warehouses

**Para recordar** Créditos no equivalen a una moneda fija; el contrato y la región importan.

**Nota** No es una factura completa; algunos servicios se miden aparte.

#### Ver uso de warehouses

```sql
SELECT WAREHOUSE_NAME,SUM(CREDITS_USED) AS CREDITS FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY WHERE START_TIME>=DATEADD(DAY,-7,CURRENT_TIMESTAMP()) GROUP BY 1 ORDER BY 2 DESC;
```

**Resultado esperado** Consumo por warehouse de los últimos siete días, sujeto a latencia y permisos.

### Resource Monitors

**Clave** `resource-monitors`

**Definición** Un resource monitor vigila créditos de warehouses y permite notificar o suspender según umbrales.

**Búsqueda** Resource Monitors; diseñar un límite para laboratorio

**Para recordar** No cubre todos los servicios serverless ni impone un límite exacto de gasto total.

**Nota** Requiere permisos de administración.

#### Diseñar un límite para laboratorio

1. Un administrador crea un monitor con cuota mensual de prueba y umbrales de aviso/suspensión.
2. Lo asigna a ALLDOC_WH si es exclusivo del laboratorio.
3. Revisa el consumo y las notificaciones.

**Resultado esperado** Monitor vinculado a ese warehouse y acciones configuradas; no se afecta producción.

### Budgets

**Clave** `budgets`

**Definición** Budgets permiten vigilar gasto y previsiones de recursos y servicios admitidos, incluidos determinados serverless.

**Búsqueda** Budgets; configurar seguimiento de costos

**Para recordar** Una notificación de presupuesto no implica suspensión automática.

#### Configurar seguimiento de costos

1. En Cost Management crea un budget para recursos de prueba autorizados.
2. Define límite y destinatarios.
3. Verifica recursos incluidos y previsión.

**Resultado esperado** Panel con consumo y estado del presupuesto; no garantiza evitar sobrecostos.

### ACCOUNT_USAGE e INFORMATION_SCHEMA

**Clave** `account-usage-e-information-schema`

**Definición** ACCOUNT_USAGE ofrece historial y metadatos a escala de cuenta con latencia; INFORMATION_SCHEMA describe objetos de una base y funciones de historial de alcance específico.

**Búsqueda** ACCOUNT_USAGE e INFORMATION_SCHEMA; consultar esquema actual

**Para recordar** Elige fuente según frescura, retención y permisos.

#### Consultar esquema actual

```sql
SELECT TABLE_NAME FROM ALLDOC_LAB.INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='PRACTICE' AND TABLE_NAME IN ('CUSTOMERS','ORDERS') ORDER BY 1;
```

**Resultado esperado** CUSTOMERS y ORDERS.

### Alerts, Event Tables y observabilidad

**Clave** `alerts-event-tables-y-observabilidad`

**Definición** Alerts ejecutan acciones ante condiciones; Event Tables recopilan telemetría de código instrumentado, como logs, trazas y métricas.

**Búsqueda** Alerts, Event Tables y observabilidad; diseñar alerta de carga

**Para recordar** Separa alertar por anomalías de almacenar evidencia de ejecución.

#### Diseñar alerta de carga

1. Crea una comprobación de lotes fallidos y define una alerta con horario/condición soportados.
2. Configura acción autorizada (por ejemplo notificación).
3. Simula un fallo de prueba y revisa historial; suspende al terminar.

**Resultado esperado** Evento de alerta al cumplirse la condición, con trazabilidad; configuración dependiente de la cuenta.

### Límites, timeouts y parámetros

**Clave** `limites-timeouts-y-parametros`

**Definición** Los parámetros de cuenta, usuario, sesión u objeto controlan comportamientos y ciertos límites.

**Búsqueda** Límites, timeouts y parámetros; limitar consultas de una sesión

**Para recordar** Los niveles de configuración y precedencia varían según parámetro.

#### Limitar consultas de una sesión

```sql
ALTER SESSION SET STATEMENT_TIMEOUT_IN_SECONDS=60;
SHOW PARAMETERS LIKE 'STATEMENT_TIMEOUT_IN_SECONDS' IN SESSION;
ALTER SESSION UNSET STATEMENT_TIMEOUT_IN_SECONDS;
```

**Resultado esperado** Configuración de 60 segundos visible durante la prueba, luego restaurada al valor heredado.

## Roles y privilegios

**Clave** `roles-y-privilegios`

### Definición

**Clave** `definicion`

**Definición** El control de acceso de Snowflake combina roles y propiedad de objetos; los privilegios se conceden según una jerarquía.

**Búsqueda** Roles y privilegios; Definición; comprobar rol activo

**Para recordar** Usa mínimo privilegio: acceso a datos, contenedores y cómputo son permisos distintos.

#### Comprobar rol activo

```sql
SELECT CURRENT_ROLE();
SHOW GRANTS TO ROLE PUBLIC;
```

**Resultado esperado** Rol de sesión y concesiones visibles a PUBLIC.

### Roles del sistema

**Clave** `roles-del-sistema`

**Definición** ACCOUNTADMIN concentra administración superior; SYSADMIN administra objetos/warehouses; SECURITYADMIN gestiona concesiones; USERADMIN administra usuarios/roles; PUBLIC se concede a todos.

**Búsqueda** Roles del sistema; inspeccionar jerarquía

**Para recordar** No uses ACCOUNTADMIN para consultas de trabajo diario.

#### Inspeccionar jerarquía

```sql
SHOW ROLES;
```

**Resultado esperado** Roles visibles para el rol activo; no se presupone acceso a todos.

### GRANT, REVOKE y jerarquía

**Clave** `grant-revoke-y-jerarquia`

**Definición** GRANT concede privilegios o roles; REVOKE los retira. Un rol superior hereda privilegios de roles concedidos a él.

**Búsqueda** GRANT, REVOKE y jerarquía; conceder acceso de lectura al laboratorio

**Para recordar** SELECT sobre tabla no basta: hacen falta USAGE sobre base, esquema y warehouse para la consulta habitual.

**Nota** Ejecuta solo con un administrador autorizado. Para retirar acceso: REVOKE SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS FROM ROLE ALLDOC_READER.

#### Conceder acceso de lectura al laboratorio

```sql
CREATE ROLE IF NOT EXISTS ALLDOC_READER;
GRANT USAGE ON WAREHOUSE ALLDOC_WH TO ROLE ALLDOC_READER;
GRANT USAGE ON DATABASE ALLDOC_LAB TO ROLE ALLDOC_READER;
GRANT USAGE ON SCHEMA ALLDOC_LAB.PRACTICE TO ROLE ALLDOC_READER;
GRANT SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS TO ROLE ALLDOC_READER;
SHOW GRANTS TO ROLE ALLDOC_READER;
```

**Resultado esperado** Concesiones indicadas visibles; asignar el rol al usuario autorizado es un paso aparte.

### Future Grants y OWNERSHIP

**Clave** `future-grants-y-ownership`

**Definición** Future Grants aplican permisos a objetos que se creen posteriormente; OWNERSHIP controla el objeto y su transferencia.

**Búsqueda** Future Grants y OWNERSHIP; configurar lectura de tablas futuras

**Para recordar** GRANT sobre tablas existentes no cubre automáticamente las futuras.

**Nota** Requiere rol y autorización de la ficha anterior; evitar en esquemas con datos sensibles.

#### Configurar lectura de tablas futuras

```sql
GRANT SELECT ON FUTURE TABLES IN SCHEMA ALLDOC_LAB.PRACTICE TO ROLE ALLDOC_READER;
SHOW FUTURE GRANTS IN SCHEMA ALLDOC_LAB.PRACTICE;
```

**Resultado esperado** Concesión futura visible; no altera permisos de tablas actuales.

### Database Roles y Managed Access Schemas

**Clave** `database-roles-y-managed-access-schemas`

**Definición** Un database role agrupa privilegios dentro de una base; un managed access schema centraliza decisiones de concesión en el propietario del esquema o rol autorizado.

**Búsqueda** Database Roles y Managed Access Schemas; diseñar rol de lectura limitado

**Para recordar** Un database role se concede a roles de cuenta para su uso, no se activa como rol de cuenta.

**Nota** Requiere permisos de creación y concesión.

#### Diseñar rol de lectura limitado

```sql
CREATE DATABASE ROLE IF NOT EXISTS ALLDOC_LAB.DEMO_DB_READER;
GRANT USAGE ON DATABASE ALLDOC_LAB TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;
GRANT USAGE ON SCHEMA ALLDOC_LAB.PRACTICE TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;
GRANT SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;
```

**Resultado esperado** Database role con permisos de datos; para usarlo concédelo a un rol de cuenta autorizado.

## Autenticación y redes

**Clave** `autenticacion-y-redes`

### Definición

**Clave** `definicion`

**Definición** La autenticación verifica la identidad; el control de acceso decide qué puede hacer y la red limita desde dónde puede conectarse.

**Búsqueda** Autenticación y redes; Definición; validar una sesión autorizada

**Para recordar** No confundas iniciar sesión con tener permisos de consulta.

#### Validar una sesión autorizada

```sql
SELECT CURRENT_USER(),CURRENT_ROLE(),CURRENT_ACCOUNT();
```

**Resultado esperado** Usuario, rol y cuenta reales de la conexión.

### MFA y SSO

**Clave** `mfa-y-sso`

**Definición** MFA añade un factor de verificación; SSO delega autenticación a un proveedor de identidad mediante configuración federada.

**Búsqueda** MFA y SSO; conectar con identidad corporativa

**Para recordar** Sigue las políticas de la organización; no desactives MFA para automatizar scripts.

#### Conectar con identidad corporativa

1. Usa el acceso SSO configurado por tu organización.
2. Completa los factores requeridos.
3. Verifica CURRENT_USER() y CURRENT_ROLE().

**Resultado esperado** Sesión iniciada con identidad autorizada o error de autenticación controlado.

### OAuth y Key-pair Authentication

**Clave** `oauth-y-key-pair-authentication`

**Definición** OAuth usa tokens autorizados; key-pair autentica mediante un par criptográfico y una clave pública registrada.

**Búsqueda** OAuth y Key-pair Authentication; configurar una cuenta de servicio

**Para recordar** Nunca incluyas claves privadas ni tokens en código o repositorios.

#### Configurar una cuenta de servicio

1. Un administrador configura un método no interactivo permitido (OAuth o key-pair).
2. Almacena credenciales en un gestor de secretos.
3. Ejecuta una consulta de prueba con un rol mínimo y valida rotación/revocación.

**Resultado esperado** Conexión autorizada sin contraseñas incrustadas.

### Network Policies y conectividad privada

**Clave** `network-policies-y-conectividad-privada`

**Definición** Las network policies restringen orígenes de conexión; la conectividad privada permite tráfico mediante enlaces cloud compatibles (como PrivateLink).

**Búsqueda** Network Policies y conectividad privada; validar conectividad de un cliente autorizado

**Para recordar** Prueba cambios con una vía administrativa de recuperación para evitar bloquear el acceso.

#### Validar conectividad de un cliente autorizado

1. Configura política de prueba y red privada según proveedor y edición.
2. Prueba desde la red permitida y desde una red no permitida.
3. Revisa el historial de accesos y errores.

**Resultado esperado** Conexión admitida o bloqueada según política; no se cambia una cuenta real desde los apuntes.

### External Access Integrations y Secrets

**Clave** `external-access-integrations-y-secrets`

**Definición** Las integraciones de acceso externo autorizan destinos de red para código ejecutado en Snowflake; Secrets almacenan valores sensibles gestionados.

**Búsqueda** External Access Integrations y Secrets; autorizar una api de prueba

**Para recordar** Restringe destinos, roles y secretos; no concedas acceso general a Internet.

#### Autorizar una API de prueba

1. Define una network rule de salida para el host permitido.
2. Crea un secret si la API lo requiere y una external access integration.
3. Asocia integración y secret a una UDF/procedimiento autorizado.
4. Ejecuta una solicitud de prueba y verifica que otros destinos no estén permitidos.

**Resultado esperado** Acceso a la API autorizada bajo la configuración; no se muestran credenciales.

## Gobernanza y auditoría

**Clave** `gobernanza-y-auditoria`

### Definición

**Clave** `definicion`

**Definición** La gobernanza define qué datos son sensibles, quién puede verlos, cómo se transforman y cómo se controla su uso.

**Búsqueda** Gobernanza y auditoría; Definición; revisar exposición de columnas

**Para recordar** Combina permisos, políticas, clasificación, trazabilidad y auditoría.

#### Revisar exposición de columnas

```sql
SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='PRACTICE' AND TABLE_NAME='CUSTOMERS' ORDER BY ORDINAL_POSITION;
```

**Resultado esperado** CUSTOMER_ID, NAME, COUNTRY, SIGNUP_DATE y sus tipos.

### Masking Policies

**Clave** `masking-policies`

**Definición** Una masking policy transforma valores de una columna según el contexto de acceso.

**Búsqueda** Masking Policies; enmascarar correo en tabla de prueba

**Para recordar** No modifica el dato almacenado; requiere edición y privilegios compatibles.

**Nota** Ejemplo didáctico de roles, no una política de producción. Requiere permisos de creación y aplicación.

#### Enmascarar correo en tabla de prueba

```sql
CREATE OR REPLACE TABLE DEMO_MASK CLONE LEADS;
CREATE OR REPLACE MASKING POLICY DEMO_EMAIL_MASK AS (v VARCHAR) RETURNS VARCHAR -> CASE WHEN CURRENT_ROLE()='ALLDOC_READER' THEN v ELSE '***' END;
ALTER TABLE DEMO_MASK MODIFY COLUMN EMAIL SET MASKING POLICY DEMO_EMAIL_MASK;
SELECT EMAIL FROM DEMO_MASK WHERE LEAD_ID=1;
```

**Resultado esperado** ana@example.com si rol activo es ALLDOC_READER; *** para otros roles con acceso.

### Row Access Policies

**Clave** `row-access-policies`

**Definición** Una row access policy decide qué filas son visibles mediante una expresión booleana evaluada al consultar.

**Búsqueda** Row Access Policies; restringir filas por país

**Para recordar** La política no reemplaza GRANT SELECT; puede usar tablas de mapeo de acceso.

**Nota** Requiere edición y permisos compatibles.

#### Restringir filas por país

```sql
CREATE OR REPLACE TABLE DEMO_ROWS CLONE CUSTOMERS;
CREATE OR REPLACE ROW ACCESS POLICY DEMO_COUNTRY_POLICY AS (c VARCHAR) RETURNS BOOLEAN -> c='Mexico';
ALTER TABLE DEMO_ROWS ADD ROW ACCESS POLICY DEMO_COUNTRY_POLICY ON (COUNTRY);
SELECT COUNT(*) FROM DEMO_ROWS;
```

**Resultado esperado** 3 filas visibles con país Mexico.

### Tags, clasificación y lineage

**Clave** `tags-clasificacion-y-lineage`

**Definición** Los tags etiquetan objetos; la clasificación identifica datos sensibles y lineage rastrea dependencias y flujos.

**Búsqueda** Tags, clasificación y lineage; etiquetar una columna de correo

**Para recordar** Un tag por sí solo no enmascara; necesita una política/configuración asociada.

**Nota** La clasificación automática y lineage dependen de edición y permisos.

#### Etiquetar una columna de correo

```sql
CREATE TAG IF NOT EXISTS DEMO_SENSITIVITY;
CREATE OR REPLACE TABLE DEMO_TAGGED CLONE LEADS;
ALTER TABLE DEMO_TAGGED MODIFY COLUMN EMAIL SET TAG DEMO_SENSITIVITY='PII';
SELECT SYSTEM$GET_TAG('DEMO_SENSITIVITY','DEMO_TAGGED.EMAIL','COLUMN');
```

**Resultado esperado** PII, si el rol puede consultar el tag.

### Aggregation, Projection y Join Policies

**Clave** `aggregation-projection-y-join-policies`

**Definición** Estas políticas limitan, respectivamente, la extracción de grupos demasiado pequeños, la proyección de columnas y el uso de joins según condiciones definidas.

**Búsqueda** Aggregation, Projection y Join Policies; evaluar publicación de datos sensibles

**Para recordar** No equivalen a eliminar columnas de un SELECT; las reglas afectan consultas autorizadas a objetos protegidos.

**Nota** Disponibilidad y permisos específicos; no aplicar a las tablas compartidas.

#### Evaluar publicación de datos sensibles

1. Sobre una copia de prueba, define un umbral de agregación y columnas que no deben proyectarse.
2. Configura reglas de unión permitidas si procede.
3. Prueba una consulta permitida y otra prohibida bajo un rol consumidor.

**Resultado esperado** Consultas aceptadas, restringidas o rechazadas conforme a las políticas; la forma exacta depende de su definición.

### Access History y Login History

**Clave** `access-history-y-login-history`

**Definición** Access History permite investigar acceso y cambios a objetos; Login History muestra intentos de autenticación.

**Búsqueda** Access History y Login History; inspeccionar accesos recientes

**Para recordar** Son vistas con permisos, retención y latencia propios; no garantizan registro inmediato.

**Nota** Access History requiere edición compatible y privilegios adecuados.

#### Inspeccionar accesos recientes

```sql
SELECT EVENT_TIMESTAMP,USER_NAME,IS_SUCCESS FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY WHERE EVENT_TIMESTAMP>=DATEADD(DAY,-1,CURRENT_TIMESTAMP()) ORDER BY EVENT_TIMESTAMP DESC LIMIT 10;
```

**Resultado esperado** Hasta diez eventos reales visibles; no se pueden predecir usuarios o cantidades.

## Compartición y recuperación ante desastres

**Clave** `comparticion-y-recuperacion-ante-desastres`

### Definición

**Clave** `definicion`

**Definición** Snowflake puede compartir objetos autorizados sin exportar copias tradicionales y replicar recursos compatibles entre cuentas.

**Búsqueda** Compartición y recuperación ante desastres; Definición; inspeccionar shares visibles

**Para recordar** Compartición y replicación resuelven problemas distintos: acceso frente a continuidad.

#### Inspeccionar shares visibles

```sql
SHOW SHARES;
```

**Resultado esperado** Listado de shares visibles o vacío según la cuenta.

### Secure Data Sharing y Reader Accounts

**Clave** `secure-data-sharing-y-reader-accounts`

**Definición** Un share concede acceso a objetos al consumidor; una reader account permite acceso a consumidores sin su propia cuenta Snowflake bajo condiciones del proveedor.

**Búsqueda** Secure Data Sharing y Reader Accounts; compartir un resumen autorizado

**Para recordar** El consumidor normalmente aporta cómputo en su propia cuenta; los reader accounts generan costos para el proveedor.

**Nota** Requiere dos cuentas o un reader account autorizado.

#### Compartir un resumen autorizado

1. Crea una secure view con importes agregados, sin datos personales.
2. Configura un share, concede uso de contenedores y SELECT de la vista.
3. Autoriza la cuenta consumidora de prueba.
4. El consumidor crea una base desde el share y consulta el resumen.

**Resultado esperado** Lectura del resumen permitido, sin acceso automático a tablas fuente.

### Marketplace, Listings y Auto-Fulfillment

**Clave** `marketplace-listings-y-auto-fulfillment`

**Definición** Listings publican productos de datos a consumidores; auto-fulfillment puede entregar productos entre regiones/clouds soportadas.

**Búsqueda** Marketplace, Listings y Auto-Fulfillment; preparar una publicación privada

**Para recordar** Revisa visibilidad, contratos, regiones, replicación y costo antes de publicar.

#### Preparar una publicación privada

1. Define un producto con datos sintéticos y documentación.
2. Crea una listing privada para un consumidor autorizado.
3. Revisa configuración de disponibilidad regional y auto-fulfillment.
4. Valida el acceso desde la cuenta consumidora.

**Resultado esperado** Listing privada visible al destinatario autorizado; no publicación pública automática.

### Data Clean Rooms

**Clave** `data-clean-rooms`

**Definición** Un clean room permite colaboración analítica con controles sobre consultas, datos y resultados entre participantes.

**Búsqueda** Data Clean Rooms; comparar audiencias sin exponer listas

**Para recordar** No es simplemente un share de filas sin restricciones.

**Nota** Requiere servicio y cuentas compatibles.

#### Comparar audiencias sin exponer listas

1. Dos participantes aportan datos sintéticos de audiencias autorizadas.
2. Definen una plantilla de intersección y restricciones de privacidad.
3. Ejecutan la plantilla y revisan el resultado permitido.

**Resultado esperado** Conteo agregado de coincidencias, sujeto a reglas; no listas de identificadores sin autorización.

### Replication, Failover y Disaster Recovery

**Clave** `replication-failover-y-disaster-recovery`

**Definición** Los replication/failover groups replican objetos compatibles y permiten promover secundarios cuando corresponde; DR define objetivos de pérdida (RPO) y recuperación (RTO).

**Búsqueda** Replication, Failover y Disaster Recovery; planificar una prueba de continuidad

**Para recordar** Replica no significa copia instantánea; practica failover y failback sin afectar producción.

**Nota** Requiere administración, edición y regiones compatibles.

#### Planificar una prueba de continuidad

1. Define RPO/RTO y selecciona cuentas de origen/destino compatibles.
2. Configura grupo de replicación o failover y refresco.
3. Comprueba sincronización y realiza una promoción solo en un entorno aislado.
4. Verifica accesos, datos y aplicaciones.

**Resultado esperado** Medición de tiempo y pérdida efectiva respecto a los objetivos; no se presume conmutación automática.

## Python Connector

**Clave** `python-connector`

### Definición

**Clave** `definicion`

**Definición** snowflake-connector-python conecta Python con una cuenta y ejecuta SQL mediante la API DB-API.

**Búsqueda** Python Connector; Definición; abrir conexión y consultar conteo

**Para recordar** El servidor ejecuta SQL; Python recibe los resultados.

**Nota** Configura la conexión indicada en Datos compartidos.

#### Abrir conexión y consultar conteo

```python
import snowflake.connector
with snowflake.connector.connect(connection_name="alldoc") as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM ORDERS")
        print(cur.fetchone())
```

**Resultado esperado** (8,).

### execute, parámetros y executemany

**Clave** `execute-parametros-y-executemany`

**Definición** execute ejecuta una sentencia; los parámetros separan valores de la sintaxis; executemany aplica una operación a múltiples conjuntos de valores.

**Búsqueda** execute, parámetros y executemany; buscar pedidos con parámetro

**Para recordar** Con paramstyle predeterminado pyformat usa %s para valores; evita f-strings con entrada de usuario.

**Nota** executemany es útil para inserciones por lote; no sustituye COPY en cargas grandes.

#### Buscar pedidos con parámetro

```python
import snowflake.connector
with snowflake.connector.connect(connection_name="alldoc") as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT ORDER_ID FROM ORDERS WHERE STATUS=%s AND AMOUNT>%s ORDER BY ORDER_ID", ("completed", 200))
        print(cur.fetchall())
```

**Resultado esperado** [(103,), (107,)].

### fetchone, fetchmany y fetchall

**Clave** `fetchone-fetchmany-y-fetchall`

**Definición** fetchone recupera una fila, fetchmany un lote y fetchall todas las filas restantes.

**Búsqueda** fetchone, fetchmany y fetchall; leer resultados por lotes

**Para recordar** Cada llamada avanza el cursor; evita fetchall para resultados que no caben en memoria.

#### Leer resultados por lotes

```python
import snowflake.connector
with snowflake.connector.connect(connection_name="alldoc") as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT ORDER_ID FROM ORDERS ORDER BY ORDER_ID")
        print(cur.fetchmany(2))
        print(cur.fetchone())
```

**Resultado esperado** [(101,), (102,)] y después (103,).

### Pandas: fetch_pandas_all y batches

**Clave** `pandas-fetch-pandas-all-y-batches`

**Definición** El conector puede convertir resultados a pandas mediante fetch_pandas_all o iterar DataFrames con fetch_pandas_batches.

**Búsqueda** Pandas: fetch_pandas_all y batches; llevar un resumen a pandas

**Para recordar** El procesamiento pandas es local y consume memoria del cliente.

**Nota** Instala el extra pandas del conector.

#### Llevar un resumen a pandas

```python
import snowflake.connector
with snowflake.connector.connect(connection_name="alldoc") as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1 ORDER BY 1")
        df = cur.fetch_pandas_all()
        print(df.shape)
```

**Resultado esperado** (4, 2), con columnas CUSTOMER_ID y TOTAL.

### write_pandas

**Clave** `write-pandas`

**Definición** write_pandas carga un DataFrame pandas en una tabla Snowflake usando archivos y carga administrada por el conector.

**Búsqueda** write_pandas; cargar dos filas en una tabla aislada

**Para recordar** Revisa nombres, tipos, quoting, éxito y conteos; no sobrescribe por defecto.

**Nota** Requiere permisos de tabla y staging y dependencias pandas.

#### Cargar dos filas en una tabla aislada

```python
import pandas as pd
import snowflake.connector
from snowflake.connector.pandas_tools import write_pandas
with snowflake.connector.connect(connection_name="alldoc") as conn:
    with conn.cursor() as cur:
        cur.execute("CREATE OR REPLACE TABLE DEMO_PD(ID NUMBER, AMOUNT NUMBER)")
    df = pd.DataFrame({"ID":[1,2], "AMOUNT":[10,20]})
    success, chunks, rows, output = write_pandas(conn, df, "DEMO_PD")
    print(success, rows)
```

**Resultado esperado** True 2 si la carga termina correctamente.

## Snowpark Python

**Clave** `snowpark-python`

### Definición

**Clave** `definicion`

**Definición** Snowpark ofrece DataFrames y expresiones que se traducen en operaciones ejecutadas en Snowflake.

**Búsqueda** Snowpark Python; Definición; abrir sesión y contar pedidos

**Para recordar** No es pandas: una transformación Snowpark suele ser lazy, es decir, no ejecuta hasta una acción.

**Nota** Requiere conexión alldoc y paquete snowflake-snowpark-python.

#### Abrir sesión y contar pedidos

```python
from snowflake.snowpark import Session
session = Session.builder.config("connection_name", "alldoc").create()
try:
    print(session.table("ORDERS").count())
finally:
    session.close()
```

**Resultado esperado** 8.

### session.sql y session.table

**Clave** `session-sql-y-session-table`

**Definición** session.sql construye un DataFrame desde una consulta; session.table lo construye desde una tabla o vista.

**Búsqueda** session.sql y session.table; consultar ventas con sql

**Para recordar** Una llamada a sql no ejecuta por sí sola la consulta; usa collect, show u otra acción.

**Nota** Usa la sesión abierta como en Definición (antes de close).

#### Consultar ventas con SQL

```python
df = session.sql("SELECT SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS=?", params=["completed"])
print(df.collect())
```

**Resultado esperado** Lista con una Row cuyo TOTAL es 1300.

### select, filter y order_by

**Clave** `select-filter-y-order-by`

**Definición** Estas operaciones proyectan, filtran y ordenan un DataFrame Snowpark mediante expresiones de columna.

**Búsqueda** select, filter y order_by; obtener pedidos grandes

**Para recordar** Usa col para referenciar columnas; filter no equivale a filtrar una lista local.

**Nota** Requiere sesión abierta.

#### Obtener pedidos grandes

```python
from snowflake.snowpark.functions import col
df = session.table("ORDERS").filter((col("STATUS")=="completed") & (col("AMOUNT")>200)).select("ORDER_ID","AMOUNT").sort("ORDER_ID")
df.show()
```

**Resultado esperado** 103:300 y 107:400.

### group_by y agg

**Clave** `group-by-y-agg`

**Definición** group_by forma grupos y agg aplica agregaciones usando funciones Snowpark.

**Búsqueda** group_by y agg; calcular ventas por cliente

**Para recordar** Se ejecuta en Snowflake, no necesita descargar filas primero.

**Nota** Requiere sesión abierta.

#### Calcular ventas por cliente

```python
from snowflake.snowpark.functions import col, sum as sf_sum
df = session.table("ORDERS").filter(col("STATUS")=="completed").group_by("CUSTOMER_ID").agg(sf_sum("AMOUNT").alias("TOTAL")).sort("CUSTOMER_ID")
df.show()
```

**Resultado esperado** 1:300,2:300,3:300,4:400.

### join y granularidad

**Clave** `join-y-granularidad`

**Definición** join combina DataFrames por claves o expresiones; sus cardinalidades son las mismas que en SQL.

**Búsqueda** join y granularidad; traer el nombre de un comprador

**Para recordar** Selecciona columnas explícitamente para evitar nombres ambiguos.

**Nota** Requiere sesión abierta.

#### Traer el nombre de un comprador

```python
from snowflake.snowpark.functions import col
o = session.table("ORDERS").select("ORDER_ID","CUSTOMER_ID")
c = session.table("CUSTOMERS").select("CUSTOMER_ID","NAME")
o.join(c,"CUSTOMER_ID").filter(col("ORDER_ID")==101).select("ORDER_ID","NAME").show()
```

**Resultado esperado** 101, Ana.

### Lazy Evaluation, Pushdown y acciones

**Clave** `lazy-evaluation-pushdown-y-acciones`

**Definición** Snowpark compone un plan lazy y envía operaciones compatibles al servidor (pushdown); collect, count, show y to_pandas materializan resultados de distintas formas.

**Búsqueda** Lazy Evaluation, Pushdown y acciones; obtener un escalar y un dataframe local

**Para recordar** Filtra y agrega antes de traer datos a Python.

**Nota** Requiere sesión abierta y dependencias pandas.

#### Obtener un escalar y un DataFrame local

```python
from snowflake.snowpark.functions import col
df = session.table("ORDERS").filter(col("STATUS")=="completed").select("ORDER_ID")
print(df.count())
print(df.to_pandas().shape)
```

**Resultado esperado** 6 y (6, 1); ambas son acciones.

### save_as_table y modos de escritura

**Clave** `save-as-table-y-modos-de-escritura`

**Definición** DataFrame.write.save_as_table persiste resultados en Snowflake; mode determina si reemplaza, agrega o rechaza la existencia del destino.

**Búsqueda** save_as_table y modos de escritura; guardar un modelo de completados

**Para recordar** overwrite puede sustituir datos: utiliza tablas de laboratorio.

**Nota** Requiere sesión abierta y permiso de escritura.

#### Guardar un modelo de completados

```python
from snowflake.snowpark.functions import col
session.table("ORDERS").filter(col("STATUS")=="completed").write.mode("overwrite").save_as_table("DEMO_SP_DONE")
print(session.table("DEMO_SP_DONE").count())
```

**Resultado esperado** 6 filas.

## UDF, UDTF y procedimientos

**Clave** `udf-udtf-y-procedimientos`

### Definición

**Clave** `definicion`

**Definición** Una UDF devuelve un valor por llamada, una UDTF devuelve filas y un stored procedure encapsula operaciones ejecutables con CALL.

**Búsqueda** UDF, UDTF y procedimientos; Definición; crear una función sql reutilizable

**Para recordar** Usa funciones para transformar expresiones; procedimientos para flujos con efectos y control.

#### Crear una función SQL reutilizable

```sql
CREATE OR REPLACE FUNCTION DEMO_TAX(x NUMBER) RETURNS NUMBER LANGUAGE SQL AS $$ x*0.16 $$;
SELECT DEMO_TAX(100);
```

**Resultado esperado** 16.

### Python UDF

**Clave** `python-udf`

**Definición** Una UDF Python ejecuta una función handler dentro de un runtime admitido por Snowflake.

**Búsqueda** Python UDF; transformar texto con python

**Para recordar** Elige runtime y dependencias soportados; evita acceso externo salvo integración autorizada.

**Nota** Requiere runtime 3.12 disponible y privilegios de creación.

#### Transformar texto con Python

```sql
CREATE OR REPLACE FUNCTION DEMO_LABEL(s VARCHAR) RETURNS VARCHAR LANGUAGE PYTHON RUNTIME_VERSION='3.12' HANDLER='label' AS $$
def label(s):
    return s.upper() if s is not None else None
$$;
SELECT DEMO_LABEL('ana');
```

**Resultado esperado** ANA.

### UDTF

**Clave** `udtf`

**Definición** Una función de tabla devuelve un conjunto de filas y se consulta mediante TABLE; puede implementarse en SQL o lenguajes soportados como Python.

**Búsqueda** UDTF; encapsular pedidos de un cliente

**Para recordar** Define columnas de salida y cuántas filas genera por entrada.

#### Encapsular pedidos de un cliente

```sql
CREATE OR REPLACE FUNCTION DEMO_ORDERS_FOR(cid NUMBER) RETURNS TABLE(ORDER_ID NUMBER,AMOUNT NUMBER(12,2)) AS $$ SELECT o.ORDER_ID,o.AMOUNT FROM ORDERS o WHERE o.CUSTOMER_ID=cid $$;
SELECT * FROM TABLE(DEMO_ORDERS_FOR(1)) ORDER BY ORDER_ID;
```

**Resultado esperado** 101:100,102:200,108:50.

### Stored Procedures y derechos

**Clave** `stored-procedures-y-derechos`

**Definición** Un procedimiento puede ejecutar SQL y lógica procedimental; EXECUTE AS OWNER o CALLER define el contexto de derechos.

**Búsqueda** Stored Procedures y derechos; crear procedimiento sql que devuelve conteo

**Para recordar** No expongas privilegios del propietario sin limitar y validar entradas.

#### Crear procedimiento SQL que devuelve conteo

```sql
CREATE OR REPLACE PROCEDURE DEMO_COUNT() RETURNS NUMBER LANGUAGE SQL EXECUTE AS CALLER AS $$
DECLARE n NUMBER;
BEGIN
 SELECT COUNT(*) INTO :n FROM ORDERS;
 RETURN n;
END;
$$;
CALL DEMO_COUNT();
```

**Resultado esperado** 8.

### Python Stored Procedures

**Clave** `python-stored-procedures`

**Definición** Un procedimiento Python usa un handler que recibe una sesión Snowpark y puede consultar o modificar objetos autorizados.

**Búsqueda** Python Stored Procedures; contar pedidos mediante snowpark

**Para recordar** La sesión del handler la proporciona Snowflake; no abras otra conexión sin necesidad.

**Nota** Requiere runtime y paquete disponibles en la cuenta.

#### Contar pedidos mediante Snowpark

```sql
CREATE OR REPLACE PROCEDURE DEMO_PY_COUNT() RETURNS NUMBER LANGUAGE PYTHON RUNTIME_VERSION='3.12' PACKAGES=('snowflake-snowpark-python') HANDLER='run' EXECUTE AS CALLER AS $$
def run(session):
    return session.table('ORDERS').count()
$$;
CALL DEMO_PY_COUNT();
```

**Resultado esperado** 8.

## Integración y herramientas de desarrollo

**Clave** `integracion-y-herramientas-de-desarrollo`

### Definición

**Clave** `definicion`

**Definición** Snowflake admite clientes SQL, controladores, APIs y herramientas de ingeniería que operan sobre la misma cuenta y permisos.

**Búsqueda** Integración y herramientas de desarrollo; Definición; comprobar una conexión desde otro cliente

**Para recordar** La herramienta cliente no cambia la semántica del SQL del servidor.

#### Comprobar una conexión desde otro cliente

```sql
SELECT CURRENT_ACCOUNT(),CURRENT_ROLE(),COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS;
```

**Resultado esperado** Cuenta y rol activos; conteo 8.

### Snowflake CLI y SnowSQL

**Clave** `snowflake-cli-y-snowsql`

**Definición** Snowflake CLI permite ejecutar SQL y administrar proyectos desde terminal; SnowSQL es otro cliente SQL de Snowflake.

**Búsqueda** Snowflake CLI y SnowSQL; ejecutar sql desde terminal

**Para recordar** Usa perfiles de conexión autorizados y evita pasar contraseñas en la línea de comandos.

**Nota** Instala Snowflake CLI y configura el perfil alldoc; usa su ayuda si la versión difiere.

#### Ejecutar SQL desde terminal

```bash
snow sql -c alldoc -q "SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS"
```

**Resultado esperado** Una fila con 8.

### JDBC, ODBC y SQLAlchemy

**Clave** `jdbc-odbc-y-sqlalchemy`

**Definición** JDBC/ODBC permiten acceso desde Java, BI u otros clientes; SQLAlchemy usa un dialecto Snowflake sobre el conector Python.

**Búsqueda** JDBC, ODBC y SQLAlchemy; conectar un cliente de bi

**Para recordar** Configura cuenta, rol, warehouse y autenticación en cada cliente.

**Nota** Requiere software y conexión externos.

#### Conectar un cliente de BI

1. Instala el controlador JDBC u ODBC compatible cuando sea necesario.
2. Crea una conexión con cuenta, warehouse, base, esquema y autenticación autorizada.
3. Prueba SELECT COUNT(*) FROM ORDERS.
4. Para SQLAlchemy instala snowflake-sqlalchemy y configura su URL de conexión de forma segura.

**Resultado esperado** Conteo 8 desde el cliente conectado al laboratorio.

### SQL API, REST APIs y Python APIs

**Clave** `sql-api-rest-apis-y-python-apis`

**Definición** SQL API recibe sentencias mediante HTTP; las REST/Python APIs de recursos permiten administrar objetos y servicios soportados.

**Búsqueda** SQL API, REST APIs y Python APIs; consultar mediante sql api

**Para recordar** Distingue ejecutar SQL de gestionar recursos; respeta tokens, estados asíncronos y paginación.

**Nota** Requiere endpoint real, token autorizado y cliente HTTP.

#### Consultar mediante SQL API

1. Configura autenticación soportada para SQL API.
2. Envía POST a /api/v2/statements con statement SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS y contexto autorizado.
3. Consulta el estado con el handle cuando no termine en la respuesta inicial.
4. Recupera particiones adicionales si existen.

**Resultado esperado** Respuesta JSON de una consulta exitosa con valor 8; los handles y estados dependen de la ejecución.

### dbt

**Clave** `dbt`

**Definición** dbt transforma datos mediante modelos SQL, dependencias y tests; Snowflake ejecuta las consultas compiladas.

**Búsqueda** dbt; crear modelo de ventas completadas

**Para recordar** dbt no reemplaza el warehouse ni crea por sí solo una fuente de datos externa.

**Nota** Requiere proyecto dbt, source YAML, adaptador y perfil; el Jinja no se pega directamente en Snowsight.

#### Crear modelo de ventas completadas

```sql
-- models/completed_orders.sql (dbt)
SELECT ORDER_ID,AMOUNT
FROM {{ source('practice','orders') }}
WHERE STATUS='completed'
```

**Resultado esperado** Al ejecutar dbt run con dbt-snowflake y la source practice.orders definida para ALLDOC_LAB.PRACTICE.ORDERS, el modelo devuelve 6 filas.

### Airflow

**Clave** `airflow`

**Definición** Airflow orquesta tareas y dependencias; puede ejecutar SQL de Snowflake mediante providers y conexiones configuradas.

**Búsqueda** Airflow; programar una comprobación de pedidos

**Para recordar** Airflow coordina; Snowflake procesa los datos. Evita reintentos de DML no idempotente.

**Nota** Requiere Airflow, provider Snowflake/common SQL y una conexión configurada; este fragmento es una tarea, no un DAG completo.

#### Programar una comprobación de pedidos

```python
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
check = SQLExecuteQueryOperator(
    task_id="check_orders", conn_id="snowflake_alldoc",
    sql="SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS"
)
```

**Resultado esperado** Dentro de un DAG válido, la task ejecuta el conteo 8 y su estado refleja éxito o fallo.

### Openflow

**Clave** `openflow`

**Definición** Openflow integra fuentes, conectores y flujos de datos administrados según despliegue y conectores disponibles.

**Búsqueda** Openflow; validar un flujo de ingesta

**Para recordar** La ingesta tiene su propio estado, permisos y manejo de errores, separado de la consulta final.

**Nota** Requiere infraestructura y conectores compatibles.

#### Validar un flujo de ingesta

1. Provisiona un runtime Openflow de prueba compatible.
2. Configura un conector autorizado a una fuente sintética y una tabla destino.
3. Inicia el flujo, verifica dos registros conocidos y revisa errores.
4. Detén el flujo y runtime cuando termines.

**Resultado esperado** Los registros de prueba llegan al destino; el estado y retraso se observan en la interfaz.

### Git, CI/CD y migraciones

**Clave** `git-ci-cd-y-migraciones`

**Definición** Git conserva versiones; CI/CD prueba y despliega cambios; una migración aplica cambios de esquema de forma controlada.

**Búsqueda** Git, CI/CD y migraciones; probar un modelo antes de desplegar

**Para recordar** Usa ambientes y roles separados; registra cambios y plan de recuperación antes de producción.

#### Probar un modelo antes de desplegar

1. Guarda el SQL del modelo y sus tests en Git.
2. En CI ejecuta tests en una base de desarrollo con datos sintéticos.
3. Revisa conteos, claves y cambios DDL.
4. Despliega con aprobación y credenciales del entorno de destino.

**Resultado esperado** Cambios versionados, pruebas verificables y despliegue trazable; sin modificación directa de producción en el laboratorio.

### Terraform e infraestructura como código

**Clave** `terraform-e-infraestructura-como-codigo`

**Definición** Terraform representa recursos de infraestructura declarativamente y compara estado deseado con estado real mediante un provider.

**Búsqueda** Terraform e infraestructura como código; administrar un warehouse de desarrollo

**Para recordar** Revisa terraform plan antes de apply; protege el estado, que puede contener datos sensibles.

**Nota** Requiere Terraform, provider compatible y backend seguro de estado.

#### Administrar un warehouse de desarrollo

1. Configura provider Snowflake y autenticación autorizada.
2. Declara un warehouse de laboratorio pequeño, autosuspendido.
3. Ejecuta terraform plan y revisa las operaciones previstas.
4. Aplica solo si el plan fue aprobado; verifica SHOW WAREHOUSES.

**Resultado esperado** Warehouse configurado como se declaró, sin cambios inesperados en otros recursos.

## BI y capa semántica

**Clave** `bi-y-capa-semantica`

### Definición

**Clave** `definicion`

**Definición** BI convierte datos en informes y dashboards; una capa semántica centraliza definiciones de entidades y métricas para mantener coherencia.

**Búsqueda** BI y capa semántica; Definición; publicar ventas mensuales

**Para recordar** Una métrica debe tener definición, granularidad, filtros y periodo claros.

#### Publicar ventas mensuales

```sql
CREATE OR REPLACE VIEW DEMO_MONTHLY AS SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS M,SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1;
SELECT * FROM DEMO_MONTHLY ORDER BY M;
```

**Resultado esperado** Febrero:600, marzo:700.

### Semantic Views

**Clave** `semantic-views`

**Definición** Una semantic view describe entidades lógicas, relaciones, dimensiones, hechos y métricas de negocio sobre tablas de Snowflake.

**Búsqueda** Semantic Views; definir una métrica de ventas consistente

**Para recordar** Una dimensión agrupa; un hecho mide; una métrica define la agregación. La capa no corrige claves duplicadas por sí sola.

**Nota** Usa el editor o sintaxis CREATE SEMANTIC VIEW vigente; requiere permisos y disponibilidad.

#### Definir una métrica de ventas consistente

1. En el editor de semantic views disponible, selecciona ORDERS y CUSTOMERS.
2. Define relación por CUSTOMER_ID y dimensión COUNTRY.
3. Define ventas completadas como suma de AMOUNT para status completed, y valida contra SQL de la ficha de hechos y dimensiones.
4. Guarda la definición y prueba el consumo autorizado.

**Resultado esperado** La métrica por país coincide con Mexico=600, Spain=300, USA=400 si se excluyen países sin ventas; revisa semántica de joins y filtros.

### Power BI, Tableau y Looker

**Clave** `power-bi-tableau-y-looker`

**Definición** Los conectores BI ejecutan consultas o importan datos según su modalidad; algunos permiten modelos semánticos propios.

**Búsqueda** Power BI, Tableau y Looker; crear gráfico de ventas mensuales

**Para recordar** La modalidad de conexión cambia frescura, costo y dónde se procesan los filtros.

**Nota** Requiere una de las aplicaciones externas, conexión y vista de Definición.

#### Crear gráfico de ventas mensuales

1. Conecta la herramienta BI a la cuenta mediante su conector Snowflake.
2. Selecciona DEMO_MONTHLY.
3. Usa M como eje y SALES como valor.
4. Comprueba totales y actualiza el informe.

**Resultado esperado** Dos puntos o barras: febrero 600 y marzo 700.

### Snowsight dashboards y Streamlit

**Clave** `snowsight-dashboards-y-streamlit`

**Definición** Snowsight ofrece visualizaciones de consultas según interfaz; Streamlit in Snowflake permite construir aplicaciones Python interactivas dentro de la plataforma.

**Búsqueda** Snowsight dashboards y Streamlit; mostrar ventas en streamlit in snowflake

**Para recordar** Los permisos y el runtime de la app condicionan la visibilidad y ejecución.

**Nota** Requiere DEMO_MONTHLY y un runtime Streamlit con get_active_session disponible; en otros runtimes usa la conexión recomendada por Snowflake.

#### Mostrar ventas en Streamlit in Snowflake

```python
import streamlit as st
from snowflake.snowpark.context import get_active_session
session = get_active_session()
df = session.sql("SELECT M, SALES FROM ALLDOC_LAB.PRACTICE.DEMO_MONTHLY ORDER BY M").to_pandas()
st.bar_chart(df.set_index("M"))
```

**Resultado esperado** Gráfico con 600 y 700 en los dos meses.

## Snowpark ML y Cortex AI

**Clave** `snowpark-ml-y-cortex-ai`

### Definición

**Clave** `definicion`

**Definición** Snowpark ML ofrece herramientas de machine learning; Cortex ofrece servicios y funciones de IA para texto, búsqueda y análisis.

**Búsqueda** Snowpark ML y Cortex AI; Definición; seleccionar enfoque por objetivo

**Para recordar** ML predictivo, generación de texto y recuperación de documentos resuelven tareas distintas.

#### Seleccionar enfoque por objetivo

1. Predecir demanda a partir de históricos: evalúa Snowpark ML.
2. Resumir comentarios de clientes: evalúa funciones Cortex AI.
3. Consultar métricas en lenguaje natural: evalúa Cortex Analyst.

**Resultado esperado** Una elección de servicio acorde al problema, sin ejecutar modelos ni generar costos.

### Snowpark ML, Feature Store y Model Registry

**Clave** `snowpark-ml-feature-store-y-model-registry`

**Definición** Snowpark ML permite desarrollar modelos; Feature Store organiza variables reutilizables y Model Registry registra versiones y metadatos de modelos.

**Búsqueda** Snowpark ML, Feature Store y Model Registry; planificar predicción de demanda

**Para recordar** Separa entrenamiento y evaluación, evita fuga de información y registra versiones de datos/modelo.

**Nota** Requiere paquete snowflake-ml-python, datos adecuados y recursos/permisos.

#### Planificar predicción de demanda

1. Prepara históricos de ventas suficientemente amplios, con corte temporal.
2. Crea features de ventas pasadas sin usar información futura.
3. Entrena y evalúa con un estimador compatible de snowflake-ml-python.
4. Registra modelo y métricas; comprueba inferencia sobre un lote de prueba.

**Resultado esperado** Versión del modelo y predicciones evaluables; el pequeño dataset compartido no alcanza para entrenar un modelo útil.

### Cortex AI Functions

**Clave** `cortex-ai-functions`

**Definición** Las funciones AI procesan contenido con modelos administrados, por ejemplo generación o clasificación de texto.

**Búsqueda** Cortex AI Functions; clasificar un comentario sintético

**Para recordar** Las salidas generativas no son deterministas y pueden ser incorrectas; mide calidad y consumo.

**Nota** Requiere función disponible, acceso a Cortex y consumo autorizado; no envíes datos sensibles sin aprobación.

#### Clasificar un comentario sintético

```sql
SELECT AI_CLASSIFY('El pedido llegó tarde', ARRAY_CONSTRUCT('Entrega','Pago','Producto')) AS LABEL;
```

**Resultado esperado** Objeto de clasificación que se espera asigne Entrega; la respuesta exacta depende del modelo.

### Cortex Analyst

**Clave** `cortex-analyst`

**Definición** Cortex Analyst traduce preguntas de negocio a SQL usando definiciones semánticas y metadatos.

**Búsqueda** Cortex Analyst; consultar ventas de febrero

**Para recordar** Valida SQL y métricas; no confíes en una respuesta solo por estar redactada con seguridad.

**Nota** Requiere Cortex Analyst y modelo/vista semántica configurados.

#### Consultar ventas de febrero

1. Configura una semantic view de ventas validada.
2. En la interfaz de pruebas de Analyst pregunta «¿Cuánto vendimos en febrero de 2026 en pedidos completados?».
3. Inspecciona y ejecuta el SQL generado si es autorizado.
4. Compara con la consulta mensual de Fechas.

**Resultado esperado** El resultado correcto es 600; cualquier resultado distinto requiere investigar la definición o SQL generado.

### Cortex Search

**Clave** `cortex-search`

**Definición** Cortex Search indexa contenido textual para recuperación relevante por consulta y admite filtros de atributos según configuración.

**Búsqueda** Cortex Search; buscar políticas de devolución

**Para recordar** Una búsqueda recupera documentos; no verifica por sí sola que sus afirmaciones sean correctas.

**Nota** Requiere servicio disponible y costos de indexación/consulta autorizados.

#### Buscar políticas de devolución

1. Prepara una tabla sintética con ID, texto y categoría, incluyendo una política que permite devolución durante 30 días.
2. Crea un servicio Cortex Search sobre el texto con warehouse y frescura autorizados.
3. Busca «plazo de devolución» y revisa documentos recuperados.

**Resultado esperado** La política de 30 días debería estar entre los resultados relevantes; el ranking puede variar.

## Aplicaciones y servicios especializados

**Clave** `aplicaciones-y-servicios-especializados`

### Definición

**Clave** `definicion`

**Definición** La plataforma ofrece mecanismos para distribuir aplicaciones, ejecutar contenedores y trabajar con distintos tipos de cargas además del SQL analítico.

**Búsqueda** Aplicaciones y servicios especializados; Definición; elegir arquitectura para una aplicación

**Para recordar** No habilites servicios especializados solo porque forman parte del catálogo; evalúa requisitos y costos.

#### Elegir arquitectura para una aplicación

1. Dashboard interno sencillo: Streamlit in Snowflake.
2. Aplicación distribuida a cuentas consumidoras: Native Apps.
3. Runtime con dependencias de sistema específicas: Snowpark Container Services.

**Resultado esperado** Tres alternativas con distintos requisitos de empaquetado, permisos y operación.

### Native Apps

**Clave** `native-apps`

**Definición** Native Apps permite empaquetar lógica y datos autorizados para instalar una aplicación en cuentas consumidoras.

**Búsqueda** Native Apps; probar distribución de una app

**Para recordar** El consumidor concede referencias o permisos necesarios; el paquete no debe asumir acceso a toda su cuenta.

**Nota** Requiere configuración de Native Apps y entorno de distribución.

#### Probar distribución de una app

1. Crea un application package en cuenta de desarrollo.
2. Define manifest, setup script y objetos de la aplicación.
3. Instala una versión de prueba en una cuenta o entorno autorizado.
4. Comprueba roles, permisos y actualización de versión.

**Resultado esperado** Aplicación instalada con objetos y roles definidos; ninguna tabla del consumidor queda expuesta automáticamente.

### Snowpark Container Services

**Clave** `snowpark-container-services`

**Definición** Permite ejecutar imágenes de contenedor y servicios en compute pools administrados por Snowflake.

**Búsqueda** Snowpark Container Services; probar un servicio de laboratorio

**Para recordar** Un compute pool no es un virtual warehouse; tiene su propio dimensionamiento y consumo.

**Nota** Requiere permisos, imagen, configuración y región compatible.

#### Probar un servicio de laboratorio

1. Crea un image repository y publica una imagen de prueba autorizada.
2. Configura compute pool y especificación del servicio con recursos mínimos.
3. Ejecuta el servicio, revisa estado y logs.
4. Suspende o elimina recursos al terminar.

**Resultado esperado** Servicio en estado operativo o diagnóstico explícito de fallo; costo dependiente de recursos y duración.

### Ediciones, regiones y disponibilidad

**Clave** `ediciones-regiones-y-disponibilidad`

**Definición** La edición de cuenta y la región condicionan funcionalidades, retención, seguridad, rendimiento y servicios especializados.

**Búsqueda** Ediciones, regiones y disponibilidad; evaluar una funcionalidad antes de adoptarla

**Para recordar** Comprueba requisitos vigentes y no supongas que una función disponible en otra cuenta también lo está en la tuya.

#### Evaluar una funcionalidad antes de adoptarla

1. Consulta CURRENT_REGION() y la edición de la cuenta en su configuración autorizada.
2. Compara los requisitos de la función en la documentación oficial.
3. Verifica privilegios y costo en el laboratorio antes de usarla en producción.

**Resultado esperado** Decisión explícita de disponibilidad y requisitos; sin asumir edición del usuario.

## Fuentes

Documentación oficial consultada y referencias para ampliar las fichas. Los ejemplos y el dataset son originales. Las guías de producto avanzado son necesarias para adaptar los procedimientos a la cuenta real.

- [Key concepts and architecture](https://docs.snowflake.com/en/user-guide/intro-key-concepts): capas, cuentas, almacenamiento y servicios.
- [Snowflake editions](https://docs.snowflake.com/en/user-guide/intro-editions): diferencias de edición y disponibilidad.
- [Virtual warehouses](https://docs.snowflake.com/en/user-guide/warehouses): tamaños, clústeres, suspensión y cómputo.
- [Micro-partitions and data clustering](https://docs.snowflake.com/en/user-guide/tables-micro-partitions): metadatos físicos y pruning.
- [SQL reference](https://docs.snowflake.com/en/sql-reference) y [SQL commands](https://docs.snowflake.com/en/sql-reference-commands): sintaxis, DDL, DML, sesión, metadatos y transacciones.
- [SELECT](https://docs.snowflake.com/en/sql-reference/sql/select): EXCLUDE, REPLACE, RENAME y proyección.
- [SQL functions](https://docs.snowflake.com/en/sql-reference/functions): funciones escalares, agregaciones, tipos y conversiones.
- [JOIN](https://docs.snowflake.com/en/sql-reference/constructs/join) y [ASOF JOIN](https://docs.snowflake.com/en/sql-reference/constructs/asof-join): coincidencias, cardinalidad y series temporales.
- [QUALIFY](https://docs.snowflake.com/en/sql-reference/constructs/qualify) y [Window function syntax](https://docs.snowflake.com/en/sql-reference/functions-window-syntax): orden lógico, particiones, marcos y ranking.
- [Set operators](https://docs.snowflake.com/en/sql-reference/operators-query): UNION, BY NAME, INTERSECT, EXCEPT.
- [Constraints](https://docs.snowflake.com/en/sql-reference/constraints) y [release 10.12 (abril 2026)](https://docs.snowflake.com/en/release-notes/2026/10_12): restricciones y aplicación de CHECK.
- [Temporary and transient tables](https://docs.snowflake.com/en/user-guide/tables-temp-transient): persistencia y retención.
- [Databases, tables and views](https://docs.snowflake.com/en/guides-overview-db): objetos, tablas externas, formatos abiertos, hybrid y vistas.
- [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel), [data availability](https://docs.snowflake.com/en/user-guide/data-availability) y [cloning](https://docs.snowflake.com/en/user-guide/object-clone): recuperación y copias.
- [Transactions](https://docs.snowflake.com/en/sql-reference/transactions): autocommit, DDL y aislamiento.
- [Snowflake Scripting](https://docs.snowflake.com/en/developer-guide/snowflake-scripting/index): variables, bloques, control, cursores y excepciones.
- [Data loading overview](https://docs.snowflake.com/en/user-guide/data-load-overview) y [loading data](https://docs.snowflake.com/en/user-guide/data-load-considerations-load): stages, COPY, historial, validación, formatos.
- [Data loading/unloading DDL](https://docs.snowflake.com/en/sql-reference/ddl-stage): stages, formatos e integraciones.
- [Semi-structured data](https://docs.snowflake.com/en/user-guide/semistructured-concepts) y [FLATTEN](https://docs.snowflake.com/en/sql-reference/functions/flatten): VARIANT, estructuras y expansión.
- [Snowpipe](https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro): pipes, COPY y Snowpipe Streaming.
- [Streams and Tasks](https://docs.snowflake.com/en/user-guide/data-pipelines-intro): CDC, tareas y pipelines.
- [Dynamic tables](https://docs.snowflake.com/en/user-guide/dynamic-tables/overview), [target lag](https://docs.snowflake.com/en/user-guide/dynamic-tables/best-practices) y [refresh modes](https://docs.snowflake.com/en/user-guide/dynamic-tables/refresh-modes): refresco y frescura.
- [Data quality](https://docs.snowflake.com/en/user-guide/data-quality-intro): Data Metric Functions y observación de calidad.
- [Optimizing query performance](https://docs.snowflake.com/en/user-guide/performance-query-options): clustering, search optimization y query acceleration.
- [Managing Snowflake](https://docs.snowflake.com/en/user-guide-manage): historial, diagnóstico, warehouses y administración.
- [Cost management](https://docs.snowflake.com/en/user-guide/cost-management-overview): créditos, presupuestos y control de consumo.
- [Securing Snowflake](https://docs.snowflake.com/en/guides-overview-secure), [access control best practices](https://docs.snowflake.com/en/user-guide/security-access-control-considerations) y [privileges](https://docs.snowflake.com/en/user-guide/security-access-control-privileges): RBAC, redes, autenticación y privilegios.
- [Join policies](https://docs.snowflake.com/en/user-guide/join-policies): interacción entre políticas de gobernanza.
- [User guide](https://docs.snowflake.com/en/user-guide): gobernanza, auditoría, colaboración, replicación y servicios de la plataforma.
- [Using the Python Connector](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-example) y [Python Connector API](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-api): conexión, bindings, cursores y pandas.
- [Snowpark developer guide](https://docs.snowflake.com/en/developer-guide/snowpark/python) y [Session API](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/latest/snowpark/api/snowflake.snowpark.Session): DataFrames, conexión y acciones.
- [Developer documentation](https://docs.snowflake.com/en/developer): CLI, APIs, aplicaciones, procedimientos y UDFs, Streamlit y Cortex.
- [Snowflake Python APIs](https://docs.snowflake.com/en/developer-guide/snowflake-python-api/snowflake-python-overview): administración de recursos desde Python.
- [Cortex Agents](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents): Analyst, Search y servicios de IA.
- [dbt Snowflake setup](https://docs.getdbt.com/docs/core/connect-data-platform/snowflake-setup): adaptador dbt y conexión.
- [Apache Airflow Snowflake provider](https://airflow.apache.org/docs/apache-airflow-providers-snowflake/stable/): conexión y operadores.
- [Terraform Snowflake provider](https://registry.terraform.io/providers/snowflakedb/snowflake/latest/docs): recursos de infraestructura como código.

### Cierre del laboratorio

Detén o elimina únicamente recursos creados para practicar. Comprueba primero que no son compartidos: tasks (incluidas raíces e hijos), dynamic tables, pipes, servicios de IA, runtimes y compute pools pueden generar consumo independiente del warehouse. Suspender ALLDOC_WH no detiene necesariamente esos servicios. Si toda la base y el warehouse son exclusivos y ya no necesitas los datos, un administrador autorizado puede eliminar `ALLDOC_LAB` y `ALLDOC_WH`; revisa además objetos a nivel de cuenta (roles, monitores, integraciones y demás) creados en pruebas. No elimines recursos de terceros.
