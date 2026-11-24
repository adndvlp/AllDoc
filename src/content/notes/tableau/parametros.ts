// Generado desde specs/tableau.md por scripts/prepare-tableau-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/tableau/parametros/definicion",
    "remember": "Un parámetro no filtra nada por sí solo.",
    "examples": [
      {
        "id": "tableau/parametros/definicion/1",
        "title": "Crear umbral",
        "code": "",
        "steps": [
          "Data pane > Create Parameter",
          "nombre Umbral, Integer, valor 200",
          "Show Parameter",
          "crea [Ventas]>=[Umbral] y muestra por Linea."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Cinco líneas cumplen con 200 o más.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/parametros/lista-rango-y-fechas",
    "remember": "Elige el tipo antes de referenciarlo.",
    "examples": [
      {
        "id": "tableau/parametros/lista-rango-y-fechas/1",
        "title": "Seleccionar región",
        "code": "",
        "steps": [
          "Crea parámetro string Zona con Norte y Sur",
          "crea [Region]=[Zona] y usa True en Filters."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Al seleccionar Sur, total 1050.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/parametros/selector-de-metricas",
    "remember": "Las ramas deben devolver tipos compatibles.",
    "examples": [
      {
        "id": "tableau/parametros/selector-de-metricas/1",
        "title": "Alternar ventas y beneficio",
        "code": "",
        "steps": [
          "Crea parámetro string Metrica con Ventas y Beneficio",
          "cálculo CASE [Metrica] WHEN 'Ventas' THEN SUM([Ventas]) WHEN 'Beneficio' THEN SUM([Ventas]-[Costo]) END",
          "ponlo en Text."
        ],
        "external": true,
        "hint": "",
        "textOutput": "El control alterna 1750 y 640.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/parametros/top-n-dinamico",
    "remember": "Configura el universo antes del ranking.",
    "examples": [
      {
        "id": "tableau/parametros/top-n-dinamico/1",
        "title": "Cambiar número de productos",
        "code": "",
        "steps": [
          "Crea parámetro entero N con rango 1 a 4",
          "en filtro Top de Producto usa By field > Top [N] por SUM(Ventas)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "N=2 muestra Silla y Teclado; N=1 solo Silla.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/parametros/parametros-dinamicos",
    "remember": "No equivale a una lista que se recalcula con cada filtro.",
    "examples": [
      {
        "id": "tableau/parametros/parametros-dinamicos/1",
        "title": "Actualizar lista de regiones",
        "code": "",
        "external": true,
        "hint": "Crea parámetro string con lista obtenida de Region y configura actualización al abrir el workbook si está disponible.",
        "textOutput": "La lista se obtiene de Norte y Sur al abrirlo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/tableau/parametros/escenarios-what-if",
    "remember": "Distingue supuesto de dato observado.",
    "examples": [
      {
        "id": "tableau/parametros/escenarios-what-if/1",
        "title": "Simular descuento",
        "code": "",
        "steps": [
          "Parámetro decimal Descuento=0.1",
          "fórmula SUM([Ventas])*(1-[Descuento])."
        ],
        "external": true,
        "hint": "",
        "textOutput": "1575; al cambiar a 0 vuelve a 1750.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
