// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/deserializacion/definicion",
    "remember": "`loads` recibe contenido; `load` recibe un archivo abierto.",
    "examples": [
      {
        "id": "json/deserializacion/definicion/1",
        "title": "Obtener registros",
        "language": "python",
        "code": "datos = json.loads(texto)\nprint(len(datos), datos[0][\"id\"])",
        "hint": "El arreglo pasa a ser una lista.",
        "textOutput": "`3 101`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/deserializacion/loads",
    "remember": "No le pases la ruta de un archivo como si fuera su contenido.",
    "examples": [
      {
        "id": "json/deserializacion/loads/1",
        "title": "Leer texto",
        "language": "python",
        "code": "datos = json.loads('{\"monto\": 120.5}')\nprint(datos[\"monto\"])",
        "hint": "Se obtiene un diccionario.",
        "textOutput": "`120.5`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/deserializacion/load",
    "remember": "Primero abre el archivo en modo lectura.",
    "examples": [
      {
        "id": "json/deserializacion/load/1",
        "title": "Leer pedidos",
        "language": "python",
        "code": "with open(ruta, \"r\", encoding=\"utf-8\") as f:\n    datos = json.load(f)\nprint(len(datos))",
        "hint": "`with` cierra el archivo al salir del bloque.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/deserializacion/tipos-de-entrada",
    "remember": "El texto ya decodificado no necesita `.decode()`.",
    "examples": [
      {
        "id": "json/deserializacion/tipos-de-entrada/1",
        "title": "Leer respuesta binaria",
        "language": "python",
        "code": "s = '{\"id\": 101}'\nfor entrada in (s, s.encode(\"utf-8\"), bytearray(s.encode(\"utf-8\"))):\n    print(json.loads(entrada)[\"id\"])",
        "hint": "Las tres entradas representan lo mismo.",
        "textOutput": "Tres líneas con `101`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
