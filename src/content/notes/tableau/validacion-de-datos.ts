// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/validacion-de-datos/definicion",
    "remember": "Compara con un total independiente antes de publicar.",
    "examples": [
      {
        "id": "tableau/validacion-de-datos/definicion/1",
        "title": "Validar total",
        "code": "",
        "external": true,
        "hint": "En una hoja sin filtros coloca SUM(Ventas), COUNT(Linea) y COUNTD(Pedido) en Measure Values.",
        "textOutput": "1750, 8 y 7 respectivamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/validacion-de-datos/view-data-y-exportacion",
    "remember": "Comprueba qué datos exportas: resumen o detalle.",
    "examples": [
      {
        "id": "tableau/validacion-de-datos/view-data-y-exportacion/1",
        "title": "Inspeccionar Norte",
        "code": "",
        "steps": [
          "Selecciona barra Norte y usa View Data",
          "revisa detalle de ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro líneas que suman 700; el acceso al detalle depende de permisos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/validacion-de-datos/duplicados-y-claves",
    "remember": "Varias líneas del mismo pedido no son duplicados de línea.",
    "examples": [
      {
        "id": "tableau/validacion-de-datos/duplicados-y-claves/1",
        "title": "Comprobar unicidad",
        "code": "",
        "external": true,
        "hint": "Crea COUNT([Linea])-COUNTD([Linea]) y COUNT([Pedido])-COUNTD([Pedido]).",
        "textOutput": "0 para Linea; 1 para Pedido, esperado por P01.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/validacion-de-datos/contrastar-contra-sql",
    "remember": "Iguala filtros y tratamiento de nulos.",
    "examples": [
      {
        "id": "tableau/validacion-de-datos/contrastar-contra-sql/1",
        "title": "Validar pedidos completados",
        "code": "",
        "steps": [
          "En una base de prueba con ventas ejecuta SELECT SUM(Ventas), COUNT(DISTINCT Pedido) FROM ventas WHERE Estado='Completado'",
          "compara con la hoja filtrada."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ambas deben mostrar 1700 y 6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
