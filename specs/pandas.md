# pandas

**Clave** `pandas`

**Área** Análisis de datos (ubicación propuesta en AllDoc).

**Resumen** Biblioteca de Python para importar, limpiar, transformar, combinar y analizar datos tabulares y series temporales.

**Alcance** Temario amplio para Data Analyst / Business Analyst Jr: fundamentos, entrada y salida, selección, limpieza, agregación, relaciones, transformación, fechas, estadística, ventanas, visualización, validación y rendimiento; incluye las extensiones acordadas, no toda la API de pandas.

**Entorno** Python 3, pandas 2.2.3 y NumPy 2.3.5 para los ejemplos comprobados. Se usa sintaxis compatible con pandas 2.2; se señalan cambios relevantes en pandas 3.0. Excel requiere `openpyxl`, Parquet `pyarrow` o `fastparquet`, gráficos `matplotlib`. SQLite usa `sqlite3` de la biblioteca estándar. Para ejecutar en un script, sustituye la expresión final por `print(...)` o usa `display(...)` en un notebook.

## Datos compartidos

Dataset ficticio de comercio electrónico y captación de clientes, propuesto para AllDoc. Ejecuta este bloque antes de cada ejemplo independiente. Las claves `cliente_id`, `pedido_id` y `producto_id` enlazan las tablas; `detalle` tiene una fila por línea de pedido, no por pedido. `leads` contiene duplicados y datos sucios intencionales. `serie` y `diario` sirven para ejemplos de índices y tiempo. Las fechas son de prueba. Los importes de pedidos coinciden con sus líneas. No se necesita conexión externa.

```python
import pandas as pd
import numpy as np
from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
import sqlite3

clientes = pd.DataFrame({
    'cliente_id': [1, 2, 3, 4, 5],
    'nombre': ['Ana', 'Luis', 'Marta', 'Pedro', 'Eva'],
    'pais': ['MX', 'MX', 'ES', None, 'ES'],
    'alta': pd.to_datetime(['2026-01-01', '2026-01-05', '2026-01-10', '2026-02-01', '2026-02-03'])
})
pedidos = pd.DataFrame({
    'pedido_id': [101, 102, 103, 104, 105, 106, 107],
    'cliente_id': [1, 2, 1, 3, 2, 3, 1],
    'fecha': pd.to_datetime(['2026-02-01', '2026-02-01', '2026-02-02', '2026-02-03', '2026-02-03', '2026-03-01', '2026-03-02']),
    'monto': [100, 200, 150, 200, 50, 300, 150],
    'estado': ['completado', 'completado', 'cancelado', 'completado', 'cancelado', 'completado', 'completado'],
    'canal': ['web', 'tienda', 'web', 'web', 'tienda', None, 'web']
})
productos = pd.DataFrame({
    'producto_id': [10, 20, 30, 40],
    'producto': ['Mouse', 'Teclado', 'Monitor', 'Silla'],
    'categoria': ['Tec', 'Tec', 'Tec', 'Hogar'],
    'precio': [25, 50, 200, 120]
})
detalle = pd.DataFrame({
    'pedido_id': [101, 101, 102, 103, 104, 105, 106, 106, 107],
    'producto_id': [10, 20, 30, 20, 30, 10, 30, 20, 20],
    'cantidad': [2, 1, 1, 3, 1, 2, 1, 2, 3],
    'precio_unitario': [25, 50, 200, 50, 200, 25, 200, 50, 50]
})
leads = pd.DataFrame({
    'lead_id': [1, 2, 3, 4, 5],
    'email': ['ana@ejemplo.com', 'luis@ejemplo.com', 'ana@ejemplo.com', None, 'eva@ejemplo.com'],
    'importe_texto': ['100', '200', 'error', None, '50'],
    'nombre_raw': [' Ana ', 'LUIS', 'ana ', None, 'Eva']
})
serie = pd.Series([100, np.nan, 200, 300], index=['a', 'b', 'c', 'd'], name='ventas')
diario = pd.Series([100, 200, 50, 150], index=pd.date_range('2026-02-01', periods=4, freq='D'), name='ventas')
```

Las tablas tienen 5 clientes, 7 pedidos, 4 productos, 9 líneas y 5 leads. Pedro y Eva no tienen pedidos. Cada ejemplo parte del estado original, salvo que prepare explícitamente otro objeto. Los resultados de tabla se muestran como texto, con índice cuando es relevante. Los resultados comprobados se obtuvieron ejecutando los bloques en pandas 2.2.3; los ejemplos con requisitos externos no ejecutados se indican como esperados.


## Series y DataFrame

**Clave** `series-y-dataframe`


### Definición

**Clave** `definicion`

**Definición** Una Series contiene valores en una dimensión con etiquetas; un DataFrame organiza columnas y filas con índices.

**Búsqueda** series y dataframe, qué es series y dataframe, cómo usar series y dataframe en pandas

**Para recordar** Series = una dimensión; DataFrame = tabla.


#### Crear una serie de ventas

```python
pd.Series([100, 200], index=['web', 'tienda'], name='ventas')
```

El índice etiqueta cada valor.

**Resultado comprobado**

```text
web       100
tienda    200
```


### Series

**Clave** `series`

**Definición** Construye una columna de valores con un índice opcional.

**Búsqueda** series, crear una serie de ventas, pandas series y dataframe

**Para recordar** El índice etiqueta cada valor.


#### Crear una serie de ventas

```python
pd.Series([100, 200], index=['web', 'tienda'], name='ventas')
```

El índice etiqueta cada valor.

**Resultado comprobado**

```text
web       100
tienda    200
```


### DataFrame

**Clave** `dataframe`

**Definición** Construye una tabla desde un diccionario de columnas o una lista de registros.

**Búsqueda** dataframe, crear una tabla de ventas, pandas series y dataframe

**Para recordar** Las columnas del diccionario deben tener longitudes compatibles.


#### Crear una tabla de ventas

```python
pd.DataFrame({'canal': ['web', 'tienda'], 'ventas': [100, 200]})
```

Las columnas del diccionario deben tener longitudes compatibles.

**Resultado comprobado**

```text
    canal  ventas
0     web     100
1  tienda     200
```


### Index

**Clave** `index`

**Definición** El Index contiene las etiquetas de un eje, no los valores de las filas.

**Búsqueda** index, consultar etiquetas de clientes, pandas series y dataframe

**Para recordar** Las etiquetas no tienen por qué ser únicas ni consecutivas.


#### Consultar etiquetas de clientes

```python
clientes.index.tolist()
```

Las etiquetas no tienen por qué ser únicas ni consecutivas.

**Resultado comprobado**

```text
[0, 1, 2, 3, 4]
```


### Series frente a DataFrame

**Clave** `series-frente-a-dataframe`

**Definición** Seleccionar una columna con un nombre devuelve Series; con una lista devuelve DataFrame.

**Búsqueda** series frente a dataframe, comparar las dimensiones, pandas series y dataframe

**Para recordar** Un corchete con texto devuelve una Series; una lista conserva la tabla.


#### Comparar las dimensiones

```python
type(clientes['nombre']).__name__, type(clientes[['nombre']]).__name__
```

Un corchete con texto devuelve una Series; una lista conserva la tabla.

**Resultado comprobado**

```text
('Series', 'DataFrame')
```


## Inspección

**Clave** `inspeccion`


### Definición

**Clave** `definicion`

**Definición** Antes de transformar datos conviene conocer sus dimensiones, columnas, tipos y distribución.

**Búsqueda** inspección, qué es inspección, cómo usar inspección en pandas

**Para recordar** Inspecciona antes de filtrar o convertir.


#### Ver los primeros dos pedidos

```python
pedidos.head(2)
```

head = inicio; tail = final.

**Resultado comprobado**

```text
   pedido_id  cliente_id      fecha  monto      estado   canal
0        101           1 2026-02-01    100  completado     web
1        102           2 2026-02-01    200  completado  tienda
```


### head y tail

**Clave** `head-y-tail`

**Definición** Devuelven las primeras o últimas n filas sin modificar la tabla.

**Búsqueda** head y tail, ver los primeros dos pedidos, pandas inspección

**Para recordar** head = inicio; tail = final.


#### Ver los primeros dos pedidos

```python
pedidos.head(2)
```

head = inicio; tail = final.

**Resultado comprobado**

```text
   pedido_id  cliente_id      fecha  monto      estado   canal
0        101           1 2026-02-01    100  completado     web
1        102           2 2026-02-01    200  completado  tienda
```


### sample

**Clave** `sample`

**Definición** Selecciona una muestra de filas; random_state permite repetirla.

**Búsqueda** sample, tomar dos pedidos reproducibles, pandas inspección

**Para recordar** Una muestra no garantiza representar todos los grupos.


#### Tomar dos pedidos reproducibles

```python
pedidos.sample(n=2, random_state=42)
```

Una muestra no garantiza representar todos los grupos.

**Resultado comprobado**

```text
   pedido_id  cliente_id      fecha  monto      estado   canal
0        101           1 2026-02-01    100  completado     web
1        102           2 2026-02-01    200  completado  tienda
```


### shape, size y len

**Clave** `shape-size-y-len`

**Definición** shape devuelve filas y columnas; size cuenta celdas; len cuenta filas.

**Búsqueda** shape, size y len, contar dimensiones, pandas inspección

**Para recordar** No confundas celdas con registros.


#### Contar dimensiones

```python
pedidos.shape, pedidos.size, len(pedidos)
```

No confundas celdas con registros.

**Resultado comprobado**

```text
((7, 6), 42, 7)
```


### columns y dtypes

**Clave** `columns-y-dtypes`

**Definición** columns enumera nombres y dtypes muestra el tipo de cada columna.

**Búsqueda** columns y dtypes, revisar esquema, pandas inspección

**Para recordar** Un número guardado como texto no se suma como número.


#### Revisar esquema

```python
leads.dtypes.astype(str)
```

Un número guardado como texto no se suma como número.

**Resultado comprobado**

```text
lead_id           int64
email            object
importe_texto    object
nombre_raw       object
```


### info

**Clave** `info`

**Definición** Imprime el esquema, conteos no nulos y memoria aproximada.

**Búsqueda** info, examinar calidad inicial, pandas inspección

**Para recordar** info() imprime y devuelve None.


#### Examinar calidad inicial

```python
clientes.info(memory_usage=False)
```

info() imprime y devuelve None.

**Resultado comprobado**

```text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column      Non-Null Count  Dtype         
---  ------      --------------  -----         
 0   cliente_id  5 non-null      int64         
 1   nombre      5 non-null      object        
 2   pais        4 non-null      object        
 3   alta        5 non-null      datetime64[ns]
dtypes: datetime64[ns](1), int64(1), object(2)
```


### describe

**Clave** `describe`

**Definición** Resume estadísticas de columnas numéricas; include permite incluir otros tipos.

**Búsqueda** describe, resumir montos, pandas inspección

**Para recordar** count excluye nulos.


#### Resumir montos

```python
pedidos['monto'].describe().round(2)
```

count excluye nulos.

**Resultado comprobado**

```text
count      7.00
mean     164.29
std       80.18
min       50.00
25%      125.00
50%      150.00
75%      200.00
max      300.00
```


### Últimas filas

**Clave** `ultimas-filas`

**Definición** tail(n) devuelve las últimas n filas en el orden actual.

**Búsqueda** últimas filas, ver los dos últimos pedidos, pandas inspección

**Para recordar** No significa necesariamente las más recientes si la tabla no está ordenada por fecha.


#### Ver los dos últimos pedidos

```python
pedidos.tail(2)[['pedido_id','monto']]
```

No significa necesariamente las más recientes si la tabla no está ordenada por fecha.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
6        107    150
```


## Importar datos

**Clave** `importar-datos`


### Definición

**Clave** `definicion`

**Definición** Las funciones read_* crean DataFrames desde archivos, texto o consultas.

**Búsqueda** importar datos, qué es importar datos, cómo usar importar datos en pandas

**Para recordar** Leer no modifica el archivo de origen.


#### Leer CSV desde texto

```python
pd.read_csv(StringIO('id,monto\n1,100\n2,200'))
```

Revisa encabezados, delimitador y tipos.

**Resultado comprobado**

```text
   id  monto
0   1    100
1   2    200
```


### read_csv

**Clave** `read-csv`

**Definición** Lee datos delimitados; sep define el separador y encoding la codificación.

**Búsqueda** read_csv, leer csv desde texto, pandas importar datos

**Para recordar** Revisa encabezados, delimitador y tipos.


#### Leer CSV desde texto

```python
pd.read_csv(StringIO('id,monto\n1,100\n2,200'))
```

Revisa encabezados, delimitador y tipos.

**Resultado comprobado**

```text
   id  monto
0   1    100
1   2    200
```


### Opciones de read_csv

**Clave** `opciones-de-read-csv`

**Definición** usecols, dtype, na_values, parse_dates y sep controlan la importación.

**Búsqueda** opciones de read_csv, conservar ceros iniciales y detectar nulos, pandas importar datos

**Para recordar** Define tipos y nulos al ingresar cuando conozcas el esquema.


#### Conservar ceros iniciales y detectar nulos

```python
pd.read_csv(StringIO('id;importe;fecha\n001;NA;2026-02-01'), sep=';', dtype={'id': 'string'}, na_values=['NA'], parse_dates=['fecha'], usecols=['id','importe','fecha'])
```

Define tipos y nulos al ingresar cuando conozcas el esquema.

**Resultado comprobado**

```text
    id  importe      fecha
0  001      NaN 2026-02-01
```


### read_excel

**Clave** `read-excel`

**Definición** Lee una hoja por nombre o posición; sheet_name=None devuelve un diccionario de hojas.

**Búsqueda** read_excel, leer una hoja creada en memoria, pandas importar datos

**Para recordar** Una hoja no equivale a todo el libro.


**Nota** Requiere openpyxl; la escritura prepara el archivo de prueba.


#### Leer una hoja creada en memoria

```python
with TemporaryDirectory() as d:
    p = Path(d) / 'ventas.xlsx'
    pedidos[['pedido_id','monto']].head(2).to_excel(p, sheet_name='Ventas', index=False)
    resultado = pd.read_excel(p, sheet_name='Ventas')
resultado
```

Una hoja no equivale a todo el libro.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
```


### read_json

**Clave** `read-json`

**Definición** Lee JSON; orient='records' interpreta una lista de objetos como filas.

**Búsqueda** read_json, leer registros json, pandas importar datos

**Para recordar** La orientación debe coincidir con la estructura.


#### Leer registros JSON

```python
pd.read_json(StringIO('[{"id":1,"monto":100},{"id":2,"monto":200}]'), orient='records')
```

La orientación debe coincidir con la estructura.

**Resultado comprobado**

```text
   id  monto
0   1    100
1   2    200
```


### read_sql

**Clave** `read-sql`

**Definición** Ejecuta una consulta SQL y devuelve sus filas como DataFrame.

**Búsqueda** read_sql, consultar una base sqlite local, pandas importar datos

**Para recordar** Usa parámetros para valores externos, no concatenación de texto.


#### Consultar una base SQLite local

```python
with sqlite3.connect(':memory:') as con:
    pedidos[['pedido_id','monto']].to_sql('ventas', con, index=False)
    resultado = pd.read_sql('SELECT * FROM ventas WHERE monto > ? ORDER BY pedido_id', con, params=[200])
resultado
```

Usa parámetros para valores externos, no concatenación de texto.

**Resultado comprobado**

```text
   pedido_id  monto
0        106    300
```


### read_parquet

**Clave** `read-parquet`

**Definición** Lee un archivo columnar Parquet que conserva tipos con un motor compatible.

**Búsqueda** read_parquet, leer dos columnas de parquet, pandas importar datos

**Para recordar** Puedes solicitar solo las columnas necesarias.


**Nota** Requiere pyarrow o fastparquet.


#### Leer dos columnas de Parquet

```python
with TemporaryDirectory() as d:
    p = Path(d) / 'ventas.parquet'
    pedidos.to_parquet(p, index=False)
    resultado = pd.read_parquet(p, columns=['pedido_id','monto']).head(2)
resultado
```

Puedes solicitar solo las columnas necesarias.

**Resultado esperado**

```text
   pedido_id  monto
0        101    100
1        102    200
```


## Selección de datos

**Clave** `seleccion-de-datos`


### Definición

**Clave** `definicion`

**Definición** Selecciona columnas y filas por etiqueta con loc o por posición con iloc.

**Búsqueda** selección de datos, qué es selección de datos, cómo usar selección de datos en pandas

**Para recordar** loc = etiqueta; iloc = posición.


#### Mostrar identificador y monto

```python
pedidos[['pedido_id','monto']].head(3)
```

Usa dobles corchetes para una lista de columnas.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
2        103    150
```


### Columnas

**Clave** `columnas`

**Definición** Una lista de nombres selecciona varias columnas en el orden indicado.

**Búsqueda** columnas, mostrar identificador y monto, pandas selección de datos

**Para recordar** Usa dobles corchetes para una lista de columnas.


#### Mostrar identificador y monto

```python
pedidos[['pedido_id','monto']].head(3)
```

Usa dobles corchetes para una lista de columnas.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
2        103    150
```


### loc

**Clave** `loc`

**Definición** Selecciona filas y columnas por etiquetas; los extremos de un corte por etiquetas se incluyen.

**Búsqueda** loc, elegir las etiquetas 0 a 2, pandas selección de datos

**Para recordar** loc[filas, columnas].


#### Elegir las etiquetas 0 a 2

```python
pedidos.loc[0:2, ['pedido_id','monto']]
```

loc[filas, columnas].

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
2        103    150
```


### iloc

**Clave** `iloc`

**Definición** Selecciona por posiciones enteras desde cero; el extremo final del corte se excluye.

**Búsqueda** iloc, elegir las dos primeras filas y columnas, pandas selección de datos

**Para recordar** iloc[0:2] devuelve dos filas.


#### Elegir las dos primeras filas y columnas

```python
pedidos.iloc[0:2, 0:2]
```

iloc[0:2] devuelve dos filas.

**Resultado comprobado**

```text
   pedido_id  cliente_id
