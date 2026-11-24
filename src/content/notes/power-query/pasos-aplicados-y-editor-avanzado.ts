// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/definicion",
    "remember": "Un paso posterior puede depender de nombres y columnas producidos antes.",
    "examples": [
      {
        "id": "power-query/pasos-aplicados-y-editor-avanzado/definicion/1",
        "title": "Filtrar y conservar columnas en dos pasos",
        "language": "powerquery",
        "code": "let\n    Filtrado = Table.SelectRows(Pedidos, each [estado] = \"completado\"),\n    Columnas = Table.SelectColumns(Filtrado, {\"id\",\"importe\"})\nin\n    Columnas",
        "hint": "La consulta devuelve el paso indicado en in.",
        "textOutput": "5 filas, ids 101,102,104,105,107 y sus importes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/editar-y-eliminar-pasos",
    "remember": "Comprueba los pasos siguientes al modificar uno anterior.",
    "examples": [
      {
        "id": "power-query/pasos-aplicados-y-editor-avanzado/editar-y-eliminar-pasos/1",
        "title": "Cambiar el filtro de una consulta",
        "code": "",
        "steps": [
          "Crea una consulta en blanco con el ejemplo de Definición de este grupo",
          "Edita Filtrado y cambia completado por cancelado",
          "Selecciona Columnas"
        ],
        "external": true,
        "hint": "El último paso usa el nuevo resultado del filtro.",
        "textOutput": "Una fila (103,80).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/reordenar-y-dependencia",
    "remember": "No elimines una columna antes de un paso que la necesita.",
    "examples": [
      {
        "id": "power-query/pasos-aplicados-y-editor-avanzado/reordenar-y-dependencia/1",
        "title": "Detectar un orden inválido",
        "language": "powerquery",
        "code": "let T = Table.RemoveColumns(Pedidos,{\"estado\"}) in Table.SelectRows(T,each [estado] = \"completado\")",
        "hint": "El filtro intenta usar un campo que ya no existe.",
        "textOutput": "Error por el campo estado ausente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/pasos-aplicados-y-editor-avanzado/barra-de-formulas-y-editor-avanzado",
    "remember": "En la barra se escribe = seguido de la expresión; en el Editor avanzado se pega la expresión completa.",
    "examples": [
      {
        "id": "power-query/pasos-aplicados-y-editor-avanzado/barra-de-formulas-y-editor-avanzado/1",
        "title": "Inspeccionar el M generado",
        "code": "",
        "steps": [
          "Duplica Pedidos",
          "Aplica un filtro en estado",
          "Activa Barra de fórmulas en Vista y selecciona el paso de filtro",
          "Abre Editor avanzado"
        ],
        "external": true,
        "hint": "El editor muestra una llamada a Table.SelectRows y las referencias al origen.",
        "textOutput": "Se observa la expresión que filtra estado y la consulta completa, con 5 filas si se eligió completado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
