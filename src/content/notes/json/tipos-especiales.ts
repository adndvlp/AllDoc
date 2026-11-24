// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/tipos-especiales/definicion",
    "remember": "JSON no conserva automáticamente clases ni tipos específicos de Python.",
    "examples": [
      {
        "id": "json/tipos-especiales/definicion/1",
        "title": "Convertir una tupla",
        "language": "python",
        "code": "v = (101, 120.5)\nprint(type(json.loads(json.dumps(v))).__name__)",
        "hint": "La tupla se escribe como arreglo.",
        "textOutput": "`list`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/tuplas-y-claves",
    "remember": "Usa claves `str` cuando quieras conservarlas tal cual.",
    "examples": [
      {
        "id": "json/tipos-especiales/tuplas-y-claves/1",
        "title": "Comprobar cambios de tipos",
        "language": "python",
        "code": "v = {101: (\"Ana\", 80)}\nprint(json.loads(json.dumps(v)))",
        "hint": "La clave se convierte en texto y el valor en lista.",
        "textOutput": "`{'101': ['Ana', 80]}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/skipkeys",
    "remember": "Omitir claves puede provocar pérdida silenciosa de datos.",
    "examples": [
      {
        "id": "json/tipos-especiales/skipkeys/1",
        "title": "Omitir una clave tupla",
        "language": "python",
        "code": "obj = {(\"MX\", 101): 80, \"total\": 80}\nprint(json.dumps(obj, skipkeys=True))",
        "hint": "La clave tupla no se representa.",
        "textOutput": "`{\"total\": 80}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/default",
    "remember": "No uses `default=str` indiscriminadamente si necesitas preservar tipos.",
    "examples": [
      {
        "id": "json/tipos-especiales/default/1",
        "title": "Convertir conjuntos",
        "language": "python",
        "code": "def convertir(obj):\n    if isinstance(obj, set):\n        return sorted(obj)\n    raise TypeError(\"Tipo no soportado\")\nprint(json.dumps({\"canales\": {\"web\", \"app\"}}, default=convertir))",
        "hint": "El conjunto se representa mediante una lista ordenada.",
        "textOutput": "`{\"canales\": [\"app\", \"web\"]}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/datetime",
    "remember": "La lectura posterior devuelve texto salvo que lo conviertas explícitamente.",
    "examples": [
      {
        "id": "json/tipos-especiales/datetime/1",
        "title": "Exportar y recuperar una fecha",
        "language": "python",
        "code": "from datetime import date\ns = json.dumps({\"fecha\": date(2026, 9, 14).isoformat()})\nfecha = date.fromisoformat(json.loads(s)[\"fecha\"])\nprint(s, fecha.year)",
        "hint": "Se aplica una conversión explícita en ambos sentidos.",
        "textOutput": "`{\"fecha\": \"2026-09-14\"} 2026`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/decimal",
    "remember": "Convertir a `float` puede perder precisión.",
    "examples": [
      {
        "id": "json/tipos-especiales/decimal/1",
        "title": "Preservar un importe como texto",
        "language": "python",
        "code": "from decimal import Decimal\nmonto = Decimal(\"120.50\")\ns = json.dumps({\"monto\": str(monto)})\nprint(s, Decimal(json.loads(s)[\"monto\"]))",
        "hint": "El formato de intercambio define el importe como cadena.",
        "textOutput": "`{\"monto\": \"120.50\"} 120.50`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/objetos-personalizados",
    "remember": "JSON no reconstruye instancias automáticamente.",
    "examples": [
      {
        "id": "json/tipos-especiales/objetos-personalizados/1",
        "title": "Convertir un pedido de una clase",
        "language": "python",
        "code": "from dataclasses import dataclass, asdict\n@dataclass\nclass Pedido:\n    id: int\n    monto: int\nprint(json.dumps(asdict(Pedido(101, 120))))",
        "hint": "`asdict` prepara un diccionario antes de serializar.",
        "textOutput": "`{\"id\": 101, \"monto\": 120}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/allow-nan",
    "remember": "Para intercambio interoperable, decide cómo tratar no finitos antes de exportar.",
    "examples": [
      {
        "id": "json/tipos-especiales/allow-nan/1",
        "title": "Rechazar un valor no finito",
        "language": "python",
        "code": "try:\n    json.dumps({\"monto\": float(\"nan\")}, allow_nan=False)\nexcept ValueError:\n    print(\"Monto no finito\")",
        "hint": "El codificador rechaza el valor especial.",
        "textOutput": "`Monto no finito`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/tipos-especiales/check-circular",
    "remember": "Representa relaciones cíclicas mediante identificadores, no referencias al mismo objeto.",
    "examples": [
      {
        "id": "json/tipos-especiales/check-circular/1",
        "title": "Detectar un ciclo",
        "language": "python",
        "code": "v = []\nv.append(v)\ntry:\n    json.dumps(v)\nexcept ValueError as e:\n    print(str(e))",
        "hint": "La lista contiene una referencia a sí misma.",
        "textOutput": "`Circular reference detected`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
