// Generado desde specs/json.md por scripts/prepare-json-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/json/seguridad-y-terminal/definicion",
    "remember": "No uses `eval` para interpretar JSON.",
    "examples": [
      {
        "id": "json/seguridad-y-terminal/definicion/1",
        "title": "Interpretar datos sin evaluar código",
        "language": "python",
        "code": "try:\n    json.loads('1 + 2')\nexcept json.JSONDecodeError:\n    print(\"No es JSON\")",
        "hint": "Una expresión Python no se ejecuta como JSON.",
        "textOutput": "`No es JSON`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/seguridad-y-terminal/limites",
    "remember": "Un límite de tamaño ayuda, pero no reemplaza otros controles de recursos.",
    "examples": [
      {
        "id": "json/seguridad-y-terminal/limites/1",
        "title": "Rechazar un archivo demasiado grande",
        "language": "python",
        "code": "limite = 100\nwith open(ruta, \"rb\") as f:\n    contenido = f.read(limite + 1)\nif len(contenido) > limite:\n    print(\"Excede el límite\")\nelse:\n    print(json.loads(contenido))",
        "hint": "No se lee más del límite más un byte.",
        "textOutput": "`Excede el límite`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/seguridad-y-terminal/json-tool",
    "remember": "La validación del parser no comprueba reglas del negocio ni todos los requisitos de JSON estricto.",
    "note": "En Python 3.14+ también se admite `python -m json`. Usa `python3` si ese es el nombre de tu intérprete.",
    "examples": [
      {
        "id": "json/seguridad-y-terminal/json-tool/1",
        "title": "Formatear un archivo",
        "language": "bash",
        "code": "python -m json.tool json_practica/pedidos.json",
        "hint": "Usa la ruta creada en Datos compartidos desde el mismo directorio. Ejecuta este comando en una terminal con Python.",
        "textOutput": "El arreglo de tres pedidos aparece formateado en la terminal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/json/seguridad-y-terminal/opciones-json-tool",
    "remember": "Consulta `--help` para las opciones disponibles en tu versión.",
    "examples": [
      {
        "id": "json/seguridad-y-terminal/opciones-json-tool/1",
        "title": "Formatear registros JSONL",
        "language": "bash",
        "code": "python -m json.tool --json-lines --compact json_practica/pedidos.jsonl",
        "hint": "Cada línea se valida y se emite compactada. Ejecuta este comando en una terminal con Python.",
        "textOutput": "Tres líneas: `{\"id\":101,\"monto\":120.5}`, `{\"id\":102,\"monto\":80}`, `{\"id\":103,\"monto\":50}`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
