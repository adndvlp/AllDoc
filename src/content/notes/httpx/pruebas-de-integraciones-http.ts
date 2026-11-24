// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/definicion",
    "remember": "Prueba casos exitosos, fallos y respuestas incompletas.",
    "examples": [
      {
        "id": "httpx/pruebas-de-integraciones-http/definicion/1",
        "title": "Comprobar una extracción",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/pedidos/1\").raise_for_status()\n    assert r.json()[\"importe\"] == 800\nprint(\"OK\")",
        "hint": "Prueba casos exitosos, fallos y respuestas incompletas.",
        "textOutput": "`OK`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/mocktransport",
    "remember": "No simula automáticamente toda la semántica de red.",
    "examples": [
      {
        "id": "httpx/pruebas-de-integraciones-http/mocktransport/1",
        "title": "Simular un error de servidor",
        "language": "python",
        "code": "def responder(req):\n    assert req.method == \"GET\"\n    return httpx.Response(503, json={\"error\": \"temporal\"})\nwith httpx.Client(transport=httpx.MockTransport(responder)) as c:\n    print(c.get(BASE).status_code)",
        "hint": "No simula automáticamente toda la semántica de red.",
        "textOutput": "`503`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/respx",
    "remember": "Instala una versión compatible de `respx`.",
    "note": "Requiere `python -m pip install respx`.",
    "examples": [
      {
        "id": "httpx/pruebas-de-integraciones-http/respx/1",
        "title": "Simular una ruta con RESPX",
        "language": "python",
        "code": "import respx\nwith respx.mock:\n    ruta = respx.get(BASE + \"/pedidos/1\").mock(return_value=httpx.Response(200, json={\"id\": 1}))\n    print(httpx.get(BASE + \"/pedidos/1\").json(), ruta.called)",
        "hint": "Instala una versión compatible de `respx`. Instala RESPX en tu entorno Python local.",
        "textOutput": "`{'id': 1} True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/pruebas-de-integraciones-http/pytest-httpx",
    "remember": "Instala versiones compatibles y ejecuta la prueba con pytest.",
    "note": "Requiere `pytest` y `pytest-httpx`, guardar el ejemplo como `test_pedido.py` con `import httpx` al inicio.",
    "examples": [
      {
        "id": "httpx/pruebas-de-integraciones-http/pytest-httpx/1",
        "title": "Probar una consulta aislada",
        "language": "python",
        "code": "def test_pedido(httpx_mock):\n    httpx_mock.add_response(url=\"https://ventas.example/pedidos/1\", json={\"id\": 1})\n    r = httpx.get(\"https://ventas.example/pedidos/1\")\n    assert r.json()[\"id\"] == 1",
        "hint": "Instala versiones compatibles y ejecuta la prueba con pytest. Ejecuta el archivo de prueba con pytest y pytest-httpx en Python local.",
        "textOutput": "Una prueba aprobada al ejecutar `pytest` sobre el archivo de prueba.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
