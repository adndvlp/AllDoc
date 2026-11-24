// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/definicion",
    "remember": "Las funciones `dumps` y `loads` son la interfaz habitual.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/definicion/1",
        "title": "Usar una instancia",
        "language": "python",
        "code": "encoder = json.JSONEncoder()\ndecoder = json.JSONDecoder()\nprint(decoder.decode(encoder.encode({\"id\": 101})))",
        "hint": "Se realiza la ida y vuelta con métodos de las clases.",
        "textOutput": "`{'id': 101}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/encode",
    "remember": "No confundir con `str.encode`, que convierte texto en bytes.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/encode/1",
        "title": "Codificar un monto",
        "language": "python",
        "code": "encoder = json.JSONEncoder(separators=(\",\", \":\"))\nprint(encoder.encode({\"monto\": 80}))",
        "hint": "La instancia conserva la configuración compacta.",
        "textOutput": "`{\"monto\":80}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/decode",
    "remember": "El documento completo debe ser válido.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/decode/1",
        "title": "Recuperar un importe",
        "language": "python",
        "code": "decoder = json.JSONDecoder()\nprint(decoder.decode('{\"monto\": 80}')[\"monto\"])",
        "hint": "El diccionario devuelto permite acceder por clave.",
        "textOutput": "`80`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/iterencode",
    "remember": "Reduce la necesidad de construir una única cadena grande, pero el objeto fuente sigue en memoria.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/iterencode/1",
        "title": "Unir fragmentos",
        "language": "python",
        "code": "encoder = json.JSONEncoder()\nfragmentos = encoder.iterencode(resumen)\ns = \"\".join(fragmentos)\nprint(json.loads(s) == resumen)",
        "hint": "Los fragmentos concatenados forman un documento.",
        "textOutput": "`True`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/raw-decode",
    "remember": "Empieza en el índice de un valor; no omite automáticamente espacios iniciales.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/raw-decode/1",
        "title": "Leer un objeto al inicio de un texto",
        "language": "python",
        "code": "v, fin = json.JSONDecoder().raw_decode('{\"id\":1} resto')\nprint(v, fin)",
        "hint": "El sufijo no se interpreta.",
        "textOutput": "`{'id': 1} 8`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/cls-encoder",
    "remember": "Llama a `super().default(obj)` si no reconoces el tipo.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/cls-encoder/1",
        "title": "Serializar fechas automáticamente",
        "language": "python",
        "code": "from datetime import date\nclass EncoderFecha(json.JSONEncoder):\n    def default(self, obj):\n        if isinstance(obj, date):\n            return obj.isoformat()\n        return super().default(obj)\nprint(json.dumps({\"fecha\": date(2026, 9, 14)}, cls=EncoderFecha))",
        "hint": "La clase define la conversión de fechas.",
        "textOutput": "`{\"fecha\": \"2026-09-14\"}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/encoder-y-decoder/cls-decoder",
    "remember": "Mantén los argumentos compatibles con la clase base.",
    "examples": [
      {
        "id": "json/encoder-y-decoder/cls-decoder/1",
        "title": "Crear un decodificador decimal",
        "language": "python",
        "code": "from decimal import Decimal\nclass DecoderDinero(json.JSONDecoder):\n    def __init__(self, **kwargs):\n        kwargs.setdefault(\"parse_float\", Decimal)\n        super().__init__(**kwargs)\nv = json.loads('12.50', cls=DecoderDinero)\nprint(type(v).__name__, v)",
        "hint": "La subclase establece un tratamiento decimal predeterminado.",
        "textOutput": "`Decimal 12.50`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
