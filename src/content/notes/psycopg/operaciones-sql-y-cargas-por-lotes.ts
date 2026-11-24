// Generado desde specs/psycopg.md por scripts/prepare-psycopg-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/definicion",
    "remember": "La lógica SQL sigue siendo SQL, aunque se envíe desde Python.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/definicion/1",
        "title": "Consultar ventas completadas",
        "language": "python",
        "code": "cur.execute(\"SELECT SUM(importe) FROM pedidos WHERE estado=%s\", (\"completed\",))\nprint(cur.fetchone())",
        "hint": "La lógica SQL sigue siendo SQL, aunque se envíe desde Python.",
        "textOutput": "`(Decimal('2000.00'),)`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/insert-y-returning",
    "remember": "`execute()` seguido de `fetchone()` solo recupera si SQL devuelve filas.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/insert-y-returning/1",
        "title": "Insertar un cliente y recuperar su ID",
        "language": "python",
        "code": "cur.execute(\"INSERT INTO clientes VALUES (%s,%s,%s) RETURNING id\", (9,\"Eva\",None))\nprint(cur.fetchone())",
        "hint": "`execute()` seguido de `fetchone()` solo recupera si SQL devuelve filas.",
        "textOutput": "`(9,)`; el envoltorio revierte la inserción.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/update",
    "remember": "Sin WHERE se actualiza toda la tabla.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/update/1",
        "title": "Cambiar el estado de un pedido",
        "language": "python",
        "code": "cur.execute(\"UPDATE pedidos SET estado=%s WHERE id=%s RETURNING estado\", (\"completed\",104))\nprint(cur.fetchone())",
        "hint": "Sin WHERE se actualiza toda la tabla.",
        "textOutput": "`('completed',)`; luego rollback.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/delete",
    "remember": "Revisar el filtro antes de eliminar datos.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/delete/1",
        "title": "Eliminar el pedido cancelado",
        "language": "python",
        "code": "cur.execute(\"DELETE FROM pedidos WHERE id=%s RETURNING id\", (104,))\nprint(cur.fetchone(), cur.rowcount)",
        "hint": "Revisar el filtro antes de eliminar datos.",
        "textOutput": "`(104,) 1`; luego rollback.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/create-alter-y-drop",
    "remember": "DDL modifica estructura, no solo filas.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/create-alter-y-drop/1",
        "title": "Crear y modificar una tabla temporal",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE demo_ddl (id integer)\")\ncur.execute(\"ALTER TABLE demo_ddl ADD COLUMN etiqueta text\")\ncur.execute(\"DROP TABLE demo_ddl\")\nprint(cur.statusmessage)",
        "hint": "DDL modifica estructura, no solo filas.",
        "textOutput": "`DROP TABLE`; la tabla deja de existir.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/on-conflict",
    "remember": "La clave de conflicto debe estar respaldada por una restricción o índice válido.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/on-conflict/1",
        "title": "Actualizar el nombre si el ID ya existe",
        "language": "python",
        "code": "cur.execute(\"\"\"INSERT INTO clientes VALUES (%s,%s,%s)\nON CONFLICT (id) DO UPDATE SET nombre=EXCLUDED.nombre\nRETURNING nombre\"\"\", (1,\"Ana María\",\"México\"))\nprint(cur.fetchone())",
        "hint": "La clave de conflicto debe estar respaldada por una restricción o índice válido.",
        "textOutput": "`('Ana María',)`; luego rollback.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/executemany",
    "remember": "El segundo argumento es una secuencia de tuplas o diccionarios.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/executemany/1",
        "title": "Insertar dos clientes",
        "language": "python",
        "code": "cur.executemany(\"INSERT INTO clientes VALUES (%s,%s,%s)\", [(9,\"Eva\",None),(10,\"Leo\",\"España\")])\nprint(cur.rowcount)",
        "hint": "El segundo argumento es una secuencia de tuplas o diccionarios.",
        "textOutput": "`2`; los cambios quedan pendientes de confirmación.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/executemany-con-returning",
    "remember": "Usar nextset para pasar al resultado de la siguiente ejecución.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/executemany-con-returning/1",
        "title": "Recuperar los IDs insertados",
        "language": "python",
        "code": "cur.executemany(\"INSERT INTO clientes VALUES (%s,%s,%s) RETURNING id\", [(9,\"Eva\",None),(10,\"Leo\",None)], returning=True)\nprint(cur.fetchone())\ncur.nextset()\nprint(cur.fetchone())",
        "hint": "Usar nextset para pasar al resultado de la siguiente ejecución.",
        "textOutput": "`(9,)`, luego `(10,)`; rollback al final.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/batch-processing",
    "remember": "Para cargas grandes, comparar executemany con COPY.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/batch-processing/1",
        "title": "Cargar registros desde un generador",
        "language": "python",
        "code": "cur.execute(\"CREATE TEMP TABLE carga (id integer)\")\ncur.executemany(\"INSERT INTO carga VALUES (%s)\", ((i,) for i in range(100)))\nprint(cur.rowcount)",
        "hint": "Para cargas grandes, comparar executemany con COPY.",
        "textOutput": "`100`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/psycopg/operaciones-sql-y-cargas-por-lotes/consultas-analiticas",
    "remember": "Agrega en PostgreSQL cuando solo necesitas el resumen.",
    "examples": [
      {
        "id": "psycopg/operaciones-sql-y-cargas-por-lotes/consultas-analiticas/1",
        "title": "Obtener el gasto por cliente con compras completadas",
        "language": "python",
        "code": "cur.execute(\"\"\"SELECT c.nombre, SUM(p.importe)\nFROM clientes c JOIN pedidos p ON c.id=p.cliente_id\nWHERE p.estado=%s GROUP BY c.id ORDER BY c.id\"\"\", (\"completed\",))\nprint(cur.fetchall())",
        "hint": "Agrega en PostgreSQL cuando solo necesitas el resumen.",
        "textOutput": "`[('Ana', Decimal('1000.00')), ('Luis', Decimal('1000.00'))]`.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
