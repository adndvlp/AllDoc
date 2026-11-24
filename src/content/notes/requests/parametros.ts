// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/parametros/definicion",
    "remember": "La API define los nombres y valores admitidos.",
    "examples": [
      {
        "id": "requests/parametros/definicion/1",
        "title": "Filtrar pedidos",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"status\": \"completed\", \"limit\": 10}, timeout=5)\nprint(r.json()[\"total\"])",
        "hint": "La API define los nombres y valores admitidos.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/parametros/params",
    "remember": "No confundas params con el body.",
    "examples": [
      {
        "id": "requests/parametros/params/1",
        "title": "Limitar la respuesta a un pedido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders\", params={\"limit\": 1}, timeout=5)\nprint(len(r.json()[\"data\"]))",
        "hint": "No confundas params con el body.",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/parametros/listas-none",
    "remember": "None no se envía como texto null.",
    "examples": [
      {
        "id": "requests/parametros/listas-none/1",
        "title": "Enviar filtros repetidos",
        "language": "python",
        "code": "r = requests.get(BASE + \"/echo\", params={\"status\": [\"completed\", \"cancelled\"], \"unused\": None}, timeout=5)\nprint(r.json()[\"query\"])",
        "hint": "None no se envía como texto null.",
        "textOutput": "{'status': ['completed', 'cancelled']}.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/parametros/url-encoding",
    "remember": "Pasa el texto original en params.",
    "examples": [
      {
        "id": "requests/parametros/url-encoding/1",
        "title": "Enviar una búsqueda con espacios",
        "language": "python",
        "code": "r = requests.get(BASE + \"/echo\", params={\"q\": \"México & ventas\"}, timeout=5)\nprint(r.json()[\"query\"][\"q\"][0])",
        "hint": "Pasa el texto original en params.",
        "textOutput": "México & ventas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
