// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/definicion",
    "remember": "func no ejecuta funciones Python sobre filas.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/definicion/1",
        "title": "Redondear el promedio",
        "language": "python",
        "code": "valor(select(func.round(func.avg(pedidos.c.monto),2)))",
        "hint": "func no ejecuta funciones Python sobre filas.",
        "textOutput": "147.14",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/texto-upper-lower-trim-y-length",
    "remember": "Los nombres y collations pueden variar según el motor.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/texto-upper-lower-trim-y-length/1",
        "title": "Normalizar nombres",
        "language": "python",
        "code": "ver(select(func.upper(clientes.c.nombre).label(\"mayus\"),func.length(clientes.c.nombre).label(\"longitud\")).order_by(clientes.c.id))",
        "hint": "Los nombres y collations pueden variar según el motor.",
        "textOutput": "('mayus', 'longitud')\n[('ANA', 3), ('LUIS', 4), ('MARTA', 5), ('NOA', 3), ('EVA', 3)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/texto-substr-replace-y-concatenacion",
    "remember": "Usa + sobre expresiones String, no sobre enteros, para concatenar.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/texto-substr-replace-y-concatenacion/1",
        "title": "Construir etiquetas",
        "language": "python",
        "code": "ver(select((clientes.c.nombre+literal(\" - \")+func.coalesce(clientes.c.pais,\"?\")).label(\"etiqueta\")).order_by(clientes.c.id))",
        "hint": "Usa + sobre expresiones String, no sobre enteros, para concatenar.",
        "textOutput": "('etiqueta',)\n[('Ana - MX',), ('Luis - MX',), ('Marta - ES',), ('Noa - ?',), ('Eva - ES',)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/numericas-round-abs-ceil-floor-y-mod",
    "remember": "No redondees importes antes de sumar salvo que el negocio lo exija.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/numericas-round-abs-ceil-floor-y-mod/1",
        "title": "Calcular diferencia absoluta y resto",
        "language": "python",
        "code": "ver(select(func.abs(-15).label(\"absoluto\"),(literal(11)%3).label(\"resto\"),func.round(12.345,2).label(\"redondeo\")))",
        "hint": "No redondees importes antes de sumar salvo que el negocio lo exija.",
        "textOutput": "('absoluto', 'resto', 'redondeo')\n[(15, 2, 12.35)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/extract-y-funciones-de-fecha",
    "remember": "YEAR y DATE_FORMAT son propios de algunos motores.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/extract-y-funciones-de-fecha/1",
        "title": "Extraer año y mes",
        "language": "python",
        "code": "ver(select(pedidos.c.id,sa.extract(\"year\",pedidos.c.fecha).label(\"anio\"),sa.extract(\"month\",pedidos.c.fecha).label(\"mes\")).where(pedidos.c.id==101))",
        "hint": "YEAR y DATE_FORMAT son propios de algunos motores.",
        "textOutput": "('id', 'anio', 'mes')\n[(101, 2026, 2)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/funciones-sql/diferencias-de-fechas-y-dialectos",
    "remember": "No supongas que una función temporal tiene la misma sintaxis en todos los motores.",
    "examples": [
      {
        "id": "sqlalchemy/funciones-sql/diferencias-de-fechas-y-dialectos/1",
        "title": "Calcular días desde el alta",
        "language": "python",
        "code": "ver(select(pedidos.c.id,(func.julianday(pedidos.c.fecha)-func.julianday(clientes.c.alta)).label(\"dias\")).join(clientes).where(pedidos.c.id==101))",
        "hint": "No supongas que una función temporal tiene la misma sintaxis en todos los motores.",
        "textOutput": "('id', 'dias')\n[(101, 31.0)]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
