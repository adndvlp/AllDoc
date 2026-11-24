// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/definicion",
    "remember": "Conserva datos originales y documenta reglas de limpieza.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/definicion/1",
        "title": "Contar filas con clave repetida de cliente",
        "language": "excel-formula",
        "code": "=COUNTIF(Ventas!C2:C9,1)",
        "hint": "",
        "textOutput": "3; son pedidos diferentes, no duplicados de pedido.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/detectar-duplicados",
    "remember": "La clave debe reflejar la granularidad esperada.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/detectar-duplicados/1",
        "title": "Marcar IDs repetidos",
        "language": "text",
        "code": "",
        "hint": "En Practica B1:B4 escribe 101,102,101,103; en C1 escribe =COUNTIF($B$1:$B$4,B1)>1 y copia hasta C4. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "TRUE,FALSE,TRUE,FALSE.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/eliminar-duplicados",
    "remember": "Haz copia y define qué columnas identifican un registro.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/eliminar-duplicados/1",
        "title": "Depurar lista de IDs",
        "language": "text",
        "code": "",
        "hint": "En Practica B1:B5 escribe id,101,102,101,103; selecciona ese rango; Datos > Limpieza de datos > Quitar duplicados; marca encabezado. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Encabezado y tres IDs: 101,102,103.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/normalizacion-de-claves",
    "remember": "Los IDs con ceros iniciales deben mantenerse como texto si son significativos.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/normalizacion-de-claves/1",
        "title": "Normalizar identificador",
        "language": "excel-formula",
        "code": "=UPPER(TRIM(\" p2 \"))",
        "hint": "",
        "textOutput": "P2.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/dividir-texto-y-sugerencias-de-limpieza",
    "remember": "Revisa sugerencias antes de aceptarlas.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/dividir-texto-y-sugerencias-de-limpieza/1",
        "title": "Separar código compuesto",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 escribe MX-123; selecciona B1; Datos > Dividir texto en columnas; elige guion personalizado. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "B1=MX y C1=123 (la parte numérica puede interpretarse como número).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/reconciliacion",
    "remember": "No reemplaces ausencia por cero antes de diagnosticar.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/reconciliacion/1",
        "title": "Detectar pedido con cliente inexistente",
        "language": "excel-formula",
        "code": "=ISNA(MATCH(99,Clientes!A2:A6,0))",
        "hint": "",
        "textOutput": "TRUE.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/calidad-y-limpieza-de-datos/granularidad-y-doble-conteo",
    "remember": "Una relación uno a muchos puede multiplicar importes al unir.",
    "examples": [
      {
        "id": "google-sheets/calidad-y-limpieza-de-datos/granularidad-y-doble-conteo/1",
        "title": "Comparar pedidos y compradores",
        "language": "excel-formula",
        "code": "={COUNT(Ventas!A2:A9),COUNTUNIQUE(Ventas!C2:C9)}",
        "hint": "Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "8 pedidos y 4 compradores; no son la misma métrica.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
