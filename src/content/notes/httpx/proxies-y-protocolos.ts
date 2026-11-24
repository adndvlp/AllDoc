// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/definicion",
    "remember": "Usa únicamente proxies autorizados y de confianza.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/definicion/1",
        "title": "Configurar un proxy HTTP",
        "language": "python",
        "code": "with httpx.Client(proxy=\"http://proxy.example:8080\") as c:\n    print(c.is_closed)",
        "hint": "Usa únicamente proxies autorizados y de confianza.",
        "textOutput": "`False`; no se intenta conectar al proxy.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/http-proxy-https-proxy-all-proxy-y-no-proxy",
    "remember": "Los valores solo se aplican cuando `trust_env=True`.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/http-proxy-https-proxy-all-proxy-y-no-proxy/1",
        "title": "Declarar configuración temporal",
        "language": "python",
        "code": "import os\nfrom unittest.mock import patch\nwith patch.dict(os.environ, {\"HTTP_PROXY\": \"http://proxy.example:8080\", \"HTTPS_PROXY\": \"http://proxy.example:8080\", \"ALL_PROXY\": \"http://proxy.example:8080\", \"NO_PROXY\": \"localhost,127.0.0.1\"}):\n    with httpx.Client() as c:\n        print(os.environ[\"NO_PROXY\"])",
        "hint": "Los valores solo se aplican cuando `trust_env=True`.",
        "textOutput": "`localhost,127.0.0.1`; no se abre conexión.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/socks",
    "remember": "Instala `python -m pip install \"httpx[socks]==0.28.1\"`.",
    "note": "Requiere el extra socks; una petición real requiere un proxy activo.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/socks/1",
        "title": "Configurar un proxy SOCKS",
        "language": "python",
        "code": "with httpx.Client(proxy=\"socks5://localhost:1080\") as c:\n    print(c.is_closed)",
        "hint": "Instala `python -m pip install \"httpx[socks]==0.28.1\"`. Ejecuta la configuración en Python local con el extra SOCKS.",
        "textOutput": "`False` si está instalada la dependencia; no se conecta aún.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/mounts",
    "remember": "Cada transporte maneja el tráfico asignado.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/mounts/1",
        "title": "Simular una ruta con transporte específico",
        "language": "python",
        "code": "with httpx.Client(mounts={\"https://ventas.example\": httpx.MockTransport(handler)}) as c:\n    print(c.get(BASE + \"/pedidos/1\").status_code)",
        "hint": "Cada transporte maneja el tráfico asignado.",
        "textOutput": "`200`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/http-1-1-y-http-2",
    "remember": "Instala `python -m pip install \"httpx[http2]==0.28.1\"`.",
    "note": "Requiere Internet y el extra http2.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/http-1-1-y-http-2/1",
        "title": "Consultar el protocolo negociado",
        "language": "python",
        "code": "with httpx.Client(http2=True) as c:\n    r = c.get(\"https://www.python-httpx.org/\")\n    print(r.http_version)",
        "hint": "Instala `python -m pip install \"httpx[http2]==0.28.1\"`. Usa Python local con Internet y el extra HTTP/2.",
        "textOutput": "`HTTP/2` si se negocia; de lo contrario, puede ser HTTP/1.1.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/proxies-y-protocolos/compresion-y-dependencias-opcionales",
    "remember": "`iter_raw()` no aplica la decodificación de Content-Encoding.",
    "examples": [
      {
        "id": "httpx/proxies-y-protocolos/compresion-y-dependencias-opcionales/1",
        "title": "Decodificar gzip",
        "language": "python",
        "code": "import gzip\nr = httpx.Response(200, content=gzip.compress(b\"ventas\"), headers={\"Content-Encoding\": \"gzip\"})\nprint(r.content)",
        "hint": "`iter_raw()` no aplica la decodificación de Content-Encoding.",
        "textOutput": "`b'ventas'`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
