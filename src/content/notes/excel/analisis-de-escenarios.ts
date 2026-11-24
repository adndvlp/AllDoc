// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/analisis-de-escenarios/definicion",
    "remember": "Mantén separados parámetros, fórmulas y salidas.",
    "examples": [
      {
        "id": "excel/analisis-de-escenarios/definicion/1",
        "title": "Probar un precio",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=100 (precio), B1=5 (unidades), C1 =A1*B1; cambia A1 a 120. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "El ingreso cambia de 500 a 600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/analisis-de-escenarios/goal-seek",
    "remember": "Modifica una sola celda de entrada.",
    "examples": [
      {
        "id": "excel/analisis-de-escenarios/goal-seek/1",
        "title": "Alcanzar ingreso",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=100, B1=5, C1 =A1*B1; Datos > Análisis de hipótesis > Buscar objetivo: definir C1 a 750 cambiando A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "A1=150 aproximadamente y C1=750.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/analisis-de-escenarios/scenario-manager",
    "remember": "Un escenario no asigna probabilidades automáticamente.",
    "examples": [
      {
        "id": "excel/analisis-de-escenarios/scenario-manager/1",
        "title": "Comparar supuestos",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=100, B1=5, C1 =A1*B1; crea escenarios Base (100,5) y Alto (120,6) para A1:B1; muestra cada uno. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "C1=500 en Base, 720 en Alto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/analisis-de-escenarios/data-tables",
    "remember": "No es lo mismo que Insertar > Tabla.",
    "examples": [
      {
        "id": "excel/analisis-de-escenarios/data-tables/1",
        "title": "Sensibilidad a precio",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=100, B1=5, C1 =A1*B1. Deja E1 vacío; F1 =C1; E2:E4=80,100,120. Selecciona E1:F4 > Análisis de hipótesis > Tabla de datos; celda de entrada de columna A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "F2:F4=400,500,600.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/analisis-de-escenarios/solver",
    "remember": "Define objetivo, variables, restricciones y método.",
    "note": "Requiere complemento Solver compatible.",
    "examples": [
      {
        "id": "excel/analisis-de-escenarios/solver/1",
        "title": "Maximizar utilidad",
        "language": "text",
        "code": "",
        "hint": "Activa Solver. Scratch A1=0 (unidades), B1 =A1*20; maximiza B1 cambiando A1 con restricciones A1>=0, A1<=10 y entero; usa Simplex LP. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "10 unidades y utilidad 200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
