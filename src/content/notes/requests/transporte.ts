// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/transporte/definicion",
    "remember": "Preparar no equivale a enviar.",
    "examples": [
      {
        "id": "requests/transporte/definicion/1",
        "title": "Inspeccionar una petición sin tráfico",
        "language": "python",
        "code": "p = requests.Request(\"GET\", BASE + \"/orders\", params={\"limit\": 1}).prepare()\nprint(p.method, p.url)",
        "hint": "Preparar no equivale a enviar.",
        "textOutput": "GET http://127.0.0.1:8765/orders?limit=1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transporte/prepare-send",
    "remember": "Para flujo preparado manualmente incorpora también la configuración del entorno si corresponde.",
    "examples": [
      {
        "id": "requests/transporte/prepare-send/1",
        "title": "Enviar una petición preparada",
        "language": "python",
        "code": "with requests.Session() as s:\n    req = requests.Request(\"GET\", BASE + \"/orders/101\")\n    p = s.prepare_request(req)\n    settings = s.merge_environment_settings(p.url, {}, None, None, None)\n    r = s.send(p, timeout=5, **settings)\n    print(r.json()[\"id\"])",
        "hint": "Para flujo preparado manualmente incorpora también la configuración del entorno si corresponde.",
        "textOutput": "101.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transporte/mount-pool",
    "remember": "pool_maxsize no limita conexiones simultáneas si pool_block=False.",
    "examples": [
      {
        "id": "requests/transporte/mount-pool/1",
        "title": "Configurar un pool",
        "language": "python",
        "code": "from requests.adapters import HTTPAdapter\nwith requests.Session() as s:\n    adapter = HTTPAdapter(pool_connections=4, pool_maxsize=8, pool_block=True)\n    s.mount(BASE, adapter)\n    print(s.get_adapter(BASE + \"/orders\") is adapter)",
        "hint": "pool_maxsize no limita conexiones simultáneas si pool_block=False.",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/transporte/hooks",
    "remember": "Evita registrar cuerpos o encabezados sensibles.",
    "examples": [
      {
        "id": "requests/transporte/hooks/1",
        "title": "Registrar códigos recibidos",
        "language": "python",
        "code": "def report(r, *args, **kwargs):\n    print(r.status_code)\nwith requests.Session() as s:\n    s.hooks[\"response\"].append(report)\n    s.get(BASE + \"/orders/101\", timeout=5)",
        "hint": "Evita registrar cuerpos o encabezados sensibles.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
