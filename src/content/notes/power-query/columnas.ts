// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/columnas/definicion",
    "remember": "Seleccionar columnas no es filtrar filas.",
    "examples": [
      {
        "id": "power-query/columnas/definicion/1",
        "title": "Conservar solo identificador e importe",
        "language": "powerquery",
        "code": "Table.SelectColumns(Pedidos, {\"id\", \"importe\"})",
        "hint": "Inicio > Elegir columnas.",
        "textOutput": "7 filas, únicamente id e importe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas/eliminar-columnas",
    "remember": "Conserva los demás campos y las filas.",
    "examples": [
      {
        "id": "power-query/columnas/eliminar-columnas/1",
        "title": "Quitar el canal",
        "language": "powerquery",
        "code": "Table.RemoveColumns(Pedidos, {\"canal\"})",
        "hint": "Elimina una columna sin filtrar pedidos.",
        "textOutput": "7 filas, 5 columnas, sin canal.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas/renombrar-columnas",
    "remember": "Se indica el nombre anterior y el nuevo.",
    "examples": [
      {
        "id": "power-query/columnas/renombrar-columnas/1",
        "title": "Renombrar importe a ventas",
        "language": "powerquery",
        "code": "Table.RenameColumns(Pedidos, {{\"importe\", \"ventas\"}})",
        "hint": "La lista interna contiene el par anterior/nuevo.",
        "textOutput": "7 filas; ventas sustituye a importe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas/duplicar-columna",
    "remember": "Útil antes de limpiar un campo cuyo valor original necesitas conservar.",
    "examples": [
      {
        "id": "power-query/columnas/duplicar-columna/1",
        "title": "Copiar los correos originales",
        "language": "powerquery",
        "code": "Table.DuplicateColumn(Leads, \"correo\", \"correo_original\")",
        "hint": "La copia contiene también null y texto vacío.",
        "textOutput": "6 filas; correo y correo_original iguales en cada fila.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas/reordenar-columnas",
    "remember": "No cambia el orden de las filas.",
    "examples": [
      {
        "id": "power-query/columnas/reordenar-columnas/1",
        "title": "Poner importe primero",
        "language": "powerquery",
        "code": "Table.ReorderColumns(Pedidos, {\"importe\", \"id\", \"cliente\", \"fecha\", \"estado\", \"canal\"})",
        "hint": "Se indica el orden de las seis columnas.",
        "textOutput": "7 filas; importe es la primera columna.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/columnas/columnas-ausentes",
    "remember": "No ignores columnas obligatorias sin validar el origen.",
    "examples": [
      {
        "id": "power-query/columnas/columnas-ausentes/1",
        "title": "Seleccionar un campo opcional",
        "language": "powerquery",
        "code": "Table.SelectColumns(Pedidos, {\"id\", \"cupon\"}, MissingField.UseNull)",
        "hint": "Se crea cupon con null porque no existe.",
        "textOutput": "7 filas, id y cupon; todos los cupones son null.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
