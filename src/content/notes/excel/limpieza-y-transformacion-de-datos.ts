// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/definicion",
    "remember": "Define la unidad de cada fila antes de quitar duplicados.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/definicion/1",
        "title": "Detectar texto con espacios",
        "language": "excel",
        "code": "=TRIM(\"  Mexico  \")",
        "hint": "Define la unidad de cada fila antes de quitar duplicados.",
        "textOutput": "Mexico.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/detectar-duplicados",
    "remember": "Un cliente puede tener muchos pedidos válidos; no son duplicados por eso.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/detectar-duplicados/1",
        "title": "Marcar correos repetidos",
        "language": "text",
        "code": "",
        "hint": "En copia de Leads escribe =COUNTIF($B$2:$B$6,B2)>1 en D2 y copia hasta D6. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "TRUE, FALSE, TRUE, FALSE, TRUE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/quitar-duplicados",
    "remember": "Conserva una copia y decide primero qué registro conservar.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/quitar-duplicados/1",
        "title": "Deduplicar leads por correo",
        "language": "text",
        "code": "",
        "hint": "En copia de Leads, Datos > Quitar duplicados; marca únicamente email. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Quedan 3 filas, lead_id 1, 2 y 4 (primera aparición en el orden original).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/texto-en-columnas",
    "remember": "Revisa las columnas de destino para no sobrescribir datos.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/texto-en-columnas/1",
        "title": "Separar un código",
        "language": "text",
        "code": "",
        "hint": "Escribe C1-MX-Online en Scratch!A1; Datos > Texto en columnas > Delimitado > Otro: guion; destino A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Las celdas A1, B1 y C1 contienen respectivamente los textos C1, MX y Online.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/espacios-invisibles",
    "remember": "Normaliza antes de hacer búsquedas.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/espacios-invisibles/1",
        "title": "Eliminar espacio no separable",
        "language": "excel",
        "code": "=TRIM(SUBSTITUTE(\"Ana\"&CHAR(160),CHAR(160),\" \"))",
        "hint": "Normaliza antes de hacer búsquedas.",
        "textOutput": "Ana.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/valores-vacios-e-imputacion",
    "remember": "No imputes un país desconocido como país real.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/valores-vacios-e-imputacion/1",
        "title": "Etiquetar país faltante",
        "language": "excel",
        "code": "=IF(Customers!C5=\"\",\"Unknown\",Customers!C5)",
        "hint": "No imputes un país desconocido como país real.",
        "textOutput": "Unknown.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/limpieza-y-transformacion-de-datos/tipos-e-identificadores",
    "remember": "Un identificador no es una magnitud.",
    "examples": [
      {
        "id": "excel/limpieza-y-transformacion-de-datos/tipos-e-identificadores/1",
        "title": "Conservar ceros iniciales",
        "language": "text",
        "code": "",
        "hint": "En Scratch aplica formato Texto a A1 antes de escribir 00123. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se conserva 00123 como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
