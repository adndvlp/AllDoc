# Apache Airflow

**Clave** `airflow`

**Área** Ingeniería de datos / Orquestación (ubicación propuesta; no consta en la guía).

**Resumen** Define, programa, ejecuta y supervisa flujos de trabajo de datos mediante Python.

**Alcance** Fundamentos, instalación, DAGs, tareas, programación temporal y por eventos, integraciones, configuración, ejecución dinámica, pipelines ETL/ELT, pruebas, observabilidad, seguridad, despliegue y extensiones. Incluye compatibilidad con Airflow 2 y conceptos avanzados de producción; no es un inventario exhaustivo de todos los providers.

**Entorno** Apache Airflow 3.1.7 y Python 3.11 como base reproducible. Se indican variantes de Airflow 2.10 y funcionalidades posteriores cuando corresponde. Los ejemplos requieren un entorno Airflow real; no se ejecutan con Python de navegador ni con el editor SQLite de AllDoc. Los resultados son esperados, no ejecuciones verificadas en un servidor Airflow.

## Datos compartidos

### Laboratorio local

Usa Linux, macOS o WSL2; para Windows nativo utiliza WSL2 o contenedores. En una terminal, crea un entorno aislado y una instalación de práctica (no producción):

```bash
python3.11 -m venv .venv
source .venv/bin/activate
export AIRFLOW_HOME="$HOME/airflow-alldoc"
V=3.1.7
C="https://raw.githubusercontent.com/apache/airflow/constraints-$V/constraints-3.11.txt"
pip install "apache-airflow==$V" --constraint "$C"
mkdir -p "$AIRFLOW_HOME/dags"
mkdir -p /tmp/alldoc_airflow
```

En la misma terminal ejecuta `airflow standalone`. Abre `http://localhost:8080` e inicia sesión con las credenciales indicadas por la instalación. SQLite y standalone son para aprendizaje. En otra terminal activa el mismo entorno y exporta el mismo `AIRFLOW_HOME`.

### Dataset de práctica: pedidos

```bash
cat > /tmp/alldoc_airflow/orders.csv <<'CSV'
order_id,customer_id,country,amount,status,order_date
101,1,MX,800,completed,2026-09-01
102,1,MX,300,completed,2026-09-01
103,2,ES,1200,completed,2026-09-02
104,3,MX,450,cancelled,2026-09-02
105,2,ES,700,completed,2026-09-03
CSV
```

Hay 5 pedidos, 4 completados por 3000, 2 clientes con compras completadas y 1 cancelación. MX genera 1100 y ES 1900 en ventas completadas. El archivo se usa solo para ejemplos locales; en workers distribuidos se necesita almacenamiento accesible para todos. Los nombres de países son códigos de dos letras.

### Convención de los ejemplos Python

Salvo indicación contraria, los fragmentos Python son **cuerpos de un DAG**: copia el encabezado siguiente en un archivo independiente de `dags/`, cambia `dag_id` por uno único y sustituye `pass` por el fragmento, respetando la indentación. Cada ficha es independiente. Los imports del encabezado están disponibles en esos fragmentos; los imports adicionales aparecen donde se necesitan. Los ejemplos que declaran su propio `DAG`, `@dag`, clases, callbacks o funciones de prueba se identifican como código completo o de nivel superior; no los anides dentro del DAG salvo cuando se indique. No ejecutes todos los ejemplos como un solo archivo.

```python
import csv
import logging
from datetime import timedelta
from pathlib import Path
import pendulum
from airflow.sdk import DAG, dag, task, task_group, TaskGroup, get_current_context, Variable, Connection, Asset, Param
from airflow.providers.standard.operators.empty import EmptyOperator
from airflow.providers.standard.operators.bash import BashOperator
from airflow.providers.standard.operators.python import PythonOperator

with DAG(
    dag_id="alldoc_ejemplo",
    start_date=pendulum.datetime(2026, 9, 1, tz="UTC"),
    schedule=None,
    catchup=False,
) as demo:
    pass
```

En ejemplos que dicen «cambia la configuración del DAG», sustituye el argumento del encabezado, no lo repitas dentro del cuerpo. Para un DAG que utiliza otro DAG, crea cada definición en su propio archivo con el ID indicado y actívalos. Para probar, activa el DAG en la UI y pulsa Trigger DAG; revisa las tareas en Grid y Logs. También puedes usar `airflow dags test alldoc_ejemplo` en el laboratorio. Los comandos shell se ejecutan en la terminal con el entorno activado, no dentro del archivo Python, salvo los comandos explícitos de BashOperator.

Las fichas de producción utilizan ejemplos de configuración o procedimientos en lugar de fingir que un servicio externo existe. Para integraciones instala el provider compatible con la versión base, manteniendo el pin de Airflow, por ejemplo `pip install "apache-airflow==3.1.7" apache-airflow-providers-postgres --constraint "$C"`. Consulta la versión del provider instalada con `airflow providers list`. Configura las conexiones y recursos indicados antes de probar; nunca copies secretos reales al código. Los ejemplos con `/tmp` no son válidos como transporte entre workers independientes.

## Orquestación y DAGs

**Clave** `orquestacion`

### Definición

**Clave** `definicion`

**Definición** Airflow coordina tareas con dependencias y condiciones de ejecución; delega el trabajo a Python, SQL u otros servicios.

**Búsqueda** Definición; Orquestación y DAGs; Coordinar extracción y reporte

**Para recordar** Airflow decide cuándo ejecutar y en qué orden, no sustituye al motor de procesamiento.

#### Coordinar extracción y reporte

```python
extraer = EmptyOperator(task_id="extraer")
reportar = EmptyOperator(task_id="reportar")
extraer >> reportar
```

La flecha define una dependencia, no transfiere datos.

**Resultado esperado** El grafo muestra extraer → reportar; son tareas vacías de demostración.

### DAG y aciclicidad

**Clave** `dag-y-aciclicidad`

**Definición** Un DAG representa tareas conectadas por dependencias dirigidas que no forman ciclos.

**Búsqueda** DAG y aciclicidad; Orquestación y DAGs; Representar un flujo de ventas

**Para recordar** Una tarea no puede depender de sí misma directa ni indirectamente.

#### Representar un flujo de ventas

```python
a = EmptyOperator(task_id="extract")
b = EmptyOperator(task_id="transform")
c = EmptyOperator(task_id="load")
a >> b >> c
```

Cada nodo puede representar un paso distinto de negocio.

**Resultado esperado** Tres nodos en secuencia en Graph.

### ETL y ELT

**Clave** `etl-y-elt`

**Definición** ETL transforma antes de cargar; ELT carga datos crudos y transforma en el destino.

**Búsqueda** ETL y ELT; Orquestación y DAGs; Comparar dos patrones

**Para recordar** El orden de las dependencias expresa el patrón.

#### Comparar dos patrones

```python
extract = EmptyOperator(task_id="extract")
transform = EmptyOperator(task_id="transform")
load = EmptyOperator(task_id="load")
extract >> load >> transform
```

Para ETL, coloca transform antes de load; los nodos son ilustrativos.

**Resultado esperado** El flujo corresponde a ELT.

### Procesamiento batch

**Clave** `procesamiento-batch`

**Definición** Procesa conjuntos delimitados de datos en ejecuciones independientes, en lugar de mantener un proceso de streaming continuo.

**Búsqueda** Procesamiento batch; Orquestación y DAGs; Procesar un día de pedidos

**Para recordar** Una ejecución debe tener una unidad de trabajo finita.

#### Procesar un día de pedidos

```python
@task
def batch():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        return sum(r["order_date"] == "2026-09-01" for r in csv.DictReader(f))
batch()
```

La fecha delimita un lote.

**Resultado esperado** El XCom de retorno vale 2.

## Instalación y entorno

**Clave** `instalacion`

### Definición

**Clave** `definicion`

**Definición** Airflow necesita un entorno Python, una base de metadatos y servicios de ejecución.

**Búsqueda** Definición; Instalación y entorno; Comprobar instalación

**Para recordar** Standalone es un laboratorio, no un despliegue de producción.

#### Comprobar instalación

```bash
airflow version
```

Comprueba la versión antes de copiar imports.

**Resultado esperado** Muestra 3.1.7 si se siguió la instalación.

### AIRFLOW_HOME y configuración

**Clave** `airflow-home-y-configuracion`

**Definición** AIRFLOW_HOME determina el directorio base del entorno; airflow.cfg y variables de entorno controlan su comportamiento.

**Búsqueda** AIRFLOW_HOME y configuración; Instalación y entorno; Localizar el directorio de DAGs

**Para recordar** Mantén el mismo AIRFLOW_HOME en todas las terminales.

#### Localizar el directorio de DAGs

```bash
airflow config get-value core dags_folder
```

El valor efectivo puede diferir de AIRFLOW_HOME/dags.

**Resultado esperado** Ruta del directorio dags del laboratorio.

### Standalone

**Clave** `standalone`

**Definición** Inicia los componentes necesarios de un entorno local en un solo comando.

**Búsqueda** Standalone; Instalación y entorno; Iniciar el laboratorio

**Para recordar** No lo expongas públicamente ni lo uses para cargas reales.

#### Iniciar el laboratorio

```bash
airflow standalone
```

La terminal muestra el estado del arranque.

**Resultado esperado** Servicios iniciados; UI accesible localmente si no hay conflictos de puerto.

### Providers y constraints

**Clave** `providers-y-constraints`

**Definición** Los providers aportan operadores, hooks y sensores para servicios específicos; constraints ayuda a fijar dependencias compatibles.

**Búsqueda** Providers y constraints; Instalación y entorno; Añadir soporte PostgreSQL

**Para recordar** Instala el provider sin actualizar Airflow accidentalmente.

**Nota** Requiere acceso a repositorios de paquetes.

#### Añadir soporte PostgreSQL

```bash
pip install "apache-airflow==3.1.7" apache-airflow-providers-postgres --constraint "$C"
airflow providers list
```

Usa la variable C de Datos compartidos.

**Resultado esperado** Postgres aparece en la lista si la instalación finaliza.

### Docker Compose

**Clave** `docker-compose`

**Definición** Ejecuta los componentes de un entorno de desarrollo en contenedores coordinados.

**Búsqueda** Docker Compose; Instalación y entorno; Consultar servicios del compose oficial

**Para recordar** El compose oficial de inicio rápido no es una configuración endurecida.

**Nota** Requiere Docker Compose y recursos suficientes.

#### Consultar servicios del compose oficial

```bash
docker compose ps
```

Descarga previamente el compose oficial de la versión, prepara .env, ejecuta airflow-init y levanta los servicios siguiendo su guía.

**Resultado esperado** Lista los contenedores y sus estados.

## Arquitectura y componentes

**Clave** `arquitectura`

### Definición

**Clave** `definicion`

**Definición** Los componentes de Airflow separan definición, planificación, ejecución, estado y acceso web.

**Búsqueda** Definición; Arquitectura y componentes; Seguir un pedido desde el grafo hasta su ejecución

**Para recordar** El scheduler decide; el executor coordina; los workers ejecutan.

#### Seguir un pedido desde el grafo hasta su ejecución

1. Activa un DAG de prueba.
2. Dispara una ejecución.
3. Abre Grid y Logs.

La UI lee estados persistidos y logs; no ejecuta directamente la lógica de negocio.

**Resultado esperado** Se observa un DAG Run y sus instancias de tarea.

### Scheduler y executor

**Clave** `scheduler-y-executor`

**Definición** El scheduler identifica tareas elegibles; el executor determina cómo se despachan a procesos o workers.

**Búsqueda** Scheduler y executor; Arquitectura y componentes; Identificar el executor configurado

**Para recordar** Una tarea scheduled no significa que esté running.

#### Identificar el executor configurado

```bash
airflow config get-value core executor
```

El resultado depende del entorno.

**Resultado esperado** Nombre del executor efectivo.

### DAG Processor y serialización

**Clave** `dag-processor-y-serializacion`

**Definición** El procesador importa los archivos de DAGs y genera representaciones que otros componentes pueden consultar.

**Búsqueda** DAG Processor y serialización; Arquitectura y componentes; Comprobar un DAG importado

**Para recordar** El código al nivel superior se ejecuta durante el parsing, no solo al lanzar una tarea.

#### Comprobar un DAG importado

```bash
airflow dags list
airflow dags list-import-errors
```

La importación no equivale a una ejecución de sus tareas.

**Resultado esperado** El DAG aparece y no tiene errores si su código es válido.

### API Server y Task Execution API

**Clave** `api-server-y-task-execution-api`

**Definición** Airflow 3 usa un servidor API para la UI y para servicios de ejecución; el Task SDK evita que las tareas dependan directamente de la base de metadatos.

**Búsqueda** API Server y Task Execution API; Arquitectura y componentes; Inspeccionar una ejecución

**Para recordar** Usa airflow.sdk y APIs públicas, no tablas internas.

#### Inspeccionar una ejecución

1. Abre Grid en la UI.
2. Abre una instancia y consulta su estado.

En Airflow 2 se denominaba webserver al componente web y la arquitectura era distinta.

**Resultado esperado** Se muestran estado y duración de esa instancia.

### Metadata Database

**Clave** `metadata-database`

**Definición** Conserva DAG Runs, estados de tareas, configuración y otros metadatos de orquestación.

**Búsqueda** Metadata Database; Arquitectura y componentes; Comprobar conectividad de metadatos

**Para recordar** No es tu data warehouse.

#### Comprobar conectividad de metadatos

```bash
airflow db check
```

No consulta los pedidos de negocio.

**Resultado esperado** Comprobación correcta si la base está accesible.

### Triggerer

**Clave** `triggerer`

**Definición** Gestiona esperas asíncronas de tareas diferibles y comunica eventos de reanudación.

**Búsqueda** Triggerer; Arquitectura y componentes; Observar una espera diferible

**Para recordar** Una tarea deferred puede liberar su worker mientras espera.

#### Observar una espera diferible

1. Configura un sensor compatible con deferrable=True.
2. Dispara el DAG antes de que exista su recurso.
3. Observa Grid y luego crea el recurso.

Se necesita un triggerer activo y un sensor compatible.

**Resultado esperado** La tarea puede pasar a deferred y reanudarse al cumplirse la condición.

## Definir un DAG

**Clave** `definir-dag`

### Definición

**Clave** `definicion`

**Definición** DAG() contiene las tareas, programación y parámetros que describen un flujo.

**Búsqueda** Definición; Definir un DAG; Crear un DAG manual completo

**Para recordar** El dag_id debe ser único dentro del entorno.

#### Crear un DAG manual completo

```python
from airflow.sdk import DAG
from airflow.providers.standard.operators.empty import EmptyOperator
import pendulum
with DAG("ventas_manual", start_date=pendulum.datetime(2026,9,1,tz="UTC"), schedule=None, catchup=False):
    EmptyOperator(task_id="inicio")
```

Guarda el bloque completo al nivel superior en su propio archivo.

**Resultado esperado** Aparece ventas_manual con una tarea y sin programación automática.

### @dag

**Clave** `dag`

**Definición** El decorador convierte una función que construye tareas en una fábrica de DAGs.

**Búsqueda** @dag; Definir un DAG; Crear un DAG con decorador

**Para recordar** Invoca la función decorada para crear el DAG.

#### Crear un DAG con decorador

```python
@dag(dag_id="ventas_decorador", schedule=None, start_date=pendulum.datetime(2026,9,1,tz="UTC"), catchup=False)
def ventas():
    EmptyOperator(task_id="inicio")
ventas()
```

Código de nivel superior después de los imports compartidos, fuera del with.

**Resultado esperado** Se registra ventas_decorador.

### Identificadores y tags

**Clave** `identificadores-y-tags`

**Definición** dag_id identifica el flujo, task_id identifica una tarea y tags permite clasificar DAGs.

**Búsqueda** Identificadores y tags; Definir un DAG; Etiquetar un flujo

**Para recordar** No confundas el nombre de una variable Python con el task_id.

#### Etiquetar un flujo

```python
# En el encabezado del DAG:
# tags=["ventas", "diario"], description="Reporte de ventas"
job = EmptyOperator(task_id="cargar_pedidos")
```

job solo es la variable Python que apunta a la tarea.

**Resultado esperado** La tarea se llama cargar_pedidos; al configurar tags aparecen filtros de catálogo.

### Default args

**Clave** `default-args`

**Definición** default_args aporta valores comunes a las tareas que no los sobrescriben.

**Búsqueda** Default args; Definir un DAG; Compartir una política de reintentos

**Para recordar** Un parámetro explícito de la tarea tiene prioridad.

#### Compartir una política de reintentos

```python
# En el encabezado del DAG:
# default_args={"retries": 2, "retry_delay": timedelta(minutes=5)}
a = EmptyOperator(task_id="a")
b = EmptyOperator(task_id="b", retries=0)
```

Los argumentos comentados deben añadirse al constructor DAG.

**Resultado esperado** a hereda dos reintentos; b no reintenta.

### Documentación del DAG y tareas

**Clave** `documentacion-del-dag-y-tareas`

**Definición** doc_md permite añadir documentación contextual; description resume el DAG.

**Búsqueda** Documentación del DAG y tareas; Definir un DAG; Documentar la carga

**Para recordar** Explica entradas, salidas y responsables junto al flujo.

#### Documentar la carga

```python
demo.doc_md = "# Ventas\nCarga de pedidos diarios"
EmptyOperator(task_id="load", doc_md="Valida y carga el lote")
```

doc_md admite Markdown.

**Resultado esperado** La documentación queda disponible en los detalles del DAG y de la tarea.

## Tareas y dependencias

**Clave** `tareas-dependencias`

### Definición

**Clave** `definicion`

**Definición** Una tarea es un paso definido en el DAG; una Task Instance es su ejecución en un DAG Run concreto.

**Búsqueda** Definición; Tareas y dependencias; Definir una unidad de trabajo

**Para recordar** La misma tarea puede tener muchas instancias históricas.

#### Definir una unidad de trabajo

```python
EmptyOperator(task_id="validar")
```

Dispara dos runs para observar dos instancias distintas.

**Resultado esperado** Cada ejecución manual crea una instancia de validar.

### Dependencias >> y <<

**Clave** `dependencias-y`

**Definición** Los operadores de desplazamiento declaran qué tareas deben preceder a otras.

**Búsqueda** Dependencias >> y <<; Tareas y dependencias; Encadenar pasos

**Para recordar** a >> b significa que a es upstream de b.

#### Encadenar pasos

```python
a = EmptyOperator(task_id="a")
b = EmptyOperator(task_id="b")
a >> b
```

b << a expresa la misma relación.

**Resultado esperado** b espera el éxito de a con la regla predeterminada.

### set_upstream y set_downstream

**Clave** `set-upstream-y-set-downstream`

**Definición** Métodos explícitos para declarar dependencias sin operadores simbólicos.

**Búsqueda** set_upstream y set_downstream; Tareas y dependencias; Declarar dependencias con métodos

**Para recordar** a.set_downstream(b) equivale a a >> b.

#### Declarar dependencias con métodos

```python
a = EmptyOperator(task_id="extraer")
b = EmptyOperator(task_id="cargar")
b.set_upstream(a)
```

