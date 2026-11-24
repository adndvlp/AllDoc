# SQLAlchemy

**Clave** `sqlalchemy`

**Área** Análisis de datos / Python (ubicación propuesta para AllDoc).

**Resumen** Conectar Python con bases relacionales, ejecutar y construir SQL, gestionar transacciones y trabajar con datos mediante Core, ORM y Pandas.

**Alcance** Fundamentos, Core, SQL textual parametrizado, metadatos, DML, resultados, transacciones, integración con Pandas, ORM, rendimiento y extensiones avanzadas. Alembic y Pandas se identifican como bibliotecas externas. No pretende enumerar cada método interno de SQLAlchemy.

**Entorno** Python 3.10+, SQLAlchemy 2.0.50 (API 2.0), SQLite 3.39+ para la práctica local; Pandas 2.2+ para integración. Las fichas que solo compilan SQL para otros motores o requieren dependencias externas lo indican. No se requiere servidor para la mayoría de los ejemplos.

## Datos compartidos

Dataset ficticio de ventas: `clientes` (5), `pedidos` (7), `productos` (3), `detalles` (5). Cada pedido pertenece a un cliente; cada detalle pertenece a un pedido y un producto. Los detalles representan únicamente los pedidos completados. Montos y precios son enteros en unidades monetarias de ejemplo. Hay fechas repetidas, montos empatados, cupones nulos, un país nulo y un cliente sin pedidos.

Instala las dependencias con `python -m pip install "sqlalchemy>=2.0.40,<2.1" pandas`. Ejecuta la siguiente preparación antes de cada ejemplo (incluidos los de ORM), salvo que sea un comando de terminal. Los ejemplos son independientes: no acumules sus modificaciones. La preparación usa una base nueva en memoria; `ver()` imprime nombres de columnas y filas, y `valor()` imprime un único valor. Son ayudantes de la guía, no funciones de SQLAlchemy.

```python
import sqlalchemy as sa
from sqlalchemy import (
    create_engine, text, select, insert, update, delete, Table, Column,
    MetaData, Integer, String, Numeric, Date, ForeignKey, func, case,
    cast, literal, bindparam, and_, or_, not_, inspect
)
from datetime import date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session, sessionmaker

engine = create_engine("sqlite+pysqlite:///:memory:")
@sa.event.listens_for(engine, "connect")
def activar_fk(dbapi_connection, connection_record):
    dbapi_connection.execute("PRAGMA foreign_keys=ON")

metadata = MetaData()
clientes = Table("clientes", metadata,
    Column("id", Integer, primary_key=True),
    Column("nombre", String(60), nullable=False),
    Column("pais", String(30)),
    Column("alta", Date, nullable=False))
pedidos = Table("pedidos", metadata,
    Column("id", Integer, primary_key=True),
    Column("cliente_id", ForeignKey("clientes.id"), nullable=False),
    Column("monto", Integer, nullable=False),
    Column("fecha", Date, nullable=False),
    Column("estado", String(20), nullable=False),
    Column("cupon", String(20)))
productos = Table("productos", metadata,
    Column("id", Integer, primary_key=True),
    Column("nombre", String(60), nullable=False),
    Column("categoria", String(30)),
    Column("precio", Integer, nullable=False))
detalles = Table("detalles", metadata,
    Column("id", Integer, primary_key=True),
    Column("pedido_id", ForeignKey("pedidos.id"), nullable=False),
    Column("producto_id", ForeignKey("productos.id"), nullable=False),
    Column("cantidad", Integer, nullable=False),
    Column("precio", Integer, nullable=False))
metadata.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(clientes), [
        dict(id=i, nombre=n, pais=p, alta=date(2026, 1, d))
        for i,n,p,d in [(1,"Ana","MX",1),(2,"Luis","MX",2),
                        (3,"Marta","ES",3),(4,"Noa",None,4),(5,"Eva","ES",5)]])
    conn.execute(insert(pedidos), [
        dict(id=i, cliente_id=c, monto=m, fecha=date.fromisoformat(f), estado=e, cupon=k)
        for i,c,m,f,e,k in [(101,1,100,"2026-02-01","completed",None),
                           (102,1,200,"2026-02-03","completed","SAVE"),
                           (103,2,200,"2026-02-03","completed",None),
                           (104,2,50,"2026-02-04","cancelled",None),
                           (105,3,300,"2026-03-01","completed","SAVE"),
                           (106,3,100,"2026-03-02","completed",None),
                           (107,4,80,"2026-03-02","cancelled",None)]])
    conn.execute(insert(productos), [dict(id=i,nombre=n,categoria=c,precio=p)
        for i,n,c,p in [(1,"Mouse","Tech",100),(2,"Teclado","Tech",200),(3,"Silla","Hogar",300)]])
    conn.execute(insert(detalles), [dict(id=i,pedido_id=o,producto_id=p,cantidad=q,precio=v)
        for i,o,p,q,v in [(1,101,1,1,100),(2,102,1,2,100),(3,103,2,1,200),
                          (4,105,3,1,300),(5,106,1,1,100)]])

# Ayudantes de práctica (no forman parte de la API de SQLAlchemy).
def ver(stmt, params=None):
    with engine.connect() as conn:
        r = conn.execute(stmt, params or {})
        print(tuple(r.keys()))
        print(r.tuples().all())

def valor(stmt, params=None):
    with engine.connect() as conn:
        print(conn.execute(stmt, params or {}).scalar_one())
```

Para las fichas que usan `Cliente`, `Pedido` o `Sesion`, añade esta preparación después de la anterior. Las fichas que declaran otros modelos contienen su propia definición.

```python
class Base(DeclarativeBase):
    pass

class Cliente(Base):
    __table__ = clientes
    pedidos: Mapped[list["Pedido"]] = relationship(back_populates="cliente")

class Pedido(Base):
    __table__ = pedidos
    cliente: Mapped["Cliente"] = relationship(back_populates="pedidos")

# Los modelos reutilizan las tablas ya creadas; no crean otras.
Sesion = sessionmaker(engine)
```

Los resultados marcados como **Resultado** se comprobaron ejecutando el código localmente. Los marcados como **Resultado esperado** corresponden a comandos externos o ejemplos no ejecutados. Un ejemplo que compila SQL muestra el SQL generado, no un resultado del servidor. En las consultas sin orden explícito no se garantiza el orden de las filas.

## SQLAlchemy y su arquitectura

**Clave** `sqlalchemy-arquitectura`

### Definición

**Clave** `definicion`

**Definición** SQLAlchemy conecta Python con bases relacionales mediante un motor y un dialecto. Core construye o ejecuta SQL; ORM representa filas como objetos.

**Búsqueda** Definición; Contar pedidos con SQL directo

**Para recordar** Engine conecta; Core trabaja con sentencias; ORM con entidades.

#### Contar pedidos con SQL directo

```python
valor(text("SELECT COUNT(*) FROM pedidos"))
```

Engine conecta; Core trabaja con sentencias; ORM con entidades.

**Resultado**

```text
7
```

### Instalación

**Clave** `instalacion`

**Definición** Instala SQLAlchemy 2.0 y las dependencias adicionales solo cuando las necesites.

**Búsqueda** Instalación; Instalar en el entorno activo

**Para recordar** Usa el mismo entorno Python donde ejecutarás el código.

**Nota** SQLite utiliza sqlite3 de la biblioteca estándar; no requiere servidor.

#### Instalar en el entorno activo

```bash
python -m pip install "sqlalchemy>=2.0,<2.1"
python -m pip install pandas
```

Usa el mismo entorno Python donde ejecutarás el código.

**Resultado esperado**

```text
SQLAlchemy 2.0.x y Pandas quedan disponibles si la instalación finaliza correctamente.
```

### Core frente a ORM

**Clave** `core-frente-a-orm`

**Definición** Core usa Table y expresiones; ORM usa clases mapeadas y Session. Ambos comparten el motor de expresiones SQL.

**Búsqueda** Core frente a ORM; Comparar dos consultas equivalentes

**Para recordar** No necesitas ORM para consultar datos de análisis.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Comparar dos consultas equivalentes

```python
ver(select(clientes.c.nombre).order_by(clientes.c.id))
with Session(engine) as s:
    print(s.scalars(select(Cliente.nombre).order_by(Cliente.id)).all())
```

No necesitas ORM para consultar datos de análisis.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]
['Ana', 'Luis', 'Marta', 'Noa', 'Eva']
```

### DBAPI, dialecto y driver

**Clave** `dbapi-dialecto-y-driver`

**Definición** DBAPI es la interfaz del controlador Python; el dialecto adapta SQL y tipos al motor.

**Búsqueda** DBAPI, dialecto y driver; Identificar SQLite y su controlador

**Para recordar** El driver transporta; el dialecto adapta.

#### Identificar SQLite y su controlador

```python
print(engine.dialect.name, engine.dialect.driver)
```

El driver transporta; el dialecto adapta.

**Resultado**

```text
sqlite pysqlite
```

### API 2.0 y código legado

**Clave** `api-2-0-y-codigo-legado`

**Definición** La API 2.0 ejecuta mediante Connection o Session y usa select() moderno. Query sigue existiendo como API heredada del ORM.

**Búsqueda** API 2.0 y código legado; Consultar con la API 2.0

**Para recordar** No uses engine.execute() ni select([columna]) en código nuevo.

#### Consultar con la API 2.0

```python
with engine.connect() as conn:
    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id == 1)).scalar_one())
```

No uses engine.execute() ni select([columna]) en código nuevo.

**Resultado**

```text
Ana
```

## Engine y configuración

**Clave** `engine`

### Definición

**Clave** `definicion`

**Definición** Engine es la entrada reutilizable a una base: administra dialecto y pool de conexiones. create_engine() normalmente no conecta hasta el primer uso.

**Búsqueda** Definición; Crear y probar un motor local

**Para recordar** Crea un Engine por configuración, no uno por fila.

#### Crear y probar un motor local

```python
e = create_engine("sqlite+pysqlite:///:memory:")
with e.connect() as conn:
    print(conn.execute(text("SELECT 1")).scalar_one())
e.dispose()
```

Crea un Engine por configuración, no uno por fila.

**Resultado**

```text
1
```

### URL de conexión

**Clave** `url-de-conexion`

**Definición** La URL indica dialecto, driver y destino. SQLite puede usar un archivo o memoria.

**Búsqueda** URL de conexión; Inspeccionar una URL local

**Para recordar** dialecto+driver://usuario:clave@host:puerto/base

#### Inspeccionar una URL local

```python
print(sa.engine.make_url("sqlite+pysqlite:///ventas.db").database)
```

dialecto+driver://usuario:clave@host:puerto/base

**Resultado**

```text
ventas.db
```

### URL.create()

**Clave** `url-create`

**Definición** Construye la URL con argumentos separados, sin escapar manualmente contraseñas con símbolos.

**Búsqueda** URL.create(); Construir una URL PostgreSQL sin abrir conexión

**Para recordar** No imprimas contraseñas ni las subas al repositorio.

#### Construir una URL PostgreSQL sin abrir conexión

```python
u = sa.URL.create("postgresql+psycopg", username="analista", password="ejemplo@local", host="localhost", port=5432, database="ventas")
print(u.render_as_string(hide_password=True))
```

No imprimas contraseñas ni las subas al repositorio.

**Resultado**

```text
postgresql+psycopg://analista:***@localhost:5432/ventas
```

### Drivers por motor

**Clave** `drivers-por-motor`

**Definición** El dialecto y el driver se seleccionan con el prefijo de la URL. SQL Server puede requerir un controlador ODBC instalado en el sistema.

**Búsqueda** Drivers por motor; Comparar prefijos sin conectarse

**Para recordar** Instalar SQLAlchemy no instala todos los drivers.

**Nota** Instala psycopg, pymysql o pyodbc según destino; SQL Server requiere además configuración ODBC.

#### Comparar prefijos sin conectarse

```python
for url in ["postgresql+psycopg://host/db", "mysql+pymysql://host/db", "mssql+pyodbc://host/db", "sqlite+pysqlite:///:memory:"]:
    print(sa.engine.make_url(url).drivername)
```

Instalar SQLAlchemy no instala todos los drivers.

**Resultado**

```text
postgresql+psycopg
mysql+pymysql
mssql+pyodbc
sqlite+pysqlite
```

### Credenciales y variables de entorno

**Clave** `credenciales-y-variables-de-entorno`

**Definición** Lee secretos fuera del código y pásalos a URL.create().

**Búsqueda** Credenciales y variables de entorno; Leer una configuración de ejemplo

**Para recordar** No uses f-strings para incrustar claves en URLs.

**Nota** En producción configura las variables desde el entorno o un gestor de secretos; no las fijes en el código.

#### Leer una configuración de ejemplo

```python
import os
os.environ["DEMO_DB_USER"] = "analista"
u = sa.URL.create("postgresql+psycopg", username=os.environ["DEMO_DB_USER"], host="localhost", database="ventas")
print(u.username)
```

No uses f-strings para incrustar claves en URLs.

**Resultado**

```text
analista
```

### connect_args, creator y TLS

**Clave** `connect-args-creator-y-tls`

**Definición** connect_args pasa argumentos al driver; creator puede suministrar una conexión DBAPI personalizada. TLS depende del driver.

**Búsqueda** connect_args, creator y TLS; Ajustar timeout de SQLite

**Para recordar** Consulta los argumentos del driver, no hay un SSL universal.

#### Ajustar timeout de SQLite

```python
e = create_engine("sqlite://", connect_args={"timeout": 10})
with e.connect() as conn:
    print(conn.exec_driver_sql("PRAGMA busy_timeout").scalar())
e.dispose()
```

Consulta los argumentos del driver, no hay un SSL universal.

**Resultado**

```text
10000
```

### echo, logging y hide_parameters

**Clave** `echo-logging-y-hide-parameters`

**Definición** echo registra SQL emitido; hide_parameters oculta parámetros en ciertos logs y errores.

**Búsqueda** echo, logging y hide_parameters; Configurar diagnóstico sin imprimir valores

**Para recordar** Ocultar parámetros no protege literales escritos dentro del SQL.

#### Configurar diagnóstico sin imprimir valores

```python
e = create_engine("sqlite://", echo=False, hide_parameters=True)
print(e.echo, e.hide_parameters)
e.dispose()
```

Ocultar parámetros no protege literales escritos dentro del SQL.

**Resultado**

```text
False True
```

### dispose()

**Clave** `dispose`

**Definición** Libera las conexiones inactivas del pool y lo reemplaza. No cancela automáticamente conexiones ya prestadas.

**Búsqueda** dispose(); Desechar un motor de ejemplo

**Para recordar** Cierra conexiones antes de desechar el motor.

**Nota** En SQLite en memoria, desechar el motor puede eliminar los datos. No uses dispose() sobre el dataset compartido.

#### Desechar un motor de ejemplo

```python
e = create_engine("sqlite://")
e.dispose()
print("pool reemplazado")
```

Cierra conexiones antes de desechar el motor.

**Resultado**

```text
pool reemplazado
```

## Connection y SQL textual

**Clave** `connection`

### Definición

**Clave** `definicion`

**Definición** Connection es una conexión prestada por el Engine que permite ejecutar sentencias y controlar transacciones.

**Búsqueda** Definición; Ejecutar una consulta textual

**Para recordar** Usa with para devolver la conexión al pool.

#### Ejecutar una consulta textual

```python
with engine.connect() as conn:
    print(conn.execute(text("SELECT COUNT(*) FROM clientes")).scalar_one())
```

Usa with para devolver la conexión al pool.

**Resultado**

```text
5
```

### connect() y close()

**Clave** `connect-y-close`

**Definición** connect() obtiene una conexión; close() la devuelve al pool y revierte una transacción pendiente.

**Búsqueda** connect() y close(); Comprobar el cierre

**Para recordar** Prefiere el context manager para liberar recursos.

#### Comprobar el cierre

```python
with engine.connect() as conn:
    print(conn.closed)
print(conn.closed)
```

Prefiere el context manager para liberar recursos.

**Resultado**

```text
False
True
```

### text() y execute()

**Clave** `text-y-execute`

**Definición** text() convierte una cadena SQL en una sentencia ejecutable de SQLAlchemy.

**Búsqueda** text() y execute(); Leer nombres con SQL escrito a mano

**Para recordar** execute() no recibe directamente una cadena SQL en 2.0.

#### Leer nombres con SQL escrito a mano

```python
ver(text("SELECT nombre FROM clientes ORDER BY id"))
```

execute() no recibe directamente una cadena SQL en 2.0.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]
```

### exec_driver_sql()

**Clave** `exec-driver-sql`

**Definición** Envía SQL directamente al driver, sin la compilación habitual de expresiones.

**Búsqueda** exec_driver_sql(); Usar un placeholder SQLite

**Para recordar** Los placeholders dependen del DBAPI.

#### Usar un placeholder SQLite

```python
with engine.connect() as conn:
    print(conn.exec_driver_sql("SELECT nombre FROM clientes WHERE id = ?", (2,)).scalar_one())
```

Los placeholders dependen del DBAPI.

**Resultado**

```text
Luis
```

### raw_connection()

**Clave** `raw-connection`

**Definición** Expone una conexión DBAPI proxificada para APIs específicas del driver.

**Búsqueda** raw_connection(); Consultar con cursor DBAPI

**Para recordar** Cierra el cursor y la conexión aunque trabajes fuera de Core.

#### Consultar con cursor DBAPI

```python
raw = engine.raw_connection()
try:
    cur = raw.cursor()
    cur.execute("SELECT COUNT(*) FROM pedidos")
    print(cur.fetchone())
    cur.close()
finally:
    raw.close()
```

Cierra el cursor y la conexión aunque trabajes fuera de Core.

**Resultado**

```text
(7,)
```

### execution_options()

**Clave** `execution-options`

**Definición** Configura opciones de ejecución, como streaming o aislamiento, en el nivel que corresponda.

**Búsqueda** execution_options(); Consultar una opción personalizada

**Para recordar** Las opciones de ejecución no cambian necesariamente el SQL.

#### Consultar una opción personalizada

```python
with engine.connect() as conn:
    conn.execution_options(reporte="ventas")
    print(conn.get_execution_options()["reporte"])
```

Las opciones de ejecución no cambian necesariamente el SQL.

**Resultado**

```text
ventas
```

## Parámetros y seguridad

**Clave** `parametros`

### Definición

**Clave** `definicion`

**Definición** Los parámetros separan el SQL de los valores y permiten que el driver los trate como datos.

**Búsqueda** Definición; Filtrar con parámetro nombrado

**Para recordar** No concatenes entradas del usuario dentro de SQL.

#### Filtrar con parámetro nombrado

```python
ver(text("SELECT nombre FROM clientes WHERE pais = :pais ORDER BY id"), {"pais":"MX"})
```

No concatenes entradas del usuario dentro de SQL.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',)]
```

### bindparam()

**Clave** `bindparam`

**Definición** Crea un parámetro reutilizable en una expresión de Core o textual.

**Búsqueda** bindparam(); Consultar un umbral variable

**Para recordar** El nombre de bindparam coincide con la clave del diccionario.

#### Consultar un umbral variable

```python
stmt = select(pedidos.c.id).where(pedidos.c.monto >= bindparam("minimo")).order_by(pedidos.c.id)
ver(stmt, {"minimo":200})
```

El nombre de bindparam coincide con la clave del diccionario.

**Resultado**

```text
('id',)
[(102,), (103,), (105,)]
```

### bindparams() y columns()

**Clave** `bindparams-y-columns`

**Definición** bindparams() define parámetros de text(); columns() declara columnas y tipos del resultado textual.

**Búsqueda** bindparams() y columns(); Declarar una columna textual

**Para recordar** Usa tipos explícitos cuando necesites procesamiento de resultados.

#### Declarar una columna textual

```python
stmt = text("SELECT monto FROM pedidos WHERE id=:id").bindparams(id=101).columns(monto=Integer)
valor(stmt)
```

Usa tipos explícitos cuando necesites procesamiento de resultados.

**Resultado**

```text
100
```

### expanding=True

**Clave** `expanding-true`

**Definición** Expande un parámetro que contiene una lista para una condición IN.

**Búsqueda** expanding=True; Filtrar varios clientes dinámicamente

**Para recordar** No concatena los elementos manualmente; no sirve para executemany.

#### Filtrar varios clientes dinámicamente

```python
stmt = select(clientes.c.nombre).where(clientes.c.id.in_(bindparam("ids", expanding=True))).order_by(clientes.c.id)
ver(stmt, {"ids":[1,3]})
```

No concatena los elementos manualmente; no sirve para executemany.

**Resultado**

```text
('nombre',)
[('Ana',), ('Marta',)]
```

### SQL injection e identificadores

**Clave** `sql-injection-e-identificadores`

**Definición** Los parámetros protegen valores, no nombres de tablas ni columnas. Elige identificadores desde una lista permitida.

**Búsqueda** SQL injection e identificadores; Tratar una entrada maliciosa como valor literal

**Para recordar** No interpoles identificadores externos sin validarlos.

#### Tratar una entrada maliciosa como valor literal

```python
entrada = "MX' OR 1=1 --"
ver(text("SELECT nombre FROM clientes WHERE pais = :p"), {"p":entrada})
```

No interpoles identificadores externos sin validarlos.

**Resultado**

```text
('nombre',)
[]
```

### Identificadores dinámicos permitidos

**Clave** `identificadores-dinamicos-permitidos`

**Definición** Un mapa de columnas válidas permite construir consultas dinámicas sin interpolar SQL.

**Búsqueda** Identificadores dinámicos permitidos; Ordenar por una columna permitida

**Para recordar** Rechaza cualquier nombre que no esté permitido.

#### Ordenar por una columna permitida

```python
permitidas = {"nombre":clientes.c.nombre, "id":clientes.c.id}
campo = "nombre"
ver(select(clientes.c.nombre).order_by(permitidas[campo]))
```

Rechaza cualquier nombre que no esté permitido.

**Resultado**

```text
('nombre',)
[('Ana',), ('Eva',), ('Luis',), ('Marta',), ('Noa',)]
```

## Result, Row y recuperación

**Clave** `resultados`

### Definición

**Clave** `definicion`

**Definición** execute() devuelve un Result que permite leer filas, columnas o valores escalares. Consume los datos mientras la conexión esté disponible.

**Búsqueda** Definición; Leer una fila

**Para recordar** Result es el cursor de resultados; Row representa una fila.

#### Leer una fila

```python
with engine.connect() as conn:
    row = conn.execute(select(clientes.c.id, clientes.c.nombre).order_by(clientes.c.id)).first()
    print(tuple(row))
