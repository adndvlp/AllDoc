// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/definicion",
    "remember": "No desactives verify para resolver errores de certificados en producción.",
    "examples": [
      {
        "id": "httpx/https-y-configuracion-del-entorno/definicion/1",
        "title": "Construir un cliente con verificación",
        "language": "python",
        "code": "with httpx.Client(verify=True) as c:\n    print(c.is_closed)",
        "hint": "No desactives verify para resolver errores de certificados en producción.",
        "textOutput": "`False`; el cliente está abierto, sin establecer una conexión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/sslcontext-y-ca-personalizada",
    "remember": "Una CA personalizada debe ser de confianza para tu organización.",
    "examples": [
      {
        "id": "httpx/https-y-configuracion-del-entorno/sslcontext-y-ca-personalizada/1",
        "title": "Crear un contexto TLS",
        "language": "python",
        "code": "import ssl\nctx = ssl.create_default_context()\nwith httpx.Client(verify=ctx) as c:\n    print(ctx.check_hostname)",
        "hint": "Una CA personalizada debe ser de confianza para tu organización.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/certificados-de-cliente",
    "remember": "Requiere certificados reales; evita el argumento cert obsoleto en 0.28.",
    "note": "Requiere CA, certificado, clave y URL reales. No se ejecuta en el mock.",
    "examples": [
      {
        "id": "httpx/https-y-configuracion-del-entorno/certificados-de-cliente/1",
        "title": "Configurar TLS mutuo",
        "language": "python",
        "code": "import ssl\nctx = ssl.create_default_context(cafile=\"ca.pem\")\nctx.load_cert_chain(\"cliente.pem\", \"cliente.key\")\nwith httpx.Client(verify=ctx) as c:\n    r = c.get(\"https://api.example\")",
        "hint": "Requiere certificados reales; evita el argumento cert obsoleto en 0.28. Usa un entorno Python local con certificados y un servidor HTTPS.",
        "textOutput": "Con archivos y servidor válidos, el cliente puede autenticarse por TLS; el estado depende del servicio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/trust-env",
    "remember": "Útil para aislar pruebas de configuración externa.",
    "examples": [
      {
        "id": "httpx/https-y-configuracion-del-entorno/trust-env/1",
        "title": "Ignorar configuración del entorno",
        "language": "python",
        "code": "with httpx.Client(trust_env=False) as c:\n    print(c.trust_env)",
        "hint": "Útil para aislar pruebas de configuración externa.",
        "textOutput": "`False`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/https-y-configuracion-del-entorno/ssl-cert-file-y-ssl-cert-dir",
    "remember": "No configures rutas inventadas en un entorno de producción.",
    "note": "certifi es una dependencia de HTTPX. SSL_CERT_DIR requiere un directorio con enlaces hash de OpenSSL.",
    "examples": [
      {
        "id": "httpx/https-y-configuracion-del-entorno/ssl-cert-file-y-ssl-cert-dir/1",
        "title": "Configurar un archivo CA temporalmente",
        "language": "python",
        "code": "import os, ssl\nfrom unittest.mock import patch\nimport certifi\nwith patch.dict(os.environ, {\"SSL_CERT_FILE\": certifi.where()}):\n    with httpx.Client(trust_env=True) as c:\n        print(os.path.isfile(os.environ[\"SSL_CERT_FILE\"]))",
        "hint": "No configures rutas inventadas en un entorno de producción.",
        "textOutput": "`True`; solo se configura el cliente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
