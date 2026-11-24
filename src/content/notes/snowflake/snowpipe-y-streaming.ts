// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/definicion",
    "remember": "Elige carga masiva para lotes, Snowpipe para archivos frecuentes y streaming para eventos de baja latencia.",
    "examples": [
      {
        "id": "snowflake/snowpipe-y-streaming/definicion/1",
        "title": "Elegir ingesta de ventas",
        "code": "",
        "steps": [
          "Un ERP deja CSV cada hora: usa COPY programado o Snowpipe si requiere automatización por eventos.",
          "Una aplicación emite eventos individuales: evalúa Snowpipe Streaming."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos patrones distintos de ingesta, según latencia y origen.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/pipes-y-auto-ingest",
    "remember": "Las notificaciones requieren configuración en el proveedor; no basta crear el objeto.",
    "note": "Requiere stage y formato. No activar notificaciones en un entorno no autorizado.",
    "examples": [
      {
        "id": "snowflake/snowpipe-y-streaming/pipes-y-auto-ingest/1",
        "title": "Definir un pipe sin activar notificaciones",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_PIPE_TARGET LIKE ORDERS;\nCREATE OR REPLACE PIPE DEMO_PIPE AS COPY INTO DEMO_PIPE_TARGET FROM @DEMO_STAGE FILE_FORMAT=(FORMAT_NAME=DEMO_CSV) PATTERN='.*ventas[.]csv';\nSHOW PIPES LIKE 'DEMO_PIPE';",
        "hint": "",
        "textOutput": "Pipe registrado; no presupone que los archivos se cargaron automáticamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/snowpipe-streaming-y-kafka",
    "remember": "Configura offsets, errores, esquema y garantías de entrega según el cliente.",
    "note": "Requiere cliente, autenticación e infraestructura externa.",
    "examples": [
      {
        "id": "snowflake/snowpipe-y-streaming/snowpipe-streaming-y-kafka/1",
        "title": "Validar un lote de eventos",
        "code": "",
        "steps": [
          "En un entorno de pruebas configura el SDK o conector Kafka autorizado y una tabla destino.",
          "Envía dos eventos con IDs de negocio conocidos.",
          "Comprueba los IDs en el destino y revisa el offset/estado de ingestión."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Los dos eventos aparecen según la semántica de entrega configurada; el retraso es variable.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/snowpipe-y-streaming/notification-integrations-y-monitorizacion",
    "remember": "El pipe puede existir y no recibir notificaciones válidas.",
    "note": "Requiere DEMO_PIPE de la ficha anterior y permisos.",
    "examples": [
      {
        "id": "snowflake/snowpipe-y-streaming/notification-integrations-y-monitorizacion/1",
        "title": "Comprobar estado del pipe",
        "language": "sql",
        "code": "SELECT SYSTEM$PIPE_STATUS('DEMO_PIPE');",
        "hint": "",
        "textOutput": "JSON de estado y métricas disponibles del pipe; depende de la cuenta y actividad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
