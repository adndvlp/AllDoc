// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/definicion",
    "remember": "Elige el tipo por significado, no solo por cómo se muestra.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/definicion/1",
        "title": "Consultar los tipos de las columnas",
        "language": "python",
        "code": "print([(c.name, str(c.type)) for c in pedidos.c])",
        "hint": "Elige el tipo por significado, no solo por cómo se muestra.",
        "textOutput": "[('id', 'INTEGER'), ('cliente_id', 'INTEGER'), ('monto', 'INTEGER'), ('fecha', 'DATE'), ('estado', 'VARCHAR(20)'), ('cupon', 'VARCHAR(20)')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/integer-biginteger-float-y-numeric",
    "remember": "Para dinero evita Float cuando necesitas exactitud decimal.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/integer-biginteger-float-y-numeric/1",
        "title": "Declarar precisión y escala",
        "language": "python",
        "code": "t = Numeric(12,2)\nprint(t.precision,t.scale,t.asdecimal)",
        "hint": "Para dinero evita Float cuando necesitas exactitud decimal.",
        "textOutput": "12 2 True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/string-text-char-y-unicode",
    "remember": "Las restricciones de longitud dependen del motor.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/string-text-char-y-unicode/1",
        "title": "Ver tipos declarados",
        "language": "python",
        "code": "print([str(t) for t in [String(30),sa.Text(),sa.CHAR(2),sa.Unicode(50),sa.UnicodeText()]])",
        "hint": "Las restricciones de longitud dependen del motor.",
        "textOutput": "['VARCHAR(30)', 'TEXT', 'CHAR(2)', 'VARCHAR(50)', 'TEXT']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/date-datetime-time-y-interval",
    "remember": "El soporte de zonas y duraciones depende del dialecto.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/date-datetime-time-y-interval/1",
        "title": "Leer una fecha como objeto Python",
        "language": "python",
        "code": "with engine.connect() as conn:\n    v=conn.execute(select(pedidos.c.fecha).where(pedidos.c.id==101)).scalar_one()\n    print(v.isoformat(), type(v).__name__)",
        "hint": "El soporte de zonas y duraciones depende del dialecto.",
        "textOutput": "2026-02-01 date",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/boolean-enum-largebinary-y-uuid",
    "remember": "El tipo UUID de SQLAlchemy requiere considerar el soporte nativo del motor.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/boolean-enum-largebinary-y-uuid/1",
        "title": "Crear tipos de una tabla auxiliar",
        "language": "python",
        "code": "print([str(t) for t in [sa.Boolean(),sa.Enum(\"nuevo\",\"activo\"),sa.LargeBinary(),sa.Uuid()]])",
        "hint": "El tipo UUID de SQLAlchemy requiere considerar el soporte nativo del motor.",
        "textOutput": "['BOOLEAN', 'VARCHAR(6)', 'BLOB', 'CHAR(32)']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/json-y-array",
    "remember": "No asumas que SQLite o MySQL soportan ARRAY de Core.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/json-y-array/1",
        "title": "Guardar y leer JSON",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"eventos\",m,Column(\"id\",Integer,primary_key=True),Column(\"datos\",sa.JSON))\nm.create_all(engine)\nwith engine.begin() as conn:\n    conn.execute(insert(t).values(id=1,datos={\"canal\":\"web\"}))\nvalor(select(t.c.datos[\"canal\"].as_string()))",
        "hint": "No asumas que SQLite o MySQL soportan ARRAY de Core.",
        "textOutput": "web",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/cast-y-type-coerce",
    "remember": "type_coerce() no convierte por sí mismo el dato en la base.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/cast-y-type-coerce/1",
        "title": "Convertir un monto a texto",
        "language": "python",
        "code": "ver(select(cast(pedidos.c.monto,String).label(\"texto\")).where(pedidos.c.id==101))\nprint(select(sa.type_coerce(pedidos.c.monto,Integer)))",
        "hint": "type_coerce() no convierte por sí mismo el dato en la base.",
        "textOutput": "('texto',)\n[('100',)]\nSELECT pedidos.monto AS monto \nFROM pedidos",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/tipos/with-variant-y-tipos-por-dialecto",
    "remember": "Úsalo cuando una definición portable necesita una excepción.",
    "examples": [
      {
        "id": "sqlalchemy/tipos/with-variant-y-tipos-por-dialecto/1",
        "title": "Compilar un tipo distinto en PostgreSQL",
        "language": "python",
        "code": "from sqlalchemy.dialects import postgresql\nt = String(40).with_variant(sa.Text(),\"postgresql\")\nprint(t.compile(dialect=engine.dialect),t.compile(dialect=postgresql.dialect()))",
        "hint": "Úsalo cuando una definición portable necesita una excepción.",
        "textOutput": "VARCHAR(40) TEXT",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
