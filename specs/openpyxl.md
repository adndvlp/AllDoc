# openpyxl

**Clave** `openpyxl`

**Área** Análisis de datos (ubicación propuesta en AllDoc; no confirmada en el catálogo).

**Resumen** Lee, modifica y genera libros de Excel desde Python, conservando el control de celdas, fórmulas, presentación y estructura del archivo.

**Alcance** Desde libros, hojas, celdas y rangos hasta automatización de reportes, formatos, fórmulas, calidad de datos, tablas, filtros, gráficos, validaciones, protección, impresión, rendimiento, integración y formatos avanzados. Las operaciones de análisis hechas con Python o pandas se distinguen de la API de openpyxl. No es una guía de toda la API interna ni una garantía de preguntas de entrevista.

**Entorno** Python 3.10+ y openpyxl 3.1.x (ejemplos preparados con 3.1.5). Excel o una aplicación compatible se requiere para visualizar el resultado gráfico, aplicar filtros o recalcular fórmulas. Los archivos `.xls` y `.xlsb` no son compatibles con openpyxl. Para imágenes se necesita Pillow; para integración con pandas o Matplotlib, instala esas bibliotecas aparte.

## Datos compartidos

Instala la biblioteca en tu entorno de Python:

```bash
python -m pip install openpyxl==3.1.5
```

Cada ejemplo Python parte de una copia nueva del siguiente estado inicial, salvo cuando declare un archivo externo o construya su propio libro. Ejecuta esta preparación antes de cada ejemplo; no ejecutes las fichas de manera acumulativa. Los nombres de archivos son relativos al directorio de trabajo; utiliza una carpeta de práctica. `wb` es el libro, `ws` la hoja Ventas, `resumen` la hoja Resumen. Las filas y columnas de Excel empiezan en 1. Los datos son ficticios.

```python
from datetime import date, datetime
from pathlib import Path
from openpyxl import Workbook, load_workbook

wb = Workbook()
ws = wb.active
ws.title = "Ventas"
for fila in [
    ("ID", "Producto", "Region", "Unidades", "Precio", "Fecha", "Estado"),
    (101, "Laptop", "Norte", 2, 800, date(2026, 8, 1), "Completado"),
    (102, "Mouse", "Sur", 5, 20, date(2026, 8, 2), "Completado"),
    (103, "Laptop", "Norte", 1, 800, date(2026, 8, 3), "Pendiente"),
    (104, "Teclado", None, 3, 50, date(2026, 8, 4), "Completado"),
    (105, "Mouse", "Sur", 2, 20, date(2026, 8, 5), "Cancelado"),
]:
    ws.append(fila)
resumen = wb.create_sheet("Resumen")
resumen.append(["Indicador", "Valor"])
resumen.append(["Meta", 2000])
wb.save("ventas_base.xlsx")
```

| ID | Producto | Region | Unidades | Precio | Fecha | Estado |
| --- | --- | --- | ---: | ---: | --- | --- |
| 101 | Laptop | Norte | 2 | 800 | 2026-08-01 | Completado |
| 102 | Mouse | Sur | 5 | 20 | 2026-08-02 | Completado |
| 103 | Laptop | Norte | 1 | 800 | 2026-08-03 | Pendiente |
| 104 | Teclado | (None) | 3 | 50 | 2026-08-04 | Completado |
| 105 | Mouse | Sur | 2 | 20 | 2026-08-05 | Cancelado |

Los importes por fila (`Unidades × Precio`) son 1600, 100, 800, 150 y 40; el total es 2690 y el total completado es 1850. Las hojas no tienen fórmulas ni gráficos al inicio. `None` es una celda vacía. Los ejemplos de modificación que no guardan un archivo actúan en memoria; para verlos en Excel añade `wb.save("prueba.xlsx")` y abre ese archivo. Un ejemplo que define su propio `wb` usa ese libro para guardar. Las salidas visuales se describen como esperadas, no como capturas verificadas.

## Workbook y archivos

**Clave** `workbook`

### Definición

**Clave** `definicion`

**Definición** Un Workbook representa un libro de Excel en memoria. Se crea con Workbook() o se carga desde un archivo existente.

**Búsqueda** libro, workbook, crear excel, abrir xlsx

**Para recordar** Libro → hojas → celdas.

#### Crear un libro y consultar sus hojas

```python
libro = Workbook()
print(libro.sheetnames)
```

**Resultado esperado** ['Sheet'].

### Crear y guardar

**Clave** `crear-y-guardar`

**Definición** save() escribe el estado del libro en un archivo .xlsx.

**Búsqueda** crear archivo, save, exportar excel

**Para recordar** Guardar no es lo mismo que modificar en memoria.

#### Guardar un reporte nuevo

```python
libro = Workbook()
libro.active['A1'] = 'Reporte'
libro.save('reporte.xlsx')
print(Path('reporte.xlsx').exists())
```

**Resultado esperado** True; reporte.xlsx contiene Sheet!A1 = Reporte.

### load_workbook()

**Clave** `load-workbook`

**Definición** Abre un libro existente para leerlo o editarlo.

**Búsqueda** abrir archivo excel, cargar, load_workbook

**Para recordar** Carga primero y guarda con otro nombre para no perder el original.

#### Leer un producto de un archivo

```python
libro = load_workbook('ventas_base.xlsx')
print(libro['Ventas']['B2'].value)
```

**Resultado esperado** Laptop.

### Guardar cambios y cerrar

**Clave** `guardar-y-cerrar`

**Definición** save() persiste cambios y close() cierra los recursos del libro cuando corresponda.

**Búsqueda** editar archivo, cerrar workbook, guardar copia

**Para recordar** close() no sustituye save(); en modo normal apenas tiene efecto, en lectura optimizada sí importa.

#### Modificar una copia y cerrar

```python
libro = load_workbook('ventas_base.xlsx')
libro['Ventas']['B2'] = 'Monitor'
libro.save('ventas_editadas.xlsx')
libro.close()
print(load_workbook('ventas_editadas.xlsx')['Ventas']['B2'].value)
```

**Resultado esperado** Monitor; el archivo original no cambia.

### Archivos admitidos

**Clave** `formatos-admitidos`

**Definición** openpyxl trabaja con formatos OOXML de Excel: xlsx, xlsm, xltx y xltm.

**Búsqueda** xls, xlsb, formatos compatibles, extensiones

**Para recordar** No basta renombrar un archivo .xls a .xlsx.

#### Detectar un archivo XLS no admitido

```python
from openpyxl.utils.exceptions import InvalidFileException
try:
    load_workbook('antiguo.xls')
except InvalidFileException:
    print('Formato no admitido')
```

**Resultado esperado** Formato no admitido.

## Hojas de cálculo

**Clave** `worksheet`

### Definición

**Clave** `definicion`

**Definición** Una Worksheet representa una hoja dentro de un libro y permite acceder a sus celdas.

**Búsqueda** worksheet, hoja, pestaña

**Para recordar** wb es el libro; ws es una hoja.

#### Identificar las hojas del libro

```python
print(ws.title, wb.sheetnames)
```

**Resultado esperado** Ventas ['Ventas', 'Resumen'].

### active y sheetnames

**Clave** `hoja-activa`

**Definición** active devuelve la hoja activa; sheetnames devuelve los títulos en orden.

**Búsqueda** hoja activa, listar hojas

**Para recordar** La hoja activa puede cambiar; no presupongas que siempre es la de ventas.

#### Activar la hoja Resumen

```python
wb.active = 1
print(wb.active.title, wb.sheetnames)
```

**Resultado esperado** Resumen ['Ventas', 'Resumen'].

### Acceso por nombre

**Clave** `acceso-por-nombre`

**Definición** wb[nombre] selecciona una hoja concreta por su título.

**Búsqueda** seleccionar hoja, nombre de pestaña

**Para recordar** Usa el título exacto.

#### Leer la meta por nombre de hoja

```python
hoja = wb['Resumen']
print(hoja['B2'].value)
```

**Resultado esperado** 2000.

### create_sheet() y title

**Clave** `crear-y-renombrar`

**Definición** create_sheet() agrega una hoja; title permite cambiar su nombre.

**Búsqueda** agregar hoja, renombrar pestaña

**Para recordar** Puedes elegir su posición con index.

#### Crear y renombrar una pestaña

```python
hoja = wb.create_sheet('Borrador', index=0)
hoja.title = 'Reporte'
print(wb.sheetnames)
```

**Resultado esperado** ['Reporte', 'Ventas', 'Resumen'].

### remove()

**Clave** `eliminar-hoja`

**Definición** remove() elimina un objeto Worksheet del libro.

**Búsqueda** borrar hoja, del wb

**Para recordar** Conserva al menos una hoja visible para guardar.

#### Eliminar Resumen

```python
wb.remove(resumen)
print(wb.sheetnames)
```

**Resultado esperado** ['Ventas'].

### copy_worksheet()

**Clave** `copiar-hoja`

**Definición** Copia celdas y algunas propiedades de una hoja dentro del mismo libro.

**Búsqueda** duplicar pestaña, copia de hoja

**Para recordar** No copia todos los objetos (por ejemplo gráficos e imágenes); no funciona entre libros.

#### Duplicar Ventas

```python
copia = wb.copy_worksheet(ws)
copia.title = 'Copia'
print(copia['B2'].value, ws.title)
```

**Resultado esperado** Laptop Ventas.

### move_sheet()

**Clave** `reordenar-hojas`

**Definición** Mueve una hoja un número de posiciones respecto de su ubicación.

**Búsqueda** orden de pestañas, move_sheet

**Para recordar** offset negativo mueve a la izquierda.

#### Mover Resumen a la primera posición

```python
wb.move_sheet(resumen, offset=-1)
print(wb.sheetnames)
```

**Resultado esperado** ['Resumen', 'Ventas'].

### sheet_state

**Clave** `visibilidad-hoja`

**Definición** Controla si la hoja es visible, hidden o veryHidden.

**Búsqueda** ocultar hoja, veryHidden

**Para recordar** veryHidden no se muestra mediante el comando normal de desocultar en Excel; no es seguridad.

#### Ocultar Resumen

```python
resumen.sheet_state = 'hidden'
print(resumen.sheet_state)
```

**Resultado esperado** hidden; Ventas sigue visible.

## Celdas y valores

**Clave** `celdas`

### Definición

**Clave** `definicion`

**Definición** Cell representa una celda y su contenido, coordenadas, tipo y formato.

**Búsqueda** celda, Cell, valor

**Para recordar** La celda es el objeto; .value es el contenido.

#### Leer el producto de la primera venta

```python
print(ws['B2'], ws['B2'].value)
```

**Resultado esperado** Objeto Cell de Ventas!B2 y el texto Laptop.

### Notación A1 y cell()

**Clave** `acceso-a-celdas`

**Definición** Puedes seleccionar una celda por su dirección o por índices de fila y columna.

**Búsqueda** A1, ws.cell, índices

**Para recordar** Los índices de Excel son base 1.

#### Leer las unidades de dos formas

```python
print(ws['D2'].value, ws.cell(row=2, column=4).value)
```

**Resultado esperado** 2 2.

### Escribir y limpiar

**Clave** `escribir-valores`

**Definición** Asigna un valor a una dirección o a .value; None limpia el contenido.

**Búsqueda** modificar celda, borrar valor

**Para recordar** Asignar None no elimina la fila ni necesariamente el estilo.

#### Cambiar un producto y vaciar una región

```python
ws['B2'] = 'Monitor'
ws['C3'].value = None
print(ws['B2'].value, ws['C3'].value)
```

**Resultado esperado** Monitor None.

### Tipos y data_type

**Clave** `tipos-de-celdas`

**Definición** openpyxl reconoce números, cadenas, booleanos, fechas, fórmulas, errores y celdas vacías.

**Búsqueda** data_type, None, bool, fecha, fórmula

**Para recordar** Una cadena que empieza con = normalmente se interpreta como fórmula.

#### Identificar tipos de datos

```python
ws['H2'] = '=D2*E2'
ws['I2'] = True
print([ws[x].data_type for x in ['A2','B2','F2','H2','I2']])
```

**Resultado esperado** ['n', 's', 'd', 'f', 'b'].

### Coordenadas y offset()

**Clave** `coordenadas-y-offset`

**Definición** row, column y coordinate identifican la posición; offset() accede a una celda relativa.

**Búsqueda** fila columna, coordenada, celda vecina

**Para recordar** offset usa desplazamientos, no índices absolutos.

#### Obtener la posición y la región vecina

```python
c = ws['B2']
print(c.row, c.column, c.coordinate, c.offset(column=1).value)
```

**Resultado esperado** 2 2 B2 Norte.

### is_date y has_style

**Clave** `propiedades-de-celda`

**Definición** is_date reconoce valores o formatos de fecha; has_style indica si hay estilo no predeterminado.

**Búsqueda** detectar fecha, detectar estilo

**Para recordar** El formato también influye en la interpretación de fechas.

#### Comprobar fecha y estilo

```python
print(ws['F2'].is_date, ws['B2'].has_style)
```

**Resultado esperado** True False.

### Texto literal que comienza con =

**Clave** `texto-literal`

**Definición** Puedes especificar tipo texto si una cadena no debe convertirse en fórmula.

**Búsqueda** evitar fórmula, entrada literal, data_type s

**Para recordar** No conviertas entradas externas en fórmulas involuntariamente.

#### Escribir texto que comienza con igual

```python
ws['H2'] = '=entrada'
ws['H2'].data_type = 's'
print(ws['H2'].value, ws['H2'].data_type)
```

**Resultado esperado** =entrada s.

## Rangos e iteración

**Clave** `rangos`

### Definición

**Clave** `definicion`

**Definición** Un rango reúne varias celdas; iterar permite leer filas o columnas sin escribir una dirección por cada dato.

**Búsqueda** rango, iterar excel, recorrer celdas

**Para recordar** El rango rectangular A1:B2 incluye los extremos.

#### Leer el rectángulo A1:B2

```python
print([[c.value for c in fila] for fila in ws['A1:B2']])
```

**Resultado esperado** [['ID', 'Producto'], [101, 'Laptop']].

### Filas y columnas completas

**Clave** `rows-y-columns`

**Definición** rows y columns generan grupos de objetos Cell por fila o columna.

**Búsqueda** ws.rows, ws.columns

**Para recordar** En modo normal ambos son iterables; read_only no ofrece iteración por columnas.

#### Leer la cabecera y los identificadores

```python
print([c.value for c in next(ws.rows)])
print([c.value for c in next(ws.columns)])
```

**Resultado esperado** ['ID', 'Producto', 'Region', 'Unidades', 'Precio', 'Fecha', 'Estado'] y ['ID', 101, 102, 103, 104, 105].

