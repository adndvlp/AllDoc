// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/autofiltros/definicion",
    "remember": "openpyxl guarda instrucciones; no elimina ni ordena físicamente las filas al configurarlas.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/autofiltros/definicion/1",
        "title": "Habilitar filtros en Ventas",
        "language": "python",
        "code": "ws.auto_filter.ref = 'A1:G6'\nprint(ws.auto_filter.ref)",
        "hint": "",
        "textOutput": "A1:G6; aparecen controles de filtro al abrir en Excel.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/autofiltros/filtrar-por-valores",
    "remember": "El índice col_id empieza en 0 dentro del rango, no en 1.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/autofiltros/filtrar-por-valores/1",
        "title": "Configurar regiones admitidas",
        "language": "python",
        "code": "ws.auto_filter.ref = 'A1:G6'\nws.auto_filter.add_filter_column(2,['Norte','Sur'])\nprint(ws.auto_filter.filterColumn[0].colId,ws.max_row)",
        "hint": "",
        "textOutput": "2 6; los datos siguen presentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/autofiltros/criterio-de-orden",
    "remember": "No reordena físicamente los datos desde Python.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/autofiltros/criterio-de-orden/1",
        "title": "Configurar orden descendente por precio",
        "language": "python",
        "code": "ws.auto_filter.ref = 'A1:G6'\nws.auto_filter.add_sort_condition('E2:E6',descending=True)\nprint(ws.auto_filter.sortState.sortCondition[0].descending)",
        "hint": "",
        "textOutput": "True; los valores en la hoja conservan su posición inicial hasta que se aplique el orden.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/autofiltros/filtros-numericos",
    "remember": "Los filtros avanzados se colocan dentro de FilterColumn.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/autofiltros/filtros-numericos/1",
        "title": "Seleccionar precios superiores a 100",
        "language": "python",
        "code": "from openpyxl.worksheet.filters import FilterColumn, CustomFilters, NumberFilter\nws.auto_filter.ref = 'A1:G6'\nf = NumberFilter(operator='greaterThan',val=100)\nws.auto_filter.filterColumn.append(FilterColumn(colId=4,customFilters=CustomFilters(customFilter=[f])))\nprint(ws.auto_filter.filterColumn[0].customFilters.customFilter[0].operator)",
        "hint": "",
        "textOutput": "greaterThan; se configura Precio > 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/autofiltros/filtros-texto-fecha",
    "remember": "Los índices son relativos al rango; los filtros de texto pueden usar comodines.",
    "note": "El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.",
    "examples": [
      {
        "id": "openpyxl/autofiltros/filtros-texto-fecha/1",
        "title": "Configurar filtros de producto y mes",
        "language": "python",
        "code": "from openpyxl.worksheet.filters import FilterColumn, CustomFilters, StringFilter, Filters, DateGroupItem\nws.auto_filter.ref = 'A1:G6'\nf = StringFilter(operator='contains',val='Mouse')\nws.auto_filter.filterColumn.append(FilterColumn(colId=1,customFilters=CustomFilters(customFilter=[f])))\nd = DateGroupItem(year=2026,month=8,dateTimeGrouping='month')\nws.auto_filter.filterColumn.append(FilterColumn(colId=5,filters=Filters(dateGroupItem=[d])))\nprint([f.colId for f in ws.auto_filter.filterColumn])",
        "hint": "",
        "textOutput": "[1, 5]; criterios sobre Producto y Fecha.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
