// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/definicion",
    "remember": "Una restricción de la base protege incluso escrituras externas a Python.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/definicion/1",
        "title": "Inspeccionar claves existentes",
        "language": "python",
        "code": "i=inspect(engine)\nprint(i.get_pk_constraint(\"clientes\")[\"constrained_columns\"])\nprint(i.get_foreign_keys(\"pedidos\")[0][\"referred_table\"])",
        "hint": "Una restricción de la base protege incluso escrituras externas a Python.",
        "textOutput": "['id']\nclientes",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/primary-key-unique-y-not-null",
    "remember": "La clave primaria puede ser compuesta.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/primary-key-unique-y-not-null/1",
        "title": "Declarar restricciones de una tabla",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"usuarios\",m,Column(\"id\",Integer,primary_key=True),Column(\"email\",String,unique=True,nullable=False))\nprint(t.c.id.primary_key,t.c.email.unique,t.c.email.nullable)",
        "hint": "La clave primaria puede ser compuesta.",
        "textOutput": "True True False",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/foreignkey-claves-compuestas-y-cascade",
    "remember": "CASCADE de la base no equivale a cascade del ORM.",
    "note": "Ejemplo de configuración: ForeignKey(\"clientes.id\", ondelete=\"CASCADE\"). En SQLite activa PRAGMA foreign_keys, como en la preparación.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/foreignkey-claves-compuestas-y-cascade/1",
        "title": "Inspeccionar una clave foránea",
        "language": "python",
        "code": "fk=next(iter(pedidos.c.cliente_id.foreign_keys))\nprint(fk.target_fullname)",
        "hint": "CASCADE de la base no equivale a cascade del ORM.",
        "textOutput": "clientes.id",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/checkconstraint-y-uniqueconstraint",
    "remember": "Las restricciones compuestas se declaran sobre Table.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/checkconstraint-y-uniqueconstraint/1",
        "title": "Crear restricciones de negocio",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"tarifas\",m,Column(\"zona\",String),Column(\"producto\",String),Column(\"precio\",Integer),sa.UniqueConstraint(\"zona\",\"producto\",name=\"uq_tarifa\"),sa.CheckConstraint(\"precio >= 0\",name=\"ck_precio\"))\nprint(sorted(c.name for c in t.constraints if c.name))",
        "hint": "Las restricciones compuestas se declaran sobre Table.",
        "textOutput": "['ck_precio', 'uq_tarifa']",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/default-server-default-y-onupdate",
    "remember": "El default no reemplaza un NULL enviado explícitamente.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/default-server-default-y-onupdate/1",
        "title": "Insertar usando valores por defecto",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"lotes\",m,Column(\"id\",Integer,primary_key=True),Column(\"estado\",String,default=\"nuevo\"),Column(\"origen\",String,server_default=\"web\"))\nm.create_all(engine)\nwith engine.begin() as conn:\n    conn.execute(insert(t).values(id=1))\nver(select(t))",
        "hint": "El default no reemplaza un NULL enviado explícitamente.",
        "textOutput": "('id', 'estado', 'origen')\n[(1, 'nuevo', 'web')]",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/identity-sequence-y-autoincrement",
    "remember": "Identity y Sequence no se comportan igual en todos los motores.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/identity-sequence-y-autoincrement/1",
        "title": "Generar una clave automáticamente",
        "language": "python",
        "code": "with engine.begin() as conn:\n    r=conn.execute(insert(clientes).values(nombre=\"Sol\",alta=date(2026,1,9)))\n    print(tuple(r.inserted_primary_key))",
        "hint": "Identity y Sequence no se comportan igual en todos los motores.",
        "textOutput": "(6,)",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/computed",
    "remember": "No envíes un valor propio para una columna generada.",
    "note": "Requiere SQLite 3.31+ para columnas generadas; verifica la sintaxis en otros motores.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/computed/1",
        "title": "Calcular un importe en la base",
        "language": "python",
        "code": "m=MetaData()\nt=Table(\"lineas_demo\",m,Column(\"cantidad\",Integer),Column(\"precio\",Integer),Column(\"total\",Integer,sa.Computed(\"cantidad * precio\")))\nm.create_all(engine)\nwith engine.begin() as conn:\n    conn.execute(insert(t).values(cantidad=3,precio=20))\nvalor(select(t.c.total))",
        "hint": "No envíes un valor propio para una columna generada.",
        "textOutput": "60",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/restricciones/index-e-indices-compuestos",
    "remember": "El orden de columnas influye en qué filtros puede aprovechar el motor.",
    "examples": [
      {
        "id": "sqlalchemy/restricciones/index-e-indices-compuestos/1",
        "title": "Crear e inspeccionar un índice",
        "language": "python",
        "code": "idx=sa.Index(\"ix_pedidos_cliente_fecha\",pedidos.c.cliente_id,pedidos.c.fecha)\nidx.create(engine)\nprint([(i[\"name\"],i[\"column_names\"]) for i in inspect(engine).get_indexes(\"pedidos\")])\nidx.drop(engine)",
        "hint": "El orden de columnas influye en qué filtros puede aprovechar el motor.",
        "textOutput": "[('ix_pedidos_cliente_fecha', ['cliente_id', 'fecha'])]",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
