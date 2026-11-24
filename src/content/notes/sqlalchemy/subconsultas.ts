// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/definicion",
    "remember": "Usa la variante que corresponde al lugar de la consulta.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/definicion/1",
        "title": "Filtrar montos superiores al promedio",
        "language": "python",
        "code": "prom=select(func.avg(pedidos.c.monto)).scalar_subquery()\nver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto>prom).order_by(pedidos.c.id))",
        "hint": "Usa la variante que corresponde al lugar de la consulta.",
        "textOutput": "('id', 'monto')\n[(102, 200), (103, 200), (105, 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/subquery-y-c",
    "remember": "Usa label() para nombrar cálculos de la subconsulta.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/subquery-y-c/1",
        "title": "Filtrar totales calculados",
        "language": "python",
        "code": "tot=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label(\"total\")).group_by(pedidos.c.cliente_id).subquery(\"totales\")\nver(select(tot.c.cliente_id,tot.c.total).where(tot.c.total>250).order_by(tot.c.cliente_id))",
        "hint": "Usa label() para nombrar cálculos de la subconsulta.",
        "textOutput": "('cliente_id', 'total')\n[(1, 300), (3, 400)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/scalar-subquery-y-correlacion",
    "remember": "Correlacionar permite calcular un dato por fila exterior.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/scalar-subquery-y-correlacion/1",
        "title": "Contar pedidos por cliente sin agrupar la consulta exterior",
        "language": "python",
        "code": "n=select(func.count()).select_from(pedidos).where(pedidos.c.cliente_id==clientes.c.id).correlate(clientes).scalar_subquery()\nver(select(clientes.c.nombre,n.label(\"n\")).order_by(clientes.c.id))",
        "hint": "Correlacionar permite calcular un dato por fila exterior.",
        "textOutput": "('nombre', 'n')\n[('Ana', 2), ('Luis', 2), ('Marta', 2), ('Noa', 1), ('Eva', 0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/in-con-subconsultas",
    "remember": "No conviertas a lista Python si la base puede resolverlo.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/in-con-subconsultas/1",
        "title": "Clientes con compras completadas",
        "language": "python",
        "code": "s=select(pedidos.c.cliente_id).where(pedidos.c.estado==\"completed\")\nver(select(clientes.c.nombre).where(clientes.c.id.in_(s)).order_by(clientes.c.id))",
        "hint": "No conviertas a lista Python si la base puede resolverlo.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',), ('Marta',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/exists-y-not-exists",
    "remember": "No necesita recuperar ni contar todas las coincidencias.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/exists-y-not-exists/1",
        "title": "Clientes sin pedidos completados",
        "language": "python",
        "code": "e=select(pedidos.c.id).where(pedidos.c.cliente_id==clientes.c.id,pedidos.c.estado==\"completed\").exists()\nver(select(clientes.c.nombre).where(~e).order_by(clientes.c.id))",
        "hint": "No necesita recuperar ni contar todas las coincidencias.",
        "textOutput": "('nombre',)\n[('Noa',), ('Eva',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/subconsultas/lateral",
    "remember": "El soporte depende del motor; no se ejecuta en SQLite.",
    "examples": [
      {
        "id": "sqlalchemy/subconsultas/lateral/1",
        "title": "Compilar el último pedido de cada cliente",
        "language": "python",
        "code": "from sqlalchemy.dialects import postgresql\np=select(pedidos.c.id).where(pedidos.c.cliente_id==clientes.c.id).order_by(pedidos.c.fecha.desc(),pedidos.c.id.desc()).limit(1).lateral(\"ultimo\")\ns=select(clientes.c.nombre,p.c.id).select_from(clientes.join(p,sa.true()))\nprint(s.compile(dialect=postgresql.dialect()))",
        "hint": "El soporte depende del motor; no se ejecuta en SQLite.",
        "textOutput": "SELECT clientes.nombre, ultimo.id \nFROM clientes JOIN LATERAL (SELECT pedidos.id AS id \nFROM pedidos \nWHERE pedidos.cliente_id = clientes.id ORDER BY pedidos.fecha DESC, pedidos.id DESC \n LIMIT %(param_1)s) AS ultimo ON true",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
