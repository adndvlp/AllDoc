// Generado desde specs/sqlite3.md por scripts/prepare-sqlite3-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/definicion",
    "remember": "Adaptar al escribir; convertir al leer.",
    "note": "Los adaptadores y convertidores predeterminados de date y datetime están obsoletos desde Python 3.12.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/definicion/1",
        "title": "Guardar una fecha explícitamente",
        "language": "python",
        "code": "from datetime import date\nfecha = date(2026, 8, 1)\nprint(con.execute(\"SELECT ?\", (fecha.isoformat(),)).fetchone())",
        "hint": "La conversión explícita no requiere registros globales.",
        "textOutput": "`('2026-08-01',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-adapter",
    "remember": "Devuelve un tipo SQLite admitido.",
    "note": "El registro es global en el proceso; usa una sesión aislada para estas pruebas.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/register-adapter/1",
        "title": "Adaptar Decimal a texto",
        "language": "python",
        "code": "from decimal import Decimal\nsqlite3.register_adapter(Decimal, str)\nprint(con.execute(\"SELECT ?\", (Decimal(\"12.30\"),)).fetchone())",
        "hint": "Usa una columna TEXT si necesitas conservar esa representación.",
        "textOutput": "`('12.30',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/conform-y-prepareprotocol",
    "remember": "Un adaptador registrado tiene prioridad.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/conform-y-prepareprotocol/1",
        "title": "Adaptar un código personalizado",
        "language": "python",
        "code": "class Codigo:\n    def __init__(self, valor):\n        self.valor = valor\n    def __conform__(self, protocolo):\n        if protocolo is sqlite3.PrepareProtocol:\n            return self.valor\nprint(con.execute(\"SELECT ?\", (Codigo(\"MX-01\"),)).fetchone())",
        "hint": "El objeto devuelve su representación de almacenamiento.",
        "textOutput": "`('MX-01',)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/register-converter",
    "remember": "Activa detect_types para usar convertidores.",
    "note": "El registro es global; el flag detect_types se establece al conectar.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/register-converter/1",
        "title": "Reconstruir una fecha",
        "language": "python",
        "code": "from datetime import date\nsqlite3.register_converter(\"FECHA_ISO\", lambda b: date.fromisoformat(b.decode()))\nwith closing(sqlite3.connect(\":memory:\", detect_types=sqlite3.PARSE_DECLTYPES)) as db:\n    db.execute(\"CREATE TABLE fechas(valor FECHA_ISO)\")\n    db.execute(\"INSERT INTO fechas VALUES ('2026-08-01')\")\n    print(db.execute(\"SELECT valor FROM fechas\").fetchone())",
        "hint": "El tipo declarado activa el convertidor.",
        "textOutput": "`(datetime.date(2026, 8, 1),)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-decltypes",
    "remember": "El nombre del tipo debe coincidir con el registro.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/parse-decltypes/1",
        "title": "Recuperar un importe Decimal",
        "language": "python",
        "code": "from decimal import Decimal\nsqlite3.register_converter(\"DECIMAL_TEXT\", lambda b: Decimal(b.decode()))\nwith closing(sqlite3.connect(\":memory:\", detect_types=sqlite3.PARSE_DECLTYPES)) as db:\n    db.execute(\"CREATE TABLE importes(valor DECIMAL_TEXT)\")\n    db.execute(\"INSERT INTO importes VALUES (?)\", (\"12.30\",))\n    print(db.execute(\"SELECT valor FROM importes\").fetchone())",
        "hint": "DECIMAL_TEXT tiene afinidad TEXT y conserva el texto decimal.",
        "textOutput": "`(Decimal('12.30'),)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlite3/adaptadores-y-convertidores/parse-colnames",
    "remember": "Útil para expresiones calculadas.",
    "examples": [
      {
        "id": "sqlite3/adaptadores-y-convertidores/parse-colnames/1",
        "title": "Convertir un resultado calculado",
        "language": "python",
        "code": "from datetime import date\nsqlite3.register_converter(\"FECHA_ISO\", lambda b: date.fromisoformat(b.decode()))\nwith closing(sqlite3.connect(\":memory:\", detect_types=sqlite3.PARSE_COLNAMES | sqlite3.PARSE_DECLTYPES)) as db:\n    print(db.execute('SELECT date(\\'2026-08-01\\') AS \"dia [FECHA_ISO]\"').fetchone())",
        "hint": "Si se combinan los flags, el tipo indicado en el alias tiene prioridad.",
        "textOutput": "`(datetime.date(2026, 8, 1),)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
