// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/conexiones/definicion",
    "remember": "Una conexión no es una consulta ni un cursor.",
    "examples": [
      {
        "id": "psycopg/conexiones/definicion/1",
        "title": "Comprobar la comunicación",
        "language": "python",
        "code": "with psycopg.connect(DSN) as conn:\n    print(conn.execute(\"SELECT 1\").fetchone())",
        "hint": "Una conexión no es una consulta ni un cursor.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/connect-y-argumentos",
    "remember": "Los argumentos nombrados sobrescriben los valores equivalentes de la cadena.",
    "note": "Otros argumentos: `host`, `port`, `dbname`, `user`, `password`; usa valores de tu entorno.",
    "examples": [
      {
        "id": "psycopg/conexiones/connect-y-argumentos/1",
        "title": "Conectar a la base configurada",
        "language": "python",
        "code": "with psycopg.connect(DSN, connect_timeout=5) as conn:\n    print(conn.info.dbname)",
        "hint": "Los argumentos nombrados sobrescriben los valores equivalentes de la cadena.",
        "textOutput": "Nombre de la base configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/dsn-y-uri",
    "remember": "Los dos formatos describen cómo conectarse al mismo servidor.",
    "note": "El ejemplo solo construye la cadena; no intenta conectar.",
    "examples": [
      {
        "id": "psycopg/conexiones/dsn-y-uri/1",
        "title": "Construir una configuración sin contraseña literal",
        "language": "python",
        "code": "from psycopg.conninfo import make_conninfo\nprint(make_conninfo(\"\", host=\"localhost\", port=5432, dbname=\"alldoc_psycopg\"))",
        "hint": "Los dos formatos describen cómo conectarse al mismo servidor.",
        "textOutput": "Una cadena con `host=localhost`, `port=5432` y `dbname=alldoc_psycopg`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/variables-de-entorno-y-credenciales",
    "remember": "No escribir contraseñas en repositorios ni imprimir DSN con secretos.",
    "note": "Preferir un gestor de secretos o archivo de contraseñas protegido; `PGPASSWORD` puede quedar expuesta en algunos entornos.",
    "examples": [
      {
        "id": "psycopg/conexiones/variables-de-entorno-y-credenciales/1",
        "title": "Comprobar que se configuró una base",
        "language": "python",
        "code": "import os\nprint(bool(os.getenv(\"DATABASE_URL\") or os.getenv(\"PGDATABASE\")))",
        "hint": "No escribir contraseñas en repositorios ni imprimir DSN con secretos.",
        "textOutput": "`True` si existe alguna de esas configuraciones.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/close-y-estado-de-conexion",
    "remember": "Cerrar sin confirmar revierte cambios pendientes.",
    "examples": [
      {
        "id": "psycopg/conexiones/close-y-estado-de-conexion/1",
        "title": "Cerrar explícitamente",
        "language": "python",
        "code": "c = psycopg.connect(DSN)\nprint(c.closed, c.broken)\nc.close()\nprint(c.closed)",
        "hint": "Cerrar sin confirmar revierte cambios pendientes.",
        "textOutput": "`False False`, luego `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/context-manager-de-conexion",
    "remember": "La sangría delimita el ciclo de vida de la sesión.",
    "examples": [
      {
        "id": "psycopg/conexiones/context-manager-de-conexion/1",
        "title": "Cerrar automáticamente",
        "language": "python",
        "code": "with psycopg.connect(DSN) as c:\n    print(c.closed)\nprint(c.closed)",
        "hint": "La sangría delimita el ciclo de vida de la sesión.",
        "textOutput": "`False`, luego `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/informacion-de-sesion",
    "remember": "Consultar `info` no equivale a ejecutar otra consulta.",
    "note": "Evitar publicar `conn.info.dsn` u otros datos sensibles.",
    "examples": [
      {
        "id": "psycopg/conexiones/informacion-de-sesion/1",
        "title": "Inspeccionar el servidor",
        "language": "python",
        "code": "print(conn.info.dbname, conn.info.server_version)\nprint(conn.info.transaction_status.name)",
        "hint": "Consultar `info` no equivale a ejecutar otra consulta.",
        "textOutput": "Nombre de base, versión codificada como entero y `IDLE` si no se ejecutó SQL todavía.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/conexiones/conninfo-to-dict-y-make-conninfo",
    "remember": "Sirven para configurar, no para conectarse.",
    "examples": [
      {
        "id": "psycopg/conexiones/conninfo-to-dict-y-make-conninfo/1",
        "title": "Cambiar el puerto de una cadena",
        "language": "python",
        "code": "from psycopg.conninfo import conninfo_to_dict, make_conninfo\ncfg = conninfo_to_dict(\"host=localhost port=5432\")\nprint(conninfo_to_dict(make_conninfo(**(cfg | {\"port\": 5433}))))",
        "hint": "Sirven para configurar, no para conectarse.",
        "textOutput": "Un diccionario con `host: localhost` y `port: 5433` (valores de texto).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
