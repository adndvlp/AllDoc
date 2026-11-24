// Generado desde specs/requests.md por scripts/prepare-requests-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/definicion",
    "remember": "Cierra una respuesta de streaming aunque no consumas todo.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/definicion/1",
        "title": "Descargar por fragmentos",
        "language": "python",
        "code": "with requests.get(BASE + \"/csv\", stream=True, timeout=5) as r:\n    r.raise_for_status()\n    data = b\"\".join(r.iter_content(chunk_size=8))\nprint(data.decode().splitlines()[0])",
        "hint": "Cierra una respuesta de streaming aunque no consumas todo.",
        "textOutput": "id,amount. Para archivos grandes escribe los fragmentos en disco en vez de unirlos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/guardar-archivo",
    "remember": "Comprueba el estado antes de escribir; el nombre local lo eliges tú.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/guardar-archivo/1",
        "title": "Guardar un CSV en una carpeta temporal",
        "language": "python",
        "code": "from pathlib import Path\nfrom tempfile import TemporaryDirectory\nr = requests.get(BASE + \"/csv\", timeout=5)\nr.raise_for_status()\nwith TemporaryDirectory() as folder:\n    path = Path(folder) / \"orders.csv\"\n    path.write_bytes(r.content)\n    print(path.read_text().splitlines()[0])",
        "hint": "Comprueba el estado antes de escribir; el nombre local lo eliges tú.",
        "textOutput": "id,amount; el archivo temporal se elimina al salir.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/iter-content",
    "remember": "Usa with y escribe cada fragmento no vacío.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/iter-content/1",
        "title": "Guardar por bloques",
        "language": "python",
        "code": "from tempfile import TemporaryFile\nwith requests.get(BASE + \"/csv\", stream=True, timeout=5) as r, TemporaryFile() as f:\n    r.raise_for_status()\n    for chunk in r.iter_content(chunk_size=8):\n        if chunk:\n            f.write(chunk)\n    print(f.tell())",
        "hint": "Usa with y escribe cada fragmento no vacío.",
        "textOutput": "26 bytes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/iter-lines",
    "remember": "No invoques iter_lines varias veces sobre el mismo flujo.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/iter-lines/1",
        "title": "Procesar registros NDJSON",
        "language": "python",
        "code": "import json\nwith requests.get(BASE + \"/lines\", stream=True, timeout=5) as r:\n    r.raise_for_status()\n    r.encoding = \"utf-8\"\n    for line in r.iter_lines(decode_unicode=True):\n        if line:\n            print(json.loads(line)[\"id\"])",
        "hint": "No invoques iter_lines varias veces sobre el mismo flujo.",
        "textOutput": "101 y 102, en líneas separadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/raw",
    "remember": "No mezcles lecturas del mismo flujo sin comprender su posición.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/raw/1",
        "title": "Leer cabecera gzip original",
        "language": "python",
        "code": "with requests.get(BASE + \"/gzip\", stream=True, timeout=5) as r:\n    r.raise_for_status()\n    print(r.raw.read(2).hex())",
        "hint": "No mezcles lecturas del mismo flujo sin comprender su posición.",
        "textOutput": "1f8b, firma gzip.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/metadatos-archivo",
    "remember": "No confíes en rutas o nombres proporcionados por un servidor.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/metadatos-archivo/1",
        "title": "Consultar metadatos sin descargar",
        "language": "python",
        "code": "r = requests.head(BASE + \"/csv\", timeout=5)\nprint(r.headers[\"Content-Disposition\"], len(r.content))",
        "hint": "No confíes en rutas o nombres proporcionados por un servidor.",
        "textOutput": "attachment; filename=\"orders.csv\" y 0 bytes de cuerpo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/requests/archivos-y-streaming/stream-upload",
    "remember": "Abre archivos en modo binario; el servidor debe aceptar el formato.",
    "note": "La demo admite Content-Length, no transferencias de subida chunked. Para multipart streaming suele usarse requests-toolbelt.",
    "examples": [
      {
        "id": "requests/archivos-y-streaming/stream-upload/1",
        "title": "Enviar un flujo de longitud conocida",
        "language": "python",
        "code": "from tempfile import TemporaryFile\nwith TemporaryFile() as f:\n    f.write(b\"id,amount\\n101,800\\n\")\n    f.seek(0)\n    r = requests.post(BASE + \"/echo\", data=f, headers={\"Content-Type\": \"text/csv\"}, timeout=5)\n    print(r.json()[\"body\"].splitlines()[0])",
        "hint": "Abre archivos en modo binario; el servidor debe aceptar el formato.",
        "textOutput": "id,amount.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
