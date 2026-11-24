// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/definicion",
    "remember": "El significado específico depende del código y de la API.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/definicion/1",
        "title": "Clasificar un resultado",
        "language": "python",
        "code": "r = requests.get(BASE + \"/orders/101\", timeout=5)\nprint(r.status_code // 100)",
        "hint": "El significado específico depende del código y de la API.",
        "textOutput": "2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/exito",
    "remember": "No llames json() sobre un 204 vacío.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/exito/1",
        "title": "Comprobar una respuesta sin contenido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/status/204\", timeout=5)\nprint(r.status_code, r.content == b\"\")",
        "hint": "No llames json() sobre un 204 vacío.",
        "textOutput": "204 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/errores-cliente",
    "remember": "Corrige la causa antes de reintentar un error de cliente.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/errores-cliente/1",
        "title": "Distinguir acceso de ausencia",
        "language": "python",
        "code": "for code in (401, 403, 404):\n    r = requests.get(f\"{BASE}/status/{code}\", timeout=5)\n    print(r.status_code, r.ok)",
        "hint": "Corrige la causa antes de reintentar un error de cliente.",
        "textOutput": "401 False; 403 False; 404 False (una línea cada uno).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/rate-limit-status",
    "remember": "No reintentes inmediatamente de forma ilimitada.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/rate-limit-status/1",
        "title": "Leer espera indicada",
        "language": "python",
        "code": "r = requests.get(BASE + \"/status/429\", timeout=5)\nprint(r.status_code, r.headers.get(\"Retry-After\"))",
        "hint": "No reintentes inmediatamente de forma ilimitada.",
        "textOutput": "429 0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/errores-servidor",
    "remember": "Solo algunos fallos son transitorios.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/errores-servidor/1",
        "title": "Detectar un fallo de servidor",
        "language": "python",
        "code": "r = requests.get(BASE + \"/status/503\", timeout=5)\nprint(r.status_code, r.ok)",
        "hint": "Solo algunos fallos son transitorios.",
        "textOutput": "503 False.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/redirecciones",
    "remember": "Requests sigue redirecciones por defecto excepto HEAD.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/redirecciones/1",
        "title": "Seguir una redirección",
        "language": "python",
        "code": "r = requests.get(BASE + \"/redirect\", timeout=5)\nprint(r.status_code, r.url.endswith(\"/orders/101\"))",
        "hint": "Requests sigue redirecciones por defecto excepto HEAD.",
        "textOutput": "200 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/control-redirecciones",
    "remember": "El 302 inicial y el 200 final son respuestas distintas.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/control-redirecciones/1",
        "title": "Comparar redirección y destino",
        "language": "python",
        "code": "a = requests.get(BASE + \"/redirect\", allow_redirects=False, timeout=5)\nb = requests.get(BASE + \"/redirect\", timeout=5)\nprint(a.is_redirect, a.is_permanent_redirect, [x.status_code for x in b.history])",
        "hint": "El 302 inicial y el 200 final son respuestas distintas.",
        "textOutput": "True False [302].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/estados-y-redirecciones/not-modified",
    "remember": "Un 304 no trae la representación nueva.",
    "examples": [
      {
        "id": "requests/estados-y-redirecciones/not-modified/1",
        "title": "Consultar si cambió un recurso",
        "language": "python",
        "code": "r = requests.get(BASE + \"/versioned\", headers={\"If-None-Match\": '\"v1\"'}, timeout=5)\nprint(r.status_code, len(r.content))",
        "hint": "Un 304 no trae la representación nueva.",
        "textOutput": "304 0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
