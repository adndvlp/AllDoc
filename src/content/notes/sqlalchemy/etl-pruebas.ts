// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/definicion",
    "remember": "Valida los datos antes de confirmar una carga.",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/definicion/1",
        "title": "Extraer pedidos y validar conteo",
        "language": "python",
        "code": "import pandas as pd\ndf=pd.read_sql_query(select(pedidos).order_by(pedidos.c.id),engine)\nprint(len(df),df.id.is_unique,df.monto.notna().all())",
        "hint": "Valida los datos antes de confirmar una carga.",
        "textOutput": "7 True True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/carga-de-csv-excel-y-json",
    "remember": "Conserva tipos, valida claves y evita replace sobre tablas de producción.",
    "note": "Para Excel usa pd.read_excel() con el motor necesario; para JSON pd.read_json() o json.load().",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/carga-de-csv-excel-y-json/1",
        "title": "Cargar un CSV pequeño en una tabla",
        "language": "python",
        "code": "import pandas as pd\nfrom io import StringIO\ndf=pd.read_csv(StringIO(\"id,nombre,categoria,precio\\n4,Mesa,Hogar,400\\n\"))\nwith engine.begin() as c:\n    df.to_sql(\"productos\",c,if_exists=\"append\",index=False)\nvalor(select(func.count()).select_from(productos))",
        "hint": "Conserva tipos, valida claves y evita replace sobre tablas de producción.",
        "textOutput": "4",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/cargas-incrementales-y-watermark",
    "remember": "No avances la marca hasta confirmar la carga. Usa upsert si deben procesarse filas repetidas.",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/cargas-incrementales-y-watermark/1",
        "title": "Extraer pedidos posteriores a una marca compuesta",
        "language": "python",
        "code": "f=date(2026,2,3); i=102\ns=select(pedidos.c.id).where(or_(pedidos.c.fecha>f,and_(pedidos.c.fecha==f,pedidos.c.id>i))).order_by(pedidos.c.fecha,pedidos.c.id)\nver(s)",
        "hint": "No avances la marca hasta confirmar la carga. Usa upsert si deben procesarse filas repetidas.",
        "textOutput": "('id',)\n[(103,), (104,), (105,), (106,), (107,)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/deduplicacion-y-validacion",
    "remember": "Define duplicado con una clave de negocio; no borres por coincidencia accidental.",
    "note": "Los clientes repetidos aquí son válidos; solo muestra la técnica de detección.",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/deduplicacion-y-validacion/1",
        "title": "Detectar clientes repetidos en los pedidos",
        "language": "python",
        "code": "ver(select(pedidos.c.cliente_id,func.count().label(\"n\")).group_by(pedidos.c.cliente_id).having(func.count()>1).order_by(pedidos.c.cliente_id))",
        "hint": "Define duplicado con una clave de negocio; no borres por coincidencia accidental.",
        "textOutput": "('cliente_id', 'n')\n[(1, 2), (2, 2), (3, 2)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/exportar-y-automatizar-reportes",
    "remember": "Un reporte reproducible usa filtros explícitos.",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/exportar-y-automatizar-reportes/1",
        "title": "Generar CSV sin crear un archivo",
        "language": "python",
        "code": "import pandas as pd\ns=select(pedidos.c.id,pedidos.c.monto).where(pedidos.c.estado==\"completed\").order_by(pedidos.c.id)\nprint(pd.read_sql_query(s,engine).to_csv(index=False).strip())",
        "hint": "Un reporte reproducible usa filtros explícitos.",
        "textOutput": "id,monto\n101,100\n102,200\n103,200\n105,300\n106,100",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/etl-pruebas/testing-con-sqlite-en-memoria-y-rollback",
    "remember": "SQLite no reproduce todos los comportamientos de PostgreSQL o MySQL; prueba también el motor de destino.",
    "examples": [
      {
        "id": "sqlalchemy/etl-pruebas/testing-con-sqlite-en-memoria-y-rollback/1",
        "title": "Validar una operación y revertirla",
        "language": "python",
        "code": "with engine.connect() as c:\n    tr=c.begin()\n    c.execute(update(pedidos).where(pedidos.c.id==101).values(monto=999))\n    assert c.execute(select(pedidos.c.monto).where(pedidos.c.id==101)).scalar_one()==999\n    tr.rollback()\nvalor(select(pedidos.c.monto).where(pedidos.c.id==101))",
        "hint": "SQLite no reproduce todos los comportamientos de PostgreSQL o MySQL; prueba también el motor de destino.",
        "textOutput": "100",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
