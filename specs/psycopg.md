# Psycopg

**Clave** `psycopg`

**Área** Análisis de datos · Python (ubicación propuesta en AllDoc).

**Resumen** Conectar Python con PostgreSQL para consultar, transformar, cargar y gestionar datos de forma segura.

**Alcance** Psycopg 3: instalación, conexiones, cursores, parámetros, operaciones SQL, resultados, adaptación de tipos, transacciones, errores, COPY, pools, concurrencia, rendimiento, extensiones de la API e integración analítica. Los grupos iniciales son prioritarios para análisis de datos; los últimos cubren el alcance avanzado y especializado acordado. No es un inventario de cada constante interna.

**Entorno** Python 3.10+ y Psycopg 3.3.x con PostgreSQL 15+ como entorno de referencia. Las t-strings necesitan Python 3.14+. `psycopg_pool` es un paquete complementario; pandas y SQLAlchemy son dependencias opcionales. Algunas operaciones dependen de la versión de libpq, los permisos y la configuración del servidor. No confundir `psycopg` con `psycopg2`. Los ejemplos son para un proceso Python con acceso a PostgreSQL, no para el editor SQLite de AllDoc. Todos los resultados se indican como esperados; no se ejecutaron contra un servidor PostgreSQL en esta entrega.

## Datos compartidos

### Preparación

Instala el controlador en tu entorno virtual:

```bash
python -m pip install "psycopg[binary]>=3.3,<3.4"
```

Crea una base de datos de práctica vacía, por ejemplo `alldoc_psycopg`, desde una sesión PostgreSQL con permisos para crearla. Configura `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER` y, si es necesario, `PGPASSFILE` o `PGPASSWORD`. Alternativamente define `DATABASE_URL` con una URI válida de PostgreSQL. No uses una base de producción. La preparación crea y reinicia únicamente las tablas de este ejemplo en el esquema `alldoc_psycopg`.

```python
import os
import psycopg
from psycopg.conninfo import make_conninfo

BASE_DSN = os.environ.get("DATABASE_URL", "")
DSN = make_conninfo(BASE_DSN, options="-c search_path=alldoc_psycopg,public")

with psycopg.connect(BASE_DSN) as conn:
    conn.execute("CREATE SCHEMA IF NOT EXISTS alldoc_psycopg")

with psycopg.connect(DSN) as conn:
    conn.execute("DROP TABLE IF EXISTS alldoc_psycopg.pedidos")
    conn.execute("DROP TABLE IF EXISTS alldoc_psycopg.clientes")
    conn.execute("""
        CREATE TABLE clientes (
            id integer PRIMARY KEY,
            nombre text NOT NULL,
            pais text
        )
    """)
    conn.execute("""
        CREATE TABLE pedidos (
            id integer PRIMARY KEY,
            cliente_id integer NOT NULL REFERENCES clientes(id),
            importe numeric(10,2) NOT NULL CHECK (importe >= 0),
            fecha date NOT NULL,
            estado text NOT NULL,
            nota text
        )
    """)
    with conn.cursor() as cur:
        cur.executemany("INSERT INTO clientes VALUES (%s, %s, %s)", [
            (1, "Ana", "México"), (2, "Luis", "México"),
            (3, "Marta", "España"), (4, "Diego", None),
        ])
        cur.executemany("""INSERT INTO pedidos
            VALUES (%s, %s, %s, %s, %s, %s)""", [
            (101, 1, 800, "2026-01-05", "completed", None),
            (102, 1, 200, "2026-01-10", "completed", "web"),
            (103, 2, 500, "2026-01-10", "completed", "web"),
            (104, 3, 300, "2026-02-01", "cancelled", None),
            (105, 2, 500, "2026-02-03", "completed", None),
        ])
```

**clientes**

| id | nombre | pais |
|---:|---|---|
| 1 | Ana | México |
| 2 | Luis | México |
| 3 | Marta | España |
| 4 | Diego | NULL |

**pedidos**

| id | cliente_id | importe | fecha | estado | nota |
|---:|---:|---:|---|---|---|
| 101 | 1 | 800.00 | 2026-01-05 | completed | NULL |
| 102 | 1 | 200.00 | 2026-01-10 | completed | web |
| 103 | 2 | 500.00 | 2026-01-10 | completed | web |
| 104 | 3 | 300.00 | 2026-02-01 | cancelled | NULL |
| 105 | 2 | 500.00 | 2026-02-03 | completed | NULL |

Relación: `pedidos.cliente_id` referencia `clientes.id`. Hay cinco pedidos, cuatro completados por un total de 2000.00, un cliente sin pedidos, importes empatados y valores nulos.

### Cómo ejecutar las fichas

Todos los ejemplos presuponen `import psycopg` y la variable `DSN` definida arriba. Cuando un fragmento usa `conn` o `cur` sin crearlos, ejecútalo dentro de este contexto, pegándolo donde está el comentario:

```python
with psycopg.connect(DSN) as conn:
    with conn.cursor() as cur:
        # Pega aquí un único ejemplo (con la indentación correspondiente).
        pass
    conn.rollback()  # Descarta cambios no confirmados del ejemplo.
```

Cada ejemplo empieza con los datos originales. Los ejemplos que abren sus propias conexiones, usan `commit()`, gestionan pools o tienen requisitos especiales se ejecutan por separado, no dentro del envoltorio. Si un ejemplo confirma cambios persistentes, vuelve a ejecutar la preparación antes de otro ejemplo. Los ejemplos con `TEMP TABLE` usan tablas que solo existen en su sesión. Las salidas de `Decimal`, fechas, UUID y otros objetos se muestran según su representación habitual en Python; el orden se fija con `ORDER BY` cuando importa.

## Instalación y compatibilidad

**Clave** `instalacion-y-compatibilidad`

### Definición

**Clave** `definicion`

**Definición** Psycopg es un adaptador que permite enviar SQL a PostgreSQL y recibir datos como objetos Python. Implementa DB-API 2.0.

**Búsqueda** Definición; Consultar la versión instalada; Instalación y compatibilidad

**Para recordar** Python ejecuta el controlador; PostgreSQL ejecuta el SQL.

**Nota** El servidor PostgreSQL se instala o contrata por separado.

#### Consultar la versión instalada

```python
import psycopg
print(psycopg.__version__)
```

Python ejecuta el controlador; PostgreSQL ejecuta el SQL.

**Resultado esperado** Una versión 3.3.x si se instaló el rango indicado.

### Instalación binaria

**Clave** `instalacion-binaria`

**Definición** El extra `binary` incluye una implementación compilada y las bibliotecas necesarias para plataformas compatibles.

**Búsqueda** Instalación binaria; Instalar el controlador; Instalación y compatibilidad

**Para recordar** Es la opción más sencilla para comenzar.

**Nota** Usar un entorno virtual.

#### Instalar el controlador

```bash
python -m pip install "psycopg[binary]>=3.3,<3.4"
```

Es la opción más sencilla para comenzar.

**Resultado esperado** El import `psycopg` queda disponible en el entorno elegido.

### Instalación local y Python puro

**Clave** `instalacion-local-y-python-puro`

**Definición** El extra `c` compila una extensión ligada a libpq del sistema; `psycopg` sin extras usa la implementación Python y necesita libpq disponible.

**Búsqueda** Instalación local y Python puro; Instalar la variante local; Instalación y compatibilidad

**Para recordar** El mismo import tiene distintas implementaciones.

**Nota** Para Python puro usar `python -m pip install psycopg`. No es necesario instalar todas las variantes.

#### Instalar la variante local

```bash
python -m pip install "psycopg[c]>=3.3,<3.4"
```

El mismo import tiene distintas implementaciones.

**Resultado esperado** Se compila la extensión C si hay compilador, cabeceras Python y desarrollo de libpq.

### PSYCOPG_IMPL

**Clave** `psycopg-impl`

**Definición** La variable `PSYCOPG_IMPL` permite exigir una implementación concreta antes de importar.

**Búsqueda** PSYCOPG_IMPL; Inspeccionar la implementación; Instalación y compatibilidad

**Para recordar** `psycopg.pq.__impl__` identifica la implementación efectiva.

**Nota** Configurar `PSYCOPG_IMPL=binary`, `c` o `python` antes de arrancar Python si se necesita forzar una; falla si no está disponible.

#### Inspeccionar la implementación

```python
from psycopg import pq
print(pq.__impl__)
print(pq.version())
```

`psycopg.pq.__impl__` identifica la implementación efectiva.

**Resultado esperado** `binary`, `c` o `python`, y la versión numérica de libpq.

### DB-API 2.0

**Clave** `db-api-2-0`

**Definición** El estándar define un contrato común para conexiones, cursores y excepciones de Python.

**Búsqueda** DB-API 2.0; Consultar el contrato del adaptador; Instalación y compatibilidad

**Para recordar** La API común no hace portables todos los dialectos ni los marcadores.

**Nota** Nivel 2: el módulo y las conexiones pueden compartirse entre hilos; los cursores no.

#### Consultar el contrato del adaptador

```python
print(psycopg.apilevel, psycopg.threadsafety, psycopg.paramstyle)
```

La API común no hace portables todos los dialectos ni los marcadores.

**Resultado esperado** `2.0 2 pyformat`.

### Psycopg 2 frente a Psycopg 3

**Clave** `psycopg-2-frente-a-psycopg-3`

**Definición** Psycopg 3 usa el paquete `psycopg`, no `psycopg2`; incorpora APIs distintas para COPY, async y adaptación.

**Búsqueda** Psycopg 2 frente a Psycopg 3; Importar el adaptador nuevo; Instalación y compatibilidad

**Para recordar** No reemplazar solamente el import sin revisar el comportamiento.

**Nota** En Psycopg 3 el contexto de conexión también la cierra; la vinculación de parámetros suele ocurrir en el servidor. Véase el grupo Migración.

#### Importar el adaptador nuevo

```python
import psycopg
print(psycopg.__version__.split(".")[0])
```

No reemplazar solamente el import sin revisar el comportamiento.

**Resultado esperado** `3`.

## Conexiones

**Clave** `conexiones`

### Definición

**Clave** `definicion`

**Definición** Una conexión representa una sesión de Python con PostgreSQL. Permite ejecutar SQL y administrar transacciones.

**Búsqueda** Definición; Comprobar la comunicación; Conexiones

**Para recordar** Una conexión no es una consulta ni un cursor.

#### Comprobar la comunicación

```python
with psycopg.connect(DSN) as conn:
    print(conn.execute("SELECT 1").fetchone())
```

Una conexión no es una consulta ni un cursor.

**Resultado esperado** `(1,)`.

### connect y argumentos

**Clave** `connect-y-argumentos`

**Definición** `connect()` recibe una cadena de conexión y/o argumentos de libpq para elegir servidor, base y usuario.

**Búsqueda** connect y argumentos; Conectar a la base configurada; Conexiones

**Para recordar** Los argumentos nombrados sobrescriben los valores equivalentes de la cadena.

**Nota** Otros argumentos: `host`, `port`, `dbname`, `user`, `password`; usa valores de tu entorno.

#### Conectar a la base configurada

```python
with psycopg.connect(DSN, connect_timeout=5) as conn:
    print(conn.info.dbname)
```

Los argumentos nombrados sobrescriben los valores equivalentes de la cadena.

**Resultado esperado** Nombre de la base configurada.

### DSN y URI

**Clave** `dsn-y-uri`

**Definición** Una cadena conninfo puede usar pares `clave=valor` o una URI `postgresql://...`.

**Búsqueda** DSN y URI; Construir una configuración sin contraseña literal; Conexiones

**Para recordar** Los dos formatos describen cómo conectarse al mismo servidor.

**Nota** El ejemplo solo construye la cadena; no intenta conectar.

#### Construir una configuración sin contraseña literal

```python
from psycopg.conninfo import make_conninfo
print(make_conninfo("", host="localhost", port=5432, dbname="alldoc_psycopg"))
```

Los dos formatos describen cómo conectarse al mismo servidor.

**Resultado esperado** Una cadena con `host=localhost`, `port=5432` y `dbname=alldoc_psycopg`.

### Variables de entorno y credenciales

**Clave** `variables-de-entorno-y-credenciales`

**Definición** libpq puede leer sus parámetros de conexión del entorno, y Python puede recibir una URL de un gestor de secretos.

**Búsqueda** Variables de entorno y credenciales; Comprobar que se configuró una base; Conexiones

**Para recordar** No escribir contraseñas en repositorios ni imprimir DSN con secretos.

**Nota** Preferir un gestor de secretos o archivo de contraseñas protegido; `PGPASSWORD` puede quedar expuesta en algunos entornos.

#### Comprobar que se configuró una base

```python
import os
print(bool(os.getenv("DATABASE_URL") or os.getenv("PGDATABASE")))
```

No escribir contraseñas en repositorios ni imprimir DSN con secretos.

**Resultado esperado** `True` si existe alguna de esas configuraciones.

### close y estado de conexión

**Clave** `close-y-estado-de-conexion`

**Definición** `close()` termina la sesión; `closed` y `broken` distinguen una sesión cerrada de una interrumpida.

**Búsqueda** close y estado de conexión; Cerrar explícitamente; Conexiones

**Para recordar** Cerrar sin confirmar revierte cambios pendientes.

#### Cerrar explícitamente

```python
c = psycopg.connect(DSN)
print(c.closed, c.broken)
c.close()
print(c.closed)
```

Cerrar sin confirmar revierte cambios pendientes.

**Resultado esperado** `False False`, luego `True`.

### Context manager de conexión

**Clave** `context-manager-de-conexion`

**Definición** `with psycopg.connect(...)` confirma al salir normalmente, revierte al salir por excepción y cierra la conexión.

**Búsqueda** Context manager de conexión; Cerrar automáticamente; Conexiones

**Para recordar** La sangría delimita el ciclo de vida de la sesión.

#### Cerrar automáticamente

```python
with psycopg.connect(DSN) as c:
    print(c.closed)
print(c.closed)
```

La sangría delimita el ciclo de vida de la sesión.

**Resultado esperado** `False`, luego `True`.

### Información de sesión

**Clave** `informacion-de-sesion`

**Definición** `conn.info` expone metadatos de la conexión y del servidor, como base, usuario, versión, backend y estado de transacción.

**Búsqueda** Información de sesión; Inspeccionar el servidor; Conexiones

**Para recordar** Consultar `info` no equivale a ejecutar otra consulta.

**Nota** Evitar publicar `conn.info.dsn` u otros datos sensibles.

#### Inspeccionar el servidor

```python
print(conn.info.dbname, conn.info.server_version)
print(conn.info.transaction_status.name)
```

Consultar `info` no equivale a ejecutar otra consulta.

**Resultado esperado** Nombre de base, versión codificada como entero y `IDLE` si no se ejecutó SQL todavía.

### conninfo_to_dict y make_conninfo

**Clave** `conninfo-to-dict-y-make-conninfo`

**Definición** Estas funciones analizan y ensamblan cadenas de conexión sin abrir una sesión.

**Búsqueda** conninfo_to_dict y make_conninfo; Cambiar el puerto de una cadena; Conexiones

**Para recordar** Sirven para configurar, no para conectarse.

#### Cambiar el puerto de una cadena

```python
from psycopg.conninfo import conninfo_to_dict, make_conninfo
cfg = conninfo_to_dict("host=localhost port=5432")
print(conninfo_to_dict(make_conninfo(**(cfg | {"port": 5433}))))
```

Sirven para configurar, no para conectarse.

**Resultado esperado** Un diccionario con `host: localhost` y `port: 5433` (valores de texto).

## Cursores y ejecución

**Clave** `cursores-y-ejecucion`

### Definición

**Clave** `definicion`

**Definición** Un cursor envía una instrucción SQL y permite recorrer sus resultados. Una misma conexión puede crear varios cursores.

**Búsqueda** Definición; Consultar el identificador de un cliente; Cursores y ejecución

**Para recordar** La conexión administra la sesión; el cursor administra el resultado.

#### Consultar el identificador de un cliente

```python
with conn.cursor() as c:
    c.execute("SELECT id FROM clientes WHERE id = 1")
    print(c.fetchone())
```

La conexión administra la sesión; el cursor administra el resultado.

**Resultado esperado** `(1,)`.

### cursor y close

**Clave** `cursor-y-close`

**Definición** `conn.cursor()` crea un cursor; `close()` libera sus recursos sin cerrar la conexión.

**Búsqueda** cursor y close; Comprobar el ciclo de vida; Cursores y ejecución

**Para recordar** Cerrar el cursor no confirma ni revierte una transacción.

#### Comprobar el ciclo de vida

```python
c = conn.cursor()
c.close()
print(c.closed, conn.closed)
```

Cerrar el cursor no confirma ni revierte una transacción.

**Resultado esperado** `True False`.

### execute

**Clave** `execute`

**Definición** `execute()` envía una consulta y devuelve el propio cursor. En el cursor ordinario, el resultado queda disponible para recuperarlo.

**Búsqueda** execute; Consultar los clientes por ID; Cursores y ejecución

**Para recordar** Ejecutar no es lo mismo que recuperar filas.

#### Consultar los clientes por ID

```python
cur.execute("SELECT id FROM clientes ORDER BY id")
print(cur.fetchall())
```

Ejecutar no es lo mismo que recuperar filas.

**Resultado esperado** `[(1,), (2,), (3,), (4,)]`.

### conn.execute

**Clave** `conn-execute`

**Definición** Es un atajo que crea un cursor y ejecuta una consulta en la conexión.

**Búsqueda** conn.execute; Obtener la cantidad de pedidos; Cursores y ejecución

**Para recordar** Útil cuando solo necesitas una instrucción y su resultado.

#### Obtener la cantidad de pedidos

```python
print(conn.execute("SELECT COUNT(*) FROM pedidos").fetchone())
```

Útil cuando solo necesitas una instrucción y su resultado.

**Resultado esperado** `(5,)`.

### Context manager de cursor

**Clave** `context-manager-de-cursor`

**Definición** El bloque `with conn.cursor()` cierra el cursor automáticamente al terminar.

**Búsqueda** Context manager de cursor; Liberar solo el cursor; Cursores y ejecución

**Para recordar** No cierra la conexión ni decide commit o rollback.

#### Liberar solo el cursor

```python
with conn.cursor() as c:
    c.execute("SELECT 1")
print(c.closed, conn.closed)
```

No cierra la conexión ni decide commit o rollback.

**Resultado esperado** `True False`.

### Varios cursores

**Clave** `varios-cursores`

**Definición** Dos cursores de una conexión conservan resultados independientes, pero comparten la sesión y la transacción.

**Búsqueda** Varios cursores; Leer dos resultados independientes; Cursores y ejecución

**Para recordar** Para transacciones realmente independientes, abre conexiones distintas.

#### Leer dos resultados independientes

```python
with conn.cursor() as a, conn.cursor() as b:
    a.execute("SELECT 1")
    b.execute("SELECT 2")
    print(a.fetchone(), b.fetchone())
```

Para transacciones realmente independientes, abre conexiones distintas.

**Resultado esperado** `(1,) (2,)`.

## Parámetros y seguridad de consultas

**Clave** `parametros-y-seguridad-de-consultas`

### Definición

**Clave** `definicion`

**Definición** Una consulta parametrizada mantiene separados el SQL y los valores de entrada. Psycopg adapta los objetos Python al tipo SQL correspondiente.

**Búsqueda** Definición; Consultar pedidos de un cliente; Parámetros y seguridad de consultas

**Para recordar** El marcador va en el SQL; el valor va en el segundo argumento.

#### Consultar pedidos de un cliente

```python
cur.execute("SELECT id FROM pedidos WHERE cliente_id = %s ORDER BY id", (1,))
print(cur.fetchall())
```

El marcador va en el SQL; el valor va en el segundo argumento.

**Resultado esperado** `[(101,), (102,)]`.

### Parámetros posicionales

**Clave** `parametros-posicionales`

**Definición** Los marcadores `%s` se rellenan con una secuencia de valores en el mismo orden, independientemente del tipo.

**Búsqueda** Parámetros posicionales; Filtrar por cliente y estado; Parámetros y seguridad de consultas

**Para recordar** Usa `%s` para números, texto y fechas; no `%d`.

#### Filtrar por cliente y estado

```python
cur.execute("SELECT id FROM pedidos WHERE cliente_id=%s AND estado=%s ORDER BY id", (2, "completed"))
print(cur.fetchall())
```

Usa `%s` para números, texto y fechas; no `%d`.

**Resultado esperado** `[(103,), (105,)]`.

### Un solo parámetro

**Clave** `un-solo-parametro`

**Definición** Una tupla de un elemento lleva una coma final; una lista de un elemento también funciona.

**Búsqueda** Un solo parámetro; Consultar un nombre; Parámetros y seguridad de consultas

**Para recordar** `(1,)` es una tupla; `(1)` es un entero.

#### Consultar un nombre

```python
cur.execute("SELECT nombre FROM clientes WHERE id=%s", (1,))
print(cur.fetchone())
```

`(1,)` es una tupla; `(1)` es un entero.

**Resultado esperado** `('Ana',)`.

### Parámetros nombrados

**Clave** `parametros-nombrados`

**Definición** `%(nombre)s` permite referirse a los valores de un diccionario y reutilizar una clave.

**Búsqueda** Parámetros nombrados; Reutilizar un país; Parámetros y seguridad de consultas

**Para recordar** El nombre del marcador coincide con la clave del diccionario.

#### Reutilizar un país

```python
cur.execute("SELECT nombre FROM clientes WHERE pais=%(pais)s ORDER BY id", {"pais": "México"})
print(cur.fetchall())
```

El nombre del marcador coincide con la clave del diccionario.

**Resultado esperado** `[('Ana',), ('Luis',)]`.

### Formatos %s, %b y %t

**Clave** `formatos-s-b-y-t`

