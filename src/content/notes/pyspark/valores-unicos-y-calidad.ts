// Generado desde specs/pyspark.md por scripts/prepare-pyspark-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/definicion",
    "remember": "No deduzcas que dos registros son iguales solo por coincidir en un campo.",
    "examples": [
      {
        "id": "pyspark/valores-unicos-y-calidad/definicion/1",
        "title": "Mostrar estados únicos",
        "language": "python",
        "code": "orders.select(\"status\").distinct().orderBy(\"status\").show()",
        "hint": "",
        "textOutput": "cancelled, completed.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/detectar-duplicados",
    "remember": "Una clave técnica única no impide duplicados de negocio.",
    "examples": [
      {
        "id": "pyspark/valores-unicos-y-calidad/detectar-duplicados/1",
        "title": "Detectar emails repetidos",
        "language": "python",
        "code": "leads.groupBy(\"email\").count().where(F.col(\"count\")>1).show()",
        "hint": "",
        "textOutput": "ana@demo.test,2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/eliminar-duplicados-deterministicamente",
    "remember": "No confíes en ordenar antes de dropDuplicates para elegir la fila más reciente.",
    "note": "Esta ficha anticipa `Window.partitionBy`, `orderBy` y `row_number`, explicados en el grupo Ventanas.",
    "examples": [
      {
        "id": "pyspark/valores-unicos-y-calidad/eliminar-duplicados-deterministicamente/1",
        "title": "Conservar el último lead",
        "language": "python",
        "code": "w = Window.partitionBy(\"email\").orderBy(F.desc(\"lead_id\"))\nleads.withColumn(\"rn\", F.row_number().over(w)).where(\"rn = 1\").select(\"lead_id\").orderBy(\"lead_id\").show()",
        "hint": "",
        "textOutput": "2,3,4.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/pyspark/valores-unicos-y-calidad/validaciones",
    "remember": "Un esquema describe tipos, no garantiza toda la calidad de negocio.",
    "note": "`left_anti` conserva claves sin coincidencia; se explica en JOIN.",
    "examples": [
      {
        "id": "pyspark/valores-unicos-y-calidad/validaciones/1",
        "title": "Validar importes y claves",
        "language": "python",
        "code": "print(orders.where(F.col(\"amount\")<=0).count())\nprint(orders.join(customers,\"customer_id\",\"left_anti\").count())",
        "hint": "",
        "textOutput": "0 importes no positivos y 0 pedidos huérfanos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
