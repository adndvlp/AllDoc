// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/definicion",
    "remember": "El marcador va en el SQL; el valor va en el segundo argumento.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/definicion/1",
        "title": "Consultar pedidos de un cliente",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM pedidos WHERE cliente_id = %s ORDER BY id\", (1,))\nprint(cur.fetchall())",
        "hint": "El marcador va en el SQL; el valor va en el segundo argumento.",
        "textOutput": "`[(101,), (102,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/parametros-posicionales",
    "remember": "Usa `%s` para números, texto y fechas; no `%d`.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/parametros-posicionales/1",
        "title": "Filtrar por cliente y estado",
        "language": "python",
        "code": "cur.execute(\"SELECT id FROM pedidos WHERE cliente_id=%s AND estado=%s ORDER BY id\", (2, \"completed\"))\nprint(cur.fetchall())",
        "hint": "Usa `%s` para números, texto y fechas; no `%d`.",
        "textOutput": "`[(103,), (105,)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/un-solo-parametro",
    "remember": "`(1,)` es una tupla; `(1)` es un entero.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/un-solo-parametro/1",
        "title": "Consultar un nombre",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes WHERE id=%s\", (1,))\nprint(cur.fetchone())",
        "hint": "`(1,)` es una tupla; `(1)` es un entero.",
        "textOutput": "`('Ana',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/parametros-nombrados",
    "remember": "El nombre del marcador coincide con la clave del diccionario.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/parametros-nombrados/1",
        "title": "Reutilizar un país",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes WHERE pais=%(pais)s ORDER BY id\", {\"pais\": \"México\"})\nprint(cur.fetchall())",
        "hint": "El nombre del marcador coincide con la clave del diccionario.",
        "textOutput": "`[('Ana',), ('Luis',)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/formatos-s-b-y-t",
    "remember": "No confundir formato del parámetro con formato del resultado.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/formatos-s-b-y-t/1",
        "title": "Enviar un entero en formato binario",
        "language": "python",
        "code": "cur.execute(\"SELECT %b::integer\", (42,))\nprint(cur.fetchone())",
        "hint": "No confundir formato del parámetro con formato del resultado.",
        "textOutput": "`(42,)` si el adaptador binario está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/comillas-y-porcentaje-literal",
    "remember": "Las comillas de valores son responsabilidad del controlador.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/comillas-y-porcentaje-literal/1",
        "title": "Calcular un resto",
        "language": "python",
        "code": "cur.execute(\"SELECT %s %% 3\", (10,))\nprint(cur.fetchone())",
        "hint": "Las comillas de valores son responsabilidad del controlador.",
        "textOutput": "`(1,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/sql-injection",
    "remember": "No usar f-strings, `%` ni concatenación para valores no confiables.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/sql-injection/1",
        "title": "Buscar un texto que contiene comillas",
        "language": "python",
        "code": "nombre = \"O'Connor\"\ncur.execute(\"SELECT %s::text\", (nombre,))\nprint(cur.fetchone())",
        "hint": "No usar f-strings, `%` ni concatenación para valores no confiables.",
        "textOutput": "`(\"O'Connor\",)`; la comilla no cambia la sintaxis.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/any-con-listas",
    "remember": "Para una lista variable, usar ANY en vez de `IN %s`.",
    "note": "Una lista vacía funciona con el tipo determinado por la comparación; `IN ()` no es sintaxis válida.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/any-con-listas/1",
        "title": "Consultar dos IDs",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes WHERE id = ANY(%s) ORDER BY id\", ([1, 3],))\nprint(cur.fetchall())",
        "hint": "Para una lista variable, usar ANY en vez de `IN %s`.",
        "textOutput": "`[('Ana',), ('Marta',)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/null-como-parametro",
    "remember": "`= NULL` no devuelve verdadero; `IS %s` no es una forma válida de parametrizar `IS NULL`.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/null-como-parametro/1",
        "title": "Encontrar un país ausente",
        "language": "python",
        "code": "cur.execute(\"SELECT nombre FROM clientes WHERE pais IS NOT DISTINCT FROM %s\", (None,))\nprint(cur.fetchall())",
        "hint": "`= NULL` no devuelve verdadero; `IS %s` no es una forma válida de parametrizar `IS NULL`.",
        "textOutput": "`[('Diego',)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/parametros-y-seguridad-de-consultas/template-strings-t-strings",
    "remember": "Una t-string no es una f-string: conserva las interpolaciones para el adaptador.",
    "note": "Requiere Python 3.14+; en versiones anteriores usar `%s`.",
    "examples": [
      {
        "id": "psycopg/parametros-y-seguridad-de-consultas/template-strings-t-strings/1",
        "title": "Vincular un ID mediante plantilla",
        "language": "python",
        "code": "cliente_id = 1\ncur.execute(t\"SELECT nombre FROM clientes WHERE id = {cliente_id}\")\nprint(cur.fetchone())",
        "hint": "Una t-string no es una f-string: conserva las interpolaciones para el adaptador.",
        "textOutput": "`('Ana',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
