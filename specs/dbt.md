# dbt

**Clave** `dbt`

**Área** Análisis de datos / Ingeniería de analítica (ubicación propuesta en AllDoc).

**Resumen** Transforma datos dentro de una plataforma SQL mediante modelos versionados, dependencias, pruebas y documentación.

**Alcance** Fundamentos, instalación, proyectos, modelos, configuración, fuentes, seeds, Jinja, macros, pruebas, incrementales, snapshots, selección, documentación, paquetes, Semantic Layer, despliegue, estado, rendimiento, gobernanza e integraciones; incluye los 18 bloques acordados reorganizados por dependencia.

**Entorno** Ejemplos locales: dbt Core 1.10.x (>=1.10.6), adaptador dbt-postgres 1.10.x y PostgreSQL 15 o superior, Python 3.11. Las fichas de Semantic Layer distinguen la especificación clásica de la nueva (Core 1.12+/Fusion, según disponibilidad). Las funciones de plataforma requieren acceso y plan compatibles; no son reproducibles en el editor SQLite de AllDoc. Los ejemplos son editoriales, no se han ejecutado en un warehouse. Los resultados indicados son esperados. Cada fragmento YAML se añade o combina con el archivo existente, sin duplicar claves; las alternativas de configuración se prueban por separado.

## Datos compartidos

### Preparación del proyecto

Instalar en un entorno virtual y crear una base PostgreSQL `analytics_lab` con un usuario de laboratorio que pueda crear esquemas y relaciones. Ejecutar en una terminal:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'
mkdir tienda_dbt
cd tienda_dbt
mkdir -p models/staging models/intermediate models/marts seeds tests macros snapshots analyses
```

Crear `dbt_project.yml`:

```yaml
name: tienda_dbt
version: '1.0.0'
config-version: 2
profile: tienda_dbt
model-paths: [models]
seed-paths: [seeds]
macro-paths: [macros]
test-paths: [tests]
snapshot-paths: [snapshots]
analysis-paths: [analyses]
models:
  tienda_dbt:
    +materialized: view
    marts:
      +materialized: table
```

Crear `~/.dbt/profiles.yml` (fuera del repositorio). Establecer `DBT_ENV_SECRET_PASSWORD` en la terminal; adaptar usuario, host y base a la instancia local. Crear primero la base con un administrador si no existe.

```yaml
tienda_dbt:
  target: dev
  outputs:
    dev:
      type: postgres
      host: localhost
      port: 5432
      user: analyst
      password: "{{ env_var('DBT_ENV_SECRET_PASSWORD') }}"
      dbname: analytics_lab
      schema: dbt_dev
      threads: 4
```

### Tablas de entrada

Ejecutar en PostgreSQL, dentro de `analytics_lab`, como usuario de laboratorio. Se usa un esquema `raw` que representa datos ya cargados por un proceso externo. No volver a ejecutar los INSERT sin limpiar las tablas de laboratorio.

```sql
create schema if not exists raw;
create table raw.customers (
  customer_id integer primary key,
  name text not null,
  country text,
  updated_at timestamp not null
);
create table raw.orders (
  order_id integer primary key,
  customer_id integer not null references raw.customers(customer_id),
  order_date date not null,
  amount numeric(12,2) not null,
  status text not null,
  updated_at timestamp not null
);
insert into raw.customers values
(1,'Ana','MX','2026-01-01 08:00'),
(2,'Luis','MX','2026-01-01 09:00'),
(3,'Marta','ES','2026-01-02 08:00'),
(4,'Diego',null,'2026-01-02 09:00');
insert into raw.orders values
(101,1,'2026-01-03',100,'completed','2026-01-03 10:00'),
(102,1,'2026-01-05',50,'completed','2026-01-05 10:00'),
(103,2,'2026-01-05',200,'completed','2026-01-05 11:00'),
(104,2,'2026-01-07',80,'cancelled','2026-01-07 10:00'),
(105,3,'2026-02-01',150,'completed','2026-02-01 10:00');
```

### Recursos de referencia

Las fichas usan los siguientes archivos base. Se pueden copiar antes de probar las fichas, o crearlos al estudiar cada grupo. Los modelos adicionales de una ficha son independientes salvo indicación expresa. Para probar variantes de un modelo base, reemplaza temporalmente su contenido y restáuralo después. Los fragmentos Jinja/SQL sin ruta se pueden introducir como modelo temporal `models/lab_example.sql`, salvo macros, tests y archivos de configuración indicados explícitamente. No conservar ejemplos que deliberadamente fallan en el proyecto al ejecutar otros.

`models/staging/sources.yml`:

```yaml
version: 2
sources:
  - name: shop
    schema: raw
    tables:
      - name: customers
      - name: orders
```

`models/staging/stg_customers.sql`:

```sql
select customer_id, name, country, updated_at
from {{ source('shop', 'customers') }}
```

`models/staging/stg_orders.sql`:

```sql
select order_id, customer_id, order_date, amount, status, updated_at
from {{ source('shop', 'orders') }}
```

`models/intermediate/int_completed_orders.sql`:

```sql
select * from {{ ref('stg_orders') }}
where status = 'completed'
```

`models/marts/fct_orders.sql`:

```sql
select * from {{ ref('int_completed_orders') }}
```

`models/marts/dim_customers.sql`:

```sql
select customer_id, name, coalesce(country, 'Unknown') as country
from {{ ref('stg_customers') }}
```

`models/marts/customer_revenue.sql`:

```sql
select c.customer_id, c.name, c.country,
       coalesce(sum(o.amount),0) as revenue,
       count(o.order_id) as order_count
from {{ ref('dim_customers') }} c
left join {{ ref('fct_orders') }} o on c.customer_id = o.customer_id
group by c.customer_id, c.name, c.country
```

`seeds/country_names.csv`:

```csv
country,country_name
MX,Mexico
ES,Spain
```

Ejecutar `dbt debug` y `dbt build`. Consultar con `dbt show --select customer_revenue` o en PostgreSQL. Resultados base (ordenar explícitamente por `customer_id` si interesa el orden):

| customer_id | name | country | revenue | order_count |
|---:|---|---|---:|---:|
| 1 | Ana | MX | 150 | 2 |
| 2 | Luis | MX | 200 | 1 |
| 3 | Marta | ES | 150 | 1 |
| 4 | Diego | Unknown | 0 | 0 |

`fct_orders` tiene cuatro pedidos (101, 102, 103, 105), ingresos 500, enero 350 y febrero 150. `stg_orders` conserva los cinco pedidos, incluyendo 104 cancelado. Las fechas son fijas para verificar los cálculos; la frescura se evalúa frente al reloj real. Los cambios de estado de incremental/snapshot se hacen en laboratorio y se revierten al terminar.


## Fundamentos de dbt

**Clave** `fundamentos-de-dbt`

### Definición

**Clave** `definicion`

**Definición** dbt transforma datos ya disponibles en una plataforma de datos y organiza el SQL como un proyecto con dependencias y validaciones.

**Búsqueda** Fundamentos de dbt · Seguir una transformación

**Para recordar** dbt no es una base de datos: ejecuta transformaciones en el motor conectado.

#### Seguir una transformación

```text
raw.orders → stg_orders → int_completed_orders → fct_orders
```

dbt transforma datos ya disponibles en una plataforma de datos y organiza el SQL como un proyecto con dependencias y validaciones.

**Resultado esperado** Cuatro pedidos completados en el modelo final; la tabla raw conserva cinco.

### ETL y ELT

**Clave** `etl-y-elt`

**Definición** ETL transforma antes de cargar; ELT carga primero y transforma dentro de la plataforma. dbt suele ocupar la T de ELT.

**Búsqueda** ETL y ELT · Ubicar dbt en el flujo

**Para recordar** La extracción y carga normalmente las realiza otra herramienta.

#### Ubicar dbt en el flujo

```text
API → ingestor → raw.orders → dbt → fct_orders → BI
```

ETL transforma antes de cargar.

**Resultado esperado** Los datos llegan a raw antes de que dbt ejecute SQL.

### Core, plataforma y Fusion

**Clave** `core-plataforma-y-fusion`

**Definición** Core ofrece CLI autogestionada; la plataforma dbt ofrece servicios administrados y colaboración; Fusion es otro motor de ejecución/compilación de dbt.

**Búsqueda** Core, plataforma y Fusion · Identificar el entorno instalado

**Para recordar** El lenguaje del proyecto es compartido, pero no todas las capacidades lo son.

**Nota** Fusion tiene su propia instalación y matriz de adaptadores/funciones; no asumir paridad.

#### Identificar el entorno instalado

```bash
dbt --version
```

El lenguaje del proyecto es compartido, pero no todas las capacidades lo son.

**Resultado esperado** Se muestran versiones de Core y plugins en el laboratorio; no identifica por sí solo un plan de plataforma.

### Adaptadores y warehouse

**Clave** `adaptadores-y-warehouse`

**Definición** Un adaptador traduce operaciones de dbt al motor de datos, como PostgreSQL, Snowflake, BigQuery, Redshift, Databricks o DuckDB.

**Búsqueda** Adaptadores y warehouse · Inspeccionar el adaptador local

**Para recordar** El SQL y las materializaciones disponibles dependen del adaptador.

#### Inspeccionar el adaptador local

```bash
dbt --version
```

El SQL y las materializaciones disponibles dependen del adaptador.

**Resultado esperado** Aparece postgres entre los plugins si está instalado.


## Instalación y proyecto

**Clave** `instalacion-y-proyecto`

### Definición

**Clave** `definicion`

**Definición** Un proyecto contiene modelos, configuraciones y otros recursos que la CLI descubre y procesa.

**Búsqueda** Instalación y proyecto · Comprobar el proyecto

**Para recordar** Ejecutar desde la carpeta con dbt_project.yml.

#### Comprobar el proyecto

```bash
dbt debug
```

Ejecutar desde la carpeta con dbt_project.yml.

**Resultado esperado** Conexión y configuración válidas si se completó la preparación.

### Entorno virtual

**Clave** `entorno-virtual`

**Definición** Aísla dependencias Python para que dos proyectos no tengan que compartir versiones.

**Búsqueda** Entorno virtual · Instalar el adaptador

**Para recordar** Activar el entorno antes de usar dbt.

#### Instalar el adaptador

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'
```

Activar el entorno antes de usar dbt.

**Resultado esperado** Core y su adaptador quedan instalados en el entorno.

### dbt init

**Clave** `dbt-init`

**Definición** Genera la estructura inicial de un proyecto y puede guiar la configuración de conexión.

**Búsqueda** dbt init · Crear un proyecto independiente

**Para recordar** No ejecutarlo encima del proyecto compartido.

#### Crear un proyecto independiente

```bash
dbt init demo_tienda
```

No ejecutarlo encima del proyecto compartido.

**Resultado esperado** Aparece el directorio demo_tienda con archivos iniciales.

### dbt_project.yml

**Clave** `dbt-project-yml`

**Definición** Declara el nombre, perfil, rutas y configuración por defecto de los recursos.

**Búsqueda** dbt_project.yml · Materializar marts como tablas

**Para recordar** El nombre bajo models debe coincidir con name.

#### Materializar marts como tablas

```yaml
models:
  tienda_dbt:
    marts:
      +materialized: table
```

El nombre bajo models debe coincidir con name.

**Resultado esperado** Los modelos de models/marts usan table salvo una configuración más específica.

### profiles.yml y targets

**Clave** `profiles-yml-y-targets`

**Definición** El perfil describe conexiones; target selecciona una salida como dev o prod.

**Búsqueda** profiles.yml y targets · Elegir el entorno de desarrollo

**Para recordar** El perfil de Core no debe guardar contraseñas en Git.

#### Elegir el entorno de desarrollo

```yaml
tienda_dbt:
  target: dev
  outputs:
    dev:
      type: postgres
      host: localhost
      port: 5432
      user: analyst
      password: "{{ env_var('DBT_ENV_SECRET_PASSWORD') }}"
      dbname: analytics_lab
      schema: dbt_dev
      threads: 4
```

El perfil de Core no debe guardar contraseñas en Git.

**Resultado esperado** dbt --target dev apunta a analytics_lab.dbt_dev.

### Directorios y extensiones

**Clave** `directorios-y-extensiones`

**Definición** Los directorios separan modelos SQL/Python, seeds CSV, macros SQL/Jinja, tests, snapshots, analyses y propiedades YAML.

**Búsqueda** Directorios y extensiones · Reconocer los archivos

**Para recordar** Una propiedad YAML documenta/configura recursos; no sustituye el SQL de un modelo.

#### Reconocer los archivos

```text
models/staging/stg_orders.sql
models/staging/sources.yml
seeds/country_names.csv
macros/
tests/
snapshots/
analyses/
```

Los directorios separan modelos SQL/Python, seeds CSV, macros SQL/Jinja, tests, snapshots, analyses y propiedades YAML.

**Resultado esperado** dbt descubre los recursos de cada ruta configurada.


## Sources y seeds

**Clave** `sources-y-seeds`

### Definición

**Clave** `definicion`

**Definición** Las fuentes declaran relaciones cargadas externamente; los seeds cargan archivos CSV pequeños versionados.

**Búsqueda** Sources y seeds · Cargar el catálogo de países

**Para recordar** source() para entradas externas; ref() para recursos gestionados por dbt.

#### Cargar el catálogo de países

```bash
dbt seed --select country_names
```

source() para entradas externas; ref() para recursos gestionados por dbt.

**Resultado esperado** Dos filas de referencia, MX y ES, en dbt_dev.country_names.

### source()

**Clave** `source`

**Definición** Devuelve una referencia a una tabla declarada como source y registra una dependencia.

**Búsqueda** source() · Leer pedidos de origen

**Para recordar** El primer argumento es el nombre de la fuente, no el esquema físico.

#### Leer pedidos de origen

```sql
select order_id from {{ source('shop','orders') }} order by order_id
```

El primer argumento es el nombre de la fuente, no el esquema físico.

**Resultado esperado** 101, 102, 103, 104, 105.

### Identifier y esquema

**Clave** `identifier-y-esquema`

**Definición** identifier permite usar un nombre lógico diferente al nombre físico de la tabla.

**Búsqueda** Identifier y esquema · Declarar un nombre lógico alternativo

**Para recordar** Cambiar el nombre lógico requiere actualizar source().

#### Declarar un nombre lógico alternativo

```yaml
sources:
  - name: shop_alt
    schema: raw
    tables:
      - name: purchases
        identifier: orders
```

Cambiar el nombre lógico requiere actualizar source().

**Resultado esperado** source('shop_alt','purchases') apunta a raw.orders.

### Seed y tipos de columna

**Clave** `seed-y-tipos-de-columna`

**Definición** Los seeds sirven para catálogos estáticos pequeños, no para ingestión masiva o datos sensibles.

**Búsqueda** Seed y tipos de columna · Fijar el tipo del código

**Para recordar** Después de cambiar tipos puede requerirse --full-refresh.

#### Fijar el tipo del código

```yaml
seeds:
  tienda_dbt:
    country_names:
      +column_types:
        country: varchar(2)
```

Después de cambiar tipos puede requerirse --full-refresh.

**Resultado esperado** dbt seed --full-refresh --select country_names crea el código como varchar(2).

### Usar un seed

**Clave** `usar-un-seed`

**Definición** Un seed se referencia igual que un modelo mediante ref().

**Búsqueda** Usar un seed · Traducir códigos de países

**Para recordar** Cargar el seed antes de consultar si no se usa build.

#### Traducir códigos de países

```sql
select c.customer_id, s.country_name
from {{ ref('stg_customers') }} c
left join {{ ref('country_names') }} s on c.country=s.country
order by c.customer_id
```

Cargar el seed antes de consultar si no se usa build.

**Resultado esperado** 1 Mexico; 2 Mexico; 3 Spain; 4 NULL.


## Modelos SQL y dependencias

**Clave** `modelos-sql-y-dependencias`

### Definición

**Clave** `definicion`

**Definición** Un modelo SQL es un SELECT guardado en models; dbt genera las operaciones necesarias para construir su relación.

**Búsqueda** Modelos SQL y dependencias · Crear un modelo de pedidos grandes (models/large_orders.sql)

**Para recordar** No escribir CREATE TABLE para un modelo SQL habitual.

#### Crear un modelo de pedidos grandes (models/large_orders.sql)

```sql
select order_id, amount from {{ ref('stg_orders') }} where amount >= 150
```

No escribir CREATE TABLE para un modelo SQL habitual.

**Resultado esperado** 103:200 y 105:150 tras dbt run --select large_orders.

### ref()

**Clave** `ref`

**Definición** Resuelve el nombre físico de un recurso y registra su dependencia en el DAG.

**Búsqueda** ref() · Consumir el modelo de pedidos completados

**Para recordar** Referenciar el nombre del archivo sin .sql, no el esquema.

#### Consumir el modelo de pedidos completados

```sql
select sum(amount) as revenue from {{ ref('fct_orders') }}
```

Referenciar el nombre del archivo sin .sql, no el esquema.

**Resultado esperado** 500.

### DAG, upstream y downstream

**Clave** `dag-upstream-y-downstream`

**Definición** El grafo dirigido acíclico representa qué recursos dependen de otros y permite ejecutarlos en orden.

**Búsqueda** DAG, upstream y downstream · Seguir dependencias de pedidos

