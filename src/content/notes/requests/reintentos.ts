// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/reintentos/definicion",
    "remember": "No reintentes cualquier error ni indefinidamente.",
    "examples": [
      {
        "id": "requests/reintentos/definicion/1",
        "title": "Recuperarse de un 503 con un reintento",
        "language": "python",
        "code": "r = requests.get(BASE + \"/flaky\", params={\"key\": \"manual\"}, timeout=5)\nif r.status_code == 503:\n    r = requests.get(BASE + \"/flaky\", params={\"key\": \"manual\"}, timeout=5)\nr.raise_for_status()\nprint(r.status_code)",
        "hint": "No reintentes cualquier error ni indefinidamente.",
        "textOutput": "200; en un servidor recién iniciado el primer intento devuelve 503.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/retry-after",
    "remember": "Si la espera excede el presupuesto, detén o pospón la tarea.",
    "note": "En producción contempla fechas HTTP con email.utils.parsedate_to_datetime.",
    "examples": [
      {
        "id": "requests/reintentos/retry-after/1",
        "title": "Interpretar la espera de la demo",
        "language": "python",
        "code": "import time\nr = requests.get(BASE + \"/status/429\", timeout=5)\nwait = int(r.headers[\"Retry-After\"])\ntime.sleep(wait)\nprint(wait)",
        "hint": "Si la espera excede el presupuesto, detén o pospón la tarea.",
        "textOutput": "0 segundos; el ejemplo no repite el endpoint que siempre devuelve 429.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/http-adapter",
    "remember": "Requests no reintenta códigos HTTP de forma predeterminada.",
    "examples": [
      {
        "id": "requests/reintentos/http-adapter/1",
        "title": "Recuperar un GET transitorio",
        "language": "python",
        "code": "from requests.adapters import HTTPAdapter\nfrom urllib3.util import Retry\nretry = Retry(total=2, status_forcelist=[503], allowed_methods={\"GET\"})\nwith requests.Session() as s:\n    s.mount(BASE, HTTPAdapter(max_retries=retry))\n    r = s.get(BASE + \"/flaky\", params={\"key\": \"adapter\"}, timeout=5)\n    r.raise_for_status()\n    print(r.status_code)",
        "hint": "Requests no reintenta códigos HTTP de forma predeterminada.",
        "textOutput": "200; el adaptador repite el primer 503 si la clave es nueva.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/retry-budgets",
    "remember": "total=2 permite hasta dos reintentos además del intento inicial.",
    "examples": [
      {
        "id": "requests/reintentos/retry-budgets/1",
        "title": "Configurar presupuestos",
        "language": "python",
        "code": "from urllib3.util import Retry\nretry = Retry(total=3, connect=2, read=1, status=2, other=0)\nprint(retry.total, retry.connect, retry.read, retry.status)",
        "hint": "total=2 permite hasta dos reintentos además del intento inicial.",
        "textOutput": "3 2 1 2. Solo se configura el objeto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/retry-conditions",
    "remember": "Una escritura puede haberse aplicado aunque el cliente no reciba respuesta.",
    "examples": [
      {
        "id": "requests/reintentos/retry-conditions/1",
        "title": "Seleccionar métodos y estados",
        "language": "python",
        "code": "from urllib3.util import Retry\nretry = Retry(total=3, allowed_methods={\"GET\", \"HEAD\"}, status_forcelist=[429, 502, 503, 504])\nprint(\"POST\" in retry.allowed_methods, 503 in retry.status_forcelist)",
        "hint": "Una escritura puede haberse aplicado aunque el cliente no reciba respuesta.",
        "textOutput": "False True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/backoff",
    "remember": "Acota la espera y los intentos.",
    "examples": [
      {
        "id": "requests/reintentos/backoff/1",
        "title": "Configurar esperas progresivas",
        "language": "python",
        "code": "from urllib3.util import Retry\nretry = Retry(total=3, backoff_factor=0.5, backoff_max=8, backoff_jitter=0.2, respect_retry_after_header=True)\nprint(retry.backoff_factor, retry.backoff_max)",
        "hint": "Acota la espera y los intentos.",
        "textOutput": "0.5 8. No se ejecuta ninguna espera.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/reintentos/retry-exhausted",
    "remember": "Comprueba siempre el estado final.",
    "examples": [
      {
        "id": "requests/reintentos/retry-exhausted/1",
        "title": "Obtener el último 503",
        "language": "python",
        "code": "from requests.adapters import HTTPAdapter\nfrom urllib3.util import Retry\nwith requests.Session() as s:\n    retry = Retry(total=1, status_forcelist=[503], raise_on_status=False)\n    s.mount(BASE, HTTPAdapter(max_retries=retry))\n    r = s.get(BASE + \"/status/503\", timeout=5)\n    print(r.status_code)",
        "hint": "Comprueba siempre el estado final.",
        "textOutput": "503 después de dos intentos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