El método se llama desde la tarea que espera a su antecedente.

**Resultado esperado** extraer → cargar.

### Fan-out y fan-in

**Clave** `fan-out-y-fan-in`

**Definición** Fan-out abre varias ramas; fan-in reúne las ramas antes de continuar.

**Búsqueda** Fan-out y fan-in; Tareas y dependencias; Validar dos fuentes antes de publicar

**Para recordar** Las ramas independientes pueden ejecutarse en paralelo si hay capacidad.

#### Validar dos fuentes antes de publicar

```python
inicio = EmptyOperator(task_id="inicio")
a = EmptyOperator(task_id="validar_mx")
b = EmptyOperator(task_id="validar_es")
fin = EmptyOperator(task_id="publicar")
inicio >> [a, b] >> fin
```

Una lista de tareas permite declarar las ramas a la vez.

**Resultado esperado** Publicar espera las dos validaciones.

### TaskGroup

**Clave** `taskgroup`

**Definición** Agrupa tareas visualmente y organiza sus identificadores sin crear un DAG independiente.

**Búsqueda** TaskGroup; Tareas y dependencias; Agrupar la preparación

**Para recordar** Un TaskGroup no es una unidad de ejecución aislada.

#### Agrupar la preparación

```python
with TaskGroup(group_id="preparacion") as prep:
    a = EmptyOperator(task_id="extraer")
    b = EmptyOperator(task_id="validar")
    a >> b
prep >> EmptyOperator(task_id="publicar")
```

El prefijo evita colisiones de nombres.

**Resultado esperado** El grafo contiene preparacion.extraer y preparacion.validar dentro del grupo.

## TaskFlow API

**Clave** `taskflow`

### Definición

**Clave** `definicion`

**Definición** @task transforma una función Python en una tarea y representa su retorno mediante XComArg.

**Búsqueda** Definición; TaskFlow API; Contar pedidos

**Para recordar** Llamar a la función decorada durante el parsing construye una tarea; no ejecuta su cuerpo.

#### Contar pedidos

```python
@task
def contar():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        return len(list(csv.DictReader(f)))
contar()
```

El archivo solo se abre en tiempo de ejecución.

**Resultado esperado** La tarea devuelve 5 al ejecutarse.

### Argumentos y dependencias implícitas

**Clave** `argumentos-y-dependencias-implicitas`

**Definición** Pasar el resultado de una tarea a otra establece la dependencia y resuelve el valor en ejecución.

**Búsqueda** Argumentos y dependencias implícitas; TaskFlow API; Calcular ticket medio

**Para recordar** Los argumentos TaskFlow conectan datos pequeños y orden de ejecución.

#### Calcular ticket medio

```python
@task
def total():
    return 3000
@task
def promedio(ventas, n):
    return ventas / n
promedio(total(), 4)
```

total() devuelve una referencia durante el parsing.

**Resultado esperado** promedio devuelve 750 después de total.

### Múltiples salidas

**Clave** `multiples-salidas`

**Definición** multiple_outputs=True publica las entradas de un diccionario con claves separadas en XCom.

**Búsqueda** Múltiples salidas; TaskFlow API; Separar ventas y pedidos

**Para recordar** Usa claves para consumir un resultado concreto.

#### Separar ventas y pedidos

```python
@task(multiple_outputs=True)
def resumen():
    return {"ventas": 3000, "pedidos": 4}
@task
def mostrar(n):
    print(n)
mostrar(resumen()["pedidos"])
```

La clave pedidos selecciona una salida.

**Resultado esperado** mostrar imprime 4.

### @task_group

**Clave** `task-group`

**Definición** El decorador permite construir grupos de tareas reutilizables.

**Búsqueda** @task_group; TaskFlow API; Reutilizar una validación

**Para recordar** Las funciones del grupo definen el grafo; sus tareas ejecutan el trabajo.

#### Reutilizar una validación

```python
@task_group(group_id="control")
def control():
    EmptyOperator(task_id="schema") >> EmptyOperator(task_id="filas")
control()
```

Usa group_id distintos al reutilizar el mismo diseño.

**Resultado esperado** Aparece el grupo control con dos tareas.

## Operators

**Clave** `operators`

### Definición

**Clave** `definicion`

**Definición** Un operator encapsula una acción que Airflow puede ejecutar como tarea.

**Búsqueda** Definición; Operators; Crear una tarea de comando

**Para recordar** Instanciar el operator crea una tarea; execute ocurre después.

#### Crear una tarea de comando

```python
BashOperator(task_id="saludo", bash_command="echo ventas")
```

El provider standard aporta operadores de uso general.

**Resultado esperado** El log contiene ventas.

### EmptyOperator

**Clave** `emptyoperator`

**Definición** Crea un nodo sin trabajo de negocio, útil para marcar puntos de unión.

**Búsqueda** EmptyOperator; Operators; Marcar el final del flujo

**Para recordar** No extrae ni transforma datos.

#### Marcar el final del flujo

```python
EmptyOperator(task_id="inicio") >> EmptyOperator(task_id="fin")
```

Sirve para estructurar el grafo.

**Resultado esperado** Dos tareas vacías completan el flujo.

### PythonOperator

**Clave** `pythonoperator`

**Definición** Ejecuta una función Python tradicional con argumentos opcionales.

**Búsqueda** PythonOperator; Operators; Calcular ingresos

**Para recordar** Entrega la función sin llamarla en python_callable.

#### Calcular ingresos

```python
def calcular(precio, cantidad):
    return precio * cantidad
PythonOperator(task_id="calcular", python_callable=calcular, op_kwargs={"precio": 25, "cantidad": 4})
```

op_kwargs se convierte en argumentos nombrados.

**Resultado esperado** El retorno esperado es 100.

### BashOperator y @task.bash

**Clave** `bashoperator-y-task-bash`

**Definición** Ejecutan un comando de shell; la variante decorada devuelve el comando a ejecutar.

**Búsqueda** BashOperator y @task.bash; Operators; Contar líneas del CSV

**Para recordar** Usa set -e si necesitas propagar fallos intermedios.

#### Contar líneas del CSV

```python
BashOperator(task_id="lineas", bash_command="set -e; wc -l < /tmp/alldoc_airflow/orders.csv")
```

El comando corre en el worker que tenga el archivo.

**Resultado esperado** El log muestra 6 líneas incluyendo el encabezado.

### SQLExecuteQueryOperator

**Clave** `sqlexecutequeryoperator`

**Definición** Ejecuta SQL contra una conexión configurada mediante el provider de base de datos.

**Búsqueda** SQLExecuteQueryOperator; Operators; Consultar un valor de prueba

**Para recordar** conn_id identifica la conexión; la consulta se ejecuta en el motor externo.

**Nota** Instala provider postgres y crea ventas_pg en Connections.

#### Consultar un valor de prueba

```python
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
SQLExecuteQueryOperator(task_id="consulta", conn_id="ventas_pg", sql="SELECT 2 + 3 AS total", do_xcom_push=True)
```

No necesita una tabla, pero sí conexión real.

**Resultado esperado** La consulta devuelve una fila con 5 si PostgreSQL está disponible.

### PythonVirtualenvOperator y ExternalPythonOperator

**Clave** `pythonvirtualenvoperator-y-externalpythonoperator`

**Definición** Permiten ejecutar una función con dependencias distintas del entorno principal, creando un entorno o usando uno existente.

**Búsqueda** PythonVirtualenvOperator y ExternalPythonOperator; Operators; Aislar una dependencia

**Para recordar** Importa dentro de la función las bibliotecas que necesita ese entorno.

**Nota** Requiere virtualenv y permisos de creación de entornos.

#### Aislar una dependencia

```python
from airflow.providers.standard.operators.python import PythonVirtualenvOperator
def version():
    import decimal
    print(decimal.Decimal("1.20"))
PythonVirtualenvOperator(task_id="aislado", python_callable=version, requirements=[], system_site_packages=False)
```

ExternalPythonOperator utiliza la ruta python de un entorno ya preparado.

**Resultado esperado** El log muestra 1.20 desde un entorno aislado.

### @task.bash

**Clave** `task-bash`

**Definición** El decorador convierte una función que devuelve un comando de shell en una tarea Bash.

**Búsqueda** @task.bash; Operators; Mostrar una región

**Para recordar** Devuelve el comando, no el resultado de ejecutarlo.

#### Mostrar una región

```python
@task.bash
def comando():
    return "echo MX"
comando()
```

La función construye el comando durante la ejecución.

**Resultado esperado** El log muestra MX.

### ExternalPythonOperator

**Clave** `externalpythonoperator`

**Definición** Usa un intérprete Python de un entorno previamente existente.

**Búsqueda** ExternalPythonOperator; Operators; Ejecutar un cálculo con otro intérprete

**Para recordar** El entorno externo debe existir en el worker.

#### Ejecutar un cálculo con otro intérprete

```python
from airflow.providers.standard.operators.python import ExternalPythonOperator
import sys
def calcular():
    print(2 + 3)
ExternalPythonOperator(task_id="externo", python=sys.executable, python_callable=calcular)
```

sys.executable usa el intérprete del laboratorio para probar la mecánica; sustituye la ruta por la de otro entorno para aislar dependencias.

**Resultado esperado** El log imprime 5.

## Hooks, Connections y secretos

**Clave** `connections-hooks`

### Definición

**Clave** `definicion`

**Definición** Una Connection describe cómo acceder a un servicio; un Hook proporciona métodos para interactuar con él.

**Búsqueda** Definición; Hooks, Connections y secretos; Consultar una conexión sin revelar contraseña

**Para recordar** El DAG usa conn_id y el hook obtiene las credenciales durante la ejecución.

#### Consultar una conexión sin revelar contraseña

```python
@task
def verificar():
    conn = Connection.get("ventas_pg")
    print(conn.conn_type)
verificar()
```

Crea ventas_pg con el tipo Postgres antes de ejecutar. No imprimas el objeto completo.

**Resultado esperado** Imprime postgres si existe la conexión de ejemplo.

### Crear una conexión

**Clave** `crear-una-conexion`

**Definición** Las conexiones se pueden registrar en la UI, CLI, variables de entorno o backends de secretos.

**Búsqueda** Crear una conexión; Hooks, Connections y secretos; Configurar PostgreSQL de laboratorio

**Para recordar** No guardes credenciales reales en los archivos DAG.

**Nota** Requiere PostgreSQL y provider postgres.

#### Configurar PostgreSQL de laboratorio

1. En Admin → Connections, añade ventas_pg.
2. Tipo Postgres, host y puerto de tu instancia, base, usuario y contraseña de prueba.
3. Guarda y ejecuta la consulta de prueba del grupo Operators.

La forma exacta de la UI depende del auth manager.

**Resultado esperado** La tarea conecta si la red y los permisos son correctos.

### PostgresHook

**Clave** `postgreshook`

**Definición** Expone métodos para ejecutar SQL o recuperar filas de PostgreSQL.

**Búsqueda** PostgresHook; Hooks, Connections y secretos; Recuperar un escalar

**Para recordar** Crea el hook dentro de la tarea.

**Nota** Requiere provider postgres.

#### Recuperar un escalar

```python
@task
def consultar():
    from airflow.providers.postgres.hooks.postgres import PostgresHook
    return PostgresHook(postgres_conn_id="ventas_pg").get_first("SELECT 42")[0]
consultar()
```

get_first recupera la primera fila.

**Resultado esperado** Retorna 42 si la conexión está configurada.

### AIRFLOW_CONN_*

**Clave** `airflow-conn`

**Definición** Una variable AIRFLOW_CONN_<ID> puede resolver una conexión sin crearla en la base de metadatos.

**Búsqueda** AIRFLOW_CONN_*; Hooks, Connections y secretos; Definir una conexión local de prueba

**Para recordar** El identificador se escribe en mayúsculas en el nombre de la variable.

**Nota** No uses credenciales reales en el historial de shell.

#### Definir una conexión local de prueba

```bash
export AIRFLOW_CONN_LOCAL_FS='{"conn_type":"fs","extra":{"path":"/tmp/alldoc_airflow"}}'
```

Define la variable antes de arrancar los procesos que la necesitan.

**Resultado esperado** FileSensor con fs_conn_id=local_fs puede resolver esa ruta.

### Secrets Backends

**Clave** `secrets-backends`

**Definición** Resuelven conexiones y variables desde un sistema externo, como Vault o un servicio de secretos cloud.

**Búsqueda** Secrets Backends; Hooks, Connections y secretos; Migrar una conexión a un gestor de secretos

**Para recordar** El DAG conserva el conn_id aunque cambie el lugar donde vive el secreto.

**Nota** Requiere un gestor de secretos real.

#### Migrar una conexión a un gestor de secretos

1. Instala el provider del gestor.
2. Configura [secrets] backend y backend_kwargs según su documentación.
3. Registra ventas_pg bajo la ruta definida por el backend.
4. Ejecuta SELECT 42 mediante PostgresHook.

Valida los permisos y la precedencia de resolución en el entorno.

**Resultado esperado** La tarea funciona sin una contraseña escrita en el DAG.

## Programación temporal

**Clave** `schedule`

### Definición

**Clave** `definicion`

**Definición** schedule define cuándo se crean ejecuciones automáticas del DAG.

**Búsqueda** Definición; Programación temporal; Crear un flujo diario

**Para recordar** schedule=None permite ejecución manual sin calendario automático.

#### Crear un flujo diario

```python
# En el encabezado del DAG: schedule="@daily"
EmptyOperator(task_id="reporte")
```

El ejemplo requiere cambiar el encabezado.

**Resultado esperado** Con el DAG activo, se crean runs diarios según el calendario y la fecha inicial.

### Cron y presets

**Clave** `cron-y-presets`

**Definición** Cron expresa un calendario de cinco campos; presets como @daily y @hourly representan frecuencias comunes.

**Búsqueda** Cron y presets; Programación temporal; Programar un reporte a las ocho

**Para recordar** Cron usa minuto, hora, día del mes, mes y día de la semana.

#### Programar un reporte a las ocho

```python
# En el encabezado del DAG: schedule="0 8 * * *"
EmptyOperator(task_id="reporte")
```

No significa ejecutar inmediatamente al activar.

**Resultado esperado** Se programa a las 08:00 de la zona horaria del DAG.

### Intervalos timedelta

**Clave** `intervalos-timedelta`

**Definición** Un timedelta representa una duración entre intervalos, no necesariamente una hora fija del calendario.

**Búsqueda** Intervalos timedelta; Programación temporal; Programar cada seis horas

**Para recordar** Usa cron si necesitas una hora civil específica.

#### Programar cada seis horas

```python
# En el encabezado del DAG: schedule=timedelta(hours=6)
EmptyOperator(task_id="actualizar")
```

El punto de partida y el timetable determinan la alineación.

**Resultado esperado** Se crean ejecuciones según intervalos de seis horas.

### start_date y end_date

**Clave** `start-date-y-end-date`

**Definición** Delimitan la elegibilidad temporal del calendario; start_date no es una instrucción para ejecutar una tarea a esa hora exacta.

**Búsqueda** start_date y end_date; Programación temporal; Acotar un proceso temporal

**Para recordar** Usa fechas fijas y conscientes de zona horaria.

#### Acotar un proceso temporal

```python
# En el encabezado del DAG:
# start_date=pendulum.datetime(2026,9,1,tz="UTC"),
# end_date=pendulum.datetime(2026,9,30,tz="UTC"),
# schedule="@daily"
EmptyOperator(task_id="reporte")
```

La hora efectiva depende del intervalo y del scheduler.

**Resultado esperado** El calendario queda acotado al periodo configurado.

### Zonas horarias

**Clave** `zonas-horarias`

**Definición** Pendulum permite especificar la zona horaria del calendario.

**Búsqueda** Zonas horarias; Programación temporal; Programar a hora mexicana

**Para recordar** Distingue la hora local de la UTC que usa internamente Airflow.

#### Programar a hora mexicana

```python
# En el encabezado:
# start_date=pendulum.datetime(2026,9,1,tz="America/Mexico_City"),
# schedule="0 8 * * *"
EmptyOperator(task_id="reporte")
```

La UI puede mostrar otra zona horaria.

**Resultado esperado** El calendario usa las 08:00 de Ciudad de México.

### Timetables

**Clave** `timetables`

**Definición** Un timetable calcula las fechas e intervalos de los runs; permite calendarios no representables con cron.

**Búsqueda** Timetables; Programación temporal; Programar por intervalo explícito de cron

**Para recordar** Distingue calendario de ejecución e intervalo de datos.

#### Programar por intervalo explícito de cron

```python
from airflow.timetables.interval import CronDataIntervalTimetable
# En el encabezado (importar antes del with):
# schedule=CronDataIntervalTimetable("0 0 * * *", timezone="UTC")
EmptyOperator(task_id="diario")
```

No todos los schedules cron de Airflow 3 usan el mismo tipo de timetable; este lo fija explícitamente.

**Resultado esperado** Cada run programado representa un día completo y se habilita al cerrar su intervalo.

## DAG Runs, intervalos y backfill

**Clave** `dag-runs`

### Definición

**Clave** `definicion`

**Definición** Un DAG Run es una ejecución concreta del flujo, manual, programada o iniciada por un evento.

**Búsqueda** Definición; DAG Runs, intervalos y backfill; Crear una ejecución manual

**Para recordar** Identifica un run por dag_id y run_id, no por la hora a la que lo miras.

#### Crear una ejecución manual

```bash
airflow dags trigger alldoc_ejemplo
```

Usa el ID real del archivo y activa el DAG.

**Resultado esperado** Se crea un run nuevo si el DAG existe; el scheduler gestiona sus tareas.

### logical_date e intervalo de datos

**Clave** `logical-date-e-intervalo-de-datos`

**Definición** logical_date representa la referencia temporal lógica del run; data_interval_start y data_interval_end delimitan el lote cuando existen.

**Búsqueda** logical_date e intervalo de datos; DAG Runs, intervalos y backfill; Mostrar el intervalo de un run diario

**Para recordar** No uses la hora actual como sustituto del intervalo.

#### Mostrar el intervalo de un run diario

```python
@task
def intervalo():
    ctx = get_current_context()
    print(ctx.get("logical_date"), ctx.get("data_interval_start"), ctx.get("data_interval_end"))
intervalo()
```

Usa el timetable de la ficha anterior; runs manuales o por assets pueden no tener intervalo o fecha lógica.

**Resultado esperado** En un run de CronDataIntervalTimetable para 1 de septiembre se espera [2026-09-01, 2026-09-02) UTC.

### Catchup

**Clave** `catchup`

**Definición** Controla si el scheduler genera ejecuciones de intervalos pasados que faltan.

**Búsqueda** Catchup; DAG Runs, intervalos y backfill; Recuperar días omitidos

**Para recordar** catchup=False no elimina runs existentes ni impide backfills manuales.

#### Recuperar días omitidos

```python
# En el encabezado: schedule="@daily", catchup=True
EmptyOperator(task_id="carga")
```

Prueba con un periodo corto para evitar cientos de runs.

**Resultado esperado** Al activar un calendario pasado se crean los runs elegibles pendientes, según capacidad y timetable.

### Backfill

**Clave** `backfill`

