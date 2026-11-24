// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/definicion",
    "remember": "El formato debe coincidir con el contrato del servidor.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/definicion/1",
        "title": "Enviar JSON",
        "language": "python",
        "code": "r = requests.post(BASE + \"/orders\", json={\"amount\": 500}, timeout=5)\nprint(r.json()[\"body\"])",
        "hint": "El formato debe coincidir con el contrato del servidor.",
        "textOutput": "{'amount': 500}.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/headers",
    "remember": "No incluyas secretos en encabezados de depuración.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/headers/1",
        "title": "Identificar la aplicación",
        "language": "python",
        "code": "r = requests.get(BASE + \"/echo\", headers={\"X-Client\": \"analyst\"}, timeout=5)\nprint(r.json()[\"headers\"][\"X-Client\"])",
        "hint": "No incluyas secretos en encabezados de depuración.",
        "textOutput": "analyst.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/accept-content-type",
    "remember": "Accept no obliga al servidor a devolver el formato.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/accept-content-type/1",
        "title": "Pedir y enviar JSON",
        "language": "python",
        "code": "r = requests.post(BASE + \"/orders\", headers={\"Accept\": \"application/json\"}, json={\"amount\": 500}, timeout=5)\nprint(r.request.headers[\"Accept\"], r.request.headers[\"Content-Type\"])",
        "hint": "Accept no obliga al servidor a devolver el formato.",
        "textOutput": "application/json application/json.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/user-agent-accept-encoding",
    "remember": "No suplantes clientes para eludir restricciones.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/user-agent-accept-encoding/1",
        "title": "Identificar el cliente de análisis",
        "language": "python",
        "code": "r = requests.get(BASE + \"/echo\", headers={\"User-Agent\": \"AnalystDemo/1.0\"}, timeout=5)\nprint(r.request.headers[\"User-Agent\"], \"Accept-Encoding\" in r.request.headers)",
        "hint": "No suplantes clientes para eludir restricciones.",
        "textOutput": "AnalystDemo/1.0 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/json",
    "remember": "Usa json= para objetos JSON, no data= con un diccionario.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/json/1",
        "title": "Enviar importe y estado",
        "language": "python",
        "code": "r = requests.post(BASE + \"/orders\", json={\"amount\": 500, \"status\": \"completed\"}, timeout=5)\nprint(r.json()[\"body\"][\"amount\"])",
        "hint": "Usa json= para objetos JSON, no data= con un diccionario.",
        "textOutput": "500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/data-form",
    "remember": "No es lo mismo que JSON.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/data-form/1",
        "title": "Enviar un formulario",
        "language": "python",
        "code": "r = requests.post(BASE + \"/echo\", data={\"country\": \"MX\", \"amount\": 500}, timeout=5)\nprint(r.json()[\"body\"])",
        "hint": "No es lo mismo que JSON.",
        "textOutput": "country=MX&amount=500.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/data-raw",
    "remember": "No mezcles json con data o files en la misma petición.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/data-raw/1",
        "title": "Enviar XML como bytes",
        "language": "python",
        "code": "r = requests.post(BASE + \"/echo\", data=b\"<order>101</order>\", headers={\"Content-Type\": \"application/xml\"}, timeout=5)\nprint(r.json()[\"body\"])",
        "hint": "No mezcles json con data o files en la misma petición.",
        "textOutput": "<order>101</order>.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/encabezados-y-body/files",
    "remember": "Deja que Requests genere Content-Type con su boundary.",
    "examples": [
      {
        "id": "requests/encabezados-y-body/files/1",
        "title": "Enviar un CSV y un campo",
        "language": "python",
        "code": "r = requests.post(BASE + \"/echo\", files={\"file\": (\"orders.csv\", b\"id,amount\\n101,800\\n\", \"text/csv\")}, data={\"source\": \"demo\"}, timeout=5)\nprint(r.json()[\"content_type\"].startswith(\"multipart/form-data\"))",
        "hint": "Deja que Requests genere Content-Type con su boundary.",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
