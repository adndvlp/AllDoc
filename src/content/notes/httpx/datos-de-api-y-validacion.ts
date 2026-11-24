// Generado desde specs/httpx.md por scripts/prepare-httpx-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/definicion",
    "remember": "Comprueba el contrato y el estado antes de transformar.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/definicion/1",
        "title": "Extraer un campo JSON anidado",
        "language": "python",
        "code": "with demo() as c:\n    d = c.get(\"/pedidos\").raise_for_status().json()\n    print(d[\"items\"][0][\"cliente\"])",
        "hint": "Comprueba el contrato y el estado antes de transformar.",
        "textOutput": "`Ana`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/json-anidado-y-modulo-json",
    "remember": "No confundas un diccionario Python con texto JSON.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/json-anidado-y-modulo-json/1",
        "title": "Serializar una respuesta para guardarla",
        "language": "python",
        "code": "with demo() as c:\n    d = c.get(\"/pedidos/1\").json()\n    texto = json.dumps(d, ensure_ascii=False)\n    print(json.loads(texto)[\"id\"])",
        "hint": "No confundas un diccionario Python con texto JSON.",
        "textOutput": "`1`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/validacion-de-estructura",
    "remember": "Un 200 no garantiza que existan los campos esperados.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/validacion-de-estructura/1",
        "title": "Validar una página de pedidos",
        "language": "python",
        "code": "with demo() as c:\n    d = c.get(\"/pedidos\").raise_for_status().json()\n    if not isinstance(d, dict) or not isinstance(d.get(\"items\"), list):\n        raise ValueError(\"esquema inesperado\")\n    for fila in d[\"items\"]:\n        if not isinstance(fila, dict) or not isinstance(fila.get(\"id\"), int):\n            raise ValueError(\"id inválido\")\n    print(\"válido\")",
        "hint": "Un 200 no garantiza que existan los campos esperados.",
        "textOutput": "`válido`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/csv-xml-y-html",
    "remember": "No uses response.json() para un CSV.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/csv-xml-y-html/1",
        "title": "Interpretar CSV devuelto por una API",
        "language": "python",
        "code": "import csv, io\nwith demo() as c:\n    r = c.get(\"/csv\").raise_for_status()\n    filas = list(csv.DictReader(io.StringIO(r.text)))\n    print(filas[0])",
        "hint": "No uses response.json() para un CSV.",
        "textOutput": "`{'id': '1', 'importe': '800'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/rest-y-graphql",
    "remember": "GraphQL puede devolver HTTP 200 con una lista `errors`.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/rest-y-graphql/1",
        "title": "Consultar un campo GraphQL",
        "language": "python",
        "code": "with demo() as c:\n    r = c.post(\"/graphql\", json={\"query\": \"{ pedidos { id } }\"}).raise_for_status()\n    d = r.json()\n    if d.get(\"errors\"):\n        raise ValueError(d[\"errors\"])\n    print(d[\"data\"][\"pedidos\"])",
        "hint": "GraphQL puede devolver HTTP 200 con una lista `errors`.",
        "textOutput": "`[{'id': 1}]`; el servidor simulado no ejecuta GraphQL.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/interpretar-xml",
    "remember": "Para XML no confiable considera un parser endurecido, como defusedxml, según el origen.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/interpretar-xml/1",
        "title": "Leer importe de una respuesta XML simulada",
        "language": "python",
        "code": "import xml.etree.ElementTree as ET\nr = httpx.Response(200, content=b\"<pedido><importe>800</importe></pedido>\")\nprint(int(ET.fromstring(r.content).findtext(\"importe\")))",
        "hint": "Para XML no confiable considera un parser endurecido, como defusedxml, según el origen.",
        "textOutput": "`800`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/httpx/datos-de-api-y-validacion/interpretar-html",
    "remember": "Para scraping revisa permisos, condiciones de uso y límites del sitio.",
    "note": "Requiere `python -m pip install beautifulsoup4`.",
    "examples": [
      {
        "id": "httpx/datos-de-api-y-validacion/interpretar-html/1",
        "title": "Extraer un importe de HTML simulado",
        "language": "python",
        "code": "from bs4 import BeautifulSoup\nr = httpx.Response(200, text='<p class=\"importe\">800</p>')\nsoup = BeautifulSoup(r.text, \"html.parser\")\nprint(soup.select_one(\".importe\").get_text())",
        "hint": "Para scraping revisa permisos, condiciones de uso y límites del sitio.",
        "textOutput": "`800`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
