// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/definicion",
    "remember": "Extraer una columna produce una lista que puedes agregar.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/definicion/1",
        "title": "Sumar todos los importes",
        "language": "powerquery",
        "code": "List.Sum(Pedidos[importe])",
        "hint": "Se obtiene la lista de importes de Pedidos.",
        "textOutput": "1030.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/conteo-de-filas-y-no-nulos",
    "remember": "No confundas cantidad de registros con cantidad de valores presentes.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/conteo-de-filas-y-no-nulos/1",
        "title": "Comparar conteos de canal",
        "language": "powerquery",
        "code": "[filas=Table.RowCount(Pedidos), valores=List.Count(Pedidos[canal]), no_nulos=List.NonNullCount(Pedidos[canal])]",
        "hint": "Las dos primeras cuentas incluyen el pedido sin canal.",
        "textOutput": "[filas=7, valores=7, no_nulos=6].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/suma-promedio-minimo-y-maximo",
    "remember": "Aclara cómo se manejan null y listas vacías antes de usar agregados como métricas.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/suma-promedio-minimo-y-maximo/1",
        "title": "Resumir todos los pedidos",
        "language": "powerquery",
        "code": "[suma=List.Sum(Pedidos[importe]), promedio=List.Average(Pedidos[importe]), minimo=List.Min(Pedidos[importe]), maximo=List.Max(Pedidos[importe])]",
        "hint": "Cada función devuelve un valor.",
        "textOutput": "Suma 1030; promedio aprox. 147.1429; mínimo 50; máximo 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/valores-distintos",
    "remember": "Decide si un null cuenta como categoría o si debe excluirse.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/valores-distintos/1",
        "title": "Contar canales presentes distintos",
        "language": "powerquery",
        "code": "List.Count(List.Distinct(List.RemoveNulls(Pedidos[canal])))",
        "hint": "Se excluye null antes de deduplicar.",
        "textOutput": "2 (Web y Tienda).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/concatenacion-agregada",
    "remember": "Ordena y quita duplicados si necesitas una salida estable.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/concatenacion-agregada/1",
        "title": "Listar países conocidos",
        "language": "powerquery",
        "code": "Text.Combine(List.Sort(List.Distinct(List.RemoveNulls(Clientes[pais]))), \", \")",
        "hint": "Se excluyen null y se deduplican países.",
        "textOutput": "\"España, México\" con orden ascendente habitual.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/agregaciones-y-listas/estadistica-descriptiva",
    "remember": "Median es el centro ordenado; StandardDeviation es muestral.",
    "examples": [
      {
        "id": "power-query/agregaciones-y-listas/estadistica-descriptiva/1",
        "title": "Calcular mediana de importes",
        "language": "powerquery",
        "code": "List.Median(Pedidos[importe])",
        "hint": "El cuarto valor de siete valores ordenados es la mediana.",
        "textOutput": "150.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