**Definición** `%s` deja elegir formato al adaptador; `%b` pide binario y `%t` texto.

**Búsqueda** Formatos %s, %b y %t; Enviar un entero en formato binario; Parámetros y seguridad de consultas

**Para recordar** No confundir formato del parámetro con formato del resultado.

#### Enviar un entero en formato binario

```python
cur.execute("SELECT %b::integer", (42,))
print(cur.fetchone())
```

No confundir formato del parámetro con formato del resultado.

**Resultado esperado** `(42,)` si el adaptador binario está disponible.

### Comillas y porcentaje literal

**Clave** `comillas-y-porcentaje-literal`

**Definición** No se ponen comillas alrededor de un marcador. Con parámetros, un `%` literal en la consulta debe escribirse `%%`.

**Búsqueda** Comillas y porcentaje literal; Calcular un resto; Parámetros y seguridad de consultas

**Para recordar** Las comillas de valores son responsabilidad del controlador.

#### Calcular un resto

```python
cur.execute("SELECT %s %% 3", (10,))
print(cur.fetchone())
```

Las comillas de valores son responsabilidad del controlador.

**Resultado esperado** `(1,)`.

### SQL injection

**Clave** `sql-injection`

**Definición** Concatenar texto de entrada como SQL puede alterar la consulta; vincularlo como parámetro lo conserva como dato.

**Búsqueda** SQL injection; Buscar un texto que contiene comillas; Parámetros y seguridad de consultas

**Para recordar** No usar f-strings, `%` ni concatenación para valores no confiables.

#### Buscar un texto que contiene comillas

```python
nombre = "O'Connor"
cur.execute("SELECT %s::text", (nombre,))
print(cur.fetchone())
```

No usar f-strings, `%` ni concatenación para valores no confiables.

**Resultado esperado** `("O'Connor",)`; la comilla no cambia la sintaxis.

### ANY con listas

**Clave** `any-con-listas`

**Definición** `= ANY(%s)` compara un valor con los elementos de un arreglo PostgreSQL adaptado desde una lista Python.

**Búsqueda** ANY con listas; Consultar dos IDs; Parámetros y seguridad de consultas

**Para recordar** Para una lista variable, usar ANY en vez de `IN %s`.

**Nota** Una lista vacía funciona con el tipo determinado por la comparación; `IN ()` no es sintaxis válida.

#### Consultar dos IDs

```python
cur.execute("SELECT nombre FROM clientes WHERE id = ANY(%s) ORDER BY id", ([1, 3],))
print(cur.fetchall())
```

Para una lista variable, usar ANY en vez de `IN %s`.

**Resultado esperado** `[('Ana',), ('Marta',)]`.

### NULL como parámetro

**Clave** `null-como-parametro`

**Definición** `None` se adapta a NULL. Para igualdad que trate NULL como un valor comparable se usa `IS NOT DISTINCT FROM`.

**Búsqueda** NULL como parámetro; Encontrar un país ausente; Parámetros y seguridad de consultas

**Para recordar** `= NULL` no devuelve verdadero; `IS %s` no es una forma válida de parametrizar `IS NULL`.

#### Encontrar un país ausente

```python
cur.execute("SELECT nombre FROM clientes WHERE pais IS NOT DISTINCT FROM %s", (None,))
print(cur.fetchall())
```

`= NULL` no devuelve verdadero; `IS %s` no es una forma válida de parametrizar `IS NULL`.

**Resultado esperado** `[('Diego',)]`.

### Template strings (t-strings)

**Clave** `template-strings-t-strings`

**Definición** Desde Psycopg 3.3 y Python 3.14, un literal `t"..."` puede expresar consultas parametrizadas sin usar una tupla explícita.

**Búsqueda** Template strings (t-strings); Vincular un ID mediante plantilla; Parámetros y seguridad de consultas

**Para recordar** Una t-string no es una f-string: conserva las interpolaciones para el adaptador.

**Nota** Requiere Python 3.14+; en versiones anteriores usar `%s`.

#### Vincular un ID mediante plantilla

```python
cliente_id = 1
cur.execute(t"SELECT nombre FROM clientes WHERE id = {cliente_id}")
print(cur.fetchone())
```

Una t-string no es una f-string: conserva las interpolaciones para el adaptador.

**Resultado esperado** `('Ana',)`.

## Composición SQL dinámica

**Clave** `composicion-sql-dinamica`

### Definición

**Clave** `definicion`

**Definición** `psycopg.sql` permite construir instrucciones con fragmentos de sintaxis e identificadores variables sin confundirlos con los valores.

**Búsqueda** Definición; Seleccionar una columna variable; Composición SQL dinámica

**Para recordar** Los nombres de tablas y columnas no son parámetros de datos.

#### Seleccionar una columna variable

```python
from psycopg import sql
query = sql.SQL("SELECT {} FROM clientes ORDER BY id").format(sql.Identifier("nombre"))
cur.execute(query)
print(cur.fetchall())
```

Los nombres de tablas y columnas no son parámetros de datos.

**Resultado esperado** `[('Ana',), ('Luis',), ('Marta',), ('Diego',)]`.

### SQL y Identifier

**Clave** `sql-y-identifier`

**Definición** `SQL()` representa sintaxis SQL confiable; `Identifier()` cita correctamente un nombre de tabla, columna o esquema.

**Búsqueda** SQL y Identifier; Consultar una tabla por nombre; Composición SQL dinámica

**Para recordar** No poner entrada del usuario directamente en `SQL()`.

**Nota** Si los nombres proceden del usuario, validar además que pertenecen a una lista autorizada.

#### Consultar una tabla por nombre

```python
from psycopg import sql
tabla = sql.Identifier("alldoc_psycopg", "clientes")
cur.execute(sql.SQL("SELECT COUNT(*) FROM {}").format(tabla))
print(cur.fetchone())
```

No poner entrada del usuario directamente en `SQL()`.

**Resultado esperado** `(4,)`.

### Literal

**Clave** `literal`

**Definición** `Literal()` incorpora un objeto Python como literal SQL usando las reglas de adaptación.

**Búsqueda** Literal; Crear un literal de texto; Composición SQL dinámica

**Para recordar** Para valores normales, preferir parámetros; usar Literal si se requiere una sentencia con valor incorporado.

#### Crear un literal de texto

```python
from psycopg import sql
q = sql.SQL("SELECT {}::text").format(sql.Literal("O'Connor"))
cur.execute(q)
print(cur.fetchone())
```

Para valores normales, preferir parámetros; usar Literal si se requiere una sentencia con valor incorporado.

**Resultado esperado** `("O'Connor",)`.

### Placeholder

**Clave** `placeholder`

**Definición** `Placeholder()` genera un marcador `%s` o uno nombrado para una consulta compuesta.

**Búsqueda** Placeholder; Construir un filtro parametrizado; Composición SQL dinámica

**Para recordar** Construye el marcador, no su valor.

#### Construir un filtro parametrizado

```python
from psycopg import sql
q = sql.SQL("SELECT nombre FROM clientes WHERE id={}").format(sql.Placeholder())
cur.execute(q, (2,))
print(cur.fetchone())
```

Construye el marcador, no su valor.

**Resultado esperado** `('Luis',)`.

### format, join y Composed

**Clave** `format-join-y-composed`

**Definición** `format()` sustituye fragmentos componibles y `join()` los une con un separador SQL; devuelven un objeto `Composed`.

**Búsqueda** format, join y Composed; Elegir dos columnas; Composición SQL dinámica

**Para recordar** Componer identificadores no sustituye los parámetros de valores.

#### Elegir dos columnas

```python
from psycopg import sql
cols = sql.SQL(", ").join(map(sql.Identifier, ["id", "nombre"]))
q = sql.SQL("SELECT {} FROM clientes ORDER BY id LIMIT 2").format(cols)
print(q.as_string(conn))
print(cur.execute(q).fetchall())
```

Componer identificadores no sustituye los parámetros de valores.

**Resultado esperado** SQL con identificadores entre comillas; `[(1, 'Ana'), (2, 'Luis')]`.

## Recuperación de resultados

**Clave** `recuperacion-de-resultados`

### Definición

**Clave** `definicion`

**Definición** Las operaciones `fetch` consumen las filas disponibles del último resultado del cursor. Por defecto cada fila es una tupla.

**Búsqueda** Definición; Leer la primera fila de una consulta; Recuperación de resultados

**Para recordar** Los fetch no vuelven a ejecutar el SQL.

#### Leer la primera fila de una consulta

```python
cur.execute("SELECT id, nombre FROM clientes ORDER BY id")
print(cur.fetchone())
```

Los fetch no vuelven a ejecutar el SQL.

**Resultado esperado** `(1, 'Ana')`.

### fetchone

**Clave** `fetchone`

**Definición** Devuelve la siguiente fila o `None` cuando no quedan filas.

**Búsqueda** fetchone; Leer un NULL y luego el final; Recuperación de resultados

**Para recordar** Una fila `(None,)` no es lo mismo que no tener fila.

#### Leer un NULL y luego el final

```python
cur.execute("SELECT pais FROM clientes WHERE id=4")
print(cur.fetchone())
print(cur.fetchone())
```

Una fila `(None,)` no es lo mismo que no tener fila.

**Resultado esperado** `(None,)`, luego `None`.

### fetchmany y arraysize

**Clave** `fetchmany-y-arraysize`

**Definición** `fetchmany(n)` recupera hasta n filas; sin argumento usa `arraysize`.

**Búsqueda** fetchmany y arraysize; Leer dos lotes de clientes; Recuperación de resultados

**Para recordar** Avanza el cursor y devuelve lista vacía al agotarse.

**Nota** En un cursor ordinario el servidor ya envió el resultado; esto no garantiza bajo consumo de memoria.

#### Leer dos lotes de clientes

```python
cur.execute("SELECT id FROM clientes ORDER BY id")
cur.arraysize = 2
print(cur.fetchmany())
print(cur.fetchmany())
print(cur.fetchmany())
```

Avanza el cursor y devuelve lista vacía al agotarse.

**Resultado esperado** `[(1,), (2,)]`, `[(3,), (4,)]`, `[]`.

### fetchall

**Clave** `fetchall`

**Definición** Devuelve todas las filas que todavía no se han consumido.

**Búsqueda** fetchall; Recuperar las filas restantes; Recuperación de resultados

**Para recordar** Después de `fetchone()`, no incluye esa fila.

#### Recuperar las filas restantes

```python
cur.execute("SELECT id FROM clientes ORDER BY id")
print(cur.fetchone())
print(cur.fetchall())
```

Después de `fetchone()`, no incluye esa fila.

**Resultado esperado** `(1,)`, luego `[(2,), (3,), (4,)]`.

### Iteración de cursor

**Clave** `iteracion-de-cursor`

**Definición** Un cursor es iterable y permite procesar cada fila de la consulta sin construir una lista adicional.

**Búsqueda** Iteración de cursor; Recorrer los nombres; Recuperación de resultados

**Para recordar** La iteración consume el resultado.

#### Recorrer los nombres

```python
cur.execute("SELECT nombre FROM clientes ORDER BY id")
for (nombre,) in cur:
    print(nombre)
```

La iteración consume el resultado.

**Resultado esperado** Ana, Luis, Marta y Diego, uno por línea.

### rowcount y statusmessage

**Clave** `rowcount-y-statusmessage`

**Definición** `rowcount` indica cuántas filas conoce el cursor para la operación; `statusmessage` contiene la etiqueta del servidor.

**Búsqueda** rowcount y statusmessage; Inspeccionar el resultado de SELECT; Recuperación de resultados

**Para recordar** No asumir que rowcount siempre es conocido; para contar datos usar COUNT.

**Nota** Algunos cursores u operaciones pueden devolver `-1` si se desconoce la cantidad.

#### Inspeccionar el resultado de SELECT

```python
cur.execute("SELECT id FROM clientes")
print(cur.rowcount, cur.statusmessage)
```

No asumir que rowcount siempre es conocido; para contar datos usar COUNT.

**Resultado esperado** `4 SELECT 4` en cursor ordinario.

### description y Column

**Clave** `description-y-column`

**Definición** `description` describe las columnas de un resultado, con nombre y tipo, entre otros metadatos.

**Búsqueda** description y Column; Extraer nombres de columnas; Recuperación de resultados

**Para recordar** Permite construir encabezados sin conocerlos previamente.

**Nota** Es `None` cuando la operación no devuelve filas.

#### Extraer nombres de columnas

```python
cur.execute("SELECT id, nombre FROM clientes LIMIT 1")
print([col.name for col in cur.description])
```

Permite construir encabezados sin conocerlos previamente.

**Resultado esperado** `['id', 'nombre']`.

### rownumber

**Clave** `rownumber`

**Definición** Indica la posición actual en el resultado cuando el cursor puede determinarla.

**Búsqueda** rownumber; Inspeccionar el avance; Recuperación de resultados

**Para recordar** La posición es cero antes de recuperar la primera fila.

#### Inspeccionar el avance

```python
cur.execute("SELECT id FROM clientes ORDER BY id")
print(cur.rownumber)
cur.fetchone()
print(cur.rownumber)
```

La posición es cero antes de recuperar la primera fila.

**Resultado esperado** `0`, luego `1`.

### nextset

**Clave** `nextset`

**Definición** Cambia al siguiente conjunto de resultados, si existe, de una ejecución con varias respuestas.

**Búsqueda** nextset; Leer dos SELECT sin parámetros; Recuperación de resultados

**Para recordar** No confundir varias filas con varios conjuntos de resultados.

**Nota** Con parámetros vinculados en servidor no se admiten varias sentencias en una sola ejecución de esta forma.

#### Leer dos SELECT sin parámetros

```python
cur.execute("SELECT 1; SELECT 2")
print(cur.fetchone())
print(cur.nextset())
print(cur.fetchone())
print(cur.nextset())
```

No confundir varias filas con varios conjuntos de resultados.

**Resultado esperado** `(1,)`, `True`, `(2,)`, `None`.

### results y set_result

**Clave** `results-y-set-result`

**Definición** `results()` recorre los conjuntos de resultados de una ejecución múltiple; `set_result(index)` selecciona uno mediante su posición, que empieza en cero.

**Búsqueda** results(); set_result(); varios SELECT; múltiples resultados; recuperar todos los RETURNING

**Para recordar** Una consulta puede tener varios conjuntos, no solo varias filas.

**Nota** Ambas operaciones están disponibles desde Psycopg 3.3. En versiones anteriores, usar `nextset()`.

#### Recorrer todos los conjuntos

```python
cur.execute("SELECT 1; SELECT 2")
print([c.fetchone()[0] for c in cur.results()])
```

Cada iteración selecciona el siguiente conjunto.

**Resultado esperado** `[1, 2]`.

#### Elegir el segundo conjunto directamente

```python
cur.execute("SELECT 1; SELECT 2")
print(cur.set_result(1).fetchone())
```

El índice 1 selecciona el segundo resultado.

**Resultado esperado** `(2,)`.

## Operaciones SQL y cargas por lotes

**Clave** `operaciones-sql-y-cargas-por-lotes`

### Definición

**Clave** `definicion`

**Definición** Psycopg ejecuta SQL de PostgreSQL para leer o modificar datos. Las operaciones de escritura requieren confirmar o revertir la transacción.

**Búsqueda** Definición; Consultar ventas completadas; Operaciones SQL y cargas por lotes

**Para recordar** La lógica SQL sigue siendo SQL, aunque se envíe desde Python.

#### Consultar ventas completadas

```python
cur.execute("SELECT SUM(importe) FROM pedidos WHERE estado=%s", ("completed",))
print(cur.fetchone())
```

La lógica SQL sigue siendo SQL, aunque se envíe desde Python.

**Resultado esperado** `(Decimal('2000.00'),)`.

### INSERT y RETURNING

**Clave** `insert-y-returning`

**Definición** `INSERT` añade filas; `RETURNING` permite recuperar datos de la fila insertada en la misma instrucción.

**Búsqueda** INSERT y RETURNING; Insertar un cliente y recuperar su ID; Operaciones SQL y cargas por lotes

**Para recordar** `execute()` seguido de `fetchone()` solo recupera si SQL devuelve filas.

#### Insertar un cliente y recuperar su ID

```python
cur.execute("INSERT INTO clientes VALUES (%s,%s,%s) RETURNING id", (9,"Eva",None))
print(cur.fetchone())
```

`execute()` seguido de `fetchone()` solo recupera si SQL devuelve filas.

**Resultado esperado** `(9,)`; el envoltorio revierte la inserción.

### UPDATE

**Clave** `update`

**Definición** Modifica filas que cumplen una condición. Se pueden recuperar sus valores nuevos con RETURNING.

**Búsqueda** UPDATE; Cambiar el estado de un pedido; Operaciones SQL y cargas por lotes

**Para recordar** Sin WHERE se actualiza toda la tabla.

#### Cambiar el estado de un pedido

```python
cur.execute("UPDATE pedidos SET estado=%s WHERE id=%s RETURNING estado", ("completed",104))
print(cur.fetchone())
```

Sin WHERE se actualiza toda la tabla.

**Resultado esperado** `('completed',)`; luego rollback.

### DELETE

**Clave** `delete`

**Definición** Elimina las filas que cumplen una condición. `rowcount` y `RETURNING` permiten comprobar el cambio.

**Búsqueda** DELETE; Eliminar el pedido cancelado; Operaciones SQL y cargas por lotes

**Para recordar** Revisar el filtro antes de eliminar datos.

#### Eliminar el pedido cancelado

```python
cur.execute("DELETE FROM pedidos WHERE id=%s RETURNING id", (104,))
print(cur.fetchone(), cur.rowcount)
```

Revisar el filtro antes de eliminar datos.

**Resultado esperado** `(104,) 1`; luego rollback.

### CREATE, ALTER y DROP

**Clave** `create-alter-y-drop`

**Definición** Las sentencias DDL modifican estructuras de la base de datos. PostgreSQL permite revertir muchas de ellas dentro de una transacción.

**Búsqueda** CREATE, ALTER y DROP; Crear y modificar una tabla temporal; Operaciones SQL y cargas por lotes

**Para recordar** DDL modifica estructura, no solo filas.

#### Crear y modificar una tabla temporal

```python
cur.execute("CREATE TEMP TABLE demo_ddl (id integer)")
cur.execute("ALTER TABLE demo_ddl ADD COLUMN etiqueta text")
cur.execute("DROP TABLE demo_ddl")
print(cur.statusmessage)
```

DDL modifica estructura, no solo filas.

**Resultado esperado** `DROP TABLE`; la tabla deja de existir.

### ON CONFLICT

**Clave** `on-conflict`

**Definición** PostgreSQL permite omitir o actualizar una fila ante un conflicto de unicidad.

**Búsqueda** ON CONFLICT; Actualizar el nombre si el ID ya existe; Operaciones SQL y cargas por lotes

**Para recordar** La clave de conflicto debe estar respaldada por una restricción o índice válido.

#### Actualizar el nombre si el ID ya existe

```python
cur.execute("""INSERT INTO clientes VALUES (%s,%s,%s)
ON CONFLICT (id) DO UPDATE SET nombre=EXCLUDED.nombre
RETURNING nombre""", (1,"Ana María","México"))
print(cur.fetchone())
```

La clave de conflicto debe estar respaldada por una restricción o índice válido.

**Resultado esperado** `('Ana María',)`; luego rollback.

### executemany

**Clave** `executemany`

**Definición** Ejecuta la misma sentencia para varios conjuntos de parámetros sin construir SQL manualmente para cada fila.

**Búsqueda** executemany; Insertar dos clientes; Operaciones SQL y cargas por lotes

**Para recordar** El segundo argumento es una secuencia de tuplas o diccionarios.

#### Insertar dos clientes

```python
cur.executemany("INSERT INTO clientes VALUES (%s,%s,%s)", [(9,"Eva",None),(10,"Leo","España")])
print(cur.rowcount)
```

El segundo argumento es una secuencia de tuplas o diccionarios.

**Resultado esperado** `2`; los cambios quedan pendientes de confirmación.

### executemany con returning

**Clave** `executemany-con-returning`

**Definición** `returning=True` conserva un conjunto de resultados por cada ejecución.

**Búsqueda** executemany con returning; Recuperar los IDs insertados; Operaciones SQL y cargas por lotes

**Para recordar** Usar nextset para pasar al resultado de la siguiente ejecución.

#### Recuperar los IDs insertados

```python
cur.executemany("INSERT INTO clientes VALUES (%s,%s,%s) RETURNING id", [(9,"Eva",None),(10,"Leo",None)], returning=True)
print(cur.fetchone())
cur.nextset()
print(cur.fetchone())
```

Usar nextset para pasar al resultado de la siguiente ejecución.

**Resultado esperado** `(9,)`, luego `(10,)`; rollback al final.

### Batch processing

**Clave** `batch-processing`

**Definición** Un lote agrupa muchas operaciones en una unidad de trabajo y evita acumular todos los registros de origen en memoria.

**Búsqueda** Batch processing; Cargar registros desde un generador; Operaciones SQL y cargas por lotes

**Para recordar** Para cargas grandes, comparar executemany con COPY.

#### Cargar registros desde un generador

```python
cur.execute("CREATE TEMP TABLE carga (id integer)")
cur.executemany("INSERT INTO carga VALUES (%s)", ((i,) for i in range(100)))
print(cur.rowcount)
```

Para cargas grandes, comparar executemany con COPY.

**Resultado esperado** `100`.

### Consultas analíticas

**Clave** `consultas-analiticas`

**Definición** Una consulta SQL puede realizar joins, agregaciones, CTEs y ventanas antes de devolver resultados a Python.

**Búsqueda** Consultas analíticas; Obtener el gasto por cliente con compras completadas; Operaciones SQL y cargas por lotes

**Para recordar** Agrega en PostgreSQL cuando solo necesitas el resumen.

