// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/definicion",
    "remember": "Mide antes y después con la misma carga y condiciones de caché.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/definicion/1",
        "title": "Localizar una consulta de ventas",
        "language": "sql",
        "code": "ALTER SESSION SET QUERY_TAG='alldoc-performance';\nSELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed';",
        "hint": "",
        "textOutput": "1300 y una consulta identificable por QUERY_TAG en el historial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/query-history-y-query-profile",
    "remember": "EXPLAIN estima el plan; el perfil mide lo que ocurrió.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/query-history-y-query-profile/1",
        "title": "Inspeccionar una consulta ejecutada",
        "code": "",
        "steps": [
          "Ejecuta la consulta de la ficha Definición.",
          "En Snowsight abre Query History y selecciona esa consulta.",
          "Abre Query Profile y revisa tiempo, filas, bytes y operadores."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Perfil de la consulta de ventas; los valores físicos dependen del entorno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/pruning-y-filtros",
    "remember": "Evita transformar innecesariamente la columna filtrada; no todos los filtros consiguen pruning.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/pruning-y-filtros/1",
        "title": "Comparar rango y función",
        "language": "sql",
        "code": "SELECT COUNT(*) FROM ORDERS WHERE ORDER_DATE>='2026-02-01' AND ORDER_DATE<'2026-03-01';",
        "hint": "",
        "textOutput": "4; en tablas grandes el rango puede reducir particiones escaneadas. En el laboratorio no se espera una diferencia significativa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/clustering-keys-y-automatic-clustering",
    "remember": "Úsala solo cuando el beneficio de pruning justifique costo en tablas grandes.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/clustering-keys-y-automatic-clustering/1",
        "title": "Estimar organización física",
        "language": "sql",
        "code": "SELECT SYSTEM$CLUSTERING_INFORMATION('ORDERS','(ORDER_DATE)');",
        "hint": "",
        "textOutput": "JSON de información de clustering; la tabla pequeña no justifica activar clustering.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/caches",
    "remember": "Una segunda ejecución rápida no demuestra por sí sola un mejor plan.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/caches/1",
        "title": "Controlar reutilización de resultados",
        "language": "sql",
        "code": "ALTER SESSION SET USE_CACHED_RESULT=FALSE;\nSELECT SUM(AMOUNT) FROM ORDERS;\nALTER SESSION UNSET USE_CACHED_RESULT;",
        "hint": "",
        "textOutput": "1450; se evita reutilizar el resultado persistido en esa prueba, no necesariamente otras cachés.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/search-optimization-y-query-acceleration",
    "remember": "Ambos tienen costo y condiciones de elegibilidad diferentes.",
    "note": "Requieren funcionalidades/ediciones compatibles.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/search-optimization-y-query-acceleration/1",
        "title": "Evaluar antes de habilitar",
        "code": "",
        "steps": [
          "Selecciona una tabla grande y una consulta selectiva repetitiva.",
          "Inspecciona el perfil y elegibilidad de Search Optimization o Query Acceleration.",
          "Estima costo y compara tiempos en un entorno autorizado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Decisión fundamentada en costo y latencia; no se modifica el laboratorio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/spilling-y-query-queuing",
    "remember": "Revisa volumen intermedio y concurrencia antes de aumentar tamaño.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/spilling-y-query-queuing/1",
        "title": "Diagnosticar un join pesado",
        "code": "",
        "steps": [
          "En Query Profile localiza bytes spilled to local/remote storage.",
          "Compara filas de entrada y salida del join.",
          "En Query History revisa tiempos de cola."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Evidencia para reducir cardinalidad, ajustar tamaño o separar workloads.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/rendimiento-y-diagnostico/query-insights-query-hash-y-estadisticas",
    "remember": "Agrupar por hash ayuda a priorizar consultas recurrentes, no sustituye verificar cada plan.",
    "note": "Requiere permisos sobre la consulta y una ejecución con perfil disponible.",
    "examples": [
      {
        "id": "snowflake/rendimiento-y-diagnostico/query-insights-query-hash-y-estadisticas/1",
        "title": "Ver estadísticas de operadores",
        "language": "sql",
        "code": "SELECT SUM(AMOUNT) FROM ORDERS WHERE STATUS='completed';\nSELECT OPERATOR_TYPE,OPERATOR_STATISTICS FROM TABLE(GET_QUERY_OPERATOR_STATS(LAST_QUERY_ID()));",
        "hint": "",
        "textOutput": "Operadores y estadísticas disponibles de la consulta anterior.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
