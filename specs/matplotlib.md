# Matplotlib

**Clave** `matplotlib`

**Área** Análisis de datos (ubicación propuesta para AllDoc)

**Resumen** Biblioteca de Python para crear, personalizar, combinar e interpretar visualizaciones de datos.

**Alcance** Fundamentos, tipos de gráfica, personalización, ejes y escalas, composición, anotaciones, fechas, integración con NumPy y pandas, exportación, objetos y configuración, transformaciones, mapas de calor, proyecciones, interactividad y criterios de visualización analítica. Los grupos avanzados amplían el alcance de un perfil Data Analyst / Business Analyst Jr; no constituyen un inventario exhaustivo de la API.

**Entorno** Python 3.11 o posterior; Matplotlib 3.10.8, NumPy 2.3.5 y pandas 2.2.3 como entorno de referencia. `ecdf()` requiere Matplotlib 3.8 o posterior. Para animaciones GIF se utiliza Pillow. La interacción requiere un backend compatible con eventos (por ejemplo, QtAgg con sus dependencias o ipympl en Jupyter); el backend Agg permite exportar sin pantalla.

## Datos compartidos

Instala las dependencias en tu entorno de Python: `python -m pip install matplotlib numpy pandas pillow`.

Los ejemplos son independientes: ejecuta la preparación compartida una vez por sesión y después el bloque de la ficha que quieras probar. Cada ejemplo de dibujo crea su propia figura. En un script, añade `plt.show()` al final si quieres verla en una ventana; en Jupyter se puede mostrar automáticamente según el backend. Para repetir ejemplos en una misma sesión, cierra las figuras anteriores con `plt.close('all')`. Los ejemplos de exportación escriben únicamente en `salidas_matplotlib/` dentro del directorio de trabajo. Los datos son sintéticos y no proceden de un dataset existente de AllDoc.

- `df`: seis meses del primer semestre de 2026, con ventas, meta y publicidad en miles de MXN, número de pedidos y conversión como proporción de 0 a 1.
- `transacciones`: seis importes por región, en miles de MXN. Es una muestra independiente de las ventas mensuales; los totales regionales coinciden con `ventas_region`.
- `importes`: nueve importes individuales en unidades monetarias; muestra independiente para distribuciones.
- `matriz`: ventas por región (filas Norte, Centro, Sur) y mes (columnas Ene, Feb, Mar), muestra independiente para mapas de calor.
- `g`, `X`, `Y`, `Z`: rejilla y superficie numéricas de ejemplo para gráficas especializadas.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
import matplotlib.colors as colors
from matplotlib import font_manager
from matplotlib.patches import Rectangle, Circle, Polygon
from matplotlib.widgets import Slider, Button
from matplotlib.animation import FuncAnimation
from cycler import cycler
import numpy as np
import pandas as pd
from pathlib import Path

meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
fechas = pd.date_range('2026-01-01', periods=6, freq='MS')
ventas = np.array([120, 150, 130, 180, 160, 210])
metas = np.array([130, 140, 150, 170, 180, 190])
publicidad = np.array([10, 15, 12, 20, 18, 25])
pedidos = np.array([24, 30, 26, 36, 32, 42])
conversion = np.array([.10, .12, .11, .14, .13, .16])
regiones = ['Norte', 'Centro', 'Sur']
ventas_region = np.array([240, 180, 120])
meta_region = np.array([220, 200, 150])
online = np.array([140, 100, 60])
tienda = np.array([100, 80, 60])
importes = np.array([20, 30, 40, 50, 60, 70, 90, 100, 120])
matriz = np.array([[80, 90, 70], [50, 60, 70], [30, 40, 50]])
g = np.linspace(-2, 2, 25)
X, Y = np.meshgrid(g, g)
Z = X**2 + Y**2

df = pd.DataFrame({'mes': meses, 'fecha': fechas, 'ventas': ventas,
                   'meta': metas, 'publicidad': publicidad,
                   'pedidos': pedidos, 'conversion': conversion})
transacciones = pd.DataFrame({
    'region': ['Norte', 'Centro', 'Sur', 'Norte', 'Centro', 'Sur'],
    'importe': [140, 100, 60, 100, 80, 60]})

salida = Path('salidas_matplotlib')
salida.mkdir(exist_ok=True)
```

## Fundamentos de Matplotlib

**Clave** `fundamentos`

### Definición

**Clave** `definicion`

**Definición** Matplotlib convierte datos numéricos, categóricos o temporales en figuras. `pyplot` es su interfaz de uso habitual.

**Búsqueda** matplotlib, pyplot, plt, primera gráfica

**Para recordar** Importa `pyplot` como `plt`; proporciona los datos y muestra la figura.

#### Mostrar la evolución de ventas

```python
plt.plot(meses, ventas)
plt.show()
```

Cada posición de `meses` se relaciona con el valor de `ventas` del mismo índice.

**Resultado esperado** Una línea con seis puntos, de enero (120) a junio (210).

### Figure, Axes y Axis

**Clave** `figure-axes-axis`

**Definición** `Figure` es el lienzo completo; `Axes` es la región de dibujo y `Axis` administra la escala y las marcas de cada eje.

**Búsqueda** figure, axes, axis, lienzo, eje

**Para recordar** Una figura puede tener varios `Axes`; cada `Axes` cartesiano normalmente tiene `xaxis` y `yaxis`.

#### Identificar los componentes

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
print(type(fig).__name__, type(ax).__name__, type(ax.xaxis).__name__)
```

`ax.xaxis` es el eje horizontal, no toda la gráfica.

**Resultado esperado** Una línea y salida `Figure Axes XAxis` (el nombre concreto de Axes puede variar según versión).

### plt.figure y figsize

**Clave** `figure-figsize`

**Definición** `figure()` crea un lienzo; `figsize` especifica su anchura y altura en pulgadas.

**Búsqueda** figure, tamaño de figura, figsize

**Para recordar** El tamaño físico y el DPI determinan el tamaño en píxeles de una salida rasterizada.

#### Crear un lienzo ancho

```python
fig = plt.figure(figsize=(8, 3))
ax = fig.add_subplot(111)
ax.plot(meses, ventas)
```

`(8, 3)` controla las dimensiones del lienzo.

**Resultado esperado** Una gráfica en una figura de 8 × 3 pulgadas.

### plt.subplots

**Clave** `subplots`

**Definición** `subplots()` crea una figura y uno o varios `Axes` en una sola operación.

**Búsqueda** subplots, fig ax, crear gráfica

**Para recordar** Con un solo panel, devuelve `(fig, ax)`.

#### Crear una figura y su gráfica

```python
fig, ax = plt.subplots(figsize=(6, 3))
ax.plot(meses, ventas)
```

El objeto `ax` recibe las instrucciones de dibujo.

**Resultado esperado** Una gráfica de ventas de seis meses.

### pyplot y orientación a objetos

**Clave** `pyplot-y-objetos`

**Definición** `pyplot` actúa sobre la figura y los ejes activos; la interfaz orientada a objetos usa referencias explícitas a `fig` y `ax`.

**Búsqueda** plt vs ax, API orientada a objetos, stateful

**Para recordar** Usa `ax` cuando necesites controlar varios paneles sin ambigüedad.

#### Dibujar con pyplot

```python
plt.figure()
plt.plot(meses, ventas)
plt.title('Ventas')
plt.show()
```

`plt.title()` afecta a los ejes activos.

**Resultado esperado** Una figura titulada Ventas.

#### Dibujar con Axes

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.set_title('Ventas')
```

La referencia `ax` indica exactamente dónde se dibuja.

**Resultado esperado** Una figura equivalente a la anterior.

### show y close

**Clave** `show-close`

**Definición** `show()` presenta las figuras abiertas; `close()` libera la figura de la gestión de pyplot.

**Búsqueda** mostrar, cerrar figura, show, close

**Para recordar** En un script guarda antes de un `show()` bloqueante; cierra las figuras que ya no necesitas.

#### Mostrar y cerrar una figura

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
plt.show()
plt.close(fig)
```

`close(fig)` cierra esa figura, no las demás.

**Resultado esperado** Se presenta la gráfica si hay un backend gráfico; al cerrar deja de estar registrada en pyplot.

## Gráficas de líneas

**Clave** `lineas`

### Definición

**Clave** `definicion`

**Definición** `plot()` conecta puntos en el orden recibido. Se usa para tendencias o secuencias ordenadas.

**Búsqueda** plot, línea, tendencia, evolución

**Para recordar** Ordena primero los datos cuando el eje represente tiempo.

#### Mostrar las ventas mensuales

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
```

El eje x sigue el orden de los meses.

**Resultado esperado** Una línea con valores 120, 150, 130, 180, 160 y 210.

### Varias series

**Clave** `varias-series`

**Definición** Cada llamada a `plot()` añade una serie al mismo `Axes`.

**Búsqueda** dos líneas, comparar series, varias curvas

**Para recordar** Cada serie tiene sus propios valores y puede tener una etiqueta.

#### Comparar ventas y meta

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, label='Ventas')
ax.plot(meses, metas, label='Meta')
ax.legend()
```

`label` identifica cada serie en la leyenda.

**Resultado esperado** Dos líneas, una de ventas y otra de metas.

### step y stairs

**Clave** `step-stairs`

**Definición** `step()` dibuja cambios escalonados entre coordenadas; `stairs()` recibe alturas e intervalos delimitados por bordes.

**Búsqueda** escalones, step, stairs, intervalos

**Para recordar** En `stairs` hay un borde más que alturas.

#### Mostrar una tarifa por intervalo

```python
fig, ax = plt.subplots()
ax.stairs([10, 20, 15], [0, 1, 2, 3])
```

Los bordes delimitan tres intervalos consecutivos.

**Resultado esperado** Tres tramos horizontales con alturas 10, 20 y 15.

#### Mostrar cambios desde cada mes

```python
fig, ax = plt.subplots()
ax.step(meses, ventas, where='post')
```

`where='post'` mantiene el valor hasta el siguiente punto.

**Resultado esperado** Una línea escalonada con cambios en las posiciones mensuales.

### stem

**Clave** `stem`

**Definición** `stem()` representa valores discretos con segmentos desde una línea base hasta cada punto.

**Búsqueda** stem, tallos, valores discretos

**Para recordar** No une valores consecutivos con una curva.

#### Mostrar pedidos discretos

```python
fig, ax = plt.subplots()
ax.stem([1, 2, 3], [4, 7, 3])
```

Cada tallo representa un conteo.

**Resultado esperado** Tres tallos con alturas 4, 7 y 3.

## Gráficas de barras

**Clave** `barras`

### Definición

**Clave** `definicion`

**Definición** `bar()` compara magnitudes entre categorías mediante barras verticales. `barh()` las representa horizontalmente.

**Búsqueda** bar, barh, barras, categorías

**Para recordar** La longitud de la barra representa su valor; usa una base cero para comparar magnitudes.