#### Obtener el gasto por cliente con compras completadas

```python
cur.execute("""SELECT c.nombre, SUM(p.importe)
FROM clientes c JOIN pedidos p ON c.id=p.cliente_id
WHERE p.estado=%s GROUP BY c.id ORDER BY c.id""", ("completed",))
print(cur.fetchall())
```

Agrega en PostgreSQL cuando solo necesitas el resumen.

**Resultado esperado** `[('Ana', Decimal('1000.00')), ('Luis', Decimal('1000.00'))]`.

## Transacciones

**Clave** `transacciones`

### Definición

**Clave** `definicion`

**Definición** Una transacción reúne operaciones que se confirman juntas o se revierten. Por defecto Psycopg abre una transacción al ejecutar la primera instrucción, incluso SELECT.

**Búsqueda** Definición; Observar el inicio implícito; Transacciones

**Para recordar** El estado de la transacción pertenece a la conexión.

#### Observar el inicio implícito

```python
print(conn.info.transaction_status.name)
cur.execute("SELECT 1")
print(conn.info.transaction_status.name)
```

El estado de la transacción pertenece a la conexión.

**Resultado esperado** `IDLE`, luego `INTRANS` si la conexión era nueva.

### commit

**Clave** `commit`

**Definición** Confirma los cambios pendientes en la transacción actual para que sean visibles según las reglas de aislamiento.

**Búsqueda** commit; Confirmar una escritura en una tabla temporal; Transacciones

**Para recordar** Un commit no cierra la conexión.

#### Confirmar una escritura en una tabla temporal

```python
with psycopg.connect(DSN) as c:
    c.execute("CREATE TEMP TABLE demo_commit (id int)")
    c.execute("INSERT INTO demo_commit VALUES (1)")
    c.commit()
    print(c.execute("SELECT id FROM demo_commit").fetchall())
```

Un commit no cierra la conexión.

**Resultado esperado** `[(1,)]`; la tabla temporal desaparece al cerrar la sesión.

### rollback

**Clave** `rollback`

**Definición** Revierte todos los cambios no confirmados de la transacción actual y permite reutilizar la conexión.

**Búsqueda** rollback; Revertir una actualización; Transacciones

**Para recordar** No deshace un commit anterior.

#### Revertir una actualización

```python
cur.execute("UPDATE pedidos SET estado='completed' WHERE id=104")
conn.rollback()
print(conn.execute("SELECT estado FROM pedidos WHERE id=104").fetchone())
```

No deshace un commit anterior.

**Resultado esperado** `('cancelled',)`.

### autocommit

**Clave** `autocommit`

**Definición** Con `autocommit=True` las instrucciones se ejecutan sin la transacción implícita administrada por Psycopg.

**Búsqueda** autocommit; Consultar sin dejar transacción abierta; Transacciones

**Para recordar** No garantiza atomicidad entre varias instrucciones; para ello usa transaction().

#### Consultar sin dejar transacción abierta

```python
with psycopg.connect(DSN, autocommit=True) as c:
    print(c.execute("SELECT 1").fetchone())
    print(c.info.transaction_status.name)
```

No garantiza atomicidad entre varias instrucciones; para ello usa transaction().

**Resultado esperado** `(1,)` e `IDLE`.

### transaction()

**Clave** `transaction`

**Definición** El contexto `conn.transaction()` delimita una transacción o un savepoint si ya existe una transacción activa.

**Búsqueda** transaction(); Agrupar dos instrucciones atómicas; Transacciones

**Para recordar** Si se inicia desde IDLE, el bloque confirma o revierte la transacción completa.

#### Agrupar dos instrucciones atómicas

```python
with psycopg.connect(DSN, autocommit=True) as c:
    with c.transaction():
        c.execute("CREATE TEMP TABLE demo_tx (id int)")
        c.execute("INSERT INTO demo_tx VALUES (1)")
    print(c.execute("SELECT id FROM demo_tx").fetchall())
```

Si se inicia desde IDLE, el bloque confirma o revierte la transacción completa.

**Resultado esperado** `[(1,)]`; la tabla es temporal.

### SAVEPOINT y transacciones anidadas

**Clave** `savepoint-y-transacciones-anidadas`

**Definición** Un savepoint permite revertir una parte de una transacción sin perder operaciones anteriores. Los contextos transaction anidados usan savepoints.

**Búsqueda** SAVEPOINT y transacciones anidadas; Revertir solo una operación interna; Transacciones

**Para recordar** La transacción exterior decide si confirma todo.

#### Revertir solo una operación interna

```python
from psycopg import Rollback
with psycopg.connect(DSN, autocommit=True) as c:
    with c.transaction():
        c.execute("CREATE TEMP TABLE demo_sp (id int)")
        c.execute("INSERT INTO demo_sp VALUES (1)")
        with c.transaction():
            c.execute("INSERT INTO demo_sp VALUES (2)")
            raise Rollback()
        print(c.execute("SELECT id FROM demo_sp").fetchall())
```

La transacción exterior decide si confirma todo.

**Resultado esperado** `[(1,)]`; el bloque interior descarta el 2.

### force_rollback y Rollback

**Clave** `force-rollback-y-rollback`

**Definición** `force_rollback=True` revierte al salir del bloque incluso sin error; `Rollback` solicita la reversión del contexto.

**Búsqueda** force_rollback y Rollback; Probar una escritura sin guardarla; Transacciones

**Para recordar** Útiles para ensayos o para cancelar un bloque deliberadamente.

#### Probar una escritura sin guardarla

```python
with psycopg.connect(DSN, autocommit=True) as c:
    with c.transaction(force_rollback=True):
        c.execute("UPDATE pedidos SET estado='completed' WHERE id=104")
    print(c.execute("SELECT estado FROM pedidos WHERE id=104").fetchone())
```

Útiles para ensayos o para cancelar un bloque deliberadamente.

**Resultado esperado** `('cancelled',)`.

### IsolationLevel

**Clave** `isolationlevel`

**Definición** El nivel de aislamiento determina qué cambios de otras transacciones pueden observarse. PostgreSQL implementa READ COMMITTED, REPEATABLE READ y SERIALIZABLE (READ UNCOMMITTED se comporta como READ COMMITTED).

**Búsqueda** IsolationLevel; Configurar una lectura repetible; Transacciones

**Para recordar** Configurar antes de iniciar la transacción.

#### Configurar una lectura repetible

```python
from psycopg import IsolationLevel
with psycopg.connect(DSN) as c:
    c.isolation_level = IsolationLevel.REPEATABLE_READ
    print(c.execute("SHOW transaction_isolation").fetchone())
```

Configurar antes de iniciar la transacción.

**Resultado esperado** `('repeatable read',)`.

### read_only y deferrable

**Clave** `read-only-y-deferrable`

**Definición** `read_only` protege una transacción de escrituras normales; `deferrable` permite esperar una instantánea segura en SERIALIZABLE READ ONLY.

**Búsqueda** read_only y deferrable; Configurar una transacción analítica de solo lectura; Transacciones

**Para recordar** Son características de transacción, no permisos permanentes.

**Nota** El efecto de deferrable se aplica en transacciones SERIALIZABLE READ ONLY.

#### Configurar una transacción analítica de solo lectura

```python
from psycopg import IsolationLevel
with psycopg.connect(DSN) as c:
    c.isolation_level = IsolationLevel.SERIALIZABLE
    c.read_only = True
    c.deferrable = True
    print(c.execute("SHOW transaction_read_only").fetchone())
```

Son características de transacción, no permisos permanentes.

**Resultado esperado** `('on',)`.

### Idle in transaction

**Clave** `idle-in-transaction`

**Definición** Una conexión abierta después de un SELECT puede mantener una transacción inactiva, con recursos y bloqueos retenidos.

**Búsqueda** Idle in transaction; Liberar una transacción de lectura; Transacciones

**Para recordar** Cerrar o finalizar la transacción cuando termines de consultar.

#### Liberar una transacción de lectura

```python
cur.execute("SELECT COUNT(*) FROM pedidos")
print(conn.info.transaction_status.name)
conn.rollback()
print(conn.info.transaction_status.name)
```

Cerrar o finalizar la transacción cuando termines de consultar.

**Resultado esperado** `INTRANS`, luego `IDLE`.

### Transacciones en dos fases

**Clave** `transacciones-en-dos-fases`

**Definición** Two-phase commit coordina una confirmación entre participantes mediante preparar y confirmar o revertir. Usa `xid`, `tpc_begin`, `tpc_prepare`, `tpc_commit`, `tpc_rollback` y `tpc_recover`.

**Búsqueda** Transacciones en dos fases; Crear e inspeccionar un identificador de transacción; Transacciones

**Para recordar** No dejar transacciones preparadas huérfanas; requieren un coordinador y recuperación.

**Nota** La preparación real requiere `max_prepared_transactions` mayor que cero; el ejemplo no prepara ninguna transacción.

#### Crear e inspeccionar un identificador de transacción

```python
with psycopg.connect(DSN) as c:
    xid = c.xid(42, "lote-ventas", "postgres-a")
    print(xid.format_id, xid.gtrid, xid.bqual)
```

No dejar transacciones preparadas huérfanas; requieren un coordinador y recuperación.

**Resultado esperado** `42 lote-ventas postgres-a`.

### Ciclo TPC y recuperación

**Clave** `ciclo-tpc-y-recuperacion`

**Definición** Tras `tpc_begin(xid)` se ejecutan operaciones; `tpc_prepare()` deja la transacción preparada. `tpc_recover()` enumera las pendientes y se resuelven con `tpc_commit(xid)` o `tpc_rollback(xid)`.

**Búsqueda** Ciclo TPC y recuperación; Ensayar el ciclo sin dejar cambios preparados; Transacciones

**Para recordar** Una transacción preparada puede sobrevivir al cierre de la conexión.

**Nota** No ejecutar `tpc_prepare()` en un servidor no configurado; en una prueba real, garantizar recuperación aunque se pierda la sesión. No usar commit/rollback ordinarios dentro de TPC.

#### Ensayar el ciclo sin dejar cambios preparados

```python
from uuid import uuid4
with psycopg.connect(DSN) as c:
    xid = c.xid(42, uuid4().hex, "demo")
    c.tpc_begin(xid)
    c.execute("SELECT 1")
    c.tpc_rollback()
    print(c.info.transaction_status.name)
```

Una transacción preparada puede sobrevivir al cierre de la conexión.

**Resultado esperado** `IDLE` después de revertir.

## Errores y recuperación

**Clave** `errores-y-recuperacion`

### Definición

**Clave** `definicion`

**Definición** Psycopg traduce fallos del servidor y del controlador en excepciones Python. Se capturan para decidir si se revierte la transacción, se informa o se reintenta.

**Búsqueda** Definición; Capturar una tabla inexistente; Errores y recuperación

**Para recordar** Un error SQL normalmente invalida la transacción hasta rollback.

#### Capturar una tabla inexistente

```python
try:
    cur.execute("SELECT * FROM tabla_que_no_existe")
except psycopg.Error as exc:
    print(type(exc).__name__)
    conn.rollback()
```

Un error SQL normalmente invalida la transacción hasta rollback.

**Resultado esperado** `UndefinedTable`.

### try, except y finally

**Clave** `try-except-y-finally`

**Definición** `try` delimita operaciones que pueden fallar; `except` trata excepciones concretas; `finally` ejecuta la limpieza.

**Búsqueda** try, except y finally; Cerrar la conexión incluso si falla una consulta; Errores y recuperación

**Para recordar** No ocultar errores con except vacío.

#### Cerrar la conexión incluso si falla una consulta

```python
c = psycopg.connect(DSN)
try:
    c.execute("SELECT * FROM tabla_que_no_existe")
except psycopg.errors.UndefinedTable:
    print("Tabla inexistente")
finally:
    c.close()
```

No ocultar errores con except vacío.

**Resultado esperado** `Tabla inexistente`; la sesión queda cerrada.

### Jerarquía DB-API

**Clave** `jerarquia-db-api`

**Definición** `Error` es la base de los errores; `DatabaseError` agrupa `DataError`, `OperationalError`, `IntegrityError`, `InternalError`, `ProgrammingError` y `NotSupportedError`. `InterfaceError` representa errores de interfaz; `Warning` es otra rama.

**Búsqueda** Jerarquía DB-API; Inspeccionar dos relaciones de herencia; Errores y recuperación

**Para recordar** Captura la clase más específica que puedas resolver.

#### Inspeccionar dos relaciones de herencia

```python
print(issubclass(psycopg.IntegrityError, psycopg.DatabaseError))
print(issubclass(psycopg.InterfaceError, psycopg.Error))
```

Captura la clase más específica que puedas resolver.

**Resultado esperado** `True`, `True`.

### IntegrityError y UniqueViolation

**Clave** `integrityerror-y-uniqueviolation`

**Definición** Las restricciones violadas producen errores de integridad. PostgreSQL distingue duplicados, referencias inválidas, nulos prohibidos y CHECK.

**Búsqueda** IntegrityError y UniqueViolation; Detectar un ID existente; Errores y recuperación

**Para recordar** Una clave duplicada no es necesariamente un fallo de conexión.

#### Detectar un ID existente

```python
try:
    cur.execute("INSERT INTO clientes VALUES (1,'Otra Ana',NULL)")
except psycopg.errors.UniqueViolation:
    conn.rollback()
    print("ID duplicado")
```

Una clave duplicada no es necesariamente un fallo de conexión.

**Resultado esperado** `ID duplicado`; se conserva la Ana original.

### ForeignKeyViolation y NotNullViolation

**Clave** `foreignkeyviolation-y-notnullviolation`

**Definición** Una llave foránea exige una referencia válida y NOT NULL impide valores ausentes.

**Búsqueda** ForeignKeyViolation y NotNullViolation; Detectar un cliente inexistente en un pedido; Errores y recuperación

**Para recordar** Validar relaciones y campos obligatorios antes de cargar datos.

#### Detectar un cliente inexistente en un pedido

```python
try:
    cur.execute("UPDATE pedidos SET cliente_id=999 WHERE id=101")
except psycopg.errors.ForeignKeyViolation:
    conn.rollback()
    print("Referencia inválida")
```

Validar relaciones y campos obligatorios antes de cargar datos.

**Resultado esperado** `Referencia inválida`. Insertar un cliente con nombre NULL produciría `NotNullViolation`.

### ProgrammingError y DataError

**Clave** `programmingerror-y-dataerror`

**Definición** `ProgrammingError` cubre errores SQL como sintaxis o tablas ausentes; `DataError` incluye conversiones inválidas y desbordamientos.

**Búsqueda** ProgrammingError y DataError; Detectar texto inválido para un entero; Errores y recuperación

**Para recordar** Corrige la instrucción o el dato antes de reintentar.

#### Detectar texto inválido para un entero

```python
try:
    cur.execute("SELECT %s::integer", ("abc",))
except psycopg.DataError as exc:
    print(type(exc).__name__)
    conn.rollback()
```

Corrige la instrucción o el dato antes de reintentar.

**Resultado esperado** `InvalidTextRepresentation`.

### SQLSTATE y diag

**Clave** `sqlstate-y-diag`

**Definición** `sqlstate` identifica el error con un código estable; `diag` expone campos como mensaje, tabla o restricción cuando el servidor los proporciona.

**Búsqueda** SQLSTATE y diag; Identificar una violación de unicidad; Errores y recuperación

**Para recordar** No depender del texto traducido del error.

**Nota** Algunos errores locales no tienen sqlstate ni diagnóstico del servidor.

#### Identificar una violación de unicidad

```python
try:
    cur.execute("INSERT INTO clientes VALUES (1,'Otra Ana',NULL)")
except psycopg.Error as exc:
    print(exc.sqlstate, exc.diag.constraint_name)
    conn.rollback()
```

No depender del texto traducido del error.

**Resultado esperado** `23505 clientes_pkey`.

### InFailedSqlTransaction

**Clave** `infailedsqltransaction`

**Definición** Después de un error en una transacción, nuevas instrucciones fallan hasta revertirla o volver a un savepoint.

**Búsqueda** InFailedSqlTransaction; Restablecer el cursor después de un error; Errores y recuperación

**Para recordar** Un except sin rollback no restablece la transacción.

#### Restablecer el cursor después de un error

```python
try:
    cur.execute("SELECT 1/0")
except psycopg.errors.DivisionByZero:
    try:
        cur.execute("SELECT 1")
    except psycopg.errors.InFailedSqlTransaction:
        print("Transacción abortada")
    conn.rollback()
print(cur.execute("SELECT 1").fetchone())
```

Un except sin rollback no restablece la transacción.

**Resultado esperado** `Transacción abortada`, luego `(1,)`.

### OperationalError y desconexiones

**Clave** `operationalerror-y-desconexiones`

**Definición** Un fallo de red, servidor no disponible o autenticación fallida puede impedir abrir o seguir usando una sesión.

**Búsqueda** OperationalError y desconexiones; Tratar un fallo de conexión; Errores y recuperación

**Para recordar** Comprobar el estado y abrir una conexión nueva cuando la anterior esté rota.

**Nota** No asumir que todo OperationalError sea transitorio.

#### Tratar un fallo de conexión

```python
try:
    with psycopg.connect(DSN, connect_timeout=3) as c:
        print(c.execute("SELECT 1").fetchone())
except psycopg.OperationalError:
    print("No se pudo consultar el servidor")
```

Comprobar el estado y abrir una conexión nueva cuando la anterior esté rota.

**Resultado esperado** `(1,)` si el servidor está disponible, o el mensaje de fallo.

### Reintentos acotados

**Clave** `reintentos-acotados`

**Definición** Algunos fallos de serialización o deadlocks permiten repetir toda la transacción; no todas las operaciones se pueden repetir sin efectos duplicados.

**Búsqueda** Reintentos acotados; Reintentar una lectura transaccional; Errores y recuperación

**Para recordar** Reintentar la unidad de trabajo completa, con límite y espera.

**Nota** Ante una desconexión durante commit puede desconocerse si se confirmó; no repetir escrituras no idempotentes a ciegas.

#### Reintentar una lectura transaccional

```python
import time
for intento in range(3):
    try:
        with psycopg.connect(DSN) as c:
            total = c.execute("SELECT COUNT(*) FROM pedidos").fetchone()[0]
        break
    except (psycopg.errors.SerializationFailure, psycopg.errors.DeadlockDetected):
        if intento == 2:
            raise
        time.sleep(0.1 * (2 ** intento))
print(total)
```

Reintentar la unidad de trabajo completa, con límite y espera.

**Resultado esperado** `5` en ejecución normal; si persiste un fallo permitido, se propaga en el tercer intento.

## Adaptación de tipos básicos

**Clave** `adaptacion-de-tipos-basicos`

### Definición

**Clave** `definicion`

**Definición** Adaptar consiste en convertir valores Python en parámetros PostgreSQL y convertir resultados SQL en objetos Python. El controlador elige adaptadores según el valor y el tipo del servidor.

**Búsqueda** Definición; Ver los tipos de una fila; Adaptación de tipos básicos

**Para recordar** El cast SQL puede indicar el tipo de destino cuando no es deducible.

#### Ver los tipos de una fila

```python
cur.execute("SELECT id, importe, fecha, nota FROM pedidos WHERE id=101")
fila = cur.fetchone()
print([type(x).__name__ for x in fila])
```

El cast SQL puede indicar el tipo de destino cuando no es deducible.

**Resultado esperado** `['int', 'Decimal', 'date', 'NoneType']`.

### int y wrappers numéricos

**Clave** `int-y-wrappers-numericos`

**Definición** Los enteros Python se adaptan a tipos enteros PostgreSQL según el valor; los wrappers como `Int4` fijan el tipo de parámetro.

**Búsqueda** int y wrappers numéricos; Forzar un INTEGER de 32 bits; Adaptación de tipos básicos

**Para recordar** El tipo del parámetro no siempre es INTEGER.

**Nota** También existen `Int2`, `Int8`, `IntNumeric`, `Float4` y `Float8`; respeta sus límites.

#### Forzar un INTEGER de 32 bits

```python
from psycopg.types.numeric import Int4
print(cur.execute("SELECT pg_typeof(%s)::text", (Int4(42),)).fetchone())
```

El tipo del parámetro no siempre es INTEGER.

**Resultado esperado** `('integer',)`.

### float y Decimal

**Clave** `float-y-decimal`

**Definición** `float` se adapta normalmente a DOUBLE PRECISION; `Decimal` a NUMERIC, apropiado para cantidades monetarias exactas.

**Búsqueda** float y Decimal; Sumar dos valores monetarios; Adaptación de tipos básicos

**Para recordar** No convertir importes a float sin decidir cómo tratar la precisión.

#### Sumar dos valores monetarios

```python
from decimal import Decimal
cur.execute("SELECT %s + %s", (Decimal("0.10"), Decimal("0.20")))
print(cur.fetchone()[0])
```

No convertir importes a float sin decidir cómo tratar la precisión.

**Resultado esperado** `0.30` como Decimal.

### str y bool

**Clave** `str-y-bool`

**Definición** El texto se adapta con la codificación de la conexión; los booleanos se convierten a BOOLEAN.

**Búsqueda** str y bool; Enviar texto y una condición; Adaptación de tipos básicos

**Para recordar** No escribir `'True'` como sustituto de un parámetro booleano.

#### Enviar texto y una condición

```python
cur.execute("SELECT %s::text, %s::boolean", ("México", True))
print(cur.fetchone())
```

No escribir `'True'` como sustituto de un parámetro booleano.

**Resultado esperado** `('México', True)`.

### None y NULL

**Clave** `none-y-null`

**Definición** Un NULL SQL se recibe como `None`; enviar None lo adapta a NULL.

**Búsqueda** None y NULL; Comprobar un nulo real; Adaptación de tipos básicos

**Para recordar** NULL, cero y cadena vacía son valores distintos.

