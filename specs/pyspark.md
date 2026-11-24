# PySpark

**Clave** `pyspark`

**Área** Análisis de datos e Ingeniería de datos (ubicación propuesta para AllDoc).

**Resumen** API de Python para Apache Spark: consulta, transformación, análisis y procesamiento distribuido de datos.

**Alcance** Temario integral acordado: SparkSession, arquitectura, DataFrame API, SQL, esquemas, entrada/salida, calidad, agregaciones, joins, ventanas, estadísticas, tipos complejos, UDFs, rendimiento, RDDs, ETL, testing, despliegue, streaming, pandas API on Spark, Spark Connect, pipelines declarativos y MLlib. Incluye fundamentos y funcionalidades avanzadas; no pretende catalogar cada símbolo de la API ni afirmar que todos sean exigidos en una entrevista junior.

**Entorno** Apache Spark / PySpark **4.1.0**, Python 3.10 o superior compatible con esa versión, Java 17 o superior compatible con Spark, sesión clásica local. Se fija esta versión para que las fichas no dependan de la documentación `latest`. Los ejemplos de Connect, catálogos externos, Kafka, SDP y plataformas requieren entornos separados. En Spark 3.x algunas APIs no existen (por ejemplo `try_cast` como método Column, `mergeInto`, `groupingSets` y Python Data Source API son de 4.0; SDP de 4.1). Consultar las fuentes antes de trasladarlos a otra versión. No se ha ejecutado PySpark en el entorno de elaboración: las salidas son **resultados esperados**, no capturas de ejecución. Se propone ejecutar cada ficha en un intérprete o notebook con Spark, no en el editor SQLite de AllDoc.

## Datos compartidos

El catálogo contiene **42 grupos y 222 fichas**.

Instala PySpark en un entorno virtual. Las fichas que usan pandas, Arrow, Connect o MLlib pueden necesitar extras opcionales; no instales una versión de Java/Python incompatible. Para ejecutar SDP sigue su guía específica.

```bash
python -m pip install "pyspark==4.1.0"
# Si necesitas las interfaces opcionales de pandas, SQL/Arrow y ML:
python -m pip install "pyspark[sql,pandas_on_spark,ml]==4.1.0"
```

Ejecuta la preparación una vez en un proceso nuevo. `base` es un directorio temporal local exclusivo. No apunta a datos reales. Cada ejemplo empieza con estos DataFrames, salvo que indique otra preparación. Las relaciones son lógicas: Spark no impone claves primarias o foráneas a estos DataFrames. Las fechas son ficticias. `amount` se expresa en unidades monetarias enteras para facilitar la práctica; en producción usa un tipo decimal adecuado. Los resultados enumeran filas sin garantizar orden si el ejemplo no usa `orderBy`. `F` contiene funciones de Spark, `T` tipos, y `Window` especificaciones de ventana.

```python
from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
import tempfile
from pyspark.sql import SparkSession, Row, Window
from pyspark.sql import functions as F, types as T

base = Path(tempfile.mkdtemp(prefix="alldoc-pyspark-"))
spark = (
    SparkSession.builder.master("local[2]").appName("AllDoc")
    .config("spark.sql.session.timeZone", "UTC")
    .config("spark.sql.shuffle.partitions", "4")
    .config("spark.sql.ansi.enabled", "true")
    .config("spark.sql.caseSensitive", "false")
    .config("spark.sql.adaptive.enabled", "true")
    .config("spark.sql.cbo.enabled", "false")
    .config("spark.sql.warehouse.dir", str(base / "warehouse"))
    .getOrCreate()
)

customers = spark.createDataFrame([
    (1, "Ana", "MX", date(2026, 7, 1)),
    (2, "Luis", "MX", date(2026, 7, 5)),
    (3, "Marta", "ES", date(2026, 8, 1)),
    (4, "Diego", None, date(2026, 8, 10)),
    (5, "Sofia", "ES", date(2026, 8, 12)),
], "customer_id INT, name STRING, country STRING, signup_date DATE")

orders = spark.createDataFrame([
    (101, 1, 500, date(2026, 8, 1), "completed", None),
    (102, 1, 200, date(2026, 8, 2), "completed", "SAVE"),
    (103, 2, 700, date(2026, 8, 2), "completed", None),
    (104, 3, 100, date(2026, 9, 1), "completed", None),
    (105, 2, 300, date(2026, 9, 2), "cancelled", "SAVE"),
    (106, 3, 800, date(2026, 9, 3), "completed", "VIP"),
], "order_id INT, customer_id INT, amount INT, order_date DATE, status STRING, coupon STRING")

products = spark.createDataFrame([
    (1, "Monitor", "Electronics"),
    (2, "Desk", "Furniture"),
    (3, "Mouse", "Electronics"),
], "product_id INT, product_name STRING, category STRING")

items = spark.createDataFrame([
    (1,101,1,1,300), (2,101,3,2,100), (3,102,2,1,200),
    (4,103,1,2,350), (5,104,3,1,100), (6,105,2,1,300),
    (7,106,2,2,400),
], "item_id INT, order_id INT, product_id INT, quantity INT, unit_price INT")

leads = spark.createDataFrame([
    (1,"ana@demo.test","ads"), (2,"luis@demo.test","web"),
    (3,"ana@demo.test","web"), (4,"marta@demo.test","ads"),
], "lead_id INT, email STRING, source STRING")

nested = spark.createDataFrame([
    (1,["vip","new","vip"],{"MX":2},(1,"Ana")),
    (2,[],{"ES":1},(2,"Luis")),
], "id INT, tags ARRAY<STRING>, stock MAP<STRING,INT>, person STRUCT<id:INT,name:STRING>")

ml_data = spark.createDataFrame([
    (float(x),float(2*x),float(x>=4)) for x in range(1,7)
], "x DOUBLE, target DOUBLE, label DOUBLE")

# Archivos pequeños para ejemplos de lectura y streaming.
(base / "sample.csv").write_text("id,amount\n1,100\n2,200\n", encoding="utf-8")
(base / "sample.json").write_text('{"id":1,"amount":100}\n{"id":2,"amount":200}\n', encoding="utf-8")
(base / "events").mkdir()
(base / "events" / "batch1.json").write_text((base / "sample.json").read_text(), encoding="utf-8")
orders.write.mode("overwrite").parquet(str(base / "orders.parquet"))

for name, df in [("customers",customers),("orders",orders),("products",products),("items",items),("leads",leads)]:
    df.createOrReplaceTempView(name)
```

Relaciones: `customers.customer_id` → `orders.customer_id`; `orders.order_id` → `items.order_id`; `products.product_id` → `items.product_id`. Un cliente puede tener varios pedidos, y un pedido varias líneas. Los clientes 4 y 5 no tienen pedidos; el cliente 4 no tiene país. El pedido 105 está cancelado; 102 y 103 comparten fecha. La suma total es 2600; la suma de completados es 2300. En los detalles, `quantity * unit_price` concuerda con el importe de cada pedido. Los correos repetidos se encuentran en `leads` y los datos anidados en `nested`.

Los ejemplos de escritura crean nombres y subdirectorios de prueba propios. Para reiniciar ejemplos stateful, usa otra sesión y otro directorio temporal, salvo que el objetivo sea recuperar un checkpoint. No uses `overwrite` sobre datos ajenos. Para terminar, ejecuta `spark.stop()` una sola vez.


## SparkSession

**Clave** `spark-session`

### Definición

**Clave** `definicion`

**Definición** `SparkSession` es la entrada para crear DataFrames, leer datos y ejecutar Spark SQL.

**Búsqueda** SparkSession, crear una sesión local, spark session

**Para recordar** Una sesión concentra la configuración y el acceso a los datos.

#### Crear una sesión local

```python
spark = SparkSession.builder.master("local[2]").appName("AllDoc").getOrCreate()
```

**Resultado esperado** Una sesión local con dos hilos de ejecución disponibles.

### SparkContext

**Clave** `sparkcontext`

**Definición** `SparkContext` comunica el driver con Spark Core y permite trabajar con RDDs en Spark clásico.

**Búsqueda** SparkContext, obtener el contexto, spark session

**Para recordar** Se obtiene de la sesión; no crees otro contexto activo.

**Nota** Spark Connect no expone SparkContext.

#### Obtener el contexto

```python
sc = spark.sparkContext
print(sc.master)
```

**Resultado esperado** `local[2]`.

### Configuración y ciclo de vida

**Clave** `configuracion-y-ciclo-de-vida`

**Definición** `builder.config()` establece opciones iniciales; `spark.conf` consulta o cambia opciones SQL modificables. `stop()` finaliza la sesión.

**Búsqueda** Configuración y ciclo de vida, ajustar particiones de shuffle, spark session

**Para recordar** Detén Spark al terminar, no después de cada ejemplo.

#### Ajustar particiones de shuffle

```python
spark.conf.set("spark.sql.shuffle.partitions", "4")
print(spark.conf.get("spark.sql.shuffle.partitions"))
```

**Resultado esperado** `4`.

### Cerrar la sesión

**Clave** `cerrar-la-sesion`

**Definición** `stop()` libera la sesión y, en Spark clásico, detiene el contexto subyacente.

**Búsqueda** Cerrar la sesión, finalizar una aplicación, spark session

**Para recordar** No ejecutes stop antes de terminar las demás fichas.

**Nota** Ejecutar únicamente al terminar el trabajo.

#### Finalizar una aplicación

```python
spark.stop()
```

**Resultado esperado** La sesión deja de poder ejecutar consultas; vuelve a ejecutar la preparación para continuar.

## Arquitectura y ejecución

**Clave** `arquitectura-y-ejecucion`

### Definición

**Clave** `definicion`

**Definición** El driver coordina el trabajo y los executors ejecutan tareas sobre particiones. En un cluster, el gestor asigna recursos a la aplicación.

**Búsqueda** Arquitectura y ejecución, identificar el modo local, arquitectura y ejecucion

**Para recordar** Driver coordina; executor procesa.

#### Identificar el modo local

```python
print(spark.sparkContext.master)
```

**Resultado esperado** `local[2]`: simulación local, no un cluster de dos máquinas.

### Jobs, stages y tasks

**Clave** `jobs-stages-y-tasks`

**Definición** Una acción puede generar uno o varios jobs; los jobs se dividen en stages y cada stage ejecuta tasks sobre particiones.

**Búsqueda** Jobs, stages y tasks, consultar una ejecución, arquitectura y ejecucion

**Para recordar** Una task procesa normalmente una partición en un stage.

**Nota** La cantidad exacta de jobs depende del plan y AQE.

#### Consultar una ejecución

```python
orders.groupBy("status").count().show()
print(spark.sparkContext.uiWebUrl)
```

**Resultado esperado** Dos grupos: completed=5, cancelled=1. La URL de Spark UI permite inspeccionar jobs y stages.

### Lazy evaluation

**Clave** `lazy-evaluation`

**Definición** Una transformación describe trabajo; una acción solicita un resultado y desencadena su ejecución cuando es necesario.

**Búsqueda** Lazy evaluation, separar transformación y acción, arquitectura y ejecucion

**Para recordar** `filter` prepara; `show` ejecuta.

#### Separar transformación y acción

```python
q = orders.filter(F.col("amount") > 300)
q.show()
```

**Resultado esperado** Tres pedidos: 101, 103 y 106; el primero en sentido de ID no está garantizado sin ordenar.

### DAG y lineage

**Clave** `dag-y-lineage`

**Definición** Spark representa las dependencias del procesamiento mediante un grafo dirigido sin ciclos (DAG); el lineage registra cómo reconstruir datos perdidos.

**Búsqueda** DAG y lineage, examinar dependencias, arquitectura y ejecucion

**Para recordar** El plan no es una lista de bucles Python.

#### Examinar dependencias

```python
orders.groupBy("customer_id").count().explain()
```

**Resultado esperado** El plan incluye una agregación y normalmente un intercambio de particiones.

### Batch y streaming

**Clave** `batch-y-streaming`

**Definición** Batch procesa datos acotados; streaming procesa entradas que siguen llegando usando consultas incrementales.

**Búsqueda** Batch y streaming, distinguir dataframes, arquitectura y ejecucion

**Para recordar** Un DataFrame de streaming no se trata como una tabla finita.

#### Distinguir DataFrames

```python
print(orders.isStreaming)
print(spark.readStream.format("rate").load().isStreaming)
```

**Resultado esperado** `False`, `True`.

## DataFrame y esquema

**Clave** `dataframe-y-esquema`

### Definición

**Clave** `definicion`

**Definición** Un DataFrame es una colección distribuida de filas con columnas nombradas y tipos definidos.

**Búsqueda** DataFrame y esquema, crear una tabla mínima, dataframe y esquema

**Para recordar** Una fila representa un registro; una columna representa un campo.

#### Crear una tabla mínima

```python
spark.createDataFrame([(1, "Ana"), (2, "Luis")], "id INT, name STRING").show()
```

**Resultado esperado** Columnas id, name; filas (1, Ana), (2, Luis).

### createDataFrame y Row

**Clave** `createdataframe-y-row`

**Definición** `createDataFrame()` convierte registros de Python en un DataFrame; `Row` permite nombrar campos.

**Búsqueda** createDataFrame y Row, crear registros con nombre, dataframe y esquema

**Para recordar** El esquema puede inferirse o declararse.

#### Crear registros con nombre

```python
spark.createDataFrame([Row(id=1, name="Ana")]).show()
```

**Resultado esperado** Una fila: id=1, name=Ana.

### StructType y StructField

**Clave** `structtype-y-structfield`

**Definición** `StructType` describe el conjunto de campos; `StructField` define nombre, tipo y si admite NULL.

**Búsqueda** StructType y StructField, declarar un esquema, dataframe y esquema

**Para recordar** Un esquema explícito evita inferencias incorrectas.

#### Declarar un esquema

```python
schema = T.StructType([T.StructField("id", T.IntegerType(), False), T.StructField("name", T.StringType(), True)])
spark.createDataFrame([(1, "Ana")], schema).printSchema()
```

**Resultado esperado** id integer no nullable; name string nullable.

### Tipos de datos

**Clave** `tipos-de-datos`

**Definición** Los tipos controlan qué operaciones son válidas y cómo se representan los valores: enteros, decimales, texto, booleanos, fechas y timestamps.

**Búsqueda** Tipos de datos, crear un importe exacto, dataframe y esquema

**Para recordar** Usa DecimalType para importes exactos; DoubleType para mediciones aproximadas.

**Nota** Para fechas y timestamps, usa date/datetime de Python o convierte columnas con funciones Spark.

#### Crear un importe exacto

```python
spark.createDataFrame([(Decimal("12.30"), True)], "amount DECIMAL(10,2), paid BOOLEAN").show()
```

**Resultado esperado** amount=12.30, paid=true.

### Tipos anidados

**Clave** `tipos-anidados`

**Definición** ArrayType guarda listas, MapType pares clave-valor y StructType registros con campos internos.

**Búsqueda** Tipos anidados, crear datos anidados, dataframe y esquema

**Para recordar** No confundas una columna array con varias filas.

#### Crear datos anidados

```python
spark.createDataFrame([(["a", "b"], {"mx": 2}, (1, "Ana"))], "tags ARRAY<STRING>, stock MAP<STRING,INT>, person STRUCT<id:INT,name:STRING>").printSchema()
```

**Resultado esperado** Tres columnas con tipos array, map y struct, respectivamente.

### range y Column

**Clave** `range-y-column`

**Definición** `range()` crea una secuencia distribuida; `Column` representa una expresión que Spark evaluará sobre filas.

**Búsqueda** range y Column, construir una expresión, dataframe y esquema

**Para recordar** `F.col` referencia un campo; no devuelve sus valores como una lista.

#### Construir una expresión

```python
spark.range(3).select((F.col("id") * 2).alias("double")).show()
```

**Resultado esperado** double=0,2,4.

### Tipos nulos, intervalos y tipos definidos por usuario

**Clave** `tipos-nulos-intervalos-y-tipos-definidos-por-usuario`

**Definición** NullType representa valores sin tipo concreto; los intervalos describen duración; UserDefinedType permite representar objetos de dominio con un tipo SQL subyacente.

**Búsqueda** Tipos nulos, intervalos y tipos definidos por usuario, tipar una columna inicialmente nula, dataframe y esquema

**Para recordar** Para almacenamiento persistente, convierte NullType a un tipo concreto.

#### Tipar una columna inicialmente nula

```python
spark.range(1).select(F.lit(None).cast("string").alias("comment")).printSchema()
```

**Resultado esperado** comment string nullable.

## Inspección y acciones

**Clave** `inspeccion-y-acciones`

### Definición

**Clave** `definicion`

**Definición** Inspeccionar permite conocer el esquema, ejemplos de filas y tamaño de los datos sin traer necesariamente el dataset completo al driver.

**Búsqueda** Inspección y acciones, inspeccionar pedidos, inspeccion y acciones

**Para recordar** Primero esquema y muestra; después análisis.

#### Inspeccionar pedidos

```python
orders.printSchema()
orders.orderBy("order_id").show(2)
```

**Resultado esperado** order_id y customer_id enteros, amount entero, order_date date, status string, coupon string; se muestran 101 y 102.

### columns, dtypes y schema

**Clave** `columns-dtypes-y-schema`

**Definición** Estas propiedades describen las columnas y sus tipos sin convertir las filas a Python.

**Búsqueda** columns, dtypes y schema, consultar columnas, inspeccion y acciones

**Para recordar** `schema` incluye información de nulabilidad y campos anidados.

#### Consultar columnas

```python
print(orders.columns)
```

**Resultado esperado** ['order_id', 'customer_id', 'amount', 'order_date', 'status', 'coupon'].

### count, first, head y take

**Clave** `count-first-head-y-take`

**Definición** `count()` cuenta filas; `first()`, `head()` y `take(n)` recuperan pocas filas como objetos Row.

**Búsqueda** count, first, head y take, recuperar dos ids, inspeccion y acciones

**Para recordar** Sin orden explícito, la primera fila no tiene significado de negocio.

#### Recuperar dos IDs

```python
print(orders.select("order_id").orderBy("order_id").take(2))
print(orders.count())
```

**Resultado esperado** [Row(order_id=101), Row(order_id=102)] y 6.

### collect y toLocalIterator

**Clave** `collect-y-tolocaliterator`

**Definición** `collect()` trae todas las filas al driver; `toLocalIterator()` permite consumirlas por particiones.

**Búsqueda** collect y toLocalIterator, recuperar una muestra controlada, inspeccion y acciones

**Para recordar** Evita ambos para materializar grandes datos en memoria local.

#### Recuperar una muestra controlada

```python
print(orders.select("order_id").orderBy("order_id").limit(2).collect())
```

**Resultado esperado** Dos Rows con IDs 101 y 102.

### describe y summary

**Clave** `describe-y-summary`

**Definición** `describe()` resume count, mean, stddev, min y max; `summary()` admite estadísticas y percentiles adicionales.

**Búsqueda** describe y summary, resumir importes, inspeccion y acciones

**Para recordar** Son resúmenes exploratorios, no sustituyen validaciones.

#### Resumir importes

```python
orders.select("amount").summary("count", "min", "max").show()
```

**Resultado esperado** count=6, min=100, max=800 (como texto en summary).

### isEmpty y sameSemantics

**Clave** `isempty-y-samesemantics`

**Definición** `isEmpty()` comprueba si hay filas; `sameSemantics()` compara planes lógicos de DataFrames, no garantiza equivalencia de todos los resultados posibles.

**Búsqueda** isEmpty y sameSemantics, comprobar un filtro vacío, inspeccion y acciones

**Para recordar** Para comparar datos, usa pruebas o diferencias entre filas.

#### Comprobar un filtro vacío

```python
print(orders.filter(F.col("amount") < 0).isEmpty())
print(orders.sameSemantics(orders))
```

**Resultado esperado** True, True.

## Lectura de datos

**Clave** `lectura-de-datos`

### Definición

**Clave** `definicion`

**Definición** `spark.read` crea un lector batch; el formato y las opciones determinan cómo interpretar archivos o fuentes externas.

**Búsqueda** Lectura de datos, leer csv con esquema, lectura de datos

**Para recordar** La ruta debe ser accesible a los executors.

#### Leer CSV con esquema

