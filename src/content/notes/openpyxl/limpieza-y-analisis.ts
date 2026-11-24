// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/definicion",
    "remember": "values_only=True facilita trabajar con tuplas.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/definicion/1",
        "title": "Extraer los registros de ventas",
        "language": "python",
        "code": "filas = list(ws.iter_rows(min_row=2,values_only=True))\nprint(len(filas), filas[0][:3])",
        "hint": "",
        "textOutput": "5 (101, 'Laptop', 'Norte').",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/valores-faltantes",
    "remember": "No uses if not valor si 0 o False son datos válidos.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/valores-faltantes/1",
        "title": "Rellenar una región faltante",
        "language": "python",
        "code": "for (c,) in ws.iter_rows(min_row=2,min_col=3,max_col=3):\n    if c.value is None:\n        c.value = 'Sin region'\nprint(ws['C5'].value)",
        "hint": "",
        "textOutput": "Sin region.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/detectar-duplicados",
    "remember": "Un producto repetido no implica una venta duplicada; define qué campo identifica el registro.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/detectar-duplicados/1",
        "title": "Encontrar un identificador repetido",
        "language": "python",
        "code": "from collections import Counter\nws.append([101,'Laptop','Norte',2,800,date(2026,8,1),'Completado'])\nconteo = Counter(r[0] for r in ws.iter_rows(min_row=2,values_only=True))\nprint([k for k,n in conteo.items() if n>1])",
        "hint": "",
        "textOutput": "[101].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/eliminar-duplicados",
    "remember": "No elimines duplicados sin decidir qué versión conservar.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/eliminar-duplicados/1",
        "title": "Conservar la primera venta por ID",
        "language": "python",
        "code": "ws.append([101,'Laptop','Norte',2,800,date(2026,8,1),'Completado'])\nlimpia = wb.create_sheet('Limpia')\nlimpia.append(next(ws.values))\nvistos = set()\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    if r[0] not in vistos:\n        limpia.append(r)\n        vistos.add(r[0])\nprint(limpia.max_row)",
        "hint": "",
        "textOutput": "6 (cabecera y cinco registros).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/limpiar-texto",
    "remember": "Comprueba el tipo antes de ejecutar métodos de texto.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/limpiar-texto/1",
        "title": "Normalizar un producto",
        "language": "python",
        "code": "ws['B2'] = '  LAPTOP  '\nws['B2'] = ws['B2'].value.strip().lower()\nprint(ws['B2'].value)",
        "hint": "",
        "textOutput": "laptop.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/convertir-tipos",
    "remember": "Valida entradas; una conversión inválida puede producir ValueError.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/convertir-tipos/1",
        "title": "Convertir unidades de texto a entero",
        "language": "python",
        "code": "ws['D2'] = '2'\nws['D2'] = int(ws['D2'].value)\nprint(ws['D2'].value, ws['D2'].data_type)",
        "hint": "",
        "textOutput": "2 n.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/filtrar-y-ordenar",
    "remember": "Esto modifica la lista, no configura el autofiltro de Excel.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/filtrar-y-ordenar/1",
        "title": "Ordenar ventas completadas por importe",
        "language": "python",
        "code": "filas = [r for r in ws.iter_rows(min_row=2,values_only=True) if r[6]=='Completado']\nfilas = sorted(filas,key=lambda r:r[3]*r[4],reverse=True)\nprint([r[0] for r in filas])",
        "hint": "",
        "textOutput": "[101, 104, 102].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/agregaciones",
    "remember": "Excluye faltantes según la regla de negocio; no supongas que son cero.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/agregaciones/1",
        "title": "Calcular total, promedio y extremos",
        "language": "python",
        "code": "importes = [r[3]*r[4] for r in ws.iter_rows(min_row=2,values_only=True)]\nprint(sum(importes),sum(importes)/len(importes),min(importes),max(importes))",
        "hint": "",
        "textOutput": "2690 538.0 40 1600.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/limpieza-y-analisis/agrupaciones",
    "remember": "Usa como clave el campo por el que quieres resumir.",
    "examples": [
      {
        "id": "openpyxl/limpieza-y-analisis/agrupaciones/1",
        "title": "Sumar importes por producto",
        "language": "python",
        "code": "from collections import defaultdict\ntotales = defaultdict(int)\nfor r in ws.iter_rows(min_row=2,values_only=True):\n    totales[r[1]] += r[3]*r[4]\nprint(dict(totales))",
        "hint": "",
        "textOutput": "{'Laptop': 2400, 'Mouse': 140, 'Teclado': 150}.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
