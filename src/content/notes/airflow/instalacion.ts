// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/instalacion/definicion",
    "remember": "Standalone es un laboratorio, no un despliegue de producción.",
    "examples": [
      {
        "id": "airflow/instalacion/definicion/1",
        "title": "Comprobar instalación",
        "language": "bash",
        "code": "airflow version",
        "hint": "Comprueba la versión antes de copiar imports.",
        "textOutput": "Muestra 3.1.7 si se siguió la instalación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/instalacion/airflow-home-y-configuracion",
    "remember": "Mantén el mismo AIRFLOW_HOME en todas las terminales.",
    "examples": [
      {
        "id": "airflow/instalacion/airflow-home-y-configuracion/1",
        "title": "Localizar el directorio de DAGs",
        "language": "bash",
        "code": "airflow config get-value core dags_folder",
        "hint": "El valor efectivo puede diferir de AIRFLOW_HOME/dags.",
        "textOutput": "Ruta del directorio dags del laboratorio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/instalacion/standalone",
    "remember": "No lo expongas públicamente ni lo uses para cargas reales.",
    "examples": [
      {
        "id": "airflow/instalacion/standalone/1",
        "title": "Iniciar el laboratorio",
        "language": "bash",
        "code": "airflow standalone",
        "hint": "La terminal muestra el estado del arranque.",
        "textOutput": "Servicios iniciados; UI accesible localmente si no hay conflictos de puerto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/instalacion/providers-y-constraints",
    "remember": "Instala el provider sin actualizar Airflow accidentalmente.",
    "note": "Requiere acceso a repositorios de paquetes.",
    "examples": [
      {
        "id": "airflow/instalacion/providers-y-constraints/1",
        "title": "Añadir soporte PostgreSQL",
        "language": "bash",
        "code": "pip install \"apache-airflow==3.1.7\" apache-airflow-providers-postgres --constraint \"$C\"\nairflow providers list",
        "hint": "Usa la variable C de Datos compartidos.",
        "textOutput": "Postgres aparece en la lista si la instalación finaliza.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/instalacion/docker-compose",
    "remember": "El compose oficial de inicio rápido no es una configuración endurecida.",
    "note": "Requiere Docker Compose y recursos suficientes.",
    "examples": [
      {
        "id": "airflow/instalacion/docker-compose/1",
        "title": "Consultar servicios del compose oficial",
        "language": "bash",
        "code": "docker compose ps",
        "hint": "Descarga previamente el compose oficial de la versión, prepara .env, ejecuta airflow-init y levanta los servicios siguiendo su guía.",
        "textOutput": "Lista los contenedores y sus estados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
