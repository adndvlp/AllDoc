// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/definicion",
    "remember": "Combina permisos, políticas, clasificación, trazabilidad y auditoría.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/definicion/1",
        "title": "Revisar exposición de columnas",
        "language": "sql",
        "code": "SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='PRACTICE' AND TABLE_NAME='CUSTOMERS' ORDER BY ORDINAL_POSITION;",
        "hint": "",
        "textOutput": "CUSTOMER_ID, NAME, COUNTRY, SIGNUP_DATE y sus tipos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/masking-policies",
    "remember": "No modifica el dato almacenado; requiere edición y privilegios compatibles.",
    "note": "Ejemplo didáctico de roles, no una política de producción. Requiere permisos de creación y aplicación.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/masking-policies/1",
        "title": "Enmascarar correo en tabla de prueba",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_MASK CLONE LEADS;\nCREATE OR REPLACE MASKING POLICY DEMO_EMAIL_MASK AS (v VARCHAR) RETURNS VARCHAR -> CASE WHEN CURRENT_ROLE()='ALLDOC_READER' THEN v ELSE '***' END;\nALTER TABLE DEMO_MASK MODIFY COLUMN EMAIL SET MASKING POLICY DEMO_EMAIL_MASK;\nSELECT EMAIL FROM DEMO_MASK WHERE LEAD_ID=1;",
        "hint": "",
        "textOutput": "ana@example.com si rol activo es ALLDOC_READER; *** para otros roles con acceso.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/row-access-policies",
    "remember": "La política no reemplaza GRANT SELECT; puede usar tablas de mapeo de acceso.",
    "note": "Requiere edición y permisos compatibles.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/row-access-policies/1",
        "title": "Restringir filas por país",
        "language": "sql",
        "code": "CREATE OR REPLACE TABLE DEMO_ROWS CLONE CUSTOMERS;\nCREATE OR REPLACE ROW ACCESS POLICY DEMO_COUNTRY_POLICY AS (c VARCHAR) RETURNS BOOLEAN -> c='Mexico';\nALTER TABLE DEMO_ROWS ADD ROW ACCESS POLICY DEMO_COUNTRY_POLICY ON (COUNTRY);\nSELECT COUNT(*) FROM DEMO_ROWS;",
        "hint": "",
        "textOutput": "3 filas visibles con país Mexico.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/tags-clasificacion-y-lineage",
    "remember": "Un tag por sí solo no enmascara; necesita una política/configuración asociada.",
    "note": "La clasificación automática y lineage dependen de edición y permisos.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/tags-clasificacion-y-lineage/1",
        "title": "Etiquetar una columna de correo",
        "language": "sql",
        "code": "CREATE TAG IF NOT EXISTS DEMO_SENSITIVITY;\nCREATE OR REPLACE TABLE DEMO_TAGGED CLONE LEADS;\nALTER TABLE DEMO_TAGGED MODIFY COLUMN EMAIL SET TAG DEMO_SENSITIVITY='PII';\nSELECT SYSTEM$GET_TAG('DEMO_SENSITIVITY','DEMO_TAGGED.EMAIL','COLUMN');",
        "hint": "",
        "textOutput": "PII, si el rol puede consultar el tag.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/aggregation-projection-y-join-policies",
    "remember": "No equivalen a eliminar columnas de un SELECT; las reglas afectan consultas autorizadas a objetos protegidos.",
    "note": "Disponibilidad y permisos específicos; no aplicar a las tablas compartidas.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/aggregation-projection-y-join-policies/1",
        "title": "Evaluar publicación de datos sensibles",
        "code": "",
        "steps": [
          "Sobre una copia de prueba, define un umbral de agregación y columnas que no deben proyectarse.",
          "Configura reglas de unión permitidas si procede.",
          "Prueba una consulta permitida y otra prohibida bajo un rol consumidor."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Consultas aceptadas, restringidas o rechazadas conforme a las políticas; la forma exacta depende de su definición.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/gobernanza-y-auditoria/access-history-y-login-history",
    "remember": "Son vistas con permisos, retención y latencia propios; no garantizan registro inmediato.",
    "note": "Access History requiere edición compatible y privilegios adecuados.",
    "examples": [
      {
        "id": "snowflake/gobernanza-y-auditoria/access-history-y-login-history/1",
        "title": "Inspeccionar accesos recientes",
        "language": "sql",
        "code": "SELECT EVENT_TIMESTAMP,USER_NAME,IS_SUCCESS FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY WHERE EVENT_TIMESTAMP>=DATEADD(DAY,-1,CURRENT_TIMESTAMP()) ORDER BY EVENT_TIMESTAMP DESC LIMIT 10;",
        "hint": "",
        "textOutput": "Hasta diez eventos reales visibles; no se pueden predecir usuarios o cantidades.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
