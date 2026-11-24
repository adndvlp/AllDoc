# MySQL Connector/Python

**Clave** `mysql-connector-python`

**Área** Análisis de datos · Python (ubicación propuesta en AllDoc)

**Resumen** Conecta Python con MySQL para consultar, transformar y cargar datos de manera segura.

**Alcance** Instalación, conexión, cursores, consultas, parámetros, escritura, transacciones, tipos, errores, sesiones, seguridad, rendimiento, concurrencia, integración analítica, ETL y API especializada. Incluye el temario acordado; no pretende reproducir cada método privado del paquete.

**Entorno** Python 3.11+, MySQL Server 8.4 LTS, `mysql-connector-python` 9.4 o posterior de la serie 9.x. Los ejemplos usan la API clásica (`mysql.connector`), no X DevAPI. MySQL Workbench es opcional: sirve para preparar la base; Python se ejecuta fuera de Workbench. Se requiere un servidor MySQL real y permisos adecuados. Los resultados son esperados, no ejecuciones verificadas contra un servidor. Los ejemplos de integración requieren sus bibliotecas adicionales.

## Datos compartidos

Prepara una base de laboratorio nueva en Workbench o el cliente MySQL. No uses una base de producción. Ejecuta este SQL una vez (si la base ya existe, usa otro nombre y actualiza la configuración). Todas las fichas de lectura usan estos datos iniciales; las de escritura usan tablas temporales propias o revierten cambios, salvo donde se indica otro estado.

```sql
CREATE DATABASE alldoc_connector_lab CHARACTER SET utf8mb4;
USE alldoc_connector_lab;
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    country VARCHAR(40),
    signup_date DATE NOT NULL
) ENGINE=InnoDB;
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE=InnoDB;
INSERT INTO customers VALUES
(1,'Ana','Mexico','2026-01-01'),
(2,'Luis','Mexico','2026-01-05'),
(3,'Marta','Spain','2026-01-10'),
(4,'Diego',NULL,'2026-01-12');
INSERT INTO orders VALUES
(101,1,800.00,'2026-02-01','completed'),
(102,1,300.00,'2026-02-03','completed'),
(103,2,1200.00,'2026-02-04','completed'),
(104,2,250.00,'2026-02-05','cancelled'),
(105,3,450.00,'2026-03-01','completed');
```

Instala el paquete en el entorno de Python:

```bash
python -m pip install mysql-connector-python
```

Configura las variables de entorno `MYSQL_HOST` (por defecto 127.0.0.1), `MYSQL_PORT` (3306), `MYSQL_USER` y `MYSQL_PASSWORD` con tu cuenta de laboratorio. No copies credenciales reales a los apuntes. Guarda el siguiente archivo como `lab_mysql.py` al lado de los ejemplos. En cada sesión de práctica importa `abrir`; las fichas que usan otras bibliotecas importan lo necesario en su propio código.

```python
import os
import mysql.connector
from decimal import Decimal
from datetime import date, datetime, timedelta

CONFIG = {
    "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.getenv("MYSQL_PORT", "3306")),
    "user": os.environ["MYSQL_USER"],
    "password": os.environ["MYSQL_PASSWORD"],
    "database": "alldoc_connector_lab",
    "autocommit": False,
    "allow_local_infile": False,
}

def abrir(**opciones):
    return mysql.connector.connect(**(CONFIG | opciones))
```

```python
from lab_mysql import abrir, CONFIG
import mysql.connector
from decimal import Decimal
from datetime import date, datetime, timedelta
```

Ejecuta ese bloque de importaciones antes de cada ejemplo Python (excepto la instalación). `abrir()` devuelve una conexión nueva. En los ejemplos, `cnx` es la conexión y `cur` es el cursor. Se usa `with` para cerrarlos; el cierre no sustituye `commit()`. Los cursores de lectura se crean con `buffered=True` para ejemplos pequeños; la ficha de cursores explica cómo procesar grandes resultados sin búfer. `Decimal('800.00')` representa un importe exacto. Los ejemplos con `CREATE TEMPORARY TABLE` requieren permiso para tablas temporales y no dejan tablas persistentes al cerrar la conexión. Los ejemplos de TLS, procedimientos, failover y telemetría declaran sus requisitos propios.

## Instalación y DB-API

**Clave** `instalacion-y-db-api`

### Definición

**Clave** `definicion`

**Definición** El controlador comunica Python con MySQL mediante la API de bases de datos DB-API 2.0. SQL se ejecuta en el servidor, no en Python.

**Búsqueda** mysql connector python, driver, DB-API

**Para recordar** El paquete se instala con guiones y se importa con puntos.

#### Comprobar que está instalado

```python
import mysql.connector
print(mysql.connector.__version__)
```

**Resultado esperado** La versión instalada del conector.

### Instalación

**Clave** `instalacion`

**Definición** Instala el controlador en el mismo entorno que ejecutará el script.

**Búsqueda** pip install, dependencia, entorno virtual

**Para recordar** Usa python -m pip para seleccionar el intérprete.

#### Instalar y consultar el paquete

```bash
python -m pip install mysql-connector-python
python -m pip show mysql-connector-python
```

**Resultado esperado** Información del paquete instalado.

### DB-API 2.0

**Clave** `db-api-2-0`

**Definición** Las constantes describen la interfaz y sus límites.

**Búsqueda** PEP 249, apilevel, paramstyle, threadsafety

**Para recordar** threadsafety 1 permite compartir el módulo, no una conexión entre hilos.

#### Consultar capacidades

```python
print(mysql.connector.apilevel)
print(mysql.connector.paramstyle)
print(mysql.connector.threadsafety)
```

**Resultado esperado** 2.0, pyformat, 1 (en líneas separadas).

### Python puro y extensión C

**Clave** `python-puro-y-extension-c`

**Definición** use_pure elige la implementación Python o C cuando está disponible.

**Búsqueda** use_pure, HAVE_CEXT

**Para recordar** El comportamiento público es similar; mide antes de elegir.

#### Abrir usando Python puro

```python
with abrir(use_pure=True) as cnx:
    print(type(cnx).__name__)
```

**Resultado esperado** MySQLConnection.

## Conexión

**Clave** `conexion`

### Definición

**Clave** `definicion`

**Definición** connect() abre una sesión autenticada con el servidor y devuelve una conexión.

**Búsqueda** connect, conexión, host

**Para recordar** La conexión representa la sesión; el cursor ejecuta instrucciones.

#### Abrir una sesión

```python
with mysql.connector.connect(**CONFIG) as cnx:
    print(cnx.database)
```

**Resultado esperado** alldoc_connector_lab.

### Argumentos de conexión

**Clave** `argumentos-de-conexion`

**Definición** host y port localizan el servidor; user y password autentican; database selecciona el esquema.

**Búsqueda** host, port, user, password, database

**Para recordar** Una base existente debe estar accesible para la cuenta.

#### Configurar el destino

```python
with abrir(host="127.0.0.1", port=3306) as cnx:
    print(cnx.database)
```

**Resultado esperado** alldoc_connector_lab si el servidor local está disponible.

### Diccionario y kwargs

**Clave** `diccionario-y-kwargs`

**Definición** ** desempaqueta un diccionario en argumentos nombrados.

**Búsqueda** config, kwargs, diccionario

**Para recordar** Centraliza parámetros y cambia solo lo necesario.

#### Modificar una opción de conexión

```python
opciones = CONFIG | {"connection_timeout": 5}
with mysql.connector.connect(**opciones) as cnx:
    print(cnx.database)
```

**Resultado esperado** alldoc_connector_lab.

### Variables de entorno

**Clave** `variables-de-entorno`

**Definición** Lee credenciales de fuera del código para no incrustarlas en repositorios.

**Búsqueda** os.getenv, .env, password, secretos

**Para recordar** No imprimas ni registres contraseñas.

**Nota** Un archivo .env requiere cargarlo explícitamente, por ejemplo con python-dotenv; no es automático.

#### Verificar la presencia de credenciales

```python
import os
print("MYSQL_USER" in os.environ, "MYSQL_PASSWORD" in os.environ)
```

**Resultado esperado** True True con la preparación indicada.

### database y connection_id

**Clave** `database-y-connection-id`

**Definición** database identifica el esquema activo y connection_id identifica la sesión en el servidor.

**Búsqueda** base activa, id sesión, server_info

**Para recordar** Cada conexión tiene su propia sesión.

#### Consultar la identidad de una sesión

```python
with abrir() as cnx:
    print(cnx.database, cnx.connection_id, cnx.server_info)
```

**Resultado esperado** Nombre de base, identificador numérico y versión del servidor.

### Cerrar y liberar

**Clave** `cerrar-y-liberar`

**Definición** close() o disconnect() terminan una conexión normal. Cierra el cursor antes.

**Búsqueda** close, disconnect, recursos

**Para recordar** Cerrar no confirma escrituras pendientes.

#### Cerrar explícitamente

```python
cnx = abrir()
cur = cnx.cursor()
try:
    cur.execute("SELECT 1")
    print(cur.fetchall())
finally:
    cur.close()
    cnx.close()
```

**Resultado esperado** [(1,)] y recursos liberados.

### Context managers

**Clave** `context-managers`

**Definición** with ejecuta el cierre al salir del bloque, incluso ante excepciones.

**Búsqueda** with, context manager, cierre

**Para recordar** Usa commit explícito si quieres conservar cambios.

#### Limitar el alcance de los recursos

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT 1")
    print(cur.fetchall())
```

**Resultado esperado** [(1,)] y cierre automático.

## Cursores

**Clave** `cursores`

### Definición

**Clave** `definicion`

**Definición** cursor() crea un objeto para enviar SQL y leer el resultado de una sesión.

**Búsqueda** cursor, objeto cursor

**Para recordar** El cursor no es una conexión independiente.

#### Consultar un cliente

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE customer_id = 1")
    print(cur.fetchone())
```

**Resultado esperado** ('Ana',).

### Cursor normal

**Clave** `cursor-normal`

**Definición** Un cursor normal devuelve filas como tuplas con el orden de columnas del SELECT.

**Búsqueda** tuple, cursor normal

**Para recordar** Una fila de una columna sigue siendo una tupla.

#### Leer dos columnas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT customer_id, name FROM customers ORDER BY customer_id LIMIT 2")
    print(cur.fetchall())
```

**Resultado esperado** [(1, 'Ana'), (2, 'Luis')].

### dictionary=True

**Clave** `dictionary-true`

**Definición** Devuelve diccionarios cuyas claves son los nombres o alias de columnas.

**Búsqueda** dictionary cursor, dict

**Para recordar** Usa alias únicos cuando haya columnas homónimas.

#### Leer por nombre de columna

```python
with abrir() as cnx, cnx.cursor(dictionary=True) as cur:
    cur.execute("SELECT name FROM customers WHERE customer_id=1")
    print(cur.fetchone()["name"])
```

**Resultado esperado** Ana.

### buffered=True

**Clave** `buffered-true`

**Definición** Recibe el conjunto de resultados completo al ejecutar la consulta.

**Búsqueda** buffered, prefetch, memoria

**Para recordar** Adecuado para resultados pequeños; consume memoria proporcional a las filas.

#### Ejecutar otra consulta sin leer la primera

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers")
    cur.execute("SELECT COUNT(*) FROM customers")
    print(cur.fetchone())
```

**Resultado esperado** (4,).

### Cursor sin búfer

**Clave** `cursor-sin-bufer`

**Definición** Lee las filas a medida que se solicitan; es el comportamiento por defecto.

**Búsqueda** unbuffered, streaming, unread result

