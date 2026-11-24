// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/definicion",
    "remember": "No conviertas la fila de títulos en una fila de datos.",
    "examples": [
      {
        "id": "power-query/encabezados-y-esquema-inicial/definicion/1",
        "title": "Promover la primera fila a encabezado",
        "language": "powerquery",
        "code": "Table.PromoteHeaders(#table({\"Column1\",\"Column2\"}, {{\"id\",\"importe\"},{1,100}}))",
        "hint": "En interfaz: Inicio o Transformar > Usar la primera fila como encabezado.",
        "textOutput": "Columnas id e importe; una fila (1,100).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/quitar-encabezados-incorrectos",
    "remember": "Úsalo si la primera promoción fue incorrecta o necesitas reorganizar el encabezado.",
    "examples": [
      {
        "id": "power-query/encabezados-y-esquema-inicial/quitar-encabezados-incorrectos/1",
        "title": "Recuperar la fila de títulos",
        "language": "powerquery",
        "code": "Table.DemoteHeaders(#table({\"id\",\"importe\"}, {{1,100}}))",
        "hint": "La tabla recibe nombres genéricos.",
        "textOutput": "Column1 y Column2, filas (id,importe) y (1,100).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/encabezados-y-esquema-inicial/quitar-filas-de-metadatos",
    "remember": "Quita las filas iniciales antes de promover encabezados.",
    "examples": [
      {
        "id": "power-query/encabezados-y-esquema-inicial/quitar-filas-de-metadatos/1",
        "title": "Quitar la portada de un reporte",
        "language": "powerquery",
        "code": "let T = #table({\"A\",\"B\"}, {{\"Reporte\",null},{\"id\",\"importe\"},{1,100}}) in Table.PromoteHeaders(Table.Skip(T,1))",
        "hint": "Se elimina la fila de portada antes de promover.",
        "textOutput": "id e importe, una fila (1,100).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
