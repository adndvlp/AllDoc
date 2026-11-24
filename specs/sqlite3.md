# sqlite3

**Clave** `sqlite3`

**Área** Análisis de datos · Python (ubicación propuesta)

**Resumen** Conectar Python con SQLite para consultar, transformar, almacenar y validar datos mediante SQL.

**Alcance** API de `sqlite3` desde fundamentos hasta funcionalidades avanzadas, particularidades de SQLite, integración con pandas, archivos, pruebas, transacciones, seguridad, diagnóstico y mantenimiento. Los grupos iniciales son la base práctica para análisis de datos; los últimos amplían el API. SQL como lenguaje se desarrolla en su propia herramienta de AllDoc.

**Entorno** Python 3.13–3.14; SQLite integrado en la instalación de Python (consultar `sqlite3.sqlite_version`). Los ejemplos usan Python salvo indicación contraria. `sqlite3` es de la biblioteca estándar; pandas se instala aparte. Las capacidades opcionales dependen de la compilación de SQLite.

## Datos compartidos

Dataset sintético de una tienda. Importes en centavos enteros para evitar errores de representación binaria de dinero. `clientes.id` identifica clientes; `pedidos.cliente_id` referencia esa clave. `contactos` contiene correos repetidos y un valor ausente para practicar calidad de datos.

Ejecuta este bloque una vez para disponer de `abrir_demo()`. Cada ejemplo que usa `con` parte de una **conexión nueva** creada con `con = abrir_demo()`; no depende de los cambios de otra ficha. El código de preparación habilita claves foráneas y usa `autocommit=True` para que las fichas de consulta y escritura sean independientes. Las fichas de transacciones cambian expresamente ese modo. Al terminar cada ejemplo, cierra `con` y cualquier conexión adicional si sigue abierta. Las fichas que crean archivos usan directorios temporales.

```python
import sqlite3
from contextlib import closing

def abrir_demo():
    con = sqlite3.connect(":memory:", autocommit=True)
    con.execute("PRAGMA foreign_keys = ON")
    con.executescript("""
        CREATE TABLE clientes (
            id INTEGER PRIMARY KEY,
            nombre TEXT NOT NULL,
            pais TEXT
        );
        CREATE TABLE pedidos (
            id INTEGER PRIMARY KEY,
            cliente_id INTEGER NOT NULL REFERENCES clientes(id),
            monto INTEGER NOT NULL CHECK(monto >= 0),
            fecha TEXT NOT NULL,
            estado TEXT NOT NULL CHECK(estado IN ('completado', 'cancelado'))
        );
        CREATE TABLE contactos (
            id INTEGER PRIMARY KEY,
            email TEXT
        );
    """)
    con.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
        (1, 'Ana', 'Mexico'), (2, 'Luis', 'Mexico'),
        (3, 'Marta', 'Spain'), (4, 'Diego', None)
    ])
    con.executemany("INSERT INTO pedidos VALUES (?, ?, ?, ?, ?)", [
        (101, 1, 12000, '2026-08-01', 'completado'),
        (102, 1, 8000, '2026-08-03', 'completado'),
        (103, 2, 15000, '2026-08-03', 'completado'),
        (104, 2, 5000, '2026-09-01', 'cancelado'),
        (105, 3, 8000, '2026-09-02', 'completado')
    ])
    con.executemany("INSERT INTO contactos VALUES (?, ?)", [
        (1, 'ana@example.com'), (2, 'luis@example.com'),
        (3, 'ana@example.com'), (4, None)
    ])
    return con
```

**Datos iniciales**

| clientes.id | nombre | pais |
| --- | --- | --- |
| 1 | Ana | Mexico |
| 2 | Luis | Mexico |
| 3 | Marta | Spain |
| 4 | Diego | NULL |

| pedidos.id | cliente_id | monto | fecha | estado |
| --- | --- | --- | --- | --- |
| 101 | 1 | 12000 | 2026-08-01 | completado |
| 102 | 1 | 8000 | 2026-08-03 | completado |
| 103 | 2 | 15000 | 2026-08-03 | completado |
| 104 | 2 | 5000 | 2026-09-01 | cancelado |
| 105 | 3 | 8000 | 2026-09-02 | completado |

| contactos.id | email |
| --- | --- |
| 1 | ana@example.com |
| 2 | luis@example.com |
| 3 | ana@example.com |
| 4 | NULL |

Los ejemplos de consola muestran tuplas de Python salvo que se especifique otra representación. No se garantiza el orden de un SELECT sin ORDER BY; las consultas con varias filas lo indican cuando el orden es relevante. Los ejemplos con APIs de disponibilidad variable incluyen su requisito.

## Conexión a SQLite

**Clave** `conexion-a-sqlite`

### Definición

**Clave** `definicion`

**Definición** `sqlite3` es la interfaz de Python para el motor SQLite, que trabaja directamente con archivos o memoria sin un servidor independiente.

**Búsqueda** sqlite3, conectar base de datos, biblioteca estándar

**Para recordar** Python usa el módulo; SQLite ejecuta SQL.

#### Abrir y consultar una base vacía

```python
import sqlite3
with closing(sqlite3.connect(":memory:")) as db:
    print(db.execute("SELECT 1").fetchone())
```

`connect()` devuelve la conexión; `execute()` ejecuta SQL y `fetchone()` recupera una fila.

**Resultado esperado** `(1,)`.

### connect()

**Clave** `connect`

**Definición** Abre un archivo existente o crea uno nuevo si no existe.

**Búsqueda** connect, archivo db, abrir sqlite

**Para recordar** La ruta identifica la base; no hay host ni puerto.

#### Crear un archivo local

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as carpeta:
    ruta = Path(carpeta) / "ventas.db"
    with closing(sqlite3.connect(ruta)) as db:
        db.execute("CREATE TABLE prueba(id INTEGER)")
    print(ruta.exists())
```

Se acepta un objeto de ruta. Las extensiones .db, .sqlite y .sqlite3 son convenciones, no requisitos.

**Resultado esperado** `True`.

### :memory:

**Clave** `memory`

**Definición** Crea una base privada en RAM para experimentos o pruebas.

**Búsqueda** memory, base temporal, pruebas

**Para recordar** Dos conexiones normales a :memory: no comparten datos.

#### Comprobar el aislamiento

```python
with closing(sqlite3.connect(":memory:")) as a, \
     closing(sqlite3.connect(":memory:")) as b:
    a.execute("CREATE TABLE prueba(id INTEGER)")
    print(b.execute("SELECT count(*) FROM sqlite_schema").fetchone())
