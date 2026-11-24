// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/definicion",
    "remember": "Los pasos modifican la consulta, no el archivo original.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/definicion/1",
        "title": "Observar un paso",
        "code": "",
        "steps": [
          "Transformar datos > Sucios.",
          "Renombra temporalmente Codigo como Referencia.",
          "Selecciona el paso anterior en Pasos aplicados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El paso anterior muestra Codigo; el nuevo muestra Referencia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/tipos-y-configuracion-regional",
    "remember": "Una fecha aparente puede ser texto.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/tipos-y-configuracion-regional/1",
        "title": "Interpretar fecha regional",
        "code": "",
        "steps": [
          "Crea una consulta con una columna de texto `31/12/2026`.",
          "Cambiar tipo > Usar configuración regional > Fecha, Español (México)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Fecha 31 de diciembre de 2026.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/promover-encabezados",
    "remember": "No promuevas dos veces un archivo ya encabezado.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/promover-encabezados/1",
        "title": "Reparar encabezados",
        "code": "",
        "steps": [
          "Crea tabla sin encabezado con primera fila Id, Nombre y segunda 1, Ana.",
          "Inicio > Usar primera fila como encabezados."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Columnas Id y Nombre, una fila con 1 y Ana.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/seleccionar-y-eliminar-columnas",
    "remember": "Elimina lo que no se usa, no claves necesarias.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/seleccionar-y-eliminar-columnas/1",
        "title": "Reducir una consulta",
        "code": "",
        "steps": [
          "En referencia de Clientes, Elegir columnas > ClienteID, Pais."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cuatro filas y dos columnas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/filtrar-ordenar-y-conservar-filas",
    "remember": "Power Query filtra antes de cargar, no al interactuar con informe.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/filtrar-ordenar-y-conservar-filas/1",
        "title": "Conservar pedidos completados",
        "code": "",
        "steps": [
          "En referencia de Pedidos, filtra Estado=completed.",
          "Ordena PedidoID ascendente."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Siete filas; se excluye pedido 5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/editor-de-power-query/indice-de-filas",
    "remember": "Un índice generado no es una clave empresarial estable si cambia el orden.",
    "examples": [
      {
        "id": "powerbi/editor-de-power-query/indice-de-filas/1",
        "title": "Numerar productos",
        "code": "",
        "steps": [
          "En referencia de Productos ordena ProductoID ascendente.",
          "Agregar columna > Columna de índice > Desde 1."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Índices 1, 2 y 3.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
