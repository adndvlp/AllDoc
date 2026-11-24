// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/reportes-reproducibles/definicion",
    "remember": "El documento debe declarar datos, dependencias y pasos.",
    "note": "Requiere knitr.",
    "examples": [
      {
        "id": "r/reportes-reproducibles/definicion/1",
        "title": "Generar una tabla para un reporte",
        "language": "r",
        "code": "knitr::kable(data.frame(pais = c(\"MX\", \"ES\"), ventas = c(300, 100)))",
        "hint": "kable prepara la tabla para el documento. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Tabla Markdown o del formato activo con dos filas y columnas pais y ventas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reportes-reproducibles/quarto-y-r-markdown",
    "remember": "Un documento reproducible no debe depender de objetos creados manualmente en la consola.",
    "note": "Para renderizar se necesita Quarto CLI, paquete quarto y un motor R/knitr disponible; R Markdown usa rmarkdown::render().",
    "examples": [
      {
        "id": "r/reportes-reproducibles/quarto-y-r-markdown/1",
        "title": "Preparar y renderizar un reporte mínimo",
        "language": "r",
        "code": "ruta <- tempfile(fileext = \".qmd\")\nwriteLines(c(\"---\", \"title: Ventas\", \"format: html\", \"---\", \"\", \"```{r}\", \"sum(c(100, 200))\", \"```\"), ruta)\n# quarto::quarto_render(ruta)",
        "hint": "La llamada de renderizado queda comentada para no exigir la instalación de Quarto. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Archivo QMD que, al renderizarse, muestra el resultado 300 en HTML.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reportes-reproducibles/semillas-y-dependencias",
    "remember": "`renv::snapshot()` registra; `renv::restore()` restaura.",
    "note": "Requiere renv; init, snapshot y restore deben ejecutarse conscientemente en el proyecto correspondiente.",
    "examples": [
      {
        "id": "r/reportes-reproducibles/semillas-y-dependencias/1",
        "title": "Consultar instrucciones de restauración",
        "language": "r",
        "code": "help(\"restore\", package = \"renv\")",
        "hint": "La consulta no instala ni cambia paquetes. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Documentación de la restauración de dependencias.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/reportes-reproducibles/control-de-versiones-y-pipelines",
    "remember": "Versiona código y configuración; excluye secretos y datos sensibles.",
    "note": "Requiere targets y un archivo `_targets.R` para ejecutar el pipeline completo.",
    "examples": [
      {
        "id": "r/reportes-reproducibles/control-de-versiones-y-pipelines/1",
        "title": "Definir una etapa de cálculo",
        "language": "r",
        "code": "targets::tar_target(total, sum(c(100, 200)))",
        "hint": "tar_target define la etapa; tar_make la ejecuta dentro de un pipeline. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Objeto de especificación de una etapa llamada total, que calcularía 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