0        101           1
1        102           2
```


### at e iat

**Clave** `at-e-iat`

**Definición** at accede a una celda por etiqueta e iat por posición.

**Búsqueda** at e iat, consultar un monto puntual, pandas selección de datos

**Para recordar** Para valores escalares, no para rangos.


#### Consultar un monto puntual

```python
pedidos.at[0,'monto'], pedidos.iat[0,3]
```

Para valores escalares, no para rangos.

**Resultado comprobado**

```text
(100, 100)
```


## Filtros

**Clave** `filtros`


### Definición

**Clave** `definicion`

**Definición** Una máscara booleana selecciona filas que cumplen una condición.

**Búsqueda** filtros, qué es filtros, cómo usar filtros en pandas

**Para recordar** La máscara tiene un True o False por fila.


#### Seleccionar pedidos de más de 200

```python
pedidos.loc[pedidos['monto'] > 200, ['pedido_id','monto']]
```

En Python igualdad se escribe ==, no =.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
```


### Comparaciones

**Clave** `comparaciones`

**Definición** ==, !=, >, >=, < y <= comparan valores de una columna.

**Búsqueda** comparaciones, seleccionar pedidos de más de 200, pandas filtros

**Para recordar** En Python igualdad se escribe ==, no =.


#### Seleccionar pedidos de más de 200

```python
pedidos.loc[pedidos['monto'] > 200, ['pedido_id','monto']]
```

En Python igualdad se escribe ==, no =.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
```


### AND, OR y NOT

**Clave** `and-or-y-not`

**Definición** Combina máscaras con &, | y `~`; cada comparación necesita paréntesis.

**Búsqueda** and, or y not, filtrar ventas grandes o canceladas, pandas filtros

**Para recordar** and y or de Python no combinan Series elemento por elemento.


#### Filtrar ventas grandes o canceladas

```python
pedidos.loc[((pedidos['monto'] >= 200) & (pedidos['estado'] == 'completado')) | (pedidos['estado'] == 'cancelado'), ['pedido_id','monto','estado']]
```

and y or de Python no combinan Series elemento por elemento.

**Resultado comprobado**

```text
   pedido_id  monto      estado
1        102    200  completado
2        103    150   cancelado
3        104    200  completado
4        105     50   cancelado
5        106    300  completado
```


### Negar una condición

**Clave** `negar-una-condicion`

**Definición** `~` invierte los booleanos de una máscara.

**Búsqueda** negar una condición, excluir pedidos cancelados, pandas filtros

**Para recordar** No completar una condición no implica que un dato faltante sea un valor conocido.


#### Excluir pedidos cancelados

```python
pedidos.loc[~(pedidos['estado'] == 'cancelado'), 'pedido_id'].tolist()
```

No completar una condición no implica que un dato faltante sea un valor conocido.

**Resultado comprobado**

```text
[101, 102, 104, 106, 107]
```


### isin

**Clave** `isin`

**Definición** Comprueba si cada valor pertenece a una colección.

**Búsqueda** isin, seleccionar pedidos de dos clientes, pandas filtros

**Para recordar** Equivale a IN de SQL para valores no nulos.


#### Seleccionar pedidos de dos clientes

```python
pedidos.loc[pedidos['cliente_id'].isin([1,3]), 'pedido_id'].tolist()
```

Equivale a IN de SQL para valores no nulos.

**Resultado comprobado**

```text
[101, 103, 104, 106, 107]
```


### between

**Clave** `between`

**Definición** Comprueba si un valor está entre dos límites, incluidos por defecto.

**Búsqueda** between, filtrar montos entre 100 y 200, pandas filtros

**Para recordar** inclusive='both' incluye ambos extremos.


#### Filtrar montos entre 100 y 200

```python
pedidos.loc[pedidos['monto'].between(100,200), 'monto'].tolist()
```

inclusive='both' incluye ambos extremos.

**Resultado comprobado**

```text
[100, 200, 150, 200, 150]
```


### query

**Clave** `query`

**Definición** Filtra con una expresión de texto; @ permite usar una variable de Python.

**Búsqueda** query, aplicar un límite variable, pandas filtros

**Para recordar** No ejecutes expresiones recibidas de usuarios sin validar.


#### Aplicar un límite variable

```python
limite = 150
pedidos.query('monto > @limite')[['pedido_id','monto']]
```

No ejecutes expresiones recibidas de usuarios sin validar.

**Resultado comprobado**

```text
   pedido_id  monto
1        102    200
3        104    200
5        106    300
```


## Ordenamiento y límites

**Clave** `ordenamiento-y-limites`


### Definición

**Clave** `definicion`

**Definición** sort_values ordena valores; sort_index ordena etiquetas. head y tail limitan filas.

**Búsqueda** ordenamiento y límites, qué es ordenamiento y límites, cómo usar ordenamiento y límites en pandas

**Para recordar** Ordenar no modifica el original salvo que se solicite.


#### Ordenar montos con desempate

```python
pedidos.sort_values(['monto','pedido_id'], ascending=[False,True])[['pedido_id','monto']]
```

ascending=False ordena de mayor a menor.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
1        102    200
3        104    200
2        103    150
6        107    150
0        101    100
4        105     50
```


### sort_values

**Clave** `sort-values`

**Definición** Ordena una o más columnas y permite una dirección por columna.

**Búsqueda** sort_values, ordenar montos con desempate, pandas ordenamiento y límites

**Para recordar** ascending=False ordena de mayor a menor.


#### Ordenar montos con desempate

```python
pedidos.sort_values(['monto','pedido_id'], ascending=[False,True])[['pedido_id','monto']]
```

ascending=False ordena de mayor a menor.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
1        102    200
3        104    200
2        103    150
6        107    150
0        101    100
4        105     50
```


### sort_index

**Clave** `sort-index`

**Definición** Ordena según las etiquetas del índice.

**Búsqueda** sort_index, ordenar etiquetas de forma descendente, pandas ordenamiento y límites

**Para recordar** El índice no tiene por qué coincidir con una columna de negocio.


#### Ordenar etiquetas de forma descendente

```python
serie.sort_index(ascending=False)
```

El índice no tiene por qué coincidir con una columna de negocio.

**Resultado comprobado**

```text
d    300.0
c    200.0
b      NaN
a    100.0
```


### nlargest y nsmallest

**Clave** `nlargest-y-nsmallest`

**Definición** Seleccionan los n valores extremos de una columna numérica sin ordenar explícitamente toda la tabla.

**Búsqueda** nlargest y nsmallest, obtener los dos pedidos más caros, pandas ordenamiento y límites

**Para recordar** keep controla qué ocurre con los empates.


#### Obtener los dos pedidos más caros

```python
pedidos.nlargest(2,'monto',keep='first')[['pedido_id','monto']]
```

keep controla qué ocurre con los empates.

**Resultado comprobado**

```text
   pedido_id  monto
5        106    300
1        102    200
```


### head, tail y paginación

**Clave** `head-tail-y-paginacion`

**Definición** Tras ordenar, head(n) selecciona los primeros n; iloc permite saltar filas.

**Búsqueda** head, tail y paginación, obtener la segunda página de dos pedidos, pandas ordenamiento y límites

**Para recordar** Ordena antes de pedir un top.


#### Obtener la segunda página de dos pedidos

```python
pedidos.sort_values('pedido_id').iloc[2:4][['pedido_id','monto']]
```

Ordena antes de pedir un top.

**Resultado comprobado**

```text
   pedido_id  monto
2        103    150
3        104    200
```


### nsmallest

**Clave** `nsmallest`

**Definición** Devuelve las n filas con valores más bajos de una columna.

**Búsqueda** nsmallest, encontrar los dos pedidos más pequeños, pandas ordenamiento y límites

**Para recordar** keep='all' conserva todos los empates del límite.


#### Encontrar los dos pedidos más pequeños

```python
pedidos.nsmallest(2,'monto')[['pedido_id','monto']]
```

keep='all' conserva todos los empates del límite.

**Resultado comprobado**

```text
   pedido_id  monto
4        105     50
0        101    100
```


## Índices y alineación

**Clave** `indices-y-alineacion`


### Definición

**Clave** `definicion`

**Definición** Pandas identifica filas por etiquetas y alinea operaciones según esas etiquetas.

**Búsqueda** índices y alineación, qué es índices y alineación, cómo usar índices y alineación en pandas

**Para recordar** Índice no significa posición ni clave primaria automáticamente.


#### Usar identificador y recuperarlo

```python
clientes.set_index('cliente_id')[['nombre']].reset_index().head(2)
```

drop=True descarta las etiquetas anteriores al restablecer.

**Resultado comprobado**

```text
   cliente_id nombre
0           1    Ana
1           2   Luis
```


### set_index y reset_index

**Clave** `set-index-y-reset-index`

**Definición** set_index convierte columnas en etiquetas; reset_index recupera un índice normal.

**Búsqueda** set_index y reset_index, usar identificador y recuperarlo, pandas índices y alineación

**Para recordar** drop=True descarta las etiquetas anteriores al restablecer.


#### Usar identificador y recuperarlo

```python
clientes.set_index('cliente_id')[['nombre']].reset_index().head(2)
```

drop=True descarta las etiquetas anteriores al restablecer.

**Resultado comprobado**

```text
   cliente_id nombre
0           1    Ana
1           2   Luis
```


### reindex

**Clave** `reindex`

**Definición** Ajusta las etiquetas al conjunto solicitado, insertando faltantes donde no hay datos.

**Búsqueda** reindex, incluir un cliente inexistente, pandas índices y alineación

**Para recordar** No es lo mismo que seleccionar: puede crear posiciones nuevas.


#### Incluir un cliente inexistente

```python
clientes.set_index('cliente_id')['nombre'].reindex([1,5,9])
```

No es lo mismo que seleccionar: puede crear posiciones nuevas.

**Resultado comprobado**

```text
cliente_id
1    Ana
5    Eva
9    NaN
```


### Alineación automática

**Clave** `alineacion-automatica`

**Definición** Las operaciones entre Series emparejan etiquetas, no posiciones.

**Búsqueda** alineación automática, sumar dos series por canal, pandas índices y alineación

**Para recordar** Etiquetas sin pareja producen nulos.


#### Sumar dos series por canal

```python
a = pd.Series({'web':100,'tienda':50})
b = pd.Series({'tienda':20,'web':30})
a + b
```

Etiquetas sin pareja producen nulos.

**Resultado comprobado**

```text
tienda     70
web       130
```


### align

**Clave** `align`

**Definición** Alinea dos objetos explícitamente antes de operar.

**Búsqueda** align, conservar canales compartidos, pandas índices y alineación

**Para recordar** join='inner' conserva etiquetas comunes.


#### Conservar canales compartidos

```python
a = pd.Series({'web':100,'tienda':50})
b = pd.Series({'web':30,'app':20})
x, y = a.align(b, join='inner')
x + y
```

join='inner' conserva etiquetas comunes.

**Resultado comprobado**

```text
web    130
```


### MultiIndex

**Clave** `multiindex`

**Definición** Un índice jerárquico contiene varios niveles de etiquetas.

**Búsqueda** multiindex, consultar nombre por país y cliente, pandas índices y alineación

**Para recordar** Permite seleccionar combinaciones de claves.


#### Consultar nombre por país y cliente

```python
tabla = clientes.set_index(['pais','cliente_id']).sort_index()
tabla.loc[('MX',1),'nombre']
```

Permite seleccionar combinaciones de claves.

**Resultado comprobado**

```text
Ana
```


## Valores nulos

**Clave** `valores-nulos`


### Definición

**Clave** `definicion`

**Definición** Los datos faltantes pueden representarse mediante None, np.nan, pd.NA o NaT según el tipo.

**Búsqueda** valores nulos, qué es valores nulos, cómo usar valores nulos en pandas

**Para recordar** Usa isna(), no igualdad con NaN.


#### Detectar clientes sin país

```python
clientes.loc[clientes['pais'].isna(), ['cliente_id','nombre']]
```

No cuentan ceros ni cadenas vacías como nulos por defecto.

**Resultado comprobado**

```text
   cliente_id nombre
3           4  Pedro
```


### isna y notna

**Clave** `isna-y-notna`

**Definición** Identifican valores ausentes o presentes respectivamente.

**Búsqueda** isna y notna, detectar clientes sin país, pandas valores nulos

**Para recordar** No cuentan ceros ni cadenas vacías como nulos por defecto.


#### Detectar clientes sin país

```python
clientes.loc[clientes['pais'].isna(), ['cliente_id','nombre']]
```

No cuentan ceros ni cadenas vacías como nulos por defecto.

**Resultado comprobado**

```text
   cliente_id nombre
3           4  Pedro
```


### Conteo de faltantes

**Clave** `conteo-de-faltantes`

**Definición** isna().sum() cuenta los nulos porque True se suma como uno.

**Búsqueda** conteo de faltantes, medir faltantes en clientes, pandas valores nulos

**Para recordar** Cuenta por columna antes de limpiar.


#### Medir faltantes en clientes

```python
clientes.isna().sum()
```

Cuenta por columna antes de limpiar.

**Resultado comprobado**

```text
cliente_id    0
nombre        0
pais          1
alta          0
```


### dropna

**Clave** `dropna`

**Definición** Elimina filas o columnas que contienen nulos; subset restringe las columnas examinadas.

**Búsqueda** dropna, conservar clientes con país, pandas valores nulos

**Para recordar** No elimines una fila solo porque otra columna opcional está vacía.


#### Conservar clientes con país

```python
clientes.dropna(subset=['pais'])[['cliente_id','pais']]
```

No elimines una fila solo porque otra columna opcional está vacía.

**Resultado comprobado**

```text
   cliente_id pais
0           1   MX
1           2   MX
2           3   ES
4           5   ES
```


### fillna

**Clave** `fillna`

**Definición** Reemplaza nulos por un valor, una serie o un diccionario de columnas.

**Búsqueda** fillna, etiquetar país desconocido, pandas valores nulos

**Para recordar** Un cero solo es correcto si ausencia significa cero.


#### Etiquetar país desconocido

```python
clientes['pais'].fillna('Desconocido')
```

Un cero solo es correcto si ausencia significa cero.

**Resultado comprobado**

```text
0             MX
1             MX
2             ES
3    Desconocido
4             ES
```


### ffill y bfill

**Clave** `ffill-y-bfill`

**Definición** Propagan la observación válida anterior o posterior en el orden actual.

**Búsqueda** ffill y bfill, rellenar un hueco de ventas, pandas valores nulos

**Para recordar** Ordena temporalmente antes de propagar.


#### Rellenar un hueco de ventas

```python
serie.ffill(), serie.bfill()
```

Ordena temporalmente antes de propagar.

**Resultado comprobado**

```text
1)
a    100.0
b    100.0
c    200.0
d    300.0

2)
a    100.0
b    200.0
c    200.0
d    300.0
```


### interpolate

**Clave** `interpolate`

**Definición** Estima valores intermedios según un método, lineal por defecto.

**Búsqueda** interpolate, interpolar un punto entre 100 y 200, pandas valores nulos

**Para recordar** No debe confundirse un valor estimado con una medición.


#### Interpolar un punto entre 100 y 200

```python
serie.interpolate()
```

No debe confundirse un valor estimado con una medición.

**Resultado comprobado**

```text
a    100.0
b    150.0
c    200.0
d    300.0
```


### None, NaN, NA y NaT

**Clave** `none-nan-na-y-nat`

**Definición** Son marcadores de ausencia para distintos tipos; pd.NA puede propagar incertidumbre.

**Búsqueda** none, nan, na y nat, comprobar marcadores de ausencia, pandas valores nulos

**Para recordar** isna reconoce los cuatro.


#### Comprobar marcadores de ausencia

```python
pd.Series([None,np.nan,pd.NA,pd.NaT],dtype='object').isna().tolist()
```

isna reconoce los cuatro.

**Resultado comprobado**

```text
[True, True, True, True]
```


### combine_first

**Clave** `combine-first`

**Definición** Conserva valores existentes y rellena ausencias con otro objeto alineado por etiquetas.

**Búsqueda** combine_first, completar países desde una segunda fuente, pandas valores nulos

**Para recordar** Puede incorporar etiquetas nuevas.


#### Completar países desde una segunda fuente

```python
a = clientes.set_index('cliente_id')['pais']
b = pd.Series({4:'AR',6:'CL'})
a.combine_first(b)
```

Puede incorporar etiquetas nuevas.

**Resultado comprobado**

```text
1    MX
2    MX
3    ES
4    AR
5    ES
6    CL
```


### notna

**Clave** `notna`

**Definición** Construye una máscara verdadera para valores presentes.

**Búsqueda** notna, seleccionar clientes con país conocido, pandas valores nulos

**Para recordar** Es la operación complementaria de isna.


#### Seleccionar clientes con país conocido

```python
clientes.loc[clientes['pais'].notna(),['cliente_id','pais']]
```

Es la operación complementaria de isna.

**Resultado comprobado**

```text
   cliente_id pais