```

Result es el cursor de resultados; Row representa una fila.

**Resultado**

```text
(1, 'Ana')
```

### all() y fetchall()

**Clave** `all-y-fetchall`

**Definición** Recuperan las filas restantes como una secuencia. Una lectura completa consume el resultado.

**Búsqueda** all() y fetchall(); Leer todos los nombres

**Para recordar** No llames all() dos veces esperando los mismos datos.

#### Leer todos los nombres

```python
with engine.connect() as conn:
    r = conn.execute(select(clientes.c.nombre).order_by(clientes.c.id))
    print(r.all())
    print(r.fetchall())
```

No llames all() dos veces esperando los mismos datos.

**Resultado**

```text
[('Ana',), ('Luis',), ('Marta',), ('Noa',), ('Eva',)]
[]
```

### fetchone() y fetchmany()

**Clave** `fetchone-y-fetchmany`

**Definición** fetchone() obtiene la siguiente fila; fetchmany(n) lee hasta n filas.

**Búsqueda** fetchone() y fetchmany(); Leer una fila y luego dos

**Para recordar** Cada llamada avanza en el resultado.

#### Leer una fila y luego dos

```python
with engine.connect() as conn:
    r = conn.execute(select(clientes.c.id).order_by(clientes.c.id))
    print(r.fetchone())
    print(r.fetchmany(2))
```

Cada llamada avanza en el resultado.

**Resultado**

```text
(1,)
[(2,), (3,)]
```

### first()

**Clave** `first`

**Definición** Devuelve la primera fila o None y cierra el resultado. No añade LIMIT al SQL automáticamente.

**Búsqueda** first(); Leer el primer cliente

**Para recordar** Para limitar lo que consulta la base usa limit(1).

#### Leer el primer cliente

```python
with engine.connect() as conn:
    print(conn.execute(select(clientes.c.nombre).order_by(clientes.c.id).limit(1)).first())
```

Para limitar lo que consulta la base usa limit(1).

**Resultado**

```text
('Ana',)
```

### one() y one_or_none()

**Clave** `one-y-one-or-none`

**Definición** one() exige exactamente una fila; one_or_none() permite cero o una. Más de una provoca MultipleResultsFound.

**Búsqueda** one() y one_or_none(); Validar una búsqueda única

**Para recordar** Usa one() cuando la unicidad sea un requisito.

#### Validar una búsqueda única

```python
with engine.connect() as conn:
    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==1)).one())
    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).one_or_none())
```

Usa one() cuando la unicidad sea un requisito.

**Resultado**

```text
('Ana',)
None
```

### scalar() y scalars()

**Clave** `scalar-y-scalars`

**Definición** scalar() toma la primera columna de la primera fila; scalars() produce un flujo de valores de una columna.

**Búsqueda** scalar() y scalars(); Obtener IDs como lista

**Para recordar** scalars().all() devuelve valores, no filas.

#### Obtener IDs como lista

```python
with engine.connect() as conn:
    print(conn.execute(select(clientes.c.id).order_by(clientes.c.id)).scalars().all())
    print(conn.execute(select(func.count()).select_from(clientes)).scalar())
```

scalars().all() devuelve valores, no filas.

**Resultado**

```text
[1, 2, 3, 4, 5]
5
```

### scalar_one() y scalar_one_or_none()

**Clave** `scalar-one-y-scalar-one-or-none`

**Definición** Exigen un único valor o permiten que no exista ninguna fila, respectivamente.

**Búsqueda** scalar_one() y scalar_one_or_none(); Buscar una clave inexistente

**Para recordar** No confundir un valor NULL con ausencia de fila.

#### Buscar una clave inexistente

```python
with engine.connect() as conn:
    print(conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).scalar_one_or_none())
```

No confundir un valor NULL con ausencia de fila.

**Resultado**

```text
None
```

### Row, mappings() y _mapping

**Clave** `row-mappings-y-mapping`

**Definición** Row tiene acceso posicional y por atributo; mappings() entrega RowMapping con acceso por clave.

**Búsqueda** Row, mappings() y _mapping; Convertir filas a diccionarios

**Para recordar** dict(row._mapping) convierte una fila en diccionario.

#### Convertir filas a diccionarios

```python
with engine.connect() as conn:
    stmt = select(clientes.c.id, clientes.c.nombre).where(clientes.c.id==1)
    row = conn.execute(stmt).one()
    print(row.nombre, dict(row._mapping), row._asdict())
    print(dict(conn.execute(stmt).mappings().one()))
```

dict(row._mapping) convierte una fila en diccionario.

**Resultado**

```text
Ana {'id': 1, 'nombre': 'Ana'} {'id': 1, 'nombre': 'Ana'}
{'id': 1, 'nombre': 'Ana'}
```

### keys(), columns() y unique()

**Clave** `keys-columns-y-unique`

**Definición** keys() enumera nombres; columns() restringe columnas del resultado; unique() filtra duplicados en Python.

**Búsqueda** keys(), columns() y unique(); Elegir una columna y deduplicar

**Para recordar** unique() no es SELECT DISTINCT.

#### Elegir una columna y deduplicar

```python
with engine.connect() as conn:
    r = conn.execute(select(clientes.c.id, clientes.c.pais).order_by(clientes.c.id))
    print(list(r.keys()))
    print(r.columns("pais").unique().all())
```

unique() no es SELECT DISTINCT.

**Resultado**

```text
['id', 'pais']
[('MX',), ('ES',), (None,)]
```

### partitions(), iteración y close()

**Clave** `partitions-iteracion-y-close`

**Definición** partitions(n) divide el resultado en lotes; close() libera el cursor.

**Búsqueda** partitions(), iteración y close(); Leer IDs por lotes

**Para recordar** Consume por bloques para no construir una lista completa.

#### Leer IDs por lotes

```python
with engine.connect() as conn:
    with conn.execute(select(clientes.c.id).order_by(clientes.c.id)) as r:
        for lote in r.partitions(2):
            print(lote)
```

Consume por bloques para no construir una lista completa.

**Resultado**

```text
[(1,), (2,)]
[(3,), (4,)]
[(5,)]
```

### rowcount y claves insertadas

**Clave** `rowcount-y-claves-insertadas`

**Definición** rowcount suele indicar filas coincidentes para UPDATE/DELETE, si el driver lo soporta. inserted_primary_key informa la clave de un INSERT individual sin RETURNING.

**Búsqueda** rowcount y claves insertadas; Insertar y comprobar clave

**Para recordar** No uses rowcount para contar SELECT.

#### Insertar y comprobar clave

```python
with engine.begin() as conn:
    r = conn.execute(insert(clientes).values(nombre="Sol", alta=date(2026,1,10)))
    print(tuple(r.inserted_primary_key))
    print(conn.execute(update(clientes).where(clientes.c.id==1).values(pais="MX")).rowcount)
```

No uses rowcount para contar SELECT.

**Resultado**

```text
(6,)
1
```

## Transacciones

**Clave** `transacciones`

### Definición

**Clave** `definicion`

**Definición** Una transacción agrupa operaciones que se confirman juntas o se revierten. SQLAlchemy 2.0 inicia una transacción al ejecutar la primera sentencia.

**Búsqueda** Definición; Confirmar un cambio

**Para recordar** commit confirma; rollback descarta los cambios pendientes.

#### Confirmar un cambio

```python
with engine.begin() as conn:
    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=120))
valor(select(pedidos.c.monto).where(pedidos.c.id==101))
```

commit confirma; rollback descarta los cambios pendientes.

**Resultado**

```text
120
```

### Autobegin y begin()

**Clave** `autobegin-y-begin`

**Definición** La primera ejecución activa autobegin. begin() permite delimitar explícitamente una transacción antes de ejecutar.

**Búsqueda** Autobegin y begin(); Inspeccionar el inicio automático

**Para recordar** No llames begin() si ya existe una transacción activa.

#### Inspeccionar el inicio automático

```python
with engine.connect() as conn:
    print(conn.in_transaction())
    conn.execute(text("SELECT 1"))
    print(conn.in_transaction(), conn.get_transaction() is not None)
```

No llames begin() si ya existe una transacción activa.

**Resultado**

```text
False
True True
```

### commit() y rollback()

**Clave** `commit-y-rollback`

**Definición** Con connect() puedes confirmar o revertir explícitamente los cambios.

**Búsqueda** commit() y rollback(); Revertir una modificación

**Para recordar** Salir de connect() sin commit revierte los cambios pendientes.

#### Revertir una modificación

```python
with engine.connect() as conn:
    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))
    conn.rollback()
valor(select(pedidos.c.monto).where(pedidos.c.id==101))
```

Salir de connect() sin commit revierte los cambios pendientes.

**Resultado**

```text
100
```

### engine.begin() y excepciones

**Clave** `engine-begin-y-excepciones`

**Definición** El contexto confirma si termina normalmente y revierte si se propaga una excepción.

**Búsqueda** engine.begin() y excepciones; Cancelar una carga fallida

**Para recordar** Captura excepciones fuera del bloque si quieres que se revierta automáticamente.

#### Cancelar una carga fallida

```python
try:
    with engine.begin() as conn:
        conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))
        raise ValueError("validación fallida")
except ValueError:
    pass
valor(select(pedidos.c.monto).where(pedidos.c.id==101))
```

Captura excepciones fuera del bloque si quieres que se revierta automáticamente.

**Resultado**

```text
100
```

### begin_nested() y savepoints

**Clave** `begin-nested-y-savepoints`

**Definición** Un savepoint permite deshacer una parte de una transacción sin cancelar la exterior.

**Búsqueda** begin_nested() y savepoints; Revertir únicamente el segundo cambio

**Para recordar** Confirma o revierte el objeto savepoint, no conn.commit().

#### Revertir únicamente el segundo cambio

```python
with engine.begin() as conn:
    conn.execute(update(pedidos).where(pedidos.c.id==101).values(monto=120))
    sp = conn.begin_nested()
    conn.execute(update(pedidos).where(pedidos.c.id==102).values(monto=999))
    sp.rollback()
ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.id.in_([101,102])).order_by(pedidos.c.id))
```

Confirma o revierte el objeto savepoint, no conn.commit().

**Resultado**

```text
('id', 'monto')
[(101, 120), (102, 200)]
```

### Aislamiento y AUTOCOMMIT

**Clave** `aislamiento-y-autocommit`

**Definición** El aislamiento controla la visibilidad de cambios concurrentes; AUTOCOMMIT es una opción DBAPI separada del autobegin lógico.

**Búsqueda** Aislamiento y AUTOCOMMIT; Consultar aislamiento SQLite

**Para recordar** Los niveles disponibles dependen del motor. Configúralos antes de iniciar la transacción.

**Nota** PostgreSQL y MySQL ofrecen, entre otros, READ COMMITTED y REPEATABLE READ; SQLite tiene otras reglas. No supongas que todos ofrecen los mismos niveles.

#### Consultar aislamiento SQLite

```python
with engine.connect() as conn:
    print(conn.get_isolation_level())
```

Los niveles disponibles dependen del motor. Configúralos antes de iniciar la transacción.

**Resultado**

```text
SERIALIZABLE
```

## Errores y recuperación

**Clave** `errores`

### Definición

**Clave** `definicion`

**Definición** SQLAlchemy agrupa excepciones propias y del driver en sqlalchemy.exc. Captura la clase que corresponda y revierte antes de continuar una transacción fallida.

**Búsqueda** Definición; Detectar una clave primaria repetida

**Para recordar** Distingue errores de datos, SQL y conexión.

#### Detectar una clave primaria repetida

```python
try:
    with engine.begin() as conn:
        conn.execute(insert(clientes).values(id=1,nombre="Duplicado",alta=date(2026,1,1)))
except sa.exc.IntegrityError:
    print("clave repetida")
```

Distingue errores de datos, SQL y conexión.

**Resultado**

```text
clave repetida
```

### DBAPIError y diagnóstico

**Clave** `dbapierror-y-diagnostico`

**Definición** DBAPIError conserva la excepción original del driver en orig; StatementError expone statement y params cuando corresponden.

**Búsqueda** DBAPIError y diagnóstico; Detectar una tabla inexistente

**Para recordar** No publiques params si contienen información sensible.

#### Detectar una tabla inexistente

```python
try:
    ver(text("SELECT * FROM inexistente"))
except sa.exc.DBAPIError as e:
    print(type(e).__name__, type(e.orig).__name__)
    print(e.statement)
```

No publiques params si contienen información sensible.

**Resultado**

```text
OperationalError OperationalError
SELECT * FROM inexistente
```

### IntegrityError, DataError y ProgrammingError

**Clave** `integrityerror-dataerror-y-programmingerror`

**Definición** IntegrityError indica restricciones; DataError suele indicar valores inválidos y ProgrammingError errores de programación SQL. La clasificación exacta depende del driver.

**Búsqueda** IntegrityError, DataError y ProgrammingError; Detectar una clave foránea inválida

**Para recordar** No supongas que todos los motores clasifican el mismo error igual.

#### Detectar una clave foránea inválida

```python
try:
    with engine.begin() as conn:
        conn.execute(insert(pedidos).values(cliente_id=99,monto=20,fecha=date(2026,3,1),estado="completed"))
except sa.exc.IntegrityError:
    print("cliente inexistente")
```

No supongas que todos los motores clasifican el mismo error igual.

**Resultado**

```text
cliente inexistente
```

### OperationalError, TimeoutError y DisconnectionError

**Clave** `operationalerror-timeouterror-y-disconnectionerror`

**Definición** OperationalError suele envolver fallos operativos del driver; TimeoutError puede venir del pool; DisconnectionError se usa en gestión de conexiones.

**Búsqueda** OperationalError, TimeoutError y DisconnectionError; Simular un fallo operativo controlado

**Para recordar** Reintenta solo fallos transitorios y operaciones seguras; no cualquier excepción.

**Nota** Ejemplo simulado, no representa una caída real de la base.

#### Simular un fallo operativo controlado

```python
try:
    raise sa.exc.OperationalError("SELECT 1", {}, Exception("demo"))
except sa.exc.OperationalError as e:
    print(type(e).__name__)
```

Reintenta solo fallos transitorios y operaciones seguras; no cualquier excepción.

**Resultado**

```text
OperationalError
```

### NoResultFound y MultipleResultsFound

**Clave** `noresultfound-y-multipleresultsfound`

**Definición** one() y scalar_one() fallan si no hay exactamente un resultado.

**Búsqueda** NoResultFound y MultipleResultsFound; Comprobar una búsqueda sin resultado

**Para recordar** Utiliza one_or_none() solo cuando cero filas sea válido.

#### Comprobar una búsqueda sin resultado

```python
try:
    with engine.connect() as conn:
        conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).scalar_one()
except sa.exc.NoResultFound:
    print("no encontrado")
```

Utiliza one_or_none() solo cuando cero filas sea válido.

**Resultado**

```text
no encontrado
```

### StatementError e InvalidRequestError

**Clave** `statementerror-e-invalidrequesterror`

**Definición** StatementError informa errores durante preparación o ejecución de una sentencia; InvalidRequestError indica uso inválido de la API.

**Búsqueda** StatementError e InvalidRequestError; Detectar un parámetro no suministrado

**Para recordar** Inspecciona el mensaje y corrige la causa.

#### Detectar un parámetro no suministrado

```python
try:
    ver(text("SELECT :x"))
except sa.exc.StatementError as e:
    print(type(e.orig).__name__)
```

Inspecciona el mensaje y corrige la causa.

**Resultado**

```text
InvalidRequestError
```

## MetaData, Table y Column

**Clave** `metadatos`

### Definición

**Clave** `definicion`

**Definición** MetaData agrupa definiciones de tablas; Table representa una tabla y Column una columna. Definirlas en Python no crea las tablas por sí solo.

**Búsqueda** Definición; Inspeccionar las columnas compartidas

**Para recordar** El esquema Python describe; create_all() crea.

#### Inspeccionar las columnas compartidas

```python
print(list(clientes.c.keys()))
print(list(metadata.tables))
```

El esquema Python describe; create_all() crea.

**Resultado**

```text
['id', 'nombre', 'pais', 'alta']
['clientes', 'pedidos', 'productos', 'detalles']
```

### Table y Column

**Clave** `table-y-column`

**Definición** Table recibe nombre, metadatos y columnas. Los tipos describen cómo representar datos.

**Búsqueda** Table y Column; Definir una tabla de referencia

**Para recordar** Accede a columnas mediante tabla.c.nombre.

#### Definir una tabla de referencia

```python
m = MetaData()
t = Table("regiones", m, Column("id", Integer, primary_key=True), Column("nombre", String(50)))
print(t.name, list(t.c.keys()))
```

Accede a columnas mediante tabla.c.nombre.

**Resultado**

```text
regiones ['id', 'nombre']
```

### create_all() y drop_all()

**Clave** `create-all-y-drop-all`

**Definición** create_all() crea tablas ausentes en orden de dependencias; drop_all() elimina las tablas del metadata.

**Búsqueda** create_all() y drop_all(); Crear y eliminar una tabla aislada

**Para recordar** create_all() no migra estructuras existentes. No elimines tablas de producción.

#### Crear y eliminar una tabla aislada

```python
m = MetaData()
Table("temporal_demo", m, Column("id", Integer, primary_key=True))
m.create_all(engine)
print(inspect(engine).has_table("temporal_demo"))
m.drop_all(engine)
print(inspect(engine).has_table("temporal_demo"))
```

create_all() no migra estructuras existentes. No elimines tablas de producción.

**Resultado**

```text
True
False
```

### schema y naming_convention

**Clave** `schema-y-naming-convention`

**Definición** schema indica el espacio de nombres de la tabla; naming_convention genera nombres estables para restricciones.

**Búsqueda** schema y naming_convention; Nombrar una restricción automáticamente

**Para recordar** La disponibilidad de schemas depende del motor.

#### Nombrar una restricción automáticamente

```python
m = MetaData(naming_convention={"pk":"pk_%(table_name)s"})
t = Table("regiones", m, Column("id", Integer, primary_key=True))
print(t.primary_key.name)
```

La disponibilidad de schemas depende del motor.

**Resultado**

```text
pk_regiones
```

### DDL explícito y ALTER TABLE

**Clave** `ddl-explicito-y-alter-table`

**Definición** CreateTable y DropTable representan DDL. Para cambios de esquema usa SQL del dialecto o Alembic.

**Búsqueda** DDL explícito y ALTER TABLE; Generar el DDL sin ejecutarlo

**Para recordar** No existe una operación Core universal de ALTER TABLE para todas las modificaciones.

#### Generar el DDL sin ejecutarlo

```python
from sqlalchemy.schema import CreateTable
print(str(CreateTable(clientes).compile(dialect=engine.dialect)).strip())
```

No existe una operación Core universal de ALTER TABLE para todas las modificaciones.

**Resultado**

```text
CREATE TABLE clientes (
	id INTEGER NOT NULL, 
	nombre VARCHAR(60) NOT NULL, 
	pais VARCHAR(30), 
	alta DATE NOT NULL, 
	PRIMARY KEY (id)
)
```

## Tipos de datos y conversiones

**Clave** `tipos`

### Definición

**Clave** `definicion`

**Definición** Los tipos de SQLAlchemy describen columnas y convierten valores entre Python y la base. Algunos son portables; otros son específicos de un dialecto.

**Búsqueda** Definición; Consultar los tipos de las columnas

**Para recordar** Elige el tipo por significado, no solo por cómo se muestra.

#### Consultar los tipos de las columnas

```python
print([(c.name, str(c.type)) for c in pedidos.c])
```

Elige el tipo por significado, no solo por cómo se muestra.

**Resultado**

```text
[('id', 'INTEGER'), ('cliente_id', 'INTEGER'), ('monto', 'INTEGER'), ('fecha', 'DATE'), ('estado', 'VARCHAR(20)'), ('cupon', 'VARCHAR(20)')]
```

### Integer, BigInteger, Float y Numeric

**Clave** `integer-biginteger-float-y-numeric`

**Definición** Integer y sus variantes son enteros; Float aproxima; Numeric permite precisión y escala decimal.

**Búsqueda** Integer, BigInteger, Float y Numeric; Declarar precisión y escala

**Para recordar** Para dinero evita Float cuando necesitas exactitud decimal.

#### Declarar precisión y escala

```python
t = Numeric(12,2)
print(t.precision,t.scale,t.asdecimal)
```

Para dinero evita Float cuando necesitas exactitud decimal.

**Resultado**

```text
12 2 True
```

### String, Text, CHAR y Unicode

**Clave** `string-text-char-y-unicode`

**Definición** String puede limitar longitud; Text permite texto largo; CHAR expresa longitud fija; Unicode y UnicodeText documentan texto Unicode.

**Búsqueda** String, Text, CHAR y Unicode; Ver tipos declarados

**Para recordar** Las restricciones de longitud dependen del motor.

#### Ver tipos declarados

```python
print([str(t) for t in [String(30),sa.Text(),sa.CHAR(2),sa.Unicode(50),sa.UnicodeText()]])
```

Las restricciones de longitud dependen del motor.

**Resultado**

```text
['VARCHAR(30)', 'TEXT', 'CHAR(2)', 'VARCHAR(50)', 'TEXT']
```

### Date, DateTime, Time y Interval

**Clave** `date-datetime-time-y-interval`

**Definición** Los tipos temporales representan fechas, instantes, horas y duraciones. DateTime(timezone=True) solicita soporte de zona horaria.

**Búsqueda** Date, DateTime, Time y Interval; Leer una fecha como objeto Python

**Para recordar** El soporte de zonas y duraciones depende del dialecto.

#### Leer una fecha como objeto Python

```python
with engine.connect() as conn:
    v=conn.execute(select(pedidos.c.fecha).where(pedidos.c.id==101)).scalar_one()
    print(v.isoformat(), type(v).__name__)