**Definición** Crea ejecuciones históricas para un rango de fechas de un DAG con calendario temporal.

**Búsqueda** Backfill; DAG Runs, intervalos y backfill; Simular tres días de carga

**Para recordar** Revisa el rango y política de reprocesamiento antes de lanzar.

**Nota** Airflow 2 usa airflow dags backfill y flags diferentes.

#### Simular tres días de carga

```bash
airflow backfill create --dag-id ventas_diarias --from-date 2026-09-01 --to-date 2026-09-03 --reprocess-behavior none --dry-run
```

Crea previamente ventas_diarias con schedule diario y fecha inicial anterior al rango; quita --dry-run solo al confirmar.

**Resultado esperado** Lista las fechas candidatas sin crear los runs.

### Reprocesamiento y clearing

**Clave** `reprocesamiento-y-clearing`

**Definición** Backfill crea runs según una política; clearing reinicia el estado de instancias existentes para que puedan volver a ejecutarse.

**Búsqueda** Reprocesamiento y clearing; DAG Runs, intervalos y backfill; Reejecutar solo la validación

**Para recordar** No confundas reintentar una tarea con crear un run nuevo.

#### Reejecutar solo la validación

1. Abre Grid y el run fallido.
2. Selecciona la tarea validar.
3. Pulsa Clear y revisa las opciones antes de confirmar.

Las opciones upstream/downstream amplían el alcance.

**Resultado esperado** La instancia queda disponible para reejecución, sin crear por sí misma un nuevo run.

## XCom y almacenamiento de resultados

**Clave** `xcom`

### Definición

**Clave** `definicion`

**Definición** XCom intercambia valores pequeños y metadatos entre tareas de un run.

**Búsqueda** Definición; XCom y almacenamiento de resultados; Pasar la cantidad de pedidos

**Para recordar** No uses XCom para mover DataFrames grandes ni archivos completos.

#### Pasar la cantidad de pedidos

```python
@task
def contar():
    return 5
@task
def reportar(n):
    print(f"Pedidos: {n}")
reportar(contar())
```

TaskFlow publica y recupera automáticamente el retorno.

**Resultado esperado** El log imprime Pedidos: 5.

### xcom_push y xcom_pull

**Clave** `xcom-push-y-xcom-pull`

**Definición** Permiten publicar y recuperar valores con claves explícitas desde el contexto de una tarea.

**Búsqueda** xcom_push y xcom_pull; XCom y almacenamiento de resultados; Compartir un identificador de lote

**Para recordar** Las claves pertenecen a la tarea y ejecución correspondientes.

#### Compartir un identificador de lote

```python
@task
def producir():
    get_current_context()["ti"].xcom_push(key="lote", value="2026-09-01")
@task
def consumir():
    ti = get_current_context()["ti"]
    print(ti.xcom_pull(task_ids="producir", key="lote"))
producir() >> consumir()
```

Declara también la dependencia al usar push/pull explícito.

**Resultado esperado** consumir imprime 2026-09-01.

### .output y XComArg

**Clave** `output-y-xcomarg`

**Definición** .output de un operator representa el XCom de retorno; XComArg permite referenciarlo antes de ejecutarse.

**Búsqueda** .output y XComArg; XCom y almacenamiento de resultados; Combinar operator clásico y TaskFlow

**Para recordar** Pasa la referencia, no intentes convertirla en valor durante parsing.

#### Combinar operator clásico y TaskFlow

```python
def obtener():
    return 4
a = PythonOperator(task_id="obtener", python_callable=obtener)
@task
def duplicar(n):
    return n * 2
duplicar(a.output)
```

El vínculo entre tareas se crea por la referencia al retorno.

**Resultado esperado** duplicar retorna 8.

### Almacenamiento compartido

**Clave** `almacenamiento-compartido`

**Definición** Para resultados grandes, almacena datos fuera de XCom y pasa solo URI, clave o conteo.

**Búsqueda** Almacenamiento compartido; XCom y almacenamiento de resultados; Pasar la ruta de un reporte local

**Para recordar** Una ruta local solo funciona si el consumidor puede acceder al mismo archivo.

#### Pasar la ruta de un reporte local

```python
@task
def generar():
    p = Path("/tmp/alldoc_airflow/reporte.txt")
    p.write_text("ventas=3000")
    return str(p)
@task
def leer(ruta):
    print(Path(ruta).read_text())
leer(generar())
```

En producción usa una clave por run en object storage y no una ruta fija compartida.

**Resultado esperado** Imprime ventas=3000 en el laboratorio local.

### Object Storage XCom Backend

**Clave** `object-storage-xcom-backend`

**Definición** Permite guardar XCom que supera un umbral en almacenamiento de objetos y mantener una referencia en la base de metadatos.

**Búsqueda** Object Storage XCom Backend; XCom y almacenamiento de resultados; Configurar almacenamiento híbrido

**Para recordar** Configura el backend, la conexión y políticas de retención antes de enviar datos.

**Nota** Requiere common-io, amazon, conexión mi_s3 y bucket real; sustituye nombres.

#### Configurar almacenamiento híbrido

```text
AIRFLOW__CORE__XCOM_BACKEND=airflow.providers.common.io.xcom.backend.XComObjectStorageBackend
AIRFLOW__COMMON_IO__XCOM_OBJECTSTORAGE_PATH=s3://mi_s3@bucket-de-prueba/xcom
AIRFLOW__COMMON_IO__XCOM_OBJECTSTORAGE_THRESHOLD=1048576
```

Son variables de configuración para los componentes, no código de una tarea.

**Resultado esperado** Los valores serializados mayores al umbral se almacenan externamente si el backend y el acceso funcionan.

### Serialización

**Clave** `serializacion`

**Definición** Los valores compartidos deben poder serializarse y reconstruirse por Airflow; tipos simples son los más portables.

**Búsqueda** Serialización; XCom y almacenamiento de resultados; Retornar metadatos simples

**Para recordar** Prefiere listas, diccionarios y escalares.

#### Retornar metadatos simples

```python
@task
def meta():
    return {"filas": 5, "archivo": "orders.csv"}
meta()
```

Evita retornar conexiones abiertas, cursores o archivos.

**Resultado esperado** XCom contiene los metadatos del lote.

## Variables, Params y contexto

**Clave** `configuracion-tareas`

### Definición

**Clave** `definicion`

**Definición** Variables contienen configuración global; Params describen entradas de un run; el contexto ofrece metadatos de ejecución.

**Búsqueda** Definición; Variables, Params y contexto; Leer un umbral de negocio

**Para recordar** No uses Variables para transportar resultados entre tareas.

#### Leer un umbral de negocio

```python
@task
def umbral():
    return int(Variable.get("min_pedidos", default="2"))
umbral()
```

La lectura ocurre durante la tarea.

**Resultado esperado** Devuelve 2 si no se configuró la variable.

### Variables y entorno

**Clave** `variables-y-entorno`

**Definición** AIRFLOW_VAR_<KEY> permite definir un valor sin guardarlo mediante UI.

**Búsqueda** Variables y entorno; Variables, Params y contexto; Cambiar el umbral

**Para recordar** La variable debe estar disponible en el proceso que la resuelve.

#### Cambiar el umbral

```bash
export AIRFLOW_VAR_MIN_PEDIDOS=3
```

Reinicia el entorno si cambias variables de procesos existentes.

**Resultado esperado** El ejemplo anterior retorna 3 si el proceso tiene la variable y no existe una fuente de mayor prioridad.

### Params y validación

**Clave** `params-y-validacion`

**Definición** Param permite definir valores predeterminados y restricciones JSON Schema para entradas del DAG.

**Búsqueda** Params y validación; Variables, Params y contexto; Validar un límite mínimo

**Para recordar** Usa Params para configurar un run sin editar código.

#### Validar un límite mínimo

```python
# En el encabezado: params={"limite": Param(2, type="integer", minimum=1)}
@task
def mostrar():
    print(get_current_context()["params"]["limite"])
mostrar()
```

Activa el formulario de trigger para probar un valor válido.

**Resultado esperado** El valor predeterminado es 2; un valor inválido como 0 se rechaza al validar parámetros.

### dag_run.conf

**Clave** `dag-run-conf`

**Definición** Contiene configuración aportada al disparar una ejecución; no sustituye automáticamente la validación de Params.

**Búsqueda** dag_run.conf; Variables, Params y contexto; Recibir un país manualmente

**Para recordar** Valida valores externos antes de utilizarlos.

#### Recibir un país manualmente

```python
@task
def configurar():
    conf = get_current_context()["dag_run"].conf or {}
    pais = conf.get("pais", "MX")
    if pais not in {"MX", "ES"}:
        raise ValueError("País inválido")
    print(pais)
configurar()
```

Dispara mediante UI o CLI con ese JSON.

**Resultado esperado** Con conf={"pais":"ES"} imprime ES; sin configuración imprime MX.

### get_current_context

**Clave** `get-current-context`

**Definición** Devuelve el contexto de ejecución de una tarea.

**Búsqueda** get_current_context; Variables, Params y contexto; Identificar la instancia de ejecución

**Para recordar** No lo llames al nivel superior del archivo DAG.

#### Identificar la instancia de ejecución

```python
@task
def identificar():
    ctx = get_current_context()
    print(ctx["run_id"], ctx["ti"].task_id)
identificar()
```

Los IDs dependen de la ejecución concreta.

**Resultado esperado** El log contiene el run_id real y el task_id identificar.

## Templates Jinja y macros

**Clave** `templates`

### Definición

**Clave** `definicion`

**Definición** Airflow renderiza campos templados con valores del contexto mediante Jinja.

**Búsqueda** Definición; Templates Jinja y macros; Imprimir el identificador del run

**Para recordar** No todos los parámetros de un operator son templated fields.

#### Imprimir el identificador del run

```python
BashOperator(task_id="run", bash_command="echo $RUN_ID", env={"RUN_ID": "{{ run_id }}"})
```

env es un campo templado de BashOperator; pasa datos externos por variables, no interpolándolos en comandos.

**Resultado esperado** El log muestra el identificador de la ejecución.

### Intervalos, ds y ts

**Clave** `intervalos-ds-y-ts`

**Definición** ds y ts formatean la fecha lógica cuando existe; para filtrar datos usa los límites del intervalo.

**Búsqueda** Intervalos, ds y ts; Templates Jinja y macros; Mostrar una fecha lógica

**Para recordar** Una fecha lógica no es necesariamente la fecha real de ejecución.

#### Mostrar una fecha lógica

```python
BashOperator(task_id="fecha", bash_command="echo $FECHA", env={"FECHA": "{{ ds }}"})
```

Prueba con un run programado que tenga fecha lógica.

**Resultado esperado** En un run con fecha lógica 2026-09-01, muestra 2026-09-01.

### Macros

**Clave** `macros`

**Definición** macros contiene utilidades disponibles durante el renderizado Jinja.

**Búsqueda** Macros; Templates Jinja y macros; Calcular la fecha anterior

**Para recordar** Las macros operan sobre valores del contexto, no sobre filas de tu base.

#### Calcular la fecha anterior

```python
BashOperator(task_id="ayer", bash_command="echo $DIA", env={"DIA": "{{ macros.ds_add(ds, -1) }}"})
```

Requiere un run con ds definido.

**Resultado esperado** Para ds=2026-09-01 muestra 2026-08-31.

### Renderizado y tipos

**Clave** `renderizado-y-tipos`

**Definición** render_template_as_native_obj permite conservar tipos nativos en campos templados cuando corresponda.

**Búsqueda** Renderizado y tipos; Templates Jinja y macros; Recibir un entero en PythonOperator

**Para recordar** El resultado de una plantilla puede ser texto o un objeto según configuración.

#### Recibir un entero en PythonOperator

```python
# En el encabezado: render_template_as_native_obj=True
def ver(valor):
    print(type(valor).__name__, valor)
PythonOperator(task_id="tipo", python_callable=ver, op_kwargs={"valor": "{{ 2 + 3 }}"})
```

Sin renderizado nativo, ese campo se renderiza normalmente como texto.

**Resultado esperado** El log muestra int 5.

## Sensores y esperas

**Clave** `sensors`

### Definición

**Clave** `definicion`

**Definición** Un sensor espera hasta que una condición externa se cumpla o se alcance su límite de espera.

**Búsqueda** Definición; Sensores y esperas; Esperar una señal local

**Para recordar** Usa sensores para disponibilidad, no para procesar todo el dataset.

#### Esperar una señal local

```python
from airflow.providers.standard.sensors.python import PythonSensor
PythonSensor(task_id="listo", python_callable=lambda: Path("/tmp/alldoc_airflow/orders.csv").exists(), poke_interval=5, timeout=60, mode="reschedule")
```

Si no existe, espera hasta que aparezca o expire.

**Resultado esperado** Con el archivo compartido presente, el sensor finaliza correctamente.

### FileSensor

**Clave** `filesensor`

**Definición** Espera que exista un archivo o patrón en el filesystem configurado.

**Búsqueda** FileSensor; Sensores y esperas; Esperar el CSV de pedidos

**Para recordar** La ruta se evalúa desde el entorno que ejecuta el sensor o trigger.

#### Esperar el CSV de pedidos

```python
from airflow.providers.standard.sensors.filesystem import FileSensor
FileSensor(task_id="archivo", fs_conn_id="local_fs", filepath="orders.csv", poke_interval=5, timeout=60)
```

Configura local_fs como se explica en Connections.

**Resultado esperado** Success si existe orders.csv en la ruta configurada.

### HttpSensor

**Clave** `httpsensor`

**Definición** Consulta un endpoint HTTP hasta recibir una respuesta que cumpla una condición.

**Búsqueda** HttpSensor; Sensores y esperas; Esperar un servicio saludable

**Para recordar** El estado de HTTP y la condición de negocio no son necesariamente lo mismo.

#### Esperar un servicio saludable

```python
from airflow.providers.http.sensors.http import HttpSensor
HttpSensor(task_id="api_lista", http_conn_id="api_demo", endpoint="health", response_check=lambda r: r.status_code == 200, poke_interval=10, timeout=60)
```

Requiere provider http y conexión api_demo a un servicio que exponga /health.

**Resultado esperado** Success al recibir HTTP 200 del endpoint.

### SqlSensor

**Clave** `sqlsensor`

**Definición** Ejecuta una consulta periódicamente y evalúa la condición devuelta.

**Búsqueda** SqlSensor; Sensores y esperas; Esperar una tabla con datos

**Para recordar** La consulta debe ser de lectura, ligera y devolver una condición verificable.

#### Esperar una tabla con datos

```python
from airflow.providers.common.sql.sensors.sql import SqlSensor
SqlSensor(task_id="datos", conn_id="ventas_pg", sql="SELECT COUNT(*) FROM orders", poke_interval=10, timeout=60, mode="reschedule")
```

Requiere una tabla orders en PostgreSQL; el CSV por sí solo no la crea.

**Resultado esperado** Success cuando el conteo es distinto de cero.

### Poke y reschedule

**Clave** `poke-y-reschedule`

**Definición** poke conserva el slot mientras espera; reschedule libera el slot entre comprobaciones.

**Búsqueda** Poke y reschedule; Sensores y esperas; Liberar capacidad durante la espera

**Para recordar** Usa reschedule para esperas largas con comprobaciones espaciadas.

#### Liberar capacidad durante la espera

```python
from airflow.providers.standard.sensors.python import PythonSensor
PythonSensor(task_id="esperar", python_callable=lambda: False, mode="reschedule", poke_interval=30, timeout=90)
```

Este ejemplo falla intencionalmente.

**Resultado esperado** La tarea alterna espera y comprobación hasta fallar por timeout.

### Deferrable operators

**Clave** `deferrable-operators`

**Definición** Delegan la espera a un trigger asíncrono; cuando hay un evento la tarea vuelve a ser elegible para ejecución.

**Búsqueda** Deferrable operators; Sensores y esperas; Diferir una espera de archivo

**Para recordar** No todas las clases aceptan deferrable=True.

#### Diferir una espera de archivo

```python
from airflow.providers.standard.sensors.filesystem import FileSensor
FileSensor(task_id="espera", fs_conn_id="local_fs", filepath="ready.flag", deferrable=True, poke_interval=5, timeout=120)
```

Crea el archivo desde otra terminal con touch /tmp/alldoc_airflow/ready.flag. Requiere triggerer activo.

**Resultado esperado** Si falta ready.flag, puede observarse deferred; al crearlo la tarea continúa.

## Control de ejecución y recuperación

**Clave** `control-ejecucion`

### Definición

**Clave** `definicion`

**Definición** Airflow decide el estado de cada instancia según resultado, dependencias, política de reintentos y límites de tiempo.

**Búsqueda** Definición; Control de ejecución y recuperación; Provocar un fallo controlado

**Para recordar** Una excepción no capturada marca un intento como fallido.

#### Provocar un fallo controlado

```python
@task(retries=0)
def validar():
    raise ValueError("Falta columna amount")
validar()
```

El error se registra en Logs.

**Resultado esperado** La tarea y el run de una sola tarea quedan failed.

### Retries y retry_delay

**Clave** `retries-y-retry-delay`

**Definición** retries indica intentos adicionales después del primero; retry_delay fija la espera base.

**Búsqueda** Retries y retry_delay; Control de ejecución y recuperación; Reintentar una conexión fallida

**Para recordar** Un reintento repite el cuerpo de la tarea, incluidos efectos secundarios.

#### Reintentar una conexión fallida

```python
@task(retries=2, retry_delay=timedelta(seconds=10))
def conectar():
    raise ConnectionError("Servicio no disponible")
conectar()
```

Es un fallo deliberado para observar up_for_retry.

**Resultado esperado** Hasta tres intentos en total; finalmente failed.

### Retry exponential backoff

**Clave** `retry-exponential-backoff`

**Definición** Aumenta la espera entre reintentos para no saturar un servicio que está fallando.

**Búsqueda** Retry exponential backoff; Control de ejecución y recuperación; Espaciar los reintentos

**Para recordar** Define un límite de espera apropiado.

#### Espaciar los reintentos

```python
@task(retries=3, retry_delay=timedelta(seconds=10), retry_exponential_backoff=True, max_retry_delay=timedelta(minutes=1))
def consultar():
    raise ConnectionError("Temporal")
consultar()
```

No asumas que las esperas son exactamente 10, 20 y 40 segundos; existe variación.

**Resultado esperado** Se observan esperas calculadas entre intentos con límite de un minuto.

### Execution timeout

**Clave** `execution-timeout`

**Definición** Limita la duración de cada intento de una tarea.

**Búsqueda** Execution timeout; Control de ejecución y recuperación; Interrumpir una tarea lenta

**Para recordar** No equivale al timeout total de un sensor ni al deadline de un DAG.

#### Interrumpir una tarea lenta

```python
@task(execution_timeout=timedelta(seconds=2), retries=0)
def lenta():
    import time
    time.sleep(10)
lenta()
```

Ejemplo deliberado de timeout.

**Resultado esperado** El intento falla por exceder el límite configurado.

### Depends on past

**Clave** `depends-on-past`

**Definición** Exige que la instancia anterior de la misma tarea cumpla la condición histórica requerida.

**Búsqueda** Depends on past; Control de ejecución y recuperación; Evitar saltar una carga histórica

