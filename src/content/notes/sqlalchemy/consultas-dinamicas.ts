// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/definicion",
    "remember": "Reasigna la sentencia cuando añadas condiciones.",
    "examples": [
      {
        "id": "sqlalchemy/consultas-dinamicas/definicion/1",
        "title": "Aplicar un filtro opcional",
        "language": "python",
        "code": "minimo=200\ns=select(pedidos.c.id,pedidos.c.monto)\nif minimo is not None:\n    s=s.where(pedidos.c.monto>=minimo)\nver(s.order_by(pedidos.c.id))",
        "hint": "Reasigna la sentencia cuando añadas condiciones.",
        "textOutput": "('id', 'monto')\n[(102, 200), (103, 200), (105, 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/compile-y-parametros",
    "remember": "El SQL mostrado no es una consulta ejecutada.",
    "examples": [
      {
        "id": "sqlalchemy/consultas-dinamicas/compile-y-parametros/1",
        "title": "Ver SQL y valores separados",
        "language": "python",
        "code": "s=select(pedidos.c.id).where(pedidos.c.monto>=200)\nc=s.compile(dialect=engine.dialect)\nprint(str(c),c.params)",
        "hint": "El SQL mostrado no es una consulta ejecutada.",
        "textOutput": "SELECT pedidos.id \nFROM pedidos \nWHERE pedidos.monto >= ? {'monto_1': 200}",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/literal-binds-y-depuracion",
    "remember": "No lo uses como mecanismo de ejecución ni con datos no confiables.",
    "examples": [
      {
        "id": "sqlalchemy/consultas-dinamicas/literal-binds-y-depuracion/1",
        "title": "Inspeccionar una consulta con constante",
        "language": "python",
        "code": "s=select(pedidos.c.id).where(pedidos.c.id==101)\nprint(s.compile(dialect=engine.dialect,compile_kwargs={\"literal_binds\":True}))",
        "hint": "No lo uses como mecanismo de ejecución ni con datos no confiables.",
        "textOutput": "SELECT pedidos.id \nFROM pedidos \nWHERE pedidos.id = 101",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/consultas-dinamicas/lambda-stmt-y-cache-de-compilacion",
    "remember": "SQL cacheado no equivale a datos cacheados.",
    "examples": [
      {
        "id": "sqlalchemy/consultas-dinamicas/lambda-stmt-y-cache-de-compilacion/1",
        "title": "Ejecutar una sentencia reutilizable",
        "language": "python",
        "code": "s=sa.lambda_stmt(lambda:select(clientes.c.nombre).where(clientes.c.id==bindparam(\"id\")))\nvalor(s,{\"id\":2})",
        "hint": "SQL cacheado no equivale a datos cacheados.",
        "textOutput": "Luis",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
