// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/definicion",
    "remember": "Las dimensiones filtran; los hechos se agregan.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/definicion/1",
        "title": "Construir una estrella",
        "code": "",
        "steps": [
          "En Modelo coloca Pedidos al centro y Clientes, Productos, Calendario alrededor.",
          "Verifica relaciones 1:* y filtro único."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Clientes y Productos filtran Pedidos sin una relación directa entre dimensiones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/granularidad-y-claves",
    "remember": "No mezcles granos sin controlar la duplicación.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/granularidad-y-claves/1",
        "title": "Comprobar granularidad",
        "code": "",
        "steps": [
          "Inspecciona Pedidos por PedidoID y Productos por ProductoID.",
          "Compara con Metas por MesInicio."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedidos tiene ocho IDs únicos; Metas tiene dos meses y no una fila por pedido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/dimensiones-y-hechos",
    "remember": "Nombre y categoría son atributos; cantidad y precio son datos del hecho.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/dimensiones-y-hechos/1",
        "title": "Analizar ventas por categoría",
        "code": "",
        "steps": [
          "Crea tabla visual con Productos[Categoria] y medida Ventas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Tecnologia 650; Muebles 450.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/propiedades-del-modelo",
    "remember": "Un ID numérico no es una métrica.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/propiedades-del-modelo/1",
        "title": "Configurar ClienteID",
        "code": "",
        "steps": [
          "En vista Modelo selecciona Clientes[ClienteID].",
          "Configura No resumir y oculta el campo de vista de informe si no se usa."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El campo no se propone como suma y queda oculto al consumidor; la relación sigue funcionando.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/jerarquias-y-ordenar-por-columna",
    "remember": "Mes textual debe ordenarse con un número compatible.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/jerarquias-y-ordenar-por-columna/1",
        "title": "Ordenar meses",
        "code": "",
        "steps": [
          "Tras crear Mes y MesN en Calendario, selecciona Mes > Ordenar por columna > MesN.",
          "Crea jerarquía Año > Mes."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero precede a febrero, no se ordena alfabéticamente.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modelo-dimensional/normalizacion-y-dimensiones-historicas",
    "remember": "Tipo 2 necesita asociar cada hecho a su versión válida.",
    "examples": [
      {
        "id": "powerbi/modelo-dimensional/normalizacion-y-dimensiones-historicas/1",
        "title": "Modelar cambio de país",
        "code": "",
        "steps": [
          "En un esquema de prueba define ClienteVersionID 10 para Ana/Mexico hasta 2025 y 11 para Ana/Espana desde 2026.",
          "Asigna hechos según fecha y relaciona por ClienteVersionID."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Pedidos de Ana de años distintos se atribuyen al país histórico correspondiente; no cambia el dataset base.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