0           1   MX
1           2   MX
2           3   ES
4           5   ES
```


## Conversión de tipos

**Clave** `conversion-de-tipos`


### Definición

**Clave** `definicion`

**Definición** Los tipos determinan cómo se comparan, calculan y almacenan los datos.

**Búsqueda** conversión de tipos, qué es conversión de tipos, cómo usar conversión de tipos en pandas

**Para recordar** Convierte y verifica antes de calcular.


#### Conservar el identificador como texto

```python
clientes['cliente_id'].astype('string').head(2)
```

No confundir convertir a texto con formatear una fecha.

**Resultado comprobado**

```text
0    1
1    2
```


### astype

**Clave** `astype`

**Definición** Convierte a un tipo explícito; puede fallar ante valores incompatibles.

**Búsqueda** astype, conservar el identificador como texto, pandas conversión de tipos

**Para recordar** No confundir convertir a texto con formatear una fecha.


#### Conservar el identificador como texto

```python
clientes['cliente_id'].astype('string').head(2)
```

No confundir convertir a texto con formatear una fecha.

**Resultado comprobado**

```text
0    1
1    2
```


### to_numeric

**Clave** `to-numeric`

**Definición** Convierte texto numérico; errors='coerce' convierte valores inválidos en nulos.

**Búsqueda** to_numeric, convertir importes de leads, pandas conversión de tipos

**Para recordar** Conserva el original para auditar errores.


#### Convertir importes de leads

```python
pd.to_numeric(leads['importe_texto'], errors='coerce')
```

Conserva el original para auditar errores.

**Resultado comprobado**

```text
0    100.0
1    200.0
2      NaN
3      NaN
4     50.0
```


### to_datetime

**Clave** `to-datetime`

**Definición** Interpreta valores como fechas; format fija el patrón y errors='coerce' marca errores como NaT.

**Búsqueda** to_datetime, convertir fechas de entrada, pandas conversión de tipos

**Para recordar** Un texto con aspecto de fecha no es necesariamente datetime.


#### Convertir fechas de entrada

```python
pd.to_datetime(pd.Series(['01/02/2026','error']), format='%d/%m/%Y', errors='coerce')
```

Un texto con aspecto de fecha no es necesariamente datetime.

**Resultado comprobado**

```text
0   2026-02-01
1          NaT
```


### Tipos nullable

**Clave** `tipos-nullable`

**Definición** Int64, boolean y string permiten representar ausencias sin perder su tipo lógico.

**Búsqueda** tipos nullable, conservar enteros faltantes, pandas conversión de tipos

**Para recordar** Int64 con I mayúscula admite pd.NA.


#### Conservar enteros faltantes

```python
pd.Series([1,None,3], dtype='Int64')
```

Int64 con I mayúscula admite pd.NA.

**Resultado comprobado**

```text
0       1
1    <NA>
2       3
```


### convert_dtypes

**Clave** `convert-dtypes`

**Definición** Propone tipos compatibles con ausencias según los valores de cada columna.

**Búsqueda** convert_dtypes, inferir tipos anulables, pandas conversión de tipos

**Para recordar** No convierte automáticamente todo texto numérico a números.


#### Inferir tipos anulables

```python
leads.convert_dtypes().dtypes.astype(str)
```

No convierte automáticamente todo texto numérico a números.

**Resultado comprobado**

```text
lead_id           Int64
email            string
importe_texto    string
nombre_raw       string
```


## Texto

**Clave** `texto`


### Definición

**Clave** `definicion`

**Definición** El accesor str aplica operaciones de cadenas elemento por elemento.

**Búsqueda** texto, qué es texto, cómo usar texto en pandas

**Para recordar** Usa métodos str sobre una Series, no sobre todo el DataFrame.


#### Limpiar espacios externos

```python
leads['nombre_raw'].str.strip()
```

strip no elimina espacios interiores.

**Resultado comprobado**

```text
0     Ana
1    LUIS
2     ana
3    None
4     Eva
```


### strip, lstrip y rstrip

**Clave** `strip-lstrip-y-rstrip`

**Definición** Eliminan caracteres en ambos extremos, izquierda o derecha.

**Búsqueda** strip, lstrip y rstrip, limpiar espacios externos, pandas texto

**Para recordar** strip no elimina espacios interiores.


#### Limpiar espacios externos

```python
leads['nombre_raw'].str.strip()
```

strip no elimina espacios interiores.

**Resultado comprobado**

```text
0     Ana
1    LUIS
2     ana
3    None
4     Eva
```


### lower, upper y casefold

**Clave** `lower-upper-y-casefold`

**Definición** Normalizan mayúsculas y minúsculas; casefold es útil en comparaciones sin distinción de caja.

**Búsqueda** lower, upper y casefold, homogeneizar nombres, pandas texto

**Para recordar** Normaliza antes de deduplicar si el negocio lo permite.


#### Homogeneizar nombres

```python
leads['nombre_raw'].str.strip().str.lower()
```

Normaliza antes de deduplicar si el negocio lo permite.

**Resultado comprobado**

```text
0     ana
1    luis
2     ana
3    None
4     eva
```


### len y slicing

**Clave** `len-y-slicing`

**Definición** str.len cuenta caracteres; str[...] extrae posiciones de cada texto.

**Búsqueda** len y slicing, extraer prefijo de productos, pandas texto

**Para recordar** El corte final se excluye.


#### Extraer prefijo de productos

```python
productos['producto'].str[:3].tolist()
```

El corte final se excluye.

**Resultado comprobado**

```text
['Mou', 'Tec', 'Mon', 'Sil']
```


### contains, startswith y endswith

**Clave** `contains-startswith-y-endswith`

**Definición** Prueban patrones o prefijos y sufijos; contains usa regex por defecto.

**Búsqueda** contains, startswith y endswith, encontrar correos de ana, pandas texto

**Para recordar** regex=False busca texto literal; na=False excluye ausentes.


#### Encontrar correos de Ana

```python
leads.loc[leads['email'].str.contains('ana@',regex=False,na=False), 'lead_id'].tolist()
```

regex=False busca texto literal; na=False excluye ausentes.

**Resultado comprobado**

```text
[1, 3]
```


### replace

**Clave** `replace`

**Definición** Sustituye fragmentos de texto; regex decide si el patrón es literal o regular.

**Búsqueda** replace, cambiar el dominio de los correos, pandas texto

**Para recordar** str.replace no es lo mismo que reemplazar celdas completas.


#### Cambiar el dominio de los correos

```python
leads['email'].str.replace('ejemplo.com','empresa.com',regex=False)
```

str.replace no es lo mismo que reemplazar celdas completas.

**Resultado comprobado**

```text
0     ana@empresa.com
1    luis@empresa.com
2     ana@empresa.com
3                None
4     eva@empresa.com
```


### split y extract

**Clave** `split-y-extract`

**Definición** split separa por delimitador; extract recupera grupos capturados por una expresión regular.

**Búsqueda** split y extract, separar usuario y dominio, pandas texto

**Para recordar** expand=True devuelve columnas en split.


#### Separar usuario y dominio

```python
leads['email'].str.split('@',expand=True).set_axis(['usuario','dominio'],axis=1)
```

expand=True devuelve columnas en split.

**Resultado comprobado**

```text
  usuario      dominio
0     ana  ejemplo.com
1    luis  ejemplo.com
2     ana  ejemplo.com
3    None         None
4     eva  ejemplo.com
```


### Expresiones regulares

**Clave** `expresiones-regulares`

**Definición** Los patrones regex permiten capturar partes variables de cadenas.

**Búsqueda** expresiones regulares, extraer usuario antes de arroba, pandas texto

**Para recordar** Los paréntesis de captura determinan las columnas de extract.


#### Extraer usuario antes de arroba

```python
leads['email'].str.extract(r'^([^@]+)@', expand=False)
```

Los paréntesis de captura determinan las columnas de extract.

**Resultado comprobado**

```text
0     ana
1    luis
2     ana
3    None
4     eva
```


### str.cat

**Clave** `str-cat`

**Definición** Concatena cadenas por fila o reduce una Series a un texto con separador.

**Búsqueda** str.cat, concatenar nombres de productos, pandas texto

**Para recordar** na_rep permite representar faltantes de forma explícita.


#### Concatenar nombres de productos

```python
productos['producto'].str.cat(sep=', ')
```

na_rep permite representar faltantes de forma explícita.

**Resultado comprobado**

```text
Mouse, Teclado, Monitor, Silla
```


### str.upper

**Clave** `str-upper`

**Definición** Convierte cada texto a mayúsculas.

**Búsqueda** str.upper, normalizar códigos de país, pandas texto

**Para recordar** La conversión no modifica la serie de origen.


#### Normalizar códigos de país

```python
clientes['pais'].str.upper()
```

La conversión no modifica la serie de origen.

**Resultado comprobado**

```text
0      MX
1      MX
2      ES
3    None
4      ES
```


### str.len

**Clave** `str-len`

**Definición** Cuenta caracteres de cada texto, incluidos espacios.

**Búsqueda** str.len, medir longitud de nombres, pandas texto

**Para recordar** Los nulos no se convierten en longitud cero.


#### Medir longitud de nombres

```python
clientes['nombre'].str.len()
```

Los nulos no se convierten en longitud cero.

**Resultado comprobado**

```text
0    3
1    4
2    5
3    5
4    3
```


### str.startswith y str.endswith

**Clave** `str-startswith-y-str-endswith`

**Definición** Prueban el prefijo o sufijo literal de cada texto.

**Búsqueda** str.startswith y str.endswith, seleccionar correos del dominio de ejemplo, pandas texto

**Para recordar** No interpretan comodines de SQL.


#### Seleccionar correos del dominio de ejemplo

```python
leads.loc[leads['email'].str.endswith('@ejemplo.com',na=False),'lead_id'].tolist()
```

No interpretan comodines de SQL.

**Resultado comprobado**

```text
[1, 2, 3, 5]
```


## Duplicados y valores únicos

**Clave** `duplicados-y-valores-unicos`


### Definición

**Clave** `definicion`

**Definición** Identifica valores repetidos según una o varias columnas y decide qué registro conservar.

**Búsqueda** duplicados y valores únicos, qué es duplicados y valores únicos, cómo usar duplicados y valores únicos en pandas

**Para recordar** Define primero qué hace único un registro.


#### Contar países distintos

```python
clientes['pais'].unique().tolist(), clientes['pais'].nunique(), clientes['pais'].nunique(dropna=False)
```

Usa dropna=False si la ausencia debe contarse como categoría.

**Resultado comprobado**

```text
(['MX', 'ES', None], 2, 3)
```


### unique y nunique

**Clave** `unique-y-nunique`

**Definición** unique devuelve valores distintos; nunique cuenta distintos y excluye nulos por defecto.

**Búsqueda** unique y nunique, contar países distintos, pandas duplicados y valores únicos

**Para recordar** Usa dropna=False si la ausencia debe contarse como categoría.


#### Contar países distintos

```python
clientes['pais'].unique().tolist(), clientes['pais'].nunique(), clientes['pais'].nunique(dropna=False)
```

Usa dropna=False si la ausencia debe contarse como categoría.

**Resultado comprobado**

```text
(['MX', 'ES', None], 2, 3)
```


### value_counts

**Clave** `value-counts`

**Definición** Cuenta ocurrencias de cada valor; normalize devuelve proporciones.

**Búsqueda** value_counts, contar pedidos por estado, pandas duplicados y valores únicos

**Para recordar** dropna=False incluye el grupo de ausentes.


#### Contar pedidos por estado

```python
pedidos['estado'].value_counts()
```

dropna=False incluye el grupo de ausentes.

**Resultado comprobado**

```text
estado
completado    5
cancelado     2
```


### duplicated

**Clave** `duplicated`

**Definición** Marca repeticiones por columnas seleccionadas; keep=False marca todos los miembros de cada grupo repetido.

**Búsqueda** duplicated, mostrar correos duplicados, pandas duplicados y valores únicos

**Para recordar** No confundir segunda aparición con todos los duplicados.


#### Mostrar correos duplicados

```python
leads.loc[leads.duplicated('email',keep=False), ['lead_id','email']]
```

No confundir segunda aparición con todos los duplicados.

**Resultado comprobado**

```text
   lead_id            email
0        1  ana@ejemplo.com
2        3  ana@ejemplo.com
```


### drop_duplicates

**Clave** `drop-duplicates`

**Definición** Elimina filas repetidas según subset y keep.

**Búsqueda** drop_duplicates, conservar un lead por correo, pandas duplicados y valores únicos

**Para recordar** Ordena antes si debes conservar el registro más reciente.


#### Conservar un lead por correo

```python
leads.drop_duplicates('email',keep='first')[['lead_id','email']]
```

Ordena antes si debes conservar el registro más reciente.

**Resultado comprobado**

```text
   lead_id             email
0        1   ana@ejemplo.com
1        2  luis@ejemplo.com
3        4              None
4        5   eva@ejemplo.com
```


### Duplicados de clave compuesta

**Clave** `duplicados-de-clave-compuesta`

**Definición** Una combinación de campos puede definir la identidad aunque cada campo se repita por separado.

**Búsqueda** duplicados de clave compuesta, comprobar líneas duplicadas, pandas duplicados y valores únicos

**Para recordar** Comprueba la clave al nivel de detalle correcto.


#### Comprobar líneas duplicadas

```python
detalle.duplicated(['pedido_id','producto_id']).sum()
```

Comprueba la clave al nivel de detalle correcto.

**Resultado comprobado**

```text
0
```


## Modificar y transformar columnas

**Clave** `modificar-y-transformar-columnas`


### Definición

**Clave** `definicion`

**Definición** Crea, elimina, renombra o actualiza columnas mediante operaciones que conservan la estructura tabular.

**Búsqueda** modificar y transformar columnas, qué es modificar y transformar columnas, cómo usar modificar y transformar columnas en pandas

**Para recordar** Usa asignaciones explícitas; evita modificar copias accidentales.


#### Calcular ingreso por línea

```python
detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).head(3)
```

Las operaciones entre columnas son elemento a elemento.

**Resultado comprobado**

```text
   pedido_id  producto_id  cantidad  precio_unitario  ingreso
0        101           10         2               25       50
1        101           20         1               50       50
2        102           30         1              200      200
```


### Crear columna y assign

**Clave** `crear-columna-y-assign`

**Definición** Una asignación o assign añade una columna calculada; assign devuelve un nuevo DataFrame.

**Búsqueda** crear columna y assign, calcular ingreso por línea, pandas modificar y transformar columnas

**Para recordar** Las operaciones entre columnas son elemento a elemento.


#### Calcular ingreso por línea

```python
detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).head(3)
```

Las operaciones entre columnas son elemento a elemento.

**Resultado comprobado**

```text
   pedido_id  producto_id  cantidad  precio_unitario  ingreso
0        101           10         2               25       50
1        101           20         1               50       50
2        102           30         1              200      200
```


### rename y set_axis

**Clave** `rename-y-set-axis`

**Definición** rename cambia etiquetas específicas; set_axis reemplaza todas las de un eje.

**Búsqueda** rename y set_axis, cambiar nombres de columnas, pandas modificar y transformar columnas

**Para recordar** Renombrar no convierte valores.


#### Cambiar nombres de columnas

```python
clientes.rename(columns={'nombre':'cliente','pais':'mercado'})[['cliente','mercado']]
```

Renombrar no convierte valores.

**Resultado comprobado**

```text
  cliente mercado
0     Ana      MX
1    Luis      MX
2   Marta      ES
3   Pedro    None
4     Eva      ES
```


### drop

**Clave** `drop`

**Definición** Elimina filas por etiquetas o columnas mediante columns.

**Búsqueda** drop, quitar columna canal, pandas modificar y transformar columnas

**Para recordar** Sin reasignación, el original permanece intacto.


#### Quitar columna canal

```python
pedidos.drop(columns='canal').head(2)
```

Sin reasignación, el original permanece intacto.

**Resultado comprobado**

```text
   pedido_id  cliente_id      fecha  monto      estado
0        101           1 2026-02-01    100  completado
1        102           2 2026-02-01    200  completado
```


### insert

**Clave** `insert`

**Definición** Inserta una columna en una posición concreta y modifica el objeto.

**Búsqueda** insert, insertar moneda en la posición 1, pandas modificar y transformar columnas

**Para recordar** Copia antes si quieres preservar el original.


#### Insertar moneda en la posición 1

```python
tabla = pedidos[['pedido_id','monto']].copy()
tabla.insert(1,'moneda','MXN')
tabla.head(2)
```

Copia antes si quieres preservar el original.

**Resultado comprobado**

```text
   pedido_id moneda  monto
0        101    MXN    100
1        102    MXN    200
```


### Asignar con loc

**Clave** `asignar-con-loc`

**Definición** loc permite actualizar filas que cumplen una máscara.

**Búsqueda** asignar con loc, marcar pedidos grandes, pandas modificar y transformar columnas

**Para recordar** Usa una sola operación loc, no selección encadenada.


#### Marcar pedidos grandes

```python
tabla = pedidos.copy()
tabla.loc[tabla['monto'] >= 200,'segmento'] = 'alto'
tabla[['pedido_id','segmento']]
```

Usa una sola operación loc, no selección encadenada.

**Resultado comprobado**

```text
   pedido_id segmento
0        101      NaN
1        102     alto
2        103      NaN
3        104     alto
4        105      NaN
5        106     alto
6        107      NaN
```


### replace

**Clave** `replace`

**Definición** Sustituye valores completos en celdas, a diferencia de str.replace.

**Búsqueda** replace, traducir estados, pandas modificar y transformar columnas

**Para recordar** Un diccionario permite reemplazos múltiples.


#### Traducir estados

```python
pedidos['estado'].replace({'completado':'OK','cancelado':'NO'})
```

Un diccionario permite reemplazos múltiples.

**Resultado comprobado**

```text
0    OK
1    OK
2    NO
3    OK
4    NO
5    OK
6    OK
```


### map

**Clave** `map`

**Definición** Transforma cada valor de una Series mediante diccionario o función.

**Búsqueda** map, traducir países, pandas modificar y transformar columnas

**Para recordar** Un valor sin clave en el diccionario se convierte en nulo.


#### Traducir países

```python
clientes['pais'].map({'MX':'México','ES':'España'})
```

Un valor sin clave en el diccionario se convierte en nulo.

**Resultado comprobado**

```text
0    México
1    México
2    España
3       NaN
4    España
```


### apply

**Clave** `apply`

**Definición** Aplica una función a valores de una Series o a filas/columnas de un DataFrame.

**Búsqueda** apply, calcular ingresos con una función por fila, pandas modificar y transformar columnas

**Para recordar** axis=1 recorre filas; prefiere operaciones vectorizadas si existen.


#### Calcular ingresos con una función por fila

```python
detalle.head(3).apply(lambda fila: fila['cantidad']*fila['precio_unitario'], axis=1)
```

axis=1 recorre filas; prefiere operaciones vectorizadas si existen.

**Resultado comprobado**

```text
0     50
1     50
2    200
```


### pipe

**Clave** `pipe`

**Definición** Encadena una función que recibe un DataFrame o Series.

**Búsqueda** pipe, encadenar un filtro y selección, pandas modificar y transformar columnas

**Para recordar** La función debe devolver el objeto que necesita el siguiente paso.


#### Encadenar un filtro y selección

```python
pedidos.pipe(lambda t: t[t['estado']=='completado'])[['pedido_id','monto']]
```

La función debe devolver el objeto que necesita el siguiente paso.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
3        104    200
5        106    300
6        107    150
```


### update

**Clave** `update`

**Definición** Actualiza en el sitio valores existentes con datos no nulos alineados por etiquetas.

**Búsqueda** update, corregir un monto por identificador, pandas modificar y transformar columnas

**Para recordar** No agrega nuevas filas ni columnas.


#### Corregir un monto por identificador

```python
tabla = pedidos.set_index('pedido_id')[['monto']].copy()
tabla.update(pd.DataFrame({'monto':[110]},index=[101]))
tabla.head(2)
```

No agrega nuevas filas ni columnas.

**Resultado comprobado**

```text
           monto
pedido_id       
101          110
102          200
```


## Condicionales

**Clave** `condicionales`


### Definición

**Clave** `definicion`

**Definición** Las máscaras y funciones condicionales crean valores según reglas de negocio.

**Búsqueda** condicionales, qué es condicionales, cómo usar condicionales en pandas