**Para recordar** Consume todo el resultado antes de otra operación en la misma conexión.

#### Procesar filas sin precargarlas

```python
with abrir() as cnx, cnx.cursor(buffered=False) as cur:
    cur.execute("SELECT name FROM customers ORDER BY customer_id")
    for row in cur:
        print(row[0])
```

**Resultado esperado** Ana, Luis, Marta y Diego, una línea por cliente.

### raw=True

**Clave** `raw-true`

**Definición** Evita la conversión normal de valores del servidor a tipos Python.

**Búsqueda** raw cursor, bytes

**Para recordar** Úsalo cuando quieras controlar la conversión.

#### Obtener el valor sin convertir

```python
with abrir(use_pure=True) as cnx, cnx.cursor(raw=True) as cur:
    cur.execute("SELECT 800")
    print(cur.fetchone())
```

**Resultado esperado** (b'800',).

### prepared=True

**Clave** `prepared-true`

**Definición** Usa sentencias preparadas por el servidor mediante el protocolo binario.

**Búsqueda** prepared cursor, statement preparado

**Para recordar** Usa parámetros para los valores; no combines arbitrariamente opciones de cursor.

#### Reutilizar una consulta preparada

```python
with abrir() as cnx, cnx.cursor(prepared=True) as cur:
    sql = "SELECT name FROM customers WHERE customer_id=%s"
    for key in (1, 2):
        cur.execute(sql, (key,))
        print(cur.fetchall())
```

**Resultado esperado** [('Ana',)] y [('Luis',)].

## execute y consultas SQL

**Clave** `execute-y-consultas-sql`

### Definición

**Clave** `definicion`

**Definición** execute() envía una instrucción SQL; las filas se recuperan después con fetch.

**Búsqueda** execute, query, SQL

**Para recordar** execute no devuelve la lista de filas.

#### Ejecutar un SELECT

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT COUNT(*) FROM orders")
    print(cur.fetchone())
```

**Resultado esperado** (5,).

### Filtros y orden

**Clave** `filtros-y-orden`

**Definición** La instrucción SQL usa WHERE, ORDER BY y LIMIT igual que en el cliente MySQL.

**Búsqueda** where, order by, limit

**Para recordar** Python envía SQL; MySQL resuelve la consulta.

#### Obtener el pedido completado más caro

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT order_id FROM orders WHERE status='completed' ORDER BY amount DESC LIMIT 1")
    print(cur.fetchone())
```

**Resultado esperado** (103,).

### JOIN y agregaciones

**Clave** `join-y-agregaciones`

**Definición** Puedes combinar tablas y calcular métricas antes de transferir las filas a Python.

**Búsqueda** join, group by, sum

**Para recordar** Agrega en SQL cuando solo necesitas el resumen.

#### Calcular ventas por cliente

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("""SELECT c.name, SUM(o.amount) FROM customers c
    JOIN orders o ON c.customer_id=o.customer_id
    WHERE o.status='completed' GROUP BY c.customer_id,c.name
    ORDER BY c.customer_id""")
    print(cur.fetchall())
```

**Resultado esperado** Ana 1100.00, Luis 1200.00, Marta 450.00 (importes Decimal).

### CTE y ventanas

**Clave** `cte-y-ventanas`

**Definición** Las consultas analíticas se envían completas al servidor si su versión admite la sintaxis.

**Búsqueda** with, cte, rank, window function

**Para recordar** El conector no implementa las funciones SQL.

#### Ordenar clientes por gasto

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("""WITH t AS (SELECT customer_id,SUM(amount) total FROM orders
    WHERE status='completed' GROUP BY customer_id)
    SELECT customer_id,RANK() OVER (ORDER BY total DESC) AS puesto FROM t
    ORDER BY puesto""")
    print(cur.fetchall())
```

**Resultado esperado** [(2, 1), (1, 2), (3, 3)].

## Parámetros y SQL dinámico

**Clave** `parametros-y-sql-dinamico`

### Definición

**Clave** `definicion`

**Definición** Los parámetros transmiten valores separados de la plantilla SQL; el controlador se ocupa de adaptarlos.

**Búsqueda** parameterized query, placeholders, SQL injection

**Para recordar** No interpoles valores con f-strings ni concatenación.

#### Filtrar por un valor Python

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE customer_id=%s", (1,))
    print(cur.fetchone())
```

**Resultado esperado** ('Ana',).

### Parámetros posicionales

**Clave** `parametros-posicionales`

**Definición** %s marca un valor, sin importar si es número o texto.

**Búsqueda** %s, tupla, posición

**Para recordar** No pongas comillas alrededor de %s; una tupla individual lleva coma.

#### Filtrar por estado y monto

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT order_id FROM orders WHERE status=%s AND amount>%s ORDER BY order_id", ("completed",500))
    print(cur.fetchall())
```

**Resultado esperado** [(101,), (103,)].

### Parámetros nombrados

**Clave** `parametros-nombrados`

**Definición** %(nombre)s permite asociar valores mediante un diccionario en cursores normales.

**Búsqueda** pyformat, dict, parámetros nombrados

**Para recordar** La clave del diccionario coincide con el marcador.

#### Buscar por país

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE country=%(pais)s ORDER BY customer_id", {"pais":"Mexico"})
    print(cur.fetchall())
```

**Resultado esperado** [('Ana',), ('Luis',)].

### None y NULL

**Clave** `none-y-null`

**Definición** None se transmite como SQL NULL; para buscar nulos se usa IS NULL o comparación null-safe.

**Búsqueda** None, NULL, IS NULL, <=>

**Para recordar** WHERE col = NULL no encuentra nulos.

#### Buscar un país nulo

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE country <=> %s", (None,))
    print(cur.fetchone())
```

**Resultado esperado** ('Diego',).

### IN dinámico

**Clave** `in-dinamico`

**Definición** Genera un marcador por valor; los valores siguen separados del SQL.

**Búsqueda** IN, placeholders, lista vacía

**Para recordar** Trata la lista vacía antes de construir IN ().

**Nota** Solo se interpola una secuencia de marcadores generada por el programa.

#### Buscar varios clientes

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    ids = [1, 3]
    markers = ",".join(["%s"] * len(ids))
    cur.execute(f"SELECT name FROM customers WHERE customer_id IN ({markers}) ORDER BY customer_id", tuple(ids))
    print(cur.fetchall())
```

**Resultado esperado** [('Ana',), ('Marta',)].

### LIKE parametrizado

**Clave** `like-parametrizado`

**Definición** El patrón se envía como valor; % y _ conservan su semántica SQL.

**Búsqueda** like, comodín, búsqueda

**Para recordar** Construye el patrón en Python y pásalo como parámetro.

#### Buscar nombres con M inicial

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE name LIKE %s", ("M%",))
    print(cur.fetchall())
```

**Resultado esperado** [('Marta',)].

### Identificadores dinámicos

**Clave** `identificadores-dinamicos`

**Definición** Los parámetros representan datos, no nombres de tablas, columnas ni palabras SQL.

**Búsqueda** order by dinámico, whitelist, identifiers

**Para recordar** Valida los identificadores contra una lista cerrada.

#### Elegir una columna de orden segura

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    permitidas = {"name", "customer_id"}
    col = "name"
    if col not in permitidas:
        raise ValueError("Columna no permitida")
    cur.execute(f"SELECT name FROM customers ORDER BY {col}")
    print(cur.fetchall())
```

**Resultado esperado** Ana, Diego, Luis, Marta.

### Filtros opcionales

**Clave** `filtros-opcionales`

**Definición** Construye condiciones a partir de reglas conocidas y acumula sus parámetros.

**Búsqueda** query builder, filtros opcionales

**Para recordar** Los fragmentos SQL son del programa; los valores son parámetros.

#### Aplicar un filtro si se proporciona

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    pais = "Spain"
    sql = "SELECT name FROM customers WHERE 1=1"
    params = []
    if pais is not None:
        sql += " AND country=%s"
        params.append(pais)
    cur.execute(sql, tuple(params))
    print(cur.fetchall())
```

**Resultado esperado** [('Marta',)].

### SQL injection

**Clave** `sql-injection`

**Definición** Un texto de usuario puede alterar una consulta concatenada; parametrizar evita que se interprete como código.

**Búsqueda** inyección SQL, seguridad, escape

**Para recordar** Nunca fabriques manualmente las comillas de los valores.

#### Tratar un texto con comillas como dato

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    texto = "Ana' OR 1=1 -- "
    cur.execute("SELECT name FROM customers WHERE name=%s", (texto,))
    print(cur.fetchall())
```

**Resultado esperado** []: no coincide ningún nombre.

## Lectura de resultados

**Clave** `lectura-de-resultados`

### Definición

**Clave** `definicion`

**Definición** fetchone, fetchmany y fetchall recuperan las filas que quedan pendientes en el cursor.

**Búsqueda** fetch, resultados

**Para recordar** Cada lectura avanza la posición del cursor.

#### Leer todas las filas de un resultado

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT customer_id FROM customers ORDER BY customer_id")
    print(cur.fetchall())
```

**Resultado esperado** [(1,), (2,), (3,), (4,)].

### fetchone()

**Clave** `fetchone`

**Definición** Devuelve la siguiente fila o None si no quedan filas.

**Búsqueda** fetchone, None

**Para recordar** Comprueba None antes de acceder a una posición.

#### Leer un resultado vacío

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers WHERE customer_id=99")
    print(cur.fetchone())
```

**Resultado esperado** None.

### fetchmany()

**Clave** `fetchmany`

**Definición** Devuelve hasta size filas pendientes; una lista vacía indica fin.

**Búsqueda** fetchmany, lotes

**Para recordar** No presupongas que el último lote tiene el tamaño pedido.

#### Leer en lotes de tres

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT customer_id FROM customers ORDER BY customer_id")
    print(cur.fetchmany(3))
    print(cur.fetchmany(3))
    print(cur.fetchmany(3))
```

**Resultado esperado** [(1,), (2,), (3,)], [(4,)], [].

### fetchall()

**Clave** `fetchall`

**Definición** Recupera todas las filas restantes, no las ya consumidas.

**Búsqueda** fetchall, cursor agotado

**Para recordar** Una segunda lectura no reinicia el resultado.

#### Leer lo que queda

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT customer_id FROM customers ORDER BY customer_id")
    print(cur.fetchone())
    print(cur.fetchall())
```

**Resultado esperado** (1,) y [(2,), (3,), (4,)].

### Iteración

**Clave** `iteracion`

**Definición** El cursor puede recorrerse con for para procesar cada fila.

**Búsqueda** for row in cursor, iteración

**Para recordar** En un cursor sin búfer evita acumular filas en una lista si no hace falta.

#### Procesar clientes uno a uno

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers ORDER BY customer_id")
    for (name,) in cur:
        print(name)
```

**Resultado esperado** Ana, Luis, Marta y Diego.

### Resultados pendientes

**Clave** `resultados-pendientes`

**Definición** Un cursor sin búfer puede impedir nuevas operaciones mientras quedan filas sin consumir.

**Búsqueda** Unread result found, unread_result, consume_results

**Para recordar** Consume resultados de todos los sets antes de reutilizar la conexión.

#### Consumir el resto antes de otra consulta

```python
with abrir() as cnx, cnx.cursor() as cur:
    cur.execute("SELECT customer_id FROM customers ORDER BY customer_id")
    print(cur.fetchone())
    cur.fetchall()
    cur.execute("SELECT 1")
    print(cur.fetchall())
```

**Resultado esperado** (1,) y [(1,)].

### Consumo automático

**Clave** `consumo-automatico`

