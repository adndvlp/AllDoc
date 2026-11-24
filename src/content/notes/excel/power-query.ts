// Generado desde specs/excel.md por scripts/prepare-excel-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/excel/power-query/definicion",
    "remember": "No modifica la fuente por defecto; entrega una salida transformada.",
    "note": "El entorno completo de referencia es Windows. Mac y web admiten Power Query con capacidades y conectores distintos; consulta las fuentes del anexo.",
    "examples": [
      {
        "id": "excel/power-query/definicion/1",
        "title": "Crear consulta",
        "language": "text",
        "code": "",
        "hint": "Selecciona tSales > Datos > Desde tabla o rango; abre el Editor de Power Query. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Vista de 8 filas y 9 columnas.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/tipos-y-encabezados",
    "remember": "Define tipos antes de calcular y combinar.",
    "examples": [
      {
        "id": "excel/power-query/tipos-y-encabezados/1",
        "title": "Asignar tipos",
        "language": "text",
        "code": "",
        "hint": "En consulta tSales, configura order_date como Fecha, quantity como Número entero y amount como Número decimal. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Las fechas y números se reconocen como sus tipos correspondientes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/filtrar-y-seleccionar-columnas",
    "remember": "Conserva las claves necesarias para combinar luego.",
    "examples": [
      {
        "id": "excel/power-query/filtrar-y-seleccionar-columnas/1",
        "title": "Preparar ventas",
        "language": "text",
        "code": "",
        "hint": "En consulta tSales filtra completed y conserva order_id, customer_id, amount. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "6 filas y 3 columnas: 101/C1/200, 102/C2/300, 104/C3/300, 105/C2/100, 106/C1/200, 108/C3/100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/columna-personalizada-y-condicional",
    "remember": "M usa nombres de campo entre corchetes.",
    "examples": [
      {
        "id": "excel/power-query/columna-personalizada-y-condicional/1",
        "title": "Calcular importe",
        "language": "text",
        "code": "",
        "hint": "En consulta original tSales, Agregar columna > Columna personalizada, nombre calc_amount, expresión [quantity]*[unit_price]. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 valores iguales a amount; suma 2100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/limpiar-texto-null-y-duplicados",
    "remember": "Quitar duplicados por clave no garantiza qué registro se conserva en todas las situaciones; define un criterio explícito si importa.",
    "examples": [
      {
        "id": "excel/power-query/limpiar-texto-null-y-duplicados/1",
        "title": "Crear lista única",
        "language": "text",
        "code": "",
        "hint": "Desde tLeads conserva solo email y quita duplicados. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "3 correos: ana@example.com, luis@example.com y eva@example.com, sin orden garantizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/group-by",
    "remember": "La salida cambia a una fila por grupo.",
    "examples": [
      {
        "id": "excel/power-query/group-by/1",
        "title": "Ventas por estado",
        "language": "text",
        "code": "",
        "hint": "Desde consulta tSales, Inicio > Agrupar por status; nueva columna total, operación Suma sobre amount. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "completed 1200, cancelled 600, pending 300.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/merge",
    "remember": "Verifica cardinalidad; varias coincidencias pueden multiplicar filas.",
    "examples": [
      {
        "id": "excel/power-query/merge/1",
        "title": "Traer nombre de cliente",
        "language": "text",
        "code": "",
        "hint": "Crea consultas de tSales y tCustomers; Combinar con tSales como izquierda y customer_id en ambas, unión externa izquierda; expande name. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 filas; 101 tiene Ana, 104 tiene Marta.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/append",
    "remember": "Las columnas ausentes reciben null.",
    "examples": [
      {
        "id": "excel/power-query/append/1",
        "title": "Unir meses",
        "language": "text",
        "code": "",
        "hint": "Crea dos referencias de tSales filtrando respectivamente enero y febrero de 2026; Anexar como nueva consulta. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "8 filas; 3 de enero y 5 de febrero.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/pivot-y-unpivot",
    "remember": "Unpivot es útil para columnas que representan periodos.",
    "examples": [
      {
        "id": "excel/power-query/pivot-y-unpivot/1",
        "title": "Normalizar metas",
        "language": "text",
        "code": "",
        "hint": "Desde tTargets selecciona target y actual > Anular dinamización de columnas. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "4 filas con month, Attribute, Value: enero target 600, enero actual 500, febrero target 650, febrero actual 700.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/parametros-y-lenguaje-m",
    "remember": "Los pasos posteriores dependen de los anteriores.",
    "note": "Pega el código en Editor avanzado de una consulta del libro con tSales. El tipo de cada columna depende del origen; establece tipos explícitos cuando sean necesarios.",
    "examples": [
      {
        "id": "excel/power-query/parametros-y-lenguaje-m/1",
        "title": "Filtrar con M",
        "language": "powerquery",
        "code": "let\n    Source = Excel.CurrentWorkbook(){[Name=\"tSales\"]}[Content],\n    Completed = Table.SelectRows(Source, each [status] = \"completed\")\nin\n    Completed",
        "hint": "Los pasos posteriores dependen de los anteriores. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "6 filas de pedidos completados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/excel/power-query/carga-y-actualizacion",
    "remember": "Decide dónde se necesita la salida; evita duplicar tablas grandes.",
    "examples": [
      {
        "id": "excel/power-query/carga-y-actualizacion/1",
        "title": "Cargar ventas completadas",
        "language": "text",
        "code": "",
        "hint": "En consulta filtrada a completed, Cerrar y cargar en una nueva hoja. Practica este ejemplo en Excel con las funciones indicadas en la ficha.",
        "textOutput": "Tabla de seis pedidos; puede actualizarse al cambiar tSales.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
