// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/sesiones/definicion",
    "remember": "Usa with para cerrar la sesión al terminar.",
    "examples": [
      {
        "id": "requests/sesiones/definicion/1",
        "title": "Conservar una cookie entre peticiones",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.get(BASE + \"/login\", timeout=5)\n    r = s.get(BASE + \"/cookie\", timeout=5)\n    print(r.json()[\"cookie\"])",
        "hint": "Usa with para cerrar la sesión al terminar.",
        "textOutput": "sid=demo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/sesiones/cookie-jar",
    "remember": "Una cookie de sesión puede ser una credencial.",
    "examples": [
      {
        "id": "requests/sesiones/cookie-jar/1",
        "title": "Enviar una cookie manualmente",
        "language": "python",
        "code": "jar = requests.cookies.RequestsCookieJar()\njar.set(\"sid\", \"demo\", domain=\"127.0.0.1\", path=\"/\")\nr = requests.get(BASE + \"/cookie\", cookies=jar, timeout=5)\nprint(r.json()[\"cookie\"])",
        "hint": "Una cookie de sesión puede ser una credencial.",
        "textOutput": "sid=demo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/sesiones/configuracion-sesion",
    "remember": "Evita compartir una sesión con credenciales entre dominios no relacionados.",
    "examples": [
      {
        "id": "requests/sesiones/configuracion-sesion/1",
        "title": "Reutilizar autenticación",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.auth = (\"demo\", \"secret\")\n    s.headers.update({\"X-Client\": \"analyst\"})\n    print(s.get(BASE + \"/private\", timeout=5).status_code)",
        "hint": "Evita compartir una sesión con credenciales entre dominios no relacionados.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/sesiones/session-params",
    "remember": "No existe un timeout predeterminado configurable simplemente asignando s.timeout.",
    "examples": [
      {
        "id": "requests/sesiones/session-params/1",
        "title": "Reutilizar el tamaño de página",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.params = {\"limit\": 1}\n    print(len(s.get(BASE + \"/orders\", timeout=5).json()[\"data\"]))",
        "hint": "No existe un timeout predeterminado configurable simplemente asignando s.timeout.",
        "textOutput": "1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/sesiones/pooling",
    "remember": "Consume el cuerpo o cierra la respuesta para liberar recursos.",
    "examples": [
      {
        "id": "requests/sesiones/pooling/1",
        "title": "Consultar dos pedidos en una sesión",
        "language": "python",
        "code": "with requests.Session() as s:\n    for i in (101, 102):\n        print(s.get(f\"{BASE}/orders/{i}\", timeout=5).json()[\"id\"])",
        "hint": "Consume el cuerpo o cierra la respuesta para liberar recursos.",
        "textOutput": "101 y 102. La reutilización efectiva depende del servidor y transporte.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/sesiones/close",
    "remember": "Cierra también las respuestas en streaming.",
    "examples": [
      {
        "id": "requests/sesiones/close/1",
        "title": "Cerrar automáticamente la sesión",
        "language": "python",
        "code": "with requests.Session() as s:\n    r = s.get(BASE + \"/orders/101\", timeout=5)\nprint(r.json()[\"id\"])",
        "hint": "Cierra también las respuestas en streaming.",
        "textOutput": "101; la respuesta ya descargada sigue disponible.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