#### Comparar ventas por región

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region)
```

Cada categoría tiene una barra.

**Resultado esperado** Norte 240, Centro 180 y Sur 120.

### Barras horizontales

**Clave** `barh`

**Definición** `barh()` usa categorías en y y magnitudes en x; ayuda cuando hay etiquetas largas.

**Búsqueda** barh, barras horizontales, ranking

**Para recordar** Ordena los datos y, si quieres el mayor arriba, invierte el eje y.

#### Mostrar regiones de mayor a menor

```python
fig, ax = plt.subplots()
ax.barh(regiones, ventas_region)
ax.invert_yaxis()
```

Las regiones ya están ordenadas por ventas descendentes.

**Resultado esperado** Norte arriba, Centro en medio y Sur abajo.

### Barras agrupadas

**Clave** `barras-agrupadas`

**Definición** Desplaza las barras de cada serie sobre el eje x para comparar valores lado a lado.

**Búsqueda** grouped bar, barras lado a lado, width

**Para recordar** Usa posiciones numéricas y offsets; las categorías van en las marcas del eje.

#### Comparar ventas y metas regionales

```python
fig, ax = plt.subplots()
x = np.arange(len(regiones))
w = 0.35
ax.bar(x-w/2, ventas_region, width=w, label='Ventas')
ax.bar(x+w/2, meta_region, width=w, label='Meta')
ax.set_xticks(x, regiones)
ax.legend()
```

Los desplazamientos evitan que se superpongan las barras.

**Resultado esperado** Tres pares de barras: 240/220, 180/200 y 120/150.

### Barras apiladas

**Clave** `barras-apiladas`

**Definición** `bottom` indica dónde empieza cada barra vertical; permite sumar componentes de una categoría.

**Búsqueda** stacked bar, bottom, apiladas

**Para recordar** La altura total es la suma de los componentes, no el valor de la última serie.

#### Separar ventas por canal

```python
fig, ax = plt.subplots()
ax.bar(regiones, online, label='Online')
ax.bar(regiones, tienda, bottom=online, label='Tienda')
ax.legend()
```

La segunda serie comienza encima de la primera.

**Resultado esperado** Tres barras con alturas totales 240, 180 y 120.

## Histogramas y distribuciones

**Clave** `distribuciones`

### Definición

**Clave** `definicion`

**Definición** `hist()` divide valores numéricos en intervalos y muestra su frecuencia o densidad.

**Búsqueda** hist, histograma, distribución, frecuencia

**Para recordar** Las barras representan intervalos, no categorías independientes.

#### Distribuir importes de pedidos

```python
fig, ax = plt.subplots()
ax.hist(importes, bins=[0, 50, 100, 150])
```

Los bordes definen tres intervalos.

**Resultado esperado** Frecuencias 3, 4 y 2 en los tres intervalos.

### bins

**Clave** `bins`

**Definición** `bins` puede ser una cantidad de intervalos, sus bordes o un método automático.

**Búsqueda** bins, intervalos, histograma

**Para recordar** Cambiar los intervalos puede cambiar la percepción de la distribución.

#### Contar pedidos en dos rangos

```python
fig, ax = plt.subplots()
n, bordes, _ = ax.hist(importes, bins=[0, 100, 150])
print(n)
```

El último intervalo incluye su extremo derecho.

**Resultado esperado** Salida `[7. 2.]` y dos barras.

### density

**Clave** `density`

**Definición** `density=True` normaliza el histograma para que el área total de las barras sea 1.

**Búsqueda** density, densidad, histograma normalizado

**Para recordar** La altura no es necesariamente una proporción; depende de la anchura del intervalo.

#### Comparar una distribución normalizada

```python
fig, ax = plt.subplots()
n, bordes, _ = ax.hist(importes, bins=[0, 50, 100, 150], density=True)
print(round(np.sum(n*np.diff(bordes)), 2))
```

Multiplica cada altura por su anchura para obtener su área.

**Resultado esperado** Salida `1.0`.

### boxplot

**Clave** `boxplot`

**Definición** `boxplot()` resume mediana, cuartiles y valores potencialmente atípicos.

**Búsqueda** boxplot, caja, IQR, cuartiles, outliers

**Para recordar** Por defecto los bigotes llegan a observaciones dentro de 1.5 IQR desde los cuartiles.

#### Detectar importes extremos

```python
fig, ax = plt.subplots()
ax.boxplot([10, 12, 13, 14, 15, 16, 80])
```

El 80 queda fuera de los bigotes con la regla predeterminada.

**Resultado esperado** Una caja con mediana 14 y un punto atípico en 80.

### violinplot

**Clave** `violinplot`

**Definición** `violinplot()` estima la forma de una distribución mediante densidad suavizada.

**Búsqueda** violin, densidad, distribución

**Para recordar** La anchura refleja densidad estimada; no el conteo exacto.

#### Comparar dos canales

```python
fig, ax = plt.subplots()
ax.violinplot([importes[:4], importes[4:]], showmedians=True)
ax.set_xticks([1, 2], ['A', 'B'])
```

Cada violín representa una muestra de importes.

**Resultado esperado** Dos siluetas con sus medianas marcadas.

### ecdf

**Clave** `ecdf`

**Definición** `ecdf()` muestra la proporción de observaciones menores o iguales a cada valor sin intervalos arbitrarios.

**Búsqueda** ecdf, distribución acumulada, percentiles

**Para recordar** El último escalón alcanza 1 para una muestra válida.

#### Ver la proporción acumulada de pedidos

```python
fig, ax = plt.subplots()
ax.ecdf([20, 40, 60, 80])
```

Cada observación aporta una cuarta parte.

**Resultado esperado** Escalones que alcanzan 0.25, 0.50, 0.75 y 1.

## Dispersión y relaciones

**Clave** `dispersion`

### Definición

**Clave** `definicion`

**Definición** `scatter()` representa cada observación con sus coordenadas x e y. Permite explorar asociaciones entre variables.

**Búsqueda** scatter, dispersión, correlación

**Para recordar** Una asociación visual no implica causalidad.

#### Relacionar publicidad y ventas

```python
fig, ax = plt.subplots()
ax.scatter(publicidad, ventas)
```

Cada mes aporta una observación independiente.

**Resultado esperado** Seis puntos con tendencia general ascendente.

### Tamaño y color

**Clave** `tamano-color`

**Definición** `s` controla el área de cada marcador en puntos cuadrados y `c` puede representar una variable numérica.

**Búsqueda** bubble, burbujas, s, c, cmap

**Para recordar** Distingue el color fijo (`color`) de los valores mapeados (`c`).

#### Representar ventas, inversión y pedidos

```python
fig, ax = plt.subplots()
p = ax.scatter(publicidad, ventas, s=pedidos*5, c=pedidos, cmap='viridis')
fig.colorbar(p, ax=ax, label='Pedidos')
```

El tamaño y el color codifican el conteo de pedidos.

**Resultado esperado** Seis puntos con tamaños variables y una escala de color.

### hist2d

**Clave** `hist2d`

**Definición** `hist2d()` cuenta observaciones en celdas rectangulares de dos dimensiones.

**Búsqueda** histograma 2D, densidad bivariada

**Para recordar** Cada celda contiene el conteo de pares x-y que caen dentro de sus bordes.

#### Contar pares de inversión y ventas

```python
fig, ax = plt.subplots()
h = ax.hist2d(publicidad, ventas, bins=3)
fig.colorbar(h[3], ax=ax)
print(h[0].sum())
```

La matriz de frecuencias está en `h[0]`.

**Resultado esperado** Una rejilla 3 × 3 y salida `6.0`.

### hexbin

**Clave** `hexbin`

**Definición** `hexbin()` agrupa observaciones en celdas hexagonales y colorea su frecuencia u otra medida agregada.

**Búsqueda** hexbin, densidad, muchos puntos

**Para recordar** Usa `mincnt=1` para ocultar celdas vacías en conteos.

#### Mostrar densidad de observaciones

```python
fig, ax = plt.subplots()
h = ax.hexbin(publicidad, ventas, gridsize=4, mincnt=1)
fig.colorbar(h, ax=ax)
```

El color expresa cuántas observaciones caen en cada hexágono.

**Resultado esperado** Hexágonos ocupados por los seis pares de datos.

## Composición, áreas e incertidumbre

**Clave** `areas-composicion`

### Definición

**Clave** `definicion`

**Definición** Las gráficas de áreas, sectores y error ayudan a mostrar acumulación, partes de un total o incertidumbre.

**Búsqueda** área, pie, errorbar, composición

**Para recordar** El tipo de gráfica depende de qué relación quieres comunicar.

#### Representar la participación regional

```python
fig, ax = plt.subplots()
ax.pie(ventas_region, labels=regiones, autopct='%1.1f%%')
```

`pie()` normaliza los valores positivos por el total.

**Resultado esperado** Tres sectores de 44.4 %, 33.3 % y 22.2 % aproximadamente.

### pie

**Clave** `pie`

**Definición** `pie()` muestra componentes mutuamente excluyentes de un total positivo.

**Búsqueda** pie, circular, pastel, autopct

**Para recordar** Evita usar sectores para porcentajes que no forman un total.

#### Mostrar participación de canales

```python
fig, ax = plt.subplots()
ax.pie([300, 240], labels=['Online', 'Tienda'], autopct='%.1f%%')
```

Los dos valores suman 540.

**Resultado esperado** Sectores 55.6 % y 44.4 %.

### fill_between

**Clave** `fill-between`

**Definición** `fill_between()` rellena el espacio entre dos curvas o entre una curva y una línea base.

**Búsqueda** área, banda, fill_between

**Para recordar** Los límites deben corresponder a las mismas coordenadas x.

#### Mostrar un intervalo alrededor de ventas

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.fill_between(meses, ventas-10, ventas+10, alpha=.2)
```

Los límites son 10 unidades por debajo y por encima.

**Resultado esperado** Línea de ventas con una banda de ancho vertical 20.

### stackplot

**Clave** `stackplot`

**Definición** `stackplot()` apila áreas para representar componentes que cambian a lo largo de x.

**Búsqueda** stackplot, áreas apiladas

**Para recordar** El borde superior representa el total de las series.

#### Mostrar ventas mensuales por canal

```python
fig, ax = plt.subplots()
ax.stackplot(meses, ventas*.6, ventas*.4, labels=['Online', 'Tienda'])
ax.legend()
```

Los canales representan 60 % y 40 % de cada total.

**Resultado esperado** Dos áreas cuya suma sigue la serie ventas.

### errorbar

**Clave** `errorbar`

**Definición** `errorbar()` dibuja valores con barras de incertidumbre o variabilidad proporcionadas por el usuario.

**Búsqueda** errorbar, yerr, xerr, capsize, intervalo

**Para recordar** Matplotlib no calcula por sí solo el intervalo estadístico.

#### Mostrar estimaciones con incertidumbre

```python
fig, ax = plt.subplots()
ax.errorbar(meses, ventas, yerr=10, fmt='o', capsize=4)
```

`yerr=10` indica una amplitud de 10 en ambos sentidos.

**Resultado esperado** Seis puntos con barras verticales de ±10.

## Mapas de calor e imágenes

**Clave** `mapas-de-calor`

### Definición

**Clave** `definicion`

**Definición** Un mapa de calor asigna colores a una matriz numérica. Permite comparar magnitudes en dos dimensiones.

**Búsqueda** heatmap, matriz, imshow, colorbar

**Para recordar** Etiqueta filas, columnas y escala de color.

#### Comparar ventas por región y mes

```python
fig, ax = plt.subplots()
im = ax.imshow(matriz, cmap='viridis')
ax.set_xticks(range(3), meses[:3])
ax.set_yticks(range(3), regiones)
fig.colorbar(im, ax=ax)
```

Cada celda representa ventas de una región en un mes.

**Resultado esperado** Una matriz 3 × 3 y una barra de color.

### imshow y matshow

**Clave** `imshow-matshow`

**Definición** `imshow()` representa un array como imagen; `matshow()` ofrece valores predeterminados apropiados para matrices.

**Búsqueda** imshow, matshow, matriz, origin, interpolation

**Para recordar** En `imshow`, la primera dimensión son filas y la segunda columnas.

#### Mostrar celdas sin suavizado

```python
fig, ax = plt.subplots()
ax.imshow(matriz, interpolation='nearest', origin='upper')
```

La primera fila aparece arriba.

**Resultado esperado** Nueve celdas de color, sin interpolación visual.

#### Mostrar una matriz rápidamente

```python
fig, ax = plt.subplots()
ax.matshow(matriz)
```

`matshow()` configura la visualización matricial.

**Resultado esperado** La matriz con coordenadas de fila y columna.

### pcolormesh

**Clave** `pcolormesh`

**Definición** `pcolormesh()` colorea celdas de una cuadrícula, que puede tener bordes no uniformes.

**Búsqueda** pcolormesh, rejilla, celdas

**Para recordar** Con `shading='flat'` los bordes tienen una posición más que las celdas.

#### Representar intervalos desiguales

```python
fig, ax = plt.subplots()
p = ax.pcolormesh([0, 1, 3, 6], [0, 1, 2, 3], matriz, shading='flat')
fig.colorbar(p, ax=ax)
```

Las tres columnas tienen anchuras 1, 2 y 3.

**Resultado esperado** Nueve celdas con anchuras distintas.

### colorbar

**Clave** `colorbar`

**Definición** `colorbar()` muestra la correspondencia entre valores y colores de un objeto mapeado.

**Búsqueda** colorbar, leyenda de colores, escala

**Para recordar** Pasa el objeto devuelto por la gráfica para que la escala sea coherente.

#### Etiquetar la escala de ventas

```python
fig, ax = plt.subplots()
im = ax.imshow(matriz, vmin=0, vmax=100)
fig.colorbar(im, ax=ax, label='Ventas')
```

`vmin` y `vmax` fijan los límites de la escala.

**Resultado esperado** Una barra de color etiquetada Ventas entre 0 y 100.

### contour y contourf

**Clave** `contour-contourf`

**Definición** `contour()` dibuja líneas de igual valor; `contourf()` rellena las bandas entre niveles.