**Para recordar** Define condiciones y qué ocurre cuando ninguna se cumple.


#### Clasificar pedidos altos y bajos

```python
pedidos.assign(segmento=np.where(pedidos['monto']>=200,'alto','bajo'))[['pedido_id','segmento']]
```

Es NumPy; devuelve un arreglo por posición.

**Resultado comprobado**

```text
   pedido_id segmento
0        101     bajo
1        102     alto
2        103     bajo
3        104     alto
4        105     bajo
5        106     alto
6        107     bajo
```


### np.where

**Clave** `np-where`

**Definición** Selecciona un valor si la condición es verdadera y otro si es falsa.

**Búsqueda** np.where, clasificar pedidos altos y bajos, pandas condicionales

**Para recordar** Es NumPy; devuelve un arreglo por posición.


#### Clasificar pedidos altos y bajos

```python
pedidos.assign(segmento=np.where(pedidos['monto']>=200,'alto','bajo'))[['pedido_id','segmento']]
```

Es NumPy; devuelve un arreglo por posición.

**Resultado comprobado**

```text
   pedido_id segmento
0        101     bajo
1        102     alto
2        103     bajo
3        104     alto
4        105     bajo
5        106     alto
6        107     bajo
```


### np.select

**Clave** `np-select`

**Definición** Evalúa varias condiciones en orden y utiliza la primera verdadera.

**Búsqueda** np.select, crear tres segmentos de importe, pandas condicionales

**Para recordar** Coloca los umbrales más restrictivos primero.


#### Crear tres segmentos de importe

```python
condiciones = [pedidos['monto']>=200,pedidos['monto']>=100]
pedidos.assign(segmento=np.select(condiciones,['alto','medio'],default='bajo'))[['pedido_id','segmento']]
```

Coloca los umbrales más restrictivos primero.

**Resultado comprobado**

```text
   pedido_id segmento
0        101    medio
1        102     alto
2        103    medio
3        104     alto
4        105     bajo
5        106     alto
6        107    medio
```


### where y mask

**Clave** `where-y-mask`

**Definición** where conserva valores donde la condición es verdadera; mask los reemplaza donde es verdadera.

**Búsqueda** where y mask, poner a cero los importes cancelados, pandas condicionales

**Para recordar** where y mask son operaciones inversas para una misma condición.


#### Poner a cero los importes cancelados

```python
pedidos['monto'].where(pedidos['estado']=='completado',0)
```

where y mask son operaciones inversas para una misma condición.

**Resultado comprobado**

```text
0    100
1    200
2      0
3    200
4      0
5    300
6    150
```


### mask

**Clave** `mask`

**Definición** Reemplaza valores donde la condición es verdadera.

**Búsqueda** mask, sustituir montos cancelados por cero, pandas condicionales

**Para recordar** Es la inversa de where para una máscara booleana sin nulos.


#### Sustituir montos cancelados por cero

```python
pedidos['monto'].mask(pedidos['estado']=='cancelado',0)
```

Es la inversa de where para una máscara booleana sin nulos.

**Resultado comprobado**

```text
0    100
1    200
2      0
3    200
4      0
5    300
6    150
```


## Funciones numéricas

**Clave** `funciones-numericas`


### Definición

**Clave** `definicion`

**Definición** Las operaciones aritméticas y funciones numéricas calculan nuevos valores de forma vectorizada.

**Búsqueda** funciones numéricas, qué es funciones numéricas, cómo usar funciones numéricas en pandas

**Para recordar** Define el tratamiento de ceros y nulos antes de dividir.


#### Aplicar un descuento del 10 %

```python
(productos['precio']*0.9).round(2)
```

Una operación vectorizada evita un bucle manual.

**Resultado comprobado**

```text
0     22.5
1     45.0
2    180.0
3    108.0
```


### Aritmética y broadcasting

**Clave** `aritmetica-y-broadcasting`

**Definición** Opera entre columnas o aplica un escalar a todos los valores.

**Búsqueda** aritmética y broadcasting, aplicar un descuento del 10 %, pandas funciones numéricas

**Para recordar** Una operación vectorizada evita un bucle manual.


#### Aplicar un descuento del 10 %

```python
(productos['precio']*0.9).round(2)
```

Una operación vectorizada evita un bucle manual.

**Resultado comprobado**

```text
0     22.5
1     45.0
2    180.0
3    108.0
```


### round y abs

**Clave** `round-y-abs`

**Definición** round ajusta decimales; abs devuelve magnitudes sin signo.

**Búsqueda** round y abs, redondear diferencias de precio, pandas funciones numéricas

**Para recordar** El redondeo no sustituye un tipo decimal para contabilidad exacta.


#### Redondear diferencias de precio

```python
(productos['precio']-100).abs().round(2)
```

El redondeo no sustituye un tipo decimal para contabilidad exacta.

**Resultado comprobado**

```text
0     75
1     50
2    100
3     20
```


### División segura

**Clave** `division-segura`

**Definición** Reemplaza denominadores cero por nulos antes de dividir.

**Búsqueda** división segura, calcular tasa de conversión, pandas funciones numéricas

**Para recordar** Un ratio indefinido no equivale a cero.


#### Calcular tasa de conversión

```python
visitas = pd.Series([10,0,20])
compras = pd.Series([2,0,5])
(compras / visitas.replace(0,np.nan)*100).round(2)
```

Un ratio indefinido no equivale a cero.

**Resultado comprobado**

```text
0    20.0
1     NaN
2    25.0
```


### clip

**Clave** `clip`

**Definición** Limita valores a un mínimo o máximo elegido.

**Búsqueda** clip, limitar montos para un escenario, pandas funciones numéricas

**Para recordar** No borra filas; modifica extremos en el resultado.


#### Limitar montos para un escenario

```python
pedidos['monto'].clip(lower=100,upper=200)
```

No borra filas; modifica extremos en el resultado.

**Resultado comprobado**

```text
0    100
1    200
2    150
3    200
4    100
5    200
6    150
```


## Agregaciones

**Clave** `agregaciones`


### Definición

**Clave** `definicion`

**Definición** Las agregaciones resumen varios valores en uno o varios resultados estadísticos.

**Búsqueda** agregaciones, qué es agregaciones, cómo usar agregaciones en pandas

**Para recordar** A diferencia de una operación elemento a elemento, reducen filas.


#### Comparar conteos de país

```python
clientes['pais'].count(), clientes['pais'].size
```

Equivalen a COUNT(columna) y COUNT(*) en una Series.

**Resultado comprobado**

```text
(4, 5)
```


### count y size

**Clave** `count-y-size`

**Definición** count cuenta valores no nulos; size cuenta elementos incluidos los nulos.

**Búsqueda** count y size, comparar conteos de país, pandas agregaciones

**Para recordar** Equivalen a COUNT(columna) y COUNT(*) en una Series.


#### Comparar conteos de país

```python
clientes['pais'].count(), clientes['pais'].size
```

Equivalen a COUNT(columna) y COUNT(*) en una Series.

**Resultado comprobado**

```text
(4, 5)
```


### sum y mean

**Clave** `sum-y-mean`

**Definición** sum suma; mean calcula la media aritmética de los valores presentes.

**Búsqueda** sum y mean, calcular venta total y ticket medio, pandas agregaciones

**Para recordar** Por defecto omiten faltantes; sum(min_count=1) evita sumar un grupo vacío a cero.


#### Calcular venta total y ticket medio

```python
pedidos['monto'].agg(['sum','mean']).round(2)
```

Por defecto omiten faltantes; sum(min_count=1) evita sumar un grupo vacío a cero.

**Resultado comprobado**

```text
sum     1150.00
mean     164.29
```


### min, max y median

**Clave** `min-max-y-median`

**Definición** min y max devuelven extremos; median el valor central ordenado.

**Búsqueda** min, max y median, resumir montos, pandas agregaciones

**Para recordar** La mediana es menos sensible a extremos que la media.


#### Resumir montos

```python
pedidos['monto'].agg(['min','max','median'])
```

La mediana es menos sensible a extremos que la media.

**Resultado comprobado**

```text
min        50.0
max       300.0
median    150.0
```


### std y var

**Clave** `std-y-var`

**Definición** Miden dispersión mediante desviación estándar y varianza; ddof=1 es el valor muestral por defecto.

**Búsqueda** std y var, medir dispersión de montos, pandas agregaciones

**Para recordar** Usa ddof=0 para una población completa cuando proceda.


#### Medir dispersión de montos

```python
pedidos['monto'].agg(['std','var']).round(2)
```

Usa ddof=0 para una población completa cuando proceda.

**Resultado comprobado**

```text
std      80.18
var    6428.57
```


### agg

**Clave** `agg`

**Definición** Aplica una o más agregaciones; puede usar un diccionario por columna.

**Búsqueda** agg, resumir precios y cantidades, pandas agregaciones

**Para recordar** Una llamada puede producir varias métricas.


#### Resumir precios y cantidades

```python
detalle.agg({'cantidad':'sum','precio_unitario':'mean'}).round(2)
```

Una llamada puede producir varias métricas.

**Resultado comprobado**

```text
cantidad           16.00
precio_unitario    94.44
```


### axis y skipna

**Clave** `axis-y-skipna`

**Definición** axis=0 calcula por columna; axis=1 por fila; skipna controla omisión de faltantes.

**Búsqueda** axis y skipna, sumar ingresos de dos canales por día, pandas agregaciones

**Para recordar** El eje especifica qué dimensión se reduce.


#### Sumar ingresos de dos canales por día

```python
t = pd.DataFrame({'web':[100,200],'tienda':[50,np.nan]})
t.sum(axis=1).tolist()
```

El eje especifica qué dimensión se reduce.

**Resultado comprobado**

```text
[150.0, 200.0]
```


### min_count

**Clave** `min-count`

**Definición** Controla cuántos valores válidos necesita sum para devolver un resultado.

**Búsqueda** min_count, distinguir cero de ausencia, pandas agregaciones

**Para recordar** Evita convertir un conjunto sin datos en un cero aparente.


#### Distinguir cero de ausencia

```python
s = pd.Series([np.nan,np.nan])
s.sum(), s.sum(min_count=1)
```

Evita convertir un conjunto sin datos en un cero aparente.

**Resultado comprobado**

```text
(0.0, nan)
```


## Agrupaciones

**Clave** `agrupaciones`


### Definición

**Clave** `definicion`

**Definición** groupby divide filas por claves y permite calcular métricas para cada grupo.

**Búsqueda** agrupaciones, qué es agrupaciones, cómo usar agrupaciones en pandas

**Para recordar** Equivale conceptualmente a GROUP BY de SQL para agregaciones.


#### Sumar montos por cliente y estado

```python
pedidos.groupby(['cliente_id','estado'])['monto'].sum().reset_index(name='total')
```

Cada combinación de claves forma un grupo.

**Resultado comprobado**

```text
   cliente_id      estado  total
0           1   cancelado    150
1           1  completado    250
2           2   cancelado     50
3           2  completado    200
4           3  completado    500
```


### Agrupar por una o varias columnas

**Clave** `agrupar-por-una-o-varias-columnas`

**Definición** Una clave o lista de claves define los grupos de filas.

**Búsqueda** agrupar por una o varias columnas, sumar montos por cliente y estado, pandas agrupaciones

**Para recordar** Cada combinación de claves forma un grupo.


#### Sumar montos por cliente y estado

```python
pedidos.groupby(['cliente_id','estado'])['monto'].sum().reset_index(name='total')
```

Cada combinación de claves forma un grupo.

**Resultado comprobado**

```text
   cliente_id      estado  total
0           1   cancelado    150
1           1  completado    250
2           2   cancelado     50
3           2  completado    200
4           3  completado    500
```


### agg con nombres

**Clave** `agg-con-nombres`

**Definición** Permite asignar nombres claros a métricas de distintas columnas.

**Búsqueda** agg con nombres, crear un resumen de clientes, pandas agrupaciones

**Para recordar** Cada par contiene columna y función.


#### Crear un resumen de clientes

```python
pedidos.groupby('cliente_id',as_index=False).agg(total=('monto','sum'),pedidos=('pedido_id','size'),promedio=('monto','mean')).round(2)
```

Cada par contiene columna y función.

**Resultado comprobado**

```text
   cliente_id  total  pedidos  promedio
0           1    400        3    133.33
1           2    250        2    125.00
2           3    500        2    250.00
```


### size, count y nunique por grupo

**Clave** `size-count-y-nunique-por-grupo`

**Definición** size cuenta filas, count no nulos y nunique valores distintos.

**Búsqueda** size, count y nunique por grupo, contar canales por estado, pandas agrupaciones

**Para recordar** Elige el denominador correcto para la métrica.


#### Contar canales por estado

```python
pedidos.groupby('estado').agg(filas=('canal','size'),canales_presentes=('canal','count'),canales_distintos=('canal','nunique'))
```

Elige el denominador correcto para la métrica.

**Resultado comprobado**

```text
            filas  canales_presentes  canales_distintos
estado                                                 
cancelado       2                  2                  2
completado      5                  4                  2
```


### Grupos con nulos

**Clave** `grupos-con-nulos`

**Definición** groupby omite claves nulas por defecto; dropna=False las incluye.

**Búsqueda** grupos con nulos, incluir canal desconocido, pandas agrupaciones

**Para recordar** No pierdas el grupo de datos desconocidos por accidente.


#### Incluir canal desconocido

```python
pedidos.groupby('canal',dropna=False)['monto'].sum()
```

No pierdas el grupo de datos desconocidos por accidente.

**Resultado comprobado**

```text
canal
tienda    250
web       600
NaN       300
```


### filter y HAVING

**Clave** `filter-y-having`

**Definición** filter conserva las filas de grupos que cumplen una condición; también puedes filtrar una tabla ya agregada.

**Búsqueda** filter y having, conservar pedidos de clientes con al menos tres, pandas agrupaciones

**Para recordar** filter devuelve filas originales, no una fila por grupo.


#### Conservar pedidos de clientes con al menos tres

```python
pedidos.groupby('cliente_id').filter(lambda g: len(g)>=3)[['pedido_id','cliente_id']]
```

filter devuelve filas originales, no una fila por grupo.

**Resultado comprobado**

```text
   pedido_id  cliente_id
0        101           1
2        103           1
6        107           1
```


### transform

**Clave** `transform`

**Definición** Calcula un valor por grupo y lo devuelve alineado con cada fila original.

**Búsqueda** transform, añadir total de cada cliente a sus pedidos, pandas agrupaciones

**Para recordar** transform conserva el número de filas.


#### Añadir total de cada cliente a sus pedidos

```python
pedidos.assign(total_cliente=pedidos.groupby('cliente_id')['monto'].transform('sum'))[['pedido_id','cliente_id','total_cliente']]
```

transform conserva el número de filas.

**Resultado comprobado**

```text
   pedido_id  cliente_id  total_cliente
0        101           1            400
1        102           2            250
2        103           1            400
3        104           3            500
4        105           2            250
5        106           3            500
6        107           1            400
```


### first, last y nth

**Clave** `first-last-y-nth`

**Definición** first y last toman los primeros o últimos valores no nulos por columna; nth selecciona una fila por posición dentro del grupo.

**Búsqueda** first, last y nth, obtener el primer pedido de cada cliente, pandas agrupaciones

**Para recordar** Para una fila completa usa nth después de ordenar.


#### Obtener el primer pedido de cada cliente

```python
pedidos.sort_values(['fecha','pedido_id']).groupby('cliente_id').nth(0)[['cliente_id','pedido_id','fecha']]
```

Para una fila completa usa nth después de ordenar.

**Resultado comprobado**

```text
   cliente_id  pedido_id      fecha
0           1        101 2026-02-01
1           2        102 2026-02-01
3           3        104 2026-02-03
```


### idxmin e idxmax

**Clave** `idxmin-e-idxmax`

**Definición** Devuelven las etiquetas del índice donde ocurre el mínimo o máximo de cada grupo.

**Búsqueda** idxmin e idxmax, recuperar el pedido más caro por cliente, pandas agrupaciones

**Para recordar** Con empates eligen la primera ocurrencia.


#### Recuperar el pedido más caro por cliente

```python
idx = pedidos.groupby('cliente_id')['monto'].idxmax()
pedidos.loc[idx,['cliente_id','pedido_id','monto']]
```

Con empates eligen la primera ocurrencia.

**Resultado comprobado**

```text
   cliente_id  pedido_id  monto
2           1        103    150
1           2        102    200
5           3        106    300
```


### groupby.apply

**Clave** `groupby-apply`

**Definición** Ejecuta una función sobre cada grupo cuando agg o transform no expresan fácilmente el cálculo.

**Búsqueda** groupby.apply, calcular amplitud de montos por cliente, pandas agrupaciones

**Para recordar** La salida puede cambiar de forma según la función.


**Nota** En pandas 2.2 se desaconseja incluir las columnas de agrupación dentro de DataFrameGroupBy.apply; selecciona las columnas necesarias o usa include_groups=False donde corresponda.


#### Calcular amplitud de montos por cliente

```python
pedidos.groupby('cliente_id')['monto'].apply(lambda s: s.max()-s.min())
```

La salida puede cambiar de forma según la función.

**Resultado comprobado**

```text
cliente_id
1     50
2    150
3    100
```


### Filtrar una tabla agregada

**Clave** `filtrar-una-tabla-agregada`

**Definición** Tras agg puedes seleccionar los grupos que cumplen una condición, como HAVING en SQL.

**Búsqueda** filtrar una tabla agregada, mostrar clientes con gasto total superior a 400, pandas agrupaciones

**Para recordar** Primero calcula la métrica; después filtra el resumen.


#### Mostrar clientes con gasto total superior a 400

```python
t = pedidos.groupby('cliente_id',as_index=False)['monto'].sum()
t.loc[t['monto']>400]
```

Primero calcula la métrica; después filtra el resumen.

**Resultado comprobado**

```text
   cliente_id  monto
2           3    500
```


### first y last

**Clave** `first-y-last`

**Definición** Obtienen el primer o último valor no nulo de cada columna dentro del grupo.

**Búsqueda** first y last, comparar primer y último monto por cliente, pandas agrupaciones

**Para recordar** Pueden seleccionar valores de distintas filas; usa nth si necesitas una fila completa.


#### Comparar primer y último monto por cliente

```python
pedidos.sort_values(['fecha','pedido_id']).groupby('cliente_id')['monto'].agg(['first','last'])
```

Pueden seleccionar valores de distintas filas; usa nth si necesitas una fila completa.

