// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/definicion",
    "remember": "La conexión representa la sesión; el cursor ejecuta instrucciones.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/definicion/1",
        "title": "Abrir una sesión",
        "language": "python",
        "code": "with mysql.connector.connect(**CONFIG) as cnx:\n    print(cnx.database)",
        "hint": "",
        "textOutput": "alldoc_connector_lab.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/argumentos-de-conexion",
    "remember": "Una base existente debe estar accesible para la cuenta.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/argumentos-de-conexion/1",
        "title": "Configurar el destino",
        "language": "python",
        "code": "with abrir(host=\"127.0.0.1\", port=3306) as cnx:\n    print(cnx.database)",
        "hint": "",
        "textOutput": "alldoc_connector_lab si el servidor local está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/diccionario-y-kwargs",
    "remember": "Centraliza parámetros y cambia solo lo necesario.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/diccionario-y-kwargs/1",
        "title": "Modificar una opción de conexión",
        "language": "python",
        "code": "opciones = CONFIG | {\"connection_timeout\": 5}\nwith mysql.connector.connect(**opciones) as cnx:\n    print(cnx.database)",
        "hint": "",
        "textOutput": "alldoc_connector_lab.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/variables-de-entorno",
    "remember": "No imprimas ni registres contraseñas.",
    "note": "Un archivo .env requiere cargarlo explícitamente, por ejemplo con python-dotenv; no es automático.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/variables-de-entorno/1",
        "title": "Verificar la presencia de credenciales",
        "language": "python",
        "code": "import os\nprint(\"MYSQL_USER\" in os.environ, \"MYSQL_PASSWORD\" in os.environ)",
        "hint": "",
        "textOutput": "True True con la preparación indicada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/database-y-connection-id",
    "remember": "Cada conexión tiene su propia sesión.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/database-y-connection-id/1",
        "title": "Consultar la identidad de una sesión",
        "language": "python",
        "code": "with abrir() as cnx:\n    print(cnx.database, cnx.connection_id, cnx.server_info)",
        "hint": "",
        "textOutput": "Nombre de base, identificador numérico y versión del servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/cerrar-y-liberar",
    "remember": "Cerrar no confirma escrituras pendientes.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/cerrar-y-liberar/1",
        "title": "Cerrar explícitamente",
        "language": "python",
        "code": "cnx = abrir()\ncur = cnx.cursor()\ntry:\n    cur.execute(\"SELECT 1\")\n    print(cur.fetchall())\nfinally:\n    cur.close()\n    cnx.close()",
        "hint": "",
        "textOutput": "[(1,)] y recursos liberados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/conexion/context-managers",
    "remember": "Usa commit explícito si quieres conservar cambios.",
    "examples": [
      {
        "id": "mysql-connector-python/conexion/context-managers/1",
        "title": "Limitar el alcance de los recursos",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT 1\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1,)] y cierre automático.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
