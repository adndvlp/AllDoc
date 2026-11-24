// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/calculate-y-filtros/definicion",
    "remember": "Expresión primero, condiciones después.",
    "examples": [
      {
        "id": "powerbi/calculate-y-filtros/definicion/1",
        "title": "Calcular solo ventas completadas",
        "language": "dax",
        "code": "Ventas = CALCULATE([Importe], Pedidos[Estado] = \"completed\")",
        "hint": "",
        "textOutput": "1100, frente a importe 1150.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculate-y-filtros/calculate-con-varias-condiciones",
    "remember": "Comprueba qué filtro modifica cada argumento.",
    "examples": [
      {
        "id": "powerbi/calculate-y-filtros/calculate-con-varias-condiciones/1",
        "title": "Ventas completadas de México",
        "language": "dax",
        "code": "Ventas México = CALCULATE([Ventas], Clientes[Pais] = \"Mexico\")",
        "hint": "",
        "textOutput": "820 sin filtros adicionales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculate-y-filtros/calculatetable",
    "remember": "Para usar en medida necesita otra operación que devuelva un escalar.",
    "examples": [
      {
        "id": "powerbi/calculate-y-filtros/calculatetable/1",
        "title": "Contar filas de una tabla filtrada",
        "language": "dax",
        "code": "Completados tabla = COUNTROWS(CALCULATETABLE(Pedidos, Pedidos[Estado] = \"completed\"))",
        "hint": "",
        "textOutput": "7.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculate-y-filtros/filter",
    "remember": "Usa filtros booleanos simples de CALCULATE cuando basten.",
    "examples": [
      {
        "id": "powerbi/calculate-y-filtros/filter/1",
        "title": "Sumar pedidos con importe mayor de 150",
        "language": "dax",
        "code": "Importes grandes = SUMX(FILTER(Pedidos, Pedidos[Cantidad]*Pedidos[Precio] > 150), Pedidos[Cantidad]*Pedidos[Precio])",
        "hint": "",
        "textOutput": "500 por pedidos 2 y 6.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculate-y-filtros/keepfilters",
    "remember": "Permite respetar selección previa del usuario.",
    "examples": [
      {
        "id": "powerbi/calculate-y-filtros/keepfilters/1",
        "title": "Respetar el estado seleccionado",
        "language": "dax",
        "code": "Ventas respetadas = CALCULATE([Importe], KEEPFILTERS(Pedidos[Estado] = \"completed\"))",
        "hint": "",
        "textOutput": "Con Estado=cancelled, BLANK; la medida Ventas original devuelve 1100 sin otros filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
