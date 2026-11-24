// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/funciones-personalizadas/definicion",
    "remember": "Define los argumentos y el resultado; invócala con valores concretos.",
    "examples": [
      {
        "id": "power-query/funciones-personalizadas/definicion/1",
        "title": "Crear una función de normalización",
        "language": "powerquery",
        "code": "let Normalizar = (t as nullable text) as nullable text => Text.Lower(Text.Trim(t)) in Normalizar(\" ANA@ejemplo.com \")",
        "hint": "La función admite texto y null.",
        "textOutput": "\"ana@ejemplo.com\".",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/funciones-personalizadas/invocar-una-funcion-por-fila",
    "remember": "El argumento debe usar el campo correcto de cada fila.",
    "examples": [
      {
        "id": "power-query/funciones-personalizadas/invocar-una-funcion-por-fila/1",
        "title": "Normalizar todos los leads",
        "language": "powerquery",
        "code": "let F = (t as nullable text) as nullable text => Text.Lower(Text.Trim(t)) in Table.AddColumn(Leads,\"correo_limpio\", each F([correo]), type nullable text)",
        "hint": "Cada fila pasa su correo a la función.",
        "textOutput": "6 filas; ids 1 y 2 producen ana@ejemplo.com, 3 y 4 luis@ejemplo.com, 5 null, 6 texto vacío.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/funciones-personalizadas/funciones-que-reciben-tablas",
    "remember": "Comprueba que las columnas esperadas existan en cada entrada.",
    "examples": [
      {
        "id": "power-query/funciones-personalizadas/funciones-que-reciben-tablas/1",
        "title": "Reutilizar un filtro",
        "language": "powerquery",
        "code": "let Validar = (t as table) as table => Table.SelectRows(t, each [estado] = \"completado\") in Validar(Pedidos)",
        "hint": "La función devuelve una tabla filtrada.",
        "textOutput": "5 filas, ids 101,102,104,105,107.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/funciones-personalizadas/argumentos-opcionales",
    "remember": "Define explícitamente el comportamiento para un argumento ausente.",
    "examples": [
      {
        "id": "power-query/funciones-personalizadas/argumentos-opcionales/1",
        "title": "Calcular comisión con tasa opcional",
        "language": "powerquery",
        "code": "let F = (importe as number, optional tasa as nullable number) as number => importe * (tasa ?? 0.05) in {F(100), F(100,0.10)}",
        "hint": "La tasa omitida usa el 5 %.",
        "textOutput": "{5,10}.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
