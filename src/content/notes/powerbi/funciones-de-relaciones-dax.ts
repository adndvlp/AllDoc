// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/definicion",
    "remember": "Usa relaciones existentes cuando están correctamente definidas.",
    "note": "Nueva columna en Pedidos; normalmente es preferible usar el atributo desde la dimensión.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/definicion/1",
        "title": "Traer categoría a una columna",
        "language": "dax",
        "code": "Categoría del pedido = RELATED(Productos[Categoria])",
        "hint": "",
        "textOutput": "Pedido 1: Tecnologia; pedido 6: Muebles.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/related-y-relatedtable",
    "remember": "Una dimensión puede relacionarse con muchos hechos.",
    "note": "Nueva columna de Clientes.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/related-y-relatedtable/1",
        "title": "Contar pedidos de cada cliente",
        "language": "dax",
        "code": "Número pedidos columna = COUNTROWS(RELATEDTABLE(Pedidos))",
        "hint": "",
        "textOutput": "Ana 3, Luis 2, Marta 3, Diego BLANK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/userelationship",
    "remember": "No crea una relación nueva.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/userelationship/1",
        "title": "Ventas por fecha de envío",
        "language": "dax",
        "code": "Ventas enviadas = CALCULATE([Ventas], USERELATIONSHIP(Calendario[Date], Pedidos[Envio]))",
        "hint": "",
        "textOutput": "Con Calendario[Date]=2026-01-07: 120; Ventas normal queda BLANK.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/crossfilter",
    "remember": "Evita activar bidireccionalidad global solo para un cálculo.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/crossfilter/1",
        "title": "Contar clientes de una categoría",
        "language": "dax",
        "code": "Clientes compradores = CALCULATE(DISTINCTCOUNT(Clientes[ClienteID]), CROSSFILTER(Clientes[ClienteID], Pedidos[ClienteID], BOTH))",
        "hint": "",
        "textOutput": "Con Muebles: 2 clientes, Ana y Marta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/lookupvalue",
    "remember": "Debe haber un único resultado compatible; si hay relación usa RELATED cuando proceda.",
    "note": "Nueva columna de Pedidos.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/lookupvalue/1",
        "title": "Buscar país por identificador",
        "language": "dax",
        "code": "País encontrado = LOOKUPVALUE(Clientes[Pais], Clientes[ClienteID], Pedidos[ClienteID])",
        "hint": "",
        "textOutput": "Pedido 2: Espana.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/funciones-de-relaciones-dax/treatas",
    "remember": "El orden y cantidad de columnas deben coincidir.",
    "examples": [
      {
        "id": "powerbi/funciones-de-relaciones-dax/treatas/1",
        "title": "Aplicar filtro virtual de productos",
        "language": "dax",
        "code": "Ventas productos 1 y 3 = CALCULATE([Ventas], TREATAS({1,3}, Productos[ProductoID]))",
        "hint": "",
        "textOutput": "670 sin filtros adicionales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
