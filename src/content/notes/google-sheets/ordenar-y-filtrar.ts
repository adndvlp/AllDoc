// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/definicion",
    "remember": "Ordena filas completas, no una sola columna aislada.",
    "examples": [
      {
        "id": "google-sheets/ordenar-y-filtrar/definicion/1",
        "title": "Filtrar pedidos realizados",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas selecciona A1:K9; Datos > Crear un filtro; en estado conserva completed. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "6 pedidos visibles, 2 ocultos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/ordenamiento-de-rango",
    "remember": "Marca que el rango tiene encabezados.",
    "examples": [
      {
        "id": "google-sheets/ordenar-y-filtrar/ordenamiento-de-rango/1",
        "title": "Ordenar por importe",
        "language": "text",
        "code": "",
        "hint": "Selecciona A1:K9 en copia de Ventas; Datos > Ordenar rango > Opciones avanzadas; marca encabezados; ordena J de Z a A. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "El pedido 103 con 600 queda primero.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/vistas-de-filtro",
    "remember": "Útiles en hojas compartidas.",
    "examples": [
      {
        "id": "google-sheets/ordenar-y-filtrar/vistas-de-filtro/1",
        "title": "Crear vista web",
        "language": "text",
        "code": "",
        "hint": "Datos > Crear vista de filtro; nómbrala Web y filtra canal por web. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "5 pedidos visibles en esa vista; la tabla base no cambia.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/ordenar-y-filtrar/congelar-y-agrupar",
    "remember": "No elimina datos.",
    "examples": [
      {
        "id": "google-sheets/ordenar-y-filtrar/congelar-y-agrupar/1",
        "title": "Mantener encabezados",
        "language": "text",
        "code": "",
        "hint": "En copia de Ventas usa Ver > Inmovilizar > 1 fila y desplázate hacia abajo. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Los encabezados siguen visibles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
