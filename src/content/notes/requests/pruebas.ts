// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/pruebas/definicion",
    "remember": "Una prueba simulada no confirma disponibilidad de una API real.",
    "examples": [
      {
        "id": "requests/pruebas/definicion/1",
        "title": "Simular un estado HTTP",
        "language": "python",
        "code": "from unittest.mock import patch\nwith patch(\"requests.get\") as get:\n    get.return_value.status_code = 200\n    print(requests.get(BASE, timeout=5).status_code)",
        "hint": "Una prueba simulada no confirma disponibilidad de una API real.",
        "textOutput": "200; sin tráfico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/pruebas/debug-request",
    "remember": "Redacta credenciales antes de mostrar información.",
    "examples": [
      {
        "id": "requests/pruebas/debug-request/1",
        "title": "Comprobar el cuerpo enviado",
        "language": "python",
        "code": "r = requests.post(BASE + \"/echo\", json={\"amount\": 500}, timeout=5)\nprint(r.request.method, r.request.body)",
        "hint": "Redacta credenciales antes de mostrar información.",
        "textOutput": "POST b'{\"amount\": 500}'.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/pruebas/logging",
    "remember": "No registres tokens, cookies ni URLs con secretos.",
    "examples": [
      {
        "id": "requests/pruebas/logging/1",
        "title": "Registrar un estado HTTP",
        "language": "python",
        "code": "import logging\nlogging.basicConfig(level=logging.INFO)\nr = requests.get(BASE + \"/orders/101\", timeout=5)\nlogging.getLogger(\"extract\").info(\"HTTP %s\", r.status_code)",
        "hint": "No registres tokens, cookies ni URLs con secretos.",
        "textOutput": "Un mensaje de nivel INFO con HTTP 200, si el nivel está habilitado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/pruebas/mock-response",
    "remember": "Parchea donde el código busca el objeto.",
    "examples": [
      {
        "id": "requests/pruebas/mock-response/1",
        "title": "Probar un timeout sin red",
        "language": "python",
        "code": "from unittest.mock import patch\nwith patch(\"requests.get\", side_effect=requests.exceptions.Timeout):\n    try:\n        requests.get(BASE, timeout=5)\n    except requests.exceptions.Timeout:\n        print(\"Revisar timeout\")",
        "hint": "Parchea donde el código busca el objeto.",
        "textOutput": "Revisar timeout.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/pruebas/librerias-mock",
    "remember": "No son dependencias obligatorias de Requests.",
    "note": "Instala requests-mock para este ejemplo. responses es otra opción equivalente de propósito.",
    "examples": [
      {
        "id": "requests/pruebas/librerias-mock/1",
        "title": "Simular una API con requests-mock",
        "language": "python",
        "code": "import requests_mock\nwith requests_mock.Mocker() as m:\n    m.get(BASE + \"/orders/101\", json={\"id\": 101})\n    print(requests.get(BASE + \"/orders/101\", timeout=5).json())",
        "hint": "No son dependencias obligatorias de Requests. Instala requests-mock para ejecutarlo en Python local.",
        "textOutput": "{'id': 101}; sin servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/pruebas/pytest",
    "remember": "Comprueba contenido y errores, no solo el código HTTP.",
    "examples": [
      {
        "id": "requests/pruebas/pytest/1",
        "title": "Comprobar la estructura de un pedido",
        "language": "python",
        "code": "from unittest.mock import patch\ndef test_order():\n    with patch(\"requests.get\") as get:\n        get.return_value.json.return_value = {\"id\": 101}\n        assert requests.get(BASE, timeout=5).json()[\"id\"] == 101\ntest_order()",
        "hint": "Comprueba contenido y errores, no solo el código HTTP.",
        "textOutput": "Sin excepción; para pytest, guarda como test_orders.py y ejecuta pytest.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
