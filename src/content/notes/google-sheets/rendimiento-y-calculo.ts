// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/definicion",
    "remember": "Reduce trabajo repetido y mide el efecto.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/definicion/1",
        "title": "Limitar un rango de cálculo",
        "language": "excel-formula",
        "code": "=SUM(Ventas!J2:J9)",
        "hint": "",
        "textOutput": "2400; evita recorrer una columna completa innecesariamente en este dataset.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/rangos-abiertos-y-dependencias",
    "remember": "Acota rangos cuando su tamaño sea conocido; considera crecimiento futuro.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/rangos-abiertos-y-dependencias/1",
        "title": "Reutilizar total",
        "language": "excel-formula",
        "code": "=LET(total,SUM(Ventas!J2:J9),total*0.1+total*0.05)",
        "hint": "",
        "textOutput": "360; el total se define una sola vez.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/funciones-volatiles",
    "remember": "Centraliza fecha de corte y evita repetir cálculos variables.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/funciones-volatiles/1",
        "title": "Fijar fecha de corte",
        "language": "text",
        "code": "",
        "hint": "En Practica B1 escribe =TODAY(); copia B1 y usa Pegado especial > Solo valores. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "B1 conserva la fecha obtenida hasta editarla manualmente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/referencias-circulares",
    "remember": "No actives cálculo iterativo para ocultar un error accidental.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/referencias-circulares/1",
        "title": "Diagnosticar un ciclo",
        "language": "text",
        "code": "",
        "hint": "Con cálculo iterativo desactivado, escribe =A1+1 en Practica A1. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Error de dependencia circular (#REF!).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/calculo-iterativo-y-recalculo",
    "remember": "Úsalo solo para modelos que requieran iteración y tengan criterio de convergencia.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/calculo-iterativo-y-recalculo/1",
        "title": "Revisar configuración de cálculo",
        "language": "text",
        "code": "",
        "hint": "Archivo > Configuración > Cálculo; revisa recálculo y mantén cálculo iterativo desactivado para esta guía. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Los ciclos accidentales se detectan como errores.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/rendimiento-y-calculo/optimizacion-de-importaciones",
    "remember": "Una conexión externa puede tener latencia y límites.",
    "examples": [
      {
        "id": "google-sheets/rendimiento-y-calculo/optimizacion-de-importaciones/1",
        "title": "Reducir una transferencia",
        "language": "text",
        "code": "",
        "hint": "En el archivo remoto del ejemplo IMPORTRANGE calcula total en D1 con =SUM(B2:B3); en el destino importa solo Datos!D1. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "Un valor 500 en lugar de toda la tabla.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