**Definición** consume_results=True permite que el controlador descarte resultados pendientes cuando lo necesita.

**Búsqueda** consume_results, can_consume_results

**Para recordar** No actives descarte automático si todavía necesitas los datos.

#### Consultar la política de consumo

```python
with abrir(consume_results=True) as cnx:
    print(cnx.can_consume_results)
```

**Resultado esperado** True.

## Metadatos del cursor

**Clave** `metadatos-del-cursor`

### Definición

**Clave** `definicion`

**Definición** El cursor expone información sobre la instrucción y el resultado sin consultar cada fila.

**Búsqueda** metadata, cursor attributes

**Para recordar** Consulta los atributos después de execute.

#### Inspeccionar columnas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT customer_id, name FROM customers")
    print(cur.column_names)
```

**Resultado esperado** ('customer_id', 'name').

### description

**Clave** `description`

**Definición** Describe las columnas; el primer elemento de cada descriptor es su nombre y el segundo su código de tipo.

**Búsqueda** description, FieldType

**Para recordar** Es None si la operación no produce columnas.

#### Obtener encabezados

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name, amount FROM customers JOIN orders USING(customer_id)")
    print([d[0] for d in cur.description])
```

**Resultado esperado** ['name', 'amount'].

### rowcount

**Clave** `rowcount`

**Definición** Indica filas afectadas por DML o filas recuperadas por SELECT, según cursor y momento.

**Búsqueda** rowcount, affected rows

**Para recordar** En un cursor sin búfer puede ser -1 hasta empezar a leer; COUNT(*) es el conteo SQL.

#### Contar filas de un resultado buffered

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT * FROM customers")
    print(cur.rowcount)
```

**Resultado esperado** 4.

### lastrowid

**Clave** `lastrowid`

**Definición** Expone el identificador AUTO_INCREMENT generado por una inserción.

**Búsqueda** lastrowid, auto increment

**Para recordar** No es el número de filas ni una lista de todos los IDs.

#### Obtener un identificador generado

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_ids (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(40))")
    cur.execute("INSERT INTO lab_ids(name) VALUES (%s)", ("Ana",))
    print(cur.lastrowid)
```

**Resultado esperado** 1.

### with_rows y statement

**Clave** `with-rows-y-statement`

**Definición** with_rows indica si la operación puede devolver filas; statement muestra la instrucción ejecutada.

**Búsqueda** with_rows, statement

**Para recordar** No registres statement con datos sensibles.

#### Reconocer una consulta con filas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT 1")
    print(cur.with_rows, cur.statement)
```

**Resultado esperado** True SELECT 1.

## Escritura de datos

**Clave** `escritura-de-datos`

### Definición

**Clave** `definicion`

**Definición** INSERT, UPDATE y DELETE modifican filas. En InnoDB, con autocommit desactivado, requieren confirmar la transacción para persistir.

**Búsqueda** DML, insert, update, delete

**Para recordar** Comprueba filas afectadas y decide si confirmas.

#### Insertar una fila temporal

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))")
    cur.execute("INSERT INTO lab_write VALUES (%s,%s)", (1,"Ana"))
    print(cur.rowcount)
```

**Resultado esperado** 1 fila afectada; la tabla desaparece al cerrar.

### INSERT

**Clave** `insert`

**Definición** Introduce una fila con valores parametrizados.

**Búsqueda** insert into, values

**Para recordar** Especifica las columnas de destino.

#### Insertar una fila

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))")
    cur.execute("INSERT INTO lab_write(id,name) VALUES (%s,%s)", (1,"Ana"))
    cur.execute("SELECT * FROM lab_write")
    print(cur.fetchall())
```

**Resultado esperado** [(1, 'Ana')].

### UPDATE

**Clave** `update`

**Definición** Modifica las filas que cumplen WHERE.

**Búsqueda** update, set, where

**Para recordar** Sin WHERE puedes modificar toda la tabla.

#### Actualizar un cliente sin persistir el cambio

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("UPDATE customers SET country=%s WHERE customer_id=%s", ("Canada",1))
    print(cur.rowcount)
    cnx.rollback()
```

**Resultado esperado** 1; Ana conserva Mexico después del rollback.

### DELETE

**Clave** `delete`

**Definición** Elimina filas que cumplen WHERE.

**Búsqueda** delete, where

**Para recordar** Valida el filtro y las restricciones referenciales.

#### Eliminar un pedido y revertir

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("DELETE FROM orders WHERE order_id=%s", (104,))
    print(cur.rowcount)
    cnx.rollback()
```

**Resultado esperado** 1; el pedido 104 se conserva.

### executemany()

**Clave** `executemany`

**Definición** Ejecuta una operación para una secuencia de parámetros. Puede optimizar INSERT agrupando valores.

**Búsqueda** executemany, bulk insert

**Para recordar** No es para múltiples instrucciones distintas.

#### Insertar tres filas juntas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, name VARCHAR(40))")
    cur.executemany("INSERT INTO lab_write VALUES (%s,%s)", [(1,"Ana"),(2,"Luis"),(3,"Marta")])
    print(cur.rowcount)
```

**Resultado esperado** 3.

### UPSERT

**Clave** `upsert`

**Definición** ON DUPLICATE KEY UPDATE inserta o actualiza según una clave única.

**Búsqueda** upsert, duplicate key

**Para recordar** El conflicto lo define una restricción UNIQUE o PRIMARY KEY.

#### Actualizar sin duplicar una fila

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_write (id INT PRIMARY KEY, amount INT)")
    cur.execute("INSERT INTO lab_write VALUES (1,10)")
    cur.execute("INSERT INTO lab_write VALUES (%s,%s) ON DUPLICATE KEY UPDATE amount=%s", (1,20,20))
    cur.execute("SELECT * FROM lab_write")
    print(cur.fetchall())
```

**Resultado esperado** [(1, 20)].

### DDL

**Clave** `ddl`

**Definición** CREATE, ALTER y DROP cambian la estructura; muchas operaciones DDL realizan commits implícitos.

**Búsqueda** create table, alter table, drop table

**Para recordar** No confíes en rollback para revertir DDL ordinario.

#### Crear e inspeccionar una tabla temporal

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_ddl (id INT PRIMARY KEY)")
    cur.execute("SHOW COLUMNS FROM lab_ddl")
    print([r[0] for r in cur.fetchall()])
```

**Resultado esperado** ['id'].

## Transacciones

**Clave** `transacciones`

### Definición

**Clave** `definicion`

**Definición** Una transacción reúne operaciones que se confirman o revierten como unidad.

**Búsqueda** transaction, ACID, InnoDB

**Para recordar** commit conserva; rollback revierte DML no confirmado.

#### Revertir una actualización

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("UPDATE orders SET amount=1 WHERE order_id=101")
    cnx.rollback()
    cur.execute("SELECT amount FROM orders WHERE order_id=101")
    print(cur.fetchone())
```

**Resultado esperado** (Decimal('800.00'),).

### commit()

**Clave** `commit`

**Definición** Confirma los cambios pendientes de la sesión.

**Búsqueda** commit, persistencia

**Para recordar** Cerrar una conexión no es confirmar.

#### Confirmar una operación de laboratorio

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB")
    cur.execute("INSERT INTO lab_tx VALUES (1)")
    cnx.commit()
    cnx.rollback()
    cur.execute("SELECT * FROM lab_tx")
    print(cur.fetchall())
```

**Resultado esperado** [(1,)]; un rollback posterior no deshace lo confirmado. La tabla temporal se elimina al cerrar.

### rollback()

**Clave** `rollback`

**Definición** Revierte los cambios no confirmados de la transacción.

**Búsqueda** rollback, deshacer

**Para recordar** No revierte transacciones confirmadas.

#### Revertir una inserción

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB")
    cur.execute("INSERT INTO lab_tx VALUES (1)")
    cnx.rollback()
    cur.execute("SELECT COUNT(*) FROM lab_tx")
    print(cur.fetchone())
```

**Resultado esperado** (0,).

### autocommit

**Clave** `autocommit`

**Definición** Con autocommit=True cada instrucción independiente se confirma automáticamente, salvo una transacción explícita.

**Búsqueda** autocommit, commit automático

**Para recordar** El conector usa False por defecto.

#### Consultar autocommit

```python
with abrir(autocommit=True) as cnx:
    print(cnx.autocommit)
```

**Resultado esperado** True.

### start_transaction()

**Clave** `start-transaction`

**Definición** Inicia explícitamente una transacción, con opciones de aislamiento y acceso.

**Búsqueda** start_transaction, begin, in_transaction

**Para recordar** Iníciala antes de que otra instrucción abra una transacción.

#### Comprobar si hay una transacción activa

```python
with abrir() as cnx:
    cnx.start_transaction()
    print(cnx.in_transaction)
    cnx.rollback()
    print(cnx.in_transaction)
```

**Resultado esperado** True y False.

### Aislamiento y solo lectura

**Clave** `aislamiento-y-solo-lectura`

**Definición** El aislamiento regula la visibilidad de cambios concurrentes; readonly limita escrituras en tablas permanentes.

**Búsqueda** READ COMMITTED, REPEATABLE READ, readonly

**Para recordar** Se aplica a la transacción iniciada.

#### Abrir una lectura explícita

```python
with abrir() as cnx:
    cnx.start_transaction(isolation_level="READ COMMITTED", readonly=True)
    print(cnx.in_transaction)
    cnx.rollback()
```

**Resultado esperado** True.

### SAVEPOINT

**Clave** `savepoint`

**Definición** Permite deshacer parte de una transacción conservando operaciones anteriores.

**Búsqueda** savepoint, rollback to savepoint

**Para recordar** No confirma lo anterior; aún debes decidir commit o rollback.

#### Revertir solamente el segundo cambio

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_tx (id INT PRIMARY KEY) ENGINE=InnoDB")
    cur.execute("INSERT INTO lab_tx VALUES (1)")
    cur.execute("SAVEPOINT paso1")
    cur.execute("INSERT INTO lab_tx VALUES (2)")
    cur.execute("ROLLBACK TO SAVEPOINT paso1")
    cur.execute("SELECT * FROM lab_tx")
    print(cur.fetchall())
    cnx.rollback()
```

**Resultado esperado** [(1,)].

### Commit implícito

**Clave** `commit-implicito`

**Definición** DDL ordinario como ALTER TABLE puede confirmar una transacción implícitamente.

**Búsqueda** implicit commit, DDL, rollback

**Para recordar** No mezcles migraciones con DML que quieras revertir.

**Nota** Consulta la lista de instrucciones con commit implícito del manual de MySQL.

#### Consultar estado sin ejecutar DDL destructivo

```python
with abrir() as cnx:
    cnx.start_transaction()
    print(cnx.in_transaction)
    cnx.rollback()
```

**Resultado esperado** True antes de revertir. Este ejemplo no ejecuta DDL persistente.

## Tipos de datos y conversiones

**Clave** `tipos-de-datos-y-conversiones`

### Definición

**Clave** `definicion`

**Definición** El controlador convierte tipos MySQL a objetos Python y adapta parámetros Python a SQL.

**Búsqueda** type mapping, tipos, conversión

**Para recordar** No confundas texto formateado con un valor numérico o temporal.

#### Inspeccionar tipos de una fila

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT order_id,amount,order_date,status FROM orders WHERE order_id=101")
    print([type(v).__name__ for v in cur.fetchone()])