**Para recordar** Un upstream alimenta al modelo; un downstream lo consume.

#### Seguir dependencias de pedidos

```text
source:shop.orders → stg_orders → int_completed_orders → fct_orders → customer_revenue
```

El grafo dirigido acíclico representa qué recursos dependen de otros y permite ejecutarlos en orden.

**Resultado esperado** customer_revenue depende transitivamente de shop.orders.

### Staging

**Clave** `staging`

**Definición** Estandariza entradas con nombres, tipos y limpieza básica, normalmente cerca de la fuente.

**Búsqueda** Staging · Normalizar estado de pedidos

**Para recordar** Mantener una granularidad compatible con el origen.

#### Normalizar estado de pedidos

```sql
select order_id, lower(trim(status)) as status from {{ source('shop','orders') }}
```

Mantener una granularidad compatible con el origen.

**Resultado esperado** Cinco filas; 104 queda cancelled, las demás completed.

### Intermediate

**Clave** `intermediate`

**Definición** Encapsula una transformación intermedia que simplifica modelos finales.

**Búsqueda** Intermediate · Aislar pedidos completados

**Para recordar** Extraer lógica compartida, no crear capas sin propósito.

#### Aislar pedidos completados

```sql
select * from {{ ref('stg_orders') }} where status='completed'
```

Extraer lógica compartida, no crear capas sin propósito.

**Resultado esperado** Cuatro filas; 104 queda fuera.

### Marts

**Clave** `marts`

**Definición** Contienen datos preparados para análisis, métricas y consumidores de negocio.

**Búsqueda** Marts · Consultar ingresos por país

**Para recordar** Definir qué representa cada fila antes de publicar.

#### Consultar ingresos por país

```sql
select country, sum(revenue) as revenue from {{ ref('customer_revenue') }} group by country order by country
```

Definir qué representa cada fila antes de publicar.

**Resultado esperado** ES 150; MX 350; Unknown 0.

### Analyses

**Clave** `analyses`

**Definición** Archivos SQL/Jinja en analyses se compilan pero no se materializan como modelos.

**Búsqueda** Analyses · Guardar una consulta puntual (analyses/revenue.sql)

**Para recordar** Usar compile para obtener SQL ejecutable aparte.

#### Guardar una consulta puntual (analyses/revenue.sql)

```sql
select sum(amount) from {{ ref('fct_orders') }}
```

Usar compile para obtener SQL ejecutable aparte.

**Resultado esperado** dbt compile --select revenue genera SQL; no crea una relación revenue.


## Materializaciones

**Clave** `materializaciones`

### Definición

**Clave** `definicion`

**Definición** La materialización determina cómo dbt representa el resultado de un modelo en el motor.

**Búsqueda** Materializaciones · Construir una tabla (models/lab_orders.sql)

**Para recordar** La misma consulta puede ser una vista, tabla o parte de otra consulta.

#### Construir una tabla (models/lab_orders.sql)

```sql
{{ config(materialized='table') }}
select * from {{ ref('fct_orders') }}
```

La misma consulta puede ser una vista, tabla o parte de otra consulta.

**Resultado esperado** Una tabla lab_orders con cuatro filas después de dbt run --select lab_orders.

### view

**Clave** `view`

**Definición** Guarda la definición SQL y normalmente calcula resultados al consultar la vista.

**Búsqueda** view · Crear una vista

**Para recordar** Útil para staging ligero; el costo se traslada a la lectura.

#### Crear una vista

```sql
{{ config(materialized='view') }}
select order_id, amount from {{ ref('fct_orders') }}
```

Útil para staging ligero; el costo se traslada a la lectura.

**Resultado esperado** Una vista con cuatro filas consultables.

### table

**Clave** `table`

**Definición** Materializa físicamente el resultado y lo reconstruye en ejecuciones normales.

**Búsqueda** table · Persistir ingresos

**Para recordar** Los cambios de origen requieren reconstruir el modelo para verse en la tabla.

#### Persistir ingresos

```sql
{{ config(materialized='table') }}
select sum(amount) as revenue from {{ ref('fct_orders') }}
```

Los cambios de origen requieren reconstruir el modelo para verse en la tabla.

**Resultado esperado** Una tabla con revenue=500.

### ephemeral

**Clave** `ephemeral`

**Definición** Inserta el SQL del modelo como CTE en los modelos consumidores, sin crear una relación propia.

**Búsqueda** ephemeral · Crear lógica intermedia (models/lab_ephemeral.sql)

**Para recordar** No consultar directamente un modelo ephemeral en el warehouse.

#### Crear lógica intermedia (models/lab_ephemeral.sql)

```sql
{{ config(materialized='ephemeral') }}
select order_id from {{ ref('fct_orders') }}
```

No consultar directamente un modelo ephemeral en el warehouse.

**Resultado esperado** Un consumidor con ref('lab_ephemeral') incorpora la CTE; no aparece tabla lab_ephemeral.

### incremental

**Clave** `incremental`

**Definición** Persiste resultados y procesa un subconjunto de filas en ejecuciones posteriores cuando se configura el filtro.

**Búsqueda** incremental · Definir una tabla incremental inicial

**Para recordar** La materialización sola no identifica automáticamente registros nuevos.

#### Definir una tabla incremental inicial

```sql
{{ config(materialized='incremental', unique_key='order_id') }}
select * from {{ ref('stg_orders') }}
```

La materialización sola no identifica automáticamente registros nuevos.

**Resultado esperado** Primera ejecución: cinco filas; aún no hay filtro incremental.

### materialized_view

**Clave** `materialized-view`

**Definición** Representa una vista materializada del motor, con refresco y configuración dependientes del adaptador.

**Búsqueda** materialized_view · Crear una vista materializada en PostgreSQL

**Para recordar** No equivale a una vista normal ni garantiza refresco automático.

#### Crear una vista materializada en PostgreSQL

```sql
{{ config(materialized='materialized_view') }}
select customer_id, sum(amount) as revenue from {{ ref('fct_orders') }} group by customer_id
```

No equivale a una vista normal ni garantiza refresco automático.

**Resultado esperado** Tres filas persistidas en una vista materializada, si el adaptador admite la configuración.

### Python models

**Clave** `python-models`

**Definición** Permiten implementar transformaciones en Python usando la interfaz dbt y el motor compatible.

**Búsqueda** Python models · Filtrar pedidos en un modelo Snowpark (alternativo)

**Para recordar** No se ejecutan como modelos Python sobre dbt-postgres.

**Nota** Requiere adaptador Snowflake y entorno Python compatible; BigQuery y Databricks tienen sus propias APIs.

#### Filtrar pedidos en un modelo Snowpark (alternativo)

```python
def model(dbt, session):
    dbt.config(materialized="table")
    return dbt.ref("stg_orders").filter("STATUS = 'completed'")
```

No se ejecutan como modelos Python sobre dbt-postgres.

**Resultado esperado** Cuatro filas si los mismos datos están en Snowflake y las columnas siguen el casing indicado.


## Configuración de recursos

**Clave** `configuracion-de-recursos`

### Definición

**Clave** `definicion`

**Definición** Las configuraciones controlan ejecución y representación; las propiedades describen el recurso, columnas, tests y metadatos.

**Búsqueda** Configuración de recursos · Configurar el nombre físico

**Para recordar** Las configuraciones se heredan y pueden sobrescribirse.

#### Configurar el nombre físico

```sql
{{ config(alias='orders_report', materialized='table') }}
select * from {{ ref('fct_orders') }}
```

Las configuraciones se heredan y pueden sobrescribirse.

**Resultado esperado** El modelo lab_example se referencia por su nombre lógico; la tabla física es orders_report.

### config() y precedencia

**Clave** `config-y-precedencia`

**Definición** Un config del modelo SQL tiene prioridad sobre configuración de proyecto y propiedades del mismo recurso en el caso habitual.

**Búsqueda** config() y precedencia · Sobrescribir el default view

**Para recordar** Preferir defaults por carpeta y excepciones locales.

#### Sobrescribir el default view

```sql
{{ config(materialized='table') }}
select * from {{ ref('stg_orders') }}
```

Preferir defaults por carpeta y excepciones locales.

**Resultado esperado** lab_example se construye como tabla pese al default de proyecto view.

### Propiedades YAML

**Clave** `propiedades-yaml`

**Definición** Se añaden bajo models y columns para declarar descripciones, tests y configuraciones del recurso.

**Búsqueda** Propiedades YAML · Documentar y etiquetar

**Para recordar** name es el nombre lógico del modelo.

#### Documentar y etiquetar

```yaml
models:
  - name: fct_orders
    description: Pedidos completados
    config:
      tags: [finance]
```

name es el nombre lógico del modelo.

**Resultado esperado** fct_orders tiene descripción y tag finance tras parse.

### Schemas, database y alias

**Clave** `schemas-database-y-alias`

**Definición** schema y database determinan ubicación física; alias cambia el identificador de la relación.

**Búsqueda** Schemas, database y alias · Separar un modelo en esquema finance

**Para recordar** En Core el schema personalizado normalmente se añade a target.schema.

#### Separar un modelo en esquema finance

```sql
{{ config(schema='finance', alias='sales') }}
select * from {{ ref('fct_orders') }}
```

En Core el schema personalizado normalmente se añade a target.schema.

**Resultado esperado** Con la macro estándar y target dbt_dev, relación dbt_dev_finance.sales.

### Nombres personalizados

**Clave** `nombres-personalizados`

**Definición** generate_schema_name, generate_alias_name y generate_database_name son macros que controlan la resolución de nombres físicos.

**Búsqueda** Nombres personalizados · Personalizar un esquema (macros/generate_schema_name.sql)

**Para recordar** Conservar aislamiento por entorno al personalizar nombres.

**Nota** Restaurar la macro estándar después; las otras macros siguen el mismo patrón de override con firmas propias.

#### Personalizar un esquema (macros/generate_schema_name.sql)

```sql
{% macro generate_schema_name(custom_schema_name, node) -%}
  {{ target.schema }}{% if custom_schema_name is not none %}_{{ custom_schema_name | trim }}{% endif %}
{%- endmacro %}
```

Conservar aislamiento por entorno al personalizar nombres.

**Resultado esperado** schema finance resuelve dbt_dev_finance; sin schema personalizado, dbt_dev.

### enabled y tags

**Clave** `enabled-y-tags`

**Definición** enabled excluye un recurso del grafo activo; tags permiten clasificar y seleccionar.

**Búsqueda** enabled y tags · Etiquetar un modelo de laboratorio

**Para recordar** No deshabilitar modelos que otros modelos activos necesitan.

#### Etiquetar un modelo de laboratorio

```sql
{{ config(enabled=true, tags=['daily']) }}
select * from {{ ref('fct_orders') }}
```

No deshabilitar modelos que otros modelos activos necesitan.

**Resultado esperado** dbt ls --select tag:daily lista lab_example.

### Versiones de proyecto

**Clave** `versiones-de-proyecto`

**Definición** require-dbt-version limita las versiones de Core permitidas por el proyecto.

**Búsqueda** Versiones de proyecto · Restringir la versión del motor

**Para recordar** La versión de proyecto no es la versión de Core.

#### Restringir la versión del motor

```yaml
require-dbt-version: ['>=1.10.6', '<1.11.0']
```

La versión de proyecto no es la versión de Core.

**Resultado esperado** Una versión fuera del intervalo produce error de compatibilidad.


## Comandos de trabajo

**Clave** `comandos-de-trabajo`

### Definición

**Clave** `definicion`

**Definición** La CLI ejecuta acciones sobre los recursos del proyecto, desde compilación hasta construcción y validación.

**Búsqueda** Comandos de trabajo · Construir el proyecto base

**Para recordar** run construye modelos; build coordina modelos, seeds, snapshots y tests.

#### Construir el proyecto base

```bash
dbt build
```

run construye modelos; build coordina modelos, seeds, snapshots y tests.

**Resultado esperado** Se construyen los recursos activos siguiendo dependencias y se ejecutan las pruebas configuradas.

### dbt debug

**Clave** `dbt-debug`

**Definición** Valida archivos de configuración y conexión.

**Búsqueda** dbt debug · Comprobar conexión

**Para recordar** Usarlo antes de diagnosticar SQL cuando no conecta.

#### Comprobar conexión

```bash
dbt debug --target dev
```

Usarlo antes de diagnosticar SQL cuando no conecta.

**Resultado esperado** All checks passed si el perfil y los permisos son válidos.

### dbt run

**Clave** `dbt-run`

**Definición** Construye solo modelos seleccionados.

**Búsqueda** dbt run · Construir el mart y sus padres

**Para recordar** No carga seeds ni ejecuta tests por sí mismo.

#### Construir el mart y sus padres

```bash
dbt run --select +customer_revenue
```

No carga seeds ni ejecuta tests por sí mismo.

**Resultado esperado** Se reconstruyen modelos ascendentes y customer_revenue; fuentes se leen, no se cargan.

### dbt build

**Clave** `dbt-build`

**Definición** Ejecuta los recursos construibles y tests seleccionados según dependencias.

**Búsqueda** dbt build · Construir un flujo completo

**Para recordar** Una prueba de error puede impedir construir recursos dependientes.

#### Construir un flujo completo

```bash
dbt build --select +customer_revenue
```

Una prueba de error puede impedir construir recursos dependientes.

**Resultado esperado** Mart disponible y tests seleccionados ejecutados.

### dbt test

**Clave** `dbt-test`

**Definición** Ejecuta data tests y unit tests seleccionados.

**Búsqueda** dbt test · Validar el modelo de ingresos

**Para recordar** Los modelos de los data tests deben existir.

#### Validar el modelo de ingresos

```bash
dbt test --select fct_orders
```

Los modelos de los data tests deben existir.

**Resultado esperado** Con tests de order_id configurados, pasan unique y not_null.

### dbt seed y snapshot

**Clave** `dbt-seed-y-snapshot`

**Definición** seed carga CSV; snapshot registra versiones de datos cambiantes.

**Búsqueda** dbt seed y snapshot · Cargar catálogos y capturar historial

**Para recordar** No son sustitutos de run.

#### Cargar catálogos y capturar historial

```bash
dbt seed --select country_names
dbt snapshot --select customer_history
```

No son sustitutos de run.

**Resultado esperado** Dos filas del catálogo y cuatro versiones iniciales si el snapshot está definido.

### dbt compile

**Clave** `dbt-compile`

**Definición** Renderiza Jinja y produce SQL compilado.

**Búsqueda** dbt compile · Inspeccionar SQL de un modelo

**Para recordar** No materializa modelos; macros run_query pueden consultar el motor.

#### Inspeccionar SQL de un modelo

```bash
dbt compile --select fct_orders
```

No materializa modelos; macros run_query pueden consultar el motor.

**Resultado esperado** SQL compilado en target/compiled/tienda_dbt/models/marts/fct_orders.sql.

### dbt parse

**Clave** `dbt-parse`

**Definición** Analiza recursos y dependencias sin construir modelos.

**Búsqueda** dbt parse · Generar metadatos

**Para recordar** Útil para validar estructura de proyecto y generar manifest.

#### Generar metadatos

```bash
dbt parse
```

Útil para validar estructura de proyecto y generar manifest.

**Resultado esperado** target/manifest.json generado si el proyecto es válido.

### dbt ls

**Clave** `dbt-ls`

**Definición** Lista recursos que coinciden con un selector.

**Búsqueda** dbt ls · Listar modelos de marts

**Para recordar** Sirve para comprobar qué afectará una ejecución.

#### Listar modelos de marts

```bash
dbt ls --select path:models/marts --resource-type model
```

Sirve para comprobar qué afectará una ejecución.

**Resultado esperado** fct_orders, dim_customers y customer_revenue en el proyecto base.

### dbt show

**Clave** `dbt-show`

**Definición** Ejecuta una consulta de vista previa sin materializar el modelo seleccionado.

**Búsqueda** dbt show · Previsualizar pedidos

**Para recordar** Los upstream persistidos deben existir.

#### Previsualizar pedidos

```bash
dbt show --select fct_orders --limit 2
```

Los upstream persistidos deben existir.

**Resultado esperado** Dos filas de cuatro; sin ORDER BY no se garantiza cuáles.

### dbt clean y deps

**Clave** `dbt-clean-y-deps`

**Definición** clean elimina rutas configuradas en clean-targets; deps instala paquetes declarados.

**Búsqueda** dbt clean y deps · Reinstalar dependencias

**Para recordar** No confundir limpieza local con DROP de relaciones.

#### Reinstalar dependencias

```bash
dbt clean
dbt deps
```

No confundir limpieza local con DROP de relaciones.

**Resultado esperado** Se eliminan directorios configurados y se reinstalan paquetes declarados; definir clean-targets: [target, dbt_packages] antes.


## Jinja básico

**Clave** `jinja-basico`

### Definición

**Clave** `definicion`

**Definición** Jinja genera texto SQL antes de que el motor ejecute la consulta.

**Búsqueda** Jinja básico · Generar una constante

**Para recordar** Jinja actúa en compilación; SQL opera sobre filas en el warehouse.

#### Generar una constante

```sql
select {{ 50 * 2 }} as amount
```

Jinja actúa en compilación; SQL opera sobre filas en el warehouse.

**Resultado esperado** SQL compilado select 100 as amount; devuelve 100.

### Expresiones y comentarios

