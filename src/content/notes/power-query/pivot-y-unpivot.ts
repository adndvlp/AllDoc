// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/pivot-y-unpivot/definicion",
    "remember": "Pivot ensancha; Unpivot alarga la tabla.",
    "examples": [
      {
        "id": "power-query/pivot-y-unpivot/definicion/1",
        "title": "Pasar presupuesto mensual a formato largo",
        "language": "powerquery",
        "code": "Table.Unpivot(Presupuesto, {\"Ene\",\"Feb\"}, \"mes\", \"presupuesto\")",
        "hint": "Transformar > Anular dinamización de columnas.",
        "textOutput": "4 filas: (Electrónica,Ene,400),(Electrónica,Feb,500),(Hogar,Ene,200),(Hogar,Feb,300).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pivot-y-unpivot/unpivot-de-otras-columnas",
    "remember": "Útil para archivos donde aparecen meses nuevos, siempre que las demás columnas sean métricas comparables.",
    "examples": [
      {
        "id": "power-query/pivot-y-unpivot/unpivot-de-otras-columnas/1",
        "title": "Conservar categoría y transformar meses",
        "language": "powerquery",
        "code": "Table.UnpivotOtherColumns(Presupuesto, {\"categoria\"}, \"mes\", \"presupuesto\")",
        "hint": "Se conserva categoría y se transforman todas las otras columnas.",
        "textOutput": "Las mismas cuatro filas del ejemplo anterior; un nuevo mes sería incluido automáticamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pivot-y-unpivot/pivot-con-agregacion",
    "remember": "Si hay valores repetidos por combinación, decide cómo agregarlos.",
    "examples": [
      {
        "id": "power-query/pivot-y-unpivot/pivot-con-agregacion/1",
        "title": "Mostrar presupuesto por categoría y mes",
        "language": "powerquery",
        "code": "let L = Table.Unpivot(Presupuesto,{\"Ene\",\"Feb\"},\"mes\",\"presupuesto\") in Table.Pivot(L,{\"Ene\",\"Feb\"},\"mes\",\"presupuesto\",List.Sum)",
        "hint": "La suma define qué hacer si hay más de un importe por celda.",
        "textOutput": "Columnas categoria,Ene,Feb; Electrónica 400/500 y Hogar 200/300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pivot-y-unpivot/transpose",
    "remember": "La primera fila puede necesitar promoción a encabezado después.",
    "examples": [
      {
        "id": "power-query/pivot-y-unpivot/transpose/1",
        "title": "Transponer una matriz pequeña",
        "language": "powerquery",
        "code": "Table.Transpose(#table({\"a\",\"b\"}, {{1,2},{3,4}}))",
        "hint": "Los valores de una fila se convierten en columna.",
        "textOutput": "Column1 y Column2; filas (1,3),(2,4).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