```python
spark.read.option("header", True).schema("id INT, amount INT").csv(str(base / "sample.csv")).show()
```

**Resultado esperado** Filas (1,100) y (2,200).

### CSV y opciones

**Clave** `csv-y-opciones`

**Definición** `header`, `sep`, `inferSchema` y `mode` controlan encabezados, delimitadores, inferencia y registros mal formados.

**Búsqueda** CSV y opciones, inferir tipos de una muestra, lectura de datos

**Para recordar** Inferir tipos puede requerir lectura adicional y producir tipos no deseados.

#### Inferir tipos de una muestra

```python
spark.read.options(header=True, inferSchema=True).csv(str(base / "sample.csv")).printSchema()
```

**Resultado esperado** id y amount de tipo integer.

### JSON y texto

**Clave** `json-y-texto`

**Definición** `json()` interpreta JSON por línea por defecto; `text()` devuelve una columna value por línea.

**Búsqueda** JSON y texto, leer eventos json, lectura de datos

**Para recordar** Para JSON multilínea, activa multiLine cuando corresponda.

#### Leer eventos JSON

```python
spark.read.json(str(base / "sample.json")).select("id", "amount").show()
```

**Resultado esperado** (1,100), (2,200).

### Parquet y ORC

**Clave** `parquet-y-orc`

**Definición** Parquet y ORC son formatos columnares que conservan el esquema y permiten leer columnas selectivamente.

**Búsqueda** Parquet y ORC, leer parquet, lectura de datos

**Para recordar** Son opciones habituales para datos analíticos; CSV no guarda tipos.

#### Leer Parquet

```python
spark.read.parquet(str(base / "orders.parquet")).select("order_id").orderBy("order_id").show(2)
```

**Resultado esperado** 101, 102.

### format, option y load

**Clave** `format-option-y-load`

**Definición** `format()` elige la fuente; `option()` añade parámetros y `load()` inicia la construcción de la lectura.

**Búsqueda** format, option y load, leer texto sin conversión, lectura de datos

**Para recordar** `read.format("csv").load(...)` equivale al método csv con opciones equivalentes.

#### Leer texto sin conversión

```python
spark.read.format("text").load(str(base / "sample.csv")).show(truncate=False)
```

**Resultado esperado** Tres líneas: id,amount; 1,100; 2,200.

### JDBC

**Clave** `jdbc`

**Definición** JDBC lee tablas de bases relacionales mediante un driver Java; se pueden configurar particiones y predicados.

**Búsqueda** JDBC, leer una tabla postgresql, lectura de datos

**Para recordar** No incrustes credenciales ni aumentes conexiones sin considerar la base.

**Nota** Ejemplo externo: define jdbc_url, jdbc_user y jdbc_password desde variables de entorno y añade el JAR JDBC compatible al iniciar Spark.

#### Leer una tabla PostgreSQL

```python
df = spark.read.format("jdbc").options(url=jdbc_url, dbtable="public.orders", user=jdbc_user, password=jdbc_password, driver="org.postgresql.Driver").load()
df.printSchema()
```

**Resultado esperado** El esquema de la tabla remota, si la conexión y permisos son válidos.

## Seleccionar y modificar columnas

**Clave** `seleccionar-y-modificar-columnas`

### Definición

**Clave** `definicion`

**Definición** `select()` elige columnas o expresiones; `withColumn()` añade o reemplaza una columna sin modificar el DataFrame original.

**Búsqueda** Seleccionar y modificar columnas, mostrar campos, seleccionar y modificar columnas

**Para recordar** Las transformaciones devuelven otro DataFrame.

#### Mostrar campos

```python
orders.select("order_id", "amount").orderBy("order_id").show(2)
```

**Resultado esperado** (101,500), (102,200).

### col, lit y alias

**Clave** `col-lit-y-alias`

**Definición** `col()` referencia una columna; `lit()` construye una constante; `alias()` nombra el resultado.

**Búsqueda** col, lit y alias, añadir una moneda, seleccionar y modificar columnas

**Para recordar** Una cadena pasada a col es nombre de columna, no texto literal.

#### Añadir una moneda

```python
orders.select(F.col("amount").alias("total"), F.lit("MXN").alias("currency")).orderBy("total").show(1)
```

**Resultado esperado** total=100, currency=MXN.

### selectExpr y expr

**Clave** `selectexpr-y-expr`

**Definición** Estas interfaces interpretan expresiones de Spark SQL dentro del DataFrame API.

**Búsqueda** selectExpr y expr, calcular un importe, seleccionar y modificar columnas

**Para recordar** Útiles si ya sabes SQL; no interpolar texto no confiable.

#### Calcular un importe

```python
orders.selectExpr("order_id", "amount * 2 AS double").orderBy("order_id").show(1)
```

**Resultado esperado** 101,1000.

### withColumn y withColumns

**Clave** `withcolumn-y-withcolumns`

**Definición** Añaden o sustituyen columnas mediante expresiones; `withColumns` permite definir varias a la vez.

**Búsqueda** withColumn y withColumns, crear dos indicadores, seleccionar y modificar columnas

**Para recordar** Cada expresión de withColumns referencia el DataFrame de entrada.

#### Crear dos indicadores

```python
orders.withColumns({"double": F.col("amount")*2, "paid": F.col("status")=="completed"}).select("order_id", "double", "paid").orderBy("order_id").show(1)
```

**Resultado esperado** 101,1000,true.

### Renombrar y eliminar

**Clave** `renombrar-y-eliminar`

**Definición** `withColumnRenamed`, `withColumnsRenamed` y `drop` cambian las columnas del nuevo DataFrame.

**Búsqueda** Renombrar y eliminar, renombrar importe y quitar cupón, seleccionar y modificar columnas

**Para recordar** No alteran el DataFrame original.

#### Renombrar importe y quitar cupón

```python
print(orders.withColumnRenamed("amount", "total").drop("coupon").columns)
```

**Resultado esperado** order_id, customer_id, total, order_date, status.

### transform

**Clave** `transform`

**Definición** `transform()` encadena una función que recibe y devuelve un DataFrame.

**Búsqueda** transform, reutilizar un filtro, seleccionar y modificar columnas

**Para recordar** Separa una transformación reutilizable de la consulta principal.

#### Reutilizar un filtro

```python
def completed(df):
    return df.filter(F.col("status") == "completed")
print(orders.transform(completed).count())
```

**Resultado esperado** 5.

## Filtros

**Clave** `filtros`

### Definición

**Clave** `definicion`

**Definición** `filter()` y `where()` conservan filas cuya condición sea verdadera.

**Búsqueda** Filtros, filtrar por importe, filtros

**Para recordar** NULL o false no superan el filtro.

#### Filtrar por importe

```python
orders.filter(F.col("amount") > 300).select("order_id").orderBy("order_id").show()
```

**Resultado esperado** 101,103,106.

### Operadores y condiciones compuestas

**Clave** `operadores-y-condiciones-compuestas`

**Definición** Usa ==, !=, >, >= y los demás comparadores; combina Columns con &, | y ~, colocando paréntesis.

**Búsqueda** Operadores y condiciones compuestas, filtrar pedidos completados costosos, filtros

**Para recordar** `and`, `or` y `not` de Python no combinan Columns.

#### Filtrar pedidos completados costosos

```python
orders.where((F.col("status") == "completed") & (F.col("amount") >= 500)).select("order_id").orderBy("order_id").show()
```

**Resultado esperado** 101,103,106.

### isin y between

**Clave** `isin-y-between`

**Definición** `isin()` compara con una lista; `between()` incluye ambos límites.

**Búsqueda** isin y between, seleccionar clientes e importes, filtros

**Para recordar** Para negar una condición, usa ~ sobre la expresión.

#### Seleccionar clientes e importes

```python
orders.where(F.col("customer_id").isin(1,2) & F.col("amount").between(200,500)).select("order_id").orderBy("order_id").show()
```

**Resultado esperado** 101,102,105.

### like, rlike y texto

**Clave** `like-rlike-y-texto`

**Definición** `like()` usa % y _; `rlike()` usa expresiones regulares; `contains`, `startswith` y `endswith` buscan texto literal.

**Búsqueda** like, rlike y texto, buscar nombres que empiezan por a, filtros

**Para recordar** Un patrón regex no usa los mismos comodines que LIKE.

#### Buscar nombres que empiezan por A

```python
customers.where(F.col("name").like("A%")).select("name").show()
```

**Resultado esperado** Ana.

### NOT, OR y precedencia

**Clave** `not-or-y-precedencia`

**Definición** `~` niega una expresión, `|` combina alternativas y `&` exige ambas; los paréntesis hacen explícita la precedencia.

**Búsqueda** NOT, OR y precedencia, seleccionar cancelados o pedidos menores a 200, filtros

**Para recordar** Los nulos siguen la lógica de tres valores; negar una comparación no recupera automáticamente los nulos.

#### Seleccionar cancelados o pedidos menores a 200

```python
orders.where((F.col("status")=="cancelled") | (F.col("amount")<200)).select("order_id").orderBy("order_id").show()
```

**Resultado esperado** 104 y 105.

## Ordenamiento y límites

**Clave** `ordenamiento-y-limites`

### Definición

**Clave** `definicion`

**Definición** `orderBy()` y `sort()` ordenan por una o varias expresiones; `limit()` limita la cantidad de filas.

**Búsqueda** Ordenamiento y límites, obtener dos pedidos mayores, ordenamiento y limites

**Para recordar** Para un top N reproducible, ordena antes de limitar.

#### Obtener dos pedidos mayores

```python
orders.orderBy(F.desc("amount"), "order_id").select("order_id", "amount").limit(2).show()
```

**Resultado esperado** (106,800), (103,700).

### ASC, DESC y desempate

**Clave** `asc-desc-y-desempate`

**Definición** Cada columna puede tener su propia dirección; una clave secundaria resuelve empates.

**Búsqueda** ASC, DESC y desempate, ordenar fecha e id, ordenamiento y limites

**Para recordar** Sin desempate único, el orden de los empates puede variar.

#### Ordenar fecha e ID

```python
orders.orderBy(F.col("order_date").asc(), F.col("order_id").desc()).select("order_id").show()
```

**Resultado esperado** 101, 103, 102, 104, 105, 106.

### Nulos y offset

**Clave** `nulos-y-offset`

**Definición** `asc_nulls_last()` y `desc_nulls_first()` controlan nulos; `offset()` descarta las primeras n filas.

**Búsqueda** Nulos y offset, mostrar la segunda página, ordenamiento y limites

**Para recordar** Offset tiene sentido con orden explícito; disponible desde Spark 3.4.

#### Mostrar la segunda página

```python
orders.orderBy("order_id").offset(2).limit(2).select("order_id").show()
```

**Resultado esperado** 103,104.

## Valores nulos y condicionales

**Clave** `nulos-y-condicionales`

### Definición

**Clave** `definicion`

**Definición** NULL representa un valor ausente; usa `isNull()` e `isNotNull()` para detectarlo y funciones condicionales para tratarlo.

**Búsqueda** Valores nulos y condicionales, buscar clientes sin país, nulos y condicionales

**Para recordar** Comparar con == None no sustituye isNull.

#### Buscar clientes sin país

```python
customers.where(F.col("country").isNull()).select("customer_id").show()
```

**Resultado esperado** 4.

### fillna, dropna y replace

**Clave** `fillna-dropna-y-replace`

**Definición** `fillna` rellena nulos; `dropna` elimina filas según nulos; `replace` sustituye valores concretos.

**Búsqueda** fillna, dropna y replace, completar países faltantes, nulos y condicionales

**Para recordar** Especifica columnas para no modificar campos ajenos.

#### Completar países faltantes

```python
customers.fillna({"country":"Unknown"}).select("customer_id", "country").orderBy("customer_id").show()
```

**Resultado esperado** (1,MX), (2,MX), (3,ES), (4,Unknown), (5,ES).

### coalesce y nullif

**Clave** `coalesce-y-nullif`

**Definición** `F.coalesce()` devuelve el primer valor no nulo; `F.nullif()` devuelve NULL cuando dos expresiones son iguales.

**Búsqueda** coalesce y nullif, normalizar cupones ausentes, nulos y condicionales

**Para recordar** No confundas F.coalesce con DataFrame.coalesce de particiones.

#### Normalizar cupones ausentes

```python
orders.select("order_id", F.coalesce("coupon", F.lit("none")).alias("coupon_label")).orderBy("order_id").show(2)
```

**Resultado esperado** (101,none), (102,SAVE).

### NaN y eqNullSafe

**Clave** `nan-y-eqnullsafe`

**Definición** NaN es un valor de punto flotante distinto de NULL; `isnan()` lo detecta. `eqNullSafe()` compara incluso dos nulos.

**Búsqueda** NaN y eqNullSafe, comprobar ambos casos, nulos y condicionales

**Para recordar** En Spark, NaN tiene reglas especiales de comparación.

#### Comprobar ambos casos

```python
d = spark.createDataFrame([(float("nan"),), (None,)], "x DOUBLE")
d.select(F.isnan("x").alias("nan"), F.col("x").isNull().alias("null")).show()
```

**Resultado esperado** (true,false), (false,true), sin orden garantizado.

### when y otherwise

**Clave** `when-y-otherwise`

**Definición** `when()` encadena condiciones como CASE WHEN; `otherwise()` define el valor si ninguna se cumple.

**Búsqueda** when y otherwise, clasificar pedidos, nulos y condicionales

**Para recordar** Las condiciones se evalúan en el orden escrito; sin otherwise el resto queda NULL.

#### Clasificar pedidos

```python
orders.select("order_id", F.when(F.col("amount") >= 500,"high").otherwise("low").alias("segment")).orderBy("order_id").show()
```

**Resultado esperado** 101 high, 102 low, 103 high, 104 low, 105 low, 106 high.

### IS NOT NULL y NULLIF

**Clave** `is-not-null-y-nullif`

**Definición** `isNotNull` selecciona valores presentes; `nullif` convierte en NULL cuando se cumple la igualdad.

**Búsqueda** IS NOT NULL y NULLIF, detectar cupones informados, nulos y condicionales

**Para recordar** Los valores vacíos de texto no son NULL hasta que se normalizan.

#### Detectar cupones informados

```python
orders.where(F.col("coupon").isNotNull()).select("order_id","coupon").orderBy("order_id").show()
```

**Resultado esperado** (102,SAVE),(105,SAVE),(106,VIP).

## Tipos y conversiones

**Clave** `tipos-y-conversiones`

### Definición

**Clave** `definicion`

**Definición** `cast()` convierte una Column al tipo solicitado. La conversión puede fallar cuando el valor no es válido para el tipo.

**Búsqueda** Tipos y conversiones, convertir importe a decimal, tipos y conversiones

**Para recordar** Comprueba el tipo original y la configuración ANSI.

#### Convertir importe a decimal

```python
orders.select(F.col("amount").cast("decimal(10,2)").alias("amount")).orderBy("amount").show(1)
```

**Resultado esperado** 100.00.

### astype y try_cast

**Clave** `astype-y-try-cast`

**Definición** `astype()` es alias de cast; `try_cast()` devuelve NULL para conversiones inválidas admitidas en lugar de fallar.

**Búsqueda** astype y try_cast, convertir texto defectuoso, tipos y conversiones

**Para recordar** En Spark 4.0+ existe Column.try_cast; el modo ANSI está activo por defecto en Spark 4.x.

#### Convertir texto defectuoso

```python
spark.createDataFrame([("12",), ("x",)], "raw STRING").select(F.col("raw").try_cast("int").alias("value")).show()
```

**Resultado esperado** 12, NULL.

### Coerción, ANSI y sensibilidad a mayúsculas

**Clave** `coercion-ansi-y-sensibilidad-a-mayusculas`

**Definición** Spark puede convertir tipos implícitamente. ANSI controla errores aritméticos y conversiones; caseSensitive afecta resolución de nombres.

**Búsqueda** Coerción, ANSI y sensibilidad a mayúsculas, consultar configuración, tipos y conversiones

**Para recordar** No confíes en conversiones implícitas para datos críticos.

#### Consultar configuración

```python
print(spark.conf.get("spark.sql.ansi.enabled"))
print(spark.conf.get("spark.sql.caseSensitive"))
```

**Resultado esperado** En la sesión preparada: true y false.

## Funciones de texto

**Clave** `funciones-de-texto`

### Definición

**Clave** `definicion`

**Definición** Las funciones de `pyspark.sql.functions` transforman columnas de texto sin bucles Python.

**Búsqueda** Funciones de texto, convertir nombres a mayúsculas, funciones de texto

**Para recordar** Usa funciones nativas antes de UDFs.

#### Convertir nombres a mayúsculas

```python
customers.select(F.upper("name").alias("name")).orderBy("name").show()
```

**Resultado esperado** ANA, DIEGO, LUIS, MARTA, SOFIA.

### trim, lower, upper e initcap

**Clave** `trim-lower-upper-e-initcap`

**Definición** Normalizan espacios extremos o capitalización; ltrim y rtrim actúan sobre un extremo.

**Búsqueda** trim, lower, upper e initcap, limpiar texto de entrada, funciones de texto

**Para recordar** Limpiar no equivale a validar.

#### Limpiar texto de entrada

```python
spark.range(1).select(F.lower(F.trim(F.lit("  MX  "))).alias("country")).show()
```

**Resultado esperado** mx.

### concat, concat_ws, substring y length

**Clave** `concat-concat-ws-substring-y-length`

**Definición** `concat` combina valores; `concat_ws` utiliza separador; `substring` extrae texto desde una posición basada en 1; `length` cuenta caracteres.

**Búsqueda** concat, concat_ws, substring y length, crear una etiqueta, funciones de texto

**Para recordar** concat puede devolver NULL si un argumento es NULL; concat_ws omite cadenas nulas.

#### Crear una etiqueta

```python
customers.select(F.concat_ws(" - ", "name", "country").alias("label")).orderBy("label").show(1)
```

**Resultado esperado** Ana - MX.

### split y expresiones regulares

**Clave** `split-y-expresiones-regulares`

**Definición** `split` separa por un patrón regex; `regexp_replace` reemplaza coincidencias y `regexp_extract` extrae un grupo.

**Búsqueda** split y expresiones regulares, limpiar un código, funciones de texto

**Para recordar** Los patrones de regex no son SQL LIKE.

#### Limpiar un código

```python
spark.range(1).select(F.regexp_replace(F.lit("MX-123"), "[^0-9]", "").alias("code")).show()
```

**Resultado esperado** 123 como texto.

### Extraer y separar campos

**Clave** `extraer-y-separar-campos`

**Definición** `substring` comienza en 1; `split` devuelve un array; regexp_extract devuelve texto del grupo indicado, o cadena vacía si no coincide.

**Búsqueda** Extraer y separar campos, separar un código de sucursal, funciones de texto

**Para recordar** Usa delimitadores y patrones compatibles con el dato real.

#### Separar un código de sucursal

```python
spark.range(1).select(F.split(F.lit("MX-001"),"-").alias("parts"),F.substring(F.lit("MX-001"),1,2).alias("prefix")).show()
```

**Resultado esperado** parts=[MX,001], prefix=MX.

## Funciones numéricas

**Clave** `funciones-numericas`

### Definición

**Clave** `definicion`

**Definición** Las expresiones aritméticas y funciones numéricas calculan columnas, como descuentos o diferencias.

**Búsqueda** Funciones numéricas, aplicar un descuento, funciones numericas

**Para recordar** Haz los cálculos con Columns; no con funciones escalares de Python.

#### Aplicar un descuento

```python
orders.select("order_id", (F.col("amount")*0.9).alias("net")).orderBy("order_id").show(1)
```

**Resultado esperado** 101, 450.0.

### round y bround

**Clave** `round-y-bround`

**Definición** `round` redondea HALF_UP; `bround` usa HALF_EVEN, que en empates elige el valor par.

**Búsqueda** round y bround, comparar reglas de empate, funciones numericas

**Para recordar** Elige la regla exigida por el negocio.

#### Comparar reglas de empate

```python
spark.range(1).select(F.round(F.lit(2.5)).alias("r"), F.bround(F.lit(2.5)).alias("b")).show()
```

**Resultado esperado** r=3.0, b=2.0.

### abs, ceil, floor y matemáticas