### iter_rows()

**Clave** `iter-rows`

**Definición** Permite recorrer un rectángulo por filas con límites explícitos.

**Búsqueda** min_row, max_row, min_col, max_col

**Para recordar** min_row=2 evita la cabecera.

#### Recorrer las dos primeras ventas

```python
for fila in ws.iter_rows(min_row=2,max_row=3,min_col=1,max_col=2):
    print([c.value for c in fila])
```

**Resultado esperado** [101, 'Laptop']; [102, 'Mouse'].

### iter_cols()

**Clave** `iter-cols`

**Definición** Recorre un rectángulo por columnas en modo normal.

**Búsqueda** recorrer columnas, iter_cols

**Para recordar** El resultado externo agrupa por columna.

#### Leer unidades y precios por columna

```python
for col in ws.iter_cols(min_row=2,max_row=3,min_col=4,max_col=5,values_only=True):
    print(col)
```

**Resultado esperado**  (2, 5); (800, 20).

### values_only y values

**Clave** `solo-valores`

**Definición** values_only=True devuelve valores en lugar de objetos; ws.values recorre los valores de toda la hoja.

**Búsqueda** tuplas, obtener datos, ws.values

**Para recordar** No uses .value cuando ya recibes valores.

#### Extraer tuplas de valores

```python
print(next(ws.iter_rows(min_row=2,max_row=2,values_only=True))[:3])
print(next(ws.values)[:3])
```

**Resultado esperado** (101, 'Laptop', 'Norte'); ('ID', 'Producto', 'Region').

### Dimensiones

**Clave** `dimensiones`

**Definición** max_row, max_column, min_row, min_column y calculate_dimension() describen el rectángulo de celdas registrado.

**Búsqueda** última fila, última columna, dimensions

**Para recordar** Una celda vacía creada o formateada puede ampliar las dimensiones; no son un conteo de registros útiles.

#### Consultar los límites de Ventas

```python
print(ws.min_row, ws.max_row, ws.min_column, ws.max_column)
print(ws.dimensions, ws.calculate_dimension())
```

**Resultado esperado** 1 6 1 7; A1:G6 A1:G6.

## Escritura y edición de estructura

**Clave** `edicion`

### Definición

**Clave** `definicion`

**Definición** La hoja permite añadir registros, insertar o borrar filas y columnas y mover rangos.

**Búsqueda** editar estructura, agregar registros

**Para recordar** Inserciones y eliminaciones no reparan automáticamente todas las fórmulas, gráficos o tablas dependientes.

#### Agregar una venta

```python
ws.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Pendiente'])
print(ws['A7'].value)
```

**Resultado esperado** 106.

### append()

**Clave** `append`

**Definición** Agrega una fila a continuación de las filas registradas.

**Búsqueda** añadir fila, append

**Para recordar** Usa el orden de campos de la cabecera.

#### Añadir el pedido 106

```python
ws.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Completado'])
print(ws.max_row, ws['G7'].value)
```

**Resultado esperado** 7 Completado.

### insert_rows() y delete_rows()

**Clave** `insertar-eliminar-filas`

**Definición** Inserta filas antes de un índice o elimina una cantidad desde ese índice.

**Búsqueda** insert_rows, delete_rows, desplazar filas

**Para recordar** amount indica cuántas filas se insertan o eliminan.

#### Insertar y retirar una fila vacía

```python
ws.insert_rows(2, amount=1)
print(ws['A2'].value, ws['A3'].value)
ws.delete_rows(2, amount=1)
print(ws['A2'].value)
```

**Resultado esperado** None 101; luego 101.

### insert_cols() y delete_cols()

**Clave** `insertar-eliminar-columnas`

**Definición** Inserta o borra columnas por su índice numérico.

**Búsqueda** insert_cols, delete_cols

**Para recordar** Insertar en 2 desplaza la antigua B a C.

#### Insertar y retirar una columna vacía

```python
ws.insert_cols(2)
print(ws['B1'].value, ws['C1'].value)
ws.delete_cols(2)
print(ws['B1'].value)
```

**Resultado esperado** None Producto; luego Producto.

### move_range()

**Clave** `mover-rangos`

**Definición** Desplaza celdas y puede traducir referencias relativas de fórmulas movidas con translate=True.

**Búsqueda** move_range, mover datos, translate

**Para recordar** Sobrescribe el destino; no actualiza las referencias de otras celdas hacia el rango.

#### Mover el resumen dos filas

```python
resumen.move_range('A1:B2',rows=2,cols=0)
print(resumen['A3'].value, resumen['B4'].value)
```

**Resultado esperado** Indicador 2000.

### merge_cells() y unmerge_cells()

**Clave** `combinar-celdas`

**Definición** Combina un rectángulo en una celda visual; solo conserva el valor de la superior izquierda.

**Búsqueda** combinar celdas, descombinar

**Para recordar** Las demás celdas combinadas no son editables y sus valores previos se pierden.

#### Combinar el título de un reporte

```python
resumen['A4'] = 'Reporte mensual'
resumen.merge_cells('A4:C4')
print(resumen['A4'].value, type(resumen['B4']).__name__)
resumen.unmerge_cells('A4:C4')
print(resumen['B4'].value)
```

**Resultado esperado** Reporte mensual MergedCell; después None.

## Utilidades de coordenadas

**Clave** `coordenadas`

### Definición

**Clave** `definicion`

**Definición** openpyxl.utils ofrece conversiones entre índices numéricos y referencias de Excel.

**Búsqueda** utilidades, referencias dinámicas

**Para recordar** Estas funciones no necesitan leer un libro.

#### Convertir un índice de columna

```python
from openpyxl.utils import get_column_letter
print(get_column_letter(28))
```

**Resultado esperado** AB.

### get_column_letter() y column_index_from_string()

**Clave** `indices-y-letras`

**Definición** Convierten entre números de columna y letras.

**Búsqueda** letras de excel, número de columna

**Para recordar** A corresponde a 1; Z a 26.

#### Convertir AA y AB entre letras e índices

```python
from openpyxl.utils import get_column_letter, column_index_from_string
print(get_column_letter(27), column_index_from_string('AB'))
```

**Resultado esperado** AA 28.

### coordinate_from_string() y absolute_coordinate()

**Clave** `referencias`

**Definición** Descomponen una dirección de celda o convierten una referencia a absoluta.

**Búsqueda** coordenada A1, dólar, referencia absoluta

**Para recordar** coordinate_from_string devuelve letra y fila.

#### Descomponer y fijar C12

```python
from openpyxl.utils.cell import coordinate_from_string, absolute_coordinate
print(coordinate_from_string('C12'), absolute_coordinate('C12'))
```

**Resultado esperado** ('C', 12) $C$12.

### range_boundaries()

**Clave** `limites-de-rango`

**Definición** Devuelve los límites numéricos de un rango.

**Búsqueda** min_col min_row max_col max_row

**Para recordar** El orden es columna, fila, columna, fila.

#### Obtener los cuatro límites de B2:D6

```python
from openpyxl.utils.cell import range_boundaries
print(range_boundaries('B2:D6'))
```

**Resultado esperado** (2, 2, 4, 6).

### rows_from_range() y cols_from_range()

**Clave** `direcciones-de-rango`

**Definición** Generan direcciones agrupadas por filas o columnas sin acceder a los valores.

**Búsqueda** generar coordenadas, iterar direcciones

**Para recordar** Devuelven direcciones de texto, no objetos Cell.

#### Enumerar las direcciones de A1:B2

```python
from openpyxl.utils.cell import rows_from_range, cols_from_range
print(list(rows_from_range('A1:B2')))
print(list(cols_from_range('A1:B2')))
```

**Resultado esperado** [('A1', 'B1'), ('A2', 'B2')]; [('A1', 'A2'), ('B1', 'B2')].

### CellRange y MultiCellRange

**Clave** `objetos-rango`

**Definición** Representan rectángulos y conjuntos de rectángulos; permiten operaciones sobre referencias.

**Búsqueda** intersección, unión, desplazamiento, rangos múltiples

**Para recordar** La unión de CellRange es el rectángulo envolvente; no mueve datos.

#### Intersectar y desplazar rangos

```python
from openpyxl.worksheet.cell_range import CellRange, MultiCellRange
a = CellRange('A1:C3')
b = CellRange('B2:D4')
print(a.intersection(b), a.union(b))
a.shift(col_shift=1,row_shift=1)
print(a, 'F2' in MultiCellRange('A1:B2 F1:F3'))
```

**Resultado esperado** B2:C3 A1:D4; B2:D4 True.

## Formato de celdas

**Clave** `estilos`

### Definición

**Clave** `definicion`

**Definición** Los estilos cambian la presentación de celdas sin cambiar su valor.

**Búsqueda** formato excel, estilos, presentación

**Para recordar** Asigna objetos de estilo a cada celda; los estilos asignados se tratan como inmutables.

#### Dar formato a una cabecera

```python
from openpyxl.styles import Font
ws['A1'].font = Font(bold=True)
print(ws['A1'].font.bold, ws['A1'].value)
```

**Resultado esperado** True ID.

### Font()

**Clave** `fuente`

**Definición** Controla negrita, cursiva, tamaño, nombre y color de texto.

**Búsqueda** negrita, font, tipografía

**Para recordar** El color puede expresarse en ARGB de ocho dígitos.

#### Poner una cabecera en negrita

```python
from openpyxl.styles import Font
ws['A1'].font = Font(name='Calibri', size=12, bold=True, color='FFFFFFFF')
print(ws['A1'].font.bold, ws['A1'].font.color.rgb)
```

**Resultado esperado** True FFFFFFFF.

### PatternFill() y GradientFill()

**Clave** `rellenos`

**Definición** PatternFill aplica un relleno sólido o patrón; GradientFill aplica una transición de colores.

**Búsqueda** color de fondo, relleno, degradado

**Para recordar** Para fondo sólido especifica fill_type='solid'.

#### Crear un fondo sólido y un degradado

```python
from openpyxl.styles import PatternFill, GradientFill
ws['A1'].fill = PatternFill(fill_type='solid',fgColor='FF24527A')
ws['B1'].fill = GradientFill(stop=('FFFFFFFF','FFB7D5EB'))
print(ws['A1'].fill.fgColor.rgb, ws['B1'].fill.type)
```

**Resultado esperado** FF24527A linear.

### Border() y Side()

**Clave** `bordes`

**Definición** Border define los lados de una celda; Side define su línea y color.

**Búsqueda** bordes, líneas, separador

**Para recordar** Sin estilo de línea, un color por sí solo no dibuja el borde.

#### Dibujar un borde inferior

```python
from openpyxl.styles import Border, Side
ws['A1'].border = Border(bottom=Side(style='thin',color='FF444444'))
print(ws['A1'].border.bottom.style)
```

**Resultado esperado** thin.

### Alignment()

**Clave** `alineacion`

**Definición** Controla alineación horizontal y vertical, sangría, rotación y ajuste de texto.

**Búsqueda** centrar, wrap_text, rotar texto

**Para recordar** wrap_text permite varias líneas; puede requerir ajustar la altura.

#### Centrar y ajustar una cabecera

```python
from openpyxl.styles import Alignment
ws['A1'].alignment = Alignment(horizontal='center',vertical='center',wrap_text=True)
print(ws['A1'].alignment.horizontal, ws['A1'].alignment.wrap_text)
```

**Resultado esperado** center True.

### number_format

**Clave** `formato-numerico`

**Definición** Controla cómo se presenta un número, porcentaje, moneda o fecha.

**Búsqueda** decimales, moneda, porcentaje, formato fecha

**Para recordar** Un porcentaje almacenado como 0.25 se muestra como 25%, no multipliques por 100 antes de formatear.

#### Mostrar moneda, fecha y porcentaje

```python
ws['E2'].number_format = '"$"#,##0.00'
ws['F2'].number_format = 'yyyy-mm-dd'
ws['H2'] = 0.25
ws['H2'].number_format = '0.0%'
print(ws['E2'].value, ws['H2'].value)
```

**Resultado esperado** Valores 800 y 0.25; visualmente $800.00, 2026-08-01 y 25.0% según configuración regional.

### NamedStyle()

**Clave** `estilo-reutilizable`

**Definición** Registra un estilo con nombre y aplícalo a múltiples celdas.

**Búsqueda** estilo nombrado, plantilla de formato

**Para recordar** Cambiar el NamedStyle después de asignarlo no modifica retroactivamente las celdas.

#### Aplicar un estilo a todas las cabeceras

```python
from openpyxl.styles import NamedStyle, Font
estilo = NamedStyle(name='encabezado',font=Font(bold=True))
wb.add_named_style(estilo)
for c in ws[1]:
    c.style = 'encabezado'
print(ws['G1'].font.bold)
```

**Resultado esperado** True.

### Copiar estilos

**Clave** `copiar-estilos`

**Definición** copy() duplica un objeto de estilo para asignarlo o cambiarlo sin mutar el estilo de origen.

**Búsqueda** copy, reutilizar formato, StyleProxy

**Para recordar** Copia los componentes necesarios; no confíes en propiedades privadas.

#### Reutilizar la tipografía de una cabecera

```python
from copy import copy
from openpyxl.styles import Font
ws['A1'].font = Font(bold=True,color='FF0000FF')
ws['B1'].font = copy(ws['A1'].font)
print(ws['B1'].font.bold)
```

**Resultado esperado** True.

### Colores ARGB, tema e índice

**Clave** `colores`

**Definición** Color admite rgb, indexed y theme; tint aclara u oscurece un color de tema.

**Búsqueda** Color, rgb, theme, indexed, tint

**Para recordar** Los colores de tema dependen del libro; no garantizan un RGB fijo.

#### Comparar tres modos de especificar color

```python
from openpyxl.styles import Font, Color
ws['A1'].font = Font(color=Color(rgb='FF112233'))
ws['B1'].font = Font(color=Color(theme=1,tint=0.2))
ws['C1'].font = Font(color=Color(indexed=10))
print(ws['A1'].font.color.type, ws['B1'].font.color.type, ws['C1'].font.color.type)
```

**Resultado esperado** rgb theme indexed.

## Dimensiones y vista

**Clave** `vista`

### Definición

**Clave** `definicion`

**Definición** Las dimensiones y opciones de vista controlan cómo se presenta una hoja al abrirla.

**Búsqueda** ancho, altura, vista hoja

**Para recordar** El formato visual no cambia los valores.

#### Ajustar el ancho de Producto

```python
ws.column_dimensions['B'].width = 18
print(ws.column_dimensions['B'].width)
```

