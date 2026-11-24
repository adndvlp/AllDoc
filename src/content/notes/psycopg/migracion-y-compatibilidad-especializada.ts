// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/definicion",
    "remember": "Migrar por comportamiento, no solo por nombres de métodos.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/definicion/1",
        "title": "Comprobar la versión principal",
        "language": "python",
        "code": "print(psycopg.__version__.split('.')[0])",
        "hint": "Migrar por comportamiento, no solo por nombres de métodos.",
        "textOutput": "`3`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/contextos-y-binding-al-migrar",
    "remember": "Revisar código que reutiliza conexiones fuera de with o usa múltiples SQL parametrizados.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/contextos-y-binding-al-migrar/1",
        "title": "Verificar el cierre al salir de with",
        "language": "python",
        "code": "with psycopg.connect(DSN) as c:\n    print(c.execute(\"SELECT 1\").fetchone())\nprint(c.closed)",
        "hint": "Revisar código que reutiliza conexiones fuera de with o usa múltiples SQL parametrizados.",
        "textOutput": "`(1,)` y `True`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/callproc-y-procedimientos",
    "remember": "El objeto de PostgreSQL determina si corresponde SELECT o CALL.",
    "note": "Para un procedimiento existente: `cur.execute(\"CALL mi_procedimiento(%s)\", (valor,))`; sus permisos y transacciones dependen de la definición.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/callproc-y-procedimientos/1",
        "title": "Invocar una función integrada",
        "language": "python",
        "code": "cur.execute(\"SELECT upper(%s)\", (\"ventas\",))\nprint(cur.fetchone())",
        "hint": "El objeto de PostgreSQL determina si corresponde SELECT o CALL.",
        "textOutput": "`('VENTAS',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/fechas-infinitas-y-cambios-de-adaptacion",
    "remember": "Definir explícitamente una política para fechas especiales.",
    "note": "Leer directamente como date puede producir DataError; un loader personalizado puede implementar una política distinta.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/fechas-infinitas-y-cambios-de-adaptacion/1",
        "title": "Leer una fecha infinita como texto",
        "language": "python",
        "code": "cur.execute(\"SELECT 'infinity'::date::text\")\nprint(cur.fetchone())",
        "hint": "Definir explícitamente una política para fechas especiales.",
        "textOutput": "`('infinity',)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/cockroachdb-y-crdb",
    "remember": "No asumir compatibilidad completa con PostgreSQL.",
    "note": "Para consultar CockroachDB se requiere un servidor y DSN propios y revisar diferencias de funciones, tipos y transacciones. El dataset anterior se diseñó para PostgreSQL.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/cockroachdb-y-crdb/1",
        "title": "Importar el adaptador de CockroachDB",
        "language": "python",
        "code": "from psycopg.crdb import connect\nprint(callable(connect))",
        "hint": "No asumir compatibilidad completa con PostgreSQL.",
        "textOutput": "`True` si el módulo está disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/migracion-y-compatibilidad-especializada/resolucion-dns-y-varios-hosts",
    "remember": "El módulo `_dns` tiene nombre interno; no depender de él en código de aplicación salvo API documentada y versión fijada.",
    "note": "Para producción utilizar hosts reales y, si procede, target_session_attrs. Las funciones de resolución SRV requieren revisar la API y dependencias opcionales documentadas.",
    "examples": [
      {
        "id": "psycopg/migracion-y-compatibilidad-especializada/resolucion-dns-y-varios-hosts/1",
        "title": "Construir una configuración con hosts alternativos",
        "language": "python",
        "code": "from psycopg.conninfo import make_conninfo, conninfo_to_dict\nd = make_conninfo(\"\", host=\"db1.example,db2.example\", port=\"5432,5432\")\nprint(conninfo_to_dict(d)[\"host\"])",
        "hint": "El módulo `_dns` tiene nombre interno; no depender de él en código de aplicación salvo API documentada y versión fijada.",
        "textOutput": "`db1.example,db2.example`; no realiza DNS ni conexión.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
