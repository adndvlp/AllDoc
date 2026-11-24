// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/definicion",
    "remember": "Los hooks actúan durante la deserialización, no después.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/definicion/1",
        "title": "Decodificar dinero como Decimal",
        "language": "python",
        "code": "from decimal import Decimal\nv = json.loads('120.50', parse_float=Decimal)\nprint(type(v).__name__, v)",
        "hint": "El número se interpreta directamente como decimal.",
        "textOutput": "`Decimal 120.50`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/parse-float",
    "remember": "Usa `Decimal` cuando necesites aritmética decimal exacta.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/parse-float/1",
        "title": "Sumar importes sin aproximación binaria",
        "language": "python",
        "code": "from decimal import Decimal\nv = json.loads('[0.1, 0.2]', parse_float=Decimal)\nprint(sum(v))",
        "hint": "Los valores son decimales desde el origen.",
        "textOutput": "`0.3`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/parse-int",
    "remember": "No afecta a números decimales ni a booleanos.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/parse-int/1",
        "title": "Convertir enteros en Decimal",
        "language": "python",
        "code": "from decimal import Decimal\nv = json.loads('{\"id\": 101, \"monto\": 80}', parse_int=Decimal)\nprint(type(v[\"id\"]).__name__)",
        "hint": "El identificador también cambia de tipo; úsalo solo si lo deseas.",
        "textOutput": "`Decimal`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/parse-constant",
    "remember": "`allow_nan=False` controla escritura; `parse_constant` permite controlar lectura.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/parse-constant/1",
        "title": "Rechazar constantes especiales",
        "language": "python",
        "code": "def rechazar(valor):\n    raise ValueError(valor)\ntry:\n    json.loads('{\"monto\": NaN}', parse_constant=rechazar)\nexcept ValueError as e:\n    print(e)",
        "hint": "La función impide que el token se convierta a float.",
        "textOutput": "`NaN`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/object-hook",
    "remember": "Los objetos anidados también pasan por el hook.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/object-hook/1",
        "title": "Normalizar el estado de un pedido",
        "language": "python",
        "code": "def normalizar(d):\n    if \"estado\" in d:\n        d[\"estado\"] = d[\"estado\"].lower()\n    return d\nprint(json.loads('{\"estado\":\"COMPLETED\"}', object_hook=normalizar))",
        "hint": "Se normaliza el campo durante la lectura.",
        "textOutput": "`{'estado': 'completed'}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/object-pairs-hook",
    "remember": "Comprueba claves repetidas antes de perderlas.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/object-pairs-hook/1",
        "title": "Rechazar claves repetidas",
        "language": "python",
        "code": "def sin_duplicados(pares):\n    d = {}\n    for clave, valor in pares:\n        if clave in d:\n            raise ValueError(f\"Duplicada: {clave}\")\n        d[clave] = valor\n    return d\ntry:\n    json.loads('{\"id\": 1, \"id\": 2}', object_pairs_hook=sin_duplicados)\nexcept ValueError as e:\n    print(e)",
        "hint": "La segunda aparición provoca un error.",
        "textOutput": "`Duplicada: id`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/decodificacion-personalizada/strict",
    "remember": "Mantén el valor predeterminado `True` salvo necesidad específica.",
    "examples": [
      {
        "id": "json/decodificacion-personalizada/strict/1",
        "title": "Leer un salto de línea literal",
        "language": "python",
        "code": "s = '\"A\\nB\"'\ntry:\n    json.loads(s)\nexcept json.JSONDecodeError:\n    print(\"Rechazado\")\nprint(repr(json.loads(s, strict=False)))",
        "hint": "La cadena contiene un salto real sin escape JSON.",
        "textOutput": "`Rechazado` y luego `'A\\nB'`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
