// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/autenticacion/definicion",
    "remember": "No envíes credenciales reales a servicios de prueba.",
    "examples": [
      {
        "id": "requests/autenticacion/definicion/1",
        "title": "Consultar un recurso protegido",
        "language": "python",
        "code": "r = requests.get(BASE + \"/private\", headers={\"X-API-Key\": \"demo-key\"}, timeout=5)\nprint(r.json()[\"access\"])",
        "hint": "No envíes credenciales reales a servicios de prueba.",
        "textOutput": "True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/api-key",
    "remember": "Una clave en URL puede terminar en logs.",
    "examples": [
      {
        "id": "requests/autenticacion/api-key/1",
        "title": "Enviar una clave de prueba",
        "language": "python",
        "code": "r = requests.get(BASE + \"/private\", headers={\"X-API-Key\": \"demo-key\"}, timeout=5)\nprint(r.status_code)",
        "hint": "Una clave en URL puede terminar en logs.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/bearer",
    "remember": "No registres ni publiques tokens.",
    "examples": [
      {
        "id": "requests/autenticacion/bearer/1",
        "title": "Autenticar con un token",
        "language": "python",
        "code": "r = requests.get(BASE + \"/private\", headers={\"Authorization\": \"Bearer demo-token\"}, timeout=5)\nprint(r.status_code)",
        "hint": "No registres ni publiques tokens.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/basic-auth",
    "remember": "Base64 no cifra; requiere HTTPS en producción.",
    "examples": [
      {
        "id": "requests/autenticacion/basic-auth/1",
        "title": "Acceder con usuario y contraseña",
        "language": "python",
        "code": "from requests.auth import HTTPBasicAuth\nr = requests.get(BASE + \"/private\", auth=HTTPBasicAuth(\"demo\", \"secret\"), timeout=5)\nprint(r.status_code)",
        "hint": "Base64 no cifra; requiere HTTPS en producción.",
        "textOutput": "200. auth=(\"demo\", \"secret\") es equivalente en este caso.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/digest-auth",
    "remember": "Requiere un servidor compatible; no es Basic Auth.",
    "note": "La demo no implementa el reto Digest.",
    "examples": [
      {
        "id": "requests/autenticacion/digest-auth/1",
        "title": "Configurar autenticación Digest",
        "language": "python",
        "code": "from requests.auth import HTTPDigestAuth\nauth = HTTPDigestAuth(\"demo\", \"secret\")\nprint(type(auth).__name__)",
        "hint": "Requiere un servidor compatible; no es Basic Auth.",
        "textOutput": "HTTPDigestAuth; no hay envío.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/oauth",
    "remember": "Renueva el token siguiendo el proveedor; no inventes endpoints ni scopes.",
    "note": "Para flujos reales consulta la documentación del proveedor y, si procede, requests-oauthlib.",
    "examples": [
      {
        "id": "requests/autenticacion/oauth/1",
        "title": "Preparar el uso de un access token",
        "language": "python",
        "code": "token = \"demo-token\"\nr = requests.get(BASE + \"/private\", headers={\"Authorization\": f\"Bearer {token}\"}, timeout=5)\nprint(r.status_code)",
        "hint": "Renueva el token siguiendo el proveedor; no inventes endpoints ni scopes.",
        "textOutput": "200; solo se simula el uso del token, no su emisión ni renovación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/variables-entorno",
    "remember": "No imprimas los secretos ni los guardes en Git.",
    "examples": [
      {
        "id": "requests/autenticacion/variables-entorno/1",
        "title": "Leer una clave configurada",
        "language": "python",
        "code": "import os\nfrom unittest.mock import patch\nwith patch.dict(os.environ, {\"ORDERS_API_KEY\": \"demo-key\"}):\n    key = os.environ[\"ORDERS_API_KEY\"]\n    r = requests.get(BASE + \"/private\", headers={\"X-API-Key\": key}, timeout=5)\n    print(r.status_code)",
        "hint": "No imprimas los secretos ni los guardes en Git.",
        "textOutput": "200. El valor ficticio se configura solo dentro del bloque.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/autenticacion/auth-base",
    "remember": "Usa esquemas oficiales y no implementes criptografía improvisada.",
    "examples": [
      {
        "id": "requests/autenticacion/auth-base/1",
        "title": "Añadir automáticamente una clave",
        "language": "python",
        "code": "class ApiKey(requests.auth.AuthBase):\n    def __call__(self, request):\n        request.headers[\"X-API-Key\"] = \"demo-key\"\n        return request\nr = requests.get(BASE + \"/private\", auth=ApiKey(), timeout=5)\nprint(r.status_code)",
        "hint": "Usa esquemas oficiales y no implementes criptografía improvisada.",
        "textOutput": "200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