**Clave** `expresiones-y-comentarios`

**Definición** Las expresiones {{ }} insertan texto; {% %} ejecuta instrucciones; {# #} comenta en Jinja.

**Búsqueda** Expresiones y comentarios · Insertar un valor

**Para recordar** Los comentarios Jinja desaparecen del SQL compilado.

#### Insertar un valor

```sql
{# comentario interno #}
select {{ 2 + 3 }} as n
```

Los comentarios Jinja desaparecen del SQL compilado.

**Resultado esperado** n=5; el comentario no aparece en SQL compilado.

### set y tipos

**Clave** `set-y-tipos`

**Definición** set asigna valores Jinja, incluidas listas, diccionarios y tuplas.

**Búsqueda** set y tipos · Reutilizar una constante

**Para recordar** Las variables Jinja no son columnas SQL.

#### Reutilizar una constante

```sql
{% set limits = {'low': 100, 'high': 200} %}
select {{ limits['high'] }} as threshold
```

Las variables Jinja no son columnas SQL.

**Resultado esperado** threshold=200.

### if, elif y else

**Clave** `if-elif-y-else`

**Definición** Generan SQL condicional según valores conocidos por Jinja.

**Búsqueda** if, elif y else · Elegir una etiqueta

**Para recordar** No confundir con CASE WHEN por fila.

#### Elegir una etiqueta

```sql
{% if target.name == 'dev' %}
select 'sandbox' as env
{% else %}
select 'production' as env
{% endif %}
```

No confundir con CASE WHEN por fila.

**Resultado esperado** env=sandbox con target dev.

### for, loop y filtros

**Clave** `for-loop-y-filtros`

**Definición** Un bucle genera fragmentos repetidos; loop.last evita una coma final.

**Búsqueda** for, loop y filtros · Generar columnas de un SELECT

**Para recordar** No recorre las filas de una tabla a menos que obtengas datos explícitamente.

#### Generar columnas de un SELECT

```sql
{% for col in ['order_id','amount'] %}
  {% if loop.first %}select {% endif %}{{ col }}{% if not loop.last %}, {% endif %}
{% endfor %}
from {{ ref('stg_orders') }}
```

No recorre las filas de una tabla a menos que obtengas datos explícitamente.

**Resultado esperado** Cinco filas con order_id y amount.

### Filtros Jinja

**Clave** `filtros-jinja`

**Definición** Filtros como join, default, length, map y selectattr transforman valores de plantilla.

**Búsqueda** Filtros Jinja · Construir una lista de columnas

**Para recordar** El operador | aplica un filtro al valor de su izquierda.

#### Construir una lista de columnas

```sql
{% set cols=['order_id','amount'] %}
select {{ cols | join(', ') }} from {{ ref('stg_orders') }}
```

El operador | aplica un filtro al valor de su izquierda.

**Resultado esperado** SQL select order_id, amount from la relación de staging.

### namespace y do

**Clave** `namespace-y-do`

**Definición** namespace conserva estado de plantilla a través de un bucle; do ejecuta una expresión sin imprimirla.

**Búsqueda** namespace y do · Construir una lista

**Para recordar** Usarlos para construir estructuras, no como reemplazo de SQL.

#### Construir una lista

```sql
{% set ns = namespace(cols=[]) %}
{% for c in ['order_id','amount'] %}{% do ns.cols.append(c) %}{% endfor %}
select {{ ns.cols | join(', ') }} from {{ ref('stg_orders') }}
```

Usarlos para construir estructuras, no como reemplazo de SQL.

**Resultado esperado** Se generan dos columnas y cinco filas.

### var() y --vars

**Clave** `var-y-vars`

**Definición** var lee variables de proyecto o CLI, con un valor por defecto opcional.

**Búsqueda** var() y --vars · Parametrizar un mínimo

**Para recordar** --vars cambia el valor de compilación sin editar SQL.

#### Parametrizar un mínimo

```sql
select order_id from {{ ref('fct_orders') }} where amount >= {{ var('min_amount',150) }}
```

--vars cambia el valor de compilación sin editar SQL.

**Resultado esperado** 103 y 105; con dbt run --vars '{min_amount: 200}' solo 103.

### env_var()

**Clave** `env-var`

**Definición** Lee variables del sistema para credenciales o parámetros de entorno.

**Búsqueda** env_var() · Leer la contraseña del perfil

**Para recordar** Los secretos DBT_ENV_SECRET_ se restringen a contextos permitidos como profiles y packages.

#### Leer la contraseña del perfil

```yaml
password: "{{ env_var('DBT_ENV_SECRET_PASSWORD') }}"
```

Los secretos DBT_ENV_SECRET_ se restringen a contextos permitidos como profiles y packages.

**Resultado esperado** El perfil usa el valor establecido fuera del repositorio; no imprimirlo.


## Macros y contexto

**Clave** `macros-y-contexto`

### Definición

**Clave** `definicion`

**Definición** Una macro encapsula Jinja y SQL reutilizable dentro del proyecto.

**Búsqueda** Macros y contexto · Definir macro (macros/cents.sql)

**Para recordar** Una macro genera código o devuelve valores de plantilla; no es necesariamente una UDF del motor.

#### Definir macro (macros/cents.sql)

```sql
{% macro cents(amount) %}
  round(({{ amount }}) * 100, 0)
{% endmacro %}
```

Una macro genera código o devuelve valores de plantilla; no es necesariamente una UDF del motor.

**Resultado esperado** Llamar cents('amount') genera una expresión SQL de centavos.

### Argumentos y return()

**Clave** `argumentos-y-return`

**Definición** Los argumentos parametrizan la macro; return conserva el tipo de un valor Jinja.

**Búsqueda** Argumentos y return() · Devolver una lista (macros/order_columns.sql)

**Para recordar** Pasar nombres de columnas como texto al generar SQL.

#### Devolver una lista (macros/order_columns.sql)

```sql
{% macro order_columns() %}
  {{ return(['order_id','amount']) }}
{% endmacro %}
```

Pasar nombres de columnas como texto al generar SQL.

**Resultado esperado** order_columns() devuelve una lista Jinja; join(', ') produce order_id, amount.

### Invocar macros

**Clave** `invocar-macros`

**Definición** Se invocan desde expresiones Jinja o como operaciones de CLI según su propósito.

**Búsqueda** Invocar macros · Convertir importes a centavos

**Para recordar** Las macros que producen SQL deben estar en un contexto SQL válido.

#### Convertir importes a centavos

```sql
select order_id, {{ cents('amount') }} as cents from {{ ref('fct_orders') }} order by order_id
```

Las macros que producen SQL deben estar en un contexto SQL válido.

**Resultado esperado** 101:10000; 102:5000; 103:20000; 105:15000; requiere macro cents.

### this y target

**Clave** `this-y-target`

**Definición** this identifica la relación del modelo actual; target describe la conexión activa.

**Búsqueda** this y target · Mostrar el entorno del modelo

**Para recordar** this se usa, por ejemplo, para leer la tabla incremental existente.

#### Mostrar el entorno del modelo

```sql
select '{{ target.name }}' as env, '{{ this.identifier }}' as relation_name
```

this se usa, por ejemplo, para leer la tabla incremental existente.

**Resultado esperado** dev y lab_example si ese es el nombre del modelo.

### model, graph y flags

**Clave** `model-graph-y-flags`

**Definición** model y graph exponen metadatos del nodo y del proyecto; flags contiene opciones de ejecución.

**Búsqueda** model, graph y flags · Inspeccionar el nodo durante ejecución

**Para recordar** Durante parse el grafo puede estar incompleto.

#### Inspeccionar el nodo durante ejecución

```sql
{% if execute %}{% do log(model.name ~ ':' ~ flags.WHICH, info=true) %}{% endif %}
select 1 as ok
```

Durante parse el grafo puede estar incompleto.

**Resultado esperado** Se registra el nombre y comando, por ejemplo lab_example:run; ok=1.

### execute, parse y compilación

**Clave** `execute-parse-y-compilacion`

**Definición** execute distingue la fase inicial de análisis de la fase de compilación/ejecución de nodos.

**Búsqueda** execute, parse y compilación · Evitar acceder a un resultado durante parse

**Para recordar** Proteger accesos a resultados de consultas con if execute; compile también puede ejecutar macros de consulta.

#### Evitar acceder a un resultado durante parse

```sql
{% if execute %}
  {% set r = run_query('select 1') %}
  {% set n = r.columns[0].values()[0] %}
{% else %}{% set n = 0 %}{% endif %}
select {{ n }} as n
```

Proteger accesos a resultados de consultas con if execute; compile también puede ejecutar macros de consulta.

**Resultado esperado** En ejecución n=1; parse no intenta leer una tabla de resultados inexistente.

### run_query()

**Clave** `run-query`

**Definición** Ejecuta SQL contra la conexión y devuelve una tabla agate para consultas con resultado.

**Búsqueda** run_query() · Consultar un total en compilación

**Para recordar** No inicia una transacción automáticamente; evitar efectos secundarios durante compilación.

#### Consultar un total en compilación

```sql
{% if execute %}
  {% set r=run_query('select count(*) from raw.orders') %}
  {% set n=r.columns[0].values()[0] %}
{% else %}{% set n=0 %}{% endif %}
select {{ n }} as n
```

No inicia una transacción automáticamente; evitar efectos secundarios durante compilación.

**Resultado esperado** n=5 en la ejecución del modelo con los datos iniciales.

### Statement blocks

**Clave** `statement-blocks`

**Definición** Permiten ejecutar SQL con un nombre y recuperar resultados con load_result.

**Búsqueda** Statement blocks · Recuperar un conteo

**Para recordar** fetch_result debe activarse para leer filas.

#### Recuperar un conteo

```sql
{% if execute %}
  {% call statement('n_orders', fetch_result=true) %}select count(*) from raw.orders{% endcall %}
  {% set n=load_result('n_orders')['data'][0][0] %}
{% else %}{% set n=0 %}{% endif %}
select {{ n }} as n
```

fetch_result debe activarse para leer filas.

**Resultado esperado** n=5.

### adapter y Relation

**Clave** `adapter-y-relation`

**Definición** El objeto adapter permite consultar metadatos y trabajar con relaciones de forma compatible con la plataforma.

**Búsqueda** adapter y Relation · Inspeccionar columnas de staging

**Para recordar** No concatenar nombres físicos a ciegas.

#### Inspeccionar columnas de staging

```sql
{% set rel = ref('stg_orders') %}
{% if execute %}
  {% set cols=adapter.get_columns_in_relation(rel) %}
  {% do log(cols | map(attribute='name') | join(', '), info=true) %}
{% endif %}
select 1 as ok
```

No concatenar nombres físicos a ciegas.

**Resultado esperado** Con staging construido, el log enumera seis columnas.

### dispatch()

**Clave** `dispatch`

**Definición** Selecciona una implementación de macro por adaptador, con fallback default.

**Búsqueda** dispatch() · Crear macro despachada (macros/label.sql)

**Para recordar** Implementar variantes cuando el SQL cambia entre motores.

#### Crear macro despachada (macros/label.sql)

```sql
{% macro label() %}{{ return(adapter.dispatch('label','tienda_dbt')()) }}{% endmacro %}
{% macro default__label() %} 'generic' {% endmacro %}
{% macro postgres__label() %} 'postgres' {% endmacro %}
```

Implementar variantes cuando el SQL cambia entre motores.

**Resultado esperado** select {{ label() }} as engine devuelve postgres en el laboratorio.

### Serialización JSON y YAML

**Clave** `serializacion-json-y-yaml`

**Definición** fromjson/fromyaml convierten texto a objetos; tojson/toyaml los serializan.

**Búsqueda** Serialización JSON y YAML · Extraer un valor JSON

**Para recordar** Distinguir tipos Jinja del texto SQL generado.

#### Extraer un valor JSON

```sql
{% set cfg=fromjson('{"threshold": 150}') %}
select {{ cfg['threshold'] }} as threshold
```

Distinguir tipos Jinja del texto SQL generado.

**Resultado esperado** 150; toyaml(cfg) o tojson(cfg) devolverían texto serializado.

### log, exceptions y metadatos

**Clave** `log-exceptions-y-metadatos`

**Definición** log registra mensajes; exceptions puede advertir o detener compilación. invocation_id identifica la ejecución y run_started_at su inicio.

**Búsqueda** log, exceptions y metadatos · Validar un parámetro

**Para recordar** No imprimir secretos ni generar errores por datos que podrían ser normales.

#### Validar un parámetro

```sql
{% set n=var('min_amount',150) %}
{% if n < 0 %}{{ exceptions.raise_compiler_error('min_amount negativo') }}{% endif %}
{% do log(invocation_id, info=true) %}
select {{ n }} as n
```

No imprimir secretos ni generar errores por datos que podrían ser normales.

**Resultado esperado** 150 por defecto; con min_amount=-1 la compilación falla deliberadamente.


## Data tests

**Clave** `data-tests`

### Definición

**Clave** `definicion`

**Definición** Un data test ejecuta una consulta que devuelve las filas que incumplen una regla de calidad.

**Búsqueda** Data tests · Comprobar importes negativos (tests/no_negative_orders.sql)

**Para recordar** Cero filas de fallo significa que el test pasa.

#### Comprobar importes negativos (tests/no_negative_orders.sql)

```sql
select * from {{ ref('stg_orders') }} where amount < 0
```

Cero filas de fallo significa que el test pasa.

**Resultado esperado** Cero filas; pasa con los datos base.

### unique

**Clave** `unique`

**Definición** Comprueba que un campo no tenga valores no nulos repetidos.

**Búsqueda** unique · Validar identificadores (models/schema.yml)

**Para recordar** Combinar con not_null para una clave primaria lógica.

#### Validar identificadores (models/schema.yml)

```yaml
models:
  - name: stg_orders
    columns:
      - name: order_id
        data_tests: [unique]
```

Combinar con not_null para una clave primaria lógica.

**Resultado esperado** dbt test --select stg_orders pasa: cinco IDs distintos.

### not_null

**Clave** `not-null`

**Definición** Detecta filas en que una columna tiene NULL.

**Búsqueda** not_null · Exigir ID de cliente

**Para recordar** No valida que un texto no esté vacío.

#### Exigir ID de cliente

```yaml
models:
  - name: stg_customers
    columns:
      - name: customer_id
        data_tests: [not_null]
```

No valida que un texto no esté vacío.

**Resultado esperado** Pasa; los cuatro IDs existen. Aplicado a country, falla por Diego.

### relationships

**Clave** `relationships`

**Definición** Comprueba que los valores no nulos de una columna existan en otra relación.

**Búsqueda** relationships · Validar relación pedido-cliente

**Para recordar** Añadir not_null si la FK lógica también debe ser obligatoria.

#### Validar relación pedido-cliente

```yaml
models:
  - name: stg_orders
    columns:
      - name: customer_id
        data_tests:
          - relationships:
              arguments:
                to: ref('stg_customers')
                field: customer_id
```

Añadir not_null si la FK lógica también debe ser obligatoria.

**Resultado esperado** Pasa; los cinco pedidos apuntan a clientes existentes.

### accepted_values

**Clave** `accepted-values`

**Definición** Comprueba que los valores no nulos pertenezcan a un conjunto permitido.

**Búsqueda** accepted_values · Restringir estados válidos

**Para recordar** No reemplaza not_null.

#### Restringir estados válidos

```yaml
models:
  - name: stg_orders
    columns:
      - name: status
        data_tests:
          - accepted_values:
              arguments:
                values: ['completed','cancelled']
```

No reemplaza not_null.

**Resultado esperado** Pasa para los cinco pedidos.

### Singular tests

**Clave** `singular-tests`

**Definición** Una consulta SQL en tests valida una regla concreta del negocio.

**Búsqueda** Singular tests · Detectar pedidos cancelados en hechos (tests/no_cancelled_facts.sql)

**Para recordar** Devolver violaciones, no una fila con un conteo de cero.

#### Detectar pedidos cancelados en hechos (tests/no_cancelled_facts.sql)

```sql
select * from {{ ref('fct_orders') }} where status <> 'completed'
```

Devolver violaciones, no una fila con un conteo de cero.

**Resultado esperado** Cero filas; pasa.

### Custom generic tests

**Clave** `custom-generic-tests`

**Definición** Una macro test recibe un modelo y argumentos para reutilizar una validación.

**Búsqueda** Custom generic tests · Crear una regla de mínimo (tests/generic/test_minimum.sql)

**Para recordar** El nombre del bloque test se usa luego en YAML.

#### Crear una regla de mínimo (tests/generic/test_minimum.sql)

```sql
{% test minimum(model, column_name, min_value) %}
select * from {{ model }} where {{ column_name }} < {{ min_value }}
{% endtest %}
```

El nombre del bloque test se usa luego en YAML.

**Resultado esperado** Declarar minimum con arguments: {min_value: 0} en amount valida todos los pedidos; pasa.

### Severity, warn_if y error_if

**Clave** `severity-warn-if-y-error-if`

**Definición** Controlan cuándo el número de fallos produce warning o error.

**Búsqueda** Severity, warn_if y error_if · Advertir por países faltantes

**Para recordar** Una advertencia no siempre bloquea recursos descendientes; --warn-error puede cambiarlo.

#### Advertir por países faltantes

```yaml
models:
  - name: stg_customers
    columns:
      - name: country
        data_tests:
          - not_null:
              config:
                severity: warn
                warn_if: '>0'
```

Una advertencia no siempre bloquea recursos descendientes; --warn-error puede cambiarlo.

**Resultado esperado** Una fila de fallo, estado WARN en condiciones normales.

### where y store_failures

**Clave** `where-y-store-failures`

**Definición** where limita las filas evaluadas; store_failures persiste los registros fallidos para inspección.

**Búsqueda** where y store_failures · Guardar un fallo de país

**Para recordar** Los registros persistidos pueden contener datos sensibles; proteger el esquema de auditoría.

#### Guardar un fallo de país

```yaml
models:
  - name: stg_customers
    columns:
      - name: country
        data_tests:
          - not_null:
              config:
                where: 'customer_id >= 1'
                store_failures: true
```

Los registros persistidos pueden contener datos sensibles; proteger el esquema de auditoría.

**Resultado esperado** Una fila con customer_id=4 se registra en la relación de fallos; el test falla. Retirar el test deliberado al terminar.


## Unit tests y contratos

**Clave** `unit-tests-y-contratos`

### Definición

**Clave** `definicion`

**Definición** Los unit tests verifican la lógica de modelos SQL con entradas pequeñas controladas; los contratos fijan la estructura de salida.

**Búsqueda** Unit tests y contratos · Ejecutar solo unit tests

**Para recordar** Los data tests revisan datos reales; los unit tests comprueban casos de lógica.

#### Ejecutar solo unit tests

```bash
dbt test --select test_type:unit
```

Los data tests revisan datos reales; los unit tests comprueban casos de lógica.

**Resultado esperado** Se ejecutan las pruebas unitarias declaradas, no los data tests.

### Unit test con given y expect

**Clave** `unit-test-con-given-y-expect`

**Definición** given suministra datos simulados a las referencias; expect declara las filas esperadas.

**Búsqueda** Unit test con given y expect · Probar el filtro de pedidos (models/unit_tests.yml)

**Para recordar** Incluir todas las referencias directas del modelo.

#### Probar el filtro de pedidos (models/unit_tests.yml)

```yaml
unit_tests:
  - name: only_completed
    model: int_completed_orders
    given:
      - input: ref('stg_orders')
        rows:
          - {order_id: 1, status: completed}
          - {order_id: 2, status: cancelled}
    expect:
      rows:
        - {order_id: 1, status: completed}
```

Incluir todas las referencias directas del modelo.

**Resultado esperado** Con staging existente para inferir tipos, dbt test --select only_completed pasa.

### Overrides y modelos incrementales

**Clave** `overrides-y-modelos-incrementales`

**Definición** overrides permite simular macros o variables durante una prueba, por ejemplo is_incremental.

**Búsqueda** Overrides y modelos incrementales · Simular ejecución completa (fragmento de un unit test incremental)

**Para recordar** En un unit test incremental se comprueban filas que se añadirían o actualizarían, no toda la tabla final.

#### Simular ejecución completa (fragmento de un unit test incremental)

```yaml
overrides:
  macros:
    is_incremental: false
```

En un unit test incremental se comprueban filas que se añadirían o actualizarían, no toda la tabla final.

**Resultado esperado** El modelo usa su rama de carga completa en la prueba. Requiere definir given y expect para el modelo incremental.

### Model contracts

**Clave** `model-contracts`

**Definición** Un contrato enforced comprueba que los nombres y tipos definidos correspondan a la salida del modelo.

**Búsqueda** Model contracts · Fijar estructura de un modelo de una columna

**Para recordar** No reemplaza pruebas de unicidad o relaciones; soporte de constraints varía.

#### Fijar estructura de un modelo de una columna

```yaml
models:
  - name: lab_contract
    config:
      materialized: table
      contract:
        enforced: true
    columns:
      - name: order_id
        data_type: integer
```

No reemplaza pruebas de unicidad o relaciones; soporte de constraints varía.

**Resultado esperado** Con models/lab_contract.sql = select order_id from {{ ref('stg_orders') }}, se construyen cinco filas; si se añade una columna no declarada, falla.


## Source freshness

**Clave** `source-freshness`

### Definición

**Clave** `definicion`

**Definición** Freshness mide el tiempo desde la última actualización registrada en una fuente.

**Búsqueda** Source freshness · Evaluar fuentes

**Para recordar** Mide oportunidad de datos, no validez de su contenido.

#### Evaluar fuentes

```bash
dbt source freshness
```

Mide oportunidad de datos, no validez de su contenido.

**Resultado esperado** Se evaluarán fuentes con freshness configurado; se genera sources.json.

### loaded_at_field y umbrales

**Clave** `loaded-at-field-y-umbrales`

**Definición** loaded_at_field identifica el timestamp de carga; warn_after y error_after configuran edades máximas.

**Búsqueda** loaded_at_field y umbrales · Definir SLA de pedidos (fusionar en sources.yml)

**Para recordar** Los campos de carga deben reflejar el momento que realmente interesa.

**Nota** Para simplificar se usa updated_at, no un timestamp separado de ingestión. Verificar zona horaria y versión; Core 1.10 usa config.

#### Definir SLA de pedidos (fusionar en sources.yml)

```yaml
sources:
  - name: shop
    schema: raw
    tables:
      - name: customers
      - name: orders
        config:
          loaded_at_field: updated_at
          freshness:
            warn_after: {count: 24, period: hour}
            error_after: {count: 48, period: hour}
```

Los campos de carga deben reflejar el momento que realmente interesa.

**Resultado esperado** El máximo inicial es 2026-02-01 10:00; si el reloj supera esa fecha por más de 48 horas, ERROR esperado.


## Selección de nodos

**Clave** `seleccion-de-nodos`

### Definición

**Clave** `definicion`

**Definición** Los selectores eligen qué recursos se ejecutan sin modificar el proyecto.

**Búsqueda** Selección de nodos · Seleccionar un mart

**Para recordar** Comprobar selección con dbt ls antes de ejecutar cambios grandes.

#### Seleccionar un mart

```bash
dbt ls --select customer_revenue
```

Comprobar selección con dbt ls antes de ejecutar cambios grandes.

**Resultado esperado** Lista customer_revenue y, según tipo de selección, tests relacionados.

### --select y --exclude

**Clave** `select-y-exclude`

**Definición** select incluye recursos; exclude elimina coincidencias del conjunto elegido.

**Búsqueda** --select y --exclude · Construir marts salvo un reporte

**Para recordar** Excluir un padre no garantiza que el modelo hijo tenga datos actualizados.

#### Construir marts salvo un reporte

```bash
dbt run --select path:models/marts --exclude customer_revenue
```

Excluir un padre no garantiza que el modelo hijo tenga datos actualizados.

**Resultado esperado** Construye fct_orders y dim_customers; asume upstream existentes.

### Operadores + y @

**Clave** `operadores-y`

**Definición** + selecciona ancestros o descendientes; @ selecciona un nodo, sus descendientes y los ancestros necesarios de estos.

**Búsqueda** Operadores + y @ · Seleccionar familias

**Para recordar** El lado del signo + indica la dirección.

#### Seleccionar familias

```bash
dbt ls --select +customer_revenue
dbt ls --select stg_orders+
dbt ls --select @stg_orders
```

El lado del signo + indica la dirección.

**Resultado esperado** Primero padres del reporte; segundo descendientes de staging; tercero también otros padres necesarios.

### Métodos de selección

**Clave** `metodos-de-seleccion`

**Definición** tag, path, config y resource_type permiten seleccionar por metadatos.

**Búsqueda** Métodos de selección · Listar tablas

**Para recordar** Usar config.materialized:table para tablas, no el nombre físico.

#### Listar tablas

```bash
dbt ls --select config.materialized:table --resource-type model
```

Usar config.materialized:table para tablas, no el nombre físico.

**Resultado esperado** Tres marts del proyecto base.

### Unión e intersección

**Clave** `union-e-interseccion`

**Definición** Un espacio combina selectores por unión; una coma exige ambas condiciones.

**Búsqueda** Unión e intersección · Cruzar ruta y materialización

**Para recordar** Citar el argumento para preservar los espacios.

#### Cruzar ruta y materialización

```bash
dbt ls --select 'path:models/marts,config.materialized:table'
```

Citar el argumento para preservar los espacios.

**Resultado esperado** Los tres marts; con un espacio también seleccionaría tablas fuera de marts.

### selectors.yml

**Clave** `selectors-yml`

**Definición** Define selecciones con nombre para reutilizar reglas complejas.

**Búsqueda** selectors.yml · Guardar la selección de marts

**Para recordar** El selector por nombre se usa con --selector.

#### Guardar la selección de marts

```yaml
selectors:
  - name: daily_marts
    definition:
      method: path
      value: models/marts
```

El selector por nombre se usa con --selector.

**Resultado esperado** dbt run --selector daily_marts construye los marts.

### Threads, target y fail-fast

**Clave** `threads-target-y-fail-fast`

**Definición** threads controla paralelismo; target selecciona conexión; fail-fast detiene el trabajo al detectar un fallo.

**Búsqueda** Threads, target y fail-fast · Ejecutar en desarrollo

**Para recordar** El DAG limita qué nodos pueden ejecutarse a la vez.

#### Ejecutar en desarrollo

```bash
dbt build --target dev --threads 2 --fail-fast
```

El DAG limita qué nodos pueden ejecutarse a la vez.

**Resultado esperado** Se ejecutan hasta dos tareas elegibles simultáneamente; ante un error se intenta detener el resto.

### Selección indirecta de tests

**Clave** `seleccion-indirecta-de-tests`

**Definición** Controla cuándo incluir un test por selección de los modelos que referencia.

**Búsqueda** Selección indirecta de tests · Excluir tests indirectos

**Para recordar** eager incluye tests si algún padre es seleccionado; cautious exige todos; buildable también considera ancestros; empty omite tests indirectos.

#### Excluir tests indirectos

```bash
dbt build --select fct_orders --indirect-selection empty
```

eager incluye tests si algún padre es seleccionado; cautious exige todos; buildable también considera ancestros; empty omite tests indirectos.

**Resultado esperado** Construye fct_orders sin seleccionar sus tests por asociación indirecta; tests seleccionados explícitamente siguen siendo otra posibilidad.


## Modelado analítico

**Clave** `modelado-analitico`

### Definición

**Clave** `definicion`

**Definición** Modelar datos es organizar hechos y atributos para contestar preguntas de negocio sin ambigüedades.

**Búsqueda** Modelado analítico · Identificar granularidad

**Para recordar** Declarar qué representa cada fila antes de elegir joins o métricas.

#### Identificar granularidad

```text
fct_orders: un pedido completado
dim_customers: un cliente
customer_revenue: un cliente
```

Modelar datos es organizar hechos y atributos para contestar preguntas de negocio sin ambigüedades.

**Resultado esperado** Cuatro, cuatro y cuatro filas respectivamente; no mezclar granos sin decidir agregación.

### Facts, dimensions y esquema estrella

**Clave** `facts-dimensions-y-esquema-estrella`

**Definición** Los hechos contienen eventos y medidas; dimensiones describen entidades; una estrella conecta hechos con dimensiones.

**Búsqueda** Facts, dimensions y esquema estrella · Ingresos por país

**Para recordar** Una dimensión debe ser única en la clave usada para unirla al hecho.

#### Ingresos por país

```sql
select c.country, sum(o.amount) as revenue
from {{ ref('fct_orders') }} o join {{ ref('dim_customers') }} c using(customer_id)
group by c.country order by c.country
```

Una dimensión debe ser única en la clave usada para unirla al hecho.

**Resultado esperado** ES 150; MX 350.

### Grain y fan-out

**Clave** `grain-y-fan-out`

**Definición** Grain es la unidad de cada fila; fan-out es la multiplicación de filas por un join uno-a-muchos.

**Búsqueda** Grain y fan-out · Detectar multiplicación de clientes

**Para recordar** Agregar antes de unir hechos cuando sus granos difieren.

#### Detectar multiplicación de clientes

```sql
select count(*) as joined_rows, count(distinct c.customer_id) as customers
from {{ ref('dim_customers') }} c left join {{ ref('fct_orders') }} o using(customer_id)
```

Agregar antes de unir hechos cuando sus granos difieren.

**Resultado esperado** joined_rows=5; customers=4. Ana aparece dos veces.

### Claves naturales, sustitutas y compuestas

**Clave** `claves-naturales-sustitutas-y-compuestas`

**Definición** Una clave natural viene del negocio; una sustituta identifica una fila de forma técnica; una compuesta usa varias columnas.

**Búsqueda** Claves naturales, sustitutas y compuestas · Crear clave técnica (PostgreSQL)

**Para recordar** No concatenar claves sin tratar separadores, NULL y posibles colisiones.

#### Crear clave técnica (PostgreSQL)

```sql
select customer_id, md5('shop:' || customer_id::text) as customer_key from {{ ref('stg_customers') }}
```

No concatenar claves sin tratar separadores, NULL y posibles colisiones.

**Resultado esperado** Cuatro claves de texto hexadecimales estables para IDs base.

### Bridge tables

**Clave** `bridge-tables`

**Definición** Representan relaciones muchos-a-muchos entre entidades.

**Búsqueda** Bridge tables · Crear una relación cliente-mes de compra

**Para recordar** Una tabla puente puede multiplicar medidas si no se define atribución.

#### Crear una relación cliente-mes de compra

```sql
select distinct customer_id, date_trunc('month',order_date)::date as month from {{ ref('fct_orders') }}
```

Una tabla puente puede multiplicar medidas si no se define atribución.

**Resultado esperado** Tres relaciones: cliente 1 enero, 2 enero, 3 febrero.

### Deduplicación

**Clave** `deduplicacion`

**Definición** Selecciona un registro por clave mediante criterios explícitos de prioridad.

**Búsqueda** Deduplicación · Conservar la versión más nueva (datos simulados)

**Para recordar** Un ORDER BY determinista evita elegir arbitrariamente entre empates.

#### Conservar la versión más nueva (datos simulados)

```sql
with versions(id,amount,ts) as (values (1,100,1),(1,120,2),(2,50,1)), ranked as (
select *, row_number() over(partition by id order by ts desc) as rn from versions)
select id, amount from ranked where rn=1 order by id
```

Un ORDER BY determinista evita elegir arbitrariamente entre empates.

**Resultado esperado** 1:120; 2:50.

### Reconciliación

**Clave** `reconciliacion`

**Definición** Compara métricas y claves entre origen y destino para detectar pérdidas o duplicados.

**Búsqueda** Reconciliación · Verificar ingresos de pedidos completados

**Para recordar** Comparar el mismo filtro y granularidad.

#### Verificar ingresos de pedidos completados

```sql
select (select sum(amount) from {{ ref('stg_orders') }} where status='completed') - (select sum(amount) from {{ ref('fct_orders') }}) as difference
```

Comparar el mismo filtro y granularidad.

**Resultado esperado** difference=0.


## Incrementales

**Clave** `incrementales`

### Definición

**Clave** `definicion`

**Definición** Un modelo incremental conserva su relación y puede limitar filas de entrada en siguientes ejecuciones.

**Búsqueda** Incrementales · Crear models/inc_orders.sql

**Para recordar** El filtro incremental y la estrategia de escritura son decisiones separadas.

#### Crear models/inc_orders.sql

```sql
{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}
select * from {{ ref('stg_orders') }}
{% if is_incremental() %}
where updated_at >= (select coalesce(max(updated_at),timestamp '1900-01-01') from {{ this }})
{% endif %}
```

El filtro incremental y la estrategia de escritura son decisiones separadas.

**Resultado esperado** Primera ejecución: cinco filas. Repetir sin cambios mantiene cinco IDs.

### is_incremental() y this

**Clave** `is-incremental-y-this`

**Definición** is_incremental es verdadero si existe una tabla para el modelo incremental y no se solicita full-refresh.

**Búsqueda** is_incremental() y this · Probar primera carga y actualización

**Para recordar** El SQL debe ser válido con ambas ramas.

#### Probar primera carga y actualización

```bash
dbt run --select inc_orders --full-refresh
dbt run --select inc_orders
```

El SQL debe ser válido con ambas ramas.

**Resultado esperado** Primero carga cinco filas; segundo aplica filtro del ejemplo y actualiza la fila de mayor timestamp sin duplicarla.

### unique_key

**Clave** `unique-key`

**Definición** Identifica qué fila existente corresponde a una nueva versión en estrategias compatibles.

**Búsqueda** unique_key · Actualizar una orden de laboratorio (PostgreSQL directo)

**Para recordar** No crea por sí sola una restricción UNIQUE ni valida duplicados.

#### Actualizar una orden de laboratorio (PostgreSQL directo)

```sql
update raw.orders set amount=160, updated_at=timestamp '2026-02-02 10:00' where order_id=105;
```

No crea por sí sola una restricción UNIQUE ni valida duplicados.

**Resultado esperado** Después de dbt run --select inc_orders, 105 vale 160 y siguen cinco filas. Restaurar importe y timestamp originales y ejecutar full-refresh al finalizar.

### Estrategias append y delete+insert

**Clave** `estrategias-append-y-delete-insert`

**Definición** append añade filas sin reemplazarlas; delete+insert elimina coincidencias de la clave e inserta nuevas versiones.

**Búsqueda** Estrategias append y delete+insert · Elegir estrategia de actualización

**Para recordar** append solo sirve si el filtro no reenvía filas o si el modelo admite duplicados.

#### Elegir estrategia de actualización

```sql
{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}
select * from {{ ref('stg_orders') }}
```

append solo sirve si el filtro no reenvía filas o si el modelo admite duplicados.

**Resultado esperado** Una segunda carga con las mismas claves conserva cinco filas con entradas únicas.

### Estrategias merge e insert_overwrite

**Clave** `estrategias-merge-e-insert-overwrite`

**Definición** merge actualiza o inserta por clave; insert_overwrite reemplaza particiones o conjuntos definidos por el adaptador.

**Búsqueda** Estrategias merge e insert_overwrite · Configurar merge (alternativa para inc_orders)

**Para recordar** Postgres 15+ admite merge mediante el adaptador compatible; insert_overwrite se usa en plataformas como BigQuery, no en el laboratorio PostgreSQL.

#### Configurar merge (alternativa para inc_orders)

```sql
{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='merge') }}
select * from {{ ref('stg_orders') }}
```

Postgres 15+ admite merge mediante el adaptador compatible; insert_overwrite se usa en plataformas como BigQuery, no en el laboratorio PostgreSQL.

**Resultado esperado** Con soporte del adaptador y PostgreSQL 15+, IDs repetidos actualizan filas en lugar de añadirlas; cinco filas.

### microbatch y event_time

**Clave** `microbatch-y-event-time`

**Definición** Divide datos temporales en lotes para procesar intervalos de forma independiente.

**Búsqueda** microbatch y event_time · Configurar lotes diarios (ejemplo alternativo)

**Para recordar** Requiere adaptador compatible y una columna temporal; no es solo un filtro is_incremental.

**Nota** Consultar matriz de estrategias y versión; evitar usar este ejemplo sin acotar el rango de ejecución.

#### Configurar lotes diarios (ejemplo alternativo)

```sql
{{ config(materialized='incremental', incremental_strategy='microbatch', event_time='order_date', begin='2026-01-01', batch_size='day') }}
select * from {{ ref('stg_orders') }}
```

Requiere adaptador compatible y una columna temporal; no es solo un filtro is_incremental.

**Resultado esperado** En un entorno compatible, dbt construye lotes diarios; requiere configurar event_time también en padres que deban filtrarse, y revisar rango de backfill antes de ejecutar.

### --full-refresh y full_refresh

**Clave** `full-refresh-y-full-refresh`

**Definición** full-refresh solicita reconstruir desde cero; la configuración full_refresh puede permitirla o impedirla.

**Búsqueda** --full-refresh y full_refresh · Reconstruir inc_orders

**Para recordar** Usar al cambiar lógica histórica, y comprobar costo.

#### Reconstruir inc_orders

```bash
dbt run --select inc_orders --full-refresh
```

Usar al cambiar lógica histórica, y comprobar costo.

**Resultado esperado** Cinco filas a partir del estado actual de raw; no conserva versiones anteriores.

### on_schema_change

**Clave** `on-schema-change`

**Definición** Define qué hacer cuando cambia la estructura de un incremental: ignore, fail, append_new_columns o sync_all_columns.

**Búsqueda** on_schema_change · Fallar si cambia el esquema

**Para recordar** Añadir una columna no rellena automáticamente valores históricos.

#### Fallar si cambia el esquema

```sql
{{ config(materialized='incremental', unique_key='order_id', on_schema_change='fail') }}
select * from {{ ref('stg_orders') }}
```

Añadir una columna no rellena automáticamente valores históricos.

**Resultado esperado** Si se añade una columna al SELECT tras crear la relación, ejecución incremental falla en lugar de modificarla silenciosamente.

### Late-arriving data y lookback

**Clave** `late-arriving-data-y-lookback`

**Definición** Una ventana de revisión vuelve a procesar fechas recientes para capturar registros que llegan tarde.

**Búsqueda** Late-arriving data y lookback · Releer últimos siete días (variante de inc_orders)

**Para recordar** Combinar solapamiento con clave y estrategia de actualización; no cubre atrasos ilimitados.

#### Releer últimos siete días (variante de inc_orders)

```sql
{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='delete+insert') }}
select * from {{ ref('stg_orders') }}
{% if is_incremental() %}
where updated_at >= (select coalesce(max(updated_at),timestamp '1900-01-01') - interval '7 days' from {{ this }})
{% endif %}
```

Combinar solapamiento con clave y estrategia de actualización; no cubre atrasos ilimitados.

**Resultado esperado** Una fila con timestamp dentro del solapamiento se reprocesa aunque sea anterior al máximo; se mantienen claves únicas.

### Incremental predicates

**Clave** `incremental-predicates`

**Definición** Limitan la búsqueda en el destino durante ciertas estrategias incrementales, reduciendo escaneo.

**Búsqueda** Incremental predicates · Limitar escaneo del destino con merge (ejemplo PostgreSQL)

**Para recordar** Un predicado incorrecto puede dejar coincidencias fuera y crear duplicados.

#### Limitar escaneo del destino con merge (ejemplo PostgreSQL)

```sql
{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='merge', incremental_predicates=["DBT_INTERNAL_DEST.order_date >= date '2026-01-01'"]) }}
select * from {{ ref('stg_orders') }}
```

Un predicado incorrecto puede dejar coincidencias fuera y crear duplicados.

**Resultado esperado** Con soporte del adaptador, merge limita la coincidencia a destino desde enero; todos los IDs base están dentro del intervalo.

### Backfill e idempotencia

**Clave** `backfill-e-idempotencia`

**Definición** Backfill reprocesa historia; idempotencia significa que mismas entradas y lógica producen el mismo estado tras repetir.

**Búsqueda** Backfill e idempotencia · Reprocesar todo en laboratorio

**Para recordar** No avanzar marcas de agua sin considerar correcciones antiguas.

#### Reprocesar todo en laboratorio

```bash
dbt run --select inc_orders --full-refresh
dbt run --select inc_orders
```

No avanzar marcas de agua sin considerar correcciones antiguas.

**Resultado esperado** Cinco filas con los mismos valores al repetir sin cambios; comprobar count(*) y count(distinct order_id).


## Snapshots e historial

**Clave** `snapshots-e-historial`

### Definición

**Clave** `definicion`

**Definición** Un snapshot registra versiones observadas de filas mutables para conservar historial tipo SCD2.

**Búsqueda** Snapshots e historial · Crear snapshots/customer_history.yml

**Para recordar** No recupera cambios ocurridos entre ejecuciones que nunca observó.

#### Crear snapshots/customer_history.yml

```yaml
snapshots:
  - name: customer_history
    relation: source('shop','customers')
    config:
      unique_key: customer_id
      strategy: timestamp
      updated_at: updated_at
```

No recupera cambios ocurridos entre ejecuciones que nunca observó.

**Resultado esperado** dbt snapshot --select customer_history crea cuatro versiones iniciales.

### Timestamp strategy

**Clave** `timestamp-strategy`

**Definición** Detecta cambios mediante un campo updated_at que aumenta al modificar la fila.

**Búsqueda** Timestamp strategy · Modificar un cliente (PostgreSQL directo, después del snapshot inicial)

**Para recordar** Una modificación que no actualiza el timestamp puede no detectarse.

#### Modificar un cliente (PostgreSQL directo, después del snapshot inicial)

```sql
update raw.customers set country='ES', updated_at=timestamp '2026-03-01 08:00' where customer_id=1;
```

Una modificación que no actualiza el timestamp puede no detectarse.

**Resultado esperado** Tras dbt snapshot --select customer_history, Ana tiene dos versiones, la anterior cerrada y la nueva vigente. Restaurar raw tras practicar; para repetir desde cero limpiar solo el snapshot de laboratorio.

### Check strategy

**Clave** `check-strategy`

**Definición** Compara los valores de columnas elegidas cuando no hay timestamp fiable.

**Búsqueda** Check strategy · Capturar cambios de nombre o país (snapshot alternativo)

**Para recordar** Usar check_cols explícitas evita cambios de historial por campos irrelevantes.

#### Capturar cambios de nombre o país (snapshot alternativo)

```yaml
snapshots:
  - name: customer_check_history
    relation: source('shop','customers')
    config:
      unique_key: customer_id
      strategy: check
      check_cols: [name, country]
```

Usar check_cols explícitas evita cambios de historial por campos irrelevantes.

**Resultado esperado** Primera ejecución crea cuatro versiones; cambiar name o country crea otra versión en la siguiente captura.

### SCD tipo 1 y tipo 2

**Clave** `scd-tipo-1-y-tipo-2`

**Definición** SCD1 conserva el estado actual; SCD2 guarda versiones con intervalos de validez.

**Búsqueda** SCD tipo 1 y tipo 2 · Consultar versiones vigentes

**Para recordar** Snapshots implementan historial tipo 2; una dimensión normal reconstruida puede ser tipo 1.

#### Consultar versiones vigentes

```sql
select customer_id, country from {{ ref('customer_history') }} where dbt_valid_to is null order by customer_id
```

Snapshots implementan historial tipo 2; una dimensión normal reconstruida puede ser tipo 1.

**Resultado esperado** Cuatro clientes vigentes; si se realizó el cambio de Ana, aparece ES para ella.

### Hard deletes y soft deletes

**Clave** `hard-deletes-y-soft-deletes`

**Definición** Un hard delete elimina la fila de origen; un soft delete usa una marca de estado.

**Búsqueda** Hard deletes y soft deletes · Cerrar versiones al borrar una fila (snapshot nuevo)

**Para recordar** hard_deletes ignore/invalidate/new_record controla el tratamiento en versiones/adaptadores compatibles.

**Nota** new_record añade un registro de borrado y metadata dbt_is_deleted donde se admite; migrar snapshots existentes explícitamente.

#### Cerrar versiones al borrar una fila (snapshot nuevo)

```yaml
snapshots:
  - name: customer_delete_history
    relation: source('shop','customers')
    config:
      unique_key: customer_id
      strategy: timestamp
      updated_at: updated_at
      hard_deletes: invalidate
```

hard_deletes ignore/invalidate/new_record controla el tratamiento en versiones/adaptadores compatibles.

**Resultado esperado** Después de capturar y borrar al cliente 4 sin pedidos, la siguiente captura cierra su versión. Usar solo laboratorio y restaurar cliente 4.

### Metadatos e intervalos de vigencia

**Clave** `metadatos-e-intervalos-de-vigencia`

**Definición** dbt_valid_from y dbt_valid_to delimitan versiones; dbt_scd_id identifica una versión.

**Búsqueda** Metadatos e intervalos de vigencia · Ver historial de Ana

**Para recordar** Con dbt_valid_to_current configurado, la fila actual puede tener fecha centinela en vez de NULL.

#### Ver historial de Ana

```sql
select customer_id, country, dbt_valid_from, dbt_valid_to from {{ ref('customer_history') }} where customer_id=1 order by dbt_valid_from
```

Con dbt_valid_to_current configurado, la fila actual puede tener fecha centinela en vez de NULL.

**Resultado esperado** Después de la actualización: una versión MX cerrada y una ES vigente.

### CDC e historial de hechos

**Clave** `cdc-e-historial-de-hechos`

**Definición** CDC captura cambios de origen; un snapshot observa estados periódicamente y un incremental actualiza resultados según lógica.

**Búsqueda** CDC e historial de hechos · Elegir estrategia

**Para recordar** No confundir un snapshot periódico con un log completo de eventos.

#### Elegir estrategia

```text
Cambio de país de cliente → snapshot SCD2
Corrección de importe → incremental con unique_key
Todos los eventos de cambio → CDC de origen
```

CDC captura cambios de origen.

**Resultado esperado** Se preserva historial donde se necesita; el incremental por sí solo no guarda cada versión.


## Documentación y linaje

**Clave** `documentacion-y-linaje`

### Definición

**Clave** `definicion`

**Definición** La documentación asocia explicaciones y metadatos a modelos, fuentes y columnas; el DAG muestra cómo se relacionan.

**Búsqueda** Documentación y linaje · Describir el mart

**Para recordar** Documentar el significado de la fila y de cada métrica, no solo repetir el nombre.

#### Describir el mart

```yaml
models:
  - name: customer_revenue
    description: Una fila por cliente con ingresos de pedidos completados
    columns:
      - name: revenue
        description: Suma de importes completados, cero sin pedidos
```

Documentar el significado de la fila y de cada métrica, no solo repetir el nombre.

**Resultado esperado** La descripción queda disponible en manifest y docs.

### Doc blocks y doc()

**Clave** `doc-blocks-y-doc`

**Definición** Un bloque docs guarda texto Markdown reutilizable en descripciones.

**Búsqueda** Doc blocks y doc() · Crear models/revenue_docs.md

**Para recordar** El archivo Markdown debe estar en una ruta de documentación reconocida.

#### Crear models/revenue_docs.md

```markdown
{% docs revenue_definition %}
Importe total de pedidos completados, sin incluir cancelados.
{% enddocs %}
```

El archivo Markdown debe estar en una ruta de documentación reconocida.

**Resultado esperado** En YAML usar description: "{{ doc('revenue_definition') }}"; docs muestra el texto del bloque.

### dbt docs generate y serve

**Clave** `dbt-docs-generate-y-serve`

**Definición** generate construye artefactos y catálogo; serve abre una documentación local de Core.

**Búsqueda** dbt docs generate y serve · Generar y abrir documentación

**Para recordar** El catálogo consulta metadatos del warehouse; no publicar información sensible.

#### Generar y abrir documentación

```bash
dbt docs generate
dbt docs serve --port 8080
```

El catálogo consulta metadatos del warehouse; no publicar información sensible.

**Resultado esperado** Sitio local en localhost:8080 con los modelos construidos, sus columnas y dependencias.

### Lineage e impacto

**Clave** `lineage-e-impacto`

**Definición** Permite rastrear entradas y consumidores para evaluar qué se rompe al modificar un modelo.

**Búsqueda** Lineage e impacto · Identificar afectados por staging

**Para recordar** Una dependencia no equivale a un join ni a una garantía de calidad.

#### Identificar afectados por staging

```bash
dbt ls --select stg_orders+ --resource-type model
```

Una dependencia no equivale a un join ni a una garantía de calidad.

**Resultado esperado** stg_orders, int_completed_orders, fct_orders y customer_revenue en el proyecto base.

### Exposures

**Clave** `exposures`

**Definición** Describen consumidores externos, por ejemplo dashboards, y sus dependencias.

**Búsqueda** Exposures · Registrar un reporte (models/exposures.yml)

**Para recordar** Una exposure no ejecuta el dashboard.

#### Registrar un reporte (models/exposures.yml)

```yaml
exposures:
  - name: sales_dashboard
    type: dashboard
    maturity: medium
    depends_on:
      - ref('customer_revenue')
    owner:
      name: Analytics
      email: analytics@example.com
```

Una exposure no ejecuta el dashboard.

**Resultado esperado** El DAG incorpora sales_dashboard como consumidor de customer_revenue; el correo es ficticio.

### Metadata y persist_docs

**Clave** `metadata-y-persist-docs`

**Definición** meta y tags aportan clasificación; persist_docs intenta guardar descripciones como comentarios del motor.

**Búsqueda** Metadata y persist_docs · Persistir documentación de modelos

**Para recordar** La persistencia depende del adaptador y no equivale a políticas de acceso.

#### Persistir documentación de modelos

```yaml
models:
  tienda_dbt:
    +persist_docs:
      relation: true
      columns: true
```

La persistencia depende del adaptador y no equivale a políticas de acceso.

**Resultado esperado** Tras reconstruir, el motor compatible recibe comentarios de las descripciones configuradas.


## Artefactos y depuración

**Clave** `artefactos-y-depuracion`

### Definición

**Clave** `definicion`

**Definición** Los artefactos JSON contienen metadatos y resultados de dbt; los logs y SQL compilados ayudan a diagnosticar errores.

**Búsqueda** Artefactos y depuración · Inspeccionar archivos de una ejecución

**Para recordar** Consultar la versión de esquema antes de automatizar el consumo.

#### Inspeccionar archivos de una ejecución

```bash
dbt build
ls target
```

Consultar la versión de esquema antes de automatizar el consumo.

**Resultado esperado** manifest.json y run_results.json, además de directorios compiled/run cuando corresponda.

### manifest.json

**Clave** `manifest-json`

**Definición** Contiene nodos, configuraciones, dependencias y metadatos del proyecto analizado.

**Búsqueda** manifest.json · Leer dependencias de fct_orders

**Para recordar** No confundir lo declarado en manifest con lo que efectivamente se construyó.

#### Leer dependencias de fct_orders

```python
import json
with open('target/manifest.json') as f:
    m=json.load(f)
print(m['nodes']['model.tienda_dbt.fct_orders']['depends_on']['nodes'])
```

No confundir lo declarado en manifest con lo que efectivamente se construyó.

**Resultado esperado** Incluye model.tienda_dbt.int_completed_orders en el proyecto base.

### run_results.json

**Clave** `run-results-json`

**Definición** Registra el resultado y duración de los nodos ejecutados por un comando compatible.

**Búsqueda** run_results.json · Leer estados de ejecución

**Para recordar** La siguiente ejecución puede sobrescribirlo; conservar copias para histórico.

#### Leer estados de ejecución

```python
import json
with open('target/run_results.json') as f:
    r=json.load(f)
for x in r['results']:
    print(x['unique_id'], x['status'])
```

La siguiente ejecución puede sobrescribirlo; conservar copias para histórico.

**Resultado esperado** Identificadores y estados, por ejemplo model.tienda_dbt.fct_orders success si se construyó sin errores.

### catalog.json y sources.json

**Clave** `catalog-json-y-sources-json`

**Definición** catalog describe relaciones y columnas inspeccionadas; sources registra resultados de frescura.

**Búsqueda** catalog.json y sources.json · Actualizar catálogo y frescura

**Para recordar** Se generan con comandos distintos.

#### Actualizar catálogo y frescura

```bash
dbt docs generate
dbt source freshness
```

Se generan con comandos distintos.

**Resultado esperado** target/catalog.json describe relaciones; target/sources.json contiene resultados si hay fuentes configuradas.

### SQL compilado y ejecutado

**Clave** `sql-compilado-y-ejecutado`

**Definición** target/compiled contiene SQL renderizado; target/run suele incluir SQL de construcción emitido por materializaciones.

**Búsqueda** SQL compilado y ejecutado · Leer SQL de fct_orders

**Para recordar** El contenido no es necesariamente idéntico al SELECT escrito por el autor.

#### Leer SQL de fct_orders

```bash
dbt compile --select fct_orders
cat target/compiled/tienda_dbt/models/marts/fct_orders.sql
```

El contenido no es necesariamente idéntico al SELECT escrito por el autor.

**Resultado esperado** SELECT con la referencia física resuelta en lugar de ref().

### Errores de compilación y base de datos

**Clave** `errores-de-compilacion-y-base-de-datos`

**Definición** Un error de compilación suele impedir generar SQL; un error de base de datos surge al ejecutar SQL inválido o sin permisos.

**Búsqueda** Errores de compilación y base de datos · Provocar un error de referencia (modelo temporal)

**Para recordar** Inspeccionar el primer error y el nodo que lo produce.

#### Provocar un error de referencia (modelo temporal)

```sql
select * from {{ ref('no_existe') }}
```

Inspeccionar el primer error y el nodo que lo produce.

**Resultado esperado** Error de dependencia al analizar/compilar. Retirar el modelo antes de continuar.

### Logs y flags de diagnóstico

**Clave** `logs-y-flags-de-diagnostico`

**Definición** dbt escribe mensajes de ejecución en consola y logs/dbt.log; log-level y log-format permiten cambiar detalle y formato.

**Búsqueda** Logs y flags de diagnóstico · Generar log estructurado

**Para recordar** Guardar logs con cuidado y evitar registrar secretos.

#### Generar log estructurado

```bash
dbt --debug --log-format json run --select fct_orders
```

Guardar logs con cuidado y evitar registrar secretos.

**Resultado esperado** Mensajes JSON de eventos de ejecución; detalles dependen del motor y versión.

### Retry

**Clave** `retry`

**Definición** dbt retry vuelve a intentar recursos fallidos o pendientes de una ejecución compatible previa.

**Búsqueda** Retry · Reintentar un build fallido

**Para recordar** Corregir primero la causa y preservar run_results del intento fallido.

#### Reintentar un build fallido

```bash
dbt build
# corregir el error en el recurso
dbt retry
```

Corregir primero la causa y preservar run_results del intento fallido.

**Resultado esperado** Reintenta recursos necesarios del build anterior, no todos los que tuvieron éxito.


## Paquetes y reutilización

**Clave** `paquetes-y-reutilizacion`

### Definición

**Clave** `definicion`

**Definición** Los paquetes incorporan código dbt de otros proyectos, como macros y tests reutilizables.

**Búsqueda** Paquetes y reutilización · Declarar dbt-utils (packages.yml)

**Para recordar** Fijar versiones y revisar compatibilidad antes de actualizar.

#### Declarar dbt-utils (packages.yml)

```yaml
packages:
  - package: dbt-labs/dbt_utils
    version: 1.3.0
```

Fijar versiones y revisar compatibilidad antes de actualizar.

**Resultado esperado** dbt deps instala el paquete compatible en dbt_packages y genera lockfile.

### packages.yml y dependencies.yml

**Clave** `packages-yml-y-dependencies-yml`

**Definición** packages.yml declara dependencias de código; dependencies.yml también permite declarar dependencias de proyectos para Mesh en entornos compatibles.

**Búsqueda** packages.yml y dependencies.yml · Resolver dependencias

**Para recordar** No declarar el mismo conjunto en archivos incompatibles; distinguir paquetes de proyectos.

#### Resolver dependencias

```bash
dbt deps
```

No declarar el mismo conjunto en archivos incompatibles; distinguir paquetes de proyectos.

**Resultado esperado** Se descarga el paquete especificado en packages.yml y se actualiza package-lock.yml.

### Lockfile y version pinning

**Clave** `lockfile-y-version-pinning`

**Definición** package-lock.yml registra versiones resueltas; fijar dependencias evita cambios no intencionales.

**Búsqueda** Lockfile y version pinning · Actualizar versiones permitidas

**Para recordar** Versionar el lockfile y actualizarlo deliberadamente.

#### Actualizar versiones permitidas

```bash
dbt deps --upgrade
```

Versionar el lockfile y actualizarlo deliberadamente.

**Resultado esperado** Se vuelven a resolver las versiones; con pin exacto se conserva la versión fijada salvo otros cambios.

### dbt-utils

**Clave** `dbt-utils`

**Definición** Incluye macros para operaciones comunes, como claves sustitutas y tests de combinaciones únicas.

**Búsqueda** dbt-utils · Generar clave de cliente

**Para recordar** Usar namespace del paquete y declarar primero la dependencia.

#### Generar clave de cliente

```sql
select customer_id, {{ dbt_utils.generate_surrogate_key(['customer_id']) }} as sk from {{ ref('stg_customers') }}
```

Usar namespace del paquete y declarar primero la dependencia.

**Resultado esperado** Cuatro claves estables y distintas con los datos base; requiere dbt-utils instalado.

### dbt-expectations y Hub

**Clave** `dbt-expectations-y-hub`

**Definición** Hub permite localizar paquetes; dbt-expectations aporta tests adicionales, sujeto a mantenimiento y compatibilidad.

**Búsqueda** dbt-expectations y Hub · Ejemplo de test de rango tras instalar paquete compatible

**Para recordar** Verificar versión y repositorio actual antes de instalar paquetes comunitarios.

#### Ejemplo de test de rango tras instalar paquete compatible

```yaml
models:
  - name: stg_orders
    columns:
      - name: amount
        data_tests:
          - dbt_expectations.expect_column_values_to_be_between:
              arguments:
                min_value: 0
                max_value: 1000
```

Verificar versión y repositorio actual antes de instalar paquetes comunitarios.

**Resultado esperado** Pasa con cinco importes entre 0 y 1000 si la versión del paquete admite este test y sintaxis.

### Hooks de modelo

**Clave** `hooks-de-modelo`

**Definición** pre_hook y post_hook ejecutan SQL antes o después de construir un recurso.

**Búsqueda** Hooks de modelo · Analizar estadísticas de una tabla PostgreSQL

**Para recordar** Evitar efectos secundarios no idempotentes; comportamiento transaccional depende del adaptador.

#### Analizar estadísticas de una tabla PostgreSQL

```sql
{{ config(materialized='table', post_hook='analyze {{ this }}') }}
select * from {{ ref('fct_orders') }}
```

Evitar efectos secundarios no idempotentes; comportamiento transaccional depende del adaptador.

**Resultado esperado** Se construye lab_example y se ejecuta ANALYZE sobre su relación.

### Hooks de proyecto

**Clave** `hooks-de-proyecto`

**Definición** on-run-start y on-run-end ejecutan acciones globales de ciertos comandos.

**Búsqueda** Hooks de proyecto · Registrar el inicio (dbt_project.yml)

**Para recordar** Se ejecutan por invocación, no por cada fila ni necesariamente por cada nodo.

#### Registrar el inicio (dbt_project.yml)

```yaml
on-run-start:
  - "{{ log('Inicio del proyecto', info=true) }}"
```

Se ejecutan por invocación, no por cada fila ni necesariamente por cada nodo.

**Resultado esperado** Se registra el mensaje al iniciar un comando que ejecuta el hook; no modifica datos.

### dbt run-operation

**Clave** `dbt-run-operation`

**Definición** Invoca una macro como operación de CLI y recibe argumentos YAML.

**Búsqueda** dbt run-operation · Crear una operación (macros/report_message.sql)

**Para recordar** Una macro de operación puede cambiar datos: revisar el código antes de ejecutarla.

#### Crear una operación (macros/report_message.sql)

```sql
{% macro report_message(label='ventas') %}
  {% do log('Reporte: ' ~ label, info=true) %}
{% endmacro %}
```

Una macro de operación puede cambiar datos: revisar el código antes de ejecutarla.

**Resultado esperado** dbt run-operation report_message --args '{label: mensual}' imprime Reporte: mensual.

### Materializaciones personalizadas

**Clave** `materializaciones-personalizadas`

**Definición** Un bloque materialization implementa cómo construir relaciones para un adaptador.

**Búsqueda** Materializaciones personalizadas · Diseñar una materialización

**Para recordar** Es código de infraestructura: manejar caché, relaciones existentes, transacciones y hooks.

**Nota** Ejemplo conceptual; no es una implementación ejecutable ni se garantiza portabilidad.

#### Diseñar una materialización

```text
Obtener this → preparar relación → ejecutar DDL → aplicar hooks/commit → devolver relaciones creadas
```

Un bloque materialization implementa cómo construir relaciones para un adaptador.

**Resultado esperado** La especificación del adaptador define los pasos exactos. Usar view/table incorporadas hasta necesitar un comportamiento distinto.


## Semantic Layer y MetricFlow

**Clave** `semantic-layer-y-metricflow`

### Definición

**Clave** `definicion`

**Definición** La capa semántica define métricas y relaciones de negocio encima de modelos para generar consultas coherentes.

**Búsqueda** Semantic Layer y MetricFlow · Consultar una métrica común

**Para recordar** MetricFlow construye SQL a partir de métricas y dimensiones; no sustituye modelos físicos.

#### Consultar una métrica común

```text
fct_orders → modelo semántico orders → métrica revenue → agrupación por mes
```

La capa semántica define métricas y relaciones de negocio encima de modelos para generar consultas coherentes.

**Resultado esperado** Enero 350, febrero 150 en los datos base; requiere configuración y entorno MetricFlow compatible.

### Semantic models y entities

**Clave** `semantic-models-y-entities`

**Definición** Un modelo semántico declara entidades y dimensiones sobre un modelo físico; las entidades primary, foreign, unique y natural representan identidades y relaciones.

**Búsqueda** Semantic models y entities · Definir pedidos en sintaxis clásica (models/semantic_orders.yml)

**Para recordar** La clave debe corresponder al grain real, no solo a un nombre de columna.

**Nota** Sintaxis clásica; para consultar métricas hace falta un motor MetricFlow y adaptador soportados, no solo dbt-postgres.

#### Definir pedidos en sintaxis clásica (models/semantic_orders.yml)

```yaml
semantic_models:
  - name: orders
    model: ref('fct_orders')
    defaults:
      agg_time_dimension: order_date
    entities:
      - {name: order, type: primary, expr: order_id}
      - {name: customer, type: foreign, expr: customer_id}
    dimensions:
      - name: order_date
        type: time
        type_params: {time_granularity: day}
      - {name: status, type: categorical}
    measures:
      - {name: order_revenue, agg: sum, expr: amount}
      - {name: order_count, agg: count, expr: order_id}
```

La clave debe corresponder al grain real, no solo a un nombre de columna.

**Resultado esperado** En Core 1.10 el recurso declara dos medidas, fecha diaria y entidades pedido/cliente. Ejecutar parse para validar la estructura.

### Measures y simple metrics (clásico)

**Clave** `measures-y-simple-metrics-clasico`

**Definición** Una measure define agregación y expresión; una simple metric publica esa agregación como métrica consultable.

**Búsqueda** Measures y simple metrics (clásico) · Publicar ingresos y número de pedidos (añadir al YAML clásico)

**Para recordar** Las measures se reemplazan por simple metrics directas en la nueva especificación.

#### Publicar ingresos y número de pedidos (añadir al YAML clásico)

```yaml
metrics:
  - name: revenue
    label: Revenue
    type: simple
    type_params: {measure: order_revenue}
  - name: orders_count
    label: Orders
    type: simple
    type_params: {measure: order_count}
```

Las measures se reemplazan por simple metrics directas en la nueva especificación.

**Resultado esperado** Métricas esperadas sin agrupación: revenue=500 y orders_count=4 en plataforma compatible.

### Nueva especificación YAML

**Clave** `nueva-especificacion-yaml`

**Definición** Desde Core 1.12 y entornos Fusion compatibles, se pueden declarar entidades, dimensiones y métricas directamente dentro de models.

**Búsqueda** Nueva especificación YAML · Definir ingresos con sintaxis nueva (alternativa al YAML clásico)

**Para recordar** No mezclar el modelo semántico clásico y el nuevo para la misma definición.

#### Definir ingresos con sintaxis nueva (alternativa al YAML clásico)

```yaml
models:
  - name: fct_orders
    semantic_model:
      enabled: true
    agg_time_dimension: order_date
    columns:
      - name: order_id
        entity: {name: order, type: primary}
      - name: customer_id
        entity: {name: customer, type: foreign}
      - name: order_date
        granularity: day
        dimension: {type: time}
      - name: status
        dimension: {type: categorical}
    metrics:
      - name: revenue
        type: simple
        agg: sum
        expr: amount
      - name: orders_count
        type: simple
        agg: count
        expr: order_id
```

No mezclar el modelo semántico clásico y el nuevo para la misma definición.

**Resultado esperado** Equivale a las dos métricas clásicas; revenue=500, orders_count=4. No se ejecuta en Core 1.10.

### Dimensiones categóricas y temporales

**Clave** `dimensiones-categoricas-y-temporales`

**Definición** Permiten dividir una métrica por atributos o periodos; la granularidad temporal indica el nivel nativo de una fecha.

**Búsqueda** Dimensiones categóricas y temporales · Desglosar revenue por mes

**Para recordar** No sumar promedios de grupos sin ponderar.

#### Desglosar revenue por mes

```text
Métrica: revenue
Dimensión temporal: metric_time, granularidad month
```

Permiten dividir una métrica por atributos o periodos.

**Resultado esperado** 2026-01:350; 2026-02:150, en una consulta compatible.

### Ratio metrics

**Clave** `ratio-metrics`

**Definición** Una ratio divide dos métricas agregadas, por ejemplo ingresos entre pedidos.

**Búsqueda** Ratio metrics · Definir ticket medio en spec clásica (añadir a metrics)

**Para recordar** Calcular ratio de agregados, no promedio de ratios sin justificación.

#### Definir ticket medio en spec clásica (añadir a metrics)

```yaml
- name: average_order_value
  label: Average order value
  type: ratio
  type_params:
    numerator: revenue
    denominator: orders_count
```

Calcular ratio de agregados, no promedio de ratios sin justificación.

**Resultado esperado** 500/4 = 125 sin agrupación; enero 350/3, febrero 150/1. Nueva spec: numerator y denominator directamente en la métrica.

### Derived metrics

**Clave** `derived-metrics`

**Definición** Combinan métricas mediante una expresión aritmética.

**Búsqueda** Derived metrics · Estimar ingreso neto hipotético del 90% (spec clásica)

**Para recordar** Declarar las métricas de entrada y sus alias si se usan.

#### Estimar ingreso neto hipotético del 90% (spec clásica)

```yaml
- name: estimated_net
  label: Estimated net
  type: derived
  type_params:
    expr: revenue * 0.9
    metrics:
      - name: revenue
```

Declarar las métricas de entrada y sus alias si se usan.

**Resultado esperado** 450 total; es una regla de negocio simulada, no ingreso neto real. En spec nueva expr y metrics son claves directas.

### Time spine

**Clave** `time-spine`

**Definición** Una relación de fechas consecutivas permite análisis temporal y periodos sin eventos.

**Búsqueda** Time spine · Crear models/time_spine.sql para un laboratorio PostgreSQL

**Para recordar** Debe cubrir el rango de datos y la granularidad requerida.

#### Crear models/time_spine.sql para un laboratorio PostgreSQL

```sql
{{ config(materialized='table') }}
select d::date as date_day
from generate_series(date '2026-01-01',date '2026-02-28',interval '1 day') as t(d)
```

Debe cubrir el rango de datos y la granularidad requerida.

**Resultado esperado** 59 días; para MetricFlow declarar además time_spine.standard_granularity_column: date_day en propiedades del modelo y granularity: day en la columna según versión.

### Cumulative metrics

**Clave** `cumulative-metrics`

**Definición** Agregan una medida o métrica a través del tiempo, con ventana móvil o acumulado según configuración.

**Búsqueda** Cumulative metrics · Definir acumulado de ingresos (spec clásica)

**Para recordar** Requieren time spine y dimensión temporal compatible.

#### Definir acumulado de ingresos (spec clásica)

```yaml
- name: cumulative_revenue
  label: Cumulative revenue
  type: cumulative
  type_params:
    measure: order_revenue
```

Requieren time spine y dimensión temporal compatible.

**Resultado esperado** Con time spine y consulta por mes: acumulado enero 350, febrero 500; validar configuración y rango temporal en MetricFlow.

### Conversion metrics

**Clave** `conversion-metrics`

**Definición** Miden qué proporción de entidades con evento base realiza un evento posterior dentro de una ventana.

**Búsqueda** Conversion metrics · Definir conversión de visita a compra

**Para recordar** Definir la entidad, orden temporal, ventana y criterio de conteo.

**Nota** La especificación YAML de conversion difiere por versión; consultar referencia oficial antes de implementarla.

#### Definir conversión de visita a compra

```text
Datos ilustrativos: visitas A día 1, B día 1; compra A día 2.
Entidad: usuario; base: visita; conversión: compra; ventana: 7 días.
```

Miden qué proporción de entidades con evento base realiza un evento posterior dentro de una ventana.

**Resultado esperado** 1 de 2 usuarios convierte: 50%. No hay tabla de visitas en el dataset base; ejemplo conceptual de la métrica.

### Saved queries y exports

**Clave** `saved-queries-y-exports`

**Definición** Guardan consultas semánticas con métricas y agrupaciones; los exports persisten resultados cuando se habilitan.

**Búsqueda** Saved queries y exports · Guardar consulta mensual (archivo YAML en entorno compatible)

**Para recordar** Un saved query no es un modelo SQL ordinario.

#### Guardar consulta mensual (archivo YAML en entorno compatible)

```yaml
saved_queries:
  - name: monthly_revenue
    query_params:
      metrics: [revenue]
      group_by: ["TimeDimension('metric_time', 'month')"]
```

Un saved query no es un modelo SQL ordinario.

**Resultado esperado** La consulta semántica produce ingresos por mes; export requiere configuración adicional de tipo, nombre y entorno.

### Consumo desde BI y API

**Clave** `consumo-desde-bi-y-api`

**Definición** La plataforma permite consultar métricas con conectores compatibles o APIs semánticas.

**Búsqueda** Consumo desde BI y API · Consumir monthly_revenue

**Para recordar** La disponibilidad depende del plan, permisos, adaptador y conector.

#### Consumir monthly_revenue

```text
Configurar credenciales de solo lectura → elegir revenue y month en conector compatible → ejecutar consulta
```

La plataforma permite consultar métricas con conectores compatibles o APIs semánticas.

**Resultado esperado** El reporte muestra 350 y 150 si se usan los datos de laboratorio en plataforma compatible; no se conecta automáticamente desde Core.


## Estado y ejecución selectiva

**Clave** `estado-y-ejecucion-selectiva`

### Definición

**Clave** `definicion`

**Definición** La selección por estado compara el proyecto actual con artefactos de una ejecución anterior; defer permite resolver referencias contra otro entorno.

**Búsqueda** Estado y ejecución selectiva · Conservar un estado inicial

**Para recordar** Guardar el estado fuera de target para evitar sobrescribirlo.

#### Conservar un estado inicial

```bash
dbt build
mkdir -p state
cp target/manifest.json state/manifest.json
```

Guardar el estado fuera de target para evitar sobrescribirlo.

**Resultado esperado** state/manifest.json conserva la definición base para comparaciones posteriores.

### state:modified y state:new

**Clave** `state-modified-y-state-new`

**Definición** modified detecta cambios respecto al manifest anterior, new identifica nodos sin identidad equivalente en él.

**Búsqueda** state:modified y state:new · Detectar cambios después de editar un modelo

**Para recordar** Compara definiciones, no necesariamente cambios en filas de origen.

#### Detectar cambios después de editar un modelo

```bash
dbt ls --state state --select state:modified
```

Compara definiciones, no necesariamente cambios en filas de origen.

**Resultado esperado** Lista nodos cuya definición relevante cambió; si se añade lab_example, state:new lo identifica.

### --defer y --state

**Clave** `defer-y-state`

**Definición** Defer permite usar relaciones del manifest de estado para refs no seleccionados cuando corresponde.

**Búsqueda** --defer y --state · Construir únicamente cambios y sus descendientes

**Para recordar** No apunta automáticamente todos los modelos a producción; requiere permisos y relaciones disponibles.

**Nota** Para Slim CI real, conservar un manifest de producción y un target CI separado. --favor-state prioriza el estado para referencias elegibles.

#### Construir únicamente cambios y sus descendientes

```bash
dbt build --select state:modified+ --defer --state state
```

No apunta automáticamente todos los modelos a producción; requiere permisos y relaciones disponibles.

**Resultado esperado** Los refs no seleccionados pueden resolverse a relaciones del estado; en laboratorio apunta al mismo entorno si el manifest proviene de dev.

### dbt clone

**Clave** `dbt-clone`

**Definición** Crea clones de relaciones elegibles del estado; según adaptador puede usar una vista en vez de clonación física.

**Búsqueda** dbt clone · Clonar un mart a un entorno aislado

**Para recordar** No asumir zero-copy en PostgreSQL ni clonar sobre producción.

**Nota** Definir ci como copia del perfil dev con schema dbt_ci; usar manifest de una relación existente.

#### Clonar un mart a un entorno aislado

```bash
dbt clone --select customer_revenue --state state --target ci
```

No asumir zero-copy en PostgreSQL ni clonar sobre producción.

**Resultado esperado** Si existe target ci distinto y el adaptador admite la operación, aparece una relación en el esquema CI basada en la del estado.

### result:error y result:fail

**Clave** `result-error-y-result-fail`

**Definición** Seleccionan nodos según el estado de ejecución registrado en run_results.json de una invocación anterior.

**Búsqueda** result:error y result:fail · Listar errores de ejecución anteriores

**Para recordar** result:fail suele corresponder a tests; result:error a errores de ejecución.

#### Listar errores de ejecución anteriores

```bash
mkdir -p failed_state
cp target/run_results.json failed_state/
dbt ls --state failed_state --select result:error
```

result:fail suele corresponder a tests; result:error a errores de ejecución.

**Resultado esperado** Lista nodos en error del artefacto guardado; si no hubo errores, lista vacía.

### State-aware orchestration y dbt State

**Clave** `state-aware-orchestration-y-dbt-state`

**Definición** En entornos compatibles, el motor puede evaluar cambios de lógica y frescura a nivel de nodo para decidir reutilizar, clonar o reconstruir.

**Búsqueda** State-aware orchestration y dbt State · Evaluar una ejecución

**Para recordar** No es lo mismo que state:modified con un manifest local; disponibilidad y comportamiento dependen de producto y versión.

#### Evaluar una ejecución

```text
Habilitar State en entorno compatible → declarar frescura/inputs → ejecutar job → inspeccionar decisiones por nodo
```

En entornos compatibles, el motor puede evaluar cambios de lógica y frescura a nivel de nodo para decidir reutilizar, clonar o reconstruir.

**Resultado esperado** Un nodo sin cambios puede reutilizarse; un nodo con entrada o lógica modificada puede reconstruirse. No se garantiza un ahorro concreto.


## Producción y CI/CD

**Clave** `produccion-y-ci-cd`

### Definición

**Clave** `definicion`

**Definición** CI valida cambios antes de integrarlos; CD publica cambios aprobados y la orquestación programa ejecuciones.

**Búsqueda** Producción y CI/CD · Seguir un cambio de negocio

**Para recordar** Separar desarrollo, validación y producción mediante credenciales y esquemas.

#### Seguir un cambio de negocio

```text
Rama Git → pull request → build en CI → revisión → merge → job de producción
```

CI valida cambios antes de integrarlos.

**Resultado esperado** El cambio llega a producción después de una validación exitosa.

### Git y pull requests

**Clave** `git-y-pull-requests`

**Definición** Git versiona SQL, YAML, macros y tests, y un pull request permite revisar los cambios.

**Búsqueda** Git y pull requests · Versionar un cambio local

**Para recordar** No versionar credenciales, entornos virtuales ni artefactos temporales salvo necesidad explícita.

#### Versionar un cambio local

```bash
git init
git add dbt_project.yml models seeds tests macros snapshots analyses
git commit -m 'Initial dbt models'
```

No versionar credenciales, entornos virtuales ni artefactos temporales salvo necesidad explícita.

**Resultado esperado** Un commit contiene el código del proyecto si Git está configurado; crear .gitignore para target/, logs/, dbt_packages/, .venv/ y secretos.

### Entornos y permisos

**Clave** `entornos-y-permisos`

**Definición** Los targets distinguen conexiones o esquemas; la plataforma administra credenciales y entornos por separado.

**Búsqueda** Entornos y permisos · Añadir salida CI (dentro de outputs del perfil, copiar demás campos de dev)

**Para recordar** Nunca probar cambios destructivos en un target compartido de producción.

#### Añadir salida CI (dentro de outputs del perfil, copiar demás campos de dev)

```yaml
ci:
  type: postgres
  host: localhost
  port: 5432
  user: analyst
  password: "{{ env_var('DBT_ENV_SECRET_PASSWORD') }}"
  dbname: analytics_lab
  schema: dbt_ci
  threads: 2
```

Nunca probar cambios destructivos en un target compartido de producción.

**Resultado esperado** dbt build --target ci usa dbt_ci y deja dbt_dev intacto.

### Slim CI

**Clave** `slim-ci`

**Definición** Construye modelos modificados y los dependientes, resolviendo padres no construidos mediante un estado conocido.

**Búsqueda** Slim CI · Validar una rama con estado previo

**Para recordar** El manifest de comparación debe corresponder a producción y conservarse fuera de target.

#### Validar una rama con estado previo

```bash
dbt deps
dbt build --target ci --select state:modified+ --state state --defer
```

El manifest de comparación debe corresponder a producción y conservarse fuera de target.

**Resultado esperado** Se construyen cambios y descendientes en CI; errores deben impedir el merge en el flujo automatizado.

### Jobs, scheduling y triggers

**Clave** `jobs-scheduling-y-triggers`

**Definición** Un job agrupa comandos, entorno y condiciones de ejecución; puede ser programado o activado por eventos.

**Búsqueda** Jobs, scheduling y triggers · Crear un job diario en dbt Platform

**Para recordar** Ejecutar después de que las fuentes necesarias estén listas.

#### Crear un job diario en dbt Platform

```text
Elegir entorno de despliegue → añadir dbt source freshness y dbt build → programar a las 06:00 en zona elegida → activar notificaciones
```

Un job agrupa comandos, entorno y condiciones de ejecución.

**Resultado esperado** El job ejecuta comandos en su entorno a la hora configurada y registra estados; requiere acceso a la plataforma.

### Orquestación externa

**Clave** `orquestacion-externa`

**Definición** Airflow, Dagster y Prefect coordinan ingestión, transformaciones y publicación como tareas.

**Búsqueda** Orquestación externa · Encadenar tareas en un worker con proyecto y perfil preparados

**Para recordar** Propagar códigos de salida y no publicar reportes si falla dbt.

#### Encadenar tareas en un worker con proyecto y perfil preparados

```bash
dbt source freshness && dbt build
```

Propagar códigos de salida y no publicar reportes si falla dbt.

**Resultado esperado** build se ejecuta solo si freshness devuelve código 0; un orquestador puede ejecutar ambas como tareas dependientes.

### GitHub Actions

**Clave** `github-actions`

**Definición** Un workflow de CI puede preparar dependencias y ejecutar dbt con secretos y un target aislado.

**Búsqueda** GitHub Actions · Paso de workflow (dentro de jobs.<id>.steps)

**Para recordar** El runner necesita conectividad al warehouse y un perfil válido.

#### Paso de workflow (dentro de jobs.<id>.steps)

```yaml
- name: Validate dbt
  env:
    DBT_ENV_SECRET_PASSWORD: ${{ secrets.DBT_PASSWORD }}
  run: dbt deps && dbt build --target ci
```

El runner necesita conectividad al warehouse y un perfil válido.

**Resultado esperado** Paso exitoso solo si ambos comandos terminan con código 0; presupone checkout, Python, adaptador y perfil configurados.

### Docker y ejecución reproducible

**Clave** `docker-y-ejecucion-reproducible`

**Definición** Una imagen fija el entorno de ejecución y permite ejecutar dbt en workers consistentes.

**Búsqueda** Docker y ejecución reproducible · Preparar imagen (Dockerfile en raíz del proyecto)

**Para recordar** Montar perfiles/secretos al ejecutar, no incluirlos en la imagen.

#### Preparar imagen (Dockerfile en raíz del proyecto)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'
COPY . /app
ENTRYPOINT ["dbt"]
```

Montar perfiles/secretos al ejecutar, no incluirlos en la imagen.

**Resultado esperado** docker build -t tienda-dbt . crea una imagen; requiere .dockerignore para excluir perfiles, .venv, target, logs y secretos. Montar perfil y proporcionar conexión al ejecutar.

### Monitoreo y alertas

**Clave** `monitoreo-y-alertas`

**Definición** Registrar estado, duración, volumen y frescura permite detectar fallos o degradación.

**Búsqueda** Monitoreo y alertas · Diseñar una alerta

**Para recordar** Un build exitoso no demuestra que todos los KPI sean correctos.

#### Diseñar una alerta

```text
Si dbt build falla → registrar nodo y error → avisar a responsable → corregir → retry
```

Registrar estado, duración, volumen y frescura permite detectar fallos o degradación.

**Resultado esperado** El incidente queda asociado a una ejecución y un recurso; requiere sistema de alertas configurado.

### Recuperación y rollback

**Clave** `recuperacion-y-rollback`

**Definición** Reintentar resuelve fallos corregidos; revertir código y reconstruir puede restaurar lógica anterior.

**Búsqueda** Recuperación y rollback · Revertir un cambio aprobado (en rama de recuperación)

**Para recordar** Un git revert no restaura automáticamente tablas ni historia perdida.

#### Revertir un cambio aprobado (en rama de recuperación)

```bash
git revert HEAD
dbt build --target ci
```

Un git revert no restaura automáticamente tablas ni historia perdida.

**Resultado esperado** Se crea un commit inverso y se valida en CI; desplegar después de aprobar. Un incremental puede necesitar full-refresh y snapshots requieren tratamiento propio.


## Rendimiento y costos

**Clave** `rendimiento-y-costos`

### Definición

**Clave** `definicion`

**Definición** El costo de un proyecto depende del SQL ejecutado, volumen, frecuencia, materializaciones y capacidad del motor.

**Búsqueda** Rendimiento y costos · Examinar un plan (PostgreSQL después de build)

**Para recordar** Medir con planes y tiempos, no asumir que más modelos significa peor rendimiento.

#### Examinar un plan (PostgreSQL después de build)

```sql
explain select * from dbt_dev.fct_orders where customer_id=1;
```

Medir con planes y tiempos, no asumir que más modelos significa peor rendimiento.

**Resultado esperado** Un plan del motor; con cuatro filas puede elegir scan secuencial aunque exista un índice.

### Materialización y costo de lectura

**Clave** `materializacion-y-costo-de-lectura`

**Definición** Una vista difiere cálculo a consumidores; una tabla persiste resultados; un incremental limita reprocesamiento si se diseña correctamente.

**Búsqueda** Materialización y costo de lectura · Elegir materializaciones

**Para recordar** Elegir según costo de construcción, lectura y frescura requerida.

#### Elegir materializaciones

```text
stg_orders: view
fct_orders: table
inc_orders: incremental
```

Una vista difiere cálculo a consumidores.

**Resultado esperado** Staging ligero, hechos persistidos e incremental para actualizaciones; validar tiempos reales antes de cambiar.

### Índices, particiones y clustering

**Clave** `indices-particiones-y-clustering`

**Definición** Los mecanismos físicos dependen del motor: índices PostgreSQL, particiones/clustering BigQuery, clustering Snowflake, etc.

**Búsqueda** Índices, particiones y clustering · Crear índices con configuración PostgreSQL

**Para recordar** No copiar configuraciones entre adaptadores.

#### Crear índices con configuración PostgreSQL

```sql
{{ config(materialized='table', indexes=[{'columns':['customer_id']}]) }}
select * from {{ ref('fct_orders') }}
```

No copiar configuraciones entre adaptadores.

**Resultado esperado** La tabla lab_example tiene un índice en customer_id si el adaptador admite indexes; no garantiza mejora con pocos datos.

### EXPLAIN y filtros

**Clave** `explain-y-filtros`

**Definición** Los filtros y joins determinan qué datos examina el motor; el plan revela estrategias de acceso y estimaciones.

**Búsqueda** EXPLAIN y filtros · Filtrar por intervalo de fecha (PostgreSQL)

**Para recordar** Usar EXPLAIN ANALYZE con precaución: ejecuta la consulta.

#### Filtrar por intervalo de fecha (PostgreSQL)

```sql
explain select * from raw.orders where order_date >= date '2026-01-01' and order_date < date '2026-02-01';
```

Usar EXPLAIN ANALYZE con precaución: ejecuta la consulta.

**Resultado esperado** Plan del intervalo; ejecutar sin EXPLAIN devuelve cuatro pedidos, incluidos cancelados.

### Partial parsing y caché

**Clave** `partial-parsing-y-cache`

**Definición** dbt puede reutilizar información de análisis de ejecuciones anteriores para reducir tiempo de parse.

**Búsqueda** Partial parsing y caché · Forzar un parse completo

**Para recordar** No es caché de resultados SQL; invalidar si hay metadatos obsoletos.

#### Forzar un parse completo

```bash
dbt --no-partial-parse parse
```

No es caché de resultados SQL; invalidar si hay metadatos obsoletos.

**Resultado esperado** Se reconstruye la representación del proyecto sin reutilizar el parse parcial previo.

### Concurrencia

**Clave** `concurrencia`

**Definición** threads permite ejecutar nodos independientes simultáneamente; dependencias y límites del motor restringen la concurrencia.

**Búsqueda** Concurrencia · Comparar dos configuraciones

**Para recordar** Más threads pueden aumentar contención o costo.

#### Comparar dos configuraciones

```bash
dbt build --threads 1
dbt build --threads 4
```

Más threads pueden aumentar contención o costo.

**Resultado esperado** Mismos datos esperados; tiempos pueden variar, medir con run_results.json.


## Gobernanza y Mesh

**Clave** `gobernanza-y-mesh`

### Definición

**Clave** `definicion`

**Definición** La gobernanza establece responsables, interfaces y permisos para que modelos compartidos se usen con confianza.

**Búsqueda** Gobernanza y Mesh · Asignar propietario de un dominio (models/groups.yml)

**Para recordar** Access de dbt controla referencias en proyectos, no sustituye GRANT del warehouse.

#### Asignar propietario de un dominio (models/groups.yml)

```yaml
groups:
  - name: finance
    owner:
      name: Finance Analytics
      email: finance@example.com
```

Access de dbt controla referencias en proyectos, no sustituye GRANT del warehouse.

**Resultado esperado** El grupo finance queda disponible para asignar modelos; datos de contacto ficticios.

### Groups y ownership

**Clave** `groups-y-ownership`

**Definición** Un group agrupa modelos bajo un equipo responsable.

**Búsqueda** Groups y ownership · Asignar fct_orders a finanzas

**Para recordar** Declarar el grupo antes de asignarlo a un modelo.

#### Asignar fct_orders a finanzas

```yaml
models:
  - name: fct_orders
    config:
      group: finance
```

Declarar el grupo antes de asignarlo a un modelo.

**Resultado esperado** El manifest indica el grupo finance; requiere definirlo antes.

### Access: private, protected, public

**Clave** `access-private-protected-public`

**Definición** private restringe refs al grupo; protected permite refs dentro del proyecto/paquetes compatibles; public permite interfaces entre proyectos habilitados.

**Búsqueda** Access: private, protected, public · Publicar un contrato de consumo

**Para recordar** No confundir access con permisos SQL o seguridad de filas.

#### Publicar un contrato de consumo

```yaml
models:
  - name: fct_orders
    config:
      group: finance
      access: public
```

No confundir access con permisos SQL o seguridad de filas.

**Resultado esperado** El recurso puede exponerse como interfaz a consumidores autorizados; en Mesh requiere configuración adicional.

### Grants

**Clave** `grants`

**Definición** La configuración grants aplica privilegios a relaciones creadas por dbt en adaptadores compatibles.

**Búsqueda** Grants · Permitir SELECT a un rol existente (modelo temporal)

**Para recordar** Crear roles previamente y aplicar mínimo privilegio.

#### Permitir SELECT a un rol existente (modelo temporal)

```sql
{{ config(materialized='table', grants={'select':['report_reader']}) }}
select * from {{ ref('fct_orders') }}
```

Crear roles previamente y aplicar mínimo privilegio.

**Resultado esperado** report_reader obtiene SELECT sobre lab_example si existe y el usuario tiene permisos para otorgarlo.

### Model versions

**Clave** `model-versions`

**Definición** Permiten coexistir versiones de una interfaz y elegir latest_version para refs sin versión explícita.

**Búsqueda** Model versions · Versionar un modelo de laboratorio (models/versioned_orders.yml)

**Para recordar** Publicar cambios incompatibles como una nueva versión en vez de romper consumidores.

#### Versionar un modelo de laboratorio (models/versioned_orders.yml)

```yaml
models:
  - name: versioned_orders
    latest_version: 2
    versions:
      - v: 1
      - v: 2
```

Publicar cambios incompatibles como una nueva versión en vez de romper consumidores.

**Resultado esperado** Crear models/versioned_orders_v1.sql con select order_id from {{ ref('fct_orders') }} y _v2.sql con select order_id, amount from {{ ref('fct_orders') }}. ref('versioned_orders', version=1) devuelve una columna; sin versión usa v2.

### Deprecación

**Clave** `deprecacion`

**Definición** deprecation_date señala cuándo una versión dejará de ser una interfaz soportada.

**Búsqueda** Deprecación · Anunciar retiro de v1 (fragmento de versions)

**Para recordar** Avisar a consumidores y migrarlos antes de retirarla; no elimina automáticamente la relación.

#### Anunciar retiro de v1 (fragmento de versions)

```yaml
- v: 1
  deprecation_date: 2027-01-01 00:00:00.000000+00:00
```

Avisar a consumidores y migrarlos antes de retirarla; no elimina automáticamente la relación.

**Resultado esperado** dbt registra fecha y puede emitir avisos según proximidad/versión; mantener v2 definida.

### dbt Mesh y dependencias entre proyectos

**Clave** `dbt-mesh-y-dependencias-entre-proyectos`

**Definición** Mesh divide dominios en proyectos y permite consumir modelos públicos sin incorporar todo el código productor.

**Búsqueda** dbt Mesh y dependencias entre proyectos · Declarar proyecto productor (dependencies.yml del consumidor)

**Para recordar** Requiere plataforma, permisos, metadatos y plan compatibles.

#### Declarar proyecto productor (dependencies.yml del consumidor)

```yaml
projects:
  - name: finance_project
```

Requiere plataforma, permisos, metadatos y plan compatibles.

**Resultado esperado** El consumidor puede resolver interfaces públicas del productor si ambos están configurados en Mesh.

### Cross-project ref

**Clave** `cross-project-ref`

**Definición** ref con dos argumentos identifica proyecto/paquete y modelo.

**Búsqueda** Cross-project ref · Consumir hechos publicados (proyecto consumidor)

**Para recordar** Una dependencia de proyecto no es una dependencia de paquete instalada con dbt deps.

#### Consumir hechos publicados (proyecto consumidor)

```sql
select sum(amount) as revenue from {{ ref('finance_project','fct_orders') }}
```

Una dependencia de proyecto no es una dependencia de paquete instalada con dbt deps.

**Resultado esperado** 500 si el productor publica los datos base; requiere Mesh configurado y acceso al modelo.


## Extensibilidad e integraciones

**Clave** `extensibilidad-e-integraciones`

### Definición

**Clave** `definicion`

**Definición** dbt se integra con herramientas de ingestión, orquestación, calidad y consumo mediante modelos, artefactos, APIs y adaptadores.

**Búsqueda** Extensibilidad e integraciones · Integrar una tienda

**Para recordar** Separar responsabilidades: carga, transformación, validación y consumo.

#### Integrar una tienda

```text
Fivetran/Airbyte → raw → dbt → marts → Power BI/Tableau/Looker/Metabase
```

dbt se integra con herramientas de ingestión, orquestación, calidad y consumo mediante modelos, artefactos, APIs y adaptadores.

**Resultado esperado** Los dashboards consultan relaciones publicadas; dbt no realiza la extracción de APIs por defecto.

### dbtRunner e invoke()

**Clave** `dbtrunner-e-invoke`

**Definición** La API Python de Core permite invocar comandos dbt y examinar su resultado.

**Búsqueda** dbtRunner e invoke() · Ejecutar un build desde Python

**Para recordar** No ejecutar varias invocaciones concurrentes en el mismo proceso; usar procesos separados.

#### Ejecutar un build desde Python

```python
from dbt.cli.main import dbtRunner
result = dbtRunner().invoke(['build','--select','fct_orders'])
print(result.success)
if not result.success:
    raise SystemExit(1)
```

No ejecutar varias invocaciones concurrentes en el mismo proceso; usar procesos separados.

**Resultado esperado** True si el modelo y tests seleccionados se construyen; requiere proyecto, perfil y upstream disponibles.

### Dependencias explícitas y dinámicas

**Clave** `dependencias-explicitas-y-dinamicas`

**Definición** dbt normalmente detecta ref/source durante parse; una referencia escondida por un condicional puede requerir una dependencia explícita.

**Búsqueda** Dependencias explícitas y dinámicas · Registrar un padre aunque se use en una rama

**Para recordar** Usar comentario SQL, no comentario Jinja, para una referencia explícita.

#### Registrar un padre aunque se use en una rama

```sql
-- depends_on: {{ ref('stg_orders') }}
{% if execute %}
select count(*) as n from {{ ref('stg_orders') }}
{% else %}
select 0 as n
{% endif %}
```

Usar comentario SQL, no comentario Jinja, para una referencia explícita.

**Resultado esperado** El DAG registra stg_orders y la ejecución devuelve n=5.

### Adaptadores personalizados

**Clave** `adaptadores-personalizados`

**Definición** Un adaptador integra conexiones, relaciones, macros y estrategias de un motor con dbt.

**Búsqueda** Adaptadores personalizados · Diseñar integración de un motor nuevo

**Para recordar** No es lo mismo que escribir una macro SQL dentro de un proyecto.

#### Diseñar integración de un motor nuevo

```text
Implementar conexión → Relation/Column → macros y materializaciones → pruebas de adaptador
```

Un adaptador integra conexiones, relaciones, macros y estrategias de un motor con dbt.

**Resultado esperado** El motor puede aparecer como plugin solo tras implementar y distribuir el adaptador; ejemplo conceptual, no código ejecutable.

### Administrative, Discovery y Semantic Layer APIs

**Clave** `administrative-discovery-y-semantic-layer-apis`

**Definición** Las APIs de plataforma permiten administrar jobs, consultar metadatos y consumir métricas respectivamente.

**Búsqueda** Administrative, Discovery y Semantic Layer APIs · Consultar una ejecución mediante la API administrativa

**Para recordar** Usar tokens de alcance mínimo y endpoint regional correcto; no confundir con API Python de Core.

#### Consultar una ejecución mediante la API administrativa

```text
Obtener token autorizado → elegir base URL de cuenta → consultar run por ID con endpoint documentado
```

Las APIs de plataforma permiten administrar jobs, consultar metadatos y consumir métricas respectivamente.

**Resultado esperado** Se recibe metadata de ejecución si token, cuenta e ID son válidos; no requiere acceso directo al warehouse para consultar el estado.

### Observabilidad y telemetría

**Clave** `observabilidad-y-telemetria`

**Definición** Logs estructurados y artefactos permiten alimentar plataformas de observabilidad; OpenTelemetry puede integrar trazas donde exista soporte.

**Búsqueda** Observabilidad y telemetría · Guardar salida estructurada para un colector

**Para recordar** No asumir que todos los motores/exportadores emiten las mismas trazas.

#### Guardar salida estructurada para un colector

```bash
dbt --log-format json build > dbt-events.jsonl
```

No asumir que todos los motores/exportadores emiten las mismas trazas.

**Resultado esperado** Archivo de eventos de consola para análisis, sin garantía de formato idéntico entre versiones; configurar el colector por separado.

### Calidad externa y auditoría

**Clave** `calidad-externa-y-auditoria`

**Definición** Great Expectations y Elementary amplían validaciones/observabilidad; dbt-audit-helper facilita comparar versiones de modelos.

**Búsqueda** Calidad externa y auditoría · Comparar dos versiones sin paquete externo

**Para recordar** Comparar claves, grano y diferencias de filas antes de migrar una tabla.

#### Comparar dos versiones sin paquete externo

```sql
select order_id, amount from {{ ref('fct_orders') }}
except
select order_id, amount from {{ ref('int_completed_orders') }}
```

Comparar claves, grano y diferencias de filas antes de migrar una tabla.

**Resultado esperado** Cero filas con los modelos base; invertir EXCEPT para comprobar diferencias en ambos sentidos.

### SQLFluff y desarrollo

**Clave** `sqlfluff-y-desarrollo`

**Definición** SQLFluff analiza estilo SQL; el templater dbt puede resolver Jinja con el proyecto y adaptador configurados.

**Búsqueda** SQLFluff y desarrollo · Revisar SQL con templater dbt

**Para recordar** Lint no prueba reglas de negocio; ejecutar también dbt test.

#### Revisar SQL con templater dbt

```bash
python -m pip install sqlfluff sqlfluff-templater-dbt
sqlfluff lint models --dialect postgres --templater dbt
```

Lint no prueba reglas de negocio; ejecutar también dbt test.

**Resultado esperado** Se muestran infracciones de estilo/sintaxis según reglas y versión; no modifica archivos con lint.

## Fuentes

Referencias oficiales para verificar sintaxis, variantes por motor y versiones. Consultar el selector de versión de la documentación para Core 1.10 cuando se pruebe el laboratorio; las páginas de v1.12/v2 describen capacidades posteriores. Los fragmentos son adaptaciones editoriales sobre datos ficticios propios.

- [Instalación manual](https://docs.getdbt.com/guides/manual-install) y [PostgreSQL](https://docs.getdbt.com/docs/local/connect-data-platform/postgres-setup): instalación, perfil y conexiones.
- [Proyectos](https://docs.getdbt.com/docs/build/projects) y [referencia de configuraciones](https://docs.getdbt.com/reference/references-overview): archivos, recursos, precedencia y compatibilidad.
- [Sources](https://docs.getdbt.com/docs/build/sources), [seeds](https://docs.getdbt.com/docs/build/seeds) y [ref](https://docs.getdbt.com/reference/dbt-jinja-functions/ref): entradas y dependencias.
- [Materializaciones](https://docs.getdbt.com/docs/build/materializations), [modelos Python](https://docs.getdbt.com/docs/build/python-models), [buenas prácticas](https://docs.getdbt.com/best-practices): representación física y capas.
- [Comandos de dbt](https://docs.getdbt.com/reference/dbt-commands), [run](https://docs.getdbt.com/reference/commands/run), [build](https://docs.getdbt.com/reference/commands/build), [test](https://docs.getdbt.com/reference/commands/test): ejecución y efectos.
- [Jinja y contexto](https://docs.getdbt.com/reference/dbt-jinja-functions-context-variables), [execute](https://docs.getdbt.com/reference/dbt-jinja-functions/execute), [Jinja por archivo](https://docs.getdbt.com/reference/jinja-file-support): macros, compilación, contexto y adaptadores.
- [Data tests](https://docs.getdbt.com/docs/build/data-tests), [unit tests](https://docs.getdbt.com/docs/build/unit-tests), [contratos](https://docs.getdbt.com/docs/mesh/govern/model-contracts): pruebas y estructura.
- [Freshness](https://docs.getdbt.com/reference/resource-configs/freshness) y [source freshness](https://docs.getdbt.com/reference/commands/source): umbrales y resultados.
- [Selección de nodos](https://docs.getdbt.com/reference/node-selection/syntax), [métodos](https://docs.getdbt.com/reference/node-selection/methods), [defer](https://docs.getdbt.com/reference/node-selection/defer), [estado](https://docs.getdbt.com/reference/node-selection/state-selection): selectores y CI.
- [Incrementales](https://docs.getdbt.com/docs/build/incremental-models), [estrategias por adaptador](https://docs.getdbt.com/docs/build/incremental-strategy), [snapshots](https://docs.getdbt.com/docs/build/snapshots), [hard_deletes](https://docs.getdbt.com/reference/resource-configs/hard-deletes): procesamiento, actualizaciones e historial.
- [Documentación](https://docs.getdbt.com/docs/collaborate/documentation), [exposures](https://docs.getdbt.com/docs/build/exposures), [artefactos](https://docs.getdbt.com/reference/artifacts/dbt-artifacts): linaje y metadatos.
- [Paquetes](https://docs.getdbt.com/docs/build/packages), [dbt Hub](https://hub.getdbt.com/), [dbt-utils](https://github.com/dbt-labs/dbt-utils), [hooks](https://docs.getdbt.com/reference/resource-configs/pre-hook-post-hook): reutilización y extensiones.
- [MetricFlow](https://docs.getdbt.com/docs/build/about-metricflow), [referencia semántica](https://docs.getdbt.com/reference/semantic-layer-reference), [migración YAML](https://docs.getdbt.com/docs/build/latest-metrics-spec), [quickstart](https://docs.getdbt.com/guides/sl-qs): entidades, métricas, time spine y consumo; revisar versión clásica/nueva.
- [dbt State](https://docs.getdbt.com/docs/deploy/dbt-state-about), [orquestación basada en estado](https://docs.getdbt.com/docs/deploy/state-aware-setup), [despliegue](https://docs.getdbt.com/docs/deploy/deployments): plataforma, jobs y optimización.
- [Access](https://docs.getdbt.com/reference/resource-configs/access), [grants](https://docs.getdbt.com/reference/resource-configs/grants), [versiones de modelos](https://docs.getdbt.com/docs/mesh/govern/model-versions), [Mesh](https://docs.getdbt.com/docs/mesh/about-mesh): interfaces y gobernanza.
- [Invocaciones programáticas](https://docs.getdbt.com/reference/programmatic-invocations), [APIs de dbt](https://docs.getdbt.com/docs/dbt-cloud-apis/overview), [SQLFluff](https://docs.sqlfluff.com/): integraciones y ejecución programática.