**Resultado esperado** 18.0.

### Ancho y alto

**Clave** `ancho-y-alto`

**Definición** column_dimensions y row_dimensions permiten ajustar anchos y alturas.

**Búsqueda** width, height, autoajuste

**Para recordar** openpyxl no calcula el AutoFit real de Excel; puedes aproximar el ancho a partir del texto.

#### Ajustar la columna Producto y la cabecera

```python
ws.column_dimensions['B'].width = 20
ws.row_dimensions[1].height = 28
print(ws.column_dimensions['B'].width, ws.row_dimensions[1].height)
```

**Resultado esperado** 20.0 28.0.

### Inmovilizar paneles

**Clave** `freeze-panes`

**Definición** freeze_panes deja fijas las filas superiores y columnas anteriores a una celda.

**Búsqueda** congelar encabezado, freeze_panes

**Para recordar** B2 fija la fila 1 y columna A; None desactiva.

#### Fijar la primera fila y columna

```python
ws.freeze_panes = 'B2'
print(ws.freeze_panes)
```

**Resultado esperado** B2.

### Ocultar filas y columnas

**Clave** `ocultar-filas-columnas`

**Definición** hidden controla la visibilidad sin borrar los datos.

**Búsqueda** hidden, ocultar columnas

**Para recordar** Los datos ocultos siguen en el archivo.

#### Ocultar una región y una fila

```python
ws.column_dimensions['C'].hidden = True
ws.row_dimensions[3].hidden = True
print(ws['C2'].value, ws.row_dimensions[3].hidden)
```

**Resultado esperado** Norte True.

### Agrupar filas y columnas

**Clave** `agrupar-dimensiones`

**Definición** group() crea niveles de esquema que se pueden expandir y contraer.

**Búsqueda** outline, group, agrupar filas

**Para recordar** Agrupar no resume datos; solo organiza la vista.

#### Agrupar tres filas de datos

```python
ws.row_dimensions.group(2,4,outline_level=1,hidden=True)
print(ws.row_dimensions[3].outlineLevel, ws.row_dimensions[3].hidden)
```

**Resultado esperado** 1 True.

### Cuadrícula, zoom y pestaña

**Clave** `opciones-de-vista`

**Definición** sheet_view y sheet_properties ajustan cuadrícula, zoom y color de pestaña.

**Búsqueda** showGridLines, zoomScale, tabColor

**Para recordar** Son preferencias de visualización del libro.

#### Configurar la vista inicial

```python
ws.sheet_view.showGridLines = False
ws.sheet_view.zoomScale = 90
ws.sheet_properties.tabColor = 'FF24527A'
print(ws.sheet_view.showGridLines, ws.sheet_view.zoomScale)
```

**Resultado esperado** False 90.

### Selección inicial

**Clave** `seleccion-inicial`

**Definición** La selección de la vista controla qué celda aparece activa al abrir la hoja.

**Búsqueda** activeCell, sqref, seleccionar celda

**Para recordar** La selección no modifica el contenido.

#### Seleccionar la celda D2

```python
sel = ws.sheet_view.selection[0]
sel.activeCell = 'D2'
sel.sqref = 'D2'
print(sel.activeCell)
```

**Resultado esperado** D2.

## Fórmulas de Excel

**Clave** `formulas`

### Definición

**Clave** `definicion`

**Definición** openpyxl almacena y recupera fórmulas de Excel; no implementa su motor de cálculo.

**Búsqueda** fórmula, SUM, calcular excel, signo igual

**Para recordar** Usa nombres de funciones en inglés y coma como separador de argumentos en el archivo.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Guardar el cálculo del importe

```python
ws['H2'] = '=D2*E2'
print(ws['H2'].value)
```

**Resultado esperado** =D2*E2; al recalcular en Excel el valor esperado es 1600.

### Fórmulas de agregación y condición

**Clave** `agregaciones-y-condiciones`

**Definición** SUM, AVERAGE, IF y otras funciones se escriben como cadenas de fórmula.

**Búsqueda** SUM, IF, AVERAGE, fórmula excel

**Para recordar** Se guardan las expresiones, no sus resultados calculados.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Calcular unidades totales y una categoría

```python
resumen['B3'] = '=SUM(Ventas!D2:D6)'
resumen['B4'] = '=IF(B3>10,"Alto","Bajo")'
print(resumen['B3'].value, resumen['B4'].value)
```

**Resultado esperado** Fórmulas almacenadas; Excel calcularía 13 y Alto.

### Referencias relativas, absolutas y mixtas

**Clave** `referencias-de-formulas`

**Definición** Las referencias relativas cambian al copiar fórmulas; el signo $ fija fila, columna o ambas.

**Búsqueda** A1, $A$1, $A1, A$1

**Para recordar** $ fija la parte que sigue; una fórmula asignada manualmente no se traduce sola.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Fijar la referencia a la meta

```python
ws['H2'] = '=D2*E2'
ws['I2'] = '=H2/Resumen!$B$2'
print(ws['I2'].value)
```

**Resultado esperado** =H2/Resumen!$B$2; valor calculado esperado 0.8. H2 cambia al copiar la fórmula por filas, pero la referencia $B$2 permanece fija.

### Referencias entre hojas

**Clave** `referencias-entre-hojas`

**Definición** Una fórmula puede referirse a una celda de otra hoja usando Hoja!Celda.

**Búsqueda** referencia otra pestaña, quote_sheetname

**Para recordar** Los nombres de hoja con espacios necesitan comillas simples.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Referenciar una hoja con espacios

```python
from openpyxl.utils.cell import quote_sheetname
resumen.title = 'Resumen mensual'
ws['H2'] = f'={quote_sheetname(resumen.title)}!B2'
print(ws['H2'].value)
```

**Resultado esperado** ='Resumen mensual'!B2; Excel calcularía 2000.

### data_only

**Clave** `data-only`

**Definición** load_workbook(data_only=True) devuelve el resultado almacenado por una aplicación de cálculo, si existe.

**Búsqueda** leer valor calculado, caché, data_only

**Para recordar** No calcula fórmulas; guardar un libro cargado con data_only puede perder las fórmulas originales.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Comparar fórmula con caché vacía

```python
ws['H2'] = '=D2*E2'
wb.save('formulas.xlsx')
print(load_workbook('formulas.xlsx',data_only=False)['Ventas']['H2'].value)
print(load_workbook('formulas.xlsx',data_only=True)['Ventas']['H2'].value)
```

**Resultado esperado** =D2*E2; None porque todavía no hay resultado almacenado.

### Translator()

**Clave** `traducir-formulas`

**Definición** Desplaza referencias relativas desde una celda de origen a otra de destino.

**Búsqueda** copiar fórmula, Translator

**Para recordar** No actualiza todas las dependencias ni traduce nombres definidos.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Trasladar una fórmula una fila

```python
from openpyxl.formula.translate import Translator
print(Translator('=D2*$E$2',origin='H2').translate_formula('H3'))
```

**Resultado esperado** =D3*$E$2.

### Tokenizer

**Clave** `tokenizar-formulas`

**Definición** Divide una expresión en tokens para inspeccionar sus componentes.

**Búsqueda** analizar fórmula, Tokenizer

**Para recordar** Analizar sintaxis no equivale a calcular el resultado.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Inspeccionar los tokens de una expresión

```python
from openpyxl.formula import Tokenizer
print([t.value for t in Tokenizer('=D2*E2').items])
```

**Resultado esperado** ['D2', '*', 'E2'].

### CalcProperties

**Clave** `recalculo`

**Definición** Las propiedades de cálculo solicitan cómo debe recalcular el libro una aplicación compatible.

**Búsqueda** calcMode, fullCalcOnLoad, forceFullCalc

**Para recordar** Solicitar recálculo no crea una caché desde Python.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Solicitar recálculo al abrir

```python
from openpyxl.workbook.properties import CalcProperties
wb.calculation = CalcProperties(calcMode='auto',fullCalcOnLoad=True,forceFullCalc=True)
print(wb.calculation.calcMode, wb.calculation.fullCalcOnLoad)
```

**Resultado esperado** auto True; Excel recibe la solicitud de recálculo.

### ArrayFormula y DataTableFormula

**Clave** `formulas-especiales`

**Definición** Representan fórmulas matriciales y tablas de hipótesis de Excel.

**Búsqueda** ArrayFormula, DataTableFormula, fórmula matriz

**Para recordar** Son formatos especiales; no son tablas de Excel ni DataFrames, y no se calculan con openpyxl.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Representar fórmulas especiales

```python
from openpyxl.worksheet.formula import ArrayFormula, DataTableFormula
ws['H2'] = ArrayFormula('H2:H6','=D2:D6*E2:E6')
print(ws.array_formulae)
print(DataTableFormula(ref='J2:K4',r1='B2').ref)
```

**Resultado esperado** {'H2': 'H2:H6'}; J2:K4. La tabla de hipótesis solo se ha construido como objeto, no como modelo funcional.

## Rangos con nombre

**Clave** `nombres-definidos`

### Definición

**Clave** `definicion`

**Definición** Los nombres definidos asignan un identificador a una referencia, fórmula o constante del libro.

**Búsqueda** named range, DefinedName, rango con nombre

**Para recordar** En openpyxl 3.1 se usa defined_names.add().

#### Nombrar la meta de ventas

```python
from openpyxl.workbook.defined_name import DefinedName
wb.defined_names.add(DefinedName('Meta',attr_text="'Resumen'!$B$2"))
print(list(wb.defined_names['Meta'].destinations))
```

**Resultado esperado** [('Resumen', '$B$2')].

### Crear y usar nombres

**Clave** `crear-nombres`

**Definición** Un nombre global puede utilizarse desde las fórmulas de distintas hojas.

**Búsqueda** crear rango nombrado, fórmula con nombre

**Para recordar** Usa referencias absolutas y el título de hoja correcto.

#### Referenciar la meta mediante un nombre

```python
from openpyxl.workbook.defined_name import DefinedName
wb.defined_names.add(DefinedName('Meta',attr_text="'Resumen'!$B$2"))
ws['H2'] = '=D2*E2/Meta'
print(ws['H2'].value)
```

**Resultado esperado** =D2*E2/Meta; resultado calculado esperado 0.8.

### Nombres locales y destinos

**Clave** `nombres-locales`

**Definición** Un nombre local pertenece a una hoja; destinations permite obtener sus referencias estáticas.

**Búsqueda** scope, local, destinations

**Para recordar** Los nombres dinámicos pueden no ser resolubles por openpyxl.

#### Crear un nombre local en Ventas

```python
from openpyxl.workbook.defined_name import DefinedName
ws.defined_names.add(DefinedName('PrimeraVenta',attr_text="'Ventas'!$A$2"))
print(list(ws.defined_names['PrimeraVenta'].destinations))
```

**Resultado esperado** [('Ventas', '$A$2')].

### Eliminar un nombre

**Clave** `eliminar-nombres`

**Definición** Los contenedores de nombres permiten eliminar un identificador por su clave.

**Búsqueda** borrar named range, del defined_names

**Para recordar** Eliminarlo no repara las fórmulas que lo utilizan.

#### Eliminar el nombre Meta

```python
from openpyxl.workbook.defined_name import DefinedName
wb.defined_names.add(DefinedName('Meta',attr_text="'Resumen'!$B$2"))
del wb.defined_names['Meta']
print('Meta' in wb.defined_names)
```

**Resultado esperado** False.

## Limpieza y análisis con Python

**Clave** `limpieza-y-analisis`

### Definición

**Clave** `definicion`

**Definición** openpyxl entrega valores de Excel; las transformaciones y cálculos se realizan con Python o una biblioteca de análisis.

**Búsqueda** limpiar excel, procesar filas, ETL

**Para recordar** values_only=True facilita trabajar con tuplas.

#### Extraer los registros de ventas

```python
filas = list(ws.iter_rows(min_row=2,values_only=True))
print(len(filas), filas[0][:3])
```

**Resultado esperado** 5 (101, 'Laptop', 'Norte').

### Detectar y reemplazar vacíos

**Clave** `valores-faltantes`

**Definición** Comprueba None para localizar celdas vacías y aplica un valor alternativo si corresponde.

**Búsqueda** None, faltantes, vacíos

**Para recordar** No uses if not valor si 0 o False son datos válidos.

#### Rellenar una región faltante

```python
for (c,) in ws.iter_rows(min_row=2,min_col=3,max_col=3):
    if c.value is None:
        c.value = 'Sin region'
print(ws['C5'].value)
```

**Resultado esperado** Sin region.

### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Cuenta repeticiones de una clave con Counter o registra claves vistas con un set.

**Búsqueda** duplicados, Counter, clave de negocio

**Para recordar** Un producto repetido no implica una venta duplicada; define qué campo identifica el registro.

#### Encontrar un identificador repetido

```python
from collections import Counter
ws.append([101,'Laptop','Norte',2,800,date(2026,8,1),'Completado'])
conteo = Counter(r[0] for r in ws.iter_rows(min_row=2,values_only=True))
print([k for k,n in conteo.items() if n>1])
```

**Resultado esperado** [101].

### Eliminar duplicados

**Clave** `eliminar-duplicados`

**Definición** Reconstruye una hoja con una sola fila por clave, conservando la primera o la última según una regla explícita.

**Búsqueda** deduplicar, set, reconstruir hoja

**Para recordar** No elimines duplicados sin decidir qué versión conservar.

#### Conservar la primera venta por ID

```python
ws.append([101,'Laptop','Norte',2,800,date(2026,8,1),'Completado'])
limpia = wb.create_sheet('Limpia')
limpia.append(next(ws.values))
vistos = set()
for r in ws.iter_rows(min_row=2,values_only=True):
    if r[0] not in vistos:
        limpia.append(r)
        vistos.add(r[0])
print(limpia.max_row)
```

**Resultado esperado** 6 (cabecera y cinco registros).

### Limpiar texto y reemplazar

**Clave** `limpiar-texto`

**Definición** Usa métodos de str para quitar espacios, normalizar mayúsculas o reemplazar fragmentos.

**Búsqueda** strip, lower, upper, replace, buscar

**Para recordar** Comprueba el tipo antes de ejecutar métodos de texto.

#### Normalizar un producto

```python
ws['B2'] = '  LAPTOP  '
ws['B2'] = ws['B2'].value.strip().lower()
print(ws['B2'].value)
```

**Resultado esperado** laptop.

### Convertir tipos

**Clave** `convertir-tipos`

**Definición** int, float y str convierten valores si su contenido es compatible.

**Búsqueda** convertir texto a número, int, float

**Para recordar** Valida entradas; una conversión inválida puede producir ValueError.