**Clave** `abs-ceil-floor-y-matematicas`

**Definición** `abs` calcula magnitud; ceil y floor redondean a entero superior e inferior; pow, sqrt y log son operaciones matemáticas.

**Búsqueda** abs, ceil, floor y matemáticas, calcular diferencias absolutas, funciones numericas

**Para recordar** El dominio de la función importa.

#### Calcular diferencias absolutas

```python
spark.range(1).select(F.abs(F.lit(-5)).alias("a"), F.ceil(F.lit(2.1)).alias("c"), F.floor(F.lit(2.9)).alias("f")).show()
```

**Resultado esperado** 5,3,2.

### División segura

**Clave** `division-segura`

**Definición** `try_divide()` devuelve NULL si el divisor es cero; es útil para ratios con denominadores variables.

**Búsqueda** División segura, evitar división entre cero, funciones numericas

**Para recordar** NULL no equivale a cero; decide cómo informar un ratio indefinido.

#### Evitar división entre cero

```python
spark.range(1).select(F.try_divide(F.lit(10), F.lit(0)).alias("ratio")).show()
```

**Resultado esperado** NULL.

## Fechas y timestamps

**Clave** `fechas-y-timestamps`

### Definición

**Clave** `definicion`

**Definición** DateType representa fechas; TimestampType representa instantes interpretados según la zona horaria de sesión al mostrarlos.

**Búsqueda** Fechas y timestamps, convertir una fecha, fechas y timestamps

**Para recordar** No analices fechas como texto si necesitas aritmética temporal.

#### Convertir una fecha

```python
spark.range(1).select(F.to_date(F.lit("2026-09-01")).alias("date")).printSchema()
```

**Resultado esperado** date de tipo date.

### Parseo y formato

**Clave** `parseo-y-formato`

**Definición** `to_date`, `to_timestamp` y `try_to_timestamp` convierten texto; `date_format` produce texto.

**Búsqueda** Parseo y formato, extraer etiqueta mensual, fechas y timestamps

**Para recordar** Formatear no cambia un dato a tipo fecha.

#### Extraer etiqueta mensual

```python
orders.select(F.date_format("order_date", "yyyy-MM").alias("month")).distinct().orderBy("month").show()
```

**Resultado esperado** 2026-08, 2026-09.

### Extracción de componentes

**Clave** `extraccion-de-componentes`

**Definición** year, month, quarter, dayofmonth, dayofweek y weekofyear extraen partes de la fecha.

**Búsqueda** Extracción de componentes, extraer año y trimestre, fechas y timestamps

**Para recordar** Agrupa por año y mes para no mezclar años.

#### Extraer año y trimestre

```python
orders.select(F.year("order_date").alias("year"), F.quarter("order_date").alias("quarter")).distinct().show()
```

**Resultado esperado** (2026,3).

### Diferencias y desplazamientos

**Clave** `diferencias-y-desplazamientos`

**Definición** `datediff(fin,inicio)` calcula días; date_add/date_sub desplazan días; add_months y months_between trabajan con meses.

**Búsqueda** Diferencias y desplazamientos, calcular plazo, fechas y timestamps

**Para recordar** Los meses no tienen una duración fija en días.

#### Calcular plazo

```python
spark.range(1).select(F.datediff(F.lit("2026-09-10"), F.lit("2026-09-01")).alias("days"), F.add_months(F.lit("2026-01-31"),1).alias("next")).show()
```

**Resultado esperado** days=9, next=2026-02-28.

### trunc, date_trunc y last_day

**Clave** `trunc-date-trunc-y-last-day`

**Definición** `trunc` corta una fecha al inicio del periodo; `date_trunc` produce timestamp; `last_day` devuelve el último día del mes.

**Búsqueda** trunc, date_trunc y last_day, obtener inicio de mes, fechas y timestamps

**Para recordar** Usa límites temporales coherentes al agrupar.

#### Obtener inicio de mes

```python
orders.select(F.trunc("order_date", "month").alias("month")).distinct().orderBy("month").show()
```

**Resultado esperado** 2026-08-01, 2026-09-01.

### Fecha actual y zona horaria

**Clave** `fecha-actual-y-zona-horaria`

**Definición** current_date/current_timestamp se evalúan al ejecutar la consulta; la zona de sesión afecta timestamps. `from_utc_timestamp` y `to_utc_timestamp` convierten según zona.

**Búsqueda** Fecha actual y zona horaria, consultar zona y fecha actual, fechas y timestamps

**Para recordar** Fija UTC para reproducibilidad y evita conversiones dobles.

#### Consultar zona y fecha actual

```python
print(spark.conf.get("spark.sql.session.timeZone"))
spark.range(1).select(F.current_date().alias("today")).show()
```

**Resultado esperado** UTC y la fecha de ejecución en UTC; no hay un día fijo.

## Agregación

**Clave** `agregacion`

### Definición

**Clave** `definicion`

**Definición** Una agregación resume muchas filas en uno o varios valores; `agg()` permite combinar funciones.

**Búsqueda** Agregación, calcular ventas completadas, agregacion

**Para recordar** Sin groupBy, todo el DataFrame es un grupo.

#### Calcular ventas completadas

```python
orders.where(F.col("status")=="completed").agg(F.sum("amount").alias("sales")).show()
```

**Resultado esperado** sales=2300.

### COUNT y valores distintos

**Clave** `count-y-valores-distintos`

**Definición** `count("*")` cuenta filas; `count("coupon")` omite NULL; `count_distinct()` (alias countDistinct) cuenta valores únicos no nulos.

**Búsqueda** COUNT y valores distintos, comparar tres conteos, agregacion

**Para recordar** DataFrame.count es acción; F.count es expresión agregada.

#### Comparar tres conteos

```python
orders.agg(F.count("*").alias("rows"), F.count("coupon").alias("coupons"), F.count_distinct("customer_id").alias("customers")).show()
```

**Resultado esperado** 6,3,3.

### SUM, AVG, MIN y MAX

**Clave** `sum-avg-min-y-max`

**Definición** Estas agregaciones suman, promedian o encuentran extremos; ignoran NULL.

**Búsqueda** SUM, AVG, MIN y MAX, resumir importes, agregacion

**Para recordar** AVG no divide por todas las filas si hay nulos en la columna.

#### Resumir importes

```python
orders.agg(F.sum("amount").alias("total"), F.avg("amount").alias("avg"), F.min("amount").alias("min"), F.max("amount").alias("max")).show()
```

**Resultado esperado** 2600, 433.333333… ,100,800.

### Agregación condicional y ratios

**Clave** `agregacion-condicional-y-ratios`

**Definición** Combina `when` con `sum` o `count` para calcular métricas de un subconjunto sin perder el denominador total.

**Búsqueda** Agregación condicional y ratios, medir tasa de completados, agregacion

**Para recordar** No filtres antes si el denominador necesita todas las filas.

#### Medir tasa de completados

```python
orders.agg(F.round(100*F.avg(F.when(F.col("status")=="completed",1).otherwise(0)),2).alias("pct")).show()
```

**Resultado esperado** 83.33.

### collect_list y collect_set

**Clave** `collect-list-y-collect-set`

**Definición** `collect_list` crea un array con los valores de un grupo; `collect_set` elimina repetidos.

**Búsqueda** collect_list y collect_set, listar estados distintos, agregacion

**Para recordar** El orden tras un shuffle no está garantizado; usa sort_array si importa.

#### Listar estados distintos

```python
orders.agg(F.sort_array(F.collect_set("status")).alias("statuses")).show(truncate=False)
```

**Resultado esperado** [cancelled, completed].

### Estadística descriptiva

**Clave** `estadistica-descriptiva`

**Definición** `stddev` y `variance` calculan dispersión muestral; `stddev_pop` y `var_pop` son poblacionales; `corr` y `covar_pop` estudian dos variables.

**Búsqueda** Estadística descriptiva, medir correlación de dos columnas, agregacion

**Para recordar** Correlación no implica causalidad.

#### Medir correlación de dos columnas

```python
d = spark.createDataFrame([(1,2),(2,4),(3,6)], "x INT, y INT")
d.agg(F.corr("x","y").alias("r"), F.variance("x").alias("var")).show()
```

**Resultado esperado** r=1.0, var=1.0.

### Percentiles y aproximaciones

**Clave** `percentiles-y-aproximaciones`

**Definición** `median()` calcula la mediana; `percentile_approx` aproxima cuantiles; `approx_count_distinct` estima cardinalidad.

**Búsqueda** Percentiles y aproximaciones, obtener mediana y cuantil aproximado, agregacion

**Para recordar** Las aproximaciones intercambian precisión por coste.

#### Obtener mediana y cuantil aproximado

```python
orders.agg(F.median("amount").alias("median"), F.percentile_approx("amount",0.5).alias("p50")).show()
```

**Resultado esperado** median=400.0; p50 aproximado normalmente 300 con esta muestra. La aproximación no tiene que coincidir con median().

## GROUP BY y HAVING

**Clave** `group-by-y-having`

### Definición

**Clave** `definicion`

**Definición** `groupBy()` divide filas por claves y `agg()` calcula valores por grupo. El resultado contiene una fila por combinación de claves.

**Búsqueda** GROUP BY y HAVING, contar pedidos por cliente, group by y having

**Para recordar** La clave de agrupación decide la granularidad.

#### Contar pedidos por cliente

```python
orders.groupBy("customer_id").count().orderBy("customer_id").show()
```

**Resultado esperado** (1,2), (2,2), (3,2).

### Varias columnas

**Clave** `varias-columnas`

**Definición** Agrupar por varias columnas produce grupos por combinación, no un cálculo independiente para cada columna.

**Búsqueda** Varias columnas, contar por cliente y estado, group by y having

**Para recordar** Agrupar por cliente y estado distingue dos estados del mismo cliente.

#### Contar por cliente y estado

```python
orders.groupBy("customer_id","status").count().orderBy("customer_id","status").show()
```

**Resultado esperado** (1,completed,2), (2,cancelled,1), (2,completed,1), (3,completed,2).

### HAVING y filtros

**Clave** `having-y-filtros`

**Definición** En DataFrame API, filtrar después de agg equivale a HAVING; filtrar antes equivale a WHERE.

**Búsqueda** HAVING y filtros, encontrar clientes con gasto completado mayor a 700, group by y having

**Para recordar** El filtro posterior trabaja sobre los agregados, no sobre cada pedido.

#### Encontrar clientes con gasto completado mayor a 700

```python
orders.where(F.col("status")=="completed").groupBy("customer_id").agg(F.sum("amount").alias("spent")).where(F.col("spent")>700).show()
```

**Resultado esperado** (3,900).

### rollup, cube y groupingSets

**Clave** `rollup-cube-y-groupingsets`

**Definición** `rollup` calcula subtotales jerárquicos; `cube` genera todas las combinaciones de dimensiones; `groupingSets` elige combinaciones concretas.

**Búsqueda** rollup, cube y groupingSets, contar pedidos y total general, group by y having

**Para recordar** Usa grouping/grouping_id para distinguir subtotales de nulos reales.

#### Contar pedidos y total general

```python
orders.rollup("status").agg(F.count("*").alias("n"), F.grouping("status").alias("subtotal")).orderBy("subtotal","status").show()
```

**Resultado esperado** cancelled=1, completed=5, total general=NULL,6 con subtotal=1.

### groupingSets y cube

**Clave** `groupingsets-y-cube`

**Definición** `groupingSets()` (Spark 4.0+) permite pedir agrupaciones específicas; cube genera todas las combinaciones posibles de dimensiones.

**Búsqueda** groupingSets y cube, contar por estado y total, group by y having

**Para recordar** No confundas un subtotal con un valor faltante de una dimensión.

#### Contar por estado y total

```python
orders.groupingSets([("status",),()],"status").agg(F.count("*").alias("n")).orderBy(F.col("status").asc_nulls_last()).show()
```

**Resultado esperado** (cancelled,1),(completed,5),(NULL,6).

## Valores únicos y calidad

**Clave** `valores-unicos-y-calidad`

### Definición

**Clave** `definicion`

**Definición** `distinct()` elimina filas repetidas completas; `dropDuplicates()` permite indicar las claves para detectar repetición.

**Búsqueda** Valores únicos y calidad, mostrar estados únicos, valores unicos y calidad

**Para recordar** No deduzcas que dos registros son iguales solo por coincidir en un campo.

#### Mostrar estados únicos

```python
orders.select("status").distinct().orderBy("status").show()
```

**Resultado esperado** cancelled, completed.

### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Agrupa por la clave de negocio y filtra los conteos mayores a uno.

**Búsqueda** Detectar duplicados, detectar emails repetidos, valores unicos y calidad

**Para recordar** Una clave técnica única no impide duplicados de negocio.

#### Detectar emails repetidos

```python
leads.groupBy("email").count().where(F.col("count")>1).show()
```

**Resultado esperado** ana@demo.test,2.

### Eliminar duplicados determinísticamente

**Clave** `eliminar-duplicados-deterministicamente`

**Definición** `dropDuplicates([clave])` conserva un representante sin prometer cuál. Si importa cuál queda, usa `row_number` con un orden explícito.

**Búsqueda** Eliminar duplicados determinísticamente, conservar el último lead, valores unicos y calidad

**Para recordar** No confíes en ordenar antes de dropDuplicates para elegir la fila más reciente.

**Nota** Esta ficha anticipa `Window.partitionBy`, `orderBy` y `row_number`, explicados en el grupo Ventanas.

#### Conservar el último lead

```python
w = Window.partitionBy("email").orderBy(F.desc("lead_id"))
leads.withColumn("rn", F.row_number().over(w)).where("rn = 1").select("lead_id").orderBy("lead_id").show()
```

**Resultado esperado** 2,3,4.

### Validaciones

**Clave** `validaciones`

**Definición** Comprueba nulos, rangos, unicidad y referencias entre tablas como reglas separadas.

**Búsqueda** Validaciones, validar importes y claves, valores unicos y calidad

**Para recordar** Un esquema describe tipos, no garantiza toda la calidad de negocio.

**Nota** `left_anti` conserva claves sin coincidencia; se explica en JOIN.

#### Validar importes y claves

```python
print(orders.where(F.col("amount")<=0).count())
print(orders.join(customers,"customer_id","left_anti").count())
```

**Resultado esperado** 0 importes no positivos y 0 pedidos huérfanos.

## JOIN

**Clave** `join`

### Definición

**Clave** `definicion`

**Definición** `join()` combina filas de dos DataFrames según una condición o claves comunes.

**Búsqueda** JOIN, obtener cliente y pedido, join

**Para recordar** Comprueba la cardinalidad antes de sumar resultados de un join.

#### Obtener cliente y pedido

```python
orders.join(customers,"customer_id","inner").select("order_id","name").orderBy("order_id").show(2)
```

**Resultado esperado** (101,Ana), (102,Ana).

### Condición y alias

**Clave** `condicion-y-alias`

**Definición** Una condición Column permite comparar nombres distintos o varias expresiones; `alias()` desambigua referencias de ambos lados.

**Búsqueda** Condición y alias, unir usando on explícito, join

**Para recordar** Una lista de nombres de clave comunes genera una sola copia de esas claves.

#### Unir usando ON explícito

```python
o = orders.alias("o")
c = customers.alias("c")
o.join(c,F.col("o.customer_id")==F.col("c.customer_id")).select("o.order_id","c.name").orderBy("order_id").show(1)
```

**Resultado esperado** 101,Ana.

### LEFT, RIGHT y FULL

**Clave** `left-right-y-full`

**Definición** LEFT conserva todo lo de la izquierda; RIGHT lo de la derecha; FULL ambas. Las columnas sin coincidencia se rellenan con NULL.

**Búsqueda** LEFT, RIGHT y FULL, incluir clientes sin pedidos, join

**Para recordar** Una condición posterior sobre la tabla opcional puede eliminar las filas conservadas.

#### Incluir clientes sin pedidos

```python
customers.join(orders,"customer_id","left").where(F.col("order_id").isNull()).select("customer_id","name").orderBy("customer_id").show()
```

**Resultado esperado** (4,Diego), (5,Sofia).

### Semi y anti join

**Clave** `semi-y-anti-join`

**Definición** `left_semi` devuelve solo filas izquierdas con coincidencia; `left_anti` las que no coinciden. Ninguno añade columnas derechas.

**Búsqueda** Semi y anti join, buscar clientes que nunca pidieron, join

**Para recordar** Un semi join evita multiplicar filas izquierdas por coincidencias derechas.

#### Buscar clientes que nunca pidieron

```python
customers.join(orders,"customer_id","left_anti").select("name").orderBy("name").show()
```

**Resultado esperado** Diego, Sofia.

### CROSS JOIN y self join

**Clave** `cross-join-y-self-join`

**Definición** `crossJoin` forma el producto cartesiano; un self join une un DataFrame consigo mismo con alias distintos.

**Búsqueda** CROSS JOIN y self join, combinar dos ids con dos canales, join

**Para recordar** El producto cartesiano puede crecer como N×M.

#### Combinar dos IDs con dos canales

```python
spark.range(2).crossJoin(spark.createDataFrame([("web",),("store",)],"channel STRING")).orderBy("id","channel").show()
```

**Resultado esperado** (0,store),(0,web),(1,store),(1,web).

### Cardinalidad y joins múltiples

**Clave** `cardinalidad-y-joins-multiples`

**Definición** Una relación 1:N repite campos del lado 1; N:M puede multiplicarlos aún más. Agrega a la granularidad correcta antes de sumar.

**Búsqueda** Cardinalidad y joins múltiples, calcular ventas de productos, join

**Para recordar** No sumes el importe completo de un pedido por cada línea de detalle.

#### Calcular ventas de productos

```python
items.join(orders,"order_id").join(products,"product_id").where("status = 'completed'").groupBy("category").agg(F.sum(F.col("quantity")*F.col("unit_price")).alias("revenue")).orderBy("category").show()
```

**Resultado esperado** Electronics=1300, Furniture=1000.

### Self join

**Clave** `self-join`

**Definición** Un self join usa dos alias del mismo DataFrame para relacionar filas entre sí.

**Búsqueda** Self join, encontrar clientes distintos del mismo país, join

**Para recordar** Evita columnas ambiguas y condiciones que combinen una fila consigo misma sin intención.

#### Encontrar clientes distintos del mismo país

```python
a=customers.alias("a")
b=customers.alias("b")
a.join(b,(F.col("a.country")==F.col("b.country")) & (F.col("a.customer_id")<F.col("b.customer_id"))).select(F.col("a.name").alias("a"),F.col("b.name").alias("b")).orderBy("a").show()
```

**Resultado esperado** (Ana,Luis),(Marta,Sofia).

### RIGHT y FULL en la práctica

**Clave** `right-y-full-en-la-practica`

**Definición** RIGHT es equivalente a LEFT intercambiando los lados; FULL conserva filas sin coincidencia de ambos lados.

**Búsqueda** RIGHT y FULL en la práctica, comparar conjuntos con claves faltantes, join

**Para recordar** Usa claves de prueba que permitan observar la diferencia.

#### Comparar conjuntos con claves faltantes

```python
a=spark.createDataFrame([(1,),(2,)],"id INT")
b=spark.createDataFrame([(2,),(3,)],"id INT")
a.join(b,"id","full").orderBy("id").show()
```

**Resultado esperado** 1,2,3; con right serían 2,3 y con left serían 1,2.

## Operaciones de conjuntos

**Clave** `operaciones-de-conjuntos`

### Definición

**Clave** `definicion`

**Definición** Las operaciones de conjuntos combinan DataFrames con esquemas compatibles; pueden preservar o eliminar duplicados según el método.

**Búsqueda** Operaciones de conjuntos, combinar dos listas, operaciones de conjuntos

**Para recordar** `union()` conserva repetidos, como SQL UNION ALL.

#### Combinar dos listas

```python
a = spark.createDataFrame([(1,),(2,)],"id INT")
b = spark.createDataFrame([(2,),(3,)],"id INT")
a.union(b).orderBy("id").show()
```

**Resultado esperado** 1,2,2,3.

### unionByName

**Clave** `unionbyname`

**Definición** `unionByName()` alinea columnas por nombre en lugar de posición; allowMissingColumns completa campos ausentes con NULL.

