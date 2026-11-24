// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/definicion",
    "remember": "Escribe la fórmula fuera de una tabla y deja espacio libre.",
    "note": "FILTER, SORT, SORTBY, UNIQUE, SEQUENCE y RANDARRAY están disponibles en Excel 2021/2024 y Microsoft 365; funciones más recientes se indican aparte.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/definicion/1",
        "title": "Obtener lista de estados",
        "language": "excel",
        "code": "=UNIQUE(tSales[status])",
        "hint": "Escribe la fórmula fuera de una tabla y deja espacio libre.",
        "textOutput": "Tres filas en orden de aparición: completed, cancelled, pending.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/derrame-y-operador",
    "remember": "No escribas dentro del área que necesita una matriz.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/derrame-y-operador/1",
        "title": "Contar lista dinámica",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1 escribe =UNIQUE(tSales[status]); en C1 escribe =ROWS(A1#). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "3. Si A2 está ocupada antes de introducir la primera fórmula, A1 puede mostrar #SPILL!.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/unique",
    "remember": "No elimina registros de origen.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/unique/1",
        "title": "Clientes con pedidos",
        "language": "excel",
        "code": "=UNIQUE(tSales[customer_id])",
        "hint": "No elimina registros de origen.",
        "textOutput": "C1, C2, C3, C4 en cuatro filas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/filter",
    "remember": "La matriz de condiciones debe corresponder al tamaño del eje filtrado.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/filter/1",
        "title": "Extraer pedidos cancelados",
        "language": "excel",
        "code": "=FILTER(tSales[order_id],tSales[status]=\"cancelled\",\"Sin pedidos\")",
        "hint": "La matriz de condiciones debe corresponder al tamaño del eje filtrado.",
        "textOutput": "103.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/filter-con-varias-condiciones",
    "remember": "Las condiciones deben estar entre paréntesis.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/filter-con-varias-condiciones/1",
        "title": "Completados de importe alto",
        "language": "excel",
        "code": "=FILTER(tSales[order_id],(tSales[status]=\"completed\")*(tSales[amount]>=300),\"Sin pedidos\")",
        "hint": "Las condiciones deben estar entre paréntesis.",
        "textOutput": "102 y 104.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/sort-y-sortby",
    "remember": "1 es ascendente; -1 descendente.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/sort-y-sortby/1",
        "title": "Ordenar pedidos por importe e id",
        "language": "excel",
        "code": "=SORTBY(tSales[order_id],tSales[amount],-1,tSales[order_id],1)",
        "hint": "1 es ascendente; -1 descendente.",
        "textOutput": "103, 102, 104, 107, 101, 106, 105, 108.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/sequence-y-randarray",
    "remember": "RANDARRAY cambia al recalcular.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/sequence-y-randarray/1",
        "title": "Generar números de fila",
        "language": "excel",
        "code": "=SEQUENCE(4,1,10,2)",
        "hint": "RANDARRAY cambia al recalcular.",
        "textOutput": "10, 12, 14, 16.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/take-y-drop",
    "remember": "Un número negativo cuenta desde el extremo final.",
    "note": "Microsoft 365 / Excel 2024; para versiones antiguas usa un filtro Top N u ordena y selecciona.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/take-y-drop/1",
        "title": "Obtener los dos pedidos mayores",
        "language": "excel",
        "code": "=TAKE(SORTBY(tSales[order_id],tSales[amount],-1,tSales[order_id],1),2)",
        "hint": "Un número negativo cuenta desde el extremo final.",
        "textOutput": "103 y 102.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/choosecols-y-chooserows",
    "remember": "Los índices corresponden a la matriz de entrada.",
    "note": "Microsoft 365 / Excel 2024.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/choosecols-y-chooserows/1",
        "title": "Mostrar id e importe",
        "language": "excel",
        "code": "=CHOOSECOLS(Sales!A2:I3,1,9)",
        "hint": "Los índices corresponden a la matriz de entrada.",
        "textOutput": "Dos filas: 101,200 y 102,300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/vstack-y-hstack",
    "remember": "Las dimensiones incompatibles pueden rellenarse con #N/A.",
    "note": "Microsoft 365 / Excel 2024.",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/vstack-y-hstack/1",
        "title": "Combinar listas",
        "language": "excel",
        "code": "=VSTACK(Customers!B2:B3,Customers!B4:B5)",
        "hint": "Las dimensiones incompatibles pueden rellenarse con #N/A.",
        "textOutput": "Ana, Luis, Marta, Leo.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "excel/matrices-dinamicas/vstack-y-hstack/2",
        "title": "Unir id y nombre",
        "language": "excel",
        "code": "=HSTACK(Customers!A2:A3,Customers!B2:B3)",
        "hint": "Las dimensiones incompatibles pueden rellenarse con #N/A.",
        "textOutput": "Dos filas: C1,Ana y C2,Luis.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/matrices-dinamicas/tocol-torow-y-transpose",
    "remember": "TOCOL recorre por filas de forma predeterminada.",
    "note": "TOCOL y TOROW requieren Microsoft 365 / Excel 2024; TRANSPOSE existe también en versiones antiguas (puede requerir fórmula matricial clásica).",
    "examples": [
      {
        "id": "excel/matrices-dinamicas/tocol-torow-y-transpose/1",
        "title": "Aplanar dos filas",
        "language": "excel",
        "code": "=TOCOL(Sales!E2:F3)\n=TRANSPOSE(Sales!E2:F3)",
        "hint": "TOCOL recorre por filas de forma predeterminada.",
        "textOutput": "TOCOL: 2,100,1,300; TRANSPOSE: filas (2,1) y (100,300).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