#### Convertir unidades de texto a entero

```python
ws['D2'] = '2'
ws['D2'] = int(ws['D2'].value)
print(ws['D2'].value, ws['D2'].data_type)
```

**Resultado esperado** 2 n.

### Filtrar y ordenar datos reales

**Clave** `filtrar-y-ordenar`

**Definición** Usa condiciones y sorted() para seleccionar y ordenar registros en Python.

**Búsqueda** filtro real, sorted, lambda, ordenar

**Para recordar** Esto modifica la lista, no configura el autofiltro de Excel.

#### Ordenar ventas completadas por importe

```python
filas = [r for r in ws.iter_rows(min_row=2,values_only=True) if r[6]=='Completado']
filas = sorted(filas,key=lambda r:r[3]*r[4],reverse=True)
print([r[0] for r in filas])
```

**Resultado esperado** [101, 104, 102].

### Agregaciones

**Clave** `agregaciones`

**Definición** Calcula métricas con sum, len, min, max y operaciones aritméticas.

**Búsqueda** total, promedio, min, max, conteo

**Para recordar** Excluye faltantes según la regla de negocio; no supongas que son cero.

#### Calcular total, promedio y extremos

```python
importes = [r[3]*r[4] for r in ws.iter_rows(min_row=2,values_only=True)]
print(sum(importes),sum(importes)/len(importes),min(importes),max(importes))
```

**Resultado esperado** 2690 538.0 40 1600.

### Agrupar registros

**Clave** `agrupaciones`

**Definición** Un diccionario o defaultdict acumula métricas por categoría.

**Búsqueda** agrupar por producto, defaultdict, group by

**Para recordar** Usa como clave el campo por el que quieres resumir.

#### Sumar importes por producto

```python
from collections import defaultdict
totales = defaultdict(int)
for r in ws.iter_rows(min_row=2,values_only=True):
    totales[r[1]] += r[3]*r[4]
print(dict(totales))
```

**Resultado esperado** {'Laptop': 2400, 'Mouse': 140, 'Teclado': 150}.

## Fechas y horas

**Clave** `fechas`

### Definición

**Clave** `definicion`

**Definición** Excel representa fechas y horas con valores seriales o formatos ISO; openpyxl los convierte a objetos de datetime cuando corresponde.

**Búsqueda** fecha excel, datetime, serial

**Para recordar** Excel no admite zonas horarias en sus fechas nativas.

#### Inspeccionar una fecha de venta

```python
print(ws['F2'].value, ws['F2'].is_date)
```

**Resultado esperado** 2026-08-01 True.

### Leer y escribir fechas

**Clave** `leer-escribir-fechas`

**Definición** Asigna date o datetime y utiliza number_format para controlar su presentación.

**Búsqueda** fecha, datetime, formato fecha

**Para recordar** Al recargar una fecha, puede recibirse datetime a medianoche.

#### Guardar una fecha con hora

```python
ws['H2'] = datetime(2026,8,1,14,30)
ws['H2'].number_format = 'yyyy-mm-dd hh:mm'
print(ws['H2'].value)
```

**Resultado esperado** 2026-08-01 14:30:00.

### Parsear y calcular diferencias

**Clave** `calculos-de-fechas`

**Definición** Convierte texto a fecha y usa timedelta para calcular intervalos.

**Búsqueda** strptime, diferencia días, fecha de corte

**Para recordar** Normaliza los tipos antes de restarlos.

#### Medir días hasta el corte

```python
corte = datetime.strptime('2026-08-10','%Y-%m-%d').date()
print((corte-ws['F2'].value).days)
```

**Resultado esperado** 9.

### Calendarios 1900 y 1904

**Clave** `calendarios`

**Definición** wb.epoch indica el sistema de fechas; las utilidades to_excel y from_excel convierten seriales.

**Búsqueda** epoch, serial, WINDOWS_EPOCH, MAC_EPOCH

**Para recordar** Un mismo serial significa otra fecha según el calendario; Excel conserva una anomalía histórica de 1900.

#### Comparar seriales de ambos calendarios

```python
from openpyxl.utils.datetime import to_excel, WINDOWS_EPOCH, MAC_EPOCH
f = date(2026,8,1)
print(to_excel(f,WINDOWS_EPOCH)-to_excel(f,MAC_EPOCH))
```

**Resultado esperado** 1462.0.

### ISO 8601

**Clave** `fechas-iso`

**Definición** iso_dates=True solicita guardar las fechas compatibles como texto ISO en el XML.

**Búsqueda** iso_dates, formato interno de fechas

**Para recordar** El formato visual sigue controlado por number_format.

#### Guardar fechas en ISO

```python
wb.iso_dates = True
wb.save('fechas_iso.xlsx')
print(load_workbook('fechas_iso.xlsx')['Ventas']['F2'].value)
```

**Resultado esperado** 2026-08-01.

## Tablas de Excel

**Clave** `tablas`

### Definición

**Clave** `definicion`

**Definición** Una Table convierte un rango rectangular con cabeceras de texto en una tabla estructurada de Excel.

**Búsqueda** tabla excel, Table, add_table

**Para recordar** El nombre debe ser único en el libro; no confundir con una tabla dinámica.

#### Convertir las ventas en una tabla

```python
from openpyxl.worksheet.table import Table
ws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))
print(list(ws.tables))
```

**Resultado esperado** ['TablaVentas'].

### Table y TableStyleInfo

**Clave** `crear-tabla-con-estilo`

**Definición** TableStyleInfo permite elegir un estilo de tabla y activar bandas de filas o columnas.

**Búsqueda** TableStyleInfo, estilo tabla, bandas

**Para recordar** La cabecera del rango debe contener texto.

#### Crear una tabla con filas alternadas

```python
from openpyxl.worksheet.table import Table, TableStyleInfo
t = Table(displayName='TablaVentas',ref='A1:G6')
t.tableStyleInfo = TableStyleInfo(name='TableStyleMedium2',showRowStripes=True)
ws.add_table(t)
print(t.ref,t.tableStyleInfo.showRowStripes)
```

**Resultado esperado** A1:G6 True; Excel muestra filas alternadas.

### Consultar y eliminar tablas

**Clave** `consultar-eliminar-tablas`

**Definición** ws.tables permite buscar tablas por nombre y eliminarlas sin borrar sus celdas.

**Búsqueda** listar tablas, borrar tabla

**Para recordar** Quitar una tabla no borra los datos de su rango.

#### Quitar la tabla sin perder datos

```python
from openpyxl.worksheet.table import Table
ws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))
print(ws.tables['TablaVentas'].ref)
del ws.tables['TablaVentas']
print(ws['A2'].value)
```

**Resultado esperado** A1:G6; 101.

### Redimensionar una tabla

**Clave** `redimensionar-tabla`

**Definición** ref define el área de una tabla; al añadir registros, actualízala y sincroniza su autofiltro si existe.

**Búsqueda** ampliar tabla, ref, actualizar rango

**Para recordar** Si cambian columnas, cabeceras o totales, también revisa sus metadatos.

#### Ampliar la tabla a una nueva venta

```python
from openpyxl.worksheet.table import Table
ws.add_table(Table(displayName='TablaVentas',ref='A1:G6'))
wb.save('tabla.xlsx')
libro = load_workbook('tabla.xlsx')
hoja = libro['Ventas']
hoja.append([106,'Monitor','Norte',1,300,date(2026,8,6),'Pendiente'])
t = hoja.tables['TablaVentas']
t.ref = 'A1:G7'
t.autoFilter.ref = t.ref
print(t.ref,t.autoFilter.ref)
```

**Resultado esperado** A1:G7 A1:G7.

## Autofiltros y criterios de ordenación

**Clave** `autofiltros`

### Definición

**Clave** `definicion`

**Definición** auto_filter configura filtros y ordenaciones que puede aplicar Excel al abrir o interactuar con la hoja.

**Búsqueda** autofiltro, filtros excel

**Para recordar** openpyxl guarda instrucciones; no elimina ni ordena físicamente las filas al configurarlas.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Habilitar filtros en Ventas

```python
ws.auto_filter.ref = 'A1:G6'
print(ws.auto_filter.ref)
```

**Resultado esperado** A1:G6; aparecen controles de filtro al abrir en Excel.

### add_filter_column()

**Clave** `filtrar-por-valores`

**Definición** Define los valores aceptados en una columna relativa al rango filtrado.

**Búsqueda** add_filter_column, filtro región

**Para recordar** El índice col_id empieza en 0 dentro del rango, no en 1.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Configurar regiones admitidas

```python
ws.auto_filter.ref = 'A1:G6'
ws.auto_filter.add_filter_column(2,['Norte','Sur'])
print(ws.auto_filter.filterColumn[0].colId,ws.max_row)
```

**Resultado esperado** 2 6; los datos siguen presentes.

### add_sort_condition()

**Clave** `criterio-de-orden`

**Definición** Configura un criterio de ordenación sobre un rango.

**Búsqueda** ordenar por precio, add_sort_condition

**Para recordar** No reordena físicamente los datos desde Python.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Configurar orden descendente por precio

```python
ws.auto_filter.ref = 'A1:G6'
ws.auto_filter.add_sort_condition('E2:E6',descending=True)
print(ws.auto_filter.sortState.sortCondition[0].descending)
```

**Resultado esperado** True; los valores en la hoja conservan su posición inicial hasta que se aplique el orden.

### Filtros numéricos personalizados

**Clave** `filtros-numericos`

**Definición** CustomFilter y NumberFilter expresan comparaciones como mayor que o menor que.

**Búsqueda** CustomFilter, NumberFilter, greaterThan

**Para recordar** Los filtros avanzados se colocan dentro de FilterColumn.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Seleccionar precios superiores a 100

```python
from openpyxl.worksheet.filters import FilterColumn, CustomFilters, NumberFilter
ws.auto_filter.ref = 'A1:G6'
f = NumberFilter(operator='greaterThan',val=100)
ws.auto_filter.filterColumn.append(FilterColumn(colId=4,customFilters=CustomFilters(customFilter=[f])))
print(ws.auto_filter.filterColumn[0].customFilters.customFilter[0].operator)
```

**Resultado esperado** greaterThan; se configura Precio > 100.

### Filtros de texto y fechas

**Clave** `filtros-texto-fecha`

**Definición** StringFilter permite patrones de texto y DateGroupItem permite agrupar fechas por componentes.

**Búsqueda** StringFilter, DateGroupItem, filtro mes

**Para recordar** Los índices son relativos al rango; los filtros de texto pueden usar comodines.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Configurar filtros de producto y mes

```python
from openpyxl.worksheet.filters import FilterColumn, CustomFilters, StringFilter, Filters, DateGroupItem
ws.auto_filter.ref = 'A1:G6'
f = StringFilter(operator='contains',val='Mouse')
ws.auto_filter.filterColumn.append(FilterColumn(colId=1,customFilters=CustomFilters(customFilter=[f])))
d = DateGroupItem(year=2026,month=8,dateTimeGrouping='month')
ws.auto_filter.filterColumn.append(FilterColumn(colId=5,filters=Filters(dateGroupItem=[d])))
print([f.colId for f in ws.auto_filter.filterColumn])
```

**Resultado esperado** [1, 5]; criterios sobre Producto y Fecha.

## Formato condicional

**Clave** `formato-condicional`

### Definición

**Clave** `definicion`

**Definición** El formato condicional aplica estilos visuales en Excel si se cumple una regla.

**Búsqueda** conditional_formatting, destacar valores

**Para recordar** openpyxl almacena la regla; no evalúa el color final de cada celda.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Resaltar precios mayores de 100

```python
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import PatternFill
ws.conditional_formatting.add('E2:E6',CellIsRule(operator='greaterThan',formula=['100'],fill=PatternFill('solid',fgColor='FFFFD966')))
print(len(ws.conditional_formatting))
```

**Resultado esperado** 1 rango con regla; E2 y E4 se resaltarían en Excel.

### CellIsRule()

**Clave** `comparar-celdas`

**Definición** Aplica una regla basada en una comparación con el valor de cada celda.

**Búsqueda** mayor que, menor que, CellIsRule

**Para recordar** formula recibe una lista de expresiones como texto.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Destacar unidades desde 3

```python
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Font
ws.conditional_formatting.add('D2:D6',CellIsRule(operator='greaterThanOrEqual',formula=['3'],font=Font(bold=True)))
```

**Resultado esperado** D3 y D5 se mostrarían en negrita.

### FormulaRule()

**Clave** `regla-con-formula`

**Definición** Evalúa una fórmula relativa a la primera celda del rango para decidir el formato.

**Búsqueda** resaltar fila, FormulaRule, referencia mixta

**Para recordar** Fija la columna con $ cuando la regla se aplica a toda la fila.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Resaltar pedidos cancelados

```python
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import PatternFill
ws.conditional_formatting.add('A2:G6',FormulaRule(formula=['$G2="Cancelado"'],fill=PatternFill('solid',fgColor='FFFFC7CE')))
```

**Resultado esperado** La fila 6 se resaltaría.

### Duplicados

**Clave** `resaltar-duplicados`

**Definición** Una regla duplicateValues marca celdas con valores repetidos.

**Búsqueda** duplicados excel, DifferentialStyle

**Para recordar** Resaltar no elimina datos.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Marcar productos repetidos

```python
from openpyxl.formatting.rule import Rule
from openpyxl.styles import PatternFill
from openpyxl.styles.differential import DifferentialStyle
regla = Rule(type='duplicateValues',dxf=DifferentialStyle(fill=PatternFill('solid',fgColor='FFFFD966')))
ws.conditional_formatting.add('B2:B6',regla)
```

**Resultado esperado** Laptop y Mouse se resaltarían; Teclado no.

### ColorScaleRule()

**Clave** `escalas-de-color`

**Definición** Asigna colores según la posición de cada valor en una escala.

**Búsqueda** escala de color, mínimo máximo

**Para recordar** No cambia los números almacenados.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Asignar colores a los precios

```python
from openpyxl.formatting.rule import ColorScaleRule
ws.conditional_formatting.add('E2:E6',ColorScaleRule(start_type='min',start_color='FFF8696B',end_type='max',end_color='FF63BE7B'))
```

**Resultado esperado** Los precios de 20 y 800 recibirían los colores de los extremos.

### DataBarRule()

**Clave** `barras-de-datos`

**Definición** Representa magnitudes mediante barras dentro de las celdas.

**Búsqueda** data bars, barras de datos

**Para recordar** Las barras se dibujan al visualizar el archivo.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Comparar unidades con barras

```python
from openpyxl.formatting.rule import DataBarRule
ws.conditional_formatting.add('D2:D6',DataBarRule(start_type='min',end_type='max',color='FF638EC6'))
```

