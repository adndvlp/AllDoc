// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/definicion",
    "remember": "Agrupa según la granularidad que necesitas.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/definicion/1",
        "title": "Calcular venta por cliente",
        "language": "python",
        "code": "ver(select(pedidos.c.cliente_id,func.sum(pedidos.c.monto).label(\"total\")).group_by(pedidos.c.cliente_id).order_by(pedidos.c.cliente_id))",
        "hint": "Agrupa según la granularidad que necesitas.",
        "textOutput": "('cliente_id', 'total')\n[(1, 300), (2, 250), (3, 400), (4, 80)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/count-y-count-distinct",
    "remember": "Cuenta la clave del lado derecho en un LEFT JOIN.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/count-y-count-distinct/1",
        "title": "Comparar tres conteos",
        "language": "python",
        "code": "ver(select(func.count().label(\"filas\"),func.count(pedidos.c.cupon).label(\"cupones\"),func.count(sa.distinct(pedidos.c.cliente_id)).label(\"clientes\")).select_from(pedidos))",
        "hint": "Cuenta la clave del lado derecho en un LEFT JOIN.",
        "textOutput": "('filas', 'cupones', 'clientes')\n[(7, 2, 4)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/sum-avg-min-y-max",
    "remember": "SUM de cero filas devuelve NULL, no cero.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/sum-avg-min-y-max/1",
        "title": "Resumir pedidos completados",
        "language": "python",
        "code": "ver(select(func.sum(pedidos.c.monto).label(\"suma\"),func.avg(pedidos.c.monto).label(\"promedio\"),func.min(pedidos.c.monto).label(\"min\"),func.max(pedidos.c.monto).label(\"max\")).where(pedidos.c.estado==\"completed\"))",
        "hint": "SUM de cero filas devuelve NULL, no cero.",
        "textOutput": "('suma', 'promedio', 'min', 'max')\n[(900, 180.0, 100, 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/group-by-con-varias-columnas",
    "remember": "Una columna no agregada debe estar agrupada o ser funcionalmente dependiente según el motor.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/group-by-con-varias-columnas/1",
        "title": "Contar pedidos por país y estado",
        "language": "python",
        "code": "ver(select(clientes.c.pais,pedidos.c.estado,func.count().label(\"n\")).join_from(pedidos,clientes).group_by(clientes.c.pais,pedidos.c.estado).order_by(clientes.c.pais,pedidos.c.estado))",
        "hint": "Una columna no agregada debe estar agrupada o ser funcionalmente dependiente según el motor.",
        "textOutput": "('pais', 'estado', 'n')\n[(None, 'cancelled', 1), ('ES', 'completed', 2), ('MX', 'cancelled', 1), ('MX', 'completed', 3)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/having-y-where",
    "remember": "No uses WHERE para filtrar una agregación de esa misma consulta.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/having-y-where/1",
        "title": "Clientes con dos pedidos completados",
        "language": "python",
        "code": "ver(select(pedidos.c.cliente_id,func.count().label(\"n\")).where(pedidos.c.estado==\"completed\").group_by(pedidos.c.cliente_id).having(func.count()>=2).order_by(pedidos.c.cliente_id))",
        "hint": "No uses WHERE para filtrar una agregación de esa misma consulta.",
        "textOutput": "('cliente_id', 'n')\n[(1, 2), (3, 2)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/agregacion-condicional-y-porcentajes",
    "remember": "Mantén el denominador completo y evita dividir por cero.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/agregacion-condicional-y-porcentajes/1",
        "title": "Calcular porcentaje de completados",
        "language": "python",
        "code": "n=func.sum(case((pedidos.c.estado==\"completed\",1),else_=0))\nvalor(select(func.round(100.0*n/func.nullif(func.count(),0),2)).select_from(pedidos))",
        "hint": "Mantén el denominador completo y evita dividir por cero.",
        "textOutput": "71.43",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/filter-en-agregados",
    "remember": "FILTER está disponible en PostgreSQL y SQLite 3.30+; CASE es una alternativa portable.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/filter-en-agregados/1",
        "title": "Contar completados y todos a la vez",
        "language": "python",
        "code": "ver(select(func.count().label(\"todos\"),func.count().filter(pedidos.c.estado==\"completed\").label(\"completados\")).select_from(pedidos))",
        "hint": "FILTER está disponible en PostgreSQL y SQLite 3.30+; CASE es una alternativa portable.",
        "textOutput": "('todos', 'completados')\n[(7, 5)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/concatenacion-agregada",
    "remember": "No supongas orden de concatenación si no se define.",
    "note": "El orden interno no está garantizado por esta consulta; se muestra un resultado posible.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/concatenacion-agregada/1",
        "title": "Unir los nombres de países de clientes",
        "language": "python",
        "code": "valor(select(func.aggregate_strings(clientes.c.nombre,\", \")).where(clientes.c.pais==\"MX\"))",
        "hint": "No supongas orden de concatenación si no se define.",
        "textOutput": "Ana, Luis",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/agregaciones/rollup-cube-y-grouping-sets",
    "remember": "SQLite no admite estas expresiones de agrupación.",
    "note": "Solo se compila; no se ejecuta contra PostgreSQL.",
    "examples": [
      {
        "id": "sqlalchemy/agregaciones/rollup-cube-y-grouping-sets/1",
        "title": "Compilar subtotales para PostgreSQL",
        "language": "python",
        "code": "from sqlalchemy.dialects import postgresql\ns=select(clientes.c.pais,func.count()).group_by(func.rollup(clientes.c.pais))\nprint(s.compile(dialect=postgresql.dialect()))",
        "hint": "SQLite no admite estas expresiones de agrupación.",
        "textOutput": "SELECT clientes.pais, count(*) AS count_1 \nFROM clientes GROUP BY ROLLUP(clientes.pais)",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
