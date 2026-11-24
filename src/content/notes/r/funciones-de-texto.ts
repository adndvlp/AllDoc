// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/funciones-de-texto/definicion",
    "remember": "Las funciones de stringr suelen trabajar con vectores.",
    "note": "Requiere stringr en las fichas que usan `str_*`.",
    "examples": [
      {
        "id": "r/funciones-de-texto/definicion/1",
        "title": "Normalizar mayúsculas",
        "language": "r",
        "code": "stringr::str_to_upper(c(\"mx\", \"es\"))",
        "hint": "Se convierte cada cadena.",
        "textOutput": "`c(\"MX\", \"ES\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-texto/longitud-y-subcadenas",
    "remember": "Las posiciones de texto empiezan en 1.",
    "examples": [
      {
        "id": "r/funciones-de-texto/longitud-y-subcadenas/1",
        "title": "Extraer prefijos",
        "language": "r",
        "code": "stringr::str_sub(c(\"MX-001\", \"ES-002\"), 1, 2)",
        "hint": "Los límites son inclusivos.",
        "textOutput": "`c(\"MX\", \"ES\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-texto/espacios-y-reemplazos",
    "remember": "Usa limpieza antes de comparar claves textuales.",
    "examples": [
      {
        "id": "r/funciones-de-texto/espacios-y-reemplazos/1",
        "title": "Normalizar un nombre",
        "language": "r",
        "code": "stringr::str_squish(\"  Ana   López  \")",
        "hint": "También reduce espacios interiores.",
        "textOutput": "`\"Ana López\"`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-texto/concatenacion-y-separacion",
    "remember": "`sep` separa componentes; `collapse` junta elementos del vector.",
    "examples": [
      {
        "id": "r/funciones-de-texto/concatenacion-y-separacion/1",
        "title": "Crear códigos",
        "language": "r",
        "code": "paste(c(\"MX\", \"ES\"), c(\"001\", \"002\"), sep = \"-\")",
        "hint": "Se combinan por posición.",
        "textOutput": "`c(\"MX-001\", \"ES-002\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-texto/expresiones-regulares",
    "remember": "Escapa metacaracteres o usa búsqueda literal.",
    "note": "No valida por completo una dirección de correo.",
    "examples": [
      {
        "id": "r/funciones-de-texto/expresiones-regulares/1",
        "title": "Detectar correos mexicanos",
        "language": "r",
        "code": "stringr::str_detect(leads$email, \"[.]mx$\")",
        "hint": "`[.]` representa un punto literal.",
        "textOutput": "`c(TRUE, TRUE, TRUE, NA, TRUE)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/funciones-de-texto/extraer-y-sustituir-patrones",
    "remember": "Una coincidencia ausente produce NA en str_extract.",
    "examples": [
      {
        "id": "r/funciones-de-texto/extraer-y-sustituir-patrones/1",
        "title": "Extraer número de un cupón",
        "language": "r",
        "code": "stringr::str_extract(c(\"A10\", \"B5\", \"sin\"), \"[0-9]+\")",
        "hint": "Se extrae un bloque de dígitos.",
        "textOutput": "`c(\"10\", \"5\", NA)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
