// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/transformar-columnas/definicion",
    "remember": "Puedes reutilizar una columna que acabas de crear en el mismo mutate.",
    "examples": [
      {
        "id": "r/transformar-columnas/definicion/1",
        "title": "Calcular ingreso por línea",
        "language": "r",
        "code": "detalle |> mutate(ingreso = cantidad * precio_unitario) |> pull(ingreso)",
        "hint": "Cada línea se calcula independientemente.",
        "textOutput": "`c(100, 100, 100, 300, 150, 50, 100)`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/transformar-columnas/case-when",
    "remember": "Coloca las condiciones más específicas primero y define `.default`.",
    "examples": [
      {
        "id": "r/transformar-columnas/case-when/1",
        "title": "Clasificar pedidos",
        "language": "r",
        "code": "pedidos |> mutate(nivel = case_when(\n  monto >= 200 ~ \"alto\", monto >= 100 ~ \"medio\",\n  .default = \"bajo\")) |> pull(nivel)",
        "hint": "Cada condición se evalúa por fila.",
        "textOutput": "`c(\"medio\", \"alto\", \"alto\", \"medio\", \"bajo\", \"medio\")`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/transformar-columnas/across",
    "remember": "Selecciona columnas y función por separado.",
    "examples": [
      {
        "id": "r/transformar-columnas/across/1",
        "title": "Redondear dos columnas",
        "language": "r",
        "code": "detalle |> mutate(across(c(cantidad, precio_unitario), round)) |> select(cantidad, precio_unitario)",
        "hint": "round se aplica a ambas columnas.",
        "textOutput": "7 filas con los valores originales, ya enteros.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/transformar-columnas/transmute-y-pick",
    "remember": "`mutate(..., .keep = \"none\")` permite conservar solo las nuevas columnas y las de agrupación.",
    "examples": [
      {
        "id": "r/transformar-columnas/transmute-y-pick/1",
        "title": "Crear una tabla de ingresos",
        "language": "r",
        "code": "detalle |> transmute(ingreso = cantidad * precio_unitario)",
        "hint": "No conserva las columnas de origen.",
        "textOutput": "Una columna ingreso con 7 filas: 100,100,100,300,150,50,100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
