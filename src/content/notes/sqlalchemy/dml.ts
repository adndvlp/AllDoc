// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/dml/definicion",
    "remember": "Comprueba WHERE antes de modificar o eliminar filas.",
    "examples": [
      {
        "id": "sqlalchemy/dml/definicion/1",
        "title": "Insertar un producto",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(insert(productos).values(id=4,nombre=\"Mesa\",categoria=\"Hogar\",precio=400))\nver(select(productos).where(productos.c.id==4))",
        "hint": "Comprueba WHERE antes de modificar o eliminar filas.",
        "textOutput": "('id', 'nombre', 'categoria', 'precio')\n[(4, 'Mesa', 'Hogar', 400)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/insert-multiple-y-executemany",
    "remember": "Usa claves compatibles en todos los diccionarios.",
    "examples": [
      {
        "id": "sqlalchemy/dml/insert-multiple-y-executemany/1",
        "title": "Cargar dos productos en bloque",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(insert(productos),[dict(id=4,nombre=\"Mesa\",categoria=\"Hogar\",precio=400),dict(id=5,nombre=\"Cable\",categoria=\"Tech\",precio=30)])\nvalor(select(func.count()).select_from(productos))",
        "hint": "Usa claves compatibles en todos los diccionarios.",
        "textOutput": "5",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/insert-from-select",
    "remember": "El orden y tipo de las columnas destino deben coincidir.",
    "examples": [
      {
        "id": "sqlalchemy/dml/insert-from-select/1",
        "title": "Guardar un catálogo reducido",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"catalogo\",m,Column(\"nombre\",String),Column(\"precio\",Integer))\nm.create_all(engine)\nwith engine.begin() as conn:\n    conn.execute(insert(t).from_select([\"nombre\",\"precio\"],select(productos.c.nombre,productos.c.precio).where(productos.c.precio>=200)))\nver(select(t).order_by(t.c.precio))",
        "hint": "El orden y tipo de las columnas destino deben coincidir.",
        "textOutput": "('nombre', 'precio')\n[('Teclado', 200), ('Silla', 300)]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/update-where-values",
    "remember": "Sin WHERE puede modificar toda la tabla.",
    "examples": [
      {
        "id": "sqlalchemy/dml/update-where-values/1",
        "title": "Actualizar un precio",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(update(productos).where(productos.c.id==1).values(precio=110))\nvalor(select(productos.c.precio).where(productos.c.id==1))",
        "hint": "Sin WHERE puede modificar toda la tabla.",
        "textOutput": "110",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/delete-where",
    "remember": "Verifica el filtro con SELECT y usa una transacción.",
    "examples": [
      {
        "id": "sqlalchemy/dml/delete-where/1",
        "title": "Eliminar un cliente sin pedidos",
        "language": "python",
        "code": "with engine.begin() as conn:\n    conn.execute(delete(clientes).where(clientes.c.id==5))\nvalor(select(func.count()).select_from(clientes))",
        "hint": "Verifica el filtro con SELECT y usa una transacción.",
        "textOutput": "4",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/returning-y-return-defaults",
    "remember": "No combines returning() y return_defaults() en la misma sentencia.",
    "note": "SQLite 3.35+ y PostgreSQL admiten RETURNING; MySQL no lo ofrece de forma general. SQL Server emplea OUTPUT mediante su dialecto.",
    "examples": [
      {
        "id": "sqlalchemy/dml/returning-y-return-defaults/1",
        "title": "Recuperar el ID insertado",
        "language": "python",
        "code": "with engine.begin() as conn:\n    print(conn.execute(insert(productos).values(nombre=\"Mesa\",precio=400).returning(productos.c.id)).scalar_one())",
        "hint": "No combines returning() y return_defaults() en la misma sentencia.",
        "textOutput": "4",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/upsert-en-sqlite-y-postgresql",
    "remember": "Define la restricción o columnas que representan el conflicto.",
    "note": "PostgreSQL usa sqlalchemy.dialects.postgresql.insert con una API similar; no uses el insert genérico para estas extensiones.",
    "examples": [
      {
        "id": "sqlalchemy/dml/upsert-en-sqlite-y-postgresql/1",
        "title": "Actualizar un producto existente",
        "language": "python",
        "code": "from sqlalchemy.dialects.sqlite import insert as upsert\ns=upsert(productos).values(id=1,nombre=\"Mouse\",precio=115)\ns=s.on_conflict_do_update(index_elements=[productos.c.id],set_={\"precio\":s.excluded.precio})\nwith engine.begin() as conn:\n    conn.execute(s)\nvalor(select(productos.c.precio).where(productos.c.id==1))",
        "hint": "Define la restricción o columnas que representan el conflicto.",
        "textOutput": "115",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/dml/upsert-en-mysql",
    "remember": "No es equivalente exacto a elegir un objetivo ON CONFLICT.",
    "note": "Solo compilación; requiere un servidor MySQL y driver para ejecutar. La sintaxis SQL generada puede depender de la versión del motor.",
    "examples": [
      {
        "id": "sqlalchemy/dml/upsert-en-mysql/1",
        "title": "Compilar un upsert MySQL",
        "language": "python",
        "code": "from sqlalchemy.dialects import mysql\ns=mysql.insert(productos).values(id=1,nombre=\"Mouse\",precio=115)\ns=s.on_duplicate_key_update(precio=s.inserted.precio)\nprint(s.compile(dialect=mysql.dialect()))",
        "hint": "No es equivalente exacto a elegir un objetivo ON CONFLICT.",
        "textOutput": "INSERT INTO productos (id, nombre, precio) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE precio = VALUES(precio)",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
