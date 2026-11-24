// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/otros-tipos-api/definicion",
    "remember": "La biblioteca no interpreta automáticamente cada protocolo de aplicación.",
    "examples": [
      {
        "id": "requests/otros-tipos-api/definicion/1",
        "title": "Preparar una consulta REST",
        "language": "python",
        "code": "p = requests.Request(\"GET\", BASE + \"/orders/101\").prepare()\nprint(p.method, p.path_url)",
        "hint": "La biblioteca no interpreta automáticamente cada protocolo de aplicación.",
        "textOutput": "GET /orders/101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/otros-tipos-api/openapi-versionado",
    "remember": "Consulta la versión y los campos documentados, no deduzcas el contrato.",
    "examples": [
      {
        "id": "requests/otros-tipos-api/openapi-versionado/1",
        "title": "Preparar una ruta versionada hipotética",
        "language": "python",
        "code": "p = requests.Request(\"GET\", \"https://example.com/v1/orders\", params={\"limit\": 2}).prepare()\nprint(p.path_url)",
        "hint": "Consulta la versión y los campos documentados, no deduzcas el contrato.",
        "textOutput": "/v1/orders?limit=2; no se envía tráfico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/otros-tipos-api/graphql",
    "remember": "Verifica también el campo errors de la respuesta.",
    "note": "Necesita un endpoint GraphQL real con ese esquema para ejecutarse.",
    "examples": [
      {
        "id": "requests/otros-tipos-api/graphql/1",
        "title": "Preparar una consulta GraphQL hipotética",
        "language": "python",
        "code": "p = requests.Request(\"POST\", \"https://example.com/graphql\", json={\"query\": \"query ($id: ID!) { order(id: $id) { amount } }\", \"variables\": {\"id\": \"101\"}}).prepare()\nprint(p.headers[\"Content-Type\"])",
        "hint": "Verifica también el campo errors de la respuesta.",
        "textOutput": "application/json; solo se prepara el cuerpo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/otros-tipos-api/soap-xml",
    "remember": "La versión SOAP determina encabezados y formato.",
    "examples": [
      {
        "id": "requests/otros-tipos-api/soap-xml/1",
        "title": "Preparar una envoltura SOAP 1.2",
        "language": "python",
        "code": "body = b'<env:Envelope xmlns:env=\"http://www.w3.org/2003/05/soap-envelope\"><env:Body/></env:Envelope>'\np = requests.Request(\"POST\", \"https://example.com/soap\", data=body, headers={\"Content-Type\": \"application/soap+xml\"}).prepare()\nprint(p.headers[\"Content-Type\"])",
        "hint": "La versión SOAP determina encabezados y formato.",
        "textOutput": "application/soap+xml; no se invoca una operación real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/otros-tipos-api/webhooks",
    "remember": "El receptor debe validar firmas y protegerse de reenvíos.",
    "examples": [
      {
        "id": "requests/otros-tipos-api/webhooks/1",
        "title": "Enviar un evento a un receptor simulado",
        "language": "python",
        "code": "r = requests.post(BASE + \"/echo\", json={\"event\": \"order.completed\", \"id\": 101}, timeout=5)\nprint(r.json()[\"body\"][\"event\"])",
        "hint": "El receptor debe validar firmas y protegerse de reenvíos.",
        "textOutput": "order.completed; el receptor demo devuelve el evento, no valida firmas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
