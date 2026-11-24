// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/definicion",
    "remember": "Registrar en el contexto más pequeño que necesites.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/definicion/1",
        "title": "Consultar el registro de una conexión",
        "language": "python",
        "code": "from psycopg.adapt import AdaptersMap\nprint(isinstance(conn.adapters, AdaptersMap))",
        "hint": "Registrar en el contexto más pequeño que necesites.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/adaptersmap-y-alcance",
    "remember": "Un cambio global puede afectar todas las conexiones creadas después.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/adaptersmap-y-alcance/1",
        "title": "Comparar mapas de adaptación",
        "language": "python",
        "code": "with conn.cursor() as otro:\n    print(otro.adapters is conn.adapters)",
        "hint": "Un cambio global puede afectar todas las conexiones creadas después.",
        "textOutput": "`False`; el cursor tiene su propio contexto que hereda las asociaciones de la conexión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/dumper-y-register-dumper",
    "remember": "La salida de dump son bytes o un valor admitido por la API de adaptación.",
    "note": "El ejemplo usa UTF-8 y un cast explícito; para adaptación general considerar el encoding del contexto.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/dumper-y-register-dumper/1",
        "title": "Adaptar una etiqueta propia a texto",
        "language": "python",
        "code": "from psycopg.adapt import Dumper\nclass Etiqueta:\n    def __init__(self, valor):\n        self.valor = valor\nclass EtiquetaDumper(Dumper):\n    def dump(self, obj):\n        return obj.valor.encode(\"utf-8\")\ncur.adapters.register_dumper(Etiqueta, EtiquetaDumper)\ncur.execute(\"SELECT %s::text\", (Etiqueta(\"VIP\"),))\nprint(cur.fetchone())",
        "hint": "La salida de dump son bytes o un valor admitido por la API de adaptación.",
        "textOutput": "`('VIP',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/loader-y-register-loader",
    "remember": "El tipo de la columna decide qué loader se utiliza.",
    "note": "El ejemplo presupone UTF-8 y modifica únicamente este cursor.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/loader-y-register-loader/1",
        "title": "Convertir textos a mayúsculas solo en un cursor",
        "language": "python",
        "code": "from psycopg.adapt import Loader\nclass Mayusculas(Loader):\n    def load(self, data):\n        return bytes(data).decode(\"utf-8\").upper()\ncur.adapters.register_loader(\"text\", Mayusculas)\nprint(cur.execute(\"SELECT 'ana'::text\").fetchone())",
        "hint": "El tipo de la columna decide qué loader se utiliza.",
        "textOutput": "`('ANA',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/typeinfo-y-oid",
    "remember": "No fijar OID de tipos personalizados entre servidores.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/typeinfo-y-oid/1",
        "title": "Consultar un tipo del servidor",
        "language": "python",
        "code": "from psycopg.types import TypeInfo\ninfo = TypeInfo.fetch(conn, \"int4\")\nprint(info.name, info.oid)",
        "hint": "No fijar OID de tipos personalizados entre servidores.",
        "textOutput": "`int4 23`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/typesregistry",
    "remember": "Los metadatos del tipo no son lo mismo que su loader.",
    "note": "`TypeInfo.register(conn)` añade metadatos; los registradores específicos pueden instalar adaptadores también.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/typesregistry/1",
        "title": "Buscar el tipo entero en el registro",
        "language": "python",
        "code": "from psycopg.types import TypesRegistry\nprint(isinstance(conn.adapters.types, TypesRegistry))\nprint(conn.adapters.types[\"int4\"].oid)",
        "hint": "Los metadatos del tipo no son lo mismo que su loader.",
        "textOutput": "`True`, luego `23`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/transformer-y-pyformat",
    "remember": "Es una API de extensión; la mayoría de consultas no necesita usarla directamente.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/transformer-y-pyformat/1",
        "title": "Obtener un dumper para texto",
        "language": "python",
        "code": "from psycopg.adapt import Transformer, PyFormat\ntx = Transformer(conn)\ndumper = tx.get_dumper(42, PyFormat.TEXT)\nprint(bytes(dumper.dump(42)))",
        "hint": "Es una API de extensión; la mayoría de consultas no necesita usarla directamente.",
        "textOutput": "`b'42'`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/adaptacion-personalizada/registro-de-tipos-personalizados",
    "remember": "Registrar antes de crear cursores que deban heredar esa configuración.",
    "note": "Para enums, compuestos, rangos, multirangos y HSTORE usar sus registradores especializados, mostrados en el grupo correspondiente.",
    "examples": [
      {
        "id": "psycopg/adaptacion-personalizada/registro-de-tipos-personalizados/1",
        "title": "Consultar metadatos y registrarlos",
        "language": "python",
        "code": "from psycopg.types import TypeInfo\ninfo = TypeInfo.fetch(conn, \"text\")\ninfo.register(conn)\nprint(conn.adapters.types[\"text\"].name)",
        "hint": "Registrar antes de crear cursores que deban heredar esa configuración.",
        "textOutput": "`text`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