**Resultado comprobado**

```text
            first  last
cliente_id             
1             100   150
2             200    50
3             200   300
```


## merge y relaciones

**Clave** `merge-y-relaciones`


### Definición

**Clave** `definicion`

**Definición** merge combina tablas mediante claves compartidas, como un JOIN de SQL.

**Búsqueda** merge y relaciones, qué es merge y relaciones, cómo usar merge y relaciones en pandas

**Para recordar** La cardinalidad de las claves determina cuántas filas resultan.


#### Traer nombres a pedidos

```python
pedidos.merge(clientes[['cliente_id','nombre']],on='cliente_id',how='inner')[['pedido_id','nombre']]
```

Una fila puede coincidir con varias del otro lado.

**Resultado comprobado**

```text
   pedido_id nombre
0        101    Ana
1        102   Luis
2        103    Ana
3        104  Marta
4        105   Luis
5        106  Marta
6        107    Ana
```


### inner y on

**Clave** `inner-y-on`

**Definición** inner conserva coincidencias; on indica la clave común.

**Búsqueda** inner y on, traer nombres a pedidos, pandas merge y relaciones

**Para recordar** Una fila puede coincidir con varias del otro lado.


#### Traer nombres a pedidos

```python
pedidos.merge(clientes[['cliente_id','nombre']],on='cliente_id',how='inner')[['pedido_id','nombre']]
```

Una fila puede coincidir con varias del otro lado.

**Resultado comprobado**

```text
   pedido_id nombre
0        101    Ana
1        102   Luis
2        103    Ana
3        104  Marta
4        105   Luis
5        106  Marta
6        107    Ana
```


### left y right

**Clave** `left-y-right`

**Definición** left conserva filas de la izquierda; right las de la derecha, incluso sin pareja.

**Búsqueda** left y right, mostrar clientes con o sin pedido, pandas merge y relaciones

**Para recordar** Los campos del lado sin coincidencia quedan nulos.


#### Mostrar clientes con o sin pedido

```python
clientes[['cliente_id','nombre']].merge(pedidos[['cliente_id','pedido_id']],on='cliente_id',how='left',sort=False)
```

Los campos del lado sin coincidencia quedan nulos.

**Resultado comprobado**

```text
   cliente_id nombre  pedido_id
0           1    Ana      101.0
1           1    Ana      103.0
2           1    Ana      107.0
3           2   Luis      102.0
4           2   Luis      105.0
5           3  Marta      104.0
6           3  Marta      106.0
7           4  Pedro        NaN
8           5    Eva        NaN
```


### outer y cross

**Clave** `outer-y-cross`

**Definición** outer conserva claves de ambos lados; cross genera todas las combinaciones sin clave.

**Búsqueda** outer y cross, combinar todos los canales y países, pandas merge y relaciones

**Para recordar** Un producto cartesiano multiplica el número de filas.


#### Combinar todos los canales y países

```python
pd.DataFrame({'canal':['web','tienda']}).merge(pd.DataFrame({'pais':['MX','ES']}),how='cross')
```

Un producto cartesiano multiplica el número de filas.

**Resultado comprobado**

```text
    canal pais
0     web   MX
1     web   ES
2  tienda   MX
3  tienda   ES
```


### left_on, right_on y suffixes

**Clave** `left-on-right-on-y-suffixes`

**Definición** Permiten unir columnas con nombres diferentes y distinguir columnas de nombre repetido.

**Búsqueda** left_on, right_on y suffixes, unir claves con nombres distintos, pandas merge y relaciones

**Para recordar** Indica las claves explícitamente para evitar uniones accidentales.


#### Unir claves con nombres distintos

```python
c = clientes[['cliente_id','nombre']].rename(columns={'cliente_id':'id'})
pedidos[['pedido_id','cliente_id']].merge(c,left_on='cliente_id',right_on='id').head(3)
```

Indica las claves explícitamente para evitar uniones accidentales.

**Resultado comprobado**

```text
   pedido_id  cliente_id  id nombre
0        101           1   1    Ana
1        102           2   2   Luis
2        103           1   1    Ana
```


### validate y cardinalidad

**Clave** `validate-y-cardinalidad`

**Definición** validate comprueba si la relación es 1:1, 1:m o m:1.

**Búsqueda** validate y cardinalidad, validar muchos pedidos para un cliente, pandas merge y relaciones

**Para recordar** Una unión m:m puede multiplicar importes sin que sea un error de sintaxis.


#### Validar muchos pedidos para un cliente

```python
pedidos.merge(clientes,on='cliente_id',validate='many_to_one').shape
```

Una unión m:m puede multiplicar importes sin que sea un error de sintaxis.

**Resultado comprobado**

```text
(7, 9)
```


### indicator y anti join

**Clave** `indicator-y-anti-join`

**Definición** indicator crea una columna con el origen de cada fila; permite localizar claves sin pareja.

**Búsqueda** indicator y anti join, detectar clientes sin pedidos, pandas merge y relaciones

**Para recordar** left_only identifica filas exclusivas de la izquierda.


#### Detectar clientes sin pedidos

```python
t = clientes[['cliente_id','nombre']].merge(pedidos[['cliente_id']].drop_duplicates(),on='cliente_id',how='left',indicator=True)
t.loc[t['_merge']=='left_only',['cliente_id','nombre']]
```

left_only identifica filas exclusivas de la izquierda.

**Resultado comprobado**

```text
   cliente_id nombre
3           4  Pedro
4           5    Eva
```


### Claves nulas en merge

**Clave** `claves-nulas-en-merge`

**Definición** Pandas puede hacer coincidir claves nulas entre sí, a diferencia del JOIN SQL habitual.

**Búsqueda** claves nulas en merge, observar coincidencia de dos claves ausentes, pandas merge y relaciones

**Para recordar** Filtra claves nulas antes de unir si no representan una relación válida.


#### Observar coincidencia de dos claves ausentes

```python
pd.DataFrame({'id':[1,None]}).merge(pd.DataFrame({'id':[None,2]}),on='id')
```

Filtra claves nulas antes de unir si no representan una relación válida.

**Resultado comprobado**

```text
   id
0 NaN
```


### Unión de varias tablas

**Clave** `union-de-varias-tablas`

**Definición** Encadena merge conservando las claves necesarias para la siguiente relación.

**Búsqueda** unión de varias tablas, obtener ingreso por categoría, pandas merge y relaciones

**Para recordar** Comprueba el nivel de detalle antes de sumar.


#### Obtener ingreso por categoría

```python
t = detalle.merge(pedidos[['pedido_id','estado']],on='pedido_id',validate='many_to_one').merge(productos[['producto_id','categoria']],on='producto_id',validate='many_to_one')
t = t[t['estado']=='completado'].assign(ingreso=lambda x:x['cantidad']*x['precio_unitario'])
t.groupby('categoria')['ingreso'].sum()
```

Comprueba el nivel de detalle antes de sumar.

**Resultado comprobado**

```text
categoria
Tec    950
```


### RIGHT JOIN

**Clave** `right-join`

**Definición** how='right' conserva las filas del DataFrame derecho, tengan pareja o no.

**Búsqueda** right join, conservar todos los clientes del lado derecho, pandas merge y relaciones

**Para recordar** Equivale a invertir los objetos de un left merge.


#### Conservar todos los clientes del lado derecho

```python
pedidos[['cliente_id','pedido_id']].merge(clientes[['cliente_id','nombre']],on='cliente_id',how='right')
```

Equivale a invertir los objetos de un left merge.

**Resultado comprobado**

```text
   cliente_id  pedido_id nombre
0           1      101.0    Ana
1           1      103.0    Ana
2           1      107.0    Ana
3           2      102.0   Luis
4           2      105.0   Luis
5           3      104.0  Marta
6           3      106.0  Marta
7           4        NaN  Pedro
8           5        NaN    Eva
```


### FULL OUTER JOIN

**Clave** `full-outer-join`

**Definición** how='outer' conserva claves de ambos lados y rellena faltantes.

**Búsqueda** full outer join, comparar catálogos de dos fuentes, pandas merge y relaciones

**Para recordar** No elimina claves exclusivas de un origen.


#### Comparar catálogos de dos fuentes

```python
a = pd.DataFrame({'id':[1,2],'precio':[10,20]})
b = pd.DataFrame({'id':[2,3],'stock':[5,8]})
a.merge(b,on='id',how='outer',indicator=True)
```

No elimina claves exclusivas de un origen.

**Resultado comprobado**

```text
   id  precio  stock      _merge
0   1    10.0    NaN   left_only
1   2    20.0    5.0        both
2   3     NaN    8.0  right_only
```


### Sufijos y columnas homónimas

**Clave** `sufijos-y-columnas-homonimas`

**Definición** suffixes distingue columnas no clave que tienen el mismo nombre.

**Búsqueda** sufijos y columnas homónimas, comparar precios históricos y actuales, pandas merge y relaciones

**Para recordar** Elige nombres que identifiquen su fuente.


#### Comparar precios históricos y actuales

```python
a = pd.DataFrame({'id':[1,2],'precio':[10,20]})
b = pd.DataFrame({'id':[1,2],'precio':[12,18]})
a.merge(b,on='id',suffixes=('_anterior','_actual'))
```

Elige nombres que identifiquen su fuente.

**Resultado comprobado**

```text
   id  precio_anterior  precio_actual
0   1               10             12
1   2               20             18
```


## join y concat

**Clave** `join-y-concat`


### Definición

**Clave** `definicion`

**Definición** join combina principalmente por índice; concat apila objetos por filas o columnas.

**Búsqueda** join y concat, qué es join y concat, cómo usar join y concat en pandas

**Para recordar** merge relaciona claves; concat agrega bloques.


#### Añadir país por identificador

```python
pedidos[['pedido_id','cliente_id']].join(clientes.set_index('cliente_id')['pais'],on='cliente_id').head(3)
```

Asegura que los índices representen las mismas entidades.

**Resultado comprobado**

```text
   pedido_id  cliente_id pais
0        101           1   MX
1        102           2   MX
2        103           1   MX
```


### join

**Clave** `join`

**Definición** Combina una tabla con otra usando índices por defecto.

**Búsqueda** join, añadir país por identificador, pandas join y concat

**Para recordar** Asegura que los índices representen las mismas entidades.


#### Añadir país por identificador

```python
pedidos[['pedido_id','cliente_id']].join(clientes.set_index('cliente_id')['pais'],on='cliente_id').head(3)
```

Asegura que los índices representen las mismas entidades.

**Resultado comprobado**

```text
   pedido_id  cliente_id pais
0        101           1   MX
1        102           2   MX
2        103           1   MX
```


### concat por filas

**Clave** `concat-por-filas`

**Definición** concat con axis=0 apila tablas y alinea columnas por nombre.

**Búsqueda** concat por filas, unir dos lotes de pedidos, pandas join y concat

**Para recordar** ignore_index=True crea un nuevo índice consecutivo.


#### Unir dos lotes de pedidos

```python
pd.concat([pedidos.head(2),pedidos.tail(1)],ignore_index=True)[['pedido_id','monto']]
```

ignore_index=True crea un nuevo índice consecutivo.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
2        107    150
```


### concat por columnas

**Clave** `concat-por-columnas`

**Definición** concat con axis=1 alinea filas por índice y añade columnas.

**Búsqueda** concat por columnas, combinar dos series por etiqueta, pandas join y concat

**Para recordar** No equivale a unir por posición si los índices difieren.


#### Combinar dos series por etiqueta

```python
pd.concat([pd.Series({'web':100},name='ventas'),pd.Series({'tienda':5,'web':2},name='pedidos')],axis=1)
```

No equivale a unir por posición si los índices difieren.

**Resultado comprobado**

```text
        ventas  pedidos
web      100.0        2
tienda     NaN        5
```


### merge_ordered

**Clave** `merge-ordered`

**Definición** Combina datos ordenados, especialmente series con claves temporales.

**Búsqueda** merge_ordered, unir ventas y metas por fecha, pandas join y concat

**Para recordar** fill_method='ffill' puede propagar valores anteriores; úsalo con sentido de negocio.


#### Unir ventas y metas por fecha

```python
a = pd.DataFrame({'dia':[1,3],'ventas':[100,300]})
b = pd.DataFrame({'dia':[2,3],'meta':[150,250]})
pd.merge_ordered(a,b,on='dia')
```

fill_method='ffill' puede propagar valores anteriores; úsalo con sentido de negocio.

**Resultado comprobado**

```text
   dia  ventas   meta
0    1   100.0    NaN
1    2     NaN  150.0
2    3   300.0  250.0
```


### merge_asof

**Clave** `merge-asof`

**Definición** Une cada fila con la clave temporal más cercana según una dirección y tolerancia.

**Búsqueda** merge_asof, asignar el precio vigente a una venta, pandas join y concat

**Para recordar** Las claves de unión deben estar ordenadas.


#### Asignar el precio vigente a una venta

```python
a = pd.DataFrame({'dia':[2,4],'venta':[100,200]})
b = pd.DataFrame({'dia':[1,3],'tarifa':[10,12]})
pd.merge_asof(a,b,on='dia',direction='backward')
```

Las claves de unión deben estar ordenadas.

**Resultado comprobado**

```text
   dia  venta  tarifa
0    2    100      10
1    4    200      12
```


## Reestructuración de tablas

**Clave** `reestructuracion-de-tablas`


### Definición

**Clave** `definicion`

**Definición** Cambiar la forma permite pasar de registros largos a matrices anchas y viceversa.

**Búsqueda** reestructuración de tablas, qué es reestructuración de tablas, cómo usar reestructuración de tablas en pandas

**Para recordar** Elige una forma que conserve el nivel de detalle.


#### Convertir metas en columnas

```python
t = pd.DataFrame({'mes':['feb','feb','mar'],'canal':['web','tienda','web'],'meta':[100,200,300]})
t.pivot(index='mes',columns='canal',values='meta')
```

Si hay duplicados, usa pivot_table con una agregación.

**Resultado comprobado**

```text
canal  tienda    web
mes                 
feb     200.0  100.0
mar       NaN  300.0
```


### pivot

**Clave** `pivot`

**Definición** Convierte valores de una columna en encabezados; exige una combinación única de índice y columna.

**Búsqueda** pivot, convertir metas en columnas, pandas reestructuración de tablas

**Para recordar** Si hay duplicados, usa pivot_table con una agregación.


#### Convertir metas en columnas

```python
t = pd.DataFrame({'mes':['feb','feb','mar'],'canal':['web','tienda','web'],'meta':[100,200,300]})
t.pivot(index='mes',columns='canal',values='meta')
```

Si hay duplicados, usa pivot_table con una agregación.

**Resultado comprobado**

```text
canal  tienda    web
mes                 
feb     200.0  100.0
mar       NaN  300.0
```


### pivot_table

**Clave** `pivot-table`

**Definición** Construye una tabla dinámica agregando valores repetidos con aggfunc.

**Búsqueda** pivot_table, calcular ventas por cliente y estado, pandas reestructuración de tablas

**Para recordar** La agregación predeterminada es mean; especifica sum para ingresos.


#### Calcular ventas por cliente y estado

```python
pedidos.pivot_table(index='cliente_id',columns='estado',values='monto',aggfunc='sum',fill_value=0)
```

La agregación predeterminada es mean; especifica sum para ingresos.

**Resultado comprobado**

```text
estado      cancelado  completado
cliente_id                       
1                 150         250
2                  50         200
3                   0         500
```


### crosstab

**Clave** `crosstab`

**Definición** Construye una tabla de frecuencias entre variables.

**Búsqueda** crosstab, contar pedidos por cliente y estado, pandas reestructuración de tablas

**Para recordar** normalize permite convertir conteos en proporciones.


#### Contar pedidos por cliente y estado

```python
pd.crosstab(pedidos['cliente_id'],pedidos['estado'])
```

normalize permite convertir conteos en proporciones.

**Resultado comprobado**

```text
estado      cancelado  completado
cliente_id                       
1                   1           2
2                   1           1
3                   0           2
```


### melt

**Clave** `melt`

**Definición** Convierte columnas de medidas en filas, conservando identificadores.

**Búsqueda** melt, pasar presupuesto a formato largo, pandas reestructuración de tablas

**Para recordar** id_vars identifica; value_vars indica columnas a transformar.


#### Pasar presupuesto a formato largo

```python
t = pd.DataFrame({'canal':['web','tienda'],'feb':[100,200],'mar':[150,250]})
t.melt(id_vars='canal',var_name='mes',value_name='presupuesto')
```

id_vars identifica; value_vars indica columnas a transformar.

**Resultado comprobado**

```text
    canal  mes  presupuesto
0     web  feb          100
1  tienda  feb          200
2     web  mar          150
3  tienda  mar          250
```


### stack y unstack

**Clave** `stack-y-unstack`

**Definición** Mueven un nivel entre columnas e índice.

**Búsqueda** stack y unstack, convertir ventas agrupadas en matriz, pandas reestructuración de tablas

**Para recordar** stack pasa columnas a filas; unstack hace lo inverso.


#### Convertir ventas agrupadas en matriz

```python
pedidos.groupby(['cliente_id','estado'])['monto'].sum().unstack(fill_value=0)
```

stack pasa columnas a filas; unstack hace lo inverso.

**Resultado comprobado**

```text
estado      cancelado  completado
cliente_id                       
1                 150         250
2                  50         200
3                   0         500
```


### explode

**Clave** `explode`

**Definición** Expande cada elemento de una lista en una celda a una fila.

**Búsqueda** explode, separar etiquetas de campañas, pandas reestructuración de tablas

**Para recordar** Las otras columnas y el índice original pueden repetirse.


#### Separar etiquetas de campañas

```python
pd.DataFrame({'campana':['A','B'],'etiquetas':[['web','email'],['tienda']]}).explode('etiquetas',ignore_index=True)
```

Las otras columnas y el índice original pueden repetirse.

**Resultado comprobado**

```text
  campana etiquetas