```

**Resultado esperado** ['int', 'Decimal', 'date', 'str'].

### Decimal y números

**Clave** `decimal-y-numeros`

**Definición** DECIMAL conserva precisión decimal; FLOAT y DOUBLE normalmente se convierten a float.

**Búsqueda** Decimal, int, float, precisión

**Para recordar** Para dinero evita convertir a float si necesitas exactitud.

#### Calcular un descuento exacto

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT amount FROM orders WHERE order_id=101")
    amount = cur.fetchone()[0]
    print(amount * Decimal("0.90"))
```

**Resultado esperado** 720.0000.

### Fechas y horas

**Clave** `fechas-y-horas`

**Definición** DATE suele convertirse a date, DATETIME/TIMESTAMP a datetime y TIME a timedelta.

**Búsqueda** datetime, date, time, timedelta

**Para recordar** TIMESTAMP depende de la zona horaria de sesión.

#### Enviar una fecha Python

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT order_id FROM orders WHERE order_date >= %s ORDER BY order_id", (date(2026,3,1),))
    print(cur.fetchall())
```

**Resultado esperado** [(105,)].

### NULL y None

**Clave** `null-y-none`

**Definición** SQL NULL se recibe como None y viceversa.

**Búsqueda** null, none, nulos

**Para recordar** Comprueba con is None en Python.

#### Detectar un valor nulo

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT country FROM customers WHERE customer_id=4")
    print(cur.fetchone()[0] is None)
```

**Resultado esperado** True.

### BLOB y bytes

**Clave** `blob-y-bytes`

**Definición** Los tipos binarios se recuperan como datos binarios, no necesariamente texto.

**Búsqueda** blob, bytes, bytearray

**Para recordar** No decodifiques bytes sin conocer su formato.

#### Comprobar contenido binario

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_blob (v BLOB)")
    cur.execute("INSERT INTO lab_blob VALUES (%s)", (b"ABC",))
    cur.execute("SELECT v FROM lab_blob")
    print(bytes(cur.fetchone()[0]))
```

**Resultado esperado** b'ABC'.

### JSON

**Clave** `json`

**Definición** Serializa estructuras Python antes de enviarlas y deserializa texto JSON al recibirlo.

**Búsqueda** json.dumps, json.loads, JSON

**Para recordar** Un dict de parámetros no equivale a una columna JSON.

#### Guardar y recuperar un documento

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import json
    cur.execute("CREATE TEMPORARY TABLE lab_json (v JSON)")
    cur.execute("INSERT INTO lab_json VALUES (%s)", (json.dumps({"channel":"web"}),))
    cur.execute("SELECT v FROM lab_json")
    print(json.loads(cur.fetchone()[0])["channel"])
```

**Resultado esperado** web.

### MySQLConverter

**Clave** `mysqlconverter`

**Definición** converter_class permite personalizar la adaptación de valores mediante una subclase del conversor.

**Búsqueda** MySQLConverter, converter_class

**Para recordar** Personaliza solo conversiones necesarias; prueba ambos sentidos.

#### Configurar el conversor en Python puro

```python
from mysql.connector.conversion import MySQLConverter
class MiConversor(MySQLConverter):
    pass
with abrir(use_pure=True, converter_class=MiConversor) as cnx:
    with cnx.cursor() as cur:
        cur.execute("SELECT 1")
        print(cur.fetchall())
```

**Resultado esperado** [(1,)]; la subclase conserva el comportamiento original.

## Errores y excepciones

**Clave** `errores-y-excepciones`

### Definición

**Clave** `definicion`

**Definición** mysql.connector.Error es la base de las excepciones del controlador. Captura los errores que sepas gestionar.

**Búsqueda** Error, try except

**Para recordar** No ocultes excepciones ni continúes como si la operación hubiera funcionado.

#### Capturar un error SQL

```python
try:
    with abrir() as cnx, cnx.cursor() as cur:
        cur.execute("SELECT columna_inexistente FROM customers")
except mysql.connector.Error as exc:
    print(exc.errno)
```

**Resultado esperado** 1054.

### IntegrityError

**Clave** `integrityerror`

**Definición** Se produce ante ciertas violaciones de integridad, como una clave duplicada.

**Búsqueda** IntegrityError, duplicate key, foreign key

**Para recordar** Una clave duplicada puede requerir upsert o rechazar el registro.

#### Capturar una clave duplicada

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    try:
        cur.execute("INSERT INTO customers VALUES (1,'Otra',NULL,'2026-01-01')")
    except mysql.connector.IntegrityError as exc:
        cnx.rollback()
        print(exc.errno)
```

**Resultado esperado** 1062.

### ProgrammingError

**Clave** `programmingerror`

**Definición** Agrupa errores de programación SQL, como sintaxis inválida o referencias inexistentes.

**Búsqueda** ProgrammingError, SQL syntax

**Para recordar** Corrige el SQL; reintentar sin modificarlo no ayuda.

#### Capturar una instrucción inválida

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    try:
        cur.execute("SELEC 1")
    except mysql.connector.ProgrammingError as exc:
        print(exc.errno)
```

**Resultado esperado** 1064.

### Familias de excepciones

**Clave** `familias-de-excepciones`

**Definición** DatabaseError agrupa varias excepciones de base de datos; OperationalError, InterfaceError, DataError, InternalError, NotSupportedError y PoolError representan categorías distintas.

**Búsqueda** DatabaseError, OperationalError, InterfaceError, DataError, InternalError, NotSupportedError, PoolError

**Para recordar** No todos los fallos de red pertenecen a una única clase; revisa errno y sqlstate.

#### Consultar la jerarquía

```python
from mysql.connector import errors
print(issubclass(errors.IntegrityError, errors.DatabaseError))
print(issubclass(errors.OperationalError, errors.Error))
print(issubclass(errors.PoolError, errors.Error))
```

**Resultado esperado** True en las tres líneas.

### errno, msg y sqlstate

**Clave** `errno-msg-y-sqlstate`

**Definición** Una excepción puede incluir código numérico, mensaje y estado SQL.

**Búsqueda** errno, msg, sqlstate, errorcode

**Para recordar** Clasifica por código, no por texto traducido.

#### Reconocer una tabla inexistente

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    from mysql.connector import errorcode
    try:
        cur.execute("SELECT * FROM tabla_que_no_existe")
    except mysql.connector.Error as exc:
        print(exc.errno == errorcode.ER_NO_SUCH_TABLE, exc.sqlstate)
```

**Resultado esperado** True 42S02.

### try, except, else y finally

**Clave** `try-except-else-y-finally`

**Definición** except maneja el fallo; else se ejecuta si no hubo excepción; finally libera recursos.

**Búsqueda** try except else finally, rollback

**Para recordar** Si una operación de escritura falla, revierte la transacción antes de reutilizarla.

#### Confirmar solo si no hubo error

```python
cnx = abrir()
try:
    with cnx.cursor() as cur:
        cur.execute("CREATE TEMPORARY TABLE lab_err (id INT PRIMARY KEY)")
        cur.execute("INSERT INTO lab_err VALUES (1)")
except mysql.connector.Error:
    cnx.rollback()
    raise
else:
    cnx.commit()
    print("confirmado")
finally:
    cnx.close()
```

**Resultado esperado** confirmado; se libera la conexión.

### Advertencias

**Clave** `advertencias`

**Definición** Las advertencias de MySQL pueden recuperarse configurando get_warnings; raise_on_warnings permite tratarlas como excepciones.

**Búsqueda** warnings, get_warnings, raise_on_warnings, Warning

**Para recordar** Desde 9.3 usa la propiedad warnings en lugar de fetchwarnings().

#### Consultar una advertencia de conversión

```python
with abrir(get_warnings=True) as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT CAST('abc' AS UNSIGNED)")
    print(cur.fetchall())
    print(cur.warnings)
```

**Resultado esperado** [(0,)] y una advertencia de conversión (puede emitirse también un aviso Python).

## Estado y recuperación de conexión

**Clave** `estado-y-recuperacion-de-conexion`

### Definición

**Clave** `definicion`

**Definición** Una sesión puede cerrarse por red, servidor o timeout. Comprueba el estado antes de reutilizarla si es necesario.

**Búsqueda** connected, ping, reconnect

**Para recordar** Una conexión nueva no restaura una transacción anterior.

#### Comprobar la conexión

```python
with abrir() as cnx:
    print(cnx.connected)
```

**Resultado esperado** True mientras el servidor responde.

### is_connected() y connected

**Clave** `is-connected-y-connected`

**Definición** connected comprueba el estado; is_connected() es la forma histórica.

**Búsqueda** is_connected, connected

**Para recordar** Prefiere connected en versiones actuales; no garantiza que la próxima operación funcione.

#### Consultar el estado actual

```python
with abrir() as cnx:
    print(cnx.connected)
```

**Resultado esperado** True.

### ping()

**Clave** `ping`

**Definición** Comprueba la comunicación y, opcionalmente, permite intentar reconectar.

**Búsqueda** ping, reconnect, attempts, delay

**Para recordar** No reconectes silenciosamente dentro de una transacción.

#### Comprobar el servidor

```python
with abrir() as cnx:
    cnx.ping(reconnect=False)
    print("disponible")
```

**Resultado esperado** disponible si responde; excepción si falla.

### reconnect()

**Clave** `reconnect`

**Definición** Intenta restablecer la sesión con los parámetros de conexión.

**Búsqueda** reconnect, attempts, delay

**Para recordar** Se pierden variables de sesión, temporales y transacciones no confirmadas de la sesión anterior.

#### Reconectar una sesión sin cambios pendientes

```python
cnx = abrir()
try:
    cnx.close()
    cnx.reconnect(attempts=2, delay=1)
    print(cnx.connected)
finally:
    cnx.close()
```

**Resultado esperado** True si el servidor está disponible.

### Timeouts

**Clave** `timeouts`

**Definición** connection_timeout limita la conexión inicial; read_timeout y write_timeout limitan esperas de lectura y escritura.

**Búsqueda** connection_timeout, read_timeout, write_timeout

**Para recordar** Un timeout no demuestra que el servidor no ejecutó una escritura.

#### Abrir con tiempos máximos

```python
with abrir(connection_timeout=5, read_timeout=10, write_timeout=10) as cnx:
    print(cnx.connected)
```

**Resultado esperado** True si se conecta.

### Reintentos y backoff

**Clave** `reintentos-y-backoff`

**Definición** Reintenta operaciones recuperables con pausas crecientes y límite de intentos.

**Búsqueda** retry, exponential backoff, error 1213, 1205

**Para recordar** Reintenta la transacción completa; no repitas escrituras de resultado incierto sin idempotencia.

#### Reintentar una lectura ante un deadlock

```python
import time
for intento in range(3):
    try:
        with abrir() as cnx, cnx.cursor(buffered=True) as cur:
            cur.execute("SELECT COUNT(*) FROM orders")
            print(cur.fetchone()[0])
        break
    except mysql.connector.Error as exc:
        if exc.errno not in (1205, 1213) or intento == 2:
            raise
        time.sleep(0.2 * 2**intento)
```

**Resultado esperado** 5 normalmente; ante los códigos indicados se reintenta hasta tres veces.

### Failover

**Clave** `failover`

**Definición** connect admite una lista de destinos alternativos para establecer la conexión.

**Búsqueda** failover, alta disponibilidad

**Para recordar** No replica datos ni conserva transacciones; las alternativas deben estar preparadas por infraestructura.

**Nota** El segundo destino es ilustrativo; requiere otro servidor configurado.

#### Conectar a uno de dos destinos de laboratorio

```python
destinos = [{"host": CONFIG["host"], "port": CONFIG["port"]}, {"host": "127.0.0.1", "port": 3307}]
base = {k:v for k,v in CONFIG.items() if k not in ("host","port")}
with mysql.connector.connect(**base, failover=destinos) as cnx:
    print(cnx.database)