**Para recordar** No es una dependencia hacia otra tarea del mismo run.

#### Evitar saltar una carga histórica

```python
# En el encabezado: schedule="@daily", catchup=True
EmptyOperator(task_id="cargar", depends_on_past=True)
```

Para observarlo sustituye EmptyOperator por una tarea que falle en un día controlado.

**Resultado esperado** Si falla la instancia anterior, la siguiente puede quedar bloqueada.

### Estados de Task Instance

**Clave** `estados-de-task-instance`

**Definición** scheduled, queued, running, success, failed, skipped, upstream_failed, up_for_retry, deferred y up_for_reschedule describen fases diferentes.

**Búsqueda** Estados de Task Instance; Control de ejecución y recuperación; Observar un antecedente fallido

**Para recordar** Distingue un fallo propio de un fallo de un antecedente.

#### Observar un antecedente fallido

```python
@task(retries=0)
def falla():
    raise ValueError("inválido")
falla() >> EmptyOperator(task_id="despues")
```

Revisa ambos estados en Grid.

**Resultado esperado** falla queda failed; despues queda upstream_failed con la regla predeterminada.

## Trigger rules y ramas

**Clave** `trigger-rules`

### Definición

**Clave** `definicion`

**Definición** trigger_rule determina qué estados de los antecedentes directos permiten ejecutar una tarea.

**Búsqueda** Definición; Trigger rules y ramas; Exigir dos validaciones correctas

**Para recordar** all_success es la regla predeterminada.

#### Exigir dos validaciones correctas

```python
a = EmptyOperator(task_id="a")
b = EmptyOperator(task_id="b")
[a, b] >> EmptyOperator(task_id="publicar", trigger_rule="all_success")
```

Las reglas se aplican a los antecedentes directos.

**Resultado esperado** publicar se ejecuta si a y b terminan correctamente.

### All done y one failed

**Clave** `all-done-y-one-failed`

**Definición** all_done espera a que terminen todos los antecedentes; one_failed permite reaccionar ante un fallo sin esperar a todos.

**Búsqueda** All done y one failed; Trigger rules y ramas; Registrar el final incluso con error

**Para recordar** No uses all_done para publicar datos cuya validación falló.

#### Registrar el final incluso con error

```python
@task(retries=0)
def falla():
    raise ValueError("error")
falla() >> EmptyOperator(task_id="registrar", trigger_rule="all_done")
```

Un nodo hoja exitoso con all_done puede ocultar el fallo del DAG Run; aplica el patrón watcher cuando corresponda.

**Resultado esperado** registrar se ejecuta aunque falla esté failed.

### One success

**Clave** `one-success`

**Definición** one_success permite continuar si al menos un antecedente termina correctamente.

**Búsqueda** One success; Trigger rules y ramas; Continuar tras una fuente exitosa

**Para recordar** No garantiza que el resto de antecedentes haya terminado.

#### Continuar tras una fuente exitosa

```python
a = EmptyOperator(task_id="fuente_a")
b = EmptyOperator(task_id="fuente_b")
[a,b] >> EmptyOperator(task_id="continuar", trigger_rule="one_success")
```

Úsalo solo si no necesitas resultados de todas las ramas.

**Resultado esperado** continuar puede comenzar al completarse la primera fuente.

### Branching

**Clave** `branching`

**Definición** Una tarea de ramificación selecciona qué identificadores de tareas seguir; las ramas no elegidas se omiten.

**Búsqueda** Branching; Trigger rules y ramas; Elegir reporte nacional

**Para recordar** Después de un branch la unión suele necesitar una regla distinta de all_success.

#### Elegir reporte nacional

```python
@task.branch
def elegir():
    return "mexico"
m = EmptyOperator(task_id="mexico")
e = EmptyOperator(task_id="espana")
elegir() >> [m,e]
```

También existe BranchPythonOperator para código clásico.

**Resultado esperado** mexico se ejecuta; espana queda skipped.

### Unir ramas

**Clave** `unir-ramas`

**Definición** none_failed_min_one_success permite converger cuando no hubo fallos y al menos una rama se ejecutó con éxito.

**Búsqueda** Unir ramas; Trigger rules y ramas; Publicar después de una decisión

**Para recordar** Las ramas skipped no bloquean esta regla.

#### Publicar después de una decisión

```python
@task.branch
def elegir():
    return "mx"
a = EmptyOperator(task_id="mx")
b = EmptyOperator(task_id="es")
fin = EmptyOperator(task_id="fin", trigger_rule="none_failed_min_one_success")
elegir() >> [a,b] >> fin
```

La unión no exige que ambas ramas tengan éxito.

**Resultado esperado** mx y fin terminan success; es queda skipped.

### ShortCircuitOperator

**Clave** `shortcircuitoperator`

**Definición** Omite tareas posteriores cuando una condición devuelve falso.

**Búsqueda** ShortCircuitOperator; Trigger rules y ramas; Omitir publicación si no hay filas

**Para recordar** Sirve para detener un camino sin considerarlo un error de ejecución.

#### Omitir publicación si no hay filas

```python
from airflow.providers.standard.operators.python import ShortCircuitOperator
a = ShortCircuitOperator(task_id="hay_datos", python_callable=lambda: False)
a >> EmptyOperator(task_id="publicar")
```

También existe @task.short_circuit; ignore_downstream_trigger_rules controla alcance del salto.

**Resultado esperado** hay_datos termina success; publicar queda skipped.

### LatestOnlyOperator

**Clave** `latestonlyoperator`

**Definición** Omite tareas dependientes en ejecuciones programadas que no son la más reciente según su lógica temporal.

**Búsqueda** LatestOnlyOperator; Trigger rules y ramas; Evitar enviar reportes históricos

**Para recordar** Úsalo para acciones que no deben repetirse en runs históricos.

#### Evitar enviar reportes históricos

```python
from airflow.providers.standard.operators.latest_only import LatestOnlyOperator
# En el encabezado: schedule="@daily", catchup=True
LatestOnlyOperator(task_id="latest") >> EmptyOperator(task_id="notificar")
```

Los runs manuales no se comportan igual que los programados.

**Resultado esperado** En runs históricos no recientes, notificar puede quedar skipped.

### Setup y teardown

**Clave** `setup-y-teardown`

**Definición** Marcan tareas de preparación y limpieza para gestionar recursos de una ejecución.

**Búsqueda** Setup y teardown; Trigger rules y ramas; Representar crear, usar y liberar recurso

**Para recordar** La limpieza debe poder ejecutarse aunque falle el trabajo, si la preparación tuvo éxito.

#### Representar crear, usar y liberar recurso

```python
s = EmptyOperator(task_id="crear").as_setup()
w = EmptyOperator(task_id="trabajo")
t = EmptyOperator(task_id="liberar").as_teardown(setups=s)
s >> w >> t
```

Son nodos ilustrativos; para recursos reales usa operadores adecuados y limpieza idempotente.

**Resultado esperado** Airflow identifica crear como setup y liberar como teardown.

### Watcher pattern

**Clave** `watcher-pattern`

**Definición** Una tarea hoja con one_failed y fallo explícito permite conservar el fallo del run cuando hay tareas de limpieza con all_done.

**Búsqueda** Watcher pattern; Trigger rules y ramas; Propagar un fallo aunque termine la limpieza

**Para recordar** Conecta el watcher a todas las tareas cuyo fallo deba detectar.

#### Propagar un fallo aunque termine la limpieza

```python
@task(retries=0)
def trabajo():
    raise ValueError("error")
@task(trigger_rule="one_failed", retries=0)
def watcher():
    raise RuntimeError("Pipeline fallido")
a = trabajo()
b = EmptyOperator(task_id="limpiar", trigger_rule="all_done")
a >> b
[a,b] >> watcher()
```

El watcher protege contra el estado engañoso de las hojas.

**Resultado esperado** limpiar termina success y watcher failed; el DAG Run falla.

## Callbacks, notificaciones y alertas

**Clave** `alertas`

### Definición

**Clave** `definicion`

**Definición** Los callbacks reaccionan a eventos de ejecución, como fallos y reintentos; los notifiers permiten reutilizar integraciones de alertas.

**Búsqueda** Definición; Callbacks, notificaciones y alertas; Registrar un fallo

**Para recordar** No confundas un callback con una tarea del grafo.

#### Registrar un fallo

```python
def avisar(context):
    logging.error("Falló %s", context["task_instance"].task_id)
@task(on_failure_callback=avisar, retries=0)
def cargar():
    raise RuntimeError("fallo de prueba")
cargar()
```

Los errores del callback se buscan en logs del componente correspondiente; cambios manuales de estado no disparan todos los callbacks.

**Resultado esperado** Se invoca avisar al fallar la tarea durante ejecución.

### Callbacks de éxito y reintento

**Clave** `callbacks-de-exito-y-reintento`

**Definición** on_success_callback y on_retry_callback reaccionan a resultados distintos.

**Búsqueda** Callbacks de éxito y reintento; Callbacks, notificaciones y alertas; Registrar éxito

**Para recordar** Un reintento no es todavía el fallo definitivo.

#### Registrar éxito

```python
def ok(context):
    logging.info("Éxito: %s", context["task_instance"].task_id)
EmptyOperator(task_id="validar", on_success_callback=ok)
```

El callback no tiene nodo propio.

**Resultado esperado** Se genera un mensaje de éxito al terminar la tarea.

### Notifiers

**Clave** `notifiers`

**Definición** Encapsulan la entrega de mensajes a un destino, como Slack o correo, mediante una integración.

**Búsqueda** Notifiers; Callbacks, notificaciones y alertas; Configurar alertas de Slack

**Para recordar** No incluyas tokens en el DAG.

#### Configurar alertas de Slack

1. Instala el provider slack compatible.
2. Crea una conexión Slack de prueba.
3. Usa su notifier documentado como on_failure_callback.
4. Ejecuta una tarea que lance una excepción.

Es un procedimiento condicionado a un servicio externo real.

**Resultado esperado** Se entrega una alerta al canal configurado si la integración tiene permisos.

### Deadline Alerts y SLA

**Clave** `deadline-alerts-y-sla`

**Definición** Deadline Alerts permite alertar cuando un run supera un umbral relativo a una referencia temporal; SLA era la característica histórica de Airflow 2.

**Búsqueda** Deadline Alerts y SLA; Callbacks, notificaciones y alertas; Alertar por un run que tarda demasiado

**Para recordar** Una alerta no equivale necesariamente a cancelar tareas.

#### Alertar por un run que tarda demasiado

1. En Airflow 3.1+, configura DeadlineAlert con una referencia, un intervalo y callback compatibles con la versión.
2. Prueba un DAG cuya tarea tarde más que el intervalo.
3. Observa la invocación del callback y el estado del run.

API experimental desde 3.1; usa la guía versionada de Deadline Alerts. No reutilices sla de Airflow 2.

**Resultado esperado** Se dispara una alerta al exceder el umbral si el componente está operativo.

## Dynamic DAG Generation

**Clave** `dag-generacion`

### Definición

**Clave** `definicion`

**Definición** Genera estructuras de DAG durante el parsing a partir de configuración conocida antes de ejecutar.

**Búsqueda** Definición; Dynamic DAG Generation; Generar tareas por país

**Para recordar** Usa orden estable y evita consultas de red durante el parsing.

#### Generar tareas por país

```python
for pais in sorted(["MX", "ES"]):
    EmptyOperator(task_id=f"cargar_{pais.lower()}")
```

No es dynamic task mapping: la cantidad ya se conoce al construir el grafo.

**Resultado esperado** Aparecen cargar_es y cargar_mx desde el momento de importación.

### DAG factories

**Clave** `dag-factories`

**Definición** Una fábrica genera DAGs con una estructura reutilizable y parámetros propios.

**Búsqueda** DAG factories; Dynamic DAG Generation; Crear dos flujos independientes

**Para recordar** Registra IDs únicos y genera la misma estructura para la misma configuración.

#### Crear dos flujos independientes

```python
def fabrica(pais):
    with DAG(f"ventas_{pais.lower()}", schedule=None, start_date=pendulum.datetime(2026,9,1,tz="UTC"), catchup=False) as d:
        EmptyOperator(task_id="procesar")
    return d
for pais in ["MX", "ES"]:
    globals()[f"ventas_{pais.lower()}"] = fabrica(pais)
```

Código de nivel superior, fuera del encabezado with; no hay lecturas externas.

**Resultado esperado** Se registran ventas_mx y ventas_es.

### Configuración declarativa

**Clave** `configuracion-declarativa`

**Definición** Una lista, JSON o YAML local puede representar parámetros de DAGs sin duplicar código.

**Búsqueda** Configuración declarativa; Dynamic DAG Generation; Generar nodos desde configuración

**Para recordar** Valida la configuración y no la consultes en una API durante parsing.

#### Generar nodos desde configuración

```python
config = [{"pais": "MX", "activo": True}, {"pais": "ES", "activo": False}]
for item in config:
    if item["activo"]:
        EmptyOperator(task_id=f"procesar_{item['pais'].lower()}")
```

La misma idea puede utilizar un archivo local versionado junto al DAG.

**Resultado esperado** Solo se crea procesar_mx.

## Dynamic Task Mapping

**Clave** `task-mapping`

### Definición

**Clave** `definicion`

**Definición** Dynamic Task Mapping crea instancias de una tarea durante la ejecución a partir de valores obtenidos en ese run.

**Búsqueda** Definición; Dynamic Task Mapping; Procesar dos países

**Para recordar** expand define los elementos a procesar; el scheduler expande la tarea.

#### Procesar dos países

```python
@task
def procesar(pais):
    print(pais)
procesar.expand(pais=["MX", "ES"])
```

El orden de ejecución entre instancias no está garantizado.

**Resultado esperado** Dos instancias mapeadas imprimen MX y ES.

### expand con resultado upstream

**Clave** `expand-con-resultado-upstream`

**Definición** Una tarea puede devolver una lista que determine el número de instancias de otra tarea.

**Búsqueda** expand con resultado upstream; Dynamic Task Mapping; Descubrir lotes durante ejecución

**Para recordar** Usa una lista o diccionario serializable de tamaño controlado.

#### Descubrir lotes durante ejecución

```python
@task
def descubrir():
    return ["2026-09-01", "2026-09-02"]
@task
def procesar(dia):
    print(dia)
procesar.expand(dia=descubrir())
```

Con una lista vacía la tarea mapeada queda skipped.

**Resultado esperado** El scheduler crea dos instancias cuando descubrir termina.

### partial y expand

**Clave** `partial-y-expand`

**Definición** partial fija argumentos que no cambian; expand asigna los que varían por instancia.

**Búsqueda** partial y expand; Dynamic Task Mapping; Usar el mismo umbral para cada país

**Para recordar** Los argumentos del operator como task_id van en partial.

#### Usar el mismo umbral para cada país

```python
@task
def validar(pais, minimo):
    print(pais, minimo)
validar.partial(minimo=2).expand(pais=["MX", "ES"])
```

Un argumento fijo no se convierte en otro eje de expansión.

**Resultado esperado** Dos instancias imprimen su país y 2.

### expand_kwargs

**Clave** `expand-kwargs`

**Definición** Expande una lista de diccionarios; cada diccionario aporta un conjunto de argumentos para una instancia.

**Búsqueda** expand_kwargs; Dynamic Task Mapping; Configurar dos lotes distintos

**Para recordar** Las claves deben coincidir con los nombres de parámetros.

#### Configurar dos lotes distintos

```python
@task
def cargar(pais, dia):
    print(pais, dia)
cargar.expand_kwargs([{"pais":"MX", "dia":"2026-09-01"}, {"pais":"ES", "dia":"2026-09-02"}])
```

Evita combinaciones cartesianas accidentales de dos listas independientes.

**Resultado esperado** Dos instancias, una por diccionario.

### Map, zip y concat

**Clave** `map-zip-y-concat`

**Definición** Los XComArg admiten transformaciones previas al mapping: map aplica una función, zip empareja y concat une secuencias.

**Búsqueda** Map, zip y concat; Dynamic Task Mapping; Emparejar países y fechas

**Para recordar** zip sin valor de relleno termina en la secuencia más corta.

#### Emparejar países y fechas

```python
@task
def paises():
    return ["MX", "ES"]
@task
def fechas():
    return ["2026-09-01", "2026-09-02"]
@task
def ejecutar(par):
    print(par[0], par[1])
ejecutar.expand(par=paises().zip(fechas()))
```

Para map usa una función Python normal; concat conserva elementos de las secuencias en orden.

**Resultado esperado** Se procesan los pares MX/01 y ES/02.

### Map-reduce

**Clave** `map-reduce`

**Definición** Una tarea posterior puede reunir los resultados de todas las instancias mapeadas.

**Búsqueda** Map-reduce; Dynamic Task Mapping; Sumar importes procesados

**Para recordar** Los resultados pueden llegar como secuencia lazy; evita materializar grandes volúmenes.

#### Sumar importes procesados

```python
@task
def doble(n):
    return n * 2
@task
def sumar(valores):
    return sum(valores)
sumar(doble.expand(n=[2,3,4]))
```

La tarea reductora depende del conjunto de instancias.

**Resultado esperado** El retorno final es 18.

### Mapped TaskGroups

**Clave** `mapped-taskgroups`

**Definición** Un grupo de tareas puede expandirse para ejecutar varias etapas por cada entrada.

**Búsqueda** Mapped TaskGroups; Dynamic Task Mapping; Validar y procesar por país

**Para recordar** Cada instancia del grupo mantiene sus dependencias internas.

#### Validar y procesar por país

```python
@task
def validar(pais):
    return pais.lower()
@task
def publicar(pais):
    print(pais)
@task_group
def flujo(pais):
    publicar(validar(pais))
flujo.expand(pais=["MX", "ES"])
```

No uses if sobre el argumento mapeado durante la construcción del grupo.

**Resultado esperado** Cada país tiene validación y publicación; se imprimen mx y es.

### map y concat

**Clave** `map-y-concat`

**Definición** map transforma valores antes de expandir; concat permite combinar secuencias de XComArg.

**Búsqueda** map y concat; Dynamic Task Mapping; Normalizar y combinar códigos de país

**Para recordar** La función de map no es una tarea decorada.

#### Normalizar y combinar códigos de país

```python
@task
def a():
    return ["mx"]
@task
def b():
    return ["es"]
def mayuscula(x):
    return x.upper()
@task
def ver(pais):
    print(pais)
ver.expand(pais=a().concat(b()).map(mayuscula))
```

El mapping usa las referencias a los resultados de a y b.

**Resultado esperado** Dos instancias imprimen MX y ES.

## Assets y dependencias entre DAGs

**Clave** `assets`

### Definición

**Clave** `definicion`

**Definición** Un Asset identifica un recurso de datos; un evento de actualización puede programar DAGs consumidores.

**Búsqueda** Definición; Assets y dependencias entre DAGs; Declarar producción y consumo

**Para recordar** Asset no almacena el contenido de los datos: representa su identidad y eventos.

#### Declarar producción y consumo

```python
ventas = Asset("alldoc://ventas/pedidos")
# En el DAG productor, schedule=None:
EmptyOperator(task_id="publicar", outlets=[ventas])
# En otro archivo consumidor: schedule=[ventas] en su constructor DAG.
```

