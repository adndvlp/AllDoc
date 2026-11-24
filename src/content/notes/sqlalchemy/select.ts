// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/select/definicion",
    "remember": "Construir no es ejecutar.",
    "examples": [
      {
        "id": "sqlalchemy/select/definicion/1",
        "title": "Consultar todos los productos",
        "language": "python",
        "code": "ver(select(productos).order_by(productos.c.id))",
        "hint": "Construir no es ejecutar.",
        "textOutput": "('id', 'nombre', 'categoria', 'precio')\n[(1, 'Mouse', 'Tech', 100), (2, 'Teclado', 'Tech', 200), (3, 'Silla', 'Hogar', 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/columnas-concretas-y-c",
    "remember": "select(tabla) pide todas sus columnas.",
    "examples": [
      {
        "id": "sqlalchemy/select/columnas-concretas-y-c/1",
        "title": "Mostrar nombre y precio",
        "language": "python",
        "code": "ver(select(productos.c.nombre,productos.c.precio).order_by(productos.c.id))",
        "hint": "select(tabla) pide todas sus columnas.",
        "textOutput": "('nombre', 'precio')\n[('Mouse', 100), ('Teclado', 200), ('Silla', 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/select-from",
    "remember": "select(func.count()) necesita un FROM para contar una tabla.",
    "examples": [
      {
        "id": "sqlalchemy/select/select-from/1",
        "title": "Contar clientes",
        "language": "python",
        "code": "valor(select(func.count()).select_from(clientes))",
        "hint": "select(func.count()) necesita un FROM para contar una tabla.",
        "textOutput": "5",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/label-y-alias",
    "remember": "label modifica la columna del resultado; alias identifica el origen.",
    "examples": [
      {
        "id": "sqlalchemy/select/label-y-alias/1",
        "title": "Nombrar un importe",
        "language": "python",
        "code": "p=pedidos.alias(\"p\")\nver(select(p.c.id,p.c.monto.label(\"importe\")).where(p.c.id==101))",
        "hint": "label modifica la columna del resultado; alias identifica el origen.",
        "textOutput": "('id', 'importe')\n[(101, 100)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/literal-literal-column-y-column",
    "remember": "No pases texto de usuario a literal_column().",
    "examples": [
      {
        "id": "sqlalchemy/select/literal-literal-column-y-column/1",
        "title": "Combinar una constante y una expresión",
        "language": "python",
        "code": "ver(select(literal(\"MX\").label(\"pais\"),sa.literal_column(\"2 + 3\").label(\"total\")))\nprint(select(sa.column(\"monto\")))",
        "hint": "No pases texto de usuario a literal_column().",
        "textOutput": "('pais', 'total')\n[('MX', 5)]\nSELECT monto",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/true-false-y-null",
    "remember": "None puede convertirse a NULL mediante expresiones tipadas.",
    "examples": [
      {
        "id": "sqlalchemy/select/true-false-y-null/1",
        "title": "Construir constantes SQL",
        "language": "python",
        "code": "ver(select(sa.true().label(\"si\"),sa.false().label(\"no\"),sa.null().label(\"ausente\")))",
        "hint": "None puede convertirse a NULL mediante expresiones tipadas.",
        "textOutput": "('si', 'no', 'ausente')\n[(True, False, None)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/select/add-columns-y-with-only-columns",
    "remember": "Guarda el resultado de cada transformación.",
    "examples": [
      {
        "id": "sqlalchemy/select/add-columns-y-with-only-columns/1",
        "title": "Ampliar y reducir una consulta",
        "language": "python",
        "code": "s=select(productos.c.nombre)\nver(s.add_columns(productos.c.precio).order_by(productos.c.id))\nver(s.with_only_columns(productos.c.id).order_by(productos.c.id))",
        "hint": "Guarda el resultado de cada transformación.",
        "textOutput": "('nombre', 'precio')\n[('Mouse', 100), ('Teclado', 200), ('Silla', 300)]\n('id',)\n[(1,), (2,), (3,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