```

**Resultado esperado** alldoc_connector_lab si al menos un destino está disponible y contiene la base.

## Sesión y configuración

**Clave** `sesion-y-configuracion`

### Definición

**Clave** `definicion`

**Definición** Los parámetros de sesión afectan solo a la conexión que los establece.

**Búsqueda** session, sql_mode, timezone, charset

**Para recordar** Dos conexiones pueden tener configuraciones distintas.

#### Consultar el esquema activo

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT DATABASE()")
    print(cur.fetchone())
```

**Resultado esperado** ('alldoc_connector_lab',).

### config()

**Clave** `config`

**Definición** config() configura argumentos de una conexión; úsalo antes de conectarla o reconectarla.

**Búsqueda** config, configuración

**Para recordar** Para una conexión nueva suele ser más sencillo connect(**CONFIG).

#### Configurar y abrir un objeto sin conexión

```python
from mysql.connector import MySQLConnection
cnx = MySQLConnection()
try:
    cnx.config(**CONFIG)
    cnx.connect()
    print(cnx.database)
finally:
    cnx.close()
```

**Resultado esperado** alldoc_connector_lab.

### sql_mode

**Clave** `sql-mode`

**Definición** Controla reglas de validación y sintaxis de MySQL para la sesión.

**Búsqueda** ONLY_FULL_GROUP_BY, strict mode, sql_mode

**Para recordar** No desactives restricciones para ocultar errores de consultas.

#### Comprobar reglas activas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT @@SESSION.sql_mode")
    print(cur.fetchone()[0])
```

**Resultado esperado** Una cadena de modos configurados en el servidor.

### time_zone

**Clave** `time-zone`

**Definición** Configura la zona horaria de sesión para funciones y tipos temporales que dependen de ella.

**Búsqueda** time_zone, timestamp, UTC

**Para recordar** Usa una zona coherente en extracción y carga.

#### Usar UTC en la sesión

```python
with abrir(time_zone="+00:00") as cnx, cnx.cursor() as cur:
    cur.execute("SELECT @@session.time_zone")
    print(cur.fetchall())
```

**Resultado esperado** [('+00:00',)].

### charset, collation y Unicode

**Clave** `charset-collation-y-unicode`

**Definición** charset controla la codificación; collation las comparaciones y el orden del texto.

**Búsqueda** utf8mb4, collation, use_unicode

**Para recordar** No confundas codificación de caracteres con reglas de comparación.

#### Comprobar una conexión Unicode

```python
with abrir(charset="utf8mb4", collation="utf8mb4_0900_ai_ci", use_unicode=True) as cnx, cnx.cursor() as cur:
    cur.execute("SELECT %s", ("México",))
    print(cur.fetchall())
```

**Resultado esperado** [('México',)].

### Variables de sesión e init_command

**Clave** `variables-de-sesion-e-init-command`

**Definición** init_command ejecuta SQL al conectar; las variables @nombre pertenecen a esa sesión.

**Búsqueda** init_command, variables sesión

**Para recordar** No pongas datos sensibles en comandos de inicialización.

#### Inicializar una variable de sesión

```python
with abrir(init_command="SET @canal = 'web'") as cnx, cnx.cursor() as cur:
    cur.execute("SELECT @canal")
    print(cur.fetchall())
```

**Resultado esperado** [('web',)].

### reset_session()

**Clave** `reset-session`

**Definición** Restablece el estado de una sesión sin que la aplicación tenga que abrir otra conexión.

**Búsqueda** reset_session, cmd_reset_connection

**Para recordar** No lo uses mientras necesitas una transacción, variable o tabla temporal.

#### Eliminar una variable de sesión

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SET @canal='web'")
    cnx.reset_session()
    cur.execute("SELECT @canal")
    print(cur.fetchall())
```

**Resultado esperado** [(None,)].

### Archivos de opciones

**Clave** `archivos-de-opciones`

**Definición** option_files y option_groups leen configuración desde archivos de opciones MySQL.

**Búsqueda** my.cnf, option_files, option_groups

**Para recordar** Protege permisos del archivo y evita subirlo a Git.

**Nota** Crea previamente lab.cnf con [connector_python], host, user y password de laboratorio.

#### Abrir con un archivo de opciones

```python
with mysql.connector.connect(option_files="lab.cnf", option_groups=["connector_python"], database="alldoc_connector_lab") as cnx:
    print(cnx.database)
```

**Resultado esperado** alldoc_connector_lab si el archivo contiene credenciales y host válidos.

## Seguridad y transporte

**Clave** `seguridad-y-transporte`

### Definición

**Clave** `definicion`

**Definición** La autenticación verifica la cuenta; TLS protege el tráfico y la validación del certificado verifica el servidor.

**Búsqueda** TLS, SSL, autenticación

**Para recordar** Usa permisos mínimos y valida identidad en conexiones remotas.

#### Consultar si la sesión usa cifrado

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SHOW SESSION STATUS LIKE 'Ssl_cipher'")
    print(cur.fetchone()[1])
```

**Resultado esperado** Nombre del cifrado si TLS está activo; cadena vacía si no.

### TLS y certificados

**Clave** `tls-y-certificados`

**Definición** ssl_ca, ssl_verify_cert y ssl_verify_identity validan la cadena y el nombre del servidor.

**Búsqueda** ssl_ca, ssl_cert, ssl_key, tls_versions

**Para recordar** No desactives la validación en producción.

**Nota** Host y archivo ilustrativos: reemplázalos por los de tu laboratorio TLS. Para autenticación mutua añade ssl_cert y ssl_key según el servidor.

#### Abrir una conexión TLS verificada

```python
with abrir(host="mysql.lab.example", ssl_ca="ca.pem", ssl_verify_cert=True, ssl_verify_identity=True, tls_versions=["TLSv1.2","TLSv1.3"]) as cnx:
    print(cnx.connected)
```

**Resultado esperado** True si el host y certificado son válidos; error si la validación falla.

### auth_plugin y autenticación

**Clave** `auth-plugin-y-autenticacion`

**Definición** El servidor negocia un plugin compatible con la cuenta; auth_plugin permite especificarlo cuando es necesario.

**Búsqueda** caching_sha2_password, auth_plugin, MFA, LDAP, Kerberos, OpenID Connect

**Para recordar** No fuerces un plugin antiguo; la disponibilidad depende de servidor, plataforma y edición.

**Nota** MFA usa password1, password2 y password3 según factores; LDAP, Kerberos y OpenID Connect requieren configuración empresarial específica.

#### Conectar con autenticación SHA-2

```python
with abrir(auth_plugin="caching_sha2_password") as cnx:
    print(cnx.connected)
```

**Resultado esperado** True si la cuenta y el servidor admiten el plugin.

### Privilegios mínimos

**Clave** `privilegios-minimos`

**Definición** La cuenta del proceso debe tener solo los permisos requeridos por su tarea.

**Búsqueda** grant, permisos, solo lectura

**Para recordar** Una cuenta de reportes no necesita DROP ni permisos administrativos.

#### Consultar permisos de la cuenta

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SHOW GRANTS FOR CURRENT_USER()")
    print(cur.fetchall())
```

**Resultado esperado** Lista de concesiones de la cuenta; depende del servidor.

### TCP, socket y compresión

**Clave** `tcp-socket-y-compresion`

**Definición** El transporte puede ser TCP o socket Unix; compress=True solicita compresión del protocolo.

**Búsqueda** unix_socket, compress, TCP/IP

**Para recordar** Un socket requiere servidor local y ruta válida; comprimir no equivale a cifrar.

#### Solicitar compresión

```python
with abrir(compress=True) as cnx:
    with cnx.cursor() as cur:
        cur.execute("SHOW SESSION STATUS LIKE 'Compression'")
        print(cur.fetchall())
```

**Resultado esperado** Estado de compresión negociado con el servidor.

### Atributos y flags

**Clave** `atributos-y-flags`

**Definición** conn_attrs agrega metadatos de conexión; client_flags configura capacidades del protocolo.

**Búsqueda** conn_attrs, ClientFlag, client_flags

**Para recordar** No uses atributos para enviar secretos.

#### Etiquetar una conexión

```python
from mysql.connector.constants import ClientFlag
with abrir(conn_attrs={"application":"alldoc"}, client_flags=[ClientFlag.FOUND_ROWS]) as cnx:
    print(cnx.connected)
```

**Resultado esperado** True si la conexión se establece. FOUND_ROWS cambia el significado de filas afectadas de UPDATE.

## Múltiples instrucciones y resultados

**Clave** `multiples-instrucciones-y-resultados`

### Definición

**Clave** `definicion`

**Definición** Desde Connector/Python 9.2 execute admite scripts SQL con varias instrucciones y el cursor permite recorrer sus resultados.

**Búsqueda** multi statement, execute, nextset

**Para recordar** No uses multi=True en 9.2+. Consume todos los resultados.

#### Ejecutar dos consultas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT 1; SELECT 2")
    print(cur.fetchall())
    cur.nextset()
    print(cur.fetchall())
    cur.nextset()
```

**Resultado esperado** [(1,)] y [(2,)].

### nextset()

**Clave** `nextset`

**Definición** Avanza al siguiente conjunto de resultados; devuelve None cuando no queda otro.

**Búsqueda** nextset, result set

**Para recordar** Comprueba with_rows antes de recuperar filas de instrucciones sin resultado.

#### Recorrer instrucciones heterogéneas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SET @x=5; SELECT @x; SELECT 9")
    while True:
        if cur.with_rows:
            print(cur.fetchall())
        if not cur.nextset():
            break
```

**Resultado esperado** [(5,)] y [(9,)].

### fetchsets() y map_results

**Clave** `fetchsets-y-map-results`

**Definición** fetchsets entrega pares de instrucción y filas; map_results=True vincula cada resultado a su instrucción.

**Búsqueda** fetchsets, map_results, statement

**Para recordar** Sin mapeo no asumas que statement cambia entre resultados.

#### Identificar cada SELECT

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT 1; SELECT 2", map_results=True)
    for sentencia, filas in cur.fetchsets():
        print(filas)
```

**Resultado esperado** [(1,)] y [(2,)].

### Archivos SQL

**Clave** `archivos-sql`

**Definición** Lee un archivo de confianza y ejecútalo como script, en lugar de separar manualmente por punto y coma.

**Búsqueda** pathlib, archivo .sql, delimiters

**Para recordar** No ejecutes archivos de usuarios sin validación; el SQL puede modificar datos.

#### Ejecutar un archivo de laboratorio

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    from pathlib import Path
    from tempfile import TemporaryDirectory
    with TemporaryDirectory() as tmp:
        ruta = Path(tmp) / "consulta.sql"
        ruta.write_text("SELECT 7; SELECT 8;", encoding="utf-8")
        cur.execute(ruta.read_text(encoding="utf-8"))
        for _, filas in cur.fetchsets():
            print(filas)
```

**Resultado esperado** [(7,)] y [(8,)].

### Cambios desde 9.2

**Clave** `cambios-desde-9-2`

**Definición** El argumento multi=True se eliminó en 9.2; nextset y fetchsets son la API moderna.

**Búsqueda** multi=True, migración, versión

**Para recordar** Consulta __version__ antes de adaptar código antiguo.

#### Mostrar la versión instalada

```python
print(mysql.connector.__version__)
```

**Resultado esperado** Una versión 9.4 o posterior si se sigue el entorno propuesto.

## Procedimientos almacenados

**Clave** `procedimientos-almacenados`

### Definición

