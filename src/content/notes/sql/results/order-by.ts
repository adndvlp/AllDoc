// Salida de referencia: SQLite, negocio-relacional@1. Verificación WASM en tests/sql-first-block.test.ts.
export default {
  "sql/order-by/precio-ascendente": {
    "columns": [
      "nombre",
      "precio"
    ],
    "rows": [
      [
        "Control remoto",
        "0"
      ],
      [
        "Cable auxiliar",
        "100"
      ],
      [
        "Cable HDMI",
        "150"
      ],
      [
        "Memoria USB",
        "200"
      ],
      [
        "Mouse",
        "250"
      ],
      [
        "Adaptador",
        "250"
      ],
      [
        "Soporte",
        "300"
      ],
      [
        "Lector de tarjetas",
        "400"
      ],
      [
        "Teclado",
        "500"
      ],
      [
        "Hub USB",
        "700"
      ],
      [
        "Bocina",
        "800"
      ],
      [
        "Webcam",
        "900"
      ],
      [
        "Micrófono",
        "1100"
      ],
      [
        "Audífonos",
        "1200"
      ],
      [
        "SSD",
        "1500"
      ],
      [
        "Disco externo",
        "1800"
      ],
      [
        "Pantalla portátil",
        "2500"
      ],
      [
        "Monitor",
        "3500"
      ]
    ]
  },
  "sql/order-by/asc/ejemplo-1": {
    "columns": [
      "nombre",
      "precio"
    ],
    "rows": [
      [
        "Control remoto",
        "0"
      ],
      [
        "Cable auxiliar",
        "100"
      ],
      [
        "Cable HDMI",
        "150"
      ],
      [
        "Memoria USB",
        "200"
      ],
      [
        "Mouse",
        "250"
      ],
      [
        "Adaptador",
        "250"
      ],
      [
        "Soporte",
        "300"
      ],
      [
        "Lector de tarjetas",
        "400"
      ],
      [
        "Teclado",
        "500"
      ],
      [
        "Hub USB",
        "700"
      ],
      [
        "Bocina",
        "800"
      ],
      [
        "Webcam",
        "900"
      ],
      [
        "Micrófono",
        "1100"
      ],
      [
        "Audífonos",
        "1200"
      ],
      [
        "SSD",
        "1500"
      ],
      [
        "Disco externo",
        "1800"
      ],
      [
        "Pantalla portátil",
        "2500"
      ],
      [
        "Monitor",
        "3500"
      ]
    ]
  },
  "sql/order-by/desc/ejemplo-1": {
    "columns": [
      "nombre",
      "precio"
    ],
    "rows": [
      [
        "Monitor",
        "3500"
      ],
      [
        "Pantalla portátil",
        "2500"
      ],
      [
        "Disco externo",
        "1800"
      ],
      [
        "SSD",
        "1500"
      ],
      [
        "Audífonos",
        "1200"
      ],
      [
        "Micrófono",
        "1100"
      ],
      [
        "Webcam",
        "900"
      ],
      [
        "Bocina",
        "800"
      ],
      [
        "Hub USB",
        "700"
      ],
      [
        "Teclado",
        "500"
      ],
      [
        "Lector de tarjetas",
        "400"
      ],
      [
        "Soporte",
        "300"
      ],
      [
        "Mouse",
        "250"
      ],
      [
        "Adaptador",
        "250"
      ],
      [
        "Memoria USB",
        "200"
      ],
      [
        "Cable HDMI",
        "150"
      ],
      [
        "Cable auxiliar",
        "100"
      ],
      [
        "Control remoto",
        "0"
      ]
    ]
  },
  "sql/order-by/varias-columnas/ejemplo-1": {
    "columns": [
      "nombre",
      "categoria",
      "precio"
    ],
    "rows": [
      [
        "Webcam",
        "Accesorios",
        "900"
      ],
      [
        "Hub USB",
        "Accesorios",
        "700"
      ],
      [
        "Teclado",
        "Accesorios",
        "500"
      ],
      [
        "Lector de tarjetas",
        "Accesorios",
        "400"
      ],
      [
        "Soporte",
        "Accesorios",
        "300"
      ],
      [
        "Mouse",
        "Accesorios",
        "250"
      ],
      [
        "Adaptador",
        "Accesorios",
        "250"
      ],
      [
        "Cable HDMI",
        "Accesorios",
        "150"
      ],
      [
        "Control remoto",
        "Accesorios",
        "0"
      ],
      [
        "Disco externo",
        "Almacenamiento",
        "1800"
      ],
      [
        "SSD",
        "Almacenamiento",
        "1500"
      ],
      [
        "Memoria USB",
        "Almacenamiento",
        "200"
      ],
      [
        "Audífonos",
        "Audio",
        "1200"
      ],
      [
        "Micrófono",
        "Audio",
        "1100"
      ],
      [
        "Bocina",
        "Audio",
        "800"
      ],
      [
        "Cable auxiliar",
        "Audio",
        "100"
      ],
      [
        "Monitor",
        "Pantallas",
        "3500"
      ],
      [
        "Pantalla portátil",
        "Pantallas",
        "2500"
      ]
    ]
  },
  "sql/order-by/con-limit/ejemplo-1": {
    "columns": [
      "nombre",
      "precio"
    ],
    "rows": [
      [
        "Monitor",
        "3500"
      ],
      [
        "Pantalla portátil",
        "2500"
      ],
      [
        "Disco externo",
        "1800"
      ]
    ]
  }
};
