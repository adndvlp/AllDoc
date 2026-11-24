// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/definicion",
    "remember": "No registres cuerpos o credenciales sin necesidad.",
    "examples": [
      {
        "id": "httpx/event-hooks-y-diagnostico/definicion/1",
        "title": "Registrar estados de respuesta",
        "language": "python",
        "code": "def registrar(r):\n    print(r.status_code)\nwith demo(event_hooks={\"response\": [registrar]}) as c:\n    c.get(\"/pedidos/1\")",
        "hint": "No registres cuerpos o credenciales sin necesidad.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hook-request",
    "remember": "Evita exponer información sensible en trazas.",
    "examples": [
      {
        "id": "httpx/event-hooks-y-diagnostico/hook-request/1",
        "title": "Agregar un encabezado de identificación",
        "language": "python",
        "code": "def preparar(req):\n    req.headers[\"X-App\"] = \"analisis\"\nwith demo(event_hooks={\"request\": [preparar]}) as c:\n    print(c.get(\"/echo\").request.headers[\"X-App\"])",
        "hint": "Evita exponer información sensible en trazas.",
        "textOutput": "`analisis`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hook-response",
    "remember": "Si necesitas el cuerpo en el hook llama a read o aread según el cliente.",
    "examples": [
      {
        "id": "httpx/event-hooks-y-diagnostico/hook-response/1",
        "title": "Validar todas las respuestas",
        "language": "python",
        "code": "def validar(r):\n    r.raise_for_status()\nwith demo(event_hooks={\"response\": [validar]}) as c:\n    try:\n        c.get(\"/status/404\")\n    except httpx.HTTPStatusError:\n        print(\"error detectado\")",
        "hint": "Si necesitas el cuerpo en el hook llama a read o aread según el cliente.",
        "textOutput": "`error detectado`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/hooks-asincronos",
    "remember": "Usa await r.aread() si el hook necesita cargar el cuerpo.",
    "examples": [
      {
        "id": "httpx/event-hooks-y-diagnostico/hooks-asincronos/1",
        "title": "Registrar un estado asíncronamente",
        "language": "python",
        "code": "async def registrar(r):\n    print(r.status_code)\nasync def main():\n    async with demo_async(event_hooks={\"response\": [registrar]}) as c:\n        await c.get(\"/pedidos/1\")\nasyncio.run(main())",
        "hint": "Usa await r.aread() si el hook necesita cargar el cuerpo.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado",
        "practiceCode": "async def registrar(r):\n    print(r.status_code)\nasync def main():\n    async with demo_async(event_hooks={\"response\": [registrar]}) as c:\n        await c.get(\"/pedidos/1\")\nawait main()"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/event-hooks-y-diagnostico/logging-y-monitoreo",
    "remember": "Registra rutas sin query sensible y evita Authorization, cookies y tokens.",
    "examples": [
      {
        "id": "httpx/event-hooks-y-diagnostico/logging-y-monitoreo/1",
        "title": "Registrar un error con contexto limitado",
        "language": "python",
        "code": "import logging, sys\nlogger = logging.getLogger(\"extraccion\")\nlogger.handlers.clear()\nlogger.addHandler(logging.StreamHandler(sys.stdout))\nlogger.setLevel(logging.WARNING)\nlogger.propagate = False\nwith demo() as c:\n    try:\n        c.get(\"/status/503\").raise_for_status()\n    except httpx.HTTPStatusError as e:\n        logger.warning(\"estado=%s ruta=%s\", e.response.status_code, e.request.url.path)",
        "hint": "Registra rutas sin query sensible y evita Authorization, cookies y tokens.",
        "textOutput": "Registro de advertencia con `estado=503 ruta=/status/503`; formato depende de logging.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
