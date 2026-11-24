// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/connection-pooling/definicion",
    "remember": "close() devuelve al pool una conexión prestada, no necesariamente cierra el socket.",
    "examples": [
      {
        "id": "mysql-connector-python/connection-pooling/definicion/1",
        "title": "Crear un pool y tomar una conexión",
        "language": "python",
        "code": "from mysql.connector.pooling import MySQLConnectionPool\npool = MySQLConnectionPool(pool_name=\"lab_pool\", pool_size=2, **CONFIG)\nwith pool.get_connection() as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT 1\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(1,)]; la conexión regresa al pool.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/connection-pooling/pool-name-y-pool-size",
    "remember": "Elige tamaño según concurrencia y límites del servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/connection-pooling/pool-name-y-pool-size/1",
        "title": "Crear un pool implícito",
        "language": "python",
        "code": "with abrir(pool_name=\"lab_implicit\", pool_size=2) as cnx:\n    print(cnx.pool_name)",
        "hint": "",
        "textOutput": "lab_implicit.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/connection-pooling/poolerror",
    "remember": "Devuelve siempre las conexiones, incluso ante fallos.",
    "examples": [
      {
        "id": "mysql-connector-python/connection-pooling/poolerror/1",
        "title": "Detectar un pool agotado",
        "language": "python",
        "code": "from mysql.connector.pooling import MySQLConnectionPool\nfrom mysql.connector.errors import PoolError\npool = MySQLConnectionPool(pool_size=1, **CONFIG)\nwith pool.get_connection() as cnx:\n    try:\n        pool.get_connection()\n    except PoolError:\n        print(\"agotado\")",
        "hint": "",
        "textOutput": "agotado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/connection-pooling/pool-reset-session",
    "remember": "No dependas de variables de sesión de una conexión prestada anteriormente.",
    "examples": [
      {
        "id": "mysql-connector-python/connection-pooling/pool-reset-session/1",
        "title": "Verificar el aislamiento entre préstamos",
        "language": "python",
        "code": "from mysql.connector.pooling import MySQLConnectionPool\npool = MySQLConnectionPool(pool_size=1, pool_reset_session=True, **CONFIG)\nwith pool.get_connection() as cnx, cnx.cursor() as cur:\n    cur.execute(\"SET @x=7\")\nwith pool.get_connection() as cnx, cnx.cursor() as cur:\n    cur.execute(\"SELECT @x\")\n    print(cur.fetchall())",
        "hint": "",
        "textOutput": "[(None,)].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
