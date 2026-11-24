// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/definicion",
    "remember": "Inspecciona primero, transforma después.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/definicion/1",
        "title": "Inspeccionar valores",
        "code": "",
        "steps": [
          "En Sucios activa Vista > Calidad de columna, Distribución y Perfil.",
          "Selecciona Importe."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cinco registros de texto, uno con valor literal error; aún no es un error de tipo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/nulos-y-reemplazo-de-valores",
    "remember": "No confundir ausencia con importe cero.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/nulos-y-reemplazo-de-valores/1",
        "title": "Completar país desconocido",
        "code": "",
        "steps": [
          "En una consulta en blanco usa `Table.ReplaceValue(Sucios, null, \"Desconocido\", Replacer.ReplaceValue, {\"Pais\"})` en Editor avanzado."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Id 3 muestra Desconocido; conserva cinco filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/duplicados",
    "remember": "Define qué columnas identifican la duplicidad.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/duplicados/1",
        "title": "Quitar registro repetido",
        "code": "",
        "steps": [
          "En Sucios selecciona todas las columnas.",
          "Inicio > Quitar filas > Quitar duplicados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro filas; desaparece una copia idéntica de Id 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/errores-de-conversion",
    "remember": "Un error no es lo mismo que null.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/errores-de-conversion/1",
        "title": "Detectar error numérico",
        "code": "",
        "steps": [
          "En referencia de Sucios convierte Importe a entero.",
          "Conservar errores en esa columna."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una fila, Id 3, porque error no se convierte a número.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/trim-clean-y-mayusculas",
    "remember": "Normalizar antes de comparar o combinar texto.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/trim-clean-y-mayusculas/1",
        "title": "Normalizar nombres",
        "code": "",
        "steps": [
          "En Sucios selecciona Nombre > Formato > Recortar; luego Poner en mayúscula cada palabra."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ana, Luis, Luis, Marta, Diego.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calidad-y-limpieza/fill-down-y-fill-up",
    "remember": "Orden y significado del bloque importan.",
    "examples": [
      {
        "id": "powerbi/calidad-y-limpieza/fill-down-y-fill-up/1",
        "title": "Rellenar encabezados de grupo",
        "code": "",
        "steps": [
          "Crea tabla `Categoria,Valor` con filas A,10; null,20; B,30; null,40.",
          "Rellenar hacia abajo en Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "A, A, B, B; no altera Valor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
