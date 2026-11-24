// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/errores/definicion",
    "remember": "Distingue errores de datos, SQL y conexión.",
    "examples": [
      {
        "id": "sqlalchemy/errores/definicion/1",
        "title": "Detectar una clave primaria repetida",
        "language": "python",
        "code": "try:\n    with engine.begin() as conn:\n        conn.execute(insert(clientes).values(id=1,nombre=\"Duplicado\",alta=date(2026,1,1)))\nexcept sa.exc.IntegrityError:\n    print(\"clave repetida\")",
        "hint": "Distingue errores de datos, SQL y conexión.",
        "textOutput": "clave repetida",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/errores/dbapierror-y-diagnostico",
    "remember": "No publiques params si contienen información sensible.",
    "examples": [
      {
        "id": "sqlalchemy/errores/dbapierror-y-diagnostico/1",
        "title": "Detectar una tabla inexistente",
        "language": "python",
        "code": "try:\n    ver(text(\"SELECT * FROM inexistente\"))\nexcept sa.exc.DBAPIError as e:\n    print(type(e).__name__, type(e.orig).__name__)\n    print(e.statement)",
        "hint": "No publiques params si contienen información sensible.",
        "textOutput": "OperationalError OperationalError\nSELECT * FROM inexistente",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/errores/integrityerror-dataerror-y-programmingerror",
    "remember": "No supongas que todos los motores clasifican el mismo error igual.",
    "examples": [
      {
        "id": "sqlalchemy/errores/integrityerror-dataerror-y-programmingerror/1",
        "title": "Detectar una clave foránea inválida",
        "language": "python",
        "code": "try:\n    with engine.begin() as conn:\n        conn.execute(insert(pedidos).values(cliente_id=99,monto=20,fecha=date(2026,3,1),estado=\"completed\"))\nexcept sa.exc.IntegrityError:\n    print(\"cliente inexistente\")",
        "hint": "No supongas que todos los motores clasifican el mismo error igual.",
        "textOutput": "cliente inexistente",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/errores/operationalerror-timeouterror-y-disconnectionerror",
    "remember": "Reintenta solo fallos transitorios y operaciones seguras; no cualquier excepción.",
    "note": "Ejemplo simulado, no representa una caída real de la base.",
    "examples": [
      {
        "id": "sqlalchemy/errores/operationalerror-timeouterror-y-disconnectionerror/1",
        "title": "Simular un fallo operativo controlado",
        "language": "python",
        "code": "try:\n    raise sa.exc.OperationalError(\"SELECT 1\", {}, Exception(\"demo\"))\nexcept sa.exc.OperationalError as e:\n    print(type(e).__name__)",
        "hint": "Reintenta solo fallos transitorios y operaciones seguras; no cualquier excepción.",
        "textOutput": "OperationalError",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/errores/noresultfound-y-multipleresultsfound",
    "remember": "Utiliza one_or_none() solo cuando cero filas sea válido.",
    "examples": [
      {
        "id": "sqlalchemy/errores/noresultfound-y-multipleresultsfound/1",
        "title": "Comprobar una búsqueda sin resultado",
        "language": "python",
        "code": "try:\n    with engine.connect() as conn:\n        conn.execute(select(clientes.c.nombre).where(clientes.c.id==99)).scalar_one()\nexcept sa.exc.NoResultFound:\n    print(\"no encontrado\")",
        "hint": "Utiliza one_or_none() solo cuando cero filas sea válido.",
        "textOutput": "no encontrado",
        "resultLabel": "Ver resultado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/errores/statementerror-e-invalidrequesterror",
    "remember": "Inspecciona el mensaje y corrige la causa.",
    "examples": [
      {
        "id": "sqlalchemy/errores/statementerror-e-invalidrequesterror/1",
        "title": "Detectar un parámetro no suministrado",
        "language": "python",
        "code": "try:\n    ver(text(\"SELECT :x\"))\nexcept sa.exc.StatementError as e:\n    print(type(e.orig).__name__)",
        "hint": "Inspecciona el mensaje y corrige la causa.",
        "textOutput": "InvalidRequestError",
        "resultLabel": "Ver resultado"
      }
    ]
  }
];
