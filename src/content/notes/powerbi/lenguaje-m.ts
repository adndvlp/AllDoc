// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/definicion",
    "remember": "M prepara datos; DAX calcula sobre el modelo.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/definicion/1",
        "title": "Filtrar desde M",
        "language": "powerquery",
        "code": "let\n    Fuente = Pedidos,\n    Filtrado = Table.SelectRows(Fuente, each [Estado] = \"completed\")\nin\n    Filtrado",
        "hint": "",
        "textOutput": "Siete filas en una consulta en blanco distinta de Pedidos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/let-in-y-pasos",
    "remember": "El último paso devuelto lo determina in.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/let-in-y-pasos/1",
        "title": "Devolver columnas seleccionadas",
        "language": "powerquery",
        "code": "let\n    Fuente = Clientes,\n    #\"Solo pais\" = Table.SelectColumns(Fuente, {\"Pais\"})\nin\n    #\"Solo pais\"",
        "hint": "",
        "textOutput": "Cuatro filas, columna Pais.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/listas-registros-y-tablas",
    "remember": "Una lista no tiene nombres de campo; un registro sí.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/listas-registros-y-tablas/1",
        "title": "Construir tabla pequeña",
        "language": "powerquery",
        "code": "Table.FromRecords({[Id=1, Importe=100], [Id=2, Importe=200]})",
        "hint": "",
        "textOutput": "Tabla de dos filas, Id e Importe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/each-y-funciones-personalizadas",
    "remember": "Reutiliza lógica mediante funciones.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/each-y-funciones-personalizadas/1",
        "title": "Aplicar tarifa a cantidades",
        "language": "powerquery",
        "code": "let\n    Tarifa = (n as number) as number => n * 5,\n    Resultado = Table.AddColumn(Pedidos, \"Tarifa\", each Tarifa([Cantidad]), type number)\nin\n    Resultado",
        "hint": "",
        "textOutput": "Pedido 6: Tarifa 15.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/try-otherwise",
    "remember": "No ocultes errores sin registrar su causa.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/try-otherwise/1",
        "title": "Convertir texto inválido",
        "language": "powerquery",
        "code": "Table.AddColumn(Sucios, \"ImporteValido\", each try Number.FromText([Importe], \"en-US\") otherwise null, type nullable number)",
        "hint": "",
        "textOutput": "Id 3: null; Id 1: 100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/lenguaje-m/funciones-table-text-number-date",
    "remember": "Comprueba el tipo de entrada y de salida.",
    "examples": [
      {
        "id": "powerbi/lenguaje-m/funciones-table-text-number-date/1",
        "title": "Obtener año y redondeo",
        "language": "powerquery",
        "code": "[Nombre=Text.Trim(\" Ana \"), Anio=Date.Year(#date(2026,2,5)), Importe=Number.Round(12.344,2)]",
        "hint": "",
        "textOutput": "Registro con Ana, 2026 y 12.34.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
