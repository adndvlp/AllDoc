// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/archivos-y-codificacion/definicion",
    "remember": "Usa `with open(...)` y UTF-8 explícito.",
    "examples": [
      {
        "id": "json/archivos-y-codificacion/definicion/1",
        "title": "Abrir y cerrar automáticamente",
        "language": "python",
        "code": "with open(ruta, encoding=\"utf-8\") as f:\n    datos = json.load(f)\nprint(f.closed, len(datos))",
        "hint": "El contexto administra el recurso.",
        "textOutput": "`True 3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/archivos-y-codificacion/modos",
    "remember": "No uses `a` para añadir documentos a un arreglo JSON existente.",
    "examples": [
      {
        "id": "json/archivos-y-codificacion/modos/1",
        "title": "Reemplazar un archivo de práctica",
        "language": "python",
        "code": "p = carpeta / \"estado.json\"\nwith open(p, \"w\", encoding=\"utf-8\") as f:\n    json.dump({\"estado\": \"nuevo\"}, f)\nwith open(p, \"r\", encoding=\"utf-8\") as f:\n    print(json.load(f))",
        "hint": "`w` reemplaza el contenido anterior si existe.",
        "textOutput": "`{'estado': 'nuevo'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/archivos-y-codificacion/utf-8-y-bom",
    "remember": "`utf-8-sig` elimina un BOM UTF-8 al decodificar.",
    "examples": [
      {
        "id": "json/archivos-y-codificacion/utf-8-y-bom/1",
        "title": "Leer archivo con BOM conocido",
        "language": "python",
        "code": "p = carpeta / \"bom.json\"\np.write_bytes(b\"\\xef\\xbb\\xbf\" + '{\"ciudad\":\"México\"}'.encode(\"utf-8\"))\nwith open(p, encoding=\"utf-8-sig\") as f:\n    print(json.load(f)[\"ciudad\"])",
        "hint": "Se retira la marca inicial antes de parsear.",
        "textOutput": "`México`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/archivos-y-codificacion/modificar-documento",
    "remember": "`dump` no inserta dentro de un arreglo existente.",
    "examples": [
      {
        "id": "json/archivos-y-codificacion/modificar-documento/1",
        "title": "Agregar un pedido a una copia",
        "language": "python",
        "code": "p = carpeta / \"copia.json\"\ndatos = json.loads(texto)\ndatos.append({\"id\": 104})\nwith open(p, \"w\", encoding=\"utf-8\") as f:\n    json.dump(datos, f)\nprint(len(json.loads(p.read_text(encoding=\"utf-8\"))))",
        "hint": "El archivo original no se modifica.",
        "textOutput": "`4`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/archivos-y-codificacion/multiples-dump",
    "remember": "Un documento JSON normal contiene un valor raíz.",
    "examples": [
      {
        "id": "json/archivos-y-codificacion/multiples-dump/1",
        "title": "Detectar dos documentos concatenados",
        "language": "python",
        "code": "from io import StringIO\nf = StringIO()\njson.dump({\"id\": 1}, f)\njson.dump({\"id\": 2}, f)\ntry:\n    json.loads(f.getvalue())\nexcept json.JSONDecodeError as e:\n    print(e.msg)",
        "hint": "Los objetos quedaron juntos sin un arreglo que los contenga.",
        "textOutput": "`Extra data`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
