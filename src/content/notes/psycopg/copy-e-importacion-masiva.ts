// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/definicion",
    "remember": "COPY FROM STDIN importa; COPY TO STDOUT exporta.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/definicion/1",
        "title": "Copiar dos filas a una tabla temporal",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE carga_copy (id int, nombre text)\")\nwith cur.copy(\"COPY carga_copy FROM STDIN\") as cp:\n    cp.write_row((1,\"Ana\"))\n    cp.write_row((2,\"Luis\"))\nprint(cur.execute(\"SELECT * FROM carga_copy ORDER BY id\").fetchall())",
        "hint": "COPY FROM STDIN importa; COPY TO STDOUT exporta.",
        "textOutput": "`[(1, 'Ana'), (2, 'Luis')]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/write-row",
    "remember": "No concatenar manualmente tabulaciones o comillas para filas Python.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/write-row/1",
        "title": "Importar una fila con NULL",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE carga_filas (id int, nota text)\")\nwith cur.copy(\"COPY carga_filas FROM STDIN\") as cp:\n    cp.write_row((1,None))\nprint(cur.execute(\"SELECT * FROM carga_filas\").fetchall())",
        "hint": "No concatenar manualmente tabulaciones o comillas para filas Python.",
        "textOutput": "`[(1, None)]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/write-y-csv",
    "remember": "Si ya tienes CSV preparado, envíalo por bloques, no por write_row con FORMAT CSV.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/write-y-csv/1",
        "title": "Importar CSV desde memoria",
        "language": "python",
        "code": "from io import StringIO\narchivo = StringIO(\"id,nombre\\n1,Ana\\n2,Luis\\n\")\ncur.execute(\"CREATE TEMP TABLE carga_csv (id int, nombre text)\")\nwith cur.copy(\"COPY carga_csv FROM STDIN WITH (FORMAT CSV, HEADER)\") as cp:\n    while bloque := archivo.read(8192):\n        cp.write(bloque)\nprint(cur.execute(\"SELECT COUNT(*) FROM carga_csv\").fetchone())",
        "hint": "Si ya tienes CSV preparado, envíalo por bloques, no por write_row con FORMAT CSV.",
        "textOutput": "`(2,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-to-y-read",
    "remember": "El bloque puede ser una vista de memoria, no necesariamente bytes.",
    "note": "El ejemplo presupone codificación UTF-8 en la sesión.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/copy-to-y-read/1",
        "title": "Exportar un CSV a memoria",
        "language": "python",
        "code": "with cur.copy(\"COPY (SELECT id, nombre FROM clientes ORDER BY id) TO STDOUT WITH (FORMAT CSV, HEADER)\") as cp:\n    contenido = bytearray()\n    while bloque := cp.read():\n        contenido.extend(bloque)\nprint(contenido.decode(\"utf-8\"))",
        "hint": "El bloque puede ser una vista de memoria, no necesariamente bytes.",
        "textOutput": "Encabezado `id,nombre` y cuatro filas: `1,Ana`, `2,Luis`, `3,Marta`, `4,Diego`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/read-row-rows-y-set-types",
    "remember": "El orden de tipos debe coincidir con el orden de columnas.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/read-row-rows-y-set-types/1",
        "title": "Exportar IDs como enteros y nombres como texto",
        "language": "python",
        "code": "with cur.copy(\"COPY (SELECT id, nombre FROM clientes ORDER BY id) TO STDOUT\") as cp:\n    cp.set_types([\"int4\", \"text\"])\n    print(cp.read_row())\n    print(list(cp.rows()))",
        "hint": "El orden de tipos debe coincidir con el orden de columnas.",
        "textOutput": "`(1, 'Ana')`, luego `[(2, 'Luis'), (3, 'Marta'), (4, 'Diego')]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-binario",
    "remember": "No enviar un entero adaptado a SMALLINT a una columna INTEGER sin ajustar el tipo.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/copy-binario/1",
        "title": "Cargar un entero binario",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE carga_bin (id int4)\")\nwith cur.copy(\"COPY carga_bin FROM STDIN (FORMAT BINARY)\") as cp:\n    cp.set_types([\"int4\"])\n    cp.write_row((7,))\nprint(cur.execute(\"SELECT id FROM carga_bin\").fetchone())",
        "hint": "No enviar un entero adaptado a SMALLINT a una columna INTEGER sin ajustar el tipo.",
        "textOutput": "`(7,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/copy-entre-conexiones",
    "remember": "El esquema, formato y tipos deben ser compatibles; cada conexión tiene su propia transacción.",
    "note": "Para servidores distintos, usar sus DSN y gestionar fallos de ambas sesiones; no existe atomicidad distribuida por defecto.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/copy-entre-conexiones/1",
        "title": "Transferir IDs a una tabla temporal de otra sesión",
        "language": "python",
        "code": "with psycopg.connect(DSN) as origen, psycopg.connect(DSN) as destino:\n    destino.execute(\"CREATE TEMP TABLE traslado (id int)\")\n    with origen.cursor() as a, destino.cursor() as b:\n        with a.copy(\"COPY (SELECT id FROM clientes ORDER BY id) TO STDOUT\") as salida:\n            with b.copy(\"COPY traslado FROM STDIN\") as entrada:\n                for bloque in salida:\n                    entrada.write(bloque)\n        print(b.execute(\"SELECT COUNT(*) FROM traslado\").fetchone())",
        "hint": "El esquema, formato y tipos deben ser compatibles; cada conexión tiene su propia transacción.",
        "textOutput": "`(4,)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/writer-y-filewriter",
    "remember": "Un writer personalizado debe implementar el contrato de escritura y finalización.",
    "note": "`LibpqWriter` envía bloques al servidor; `QueuedLibpqWriter` usa una cola; los writers async tienen variantes asíncronas. La construcción directa de Copy es para casos especiales.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/writer-y-filewriter/1",
        "title": "Generar datos COPY en un archivo en memoria",
        "language": "python",
        "code": "from io import BytesIO\nfrom psycopg import Copy\nfrom psycopg.copy import FileWriter\narchivo = BytesIO()\nwith Copy(cur, writer=FileWriter(archivo)) as cp:\n    cp.write_row((1,\"Ana\"))\nprint(archivo.getvalue())",
        "hint": "Un writer personalizado debe implementar el contrato de escritura y finalización.",
        "textOutput": "`b'1\\tAna\\n'`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/copy-e-importacion-masiva/errores-en-copy",
    "remember": "No continuar enviando filas si la carga falló.",
    "examples": [
      {
        "id": "psycopg/copy-e-importacion-masiva/errores-en-copy/1",
        "title": "Revertir una carga con error",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE carga_error (id int)\")\ntry:\n    with cur.copy(\"COPY carga_error FROM STDIN\") as cp:\n        cp.write_row((\"no es entero\",))\nexcept psycopg.Error as exc:\n    print(type(exc).__name__)\n    conn.rollback()",
        "hint": "No continuar enviando filas si la carga falló.",
        "textOutput": "`InvalidTextRepresentation`; la creación de la tabla y la carga se revierten.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
