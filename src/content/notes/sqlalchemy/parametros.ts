// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/definicion",
    "remember": "No concatenes entradas del usuario dentro de SQL.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/definicion/1",
        "title": "Filtrar con parámetro nombrado",
        "language": "python",
        "code": "ver(text(\"SELECT nombre FROM clientes WHERE pais = :pais ORDER BY id\"), {\"pais\":\"MX\"})",
        "hint": "No concatenes entradas del usuario dentro de SQL.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/bindparam",
    "remember": "El nombre de bindparam coincide con la clave del diccionario.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/bindparam/1",
        "title": "Consultar un umbral variable",
        "language": "python",
        "code": "stmt = select(pedidos.c.id).where(pedidos.c.monto >= bindparam(\"minimo\")).order_by(pedidos.c.id)\nver(stmt, {\"minimo\":200})",
        "hint": "El nombre de bindparam coincide con la clave del diccionario.",
        "textOutput": "('id',)\n[(102,), (103,), (105,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/bindparams-y-columns",
    "remember": "Usa tipos explícitos cuando necesites procesamiento de resultados.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/bindparams-y-columns/1",
        "title": "Declarar una columna textual",
        "language": "python",
        "code": "stmt = text(\"SELECT monto FROM pedidos WHERE id=:id\").bindparams(id=101).columns(monto=Integer)\nvalor(stmt)",
        "hint": "Usa tipos explícitos cuando necesites procesamiento de resultados.",
        "textOutput": "100",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/expanding-true",
    "remember": "No concatena los elementos manualmente; no sirve para executemany.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/expanding-true/1",
        "title": "Filtrar varios clientes dinámicamente",
        "language": "python",
        "code": "stmt = select(clientes.c.nombre).where(clientes.c.id.in_(bindparam(\"ids\", expanding=True))).order_by(clientes.c.id)\nver(stmt, {\"ids\":[1,3]})",
        "hint": "No concatena los elementos manualmente; no sirve para executemany.",
        "textOutput": "('nombre',)\n[('Ana',), ('Marta',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/sql-injection-e-identificadores",
    "remember": "No interpoles identificadores externos sin validarlos.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/sql-injection-e-identificadores/1",
        "title": "Tratar una entrada maliciosa como valor literal",
        "language": "python",
        "code": "entrada = \"MX' OR 1=1 --\"\nver(text(\"SELECT nombre FROM clientes WHERE pais = :p\"), {\"p\":entrada})",
        "hint": "No interpoles identificadores externos sin validarlos.",
        "textOutput": "('nombre',)\n[]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/parametros/identificadores-dinamicos-permitidos",
    "remember": "Rechaza cualquier nombre que no esté permitido.",
    "examples": [
      {
        "id": "sqlalchemy/parametros/identificadores-dinamicos-permitidos/1",
        "title": "Ordenar por una columna permitida",
        "language": "python",
        "code": "permitidas = {\"nombre\":clientes.c.nombre, \"id\":clientes.c.id}\ncampo = \"nombre\"\nver(select(clientes.c.nombre).order_by(permitidas[campo]))",
        "hint": "Rechaza cualquier nombre que no esté permitido.",
        "textOutput": "('nombre',)\n[('Ana',), ('Eva',), ('Luis',), ('Marta',), ('Noa',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
