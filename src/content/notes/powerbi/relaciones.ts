// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/relaciones/definicion",
    "remember": "Las relaciones definen caminos de filtro.",
    "examples": [
      {
        "id": "powerbi/relaciones/definicion/1",
        "title": "Filtrar pedidos por país",
        "code": "",
        "steps": [
          "Crea tabla visual con Clientes[Pais] y Ventas.",
          "Selecciona Mexico en segmentador."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 820.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/relaciones/cardinalidad-1-1-y-1",
    "remember": "Una dimensión duplicada no puede ocupar el lado 1.",
    "examples": [
      {
        "id": "powerbi/relaciones/cardinalidad-1-1-y-1/1",
        "title": "Validar relación de clientes",
        "code": "",
        "steps": [
          "En Modelo revisa Clientes[ClienteID] a Pedidos[ClienteID]."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1 en Clientes, * en Pedidos; ClienteID 1 tiene tres pedidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/relaciones/direccion-de-filtro",
    "remember": "Usa dirección única por defecto.",
    "examples": [
      {
        "id": "powerbi/relaciones/direccion-de-filtro/1",
        "title": "Comprobar filtros",
        "code": "",
        "steps": [
          "Con filtro Productos[Categoria]=Muebles, muestra Ventas y una tabla de Clientes sin medidas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ventas 450; la dimensión Clientes no se filtra automáticamente por Pedidos en el modelo unidireccional.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/relaciones/relaciones-activas-e-inactivas",
    "remember": "Fecha de pedido y fecha de envío representan roles distintos.",
    "examples": [
      {
        "id": "powerbi/relaciones/relaciones-activas-e-inactivas/1",
        "title": "Revisar fechas",
        "code": "",
        "steps": [
          "En Modelo localiza relaciones de Calendario con Fecha y Envio."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Línea continua a Fecha y discontinua a Envio según preparación.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/relaciones/role-playing-dimensions",
    "remember": "Usa dimensiones separadas si ambos roles deben filtrar simultáneamente.",
    "examples": [
      {
        "id": "powerbi/relaciones/role-playing-dimensions/1",
        "title": "Crear calendario de envío",
        "code": "",
        "steps": [
          "En copia del modelo crea tabla CalendarioEnvio = Calendario.",
          "Relaciona su Date con Pedidos[Envio] activamente y deja Calendario con Fecha."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Dos segmentadores independientes, uno para fecha de pedido y otro de envío.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/relaciones/muchos-a-muchos-y-tablas-puente",
    "remember": "No conectes hechos entre sí sin estudiar el grano.",
    "note": "No se modifica el modelo compartido; para diseño completo revisa guía many-to-many.",
    "examples": [
      {
        "id": "powerbi/relaciones/muchos-a-muchos-y-tablas-puente/1",
        "title": "Representar clientes y etiquetas",
        "code": "",
        "steps": [
          "En modelo de prueba crea Etiquetas con A,B y puente con pares (1,A),(1,B),(2,A).",
          "Relaciona dimensiones con puente; define propagación controlada hacia hechos para el análisis de etiquetas."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ana pertenece a dos etiquetas; sumar ventas por etiqueta puede contar su importe dos veces.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
