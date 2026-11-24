// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/integraciones/definicion",
    "remember": "Airflow coordina el servicio: el procesamiento puede ocurrir fuera del worker.",
    "examples": [
      {
        "id": "airflow/integraciones/definicion/1",
        "title": "Inspeccionar integraciones instaladas",
        "language": "bash",
        "code": "airflow providers list",
        "hint": "Consulta la documentación de la versión instalada antes de importar clases.",
        "textOutput": "Lista providers y sus versiones.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/rest-apis-y-httphook",
    "remember": "Configura timeouts, valida el estado y guarda respuestas grandes fuera de XCom.",
    "examples": [
      {
        "id": "airflow/integraciones/rest-apis-y-httphook/1",
        "title": "Consultar el estado de un servicio",
        "language": "python",
        "code": "@task\ndef estado():\n    from airflow.providers.http.hooks.http import HttpHook\n    r = HttpHook(method=\"GET\", http_conn_id=\"api_demo\").run(\"health\", extra_options={\"timeout\":10})\n    return r.status_code\nestado()",
        "hint": "Requiere provider http y api_demo configurado; /health debe existir.",
        "textOutput": "Retorna 200 si el servicio responde correctamente; un error puede fallar la tarea.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/mysql-postgresql-y-sql-server",
    "remember": "El SQL y las opciones de conexión dependen del motor.",
    "note": "Instala el provider y registra la conexión correspondiente.",
    "examples": [
      {
        "id": "airflow/integraciones/mysql-postgresql-y-sql-server/1",
        "title": "Consultar un motor MySQL",
        "language": "python",
        "code": "from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator\nSQLExecuteQueryOperator(task_id=\"consulta_mysql\", conn_id=\"ventas_mysql\", sql=\"SELECT 1\", do_xcom_push=True)",
        "hint": "Para SQL Server usa una conexión MsSql y provider microsoft-mssql; para PostgreSQL, postgres.",
        "textOutput": "Retorna una fila con 1 cuando MySQL está configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/object-storage-s3-gcs-y-azure-blob",
    "remember": "Pasa URIs y no el contenido completo del archivo por XCom.",
    "examples": [
      {
        "id": "airflow/integraciones/object-storage-s3-gcs-y-azure-blob/1",
        "title": "Subir un archivo a S3 de prueba",
        "language": "python",
        "code": "@task\ndef subir():\n    from airflow.providers.amazon.aws.hooks.s3 import S3Hook\n    S3Hook(aws_conn_id=\"mi_s3\").load_file(filename=\"/tmp/alldoc_airflow/orders.csv\", key=\"alldoc/orders.csv\", bucket_name=\"bucket-de-prueba\", replace=True)\nsubir()",
        "hint": "Sustituye el bucket; requiere provider amazon y permisos de escritura. GCS usa google y Azure Blob microsoft-azure.",
        "textOutput": "El objeto alldoc/orders.csv aparece en el bucket real configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/bigquery-snowflake-y-redshift",
    "remember": "Evita descargar tablas completas al worker para transformarlas si el motor puede hacerlo.",
    "examples": [
      {
        "id": "airflow/integraciones/bigquery-snowflake-y-redshift/1",
        "title": "Ejecutar una comprobación en Snowflake",
        "language": "python",
        "code": "from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator\nSQLExecuteQueryOperator(task_id=\"warehouse\", conn_id=\"snowflake_demo\", sql=\"SELECT 1\", do_xcom_push=True)",
        "hint": "Requiere provider snowflake. BigQuery tiene BigQueryInsertJobOperator; Redshift dispone de operadores/hooks según conexión y API.",
        "textOutput": "Una fila con 1 si la conexión funciona.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/pandas-y-parquet",
    "remember": "Instala las librerías en el entorno de ejecución y persiste el archivo fuera de XCom.",
    "examples": [
      {
        "id": "airflow/integraciones/pandas-y-parquet/1",
        "title": "Exportar pedidos completados a Parquet",
        "language": "python",
        "code": "@task\ndef exportar():\n    import pandas as pd\n    df = pd.read_csv(\"/tmp/alldoc_airflow/orders.csv\")\n    salida = \"/tmp/alldoc_airflow/completed.parquet\"\n    df[df.status == \"completed\"].to_parquet(salida, index=False)\n    return salida\nexportar()",
        "hint": "Requiere pandas y pyarrow compatibles; archivo local de laboratorio.",
        "textOutput": "Parquet con cuatro filas y seis columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/dbt",
    "remember": "El proyecto dbt y sus credenciales deben existir en el entorno que ejecuta el comando.",
    "examples": [
      {
        "id": "airflow/integraciones/dbt/1",
        "title": "Construir modelos de ventas",
        "language": "python",
        "code": "BashOperator(task_id=\"dbt_build\", bash_command=\"set -e; dbt build --project-dir /opt/dbt/ventas --select tag:ventas\")",
        "hint": "Requiere dbt, adapter, proyecto, perfil y tag reales; sustituye la ruta.",
        "textOutput": "Se ejecutan modelos y pruebas seleccionados; si dbt devuelve un código de error la tarea falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/pyspark-y-sparksubmitoperator",
    "remember": "Spark procesa los datos; el operator supervisa el job.",
    "examples": [
      {
        "id": "airflow/integraciones/pyspark-y-sparksubmitoperator/1",
        "title": "Enviar una aplicación de ventas",
        "language": "python",
        "code": "from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator\nSparkSubmitOperator(task_id=\"spark_job\", application=\"/opt/jobs/ventas.py\", conn_id=\"spark_default\")",
        "hint": "Requiere provider apache-spark, spark-submit, script real y conexión al entorno Spark.",
        "textOutput": "Se ejecuta el job y el estado refleja su resultado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/databricks",
    "remember": "Define permisos del job y usa una conexión con autenticación apropiada.",
    "examples": [
      {
        "id": "airflow/integraciones/databricks/1",
        "title": "Ejecutar un job existente",
        "language": "python",
        "code": "from airflow.providers.databricks.operators.databricks import DatabricksRunNowOperator\nDatabricksRunNowOperator(task_id=\"job\", databricks_conn_id=\"databricks_demo\", job_id=123)",
        "hint": "123 es un identificador de ejemplo; sustituye por un job autorizado real.",
        "textOutput": "Se solicita una ejecución del job y se supervisa según configuración.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/dockeroperator",
    "remember": "El daemon Docker y el montaje de archivos deben ser accesibles y seguros.",
    "examples": [
      {
        "id": "airflow/integraciones/dockeroperator/1",
        "title": "Ejecutar un cálculo aislado",
        "language": "python",
        "code": "from airflow.providers.docker.operators.docker import DockerOperator\nDockerOperator(task_id=\"contenedor\", image=\"python:3.11-slim\", command=[\"python\", \"-c\", \"print(2+3)\"], mount_tmp_dir=False)",
        "hint": "Requiere provider docker, daemon autorizado e imagen disponible.",
        "textOutput": "El log del contenedor imprime 5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/kubernetespodoperator",
    "remember": "KubernetesPodOperator es una tarea; KubernetesExecutor es infraestructura de ejecución.",
    "examples": [
      {
        "id": "airflow/integraciones/kubernetespodoperator/1",
        "title": "Ejecutar un comando en un pod",
        "language": "python",
        "code": "from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator\nKubernetesPodOperator(task_id=\"pod\", name=\"alldoc-demo\", namespace=\"airflow\", image=\"python:3.11-slim\", cmds=[\"python\", \"-c\"], arguments=[\"print(5)\"], get_logs=True)",
        "hint": "Requiere provider cncf-kubernetes y namespace existente.",
        "textOutput": "Se crea un pod que imprime 5 y termina si tiene permisos y acceso a la imagen.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/integraciones/csv-y-json",
    "remember": "Valida formato y no envíes archivos completos por XCom.",
    "examples": [
      {
        "id": "airflow/integraciones/csv-y-json/1",
        "title": "Convertir pedidos a JSON local",
        "language": "python",
        "code": "@task\ndef convertir():\n    import json\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        filas = list(csv.DictReader(f))\n    p = Path(\"/tmp/alldoc_airflow/orders.json\")\n    p.write_text(json.dumps(filas))\n    return str(p)\nconvertir()",
        "hint": "Solo se retorna la ruta del archivo.",
        "textOutput": "El JSON contiene cinco objetos con los campos del CSV.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
