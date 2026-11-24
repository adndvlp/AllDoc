// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/definicion",
    "remember": "Comprueba el contexto antes de ejecutar SQL.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/definicion/1",
        "title": "Ver el contexto",
        "language": "sql",
        "code": "SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();",
        "hint": "",
        "textOutput": "Rol autorizado, ALLDOC_WH, ALLDOC_LAB, PRACTICE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/database-y-schema",
    "remember": "El nombre completo es database.schema.objeto.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/database-y-schema/1",
        "title": "Consultar sin depender del esquema activo",
        "language": "sql",
        "code": "SELECT COUNT(*) FROM ALLDOC_LAB.PRACTICE.ORDERS;",
        "hint": "",
        "textOutput": "8.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/use-role-y-use-warehouse",
    "remember": "Cambiar de rol no concede permisos nuevos.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/use-role-y-use-warehouse/1",
        "title": "Seleccionar recursos",
        "language": "sql",
        "code": "USE WAREHOUSE ALLDOC_WH;\nUSE DATABASE ALLDOC_LAB;\nUSE SCHEMA PRACTICE;",
        "hint": "",
        "textOutput": "Las consultas posteriores utilizan ese contexto. Para cambiar rol, usa USE ROLE seguido de un rol que te hayan asignado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/identificadores-y-mayusculas",
    "remember": "Comillas simples para texto; dobles para identificadores.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/identificadores-y-mayusculas/1",
        "title": "Comparar alias",
        "language": "sql",
        "code": "SELECT 1 AS total, 2 AS \"Total\";",
        "hint": "",
        "textOutput": "Columnas TOTAL y Total con valores 1 y 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/snowsight-y-worksheets",
    "remember": "El editor usa una cuenta real y puede consumir créditos.",
    "note": "La navegación puede variar según la interfaz habilitada.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/snowsight-y-worksheets/1",
        "title": "Ejecutar la primera consulta",
        "code": "",
        "steps": [
          "Abre un editor SQL/worksheet disponible en Projects o Workspaces.",
          "Selecciona el rol y ALLDOC_WH, ejecuta USE SCHEMA ALLDOC_LAB.PRACTICE.",
          "Ejecuta SELECT COUNT(*) FROM ORDERS;"
        ],
        "external": true,
        "hint": "",
        "textOutput": "Resultado de una fila con 8; la consulta queda en el historial.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/contexto-y-snowsight/notebooks",
    "remember": "El runtime y los paquetes determinan qué código puede ejecutarse.",
    "examples": [
      {
        "id": "snowflake/contexto-y-snowsight/notebooks/1",
        "title": "Explorar ventas en un notebook",
        "code": "",
        "steps": [
          "Crea un notebook de prueba con recursos autorizados.",
          "En una celda SQL ejecuta SELECT SUM(AMOUNT) FROM ALLDOC_LAB.PRACTICE.ORDERS WHERE STATUS='completed'.",
          "Revisa la tabla de salida y detén el runtime al terminar."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1300; el resultado queda asociado a la celda.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
