// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/definicion",
    "remember": "Identifica qué filtro quieres retirar, no borres todo sin necesidad.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/definicion/1",
        "title": "Comparar con total de países",
        "language": "dax",
        "code": "Ventas todos países = CALCULATE([Ventas], REMOVEFILTERS(Clientes[Pais]))",
        "hint": "",
        "textOutput": "En tabla por país, Mexico muestra total de referencia 1100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/removefilters-y-all",
    "remember": "REMOVEFILTERS expresa mejor la intención si solo quieres eliminar filtros.",
    "note": "Formatea como porcentaje.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/removefilters-y-all/1",
        "title": "Porcentaje del total por categoría",
        "language": "dax",
        "code": "% categoría = DIVIDE([Ventas], CALCULATE([Ventas], REMOVEFILTERS(Productos[Categoria])))",
        "hint": "",
        "textOutput": "Tecnologia 59.09%; Muebles 40.91%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/allexcept",
    "remember": "Especifica qué columna conserva el contexto.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/allexcept/1",
        "title": "Conservar país al quitar cliente",
        "language": "dax",
        "code": "Ventas país = CALCULATE([Ventas], ALLEXCEPT(Clientes, Clientes[Pais]))",
        "hint": "",
        "textOutput": "En matriz Pais > Nombre, fila Mexico/Ana: 820, si Pais está filtrado explícitamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/allselected",
    "remember": "No es idéntico a ALL; depende del contexto de consulta.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/allselected/1",
        "title": "Calcular participación entre clientes seleccionados",
        "language": "dax",
        "code": "% seleccionado = DIVIDE([Ventas], CALCULATE([Ventas], ALLSELECTED(Clientes[Nombre])))",
        "hint": "",
        "textOutput": "En tabla por nombre y segmentador que selecciona Ana y Marta: Ana 63.41%, Marta 36.59%.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/selectedvalue-y-hasonevalue",
    "remember": "No devuelve una lista si hay varias selecciones.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/selectedvalue-y-hasonevalue/1",
        "title": "Título por categoría",
        "language": "dax",
        "code": "Título categoría = \"Ventas - \" & SELECTEDVALUE(Productos[Categoria], \"Todas o varias\")",
        "hint": "",
        "textOutput": "Con Muebles: Ventas - Muebles; sin filtro: Ventas - Todas o varias.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/modificar-el-contexto-de-filtro/isfiltered-e-isinscope",
    "remember": "Un filtro y un nivel de agrupación son cosas distintas.",
    "examples": [
      {
        "id": "powerbi/modificar-el-contexto-de-filtro/isfiltered-e-isinscope/1",
        "title": "Detectar detalle de matriz",
        "language": "dax",
        "code": "Nivel = IF(ISINSCOPE(Productos[Producto]), \"Producto\", \"Categoría o total\")",
        "hint": "",
        "textOutput": "Matriz Categoria > Producto: filas de producto muestran Producto; subtotales muestran Categoría o total.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
