// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/definicion",
    "remember": "Conserva los identificadores como texto si sus ceros iniciales importan.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/definicion/1",
        "title": "Normalizar nombre",
        "language": "excel",
        "code": "=UPPER(Customers!B2)",
        "hint": "Conserva los identificadores como texto si sus ceros iniciales importan.",
        "textOutput": "ANA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/upper-lower-y-proper",
    "remember": "Normalizar texto no corrige diferencias semánticas.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/upper-lower-y-proper/1",
        "title": "Normalizar correo",
        "language": "excel",
        "code": "=LOWER(\"ANA@EXAMPLE.COM\")",
        "hint": "Normalizar texto no corrige diferencias semánticas.",
        "textOutput": "ana@example.com.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/left-right-y-mid",
    "remember": "Las posiciones de MID comienzan en 1.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/left-right-y-mid/1",
        "title": "Extraer identificador",
        "language": "excel",
        "code": "=LEFT(\"P123\",1)\n=RIGHT(\"P123\",3)\n=MID(\"P123\",2,2)",
        "hint": "Las posiciones de MID comienzan en 1.",
        "textOutput": "P, 123 como texto, 12 como texto.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/len",
    "remember": "Los espacios también cuentan.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/len/1",
        "title": "Validar longitud",
        "language": "excel",
        "code": "=LEN(\"C001\")",
        "hint": "Los espacios también cuentan.",
        "textOutput": "4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/trim-y-clean",
    "remember": "No eliminan todos los caracteres invisibles Unicode.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/trim-y-clean/1",
        "title": "Limpiar nombre",
        "language": "excel",
        "code": "=TRIM(\"  Ana   Ruiz  \")",
        "hint": "No eliminan todos los caracteres invisibles Unicode.",
        "textOutput": "Ana Ruiz.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "excel/funciones-de-texto/trim-y-clean/2",
        "title": "Eliminar tabulador",
        "language": "excel",
        "code": "=CLEAN(\"Ana\"&CHAR(9)&\"Ruiz\")",
        "hint": "No eliminan todos los caracteres invisibles Unicode.",
        "textOutput": "AnaRuiz.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/substitute-y-replace",
    "remember": "Texto buscado frente a posición fija.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/substitute-y-replace/1",
        "title": "Normalizar separador",
        "language": "excel",
        "code": "=SUBSTITUTE(\"C-001\",\"-\",\"\")",
        "hint": "Texto buscado frente a posición fija.",
        "textOutput": "C001.",
        "resultLabel": "Ver resultado esperado"
      },
      {
        "id": "excel/funciones-de-texto/substitute-y-replace/2",
        "title": "Cambiar prefijo",
        "language": "excel",
        "code": "=REPLACE(\"OLD001\",1,3,\"NEW\")",
        "hint": "Texto buscado frente a posición fija.",
        "textOutput": "NEW001.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/find-y-search",
    "remember": "Ambas producen error si no encuentran el texto.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/find-y-search/1",
        "title": "Localizar arroba",
        "language": "excel",
        "code": "=FIND(\"@\",Leads!B2)\n=SEARCH(\"ANA\",Leads!B2)",
        "hint": "Ambas producen error si no encuentran el texto.",
        "textOutput": "4 y 1.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/concat-y-textjoin",
    "remember": "TEXTJOIN evita añadir separadores a mano.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/concat-y-textjoin/1",
        "title": "Crear etiqueta",
        "language": "excel",
        "code": "=CONCAT(Customers!A2,\"-\",Customers!B2)\n=TEXTJOIN(\", \",TRUE,Customers!B2:B4)",
        "hint": "TEXTJOIN evita añadir separadores a mano.",
        "textOutput": "C1-Ana; Ana, Luis, Marta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/exact",
    "remember": "= suele ignorar mayúsculas en comparaciones de texto; EXACT no.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/exact/1",
        "title": "Comparar códigos",
        "language": "excel",
        "code": "=EXACT(\"ABC\",\"abc\")",
        "hint": "= suele ignorar mayúsculas en comparaciones de texto; EXACT no.",
        "textOutput": "FALSE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/textbefore-y-textafter",
    "remember": "Sirven cuando la posición del delimitador varía.",
    "note": "Microsoft 365 / Excel 2024; alternativa antigua: LEFT y FIND, o MID y LEN.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/textbefore-y-textafter/1",
        "title": "Separar correo",
        "language": "excel",
        "code": "=TEXTBEFORE(Leads!B2,\"@\")\n=TEXTAFTER(Leads!B2,\"@\")",
        "hint": "Sirven cuando la posición del delimitador varía.",
        "textOutput": "ana; example.com.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/funciones-de-texto/textsplit",
    "remember": "Deja libre el área de derrame.",
    "note": "Microsoft 365 / Excel 2024; alternativa de interfaz: Texto en columnas.",
    "examples": [
      {
        "id": "excel/funciones-de-texto/textsplit/1",
        "title": "Separar código",
        "language": "excel",
        "code": "=TEXTSPLIT(\"C1-MX-Online\",\"-\")",
        "hint": "Deja libre el área de derrame.",
        "textOutput": "Tres columnas: C1, MX, Online.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
