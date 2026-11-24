// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/parametros/definicion",
    "remember": "Separa la configuración del código que la utiliza.",
    "examples": [
      {
        "id": "power-query/parametros/definicion/1",
        "title": "Filtrar por un umbral configurable",
        "language": "powerquery",
        "code": "let Minimo = 150 in Table.SelectRows(Pedidos, each [importe] >= Minimo)",
        "hint": "El valor Minimo se declara aparte del filtro.",
        "textOutput": "Ids 102,104,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/parametros/administrar-parametros",
    "remember": "El tipo del parámetro debe coincidir con el campo o función que lo usa.",
    "examples": [
      {
        "id": "power-query/parametros/administrar-parametros/1",
        "title": "Crear un parámetro de importe",
        "code": "",
        "steps": [
          "Inicio > Administrar parámetros > Nuevo parámetro",
          "Nómbralo ImporteMinimo, tipo Número decimal, valor actual 150",
          "Crea una consulta con Table.SelectRows(Pedidos, each [importe] >= ImporteMinimo)",
          "Cambia el valor a 200"
        ],
        "external": true,
        "hint": "El filtro utiliza el valor actual del parámetro.",
        "textOutput": "Con 150: 4 filas; con 200: ids 102 y 107.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/parametros/parametros-de-fecha-y-ruta",
    "remember": "El entorno de destino debe poder acceder a la ruta; no guardes secretos en parámetros.",
    "examples": [
      {
        "id": "power-query/parametros/parametros-de-fecha-y-ruta/1",
        "title": "Cambiar el inicio del periodo",
        "language": "powerquery",
        "code": "let Desde = #date(2026,2,1) in Table.SelectRows(Pedidos, each [fecha] >= Desde)",
        "hint": "Cambiar Desde cambia qué pedidos entran.",
        "textOutput": "Ids 104,105,106,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
