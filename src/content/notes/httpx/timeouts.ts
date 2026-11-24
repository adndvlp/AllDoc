// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/timeouts/definicion",
    "remember": "Configura tiempos explícitos para extracciones.",
    "examples": [
      {
        "id": "httpx/timeouts/definicion/1",
        "title": "Establecer tiempo de espera",
        "language": "python",
        "code": "with demo(timeout=10) as c:\n    print(c.timeout.read)",
        "hint": "Configura tiempos explícitos para extracciones.",
        "textOutput": "`10`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/timeouts/timeout-por-peticion",
    "remember": "`None` desactiva los timeouts; evita usarlo sin motivo.",
    "examples": [
      {
        "id": "httpx/timeouts/timeout-por-peticion/1",
        "title": "Cambiar tiempo para una petición",
        "language": "python",
        "code": "with demo(timeout=5) as c:\n    r = c.get(\"/pedidos/1\", timeout=20)\n    print(r.request.extensions[\"timeout\"][\"read\"])",
        "hint": "`None` desactiva los timeouts; evita usarlo sin motivo.",
        "textOutput": "`20`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/timeouts/httpx-timeout",
    "remember": "Cada límite controla una fase distinta.",
    "examples": [
      {
        "id": "httpx/timeouts/httpx-timeout/1",
        "title": "Configurar los cuatro límites",
        "language": "python",
        "code": "t = httpx.Timeout(connect=3, read=20, write=10, pool=2)\nprint(t.connect, t.read, t.write, t.pool)",
        "hint": "Cada límite controla una fase distinta.",
        "textOutput": "`3 20 10 2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/timeouts/excepciones-de-timeout",
    "remember": "Atrapa la clase general si no necesitas distinguir fases.",
    "examples": [
      {
        "id": "httpx/timeouts/excepciones-de-timeout/1",
        "title": "Capturar un timeout simulado",
        "language": "python",
        "code": "with demo() as c:\n    try:\n        c.get(\"/timeout\")\n    except httpx.TimeoutException as e:\n        print(type(e).__name__)",
        "hint": "Atrapa la clase general si no necesitas distinguir fases.",
        "textOutput": "`ReadTimeout`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
