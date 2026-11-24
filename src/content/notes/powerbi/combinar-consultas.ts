// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/combinar-consultas/definicion",
    "remember": "Merge se parece a JOIN; Append a UNION ALL.",
    "examples": [
      {
        "id": "powerbi/combinar-consultas/definicion/1",
        "title": "Enriquecer pedidos",
        "code": "",
        "steps": [
          "En referencia de Pedidos, Combinar consultas con Productos por ProductoID, Left outer.",
          "Expande Categoria."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Ocho filas; pedido 1 tiene Tecnologia.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/combinar-consultas/merge-y-tipos-de-union",
    "remember": "El tipo de unión determina qué filas sobreviven.",
    "examples": [
      {
        "id": "powerbi/combinar-consultas/merge-y-tipos-de-union/1",
        "title": "Encontrar clientes sin pedido",
        "code": "",
        "steps": [
          "Combinar Clientes con Pedidos por ClienteID, Left anti."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Una fila: Diego, ClienteID 4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/combinar-consultas/expandir-tablas-y-registros",
    "remember": "Una coincidencia múltiple puede aumentar las filas.",
    "examples": [
      {
        "id": "powerbi/combinar-consultas/expandir-tablas-y-registros/1",
        "title": "Expandir pedidos de clientes",
        "code": "",
        "steps": [
          "Merge Clientes con Pedidos mediante Left outer.",
          "Expande PedidoID, sin prefijo si quieres."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Nueve filas: ocho pedidos y Diego con PedidoID null.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/combinar-consultas/append",
    "remember": "No une por clave ni por posición de columnas.",
    "examples": [
      {
        "id": "powerbi/combinar-consultas/append/1",
        "title": "Unir meses",
        "code": "",
        "steps": [
          "Crea referencias Enero y Febrero filtradas a 2026 y a su mes correspondiente.",
          "Anexar consultas como nueva: Enero y Febrero."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Seis filas, con todas las columnas de Pedidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/combinar-consultas/fuzzy-merge",
    "remember": "No uses fuzzy como prueba definitiva de identidad.",
    "examples": [
      {
        "id": "powerbi/combinar-consultas/fuzzy-merge/1",
        "title": "Revisar variantes de país",
        "code": "",
        "steps": [
          "Crea tabla de referencia con Mexico y Espana.",
          "Combina Sucios[Pais] con esa tabla habilitando coincidencia aproximada.",
          "Inspecciona coincidencias y ajusta umbral."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Puedes revisar candidatos como México/Mexico; el resultado exacto depende de configuración y cultura.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