En ambos archivos declara el mismo Asset antes del constructor; EmptyOperator simula la publicación.

**Resultado esperado** Un evento exitoso del productor habilita el consumidor activo.

### Inlets, outlets y metadatos

**Clave** `inlets-outlets-y-metadatos`

**Definición** outlets declara qué assets actualiza una tarea; inlets permite consultar metadatos de entradas.

**Búsqueda** Inlets, outlets y metadatos; Assets y dependencias entre DAGs; Adjuntar conteo al evento

**Para recordar** Solo declara éxito del asset después de que el dato esté realmente disponible.

#### Adjuntar conteo al evento

```python
ventas = Asset("alldoc://ventas/pedidos")
@task(outlets=[ventas])
def publicar():
    ctx = get_current_context()
    ctx["outlet_events"][ventas].extra = {"row_count": 5}
publicar()
```

El ejemplo simula la publicación; el CSV de laboratorio contiene cinco filas.

**Resultado esperado** El evento incluye row_count=5 si la tarea termina success.

### Condiciones de assets

**Clave** `condiciones-de-assets`

**Definición** Un calendario puede exigir actualizaciones de varios assets mediante AND o aceptar cualquiera mediante OR.

**Búsqueda** Condiciones de assets; Assets y dependencias entre DAGs; Esperar dos fuentes

**Para recordar** Un evento de asset no garantiza por sí mismo la calidad del dato.

#### Esperar dos fuentes

```python
# Nivel superior, antes del with:
# a = Asset("alldoc://ventas/mx")
# b = Asset("alldoc://ventas/es")
# schedule=(a & b) en el consumidor
EmptyOperator(task_id="combinar")
```

Crea productores independientes con outlets para cada asset. Con a | b basta cualquiera.

**Resultado esperado** El consumidor queda elegible cuando ambas fuentes tienen eventos requeridos.

### AssetAlias

**Clave** `assetalias`

**Definición** Permite declarar una salida cuyo asset concreto se resuelve en tiempo de ejecución.

**Búsqueda** AssetAlias; Assets y dependencias entre DAGs; Publicar un asset elegido dinámicamente

**Para recordar** La asociación se establece al emitir un evento para el alias.

#### Publicar un asset elegido dinámicamente

```python
from airflow.sdk import AssetAlias
alias = AssetAlias("ventas-dinamicas")
@task(outlets=[alias])
def publicar():
    ctx = get_current_context()
    ctx["outlet_events"][alias].add(Asset("alldoc://ventas/mx"))
publicar()
```

Un consumidor puede declarar el mismo AssetAlias en su schedule.

**Resultado esperado** Se registra una asociación del alias con el asset MX al publicar.

### AssetWatcher y eventos externos

**Clave** `assetwatcher-y-eventos-externos`

**Definición** Un watcher conecta un asset con un trigger compatible con eventos externos, por ejemplo una cola de mensajes.

**Búsqueda** AssetWatcher y eventos externos; Assets y dependencias entre DAGs; Disparar un consumidor por mensaje

**Para recordar** Usa triggers de eventos adecuados, no comprobaciones de un estado que permanezca verdadero indefinidamente.

#### Disparar un consumidor por mensaje

1. Configura una cola y un provider con trigger de eventos compatible.
2. Declara un Asset con watchers=[AssetWatcher(...)] según el provider.
3. Usa el asset como schedule del consumidor y publica un mensaje.

Requiere triggerer y servicio externo; los argumentos dependen del provider.

**Resultado esperado** Se crea un evento y puede programarse el consumidor si está activo.

### Calendario combinado

**Clave** `calendario-combinado`

**Definición** AssetOrTimeSchedule permite que un flujo responda a eventos de assets y a un calendario temporal.

**Búsqueda** Calendario combinado; Assets y dependencias entre DAGs; Combinar evento con revisión diaria

**Para recordar** Diseña la carga para tolerar ambos tipos de run.

#### Combinar evento con revisión diaria

1. Declara un asset de pedidos.
2. Configura AssetOrTimeSchedule con un timetable diario y la condición del asset.
3. Activa el consumidor y publica un evento fuera del horario diario.

Consulta la firma versionada de AssetOrTimeSchedule; no supongas que ambos runs tienen el mismo intervalo.

**Resultado esperado** El DAG puede ejecutarse por el calendario o por actualización del asset.

### Asset partitioning

**Clave** `asset-partitioning`

**Definición** Permite representar unidades concretas de datos, como días, dentro de un asset en versiones que lo soportan.

**Búsqueda** Asset partitioning; Assets y dependencias entre DAGs; Consultar una carga particionada

**Para recordar** Una partición de asset no es lo mismo que una instancia mapeada de tarea.

#### Consultar una carga particionada

1. En una versión con soporte de asset partitions, define una partición diaria según su guía.
2. Publica una actualización de una fecha.
3. Inspecciona los eventos y el run consumidor.

Concepto posterior a la base 3.1.7; consulta documentación 3.4 y su disponibilidad.

**Resultado esperado** El consumidor puede identificar la partición afectada según la configuración.

### TriggerDagRunOperator

**Clave** `triggerdagrunoperator`

**Definición** Inicia otro DAG explícitamente y puede transmitir configuración.

**Búsqueda** TriggerDagRunOperator; Assets y dependencias entre DAGs; Lanzar un reporte dependiente

**Para recordar** El DAG destino debe existir; iniciar no significa esperar su finalización.

#### Lanzar un reporte dependiente

```python
from airflow.providers.standard.operators.trigger_dagrun import TriggerDagRunOperator
TriggerDagRunOperator(task_id="disparar", trigger_dag_id="ventas_manual", conf={"pais":"MX"}, wait_for_completion=False)
```

Crea antes ventas_manual de la ficha DAG; actívalo para que ejecute sus tareas.

**Resultado esperado** Se crea un run en ventas_manual si el DAG destino existe.

### ExternalTaskSensor

**Clave** `externaltasksensor`

**Definición** Espera una ejecución o tarea de otro DAG asociada a una fecha lógica compatible.

**Búsqueda** ExternalTaskSensor; Assets y dependencias entre DAGs; Esperar una carga diaria

**Para recordar** Alinea los calendarios de productor y consumidor.

#### Esperar una carga diaria

```python
from airflow.providers.standard.sensors.external_task import ExternalTaskSensor
ExternalTaskSensor(task_id="esperar_carga", external_dag_id="ventas_diarias", external_task_id="carga", timeout=600, mode="reschedule")
```

Crea ventas_diarias con tarea carga y mismo calendario/fecha lógica; no uses dos triggers manuales arbitrarios.

**Resultado esperado** Success si la instancia externa correspondiente termina success.

## Concurrencia y capacidad

**Clave** `concurrencia`

### Definición

**Clave** `definicion`

**Definición** Airflow limita las tareas y runs simultáneos para proteger workers y servicios externos.

**Búsqueda** Definición; Concurrencia y capacidad; Limitar runs de un DAG

**Para recordar** Elegible no significa que haya capacidad disponible.

#### Limitar runs de un DAG

```python
# En el encabezado: max_active_runs=1
EmptyOperator(task_id="cargar")
```

Útil para evitar escrituras concurrentes sobre el mismo recurso.

**Resultado esperado** Solo un run activo del DAG a la vez según el límite.

### Parallelism y max_active_tasks

**Clave** `parallelism-y-max-active-tasks`

**Definición** parallelism limita capacidad global por scheduler; max_active_tasks limita instancias en ejecución de un DAG entre sus runs.

**Búsqueda** Parallelism y max_active_tasks; Concurrencia y capacidad; Limitar tareas del flujo

**Para recordar** Los límites actúan conjuntamente con el executor y pools.

#### Limitar tareas del flujo

```python
# En el encabezado: max_active_tasks=2
for i in range(4):
    EmptyOperator(task_id=f"carga_{i}")
```

Comprueba el límite global con airflow config get-value core parallelism.

**Resultado esperado** Como máximo dos instancias de este DAG en ejecución simultánea según el límite.

### Límites por tarea

**Clave** `limites-por-tarea`

**Definición** max_active_tis_per_dag controla instancias simultáneas de una tarea entre runs; también hay límites por run.

**Búsqueda** Límites por tarea; Concurrencia y capacidad; Limitar cargas de una tabla

**Para recordar** Usa límites específicos para tareas que compiten por el mismo recurso.

#### Limitar cargas de una tabla

```python
EmptyOperator(task_id="cargar_tabla", max_active_tis_per_dag=1)
```

La tarea vacía representa una escritura exclusiva.

**Resultado esperado** Una instancia de esa tarea puede correr a la vez entre runs.

### Pools y pool_slots

**Clave** `pools-y-pool-slots`

**Definición** Los pools reservan una cantidad de slots para recursos compartidos; pool_slots indica cuántos consume una tarea.

**Búsqueda** Pools y pool_slots; Concurrencia y capacidad; Proteger una base de datos

**Para recordar** Un pool limita capacidad, no orden de dependencias.

#### Proteger una base de datos

```python
# Antes, en terminal: airflow pools set ventas_db 2 "Conexiones de laboratorio"
EmptyOperator(task_id="consulta_grande", pool="ventas_db", pool_slots=2)
EmptyOperator(task_id="consulta_pequena", pool="ventas_db")
```

Crea el pool antes de ejecutar el DAG.

**Resultado esperado** Las dos tareas no pueden ocupar el pool simultáneamente.

### Priority weight

**Clave** `priority-weight`

**Definición** priority_weight ayuda al scheduler a priorizar tareas que compiten por capacidad disponible.

**Búsqueda** Priority weight; Concurrencia y capacidad; Priorizar una publicación

**Para recordar** No es una garantía de orden absoluto.

#### Priorizar una publicación

```python
EmptyOperator(task_id="urgente", priority_weight=10, weight_rule="absolute")
EmptyOperator(task_id="normal", priority_weight=1, weight_rule="absolute")
```

El scheduler puede agrupar decisiones; no uses prioridad como dependencia.

**Resultado esperado** Si ambas compiten por recursos, urgente tiene mayor prioridad configurada.

### Queues

**Clave** `queues`

**Definición** Con executors que soportan colas, queue selecciona una cola de trabajo.

**Búsqueda** Queues; Concurrencia y capacidad; Separar tareas de procesamiento pesado

**Para recordar** Debe existir un worker que consuma la cola elegida.

#### Separar tareas de procesamiento pesado

```python
EmptyOperator(task_id="pesada", queue="batch")
```

No tiene ese efecto en todos los executors; requiere infraestructura Celery.

**Resultado esperado** En Celery configurado con esa cola, la tarea se envía a batch.

## Executors y workers

**Clave** `executors`

### Definición

**Clave** `definicion`

**Definición** Un executor conecta las decisiones del scheduler con el mecanismo de ejecución de tareas.

**Búsqueda** Definición; Executors y workers; Inspeccionar la configuración

**Para recordar** Escoge según aislamiento, infraestructura, escala y latencia.

#### Inspeccionar la configuración

```bash
airflow config get-value core executor
airflow info
```

No cambies de executor en un entorno activo sin plan de migración.

**Resultado esperado** Se muestra el executor efectivo y el entorno.

### LocalExecutor

**Clave** `localexecutor`

**Definición** Ejecuta tareas en procesos locales de la infraestructura del scheduler.

**Búsqueda** LocalExecutor; Executors y workers; Configurar ejecución local

**Para recordar** No es un clúster distribuido; considera CPU, memoria y base de metadatos.

#### Configurar ejecución local

```text
AIRFLOW__CORE__EXECUTOR=LocalExecutor
```

Es configuración de entorno, no una orden para ejecutar en el DAG. Para producción usa una base soportada.

**Resultado esperado** Los procesos usan LocalExecutor al arrancar con configuración y base compatibles.

### CeleryExecutor

**Clave** `celeryexecutor`

**Definición** Distribuye trabajo a workers mediante Celery y un broker de mensajes.

**Búsqueda** CeleryExecutor; Executors y workers; Comprobar un worker Celery

**Para recordar** Todos los workers deben tener código y dependencias compatibles.

#### Comprobar un worker Celery

1. Despliega broker Redis o RabbitMQ, base de metadatos y provider celery.
2. Configura CeleryExecutor y arranca workers.
3. Lanza un DAG de prueba y revisa la cola y logs del worker.

Usa el procedimiento de despliegue oficial y conexiones protegidas.

**Resultado esperado** Las tareas se ejecutan en workers que consumen su cola.

### KubernetesExecutor

**Clave** `kubernetesexecutor`

**Definición** Crea pods de ejecución para tareas en un clúster Kubernetes.

**Búsqueda** KubernetesExecutor; Executors y workers; Observar pods de tarea

**Para recordar** El pod necesita imagen, código, secretos y acceso a sus datos.

#### Observar pods de tarea

```bash
kubectl get pods -n airflow
```

Requiere clúster, provider cncf-kubernetes y KubernetesExecutor configurado; los pods pueden borrarse al terminar.

**Resultado esperado** Aparecen pods de los componentes y, durante ejecuciones, pods de tarea según configuración.

## Integraciones y providers

**Clave** `integraciones`

### Definición

**Clave** `definicion`

**Definición** Los providers conectan Airflow con sistemas externos usando operators, sensors y hooks específicos.

**Búsqueda** Definición; Integraciones y providers; Inspeccionar integraciones instaladas

**Para recordar** Airflow coordina el servicio: el procesamiento puede ocurrir fuera del worker.

#### Inspeccionar integraciones instaladas

```bash
airflow providers list
```

Consulta la documentación de la versión instalada antes de importar clases.

**Resultado esperado** Lista providers y sus versiones.

### REST APIs y HttpHook

**Clave** `rest-apis-y-httphook`

**Definición** Un hook HTTP ejecuta solicitudes contra una Connection HTTP.

**Búsqueda** REST APIs y HttpHook; Integraciones y providers; Consultar el estado de un servicio

**Para recordar** Configura timeouts, valida el estado y guarda respuestas grandes fuera de XCom.

#### Consultar el estado de un servicio

```python
@task
def estado():
    from airflow.providers.http.hooks.http import HttpHook
    r = HttpHook(method="GET", http_conn_id="api_demo").run("health", extra_options={"timeout":10})
    return r.status_code
estado()
```

Requiere provider http y api_demo configurado; /health debe existir.

**Resultado esperado** Retorna 200 si el servicio responde correctamente; un error puede fallar la tarea.

### MySQL, PostgreSQL y SQL Server

**Clave** `mysql-postgresql-y-sql-server`

**Definición** Los motores SQL usan providers y conexiones específicos, pero pueden compartir SQLExecuteQueryOperator.

**Búsqueda** MySQL, PostgreSQL y SQL Server; Integraciones y providers; Consultar un motor MySQL

**Para recordar** El SQL y las opciones de conexión dependen del motor.

**Nota** Instala el provider y registra la conexión correspondiente.

#### Consultar un motor MySQL

```python
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
SQLExecuteQueryOperator(task_id="consulta_mysql", conn_id="ventas_mysql", sql="SELECT 1", do_xcom_push=True)
```

Para SQL Server usa una conexión MsSql y provider microsoft-mssql; para PostgreSQL, postgres.

**Resultado esperado** Retorna una fila con 1 cuando MySQL está configurado.

### Object storage: S3, GCS y Azure Blob

**Clave** `object-storage-s3-gcs-y-azure-blob`

**Definición** Almacenan archivos accesibles desde procesos distintos; Airflow puede orquestar transferencias mediante hooks y operators.

**Búsqueda** Object storage: S3, GCS y Azure Blob; Integraciones y providers; Subir un archivo a S3 de prueba

**Para recordar** Pasa URIs y no el contenido completo del archivo por XCom.

#### Subir un archivo a S3 de prueba

```python
@task
def subir():
    from airflow.providers.amazon.aws.hooks.s3 import S3Hook
    S3Hook(aws_conn_id="mi_s3").load_file(filename="/tmp/alldoc_airflow/orders.csv", key="alldoc/orders.csv", bucket_name="bucket-de-prueba", replace=True)
subir()
```

Sustituye el bucket; requiere provider amazon y permisos de escritura. GCS usa google y Azure Blob microsoft-azure.

**Resultado esperado** El objeto alldoc/orders.csv aparece en el bucket real configurado.

### BigQuery, Snowflake y Redshift

**Clave** `bigquery-snowflake-y-redshift`

**Definición** Los warehouses ejecutan consultas y cargas dentro de sus propios motores; Airflow controla su secuencia y estado.

**Búsqueda** BigQuery, Snowflake y Redshift; Integraciones y providers; Ejecutar una comprobación en Snowflake

**Para recordar** Evita descargar tablas completas al worker para transformarlas si el motor puede hacerlo.

#### Ejecutar una comprobación en Snowflake

```python
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
SQLExecuteQueryOperator(task_id="warehouse", conn_id="snowflake_demo", sql="SELECT 1", do_xcom_push=True)
```

Requiere provider snowflake. BigQuery tiene BigQueryInsertJobOperator; Redshift dispone de operadores/hooks según conexión y API.

**Resultado esperado** Una fila con 1 si la conexión funciona.

### pandas y Parquet

**Clave** `pandas-y-parquet`

**Definición** Una tarea Python puede transformar un lote pequeño con pandas y escribir un formato de archivo.

**Búsqueda** pandas y Parquet; Integraciones y providers; Exportar pedidos completados a Parquet

**Para recordar** Instala las librerías en el entorno de ejecución y persiste el archivo fuera de XCom.

#### Exportar pedidos completados a Parquet

```python
@task
def exportar():
    import pandas as pd
    df = pd.read_csv("/tmp/alldoc_airflow/orders.csv")
    salida = "/tmp/alldoc_airflow/completed.parquet"
    df[df.status == "completed"].to_parquet(salida, index=False)
    return salida
exportar()
```

Requiere pandas y pyarrow compatibles; archivo local de laboratorio.

**Resultado esperado** Parquet con cuatro filas y seis columnas.

### dbt

**Clave** `dbt`

**Definición** Airflow puede ejecutar dbt para transformar datos en el warehouse y ordenar la ejecución con otras fuentes.

**Búsqueda** dbt; Integraciones y providers; Construir modelos de ventas

**Para recordar** El proyecto dbt y sus credenciales deben existir en el entorno que ejecuta el comando.

#### Construir modelos de ventas

```python
BashOperator(task_id="dbt_build", bash_command="set -e; dbt build --project-dir /opt/dbt/ventas --select tag:ventas")
```

Requiere dbt, adapter, proyecto, perfil y tag reales; sustituye la ruta.

**Resultado esperado** Se ejecutan modelos y pruebas seleccionados; si dbt devuelve un código de error la tarea falla.

### PySpark y SparkSubmitOperator

**Clave** `pyspark-y-sparksubmitoperator`

**Definición** Airflow puede enviar una aplicación Spark a un motor de ejecución distribuido.

**Búsqueda** PySpark y SparkSubmitOperator; Integraciones y providers; Enviar una aplicación de ventas

**Para recordar** Spark procesa los datos; el operator supervisa el job.

#### Enviar una aplicación de ventas

```python
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
SparkSubmitOperator(task_id="spark_job", application="/opt/jobs/ventas.py", conn_id="spark_default")
```

