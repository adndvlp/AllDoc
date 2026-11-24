// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/despliegue/definicion",
    "remember": "No copies standalone o el compose rápido como arquitectura productiva.",
    "examples": [
      {
        "id": "airflow/despliegue/definicion/1",
        "title": "Inventariar componentes de producción",
        "code": "",
        "steps": [
          "Identifica scheduler, DAG processor, API server, triggerer, executor y metadata DB.",
          "Documenta red, secretos, almacenamiento de logs y responsables."
        ],
        "external": true,
        "hint": "La topología depende del executor y plataforma.",
        "textOutput": "Mapa de componentes y dependencias operativas.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/base-de-metadatos-y-migraciones",
    "remember": "Haz respaldo y coordina versiones antes de migrar.",
    "examples": [
      {
        "id": "airflow/despliegue/base-de-metadatos-y-migraciones/1",
        "title": "Comprobar versión antes de una migración",
        "language": "bash",
        "code": "airflow version\nairflow db check",
        "hint": "En una ventana de mantenimiento usa airflow db migrate siguiendo el procedimiento de actualización; no lo ejecutes indiscriminadamente.",
        "textOutput": "Se confirma la versión instalada y conectividad.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/kubernetes-y-helm",
    "remember": "Versiona values, imágenes, recursos, secretos y estrategia de migración.",
    "examples": [
      {
        "id": "airflow/despliegue/kubernetes-y-helm/1",
        "title": "Inspeccionar una instalación existente",
        "language": "bash",
        "code": "helm list -n airflow\nkubectl get deployments,statefulsets,pods -n airflow",
        "hint": "Requiere cluster, namespace y permisos de lectura.",
        "textOutput": "Se muestran los componentes instalados y sus estados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/alta-disponibilidad-y-escalamiento",
    "remember": "Añadir workers no corrige necesariamente una base de metadatos saturada.",
    "examples": [
      {
        "id": "airflow/despliegue/alta-disponibilidad-y-escalamiento/1",
        "title": "Escalar por evidencia",
        "code": "",
        "steps": [
          "Mide cola, utilización de workers, latencia de scheduler y base.",
          "Aumenta capacidad del componente limitante en staging.",
          "Ejecuta una carga de prueba y compara métricas."
        ],
        "external": true,
        "hint": "El límite puede estar en pools, broker, base o servicios externos.",
        "textOutput": "Menor cola o latencia si el cuello de botella fue correctamente identificado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/dag-bundles-y-versionado",
    "remember": "Versiona DAGs y dependencias para poder reproducir ejecuciones.",
    "examples": [
      {
        "id": "airflow/despliegue/dag-bundles-y-versionado/1",
        "title": "Inspeccionar una actualización de código",
        "code": "",
        "steps": [
          "Configura un bundle versionado según la guía de tu versión, por ejemplo Git.",
          "Publica dos revisiones del mismo DAG.",
          "Comprueba la versión registrada en ejecuciones nuevas."
        ],
        "external": true,
        "hint": "El bundle local no proporciona todas las garantías de versionado de un backend versionado.",
        "textOutput": "El entorno identifica revisiones de DAG según el backend configurado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/backups-limpieza-y-recuperacion",
    "remember": "Un backup sin prueba de restauración no garantiza recuperación.",
    "examples": [
      {
        "id": "airflow/despliegue/backups-limpieza-y-recuperacion/1",
        "title": "Revisar limpieza de metadatos",
        "language": "bash",
        "code": "airflow db clean --help",
        "hint": "Antes de limpiar, usa dry-run cuando esté disponible, respalda y define retención; no elimines datos productivos desde un ejemplo.",
        "textOutput": "Se muestran filtros, opciones de simulación y archivo según la versión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/ci-cd-y-entornos",
    "remember": "El mismo código probado debe ser el que se despliegue.",
    "examples": [
      {
        "id": "airflow/despliegue/ci-cd-y-entornos/1",
        "title": "Crear un control previo a publicación",
        "code": "",
        "steps": [
          "Ejecuta pruebas unitarias.",
          "Valida importación con las dependencias fijadas.",
          "Ejecuta integración en staging.",
          "Publica la imagen o bundle versionado tras aprobación."
        ],
        "external": true,
        "hint": "Mantén conexiones y secretos específicos de cada entorno.",
        "textOutput": "Solo se despliega si pasan los controles establecidos.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/despliegue/servicios-administrados",
    "remember": "La portabilidad del DAG no implica idénticas opciones de administración.",
    "examples": [
      {
        "id": "airflow/despliegue/servicios-administrados/1",
        "title": "Evaluar un despliegue administrado",
        "code": "",
        "steps": [
          "Verifica versiones de Airflow y providers admitidas.",
          "Comprueba mecanismo de entrega de DAGs, redes, secretos y logs.",
          "Ejecuta ventas_manual como prueba."
        ],
        "external": true,
        "hint": "Consulta documentación específica del producto antes de migrar.",
        "textOutput": "El DAG se registra y ejecuta si cumple los requisitos del servicio.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
