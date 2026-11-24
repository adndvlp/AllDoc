// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/seguridad/definicion",
    "remember": "Quien puede desplegar DAGs puede ejecutar código; trata esa capacidad como privilegiada.",
    "examples": [
      {
        "id": "airflow/seguridad/definicion/1",
        "title": "Separar acceso de lectura y operación",
        "code": "",
        "steps": [
          "Configura un auth manager apropiado.",
          "Crea un rol o identidad con permiso de lectura.",
          "Comprueba que puede consultar DAGs pero no dispararlos ni editarlos."
        ],
        "external": true,
        "hint": "La forma exacta de RBAC depende del auth manager.",
        "textOutput": "Las acciones de operación se deniegan para esa identidad.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/seguridad/auth-managers-y-rbac",
    "remember": "No uses el auth manager de desarrollo como política de seguridad de producción.",
    "examples": [
      {
        "id": "airflow/seguridad/auth-managers-y-rbac/1",
        "title": "Validar permisos de una cuenta operativa",
        "code": "",
        "steps": [
          "Crea una identidad que pueda disparar un DAG de pruebas, pero no administrar usuarios.",
          "Prueba ambas acciones en UI o API."
        ],
        "external": true,
        "hint": "Requiere un auth manager que permita permisos de ese alcance.",
        "textOutput": "Trigger permitido; administración denegada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/seguridad/fernet-y-rotacion-de-secretos",
    "remember": "El cifrado no reemplaza el control de acceso.",
    "examples": [
      {
        "id": "airflow/seguridad/fernet-y-rotacion-de-secretos/1",
        "title": "Planificar rotación de clave",
        "code": "",
        "steps": [
          "Haz respaldo de metadatos y conserva la clave previa de forma segura.",
          "Configura nueva clave y anterior según la guía de rotación.",
          "Ejecuta airflow rotate-fernet-key y valida conexiones.",
          "Retira la clave anterior cuando se confirme la migración."
        ],
        "external": true,
        "hint": "Operación administrativa; prueba en staging antes de producción.",
        "textOutput": "Las conexiones existentes siguen siendo legibles tras la rotación correcta.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/seguridad/iam-service-accounts-y-minimo-privilegio",
    "remember": "Concede solo operaciones y rutas necesarias para la tarea.",
    "examples": [
      {
        "id": "airflow/seguridad/iam-service-accounts-y-minimo-privilegio/1",
        "title": "Limitar una carga a su prefijo",
        "code": "",
        "steps": [
          "Asigna al worker una identidad de servicio.",
          "Permite escribir únicamente en el prefijo alldoc/ de un bucket de prueba.",
          "Prueba una escritura autorizada y otra fuera del prefijo."
        ],
        "external": true,
        "hint": "La política concreta depende del proveedor cloud.",
        "textOutput": "La primera funciona; la segunda se deniega.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/seguridad/tls-masking-y-aislamiento",
    "remember": "Nunca confíes en masking para justificar imprimir contraseñas.",
    "examples": [
      {
        "id": "airflow/seguridad/tls-masking-y-aislamiento/1",
        "title": "Auditar un entorno de prueba",
        "code": "",
        "steps": [
          "Comprueba HTTPS en UI/API.",
          "Revisa que los logs no contengan secretos.",
          "Separa imágenes, permisos de red y credenciales de workers."
        ],
        "external": true,
        "hint": "Task Execution API no convierte código arbitrario de DAG en una frontera de seguridad absoluta.",
        "textOutput": "El entorno limita exposición de datos y acceso entre componentes.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
