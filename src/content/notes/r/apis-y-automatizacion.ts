// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/apis-y-automatizacion/definicion",
    "remember": "Comprueba código de estado, estructura y paginación antes de analizar.",
    "note": "Requiere httr2.",
    "examples": [
      {
        "id": "r/apis-y-automatizacion/definicion/1",
        "title": "Construir una solicitud sin enviarla",
        "language": "r",
        "code": "req <- httr2::request(\"https://example.org\") |> httr2::req_url_query(page = 2)\nreq",
        "hint": "Construir el objeto no hace una llamada de red. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Solicitud GET a https://example.org/?page=2 (representación según versión).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/apis-y-automatizacion/autenticacion-y-respuestas",
    "remember": "Usa variables de entorno y evita imprimir secretos.",
    "examples": [
      {
        "id": "r/apis-y-automatizacion/autenticacion-y-respuestas/1",
        "title": "Preparar autenticación sin ejecutar",
        "language": "r",
        "code": "token <- \"TOKEN_DE_EJEMPLO_NO_REAL\"\nreq <- httr2::request(\"https://example.org\") |> httr2::req_auth_bearer_token(token)\ninherits(req, \"httr2_request\")",
        "hint": "No se envía la petición ni se usa un token real. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "`TRUE`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/apis-y-automatizacion/paginacion-y-reintentos",
    "remember": "Respeta límites de solicitudes y detén el recorrido cuando no exista siguiente página.",
    "examples": [
      {
        "id": "r/apis-y-automatizacion/paginacion-y-reintentos/1",
        "title": "Unir páginas simuladas",
        "language": "r",
        "code": "paginas <- list(data.frame(id = 1:2), data.frame(id = 3:4))\nbind_rows(paginas)",
        "hint": "La unión representa páginas ya recuperadas, sin acceder a una API real.",
        "textOutput": "Cuatro filas id 1,2,3,4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/apis-y-automatizacion/procesar-archivos-por-lotes",
    "remember": "Valida esquemas antes de concatenar.",
    "examples": [
      {
        "id": "r/apis-y-automatizacion/procesar-archivos-por-lotes/1",
        "title": "Leer dos archivos de prueba",
        "language": "r",
        "code": "dir <- tempfile(); dir.create(dir)\nwrite.csv(data.frame(monto = 10), file.path(dir, \"a.csv\"), row.names = FALSE)\nwrite.csv(data.frame(monto = 20), file.path(dir, \"b.csv\"), row.names = FALSE)\narchivos <- list.files(dir, pattern = \"[.]csv$\", full.names = TRUE)\nbind_rows(lapply(archivos, read.csv))",
        "hint": "Se trabaja únicamente en un directorio temporal.",
        "textOutput": "Dos filas con monto 10 y 20.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
