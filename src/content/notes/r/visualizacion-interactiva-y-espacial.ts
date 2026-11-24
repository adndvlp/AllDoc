// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/definicion",
    "remember": "Distingue interactividad, animación y análisis espacial.",
    "note": "Requiere plotly y un visor HTML.",
    "examples": [
      {
        "id": "r/visualizacion-interactiva-y-espacial/definicion/1",
        "title": "Crear un gráfico interactivo",
        "language": "r",
        "code": "plotly::plot_ly(productos, x = ~producto, y = ~precio, type = \"bar\")",
        "hint": "plot_ly usa las columnas para las marcas. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Tres barras interactivas con precios 50, 100 y 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/geometrias-y-crs",
    "remember": "Declara el CRS de origen y transforma antes de medir distancias si corresponde.",
    "note": "Requiere sf.",
    "examples": [
      {
        "id": "r/visualizacion-interactiva-y-espacial/geometrias-y-crs/1",
        "title": "Crear dos puntos de ejemplo",
        "language": "r",
        "code": "x <- data.frame(lon = c(-99, -98), lat = c(19, 20))\ng <- sf::st_as_sf(x, coords = c(\"lon\", \"lat\"), crs = 4326)\nsf::st_geometry_type(g)",
        "hint": "Las coordenadas están en longitud y latitud WGS84. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Dos geometrías POINT.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/mapas-y-uniones-espaciales",
    "remember": "Verifica que ambos objetos tengan CRS compatibles antes de unir.",
    "examples": [
      {
        "id": "r/visualizacion-interactiva-y-espacial/mapas-y-uniones-espaciales/1",
        "title": "Dibujar ubicaciones ficticias",
        "language": "r",
        "code": "g <- sf::st_as_sf(data.frame(lon = c(-99, -98), lat = c(19, 20)), coords = c(\"lon\", \"lat\"), crs = 4326)\nggplot2::ggplot(g) + ggplot2::geom_sf()",
        "hint": "geom_sf interpreta la columna de geometría. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Dos puntos en un plano de coordenadas geográficas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/visualizacion-interactiva-y-espacial/animacion",
    "remember": "Cada estado debe conservar una identificación coherente de marcas.",
    "note": "Requiere gganimate y un renderizador compatible para producir la animación.",
    "examples": [
      {
        "id": "r/visualizacion-interactiva-y-espacial/animacion/1",
        "title": "Definir una animación de ventas",
        "language": "r",
        "code": "x <- data.frame(mes = c(\"marzo\", \"abril\"), ventas = c(600, 150))\ng <- ggplot2::ggplot(x, ggplot2::aes(x = \"Total\", y = ventas)) + ggplot2::geom_col() + gganimate::transition_states(mes)\n# gganimate::animate(g)",
        "hint": "transition_states define estados sucesivos. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Objeto animable; al renderizar muestra una barra que cambia de 600 a 150.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