Requiere provider apache-spark, spark-submit, script real y conexión al entorno Spark.

**Resultado esperado** Se ejecuta el job y el estado refleja su resultado.

### Databricks

**Clave** `databricks`

**Definición** El provider de Databricks inicia o supervisa jobs en un workspace.

**Búsqueda** Databricks; Integraciones y providers; Ejecutar un job existente

**Para recordar** Define permisos del job y usa una conexión con autenticación apropiada.

#### Ejecutar un job existente

```python
from airflow.providers.databricks.operators.databricks import DatabricksRunNowOperator
DatabricksRunNowOperator(task_id="job", databricks_conn_id="databricks_demo", job_id=123)
```

123 es un identificador de ejemplo; sustituye por un job autorizado real.

**Resultado esperado** Se solicita una ejecución del job y se supervisa según configuración.

### DockerOperator

**Clave** `dockeroperator`

**Definición** Ejecuta una tarea dentro de una imagen Docker.

**Búsqueda** DockerOperator; Integraciones y providers; Ejecutar un cálculo aislado

**Para recordar** El daemon Docker y el montaje de archivos deben ser accesibles y seguros.

#### Ejecutar un cálculo aislado

```python
from airflow.providers.docker.operators.docker import DockerOperator
DockerOperator(task_id="contenedor", image="python:3.11-slim", command=["python", "-c", "print(2+3)"], mount_tmp_dir=False)
```

Requiere provider docker, daemon autorizado e imagen disponible.

**Resultado esperado** El log del contenedor imprime 5.

### KubernetesPodOperator

**Clave** `kubernetespodoperator`

**Definición** Lanza un pod de Kubernetes como tarea, incluso con un executor diferente a KubernetesExecutor.

**Búsqueda** KubernetesPodOperator; Integraciones y providers; Ejecutar un comando en un pod

**Para recordar** KubernetesPodOperator es una tarea; KubernetesExecutor es infraestructura de ejecución.

#### Ejecutar un comando en un pod

```python
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
KubernetesPodOperator(task_id="pod", name="alldoc-demo", namespace="airflow", image="python:3.11-slim", cmds=["python", "-c"], arguments=["print(5)"], get_logs=True)
```

Requiere provider cncf-kubernetes y namespace existente.

**Resultado esperado** Se crea un pod que imprime 5 y termina si tiene permisos y acceso a la imagen.

### CSV y JSON

**Clave** `csv-y-json`

**Definición** Los formatos CSV y JSON pueden ser entradas o salidas de tareas de Python.

**Búsqueda** CSV y JSON; Integraciones y providers; Convertir pedidos a JSON local

**Para recordar** Valida formato y no envíes archivos completos por XCom.

#### Convertir pedidos a JSON local

```python
@task
def convertir():
    import json
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        filas = list(csv.DictReader(f))
    p = Path("/tmp/alldoc_airflow/orders.json")
    p.write_text(json.dumps(filas))
    return str(p)
convertir()
```

Solo se retorna la ruta del archivo.

**Resultado esperado** El JSON contiene cinco objetos con los campos del CSV.

## Ingeniería de pipelines

**Clave** `ingenieria-pipelines`

### Definición

**Clave** `definicion`

**Definición** Un pipeline de datos fiable procesa lotes definidos, valida sus entradas y persiste resultados que pueden reproducirse.

**Búsqueda** Definición; Ingeniería de pipelines; Calcular ventas con lógica independiente

**Para recordar** Separa la lógica de negocio de la orquestación.

#### Calcular ventas con lógica independiente

```python
def ventas_completadas(filas):
    return sum(int(r["amount"]) for r in filas if r["status"] == "completed")
@task
def calcular():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        return ventas_completadas(csv.DictReader(f))
calcular()
```

La función de cálculo puede probarse sin Airflow.

**Resultado esperado** Retorna 3000.

### Full load e incremental load

**Clave** `full-load-e-incremental-load`

**Definición** Una carga completa reemplaza o reconstruye el conjunto; una incremental procesa solo las filas nuevas o modificadas.

**Búsqueda** Full load e incremental load; Ingeniería de pipelines; Extraer un lote por rango semiabierto

**Para recordar** Define de qué manera se reconocen cambios y qué ocurre al reejecutar.

#### Extraer un lote por rango semiabierto

```python
@task
def extraer():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        return [r["order_id"] for r in csv.DictReader(f) if "2026-09-01" <= r["order_date"] < "2026-09-02"]
extraer()
```

En producción usa el intervalo del run y un filtro eficiente en la fuente.

**Resultado esperado** Devuelve ["101", "102"].

### Idempotencia

**Clave** `idempotencia`

**Definición** Una tarea idempotente produce el mismo estado final si se repite con la misma entrada.

**Búsqueda** Idempotencia; Ingeniería de pipelines; Reemplazar un reporte del lote

**Para recordar** No hagas append indiscriminado durante retries o backfills.

#### Reemplazar un reporte del lote

```python
@task
def escribir():
    p = Path("/tmp/alldoc_airflow/ventas-2026-09-01.txt")
    p.write_text("1100\n")
    return str(p)
escribir()
```

Para bases de datos usa upsert o reemplazo transaccional de la partición.

**Resultado esperado** Al repetir, el archivo sigue conteniendo una sola línea con 1100.

### Watermarks y datos tardíos

**Clave** `watermarks-y-datos-tardios`

**Definición** Un watermark registra hasta qué punto se confirmó el procesamiento; datos tardíos pueden aparecer por detrás de ese punto.

**Búsqueda** Watermarks y datos tardíos; Ingeniería de pipelines; Diseñar recuperación de una carga incremental

**Para recordar** Avanza el watermark después de confirmar la carga; permite solapamiento y deduplicación.

#### Diseñar recuperación de una carga incremental

1. Lee el último updated_at confirmado.
2. Extrae desde un día antes del watermark.
3. Haz upsert usando order_id y conserva la versión más reciente.
4. Confirma el nuevo watermark tras la carga.

Este procedimiento requiere una fuente con updated_at y destino con clave única; el CSV base solo tiene order_date.

**Resultado esperado** Un pedido corregido dentro del solapamiento se actualiza sin duplicarse.

### Deduplicación

**Clave** `deduplicacion`

**Definición** Elimina repeticiones a partir de una clave de negocio y una regla de precedencia.

**Búsqueda** Deduplicación; Ingeniería de pipelines; Conservar una versión por pedido

**Para recordar** Define qué registro gana antes de eliminar duplicados.

#### Conservar una versión por pedido

```python
@task
def deduplicar():
    filas = [{"id":101,"version":1,"amount":800}, {"id":101,"version":2,"amount":850}]
    unicos = {}
    for r in sorted(filas, key=lambda x: x["version"]):
        unicos[r["id"]] = r
    return list(unicos.values())
deduplicar()
```

Este microdataset incluye dos versiones deliberadamente.

**Resultado esperado** Una fila: id 101, versión 2, amount 850.

### Particionamiento de datos

**Clave** `particionamiento-de-datos`

**Definición** Separa datasets por fecha u otra dimensión para limitar la lectura, escritura y recuperación.

**Búsqueda** Particionamiento de datos; Ingeniería de pipelines; Crear ruta diaria de destino

**Para recordar** Usa una partición derivada del lote, no de la hora actual.

#### Crear ruta diaria de destino

```python
@task
def ruta(dia):
    return f"ventas/dt={dia}/orders.parquet"
ruta("2026-09-01")
```

El ejemplo crea la ruta, no el archivo.

**Resultado esperado** Retorna ventas/dt=2026-09-01/orders.parquet.

### Atomicidad y recuperación

**Clave** `atomicidad-y-recuperacion`

**Definición** Una carga atómica evita publicar resultados parciales; los efectos secundarios deben poder recuperarse o compensarse.

**Búsqueda** Atomicidad y recuperación; Ingeniería de pipelines; Publicar un archivo local de forma atómica

**Para recordar** Confirma juntos los cambios que deban permanecer consistentes.

#### Publicar un archivo local de forma atómica

```python
@task
def publicar():
    final = Path("/tmp/alldoc_airflow/ventas.txt")
    temporal = final.with_suffix(".tmp")
    temporal.write_text("3000\n")
    temporal.replace(final)
publicar()
```

Para esta demostración local y un único escritor, el reemplazo ocurre en el mismo filesystem. En cloud utiliza las garantías del servicio.

**Resultado esperado** El destino final contiene 3000 después del reemplazo.

## Calidad de datos y linaje

**Clave** `calidad-linaje`

### Definición

**Clave** `definicion`

**Definición** Data quality verifica que los datos satisfagan reglas antes de que otros procesos los consuman.

**Búsqueda** Definición; Calidad de datos y linaje; Comprobar que el lote no esté vacío

**Para recordar** Falla explícitamente si una condición obligatoria no se cumple.

#### Comprobar que el lote no esté vacío

```python
@task
def validar():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        filas = list(csv.DictReader(f))
    if not filas:
        raise ValueError("Lote vacío")
    return len(filas)
validar()
```

La regla se evalúa antes de publicar.

**Resultado esperado** Retorna 5; un CSV con solo encabezados provoca fallo.

### Validar esquema, nulos y claves

**Clave** `validar-esquema-nulos-y-claves`

**Definición** Comprueba columnas requeridas, presencia de valores y unicidad de identificadores.

**Búsqueda** Validar esquema, nulos y claves; Calidad de datos y linaje; Validar order_id

**Para recordar** No confundas conteo de filas con validez de sus claves.

#### Validar order_id

```python
@task
def calidad():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        reader = csv.DictReader(f)
        if not {"order_id", "amount"}.issubset(reader.fieldnames or []):
            raise ValueError("Esquema inválido")
        ids = [r["order_id"] for r in reader]
    if any(not x for x in ids) or len(ids) != len(set(ids)):
        raise ValueError("Clave nula o repetida")
    return len(ids)
calidad()
```

Una fila sin ID o con ID repetido hace fallar la tarea.

**Resultado esperado** Retorna 5 con los datos base.

### SQLCheckOperator

**Clave** `sqlcheckoperator`

**Definición** Ejecuta una consulta que devuelve valores evaluables como verdaderos; un resultado falso hace fallar la comprobación.

**Búsqueda** SQLCheckOperator; Calidad de datos y linaje; Comprobar ventas no negativas

**Para recordar** Especifica una condición de calidad, no una consulta de visualización.

#### Comprobar ventas no negativas

```python
from airflow.providers.common.sql.operators.sql import SQLCheckOperator
SQLCheckOperator(task_id="calidad_sql", conn_id="ventas_pg", sql="SELECT COUNT(*) = 0 FROM orders WHERE amount < 0")
```

Requiere PostgreSQL con tabla orders; carga antes el dataset en ese motor.

**Resultado esperado** Success si no existen importes negativos.

### Data lineage y OpenLineage

**Clave** `data-lineage-y-openlineage`

**Definición** El linaje registra relaciones entre entradas, procesos y salidas; OpenLineage ofrece un estándar para emitir eventos.

**Búsqueda** Data lineage y OpenLineage; Calidad de datos y linaje; Observar linaje de una carga SQL

**Para recordar** El grafo de tareas no sustituye el linaje de datasets.

#### Observar linaje de una carga SQL

1. Instala el provider openlineage compatible.
2. Configura el transporte a un backend de linaje de prueba.
3. Ejecuta un operator SQL con soporte de extracción de linaje.
4. Inspecciona eventos de job, run e inputs/outputs.

Requiere backend real; la cobertura depende del operator.

**Resultado esperado** El backend recibe los eventos y puede mostrar relaciones de datos si el extractor las obtiene.

## Testing y debugging

**Clave** `testing`

### Definición

**Clave** `definicion`

**Definición** Las pruebas verifican importación, estructura, lógica de tareas e integración con servicios.

**Búsqueda** Definición; Testing y debugging; Detectar un error de importación

**Para recordar** Prueba primero la lógica aislada y luego el DAG completo.

#### Detectar un error de importación

```bash
airflow dags list-import-errors
```

Si aparece un error, corrígelo antes de probar ejecuciones.

**Resultado esperado** Sin errores se muestra una lista vacía o mensaje equivalente.

### Prueba unitaria y pytest

**Clave** `prueba-unitaria-y-pytest`

**Definición** Una función de negocio independiente puede probarse sin scheduler ni base de metadatos.

**Búsqueda** Prueba unitaria y pytest; Testing y debugging; Verificar ventas completadas

**Para recordar** No conviertas cada prueba de lógica en un DAG Run.

#### Verificar ventas completadas

```python
# test_ventas.py, archivo independiente
def sumar(filas):
    return sum(r["amount"] for r in filas if r["status"] == "completed")
def test_sumar():
    assert sumar([{"amount":100,"status":"completed"},{"amount":50,"status":"cancelled"}]) == 100
```

Instala pytest en un entorno de pruebas y ejecuta el comando desde ese directorio.

**Resultado esperado** pytest test_ventas.py pasa una prueba.

### Mocking

**Clave** `mocking`

**Definición** Sustituye una dependencia externa por un objeto controlado para probar lógica sin red ni credenciales.

**Búsqueda** Mocking; Testing y debugging; Simular un cliente de datos

**Para recordar** Prueba las decisiones de tu código, no el servicio simulado.

#### Simular un cliente de datos

```python
# test_cliente.py, archivo independiente
from unittest.mock import Mock
def contar(cliente):
    return len(cliente.obtener())
def test_contar():
    cliente = Mock()
    cliente.obtener.return_value = [101,102]
    assert contar(cliente) == 2
    cliente.obtener.assert_called_once()
```

El mock reproduce una respuesta conocida.

**Resultado esperado** pytest test_cliente.py pasa una prueba sin conexión externa.

### DagBag e importación

**Clave** `dagbag-e-importacion`

**Definición** DagBag fue una interfaz habitual en pruebas de importación de Airflow 2; en Airflow 3 conviene evitar depender de estructuras internas.

**Búsqueda** DagBag e importación; Testing y debugging; Comprobar que un DAG es visible

**Para recordar** Prefiere interfaces públicas para pruebas que deban sobrevivir actualizaciones.

#### Comprobar que un DAG es visible

```bash
airflow dags list
airflow dags list-import-errors
```

En Airflow 2.10 puedes usar DagBag.import_errors en pruebas de estructura; no lo trates como API pública estable de Airflow 3.

**Resultado esperado** El dag_id esperado figura en la lista y no hay errores de importación.

### airflow tasks test

**Clave** `airflow-tasks-test`

**Definición** Ejecuta una tarea localmente para depurar su comportamiento sin esperar el flujo normal de dependencias.

**Búsqueda** airflow tasks test; Testing y debugging; Probar una tarea aislada

**Para recordar** No equivale a una ejecución orquestada completa.

#### Probar una tarea aislada

```bash
airflow tasks test ventas_manual inicio 2026-09-01
```

Crea antes ventas_manual; usa una tarea sin XCom upstream ni escrituras peligrosas.

**Resultado esperado** Se ejecuta inicio y se muestran sus logs.

### airflow dags test y dag.test()

**Clave** `airflow-dags-test-y-dag-test`

**Definición** Ejecutan localmente un flujo completo para depurar dependencias y código.

**Búsqueda** airflow dags test y dag.test(); Testing y debugging; Probar un DAG completo

**Para recordar** Las tareas pueden tener efectos secundarios reales aunque estés probando.

#### Probar un DAG completo

```bash
airflow dags test ventas_manual 2026-09-01
```

Para Python también existe demo.test() bajo if __name__ == "__main__" en el archivo de DAG.

**Resultado esperado** La tarea inicio termina success si el entorno está correcto.

### Pruebas de integración

**Clave** `pruebas-de-integracion`

**Definición** Verifican conexiones y contratos con servicios reales de prueba, además de la lógica local.

**Búsqueda** Pruebas de integración; Testing y debugging; Probar una conexión PostgreSQL

**Para recordar** Utiliza recursos aislados de producción.

#### Probar una conexión PostgreSQL

1. Crea una base de datos de laboratorio y registra ventas_pg.
2. Ejecuta la ficha PostgresHook con SELECT 42.
3. Comprueba el retorno y el estado.

Si falla, revisa red, autenticación, provider y permisos.

**Resultado esperado** El retorno debe ser 42 y la instancia success.

## Interfaz, CLI y REST API

**Clave** `operacion`

### Definición

**Clave** `definicion`

**Definición** La UI, CLI y API permiten inspeccionar y operar DAGs y tareas sin editar su código.

**Búsqueda** Definición; Interfaz, CLI y REST API; Listar DAGs

**Para recordar** Usa interfaces públicas y controla los permisos de operación.

#### Listar DAGs

```bash
airflow dags list
```

El listado depende de los archivos procesados.

**Resultado esperado** Lista los DAGs disponibles en el entorno.

### Grid y Graph

**Clave** `grid-y-graph`

**Definición** Grid organiza estados por runs y tareas; Graph representa dependencias del flujo.

**Búsqueda** Grid y Graph; Interfaz, CLI y REST API; Localizar la causa de un fallo

**Para recordar** Usa Grid para historial y Graph para entender bloqueos.

#### Localizar la causa de un fallo

1. Abre un DAG con varias tareas.
2. En Grid selecciona un run fallido.
3. Abre Graph y localiza el antecedente failed.
4. Abre Logs de esa instancia.

upstream_failed no implica que el cuerpo de esa tarea haya corrido.

**Resultado esperado** Se observa la dependencia que impide ejecutar las tareas posteriores.

### Logs y rendered templates

**Clave** `logs-y-rendered-templates`

**Definición** Los logs muestran la ejecución de una instancia; las plantillas renderizadas permiten inspeccionar sus parámetros efectivos.

**Búsqueda** Logs y rendered templates; Interfaz, CLI y REST API; Inspeccionar el comando de una tarea

**Para recordar** Consulta el run y el intento correctos antes de diagnosticar.

#### Inspeccionar el comando de una tarea

1. Ejecuta la ficha de BashOperator con env templado.
2. Abre la instancia y su vista de plantillas renderizadas si está disponible.
3. Compara con Logs.

No expongas campos que puedan contener secretos.

**Resultado esperado** El identificador del run se observa en el parámetro renderizado o en el log.

### Pause, unpause y trigger

**Clave** `pause-unpause-y-trigger`

**Definición** Pausar deshabilita planificación normal; activar habilita la programación; trigger solicita un nuevo run.

**Búsqueda** Pause, unpause y trigger; Interfaz, CLI y REST API; Activar y disparar un DAG

**Para recordar** Pausar no equivale a cancelar una tarea en ejecución.

#### Activar y disparar un DAG

```bash
airflow dags unpause ventas_manual
airflow dags trigger ventas_manual
```

Crea antes ventas_manual.

**Resultado esperado** El DAG queda activo y se crea una ejecución manual.

### REST API v2

**Clave** `rest-api-v2`

**Definición** La API estable permite automatizar operaciones mediante HTTP con autenticación y permisos adecuados.

**Búsqueda** REST API v2; Interfaz, CLI y REST API; Consultar DAGs mediante API

**Para recordar** En Airflow 3 las rutas públicas son /api/v2; no uses endpoints internos de la UI.

