// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/definicion",
    "remember": "Vacío no equivale siempre a cero ni a \"\".",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/definicion/1",
        "title": "Comprobar país faltante",
        "language": "excel",
        "code": "=ISBLANK(Customers!C5)",
        "hint": "Vacío no equivale siempre a cero ni a \"\".",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/isblank-y-texto-vacio",
    "remember": "Una fórmula que devuelve \"\" no es una celda vacía.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/isblank-y-texto-vacio/1",
        "title": "Distinguir blancos",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1 déjala vacía y en A2 escribe =\"\"; en B1:B2 usa ISBLANK sobre A1 y A2. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "TRUE, FALSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/isnumber-istext-e-islogical",
    "remember": "Un número guardado como texto no es numérico.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/isnumber-istext-e-islogical/1",
        "title": "Validar tipos",
        "language": "excel",
        "code": "=ISNUMBER(Sales!I2)\n=ISTEXT(Sales!C2)\n=ISLOGICAL(2>1)",
        "hint": "Un número guardado como texto no es numérico.",
        "textOutput": "TRUE, TRUE, TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/iferror",
    "remember": "No ocultes problemas de datos sin investigar.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/iferror/1",
        "title": "Evitar división por cero",
        "language": "excel",
        "code": "=IFERROR(100/0,\"Sin base\")",
        "hint": "No ocultes problemas de datos sin investigar.",
        "textOutput": "Sin base.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/ifna-isna-e-iserror",
    "remember": "#N/A suele indicar que no se encontró una coincidencia.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/ifna-isna-e-iserror/1",
        "title": "Tratar error de búsqueda",
        "language": "excel",
        "code": "=IFNA(NA(),\"No encontrado\")\n=ISERROR(1/0)",
        "hint": "#N/A suele indicar que no se encontró una coincidencia.",
        "textOutput": "No encontrado; TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/errores-frecuentes",
    "remember": "Revisa referencias, tipos y argumentos antes de usar IFERROR.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/errores-frecuentes/1",
        "title": "Identificar denominador inválido",
        "language": "excel",
        "code": "=5/0",
        "hint": "Revisa referencias, tipos y argumentos antes de usar IFERROR.",
        "textOutput": "#DIV/0!.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/value-y-numbervalue",
    "remember": "No conviertas identificadores que necesitan ceros iniciales.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/value-y-numbervalue/1",
        "title": "Convertir importe",
        "language": "excel",
        "code": "=NUMBERVALUE(\"1.200,50\",\",\",\".\")",
        "hint": "No conviertas identificadores que necesitan ceros iniciales.",
        "textOutput": "1200.5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/nulos-tipos-y-errores/text",
    "remember": "TEXT devuelve texto, no un número apto para sumas.",
    "note": "Los códigos de formato de fecha también pueden localizarse, por ejemplo aaaa en lugar de yyyy en algunas instalaciones en español.",
    "examples": [
      {
        "id": "excel/nulos-tipos-y-errores/text/1",
        "title": "Etiquetar mes",
        "language": "excel",
        "code": "=TEXT(Sales!B2,\"yyyy-mm\")",
        "hint": "TEXT devuelve texto, no un número apto para sumas.",
        "textOutput": "2026-01.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