**Resultado esperado** La barra de 5 unidades sería la más larga.

### IconSetRule()

**Clave** `conjuntos-de-iconos`

**Definición** Asigna iconos según umbrales de valor o porcentaje.

**Búsqueda** semáforos, iconos, IconSetRule

**Para recordar** Los umbrales tienen el significado de type; percent no es percentile.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Clasificar unidades mediante iconos

```python
from openpyxl.formatting.rule import IconSetRule
ws.conditional_formatting.add('D2:D6',IconSetRule('3TrafficLights1','num',[0,2,4]))
```

**Resultado esperado** Los iconos separarían los valores inferiores a 2, de 2 a menos de 4 y desde 4.

## Validación de datos

**Clave** `validacion`

### Definición

**Clave** `definicion`

**Definición** DataValidation define restricciones para valores introducidos por usuarios en Excel.

**Búsqueda** validación, restringir celdas, DataValidation

**Para recordar** openpyxl no valida automáticamente los valores escritos por Python.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Restringir unidades a enteros positivos

```python
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type='whole',operator='greaterThan',formula1=0)
ws.add_data_validation(dv)
dv.add('D2:D100')
print(str(dv.sqref))
```

**Resultado esperado** D2:D100; queda registrada la restricción.

### Lista desplegable

**Clave** `lista-desplegable`

**Definición** type='list' limita la entrada a una lista literal o a un rango.

**Búsqueda** dropdown, lista, opciones

**Para recordar** Para mostrar la flecha no establezcas showDropDown=True, pues Excel lo interpreta como ocultarla.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Crear opciones de estado

```python
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type='list',formula1='"Completado,Pendiente,Cancelado"',allow_blank=False)
dv.showErrorMessage = True
ws.add_data_validation(dv)
dv.add('G2:G100')
```

**Resultado esperado** Excel mostraría las tres opciones y podría rechazar otras entradas.

### Enteros y decimales

**Clave** `validar-numeros`

**Definición** whole y decimal restringen números a rangos o comparaciones.

**Búsqueda** validar unidades, precio, between

**Para recordar** Usa showErrorMessage para presentar el error de validación en Excel.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Limitar unidades y precios

```python
from openpyxl.worksheet.datavalidation import DataValidation
for tipo,rango in [('whole','D2:D100'),('decimal','E2:E100')]:
    dv = DataValidation(type=tipo,operator='between',formula1=1,formula2=10000,showErrorMessage=True)
    ws.add_data_validation(dv)
    dv.add(rango)
```

**Resultado esperado** Unidades enteras y precios decimales entre 1 y 10000.

### Fechas y longitud de texto

**Clave** `validar-fechas-texto`

**Definición** date y textLength permiten limitar fechas o la cantidad de caracteres.

**Búsqueda** fecha válida, longitud máxima

**Para recordar** Las fechas de una fórmula pueden expresarse mediante DATE().

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Restringir fechas y longitud del producto

```python
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type='date',operator='between',formula1='DATE(2026,1,1)',formula2='DATE(2026,12,31)')
ws.add_data_validation(dv)
dv.add('F2:F100')
t = DataValidation(type='textLength',operator='lessThanOrEqual',formula1=30)
ws.add_data_validation(t)
t.add('B2:B100')
```

**Resultado esperado** Fecha dentro de 2026 y producto de hasta 30 caracteres; reglas guardadas.

### Validación personalizada

**Clave** `validacion-personalizada`

**Definición** type='custom' utiliza una fórmula que debe evaluarse como verdadera.

**Búsqueda** validar identificador único, custom, COUNTIF

**Para recordar** La referencia relativa se interpreta a partir de la primera celda del rango.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Exigir identificadores únicos

```python
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type='custom',formula1='COUNTIF($A$2:$A$100,A2)=1',showErrorMessage=True)
ws.add_data_validation(dv)
dv.add('A2:A100')
```

**Resultado esperado** Excel comprobaría que cada ID introducido aparece una sola vez.

### Mensajes de entrada y error

**Clave** `mensajes-validacion`

**Definición** prompt, error, promptTitle y errorTitle personalizan el mensaje mostrado al usuario.

**Búsqueda** error, errorTitle, prompt, stop

**Para recordar** Una regla sin rango asignado no se conserva al guardar.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Mostrar mensajes de ayuda y error

```python
from openpyxl.worksheet.datavalidation import DataValidation
dv = DataValidation(type='whole',operator='greaterThan',formula1=0,showErrorMessage=True,showInputMessage=True,errorStyle='stop')
dv.errorTitle = 'Unidades invalidas'
dv.error = 'Introduce un entero positivo.'
dv.promptTitle = 'Unidades'
dv.prompt = 'Mayor que cero'
ws.add_data_validation(dv)
dv.add('D2:D100')
```

**Resultado esperado** Excel mostraría una ayuda al seleccionar y un error de tipo stop ante entradas inválidas.

## Gráficos: datos y series

**Clave** `graficos`

### Definición

**Clave** `definicion`

**Definición** Un gráfico nativo de Excel se construye con un objeto Chart y referencias a los datos de una hoja.

**Búsqueda** chart, Reference, add_chart

**Para recordar** openpyxl guarda gráficos editables; no los renderiza como imágenes.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Graficar las unidades

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
ws.add_chart(graf,'I2')
```

**Resultado esperado** Un gráfico con una serie Unidades, anclado en I2.

### Reference()

**Clave** `referencia-de-datos`

**Definición** Reference define una región de datos usada en series o categorías.

**Búsqueda** Reference, min_col, max_row

**Para recordar** Incluye la cabecera solo cuando titles_from_data=True la va a consumir.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Referenciar las unidades sin cabecera

```python
from openpyxl.chart import Reference
r = Reference(ws,min_col=4,min_row=2,max_row=6)
print(str(r))
```

**Resultado esperado** 'Ventas'!$D$2:$D$6.

### Series y categorías

**Clave** `series-y-categorias`

**Definición** add_data incorpora series y set_categories asigna etiquetas a los puntos.

**Búsqueda** add_data, set_categories, Series

**Para recordar** Las categorías deben corresponder con las observaciones de cada serie.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Crear una serie y sus categorías

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.set_categories(Reference(ws,min_col=1,min_row=2,max_row=6))
ws.add_chart(graf,'I2')
print(len(graf.series))
```

**Resultado esperado** 1; las categorías son los IDs 101 a 105.

### Títulos, ejes y leyenda

**Clave** `titulos-y-ejes`

**Definición** Personaliza el título del gráfico, los títulos de ejes y la ubicación de la leyenda.

**Búsqueda** title, x_axis, y_axis, legend

**Para recordar** No todos los tipos de gráfico tienen ambos ejes.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Identificar ejes y ocultar leyenda

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.title = 'Unidades por venta'
graf.x_axis.title = 'Venta'
graf.y_axis.title = 'Unidades'
graf.legend = None
ws.add_chart(graf,'I2')
```

**Resultado esperado** Gráfico con título, ejes identificados y sin leyenda.

### Anclaje, tamaño y estilos

**Clave** `anclaje-y-tamano`

**Definición** add_chart coloca el gráfico en una celda; width y height especifican su tamaño en centímetros.

**Búsqueda** add_chart, width, height, style

**Para recordar** El gráfico se superpone a la cuadrícula, no ocupa celdas como un valor.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Ajustar tamaño y posición

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.width = 18
graf.height = 9
graf.style = 10
ws.add_chart(graf,'I2')
```

**Resultado esperado** Gráfico de 18 × 9 cm anclado en I2 con estilo 10.

### Etiquetas de datos

**Clave** `etiquetas-de-datos`

**Definición** DataLabelList permite mostrar valores o etiquetas de puntos.

**Búsqueda** DataLabelList, showVal, etiquetas

**Para recordar** La disponibilidad de etiquetas depende del tipo de gráfico y de Excel.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Mostrar valores sobre las barras

```python
from openpyxl.chart import BarChart, Reference
from openpyxl.chart.label import DataLabelList
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.dLbls = DataLabelList(showVal=True)
ws.add_chart(graf,'I2')
```

**Resultado esperado** Las barras mostrarían 2, 5, 1, 3 y 2.

## Tipos de gráficos

**Clave** `tipos-de-graficos`

### Definición

**Clave** `definicion`

**Definición** Selecciona la clase de gráfico según la pregunta: comparar categorías, mostrar evolución, proporciones o relaciones.

**Búsqueda** BarChart, LineChart, PieChart, ScatterChart

**Para recordar** La clase determina las opciones de series, ejes y presentación.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Representar las unidades con líneas

```python
from openpyxl.chart import LineChart, Reference
graf = LineChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
ws.add_chart(graf,'I2')
```

**Resultado esperado** Gráfico de líneas de unidades.

### BarChart()

**Clave** `barras`

**Definición** Compara magnitudes por categorías mediante columnas o barras horizontales.

**Búsqueda** barras, columnas, bar, col

**Para recordar** type='bar' horizontal; type='col' vertical.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Comparar unidades con barras horizontales

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.type = 'bar'
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.set_categories(Reference(ws,min_col=1,min_row=2,max_row=6))
ws.add_chart(graf,'I2')
```

**Resultado esperado** Cinco barras horizontales de 2, 5, 1, 3 y 2 unidades.

### LineChart() y AreaChart()

**Clave** `lineas-y-areas`

**Definición** LineChart muestra evolución; AreaChart rellena el área bajo una serie.

**Búsqueda** línea, área, tendencia

**Para recordar** Ordena los datos cronológicamente y usa fechas reales cuando corresponda.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Mostrar la evolución de unidades

```python
from openpyxl.chart import LineChart, AreaChart, Reference
for clase,ancla in [(LineChart,'I2'),(AreaChart,'I18')]:
    graf = clase()
    graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
    graf.set_categories(Reference(ws,min_col=6,min_row=2,max_row=6))
    ws.add_chart(graf,ancla)
```

**Resultado esperado** Dos gráficos de evolución de unidades entre el 1 y el 5 de agosto.

### PieChart() y DoughnutChart()

**Clave** `pastel-y-dona`

**Definición** Muestran partes de un total, preferentemente con pocas categorías y datos positivos.

**Búsqueda** pie, dona, distribución porcentual

**Para recordar** Agrega categorías repetidas antes de graficar.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Mostrar la participación de cada producto

```python
from openpyxl.chart import PieChart, DoughnutChart, Reference
resumen.append(['Laptop',3])
resumen.append(['Mouse',7])
resumen.append(['Teclado',3])
for clase,ancla in [(PieChart,'D2'),(DoughnutChart,'D18')]:
    graf = clase()
    graf.add_data(Reference(resumen,min_col=2,min_row=3,max_row=5))
    graf.set_categories(Reference(resumen,min_col=1,min_row=3,max_row=5))
    resumen.add_chart(graf,ancla)
```

**Resultado esperado** Dos gráficos de la distribución 3, 7 y 3 unidades por producto.

### ScatterChart()

**Clave** `dispersion`

**Definición** Representa pares numéricos X e Y mediante una serie explícita.

**Búsqueda** scatter, correlación, Series

**Para recordar** No uses set_categories como sustituto de los valores X de una dispersión.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Relacionar precio y unidades

```python
from openpyxl.chart import ScatterChart, Reference, Series
graf = ScatterChart()
x = Reference(ws,min_col=4,min_row=2,max_row=6)
y = Reference(ws,min_col=5,min_row=2,max_row=6)
graf.series.append(Series(y,x,title='Precio y unidades'))
ws.add_chart(graf,'I2')
```

**Resultado esperado** Puntos (2,800), (5,20), (1,800), (3,50), (2,20).

### BubbleChart()

**Clave** `burbujas`

**Definición** Agrega una tercera magnitud que determina el tamaño de cada punto.

**Búsqueda** bubble, tamaño de burbuja

**Para recordar** Cada serie requiere X, Y y tamaño con igual número de observaciones.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Dimensionar puntos por importe

```python
from openpyxl.chart import BubbleChart, Reference, Series
for r in range(2,7):
    ws.cell(r,8,ws.cell(r,4).value*ws.cell(r,5).value)
graf = BubbleChart()
x = Reference(ws,min_col=4,min_row=2,max_row=6)
y = Reference(ws,min_col=5,min_row=2,max_row=6)
z = Reference(ws,min_col=8,min_row=2,max_row=6)
graf.series.append(Series(values=y,xvalues=x,zvalues=z,title='Importe'))
ws.add_chart(graf,'J2')
```

**Resultado esperado** Cinco burbujas con tamaño proporcional al importe de cada venta.

### RadarChart()

**Clave** `radar`

**Definición** Compara perfiles de varias métricas sobre ejes radiales.

**Búsqueda** radar, perfiles, métricas comparables

**Para recordar** Usa magnitudes comparables para evitar distorsiones.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Comparar métricas de servicio

```python
from openpyxl.chart import RadarChart, Reference
resumen.append(['Calidad',80])
resumen.append(['Servicio',90])
resumen.append(['Velocidad',70])
graf = RadarChart()
graf.add_data(Reference(resumen,min_col=2,min_row=3,max_row=5))
graf.set_categories(Reference(resumen,min_col=1,min_row=3,max_row=5))
resumen.add_chart(graf,'D2')
```

**Resultado esperado** Perfil de tres métricas: 80, 90 y 70.

### StockChart() y SurfaceChart()

**Clave** `financiero-y-superficie`

**Definición** StockChart muestra series financieras compatibles; SurfaceChart representa una matriz de valores.

**Búsqueda** stock, superficie, OHLC

**Para recordar** El orden de series financieras importa; no basta convertir cualquier gráfico a StockChart.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Crear un gráfico financiero y una superficie

```python
from openpyxl.chart import StockChart, SurfaceChart, Reference
h = wb.create_sheet("Mercado")
for r in [("Dia","Apertura","Maximo","Minimo","Cierre"),(1,100,110,95,105),(2,105,115,100,112)]:
    h.append(r)
graf = StockChart()
graf.add_data(Reference(h,min_col=2,max_col=5,min_row=1,max_row=3),titles_from_data=True)
graf.set_categories(Reference(h,min_col=1,min_row=2,max_row=3))
from openpyxl.chart.updown_bars import UpDownBars
from openpyxl.chart.axis import ChartLines
graf.upDownBars = UpDownBars()
graf.hiLowLines = ChartLines()
h.add_chart(graf,"G2")
m = wb.create_sheet("Matriz")
for r in [("Mes","Norte","Sur"),("Agosto",10,20),("Septiembre",15,25)]:
    m.append(r)