#### Comprobar un nulo real

```python
cur.execute("SELECT %s::text IS NULL", (None,))
print(cur.fetchone())
```

NULL, cero y cadena vacía son valores distintos.

**Resultado esperado** `(True,)`.

### date y time

**Clave** `date-y-time`

**Definición** Los objetos `date` y `time` se adaptan a tipos de fecha y hora.

**Búsqueda** date y time; Filtrar por fecha con un objeto Python; Adaptación de tipos básicos

**Para recordar** No es necesario convertirlos manualmente en cadenas.

#### Filtrar por fecha con un objeto Python

```python
from datetime import date
cur.execute("SELECT id FROM pedidos WHERE fecha=%s ORDER BY id", (date(2026,1,10),))
print(cur.fetchall())
```

No es necesario convertirlos manualmente en cadenas.

**Resultado esperado** `[(102,), (103,)]`.

### datetime y zonas horarias

**Clave** `datetime-y-zonas-horarias`

**Definición** Un datetime sin tzinfo corresponde a TIMESTAMP; con tzinfo se adapta a TIMESTAMPTZ. La zona de la sesión afecta la representación de TIMESTAMPTZ recuperado.

**Búsqueda** datetime y zonas horarias; Consultar un instante en UTC; Adaptación de tipos básicos

**Para recordar** Usar fechas conscientes de zona para instantes reales.

#### Consultar un instante en UTC

```python
from datetime import datetime, timezone
cur.execute("SET LOCAL TIME ZONE 'UTC'")
cur.execute("SELECT %s::timestamptz", (datetime(2026,1,5,12,tzinfo=timezone.utc),))
print(cur.fetchone()[0].isoformat())
```

Usar fechas conscientes de zona para instantes reales.

**Resultado esperado** `2026-01-05T12:00:00+00:00`.

### timedelta e INTERVAL

**Clave** `timedelta-e-interval`

**Definición** Un timedelta representa una duración y se adapta a INTERVAL.

**Búsqueda** timedelta e INTERVAL; Sumar tres días a una fecha; Adaptación de tipos básicos

**Para recordar** Los intervalos SQL con meses no son equivalentes exactos a duraciones fijas Python.

#### Sumar tres días a una fecha

```python
from datetime import date, timedelta
cur.execute("SELECT (%s::date + %s::interval)::date", (date(2026,1,5), timedelta(days=3)))
print(cur.fetchone()[0])
```

Los intervalos SQL con meses no son equivalentes exactos a duraciones fijas Python.

**Resultado esperado** `2026-01-08`.

### bytes y BYTEA

**Clave** `bytes-y-bytea`

**Definición** `bytes`, `bytearray` y `memoryview` pueden adaptarse a datos binarios PostgreSQL.

**Búsqueda** bytes y BYTEA; Recuperar bytes; Adaptación de tipos básicos

**Para recordar** BYTEA almacena bytes, no texto codificado por conveniencia.

#### Recuperar bytes

```python
cur.execute("SELECT %s::bytea", (b"ABC",))
print(cur.fetchone()[0])
```

BYTEA almacena bytes, no texto codificado por conveniencia.

**Resultado esperado** `b'ABC'`.

### Listas y ARRAY

**Clave** `listas-y-array`

**Definición** Una lista de valores compatibles se adapta a un arreglo PostgreSQL; un ARRAY recuperado se convierte en lista.

**Búsqueda** Listas y ARRAY; Enviar un arreglo de enteros; Adaptación de tipos básicos

**Para recordar** Usa un cast cuando el tipo de los elementos no sea deducible.

#### Enviar un arreglo de enteros

```python
cur.execute("SELECT %s::integer[]", ([1,2,3],))
print(cur.fetchone())
```

Usa un cast cuando el tipo de los elementos no sea deducible.

**Resultado esperado** `([1, 2, 3],)`.

### UUID

**Clave** `uuid`

**Definición** El tipo `uuid.UUID` se adapta directamente a UUID de PostgreSQL.

**Búsqueda** UUID; Recuperar un UUID; Adaptación de tipos básicos

**Para recordar** No hace falta convertirlo en texto para transmitirlo.

#### Recuperar un UUID

```python
from uuid import UUID
u = UUID("00000000-0000-0000-0000-000000000001")
cur.execute("SELECT %s::uuid", (u,))
print(cur.fetchone()[0] == u)
```

No hace falta convertirlo en texto para transmitirlo.

**Resultado esperado** `True`.

## JSON y otros tipos PostgreSQL

**Clave** `json-y-otros-tipos-postgresql`

### Definición

**Clave** `definicion`

**Definición** Psycopg también adapta tipos específicos de PostgreSQL. Algunos necesitan envoltorios o registrar metadatos del tipo en la conexión.

**Búsqueda** Definición; Enviar un documento JSONB; JSON y otros tipos PostgreSQL

**Para recordar** No todos los objetos Python se adaptan de forma automática.

#### Enviar un documento JSONB

```python
from psycopg.types.json import Jsonb
cur.execute("SELECT %s::jsonb", (Jsonb({"canal":"web"}),))
print(cur.fetchone()[0])
```

No todos los objetos Python se adaptan de forma automática.

**Resultado esperado** `{'canal': 'web'}`.

### Json y Jsonb

**Clave** `json-y-jsonb`

**Definición** Los wrappers `Json` y `Jsonb` indican cómo serializar un objeto Python como JSON o JSONB.

**Búsqueda** Json y Jsonb; Extraer una clave del documento; JSON y otros tipos PostgreSQL

**Para recordar** Un dict no se interpreta automáticamente como JSON.

#### Extraer una clave del documento

```python
from psycopg.types.json import Json
cur.execute("SELECT %s::json ->> 'canal'", (Json({"canal":"web"}),))
print(cur.fetchone())
```

Un dict no se interpreta automáticamente como JSON.

**Resultado esperado** `('web',)`.

### set_json_dumps y set_json_loads

**Clave** `set-json-dumps-y-set-json-loads`

**Definición** Permiten personalizar la serialización y la lectura de JSON globalmente o en un contexto de adaptación.

**Búsqueda** set_json_dumps y set_json_loads; Leer decimales JSON sin float; JSON y otros tipos PostgreSQL

**Para recordar** Limitar los cambios al cursor o conexión si solo los necesita un proceso.

**Nota** `set_json_dumps(función, cur)` cambia el serializador; la función debe devolver JSON válido.

#### Leer decimales JSON sin float

```python
import json
from decimal import Decimal
from functools import partial
from psycopg.types.json import set_json_loads
set_json_loads(partial(json.loads, parse_float=Decimal), cur)
cur.execute("SELECT '{\"importe\":1.25}'::jsonb")
print(cur.fetchone()[0])
```

Limitar los cambios al cursor o conexión si solo los necesita un proceso.

**Resultado esperado** `{'importe': Decimal('1.25')}`.

### Enums y register_enum

**Clave** `enums-y-register-enum`

**Definición** Un enum PostgreSQL puede asociarse a una enumeración Python mediante `EnumInfo` y `register_enum`.

**Búsqueda** Enums y register_enum; Recuperar un estado como Enum; JSON y otros tipos PostgreSQL

**Para recordar** Registrar el tipo en la conexión donde se utilizará.

**Nota** Requiere permiso CREATE en el esquema; rollback elimina el tipo. Puede pasarse una clase Enum propia y un mapping.

#### Recuperar un estado como Enum

```python
from psycopg.types.enum import EnumInfo, register_enum
cur.execute("CREATE TYPE estado_demo AS ENUM ('nuevo','cerrado')")
info = EnumInfo.fetch(conn, "estado_demo")
register_enum(info, conn)
with conn.cursor() as c:
    c.execute("SELECT 'cerrado'::estado_demo")
    print(c.fetchone()[0].name)
```

Registrar el tipo en la conexión donde se utilizará.

**Resultado esperado** `cerrado`.

### Rangos y register_range

**Clave** `rangos-y-register-range`

**Definición** Los rangos representan intervalos con límites abiertos o cerrados. Los tipos personalizados se registran con `RangeInfo` y `register_range`.

**Búsqueda** Rangos y register_range; Enviar un rango entero; JSON y otros tipos PostgreSQL

**Para recordar** `[)` incluye el extremo inferior y excluye el superior.

#### Enviar un rango entero

```python
from psycopg.types.range import Range
cur.execute("SELECT %s::int4range @> 3", (Range(1,5,"[)"),))
print(cur.fetchone())
```

`[)` incluye el extremo inferior y excluye el superior.

**Resultado esperado** `(True,)`.

### Multirangos y register_multirange

**Clave** `multirangos-y-register-multirange`

**Definición** Un multirango contiene varios rangos. Los personalizados usan `MultirangeInfo` y `register_multirange`.

**Búsqueda** Multirangos y register_multirange; Consultar dos intervalos separados; JSON y otros tipos PostgreSQL

**Para recordar** PostgreSQL 14+ admite multirangos.

#### Consultar dos intervalos separados

```python
from psycopg.types.multirange import Multirange
from psycopg.types.range import Range
r = Multirange([Range(1,3), Range(5,7)])
cur.execute("SELECT %s::int4multirange @> 4", (r,))
print(cur.fetchone())
```

PostgreSQL 14+ admite multirangos.

**Resultado esperado** `(False,)`.

### Tipos compuestos y register_composite

**Clave** `tipos-compuestos-y-register-composite`

**Definición** Un tipo compuesto combina campos con tipos distintos. Psycopg puede registrar su estructura y convertirla en un objeto Python.

**Búsqueda** Tipos compuestos y register_composite; Recuperar un par nombre-cantidad; JSON y otros tipos PostgreSQL

**Para recordar** Obtener el CompositeInfo y registrarlo antes de crear el cursor que lo usa.

**Nota** Requiere permiso CREATE en el esquema; rollback elimina el tipo.

#### Recuperar un par nombre-cantidad

```python
from psycopg.types.composite import CompositeInfo, register_composite
cur.execute("CREATE TYPE par_demo AS (nombre text, cantidad int)")
info = CompositeInfo.fetch(conn, "par_demo")
register_composite(info, conn)
with conn.cursor() as c:
    c.execute("SELECT ROW('Ana',2)::par_demo")
    fila = c.fetchone()[0]
    print(fila.nombre, fila.cantidad)
```

Obtener el CompositeInfo y registrarlo antes de crear el cursor que lo usa.

**Resultado esperado** `Ana 2`.

### HSTORE y register_hstore

**Clave** `hstore-y-register-hstore`

**Definición** HSTORE es una extensión PostgreSQL para pares texto-texto. Su adaptador puede convertir un valor a dict.

**Búsqueda** HSTORE y register_hstore; Consultar un mapa de atributos; JSON y otros tipos PostgreSQL

**Para recordar** No es JSON; necesita la extensión instalada y registrada.

**Nota** Un administrador debe habilitar la extensión si se requiere.

#### Consultar un mapa de atributos

```python
from psycopg.types import TypeInfo
from psycopg.types.hstore import register_hstore
info = TypeInfo.fetch(conn, "hstore")
if info is not None:
    register_hstore(info, conn)
    with conn.cursor() as c:
        print(c.execute("SELECT 'canal=>web'::hstore").fetchone()[0])
else:
    print("HSTORE no instalado")
```

No es JSON; necesita la extensión instalada y registrada.

**Resultado esperado** `{'canal': 'web'}` si HSTORE está accesible en search_path; de otro modo, el mensaje indicado.

### Serializador JSON personalizado

**Clave** `serializador-json-personalizado`

**Definición** `set_json_dumps()` configura cómo se convierte un objeto Python en JSON antes de enviarlo a PostgreSQL.

**Búsqueda** set_json_dumps; JSON Decimal; serializar objetos; conversión personalizada

**Para recordar** Elegir una representación explícita para tipos que JSON no admite directamente.

#### Guardar un Decimal como texto en JSONB

```python
import json
from decimal import Decimal
from functools import partial
from psycopg.types.json import Jsonb, set_json_dumps

set_json_dumps(partial(json.dumps, default=str), cur)
cur.execute("SELECT %s::jsonb", (Jsonb({"importe": Decimal("1.25")}),))
print(cur.fetchone()[0])
```

El serializador convierte el Decimal en una cadena; no lo redondea a float.

**Resultado esperado** `{'importe': '1.25'}`.

### Registrar un rango personalizado

**Clave** `registrar-rango-personalizado`

**Definición** `RangeInfo.fetch()` obtiene los metadatos de un rango PostgreSQL y `register_range()` instala su adaptación. `MultirangeInfo.fetch()` y `register_multirange()` hacen lo correspondiente para multirangos personalizados.

**Búsqueda** RangeInfo; MultirangeInfo; register_range; register_multirange; tipos de rango personalizados

**Para recordar** Registrar el tipo en la conexión antes de crear el cursor consumidor.

**Nota** Requiere permiso CREATE en el esquema de práctica. El rollback del envoltorio elimina los tipos creados.

#### Recuperar un rango de importes

```python
from psycopg.types.range import RangeInfo, register_range
cur.execute("CREATE TYPE importe_rango_demo AS RANGE (subtype=numeric)")
info = RangeInfo.fetch(conn, "importe_rango_demo")
register_range(info, conn)
with conn.cursor() as c:
    c.execute("SELECT '[10,20)'::importe_rango_demo")
    r = c.fetchone()[0]
    print(r.lower, r.upper, r.bounds)
```

El adaptador devuelve un objeto Range en lugar del texto de PostgreSQL.

**Resultado esperado** `10 20 [)`.

## Row factories

**Clave** `row-factories`

### Definición

**Clave** `definicion`

**Definición** Una row factory decide cómo se convierte cada fila recuperada: tupla, diccionario, objeto u otro resultado.

**Búsqueda** Definición; Leer un cliente como diccionario; Row factories

**Para recordar** No cambia la consulta ni los datos almacenados.

#### Leer un cliente como diccionario

```python
from psycopg.rows import dict_row
with conn.cursor(row_factory=dict_row) as c:
    print(c.execute("SELECT id, nombre FROM clientes WHERE id=1").fetchone())
```

No cambia la consulta ni los datos almacenados.

**Resultado esperado** `{'id': 1, 'nombre': 'Ana'}`.

### tuple_row

**Clave** `tuple-row`

**Definición** Es la fábrica de filas predeterminada: devuelve una tupla con los campos en el orden de SELECT.

**Búsqueda** tuple_row; Recuperar un nombre como tupla; Row factories

**Para recordar** Una consulta de una columna sigue devolviendo una tupla de un elemento.

#### Recuperar un nombre como tupla

```python
from psycopg.rows import tuple_row
with conn.cursor(row_factory=tuple_row) as c:
    print(c.execute("SELECT nombre FROM clientes WHERE id=1").fetchone())
```

Una consulta de una columna sigue devolviendo una tupla de un elemento.

**Resultado esperado** `('Ana',)`.

### dict_row

**Clave** `dict-row`

**Definición** Devuelve diccionarios cuyas claves son los nombres de columnas del resultado.

**Búsqueda** dict_row; Acceder por nombre de columna; Row factories

**Para recordar** Usar alias únicos cuando un JOIN tiene columnas de igual nombre.

#### Acceder por nombre de columna

```python
from psycopg.rows import dict_row
with conn.cursor(row_factory=dict_row) as c:
    fila = c.execute("SELECT id, nombre FROM clientes WHERE id=2").fetchone()
    print(fila["nombre"])
```

Usar alias únicos cuando un JOIN tiene columnas de igual nombre.

**Resultado esperado** `Luis`.

### namedtuple_row

**Clave** `namedtuple-row`

**Definición** Crea tuplas nombradas que permiten acceso por posición y atributo.

**Búsqueda** namedtuple_row; Acceder por atributo; Row factories

**Para recordar** Los nombres pueden ajustarse para que sean atributos Python válidos.

#### Acceder por atributo

```python
from psycopg.rows import namedtuple_row
with conn.cursor(row_factory=namedtuple_row) as c:
    fila = c.execute("SELECT id, nombre FROM clientes WHERE id=3").fetchone()
    print(fila.id, fila.nombre)
```

Los nombres pueden ajustarse para que sean atributos Python válidos.

**Resultado esperado** `3 Marta`.

### scalar_row

**Clave** `scalar-row`

**Definición** Devuelve únicamente la primera columna de cada fila, en lugar de la tupla completa.

**Búsqueda** scalar_row; Obtener una lista de IDs; Row factories

**Para recordar** Seleccionar solo la columna que se necesita.

#### Obtener una lista de IDs

```python
from psycopg.rows import scalar_row
with conn.cursor(row_factory=scalar_row) as c:
    print(c.execute("SELECT id FROM clientes ORDER BY id").fetchall())
```

Seleccionar solo la columna que se necesita.

**Resultado esperado** `[1, 2, 3, 4]`.

### class_row

**Clave** `class-row`

**Definición** Crea instancias de una clase pasando las columnas como argumentos nombrados.

**Búsqueda** class_row; Crear objetos Cliente; Row factories

**Para recordar** Los nombres de columnas deben coincidir con los argumentos de la clase.

#### Crear objetos Cliente

```python
from dataclasses import dataclass
from psycopg.rows import class_row
@dataclass
class Cliente:
    id: int
    nombre: str
with conn.cursor(row_factory=class_row(Cliente)) as c:
    print(c.execute("SELECT id, nombre FROM clientes WHERE id=1").fetchone())
```

Los nombres de columnas deben coincidir con los argumentos de la clase.

**Resultado esperado** `Cliente(id=1, nombre='Ana')`.

### args_row y kwargs_row

**Clave** `args-row-y-kwargs-row`

**Definición** `args_row` invoca una función con los campos posicionales; `kwargs_row` los pasa por nombre.

**Búsqueda** args_row y kwargs_row; Formar una etiqueta de cliente; Row factories

**Para recordar** Elegir según la firma de la función.

#### Formar una etiqueta de cliente

```python
from psycopg.rows import args_row, kwargs_row
def etiqueta(id, nombre):
    return f"{id}: {nombre}"
for factory in (args_row(etiqueta), kwargs_row(etiqueta)):
    with conn.cursor(row_factory=factory) as c:
        print(c.execute("SELECT id, nombre FROM clientes WHERE id=1").fetchone())
```

Elegir según la firma de la función.

**Resultado esperado** `1: Ana` dos veces.

### row_factory en conexión y cursor

**Clave** `row-factory-en-conexion-y-cursor`

**Definición** La configuración de conexión es el valor predeterminado de sus cursores; puede sobrescribirse al crear uno.

**Búsqueda** row_factory en conexión y cursor; Usar diccionarios en toda la sesión salvo un cursor; Row factories

**Para recordar** Cambiar la fábrica antes de recuperar filas de la consulta pertinente.

#### Usar diccionarios en toda la sesión salvo un cursor

```python
from psycopg.rows import dict_row, tuple_row
with psycopg.connect(DSN, row_factory=dict_row) as c:
    print(c.execute("SELECT 1 AS n").fetchone())
    with c.cursor(row_factory=tuple_row) as t:
        print(t.execute("SELECT 1 AS n").fetchone())
```

Cambiar la fábrica antes de recuperar filas de la consulta pertinente.

**Resultado esperado** `{'n': 1}`, luego `(1,)`.

### Custom row factories

**Clave** `custom-row-factories`

**Definición** Una fábrica personalizada recibe el cursor y retorna una función que transforma los valores de una fila.

**Búsqueda** Custom row factories; Convertir cada fila en una etiqueta; Row factories

**Para recordar** La fábrica puede usar description para conocer las columnas.

#### Convertir cada fila en una etiqueta

```python
def etiquetas(cursor):
    return lambda values: f"{values[0]} - {values[1]}"
with conn.cursor(row_factory=etiquetas) as c:
    print(c.execute("SELECT id, nombre FROM clientes WHERE id=1").fetchone())
```

La fábrica puede usar description para conocer las columnas.

**Resultado esperado** `1 - Ana`.

## Variantes de cursores y resultados grandes

**Clave** `variantes-de-cursores-y-resultados-grandes`

### Definición

**Clave** `definicion`

**Definición** Psycopg ofrece cursores que varían en dónde vinculan parámetros y dónde conservan los resultados.

**Búsqueda** Definición; Comparar cursor normal y nombrado; Variantes de cursores y resultados grandes

**Para recordar** Elegir según tamaño de consulta, compatibilidad y uso de memoria.

#### Comparar cursor normal y nombrado

```python
with conn.cursor() as a, conn.cursor(name="demo") as b:
    print(type(a).__name__, type(b).__name__)
```

Elegir según tamaño de consulta, compatibilidad y uso de memoria.

**Resultado esperado** `Cursor ServerCursor`.

### Cursor ordinario

**Clave** `cursor-ordinario`

**Definición** El `Cursor` recibe el resultado del servidor y lo conserva del lado del cliente. Es adecuado para consultas pequeñas o medianas.

**Búsqueda** Cursor ordinario; Leer los dos primeros resultados; Variantes de cursores y resultados grandes

**Para recordar** fetchmany no convierte por sí solo un Cursor en ServerCursor.

#### Leer los dos primeros resultados

```python
cur.execute("SELECT id FROM pedidos ORDER BY id")
print(cur.fetchmany(2))
```

fetchmany no convierte por sí solo un Cursor en ServerCursor.

**Resultado esperado** `[(101,), (102,)]`.

### ClientCursor

**Clave** `clientcursor`

**Definición** Vincula los parámetros en el cliente y envía el SQL compuesto al servidor. Puede ser útil para sentencias que no admiten parámetros del lado del servidor.

**Búsqueda** ClientCursor; Configurar una variable de sesión con parámetro; Variantes de cursores y resultados grandes

**Para recordar** Sigue pasando valores mediante execute; no concatenar manualmente.

**Nota** ClientCursor no ofrece resultados binarios ni prepared statements.

#### Configurar una variable de sesión con parámetro

