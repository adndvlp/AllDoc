// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/compatibilidad-con-requests/definicion",
    "remember": "No reemplaces el import sin revisar el comportamiento.",
    "examples": [
      {
        "id": "httpx/compatibilidad-con-requests/definicion/1",
        "title": "Migrar una consulta con parámetros",
        "language": "python",
        "code": "with demo() as c:\n    print(c.get(\"/pedidos\", params={\"limit\": 1}).json()[\"items\"][0][\"id\"])",
        "hint": "No reemplaces el import sin revisar el comportamiento.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/compatibilidad-con-requests/diferencias-de-configuracion",
    "remember": "En HTTPX 0.28 se eliminó `proxies`; usa `proxy` o `mounts`.",
    "examples": [
      {
        "id": "httpx/compatibilidad-con-requests/diferencias-de-configuracion/1",
        "title": "Configurar comportamiento explícito",
        "language": "python",
        "code": "with demo(follow_redirects=True, timeout=10) as c:\n    print(c.get(\"/redirect\").status_code)",
        "hint": "En HTTPX 0.28 se eliminó `proxies`; usa `proxy` o `mounts`.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/compatibilidad-con-requests/diferencias-de-excepciones-y-sesiones",
    "remember": "Revisa los bloques except durante una migración.",
    "examples": [
      {
        "id": "httpx/compatibilidad-con-requests/diferencias-de-excepciones-y-sesiones/1",
        "title": "Manejar una respuesta no exitosa",
        "language": "python",
        "code": "with demo() as c:\n    try:\n        c.get(\"/status/404\").raise_for_status()\n    except httpx.HTTPError:\n        print(\"error HTTP\")",
        "hint": "Revisa los bloques except durante una migración.",
        "textOutput": "`error HTTP`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
