// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/sqlalchemy/alembic/definicion",
    "remember": "Revisa el script antes de aplicarlo y prueba en una base aislada.",
    "note": "Ejecuta en un proyecto nuevo, no sobre un entorno Alembic existente.",
    "examples": [
      {
        "id": "sqlalchemy/alembic/definicion/1",
        "title": "Inicializar un entorno de migración",
        "language": "bash",
        "code": "python -m pip install alembic\nalembic init migraciones",
        "hint": "Revisa el script antes de aplicarlo y prueba en una base aislada. Ejecuta este comando en tu terminal.",
        "textOutput": "Se crean alembic.ini y el directorio migraciones con env.py, script.py.mako y versions.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/alembic/revision-y-autogenerate",
    "remember": "Autogenerate no detecta todos los cambios ni renombrados correctamente.",
    "note": "Después de alembic init, configura sqlalchemy.url en alembic.ini con una base de prueba y target_metadata en env.py con el MetaData importado de tus modelos. No guardes credenciales reales en el repositorio.",
    "examples": [
      {
        "id": "sqlalchemy/alembic/revision-y-autogenerate/1",
        "title": "Generar una revisión a partir de modelos",
        "language": "bash",
        "code": "alembic revision --autogenerate -m \"crear tablas\"",
        "hint": "Autogenerate no detecta todos los cambios ni renombrados correctamente. Ejecuta este comando en tu terminal.",
        "textOutput": "Un script de revisión en versions con upgrade() y downgrade() propuestos.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/sqlalchemy/alembic/upgrade-downgrade-y-revision-history",
    "remember": "Un downgrade puede perder datos; no garantiza recuperación.",
    "note": "Requiere la revisión anterior revisada y la conexión configurada. Para revertir una revisión en pruebas: alembic downgrade -1.",
    "examples": [
      {
        "id": "sqlalchemy/alembic/upgrade-downgrade-y-revision-history/1",
        "title": "Aplicar e inspeccionar revisiones",
        "language": "bash",
        "code": "alembic upgrade head\nalembic current\nalembic history",
        "hint": "Un downgrade puede perder datos; no garantiza recuperación. Ejecuta este comando en tu terminal.",
        "textOutput": "La base de prueba alcanza la revisión head y current/history muestran la revisión aplicada y el historial.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
