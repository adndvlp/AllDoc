// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/errores-y-validacion/definicion",
    "remember": "Parsear correctamente no garantiza datos correctos.",
    "examples": [
      {
        "id": "json/errores-y-validacion/definicion/1",
        "title": "Detectar estructura inesperada",
        "language": "python",
        "code": "v = json.loads('{\"monto\": \"80\"}')\nprint(isinstance(v[\"monto\"], (int, float)))",
        "hint": "El monto es texto, no número.",
        "textOutput": "`False`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/json-decode-error",
    "remember": "Captura la excepción específica cuando quieras manejar JSON inválido.",
    "examples": [
      {
        "id": "json/errores-y-validacion/json-decode-error/1",
        "title": "Detectar una coma final",
        "language": "python",
        "code": "try:\n    json.loads('{\"id\": 101,}')\nexcept json.JSONDecodeError as e:\n    print(type(e).__name__)",
        "hint": "La coma final no es válida.",
        "textOutput": "`JSONDecodeError`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/posicion-del-error",
    "remember": "Inspecciona línea y columna antes de corregir.",
    "examples": [
      {
        "id": "json/errores-y-validacion/posicion-del-error/1",
        "title": "Localizar un valor faltante",
        "language": "python",
        "code": "try:\n    json.loads('{\"id\": }')\nexcept json.JSONDecodeError as e:\n    print(e.pos, e.lineno, e.colno)",
        "hint": "El cierre aparece donde se esperaba un valor.",
        "textOutput": "`7 1 8`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/errores-de-archivo",
    "remember": "Distingue un problema de archivo de uno de sintaxis.",
    "examples": [
      {
        "id": "json/errores-y-validacion/errores-de-archivo/1",
        "title": "Capturar errores de lectura",
        "language": "python",
        "code": "try:\n    with open(carpeta / \"no_existe.json\", encoding=\"utf-8\") as f:\n        json.load(f)\nexcept FileNotFoundError:\n    print(\"Archivo ausente\")\ntry:\n    json.loads(b'\"\\xff\"')\nexcept UnicodeDecodeError:\n    print(\"Codificación inválida\")",
        "hint": "El primer archivo no debe existir; los bytes del segundo caso son inválidos en UTF-8.",
        "textOutput": "`Archivo ausente` y `Codificación inválida`, en líneas separadas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/type-error-y-key-error",
    "remember": "No confundas acceso a datos con serialización.",
    "examples": [
      {
        "id": "json/errores-y-validacion/type-error-y-key-error/1",
        "title": "Distinguir dos errores",
        "language": "python",
        "code": "try:\n    json.dumps({\"tags\": {\"a\", \"b\"}})\nexcept TypeError:\n    print(\"Tipo incompatible\")\ntry:\n    print(pedidos[2][\"cliente\"][\"ciudad\"])\nexcept KeyError:\n    print(\"Clave ausente\")",
        "hint": "Un conjunto no se serializa directamente y Eva no tiene clave ciudad.",
        "textOutput": "`Tipo incompatible` y `Clave ausente`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/nulos-y-ausentes",
    "remember": "Usa `in` para existencia y `is None` para nulos.",
    "examples": [
      {
        "id": "json/errores-y-validacion/nulos-y-ausentes/1",
        "title": "Distinguir ciudades",
        "language": "python",
        "code": "for p in pedidos:\n    c = p[\"cliente\"]\n    if \"ciudad\" not in c:\n        estado = \"ausente\"\n    elif c[\"ciudad\"] is None:\n        estado = \"nula\"\n    else:\n        estado = \"presente\"\n    print(p[\"id\"], estado)",
        "hint": "Se distinguen los tres casos.",
        "textOutput": "`101 presente`, `102 nula`, `103 ausente`, en tres líneas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/validar-tipos",
    "remember": "Comprueba que el registro sea un diccionario antes de acceder a sus claves.",
    "examples": [
      {
        "id": "json/errores-y-validacion/validar-tipos/1",
        "title": "Separar registros válidos",
        "language": "python",
        "code": "datos = [{\"id\": 1, \"monto\": 50}, {\"id\": 2}, {\"id\": 3, \"monto\": \"90\"}]\nvalidos = [p for p in datos if isinstance(p, dict)\n           and \"id\" in p and type(p.get(\"monto\")) in (int, float)]\nprint([p[\"id\"] for p in validos])",
        "hint": "La prueba de tipo exacto evita aceptar booleanos como enteros.",
        "textOutput": "`[1]`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/limpieza-de-tipos",
    "remember": "No reemplaces datos inválidos por cero sin una regla de negocio.",
    "examples": [
      {
        "id": "json/errores-y-validacion/limpieza-de-tipos/1",
        "title": "Limpiar montos",
        "language": "python",
        "code": "datos = [{\"monto\": \"80.5\"}, {\"monto\": \"N/A\"}, {\"monto\": None}]\nfor p in datos:\n    try:\n        print(float(p[\"monto\"]))\n    except (TypeError, ValueError):\n        print(\"Revisar\")",
        "hint": "Solo el primer monto se convierte.",
        "textOutput": "`80.5`, `Revisar`, `Revisar`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/claves-duplicadas",
    "remember": "Para detectar duplicados usa `object_pairs_hook` (grupo Decodificación personalizada).",
    "examples": [
      {
        "id": "json/errores-y-validacion/claves-duplicadas/1",
        "title": "Observar el último valor",
        "language": "python",
        "code": "print(json.loads('{\"monto\": 80, \"monto\": 90}'))",
        "hint": "La primera aparición se pierde al formar el diccionario.",
        "textOutput": "`{'monto': 90}`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/errores-y-validacion/json-schema",
    "remember": "Un esquema valida datos ya deserializados; no sustituye al parser.",
    "note": "Requiere `pip install jsonschema`.",
    "examples": [
      {
        "id": "json/errores-y-validacion/json-schema/1",
        "title": "Validar monto y clave obligatoria",
        "language": "python",
        "code": "from jsonschema import validate, ValidationError\nesquema = {\"type\": \"object\", \"required\": [\"monto\"],\n           \"properties\": {\"monto\": {\"type\": \"number\"}}}\nfor dato in ({\"monto\": 80}, {\"monto\": \"80\"}, {}):\n    try:\n        validate(dato, esquema)\n        print(\"Válido\")\n    except ValidationError:\n        print(\"Inválido\")",
        "hint": "La segunda entrada tiene un tipo incorrecto y la tercera carece del campo. Requiere jsonschema en tu entorno de Python.",
        "textOutput": "`Válido`, `Inválido`, `Inválido`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