**Búsqueda** contour, contourf, curvas de nivel

**Para recordar** Los niveles son valores de la variable z, no coordenadas x o y.

#### Dibujar niveles de intensidad

```python
fig, ax = plt.subplots()
ax.contour(X, Y, Z, levels=[1, 2, 3])
```

Cada línea une posiciones con igual intensidad.

**Resultado esperado** Curvas para tres niveles de la superficie `Z`.

#### Rellenar intervalos de intensidad

```python
fig, ax = plt.subplots()
p = ax.contourf(X, Y, Z, levels=[0, 1, 2, 3, 4, 8])
fig.colorbar(p, ax=ax)
```

Las bandas representan intervalos de z.

**Resultado esperado** Regiones coloreadas entre los niveles indicados.

## Títulos, etiquetas y leyendas

**Clave** `titulos-etiquetas-leyendas`

### Definición

**Clave** `definicion`

**Definición** Los títulos explican qué se muestra; las etiquetas indican variables y unidades; las leyendas identifican series.

**Búsqueda** título, etiquetas, leyenda, title, label

**Para recordar** Una gráfica debe poder interpretarse sin leer su código.

#### Identificar una gráfica de ventas

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, label='Ventas reales')
ax.set_title('Ventas del semestre')
ax.set_xlabel('Mes')
ax.set_ylabel('Ventas (miles de MXN)')
ax.legend()
```

El título y las etiquetas dan contexto a los datos.

**Resultado esperado** Una línea con título, dos etiquetas de ejes y leyenda.

### set_title y suptitle

**Clave** `titulos`

**Definición** `set_title()` titula un panel; `suptitle()` titula la figura completa.

**Búsqueda** set_title, suptitle, título general

**Para recordar** Usa `fig.suptitle` para un encabezado común a varios paneles.

#### Titular un reporte y su panel

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.set_title('Evolución mensual')
fig.suptitle('Reporte comercial')
```

Cada título pertenece a un objeto distinto.

**Resultado esperado** Dos títulos visibles, uno general y uno del panel.

### set_xlabel y set_ylabel

**Clave** `etiquetas-ejes`

**Definición** Los nombres de los ejes describen la variable representada, idealmente con su unidad.

**Búsqueda** xlabel, ylabel, unidades

**Para recordar** No confundas la etiqueta del eje con sus marcas individuales.

#### Indicar unidades de una gráfica

```python
fig, ax = plt.subplots()
ax.scatter(publicidad, ventas)
ax.set_xlabel('Publicidad (miles de MXN)')
ax.set_ylabel('Ventas (miles de MXN)')
```

Los textos identifican las dos variables.

**Resultado esperado** Un diagrama de dispersión con ambos ejes identificados.

### legend, label y loc

**Clave** `legend`

**Definición** `label` identifica un elemento y `legend()` muestra las etiquetas. `loc` determina la ubicación de la leyenda.

**Búsqueda** legend, label, loc, leyenda

**Para recordar** Declara las etiquetas antes de llamar a `legend()`.

#### Distinguir ventas de metas

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, label='Real')
ax.plot(meses, metas, label='Meta')
ax.legend(loc='upper left')
```

La leyenda usa los elementos etiquetados.

**Resultado esperado** Dos entradas en la esquina superior izquierda.

### Leyendas personalizadas

**Clave** `leyendas-personalizadas`

**Definición** `handles` selecciona los objetos de la leyenda; `labels` sus textos; `bbox_to_anchor` ajusta su anclaje.

**Búsqueda** handles, labels, bbox_to_anchor, ncols

**Para recordar** El orden de objetos y etiquetas debe coincidir.

#### Colocar la leyenda sobre el panel

```python
fig, ax = plt.subplots()
a, = ax.plot(meses, ventas)
b, = ax.plot(meses, metas)
ax.legend(handles=[a,b], labels=['Real','Meta'], loc='lower center', bbox_to_anchor=(.5,1), ncols=2)
```

La leyenda queda anclada al centro del borde superior del panel.

**Resultado esperado** Dos entradas en una sola fila, sobre la gráfica.

## Estilo visual

**Clave** `estilo-visual`

### Definición

**Clave** `definicion`

**Definición** Las propiedades visuales modifican la apariencia de un objeto sin cambiar los datos que representa.

**Búsqueda** estilo, colores, formato, apariencia

**Para recordar** Usa estilos consistentes y reserva el énfasis para información importante.

#### Destacar las ventas reales

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, color='tab:blue', linewidth=2, marker='o')
ax.plot(meses, metas, color='gray', linestyle='--')
```

La línea de ventas se distingue de la referencia.

**Resultado esperado** Una serie azul con puntos y una meta gris discontinua.

### color y alpha

**Clave** `color-alpha`

**Definición** `color` fija el color de un objeto y `alpha` su opacidad, de 0 a 1.

**Búsqueda** color, alpha, transparencia, hex

**Para recordar** Una opacidad menor facilita ver superposiciones.

#### Atenuar los puntos

```python
fig, ax = plt.subplots()
ax.scatter(publicidad, ventas, color='#167D9A', alpha=.4)
```

Los puntos tienen 40 % de opacidad.

**Resultado esperado** Seis marcadores semitransparentes.

### linestyle y linewidth

**Clave** `estilo-lineas`

**Definición** `linestyle` define el patrón de una línea; `linewidth` su grosor en puntos.

**Búsqueda** linestyle, linewidth, --, :, grosor

**Para recordar** Combina patrones con color para distinguir series.

#### Separar una serie de su objetivo

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, linestyle='-', linewidth=2)
ax.plot(meses, metas, linestyle=':', linewidth=1)
```

La línea continua es más gruesa que la punteada.

**Resultado esperado** Dos líneas visualmente diferenciadas.

### marker y markersize

**Clave** `marcadores`

**Definición** `marker` elige el símbolo de cada punto de una línea; `markersize` su tamaño en puntos.

**Búsqueda** marker, markersize, o, s

**Para recordar** En `scatter`, `s` representa área en puntos cuadrados, no el mismo tamaño lineal.

#### Marcar las observaciones

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, marker='s', markersize=7)
```

Cada observación tiene un marcador cuadrado.

**Resultado esperado** Seis cuadrados conectados por una línea.

### fontsize y fontweight

**Clave** `tipografia-basica`

**Definición** `fontsize` controla el tamaño del texto; `fontweight` controla su grosor.

**Búsqueda** fontsize, fontweight, bold, tamaño de letra

**Para recordar** Da mayor jerarquía al título que a las etiquetas secundarias.

#### Destacar el título

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.set_title('Ventas', fontsize=15, fontweight='bold')
ax.set_ylabel('Miles de MXN', fontsize=10)
```

El título es más grande y está en negrita.

**Resultado esperado** Un título de 15 puntos y una etiqueta de 10 puntos.

### edgecolor, facecolor y hatch

**Clave** `bordes-y-rellenos`

**Definición** `facecolor` colorea el interior, `edgecolor` el contorno y `hatch` añade un patrón a formas compatibles.

**Búsqueda** edgecolor, facecolor, hatch, tramas

**Para recordar** Las tramas ayudan a distinguir categorías sin depender del color.

#### Resaltar el contorno de las barras

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region, facecolor='white', edgecolor='black', hatch='//')
```

El patrón diagonal rellena cada barra.

**Resultado esperado** Tres barras blancas con contornos y rayas negras.

### zorder

**Clave** `zorder`

**Definición** `zorder` determina el orden de superposición de los elementos; los valores mayores se dibujan encima.

**Búsqueda** zorder, capas, superposición

**Para recordar** Ajusta las capas si una referencia oculta los datos.

#### Poner puntos encima de una línea

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas, zorder=1)
ax.scatter(meses, ventas, zorder=3)
```

Los puntos se dibujan sobre la línea.

**Resultado esperado** Seis marcadores visibles encima de la línea.

## Ejes, límites y escalas

**Clave** `ejes-escalas`

### Definición

**Clave** `definicion`

**Definición** Los ejes traducen valores a posiciones. Sus límites, escalas y proporciones determinan cómo se interpreta la gráfica.

**Búsqueda** ejes, límites, escala, axis

**Para recordar** Modificar la escala no modifica el dataset.

#### Fijar un rango comparable

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region)
ax.set_ylim(0, 300)
```

Las barras comparten una escala de 0 a 300.

**Resultado esperado** Tres barras con base cero y máximo del eje en 300.

### set_xlim y set_ylim

**Clave** `limites`

**Definición** `set_xlim()` y `set_ylim()` fijan el intervalo visible de cada eje.

**Búsqueda** xlim, ylim, rango, zoom

**Para recordar** Los datos fuera del intervalo siguen existiendo, pero quedan recortados visualmente.

#### Acercar un intervalo de ventas

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.set_xlim(1, 4)
ax.set_ylim(100, 220)
```

El eje categórico usa posiciones de 0 a 5.

**Resultado esperado** Se ve el tramo de febrero a mayo en el rango vertical indicado.

### grid

**Clave** `grid`

**Definición** `grid()` muestra líneas de referencia alineadas con las marcas de los ejes.

**Búsqueda** grid, cuadrícula, axis, major, minor

**Para recordar** Una cuadrícula suave facilita leer magnitudes sin competir con los datos.

#### Añadir referencias horizontales

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region)
ax.set_axisbelow(True)
ax.grid(axis='y', alpha=.25)
```

Solo se muestran guías del eje y, detrás de las barras.

**Resultado esperado** Líneas horizontales tenues.

### set_xscale y set_yscale

**Clave** `escalas`

**Definición** `set_xscale()` y `set_yscale()` cambian la escala. La logarítmica muestra relaciones multiplicativas.

**Búsqueda** log, linear, logarítmica, escala

**Para recordar** Una escala logarítmica convencional requiere valores positivos para que se representen normalmente.

#### Comparar órdenes de magnitud

```python
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [10, 100, 1000], marker='o')
ax.set_yscale('log')
```

Cada aumento por factor 10 ocupa la misma distancia vertical.

**Resultado esperado** Puntos en 10, 100 y 1000 equidistantes en y.

### symlog y logit

**Clave** `symlog-logit`

**Definición** `symlog` permite valores negativos, cero y positivos con una región lineal central; `logit` representa probabilidades estrictamente entre 0 y 1.

**Búsqueda** symlog, logit, escala simétrica, probabilidades

**Para recordar** No uses `logit` para valores iguales a 0 o 1.

#### Representar ganancias y pérdidas

```python
fig, ax = plt.subplots()
ax.plot([-2,-1,0,1,2], [-100,-10,0,10,100], marker='o')
ax.set_yscale('symlog', linthresh=1)
```

Cerca de cero la escala es lineal.

**Resultado esperado** Cinco puntos visibles a ambos lados de cero.

#### Mostrar probabilidades

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [.01,.5,.99], marker='o')
ax.set_yscale('logit')
```

La escala expande las regiones próximas a los extremos.

**Resultado esperado** Tres probabilidades válidas en una escala logit.

### Invertir ejes

**Clave** `invertir-ejes`

**Definición** `invert_xaxis()` e `invert_yaxis()` invierten el sentido del eje sin reordenar las observaciones.

**Búsqueda** invert_xaxis, invert_yaxis, invertir

**Para recordar** No equivale a ordenar los datos antes de dibujar.

#### Invertir el orden horizontal

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.invert_xaxis()
```

El eje x cambia de dirección.

**Resultado esperado** Junio a la izquierda y enero a la derecha.

#### Mostrar la primera categoría arriba

```python
fig, ax = plt.subplots()
ax.barh(regiones, ventas_region)
ax.invert_yaxis()
```

La primera posición pasa al borde superior.

**Resultado esperado** Norte arriba y Sur abajo.

### margins y autoscale

**Clave** `margenes-autoescala`

**Definición** `margins()` ajusta el espacio adicional alrededor de los datos; `autoscale()` permite recuperar límites automáticos.

**Búsqueda** margins, autoscale, márgenes, autoscaling

**Para recordar** Los márgenes son fracciones del rango de los datos.

#### Dar espacio vertical

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [10,20,30])
ax.margins(y=.2)
print(ax.get_ylim())
```

El rango de y es 20 y el margen a cada lado es 4.

**Resultado esperado** Límites verticales `(6.0, 34.0)` aproximadamente.

#### Recuperar límites automáticos

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [10,20,30])
ax.set_ylim(0,100)
ax.autoscale(enable=True, axis='y')
```

Se vuelve a activar el ajuste de límites del eje y.

**Resultado esperado** El eje se ajusta cerca de 10 a 30.

