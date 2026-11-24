// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/pipeline-ventas/definicion",
    "remember": "Primero valida los datos, después permite su consumo.",
    "examples": [
      {
        "id": "airflow/pipeline-ventas/definicion/1",
        "title": "Generar un resumen de ventas reproducible",
        "language": "python",
        "code": "@task\ndef extraer():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        return list(csv.DictReader(f))\n@task\ndef transformar(filas):\n    completados = [r for r in filas if r[\"status\"] == \"completed\"]\n    return {\"pedidos\":len(completados), \"ventas\":sum(int(r[\"amount\"]) for r in completados)}\n@task\ndef publicar(resumen):\n    if resumen[\"pedidos\"] == 0:\n        raise ValueError(\"Sin pedidos\")\n    import json\n    Path(\"/tmp/alldoc_airflow/resumen.json\").write_text(json.dumps(resumen))\npublicar(transformar(extraer()))",
        "hint": "Se usa XCom para cinco filas de demostración; en producción pasa una URI y procesa el archivo externamente.",
        "textOutput": "resumen.json contiene pedidos=4 y ventas=3000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/pipeline-ventas/carga-incremental-y-reprocesamiento",
    "remember": "El mismo intervalo debe identificar el mismo conjunto lógico de datos.",
    "examples": [
      {
        "id": "airflow/pipeline-ventas/carga-incremental-y-reprocesamiento/1",
        "title": "Reprocesar un lote específico",
        "language": "python",
        "code": "@task\ndef cargar_dia(dia):\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        total = sum(int(r[\"amount\"]) for r in csv.DictReader(f) if r[\"order_date\"] == dia and r[\"status\"] == \"completed\")\n    Path(f\"/tmp/alldoc_airflow/ventas-{dia}.txt\").write_text(str(total))\n    return total\ncargar_dia(\"2026-09-02\")",
        "hint": "El día es un parámetro fijo para reproducir la práctica; en un run temporal derívalo de su intervalo.",
        "textOutput": "Retorna 1200; repetir deja el mismo archivo con 1200.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/pipeline-ventas/integracion-elt-y-dashboard",
    "remember": "Publica el asset solo tras validar los modelos.",
    "examples": [
      {
        "id": "airflow/pipeline-ventas/integracion-elt-y-dashboard/1",
        "title": "Construir el grafo de producción",
        "language": "python",
        "code": "raw = EmptyOperator(task_id=\"cargar_raw\")\nmodelos = EmptyOperator(task_id=\"dbt_build\")\nvalidar = EmptyOperator(task_id=\"validar_modelos\")\npublicar = EmptyOperator(task_id=\"publicar\", outlets=[Asset(\"alldoc://ventas/modelos\")])\nraw >> modelos >> validar >> publicar",
        "hint": "Son placeholders de orquestación, no una carga real. Sustitúyelos por los operators e integraciones de las fichas anteriores.",
        "textOutput": "El grafo tiene cuatro etapas; el evento se emite al finalizar la última.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
