// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/definicion",
    "remember": "Estas funciones no necesitan leer un libro.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/definicion/1",
        "title": "Convertir un índice de columna",
        "language": "python",
        "code": "from openpyxl.utils import get_column_letter\nprint(get_column_letter(28))",
        "hint": "",
        "textOutput": "AB.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/indices-y-letras",
    "remember": "A corresponde a 1; Z a 26.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/indices-y-letras/1",
        "title": "Convertir AA y AB entre letras e índices",
        "language": "python",
        "code": "from openpyxl.utils import get_column_letter, column_index_from_string\nprint(get_column_letter(27), column_index_from_string('AB'))",
        "hint": "",
        "textOutput": "AA 28.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/referencias",
    "remember": "coordinate_from_string devuelve letra y fila.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/referencias/1",
        "title": "Descomponer y fijar C12",
        "language": "python",
        "code": "from openpyxl.utils.cell import coordinate_from_string, absolute_coordinate\nprint(coordinate_from_string('C12'), absolute_coordinate('C12'))",
        "hint": "",
        "textOutput": "('C', 12) $C$12.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/limites-de-rango",
    "remember": "El orden es columna, fila, columna, fila.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/limites-de-rango/1",
        "title": "Obtener los cuatro límites de B2:D6",
        "language": "python",
        "code": "from openpyxl.utils.cell import range_boundaries\nprint(range_boundaries('B2:D6'))",
        "hint": "",
        "textOutput": "(2, 2, 4, 6).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/direcciones-de-rango",
    "remember": "Devuelven direcciones de texto, no objetos Cell.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/direcciones-de-rango/1",
        "title": "Enumerar las direcciones de A1:B2",
        "language": "python",
        "code": "from openpyxl.utils.cell import rows_from_range, cols_from_range\nprint(list(rows_from_range('A1:B2')))\nprint(list(cols_from_range('A1:B2')))",
        "hint": "",
        "textOutput": "[('A1', 'B1'), ('A2', 'B2')]; [('A1', 'A2'), ('B1', 'B2')].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/coordenadas/objetos-rango",
    "remember": "La unión de CellRange es el rectángulo envolvente; no mueve datos.",
    "examples": [
      {
        "id": "openpyxl/coordenadas/objetos-rango/1",
        "title": "Intersectar y desplazar rangos",
        "language": "python",
        "code": "from openpyxl.worksheet.cell_range import CellRange, MultiCellRange\na = CellRange('A1:C3')\nb = CellRange('B2:D4')\nprint(a.intersection(b), a.union(b))\na.shift(col_shift=1,row_shift=1)\nprint(a, 'F2' in MultiCellRange('A1:B2 F1:F3'))",
        "hint": "",
        "textOutput": "B2:C3 A1:D4; B2:D4 True.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