### set_aspect y set_box_aspect

**Clave** `aspecto`

**Definición** `set_aspect()` controla la relación entre unidades x e y; `set_box_aspect()` controla la altura/anchura física del panel.

**Búsqueda** aspect, box_aspect, proporción

**Para recordar** Una unidad por eje y un panel cuadrado son conceptos distintos.

#### Dibujar unidades con la misma escala

```python
fig, ax = plt.subplots()
ax.plot([0,1,1,0,0], [0,0,1,1,0])
ax.set_aspect('equal')
```

Una unidad horizontal mide lo mismo que una vertical.

**Resultado esperado** Un cuadrado sin deformación.

#### Crear un panel cuadrado

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.set_box_aspect(1)
```

La forma física del panel es cuadrada.

**Resultado esperado** Un área de dibujo cuadrada, con escalas de datos independientes.

### spines

**Clave** `spines`

**Definición** Los `spines` son los bordes del área de dibujo; se pueden ocultar o modificar.

**Búsqueda** spines, bordes, marco

**Para recordar** Ocultar bordes no elimina los datos ni los ejes.

#### Simplificar el marco

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.spines[['top','right']].set_visible(False)
```

Solo se ocultan el borde superior y el derecho.

**Resultado esperado** Un panel con bordes inferior e izquierdo.

## Marcas, etiquetas y formato numérico

**Clave** `marcas-formato`

### Definición

**Clave** `definicion`

**Definición** Las marcas (ticks) señalan posiciones de un eje y sus etiquetas muestran cómo leerlas. Los locators eligen posiciones; los formatters el texto.

**Búsqueda** ticks, locator, formatter, marcas

**Para recordar** No confundas cambiar el texto con cambiar los valores de los datos.

#### Marcar tres referencias

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region)
ax.set_yticks([0, 120, 240])
```

Se fijan las marcas del eje y.

**Resultado esperado** Marcas en 0, 120 y 240.

### set_xticks y set_yticks

**Clave** `ticks`

**Definición** Fijan posiciones de marcas y, opcionalmente, sus etiquetas.

**Búsqueda** set_xticks, set_yticks, etiquetas manuales

**Para recordar** La cantidad de etiquetas debe coincidir con la de posiciones.

#### Etiquetar trimestres

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [120,150,210])
ax.set_xticks([1,2,3], ['T1','T2','T3'])
ax.set_yticks([100,150,200])
```

Las posiciones siguen siendo numéricas.

**Resultado esperado** Tres marcas x etiquetadas T1, T2 y T3.

### set_xticklabels y set_yticklabels

**Clave** `ticklabels`

**Definición** Modifican los textos de marcas existentes. Es preferible fijar posiciones y textos juntos con `set_xticks` o `set_yticks`.

**Búsqueda** set_xticklabels, set_yticklabels, etiquetas

**Para recordar** Fija primero las posiciones para que las etiquetas no queden desalineadas al cambiar la escala.

#### Renombrar marcas fijas

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [10,20,30])
ax.set_xticks([1,2,3])
ax.set_xticklabels(['Ene','Feb','Mar'])
ax.set_yticks([10,20,30])
ax.set_yticklabels(['10 u','20 u','30 u'])
```

Las etiquetas corresponden a posiciones fijas.

**Resultado esperado** Meses en x y unidades en y.

### rotation y tick_params

**Clave** `rotacion-tick-params`

**Definición** `tick_params()` configura apariencia de marcas y etiquetas, incluida su rotación.

**Búsqueda** rotation, labelrotation, tick_params, labelsize

**Para recordar** Rotar etiquetas largas reduce colisiones.

#### Rotar nombres de meses

```python
fig, ax = plt.subplots()
ax.bar(meses, ventas)
ax.tick_params(axis='x', labelrotation=45, labelsize=9)
fig.tight_layout()
```

La rotación se aplica a las etiquetas del eje x.

**Resultado esperado** Etiquetas inclinadas 45 grados.

### MultipleLocator y MaxNLocator

**Clave** `locators`

**Definición** `MultipleLocator` fija una separación regular; `MaxNLocator` limita aproximadamente la cantidad de intervalos con valores adecuados.

**Búsqueda** MultipleLocator, MaxNLocator, ticks automáticos

**Para recordar** `nbins` limita intervalos, no garantiza un número exacto de etiquetas.

#### Mostrar intervalos de 50

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.yaxis.set_major_locator(ticker.MultipleLocator(50))
```

Las marcas principales son múltiplos de 50.

**Resultado esperado** Marcas como 100, 150, 200 según límites visibles.

#### Reducir la cantidad de marcas

```python
fig, ax = plt.subplots()
ax.plot(meses, ventas)
ax.yaxis.set_major_locator(ticker.MaxNLocator(nbins=4))
```

El localizador elige intervalos legibles.

**Resultado esperado** Hasta aproximadamente cuatro intervalos dentro de la escala.

### AutoMinorLocator

**Clave** `auto-minor-locator`

**Definición** `AutoMinorLocator` crea subdivisiones de las marcas principales en ejes lineales con separación uniforme.

**Búsqueda** AutoMinorLocator, minor ticks, marcas secundarias

**Para recordar** Las marcas menores complementan las mayores.

#### Añadir subdivisiones

```python
fig, ax = plt.subplots()
ax.plot([0,1,2], [0,50,100])
ax.yaxis.set_major_locator(ticker.MultipleLocator(50))
ax.yaxis.set_minor_locator(ticker.AutoMinorLocator(5))
ax.grid(which='minor', axis='y', alpha=.2)
```

Divide cada intervalo principal de 50 en cinco partes.

**Resultado esperado** Marcas menores cada 10 unidades entre marcas principales.

### FuncFormatter y StrMethodFormatter

**Clave** `formato-numerico`

**Definición** `FuncFormatter` llama una función para cada marca; `StrMethodFormatter` usa una plantilla con `x` y `pos`.

**Búsqueda** FuncFormatter, StrMethodFormatter, moneda, formato

**Para recordar** Los valores siguen siendo numéricos; solo cambia su presentación.

