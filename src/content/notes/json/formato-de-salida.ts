// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/formato-de-salida/definicion",
    "remember": "La presentación y el contenido son decisiones distintas.",
    "examples": [
      {
        "id": "json/formato-de-salida/definicion/1",
        "title": "Comparar dos representaciones",
        "language": "python",
        "code": "obj = {\"id\": 101}\na = json.dumps(obj)\nb = json.dumps(obj, indent=2)\nprint(a == b, json.loads(a) == json.loads(b))",
        "hint": "Las cadenas difieren, los objetos no.",
        "textOutput": "`False True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-de-salida/indent",
    "remember": "Usa `indent=2` para lectura humana.",
    "examples": [
      {
        "id": "json/formato-de-salida/indent/1",
        "title": "Formatear un pedido",
        "language": "python",
        "code": "print(json.dumps({\"id\": 101}, indent=2))",
        "hint": "El par se presenta en su propia línea.",
        "textOutput": "Tres líneas: `{`, dos espacios seguidos de `\"id\": 101`, y `}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-de-salida/ensure-ascii",
    "remember": "No confundir escapes JSON con la codificación del archivo.",
    "examples": [
      {
        "id": "json/formato-de-salida/ensure-ascii/1",
        "title": "Conservar acentos",
        "language": "python",
        "code": "obj = {\"ciudad\": \"México\"}\nprint(json.dumps(obj))\nprint(json.dumps(obj, ensure_ascii=False))",
        "hint": "Ambos textos decodifican al mismo valor.",
        "textOutput": "`{\"ciudad\": \"M\\u00e9xico\"}` y `{\"ciudad\": \"México\"}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-de-salida/sort-keys",
    "remember": "No ordena los elementos de un arreglo.",
    "examples": [
      {
        "id": "json/formato-de-salida/sort-keys/1",
        "title": "Ordenar claves de un registro",
        "language": "python",
        "code": "print(json.dumps({\"monto\": 80, \"id\": 102}, sort_keys=True))",
        "hint": "`id` se escribe antes que `monto`.",
        "textOutput": "`{\"id\": 102, \"monto\": 80}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-de-salida/separators",
    "remember": "Usa `(\",\", \":\")` para quitar espacios innecesarios.",
    "examples": [
      {
        "id": "json/formato-de-salida/separators/1",
        "title": "Compactar un registro",
        "language": "python",
        "code": "print(json.dumps({\"id\": 101, \"monto\": 120.5}, separators=(\",\", \":\")))",
        "hint": "El contenido sigue siendo JSON válido.",
        "textOutput": "`{\"id\":101,\"monto\":120.5}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
