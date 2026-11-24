// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/power-query-y-etl/definicion",
    "remember": "La consulta describe cómo preparar datos, no modifica automáticamente el origen.",
    "examples": [
      {
        "id": "power-query/power-query-y-etl/definicion/1",
        "title": "Preparar pedidos para un reporte",
        "code": "",
        "steps": [
          "Abre una copia de Pedidos en el editor",
          "Filtra estado a completado",
          "Conserva id e importe"
        ],
        "external": true,
        "hint": "La salida solo incluye las columnas y filas que necesita el reporte.",
        "textOutput": "5 filas: (101,100), (102,200), (104,150), (105,150), (107,300).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/power-query-y-etl/power-query-m-y-dax",
    "remember": "M se evalúa al consultar o actualizar; una medida DAX responde al contexto del informe.",
    "examples": [
      {
        "id": "power-query/power-query-y-etl/power-query-m-y-dax/1",
        "title": "Crear importe con impuesto en la preparación",
        "language": "powerquery",
        "code": "Table.AddColumn(Pedidos, \"con_impuesto\", each [importe] * 1.16, type number)",
        "hint": "Table.AddColumn añade una columna; each aplica el cálculo a cada fila y [importe] lee su importe. La columna se incorpora a la tabla que se cargará al modelo.",
        "textOutput": "7 filas; id 101 tiene con_impuesto=116. No se ha creado una medida DAX.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/power-query-y-etl/editor-y-vista-previa",
    "remember": "Seleccionar un paso muestra su resultado intermedio.",
    "examples": [
      {
        "id": "power-query/power-query-y-etl/editor-y-vista-previa/1",
        "title": "Inspeccionar la consulta Pedidos",
        "code": "",
        "steps": [
          "Selecciona Pedidos en Consultas",
          "Observa la cuadrícula central",
          "Revisa Configuración de consulta > Pasos aplicados"
        ],
        "external": true,
        "hint": "La vista previa no certifica el volumen total de un origen grande.",
        "textOutput": "7 filas y seis columnas en este dataset.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