0       A       web
1       A     email
2       B    tienda
```


### Transponer

**Clave** `transponer`

**Definición** T intercambia filas y columnas.

**Búsqueda** transponer, transponer precios, pandas reestructuración de tablas

**Para recordar** Si se mezclan tipos, pueden cambiar los tipos resultantes.


#### Transponer precios

```python
productos.set_index('producto')['precio'].head(2).to_frame().T
```

Si se mezclan tipos, pueden cambiar los tipos resultantes.

**Resultado comprobado**

```text
producto  Mouse  Teclado
precio       25       50
```


### stack

**Clave** `stack`

**Definición** Mueve un nivel de columnas al índice de filas.

**Búsqueda** stack, pasar una matriz a una serie con dos niveles, pandas reestructuración de tablas

**Para recordar** future_stack=True en pandas 2.2 usa la implementación nueva, predeterminada en pandas 3.0.


#### Pasar una matriz a una serie con dos niveles

```python
t = pd.DataFrame({'web':[10,20],'tienda':[30,40]},index=['feb','mar'])
t.stack(future_stack=True)
```

future_stack=True en pandas 2.2 usa la implementación nueva, predeterminada en pandas 3.0.

**Resultado comprobado**

```text
feb  web       10
     tienda    30
mar  web       20
     tienda    40
```


## Fechas

**Clave** `fechas`


### Definición

**Clave** `definicion`

**Definición** Los valores datetime permiten filtrar, comparar y extraer componentes temporales con dt.

**Búsqueda** fechas, qué es fechas, cómo usar fechas en pandas

**Para recordar** Convierte texto a datetime antes de usar dt.


#### Extraer año, mes y día de semana

```python
pedidos.assign(anio=pedidos['fecha'].dt.year,mes=pedidos['fecha'].dt.month,dia=pedidos['fecha'].dt.day,dia_semana=pedidos['fecha'].dt.dayofweek)[['pedido_id','anio','mes','dia','dia_semana']].head(3)
```

dayofweek empieza en lunes=0.

**Resultado comprobado**

```text
   pedido_id  anio  mes  dia  dia_semana
0        101  2026    2    1           6
1        102  2026    2    1           6
2        103  2026    2    2           0
```


### Componentes dt

**Clave** `componentes-dt`

**Definición** year, month, day y dayofweek extraen componentes de cada fecha.

**Búsqueda** componentes dt, extraer año, mes y día de semana, pandas fechas

**Para recordar** dayofweek empieza en lunes=0.


#### Extraer año, mes y día de semana

```python
pedidos.assign(anio=pedidos['fecha'].dt.year,mes=pedidos['fecha'].dt.month,dia=pedidos['fecha'].dt.day,dia_semana=pedidos['fecha'].dt.dayofweek)[['pedido_id','anio','mes','dia','dia_semana']].head(3)
```

dayofweek empieza en lunes=0.

**Resultado comprobado**

```text
   pedido_id  anio  mes  dia  dia_semana
0        101  2026    2    1           6
1        102  2026    2    1           6
2        103  2026    2    2           0
```


### Rangos de fechas

**Clave** `rangos-de-fechas`

**Definición** Filtra mediante límites temporales; un intervalo semiabierto evita errores con horas del último día.

**Búsqueda** rangos de fechas, seleccionar febrero de 2026, pandas fechas

**Para recordar** Incluye inicio y excluye el inicio del periodo siguiente.


#### Seleccionar febrero de 2026

```python
pedidos.loc[(pedidos['fecha']>=pd.Timestamp('2026-02-01')) & (pedidos['fecha']<pd.Timestamp('2026-03-01')),'pedido_id'].tolist()
```

Incluye inicio y excluye el inicio del periodo siguiente.

**Resultado comprobado**

```text
[101, 102, 103, 104, 105]
```


### strftime

**Clave** `strftime`

**Definición** Formatea fechas a texto según un patrón.

**Búsqueda** strftime, etiquetar pedidos por año y mes, pandas fechas

**Para recordar** strftime devuelve texto, no datetime.


#### Etiquetar pedidos por año y mes

```python
pedidos['fecha'].dt.strftime('%Y-%m').tolist()
```

strftime devuelve texto, no datetime.

**Resultado comprobado**

```text
['2026-02', '2026-02', '2026-02', '2026-02', '2026-02', '2026-03', '2026-03']
```


### Timedelta y diferencias

**Clave** `timedelta-y-diferencias`

**Definición** Restar fechas produce duraciones; dt.days extrae días enteros.

**Búsqueda** timedelta y diferencias, calcular días desde alta hasta pedido, pandas fechas

**Para recordar** No restes cadenas para obtener días.


#### Calcular días desde alta hasta pedido

```python
t = pedidos.merge(clientes[['cliente_id','alta']],on='cliente_id')
t.assign(dias=(t['fecha']-t['alta']).dt.days)[['pedido_id','dias']].sort_values('pedido_id')
```

No restes cadenas para obtener días.

**Resultado comprobado**

```text
   pedido_id  dias
0        101    31
1        102    27
2        103    32
3        104    24
4        105    29
5        106    50
6        107    60
```


### DateOffset

**Clave** `dateoffset`

**Definición** Desplaza fechas por unidades de calendario como meses; Timedelta representa duraciones fijas.

**Búsqueda** dateoffset, calcular renovación mensual, pandas fechas

**Para recordar** Un mes no siempre tiene 30 días.


#### Calcular renovación mensual

```python
pd.Timestamp('2026-01-31') + pd.DateOffset(months=1)
```

Un mes no siempre tiene 30 días.

**Resultado comprobado**

```text
Timestamp('2026-02-28 00:00:00')
```


### Diferencia en horas

**Clave** `diferencia-en-horas`

**Definición** dt.total_seconds convierte una duración a segundos; divide por 3600 para horas.

**Búsqueda** diferencia en horas, medir tiempo entre recepción y entrega, pandas fechas

**Para recordar** dt.days devuelve días enteros, no horas totales.


#### Medir tiempo entre recepción y entrega

```python
inicio = pd.Timestamp('2026-02-01 08:00')
fin = pd.Timestamp('2026-02-02 10:30')
(fin-inicio).total_seconds()/3600
```

dt.days devuelve días enteros, no horas totales.

**Resultado comprobado**

```text
26.5
```


## Series temporales

**Clave** `series-temporales`


### Definición

**Clave** `definicion`

**Definición** Un índice temporal permite seleccionar y agregar observaciones por periodos y frecuencias.

**Búsqueda** series temporales, qué es series temporales, cómo usar series temporales en pandas

**Para recordar** Ordena fechas y define la frecuencia del análisis.


#### Generar cuatro fechas diarias

```python
pd.date_range('2026-02-01',periods=4,freq='D').strftime('%Y-%m-%d').tolist()
```

Una frecuencia diaria se expresa con D.

**Resultado comprobado**

```text
['2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04']
```


### DatetimeIndex y date_range

**Clave** `datetimeindex-y-date-range`

**Definición** date_range genera fechas con frecuencia definida; DatetimeIndex etiqueta observaciones temporales.

**Búsqueda** datetimeindex y date_range, generar cuatro fechas diarias, pandas series temporales

**Para recordar** Una frecuencia diaria se expresa con D.


#### Generar cuatro fechas diarias

```python
pd.date_range('2026-02-01',periods=4,freq='D').strftime('%Y-%m-%d').tolist()
```

Una frecuencia diaria se expresa con D.

**Resultado comprobado**

```text
['2026-02-01', '2026-02-02', '2026-02-03', '2026-02-04']
```


### Period y PeriodIndex

**Clave** `period-y-periodindex`

**Definición** Un periodo representa un intervalo de calendario y no un instante concreto.

**Búsqueda** period y periodindex, sumar ventas por mes sin mezclar años, pandas series temporales

**Para recordar** to_period('M') representa meses completos.


#### Sumar ventas por mes sin mezclar años

```python
pedidos.groupby(pedidos['fecha'].dt.to_period('M'))['monto'].sum()
```

to_period('M') representa meses completos.

**Resultado comprobado**

```text
fecha
2026-02    700
2026-03    450
Freq: M
```


### resample

**Clave** `resample`

**Definición** Reagrupa un índice temporal según una frecuencia y luego agrega.

**Búsqueda** resample, calcular ingresos mensuales, pandas series temporales

**Para recordar** MS representa inicio de mes; ME fin de mes en pandas 2.2+.


#### Calcular ingresos mensuales

```python
pedidos.set_index('fecha')['monto'].resample('MS').sum()
```

MS representa inicio de mes; ME fin de mes en pandas 2.2+.

**Resultado comprobado**

```text
fecha
2026-02-01    700
2026-03-01    450
Freq: MS
```


### asfreq

**Clave** `asfreq`

**Definición** Ajusta una serie a una frecuencia sin agregar; crea faltantes para etiquetas ausentes.

**Búsqueda** asfreq, restaurar días ausentes, pandas series temporales

**Para recordar** asfreq no suma observaciones; resample sí puede hacerlo.


#### Restaurar días ausentes

```python
diario.iloc[[0,2,3]].asfreq('D')
```

asfreq no suma observaciones; resample sí puede hacerlo.

**Resultado comprobado**

```text
2026-02-01    100.0
2026-02-02      NaN
2026-02-03     50.0
2026-02-04    150.0
Freq: D
```


### Zonas horarias

**Clave** `zonas-horarias`

**Definición** tz_localize asigna una zona a fechas sin zona; tz_convert cambia una fecha que ya tiene zona.

**Búsqueda** zonas horarias, convertir hora de ciudad de méxico a utc, pandas series temporales

**Para recordar** Localizar y convertir son operaciones distintas.


#### Convertir hora de Ciudad de México a UTC

```python
pd.Timestamp('2026-02-01 09:00').tz_localize('America/Mexico_City').tz_convert('UTC')
```

Localizar y convertir son operaciones distintas.

**Resultado comprobado**

```text
Timestamp('2026-02-01 15:00:00+0000', tz='UTC')
```


## Rankings

**Clave** `rankings`


### Definición

**Clave** `definicion`

**Definición** rank asigna posiciones numéricas a valores con distintas reglas para empates.

**Búsqueda** rankings, qué es rankings, cómo usar rankings en pandas

**Para recordar** Orden y método de empate son decisiones separadas.


#### Comparar RANK y DENSE_RANK

```python
s = pd.Series([300,200,200,150])
pd.DataFrame({'monto':s,'rank':s.rank(method='min',ascending=False),'dense':s.rank(method='dense',ascending=False)})
```

ascending=False otorga rango 1 al mayor valor.

**Resultado comprobado**

```text
   monto  rank  dense
0    300   1.0    1.0
1    200   2.0    2.0
2    200   2.0    2.0
3    150   4.0    3.0
```


### rank min y dense

**Clave** `rank-min-y-dense`

**Definición** method='min' conserva puestos con saltos; dense numera niveles sin saltos.

**Búsqueda** rank min y dense, comparar rank y dense_rank, pandas rankings

**Para recordar** ascending=False otorga rango 1 al mayor valor.


#### Comparar RANK y DENSE_RANK

```python
s = pd.Series([300,200,200,150])
pd.DataFrame({'monto':s,'rank':s.rank(method='min',ascending=False),'dense':s.rank(method='dense',ascending=False)})
```

ascending=False otorga rango 1 al mayor valor.

**Resultado comprobado**

```text
   monto  rank  dense
0    300   1.0    1.0
1    200   2.0    2.0
2    200   2.0    2.0
3    150   4.0    3.0
```


### rank first y average

**Clave** `rank-first-y-average`

**Definición** first resuelve empates por orden de aparición; average promedia los puestos empatados.

**Búsqueda** rank first y average, comparar reglas de empate, pandas rankings

**Para recordar** Ordena antes para garantizar un desempate reproducible.


#### Comparar reglas de empate

```python
s = pd.Series([300,200,200,150])
pd.DataFrame({'monto':s,'first':s.rank(method='first',ascending=False),'average':s.rank(method='average',ascending=False)})
```

Ordena antes para garantizar un desempate reproducible.

**Resultado comprobado**

```text
   monto  first  average
0    300    1.0      1.0
1    200    2.0      2.5
2    200    3.0      2.5
3    150    4.0      4.0
```


### Rank por grupo

**Clave** `rank-por-grupo`

**Definición** groupby().rank() asigna posiciones independientes dentro de cada grupo.

**Búsqueda** rank por grupo, rankear monto por cliente, pandas rankings

**Para recordar** Equivale a una ventana con PARTITION BY.


#### Rankear monto por cliente

```python
pedidos.assign(rango=pedidos.groupby('cliente_id')['monto'].rank(method='min',ascending=False))[['cliente_id','pedido_id','rango']]
```

Equivale a una ventana con PARTITION BY.

**Resultado comprobado**

```text
   cliente_id  pedido_id  rango
0           1        101    3.0
1           2        102    1.0
2           1        103    1.0
3           3        104    2.0
4           2        105    2.0
5           3        106    1.0
6           1        107    1.0
```


## Acumulados y secuencias

**Clave** `acumulados-y-secuencias`


### Definición

**Clave** `definicion`

**Definición** Los acumulados mantienen las filas y calculan resultados hasta cada observación.

**Búsqueda** acumulados y secuencias, qué es acumulados y secuencias, cómo usar acumulados y secuencias en pandas

**Para recordar** Ordena primero cuando el cálculo tenga sentido cronológico.


#### Acumular pedidos completados

```python
t = pedidos.query("estado == 'completado'").sort_values(['fecha','pedido_id'])
t.assign(acumulado=t['monto'].cumsum())[['pedido_id','monto','acumulado']]
```

No ordena automáticamente las filas.

**Resultado comprobado**

```text
   pedido_id  monto  acumulado
0        101    100        100
1        102    200        300
3        104    200        500
5        106    300        800
6        107    150        950
```


### cumsum

**Clave** `cumsum`

**Definición** Suma los valores de forma acumulada.

**Búsqueda** cumsum, acumular pedidos completados, pandas acumulados y secuencias

**Para recordar** No ordena automáticamente las filas.


#### Acumular pedidos completados

```python
t = pedidos.query("estado == 'completado'").sort_values(['fecha','pedido_id'])
t.assign(acumulado=t['monto'].cumsum())[['pedido_id','monto','acumulado']]
```

No ordena automáticamente las filas.

**Resultado comprobado**

```text
   pedido_id  monto  acumulado
0        101    100        100
1        102    200        300
3        104    200        500
5        106    300        800
6        107    150        950
```


### cumcount

**Clave** `cumcount`

**Definición** Numera filas dentro de cada grupo desde cero.

**Búsqueda** cumcount, numerar pedidos por cliente, pandas acumulados y secuencias

**Para recordar** Suma uno para imitar ROW_NUMBER de SQL.


#### Numerar pedidos por cliente

```python
t = pedidos.sort_values(['fecha','pedido_id'])
t.assign(numero=t.groupby('cliente_id').cumcount()+1)[['cliente_id','pedido_id','numero']]
```

Suma uno para imitar ROW_NUMBER de SQL.

**Resultado comprobado**

```text
   cliente_id  pedido_id  numero
0           1        101       1
1           2        102       1
2           1        103       2
3           3        104       1
4           2        105       2
5           3        106       2
6           1        107       3
```


### cummin y cummax

**Clave** `cummin-y-cummax`

**Definición** Calculan el menor o mayor valor observado hasta cada posición.

**Búsqueda** cummin y cummax, registrar récords diarios, pandas acumulados y secuencias

**Para recordar** No equivalen al mínimo o máximo de toda la serie.


#### Registrar récords diarios

```python
pd.DataFrame({'ventas':diario,'minimo':diario.cummin(),'maximo':diario.cummax()})
```

No equivalen al mínimo o máximo de toda la serie.

**Resultado comprobado**

```text
            ventas  minimo  maximo
2026-02-01     100     100     100
2026-02-02     200     100     200
2026-02-03      50      50     200
2026-02-04     150      50     200
```


### cumprod

**Clave** `cumprod`

**Definición** Multiplica valores acumulativamente.

**Búsqueda** cumprod, calcular crecimiento compuesto, pandas acumulados y secuencias

**Para recordar** Para acumular rendimientos, multiplica factores 1+tasa.


#### Calcular crecimiento compuesto

```python
(1+pd.Series([0.1,-0.1,0.2])).cumprod().round(3)
```

Para acumular rendimientos, multiplica factores 1+tasa.

**Resultado comprobado**

```text
0    1.100
1    0.990
2    1.188
```


### Acumulado por grupo

**Clave** `acumulado-por-grupo`

**Definición** groupby().cumsum() reinicia el acumulado por clave sin reducir filas.

**Búsqueda** acumulado por grupo, acumular gasto por cliente, pandas acumulados y secuencias

**Para recordar** Ordena por fecha y desempate antes de acumular.


#### Acumular gasto por cliente

```python
t = pedidos.sort_values(['fecha','pedido_id'])
t.assign(acumulado=t.groupby('cliente_id')['monto'].cumsum())[['cliente_id','pedido_id','acumulado']]
```

Ordena por fecha y desempate antes de acumular.

**Resultado comprobado**

```text
   cliente_id  pedido_id  acumulado
0           1        101        100
1           2        102        200
2           1        103        250
3           3        104        200
4           2        105        250
5           3        106        500
6           1        107        400
```


## Comparar observaciones

**Clave** `comparar-observaciones`


### Definición

**Clave** `definicion`

**Definición** shift, diff y pct_change permiten comparar una observación con otra según el orden actual.

**Búsqueda** comparar observaciones, qué es comparar observaciones, cómo usar comparar observaciones en pandas

**Para recordar** Ordenar es imprescindible antes de comparar periodos.


#### Ver venta anterior y siguiente

```python
pd.DataFrame({'ventas':diario,'anterior':diario.shift(1),'siguiente':diario.shift(-1)})
```

Sin freq desplaza valores, no etiquetas de fechas.

**Resultado comprobado**

```text
            ventas  anterior  siguiente
2026-02-01     100       NaN      200.0
2026-02-02     200     100.0       50.0
2026-02-03      50     200.0      150.0
2026-02-04     150      50.0        NaN
```


### shift

**Clave** `shift`

**Definición** Desplaza valores; periods=1 recupera el anterior y periods=-1 el siguiente.

**Búsqueda** shift, ver venta anterior y siguiente, pandas comparar observaciones

**Para recordar** Sin freq desplaza valores, no etiquetas de fechas.


#### Ver venta anterior y siguiente

```python
pd.DataFrame({'ventas':diario,'anterior':diario.shift(1),'siguiente':diario.shift(-1)})
```

Sin freq desplaza valores, no etiquetas de fechas.

**Resultado comprobado**

```text
            ventas  anterior  siguiente
