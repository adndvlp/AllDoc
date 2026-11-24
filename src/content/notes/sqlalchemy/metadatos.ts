// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/metadatos/definicion",
    "remember": "El esquema Python describe; create_all() crea.",
    "examples": [
      {
        "id": "sqlalchemy/metadatos/definicion/1",
        "title": "Inspeccionar las columnas compartidas",
        "language": "python",
        "code": "print(list(clientes.c.keys()))\nprint(list(metadata.tables))",
        "hint": "El esquema Python describe; create_all() crea.",
        "textOutput": "['id', 'nombre', 'pais', 'alta']\n['clientes', 'pedidos', 'productos', 'detalles']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/metadatos/table-y-column",
    "remember": "Accede a columnas mediante tabla.c.nombre.",
    "examples": [
      {
        "id": "sqlalchemy/metadatos/table-y-column/1",
        "title": "Definir una tabla de referencia",
        "language": "python",
        "code": "m = MetaData()\nt = Table(\"regiones\", m, Column(\"id\", Integer, primary_key=True), Column(\"nombre\", String(50)))\nprint(t.name, list(t.c.keys()))",
        "hint": "Accede a columnas mediante tabla.c.nombre.",
        "textOutput": "regiones ['id', 'nombre']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/metadatos/create-all-y-drop-all",
    "remember": "create_all() no migra estructuras existentes. No elimines tablas de producción.",
    "examples": [
      {
        "id": "sqlalchemy/metadatos/create-all-y-drop-all/1",
        "title": "Crear y eliminar una tabla aislada",
        "language": "python",
        "code": "m = MetaData()\nTable(\"temporal_demo\", m, Column(\"id\", Integer, primary_key=True))\nm.create_all(engine)\nprint(inspect(engine).has_table(\"temporal_demo\"))\nm.drop_all(engine)\nprint(inspect(engine).has_table(\"temporal_demo\"))",
        "hint": "create_all() no migra estructuras existentes. No elimines tablas de producción.",
        "textOutput": "True\nFalse",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/metadatos/schema-y-naming-convention",
    "remember": "La disponibilidad de schemas depende del motor.",
    "examples": [
      {
        "id": "sqlalchemy/metadatos/schema-y-naming-convention/1",
        "title": "Nombrar una restricción automáticamente",
        "language": "python",
        "code": "m = MetaData(naming_convention={\"pk\":\"pk_%(table_name)s\"})\nt = Table(\"regiones\", m, Column(\"id\", Integer, primary_key=True))\nprint(t.primary_key.name)",
        "hint": "La disponibilidad de schemas depende del motor.",
        "textOutput": "pk_regiones",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/metadatos/ddl-explicito-y-alter-table",
    "remember": "No existe una operación Core universal de ALTER TABLE para todas las modificaciones.",
    "examples": [
      {
        "id": "sqlalchemy/metadatos/ddl-explicito-y-alter-table/1",
        "title": "Generar el DDL sin ejecutarlo",
        "language": "python",
        "code": "from sqlalchemy.schema import CreateTable\nprint(str(CreateTable(clientes).compile(dialect=engine.dialect)).strip())",
        "hint": "No existe una operación Core universal de ALTER TABLE para todas las modificaciones.",
        "textOutput": "CREATE TABLE clientes (\n\tid INTEGER NOT NULL, \n\tnombre VARCHAR(60) NOT NULL, \n\tpais VARCHAR(30), \n\talta DATE NOT NULL, \n\tPRIMARY KEY (id)\n)",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
