// Generado desde specs/snowflake.md por scripts/prepare-snowflake-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/snowflake/roles-y-privilegios/definicion",
    "remember": "Usa mínimo privilegio: acceso a datos, contenedores y cómputo son permisos distintos.",
    "examples": [
      {
        "id": "snowflake/roles-y-privilegios/definicion/1",
        "title": "Comprobar rol activo",
        "language": "sql",
        "code": "SELECT CURRENT_ROLE();\nSHOW GRANTS TO ROLE PUBLIC;",
        "hint": "",
        "textOutput": "Rol de sesión y concesiones visibles a PUBLIC.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/roles-y-privilegios/roles-del-sistema",
    "remember": "No uses ACCOUNTADMIN para consultas de trabajo diario.",
    "examples": [
      {
        "id": "snowflake/roles-y-privilegios/roles-del-sistema/1",
        "title": "Inspeccionar jerarquía",
        "language": "sql",
        "code": "SHOW ROLES;",
        "hint": "",
        "textOutput": "Roles visibles para el rol activo; no se presupone acceso a todos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/roles-y-privilegios/grant-revoke-y-jerarquia",
    "remember": "SELECT sobre tabla no basta: hacen falta USAGE sobre base, esquema y warehouse para la consulta habitual.",
    "note": "Ejecuta solo con un administrador autorizado. Para retirar acceso: REVOKE SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS FROM ROLE ALLDOC_READER.",
    "examples": [
      {
        "id": "snowflake/roles-y-privilegios/grant-revoke-y-jerarquia/1",
        "title": "Conceder acceso de lectura al laboratorio",
        "language": "sql",
        "code": "CREATE ROLE IF NOT EXISTS ALLDOC_READER;\nGRANT USAGE ON WAREHOUSE ALLDOC_WH TO ROLE ALLDOC_READER;\nGRANT USAGE ON DATABASE ALLDOC_LAB TO ROLE ALLDOC_READER;\nGRANT USAGE ON SCHEMA ALLDOC_LAB.PRACTICE TO ROLE ALLDOC_READER;\nGRANT SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS TO ROLE ALLDOC_READER;\nSHOW GRANTS TO ROLE ALLDOC_READER;",
        "hint": "",
        "textOutput": "Concesiones indicadas visibles; asignar el rol al usuario autorizado es un paso aparte.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/roles-y-privilegios/future-grants-y-ownership",
    "remember": "GRANT sobre tablas existentes no cubre automáticamente las futuras.",
    "note": "Requiere rol y autorización de la ficha anterior; evitar en esquemas con datos sensibles.",
    "examples": [
      {
        "id": "snowflake/roles-y-privilegios/future-grants-y-ownership/1",
        "title": "Configurar lectura de tablas futuras",
        "language": "sql",
        "code": "GRANT SELECT ON FUTURE TABLES IN SCHEMA ALLDOC_LAB.PRACTICE TO ROLE ALLDOC_READER;\nSHOW FUTURE GRANTS IN SCHEMA ALLDOC_LAB.PRACTICE;",
        "hint": "",
        "textOutput": "Concesión futura visible; no altera permisos de tablas actuales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/snowflake/roles-y-privilegios/database-roles-y-managed-access-schemas",
    "remember": "Un database role se concede a roles de cuenta para su uso, no se activa como rol de cuenta.",
    "note": "Requiere permisos de creación y concesión.",
    "examples": [
      {
        "id": "snowflake/roles-y-privilegios/database-roles-y-managed-access-schemas/1",
        "title": "Diseñar rol de lectura limitado",
        "language": "sql",
        "code": "CREATE DATABASE ROLE IF NOT EXISTS ALLDOC_LAB.DEMO_DB_READER;\nGRANT USAGE ON DATABASE ALLDOC_LAB TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;\nGRANT USAGE ON SCHEMA ALLDOC_LAB.PRACTICE TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;\nGRANT SELECT ON TABLE ALLDOC_LAB.PRACTICE.ORDERS TO DATABASE ROLE ALLDOC_LAB.DEMO_DB_READER;",
        "hint": "",
        "textOutput": "Database role con permisos de datos; para usarlo concédelo a un rol de cuenta autorizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