```

El soporte de zonas y duraciones depende del dialecto.

**Resultado**

```text
2026-02-01 date
```

### Boolean, Enum, LargeBinary y Uuid

**Clave** `boolean-enum-largebinary-y-uuid`

**Definición** Boolean expresa verdadero/falso; Enum restringe opciones según configuración; LargeBinary representa bytes; Uuid permite UUID portables.

**Búsqueda** Boolean, Enum, LargeBinary y Uuid; Crear tipos de una tabla auxiliar

**Para recordar** El tipo UUID de SQLAlchemy requiere considerar el soporte nativo del motor.

#### Crear tipos de una tabla auxiliar

```python
print([str(t) for t in [sa.Boolean(),sa.Enum("nuevo","activo"),sa.LargeBinary(),sa.Uuid()]])
```

El tipo UUID de SQLAlchemy requiere considerar el soporte nativo del motor.

**Resultado**

```text
['BOOLEAN', 'VARCHAR(6)', 'BLOB', 'CHAR(32)']
```

### JSON y ARRAY

**Clave** `json-y-array`

**Definición** JSON representa datos estructurados; ARRAY tiene soporte principalmente en PostgreSQL dentro de los dialectos incluidos.

**Búsqueda** JSON y ARRAY; Guardar y leer JSON

**Para recordar** No asumas que SQLite o MySQL soportan ARRAY de Core.

#### Guardar y leer JSON

```python
m=MetaData()
t=Table("eventos",m,Column("id",Integer,primary_key=True),Column("datos",sa.JSON))
m.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(t).values(id=1,datos={"canal":"web"}))
valor(select(t.c.datos["canal"].as_string()))
```

No asumas que SQLite o MySQL soportan ARRAY de Core.

**Resultado**

```text
web
```

### cast() y type_coerce()

**Clave** `cast-y-type-coerce`

**Definición** cast() emite CAST en SQL; type_coerce() cambia la interpretación de tipo sin emitir CAST.

**Búsqueda** cast() y type_coerce(); Convertir un monto a texto

**Para recordar** type_coerce() no convierte por sí mismo el dato en la base.

#### Convertir un monto a texto

```python
ver(select(cast(pedidos.c.monto,String).label("texto")).where(pedidos.c.id==101))
print(select(sa.type_coerce(pedidos.c.monto,Integer)))
```

type_coerce() no convierte por sí mismo el dato en la base.

**Resultado**

```text
('texto',)
[('100',)]
SELECT pedidos.monto AS monto 
FROM pedidos
```

### with_variant() y tipos por dialecto

**Clave** `with-variant-y-tipos-por-dialecto`

**Definición** with_variant() selecciona una variante de tipo para un dialecto determinado.

**Búsqueda** with_variant() y tipos por dialecto; Compilar un tipo distinto en PostgreSQL

**Para recordar** Úsalo cuando una definición portable necesita una excepción.

#### Compilar un tipo distinto en PostgreSQL

```python
from sqlalchemy.dialects import postgresql
t = String(40).with_variant(sa.Text(),"postgresql")
print(t.compile(dialect=engine.dialect),t.compile(dialect=postgresql.dialect()))
```

Úsalo cuando una definición portable necesita una excepción.

**Resultado**

```text
VARCHAR(40) TEXT
```

## Restricciones, defaults e índices

**Clave** `restricciones`

### Definición

**Clave** `definicion`

**Definición** Las restricciones protegen integridad: claves, unicidad, nulos y condiciones. Los índices ayudan a localizar filas y pueden imponer unicidad.

**Búsqueda** Definición; Inspeccionar claves existentes

**Para recordar** Una restricción de la base protege incluso escrituras externas a Python.

#### Inspeccionar claves existentes

```python
i=inspect(engine)
print(i.get_pk_constraint("clientes")["constrained_columns"])
print(i.get_foreign_keys("pedidos")[0]["referred_table"])
```

Una restricción de la base protege incluso escrituras externas a Python.

**Resultado**

```text
['id']
clientes
```

### PRIMARY KEY, UNIQUE y NOT NULL

**Clave** `primary-key-unique-y-not-null`

**Definición** primary_key identifica filas; unique evita duplicados; nullable=False impide NULL.

**Búsqueda** PRIMARY KEY, UNIQUE y NOT NULL; Declarar restricciones de una tabla

**Para recordar** La clave primaria puede ser compuesta.

#### Declarar restricciones de una tabla

```python
m=MetaData()
t=Table("usuarios",m,Column("id",Integer,primary_key=True),Column("email",String,unique=True,nullable=False))
print(t.c.id.primary_key,t.c.email.unique,t.c.email.nullable)
```

La clave primaria puede ser compuesta.

**Resultado**

```text
True True False
```

### ForeignKey, claves compuestas y CASCADE

**Clave** `foreignkey-claves-compuestas-y-cascade`

**Definición** ForeignKey enlaza una columna; ForeignKeyConstraint permite enlazar varias. ondelete y onupdate describen acciones de la base.

**Búsqueda** ForeignKey, claves compuestas y CASCADE; Inspeccionar una clave foránea

**Para recordar** CASCADE de la base no equivale a cascade del ORM.

**Nota** Ejemplo de configuración: ForeignKey("clientes.id", ondelete="CASCADE"). En SQLite activa PRAGMA foreign_keys, como en la preparación.

#### Inspeccionar una clave foránea

```python
fk=next(iter(pedidos.c.cliente_id.foreign_keys))
print(fk.target_fullname)
```

CASCADE de la base no equivale a cascade del ORM.

**Resultado**

```text
clientes.id
```

### CheckConstraint y UniqueConstraint

**Clave** `checkconstraint-y-uniqueconstraint`

**Definición** CheckConstraint valida condiciones; UniqueConstraint declara unicidad de una o varias columnas.

**Búsqueda** CheckConstraint y UniqueConstraint; Crear restricciones de negocio

**Para recordar** Las restricciones compuestas se declaran sobre Table.

#### Crear restricciones de negocio

```python
m=MetaData()
t=Table("tarifas",m,Column("zona",String),Column("producto",String),Column("precio",Integer),sa.UniqueConstraint("zona","producto",name="uq_tarifa"),sa.CheckConstraint("precio >= 0",name="ck_precio"))
print(sorted(c.name for c in t.constraints if c.name))
```

Las restricciones compuestas se declaran sobre Table.

**Resultado**

```text
['ck_precio', 'uq_tarifa']
```

### default, server_default y onupdate

**Clave** `default-server-default-y-onupdate`

**Definición** default y onupdate se aplican al emitir DML desde SQLAlchemy; server_default forma parte del DDL. server_onupdate describe valores generados por el servidor.

**Búsqueda** default, server_default y onupdate; Insertar usando valores por defecto

**Para recordar** El default no reemplaza un NULL enviado explícitamente.

#### Insertar usando valores por defecto

```python
m=MetaData()
t=Table("lotes",m,Column("id",Integer,primary_key=True),Column("estado",String,default="nuevo"),Column("origen",String,server_default="web"))
m.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(t).values(id=1))
ver(select(t))
```

El default no reemplaza un NULL enviado explícitamente.

**Resultado**

```text
('id', 'estado', 'origen')
[(1, 'nuevo', 'web')]
```

### Identity, Sequence y autoincrement

**Clave** `identity-sequence-y-autoincrement`

**Definición** Configuran generación de claves según el dialecto. Una PK entera en SQLite suele generar el ID si se omite.

**Búsqueda** Identity, Sequence y autoincrement; Generar una clave automáticamente

**Para recordar** Identity y Sequence no se comportan igual en todos los motores.

#### Generar una clave automáticamente

```python
with engine.begin() as conn:
    r=conn.execute(insert(clientes).values(nombre="Sol",alta=date(2026,1,9)))
    print(tuple(r.inserted_primary_key))
```

Identity y Sequence no se comportan igual en todos los motores.

**Resultado**

```text
(6,)
```

### Computed()

**Clave** `computed`

**Definición** Declara una columna generada por la base a partir de una expresión.

**Búsqueda** Computed(); Calcular un importe en la base

**Para recordar** No envíes un valor propio para una columna generada.

**Nota** Requiere SQLite 3.31+ para columnas generadas; verifica la sintaxis en otros motores.

#### Calcular un importe en la base

```python
m=MetaData()
t=Table("lineas_demo",m,Column("cantidad",Integer),Column("precio",Integer),Column("total",Integer,sa.Computed("cantidad * precio")))
m.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(t).values(cantidad=3,precio=20))
valor(select(t.c.total))
```

No envíes un valor propio para una columna generada.

**Resultado**

```text
60
```

### Index() e índices compuestos

**Clave** `index-e-indices-compuestos`

**Definición** Index declara un índice de una o varias columnas; unique=True impone unicidad.

**Búsqueda** Index() e índices compuestos; Crear e inspeccionar un índice

**Para recordar** El orden de columnas influye en qué filtros puede aprovechar el motor.

#### Crear e inspeccionar un índice

```python
idx=sa.Index("ix_pedidos_cliente_fecha",pedidos.c.cliente_id,pedidos.c.fecha)
idx.create(engine)
print([(i["name"],i["column_names"]) for i in inspect(engine).get_indexes("pedidos")])
idx.drop(engine)
```

El orden de columnas influye en qué filtros puede aprovechar el motor.

**Resultado**

```text
[('ix_pedidos_cliente_fecha', ['cliente_id', 'fecha'])]
```

## Reflection e Inspector

**Clave** `reflection`

### Definición

**Clave** `definicion`

**Definición** Reflection reconstruye definiciones de tablas existentes desde la base. inspect() permite consultar metadatos sin definir modelos.

**Búsqueda** Definición; Descubrir tablas

**Para recordar** Usa reflection cuando la base ya existe.

#### Descubrir tablas

```python
print(sorted(inspect(engine).get_table_names()))
```

Usa reflection cuando la base ya existe.

**Resultado**

```text
['clientes', 'detalles', 'pedidos', 'productos']
```

### autoload_with

**Clave** `autoload-with`

**Definición** Carga una sola tabla usando su nombre y el Engine.

**Búsqueda** autoload_with; Reflejar pedidos y consultar sus columnas

**Para recordar** No es necesario declarar las columnas manualmente.

#### Reflejar pedidos y consultar sus columnas

```python
t=Table("pedidos",MetaData(),autoload_with=engine)
print(list(t.c.keys()))
```

No es necesario declarar las columnas manualmente.

**Resultado**

```text
['id', 'cliente_id', 'monto', 'fecha', 'estado', 'cupon']
```

### metadata.reflect()

**Clave** `metadata-reflect`

**Definición** Refleja varias tablas de la base en un MetaData.

**Búsqueda** metadata.reflect(); Reflejar clientes y pedidos

**Para recordar** Usa only para limitar las tablas si la base es grande.

#### Reflejar clientes y pedidos

```python
m=MetaData()
m.reflect(engine,only=["clientes","pedidos"])
print(sorted(m.tables))
```

Usa only para limitar las tablas si la base es grande.

**Resultado**

```text
['clientes', 'pedidos']
```

### get_columns() y get_foreign_keys()

**Clave** `get-columns-y-get-foreign-keys`

**Definición** Inspector devuelve descripciones de columnas y relaciones.

**Búsqueda** get_columns() y get_foreign_keys(); Consultar columnas y destino de FK

**Para recordar** No confundas el nombre de la clave con las columnas que la forman.

#### Consultar columnas y destino de FK

```python
i=inspect(engine)
print([c["name"] for c in i.get_columns("pedidos")])
print(i.get_foreign_keys("pedidos")[0]["constrained_columns"])
```

No confundas el nombre de la clave con las columnas que la forman.

**Resultado**

```text
['id', 'cliente_id', 'monto', 'fecha', 'estado', 'cupon']
['cliente_id']
```

### Vistas e índices

**Clave** `vistas-e-indices`

**Definición** get_view_names(), get_view_definition() y get_indexes() permiten explorar objetos existentes.

**Búsqueda** Vistas e índices; Crear y descubrir una vista

**Para recordar** Una vista reflejada no implica que tenga una clave primaria declarada.

#### Crear y descubrir una vista

```python
with engine.begin() as conn:
    conn.execute(text("CREATE VIEW ventas AS SELECT id,monto FROM pedidos"))
i=inspect(engine)
print(i.get_view_names())
print(i.get_view_definition("ventas"))
```

Una vista reflejada no implica que tenga una clave primaria declarada.

**Resultado**

```text
['ventas']
CREATE VIEW ventas AS SELECT id,monto FROM pedidos
```

### Reflection parcial y extend_existing

**Clave** `reflection-parcial-y-extend-existing`

**Definición** include_columns limita las columnas que se reflejan; extend_existing permite actualizar una definición ya registrada.

**Búsqueda** Reflection parcial y extend_existing; Reflejar únicamente id y monto

**Para recordar** No sobrescribas metadatos existentes sin intención.

#### Reflejar únicamente id y monto

```python
t=Table("pedidos",MetaData(),autoload_with=engine,include_columns=["id","monto"])
print(list(t.c.keys()))
```

No sobrescribas metadatos existentes sin intención.

**Resultado**

```text
['id', 'monto']
```

## select() y expresiones

**Clave** `select`

### Definición

**Clave** `definicion`

**Definición** select() construye una sentencia SELECT sin ejecutarla. Pasa columnas o tablas y después ejecuta mediante Connection.

**Búsqueda** Definición; Consultar todos los productos

**Para recordar** Construir no es ejecutar.

#### Consultar todos los productos

```python
ver(select(productos).order_by(productos.c.id))
```

Construir no es ejecutar.

**Resultado**

```text
('id', 'nombre', 'categoria', 'precio')
[(1, 'Mouse', 'Tech', 100), (2, 'Teclado', 'Tech', 200), (3, 'Silla', 'Hogar', 300)]
```

### Columnas concretas y .c

**Clave** `columnas-concretas-y-c`

**Definición** La colección .c contiene las columnas de Table. Selecciona solo las que necesitas.

**Búsqueda** Columnas concretas y .c; Mostrar nombre y precio

**Para recordar** select(tabla) pide todas sus columnas.

#### Mostrar nombre y precio

```python
ver(select(productos.c.nombre,productos.c.precio).order_by(productos.c.id))
```

select(tabla) pide todas sus columnas.

**Resultado**

```text
('nombre', 'precio')
[('Mouse', 100), ('Teclado', 200), ('Silla', 300)]
```

### select_from()

**Clave** `select-from`

**Definición** Determina el origen FROM explícitamente. Es útil si solo seleccionas una expresión o si necesitas controlar el join.

**Búsqueda** select_from(); Contar clientes

**Para recordar** select(func.count()) necesita un FROM para contar una tabla.

#### Contar clientes

```python
valor(select(func.count()).select_from(clientes))
```

select(func.count()) necesita un FROM para contar una tabla.

**Resultado**

```text
5
```

### label() y alias()

**Clave** `label-y-alias`

**Definición** label() nombra una columna calculada; alias() da otro nombre a una tabla o subconsulta.

**Búsqueda** label() y alias(); Nombrar un importe

**Para recordar** label modifica la columna del resultado; alias identifica el origen.

#### Nombrar un importe

```python
p=pedidos.alias("p")
ver(select(p.c.id,p.c.monto.label("importe")).where(p.c.id==101))
```

label modifica la columna del resultado; alias identifica el origen.

**Resultado**

```text
('id', 'importe')
[(101, 100)]
```

### literal(), literal_column() y column()

**Clave** `literal-literal-column-y-column`

**Definición** literal() representa un valor parametrizado; literal_column() representa SQL escrito literalmente; column() crea una referencia de columna sin tabla.

**Búsqueda** literal(), literal_column() y column(); Combinar una constante y una expresión

**Para recordar** No pases texto de usuario a literal_column().

#### Combinar una constante y una expresión

```python
ver(select(literal("MX").label("pais"),sa.literal_column("2 + 3").label("total")))
print(select(sa.column("monto")))
```

No pases texto de usuario a literal_column().

**Resultado**

```text
('pais', 'total')
[('MX', 5)]
SELECT monto
```

### true(), false() y null()

**Clave** `true-false-y-null`

**Definición** Estas funciones crean constantes SQL booleanas y NULL.

**Búsqueda** true(), false() y null(); Construir constantes SQL

**Para recordar** None puede convertirse a NULL mediante expresiones tipadas.

#### Construir constantes SQL

```python
ver(select(sa.true().label("si"),sa.false().label("no"),sa.null().label("ausente")))
```

None puede convertirse a NULL mediante expresiones tipadas.

**Resultado**

```text
('si', 'no', 'ausente')
[(True, False, None)]
```

### add_columns() y with_only_columns()

**Clave** `add-columns-y-with-only-columns`

**Definición** add_columns() añade expresiones; with_only_columns() sustituye la selección. Devuelven otra sentencia.

**Búsqueda** add_columns() y with_only_columns(); Ampliar y reducir una consulta

**Para recordar** Guarda el resultado de cada transformación.

#### Ampliar y reducir una consulta

```python
s=select(productos.c.nombre)
ver(s.add_columns(productos.c.precio).order_by(productos.c.id))
ver(s.with_only_columns(productos.c.id).order_by(productos.c.id))
```

Guarda el resultado de cada transformación.

**Resultado**

```text
('nombre', 'precio')
[('Mouse', 100), ('Teclado', 200), ('Silla', 300)]
('id',)
[(1,), (2,), (3,)]
```

## Filtros y operadores

**Clave** `filtros`

### Definición

**Clave** `definicion`

**Definición** where() filtra filas con expresiones SQL construidas mediante columnas y operadores Python sobrecargados.

**Búsqueda** Definición; Pedidos de al menos 200

**Para recordar** == construye comparación SQL, no modifica los datos.

#### Pedidos de al menos 200

```python
ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto>=200).order_by(pedidos.c.id))
```

== construye comparación SQL, no modifica los datos.

**Resultado**

```text
('id', 'monto')
[(102, 200), (103, 200), (105, 300)]
```

### Comparaciones y fechas

**Clave** `comparaciones-y-fechas`

**Definición** ==, !=, >, >=, < y <= construyen comparaciones. Para columnas Date usa objetos date.

**Búsqueda** Comparaciones y fechas; Pedidos desde marzo

**Para recordar** Compara valores del tipo adecuado.

#### Pedidos desde marzo

```python
ver(select(pedidos.c.id).where(pedidos.c.fecha>=date(2026,3,1)).order_by(pedidos.c.id))
```

Compara valores del tipo adecuado.

**Resultado**

```text
('id',)
[(105,), (106,), (107,)]
```

### and_(), or_() y not_()

**Clave** `and-or-y-not`

**Definición** Combinan condiciones lógicas; varias llamadas where() se combinan con AND.

**Búsqueda** and_(), or_() y not_(); Filtrar completados y de monto alto

**Para recordar** Usa paréntesis o funciones para definir precedencia.

#### Filtrar completados y de monto alto

```python
ver(select(pedidos.c.id).where(and_(pedidos.c.estado=="completed",pedidos.c.monto>=200)).order_by(pedidos.c.id))
```

Usa paréntesis o funciones para definir precedencia.

**Resultado**

```text
('id',)
[(102,), (103,), (105,)]
```

### Operadores &, | y ~

**Clave** `operadores-y`

**Definición** & representa AND, | representa OR y ~ negación. No uses and, or ni not de Python sobre expresiones SQL.

**Búsqueda** Operadores &, | y ~; Excluir pedidos pequeños y cancelados

**Para recordar** Encierra cada comparación entre paréntesis.

#### Excluir pedidos pequeños y cancelados

```python
ver(select(pedidos.c.id).where((pedidos.c.monto>=100) & ~(pedidos.c.estado=="cancelled")).order_by(pedidos.c.id))
```

Encierra cada comparación entre paréntesis.

**Resultado**

```text
('id',)
[(101,), (102,), (103,), (105,), (106,)]
```

### in_() y not_in()

**Clave** `in-y-not-in`

**Definición** in_() compara contra una lista o subconsulta; not_in() la niega.

**Búsqueda** in_() y not_in(); Consultar dos países

**Para recordar** NOT IN con NULL requiere cuidado por la lógica SQL de tres valores.

#### Consultar dos países

```python
ver(select(clientes.c.nombre).where(clientes.c.pais.in_(["MX","ES"])).order_by(clientes.c.id))
```

NOT IN con NULL requiere cuidado por la lógica SQL de tres valores.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',), ('Marta',), ('Eva',)]
```

### between()

**Clave** `between`

**Definición** between(a,b) incluye ambos extremos. Usa ~ para negar la condición.

**Búsqueda** between(); Pedidos en un rango

**Para recordar** 100 y 200 también entran en BETWEEN 100 AND 200.

#### Pedidos en un rango

```python
ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto.between(100,200)).order_by(pedidos.c.id))
```

100 y 200 también entran en BETWEEN 100 AND 200.

**Resultado**

```text
('id', 'monto')
[(101, 100), (102, 200), (103, 200), (106, 100)]
```

### like() e ilike()

**Clave** `like-e-ilike`

**Definición** like() usa patrones % y _; ilike() pide comparación sin distinción de mayúsculas según el dialecto.

**Búsqueda** like() e ilike(); Buscar nombres con A al inicio

**Para recordar** La sensibilidad de LIKE depende de la base y collation.

#### Buscar nombres con A al inicio

```python
ver(select(clientes.c.nombre).where(clientes.c.nombre.ilike("a%")).order_by(clientes.c.id))
```

La sensibilidad de LIKE depende de la base y collation.

**Resultado**

```text
('nombre',)
[('Ana',)]
```

### contains(), startswith() y endswith()

**Clave** `contains-startswith-y-endswith`

**Definición** Construyen patrones LIKE para contenido, prefijo y sufijo. autoescape=True trata % y _ de la entrada como caracteres literales.

**Búsqueda** contains(), startswith() y endswith(); Buscar productos con prefijo M

**Para recordar** Son expresiones SQL, no métodos str de Python.

#### Buscar productos con prefijo M

```python
ver(select(productos.c.nombre).where(productos.c.nombre.startswith("M",autoescape=True)))
```

Son expresiones SQL, no métodos str de Python.

**Resultado**

```text
('nombre',)
[('Mouse',)]
```

### tuple_(), any_() y all_()

**Clave** `tuple-any-y-all`

**Definición** tuple_() compara combinaciones de columnas; any_() y all_() construyen comparaciones cuantificadas según soporte del motor.

**Búsqueda** tuple_(), any_() y all_(); Filtrar pares cliente y monto

**Para recordar** ANY/ALL no son equivalentes a una lista Python de condiciones.

**Nota** tuple IN se admite en SQLite moderno, PostgreSQL y MySQL; ANY/ALL dependen del dialecto, por ejemplo PostgreSQL con arrays o subconsultas.

#### Filtrar pares cliente y monto

```python
ver(select(pedidos.c.id).where(sa.tuple_(pedidos.c.cliente_id,pedidos.c.monto).in_([(1,100),(3,300)])).order_by(pedidos.c.id))
```

ANY/ALL no son equivalentes a una lista Python de condiciones.

**Resultado**

```text
('id',)
[(101,), (105,)]
```

## NULL y condicionales

**Clave** `null-condiciones`

### Definición

**Clave** `definicion`

**Definición** NULL representa ausencia de valor. Usa is_(None), is_not(None), coalesce(), nullif() y case() para consultas que lo contemplen.

**Búsqueda** Definición; Encontrar clientes sin país

**Para recordar** NULL no es cero ni cadena vacía.

#### Encontrar clientes sin país

```python
ver(select(clientes.c.nombre).where(clientes.c.pais.is_(None)))
```

NULL no es cero ni cadena vacía.

**Resultado**

```text
('nombre',)
[('Noa',)]
```

### is_() e is_not()

**Clave** `is-e-is-not`

**Definición** is_(None) genera IS NULL; is_not(None) genera IS NOT NULL. == None y != None también se traducen, pero la forma explícita es clara.

**Búsqueda** is_() e is_not(); Seleccionar pedidos con cupón

**Para recordar** No uses Python is None para construir filtros SQL.

