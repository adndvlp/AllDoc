// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/definicion",
    "remember": "Python ejecuta el controlador; PostgreSQL ejecuta el SQL.",
    "note": "El servidor PostgreSQL se instala o contrata por separado.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/definicion/1",
        "title": "Consultar la versión instalada",
        "language": "python",
        "code": "import psycopg\nprint(psycopg.__version__)",
        "hint": "Python ejecuta el controlador; PostgreSQL ejecuta el SQL.",
        "textOutput": "Una versión 3.3.x si se instaló el rango indicado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/instalacion-binaria",
    "remember": "Es la opción más sencilla para comenzar.",
    "note": "Usar un entorno virtual.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/instalacion-binaria/1",
        "title": "Instalar el controlador",
        "language": "bash",
        "code": "python -m pip install \"psycopg[binary]>=3.3,<3.4\"",
        "hint": "Es la opción más sencilla para comenzar.",
        "textOutput": "El import `psycopg` queda disponible en el entorno elegido.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/instalacion-local-y-python-puro",
    "remember": "El mismo import tiene distintas implementaciones.",
    "note": "Para Python puro usar `python -m pip install psycopg`. No es necesario instalar todas las variantes.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/instalacion-local-y-python-puro/1",
        "title": "Instalar la variante local",
        "language": "bash",
        "code": "python -m pip install \"psycopg[c]>=3.3,<3.4\"",
        "hint": "El mismo import tiene distintas implementaciones.",
        "textOutput": "Se compila la extensión C si hay compilador, cabeceras Python y desarrollo de libpq.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/psycopg-impl",
    "remember": "`psycopg.pq.__impl__` identifica la implementación efectiva.",
    "note": "Configurar `PSYCOPG_IMPL=binary`, `c` o `python` antes de arrancar Python si se necesita forzar una; falla si no está disponible.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/psycopg-impl/1",
        "title": "Inspeccionar la implementación",
        "language": "python",
        "code": "from psycopg import pq\nprint(pq.__impl__)\nprint(pq.version())",
        "hint": "`psycopg.pq.__impl__` identifica la implementación efectiva.",
        "textOutput": "`binary`, `c` o `python`, y la versión numérica de libpq.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/db-api-2-0",
    "remember": "La API común no hace portables todos los dialectos ni los marcadores.",
    "note": "Nivel 2: el módulo y las conexiones pueden compartirse entre hilos; los cursores no.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/db-api-2-0/1",
        "title": "Consultar el contrato del adaptador",
        "language": "python",
        "code": "print(psycopg.apilevel, psycopg.threadsafety, psycopg.paramstyle)",
        "hint": "La API común no hace portables todos los dialectos ni los marcadores.",
        "textOutput": "`2.0 2 pyformat`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/instalacion-y-compatibilidad/psycopg-2-frente-a-psycopg-3",
    "remember": "No reemplazar solamente el import sin revisar el comportamiento.",
    "note": "En Psycopg 3 el contexto de conexión también la cierra; la vinculación de parámetros suele ocurrir en el servidor. Véase el grupo Migración.",
    "examples": [
      {
        "id": "psycopg/instalacion-y-compatibilidad/psycopg-2-frente-a-psycopg-3/1",
        "title": "Importar el adaptador nuevo",
        "language": "python",
        "code": "import psycopg\nprint(psycopg.__version__.split(\".\")[0])",
        "hint": "No reemplazar solamente el import sin revisar el comportamiento.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
