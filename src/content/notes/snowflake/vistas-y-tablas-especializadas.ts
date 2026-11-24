// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/definicion",
    "remember": "Una vista normal no guarda por sí misma los resultados.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/definicion/1",
        "title": "Crear una vista de ventas",
        "language": "sql",
        "code": "CREATE OR REPLACE VIEW DEMO_SALES_V AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';\nSELECT SUM(AMOUNT) FROM DEMO_SALES_V;",
        "hint": "",
        "textOutput": "1300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/secure-views",
    "remember": "No reemplaza las políticas ni los privilegios; puede tener un costo de rendimiento.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/secure-views/1",
        "title": "Exponer solo los campos permitidos",
        "language": "sql",
        "code": "CREATE OR REPLACE SECURE VIEW DEMO_PUBLIC_V AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';\nSELECT COUNT(*) FROM DEMO_PUBLIC_V;",
        "hint": "",
        "textOutput": "6 filas, sin campos de cliente ni cupón.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/materialized-views",
    "remember": "A diferencia de una vista normal, consume almacenamiento y mantenimiento; existen restricciones de SQL.",
    "note": "Requiere edición y permisos compatibles; genera consumo adicional.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/materialized-views/1",
        "title": "Materializar un filtro repetido",
        "language": "sql",
        "code": "CREATE MATERIALIZED VIEW IF NOT EXISTS DEMO_MV AS SELECT ORDER_ID,AMOUNT FROM ORDERS WHERE STATUS='completed';\nSELECT SUM(AMOUNT) FROM DEMO_MV;\nDROP MATERIALIZED VIEW IF EXISTS DEMO_MV;",
        "hint": "",
        "textOutput": "1300; al finalizar se elimina la vista de prueba.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/external-tables",
    "remember": "El almacenamiento fuente permanece fuera de Snowflake; comprueba refresco de metadatos.",
    "note": "Necesita bucket y permisos externos; no hay archivos de nube en el laboratorio local.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/external-tables/1",
        "title": "Consultar archivos Parquet externos",
        "code": "",
        "steps": [
          "Configura un external stage autorizado con archivos Parquet.",
          "Crea una external table con LOCATION apuntando a ese stage y formato PARQUET.",
          "Refresca sus metadatos cuando corresponda y consulta SELECT COUNT(*) FROM la tabla creada."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conteo de filas de los archivos registrados, según el dataset externo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/hybrid-tables-e-indices",
    "remember": "Las tablas estándar no usan CREATE INDEX convencional; en ellas se optimiza de otra forma.",
    "note": "Requiere soporte regional, permisos y recursos; no usar para el laboratorio básico.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/hybrid-tables-e-indices/1",
        "title": "Crear una tabla operativa",
        "language": "sql",
        "code": "CREATE HYBRID TABLE IF NOT EXISTS DEMO_HYBRID(ID NUMBER PRIMARY KEY, LABEL VARCHAR);\nSHOW HYBRID TABLES LIKE 'DEMO_HYBRID';",
        "hint": "",
        "textOutput": "Objeto hybrid visible si la cuenta y región lo permiten.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/iceberg-external-volumes-y-catalogo",
    "remember": "Distingue catálogo administrado por Snowflake de catálogo externo.",
    "note": "No se puede reproducir sin almacenamiento y catálogo autorizados.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/iceberg-external-volumes-y-catalogo/1",
        "title": "Registrar un dataset abierto",
        "code": "",
        "steps": [
          "Configura un external volume con permisos restringidos sobre el bucket de prueba.",
          "Selecciona catálogo Snowflake o una integración externa compatible.",
          "Crea la Iceberg table con la configuración de catálogo y ubicación.",
          "Consulta sus filas y comprueba el catálogo/metadatos."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La tabla expone el dataset Iceberg y conserva su formato abierto; los datos dependen del bucket.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/vistas-y-tablas-especializadas/delta-direct",
    "remember": "Comprueba soporte del catálogo, protocolo Delta y restricciones antes de decidir entre lectura directa o conversión.",
    "note": "Depende de la disponibilidad y modalidad de interoperabilidad en la cuenta.",
    "examples": [
      {
        "id": "snowflake/vistas-y-tablas-especializadas/delta-direct/1",
        "title": "Evaluar una tabla Delta externa",
        "code": "",
        "steps": [
          "En una cuenta compatible, configura el acceso al almacenamiento con un dataset Delta existente.",
          "Sigue la guía oficial de Delta Direct para registrar la tabla y sus metadatos.",
          "Compara COUNT(*) con el snapshot de origen y verifica cambios tras refrescar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Conteo coherente con el snapshot registrado; no se presupone escritura ni actualización automática.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
