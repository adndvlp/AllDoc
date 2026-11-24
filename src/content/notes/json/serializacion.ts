// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/serializacion/definicion",
    "remember": "`dumps` devuelve texto; `dump` escribe en un archivo.",
    "examples": [
      {
        "id": "json/serializacion/definicion/1",
        "title": "Convertir un registro",
        "language": "python",
        "code": "s = json.dumps({\"id\": 101, \"pagado\": True})\nprint(s)",
        "hint": "El booleano se escribe con sintaxis JSON.",
        "textOutput": "`{\"id\": 101, \"pagado\": true}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/serializacion/dumps",
    "remember": "Guarda el retorno si necesitas reutilizarlo.",
    "examples": [
      {
        "id": "json/serializacion/dumps/1",
        "title": "Generar texto de un resumen",
        "language": "python",
        "code": "s = json.dumps(resumen[0])\nprint(type(s).__name__, s)",
        "hint": "El resumen tiene dos campos.",
        "textOutput": "`str {\"id\": 101, \"monto\": 120.5}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/serializacion/dump",
    "remember": "Usa un archivo de texto, no modo `wb`.",
    "examples": [
      {
        "id": "json/serializacion/dump/1",
        "title": "Exportar un resumen",
        "language": "python",
        "code": "destino = carpeta / \"resumen.json\"\nwith open(destino, \"w\", encoding=\"utf-8\") as f:\n    json.dump(resumen, f)\nprint(len(json.loads(destino.read_text(encoding=\"utf-8\"))))",
        "hint": "Se puede leer el archivo que se acaba de escribir.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/serializacion/round-trip",
    "remember": "Compara datos y tipos cuando sean importantes.",
    "examples": [
      {
        "id": "json/serializacion/round-trip/1",
        "title": "Comprobar un registro",
        "language": "python",
        "code": "p = {\"id\": 101, \"pagado\": True, \"monto\": 120.5}\nprint(json.loads(json.dumps(p)) == p)",
        "hint": "Estos tipos son compatibles en ambos sentidos.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
