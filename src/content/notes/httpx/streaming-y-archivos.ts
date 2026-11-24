// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/definicion",
    "remember": "Mantén abierta la respuesta mientras consumes el stream.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/definicion/1",
        "title": "Leer un CSV en bloques",
        "language": "python",
        "code": "with demo() as c:\n    with c.stream(\"GET\", \"/csv\") as r:\n        r.raise_for_status()\n        print(b\"\".join(r.iter_bytes()).decode().splitlines())",
        "hint": "Mantén abierta la respuesta mientras consumes el stream.",
        "textOutput": "`['id,importe', '1,800', '3,500']`; join se usa aquí solo por el tamaño pequeño del ejemplo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/httpx-stream-y-client-stream",
    "remember": "En una extracción repetida usa el cliente.",
    "note": "Requiere Internet.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/httpx-stream-y-client-stream/1",
        "title": "Descargar desde una URL real",
        "language": "python",
        "code": "with httpx.stream(\"GET\", \"https://example.com\", timeout=10) as r:\n    r.raise_for_status()\n    print(next(r.iter_bytes())[:20])",
        "hint": "En una extracción repetida usa el cliente. Ejecuta la descarga en Python local con acceso a Internet.",
        "textOutput": "Primeros bytes de la respuesta, variables según el servidor.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-bytes-y-descarga",
    "remember": "No uses `.content` antes de leer un stream.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/iter-bytes-y-descarga/1",
        "title": "Guardar un CSV sin acumularlo",
        "language": "python",
        "code": "with TemporaryDirectory() as tmp:\n    p = Path(tmp) / \"ventas.csv\"\n    with demo() as c, c.stream(\"GET\", \"/csv\") as r, p.open(\"wb\") as f:\n        r.raise_for_status()\n        for bloque in r.iter_bytes(chunk_size=8):\n            f.write(bloque)\n    print(p.read_text().splitlines()[-1])",
        "hint": "No uses `.content` antes de leer un stream.",
        "textOutput": "`3,500`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-text-e-iter-lines",
    "remember": "Un bloque de texto no equivale necesariamente a una línea.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/iter-text-e-iter-lines/1",
        "title": "Procesar JSON por línea",
        "language": "python",
        "code": "with demo() as c, c.stream(\"GET\", \"/ndjson\") as r:\n    print([json.loads(linea)[\"id\"] for linea in r.iter_lines()])",
        "hint": "Un bloque de texto no equivale necesariamente a una línea.",
        "textOutput": "`[1, 3]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-raw",
    "remember": "Úsalo si necesitas conservar el cuerpo comprimido.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/iter-raw/1",
        "title": "Leer contenido crudo de un stream",
        "language": "python",
        "code": "class Bloques(httpx.SyncByteStream):\n    def __iter__(self):\n        yield b\"abc\"\n        yield b\"def\"\nwith httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:\n    with c.stream(\"GET\", BASE) as r:\n        print(list(r.iter_raw()))",
        "hint": "Úsalo si necesitas conservar el cuerpo comprimido.",
        "textOutput": "`[b'abc', b'def']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/read-y-cierre",
    "remember": "No uses read si quieres mantener bajo el uso de memoria.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/read-y-cierre/1",
        "title": "Leer completamente un stream pequeño",
        "language": "python",
        "code": "with demo() as c, c.stream(\"GET\", \"/csv\") as r:\n    r.read()\n    print(r.text.splitlines()[0])",
        "hint": "No uses read si quieres mantener bajo el uso de memoria.",
        "textOutput": "`id,importe`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/num-bytes-downloaded",
    "remember": "Content-Length puede no existir; no asumas porcentaje disponible.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/num-bytes-downloaded/1",
        "title": "Consultar avance de descarga",
        "language": "python",
        "code": "class Bloques(httpx.SyncByteStream):\n    def __iter__(self):\n        yield b\"abc\"\n        yield b\"def\"\nwith httpx.Client(transport=httpx.MockTransport(lambda req: httpx.Response(200, stream=Bloques()))) as c:\n    with c.stream(\"GET\", BASE) as r:\n        for _ in r.iter_bytes():\n            print(r.num_bytes_downloaded)",
        "hint": "Content-Length puede no existir; no asumas porcentaje disponible.",
        "textOutput": "`3` y `6`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/subir-archivos-desde-disco",
    "remember": "El contexto cierra el archivo incluso si la petición falla.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/subir-archivos-desde-disco/1",
        "title": "Subir un CSV temporal",
        "language": "python",
        "code": "with TemporaryDirectory() as tmp:\n    p = Path(tmp) / \"ventas.csv\"\n    p.write_text(\"id,importe\\n1,800\\n\")\n    with demo() as c, p.open(\"rb\") as f:\n        r = c.post(\"/echo\", files={\"file\": (p.name, f, \"text/csv\")})\n        print(p.name in r.json()[\"body\"])",
        "hint": "El contexto cierra el archivo incluso si la petición falla.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/streaming-y-archivos/iter-text",
    "remember": "Usa iter_lines si necesitas registros delimitados por salto de línea.",
    "examples": [
      {
        "id": "httpx/streaming-y-archivos/iter-text/1",
        "title": "Leer bloques de texto",
        "language": "python",
        "code": "with demo() as c, c.stream(\"GET\", \"/csv\") as r:\n    print(\"\".join(r.iter_text()).splitlines()[0])",
        "hint": "Usa iter_lines si necesitas registros delimitados por salto de línea.",
        "textOutput": "`id,importe`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