**Búsqueda** unionByName, combinar tablas con columnas invertidas, operaciones de conjuntos

**Para recordar** No uses union por posición si los esquemas están reordenados.

#### Combinar tablas con columnas invertidas

```python
a = spark.createDataFrame([(1,"MX")],"id INT, country STRING")
b = spark.createDataFrame([("ES",2)],"country STRING, id INT")
a.unionByName(b).orderBy("id").show()
```

**Resultado esperado** (1,MX),(2,ES).

### intersect, intersectAll, subtract y exceptAll

**Clave** `intersect-intersectall-subtract-y-exceptall`

**Definición** intersect y subtract eliminan duplicados en el resultado; intersectAll y exceptAll respetan multiplicidades.

**Búsqueda** intersect, intersectAll, subtract y exceptAll, restar filas preservando multiplicidad, operaciones de conjuntos

**Para recordar** Estas operaciones alinean por posición; revisa el orden de columnas.

#### Restar filas preservando multiplicidad

```python
a = spark.createDataFrame([(1,),(1,),(2,)],"id INT")
b = spark.createDataFrame([(1,)],"id INT")
a.exceptAll(b).orderBy("id").show()
```

**Resultado esperado** 1,2. Con subtract quedaría solo 2.

## Muestreo y estadísticas de exploración

**Clave** `muestreo-y-estadisticas`

### Definición

**Clave** `definicion`

**Definición** El muestreo permite explorar parte de los datos; las estadísticas aproximadas reducen coste para distribuciones grandes.

**Búsqueda** Muestreo y estadísticas de exploración, tomar una muestra completa, muestreo y estadisticas

**Para recordar** Una fracción no garantiza un número exacto de filas.

#### Tomar una muestra completa

```python
print(orders.sample(False,1.0,seed=42).count())
```

**Resultado esperado** 6.

### sampleBy y randomSplit

**Clave** `sampleby-y-randomsplit`

**Definición** sampleBy aplica fracciones por estrato; randomSplit divide aleatoriamente usando pesos normalizados.

**Búsqueda** sampleBy y randomSplit, separar datos en dos partes, muestreo y estadisticas

**Para recordar** No uses un split aleatorio si introduce fuga temporal en un modelo.

#### Separar datos en dos partes

```python
train,test = orders.randomSplit([0.8,0.2],seed=42)
print(train.count()+test.count())
```

**Resultado esperado** 6; los tamaños individuales no se garantizan.

### approxQuantile e IQR

**Clave** `approxquantile-e-iqr`

**Definición** approxQuantile estima cuantiles; el rango intercuartílico es Q3−Q1 y permite construir límites de exploración de atípicos.

**Búsqueda** approxQuantile e IQR, obtener cuartiles exactos en datos pequeños, muestreo y estadisticas

**Para recordar** Un atípico es una señal para investigar, no necesariamente un error.

#### Obtener cuartiles exactos en datos pequeños

```python
print(orders.approxQuantile("amount",[0.25,0.75],0))
```

**Resultado esperado** [200.0,700.0]; IQR=500.

### freqItems y crosstab

**Clave** `freqitems-y-crosstab`

**Definición** freqItems busca elementos frecuentes y puede incluir falsos positivos; crosstab construye una tabla de contingencia de dos columnas.

**Búsqueda** freqItems y crosstab, contar cruces de cliente y estado, muestreo y estadisticas

**Para recordar** La cardinalidad de columnas puede hacer muy grande una tabla cruzada.

#### Contar cruces de cliente y estado

```python
orders.stat.crosstab("customer_id","status").orderBy("customer_id_status").show()
```

**Resultado esperado** Columnas customer_id_status,cancelled,completed; filas (1,0,2),(2,1,1),(3,0,2).

## Ventanas

**Clave** `ventanas`

### Definición

**Clave** `definicion`

**Definición** Una función de ventana calcula valores relacionados con otras filas sin reducirlas a una fila por grupo. `over()` recibe una especificación Window.

**Búsqueda** Ventanas, mostrar total global junto a cada pedido, ventanas

**Para recordar** groupBy reduce filas; Window las conserva.

**Nota** Una ventana global puede concentrar datos en una partición; evita en grandes volúmenes si no es necesaria.

#### Mostrar total global junto a cada pedido

```python
w = Window.partitionBy()
orders.select("order_id",F.sum("amount").over(w).alias("total")).orderBy("order_id").show(2)
```

**Resultado esperado** (101,2600),(102,2600).

### PARTITION BY y ORDER BY

**Clave** `partition-by-y-order-by`

**Definición** `Window.partitionBy()` separa ventanas por clave y `orderBy()` define el orden de cálculo dentro de cada una.

**Búsqueda** PARTITION BY y ORDER BY, numerar pedidos dentro de cliente, ventanas

**Para recordar** El orderBy de Window no garantiza el orden de presentación final.

#### Numerar pedidos dentro de cliente

```python
w = Window.partitionBy("customer_id").orderBy("order_date","order_id")
orders.select("customer_id","order_id",F.row_number().over(w).alias("n")).orderBy("customer_id","n").show()
```

**Resultado esperado** (1,101,1),(1,102,2),(2,103,1),(2,105,2),(3,104,1),(3,106,2).

### ROW_NUMBER, RANK y DENSE_RANK

**Clave** `row-number-rank-y-dense-rank`

**Definición** row_number numera filas; rank comparte rango con empates y salta puestos; dense_rank no salta puestos.

**Búsqueda** ROW_NUMBER, RANK y DENSE_RANK, comparar rankings con empate, ventanas

**Para recordar** Para row_number, añade desempate si necesitas un resultado reproducible; para rank no rompas los empates de negocio.

#### Comparar rankings con empate

```python
d = spark.createDataFrame([(1,100),(2,90),(3,90),(4,80)],"id INT, score INT")
w = Window.orderBy(F.desc("score"))
d.select("id",F.rank().over(w).alias("r"),F.dense_rank().over(w).alias("dr"),F.row_number().over(Window.orderBy(F.desc("score"),"id")).alias("rn")).orderBy("id").show()
```

**Resultado esperado** r=1,2,2,4; dr=1,2,2,3; rn=1,2,3,4.

### LAG y LEAD

**Clave** `lag-y-lead`

**Definición** `lag()` trae el valor anterior y `lead()` el siguiente según el orden de la ventana; se puede indicar distancia y valor por defecto.

**Búsqueda** LAG y LEAD, comparar pedidos consecutivos, ventanas

**Para recordar** Sin una fila vecina, el resultado por defecto es NULL.

#### Comparar pedidos consecutivos

```python
w = Window.partitionBy("customer_id").orderBy("order_date","order_id")
orders.select("order_id",F.lag("amount").over(w).alias("previous"),F.lead("amount").over(w).alias("next")).orderBy("order_id").show(2)
```

**Resultado esperado** (101,NULL,200), (102,500,NULL).

### ROWS y RANGE

**Clave** `rows-y-range`

**Definición** `rowsBetween()` usa posiciones físicas relativas; `rangeBetween()` usa valores de la expresión de ordenamiento.

**Búsqueda** ROWS y RANGE, calcular acumulado fila por fila, ventanas

**Para recordar** Con orden y agregación, el marco predeterminado suele ser RANGE hasta la fila actual; empates pueden compartir acumulado.

**Nota** El orden cronológico usa el ID ascendente para desempatar.

#### Calcular acumulado fila por fila

```python
w = Window.orderBy("order_date","order_id").rowsBetween(Window.unboundedPreceding,Window.currentRow)
orders.select("order_id",F.sum("amount").over(w).alias("running")).orderBy("order_date","order_id").show()
```

**Resultado esperado** 101=500,102=700,103=1400,104=1500,105=1800,106=2600.

### first, last y valores de ventana

**Clave** `first-last-y-valores-de-ventana`

**Definición** `first_value` y `last_value` recuperan valores de los extremos del marco; `first` y `last` también existen como agregaciones.

**Búsqueda** first, last y valores de ventana, mostrar último importe de cada cliente, ventanas

**Para recordar** Para obtener el último de toda la partición, extiende el marco hasta unboundedFollowing.

#### Mostrar último importe de cada cliente

```python
w = Window.partitionBy("customer_id").orderBy("order_date","order_id").rowsBetween(Window.unboundedPreceding,Window.unboundedFollowing)
orders.select("order_id",F.last_value("amount").over(w).alias("last_amount")).orderBy("order_id").show(2)
```

**Resultado esperado** (101,200),(102,200).

### NTILE, PERCENT_RANK y CUME_DIST

**Clave** `ntile-percent-rank-y-cume-dist`

**Definición** ntile distribuye filas en grupos numerados; percent_rank mide rango relativo; cume_dist mide proporción acumulada incluyendo empates.

**Búsqueda** NTILE, PERCENT_RANK y CUME_DIST, dividir pedidos en dos niveles, ventanas

**Para recordar** No confundas posición relativa con porcentaje del importe total.

#### Dividir pedidos en dos niveles

```python
w = Window.orderBy("amount","order_id")
orders.select("order_id",F.ntile(2).over(w).alias("bucket")).orderBy("bucket","order_id").show()
```

**Resultado esperado** Grupo 1: 102,104,105; grupo 2: 101,103,106.

### Top N por grupo

**Clave** `top-n-por-grupo`

**Definición** Calcula una función de ranking dentro de cada clave y luego filtra el resultado.

**Búsqueda** Top N por grupo, obtener pedido mayor por cliente, ventanas

**Para recordar** El ranking debe existir antes de filtrarlo.

#### Obtener pedido mayor por cliente

```python
w = Window.partitionBy("customer_id").orderBy(F.desc("amount"),"order_id")
orders.withColumn("rn",F.row_number().over(w)).where("rn = 1").select("customer_id","order_id").orderBy("customer_id").show()
```

**Resultado esperado** (1,101),(2,103),(3,106).

### Promedios móviles

**Clave** `promedios-moviles`

**Definición** Una ventana con marco deslizante permite calcular métricas sobre las últimas filas o un rango temporal.

**Búsqueda** Promedios móviles, promediar pedido actual y anterior, ventanas

**Para recordar** Dos filas no equivalen necesariamente a dos días.

#### Promediar pedido actual y anterior

```python
w = Window.partitionBy("customer_id").orderBy("order_date","order_id").rowsBetween(-1,0)
orders.select("order_id",F.avg("amount").over(w).alias("moving_avg")).orderBy("order_id").show(2)
```

**Resultado esperado** 101=500.0,102=350.0.

### rangeBetween

**Clave** `rangebetween`

**Definición** `rangeBetween` usa un rango de valores alrededor de la clave de ordenamiento, no una cantidad fija de filas. Los límites finitos requieren normalmente una sola expresión de orden numérica.

**Búsqueda** rangeBetween, sumar importes cercanos, ventanas

**Para recordar** Dos filas empatadas pueden tener el mismo marco de valores.

#### Sumar importes cercanos

```python
d=spark.createDataFrame([(100,),(150,),(300,)],"amount INT")
w=Window.orderBy("amount").rangeBetween(-50,0)
d.select("amount",F.sum("amount").over(w).alias("nearby")).orderBy("amount").show()
```

**Resultado esperado** (100,100),(150,250),(300,300).

### percent_rank y cume_dist

**Clave** `percent-rank-y-cume-dist`

**Definición** percent_rank calcula (rank−1)/(n−1), con 0 para una única fila; cume_dist cuenta filas hasta el valor actual inclusive y divide por n.

**Búsqueda** percent_rank y cume_dist, comparar posiciones relativas, ventanas

**Para recordar** Los empates comparten resultados; cume_dist incluye a todos los empatados.

#### Comparar posiciones relativas

```python
d=spark.createDataFrame([(10,),(20,),(30,)],"amount INT")
w=Window.orderBy("amount")
d.select("amount",F.percent_rank().over(w).alias("pr"),F.cume_dist().over(w).alias("cd")).orderBy("amount").show()
```

**Resultado esperado** 10: 0,1/3; 20: 0.5,2/3; 30: 1,1.

## Spark SQL

**Clave** `spark-sql`

### Definición

**Clave** `definicion`

**Definición** `spark.sql()` ejecuta consultas SQL y devuelve DataFrames, usando el mismo motor de expresiones y optimización que el DataFrame API.

**Búsqueda** Spark SQL, consultar pedidos, spark sql

**Para recordar** Puedes alternar SQL y DataFrames sin exportar datos.

#### Consultar pedidos

```python
orders.createOrReplaceTempView("orders")
spark.sql("SELECT COUNT(*) AS n FROM orders").show()
```

**Resultado esperado** n=6.

### Vistas temporales y globales

**Clave** `vistas-temporales-y-globales`

**Definición** `createOrReplaceTempView()` registra un nombre en la sesión; `createOrReplaceGlobalTempView()` comparte una vista dentro de la aplicación usando global_temp.

**Búsqueda** Vistas temporales y globales, registrar vista global, spark sql

**Para recordar** Una vista temporal no escribe datos persistentes.

#### Registrar vista global

```python
orders.createOrReplaceGlobalTempView("orders_demo")
spark.sql("SELECT COUNT(*) FROM global_temp.orders_demo").show()
```

**Resultado esperado** 6.

### Subconsultas y CTEs

**Clave** `subconsultas-y-ctes`

**Definición** Una subconsulta usa el resultado de otra consulta; WITH nombra resultados lógicos dentro de una sentencia.

**Búsqueda** Subconsultas y CTEs, filtrar gasto por encima del promedio, spark sql

**Para recordar** Un CTE no implica persistencia ni materialización obligatoria.

#### Filtrar gasto por encima del promedio

```python
spark.sql("""WITH spend AS (SELECT customer_id,SUM(amount) AS total FROM orders GROUP BY customer_id) SELECT * FROM spend WHERE total > (SELECT AVG(total) FROM spend) ORDER BY customer_id""").show()
```

**Resultado esperado** (2,1000),(3,900).

### Catálogo y metadatos

**Clave** `catalogo-y-metadatos`

**Definición** `spark.catalog` permite consultar tablas, bases, vistas y caché; el catálogo resuelve nombres de objetos.

**Búsqueda** Catálogo y metadatos, comprobar una vista, spark sql

**Para recordar** Un nombre de vista no equivale a una ruta de archivos.

#### Comprobar una vista

```python
print(spark.catalog.tableExists("orders"))
print([t.name for t in spark.catalog.listTables() if t.name=="orders"])
```

**Resultado esperado** True y ['orders'].

## Remodelación de datos

**Clave** `remodelacion`

### Definición

**Clave** `definicion`

**Definición** Pivot transforma valores de una columna en columnas; unpivot o melt convierte columnas de medida en filas.

**Búsqueda** Remodelación de datos, mostrar estados como columnas, remodelacion

**Para recordar** Cambia la forma de la tabla, no los hechos originales.

#### Mostrar estados como columnas

```python
orders.groupBy("customer_id").pivot("status",["completed","cancelled"]).sum("amount").orderBy("customer_id").show()
```

**Resultado esperado** (1,700,NULL),(2,700,300),(3,900,NULL).

### Unpivot y melt

**Clave** `unpivot-y-melt`

**Definición** `unpivot()`/`melt()` convierten columnas de medidas compatibles en pares variable/valor conservando identificadores.

**Búsqueda** Unpivot y melt, convertir meses en filas, remodelacion

**Para recordar** Los tipos de las medidas deben tener un tipo común.

#### Convertir meses en filas

```python
d = spark.createDataFrame([(1,100,200)],"id INT, aug INT, sep INT")
d.unpivot("id",["aug","sep"],"month","sales").orderBy("month").show()
```

**Resultado esperado** (1,aug,100),(1,sep,200).

## Arrays, maps y structs

**Clave** `datos-anidados`

### Definición

**Clave** `definicion`

**Definición** Spark permite columnas anidadas con listas, diccionarios y registros. Las funciones nativas manipulan estas estructuras sin convertirlas a Python.

**Búsqueda** Arrays, maps y structs, consultar datos anidados, datos anidados

**Para recordar** Conserva la estructura hasta que necesites expandirla.

#### Consultar datos anidados

```python
nested.select("id","person.name").orderBy("id").show()
```

**Resultado esperado** (1,Ana),(2,Luis).

### Arrays y pertenencia

**Clave** `arrays-y-pertenencia`

**Definición** `array`, `array_contains`, `size`, `array_distinct`, `array_sort` y operaciones de conjuntos trabajan sobre listas en columnas.

**Búsqueda** Arrays y pertenencia, buscar etiqueta vip, datos anidados

**Para recordar** Una lista vacía no es NULL.

#### Buscar etiqueta vip

```python
nested.select("id",F.array_contains("tags","vip").alias("vip"),F.size("tags").alias("n")).orderBy("id").show()
```

**Resultado esperado** (1,true,3),(2,false,0).

### explode, explode_outer y posexplode

**Clave** `explode-explode-outer-y-posexplode`

**Definición** explode genera una fila por elemento; explode_outer conserva una fila nula cuando la colección está vacía o es NULL; posexplode añade posición.

**Búsqueda** explode, explode_outer y posexplode, expandir etiquetas incluyendo listas vacías, datos anidados

**Para recordar** Expandir arrays modifica la granularidad.

#### Expandir etiquetas incluyendo listas vacías

```python
nested.select("id",F.explode_outer("tags").alias("tag")).orderBy("id","tag").show()
```

**Resultado esperado** (1,new),(1,vip),(1,vip),(2,NULL).

### Struct y withField

**Clave** `struct-y-withfield`

**Definición** `struct()` crea un registro; `Column.withField()` añade o sustituye un campo interno.

**Búsqueda** Struct y withField, añadir campo a persona, datos anidados

**Para recordar** Los campos de un struct tienen nombres y tipos independientes.

#### Añadir campo a persona

```python
nested.select(F.col("person").withField("active",F.lit(True)).alias("person")).printSchema()
```

**Resultado esperado** person contiene id, name y active boolean.

### Mapas y acceso a elementos

**Clave** `mapas-y-acceso-a-elementos`

**Definición** create_map, map_from_arrays y map_from_entries construyen mapas; map_keys/map_values extraen colecciones; element_at obtiene un elemento.

**Búsqueda** Mapas y acceso a elementos, consultar stock por país, datos anidados

**Para recordar** Los arrays usan posiciones de base 1 en element_at, los mapas usan claves.

#### Consultar stock por país

```python
nested.select("id",F.element_at("stock",F.lit("MX")).alias("mx_stock")).orderBy("id").show()
```

**Resultado esperado** (1,2),(2,NULL).

### Operaciones entre arrays y maps

**Clave** `operaciones-entre-arrays-y-maps`

**Definición** array_union, array_intersect y array_except comparan listas; flatten aplana listas; arrays_zip combina posiciones; map_concat une mapas.

**Búsqueda** Operaciones entre arrays y maps, eliminar etiquetas repetidas y ordenar, datos anidados

**Para recordar** Para claves de map repetidas revisa spark.sql.mapKeyDedupPolicy.

#### Eliminar etiquetas repetidas y ordenar

```python
nested.select("id",F.array_sort(F.array_distinct("tags")).alias("tags")).orderBy("id").show()
```

**Resultado esperado** (1,[new,vip]),(2,[]).

### Higher-order functions

**Clave** `higher-order-functions`

**Definición** `transform`, `filter`, `aggregate`, `exists` y `forall` expresan operaciones sobre arrays mediante lambdas de Column.

**Búsqueda** Higher-order functions, convertir etiquetas a mayúsculas, datos anidados

**Para recordar** Estas lambdas construyen expresiones Spark, no bucles Python por fila.

#### Convertir etiquetas a mayúsculas

```python
nested.select("id",F.transform("tags",lambda x:F.upper(x)).alias("tags")).orderBy("id").show()
```

**Resultado esperado** (1,[VIP,NEW,VIP]),(2,[]).

### sequence

**Clave** `sequence`

**Definición** `sequence` construye arrays con valores consecutivos, incluidos los extremos.

**Búsqueda** sequence, generar tres días, datos anidados

**Para recordar** Se puede combinar con explode para generar fechas o posiciones.

#### Generar tres días

```python
spark.range(1).select(F.explode(F.sequence(F.to_date(F.lit("2026-09-01")),F.to_date(F.lit("2026-09-03")))).alias("day")).show()
```