**Clave** `definicion`

**Definición** Un procedimiento se define en MySQL y se ejecuta con CALL o callproc.

**Búsqueda** stored procedure, callproc

**Para recordar** Requiere permisos CREATE ROUTINE y EXECUTE según la acción.

**Nota** Ejecuta en Workbench una sola vez después de USE alldoc_connector_lab; los ejemplos siguientes dependen de él. Elimínalo con DROP PROCEDURE lab_double al terminar.

#### Preparar un procedimiento de laboratorio

```sql
CREATE PROCEDURE lab_double(IN x INT, OUT y INT) SET y = x * 2;
```

**Resultado esperado** Se crea lab_double en la base activa.

### callproc() e IN OUT INOUT

**Clave** `callproc-e-in-out-inout`

**Definición** callproc devuelve los argumentos con los valores OUT e INOUT actualizados.

**Búsqueda** callproc, IN, OUT, INOUT

**Para recordar** IN entra, OUT sale e INOUT entra y puede cambiar.

**Nota** Requiere lab_double de la ficha Definición.

#### Obtener un parámetro de salida

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    resultado = cur.callproc("lab_double", (7, 0))
    print(resultado[1])
```

**Resultado esperado** 14.

### CALL y conjuntos de resultados

**Clave** `call-y-conjuntos-de-resultados`

**Definición** CALL puede devolver conjuntos de filas y un resultado final sin filas.

**Búsqueda** call, nextset, stored_results

**Para recordar** stored_results está deprecado desde 9.3; para nuevos scripts con CALL recorre nextset/fetchsets.

**Nota** Requiere lab_double; para procedimientos que devuelvan filas consume también el primer conjunto.

#### Ejecutar CALL y recuperar OUT

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CALL lab_double(7,@salida)")
    while cur.nextset():
        if cur.with_rows:
            cur.fetchall()
    cur.execute("SELECT @salida")
    print(cur.fetchall())
```

**Resultado esperado** [(14,)].

## Connection pooling

**Clave** `connection-pooling`

### Definición

**Clave** `definicion`

**Definición** Un pool mantiene conexiones reutilizables y las presta a tareas que las necesitan.

**Búsqueda** pool, connection pooling

**Para recordar** close() devuelve al pool una conexión prestada, no necesariamente cierra el socket.

#### Crear un pool y tomar una conexión

```python
from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(pool_name="lab_pool", pool_size=2, **CONFIG)
with pool.get_connection() as cnx, cnx.cursor() as cur:
    cur.execute("SELECT 1")
    print(cur.fetchall())
```

**Resultado esperado** [(1,)]; la conexión regresa al pool.

### pool_name y pool_size

**Clave** `pool-name-y-pool-size`

**Definición** connect puede crear o reutilizar un pool nombrado; su capacidad se fija al crearlo.

**Búsqueda** pool_name, pool_size, get_connection

**Para recordar** Elige tamaño según concurrencia y límites del servidor.

#### Crear un pool implícito

```python
with abrir(pool_name="lab_implicit", pool_size=2) as cnx:
    print(cnx.pool_name)
```

**Resultado esperado** lab_implicit.

### PoolError

**Clave** `poolerror`

**Definición** Si todas las conexiones están prestadas, get_connection puede lanzar PoolError.

**Búsqueda** PoolError, pool agotado

**Para recordar** Devuelve siempre las conexiones, incluso ante fallos.

#### Detectar un pool agotado

```python
from mysql.connector.pooling import MySQLConnectionPool
from mysql.connector.errors import PoolError
pool = MySQLConnectionPool(pool_size=1, **CONFIG)
with pool.get_connection() as cnx:
    try:
        pool.get_connection()
    except PoolError:
        print("agotado")
```

**Resultado esperado** agotado.

### pool_reset_session

**Clave** `pool-reset-session`

**Definición** Con True se restablece el estado de sesión al devolver conexiones al pool.

**Búsqueda** pool_reset_session, reset

**Para recordar** No dependas de variables de sesión de una conexión prestada anteriormente.

#### Verificar el aislamiento entre préstamos

```python
from mysql.connector.pooling import MySQLConnectionPool
pool = MySQLConnectionPool(pool_size=1, pool_reset_session=True, **CONFIG)
with pool.get_connection() as cnx, cnx.cursor() as cur:
    cur.execute("SET @x=7")
with pool.get_connection() as cnx, cnx.cursor() as cur:
    cur.execute("SELECT @x")
    print(cur.fetchall())
```

**Resultado esperado** [(None,)].

## Concurrencia y asyncio

**Clave** `concurrencia-y-asyncio`

### Definición

**Clave** `definicion`

**Definición** Cada tarea concurrente debe usar su propia conexión o un préstamo exclusivo de un pool.

**Búsqueda** concurrencia, threadsafety, asyncio

**Para recordar** No compartas un cursor ni una conexión simultáneamente.

#### Ejecutar dos lecturas en hilos

```python
from concurrent.futures import ThreadPoolExecutor
def nombre(key):
    with abrir() as cnx, cnx.cursor() as cur:
        cur.execute("SELECT name FROM customers WHERE customer_id=%s", (key,))
        return cur.fetchall()[0][0]
with ThreadPoolExecutor(max_workers=2) as ex:
    print(list(ex.map(nombre, [1,2])))
```

**Resultado esperado** ['Ana', 'Luis'].

### mysql.connector.aio

**Clave** `mysql-connector-aio`

**Definición** La API asíncrona permite esperar operaciones de red sin bloquear el bucle de eventos.

**Búsqueda** aio, async, await, async with

**Para recordar** Usa asyncio.run en un script, no dentro de otro loop activo.

**Nota** aio está disponible desde 8.3; en notebooks con loop activo usa await main().

#### Consultar de forma asíncrona

```python
import asyncio
from mysql.connector.aio import connect
async def main():
    async with await connect(**CONFIG) as cnx:
        async with await cnx.cursor() as cur:
            await cur.execute("SELECT COUNT(*) FROM orders")
            print(await cur.fetchall())
asyncio.run(main())
```

**Resultado esperado** [(5,)].

### Tareas asíncronas independientes

**Clave** `tareas-asincronas-independientes`

**Definición** asyncio.gather permite esperar varias operaciones concurrentes; cada una usa su propia sesión.

**Búsqueda** gather, concurrency

**Para recordar** Limita concurrencia según capacidad del servidor.

#### Consultar dos clientes en paralelo

```python
import asyncio
from mysql.connector.aio import connect
async def nombre(key):
    async with await connect(**CONFIG) as cnx:
        async with await cnx.cursor() as cur:
            await cur.execute("SELECT name FROM customers WHERE customer_id=%s", (key,))
            return (await cur.fetchall())[0][0]
async def main():
    print(await asyncio.gather(nombre(1), nombre(2)))
asyncio.run(main())
```

**Resultado esperado** ['Ana', 'Luis'].

## Rendimiento y procesamiento por lotes

**Clave** `rendimiento-y-procesamiento-por-lotes`

### Definición

**Clave** `definicion`

**Definición** El rendimiento depende del SQL, el volumen transferido y el número de viajes al servidor.

**Búsqueda** performance, batch, round trip

**Para recordar** Selecciona solo lo necesario y agrega en el servidor.

#### Transferir un resumen en lugar de todas las filas

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT status, COUNT(*) FROM orders GROUP BY status ORDER BY status")
    print(cur.fetchall())
```

**Resultado esperado** [('cancelled', 1), ('completed', 4)].

### Streaming y fetchmany

**Clave** `streaming-y-fetchmany`

**Definición** Un cursor sin búfer con fetchmany limita las filas retenidas por cada lote.

**Búsqueda** chunking, streaming, memory

**Para recordar** No uses fetchall para resultados enormes si solo necesitas procesarlos secuencialmente.

#### Contar filas por lotes

```python
with abrir() as cnx, cnx.cursor(buffered=False) as cur:
    cur.execute("SELECT order_id FROM orders ORDER BY order_id")
    while lote := cur.fetchmany(2):
        print(len(lote))
```

**Resultado esperado** 2, 2, 1.

### Inserciones por lotes

**Clave** `inserciones-por-lotes`

**Definición** Divide cargas grandes en grupos de parámetros para reducir viajes sin crear sentencias gigantes.

**Búsqueda** executemany, batch, packet size

**Para recordar** Ajusta el tamaño según memoria, max_allowed_packet y duración de la transacción.

#### Insertar en lotes de dos

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_batch (id INT PRIMARY KEY)")
    filas = [(i,) for i in range(1,6)]
    for i in range(0,len(filas),2):
        cur.executemany("INSERT INTO lab_batch VALUES (%s)", filas[i:i+2])
    cnx.commit()
    cur.execute("SELECT COUNT(*) FROM lab_batch")
    print(cur.fetchone())
```

**Resultado esperado** (5,).

### EXPLAIN e índices

**Clave** `explain-e-indices`

**Definición** EXPLAIN describe el plan del servidor; los índices pueden reducir lecturas según filtros y joins.

**Búsqueda** explain, index, plan, sargabilidad

**Para recordar** No evalúes el rendimiento por una sola medición ni por el número de líneas de Python.

#### Inspeccionar un acceso por clave

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("EXPLAIN SELECT * FROM orders WHERE order_id=101")
    print(cur.column_names)
    print(cur.fetchall())
```

**Resultado esperado** Columnas del plan y una fila de acceso a orders; el optimizador puede usar PRIMARY.

### Medición

**Clave** `medicion`

**Definición** perf_counter permite medir el tiempo de una operación en Python.

**Búsqueda** benchmark, latency, perf_counter

**Para recordar** Distingue ejecución, transferencia y transformación; repite mediciones representativas.

#### Medir consulta y recuperación

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    from time import perf_counter
    inicio = perf_counter()
    cur.execute("SELECT * FROM orders")
    filas = cur.fetchall()
    print(len(filas), perf_counter()-inicio)
```

**Resultado esperado** 5 y una duración variable en segundos.

## Pandas, NumPy y archivos

**Clave** `pandas-numpy-y-archivos`

### Definición

**Clave** `definicion`

**Definición** Los resultados de un cursor se pueden convertir a estructuras analíticas o exportar a archivos.

**Búsqueda** DataFrame, CSV, Excel, JSON

**Para recordar** El conector trae filas; las bibliotecas analíticas hacen la transformación.

**Nota** Instala pandas con python -m pip install pandas.

#### Crear un DataFrame a partir del cursor

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import pandas as pd
    cur.execute("SELECT customer_id,name FROM customers ORDER BY customer_id")
    df = pd.DataFrame(cur.fetchall(), columns=cur.column_names)
    print(df.shape)
```

**Resultado esperado** (4, 2).

### Pandas y SQLAlchemy

**Clave** `pandas-y-sqlalchemy`

**Definición** Para pd.read_sql con MySQL usa un engine SQLAlchemy; el soporte DB-API directo de pandas se limita a sqlite3.

**Búsqueda** read_sql, engine, mysql+mysqlconnector

**Para recordar** SQLAlchemy puede usar este conector como driver; no es el mismo paquete.

**Nota** Instala pandas y sqlalchemy; URL.create evita construir manualmente una URL con credenciales.

#### Leer una consulta parametrizada

```python
import pandas as pd
from sqlalchemy import create_engine, URL, text
url = URL.create("mysql+mysqlconnector", username=CONFIG["user"], password=CONFIG["password"], host=CONFIG["host"], port=CONFIG["port"], database=CONFIG["database"])
engine = create_engine(url)
try:
    with engine.connect() as conn:
        df = pd.read_sql(text("SELECT name FROM customers WHERE customer_id=:id"), conn, params={"id":1})
        print(df.iloc[0,0])