#### Seleccionar pedidos con cupón

```python
ver(select(pedidos.c.id).where(pedidos.c.cupon.is_not(None)).order_by(pedidos.c.id))
```

No uses Python is None para construir filtros SQL.

**Resultado**

```text
('id',)
[(102,), (105,)]
```

### func.coalesce()

**Clave** `func-coalesce`

**Definición** Devuelve el primer argumento no NULL.

**Búsqueda** func.coalesce(); Mostrar país desconocido

**Para recordar** El reemplazo afecta el resultado, no los datos almacenados.

#### Mostrar país desconocido

```python
ver(select(clientes.c.nombre,func.coalesce(clientes.c.pais,"Sin país").label("pais")).order_by(clientes.c.id))
```

El reemplazo afecta el resultado, no los datos almacenados.

**Resultado**

```text
('nombre', 'pais')
[('Ana', 'MX'), ('Luis', 'MX'), ('Marta', 'ES'), ('Noa', 'Sin país'), ('Eva', 'ES')]
```

### func.nullif()

**Clave** `func-nullif`

**Definición** Devuelve NULL si ambos valores son iguales; si no, devuelve el primero.

**Búsqueda** func.nullif(); Evitar división por cero

**Para recordar** Protege denominadores que podrían valer cero.

#### Evitar división por cero

```python
valor(select(literal(100)/func.nullif(0,0)))
```

Protege denominadores que podrían valer cero.

**Resultado**

```text
None
```

### case()

**Clave** `case`

**Definición** Construye CASE WHEN con pares condición y resultado, más else_.

**Búsqueda** case(); Clasificar montos

**Para recordar** La primera condición verdadera gana.

#### Clasificar montos

```python
segmento=case((pedidos.c.monto>=200,"Alto"),else_="Bajo")
ver(select(pedidos.c.id,segmento.label("segmento")).order_by(pedidos.c.id))
```

La primera condición verdadera gana.

**Resultado**

```text
('id', 'segmento')
[(101, 'Bajo'), (102, 'Alto'), (103, 'Alto'), (104, 'Bajo'), (105, 'Alto'), (106, 'Bajo'), (107, 'Bajo')]
```

## Ordenamiento, paginación y valores únicos

**Clave** `orden-paginacion`

### Definición

**Clave** `definicion`

**Definición** order_by() ordena; limit() limita filas y offset() omite filas iniciales. distinct() elimina filas duplicadas del resultado.

**Búsqueda** Definición; Mostrar los dos pedidos de mayor monto

**Para recordar** Usa un orden estable antes de paginar.

#### Mostrar los dos pedidos de mayor monto

```python
ver(select(pedidos.c.id,pedidos.c.monto).order_by(pedidos.c.monto.desc(),pedidos.c.id).limit(2))
```

Usa un orden estable antes de paginar.

**Resultado**

```text
('id', 'monto')
[(105, 300), (102, 200)]
```

### asc(), desc() y varios criterios

**Clave** `asc-desc-y-varios-criterios`

**Definición** asc() ordena ascendente; desc() descendente. Las columnas siguientes desempatan.

**Búsqueda** asc(), desc() y varios criterios; Ordenar por monto y fecha

**Para recordar** Cada criterio tiene su propia dirección.

#### Ordenar por monto y fecha

```python
ver(select(pedidos.c.id,pedidos.c.monto).order_by(pedidos.c.monto.desc(),pedidos.c.fecha.asc(),pedidos.c.id))
```

Cada criterio tiene su propia dirección.

**Resultado**

```text
('id', 'monto')
[(105, 300), (102, 200), (103, 200), (101, 100), (106, 100), (107, 80), (104, 50)]
```

### nulls_first() y nulls_last()

**Clave** `nulls-first-y-nulls-last`

**Definición** Solicitan posición explícita de NULL en el orden.

**Búsqueda** nulls_first() y nulls_last(); Mostrar países desconocidos al final

**Para recordar** No todos los motores admiten NULLS FIRST/LAST.

**Nota** SQLite 3.30+ y PostgreSQL lo admiten; en MySQL usa un criterio adicional como columna.is_(None).

#### Mostrar países desconocidos al final

```python
ver(select(clientes.c.nombre,clientes.c.pais).order_by(clientes.c.pais.asc().nulls_last(),clientes.c.id))
```

No todos los motores admiten NULLS FIRST/LAST.

**Resultado**

```text
('nombre', 'pais')
[('Marta', 'ES'), ('Eva', 'ES'), ('Ana', 'MX'), ('Luis', 'MX'), ('Noa', None)]
```

### limit() y offset()

**Clave** `limit-y-offset`

**Definición** limit() define máximo de filas; offset() salta filas.

**Búsqueda** limit() y offset(); Leer la segunda página de dos clientes

**Para recordar** En datos que cambian, paginación por clave puede ser más estable.

#### Leer la segunda página de dos clientes

```python
ver(select(clientes.c.nombre).order_by(clientes.c.id).limit(2).offset(2))
```

En datos que cambian, paginación por clave puede ser más estable.

**Resultado**

```text
('nombre',)
[('Marta',), ('Noa',)]
```

### distinct()

**Clave** `distinct`

**Definición** Select.distinct() elimina duplicados de todas las columnas seleccionadas; distinct(columna) puede usarse dentro de agregados.

**Búsqueda** distinct(); Listar países conocidos

**Para recordar** SELECT DISTINCT de dos columnas deduplica la combinación.

#### Listar países conocidos

```python
ver(select(clientes.c.pais).where(clientes.c.pais.is_not(None)).distinct().order_by(clientes.c.pais))
```

SELECT DISTINCT de dos columnas deduplica la combinación.

**Resultado**

```text
('pais',)
[('ES',), ('MX',)]
```

## JOINs y relaciones en Core

**Clave** `joins`

### Definición

**Clave** `definicion`

**Definición** join() combina tablas mediante una condición ON. Puede inferirla a partir de una FK inequívoca.

**Búsqueda** Definición; Cruzar pedidos y clientes

**Para recordar** INNER conserva coincidencias; outerjoin conserva también el lado izquierdo.

#### Cruzar pedidos y clientes

```python
ver(select(pedidos.c.id,clientes.c.nombre).join(clientes).order_by(pedidos.c.id))
```

INNER conserva coincidencias; outerjoin conserva también el lado izquierdo.

**Resultado**

```text
('id', 'nombre')
[(101, 'Ana'), (102, 'Ana'), (103, 'Luis'), (104, 'Luis'), (105, 'Marta'), (106, 'Marta'), (107, 'Noa')]
```

### join() con condición explícita

**Clave** `join-con-condicion-explicita`

**Definición** Pasa la tabla destino y la expresión que relaciona sus claves.

**Búsqueda** join() con condición explícita; Mostrar pedidos y nombres

**Para recordar** Elige la clave que representa la relación real.

#### Mostrar pedidos y nombres

```python
ver(select(pedidos.c.id,clientes.c.nombre).select_from(pedidos).join(clientes,pedidos.c.cliente_id==clientes.c.id).order_by(pedidos.c.id))
```

Elige la clave que representa la relación real.

**Resultado**

```text
('id', 'nombre')
[(101, 'Ana'), (102, 'Ana'), (103, 'Luis'), (104, 'Luis'), (105, 'Marta'), (106, 'Marta'), (107, 'Noa')]
```

### outerjoin() y filtros ON

**Clave** `outerjoin-y-filtros-on`

**Definición** outerjoin() crea LEFT OUTER JOIN; añade restricciones del lado derecho en ON si quieres preservar filas sin coincidencia.

**Búsqueda** outerjoin() y filtros ON; Contar completados incluyendo clientes sin pedidos

**Para recordar** WHERE sobre el lado derecho puede eliminar las filas conservadas.

#### Contar completados incluyendo clientes sin pedidos

```python
j=clientes.outerjoin(pedidos,and_(clientes.c.id==pedidos.c.cliente_id,pedidos.c.estado=="completed"))
ver(select(clientes.c.nombre,func.count(pedidos.c.id).label("n")).select_from(j).group_by(clientes.c.id,clientes.c.nombre).order_by(clientes.c.id))
```

WHERE sobre el lado derecho puede eliminar las filas conservadas.

**Resultado**

```text
('nombre', 'n')
[('Ana', 2), ('Luis', 1), ('Marta', 2), ('Noa', 0), ('Eva', 0)]
```

### RIGHT JOIN y FULL OUTER JOIN

**Clave** `right-join-y-full-outer-join`

**Definición** Core expresa RIGHT JOIN invirtiendo los lados de un LEFT JOIN. full=True solicita FULL OUTER JOIN.

**Búsqueda** RIGHT JOIN y FULL OUTER JOIN; Conservar clientes invirtiendo el lado lógico

**Para recordar** FULL conserva ambos lados; depende del motor.

**Nota** FULL se puede construir con clientes.join(pedidos, full=True). SQLite 3.39+ y PostgreSQL lo admiten; MySQL no lo admite directamente.

#### Conservar clientes invirtiendo el lado lógico

```python
ver(select(clientes.c.nombre,pedidos.c.id).select_from(clientes.outerjoin(pedidos)).order_by(clientes.c.id,pedidos.c.id))
```

FULL conserva ambos lados; depende del motor.

**Resultado**

```text
('nombre', 'id')
[('Ana', 101), ('Ana', 102), ('Luis', 103), ('Luis', 104), ('Marta', 105), ('Marta', 106), ('Noa', 107), ('Eva', None)]
```

### Anti join

**Clave** `anti-join`

**Definición** Busca filas de la izquierda sin coincidencia, mediante LEFT JOIN y una clave derecha IS NULL o NOT EXISTS.

**Búsqueda** Anti join; Encontrar clientes sin pedidos

**Para recordar** Comprueba una clave no nula para distinguir falta de coincidencia.

#### Encontrar clientes sin pedidos

```python
ver(select(clientes.c.nombre).select_from(clientes.outerjoin(pedidos)).where(pedidos.c.id.is_(None)))
```

Comprueba una clave no nula para distinguir falta de coincidencia.

**Resultado**

```text
('nombre',)
[('Eva',)]
```

### Self join y alias()

**Clave** `self-join-y-alias`

**Definición** Para cruzar una tabla consigo misma, usa alias distintos.

**Búsqueda** Self join y alias(); Encontrar parejas de clientes del mismo país

**Para recordar** Distingue cada rol en la condición ON.

#### Encontrar parejas de clientes del mismo país

```python
a=clientes.alias("a")
b=clientes.alias("b")
ver(select(a.c.nombre.label("uno"),b.c.nombre.label("otro")).select_from(a.join(b,and_(a.c.pais==b.c.pais,a.c.id<b.c.id))).order_by(a.c.id,b.c.id))
```

Distingue cada rol en la condición ON.

**Resultado**

```text
('uno', 'otro')
[('Ana', 'Luis'), ('Marta', 'Eva')]
```

### CROSS JOIN

**Clave** `cross-join`

**Definición** Un producto cartesiano combina todas las filas de dos orígenes. join(..., true()) expresa esa combinación explícitamente.

**Búsqueda** CROSS JOIN; Combinar clientes y productos

**Para recordar** El número de filas puede multiplicarse rápidamente.

#### Combinar clientes y productos

```python
valor(select(func.count()).select_from(clientes.join(productos,sa.true())))
```

El número de filas puede multiplicarse rápidamente.

**Resultado**

```text
15
```

### join_from() y varias tablas

**Clave** `join-from-y-varias-tablas`

**Definición** join_from() fija el origen de un JOIN; encadena joins para atravesar relaciones.

**Búsqueda** join_from() y varias tablas; Obtener importe por categoría

**Para recordar** No sumes montos de cabecera repetidos por cada detalle.

#### Obtener importe por categoría

```python
s=select(productos.c.categoria,func.sum(detalles.c.cantidad*detalles.c.precio).label("total")).join_from(detalles,productos).join_from(detalles,pedidos).where(pedidos.c.estado=="completed").group_by(productos.c.categoria).order_by(productos.c.categoria)
ver(s)
```

No sumes montos de cabecera repetidos por cada detalle.

**Resultado**

```text
('categoria', 'total')
[('Hogar', 300), ('Tech', 600)]
```

## Funciones SQL y operaciones

**Clave** `funciones-sql`

### Definición

**Clave** `definicion`

**Definición** func construye llamadas a funciones de la base. SQLAlchemy genera la expresión, pero el motor decide si admite la función.

**Búsqueda** Definición; Redondear el promedio

**Para recordar** func no ejecuta funciones Python sobre filas.

#### Redondear el promedio

```python
valor(select(func.round(func.avg(pedidos.c.monto),2)))
```

func no ejecuta funciones Python sobre filas.

**Resultado**

```text
147.14
```

### Texto: upper, lower, trim y length

**Clave** `texto-upper-lower-trim-y-length`

**Definición** Las funciones de texto limpian o normalizan valores en SQL.

**Búsqueda** Texto: upper, lower, trim y length; Normalizar nombres

**Para recordar** Los nombres y collations pueden variar según el motor.

#### Normalizar nombres

```python
ver(select(func.upper(clientes.c.nombre).label("mayus"),func.length(clientes.c.nombre).label("longitud")).order_by(clientes.c.id))
```

Los nombres y collations pueden variar según el motor.

**Resultado**

```text
('mayus', 'longitud')
[('ANA', 3), ('LUIS', 4), ('MARTA', 5), ('NOA', 3), ('EVA', 3)]
```

### Texto: substr, replace y concatenación

**Clave** `texto-substr-replace-y-concatenacion`

**Definición** substr() extrae texto en SQLite; replace() reemplaza ocurrencias. concat() o el operador + para columnas String construyen concatenación según dialecto.

**Búsqueda** Texto: substr, replace y concatenación; Construir etiquetas

**Para recordar** Usa + sobre expresiones String, no sobre enteros, para concatenar.

#### Construir etiquetas

```python
ver(select((clientes.c.nombre+literal(" - ")+func.coalesce(clientes.c.pais,"?")).label("etiqueta")).order_by(clientes.c.id))
```

Usa + sobre expresiones String, no sobre enteros, para concatenar.

**Resultado**

```text
('etiqueta',)
[('Ana - MX',), ('Luis - MX',), ('Marta - ES',), ('Noa - ?',), ('Eva - ES',)]
```

### Numéricas: round, abs, ceil, floor y mod

**Clave** `numericas-round-abs-ceil-floor-y-mod`

**Definición** func expresa funciones numéricas disponibles en el motor; % construye resto.

**Búsqueda** Numéricas: round, abs, ceil, floor y mod; Calcular diferencia absoluta y resto

**Para recordar** No redondees importes antes de sumar salvo que el negocio lo exija.

#### Calcular diferencia absoluta y resto

```python
ver(select(func.abs(-15).label("absoluto"),(literal(11)%3).label("resto"),func.round(12.345,2).label("redondeo")))
```

No redondees importes antes de sumar salvo que el negocio lo exija.

**Resultado**

```text
('absoluto', 'resto', 'redondeo')
[(15, 2, 12.35)]
```

### extract() y funciones de fecha

**Clave** `extract-y-funciones-de-fecha`

**Definición** extract() extrae partes de fechas de forma adaptada por el dialecto; func.current_date() solicita la fecha de la base.

**Búsqueda** extract() y funciones de fecha; Extraer año y mes

**Para recordar** YEAR y DATE_FORMAT son propios de algunos motores.

#### Extraer año y mes

```python
ver(select(pedidos.c.id,sa.extract("year",pedidos.c.fecha).label("anio"),sa.extract("month",pedidos.c.fecha).label("mes")).where(pedidos.c.id==101))
```

YEAR y DATE_FORMAT son propios de algunos motores.

**Resultado**

```text
('id', 'anio', 'mes')
[(101, 2026, 2)]
```

### Diferencias de fechas y dialectos

**Clave** `diferencias-de-fechas-y-dialectos`

**Definición** SQLite usa julianday() para diferencias en días; MySQL usa DATEDIFF; PostgreSQL permite restar fechas.

**Búsqueda** Diferencias de fechas y dialectos; Calcular días desde el alta

**Para recordar** No supongas que una función temporal tiene la misma sintaxis en todos los motores.

#### Calcular días desde el alta

```python
ver(select(pedidos.c.id,(func.julianday(pedidos.c.fecha)-func.julianday(clientes.c.alta)).label("dias")).join(clientes).where(pedidos.c.id==101))
```

No supongas que una función temporal tiene la misma sintaxis en todos los motores.

**Resultado**

```text
('id', 'dias')
[(101, 31.0)]
```

## Agregaciones y GROUP BY

**Clave** `agregaciones`

### Definición

**Clave** `definicion`

**Definición** Las funciones de agregación reducen varias filas a un valor. group_by() calcula ese valor por cada combinación de claves.

**Búsqueda** Definición; Calcular venta por cliente

**Para recordar** Agrupa según la granularidad que necesitas.

#### Calcular venta por cliente

```python
ver(select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label("total")).group_by(pedidos.c.cliente_id).order_by(pedidos.c.cliente_id))
```

Agrupa según la granularidad que necesitas.

**Resultado**

```text
('cliente_id', 'total')
[(1, 300), (2, 250), (3, 400), (4, 80)]
```

### count() y count(distinct())

**Clave** `count-y-count-distinct`

**Definición** count() cuenta filas; count(columna) cuenta valores no nulos; count(distinct(columna)) cuenta valores distintos no nulos.

**Búsqueda** count() y count(distinct()); Comparar tres conteos

**Para recordar** Cuenta la clave del lado derecho en un LEFT JOIN.

#### Comparar tres conteos

```python
ver(select(func.count().label("filas"),func.count(pedidos.c.cupon).label("cupones"),func.count(sa.distinct(pedidos.c.cliente_id)).label("clientes")).select_from(pedidos))
```

Cuenta la clave del lado derecho en un LEFT JOIN.

**Resultado**

```text
('filas', 'cupones', 'clientes')
[(7, 2, 4)]
```

### sum(), avg(), min() y max()

**Clave** `sum-avg-min-y-max`

**Definición** Calculan suma, promedio y extremos de un grupo. Generalmente ignoran NULL.

**Búsqueda** sum(), avg(), min() y max(); Resumir pedidos completados

**Para recordar** SUM de cero filas devuelve NULL, no cero.

#### Resumir pedidos completados

```python
ver(select(func.sum(pedidos.c.monto).label("suma"),func.avg(pedidos.c.monto).label("promedio"),func.min(pedidos.c.monto).label("min"),func.max(pedidos.c.monto).label("max")).where(pedidos.c.estado=="completed"))
```

SUM de cero filas devuelve NULL, no cero.

**Resultado**

```text
('suma', 'promedio', 'min', 'max')
[(900, 180.0, 100, 300)]
```

### group_by() con varias columnas

**Clave** `group-by-con-varias-columnas`

**Definición** Agrupa por la combinación de columnas seleccionadas.

**Búsqueda** group_by() con varias columnas; Contar pedidos por país y estado

**Para recordar** Una columna no agregada debe estar agrupada o ser funcionalmente dependiente según el motor.

#### Contar pedidos por país y estado

```python
ver(select(clientes.c.pais,pedidos.c.estado,func.count().label("n")).join_from(pedidos,clientes).group_by(clientes.c.pais,pedidos.c.estado).order_by(clientes.c.pais,pedidos.c.estado))
```

Una columna no agregada debe estar agrupada o ser funcionalmente dependiente según el motor.

**Resultado**

```text
('pais', 'estado', 'n')
[(None, 'cancelled', 1), ('ES', 'completed', 2), ('MX', 'cancelled', 1), ('MX', 'completed', 3)]
```

### having() y where()

**Clave** `having-y-where`

**Definición** where() filtra filas antes de agrupar; having() filtra grupos después del cálculo.

**Búsqueda** having() y where(); Clientes con dos pedidos completados

**Para recordar** No uses WHERE para filtrar una agregación de esa misma consulta.

#### Clientes con dos pedidos completados

```python
ver(select(pedidos.c.cliente_id,func.count().label("n")).where(pedidos.c.estado=="completed").group_by(pedidos.c.cliente_id).having(func.count()>=2).order_by(pedidos.c.cliente_id))
```

No uses WHERE para filtrar una agregación de esa misma consulta.

**Resultado**

```text
('cliente_id', 'n')
[(1, 2), (3, 2)]
```

### Agregación condicional y porcentajes

**Clave** `agregacion-condicional-y-porcentajes`

**Definición** case() dentro de sum() permite contar condiciones; filter() agrega FILTER WHERE donde el motor lo admite.

**Búsqueda** Agregación condicional y porcentajes; Calcular porcentaje de completados

**Para recordar** Mantén el denominador completo y evita dividir por cero.

#### Calcular porcentaje de completados

```python
n=func.sum(case((pedidos.c.estado=="completed",1),else_=0))
valor(select(func.round(100.0*n/func.nullif(func.count(),0),2)).select_from(pedidos))
```

Mantén el denominador completo y evita dividir por cero.

**Resultado**

```text
71.43
```

### filter() en agregados

**Clave** `filter-en-agregados`

**Definición** func.count().filter(condición) limita solo las filas de esa agregación.

**Búsqueda** filter() en agregados; Contar completados y todos a la vez

**Para recordar** FILTER está disponible en PostgreSQL y SQLite 3.30+; CASE es una alternativa portable.

#### Contar completados y todos a la vez

```python
ver(select(func.count().label("todos"),func.count().filter(pedidos.c.estado=="completed").label("completados")).select_from(pedidos))
```

FILTER está disponible en PostgreSQL y SQLite 3.30+; CASE es una alternativa portable.

**Resultado**

```text
('todos', 'completados')
[(7, 5)]
```

### Concatenación agregada

**Clave** `concatenacion-agregada`

**Definición** aggregate_strings() genera una función de concatenación según el dialecto, como group_concat o string_agg.

**Búsqueda** Concatenación agregada; Unir los nombres de países de clientes

**Para recordar** No supongas orden de concatenación si no se define.

**Nota** El orden interno no está garantizado por esta consulta; se muestra un resultado posible.

#### Unir los nombres de países de clientes

```python
valor(select(func.aggregate_strings(clientes.c.nombre,", ")).where(clientes.c.pais=="MX"))
```

No supongas orden de concatenación si no se define.

**Resultado**

```text
Ana, Luis
```

### rollup(), cube() y grouping_sets()

**Clave** `rollup-cube-y-grouping-sets`

**Definición** Generan subtotales y distintos niveles de agrupación en motores compatibles.

**Búsqueda** rollup(), cube() y grouping_sets(); Compilar subtotales para PostgreSQL

**Para recordar** SQLite no admite estas expresiones de agrupación.

**Nota** Solo se compila; no se ejecuta contra PostgreSQL.

#### Compilar subtotales para PostgreSQL

