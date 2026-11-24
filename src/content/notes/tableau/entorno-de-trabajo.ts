// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/definicion",
    "remember": "Una worksheet construye una vista; un dashboard reúne vistas.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/definicion/1",
        "title": "Abrir una hoja",
        "code": "",
        "external": true,
        "hint": "Conecta ventas.csv y pulsa Sheet 1. Arrastra Ventas a Text.",
        "textOutput": "Una marca con SUM(Ventas) = 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/data-source",
    "remember": "Comprueba campos antes de crear gráficos.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/data-source/1",
        "title": "Inspeccionar ventas",
        "code": "",
        "external": true,
        "hint": "Abre Data Source y revisa Linea, Fecha y Ventas.",
        "textOutput": "Ocho registros; Fecha tiene tipo fecha y Ventas es numérico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/rows-y-columns",
    "remember": "Arrastrar un campo cambia la organización de las marcas.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/rows-y-columns/1",
        "title": "Crear una vista regional",
        "code": "",
        "external": true,
        "hint": "Pon Region en Rows y Ventas en Columns.",
        "textOutput": "Dos barras horizontales: Norte 700 y Sur 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/marks-card",
    "remember": "Detail cambia el nivel de detalle sin exigir un eje nuevo.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/marks-card/1",
        "title": "Separar marcas por categoría",
        "code": "",
        "external": true,
        "hint": "En la vista regional, arrastra Categoria a Color y activa Stack Marks si es necesario.",
        "textOutput": "Cada barra regional se subdivide por categoría.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/show-me",
    "remember": "Es un punto de partida, no decide qué pregunta responde el gráfico.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/show-me/1",
        "title": "Crear barras sugeridas",
        "code": "",
        "external": true,
        "hint": "Selecciona Region y Ventas con Ctrl/Cmd y elige barras en Show Me.",
        "textOutput": "Una vista que compara las dos regiones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/entorno-de-trabajo/analytics-pane",
    "remember": "Analytics añade contexto a marcas existentes.",
    "examples": [
      {
        "id": "tableau/entorno-de-trabajo/analytics-pane/1",
        "title": "Comparar con promedio regional",
        "code": "",
        "external": true,
        "hint": "Con Region en Rows y Ventas en Columns, arrastra Average Line a Table.",
        "textOutput": "Línea de referencia en 875.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
