// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/bases-de-datos-y-sql/definicion",
    "remember": "Cierra la conexión cuando termines y no guardes credenciales en scripts.",
    "note": "Requiere DBI y RSQLite.",
    "examples": [
      {
        "id": "r/bases-de-datos-y-sql/definicion/1",
        "title": "Consultar SQLite en memoria",
        "language": "r",
        "code": "con <- DBI::dbConnect(RSQLite::SQLite(), \":memory:\")\nDBI::dbWriteTable(con, \"pedidos\", as.data.frame(pedidos |> select(id, monto)))\nDBI::dbGetQuery(con, \"SELECT SUM(monto) AS total FROM pedidos\")\nDBI::dbDisconnect(con)",
        "hint": "La base temporal desaparece al desconectar.",
        "textOutput": "Tabla de una fila con total 900; conexión cerrada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/bases-de-datos-y-sql/consultas-parametrizadas",
    "remember": "La sintaxis de marcadores depende del controlador.",
    "examples": [
      {
        "id": "r/bases-de-datos-y-sql/consultas-parametrizadas/1",
        "title": "Filtrar por importe con SQLite",
        "language": "r",
        "code": "con <- DBI::dbConnect(RSQLite::SQLite(), \":memory:\")\nDBI::dbWriteTable(con, \"pedidos\", as.data.frame(pedidos |> select(id, monto)))\nDBI::dbGetQuery(con, \"SELECT id FROM pedidos WHERE monto > ? ORDER BY id\", params = list(200))\nDBI::dbDisconnect(con)",
        "hint": "El marcador `?` recibe 200 como dato.",
        "textOutput": "Una fila id=103.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/bases-de-datos-y-sql/dbplyr-y-evaluacion-diferida",
    "remember": "Filtra y agrega en el servidor antes de traer grandes volúmenes.",
    "note": "Requiere dbplyr, DBI y RSQLite; no todos los verbos se traducen igual en todos los motores.",
    "examples": [
      {
        "id": "r/bases-de-datos-y-sql/dbplyr-y-evaluacion-diferida/1",
        "title": "Consultar una tabla remota",
        "language": "r",
        "code": "library(dbplyr)\ncon <- DBI::dbConnect(RSQLite::SQLite(), \":memory:\")\nDBI::dbWriteTable(con, \"pedidos\", as.data.frame(pedidos |> select(id, monto)))\nq <- tbl(con, \"pedidos\") |> filter(monto >= 200)\nq |> collect()\nDBI::dbDisconnect(con)",
        "hint": "collect recupera los resultados locales.",
        "textOutput": "Dos filas id 102 y 103 con montos 200 y 300 (sin orden garantizado).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/bases-de-datos-y-sql/transacciones-y-escritura",
    "remember": "No pruebes modificaciones en una base de producción sin autorización.",
    "examples": [
      {
        "id": "r/bases-de-datos-y-sql/transacciones-y-escritura/1",
        "title": "Insertar en una base temporal",
        "language": "r",
        "code": "con <- DBI::dbConnect(RSQLite::SQLite(), \":memory:\")\nDBI::dbExecute(con, \"CREATE TABLE ventas (monto INTEGER)\")\nDBI::dbWithTransaction(con, { DBI::dbExecute(con, \"INSERT INTO ventas VALUES (100)\") })\nDBI::dbGetQuery(con, \"SELECT monto FROM ventas\")\nDBI::dbDisconnect(con)",
        "hint": "La transacción confirma la inserción exitosa.",
        "textOutput": "Una fila con monto 100.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
