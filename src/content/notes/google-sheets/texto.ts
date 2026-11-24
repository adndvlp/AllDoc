// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/texto/definicion",
    "remember": "Los espacios y caracteres ocultos afectan coincidencias.",
    "examples": [
      {
        "id": "google-sheets/texto/definicion/1",
        "title": "Normalizar nombre",
        "language": "excel-formula",
        "code": "=UPPER(Clientes!B2)",
        "hint": "",
        "textOutput": "ANA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/left-right-mid",
    "remember": "MID comienza en posición 1.",
    "examples": [
      {
        "id": "google-sheets/texto/left-right-mid/1",
        "title": "Extraer partes de un código",
        "language": "excel-formula",
        "code": "={LEFT(\"MX-123\",2),RIGHT(\"MX-123\",3),MID(\"MX-123\",4,3)}",
        "hint": "",
        "textOutput": "MX, 123, 123 (texto).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/len",
    "remember": "Sirve para validar longitud de IDs.",
    "examples": [
      {
        "id": "google-sheets/texto/len/1",
        "title": "Medir código",
        "language": "excel-formula",
        "code": "=LEN(\"MX-123\")",
        "hint": "",
        "textOutput": "6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/trim-y-clean",
    "remember": "No limpian todos los espacios Unicode.",
    "examples": [
      {
        "id": "google-sheets/texto/trim-y-clean/1",
        "title": "Quitar espacios y saltos de línea",
        "language": "excel-formula",
        "code": "=TRIM(CLEAN(\"  Ana\"&CHAR(10)&\"  \"))",
        "hint": "",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/upper-lower-proper",
    "remember": "No modifican la celda de origen.",
    "examples": [
      {
        "id": "google-sheets/texto/upper-lower-proper/1",
        "title": "Normalizar nombre y correo",
        "language": "excel-formula",
        "code": "={PROPER(\"ana lopez\"),LOWER(\"ANA@EXAMPLE.COM\")}",
        "hint": "",
        "textOutput": "Ana Lopez, ana@example.com.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/find-y-search",
    "remember": "Si no hay coincidencia devuelven error.",
    "examples": [
      {
        "id": "google-sheets/texto/find-y-search/1",
        "title": "Localizar arroba",
        "language": "excel-formula",
        "code": "=FIND(\"@\",Clientes!E2)",
        "hint": "",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/replace-y-substitute",
    "remember": "Elige según conozcas posición o contenido.",
    "examples": [
      {
        "id": "google-sheets/texto/replace-y-substitute/1",
        "title": "Normalizar un separador",
        "language": "excel-formula",
        "code": "=SUBSTITUTE(\"MX-123\",\"-\",\"_\")",
        "hint": "",
        "textOutput": "MX_123.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/concat-y-concatenate",
    "remember": "No añaden separadores automáticamente.",
    "examples": [
      {
        "id": "google-sheets/texto/concat-y-concatenate/1",
        "title": "Construir clave",
        "language": "excel-formula",
        "code": "=CONCATENATE(\"MX\",\"-\",123)",
        "hint": "",
        "textOutput": "MX-123.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/textjoin-y-join",
    "remember": "Útiles para listas y etiquetas.",
    "examples": [
      {
        "id": "google-sheets/texto/textjoin-y-join/1",
        "title": "Unir tres nombres",
        "language": "excel-formula",
        "code": "=TEXTJOIN(\", \",TRUE,Clientes!B2:B4)",
        "hint": "",
        "textOutput": "Ana, Luis, Marta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/split",
    "remember": "El tercer argumento FALSE trata un delimitador de varios caracteres como unidad.",
    "examples": [
      {
        "id": "google-sheets/texto/split/1",
        "title": "Separar ciudad y país",
        "language": "excel-formula",
        "code": "=SPLIT(\"CDMX-Mexico\",\"-\")",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "CDMX, Mexico en dos columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/exact",
    "remember": "No equivale a la comparación habitual sin distinción de caso.",
    "examples": [
      {
        "id": "google-sheets/texto/exact/1",
        "title": "Comparar códigos",
        "language": "excel-formula",
        "code": "=EXACT(\"abc\",\"ABC\")",
        "hint": "",
        "textOutput": "FALSE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/texto/char-code-rept-t",
    "remember": "Útiles para limpieza y presentación.",
    "examples": [
      {
        "id": "google-sheets/texto/char-code-rept-t/1",
        "title": "Crear una barra textual",
        "language": "excel-formula",
        "code": "=REPT(\"#\",5)",
        "hint": "",
        "textOutput": "#####.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
