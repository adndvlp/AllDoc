// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/definicion",
    "remember": "Usa un cliente para conservar cookies entre peticiones.",
    "examples": [
      {
        "id": "httpx/cookies-y-sesiones-http/definicion/1",
        "title": "Mantener una sesión simulada",
        "language": "python",
        "code": "with demo() as c:\n    c.get(\"/login\")\n    print(c.get(\"/echo\").json()[\"cookie\"])",
        "hint": "Usa un cliente para conservar cookies entre peticiones.",
        "textOutput": "`session=demo`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/cookies-por-peticion-y-por-cliente",
    "remember": "Prefiere configuración del cliente para evitar ambigüedad en sesiones.",
    "examples": [
      {
        "id": "httpx/cookies-y-sesiones-http/cookies-por-peticion-y-por-cliente/1",
        "title": "Inicializar cookies y leer una nueva",
        "language": "python",
        "code": "with demo(cookies={\"region\": \"mx\"}) as c:\n    r = c.get(\"/login\")\n    print(r.cookies.get(\"session\"), c.cookies.get(\"region\"))",
        "hint": "Prefiere configuración del cliente para evitar ambigüedad en sesiones.",
        "textOutput": "`demo mx`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/cookies-y-sesiones-http/httpx-cookies",
    "remember": "Un mismo nombre puede existir para distintos dominios.",
    "examples": [
      {
        "id": "httpx/cookies-y-sesiones-http/httpx-cookies/1",
        "title": "Guardar y borrar una cookie",
        "language": "python",
        "code": "cookies = httpx.Cookies()\ncookies.set(\"region\", \"mx\", domain=\"ventas.example\", path=\"/\")\nprint(cookies.get(\"region\", domain=\"ventas.example\", path=\"/\"))\ncookies.delete(\"region\", domain=\"ventas.example\", path=\"/\")\nprint(len(cookies))",
        "hint": "Un mismo nombre puede existir para distintos dominios.",
        "textOutput": "`mx` y `0`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
