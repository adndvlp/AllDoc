// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.
export default {
  "sql/outer-joins/definicion/ejemplo-1": {
    "columns": [
      "nombre",
      "pedido"
    ],
    "rows": [
      [
        "Ana 1",
        "1"
      ],
      [
        "Ana 1",
        "19"
      ],
      [
        "Ana 1",
        "37"
      ],
      [
        "Luis 2",
        "2"
      ],
      [
        "Luis 2",
        "20"
      ],
      [
        "Luis 2",
        "38"
      ],
      [
        "María 3",
        "3"
      ],
      [
        "María 3",
        "21"
      ],
      [
        "María 3",
        "39"
      ],
      [
        "Carlos 4",
        "4"
      ],
      [
        "Carlos 4",
        "22"
      ],
      [
        "Carlos 4",
        "40"
      ],
      [
        "Elena 5",
        "5"
      ],
      [
        "Elena 5",
        "23"
      ],
      [
        "Elena 5",
        "41"
      ],
      [
        "José 6",
        "6"
      ],
      [
        "José 6",
        "24"
      ],
      [
        "José 6",
        "42"
      ],
      [
        "Lucía 7",
        "7"
      ],
      [
        "Lucía 7",
        "25"
      ],
      [
        "Lucía 7",
        "43"
      ],
      [
        "Raúl 8",
        "8"
      ],
      [
        "Raúl 8",
        "26"
      ],
      [
        "Raúl 8",
        "44"
      ],
      [
        "Sofía 9",
        "9"
      ],
      [
        "Sofía 9",
        "27"
      ],
      [
        "Sofía 9",
        "45"
      ],
      [
        "Diego 10",
        "10"
      ],
      [
        "Diego 10",
        "28"
      ],
      [
        "Diego 10",
        "46"
      ],
      [
        "Inés 11",
        "11"
      ],
      [
        "Inés 11",
        "29"
      ],
      [
        "Inés 11",
        "47"
      ],
      [
        "Andrés 12",
        "12"
      ],
      [
        "Andrés 12",
        "30"
      ],
      [
        "Andrés 12",
        "48"
      ],
      [
        "Ana 13",
        "13"
      ],
      [
        "Ana 13",
        "31"
      ],
      [
        "Luis 14",
        "14"
      ],
      [
        "Luis 14",
        "32"
      ],
      [
        "María 15",
        "15"
      ],
      [
        "María 15",
        "33"
      ],
      [
        "Carlos 16",
        "16"
      ],
      [
        "Carlos 16",
        "34"
      ],
      [
        "Elena 17",
        "17"
      ],
      [
        "Elena 17",
        "35"
      ],
      [
        "José 18",
        "18"
      ],
      [
        "José 18",
        "36"
      ],
      [
        "Lucía 19",
        "NULL"
      ],
      [
        "Raúl 20",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ],
      [
        "Diego 22",
        "NULL"
      ],
      [
        "Inés 23",
        "NULL"
      ],
      [
        "Andrés 24",
        "NULL"
      ]
    ]
  },
  "sql/outer-joins/left-join/ejemplo-1": {
    "columns": [
      "nombre",
      "pedido"
    ],
    "rows": [
      [
        "Ana 1",
        "1"
      ],
      [
        "Ana 1",
        "19"
      ],
      [
        "Ana 1",
        "37"
      ],
      [
        "Luis 2",
        "2"
      ],
      [
        "Luis 2",
        "20"
      ],
      [
        "Luis 2",
        "38"
      ],
      [
        "María 3",
        "3"
      ],
      [
        "María 3",
        "21"
      ],
      [
        "María 3",
        "39"
      ],
      [
        "Carlos 4",
        "4"
      ],
      [
        "Carlos 4",
        "22"
      ],
      [
        "Carlos 4",
        "40"
      ],
      [
        "Elena 5",
        "5"
      ],
      [
        "Elena 5",
        "23"
      ],
      [
        "Elena 5",
        "41"
      ],
      [
        "José 6",
        "6"
      ],
      [
        "José 6",
        "24"
      ],
      [
        "José 6",
        "42"
      ],
      [
        "Lucía 7",
        "7"
      ],
      [
        "Lucía 7",
        "25"
      ],
      [
        "Lucía 7",
        "43"
      ],
      [
        "Raúl 8",
        "8"
      ],
      [
        "Raúl 8",
        "26"
      ],
      [
        "Raúl 8",
        "44"
      ],
      [
        "Sofía 9",
        "9"
      ],
      [
        "Sofía 9",
        "27"
      ],
      [
        "Sofía 9",
        "45"
      ],
      [
        "Diego 10",
        "10"
      ],
      [
        "Diego 10",
        "28"
      ],
      [
        "Diego 10",
        "46"
      ],
      [
        "Inés 11",
        "11"
      ],
      [
        "Inés 11",
        "29"
      ],
      [
        "Inés 11",
        "47"
      ],
      [
        "Andrés 12",
        "12"
      ],
      [
        "Andrés 12",
        "30"
      ],
      [
        "Andrés 12",
        "48"
      ],
      [
        "Ana 13",
        "13"
      ],
      [
        "Ana 13",
        "31"
      ],
      [
        "Luis 14",
        "14"
      ],
      [
        "Luis 14",
        "32"
      ],
      [
        "María 15",
        "15"
      ],
      [
        "María 15",
        "33"
      ],
      [
        "Carlos 16",
        "16"
      ],
      [
        "Carlos 16",
        "34"
      ],
      [
        "Elena 17",
        "17"
      ],
      [
        "Elena 17",
        "35"
      ],
      [
        "José 18",
        "18"
      ],
      [
        "José 18",
        "36"
      ],
      [
        "Lucía 19",
        "NULL"
      ],
      [
        "Raúl 20",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ],
      [
        "Diego 22",
        "NULL"
      ],
      [
        "Inés 23",
        "NULL"
      ],
      [
        "Andrés 24",
        "NULL"
      ]
    ]
  },
  "sql/outer-joins/left-join/ejemplo-2": {
    "columns": [
      "nombre",
      "pedido"
    ],
    "rows": [
      [
        "Elena 17",
        "17"
      ],
      [
        "Elena 17",
        "35"
      ],
      [
        "José 18",
        "18"
      ],
      [
        "José 18",
        "36"
      ],
      [
        "Lucía 19",
        "NULL"
      ],
      [
        "Raúl 20",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ],
      [
        "Diego 22",
        "NULL"
      ],
      [
        "Inés 23",
        "NULL"
      ],
      [
        "Andrés 24",
        "NULL"
      ]
    ]
  },
  "sql/outer-joins/right-join/ejemplo-1": {
    "columns": [
      "nombre",
      "pedido"
    ],
    "rows": [
      [
        "Ana 1",
        "1"
      ],
      [
        "Ana 1",
        "19"
      ],
      [
        "Ana 1",
        "37"
      ],
      [
        "Luis 2",
        "2"
      ],
      [
        "Luis 2",
        "20"
      ],
      [
        "Luis 2",
        "38"
      ],
      [
        "María 3",
        "3"
      ],
      [
        "María 3",
        "21"
      ],
      [
        "María 3",
        "39"
      ],
      [
        "Carlos 4",
        "4"
      ],
      [
        "Carlos 4",
        "22"
      ],
      [
        "Carlos 4",
        "40"
      ],
      [
        "Elena 5",
        "5"
      ],
      [
        "Elena 5",
        "23"
      ],
      [
        "Elena 5",
        "41"
      ],
      [
        "José 6",
        "6"
      ],
      [
        "José 6",
        "24"
      ],
      [
        "José 6",
        "42"
      ],
      [
        "Lucía 7",
        "7"
      ],
      [
        "Lucía 7",
        "25"
      ],
      [
        "Lucía 7",
        "43"
      ],
      [
        "Raúl 8",
        "8"
      ],
      [
        "Raúl 8",
        "26"
      ],
      [
        "Raúl 8",
        "44"
      ],
      [
        "Sofía 9",
        "9"
      ],
      [
        "Sofía 9",
        "27"
      ],
      [
        "Sofía 9",
        "45"
      ],
      [
        "Diego 10",
        "10"
      ],
      [
        "Diego 10",
        "28"
      ],
      [
        "Diego 10",
        "46"
      ],
      [
        "Inés 11",
        "11"
      ],
      [
        "Inés 11",
        "29"
      ],
      [
        "Inés 11",
        "47"
      ],
      [
        "Andrés 12",
        "12"
      ],
      [
        "Andrés 12",
        "30"
      ],
      [
        "Andrés 12",
        "48"
      ],
      [
        "Ana 13",
        "13"
      ],
      [
        "Ana 13",
        "31"
      ],
      [
        "Luis 14",
        "14"
      ],
      [
        "Luis 14",
        "32"
      ],
      [
        "María 15",
        "15"
      ],
      [
        "María 15",
        "33"
      ],
      [
        "Carlos 16",
        "16"
      ],
      [
        "Carlos 16",
        "34"
      ],
      [
        "Elena 17",
        "17"
      ],
      [
        "Elena 17",
        "35"
      ],
      [
        "José 18",
        "18"
      ],
      [
        "José 18",
        "36"
      ],
      [
        "Lucía 19",
        "NULL"
      ],
      [
        "Raúl 20",
        "NULL"
      ],
      [
        "Sofía 21",
        "NULL"
      ],
      [
        "Diego 22",
        "NULL"
      ],
      [
        "Inés 23",
        "NULL"
      ],
      [
        "Andrés 24",
        "NULL"
      ]
    ]
  },
  "sql/outer-joins/full-outer-join/ejemplo-1": {
    "columns": [
      "producto",
      "proveedor"
    ],
    "rows": [
      [
        "NULL",
        "Distribuidora Atlántico"
      ],
      [
        "NULL",
        "Distribuidora Sin catálogo"
      ],
      [
        "Teclado",
        "Distribuidora Norte"
      ],
      [
        "Mouse",
        "Distribuidora Centro"
      ],
      [
        "Monitor",
        "Distribuidora Sur"
      ],
      [
        "Bocina",
        "Distribuidora Pacífico"
      ],
      [
        "Audífonos",
        "Distribuidora Norte"
      ],
      [
        "SSD",
        "Distribuidora Centro"
      ],
      [
        "Memoria USB",
        "Distribuidora Sur"
      ],
      [
        "Webcam",
        "Distribuidora Pacífico"
      ],
      [
        "Micrófono",
        "Distribuidora Norte"
      ],
      [
        "Cable HDMI",
        "Distribuidora Centro"
      ],
      [
        "Pantalla portátil",
        "Distribuidora Sur"
      ],
      [
        "Disco externo",
        "Distribuidora Pacífico"
      ],
      [
        "Soporte",
        "Distribuidora Norte"
      ],
      [
        "Adaptador",
        "Distribuidora Centro"
      ],
      [
        "Lector de tarjetas",
        "Distribuidora Sur"
      ],
      [
        "Hub USB",
        "Distribuidora Pacífico"
      ],
      [
        "Control remoto",
        "NULL"
      ],
      [
        "Cable auxiliar",
        "NULL"
      ]
    ]
  },
  "sql/outer-joins/anti-join/ejemplo-1": {
    "columns": [
      "nombre"
    ],
    "rows": [
      [
        "Lucía 19"
      ],
      [
        "Raúl 20"
      ],
      [
        "Sofía 21"
      ],
      [
        "Diego 22"
      ],
      [
        "Inés 23"
      ],
      [
        "Andrés 24"
      ]
    ]
  }
};
