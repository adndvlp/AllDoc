// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/concurrencia/definicion",
    "remember": "No confundas concurrencia con ausencia de límites de la API.",
    "examples": [
      {
        "id": "requests/concurrencia/definicion/1",
        "title": "Consultar registros secuencialmente",
        "language": "python",
        "code": "for i in (101, 103):\n    r = requests.get(f\"{BASE}/orders/{i}\", timeout=5)\n    r.raise_for_status()\n    print(r.json()[\"amount\"])",
        "hint": "No confundas concurrencia con ausencia de límites de la API.",
        "textOutput": "800 y 1200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/concurrencia/thread-pool",
    "remember": "Evita compartir una Session mutable entre hilos sin coordinación.",
    "examples": [
      {
        "id": "requests/concurrencia/thread-pool/1",
        "title": "Consultar dos pedidos en paralelo",
        "language": "python",
        "code": "from concurrent.futures import ThreadPoolExecutor\ndef fetch(i):\n    r = requests.get(f\"{BASE}/orders/{i}\", timeout=5)\n    r.raise_for_status()\n    return r.json()[\"amount\"]\nwith ThreadPoolExecutor(max_workers=2) as pool:\n    print(list(pool.map(fetch, [101, 103])))",
        "hint": "Evita compartir una Session mutable entre hilos sin coordinación. Ejecuta este ejemplo en Python local con soporte de hilos.",
        "textOutput": "[800, 1200]; map conserva el orden de entrada.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/concurrencia/limites-cliente",
    "remember": "Define los límites de la API independientemente del tamaño del pool.",
    "examples": [
      {
        "id": "requests/concurrencia/limites-cliente/1",
        "title": "Separar concurrencia de cuota",
        "language": "python",
        "code": "max_workers = 2\nrequests_per_minute = 60\nprint(max_workers, requests_per_minute)",
        "hint": "Define los límites de la API independientemente del tamaño del pool.",
        "textOutput": "2 60; son límites de configuración, no un limitador implementado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
