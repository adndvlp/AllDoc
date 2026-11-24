// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/transportes/definicion",
    "remember": "El cliente define la interfaz de alto nivel; el transporte ejecuta la comunicación.",
    "examples": [
      {
        "id": "httpx/transportes/definicion/1",
        "title": "Crear un transporte simulado",
        "language": "python",
        "code": "with httpx.Client(transport=httpx.MockTransport(handler)) as c:\n    print(c.get(BASE + \"/pedidos/1\").status_code)",
        "hint": "El cliente define la interfaz de alto nivel; el transporte ejecuta la comunicación.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/transportes/httptransport-y-asynchttptransport",
    "remember": "Configura verify, límites y proxy en el transporte si lo construyes explícitamente.",
    "examples": [
      {
        "id": "httpx/transportes/httptransport-y-asynchttptransport/1",
        "title": "Crear un transporte asíncrono real",
        "language": "python",
        "code": "async def main():\n    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=1)) as c:\n        print(c.is_closed)\nasyncio.run(main())",
        "hint": "Configura verify, límites y proxy en el transporte si lo construyes explícitamente.",
        "textOutput": "`False`; no se establece una conexión.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def main():\n    async with httpx.AsyncClient(transport=httpx.AsyncHTTPTransport(retries=1)) as c:\n        print(c.is_closed)\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/transportes/unix-domain-sockets",
    "remember": "Requiere un servicio HTTP escuchando en ese socket.",
    "examples": [
      {
        "id": "httpx/transportes/unix-domain-sockets/1",
        "title": "Configurar un socket local",
        "language": "python",
        "code": "with httpx.Client(transport=httpx.HTTPTransport(uds=\"/tmp/ventas.sock\")) as c:\n    print(c.is_closed)",
        "hint": "Requiere un servicio HTTP escuchando en ese socket.",
        "textOutput": "`False`; para hacer una petición debe existir el socket.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/transportes/wsgitransport",
    "remember": "Úsalo para aplicaciones WSGI, no ASGI.",
    "examples": [
      {
        "id": "httpx/transportes/wsgitransport/1",
        "title": "Consultar una aplicación WSGI mínima",
        "language": "python",
        "code": "def app(environ, start_response):\n    start_response(\"200 OK\", [(\"Content-Type\", \"text/plain\")])\n    return [b\"ventas\"]\nwith httpx.Client(transport=httpx.WSGITransport(app=app), base_url=\"http://test\") as c:\n    print(c.get(\"/\").text)",
        "hint": "Úsalo para aplicaciones WSGI, no ASGI.",
        "textOutput": "`ventas`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/transportes/asgitransport",
    "remember": "HTTPX no ejecuta por sí solo los eventos lifespan de ASGI.",
    "examples": [
      {
        "id": "httpx/transportes/asgitransport/1",
        "title": "Consultar una aplicación ASGI mínima",
        "language": "python",
        "code": "async def app(scope, receive, send):\n    await send({\"type\": \"http.response.start\", \"status\": 200, \"headers\": []})\n    await send({\"type\": \"http.response.body\", \"body\": b\"ventas\"})\nasync def main():\n    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url=\"http://test\") as c:\n        print((await c.get(\"/\")).text)\nasyncio.run(main())",
        "hint": "HTTPX no ejecuta por sí solo los eventos lifespan de ASGI.",
        "textOutput": "`ventas`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def app(scope, receive, send):\n    await send({\"type\": \"http.response.start\", \"status\": 200, \"headers\": []})\n    await send({\"type\": \"http.response.body\", \"body\": b\"ventas\"})\nasync def main():\n    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url=\"http://test\") as c:\n        print((await c.get(\"/\")).text)\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/transportes/transportes-personalizados",
    "remember": "Si delegas a otro transporte, implementa su cierre también.",
    "examples": [
      {
        "id": "httpx/transportes/transportes-personalizados/1",
        "title": "Devolver una respuesta fija",
        "language": "python",
        "code": "class Fijo(httpx.BaseTransport):\n    def handle_request(self, request):\n        return httpx.Response(200, json={\"ok\": True})\nwith httpx.Client(transport=Fijo()) as c:\n    print(c.get(BASE).json())",
        "hint": "Si delegas a otro transporte, implementa su cierre también.",
        "textOutput": "`{'ok': True}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
