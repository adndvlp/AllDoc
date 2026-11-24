// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/null-condiciones/definicion",
    "remember": "NULL no es cero ni cadena vacía.",
    "examples": [
      {
        "id": "sqlalchemy/null-condiciones/definicion/1",
        "title": "Encontrar clientes sin país",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).where(clientes.c.pais.is_(None)))",
        "hint": "NULL no es cero ni cadena vacía.",
        "textOutput": "('nombre',)\n[('Noa',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/null-condiciones/is-e-is-not",
    "remember": "No uses Python is None para construir filtros SQL.",
    "examples": [
      {
        "id": "sqlalchemy/null-condiciones/is-e-is-not/1",
        "title": "Seleccionar pedidos con cupón",
        "language": "python",
        "code": "ver(select(pedidos.c.id).where(pedidos.c.cupon.is_not(None)).order_by(pedidos.c.id))",
        "hint": "No uses Python is None para construir filtros SQL.",
        "textOutput": "('id',)\n[(102,), (105,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/null-condiciones/func-coalesce",
    "remember": "El reemplazo afecta el resultado, no los datos almacenados.",
    "examples": [
      {
        "id": "sqlalchemy/null-condiciones/func-coalesce/1",
        "title": "Mostrar país desconocido",
        "language": "python",
        "code": "ver(select(clientes.c.nombre,func.coalesce(clientes.c.pais,\"Sin país\").label(\"pais\")).order_by(clientes.c.id))",
        "hint": "El reemplazo afecta el resultado, no los datos almacenados.",
        "textOutput": "('nombre', 'pais')\n[('Ana', 'MX'), ('Luis', 'MX'), ('Marta', 'ES'), ('Noa', 'Sin país'), ('Eva', 'ES')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/null-condiciones/func-nullif",
    "remember": "Protege denominadores que podrían valer cero.",
    "examples": [
      {
        "id": "sqlalchemy/null-condiciones/func-nullif/1",
        "title": "Evitar división por cero",
        "language": "python",
        "code": "valor(select(literal(100)/func.nullif(0,0)))",
        "hint": "Protege denominadores que podrían valer cero.",
        "textOutput": "None",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/null-condiciones/case",
    "remember": "La primera condición verdadera gana.",
    "examples": [
      {
        "id": "sqlalchemy/null-condiciones/case/1",
        "title": "Clasificar montos",
        "language": "python",
        "code": "segmento=case((pedidos.c.monto>=200,\"Alto\"),else_=\"Bajo\")\nver(select(pedidos.c.id,segmento.label(\"segmento\")).order_by(pedidos.c.id))",
        "hint": "La primera condición verdadera gana.",
        "textOutput": "('id', 'segmento')\n[(101, 'Bajo'), (102, 'Alto'), (103, 'Alto'), (104, 'Bajo'), (105, 'Alto'), (106, 'Bajo'), (107, 'Bajo')]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
