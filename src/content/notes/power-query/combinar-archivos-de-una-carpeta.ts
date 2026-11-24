// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/definicion",
    "remember": "Los archivos deben compartir una estructura compatible o necesitar una normalización explícita.",
    "note": "Requiere acceso al sistema de archivos y conector disponible.",
    "examples": [
      {
        "id": "power-query/combinar-archivos-de-una-carpeta/definicion/1",
        "title": "Combinar dos archivos mensuales",
        "code": "",
        "steps": [
          "Crea una carpeta de prueba solo con ene.csv y feb.csv; ambos tienen encabezado id,importe, seguido de 101,100 y 104,150 respectivamente",
          "Inicio > Obtener datos > Carpeta, selecciona la ruta",
          "Pulsa Combinar y transformar datos; revisa el delimitador y tipos"
        ],
        "external": true,
        "hint": "La transformación del archivo de ejemplo se aplica a los dos archivos.",
        "textOutput": "2 filas con id e importe: (101,100),(104,150); puede incluirse el nombre de archivo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/filtrar-archivos-antes-de-combinar",
    "remember": "Folder.Files incluye subcarpetas; Folder.Contents no recorre automáticamente todos sus descendientes.",
    "examples": [
      {
        "id": "power-query/combinar-archivos-de-una-carpeta/filtrar-archivos-antes-de-combinar/1",
        "title": "Seleccionar solo CSV de prueba",
        "code": "",
        "steps": [
          "En la carpeta del ejemplo anterior añade notas.txt con cualquier texto",
          "Elige Carpeta > Transformar datos",
          "Filtra Extension a .csv antes de combinar Content"
        ],
        "external": true,
        "hint": "El archivo ajeno queda fuera de la transformación.",
        "textOutput": "Dos archivos elegibles: ene.csv y feb.csv; notas.txt no se procesa.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/archivo-de-ejemplo-y-funcion",
    "remember": "Edita la transformación común, no cada archivo individualmente.",
    "examples": [
      {
        "id": "power-query/combinar-archivos-de-una-carpeta/archivo-de-ejemplo-y-funcion/1",
        "title": "Crear una función de lectura CSV sin archivos",
        "language": "powerquery",
        "code": "let Leer = (b as binary) as table => Table.TransformColumnTypes(Table.PromoteHeaders(Csv.Document(b,[Delimiter=\",\",Encoding=65001])),{{\"id\",Int64.Type},{\"importe\",type number}}), A = Text.ToBinary(\"id,importe#(lf)101,100\"), B = Text.ToBinary(\"id,importe#(lf)104,150\") in Table.Combine({Leer(A),Leer(B)})",
        "hint": "Los binarios literales simulan el contenido de dos archivos.",
        "textOutput": "2 filas: (101,100),(104,150), ambos campos numéricos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/combinar-archivos-de-una-carpeta/trazabilidad-y-archivos-nuevos",
    "remember": "Mantén filtros de archivos y esquema estables; revisa duplicados entre lotes.",
    "examples": [
      {
        "id": "power-query/combinar-archivos-de-una-carpeta/trazabilidad-y-archivos-nuevos/1",
        "title": "Agregar un nuevo periodo",
        "code": "",
        "steps": [
          "En la carpeta de prueba añade mar.csv con encabezado id,importe y fila 108,200",
          "Actualiza la consulta combinada",
          "Conserva Source.Name o su equivalente si fue generado"
        ],
        "external": true,
        "hint": "La consulta no necesita agregar un archivo manualmente.",
        "textOutput": "3 filas, ids 101,104,108, con sus archivos de procedencia si conservaste el nombre.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