**Nota** Requiere API activa y autenticación configurada.

#### Consultar DAGs mediante API

```bash
curl -fsS -H "Authorization: Bearer $AIRFLOW_TOKEN" http://localhost:8080/api/v2/dags
```

Obtén AIRFLOW_TOKEN mediante el auth manager de tu entorno; no lo incluyas en el documento ni en logs.

**Resultado esperado** JSON con DAGs accesibles al usuario si el token es válido.

## Observabilidad y diagnóstico

**Clave** `observabilidad`

### Definición

**Clave** `definicion`

**Definición** Observabilidad combina logs, métricas y eventos para entender el estado del orquestador y sus pipelines.

**Búsqueda** Definición; Observabilidad y diagnóstico; Registrar métricas de negocio en logs

**Para recordar** Distingue errores de datos de errores de infraestructura.

#### Registrar métricas de negocio en logs

```python
@task
def registrar():
    logging.info("filas=%s ventas=%s", 4, 3000)
registrar()
```

Usa logging en lugar de imprimir credenciales o datasets completos.

**Resultado esperado** El log contiene filas=4 ventas=3000.

### Health checks y heartbeats

**Clave** `health-checks-y-heartbeats`

**Definición** Los heartbeats indican actividad de componentes y tareas; health checks detectan problemas de conectividad o actividad.

**Búsqueda** Health checks y heartbeats; Observabilidad y diagnóstico; Consultar salud local

**Para recordar** Un HTTP 200 por sí solo no garantiza que todos los componentes estén saludables.

#### Consultar salud local

```bash
curl -fsS http://localhost:8080/api/v2/monitor/health
```

Inspecciona los campos, no solo el código HTTP.

**Resultado esperado** JSON con estado de componentes según despliegue y configuración.

### Tareas huérfanas y timeout de heartbeat

**Clave** `tareas-huerfanas-y-timeout-de-heartbeat`

**Definición** Una tarea puede perder contacto con su proceso de ejecución; el scheduler detecta instancias sin heartbeat según configuración y estado.

**Búsqueda** Tareas huérfanas y timeout de heartbeat; Observabilidad y diagnóstico; Diagnosticar una instancia running sin progreso

**Para recordar** No confundas una tarea lenta con una tarea que dejó de reportar actividad.

#### Diagnosticar una instancia running sin progreso

1. Revisa logs del worker y el scheduler.
2. Comprueba si el proceso o pod sigue vivo y si reporta heartbeat.
3. Espera la reconciliación o aplica clearing selectivo tras comprobar efectos secundarios.

No borres metadatos ni fuerces éxito para ocultar el problema.

**Resultado esperado** Se identifica si la instancia perdió su proceso o continúa ejecutándose.

### Métricas y alertas de infraestructura

**Clave** `metricas-y-alertas-de-infraestructura`

**Definición** Airflow puede emitir métricas a sistemas como StatsD u OpenTelemetry; Prometheus/Grafana pueden visualizarlas mediante integraciones adecuadas.

**Búsqueda** Métricas y alertas de infraestructura; Observabilidad y diagnóstico; Definir una alerta por saturación

**Para recordar** Monitoriza latencia de planificación, duración, cola y capacidad de pools.

#### Definir una alerta por saturación

1. Habilita un backend de métricas según la guía de la versión.
2. Crea un panel de tareas queued y slots disponibles.
3. Configura alerta si la cola crece durante una ventana sostenida.

Los nombres de métricas y exportadores dependen de versión y despliegue.

**Resultado esperado** El panel muestra presión de capacidad; la alerta se activa al superar el umbral elegido.

### Remote logging

**Clave** `remote-logging`

**Definición** Permite conservar logs fuera de workers efímeros en almacenamiento remoto o servicios de logging.

**Búsqueda** Remote logging; Observabilidad y diagnóstico; Verificar logs de un worker efímero

**Para recordar** El log debe seguir disponible cuando desaparece el pod.

#### Verificar logs de un worker efímero

1. Configura remote_logging y destino remoto con permisos de escritura y lectura.
2. Ejecuta un DAG en un worker efímero.
3. Tras su salida, abre sus logs desde la UI.

Requiere provider y destino real; no uses rutas locales como almacenamiento remoto.

**Resultado esperado** Los logs siguen recuperables si se escribieron correctamente en el backend.

### Análisis de causa raíz

**Clave** `analisis-de-causa-raiz`

**Definición** Investiga el primer fallo causal, la entrada usada, el intento, los cambios recientes y los efectos secundarios antes de reejecutar.

**Búsqueda** Análisis de causa raíz; Observabilidad y diagnóstico; Investigar una carga fallida

**Para recordar** Reintentar sin entender el fallo puede duplicar efectos.

#### Investigar una carga fallida

1. Identifica el primer task_id failed.
2. Consulta su log y la versión del DAG.
3. Comprueba si escribió datos parcialmente.
4. Corrige la causa y reejecuta el lote de forma idempotente.

Documenta el run_id, el fallo, la corrección y la validación final.

**Resultado esperado** Se obtiene una explicación verificable y una recuperación controlada.

## Seguridad

**Clave** `seguridad`

### Definición

**Clave** `definicion`

**Definición** La seguridad de Airflow protege acceso a UI/API, credenciales, código ejecutable y recursos externos.

**Búsqueda** Definición; Seguridad; Separar acceso de lectura y operación

**Para recordar** Quien puede desplegar DAGs puede ejecutar código; trata esa capacidad como privilegiada.

#### Separar acceso de lectura y operación

1. Configura un auth manager apropiado.
2. Crea un rol o identidad con permiso de lectura.
3. Comprueba que puede consultar DAGs pero no dispararlos ni editarlos.

La forma exacta de RBAC depende del auth manager.

**Resultado esperado** Las acciones de operación se deniegan para esa identidad.

### Auth Managers y RBAC

**Clave** `auth-managers-y-rbac`

**Definición** El auth manager define autenticación y autorización; RBAC organiza permisos mediante roles cuando el backend lo soporta.

**Búsqueda** Auth Managers y RBAC; Seguridad; Validar permisos de una cuenta operativa

**Para recordar** No uses el auth manager de desarrollo como política de seguridad de producción.

#### Validar permisos de una cuenta operativa

1. Crea una identidad que pueda disparar un DAG de pruebas, pero no administrar usuarios.
2. Prueba ambas acciones en UI o API.

Requiere un auth manager que permita permisos de ese alcance.

**Resultado esperado** Trigger permitido; administración denegada.

### Fernet y rotación de secretos

**Clave** `fernet-y-rotacion-de-secretos`

**Definición** Fernet cifra campos sensibles guardados en la base de metadatos; la clave debe protegerse y rotarse con el procedimiento oficial.

**Búsqueda** Fernet y rotación de secretos; Seguridad; Planificar rotación de clave

**Para recordar** El cifrado no reemplaza el control de acceso.

#### Planificar rotación de clave

1. Haz respaldo de metadatos y conserva la clave previa de forma segura.
2. Configura nueva clave y anterior según la guía de rotación.
3. Ejecuta airflow rotate-fernet-key y valida conexiones.
4. Retira la clave anterior cuando se confirme la migración.

Operación administrativa; prueba en staging antes de producción.

**Resultado esperado** Las conexiones existentes siguen siendo legibles tras la rotación correcta.

### IAM, service accounts y mínimo privilegio

**Clave** `iam-service-accounts-y-minimo-privilegio`

**Definición** Las identidades de servicios conceden acceso a recursos externos sin compartir credenciales personales.

**Búsqueda** IAM, service accounts y mínimo privilegio; Seguridad; Limitar una carga a su prefijo

**Para recordar** Concede solo operaciones y rutas necesarias para la tarea.

#### Limitar una carga a su prefijo

1. Asigna al worker una identidad de servicio.
2. Permite escribir únicamente en el prefijo alldoc/ de un bucket de prueba.
3. Prueba una escritura autorizada y otra fuera del prefijo.

La política concreta depende del proveedor cloud.

**Resultado esperado** La primera funciona; la segunda se deniega.

### TLS, masking y aislamiento

**Clave** `tls-masking-y-aislamiento`

**Definición** TLS protege comunicaciones, masking reduce exposición accidental de secretos y el aislamiento limita alcance de tareas.

**Búsqueda** TLS, masking y aislamiento; Seguridad; Auditar un entorno de prueba

**Para recordar** Nunca confíes en masking para justificar imprimir contraseñas.

#### Auditar un entorno de prueba

1. Comprueba HTTPS en UI/API.
2. Revisa que los logs no contengan secretos.
3. Separa imágenes, permisos de red y credenciales de workers.

Task Execution API no convierte código arbitrario de DAG en una frontera de seguridad absoluta.

**Resultado esperado** El entorno limita exposición de datos y acceso entre componentes.

## Despliegue y administración

**Clave** `despliegue`

### Definición

**Clave** `definicion`

**Definición** Un despliegue de producción combina servicios persistentes, escalabilidad, permisos, backups y gestión de versiones.

**Búsqueda** Definición; Despliegue y administración; Inventariar componentes de producción

**Para recordar** No copies standalone o el compose rápido como arquitectura productiva.

#### Inventariar componentes de producción

1. Identifica scheduler, DAG processor, API server, triggerer, executor y metadata DB.
2. Documenta red, secretos, almacenamiento de logs y responsables.

La topología depende del executor y plataforma.

**Resultado esperado** Mapa de componentes y dependencias operativas.

### Base de metadatos y migraciones

**Clave** `base-de-metadatos-y-migraciones`

**Definición** Una base soportada y persistente permite operar varios componentes; airflow db migrate actualiza el esquema de metadatos.

**Búsqueda** Base de metadatos y migraciones; Despliegue y administración; Comprobar versión antes de una migración

**Para recordar** Haz respaldo y coordina versiones antes de migrar.

#### Comprobar versión antes de una migración

```bash
airflow version
airflow db check
```

En una ventana de mantenimiento usa airflow db migrate siguiendo el procedimiento de actualización; no lo ejecutes indiscriminadamente.

**Resultado esperado** Se confirma la versión instalada y conectividad.

### Kubernetes y Helm

**Clave** `kubernetes-y-helm`

**Definición** El chart oficial permite configurar y desplegar componentes Airflow en Kubernetes.

**Búsqueda** Kubernetes y Helm; Despliegue y administración; Inspeccionar una instalación existente

**Para recordar** Versiona values, imágenes, recursos, secretos y estrategia de migración.

#### Inspeccionar una instalación existente

```bash
helm list -n airflow
kubectl get deployments,statefulsets,pods -n airflow
```

Requiere cluster, namespace y permisos de lectura.

**Resultado esperado** Se muestran los componentes instalados y sus estados.

### Alta disponibilidad y escalamiento

**Clave** `alta-disponibilidad-y-escalamiento`

**Definición** HA reduce puntos únicos de fallo; el escalamiento horizontal o vertical ajusta la capacidad a la carga.

**Búsqueda** Alta disponibilidad y escalamiento; Despliegue y administración; Escalar por evidencia

**Para recordar** Añadir workers no corrige necesariamente una base de metadatos saturada.

#### Escalar por evidencia

1. Mide cola, utilización de workers, latencia de scheduler y base.
2. Aumenta capacidad del componente limitante en staging.
3. Ejecuta una carga de prueba y compara métricas.

El límite puede estar en pools, broker, base o servicios externos.

**Resultado esperado** Menor cola o latencia si el cuello de botella fue correctamente identificado.

### DAG Bundles y versionado

**Clave** `dag-bundles-y-versionado`

**Definición** Los bundles proporcionan una fuente de DAGs y, cuando el backend lo permite, versiones identificables de código.

**Búsqueda** DAG Bundles y versionado; Despliegue y administración; Inspeccionar una actualización de código

**Para recordar** Versiona DAGs y dependencias para poder reproducir ejecuciones.

#### Inspeccionar una actualización de código

1. Configura un bundle versionado según la guía de tu versión, por ejemplo Git.
2. Publica dos revisiones del mismo DAG.
3. Comprueba la versión registrada en ejecuciones nuevas.

El bundle local no proporciona todas las garantías de versionado de un backend versionado.

**Resultado esperado** El entorno identifica revisiones de DAG según el backend configurado.

### Backups, limpieza y recuperación

**Clave** `backups-limpieza-y-recuperacion`

**Definición** Conserva metadatos, configuración, claves y código; aplica políticas de retención de logs y registros antiguos.

**Búsqueda** Backups, limpieza y recuperación; Despliegue y administración; Revisar limpieza de metadatos

**Para recordar** Un backup sin prueba de restauración no garantiza recuperación.

#### Revisar limpieza de metadatos

```bash
airflow db clean --help
```

Antes de limpiar, usa dry-run cuando esté disponible, respalda y define retención; no elimines datos productivos desde un ejemplo.

**Resultado esperado** Se muestran filtros, opciones de simulación y archivo según la versión.

### CI/CD y entornos

**Clave** `ci-cd-y-entornos`

**Definición** Automatiza pruebas y entrega de DAGs a desarrollo, staging y producción con dependencias fijadas.

**Búsqueda** CI/CD y entornos; Despliegue y administración; Crear un control previo a publicación

**Para recordar** El mismo código probado debe ser el que se despliegue.

#### Crear un control previo a publicación

1. Ejecuta pruebas unitarias.
2. Valida importación con las dependencias fijadas.
3. Ejecuta integración en staging.
4. Publica la imagen o bundle versionado tras aprobación.

Mantén conexiones y secretos específicos de cada entorno.

**Resultado esperado** Solo se despliega si pasan los controles establecidos.

### Servicios administrados

**Clave** `servicios-administrados`

**Definición** MWAA, Cloud Composer y Astro administran parte de la infraestructura con restricciones y versiones propias.

**Búsqueda** Servicios administrados; Despliegue y administración; Evaluar un despliegue administrado

**Para recordar** La portabilidad del DAG no implica idénticas opciones de administración.

#### Evaluar un despliegue administrado

1. Verifica versiones de Airflow y providers admitidas.
2. Comprueba mecanismo de entrega de DAGs, redes, secretos y logs.
3. Ejecuta ventas_manual como prueba.

Consulta documentación específica del producto antes de migrar.

**Resultado esperado** El DAG se registra y ejecuta si cumple los requisitos del servicio.

## Rendimiento y buenas prácticas

**Clave** `rendimiento`

### Definición

**Clave** `definicion`

**Definición** Optimizar Airflow implica limitar trabajo innecesario en parsing, scheduling y ejecución, sin trasladar grandes datasets por el orquestador.

**Búsqueda** Definición; Rendimiento y buenas prácticas; Mover lectura de archivo a ejecución

**Para recordar** Mide antes de aumentar recursos o modificar límites.

#### Mover lectura de archivo a ejecución

```python
@task
def leer():
    return Path("/tmp/alldoc_airflow/orders.csv").stat().st_size
leer()
```

La lectura no ocurre en cada importación del archivo DAG.

**Resultado esperado** Se devuelve el tamaño en bytes cuando corre la tarea.

### Parsing y código de nivel superior

**Clave** `parsing-y-codigo-de-nivel-superior`

**Definición** El procesador puede importar repetidamente los archivos de DAG; operaciones pesadas allí degradan el rendimiento.

**Búsqueda** Parsing y código de nivel superior; Rendimiento y buenas prácticas; Diferir la lectura de configuración

**Para recordar** Evita llamadas HTTP, consultas SQL y Variable.get en nivel superior.

#### Diferir la lectura de configuración

```python
@task
def configurar():
    return Variable.get("region", default="MX")
configurar()
```

Genera el grafo con configuración local ligera cuando sea posible.

**Resultado esperado** El acceso a la variable ocurre al ejecutar.

### Granularidad y paralelismo

**Clave** `granularidad-y-paralelismo`

**Definición** Demasiadas tareas pequeñas aumentan costos de scheduling y metadatos; tareas enormes reducen aislamiento y recuperación.

**Búsqueda** Granularidad y paralelismo; Rendimiento y buenas prácticas; Agrupar trabajo por lote

**Para recordar** Elige una unidad de trabajo que permita reintentar sin repetir demasiado.

#### Agrupar trabajo por lote

```python
@task
def lote(ids):
    return len(ids)
lote.expand(ids=[[101,102],[103,104,105]])
```

No metas datasets masivos en XCom; aquí solo hay cinco identificadores.

**Resultado esperado** Dos instancias retornan 2 y 3 en lugar de crear cinco tareas individuales.

### Optimizar metadatos y dependencias

**Clave** `optimizar-metadatos-y-dependencias`

**Definición** La retención, índices administrados, conexiones y tamaño de DAGs afectan los componentes de Airflow.

**Búsqueda** Optimizar metadatos y dependencias; Rendimiento y buenas prácticas; Investigar scheduler lento

**Para recordar** No modifiques directamente tablas internas desde DAGs.

#### Investigar scheduler lento

1. Mide tiempo de parsing y retraso de scheduling.
2. Comprueba conexiones y carga de la metadata DB.
3. Revisa DAGs con miles de tareas o mapeos.
4. Ajusta retención o límites siguiendo la guía oficial.

La optimización concreta depende del entorno.

**Resultado esperado** Se identifica un cuello de botella medible antes de cambiar configuración.

## Extensiones y APIs

**Clave** `extensiones`

### Definición

**Clave** `definicion`

**Definición** Airflow permite ampliar comportamiento con clases y mecanismos públicos, en lugar de modificar el núcleo.

**Búsqueda** Definición; Extensiones y APIs; Crear un operator de negocio pequeño

**Para recordar** Reutiliza un provider existente si cubre la necesidad.

#### Crear un operator de negocio pequeño

```python
from airflow.sdk import BaseOperator
class MostrarTotal(BaseOperator):
    def __init__(self, total, **kwargs):
        super().__init__(**kwargs)
        self.total = total
    def execute(self, context):
        self.log.info("Total: %s", self.total)
        return self.total
MostrarTotal(task_id="mostrar", total=3000)
```

Para reutilizarlo, mueve la clase a un módulo importable; execute se llama en tiempo de ejecución.

**Resultado esperado** Retorna 3000 y lo registra en logs.

### Custom Hook

**Clave** `custom-hook`

**Definición** Un hook personalizado centraliza acceso a un servicio y configuración de conexiones.

**Búsqueda** Custom Hook; Extensiones y APIs; Crear un hook que lee una conexión

**Para recordar** No abras conexiones durante __init__ de un operator.

#### Crear un hook que lee una conexión

```python
from airflow.sdk import BaseHook
class MiHook(BaseHook):
    def __init__(self, conn_id):
        super().__init__()
        self.conn_id = conn_id
    def host(self):
        return self.get_connection(self.conn_id).host
@task
def ver():
    return MiHook("ventas_pg").host()
ver()
```

Requiere una conexión registrada; no devuelve contraseña.

**Resultado esperado** Retorna el host configurado de ventas_pg.

### Custom Sensor

**Clave** `custom-sensor`

**Definición** Un sensor personalizado define una condición de disponibilidad mediante poke.

**Búsqueda** Custom Sensor; Extensiones y APIs; Esperar un archivo de control

**Para recordar** poke debe ser breve y no producir efectos secundarios innecesarios.

#### Esperar un archivo de control

