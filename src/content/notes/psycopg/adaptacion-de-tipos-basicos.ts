// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/definicion",
    "remember": "El cast SQL puede indicar el tipo de destino cuando no es deducible.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/definicion/1",
        "title": "Ver los tipos de una fila",
        "language": "python",
        "code": "cur.execute(\"SELECT id, importe, fecha, nota FROM pedidos WHERE id=101\")\nfila = cur.fetchone()\nprint([type(x).__name__ for x in fila])",
        "hint": "El cast SQL puede indicar el tipo de destino cuando no es deducible.",
        "textOutput": "`['int', 'Decimal', 'date', 'NoneType']`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/int-y-wrappers-numericos",
    "remember": "El tipo del parámetro no siempre es INTEGER.",
    "note": "También existen `Int2`, `Int8`, `IntNumeric`, `Float4` y `Float8`; respeta sus límites.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/int-y-wrappers-numericos/1",
        "title": "Forzar un INTEGER de 32 bits",
        "language": "python",
        "code": "from psycopg.types.numeric import Int4\nprint(cur.execute(\"SELECT pg_typeof(%s)::text\", (Int4(42),)).fetchone())",
        "hint": "El tipo del parámetro no siempre es INTEGER.",
        "textOutput": "`('integer',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/float-y-decimal",
    "remember": "No convertir importes a float sin decidir cómo tratar la precisión.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/float-y-decimal/1",
        "title": "Sumar dos valores monetarios",
        "language": "python",
        "code": "from decimal import Decimal\ncur.execute(\"SELECT %s + %s\", (Decimal(\"0.10\"), Decimal(\"0.20\")))\nprint(cur.fetchone()[0])",
        "hint": "No convertir importes a float sin decidir cómo tratar la precisión.",
        "textOutput": "`0.30` como Decimal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/str-y-bool",
    "remember": "No escribir `'True'` como sustituto de un parámetro booleano.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/str-y-bool/1",
        "title": "Enviar texto y una condición",
        "language": "python",
        "code": "cur.execute(\"SELECT %s::text, %s::boolean\", (\"México\", True))\nprint(cur.fetchone())",
        "hint": "No escribir `'True'` como sustituto de un parámetro booleano.",
        "textOutput": "`('México', True)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/none-y-null",
    "remember": "NULL, cero y cadena vacía son valores distintos.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/none-y-null/1",
        "title": "Comprobar un nulo real",
        "language": "python",
        "code": "cur.execute(\"SELECT %s::text IS NULL\", (None,))\nprint(cur.fetchone())",
        "hint": "NULL, cero y cadena vacía son valores distintos.",
        "textOutput": "`(True,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/date-y-time",
    "remember": "No es necesario convertirlos manualmente en cadenas.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/date-y-time/1",
        "title": "Filtrar por fecha con un objeto Python",
        "language": "python",
        "code": "from datetime import date\ncur.execute(\"SELECT id FROM pedidos WHERE fecha=%s ORDER BY id\", (date(2026,1,10),))\nprint(cur.fetchall())",
        "hint": "No es necesario convertirlos manualmente en cadenas.",
        "textOutput": "`[(102,), (103,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/datetime-y-zonas-horarias",
    "remember": "Usar fechas conscientes de zona para instantes reales.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/datetime-y-zonas-horarias/1",
        "title": "Consultar un instante en UTC",
        "language": "python",
        "code": "from datetime import datetime, timezone\ncur.execute(\"SET LOCAL TIME ZONE 'UTC'\")\ncur.execute(\"SELECT %s::timestamptz\", (datetime(2026,1,5,12,tzinfo=timezone.utc),))\nprint(cur.fetchone()[0].isoformat())",
        "hint": "Usar fechas conscientes de zona para instantes reales.",
        "textOutput": "`2026-01-05T12:00:00+00:00`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/timedelta-e-interval",
    "remember": "Los intervalos SQL con meses no son equivalentes exactos a duraciones fijas Python.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/timedelta-e-interval/1",
        "title": "Sumar tres días a una fecha",
        "language": "python",
        "code": "from datetime import date, timedelta\ncur.execute(\"SELECT (%s::date + %s::interval)::date\", (date(2026,1,5), timedelta(days=3)))\nprint(cur.fetchone()[0])",
        "hint": "Los intervalos SQL con meses no son equivalentes exactos a duraciones fijas Python.",
        "textOutput": "`2026-01-08`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/bytes-y-bytea",
    "remember": "BYTEA almacena bytes, no texto codificado por conveniencia.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/bytes-y-bytea/1",
        "title": "Recuperar bytes",
        "language": "python",
        "code": "cur.execute(\"SELECT %s::bytea\", (b\"ABC\",))\nprint(cur.fetchone()[0])",
        "hint": "BYTEA almacena bytes, no texto codificado por conveniencia.",
        "textOutput": "`b'ABC'`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/listas-y-array",
    "remember": "Usa un cast cuando el tipo de los elementos no sea deducible.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/listas-y-array/1",
        "title": "Enviar un arreglo de enteros",
        "language": "python",
        "code": "cur.execute(\"SELECT %s::integer[]\", ([1,2,3],))\nprint(cur.fetchone())",
        "hint": "Usa un cast cuando el tipo de los elementos no sea deducible.",
        "textOutput": "`([1, 2, 3],)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-de-tipos-basicos/uuid",
    "remember": "No hace falta convertirlo en texto para transmitirlo.",
    "examples": [
      {
        "id": "psycopg/adaptacion-de-tipos-basicos/uuid/1",
        "title": "Recuperar un UUID",
        "language": "python",
        "code": "from uuid import UUID\nu = UUID(\"00000000-0000-0000-0000-000000000001\")\ncur.execute(\"SELECT %s::uuid\", (u,))\nprint(cur.fetchone()[0] == u)",
        "hint": "No hace falta convertirlo en texto para transmitirlo.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
