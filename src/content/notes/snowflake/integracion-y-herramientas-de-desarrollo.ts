// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/definicion",
    "remember": "La herramienta cliente no cambia la semántica del SQL del servidor.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/definicion/1",
        "title": "Comprobar una conexión desde otro cliente",
        "language": "sql",
        "code": "SELECT CURRENT_ACCOUNT(),CURRENT_ROLE(),COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS;",
        "hint": "",
        "textOutput": "Cuenta y rol activos; conteo 8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/snowflake-cli-y-snowsql",
    "remember": "Usa perfiles de conexión autorizados y evita pasar contraseñas en la línea de comandos.",
    "note": "Instala Snowflake CLI y configura el perfil alldoc; usa su ayuda si la versión difiere.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/snowflake-cli-y-snowsql/1",
        "title": "Ejecutar SQL desde terminal",
        "language": "bash",
        "code": "snow sql -c alldoc -q \"SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS\"",
        "hint": "",
        "textOutput": "Una fila con 8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/jdbc-odbc-y-sqlalchemy",
    "remember": "Configura cuenta, rol, warehouse y autenticación en cada cliente.",
    "note": "Requiere software y conexión externos.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/jdbc-odbc-y-sqlalchemy/1",
        "title": "Conectar un cliente de BI",
        "code": "",
        "steps": [
          "Instala el controlador JDBC u ODBC compatible cuando sea necesario.",
          "Crea una conexión con cuenta, warehouse, base, esquema y autenticación autorizada.",
          "Prueba SELECT COUNT(*) FROM ORDERS.",
          "Para SQLAlchemy instala snowflake-sqlalchemy y configura su URL de conexión de forma segura."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conteo 8 desde el cliente conectado al laboratorio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/sql-api-rest-apis-y-python-apis",
    "remember": "Distingue ejecutar SQL de gestionar recursos; respeta tokens, estados asíncronos y paginación.",
    "note": "Requiere endpoint real, token autorizado y cliente HTTP.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/sql-api-rest-apis-y-python-apis/1",
        "title": "Consultar mediante SQL API",
        "code": "",
        "steps": [
          "Configura autenticación soportada para SQL API.",
          "Envía POST a /api/v2/statements con statement SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS y contexto autorizado.",
          "Consulta el estado con el handle cuando no termine en la respuesta inicial.",
          "Recupera particiones adicionales si existen."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Respuesta JSON de una consulta exitosa con valor 8; los handles y estados dependen de la ejecución.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/dbt",
    "remember": "dbt no reemplaza el warehouse ni crea por sí solo una fuente de datos externa.",
    "note": "Requiere proyecto dbt, source YAML, adaptador y perfil; el Jinja no se pega directamente en Snowsight.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/dbt/1",
        "title": "Crear modelo de ventas completadas",
        "language": "sql",
        "code": "-- models/completed_orders.sql (dbt)\nSELECT ORDER_ID,AMOUNT\nFROM {{ source('practice','orders') }}\nWHERE STATUS='completed'",
        "hint": "",
        "textOutput": "Al ejecutar dbt run con dbt-snowflake y la source practice.orders definida para ALLDOC_LAB.PRACTICE.ORDERS, el modelo devuelve 6 filas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/airflow",
    "remember": "Airflow coordina; Snowflake procesa los datos. Evita reintentos de DML no idempotente.",
    "note": "Requiere Airflow, provider Snowflake/common SQL y una conexión configurada; este fragmento es una tarea, no un DAG completo.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/airflow/1",
        "title": "Programar una comprobación de pedidos",
        "language": "python",
        "code": "from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator\ncheck = SQLExecuteQueryOperator(\n    task_id=\"check_orders\", conn_id=\"snowflake_alldoc\",\n    sql=\"SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS\"\n)",
        "hint": "",
        "textOutput": "Dentro de un DAG válido, la task ejecuta el conteo 8 y su estado refleja éxito o fallo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/openflow",
    "remember": "La ingesta tiene su propio estado, permisos y manejo de errores, separado de la consulta final.",
    "note": "Requiere infraestructura y conectores compatibles.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/openflow/1",
        "title": "Validar un flujo de ingesta",
        "code": "",
        "steps": [
          "Provisiona un runtime Openflow de prueba compatible.",
          "Configura un conector autorizado a una fuente sintética y una tabla destino.",
          "Inicia el flujo, verifica dos registros conocidos y revisa errores.",
          "Detén el flujo y runtime cuando termines."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Los registros de prueba llegan al destino; el estado y retraso se observan en la interfaz.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/git-ci-cd-y-migraciones",
    "remember": "Usa ambientes y roles separados; registra cambios y plan de recuperación antes de producción.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/git-ci-cd-y-migraciones/1",
        "title": "Probar un modelo antes de desplegar",
        "code": "",
        "steps": [
          "Guarda el SQL del modelo y sus tests en Git.",
          "En CI ejecuta tests en una base de desarrollo con datos sintéticos.",
          "Revisa conteos, claves y cambios DDL.",
          "Despliega con aprobación y credenciales del entorno de destino."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cambios versionados, pruebas verificables y despliegue trazable; sin modificación directa de producción en el laboratorio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/integracion-y-herramientas-de-desarrollo/terraform-e-infraestructura-como-codigo",
    "remember": "Revisa terraform plan antes de apply; protege el estado, que puede contener datos sensibles.",
    "note": "Requiere Terraform, provider compatible y backend seguro de estado.",
    "examples": [
      {
        "id": "snowflake/integracion-y-herramientas-de-desarrollo/terraform-e-infraestructura-como-codigo/1",
        "title": "Administrar un warehouse de desarrollo",
        "code": "",
        "steps": [
          "Configura provider Snowflake y autenticación autorizada.",
          "Declara un warehouse de laboratorio pequeño, autosuspendido.",
          "Ejecuta terraform plan y revisa las operaciones previstas.",
          "Aplica solo si el plan fue aprobado; verifica SHOW WAREHOUSES."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Warehouse configurado como se declaró, sin cambios inesperados en otros recursos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
