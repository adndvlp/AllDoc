// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/definicion",
    "remember": "Una métrica debe tener definición, granularidad, filtros y periodo claros.",
    "examples": [
      {
        "id": "snowflake/bi-y-capa-semantica/definicion/1",
        "title": "Publicar ventas mensuales",
        "language": "sql",
        "code": "CREATE OR REPLACE VIEW DEMO_MONTHLY AS SELECT DATE_TRUNC('MONTH',ORDER_DATE) AS M,SUM(AMOUNT) AS SALES FROM ORDERS WHERE STATUS='completed' GROUP BY 1;\nSELECT * FROM DEMO_MONTHLY ORDER BY M;",
        "hint": "",
        "textOutput": "Febrero:600, marzo:700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/semantic-views",
    "remember": "Una dimensión agrupa; un hecho mide; una métrica define la agregación. La capa no corrige claves duplicadas por sí sola.",
    "note": "Usa el editor o sintaxis CREATE SEMANTIC VIEW vigente; requiere permisos y disponibilidad.",
    "examples": [
      {
        "id": "snowflake/bi-y-capa-semantica/semantic-views/1",
        "title": "Definir una métrica de ventas consistente",
        "code": "",
        "steps": [
          "En el editor de semantic views disponible, selecciona ORDERS y CUSTOMERS.",
          "Define relación por CUSTOMER_ID y dimensión COUNTRY.",
          "Define ventas completadas como suma de AMOUNT para status completed, y valida contra SQL de la ficha de hechos y dimensiones.",
          "Guarda la definición y prueba el consumo autorizado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La métrica por país coincide con Mexico=600, Spain=300, USA=400 si se excluyen países sin ventas; revisa semántica de joins y filtros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/power-bi-tableau-y-looker",
    "remember": "La modalidad de conexión cambia frescura, costo y dónde se procesan los filtros.",
    "note": "Requiere una de las aplicaciones externas, conexión y vista de Definición.",
    "examples": [
      {
        "id": "snowflake/bi-y-capa-semantica/power-bi-tableau-y-looker/1",
        "title": "Crear gráfico de ventas mensuales",
        "code": "",
        "steps": [
          "Conecta la herramienta BI a la cuenta mediante su conector Snowflake.",
          "Selecciona DEMO_MONTHLY.",
          "Usa M como eje y SALES como valor.",
          "Comprueba totales y actualiza el informe."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos puntos o barras: febrero 600 y marzo 700.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/bi-y-capa-semantica/snowsight-dashboards-y-streamlit",
    "remember": "Los permisos y el runtime de la app condicionan la visibilidad y ejecución.",
    "note": "Requiere DEMO_MONTHLY y un runtime Streamlit con get_active_session disponible; en otros runtimes usa la conexión recomendada por Snowflake.",
    "examples": [
      {
        "id": "snowflake/bi-y-capa-semantica/snowsight-dashboards-y-streamlit/1",
        "title": "Mostrar ventas en Streamlit in Snowflake",
        "language": "python",
        "code": "import streamlit as st\nfrom snowflake.snowpark.context import get_active_session\nsession = get_active_session()\ndf = session.sql(\"SELECT M, SALES FROM ALLDOC_LAB.PRACTICE.DEMO_MONTHLY ORDER BY M\").to_pandas()\nst.bar_chart(df.set_index(\"M\"))",
        "hint": "",
        "textOutput": "Gráfico con 600 y 700 en los dos meses.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
