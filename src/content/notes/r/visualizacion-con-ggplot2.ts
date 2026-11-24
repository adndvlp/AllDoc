// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/definicion",
    "remember": "Mapea variables dentro de aes; fija estilos constantes fuera.",
    "note": "Requiere ggplot2; en scripts usa print() para mostrar objetos gráficos.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/definicion/1",
        "title": "Graficar dos cantidades",
        "language": "r",
        "code": "ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col()",
        "hint": "geom_col usa alturas existentes.",
        "textOutput": "Tres barras: Mouse 50, Teclado 100 y Monitor 300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/barras-y-conteos",
    "remember": "No vuelvas a contar una tabla ya agregada si quieres graficar sumas.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/barras-y-conteos/1",
        "title": "Graficar frecuencia de estados",
        "language": "r",
        "code": "ggplot2::ggplot(pedidos, ggplot2::aes(estado)) + ggplot2::geom_bar()",
        "hint": "La estadística por defecto es el conteo.",
        "textOutput": "Barras cancelado=1 y completado=5.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/lineas-y-series-temporales",
    "remember": "Agrega a la granularidad deseada antes de conectar puntos.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/lineas-y-series-temporales/1",
        "title": "Graficar ingresos de dos meses",
        "language": "r",
        "code": "x <- pedidos |> filter(estado == \"completado\") |> mutate(mes = format(fecha, \"%Y-%m\")) |> group_by(mes) |> summarise(total = sum(monto), .groups = \"drop\")\nggplot2::ggplot(x, ggplot2::aes(mes, total, group = 1)) + ggplot2::geom_line() + ggplot2::geom_point()",
        "hint": "group=1 conecta los dos meses discretos.",
        "textOutput": "Línea de marzo 600 a abril 150.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/histogramas-y-boxplots",
    "remember": "El ancho de intervalo modifica la lectura del histograma.",
    "note": "Con pocos datos conviene mostrar también los puntos.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/histogramas-y-boxplots/1",
        "title": "Visualizar dispersión por estado",
        "language": "r",
        "code": "ggplot2::ggplot(pedidos, ggplot2::aes(estado, monto)) + ggplot2::geom_boxplot()",
        "hint": "El boxplot resume cada grupo.",
        "textOutput": "Dos cajas; cancelado tiene una observación en 150 y completado cinco observaciones.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/dispersion-y-ajuste",
    "remember": "Un ajuste visual no establece causalidad.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/dispersion-y-ajuste/1",
        "title": "Relacionar precio e importe simulado",
        "language": "r",
        "code": "x <- data.frame(precio = c(10, 20, 30), ingreso = c(20, 40, 60))\nggplot2::ggplot(x, ggplot2::aes(precio, ingreso)) + ggplot2::geom_point() + ggplot2::geom_smooth(method = \"lm\", se = FALSE)",
        "hint": "lm ajusta una recta.",
        "textOutput": "Tres puntos alineados y recta con pendiente 2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/facetas-escalas-y-temas",
    "remember": "Usa escalas comparables al contrastar paneles.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/facetas-escalas-y-temas/1",
        "title": "Separar productos por categoría",
        "language": "r",
        "code": "ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col() + ggplot2::facet_wrap(~categoria) + ggplot2::labs(x = \"Producto\", y = \"Precio\") + ggplot2::theme_minimal()",
        "hint": "La fórmula de facet define la categoría de panel.",
        "textOutput": "Dos paneles: Accesorios y Pantallas, con sus barras.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-con-ggplot2/guardar-graficos",
    "remember": "Pasa explícitamente el objeto gráfico.",
    "examples": [
      {
        "id": "r/visualizacion-con-ggplot2/guardar-graficos/1",
        "title": "Exportar un PNG temporal",
        "language": "r",
        "code": "g <- ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col()\nruta <- tempfile(fileext = \".png\")\nggplot2::ggsave(ruta, plot = g, width = 6, height = 4, dpi = 150)\nfile.exists(ruta)",
        "hint": "El tamaño en pulgadas se multiplica por dpi.",
        "textOutput": "`TRUE`; PNG de 900×600 píxeles.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
