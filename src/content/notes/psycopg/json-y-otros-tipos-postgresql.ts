// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/definicion",
    "remember": "No todos los objetos Python se adaptan de forma automática.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/definicion/1",
        "title": "Enviar un documento JSONB",
        "language": "python",
        "code": "from psycopg.types.json import Jsonb\ncur.execute(\"SELECT %s::jsonb\", (Jsonb({\"canal\":\"web\"}),))\nprint(cur.fetchone()[0])",
        "hint": "No todos los objetos Python se adaptan de forma automática.",
        "textOutput": "`{'canal': 'web'}`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/json-y-jsonb",
    "remember": "Un dict no se interpreta automáticamente como JSON.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/json-y-jsonb/1",
        "title": "Extraer una clave del documento",
        "language": "python",
        "code": "from psycopg.types.json import Json\ncur.execute(\"SELECT %s::json ->> 'canal'\", (Json({\"canal\":\"web\"}),))\nprint(cur.fetchone())",
        "hint": "Un dict no se interpreta automáticamente como JSON.",
        "textOutput": "`('web',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/set-json-dumps-y-set-json-loads",
    "remember": "Limitar los cambios al cursor o conexión si solo los necesita un proceso.",
    "note": "`set_json_dumps(función, cur)` cambia el serializador; la función debe devolver JSON válido.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/set-json-dumps-y-set-json-loads/1",
        "title": "Leer decimales JSON sin float",
        "language": "python",
        "code": "import json\nfrom decimal import Decimal\nfrom functools import partial\nfrom psycopg.types.json import set_json_loads\nset_json_loads(partial(json.loads, parse_float=Decimal), cur)\ncur.execute(\"SELECT '{\\\"importe\\\":1.25}'::jsonb\")\nprint(cur.fetchone()[0])",
        "hint": "Limitar los cambios al cursor o conexión si solo los necesita un proceso.",
        "textOutput": "`{'importe': Decimal('1.25')}`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/enums-y-register-enum",
    "remember": "Registrar el tipo en la conexión donde se utilizará.",
    "note": "Requiere permiso CREATE en el esquema; rollback elimina el tipo. Puede pasarse una clase Enum propia y un mapping.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/enums-y-register-enum/1",
        "title": "Recuperar un estado como Enum",
        "language": "python",
        "code": "from psycopg.types.enum import EnumInfo, register_enum\ncur.execute(\"CREATE TYPE estado_demo AS ENUM ('nuevo','cerrado')\")\ninfo = EnumInfo.fetch(conn, \"estado_demo\")\nregister_enum(info, conn)\nwith conn.cursor() as c:\n    c.execute(\"SELECT 'cerrado'::estado_demo\")\n    print(c.fetchone()[0].name)",
        "hint": "Registrar el tipo en la conexión donde se utilizará.",
        "textOutput": "`cerrado`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/rangos-y-register-range",
    "remember": "`[)` incluye el extremo inferior y excluye el superior.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/rangos-y-register-range/1",
        "title": "Enviar un rango entero",
        "language": "python",
        "code": "from psycopg.types.range import Range\ncur.execute(\"SELECT %s::int4range @> 3\", (Range(1,5,\"[)\"),))\nprint(cur.fetchone())",
        "hint": "`[)` incluye el extremo inferior y excluye el superior.",
        "textOutput": "`(True,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/multirangos-y-register-multirange",
    "remember": "PostgreSQL 14+ admite multirangos.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/multirangos-y-register-multirange/1",
        "title": "Consultar dos intervalos separados",
        "language": "python",
        "code": "from psycopg.types.multirange import Multirange\nfrom psycopg.types.range import Range\nr = Multirange([Range(1,3), Range(5,7)])\ncur.execute(\"SELECT %s::int4multirange @> 4\", (r,))\nprint(cur.fetchone())",
        "hint": "PostgreSQL 14+ admite multirangos.",
        "textOutput": "`(False,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/tipos-compuestos-y-register-composite",
    "remember": "Obtener el CompositeInfo y registrarlo antes de crear el cursor que lo usa.",
    "note": "Requiere permiso CREATE en el esquema; rollback elimina el tipo.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/tipos-compuestos-y-register-composite/1",
        "title": "Recuperar un par nombre-cantidad",
        "language": "python",
        "code": "from psycopg.types.composite import CompositeInfo, register_composite\ncur.execute(\"CREATE TYPE par_demo AS (nombre text, cantidad int)\")\ninfo = CompositeInfo.fetch(conn, \"par_demo\")\nregister_composite(info, conn)\nwith conn.cursor() as c:\n    c.execute(\"SELECT ROW('Ana',2)::par_demo\")\n    fila = c.fetchone()[0]\n    print(fila.nombre, fila.cantidad)",
        "hint": "Obtener el CompositeInfo y registrarlo antes de crear el cursor que lo usa.",
        "textOutput": "`Ana 2`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/hstore-y-register-hstore",
    "remember": "No es JSON; necesita la extensión instalada y registrada.",
    "note": "Un administrador debe habilitar la extensión si se requiere.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/hstore-y-register-hstore/1",
        "title": "Consultar un mapa de atributos",
        "language": "python",
        "code": "from psycopg.types import TypeInfo\nfrom psycopg.types.hstore import register_hstore\ninfo = TypeInfo.fetch(conn, \"hstore\")\nif info is not None:\n    register_hstore(info, conn)\n    with conn.cursor() as c:\n        print(c.execute(\"SELECT 'canal=>web'::hstore\").fetchone()[0])\nelse:\n    print(\"HSTORE no instalado\")",
        "hint": "No es JSON; necesita la extensión instalada y registrada.",
        "textOutput": "`{'canal': 'web'}` si HSTORE está accesible en search_path; de otro modo, el mensaje indicado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/serializador-json-personalizado",
    "remember": "Elegir una representación explícita para tipos que JSON no admite directamente.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/serializador-json-personalizado/1",
        "title": "Guardar un Decimal como texto en JSONB",
        "language": "python",
        "code": "import json\nfrom decimal import Decimal\nfrom functools import partial\nfrom psycopg.types.json import Jsonb, set_json_dumps\n\nset_json_dumps(partial(json.dumps, default=str), cur)\ncur.execute(\"SELECT %s::jsonb\", (Jsonb({\"importe\": Decimal(\"1.25\")}),))\nprint(cur.fetchone()[0])",
        "hint": "El serializador convierte el Decimal en una cadena; no lo redondea a float.",
        "textOutput": "`{'importe': '1.25'}`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/json-y-otros-tipos-postgresql/registrar-rango-personalizado",
    "remember": "Registrar el tipo en la conexión antes de crear el cursor consumidor.",
    "note": "Requiere permiso CREATE en el esquema de práctica. El rollback del envoltorio elimina los tipos creados.",
    "examples": [
      {
        "id": "psycopg/json-y-otros-tipos-postgresql/registrar-rango-personalizado/1",
        "title": "Recuperar un rango de importes",
        "language": "python",
        "code": "from psycopg.types.range import RangeInfo, register_range\ncur.execute(\"CREATE TYPE importe_rango_demo AS RANGE (subtype=numeric)\")\ninfo = RangeInfo.fetch(conn, \"importe_rango_demo\")\nregister_range(info, conn)\nwith conn.cursor() as c:\n    c.execute(\"SELECT '[10,20)'::importe_rango_demo\")\n    r = c.fetchone()[0]\n    print(r.lower, r.upper, r.bounds)",
        "hint": "El adaptador devuelve un objeto Range en lugar del texto de PostgreSQL.",
        "textOutput": "`10 20 [)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
