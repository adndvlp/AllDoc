// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/definicion",
    "remember": "Una función debe dejar claro quién abre, confirma y cierra la conexión.",
    "examples": [
      {
        "id": "mysql-connector-python/organizacion-y-pruebas/definicion/1",
        "title": "Definir una función de lectura reutilizable",
        "language": "python",
        "code": "def nombre_cliente(key):\n    with abrir() as cnx, cnx.cursor() as cur:\n        cur.execute(\"SELECT name FROM customers WHERE customer_id=%s\", (key,))\n        row = cur.fetchone()\n        return None if row is None else row[0]\nprint(nombre_cliente(1))",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/inyeccion-de-dependencias",
    "remember": "El código que recibe una conexión no debe cerrarla si no es su propietario.",
    "examples": [
      {
        "id": "mysql-connector-python/organizacion-y-pruebas/inyeccion-de-dependencias/1",
        "title": "Consultar con una conexión proporcionada",
        "language": "python",
        "code": "def contar(cnx):\n    with cnx.cursor() as cur:\n        cur.execute(\"SELECT COUNT(*) FROM orders\")\n        return cur.fetchone()[0]\nwith abrir() as cnx:\n    print(contar(cnx))",
        "hint": "",
        "textOutput": "5.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/pruebas-de-integracion",
    "remember": "Usa datos controlados y no ejecutes pruebas destructivas sobre producción.",
    "examples": [
      {
        "id": "mysql-connector-python/organizacion-y-pruebas/pruebas-de-integracion/1",
        "title": "Comprobar un resultado conocido",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    cur.execute(\"SELECT COUNT(*) FROM orders WHERE status='completed'\")\n    assert cur.fetchone()[0] == 4\n    print(\"OK\")",
        "hint": "",
        "textOutput": "OK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/mocking-y-pruebas-unitarias",
    "remember": "Un mock no demuestra que el SQL sea válido en el servidor.",
    "examples": [
      {
        "id": "mysql-connector-python/organizacion-y-pruebas/mocking-y-pruebas-unitarias/1",
        "title": "Probar una función de conteo",
        "language": "python",
        "code": "from unittest.mock import MagicMock\ndef contar(cur):\n    cur.execute(\"SELECT COUNT(*) FROM orders\")\n    return cur.fetchone()[0]\ncur = MagicMock()\ncur.fetchone.return_value = (5,)\nassert contar(cur) == 5\ncur.execute.assert_called_once_with(\"SELECT COUNT(*) FROM orders\")\nprint(\"OK\")",
        "hint": "",
        "textOutput": "OK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/organizacion-y-pruebas/logging-y-automatizacion",
    "remember": "El programador de tareas es externo al conector; no registra ni programa reportes automáticamente.",
    "examples": [
      {
        "id": "mysql-connector-python/organizacion-y-pruebas/logging-y-automatizacion/1",
        "title": "Registrar la cantidad de pedidos",
        "language": "python",
        "code": "with abrir() as cnx, cnx.cursor(buffered=True) as cur:\n    import logging\n    logging.basicConfig(level=logging.INFO)\n    cur.execute(\"SELECT COUNT(*) FROM orders\")\n    logging.info(\"Pedidos: %s\",cur.fetchone()[0])",
        "hint": "",
        "textOutput": "Un mensaje de nivel INFO con Pedidos: 5, si el nivel de logging lo permite.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
