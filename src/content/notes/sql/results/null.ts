// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.
export default {
  "sql/null/definicion/ejemplo-1": {
    "columns": [
      "nombre",
      "telefono"
    ],
    "rows": [
      [
        "Ana 1",
        "NULL"
      ],
      [
        "Elena 5",
        "NULL"
      ],
      [
        "Sofía 9",
        "NULL"
      ],
      [
        "Ana 13",
        "NULL"
      ],
      [
        "Elena 17",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ]
    ]
  },
  "sql/null/is-null/ejemplo-1": {
    "columns": [
      "nombre",
      "telefono"
    ],
    "rows": [
      [
        "Ana 1",
        "NULL"
      ],
      [
        "Elena 5",
        "NULL"
      ],
      [
        "Sofía 9",
        "NULL"
      ],
      [
        "Ana 13",
        "NULL"
      ],
      [
        "Elena 17",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ]
    ]
  },
  "sql/null/is-not-null/ejemplo-1": {
    "columns": [
      "nombre",
      "telefono"
    ],
    "rows": [
      [
        "Luis 2",
        "55501002"
      ],
      [
        "María 3",
        "55501003"
      ],
      [
        "Carlos 4",
        "55501004"
      ],
      [
        "José 6",
        ""
      ],
      [
        "Lucía 7",
        "55501007"
      ],
      [
        "Raúl 8",
        "55501008"
      ],
      [
        "Diego 10",
        "55501010"
      ],
      [
        "Inés 11",
        ""
      ],
      [
        "Andrés 12",
        "55501012"
      ],
      [
        "Luis 14",
        "55501014"
      ],
      [
        "María 15",
        "55501015"
      ],
      [
        "Carlos 16",
        ""
      ],
      [
        "José 18",
        "55501018"
      ],
      [
        "Lucía 19",
        "55501019"
      ],
      [
        "Raúl 20",
        "55501020"
      ],
      [
        "Diego 22",
        "55501022"
      ],
      [
        "Inés 23",
        "55501023"
      ],
      [
        "Andrés 24",
        "55501024"
      ]
    ]
  },
  "sql/null/nullif/ejemplo-1": {
    "columns": [
      "nombre",
      "precio_valido"
    ],
    "rows": [
      [
        "Hub USB",
        "700"
      ],
      [
        "Control remoto",
        "NULL"
      ],
      [
        "Cable auxiliar",
        "100"
      ]
    ]
  }
};