s = SurfaceChart()
s.add_data(Reference(m,min_col=2,max_col=3,min_row=1,max_row=3),titles_from_data=True)
s.set_categories(Reference(m,min_col=1,min_row=2,max_row=3))
m.add_chart(s,"E2")
```

**Resultado esperado** Dos gráficos guardables: OHLC con dos sesiones y una superficie con matriz 2 × 2. La representación final del gráfico financiero depende de Excel.

### Histograma por frecuencias

**Clave** `histograma`

**Definición** Calcula frecuencias por intervalos en Python y represéntalas con un BarChart.

**Búsqueda** histograma, bins, frecuencia

**Para recordar** Este procedimiento produce un gráfico de barras de frecuencias, no el tipo moderno nativo Histogram de Excel.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Graficar las frecuencias de precio

```python
from openpyxl.chart import BarChart, Reference
precios = [r[4] for r in ws.iter_rows(min_row=2,values_only=True)]
h = wb.create_sheet('Frecuencias')
h.append(['Intervalo','Frecuencia'])
for a,b in [(0,100),(100,500),(500,1000)]:
    h.append([f'{a}-{b}',sum(a<=v<b for v in precios)])
graf = BarChart()
graf.add_data(Reference(h,min_col=2,min_row=1,max_row=4),titles_from_data=True)
graf.set_categories(Reference(h,min_col=1,min_row=2,max_row=4))
graf.gapWidth = 0
h.add_chart(graf,'D2')
```

**Resultado esperado** Frecuencias 3, 0 y 2.

## Gráficos avanzados

**Clave** `graficos-avanzados`

### Definición

**Clave** `definicion`

**Definición** Los gráficos pueden combinar series, modificar sus propiedades y usar ejes adicionales.

**Búsqueda** gráfico avanzado, series, ejes

**Para recordar** Verifica que las series tengan sentido en la misma escala.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Personalizar una serie

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
graf.series[0].graphicalProperties.solidFill = '4472C4'
ws.add_chart(graf,'I2')
```

**Resultado esperado** Barras azules.

### Gráficos apilados

**Clave** `graficos-apilados`

**Definición** grouping='stacked' apila series por categoría; percentStacked muestra proporciones.

**Búsqueda** stacked, percentStacked, overlap

**Para recordar** Usa magnitudes aditivas con la misma unidad.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Apilar canales por mes

```python
from openpyxl.chart import BarChart, Reference
h = wb.create_sheet('Canales')
for r in [('Mes','Tienda','Web'),('Agosto',10,20),('Septiembre',15,25)]:
    h.append(r)
graf = BarChart(grouping='stacked',overlap=100)
graf.add_data(Reference(h,min_col=2,max_col=3,min_row=1,max_row=3),titles_from_data=True)
graf.set_categories(Reference(h,min_col=1,min_row=2,max_row=3))
h.add_chart(graf,'E2')
```

**Resultado esperado** Columnas apiladas con totales 30 y 40.

### Gráfico combinado y eje secundario

**Clave** `grafico-combinado`

**Definición** Se pueden combinar gráficos y asignar un eje Y secundario mediante un identificador distinto.

**Búsqueda** combinar barras y línea, eje secundario, axId

**Para recordar** Etiqueta ambas unidades para no confundir escalas.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Combinar unidades y precio

```python
from openpyxl.chart import BarChart, LineChart, Reference
barras = BarChart()
barras.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
linea = LineChart()
linea.add_data(Reference(ws,min_col=5,min_row=1,max_row=6),titles_from_data=True)
barras.y_axis.title = 'Unidades'
linea.y_axis.title = 'Precio'
linea.y_axis.axId = 200
barras.y_axis.crosses = 'max'
barras += linea
ws.add_chart(barras,'I2')
```

**Resultado esperado** Gráfico combinado con barras de unidades y línea de precio en ejes distintos.

### Escalas y tendencias

**Clave** `escalas-y-tendencia`

**Definición** scaling ajusta el dominio de los ejes y Trendline añade una tendencia configurada.

**Búsqueda** min, max, logBase, Trendline

**Para recordar** Elige límites que no oculten datos relevantes; openpyxl no calcula la regresión.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Limitar el eje y agregar tendencia

```python
from openpyxl.chart import ScatterChart, Reference, Series
from openpyxl.chart.trendline import Trendline
graf = ScatterChart()
s = Series(Reference(ws,min_col=5,min_row=2,max_row=6),Reference(ws,min_col=4,min_row=2,max_row=6))
s.trendline = Trendline(trendlineType='linear')
graf.series.append(s)
graf.y_axis.scaling.min = 0
graf.y_axis.scaling.max = 1000
ws.add_chart(graf,'I2')
```

**Resultado esperado** Dispersión con eje Y de 0 a 1000 y tendencia lineal que Excel calcularía.

### Chartsheet

**Clave** `hoja-de-grafico`

**Definición** create_chartsheet() crea una hoja dedicada a un gráfico.

**Búsqueda** chartsheet, hoja de gráfico

**Para recordar** No es una Worksheet con celdas; usa referencias a otra hoja.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Crear una pestaña dedicada a un gráfico

```python
from openpyxl.chart import BarChart, Reference
graf = BarChart()
graf.add_data(Reference(ws,min_col=4,min_row=1,max_row=6),titles_from_data=True)
hoja = wb.create_chartsheet('GraficoVentas')
hoja.add_chart(graf)
print(wb.sheetnames)
```

**Resultado esperado** ['Ventas', 'Resumen', 'GraficoVentas'].

## Imágenes, comentarios e hipervínculos

**Clave** `objetos-adicionales`

### Definición

**Clave** `definicion`

**Definición** Una hoja puede incluir imágenes, anotaciones e hipervínculos además de valores.

**Búsqueda** objetos excel, imagen, comentario, enlace

**Para recordar** Estos elementos se guardan en el archivo; no son cálculos.

#### Anotar un precio

```python
from openpyxl.comments import Comment
ws['E2'].comment = Comment('Precio de lista','Analista')
print(ws['E2'].comment.text)
```

**Resultado esperado** Precio de lista.

### Image() y add_image()

**Clave** `insertar-imagen`

**Definición** Inserta una imagen rasterizada mediante Image y un anclaje de hoja.

**Búsqueda** imagen, logo, Pillow, add_image

**Para recordar** Requiere Pillow y un archivo válido; la imagen no es un gráfico editable.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Insertar una imagen generada

```python
from PIL import Image as PILImage
from openpyxl.drawing.image import Image
PILImage.new('RGB',(120,40),'#24527A').save('logo.png')
img = Image('logo.png')
resumen.add_image(img,'D2')
```

**Resultado esperado** Rectángulo azul de 120 × 40 píxeles anclado en D2.

### Comment()

**Clave** `comentarios`

**Definición** Comment añade una anotación de texto y autor a una celda.

**Búsqueda** comentario, nota, autor

**Para recordar** No conserva todo el formato de comentarios complejos; no equivale a comentarios modernos con hilos.

#### Añadir y quitar una nota

```python
from openpyxl.comments import Comment
ws['E2'].comment = Comment('Revisar descuento','Analista')
print(ws['E2'].comment.author)
ws['E2'].comment = None
```

**Resultado esperado** Analista; luego se elimina la anotación.

### Hipervínculos

**Clave** `hipervinculos`

**Definición** hyperlink asocia un destino a una celda; su valor puede ser un texto distinto del destino.

**Búsqueda** hyperlink, enlace interno, enlace externo

**Para recordar** Un enlace no implica descargar ni abrir el destino desde Python.

#### Enlazar la documentación

```python
ws['I1'] = 'Documentación'
ws['I1'].hyperlink = 'https://openpyxl.readthedocs.io/'
ws['I1'].style = 'Hyperlink'
print(ws['I1'].hyperlink.target)
```

**Resultado esperado** https://openpyxl.readthedocs.io/.

### Texto enriquecido

**Clave** `texto-enriquecido`

**Definición** CellRichText permite combinar fragmentos con estilos distintos dentro de una misma celda.

**Búsqueda** CellRichText, TextBlock, InlineFont, rich_text

**Para recordar** Usa load_workbook(rich_text=True) para conservar texto enriquecido existente.

#### Dar formato a una parte del texto

```python
from openpyxl.cell.rich_text import CellRichText, TextBlock
from openpyxl.cell.text import InlineFont
ws['I1'] = CellRichText('Estado: ',TextBlock(InlineFont(b=True,color='FF008000'),'OK'))
wb.save('rich.xlsx')
print(str(load_workbook('rich.xlsx',rich_text=True)['Ventas']['I1'].value))
```

**Resultado esperado** Estado: OK; el fragmento OK conserva negrita y color verde.

## Protección y seguridad

**Clave** `proteccion`

### Definición

**Clave** `definicion`

**Definición** La protección de Excel limita ciertas modificaciones accidentales en hojas y libros.

**Búsqueda** proteger excel, contraseña, protección

**Para recordar** No cifra los datos ni sustituye un control de acceso.

#### Activar la protección de Ventas

```python
ws.protection.sheet = True
print(ws.protection.sheet)
```

**Resultado esperado** True; Excel activaría la protección de hoja.

### Protection()

**Clave** `proteccion-celdas`

**Definición** locked y hidden indican si una celda se bloquea o si su fórmula se oculta al proteger la hoja.

**Búsqueda** bloquear celda, desbloquear, ocultar fórmula

**Para recordar** Los flags de celda solo se aplican cuando la hoja está protegida.

#### Permitir edición de una celda

```python
from openpyxl.styles import Protection
ws['D2'].protection = Protection(locked=False)
ws.protection.sheet = True
print(ws['D2'].protection.locked,ws['E2'].protection.locked)
```

**Resultado esperado** False True; D2 sería editable y E2 bloqueada.

### Proteger una hoja

**Clave** `proteger-hoja`

**Definición** sheet protection permite establecer contraseña y restricciones de edición.

**Búsqueda** set_password, sheet protection

**Para recordar** La contraseña de protección no es cifrado ni una garantía de confidencialidad.

#### Proteger la edición de la hoja

```python
ws.protection.set_password('practica')
ws.protection.sheet = True
print(ws.protection.sheet)
```

**Resultado esperado** True; protección configurada.

### Proteger estructura del libro

**Clave** `proteger-libro`

**Definición** wb.security.lockStructure limita cambios en la estructura de hojas.

**Búsqueda** lockStructure, workbookPassword

**Para recordar** No impide leer los valores del libro.

#### Bloquear la estructura del libro

```python
wb.security.lockStructure = True
wb.security.set_workbook_password('practica')
print(wb.security.lockStructure)
```

**Resultado esperado** True; Excel restringiría cambios de estructura.

## Impresión y configuración de página

**Clave** `impresion`

### Definición

**Clave** `definicion`

**Definición** Las propiedades de impresión controlan qué se imprime y cómo se distribuye en páginas.

**Búsqueda** impresión excel, área, page_setup

**Para recordar** El resultado final depende de Excel, la impresora y el papel.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Limitar la impresión al rango de ventas

```python
ws.print_area = 'A1:G6'
print(ws.print_area)
```

**Resultado esperado** Área Ventas!$A$1:$G$6.

### Orientación, papel y escala

**Clave** `configurar-pagina`

**Definición** page_setup define orientación y papel; PageSetupProperties habilita ajustar a páginas.

**Búsqueda** landscape, A4, fitToWidth, fitToHeight

**Para recordar** Ajustar a una página de ancho no implica una sola página de alto.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Ajustar el reporte a papel A4 horizontal

```python
from openpyxl.worksheet.properties import PageSetupProperties
ws.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
ws.page_setup.orientation = 'landscape'
ws.page_setup.paperSize = ws.PAPERSIZE_A4
ws.page_setup.fitToWidth = 1
ws.page_setup.fitToHeight = 0
print(ws.page_setup.orientation,ws.page_setup.fitToWidth)
```

**Resultado esperado** landscape 1; A4 horizontal y ajuste a una página de ancho.

### Área y títulos repetidos

**Clave** `area-y-titulos`

**Definición** print_area limita la impresión; print_title_rows y print_title_cols repiten encabezados.

**Búsqueda** print_area, print_title_rows, print_title_cols

**Para recordar** Los títulos repetidos no duplican celdas.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Repetir cabeceras en páginas

```python
ws.print_area = 'A1:G6'
ws.print_title_rows = '1:1'
ws.print_title_cols = 'A:A'
print(ws.print_title_rows,ws.print_title_cols)
```

**Resultado esperado** $1:$1 $A:$A; encabezados repetidos en impresión.

### Márgenes

**Clave** `margenes`

**Definición** page_margins configura márgenes en pulgadas.

**Búsqueda** page_margins, PageMargins

**Para recordar** Los márgenes no cambian dimensiones de las celdas.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Configurar márgenes

```python
from openpyxl.worksheet.page import PageMargins
ws.page_margins = PageMargins(left=0.3,right=0.3,top=0.5,bottom=0.5)
print(ws.page_margins.left)
```

**Resultado esperado** 0.3 pulgadas.

### Encabezados y pies

**Clave** `encabezados-y-pies`

**Definición** oddHeader y oddFooter permiten añadir textos y códigos de página en páginas impares o todas si no hay diseño diferente.

**Búsqueda** oddHeader, oddFooter, número de página

**Para recordar** &P es página actual y &N total de páginas.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Añadir título y numeración de páginas

```python
ws.oddHeader.center.text = 'Reporte de ventas'
ws.oddFooter.right.text = 'Pagina &P de &N'
print(ws.oddHeader.center.text)
```

**Resultado esperado** Reporte de ventas; numeración al imprimir.

### Saltos de página

**Clave** `saltos-de-pagina`

**Definición** Break agrega saltos manuales de fila o columna.

**Búsqueda** Break, row_breaks, col_breaks

**Para recordar** La aplicación de impresión puede ajustar los saltos según su configuración.

**Nota** El efecto visual o de cálculo se observa en Excel; el código configura o almacena sus propiedades.

#### Configurar un salto manual

```python
from openpyxl.worksheet.pagebreak import Break
ws.row_breaks.append(Break(id=3))
print(ws.row_breaks.brk[0].id)
```

**Resultado esperado** 3; salto manual asociado a la fila 3.

## Archivos grandes y memoria

**Clave** `rendimiento`

### Definición

**Clave** `definicion`

**Definición** Los modos optimizados permiten leer o generar libros grandes de forma incremental.

**Búsqueda** read_only, write_only, rendimiento, memoria

**Para recordar** No ofrecen todas las operaciones del modo normal.

#### Leer la cabecera sin cargar todo el libro

```python
libro = load_workbook('ventas_base.xlsx',read_only=True)
print(next(libro['Ventas'].values))
libro.close()
```