```python
from sqlalchemy.dialects import postgresql
s=select(clientes.c.pais,func.count()).group_by(func.rollup(clientes.c.pais))
print(s.compile(dialect=postgresql.dialect()))
```

SQLite no admite estas expresiones de agrupación.

**Resultado**

```text
SELECT clientes.pais, count(*) AS count_1 
FROM clientes GROUP BY ROLLUP(clientes.pais)
```

## Subconsultas y EXISTS

**Clave** `subconsultas`

### Definición

**Clave** `definicion`

**Definición** Una subconsulta es una sentencia usada dentro de otra. subquery() crea un origen de filas y scalar_subquery() una expresión de un valor.

**Búsqueda** Definición; Filtrar montos superiores al promedio

**Para recordar** Usa la variante que corresponde al lugar de la consulta.

#### Filtrar montos superiores al promedio

```python
prom=select(func.avg(pedidos.c.monto)).scalar_subquery()
ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto>prom).order_by(pedidos.c.id))
```

Usa la variante que corresponde al lugar de la consulta.

**Resultado**

```text
('id', 'monto')
[(102, 200), (103, 200), (105, 300)]
```

### subquery() y .c

**Clave** `subquery-y-c`

**Definición** Una subquery con nombre puede usarse como tabla derivada y expone columnas en .c.

**Búsqueda** subquery() y .c; Filtrar totales calculados

**Para recordar** Usa label() para nombrar cálculos de la subconsulta.

#### Filtrar totales calculados

```python
tot=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label("total")).group_by(pedidos.c.cliente_id).subquery("totales")
ver(select(tot.c.cliente_id,tot.c.total).where(tot.c.total>250).order_by(tot.c.cliente_id))
```

Usa label() para nombrar cálculos de la subconsulta.

**Resultado**

```text
('cliente_id', 'total')
[(1, 300), (3, 400)]
```

### scalar_subquery() y correlación

**Clave** `scalar-subquery-y-correlacion`

**Definición** Una subconsulta escalar produce una columna y como máximo una fila; una correlacionada hace referencia a la fila exterior. correlate() y correlate_except() controlan qué orígenes se correlacionan.

**Búsqueda** scalar_subquery() y correlación; Contar pedidos por cliente sin agrupar la consulta exterior

**Para recordar** Correlacionar permite calcular un dato por fila exterior.

#### Contar pedidos por cliente sin agrupar la consulta exterior

```python
n=select(func.count()).select_from(pedidos).where(pedidos.c.cliente_id==clientes.c.id).correlate(clientes).scalar_subquery()
ver(select(clientes.c.nombre,n.label("n")).order_by(clientes.c.id))
```

Correlacionar permite calcular un dato por fila exterior.

**Resultado**

```text
('nombre', 'n')
[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]
```

### IN con subconsultas

**Clave** `in-con-subconsultas`

**Definición** in_() admite directamente una sentencia select que devuelve una columna.

**Búsqueda** IN con subconsultas; Clientes con compras completadas

**Para recordar** No conviertas a lista Python si la base puede resolverlo.

#### Clientes con compras completadas

```python
s=select(pedidos.c.cliente_id).where(pedidos.c.estado=="completed")
ver(select(clientes.c.nombre).where(clientes.c.id.in_(s)).order_by(clientes.c.id))
```

No conviertas a lista Python si la base puede resolverlo.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',), ('Marta',)]
```

### exists() y NOT EXISTS

**Clave** `exists-y-not-exists`

**Definición** exists() comprueba si una subconsulta devuelve alguna fila; ~exists la niega.

**Búsqueda** exists() y NOT EXISTS; Clientes sin pedidos completados

**Para recordar** No necesita recuperar ni contar todas las coincidencias.

#### Clientes sin pedidos completados

```python
e=select(pedidos.c.id).where(pedidos.c.cliente_id==clientes.c.id,pedidos.c.estado=="completed").exists()
ver(select(clientes.c.nombre).where(~e).order_by(clientes.c.id))
```

No necesita recuperar ni contar todas las coincidencias.

**Resultado**

```text
('nombre',)
[('Noa',), ('Eva',)]
```

### lateral()

**Clave** `lateral`

**Definición** LATERAL permite que un origen del FROM haga referencia a otro origen situado antes.

**Búsqueda** lateral(); Compilar el último pedido de cada cliente

**Para recordar** El soporte depende del motor; no se ejecuta en SQLite.

#### Compilar el último pedido de cada cliente

```python
from sqlalchemy.dialects import postgresql
p=select(pedidos.c.id).where(pedidos.c.cliente_id==clientes.c.id).order_by(pedidos.c.fecha.desc(),pedidos.c.id.desc()).limit(1).lateral("ultimo")
s=select(clientes.c.nombre,p.c.id).select_from(clientes.join(p,sa.true()))
print(s.compile(dialect=postgresql.dialect()))
```

El soporte depende del motor; no se ejecuta en SQLite.

**Resultado**

```text
SELECT clientes.nombre, ultimo.id 
FROM clientes JOIN LATERAL (SELECT pedidos.id AS id 
FROM pedidos 
WHERE pedidos.cliente_id = clientes.id ORDER BY pedidos.fecha DESC, pedidos.id DESC 
 LIMIT %(param_1)s) AS ultimo ON true
```

## CTE

**Clave** `cte`

### Definición

**Clave** `definicion`

**Definición** cte() asigna un nombre a una consulta y la hace disponible mediante WITH dentro de una sentencia.

**Búsqueda** Definición; Filtrar gasto por cliente

**Para recordar** Un CTE no es una tabla persistente ni garantiza materialización.

#### Filtrar gasto por cliente

```python
t=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label("total")).group_by(pedidos.c.cliente_id).cte("gasto")
ver(select(t).where(t.c.total>250).order_by(t.c.cliente_id))
```

Un CTE no es una tabla persistente ni garantiza materialización.

**Resultado**

```text
('cliente_id', 'total')
[(1, 300), (3, 400)]
```

### CTEs múltiples

**Clave** `ctes-multiples`

**Definición** Una sentencia puede referirse a varios CTE; uno puede usar otro.

**Búsqueda** CTEs múltiples; Obtener clientes por encima del promedio

**Para recordar** Separa los pasos que tienen granularidades diferentes.

#### Obtener clientes por encima del promedio

```python
t=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label("total")).group_by(pedidos.c.cliente_id).cte("gasto")
a=select(func.avg(t.c.total).label("promedio")).cte("media")
ver(select(t.c.cliente_id,t.c.total).where(t.c.total>select(a.c.promedio).scalar_subquery()).order_by(t.c.cliente_id))
```

Separa los pasos que tienen granularidades diferentes.

**Resultado**

```text
('cliente_id', 'total')
[(1, 300), (3, 400)]
```

### CTE recursivo

**Clave** `cte-recursivo`

**Definición** recursive=True permite definir una parte inicial y otra que vuelve a consultar el CTE.

**Búsqueda** CTE recursivo; Generar los números 1 a 4

**Para recordar** Incluye una condición de terminación.

#### Generar los números 1 a 4

```python
n=select(literal(1).label("n")).cte("numeros",recursive=True)
n=n.union_all(select(n.c.n+1).where(n.c.n<4))
ver(select(n.c.n).order_by(n.c.n))
```

Incluye una condición de terminación.

**Resultado**

```text
('n',)
[(1,), (2,), (3,), (4,)]
```

## Operaciones de conjuntos

**Clave** `conjuntos`

### Definición

**Clave** `definicion`

**Definición** union(), union_all(), intersect() y except_() combinan consultas con el mismo número de columnas y tipos compatibles.

**Búsqueda** Definición; Unir IDs de dos filtros

**Para recordar** Combina filas verticalmente; JOIN combina columnas relacionadas.

#### Unir IDs de dos filtros

```python
a=select(pedidos.c.cliente_id).where(pedidos.c.estado=="completed")
b=select(pedidos.c.cliente_id).where(pedidos.c.estado=="cancelled")
ver(a.union(b).order_by("cliente_id"))
```

Combina filas verticalmente; JOIN combina columnas relacionadas.

**Resultado**

```text
('cliente_id',)
[(1,), (2,), (3,), (4,)]
```

### union() y union_all()

**Clave** `union-y-union-all`

**Definición** union() elimina duplicados; union_all() conserva todas las filas.

**Búsqueda** union() y union_all(); Combinar países sin deduplicar

**Para recordar** Usa UNION ALL si necesitas conservar ocurrencias.

#### Combinar países sin deduplicar

```python
a=select(clientes.c.pais).where(clientes.c.id<=2)
b=select(clientes.c.pais).where(clientes.c.id==3)
ver(a.union_all(b).order_by("pais"))
```

Usa UNION ALL si necesitas conservar ocurrencias.

**Resultado**

```text
('pais',)
[('ES',), ('MX',), ('MX',)]
```

### intersect() y except_()

**Clave** `intersect-y-except`

**Definición** intersect() conserva filas presentes en ambas consultas; except_() conserva las de la primera que no están en la segunda.

**Búsqueda** intersect() y except_(); Clientes con completados y cancelados

**Para recordar** Comprueba el soporte de cada motor y versión.

#### Clientes con completados y cancelados

```python
a=select(pedidos.c.cliente_id).where(pedidos.c.estado=="completed")
b=select(pedidos.c.cliente_id).where(pedidos.c.estado=="cancelled")
ver(a.intersect(b).order_by("cliente_id"))
ver(a.except_(b).order_by("cliente_id"))
```

Comprueba el soporte de cada motor y versión.

**Resultado**

```text
('cliente_id',)
[(2,)]
('cliente_id',)
[(1,), (3,)]
```

### CompoundSelect y orden final

**Clave** `compoundselect-y-orden-final`

**Definición** Las operaciones de conjuntos generan un CompoundSelect; order_by se aplica al resultado combinado.

**Búsqueda** CompoundSelect y orden final; Consultar el resultado de una unión

**Para recordar** Para transformar el resultado combinado, usa subquery().

#### Consultar el resultado de una unión

```python
a=select(clientes.c.id).where(clientes.c.id<=2)
b=select(clientes.c.id).where(clientes.c.id>=4)
u=sa.union_all(a,b).subquery("ids")
ver(select(u.c.id).order_by(u.c.id.desc()))
```

Para transformar el resultado combinado, usa subquery().

**Resultado**

```text
('id',)
[(5,), (4,), (2,), (1,)]
```

## Funciones de ventana

**Clave** `ventanas`

### Definición

**Clave** `definicion`

**Definición** over() calcula sobre filas relacionadas sin reducirlas a una fila por grupo. partition_by separa grupos y order_by define su orden de cálculo.

**Búsqueda** Definición; Mostrar total general junto a cada pedido

**Para recordar** El ORDER BY de la ventana no garantiza el orden final del resultado.

#### Mostrar total general junto a cada pedido

```python
ver(select(pedidos.c.id,pedidos.c.monto,func.sum(pedidos.c.monto).over().label("total")).order_by(pedidos.c.id))
```

El ORDER BY de la ventana no garantiza el orden final del resultado.

**Resultado**

```text
('id', 'monto', 'total')
[(101, 100, 1030), (102, 200, 1030), (103, 200, 1030), (104, 50, 1030), (105, 300, 1030), (106, 100, 1030), (107, 80, 1030)]
```

### partition_by

**Clave** `partition-by`

**Definición** Reinicia el cálculo para cada valor o combinación de valores.

**Búsqueda** partition_by; Mostrar total por cliente junto a cada pedido

**Para recordar** A diferencia de GROUP BY, conserva las filas originales.

#### Mostrar total por cliente junto a cada pedido

```python
ver(select(pedidos.c.id,pedidos.c.cliente_id,func.sum(pedidos.c.monto).over(partition_by=pedidos.c.cliente_id).label("total_cliente")).order_by(pedidos.c.id))
```

A diferencia de GROUP BY, conserva las filas originales.

**Resultado**

```text
('id', 'cliente_id', 'total_cliente')
[(101, 1, 300), (102, 1, 300), (103, 2, 250), (104, 2, 250), (105, 3, 400), (106, 3, 400), (107, 4, 80)]
```

### row_number()

**Clave** `row-number`

**Definición** Numera filas consecutivamente dentro de cada partición. Añade un criterio único para resolver empates.

**Búsqueda** row_number(); Numerar pedidos por cliente

**Para recordar** ROW_NUMBER no asigna el mismo número a dos filas.

#### Numerar pedidos por cliente

```python
w=func.row_number().over(partition_by=pedidos.c.cliente_id,order_by=[pedidos.c.fecha,pedidos.c.id])
ver(select(pedidos.c.id,pedidos.c.cliente_id,w.label("n")).order_by(pedidos.c.id))
```

ROW_NUMBER no asigna el mismo número a dos filas.

**Resultado**

```text
('id', 'cliente_id', 'n')
[(101, 1, 1), (102, 1, 2), (103, 2, 1), (104, 2, 2), (105, 3, 1), (106, 3, 2), (107, 4, 1)]
```

### rank() y dense_rank()

**Clave** `rank-y-dense-rank`

**Definición** rank() deja saltos tras empates; dense_rank() no. Ambos asignan el mismo rango a valores empatados.

**Búsqueda** rank() y dense_rank(); Comparar dos rankings

**Para recordar** No añadas un ID al orden interno si quieres conservar empates por monto.

#### Comparar dos rankings

```python
r=func.rank().over(order_by=pedidos.c.monto.desc())
d=func.dense_rank().over(order_by=pedidos.c.monto.desc())
ver(select(pedidos.c.id,pedidos.c.monto,r.label("rango"),d.label("denso")).order_by(pedidos.c.monto.desc(),pedidos.c.id))
```

No añadas un ID al orden interno si quieres conservar empates por monto.

**Resultado**

```text
('id', 'monto', 'rango', 'denso')
[(105, 300, 1, 1), (102, 200, 2, 2), (103, 200, 2, 2), (101, 100, 4, 3), (106, 100, 4, 3), (107, 80, 6, 4), (104, 50, 7, 5)]
```

### lag() y lead()

**Clave** `lag-y-lead`

**Definición** lag() lee un valor anterior; lead() uno posterior según el orden de ventana. Pueden recibir desplazamiento y valor por defecto.

**Búsqueda** lag() y lead(); Comparar montos consecutivos

**Para recordar** El primer LAG y último LEAD normalmente devuelven NULL.

#### Comparar montos consecutivos

```python
w=[pedidos.c.fecha,pedidos.c.id]
ver(select(pedidos.c.id,func.lag(pedidos.c.monto).over(order_by=w).label("anterior"),func.lead(pedidos.c.monto).over(order_by=w).label("siguiente")).order_by(*w))
```

El primer LAG y último LEAD normalmente devuelven NULL.

**Resultado**

```text
('id', 'anterior', 'siguiente')
[(101, None, 200), (102, 100, 200), (103, 200, 50), (104, 200, 300), (105, 50, 100), (106, 300, 80), (107, 100, None)]
```

### ROWS, RANGE y GROUPS

**Clave** `rows-range-y-groups`

**Definición** El marco determina qué filas participan en cada cálculo de ventana. rows=(None,0) va desde la primera fila hasta la actual; range_ y groups usan valores o grupos de pares.

**Búsqueda** ROWS, RANGE y GROUPS; Acumular ventas fila por fila

**Para recordar** Sin marco explícito, ORDER BY suele incluir empates del valor actual por defecto.

**Nota** groups se incorporó en SQLAlchemy 2.0.40; el soporte SQL del marco depende del motor.

#### Acumular ventas fila por fila

```python
w=func.sum(pedidos.c.monto).over(order_by=[pedidos.c.fecha,pedidos.c.id],rows=(None,0))
ver(select(pedidos.c.id,pedidos.c.monto,w.label("acumulado")).where(pedidos.c.estado=="completed").order_by(pedidos.c.fecha,pedidos.c.id))
```

Sin marco explícito, ORDER BY suele incluir empates del valor actual por defecto.

**Resultado**

```text
('id', 'monto', 'acumulado')
[(101, 100, 100), (102, 200, 300), (103, 200, 500), (105, 300, 800), (106, 100, 900)]
```

### Promedio móvil

**Clave** `promedio-movil`

**Definición** Un marco ROWS limitado incluye un número de filas anteriores o posteriores.

**Búsqueda** Promedio móvil; Promediar el pedido actual y el anterior

**Para recordar** Dos filas no significan dos días si faltan fechas.

#### Promediar el pedido actual y el anterior

```python
w=func.avg(pedidos.c.monto).over(order_by=[pedidos.c.fecha,pedidos.c.id],rows=(-1,0))
ver(select(pedidos.c.id,w.label("media_movil")).order_by(pedidos.c.fecha,pedidos.c.id))
```

Dos filas no significan dos días si faltan fechas.

**Resultado**

```text
('id', 'media_movil')
[(101, 100.0), (102, 150.0), (103, 200.0), (104, 125.0), (105, 175.0), (106, 200.0), (107, 90.0)]
```

### first_value(), last_value() y ntile()

**Clave** `first-value-last-value-y-ntile`

**Definición** first_value y last_value toman extremos del marco; ntile divide filas ordenadas en grupos de tamaño parecido.

**Búsqueda** first_value(), last_value() y ntile(); Obtener último monto y dos segmentos

**Para recordar** LAST_VALUE necesita un marco que llegue al final si buscas la última fila de toda la partición.

#### Obtener último monto y dos segmentos

```python
w=[pedidos.c.fecha,pedidos.c.id]
ultimo=func.last_value(pedidos.c.monto).over(order_by=w,rows=(None,None))
ver(select(pedidos.c.id,ultimo.label("ultimo"),func.ntile(2).over(order_by=w).label("grupo")).order_by(*w))
```

LAST_VALUE necesita un marco que llegue al final si buscas la última fila de toda la partición.

**Resultado**

```text
('id', 'ultimo', 'grupo')
[(101, 80, 1), (102, 80, 1), (103, 80, 1), (104, 80, 1), (105, 80, 2), (106, 80, 2), (107, 80, 2)]
```

### Filtrar resultados de ventana

**Clave** `filtrar-resultados-de-ventana`

**Definición** Las ventanas se evalúan después de WHERE; para filtrar un rango calculado, usa un CTE o subconsulta exterior.

**Búsqueda** Filtrar resultados de ventana; Obtener el último pedido de cada cliente

**Para recordar** No filtres una window function directamente en WHERE de su misma consulta.

#### Obtener el último pedido de cada cliente

```python
n=func.row_number().over(partition_by=pedidos.c.cliente_id,order_by=[pedidos.c.fecha.desc(),pedidos.c.id.desc()])
t=select(pedidos.c.cliente_id,pedidos.c.id,n.label("n")).cte("numerados")
ver(select(t.c.cliente_id,t.c.id).where(t.c.n==1).order_by(t.c.cliente_id))
```

No filtres una window function directamente en WHERE de su misma consulta.

**Resultado**

```text
('cliente_id', 'id')
[(1, 102), (2, 104), (3, 106), (4, 107)]
```

## INSERT, UPDATE y DELETE

**Clave** `dml`

### Definición

**Clave** `definicion`

**Definición** insert(), update() y delete() construyen cambios sobre tablas. Ejecuta en una transacción para decidir cuándo se guardan.

**Búsqueda** Definición; Insertar un producto

**Para recordar** Comprueba WHERE antes de modificar o eliminar filas.

#### Insertar un producto

```python
with engine.begin() as conn:
    conn.execute(insert(productos).values(id=4,nombre="Mesa",categoria="Hogar",precio=400))
ver(select(productos).where(productos.c.id==4))
```

Comprueba WHERE antes de modificar o eliminar filas.

**Resultado**

```text
('id', 'nombre', 'categoria', 'precio')
[(4, 'Mesa', 'Hogar', 400)]
```

### INSERT múltiple y executemany

**Clave** `insert-multiple-y-executemany`

**Definición** Una lista de diccionarios en execute() permite ejecutar DML con varios conjuntos de parámetros.

**Búsqueda** INSERT múltiple y executemany; Cargar dos productos en bloque

**Para recordar** Usa claves compatibles en todos los diccionarios.

#### Cargar dos productos en bloque

```python
with engine.begin() as conn:
    conn.execute(insert(productos),[dict(id=4,nombre="Mesa",categoria="Hogar",precio=400),dict(id=5,nombre="Cable",categoria="Tech",precio=30)])
valor(select(func.count()).select_from(productos))
```

Usa claves compatibles en todos los diccionarios.

**Resultado**

```text
5
```

### insert().from_select()

**Clave** `insert-from-select`

**Definición** INSERT FROM SELECT copia filas de una consulta directamente en la base.

**Búsqueda** insert().from_select(); Guardar un catálogo reducido

**Para recordar** El orden y tipo de las columnas destino deben coincidir.

#### Guardar un catálogo reducido

```python
m=MetaData()
t=Table("catalogo",m,Column("nombre",String),Column("precio",Integer))
m.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(t).from_select(["nombre","precio"],select(productos.c.nombre,productos.c.precio).where(productos.c.precio>=200)))
ver(select(t).order_by(t.c.precio))
```

El orden y tipo de las columnas destino deben coincidir.

**Resultado**

```text
('nombre', 'precio')
[('Teclado', 200), ('Silla', 300)]
```

### update().where().values()

**Clave** `update-where-values`

**Definición** UPDATE cambia las filas que cumplen WHERE. values() determina qué columnas cambian.

**Búsqueda** update().where().values(); Actualizar un precio

**Para recordar** Sin WHERE puede modificar toda la tabla.

#### Actualizar un precio

```python
with engine.begin() as conn:
    conn.execute(update(productos).where(productos.c.id==1).values(precio=110))
valor(select(productos.c.precio).where(productos.c.id==1))
```

Sin WHERE puede modificar toda la tabla.

**Resultado**

```text
110
```

### delete().where()

**Clave** `delete-where`

**Definición** DELETE elimina las filas seleccionadas. Las claves foráneas pueden impedir una eliminación.

**Búsqueda** delete().where(); Eliminar un cliente sin pedidos

**Para recordar** Verifica el filtro con SELECT y usa una transacción.

#### Eliminar un cliente sin pedidos

```python
with engine.begin() as conn:
    conn.execute(delete(clientes).where(clientes.c.id==5))
valor(select(func.count()).select_from(clientes))
```

Verifica el filtro con SELECT y usa una transacción.

**Resultado**

```text
4
```

### returning() y return_defaults()

**Clave** `returning-y-return-defaults`

**Definición** returning() solicita columnas de las filas modificadas; return_defaults() obtiene defaults generados según soporte.

**Búsqueda** returning() y return_defaults(); Recuperar el ID insertado

**Para recordar** No combines returning() y return_defaults() en la misma sentencia.

**Nota** SQLite 3.35+ y PostgreSQL admiten RETURNING; MySQL no lo ofrece de forma general. SQL Server emplea OUTPUT mediante su dialecto.

#### Recuperar el ID insertado

```python
with engine.begin() as conn:
    print(conn.execute(insert(productos).values(nombre="Mesa",precio=400).returning(productos.c.id)).scalar_one())
