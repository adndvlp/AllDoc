// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/joins/definicion",
    "remember": "INNER conserva coincidencias; outerjoin conserva también el lado izquierdo.",
    "examples": [
      {
        "id": "sqlalchemy/joins/definicion/1",
        "title": "Cruzar pedidos y clientes",
        "language": "python",
        "code": "ver(select(pedidos.c.id,clientes.c.nombre).join(clientes).order_by(pedidos.c.id))",
        "hint": "INNER conserva coincidencias; outerjoin conserva también el lado izquierdo.",
        "textOutput": "('id', 'nombre')\n[(101, 'Ana'), (102, 'Ana'), (103, 'Luis'), (104, 'Luis'), (105, 'Marta'), (106, 'Marta'), (107, 'Noa')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/join-con-condicion-explicita",
    "remember": "Elige la clave que representa la relación real.",
    "examples": [
      {
        "id": "sqlalchemy/joins/join-con-condicion-explicita/1",
        "title": "Mostrar pedidos y nombres",
        "language": "python",
        "code": "ver(select(pedidos.c.id,clientes.c.nombre).select_from(pedidos).join(clientes,pedidos.c.cliente_id==clientes.c.id).order_by(pedidos.c.id))",
        "hint": "Elige la clave que representa la relación real.",
        "textOutput": "('id', 'nombre')\n[(101, 'Ana'), (102, 'Ana'), (103, 'Luis'), (104, 'Luis'), (105, 'Marta'), (106, 'Marta'), (107, 'Noa')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/outerjoin-y-filtros-on",
    "remember": "WHERE sobre el lado derecho puede eliminar las filas conservadas.",
    "examples": [
      {
        "id": "sqlalchemy/joins/outerjoin-y-filtros-on/1",
        "title": "Contar completados incluyendo clientes sin pedidos",
        "language": "python",
        "code": "j=clientes.outerjoin(pedidos,and_(clientes.c.id==pedidos.c.cliente_id,pedidos.c.estado==\"completed\"))\nver(select(clientes.c.nombre,func.count(pedidos.c.id).label(\"n\")).select_from(j).group_by(clientes.c.id,clientes.c.nombre).order_by(clientes.c.id))",
        "hint": "WHERE sobre el lado derecho puede eliminar las filas conservadas.",
        "textOutput": "('nombre', 'n')\n[('Ana', 2), ('Luis', 1), ('Marta', 2), ('Noa', 0), ('Eva', 0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/right-join-y-full-outer-join",
    "remember": "FULL conserva ambos lados; depende del motor.",
    "note": "FULL se puede construir con clientes.join(pedidos, full=True). SQLite 3.39+ y PostgreSQL lo admiten; MySQL no lo admite directamente.",
    "examples": [
      {
        "id": "sqlalchemy/joins/right-join-y-full-outer-join/1",
        "title": "Conservar clientes invirtiendo el lado lógico",
        "language": "python",
        "code": "ver(select(clientes.c.nombre,pedidos.c.id).select_from(clientes.outerjoin(pedidos)).order_by(clientes.c.id,pedidos.c.id))",
        "hint": "FULL conserva ambos lados; depende del motor.",
        "textOutput": "('nombre', 'id')\n[('Ana', 101), ('Ana', 102), ('Luis', 103), ('Luis', 104), ('Marta', 105), ('Marta', 106), ('Noa', 107), ('Eva', None)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/anti-join",
    "remember": "Comprueba una clave no nula para distinguir falta de coincidencia.",
    "examples": [
      {
        "id": "sqlalchemy/joins/anti-join/1",
        "title": "Encontrar clientes sin pedidos",
        "language": "python",
        "code": "ver(select(clientes.c.nombre).select_from(clientes.outerjoin(pedidos)).where(pedidos.c.id.is_(None)))",
        "hint": "Comprueba una clave no nula para distinguir falta de coincidencia.",
        "textOutput": "('nombre',)\n[('Eva',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/self-join-y-alias",
    "remember": "Distingue cada rol en la condición ON.",
    "examples": [
      {
        "id": "sqlalchemy/joins/self-join-y-alias/1",
        "title": "Encontrar parejas de clientes del mismo país",
        "language": "python",
        "code": "a=clientes.alias(\"a\")\nb=clientes.alias(\"b\")\nver(select(a.c.nombre.label(\"uno\"),b.c.nombre.label(\"otro\")).select_from(a.join(b,and_(a.c.pais==b.c.pais,a.c.id<b.c.id))).order_by(a.c.id,b.c.id))",
        "hint": "Distingue cada rol en la condición ON.",
        "textOutput": "('uno', 'otro')\n[('Ana', 'Luis'), ('Marta', 'Eva')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/cross-join",
    "remember": "El número de filas puede multiplicarse rápidamente.",
    "examples": [
      {
        "id": "sqlalchemy/joins/cross-join/1",
        "title": "Combinar clientes y productos",
        "language": "python",
        "code": "valor(select(func.count()).select_from(clientes.join(productos,sa.true())))",
        "hint": "El número de filas puede multiplicarse rápidamente.",
        "textOutput": "15",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/joins/join-from-y-varias-tablas",
    "remember": "No sumes montos de cabecera repetidos por cada detalle.",
    "examples": [
      {
        "id": "sqlalchemy/joins/join-from-y-varias-tablas/1",
        "title": "Obtener importe por categoría",
        "language": "python",
        "code": "s=select(productos.c.categoria,func.sum(detalles.c.cantidad*detalles.c.precio).label(\"total\")).join_from(detalles,productos).join_from(detalles,pedidos).where(pedidos.c.estado==\"completed\").group_by(productos.c.categoria).order_by(productos.c.categoria)\nver(s)",
        "hint": "No sumes montos de cabecera repetidos por cada detalle.",
        "textOutput": "('categoria', 'total')\n[('Hogar', 300), ('Tech', 600)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
