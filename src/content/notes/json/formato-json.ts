// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/formato-json/definicion",
    "remember": "JSON es texto; un `dict` es un objeto Python.",
    "examples": [
      {
        "id": "json/formato-json/definicion/1",
        "title": "Distinguir texto de diccionario",
        "language": "python",
        "code": "import json\nvalor = '{\"id\": 101}'\nprint(type(valor).__name__, type(json.loads(valor)).__name__)",
        "hint": "`loads` interpreta el texto.",
        "textOutput": "`str dict`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-json/objetos-y-arreglos",
    "remember": "`{}` representa un objeto y `[]` un arreglo.",
    "examples": [
      {
        "id": "json/formato-json/objetos-y-arreglos/1",
        "title": "Representar un pedido",
        "language": "json",
        "code": "{\"id\": 101, \"items\": [{\"sku\": \"A1\", \"cantidad\": 2}]}",
        "hint": "El pedido tiene un arreglo de objetos de producto.",
        "textOutput": "Documento válido con dos claves y un item.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-json/tipos",
    "remember": "Las palabras JSON se escriben en minúsculas; en Python no.",
    "examples": [
      {
        "id": "json/formato-json/tipos/1",
        "title": "Identificar tipos",
        "language": "python",
        "code": "v = json.loads('[{}, [], \"Ana\", 2, 2.5, true, false, null]')\nprint([type(x).__name__ for x in v])",
        "hint": "Cada valor se convierte según su tipo.",
        "textOutput": "`['dict', 'list', 'str', 'int', 'float', 'bool', 'bool', 'NoneType']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-json/sintaxis",
    "remember": "No confundas la sintaxis de un literal Python con JSON.",
    "examples": [
      {
        "id": "json/formato-json/sintaxis/1",
        "title": "Leer un escalar",
        "language": "python",
        "code": "print(json.loads('42'))\nprint(json.loads('\"MX\"'))",
        "hint": "No se requieren llaves en la raíz.",
        "textOutput": "Dos líneas: `42` y `MX`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/formato-json/heterogeneas",
    "remember": "Valida la estructura que necesita tu análisis.",
    "examples": [
      {
        "id": "json/formato-json/heterogeneas/1",
        "title": "Ver campos diferentes",
        "language": "python",
        "code": "datos = json.loads('[{\"id\": 1}, {\"id\": 2, \"monto\": 10}, null]')\nprint([type(x).__name__ for x in datos])",
        "hint": "El formato permite un nulo junto a objetos.",
        "textOutput": "`['dict', 'dict', 'NoneType']`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