```

No combines returning() y return_defaults() en la misma sentencia.

**Resultado**

```text
4
```

### Upsert en SQLite y PostgreSQL

**Clave** `upsert-en-sqlite-y-postgresql`

**Definición** El insert específico del dialecto proporciona on_conflict_do_update() y on_conflict_do_nothing().

**Búsqueda** Upsert en SQLite y PostgreSQL; Actualizar un producto existente

**Para recordar** Define la restricción o columnas que representan el conflicto.

**Nota** PostgreSQL usa sqlalchemy.dialects.postgresql.insert con una API similar; no uses el insert genérico para estas extensiones.

#### Actualizar un producto existente

```python
from sqlalchemy.dialects.sqlite import insert as upsert
s=upsert(productos).values(id=1,nombre="Mouse",precio=115)
s=s.on_conflict_do_update(index_elements=[productos.c.id],set_={"precio":s.excluded.precio})
with engine.begin() as conn:
    conn.execute(s)
valor(select(productos.c.precio).where(productos.c.id==1))
```

Define la restricción o columnas que representan el conflicto.

**Resultado**

```text
115
```

### Upsert en MySQL

**Clave** `upsert-en-mysql`

**Definición** El insert del dialecto MySQL ofrece on_duplicate_key_update() para actualizar ante conflicto con una clave única.

**Búsqueda** Upsert en MySQL; Compilar un upsert MySQL

**Para recordar** No es equivalente exacto a elegir un objetivo ON CONFLICT.

**Nota** Solo compilación; requiere un servidor MySQL y driver para ejecutar. La sintaxis SQL generada puede depender de la versión del motor.

#### Compilar un upsert MySQL

```python
from sqlalchemy.dialects import mysql
s=mysql.insert(productos).values(id=1,nombre="Mouse",precio=115)
s=s.on_duplicate_key_update(precio=s.inserted.precio)
print(s.compile(dialect=mysql.dialect()))
```

No es equivalente exacto a elegir un objetivo ON CONFLICT.

**Resultado**

```text
INSERT INTO productos (id, nombre, precio) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE precio = VALUES(precio)
```

## Consultas dinámicas y compilación

**Clave** `consultas-dinamicas`

### Definición

**Clave** `definicion`

**Definición** Las sentencias de Core son composables: métodos como where() devuelven una nueva sentencia. compile() permite inspeccionar su SQL.

**Búsqueda** Definición; Aplicar un filtro opcional

**Para recordar** Reasigna la sentencia cuando añadas condiciones.

#### Aplicar un filtro opcional

```python
minimo=200
s=select(pedidos.c.id,pedidos.c.monto)
if minimo is not None:
    s=s.where(pedidos.c.monto>=minimo)
ver(s.order_by(pedidos.c.id))
```

Reasigna la sentencia cuando añadas condiciones.

**Resultado**

```text
('id', 'monto')
[(102, 200), (103, 200), (105, 300)]
```

### compile() y parámetros

**Clave** `compile-y-parametros`

**Definición** compile() construye SQL para un dialecto y expone params.

**Búsqueda** compile() y parámetros; Ver SQL y valores separados

**Para recordar** El SQL mostrado no es una consulta ejecutada.

#### Ver SQL y valores separados

```python
s=select(pedidos.c.id).where(pedidos.c.monto>=200)
c=s.compile(dialect=engine.dialect)
print(str(c),c.params)
```

El SQL mostrado no es una consulta ejecutada.

**Resultado**

```text
SELECT pedidos.id 
FROM pedidos 
WHERE pedidos.monto >= ? {'monto_1': 200}
```

### literal_binds y depuración

**Clave** `literal-binds-y-depuracion`

**Definición** literal_binds intenta incrustar algunos valores en el SQL compilado para inspección.

**Búsqueda** literal_binds y depuración; Inspeccionar una consulta con constante

**Para recordar** No lo uses como mecanismo de ejecución ni con datos no confiables.

#### Inspeccionar una consulta con constante

```python
s=select(pedidos.c.id).where(pedidos.c.id==101)
print(s.compile(dialect=engine.dialect,compile_kwargs={"literal_binds":True}))
```

No lo uses como mecanismo de ejecución ni con datos no confiables.

**Resultado**

```text
SELECT pedidos.id 
FROM pedidos 
WHERE pedidos.id = 101
```

### lambda_stmt() y caché de compilación

**Clave** `lambda-stmt-y-cache-de-compilacion`

**Definición** lambda_stmt() ayuda a reutilizar construcciones SQL cuando el perfilado lo justifica. La caché de compilación no almacena resultados de consultas.

**Búsqueda** lambda_stmt() y caché de compilación; Ejecutar una sentencia reutilizable

**Para recordar** SQL cacheado no equivale a datos cacheados.

#### Ejecutar una sentencia reutilizable

```python
s=sa.lambda_stmt(lambda:select(clientes.c.nombre).where(clientes.c.id==bindparam("id")))
valor(s,{"id":2})
```

SQL cacheado no equivale a datos cacheados.

**Resultado**

```text
Luis
```

## Pandas y SQLAlchemy

**Clave** `pandas`

### Definición

**Clave** `definicion`

**Definición** Pandas puede leer SQL y escribir DataFrames mediante un Engine o Connection. Es una integración de dos bibliotecas, no una API de SQLAlchemy.

**Búsqueda** Definición; Leer pedidos completados en un DataFrame

**Para recordar** Filtra y agrega en SQL cuando evite transportar datos innecesarios.

#### Leer pedidos completados en un DataFrame

```python
import pandas as pd
df=pd.read_sql_query(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.estado=="completed").order_by(pedidos.c.id),engine)
print(df.to_string(index=False))
```

Filtra y agrega en SQL cuando evite transportar datos innecesarios.

**Resultado**

```text
id  monto
101    100
102    200
103    200
105    300
106    100
```

### read_sql(), read_sql_query() y read_sql_table()

**Clave** `read-sql-read-sql-query-y-read-sql-table`

**Definición** read_sql() admite consulta o nombre de tabla; las otras dos expresan cada intención explícitamente.

**Búsqueda** read_sql(), read_sql_query() y read_sql_table(); Leer una tabla y seleccionar un subconjunto

**Para recordar** read_sql_table() requiere conexión SQLAlchemy o compatible, no una conexión sqlite3 directa.

#### Leer una tabla y seleccionar un subconjunto

```python
import pandas as pd
df=pd.read_sql_table("productos",engine,columns=["id","precio"])
print(df.sort_values("id").to_string(index=False))
```

read_sql_table() requiere conexión SQLAlchemy o compatible, no una conexión sqlite3 directa.

**Resultado**

```text
id  precio
  1     100
  2     200
  3     300
```

### params, index_col y parse_dates

**Clave** `params-index-col-y-parse-dates`

**Definición** params transmite valores de filtro; index_col define el índice del DataFrame; parse_dates convierte columnas temporales.

**Búsqueda** params, index_col y parse_dates; Leer pedidos con fecha e índice

**Para recordar** No construyas SQL mediante concatenación de parámetros.

#### Leer pedidos con fecha e índice

```python
import pandas as pd
s=text("SELECT id, fecha, monto FROM pedidos WHERE monto >= :m ORDER BY id")
df=pd.read_sql_query(s,engine,params={"m":200},index_col="id",parse_dates=["fecha"])
print(df.to_string())
print(str(df.fecha.dtype))
```

No construyas SQL mediante concatenación de parámetros.

**Resultado**

```text
fecha  monto
id                   
102 2026-02-03    200
103 2026-02-03    200
105 2026-03-01    300
datetime64[ns]
```

### dtype, dtype_backend y coerce_float

**Clave** `dtype-dtype-backend-y-coerce-float`

**Definición** dtype convierte tipos del DataFrame; dtype_backend elige representación nullable o pyarrow; coerce_float puede convertir Decimal a float.

**Búsqueda** dtype, dtype_backend y coerce_float; Leer valores con tipo nullable

**Para recordar** No pierdas precisión monetaria por una conversión inadvertida.

**Nota** dtype_backend requiere Pandas 2.0+; pyarrow requiere instalar pyarrow.

#### Leer valores con tipo nullable

```python
import pandas as pd
df=pd.read_sql_query(select(clientes.c.id,clientes.c.pais).order_by(clientes.c.id),engine,dtype_backend="numpy_nullable")
print(df.dtypes.astype(str).to_dict())
print(df.pais.isna().sum())
```

No pierdas precisión monetaria por una conversión inadvertida.

**Resultado**

```text
{'id': 'Int64', 'pais': 'string'}
1
```

### chunksize en lectura

**Clave** `chunksize-en-lectura`

**Definición** chunksize devuelve un iterador de DataFrames de hasta ese número de filas.

**Búsqueda** chunksize en lectura; Leer pedidos por lotes

**Para recordar** Mantén la conexión abierta hasta terminar de iterar.

#### Leer pedidos por lotes

```python
import pandas as pd
with engine.connect() as conn:
    for lote in pd.read_sql_query(select(pedidos.c.id).order_by(pedidos.c.id),conn,chunksize=3):
        print(lote.id.tolist())
```

Mantén la conexión abierta hasta terminar de iterar.

**Resultado**

```text
[101, 102, 103]
[104, 105, 106]
[107]
```

### to_sql(), if_exists e index

**Clave** `to-sql-if-exists-e-index`

**Definición** to_sql() escribe DataFrames; append agrega, fail rechaza tablas existentes y replace elimina y recrea la tabla.

**Búsqueda** to_sql(), if_exists e index; Guardar un resumen nuevo

**Para recordar** index=False evita guardar un índice de Pandas innecesario; replace puede perder restricciones.

#### Guardar un resumen nuevo

```python
import pandas as pd
df=pd.DataFrame({"pais":["MX","ES"],"ventas":[500,400]})
df.to_sql("resumen",engine,if_exists="fail",index=False)
ver(text("SELECT pais, ventas FROM resumen ORDER BY pais"))
```

index=False evita guardar un índice de Pandas innecesario; replace puede perder restricciones.

**Resultado**

```text
('pais', 'ventas')
[('ES', 400), ('MX', 500)]
```

### dtype, schema, index_label y escritura por bloques

**Clave** `dtype-schema-index-label-y-escritura-por-bloques`

**Definición** dtype asigna tipos SQL; schema elige esquema; index_label nombra el índice si se guarda; chunksize limita lotes. method="multi" reúne filas en INSERT cuando el motor lo admite.

**Búsqueda** dtype, schema, index_label y escritura por bloques; Escribir con tipos explícitos

**Para recordar** Ajusta el tamaño del lote a los límites del driver.

#### Escribir con tipos explícitos

```python
import pandas as pd
df=pd.DataFrame({"codigo":["A","B"],"total":[10,20]})
df.to_sql("carga",engine,index=False,dtype={"codigo":String(10),"total":Integer},chunksize=1,method="multi")
print([(c["name"],str(c["type"])) for c in inspect(engine).get_columns("carga")])
```

Ajusta el tamaño del lote a los límites del driver.

**Resultado**

```text
[('codigo', 'VARCHAR(10)'), ('total', 'INTEGER')]
```

### to_sql() en una transacción

**Clave** `to-sql-en-una-transaccion`

**Definición** Al pasar una Connection que ya está en una transacción, Pandas no la confirma por su cuenta.

**Búsqueda** to_sql() en una transacción; Agregar una fila y verificar

**Para recordar** Usa engine.begin() si varias escrituras deben confirmarse juntas.

#### Agregar una fila y verificar

```python
import pandas as pd
with engine.begin() as conn:
    pd.DataFrame({"id":[4],"nombre":["Mesa"],"categoria":["Hogar"],"precio":[400]}).to_sql("productos",conn,if_exists="append",index=False)
valor(select(func.count()).select_from(productos))
```

Usa engine.begin() si varias escrituras deben confirmarse juntas.

**Resultado**

```text
4
```

## ORM: modelos y mapeo

**Clave** `orm-modelos`

### Definición

**Clave** `definicion`

**Definición** ORM mapea clases Python a tablas y atributos a columnas. Puedes declarar tablas nuevas o mapear las ya definidas en Core.

**Búsqueda** Definición; Consultar una entidad

**Para recordar** Una instancia representa una entidad, normalmente una fila identificada por su clave.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar una entidad

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    print(c.id,c.nombre,c.pais)
```

Una instancia representa una entidad, normalmente una fila identificada por su clave.

**Resultado**

```text
1 Ana MX
```

### DeclarativeBase, Mapped y mapped_column()

**Clave** `declarativebase-mapped-y-mapped-column`

**Definición** DeclarativeBase crea la base de modelos; Mapped tipa atributos mapeados; mapped_column configura columnas.

**Búsqueda** DeclarativeBase, Mapped y mapped_column(); Declarar una entidad nueva

**Para recordar** Los atributos anotados no se guardan hasta que existe una operación ORM persistente.

#### Declarar una entidad nueva

```python
class BaseLocal(DeclarativeBase):
    pass
class Region(BaseLocal):
    __tablename__="regiones"
    id: Mapped[int]=mapped_column(primary_key=True)
    nombre: Mapped[str]=mapped_column(String(50))
BaseLocal.metadata.create_all(engine)
print(inspect(engine).has_table("regiones"))
```

Los atributos anotados no se guardan hasta que existe una operación ORM persistente.

**Resultado**

```text
True
```

### __tablename__, __table__ y __table_args__

**Clave** `tablename-table-y-table-args`

**Definición** __tablename__ declara una tabla; __table__ reutiliza una Table existente; __table_args__ añade restricciones y opciones.

**Búsqueda** __tablename__, __table__ y __table_args__; Comprobar el mapeo sobre una tabla existente

**Para recordar** No declares __tablename__ y __table__ para crear dos tablas del mismo modelo.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Comprobar el mapeo sobre una tabla existente

```python
print(Cliente.__table__ is clientes,Pedido.__table__.name)
```

No declares __tablename__ y __table__ para crear dos tablas del mismo modelo.

**Resultado**

```text
True pedidos
```

### registry() y mapeo imperativo

**Clave** `registry-y-mapeo-imperativo`

**Definición** registry administra mappers. map_imperatively() enlaza una clase común con una Table.

**Búsqueda** registry() y mapeo imperativo; Mapear productos sin anotaciones declarativas

**Para recordar** El mapeo declarativo es la opción habitual para código nuevo.

#### Mapear productos sin anotaciones declarativas

```python
from sqlalchemy.orm import registry
r=registry()
class Producto:
    pass
r.map_imperatively(Producto,productos)
with Session(engine) as s:
    print(s.get(Producto,2).nombre)
```

El mapeo declarativo es la opción habitual para código nuevo.

**Resultado**

```text
Teclado
```

### mapped_as_dataclass()

**Clave** `mapped-as-dataclass`

**Definición** Integra modelos ORM con dataclasses, generando métodos como __init__ según configuración.

**Búsqueda** mapped_as_dataclass(); Construir una entidad como dataclass

**Para recordar** Los campos generados por la base pueden usar init=False.

#### Construir una entidad como dataclass

```python
from sqlalchemy.orm import MappedAsDataclass
class B(MappedAsDataclass,DeclarativeBase):
    pass
class Region(B):
    __tablename__="regiones"
    id: Mapped[int]=mapped_column(primary_key=True,init=False)
    nombre: Mapped[str]
r=Region(nombre="Centro")
print(r.nombre,r.id)
```

Los campos generados por la base pueden usar init=False.

**Resultado**

```text
Centro None
```

## Session y consultas ORM

**Clave** `session`

### Definición

**Clave** `definicion`

**Definición** Session administra la transacción ORM y las entidades que carga o modifica. No es una conexión global ni debe compartirse entre tareas concurrentes.

**Búsqueda** Definición; Consultar una lista de entidades

**Para recordar** Una Session por unidad de trabajo; ciérrala al terminar.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar una lista de entidades

```python
with Session(engine) as s:
    cs=s.scalars(select(Cliente).order_by(Cliente.id)).all()
    print([c.nombre for c in cs])
```

Una Session por unidad de trabajo; ciérrala al terminar.

**Resultado**

```text
['Ana', 'Luis', 'Marta', 'Noa', 'Eva']
```

### sessionmaker() y context manager

**Clave** `sessionmaker-y-context-manager`

**Definición** sessionmaker() crea una fábrica de sesiones configuradas. Su begin() abre sesión y transacción.

**Búsqueda** sessionmaker() y context manager; Crear y cerrar una sesión

**Para recordar** No confundas la fábrica con una sesión activa.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Crear y cerrar una sesión

```python
with Sesion() as s:
    print(s.get(Cliente,2).nombre)
```

No confundas la fábrica con una sesión activa.

**Resultado**

```text
Luis
```

### execute(), scalars() y get()

**Clave** `execute-scalars-y-get`

**Definición** execute() devuelve Result; scalars() devuelve valores o entidades; get() busca por clave primaria.

**Búsqueda** execute(), scalars() y get(); Comparar lectura escalar y por PK

**Para recordar** get() puede aprovechar la identity map sin emitir SQL.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Comparar lectura escalar y por PK

```python
with Session(engine) as s:
    print(s.scalars(select(Cliente.nombre).where(Cliente.id==3)).one())
    print(s.get(Cliente,3).nombre)
```

get() puede aprovechar la identity map sin emitir SQL.

**Resultado**

```text
Marta
Marta
```

### select() y filtros ORM

**Clave** `select-y-filtros-orm`

**Definición** Usa atributos de clases mapeadas como expresiones SQL.

**Búsqueda** select() y filtros ORM; Consultar clientes de México

**Para recordar** select(Cliente) devuelve entidades; select(Cliente.nombre) devuelve columnas.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar clientes de México

```python
with Session(engine) as s:
    print(s.scalars(select(Cliente.nombre).where(Cliente.pais=="MX").order_by(Cliente.id)).all())
```

select(Cliente) devuelve entidades; select(Cliente.nombre) devuelve columnas.

**Resultado**

```text
['Ana', 'Luis']
```

### from_statement() y SQL textual ORM

**Clave** `from-statement-y-sql-textual-orm`

**Definición** from_statement() permite cargar entidades a partir de una sentencia completa compatible con el mapeo.

**Búsqueda** from_statement() y SQL textual ORM; Leer entidades desde SQL textual

**Para recordar** La consulta debe devolver la clave y las columnas necesarias para la entidad.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Leer entidades desde SQL textual

```python
with Session(engine) as s:
    stmt=select(Cliente).from_statement(text("SELECT * FROM clientes WHERE id = :id"))
    print(s.scalars(stmt,{"id":1}).one().nombre)
```

La consulta debe devolver la clave y las columnas necesarias para la entidad.

**Resultado**

```text
Ana
```

### identity map y unit of work

**Clave** `identity-map-y-unit-of-work`

**Definición** La identity map mantiene una instancia por identidad dentro de una sesión. Unit of work ordena y emite los cambios pendientes al hacer flush.

**Búsqueda** identity map y unit of work; Comprobar identidad

**Para recordar** Dos lecturas de la misma identidad suelen compartir la misma instancia.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Comprobar identidad

```python
with Session(engine) as s:
    a=s.get(Cliente,1)
    b=s.get(Cliente,1)
    print(a is b)
```

Dos lecturas de la misma identidad suelen compartir la misma instancia.

**Resultado**

```text
True
```

## ORM: persistencia y estados

**Clave** `orm-persistencia`

### Definición

**Clave** `definicion`

**Definición** add(), delete() y cambios de atributos registran operaciones; flush() las envía a la transacción y commit() las confirma.

**Búsqueda** Definición; Modificar y confirmar una entidad

**Para recordar** flush no es commit.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Modificar y confirmar una entidad

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    c.nombre="Ana María"
    s.commit()
valor(select(clientes.c.nombre).where(clientes.c.id==1))
```

flush no es commit.

**Resultado**

```text
Ana María
```

### add() y add_all()

**Clave** `add-y-add-all`

**Definición** add() registra una instancia; add_all() registra varias. El INSERT ocurre durante flush.

**Búsqueda** add() y add_all(); Insertar un cliente

**Para recordar** Una instancia nueva puede no tener ID hasta el flush.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Insertar un cliente

```python
with Sesion.begin() as s:
    c=Cliente(nombre="Sol",alta=date(2026,1,8))
    s.add(c)
    s.flush()
    print(c.id)
```

Una instancia nueva puede no tener ID hasta el flush.

**Resultado**

```text
6
```

### delete() y actualización por atributos

**Clave** `delete-y-actualizacion-por-atributos`

**Definición** delete() marca una entidad para eliminación; modificar atributos marca cambios.

**Búsqueda** delete() y actualización por atributos; Eliminar un cliente sin compras

**Para recordar** Las relaciones y cascadas pueden alterar qué DML se emite.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Eliminar un cliente sin compras

```python
with Sesion.begin() as s:
    s.delete(s.get(Cliente,5))
valor(select(func.count()).select_from(clientes))
```

Las relaciones y cascadas pueden alterar qué DML se emite.

**Resultado**

```text
4
```

### flush(), commit() y rollback()

**Clave** `flush-commit-y-rollback`

**Definición** flush sincroniza cambios con la base dentro de la transacción; commit confirma; rollback revierte.

**Búsqueda** flush(), commit() y rollback(); Ver un ID y revertir su inserción

**Para recordar** Después de un flush fallido llama rollback() antes de reutilizar la Session.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Ver un ID y revertir su inserción

```python
with Session(engine) as s:
    c=Cliente(nombre="Sol",alta=date(2026,1,8))
    s.add(c)
    s.flush()
    print(c.id)
    s.rollback()
valor(select(func.count()).select_from(clientes))
```

Después de un flush fallido llama rollback() antes de reutilizar la Session.

**Resultado**

```text
6
5
```

### Transient, pending, persistent, deleted y detached

**Clave** `transient-pending-persistent-deleted-y-detached`

**Definición** inspect(objeto) permite consultar estados del ORM: nuevo, pendiente, persistente, eliminado y separado.

**Búsqueda** Transient, pending, persistent, deleted y detached; Observar tres estados y separación

**Para recordar** Una entidad detached no puede cargar atributos pendientes sin una sesión.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Observar tres estados y separación

```python
with Session(engine) as s:
    c=Cliente(nombre="Sol",alta=date(2026,1,8))
    print(inspect(c).transient)
    s.add(c)
    print(inspect(c).pending)
    s.flush()
    print(inspect(c).persistent)
    s.expunge(c)
    print(inspect(c).detached)
    s.rollback()
