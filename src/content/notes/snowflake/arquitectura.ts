// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/arquitectura/definicion",
    "remember": "Guardar datos no equivale a ejecutar consultas.",
    "examples": [
      {
        "id": "snowflake/arquitectura/definicion/1",
        "title": "Reconocer las tres capas",
        "code": "",
        "steps": [
          "Una tienda carga ORDERS al almacenamiento.",
          "Un warehouse ejecuta el informe de ventas.",
          "Cloud Services autentica, resuelve metadatos y coordina la consulta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Se distinguen almacenamiento, procesamiento y coordinación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/arquitectura/storage",
    "remember": "No tienes que administrar archivos de tabla ni discos del warehouse.",
    "examples": [
      {
        "id": "snowflake/arquitectura/storage/1",
        "title": "Comprobar tamaño registrado",
        "language": "sql",
        "code": "SHOW TABLES LIKE 'ORDERS';",
        "hint": "",
        "textOutput": "Fila de ORDERS con metadatos como rows y bytes; los valores de almacenamiento dependen del servicio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/arquitectura/compute-y-cloud-services",
    "remember": "Dos warehouses pueden leer las mismas tablas sin compartir sus recursos de cómputo.",
    "examples": [
      {
        "id": "snowflake/arquitectura/compute-y-cloud-services/1",
        "title": "Identificar el recurso de una sesión",
        "language": "sql",
        "code": "SELECT CURRENT_WAREHOUSE(), CURRENT_ACCOUNT();",
        "hint": "",
        "textOutput": "ALLDOC_WH y el identificador de tu cuenta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/arquitectura/organizacion-y-nube",
    "remember": "Cuenta, región y edición condicionan servicios, conectividad y replicación.",
    "examples": [
      {
        "id": "snowflake/arquitectura/organizacion-y-nube/1",
        "title": "Consultar ubicación lógica",
        "language": "sql",
        "code": "SELECT CURRENT_ORGANIZATION_NAME(), CURRENT_ACCOUNT_NAME(), CURRENT_REGION();",
        "hint": "",
        "textOutput": "Nombre de organización, cuenta y región reales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/arquitectura/micro-partitions",
    "remember": "No se crean particiones manuales como en algunos motores.",
    "examples": [
      {
        "id": "snowflake/arquitectura/micro-partitions/1",
        "title": "Consultar una sola fecha",
        "language": "sql",
        "code": "SELECT ORDER_ID FROM ORDERS WHERE ORDER_DATE = '2026-02-03' ORDER BY ORDER_ID;",
        "hint": "",
        "textOutput": "102 y 103; en tablas grandes el filtro puede reducir las particiones escaneadas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