#### Mostrar pesos en las marcas

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region*1000)
ax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda x, pos: f'${x:,.0f}'))
```

La función recibe el valor y la posición de la marca.

**Resultado esperado** Etiquetas monetarias como $100,000.

#### Mostrar unidades con una plantilla

```python
fig, ax = plt.subplots()
ax.bar(regiones, ventas_region)
ax.yaxis.set_major_formatter(ticker.StrMethodFormatter('{x:.0f} mil'))
```

La plantilla usa el valor `x`.

**Resultado esperado** Marcas como 100 mil y 200 mil.

### PercentFormatter

**Clave** `percent-formatter`

**Definición** `PercentFormatter` convierte valores numéricos a etiquetas porcentuales usando `xmax` como equivalente al 100 %.

**Búsqueda** porcentaje, PercentFormatter, xmax

**Para recordar** Usa `xmax=1` para proporciones; `xmax=100` para valores de 0 a 100.

#### Formatear tasas de conversión

```python
fig, ax = plt.subplots()
ax.plot(meses, conversion)
ax.yaxis.set_major_formatter(ticker.PercentFormatter(xmax=1, decimals=0))
```

Un valor de 0.12 se muestra como 12 %.

**Resultado esperado** Marcas del eje y en porcentaje.

### ScalarFormatter y FormatStrFormatter

**Clave** `formatters-adicionales`

**Definición** `ScalarFormatter` ajusta automáticamente la representación numérica; `FormatStrFormatter` usa formato de estilo `%`.

**Búsqueda** ScalarFormatter, FormatStrFormatter, notación científica

**Para recordar** Controla presentación, no redondea los datos almacenados.

#### Evitar offset y notación científica

```python
fig, ax = plt.subplots()
ax.plot([1,2,3], [1000001,1000002,1000003])
f = ticker.ScalarFormatter(useOffset=False)
f.set_scientific(False)
ax.yaxis.set_major_formatter(f)
```

Se desactivan ambas abreviaciones.

**Resultado esperado** Marcas con números completos.

#### Mostrar un decimal

```python
fig, ax = plt.subplots()
ax.plot(meses, conversion)
ax.yaxis.set_major_formatter(ticker.FormatStrFormatter('%.2f'))
```

La plantilla se aplica a cada marca.

**Resultado esperado** Etiquetas como 0.10 o 0.15.

## Colores y normalización

**Clave** `colores-normalizacion`

### Definición

**Clave** `definicion`

**Definición** Un `cmap` transforma valores normalizados en colores. Una normalización define cómo los datos se convierten a la escala del mapa.

**Búsqueda** cmap, colormap, normalize, mapa de colores

**Para recordar** Usa el mismo mapa y los mismos límites para comparar magnitudes entre paneles.

#### Colorear ventas con una escala común

```python
fig, ax = plt.subplots()
im = ax.imshow(matriz, cmap='viridis', vmin=0, vmax=100)
fig.colorbar(im, ax=ax)
```

Los límites determinan qué color corresponde a cada valor.

**Resultado esperado** Mapa de calor con una escala de 0 a 100.

### Normalize y LogNorm

**Clave** `normalizacion`

**Definición** `Normalize` transforma linealmente un rango de datos; `LogNorm` lo hace logarítmicamente y requiere valores positivos.

**Búsqueda** Normalize, LogNorm, colores logarítmicos

**Para recordar** No confundas una escala de color logarítmica con un eje logarítmico.

#### Comparar dos magnitudes con escala lineal

```python
fig, ax = plt.subplots()
norm = colors.Normalize(vmin=0, vmax=100)
im = ax.imshow(matriz, norm=norm, cmap='viridis')
fig.colorbar(im, ax=ax)
print(norm(50))
```

50 ocupa el centro de la escala de color.

**Resultado esperado** Salida `0.5` y una barra de color.

#### Distinguir órdenes de magnitud

```python
fig, ax = plt.subplots()
im = ax.imshow([[1,10],[100,1000]], norm=colors.LogNorm(vmin=1,vmax=1000))
fig.colorbar(im, ax=ax)
```

Los factores de 10 ocupan intervalos iguales de color.

**Resultado esperado** Cuatro celdas con escala logarítmica de color.

### ListedColormap y LinearSegmentedColormap

**Clave** `mapas-personalizados`

**Definición** `ListedColormap` crea una lista de colores; `LinearSegmentedColormap.from_list()` interpola una secuencia de colores.

**Búsqueda** ListedColormap, LinearSegmentedColormap, paleta

**Para recordar** Usa una lista discreta para clases y un gradiente para magnitudes continuas.

#### Mostrar tres clases de riesgo

```python
fig, ax = plt.subplots()
cmap = colors.ListedColormap(['#2166ac','#f7f7f7','#b2182b'])
ax.imshow([[0,1,2]], cmap=cmap, vmin=0,vmax=2)
```

Los códigos 0, 1 y 2 reciben colores distintos.

**Resultado esperado** Tres celdas azul, clara y roja.

#### Crear un gradiente personalizado

```python
fig, ax = plt.subplots()
cmap = colors.LinearSegmentedColormap.from_list('ventas',['white','navy'])
im = ax.imshow(matriz,cmap=cmap)
fig.colorbar(im, ax=ax)
```

La intensidad pasa gradualmente de blanco a azul oscuro.

**Resultado esperado** Mapa de calor con gradiente personalizado.

### BoundaryNorm

**Clave** `boundary-norm`

**Definición** `BoundaryNorm` asigna valores a intervalos discretos delimitados por bordes.

**Búsqueda** BoundaryNorm, clases, intervalos, colores

**Para recordar** Define límites y cantidad de colores compatibles.

#### Clasificar ventas por umbrales

```python
fig, ax = plt.subplots()
cmap = colors.ListedColormap(['#4575b4','#ffffbf','#d73027'])
norm = colors.BoundaryNorm([0,50,75,101], cmap.N)
im = ax.imshow(matriz,cmap=cmap,norm=norm)
fig.colorbar(im, ax=ax)
```

Los intervalos son [0,50), [50,75) y [75,101).

**Resultado esperado** Tres colores discretos para los niveles de ventas.

## Composición de figuras

**Clave** `composicion-figuras`

### Definición

**Clave** `definicion`

**Definición** Una figura puede contener varios paneles para mostrar indicadores relacionados de forma coordinada.

**Búsqueda** subplots, dashboard, paneles

**Para recordar** Cada panel tiene su propio `Axes`; configura títulos y escalas según su función.

#### Combinar ventas y distribución

```python
fig, axs = plt.subplots(1,2,figsize=(8,3),layout='constrained')
axs[0].plot(meses,ventas)
axs[1].hist(importes)
```

`axs[0]` y `axs[1]` son dos regiones distintas.

**Resultado esperado** Una línea y un histograma lado a lado.

### subplot y subplots

**Clave** `subplot-subplots`

**Definición** `subplot()` crea o selecciona un panel individual por posición; `subplots()` devuelve varios paneles a la vez.

**Búsqueda** subplot, nrows, ncols, subplots, squeeze

**Para recordar** `subplot` usa posiciones desde 1; los índices del array de `subplots` empiezan en 0.

#### Crear dos paneles con pyplot

```python
plt.figure(figsize=(6,4))
plt.subplot(2,1,1)
plt.plot(meses,ventas)
plt.subplot(2,1,2)
plt.bar(regiones,ventas_region)
```

Cada llamada selecciona una posición de una rejilla de 2 filas y 1 columna.

**Resultado esperado** Dos gráficas colocadas verticalmente.

#### Acceder a una rejilla de paneles

```python
fig, axs = plt.subplots(nrows=2,ncols=2,squeeze=False)
axs[0,0].plot(meses,ventas)
axs[1,1].bar(regiones,ventas_region)
```

`squeeze=False` mantiene el array bidimensional.

**Resultado esperado** Dos paneles con datos y dos vacíos en una rejilla de cuatro.

### sharex y sharey

**Clave** `ejes-compartidos`

**Definición** `sharex` y `sharey` sincronizan límites y escalas entre paneles.

**Búsqueda** sharex, sharey, comparar gráficas

**Para recordar** Comparte escalas cuando las variables y unidades sean comparables.

#### Comparar dos series con la misma escala

```python
fig, axs = plt.subplots(2,1,sharex=True,sharey=True)
axs[0].plot(meses,ventas)
axs[1].plot(meses,metas)
axs[0].set_ylim(0,250)
```

El límite vertical se aplica a ambos paneles.

**Resultado esperado** Dos líneas con la misma escala de 0 a 250 y eje temporal compartido.

### GridSpec

**Clave** `gridspec`

**Definición** `GridSpec` define una cuadrícula en la que los paneles pueden ocupar varias celdas.

**Búsqueda** GridSpec, add_gridspec, rejilla, panel ancho

**Para recordar** Las selecciones de celdas usan índices de Python desde cero.

#### Crear un panel principal ancho

```python
fig = plt.figure(layout='constrained')
gs = fig.add_gridspec(2,2)
a = fig.add_subplot(gs[0,:])
a.plot(meses,ventas)
fig.add_subplot(gs[1,0]).bar(regiones,ventas_region)
fig.add_subplot(gs[1,1]).hist(importes)
```

El primer panel ocupa ambas columnas de la fila superior.

**Resultado esperado** Tres paneles: uno ancho arriba y dos pequeños abajo.

### subplot_mosaic

**Clave** `subplot-mosaic`

**Definición** `subplot_mosaic()` define una composición por nombres y devuelve un diccionario de `Axes`.

**Búsqueda** subplot_mosaic, paneles con nombre, dashboard

**Para recordar** Repite un nombre en celdas contiguas para crear un panel más grande.

#### Organizar un reporte por nombre

```python
fig, axd = plt.subplot_mosaic([['ventas','ventas'],['region','pedidos']],layout='constrained')
axd['ventas'].plot(meses,ventas)
axd['region'].bar(regiones,ventas_region)
axd['pedidos'].hist(importes)
```

Los nombres permiten acceder a los paneles sin índices numéricos.

**Resultado esperado** Un panel ancho arriba y dos abajo.

### add_subplot y add_axes

**Clave** `crear-ejes-manualmente`

**Definición** `add_subplot()` ubica ejes en una rejilla; `add_axes()` permite colocar ejes por coordenadas relativas a la figura.

**Búsqueda** add_axes, add_subplot, inset, posición

**Para recordar** En `add_axes`, los cuatro valores son izquierda, abajo, ancho y alto como fracciones de la figura.

#### Añadir una gráfica pequeña

```python
fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(meses,ventas)
mini = fig.add_axes([.58,.23,.22,.25])
mini.bar(['A','B'],[3,5])
```

El segundo panel se coloca en una región explícita del lienzo.

**Resultado esperado** Una línea y una gráfica de barras pequeña superpuesta.

### subfigures

**Clave** `subfigures`

**Definición** `subfigures()` divide una figura en subfiguras que pueden tener paneles y títulos propios.

**Búsqueda** subfigures, subfigura, composición anidada

**Para recordar** Una subfigura comparte el lienzo principal pero organiza sus elementos internos.

#### Separar dos bloques de un informe

```python
fig = plt.figure(layout='constrained')
a,b = fig.subfigures(1,2)
a.suptitle('Comercial')
a.subplots().plot(meses,ventas)
b.suptitle('Pedidos')
b.subplots().hist(importes)
```

Cada subfigura tiene su título y su panel.

**Resultado esperado** Dos bloques titulados Comercial y Pedidos.

### layout, tight_layout y subplots_adjust

**Clave** `espaciado`

**Definición** Los motores de layout ajustan posiciones para reducir solapamientos; `subplots_adjust()` ajusta márgenes manualmente.

**Búsqueda** tight_layout, constrained, layout, subplots_adjust

**Para recordar** Elige un método; no mezcles `tight_layout()` con layout constrained.

#### Ajustar automáticamente dos paneles

```python
fig, axs = plt.subplots(1,2,layout='constrained')
axs[0].bar(meses,ventas)
axs[1].hist(importes)
axs[0].tick_params(axis='x',labelrotation=45)
```

Constrained reserva espacio para las etiquetas.

**Resultado esperado** Dos paneles con espacio para las marcas rotadas.

#### Ajustar una figura después de dibujar

```python
fig, ax = plt.subplots()
ax.bar(meses,ventas)
ax.tick_params(axis='x',labelrotation=45)
fig.tight_layout()
```

El ajuste se calcula con las decoraciones existentes.

**Resultado esperado** Etiquetas rotadas con margen inferior ajustado.

#### Fijar márgenes a mano

```python
fig, axs = plt.subplots(2,1)
axs[0].plot(meses,ventas)
axs[1].plot(meses,metas)
fig.subplots_adjust(hspace=.5,bottom=.15)
```

`hspace` aumenta la separación entre filas.

**Resultado esperado** Dos paneles con separación vertical mayor.

## Ejes secundarios

**Clave** `ejes-secundarios`

### Definición

**Clave** `definicion`

**Definición** Un panel puede incluir un eje adicional para otra variable o para una conversión de unidades.

**Búsqueda** twinx, twiny, secondary_axis, doble eje

**Para recordar** No interpretes el cruce de líneas con unidades distintas como igualdad numérica.

#### Mostrar ventas y conversión

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas,color='tab:blue')
b = ax.twinx()
b.plot(meses,conversion,color='tab:orange')
ax.set_ylabel('Ventas')
b.set_ylabel('Conversión')
```

Ambas series comparten x, pero tienen escalas y independientes.

**Resultado esperado** Un eje izquierdo de ventas y otro derecho de conversión.

### twinx y twiny

**Clave** `twinx-twiny`

**Definición** `twinx()` comparte x con un y independiente; `twiny()` comparte y con un x independiente.

**Búsqueda** twinx, twiny, eje doble

**Para recordar** Etiqueta ambas escalas y evita comparar sus alturas directamente.

#### Añadir un eje superior independiente

```python
fig, ax = plt.subplots()
ax.plot([1,2,3],[10,20,30])
b = ax.twiny()
b.set_xlim(0,100)
b.set_xlabel('Índice alternativo')
```

El eje superior tiene sus propios límites x.

**Resultado esperado** Dos ejes horizontales con un eje y compartido.

### secondary_xaxis y secondary_yaxis

**Clave** `secondary-axis`

**Definición** Un eje secundario representa una transformación invertible de los valores del eje principal.

**Búsqueda** secondary_xaxis, secondary_yaxis, conversión de unidades

**Para recordar** Proporciona una función de ida y otra de vuelta.

#### Mostrar horas y minutos

```python
fig, ax = plt.subplots()
ax.plot([1,2,3],[10,20,30])
ax.set_xlabel('Horas')
sec = ax.secondary_xaxis('top',functions=(lambda h:h*60,lambda m:m/60))
sec.set_xlabel('Minutos')
```

60 minutos equivalen a una hora en las dos escalas.

**Resultado esperado** Eje superior en minutos e inferior en horas.

#### Mostrar miles de pesos y pesos

```python
fig, ax = plt.subplots()
ax.bar(regiones,ventas_region)
sec = ax.secondary_yaxis('right',functions=(lambda k:k*1000,lambda p:p/1000))
sec.set_ylabel('MXN')
```

La escala derecha equivale a la izquierda multiplicada por 1000.

**Resultado esperado** Dos escalas verticales equivalentes.

## Anotaciones y referencias

**Clave** `anotaciones`

### Definición

**Clave** `definicion`

**Definición** Las anotaciones, textos y líneas de referencia añaden contexto a puntos, umbrales o periodos.

**Búsqueda** annotate, text, meta, línea de referencia

**Para recordar** Destaca lo que aporta información, no cada elemento por defecto.

#### Mostrar una meta comercial

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas,marker='o')
ax.axhline(180,linestyle='--',label='Meta')
ax.legend()
```

La línea horizontal representa una referencia constante.

**Resultado esperado** Una línea de ventas y otra de meta a 180.

### text

**Clave** `text`

**Definición** `text()` coloca texto en una posición de datos por defecto.

**Búsqueda** text, etiqueta manual, coordenadas

**Para recordar** La posición se interpreta en coordenadas de los datos salvo que se indique otra transformación.

#### Etiquetar el último mes

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
ax.text(5,210,'210',ha='right',va='bottom')
```

La posición categórica 5 corresponde a junio.

**Resultado esperado** Texto 210 junto al punto de junio.

### annotate

**Clave** `annotate`

**Definición** `annotate()` conecta un texto con una coordenada concreta, opcionalmente mediante una flecha.

**Búsqueda** annotate, xy, xytext, arrowprops

**Para recordar** `xy` apunta al dato y `xytext` ubica la etiqueta.

#### Destacar el máximo

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas,marker='o')
ax.annotate('Máximo',xy=(5,210),xytext=(3.5,220),arrowprops={'arrowstyle':'->'})
```

La flecha apunta a junio.

**Resultado esperado** Una anotación Máximo sobre el último punto.

### bar_label

**Clave** `bar-label`

**Definición** `bar_label()` añade etiquetas numéricas a las barras de un `BarContainer`.

**Búsqueda** bar_label, valores encima de barras

**Para recordar** Guarda el resultado de `bar()` o `barh()` para pasarlo a `bar_label()`.

#### Mostrar el valor sobre cada barra

```python
fig, ax = plt.subplots()
b = ax.bar(regiones,ventas_region)
ax.bar_label(b,padding=3)
ax.set_ylim(0,280)
```

El espacio superior evita que se recorten etiquetas.

**Resultado esperado** Etiquetas 240, 180 y 120 sobre las barras.

### axhline y axvline

**Clave** `lineas-referencia`

**Definición** `axhline()` marca un valor y horizontal; `axvline()` marca un valor x vertical.

**Búsqueda** axhline, axvline, umbral, referencia

**Para recordar** Sus extremos por defecto abarcan el panel, no un rango de datos específico.

#### Marcar una meta y un cambio

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
ax.axhline(180,color='gray',linestyle='--')
ax.axvline(3,color='gray',linestyle=':')
```

La posición 3 corresponde a abril.

**Resultado esperado** Referencias en y=180 y x=abril.

### hlines y vlines

**Clave** `segmentos-referencia`

**Definición** `hlines()` y `vlines()` dibujan segmentos con extremos en coordenadas de datos.

**Búsqueda** hlines, vlines, segmentos, líneas múltiples

**Para recordar** Usa estas funciones cuando necesites limitar la longitud de las referencias.

#### Mostrar segmentos de control

```python
fig, ax = plt.subplots()
ax.plot([0,1,2,3],[10,20,15,30])
ax.hlines([12,25],xmin=0,xmax=2)
ax.vlines([1,3],ymin=0,ymax=[20,30])
```

Los extremos se expresan en las unidades de cada eje.

**Resultado esperado** Dos segmentos horizontales y dos verticales.

### axhspan y axvspan

**Clave** `regiones-destacadas`

**Definición** `axhspan()` sombrea una franja y; `axvspan()` sombrea un intervalo x.