```

Una entidad detached no puede cargar atributos pendientes sin una sesión.

**Resultado**

```text
True
True
True
True
```

### new, dirty y deleted

**Clave** `new-dirty-y-deleted`

**Definición** Las colecciones de Session muestran objetos nuevos, modificados y marcados para borrar.

**Búsqueda** new, dirty y deleted; Inspeccionar cambios pendientes

**Para recordar** dirty puede incluir modificaciones que no produzcan un UPDATE real.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Inspeccionar cambios pendientes

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    c.nombre="Anita"
    print(c in s.dirty,s.is_modified(c))
```

dirty puede incluir modificaciones que no produzcan un UPDATE real.

**Resultado**

```text
True True
```

### refresh(), expire() y expire_all()

**Clave** `refresh-expire-y-expire-all`

**Definición** refresh() recarga inmediatamente; expire() invalida atributos para recargarlos al acceder.

**Búsqueda** refresh(), expire() y expire_all(); Recuperar un valor original

**Para recordar** Pueden descartar cambios locales no enviados.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Recuperar un valor original

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    c.nombre="Cambio local"
    s.refresh(c)
    print(c.nombre)
```

Pueden descartar cambios locales no enviados.

**Resultado**

```text
Ana
```

### merge() y expunge()

**Clave** `merge-y-expunge`

**Definición** merge() copia estado a una instancia administrada y devuelve esa instancia. expunge() separa un objeto de la sesión; expunge_all() separa todos.

**Búsqueda** merge() y expunge(); Reasociar estado de una entidad

**Para recordar** Usa el objeto devuelto por merge(), no el original.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Reasociar estado de una entidad

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    s.expunge(c)
    c.nombre="Anita"
    otro=s.merge(c)
    print(otro is c,otro.nombre,inspect(otro).persistent)
```

Usa el objeto devuelto por merge(), no el original.

**Resultado**

```text
False Anita True
```

### autoflush, no_autoflush y expire_on_commit

**Clave** `autoflush-no-autoflush-y-expire-on-commit`

**Definición** autoflush envía cambios antes de ciertas consultas; no_autoflush lo suspende temporalmente. expire_on_commit controla expiración al confirmar.

**Búsqueda** autoflush, no_autoflush y expire_on_commit; Consultar antes y después del flush

**Para recordar** commit hace flush aunque autoflush esté desactivado.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar antes y después del flush

```python
with Session(engine) as s:
    s.add(Cliente(nombre="Sol",alta=date(2026,1,8)))
    with s.no_autoflush:
        print(s.scalar(select(func.count()).select_from(Cliente)))
    print(s.scalar(select(func.count()).select_from(Cliente)))
```

commit hace flush aunque autoflush esté desactivado.

**Resultado**

```text
5
6
```

### DML masivo ORM

**Clave** `dml-masivo-orm`

**Definición** Session.execute() puede ejecutar INSERT, UPDATE y DELETE sobre modelos. Las estrategias de sincronización coordinan objetos cargados.

**Búsqueda** DML masivo ORM; Actualizar un conjunto de entidades

**Para recordar** No confundir un UPDATE de conjunto con modificar objetos uno por uno.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Actualizar un conjunto de entidades

```python
with Sesion.begin() as s:
    s.execute(update(Cliente).where(Cliente.pais=="MX").values(pais="Mexico"))
ver(select(clientes.c.nombre).where(clientes.c.pais=="Mexico").order_by(clientes.c.id))
```

No confundir un UPDATE de conjunto con modificar objetos uno por uno.

**Resultado**

```text
('nombre',)
[('Ana',), ('Luis',)]
```

## ORM: relaciones

**Clave** `orm-relaciones`

### Definición

**Clave** `definicion`

**Definición** relationship() permite navegar entre entidades relacionadas. back_populates conecta los dos lados de la relación en memoria.

**Búsqueda** Definición; Navegar pedidos de un cliente

**Para recordar** ForeignKey define integridad; relationship define navegación ORM.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Navegar pedidos de un cliente

```python
with Session(engine) as s:
    c=s.get(Cliente,1)
    print(sorted(p.id for p in c.pedidos))
```

ForeignKey define integridad; relationship define navegación ORM.

**Resultado**

```text
[101, 102]
```

### One-to-many y many-to-one

**Clave** `one-to-many-y-many-to-one`

**Definición** Una colección Mapped[list[Pedido]] representa el lado uno a muchos; una referencia Mapped[Cliente] representa el lado muchos a uno.

**Búsqueda** One-to-many y many-to-one; Ir de pedido a cliente

**Para recordar** La FK suele vivir en el lado muchos.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Ir de pedido a cliente

```python
with Session(engine) as s:
    p=s.get(Pedido,103)
    print(p.cliente.nombre)
```

La FK suele vivir en el lado muchos.

**Resultado**

```text
Luis
```

### One-to-one

**Clave** `one-to-one`

**Definición** Una relación escalar en ambos lados expresa uno a uno en ORM; una restricción UNIQUE en la FK garantiza la unicidad en la base.

**Búsqueda** One-to-one; Comprobar la cardinalidad mapeada

**Para recordar** uselist=False por sí solo no impone unicidad en SQL.

**Nota** Requiere la preparación ORM de Datos compartidos. Para uno a uno, declara la FK unique=True y ambos atributos como escalares; la colección del ejemplo compartido es uno a muchos.

#### Comprobar la cardinalidad mapeada

```python
print(inspect(Pedido).relationships.cliente.uselist)
print(inspect(Cliente).relationships.pedidos.uselist)
```

uselist=False por sí solo no impone unicidad en SQL.

**Resultado**

```text
False
True
```

### Many-to-many y secondary

**Clave** `many-to-many-y-secondary`

**Definición** Una tabla de asociación contiene las claves de ambos lados. relationship(secondary=...) permite navegar sin mapearla como entidad.

**Búsqueda** Many-to-many y secondary; Identificar la tabla puente en el dataset

**Para recordar** Si la asociación tiene datos propios, considera un modelo de asociación.

**Nota** detalles es una asociación con cantidad y precio. Un modelo de asociación es más apropiado que secondary para modificar esos atributos.

#### Identificar la tabla puente en el dataset

```python
print([fk.target_fullname for fk in detalles.c.pedido_id.foreign_keys])
print([fk.target_fullname for fk in detalles.c.producto_id.foreign_keys])
```

Si la asociación tiene datos propios, considera un modelo de asociación.

**Resultado**

```text
['pedidos.id']
['productos.id']
```

### join() con relaciones y aliased()

**Clave** `join-con-relaciones-y-aliased`

**Definición** ORM puede construir joins con atributos relationship. aliased() crea otro rol para una entidad.

**Búsqueda** join() con relaciones y aliased(); Consultar cliente y pedido por relación

**Para recordar** Usa alias cuando una entidad participa varias veces.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar cliente y pedido por relación

```python
with Session(engine) as s:
    stmt=select(Cliente.nombre,Pedido.id).join(Cliente.pedidos).order_by(Pedido.id)
    print(s.execute(stmt).all())
```

Usa alias cuando una entidad participa varias veces.

**Resultado**

```text
[('Ana', 101), ('Ana', 102), ('Luis', 103), ('Luis', 104), ('Marta', 105), ('Marta', 106), ('Noa', 107)]
```

### any() y has()

**Clave** `any-y-has`

**Definición** any() comprueba coincidencias en relaciones de colección; has() en relaciones escalares. Generan EXISTS.

**Búsqueda** any() y has(); Buscar clientes con compras altas

**Para recordar** Son métodos ORM de relaciones, distintos de any_() y all_() SQL.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Buscar clientes con compras altas

```python
with Session(engine) as s:
    stmt=select(Cliente.nombre).where(Cliente.pedidos.any(Pedido.monto>=300)).order_by(Cliente.id)
    print(s.scalars(stmt).all())
```

Son métodos ORM de relaciones, distintos de any_() y all_() SQL.

**Resultado**

```text
['Marta']
```

### cascade, delete-orphan y passive_deletes

**Clave** `cascade-delete-orphan-y-passive-deletes`

**Definición** cascade decide qué operaciones ORM se propagan; delete-orphan elimina entidades dependientes retiradas de la relación apropiada. passive_deletes delega parte del trabajo en la base.

**Búsqueda** cascade, delete-orphan y passive_deletes; Inspeccionar cascada actual

**Para recordar** Configura las cascadas según el ciclo de vida real de las entidades.

**Nota** Requiere la preparación ORM de Datos compartidos. El dataset no configura borrado en cascada. Para usarlo, coordina ondelete de la FK con cascade y passive_deletes.

#### Inspeccionar cascada actual

```python
rel=inspect(Cliente).relationships.pedidos
print(sorted(rel.cascade),rel.passive_deletes)
```

Configura las cascadas según el ciclo de vida real de las entidades.

**Resultado**

```text
['merge', 'save-update'] False
```

### primaryjoin y secondaryjoin

**Clave** `primaryjoin-y-secondaryjoin`

**Definición** Permiten especificar condiciones de enlace cuando la inferencia por claves no basta.

**Búsqueda** primaryjoin y secondaryjoin; Inspeccionar el JOIN inferido

**Para recordar** Las condiciones de carga no son restricciones de integridad.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Inspeccionar el JOIN inferido

```python
print(inspect(Cliente).relationships.pedidos.primaryjoin)
```

Las condiciones de carga no son restricciones de integridad.

**Resultado**

```text
clientes.id = pedidos.cliente_id
```

## ORM: carga de relaciones y rendimiento

**Clave** `orm-carga`

### Definición

**Clave** `definicion`

**Definición** Las estrategias de carga determinan cuándo y cómo se consultan relaciones. Lazy loading consulta al acceder; eager loading prepara datos de antemano.

**Búsqueda** Definición; Cargar clientes y pedidos en lotes

**Para recordar** Elige según cardinalidad y volumen, no cargues todo siempre.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Cargar clientes y pedidos en lotes

```python
from sqlalchemy.orm import selectinload
with Session(engine) as s:
    cs=s.scalars(select(Cliente).options(selectinload(Cliente.pedidos)).order_by(Cliente.id)).all()
    print([(c.nombre,len(c.pedidos)) for c in cs])
```

Elige según cardinalidad y volumen, no cargues todo siempre.

**Resultado**

```text
[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]
```

### Lazy loading y N+1

**Clave** `lazy-loading-y-n-1`

**Definición** N+1 ocurre al consultar una lista y disparar una consulta adicional por cada objeto al acceder a su relación.

**Búsqueda** Lazy loading y N+1; Contar consultas lazy de clientes y pedidos

**Para recordar** Inspecciona el SQL antes de optimizar.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Contar consultas lazy de clientes y pedidos

```python
n=[]
@sa.event.listens_for(engine,"before_cursor_execute")
def contar(*args):
    n.append(1)
with Session(engine) as s:
    cs=s.scalars(select(Cliente).order_by(Cliente.id)).all()
    print(sum(len(c.pedidos) for c in cs),len(n))
```

Inspecciona el SQL antes de optimizar.

**Resultado**

```text
7 6
```

### selectinload()

**Clave** `selectinload`

**Definición** Carga relaciones mediante una consulta adicional que utiliza las claves de las entidades principales.

**Búsqueda** selectinload(); Reducir consultas de colecciones

**Para recordar** Es útil para colecciones; las claves compuestas requieren soporte de tuple IN.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Reducir consultas de colecciones

```python
from sqlalchemy.orm import selectinload
n=[]
@sa.event.listens_for(engine,"before_cursor_execute")
def contar(*args):
    n.append(1)
with Session(engine) as s:
    cs=s.scalars(select(Cliente).options(selectinload(Cliente.pedidos))).all()
    print(sum(len(c.pedidos) for c in cs),len(n))
```

Es útil para colecciones; las claves compuestas requieren soporte de tuple IN.

**Resultado**

```text
7 2
```

### joinedload() y unique()

**Clave** `joinedload-y-unique`

**Definición** joinedload() carga mediante un JOIN adicional. Al cargar colecciones con joinedload, aplica unique() al resultado ORM.

**Búsqueda** joinedload() y unique(); Cargar clientes con sus pedidos

**Para recordar** El JOIN de carga no sustituye el JOIN que filtra la consulta.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Cargar clientes con sus pedidos

```python
from sqlalchemy.orm import joinedload
with Session(engine) as s:
    cs=s.scalars(select(Cliente).options(joinedload(Cliente.pedidos)).order_by(Cliente.id)).unique().all()
    print([(c.nombre,len(c.pedidos)) for c in cs])
```

El JOIN de carga no sustituye el JOIN que filtra la consulta.

**Resultado**

```text
[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]
```

### subqueryload() y contains_eager()

**Clave** `subqueryload-y-contains-eager`

**Definición** subqueryload() carga desde una subconsulta; contains_eager() usa un JOIN escrito explícitamente para poblar una relación.

**Búsqueda** subqueryload() y contains_eager(); Reutilizar un JOIN para cargar una colección

**Para recordar** Con contains_eager() el filtro del JOIN puede dejar una colección parcial.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Reutilizar un JOIN para cargar una colección

```python
from sqlalchemy.orm import contains_eager
with Session(engine) as s:
    stmt=select(Cliente).join(Cliente.pedidos).options(contains_eager(Cliente.pedidos)).where(Cliente.id==1)
    c=s.scalars(stmt).unique().one()
    print(sorted(p.id for p in c.pedidos))
```

Con contains_eager() el filtro del JOIN puede dejar una colección parcial.

**Resultado**

```text
[101, 102]
```

### raiseload(), load_only(), defer() y undefer()

**Clave** `raiseload-load-only-defer-y-undefer`

**Definición** raiseload() evita cargas lazy accidentales de relaciones. load_only/defer/undefer controlan columnas cargadas.

**Búsqueda** raiseload(), load_only(), defer() y undefer(); Consultar solo atributos necesarios

**Para recordar** Acceder a una columna diferida puede generar SQL adicional.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Consultar solo atributos necesarios

```python
from sqlalchemy.orm import load_only,raiseload
with Session(engine) as s:
    c=s.scalars(select(Cliente).options(load_only(Cliente.nombre),raiseload(Cliente.pedidos)).where(Cliente.id==1)).one()
    print(c.nombre, "pais" in inspect(c).unloaded)
    try:
        print(c.pedidos)
    except sa.exc.InvalidRequestError:
        print("carga lazy bloqueada")
```

Acceder a una columna diferida puede generar SQL adicional.

**Resultado**

```text
Ana True
carga lazy bloqueada
```

## ORM: atributos y patrones avanzados

**Clave** `orm-avanzado`

### Definición

**Clave** `definicion`

**Definición** Los atributos híbridos y los mapeos especializados amplían cómo se representan y consultan entidades. Son útiles cuando una aplicación requiere más que consultas relacionales directas.

**Búsqueda** Definición; Inspeccionar las columnas mapeadas

**Para recordar** Para análisis, usa primero expresiones SQL simples.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Inspeccionar las columnas mapeadas

```python
print([p.key for p in inspect(Cliente).column_attrs])
```

Para análisis, usa primero expresiones SQL simples.

**Resultado**

```text
['id', 'nombre', 'pais', 'alta']
```

### hybrid_property

**Clave** `hybrid-property`

**Definición** Un atributo híbrido puede funcionar como cálculo Python en una instancia y como expresión SQL en una clase.

**Búsqueda** hybrid_property; Consultar un cálculo híbrido

**Para recordar** Si la lógica Python y SQL difiere, define su expresión explícitamente.

#### Consultar un cálculo híbrido

```python
from sqlalchemy.ext.hybrid import hybrid_property
class B(DeclarativeBase):
    pass
class Producto(B):
    __table__=productos
    @hybrid_property
    def doble(self):
        return self.precio*2
with Session(engine) as s:
    print(s.get(Producto,1).doble)
    print(s.scalars(select(Producto.doble).where(Producto.id==2)).one())
```

Si la lógica Python y SQL difiere, define su expresión explícitamente.

**Resultado**

```text
200
400
```

### column_property()

**Clave** `column-property`

**Definición** Mapea una expresión SQL como atributo ORM que se carga junto a la entidad.

**Búsqueda** column_property(); Exponer el doble del precio

**Para recordar** No es una columna física nueva en la base.

#### Exponer el doble del precio

```python
from sqlalchemy.orm import column_property
class B(DeclarativeBase):
    pass
class Producto(B):
    __table__=productos
    doble=column_property(productos.c.precio*2)
with Session(engine) as s:
    print(s.get(Producto,3).doble)
```

No es una columna física nueva en la base.

**Resultado**

```text
600
```

### association_proxy

**Clave** `association-proxy`

**Definición** Expone atributos de entidades relacionadas mediante una propiedad intermediaria.

**Búsqueda** association_proxy; Exponer los IDs de pedidos de un cliente

**Para recordar** No sustituye necesariamente a JOIN en consultas complejas.

**Nota** Requiere la preparación ORM de Datos compartidos.

#### Exponer los IDs de pedidos de un cliente

```python
from sqlalchemy.ext.associationproxy import association_proxy
Cliente.ids_pedidos=association_proxy("pedidos","id")
with Session(engine) as s:
    print(sorted(s.get(Cliente,1).ids_pedidos))
```

No sustituye necesariamente a JOIN en consultas complejas.

**Resultado**

```text
[101, 102]
```

### Herencia y polimorfismo

**Clave** `herencia-y-polimorfismo`

**Definición** El ORM admite single-table, joined-table y concrete-table inheritance. polymorphic_on selecciona el subtipo al leer.

**Búsqueda** Herencia y polimorfismo; Mapear subtipos en una tabla

**Para recordar** Elige estrategia según esquema, integridad y consultas.

#### Mapear subtipos en una tabla

```python
class B(DeclarativeBase):
    pass
class Persona(B):
    __tablename__="personas"
    id: Mapped[int]=mapped_column(primary_key=True)
    tipo: Mapped[str]=mapped_column()
    __mapper_args__={"polymorphic_on":tipo,"polymorphic_identity":"persona"}
class Analista(Persona):
    __mapper_args__={"polymorphic_identity":"analista"}
B.metadata.create_all(engine)
with Session(engine) as s:
    s.add(Analista(id=1))
    s.commit()
    print(type(s.get(Persona,1)).__name__)
```

Elige estrategia según esquema, integridad y consultas.

**Resultado**

```text
Analista
```

### version_id_col

**Clave** `version-id-col`

**Definición** Configura una versión de fila para detectar cambios concurrentes al hacer flush de entidades individuales.

**Búsqueda** version_id_col; Incrementar una versión al modificar

**Para recordar** No protege automáticamente UPDATE/DELETE masivos.

#### Incrementar una versión al modificar

```python
class B(DeclarativeBase):
    pass
class Informe(B):
    __tablename__="informes"
    id: Mapped[int]=mapped_column(primary_key=True)
    version: Mapped[int]=mapped_column()
    nombre: Mapped[str]
    __mapper_args__={"version_id_col":version}
B.metadata.create_all(engine)
with Session(engine) as s:
    r=Informe(id=1,nombre="A")
    s.add(r); s.flush(); print(r.version)
    r.nombre="B"; s.flush(); print(r.version)
```

No protege automáticamente UPDATE/DELETE masivos.

**Resultado**

```text
1
2
```

### validates()

**Clave** `validates`

**Definición** Un validador ORM intercepta asignaciones normales a atributos. No reemplaza restricciones de base.

**Búsqueda** validates(); Normalizar una categoría

**Para recordar** Las escrituras Core o SQL directo no pasan por este validador.

#### Normalizar una categoría

```python
from sqlalchemy.orm import validates
class B(DeclarativeBase):
    pass
class Producto(B):
    __table__=productos
    @validates("categoria")
    def normalizar(self,key,value):
        return value.strip()
p=Producto(categoria=" Tech ")
print(p.categoria)
```

Las escrituras Core o SQL directo no pasan por este validador.

**Resultado**

```text
Tech
```

### Automap y DeferredReflection

**Clave** `automap-y-deferredreflection`

**Definición** Automap genera mapeos a partir de metadatos reflejados; DeferredReflection aplaza la reflexión de clases declaradas.

**Búsqueda** Automap y DeferredReflection; Mapear una tabla ya existente

**Para recordar** Automap requiere claves identificables y convenciones adecuadas.

#### Mapear una tabla ya existente

```python
from sqlalchemy.ext.automap import automap_base
B=automap_base()
B.prepare(autoload_with=engine)
with Session(engine) as s:
    print(s.get(B.classes.clientes,1).nombre)
```

Automap requiere claves identificables y convenciones adecuadas.

**Resultado**

```text
Ana
```

## Pool de conexiones y concurrencia

**Clave** `pool`

### Definición

**Clave** `definicion`

**Definición** El pool reutiliza conexiones físicas para evitar abrir una por consulta. Un Engine puede compartirse; cada hilo o tarea debe manejar su propia Connection o Session.

**Búsqueda** Definición; Identificar el pool de SQLite en memoria

**Para recordar** Devuelve conexiones al pool al terminar.

#### Identificar el pool de SQLite en memoria

```python
print(type(engine.pool).__name__)
```

Devuelve conexiones al pool al terminar.

**Resultado**

```text
SingletonThreadPool
```

### QueuePool, NullPool y StaticPool

**Clave** `queuepool-nullpool-y-staticpool`

**Definición** QueuePool limita y reutiliza conexiones; NullPool abre y cierra en cada uso; StaticPool mantiene una conexión.

**Búsqueda** QueuePool, NullPool y StaticPool; Crear un motor sin reutilización

**Para recordar** SQLite en memoria requiere cuidar qué conexión contiene los datos.

#### Crear un motor sin reutilización

```python
from sqlalchemy.pool import NullPool
e=create_engine("sqlite://",poolclass=NullPool)
print(type(e.pool).__name__)
e.dispose()
```

SQLite en memoria requiere cuidar qué conexión contiene los datos.

**Resultado**

```text
NullPool
```

### pool_size, max_overflow y pool_timeout

**Clave** `pool-size-max-overflow-y-pool-timeout`

**Definición** Limitan conexiones retenidas, conexiones adicionales y tiempo de espera con QueuePool.

**Búsqueda** pool_size, max_overflow y pool_timeout; Configurar límites del pool

**Para recordar** No aumentes el pool sin considerar capacidad de la base.

#### Configurar límites del pool

```python
from sqlalchemy.pool import QueuePool
e=create_engine("sqlite://",poolclass=QueuePool,pool_size=2,max_overflow=1,pool_timeout=3)
print(e.pool.size(),e.pool.timeout())
e.dispose()
```

No aumentes el pool sin considerar capacidad de la base.

**Resultado**

```text
2 3
```

### pool_recycle y pool_pre_ping

**Clave** `pool-recycle-y-pool-pre-ping`

**Definición** pool_recycle reemplaza conexiones viejas al volver a prestarlas; pool_pre_ping comprueba disponibilidad al obtener una conexión.

**Búsqueda** pool_recycle y pool_pre_ping; Activar controles de conexión

**Para recordar** Pre-ping no rescata una transacción interrumpida.

#### Activar controles de conexión

