// Generado desde specs/mysql-connector-python.md por scripts/prepare-mysql-connector-python-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/definicion",
    "remember": "El paquete se instala con guiones y se importa con puntos.",
    "examples": [
      {
        "id": "mysql-connector-python/instalacion-y-db-api/definicion/1",
        "title": "Comprobar que está instalado",
        "language": "python",
        "code": "import mysql.connector\nprint(mysql.connector.__version__)",
        "hint": "",
        "textOutput": "La versión instalada del conector.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/instalacion",
    "remember": "Usa python -m pip para seleccionar el intérprete.",
    "examples": [
      {
        "id": "mysql-connector-python/instalacion-y-db-api/instalacion/1",
        "title": "Instalar y consultar el paquete",
        "language": "bash",
        "code": "python -m pip install mysql-connector-python\npython -m pip show mysql-connector-python",
        "hint": "",
        "textOutput": "Información del paquete instalado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/db-api-2-0",
    "remember": "threadsafety 1 permite compartir el módulo, no una conexión entre hilos.",
    "examples": [
      {
        "id": "mysql-connector-python/instalacion-y-db-api/db-api-2-0/1",
        "title": "Consultar capacidades",
        "language": "python",
        "code": "print(mysql.connector.apilevel)\nprint(mysql.connector.paramstyle)\nprint(mysql.connector.threadsafety)",
        "hint": "",
        "textOutput": "2.0, pyformat, 1 (en líneas separadas).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/mysql-connector-python/instalacion-y-db-api/python-puro-y-extension-c",
    "remember": "El comportamiento público es similar; mide antes de elegir.",
    "examples": [
      {
        "id": "mysql-connector-python/instalacion-y-db-api/python-puro-y-extension-c/1",
        "title": "Abrir usando Python puro",
        "language": "python",
        "code": "with abrir(use_pure=True) as cnx:\n    print(type(cnx).__name__)",
        "hint": "",
        "textOutput": "MySQLConnection.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