```python
from psycopg import ClientCursor
with ClientCursor(conn) as c:
    c.execute("SET LOCAL application_name = %s", ("alldoc",))
    print(c.execute("SHOW application_name").fetchone())
```

Sigue pasando valores mediante execute; no concatenar manualmente.

**Resultado esperado** `('alldoc',)`.

### ServerCursor

**Clave** `servercursor`

**Definición** Un cursor nombrado mantiene la consulta en el servidor y recupera filas por partes.

**Búsqueda** ServerCursor; Recuperar un lote desde el servidor; Variantes de cursores y resultados grandes

**Para recordar** Útil si el conjunto completo no cabe cómodamente en memoria.

**Nota** Por defecto necesita una transacción activa y se cierra al finalizarla.

#### Recuperar un lote desde el servidor

```python
with conn.cursor(name="pedidos_lote") as c:
    c.execute("SELECT id FROM pedidos ORDER BY id")
    print(c.fetchmany(2))
    print(c.fetchmany(2))
```

Útil si el conjunto completo no cabe cómodamente en memoria.

**Resultado esperado** `[(101,), (102,)]`, luego `[(103,), (104,)]`.

### itersize

**Clave** `itersize`

**Definición** En un ServerCursor, `itersize` fija cuántas filas se recuperan del servidor por lote al iterar.

**Búsqueda** itersize; Iterar con lotes pequeños; Variantes de cursores y resultados grandes

**Para recordar** No es el mismo atributo que arraysize.

#### Iterar con lotes pequeños

```python
with conn.cursor(name="lote2") as c:
    c.itersize = 2
    c.execute("SELECT id FROM pedidos ORDER BY id")
    print([fila[0] for fila in c])
```

No es el mismo atributo que arraysize.

**Resultado esperado** `[101, 102, 103, 104, 105]`; recuperados en lotes de hasta dos durante la iteración.

### scroll y scrollable

**Clave** `scroll-y-scrollable`

**Definición** `scroll()` mueve el cursor; un ServerCursor puede declararse desplazable mediante `scrollable=True`.

**Búsqueda** scroll y scrollable; Volver al inicio del resultado; Variantes de cursores y resultados grandes

**Para recordar** La posición absoluta es de base cero según la interfaz del cursor.

#### Volver al inicio del resultado

```python
with conn.cursor(name="navegable", scrollable=True) as c:
    c.execute("SELECT id FROM pedidos ORDER BY id")
    print(c.fetchone())
    c.scroll(0, mode="absolute")
    print(c.fetchone())
```

La posición absoluta es de base cero según la interfaz del cursor.

**Resultado esperado** `(101,)` dos veces.

### withhold

**Clave** `withhold`

**Definición** Un ServerCursor con `withhold=True` puede conservarse después de un commit.

**Búsqueda** withhold; Leer después de confirmar; Variantes de cursores y resultados grandes

**Para recordar** Cerrar explícitamente un cursor retenido para liberar recursos del servidor.

#### Leer después de confirmar

```python
with psycopg.connect(DSN) as c:
    with c.cursor(name="retenido", withhold=True) as s:
        s.execute("SELECT id FROM pedidos ORDER BY id")
        c.commit()
        print(s.fetchone())
```

Cerrar explícitamente un cursor retenido para liberar recursos del servidor.

**Resultado esperado** `(101,)`.

### RawCursor y RawServerCursor

**Clave** `rawcursor-y-rawservercursor`

**Definición** Utilizan marcadores nativos `$1`, `$2` del protocolo PostgreSQL en lugar del formato `%s`.

**Búsqueda** RawCursor y RawServerCursor; Usar el marcador nativo; Variantes de cursores y resultados grandes

**Para recordar** No mezclar las dos convenciones de parámetros.

**Nota** Disponibles desde Psycopg 3.2; tienen limitaciones respecto a los cursores normales.

#### Usar el marcador nativo

```python
from psycopg import RawCursor, RawServerCursor
with RawCursor(conn) as c:
    print(c.execute("SELECT $1::int", (7,)).fetchone())
with RawServerCursor(conn, "raw_demo") as c:
    c.execute("SELECT $1::int", (8,))
    print(c.fetchone())
```

No mezclar las dos convenciones de parámetros.

**Resultado esperado** `(7,)`, luego `(8,)`.

### Resultados binarios

**Clave** `resultados-binarios`

**Definición** `binary=True` en el cursor o execute solicita resultados en formato binario. La conversión final depende de los loaders disponibles.

**Búsqueda** Resultados binarios; Recuperar un entero binario; Variantes de cursores y resultados grandes

**Para recordar** El formato del resultado es independiente del marcador %b.

#### Recuperar un entero binario

```python
with conn.cursor(binary=True) as c:
    print(c.execute("SELECT 42::int").fetchone())
```

El formato del resultado es independiente del marcador %b.

**Resultado esperado** `(42,)`; se convierte a int gracias al loader.

### stream

**Clave** `stream`

**Definición** `stream()` permite consumir resultados progresivamente sin almacenar todo el conjunto en un cursor normal.

**Búsqueda** stream; Procesar una secuencia de IDs; Variantes de cursores y resultados grandes

**Para recordar** Consumir el iterador por completo o cerrarlo si se abandona antes.

**Nota** La conexión queda ocupada mientras dura el stream; el modo por lotes de stream depende de libpq.

#### Procesar una secuencia de IDs

```python
for (n,) in cur.stream("SELECT generate_series(1,3)"):
    print(n)
```

Consumir el iterador por completo o cerrarlo si se abandona antes.

**Resultado esperado** `1`, `2`, `3`, uno por línea.

### cursor_factory y propiedades

**Clave** `cursor-factory-y-propiedades`

**Definición** La conexión puede configurar una clase de cursor por defecto mediante `cursor_factory`. El cursor expone `connection`, `format` y `pgresult`, además de su estado.

**Búsqueda** cursor_factory y propiedades; Consultar los metadatos del cursor; Variantes de cursores y resultados grandes

**Para recordar** Inspeccionar metadatos no sustituye recuperar las filas.

**Nota** `pgresult` contiene el resultado de bajo nivel cuando está disponible.

#### Consultar los metadatos del cursor

```python
from psycopg import ClientCursor
with psycopg.connect(DSN, cursor_factory=ClientCursor) as c:
    with c.cursor() as s:
        s.execute("SELECT 1")
        print(type(s).__name__, s.connection is c, s.format.name)
```

Inspeccionar metadatos no sustituye recuperar las filas.

**Resultado esperado** `ClientCursor True TEXT`.

## COPY e importación masiva

**Clave** `copy-e-importacion-masiva`

### Definición

**Clave** `definicion`

**Definición** `COPY` transfiere datos entre PostgreSQL y Python con menos sobrecarga que muchas instrucciones INSERT. `cursor.copy()` abre el flujo de transferencia.

**Búsqueda** Definición; Copiar dos filas a una tabla temporal; COPY e importación masiva

**Para recordar** COPY FROM STDIN importa; COPY TO STDOUT exporta.

#### Copiar dos filas a una tabla temporal

```python
cur.execute("CREATE TEMP TABLE carga_copy (id int, nombre text)")
with cur.copy("COPY carga_copy FROM STDIN") as cp:
    cp.write_row((1,"Ana"))
    cp.write_row((2,"Luis"))
print(cur.execute("SELECT * FROM carga_copy ORDER BY id").fetchall())
```

COPY FROM STDIN importa; COPY TO STDOUT exporta.

**Resultado esperado** `[(1, 'Ana'), (2, 'Luis')]`.

### write_row

**Clave** `write-row`

**Definición** Adapta una secuencia de valores Python a una fila COPY. Se usa con COPY FROM STDIN sin opciones de formato CSV.

**Búsqueda** write_row; Importar una fila con NULL; COPY e importación masiva

**Para recordar** No concatenar manualmente tabulaciones o comillas para filas Python.

#### Importar una fila con NULL

```python
cur.execute("CREATE TEMP TABLE carga_filas (id int, nota text)")
with cur.copy("COPY carga_filas FROM STDIN") as cp:
    cp.write_row((1,None))
print(cur.execute("SELECT * FROM carga_filas").fetchall())
```

No concatenar manualmente tabulaciones o comillas para filas Python.

**Resultado esperado** `[(1, None)]`.

### write y CSV

**Clave** `write-y-csv`

**Definición** `write()` envía un bloque en el formato solicitado por COPY. Con CSV, el archivo debe contener datos compatibles con el orden y los tipos de columnas.

**Búsqueda** write y CSV; Importar CSV desde memoria; COPY e importación masiva

**Para recordar** Si ya tienes CSV preparado, envíalo por bloques, no por write_row con FORMAT CSV.

#### Importar CSV desde memoria

```python
from io import StringIO
archivo = StringIO("id,nombre\n1,Ana\n2,Luis\n")
cur.execute("CREATE TEMP TABLE carga_csv (id int, nombre text)")
with cur.copy("COPY carga_csv FROM STDIN WITH (FORMAT CSV, HEADER)") as cp:
    while bloque := archivo.read(8192):
        cp.write(bloque)
print(cur.execute("SELECT COUNT(*) FROM carga_csv").fetchone())
```

Si ya tienes CSV preparado, envíalo por bloques, no por write_row con FORMAT CSV.

**Resultado esperado** `(2,)`.

### COPY TO y read

**Clave** `copy-to-y-read`

**Definición** `read()` recupera el siguiente bloque del flujo de salida; un bloque vacío indica el final.

**Búsqueda** COPY TO y read; Exportar un CSV a memoria; COPY e importación masiva

**Para recordar** El bloque puede ser una vista de memoria, no necesariamente bytes.

**Nota** El ejemplo presupone codificación UTF-8 en la sesión.

#### Exportar un CSV a memoria

```python
with cur.copy("COPY (SELECT id, nombre FROM clientes ORDER BY id) TO STDOUT WITH (FORMAT CSV, HEADER)") as cp:
    contenido = bytearray()
    while bloque := cp.read():
        contenido.extend(bloque)
print(contenido.decode("utf-8"))
```

El bloque puede ser una vista de memoria, no necesariamente bytes.

**Resultado esperado** Encabezado `id,nombre` y cuatro filas: `1,Ana`, `2,Luis`, `3,Marta`, `4,Diego`.

### read_row, rows y set_types

**Clave** `read-row-rows-y-set-types`

**Definición** `read_row()` obtiene una fila y `rows()` itera por las restantes. COPY TO no informa los tipos de columnas; `set_types()` permite convertirlos.

**Búsqueda** read_row, rows y set_types; Exportar IDs como enteros y nombres como texto; COPY e importación masiva

**Para recordar** El orden de tipos debe coincidir con el orden de columnas.

#### Exportar IDs como enteros y nombres como texto

```python
with cur.copy("COPY (SELECT id, nombre FROM clientes ORDER BY id) TO STDOUT") as cp:
    cp.set_types(["int4", "text"])
    print(cp.read_row())
    print(list(cp.rows()))
```

El orden de tipos debe coincidir con el orden de columnas.

**Resultado esperado** `(1, 'Ana')`, luego `[(2, 'Luis'), (3, 'Marta'), (4, 'Diego')]`.

### COPY binario

**Clave** `copy-binario`

**Definición** El formato binario requiere coincidencia exacta de tipos. `set_types()` es importante porque PostgreSQL no aplica los mismos casts que en INSERT.

**Búsqueda** COPY binario; Cargar un entero binario; COPY e importación masiva

**Para recordar** No enviar un entero adaptado a SMALLINT a una columna INTEGER sin ajustar el tipo.

#### Cargar un entero binario

```python
cur.execute("CREATE TEMP TABLE carga_bin (id int4)")
with cur.copy("COPY carga_bin FROM STDIN (FORMAT BINARY)") as cp:
    cp.set_types(["int4"])
    cp.write_row((7,))
print(cur.execute("SELECT id FROM carga_bin").fetchone())
```

No enviar un entero adaptado a SMALLINT a una columna INTEGER sin ajustar el tipo.

**Resultado esperado** `(7,)`.

### COPY entre conexiones

**Clave** `copy-entre-conexiones`

**Definición** Un flujo COPY TO de una sesión puede alimentar COPY FROM en otra. Es útil para transferir datos entre bases.

**Búsqueda** COPY entre conexiones; Transferir IDs a una tabla temporal de otra sesión; COPY e importación masiva

**Para recordar** El esquema, formato y tipos deben ser compatibles; cada conexión tiene su propia transacción.

**Nota** Para servidores distintos, usar sus DSN y gestionar fallos de ambas sesiones; no existe atomicidad distribuida por defecto.

#### Transferir IDs a una tabla temporal de otra sesión

```python
with psycopg.connect(DSN) as origen, psycopg.connect(DSN) as destino:
    destino.execute("CREATE TEMP TABLE traslado (id int)")
    with origen.cursor() as a, destino.cursor() as b:
        with a.copy("COPY (SELECT id FROM clientes ORDER BY id) TO STDOUT") as salida:
            with b.copy("COPY traslado FROM STDIN") as entrada:
                for bloque in salida:
                    entrada.write(bloque)
        print(b.execute("SELECT COUNT(*) FROM traslado").fetchone())
```

El esquema, formato y tipos deben ser compatibles; cada conexión tiene su propia transacción.

**Resultado esperado** `(4,)`.

### Writer y FileWriter

**Clave** `writer-y-filewriter`

**Definición** Los writers controlan el destino de bloques COPY FROM. `FileWriter` escribe la representación generada en un archivo binario, sin enviar esos bloques a PostgreSQL.

**Búsqueda** Writer y FileWriter; Generar datos COPY en un archivo en memoria; COPY e importación masiva

**Para recordar** Un writer personalizado debe implementar el contrato de escritura y finalización.

**Nota** `LibpqWriter` envía bloques al servidor; `QueuedLibpqWriter` usa una cola; los writers async tienen variantes asíncronas. La construcción directa de Copy es para casos especiales.

#### Generar datos COPY en un archivo en memoria

```python
from io import BytesIO
from psycopg import Copy
from psycopg.copy import FileWriter
archivo = BytesIO()
with Copy(cur, writer=FileWriter(archivo)) as cp:
    cp.write_row((1,"Ana"))
print(archivo.getvalue())
```

Un writer personalizado debe implementar el contrato de escritura y finalización.

**Resultado esperado** `b'1\tAna\n'`.

### Errores en COPY

**Clave** `errores-en-copy`

**Definición** Un fallo durante COPY puede invalidar la transacción. El contexto de copy libera el flujo y la transacción debe revertirse o recuperarse.

**Búsqueda** Errores en COPY; Revertir una carga con error; COPY e importación masiva

**Para recordar** No continuar enviando filas si la carga falló.

#### Revertir una carga con error

```python
cur.execute("CREATE TEMP TABLE carga_error (id int)")
try:
    with cur.copy("COPY carga_error FROM STDIN") as cp:
        cp.write_row(("no es entero",))
except psycopg.Error as exc:
    print(type(exc).__name__)
    conn.rollback()
```

No continuar enviando filas si la carga falló.

**Resultado esperado** `InvalidTextRepresentation`; la creación de la tabla y la carga se revierten.

## Connection pools

**Clave** `connection-pools`

### Definición

**Clave** `definicion`

**Definición** Un pool conserva o administra un conjunto limitado de conexiones para reutilizarlas entre trabajos. Se instala como paquete adicional `psycopg_pool`.

**Búsqueda** Definición; Instalar el complemento; Connection pools

**Para recordar** El pool administra conexiones, no cursores.

**Nota** El pool tiene versión y ciclo de publicación independientes. Los ejemplos usan la API 3.x del pool.

#### Instalar el complemento

```bash
python -m pip install "psycopg[pool]"
```

El pool administra conexiones, no cursores.

**Resultado esperado** `from psycopg_pool import ConnectionPool` queda disponible.

### ConnectionPool y connection

**Clave** `connectionpool-y-connection`

**Definición** `ConnectionPool` administra conexiones síncronas; `pool.connection()` presta una conexión y la devuelve al salir del bloque.

**Búsqueda** ConnectionPool y connection; Reutilizar una sesión para una consulta; Connection pools

**Para recordar** No cerrar manualmente una conexión prestada si deseas que se reutilice.

#### Reutilizar una sesión para una consulta

```python
from psycopg_pool import ConnectionPool
with ConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:
    pool.wait()
    with pool.connection() as c:
        print(c.execute("SELECT COUNT(*) FROM clientes").fetchone())
```

No cerrar manualmente una conexión prestada si deseas que se reutilice.

**Resultado esperado** `(4,)`. El contexto de préstamo gestiona commit o rollback y devolución; el exterior cierra el pool.

### getconn y putconn

**Clave** `getconn-y-putconn`

**Definición** Permiten tomar y devolver conexiones manualmente. No aplican por sí mismos el contexto de confirmación de `connection()`.

**Búsqueda** getconn y putconn; Devolver explícitamente una conexión; Connection pools

**Para recordar** Toda conexión prestada debe devolverse con putconn, incluso ante error.

#### Devolver explícitamente una conexión

```python
from psycopg_pool import ConnectionPool
with ConnectionPool(DSN, min_size=1, open=False) as pool:
    c = pool.getconn()
    try:
        print(c.execute("SELECT 1").fetchone())
    finally:
        c.rollback()
        pool.putconn(c)
```

Toda conexión prestada debe devolverse con putconn, incluso ante error.

**Resultado esperado** `(1,)`; la sesión se devuelve sin transacción abierta.

### open, wait y close

**Clave** `open-wait-y-close`

**Definición** `open()` inicia el pool, `wait()` espera que alcance su tamaño mínimo y `close()` detiene la entrega de conexiones.

**Búsqueda** open, wait y close; Iniciar y cerrar explícitamente; Connection pools

**Para recordar** `open=False` evita depender del comportamiento predeterminado de apertura.

#### Iniciar y cerrar explícitamente

```python
from psycopg_pool import ConnectionPool
pool = ConnectionPool(DSN, min_size=1, open=False)
try:
    pool.open()
    pool.wait(timeout=10)
    print(pool.closed)
finally:
    pool.close()
print(pool.closed)
```

`open=False` evita depender del comportamiento predeterminado de apertura.

**Resultado esperado** `False`, luego `True`, con servidor disponible.

### min_size, max_size y resize

**Clave** `min-size-max-size-y-resize`

**Definición** Los límites determinan cuántas conexiones mantiene o puede crear el pool. resize ajusta el rango.

**Búsqueda** min_size, max_size y resize; Cambiar el tamaño del pool; Connection pools

**Para recordar** Dimensionar según capacidad del servidor, no solo según cantidad de solicitudes.

#### Cambiar el tamaño del pool

```python
from psycopg_pool import ConnectionPool
with ConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:
    pool.resize(1, 3)
    print(pool.min_size, pool.max_size)
```

Dimensionar según capacidad del servidor, no solo según cantidad de solicitudes.

**Resultado esperado** `1 3`.

### timeout y max_waiting

**Clave** `timeout-y-max-waiting`

**Definición** `timeout` limita la espera por conexión; `max_waiting` limita solicitudes en cola. Un límite cero en max_waiting permite una cola sin límite explícito.

**Búsqueda** timeout y max_waiting; Detectar saturación controlada; Connection pools

**Para recordar** No confundir tiempo de espera del pool con tiempo de ejecución SQL.

**Nota** `TooManyRequests` indica cola llena; `PoolClosed`, pool cerrado.

#### Detectar saturación controlada

```python
from psycopg_pool import ConnectionPool, PoolTimeout
with ConnectionPool(DSN, min_size=1, max_size=1, open=False) as pool:
    with pool.connection():
        try:
            with pool.connection(timeout=0.1):
                pass
        except PoolTimeout:
            print("Pool ocupado")
```

No confundir tiempo de espera del pool con tiempo de ejecución SQL.

**Resultado esperado** `Pool ocupado`.

### max_lifetime, max_idle y reconexiones

**Clave** `max-lifetime-max-idle-y-reconexiones`

**Definición** El pool puede sustituir conexiones antiguas, reducir conexiones ociosas y reintentar creación de sesiones.

**Búsqueda** max_lifetime, max_idle y reconexiones; Configurar rotación de sesiones; Connection pools

**Para recordar** Estos límites no son garantías de duración de una consulta.

**Nota** `reconnect_failed` permite registrar fallos tras agotar la política de reconexión; no repite automáticamente una transacción de negocio.

#### Configurar rotación de sesiones

```python
from psycopg_pool import ConnectionPool
with ConnectionPool(DSN, min_size=1, max_size=3, max_lifetime=600, max_idle=120, reconnect_timeout=30, num_workers=2, open=False) as pool:
    with pool.connection() as c:
        print(c.execute("SELECT 1").fetchone())
```

Estos límites no son garantías de duración de una consulta.

**Resultado esperado** `(1,)` si hay disponibilidad.

### configure, check y reset

**Clave** `configure-check-y-reset`

**Definición** Los callbacks configuran una sesión nueva, comprueban una conexión antes de prestar y restablecen su estado al devolverla.

**Búsqueda** configure, check y reset; Asignar el nombre de aplicación del pool; Connection pools

**Para recordar** configure y reset deben dejar la conexión sin transacción activa.

**Nota** Usar `reset=` si hace falta limpiar estado adicional; `pool.check()` comprueba las conexiones disponibles.

#### Asignar el nombre de aplicación del pool

```python
from psycopg_pool import ConnectionPool
def configurar(c):
    c.execute("SET application_name='alldoc_pool'")
    c.commit()
with ConnectionPool(DSN, min_size=1, configure=configurar, check=ConnectionPool.check_connection, open=False) as pool:
    with pool.connection() as c:
        print(c.execute("SHOW application_name").fetchone())
```

configure y reset deben dejar la conexión sin transacción activa.

**Resultado esperado** `('alldoc_pool',)`.

### get_stats y pop_stats

