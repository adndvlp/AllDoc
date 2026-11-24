// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/definicion",
    "remember": "No es un arreglo JSON normal; cada línea se interpreta por separado.",
    "examples": [
      {
        "id": "json/jsonl-y-documentos-grandes/definicion/1",
        "title": "Leer la primera línea",
        "language": "python",
        "code": "with open(ruta_jsonl, encoding=\"utf-8\") as f:\n    print(json.loads(next(f)))",
        "hint": "La primera línea es un documento independiente.",
        "textOutput": "`{'id': 101, 'monto': 120.5}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/lectura-lineas",
    "remember": "Una línea vacía no es un valor JSON válido; define si la rechazas o la omites.",
    "examples": [
      {
        "id": "json/jsonl-y-documentos-grandes/lectura-lineas/1",
        "title": "Sumar montos incrementalmente",
        "language": "python",
        "code": "total = 0\nwith open(ruta_jsonl, encoding=\"utf-8\") as f:\n    for linea in f:\n        total += json.loads(linea)[\"monto\"]\nprint(total)",
        "hint": "Solo se mantiene el acumulador y el registro actual.",
        "textOutput": "`250.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/escritura-jsonl",
    "remember": "Un documento por línea; no uses `indent` en JSONL.",
    "examples": [
      {
        "id": "json/jsonl-y-documentos-grandes/escritura-jsonl/1",
        "title": "Añadir un registro a una copia",
        "language": "python",
        "code": "p = carpeta / \"copia.jsonl\"\np.write_text(ruta_jsonl.read_text(encoding=\"utf-8\"), encoding=\"utf-8\")\nwith open(p, \"a\", encoding=\"utf-8\") as f:\n    f.write(json.dumps({\"id\": 104, \"monto\": 10}) + \"\\n\")\nprint(len(p.read_text(encoding=\"utf-8\").splitlines()))",
        "hint": "El archivo original permanece intacto.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/memoria",
    "remember": "`iterencode` sirve para escribir, no para leer un arreglo incrementalmente.",
    "examples": [
      {
        "id": "json/jsonl-y-documentos-grandes/memoria/1",
        "title": "Crear un iterador de montos",
        "language": "python",
        "code": "with open(ruta_jsonl, encoding=\"utf-8\") as f:\n    montos = (json.loads(linea)[\"monto\"] for linea in f)\n    print(max(montos))",
        "hint": "El generador se consume mientras el archivo sigue abierto.",
        "textOutput": "`120.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/jsonl-y-documentos-grandes/errores-jsonl",
    "remember": "No omitas errores silenciosamente.",
    "examples": [
      {
        "id": "json/jsonl-y-documentos-grandes/errores-jsonl/1",
        "title": "Identificar líneas inválidas",
        "language": "python",
        "code": "from io import StringIO\nf = StringIO('{\"id\":1}\\nno-json\\n{\"id\":3}\\n')\nfor numero, linea in enumerate(f, start=1):\n    try:\n        print(json.loads(linea)[\"id\"])\n    except json.JSONDecodeError:\n        print(f\"Error en línea {numero}\")",
        "hint": "Los registros válidos se procesan y el error se reporta.",
        "textOutput": "`1`, `Error en línea 2`, `3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
