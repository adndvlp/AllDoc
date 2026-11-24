// Generado desde specs/powerbi.md por scripts/prepare-powerbi-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/definicion",
    "remember": "Elige el ámbito: modelo reutilizable o visual concreto.",
    "examples": [
      {
        "id": "powerbi/calculation-groups-y-calculos-visuales/definicion/1",
        "title": "Elegir dónde calcular acumulado",
        "code": "",
        "steps": [
          "Compara Ventas acumuladas en dos visuales con un cálculo visual Running sum creado en una matriz."
        ],
        "external": true,
        "hint": "",
        "textOutput": "La medida puede reutilizarse en el modelo; el cálculo visual pertenece a esa matriz.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/calculation-groups",
    "remember": "Utiliza medidas explícitas y revisa precedencia.",
    "note": "Revisa compatibilidad, formato dinámico y advertencia sobre medidas implícitas.",
    "examples": [
      {
        "id": "powerbi/calculation-groups-y-calculos-visuales/calculation-groups/1",
        "title": "Crear elemento de año anterior",
        "code": "",
        "steps": [
          "En copia del modelo, crea grupo de cálculo Periodo en vista Modelo y elemento Año anterior con expresión `CALCULATE(SELECTEDMEASURE(), SAMEPERIODLASTYEAR(Calendario[Date]))`.",
          "Añade Ventas y el elemento a una matriz por año-mes."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Febrero 2026 con Año anterior: 200.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/formatos-dinamicos",
    "remember": "Mantén el tipo numérico para gráficos y ordenación.",
    "examples": [
      {
        "id": "powerbi/calculation-groups-y-calculos-visuales/formatos-dinamicos/1",
        "title": "Cambiar formato según categoría",
        "code": "",
        "steps": [
          "Selecciona Ventas > Formato dinámico; usa `IF(SELECTEDVALUE(Productos[Categoria])=\"Muebles\", \"#,0.00\", \"#,0\")`."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Muebles aparece 450.00 y Tecnologia 650, ambos numéricos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/powerbi/calculation-groups-y-calculos-visuales/visual-calculations",
    "remember": "Orden del visual y ejes determinan el resultado.",
    "note": "Usa versión de Desktop que incluya cálculos visuales; revisa limitaciones del tipo de visual.",
    "examples": [
      {
        "id": "powerbi/calculation-groups-y-calculos-visuales/visual-calculations/1",
        "title": "Acumular ventas en matriz",
        "code": "",
        "steps": [
          "Matriz con AñoMes y Ventas; filtra 2026 y muestra enero y febrero en orden ascendente.",
          "Nuevo cálculo visual > Running sum sobre Ventas (eje de filas)."
        ],
        "external": true,
        "hint": "",
        "textOutput": "Enero 200, febrero 800.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