**Clave** `get-stats-y-pop-stats`

**Definición** `get_stats()` obtiene métricas acumuladas y estado del pool; `pop_stats()` obtiene las métricas y reinicia los contadores acumulados.

**Búsqueda** get_stats y pop_stats; Consultar solicitudes atendidas; Connection pools

**Para recordar** Las métricas dependen del trabajo real; no asumir valores constantes.

#### Consultar solicitudes atendidas

```python
from psycopg_pool import ConnectionPool
with ConnectionPool(DSN, min_size=1, open=False) as pool:
    with pool.connection() as c:
        c.execute("SELECT 1")
    print(pool.get_stats().get("requests_num", 0))
```

Las métricas dependen del trabajo real; no asumir valores constantes.

**Resultado esperado** Un número de solicitudes de conexión, normalmente `1` en este pool nuevo.

### NullConnectionPool

**Clave** `nullconnectionpool`

**Definición** Controla la concurrencia sin mantener conexiones ociosas para reutilizarlas a largo plazo. Es útil cuando existe otro pool externo o se quiere limitar recursos.

**Búsqueda** NullConnectionPool; Limitar conexiones sin conservar un pool ocioso; Connection pools

**Para recordar** No equivale a mantener una conexión abierta permanentemente.

**Nota** Disponible en psycopg_pool 3.1+.

#### Limitar conexiones sin conservar un pool ocioso

```python
from psycopg_pool import NullConnectionPool
with NullConnectionPool(DSN, max_size=2, open=False) as pool:
    with pool.connection() as c:
        print(c.execute("SELECT 1").fetchone())
```

No equivale a mantener una conexión abierta permanentemente.

**Resultado esperado** `(1,)`; cuando no hay solicitudes esperando, la conexión se cierra al devolverla.

## Programación asíncrona

**Clave** `programacion-asincrona`

### Definición

**Clave** `definicion`

**Definición** La API async usa `AsyncConnection` y `AsyncCursor` para integrar operaciones PostgreSQL con un event loop, sin bloquearlo mientras espera E/S.

**Búsqueda** Definición; Consultar un dato desde asyncio; Programación asíncrona

**Para recordar** Usar await para operaciones de E/S; cursor() crea el objeto sin await.

**Nota** En notebooks con event loop activo usar `await main()` en lugar de asyncio.run; en Windows revisar el loop compatible indicado en la documentación.

#### Consultar un dato desde asyncio

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        async with c.cursor() as s:
            await s.execute("SELECT 1")
            print(await s.fetchone())
asyncio.run(main())
```

Usar await para operaciones de E/S; cursor() crea el objeto sin await.

**Resultado esperado** `(1,)`.

### AsyncConnection y AsyncCursor

**Clave** `asyncconnection-y-asynccursor`

**Definición** Sus métodos de consulta, recuperación y transacciones tienen equivalentes asíncronos; el contexto de conexión es `async with await connect(...)`.

**Búsqueda** AsyncConnection y AsyncCursor; Recuperar varios clientes; Programación asíncrona

**Para recordar** No olvidar await antes de execute o fetch.

#### Recuperar varios clientes

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        async with c.cursor() as s:
            await s.execute("SELECT nombre FROM clientes ORDER BY id LIMIT 2")
            print(await s.fetchall())
asyncio.run(main())
```

No olvidar await antes de execute o fetch.

**Resultado esperado** `[('Ana',), ('Luis',)]`.

### async for y stream

**Clave** `async-for-y-stream`

**Definición** `async for` consume filas de un cursor o stream asíncrono sin bloquear el event loop durante E/S.

**Búsqueda** async for y stream; Iterar números de forma asíncrona; Programación asíncrona

**Para recordar** La conexión permanece ocupada por el stream hasta agotarlo o cerrarlo.

#### Iterar números de forma asíncrona

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        async with c.cursor() as s:
            async for (n,) in s.stream("SELECT generate_series(1,3)"):
                print(n)
asyncio.run(main())
```

La conexión permanece ocupada por el stream hasta agotarlo o cerrarlo.

**Resultado esperado** `1`, `2`, `3`, uno por línea.

### AsyncServerCursor y variantes

**Clave** `asyncservercursor-y-variantes`

**Definición** Un cursor async nombrado es un AsyncServerCursor; también existen AsyncClientCursor, AsyncRawCursor y AsyncRawServerCursor.

**Búsqueda** AsyncServerCursor y variantes; Leer un lote async; Programación asíncrona

**Para recordar** Los cursores de servidor recuperan resultados por lotes.

#### Leer un lote async

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        async with c.cursor(name="async_lote") as s:
            await s.execute("SELECT id FROM pedidos ORDER BY id")
            print(await s.fetchmany(2))
asyncio.run(main())
```

Los cursores de servidor recuperan resultados por lotes.

**Resultado esperado** `[(101,), (102,)]`.

### Transacciones async

**Clave** `transacciones-async`

**Definición** `async with c.transaction()` delimita un bloque; `await c.commit()` y `await c.rollback()` controlan manualmente la transacción. Las propiedades de configuración se ajustan con métodos async.

**Búsqueda** Transacciones async; Revertir una escritura async; Programación asíncrona

**Para recordar** Usar `await c.set_autocommit(...)` y métodos `set_isolation_level`, `set_read_only`, `set_deferrable` cuando proceda.

#### Revertir una escritura async

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        await c.set_autocommit(True)
        async with c.transaction(force_rollback=True):
            await c.execute("UPDATE pedidos SET estado='completed' WHERE id=104")
        s = await c.execute("SELECT estado FROM pedidos WHERE id=104")
        print(await s.fetchone())
asyncio.run(main())
```

Usar `await c.set_autocommit(...)` y métodos `set_isolation_level`, `set_read_only`, `set_deferrable` cuando proceda.

**Resultado esperado** `('cancelled',)`.

### AsyncCopy

**Clave** `asynccopy`

**Definición** `async with cursor.copy()` permite COPY asíncrono; `write_row`, `write`, `read` y `read_row` se esperan con await.

**Búsqueda** AsyncCopy; Cargar dos filas async; Programación asíncrona

**Para recordar** El flujo de copia no debe intercalarse con otra consulta de la misma conexión.

**Nota** `AsyncCopy` y `AsyncWriter` son las contrapartes asíncronas; existen writers para libpq y cola async.

#### Cargar dos filas async

```python
import asyncio
async def main():
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        await c.execute("CREATE TEMP TABLE carga_async (id int)")
        async with c.cursor() as s:
            async with s.copy("COPY carga_async FROM STDIN") as cp:
                await cp.write_row((1,))
                await cp.write_row((2,))
            await s.execute("SELECT COUNT(*) FROM carga_async")
            print(await s.fetchone())
asyncio.run(main())
```

El flujo de copia no debe intercalarse con otra consulta de la misma conexión.

**Resultado esperado** `(2,)`.

### AsyncConnectionPool

**Clave** `asyncconnectionpool`

**Definición** El pool asíncrono presta AsyncConnection a tareas concurrentes. La apertura, espera y cierre usan las operaciones async correspondientes.

**Búsqueda** AsyncConnectionPool; Pedir una conexión al pool async; Programación asíncrona

**Para recordar** Una conexión por tarea cuando necesitas consultas o transacciones independientes.

**Nota** También existe AsyncNullConnectionPool para limitar conexiones sin conservarlas ociosas.

#### Pedir una conexión al pool async

```python
import asyncio
from psycopg_pool import AsyncConnectionPool
async def main():
    async with AsyncConnectionPool(DSN, min_size=1, max_size=2, open=False) as pool:
        await pool.wait()
        async with pool.connection() as c:
            s = await c.execute("SELECT COUNT(*) FROM clientes")
            print(await s.fetchone())
asyncio.run(main())
```

Una conexión por tarea cuando necesitas consultas o transacciones independientes.

**Resultado esperado** `(4,)`.

## Concurrencia y cancelación

**Clave** `concurrencia-y-cancelacion`

### Definición

**Clave** `definicion`

**Definición** Concurrencia significa que varias tareas o hilos realizan trabajo solapado. Una conexión serializa las operaciones que se envían por ella; para paralelismo de consultas se usan varias conexiones.

**Búsqueda** Definición; Ejecutar dos consultas independientes; Concurrencia y cancelación

**Para recordar** Compartir conexión implica compartir transacción.

**Nota** En producción, utilizar un pool limitado en vez de abrir conexiones ilimitadas.

#### Ejecutar dos consultas independientes

```python
from concurrent.futures import ThreadPoolExecutor
def consultar(id):
    with psycopg.connect(DSN) as c:
        return c.execute("SELECT nombre FROM clientes WHERE id=%s", (id,)).fetchone()[0]
with ThreadPoolExecutor(max_workers=2) as ex:
    print(list(ex.map(consultar, [1,2])))
```

Compartir conexión implica compartir transacción.

**Resultado esperado** `['Ana', 'Luis']`.

### Thread safety

**Clave** `thread-safety`

**Definición** Las conexiones pueden compartirse entre hilos, pero los cursores no. Las operaciones de una misma conexión se serializan.

**Búsqueda** Thread safety; Procesar dos cursores de una sesión compartida; Concurrencia y cancelación

**Para recordar** Usar cursores separados; una excepción de SQL afecta la transacción compartida.

#### Procesar dos cursores de una sesión compartida

```python
from concurrent.futures import ThreadPoolExecutor
def leer(n):
    with conn.cursor() as c:
        return c.execute("SELECT %s::int", (n,)).fetchone()[0]
with ThreadPoolExecutor(max_workers=2) as ex:
    print(list(ex.map(leer, [1,2])))
```

Usar cursores separados; una excepción de SQL afecta la transacción compartida.

**Resultado esperado** `[1, 2]`; ambas consultas usan la misma transacción.

### Process safety

**Clave** `process-safety`

**Definición** Una conexión no se comparte de forma segura entre procesos creados por fork. Cada proceso debe abrir sus propias conexiones.

**Búsqueda** Process safety; Abrir una conexión dentro de un proceso; Concurrencia y cancelación

**Para recordar** Crear el pool o la conexión después de iniciar el proceso hijo.

**Nota** En el archivo incluye los imports y la definición de DSN a nivel de módulo, pero no la preparación destructiva del dataset.

#### Abrir una conexión dentro de un proceso

```python
# Ejecutar como archivo .py, no como fragmento dentro de un notebook.
import multiprocessing as mp
def hijo():
    with psycopg.connect(DSN) as c:
        print(c.execute("SELECT 1").fetchone())
if __name__ == "__main__":
    p = mp.Process(target=hijo)
    p.start()
    p.join()
    print(p.exitcode)
```

Crear el pool o la conexión después de iniciar el proceso hijo.

**Resultado esperado** `(1,)` y `0` si el hijo conecta correctamente.

### asyncio.gather

**Clave** `asyncio-gather`

**Definición** `gather()` espera varias corutinas; para ejecutar consultas independientes, cada corutina puede obtener una conexión distinta.

**Búsqueda** asyncio.gather; Consultar dos clientes concurrentemente; Concurrencia y cancelación

**Para recordar** Una AsyncConnection compartida no hace simultáneas las consultas.

#### Consultar dos clientes concurrentemente

```python
import asyncio
async def leer(id):
    async with await psycopg.AsyncConnection.connect(DSN) as c:
        s = await c.execute("SELECT nombre FROM clientes WHERE id=%s", (id,))
        return (await s.fetchone())[0]
async def main():
    print(await asyncio.gather(leer(1), leer(2)))
asyncio.run(main())
```

Una AsyncConnection compartida no hace simultáneas las consultas.

**Resultado esperado** `['Ana', 'Luis']`.

### cancel y cancel_safe

**Clave** `cancel-y-cancel-safe`

**Definición** `cancel()` solicita interrumpir una operación; `cancel_safe()` ofrece una vía más robusta y con timeout en versiones compatibles. La cancelación puede llegar después de que finalice la consulta.

**Búsqueda** cancel y cancel_safe; Cancelar una consulta larga en una sesión dedicada; Concurrencia y cancelación

**Para recordar** Tras QueryCanceled, revertir la transacción si no se usa autocommit.

**Nota** `cancel_safe()` está disponible desde 3.2 y aprovecha las capacidades de libpq 17; en async se puede esperar con await. No cancelar una sesión que otra tarea use sin coordinación.

#### Cancelar una consulta larga en una sesión dedicada

```python
from threading import Timer
with psycopg.connect(DSN) as c:
    timer = Timer(0.5, c.cancel)
    timer.start()
    try:
        c.execute("SELECT pg_sleep(5)")
    except psycopg.errors.QueryCanceled:
        c.rollback()
        print("Consulta cancelada")
    finally:
        timer.cancel()
        timer.join()
```

Tras QueryCanceled, revertir la transacción si no se usa autocommit.

**Resultado esperado** Normalmente `Consulta cancelada`; si la cancelación llega tarde o falla, no se garantiza ese resultado.

### Gevent

**Clave** `gevent`

**Definición** Gevent permite concurrencia cooperativa mediante greenlets. Psycopg 3 puede cooperar con sockets parcheados desde versiones compatibles.

**Búsqueda** Gevent; Consultar con dos greenlets; Concurrencia y cancelación

**Para recordar** No confundir greenlets con asyncio; aplicar monkey patch antes de los imports de E/S.

**Nota** Definir DSN sin abrir conexiones antes del monkey patch; revisar soporte en el entorno y la versión.

#### Consultar con dos greenlets

```python
# Ejecutar en un proceso nuevo con gevent instalado.
from gevent import monkey
monkey.patch_all()
import gevent
import psycopg
def leer(n):
    with psycopg.connect(DSN) as c:
        return c.execute("SELECT %s::int", (n,)).fetchone()[0]
trabajos = [gevent.spawn(leer, n) for n in (1,2)]
gevent.joinall(trabajos, raise_error=True)
print([g.value for g in trabajos])
```

No confundir greenlets con asyncio; aplicar monkey patch antes de los imports de E/S.

**Resultado esperado** `[1, 2]`.

## Rendimiento y protocolo

**Clave** `rendimiento-y-protocolo`

### Definición

**Clave** `definicion`

**Definición** Psycopg permite reducir transferencias, reutilizar consultas preparadas y agrupar mensajes. La mejor opción depende del tamaño de resultados, latencia y trabajo del servidor.

**Búsqueda** Definición; Ver el plan estimado de una consulta; Rendimiento y protocolo

**Para recordar** Optimizar consultas y medir antes de modificar opciones del controlador.

**Nota** EXPLAIN es SQL; EXPLAIN ANALYZE ejecuta la consulta.

#### Ver el plan estimado de una consulta

```python
cur.execute("EXPLAIN SELECT * FROM pedidos WHERE cliente_id=1")
print(cur.fetchone()[0])
```

Optimizar consultas y medir antes de modificar opciones del controlador.

**Resultado esperado** Primera línea del plan PostgreSQL, por ejemplo un escaneo de la tabla; depende de estadísticas y configuración.

### Prepared statements

**Clave** `prepared-statements`

**Definición** Un prepared statement permite reutilizar la consulta preparada en la sesión. Psycopg puede prepararla automáticamente después de varias ejecuciones.

**Búsqueda** Prepared statements; Preparar explícitamente una consulta; Rendimiento y protocolo

**Para recordar** La preparación se refiere a una sesión concreta.

#### Preparar explícitamente una consulta

```python
cur.execute("SELECT nombre FROM clientes WHERE id=%s", (1,), prepare=True)
print(cur.fetchone())
print(cur.execute("SELECT COUNT(*) FROM pg_prepared_statements").fetchone()[0] >= 1)
```

La preparación se refiere a una sesión concreta.

**Resultado esperado** `('Ana',)` y `True`.

### prepare_threshold y prepared_max

**Clave** `prepare-threshold-y-prepared-max`

**Definición** `prepare_threshold` controla cuándo se prepara automáticamente; `prepared_max` limita las sentencias preparadas administradas. `None` desactiva la preparación automática.

**Búsqueda** prepare_threshold y prepared_max; Desactivar la preparación automática; Rendimiento y protocolo

**Para recordar** `prepare=False` evita preparar esa ejecución.

#### Desactivar la preparación automática

```python
with psycopg.connect(DSN, prepare_threshold=None) as c:
    c.prepared_max = 50
    print(c.execute("SELECT %s::int", (1,), prepare=False).fetchone())
```

`prepare=False` evita preparar esa ejecución.

**Resultado esperado** `(1,)`; esta consulta no se prepara automáticamente.

### Pipeline mode

**Clave** `pipeline-mode`

**Definición** El modo pipeline permite enviar varias operaciones sin esperar cada respuesta individualmente, reduciendo viajes de red.

**Búsqueda** Pipeline mode; Enviar dos consultas en pipeline; Rendimiento y protocolo

**Para recordar** No implica ejecutar consultas simultáneamente en el servidor.

**Nota** Requiere soporte de pipeline en libpq; no todos los tipos de operación se admiten, incluido COPY.

#### Enviar dos consultas en pipeline

```python
with conn.pipeline():
    a = conn.execute("SELECT 1")
    b = conn.execute("SELECT 2")
print(a.fetchone(), b.fetchone())
```

No implica ejecutar consultas simultáneamente en el servidor.

**Resultado esperado** `(1,) (2,)`.

### sync y errores de pipeline

**Clave** `sync-y-errores-de-pipeline`

**Definición** `sync()` marca un punto de sincronización y procesa respuestas pendientes. Un fallo puede abortar las instrucciones posteriores del segmento hasta la sincronización.

**Búsqueda** sync y errores de pipeline; Sincronizar dos operaciones; Rendimiento y protocolo

**Para recordar** Manejar fallos de transacción incluso en pipeline.

**Nota** Las variantes `Pipeline` y `AsyncPipeline` tienen gestión equivalente; en async se espera sync con await.

#### Sincronizar dos operaciones

```python
with conn.pipeline() as p:
    a = conn.execute("SELECT 10")
    p.sync()
    print(a.fetchone())
    b = conn.execute("SELECT 20")
print(b.fetchone())
```

Manejar fallos de transacción incluso en pipeline.

**Resultado esperado** `(10,)` y `(20,)`.

### Binding y protocolo extended/simple

**Clave** `binding-y-protocolo-extended-simple`

**Definición** El binding del servidor transmite parámetros separados de la instrucción mediante protocolo extendido; ClientCursor compone SQL en el cliente.

**Búsqueda** Binding y protocolo extended/simple; Ejecutar dos sentencias de forma separada; Rendimiento y protocolo

**Para recordar** No intentar enviar varias sentencias parametrizadas juntas con un Cursor normal.

**Nota** ClientCursor permite ciertos usos de SQL múltiple y DDL parametrizado que no acepta el binding del servidor.

#### Ejecutar dos sentencias de forma separada

```python
cur.execute("SELECT %s::int", (1,))
print(cur.fetchone())
cur.execute("SELECT %s::int", (2,))
print(cur.fetchone())
```

No intentar enviar varias sentencias parametrizadas juntas con un Cursor normal.

**Resultado esperado** `(1,)` y `(2,)`.

### PgBouncer y pooling externo

**Clave** `pgbouncer-y-pooling-externo`

**Definición** Un proxy como PgBouncer puede reutilizar sesiones de PostgreSQL entre conexiones cliente. Su modo de pooling determina qué estado de sesión puede conservarse.

**Búsqueda** PgBouncer y pooling externo; Desactivar preparación automática si el proxy no la admite; Rendimiento y protocolo

**Para recordar** No asumir que un prepared statement o tabla temporal sobreviva entre transacciones en transaction pooling.

**Nota** El ejemplo funciona también directamente con PostgreSQL. El soporte de prepared statements depende de versiones, modo de PgBouncer y configuración; consultar documentación antes de activarlo.

#### Desactivar preparación automática si el proxy no la admite

```python
with psycopg.connect(DSN, prepare_threshold=None) as c:
    print(c.execute("SELECT 1").fetchone())
```

No asumir que un prepared statement o tabla temporal sobreviva entre transacciones en transaction pooling.

**Resultado esperado** `(1,)`.

## Seguridad y configuración de sesión

**Clave** `seguridad-y-configuracion-de-sesion`

### Definición

**Clave** `definicion`

**Definición** Las conexiones admiten opciones de autenticación, cifrado, tiempos de espera y configuración de PostgreSQL. Los permisos efectivos son los del usuario de la base.

**Búsqueda** Definición; Identificar el usuario de sesión; Seguridad y configuración de sesión

**Para recordar** El controlador no sustituye la seguridad del servidor.

#### Identificar el usuario de sesión

```python
print(cur.execute("SELECT current_user").fetchone()[0])
```

El controlador no sustituye la seguridad del servidor.

**Resultado esperado** Nombre del rol autenticado en PostgreSQL.

### SSL y TLS

**Clave** `ssl-y-tls`

**Definición** libpq permite elegir una política TLS mediante `sslmode` y rutas de certificados. `verify-full` verifica la confianza y el nombre del servidor.

**Búsqueda** SSL y TLS; Construir una conexión con verificación completa; Seguridad y configuración de sesión

**Para recordar** Para datos sensibles en una red no confiable, configurar verificación de identidad además de cifrado.

**Nota** No ejecuta la conexión; sustituir la ruta por una CA válida y configurar `sslcert` y `sslkey` si se exige autenticación mutua. No imprimir la cadena completa.

#### Construir una conexión con verificación completa

```python
from psycopg.conninfo import make_conninfo, conninfo_to_dict
seguro = make_conninfo(DSN, sslmode="verify-full", sslrootcert="/ruta/ca.pem")
print(conninfo_to_dict(seguro)["sslmode"])
```

Para datos sensibles en una red no confiable, configurar verificación de identidad además de cifrado.

**Resultado esperado** `verify-full`.

### connect_timeout

**Clave** `connect-timeout`

**Definición** Limita la espera al establecer conexión, por host según libpq. No limita la duración de SELECT.

**Búsqueda** connect_timeout; Conectar con límite de espera; Seguridad y configuración de sesión

**Para recordar** Configurar tiempos de conexión y de consulta por separado.

#### Conectar con límite de espera

```python
with psycopg.connect(DSN, connect_timeout=5) as c:
    print(c.execute("SELECT 1").fetchone())
