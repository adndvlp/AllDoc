// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/calidad-linaje/definicion",
    "remember": "Falla explícitamente si una condición obligatoria no se cumple.",
    "examples": [
      {
        "id": "airflow/calidad-linaje/definicion/1",
        "title": "Comprobar que el lote no esté vacío",
        "language": "python",
        "code": "@task\ndef validar():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        filas = list(csv.DictReader(f))\n    if not filas:\n        raise ValueError(\"Lote vacío\")\n    return len(filas)\nvalidar()",
        "hint": "La regla se evalúa antes de publicar.",
        "textOutput": "Retorna 5; un CSV con solo encabezados provoca fallo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/calidad-linaje/validar-esquema-nulos-y-claves",
    "remember": "No confundas conteo de filas con validez de sus claves.",
    "examples": [
      {
        "id": "airflow/calidad-linaje/validar-esquema-nulos-y-claves/1",
        "title": "Validar order_id",
        "language": "python",
        "code": "@task\ndef calidad():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        reader = csv.DictReader(f)\n        if not {\"order_id\", \"amount\"}.issubset(reader.fieldnames or []):\n            raise ValueError(\"Esquema inválido\")\n        ids = [r[\"order_id\"] for r in reader]\n    if any(not x for x in ids) or len(ids) != len(set(ids)):\n        raise ValueError(\"Clave nula o repetida\")\n    return len(ids)\ncalidad()",
        "hint": "Una fila sin ID o con ID repetido hace fallar la tarea.",
        "textOutput": "Retorna 5 con los datos base.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/calidad-linaje/sqlcheckoperator",
    "remember": "Especifica una condición de calidad, no una consulta de visualización.",
    "examples": [
      {
        "id": "airflow/calidad-linaje/sqlcheckoperator/1",
        "title": "Comprobar ventas no negativas",
        "language": "python",
        "code": "from airflow.providers.common.sql.operators.sql import SQLCheckOperator\nSQLCheckOperator(task_id=\"calidad_sql\", conn_id=\"ventas_pg\", sql=\"SELECT COUNT(*) = 0 FROM orders WHERE amount < 0\")",
        "hint": "Requiere PostgreSQL con tabla orders; carga antes el dataset en ese motor.",
        "textOutput": "Success si no existen importes negativos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/calidad-linaje/data-lineage-y-openlineage",
    "remember": "El grafo de tareas no sustituye el linaje de datasets.",
    "examples": [
      {
        "id": "airflow/calidad-linaje/data-lineage-y-openlineage/1",
        "title": "Observar linaje de una carga SQL",
        "code": "",
        "steps": [
          "Instala el provider openlineage compatible.",
          "Configura el transporte a un backend de linaje de prueba.",
          "Ejecuta un operator SQL con soporte de extracción de linaje.",
          "Inspecciona eventos de job, run e inputs/outputs."
        ],
        "external": true,
        "hint": "Requiere backend real; la cobertura depende del operator.",
        "textOutput": "El backend recibe los eventos y puede mostrar relaciones de datos si el extractor las obtiene.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