**Resultado esperado** ('ID', 'Producto', 'Region', 'Unidades', 'Precio', 'Fecha', 'Estado').

### read_only=True

**Clave** `solo-lectura`

**Definición** Carga las filas de manera diferida con ReadOnlyWorksheet.

**Búsqueda** read_only, iteración incremental

**Para recordar** No permite editar y requiere close() explícito; iter_cols no está disponible.

#### Sumar unidades en lectura optimizada

```python
libro = load_workbook('ventas_base.xlsx',read_only=True)
try:
    hoja = libro['Ventas']
    print(sum(r[3] for r in hoja.iter_rows(min_row=2,values_only=True)))
finally:
    libro.close()
```

**Resultado esperado** 13 unidades.

### Dimensiones incorrectas

**Clave** `reset-dimensions`

**Definición** En read_only las dimensiones dependen de metadatos del archivo; reset_dimensions() permite ignorarlos si son erróneos.

**Búsqueda** calculate_dimension, reset_dimensions, A1:A1

**Para recordar** No resetees dimensiones correctas sin motivo; force=True puede recorrer la hoja.

#### Recalcular límites de una hoja

```python
libro = load_workbook('ventas_base.xlsx',read_only=True)
hoja = libro['Ventas']
print(hoja.calculate_dimension())
hoja.reset_dimensions()
print(hoja.calculate_dimension(force=True))
libro.close()
```

**Resultado esperado** A1:G6 antes y después del recálculo.

### write_only=True

**Clave** `solo-escritura`

**Definición** Genera filas secuencialmente con bajo consumo de memoria.

**Búsqueda** write_only, WriteOnlyWorksheet, append

**Para recordar** No tiene hoja inicial, no permite acceso aleatorio y solo se guarda una vez.

#### Exportar importes de forma secuencial

```python
libro = Workbook(write_only=True)
hoja = libro.create_sheet('Exportacion')
hoja.append(['ID','Importe'])
for r in ws.iter_rows(min_row=2,values_only=True):
    hoja.append([r[0],r[3]*r[4]])
libro.save('exportacion.xlsx')
print(load_workbook('exportacion.xlsx').active['B2'].value)
```

**Resultado esperado** 1600.

### WriteOnlyCell()

**Clave** `celdas-optimizadas`

**Definición** Permite preparar estilos o comentarios para una celda en una hoja write_only.

**Búsqueda** WriteOnlyCell, estilos streaming

**Para recordar** Configura vistas y otras propiedades previas a las celdas antes de append().

#### Crear una cabecera con estilo en streaming

```python
from openpyxl.cell import WriteOnlyCell
from openpyxl.styles import Font
libro = Workbook(write_only=True)
hoja = libro.create_sheet()
hoja.freeze_panes = 'A2'
c = WriteOnlyCell(hoja,value='Importe')
c.font = Font(bold=True)
hoja.append([c])
hoja.append([1600])
libro.save('stream.xlsx')
print(load_workbook('stream.xlsx').active['A1'].font.bold)
```

**Resultado esperado** True.

### Procesamiento incremental

**Clave** `procesamiento-incremental`

**Definición** Consume las filas una por una en vez de convertirlas todas en una lista.

**Búsqueda** streaming, generador, memoria

**Para recordar** list() materializa datos; un acumulador puede mantener memoria constante.

#### Acumular ventas sin materializar filas

```python
libro = load_workbook('ventas_base.xlsx',read_only=True)
try:
    total = 0
    for r in libro['Ventas'].iter_rows(min_row=2,values_only=True):
        if r[6]=='Completado':
            total += r[3]*r[4]
    print(total)
finally:
    libro.close()
```

**Resultado esperado** 1850.

### BytesIO

**Clave** `archivo-en-memoria`

**Definición** BytesIO permite guardar y cargar un libro en un búfer binario sin archivo intermedio.

**Búsqueda** BytesIO, descarga web, memoria

**Para recordar** Rebobina con seek(0) antes de entregar o leer el contenido.

#### Guardar el libro en un búfer

```python
from io import BytesIO
buf = BytesIO()
wb.save(buf)
buf.seek(0)
print(load_workbook(buf)['Ventas']['A2'].value)
```

**Resultado esperado** 101.

## Rutas, errores y verificación

**Clave** `errores-y-pruebas`

### Definición

**Clave** `definicion`

**Definición** Una automatización fiable valida rutas, trata errores previsibles y comprueba que el libro final cumple lo solicitado.

**Búsqueda** errores, try except, validar xlsx

**Para recordar** Guarda en una ruta distinta y reabre el archivo para comprobarlo.

#### Guardar y comprobar el identificador

```python
wb.save('verificado.xlsx')
libro = load_workbook('verificado.xlsx')
assert libro['Ventas']['A2'].value == 101
print('OK')
```

**Resultado esperado** OK.

### pathlib y os

**Clave** `rutas`

**Definición** Path facilita construir rutas, localizar archivos y crear carpetas de salida; os ofrece utilidades equivalentes.

**Búsqueda** Path, glob, os, carpetas, rutas

**Para recordar** Usa rutas explícitas y separa archivos de entrada y salida.

#### Crear una carpeta de salida

```python
import os
salida = Path('salidas')
salida.mkdir(exist_ok=True)
wb.save(salida/'ventas.xlsx')
print(os.path.isfile(salida/'ventas.xlsx'))
```

**Resultado esperado** True.

### Archivo inexistente o inválido

**Clave** `archivos-invalidos`

**Definición** FileNotFoundError, InvalidFileException y BadZipFile distinguen problemas de ruta, formato o contenido ZIP.

**Búsqueda** archivo dañado, error de carga, BadZipFile

**Para recordar** Un xlsx es un paquete ZIP; una extensión correcta no garantiza contenido válido.

#### Detectar un archivo dañado

```python
from zipfile import BadZipFile
from openpyxl.utils.exceptions import InvalidFileException
Path('danado.xlsx').write_text('no es un libro')
try:
    load_workbook('danado.xlsx')
except (FileNotFoundError,InvalidFileException,BadZipFile) as e:
    print(type(e).__name__)
```

**Resultado esperado** BadZipFile.

### IllegalCharacterError y coordenadas inválidas

**Clave** `errores-de-celdas`

**Definición** Ciertos caracteres de control no pueden almacenarse; las coordenadas deben cumplir la sintaxis de Excel.

**Búsqueda** IllegalCharacterError, CellCoordinatesException

**Para recordar** Limpia caracteres de control ilegales sin borrar caracteres válidos como tildes.

#### Capturar entradas de celda inválidas

```python
from openpyxl.utils.exceptions import IllegalCharacterError, CellCoordinatesException
from openpyxl.utils.cell import coordinate_from_string
try:
    ws['H1'] = 'dato'+chr(1)
except IllegalCharacterError:
    print('Caracter ilegal')
try:
    coordinate_from_string('A0')
except CellCoordinatesException:
    print('Coordenada invalida')
```

**Resultado esperado** Caracter ilegal; Coordenada invalida.

### Verificar valores, estilos y fórmulas

**Clave** `verificar-reporte`

**Definición** Reabre el archivo con data_only=False y usa assert para comprobar estructura y propiedades.

**Búsqueda** pruebas, assert, validar fórmulas, validar estilos

**Para recordar** Comprueba la fórmula almacenada y, por separado, resultados calculados cuando tengas un motor de Excel.

#### Reabrir y comprobar un reporte

```python
from openpyxl.styles import Font
ws['H2'] = '=D2*E2'
ws['A1'].font = Font(bold=True)
wb.save('control.xlsx')
h = load_workbook('control.xlsx')['Ventas']
assert h['H2'].value == '=D2*E2'
assert h['A1'].font.bold
assert h['A2'].value == 101
print('Verificado')
```

**Resultado esperado** Verificado.

## Formatos avanzados y metadatos

**Clave** `formatos-avanzados`

### Definición

**Clave** `definicion`

**Definición** openpyxl permite trabajar con metadatos y ciertos componentes avanzados del formato OOXML, con límites de conservación.

**Búsqueda** OOXML, macros, plantillas, propiedades

**Para recordar** Haz una copia de libros complejos y verifica su contenido después de guardarlos.

#### Consultar los metadatos iniciales

```python
print(wb.properties.creator,wb.template)
```

**Resultado esperado** openpyxl False; libro normal, no plantilla.

### Propiedades del documento

**Clave** `propiedades-documento`

**Definición** wb.properties contiene metadatos estándar como título, autor y descripción.

**Búsqueda** creator, title, description, metadata

**Para recordar** No representan los datos de las hojas.

#### Registrar autor y título

```python
wb.properties.creator = 'Equipo de analisis'
wb.properties.title = 'Ventas agosto'
print(wb.properties.title)
```

**Resultado esperado** Ventas agosto.

### Propiedades personalizadas

**Clave** `propiedades-personalizadas`

**Definición** custom_doc_props permite registrar propiedades tipadas adicionales en el libro.

**Búsqueda** custom_doc_props, StringProperty, IntProperty

**Para recordar** Disponible en openpyxl 3.1; elige el tipo adecuado.

#### Registrar el periodo del reporte

```python
from openpyxl.packaging.custom import StringProperty
wb.custom_doc_props.append(StringProperty(name='Periodo',value='2026-08'))
print(wb.custom_doc_props['Periodo'].value)
```

**Resultado esperado** 2026-08.

### Plantillas xltx y xltm

**Clave** `plantillas`

**Definición** wb.template=True marca un libro como plantilla; la extensión debe corresponder al tipo de archivo.

**Búsqueda** xltx, xltm, plantilla, template

**Para recordar** Para crear un xlsx a partir de una xltx, desactiva template antes de guardar.

#### Crear un libro desde una plantilla

```python
wb.template = True
wb.save('plantilla.xltx')
libro = load_workbook('plantilla.xltx')
libro.template = False
libro.save('reporte_desde_plantilla.xlsx')
print(load_workbook('reporte_desde_plantilla.xlsx').template)
```

**Resultado esperado** False; se crea un libro normal desde la plantilla.

### Macros existentes

**Clave** `macros`

**Definición** keep_vba=True conserva componentes VBA de un libro existente compatible, pero no los ejecuta ni los edita.

**Búsqueda** xlsm, keep_vba, VBA, macros

**Para recordar** Requiere un archivo xlsm real aportado por el usuario; guarda como xlsm y verifica las macros en Excel.

**Nota** Este ejemplo requiere el archivo indicado; no se incluye en los datos compartidos y no se ha ejecutado.

#### Actualizar una copia con macros

```python
# Requiere plantilla_macros.xlsm existente
libro = load_workbook('plantilla_macros.xlsm',keep_vba=True)
libro.active['A1'] = 'Actualizado'
libro.save('reporte_macros.xlsm')
```

**Resultado esperado** Archivo nuevo con A1 actualizado y componentes VBA conservados en la medida admitida. Verificar macros y objetos en Excel.

### Tablas dinámicas existentes

**Clave** `tablas-dinamicas`

**Definición** openpyxl puede preservar y modificar algunos atributos de pivots existentes, pero no proporciona una API pública completa para crearlos desde cero.

**Búsqueda** pivot table, tabla dinámica, refreshOnLoad

**Para recordar** Requiere un archivo real con tabla dinámica; _pivots es una interfaz interna y puede variar.

**Nota** Este ejemplo requiere el archivo indicado; no se incluye en los datos compartidos y no se ha ejecutado.

#### Solicitar actualización de una tabla dinámica

```python
# Requiere reporte_pivot.xlsx con un pivot en la primera hoja
libro = load_workbook('reporte_pivot.xlsx')
pivot = libro.active._pivots[0]
pivot.cache.refreshOnLoad = True
libro.save('pivot_actualizado.xlsx')
```

**Resultado esperado** Se solicita refrescar la caché al abrir en Excel; Python no recalcula el pivot. Verificar que el origen sigue siendo válido.

### Referencias externas

**Clave** `referencias-externas`

**Definición** keep_links controla si se conservan datos almacenados de vínculos externos al cargar.

**Búsqueda** keep_links, external links

**Para recordar** No resuelve ni actualiza archivos externos; no elimines vínculos inadvertidamente.

#### Cargar conservando vínculos externos

```python
libro = load_workbook('ventas_base.xlsx',keep_links=True)
print(libro.sheetnames)
```

**Resultado esperado** ['Ventas', 'Resumen']; con un libro vinculado, se solicita preservar la información externa admitida.

### Inspeccionar OOXML

**Clave** `ooxml`

**Definición** Un xlsx contiene partes XML empaquetadas en ZIP que describen hojas, estilos y otros objetos.

**Búsqueda** OOXML, ZIP, XML, estructura de excel

**Para recordar** Útil para diagnóstico; editar XML manualmente puede romper relaciones y contenido.

#### Inspeccionar partes de un archivo XLSX

```python
from zipfile import ZipFile
with ZipFile('ventas_base.xlsx') as z:
    print('xl/workbook.xml' in z.namelist())
    print('xl/worksheets/sheet1.xml' in z.namelist())
```

**Resultado esperado** True; True.

## Integración con otras herramientas

**Clave** `integraciones`

### Definición

**Clave** `definicion`

**Definición** openpyxl se complementa con otras bibliotecas para importar datos, analizarlos y escribir reportes Excel.

**Búsqueda** pandas, SQL, CSV, integración

**Para recordar** Usa openpyxl para estructura y presentación; otra biblioteca puede encargarse del análisis.

#### Exportar los valores a CSV

```python
from csv import writer
with open('export.csv','w',newline='',encoding='utf-8') as f:
    writer(f).writerows(ws.values)
print(Path('export.csv').exists())
```

**Resultado esperado** True; CSV con cabecera y cinco filas, sin estilos ni objetos Excel.

### CSV a Excel

**Clave** `csv-a-excel`

**Definición** csv.reader o DictReader carga registros de texto que pueden escribirse con append().

**Búsqueda** CSV, importación, csv.reader

**Para recordar** CSV no conserva tipos ni formatos; convierte los campos numéricos explícitamente.

#### Importar un CSV convirtiendo unidades

```python
from csv import reader
Path('entrada.csv').write_text(chr(10).join(['Producto,Unidades','Mouse,5','']),encoding='utf-8')
h = wb.create_sheet('Importado')
with open('entrada.csv',encoding='utf-8',newline='') as f:
    filas = reader(f)
    h.append(next(filas))
    for producto,n in filas:
        h.append([producto,int(n)])
print(h['B2'].value,h['B2'].data_type)
```

**Resultado esperado** 5 n.

### SQL a Excel

**Clave** `sql-a-excel`

