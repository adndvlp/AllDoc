// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const airflowCurriculum = [
  {
    "key": "orquestacion",
    "label": "Orquestación y DAGs",
    "children": [
      {
        "id": "analisis-de-datos/airflow/orquestacion/definicion",
        "label": "Definición",
        "description": "Airflow coordina tareas con dependencias y condiciones de ejecución; delega el trabajo a Python, SQL u otros servicios."
      },
      {
        "id": "analisis-de-datos/airflow/orquestacion/dag-y-aciclicidad",
        "label": "DAG y aciclicidad",
        "description": "Un DAG representa tareas conectadas por dependencias dirigidas que no forman ciclos."
      },
      {
        "id": "analisis-de-datos/airflow/orquestacion/etl-y-elt",
        "label": "ETL y ELT",
        "description": "ETL transforma antes de cargar; ELT carga datos crudos y transforma en el destino."
      },
      {
        "id": "analisis-de-datos/airflow/orquestacion/procesamiento-batch",
        "label": "Procesamiento batch",
        "description": "Procesa conjuntos delimitados de datos en ejecuciones independientes, en lugar de mantener un proceso de streaming continuo."
      }
    ]
  },
  {
    "key": "instalacion",
    "label": "Instalación y entorno",
    "children": [
      {
        "id": "analisis-de-datos/airflow/instalacion/definicion",
        "label": "Definición",
        "description": "Airflow necesita un entorno Python, una base de metadatos y servicios de ejecución."
      },
      {
        "id": "analisis-de-datos/airflow/instalacion/airflow-home-y-configuracion",
        "label": "AIRFLOW_HOME y configuración",
        "description": "AIRFLOW_HOME determina el directorio base del entorno; airflow.cfg y variables de entorno controlan su comportamiento."
      },
      {
        "id": "analisis-de-datos/airflow/instalacion/standalone",
        "label": "Standalone",
        "description": "Inicia los componentes necesarios de un entorno local en un solo comando."
      },
      {
        "id": "analisis-de-datos/airflow/instalacion/providers-y-constraints",
        "label": "Providers y constraints",
        "description": "Los providers aportan operadores, hooks y sensores para servicios específicos; constraints ayuda a fijar dependencias compatibles."
      },
      {
        "id": "analisis-de-datos/airflow/instalacion/docker-compose",
        "label": "Docker Compose",
        "description": "Ejecuta los componentes de un entorno de desarrollo en contenedores coordinados."
      }
    ]
  },
  {
    "key": "arquitectura",
    "label": "Arquitectura y componentes",
    "children": [
      {
        "id": "analisis-de-datos/airflow/arquitectura/definicion",
        "label": "Definición",
        "description": "Los componentes de Airflow separan definición, planificación, ejecución, estado y acceso web."
      },
      {
        "id": "analisis-de-datos/airflow/arquitectura/scheduler-y-executor",
        "label": "Scheduler y executor",
        "description": "El scheduler identifica tareas elegibles; el executor determina cómo se despachan a procesos o workers."
      },
      {
        "id": "analisis-de-datos/airflow/arquitectura/dag-processor-y-serializacion",
        "label": "DAG Processor y serialización",
        "description": "El procesador importa los archivos de DAGs y genera representaciones que otros componentes pueden consultar."
      },
      {
        "id": "analisis-de-datos/airflow/arquitectura/api-server-y-task-execution-api",
        "label": "API Server y Task Execution API",
        "description": "Airflow 3 usa un servidor API para la UI y para servicios de ejecución; el Task SDK evita que las tareas dependan directamente de la base de metadatos."
      },
      {
        "id": "analisis-de-datos/airflow/arquitectura/metadata-database",
        "label": "Metadata Database",
        "description": "Conserva DAG Runs, estados de tareas, configuración y otros metadatos de orquestación."
      },
      {
        "id": "analisis-de-datos/airflow/arquitectura/triggerer",
        "label": "Triggerer",
        "description": "Gestiona esperas asíncronas de tareas diferibles y comunica eventos de reanudación."
      }
    ]
  },
  {
    "key": "definir-dag",
    "label": "Definir un DAG",
    "children": [
      {
        "id": "analisis-de-datos/airflow/definir-dag/definicion",
        "label": "Definición",
        "description": "DAG() contiene las tareas, programación y parámetros que describen un flujo."
      },
      {
        "id": "analisis-de-datos/airflow/definir-dag/dag",
        "label": "@dag",
        "description": "El decorador convierte una función que construye tareas en una fábrica de DAGs."
      },
      {
        "id": "analisis-de-datos/airflow/definir-dag/identificadores-y-tags",
        "label": "Identificadores y tags",
        "description": "dag_id identifica el flujo, task_id identifica una tarea y tags permite clasificar DAGs."
      },
      {
        "id": "analisis-de-datos/airflow/definir-dag/default-args",
        "label": "Default args",
        "description": "default_args aporta valores comunes a las tareas que no los sobrescriben."
      },
      {
        "id": "analisis-de-datos/airflow/definir-dag/documentacion-del-dag-y-tareas",
        "label": "Documentación del DAG y tareas",
        "description": "doc_md permite añadir documentación contextual; description resume el DAG."
      }
    ]
  },
  {
    "key": "tareas-dependencias",
    "label": "Tareas y dependencias",
    "children": [
      {
        "id": "analisis-de-datos/airflow/tareas-dependencias/definicion",
        "label": "Definición",
        "description": "Una tarea es un paso definido en el DAG; una Task Instance es su ejecución en un DAG Run concreto."
      },
      {
        "id": "analisis-de-datos/airflow/tareas-dependencias/dependencias-y",
        "label": "Dependencias >> y <<",
        "description": "Los operadores de desplazamiento declaran qué tareas deben preceder a otras."
      },
      {
        "id": "analisis-de-datos/airflow/tareas-dependencias/set-upstream-y-set-downstream",
        "label": "set_upstream y set_downstream",
        "description": "Métodos explícitos para declarar dependencias sin operadores simbólicos."
      },
      {
        "id": "analisis-de-datos/airflow/tareas-dependencias/fan-out-y-fan-in",
        "label": "Fan-out y fan-in",
        "description": "Fan-out abre varias ramas; fan-in reúne las ramas antes de continuar."
      },
      {
        "id": "analisis-de-datos/airflow/tareas-dependencias/taskgroup",
        "label": "TaskGroup",
        "description": "Agrupa tareas visualmente y organiza sus identificadores sin crear un DAG independiente."
      }
    ]
  },
  {
    "key": "taskflow",
    "label": "TaskFlow API",
    "children": [
      {
        "id": "analisis-de-datos/airflow/taskflow/definicion",
        "label": "Definición",
        "description": "@task transforma una función Python en una tarea y representa su retorno mediante XComArg."
      },
      {
        "id": "analisis-de-datos/airflow/taskflow/argumentos-y-dependencias-implicitas",
        "label": "Argumentos y dependencias implícitas",
        "description": "Pasar el resultado de una tarea a otra establece la dependencia y resuelve el valor en ejecución."
      },
      {
        "id": "analisis-de-datos/airflow/taskflow/multiples-salidas",
        "label": "Múltiples salidas",
        "description": "multiple_outputs=True publica las entradas de un diccionario con claves separadas en XCom."
      },
      {
        "id": "analisis-de-datos/airflow/taskflow/task-group",
        "label": "@task_group",
        "description": "El decorador permite construir grupos de tareas reutilizables."
      }
    ]
  },
  {
    "key": "operators",
    "label": "Operators",
    "children": [
      {
        "id": "analisis-de-datos/airflow/operators/definicion",
        "label": "Definición",
        "description": "Un operator encapsula una acción que Airflow puede ejecutar como tarea."
      },
      {
        "id": "analisis-de-datos/airflow/operators/emptyoperator",
        "label": "EmptyOperator",
        "description": "Crea un nodo sin trabajo de negocio, útil para marcar puntos de unión."
      },
      {
        "id": "analisis-de-datos/airflow/operators/pythonoperator",
        "label": "PythonOperator",
        "description": "Ejecuta una función Python tradicional con argumentos opcionales."
      },
      {
        "id": "analisis-de-datos/airflow/operators/bashoperator-y-task-bash",
        "label": "BashOperator y @task.bash",
        "description": "Ejecutan un comando de shell; la variante decorada devuelve el comando a ejecutar."
      },
      {
        "id": "analisis-de-datos/airflow/operators/sqlexecutequeryoperator",
        "label": "SQLExecuteQueryOperator",
        "description": "Ejecuta SQL contra una conexión configurada mediante el provider de base de datos."
      },
      {
        "id": "analisis-de-datos/airflow/operators/pythonvirtualenvoperator-y-externalpythonoperator",
        "label": "PythonVirtualenvOperator y ExternalPythonOperator",
        "description": "Permiten ejecutar una función con dependencias distintas del entorno principal, creando un entorno o usando uno existente."
      },
      {
        "id": "analisis-de-datos/airflow/operators/task-bash",
        "label": "@task.bash",
        "description": "El decorador convierte una función que devuelve un comando de shell en una tarea Bash."
      },
      {
        "id": "analisis-de-datos/airflow/operators/externalpythonoperator",
        "label": "ExternalPythonOperator",
        "description": "Usa un intérprete Python de un entorno previamente existente."
      }
    ]
  },
  {
    "key": "connections-hooks",
    "label": "Hooks, Connections y secretos",
    "children": [
      {
        "id": "analisis-de-datos/airflow/connections-hooks/definicion",
        "label": "Definición",
        "description": "Una Connection describe cómo acceder a un servicio; un Hook proporciona métodos para interactuar con él."
      },
      {
        "id": "analisis-de-datos/airflow/connections-hooks/crear-una-conexion",
        "label": "Crear una conexión",
        "description": "Las conexiones se pueden registrar en la UI, CLI, variables de entorno o backends de secretos."
      },
      {
        "id": "analisis-de-datos/airflow/connections-hooks/postgreshook",
        "label": "PostgresHook",
        "description": "Expone métodos para ejecutar SQL o recuperar filas de PostgreSQL."
      },
      {
        "id": "analisis-de-datos/airflow/connections-hooks/airflow-conn",
        "label": "AIRFLOW_CONN_*",
        "description": "Una variable AIRFLOW_CONN_<ID> puede resolver una conexión sin crearla en la base de metadatos."
      },
      {
        "id": "analisis-de-datos/airflow/connections-hooks/secrets-backends",
        "label": "Secrets Backends",
        "description": "Resuelven conexiones y variables desde un sistema externo, como Vault o un servicio de secretos cloud."
      }
    ]
  },
  {
    "key": "schedule",
    "label": "Programación temporal",
    "children": [
      {
        "id": "analisis-de-datos/airflow/schedule/definicion",
        "label": "Definición",
        "description": "schedule define cuándo se crean ejecuciones automáticas del DAG."
      },
      {
        "id": "analisis-de-datos/airflow/schedule/cron-y-presets",
        "label": "Cron y presets",
        "description": "Cron expresa un calendario de cinco campos; presets como @daily y @hourly representan frecuencias comunes."
      },
      {
        "id": "analisis-de-datos/airflow/schedule/intervalos-timedelta",
        "label": "Intervalos timedelta",
        "description": "Un timedelta representa una duración entre intervalos, no necesariamente una hora fija del calendario."
      },
      {
        "id": "analisis-de-datos/airflow/schedule/start-date-y-end-date",
        "label": "start_date y end_date",
        "description": "Delimitan la elegibilidad temporal del calendario; start_date no es una instrucción para ejecutar una tarea a esa hora exacta."
      },
      {
        "id": "analisis-de-datos/airflow/schedule/zonas-horarias",
        "label": "Zonas horarias",
        "description": "Pendulum permite especificar la zona horaria del calendario."
      },
      {
        "id": "analisis-de-datos/airflow/schedule/timetables",
        "label": "Timetables",
        "description": "Un timetable calcula las fechas e intervalos de los runs; permite calendarios no representables con cron."
      }
    ]
  },
  {
    "key": "dag-runs",
    "label": "DAG Runs, intervalos y backfill",
    "children": [
      {
        "id": "analisis-de-datos/airflow/dag-runs/definicion",
        "label": "Definición",
        "description": "Un DAG Run es una ejecución concreta del flujo, manual, programada o iniciada por un evento."
      },
      {
        "id": "analisis-de-datos/airflow/dag-runs/logical-date-e-intervalo-de-datos",
        "label": "logical_date e intervalo de datos",
        "description": "logical_date representa la referencia temporal lógica del run; data_interval_start y data_interval_end delimitan el lote cuando existen."
      },
      {
        "id": "analisis-de-datos/airflow/dag-runs/catchup",
        "label": "Catchup",
        "description": "Controla si el scheduler genera ejecuciones de intervalos pasados que faltan."
      },
      {
        "id": "analisis-de-datos/airflow/dag-runs/backfill",
        "label": "Backfill",
        "description": "Crea ejecuciones históricas para un rango de fechas de un DAG con calendario temporal."
      },
      {
        "id": "analisis-de-datos/airflow/dag-runs/reprocesamiento-y-clearing",
        "label": "Reprocesamiento y clearing",
        "description": "Backfill crea runs según una política; clearing reinicia el estado de instancias existentes para que puedan volver a ejecutarse."
      }
    ]
  },
  {
    "key": "xcom",
    "label": "XCom y almacenamiento de resultados",
    "children": [
      {
        "id": "analisis-de-datos/airflow/xcom/definicion",
        "label": "Definición",
        "description": "XCom intercambia valores pequeños y metadatos entre tareas de un run."
      },
      {
        "id": "analisis-de-datos/airflow/xcom/xcom-push-y-xcom-pull",
        "label": "xcom_push y xcom_pull",
        "description": "Permiten publicar y recuperar valores con claves explícitas desde el contexto de una tarea."
      },
      {
        "id": "analisis-de-datos/airflow/xcom/output-y-xcomarg",
        "label": ".output y XComArg",
        "description": ".output de un operator representa el XCom de retorno; XComArg permite referenciarlo antes de ejecutarse."
      },
      {
        "id": "analisis-de-datos/airflow/xcom/almacenamiento-compartido",
        "label": "Almacenamiento compartido",
        "description": "Para resultados grandes, almacena datos fuera de XCom y pasa solo URI, clave o conteo."
      },
      {
        "id": "analisis-de-datos/airflow/xcom/object-storage-xcom-backend",
        "label": "Object Storage XCom Backend",
        "description": "Permite guardar XCom que supera un umbral en almacenamiento de objetos y mantener una referencia en la base de metadatos."
      },
      {
        "id": "analisis-de-datos/airflow/xcom/serializacion",
        "label": "Serialización",
        "description": "Los valores compartidos deben poder serializarse y reconstruirse por Airflow; tipos simples son los más portables."
      }
    ]
  },
  {
    "key": "configuracion-tareas",
    "label": "Variables, Params y contexto",
    "children": [
      {
        "id": "analisis-de-datos/airflow/configuracion-tareas/definicion",
        "label": "Definición",
        "description": "Variables contienen configuración global; Params describen entradas de un run; el contexto ofrece metadatos de ejecución."
      },
      {
        "id": "analisis-de-datos/airflow/configuracion-tareas/variables-y-entorno",
        "label": "Variables y entorno",
        "description": "AIRFLOW_VAR_<KEY> permite definir un valor sin guardarlo mediante UI."
      },
      {
        "id": "analisis-de-datos/airflow/configuracion-tareas/params-y-validacion",
        "label": "Params y validación",
        "description": "Param permite definir valores predeterminados y restricciones JSON Schema para entradas del DAG."
      },
      {
        "id": "analisis-de-datos/airflow/configuracion-tareas/dag-run-conf",
        "label": "dag_run.conf",
        "description": "Contiene configuración aportada al disparar una ejecución; no sustituye automáticamente la validación de Params."
      },
      {
        "id": "analisis-de-datos/airflow/configuracion-tareas/get-current-context",
        "label": "get_current_context",
        "description": "Devuelve el contexto de ejecución de una tarea."
      }
    ]
  },
  {
    "key": "templates",
    "label": "Templates Jinja y macros",
    "children": [
      {
        "id": "analisis-de-datos/airflow/templates/definicion",
        "label": "Definición",
        "description": "Airflow renderiza campos templados con valores del contexto mediante Jinja."
      },
      {
        "id": "analisis-de-datos/airflow/templates/intervalos-ds-y-ts",
        "label": "Intervalos, ds y ts",
        "description": "ds y ts formatean la fecha lógica cuando existe; para filtrar datos usa los límites del intervalo."
      },
      {
        "id": "analisis-de-datos/airflow/templates/macros",
        "label": "Macros",
        "description": "macros contiene utilidades disponibles durante el renderizado Jinja."
      },
      {
        "id": "analisis-de-datos/airflow/templates/renderizado-y-tipos",
        "label": "Renderizado y tipos",
        "description": "render_template_as_native_obj permite conservar tipos nativos en campos templados cuando corresponda."
      }
    ]
  },
  {
    "key": "sensors",
    "label": "Sensores y esperas",
    "children": [
      {
        "id": "analisis-de-datos/airflow/sensors/definicion",
        "label": "Definición",
        "description": "Un sensor espera hasta que una condición externa se cumpla o se alcance su límite de espera."
      },
      {
        "id": "analisis-de-datos/airflow/sensors/filesensor",
        "label": "FileSensor",
        "description": "Espera que exista un archivo o patrón en el filesystem configurado."
      },
      {
        "id": "analisis-de-datos/airflow/sensors/httpsensor",
        "label": "HttpSensor",
        "description": "Consulta un endpoint HTTP hasta recibir una respuesta que cumpla una condición."
      },
      {
        "id": "analisis-de-datos/airflow/sensors/sqlsensor",
        "label": "SqlSensor",
        "description": "Ejecuta una consulta periódicamente y evalúa la condición devuelta."
      },
      {
        "id": "analisis-de-datos/airflow/sensors/poke-y-reschedule",
        "label": "Poke y reschedule",
        "description": "poke conserva el slot mientras espera; reschedule libera el slot entre comprobaciones."
      },
      {
        "id": "analisis-de-datos/airflow/sensors/deferrable-operators",
        "label": "Deferrable operators",
        "description": "Delegan la espera a un trigger asíncrono; cuando hay un evento la tarea vuelve a ser elegible para ejecución."
      }
    ]
  },
  {
    "key": "control-ejecucion",
    "label": "Control de ejecución y recuperación",
    "children": [
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/definicion",
        "label": "Definición",
        "description": "Airflow decide el estado de cada instancia según resultado, dependencias, política de reintentos y límites de tiempo."
      },
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/retries-y-retry-delay",
        "label": "Retries y retry_delay",
        "description": "retries indica intentos adicionales después del primero; retry_delay fija la espera base."
      },
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/retry-exponential-backoff",
        "label": "Retry exponential backoff",
        "description": "Aumenta la espera entre reintentos para no saturar un servicio que está fallando."
      },
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/execution-timeout",
        "label": "Execution timeout",
        "description": "Limita la duración de cada intento de una tarea."
      },
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/depends-on-past",
        "label": "Depends on past",
        "description": "Exige que la instancia anterior de la misma tarea cumpla la condición histórica requerida."
      },
      {
        "id": "analisis-de-datos/airflow/control-ejecucion/estados-de-task-instance",
        "label": "Estados de Task Instance",
        "description": "scheduled, queued, running, success, failed, skipped, upstream_failed, up_for_retry, deferred y up_for_reschedule describen fases diferentes."
      }
    ]
  },
  {
    "key": "trigger-rules",
    "label": "Trigger rules y ramas",
    "children": [
      {
        "id": "analisis-de-datos/airflow/trigger-rules/definicion",
        "label": "Definición",
        "description": "trigger_rule determina qué estados de los antecedentes directos permiten ejecutar una tarea."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/all-done-y-one-failed",
        "label": "All done y one failed",
        "description": "all_done espera a que terminen todos los antecedentes; one_failed permite reaccionar ante un fallo sin esperar a todos."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/one-success",
        "label": "One success",
        "description": "one_success permite continuar si al menos un antecedente termina correctamente."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/branching",
        "label": "Branching",
        "description": "Una tarea de ramificación selecciona qué identificadores de tareas seguir; las ramas no elegidas se omiten."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/unir-ramas",
        "label": "Unir ramas",
        "description": "none_failed_min_one_success permite converger cuando no hubo fallos y al menos una rama se ejecutó con éxito."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/shortcircuitoperator",
        "label": "ShortCircuitOperator",
        "description": "Omite tareas posteriores cuando una condición devuelve falso."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/latestonlyoperator",
        "label": "LatestOnlyOperator",
        "description": "Omite tareas dependientes en ejecuciones programadas que no son la más reciente según su lógica temporal."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/setup-y-teardown",
        "label": "Setup y teardown",
        "description": "Marcan tareas de preparación y limpieza para gestionar recursos de una ejecución."
      },
      {
        "id": "analisis-de-datos/airflow/trigger-rules/watcher-pattern",
        "label": "Watcher pattern",
        "description": "Una tarea hoja con one_failed y fallo explícito permite conservar el fallo del run cuando hay tareas de limpieza con all_done."
      }
    ]
  },
  {
    "key": "alertas",
    "label": "Callbacks, notificaciones y alertas",
    "children": [
      {
        "id": "analisis-de-datos/airflow/alertas/definicion",
        "label": "Definición",
        "description": "Los callbacks reaccionan a eventos de ejecución, como fallos y reintentos; los notifiers permiten reutilizar integraciones de alertas."
      },
      {
        "id": "analisis-de-datos/airflow/alertas/callbacks-de-exito-y-reintento",
        "label": "Callbacks de éxito y reintento",
        "description": "on_success_callback y on_retry_callback reaccionan a resultados distintos."
      },
      {
        "id": "analisis-de-datos/airflow/alertas/notifiers",
        "label": "Notifiers",
        "description": "Encapsulan la entrega de mensajes a un destino, como Slack o correo, mediante una integración."
      },
      {
        "id": "analisis-de-datos/airflow/alertas/deadline-alerts-y-sla",
        "label": "Deadline Alerts y SLA",
        "description": "Deadline Alerts permite alertar cuando un run supera un umbral relativo a una referencia temporal; SLA era la característica histórica de Airflow 2."
      }
    ]
  },
  {
    "key": "dag-generacion",
    "label": "Dynamic DAG Generation",
    "children": [
      {
        "id": "analisis-de-datos/airflow/dag-generacion/definicion",
        "label": "Definición",
        "description": "Genera estructuras de DAG durante el parsing a partir de configuración conocida antes de ejecutar."
      },
      {
        "id": "analisis-de-datos/airflow/dag-generacion/dag-factories",
        "label": "DAG factories",
        "description": "Una fábrica genera DAGs con una estructura reutilizable y parámetros propios."
      },
      {
        "id": "analisis-de-datos/airflow/dag-generacion/configuracion-declarativa",
        "label": "Configuración declarativa",
        "description": "Una lista, JSON o YAML local puede representar parámetros de DAGs sin duplicar código."
      }
    ]
  },
  {
    "key": "task-mapping",
    "label": "Dynamic Task Mapping",
    "children": [
      {
        "id": "analisis-de-datos/airflow/task-mapping/definicion",
        "label": "Definición",
        "description": "Dynamic Task Mapping crea instancias de una tarea durante la ejecución a partir de valores obtenidos en ese run."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/expand-con-resultado-upstream",
        "label": "expand con resultado upstream",
        "description": "Una tarea puede devolver una lista que determine el número de instancias de otra tarea."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/partial-y-expand",
        "label": "partial y expand",
        "description": "partial fija argumentos que no cambian; expand asigna los que varían por instancia."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/expand-kwargs",
        "label": "expand_kwargs",
        "description": "Expande una lista de diccionarios; cada diccionario aporta un conjunto de argumentos para una instancia."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/map-zip-y-concat",
        "label": "Map, zip y concat",
        "description": "Los XComArg admiten transformaciones previas al mapping: map aplica una función, zip empareja y concat une secuencias."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/map-reduce",
        "label": "Map-reduce",
        "description": "Una tarea posterior puede reunir los resultados de todas las instancias mapeadas."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/mapped-taskgroups",
        "label": "Mapped TaskGroups",
        "description": "Un grupo de tareas puede expandirse para ejecutar varias etapas por cada entrada."
      },
      {
        "id": "analisis-de-datos/airflow/task-mapping/map-y-concat",
        "label": "map y concat",
        "description": "map transforma valores antes de expandir; concat permite combinar secuencias de XComArg."
      }
    ]
  },
  {
    "key": "assets",
    "label": "Assets y dependencias entre DAGs",
    "children": [
      {
        "id": "analisis-de-datos/airflow/assets/definicion",
        "label": "Definición",
        "description": "Un Asset identifica un recurso de datos; un evento de actualización puede programar DAGs consumidores."
      },
      {
        "id": "analisis-de-datos/airflow/assets/inlets-outlets-y-metadatos",
        "label": "Inlets, outlets y metadatos",
        "description": "outlets declara qué assets actualiza una tarea; inlets permite consultar metadatos de entradas."
      },
      {
        "id": "analisis-de-datos/airflow/assets/condiciones-de-assets",
        "label": "Condiciones de assets",
        "description": "Un calendario puede exigir actualizaciones de varios assets mediante AND o aceptar cualquiera mediante OR."
      },
      {
        "id": "analisis-de-datos/airflow/assets/assetalias",
        "label": "AssetAlias",
        "description": "Permite declarar una salida cuyo asset concreto se resuelve en tiempo de ejecución."
      },
      {
        "id": "analisis-de-datos/airflow/assets/assetwatcher-y-eventos-externos",
        "label": "AssetWatcher y eventos externos",
        "description": "Un watcher conecta un asset con un trigger compatible con eventos externos, por ejemplo una cola de mensajes."
      },
      {
        "id": "analisis-de-datos/airflow/assets/calendario-combinado",
        "label": "Calendario combinado",
        "description": "AssetOrTimeSchedule permite que un flujo responda a eventos de assets y a un calendario temporal."
      },
      {
        "id": "analisis-de-datos/airflow/assets/asset-partitioning",
        "label": "Asset partitioning",
        "description": "Permite representar unidades concretas de datos, como días, dentro de un asset en versiones que lo soportan."
      },
      {
        "id": "analisis-de-datos/airflow/assets/triggerdagrunoperator",
        "label": "TriggerDagRunOperator",
        "description": "Inicia otro DAG explícitamente y puede transmitir configuración."
      },
      {
        "id": "analisis-de-datos/airflow/assets/externaltasksensor",
        "label": "ExternalTaskSensor",
        "description": "Espera una ejecución o tarea de otro DAG asociada a una fecha lógica compatible."
      }
    ]
  },
  {
    "key": "concurrencia",
    "label": "Concurrencia y capacidad",
    "children": [
      {
        "id": "analisis-de-datos/airflow/concurrencia/definicion",
        "label": "Definición",
        "description": "Airflow limita las tareas y runs simultáneos para proteger workers y servicios externos."
      },
      {
        "id": "analisis-de-datos/airflow/concurrencia/parallelism-y-max-active-tasks",
        "label": "Parallelism y max_active_tasks",
        "description": "parallelism limita capacidad global por scheduler; max_active_tasks limita instancias en ejecución de un DAG entre sus runs."
      },
      {
        "id": "analisis-de-datos/airflow/concurrencia/limites-por-tarea",
        "label": "Límites por tarea",
        "description": "max_active_tis_per_dag controla instancias simultáneas de una tarea entre runs; también hay límites por run."
      },
      {
        "id": "analisis-de-datos/airflow/concurrencia/pools-y-pool-slots",
        "label": "Pools y pool_slots",
        "description": "Los pools reservan una cantidad de slots para recursos compartidos; pool_slots indica cuántos consume una tarea."
      },
      {
        "id": "analisis-de-datos/airflow/concurrencia/priority-weight",
        "label": "Priority weight",
        "description": "priority_weight ayuda al scheduler a priorizar tareas que compiten por capacidad disponible."
      },
      {
        "id": "analisis-de-datos/airflow/concurrencia/queues",
        "label": "Queues",
        "description": "Con executors que soportan colas, queue selecciona una cola de trabajo."
      }
    ]
  },
  {
    "key": "executors",
    "label": "Executors y workers",
    "children": [
      {
        "id": "analisis-de-datos/airflow/executors/definicion",
        "label": "Definición",
        "description": "Un executor conecta las decisiones del scheduler con el mecanismo de ejecución de tareas."
      },
      {
        "id": "analisis-de-datos/airflow/executors/localexecutor",
        "label": "LocalExecutor",
        "description": "Ejecuta tareas en procesos locales de la infraestructura del scheduler."
      },
      {
        "id": "analisis-de-datos/airflow/executors/celeryexecutor",
        "label": "CeleryExecutor",
        "description": "Distribuye trabajo a workers mediante Celery y un broker de mensajes."
      },
      {
        "id": "analisis-de-datos/airflow/executors/kubernetesexecutor",
        "label": "KubernetesExecutor",
        "description": "Crea pods de ejecución para tareas en un clúster Kubernetes."
      }
    ]
  },
  {
    "key": "integraciones",
    "label": "Integraciones y providers",
    "children": [
      {
        "id": "analisis-de-datos/airflow/integraciones/definicion",
        "label": "Definición",
        "description": "Los providers conectan Airflow con sistemas externos usando operators, sensors y hooks específicos."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/rest-apis-y-httphook",
        "label": "REST APIs y HttpHook",
        "description": "Un hook HTTP ejecuta solicitudes contra una Connection HTTP."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/mysql-postgresql-y-sql-server",
        "label": "MySQL, PostgreSQL y SQL Server",
        "description": "Los motores SQL usan providers y conexiones específicos, pero pueden compartir SQLExecuteQueryOperator."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/object-storage-s3-gcs-y-azure-blob",
        "label": "Object storage: S3, GCS y Azure Blob",
        "description": "Almacenan archivos accesibles desde procesos distintos; Airflow puede orquestar transferencias mediante hooks y operators."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/bigquery-snowflake-y-redshift",
        "label": "BigQuery, Snowflake y Redshift",
        "description": "Los warehouses ejecutan consultas y cargas dentro de sus propios motores; Airflow controla su secuencia y estado."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/pandas-y-parquet",
        "label": "pandas y Parquet",
        "description": "Una tarea Python puede transformar un lote pequeño con pandas y escribir un formato de archivo."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/dbt",
        "label": "dbt",
        "description": "Airflow puede ejecutar dbt para transformar datos en el warehouse y ordenar la ejecución con otras fuentes."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/pyspark-y-sparksubmitoperator",
        "label": "PySpark y SparkSubmitOperator",
        "description": "Airflow puede enviar una aplicación Spark a un motor de ejecución distribuido."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/databricks",
        "label": "Databricks",
        "description": "El provider de Databricks inicia o supervisa jobs en un workspace."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/dockeroperator",
        "label": "DockerOperator",
        "description": "Ejecuta una tarea dentro de una imagen Docker."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/kubernetespodoperator",
        "label": "KubernetesPodOperator",
        "description": "Lanza un pod de Kubernetes como tarea, incluso con un executor diferente a KubernetesExecutor."
      },
      {
        "id": "analisis-de-datos/airflow/integraciones/csv-y-json",
        "label": "CSV y JSON",
        "description": "Los formatos CSV y JSON pueden ser entradas o salidas de tareas de Python."
      }
    ]
  },
  {
    "key": "ingenieria-pipelines",
    "label": "Ingeniería de pipelines",
    "children": [
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/definicion",
        "label": "Definición",
        "description": "Un pipeline de datos fiable procesa lotes definidos, valida sus entradas y persiste resultados que pueden reproducirse."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/full-load-e-incremental-load",
        "label": "Full load e incremental load",
        "description": "Una carga completa reemplaza o reconstruye el conjunto; una incremental procesa solo las filas nuevas o modificadas."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/idempotencia",
        "label": "Idempotencia",
        "description": "Una tarea idempotente produce el mismo estado final si se repite con la misma entrada."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/watermarks-y-datos-tardios",
        "label": "Watermarks y datos tardíos",
        "description": "Un watermark registra hasta qué punto se confirmó el procesamiento; datos tardíos pueden aparecer por detrás de ese punto."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/deduplicacion",
        "label": "Deduplicación",
        "description": "Elimina repeticiones a partir de una clave de negocio y una regla de precedencia."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/particionamiento-de-datos",
        "label": "Particionamiento de datos",
        "description": "Separa datasets por fecha u otra dimensión para limitar la lectura, escritura y recuperación."
      },
      {
        "id": "analisis-de-datos/airflow/ingenieria-pipelines/atomicidad-y-recuperacion",
        "label": "Atomicidad y recuperación",
        "description": "Una carga atómica evita publicar resultados parciales; los efectos secundarios deben poder recuperarse o compensarse."
      }
    ]
  },
  {
    "key": "calidad-linaje",
    "label": "Calidad de datos y linaje",
    "children": [
      {
        "id": "analisis-de-datos/airflow/calidad-linaje/definicion",
        "label": "Definición",
        "description": "Data quality verifica que los datos satisfagan reglas antes de que otros procesos los consuman."
      },
      {
        "id": "analisis-de-datos/airflow/calidad-linaje/validar-esquema-nulos-y-claves",
        "label": "Validar esquema, nulos y claves",
        "description": "Comprueba columnas requeridas, presencia de valores y unicidad de identificadores."
      },
      {
        "id": "analisis-de-datos/airflow/calidad-linaje/sqlcheckoperator",
        "label": "SQLCheckOperator",
        "description": "Ejecuta una consulta que devuelve valores evaluables como verdaderos; un resultado falso hace fallar la comprobación."
      },
      {
        "id": "analisis-de-datos/airflow/calidad-linaje/data-lineage-y-openlineage",
        "label": "Data lineage y OpenLineage",
        "description": "El linaje registra relaciones entre entradas, procesos y salidas; OpenLineage ofrece un estándar para emitir eventos."
      }
    ]
  },
  {
    "key": "testing",
    "label": "Testing y debugging",
    "children": [
      {
        "id": "analisis-de-datos/airflow/testing/definicion",
        "label": "Definición",
        "description": "Las pruebas verifican importación, estructura, lógica de tareas e integración con servicios."
      },
      {
        "id": "analisis-de-datos/airflow/testing/prueba-unitaria-y-pytest",
        "label": "Prueba unitaria y pytest",
        "description": "Una función de negocio independiente puede probarse sin scheduler ni base de metadatos."
      },
      {
        "id": "analisis-de-datos/airflow/testing/mocking",
        "label": "Mocking",
        "description": "Sustituye una dependencia externa por un objeto controlado para probar lógica sin red ni credenciales."
      },
      {
        "id": "analisis-de-datos/airflow/testing/dagbag-e-importacion",
        "label": "DagBag e importación",
        "description": "DagBag fue una interfaz habitual en pruebas de importación de Airflow 2; en Airflow 3 conviene evitar depender de estructuras internas."
      },
      {
        "id": "analisis-de-datos/airflow/testing/airflow-tasks-test",
        "label": "airflow tasks test",
        "description": "Ejecuta una tarea localmente para depurar su comportamiento sin esperar el flujo normal de dependencias."
      },
      {
        "id": "analisis-de-datos/airflow/testing/airflow-dags-test-y-dag-test",
        "label": "airflow dags test y dag.test()",
        "description": "Ejecutan localmente un flujo completo para depurar dependencias y código."
      },
      {
        "id": "analisis-de-datos/airflow/testing/pruebas-de-integracion",
        "label": "Pruebas de integración",
        "description": "Verifican conexiones y contratos con servicios reales de prueba, además de la lógica local."
      }
    ]
  },
  {
    "key": "operacion",
    "label": "Interfaz, CLI y REST API",
    "children": [
      {
        "id": "analisis-de-datos/airflow/operacion/definicion",
        "label": "Definición",
        "description": "La UI, CLI y API permiten inspeccionar y operar DAGs y tareas sin editar su código."
      },
      {
        "id": "analisis-de-datos/airflow/operacion/grid-y-graph",
        "label": "Grid y Graph",
        "description": "Grid organiza estados por runs y tareas; Graph representa dependencias del flujo."
      },
      {
        "id": "analisis-de-datos/airflow/operacion/logs-y-rendered-templates",
        "label": "Logs y rendered templates",
        "description": "Los logs muestran la ejecución de una instancia; las plantillas renderizadas permiten inspeccionar sus parámetros efectivos."
      },
      {
        "id": "analisis-de-datos/airflow/operacion/pause-unpause-y-trigger",
        "label": "Pause, unpause y trigger",
        "description": "Pausar deshabilita planificación normal; activar habilita la programación; trigger solicita un nuevo run."
      },
      {
        "id": "analisis-de-datos/airflow/operacion/rest-api-v2",
        "label": "REST API v2",
        "description": "La API estable permite automatizar operaciones mediante HTTP con autenticación y permisos adecuados."
      }
    ]
  },
  {
    "key": "observabilidad",
    "label": "Observabilidad y diagnóstico",
    "children": [
      {
        "id": "analisis-de-datos/airflow/observabilidad/definicion",
        "label": "Definición",
        "description": "Observabilidad combina logs, métricas y eventos para entender el estado del orquestador y sus pipelines."
      },
      {
        "id": "analisis-de-datos/airflow/observabilidad/health-checks-y-heartbeats",
        "label": "Health checks y heartbeats",
        "description": "Los heartbeats indican actividad de componentes y tareas; health checks detectan problemas de conectividad o actividad."
      },
      {
        "id": "analisis-de-datos/airflow/observabilidad/tareas-huerfanas-y-timeout-de-heartbeat",
        "label": "Tareas huérfanas y timeout de heartbeat",
        "description": "Una tarea puede perder contacto con su proceso de ejecución; el scheduler detecta instancias sin heartbeat según configuración y estado."
      },
      {
        "id": "analisis-de-datos/airflow/observabilidad/metricas-y-alertas-de-infraestructura",
        "label": "Métricas y alertas de infraestructura",
        "description": "Airflow puede emitir métricas a sistemas como StatsD u OpenTelemetry; Prometheus/Grafana pueden visualizarlas mediante integraciones adecuadas."
      },
      {
        "id": "analisis-de-datos/airflow/observabilidad/remote-logging",
        "label": "Remote logging",
        "description": "Permite conservar logs fuera de workers efímeros en almacenamiento remoto o servicios de logging."
      },
      {
        "id": "analisis-de-datos/airflow/observabilidad/analisis-de-causa-raiz",
        "label": "Análisis de causa raíz",
        "description": "Investiga el primer fallo causal, la entrada usada, el intento, los cambios recientes y los efectos secundarios antes de reejecutar."
      }
    ]
  },
  {
    "key": "seguridad",
    "label": "Seguridad",
    "children": [
      {
        "id": "analisis-de-datos/airflow/seguridad/definicion",
        "label": "Definición",
        "description": "La seguridad de Airflow protege acceso a UI/API, credenciales, código ejecutable y recursos externos."
      },
      {
        "id": "analisis-de-datos/airflow/seguridad/auth-managers-y-rbac",
        "label": "Auth Managers y RBAC",
        "description": "El auth manager define autenticación y autorización; RBAC organiza permisos mediante roles cuando el backend lo soporta."
      },
      {
        "id": "analisis-de-datos/airflow/seguridad/fernet-y-rotacion-de-secretos",
        "label": "Fernet y rotación de secretos",
        "description": "Fernet cifra campos sensibles guardados en la base de metadatos; la clave debe protegerse y rotarse con el procedimiento oficial."
      },
      {
        "id": "analisis-de-datos/airflow/seguridad/iam-service-accounts-y-minimo-privilegio",
        "label": "IAM, service accounts y mínimo privilegio",
        "description": "Las identidades de servicios conceden acceso a recursos externos sin compartir credenciales personales."
      },
      {
        "id": "analisis-de-datos/airflow/seguridad/tls-masking-y-aislamiento",
        "label": "TLS, masking y aislamiento",
        "description": "TLS protege comunicaciones, masking reduce exposición accidental de secretos y el aislamiento limita alcance de tareas."
      }
    ]
  },
  {
    "key": "despliegue",
    "label": "Despliegue y administración",
    "children": [
      {
        "id": "analisis-de-datos/airflow/despliegue/definicion",
        "label": "Definición",
        "description": "Un despliegue de producción combina servicios persistentes, escalabilidad, permisos, backups y gestión de versiones."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/base-de-metadatos-y-migraciones",
        "label": "Base de metadatos y migraciones",
        "description": "Una base soportada y persistente permite operar varios componentes; airflow db migrate actualiza el esquema de metadatos."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/kubernetes-y-helm",
        "label": "Kubernetes y Helm",
        "description": "El chart oficial permite configurar y desplegar componentes Airflow en Kubernetes."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/alta-disponibilidad-y-escalamiento",
        "label": "Alta disponibilidad y escalamiento",
        "description": "HA reduce puntos únicos de fallo; el escalamiento horizontal o vertical ajusta la capacidad a la carga."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/dag-bundles-y-versionado",
        "label": "DAG Bundles y versionado",
        "description": "Los bundles proporcionan una fuente de DAGs y, cuando el backend lo permite, versiones identificables de código."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/backups-limpieza-y-recuperacion",
        "label": "Backups, limpieza y recuperación",
        "description": "Conserva metadatos, configuración, claves y código; aplica políticas de retención de logs y registros antiguos."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/ci-cd-y-entornos",
        "label": "CI/CD y entornos",
        "description": "Automatiza pruebas y entrega de DAGs a desarrollo, staging y producción con dependencias fijadas."
      },
      {
        "id": "analisis-de-datos/airflow/despliegue/servicios-administrados",
        "label": "Servicios administrados",
        "description": "MWAA, Cloud Composer y Astro administran parte de la infraestructura con restricciones y versiones propias."
      }
    ]
  },
  {
    "key": "rendimiento",
    "label": "Rendimiento y buenas prácticas",
    "children": [
      {
        "id": "analisis-de-datos/airflow/rendimiento/definicion",
        "label": "Definición",
        "description": "Optimizar Airflow implica limitar trabajo innecesario en parsing, scheduling y ejecución, sin trasladar grandes datasets por el orquestador."
      },
      {
        "id": "analisis-de-datos/airflow/rendimiento/parsing-y-codigo-de-nivel-superior",
        "label": "Parsing y código de nivel superior",
        "description": "El procesador puede importar repetidamente los archivos de DAG; operaciones pesadas allí degradan el rendimiento."
      },
      {
        "id": "analisis-de-datos/airflow/rendimiento/granularidad-y-paralelismo",
        "label": "Granularidad y paralelismo",
        "description": "Demasiadas tareas pequeñas aumentan costos de scheduling y metadatos; tareas enormes reducen aislamiento y recuperación."
      },
      {
        "id": "analisis-de-datos/airflow/rendimiento/optimizar-metadatos-y-dependencias",
        "label": "Optimizar metadatos y dependencias",
        "description": "La retención, índices administrados, conexiones y tamaño de DAGs afectan los componentes de Airflow."
      }
    ]
  },
  {
    "key": "extensiones",
    "label": "Extensiones y APIs",
    "children": [
      {
        "id": "analisis-de-datos/airflow/extensiones/definicion",
        "label": "Definición",
        "description": "Airflow permite ampliar comportamiento con clases y mecanismos públicos, en lugar de modificar el núcleo."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-hook",
        "label": "Custom Hook",
        "description": "Un hook personalizado centraliza acceso a un servicio y configuración de conexiones."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-sensor",
        "label": "Custom Sensor",
        "description": "Un sensor personalizado define una condición de disponibilidad mediante poke."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-trigger-y-deferral",
        "label": "Custom Trigger y deferral",
        "description": "Un trigger personalizado ejecuta espera asíncrona y emite eventos que reanudan una tarea diferida."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-timetable",
        "label": "Custom Timetable",
        "description": "Define un calendario propio implementando la interfaz de planificación de Airflow."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/plugins-listeners-y-cluster-policies",
        "label": "Plugins, listeners y cluster policies",
        "description": "Plugins integran extensiones; listeners observan eventos; cluster policies aplican reglas organizacionales a DAGs y tareas."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-providers-y-notifiers",
        "label": "Custom Providers y notifiers",
        "description": "Un provider empaqueta integraciones y metadatos de descubrimiento; un notifier reutilizable encapsula una acción de notificación."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/task-sdk-y-python-client-sdk",
        "label": "Task SDK y Python Client SDK",
        "description": "Task SDK sirve para autoría y ejecución de tareas; un cliente de API se usa para operaciones remotas de Airflow."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/excepciones-de-airflow",
        "label": "Excepciones de Airflow",
        "description": "AirflowSkipException omite una tarea; AirflowFailException marca fallo sin seguir reintentando; excepciones ordinarias siguen la política de retries."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/custom-executor-y-xcom-backend",
        "label": "Custom Executor y XCom Backend",
        "description": "Un executor personalizado adapta el despacho de tareas; un XCom backend personalizado adapta su almacenamiento y serialización."
      },
      {
        "id": "analisis-de-datos/airflow/extensiones/operator-extra-links",
        "label": "Operator Extra Links",
        "description": "Añade enlaces contextualizados a una tarea, por ejemplo al job externo que inició."
      }
    ]
  },
  {
    "key": "compatibilidad",
    "label": "Compatibilidad Airflow 2 y 3",
    "children": [
      {
        "id": "analisis-de-datos/airflow/compatibilidad/definicion",
        "label": "Definición",
        "description": "Airflow 3 cambia interfaces públicas, arquitectura y algunos conceptos de programación respecto de Airflow 2."
      },
      {
        "id": "analisis-de-datos/airflow/compatibilidad/imports-y-operators",
        "label": "Imports y operators",
        "description": "Airflow 2.10 emplea airflow.decorators y módulos clásicos; en 3 se recomienda airflow.sdk y providers standard para operadores comunes."
      },
      {
        "id": "analisis-de-datos/airflow/compatibilidad/datasets-assets-y-scheduling",
        "label": "Datasets, Assets y scheduling",
        "description": "Datasets era el nombre de la programación por datos en Airflow 2; Airflow 3 usa Assets y amplía capacidades de eventos."
      },
      {
        "id": "analisis-de-datos/airflow/compatibilidad/webserver-backfill-y-api",
        "label": "Webserver, backfill y API",
        "description": "Airflow 3 usa API Server, REST API v2 y un nuevo sistema de backfill; Airflow 2 tiene comandos y rutas distintos."
      },
      {
        "id": "analisis-de-datos/airflow/compatibilidad/migracion-y-funcionalidades-removidas",
        "label": "Migración y funcionalidades removidas",
        "description": "SubDAGs, SLAs antiguos y acceso a internals requieren alternativas al migrar a Airflow 3."
      }
    ]
  },
  {
    "key": "pipeline-ventas",
    "label": "Pipeline de ventas de extremo a extremo",
    "children": [
      {
        "id": "analisis-de-datos/airflow/pipeline-ventas/definicion",
        "label": "Definición",
        "description": "Un pipeline completo conecta extracción, transformación, validación y publicación con dependencias explícitas."
      },
      {
        "id": "analisis-de-datos/airflow/pipeline-ventas/carga-incremental-y-reprocesamiento",
        "label": "Carga incremental y reprocesamiento",
        "description": "Combina intervalos de datos, persistencia y validaciones para que un lote pueda repetirse sin duplicar resultados."
      },
      {
        "id": "analisis-de-datos/airflow/pipeline-ventas/integracion-elt-y-dashboard",
        "label": "Integración ELT y dashboard",
        "description": "Un flujo ELT puede cargar datos crudos al warehouse, ejecutar dbt, comprobar calidad y emitir un evento para consumo."
      }
    ]
  }
];
