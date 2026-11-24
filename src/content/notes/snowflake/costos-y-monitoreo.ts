// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/definicion",
    "remember": "Créditos no equivalen a una moneda fija; el contrato y la región importan.",
    "note": "No es una factura completa; algunos servicios se miden aparte.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/definicion/1",
        "title": "Ver uso de warehouses",
        "language": "sql",
        "code": "SELECT WAREHOUSE_NAME,SUM(CREDITS_USED) AS CREDITS FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY WHERE START_TIME>=DATEADD(DAY,-7,CURRENT_TIMESTAMP()) GROUP BY 1 ORDER BY 2 DESC;",
        "hint": "",
        "textOutput": "Consumo por warehouse de los últimos siete días, sujeto a latencia y permisos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/resource-monitors",
    "remember": "No cubre todos los servicios serverless ni impone un límite exacto de gasto total.",
    "note": "Requiere permisos de administración.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/resource-monitors/1",
        "title": "Diseñar un límite para laboratorio",
        "code": "",
        "steps": [
          "Un administrador crea un monitor con cuota mensual de prueba y umbrales de aviso/suspensión.",
          "Lo asigna a ALLDOC_WH si es exclusivo del laboratorio.",
          "Revisa el consumo y las notificaciones."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Monitor vinculado a ese warehouse y acciones configuradas; no se afecta producción.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/budgets",
    "remember": "Una notificación de presupuesto no implica suspensión automática.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/budgets/1",
        "title": "Configurar seguimiento de costos",
        "code": "",
        "steps": [
          "En Cost Management crea un budget para recursos de prueba autorizados.",
          "Define límite y destinatarios.",
          "Verifica recursos incluidos y previsión."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Panel con consumo y estado del presupuesto; no garantiza evitar sobrecostos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/account-usage-e-information-schema",
    "remember": "Elige fuente según frescura, retención y permisos.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/account-usage-e-information-schema/1",
        "title": "Consultar esquema actual",
        "language": "sql",
        "code": "SELECT TABLE_NAME FROM ALLDOC_LAB.INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='PRACTICE' AND TABLE_NAME IN ('CUSTOMERS','ORDERS') ORDER BY 1;",
        "hint": "",
        "textOutput": "CUSTOMERS y ORDERS.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/alerts-event-tables-y-observabilidad",
    "remember": "Separa alertar por anomalías de almacenar evidencia de ejecución.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/alerts-event-tables-y-observabilidad/1",
        "title": "Diseñar alerta de carga",
        "code": "",
        "steps": [
          "Crea una comprobación de lotes fallidos y define una alerta con horario/condición soportados.",
          "Configura acción autorizada (por ejemplo notificación).",
          "Simula un fallo de prueba y revisa historial; suspende al terminar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Evento de alerta al cumplirse la condición, con trazabilidad; configuración dependiente de la cuenta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/costos-y-monitoreo/limites-timeouts-y-parametros",
    "remember": "Los niveles de configuración y precedencia varían según parámetro.",
    "examples": [
      {
        "id": "snowflake/costos-y-monitoreo/limites-timeouts-y-parametros/1",
        "title": "Limitar consultas de una sesión",
        "language": "sql",
        "code": "ALTER SESSION SET STATEMENT_TIMEOUT_IN_SECONDS=60;\nSHOW PARAMETERS LIKE 'STATEMENT_TIMEOUT_IN_SECONDS' IN SESSION;\nALTER SESSION UNSET STATEMENT_TIMEOUT_IN_SECONDS;",
        "hint": "",
        "textOutput": "Configuración de 60 segundos visible durante la prueba, luego restaurada al valor heredado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
