// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/definicion",
    "remember": "Dos conexiones pueden tener configuraciones distintas.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/definicion/1",
        "title": "Consultar el esquema activo",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT DATABASE()\")\n    print(cur.fetchone())",
        "hint": "",
        "textOutput": "('alldoc_connector_lab',).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/config",
    "remember": "Para una conexión nueva suele ser más sencillo connect(**CONFIG).",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/config/1",
        "title": "Configurar y abrir un objeto sin conexión",
        "language": "python",
        "code": "from mysql.connector import MySQLConnection\ncnx = MySQLConnection()\ntry:\n    cnx.config(**CONFIG)\n    cnx.connect()\n    print(cnx.database)\nfinally:\n    cnx.close()",
        "hint": "",
        "textOutput": "alldoc_connector_lab.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/sql-mode",
    "remember": "No desactives restricciones para ocultar errores de consultas.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/sql-mode/1",
        "title": "Comprobar reglas activas",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT @@SESSION.sql_mode\")\n    print(cur.fetchone()[0])",
        "hint": "",
        "textOutput": "Una cadena de modos configurados en el servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/time-zone",
    "remember": "Usa una zona coherente en extracción y carga.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/time-zone/1",
        "title": "Usar UTC en la sesión",
        "language": "python",
        "code": "with abrir(time_zone=\"+00:00\") as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT @@session.time_zone\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('+00:00',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/charset-collation-y-unicode",
    "remember": "No confundas codificación de caracteres con reglas de comparación.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/charset-collation-y-unicode/1",
        "title": "Comprobar una conexión Unicode",
        "language": "python",
        "code": "with abrir(charset=\"utf8mb4\", collation=\"utf8mb4_0900_ai_ci\", use_unicode=True) as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT %s\", (\"México\",))\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('México',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/variables-de-sesion-e-init-command",
    "remember": "No pongas datos sensibles en comandos de inicialización.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/variables-de-sesion-e-init-command/1",
        "title": "Inicializar una variable de sesión",
        "language": "python",
        "code": "with abrir(init_command=\"SET @canal = 'web'\") as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT @canal\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[('web',)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/reset-session",
    "remember": "No lo uses mientras necesitas una transacción, variable o tabla temporal.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/reset-session/1",
        "title": "Eliminar una variable de sesión",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SET @canal='web'\")\n    cnx.reset_session()\n    cur.execute(\"SELECT @canal\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(None,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/sesion-y-configuracion/archivos-de-opciones",
    "remember": "Protege permisos del archivo y evita subirlo a Git.",
    "note": "Crea previamente lab.cnf con [connector_python], host, user y password de laboratorio.",
    "examples": [
      {
        "id": "mysql-connector-python/sesion-y-configuracion/archivos-de-opciones/1",
        "title": "Abrir con un archivo de opciones",
        "language": "python",
        "code": "with mysql.connector.connect(option_files=\"lab.cnf\", option_groups=[\"connector_python\"], database=\"alldoc_connector_lab\") as cnx:\n    print(cnx.database)",
        "hint": "",
        "textOutput": "alldoc_connector_lab si el archivo contiene credenciales y host válidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
