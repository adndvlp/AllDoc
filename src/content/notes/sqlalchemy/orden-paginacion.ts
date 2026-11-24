// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/orden-paginacion/definicion",
    "remember": "Usa un orden estable antes de paginar.",
    "examples": [
      {
        "id": "sqlalchemy/orden-paginacion/definicion/1",
        "title": "Mostrar los dos pedidos de mayor monto",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.monto).order_by(pedidos.c.monto.desc(),pedidos.c.id).limit(2))",
        "hint": "Usa un orden estable antes de paginar.",
        "textOutput": "('id', 'monto')\n[(105, 300), (102, 200)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orden-paginacion/asc-desc-y-varios-criterios",
    "remember": "Cada criterio tiene su propia dirección.",
    "examples": [
      {
        "id": "sqlalchemy/orden-paginacion/asc-desc-y-varios-criterios/1",
        "title": "Ordenar por monto y fecha",
        "language": "python",
        "code": "ver(select(pedidos.c.id,pedidos.c.monto).order_by(pedidos.c.monto.desc(),pedidos.c.fecha.asc(),pedidos.c.id))",
        "hint": "Cada criterio tiene su propia dirección.",
        "textOutput": "('id', 'monto')\n[(105, 300), (102, 200), (103, 200), (101, 100), (106, 100), (107, 80), (104, 50)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orden-paginacion/nulls-first-y-nulls-last",
    "remember": "No todos los motores admiten NULLS FIRST/LAST.",
    "note": "SQLite 3.30+ y PostgreSQL lo admiten; en MySQL usa un criterio adicional como columna.is_(None).",
    "examples": [
      {
        "id": "sqlalchemy/orden-paginacion/nulls-first-y-nulls-last/1",
        "title": "Mostrar países desconocidos al final",
        "language": "python",
        "code": "ver(select(clientes.c.nombre,clientes.c.pais).order_by(clientes.c.pais.asc().nulls_last(),clientes.c.id))",
        "hint": "No todos los motores admiten NULLS FIRST/LAST.",
        "textOutput": "('nombre', 'pais')\n[('Marta', 'ES'), ('Eva', 'ES'), ('Ana', 'MX'), ('Luis', 'MX'), ('Noa', None)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orden-paginacion/limit-y-offset",
    "remember": "En datos que cambian, paginación por clave puede ser más estable.",
    "examples": [
      {
        "id": "sqlalchemy/orden-paginacion/limit-y-offset/1",
        "title": "Leer la segunda página de dos clientes",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).order_by(clientes.c.id).limit(2).offset(2))",
        "hint": "En datos que cambian, paginación por clave puede ser más estable.",
        "textOutput": "('nombre',)\n[('Marta',), ('Noa',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/orden-paginacion/distinct",
    "remember": "SELECT DISTINCT de dos columnas deduplica la combinación.",
    "examples": [
      {
        "id": "sqlalchemy/orden-paginacion/distinct/1",
        "title": "Listar países conocidos",
        "language": "python",
        "code": "ver(select(clientes.c.pais).where(clientes.c.pais.is_not(None)).distinct().order_by(clientes.c.pais))",
        "hint": "SELECT DISTINCT de dos columnas deduplica la combinación.",
        "textOutput": "('pais',)\n[('ES',), ('MX',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
