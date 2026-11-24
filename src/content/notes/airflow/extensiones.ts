// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/extensiones/definicion",
    "remember": "Reutiliza un provider existente si cubre la necesidad.",
    "examples": [
      {
        "id": "airflow/extensiones/definicion/1",
        "title": "Crear un operator de negocio pequeño",
        "language": "python",
        "code": "from airflow.sdk import BaseOperator\nclass MostrarTotal(BaseOperator):\n    def __init__(self, total, **kwargs):\n        super().__init__(**kwargs)\n        self.total = total\n    def execute(self, context):\n        self.log.info(\"Total: %s\", self.total)\n        return self.total\nMostrarTotal(task_id=\"mostrar\", total=3000)",
        "hint": "Para reutilizarlo, mueve la clase a un módulo importable; execute se llama en tiempo de ejecución.",
        "textOutput": "Retorna 3000 y lo registra en logs.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-hook",
    "remember": "No abras conexiones durante __init__ de un operator.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-hook/1",
        "title": "Crear un hook que lee una conexión",
        "language": "python",
        "code": "from airflow.sdk import BaseHook\nclass MiHook(BaseHook):\n    def __init__(self, conn_id):\n        super().__init__()\n        self.conn_id = conn_id\n    def host(self):\n        return self.get_connection(self.conn_id).host\n@task\ndef ver():\n    return MiHook(\"ventas_pg\").host()\nver()",
        "hint": "Requiere una conexión registrada; no devuelve contraseña.",
        "textOutput": "Retorna el host configurado de ventas_pg.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-sensor",
    "remember": "poke debe ser breve y no producir efectos secundarios innecesarios.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-sensor/1",
        "title": "Esperar un archivo de control",
        "language": "python",
        "code": "from airflow.sdk import BaseSensorOperator\nclass ReadySensor(BaseSensorOperator):\n    def poke(self, context):\n        return Path(\"/tmp/alldoc_airflow/ready.flag\").exists()\nReadySensor(task_id=\"ready\", poke_interval=5, timeout=60, mode=\"reschedule\")",
        "hint": "Crea el archivo desde una segunda terminal.",
        "textOutput": "Success al existir ready.flag; de lo contrario expira.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-trigger-y-deferral",
    "remember": "Usa clases serializables e I/O no bloqueante; el triggerer debe poder importarlas.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-trigger-y-deferral/1",
        "title": "Diseñar una espera reutilizable",
        "code": "",
        "steps": [
          "Crea una clase BaseTrigger con serialize() y run() asíncrono que emita TriggerEvent.",
          "Instálala en scheduler, worker y triggerer.",
          "En un operator compatible usa defer() y un método de reanudación.",
          "Prueba que la tarea pase de deferred a success."
        ],
        "external": true,
        "hint": "Consulta el contrato de BaseTrigger en la versión instalada; no es una función async arbitraria.",
        "textOutput": "El worker se libera durante la espera y la tarea se reanuda tras el evento.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-timetable",
    "remember": "Prueba intervalos, zonas horarias y fechas límite antes de registrar el timetable.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-timetable/1",
        "title": "Diseñar calendario de días hábiles",
        "code": "",
        "steps": [
          "Implementa el contrato Timetable en un módulo importable.",
          "Registra la clase mediante el mecanismo de extensión documentado.",
          "Prueba un calendario que omita sábados y domingos.",
          "Comprueba fechas próximas antes de activar el DAG."
        ],
        "external": true,
        "hint": "Incluye pruebas de festivos si forman parte de la regla de negocio.",
        "textOutput": "Los runs calculados corresponden al calendario laboral definido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/plugins-listeners-y-cluster-policies",
    "remember": "El alcance y momento de ejecución son distintos; usa la interfaz soportada de cada uno.",
    "examples": [
      {
        "id": "airflow/extensiones/plugins-listeners-y-cluster-policies/1",
        "title": "Comprobar políticas de un entorno",
        "language": "bash",
        "code": "airflow plugins",
        "hint": "Para aplicar una política, registra una que exija tags o asigne un pool a tareas y valida importación en staging.",
        "textOutput": "Muestra plugins reconocidos por el entorno.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-providers-y-notifiers",
    "remember": "Fija dependencias compatibles y documenta conexiones requeridas.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-providers-y-notifiers/1",
        "title": "Validar un provider interno",
        "code": "",
        "steps": [
          "Empaqueta el hook/operator/notifier con metadata de provider.",
          "Instálalo en un entorno de prueba.",
          "Comprueba airflow providers list y ejecuta una tarea de prueba."
        ],
        "external": true,
        "hint": "Consulta el contrato de provider y BaseNotifier de la versión.",
        "textOutput": "El provider aparece y su integración funciona con los recursos configurados.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/task-sdk-y-python-client-sdk",
    "remember": "No confundas acceso al contexto de una tarea con administración remota del entorno.",
    "examples": [
      {
        "id": "airflow/extensiones/task-sdk-y-python-client-sdk/1",
        "title": "Inspeccionar un contexto mediante Task SDK",
        "language": "python",
        "code": "@task\ndef contexto():\n    return get_current_context()[\"run_id\"]\ncontexto()",
        "hint": "Para listar DAGs desde otra aplicación usa la API v2 o un cliente compatible.",
        "textOutput": "Devuelve el run_id sin acceder directamente a la metadata DB.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/excepciones-de-airflow",
    "remember": "Usa skip para ausencia válida de trabajo, fail para un error definitivo.",
    "examples": [
      {
        "id": "airflow/extensiones/excepciones-de-airflow/1",
        "title": "Omitir un lote vacío permitido",
        "language": "python",
        "code": "from airflow.exceptions import AirflowSkipException\n@task\ndef opcional():\n    raise AirflowSkipException(\"No hay nuevos pedidos\")\nopcional()",
        "hint": "La regla de las tareas posteriores decide si continúan.",
        "textOutput": "La tarea queda skipped.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/custom-executor-y-xcom-backend",
    "remember": "Son extensiones de infraestructura, no operadores de negocio.",
    "examples": [
      {
        "id": "airflow/extensiones/custom-executor-y-xcom-backend/1",
        "title": "Validar una extensión de infraestructura",
        "code": "",
        "steps": [
          "Elige una interfaz documentada compatible con la versión.",
          "Implementa y empaqueta la extensión.",
          "Configúrala en un entorno aislado y ejecuta un DAG de prueba.",
          "Comprueba fallos, serialización o reconciliación según corresponda."
        ],
        "external": true,
        "hint": "No pruebes por primera vez un executor o backend personalizado en producción.",
        "textOutput": "La extensión funciona durante una ejecución normal y una recuperación controlada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/extensiones/operator-extra-links",
    "remember": "No incluyas credenciales ni datos sensibles en la URL.",
    "examples": [
      {
        "id": "airflow/extensiones/operator-extra-links/1",
        "title": "Enlazar un job externo desde la UI",
        "code": "",
        "steps": [
          "Implementa la clase de enlace según el contrato BaseOperatorLink de tu versión.",
          "Regístrala en el operator o extensión.",
          "Ejecuta la tarea y abre su detalle en la UI."
        ],
        "external": true,
        "hint": "Usa IDs de jobs no sensibles y autorización del servicio destino.",
        "textOutput": "Aparece el enlace a la ejecución externa si la información necesaria está disponible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
