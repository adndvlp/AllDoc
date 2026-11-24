// Generado desde specs/power-query.md por scripts/prepare-power-query-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/power-query/merge-queries/definicion",
    "remember": "Une por claves compatibles y revisa cuántas coincidencias tiene cada fila.",
    "examples": [
      {
        "id": "power-query/merge-queries/definicion/1",
        "title": "Relacionar pedidos con clientes",
        "language": "powerquery",
        "code": "Table.NestedJoin(Pedidos, {\"cliente\"}, Clientes, {\"cliente\"}, \"datos_cliente\", JoinKind.LeftOuter)",
        "hint": "Inicio > Combinar consultas; selecciona cliente en ambas tablas.",
        "textOutput": "7 filas de pedidos; cada tabla datos_cliente contiene un registro.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/expandir-coincidencias",
    "remember": "Expandir varias coincidencias puede aumentar el número de filas.",
    "examples": [
      {
        "id": "power-query/merge-queries/expandir-coincidencias/1",
        "title": "Añadir nombre y país a pedidos",
        "language": "powerquery",
        "code": "let J = Table.NestedJoin(Pedidos, {\"cliente\"}, Clientes, {\"cliente\"}, \"datos\", JoinKind.LeftOuter) in Table.ExpandTableColumn(J, \"datos\", {\"nombre\",\"pais\"}, {\"nombre_cliente\",\"pais_cliente\"})",
        "hint": "En el icono de expansión selecciona solo los campos necesarios.",
        "textOutput": "7 filas; 101,102,107 tienen Ana/México; 103,104 Luis/México; 105,106 Marta/España.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/inner-join",
    "remember": "Los registros sin coincidencia no aparecen.",
    "examples": [
      {
        "id": "power-query/merge-queries/inner-join/1",
        "title": "Listar clientes con pedidos",
        "language": "powerquery",
        "code": "let J = Table.NestedJoin(Clientes, {\"cliente\"}, Pedidos, {\"cliente\"}, \"p\", JoinKind.Inner) in Table.ExpandTableColumn(J,\"p\",{\"id\"},{\"pedido\"})",
        "hint": "La expansión genera una fila por coincidencia.",
        "textOutput": "7 filas; Diego no aparece.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/left-outer-y-right-outer",
    "remember": "Elige qué entidad debe aparecer aunque falten coincidencias.",
    "examples": [
      {
        "id": "power-query/merge-queries/left-outer-y-right-outer/1",
        "title": "Conservar todos los clientes",
        "language": "powerquery",
        "code": "let J = Table.NestedJoin(Clientes, {\"cliente\"}, Pedidos, {\"cliente\"}, \"p\", JoinKind.LeftOuter) in Table.ExpandTableColumn(J,\"p\",{\"id\"},{\"pedido\"})",
        "hint": "Right Outer con las tablas invertidas conserva la misma entidad.",
        "textOutput": "8 filas: 7 pedidos y Diego con pedido=null.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/full-outer",
    "remember": "Las filas sin pareja tienen campos ausentes del otro lado.",
    "examples": [
      {
        "id": "power-query/merge-queries/full-outer/1",
        "title": "Conciliar catálogos de dos sistemas",
        "language": "powerquery",
        "code": "let A = #table({\"id\",\"a\"},{{1,\"A\"},{2,\"B\"}}), B = #table({\"id\",\"b\"},{{2,\"B\"},{3,\"C\"}}), J = Table.NestedJoin(A,{\"id\"},B,{\"id\"},\"derecha\",JoinKind.FullOuter) in Table.ExpandTableColumn(J,\"derecha\",{\"id\",\"b\"},{\"id_derecha\",\"b\"})",
        "hint": "Se conserva el identificador de cada lado para inspeccionar faltantes.",
        "textOutput": "(id,a,id_derecha,b): (1,A,null,null),(2,B,2,B),(null,null,3,C).",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/left-anti-y-right-anti",
    "remember": "Left Anti conserva las filas sin pareja de la izquierda.",
    "examples": [
      {
        "id": "power-query/merge-queries/left-anti-y-right-anti/1",
        "title": "Buscar clientes sin pedidos",
        "language": "powerquery",
        "code": "Table.Join(Clientes, {\"cliente\"}, Table.RenameColumns(Pedidos, {{\"cliente\",\"cliente_pedido\"}}), {\"cliente_pedido\"}, JoinKind.LeftAnti)",
        "hint": "Right Anti con las tablas invertidas encuentra las mismas claves.",
        "textOutput": "Una fila de Clientes: Diego, id 4, país null, alta 2026-02-01.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/claves-multiples",
    "remember": "Comprueba tipos, orden y significado de ambas claves.",
    "examples": [
      {
        "id": "power-query/merge-queries/claves-multiples/1",
        "title": "Relacionar por cliente y estado",
        "language": "powerquery",
        "code": "let F = #table({\"cliente\",\"estado\",\"objetivo\"}, {{1,\"completado\",500},{2,\"cancelado\",0}}), J = Table.NestedJoin(Pedidos,{\"cliente\",\"estado\"},F,{\"cliente\",\"estado\"},\"objetivos\",JoinKind.Inner) in Table.ExpandTableColumn(J,\"objetivos\",{\"objetivo\"})",
        "hint": "En el editor selecciona ambas claves en el mismo orden.",
        "textOutput": "4 filas: ids 101,102,107 con objetivo 500; 103 con objetivo 0.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/cardinalidad-y-duplicacion",
    "remember": "Valida claves de la dimensión antes de sumar una tabla expandida.",
    "examples": [
      {
        "id": "power-query/merge-queries/cardinalidad-y-duplicacion/1",
        "title": "Contar coincidencias por cliente",
        "language": "powerquery",
        "code": "let J = Table.NestedJoin(Clientes,{\"cliente\"},Pedidos,{\"cliente\"},\"p\",JoinKind.LeftOuter) in Table.AddColumn(J,\"coincidencias\", each Table.RowCount([p]), Int64.Type)",
        "hint": "El conteo se obtiene antes de expandir.",
        "textOutput": "Clientes 1,2,3,4 tienen 3,2,2,0 coincidencias respectivamente.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/power-query/merge-queries/fuzzy-merge",
    "remember": "No es adecuada para claves de identidad sin validación humana.",
    "note": "La disponibilidad y las opciones dependen del entorno; una coincidencia aproximada no demuestra identidad.",
    "examples": [
      {
        "id": "power-query/merge-queries/fuzzy-merge/1",
        "title": "Comparar nombres de catálogos",
        "code": "",
        "steps": [
          "Crea A con nombre = Ana y B con nombre = ANA, usando dos consultas en blanco",
          "Combinar consultas, selecciona nombre de ambas y activa coincidencia aproximada",
          "Configura ignorar mayúsculas y limita coincidencias a 1"
        ],
        "external": true,
        "hint": "Revisa el resultado antes de aceptarlo.",
        "textOutput": "Una coincidencia esperada Ana–ANA.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
