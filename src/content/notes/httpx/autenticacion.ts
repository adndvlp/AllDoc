// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/autenticacion/definicion",
    "remember": "Utiliza HTTPS para enviar secretos reales.",
    "examples": [
      {
        "id": "httpx/autenticacion/definicion/1",
        "title": "Probar acceso autorizado",
        "language": "python",
        "code": "with demo() as c:\n    print(c.get(\"/private\").status_code)\n    print(c.get(\"/private\", headers={\"Authorization\": \"Bearer demo\"}).status_code)",
        "hint": "Utiliza HTTPS para enviar secretos reales.",
        "textOutput": "`401` y `200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/api-key",
    "remember": "Prefiere headers cuando la API lo permita, para no exponer secretos en URLs.",
    "examples": [
      {
        "id": "httpx/autenticacion/api-key/1",
        "title": "Adjuntar una clave ficticia",
        "language": "python",
        "code": "with demo() as c:\n    r = c.get(\"/echo\", headers={\"X-API-Key\": \"clave-demo\"})\n    print(r.request.headers[\"X-API-Key\"])",
        "hint": "Prefiere headers cuando la API lo permita, para no exponer secretos en URLs.",
        "textOutput": "`clave-demo`; no es una credencial real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/bearer-token",
    "remember": "No confundas token de acceso con token de renovación.",
    "examples": [
      {
        "id": "httpx/autenticacion/bearer-token/1",
        "title": "Configurar un token compartido",
        "language": "python",
        "code": "with demo(headers={\"Authorization\": \"Bearer demo\"}) as c:\n    print(c.get(\"/private\").status_code)",
        "hint": "No confundas token de acceso con token de renovación.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/basicauth",
    "remember": "Usa TLS en servicios reales.",
    "examples": [
      {
        "id": "httpx/autenticacion/basicauth/1",
        "title": "Comprobar el esquema Basic",
        "language": "python",
        "code": "with demo(auth=httpx.BasicAuth(\"usuario\", \"demo\")) as c:\n    r = c.get(\"/echo\")\n    print(r.request.headers[\"Authorization\"].split()[0])",
        "hint": "Usa TLS en servicios reales.",
        "textOutput": "`Basic`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/digestauth",
    "remember": "Digest no reemplaza HTTPS ni protege todo el cuerpo.",
    "examples": [
      {
        "id": "httpx/autenticacion/digestauth/1",
        "title": "Responder a un desafío simulado",
        "language": "python",
        "code": "def digest_handler(req):\n    if req.headers.get(\"Authorization\", \"\").startswith(\"Digest \"):\n        return httpx.Response(200)\n    return httpx.Response(401, headers={\"WWW-Authenticate\": 'Digest realm=\"demo\", nonce=\"abc\", algorithm=MD5, qop=\"auth\"'})\nwith httpx.Client(transport=httpx.MockTransport(digest_handler), auth=httpx.DigestAuth(\"user\", \"demo\")) as c:\n    print(c.get(BASE).status_code)",
        "hint": "Digest no reemplaza HTTPS ni protege todo el cuerpo.",
        "textOutput": "`200`; el mock solo comprueba el esquema, no valida credenciales.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/netrcauth",
    "remember": "Protege el archivo y no lo subas al repositorio.",
    "examples": [
      {
        "id": "httpx/autenticacion/netrcauth/1",
        "title": "Usar un netrc temporal",
        "language": "python",
        "code": "with TemporaryDirectory() as tmp:\n    p = Path(tmp) / \"netrc\"\n    p.write_text(\"machine ventas.example login demo password ficticia\\n\")\n    p.chmod(0o600)\n    with demo(auth=httpx.NetRCAuth(file=str(p))) as c:\n        print(c.get(\"/echo\").request.headers[\"Authorization\"].split()[0])",
        "hint": "Protege el archivo y no lo subas al repositorio.",
        "textOutput": "`Basic`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/variables-de-entorno",
    "remember": "En producción usa un gestor de secretos o variables configuradas fuera del script.",
    "examples": [
      {
        "id": "httpx/autenticacion/variables-de-entorno/1",
        "title": "Leer un token del entorno de prueba",
        "language": "python",
        "code": "import os\nfrom unittest.mock import patch\nwith patch.dict(os.environ, {\"API_TOKEN\": \"demo\"}):\n    with demo(headers={\"Authorization\": f\"Bearer {os.environ['API_TOKEN']}\"}) as c:\n        print(c.get(\"/private\").status_code)",
        "hint": "En producción usa un gestor de secretos o variables configuradas fuera del script.",
        "textOutput": "`200`; el token ficticio se elimina del entorno al salir del contexto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/oauth-2-0-y-renovacion",
    "remember": "El proveedor determina el flujo, caducidad y parámetros; no renueves indefinidamente ante un 401.",
    "note": "En una integración real registra la aplicación, autentica el cliente y sigue el contrato del proveedor. Para renovación usa el flujo autorizado, si ofrece refresh token.",
    "examples": [
      {
        "id": "httpx/autenticacion/oauth-2-0-y-renovacion/1",
        "title": "Usar un token ya obtenido",
        "language": "python",
        "code": "def token_provider(req):\n    return httpx.Response(200, json={\"access_token\": \"demo\", \"token_type\": \"Bearer\"})\nwith httpx.Client(transport=httpx.MockTransport(token_provider)) as auth_client:\n    token = auth_client.post(BASE + \"/token\", data={\"grant_type\": \"client_credentials\"}).json()[\"access_token\"]\nwith demo(headers={\"Authorization\": f\"Bearer {token}\"}) as c:\n    print(c.get(\"/private\").status_code)",
        "hint": "El proveedor determina el flujo, caducidad y parámetros; no renueves indefinidamente ante un 401.",
        "textOutput": "`200`; el proveedor simulado no realiza OAuth real.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/autenticacion/autenticacion-personalizada",
    "remember": "Para autenticación con I/O específico usa los flujos sync/async correspondientes.",
    "examples": [
      {
        "id": "httpx/autenticacion/autenticacion-personalizada/1",
        "title": "Añadir un header desde Auth",
        "language": "python",
        "code": "class DemoAuth(httpx.Auth):\n    def auth_flow(self, request):\n        request.headers[\"Authorization\"] = \"Bearer demo\"\n        yield request\nwith demo(auth=DemoAuth()) as c:\n    print(c.get(\"/private\").status_code)",
        "hint": "Para autenticación con I/O específico usa los flujos sync/async correspondientes.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
