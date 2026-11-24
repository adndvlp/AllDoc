// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/tipado-estatico/definicion",
    "remember": "Las anotaciones no validan datos en tiempo de ejecución por sí solas.",
    "examples": [
      {
        "id": "psycopg/tipado-estatico/definicion/1",
        "title": "Anotar una conexión que devuelve tuplas",
        "language": "python",
        "code": "from psycopg import Connection\nfrom typing import Any\ndef total(c: Connection[tuple[Any, ...]]) -> int:\n    fila = c.execute(\"SELECT COUNT(*) FROM pedidos\").fetchone()\n    assert fila is not None\n    return int(fila[0])\nprint(total(conn))",
        "hint": "Las anotaciones no validan datos en tiempo de ejecución por sí solas.",
        "textOutput": "`5`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/tipado-estatico/fetchone-y-optional",
    "remember": "Comprobar None antes de indexar.",
    "examples": [
      {
        "id": "psycopg/tipado-estatico/fetchone-y-optional/1",
        "title": "Buscar un cliente posiblemente ausente",
        "language": "python",
        "code": "def nombre_por_id(id: int) -> str | None:\n    fila = conn.execute(\"SELECT nombre FROM clientes WHERE id=%s\", (id,)).fetchone()\n    return None if fila is None else fila[0]\nprint(nombre_por_id(1), nombre_por_id(999))",
        "hint": "Comprobar None antes de indexar.",
        "textOutput": "`Ana None`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/tipado-estatico/tipado-de-row-factories",
    "remember": "Usar class_row si se desea una clase de dominio con atributos tipados.",
    "note": "Con Pydantic, una clase BaseModel compatible también puede realizar validación de sus campos; necesita la dependencia adicional.",
    "examples": [
      {
        "id": "psycopg/tipado-estatico/tipado-de-row-factories/1",
        "title": "Recuperar un objeto tipado",
        "language": "python",
        "code": "from dataclasses import dataclass\nfrom psycopg.rows import class_row\n@dataclass\nclass Cliente:\n    id: int\n    nombre: str\nwith conn.cursor(row_factory=class_row(Cliente)) as c:\n    cliente = c.execute(\"SELECT id,nombre FROM clientes WHERE id=1\").fetchone()\n    if cliente is not None:\n        print(cliente.nombre)",
        "hint": "Usar class_row si se desea una clase de dominio con atributos tipados.",
        "textOutput": "`Ana`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/tipado-estatico/genericos-de-pools-y-protocolos",
    "remember": "Importar tipos de la API pública y no depender de atributos privados.",
    "note": "Los protocolos como AdaptContext y los tipos de fila son relevantes al desarrollar extensiones; no se necesitan para una consulta ordinaria.",
    "examples": [
      {
        "id": "psycopg/tipado-estatico/genericos-de-pools-y-protocolos/1",
        "title": "Usar Query como anotación de una consulta",
        "language": "python",
        "code": "from psycopg.abc import Query\nfrom psycopg import sql\ndef leer(q: Query):\n    return conn.execute(q).fetchall()\nprint(leer(sql.SQL(\"SELECT 1\")))",
        "hint": "Importar tipos de la API pública y no depender de atributos privados.",
        "textOutput": "`[(1,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
