// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/definicion",
    "remember": "Prioriza resultados verificables antes de optimizar.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/definicion/1",
        "title": "Mostrar fórmula",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1 escribe =SUM(10,20); en B1 escribe =FORMULATEXT(A1). Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "B1 muestra =SUM(10,20) como texto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/precedentes-y-dependientes",
    "remember": "Las flechas permiten revisar dependencias, no prueban corrección del modelo.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/precedentes-y-dependientes/1",
        "title": "Rastrear importe",
        "language": "text",
        "code": "",
        "hint": "En copia de Sales J2 escribe =E2*F2; selecciona J2 > Fórmulas > Rastrear precedentes. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Flechas desde E2 y F2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/evaluar-formula-y-errores",
    "remember": "Revisa primero el término que produce el error.",
    "note": "La disponibilidad del evaluador depende de plataforma; en su ausencia, separa los cálculos en celdas auxiliares.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/evaluar-formula-y-errores/1",
        "title": "Evaluar condición",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1 escribe =IF(5>3,10,0); Fórmulas > Evaluar fórmula. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Se evalúa la condición TRUE y el resultado final 10.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/referencias-circulares",
    "remember": "Evítalas salvo modelos iterativos deliberados.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/referencias-circulares/1",
        "title": "Detectar ciclo",
        "language": "text",
        "code": "",
        "hint": "En una copia de Scratch, con cálculo iterativo deshabilitado, escribe =A1+1 en A1. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Excel detecta referencia circular y no ofrece un resultado fiable; elimina la fórmula.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/calculo-automatico-y-manual",
    "remember": "Un libro en modo manual puede mostrar valores desactualizados.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/calculo-automatico-y-manual/1",
        "title": "Probar recálculo",
        "language": "text",
        "code": "",
        "hint": "En Scratch A1=10 y B1 =A1*2; activa cálculo manual, cambia A1 a 20 y usa Calcular ahora. Restaura automático. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Tras recalcular B1=40.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/auditoria-y-rendimiento/rangos-acotados-y-funciones-volatiles",
    "remember": "Prefiere referencias a tablas, reutilización y medición real.",
    "examples": [
      {
        "id": "excel/auditoria-y-rendimiento/rangos-acotados-y-funciones-volatiles/1",
        "title": "Evitar cálculo repetido",
        "language": "excel",
        "code": "=LET(total,SUM(tSales[amount]),total+total*10%)",
        "hint": "Prefiere referencias a tablas, reutilización y medición real.",
        "textOutput": "2310; el total se define una vez.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
