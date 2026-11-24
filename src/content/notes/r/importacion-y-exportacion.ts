// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/importacion-y-exportacion/definicion",
    "remember": "Declara separadores, tipos y codificación cuando sea necesario.",
    "note": "Requiere readr.",
    "examples": [
      {
        "id": "r/importacion-y-exportacion/definicion/1",
        "title": "Leer un CSV pequeño",
        "language": "r",
        "code": "readr::read_csv(I(\"id,monto\\n1,100\\n2,200\"), show_col_types = FALSE)",
        "hint": "`I()` indica texto literal en vez de ruta.",
        "textOutput": "Tabla 2×2: `(1,100)`, `(2,200)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/importacion-y-exportacion/csv-y-tipos-de-columnas",
    "remember": "Conserva los identificadores con ceros a la izquierda como texto.",
    "examples": [
      {
        "id": "r/importacion-y-exportacion/csv-y-tipos-de-columnas/1",
        "title": "Leer códigos de cliente",
        "language": "r",
        "code": "readr::read_csv(I(\"codigo,monto\\n001,100\"),\n  col_types = readr::cols(codigo = readr::col_character()))",
        "hint": "La columna codigo no se convierte en número.",
        "textOutput": "Fila codigo `\"001\"`, monto 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/importacion-y-exportacion/excel",
    "remember": "Selecciona la hoja y revisa los tipos inferidos.",
    "note": "Requiere readxl y writexl.",
    "examples": [
      {
        "id": "r/importacion-y-exportacion/excel/1",
        "title": "Crear y leer una hoja de prueba",
        "language": "r",
        "code": "ruta <- tempfile(fileext = \".xlsx\")\nwritexl::write_xlsx(list(Ventas = data.frame(monto = c(10, 20))), ruta)\nreadxl::read_excel(ruta, sheet = \"Ventas\")",
        "hint": "Se usa un archivo temporal. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Tabla con monto 10 y 20.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/importacion-y-exportacion/json",
    "remember": "Verifica si la salida es lista o data frame.",
    "note": "Requiere jsonlite.",
    "examples": [
      {
        "id": "r/importacion-y-exportacion/json/1",
        "title": "Leer registros JSON",
        "language": "r",
        "code": "jsonlite::fromJSON('[{\"id\":1,\"monto\":100},{\"id\":2,\"monto\":200}]')",
        "hint": "El arreglo de objetos homogéneos se simplifica a tabla.",
        "textOutput": "Data frame con dos filas `(1,100)` y `(2,200)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/importacion-y-exportacion/exportar-csv-y-rds",
    "remember": "CSV es interoperable; RDS conserva atributos de R.",
    "examples": [
      {
        "id": "r/importacion-y-exportacion/exportar-csv-y-rds/1",
        "title": "Guardar y recuperar un resumen",
        "language": "r",
        "code": "ruta <- tempfile(fileext = \".rds\")\nsaveRDS(pedidos, ruta)\nidentical(readRDS(ruta), pedidos)",
        "hint": "La ida y vuelta conserva el objeto.",
        "textOutput": "`TRUE`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
