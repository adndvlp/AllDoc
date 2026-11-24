// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/sensors/definicion",
    "remember": "Usa sensores para disponibilidad, no para procesar todo el dataset.",
    "examples": [
      {
        "id": "airflow/sensors/definicion/1",
        "title": "Esperar una señal local",
        "language": "python",
        "code": "from airflow.providers.standard.sensors.python import PythonSensor\nPythonSensor(task_id=\"listo\", python_callable=lambda: Path(\"/tmp/alldoc_airflow/orders.csv\").exists(), poke_interval=5, timeout=60, mode=\"reschedule\")",
        "hint": "Si no existe, espera hasta que aparezca o expire.",
        "textOutput": "Con el archivo compartido presente, el sensor finaliza correctamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/sensors/filesensor",
    "remember": "La ruta se evalúa desde el entorno que ejecuta el sensor o trigger.",
    "examples": [
      {
        "id": "airflow/sensors/filesensor/1",
        "title": "Esperar el CSV de pedidos",
        "language": "python",
        "code": "from airflow.providers.standard.sensors.filesystem import FileSensor\nFileSensor(task_id=\"archivo\", fs_conn_id=\"local_fs\", filepath=\"orders.csv\", poke_interval=5, timeout=60)",
        "hint": "Configura local_fs como se explica en Connections.",
        "textOutput": "Success si existe orders.csv en la ruta configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/sensors/httpsensor",
    "remember": "El estado de HTTP y la condición de negocio no son necesariamente lo mismo.",
    "examples": [
      {
        "id": "airflow/sensors/httpsensor/1",
        "title": "Esperar un servicio saludable",
        "language": "python",
        "code": "from airflow.providers.http.sensors.http import HttpSensor\nHttpSensor(task_id=\"api_lista\", http_conn_id=\"api_demo\", endpoint=\"health\", response_check=lambda r: r.status_code == 200, poke_interval=10, timeout=60)",
        "hint": "Requiere provider http y conexión api_demo a un servicio que exponga /health.",
        "textOutput": "Success al recibir HTTP 200 del endpoint.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/sensors/sqlsensor",
    "remember": "La consulta debe ser de lectura, ligera y devolver una condición verificable.",
    "examples": [
      {
        "id": "airflow/sensors/sqlsensor/1",
        "title": "Esperar una tabla con datos",
        "language": "python",
        "code": "from airflow.providers.common.sql.sensors.sql import SqlSensor\nSqlSensor(task_id=\"datos\", conn_id=\"ventas_pg\", sql=\"SELECT COUNT(*) FROM orders\", poke_interval=10, timeout=60, mode=\"reschedule\")",
        "hint": "Requiere una tabla orders en PostgreSQL; el CSV por sí solo no la crea.",
        "textOutput": "Success cuando el conteo es distinto de cero.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/sensors/poke-y-reschedule",
    "remember": "Usa reschedule para esperas largas con comprobaciones espaciadas.",
    "examples": [
      {
        "id": "airflow/sensors/poke-y-reschedule/1",
        "title": "Liberar capacidad durante la espera",
        "language": "python",
        "code": "from airflow.providers.standard.sensors.python import PythonSensor\nPythonSensor(task_id=\"esperar\", python_callable=lambda: False, mode=\"reschedule\", poke_interval=30, timeout=90)",
        "hint": "Este ejemplo falla intencionalmente.",
        "textOutput": "La tarea alterna espera y comprobación hasta fallar por timeout.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/sensors/deferrable-operators",
    "remember": "No todas las clases aceptan deferrable=True.",
    "examples": [
      {
        "id": "airflow/sensors/deferrable-operators/1",
        "title": "Diferir una espera de archivo",
        "language": "python",
        "code": "from airflow.providers.standard.sensors.filesystem import FileSensor\nFileSensor(task_id=\"espera\", fs_conn_id=\"local_fs\", filepath=\"ready.flag\", deferrable=True, poke_interval=5, timeout=120)",
        "hint": "Crea el archivo desde otra terminal con touch /tmp/alldoc_airflow/ready.flag. Requiere triggerer activo.",
        "textOutput": "Si falta ready.flag, puede observarse deferred; al crearlo la tarea continúa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
