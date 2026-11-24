// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/definicion",
    "remember": "Separar desarrollo, validación y producción mediante credenciales y esquemas.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/definicion/1",
        "title": "Seguir un cambio de negocio",
        "language": "text",
        "code": "Rama Git → pull request → build en CI → revisión → merge → job de producción",
        "hint": "CI valida cambios antes de integrarlos.",
        "textOutput": "El cambio llega a producción después de una validación exitosa.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/git-y-pull-requests",
    "remember": "No versionar credenciales, entornos virtuales ni artefactos temporales salvo necesidad explícita.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/git-y-pull-requests/1",
        "title": "Versionar un cambio local",
        "language": "bash",
        "code": "git init\ngit add dbt_project.yml models seeds tests macros snapshots analyses\ngit commit -m 'Initial dbt models'",
        "hint": "No versionar credenciales, entornos virtuales ni artefactos temporales salvo necesidad explícita.",
        "textOutput": "Un commit contiene el código del proyecto si Git está configurado; crear .gitignore para target/, logs/, dbt_packages/, .venv/ y secretos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/entornos-y-permisos",
    "remember": "Nunca probar cambios destructivos en un target compartido de producción.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/entornos-y-permisos/1",
        "title": "Añadir salida CI (dentro de outputs del perfil, copiar demás campos de dev)",
        "language": "yaml",
        "code": "ci:\n  type: postgres\n  host: localhost\n  port: 5432\n  user: analyst\n  password: \"{{ env_var('DBT_ENV_SECRET_PASSWORD') }}\"\n  dbname: analytics_lab\n  schema: dbt_ci\n  threads: 2",
        "hint": "Nunca probar cambios destructivos en un target compartido de producción.",
        "textOutput": "dbt build --target ci usa dbt_ci y deja dbt_dev intacto.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/slim-ci",
    "remember": "El manifest de comparación debe corresponder a producción y conservarse fuera de target.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/slim-ci/1",
        "title": "Validar una rama con estado previo",
        "language": "bash",
        "code": "dbt deps\ndbt build --target ci --select state:modified+ --state state --defer",
        "hint": "El manifest de comparación debe corresponder a producción y conservarse fuera de target.",
        "textOutput": "Se construyen cambios y descendientes en CI; errores deben impedir el merge en el flujo automatizado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/jobs-scheduling-y-triggers",
    "remember": "Ejecutar después de que las fuentes necesarias estén listas.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/jobs-scheduling-y-triggers/1",
        "title": "Crear un job diario en dbt Platform",
        "language": "text",
        "code": "Elegir entorno de despliegue → añadir dbt source freshness y dbt build → programar a las 06:00 en zona elegida → activar notificaciones",
        "hint": "Un job agrupa comandos, entorno y condiciones de ejecución.",
        "textOutput": "El job ejecuta comandos en su entorno a la hora configurada y registra estados; requiere acceso a la plataforma.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/orquestacion-externa",
    "remember": "Propagar códigos de salida y no publicar reportes si falla dbt.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/orquestacion-externa/1",
        "title": "Encadenar tareas en un worker con proyecto y perfil preparados",
        "language": "bash",
        "code": "dbt source freshness && dbt build",
        "hint": "Propagar códigos de salida y no publicar reportes si falla dbt.",
        "textOutput": "build se ejecuta solo si freshness devuelve código 0; un orquestador puede ejecutar ambas como tareas dependientes.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/github-actions",
    "remember": "El runner necesita conectividad al warehouse y un perfil válido.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/github-actions/1",
        "title": "Paso de workflow (dentro de jobs.<id>.steps)",
        "language": "yaml",
        "code": "- name: Validate dbt\n  env:\n    DBT_ENV_SECRET_PASSWORD: ${{ secrets.DBT_PASSWORD }}\n  run: dbt deps && dbt build --target ci",
        "hint": "El runner necesita conectividad al warehouse y un perfil válido.",
        "textOutput": "Paso exitoso solo si ambos comandos terminan con código 0; presupone checkout, Python, adaptador y perfil configurados.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/docker-y-ejecucion-reproducible",
    "remember": "Montar perfiles/secretos al ejecutar, no incluirlos en la imagen.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/docker-y-ejecucion-reproducible/1",
        "title": "Preparar imagen (Dockerfile en raíz del proyecto)",
        "language": "dockerfile",
        "code": "FROM python:3.11-slim\nWORKDIR /app\nRUN pip install 'dbt-core>=1.10.6,<1.11' 'dbt-postgres>=1.10,<1.11'\nCOPY . /app\nENTRYPOINT [\"dbt\"]",
        "hint": "Montar perfiles/secretos al ejecutar, no incluirlos en la imagen.",
        "textOutput": "docker build -t tienda-dbt . crea una imagen; requiere .dockerignore para excluir perfiles, .venv, target, logs y secretos. Montar perfil y proporcionar conexión al ejecutar.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/monitoreo-y-alertas",
    "remember": "Un build exitoso no demuestra que todos los KPI sean correctos.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/monitoreo-y-alertas/1",
        "title": "Diseñar una alerta",
        "language": "text",
        "code": "Si dbt build falla → registrar nodo y error → avisar a responsable → corregir → retry",
        "hint": "Registrar estado, duración, volumen y frescura permite detectar fallos o degradación.",
        "textOutput": "El incidente queda asociado a una ejecución y un recurso; requiere sistema de alertas configurado.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/dbt/produccion-y-ci-cd/recuperacion-y-rollback",
    "remember": "Un git revert no restaura automáticamente tablas ni historia perdida.",
    "examples": [
      {
        "id": "dbt/produccion-y-ci-cd/recuperacion-y-rollback/1",
        "title": "Revertir un cambio aprobado (en rama de recuperación)",
        "language": "bash",
        "code": "git revert HEAD\ndbt build --target ci",
        "hint": "Un git revert no restaura automáticamente tablas ni historia perdida.",
        "textOutput": "Se crea un commit inverso y se valida en CI; desplegar después de aprobar. Un incremental puede necesitar full-refresh y snapshots requieren tratamiento propio.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
