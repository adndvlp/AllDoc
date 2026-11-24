// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/definicion",
    "remember": "== construye comparación SQL, no modifica los datos.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/definicion/1",
        "title": "Pedidos de al menos 200",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto>=200).order_by(pedidos.c.id))",
        "hint": "== construye comparación SQL, no modifica los datos.",
        "textOutput": "('id', 'monto')\n[(102, 200), (103, 200), (105, 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/comparaciones-y-fechas",
    "remember": "Compara valores del tipo adecuado.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/comparaciones-y-fechas/1",
        "title": "Pedidos desde marzo",
        "language": "python",
        "code": "ver(select(pedidos.c.id).where(pedidos.c.fecha>=date(2026,3,1)).order_by(pedidos.c.id))",
        "hint": "Compara valores del tipo adecuado.",
        "textOutput": "('id',)\n[(105,), (106,), (107,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/and-or-y-not",
    "remember": "Usa paréntesis o funciones para definir precedencia.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/and-or-y-not/1",
        "title": "Filtrar completados y de monto alto",
        "language": "python",
        "code": "ver(select(pedidos.c.id).where(and_(pedidos.c.estado==\"completed\",pedidos.c.monto>=200)).order_by(pedidos.c.id))",
        "hint": "Usa paréntesis o funciones para definir precedencia.",
        "textOutput": "('id',)\n[(102,), (103,), (105,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/operadores-y",
    "remember": "Encierra cada comparación entre paréntesis.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/operadores-y/1",
        "title": "Excluir pedidos pequeños y cancelados",
        "language": "python",
        "code": "ver(select(pedidos.c.id).where((pedidos.c.monto>=100) & ~(pedidos.c.estado==\"cancelled\")).order_by(pedidos.c.id))",
        "hint": "Encierra cada comparación entre paréntesis.",
        "textOutput": "('id',)\n[(101,), (102,), (103,), (105,), (106,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/in-y-not-in",
    "remember": "NOT IN con NULL requiere cuidado por la lógica SQL de tres valores.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/in-y-not-in/1",
        "title": "Consultar dos países",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).where(clientes.c.pais.in_([\"MX\",\"ES\"])).order_by(clientes.c.id))",
        "hint": "NOT IN con NULL requiere cuidado por la lógica SQL de tres valores.",
        "textOutput": "('nombre',)\n[('Ana',), ('Luis',), ('Marta',), ('Eva',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/between",
    "remember": "100 y 200 también entran en BETWEEN 100 AND 200.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/between/1",
        "title": "Pedidos en un rango",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.monto.between(100,200)).order_by(pedidos.c.id))",
        "hint": "100 y 200 también entran en BETWEEN 100 AND 200.",
        "textOutput": "('id', 'monto')\n[(101, 100), (102, 200), (103, 200), (106, 100)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/like-e-ilike",
    "remember": "La sensibilidad de LIKE depende de la base y collation.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/like-e-ilike/1",
        "title": "Buscar nombres con A al inicio",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).where(clientes.c.nombre.ilike(\"a%\")).order_by(clientes.c.id))",
        "hint": "La sensibilidad de LIKE depende de la base y collation.",
        "textOutput": "('nombre',)\n[('Ana',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/contains-startswith-y-endswith",
    "remember": "Son expresiones SQL, no métodos str de Python.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/contains-startswith-y-endswith/1",
        "title": "Buscar productos con prefijo M",
        "language": "python",
        "code": "ver(select(productos.c.nombre).where(productos.c.nombre.startswith(\"M\",autoescape=True)))",
        "hint": "Son expresiones SQL, no métodos str de Python.",
        "textOutput": "('nombre',)\n[('Mouse',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/filtros/tuple-any-y-all",
    "remember": "ANY/ALL no son equivalentes a una lista Python de condiciones.",
    "note": "tuple IN se admite en SQLite moderno, PostgreSQL y MySQL; ANY/ALL dependen del dialecto, por ejemplo PostgreSQL con arrays o subconsultas.",
    "examples": [
      {
        "id": "sqlalchemy/filtros/tuple-any-y-all/1",
        "title": "Filtrar pares cliente y monto",
        "language": "python",
        "code": "ver(select(pedidos.c.id).where(sa.tuple_(pedidos.c.cliente_id,pedidos.c.monto).in_([(1,100),(3,300)])).order_by(pedidos.c.id))",
        "hint": "ANY/ALL no son equivalentes a una lista Python de condiciones.",
        "textOutput": "('id',)\n[(101,), (105,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
