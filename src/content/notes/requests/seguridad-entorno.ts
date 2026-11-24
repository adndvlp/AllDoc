// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/seguridad-entorno/definicion",
    "remember": "Mantén la verificación TLS activada en producción.",
    "examples": [
      {
        "id": "requests/seguridad-entorno/definicion/1",
        "title": "Consultar la configuración segura",
        "language": "python",
        "code": "with requests.Session() as s:\n    print(s.verify, s.trust_env)",
        "hint": "Mantén la verificación TLS activada en producción.",
        "textOutput": "True True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/seguridad-entorno/verify",
    "remember": "verify=False desactiva la validación y permite ataques de intermediario.",
    "note": "REQUESTS_CA_BUNDLE puede seleccionar otro bundle; CURL_CA_BUNDLE es alternativa cuando corresponde.",
    "examples": [
      {
        "id": "requests/seguridad-entorno/verify/1",
        "title": "Consultar el bundle predeterminado",
        "language": "python",
        "code": "from pathlib import Path\nprint(Path(requests.certs.where()).is_file())",
        "hint": "verify=False desactiva la validación y permite ataques de intermediario.",
        "textOutput": "True en una instalación normal; no se realiza una conexión TLS.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/seguridad-entorno/cert",
    "remember": "cert autentica al cliente; verify verifica al servidor.",
    "note": "Para enviar realmente se requieren archivos válidos y un servidor HTTPS compatible. Requests no admite claves privadas cifradas en este parámetro.",
    "examples": [
      {
        "id": "requests/seguridad-entorno/cert/1",
        "title": "Configurar rutas de certificados",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.cert = (\"cliente.pem\", \"cliente-key.pem\")\n    print(s.cert)",
        "hint": "cert autentica al cliente; verify verifica al servidor.",
        "textOutput": "('cliente.pem', 'cliente-key.pem'); solo configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/seguridad-entorno/proxies",
    "remember": "No envíes secretos a proxies no confiables.",
    "note": "Para usarlo debe existir un proxy autorizado en esa dirección. Las variables de entorno pueden prevalecer sobre Session.proxies.",
    "examples": [
      {
        "id": "requests/seguridad-entorno/proxies/1",
        "title": "Preparar una configuración de proxy",
        "language": "python",
        "code": "proxies = {\"https\": \"http://127.0.0.1:3128\"}\nwith requests.Session() as s:\n    s.proxies.update(proxies)\n    print(s.proxies[\"https\"])",
        "hint": "No envíes secretos a proxies no confiables.",
        "textOutput": "http://127.0.0.1:3128; no se realiza una petición.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/seguridad-entorno/trust-env",
    "remember": "Desactivarlo cambia más que el proxy; hazlo solo de forma deliberada.",
    "examples": [
      {
        "id": "requests/seguridad-entorno/trust-env/1",
        "title": "Aislar una sesión local del entorno",
        "language": "python",
        "code": "with requests.Session() as s:\n    s.trust_env = False\n    print(s.get(BASE + \"/orders/101\", timeout=5).status_code)",
        "hint": "Desactivarlo cambia más que el proxy; hazlo solo de forma deliberada.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