**Resultado esperado** 2026-09-01,2026-09-02,2026-09-03.

### filter, aggregate, exists y forall

**Clave** `filter-aggregate-exists-y-forall`

**Definición** Estas funciones evalúan expresiones sobre elementos de un array: seleccionan, acumulan o comprueban condiciones existenciales/universales.

**Búsqueda** filter, aggregate, exists y forall, contar elementos positivos de una lista, datos anidados

**Para recordar** No confundas F.filter de arrays con DataFrame.filter de filas.

#### Contar elementos positivos de una lista

```python
d=spark.createDataFrame([([1,-2,3],)],"values ARRAY<INT>")
d.select(F.filter("values",lambda x:x>0).alias("positive"),F.aggregate("values",F.lit(0),lambda a,x:a+x).alias("sum"),F.exists("values",lambda x:x<0).alias("negative")).show()
```

**Resultado esperado** positive=[1,3], sum=2, negative=true.

## JSON y otros tipos

**Clave** `json-y-otros-tipos`

### Definición

**Clave** `definicion`

**Definición** `from_json` interpreta texto JSON usando un esquema; `to_json` serializa columnas anidadas a texto.

**Búsqueda** JSON y otros tipos, extraer un campo json, json y otros tipos

**Para recordar** Leer JSON como texto y como struct son operaciones diferentes.

#### Extraer un campo JSON

```python
d = spark.createDataFrame([('{"amount":100}',)],"raw STRING")
d.select(F.from_json("raw","amount INT").getField("amount").alias("amount")).show()
```

**Resultado esperado** 100 como entero.

### get_json_object y schema_of_json

**Clave** `get-json-object-y-schema-of-json`

**Definición** get_json_object extrae una ruta JSON como texto; schema_of_json infiere un esquema a partir de una muestra literal.

**Búsqueda** get_json_object y schema_of_json, consultar ruta de json, json y otros tipos

**Para recordar** Para datos de producción, valida un esquema representativo.

#### Consultar ruta de JSON

```python
spark.range(1).select(F.get_json_object(F.lit('{"a":{"b":2}}'),"$.a.b").alias("b")).show()
```

**Resultado esperado** 2 como texto.

### VariantType e intervalos

**Clave** `varianttype-e-intervalos`

**Definición** VariantType representa valores semiestructurados de esquema variable en Spark 4.x; los tipos de intervalo representan duraciones de calendario o tiempo.

**Búsqueda** VariantType e intervalos, parsear json como variant, json y otros tipos

**Para recordar** Variant no sustituye la validación de campos que exige el negocio.

#### Parsear JSON como variant

```python
spark.range(1).select(F.parse_json(F.lit('{"amount":100}')).alias("v")).printSchema()
```

**Resultado esperado** v de tipo variant.

### Binarios, codificación y hashing

**Clave** `binarios-codificacion-y-hashing`

**Definición** encode/decode convierten texto y bytes; base64/unbase64 representan bytes como texto; hash, xxhash64, md5 y sha2 generan huellas.

**Búsqueda** Binarios, codificación y hashing, codificar un texto, json y otros tipos

**Para recordar** Una huella no garantiza unicidad ni anonimización de datos personales.

#### Codificar un texto

```python
spark.range(1).select(F.base64(F.encode(F.lit("MX"),"UTF-8")).alias("encoded")).show()
```

**Resultado esperado** TVg=.

### Serializar y consultar JSON

**Clave** `serializar-y-consultar-json`

**Definición** `to_json` serializa un struct, map o array; `schema_of_json` devuelve un esquema DDL a partir de JSON literal.

**Búsqueda** Serializar y consultar JSON, serializar una persona, json y otros tipos

**Para recordar** El esquema inferido de una única muestra puede omitir campos presentes en otros registros.

#### Serializar una persona

```python
nested.where("id = 1").select(F.to_json("person").alias("json")).show(truncate=False)
```

**Resultado esperado** Un objeto JSON con id=1 y name=Ana.

## Escritura de datos

**Clave** `escritura-de-datos`

### Definición

**Clave** `definicion`

**Definición** `DataFrame.write` configura un escritor batch. El formato, destino y modo determinan cómo se guardan los datos.

**Búsqueda** Escritura de datos, guardar pedidos como parquet, escritura de datos

**Para recordar** Escribir es una acción; utiliza destinos de prueba aislados.

#### Guardar pedidos como Parquet

```python
path = str(base / "write_demo")
orders.write.mode("overwrite").parquet(path)
print(spark.read.parquet(path).count())
```

**Resultado esperado** 6 filas y esquema conservado.

### Formatos y modos

**Clave** `formatos-y-modos`

**Definición** `append` añade, `overwrite` reemplaza, `ignore` omite si ya existe y `errorifexists` falla si existe. `format`, `option`, `save` configuran el escritor.

**Búsqueda** Formatos y modos, guardar csv con encabezado, escritura de datos

**Para recordar** Overwrite puede eliminar datos; limita el alcance al destino correcto.

#### Guardar CSV con encabezado

```python
p = str(base / "csv_out")
orders.select("order_id").write.format("csv").option("header",True).mode("overwrite").save(p)
print(spark.read.option("header",True).csv(p).count())
```

**Resultado esperado** 6 filas; Spark escribe un directorio con archivos part-*, no un único CSV.

### ORC, Avro y compresión

**Clave** `orc-avro-y-compresion`

**Definición** ORC y Parquet almacenan datos por columnas; Avro por registros. El codec de compresión es una opción del formato.

**Búsqueda** ORC, Avro y compresión, guardar en orc, escritura de datos

**Para recordar** Avro requiere que el módulo spark-avro correspondiente esté disponible.

#### Guardar en ORC

```python
p = str(base / "orc_out")
orders.write.mode("overwrite").option("compression","snappy").orc(p)
print(spark.read.orc(p).count())
```

**Resultado esperado** 6 filas.

### partitionBy, bucketing y sorting

**Clave** `partitionby-bucketing-y-sorting`

**Definición** `write.partitionBy` organiza archivos en directorios según valores; bucketBy distribuye en cubetas por hash y sortBy ordena dentro de cubetas en tablas compatibles.

**Búsqueda** partitionBy, bucketing y sorting, separar archivos por estado, escritura de datos

**Para recordar** No confundas particiones de archivos, de ejecución y de ventanas.

#### Separar archivos por estado

```python
p = base / "by_status"
orders.write.mode("overwrite").partitionBy("status").parquet(str(p))
print(sorted(x.name for x in p.glob("status=*")))
```

**Resultado esperado** ['status=cancelled','status=completed'].

## Tablas y catálogos

**Clave** `tablas-y-catalogos`

### Definición

**Clave** `definicion`

**Definición** Las tablas registradas en un catálogo tienen nombre, esquema y ubicación o proveedor; las gestionadas y externas difieren en quién controla los datos.

**Búsqueda** Tablas y catálogos, registrar una tabla de práctica, tablas y catalogos

**Para recordar** Comprueba qué ocurre al borrar una tabla antes de usar DROP TABLE.

**Nota** Ejecuta únicamente en el entorno local preparado; el nombre es de prueba.

#### Registrar una tabla de práctica

```python
orders.write.mode("overwrite").saveAsTable("alldoc_orders")
print(spark.table("alldoc_orders").count())
```

**Resultado esperado** 6 filas en una tabla gestionada por el catálogo de sesión.

### insertInto y saveAsTable

**Clave** `insertinto-y-saveastable`

**Definición** `insertInto` escribe en una tabla existente y resuelve columnas por posición; `saveAsTable` al añadir permite alinear por nombre.

**Búsqueda** insertInto y saveAsTable, añadir una fila a una tabla aislada, tablas y catalogos

**Para recordar** Para insertInto, revisa el orden y tipos del destino.

#### Añadir una fila a una tabla aislada

```python
orders.limit(0).write.mode("overwrite").saveAsTable("alldoc_insert")
orders.where("order_id = 101").write.insertInto("alldoc_insert")
print(spark.table("alldoc_insert").count())
```

**Resultado esperado** 1.

### DataFrameWriterV2

**Clave** `dataframewriterv2`

**Definición** `writeTo()` ofrece create, replace, createOrReplace, append y overwritePartitions para tablas y catálogos V2 que implementen esas operaciones.

**Búsqueda** DataFrameWriterV2, crear una tabla en catálogo v2, tablas y catalogos

**Para recordar** No todos los proveedores admiten reemplazo, escritura dinámica ni MERGE.

**Nota** Ejemplo externo: requiere catálogo Iceberg llamado demo, namespace sales y dependencias compatibles; no ejecutar contra producción.

#### Crear una tabla en catálogo V2

```python
orders.writeTo("demo.sales.orders").using("iceberg").createOrReplace()
```

**Resultado esperado** Se crea o reemplaza la tabla de prueba con 6 pedidos si el catálogo y proveedor admiten la operación.

### MERGE y evolución de esquema

**Clave** `merge-y-evolucion-de-esquema`

**Definición** `mergeInto()` (Spark 4.0+) construye operaciones de actualización/inserción por condición; schema enforcement valida tipos y schema evolution permite cambios según el proveedor.

**Búsqueda** MERGE y evolución de esquema, actualizar e insertar en una tabla compatible, tablas y catalogos

**Para recordar** Un DataFrame en memoria no admite UPDATE/DELETE persistente; el proveedor debe soportar operaciones por fila.

**Nota** Ejemplo externo: ejecutar después de crear la tabla V2 en un proveedor que implemente MERGE; no usar en el catálogo local Parquet por defecto.

#### Actualizar e insertar en una tabla compatible

```python
updates = orders.where("order_id = 101").withColumn("amount",F.lit(550))
updates.alias("s").mergeInto("demo.sales.orders",F.col("s.order_id")==F.col("orders.order_id")).whenMatched().updateAll().whenNotMatched().insertAll().merge()
```

**Resultado esperado** El pedido 101 queda con amount=550 y no se duplica, si la tabla ya existía con clave única.

### Namespaces y mantenimiento

**Clave** `namespaces-y-mantenimiento`

**Definición** Los namespaces agrupan tablas; listTables/tableExists consultan metadatos y refreshTable invalida datos y metadatos en caché de una tabla.

**Búsqueda** Namespaces y mantenimiento, consultar y refrescar una tabla, tablas y catalogos

**Para recordar** Refresh no repara datos ni ejecuta transformaciones de negocio.

#### Consultar y refrescar una tabla

```python
print(spark.catalog.tableExists("orders"))
spark.catalog.refreshTable("orders")
```

**Resultado esperado** True; la vista existente se refresca sin modificar sus filas.

## Funciones personalizadas

**Clave** `funciones-personalizadas`

### Definición

**Clave** `definicion`

**Definición** Una UDF permite aplicar una función Python a valores de columnas cuando no hay una expresión nativa adecuada.

**Búsqueda** Funciones personalizadas, clasificar con una udf, funciones personalizadas

**Para recordar** Prefiere funciones Spark nativas: permiten optimización y evitan transferencias innecesarias.

#### Clasificar con una UDF

```python
@F.udf("string")
def label(x):
    return "large" if x is not None and x >= 500 else "small"
orders.select("order_id",label("amount").alias("label")).orderBy("order_id").show(1)
```

**Resultado esperado** 101,large.

### Pandas UDF y Arrow

**Clave** `pandas-udf-y-arrow`

**Definición** `pandas_udf` utiliza Series de pandas o iteradores de lotes; Arrow permite transferir datos en formato columnar.

**Búsqueda** Pandas UDF y Arrow, duplicar importes por lotes, funciones personalizadas

**Para recordar** La función debe respetar la cardinalidad y los tipos declarados; requiere pandas y PyArrow.

**Nota** Instala las dependencias SQL opcionales indicadas en el anexo.

#### Duplicar importes por lotes

```python
import pandas as pd
@F.pandas_udf("long")
def twice(s: pd.Series) -> pd.Series:
    return s * 2
orders.select("order_id",twice("amount").alias("double")).orderBy("order_id").show(1)
```

**Resultado esperado** 101,1000.

### applyInPandas y mapInPandas

**Clave** `applyinpandas-y-mapinpandas`

**Definición** `applyInPandas` llama una función por grupo después de agrupar; `mapInPandas` procesa un iterador de lotes de pandas.

**Búsqueda** applyInPandas y mapInPandas, sumar por cliente con pandas, funciones personalizadas

**Para recordar** Un grupo grande puede agotar memoria; declara el esquema de salida.

**Nota** Requiere import pandas as pd y PyArrow; para este caso groupBy/agg nativo es preferible.

#### Sumar por cliente con pandas

```python
import pandas as pd
def total(pdf):
    return pd.DataFrame({"customer_id":[int(pdf.customer_id.iloc[0])],"total":[int(pdf.amount.sum())]})
orders.groupBy("customer_id").applyInPandas(total,"customer_id INT, total LONG").orderBy("customer_id").show()
```

**Resultado esperado** (1,700),(2,1000),(3,900).

### UDTF y TVF

**Clave** `udtf-y-tvf`

**Definición** Las funciones tabulares devuelven filas, no un valor escalar. Una UDTF define lógica personalizada; una TVF expone operaciones tabulares como range.

**Búsqueda** UDTF y TVF, generar filas desde una udtf, funciones personalizadas

**Para recordar** Una UDTF puede devolver cero, una o muchas filas por llamada.

**Nota** UDTF de Python disponible desde Spark 3.5; consulta compatibilidad de Arrow y Connect en la versión instalada.

#### Generar filas desde una UDTF

```python
from pyspark.sql.functions import udtf
@udtf(returnType="n INT")
class Expand:
    def eval(self, n: int):
        for i in range(n):
            yield (i,)
Expand(F.lit(3)).orderBy("n").show()
```

**Resultado esperado** 0,1,2.

### Serialización y límites de UDF

**Clave** `serializacion-y-limites-de-udf`

**Definición** Spark serializa funciones y variables para enviarlas a procesos Python; CloudPickle y Arrow intervienen según API. Las UDF normales cruzan la frontera JVM/Python.

**Búsqueda** Serialización y límites de UDF, comparar planes, funciones personalizadas

**Para recordar** No captures SparkSession dentro de una UDF ni dependas de mutaciones globales del driver.

#### Comparar planes

```python
orders.select((F.col("amount")*2).alias("double")).explain()
```

**Resultado esperado** Una expresión nativa aparece como proyección, sin etapa de evaluación de UDF Python.

### Python Data Source API

**Clave** `python-data-source-api`

**Definición** Permite registrar lectores/escritores personalizados en Python mediante DataSource, DataSourceReader y contratos de partición.

**Búsqueda** Python Data Source API, registrar una fuente mínima, funciones personalizadas

**Para recordar** Usa una fuente integrada si existe; la fuente personalizada declara esquema y forma de lectura.

**Nota** API incorporada en Spark 4.0; fuentes reales deben definir particiones, opciones y manejo de errores.

#### Registrar una fuente mínima

```python
from pyspark.sql.datasource import DataSource, DataSourceReader, InputPartition
class DemoReader(DataSourceReader):
    def partitions(self):
        return [InputPartition(0)]
    def read(self, partition):
        yield (1,)
class DemoSource(DataSource):
    @classmethod
    def name(cls):
        return "alldoc_demo"
    def schema(self):
        return "id INT"
    def reader(self, schema):
        return DemoReader()
spark.dataSource.register(DemoSource)
spark.read.format("alldoc_demo").load().show()
```

**Resultado esperado** Una fila id=1.

### mapInPandas

**Clave** `mapinpandas`

**Definición** Procesa un iterador de DataFrames de pandas por lotes y devuelve otro iterador según un esquema explícito.

**Búsqueda** mapInPandas, duplicar valores de cada lote, funciones personalizadas

**Para recordar** No presupongas que un lote contiene todas las filas de una clave.

**Nota** Requiere pandas y PyArrow.

#### Duplicar valores de cada lote

```python
import pandas as pd
def batches(iterator):
    for pdf in iterator:
        yield pdf.assign(amount=pdf.amount*2)
orders.select("order_id","amount").mapInPandas(batches,"order_id INT, amount INT").orderBy("order_id").show(1)
```

**Resultado esperado** (101,1000).

## Particiones y shuffle

**Clave** `particiones-y-shuffle`

### Definición

**Clave** `definicion`

**Definición** Una partición es una porción de datos procesable por una tarea. Shuffle redistribuye datos entre particiones, por ejemplo al agrupar o unir claves.

**Búsqueda** Particiones y shuffle, consultar particiones de un rango, particiones y shuffle

**Para recordar** Distribuir mejor datos no significa crear tantas particiones como filas.

#### Consultar particiones de un rango

```python
print(spark.range(10,numPartitions=2).rdd.getNumPartitions())
```

**Resultado esperado** 2 en Spark clásico.

### repartition, coalesce y repartitionByRange

**Clave** `repartition-coalesce-y-repartitionbyrange`

**Definición** `repartition` redistribuye normalmente mediante shuffle; `coalesce` reduce particiones sin shuffle completo; `repartitionByRange` distribuye según rangos aproximados.

**Búsqueda** repartition, coalesce y repartitionByRange, redistribuir por cliente, particiones y shuffle

**Para recordar** Coalesce no aumenta efectivamente el número de particiones y puede concentrar trabajo.

#### Redistribuir por cliente

```python
d = orders.repartition(3,"customer_id")
print(d.rdd.getNumPartitions())
```

**Resultado esperado** 3 con repartition explícito.

### Narrow y wide transformations

**Clave** `narrow-y-wide-transformations`

**Definición** Las transformaciones narrow dependen de pocas particiones de entrada, como filter; las wide necesitan redistribución, como groupBy global.

**Búsqueda** Narrow y wide transformations, comparar filtro y agregación, particiones y shuffle

**Para recordar** Shuffle implica tráfico, serialización y posible disco.

#### Comparar filtro y agregación

```python
orders.filter("amount > 100").explain()
orders.groupBy("customer_id").count().explain()
```

**Resultado esperado** El segundo plan normalmente contiene Exchange; el primero no necesita intercambio.

### IDs de particiones y filas

**Clave** `ids-de-particiones-y-filas`

**Definición** `spark_partition_id()` identifica la partición en la ejecución; `monotonically_increasing_id()` produce IDs crecientes únicos dentro de su evaluación, no consecutivos.

**Búsqueda** IDs de particiones y filas, inspeccionar distribución, particiones y shuffle

**Para recordar** No uses estos valores como clave de negocio estable entre ejecuciones.

#### Inspeccionar distribución

```python
spark.range(4,numPartitions=2).select("id",F.spark_partition_id().alias("partition")).orderBy("id").show()
```

**Resultado esperado** (0,0),(1,0),(2,1),(3,1) en el rango de dos particiones; el ID puede cambiar tras redistribuir.

### Data skew y salting

**Clave** `data-skew-y-salting`

**Definición** Skew ocurre cuando unas claves concentran muchas filas y provocan tareas más lentas. Salting reparte claves calientes y exige una agregación posterior correcta.

**Búsqueda** Data skew y salting, detectar claves desiguales, particiones y shuffle

**Para recordar** Primero mide el sesgo; AQE puede resolver parte del problema sin salting manual.

#### Detectar claves desiguales

```python
d = spark.createDataFrame([(1,)]*5+[(2,)],"key INT")
d.groupBy("key").count().orderBy(F.desc("count")).show()
```

**Resultado esperado** (1,5),(2,1); es una señal de distribución desigual, no prueba suficiente de cuello de botella.

### coalesce y repartitionByRange

**Clave** `coalesce-y-repartitionbyrange`

**Definición** Coalesce reduce particiones con poca redistribución; repartitionByRange intenta distribuir valores de orden en rangos.

**Búsqueda** coalesce y repartitionByRange, reducir particiones, particiones y shuffle

**Para recordar** Revisa tamaño de particiones y skew antes de compactar.

#### Reducir particiones

```python
d=spark.range(10,numPartitions=4).coalesce(2)
print(d.rdd.getNumPartitions())
```

**Resultado esperado** 2.

## Caché y checkpoint

**Clave** `cache-y-checkpoint`

### Definición

**Clave** `definicion`

**Definición** `cache()` y `persist()` permiten reutilizar datos calculados en memoria o disco; `unpersist()` los libera.

**Búsqueda** Caché y checkpoint, reutilizar pedidos filtrados, cache y checkpoint