```

Configurar tiempos de conexión y de consulta por separado.

**Resultado esperado** `(1,)` si conecta; una excepción OperationalError si falla.

### statement_timeout

**Clave** `statement-timeout`

**Definición** Es una opción PostgreSQL que limita el tiempo de una instrucción. Puede configurarse por sesión o transacción.

**Búsqueda** statement_timeout; Limitar una consulta de demostración; Seguridad y configuración de sesión

**Para recordar** Capturar QueryCanceled y restablecer la transacción si falla.

#### Limitar una consulta de demostración

```python
cur.execute("SET LOCAL statement_timeout='100ms'")
try:
    cur.execute("SELECT pg_sleep(1)")
except psycopg.errors.QueryCanceled:
    conn.rollback()
    print("Tiempo agotado")
```

Capturar QueryCanceled y restablecer la transacción si falla.

**Resultado esperado** `Tiempo agotado`.

### lock_timeout

**Clave** `lock-timeout`

**Definición** Limita cuánto espera una instrucción por un bloqueo. Es distinto del tiempo total de ejecución.

**Búsqueda** lock_timeout; Configurar un límite de bloqueo local; Seguridad y configuración de sesión

**Para recordar** Usarlo cuando esperar indefinidamente por un bloqueo no sea aceptable.

#### Configurar un límite de bloqueo local

```python
cur.execute("SET LOCAL lock_timeout='500ms'")
print(cur.execute("SHOW lock_timeout").fetchone())
```

Usarlo cuando esperar indefinidamente por un bloqueo no sea aceptable.

**Resultado esperado** `('500ms',)`.

### Parámetros de sesión y encoding

**Clave** `parametros-de-sesion-y-encoding`

**Definición** La conexión permite leer parámetros enviados por libpq; los ajustes de servidor se pueden consultar o cambiar con SQL cuando está permitido.

**Búsqueda** Parámetros de sesión y encoding; Consultar codificación y zona horaria; Seguridad y configuración de sesión

**Para recordar** La codificación del cliente condiciona la transferencia de texto.

#### Consultar codificación y zona horaria

```python
print(conn.info.encoding)
print(cur.execute("SHOW TimeZone").fetchone())
```

La codificación del cliente condiciona la transferencia de texto.

**Resultado esperado** Codificación Python, por ejemplo `utf-8`, y la zona horaria configurada.

### Permisos y mínimo privilegio

**Clave** `permisos-y-minimo-privilegio`

**Definición** Las consultas se ejecutan con los permisos del rol de conexión. Un usuario de reportes normalmente no necesita privilegios para modificar tablas.

**Búsqueda** Permisos y mínimo privilegio; Comprobar el permiso de lectura; Seguridad y configuración de sesión

**Para recordar** `read_only` no reemplaza GRANT y REVOKE administrados en el servidor.

#### Comprobar el permiso de lectura

```python
cur.execute("SELECT has_table_privilege(current_user, 'clientes', 'SELECT')")
print(cur.fetchone())
```

`read_only` no reemplaza GRANT y REVOKE administrados en el servidor.

**Resultado esperado** `(True,)` para el usuario que creó el dataset.

### Logging

**Clave** `logging`

**Definición** Psycopg utiliza logging de Python para eventos del controlador; el logger `psycopg.pool` permite observar eventos del pool.

**Búsqueda** Logging; Configurar diagnósticos del controlador; Seguridad y configuración de sesión

**Para recordar** No registrar contraseñas ni parámetros sensibles.

**Nota** No garantiza un registro completo de cada sentencia SQL.

#### Configurar diagnósticos del controlador

```python
import logging
logging.basicConfig(level=logging.INFO)
logging.getLogger("psycopg").setLevel(logging.DEBUG)
with psycopg.connect(DSN) as c:
    print(c.execute("SELECT 1").fetchone())
```

No registrar contraseñas ni parámetros sensibles.

**Resultado esperado** `(1,)`; pueden aparecer mensajes diagnósticos dependiendo de la implementación y configuración de logging.

## Avisos y notificaciones

**Clave** `avisos-y-notificaciones`

### Definición

**Clave** `definicion`

**Definición** PostgreSQL puede enviar avisos (mensajes diagnósticos) y notificaciones entre sesiones. Psycopg ofrece handlers y generadores para recibirlos.

**Búsqueda** Definición; Recibir un aviso de la sesión; Avisos y notificaciones

**Para recordar** NOTIFY no es una cola persistente ni una tabla.

#### Recibir un aviso de la sesión

```python
def aviso(diag):
    print(diag.message_primary)
conn.add_notice_handler(aviso)
try:
    cur.execute("DO $$ BEGIN RAISE NOTICE 'Carga lista'; END $$")
finally:
    conn.remove_notice_handler(aviso)
```

NOTIFY no es una cola persistente ni una tabla.

**Resultado esperado** `Carga lista`.

### add_notice_handler y remove_notice_handler

**Clave** `add-notice-handler-y-remove-notice-handler`

**Definición** El callback recibe un objeto Diagnostic durante el aviso. Debe copiar los datos necesarios dentro de la llamada.

**Búsqueda** add_notice_handler y remove_notice_handler; Registrar la severidad de un aviso; Avisos y notificaciones

**Para recordar** No conservar el objeto diagnóstico para usarlo después del callback.

#### Registrar la severidad de un aviso

```python
mensajes = []
def aviso(diag):
    mensajes.append((diag.severity_nonlocalized, diag.message_primary))
conn.add_notice_handler(aviso)
try:
    cur.execute("DO $$ BEGIN RAISE NOTICE 'OK'; END $$")
finally:
    conn.remove_notice_handler(aviso)
print(mensajes)
```

No conservar el objeto diagnóstico para usarlo después del callback.

**Resultado esperado** `[('NOTICE', 'OK')]` con la configuración usual de mensajes del cliente.

### LISTEN, NOTIFY y notifies

**Clave** `listen-notify-y-notifies`

**Definición** LISTEN suscribe una sesión a un canal; NOTIFY publica una notificación al confirmar. `notifies()` permite consumir los objetos Notify recibidos.

**Búsqueda** LISTEN, NOTIFY y notifies; Enviar y recibir un evento; Avisos y notificaciones

**Para recordar** Usar una conexión dedicada en autocommit para escuchar sin demoras de commit.

**Nota** `evento.pid` identifica el backend emisor. Los canales son sensibles a las reglas de identificadores PostgreSQL; usa uno de prueba sin tráfico ajeno.

#### Enviar y recibir un evento

```python
with psycopg.connect(DSN, autocommit=True) as receptor, psycopg.connect(DSN, autocommit=True) as emisor:
    receptor.execute("LISTEN ventas_demo")
    emisor.execute("SELECT pg_notify(%s,%s)", ("ventas_demo","nuevo"))
    for evento in receptor.notifies(timeout=3, stop_after=1):
        print(evento.channel, evento.payload)
    receptor.execute("UNLISTEN ventas_demo")
```

Usar una conexión dedicada en autocommit para escuchar sin demoras de commit.

**Resultado esperado** `ventas_demo nuevo` si la notificación llega dentro del límite.

### add_notify_handler y remove_notify_handler

**Clave** `add-notify-handler-y-remove-notify-handler`

**Definición** Un handler recibe las notificaciones cuando la conexión procesa mensajes del servidor durante sus operaciones. No funciona como listener en segundo plano por sí solo.

**Búsqueda** add_notify_handler y remove_notify_handler; Procesar notificaciones en una conexión activa; Avisos y notificaciones

**Para recordar** No mezclar handlers y generador notifies en la misma conexión sin revisar la versión.

**Nota** Para una escucha dedicada con espera explícita, usar notifies().

#### Procesar notificaciones en una conexión activa

```python
with psycopg.connect(DSN, autocommit=True) as c:
    eventos = []
    def recibir(n):
        eventos.append(n.payload)
    c.add_notify_handler(recibir)
    c.execute("LISTEN ventas_demo_handler")
    c.execute("SELECT pg_notify('ventas_demo_handler','listo')")
    c.execute("SELECT 1")
    c.remove_notify_handler(recibir)
    print(eventos)
```

No mezclar handlers y generador notifies en la misma conexión sin revisar la versión.

**Resultado esperado** Normalmente `['listo']` al procesarse los mensajes; la entrega es asíncrona.

## Adaptación personalizada

**Clave** `adaptacion-personalizada`

### Definición

**Clave** `definicion`

**Definición** La adaptación se configura mediante registros de dumpers (Python a PostgreSQL) y loaders (PostgreSQL a Python). Se pueden ajustar por cursor, conexión o globalmente.

**Búsqueda** Definición; Consultar el registro de una conexión; Adaptación personalizada

**Para recordar** Registrar en el contexto más pequeño que necesites.

#### Consultar el registro de una conexión

```python
from psycopg.adapt import AdaptersMap
print(isinstance(conn.adapters, AdaptersMap))
```

Registrar en el contexto más pequeño que necesites.

**Resultado esperado** `True`.

### AdaptersMap y alcance

**Clave** `adaptersmap-y-alcance`

**Definición** `AdaptersMap` contiene asociaciones entre tipos Python, formatos y tipos PostgreSQL. Los contextos nuevos heredan configuración de su origen.

**Búsqueda** AdaptersMap y alcance; Comparar mapas de adaptación; Adaptación personalizada

**Para recordar** Un cambio global puede afectar todas las conexiones creadas después.

#### Comparar mapas de adaptación

```python
with conn.cursor() as otro:
    print(otro.adapters is conn.adapters)
```

Un cambio global puede afectar todas las conexiones creadas después.

**Resultado esperado** `False`; el cursor tiene su propio contexto que hereda las asociaciones de la conexión.

### Dumper y register_dumper

**Clave** `dumper-y-register-dumper`

**Definición** Un Dumper define cómo enviar un objeto Python en un formato PostgreSQL. Se registra para una clase Python y, si hace falta, un OID.

**Búsqueda** Dumper y register_dumper; Adaptar una etiqueta propia a texto; Adaptación personalizada

**Para recordar** La salida de dump son bytes o un valor admitido por la API de adaptación.

**Nota** El ejemplo usa UTF-8 y un cast explícito; para adaptación general considerar el encoding del contexto.

#### Adaptar una etiqueta propia a texto

```python
from psycopg.adapt import Dumper
class Etiqueta:
    def __init__(self, valor):
        self.valor = valor
class EtiquetaDumper(Dumper):
    def dump(self, obj):
        return obj.valor.encode("utf-8")
cur.adapters.register_dumper(Etiqueta, EtiquetaDumper)
cur.execute("SELECT %s::text", (Etiqueta("VIP"),))
print(cur.fetchone())
```

La salida de dump son bytes o un valor admitido por la API de adaptación.

**Resultado esperado** `('VIP',)`.

### Loader y register_loader

**Clave** `loader-y-register-loader`

**Definición** Un Loader transforma el valor recibido para un tipo PostgreSQL y formato determinado.

**Búsqueda** Loader y register_loader; Convertir textos a mayúsculas solo en un cursor; Adaptación personalizada

**Para recordar** El tipo de la columna decide qué loader se utiliza.

**Nota** El ejemplo presupone UTF-8 y modifica únicamente este cursor.

#### Convertir textos a mayúsculas solo en un cursor

```python
from psycopg.adapt import Loader
class Mayusculas(Loader):
    def load(self, data):
        return bytes(data).decode("utf-8").upper()
cur.adapters.register_loader("text", Mayusculas)
print(cur.execute("SELECT 'ana'::text").fetchone())
```

El tipo de la columna decide qué loader se utiliza.

**Resultado esperado** `('ANA',)`.

### TypeInfo y OID

**Clave** `typeinfo-y-oid`

**Definición** `TypeInfo` describe un tipo PostgreSQL, incluido su OID (identificador interno) y el OID de su arreglo.

**Búsqueda** TypeInfo y OID; Consultar un tipo del servidor; Adaptación personalizada

**Para recordar** No fijar OID de tipos personalizados entre servidores.

#### Consultar un tipo del servidor

```python
from psycopg.types import TypeInfo
info = TypeInfo.fetch(conn, "int4")
print(info.name, info.oid)
```

No fijar OID de tipos personalizados entre servidores.

**Resultado esperado** `int4 23`.

### TypesRegistry

**Clave** `typesregistry`

**Definición** El registro de tipos permite localizar metadatos por nombre u OID. Los tipos personalizados pueden registrarse para que los adaptadores conozcan sus identificadores.

**Búsqueda** TypesRegistry; Buscar el tipo entero en el registro; Adaptación personalizada

**Para recordar** Los metadatos del tipo no son lo mismo que su loader.

**Nota** `TypeInfo.register(conn)` añade metadatos; los registradores específicos pueden instalar adaptadores también.

#### Buscar el tipo entero en el registro

```python
from psycopg.types import TypesRegistry
print(isinstance(conn.adapters.types, TypesRegistry))
print(conn.adapters.types["int4"].oid)
```

Los metadatos del tipo no son lo mismo que su loader.

**Resultado esperado** `True`, luego `23`.

### Transformer y PyFormat

**Clave** `transformer-y-pyformat`

**Definición** Transformer coordina la adaptación de los valores de una consulta; PyFormat distingue selección automática, texto y binario.

**Búsqueda** Transformer y PyFormat; Obtener un dumper para texto; Adaptación personalizada

**Para recordar** Es una API de extensión; la mayoría de consultas no necesita usarla directamente.

#### Obtener un dumper para texto

```python
from psycopg.adapt import Transformer, PyFormat
tx = Transformer(conn)
dumper = tx.get_dumper(42, PyFormat.TEXT)
print(bytes(dumper.dump(42)))
```

Es una API de extensión; la mayoría de consultas no necesita usarla directamente.

**Resultado esperado** `b'42'`.

### Registro de tipos personalizados

**Clave** `registro-de-tipos-personalizados`

**Definición** Los tipos personalizados pueden necesitar recuperar información del servidor y asociar sus adaptadores al contexto que los utiliza.

**Búsqueda** Registro de tipos personalizados; Consultar metadatos y registrarlos; Adaptación personalizada

**Para recordar** Registrar antes de crear cursores que deban heredar esa configuración.

**Nota** Para enums, compuestos, rangos, multirangos y HSTORE usar sus registradores especializados, mostrados en el grupo correspondiente.

#### Consultar metadatos y registrarlos

```python
from psycopg.types import TypeInfo
info = TypeInfo.fetch(conn, "text")
info.register(conn)
print(conn.adapters.types["text"].name)
```

Registrar antes de crear cursores que deban heredar esa configuración.

**Resultado esperado** `text`.

## Tipado estático

**Clave** `tipado-estatico`

### Definición

**Clave** `definicion`

**Definición** Psycopg ofrece anotaciones y genéricos para que herramientas como mypy o Pyright puedan comprobar los tipos de conexiones, cursores y filas.

**Búsqueda** Definición; Anotar una conexión que devuelve tuplas; Tipado estático

**Para recordar** Las anotaciones no validan datos en tiempo de ejecución por sí solas.

#### Anotar una conexión que devuelve tuplas

```python
from psycopg import Connection
from typing import Any
def total(c: Connection[tuple[Any, ...]]) -> int:
    fila = c.execute("SELECT COUNT(*) FROM pedidos").fetchone()
    assert fila is not None
    return int(fila[0])
print(total(conn))
```

Las anotaciones no validan datos en tiempo de ejecución por sí solas.

**Resultado esperado** `5`.

### fetchone y Optional

**Clave** `fetchone-y-optional`

**Definición** `fetchone()` puede devolver una fila o None. El tipado obliga a considerar que no haya resultados.

**Búsqueda** fetchone y Optional; Buscar un cliente posiblemente ausente; Tipado estático

**Para recordar** Comprobar None antes de indexar.

#### Buscar un cliente posiblemente ausente

```python
def nombre_por_id(id: int) -> str | None:
    fila = conn.execute("SELECT nombre FROM clientes WHERE id=%s", (id,)).fetchone()
    return None if fila is None else fila[0]
print(nombre_por_id(1), nombre_por_id(999))
```

Comprobar None antes de indexar.

**Resultado esperado** `Ana None`.

### Tipado de row factories

**Clave** `tipado-de-row-factories`

**Definición** Las factories de fila pueden determinar el tipo genérico del cursor y el resultado inferido por el analizador.

**Búsqueda** Tipado de row factories; Recuperar un objeto tipado; Tipado estático

**Para recordar** Usar class_row si se desea una clase de dominio con atributos tipados.

**Nota** Con Pydantic, una clase BaseModel compatible también puede realizar validación de sus campos; necesita la dependencia adicional.

#### Recuperar un objeto tipado

```python
from dataclasses import dataclass
from psycopg.rows import class_row
@dataclass
class Cliente:
    id: int
    nombre: str
with conn.cursor(row_factory=class_row(Cliente)) as c:
    cliente = c.execute("SELECT id,nombre FROM clientes WHERE id=1").fetchone()
    if cliente is not None:
        print(cliente.nombre)
```

Usar class_row si se desea una clase de dominio con atributos tipados.

**Resultado esperado** `Ana`.

### Genéricos de pools y protocolos

**Clave** `genericos-de-pools-y-protocolos`

**Definición** Las clases genéricas de conexión y pool permiten conservar información de tipos. `psycopg.abc` contiene protocolos e interfaces para extensiones y composición.

**Búsqueda** Genéricos de pools y protocolos; Usar Query como anotación de una consulta; Tipado estático

**Para recordar** Importar tipos de la API pública y no depender de atributos privados.

**Nota** Los protocolos como AdaptContext y los tipos de fila son relevantes al desarrollar extensiones; no se necesitan para una consulta ordinaria.

#### Usar Query como anotación de una consulta

```python
from psycopg.abc import Query
from psycopg import sql
def leer(q: Query):
    return conn.execute(q).fetchall()
