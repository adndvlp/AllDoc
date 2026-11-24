// Generado desde specs/google-sheets.md por scripts/prepare-google-sheets-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/definicion",
    "remember": "Ayudan a evitar repetir expresiones y a hacerlas legibles.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/definicion/1",
        "title": "Reutilizar un total",
        "language": "excel-formula",
        "code": "=LET(total,SUM(Ventas!J2:J9),total/8)",
        "hint": "",
        "textOutput": "300.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/let",
    "remember": "El último argumento es el resultado.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/let/1",
        "title": "Calcular utilidad bruta",
        "language": "excel-formula",
        "code": "=LET(ingresos,2000,costos,1140,ingresos-costos)",
        "hint": "",
        "textOutput": "860.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/lambda",
    "remember": "Los parámetros solo existen dentro de la función.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/lambda/1",
        "title": "Aplicar un descuento",
        "language": "excel-formula",
        "code": "=LAMBDA(monto,monto*0.9)(200)",
        "hint": "",
        "textOutput": "180.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/map",
    "remember": "Cada llamada devuelve un resultado escalar.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/map/1",
        "title": "Calcular IVA de tres montos",
        "language": "excel-formula",
        "code": "=MAP({100;200;300},LAMBDA(x,x*0.16))",
        "hint": "",
        "textOutput": "16,32,48 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/reduce",
    "remember": "La LAMBDA recibe acumulador y valor actual.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/reduce/1",
        "title": "Sumar una serie",
        "language": "excel-formula",
        "code": "=REDUCE(0,{10;20;30},LAMBDA(acc,x,acc+x))",
        "hint": "",
        "textOutput": "60.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/scan",
    "remember": "Útil para acumulados como SUM OVER en SQL.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/scan/1",
        "title": "Acumular tres ingresos",
        "language": "excel-formula",
        "code": "=SCAN(0,{10;20;30},LAMBDA(acc,x,acc+x))",
        "hint": "",
        "textOutput": "10,30,60.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/byrow-y-bycol",
    "remember": "Cada fila o columna produce un resultado escalar.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/byrow-y-bycol/1",
        "title": "Sumar por fila",
        "language": "excel-formula",
        "code": "=BYROW({1,2;3,4},LAMBDA(fila,SUM(fila)))",
        "hint": "",
        "textOutput": "3,7 en columna.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/makearray",
    "remember": "Los índices empiezan en 1.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/makearray/1",
        "title": "Crear tabla de multiplicación",
        "language": "excel-formula",
        "code": "=MAKEARRAY(2,3,LAMBDA(f,c,f*c))",
        "hint": "",
        "textOutput": "1,2,3; 2,4,6.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/google-sheets/let-y-lambda/named-functions",
    "remember": "No requieren Apps Script.",
    "examples": [
      {
        "id": "google-sheets/let-y-lambda/named-functions/1",
        "title": "Definir descuento reutilizable",
        "language": "text",
        "code": "",
        "hint": "Datos > Funciones con nombre; crea PRECIO_NETO con argumentos monto y tasa; fórmula =monto*(1-tasa). Guarda y usa =PRECIO_NETO(200,0.1) en Practica. Practica este ejemplo en Google Sheets con el entorno indicado en la ficha.",
        "textOutput": "180.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