2026-02-01     100       NaN      200.0
2026-02-02     200     100.0       50.0
2026-02-03      50     200.0      150.0
2026-02-04     150      50.0        NaN
```


### diff

**Clave** `diff`

**Definición** Resta el valor anterior al actual por defecto.

**Búsqueda** diff, medir cambio diario, pandas comparar observaciones

**Para recordar** La primera diferencia carece de observación previa.


#### Medir cambio diario

```python
diario.diff()
```

La primera diferencia carece de observación previa.

**Resultado comprobado**

```text
2026-02-01      NaN
2026-02-02    100.0
2026-02-03   -150.0
2026-02-04    100.0
Freq: D
```


### pct_change

**Clave** `pct-change`

**Definición** Calcula cambio relativo, no porcentaje ya multiplicado por cien.

**Búsqueda** pct_change, calcular variación porcentual, pandas comparar observaciones

**Para recordar** Multiplica por 100; fill_method=None evita rellenar faltantes.


#### Calcular variación porcentual

```python
(diario.pct_change(fill_method=None)*100).round(2)
```

Multiplica por 100; fill_method=None evita rellenar faltantes.

**Resultado comprobado**

```text
2026-02-01      NaN
2026-02-02    100.0
2026-02-03    -75.0
2026-02-04    200.0
Freq: D
```


### Comparaciones por grupo

**Clave** `comparaciones-por-grupo`

**Definición** groupby().shift() recupera la observación anterior de cada entidad.

**Búsqueda** comparaciones por grupo, obtener monto anterior por cliente, pandas comparar observaciones

**Para recordar** No compares pedidos de clientes diferentes.


#### Obtener monto anterior por cliente

```python
t = pedidos.sort_values(['fecha','pedido_id'])
t.assign(anterior=t.groupby('cliente_id')['monto'].shift())[['cliente_id','pedido_id','monto','anterior']]
```

No compares pedidos de clientes diferentes.

**Resultado comprobado**

```text
   cliente_id  pedido_id  monto  anterior
0           1        101    100       NaN
1           2        102    200       NaN
2           1        103    150     100.0
3           3        104    200       NaN
4           2        105     50     200.0
5           3        106    300     200.0
6           1        107    150     150.0
```


## Ventanas móviles

**Clave** `ventanas-moviles`


### Definición

**Clave** `definicion`

**Definición** Las ventanas calculan métricas sobre observaciones cercanas sin colapsar la serie.

**Búsqueda** ventanas móviles, qué es ventanas móviles, cómo usar ventanas móviles en pandas

**Para recordar** Define orden, tamaño y número mínimo de observaciones.


#### Calcular media y desviación móvil

```python
pd.DataFrame({'media':diario.rolling(2).mean(),'desviacion':diario.rolling(2).std()}).round(2)
```

min_periods controla cuándo existe un resultado válido.

**Resultado comprobado**

```text
            media  desviacion
2026-02-01    NaN         NaN
2026-02-02  150.0       70.71
2026-02-03  125.0      106.07
2026-02-04  100.0       70.71
```


### rolling

**Clave** `rolling`

**Definición** Calcula estadísticas en una ventana de observaciones o de tiempo.

**Búsqueda** rolling, calcular media y desviación móvil, pandas ventanas móviles

**Para recordar** min_periods controla cuándo existe un resultado válido.


#### Calcular media y desviación móvil

```python
pd.DataFrame({'media':diario.rolling(2).mean(),'desviacion':diario.rolling(2).std()}).round(2)
```

min_periods controla cuándo existe un resultado válido.

**Resultado comprobado**

```text
            media  desviacion
2026-02-01    NaN         NaN
2026-02-02  150.0       70.71
2026-02-03  125.0      106.07
2026-02-04  100.0       70.71
```


### Ventana por duración

**Clave** `ventana-por-duracion`

**Definición** rolling con duración utiliza el índice temporal para elegir observaciones.

**Búsqueda** ventana por duración, sumar ventas de los últimos dos días, pandas ventanas móviles

**Para recordar** Dos días no siempre contienen dos registros.


#### Sumar ventas de los últimos dos días

```python
diario.rolling('2D').sum()
```

Dos días no siempre contienen dos registros.

**Resultado comprobado**

```text
2026-02-01    100.0
2026-02-02    300.0
2026-02-03    250.0
2026-02-04    200.0
Freq: D
```


### expanding

**Clave** `expanding`

**Definición** Incluye todas las observaciones desde el inicio hasta la fila actual.

**Búsqueda** expanding, calcular media histórica, pandas ventanas móviles

**Para recordar** La ventana se amplía con cada registro.


#### Calcular media histórica

```python
diario.expanding().mean().round(2)
```

La ventana se amplía con cada registro.

**Resultado comprobado**

```text
2026-02-01    100.00
2026-02-02    150.00
2026-02-03    116.67
2026-02-04    125.00
Freq: D
```


### ewm

**Clave** `ewm`

**Definición** Aplica pesos decrecientes a observaciones antiguas; alpha define la velocidad de ajuste.

**Búsqueda** ewm, suavizar ventas con media exponencial, pandas ventanas móviles

**Para recordar** Un alpha alto da más peso a datos recientes.


#### Suavizar ventas con media exponencial

```python
diario.ewm(alpha=0.5,adjust=False).mean().round(2)
```

Un alpha alto da más peso a datos recientes.

**Resultado comprobado**

```text
2026-02-01    100.0
2026-02-02    150.0
2026-02-03    100.0
2026-02-04    125.0
Freq: D
```


## Estadística descriptiva

**Clave** `estadistica-descriptiva`


### Definición

**Clave** `definicion`

**Definición** Describe distribución, asociación y dispersión para interpretar métricas.

**Búsqueda** estadística descriptiva, qué es estadística descriptiva, cómo usar estadística descriptiva en pandas

**Para recordar** Una asociación no demuestra causalidad.


#### Calcular cuartiles

```python
pedidos['monto'].quantile([0.25,0.5,0.75])
```

0.5 es la mediana; 0.9 el percentil 90.

**Resultado comprobado**

```text
0.25    125.0
0.50    150.0
0.75    200.0
```


### quantile y percentiles

**Clave** `quantile-y-percentiles`

**Definición** Devuelve el valor situado en una fracción de la distribución ordenada.

**Búsqueda** quantile y percentiles, calcular cuartiles, pandas estadística descriptiva

**Para recordar** 0.5 es la mediana; 0.9 el percentil 90.


#### Calcular cuartiles

```python
pedidos['monto'].quantile([0.25,0.5,0.75])
```

0.5 es la mediana; 0.9 el percentil 90.

**Resultado comprobado**

```text
0.25    125.0
0.50    150.0
0.75    200.0
```


### corr y cov

**Clave** `corr-y-cov`

**Definición** corr mide asociación normalizada; cov mide variación conjunta en las unidades originales.

**Búsqueda** corr y cov, comparar indicadores, pandas estadística descriptiva

**Para recordar** Pearson mide asociación lineal y no prueba causalidad.


#### Comparar indicadores

```python
t = pd.DataFrame({'visitas':[10,20,30],'compras':[1,3,2]})
t.corr().round(2), t.cov().round(2)
```

Pearson mide asociación lineal y no prueba causalidad.

**Resultado comprobado**

```text
1)
         visitas  compras
visitas      1.0      0.5
compras      0.5      1.0

2)
         visitas  compras
visitas    100.0      5.0
compras      5.0      1.0
```


### IQR y outliers

**Clave** `iqr-y-outliers`

**Definición** El rango intercuartílico es Q3 menos Q1; una regla marca extremos fuera de 1.5 IQR.

**Búsqueda** iqr y outliers, detectar importes atípicos, pandas estadística descriptiva

**Para recordar** Un atípico no es automáticamente un error.


#### Detectar importes atípicos

```python
s = pd.Series([90,100,110,120,1000])
q1,q3 = s.quantile([0.25,0.75])
iqr = q3-q1
s[(s<q1-1.5*iqr) | (s>q3+1.5*iqr)]
```

Un atípico no es automáticamente un error.

**Resultado comprobado**

```text
4    1000
```


## Categorías y discretización

**Clave** `categorias-y-discretizacion`


### Definición

**Clave** `definicion`

**Definición** Los tipos categóricos representan etiquetas; discretizar convierte números en intervalos.

**Búsqueda** categorías y discretización, qué es categorías y discretización, cómo usar categorías y discretización en pandas

**Para recordar** Define categorías y límites según el significado del dato.


#### Ordenar prioridades

```python
s = pd.Series(pd.Categorical(['alta','baja','media'],categories=['baja','media','alta'],ordered=True))
s.sort_values()
```

El orden puede diferir del alfabético.

**Resultado comprobado**

```text
1     baja
2    media
0     alta
Categories (3, object): ['baja' < 'media' < 'alta']
```


### Categorical

**Clave** `categorical`

**Definición** Representa categorías finitas que pueden tener un orden explícito.

**Búsqueda** categorical, ordenar prioridades, pandas categorías y discretización

**Para recordar** El orden puede diferir del alfabético.


#### Ordenar prioridades

```python
s = pd.Series(pd.Categorical(['alta','baja','media'],categories=['baja','media','alta'],ordered=True))
s.sort_values()
```

El orden puede diferir del alfabético.

**Resultado comprobado**

```text
1     baja
2    media
0     alta
Categories (3, object): ['baja' < 'media' < 'alta']
```


### cut

**Clave** `cut`

**Definición** Divide valores según intervalos o límites definidos.

**Búsqueda** cut, clasificar montos en intervalos, pandas categorías y discretización

**Para recordar** right controla el extremo derecho incluido.


#### Clasificar montos en intervalos

```python
pd.cut(pedidos['monto'],bins=[0,100,200,300],labels=['bajo','medio','alto'],include_lowest=True)
```

right controla el extremo derecho incluido.

**Resultado comprobado**

```text
0     bajo
1    medio
2    medio
3    medio
4     bajo
5     alto
6    medio
Categories (3, object): ['bajo' < 'medio' < 'alto']
```


### qcut

**Clave** `qcut`

**Definición** Crea intervalos según cuantiles de la distribución.

**Búsqueda** qcut, dividir ventas por cuantiles, pandas categorías y discretización

**Para recordar** Empates pueden producir límites repetidos; duplicates='drop' reduce intervalos.


#### Dividir ventas por cuantiles

```python
pd.qcut(pedidos['monto'],q=2,duplicates='drop').value_counts(sort=False)
```

Empates pueden producir límites repetidos; duplicates='drop' reduce intervalos.

**Resultado comprobado**

```text
monto
(49.999, 150.0]    4
(150.0, 300.0]     3
```


### get_dummies

**Clave** `get-dummies`

**Definición** Crea una columna indicadora para cada categoría.

**Búsqueda** get_dummies, codificar estados, pandas categorías y discretización

**Para recordar** dummy_na=True hace explícita una categoría de ausencia.


#### Codificar estados

```python
pd.get_dummies(pedidos['estado'],prefix='estado',dtype=int).head(3)
```

dummy_na=True hace explícita una categoría de ausencia.

**Resultado comprobado**

```text
   estado_cancelado  estado_completado
0                 0                  1
1                 0                  1
2                 1                  0
```


### factorize

**Clave** `factorize`

**Definición** Asigna códigos enteros a valores distintos y devuelve etiquetas.

**Búsqueda** factorize, codificar países, pandas categorías y discretización

**Para recordar** Por defecto -1 identifica ausentes; los códigos no representan magnitud.


#### Codificar países

```python
codigos, etiquetas = pd.factorize(clientes['pais'])
codigos.tolist(), etiquetas.tolist()
```

Por defecto -1 identifica ausentes; los códigos no representan magnitud.

**Resultado comprobado**

```text
([0, 0, 1, -1, 1], ['MX', 'ES'])
```


## Métricas de negocio

**Clave** `metricas-de-negocio`


### Definición

**Clave** `definicion`

**Definición** Combina filtros, agregaciones y relaciones para convertir preguntas de negocio en resultados verificables.

**Búsqueda** métricas de negocio, qué es métricas de negocio, cómo usar métricas de negocio en pandas

**Para recordar** Define población, periodo, unidad de análisis y denominador.


#### Calcular porcentaje completado

```python
round(pedidos['estado'].eq('completado').mean()*100,2)
```

La media de booleanos representa una proporción si no hay ausentes.

**Resultado comprobado**

```text
71.43
```


### Tasa y porcentaje

**Clave** `tasa-y-porcentaje`

**Definición** Divide casos que cumplen una condición entre la población correspondiente.

**Búsqueda** tasa y porcentaje, calcular porcentaje completado, pandas métricas de negocio

**Para recordar** La media de booleanos representa una proporción si no hay ausentes.


#### Calcular porcentaje completado

```python
round(pedidos['estado'].eq('completado').mean()*100,2)
```

La media de booleanos representa una proporción si no hay ausentes.

**Resultado comprobado**

```text
71.43
```


### Ticket promedio y cliente único

**Clave** `ticket-promedio-y-cliente-unico`

**Definición** El ticket medio divide ingresos entre pedidos, no entre líneas de producto.

**Búsqueda** ticket promedio y cliente único, medir ticket de pedidos completados, pandas métricas de negocio

**Para recordar** Cuenta identificadores distintos cuando el nivel de detalle sea inferior al pedido.


#### Medir ticket de pedidos completados

```python
t = pedidos.query("estado == 'completado'")
t['monto'].sum(), t['pedido_id'].nunique(), round(t['monto'].mean(),2)
```

Cuenta identificadores distintos cuando el nivel de detalle sea inferior al pedido.

**Resultado comprobado**

```text
(950, 5, 190.0)
```


### Cuotas por grupo

**Clave** `cuotas-por-grupo`

**Definición** Divide la métrica de cada entidad por el total del grupo correspondiente.

**Búsqueda** cuotas por grupo, calcular participación de cada pedido en gasto del cliente, pandas métricas de negocio

**Para recordar** No confundas cuota con tasa de crecimiento.


#### Calcular participación de cada pedido en gasto del cliente

```python
t = pedidos.assign(cuota=pedidos['monto']/pedidos.groupby('cliente_id')['monto'].transform('sum'))
t[['pedido_id','cliente_id','cuota']].round(3)
```

No confundas cuota con tasa de crecimiento.

**Resultado comprobado**

```text
   pedido_id  cliente_id  cuota
0        101           1  0.250
1        102           2  0.800
2        103           1  0.375
3        104           3  0.400
4        105           2  0.200
5        106           3  0.600
6        107           1  0.375
```


### Variación entre meses

**Clave** `variacion-entre-meses`

**Definición** Agrupa primero por periodo y calcula el cambio respecto al periodo anterior.

**Búsqueda** variación entre meses, comparar ventas completadas mensuales, pandas métricas de negocio

**Para recordar** Una ausencia de mes no equivale automáticamente a cero ventas.


#### Comparar ventas completadas mensuales

```python
t = pedidos.query("estado == 'completado'").set_index('fecha')['monto'].resample('MS').sum()
pd.DataFrame({'ventas':t,'variacion_pct':(t.pct_change(fill_method=None)*100).round(2)})
```

Una ausencia de mes no equivale automáticamente a cero ventas.

**Resultado comprobado**

```text
            ventas  variacion_pct
fecha                            
2026-02-01     500            NaN
2026-03-01     450          -10.0
```


## Visualización

**Clave** `visualizacion`


### Definición

**Clave** `definicion`

**Definición** plot usa un backend gráfico para convertir Series y DataFrames en visualizaciones.

**Búsqueda** visualización, qué es visualización, cómo usar visualización en pandas

**Para recordar** Agrega y ordena según la pregunta antes de graficar.


**Nota** Requiere matplotlib; la expresión final comprueba las alturas.


#### Comparar montos por estado

```python
ax = pedidos.groupby('estado')['monto'].sum().plot.bar(title='Monto por estado',ylabel='Monto')
[p.get_height() for p in ax.patches]
```

Una barra por grupo, no por registro sin agregar.

**Resultado comprobado**

```text
[np.int64(200), np.int64(950)]
```


### Barras

**Clave** `barras`

**Definición** Un gráfico de barras compara magnitudes de categorías discretas.

**Búsqueda** barras, comparar montos por estado, pandas visualización

**Para recordar** Una barra por grupo, no por registro sin agregar.


**Nota** Requiere matplotlib; la expresión final comprueba las alturas.


#### Comparar montos por estado

```python
ax = pedidos.groupby('estado')['monto'].sum().plot.bar(title='Monto por estado',ylabel='Monto')
[p.get_height() for p in ax.patches]
```

Una barra por grupo, no por registro sin agregar.

**Resultado comprobado**

```text
[np.int64(200), np.int64(950)]
```


### Líneas

**Clave** `lineas`

**Definición** Un gráfico de líneas muestra evolución sobre un eje ordenado.

**Búsqueda** líneas, visualizar ventas diarias, pandas visualización

**Para recordar** Usa un índice temporal ordenado.


**Nota** Requiere matplotlib.


#### Visualizar ventas diarias

```python
ax = diario.plot.line(title='Ventas diarias')
ax.lines[0].get_ydata().tolist()
```

Usa un índice temporal ordenado.

**Resultado comprobado**

```text
[100, 200, 50, 150]
```


### Histogramas

**Clave** `histogramas`

**Definición** Un histograma representa frecuencias por intervalos numéricos.

**Búsqueda** histogramas, visualizar distribución de montos, pandas visualización

**Para recordar** El número de intervalos cambia la resolución de la distribución.


**Nota** Requiere matplotlib.


#### Visualizar distribución de montos

```python
ax = pedidos['monto'].plot.hist(bins=[0,100,200,300],title='Montos')
[p.get_height() for p in ax.patches]
```

El número de intervalos cambia la resolución de la distribución.

**Resultado comprobado**

```text
[np.float64(1.0), np.float64(3.0), np.float64(3.0)]
```


### Dispersión

**Clave** `dispersion`

**Definición** La dispersión compara dos variables numéricas mediante puntos.

**Búsqueda** dispersión, comparar cantidad y precio unitario, pandas visualización

**Para recordar** La asociación visual no establece causalidad.


**Nota** Requiere matplotlib.


#### Comparar cantidad y precio unitario

```python
ax = detalle.plot.scatter(x='cantidad',y='precio_unitario')
len(ax.collections[0].get_offsets())
```

La asociación visual no establece causalidad.

**Resultado comprobado**

```text
9
```


### Caja

**Clave** `caja`

**Definición** El diagrama de caja resume mediana, cuartiles y posibles valores atípicos.

**Búsqueda** caja, mostrar distribución de montos, pandas visualización

**Para recordar** Los bigotes no siempre equivalen al mínimo y máximo.


**Nota** Requiere matplotlib; la expresión final comprueba la mediana.


#### Mostrar distribución de montos

```python
ax = pedidos['monto'].plot.box()
pedidos['monto'].median()
```

Los bigotes no siempre equivalen al mínimo y máximo.

**Resultado comprobado**

```text
150.0
```


## Exportar datos

**Clave** `exportar-datos`


### Definición

**Clave** `definicion`

**Definición** Los métodos to_* guardan resultados en formatos externos o los devuelven como texto.

**Búsqueda** exportar datos, qué es exportar datos, cómo usar exportar datos en pandas

**Para recordar** Decide si el índice forma parte de los datos a exportar.


#### Generar CSV de dos pedidos

```python
pedidos[['pedido_id','monto']].head(2).to_csv(index=False).strip()
```

Especifica separador y codificación si el consumidor los necesita.

**Resultado comprobado**

```text
pedido_id,monto
101,100
102,200
```


### to_csv

**Clave** `to-csv`

**Definición** Exporta texto delimitado; index=False evita una columna adicional de índice.

**Búsqueda** to_csv, generar csv de dos pedidos, pandas exportar datos

**Para recordar** Especifica separador y codificación si el consumidor los necesita.


#### Generar CSV de dos pedidos

```python
pedidos[['pedido_id','monto']].head(2).to_csv(index=False).strip()
```

Especifica separador y codificación si el consumidor los necesita.

**Resultado comprobado**

```text
pedido_id,monto
101,100
102,200
```


### to_excel

**Clave** `to-excel`

**Definición** Exporta una hoja; ExcelWriter permite escribir varias hojas en un libro.

**Búsqueda** to_excel, crear un libro de dos hojas, pandas exportar datos

**Para recordar** El archivo puede sobrescribirse; conserva el original cuando sea necesario.


**Nota** Requiere openpyxl.


#### Crear un libro de dos hojas

```python
with TemporaryDirectory() as d:
    p = Path(d)/'reporte.xlsx'
    with pd.ExcelWriter(p,engine='openpyxl') as w:
        clientes.to_excel(w,sheet_name='Clientes',index=False)
        pedidos.to_excel(w,sheet_name='Pedidos',index=False)
    with pd.ExcelFile(p) as libro:
        resultado = libro.sheet_names
