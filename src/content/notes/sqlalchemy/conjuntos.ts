// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/conjuntos/definicion",
    "remember": "Combina filas verticalmente; JOIN combina columnas relacionadas.",
    "examples": [
      {
        "id": "sqlalchemy/conjuntos/definicion/1",
        "title": "Unir IDs de dos filtros",
        "language": "python",
        "code": "a=select(pedidos.c.cliente_id).where(pedidos.c.estado==\"completed\")\nb=select(pedidos.c.cliente_id).where(pedidos.c.estado==\"cancelled\")\nver(a.union(b).order_by(\"cliente_id\"))",
        "hint": "Combina filas verticalmente; JOIN combina columnas relacionadas.",
        "textOutput": "('cliente_id',)\n[(1,), (2,), (3,), (4,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/conjuntos/union-y-union-all",
    "remember": "Usa UNION ALL si necesitas conservar ocurrencias.",
    "examples": [
      {
        "id": "sqlalchemy/conjuntos/union-y-union-all/1",
        "title": "Combinar países sin deduplicar",
        "language": "python",
        "code": "a=select(clientes.c.pais).where(clientes.c.id<=2)\nb=select(clientes.c.pais).where(clientes.c.id==3)\nver(a.union_all(b).order_by(\"pais\"))",
        "hint": "Usa UNION ALL si necesitas conservar ocurrencias.",
        "textOutput": "('pais',)\n[('ES',), ('MX',), ('MX',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/conjuntos/intersect-y-except",
    "remember": "Comprueba el soporte de cada motor y versión.",
    "examples": [
      {
        "id": "sqlalchemy/conjuntos/intersect-y-except/1",
        "title": "Clientes con completados y cancelados",
        "language": "python",
        "code": "a=select(pedidos.c.cliente_id).where(pedidos.c.estado==\"completed\")\nb=select(pedidos.c.cliente_id).where(pedidos.c.estado==\"cancelled\")\nver(a.intersect(b).order_by(\"cliente_id\"))\nver(a.except_(b).order_by(\"cliente_id\"))",
        "hint": "Comprueba el soporte de cada motor y versión.",
        "textOutput": "('cliente_id',)\n[(2,)]\n('cliente_id',)\n[(1,), (3,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/conjuntos/compoundselect-y-orden-final",
    "remember": "Para transformar el resultado combinado, usa subquery().",
    "examples": [
      {
        "id": "sqlalchemy/conjuntos/compoundselect-y-orden-final/1",
        "title": "Consultar el resultado de una unión",
        "language": "python",
        "code": "a=select(clientes.c.id).where(clientes.c.id<=2)\nb=select(clientes.c.id).where(clientes.c.id>=4)\nu=sa.union_all(a,b).subquery(\"ids\")\nver(select(u.c.id).order_by(u.c.id.desc()))",
        "hint": "Para transformar el resultado combinado, usa subquery().",
        "textOutput": "('id',)\n[(5,), (4,), (2,), (1,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