finally:
    engine.dispose()
```

**Resultado esperado** Ana.

### NumPy

**Clave** `numpy`

**Definición** NumPy puede procesar arreglos numéricos construidos a partir de filas SQL.

**Búsqueda** numpy, array, mean

**Para recordar** La conversión a float puede perder precisión monetaria.

**Nota** Instala numpy. Para dinero exacto usa Decimal o SQL DECIMAL.

#### Calcular una media numérica

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import numpy as np
    cur.execute("SELECT amount FROM orders WHERE status='completed'")
    values = np.array([float(r[0]) for r in cur.fetchall()])
    print(values.mean())
```

**Resultado esperado** 687.5.

### Exportar CSV

**Clave** `exportar-csv`

**Definición** csv.writer escribe encabezados y filas en un archivo de texto.

**Búsqueda** csv, writer, exportar

**Para recordar** Especifica encoding y newline; el CSV no conserva tipos ni distingue por sí solo NULL de texto vacío.

#### Exportar clientes

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import csv
    from pathlib import Path
    from tempfile import TemporaryDirectory
    cur.execute("SELECT customer_id,name FROM customers ORDER BY customer_id")
    with TemporaryDirectory() as tmp:
        path = Path(tmp)/"customers.csv"
        with path.open("w", encoding="utf-8", newline="") as f:
            w = csv.writer(f)
            w.writerow(cur.column_names)
            w.writerows(cur)
        print(path.read_text(encoding="utf-8"))
```

**Resultado esperado** Encabezado customer_id,name y cuatro filas: 1,Ana; 2,Luis; 3,Marta; 4,Diego. El archivo temporal se elimina al salir.

### Excel

**Clave** `excel`

**Definición** pandas u openpyxl pueden guardar resultados en un libro XLSX.

**Búsqueda** to_excel, openpyxl, xlsx

**Para recordar** Controla encabezados, tipos y precisión; no uses Excel como base transaccional.

**Nota** Instala pandas y openpyxl; el archivo temporal desaparece al terminar.

#### Crear un libro de clientes

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import pandas as pd
    from pathlib import Path
    from tempfile import TemporaryDirectory
    cur.execute("SELECT customer_id,name FROM customers ORDER BY customer_id")
    df = pd.DataFrame(cur.fetchall(), columns=cur.column_names)
    with TemporaryDirectory() as tmp:
        path = Path(tmp)/"customers.xlsx"
        df.to_excel(path,index=False)
        print(pd.read_excel(path).shape)
```

**Resultado esperado** (4, 2).

### Exportar JSON

**Clave** `exportar-json`

**Definición** json.dumps serializa filas en una representación intercambiable; Decimal y date requieren una política explícita.

**Búsqueda** json, serialize, dictionary

**Para recordar** Define cómo representar fechas y dinero; no pierdas precisión sin querer.

#### Exportar un pedido como objeto JSON

```python
import json
with abrir() as cnx, cnx.cursor(dictionary=True) as cur:
    cur.execute("SELECT order_id,amount,order_date FROM orders WHERE order_id=101")
    print(json.dumps(cur.fetchall()[0], default=str))
```

**Resultado esperado** {"order_id": 101, "amount": "800.00", "order_date": "2026-02-01"} (orden de claves según el SELECT).

## ETL y calidad de datos

**Clave** `etl-y-calidad-de-datos`

### Definición

**Clave** `definicion`

**Definición** ETL extrae, transforma y carga datos. El conector interviene en la lectura y escritura de MySQL.

**Búsqueda** ETL, extract transform load

**Para recordar** Valida antes de cargar y confirma solo cuando la unidad de trabajo esté completa.

#### Extraer nombres y normalizarlos

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT name FROM customers ORDER BY customer_id")
    nombres = [r[0].strip().upper() for r in cur.fetchall()]
    print(nombres)
```

**Resultado esperado** ['ANA', 'LUIS', 'MARTA', 'DIEGO'].

### Importar CSV

**Clave** `importar-csv`

**Definición** Convierte los campos de texto a sus tipos de destino antes de una inserción parametrizada.

**Búsqueda** csv.DictReader, import, batch

**Para recordar** Valida campos obligatorios y claves; no concatenes los valores al SQL.

#### Cargar un CSV mínimo en una tabla de trabajo

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import csv
    from io import StringIO
    reader = csv.DictReader(StringIO("id,amount\n1,10.50\n2,20.00\n"))
    rows = [(int(r["id"]), Decimal(r["amount"])) for r in reader]
    cur.execute("CREATE TEMPORARY TABLE lab_csv (id INT PRIMARY KEY, amount DECIMAL(10,2))")
    cur.executemany("INSERT INTO lab_csv VALUES (%s,%s)", rows)
    cnx.commit()
    cur.execute("SELECT SUM(amount) FROM lab_csv")
    print(cur.fetchone()[0])
```

**Resultado esperado** 30.50.

### Importar Excel y JSON

**Clave** `importar-excel-y-json`

**Definición** Extrae filas de formatos externos y adapta los valores antes de pasarlos a executemany.

**Búsqueda** read_excel, openpyxl, json.loads

**Para recordar** Convierte NaN a None cuando corresponda y respeta tipos de datos.

**Nota** Para Excel, lee con pd.read_excel y convierte sus filas a tuplas validadas antes de aplicar el mismo patrón.

#### Cargar registros JSON

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import json
    rows = json.loads('[ {"id": 1, "name": "Ana"}, {"id": 2, "name": "Luis"} ]')
    cur.execute("CREATE TEMPORARY TABLE lab_load (id INT PRIMARY KEY, name VARCHAR(80))")
    cur.executemany("INSERT INTO lab_load VALUES (%s,%s)", [(r["id"],r["name"]) for r in rows])
    cnx.commit()
    cur.execute("SELECT COUNT(*) FROM lab_load")
    print(cur.fetchone())
```

**Resultado esperado** (2,).

### Datos de APIs

**Clave** `datos-de-apis`

**Definición** Una API externa proporciona datos que debes validar y transformar antes de cargarlos.

**Búsqueda** requests, httpx, API, JSON

**Para recordar** Comprueba HTTP, esquema, paginación y duplicados; una respuesta JSON no garantiza datos válidos.

**Nota** En una API real usa timeout y raise_for_status() antes de leer response.json(); esta ficha simula la respuesta.

#### Simular una respuesta de una API sin red

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    respuesta = {"items":[{"id":1,"name":"Ana"}]}
    cur.execute("CREATE TEMPORARY TABLE lab_api (id INT PRIMARY KEY, name VARCHAR(80))")
    cur.executemany("INSERT INTO lab_api VALUES (%s,%s)", [(int(r["id"]),r["name"]) for r in respuesta["items"]])
    cnx.commit()
    cur.execute("SELECT * FROM lab_api")
    print(cur.fetchall())
```

**Resultado esperado** [(1, 'Ana')].

### Full load e incremental

**Clave** `full-load-e-incremental`

**Definición** Una carga completa procesa todo el origen; una incremental recupera solo registros nuevos o modificados.

**Búsqueda** full load, watermark, incremental load

**Para recordar** Un ID creciente sirve para nuevas inserciones, no para detectar modificaciones anteriores.

**Nota** En producción usa updated_at y una clave de desempate si necesitas detectar actualizaciones.

#### Extraer pedidos posteriores a una marca

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    ultimo_id = 103
    cur.execute("SELECT order_id FROM orders WHERE order_id>%s ORDER BY order_id",(ultimo_id,))
    print(cur.fetchall())
```

**Resultado esperado** [(104,), (105,)].

### Idempotencia

**Clave** `idempotencia`

**Definición** Una carga idempotente puede repetirse sin cambiar el resultado final ni duplicar filas.

**Búsqueda** idempotent, upsert, unique key

**Para recordar** Guarda la marca de avance después de confirmar la carga.

#### Repetir una carga sin duplicados

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_idem (id INT PRIMARY KEY, amount INT)")
    for _ in range(2):
        cur.execute("INSERT INTO lab_idem VALUES (%s,%s) ON DUPLICATE KEY UPDATE amount=%s", (1,50,50))
    cnx.commit()
    cur.execute("SELECT COUNT(*),SUM(amount) FROM lab_idem")
    print(cur.fetchone())
```

**Resultado esperado** (1, Decimal('50')).

### Staging y validación

**Clave** `staging-y-validacion`

**Definición** Una tabla intermedia permite revisar datos antes de transferirlos a las tablas definitivas.

**Búsqueda** staging, data quality, duplicates, nulls

**Para recordar** Valida nulos, rangos y unicidad antes de escribir en destino.

#### Detectar IDs repetidos en staging

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("CREATE TEMPORARY TABLE lab_stage (id INT, amount INT)")
    cur.executemany("INSERT INTO lab_stage VALUES (%s,%s)",[(1,10),(1,10),(2,20)])
    cur.execute("SELECT id,COUNT(*) FROM lab_stage GROUP BY id HAVING COUNT(*)>1")
    print(cur.fetchall())
```

**Resultado esperado** [(1, 2)].

### Reconciliación

**Clave** `reconciliacion`

**Definición** Compara conteos, sumas u otras métricas entre origen y destino para detectar pérdidas o duplicaciones.

**Búsqueda** reconciliation, data validation, control totals

**Para recordar** Un conteo igual no demuestra que todos los valores coincidan.

#### Comparar un resumen de control

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT COUNT(*), SUM(amount) FROM orders")
    count, total = cur.fetchone()
    print(count == 5, total == Decimal("3000.00"))
```

**Resultado esperado** True True.

### LOAD DATA LOCAL INFILE

**Clave** `load-data-local-infile`

**Definición** Carga un archivo local mediante el protocolo MySQL; requiere habilitación del cliente y del servidor.

**Búsqueda** load data local infile, allow_local_infile

**Para recordar** Habilita LOCAL solo para servidores de confianza y restringe rutas cuando sea posible.

**Nota** No actives LOCAL globalmente solo para practicar; el ejemplo restringe el directorio. Si la política del servidor lo impide, usa executemany.

#### Importar un archivo CSV local de laboratorio

```python
from pathlib import Path
from tempfile import TemporaryDirectory
with TemporaryDirectory() as tmp:
    path = Path(tmp)/"load.csv"
    path.write_text("1,Ana\n2,Luis\n", encoding="utf-8")
    with abrir(allow_local_infile=False, allow_local_infile_in_path=tmp) as cnx, cnx.cursor() as cur:
        cur.execute("CREATE TEMPORARY TABLE lab_local (id INT PRIMARY KEY, name VARCHAR(80))")
        cur.execute("LOAD DATA LOCAL INFILE %s INTO TABLE lab_local FIELDS TERMINATED BY %s LINES TERMINATED BY %s", (str(path),",","\n"))
        cnx.commit()
        cur.execute("SELECT COUNT(*) FROM lab_local")
        print(cur.fetchall())
```

**Resultado esperado** [(2,)] si el servidor tiene local_infile habilitado y la cuenta puede cargar datos.

## Organización y pruebas

**Clave** `organizacion-y-pruebas`

### Definición

**Clave** `definicion`

**Definición** Separa configuración, acceso a datos y lógica de negocio para reutilizar funciones y facilitar pruebas.

**Búsqueda** connection factory, repository, modularización

**Para recordar** Una función debe dejar claro quién abre, confirma y cierra la conexión.

#### Definir una función de lectura reutilizable