resultado
```

El archivo puede sobrescribirse; conserva el original cuando sea necesario.

**Resultado comprobado**

```text
['Clientes', 'Pedidos']
```


### to_json

**Clave** `to-json`

**Definición** Serializa datos a JSON con orientaciones distintas; records genera una lista de filas.

**Búsqueda** to_json, exportar dos pedidos a json, pandas exportar datos

**Para recordar** Define date_format cuando exportes fechas.


#### Exportar dos pedidos a JSON

```python
pedidos[['pedido_id','monto']].head(2).to_json(orient='records')
```

Define date_format cuando exportes fechas.

**Resultado comprobado**

```text
[{"pedido_id":101,"monto":100},{"pedido_id":102,"monto":200}]
```


### to_sql

**Clave** `to-sql`

**Definición** Escribe una tabla mediante una conexión SQL; if_exists controla conflictos.

**Búsqueda** to_sql, crear una tabla de reporte en sqlite, pandas exportar datos

**Para recordar** replace elimina y recrea la tabla, append añade filas.


#### Crear una tabla de reporte en SQLite

```python
with sqlite3.connect(':memory:') as con:
    pedidos[['pedido_id','monto']].to_sql('reporte',con,index=False,if_exists='fail')
    resultado = pd.read_sql('SELECT COUNT(*) AS filas FROM reporte',con)
resultado
```

replace elimina y recrea la tabla, append añade filas.

**Resultado comprobado**

```text
   filas
0      7
```


### to_parquet

**Clave** `to-parquet`

**Definición** Guarda datos en formato columnar, habitualmente comprimido.

**Búsqueda** to_parquet, exportar y recuperar montos, pandas exportar datos

**Para recordar** Requiere motor Parquet instalado.


**Nota** Requiere pyarrow o fastparquet.


#### Exportar y recuperar montos

```python
with TemporaryDirectory() as d:
    p = Path(d)/'montos.parquet'
    pedidos[['pedido_id','monto']].to_parquet(p,index=False)
    resultado = pd.read_parquet(p).shape
resultado
```

Requiere motor Parquet instalado.

**Resultado esperado**

```text
(7, 2)
```


## Validación de datos

**Clave** `validacion-de-datos`


### Definición

**Clave** `definicion`

**Definición** Comprueba esquema, unicidad, relaciones y totales antes y después de transformar.

**Búsqueda** validación de datos, qué es validación de datos, cómo usar validación de datos en pandas

**Para recordar** Una consulta que ejecuta no necesariamente produce resultados correctos.


#### Validar la clave de pedidos

```python
pedidos['pedido_id'].is_unique, pedidos['pedido_id'].notna().all(), pd.api.types.is_numeric_dtype(pedidos['monto'])
```

is_unique comprueba etiquetas o valores únicos.

**Resultado comprobado**

```text
(True, True, True)
```


### Validar esquema y claves

**Clave** `validar-esquema-y-claves`

**Definición** Comprueba tipos, columnas obligatorias, nulos y unicidad del identificador.

**Búsqueda** validar esquema y claves, validar la clave de pedidos, pandas validación de datos

**Para recordar** is_unique comprueba etiquetas o valores únicos.


#### Validar la clave de pedidos

```python
pedidos['pedido_id'].is_unique, pedidos['pedido_id'].notna().all(), pd.api.types.is_numeric_dtype(pedidos['monto'])
```

is_unique comprueba etiquetas o valores únicos.

**Resultado comprobado**

```text
(True, True, True)
```


### Integridad referencial

**Clave** `integridad-referencial`

**Definición** Comprueba que cada clave foránea pertenece al conjunto de claves de su entidad.

**Búsqueda** integridad referencial, detectar pedidos sin cliente válido, pandas validación de datos

**Para recordar** Una clave sin referencia puede desaparecer en un inner merge.


#### Detectar pedidos sin cliente válido

```python
pedidos.loc[~pedidos['cliente_id'].isin(clientes['cliente_id']), 'pedido_id'].tolist()
```

Una clave sin referencia puede desaparecer en un inner merge.

**Resultado comprobado**

```text
[]
```


### Conciliar totales

**Clave** `conciliar-totales`

**Definición** Agrega datos al nivel correcto antes de comparar dos fuentes.

**Búsqueda** conciliar totales, verificar monto contra líneas, pandas validación de datos

**Para recordar** No sumes el monto de pedido después de multiplicar sus filas por detalle.


#### Verificar monto contra líneas

```python
t = detalle.assign(ingreso=detalle['cantidad']*detalle['precio_unitario']).groupby('pedido_id')['ingreso'].sum()
pedidos.set_index('pedido_id')['monto'].eq(t).all()
```

No sumes el monto de pedido después de multiplicar sus filas por detalle.

**Resultado comprobado**

```text
True
```


### equals y compare

**Clave** `equals-y-compare`

**Definición** equals comprueba igualdad de objetos; compare muestra diferencias entre objetos con las mismas etiquetas.

**Búsqueda** equals y compare, localizar cambio de precio, pandas validación de datos

**Para recordar** equals considera faltantes en la misma posición iguales.


#### Localizar cambio de precio

```python
a = productos[['precio']].copy()
b = a.copy()
b.loc[0,'precio'] = 30
a.compare(b)
```

equals considera faltantes en la misma posición iguales.

**Resultado comprobado**

```text
  precio      
    self other
0   25.0  30.0
```


### assert_frame_equal

**Clave** `assert-frame-equal`

**Definición** Comprueba que dos DataFrames coinciden y lanza AssertionError si difieren.

**Búsqueda** assert_frame_equal, validar una selección esperada, pandas validación de datos

**Para recordar** Útil para pruebas automáticas de transformaciones.


#### Validar una selección esperada

```python
a = pedidos[['pedido_id','monto']].head(2)
b = pd.DataFrame({'pedido_id':[101,102],'monto':[100,200]})
pd.testing.assert_frame_equal(a,b)
'Validación superada'
```

Útil para pruebas automáticas de transformaciones.

**Resultado comprobado**

```text
Validación superada
```


### equals

**Clave** `equals`

**Definición** Comprueba si dos objetos tienen los mismos elementos y forma; los nulos coincidentes cuentan como iguales.

**Búsqueda** equals, comprobar que una copia no cambió, pandas validación de datos

**Para recordar** No equivale a comparar celda por celda con ==.


#### Comprobar que una copia no cambió

```python
pedidos.equals(pedidos.copy())
```

No equivale a comparar celda por celda con ==.

**Resultado comprobado**

```text
True
```


## Copias y asignación

**Clave** `copias-y-asignacion`


### Definición

**Clave** `definicion`

**Definición** Pandas distingue el objeto original de otros objetos derivados; Copy-on-Write evita cambios indirectos.

**Búsqueda** copias y asignación, qué es copias y asignación, cómo usar copias y asignación en pandas

**Para recordar** Usa loc para modificar el objeto que realmente quieres cambiar.


#### Modificar un pedido sin alterar los datos base

```python
t = pedidos.copy()
t.loc[0,'monto'] = 999
t.loc[0,'monto'], pedidos.loc[0,'monto']
```

deep=True no copia recursivamente objetos Python anidados.

**Resultado comprobado**

```text
(999, 100)
```


### copy

**Clave** `copy`

**Definición** Crea una copia explícita del objeto; modificarla no cambia los datos tabulares simples del original.

**Búsqueda** copy, modificar un pedido sin alterar los datos base, pandas copias y asignación

**Para recordar** deep=True no copia recursivamente objetos Python anidados.


#### Modificar un pedido sin alterar los datos base

```python
t = pedidos.copy()
t.loc[0,'monto'] = 999
t.loc[0,'monto'], pedidos.loc[0,'monto']
```

deep=True no copia recursivamente objetos Python anidados.

**Resultado comprobado**

```text
(999, 100)
```


### Asignación encadenada

**Clave** `asignacion-encadenada`

**Definición** Seleccionar una columna o subconjunto y asignar otra vez puede modificar un objeto intermedio en lugar del original.

**Búsqueda** asignación encadenada, actualizar únicamente cancelados en una copia, pandas copias y asignación

**Para recordar** Haz toda la selección y modificación en una llamada loc.


#### Actualizar únicamente cancelados en una copia

```python
t = pedidos.copy()
t.loc[t['estado']=='cancelado','monto'] = 0
t[['pedido_id','monto']]
```

Haz toda la selección y modificación en una llamada loc.

**Resultado comprobado**

```text
   pedido_id  monto
0        101    100
1        102    200
2        103      0
3        104    200
4        105      0
5        106    300
6        107    150
```


### Copy-on-Write

**Clave** `copy-on-write`

**Definición** Con CoW, un objeto derivado no modifica otro por efectos secundarios cuando se escribe en él.

**Búsqueda** copy-on-write, comprobar aislamiento al modificar una serie derivada, pandas copias y asignación

**Para recordar** En pandas 2.2 es configurable; en pandas 3.0 es el comportamiento predeterminado.


**Nota** En pandas 3.0 no es necesario activar mode.copy_on_write; la asignación encadenada no funciona para modificar el original.


#### Comprobar aislamiento al modificar una Serie derivada

```python
with pd.option_context('mode.copy_on_write',True):
    t = pedidos.copy()
    s = t['monto']
    s.iloc[0] = 999
    resultado = (s.iloc[0],t.loc[0,'monto'])
resultado
```

En pandas 2.2 es configurable; en pandas 3.0 es el comportamiento predeterminado.

**Resultado comprobado**

```text
(999, 100)
```


## Rendimiento

**Clave** `rendimiento`


### Definición

**Clave** `definicion`

**Definición** Reduce trabajo y memoria mediante operaciones vectorizadas, tipos apropiados y lecturas selectivas.

**Búsqueda** rendimiento, qué es rendimiento, cómo usar rendimiento en pandas

**Para recordar** Mide antes de optimizar; evita bucles fila a fila si existe una operación directa.


#### Multiplicar cantidades por precios

```python
(detalle['cantidad']*detalle['precio_unitario']).head(4)
```

La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.

**Resultado comprobado**

```text
0     50
1     50
2    200
3    150
```


### Vectorización

**Clave** `vectorizacion`

**Definición** Opera sobre columnas completas en lugar de iterar cada fila en Python.

**Búsqueda** vectorización, multiplicar cantidades por precios, pandas rendimiento

**Para recordar** La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.


#### Multiplicar cantidades por precios

```python
(detalle['cantidad']*detalle['precio_unitario']).head(4)
```

La vectorización expresa el cálculo directamente; no garantiza rapidez en todos los casos.

**Resultado comprobado**

```text
0     50
1     50
2    200
3    150
```


### Iteración e itertuples

**Clave** `iteracion-e-itertuples`

**Definición** itertuples permite recorrer filas cuando una operación no puede vectorizarse fácilmente.

**Búsqueda** iteración e itertuples, construir mensajes para dos pedidos, pandas rendimiento

**Para recordar** Evita modificar filas mientras iteras; itertuples suele ser preferible a iterrows.


#### Construir mensajes para dos pedidos

```python
[f'{r.pedido_id}: {r.monto}' for r in pedidos.head(2).itertuples(index=False)]
```

Evita modificar filas mientras iteras; itertuples suele ser preferible a iterrows.

**Resultado comprobado**

```text
['101: 100', '102: 200']
```


### Memoria y tipos eficientes

**Clave** `memoria-y-tipos-eficientes`

**Definición** memory_usage(deep=True) estima memoria de columnas; tipos pequeños y category pueden reducirla.

**Búsqueda** memoria y tipos eficientes, medir memoria de una categoría repetida, pandas rendimiento

**Para recordar** Comprueba rango y precisión antes de reducir un tipo.


**Nota** Los bytes concretos dependen del entorno.


#### Medir memoria de una categoría repetida

```python
s = pd.Series(['web','tienda']*500)
int(s.memory_usage(deep=True)), int(s.astype('category').memory_usage(deep=True))
```

Comprueba rango y precisión antes de reducir un tipo.

**Resultado comprobado**

```text
(53632, 1347)
```


### chunksize

**Clave** `chunksize`

**Definición** read_csv puede devolver un iterador de bloques en lugar de cargar todo a la vez.

**Búsqueda** chunksize, sumar un csv por bloques, pandas rendimiento

**Para recordar** Combina resultados parciales; no promedies medias sin ponderarlas.


#### Sumar un CSV por bloques

```python
bloques = pd.read_csv(StringIO('monto\n100\n200\n50\n150'),chunksize=2)
sum(b['monto'].sum() for b in bloques)
```

Combina resultados parciales; no promedies medias sin ponderarlas.

**Resultado comprobado**

```text
500
```


### Lectura selectiva

**Clave** `lectura-selectiva`

**Definición** Lee solo columnas necesarias y define tipos cuando el esquema se conoce.

**Búsqueda** lectura selectiva, cargar únicamente el importe, pandas rendimiento

**Para recordar** usecols reduce datos cargados; dtype evita inferencias inadecuadas.


#### Cargar únicamente el importe

```python
pd.read_csv(StringIO('id,monto,canal\n1,100,web\n2,200,tienda'),usecols=['monto'],dtype={'monto':'int32'}).dtypes.astype(str)
```

usecols reduce datos cargados; dtype evita inferencias inadecuadas.

**Resultado comprobado**

```text
monto    int32
```


### Evitar concatenación repetida

**Clave** `evitar-concatenacion-repetida`

**Definición** Acumula lotes en una lista y concatena una sola vez.

**Búsqueda** evitar concatenación repetida, unir lotes diarios, pandas rendimiento

**Para recordar** Concatenar dentro de cada iteración puede copiar datos repetidamente.


#### Unir lotes diarios

```python
lotes = [pedidos.iloc[:3],pedidos.iloc[3:]]
pd.concat(lotes,ignore_index=True).shape
```

Concatenar dentro de cada iteración puede copiar datos repetidamente.

**Resultado comprobado**

```text
(7, 6)
```


## Fuentes

Documentación oficial de pandas 2.2.3 (versión de comprobación), NumPy y notas de migración. Las explicaciones, datos y ejemplos son originales para AllDoc.


- [pandas 2.2.3 — Estructuras de datos](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/dsintro.html).

- [pandas 2.2.3 — Operaciones básicas, alineación y estadística](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/basics.html).

- [pandas 2.2.3 — Importación y exportación](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/io.html).

- [pandas 2.2.3 — Selección, filtros, asignación y duplicados](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/indexing.html).

- [pandas 2.2.3 — Marcadores y tratamiento de ausencias](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/missing_data.html).

- [pandas 2.2.3 — Métodos de texto y regex](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/text.html).

- [pandas 2.2.3 — Agregaciones, transformaciones y filtros por grupo](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/groupby.html).

- [pandas 2.2.3 — merge, join, concat y cardinalidad](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/merging.html).

- [pandas 2.2.3 — Pivot, melt, stack y explode](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/reshaping.html).

- [pandas 2.2.3 — Fechas, zonas horarias y remuestreo](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/timeseries.html).

- [pandas 2.2.3 — Ventanas móviles y acumuladas](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/window.html).

- [pandas 2.2.3 — Tipos categóricos](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/categorical.html).

- [pandas 2.2.3 — Gráficos](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/visualization.html).

- [pandas 2.2.3 — Comportamiento de copias en pandas 2.2](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/copy_on_write.html).

- [pandas 2.2.3 — Optimización de memoria y procesamiento por bloques](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/scale.html).

- [pandas 2.2.3 — MultiIndex y selección avanzada](https://pandas.pydata.org/pandas-docs/version/2.2/user_guide/advanced.html).

- [Referencia de DataFrame](https://pandas.pydata.org/pandas-docs/version/2.2/reference/frame.html): métodos, argumentos y tipos devueltos.

- [Referencia de Series](https://pandas.pydata.org/pandas-docs/version/2.2/reference/series.html): agregaciones, rankings, desplazamientos, cuantiles y funciones de texto.

- [Migración a Copy-on-Write en pandas 3.0](https://pandas.pydata.org/docs/user_guide/copy_on_write.html): aislamiento y asignaciones encadenadas.

- [NumPy — where](https://numpy.org/doc/stable/reference/generated/numpy.where.html) y [select](https://numpy.org/doc/stable/reference/generated/numpy.select.html): condiciones y selección por prioridad.

- [pandas — assert_frame_equal](https://pandas.pydata.org/pandas-docs/version/2.2/reference/api/pandas.testing.assert_frame_equal.html): validación de resultados.