print(leer(sql.SQL("SELECT 1")))
```

Importar tipos de la API pública y no depender de atributos privados.

**Resultado esperado** `[(1,)]`.

## libpq y API de bajo nivel

**Clave** `libpq-y-api-de-bajo-nivel`

### Definición

**Clave** `definicion`

**Definición** `psycopg.pq` expone una interfaz cercana a libpq, la biblioteca cliente de PostgreSQL. Permite inspeccionar detalles del protocolo sin depender únicamente de la capa DB-API.

**Búsqueda** Definición; Inspeccionar la versión de libpq; libpq y API de bajo nivel

**Para recordar** Usar la API de alto nivel salvo que necesites control especializado.

#### Inspeccionar la versión de libpq

```python
from psycopg import pq
print(pq.version())
```

Usar la API de alto nivel salvo que necesites control especializado.

**Resultado esperado** Un entero que codifica la versión de libpq instalada o incluida por el controlador.

### PGconn y ConnStatus

**Clave** `pgconn-y-connstatus`

**Definición** `conn.pgconn` es el objeto PGconn subyacente; ConnStatus describe el estado de la conexión.

**Búsqueda** PGconn y ConnStatus; Consultar el estado de bajo nivel; libpq y API de bajo nivel

**Para recordar** No mezclar llamadas que alteren el protocolo de PGconn con una consulta activa de Connection.

#### Consultar el estado de bajo nivel

```python
from psycopg import pq
print(isinstance(conn.pgconn, pq.PGconn))
print(conn.pgconn.status == pq.ConnStatus.OK)
```

No mezclar llamadas que alteren el protocolo de PGconn con una consulta activa de Connection.

**Resultado esperado** `True`, `True` para una conexión operativa.

### PGresult y ExecStatus

**Clave** `pgresult-y-execstatus`

**Definición** PGresult representa una respuesta PostgreSQL. ExecStatus identifica el tipo de respuesta, y sus metadatos incluyen número de filas y columnas.

**Búsqueda** PGresult y ExecStatus; Inspeccionar una respuesta sin modificarla; libpq y API de bajo nivel

**Para recordar** La capa DB-API transforma PGresult en filas Python.

#### Inspeccionar una respuesta sin modificarla

```python
from psycopg import pq
cur.execute("SELECT id,nombre FROM clientes WHERE id=1")
r = cur.pgresult
print(r.status == pq.ExecStatus.TUPLES_OK, r.ntuples, r.nfields)
```

La capa DB-API transforma PGresult en filas Python.

**Resultado esperado** `True 1 2`.

### TransactionStatus

**Clave** `transactionstatus`

**Definición** Describe si la sesión está inactiva, ejecutando, dentro de una transacción, en error o en estado desconocido.

**Búsqueda** TransactionStatus; Identificar una transacción abierta; libpq y API de bajo nivel

**Para recordar** Consultar el estado antes de reutilizar una sesión tras un fallo.

#### Identificar una transacción abierta

```python
from psycopg import pq
cur.execute("SELECT 1")
print(conn.pgconn.transaction_status == pq.TransactionStatus.INTRANS)
```

Consultar el estado antes de reutilizar una sesión tras un fallo.

**Resultado esperado** `True` con autocommit desactivado.

### Format y PipelineStatus

**Clave** `format-y-pipelinestatus`

**Definición** Format representa formato texto/binario; PipelineStatus refleja el estado del modo pipeline.

**Búsqueda** Format y PipelineStatus; Inspeccionar formato y estado; libpq y API de bajo nivel

**Para recordar** Son enumeraciones del protocolo, no tipos SQL.

#### Inspeccionar formato y estado

```python
from psycopg import pq
cur.execute("SELECT 1")
print(cur.format == pq.Format.TEXT)
print(conn.pgconn.pipeline_status == pq.PipelineStatus.OFF)
```

Son enumeraciones del protocolo, no tipos SQL.

**Resultado esperado** `True` y `True` en un cursor ordinario sin pipeline.

### PGcancel y PollingStatus

**Clave** `pgcancel-y-pollingstatus`

**Definición** PGcancel representa un mecanismo de cancelación de libpq; PollingStatus permite interpretar el avance de operaciones no bloqueantes, como una conexión en establecimiento.

**Búsqueda** PGcancel y PollingStatus; Consultar constantes sin iniciar una operación; libpq y API de bajo nivel

**Para recordar** Preferir `cancel_safe()` y las conexiones async para no manipular manualmente el protocolo.

**Nota** La cancelación de bajo nivel tiene requisitos de versión; no llamar métodos privados de la conexión.

#### Consultar constantes sin iniciar una operación

```python
from psycopg import pq
print(pq.PollingStatus.OK.name)
print(pq.PollingStatus.READING.name)
```

Preferir `cancel_safe()` y las conexiones async para no manipular manualmente el protocolo.

**Resultado esperado** `OK`, `READING`.

### fileno y wait

**Clave** `fileno-y-wait`

**Definición** `fileno()` devuelve el descriptor de conexión; `wait()` consume un generador de operaciones de E/S interno o de extensión hasta finalizarlo.

**Búsqueda** fileno y wait; Obtener el descriptor de una conexión abierta; libpq y API de bajo nivel

**Para recordar** No hacer lecturas manuales del socket mientras Psycopg gestiona la conexión.

**Nota** `wait()` es para integraciones avanzadas; usar execute o AsyncConnection para el trabajo normal.

#### Obtener el descriptor de una conexión abierta

```python
print(conn.fileno() >= 0)
```

No hacer lecturas manuales del socket mientras Psycopg gestiona la conexión.

**Resultado esperado** `True` si existe un descriptor válido.

### Escaping

**Clave** `escaping`

**Definición** La clase Escaping de libpq aplica reglas de escape a fragmentos y valores. Las capas `sql.Identifier()` y parámetros son preferibles para construir consultas.

**Búsqueda** Escaping; Inspeccionar un identificador escapado; libpq y API de bajo nivel

**Para recordar** No usar escape manual como sustituto de parámetros.

#### Inspeccionar un identificador escapado

```python
from psycopg import pq
escape = pq.Escaping(conn.pgconn)
print(escape.escape_identifier(b'mi tabla'))
```

No usar escape manual como sustituto de parámetros.

**Resultado esperado** `b'"mi tabla"'`.

### capabilities

**Clave** `capabilities`

**Definición** El objeto `psycopg.capabilities` permite detectar características que dependen de la versión o implementación de libpq.

**Búsqueda** capabilities; Comprobar disponibilidad de pipeline; libpq y API de bajo nivel

**Para recordar** Comprobar capacidades en vez de asumir que todos los entornos tienen las mismas.

#### Comprobar disponibilidad de pipeline

```python
print(psycopg.capabilities.has_pipeline())
```

Comprobar capacidades en vez de asumir que todos los entornos tienen las mismas.

**Resultado esperado** `True` o `False` según libpq y la implementación instalada.

## Migración y compatibilidad especializada

**Clave** `migracion-y-compatibilidad-especializada`

### Definición

**Clave** `definicion`

**Definición** Psycopg 3 y Psycopg 2 comparten la idea de conexión y cursor, pero tienen diferencias relevantes de ciclo de vida, adaptación y protocolo.

**Búsqueda** Definición; Comprobar la versión principal; Migración y compatibilidad especializada

**Para recordar** Migrar por comportamiento, no solo por nombres de métodos.

#### Comprobar la versión principal

```python
print(psycopg.__version__.split('.')[0])
```

Migrar por comportamiento, no solo por nombres de métodos.

**Resultado esperado** `3`.

### Contextos y binding al migrar

**Clave** `contextos-y-binding-al-migrar`

**Definición** En Psycopg 3, el contexto de conexión cierra la sesión al salir, y los parámetros suelen vincularse en servidor. En Psycopg 2, el contexto de conexión no cerraba la sesión de esa forma.

**Búsqueda** Contextos y binding al migrar; Verificar el cierre al salir de with; Migración y compatibilidad especializada

**Para recordar** Revisar código que reutiliza conexiones fuera de with o usa múltiples SQL parametrizados.

#### Verificar el cierre al salir de with

```python
with psycopg.connect(DSN) as c:
    print(c.execute("SELECT 1").fetchone())
print(c.closed)
```

Revisar código que reutiliza conexiones fuera de with o usa múltiples SQL parametrizados.

**Resultado esperado** `(1,)` y `True`.

### callproc y procedimientos

**Clave** `callproc-y-procedimientos`

**Definición** Psycopg 3 no ofrece el método callproc de Psycopg 2. Se usa SQL: SELECT para funciones y CALL para procedimientos.

**Búsqueda** callproc y procedimientos; Invocar una función integrada; Migración y compatibilidad especializada

**Para recordar** El objeto de PostgreSQL determina si corresponde SELECT o CALL.

**Nota** Para un procedimiento existente: `cur.execute("CALL mi_procedimiento(%s)", (valor,))`; sus permisos y transacciones dependen de la definición.

#### Invocar una función integrada

```python
cur.execute("SELECT upper(%s)", ("ventas",))
print(cur.fetchone())
```

El objeto de PostgreSQL determina si corresponde SELECT o CALL.

**Resultado esperado** `('VENTAS',)`.

### Fechas infinitas y cambios de adaptación

**Clave** `fechas-infinitas-y-cambios-de-adaptacion`

**Definición** PostgreSQL admite fechas fuera del rango de datetime y valores infinity. La conversión predeterminada de Psycopg 3 no los representa automáticamente como fechas Python finitas.

**Búsqueda** Fechas infinitas y cambios de adaptación; Leer una fecha infinita como texto; Migración y compatibilidad especializada

**Para recordar** Definir explícitamente una política para fechas especiales.

**Nota** Leer directamente como date puede producir DataError; un loader personalizado puede implementar una política distinta.

#### Leer una fecha infinita como texto

```python
cur.execute("SELECT 'infinity'::date::text")
print(cur.fetchone())
```

Definir explícitamente una política para fechas especiales.

**Resultado esperado** `('infinity',)`.

### CockroachDB y crdb

**Clave** `cockroachdb-y-crdb`

**Definición** `psycopg.crdb` ofrece clases de conexión y ajustes específicos para CockroachDB, que implementa parte del protocolo PostgreSQL.

**Búsqueda** CockroachDB y crdb; Importar el adaptador de CockroachDB; Migración y compatibilidad especializada

**Para recordar** No asumir compatibilidad completa con PostgreSQL.

**Nota** Para consultar CockroachDB se requiere un servidor y DSN propios y revisar diferencias de funciones, tipos y transacciones. El dataset anterior se diseñó para PostgreSQL.

#### Importar el adaptador de CockroachDB

```python
from psycopg.crdb import connect
print(callable(connect))
```

No asumir compatibilidad completa con PostgreSQL.

**Resultado esperado** `True` si el módulo está disponible.

### Resolución DNS y varios hosts

**Clave** `resolucion-dns-y-varios-hosts`

**Definición** libpq admite varias direcciones y hosts en conninfo. Psycopg también ofrece utilidades de resolución DNS para integraciones especializadas.

**Búsqueda** Resolución DNS y varios hosts; Construir una configuración con hosts alternativos; Migración y compatibilidad especializada

**Para recordar** El módulo `_dns` tiene nombre interno; no depender de él en código de aplicación salvo API documentada y versión fijada.

**Nota** Para producción utilizar hosts reales y, si procede, target_session_attrs. Las funciones de resolución SRV requieren revisar la API y dependencias opcionales documentadas.

#### Construir una configuración con hosts alternativos

```python
from psycopg.conninfo import make_conninfo, conninfo_to_dict
d = make_conninfo("", host="db1.example,db2.example", port="5432,5432")
print(conninfo_to_dict(d)["host"])
```

El módulo `_dns` tiene nombre interno; no depender de él en código de aplicación salvo API documentada y versión fijada.

**Resultado esperado** `db1.example,db2.example`; no realiza DNS ni conexión.

## Integración con análisis de datos

**Clave** `integracion-con-analisis-de-datos`

### Definición

**Clave** `definicion`

**Definición** Psycopg puede recuperar datos para pandas, NumPy, exportaciones y procesos ETL. La conexión y las transacciones se siguen gestionando en el controlador o en SQLAlchemy.

**Búsqueda** Definición; Construir un DataFrame con el resumen SQL; Integración con análisis de datos

**Para recordar** Extraer solo las columnas y filas necesarias.

**Nota** Requiere pandas instalado; no se debe pasar un objeto Psycopg directamente a read_sql como si estuviera soportado universalmente por pandas.

#### Construir un DataFrame con el resumen SQL

```python
import pandas as pd
cur.execute("SELECT estado, COUNT(*) AS total FROM pedidos GROUP BY estado ORDER BY estado")
df = pd.DataFrame(cur.fetchall(), columns=[c.name for c in cur.description])
print(df)
```

Extraer solo las columnas y filas necesarias.

**Resultado esperado** Dos filas: `cancelled, 1` y `completed, 4`; columnas `estado`, `total`.

### pandas con row_factory

**Clave** `pandas-con-row-factory`

**Definición** Las filas tipo diccionario pueden convertirse a DataFrame sin obtener los nombres de columnas por separado.

**Búsqueda** pandas con row_factory; Transformar clientes en DataFrame; Integración con análisis de datos

**Para recordar** Si no hay filas, indicar columns explícitamente para conservar el esquema esperado.

#### Transformar clientes en DataFrame

```python
import pandas as pd
from psycopg.rows import dict_row
with conn.cursor(row_factory=dict_row) as c:
    filas = c.execute("SELECT id,nombre FROM clientes ORDER BY id").fetchall()
df = pd.DataFrame(filas, columns=["id","nombre"])
print(df.shape)
```

Si no hay filas, indicar columns explícitamente para conservar el esquema esperado.

**Resultado esperado** `(4, 2)`.

### SQLAlchemy y pandas.read_sql

**Clave** `sqlalchemy-y-pandas-read-sql`

**Definición** SQLAlchemy proporciona el dialecto `postgresql+psycopg`; pandas puede usar su engine o conexión para consultar SQL.

**Búsqueda** SQLAlchemy y pandas.read_sql; Leer una consulta parametrizada con SQLAlchemy; Integración con análisis de datos

**Para recordar** SQLAlchemy y pandas no forman parte de Psycopg.

**Nota** Instalar pandas y SQLAlchemy 2.x. El estilo `:estado` corresponde a sqlalchemy.text(), no a cursor.execute de Psycopg.

#### Leer una consulta parametrizada con SQLAlchemy

```python
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
# URL base de SQLAlchemy; Psycopg usa DSN para establecer cada conexión.
engine = create_engine(URL.create("postgresql+psycopg"), creator=lambda: psycopg.connect(DSN))
try:
    with engine.connect() as c:
        df = pd.read_sql(text("SELECT id FROM pedidos WHERE estado=:estado ORDER BY id"), c, params={"estado":"completed"})
        print(df["id"].tolist())
finally:
    engine.dispose()
```

SQLAlchemy y pandas no forman parte de Psycopg.

**Resultado esperado** `[101, 102, 103, 105]`.

### CSV y exportación de resultados

**Clave** `csv-y-exportacion-de-resultados`

**Definición** Se pueden exportar filas a CSV con csv.writer o COPY. Para resultados pequeños, recuperar columnas y registros desde el cursor es suficiente.

**Búsqueda** CSV y exportación de resultados; Crear un CSV de clientes en memoria; Integración con análisis de datos

**Para recordar** CSV no conserva automáticamente tipos ni diferencia siempre NULL de texto vacío.

#### Crear un CSV de clientes en memoria

```python
import csv
from io import StringIO
cur.execute("SELECT id,nombre FROM clientes ORDER BY id")
archivo = StringIO(newline="")
writer = csv.writer(archivo)
writer.writerow([col.name for col in cur.description])
writer.writerows(cur)
print(archivo.getvalue())
```

CSV no conserva automáticamente tipos ni diferencia siempre NULL de texto vacío.

**Resultado esperado** Encabezado `id,nombre` seguido de cuatro filas con Ana, Luis, Marta y Diego.

### Excel y JSON

**Clave** `excel-y-json`

**Definición** Pandas puede exportar resultados a Excel o JSON; la biblioteca estándar json también permite serializar objetos compatibles.

**Búsqueda** Excel y JSON; Exportar los clientes en JSON; Integración con análisis de datos

**Para recordar** Decimal y fechas necesitan una política explícita de conversión.

**Nota** Para Excel: convertir a DataFrame y usar `to_excel(..., index=False)` con openpyxl u otro motor compatible; no convertir importes a float sin revisar precisión.

#### Exportar los clientes en JSON

```python
import json
from psycopg.rows import dict_row
with conn.cursor(row_factory=dict_row) as c:
    datos = c.execute("SELECT id,nombre FROM clientes ORDER BY id LIMIT 2").fetchall()
print(json.dumps(datos, ensure_ascii=False))
```

Decimal y fechas necesitan una política explícita de conversión.

**Resultado esperado** `[{"id": 1, "nombre": "Ana"}, {"id": 2, "nombre": "Luis"}]`.

### NumPy y procesamiento numérico

**Clave** `numpy-y-procesamiento-numerico`

**Definición** Las filas numéricas pueden transformarse en arrays de NumPy cuando el tipo y la precisión elegidos lo permitan.

**Búsqueda** NumPy y procesamiento numérico; Analizar importes enteros de ejemplo; Integración con análisis de datos

**Para recordar** Un array NumPy no es lo mismo que un ARRAY PostgreSQL.

**Nota** El cast a int se usa solo porque los importes de este dataset son enteros exactos. No aplicarlo a datos monetarios arbitrarios.

#### Analizar importes enteros de ejemplo

```python
import numpy as np
cur.execute("SELECT importe::int FROM pedidos ORDER BY id")
valores = np.array([fila[0] for fila in cur], dtype=np.int64)
print(valores.sum(), valores.max())
```

Un array NumPy no es lo mismo que un ARRAY PostgreSQL.

**Resultado esperado** `2300 800`.

### ETL y validación

**Clave** `etl-y-validacion`

**Definición** Un flujo ETL extrae, transforma y carga datos. Antes de escribir, conviene validar campos, claves, tipos y duplicados.

**Búsqueda** ETL y validación; Deduplicar un lote antes de cargar; Integración con análisis de datos

**Para recordar** El controlador ejecuta la carga; las reglas de calidad se deciden según el negocio.

**Nota** Si un mismo ID contiene datos contradictorios, definir una regla de resolución en lugar de descartar registros sin revisión.

#### Deduplicar un lote antes de cargar

```python
lote = [(9,"Eva"),(9,"Eva"),(10,"Leo")]
unicos = list(dict.fromkeys(lote))
cur.execute("CREATE TEMP TABLE etl_clientes (id int PRIMARY KEY, nombre text)")
cur.executemany("INSERT INTO etl_clientes VALUES (%s,%s)", unicos)
print(cur.execute("SELECT COUNT(*) FROM etl_clientes").fetchone())
```

El controlador ejecuta la carga; las reglas de calidad se deciden según el negocio.

**Resultado esperado** `(2,)`.

### Automatización de reportes

**Clave** `automatizacion-de-reportes`

**Definición** Un reporte repetible parametriza sus filtros, consulta datos, valida el resultado y exporta el resumen.

**Búsqueda** Automatización de reportes; Obtener ingresos de un mes con intervalo semiabierto; Integración con análisis de datos

**Para recordar** Separar credenciales, SQL, transformación y presentación.

**Nota** Para automatizar, envolver en una función y programar su ejecución externamente; no incluir secretos en el reporte.

#### Obtener ingresos de un mes con intervalo semiabierto

```python
from datetime import date
inicio, fin = date(2026,1,1), date(2026,2,1)
cur.execute("""SELECT COUNT(*), SUM(importe) FROM pedidos
WHERE estado=%s AND fecha >= %s AND fecha < %s""", ("completed",inicio,fin))
print(cur.fetchone())
```

Separar credenciales, SQL, transformación y presentación.

**Resultado esperado** `(3, Decimal('1500.00'))`.

## Fuentes

Documentación oficial de referencia para las reglas y APIs de cada grupo. Las páginas del manual pueden mostrar una versión de desarrollo; los ejemplos se orientan a la serie estable 3.3.x y se indican los requisitos especiales.

- [Psycopg 3: documentación principal](https://www.psycopg.org/psycopg3/docs/) — alcance, navegación y notas de versiones.
- [Installation](https://www.psycopg.org/psycopg3/docs/basic/install.html) — variantes binary, c, Python puro, dependencias y pool.
- [The psycopg module](https://www.psycopg.org/psycopg3/docs/api/module.html) — connect, capabilities, adapters, atributos DB-API.
- [Basic module usage](https://www.psycopg.org/psycopg3/docs/basic/usage.html) — ciclo de vida, conexiones, cursores y logging.
- [Passing parameters to SQL queries](https://www.psycopg.org/psycopg3/docs/basic/params.html) — marcadores, formatos, seguridad y parámetros.
- [Template string queries](https://www.psycopg.org/psycopg3/docs/basic/tstrings.html) — Python 3.14 y Psycopg 3.3.
- [SQL string composition](https://www.psycopg.org/psycopg3/docs/api/sql.html) — SQL, Identifier, Literal, Placeholder, Composed.
- [Connection classes](https://www.psycopg.org/psycopg3/docs/api/connections.html) — atributos, transacciones, TPC, cancelación, avisos y async.
- [Cursor classes](https://www.psycopg.org/psycopg3/docs/api/cursors.html) — execute, fetch, nextset, metadatos y clases de cursor.
- [Cursor types](https://www.psycopg.org/psycopg3/docs/advanced/cursors.html) — binding, cursores de cliente y servidor.
- [Transaction management](https://www.psycopg.org/psycopg3/docs/basic/transactions.html) — autocommit, transacciones implícitas, savepoints.
- [Package exceptions](https://www.psycopg.org/psycopg3/docs/api/errors.html) — jerarquía de errores, SQLSTATE y diagnósticos.
- [Adapting basic Python types](https://www.psycopg.org/psycopg3/docs/basic/adapt.html) — tipos básicos, NULL, Decimal, fechas, JSON y arreglos.
- [Adapting other PostgreSQL types](https://www.psycopg.org/psycopg3/docs/basic/pgtypes.html) — tipos específicos y registro.
- [Types information and adapters](https://www.psycopg.org/psycopg3/docs/api/types.html) — TypeInfo, rangos, compuestos y registradores.
- [Data adaptation configuration](https://www.psycopg.org/psycopg3/docs/advanced/adapt.html) y [adapt API](https://www.psycopg.org/psycopg3/docs/api/adapt.html) — dumpers, loaders, Transformer y registros.
- [Row factories](https://www.psycopg.org/psycopg3/docs/api/rows.html) — tuplas, diccionarios, clases y fábricas personalizadas.
- [Using COPY TO and COPY FROM](https://www.psycopg.org/psycopg3/docs/basic/copy.html) y [COPY objects](https://www.psycopg.org/psycopg3/docs/api/copy.html) — formatos, flujos, writers y tipos.
- [Connection pools](https://www.psycopg.org/psycopg3/docs/advanced/pool.html) y [Pool API](https://www.psycopg.org/psycopg3/docs/api/pool.html) — ciclo de vida, callbacks, estadísticas y excepciones.
- [Concurrent operations](https://www.psycopg.org/psycopg3/docs/advanced/async.html) — hilos, procesos, async, gevent, notificaciones y cancelación.
- [Prepared statements](https://www.psycopg.org/psycopg3/docs/advanced/prepare.html) — preparación y compatibilidad con proxies.
- [Pipeline mode](https://www.psycopg.org/psycopg3/docs/advanced/pipeline.html) — sincronización, requisitos y errores.
- [Connection strings](https://www.psycopg.org/psycopg3/docs/api/conninfo.html) — make_conninfo y conninfo_to_dict.
- [Static typing](https://www.psycopg.org/psycopg3/docs/advanced/typing.html) y [Abstract classes](https://www.psycopg.org/psycopg3/docs/api/abc.html) — genéricos, protocolos y tipos de filas.
- [libpq wrapper](https://www.psycopg.org/psycopg3/docs/api/pq.html) — objetos y enumeraciones de bajo nivel.
- [Differences from psycopg2](https://www.psycopg.org/psycopg3/docs/basic/from_pg2.html) — migración, binding, contextos, tipos y procedimientos.
- [CockroachDB support](https://www.psycopg.org/psycopg3/docs/api/crdb.html) y [DNS resolution utilities](https://www.psycopg.org/psycopg3/docs/api/dns.html) — compatibilidad especializada.
- [PostgreSQL: connection parameters](https://www.postgresql.org/docs/current/libpq-connect.html) y [SSL support](https://www.postgresql.org/docs/current/libpq-ssl.html) — conninfo, TLS, timeouts de conexión y hosts.
- [PostgreSQL: client connection defaults](https://www.postgresql.org/docs/current/runtime-config-client.html) — statement_timeout, lock_timeout, search_path y parámetros de sesión.
- [Python DB-API 2.0, PEP 249](https://peps.python.org/pep-0249/) — contrato de conexiones, cursores y excepciones.
- [SQLAlchemy: PostgreSQL](https://docs.sqlalchemy.org/en/20/dialects/postgresql.html#module-sqlalchemy.dialects.postgresql.psycopg) — dialecto postgresql+psycopg.
- [pandas.read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html) y [DataFrame](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html) — lectura e integración analítica.
- [NumPy array](https://numpy.org/doc/stable/reference/generated/numpy.array.html) — conversión a arrays numéricos.