**Para recordar** La caché se materializa al ejecutar una acción y consume recursos.

#### Reutilizar pedidos filtrados

```python
d = orders.where("status = 'completed'").cache()
print(d.count(),d.is_cached)
d.unpersist()
```

**Resultado esperado** 5, True; después se libera la caché.

### Storage levels

**Clave** `storage-levels`

**Definición** `persist()` permite elegir un StorageLevel; los niveles especifican memoria, disco y serialización según la API.

**Búsqueda** Storage levels, persistir en disco, cache y checkpoint

**Para recordar** No caches indiscriminadamente DataFrames utilizados una sola vez.

#### Persistir en disco

```python
from pyspark import StorageLevel
d = orders.persist(StorageLevel.DISK_ONLY)
print(d.count(),d.storageLevel.useDisk)
d.unpersist()
```

**Resultado esperado** 6, True.

### checkpoint y localCheckpoint

**Clave** `checkpoint-y-localcheckpoint`

**Definición** Checkpoint guarda un resultado para cortar el lineage; localCheckpoint usa almacenamiento local de executors y no ofrece igual tolerancia a fallos.

**Búsqueda** checkpoint y localCheckpoint, cortar un plan largo, cache y checkpoint

**Para recordar** Checkpoint no es caché ni copia de seguridad de negocio.

**Nota** En cluster usa almacenamiento accesible y fiable; este ejemplo local no cubre recuperación del driver.

#### Cortar un plan largo

```python
spark.sparkContext.setCheckpointDir(str(base / "checkpoints"))
d = orders.checkpoint(eager=True)
print(d.count())
```

**Resultado esperado** 6; se materializa un checkpoint en la ruta indicada.

## Planes y optimización

**Clave** `planes-y-optimizacion`

### Definición

**Clave** `definicion`

**Definición** Catalyst analiza y optimiza consultas estructuradas y el plan físico indica cómo ejecutarlas. Tungsten agrupa técnicas internas de ejecución eficiente, memoria y generación de código.

**Búsqueda** Planes y optimización, consultar plan extendido, planes y optimizacion

**Para recordar** Optimiza con evidencia del plan y métricas, no únicamente por intuición.

#### Consultar plan extendido

```python
orders.where("amount > 300").select("order_id").explain("extended")
```

**Resultado esperado** Se muestran planes lógico inicial, analizado, optimizado y físico; los detalles varían.

### Estrategias de JOIN y hints

**Clave** `estrategias-de-join-y-hints`

**Definición** Spark puede elegir broadcast hash join, sort-merge join o shuffled hash join. `broadcast()` y hints orientan el optimizador.

**Búsqueda** Estrategias de JOIN y hints, difundir tabla de clientes, planes y optimizacion

**Para recordar** Broadcast solo es razonable para un lado que cabe en memoria; un hint no es garantía absoluta.

#### Difundir tabla de clientes

```python
orders.join(F.broadcast(customers),"customer_id").explain()
```

**Resultado esperado** Normalmente BroadcastHashJoin para esta unión equi-join pequeña.

### Predicate pushdown y pruning

**Clave** `predicate-pushdown-y-pruning`

**Definición** Pushdown intenta aplicar filtros en la fuente; column pruning lee solo columnas necesarias; partition pruning omite particiones de archivos irrelevantes.

**Búsqueda** Predicate pushdown y pruning, inspeccionar lectura selectiva, planes y optimizacion

**Para recordar** El soporte depende de la fuente, filtros y plan.

#### Inspeccionar lectura selectiva

```python
spark.read.parquet(str(base / "orders.parquet")).where("amount > 300").select("order_id").explain("formatted")
```

**Resultado esperado** El escaneo normalmente muestra esquema de lectura reducido y filtros enviados o evaluados según la fuente.

### AQE, estadísticas y coste

**Clave** `aqe-estadisticas-y-coste`

**Definición** Adaptive Query Execution modifica decisiones físicas con estadísticas de ejecución; CBO usa estadísticas de tablas. Dynamic partition pruning puede usar resultados de un join para omitir particiones.

**Búsqueda** AQE, estadísticas y coste, consultar aqe y cbo, planes y optimizacion

**Para recordar** Mide el plan final y no asumas que el inicial será idéntico.

#### Consultar AQE y CBO

```python
print(spark.conf.get("spark.sql.adaptive.enabled"))
print(spark.conf.get("spark.sql.cbo.enabled"))
```

**Resultado esperado** true y false en el entorno configurado.

### Small files y tamaño de particiones

**Clave** `small-files-y-tamano-de-particiones`

**Definición** Muchos archivos diminutos elevan coste de metadatos y planificación; particiones muy grandes elevan memoria y duración por tarea.

**Búsqueda** Small files y tamaño de particiones, reducir archivos en datos pequeños, planes y optimizacion

**Para recordar** El número de archivos de salida no siempre coincide exactamente con particiones; evita coalesce(1) en grandes volúmenes.

#### Reducir archivos en datos pequeños

```python
p = base / "compact"
orders.coalesce(1).write.mode("overwrite").parquet(str(p))
print(len(list(p.glob("part-*.parquet"))))
```

**Resultado esperado** 1 archivo de datos en este ejemplo local pequeño.

## Recursos y observabilidad

**Clave** `recursos-y-observabilidad`

### Definición

**Clave** `definicion`

**Definición** Spark UI muestra jobs, stages, tasks, almacenamiento, SQL y executors; los logs completan el diagnóstico.

**Búsqueda** Recursos y observabilidad, consultar interfaz de ejecución, recursos y observabilidad

**Para recordar** Mide duración, shuffle, spill y distribución antes de aumentar recursos.

#### Consultar interfaz de ejecución

```python
orders.count()
print(spark.sparkContext.uiWebUrl)
```

**Resultado esperado** Una URL local si la interfaz está habilitada; abre SQL/Stages para revisar la acción.

### Memoria, cores y asignación dinámica

**Clave** `memoria-cores-y-asignacion-dinamica`

**Definición** Driver memory y executor memory controlan recursos distintos; cores determinan concurrencia de tasks; memory overhead contempla memoria externa al heap; dynamic allocation ajusta executors si el cluster lo permite.

**Búsqueda** Memoria, cores y asignación dinámica, consultar configuración de inicio, recursos y observabilidad

**Para recordar** Más memoria no arregla siempre skew o un collect gigante.

**Nota** En cluster configura recursos antes de lanzar la aplicación mediante spark-submit o plataforma.

#### Consultar configuración de inicio

```python
print(spark.sparkContext.getConf().get("spark.master"))
print(spark.sparkContext.getConf().get("spark.executor.memory","no definida"))
```

**Resultado esperado** local[2] y no definida salvo configuración externa.

### Spill, GC y OOM

**Clave** `spill-gc-y-oom`

**Definición** Spill usa disco cuando estructuras de ejecución exceden memoria disponible; garbage collection recupera objetos JVM; OOM indica memoria insuficiente en un proceso.

**Búsqueda** Spill, GC y OOM, diagnosticar una agregación lenta, recursos y observabilidad

**Para recordar** Identifica si falla driver, executor o Python worker antes de ajustar.

#### Diagnosticar una agregación lenta

Pasos: ejecutar una agregación; abrir Spark UI > Stages > etapa lenta; revisar Peak Execution Memory, Spill y GC Time.

**Resultado esperado** Se identifican métricas del stage; los datos pequeños pueden mostrar spill cero.

### Retries, speculative execution y event logs

**Clave** `retries-speculative-execution-y-event-logs`

**Definición** Spark puede reintentar tareas fallidas; la ejecución especulativa duplica tareas lentas bajo condiciones configuradas. Los event logs permiten revisar ejecuciones en History Server.

**Búsqueda** Retries, speculative execution y event logs, consultar límites de reintento, recursos y observabilidad

**Para recordar** Las tareas con efectos externos deben tolerar reintentos.

#### Consultar límites de reintento

```python
print(spark.sparkContext.getConf().get("spark.task.maxFailures","4"))
print(spark.sparkContext.getConf().get("spark.speculation","false"))
```

**Resultado esperado** 4 y false como valores de referencia si no se configuraron; el comportamiento local puede diferir.

### Observation y observe

**Clave** `observation-y-observe`

**Definición** `Observation` recoge agregados de un DataFrame batch durante una acción, sin construir una consulta separada para esas métricas.

**Búsqueda** Observation y observe, medir filas y total, recursos y observabilidad

**Para recordar** Lee las métricas después de la primera acción sobre el DataFrame observado.

#### Medir filas y total

```python
from pyspark.sql import Observation
obs = Observation("quality")
d = orders.observe(obs,F.count(F.lit(1)).alias("rows"),F.sum("amount").alias("total"))
d.count()
print(obs.get)
```

**Resultado esperado** Diccionario con rows=6 y total=2600.

### Profiling y errores

**Clave** `profiling-y-errores`

**Definición** El profiling identifica coste CPU o memoria de código Python; los errores de análisis suelen indicar columnas o tipos incorrectos.

**Búsqueda** Profiling y errores, identificar una columna inexistente, recursos y observabilidad

**Para recordar** Lee la clase de excepción, no solo el texto del stack trace.

**Nota** Para perfilar UDF en Spark 4.x, consulta spark.sql.pyspark.udf.profiler y spark.profile; no son un sustituto de Spark UI.

#### Identificar una columna inexistente

```python
from pyspark.errors import AnalysisException
try:
    orders.select("missing").show()
except AnalysisException as e:
    print(e.getCondition())
```

**Resultado esperado** UNRESOLVED_COLUMN.WITH_SUGGESTION (o clase equivalente según resolución).

## RDD y Spark Core

**Clave** `rdd-y-spark-core`

### Definición

**Clave** `definicion`

**Definición** RDD es una colección distribuida e inmutable de objetos, con dependencias que permiten reconstruir particiones perdidas.

**Búsqueda** RDD y Spark Core, crear una colección distribuida, rdd y spark core

**Para recordar** Para datos tabulares, prefiere DataFrames; RDD es útil para lógica de bajo nivel en Spark clásico.

#### Crear una colección distribuida

```python
rdd = spark.sparkContext.parallelize([1,2,3],2)
print(rdd.collect())
```

**Resultado esperado** [1,2,3].

### map, flatMap y filter

**Clave** `map-flatmap-y-filter`

**Definición** `map` transforma cada elemento en uno; `flatMap` produce cero o varios; `filter` conserva los que cumplen una condición.

**Búsqueda** map, flatMap y filter, separar etiquetas, rdd y spark core

**Para recordar** Estas funciones Python operan sobre objetos, no sobre Column.

#### Separar etiquetas

```python
rdd = spark.sparkContext.parallelize(["vip new","vip"])
print(rdd.flatMap(str.split).distinct().sortBy(lambda x:x).collect())
```

**Resultado esperado** ['new','vip'].

### reduce, reduceByKey y aggregateByKey

**Clave** `reduce-reducebykey-y-aggregatebykey`

**Definición** reduce combina elementos; reduceByKey combina valores de una clave; aggregateByKey admite acumuladores por clave de tipo distinto.

**Búsqueda** reduce, reduceByKey y aggregateByKey, sumar ventas por clave, rdd y spark core

**Para recordar** La función de combinación debe ser asociativa; reduceByKey suele mover menos datos que groupByKey.

#### Sumar ventas por clave

```python
rdd = spark.sparkContext.parallelize([(1,500),(1,200),(2,700)])
print(rdd.reduceByKey(lambda a,b:a+b).sortByKey().collect())
```

**Resultado esperado** [(1,700),(2,700)].

### groupByKey, join y sortByKey

**Clave** `groupbykey-join-y-sortbykey`

**Definición** groupByKey reúne todos los valores de cada clave; join combina pares de claves; sortByKey ordena por clave.

**Búsqueda** groupByKey, join y sortByKey, unir ventas con nombres, rdd y spark core

**Para recordar** Evita groupByKey para sumas simples; puede acumular muchos valores en memoria.

#### Unir ventas con nombres

```python
a = spark.sparkContext.parallelize([(1,500),(2,700)])
b = spark.sparkContext.parallelize([(1,"Ana"),(2,"Luis")])
print(a.join(b).sortByKey().collect())
```

**Resultado esperado** [(1,(500,'Ana')),(2,(700,'Luis'))].

### mapPartitions y foreachPartition

**Clave** `mappartitions-y-foreachpartition`

**Definición** mapPartitions recibe un iterador por partición; foreachPartition ejecuta efectos secundarios por partición.

**Búsqueda** mapPartitions y foreachPartition, contar elementos por partición, rdd y spark core

**Para recordar** Los efectos externos pueden repetirse si falla y se reintenta una tarea.

#### Contar elementos por partición

```python
rdd = spark.sparkContext.parallelize([1,2,3,4],2)
print(rdd.mapPartitions(lambda it:[sum(1 for _ in it)]).collect())
```

**Resultado esperado** [2,2].

### Acciones y lectura de RDD

**Clave** `acciones-y-lectura-de-rdd`

**Definición** `collect`, `count`, `take`, `first` y `foreach` son acciones; `textFile` construye RDD de líneas.

**Búsqueda** Acciones y lectura de RDD, leer un archivo pequeño, rdd y spark core

**Para recordar** No uses collect para archivos grandes ni foreach para devolver resultados al driver.

#### Leer un archivo pequeño

```python
rdd = spark.sparkContext.textFile(str(base / "sample.csv"))
print(rdd.take(2))
```

**Resultado esperado** ['id,amount','1,100'].

### Broadcast variables y accumulators

**Clave** `broadcast-variables-y-accumulators`

**Definición** Una variable broadcast distribuye una copia de solo lectura; un accumulator recibe contribuciones de tareas y se consulta en driver.

**Búsqueda** Broadcast variables y accumulators, aplicar un factor compartido, rdd y spark core

**Para recordar** No uses acumuladores como registro exacto de negocio ante reintentos o reevaluaciones.

#### Aplicar un factor compartido

```python
bc = spark.sparkContext.broadcast(2)
print(spark.sparkContext.parallelize([1,2,3]).map(lambda x:x*bc.value).collect())
bc.destroy()
```

**Resultado esperado** [2,4,6].

### Lineage y checkpoint de RDD

**Clave** `lineage-y-checkpoint-de-rdd`

**Definición** El lineage registra transformaciones para reconstruir particiones; checkpoint puede truncar ese historial en almacenamiento fiable.

**Búsqueda** Lineage y checkpoint de RDD, consultar dependencias, rdd y spark core

**Para recordar** Llama una acción después de marcar el checkpoint para materializarlo.

#### Consultar dependencias

```python
rdd = spark.sparkContext.parallelize([1,2,3]).map(lambda x:x*2)
print(rdd.toDebugString())
```

**Resultado esperado** Una representación de las dependencias del RDD, con nombres e IDs que varían.

### Accumulators

**Clave** `accumulators`

**Definición** Los accumulators permiten acumular métricas desde tareas y leerlas en el driver. Las contribuciones pueden verse afectadas por cómo se reejecuta la lógica.

**Búsqueda** Accumulators, contar elementos en una acción pequeña, rdd y spark core

**Para recordar** No uses acumuladores para conteos críticos; agrega el dataset directamente.

#### Contar elementos en una acción pequeña

```python
acc=spark.sparkContext.accumulator(0)
spark.sparkContext.parallelize([1,2,3]).foreach(lambda x:acc.add(1))
print(acc.value)
```

**Resultado esperado** 3 en una ejecución local sin fallos.

## ETL y modelado

**Clave** `etl-y-modelado`

### Definición

**Clave** `definicion`

**Definición** ETL extrae, transforma y carga datos; ELT carga primero y transforma en el sistema destino. Spark permite construir ambos flujos.

**Búsqueda** ETL y modelado, preparar un resumen de ventas, etl y modelado

**Para recordar** Separa entrada, reglas de limpieza y salida reproducible.

#### Preparar un resumen de ventas

```python
raw = spark.read.parquet(str(base / "orders.parquet"))
clean = raw.where("amount > 0 AND status = 'completed'")
clean.groupBy("customer_id").agg(F.sum("amount").alias("total")).orderBy("customer_id").show()
```

**Resultado esperado** (1,700),(2,700),(3,900).

### Cargas incrementales e idempotencia

**Clave** `cargas-incrementales-e-idempotencia`

**Definición** Una carga incremental procesa registros nuevos o modificados; una carga idempotente puede repetirse sin duplicar resultados.

**Búsqueda** Cargas incrementales e idempotencia, seleccionar pedidos desde una fecha de corte, etl y modelado

**Para recordar** Un watermark de extracción no sustituye reglas para cambios tardíos y eliminaciones.

#### Seleccionar pedidos desde una fecha de corte

```python
orders.where(F.col("order_date") >= F.lit("2026-09-01")).select("order_id").orderBy("order_id").show()
```

**Resultado esperado** 104,105,106. Reprocesar el intervalo requiere reemplazarlo o hacer upsert, no append ciego.

### Hechos, dimensiones y esquema estrella

**Clave** `hechos-dimensiones-y-esquema-estrella`

**Definición** La tabla de hechos guarda eventos a una granularidad; las dimensiones añaden atributos descriptivos. SCD tipo 1 reemplaza atributos; tipo 2 conserva versiones con vigencia.

**Búsqueda** Hechos, dimensiones y esquema estrella, enriquecer hechos con dimensión, etl y modelado

**Para recordar** Declara qué representa cada fila antes de calcular métricas.

#### Enriquecer hechos con dimensión

```python
orders.join(customers,"customer_id").select("order_id","country","amount").orderBy("order_id").show(2)
```

**Resultado esperado** (101,MX,500),(102,MX,200).

### Bronze, Silver y Gold

**Clave** `bronze-silver-y-gold`

**Definición** Bronze conserva datos crudos; Silver los limpia y valida; Gold publica métricas y entidades de consumo. Son convenciones arquitectónicas, no clases de PySpark.

**Búsqueda** Bronze, Silver y Gold, crear tres capas en rutas locales, etl y modelado

**Para recordar** Las capas deben tener contratos y controles de calidad.

#### Crear tres capas en rutas locales

```python
bronze = spark.read.parquet(str(base / "orders.parquet"))
silver = bronze.where("amount > 0")
gold = silver.where("status = 'completed'").groupBy("customer_id").agg(F.sum("amount").alias("total"))
gold.write.mode("overwrite").parquet(str(base / "gold"))
```

**Resultado esperado** Una salida Gold con 3 clientes y 2300 de ventas totales.

### Data Lake, Warehouse y Lakehouse

**Clave** `data-lake-warehouse-y-lakehouse`

**Definición** Un lake almacena datos en archivos; un warehouse ofrece datos gestionados para consulta; un lakehouse combina almacenamiento de lake con capacidades de tablas gestionadas. Delta Lake, Iceberg y Hudi son formatos o capas de tablas externas a Spark Core.

**Búsqueda** Data Lake, Warehouse y Lakehouse, inspeccionar capacidades de una tabla, etl y modelado

**Para recordar** Parquet por sí solo no aporta transacciones de tabla ni MERGE.

**Nota** Requiere instalar y configurar el proveedor; no hay un comando universal para los tres.

#### Inspeccionar capacidades de una tabla

Pasos: elegir un proveedor de tabla compatible; registrar un catálogo de prueba; escribir una tabla; consultar su historial, esquema y operaciones soportadas según documentación del proveedor.

**Resultado esperado** Se obtiene una tabla gestionada con las capacidades ofrecidas por el proveedor, no por todo DataFrame genérico.

### Cohortes, retención y métricas temporales

**Clave** `cohortes-retencion-y-metricas-temporales`

**Definición** Una cohorte agrupa entidades por fecha de inicio; retención mide actividad posterior. Funnels miden avance entre eventos definidos.

**Búsqueda** Cohortes, retención y métricas temporales, identificar mes de primera compra, etl y modelado

**Para recordar** Define población, periodo y denominador antes de escribir código.

#### Identificar mes de primera compra

```python
orders.where("status = 'completed'").groupBy("customer_id").agg(F.trunc(F.min("order_date"),"month").alias("cohort")).orderBy("customer_id").show()
```

**Resultado esperado** (1,2026-08-01),(2,2026-08-01),(3,2026-09-01).

## Testing y depuración

