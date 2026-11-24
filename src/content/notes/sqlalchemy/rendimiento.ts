// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/definicion",
    "remember": "Optimiza consultas y evita traer columnas o filas innecesarias.",
    "note": "El texto exacto del plan depende de SQLite y sus estadísticas.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/definicion/1",
        "title": "Consultar un plan SQLite",
        "language": "python",
        "code": "with engine.connect() as c:\n    print(c.exec_driver_sql(\"EXPLAIN QUERY PLAN SELECT * FROM clientes WHERE id=1\").all())",
        "hint": "Optimiza consultas y evita traer columnas o filas innecesarias.",
        "textOutput": "[(2, 0, 0, 'SEARCH clientes USING INTEGER PRIMARY KEY (rowid=?)')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/stream-results-y-yield-per",
    "remember": "No todos los drivers tienen cursores de servidor. Evita all() si buscas limitar memoria.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/stream-results-y-yield-per/1",
        "title": "Procesar dos pedidos por lote",
        "language": "python",
        "code": "with engine.connect() as c:\n    with c.execution_options(yield_per=2).execute(select(pedidos.c.id).order_by(pedidos.c.id)) as r:\n        print([list(b) for b in r.partitions()])",
        "hint": "No todos los drivers tienen cursores de servidor. Evita all() si buscas limitar memoria.",
        "textOutput": "[[(101,), (102,)], [(103,), (104,)], [(105,), (106,)], [(107,)]]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/insertmanyvalues-y-cargas-masivas",
    "remember": "Mide el tamaño de lote; respeta restricciones y transacciones.",
    "note": "Depende del soporte de RETURNING masivo; si necesitas correlación exacta usa sort_by_parameter_order=True cuando sea compatible.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/insertmanyvalues-y-cargas-masivas/1",
        "title": "Insertar y devolver varios IDs",
        "language": "python",
        "code": "with engine.begin() as c:\n    r=c.execute(insert(productos).returning(productos.c.id),[dict(nombre=\"Mesa\",precio=400),dict(nombre=\"Cable\",precio=30)])\n    print(sorted(r.scalars().all()))",
        "hint": "Mide el tamaño de lote; respeta restricciones y transacciones.",
        "textOutput": "[4, 5]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/event-listen-y-listens-for",
    "remember": "Un evento de cursor recibe SQL y parámetros: no registres secretos.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/event-listen-y-listens-for/1",
        "title": "Medir cuántas sentencias se emiten",
        "language": "python",
        "code": "n=[]\ndef contar(*args):\n    n.append(1)\nsa.event.listen(engine,\"before_cursor_execute\",contar)\nvalor(select(func.count()).select_from(clientes))\nsa.event.remove(engine,\"before_cursor_execute\",contar)\nprint(len(n))",
        "hint": "Un evento de cursor recibe SQL y parámetros: no registres secretos.",
        "textOutput": "5\n1",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/eventos-de-pool-y-sesion",
    "remember": "No realices trabajo pesado dentro de cada callback.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/eventos-de-pool-y-sesion/1",
        "title": "Registrar el préstamo y devolución",
        "language": "python",
        "code": "n=[]\n@sa.event.listens_for(engine,\"checkout\")\ndef prestamo(*args):\n    n.append(\"checkout\")\n@sa.event.listens_for(engine,\"checkin\")\ndef devolucion(*args):\n    n.append(\"checkin\")\nwith engine.connect():\n    pass\nprint(n)",
        "hint": "No realices trabajo pesado dentro de cada callback.",
        "textOutput": "['checkout', 'checkin']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/perfilado-y-tiempos",
    "remember": "No confundas tiempo de ejecución con tiempo de recuperar todas las filas.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/perfilado-y-tiempos/1",
        "title": "Cronometrar una consulta",
        "language": "python",
        "code": "from time import perf_counter\nt=perf_counter()\nwith engine.connect() as c:\n    c.execute(select(pedidos)).all()\nprint(perf_counter()-t>=0)",
        "hint": "No confundas tiempo de ejecución con tiempo de recuperar todas las filas.",
        "textOutput": "True",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/typedecorator-y-userdefinedtype",
    "remember": "cache_ok debe reflejar si la configuración es segura para la caché SQL.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/typedecorator-y-userdefinedtype/1",
        "title": "Normalizar texto al guardar",
        "language": "python",
        "code": "class Mayus(sa.TypeDecorator):\n    impl=String\n    cache_ok=True\n    def process_bind_param(self,value,dialect):\n        return value.upper() if value is not None else None\nm=MetaData()\nt=Table(\"codigos\",m,Column(\"codigo\",Mayus(10)))\nm.create_all(engine)\nwith engine.begin() as c:\n    c.execute(insert(t).values(codigo=\"mx\"))\nvalor(select(t.c.codigo))",
        "hint": "cache_ok debe reflejar si la configuración es segura para la caché SQL.",
        "textOutput": "MX",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/rendimiento/multiples-engines-y-sharding",
    "remember": "No asumas atomicidad distribuida entre engines.",
    "examples": [
      {
        "id": "sqlalchemy/rendimiento/multiples-engines-y-sharding/1",
        "title": "Consultar dos bases independientes",
        "language": "python",
        "code": "e1=create_engine(\"sqlite://\")\ne2=create_engine(\"sqlite://\")\nwith e1.connect() as a,e2.connect() as b:\n    print(a.execute(text(\"SELECT 1\")).scalar(),b.execute(text(\"SELECT 2\")).scalar())\ne1.dispose();e2.dispose()",
        "hint": "No asumas atomicidad distribuida entre engines.",
        "textOutput": "1 2",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