```python
e=create_engine("sqlite://",pool_pre_ping=True,pool_recycle=1800)
with e.connect() as c:
    print(c.execute(text("SELECT 1")).scalar_one())
e.dispose()
```

Pre-ping no rescata una transacción interrumpida.

**Resultado**

```text
1
```

### invalidate() y reconexión

**Clave** `invalidate-y-reconexion`

**Definición** invalidate() descarta la conexión DBAPI subyacente. Si existe una transacción pendiente, revierte antes de reconectar.

**Búsqueda** invalidate() y reconexión; Invalidar una conexión de prueba

**Para recordar** Una reconexión no recupera cambios no confirmados.

#### Invalidar una conexión de prueba

```python
e=create_engine("sqlite://")
with e.connect() as c:
    c.execute(text("SELECT 1"))
    c.invalidate()
    c.rollback()
    print(c.execute(text("SELECT 1")).scalar_one())
e.dispose()
```

Una reconexión no recupera cambios no confirmados.

**Resultado**

```text
1
```

### Hilos, procesos y sesiones

**Clave** `hilos-procesos-y-sesiones`

**Definición** Engine y pool pueden reutilizarse en un proceso; Connection y Session no se comparten simultáneamente. Tras fork, evita reutilizar conexiones heredadas.

**Búsqueda** Hilos, procesos y sesiones; Crear dos sesiones independientes

**Para recordar** Una sesión por hilo o tarea; motor por proceso o dispose(close=False) en hijo.

**Nota** No ejecutes transacciones concurrentes sobre el mismo SQLite en memoria de este ejemplo.

#### Crear dos sesiones independientes

```python
with Session(engine) as a, Session(engine) as b:
    print(a is b) 
```

Una sesión por hilo o tarea; motor por proceso o dispose(close=False) en hijo.

**Resultado**

```text
False
```

## Rendimiento, eventos y extensiones

**Clave** `rendimiento`

### Definición

**Clave** `definicion`

**Definición** El rendimiento depende del SQL, índices, volumen de datos, driver y modo de carga. Mide antes de cambiar la arquitectura.

**Búsqueda** Definición; Consultar un plan SQLite

**Para recordar** Optimiza consultas y evita traer columnas o filas innecesarias.

**Nota** El texto exacto del plan depende de SQLite y sus estadísticas.

#### Consultar un plan SQLite

```python
with engine.connect() as c:
    print(c.exec_driver_sql("EXPLAIN QUERY PLAN SELECT * FROM clientes WHERE id=1").all())
```

Optimiza consultas y evita traer columnas o filas innecesarias.

**Resultado**

```text
[(2, 0, 0, 'SEARCH clientes USING INTEGER PRIMARY KEY (rowid=?)')]
```

### stream_results y yield_per

**Clave** `stream-results-y-yield-per`

**Definición** Solicitan resultados en streaming o lotes de filas cuando el driver lo permite. yield_per también establece un tamaño de buffer.

**Búsqueda** stream_results y yield_per; Procesar dos pedidos por lote

**Para recordar** No todos los drivers tienen cursores de servidor. Evita all() si buscas limitar memoria.

#### Procesar dos pedidos por lote

```python
with engine.connect() as c:
    with c.execution_options(yield_per=2).execute(select(pedidos.c.id).order_by(pedidos.c.id)) as r:
        print([list(b) for b in r.partitions()])
```

No todos los drivers tienen cursores de servidor. Evita all() si buscas limitar memoria.

**Resultado**

```text
[[(101,), (102,)], [(103,), (104,)], [(105,), (106,)], [(107,)]]
```

### insertmanyvalues y cargas masivas

**Clave** `insertmanyvalues-y-cargas-masivas`

**Definición** SQLAlchemy puede optimizar múltiples INSERT según dialecto, driver y RETURNING. executemany y batching no son idénticos.

**Búsqueda** insertmanyvalues y cargas masivas; Insertar y devolver varios IDs

**Para recordar** Mide el tamaño de lote; respeta restricciones y transacciones.

**Nota** Depende del soporte de RETURNING masivo; si necesitas correlación exacta usa sort_by_parameter_order=True cuando sea compatible.

#### Insertar y devolver varios IDs

```python
with engine.begin() as c:
    r=c.execute(insert(productos).returning(productos.c.id),[dict(nombre="Mesa",precio=400),dict(nombre="Cable",precio=30)])
    print(sorted(r.scalars().all()))
```

Mide el tamaño de lote; respeta restricciones y transacciones.

**Resultado**

```text
[4, 5]
```

### event.listen() y listens_for()

**Clave** `event-listen-y-listens-for`

**Definición** Registran callbacks para eventos de Engine, Pool, Session y otros objetos.

**Búsqueda** event.listen() y listens_for(); Medir cuántas sentencias se emiten

**Para recordar** Un evento de cursor recibe SQL y parámetros: no registres secretos.

#### Medir cuántas sentencias se emiten

```python
n=[]
def contar(*args):
    n.append(1)
sa.event.listen(engine,"before_cursor_execute",contar)
valor(select(func.count()).select_from(clientes))
sa.event.remove(engine,"before_cursor_execute",contar)
print(len(n))
```

Un evento de cursor recibe SQL y parámetros: no registres secretos.

**Resultado**

```text
5
1
```

### Eventos de pool y sesión

**Clave** `eventos-de-pool-y-sesion`

**Definición** connect, checkout y checkin se refieren a conexiones; before_flush y otros eventos permiten observar el ciclo ORM.

**Búsqueda** Eventos de pool y sesión; Registrar el préstamo y devolución

**Para recordar** No realices trabajo pesado dentro de cada callback.

#### Registrar el préstamo y devolución

```python
n=[]
@sa.event.listens_for(engine,"checkout")
def prestamo(*args):
    n.append("checkout")
@sa.event.listens_for(engine,"checkin")
def devolucion(*args):
    n.append("checkin")
with engine.connect():
    pass
print(n)
```

No realices trabajo pesado dentro de cada callback.

**Resultado**

```text
['checkout', 'checkin']
```

### Perfilado y tiempos

**Clave** `perfilado-y-tiempos`

**Definición** before_cursor_execute y after_cursor_execute permiten medir ejecución en el driver; el tiempo total puede incluir carga y transformación.

**Búsqueda** Perfilado y tiempos; Cronometrar una consulta

**Para recordar** No confundas tiempo de ejecución con tiempo de recuperar todas las filas.

#### Cronometrar una consulta

```python
from time import perf_counter
t=perf_counter()
with engine.connect() as c:
    c.execute(select(pedidos)).all()
print(perf_counter()-t>=0)
```

No confundas tiempo de ejecución con tiempo de recuperar todas las filas.

**Resultado**

```text
True
```

### TypeDecorator y UserDefinedType

**Clave** `typedecorator-y-userdefinedtype`

**Definición** TypeDecorator amplía conversiones bind/result de un tipo existente; UserDefinedType describe un tipo SQL propio.

**Búsqueda** TypeDecorator y UserDefinedType; Normalizar texto al guardar

**Para recordar** cache_ok debe reflejar si la configuración es segura para la caché SQL.

#### Normalizar texto al guardar

```python
class Mayus(sa.TypeDecorator):
    impl=String
    cache_ok=True
    def process_bind_param(self,value,dialect):
        return value.upper() if value is not None else None
m=MetaData()
t=Table("codigos",m,Column("codigo",Mayus(10)))
m.create_all(engine)
with engine.begin() as c:
    c.execute(insert(t).values(codigo="mx"))
valor(select(t.c.codigo))
```

cache_ok debe reflejar si la configuración es segura para la caché SQL.

**Resultado**

```text
MX
```

### Múltiples engines y sharding

**Clave** `multiples-engines-y-sharding`

**Definición** Se pueden dirigir operaciones a distintas bases con engines separados o binds de Session. Horizontal sharding distribuye filas de una entidad entre bases.

**Búsqueda** Múltiples engines y sharding; Consultar dos bases independientes

**Para recordar** No asumas atomicidad distribuida entre engines.

#### Consultar dos bases independientes

```python
e1=create_engine("sqlite://")
e2=create_engine("sqlite://")
with e1.connect() as a,e2.connect() as b:
    print(a.execute(text("SELECT 1")).scalar(),b.execute(text("SELECT 2")).scalar())
e1.dispose();e2.dispose()
```

No asumas atomicidad distribuida entre engines.

**Resultado**

```text
1 2
```

## SQLAlchemy asyncio

**Clave** `asyncio`

### Definición

**Clave** `definicion`

**Definición** AsyncEngine y AsyncConnection permiten usar drivers asíncronos mediante await. Requieren un driver compatible con asyncio.

**Búsqueda** Definición; Ejecutar SQL asíncrono con SQLite

**Para recordar** AsyncSession no debe compartirse entre tareas concurrentes.

**Nota** Requiere pip install aiosqlite. Ejecuta como script; en un notebook con loop activo usa await main().

#### Ejecutar SQL asíncrono con SQLite

```python
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
async def main():
    e=create_async_engine("sqlite+aiosqlite:///:memory:")
    async with e.connect() as c:
        print((await c.execute(text("SELECT 1"))).scalar_one())
    await e.dispose()
asyncio.run(main())
```

AsyncSession no debe compartirse entre tareas concurrentes.

**Resultado esperado**

```text
1
```

### AsyncSession y async_sessionmaker()

**Clave** `asyncsession-y-async-sessionmaker`

**Definición** AsyncSession ofrece operaciones ORM asíncronas; async_sessionmaker crea sesiones configuradas.

**Búsqueda** AsyncSession y async_sessionmaker(); Consultar un valor en una sesión asíncrona

**Para recordar** await execute(), commit() y rollback() cuando corresponda.

**Nota** Requiere aiosqlite; usa un script independiente.

#### Consultar un valor en una sesión asíncrona

```python
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker
async def main():
    e=create_async_engine("sqlite+aiosqlite://")
    Fabrica=async_sessionmaker(e,expire_on_commit=False)
    async with Fabrica() as s:
        print(await s.scalar(text("SELECT 2")))
    await e.dispose()
asyncio.run(main())
```

await execute(), commit() y rollback() cuando corresponda.

**Resultado esperado**

```text
2
```

### run_sync() y AsyncResult

**Clave** `run-sync-y-asyncresult`

**Definición** run_sync() permite invocar APIs síncronas adaptadas, como create_all(); stream() devuelve AsyncResult para iterar asíncronamente.

**Búsqueda** run_sync() y AsyncResult; Crear tablas con un motor asíncrono

**Para recordar** No uses run_sync() para código bloqueante ajeno a SQLAlchemy.

**Nota** Requiere aiosqlite y la preparación compartida para metadata. Las tablas se crean en otro motor, sin datos.

#### Crear tablas con un motor asíncrono

```python
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
async def main():
    e=create_async_engine("sqlite+aiosqlite://")
    async with e.begin() as c:
        await c.run_sync(metadata.create_all)
        async with c.stream(text("SELECT 1")) as r:
            async for row in r:
                print(tuple(row))
    await e.dispose()
asyncio.run(main())
```

No uses run_sync() para código bloqueante ajeno a SQLAlchemy.

**Resultado esperado**

```text
(1,)
```

## Alembic y migraciones

**Clave** `alembic`

### Definición

**Clave** `definicion`

**Definición** Alembic es una biblioteca externa que versiona cambios del esquema. SQLAlchemy create_all() no reemplaza migraciones.

**Búsqueda** Definición; Inicializar un entorno de migración

**Para recordar** Revisa el script antes de aplicarlo y prueba en una base aislada.

**Nota** Ejecuta en un proyecto nuevo, no sobre un entorno Alembic existente.

#### Inicializar un entorno de migración

```bash
python -m pip install alembic
alembic init migraciones
```

Revisa el script antes de aplicarlo y prueba en una base aislada.

**Resultado esperado**

```text
Se crean alembic.ini y el directorio migraciones con env.py, script.py.mako y versions.
```

### revision y autogenerate

**Clave** `revision-y-autogenerate`

**Definición** revision crea un script de migración; --autogenerate compara metadata con el esquema configurado y propone operaciones.

**Búsqueda** revision y autogenerate; Generar una revisión a partir de modelos

**Para recordar** Autogenerate no detecta todos los cambios ni renombrados correctamente.

**Nota** Después de alembic init, configura sqlalchemy.url en alembic.ini con una base de prueba y target_metadata en env.py con el MetaData importado de tus modelos. No guardes credenciales reales en el repositorio.

#### Generar una revisión a partir de modelos

```bash
alembic revision --autogenerate -m "crear tablas"
```

Autogenerate no detecta todos los cambios ni renombrados correctamente.

**Resultado esperado**

```text
Un script de revisión en versions con upgrade() y downgrade() propuestos.
```

### upgrade(), downgrade() y revision history

**Clave** `upgrade-downgrade-y-revision-history`

**Definición** upgrade aplica migraciones hasta la revisión indicada; downgrade revierte según el código definido.

**Búsqueda** upgrade(), downgrade() y revision history; Aplicar e inspeccionar revisiones

**Para recordar** Un downgrade puede perder datos; no garantiza recuperación.

**Nota** Requiere la revisión anterior revisada y la conexión configurada. Para revertir una revisión en pruebas: alembic downgrade -1.

#### Aplicar e inspeccionar revisiones

```bash
alembic upgrade head
alembic current
alembic history
```

Un downgrade puede perder datos; no garantiza recuperación.

**Resultado esperado**

```text
La base de prueba alcanza la revisión head y current/history muestran la revisión aplicada y el historial.
```

## ETL, calidad de datos y pruebas

**Clave** `etl-pruebas`

### Definición

**Clave** `definicion`

**Definición** Un flujo ETL extrae datos, los transforma y los carga en un destino. SQLAlchemy gestiona conexiones, SQL y transacciones durante el proceso.

**Búsqueda** Definición; Extraer pedidos y validar conteo

**Para recordar** Valida los datos antes de confirmar una carga.

#### Extraer pedidos y validar conteo

```python
import pandas as pd
df=pd.read_sql_query(select(pedidos).order_by(pedidos.c.id),engine)
print(len(df),df.id.is_unique,df.monto.notna().all())
```

Valida los datos antes de confirmar una carga.

**Resultado**

```text
7 True True
```

### Carga de CSV, Excel y JSON

**Clave** `carga-de-csv-excel-y-json`

**Definición** Pandas puede leer archivos y convertirlos en registros; SQLAlchemy inserta esos registros en tablas.

**Búsqueda** Carga de CSV, Excel y JSON; Cargar un CSV pequeño en una tabla

**Para recordar** Conserva tipos, valida claves y evita replace sobre tablas de producción.

**Nota** Para Excel usa pd.read_excel() con el motor necesario; para JSON pd.read_json() o json.load().

#### Cargar un CSV pequeño en una tabla

```python
import pandas as pd
from io import StringIO
df=pd.read_csv(StringIO("id,nombre,categoria,precio\n4,Mesa,Hogar,400\n"))
with engine.begin() as c:
    df.to_sql("productos",c,if_exists="append",index=False)
valor(select(func.count()).select_from(productos))
```

Conserva tipos, valida claves y evita replace sobre tablas de producción.

**Resultado**

```text
4
```

### Cargas incrementales y watermark

**Clave** `cargas-incrementales-y-watermark`

**Definición** Una marca de avance identifica datos nuevos o modificados. Una fecha con empates necesita un segundo criterio estable.

**Búsqueda** Cargas incrementales y watermark; Extraer pedidos posteriores a una marca compuesta

**Para recordar** No avances la marca hasta confirmar la carga. Usa upsert si deben procesarse filas repetidas.

#### Extraer pedidos posteriores a una marca compuesta

```python
f=date(2026,2,3); i=102
s=select(pedidos.c.id).where(or_(pedidos.c.fecha>f,and_(pedidos.c.fecha==f,pedidos.c.id>i))).order_by(pedidos.c.fecha,pedidos.c.id)
ver(s)
```

No avances la marca hasta confirmar la carga. Usa upsert si deben procesarse filas repetidas.

**Resultado**

```text
('id',)
[(103,), (104,), (105,), (106,), (107,)]
```

### Deduplicación y validación

**Clave** `deduplicacion-y-validacion`

**Definición** Comprueba unicidad, nulos, tipos y conteos antes de persistir resultados.

**Búsqueda** Deduplicación y validación; Detectar clientes repetidos en los pedidos

**Para recordar** Define duplicado con una clave de negocio; no borres por coincidencia accidental.

**Nota** Los clientes repetidos aquí son válidos; solo muestra la técnica de detección.

#### Detectar clientes repetidos en los pedidos

```python
ver(select(pedidos.c.cliente_id,func.count().label("n")).group_by(pedidos.c.cliente_id).having(func.count()>1).order_by(pedidos.c.cliente_id))
```

Define duplicado con una clave de negocio; no borres por coincidencia accidental.

**Resultado**

```text
('cliente_id', 'n')
[(1, 2), (2, 2), (3, 2)]
```

### Exportar y automatizar reportes

**Clave** `exportar-y-automatizar-reportes`

**Definición** Separa extracción, cálculo y exportación; parametriza fechas y usa rutas controladas.

**Búsqueda** Exportar y automatizar reportes; Generar CSV sin crear un archivo

**Para recordar** Un reporte reproducible usa filtros explícitos.

#### Generar CSV sin crear un archivo

```python
import pandas as pd
s=select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.estado=="completed").order_by(pedidos.c.id)
print(pd.read_sql_query(s,engine).to_csv(index=False).strip())
```

Un reporte reproducible usa filtros explícitos.

**Resultado**

```text
id,monto
101,100
102,200
103,200
105,300
106,100
```

### Testing con SQLite en memoria y rollback

**Clave** `testing-con-sqlite-en-memoria-y-rollback`

**Definición** Una base aislada y una transacción reversible permiten probar consultas y cambios sin tocar producción.

**Búsqueda** Testing con SQLite en memoria y rollback; Validar una operación y revertirla

**Para recordar** SQLite no reproduce todos los comportamientos de PostgreSQL o MySQL; prueba también el motor de destino.

#### Validar una operación y revertirla

```python
with engine.connect() as c:
    tr=c.begin()
    c.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))
    assert c.execute(select(pedidos.c.monto).where(pedidos.c.id==101)).scalar_one()==999
    tr.rollback()
valor(select(pedidos.c.monto).where(pedidos.c.id==101))
```

SQLite no reproduce todos los comportamientos de PostgreSQL o MySQL; prueba también el motor de destino.

**Resultado**

```text
100
```

## Fuentes

Documentación oficial de referencia, API 2.0 y bibliotecas complementarias.

- [Tutorial unificado: Core y ORM, ejecución, transacciones, metadatos y consultas.](https://docs.sqlalchemy.org/en/20/tutorial/)
- [Engine, URLs, drivers y opciones.](https://docs.sqlalchemy.org/en/20/core/engines.html)
- [Connection, Result, ejecución, transacciones y streaming.](https://docs.sqlalchemy.org/en/20/core/connections.html)
- [Pools y gestión de conexiones.](https://docs.sqlalchemy.org/en/20/core/pooling.html)
- [Excepciones y diagnóstico.](https://docs.sqlalchemy.org/en/20/core/exceptions.html)
- [MetaData, Table, Column y DDL.](https://docs.sqlalchemy.org/en/20/core/metadata.html)
- [Reflection e Inspector.](https://docs.sqlalchemy.org/en/20/core/reflection.html)
- [Claves, restricciones e índices.](https://docs.sqlalchemy.org/en/20/core/constraints.html)
- [Defaults, Identity, Sequence y Computed.](https://docs.sqlalchemy.org/en/20/core/defaults.html)
- [Tipos portables y específicos.](https://docs.sqlalchemy.org/en/20/core/type_basics.html)
- [Tipos personalizados y conversiones.](https://docs.sqlalchemy.org/en/20/core/custom_types.html)
- [Operadores y comparaciones.](https://docs.sqlalchemy.org/en/20/core/operators.html)
- [Expresiones, parámetros, case, cast y ventanas.](https://docs.sqlalchemy.org/en/20/core/sqlelement.html)
- [SELECT, JOIN, subconsultas, CTE y conjuntos.](https://docs.sqlalchemy.org/en/20/core/selectable.html)
- [Funciones SQL y agregaciones.](https://docs.sqlalchemy.org/en/20/core/functions.html)
- [INSERT, UPDATE, DELETE y RETURNING.](https://docs.sqlalchemy.org/en/20/core/dml.html)
- [SQLite y upsert.](https://docs.sqlalchemy.org/en/20/dialects/sqlite.html)
- [MySQL y upsert.](https://docs.sqlalchemy.org/en/20/dialects/mysql.html)
- [PostgreSQL y upsert.](https://docs.sqlalchemy.org/en/20/dialects/postgresql.html)
- [SQL Server y drivers.](https://docs.sqlalchemy.org/en/20/dialects/mssql.html)
- [Mapeo declarativo y CRUD ORM.](https://docs.sqlalchemy.org/en/20/orm/quickstart.html)
- [Session, identity map y persistencia.](https://docs.sqlalchemy.org/en/20/orm/session_basics.html)
- [Estados, merge, expunge, refresh y expire.](https://docs.sqlalchemy.org/en/20/orm/session_state_management.html)
- [Transacciones ORM y savepoints.](https://docs.sqlalchemy.org/en/20/orm/session_transaction.html)
- [Cardinalidad y relaciones.](https://docs.sqlalchemy.org/en/20/orm/basic_relationships.html)
- [Cascadas ORM.](https://docs.sqlalchemy.org/en/20/orm/cascades.html)
- [Estrategias de carga y unique.](https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html)
- [Herencia y polimorfismo.](https://docs.sqlalchemy.org/en/20/orm/inheritance.html)
- [Híbridos, association proxy, automap y sharding.](https://docs.sqlalchemy.org/en/20/orm/extensions/index.html)
- [Control de versiones de entidades.](https://docs.sqlalchemy.org/en/20/orm/versioning.html)
- [Eventos de motor, conexión y pool.](https://docs.sqlalchemy.org/en/20/core/events.html)
- [AsyncEngine, AsyncSession y run_sync.](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
- [Perfilado, caché y rendimiento.](https://docs.sqlalchemy.org/en/20/faq/performance.html)
- [Migración de API 1.x a 2.0.](https://docs.sqlalchemy.org/en/20/changelog/migration_20.html)
- [Lectura de SQL y selección de API.](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)
- [Parámetros, fechas, tipos y chunksize.](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_query.html)
- [Lectura de tablas.](https://pandas.pydata.org/docs/reference/api/pandas.read_sql_table.html)
- [Escritura, tipos y transacciones.](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html)
- [Configuración, revisiones y actualización.](https://alembic.sqlalchemy.org/en/latest/tutorial.html)
- [Autogeneración y limitaciones.](https://alembic.sqlalchemy.org/en/latest/autogenerate.html)