```

La tabla solo pertenece a la conexión a.

**Resultado esperado** `(0,)`.

### Connection y Cursor

**Clave** `connection-y-cursor`

**Definición** Connection representa la sesión con la base; Cursor representa la ejecución y lectura de una consulta.

**Búsqueda** connection, cursor, cursor()

**Para recordar** La conexión administra transacciones; el cursor consume filas.

#### Crear un cursor explícito

```python
cur = con.cursor()
cur.execute("SELECT nombre FROM clientes WHERE id = 1")
print(cur.fetchone())
cur.close()
```

Puedes crear varios cursores de una conexión.

**Resultado esperado** `('Ana',)`.

### close() y closing()

**Clave** `close-y-closing`

**Definición** Cierran recursos aunque ocurra una excepción si se usa `closing` como administrador de contexto.

**Búsqueda** close, cerrar conexión, contextlib

**Para recordar** Cerrar no equivale a confirmar una transacción.

#### Cerrar automáticamente una conexión

```python
with closing(abrir_demo()) as db:
    print(db.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

`with con` por sí solo administra transacciones, no cierra la conexión.

**Resultado esperado** `(4,)`; la conexión se cierra al salir.

### URI y modos de apertura

**Clave** `uri-y-modos-de-apertura`

**Definición** Con `uri=True`, SQLite interpreta rutas `file:` y parámetros como `mode`.

**Búsqueda** uri, mode ro rw rwc memory, solo lectura

**Para recordar** ro exige lectura; rw exige archivo existente; rwc permite crearlo.

#### Abrir una base en solo lectura

```python
from pathlib import Path
from tempfile import TemporaryDirectory
with TemporaryDirectory() as carpeta:
    ruta = Path(carpeta) / "ventas.db"
    with closing(sqlite3.connect(ruta)) as db:
        db.execute("CREATE TABLE ventas(id INTEGER)")
    with closing(sqlite3.connect(ruta.as_uri() + "?mode=ro", uri=True)) as db:
        print(db.execute("SELECT COUNT(*) FROM ventas").fetchone())
```

El modo ro protege contra escrituras accidentales.

**Resultado esperado** `(0,)`; una escritura produciría OperationalError.

### Memoria compartida

**Clave** `memoria-compartida`

**Definición** Una URI nombrada con `mode=memory&cache=shared` permite compartir una base en RAM entre conexiones del mismo proceso.

**Búsqueda** shared cache, memoria compartida

**Para recordar** La base vive mientras quede abierta al menos una conexión.

#### Compartir una tabla de prueba

```python
uri = "file:demo?mode=memory&cache=shared"
with closing(sqlite3.connect(uri, uri=True)) as a, \
     closing(sqlite3.connect(uri, uri=True)) as b:
    a.execute("CREATE TABLE prueba(id INTEGER)")
    print(b.execute("SELECT COUNT(*) FROM prueba").fetchone())
```

Ambas conexiones usan exactamente la misma URI.

**Resultado esperado** `(0,)`.

## Ejecutar sentencias

**Clave** `ejecutar-sentencias`

### Definición

**Clave** `definicion`

**Definición** `execute()` ejecuta una sentencia SQL; devuelve un cursor desde el que leer los resultados.

**Búsqueda** execute, ejecutar consulta

**Para recordar** SQL va en una cadena de Python.

#### Consultar un cliente

```python
cur = con.execute("SELECT nombre FROM clientes WHERE id = 2")
print(cur.fetchone())
```

La conexión ofrece un atajo que crea el cursor automáticamente.

**Resultado esperado** `('Luis',)`.

### execute() con cursor

**Clave** `execute-con-cursor`

**Definición** Un cursor explícito permite reutilizar el objeto para ejecutar consultas sucesivas.

**Búsqueda** cursor.execute, consulta individual

**Para recordar** Cada execute reemplaza el resultado pendiente del cursor.

#### Consultar dos totales

```python
cur = con.cursor()
cur.execute("SELECT COUNT(*) FROM clientes")
print(cur.fetchone())
cur.execute("SELECT COUNT(*) FROM pedidos")
print(cur.fetchone())
```

Se recupera el primer resultado antes de ejecutar la segunda consulta.

**Resultado esperado** `(4,)` y `(5,)`.

### executemany()

**Clave** `executemany`

**Definición** Repite una sentencia DML parametrizada para cada conjunto de valores de un iterable.

**Búsqueda** executemany, insertar varias filas, lotes

**Para recordar** Una plantilla SQL y muchos conjuntos de parámetros.

#### Cargar dos clientes

```python
con.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
    (5, "Elena", "Mexico"), (6, "Pablo", None)
])
print(con.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

También acepta generadores. Las filas de RETURNING se descartan con executemany.

**Resultado esperado** `(6,)`.

### executescript()

**Clave** `executescript`

**Definición** Ejecuta un texto que contiene varias sentencias SQL separadas por punto y coma.

**Búsqueda** executescript, script sql, varias sentencias

**Para recordar** No admite parámetros; usa solo SQL de confianza.

#### Crear una tabla y poblarla

```python
con.executescript("""
CREATE TABLE metas (monto INTEGER);
INSERT INTO metas VALUES (5000);
""")
print(con.execute("SELECT monto FROM metas").fetchone())
```

El script no garantiza atomicidad por sí solo; en modo legado puede confirmar antes una transacción pendiente.

**Resultado esperado** `(5000,)`.

### Atajos de Connection

**Clave** `atajos-de-connection`

**Definición** `Connection.execute`, `executemany` y `executescript` crean un cursor implícito.

**Búsqueda** connection.execute, sin cursor, atajo

**Para recordar** No hace falta cursor() para consultas sencillas.

#### Leer directamente desde la conexión

```python
print(con.execute("SELECT COUNT(*) FROM pedidos").fetchone())
```

El cursor retornado permite encadenar la lectura.

**Resultado esperado** `(5,)`.

### complete_statement()

**Clave** `complete-statement`

**Definición** Comprueba si el texto parece una sentencia completa por terminadores y cadenas cerradas.

**Búsqueda** complete_statement, consola sql

**Para recordar** No comprueba que el SQL sea válido.

#### Detectar el final de una sentencia

```python
print(sqlite3.complete_statement("SELECT 1"))
print(sqlite3.complete_statement("SELECT 1;"))
```

Sirve para reunir entradas multilínea, no para validar sintaxis.

**Resultado esperado** `False`, `True`.

## Parámetros SQL

**Clave** `parametros-sql`

### Definición

**Clave** `definicion`

**Definición** Los parámetros vinculan valores de Python a una sentencia SQL sin construir el texto SQL con esos valores.

**Búsqueda** binding, parámetros, SQL injection

**Para recordar** Separa instrucciones de valores.

#### Filtrar por nombre

```python
nombre = "Ana"
print(con.execute("SELECT id FROM clientes WHERE nombre = ?", (nombre,)).fetchone())
```

La coma forma una tupla de un elemento.

**Resultado esperado** `(1,)`.

### Placeholder ?

**Clave** `placeholder`

**Definición** Cada `?` recibe un valor de la secuencia en el mismo orden.

**Búsqueda** qmark, parámetros posicionales, tupla

**Para recordar** La cantidad de parámetros debe coincidir.

#### Filtrar por estado y monto

```python
filas = con.execute("SELECT id FROM pedidos WHERE estado = ? AND monto >= ? ORDER BY id", ("completado", 12000)).fetchall()
print(filas)
```

No pongas comillas alrededor de ?.

**Resultado esperado** `[(101,), (103,)]`.

### Placeholder :nombre

**Clave** `placeholder-nombre`

**Definición** Los parámetros nombrados toman valores de un diccionario cuyas claves no llevan dos puntos.

**Búsqueda** named placeholders, dict

**Para recordar** :nombre en SQL; nombre como clave del diccionario.

#### Buscar por país

```python
filas = con.execute("SELECT nombre FROM clientes WHERE pais = :pais ORDER BY id", {"pais": "Mexico"}).fetchall()
print(filas)
```

Permite repetir un nombre de parámetro sin repetir su valor.

**Resultado esperado** `[('Ana',), ('Luis',)]`.

### IN dinámico

**Clave** `in-dinamico`

**Definición** Para una lista variable se genera un placeholder por elemento y se vinculan los valores por separado.

**Búsqueda** IN, lista de parámetros, placeholders dinámicos

**Para recordar** Construye la cantidad de ?, no los valores SQL.

#### Buscar varios pedidos

```python
ids = [101, 105]
if ids:
    marcas = ", ".join("?" for _ in ids)
    filas = con.execute(f"SELECT id FROM pedidos WHERE id IN ({marcas}) ORDER BY id", ids).fetchall()
else:
    filas = []
print(filas)
```

Se trata la lista vacía explícitamente para mantener la intención.

**Resultado esperado** `[(101,), (105,)]`.

### Identificadores dinámicos

**Clave** `identificadores-dinamicos`

**Definición** Los parámetros representan valores, no nombres de tablas, columnas ni palabras clave.

**Búsqueda** tabla dinámica, ORDER BY dinámico, whitelist

**Para recordar** Selecciona identificadores de una lista permitida.

#### Ordenar por una columna permitida

```python
campo = "nombre"
permitidos = {"nombre", "id"}
if campo not in permitidos:
    raise ValueError("Columna no permitida")
print(con.execute(f"SELECT nombre FROM clientes ORDER BY {campo}").fetchall())
```

El texto interpolado se limita a opciones controladas.

**Resultado esperado** `[('Ana',), ('Diego',), ('Luis',), ('Marta',)]`.

### SQL injection

**Clave** `sql-injection`

**Definición** Concatenar entrada externa a SQL permite que el contenido cambie la consulta. Los parámetros mantienen la entrada como dato.

**Búsqueda** SQL injection, evitar f-string, seguridad

**Para recordar** No interpolar valores proporcionados por usuarios.

#### Buscar texto que contiene comillas

```python
nombre = "Ana' OR 1=1 --"
print(con.execute("SELECT id FROM clientes WHERE nombre = ?", (nombre,)).fetchall())
```

El texto completo se interpreta como un nombre, no como una condición SQL.

**Resultado esperado** `[]`.

## Recuperar filas

**Clave** `recuperar-filas`

### Definición

**Clave** `definicion`

**Definición** Un cursor conserva la posición de lectura de su resultado; los métodos fetch consumen filas.

**Búsqueda** fetch, leer SELECT, resultados

**Para recordar** Ejecutar no es lo mismo que recuperar filas.

#### Leer una consulta

```python
cur = con.execute("SELECT id, nombre FROM clientes ORDER BY id")
print(cur.fetchall())
```

Cada tupla representa una fila.

**Resultado esperado** `[(1, 'Ana'), (2, 'Luis'), (3, 'Marta'), (4, 'Diego')]`.

### fetchone()

**Clave** `fetchone`

**Definición** Recupera la próxima fila, o None cuando no quedan filas.

**Búsqueda** fetchone, una fila, None

**Para recordar** Cada llamada avanza el cursor.

#### Leer una fila y agotar el resultado

```python
cur = con.execute("SELECT nombre FROM clientes WHERE id = 1")
print(cur.fetchone())
print(cur.fetchone())
```

Una tupla con None dentro no equivale a ausencia de fila.

**Resultado esperado** `('Ana',)` y `None`.

### fetchmany() y arraysize

**Clave** `fetchmany-y-arraysize`

**Definición** `fetchmany(n)` recupera hasta n filas; si se omite n usa `cursor.arraysize`.

**Búsqueda** fetchmany, arraysize, bloques

**Para recordar** Lee por lotes sin cargar todo.

#### Recuperar dos filas por bloque

```python
cur = con.execute("SELECT id FROM clientes ORDER BY id")
cur.arraysize = 2
print(cur.fetchmany())
print(cur.fetchmany())
print(cur.fetchmany())
```

La lista vacía indica fin de lectura.

**Resultado esperado** `[(1,), (2,)]`, `[(3,), (4,)]`, `[]`.

### fetchall()

**Clave** `fetchall`

**Definición** Recupera todas las filas que quedan, no las ya consumidas.

**Búsqueda** fetchall, todas las filas

**Para recordar** Devuelve una lista de filas.

#### Leer lo que queda

```python
cur = con.execute("SELECT id FROM clientes ORDER BY id")
print(cur.fetchone())
print(cur.fetchall())
```

La primera fila ya fue consumida.

**Resultado esperado** `(1,)` y `[(2,), (3,), (4,)]`.

### Iterar un cursor

**Clave** `iterar-un-cursor`

**Definición** El cursor es iterable y entrega filas sucesivas sin construir una lista completa de resultados.

**Búsqueda** for cursor, streaming, lectura incremental

**Para recordar** Usa for para recorrer filas grandes.

#### Recorrer pedidos

```python
for (pedido_id,) in con.execute("SELECT id FROM pedidos ORDER BY id"):
    print(pedido_id)
```

La tupla de una columna se desempaqueta.

**Resultado esperado** `101`, `102`, `103`, `104`, `105`, uno por línea.

### RETURNING

**Clave** `returning`

**Definición** SQLite permite devolver columnas de las filas modificadas por INSERT, UPDATE o DELETE.

**Búsqueda** returning, insertar y recuperar

**Para recordar** Usa execute y consume el resultado.

**Nota** SQLite 3.35 o posterior; executemany descarta las filas de RETURNING.

#### Insertar y devolver el identificador

```python
cur = con.execute("INSERT INTO clientes(nombre) VALUES (?) RETURNING id, nombre", ("Elena",))
print(cur.fetchall())
```

No hace falta una consulta adicional para recuperar esos valores.

**Resultado esperado** `[(5, 'Elena')]`.

## Metadatos de cursor y conexión

**Clave** `metadatos-de-cursor-y-conexion`

### Definición

**Clave** `definicion`

**Definición** El cursor expone metadatos del resultado y de ciertas modificaciones; la conexión conserva información de sesión.

**Búsqueda** metadata, cursor, columnas

**Para recordar** No confundas filas obtenidas con filas modificadas.

#### Identificar columnas

```python
cur = con.execute("SELECT id, nombre FROM clientes")
print([c[0] for c in cur.description])
```

description está disponible incluso antes de leer las filas.

**Resultado esperado** `['id', 'nombre']`.

### description

**Clave** `description`

**Definición** Es una secuencia de tuplas de siete elementos por columna; sqlite3 rellena el nombre y deja los otros campos en None.

**Búsqueda** cursor.description, nombres de columnas

**Para recordar** El nombre está en la posición 0.

#### Construir un encabezado

```python
cur = con.execute("SELECT monto AS centavos FROM pedidos")
print(cur.description[0])
```

Respeta el alias devuelto por SQL.

**Resultado esperado** `('centavos', None, None, None, None, None, None)`.

### rowcount

**Clave** `rowcount`

**Definición** Indica filas modificadas por INSERT, UPDATE, DELETE o REPLACE; para otras sentencias normalmente es -1.

**Búsqueda** rowcount, filas afectadas

**Para recordar** Para contar SELECT usa COUNT o lee las filas.

#### Contar modificaciones

```python
cur = con.execute("UPDATE clientes SET pais = 'Mexico' WHERE id = 4")
print(cur.rowcount)
print(con.execute("SELECT * FROM clientes").rowcount)
```

Con RETURNING, consume las filas antes de consultar rowcount.

**Resultado esperado** `1`, `-1`.

### lastrowid

**Clave** `lastrowid`

**Definición** Retiene el ROWID de la última inserción exitosa mediante execute con INSERT o REPLACE.

**Búsqueda** lastrowid, id generado

**Para recordar** No es el número de filas insertadas.

#### Recuperar el id automático

```python
cur = con.execute("INSERT INTO clientes(nombre) VALUES (?)", ("Elena",))
print(cur.lastrowid)
```

No se actualiza mediante executemany, executescript ni inserciones en tablas WITHOUT ROWID.

**Resultado esperado** `5`.

### total_changes y cursor.connection

**Clave** `total-changes-y-cursor-connection`

**Definición** `total_changes` acumula cambios desde que se abrió la conexión; `cursor.connection` devuelve su conexión.

**Búsqueda** total_changes, cursor.connection

**Para recordar** Mide el incremento si necesitas cambios de una operación.

#### Medir cambios de una escritura

```python
antes = con.total_changes
cur = con.execute("UPDATE clientes SET pais = 'Spain' WHERE id = 4")
print(con.total_changes - antes, cur.connection is con)
```

El contador no representa necesariamente cambios confirmados.

**Resultado esperado** `1 True`.

## CRUD y estructura

**Clave** `crud-y-estructura`

### Definición

**Clave** `definicion`

**Definición** CRUD reúne crear registros, leerlos, actualizarlos y eliminarlos. SQLite usa SQL para estas operaciones; Python organiza valores y resultados.

**Búsqueda** CRUD, DML, DDL

**Para recordar** Usa parámetros para los datos y transacciones para cambios relacionados.

#### Leer el total de ventas

```python
print(con.execute("SELECT SUM(monto) FROM pedidos WHERE estado = ?", ("completado",)).fetchone())
```

El cálculo se realiza en SQLite.

**Resultado esperado** `(43000,)`.

### CREATE TABLE y CREATE INDEX

**Clave** `create-table-y-create-index`

**Definición** CREATE TABLE define columnas y restricciones; CREATE INDEX crea una estructura que puede acelerar búsquedas.

**Búsqueda** crear tabla, índice, DDL

**Para recordar** Un índice no sustituye las restricciones.

#### Preparar una tabla de métricas

```python
con.execute("CREATE TABLE metricas (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL)")
con.execute("CREATE INDEX ix_metricas_nombre ON metricas(nombre)")
print(con.execute("SELECT name FROM sqlite_schema WHERE name LIKE '%metricas%' ORDER BY name").fetchall())
```

Los nombres aparecen en el catálogo de SQLite.

**Resultado esperado** `[('ix_metricas_nombre',), ('metricas',)]`.

### INSERT INTO

**Clave** `insert-into`

**Definición** Inserta registros nuevos, preferiblemente con una lista explícita de columnas.

**Búsqueda** insert, insertar fila

**Para recordar** Vincula datos Python con placeholders.

#### Agregar un cliente

```python
con.execute("INSERT INTO clientes(id, nombre, pais) VALUES (?, ?, ?)", (5, "Elena", "Spain"))
print(con.execute("SELECT nombre FROM clientes WHERE id = 5").fetchone())
```

Con el modo de la demo el cambio se confirma al terminar la sentencia.

**Resultado esperado** `('Elena',)`.

### SELECT

**Clave** `select`

**Definición** Lee registros o resultados de consultas analíticas.

**Búsqueda** select, join, SQL desde Python

**Para recordar** Usa fetch o iteración para obtener datos.

#### Consultar ventas por cliente

```python
sql = """SELECT c.nombre, SUM(p.monto)
FROM clientes c JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado = ? GROUP BY c.id ORDER BY c.id"""
print(con.execute(sql, ("completado",)).fetchall())
```

SQLite hace JOIN y agregación; Python recibe el resultado.

**Resultado esperado** `[('Ana', 20000), ('Luis', 15000), ('Marta', 8000)]`.

### UPDATE

**Clave** `update`

**Definición** Cambia registros existentes según una condición.

**Búsqueda** update, modificar, where

**Para recordar** Sin WHERE se modifican todas las filas.

#### Cambiar el país de un cliente

```python
con.execute("UPDATE clientes SET pais = ? WHERE id = ?", ("Mexico", 4))
print(con.execute("SELECT pais FROM clientes WHERE id = 4").fetchone())
```

La condición identifica solo al cliente 4.

**Resultado esperado** `('Mexico',)`.

### DELETE

**Clave** `delete`

**Definición** Elimina filas seleccionadas, sujeto a restricciones y acciones referenciales.

**Búsqueda** delete, borrar registro

**Para recordar** Comprueba el filtro antes de ejecutar.

#### Eliminar un contacto sin correo

```python
cur = con.execute("DELETE FROM contactos WHERE email IS NULL")
print(cur.rowcount)
```

IS NULL selecciona el dato ausente.

**Resultado esperado** `1`.

### ALTER TABLE y DROP TABLE

**Clave** `alter-table-y-drop-table`

**Definición** ALTER cambia la estructura; DROP elimina la tabla y sus datos.

**Búsqueda** alter, drop, esquema

**Para recordar** DDL cambia la estructura, no solo registros.

#### Añadir una columna y eliminar una tabla auxiliar

```python
con.execute("ALTER TABLE contactos ADD COLUMN origen TEXT")
print(con.execute("PRAGMA table_info(contactos)").fetchall()[-1][1])
con.execute("DROP TABLE contactos")
print(con.execute("SELECT name FROM sqlite_schema WHERE name = 'contactos'").fetchone())
```

Los cambios se hacen sobre la copia en memoria.

**Resultado esperado** `origen` y `None`.

### ON CONFLICT y UPSERT

**Clave** `on-conflict-y-upsert`

**Definición** ON CONFLICT permite actualizar o ignorar una inserción que choca con una clave única.

**Búsqueda** upsert, do update, do nothing, ignore, replace

**Para recordar** UPSERT no es lo mismo que INSERT OR REPLACE.

**Nota** SQLite 3.24+ para UPSERT. OR REPLACE puede borrar la fila conflictiva antes de insertar; puede afectar relaciones.

#### Actualizar un cliente si ya existe

```python
con.execute("""INSERT INTO clientes(id, nombre) VALUES (?, ?)
ON CONFLICT(id) DO UPDATE SET nombre = excluded.nombre""", (1, "Ana Maria"))
print(con.execute("SELECT nombre FROM clientes WHERE id = 1").fetchone())
```

excluded contiene los valores que se intentaron insertar.

**Resultado esperado** `('Ana Maria',)`.

## Transacciones

**Clave** `transacciones`

### Definición

**Clave** `definicion`

**Definición** Una transacción agrupa cambios que se confirman juntos o se revierten.

**Búsqueda** transacción, atomicidad, ACID

**Para recordar** commit confirma; rollback revierte lo pendiente.

#### Revertir una actualización

```python
con.autocommit = False
con.execute("UPDATE clientes SET pais = 'Mexico' WHERE id = 4")
con.rollback()
print(con.execute("SELECT pais FROM clientes WHERE id = 4").fetchone())
```

Con autocommit=False Python mantiene una transacción abierta.

**Resultado esperado** `(None,)`.

### commit()

**Clave** `commit`

**Definición** Confirma cambios pendientes.

**Búsqueda** commit, persistencia

**Para recordar** Confirma antes de cerrar.

#### Guardar datos en un archivo

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as carpeta:
    ruta = Path(carpeta) / "ventas.db"
    with closing(sqlite3.connect(ruta, autocommit=False)) as db:
        db.execute("CREATE TABLE ventas(monto INTEGER)")
        db.execute("INSERT INTO ventas VALUES (12000)")
        db.commit()
    with closing(sqlite3.connect(ruta)) as db:
        print(db.execute("SELECT monto FROM ventas").fetchone())
```

La persistencia se verifica en otra conexión.

**Resultado esperado** `(12000,)` después de reabrir.

### rollback()

**Clave** `rollback`

**Definición** Descarta cambios no confirmados.

**Búsqueda** rollback, revertir

**Para recordar** No deshace una transacción ya confirmada.

#### Revertir una inserción

```python
con.autocommit = False
con.execute("INSERT INTO clientes(nombre) VALUES ('Elena')")
con.rollback()
print(con.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

La fila nueva no permanece.

**Resultado esperado** `(4,)`.

### autocommit

**Clave** `autocommit`

**Definición** Controla el manejo de transacciones: False, True o LEGACY_TRANSACTION_CONTROL.

**Búsqueda** autocommit, PEP 249, modo legado

**Para recordar** False requiere commit o rollback; True deja el control al motor; legado conserva las reglas históricas.

**Nota** Python 3.12+. En 3.13–3.14 el valor por defecto es LEGACY_TRANSACTION_CONTROL. Indica el modo explícitamente.

#### Cambiar de modo

```python
con.autocommit = False
print(con.in_transaction)
con.autocommit = True
print(con.in_transaction)
```

Cambiar a True confirma cambios pendientes; commit() y rollback() no tienen efecto en True.

**Resultado esperado** `True`, `False`.

### isolation_level

**Clave** `isolation-level`

**Definición** En modo legado controla el BEGIN implícito de DML: DEFERRED, IMMEDIATE, EXCLUSIVE o None.

**Búsqueda** isolation_level, legacy

**Para recordar** No tiene efecto fuera del modo legado.

**Nota** None deshabilita el inicio implícito.

#### Abrir una transacción implícita

```python
con.autocommit = sqlite3.LEGACY_TRANSACTION_CONTROL
con.isolation_level = "IMMEDIATE"
con.execute("UPDATE clientes SET pais = 'Spain' WHERE id = 4")
print(con.in_transaction)
con.rollback()
```

El primer DML abre una transacción si no existía.

**Resultado esperado** `True`.

### BEGIN, COMMIT y ROLLBACK SQL

**Clave** `begin-commit-y-rollback-sql`

**Definición** Con autocommit=True se puede controlar una transacción mediante sentencias SQL.

**Búsqueda** BEGIN DEFERRED IMMEDIATE EXCLUSIVE

**Para recordar** Para BEGIN manual en este modo usa COMMIT o ROLLBACK SQL.

**Nota** DEFERRED espera hasta acceder a la base; EXCLUSIVE restringe otras lecturas fuera de WAL. En WAL, IMMEDIATE y EXCLUSIVE son equivalentes.

#### Confirmar una transacción explícita

```python
con.execute("BEGIN IMMEDIATE")
con.execute("UPDATE clientes SET pais = 'Spain' WHERE id = 4")
con.execute("COMMIT")
print(con.in_transaction)
```

IMMEDIATE intenta reservar la escritura desde el comienzo.

**Resultado esperado** `False`.

### in_transaction

**Clave** `in-transaction`

**Definición** Indica si SQLite está dentro de una transacción de bajo nivel.

**Búsqueda** in_transaction, estado activo

**Para recordar** No es sinónimo de autocommit de Python.

#### Observar un BEGIN

```python
print(con.in_transaction)
con.execute("BEGIN")
print(con.in_transaction)
con.execute("ROLLBACK")
```

El atributo no modifica el estado.

**Resultado esperado** `False`, `True`.

### with Connection

**Clave** `with-connection`

**Definición** Confirma al salir normalmente o revierte al salir con excepción si hay una transacción aplicable.

**Búsqueda** with, context manager

**Para recordar** with con no cierra la conexión.

**Nota** Con autocommit=True el administrador de contexto no confirma ni revierte.

#### Revertir un bloque fallido

```python
con.autocommit = False
try:
    with con:
        con.execute("UPDATE clientes SET pais = 'Spain' WHERE id = 4")
        raise ValueError("Validación fallida")
except ValueError:
    pass
print(con.execute("SELECT pais FROM clientes WHERE id = 4").fetchone())
```

El error sale del bloque y provoca rollback.

**Resultado esperado** `(None,)`.

### SAVEPOINT

**Clave** `savepoint`

**Definición** Permite revertir solo parte de una transacción.

**Búsqueda** savepoint, rollback to, release

**Para recordar** ROLLBACK TO conserva el punto; RELEASE lo elimina.

#### Conservar el primer cambio

```python
con.execute("BEGIN")
con.execute("UPDATE clientes SET pais = 'Spain' WHERE id = 4")
con.execute("SAVEPOINT segundo")
con.execute("UPDATE clientes SET nombre = 'David' WHERE id = 4")
con.execute("ROLLBACK TO segundo")
con.execute("RELEASE segundo")
con.execute("COMMIT")
print(con.execute("SELECT nombre, pais FROM clientes WHERE id = 4").fetchone())
```

Solo se deshace lo posterior al punto.

**Resultado esperado** `('Diego', 'Spain')`.

### Lotes atómicos

**Clave** `lotes-atomicos`

**Definición** executemany puede dejar cambios parciales si no hay una transacción apropiada.

**Búsqueda** executemany rollback, carga atómica

**Para recordar** Agrupa todo el lote en una transacción.

#### Revertir una carga con duplicado

```python
con.autocommit = False
try:
    with con:
        con.executemany("INSERT INTO clientes(id, nombre) VALUES (?, ?)", [(5, "Elena"), (1, "Otro")])
except sqlite3.IntegrityError:
    print(con.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

El segundo INSERT falla y el primero también se revierte.

**Resultado esperado** `(4,)`.

## Tipos de datos

**Clave** `tipos-de-datos`

### Definición

**Clave** `definicion`

**Definición** SQLite tiene cinco clases de almacenamiento que sqlite3 convierte a tipos Python.

**Búsqueda** NULL INTEGER REAL TEXT BLOB

**Para recordar** None corresponde a NULL; bytes a BLOB.

#### Observar los tipos

```python
fila = con.execute("SELECT NULL, 42, 2.5, 'Ana', x'4142'").fetchone()
print(fila)
print([type(v).__name__ for v in fila])
```

La conversión ocurre al recuperar valores.

**Resultado esperado** `(None, 42, 2.5, 'Ana', b'AB')`; `['NoneType', 'int', 'float', 'str', 'bytes']`.

### Afinidad de tipos

**Clave** `afinidad-de-tipos`

**Definición** El tipo declarado orienta conversiones pero no impone siempre una clase de almacenamiento.

**Búsqueda** type affinity, INTEGER TEXT REAL NUMERIC BLOB

**Para recordar** El tipo real puede diferir del declarado.

#### Observar la afinidad INTEGER

```python
con.execute("CREATE TABLE prueba(valor INTEGER)")
con.executemany("INSERT INTO prueba VALUES (?)", [("123",), ("abc",)])
print(con.execute("SELECT valor, typeof(valor) FROM prueba ORDER BY rowid").fetchall())
```

El texto numérico se convierte; el otro permanece.

**Resultado esperado** `[(123, 'integer'), ('abc', 'text')]`.

### STRICT TABLES

**Clave** `strict-tables`

**Definición** Restringe los valores a tipos admitidos y rechaza conversiones incompatibles.

**Búsqueda** strict, tipos estrictos

**Para recordar** Admite conversiones sin pérdida.

**Nota** SQLite 3.37+.

#### Rechazar texto incompatible

```python
con.execute("CREATE TABLE prueba(valor INTEGER) STRICT")
try:
    con.execute("INSERT INTO prueba VALUES (?)", ("abc",))
except sqlite3.IntegrityError:
    print("Tipo rechazado")
```

Los tipos admitidos son INT, INTEGER, REAL, TEXT, BLOB y ANY.

**Resultado esperado** `Tipo rechazado`.

### None y NULL

**Clave** `none-y-null`

**Definición** None se vincula como NULL; para buscar valores ausentes usa IS NULL.

**Búsqueda** None, NULL, valor ausente

**Para recordar** NULL no se compara con =.

#### Buscar país ausente

```python
print(con.execute("SELECT nombre FROM clientes WHERE pais IS NULL").fetchall())
print(con.execute("SELECT nombre FROM clientes WHERE pais = ?", (None,)).fetchall())
```

La igualdad con NULL no devuelve verdadero.

**Resultado esperado** `[('Diego',)]` y `[]`.

### Fechas y horas

**Clave** `fechas-y-horas`

**Definición** SQLite no tiene un tipo de almacenamiento específico para fechas; usa texto ISO, día juliano o timestamp Unix.

**Búsqueda** date datetime strftime julianday unixepoch

**Para recordar** Mantén una representación consistente.

#### Agrupar fechas por mes y medir días

```python
print(con.execute("SELECT strftime('%Y-%m', fecha), COUNT(*) FROM pedidos GROUP BY 1 ORDER BY 1").fetchall())
print(con.execute("SELECT julianday('2026-08-03') - julianday('2026-08-01')").fetchone())
print(con.execute("SELECT date('2026-08-01'), datetime('2026-08-01', '+1 day')").fetchone())
```

strftime formatea, julianday convierte a días y date/datetime devuelven texto.

**Resultado esperado** `[('2026-08', 3), ('2026-09', 2)]`; `(2.0,)`; `('2026-08-01', '2026-08-02 00:00:00')`.

### ROWID e INTEGER PRIMARY KEY

**Clave** `rowid-e-integer-primary-key`

**Definición** ROWID identifica filas de tablas ordinarias; INTEGER PRIMARY KEY suele ser su alias.

**Búsqueda** rowid, id automático

**Para recordar** No toda PRIMARY KEY es alias de ROWID.

#### Obtener un identificador generado

```python
con.execute("INSERT INTO clientes(nombre) VALUES ('Elena')")
print(con.execute("SELECT rowid, id FROM clientes WHERE nombre = 'Elena'").fetchone())
```

SQLite asigna el identificador omitido.

**Resultado esperado** `(5, 5)`.

### AUTOINCREMENT

**Clave** `autoincrement`

**Definición** Evita reutilizar ROWID previamente confirmados de esa tabla.

**Búsqueda** autoincrement, secuencia

**Para recordar** INTEGER PRIMARY KEY suele bastar; AUTOINCREMENT cuesta más.

#### Comprobar que no se reutiliza un id

```python
con.execute("CREATE TABLE secuencia(id INTEGER PRIMARY KEY AUTOINCREMENT)")
con.execute("INSERT INTO secuencia DEFAULT VALUES")
con.execute("DELETE FROM secuencia")
print(con.execute("INSERT INTO secuencia DEFAULT VALUES").lastrowid)
```

El identificador 1 no se reutiliza.

**Resultado esperado** `2`.

### WITHOUT ROWID

**Clave** `without-rowid`

**Definición** Almacena una tabla según su clave primaria declarada, sin ROWID interno.

**Búsqueda** without rowid, clave natural

**Para recordar** lastrowid no registra inserciones en estas tablas.

#### Crear una tabla con clave textual

```python
con.execute("CREATE TABLE codigos(codigo TEXT PRIMARY KEY) WITHOUT ROWID")
con.execute("INSERT INTO codigos VALUES ('MX')")
print(con.execute("SELECT codigo FROM codigos").fetchone())
```

La clave textual identifica la fila.

**Resultado esperado** `('MX',)`.

## Representación de resultados

**Clave** `representacion-de-resultados`

### Definición

**Clave** `definicion`

**Definición** Una row factory transforma cada fila recuperada; por defecto es una tupla.

**Búsqueda** row_factory, tupla, diccionario

**Para recordar** Configura la factory antes de crear el cursor.

#### Leer una columna por nombre

```python
con.row_factory = sqlite3.Row
fila = con.execute("SELECT id, nombre FROM clientes WHERE id = 1").fetchone()
print(fila["nombre"])
```

Row permite acceso por nombre y posición.

**Resultado esperado** `Ana`.

### sqlite3.Row y keys()

**Clave** `sqlite3-row-y-keys`

**Definición** Row permite acceso por nombre sin distinguir mayúsculas, posición y keys().

**Búsqueda** Row, keys, dict

**Para recordar** Row no es un dict, pero dict(row) funciona.

#### Convertir una fila a diccionario

```python
con.row_factory = sqlite3.Row
fila = con.execute("SELECT id, nombre FROM clientes WHERE id = 1").fetchone()
print(fila.keys(), fila[0], dict(fila))
```

Los alias SQL determinan los nombres.

**Resultado esperado** `['id', 'nombre'] 1 {'id': 1, 'nombre': 'Ana'}`.

### row_factory personalizada

**Clave** `row-factory-personalizada`

**Definición** Una función recibe el cursor y la tupla de valores y devuelve la representación elegida.

**Búsqueda** row factory, diccionarios

**Para recordar** Obtén los nombres desde description.

#### Devolver diccionarios

```python
def como_dict(cur, fila):
    return {c[0]: v for c, v in zip(cur.description, fila)}
con.row_factory = como_dict
print(con.execute("SELECT id, nombre FROM clientes WHERE id = 2").fetchone())
```

La función se aplica por fila.

**Resultado esperado** `{'id': 2, 'nombre': 'Luis'}`.

### namedtuple y dataclass

**Clave** `namedtuple-y-dataclass`

**Definición** Una factory puede devolver objetos con atributos.

**Búsqueda** namedtuple, dataclass, clase personalizada

**Para recordar** Alinea los campos de la clase con las columnas.

#### Leer un cliente como objeto

```python
from collections import namedtuple
Cliente = namedtuple("Cliente", "id nombre")
cur = con.cursor()
cur.row_factory = lambda cur, fila: Cliente(*fila)
print(cur.execute("SELECT id, nombre FROM clientes WHERE id = 1").fetchone().nombre)
```

Una dataclass con esos mismos campos puede sustituir a Cliente.

**Resultado esperado** `Ana`.

### Connection.row_factory y Cursor.row_factory

**Clave** `connection-row-factory-y-cursor-row-factory`

**Definición** El valor de la conexión se copia al crear el cursor.

**Búsqueda** row_factory por cursor

**Para recordar** Cambiar la conexión no altera los cursores existentes.

#### Comparar dos cursores

```python
cur = con.cursor()
con.row_factory = sqlite3.Row
print(type(cur.execute("SELECT 1").fetchone()).__name__)
print(type(con.execute("SELECT 1").fetchone()).__name__)
```

Cada cursor conserva su configuración.

**Resultado esperado** `tuple`, `Row`.

### text_factory

**Clave** `text-factory`

**Definición** Define cómo convertir los valores TEXT; por defecto es str.

**Búsqueda** text_factory, bytes, codificación

**Para recordar** Afecta TEXT, no BLOB.

#### Recuperar texto como bytes

```python
con.text_factory = bytes
print(con.execute("SELECT nombre FROM clientes WHERE id = 1").fetchone())
```

bytes evita la decodificación habitual a str.

**Resultado esperado** `(b'Ana',)`.

## Adaptadores y convertidores

**Clave** `adaptadores-y-convertidores`

### Definición

**Clave** `definicion`

**Definición** Los adaptadores transforman objetos Python para almacenarlos; los convertidores reconstruyen objetos al leer.

**Búsqueda** adapter, converter, objetos

**Para recordar** Adaptar al escribir; convertir al leer.

**Nota** Los adaptadores y convertidores predeterminados de date y datetime están obsoletos desde Python 3.12.

#### Guardar una fecha explícitamente

```python
from datetime import date
fecha = date(2026, 8, 1)
print(con.execute("SELECT ?", (fecha.isoformat(),)).fetchone())
```

La conversión explícita no requiere registros globales.

**Resultado esperado** `('2026-08-01',)`.

### register_adapter()

**Clave** `register-adapter`

**Definición** Registra una función que transforma un tipo Python a un valor compatible con SQLite.

**Búsqueda** register_adapter, Decimal

**Para recordar** Devuelve un tipo SQLite admitido.

**Nota** El registro es global en el proceso; usa una sesión aislada para estas pruebas.

#### Adaptar Decimal a texto

```python
from decimal import Decimal
sqlite3.register_adapter(Decimal, str)
print(con.execute("SELECT ?", (Decimal("12.30"),)).fetchone())
```

Usa una columna TEXT si necesitas conservar esa representación.

**Resultado esperado** `('12.30',)`.

### __conform__() y PrepareProtocol

**Clave** `conform-y-prepareprotocol`

**Definición** Un objeto puede adaptarse mediante __conform__ cuando se solicita PrepareProtocol.

**Búsqueda** __conform__, PrepareProtocol

**Para recordar** Un adaptador registrado tiene prioridad.

#### Adaptar un código personalizado

```python
class Codigo:
    def __init__(self, valor):
        self.valor = valor
    def __conform__(self, protocolo):
        if protocolo is sqlite3.PrepareProtocol:
            return self.valor
print(con.execute("SELECT ?", (Codigo("MX-01"),)).fetchone())
```

El objeto devuelve su representación de almacenamiento.

**Resultado esperado** `('MX-01',)`.

### register_converter()

**Clave** `register-converter`

**Definición** Registra una función que recibe bytes y devuelve un objeto Python.

**Búsqueda** register_converter, conversión, bytes

**Para recordar** Activa detect_types para usar convertidores.

**Nota** El registro es global; el flag detect_types se establece al conectar.

#### Reconstruir una fecha

```python
from datetime import date
sqlite3.register_converter("FECHA_ISO", lambda b: date.fromisoformat(b.decode()))
with closing(sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_DECLTYPES)) as db:
    db.execute("CREATE TABLE fechas(valor FECHA_ISO)")
    db.execute("INSERT INTO fechas VALUES ('2026-08-01')")
    print(db.execute("SELECT valor FROM fechas").fetchone())
```

El tipo declarado activa el convertidor.

**Resultado esperado** `(datetime.date(2026, 8, 1),)`.

### PARSE_DECLTYPES

**Clave** `parse-decltypes`

**Definición** Busca convertidores según el tipo declarado de la columna.

**Búsqueda** detect_types, PARSE_DECLTYPES

**Para recordar** El nombre del tipo debe coincidir con el registro.

#### Recuperar un importe Decimal

```python
from decimal import Decimal
sqlite3.register_converter("DECIMAL_TEXT", lambda b: Decimal(b.decode()))
with closing(sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_DECLTYPES)) as db:
    db.execute("CREATE TABLE importes(valor DECIMAL_TEXT)")
    db.execute("INSERT INTO importes VALUES (?)", ("12.30",))
    print(db.execute("SELECT valor FROM importes").fetchone())
```

DECIMAL_TEXT tiene afinidad TEXT y conserva el texto decimal.

**Resultado esperado** `(Decimal('12.30'),)`.

### PARSE_COLNAMES

**Clave** `parse-colnames`

**Definición** Busca convertidores en alias de la forma nombre [TIPO].

**Búsqueda** PARSE_COLNAMES, alias, detect_types

**Para recordar** Útil para expresiones calculadas.

#### Convertir un resultado calculado

```python
from datetime import date
sqlite3.register_converter("FECHA_ISO", lambda b: date.fromisoformat(b.decode()))
with closing(sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_COLNAMES | sqlite3.PARSE_DECLTYPES)) as db:
    print(db.execute('SELECT date(\'2026-08-01\') AS "dia [FECHA_ISO]"').fetchone())
```

Si se combinan los flags, el tipo indicado en el alias tiene prioridad.

**Resultado esperado** `(datetime.date(2026, 8, 1),)`.

## Errores y diagnóstico

**Clave** `errores-y-diagnostico`

### Definición

**Clave** `definicion`

**Definición** sqlite3 usa excepciones para distinguir errores de datos, SQL y uso de la API.

**Búsqueda** sqlite3.Error, try except

**Para recordar** Captura el error más específico posible.

#### Capturar una consulta inválida

```python
try:
    con.execute("SELECT * FROM inexistente")
except sqlite3.Error as exc:
    print(type(exc).__name__)
```

Error es la base de las excepciones del módulo salvo Warning.

**Resultado esperado** `OperationalError`.

### IntegrityError

**Clave** `integrityerror`

**Definición** Indica violaciones de restricciones como claves primarias, foráneas o CHECK.

**Búsqueda** integrityerror, constraint

**Para recordar** No ignores restricciones fallidas.

#### Detectar clave repetida

```python
try:
    con.execute("INSERT INTO clientes(id, nombre) VALUES (1, 'Otra')")
except sqlite3.IntegrityError as exc:
    print(type(exc).__name__)
```

La fila original permanece.

**Resultado esperado** `IntegrityError`.

### OperationalError

**Clave** `operationalerror`

**Definición** Indica problemas operativos como tabla inexistente, SQL inválido o bloqueo.

**Búsqueda** operationalerror, database locked

**Para recordar** Distingue fallos recuperables de errores de SQL.

#### Consultar una tabla inexistente

```python
try:
    con.execute("SELECT * FROM ventas_2020")
except sqlite3.OperationalError as exc:
    print(type(exc).__name__)
```

Comprueba el esquema.

**Resultado esperado** `OperationalError`.

### ProgrammingError

**Clave** `programmingerror`

**Definición** Indica uso incorrecto de la API, como una cantidad incorrecta de parámetros.

**Búsqueda** programmingerror, binding count

**Para recordar** Comprueba cantidad y forma de los parámetros.

#### Detectar parámetros faltantes

```python
try:
    con.execute("SELECT ? + ?", (1,))
except sqlite3.ProgrammingError as exc:
    print(type(exc).__name__)
```

Hay dos placeholders y un valor.

**Resultado esperado** `ProgrammingError`.

### Jerarquía DB-API

**Clave** `jerarquia-db-api`

**Definición** DatabaseError agrupa DataError, OperationalError, IntegrityError, InternalError, ProgrammingError y NotSupportedError; InterfaceError deriva de Error.

**Búsqueda** DatabaseError DataError InternalError InterfaceError NotSupportedError Warning

**Para recordar** Usa clases de error en vez de comparar mensajes.

#### Comprobar la jerarquía

```python
print(issubclass(sqlite3.IntegrityError, sqlite3.DatabaseError))
print(issubclass(sqlite3.InterfaceError, sqlite3.Error))
print(issubclass(sqlite3.Warning, sqlite3.Error))
```

DataError se refiere a datos problemáticos, InternalError a fallos internos, InterfaceError a la interfaz, NotSupportedError a características no soportadas. Warning es una clase separada.

**Resultado esperado** `True`, `True`, `False`.

### sqlite_errorcode y sqlite_errorname

**Clave** `sqlite-errorcode-y-sqlite-errorname`

**Definición** Las excepciones procedentes de SQLite pueden exponer un código numérico y un nombre simbólico.

**Búsqueda** sqlite_errorcode, sqlite_errorname, SQLITE_*

**Para recordar** Usa constantes para distinguir errores.

**Nota** Python 3.11+. No todos los errores generados por Python los incluyen.

#### Identificar una clave primaria repetida

```python
try:
    con.execute("INSERT INTO clientes(id, nombre) VALUES (1, 'Otra')")
except sqlite3.IntegrityError as exc:
    print(exc.sqlite_errorname)
    print(exc.sqlite_errorcode == sqlite3.SQLITE_CONSTRAINT_PRIMARYKEY)
```

Los atributos identifican el error del motor.

**Resultado esperado** `SQLITE_CONSTRAINT_PRIMARYKEY`, `True`.

### try, except y finally

**Clave** `try-except-y-finally`

**Definición** finally garantiza ejecutar la liberación de recursos incluso tras un error.

**Búsqueda** finally, cerrar conexión

**Para recordar** Cierra aunque falle una consulta.

#### Cerrar una conexión al fallar

```python
db = abrir_demo()
try:
    db.execute("SELECT * FROM inexistente")
except sqlite3.OperationalError:
    print("Consulta inválida")
finally:
    db.close()
```

Combina cierre y transacciones si hay escrituras relacionadas.

**Resultado esperado** `Consulta inválida`; conexión cerrada.

## Inspección y validación de SQLite

**Clave** `inspeccion-y-validacion-de-sqlite`

### Definición

**Clave** `definicion`

**Definición** sqlite_schema y PRAGMA permiten conocer estructura y configuración de una base.

**Búsqueda** pragma, sqlite_schema, inspección

**Para recordar** Consulta el esquema antes de asumir nombres.

#### Listar tablas

```python
print(con.execute("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").fetchall())
```

sqlite_schema es el catálogo de objetos.

**Resultado esperado** `[('clientes',), ('contactos',), ('pedidos',)]`.

### PRAGMA table_info y table_list

**Clave** `pragma-table-info-y-table-list`

**Definición** table_info devuelve columnas y restricciones básicas; table_list enumera tablas y vistas.

**Búsqueda** table_info, table_list, table_xinfo

**Para recordar** table_xinfo incluye columnas generadas u ocultas.

**Nota** table_list requiere SQLite 3.37+.

#### Inspeccionar tablas y columnas

```python
print([r[1] for r in con.execute("PRAGMA table_info(clientes)")])
print(sorted(r[1] for r in con.execute("PRAGMA table_list") if r[0] == "main" and not r[1].startswith("sqlite_")))
```

Extraemos los nombres de los resultados de PRAGMA.

**Resultado esperado** `['id', 'nombre', 'pais']`; `['clientes', 'contactos', 'pedidos']`.

### PRAGMA foreign_keys

**Clave** `pragma-foreign-keys`

**Definición** Controla la comprobación de claves foráneas en la conexión.

**Búsqueda** foreign_keys, integridad referencial

**Para recordar** Habilita antes de iniciar una transacción.

#### Rechazar un cliente inexistente

```python
print(con.execute("PRAGMA foreign_keys").fetchone())
try:
    con.execute("INSERT INTO pedidos VALUES (999, 99, 100, '2026-08-01', 'completado')")
except sqlite3.IntegrityError:
    print("Cliente inexistente")
```

La demo habilita esta comprobación al conectar.

**Resultado esperado** `(1,)`, `Cliente inexistente`.

### PRAGMA foreign_key_list

**Clave** `pragma-foreign-key-list`

**Definición** Devuelve relaciones declaradas para una tabla.

**Búsqueda** foreign_key_list, FK

**Para recordar** Distingue declaración de activación.

#### Inspeccionar relación de pedidos

```python
for fila in con.execute("PRAGMA foreign_key_list(pedidos)"):
    print(fila[2:5])
```

Las posiciones 2 a 4 identifican tabla destino, columna origen y columna destino.

**Resultado esperado** `('clientes', 'cliente_id', 'id')`.

### PRAGMA integrity_check y foreign_key_check

**Clave** `pragma-integrity-check-y-foreign-key-check`

**Definición** integrity_check revisa consistencia interna; foreign_key_check busca violaciones referenciales.

**Búsqueda** integrity_check, foreign_key_check

**Para recordar** Una prueba no sustituye a la otra.

#### Validar la demo

```python
print(con.execute("PRAGMA integrity_check").fetchall())
print(con.execute("PRAGMA foreign_key_check").fetchall())
```

La lista vacía indica que no hay violaciones detectadas.

**Resultado esperado** `[('ok',)]`, `[]`.

### PRAGMA index_list e index_info

**Clave** `pragma-index-list-e-index-info`

**Definición** Permiten consultar índices de una tabla y columnas de un índice.

**Búsqueda** index_list, index_info

**Para recordar** Comprueba índices existentes antes de duplicarlos.

#### Inspeccionar un índice compuesto

```python
con.execute("CREATE INDEX ix_pedidos ON pedidos(cliente_id, fecha)")
print([r[1] for r in con.execute("PRAGMA index_list(pedidos)")])
print([r[2] for r in con.execute("PRAGMA index_info(ix_pedidos)")])
```

El orden de columnas del índice importa.

**Resultado esperado** `['ix_pedidos']`; `['cliente_id', 'fecha']`.

### ATTACH y DETACH DATABASE

**Clave** `attach-y-detach-database`

**Definición** ATTACH incorpora otra base bajo un nombre de esquema; DETACH la separa.

**Búsqueda** attach database, detach, database_list

**Para recordar** Usa esquema.tabla para distinguir bases.

#### Consultar una base auxiliar

```python
con.execute("ATTACH DATABASE ? AS auxiliar", (":memory:",))
con.execute("CREATE TABLE auxiliar.metas(monto INTEGER)")
con.execute("INSERT INTO auxiliar.metas VALUES (10000)")
print(con.execute("SELECT monto FROM auxiliar.metas").fetchone())
print([r[1] for r in con.execute("PRAGMA database_list")])
con.execute("DETACH DATABASE auxiliar")
```

DETACH libera la base auxiliar.

**Resultado esperado** `(10000,)`; `['main', 'auxiliar']`.

## Integración con pandas y archivos

**Clave** `integracion-con-pandas-y-archivos`

### Definición

**Clave** `definicion`

**Definición** sqlite3 permite combinar SQL con herramientas de análisis y archivos para extraer, transformar y cargar datos (ETL).

**Búsqueda** ETL, pandas, CSV, JSON

**Para recordar** SQL filtra y agrega; Python transforma y exporta.

#### Extraer ventas para Python

```python
filas = con.execute("SELECT cliente_id, SUM(monto) FROM pedidos WHERE estado = 'completado' GROUP BY cliente_id ORDER BY cliente_id").fetchall()
print(dict(filas))
```

La consulta reduce los datos antes de traerlos a Python.

**Resultado esperado** `{1: 20000, 2: 15000, 3: 8000}`.

### read_sql_query() y read_sql()

**Clave** `read-sql-query-y-read-sql`

**Definición** pandas puede leer el resultado de SQL directamente como DataFrame a partir de una conexión sqlite3.

**Búsqueda** pandas, read_sql_query, read_sql, dataframe

**Para recordar** Con sqlite3 usa una consulta SQL, no solo el nombre de tabla.

**Nota** Requiere pandas instalado: python -m pip install pandas.

#### Crear un DataFrame

```python
import pandas as pd
df = pd.read_sql_query("SELECT id, nombre FROM clientes ORDER BY id", con)
print(df.to_dict("records")[:2])
```

pd.read_sql con esa misma consulta también funciona.

**Resultado esperado** `[{'id': 1, 'nombre': 'Ana'}, {'id': 2, 'nombre': 'Luis'}]`; cuatro filas en total.

### params y parse_dates

**Clave** `params-y-parse-dates`

**Definición** params pasa parámetros a SQL; parse_dates convierte columnas a fechas de pandas.

**Búsqueda** read_sql_query params parse_dates

**Para recordar** Mantén los parámetros separados de la consulta.

#### Cargar pedidos con fecha tipada

```python
import pandas as pd
df = pd.read_sql_query("SELECT fecha, monto FROM pedidos WHERE id = ?", con, params=(101,), parse_dates=["fecha"])
print(df.loc[0, "fecha"].strftime("%Y-%m-%d"), df.loc[0, "monto"])
```

fecha es un timestamp de pandas.

**Resultado esperado** `2026-08-01 12000`.

### to_sql()

**Clave** `to-sql`

**Definición** Escribe un DataFrame en una tabla de SQLite.

**Búsqueda** to_sql, index, DataFrame a SQL

**Para recordar** index=False evita guardar el índice de pandas como columna.

**Nota** Con una conexión sqlite3 directa, pandas documenta que no se puede revertir la inserción mediante rollback de to_sql; no presupongas atomicidad externa.

#### Cargar metas comerciales

```python
import pandas as pd
df = pd.DataFrame({"pais": ["Mexico", "Spain"], "meta": [40000, 10000]})
df.to_sql("metas", con, index=False, if_exists="fail")
print(con.execute("SELECT * FROM metas ORDER BY pais").fetchall())
```

Los datos pasan de pandas a SQLite.

**Resultado esperado** `[('Mexico', 40000), ('Spain', 10000)]`.

### if_exists, dtype y chunksize

**Clave** `if-exists-dtype-y-chunksize`

**Definición** if_exists controla si falla, añade o reemplaza; dtype especifica tipos y chunksize el tamaño del lote.

**Búsqueda** to_sql append replace fail dtype chunksize

**Para recordar** replace elimina y recrea la tabla, incluidas sus restricciones anteriores.

#### Añadir métricas en lotes

```python
import pandas as pd
df = pd.DataFrame({"meta": [10000, 20000]})
df.to_sql("metas", con, index=False, dtype={"meta": "INTEGER"}, chunksize=1)
df.to_sql("metas", con, index=False, if_exists="append")
print(con.execute("SELECT COUNT(*) FROM metas").fetchone())
```

append conserva las filas existentes.

**Resultado esperado** `(4,)`.

### Lectura por bloques

**Clave** `lectura-por-bloques`

**Definición** read_sql_query con chunksize devuelve un iterador de DataFrames.

**Búsqueda** pandas chunksize, datos grandes

**Para recordar** Procesa cada bloque antes de pedir otro.

#### Leer cinco pedidos por bloques de dos

```python
import pandas as pd
bloques = pd.read_sql_query("SELECT id FROM pedidos ORDER BY id", con, chunksize=2)
print([len(bloque) for bloque in bloques])
```

No es necesario cargar todo el resultado de una vez.

**Resultado esperado** `[2, 2, 1]`.

### CSV

**Clave** `csv`

**Definición** csv permite convertir filas SQL en texto tabular e importar registros desde archivos.

**Búsqueda** csv, DictReader, writer, importar exportar

**Para recordar** Convierte tipos antes de insertar y usa parámetros.

#### Exportar clientes a CSV

```python
import csv, io
archivo = io.StringIO()
writer = csv.writer(archivo, lineterminator="\n")
writer.writerow(["id", "nombre"])
writer.writerows(con.execute("SELECT id, nombre FROM clientes WHERE id <= 2 ORDER BY id"))
print(archivo.getvalue(), end="")
```

StringIO representa un archivo de texto en memoria.

**Resultado esperado** Tres líneas: `id,nombre`, `1,Ana`, `2,Luis`.

### Importar CSV

**Clave** `importar-csv`

**Definición** DictReader interpreta encabezados como claves; executemany carga los registros transformados.

**Búsqueda** csv.DictReader, ETL, carga masiva

**Para recordar** Los campos del CSV se leen como texto.

#### Cargar clientes desde CSV

```python
import csv, io
archivo = io.StringIO("id,nombre,pais\n5,Elena,Spain\n6,Pablo,Mexico\n")
filas = ((int(r["id"]), r["nombre"], r["pais"]) for r in csv.DictReader(archivo))
con.executemany("INSERT INTO clientes VALUES (?, ?, ?)", filas)
print(con.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

El generador convierte los ids antes de vincularlos.

**Resultado esperado** `(6,)`.

### JSON

**Clave** `json`

**Definición** json convierte registros Python compatibles en JSON y viceversa.

**Búsqueda** json.dumps, json.loads, exportar

**Para recordar** Convierte Row a dict para conservar los nombres.

#### Exportar un cliente

```python
import json
con.row_factory = sqlite3.Row
fila = con.execute("SELECT id, nombre FROM clientes WHERE id = 1").fetchone()
print(json.dumps(dict(fila), ensure_ascii=False))
```

Para fechas, Decimal o bytes se necesita una representación JSON explícita.

**Resultado esperado** `{"id": 1, "nombre": "Ana"}`.

### Importar JSON

**Clave** `importar-json`

**Definición** json.loads interpreta texto JSON como objetos Python; los valores se insertan con parámetros.

**Búsqueda** json.loads, insertar diccionarios

**Para recordar** Valida campos y tipos antes de cargar.

#### Importar un cliente

```python
import json
datos = json.loads('[{"id": 5, "nombre": "Elena", "pais": null}]')
con.executemany("INSERT INTO clientes VALUES (:id, :nombre, :pais)", datos)
print(con.execute("SELECT nombre, pais FROM clientes WHERE id = 5").fetchone())
```

null se convierte a None y después a NULL.

**Resultado esperado** `('Elena', None)`.

### Validar conteos y duplicados

**Clave** `validar-conteos-y-duplicados`

**Definición** La validación compara resultados con reglas de negocio, no solo con la ausencia de errores.

**Búsqueda** validación, duplicados, calidad de datos

**Para recordar** Comprueba conteos, claves y valores ausentes.

#### Detectar correos repetidos

```python
print(con.execute("SELECT email, COUNT(*) FROM contactos WHERE email IS NOT NULL GROUP BY email HAVING COUNT(*) > 1").fetchall())
```

Se excluyen ausentes antes de buscar repeticiones.

**Resultado esperado** `[('ana@example.com', 2)]`.

## Concurrencia y rendimiento

**Clave** `concurrencia-y-rendimiento`

### Definición

**Clave** `definicion`

**Definición** SQLite permite múltiples lectores pero serializa las escrituras; el rendimiento depende también de índices, transacciones y tamaño de resultados.

**Búsqueda** concurrencia, bloqueo, optimización

**Para recordar** Mantén transacciones de escritura breves.

#### Comprobar el plan de una búsqueda

```python
print(con.execute("EXPLAIN QUERY PLAN SELECT * FROM clientes WHERE id = 1").fetchall()[0][3])
```

El texto exacto del plan depende de la versión de SQLite.

**Resultado esperado** Una descripción de búsqueda por INTEGER PRIMARY KEY.

### EXPLAIN QUERY PLAN

**Clave** `explain-query-plan`

**Definición** Muestra una descripción de cómo se accede a las tablas e índices.

**Búsqueda** explain, scan, search, query plan

**Para recordar** SEARCH indica búsqueda restringida; SCAN recorre una fuente.

#### Comparar el uso de un índice

```python
con.execute("CREATE INDEX ix_estado ON pedidos(estado)")
plan = con.execute("EXPLAIN QUERY PLAN SELECT * FROM pedidos WHERE estado = ?", ("cancelado",)).fetchall()
print([r[3] for r in plan])
```

El optimizador elige el plan; no dependas de su formato exacto.

**Resultado esperado** Un plan que normalmente incluye SEARCH pedidos USING INDEX ix_estado.

### PRAGMA journal_mode y WAL

**Clave** `pragma-journal-mode-y-wal`

**Definición** El modo WAL registra cambios en un archivo adicional y permite que lectores y escritor trabajen simultáneamente en más situaciones.

**Búsqueda** WAL, journal_mode, write ahead log

**Para recordar** WAL sigue permitiendo un solo escritor a la vez.

**Nota** WAL requiere un entorno compatible con archivos compartidos locales y puede generar archivos -wal y -shm.

#### Activar WAL en un archivo temporal

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as carpeta:
    with closing(sqlite3.connect(Path(carpeta) / "ventas.db", autocommit=True)) as db:
        print(db.execute("PRAGMA journal_mode=WAL").fetchone())
```

No se puede activar WAL real en :memory:.

**Resultado esperado** `('wal',)` en un sistema de archivos compatible.

### timeout y busy_timeout

**Clave** `timeout-y-busy-timeout`

**Definición** timeout indica segundos de espera ante ciertos bloqueos; PRAGMA busy_timeout usa milisegundos.

**Búsqueda** timeout, busy_timeout, database locked

**Para recordar** Esperar no elimina la causa del bloqueo.

#### Configurar la espera

```python
with closing(sqlite3.connect(":memory:", timeout=2.0)) as db:
    print(db.execute("PRAGMA busy_timeout").fetchone())
    db.execute("PRAGMA busy_timeout=500")
    print(db.execute("PRAGMA busy_timeout").fetchone())
```

El PRAGMA cambia el manejador de espera de esa conexión.

**Resultado esperado** `(2000,)`, `(500,)`.

### Conexiones independientes y bloqueos

**Clave** `conexiones-independientes-y-bloqueos`

**Definición** Conexiones a un mismo archivo compiten por el acceso de escritura.

**Búsqueda** database locked, writer, transacciones

**Para recordar** Libera el bloqueo confirmando o revirtiendo.

#### Detectar un escritor ocupado

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as carpeta:
    ruta = Path(carpeta) / "ventas.db"
    with closing(sqlite3.connect(ruta, autocommit=True)) as a, closing(sqlite3.connect(ruta, timeout=0, autocommit=True)) as b:
        a.execute("BEGIN IMMEDIATE")
        try:
            b.execute("BEGIN IMMEDIATE")
        except sqlite3.OperationalError as exc:
            print(exc.sqlite_errorname)
        finally:
            a.execute("ROLLBACK")
```

La segunda conexión no puede obtener el permiso de escritura.

**Resultado esperado** `SQLITE_BUSY`.

### check_same_thread y threadsafety

**Clave** `check-same-thread-y-threadsafety`

**Definición** Por defecto la conexión solo se usa en el hilo que la creó; threadsafety informa el nivel DB-API soportado por la compilación.

**Búsqueda** threadsafety, check_same_thread, hilos

**Para recordar** Desactivar la comprobación no vuelve seguras todas las operaciones concurrentes.

#### Inspeccionar el nivel de seguridad

```python
print(sqlite3.threadsafety in (0, 1, 3))
with closing(sqlite3.connect(":memory:", check_same_thread=False)) as db:
    print(db.execute("SELECT 1").fetchone())
```

Si compartes una conexión entre hilos debes coordinar accesos según el modo del motor; prefiere conexiones independientes.

**Resultado esperado** `True`, `(1,)`.

### cached_statements

**Clave** `cached-statements`

**Definición** Configura cuántas sentencias preparadas puede conservar la conexión para reutilizarlas.

**Búsqueda** cached_statements, caché SQL

**Para recordar** Reutiliza consultas parametrizadas en vez de generar SQL distinto por cada valor.

#### Repetir la misma plantilla

```python
with closing(sqlite3.connect(":memory:", cached_statements=64)) as db:
    for n in (1, 2):
        print(db.execute("SELECT ? * 2", (n,)).fetchone())
```

El texto SQL es idéntico; solo cambia el parámetro.

**Resultado esperado** `(2,)`, `(4,)`.

### VACUUM, ANALYZE y PRAGMA optimize

**Clave** `vacuum-analyze-y-pragma-optimize`

**Definición** VACUUM reconstruye la base; ANALYZE recopila estadísticas; optimize ayuda a mantenerlas cuando es conveniente.

**Búsqueda** vacuum, analyze, optimize, mantenimiento

**Para recordar** VACUUM no se ejecuta dentro de una transacción activa.

**Nota** En archivos grandes, VACUUM puede requerir tiempo y espacio adicional; optimize es preferible para mantenimiento rutinario en SQLite moderno.

#### Mantener una copia de práctica

```python
con.execute("CREATE INDEX ix_estado ON pedidos(estado)")
con.execute("ANALYZE")
con.execute("PRAGMA optimize")
con.execute("VACUUM")
print(con.execute("PRAGMA integrity_check").fetchone())
```

Las operaciones no cambian los registros de negocio.

**Resultado esperado** `('ok',)`.

## Copias y exportación de bases

**Clave** `copias-y-exportacion-de-bases`

### Definición

**Clave** `definicion`

**Definición** El módulo permite copiar una base completa o exportar su contenido a SQL o bytes.

**Búsqueda** backup, iterdump, serialize

**Para recordar** Una copia de base no es lo mismo que exportar una consulta.

#### Copiar la demo a otra conexión

```python
with closing(sqlite3.connect(":memory:")) as destino:
    con.backup(destino)
    print(destino.execute("SELECT COUNT(*) FROM pedidos").fetchone())
```

backup copia el contenido de la base seleccionada.

**Resultado esperado** `(5,)`.

### backup()

**Clave** `backup`

**Definición** Copia una base SQLite a otra conexión, incluso si existen accesos concurrentes compatibles.

**Búsqueda** backup, pages, progress, name, sleep

**Para recordar** La conexión de destino recibe la copia.

**Nota** No uses como origen una conexión con una escritura pendiente que impida completar el respaldo.

#### Crear un respaldo en disco

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as carpeta:
    ruta = Path(carpeta) / "respaldo.db"
    with closing(sqlite3.connect(ruta)) as destino:
        con.backup(destino, pages=2)
    with closing(sqlite3.connect(ruta)) as verificacion:
        print(verificacion.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

pages define el tamaño de cada paso de copia; progress puede observar el avance.

**Resultado esperado** `(4,)`.

### iterdump()

**Clave** `iterdump`

**Definición** Genera sentencias SQL que reconstruyen una base.

**Búsqueda** iterdump, dump, exportar SQL

**Para recordar** El resultado es texto SQL, no un archivo binario.

**Nota** Python 3.13+ admite filter para seleccionar objetos por patrón LIKE; considera dependencias de claves foráneas.

#### Reconstruir desde un script

```python
script = "\n".join(con.iterdump())
with closing(sqlite3.connect(":memory:")) as destino:
    destino.executescript(script)
    print(destino.execute("SELECT COUNT(*) FROM pedidos").fetchone())
```

El volcado incluye estructura y registros.

**Resultado esperado** `(5,)`.

### serialize() y deserialize()

**Clave** `serialize-y-deserialize`

**Definición** serialize obtiene una representación binaria de una base; deserialize carga esos bytes en una conexión.

**Búsqueda** serialize, deserialize, bytes

**Para recordar** No equivale a JSON ni a un dump SQL.

**Nota** Python 3.11+ y compilación con las API de serialización de SQLite. No deserialices durante una transacción de lectura o respaldo activo.

#### Clonar una base con bytes

```python
datos = con.serialize()
with closing(sqlite3.connect(":memory:")) as destino:
    destino.deserialize(datos)
    print(destino.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

La conexión de destino queda asociada a la base deserializada.

**Resultado esperado** `(4,)`.

## Funciones SQL personalizadas

**Clave** `funciones-sql-personalizadas`

### Definición

**Clave** `definicion`

**Definición** SQLite puede ejecutar funciones Python registradas en una conexión para calcular valores dentro de SQL.

**Búsqueda** create_function, UDF, funciones personalizadas

**Para recordar** El registro pertenece a la conexión.

#### Calcular un impuesto de ejemplo

```python
con.create_function("impuesto", 1, lambda monto: monto * 16 // 100)
print(con.execute("SELECT impuesto(monto) FROM pedidos WHERE id = 101").fetchone())
```

El cálculo usa centavos enteros y trunca fracciones de centavo para este ejemplo.

**Resultado esperado** `(1920,)`.

### create_function()

**Clave** `create-function`

**Definición** Registra una función escalar SQL con nombre, número de argumentos y callable Python.

**Búsqueda** create_function, narg, deterministic

**Para recordar** Una función escalar devuelve un valor por llamada.

**Nota** No marques como determinista una función que dependa de tiempo, aleatoriedad o estado externo; requiere soporte del motor. Usa None como función para desregistrar.

#### Normalizar texto

```python
con.create_function("normalizar", 1, lambda s: s.strip().lower() if s is not None else None, deterministic=True)
print(con.execute("SELECT normalizar(?)", (" ANA ",)).fetchone())
```

deterministic indica que entradas iguales producen el mismo resultado.

**Resultado esperado** `('ana',)`.

### create_aggregate()

**Clave** `create-aggregate`

**Definición** Registra una agregación cuya clase implementa step y finalize.

**Búsqueda** create_aggregate, step, finalize

**Para recordar** step acumula filas; finalize devuelve el resultado.

#### Sumar montos que superan 10000

```python
class SumaAlta:
    def __init__(self):
        self.total = 0
    def step(self, monto):
        if monto is not None and monto > 10000:
            self.total += monto
    def finalize(self):
        return self.total
con.create_aggregate("suma_alta", 1, SumaAlta)
print(con.execute("SELECT suma_alta(monto) FROM pedidos").fetchone())
```

SQLite crea una instancia por grupo y llama step por fila.

**Resultado esperado** `(27000,)`.

### create_window_function()

**Clave** `create-window-function`

**Definición** Registra una función agregada de ventana con step, inverse, value y finalize.

**Búsqueda** create_window_function, inverse, value, ventana

**Para recordar** inverse retira una fila que sale del marco; value devuelve el acumulado actual.

**Nota** Python 3.11+ y SQLite 3.25+. El ejemplo supone montos no nulos.

#### Calcular una suma móvil de dos pedidos

```python
class SumaMovil:
    def __init__(self):
        self.total = 0
    def step(self, valor):
        self.total += valor
    def inverse(self, valor):
        self.total -= valor
    def value(self):
        return self.total
    def finalize(self):
        return self.total
con.create_window_function("suma_movil", 1, SumaMovil)
print(con.execute("SELECT id, suma_movil(monto) OVER (ORDER BY id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) FROM pedidos ORDER BY id").fetchall())
```

El marco incluye la fila actual y la anterior.

**Resultado esperado** `[(101, 12000), (102, 20000), (103, 23000), (104, 20000), (105, 13000)]`.

### create_collation()

**Clave** `create-collation`

**Definición** Registra una comparación de texto personalizada para COLLATE.

**Búsqueda** create_collation, ordenar texto, comparación

**Para recordar** Devuelve negativo, cero o positivo según el orden.

#### Ordenar nombres en sentido inverso

```python
def inversa(a, b):
    return (b > a) - (b < a)
con.create_collation("INVERSA", inversa)
print(con.execute("SELECT nombre FROM clientes ORDER BY nombre COLLATE INVERSA").fetchall())
```

La comparación invierte el orden lexicográfico; None desregistra la collation.

**Resultado esperado** `[('Marta',), ('Luis',), ('Diego',), ('Ana',)]`.

## Callbacks y control de ejecución

**Clave** `callbacks-y-control-de-ejecucion`

### Definición

**Clave** `definicion`

**Definición** Los callbacks son funciones Python que SQLite invoca durante determinadas operaciones.

**Búsqueda** callback, traza, autorización, progreso

**Para recordar** El callback debe ser breve y cumplir el contrato de retorno.

#### Observar una sentencia

```python
trazas = []
con.set_trace_callback(trazas.append)
con.execute("SELECT 1").fetchone()
con.set_trace_callback(None)
print(trazas)
```

La traza permite ver sentencias ejecutadas.

**Resultado esperado** `['SELECT 1']`.

### set_trace_callback()

**Clave** `set-trace-callback`

**Definición** Recibe el texto de cada sentencia SQL ejecutada por el motor, incluidas algunas sentencias internas.

**Búsqueda** trace callback, depuración SQL

**Para recordar** None desactiva el callback.

#### Registrar una consulta parametrizada

```python
con.set_trace_callback(print)
con.execute("SELECT nombre FROM clientes WHERE id = ?", (1,)).fetchone()
con.set_trace_callback(None)
```

Los parámetros pueden aparecer en el texto de la traza; evita registrar datos sensibles.

**Resultado esperado** Una traza de SELECT con el valor 1 incorporado.

### set_progress_handler()

**Clave** `set-progress-handler`

**Definición** Invoca un callback cada cierto número de instrucciones de la máquina virtual SQLite.

**Búsqueda** progress handler, cancelar consulta

**Para recordar** Un retorno distinto de cero interrumpe la operación.

**Nota** El intervalo cuenta instrucciones internas, no filas ni segundos.

#### Interrumpir una consulta de prueba

```python
con.set_progress_handler(lambda: 1, 1)
try:
    con.execute("SELECT COUNT(*) FROM pedidos").fetchone()
except sqlite3.DatabaseError as exc:
    print(exc.sqlite_errorname)
finally:
    con.set_progress_handler(None, 0)
```

La interrupción evita que termine la consulta.

**Resultado esperado** `SQLITE_INTERRUPT`.

### set_authorizer()

**Clave** `set-authorizer`

**Definición** Permite aceptar, denegar o ignorar acciones solicitadas por SQL.

**Búsqueda** authorizer, SQLITE_OK, SQLITE_DENY, SQLITE_IGNORE

**Para recordar** SQLITE_DENY rechaza la acción; no confíes solo en filtros de texto.

**Nota** SQLITE_IGNORE tiene efectos específicos según la acción; por ejemplo puede devolver NULL para una lectura de columna.

#### Impedir borrados

```python
def autorizar(accion, arg1, arg2, esquema, origen):
    if accion == sqlite3.SQLITE_DELETE:
        return sqlite3.SQLITE_DENY
    return sqlite3.SQLITE_OK
con.set_authorizer(autorizar)
try:
    con.execute("DELETE FROM contactos")
except sqlite3.DatabaseError as exc:
    print(exc.sqlite_errorname)
finally:
    con.set_authorizer(None)
```

El callback deniega la acción antes de ejecutar el borrado.

**Resultado esperado** `SQLITE_AUTH`.

### interrupt()

**Clave** `interrupt`

**Definición** Solicita interrumpir operaciones SQL en ejecución desde otro hilo.

**Búsqueda** interrupt, cancelar, hilos

**Para recordar** No cierres la conexión mientras otro hilo la interrumpe.

**Nota** La cancelación depende del momento en que se solicita; comprueba que la consulta está activa antes de llamar a interrupt().

#### Interrumpir una consulta activa

```python
import threading
inicio = threading.Event()
fin = threading.Event()

def pausa():
    inicio.set()
    fin.wait(2)
    return 1

def cancelar():
    if inicio.wait(2):
        con.interrupt()
    fin.set()

con.create_function("pausa", 0, pausa)
hilo = threading.Thread(target=cancelar)
hilo.start()
try:
    con.execute("SELECT pausa() FROM pedidos").fetchall()
except sqlite3.OperationalError as exc:
    print(exc.sqlite_errorname)
finally:
    hilo.join()
```

La función de prueba sincroniza la consulta activa con el hilo que solicita la interrupción. Los tiempos máximos de espera evitan que el ejemplo quede bloqueado indefinidamente.

**Resultado esperado** `SQLITE_INTERRUPT` cuando se solicita la interrupción durante la consulta.

### enable_callback_tracebacks()

**Clave** `enable-callback-tracebacks`

**Definición** Habilita la impresión de trazas de excepciones de callbacks que normalmente no se muestran completas.

**Búsqueda** enable_callback_tracebacks, depurar UDF

**Para recordar** Activa solo durante diagnóstico y vuelve a desactivar.

#### Diagnosticar un fallo de función

```python
sqlite3.enable_callback_tracebacks(True)
try:
    con.create_function("fallo", 0, lambda: 1 / 0)
    con.execute("SELECT fallo()").fetchone()
except sqlite3.OperationalError:
    print("Error de función")
finally:
    sqlite3.enable_callback_tracebacks(False)
```

La excepción original del callback se notifica como excepción no capturada internamente, además del error SQL.

**Resultado esperado** Una traza de ZeroDivisionError en stderr y `Error de función` en stdout.

## BLOB y acceso binario

**Clave** `blob-y-acceso-binario`

### Definición

**Clave** `definicion`

**Definición** Un BLOB conserva bytes sin interpretarlos como texto. sqlite3 acepta bytes directamente.

**Búsqueda** BLOB, binario, bytes

**Para recordar** Usa BLOB para contenido binario y TEXT para texto.

#### Guardar un contenido binario

```python
con.execute("CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)")
con.execute("INSERT INTO archivos VALUES (?, ?)", (1, b"ABC"))
print(con.execute("SELECT datos FROM archivos WHERE id=1").fetchone())
```

El valor se recupera sin decodificar.

**Resultado esperado** `(b'ABC',)`.

### blobopen() y zeroblob()

**Clave** `blobopen-y-zeroblob`

**Definición** Abre un BLOB existente para lectura y escritura incremental; zeroblob reserva un tamaño fijo.

**Búsqueda** blobopen, zeroblob, Blob

**Para recordar** No puedes aumentar el tamaño mediante Blob.write.

**Nota** Python 3.11+. No funciona con tablas WITHOUT ROWID; readonly=True abre un BLOB sin permitir escritura.

#### Escribir tres bytes en un BLOB reservado

```python
con.execute("CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)")
con.execute("INSERT INTO archivos VALUES (1, zeroblob(3))")
with con.blobopen("archivos", "datos", 1) as blob:
    blob.write(b"ABC")
print(con.execute("SELECT datos FROM archivos").fetchone())
```

El identificador pasado es el ROWID de la fila.

**Resultado esperado** `(b'ABC',)`.

### read(), write(), seek(), tell() y close()

**Clave** `read-write-seek-tell-y-close`

**Definición** Blob se comporta como un archivo de tamaño fijo con posición de lectura y escritura.

**Búsqueda** Blob.read Blob.write Blob.seek Blob.tell Blob.close

**Para recordar** Usa with o close para liberar el recurso.

#### Leer y modificar parte del contenido

```python
con.execute("CREATE TABLE archivos(id INTEGER PRIMARY KEY, datos BLOB)")
con.execute("INSERT INTO archivos VALUES (1, x'41424344')")
with con.blobopen("archivos", "datos", 1) as blob:
    print(blob.read(2), blob.tell())
    blob.seek(1)
    blob.write(b"X")
    print(blob[:], blob[0], len(blob))
```

Se puede usar indexación y slicing; el tamaño permanece en cuatro bytes.

**Resultado esperado** `b'AB' 2`; `b'AXCD' 65 4`.

## Configuración y extensiones

**Clave** `configuracion-y-extensiones`

### Definición

**Clave** `definicion`

**Definición** La conexión expone límites y opciones de SQLite; algunas dependen de la versión y compilación.

**Búsqueda** getlimit, setlimit, getconfig, setconfig

**Para recordar** Comprueba soporte antes de depender de una opción.

#### Consultar límite de variables

```python
print(con.getlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER) > 0)
```

El número exacto depende de la compilación y configuración.

**Resultado esperado** `True`.

### getlimit() y setlimit()

**Clave** `getlimit-y-setlimit`

**Definición** Leen o modifican límites de recursos del motor, identificados por constantes SQLITE_LIMIT.

**Búsqueda** getlimit setlimit SQLITE_LIMIT_VARIABLE_NUMBER

**Para recordar** setlimit devuelve el límite anterior y respeta el máximo de compilación.

**Nota** Python 3.11+.

#### Limitar parámetros de una consulta

```python
anterior = con.setlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER, 10)
print(con.getlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER))
con.setlimit(sqlite3.SQLITE_LIMIT_VARIABLE_NUMBER, anterior)
```

El límite se aplica a esa conexión.

**Resultado esperado** `10` en compilaciones que permiten al menos diez variables.

### getconfig() y setconfig()

**Clave** `getconfig-y-setconfig`

**Definición** Consultan o modifican opciones booleanas SQLITE_DBCONFIG de la conexión.

**Búsqueda** getconfig setconfig SQLITE_DBCONFIG

**Para recordar** Las constantes disponibles dependen de SQLite.

**Nota** Python 3.12+; requiere la constante en la compilación.

#### Activar comprobación de claves foráneas

```python
if hasattr(sqlite3, "SQLITE_DBCONFIG_ENABLE_FKEY"):
    con.setconfig(sqlite3.SQLITE_DBCONFIG_ENABLE_FKEY, True)
    print(con.getconfig(sqlite3.SQLITE_DBCONFIG_ENABLE_FKEY))
```

Es una alternativa de API a configurar ciertas opciones del motor.

**Resultado esperado** `True` si la opción está disponible.

### Extensiones cargables

**Clave** `extensiones-cargables`

**Definición** enable_load_extension habilita o deshabilita la carga; load_extension carga una biblioteca SQLite nativa.

**Búsqueda** enable_load_extension, load_extension, entrypoint

**Para recordar** Mantén la carga deshabilitada salvo para una biblioteca confiable.

**Nota** No todas las compilaciones incluyen esta capacidad. Desde Python 3.12, load_extension admite entrypoint para especificar el símbolo de inicialización.

#### Comprobar la capacidad sin cargar bibliotecas

```python
try:
    con.enable_load_extension(False)
    print("Carga deshabilitada")
except (AttributeError, sqlite3.NotSupportedError, sqlite3.OperationalError):
    print("Función no disponible")
```

Para cargar una biblioteca verificada se habilita temporalmente, se usa con.load_extension(ruta) y se deshabilita en finally.

**Resultado esperado** `Carga deshabilitada` si se soporta; de lo contrario `Función no disponible`.

### factory de conexión y cursor

**Clave** `factory-de-conexion-y-cursor`

**Definición** El parámetro factory permite usar subclases de Connection o Cursor para personalizar su comportamiento.

**Búsqueda** factory, Connection, Cursor, subclase

**Para recordar** La clase debe ser compatible con la interfaz esperada.

#### Crear una conexión con método auxiliar

```python
class Conexion(sqlite3.Connection):
    def escalar(self, sql):
        return self.execute(sql).fetchone()[0]
with closing(sqlite3.connect(":memory:", factory=Conexion)) as db:
    print(db.escalar("SELECT 7"))
```

También puedes pasar una subclase de Cursor a con.cursor(factory=...).

**Resultado esperado** `7`.

## Compatibilidad y DB-API 2.0

**Clave** `compatibilidad-y-db-api-2-0`

### Definición

**Clave** `definicion`

**Definición** sqlite3 implementa la interfaz DB-API 2.0 de Python y se apoya en una versión concreta del motor SQLite.

**Búsqueda** PEP 249, DB-API 2.0, versión SQLite

**Para recordar** La versión de Python no identifica por sí sola la de SQLite.

#### Inspeccionar el entorno

```python
import sys
print(sys.version_info[:2])
print(sqlite3.sqlite_version)
```

La segunda determina las características SQL disponibles.

**Resultado esperado** La versión de Python y la versión SQLite realmente instaladas.

### apilevel y paramstyle

**Clave** `apilevel-y-paramstyle`

**Definición** apilevel identifica la versión de DB-API; paramstyle anuncia el estilo de parámetros declarado.

**Búsqueda** apilevel, paramstyle, qmark

**Para recordar** sqlite3 también admite parámetros nombrados.

#### Consultar la interfaz

```python
print(sqlite3.apilevel, sqlite3.paramstyle)
```

Los valores describen la interfaz Python.

**Resultado esperado** `2.0 qmark`.

### sqlite_version y sqlite_version_info

**Clave** `sqlite-version-y-sqlite-version-info`

**Definición** Informan la versión del motor como texto y tupla numérica.

**Búsqueda** sqlite_version, sqlite_version_info, compatibilidad

**Para recordar** Compara tuplas de enteros para verificar versiones.

#### Comprobar soporte de RETURNING

```python
print(sqlite3.sqlite_version_info >= (3, 35, 0))
```

No compares versiones como cadenas de texto.

**Resultado esperado** `True` si SQLite admite RETURNING.

### setinputsizes() y setoutputsize()

**Clave** `setinputsizes-y-setoutputsize`

**Definición** Métodos requeridos por DB-API que no realizan ninguna operación en sqlite3.

**Búsqueda** setinputsizes, setoutputsize, DB-API

**Para recordar** No modifican tamaños ni reservan memoria en este módulo.

#### Usar los métodos de compatibilidad

```python
cur = con.cursor()
print(cur.setinputsizes([10]), cur.setoutputsize(100))
```

No se necesitan para trabajar normalmente con SQLite.

**Resultado esperado** `None None`.

### Cambios entre versiones

**Clave** `cambios-entre-versiones`

**Definición** La disponibilidad de funciones depende de Python y del motor; algunas API antiguas se deprecian o eliminan.

**Búsqueda** versiones, deprecaciones, Python 3.11 3.12 3.13 3.14

**Para recordar** Consulta documentación de la versión que ejecutas.

**Nota** Los adaptadores de fechas por defecto se deprecaron en 3.12; sqlite3.version y version_info se eliminaron en 3.14. En 3.14 los placeholders nombrados exigen diccionarios y fetchmany rechaza tamaños negativos. Se recomienda usar argumentos de configuración por nombre por los cambios anunciados para 3.15.

#### Comprobar API moderna

```python
print(hasattr(sqlite3.Connection, "autocommit"))
print(hasattr(sqlite3.Connection, "blobopen"))
```

autocommit y getconfig/setconfig llegaron en 3.12; blobopen, serialize/deserialize, límites y funciones de ventana en 3.11.

**Resultado esperado** `True`, `True` en Python 3.13–3.14.

## Pruebas y flujos reproducibles

**Clave** `pruebas-y-flujos-reproducibles`

### Definición

**Clave** `definicion`

**Definición** Una base aislada permite probar consultas, escrituras y reglas de integridad sin tocar datos reales.

**Búsqueda** testing, fixtures, base en memoria

**Para recordar** Parte de datos conocidos y verifica resultados concretos.

#### Validar una métrica de ventas

```python
total = con.execute("SELECT SUM(monto) FROM pedidos WHERE estado = 'completado'").fetchone()[0]
assert total == 43000
print("Validación correcta")
```

La prueba falla si cambia la lógica o el dataset.

**Resultado esperado** `Validación correcta`.

### Aislamiento de pruebas

**Clave** `aislamiento-de-pruebas`

**Definición** Cada prueba abre su propia base para que las modificaciones no contaminen otras pruebas.

**Búsqueda** testing, fixture, aislamiento

**Para recordar** Una conexión nueva equivale a un estado inicial nuevo en la demo.

#### Comprobar independencia

```python
with closing(abrir_demo()) as a, closing(abrir_demo()) as b:
    a.execute("DELETE FROM contactos")
    print(a.execute("SELECT COUNT(*) FROM contactos").fetchone())
    print(b.execute("SELECT COUNT(*) FROM contactos").fetchone())
```

La segunda conexión conserva sus filas originales.

**Resultado esperado** `(0,)`, `(4,)`.

### Procesamiento incremental y generadores

**Clave** `procesamiento-incremental-y-generadores`

**Definición** Combina iteración o fetchmany con executemany para procesar registros sin cargar todo en memoria.

**Búsqueda** batch, streaming, generador, ETL

**Para recordar** Si origen y destino son distintos, conserva sus cursores separados.

#### Copiar ids por lotes

```python
with closing(sqlite3.connect(":memory:", autocommit=False)) as destino:
    with destino:
        destino.execute("CREATE TABLE ids(id INTEGER PRIMARY KEY)")
        cur = con.execute("SELECT id FROM pedidos ORDER BY id")
        while bloque := cur.fetchmany(2):
            destino.executemany("INSERT INTO ids VALUES (?)", bloque)
    print(destino.execute("SELECT COUNT(*) FROM ids").fetchone())
```

Cada bloque se inserta sin construir una lista con todos los registros.

**Resultado esperado** `(5,)`.

### CLI de sqlite3

**Clave** `cli-de-sqlite3`

**Definición** Python incluye una interfaz de línea de comandos para ejecutar SQL sin escribir un script Python.

**Búsqueda** python -m sqlite3, terminal, consola

**Para recordar** La CLI usa el SQLite integrado en Python.

**Nota** La CLI está disponible desde Python 3.12.

#### Consultar desde la terminal

```bash
python -m sqlite3 :memory: "SELECT 2 + 3;"
```

El comando puede recibir una ruta de base de datos y una sentencia SQL. Ejecútalo en una terminal, no dentro del intérprete Python.

**Resultado esperado** `(5,)`.

## Fuentes

- [Python 3.14 — sqlite3](https://docs.python.org/3.14/library/sqlite3.html): referencia de Connection, Cursor, Row, Blob, excepciones, funciones de módulo, parámetros, transacciones y cambios de versión.
- [Python 3.13 — sqlite3](https://docs.python.org/3.13/library/sqlite3.html): referencia de compatibilidad con el entorno de los ejemplos.
- [PEP 249 — DB-API 2.0](https://peps.python.org/pep-0249/): contrato de conexión, cursor, parámetros y jerarquía de excepciones.
- [SQLite — tipos de datos](https://www.sqlite.org/datatype3.html) y [tablas STRICT](https://www.sqlite.org/stricttables.html): clases de almacenamiento, afinidad y validación.
- [SQLite — ROWID y AUTOINCREMENT](https://www.sqlite.org/autoinc.html) y [WITHOUT ROWID](https://www.sqlite.org/withoutrowid.html): claves e identificadores.
- [SQLite — fechas](https://www.sqlite.org/lang_datefunc.html), [UPSERT](https://www.sqlite.org/lang_upsert.html) y [RETURNING](https://www.sqlite.org/lang_returning.html): sintaxis y requisitos de versión.
- [SQLite — URI](https://www.sqlite.org/uri.html) y [bases en memoria](https://www.sqlite.org/inmemorydb.html): modos de apertura y memoria compartida.
- [SQLite — PRAGMA](https://www.sqlite.org/pragma.html): inspección, integridad y configuración.
- [SQLite — claves foráneas](https://www.sqlite.org/foreignkeys.html): activación y restricciones.
- [SQLite — transacciones](https://www.sqlite.org/lang_transaction.html), [SAVEPOINT](https://www.sqlite.org/lang_savepoint.html) y [WAL](https://www.sqlite.org/wal.html): control SQL y concurrencia.
- [SQLite — EXPLAIN QUERY PLAN](https://www.sqlite.org/eqp.html), [ANALYZE](https://www.sqlite.org/lang_analyze.html) y [VACUUM](https://www.sqlite.org/lang_vacuum.html): diagnóstico y mantenimiento.
- [pandas — read_sql_query](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_query.html), [read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html) y [DataFrame.to_sql](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html): interoperabilidad con conexiones sqlite3, parámetros, bloques y persistencia.
- [Python — csv](https://docs.python.org/3.14/library/csv.html), [json](https://docs.python.org/3.14/library/json.html) y [contextlib.closing](https://docs.python.org/3.14/library/contextlib.html#contextlib.closing): archivos y liberación de recursos.
