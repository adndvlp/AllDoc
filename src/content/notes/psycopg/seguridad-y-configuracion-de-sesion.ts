// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/definicion",
    "remember": "El controlador no sustituye la seguridad del servidor.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/definicion/1",
        "title": "Identificar el usuario de sesión",
        "language": "python",
        "code": "print(cur.execute(\"SELECT current_user\").fetchone()[0])",
        "hint": "El controlador no sustituye la seguridad del servidor.",
        "textOutput": "Nombre del rol autenticado en PostgreSQL.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/ssl-y-tls",
    "remember": "Para datos sensibles en una red no confiable, configurar verificación de identidad además de cifrado.",
    "note": "No ejecuta la conexión; sustituir la ruta por una CA válida y configurar `sslcert` y `sslkey` si se exige autenticación mutua. No imprimir la cadena completa.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/ssl-y-tls/1",
        "title": "Construir una conexión con verificación completa",
        "language": "python",
        "code": "from psycopg.conninfo import make_conninfo, conninfo_to_dict\nseguro = make_conninfo(DSN, sslmode=\"verify-full\", sslrootcert=\"/ruta/ca.pem\")\nprint(conninfo_to_dict(seguro)[\"sslmode\"])",
        "hint": "Para datos sensibles en una red no confiable, configurar verificación de identidad además de cifrado.",
        "textOutput": "`verify-full`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/connect-timeout",
    "remember": "Configurar tiempos de conexión y de consulta por separado.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/connect-timeout/1",
        "title": "Conectar con límite de espera",
        "language": "python",
        "code": "with psycopg.connect(DSN, connect_timeout=5) as c:\n    print(c.execute(\"SELECT 1\").fetchone())",
        "hint": "Configurar tiempos de conexión y de consulta por separado.",
        "textOutput": "`(1,)` si conecta; una excepción OperationalError si falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/statement-timeout",
    "remember": "Capturar QueryCanceled y restablecer la transacción si falla.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/statement-timeout/1",
        "title": "Limitar una consulta de demostración",
        "language": "python",
        "code": "cur.execute(\"SET LOCAL statement_timeout='100ms'\")\ntry:\n    cur.execute(\"SELECT pg_sleep(1)\")\nexcept psycopg.errors.QueryCanceled:\n    conn.rollback()\n    print(\"Tiempo agotado\")",
        "hint": "Capturar QueryCanceled y restablecer la transacción si falla.",
        "textOutput": "`Tiempo agotado`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/lock-timeout",
    "remember": "Usarlo cuando esperar indefinidamente por un bloqueo no sea aceptable.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/lock-timeout/1",
        "title": "Configurar un límite de bloqueo local",
        "language": "python",
        "code": "cur.execute(\"SET LOCAL lock_timeout='500ms'\")\nprint(cur.execute(\"SHOW lock_timeout\").fetchone())",
        "hint": "Usarlo cuando esperar indefinidamente por un bloqueo no sea aceptable.",
        "textOutput": "`('500ms',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/parametros-de-sesion-y-encoding",
    "remember": "La codificación del cliente condiciona la transferencia de texto.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/parametros-de-sesion-y-encoding/1",
        "title": "Consultar codificación y zona horaria",
        "language": "python",
        "code": "print(conn.info.encoding)\nprint(cur.execute(\"SHOW TimeZone\").fetchone())",
        "hint": "La codificación del cliente condiciona la transferencia de texto.",
        "textOutput": "Codificación Python, por ejemplo `utf-8`, y la zona horaria configurada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/permisos-y-minimo-privilegio",
    "remember": "`read_only` no reemplaza GRANT y REVOKE administrados en el servidor.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/permisos-y-minimo-privilegio/1",
        "title": "Comprobar el permiso de lectura",
        "language": "python",
        "code": "cur.execute(\"SELECT has_table_privilege(current_user, 'clientes', 'SELECT')\")\nprint(cur.fetchone())",
        "hint": "`read_only` no reemplaza GRANT y REVOKE administrados en el servidor.",
        "textOutput": "`(True,)` para el usuario que creó el dataset.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/seguridad-y-configuracion-de-sesion/logging",
    "remember": "No registrar contraseñas ni parámetros sensibles.",
    "note": "No garantiza un registro completo de cada sentencia SQL.",
    "examples": [
      {
        "id": "psycopg/seguridad-y-configuracion-de-sesion/logging/1",
        "title": "Configurar diagnósticos del controlador",
        "language": "python",
        "code": "import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.getLogger(\"psycopg\").setLevel(logging.DEBUG)\nwith psycopg.connect(DSN) as c:\n    print(c.execute(\"SELECT 1\").fetchone())",
        "hint": "No registrar contraseñas ni parámetros sensibles.",
        "textOutput": "`(1,)`; pueden aparecer mensajes diagnósticos dependiendo de la implementación y configuración de logging.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