```python
def nombre_cliente(key):
    with abrir() as cnx, cnx.cursor() as cur:
        cur.execute("SELECT name FROM customers WHERE customer_id=%s", (key,))
        row = cur.fetchone()
        return None if row is None else row[0]
print(nombre_cliente(1))
```

**Resultado esperado** Ana.

### Inyección de dependencias

**Clave** `inyeccion-de-dependencias`

**Definición** Recibe una conexión o una fábrica como argumento en lugar de acoplar la función a una configuración global.

**Búsqueda** dependency injection, repository, factory

**Para recordar** El código que recibe una conexión no debe cerrarla si no es su propietario.

#### Consultar con una conexión proporcionada

```python
def contar(cnx):
    with cnx.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM orders")
        return cur.fetchone()[0]
with abrir() as cnx:
    print(contar(cnx))
```

**Resultado esperado** 5.

### Pruebas de integración

**Clave** `pruebas-de-integracion`

**Definición** Verifican el comportamiento del conector y el SQL contra un MySQL de laboratorio.

**Búsqueda** integration test, assert, testing

**Para recordar** Usa datos controlados y no ejecutes pruebas destructivas sobre producción.

#### Comprobar un resultado conocido

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT COUNT(*) FROM orders WHERE status='completed'")
    assert cur.fetchone()[0] == 4
    print("OK")
```

**Resultado esperado** OK.

### Mocking y pruebas unitarias

**Clave** `mocking-y-pruebas-unitarias`

**Definición** Un mock permite probar la lógica que consume una conexión sin contactar MySQL.

**Búsqueda** unittest.mock, unit test

**Para recordar** Un mock no demuestra que el SQL sea válido en el servidor.

#### Probar una función de conteo

```python
from unittest.mock import MagicMock
def contar(cur):
    cur.execute("SELECT COUNT(*) FROM orders")
    return cur.fetchone()[0]
cur = MagicMock()
cur.fetchone.return_value = (5,)
assert contar(cur) == 5
cur.execute.assert_called_once_with("SELECT COUNT(*) FROM orders")
print("OK")
```

**Resultado esperado** OK.

### Logging y automatización

**Clave** `logging-y-automatizacion`

**Definición** Registra estados, métricas y errores sin exponer credenciales ni datos sensibles.

**Búsqueda** logging, report, scheduler

**Para recordar** El programador de tareas es externo al conector; no registra ni programa reportes automáticamente.

#### Registrar la cantidad de pedidos

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    import logging
    logging.basicConfig(level=logging.INFO)
    cur.execute("SELECT COUNT(*) FROM orders")
    logging.info("Pedidos: %s",cur.fetchone()[0])
```

**Resultado esperado** Un mensaje de nivel INFO con Pedidos: 5, si el nivel de logging lo permite.

## API especializada e interoperabilidad

**Clave** `api-especializada-e-interoperabilidad`

### Definición

**Clave** `definicion`

**Definición** La API pública incluye constantes, conversores, metadatos y comandos de nivel inferior para necesidades específicas.

**Búsqueda** constants, conversion, abstracts, connection_cext

**Para recordar** Prefiere connect, cursor y execute sobre detalles internos del protocolo.

#### Consultar las clases disponibles

```python
from mysql.connector import constants, conversion, errors, pooling
print(constants.FieldType.LONG, conversion.MySQLConverter.__name__)
```

**Resultado esperado** 3 MySQLConverter.

### Constantes

**Clave** `constantes`

**Definición** FieldType, ClientFlag, SQLMode y CharacterSet permiten identificar tipos y opciones sin números mágicos.

**Búsqueda** FieldType, ClientFlag, SQLMode, CharacterSet

**Para recordar** Los tipos SQL y códigos del protocolo no son lo mismo que las clases Python.

#### Traducir el código de tipo de una columna

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    from mysql.connector.constants import FieldType
    cur.execute("SELECT customer_id FROM customers LIMIT 1")
    print(FieldType.get_info(cur.description[0][1]))
```

**Resultado esperado** LONG para la columna INT.

### Metadatos del servidor

**Clave** `metadatos-del-servidor`

**Definición** INFORMATION_SCHEMA y SHOW permiten descubrir estructuras y configuraciones mediante SQL.

**Búsqueda** information_schema, show columns, metadata

**Para recordar** Filtra por esquema; la visibilidad depende de permisos.

#### Consultar las tablas del laboratorio

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.execute("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME IN ('customers','orders') ORDER BY TABLE_NAME")
    print(cur.fetchall())
```

**Resultado esperado** [('customers',), ('orders',)].

### Query attributes

**Clave** `query-attributes`

**Definición** Los atributos de consulta transmiten metadatos asociados a una instrucción en servidores compatibles.

**Búsqueda** add_attribute, get_attributes, clear_attributes

**Para recordar** No son parámetros SQL y no deben contener secretos.

**Nota** Requiere soporte de atributos en la versión del conector y del servidor.

#### Etiquetar una consulta

```python
with abrir() as cnx, cnx.cursor(buffered=True) as cur:
    cur.add_attribute("report", "monthly")
    print(cur.get_attributes())
    cur.execute("SELECT 1")
    print(cur.fetchall())
    cur.clear_attributes()
```

**Resultado esperado** La colección incluye report=monthly y el SELECT devuelve [(1,)].

### Comandos de bajo nivel

**Clave** `comandos-de-bajo-nivel`

**Definición** cmd_query y otros cmd_* trabajan más cerca del protocolo que la API de cursores.

**Búsqueda** cmd_query, cmd_reset_connection, get_rows

**Para recordar** Son especializados; debes consumir los resultados y controlar el estado de conexión.

#### Consultar con la API de bajo nivel

```python
with abrir(use_pure=True) as cnx:
    cnx.cmd_query("SELECT 1")
    rows, eof = cnx.get_rows()
    print(rows)
```

**Resultado esperado** [(1,)] en la implementación Python pura.

### Extensión C y módulos internos

**Clave** `extension-c-y-modulos-internos`

**Definición** connection_cext y _mysql_connector implementan la variante C; abstracts, authentication y plugins contienen infraestructura del controlador.

**Búsqueda** C extension, _mysql_connector, plugins, abstracts

**Para recordar** No dependas de interfaces internas para una aplicación analítica normal.

#### Detectar disponibilidad de la extensión

```python
print(mysql.connector.HAVE_CEXT)
```

**Resultado esperado** True si la extensión C está instalada; False si no.

### OpenTelemetry

**Clave** `opentelemetry`

**Definición** La instrumentación permite registrar trazas de operaciones de base de datos con OpenTelemetry.

**Búsqueda** telemetry, tracing, instrumentor

**Para recordar** Configura un proveedor/exportador para visualizar trazas; evita exportar secretos.

**Nota** Instala mysql-connector-python[telemetry] y configura OpenTelemetry según la documentación oficial.

#### Instrumentar el conector

```python
from mysql.connector.opentelemetry.instrumentation import MySQLInstrumentor
instrumentor = MySQLInstrumentor()
instrumentor.instrument()
try:
    with abrir() as cnx, cnx.cursor() as cur:
        cur.execute("SELECT 1")
        print(cur.fetchall())
finally:
    instrumentor.uninstrument()
```

**Resultado esperado** [(1,)]; con proveedor y exportador configurados se generan trazas según la configuración.

### Django

**Clave** `django`

**Definición** El conector incluye un backend para Django, distinto del uso directo de cursores en scripts.

**Búsqueda** django, mysql.connector.django, ORM

**Para recordar** Verifica la compatibilidad de las versiones de Django y del conector.

**Nota** Requiere Django y un proyecto configurado; no ejecuta migraciones ni consultas por sí solo.

#### Configurar el backend en settings.py

```python
DATABASES = {"default": {"ENGINE":"mysql.connector.django", "NAME":CONFIG["database"], "USER":CONFIG["user"], "PASSWORD":CONFIG["password"], "HOST":CONFIG["host"], "PORT":CONFIG["port"]}}
```

**Resultado esperado** Django usa Connector/Python como backend cuando el proyecto carga esta configuración.

### API clásica y X DevAPI

**Clave** `api-clasica-y-x-devapi`

**Definición** mysql.connector usa el protocolo clásico; X DevAPI es una interfaz diferente distribuida en mysqlx-connector-python desde 8.3.

**Búsqueda** mysqlx, X DevAPI, classic protocol

**Para recordar** No intercambies los imports ni los puertos de ambas interfaces.

#### Comprobar el módulo clásico

```python
print(mysql.connector.__name__)
```

**Resultado esperado** mysql.connector.

## Fuentes

- [MySQL Connector/Python Developer Guide](https://dev.mysql.com/doc/connector-python/en/) — instalación, compatibilidad, API pública y temas especializados.
- [Referencia de API](https://dev.mysql.com/doc/connector-python/en/connector-python-reference.html) — clases, propiedades, métodos, conversión y constantes.
- [PEP 249 — Python Database API Specification v2.0](https://peps.python.org/pep-0249/) — cursor, excepciones, parámetros, transacciones y threadsafety.
- [Argumentos de conexión](https://dev.mysql.com/doc/connector-python/en/connector-python-connectargs.html) — TLS, autenticación, timeout, archivos de opciones, charset, pool, carga local y transporte.
- [Establecer conexiones](https://dev.mysql.com/doc/connector-python/en/connector-python-connecting.html) — configuración y archivos de opciones.
- [cursor()](https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlconnection-cursor.html) — variantes de cursor.
- [execute()](https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-execute.html) — parámetros y ejecución SQL.
- [Cursores preparados](https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursorprepared.html) — protocolo binario.
- [Múltiples instrucciones](https://dev.mysql.com/doc/connector-python/en/connector-python-multi.html) — nextset, fetchsets y map_results.
- [Excepciones](https://dev.mysql.com/doc/connector-python/en/connector-python-api-errors.html) — categorías de errores.
- [Pooling](https://dev.mysql.com/doc/connector-python/en/connector-python-connection-pooling.html) — reutilización y tamaño fijo.
- [Conectividad asíncrona](https://dev.mysql.com/doc/connector-python/en/connector-python-asyncio.html) — mysql.connector.aio.
- [Telemetría](https://dev.mysql.com/doc/connector-python/en/connector-python-opentelemetry.html) — OpenTelemetry y requisitos.
- [Cambios 9.2.0](https://dev.mysql.com/doc/relnotes/connector-python/en/news-9-2-0.html) — eliminación de multi=True y adición de la API multisentencia.
- [Cambios 9.3.0](https://dev.mysql.com/doc/relnotes/connector-python/en/news-9-3-0.html) — advertencias y deprecación de stored_results.
- [Cambios 8.3.0](https://dev.mysql.com/doc/relnotes/connector-python/en/news-8-3-0.html) — aio y separación de X DevAPI.
- [MySQL 8.4: transacciones](https://dev.mysql.com/doc/refman/8.4/en/commit.html) — COMMIT, ROLLBACK y autocommit.
- [MySQL 8.4: commits implícitos](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html) — comportamiento DDL.
- [MySQL 8.4: LOAD DATA](https://dev.mysql.com/doc/refman/8.4/en/load-data.html) — importación local y requisitos.
- [pandas.read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html) — conexiones SQLAlchemy y soporte DB-API.
- [SQLAlchemy: MySQL Connector/Python](https://docs.sqlalchemy.org/en/20/dialects/mysql.html#module-sqlalchemy.dialects.mysql.mysqlconnector) — dialecto mysqlconnector.
- [Python: csv](https://docs.python.org/3/library/csv.html), [json](https://docs.python.org/3/library/json.html), [unittest.mock](https://docs.python.org/3/library/unittest.mock.html) — formatos e integración de pruebas.
