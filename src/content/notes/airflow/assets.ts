// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/assets/definicion",
    "remember": "Asset no almacena el contenido de los datos: representa su identidad y eventos.",
    "examples": [
      {
        "id": "airflow/assets/definicion/1",
        "title": "Declarar producción y consumo",
        "language": "python",
        "code": "ventas = Asset(\"alldoc://ventas/pedidos\")\n# En el DAG productor, schedule=None:\nEmptyOperator(task_id=\"publicar\", outlets=[ventas])\n# En otro archivo consumidor: schedule=[ventas] en su constructor DAG.",
        "hint": "En ambos archivos declara el mismo Asset antes del constructor; EmptyOperator simula la publicación.",
        "textOutput": "Un evento exitoso del productor habilita el consumidor activo.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/inlets-outlets-y-metadatos",
    "remember": "Solo declara éxito del asset después de que el dato esté realmente disponible.",
    "examples": [
      {
        "id": "airflow/assets/inlets-outlets-y-metadatos/1",
        "title": "Adjuntar conteo al evento",
        "language": "python",
        "code": "ventas = Asset(\"alldoc://ventas/pedidos\")\n@task(outlets=[ventas])\ndef publicar():\n    ctx = get_current_context()\n    ctx[\"outlet_events\"][ventas].extra = {\"row_count\": 5}\npublicar()",
        "hint": "El ejemplo simula la publicación; el CSV de laboratorio contiene cinco filas.",
        "textOutput": "El evento incluye row_count=5 si la tarea termina success.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/condiciones-de-assets",
    "remember": "Un evento de asset no garantiza por sí mismo la calidad del dato.",
    "examples": [
      {
        "id": "airflow/assets/condiciones-de-assets/1",
        "title": "Esperar dos fuentes",
        "language": "python",
        "code": "# Nivel superior, antes del with:\n# a = Asset(\"alldoc://ventas/mx\")\n# b = Asset(\"alldoc://ventas/es\")\n# schedule=(a & b) en el consumidor\nEmptyOperator(task_id=\"combinar\")",
        "hint": "Crea productores independientes con outlets para cada asset. Con a | b basta cualquiera.",
        "textOutput": "El consumidor queda elegible cuando ambas fuentes tienen eventos requeridos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/assetalias",
    "remember": "La asociación se establece al emitir un evento para el alias.",
    "examples": [
      {
        "id": "airflow/assets/assetalias/1",
        "title": "Publicar un asset elegido dinámicamente",
        "language": "python",
        "code": "from airflow.sdk import AssetAlias\nalias = AssetAlias(\"ventas-dinamicas\")\n@task(outlets=[alias])\ndef publicar():\n    ctx = get_current_context()\n    ctx[\"outlet_events\"][alias].add(Asset(\"alldoc://ventas/mx\"))\npublicar()",
        "hint": "Un consumidor puede declarar el mismo AssetAlias en su schedule.",
        "textOutput": "Se registra una asociación del alias con el asset MX al publicar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/assetwatcher-y-eventos-externos",
    "remember": "Usa triggers de eventos adecuados, no comprobaciones de un estado que permanezca verdadero indefinidamente.",
    "examples": [
      {
        "id": "airflow/assets/assetwatcher-y-eventos-externos/1",
        "title": "Disparar un consumidor por mensaje",
        "code": "",
        "steps": [
          "Configura una cola y un provider con trigger de eventos compatible.",
          "Declara un Asset con watchers=[AssetWatcher(...)] según el provider.",
          "Usa el asset como schedule del consumidor y publica un mensaje."
        ],
        "external": true,
        "hint": "Requiere triggerer y servicio externo; los argumentos dependen del provider.",
        "textOutput": "Se crea un evento y puede programarse el consumidor si está activo.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/calendario-combinado",
    "remember": "Diseña la carga para tolerar ambos tipos de run.",
    "examples": [
      {
        "id": "airflow/assets/calendario-combinado/1",
        "title": "Combinar evento con revisión diaria",
        "code": "",
        "steps": [
          "Declara un asset de pedidos.",
          "Configura AssetOrTimeSchedule con un timetable diario y la condición del asset.",
          "Activa el consumidor y publica un evento fuera del horario diario."
        ],
        "external": true,
        "hint": "Consulta la firma versionada de AssetOrTimeSchedule; no supongas que ambos runs tienen el mismo intervalo.",
        "textOutput": "El DAG puede ejecutarse por el calendario o por actualización del asset.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/asset-partitioning",
    "remember": "Una partición de asset no es lo mismo que una instancia mapeada de tarea.",
    "examples": [
      {
        "id": "airflow/assets/asset-partitioning/1",
        "title": "Consultar una carga particionada",
        "code": "",
        "steps": [
          "En una versión con soporte de asset partitions, define una partición diaria según su guía.",
          "Publica una actualización de una fecha.",
          "Inspecciona los eventos y el run consumidor."
        ],
        "external": true,
        "hint": "Concepto posterior a la base 3.1.7; consulta documentación 3.4 y su disponibilidad.",
        "textOutput": "El consumidor puede identificar la partición afectada según la configuración.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/triggerdagrunoperator",
    "remember": "El DAG destino debe existir; iniciar no significa esperar su finalización.",
    "examples": [
      {
        "id": "airflow/assets/triggerdagrunoperator/1",
        "title": "Lanzar un reporte dependiente",
        "language": "python",
        "code": "from airflow.providers.standard.operators.trigger_dagrun import TriggerDagRunOperator\nTriggerDagRunOperator(task_id=\"disparar\", trigger_dag_id=\"ventas_manual\", conf={\"pais\":\"MX\"}, wait_for_completion=False)",
        "hint": "Crea antes ventas_manual de la ficha DAG; actívalo para que ejecute sus tareas.",
        "textOutput": "Se crea un run en ventas_manual si el DAG destino existe.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/assets/externaltasksensor",
    "remember": "Alinea los calendarios de productor y consumidor.",
    "examples": [
      {
        "id": "airflow/assets/externaltasksensor/1",
        "title": "Esperar una carga diaria",
        "language": "python",
        "code": "from airflow.providers.standard.sensors.external_task import ExternalTaskSensor\nExternalTaskSensor(task_id=\"esperar_carga\", external_dag_id=\"ventas_diarias\", external_task_id=\"carga\", timeout=600, mode=\"reschedule\")",
        "hint": "Crea ventas_diarias con tarea carga y mismo calendario/fecha lógica; no uses dos triggers manuales arbitrarios.",
        "textOutput": "Success si la instancia externa correspondiente termina success.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
