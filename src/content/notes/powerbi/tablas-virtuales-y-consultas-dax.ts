// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/definicion",
    "remember": "Una medida necesita resultado escalar, no tabla.",
    "note": "Ejecuta en vista Consulta DAX, no como medida.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/definicion/1",
        "title": "Consultar valores de categoría",
        "language": "dax",
        "code": "EVALUATE\nSUMMARIZECOLUMNS(Productos[Categoria], \"Ventas\", [Ventas])\nORDER BY [Ventas] DESC",
        "hint": "",
        "textOutput": "Tecnologia 650; Muebles 450.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/summarize-y-summarizecolumns",
    "remember": "Comprueba el grano y contexto de filtros.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/summarize-y-summarizecolumns/1",
        "title": "Resumir ventas por país",
        "language": "dax",
        "code": "EVALUATE\nSUMMARIZECOLUMNS(Clientes[Pais], \"Ventas\", [Ventas])\nORDER BY [Ventas] DESC",
        "hint": "",
        "textOutput": "Mexico 820; Espana 280; se omite grupo con todas las expresiones en blanco.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/addcolumns-y-selectcolumns",
    "remember": "No confundir proyección con agregación.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/addcolumns-y-selectcolumns/1",
        "title": "Proyectar productos",
        "language": "dax",
        "code": "EVALUATE\nSELECTCOLUMNS(Productos, \"Nombre\", Productos[Producto], \"Costo\", Productos[Costo])\nORDER BY [Costo]",
        "hint": "",
        "textOutput": "Mouse 40; Teclado 50; Silla 70.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/topn",
    "remember": "TOPN no garantiza orden final de salida.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/topn/1",
        "title": "Seleccionar dos pedidos más caros",
        "language": "dax",
        "code": "EVALUATE\nTOPN(2, ADDCOLUMNS(Pedidos, \"ImportePedido\", Pedidos[Cantidad]*Pedidos[Precio]), [ImportePedido], DESC, Pedidos[PedidoID], ASC)\nORDER BY [ImportePedido] DESC",
        "hint": "",
        "textOutput": "Pedido 6 con 300 y pedido 2 con 200, junto a las demás columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/generateseries-y-parametros-numericos",
    "remember": "Un parámetro desconectado no filtra hechos automáticamente.",
    "note": "Nueva tabla. Medida de simulación: `[Ventas] * (1 - SELECTEDVALUE(Descuentos[Value], 0))`; al seleccionar 0.10, devuelve 990.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/generateseries-y-parametros-numericos/1",
        "title": "Simular descuento",
        "language": "dax",
        "code": "Descuentos = GENERATESERIES(0, 0.2, 0.05)",
        "hint": "",
        "textOutput": "Cinco filas Value: 0, 0.05, 0.10, 0.15, 0.20.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/contains",
    "remember": "Devuelve TRUE o FALSE, no una fila.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/contains/1",
        "title": "Verificar si existe un producto",
        "language": "dax",
        "code": "Existe Mouse = CONTAINS(Productos, Productos[Producto], \"Mouse\")",
        "hint": "",
        "textOutput": "TRUE sin filtros.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/tablas-virtuales-y-consultas-dax/union-intersect-y-except",
    "remember": "El orden de columnas debe corresponder y los duplicados importan.",
    "note": "Ejecuta en vista Consulta DAX. Requiere columna Año de Calendario.",
    "examples": [
      {
        "id": "powerbi/tablas-virtuales-y-consultas-dax/union-intersect-y-except/1",
        "title": "Comparar compradores de dos años",
        "language": "dax",
        "code": "EVALUATE\nEXCEPT(\n    CALCULATETABLE(VALUES(Pedidos[ClienteID]), Calendario[Año]=2026, Pedidos[Estado]=\"completed\"),\n    CALCULATETABLE(VALUES(Pedidos[ClienteID]), Calendario[Año]=2025, Pedidos[Estado]=\"completed\")\n)",
        "hint": "",
        "textOutput": "Una fila, ClienteID 3, que compró en 2026 pero no en 2025.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
