// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/definicion",
    "remember": "Usa reflection cuando la base ya existe.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/definicion/1",
        "title": "Descubrir tablas",
        "language": "python",
        "code": "print(sorted(inspect(engine).get_table_names()))",
        "hint": "Usa reflection cuando la base ya existe.",
        "textOutput": "['clientes', 'detalles', 'pedidos', 'productos']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/autoload-with",
    "remember": "No es necesario declarar las columnas manualmente.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/autoload-with/1",
        "title": "Reflejar pedidos y consultar sus columnas",
        "language": "python",
        "code": "t=Table(\"pedidos\",MetaData(),autoload_with=engine)\nprint(list(t.c.keys()))",
        "hint": "No es necesario declarar las columnas manualmente.",
        "textOutput": "['id', 'cliente_id', 'monto', 'fecha', 'estado', 'cupon']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/metadata-reflect",
    "remember": "Usa only para limitar las tablas si la base es grande.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/metadata-reflect/1",
        "title": "Reflejar clientes y pedidos",
        "language": "python",
        "code": "m=MetaData()\nm.reflect(engine,only=[\"clientes\",\"pedidos\"])\nprint(sorted(m.tables))",
        "hint": "Usa only para limitar las tablas si la base es grande.",
        "textOutput": "['clientes', 'pedidos']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/get-columns-y-get-foreign-keys",
    "remember": "No confundas el nombre de la clave con las columnas que la forman.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/get-columns-y-get-foreign-keys/1",
        "title": "Consultar columnas y destino de FK",
        "language": "python",
        "code": "i=inspect(engine)\nprint([c[\"name\"] for c in i.get_columns(\"pedidos\")])\nprint(i.get_foreign_keys(\"pedidos\")[0][\"constrained_columns\"])",
        "hint": "No confundas el nombre de la clave con las columnas que la forman.",
        "textOutput": "['id', 'cliente_id', 'monto', 'fecha', 'estado', 'cupon']\n['cliente_id']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/vistas-e-indices",
    "remember": "Una vista reflejada no implica que tenga una clave primaria declarada.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/vistas-e-indices/1",
        "title": "Crear y descubrir una vista",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(text(\"CREATE VIEW ventas AS SELECT id,monto FROM pedidos\"))\ni=inspect(engine)\nprint(i.get_view_names())\nprint(i.get_view_definition(\"ventas\"))",
        "hint": "Una vista reflejada no implica que tenga una clave primaria declarada.",
        "textOutput": "['ventas']\nCREATE VIEW ventas AS SELECT id,monto FROM pedidos",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/reflection/reflection-parcial-y-extend-existing",
    "remember": "No sobrescribas metadatos existentes sin intención.",
    "examples": [
      {
        "id": "sqlalchemy/reflection/reflection-parcial-y-extend-existing/1",
        "title": "Reflejar únicamente id y monto",
        "language": "python",
        "code": "t=Table(\"pedidos\",MetaData(),autoload_with=engine,include_columns=[\"id\",\"monto\"])\nprint(list(t.c.keys()))",
        "hint": "No sobrescribas metadatos existentes sin intención.",
        "textOutput": "['id', 'monto']",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
