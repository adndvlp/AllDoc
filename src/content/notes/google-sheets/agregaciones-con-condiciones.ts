// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/definicion",
    "remember": "Los rangos deben estar alineados por fila.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/definicion/1",
        "title": "Sumar pedidos completados",
        "language": "excel-formula",
        "code": "=SUMIF(Ventas!H2:H9,\"completed\",Ventas!J2:J9)",
        "hint": "",
        "textOutput": "2000.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/sumif-y-sumifs",
    "remember": "SUMIFS empieza con el rango a sumar.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/sumif-y-sumifs/1",
        "title": "Sumar ventas web completadas",
        "language": "excel-formula",
        "code": "=SUMIFS(Ventas!J2:J9,Ventas!H2:H9,\"completed\",Ventas!I2:I9,\"web\")",
        "hint": "",
        "textOutput": "1400.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/countif-y-countifs",
    "remember": "Los operadores de criterio van entre comillas.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/countif-y-countifs/1",
        "title": "Contar pedidos web completados",
        "language": "excel-formula",
        "code": "=COUNTIFS(Ventas!H2:H9,\"completed\",Ventas!I2:I9,\"web\")",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/averageif-y-averageifs",
    "remember": "No incluyen los pedidos que no pasan los filtros.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/averageif-y-averageifs/1",
        "title": "Promediar pedidos web completados",
        "language": "excel-formula",
        "code": "=AVERAGEIFS(Ventas!J2:J9,Ventas!H2:H9,\"completed\",Ventas!I2:I9,\"web\")",
        "hint": "",
        "textOutput": "350.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/minifs-y-maxifs",
    "remember": "Verifica que existan coincidencias antes de interpretar un cero.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/minifs-y-maxifs/1",
        "title": "Obtener extremos de pedidos completados",
        "language": "excel-formula",
        "code": "={MINIFS(Ventas!J2:J9,Ventas!H2:H9,\"completed\"),MAXIFS(Ventas!J2:J9,Ventas!H2:H9,\"completed\")}",
        "hint": "",
        "textOutput": "200, 600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/countuniqueifs",
    "remember": "El rango de valores va primero.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/countuniqueifs/1",
        "title": "Contar clientes que completaron compras",
        "language": "excel-formula",
        "code": "=COUNTUNIQUEIFS(Ventas!C2:C9,Ventas!H2:H9,\"completed\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "3.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/agregaciones-con-condiciones/criterios-con-operadores-y-comodines",
    "remember": "Concatena el operador con la celda o valor.",
    "examples": [
      {
        "id": "google-sheets/agregaciones-con-condiciones/criterios-con-operadores-y-comodines/1",
        "title": "Contar importes de al menos 300",
        "language": "excel-formula",
        "code": "=COUNTIF(Ventas!J2:J9,\">=\"&300)",
        "hint": "",
        "textOutput": "5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
