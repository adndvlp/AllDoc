// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/dynamic-tables/definicion",
    "remember": "No necesita definir manualmente cada paso incremental, pero no admite cualquier SQL.",
    "note": "Genera consumo mientras refresca; suspende o elimina tras la prueba.",
    "examples": [
      {
        "id": "snowflake/dynamic-tables/definicion/1",
        "title": "Mantener ventas por cliente",
        "language": "sql",
        "code": "CREATE OR REPLACE DYNAMIC TABLE DEMO_DT TARGET_LAG='5 minutes' WAREHOUSE=ALLDOC_WH REFRESH_MODE=INCREMENTAL AS SELECT CUSTOMER_ID,SUM(AMOUNT) AS TOTAL FROM ORDERS WHERE STATUS='completed' GROUP BY 1;\nSELECT * FROM DEMO_DT ORDER BY CUSTOMER_ID;",
        "hint": "",
        "textOutput": "Tras inicialización exitosa: 1:300,2:300,3:300,4:400.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dynamic-tables/target-lag-y-downstream",
    "remember": "No es un horario exacto ni una garantía de latencia.",
    "examples": [
      {
        "id": "snowflake/dynamic-tables/target-lag-y-downstream/1",
        "title": "Cambiar meta de frescura",
        "language": "sql",
        "code": "ALTER DYNAMIC TABLE DEMO_DT SET TARGET_LAG='10 minutes';\nSHOW DYNAMIC TABLES LIKE 'DEMO_DT';",
        "hint": "",
        "textOutput": "Meta de 10 minutos configurada para DEMO_DT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dynamic-tables/refresh-mode-e-historial",
    "remember": "Comprueba el modo efectivo, fallos de refresh y costo; no asumas que AUTO siempre es incremental.",
    "examples": [
      {
        "id": "snowflake/dynamic-tables/refresh-mode-e-historial/1",
        "title": "Comprobar estado y detener refresco",
        "language": "sql",
        "code": "SHOW DYNAMIC TABLES LIKE 'DEMO_DT';\nALTER DYNAMIC TABLE DEMO_DT SUSPEND;",
        "hint": "",
        "textOutput": "Modo y estado visibles; refrescos automáticos suspendidos tras la segunda sentencia.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/dynamic-tables/elegir-dynamic-tables-streams-o-tasks",
    "remember": "Elige según control, SQL compatible, latencia y costo.",
    "examples": [
      {
        "id": "snowflake/dynamic-tables/elegir-dynamic-tables-streams-o-tasks/1",
        "title": "Diseñar un pipeline de reporting",
        "code": "",
        "steps": [
          "Usa una dynamic table para totales de ventas declarativos.",
          "Usa stream + task para una dimensión SCD2 que requiere cerrar intervalos y abrir versiones.",
          "Comprueba frescura, duplicados y consumo de ambos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos patrones con mecanismos de actualización distintos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