**Clave** `testing-y-depuracion`

### Definición

**Clave** `definicion`

**Definición** Las pruebas de DataFrames comparan datos y esquema usando conjuntos pequeños con resultados conocidos. Las pruebas de integración comprueban fuentes y destinos reales de prueba.

**Búsqueda** Testing y depuración, comprobar una agregación, testing y depuracion

**Para recordar** Prueba también nulos, empates, duplicados y entradas vacías.

#### Comprobar una agregación

```python
from pyspark.testing.utils import assertDataFrameEqual
actual = orders.groupBy("customer_id").agg(F.sum("amount").alias("total"))
expected = spark.createDataFrame([(1,700),(2,1000),(3,900)],"customer_id INT, total LONG")
assertDataFrameEqual(actual,expected)
```

**Resultado esperado** La aserción termina sin error; no exige orden de filas por defecto.

### assertSchemaEqual

**Clave** `assertschemaequal`

**Definición** Compara la estructura del esquema; algunas opciones permiten ignorar nulabilidad, nombres u orden según la versión.

**Búsqueda** assertSchemaEqual, comprobar tipos seleccionados, testing y depuracion

**Para recordar** Una prueba de esquema no comprueba valores.

#### Comprobar tipos seleccionados

```python
from pyspark.testing.utils import assertSchemaEqual
expected = spark.createDataFrame([],"order_id INT, amount INT")
assertSchemaEqual(orders.select("order_id","amount").schema,expected.schema)
```

**Resultado esperado** La comparación termina sin error.

### Reglas de negocio y regresión

**Clave** `reglas-de-negocio-y-regresion`

**Definición** Una prueba de regresión protege comportamientos acordados frente a cambios; una validación de datos comprueba condiciones sobre una ejecución.

**Búsqueda** Reglas de negocio y regresión, verificar no duplicación de claves, testing y depuracion

**Para recordar** Separa una condición válida de una expectativa accidental del dataset.

#### Verificar no duplicación de claves

```python
assert orders.count() == orders.select("order_id").distinct().count()
assert orders.filter(F.col("customer_id").isNull()).count() == 0
```

**Resultado esperado** Ambas aserciones pasan para los datos preparados.

### Excepciones y compatibilidad

**Clave** `excepciones-y-compatibilidad`

**Definición** PySparkException agrupa errores de PySpark; AnalysisException indica problemas de análisis, PythonException fallos de código Python remoto y StreamingQueryException fallos de streaming.

**Búsqueda** Excepciones y compatibilidad, consultar versiones, testing y depuracion

**Para recordar** Comprueba versión y clase de error antes de aplicar una solución de otra versión.

#### Consultar versiones

```python
import sys, pyspark
print(sys.version.split()[0],pyspark.__version__,spark.version)
```

**Resultado esperado** Versiones instaladas de Python, cliente PySpark y servidor Spark; en la instalación local de referencia Spark y PySpark son 4.1.0.

## Despliegue y ecosistema

**Clave** `despliegue-y-ecosistema`

### Definición

**Clave** `definicion`

**Definición** Spark puede ejecutarse localmente o en clusters gestionados por Standalone, YARN o Kubernetes. Plataformas como Databricks, EMR, Glue, Dataproc, Synapse y Fabric proporcionan entornos gestionados con restricciones propias.

**Búsqueda** Despliegue y ecosistema, comprobar dónde corre la aplicación, despliegue y ecosistema

**Para recordar** La API puede ser común; configuración, almacenamiento y versiones no siempre lo son.

#### Comprobar dónde corre la aplicación

```python
print(spark.sparkContext.master)
```

**Resultado esperado** local[2]; en un cluster aparecería el master configurado.

### spark-submit y dependencias

**Clave** `spark-submit-y-dependencias`

**Definición** spark-submit lanza aplicaciones y configura master, recursos, paquetes JVM y archivos Python. En modo cluster el driver se ejecuta en infraestructura del cluster según el gestor.

**Búsqueda** spark-submit y dependencias, lanzar un script de prueba, despliegue y ecosistema

**Para recordar** Las dependencias Python deben estar disponibles también para los workers.

**Nota** Crea job.py con: from pyspark.sql import SparkSession; s=SparkSession.builder.getOrCreate(); print(s.range(3).count()); s.stop(). Resultado: 3. Ejecutar en terminal, no en Python.

#### Lanzar un script de prueba

```bash
spark-submit --master "local[2]" job.py
```

**Resultado esperado** El script imprime el resultado definido en job.py y finaliza.

### Almacenamiento distribuido

**Clave** `almacenamiento-distribuido`

**Definición** HDFS, S3, ADLS y GCS requieren conectores, credenciales y URIs adecuados. El catálogo y Hive Metastore gestionan metadatos, no necesariamente los datos físicos.

**Búsqueda** Almacenamiento distribuido, consultar archivo en almacenamiento remoto, despliegue y ecosistema

**Para recordar** Una ruta local del driver puede no existir en workers remotos.