**Definición** Una consulta devuelve registros que puedes escribir como filas; sqlite3 sirve para demostrar la integración sin servidor externo.

**Búsqueda** SQL, cursor, sqlite3, exportar consulta

**Para recordar** SQL obtiene los datos; openpyxl crea el archivo y su presentación.

#### Exportar resultados de una consulta SQL

```python
import sqlite3
with sqlite3.connect(':memory:') as con:
    con.execute('CREATE TABLE ventas(producto TEXT, unidades INTEGER)')
    con.executemany('INSERT INTO ventas VALUES (?,?)',[('Mouse',5),('Laptop',2),('Mouse',2)])
    cur = con.execute('SELECT producto,SUM(unidades) AS total FROM ventas GROUP BY producto ORDER BY producto')
    h = wb.create_sheet('SQL')
    h.append([d[0] for d in cur.description])
    for fila in cur:
        h.append(fila)
print(list(h.values))
```

**Resultado esperado** [('producto','total'),('Laptop',2),('Mouse',7)] (las tuplas de texto se muestran con espacios tras las comas en Python).

### DataFrame a hoja

**Clave** `dataframe-to-rows`

**Definición** dataframe_to_rows transforma un DataFrame en filas utilizables por append().

**Búsqueda** pandas, dataframe_to_rows, DataFrame

**Para recordar** Requiere pandas; index=False evita agregar el índice como columna.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Escribir un DataFrame en una hoja

```python
import pandas as pd
from openpyxl.utils.dataframe import dataframe_to_rows
df = pd.DataFrame({'Producto':['Laptop','Mouse'],'Total':[2400,140]})
h = wb.create_sheet('Pandas')
for fila in dataframe_to_rows(df,index=False,header=True):
    h.append(fila)
print(list(h.values))
```

**Resultado esperado** [('Producto', 'Total'), ('Laptop', 2400), ('Mouse', 140)].

### ExcelWriter y pandas

**Clave** `excel-writer`

**Definición** pandas puede escribir DataFrames con motor openpyxl y luego personalizar la hoja mediante el objeto Workbook.

**Búsqueda** ExcelWriter, to_excel, engine openpyxl

**Para recordar** Requiere pandas; usa un context manager para cerrar y guardar.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Exportar con ExcelWriter y congelar cabecera

```python
import pandas as pd
df = pd.DataFrame({'Producto':['Laptop','Mouse'],'Total':[2400,140]})
with pd.ExcelWriter('pandas.xlsx',engine='openpyxl') as writer:
    df.to_excel(writer,sheet_name='Reporte',index=False)
    writer.sheets['Reporte'].freeze_panes = 'A2'
print(load_workbook('pandas.xlsx')['Reporte']['B2'].value)
```

**Resultado esperado** 2400; la cabecera queda inmovilizada.

### Leer Excel con pandas

**Clave** `leer-con-pandas`

**Definición** read_excel importa una hoja como DataFrame para análisis tabular.

**Búsqueda** read_excel, pandas, engine, NaN

**Para recordar** pandas no es un editor completo de estilos y objetos Excel; None puede convertirse a NaN.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Analizar el archivo con pandas

```python
import pandas as pd
df = pd.read_excel('ventas_base.xlsx',sheet_name='Ventas',engine='openpyxl')
print(df.shape,int(df['Unidades'].sum()))
```

**Resultado esperado** (5, 7) 13.

### NumPy y tipos de datos

**Clave** `numpy`

**Definición** NumPy realiza cálculos vectorizados; convierte resultados o arrays a valores compatibles con Excel antes de escribir.

**Búsqueda** numpy, arrays, tolist, item

**Para recordar** Requiere NumPy; normaliza NaN e infinitos según la regla de negocio.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Escribir un promedio de NumPy

```python
import numpy as np
a = np.array([800,20,50])
resumen.append(['Precio medio',float(a.mean())])
print(resumen['B3'].value)
```

**Resultado esperado** 290.0.

### Matplotlib como imagen

**Clave** `matplotlib`

**Definición** Matplotlib produce una imagen que openpyxl puede insertar en una hoja.

**Búsqueda** Matplotlib, savefig, imagen gráfica

**Para recordar** Requiere Matplotlib y Pillow; el gráfico insertado no tiene series editables en Excel.

**Nota** Requiere instalar la biblioteca externa que se importa en el ejemplo.

#### Insertar un gráfico de Matplotlib

```python
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from openpyxl.drawing.image import Image
fig,ax = plt.subplots()
ax.bar(['Laptop','Mouse','Teclado'],[3,7,3])
fig.savefig('grafico.png')
plt.close(fig)
resumen.add_image(Image('grafico.png'),'D2')
```

**Resultado esperado** Imagen de barras con 3, 7 y 3 unidades en Resumen.

## Automatización de reportes

**Clave** `automatizacion`

### Definición

**Clave** `definicion`

**Definición** Un reporte automatizado combina extracción, reglas de negocio, escritura y formato, con controles antes de entregar.

**Búsqueda** automatizar reportes, KPI, reporte ventas

**Para recordar** Distingue los cálculos de negocio de la presentación del archivo.

#### Calcular el importe completado

```python
total = sum(r[3]*r[4] for r in ws.iter_rows(min_row=2,values_only=True) if r[6]=='Completado')
resumen.append(['Ventas completadas',total])
print(resumen['B3'].value)
```

**Resultado esperado** 1850.

### Actualizar una plantilla

**Clave** `actualizar-plantilla`

**Definición** Carga una plantilla existente, cambia solo las celdas de entrada y guarda en una ruta nueva.

**Búsqueda** plantilla, actualizar reporte mensual

**Para recordar** Comprueba las fórmulas y estilos existentes; no sobrescribas el original.

#### Actualizar valores de un reporte existente

```python
libro = load_workbook('ventas_base.xlsx')
h = libro['Resumen']
h['A3'] = 'Ventas completadas'
h['B3'] = 1850
h['A4'] = 'Cumplimiento'
h['B4'] = '=B3/B2'
h['B4'].number_format = '0.0%'
libro.save('reporte_agosto.xlsx')
```

**Resultado esperado** B3 = 1850, B4 almacena =B3/B2; Excel mostraría 92.5%.

### Consolidar varios archivos

**Clave** `consolidar-archivos`

**Definición** Recorre libros con una estructura común y añade sus registros a un nuevo libro.

**Búsqueda** glob, consolidar excel, juntar archivos

**Para recordar** Comprueba cabeceras y claves; consolidar no implica deduplicar automáticamente.

#### Consolidar dos libros con la misma cabecera

```python
carpeta = Path('entradas')
carpeta.mkdir(exist_ok=True)
for n,filas in [('norte',[(101,'Laptop')]),('sur',[(102,'Mouse')])]:
    b = Workbook()
    b.active.append(['ID','Producto'])
    for r in filas:
        b.active.append(r)
    b.save(carpeta/f'{n}.xlsx')
h = wb.create_sheet('Consolidado')
h.append(['ID','Producto'])
for ruta in sorted(carpeta.glob('*.xlsx')):
    b = load_workbook(ruta,read_only=True)
    try:
        assert next(b.active.values) == ('ID','Producto')
        for r in b.active.iter_rows(min_row=2,values_only=True):
            h.append(r)
    finally:
        b.close()
print(list(h.values))
```

**Resultado esperado** [('ID', 'Producto'), (101, 'Laptop'), (102, 'Mouse')].

### Reportes por región

**Clave** `reportes-por-grupo`

**Definición** Separa registros por una categoría para generar entregables por sucursal o cliente.

**Búsqueda** reportes individuales, sucursal, automatizar archivos

**Para recordar** Usa una lista de nombres de archivo controlados; no utilices texto externo sin validar rutas.

#### Generar un archivo por región

```python
from collections import defaultdict
grupos = defaultdict(list)
for r in ws.iter_rows(min_row=2,values_only=True):
    grupos[r[2] or 'Sin_region'].append(r)
for region,filas in grupos.items():
    b = Workbook()
    b.active.append(next(ws.values))
    for r in filas:
        b.active.append(r)
    b.save(f'ventas_{region}.xlsx')
print(sorted(grupos))
```

**Resultado esperado** ['Norte', 'Sin_region', 'Sur']; tres archivos con 2, 1 y 2 ventas respectivamente.

### Conciliar información

**Clave** `conciliar-datos`

**Definición** Compara registros por identificador y detecta diferencias entre fuentes.

**Búsqueda** conciliación, comparar importes, diferencias

**Para recordar** Aclara si faltantes son discrepancias o registros válidos; verifica unicidad de claves.

#### Encontrar un importe discrepante

```python
esperados = {101:1600,102:100,103:800,104:155,105:40}
for r in ws.iter_rows(min_row=2,values_only=True):
    importe = r[3]*r[4]
    if esperados.get(r[0]) != importe:
        print(r[0],importe,esperados.get(r[0]))
```

**Resultado esperado** 104 150 155; diferencia de 5 en el registro 104.

### Dashboard sencillo

**Clave** `dashboard`

**Definición** Combina indicadores, tabla de resumen y gráfico nativo en una hoja de presentación.

**Búsqueda** dashboard Excel, reporte KPI, gráfico

**Para recordar** Calcula métricas con Python si necesitas valores correctos sin depender del recálculo de Excel.

#### Crear un dashboard de ventas completadas

```python
from collections import defaultdict
from openpyxl.styles import Font
from openpyxl.chart import BarChart, Reference
totales = defaultdict(int)
for r in ws.iter_rows(min_row=2,values_only=True):
    if r[6]=='Completado':
        totales[r[1]] += r[3]*r[4]
h = wb.create_sheet('Dashboard')
h.append(['Producto','Ventas completadas'])
for nombre,total in sorted(totales.items()):
    h.append([nombre,total])
for c in h[1]:
    c.font = Font(bold=True)
for (c,) in h.iter_rows(min_row=2,min_col=2,max_col=2):
    c.number_format = '#,##0.00'
graf = BarChart()
graf.add_data(Reference(h,min_col=2,min_row=1,max_row=h.max_row),titles_from_data=True)
graf.set_categories(Reference(h,min_col=1,min_row=2,max_row=h.max_row))
h.add_chart(graf,'D2')
h.freeze_panes = 'A2'
wb.save('dashboard.xlsx')
```

**Resultado esperado** Tabla Laptop 1600, Mouse 100, Teclado 150; gráfico de tres barras y cabecera inmovilizada.

## Fuentes

Documentación oficial de openpyxl 3.1 (los ejemplos se prepararon para 3.1.5):

- [Tutorial](https://openpyxl.readthedocs.io/en/stable/tutorial.html): libros, hojas, lectura, escritura y parámetros de carga; límites de conservación.
- [API Worksheet](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.worksheet.html): celdas, iteración, dimensiones, hojas, gráficos y validación.
- [Edición de hojas](https://openpyxl.readthedocs.io/en/stable/editing_worksheets.html): inserción, eliminación, desplazamiento y combinación; dependencias no gestionadas automáticamente.
- [Utilidades de celdas](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.utils.cell.html) y [CellRange](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.worksheet.cell_range.html): referencias, rangos, conversiones y coordenadas.
- [Estilos](https://openpyxl.readthedocs.io/en/stable/styles.html): objetos de estilo, colores, inmutabilidad y NamedStyle.
- [Propiedades de hoja](https://openpyxl.readthedocs.io/en/stable/worksheet_properties.html): vista, agrupación, pestañas y opciones de página.
- [Uso simple](https://openpyxl.readthedocs.io/en/stable/usage.html): fórmulas, imágenes y lectura de resultados almacenados.
- [Fórmulas](https://openpyxl.readthedocs.io/en/stable/formula.html) y [fórmulas especiales](https://openpyxl.readthedocs.io/en/stable/simple_formulae.html): Translator, Tokenizer, ArrayFormula y DataTableFormula.
- [CalcProperties](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.workbook.properties.html): configuración de recálculo.
- [Nombres definidos](https://openpyxl.readthedocs.io/en/stable/defined_names.html): nombres globales, locales y referencias dinámicas.
- [Fechas y horas](https://openpyxl.readthedocs.io/en/stable/datetime.html): seriales, ISO 8601, calendarios y zonas horarias.
- [Tablas](https://openpyxl.readthedocs.io/en/stable/worksheet_tables.html): creación y acceso a tablas estructuradas.
- [Filtros y ordenación](https://openpyxl.readthedocs.io/en/stable/filters.html): índices relativos, filtros avanzados y aplicación por Excel.
- [Formato condicional](https://openpyxl.readthedocs.io/en/stable/formatting.html): reglas, escalas, barras e iconos.
- [Validación de datos](https://openpyxl.readthedocs.io/en/stable/validation.html): reglas, rangos, mensajes y listas desplegables.
- [Gráficos](https://openpyxl.readthedocs.io/en/stable/charts/introduction.html): tipos, referencias, series y anclajes; [eje secundario](https://openpyxl.readthedocs.io/en/stable/charts/secondary.html): combinación y ejes.
- [Imágenes](https://openpyxl.readthedocs.io/en/stable/images.html), [comentarios](https://openpyxl.readthedocs.io/en/stable/comments.html) y [texto enriquecido](https://openpyxl.readthedocs.io/en/stable/rich_text.html): inserción y conservación.
- [Protección](https://openpyxl.readthedocs.io/en/stable/protection.html): limitaciones y configuración de hojas y libros.
- [Impresión](https://openpyxl.readthedocs.io/en/stable/print_settings.html): orientación, papel, márgenes, áreas, títulos y encabezados.
- [Modos optimizados](https://openpyxl.readthedocs.io/en/stable/optimized.html): read_only, write_only, reset_dimensions y restricciones.
- [Excepciones](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.utils.exceptions.html): errores específicos de la biblioteca.
- [Propiedades personalizadas](https://openpyxl.readthedocs.io/en/stable/workbook_custom_doc_props.html): metadatos tipados.
- [Tablas dinámicas](https://openpyxl.readthedocs.io/en/stable/pivot.html): preservación y modificación limitada.
- [Pandas y NumPy](https://openpyxl.readthedocs.io/en/stable/pandas.html): interoperabilidad y dataframe_to_rows.
- [API completa](https://openpyxl.readthedocs.io/en/stable/api/openpyxl.html): referencia para propiedades y métodos específicos.
- [Python: biblioteca estándar](https://docs.python.org/3/library/): pathlib, csv, sqlite3, collections, datetime, io y zipfile.
- [pandas: ExcelWriter](https://pandas.pydata.org/docs/reference/api/pandas.ExcelWriter.html) y [read_excel](https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html): integración con openpyxl.
- [Matplotlib: savefig](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.savefig.html): exportación de imágenes.