**Búsqueda** axhspan, axvspan, banda, periodo

**Para recordar** Las franjas cubren por defecto toda la extensión perpendicular del panel.

#### Destacar periodo y rango objetivo

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
ax.axhspan(150,180,alpha=.15)
ax.axvspan(2,3,alpha=.1)
```

La franja vertical abarca marzo a abril.

**Resultado esperado** Una banda horizontal de 150 a 180 y una vertical entre ambos meses.

## Fechas y series temporales

**Clave** `fechas-series-temporales`

### Definición

**Clave** `definicion`

**Definición** Matplotlib admite fechas reales y las convierte internamente a coordenadas temporales. Esto permite representar intervalos de tiempo con sus distancias correctas.

**Búsqueda** datetime, fechas, series temporales, matplotlib.dates

**Para recordar** Convierte textos a fechas y ordena cronológicamente antes de dibujar.

#### Dibujar ventas con fechas reales

```python
fig, ax = plt.subplots()
ax.plot(fechas,ventas,marker='o')
fig.autofmt_xdate()
```

Las fechas proceden del dataset compartido.

**Resultado esperado** Seis puntos entre enero y junio de 2026, con etiquetas temporales.

### DateFormatter

**Clave** `date-formatter`

**Definición** `DateFormatter` aplica un formato de fecha a las etiquetas de las marcas.

**Búsqueda** DateFormatter, strftime, fechas, %Y-%m

**Para recordar** El formato de las etiquetas no cambia las fechas originales.

#### Mostrar año y mes

```python
fig, ax = plt.subplots()
ax.plot(fechas,ventas)
ax.xaxis.set_major_locator(mdates.MonthLocator())
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
fig.autofmt_xdate()
```

Se muestra una marca por mes.

**Resultado esperado** Etiquetas como 2026-01 y 2026-02.

### DateLocator y AutoDateLocator

**Clave** `date-locators`

**Definición** Los localizadores de fechas eligen marcas según intervalos de calendario. `AutoDateLocator` adapta las marcas a la escala visible.

**Búsqueda** DateLocator, MonthLocator, DayLocator, YearLocator, AutoDateLocator, ConciseDateFormatter

**Para recordar** Combina el localizador con un formato de fecha adecuado.

#### Mostrar marcas bimestrales

```python
fig, ax = plt.subplots()
ax.plot(fechas,ventas)
ax.xaxis.set_major_locator(mdates.MonthLocator(bymonth=[1,3,5]))
ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
```

Se fijan los meses 1, 3 y 5.

**Resultado esperado** Marcas en enero, marzo y mayo de 2026.

#### Adaptar etiquetas automáticamente

```python
fig, ax = plt.subplots()
ax.plot(fechas,ventas)
loc = mdates.AutoDateLocator()
ax.xaxis.set_major_locator(loc)
ax.xaxis.set_major_formatter(mdates.ConciseDateFormatter(loc))
```

El formato evita repetir información innecesaria.

**Resultado esperado** Etiquetas abreviadas que se ajustan al rango temporal.

## Integración con NumPy y pandas

**Clave** `numpy-pandas`

### Definición

**Clave** `definicion`

**Definición** Matplotlib recibe arrays de NumPy y datos de pandas. Los métodos de pandas pueden crear gráficas de Matplotlib directamente.

**Búsqueda** numpy, pandas, DataFrame, Series, plot

**Para recordar** Prepara los datos primero; visualiza después.

#### Dibujar una columna del DataFrame

```python
fig, ax = plt.subplots()
ax.plot(df['mes'],df['ventas'])
```

Cada fila del DataFrame aporta un punto.

**Resultado esperado** La línea de las seis ventas mensuales.

### Arrays NumPy

**Clave** `arrays-numpy`

**Definición** Los arrays permiten calcular nuevas series mediante operaciones vectorizadas y pasarlas a Matplotlib.

**Búsqueda** numpy, array, vectorización

**Para recordar** Los arrays x e y de una serie deben tener dimensiones compatibles.

#### Calcular la desviación respecto a la meta

```python
fig, ax = plt.subplots()
ax.bar(meses,ventas-metas)
ax.axhline(0,color='gray')
```

La resta calcula la diferencia mes a mes.

**Resultado esperado** Barras de -10, 10, -20, 10, -20 y 20.

### DataFrame.plot

**Clave** `dataframe-plot`

**Definición** `DataFrame.plot()` permite elegir columnas y el tipo de visualización con el backend Matplotlib.

**Búsqueda** DataFrame.plot, kind, x, y, ax

**Para recordar** Pasa `ax` para controlar la ubicación de la gráfica.

#### Dibujar ventas y metas desde columnas

```python
fig, ax = plt.subplots()
df.plot(x='mes',y=['ventas','meta'],ax=ax,kind='line')
```

Pandas envía las dos columnas al mismo panel.

**Resultado esperado** Dos líneas y una leyenda con los nombres de las columnas.

### Series.plot

**Clave** `series-plot`

**Definición** `Series.plot()` usa el índice como coordenada o etiqueta y los valores como magnitud.

**Búsqueda** Series.plot, pandas, index

**Para recordar** Configura el índice cuando quieras que aparezcan nombres de categorías.

#### Dibujar ventas regionales

```python
fig, ax = plt.subplots()
s = pd.Series(ventas_region,index=regiones)
s.plot(kind='bar',ax=ax)
```

El índice contiene los nombres de regiones.

**Resultado esperado** Barras de 240, 180 y 120.

### Preparación y agregación

**Clave** `preparacion-datos`

**Definición** Antes de graficar, agrupa, suma y ordena los registros si necesitas comparar categorías resumidas.

**Búsqueda** groupby, sum, sort_values, agregación

**Para recordar** Una barra debe representar la unidad de análisis que indica su etiqueta.

#### Resumir transacciones por región

```python
fig, ax = plt.subplots()
totales = transacciones.groupby('region')['importe'].sum().sort_values(ascending=False)
ax.bar(totales.index,totales.values)
```

Se suman las transacciones antes de dibujar.

**Resultado esperado** Barras Norte 240, Centro 180 y Sur 120.

### NaN y datos enmascarados

**Clave** `datos-faltantes`

**Definición** `NaN` y los valores enmascarados interrumpen líneas o excluyen marcadores en funciones compatibles.

**Búsqueda** NaN, masked array, valores faltantes

**Para recordar** No reemplaces automáticamente un faltante por cero: significan cosas diferentes.

#### Mostrar una ausencia de información

```python
fig, ax = plt.subplots()
ax.plot([1,2,3,4],[120,np.nan,150,180],marker='o')
```

El segundo dato no se dibuja ni se conecta a través de la ausencia.

**Resultado esperado** Un punto aislado en x=1 y un tramo entre x=3 y x=4.

#### Ocultar observaciones por condición

```python
fig, ax = plt.subplots()
serie = np.ma.masked_where(ventas<150,ventas)
ax.plot(meses,serie,marker='o')
```

La máscara excluye los valores menores a 150.

**Resultado esperado** Cuatro puntos visibles; la línea se interrumpe donde faltan datos.

### Correlación

**Clave** `correlacion`

**Definición** Una matriz de correlación resume asociaciones lineales entre columnas numéricas y puede mostrarse como mapa de calor.

**Búsqueda** corr, correlación, heatmap, pandas

**Para recordar** Los coeficientes de Pearson están entre -1 y 1; correlación no implica causalidad.

#### Visualizar correlaciones

```python
fig, ax = plt.subplots()
corr = df[['ventas','meta','publicidad']].corr()
im = ax.imshow(corr,vmin=-1,vmax=1,cmap='coolwarm')
ax.set_xticks(range(3),corr.columns)
ax.set_yticks(range(3),corr.columns)
fig.colorbar(im,ax=ax)
```

La escala simétrica permite distinguir signos.

**Resultado esperado** Matriz 3 × 3 simétrica con diagonal igual a 1.

## Exportación

**Clave** `exportacion`

### Definición

**Clave** `definicion`

**Definición** `savefig()` exporta una figura a un archivo. El formato suele inferirse de la extensión.

**Búsqueda** savefig, exportar gráfica, guardar

**Para recordar** Guarda la figura concreta con `fig.savefig()`.

#### Guardar una gráfica de ventas

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
fig.savefig(salida/'ventas.png',dpi=150)
```

La ruta pertenece al directorio de ejemplos.

**Resultado esperado** Archivo PNG con la línea de ventas.

### dpi

**Clave** `dpi`

**Definición** `dpi` indica puntos por pulgada para la salida rasterizada y afecta su resolución.

**Búsqueda** dpi, resolución, píxeles, calidad

**Para recordar** A mayor DPI, más píxeles para un tamaño físico fijo.

#### Exportar una figura de 4 por 3 pulgadas

```python
fig, ax = plt.subplots(figsize=(4,3))
ax.plot(meses,ventas)
fig.savefig(salida/'ventas-300.png',dpi=300)
```

Sin recorte adicional, multiplica las pulgadas por el DPI.

**Resultado esperado** PNG de 1200 × 900 píxeles con la configuración compartida.

### bbox_inches y transparent

**Clave** `recorte-transparencia`

**Definición** `bbox_inches='tight'` ajusta el área exportada a las decoraciones; `transparent=True` hace transparentes los fondos de figura y ejes durante la exportación.

**Búsqueda** bbox_inches, tight, transparent, fondo

**Para recordar** El recorte puede cambiar las dimensiones finales del archivo.

#### Guardar con fondo transparente y recorte

```python
fig, ax = plt.subplots()
ax.bar(regiones,ventas_region)
fig.savefig(salida/'regiones.png',bbox_inches='tight',transparent=True)
```

El fondo no se pinta como opaco.

**Resultado esperado** PNG con canal alfa y área ajustada al contenido.

### PNG, JPG, SVG y PDF

**Clave** `formatos`

**Definición** PNG y JPG son rasterizados; SVG y PDF pueden conservar líneas y texto como elementos vectoriales.

**Búsqueda** png, jpg, svg, pdf, vector, raster

**Para recordar** JPG no admite transparencia; SVG y PDF pueden incluir elementos rasterizados.

#### Exportar en varios formatos

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
for ext in ['png','jpg','svg','pdf']:
    fig.savefig(salida/f'ventas.{ext}')
```

La extensión selecciona el formato en los backends compatibles.

**Resultado esperado** Cuatro archivos con la misma gráfica en formatos diferentes.

## Gestión y modificación de figuras

**Clave** `gestion-figuras`

### Definición

**Clave** `definicion`

**Definición** Matplotlib permite acceder a figuras activas, limpiar contenido y modificar objetos después de crearlos.

**Búsqueda** gca, gcf, clf, cla, Artist

**Para recordar** Conserva referencias explícitas cuando trabajes con varias figuras.

#### Modificar una línea existente

```python
fig, ax = plt.subplots()
linea, = ax.plot(meses,ventas)
linea.set_ydata(metas)
ax.relim()
ax.autoscale_view()
```

La serie se modifica sin crear otra línea.

**Resultado esperado** Una única línea con valores de la meta.

### gca y gcf

**Clave** `figura-ejes-activos`

**Definición** `gca()` obtiene los ejes actuales; `gcf()` obtiene la figura actual. Pueden crearlos si no existen.

**Búsqueda** gca, gcf, estado actual

**Para recordar** No dependas del estado activo en composiciones complejas.

#### Comprobar referencias activas

```python
fig, ax = plt.subplots()
print(plt.gcf() is fig, plt.gca() is ax)
```

La figura recién creada está activa.

**Resultado esperado** Salida `True True`.

### cla, clf y close

**Clave** `limpiar-cerrar`

**Definición** `cla()` limpia los ejes activos; `clf()` limpia la figura activa; `close()` deja de gestionarla desde pyplot.

**Búsqueda** cla, clf, close, limpiar gráfica

**Para recordar** Limpiar conserva el contenedor correspondiente; cerrar elimina su registro en pyplot.

#### Limpiar un panel y después la figura

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
plt.cla()
print(len(ax.lines))
plt.clf()
print(len(fig.axes))
plt.close(fig)
```

Primero se borran las líneas y luego los ejes de la figura.

**Resultado esperado** Salida `0` y `0`; la figura se cierra.

### Artist, Line2D, Patch y Collection

**Clave** `artists`

**Definición** `Artist` es la clase base de muchos elementos dibujables. Las líneas son `Line2D`, las formas incluyen `Patch` y los grupos de objetos usan `Collection`.

**Búsqueda** Artist, Line2D, Patch, Collection, PathCollection