**Nota** Ejemplo externo: define remote_path con URI real (hdfs://, s3a://, abfss:// o gs://), configura el conector y la identidad autorizada.

#### Consultar archivo en almacenamiento remoto

```python
df = spark.read.parquet(remote_path)
df.printSchema()
```

**Resultado esperado** El esquema del dataset remoto si existe y se tienen permisos.

### Orquestación y seguridad

**Clave** `orquestacion-y-seguridad`

**Definición** Airflow u otro orquestador programa dependencias, reintentos y monitoreo; Spark ejecuta transformaciones. Autenticación y permisos controlan acceso a recursos.

**Búsqueda** Orquestación y seguridad, diseñar una ejecución diaria, despliegue y ecosistema

**Para recordar** No guardes contraseñas en notebooks ni argumentos visibles de logs.

**Nota** Airflow, catálogos externos y servicios cloud requieren instalación y permisos propios.

#### Diseñar una ejecución diaria

Pasos: crear una tarea spark-submit con fecha de proceso; asignar identidad con mínimo privilegio; guardar salida por fecha; comprobar recuentos; configurar reintentos y alertas.

**Resultado esperado** Un DAG externo ejecuta y monitorea el job; repetir la fecha no duplica datos si el job es idempotente.

## Structured Streaming

**Clave** `structured-streaming`

### Definición

**Clave** `definicion`

**Definición** Structured Streaming procesa continuamente fuentes no acotadas utilizando operaciones DataFrame incrementales y un motor que normalmente ejecuta micro-batches.

**Búsqueda** Structured Streaming, crear un flujo de prueba, structured streaming

**Para recordar** Una consulta de streaming se inicia con writeStream.start(), no con show().

#### Crear un flujo de prueba

```python
stream = spark.readStream.format("rate").option("rowsPerSecond",2).load()
print(stream.isStreaming)
stream.printSchema()
```

**Resultado esperado** True; timestamp timestamp y value long. No se ha iniciado la consulta.

### readStream, writeStream y triggers

**Clave** `readstream-writestream-y-triggers`

**Definición** readStream declara fuente; writeStream configura destino, modo y trigger. availableNow procesa datos disponibles y termina si la fuente lo admite.

**Búsqueda** readStream, writeStream y triggers, procesar un archivo de entrada disponible, structured streaming

**Para recordar** Cada consulta persistente requiere su propio checkpoint; detén consultas de prueba.

**Nota** Usa una sesión limpia o un queryName nuevo si repites el ejemplo; el sink memory es solo para demostraciones.

#### Procesar un archivo de entrada disponible

```python
stream = spark.readStream.schema("id INT, amount INT").json(str(base / "events"))
q = stream.writeStream.format("memory").queryName("stream_demo").outputMode("append").trigger(availableNow=True).start()
q.awaitTermination()
spark.table("stream_demo").orderBy("id").show()
```

**Resultado esperado** (1,100),(2,200) en memoria tras finalizar.

### Modos de salida

**Clave** `modos-de-salida`

**Definición** append publica filas nuevas finalizadas; update publica filas modificadas; complete publica toda la tabla de resultados. No todas las combinaciones de operación y sink son compatibles.

**Búsqueda** Modos de salida, publicar un total acumulado, structured streaming

**Para recordar** Elige modo según la semántica del destino y el estado de la consulta.

**Nota** Usa una sesión limpia o un nombre nuevo; no es un destino de producción.

#### Publicar un total acumulado

```python
stream = spark.readStream.schema("id INT, amount INT").json(str(base / "events"))
q = stream.agg(F.sum("amount").alias("total")).writeStream.format("memory").queryName("stream_total").outputMode("complete").trigger(availableNow=True).start()
q.awaitTermination()
spark.table("stream_total").show()
```

**Resultado esperado** total=300.

### Fuentes y sinks: Kafka y archivos

**Clave** `fuentes-y-sinks-kafka-y-archivos`

**Definición** Kafka proporciona mensajes con key, value y metadatos; los archivos permiten lectura incremental con esquema fijo. Los sinks escriben archivos, Kafka u otros destinos compatibles.

**Búsqueda** Fuentes y sinks: Kafka y archivos, leer valores de kafka como texto, structured streaming

**Para recordar** Kafka requiere conector, brokers y gestión de offsets; value suele ser binario.

**Nota** Ejemplo externo: define brokers y topic de prueba e instala spark-sql-kafka para la versión Spark/Scala correspondiente.

#### Leer valores de Kafka como texto

```python
stream = spark.readStream.format("kafka").option("kafka.bootstrap.servers",brokers).option("subscribe",topic).load()
stream.selectExpr("CAST(value AS STRING) AS message").printSchema()
```

**Resultado esperado** message string; las filas dependen de los mensajes al iniciar la consulta.

### Event time y processing time

**Clave** `event-time-y-processing-time`

**Definición** Event time es cuándo sucedió el evento; processing time es cuándo Spark lo procesa. Las ventanas temporales suelen basarse en event time.

**Búsqueda** Event time y processing time, crear una ventana por evento, structured streaming

**Para recordar** No confundas timestamp de ingestión con el de ocurrencia.

#### Crear una ventana por evento

```python
s = spark.readStream.format("rate").load()
s.groupBy(F.window("timestamp","1 minute")).count().printSchema()
```

**Resultado esperado** Columnas window (struct start/end) y count long; todavía no hay ejecución.

### Ventanas tumbling, sliding y session

**Clave** `ventanas-tumbling-sliding-y-session`

**Definición** Tumbling usa intervalos fijos sin solapamiento; sliding permite solapamiento; session agrupa eventos separados por menos de un intervalo de inactividad.

**Búsqueda** Ventanas tumbling, sliding y session, definir ventanas deslizantes, structured streaming

**Para recordar** Un evento puede contar en varias ventanas sliding; no sumes indiscriminadamente sus resultados.

#### Definir ventanas deslizantes

```python
s = spark.readStream.format("rate").load()
s.groupBy(F.window("timestamp","10 minutes","5 minutes")).count().printSchema()
```

**Resultado esperado** window con start/end y count. Un evento pertenece a dos ventanas de 10 minutos que comienzan cada 5 minutos.

### Watermarks y datos tardíos

**Clave** `watermarks-y-datos-tardios`

**Definición** `withWatermark` establece un umbral basado en el tiempo de evento observado para acotar estado y permitir finalizar ciertas agregaciones.

**Búsqueda** Watermarks y datos tardíos, definir tolerancia y agregación, structured streaming

**Para recordar** No es una promesa de aceptar todos los eventos más tardíos que el umbral; depende de operación y progreso.

#### Definir tolerancia y agregación

```python
s = spark.readStream.format("rate").load()
s.withWatermark("timestamp","10 minutes").groupBy(F.window("timestamp","5 minutes")).count().printSchema()
```

**Resultado esperado** Esquema de ventanas y conteos; al ejecutar, Spark podrá liberar estado de ventanas finalizadas según watermark.

### Deduplicación con watermark

**Clave** `deduplicacion-con-watermark`

**Definición** `dropDuplicatesWithinWatermark()` elimina duplicados por claves dentro del horizonte de watermark; el estado no crece indefinidamente para eventos antiguos.

**Búsqueda** Deduplicación con watermark, deduplicar identificadores de eventos, structured streaming

**Para recordar** La deduplicación ilimitada en streaming puede acumular mucho estado.

**Nota** Disponible desde Spark 3.5. La fuente rate ya genera valores únicos; úsala para observar estructura, no para simular duplicados.

#### Deduplicar identificadores de eventos

```python
s = spark.readStream.format("rate").load()
d = s.withWatermark("timestamp","10 minutes").dropDuplicatesWithinWatermark(["value"])
print(d.isStreaming)
```

**Resultado esperado** True; se construye un flujo deduplicado por value.

### Session windows

**Clave** `session-windows`

**Definición** `session_window` crea grupos de eventos por intervalos de inactividad, con una duración de separación fija o derivada de una expresión.

**Búsqueda** Session windows, definir sesión de actividad, structured streaming

**Para recordar** Una sesión puede crecer al recibir nuevos eventos; la finalización depende de watermark y modo de salida.

#### Definir sesión de actividad

```python
s=spark.readStream.format("rate").load().withColumn("customer_id",F.col("value")%2)
s.groupBy("customer_id",F.session_window("timestamp","5 minutes")).count().printSchema()
```

**Resultado esperado** customer_id, session_window (start/end) y count.

## Estado y operación de streaming

**Clave** `estado-y-operacion-streaming`

### Definición

**Clave** `definicion`

**Definición** Las operaciones con estado mantienen información entre micro-batches; el checkpoint conserva progreso y estado necesario para recuperación según la consulta.

**Búsqueda** Estado y operación de streaming, persistir una salida de streaming, estado y operacion streaming

**Para recordar** No reutilices checkpoints entre consultas incompatibles.

#### Persistir una salida de streaming

```python
s = spark.readStream.schema("id INT, amount INT").json(str(base / "events"))
q = s.writeStream.format("parquet").option("path",str(base / "stream_out")).option("checkpointLocation",str(base / "stream_cp")).trigger(availableNow=True).start()
q.awaitTermination()
print(spark.read.parquet(str(base / "stream_out")).count())
```

**Resultado esperado** 2 filas; reiniciar con el mismo checkpoint y sin nuevos archivos no debería añadir registros.

### Stream-static y stream-stream joins

**Clave** `stream-static-y-stream-stream-joins`

**Definición** Una unión stream-static enriquece eventos con una tabla fija. Una stream-stream requiere mantener estado y, para acotarlo según el tipo de join, condiciones temporales y watermarks.

**Búsqueda** Stream-static y stream-stream joins, enriquecer un flujo con clientes, estado y operacion streaming

**Para recordar** El soporte de outer joins y modos de salida depende de la operación.

#### Enriquecer un flujo con clientes

```python
s = spark.readStream.format("rate").load().select((F.col("value")%5+1).cast("int").alias("customer_id"))
s.join(customers,"customer_id","inner").printSchema()
```

**Resultado esperado** customer_id, name, country y signup_date; los eventos reciben atributos al ejecutar la consulta.

### foreachBatch e idempotencia

**Clave** `foreachbatch-e-idempotencia`

**Definición** foreachBatch ejecuta una función por micro-batch con un DataFrame batch y batch_id. Permite destinos personalizados, incluyendo upsert.

**Búsqueda** foreachBatch e idempotencia, guardar cada lote en ruta propia, estado y operacion streaming

**Para recordar** Por defecto la escritura personalizada puede repetirse; deduplica por batch_id o por clave según el destino.

**Nota** Las garantías exactly-once dependen de fuente, checkpoint y sink; foreachBatch ofrece al menos una ejecución y exige diseñar idempotencia.

#### Guardar cada lote en ruta propia

```python
def write_batch(df,batch_id):
    df.write.mode("overwrite").parquet(str(base / "batches" / str(batch_id)))
s = spark.readStream.schema("id INT, amount INT").json(str(base / "events"))
q = s.writeStream.foreachBatch(write_batch).option("checkpointLocation",str(base / "batch_cp")).trigger(availableNow=True).start()
q.awaitTermination()
```

**Resultado esperado** Se escriben los dos eventos en uno o más directorios de lote; reintentar el mismo lote reemplaza su ruta en lugar de duplicarla.

### Control y monitoreo

**Clave** `control-y-monitoreo`

**Definición** StreamingQuery expone isActive, lastProgress, recentProgress, status, awaitTermination, processAllAvailable y stop; StreamingQueryListener recibe eventos.

**Búsqueda** Control y monitoreo, consultar progreso de una consulta terminada, estado y operacion streaming

**Para recordar** processAllAvailable es útil en pruebas con entradas finitas, no como espera indefinida de fuentes activas.

**Nota** Usa un nombre nuevo si se repite en la misma sesión.

#### Consultar progreso de una consulta terminada

```python
s = spark.readStream.schema("id INT, amount INT").json(str(base / "events"))
q = s.writeStream.format("memory").queryName("progress_demo").trigger(availableNow=True).start()
q.awaitTermination()
print(q.isActive)
print(q.lastProgress is not None)
```

**Resultado esperado** False, True si se procesó un lote y se generó progreso.

### State stores y estado personalizado

**Clave** `state-stores-y-estado-personalizado`

**Definición** State stores mantienen datos por clave. `StatefulProcessor` con `transformWithStateInPandas()` implementa lógica de estado personalizada con ciclo de vida, temporizadores y estado tipado.

**Búsqueda** State stores y estado personalizado, diseñar un contador persistente por clave, estado y operacion streaming

**Para recordar** En Spark 4.x, usa la API de estado compatible con tu versión; requiere pandas/PyArrow para la variante pandas.

**Nota** Ejemplo conceptual: la implementación completa y la firma están en la referencia oficial de transformWithStateInPandas; no es un snippet ejecutable por sí solo.

#### Diseñar un contador persistente por clave

Pasos: definir una clase StatefulProcessor con init, handleInputRows y close; registrar un ValueState por cliente; sumar filas recibidas y emitir el total; llamar grouped.transformWithStateInPandas con esquema de salida, modo de salida y modo de tiempo; iniciar con checkpoint exclusivo.

**Resultado esperado** Si el cliente 1 recibe dos eventos en el primer lote y uno en el siguiente, el contador persistente debe avanzar de 2 a 3, incluso tras una recuperación compatible.

## Pandas y pandas API on Spark

**Clave** `pandas-y-pandas-api-on-spark`

### Definición

**Clave** `definicion`

**Definición** `toPandas()` materializa datos en pandas local; pandas API on Spark ofrece una interfaz similar a pandas sobre ejecución distribuida.

**Búsqueda** Pandas y pandas API on Spark, convertir una muestra, pandas y pandas api on spark

**Para recordar** No son equivalentes: pandas local debe caber en memoria del driver.

**Nota** Requiere pandas; Arrow es opcional para esta conversión pero útil si está configurado.

#### Convertir una muestra

```python
pdf = orders.orderBy("order_id").limit(2).select("order_id","amount").toPandas()
print(pdf.to_dict("records"))
```

**Resultado esperado** [{'order_id':101,'amount':500},{'order_id':102,'amount':200}].

### DataFrame, Series e Index

**Clave** `dataframe-series-e-index`

**Definición** La API pandas on Spark usa DataFrame, Series e Index (incluido MultiIndex), con semántica de alineación de índices. `pandas_api()` y `to_spark()` convierten entre APIs.

**Búsqueda** DataFrame, Series e Index, convertir y seleccionar, pandas y pandas api on spark

**Para recordar** Un índice distribuido puede requerir operaciones costosas; no presupongas orden natural.

**Nota** Requiere pyspark[pandas_on_spark]. Si la sesión usa ANSI, configura temporalmente spark.sql.ansi.enabled=false o compute.fail_on_ansi_mode=false según la documentación; restaura la configuración después.

#### Convertir y seleccionar

```python
old = spark.conf.get("spark.sql.ansi.enabled")
spark.conf.set("spark.sql.ansi.enabled","false")
try:
    psdf = orders.select("order_id","amount").pandas_api(index_col="order_id")
    print(psdf.loc[101,"amount"])
finally:
    spark.conf.set("spark.sql.ansi.enabled",old)
```

**Resultado esperado** 500.

### Filtros, groupby y remodelación

**Clave** `filtros-groupby-y-remodelacion`

**Definición** La API ofrece selección, asignación, groupby/agg, transform, pivot, melt, stack y unstack. Algunos comportamientos no son idénticos a pandas local.

**Búsqueda** Filtros, groupby y remodelación, agrupar con sintaxis pandas, pandas y pandas api on spark

**Para recordar** Las operaciones con alineación entre DataFrames pueden generar joins o requerir opciones adicionales.

**Nota** Requiere pandas API on Spark; to_pandas solo en resultados pequeños.

#### Agrupar con sintaxis pandas

```python
old = spark.conf.get("spark.sql.ansi.enabled")
spark.conf.set("spark.sql.ansi.enabled","false")
try:
    psdf = orders.select("customer_id","amount").pandas_api()
    print(psdf.groupby("customer_id")["amount"].sum().sort_index().to_pandas())
finally:
    spark.conf.set("spark.sql.ansi.enabled",old)
```

**Resultado esperado** Serie local con cliente 1=700, 2=1000, 3=900.

### Series temporales y rendimiento

**Clave** `series-temporales-y-rendimiento`

**Definición** resample, rolling y expanding permiten calcular por frecuencia o ventana; el coste depende del índice y del plan de Spark. get_option y set_option consultan o ajustan opciones.

**Búsqueda** Series temporales y rendimiento, consultar configuración de índice, pandas y pandas api on spark

**Para recordar** Ordenar globalmente o utilizar un índice secuencial puede provocar shuffle; evita recolectar datos grandes.

**Nota** Requiere dependencias de pandas API on Spark y configuración ANSI compatible.

#### Consultar configuración de índice

```python
import pyspark.pandas as ps
print(ps.get_option("compute.default_index_type"))
```

**Resultado esperado** El tipo de índice predeterminado de la versión/configuración; normalmente distributed-sequence.

## Spark Connect

**Clave** `spark-connect`

### Definición

**Clave** `definicion`

**Definición** Spark Connect separa cliente Python y servidor Spark mediante un protocolo remoto basado en gRPC y Protocol Buffers. El servidor ejecuta los planes de DataFrame.

**Búsqueda** Spark Connect, conectar con un servidor de prueba, spark connect

**Para recordar** No requiere acceder directamente a la JVM del servidor ni expone RDD/SparkContext como Spark clásico.

**Nota** Ejemplo externo: iniciar un servidor Spark Connect compatible, instalar dependencias cliente y ejecutar en un proceso separado sin la sesión clásica preparada.

#### Conectar con un servidor de prueba

```python
from pyspark.sql import SparkSession
remote_spark = SparkSession.builder.remote("sc://localhost:15002").getOrCreate()
remote_spark.range(3).show()
```

**Resultado esperado** id=0,1,2 si el servidor está activo.

### Sesiones y compatibilidad

**Clave** `sesiones-y-compatibilidad`

**Definición** El servidor mantiene sesiones lógicas y catálogos; el cliente envía planes. La disponibilidad de métodos depende de las versiones del cliente y del servidor.

**Búsqueda** Sesiones y compatibilidad, consultar versión remota, spark connect

**Para recordar** Comprueba compatibilidad antes de trasladar código que usa SparkContext o internals JVM.

**Nota** Ejecutar tras la ficha de conexión, no sobre la sesión local spark.

#### Consultar versión remota

```python
print(remote_spark.version)
remote_spark.stop()
```

**Resultado esperado** La versión del servidor y cierre de la sesión del cliente.

## Pipelines declarativos

**Clave** `pipelines-declarativos`

### Definición

**Clave** `definicion`

**Definición** Spark Declarative Pipelines (SDP) define datasets y dependencias como funciones, delegando al motor la planificación del flujo batch/streaming. En Apache Spark se incorpora en 4.1.

**Búsqueda** Pipelines declarativos, definir una vista materializada, pipelines declarativos

**Para recordar** Una función declarativa devuelve un DataFrame; no debe ejecutar acciones ni escrituras manuales.

**Nota** Ejemplo de módulo de pipeline, no notebook aislado; requiere proyecto SDP y tabla persistente orders_input con los datos compartidos. El entorno SDP proporciona spark.

#### Definir una vista materializada

```python
from pyspark import pipelines as dp
from pyspark.sql import functions as F
@dp.materialized_view
def customer_totals():
    return spark.read.table("orders_input").groupBy("customer_id").agg(F.sum("amount").alias("total"))
```

**Resultado esperado** Al ejecutar el pipeline, se publica customer_totals con una fila por cliente. Para los orders compartidos: 700,1000,900.

### Streaming tables, temporary views y flows

**Clave** `streaming-tables-temporary-views-y-flows`

**Definición** Una streaming table recibe flujos incrementales; una materialized view deriva de una consulta batch; una temporary_view organiza cálculos internos. Un flow define escritura hacia un destino.

**Búsqueda** Streaming tables, temporary views y flows, definir una tabla incremental, pipelines declarativos

**Para recordar** No confundas las APIs de Apache Spark con extensiones específicas de Databricks.

**Nota** En un proyecto SDP define events_path con la ruta accesible a los datos de prueba; no llamar start() en la función.

#### Definir una tabla incremental

```python
from pyspark import pipelines as dp
@dp.table
def incoming_orders():
    return spark.readStream.schema("id INT, amount INT").json(events_path)
```

**Resultado esperado** El pipeline ingiere los registros nuevos del directorio events_path, si el origen está configurado.

### CLI y validación

**Clave** `cli-y-validacion`

**Definición** `spark-pipelines init`, `run` y `dry-run` inicializan, ejecutan o validan un proyecto SDP. La configuración fija código, catálogo y destinos.

**Búsqueda** CLI y validación, validar un proyecto, pipelines declarativos

**Para recordar** Primero valida en un catálogo aislado; la ejecución crea o actualiza datasets.

**Nota** Terminal: ejecutar desde un proyecto creado con spark-pipelines init y configurado según la guía oficial de Spark 4.1.

#### Validar un proyecto

```bash
spark-pipelines dry-run
```

**Resultado esperado** Se valida el grafo/configuración del proyecto sin materializar sus resultados.

### Vista temporal y dependencias

**Clave** `vista-temporal-y-dependencias`

**Definición** Una temporary_view declara una consulta intermedia que puede reutilizarse en otros datasets del pipeline; no se publica como tabla persistente.

**Búsqueda** Vista temporal y dependencias, declarar limpieza intermedia, pipelines declarativos

**Para recordar** El motor infiere dependencias por referencias a datasets.

**Nota** Mismo proyecto SDP y tabla de entrada que en la ficha de definición.

#### Declarar limpieza intermedia

```python
from pyspark import pipelines as dp
@dp.temporary_view
def clean_orders():
    return spark.read.table("orders_input").where("amount > 0")
```

**Resultado esperado** El grafo incluye clean_orders con 6 filas para los datos compartidos; puede ser consumido por otros nodos del pipeline.

## MLlib: preparación y pipelines

**Clave** `mllib-preparacion`

### Definición

**Clave** `definicion`

**Definición** MLlib ofrece aprendizaje automático distribuido; la API principal utiliza DataFrames (`pyspark.ml`). Un Transformer transforma filas y un Estimator aprende un modelo con fit.

**Búsqueda** MLlib: preparación y pipelines, crear vector de características, mllib preparacion

**Para recordar** Un modelo entrenado es un Transformer; no ajustes datos de prueba.

#### Crear vector de características

```python
from pyspark.ml.feature import VectorAssembler
va = VectorAssembler(inputCols=["x"],outputCol="features")
va.transform(ml_data).select("x","features").orderBy("x").show(2)
```

**Resultado esperado** (1.0,[1.0]),(2.0,[2.0]).

### StringIndexer y OneHotEncoder

**Clave** `stringindexer-y-onehotencoder`

**Definición** StringIndexer convierte categorías en índices; OneHotEncoder crea vectores de indicadores. Ajusta ambos con entrenamiento y define tratamiento de categorías desconocidas.

**Búsqueda** StringIndexer y OneHotEncoder, codificar país, mllib preparacion

**Para recordar** No interpretes los índices de categorías como cantidades ordinales.

#### Codificar país

```python
from pyspark.ml.feature import StringIndexer, OneHotEncoder
d = spark.createDataFrame([("MX",),("MX",),("ES",)],"country STRING")
i = StringIndexer(inputCol="country",outputCol="index").fit(d).transform(d)
OneHotEncoder(inputCols=["index"],outputCols=["encoded"]).fit(i).transform(i).distinct().orderBy("index").show()
```

**Resultado esperado** MX index=0, vector [1.0]; ES index=1, vector [0.0] con dropLast=True.

### Escalamiento

**Clave** `escalamiento`

**Definición** StandardScaler centra opcionalmente y escala por desviación estándar; MinMaxScaler lleva características a un intervalo (por defecto 0–1).

**Búsqueda** Escalamiento, escalar valores de 1 a 6, mllib preparacion

**Para recordar** Ajusta el scaler solo con entrenamiento y reutilízalo en validación y prueba.

#### Escalar valores de 1 a 6

```python
from pyspark.ml.feature import VectorAssembler, MinMaxScaler
d = VectorAssembler(inputCols=["x"],outputCol="features").transform(ml_data)
MinMaxScaler(inputCol="features",outputCol="scaled").fit(d).transform(d).select("x","scaled").orderBy("x").show(2)
```

**Resultado esperado** 1.0→[0.0], 2.0→[0.2].

### Pipeline, Estimator y Transformer

**Clave** `pipeline-estimator-y-transformer`

**Definición** Pipeline encadena etapas de preparación y entrenamiento; `fit()` ajusta estimadores y `transform()` aplica el PipelineModel resultante.

**Búsqueda** Pipeline, Estimator y Transformer, entrenar una regresión sencilla, mllib preparacion

**Para recordar** Guarda y aplica la misma preparación que utilizaste en entrenamiento.

#### Entrenar una regresión sencilla

```python
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
p = Pipeline(stages=[VectorAssembler(inputCols=["x"],outputCol="features"),LinearRegression(labelCol="target")])
model = p.fit(ml_data)
model.transform(ml_data).select("x","prediction").orderBy("x").show(2)
```

**Resultado esperado** Predicciones aproximadamente 2.0 y 4.0 para x=1 y 2. Es una demostración de ajuste, no evaluación fuera de muestra.

## MLlib: modelos y evaluación

**Clave** `mllib-modelos`

### Definición

**Clave** `definicion`

**Definición** Spark ML incluye algoritmos de regresión, clasificación y clustering. La elección depende del objetivo y de los datos, no de una función universal.

**Búsqueda** MLlib: modelos y evaluación, ajustar regresión lineal, mllib modelos

**Para recordar** Regresión predice números; clasificación predice clases; clustering agrupa sin etiqueta.

#### Ajustar regresión lineal

```python
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
d = VectorAssembler(inputCols=["x"],outputCol="features").transform(ml_data)
m = LinearRegression(labelCol="target").fit(d)
print(m.coefficients,m.intercept)
```

**Resultado esperado** Coeficiente aproximadamente 2 e intercepto aproximadamente 0.

### Clasificación y árboles

**Clave** `clasificacion-y-arboles`

**Definición** LogisticRegression, DecisionTreeClassifier, RandomForestClassifier y GBTClassifier aprenden clases. Hay variantes de regresión de varios de estos modelos.

**Búsqueda** Clasificación y árboles, entrenar un árbol de clasificación, mllib modelos

**Para recordar** En clasificación binaria la métrica debe considerar desbalance y coste de errores.

#### Entrenar un árbol de clasificación

```python
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import DecisionTreeClassifier
d = VectorAssembler(inputCols=["x"],outputCol="features").transform(ml_data)
m = DecisionTreeClassifier(labelCol="label",maxDepth=2,seed=42).fit(d)
m.transform(d).select("x","prediction").orderBy("x").show()
```

**Resultado esperado** En este conjunto simple, x=1,2,3 predicen 0 y x=4,5,6 predicen 1; es desempeño sobre entrenamiento.

### Clustering

**Clave** `clustering`

**Definición** KMeans agrupa vectores por cercanía a centros; el identificador numérico de cluster no representa una jerarquía.

**Búsqueda** Clustering, agrupar seis observaciones, mllib modelos

**Para recordar** Escala características si las unidades son muy distintas.

#### Agrupar seis observaciones

```python
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.clustering import KMeans
d = VectorAssembler(inputCols=["x"],outputCol="features").transform(ml_data)
m = KMeans(k=2,seed=42).fit(d)
print(len(m.clusterCenters()))
```

**Resultado esperado** 2 centros; sus valores y etiquetas pueden depender del ajuste.

### Evaluadores y métricas

**Clave** `evaluadores-y-metricas`

**Definición** RegressionEvaluator calcula RMSE/MAE/R²; BinaryClassificationEvaluator calcula AUC; MulticlassClassificationEvaluator admite accuracy y F1, entre otras métricas.

**Búsqueda** Evaluadores y métricas, calcular rmse de predicciones conocidas, mllib modelos

**Para recordar** Evalúa sobre datos no utilizados para ajustar el modelo.

#### Calcular RMSE de predicciones conocidas

```python
from pyspark.ml.evaluation import RegressionEvaluator
d = spark.createDataFrame([(2.0,2.0),(4.0,5.0)],"label DOUBLE, prediction DOUBLE")
print(RegressionEvaluator(metricName="rmse").evaluate(d))
```

**Resultado esperado** Aproximadamente 0.7071.

### CrossValidator y TrainValidationSplit

**Clave** `crossvalidator-y-trainvalidationsplit`

**Definición** ParamGridBuilder construye combinaciones de hiperparámetros; CrossValidator usa varios folds y TrainValidationSplit una separación para validación.

**Búsqueda** CrossValidator y TrainValidationSplit, construir una cuadrícula, mllib modelos

**Para recordar** Ajusta en entrenamiento/validación y conserva una prueba final independiente; el coste crece con combinaciones y folds.

#### Construir una cuadrícula

```python
from pyspark.ml.regression import LinearRegression
from pyspark.ml.tuning import ParamGridBuilder
lr = LinearRegression()
grid = ParamGridBuilder().addGrid(lr.regParam,[0.0,0.1]).addGrid(lr.maxIter,[10,20]).build()
print(len(grid))
```

**Resultado esperado** 4 combinaciones; se pasan a CrossValidator o TrainValidationSplit junto con estimador y evaluador.

### Guardar y cargar modelos

**Clave** `guardar-y-cargar-modelos`

**Definición** Los modelos y PipelineModel pueden persistirse mediante write/save y recuperarse con load de la clase correspondiente.

**Búsqueda** Guardar y cargar modelos, persistir un pipeline entrenado, mllib modelos

**Para recordar** Versiona el modelo junto con esquema, preparación y métricas.

#### Persistir un pipeline entrenado

```python
from pyspark.ml import Pipeline, PipelineModel
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
m = Pipeline(stages=[VectorAssembler(inputCols=["x"],outputCol="features"),LinearRegression(labelCol="target")]).fit(ml_data)
p = str(base / "model")
m.write().overwrite().save(p)
print(PipelineModel.load(p).transform(ml_data).count())
```

**Resultado esperado** 6 predicciones después de recargar el modelo.

### Ajuste con validación cruzada

**Clave** `ajuste-con-validacion-cruzada`

**Definición** CrossValidator ejecuta entrenamiento y evaluación por folds y parámetros; TrainValidationSplit hace una sola división de validación.

**Búsqueda** Ajuste con validación cruzada, ajustar dos regularizaciones, mllib modelos

**Para recordar** En series temporales, usar folds aleatorios puede producir fuga; construye divisiones adecuadas.

**Nota** Dataset diminuto didáctico; no usar sus métricas para concluir calidad de producción.

#### Ajustar dos regularizaciones

```python
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
from pyspark.ml.tuning import CrossValidator, ParamGridBuilder
from pyspark.ml.evaluation import RegressionEvaluator
d=VectorAssembler(inputCols=["x"],outputCol="features").transform(ml_data)
lr=LinearRegression(labelCol="target")
cv=CrossValidator(estimator=lr,estimatorParamMaps=ParamGridBuilder().addGrid(lr.regParam,[0.0,0.1]).build(),evaluator=RegressionEvaluator(labelCol="target"),numFolds=2,seed=42)
print(len(cv.fit(d).avgMetrics))
```

**Resultado esperado** 2 métricas medias, una por configuración, si ambos folds contienen datos suficientes.

## Fuentes

Referencias oficiales de Apache Spark, fijadas en la versión 4.1.0 salvo los proyectos externos. La sintaxis de los ejemplos es propia y las salidas se derivan de los datos compartidos. Las páginas de API enlazadas contienen firmas, parámetros, compatibilidad con Connect y etiquetas de versión introducida/cambiada.

- [Instalación de PySpark 4.1.0](https://spark.apache.org/docs/4.1.0/api/python/getting_started/install.html): requisitos de Python, Java y extras.
- [API Reference](https://spark.apache.org/docs/4.1.0/api/python/reference/): módulos públicos, clases, catálogos, tipos, lectores, escritores y funciones.
- [Guía de Spark SQL y DataFrames](https://spark.apache.org/docs/4.1.0/sql-programming-guide.html): DataFrame API y SQL, semántica de ejecución.
- [DataFrame API](https://spark.apache.org/docs/4.1.0/api/python/reference/pyspark.sql/dataframe.html): selección, filtros, acciones, joins, agrupación y operaciones de conjuntos.
- [Funciones de Spark SQL](https://spark.apache.org/docs/4.1.0/api/python/reference/pyspark.sql/functions.html): funciones escalares, agregadas, de texto, fechas, JSON, ventanas y tipos complejos.
- [Window](https://spark.apache.org/docs/4.1.0/api/python/reference/pyspark.sql/api/pyspark.sql.Window.html): especificaciones, marcos por filas y rangos.
- [Fuentes de datos SQL](https://spark.apache.org/docs/4.1.0/sql-data-sources.html): CSV, JSON, Parquet, ORC, Avro, JDBC, carga y escritura.
- [MERGE INTO](https://spark.apache.org/docs/4.1.0/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.mergeInto.html): escritura por coincidencia en proveedores compatibles.
- [Optimización de Spark SQL](https://spark.apache.org/docs/4.1.0/sql-performance-tuning.html): caché, particiones, estadísticas, hints, AQE y skew.
- [RDD Programming Guide](https://spark.apache.org/docs/4.1.0/rdd-programming-guide.html): SparkContext, RDD, acciones, lineage, broadcast y accumulators.
- [Configuración](https://spark.apache.org/docs/4.1.0/configuration.html) y [Monitoring](https://spark.apache.org/docs/4.1.0/monitoring.html): recursos, Spark UI, event logs, History Server.
- [Guía de Structured Streaming](https://spark.apache.org/docs/4.1.0/streaming/index.html): fuentes, modos, triggers, watermarks, joins, estado, recuperación y garantías.
- [transformWithStateInPandas](https://spark.apache.org/docs/4.1.0/api/python/reference/pyspark.sql/api/pyspark.sql.GroupedData.transformWithStateInPandas.html): interfaz de estado personalizado y ejemplo completo.
- [Pandas API on Spark](https://spark.apache.org/docs/4.1.0/api/python/tutorial/pandas_on_spark/index.html): DataFrame, Series, índices, conversión y rendimiento.
- [Guía de MLlib](https://spark.apache.org/docs/4.1.0/ml-guide.html): preparación, pipelines, modelos, evaluación, tuning y persistencia.
- [Spark Connect](https://spark.apache.org/docs/4.1.0/spark-connect-overview.html): cliente-servidor y compatibilidad.
- [Spark Declarative Pipelines](https://spark.apache.org/docs/4.1.0/declarative-pipelines-programming-guide.html): decoradores, tablas de streaming, vistas, flows y CLI.
- [Guía de migración SQL](https://spark.apache.org/docs/4.1.0/sql-migration-guide.html): cambios de comportamiento y compatibilidad entre versiones.
- [Submitting Applications](https://spark.apache.org/docs/4.1.0/submitting-applications.html): spark-submit, dependencias y modos de despliegue.
- [Delta Lake](https://docs.delta.io/), [Apache Iceberg](https://iceberg.apache.org/docs/latest/) y [Apache Hudi](https://hudi.apache.org/docs/overview): formatos de tablas externos, operaciones y requisitos propios.
- [Apache Airflow](https://airflow.apache.org/docs/): orquestación externa; no forma parte de PySpark.
