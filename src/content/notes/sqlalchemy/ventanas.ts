// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/definicion",
    "remember": "El ORDER BY de la ventana no garantiza el orden final del resultado.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/definicion/1",
        "title": "Mostrar total general junto a cada pedido",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.monto,func.sum(pedidos.c.monto).over().label(\"total\")).order_by(pedidos.c.id))",
        "hint": "El ORDER BY de la ventana no garantiza el orden final del resultado.",
        "textOutput": "('id', 'monto', 'total')\n[(101, 100, 1030), (102, 200, 1030), (103, 200, 1030), (104, 50, 1030), (105, 300, 1030), (106, 100, 1030), (107, 80, 1030)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/partition-by",
    "remember": "A diferencia de GROUP BY, conserva las filas originales.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/partition-by/1",
        "title": "Mostrar total por cliente junto a cada pedido",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.cliente_id,func.sum(pedidos.c.monto).over(partition_by=pedidos.c.cliente_id).label(\"total_cliente\")).order_by(pedidos.c.id))",
        "hint": "A diferencia de GROUP BY, conserva las filas originales.",
        "textOutput": "('id', 'cliente_id', 'total_cliente')\n[(101, 1, 300), (102, 1, 300), (103, 2, 250), (104, 2, 250), (105, 3, 400), (106, 3, 400), (107, 4, 80)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/row-number",
    "remember": "ROW_NUMBER no asigna el mismo número a dos filas.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/row-number/1",
        "title": "Numerar pedidos por cliente",
        "language": "python",
        "code": "w=func.row_number().over(partition_by=pedidos.c.cliente_id,order_by=[pedidos.c.fecha,pedidos.c.id])\nver(select(pedidos.c.id,pedidos.c.cliente_id,w.label(\"n\")).order_by(pedidos.c.id))",
        "hint": "ROW_NUMBER no asigna el mismo número a dos filas.",
        "textOutput": "('id', 'cliente_id', 'n')\n[(101, 1, 1), (102, 1, 2), (103, 2, 1), (104, 2, 2), (105, 3, 1), (106, 3, 2), (107, 4, 1)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/rank-y-dense-rank",
    "remember": "No añadas un ID al orden interno si quieres conservar empates por monto.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/rank-y-dense-rank/1",
        "title": "Comparar dos rankings",
        "language": "python",
        "code": "r=func.rank().over(order_by=pedidos.c.monto.desc())\nd=func.dense_rank().over(order_by=pedidos.c.monto.desc())\nver(select(pedidos.c.id,pedidos.c.monto,r.label(\"rango\"),d.label(\"denso\")).order_by(pedidos.c.monto.desc(),pedidos.c.id))",
        "hint": "No añadas un ID al orden interno si quieres conservar empates por monto.",
        "textOutput": "('id', 'monto', 'rango', 'denso')\n[(105, 300, 1, 1), (102, 200, 2, 2), (103, 200, 2, 2), (101, 100, 4, 3), (106, 100, 4, 3), (107, 80, 6, 4), (104, 50, 7, 5)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/lag-y-lead",
    "remember": "El primer LAG y último LEAD normalmente devuelven NULL.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/lag-y-lead/1",
        "title": "Comparar montos consecutivos",
        "language": "python",
        "code": "w=[pedidos.c.fecha,pedidos.c.id]\nver(select(pedidos.c.id,func.lag(pedidos.c.monto).over(order_by=w).label(\"anterior\"),func.lead(pedidos.c.monto).over(order_by=w).label(\"siguiente\")).order_by(*w))",
        "hint": "El primer LAG y último LEAD normalmente devuelven NULL.",
        "textOutput": "('id', 'anterior', 'siguiente')\n[(101, None, 200), (102, 100, 200), (103, 200, 50), (104, 200, 300), (105, 50, 100), (106, 300, 80), (107, 100, None)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/rows-range-y-groups",
    "remember": "Sin marco explícito, ORDER BY suele incluir empates del valor actual por defecto.",
    "note": "groups se incorporó en SQLAlchemy 2.0.40; el soporte SQL del marco depende del motor.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/rows-range-y-groups/1",
        "title": "Acumular ventas fila por fila",
        "language": "python",
        "code": "w=func.sum(pedidos.c.monto).over(order_by=[pedidos.c.fecha,pedidos.c.id],rows=(None,0))\nver(select(pedidos.c.id,pedidos.c.monto,w.label(\"acumulado\")).where(pedidos.c.estado==\"completed\").order_by(pedidos.c.fecha,pedidos.c.id))",
        "hint": "Sin marco explícito, ORDER BY suele incluir empates del valor actual por defecto.",
        "textOutput": "('id', 'monto', 'acumulado')\n[(101, 100, 100), (102, 200, 300), (103, 200, 500), (105, 300, 800), (106, 100, 900)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/promedio-movil",
    "remember": "Dos filas no significan dos días si faltan fechas.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/promedio-movil/1",
        "title": "Promediar el pedido actual y el anterior",
        "language": "python",
        "code": "w=func.avg(pedidos.c.monto).over(order_by=[pedidos.c.fecha,pedidos.c.id],rows=(-1,0))\nver(select(pedidos.c.id,w.label(\"media_movil\")).order_by(pedidos.c.fecha,pedidos.c.id))",
        "hint": "Dos filas no significan dos días si faltan fechas.",
        "textOutput": "('id', 'media_movil')\n[(101, 100.0), (102, 150.0), (103, 200.0), (104, 125.0), (105, 175.0), (106, 200.0), (107, 90.0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/first-value-last-value-y-ntile",
    "remember": "LAST_VALUE necesita un marco que llegue al final si buscas la última fila de toda la partición.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/first-value-last-value-y-ntile/1",
        "title": "Obtener último monto y dos segmentos",
        "language": "python",
        "code": "w=[pedidos.c.fecha,pedidos.c.id]\nultimo=func.last_value(pedidos.c.monto).over(order_by=w,rows=(None,None))\nver(select(pedidos.c.id,ultimo.label(\"ultimo\"),func.ntile(2).over(order_by=w).label(\"grupo\")).order_by(*w))",
        "hint": "LAST_VALUE necesita un marco que llegue al final si buscas la última fila de toda la partición.",
        "textOutput": "('id', 'ultimo', 'grupo')\n[(101, 80, 1), (102, 80, 1), (103, 80, 1), (104, 80, 1), (105, 80, 2), (106, 80, 2), (107, 80, 2)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/ventanas/filtrar-resultados-de-ventana",
    "remember": "No filtres una window function directamente en WHERE de su misma consulta.",
    "examples": [
      {
        "id": "sqlalchemy/ventanas/filtrar-resultados-de-ventana/1",
        "title": "Obtener el último pedido de cada cliente",
        "language": "python",
        "code": "n=func.row_number().over(partition_by=pedidos.c.cliente_id,order_by=[pedidos.c.fecha.desc(),pedidos.c.id.desc()])\nt=select(pedidos.c.cliente_id,pedidos.c.id,n.label(\"n\")).cte(\"numerados\")\nver(select(t.c.cliente_id,t.c.id).where(t.c.n==1).order_by(t.c.cliente_id))",
        "hint": "No filtres una window function directamente en WHERE de su misma consulta.",
        "textOutput": "('cliente_id', 'id')\n[(1, 102), (2, 104), (3, 106), (4, 107)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
