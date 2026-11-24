// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/definicion",
    "remember": "Separa la lógica de negocio de la orquestación.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/definicion/1",
        "title": "Calcular ventas con lógica independiente",
        "language": "python",
        "code": "def ventas_completadas(filas):\n    return sum(int(r[\"amount\"]) for r in filas if r[\"status\"] == \"completed\")\n@task\ndef calcular():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        return ventas_completadas(csv.DictReader(f))\ncalcular()",
        "hint": "La función de cálculo puede probarse sin Airflow.",
        "textOutput": "Retorna 3000.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/full-load-e-incremental-load",
    "remember": "Define de qué manera se reconocen cambios y qué ocurre al reejecutar.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/full-load-e-incremental-load/1",
        "title": "Extraer un lote por rango semiabierto",
        "language": "python",
        "code": "@task\ndef extraer():\n    with open(\"/tmp/alldoc_airflow/orders.csv\") as f:\n        return [r[\"order_id\"] for r in csv.DictReader(f) if \"2026-09-01\" <= r[\"order_date\"] < \"2026-09-02\"]\nextraer()",
        "hint": "En producción usa el intervalo del run y un filtro eficiente en la fuente.",
        "textOutput": "Devuelve [\"101\", \"102\"].",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/idempotencia",
    "remember": "No hagas append indiscriminado durante retries o backfills.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/idempotencia/1",
        "title": "Reemplazar un reporte del lote",
        "language": "python",
        "code": "@task\ndef escribir():\n    p = Path(\"/tmp/alldoc_airflow/ventas-2026-09-01.txt\")\n    p.write_text(\"1100\\n\")\n    return str(p)\nescribir()",
        "hint": "Para bases de datos usa upsert o reemplazo transaccional de la partición.",
        "textOutput": "Al repetir, el archivo sigue conteniendo una sola línea con 1100.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/watermarks-y-datos-tardios",
    "remember": "Avanza el watermark después de confirmar la carga; permite solapamiento y deduplicación.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/watermarks-y-datos-tardios/1",
        "title": "Diseñar recuperación de una carga incremental",
        "code": "",
        "steps": [
          "Lee el último updated_at confirmado.",
          "Extrae desde un día antes del watermark.",
          "Haz upsert usando order_id y conserva la versión más reciente.",
          "Confirma el nuevo watermark tras la carga."
        ],
        "external": true,
        "hint": "Este procedimiento requiere una fuente con updated_at y destino con clave única; el CSV base solo tiene order_date.",
        "textOutput": "Un pedido corregido dentro del solapamiento se actualiza sin duplicarse.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/deduplicacion",
    "remember": "Define qué registro gana antes de eliminar duplicados.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/deduplicacion/1",
        "title": "Conservar una versión por pedido",
        "language": "python",
        "code": "@task\ndef deduplicar():\n    filas = [{\"id\":101,\"version\":1,\"amount\":800}, {\"id\":101,\"version\":2,\"amount\":850}]\n    unicos = {}\n    for r in sorted(filas, key=lambda x: x[\"version\"]):\n        unicos[r[\"id\"]] = r\n    return list(unicos.values())\ndeduplicar()",
        "hint": "Este microdataset incluye dos versiones deliberadamente.",
        "textOutput": "Una fila: id 101, versión 2, amount 850.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/particionamiento-de-datos",
    "remember": "Usa una partición derivada del lote, no de la hora actual.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/particionamiento-de-datos/1",
        "title": "Crear ruta diaria de destino",
        "language": "python",
        "code": "@task\ndef ruta(dia):\n    return f\"ventas/dt={dia}/orders.parquet\"\nruta(\"2026-09-01\")",
        "hint": "El ejemplo crea la ruta, no el archivo.",
        "textOutput": "Retorna ventas/dt=2026-09-01/orders.parquet.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/ingenieria-pipelines/atomicidad-y-recuperacion",
    "remember": "Confirma juntos los cambios que deban permanecer consistentes.",
    "examples": [
      {
        "id": "airflow/ingenieria-pipelines/atomicidad-y-recuperacion/1",
        "title": "Publicar un archivo local de forma atómica",
        "language": "python",
        "code": "@task\ndef publicar():\n    final = Path(\"/tmp/alldoc_airflow/ventas.txt\")\n    temporal = final.with_suffix(\".tmp\")\n    temporal.write_text(\"3000\\n\")\n    temporal.replace(final)\npublicar()",
        "hint": "Para esta demostración local y un único escritor, el reemplazo ocurre en el mismo filesystem. En cloud utiliza las garantías del servicio.",
        "textOutput": "El destino final contiene 3000 después del reemplazo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