```python
from airflow.sdk import BaseSensorOperator
class ReadySensor(BaseSensorOperator):
    def poke(self, context):
        return Path("/tmp/alldoc_airflow/ready.flag").exists()
ReadySensor(task_id="ready", poke_interval=5, timeout=60, mode="reschedule")
```

Crea el archivo desde una segunda terminal.

**Resultado esperado** Success al existir ready.flag; de lo contrario expira.

### Custom Trigger y deferral

**Clave** `custom-trigger-y-deferral`

**Definición** Un trigger personalizado ejecuta espera asíncrona y emite eventos que reanudan una tarea diferida.

**Búsqueda** Custom Trigger y deferral; Extensiones y APIs; Diseñar una espera reutilizable

**Para recordar** Usa clases serializables e I/O no bloqueante; el triggerer debe poder importarlas.

#### Diseñar una espera reutilizable

1. Crea una clase BaseTrigger con serialize() y run() asíncrono que emita TriggerEvent.
2. Instálala en scheduler, worker y triggerer.
3. En un operator compatible usa defer() y un método de reanudación.
4. Prueba que la tarea pase de deferred a success.

Consulta el contrato de BaseTrigger en la versión instalada; no es una función async arbitraria.

**Resultado esperado** El worker se libera durante la espera y la tarea se reanuda tras el evento.

### Custom Timetable

**Clave** `custom-timetable`

**Definición** Define un calendario propio implementando la interfaz de planificación de Airflow.

**Búsqueda** Custom Timetable; Extensiones y APIs; Diseñar calendario de días hábiles

**Para recordar** Prueba intervalos, zonas horarias y fechas límite antes de registrar el timetable.

#### Diseñar calendario de días hábiles

1. Implementa el contrato Timetable en un módulo importable.
2. Registra la clase mediante el mecanismo de extensión documentado.
3. Prueba un calendario que omita sábados y domingos.
4. Comprueba fechas próximas antes de activar el DAG.

Incluye pruebas de festivos si forman parte de la regla de negocio.

**Resultado esperado** Los runs calculados corresponden al calendario laboral definido.

### Plugins, listeners y cluster policies

**Clave** `plugins-listeners-y-cluster-policies`

**Definición** Plugins integran extensiones; listeners observan eventos; cluster policies aplican reglas organizacionales a DAGs y tareas.

**Búsqueda** Plugins, listeners y cluster policies; Extensiones y APIs; Comprobar políticas de un entorno

**Para recordar** El alcance y momento de ejecución son distintos; usa la interfaz soportada de cada uno.

#### Comprobar políticas de un entorno

```bash
airflow plugins
```

Para aplicar una política, registra una que exija tags o asigne un pool a tareas y valida importación en staging.

**Resultado esperado** Muestra plugins reconocidos por el entorno.

### Custom Providers y notifiers

**Clave** `custom-providers-y-notifiers`

**Definición** Un provider empaqueta integraciones y metadatos de descubrimiento; un notifier reutilizable encapsula una acción de notificación.

**Búsqueda** Custom Providers y notifiers; Extensiones y APIs; Validar un provider interno

**Para recordar** Fija dependencias compatibles y documenta conexiones requeridas.

#### Validar un provider interno

1. Empaqueta el hook/operator/notifier con metadata de provider.
2. Instálalo en un entorno de prueba.
3. Comprueba airflow providers list y ejecuta una tarea de prueba.

Consulta el contrato de provider y BaseNotifier de la versión.

**Resultado esperado** El provider aparece y su integración funciona con los recursos configurados.

### Task SDK y Python Client SDK

**Clave** `task-sdk-y-python-client-sdk`

**Definición** Task SDK sirve para autoría y ejecución de tareas; un cliente de API se usa para operaciones remotas de Airflow.

**Búsqueda** Task SDK y Python Client SDK; Extensiones y APIs; Inspeccionar un contexto mediante Task SDK

**Para recordar** No confundas acceso al contexto de una tarea con administración remota del entorno.

#### Inspeccionar un contexto mediante Task SDK

```python
@task
def contexto():
    return get_current_context()["run_id"]
contexto()
```

Para listar DAGs desde otra aplicación usa la API v2 o un cliente compatible.

**Resultado esperado** Devuelve el run_id sin acceder directamente a la metadata DB.

### Excepciones de Airflow

**Clave** `excepciones-de-airflow`

**Definición** AirflowSkipException omite una tarea; AirflowFailException marca fallo sin seguir reintentando; excepciones ordinarias siguen la política de retries.

**Búsqueda** Excepciones de Airflow; Extensiones y APIs; Omitir un lote vacío permitido

**Para recordar** Usa skip para ausencia válida de trabajo, fail para un error definitivo.

#### Omitir un lote vacío permitido

```python
from airflow.exceptions import AirflowSkipException
@task
def opcional():
    raise AirflowSkipException("No hay nuevos pedidos")
opcional()
```

La regla de las tareas posteriores decide si continúan.

**Resultado esperado** La tarea queda skipped.

### Custom Executor y XCom Backend

**Clave** `custom-executor-y-xcom-backend`

**Definición** Un executor personalizado adapta el despacho de tareas; un XCom backend personalizado adapta su almacenamiento y serialización.

**Búsqueda** Custom Executor y XCom Backend; Extensiones y APIs; Validar una extensión de infraestructura

**Para recordar** Son extensiones de infraestructura, no operadores de negocio.

#### Validar una extensión de infraestructura

1. Elige una interfaz documentada compatible con la versión.
2. Implementa y empaqueta la extensión.
3. Configúrala en un entorno aislado y ejecuta un DAG de prueba.
4. Comprueba fallos, serialización o reconciliación según corresponda.

No pruebes por primera vez un executor o backend personalizado en producción.

**Resultado esperado** La extensión funciona durante una ejecución normal y una recuperación controlada.

### Operator Extra Links

**Clave** `operator-extra-links`

**Definición** Añade enlaces contextualizados a una tarea, por ejemplo al job externo que inició.

**Búsqueda** Operator Extra Links; Extensiones y APIs; Enlazar un job externo desde la UI

**Para recordar** No incluyas credenciales ni datos sensibles en la URL.

#### Enlazar un job externo desde la UI

1. Implementa la clase de enlace según el contrato BaseOperatorLink de tu versión.
2. Regístrala en el operator o extensión.
3. Ejecuta la tarea y abre su detalle en la UI.

Usa IDs de jobs no sensibles y autorización del servicio destino.

**Resultado esperado** Aparece el enlace a la ejecución externa si la información necesaria está disponible.

## Compatibilidad Airflow 2 y 3

**Clave** `compatibilidad`

### Definición

**Clave** `definicion`

**Definición** Airflow 3 cambia interfaces públicas, arquitectura y algunos conceptos de programación respecto de Airflow 2.

**Búsqueda** Definición; Compatibilidad Airflow 2 y 3; Identificar versión instalada

**Para recordar** No mezcles imports y comandos de versiones distintas en un mismo ejemplo.

#### Identificar versión instalada

```bash
airflow version
```

Consulta documentación de esa versión y de los providers.

**Resultado esperado** Muestra la versión real.

### Imports y operators

**Clave** `imports-y-operators`

**Definición** Airflow 2.10 emplea airflow.decorators y módulos clásicos; en 3 se recomienda airflow.sdk y providers standard para operadores comunes.

**Búsqueda** Imports y operators; Compatibilidad Airflow 2 y 3; Comparar imports de tareas y BashOperator

**Para recordar** Migra imports y revisa parámetros eliminados.

#### Comparar imports de tareas y BashOperator

```python
# Airflow 2.10:
# from airflow.decorators import dag, task
# from airflow.operators.bash import BashOperator
# Airflow 3:
from airflow.sdk import dag, task
from airflow.providers.standard.operators.bash import BashOperator
```

El bloque es de nivel superior; descomenta solo la variante de tu entorno.

**Resultado esperado** En Airflow 3 con provider standard se importan las clases de la variante activa.

### Datasets, Assets y scheduling

**Clave** `datasets-assets-y-scheduling`

**Definición** Datasets era el nombre de la programación por datos en Airflow 2; Airflow 3 usa Assets y amplía capacidades de eventos.

**Búsqueda** Datasets, Assets y scheduling; Compatibilidad Airflow 2 y 3; Comparar identidades de datos

**Para recordar** Revisa schedule y timetable durante migraciones, no solo los nombres de clases.

#### Comparar identidades de datos

```python
# Airflow 2.10:
# from airflow.datasets import Dataset
# ventas = Dataset("s3://bucket/ventas.csv")
# Airflow 3:
from airflow.sdk import Asset
ventas = Asset("s3://bucket/ventas.csv")
```

Adapta también productores y consumidores al migrar.

**Resultado esperado** La declaración crea una identidad de datos, no un archivo en S3.

### Webserver, backfill y API

**Clave** `webserver-backfill-y-api`

**Definición** Airflow 3 usa API Server, REST API v2 y un nuevo sistema de backfill; Airflow 2 tiene comandos y rutas distintos.

**Búsqueda** Webserver, backfill y API; Compatibilidad Airflow 2 y 3; Inspeccionar comandos de Airflow 3

**Para recordar** Comprueba help y no ejecutes comandos administrativos antiguos a ciegas.

#### Inspeccionar comandos de Airflow 3

```bash
airflow api-server --help
airflow backfill create --help
```

En Airflow 2.10, consulta airflow webserver y airflow dags backfill; API /api/v1.

**Resultado esperado** Muestra opciones del API Server y backfill de Airflow 3.

### Migración y funcionalidades removidas

**Clave** `migracion-y-funcionalidades-removidas`

**Definición** SubDAGs, SLAs antiguos y acceso a internals requieren alternativas al migrar a Airflow 3.

**Búsqueda** Migración y funcionalidades removidas; Compatibilidad Airflow 2 y 3; Preparar una migración desde 2.10

**Para recordar** Valida dependencias y cambios de comportamiento antes de actualizar metadatos.

#### Preparar una migración desde 2.10

1. Inventaría imports, SubDAGs, SLA, schedule y API v1.
2. Sustituye por TaskGroups, Deadline Alerts cuando aplique y API v2.
3. Ejecuta las comprobaciones recomendadas de compatibilidad.
4. Prueba una copia de la metadata DB en staging.

Usa la guía oficial de actualización y un plan de reversión.

**Resultado esperado** Los DAGs migrados se importan y pasan las pruebas de ejecución.

## Pipeline de ventas de extremo a extremo

**Clave** `pipeline-ventas`

### Definición

**Clave** `definicion`

**Definición** Un pipeline completo conecta extracción, transformación, validación y publicación con dependencias explícitas.

**Búsqueda** Definición; Pipeline de ventas de extremo a extremo; Generar un resumen de ventas reproducible

**Para recordar** Primero valida los datos, después permite su consumo.

#### Generar un resumen de ventas reproducible

```python
@task
def extraer():
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        return list(csv.DictReader(f))
@task
def transformar(filas):
    completados = [r for r in filas if r["status"] == "completed"]
    return {"pedidos":len(completados), "ventas":sum(int(r["amount"]) for r in completados)}
@task
def publicar(resumen):
    if resumen["pedidos"] == 0:
        raise ValueError("Sin pedidos")
    import json
    Path("/tmp/alldoc_airflow/resumen.json").write_text(json.dumps(resumen))
publicar(transformar(extraer()))
```

Se usa XCom para cinco filas de demostración; en producción pasa una URI y procesa el archivo externamente.

**Resultado esperado** resumen.json contiene pedidos=4 y ventas=3000.

### Carga incremental y reprocesamiento

**Clave** `carga-incremental-y-reprocesamiento`

**Definición** Combina intervalos de datos, persistencia y validaciones para que un lote pueda repetirse sin duplicar resultados.

**Búsqueda** Carga incremental y reprocesamiento; Pipeline de ventas de extremo a extremo; Reprocesar un lote específico

**Para recordar** El mismo intervalo debe identificar el mismo conjunto lógico de datos.

#### Reprocesar un lote específico

```python
@task
def cargar_dia(dia):
    with open("/tmp/alldoc_airflow/orders.csv") as f:
        total = sum(int(r["amount"]) for r in csv.DictReader(f) if r["order_date"] == dia and r["status"] == "completed")
    Path(f"/tmp/alldoc_airflow/ventas-{dia}.txt").write_text(str(total))
    return total
cargar_dia("2026-09-02")
```

El día es un parámetro fijo para reproducir la práctica; en un run temporal derívalo de su intervalo.

**Resultado esperado** Retorna 1200; repetir deja el mismo archivo con 1200.

### Integración ELT y dashboard

**Clave** `integracion-elt-y-dashboard`

**Definición** Un flujo ELT puede cargar datos crudos al warehouse, ejecutar dbt, comprobar calidad y emitir un evento para consumo.

**Búsqueda** Integración ELT y dashboard; Pipeline de ventas de extremo a extremo; Construir el grafo de producción

**Para recordar** Publica el asset solo tras validar los modelos.

#### Construir el grafo de producción

```python
raw = EmptyOperator(task_id="cargar_raw")
modelos = EmptyOperator(task_id="dbt_build")
validar = EmptyOperator(task_id="validar_modelos")
publicar = EmptyOperator(task_id="publicar", outlets=[Asset("alldoc://ventas/modelos")])
raw >> modelos >> validar >> publicar
```

Son placeholders de orquestación, no una carga real. Sustitúyelos por los operators e integraciones de las fichas anteriores.

**Resultado esperado** El grafo tiene cuatro etapas; el evento se emite al finalizar la última.

## Fuentes

Referencias oficiales organizadas por comportamiento. Las páginas de providers con ruta `stable` pueden corresponder a una versión más reciente que la instalada: selecciona su versión exacta al implementar un ejemplo.

- [Instalación y laboratorio](https://airflow.apache.org/docs/apache-airflow/3.1.7/start.html)
- [Instalación con constraints y métodos soportados](https://airflow.apache.org/docs/apache-airflow/3.1.7/installation.html)
- [Arquitectura y componentes](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/overview.html)
- [DAGs, dependencias, documentación y trigger rules](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/dags.html)
- [Tasks, estados, timeouts y sensores](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/tasks.html)
- [TaskFlow API](https://airflow.apache.org/docs/apache-airflow/3.1.7/tutorial/taskflow.html)
- [Task SDK e interfaces públicas](https://airflow.apache.org/docs/apache-airflow/3.1.7/public-airflow-interface.html)
- [Task SDK, clases y contexto](https://airflow.apache.org/docs/task-sdk/stable/)
- [Programación y timetables](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/index.html)
- [DAG Runs, intervalos, catchup y backfill](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/dag-run.html)
- [CLI y variables de entorno](https://airflow.apache.org/docs/apache-airflow/3.1.7/cli-and-env-variables-ref.html)
- [XCom](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/xcoms.html)
- [Variables](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/variables.html)
- [Params](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/params.html)
- [Jinja y macros](https://airflow.apache.org/docs/apache-airflow/3.1.7/templates-ref.html)
- [Connections y secretos](https://airflow.apache.org/docs/apache-airflow/3.1.7/howto/connection.html)
- [Sensors](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/sensors.html)
- [Deferrable operators y triggers](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/deferring.html)
- [Setup y teardown](https://airflow.apache.org/docs/apache-airflow/3.1.7/howto/setup-and-teardown.html)
- [Callbacks](https://airflow.apache.org/docs/apache-airflow/3.1.7/administration-and-deployment/logging-monitoring/callbacks.html)
- [Deadline Alerts, experimental desde 3.1](https://airflow.apache.org/docs/apache-airflow/3.1.7/howto/deadline-alerts.html)
- [Dynamic DAG Generation](https://airflow.apache.org/docs/apache-airflow/3.1.7/howto/dynamic-dag-generation.html)
- [Dynamic Task Mapping](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/dynamic-task-mapping.html)
- [Assets y alias](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/assets.html)
- [Programación por assets](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/asset-scheduling.html)
- [Programación por eventos](https://airflow.apache.org/docs/apache-airflow/3.1.7/authoring-and-scheduling/event-scheduling.html)
- [Assets y particiones en versiones recientes](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/index.html)
- [Pools](https://airflow.apache.org/docs/apache-airflow/3.1.7/administration-and-deployment/pools.html)
- [Executors](https://airflow.apache.org/docs/apache-airflow/3.1.7/core-concepts/executor/index.html)
- [Best Practices: idempotencia, watcher, pruebas y parsing](https://airflow.apache.org/docs/apache-airflow/3.1.7/best-practices.html)
- [Tutorial y pruebas CLI](https://airflow.apache.org/docs/apache-airflow/3.1.7/tutorial/fundamentals.html)
- [Administración y despliegue](https://airflow.apache.org/docs/apache-airflow/3.1.7/administration-and-deployment/index.html)
- [Logging y métricas](https://airflow.apache.org/docs/apache-airflow/3.1.7/administration-and-deployment/logging-monitoring/index.html)
- [Producción](https://airflow.apache.org/docs/apache-airflow/3.1.7/administration-and-deployment/production-deployment.html)
- [Base de metadatos](https://airflow.apache.org/docs/apache-airflow/3.1.7/howto/initialize-database.html)
- [Seguridad](https://airflow.apache.org/docs/apache-airflow/3.1.7/security/index.html)
- [API REST estable](https://airflow.apache.org/docs/apache-airflow/3.1.7/stable-rest-api-ref.html)
- [Actualización a Airflow 3](https://airflow.apache.org/docs/apache-airflow/3.1.7/installation/upgrading_to_airflow3.html)
- [Documentación Airflow 2.10.5](https://airflow.apache.org/docs/apache-airflow/2.10.5/)
- [Providers y versiones](https://airflow.apache.org/docs/apache-airflow-providers/)
- [Standard: Bash, Python, sensores y otros operadores](https://airflow.apache.org/docs/apache-airflow-providers-standard/stable/)
- [Common SQL: operators, hooks y checks](https://airflow.apache.org/docs/apache-airflow-providers-common-sql/stable/)
- [PostgreSQL](https://airflow.apache.org/docs/apache-airflow-providers-postgres/stable/)
- [HTTP](https://airflow.apache.org/docs/apache-airflow-providers-http/stable/)
- [Object Storage XCom Backend](https://airflow.apache.org/docs/apache-airflow-providers-common-io/stable/xcom_backend.html)
- [AWS y S3](https://airflow.apache.org/docs/apache-airflow-providers-amazon/stable/)
- [Google Cloud](https://airflow.apache.org/docs/apache-airflow-providers-google/stable/)
- [Azure](https://airflow.apache.org/docs/apache-airflow-providers-microsoft-azure/stable/)
- [Snowflake](https://airflow.apache.org/docs/apache-airflow-providers-snowflake/stable/)
- [Spark](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/)
- [Databricks](https://airflow.apache.org/docs/apache-airflow-providers-databricks/stable/)
- [Docker](https://airflow.apache.org/docs/apache-airflow-providers-docker/stable/)
- [Kubernetes](https://airflow.apache.org/docs/apache-airflow-providers-cncf-kubernetes/stable/)
- [OpenLineage](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/)
- [Helm chart oficial](https://airflow.apache.org/docs/helm-chart/stable/)
- [dbt build](https://docs.getdbt.com/reference/commands/build)
