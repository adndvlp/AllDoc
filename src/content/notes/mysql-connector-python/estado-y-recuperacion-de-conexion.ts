// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/definicion",
    "remember": "Una conexión nueva no restaura una transacción anterior.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/definicion/1",
        "title": "Comprobar la conexión",
        "language": "python",
        "code": "with abrir() as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True mientras el servidor responde.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/is-connected-y-connected",
    "remember": "Prefiere connected en versiones actuales; no garantiza que la próxima operación funcione.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/is-connected-y-connected/1",
        "title": "Consultar el estado actual",
        "language": "python",
        "code": "with abrir() as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/ping",
    "remember": "No reconectes silenciosamente dentro de una transacción.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/ping/1",
        "title": "Comprobar el servidor",
        "language": "python",
        "code": "with abrir() as cnx:\n    cnx.ping(reconnect=False)\n    print(\"disponible\")",
        "hint": "",
        "textOutput": "disponible si responde; excepción si falla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reconnect",
    "remember": "Se pierden variables de sesión, temporales y transacciones no confirmadas de la sesión anterior.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/reconnect/1",
        "title": "Reconectar una sesión sin cambios pendientes",
        "language": "python",
        "code": "cnx = abrir()\ntry:\n    cnx.close()\n    cnx.reconnect(attempts=2, delay=1)\n    print(cnx.connected)\nfinally:\n    cnx.close()",
        "hint": "",
        "textOutput": "True si el servidor está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/timeouts",
    "remember": "Un timeout no demuestra que el servidor no ejecutó una escritura.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/timeouts/1",
        "title": "Abrir con tiempos máximos",
        "language": "python",
        "code": "with abrir(connection_timeout=5, read_timeout=10, write_timeout=10) as cnx:\n    print(cnx.connected)",
        "hint": "",
        "textOutput": "True si se conecta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/reintentos-y-backoff",
    "remember": "Reintenta la transacción completa; no repitas escrituras de resultado incierto sin idempotencia.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/reintentos-y-backoff/1",
        "title": "Reintentar una lectura ante un deadlock",
        "language": "python",
        "code": "import time\nfor intento in range(3):\n    try:\n        with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n            cur.execute(\"SELECT COUNT(*) FROM orders\")\n            print(cur.fetchone()[0])\n        break\n    except mysql.connector.Error as exc:\n        if exc.errno not in (1205, 1213) or intento == 2:\n            raise\n        time.sleep(0.2 * 2**intento)",
        "hint": "",
        "textOutput": "5 normalmente; ante los códigos indicados se reintenta hasta tres veces.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/estado-y-recuperacion-de-conexion/failover",
    "remember": "No replica datos ni conserva transacciones; las alternativas deben estar preparadas por infraestructura.",
    "note": "El segundo destino es ilustrativo; requiere otro servidor configurado.",
    "examples": [
      {
        "id": "mysql-connector-python/estado-y-recuperacion-de-conexion/failover/1",
        "title": "Conectar a uno de dos destinos de laboratorio",
        "language": "python",
        "code": "destinos = [{\"host\": CONFIG[\"host\"], \"port\": CONFIG[\"port\"]}, {\"host\": \"127.0.0.1\", \"port\": 3307}]\nbase = {k:v for k,v in CONFIG.items() if k not in (\"host\",\"port\")}\nwith mysql.connector.connect(**base, failover=destinos) as cnx:\n    print(cnx.database)",
        "hint": "",
        "textOutput": "alldoc_connector_lab si al menos un destino está disponible y contiene la base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
