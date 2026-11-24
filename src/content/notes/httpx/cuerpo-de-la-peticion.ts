// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/definicion",
    "remember": "Elige la opción según el formato exigido por la API.",
    "examples": [
      {
        "id": "httpx/cuerpo-de-la-peticion/definicion/1",
        "title": "Enviar un objeto JSON",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", json={\"importe\": 100})\n    print(json.loads(r.json()[\"body\"]))",
        "hint": "Elige la opción según el formato exigido por la API.",
        "textOutput": "`{'importe': 100}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/json",
    "remember": "Usa `json=`, no `data=` para un objeto JSON.",
    "examples": [
      {
        "id": "httpx/cuerpo-de-la-peticion/json/1",
        "title": "Enviar una lista de IDs",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", json={\"ids\": [1, 3]})\n    print(json.loads(r.json()[\"body\"]))",
        "hint": "Usa `json=`, no `data=` para un objeto JSON.",
        "textOutput": "`{'ids': [1, 3]}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/data",
    "remember": "No es lo mismo que JSON.",
    "examples": [
      {
        "id": "httpx/cuerpo-de-la-peticion/data/1",
        "title": "Enviar campos de formulario",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", data={\"cliente\": \"Ana\", \"importe\": \"800\"})\n    print(r.json()[\"body\"])",
        "hint": "No es lo mismo que JSON.",
        "textOutput": "`cliente=Ana&importe=800`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/content",
    "remember": "Indica el Content-Type si el servidor lo requiere.",
    "examples": [
      {
        "id": "httpx/cuerpo-de-la-peticion/content/1",
        "title": "Enviar CSV como cuerpo",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", content=b\"id,importe\\n1,800\", headers={\"Content-Type\": \"text/csv\"})\n    print(r.json()[\"content_type\"])",
        "hint": "Indica el Content-Type si el servidor lo requiere.",
        "textOutput": "`text/csv`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cuerpo-de-la-peticion/files-y-multipart",
    "remember": "Deja que HTTPX genere el boundary de multipart.",
    "examples": [
      {
        "id": "httpx/cuerpo-de-la-peticion/files-y-multipart/1",
        "title": "Adjuntar un CSV pequeño",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/echo\", files={\"file\": (\"ventas.csv\", b\"id,importe\\n1,800\", \"text/csv\")}, data={\"tipo\": \"ventas\"})\n    print(r.json()[\"content_type\"].startswith(\"multipart/form-data\"))\n    print(\"ventas.csv\" in r.json()[\"body\"])",
        "hint": "Deja que HTTPX genere el boundary de multipart.",
        "textOutput": "`True` y `True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
