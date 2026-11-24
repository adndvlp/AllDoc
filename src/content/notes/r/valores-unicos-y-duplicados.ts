// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/valores-unicos-y-duplicados/definicion",
    "remember": "Define qué columnas identifican un registro duplicado.",
    "examples": [
      {
        "id": "r/valores-unicos-y-duplicados/definicion/1",
        "title": "Mostrar países únicos",
        "language": "r",
        "code": "clientes |> distinct(pais)",
        "hint": "NA se conserva como un valor distinto.",
        "textOutput": "Tres filas en orden de aparición: MX, ES, NA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/valores-unicos-y-duplicados/detectar-duplicados",
    "remember": "Excluye NA si no representa una clave real.",
    "examples": [
      {
        "id": "r/valores-unicos-y-duplicados/detectar-duplicados/1",
        "title": "Detectar correos repetidos",
        "language": "r",
        "code": "leads |> filter(!is.na(email)) |> count(email) |> filter(n > 1)",
        "hint": "No se eliminan registros aún.",
        "textOutput": "Fila `ana@ejemplo.mx`, n=2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/valores-unicos-y-duplicados/conservar-una-fila-por-clave",
    "remember": "Ordena primero según la regla de prioridad.",
    "examples": [
      {
        "id": "r/valores-unicos-y-duplicados/conservar-una-fila-por-clave/1",
        "title": "Conservar el primer lead por email informado",
        "language": "r",
        "code": "leads |> filter(!is.na(email)) |> arrange(id) |> distinct(email, .keep_all = TRUE) |> pull(id)",
        "hint": "El lead 3 se descarta por repetir el email del 1.",
        "textOutput": "`c(1, 2, 5)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