**Para recordar** Los métodos dependen del tipo de objeto devuelto por cada función.

#### Inspeccionar los tipos de objetos

```python
fig, ax = plt.subplots()
linea, = ax.plot(meses,ventas)
barras = ax.bar(meses,ventas,alpha=.2)
puntos = ax.scatter(meses,ventas)
print(type(linea).__name__,type(barras[0]).__name__,type(puntos).__name__)
```

Cada función devuelve un objeto o contenedor específico.

**Resultado esperado** Salida `Line2D Rectangle PathCollection`.

### set, get y remove

**Clave** `modificar-artists`

**Definición** Los métodos `set_*` o `set()` cambian propiedades, los `get_*` las consultan y `remove()` retira un objeto.

**Búsqueda** set, get_color, set_color, remove

**Para recordar** Tras cambiar datos, recalcula límites si es necesario; al retirar un objeto, actualiza la leyenda si procede.

#### Cambiar y retirar una serie

```python
fig, ax = plt.subplots()
a, = ax.plot(meses,ventas)
b, = ax.plot(meses,metas)
a.set(color='black',linewidth=3)
print(a.get_color())
b.remove()
```

La línea de meta desaparece y ventas cambia de estilo.

**Resultado esperado** Salida `black`; queda una sola línea.

## Estilos y configuración reutilizable

**Clave** `configuracion`

### Definición

**Clave** `definicion`

**Definición** Los estilos y parámetros globales permiten aplicar una apariencia coherente a varias figuras sin repetir argumentos.

**Búsqueda** plt.style.use, rcParams, mplstyle

**Para recordar** Una configuración local evita que un ejemplo afecte a los demás.

#### Aplicar un estilo solo dentro de un bloque

```python
with plt.style.context('ggplot'):
    fig, ax = plt.subplots()
    ax.plot(meses,ventas)
```

El contexto restaura la configuración al terminar.

**Resultado esperado** Figura con el estilo ggplot; la configuración posterior no se altera.

### plt.style.use y rcParams

**Clave** `style-rcparams`

**Definición** `plt.style.use()` carga un conjunto de propiedades; `rcParams` es el diccionario de configuración actual.

**Búsqueda** style.use, rcParams, configuración global

**Para recordar** Usa `rc_context()` para contener los cambios cuando no quieres efectos globales.

#### Definir un grosor por defecto

```python
with mpl.rc_context():
    plt.style.use('ggplot')
    mpl.rcParams['lines.linewidth'] = 3
    fig, ax = plt.subplots()
    linea, = ax.plot(meses,ventas)
    print(linea.get_linewidth())
```

La línea hereda la propiedad configurada.

**Resultado esperado** Salida `3.0`.

### rc_context y archivos mplstyle

**Clave** `estilos-reutilizables`

**Definición** `rc_context()` limita cambios a un bloque; los archivos `.mplstyle` guardan parámetros de estilo reutilizables.

**Búsqueda** rc_context, mplstyle, tema personalizado

**Para recordar** Una línea del archivo de estilo tiene la forma `clave: valor`.

#### Crear y aplicar un archivo de estilo

```python
ruta = salida/'reporte.mplstyle'
ruta.write_text('axes.grid: True\nlines.linewidth: 2.5\n',encoding='utf-8')
with plt.style.context(str(ruta)):
    fig, ax = plt.subplots()
    linea, = ax.plot(meses,ventas)
    print(linea.get_linewidth())
```

El archivo define dos propiedades reutilizables.

**Resultado esperado** Archivo de estilo, gráfica con cuadrícula y salida `2.5`.

### cycler y set_prop_cycle

**Clave** `ciclo-de-propiedades`

**Definición** `cycler` define secuencias de propiedades que Matplotlib aplica a series sucesivas.

**Búsqueda** cycler, set_prop_cycle, ciclo de colores

**Para recordar** Con `+` combinas ciclos de igual longitud elemento por elemento.

#### Asignar estilos a dos series

```python
fig, ax = plt.subplots()
ax.set_prop_cycle(cycler(color=['navy','orange']) + cycler(linestyle=['-','--']))
ax.plot(meses,ventas)
ax.plot(meses,metas)
```

La primera serie recibe azul marino y continua; la segunda naranja y discontinua.

**Resultado esperado** Dos líneas con los estilos definidos.

### font_manager y MathText

**Clave** `fuentes-mathtext`

**Definición** `font_manager` localiza fuentes instaladas; MathText interpreta expresiones matemáticas delimitadas por signos `$`.

**Búsqueda** font_manager, FontProperties, mathtext, fórmula

**Para recordar** MathText no requiere una instalación de LaTeX para la sintaxis compatible.

#### Usar una fuente disponible y una fórmula

```python
fig, ax = plt.subplots()
fp = font_manager.FontProperties(family='DejaVu Sans')
ax.plot(meses,ventas)
ax.set_title(r'Ventas: $\mu$',fontproperties=fp)
```

MathText representa el símbolo griego mu.

**Resultado esperado** Título Ventas: μ en una fuente incluida con Matplotlib.

## Transformaciones y formas

**Clave** `transformaciones-formas`

### Definición

**Clave** `definicion`

**Definición** Una transformación indica en qué sistema de coordenadas se interpreta una posición. Las formas se añaden al panel como objetos.

**Búsqueda** transData, transAxes, transFigure, patch

**Para recordar** Elige coordenadas de datos para valores y relativas para elementos fijos de presentación.

#### Colocar una nota fija en un panel

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
ax.text(.02,.95,'Reporte',transform=ax.transAxes,va='top')
```

En coordenadas de Axes, (0,0) es abajo a la izquierda y (1,1) arriba a la derecha.

**Resultado esperado** Texto en la esquina superior izquierda del área de dibujo.

### transData, transAxes y transFigure

**Clave** `coordenadas`

**Definición** `transData` interpreta valores de datos; `transAxes` usa fracciones del panel; `transFigure` usa fracciones de la figura.

**Búsqueda** transData, transAxes, transFigure, coordenadas

**Para recordar** Un texto en coordenadas relativas permanece en esa zona aunque cambien los límites de datos.

#### Comparar tres sistemas

```python
fig, ax = plt.subplots()
ax.plot([0,1,2],[10,20,30])
ax.text(1,20,'Dato',transform=ax.transData)
ax.text(.02,.9,'Panel',transform=ax.transAxes)
fig.text(.02,.02,'Figura',transform=fig.transFigure)
```

Cada texto usa un sistema de referencia diferente.

**Resultado esperado** Texto sobre el punto central, dentro del panel y en la esquina de la figura.

### Rectangle, Circle, Polygon y add_patch

**Clave** `formas`

**Definición** Los objetos de `matplotlib.patches` representan formas; `add_patch()` los añade a un `Axes`.

**Búsqueda** Rectangle, Circle, Polygon, add_patch, geometría

**Para recordar** Las coordenadas por defecto se interpretan como datos; usa aspecto igual para círculos sin deformación.

#### Añadir formas de referencia

```python
fig, ax = plt.subplots()
ax.add_patch(Rectangle((0,0),2,1,fill=False))
ax.add_patch(Circle((3,1),.5,fill=False))
ax.add_patch(Polygon([[4,0],[5,0],[4.5,1]],fill=False))
ax.set_xlim(-.5,6)
ax.set_ylim(-.5,2)
ax.set_aspect('equal')
```

Los parámetros definen posición y dimensiones de las formas.

**Resultado esperado** Un rectángulo, un círculo y un triángulo visibles.

## Imágenes y campos

**Clave** `imagenes-campos`

### Definición

**Clave** `definicion`

**Definición** Matplotlib puede cargar, visualizar y guardar imágenes; también dibuja campos vectoriales y distribuciones temporales especializadas.

**Búsqueda** imread, imsave, imshow, quiver, streamplot

**Para recordar** Una matriz de píxeles no es lo mismo que una figura completa exportada.

#### Mostrar una imagen RGB sintética

```python
fig, ax = plt.subplots()
ax.imshow(np.array([[[1.,0,0],[0,1.,0]],[[0,0,1.],[1.,1.,1.]]]),interpolation='nearest')
```

Los tres componentes de cada píxel son rojo, verde y azul.

**Resultado esperado** Imagen de 2 × 2 píxeles: rojo, verde, azul y blanco.

### imread e imsave

**Clave** `leer-guardar-imagen`

**Definición** `imread()` carga píxeles desde un archivo; `imsave()` guarda un array como imagen.

**Búsqueda** imread, imsave, píxeles, RGB, RGBA

**Para recordar** `imsave()` no guarda títulos ni ejes; para eso usa `savefig()`.

#### Guardar y recuperar una imagen

```python
ruta = salida/'matriz.png'
plt.imsave(ruta,matriz,cmap='viridis')
img = plt.imread(ruta)
fig, ax = plt.subplots()
ax.imshow(img)
print(img.shape)
```

La matriz escalar se convirtió a colores al guardarla.

**Resultado esperado** Salida `(3, 3, 4)` para el PNG RGBA y nueve píxeles visibles.

### quiver

**Clave** `quiver`

**Definición** `quiver()` dibuja flechas a partir de posiciones y componentes de vectores.

**Búsqueda** quiver, vectores, dirección

**Para recordar** Las componentes U y V indican dirección horizontal y vertical.

#### Representar direcciones de flujo

```python
fig, ax = plt.subplots()
ax.quiver([0,1],[0,0],[1,0],[0,1],angles='xy',scale_units='xy',scale=1)
ax.set_xlim(-.5,2)
ax.set_ylim(-.5,1.5)
ax.set_aspect('equal')
```

La primera flecha tiene vector (1,0) y la segunda (0,1).

**Resultado esperado** Una flecha hacia la derecha y otra hacia arriba.

### streamplot

**Clave** `streamplot`

**Definición** `streamplot()` dibuja líneas que siguen un campo vectorial definido sobre una rejilla regular.

**Búsqueda** streamplot, flujo, campo vectorial

**Para recordar** Los arrays U y V deben coincidir con las dimensiones de la rejilla.

#### Representar circulación

```python
fig, ax = plt.subplots()
ax.streamplot(g,g,-Y,X,density=.8)
ax.set_aspect('equal')
```

El campo (-Y,X) gira alrededor del origen.

**Resultado esperado** Líneas de flujo circulares en sentido antihorario.

### broken_barh

**Clave** `broken-barh`

**Definición** `broken_barh()` dibuja segmentos horizontales con posiciones de inicio y duración.

**Búsqueda** broken_barh, gantt, intervalos, cronograma

**Para recordar** Los pares x son `(inicio, duración)`, no `(inicio, fin)`.

#### Mostrar fases de un proyecto

```python
fig, ax = plt.subplots()
ax.broken_barh([(0,2),(3,2)],(10,5))
ax.broken_barh([(1,4)],(20,5))
ax.set_yticks([12.5,22.5],['A','B'])
ax.set_xlabel('Días')
```

Cada fila tiene sus propios intervalos.

**Resultado esperado** A ocupa días 0–2 y 3–5; B ocupa 1–5.

## Proyecciones 3D y polares

**Clave** `proyecciones`

### Definición

**Clave** `definicion`

**Definición** Las proyecciones definen cómo se representan las coordenadas. Matplotlib incluye ejes cartesianos, polares y tridimensionales.

**Búsqueda** projection, polar, 3d, mplot3d

**Para recordar** Usa proyecciones especiales solo si la naturaleza de los datos lo requiere.

#### Representar tres variables

```python
fig, ax = plt.subplots(subplot_kw={'projection':'3d'})
ax.scatter(publicidad,ventas,pedidos)
ax.set_xlabel('Publicidad')
ax.set_ylabel('Ventas')
ax.set_zlabel('Pedidos')
```

El tercer eje representa pedidos.

**Resultado esperado** Seis observaciones en un espacio tridimensional.

### plot_surface

**Clave** `plot-surface`

**Definición** `plot_surface()` dibuja una superficie a partir de matrices X, Y y Z compatibles en un Axes 3D.

**Búsqueda** plot_surface, mplot3d, superficie

**Para recordar** Las tres matrices deben tener dimensiones compatibles.

#### Representar una superficie de intensidad

```python
fig, ax = plt.subplots(subplot_kw={'projection':'3d'})
ax.plot_surface(X,Y,Z,cmap='viridis')
```

Z representa la altura para cada posición de X e Y.

**Resultado esperado** Superficie con forma de cuenco.

### Coordenadas polares

**Clave** `polar`

**Definición** Un eje polar representa un ángulo theta en radianes y una distancia radial r.

**Búsqueda** projection='polar', radianes, theta, r

**Para recordar** Convierte grados a radianes si los datos originales están en grados.

#### Representar magnitudes por dirección

```python
fig, ax = plt.subplots(subplot_kw={'projection':'polar'})
ax.scatter(np.deg2rad([0,90,180,270]),[1,2,3,4])
```

Los ángulos se convierten antes de dibujar.

**Resultado esperado** Cuatro puntos en direcciones cardinales con radios 1, 2, 3 y 4.

## Interactividad, animación y backends

**Clave** `interactividad`

### Definición

**Clave** `definicion`

**Definición** Los backends determinan cómo se renderizan y presentan figuras. Con un backend interactivo se pueden usar eventos, widgets y animaciones.

**Búsqueda** backend, interactive, eventos, renderizado

**Para recordar** Un backend de exportación no ofrece necesariamente una ventana interactiva.

#### Consultar el backend activo

```python
print(mpl.get_backend())
```

El backend depende del entorno de ejecución.

**Resultado esperado** Nombre del backend, por ejemplo `Agg` en un entorno sin pantalla.

### Backends e interacción

**Clave** `backends`

**Definición** `Agg` renderiza imágenes sin ventana; backends GUI o de notebook permiten interacción según el entorno.

**Búsqueda** Agg, QtAgg, TkAgg, ipympl, ion, ioff

**Para recordar** Selecciona el backend antes de importar pyplot cuando sea necesario; no lo cambies en mitad de una sesión sin considerar sus efectos.

#### Renderizar sin interfaz gráfica

```python
# Ejecutar en un proceso nuevo, antes de importar pyplot.
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from pathlib import Path
salida = Path('salidas_matplotlib')
salida.mkdir(exist_ok=True)
fig, ax = plt.subplots()
ax.plot([1,2],[3,4])
fig.savefig(salida/'sin-pantalla.png')
```

Agg permite generar archivos sin abrir una ventana.

**Resultado esperado** Archivo PNG generado sin interfaz gráfica.

### Eventos y callbacks

**Clave** `eventos-callbacks`

**Definición** `mpl_connect()` vincula un evento a una función que se ejecuta cuando ocurre.

**Búsqueda** mpl_connect, button_press_event, callback, mpl_disconnect

**Para recordar** Comprueba `event.inaxes` antes de usar coordenadas de datos.

#### Responder a un clic en la gráfica

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas)
def al_clic(event):
    if event.inaxes is ax:
        print(event.xdata,event.ydata)
cid = fig.canvas.mpl_connect('button_press_event',al_clic)
```

