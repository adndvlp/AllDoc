// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/definicion",
    "remember": "No confundas límite de concurrencia con peticiones por segundo.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/definicion/1",
        "title": "Detectar un límite de API",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/status/429\")\n    print(r.status_code, r.headers.get(\"Retry-After\"))",
        "hint": "No confundas límite de concurrencia con peticiones por segundo.",
        "textOutput": "`429 2`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/retry-after",
    "remember": "No conviertas ciegamente todo Retry-After a entero.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/retry-after/1",
        "title": "Interpretar una espera en segundos",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/status/429\")\n    espera = int(r.headers[\"Retry-After\"])\n    print(espera)",
        "hint": "No conviertas ciegamente todo Retry-After a entero.",
        "textOutput": "`2`; solo calcula la espera, no realiza otro intento.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/retries-del-transporte",
    "remember": "Para otros fallos necesitas una política explícita.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/retries-del-transporte/1",
        "title": "Configurar dos reintentos de conexión",
        "language": "python",
        "code": "with httpx.Client(transport=httpx.HTTPTransport(retries=2)) as c:\n    print(c.is_closed)",
        "hint": "Para otros fallos necesitas una política explícita.",
        "textOutput": "`False`; la política queda configurada sin conexión real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/backoff-exponencial-y-jitter",
    "remember": "Limita intentos y tiempo total; Retry-After tiene prioridad si aplica.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/backoff-exponencial-y-jitter/1",
        "title": "Calcular pausas de ejemplo",
        "language": "python",
        "code": "import random\nrng = random.Random(0)\nprint([round(min(30, 2 ** i) + rng.uniform(0, 0.5), 2) for i in range(3)])",
        "hint": "Limita intentos y tiempo total; Retry-After tiene prioridad si aplica.",
        "textOutput": "`[1.42, 2.38, 4.21]` segundos; no se duerme en este ejemplo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/reintentar-una-consulta",
    "remember": "No reintentes 401/403/404 indiscriminadamente.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/reintentar-una-consulta/1",
        "title": "Simular recuperación tras un 503",
        "language": "python",
        "code": "respuestas = iter([503, 200])\nwith httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(next(respuestas)))) as c:\n    for intento in range(3):\n        r = c.get(BASE)\n        if r.status_code not in (429, 502, 503, 504):\n            break\n        # En producción, espera según Retry-After o backoff.\n    print(r.raise_for_status().status_code)",
        "hint": "No reintentes 401/403/404 indiscriminadamente.",
        "textOutput": "`200` en el segundo intento; la espera está omitida solo para la prueba.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/control-de-ritmo",
    "remember": "En código concurrente usa un limitador compartido.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/control-de-ritmo/1",
        "title": "Separar consultas en el tiempo",
        "language": "python",
        "code": "import time\nwith demo() as c:\n    for i in (1, 3):\n        print(c.get(f\"/pedidos/{i}\").status_code)\n        time.sleep(0.01)",
        "hint": "En código concurrente usa un limitador compartido.",
        "textOutput": "`200` y `200`; el intervalo es ilustrativo, no un límite de una API real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/limites-y-reintentos/retry-after-como-fecha",
    "remember": "Si la fecha ya pasó, usa cero; aplica también los límites de la política de reintentos.",
    "examples": [
      {
        "id": "httpx/limites-y-reintentos/retry-after-como-fecha/1",
        "title": "Calcular una espera con reloj fijo",
        "language": "python",
        "code": "from email.utils import parsedate_to_datetime\nfrom datetime import datetime, timezone\nahora = datetime(2026, 8, 1, tzinfo=timezone.utc)\nfecha = parsedate_to_datetime(\"Sat, 01 Aug 2026 00:00:05 GMT\")\nprint(max(0, (fecha - ahora).total_seconds()))",
        "hint": "Si la fecha ya pasó, usa cero; aplica también los límites de la política de reintentos.",
        "textOutput": "`5.0` segundos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
