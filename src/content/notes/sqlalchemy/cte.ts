// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/cte/definicion",
    "remember": "Un CTE no es una tabla persistente ni garantiza materialización.",
    "examples": [
      {
        "id": "sqlalchemy/cte/definicion/1",
        "title": "Filtrar gasto por cliente",
        "language": "python",
        "code": "t=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label(\"total\")).group_by(pedidos.c.cliente_id).cte(\"gasto\")\nver(select(t).where(t.c.total>250).order_by(t.c.cliente_id))",
        "hint": "Un CTE no es una tabla persistente ni garantiza materialización.",
        "textOutput": "('cliente_id', 'total')\n[(1, 300), (3, 400)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/cte/ctes-multiples",
    "remember": "Separa los pasos que tienen granularidades diferentes.",
    "examples": [
      {
        "id": "sqlalchemy/cte/ctes-multiples/1",
        "title": "Obtener clientes por encima del promedio",
        "language": "python",
        "code": "t=select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label(\"total\")).group_by(pedidos.c.cliente_id).cte(\"gasto\")\na=select(func.avg(t.c.total).label(\"promedio\")).cte(\"media\")\nver(select(t.c.cliente_id,t.c.total).where(t.c.total>select(a.c.promedio).scalar_subquery()).order_by(t.c.cliente_id))",
        "hint": "Separa los pasos que tienen granularidades diferentes.",
        "textOutput": "('cliente_id', 'total')\n[(1, 300), (3, 400)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/cte/cte-recursivo",
    "remember": "Incluye una condición de terminación.",
    "examples": [
      {
        "id": "sqlalchemy/cte/cte-recursivo/1",
        "title": "Generar los números 1 a 4",
        "language": "python",
        "code": "n=select(literal(1).label(\"n\")).cte(\"numeros\",recursive=True)\nn=n.union_all(select(n.c.n+1).where(n.c.n<4))\nver(select(n.c.n).order_by(n.c.n))",
        "hint": "Incluye una condición de terminación.",
        "textOutput": "('n',)\n[(1,), (2,), (3,), (4,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