`cid` permite desconectar luego el callback con `mpl_disconnect(cid)`.

**Resultado esperado** Con un backend interactivo, un clic dentro del panel imprime sus coordenadas.

### Widgets: Slider y Button

**Clave** `widgets`

**Definición** Los widgets crean controles dentro de la figura. Sus callbacks actualizan los objetos gráficos.

**Búsqueda** Slider, Button, on_changed, on_clicked, draw_idle

**Para recordar** Conserva referencias a los widgets mientras estén en uso; requieren interacción compatible.

#### Ajustar un multiplicador de ventas

```python
fig, ax = plt.subplots()
fig.subplots_adjust(bottom=.25)
linea, = ax.plot(meses,ventas)
ax.set_ylim(0,450)
control = Slider(fig.add_axes([.2,.1,.6,.04]),'Factor',.5,2,valinit=1)
def actualizar(v):
    linea.set_ydata(ventas*v)
    fig.canvas.draw_idle()
control.on_changed(actualizar)
```

El deslizador cambia los valores y solicita redibujar.

**Resultado esperado** Al moverlo a 2, la línea pasa a valores entre 240 y 420.

#### Restablecer una gráfica con un botón

```python
fig, ax = plt.subplots()
fig.subplots_adjust(bottom=.25)
linea, = ax.plot(meses,metas)
boton = Button(fig.add_axes([.7,.08,.2,.08]),'Ventas')
def cambiar(event):
    linea.set_ydata(ventas)
    ax.relim()
    ax.autoscale_view()
    fig.canvas.draw_idle()
boton.on_clicked(cambiar)
```

El callback reemplaza la serie de metas por ventas.

**Resultado esperado** Al hacer clic, se muestra la serie de ventas reales.

### FuncAnimation

**Clave** `func-animation`

**Definición** `FuncAnimation` actualiza una figura a partir de una función llamada para cada frame.

**Búsqueda** FuncAnimation, frames, interval, animación

**Para recordar** Conserva la referencia `ani`; para guardar GIF puedes usar PillowWriter con Pillow instalado.

#### Animar la evolución de ventas

```python
fig, ax = plt.subplots()
linea, = ax.plot([],[],marker='o')
ax.set_xlim(0,5)
ax.set_ylim(0,250)
ax.set_xticks(range(6),meses)
def actualizar(i):
    linea.set_data(np.arange(i+1),ventas[:i+1])
    return linea,
ani = FuncAnimation(fig,actualizar,frames=6,interval=300,repeat=False)
ani.save(salida/'ventas.gif',writer='pillow',fps=3)
```

Cada frame agrega un mes al gráfico.

**Resultado esperado** Un GIF de seis frames lógicos que termina en junio con 210.

## Criterios de visualización analítica

**Clave** `criterios-visualizacion`

### Definición

**Clave** `definicion`

**Definición** La elección de gráfica depende de la pregunta de negocio y del tipo de variable, no solo de la estética.

**Búsqueda** elegir gráfica, pregunta de negocio, interpretación

**Para recordar** Líneas para tendencias, barras para categorías, histogramas para distribuciones y scatter para relaciones.

#### Comparar regiones sin distorsionar magnitudes

```python
fig, ax = plt.subplots()
ax.bar(regiones,ventas_region)
ax.set_ylim(0,260)
ax.set_ylabel('Ventas (miles de MXN)')
```

La escala empieza en cero y tiene una unidad explícita.

**Resultado esperado** Tres barras proporcionales a sus valores.

### Distribuciones, cuartiles y percentiles

**Clave** `cuartiles-percentiles`

**Definición** Los percentiles describen posiciones de una distribución y el rango intercuartílico mide la amplitud entre Q1 y Q3.

**Búsqueda** percentil, mediana, IQR, outlier, distribución

**Para recordar** Un valor atípico no es necesariamente un error; examina su contexto antes de eliminarlo.

#### Mostrar mediana y percentil 75

```python
fig, ax = plt.subplots()
ax.hist(importes,bins=[0,50,100,150])
p50,p75 = np.percentile(importes,[50,75])
ax.axvline(p50,label='Mediana')
ax.axvline(p75,linestyle='--',label='P75')
ax.legend()
```

Las líneas marcan percentiles calculados desde los datos.

**Resultado esperado** Mediana en 60 y P75 en 90.

### Accesibilidad y contraste

**Clave** `accesibilidad`

**Definición** Las series deben distinguirse por más de un atributo visual; usa contraste, patrones, marcadores y etiquetas.

**Búsqueda** daltonismo, accesibilidad, contraste, paletas

**Para recordar** No dependas exclusivamente del color para comunicar diferencias.

#### Distinguir dos series sin depender del color

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas,color='black',marker='o',label='Real')
ax.plot(meses,metas,color='gray',linestyle='--',marker='s',label='Meta')
ax.legend()
```

Las series tienen trazos y marcadores diferentes.

**Resultado esperado** Dos líneas distinguibles incluso en escala de grises.

### Escalas y comparaciones honestas

**Clave** `escalas-comparacion`

**Definición** Los límites, unidades, proporciones y escalas influyen en la percepción de diferencias.

**Búsqueda** eje truncado, escala engañosa, base cero, comparación

**Para recordar** En barras de magnitudes usa base cero; en líneas un rango acotado puede ser útil si se identifica claramente.

#### Comparar indicadores con base común

```python
fig, ax = plt.subplots()
ax.bar(['A','B'],[95,100])
ax.set_ylim(0,110)
ax.bar_label(ax.containers[0])
```

La diferencia de cinco unidades mantiene su proporción visual.

**Resultado esperado** Barras de alturas 95 y 100, con diferencia pequeña.

### Jerarquía visual y contexto

**Clave** `jerarquia-visual`

**Definición** Un gráfico de negocio comunica una idea principal, identifica unidades y destaca referencias pertinentes.

**Búsqueda** storytelling, títulos, unidades, anotación, KPI

**Para recordar** Elimina adornos que no ayuden a responder la pregunta.

#### Mostrar el mes de mayor venta frente a la meta

```python
fig, ax = plt.subplots()
ax.plot(meses,ventas,marker='o',label='Real')
ax.plot(meses,metas,linestyle='--',label='Meta')
ax.annotate('Máximo: 210',xy=(5,210),xytext=(2.5,225),arrowprops={'arrowstyle':'->'})
ax.set_title('Ventas mensuales y meta')
ax.set_ylabel('Miles de MXN')
ax.legend()
```

Título, unidades y anotación explican la comparación.

**Resultado esperado** Dos series y una anotación que identifica junio como máximo.

## Fuentes

- [Quick start guide](https://matplotlib.org/stable/users/explain/quick_start.html) — Figure, Axes, Axis, interfaces pyplot y orientada a objetos.
- [Plot types](https://matplotlib.org/stable/plot_types/index.html) y [galería de ejemplos](https://matplotlib.org/stable/gallery/index.html) — tipos de gráfica, variantes y ejemplos especializados.
- [API de Axes](https://matplotlib.org/stable/api/axes_api.html) — funciones de dibujo, límites, ejes, etiquetas, anotaciones y escalas.
- [API de pyplot](https://matplotlib.org/stable/api/pyplot_summary.html) — gestión de figuras, estados, imágenes y métodos de dibujo.
- [API de Figure](https://matplotlib.org/stable/api/figure_api.html) — tamaño, composición, subfiguras, exportación y colorbar.
- [API de ecdf](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.ecdf.html) — distribución acumulada empírica y disponibilidad de la función.
- [API de ticker](https://matplotlib.org/stable/api/ticker_api.html) — locators y formatters numéricos.
- [API de dates](https://matplotlib.org/stable/api/dates_api.html) — representación temporal, localizadores y formatos.
- [Normalización de mapas de colores](https://matplotlib.org/stable/users/explain/colors/colormapnorms.html) y [API de colors](https://matplotlib.org/stable/api/colors_api.html) — Normalize, LogNorm, BoundaryNorm y mapas personalizados.
- [Elección de mapas de colores](https://matplotlib.org/stable/users/explain/colors/colormaps.html) — criterios perceptuales, escalas secuenciales, divergentes y cualitativas.
- [Composición de Axes](https://matplotlib.org/stable/users/explain/axes/arranging_axes.html), [subplot_mosaic](https://matplotlib.org/stable/users/explain/axes/mosaic.html) y [constrained layout](https://matplotlib.org/stable/users/explain/axes/constrainedlayout_guide.html) — distribución de paneles y espaciado.
- [Transformaciones](https://matplotlib.org/stable/users/explain/artists/transforms_tutorial.html) y [Artist API](https://matplotlib.org/stable/api/artist_api.html) — sistemas de coordenadas y objetos gráficos.
- [Personalización con estilos y rcParams](https://matplotlib.org/stable/users/explain/customizing.html) — temas, archivos mplstyle y configuración.
- [API de font_manager](https://matplotlib.org/stable/api/font_manager_api.html) y [MathText](https://matplotlib.org/stable/users/explain/text/mathtext.html) — fuentes y notación matemática.
- [Figure.savefig](https://matplotlib.org/stable/api/_as_gen/matplotlib.figure.Figure.savefig.html) — exportación, DPI, formatos, recorte y transparencia.
- [Visualización con pandas](https://pandas.pydata.org/docs/user_guide/visualization.html) — métodos plot de Series y DataFrame.
- [Backends](https://matplotlib.org/stable/users/explain/figure/backends.html), [eventos](https://matplotlib.org/stable/users/explain/figure/event_handling.html), [widgets](https://matplotlib.org/stable/api/widgets_api.html) y [animaciones](https://matplotlib.org/stable/api/animation_api.html) — renderizado, callbacks, controles y FuncAnimation.
- [mplot3d](https://matplotlib.org/stable/users/explain/toolkits/mplot3d.html) y [proyección polar](https://matplotlib.org/stable/api/projections/polar.html) — coordenadas tridimensionales y polares.
- [Documentación de la versión 3.10.8](https://matplotlib.org/3.10.8/) — entorno de referencia para reproducir las fichas.
