// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/definicion",
    "remember": "Verifica unicidad y tipo de clave.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/definicion/1",
        "title": "Buscar nombre por ID",
        "language": "excel-formula",
        "code": "=XLOOKUP(2,Clientes!A2:A6,Clientes!B2:B6,\"No existe\")",
        "hint": "",
        "textOutput": "Luis.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/vlookup",
    "remember": "FALSE exige coincidencia exacta; no omitas este argumento para IDs.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/vlookup/1",
        "title": "Buscar precio por producto",
        "language": "excel-formula",
        "code": "=VLOOKUP(\"P2\",Productos!A2:D5,4,FALSE)",
        "hint": "",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/hlookup",
    "remember": "El índice de fila empieza en 1 dentro del rango.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/hlookup/1",
        "title": "Recuperar objetivo de febrero",
        "language": "excel-formula",
        "code": "=HLOOKUP(\"Feb\",{\"Ene\",\"Feb\";100,120},2,FALSE)",
        "hint": "",
        "textOutput": "120.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/xlookup",
    "remember": "No requiere que el resultado esté a la derecha; exacta por defecto.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/xlookup/1",
        "title": "Buscar un cliente inexistente",
        "language": "excel-formula",
        "code": "=XLOOKUP(99,Clientes!A2:A6,Clientes!B2:B6,\"No existe\")",
        "hint": "",
        "textOutput": "No existe.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/index",
    "remember": "Los índices empiezan en 1.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/index/1",
        "title": "Leer el segundo producto",
        "language": "excel-formula",
        "code": "=INDEX(Productos!B2:D5,2,1)",
        "hint": "",
        "textOutput": "Monitor.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/match-y-xmatch",
    "remember": "MATCH con 0 exige coincidencia exacta.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/match-y-xmatch/1",
        "title": "Encontrar la posición de P3",
        "language": "excel-formula",
        "code": "={MATCH(\"P3\",Productos!A2:A5,0),XMATCH(\"P3\",Productos!A2:A5)}",
        "hint": "",
        "textOutput": "3, 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/index-y-match",
    "remember": "Los rangos deben corresponder a las mismas filas.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/index-y-match/1",
        "title": "Buscar país por ID",
        "language": "excel-formula",
        "code": "=INDEX(Clientes!C2:C6,MATCH(3,Clientes!A2:A6,0))",
        "hint": "",
        "textOutput": "Spain.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/lookup-y-coincidencia-aproximada",
    "remember": "Ordena los umbrales de menor a mayor.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/lookup-y-coincidencia-aproximada/1",
        "title": "Clasificar monto por umbral",
        "language": "excel-formula",
        "code": "=LOOKUP(350,{0;200;500},{\"Bajo\";\"Medio\";\"Alto\"})",
        "hint": "",
        "textOutput": "Medio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/choose",
    "remember": "El primer argumento debe apuntar a una opción existente.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/choose/1",
        "title": "Traducir prioridad",
        "language": "excel-formula",
        "code": "=CHOOSE(2,\"Baja\",\"Media\",\"Alta\")",
        "hint": "",
        "textOutput": "Media.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/offset-e-indirect",
    "remember": "Las referencias dinámicas pueden complicar mantenimiento.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/offset-e-indirect/1",
        "title": "Leer un importe dinámicamente",
        "language": "excel-formula",
        "code": "={OFFSET(Ventas!J2,1,0),INDIRECT(\"Ventas!J3\")}",
        "hint": "",
        "textOutput": "300, 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/row-column-rows-columns",
    "remember": "No confundir posición con tamaño.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/row-column-rows-columns/1",
        "title": "Medir rango",
        "language": "excel-formula",
        "code": "={ROWS(Ventas!A2:J9),COLUMNS(Ventas!A2:J9)}",
        "hint": "",
        "textOutput": "8, 10.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/busqueda-y-referencia/address",
    "remember": "El modo 4 devuelve una dirección relativa.",
    "examples": [
      {
        "id": "google-sheets/busqueda-y-referencia/address/1",
        "title": "Construir dirección",
        "language": "excel-formula",
        "code": "=ADDRESS(2,10,4)",
        "hint": "",
        "textOutput": "J2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
