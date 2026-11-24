// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/definicion",
    "remember": "Mide antes de optimizar; verifica equivalencia después.",
    "examples": [
      {
        "id": "r/rendimiento-y-datos-grandes/definicion/1",
        "title": "Medir un cálculo",
        "language": "r",
        "code": "system.time(sum(seq_len(100000)))",
        "hint": "system.time mide la evaluación de la expresión.",
        "textOutput": "Tiempo de usuario, sistema y transcurrido; depende del equipo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/data-table",
    "remember": "`:=` modifica por referencia; usa `copy()` si necesitas preservar el original.",
    "note": "Requiere data.table.",
    "examples": [
      {
        "id": "r/rendimiento-y-datos-grandes/data-table/1",
        "title": "Sumar por cliente",
        "language": "r",
        "code": "dt <- data.table::as.data.table(pedidos)\ndt[, .(total = sum(monto)), by = cliente_id]",
        "hint": "by agrupa antes de calcular j. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Filas `(1,300)`, `(2,400)`, `(3,200)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/profiling-y-memoria",
    "remember": "El tamaño de un objeto no equivale siempre a toda la memoria del proceso.",
    "examples": [
      {
        "id": "r/rendimiento-y-datos-grandes/profiling-y-memoria/1",
        "title": "Comparar tamaños de vectores",
        "language": "r",
        "code": "object.size(numeric(1000)) > object.size(numeric(10))",
        "hint": "Se comparan dos objetos del mismo tipo.",
        "textOutput": "`TRUE`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/arrow-y-parquet",
    "remember": "Selecciona y filtra antes de materializar grandes datasets.",
    "note": "Requiere arrow.",
    "examples": [
      {
        "id": "r/rendimiento-y-datos-grandes/arrow-y-parquet/1",
        "title": "Guardar y leer una tabla pequeña",
        "language": "r",
        "code": "ruta <- tempfile(fileext = \".parquet\")\narrow::write_parquet(pedidos, ruta)\nnrow(arrow::read_parquet(ruta))",
        "hint": "Se conserva el número de registros. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "`6`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/rendimiento-y-datos-grandes/duckdb",
    "remember": "Proyecta columnas y filtra antes de traer datos a memoria.",
    "note": "Requiere duckdb y DBI.",
    "examples": [
      {
        "id": "r/rendimiento-y-datos-grandes/duckdb/1",
        "title": "Ejecutar SQL analítico local",
        "language": "r",
        "code": "con <- DBI::dbConnect(duckdb::duckdb(), dbdir = \":memory:\")\nDBI::dbGetQuery(con, \"SELECT 100 + 200 AS total\")\nDBI::dbDisconnect(con, shutdown = TRUE)",
        "hint": "El motor ejecuta la consulta sin servidor remoto. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Una fila total=300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
