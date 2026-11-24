// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/definicion",
    "remember": "Comprueba qué representa una fila después del cambio.",
    "examples": [
      {
        "id": "powerbi/agrupar-y-cambiar-forma/definicion/1",
        "title": "Resumir cantidades",
        "code": "",
        "steps": [
          "En referencia de Pedidos, Agrupar por Estado, suma Cantidad."
        ],
        "external": true,
        "hint": "",
        "textOutput": "completed: 11; cancelled: 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/group-by",
    "remember": "Una fila por combinación de claves.",
    "examples": [
      {
        "id": "powerbi/agrupar-y-cambiar-forma/group-by/1",
        "title": "Contar pedidos por cliente",
        "code": "",
        "steps": [
          "En Pedidos de referencia, Agrupar por ClienteID, operación Contar filas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cliente 1: 3; 2: 2; 3: 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/unpivot",
    "remember": "Útil para transformar meses en filas.",
    "examples": [
      {
        "id": "powerbi/agrupar-y-cambiar-forma/unpivot/1",
        "title": "Normalizar presupuesto",
        "code": "",
        "steps": [
          "En PresupuestoAncho selecciona Categoria > Anular dinamización de otras columnas.",
          "Renombra Attribute a Mes y Value a Meta."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro filas: Tecnología enero 150, febrero 200; Muebles enero 100, febrero 300 (nombres del dataset sin acento).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/pivot",
    "remember": "Antes de pivotar define cómo resolver duplicados.",
    "examples": [
      {
        "id": "powerbi/agrupar-y-cambiar-forma/pivot/1",
        "title": "Recuperar meses como columnas",
        "code": "",
        "steps": [
          "Sobre resultado de Unpivot, selecciona Mes > Columna dinámica, valores Meta, agregación Suma."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos filas y columnas Categoria, Enero, Febrero.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/agrupar-y-cambiar-forma/transpose",
    "remember": "Después revisa encabezados y tipos.",
    "examples": [
      {
        "id": "powerbi/agrupar-y-cambiar-forma/transpose/1",
        "title": "Transponer una matriz",
        "code": "",
        "steps": [
          "Crea tabla con columnas A,B y filas 1,2 y 3,4.",
          "Transformar > Transponer."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos filas: 1,3 y 2,4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
