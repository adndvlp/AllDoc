// Generado desde specs/openpyxl.md por scripts/prepare-openpyxl-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/openpyxl/integraciones/definicion",
    "remember": "Usa openpyxl para estructura y presentación; otra biblioteca puede encargarse del análisis.",
    "examples": [
      {
        "id": "openpyxl/integraciones/definicion/1",
        "title": "Exportar los valores a CSV",
        "language": "python",
        "code": "from csv import writer\nwith open('export.csv','w',newline='',encoding='utf-8') as f:\n    writer(f).writerows(ws.values)\nprint(Path('export.csv').exists())",
        "hint": "",
        "textOutput": "True; CSV con cabecera y cinco filas, sin estilos ni objetos Excel.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/csv-a-excel",
    "remember": "CSV no conserva tipos ni formatos; convierte los campos numéricos explícitamente.",
    "examples": [
      {
        "id": "openpyxl/integraciones/csv-a-excel/1",
        "title": "Importar un CSV convirtiendo unidades",
        "language": "python",
        "code": "from csv import reader\nPath('entrada.csv').write_text(chr(10).join(['Producto,Unidades','Mouse,5','']),encoding='utf-8')\nh = wb.create_sheet('Importado')\nwith open('entrada.csv',encoding='utf-8',newline='') as f:\n    filas = reader(f)\n    h.append(next(filas))\n    for producto,n in filas:\n        h.append([producto,int(n)])\nprint(h['B2'].value,h['B2'].data_type)",
        "hint": "",
        "textOutput": "5 n.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/sql-a-excel",
    "remember": "SQL obtiene los datos; openpyxl crea el archivo y su presentación.",
    "examples": [
      {
        "id": "openpyxl/integraciones/sql-a-excel/1",
        "title": "Exportar resultados de una consulta SQL",
        "language": "python",
        "code": "import sqlite3\nwith sqlite3.connect(':memory:') as con:\n    con.execute('CREATE TABLE ventas(producto TEXT, unidades INTEGER)')\n    con.executemany('INSERT INTO ventas VALUES (?,?)',[('Mouse',5),('Laptop',2),('Mouse',2)])\n    cur = con.execute('SELECT producto,SUM(unidades) AS total FROM ventas GROUP BY producto ORDER BY producto')\n    h = wb.create_sheet('SQL')\n    h.append([d[0] for d in cur.description])\n    for fila in cur:\n        h.append(fila)\nprint(list(h.values))",
        "hint": "",
        "textOutput": "[('producto','total'),('Laptop',2),('Mouse',7)] (las tuplas de texto se muestran con espacios tras las comas en Python).",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/dataframe-to-rows",
    "remember": "Requiere pandas; index=False evita agregar el índice como columna.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/integraciones/dataframe-to-rows/1",
        "title": "Escribir un DataFrame en una hoja",
        "language": "python",
        "code": "import pandas as pd\nfrom openpyxl.utils.dataframe import dataframe_to_rows\ndf = pd.DataFrame({'Producto':['Laptop','Mouse'],'Total':[2400,140]})\nh = wb.create_sheet('Pandas')\nfor fila in dataframe_to_rows(df,index=False,header=True):\n    h.append(fila)\nprint(list(h.values))",
        "hint": "",
        "textOutput": "[('Producto', 'Total'), ('Laptop', 2400), ('Mouse', 140)].",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/excel-writer",
    "remember": "Requiere pandas; usa un context manager para cerrar y guardar.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/integraciones/excel-writer/1",
        "title": "Exportar con ExcelWriter y congelar cabecera",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.DataFrame({'Producto':['Laptop','Mouse'],'Total':[2400,140]})\nwith pd.ExcelWriter('pandas.xlsx',engine='openpyxl') as writer:\n    df.to_excel(writer,sheet_name='Reporte',index=False)\n    writer.sheets['Reporte'].freeze_panes = 'A2'\nprint(load_workbook('pandas.xlsx')['Reporte']['B2'].value)",
        "hint": "",
        "textOutput": "2400; la cabecera queda inmovilizada.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/leer-con-pandas",
    "remember": "pandas no es un editor completo de estilos y objetos Excel; None puede convertirse a NaN.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/integraciones/leer-con-pandas/1",
        "title": "Analizar el archivo con pandas",
        "language": "python",
        "code": "import pandas as pd\ndf = pd.read_excel('ventas_base.xlsx',sheet_name='Ventas',engine='openpyxl')\nprint(df.shape,int(df['Unidades'].sum()))",
        "hint": "",
        "textOutput": "(5, 7) 13.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/numpy",
    "remember": "Requiere NumPy; normaliza NaN e infinitos según la regla de negocio.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/integraciones/numpy/1",
        "title": "Escribir un promedio de NumPy",
        "language": "python",
        "code": "import numpy as np\na = np.array([800,20,50])\nresumen.append(['Precio medio',float(a.mean())])\nprint(resumen['B3'].value)",
        "hint": "",
        "textOutput": "290.0.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/openpyxl/integraciones/matplotlib",
    "remember": "Requiere Matplotlib y Pillow; el gráfico insertado no tiene series editables en Excel.",
    "note": "Requiere instalar la biblioteca externa que se importa en el ejemplo.",
    "examples": [
      {
        "id": "openpyxl/integraciones/matplotlib/1",
        "title": "Insertar un gráfico de Matplotlib",
        "language": "python",
        "code": "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nfrom openpyxl.drawing.image import Image\nfig,ax = plt.subplots()\nax.bar(['Laptop','Mouse','Teclado'],[3,7,3])\nfig.savefig('grafico.png')\nplt.close(fig)\nresumen.add_image(Image('grafico.png'),'D2')",
        "hint": "Para practicar este ejemplo, instala Matplotlib y Pillow en tu entorno local.",
        "textOutput": "Imagen de barras con 3, 7 y 3 unidades en Resumen.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
