# Seaborn

**Clave** `seaborn`

**Área** Análisis de datos (ubicación propuesta)

**Resumen** Visualización estadística de datos tabulares mediante gráficos relacionales, distribuciones, comparaciones, regresiones y cuadrículas.

**Alcance** Desde los fundamentos para Data Analyst / Business Analyst Jr hasta personalización, estimación estadística, facetas y la interfaz declarativa Objects; incluye preparación de datos con pandas e integración con Matplotlib. No es un inventario de todos los argumentos internos de la biblioteca.

**Entorno** Python 3.11+, Seaborn 0.13.2, pandas 2.x, NumPy 1.26–2.x, Matplotlib 3.8–3.10, SciPy y statsmodels para las funciones estadísticas que los requieren. Los ejemplos usan la API 0.13.2. En algunos entornos Matplotlib 3.10 produce errores de selección automática de color con Seaborn 0.13.2; se especifica `color` en los ejemplos afectados.

## Datos compartidos

Dataset sintético de práctica (no es un dataset publicado de AllDoc). Cada fila de `ventas` corresponde a una sucursal en una fecha, no a un pedido individual. Hay cuatro sucursales (una por combinación de región y canal), cuatro fechas y 16 registros. `ingresos` e `inversion` son montos en unidades monetarias, `pedidos` es el conteo diario, `satisfaccion` es un indicador de 0 a 5 y `meta` indica si se alcanzaron ingresos de 140. `diarias` es una tabla ancha de ingresos totales por fecha y canal; `matriz` resume ingresos por región y canal; `simulacion` contiene datos sintéticos para ejemplos con más observaciones.

Instalación en un entorno de Python:

```bash
python -m pip install "seaborn==0.13.2" "pandas>=2,<3" "numpy>=1.26,<3" "matplotlib>=3.8,<3.11" scipy statsmodels
```

Ejecuta esta preparación una vez. Cada ejemplo es independiente y parte de estos datos; si se ejecuta en un script, agrega `plt.show()` al final de los ejemplos gráficos que no lo incluyan. En un notebook suelen mostrarse automáticamente. Cierra figuras anteriores con `plt.close("all")` antes de otro ejemplo si utilizas una sesión persistente. Los ejemplos de tema pueden cambiar la configuración global; `sns.set_theme()` restaura el tema de trabajo. Los resultados se describen como esperados, no como capturas del entorno de AllDoc.

```python
import numpy as np
import pandas as pd
import seaborn as sns
import seaborn.objects as so
import matplotlib.pyplot as plt

sns.set_theme()

ventas = pd.DataFrame([
    # fecha, sucursal, region, canal, ingresos, inversion, pedidos, satisfaccion
    ("2026-09-01", "N1", "Norte", "Online", 100, 24, 11, 4.0),
    ("2026-09-01", "N2", "Norte", "Tienda", 80, 21, 8, 3.6),
    ("2026-09-01", "S1", "Sur", "Online", 120, 28, 12, 4.1),
    ("2026-09-01", "S2", "Sur", "Tienda", 100, 25, 10, 3.7),
    ("2026-09-02", "N1", "Norte", "Online", 120, 38, 11, 4.2),
    ("2026-09-02", "N2", "Norte", "Tienda", 100, 25, 10, 3.8),
    ("2026-09-02", "S1", "Sur", "Online", 140, 35, 15, 4.3),
    ("2026-09-02", "S2", "Sur", "Tienda", 120, 29, 11, 3.9),
    ("2026-09-03", "N1", "Norte", "Online", 140, 33, 13, 4.4),
    ("2026-09-03", "N2", "Norte", "Tienda", 120, 31, 13, 4.0),
    ("2026-09-03", "S1", "Sur", "Online", 160, 43, 15, 4.5),
    ("2026-09-03", "S2", "Sur", "Tienda", 140, 36, 15, 4.1),
    ("2026-09-04", "N1", "Norte", "Online", 160, 44, 17, 4.6),
    ("2026-09-04", "N2", "Norte", "Tienda", 140, 37, 13, 4.2),
    ("2026-09-04", "S1", "Sur", "Online", 180, 49, 18, 4.7),
    ("2026-09-04", "S2", "Sur", "Tienda", 160, 42, 16, 4.3),
], columns=["fecha", "sucursal", "region", "canal", "ingresos", "inversion", "pedidos", "satisfaccion"])
ventas["fecha"] = pd.to_datetime(ventas["fecha"])
ventas["meta"] = (ventas["ingresos"] >= 140).astype(int)

diarias = ventas.pivot_table(index="fecha", columns="canal", values="ingresos", aggfunc="sum")
matriz = ventas.pivot_table(index="region", columns="canal", values="ingresos", aggfunc="sum")
rng = np.random.default_rng(42)
simulacion = pd.DataFrame({
    "canal": np.repeat(["Online", "Tienda"], 400),
    "ingresos": np.concatenate([
        rng.lognormal(mean=4.8, sigma=.5, size=400),
        rng.lognormal(mean=4.6, sigma=.45, size=400)
    ])
})
```

**Resultado esperado** `ventas.shape` es `(16, 9)`; `diarias.shape` es `(4, 2)`; `matriz.shape` es `(2, 2)`; `simulacion.shape` es `(800, 2)`. Ingresos totales: 2080.

## Introducción y entorno

**Clave** `introduccion`

### Definición

**Clave** `definicion`

**Definición** Seaborn es una biblioteca de visualización estadística de Python que utiliza Matplotlib y se integra con pandas.

**Búsqueda** Introducción y entorno; Dibujar ventas frente a inversión

**Para recordar** Seaborn transforma datos en gráficos; Matplotlib permite ajustar el resultado.

#### Dibujar ventas frente a inversión

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos")
```

Cada fila se representa mediante un punto.

**Resultado esperado** Un diagrama de dispersión de inversión e ingresos.

### Importación y versión

**Clave** `importacion-y-version`

**Definición** El alias `sns` permite llamar las funciones de Seaborn; la versión determina qué parámetros existen.

**Búsqueda** Importación y versión; Comprobar la versión

**Para recordar** Importar la biblioteca no crea un gráfico.

#### Comprobar la versión

```python
import seaborn as sns
print(sns.__version__)
```

Consulta la versión instalada.

**Resultado esperado** `0.13.2` si se siguió el entorno propuesto.

### Datasets de ejemplo

**Clave** `datasets-de-ejemplo`

**Definición** `load_dataset()` descarga conjuntos de datos de ejemplo de Seaborn.

**Búsqueda** Datasets de ejemplo; Cargar propinas

**Para recordar** No es el método para leer archivos propios; usa pandas para ellos.

**Nota** Requiere conexión la primera vez; los demás ejemplos no dependen de internet.

#### Cargar propinas

```python
tips = sns.load_dataset("tips")
print(tips.columns.tolist())
```

El dataset permite practicar con datos externos.

**Resultado esperado** Columnas `total_bill`, `tip`, `sex`, `smoker`, `day`, `time` y `size`.

### Figure y Axes

**Clave** `figure-y-axes`

**Definición** Una Figure es el contenedor completo; un Axes es la zona donde se dibuja un gráfico.

**Búsqueda** Figure y Axes; Crear un área de dibujo

**Para recordar** Un Axes no es lo mismo que un eje X o Y.

#### Crear un área de dibujo

```python
fig, ax = plt.subplots(figsize=(6, 4))
sns.scatterplot(data=ventas, x="inversion", y="ingresos", ax=ax)
```

`ax` especifica el destino del gráfico.

**Resultado esperado** Una figura de 6 × 4 pulgadas con un gráfico.

### Axes-level y figure-level

**Clave** `axes-level-y-figure-level`

**Definición** Las funciones axes-level devuelven un Axes; las figure-level gestionan su propia figura y suelen devolver un objeto de cuadrícula.

**Búsqueda** Axes-level y figure-level; Comparar las interfaces

**Para recordar** `scatterplot` acepta `ax`; `relplot` crea su propia figura.

**Nota** No pases `ax` a funciones figure-level.

#### Comparar las interfaces

```python
ax = sns.scatterplot(data=ventas, x="inversion", y="ingresos")
plt.show()
g = sns.relplot(data=ventas, x="inversion", y="ingresos")
print(type(ax).__name__, type(g).__name__)
```

Las dos interfaces producen gráficos similares, pero se personalizan de forma distinta.

**Resultado esperado** `Axes FacetGrid`.

## Estructura de datos

**Clave** `estructura-de-datos`

### Definición

**Clave** `definicion`

**Definición** Seaborn puede recibir DataFrames, vectores y otras estructuras; `data` identifica la fuente de los datos.

**Búsqueda** Estructura de datos; Elegir columnas

**Para recordar** En un DataFrame, los nombres de columnas se pasan como cadenas.

#### Elegir columnas

```python
sns.scatterplot(data=ventas, x="pedidos", y="ingresos")
```

`x` e `y` seleccionan variables del DataFrame.

**Resultado esperado** Un punto por observación de ventas.

### Long-form

**Clave** `long-form`

**Definición** En formato largo, cada fila es una observación y cada columna una variable.

**Búsqueda** Long-form; Comparar canales

**Para recordar** Es el formato más flexible para `x`, `y`, `hue`, `row` y `col`.

#### Comparar canales

```python
sns.lineplot(data=ventas, x="fecha", y="ingresos", hue="canal", errorbar=None)
```

El canal es una columna y no un conjunto de columnas independientes.

**Resultado esperado** Una línea por canal con el ingreso medio diario.

### Wide-form

**Clave** `wide-form`

**Definición** En formato ancho, las series pueden ocupar columnas distintas.

**Búsqueda** Wide-form; Mostrar series por canal

**Para recordar** Sin `x` e `y`, varias funciones interpretan `data` como formato ancho.

#### Mostrar series por canal

```python
sns.lineplot(data=diarias)
```

El índice contiene fechas y cada columna un canal.

**Resultado esperado** Dos líneas de ingresos diarios totales.

### melt

**Clave** `melt`

**Definición** `melt()` de pandas convierte columnas de medidas en filas con una etiqueta de variable.

**Búsqueda** melt; Convertir ingresos por canal a formato largo

**Para recordar** `id_vars` conserva los identificadores; `value_vars` indica las columnas que se transforman.

#### Convertir ingresos por canal a formato largo

```python
largo = diarias.reset_index().melt(id_vars="fecha", var_name="canal", value_name="ingresos")
sns.lineplot(data=largo, x="fecha", y="ingresos", hue="canal")
```

La estructura larga permite mapear el canal a color.

**Resultado esperado** Dos líneas y un DataFrame largo con ocho filas.

### pivot y pivot_table

**Clave** `pivot-y-pivot-table`

**Definición** `pivot()` reorganiza valores con claves únicas; `pivot_table()` puede agregar combinaciones repetidas.

**Búsqueda** pivot y pivot_table; Crear una matriz de ventas

**Para recordar** Si una combinación se repite, usa `pivot_table` con una agregación explícita.

#### Crear una matriz de ventas

```python
tabla = ventas.pivot_table(index="region", columns="canal", values="ingresos", aggfunc="sum")
print(tabla)
```

Agrupa los ingresos por región y canal.

**Resultado esperado** Norte: Online 520, Tienda 440; Sur: Online 600, Tienda 520.

### groupby

**Clave** `groupby`

**Definición** `groupby()` de pandas permite preparar métricas antes de dibujar.

**Búsqueda** groupby; Calcular totales por fecha

**Para recordar** Agrega primero si tu pregunta necesita una unidad distinta a la fila original.

#### Calcular totales por fecha

```python
totales = ventas.groupby("fecha", as_index=False)["ingresos"].sum()
sns.lineplot(data=totales, x="fecha", y="ingresos", marker="o")
```

Cada fecha queda representada por un total calculado previamente.

**Resultado esperado** Cuatro puntos: 400, 480, 560 y 640.

### Datos faltantes y categorías

**Clave** `datos-faltantes-y-categorias`

**Definición** Conviene revisar nulos, tipos y categorías antes de graficar; las funciones pueden omitir observaciones incompletas.

**Búsqueda** Datos faltantes y categorías; Excluir ingresos desconocidos

**Para recordar** Un nulo no equivale a cero; el orden de categorías puede ser de negocio.

#### Excluir ingresos desconocidos

```python
limpio = ventas.assign(ingresos=ventas["ingresos"].mask(ventas.index == 0)).dropna(subset=["ingresos"])
print(len(limpio))
```

Se simula un ingreso faltante sin modificar el dataset original.

**Resultado esperado** 15 filas en lugar de 16.

## Variables visuales

**Clave** `variables-visuales`

### Definición

**Clave** `definicion`

**Definición** Una variable visual representa una columna mediante posición, color, tamaño o forma.

**Búsqueda** Variables visuales; Diferenciar regiones

**Para recordar** `hue`, `size` y `style` mapean datos; `color` y `marker` fijan propiedades.

#### Diferenciar regiones

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="region")
```

El color identifica a qué región pertenece el punto.

**Resultado esperado** Dos colores con leyenda Norte y Sur.

### hue

**Clave** `hue`

**Definición** `hue` asigna colores a grupos o valores numéricos.

**Búsqueda** hue; Colorear por canal

**Para recordar** Una categoría produce colores discretos; un número puede producir una escala continua.

#### Colorear por canal

```python
sns.scatterplot(data=ventas, x="pedidos", y="ingresos", hue="canal")
```

Los canales se distinguen sin separar gráficos.

**Resultado esperado** Dos colores y una leyenda de canal.

### size y sizes

**Clave** `size-y-sizes`

**Definición** `size` asigna tamaño a una variable; `sizes` controla el intervalo de tamaños.

**Búsqueda** size y sizes; Representar volumen de pedidos

**Para recordar** El tamaño representa magnitud, no una categoría necesariamente.

#### Representar volumen de pedidos

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", size="pedidos", sizes=(30, 180))
```

Los registros con más pedidos se dibujan con mayor área.

**Resultado esperado** Puntos de tamaños variables y leyenda.

### style y markers

**Clave** `style-y-markers`

**Definición** `style` diferencia grupos mediante formas o estilos de línea.

**Búsqueda** style y markers; Distinguir canales por forma

**Para recordar** Puede duplicar el significado de `hue` para mejorar la accesibilidad.

#### Distinguir canales por forma

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="canal", style="canal", markers={"Online":"o", "Tienda":"s"})
```

Cada canal tiene un símbolo propio.

**Resultado esperado** Círculos y cuadrados además de dos colores.

### Escalas semánticas

**Clave** `escalas-semanticas`

**Definición** `hue_norm` y `size_norm` fijan el rango de referencia para variables numéricas.

**Búsqueda** Escalas semánticas; Fijar una escala de inversión

**Para recordar** Usa los mismos límites para comparar gráficos con la misma escala.

#### Fijar una escala de inversión

```python
sns.scatterplot(data=ventas, x="pedidos", y="ingresos", hue="inversion", hue_norm=(0, 60), palette="viridis")
```

El color depende de una escala de inversión fija.

**Resultado esperado** Gradiente de color para los montos de inversión.

## Gráficos relacionales

**Clave** `graficos-relacionales`

### Definición

**Clave** `definicion`

**Definición** Los gráficos relacionales ayudan a estudiar cómo se relacionan variables cuantitativas o cómo cambian a lo largo del tiempo.

**Búsqueda** Gráficos relacionales; Relacionar inversión e ingresos

**Para recordar** Dispersión para relación; líneas para evolución.

#### Relacionar inversión e ingresos

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos")
```

No se unen las observaciones.

**Resultado esperado** Una nube de puntos con asociación positiva.

### scatterplot

**Clave** `scatterplot`

**Definición** Representa pares de valores como puntos.

**Búsqueda** scatterplot; Comparar pedidos e ingresos por región

**Para recordar** No demuestra causalidad aunque exista un patrón.

#### Comparar pedidos e ingresos por región

```python
sns.scatterplot(data=ventas, x="pedidos", y="ingresos", hue="region", alpha=.7)
```

La transparencia facilita ver superposiciones.

**Resultado esperado** Nube de puntos diferenciada por región.

### lineplot

**Clave** `lineplot`

**Definición** Conecta valores según un orden, y por defecto estima la media de valores repetidos en X para cada grupo.

**Búsqueda** lineplot; Mostrar ingresos diarios totales

**Para recordar** Si quieres totales, agrega antes o utiliza un estimador adecuado.

#### Mostrar ingresos diarios totales

```python
sns.lineplot(data=ventas, x="fecha", y="ingresos", estimator="sum", errorbar=None, marker="o")
```

La suma sustituye la media por defecto.

**Resultado esperado** Cuatro fechas con 400, 480, 560 y 640.

### Orden y sort

**Clave** `orden-y-sort`

**Definición** `lineplot` ordena los valores de X por defecto; `sort=False` conserva el orden de entrada dentro de las series.

**Búsqueda** Orden y sort; Conectar fechas en orden

**Para recordar** Para una serie temporal convierte las fechas al tipo adecuado.

#### Conectar fechas en orden

```python
sns.lineplot(data=ventas, x="fecha", y="ingresos", hue="canal", sort=True, errorbar=None)
```

El orden de fecha define la evolución.

**Resultado esperado** Dos series cronológicas.

### units

**Clave** `units`

**Definición** `units` permite dibujar una trayectoria por unidad de muestreo sin agregar líneas entre unidades.

**Búsqueda** units; Trazar una línea por tienda

**Para recordar** Con `lineplot`, utiliza `estimator=None` cuando pasas `units`.

#### Trazar una línea por tienda

```python
sns.lineplot(data=ventas, x="fecha", y="ingresos", hue="canal", units="sucursal", estimator=None)
```

La sucursal separa las trayectorias sin crear una leyenda por cada una.

**Resultado esperado** Cuatro líneas agrupadas por canal.

### relplot

**Clave** `relplot`

**Definición** Interfaz figure-level para dispersión y líneas con facetas.

**Búsqueda** relplot; Separar regiones

**Para recordar** `kind="scatter"` o `kind="line"` elige el tipo.

#### Separar regiones

```python
sns.relplot(data=ventas, x="fecha", y="ingresos", hue="canal", col="region", kind="line", errorbar=None)
```

Cada región tiene su propio panel.

**Resultado esperado** Dos paneles con dos series cada uno.

## Estimación y barras de error

**Clave** `estimacion-y-error`

### Definición

**Clave** `definicion`

**Definición** Algunos gráficos calculan un resumen estadístico y un intervalo automáticamente.

**Búsqueda** Estimación y barras de error; Comparar ingresos medios

**Para recordar** Identifica qué estima cada gráfico antes de interpretar una barra o una línea.

#### Comparar ingresos medios

```python
sns.barplot(data=ventas, x="canal", y="ingresos", errorbar=None, color="steelblue")
```

Cada barra resume varias observaciones.

**Resultado esperado** Online 140; Tienda 120.

### estimator

**Clave** `estimator`

**Definición** Determina la función que resume las observaciones de un grupo.

**Búsqueda** estimator; Comparar ingresos totales

**Para recordar** `barplot` usa media por defecto; puedes pedir suma o mediana.

#### Comparar ingresos totales

```python
sns.barplot(data=ventas, x="canal", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
```

Las barras representan sumas y no promedios.

**Resultado esperado** Online 1120; Tienda 960.

### errorbar y None

**Clave** `errorbar-y-none`

**Definición** `errorbar` indica el método de intervalo; `None` lo desactiva.

**Búsqueda** errorbar y None; Mostrar solo la estimación

**Para recordar** No confundas ausencia de barras de error con ausencia de variabilidad.

#### Mostrar solo la estimación

```python
sns.pointplot(data=ventas, x="canal", y="ingresos", errorbar=None)
```

Se eliminan los intervalos visuales.

**Resultado esperado** Dos puntos correspondientes a las medias.

### Desviación estándar y error estándar

**Clave** `desviacion-estandar-y-error-estandar`

**Definición** `sd` representa dispersión de observaciones; `se` representa incertidumbre de la media mediante su error estándar.

**Búsqueda** Desviación estándar y error estándar; Mostrar dispersión alrededor de la media

**Para recordar** SD y SE no son equivalentes; SE suele ser menor.

#### Mostrar dispersión alrededor de la media

```python
sns.barplot(data=ventas, x="canal", y="ingresos", errorbar="sd", color="steelblue")
```

Cada intervalo muestra media ± una desviación estándar muestral.

**Resultado esperado** Dos barras con intervalos de dispersión.

### Intervalo percentil

**Clave** `intervalo-percentil`

**Definición** `errorbar=("pi", 90)` muestra el intervalo central de los datos entre percentiles 5 y 95.

**Búsqueda** Intervalo percentil; Mostrar el intervalo central

**Para recordar** Describe dispersión de observaciones, no confianza en la media.

#### Mostrar el intervalo central

```python
sns.pointplot(data=ventas, x="canal", y="ingresos", errorbar=("pi", 90))
```

El nivel controla la proporción central de los valores.

**Resultado esperado** Puntos con intervalos percentiles.

### Intervalo de confianza y bootstrap

**Clave** `intervalo-de-confianza-y-bootstrap`

**Definición** `ci` estima incertidumbre del estadístico mediante remuestreo con reemplazo; `n_boot` controla las réplicas y `seed` permite repetirlas.

**Búsqueda** Intervalo de confianza y bootstrap; Estimar incertidumbre de la media

**Para recordar** Un IC del 95 % no significa que el 95 % de las observaciones esté dentro.

#### Estimar incertidumbre de la media

```python
sns.barplot(data=ventas, x="canal", y="ingresos", errorbar=("ci", 95), n_boot=500, seed=42, color="steelblue")
```

El remuestreo aproxima la incertidumbre de cada media.

**Resultado esperado** Barras con intervalos de confianza reproducibles en el mismo entorno.

### weights

**Clave** `weights`

**Definición** En funciones compatibles, `weights` pondera la media para que observaciones con distinto volumen tengan diferente influencia.

**Búsqueda** weights; Calcular satisfacción ponderada por pedidos

**Para recordar** En 0.13.2, la ponderación restringe el estimador a media y el intervalo a CI o None.

#### Calcular satisfacción ponderada por pedidos

```python
sns.barplot(data=ventas, x="canal", y="satisfaccion", weights="pedidos", errorbar=None, color="steelblue")
```

Los registros con más pedidos tienen más peso.

**Resultado esperado** Dos medias ponderadas, una por canal.

## Histogramas

**Clave** `histogramas`

### Definición

**Clave** `definicion`

**Definición** Un histograma agrupa datos numéricos en intervalos y representa su frecuencia o densidad.

**Búsqueda** Histogramas; Distribución de ingresos

**Para recordar** Las barras representan rangos de valores, no categorías arbitrarias.

#### Distribución de ingresos

```python
sns.histplot(data=ventas, x="ingresos", color="steelblue")
```

Cada barra resume las observaciones de un intervalo.

**Resultado esperado** Histograma de los 16 ingresos.

### bins y binwidth

**Clave** `bins-y-binwidth`

**Definición** `bins` establece los intervalos o su número; `binwidth` establece su anchura.

**Búsqueda** bins y binwidth; Usar intervalos de 50

**Para recordar** Cambiar el tamaño del intervalo puede cambiar el patrón aparente.

#### Usar intervalos de 50

```python
sns.histplot(data=ventas, x="ingresos", binwidth=50, color="steelblue")
```

Cada intervalo tiene una anchura de 50 unidades.

**Resultado esperado** Barras de frecuencia con intervalos uniformes.

### stat

**Clave** `stat`

**Definición** Controla si la altura representa conteo, frecuencia, probabilidad, porcentaje o densidad.

**Búsqueda** stat; Mostrar porcentajes

**Para recordar** Densidad significa área total 1, no suma de alturas 1.

#### Mostrar porcentajes

```python
sns.histplot(data=ventas, x="ingresos", bins=4, stat="percent", color="steelblue")
```

La altura es el porcentaje de observaciones del intervalo.

**Resultado esperado** Las alturas de las cuatro barras suman 100 %.

### Histograma con KDE

**Clave** `histograma-con-kde`

**Definición** `kde=True` añade una curva suavizada de distribución.

**Búsqueda** Histograma con KDE; Comparar barras y curva

**Para recordar** La curva es una estimación y no un recuento exacto.

#### Comparar barras y curva

```python
sns.histplot(data=ventas, x="ingresos", kde=True, color="steelblue")
```

Combina frecuencias y densidad suavizada a escala del histograma.

**Resultado esperado** Barras con una curva superpuesta.

### multiple

**Clave** `multiple`

**Definición** Controla si los histogramas de varios grupos se superponen, apilan, separan o rellenan proporcionalmente.

**Búsqueda** multiple; Comparar la composición de cada intervalo

**Para recordar** `layer`, `stack`, `dodge` y `fill` expresan comparaciones distintas.

#### Comparar la composición de cada intervalo

```python
sns.histplot(data=ventas, x="ingresos", hue="canal", bins=4, multiple="fill")
```

Cada intervalo no vacío se normaliza a una altura de 1.

**Resultado esperado** Barras apiladas que muestran proporción por canal.

### common_bins y common_norm

**Clave** `common-bins-y-common-norm`

**Definición** `common_bins` comparte bordes de intervalos; `common_norm` decide si se normaliza conjuntamente o por grupo.

**Búsqueda** common_bins y common_norm; Comparar distribuciones relativas

**Para recordar** Para comparar distribuciones relativas, usa bordes comunes y normalización por grupo.

#### Comparar distribuciones relativas

```python
sns.histplot(data=ventas, x="ingresos", hue="canal", bins=4, stat="probability", common_bins=True, common_norm=False)
```

Cada canal se normaliza por separado.

**Resultado esperado** Las alturas de cada canal suman 1.

### Histograma acumulado

**Clave** `histograma-acumulado`

**Definición** `cumulative=True` acumula frecuencias a lo largo de los intervalos.

**Búsqueda** Histograma acumulado; Obtener porcentaje acumulado

**Para recordar** La última barra incluye todas las observaciones del grupo.

#### Obtener porcentaje acumulado

```python
sns.histplot(data=ventas, x="ingresos", stat="percent", cumulative=True, bins=4, color="steelblue")
```

Cada barra incorpora las frecuencias anteriores.

**Resultado esperado** La última barra alcanza 100 %.

## Densidad y distribución acumulada

**Clave** `densidad-y-acumulada`

### Definición

**Clave** `definicion`

**Definición** KDE estima una distribución continua; ECDF muestra la proporción observada hasta cada valor.

**Búsqueda** Densidad y distribución acumulada; Comparar formas de distribución

**Para recordar** KDE suaviza; ECDF no necesita intervalos ni suavizado.

#### Comparar formas de distribución

```python
sns.kdeplot(data=ventas, x="ingresos", hue="canal")
```

Una curva por canal resume su distribución estimada.

**Resultado esperado** Dos curvas de densidad.

### kdeplot y bw_adjust

**Clave** `kdeplot-y-bw-adjust`

**Definición** `bw_adjust` multiplica el ancho de banda seleccionado por el método `bw_method`.

**Búsqueda** kdeplot y bw_adjust; Comparar con una curva más suave

**Para recordar** Menor ancho conserva más detalle; mayor ancho suaviza más.

#### Comparar con una curva más suave

```python
sns.kdeplot(data=ventas, x="ingresos", bw_method="scott", bw_adjust=1.5, color="steelblue")
```

Se usa el ancho de banda de Scott multiplicado por 1.5.

**Resultado esperado** Curva de densidad más suavizada que con el ajuste 1.

### cut y clip

**Clave** `cut-y-clip`

**Definición** `cut` limita la extensión de la rejilla respecto a los datos; `clip` impone límites de evaluación.

**Búsqueda** cut y clip; Evitar densidades dibujadas bajo cero

**Para recordar** Recortar una KDE no corrige automáticamente el sesgo cerca de una frontera.

#### Evitar densidades dibujadas bajo cero

```python
sns.kdeplot(data=ventas, x="ingresos", cut=0, clip=(0, None), color="steelblue")
```

Restringe el dominio de dibujo a los valores observados y no negativos.

**Resultado esperado** Curva sin prolongación fuera del rango observado.

### KDE bivariada y levels

**Clave** `kde-bivariada-y-levels`

**Definición** Una KDE bivariada estima densidad en dos dimensiones; `levels` controla niveles de contorno.

**Búsqueda** KDE bivariada y levels; Visualizar concentración conjunta

**Para recordar** Los contornos representan regiones de densidad, no líneas de regresión.

#### Visualizar concentración conjunta

```python
sns.kdeplot(data=ventas, x="inversion", y="ingresos", levels=5, fill=True, color="steelblue")
```

Se estima densidad conjunta de las dos variables.

**Resultado esperado** Regiones de color con distintos niveles de densidad.

### ecdfplot

**Clave** `ecdfplot`

**Definición** La función de distribución acumulada empírica muestra la fracción de observaciones menor o igual a X.

**Búsqueda** ecdfplot; Ver la proporción de ingresos hasta cada monto

**Para recordar** En una ECDF de proporciones, el último escalón llega a 1.

#### Ver la proporción de ingresos hasta cada monto

```python
sns.ecdfplot(data=ventas, x="ingresos")
```

Cada salto corresponde a observaciones del mismo valor.

**Resultado esperado** Curva escalonada desde 0 hasta 1.

### rugplot

**Clave** `rugplot`

**Definición** Añade marcas pequeñas en las posiciones de las observaciones.

**Búsqueda** rugplot; Mostrar los ingresos individuales

**Para recordar** Permite ver los datos reales debajo de una estimación suavizada.

#### Mostrar los ingresos individuales

```python
sns.kdeplot(data=ventas, x="ingresos", color="steelblue")
sns.rugplot(data=ventas, x="ingresos", color="steelblue")
```

Las marcas muestran las ubicaciones observadas.

**Resultado esperado** Curva KDE con marcas sobre el eje horizontal.

### displot

**Clave** `displot`

**Definición** Interfaz figure-level para histogramas, KDE y ECDF.

**Búsqueda** displot; Comparar distribuciones por región

**Para recordar** `kind` selecciona la distribución; `col` o `row` crea paneles.

#### Comparar distribuciones por región

```python
sns.displot(data=ventas, x="ingresos", col="region", kind="hist", bins=4)
```

Se genera un histograma separado por región.

**Resultado esperado** Dos paneles con cuatro intervalos comunes.

## Barras y conteos

**Clave** `barras-y-conteos`

### Definición

**Clave** `definicion`

**Definición** Los gráficos de barras comparan estimaciones o recuentos por categoría.

**Búsqueda** Barras y conteos; Contar registros por canal

**Para recordar** `barplot` resume una medida; `countplot` cuenta filas.

#### Contar registros por canal

```python
sns.countplot(data=ventas, x="canal", color="steelblue")
```

Cada registro aporta una unidad.

**Resultado esperado** Online 8; Tienda 8.

### barplot

**Clave** `barplot`

**Definición** Muestra una estimación numérica por categoría mediante barras.

**Búsqueda** barplot; Comparar pedidos medios

**Para recordar** La media es el estimador predeterminado, no la suma.

#### Comparar pedidos medios

```python
sns.barplot(data=ventas, x="region", y="pedidos", errorbar=None, color="steelblue")
```

Se promedian los pedidos dentro de cada región.

**Resultado esperado** Norte 12; Sur 14.

### countplot

**Clave** `countplot`

**Definición** Cuenta observaciones por categoría sin necesitar una columna numérica.

**Búsqueda** countplot; Contar registros por región y canal

**Para recordar** No cuenta clientes únicos ni suma la columna `pedidos`.

#### Contar registros por región y canal

```python
sns.countplot(data=ventas, x="region", hue="canal")
```

Cada combinación tiene cuatro filas.

**Resultado esperado** Cuatro barras de altura 4.

### Conteos relativos

**Clave** `conteos-relativos`

**Definición** `stat="percent"` en countplot muestra porcentajes respecto al total representado.

**Búsqueda** Conteos relativos; Medir la participación de canales

**Para recordar** No supone automáticamente un porcentaje dentro de cada categoría de X.

#### Medir la participación de canales

```python
sns.countplot(data=ventas, x="canal", stat="percent", color="steelblue")
```

Se normaliza el conteo total.

**Resultado esperado** Dos barras de 50 %.

### pointplot

**Clave** `pointplot`

**Definición** Representa estimaciones como puntos, con intervalos opcionales y líneas que facilitan comparar grupos.

**Búsqueda** pointplot; Comparar medias por región y canal

**Para recordar** Las líneas entre categorías no implican continuidad numérica.

#### Comparar medias por región y canal

```python
sns.pointplot(data=ventas, x="region", y="ingresos", hue="canal", errorbar=None)
```

Cada punto muestra una media de grupo.

**Resultado esperado** Norte: Online 130, Tienda 110; Sur: Online 150, Tienda 130.

### Barras horizontales y orden

**Clave** `barras-horizontales-y-orden`

**Definición** El intercambio de `x` e `y` cambia la orientación; `order` fija el orden de categorías.

**Búsqueda** Barras horizontales y orden; Mostrar canales en un orden fijo

**Para recordar** Ordena según el objetivo, no necesariamente alfabéticamente.

#### Mostrar canales en un orden fijo

```python
sns.barplot(data=ventas, y="canal", x="ingresos", order=["Tienda", "Online"], estimator="sum", errorbar=None, color="steelblue")
```

La lista define el orden de las categorías.

**Resultado esperado** Dos barras horizontales: Tienda 960 y Online 1120.

## Distribuciones categóricas

**Clave** `distribuciones-categoricas`

### Definición

**Clave** `definicion`

**Definición** Estos gráficos muestran la distribución de una medida para cada categoría, en vez de resumirla solo por la media.

**Búsqueda** Distribuciones categóricas; Comparar ingresos entre canales

**Para recordar** Usa cajas, violines o puntos para comparar dispersión y valores extremos.

#### Comparar ingresos entre canales

```python
sns.boxplot(data=ventas, x="canal", y="ingresos")
```

Cada caja resume los valores de un canal.

**Resultado esperado** Dos cajas con medianas y bigotes.

### boxplot

**Clave** `boxplot`

**Definición** La caja va de Q1 a Q3; la línea interior es la mediana. Los bigotes alcanzan los valores observados dentro del umbral definido.

**Búsqueda** boxplot; Ver mediana y dispersión

**Para recordar** Un punto fuera de los bigotes es un posible atípico, no un error confirmado.

#### Ver mediana y dispersión

```python
sns.boxplot(data=ventas, x="region", y="ingresos")
```

Se compara el IQR y los posibles atípicos por región.

**Resultado esperado** Dos cajas, con medianas Norte 120 y Sur 140.

### whis, showfliers y showmeans

**Clave** `whis-showfliers-y-showmeans`

**Definición** `whis` ajusta el criterio de los bigotes; `showfliers` y `showmeans` controlan puntos extremos y media.

**Búsqueda** whis, showfliers y showmeans; Mostrar la media y mantener los atípicos

**Para recordar** Ocultar atípicos no los elimina de los datos.

#### Mostrar la media y mantener los atípicos

```python
sns.boxplot(data=ventas, x="canal", y="ingresos", whis=1.5, showfliers=True, showmeans=True)
```

Se añade un marcador para la media.

**Resultado esperado** Cajas con medianas y marcadores de media.

### violinplot

**Clave** `violinplot`

**Definición** Representa densidades suavizadas por categoría; el ancho refleja densidad estimada.

**Búsqueda** violinplot; Comparar forma y cuartiles

**Para recordar** Con muestras pequeñas, la forma suavizada puede resultar engañosa.

#### Comparar forma y cuartiles

```python
sns.violinplot(data=ventas, x="canal", y="ingresos", inner="quart", cut=0)
```

El interior marca cuartiles y el contorno la densidad.

**Resultado esperado** Dos violines limitados al rango observado.

### stripplot

**Clave** `stripplot`

**Definición** Muestra observaciones individuales y permite desplazarlas con `jitter`.

**Búsqueda** stripplot; Mostrar observaciones por región

**Para recordar** El desplazamiento lateral evita superposición; no altera la medida numérica.

#### Mostrar observaciones por región

```python
sns.stripplot(data=ventas, x="region", y="ingresos", jitter=.15, alpha=.7)
```

Se dispersan ligeramente los puntos sobre el eje categórico.

**Resultado esperado** Ocho puntos por región.

### swarmplot

**Clave** `swarmplot`

**Definición** Coloca puntos sin superposición mediante desplazamiento a lo largo del eje categórico.

**Búsqueda** swarmplot; Ver observaciones separadas

**Para recordar** Puede ser lento o no encontrar espacio cuando hay muchos puntos.

#### Ver observaciones separadas

```python
sns.swarmplot(data=ventas, x="region", y="ingresos", size=5)
```

Los puntos se distribuyen evitando solapamientos cuando hay espacio.

**Resultado esperado** Dos grupos de ocho observaciones.

### boxenplot

**Clave** `boxenplot`

**Definición** Representa varios cuantiles mediante cajas anidadas para describir mejor las colas.

**Búsqueda** boxenplot; Explorar una distribución amplia

**Para recordar** Es más informativo con conjuntos grandes que con muestras pequeñas.

#### Explorar una distribución amplia

```python
sns.boxenplot(data=simulacion, x="canal", y="ingresos")
```

Cada grupo contiene suficientes registros simulados para observar cuantiles adicionales.

**Resultado esperado** Dos conjuntos de cajas anidadas.

### catplot

**Clave** `catplot`

**Definición** Interfaz figure-level para los gráficos categóricos.

**Búsqueda** catplot; Comparar cajas por región

**Para recordar** Selecciona `kind` y luego configura facetas.

#### Comparar cajas por región

```python
sns.catplot(data=ventas, x="canal", y="ingresos", col="region", kind="box")
```

Cada región recibe un panel con sus dos canales.

**Resultado esperado** Dos paneles de boxplots.

## Parámetros categóricos

**Clave** `parametros-categoricos`

### Definición

**Clave** `definicion`

**Definición** Las funciones categóricas permiten controlar el orden, la separación y la representación de los grupos.

**Búsqueda** Parámetros categóricos; Separar canales por región

**Para recordar** Los parámetros disponibles dependen de la función concreta.

#### Separar canales por región

```python
sns.boxplot(data=ventas, x="region", y="ingresos", hue="canal", dodge=True)
```

Los grupos de hue se colocan lado a lado.

**Resultado esperado** Dos cajas por región.

### order y hue_order

**Clave** `order-y-hue-order`

**Definición** `order` organiza las categorías del eje; `hue_order` organiza los niveles de color.

**Búsqueda** order y hue_order; Fijar orden de regiones y canales

**Para recordar** Ambos parámetros fijan un orden explícito y reproducible.

#### Fijar orden de regiones y canales

```python
sns.barplot(data=ventas, x="region", y="ingresos", hue="canal", order=["Sur", "Norte"], hue_order=["Tienda", "Online"], errorbar=None)
```

El orden del eje y de los grupos se define por separado.

**Resultado esperado** Sur antes de Norte, Tienda antes de Online.

### width, dodge y gap

**Clave** `width-dodge-y-gap`

**Definición** `width` controla el ancho; `dodge` desplaza grupos; `gap` deja espacio entre elementos desplazados en funciones compatibles.

**Búsqueda** width, dodge y gap; Separar barras agrupadas

**Para recordar** La separación visual no cambia el cálculo.

#### Separar barras agrupadas

```python
sns.barplot(data=ventas, x="region", y="ingresos", hue="canal", width=.8, dodge=True, gap=.15, errorbar=None)
```

El espacio facilita distinguir canales.

**Resultado esperado** Cuatro barras agrupadas con separación.

### fill y split

**Clave** `fill-y-split`

**Definición** `fill` controla el relleno de figuras compatibles; `split` divide el violín por hue.

**Búsqueda** fill y split; Comparar canales dentro del mismo violín

**Para recordar** En un violín dividido, cada lado puede representar un grupo distinto.

#### Comparar canales dentro del mismo violín

```python
sns.violinplot(data=ventas, x="region", y="ingresos", hue="canal", split=True, fill=False, cut=0)
```

Se contraponen las dos densidades por región.

**Resultado esperado** Dos violines divididos, dibujados con contornos.

### native_scale y formatter

**Clave** `native-scale-y-formatter`

**Definición** `native_scale=True` preserva distancias reales en ejes numéricos o de fecha; `formatter` transforma valores usados para agrupar y etiquetar categorías.

**Búsqueda** native_scale y formatter; Mantener distancias temporales reales

**Para recordar** Un formatter puede unir categorías que produzcan la misma etiqueta.

#### Mantener distancias temporales reales

```python
sns.barplot(data=ventas, x="fecha", y="ingresos", estimator="sum", native_scale=True, errorbar=None, color="steelblue")
```

Las fechas conservan su escala temporal.

**Resultado esperado** Cuatro barras con posiciones de fecha reales.

### orient

**Clave** `orient`

**Definición** `orient` indica la orientación o el eje categórico de funciones compatibles.

**Búsqueda** orient; Comparar ingresos por volumen de pedidos

**Para recordar** Útil cuando ambas variables son numéricas y no se puede inferir la orientación deseada.

#### Comparar ingresos por volumen de pedidos

```python
sns.barplot(data=ventas, x="pedidos", y="ingresos", orient="x", errorbar=None, color="steelblue")
```

Los valores de pedidos se tratan como niveles del eje X.

**Resultado esperado** Una barra de ingreso medio por volumen observado.

### formatter

**Clave** `formatter`

**Definición** `formatter` convierte valores en etiquetas categóricas y también interviene en la agrupación.

**Búsqueda** formatter; Agrupar las fechas en un solo mes

**Para recordar** Si dos valores producen la misma etiqueta, se agrupan.

#### Agrupar las fechas en un solo mes

```python
sns.barplot(data=ventas, x="fecha", y="ingresos", formatter=lambda d: d.strftime("%Y-%m"), estimator="sum", errorbar=None, color="steelblue")
```

Todas las fechas de septiembre se asignan a una categoría.

**Resultado esperado** Una barra de 2080.

## Mapas de calor y correlación

**Clave** `mapas-de-calor`

### Definición

**Clave** `definicion`

**Definición** Un mapa de calor representa una matriz de valores mediante colores.

**Búsqueda** Mapas de calor y correlación; Mostrar ingresos por región y canal

**Para recordar** La matriz puede contener correlaciones, totales o cualquier medida comparable.

#### Mostrar ingresos por región y canal

```python
sns.heatmap(matriz, annot=True, fmt=".0f", cmap="Blues")
```

El color representa el total de cada combinación.

**Resultado esperado** Cuatro celdas etiquetadas: 520, 440, 600 y 520.

### Correlación con corr

**Clave** `correlacion-con-corr`

**Definición** `corr()` de pandas calcula la asociación entre columnas numéricas; Pearson mide asociación lineal y Spearman asociación de rangos.

**Búsqueda** Correlación con corr; Mostrar correlaciones de negocio

**Para recordar** Una correlación próxima a 0 no descarta una relación no lineal ni implica independencia.

#### Mostrar correlaciones de negocio

```python
corr = ventas[["ingresos", "inversion", "pedidos", "satisfaccion"]].corr()
sns.heatmap(corr, annot=True, vmin=-1, vmax=1, cmap="vlag", center=0)
```

Los colores negativos y positivos se distinguen con una escala simétrica.

**Resultado esperado** Matriz 4 × 4, con unos en la diagonal.

### annot y fmt

**Clave** `annot-y-fmt`

**Definición** `annot` muestra valores dentro de las celdas; `fmt` determina su formato.

**Búsqueda** annot y fmt; Anotar los totales sin decimales

**Para recordar** El formato cambia la presentación, no los valores originales.

#### Anotar los totales sin decimales

```python
sns.heatmap(matriz, annot=True, fmt=".0f")
```

Cada celda muestra el total sin decimales.

**Resultado esperado** Matriz 2 × 2 con números enteros visibles.

### cmap, center, vmin y vmax

**Clave** `cmap-center-vmin-y-vmax`

**Definición** `cmap` elige la escala de color; `center` fija un punto central y `vmin` y `vmax` fijan los extremos.

**Búsqueda** cmap, center, vmin y vmax; Usar colores comparables

**Para recordar** Para correlación conviene usar límites -1 y 1.

#### Usar colores comparables

```python
sns.heatmap(matriz, cmap="crest", vmin=0, vmax=700)
```

Todas las celdas se colorean dentro de la misma escala.

**Resultado esperado** Barra de color desde 0 hasta 700.

### mask

**Clave** `mask`

**Definición** `mask` oculta las celdas donde su valor es verdadero.

**Búsqueda** mask; Mostrar solo media matriz

**Para recordar** Es útil para quitar la mitad redundante de una matriz simétrica.

#### Mostrar solo media matriz

```python
corr = ventas[["ingresos", "inversion", "pedidos"]].corr()
sns.heatmap(corr, mask=np.triu(np.ones_like(corr, dtype=bool), k=1), annot=True, cmap="vlag", vmin=-1, vmax=1)
```

Se oculta el triángulo superior por encima de la diagonal.

**Resultado esperado** Seis celdas visibles de las nueve originales.

### linewidths, square y colorbar

**Clave** `linewidths-square-y-colorbar`

**Definición** `linewidths` separa celdas, `square` iguala su forma y `cbar` controla la barra de color.

**Búsqueda** linewidths, square y colorbar; Ajustar la leyenda de colores

**Para recordar** La barra de color permite interpretar la magnitud de las celdas.

#### Ajustar la leyenda de colores

```python
sns.heatmap(matriz, square=True, linewidths=.5, cbar=True, cbar_kws={"label":"Ingresos"})
```

La barra de color recibe una etiqueta explícita.

**Resultado esperado** Cuatro celdas cuadradas con barra de color titulada Ingresos.

### clustermap

**Clave** `clustermap`

**Definición** Agrupa filas y columnas según similitud y las reordena mediante clustering jerárquico.

**Búsqueda** clustermap; Agrupar sucursales por medidas

**Para recordar** Las distancias dependen de la escala de las variables; no es un gráfico de correlación por sí mismo.

**Nota** Requiere SciPy y una matriz sin faltantes ni columnas de varianza cero.

#### Agrupar sucursales por medidas

```python
perfil = ventas.groupby("sucursal")[["ingresos", "inversion", "pedidos"]].mean()
sns.clustermap(perfil, z_score=1, method="average", metric="euclidean", cmap="vlag")
```

Se estandarizan columnas y se calcula el agrupamiento jerárquico.

**Resultado esperado** Mapa de calor reordenado con dendrogramas.

## Relaciones conjuntas y múltiples

**Clave** `relaciones-multiples`

### Definición

**Clave** `definicion`

**Definición** Las vistas conjuntas y matrices de gráficos muestran varias distribuciones y relaciones sin tener que dibujarlas una por una.

**Búsqueda** Relaciones conjuntas y múltiples; Explorar dos medidas

**Para recordar** `jointplot` estudia dos variables; `pairplot` explora varias.

#### Explorar dos medidas

```python
sns.jointplot(data=ventas, x="inversion", y="ingresos")
```

Los paneles marginales muestran cada distribución por separado.

**Resultado esperado** Dispersión central e histogramas marginales.

### jointplot

**Clave** `jointplot`

**Definición** Combina un gráfico bivariado con gráficos marginales.

**Búsqueda** jointplot; Mostrar densidad conjunta

**Para recordar** `kind` cambia el gráfico central y sus marginales según la opción.

#### Mostrar densidad conjunta

```python
sns.jointplot(data=ventas, x="inversion", y="ingresos", kind="kde", fill=True)
```

Se estima dónde se concentran ambos valores.

**Resultado esperado** Contornos de densidad y curvas marginales.

### pairplot

**Clave** `pairplot`

**Definición** Genera gráficos para combinaciones de variables numéricas.

**Búsqueda** pairplot; Explorar tres indicadores

**Para recordar** Selecciona `vars` para evitar una cuadrícula enorme.

#### Explorar tres indicadores

```python
sns.pairplot(ventas, vars=["ingresos", "inversion", "pedidos"], hue="canal", diag_kind="hist")
```

Las relaciones se separan por canal.

**Resultado esperado** Cuadrícula 3 × 3 con histogramas en la diagonal.

### corner y diag_kind

**Clave** `corner-y-diag-kind`

**Definición** `corner=True` elimina la mitad redundante; `diag_kind` define las distribuciones de la diagonal.

**Búsqueda** corner y diag_kind; Mostrar solo combinaciones necesarias

**Para recordar** Sirve para ahorrar espacio sin perder relaciones únicas.

#### Mostrar solo combinaciones necesarias

```python
sns.pairplot(ventas, vars=["ingresos", "inversion", "pedidos"], corner=True, diag_kind="hist", diag_kws={"color":"steelblue"})
```

Se muestran la diagonal y la parte inferior.

**Resultado esperado** Seis paneles visibles.

## Regresión

**Clave** `regresion`

### Definición

**Clave** `definicion`

**Definición** Las funciones de regresión de Seaborn visualizan una relación ajustada entre variables.

**Búsqueda** Regresión; Estimar una tendencia lineal

**Para recordar** Son útiles para explorar tendencias, no sustituyen un análisis inferencial completo.

#### Estimar una tendencia lineal

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", ci=None)
```

Ajusta una recta y conserva los puntos observados.

**Resultado esperado** Nube de puntos y recta de tendencia.

### regplot y ci

**Clave** `regplot-y-ci`

**Definición** `regplot` muestra observaciones, ajuste y, si se solicita, intervalo de confianza mediante `ci`.

**Búsqueda** regplot y ci; Mostrar incertidumbre del ajuste

**Para recordar** En regresión se mantiene `ci`; no lo sustituyas por `errorbar`.

#### Mostrar incertidumbre del ajuste

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", ci=95, n_boot=500, seed=42)
```

El intervalo se estima por bootstrap.

**Resultado esperado** Recta con banda de confianza del 95 %.

### Regresión polinómica

**Clave** `regresion-polinomica`

**Definición** `order` indica el grado del polinomio que se ajusta.

**Búsqueda** Regresión polinómica; Ajustar una tendencia cuadrática

**Para recordar** Un grado mayor puede sobreajustar datos pequeños.

#### Ajustar una tendencia cuadrática

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", order=2, ci=None)
```

El ajuste permite curvatura.

**Resultado esperado** Curva polinómica de grado 2.

### logistic, lowess y robust

**Clave** `logistic-lowess-y-robust`

**Definición** Las opciones activan respectivamente regresión logística, suavizado local o ajuste robusto frente a valores extremos.

**Búsqueda** logistic, lowess y robust; Estimar la probabilidad de superar una meta

**Para recordar** Se usan por separado; requieren statsmodels.

**Nota** No interpretes el desplazamiento visual de puntos como probabilidades reales.

#### Estimar la probabilidad de superar una meta

```python
sns.regplot(data=ventas, x="inversion", y="meta", logistic=True, ci=None, y_jitter=.03)
```

La respuesta vale 0 o 1; la curva estima probabilidad.

**Resultado esperado** Ajuste logístico entre 0 y 1.

### Suavizado local y ajuste robusto

**Clave** `suavizado-local-y-ajuste-robusto`

**Definición** LOWESS explora relaciones no lineales sin imponer un polinomio global; el ajuste robusto reduce la influencia de observaciones extremas.

**Búsqueda** Suavizado local y ajuste robusto; Explorar una tendencia local

**Para recordar** LOWESS y robust son modelos distintos; no combines sus opciones.

#### Explorar una tendencia local

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", lowess=True, ci=None)
```

Se ajusta localmente una curva a los datos.

**Resultado esperado** Curva suavizada junto a los puntos.

### Ajuste robusto

**Clave** `ajuste-robusto`

**Definición** `robust=True` usa un modelo resistente a ciertos valores extremos.

**Búsqueda** Ajuste robusto; Ajustar reduciendo influencia extrema

**Para recordar** No significa que se eliminen automáticamente los datos atípicos.

#### Ajustar reduciendo influencia extrema

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", robust=True, ci=None)
```

El ajuste da menos influencia a residuos grandes.

**Resultado esperado** Recta robusta sobre las observaciones.

### x_bins

**Clave** `x-bins`

**Definición** `x_bins` agrupa X para mostrar estimaciones de Y por intervalos; el ajuste sigue usando los datos originales.

**Búsqueda** x_bins; Resumir inversión en cuatro grupos

**Para recordar** Los intervalos cambian la representación de puntos, no la regresión ajustada.

#### Resumir inversión en cuatro grupos

```python
sns.regplot(data=ventas, x="inversion", y="ingresos", x_bins=4, ci=None)
```

Los puntos visibles se resumen según los intervalos.

**Resultado esperado** Estimaciones agrupadas y línea de ajuste.

### lmplot

**Clave** `lmplot`

**Definición** Interfaz figure-level que permite ajustar una regresión por grupo o faceta.

**Búsqueda** lmplot; Comparar tendencia por región

**Para recordar** Usa `hue`, `row` y `col` para separar ajustes.

#### Comparar tendencia por región

```python
sns.lmplot(data=ventas, x="inversion", y="ingresos", col="region", hue="canal", ci=None)
```

Se ajusta una recta por canal en cada región.

**Resultado esperado** Dos paneles con dos ajustes cada uno.

### residplot

**Clave** `residplot`

**Definición** Grafica los residuos de un ajuste, es decir, valor observado menos valor ajustado.

**Búsqueda** residplot; Revisar errores del ajuste

**Para recordar** Patrones sistemáticos sugieren que el modelo no captura toda la estructura.

#### Revisar errores del ajuste

```python
sns.residplot(data=ventas, x="inversion", y="ingresos")
```

Se examina si los residuos se distribuyen alrededor de cero.

**Resultado esperado** Puntos residuales y referencia horizontal en cero.

## Temas, estilos y contexto

**Clave** `temas-y-estilos`

### Definición

**Clave** `definicion`

**Definición** Los temas de Seaborn ajustan parámetros globales de Matplotlib para unificar la apariencia de los gráficos.

**Búsqueda** Temas, estilos y contexto; Aplicar un tema de análisis

**Para recordar** Configura el tema antes de dibujar.

#### Aplicar un tema de análisis

```python
sns.set_theme(style="whitegrid", context="notebook", palette="deep")
sns.scatterplot(data=ventas, x="pedidos", y="ingresos", hue="canal")
```

El tema afecta a gráficos posteriores.

**Resultado esperado** Gráfico con fondo blanco y cuadrícula.

### set_style y axes_style

**Clave** `set-style-y-axes-style`

**Definición** `set_style` cambia la apariencia de los ejes; `axes_style` puede usarse como contexto temporal.

**Búsqueda** set_style y axes_style; Usar estilo temporal

**Para recordar** `whitegrid`, `darkgrid`, `white`, `dark` y `ticks` son estilos disponibles.

#### Usar estilo temporal

```python
with sns.axes_style("ticks"):
    sns.scatterplot(data=ventas, x="pedidos", y="ingresos")
```

Al salir del bloque se restauran los parámetros previos.

**Resultado esperado** Gráfico con marcas de ejes y sin cuadrícula de fondo.

### set_context y plotting_context

**Clave** `set-context-y-plotting-context`

**Definición** Cambian tamaños de líneas, texto y otros elementos según el medio de presentación.

**Búsqueda** set_context y plotting_context; Aumentar tamaños para una exposición

**Para recordar** `paper`, `notebook`, `talk` y `poster` escalan la presentación.

#### Aumentar tamaños para una exposición

```python
with sns.plotting_context("talk", font_scale=1.1):
    sns.countplot(data=ventas, x="canal", color="steelblue")
```

El cambio es temporal y aumenta legibilidad.

**Resultado esperado** Gráfico con etiquetas y elementos de mayor tamaño.

### rc y font_scale

**Clave** `rc-y-font-scale`

**Definición** `rc` permite ajustar parámetros concretos de Matplotlib; `font_scale` modifica la escala de texto.

**Búsqueda** rc y font_scale; Configurar texto y grosor

**Para recordar** Usa parámetros globales con cuidado si dibujas varios estilos en una sesión.

#### Configurar texto y grosor

```python
sns.set_theme(font_scale=1.2, rc={"axes.linewidth": 1.2})
sns.lineplot(data=diarias)
```

El tema establece propiedades antes de crear los ejes.

**Resultado esperado** Gráfico con texto ampliado y bordes más gruesos.

### despine

**Clave** `despine`

**Definición** Quita bordes de los ejes, por defecto superior y derecho.

**Búsqueda** despine; Simplificar un gráfico

**Para recordar** No elimina los datos ni modifica las escalas.

#### Simplificar un gráfico

```python
sns.barplot(data=ventas, x="canal", y="ingresos", errorbar=None, color="steelblue")
sns.despine()
```

Se reducen elementos decorativos.

**Resultado esperado** Barras sin bordes superior y derecho.

## Paletas y colores

**Clave** `paletas-y-colores`

### Definición

**Clave** `definicion`

**Definición** Las paletas asignan colores a valores categóricos o numéricos.

**Búsqueda** Paletas y colores; Ver colores disponibles

**Para recordar** Usa colores cualitativos para grupos, secuenciales para magnitudes y divergentes para desviaciones respecto a un centro.

#### Ver colores disponibles

```python
sns.palplot(sns.color_palette("deep", 5))
```

Se muestran cinco colores de una paleta cualitativa.

**Resultado esperado** Cinco muestras de color.

### set_palette y color_palette

**Clave** `set-palette-y-color-palette`

**Definición** `set_palette` modifica la paleta activa; `color_palette` devuelve colores o un mapa de color según la opción.

**Búsqueda** set_palette y color_palette; Aplicar una paleta temporal

**Para recordar** Puedes usar una paleta temporal mediante `with`.

#### Aplicar una paleta temporal

```python
with sns.color_palette("colorblind"):
    sns.scatterplot(data=ventas, x="pedidos", y="ingresos", hue="canal")
```

Se eligen colores diferenciables para los canales.

**Resultado esperado** Dos colores de la paleta colorblind.

### Paletas cualitativas y accesibilidad

**Clave** `paletas-cualitativas-y-accesibilidad`

**Definición** Las paletas cualitativas distinguen categorías sin indicar magnitud.

**Búsqueda** Paletas cualitativas y accesibilidad; Hacer distinguibles los canales

**Para recordar** Combina color y forma para no depender únicamente de la percepción del color.

#### Hacer distinguibles los canales

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="canal", style="canal", palette="colorblind")
```

El canal se codifica dos veces.

**Resultado esperado** Puntos con colores y símbolos distintos.

### Paletas secuenciales y divergentes

**Clave** `paletas-secuenciales-y-divergentes`

**Definición** Una secuencial representa magnitud creciente; una divergente representa dos direcciones respecto a un centro.

**Búsqueda** Paletas secuenciales y divergentes; Mostrar desviación respecto a una meta

**Para recordar** Elige centro significativo solo cuando tenga interpretación.

#### Mostrar desviación respecto a una meta

```python
sns.heatmap(matriz - 500, cmap="vlag", center=0, annot=True, fmt=".0f")
```

Cero significa haber alcanzado el objetivo de 500.

**Resultado esperado** Celdas con diferencias de -60, 20 y 100 según combinación.

### light_palette y dark_palette

**Clave** `light-palette-y-dark-palette`

**Definición** Crean gradientes desde un color claro u oscuro hasta el color elegido.

**Búsqueda** light_palette y dark_palette; Crear un gradiente personalizado

**Para recordar** `as_cmap=True` devuelve un mapa de color para valores continuos.

#### Crear un gradiente personalizado

```python
sns.heatmap(matriz, cmap=sns.light_palette("seagreen", as_cmap=True), annot=True, fmt=".0f")
```

Los valores se representan mediante intensidad de verde.

**Resultado esperado** Matriz en tonos verdes de distinta intensidad.

### diverging_palette y blend_palette

**Clave** `diverging-palette-y-blend-palette`

**Definición** `diverging_palette` construye un gradiente de dos tonos; `blend_palette` interpola una lista de colores.

**Búsqueda** diverging_palette y blend_palette; Construir un mapa divergente

**Para recordar** Usa colores con contraste suficiente y una escala coherente.

#### Construir un mapa divergente

```python
cmap = sns.diverging_palette(240, 15, as_cmap=True)
sns.heatmap(matriz - 500, cmap=cmap, center=0, annot=True, fmt=".0f")
```

Se separan visualmente desviaciones negativas y positivas.

**Resultado esperado** Matriz de dos familias de color.

### Paletas explícitas

**Clave** `paletas-explicitas`

**Definición** Un diccionario permite asignar un color estable a cada categoría.

**Búsqueda** Paletas explícitas; Fijar colores de canales

**Para recordar** Mantén la asignación entre gráficos de un mismo informe.

#### Fijar colores de canales

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="canal", palette={"Online":"#2878B5", "Tienda":"#E69F00"})
```

Cada canal tiene un color constante.

**Resultado esperado** Puntos con los dos colores especificados.

### blend_palette

**Clave** `blend-palette`

**Definición** `blend_palette` interpola colores de una lista para generar una paleta o mapa de color.

**Búsqueda** blend_palette; Crear un gradiente propio

**Para recordar** Usa una transición que preserve la interpretación de magnitudes.

#### Crear un gradiente propio

```python
sns.heatmap(matriz, cmap=sns.blend_palette(["white", "#2975A8"], as_cmap=True), annot=True, fmt=".0f")
```

El color varía del blanco al azul.

**Resultado esperado** Mapa de calor con gradiente personalizado.

## Personalización con Matplotlib

**Clave** `personalizacion`

### Definición

**Clave** `definicion`

**Definición** Seaborn devuelve objetos que se pueden ajustar con Matplotlib para controlar títulos, etiquetas, escalas y detalles.

**Búsqueda** Personalización con Matplotlib; Titular un gráfico

**Para recordar** Usa métodos del Axes para gráficos axes-level y del grid para figure-level.

#### Titular un gráfico

```python
ax = sns.countplot(data=ventas, x="canal", color="steelblue")
ax.set_title("Registros por canal")
```

Se modifica el Axes devuelto.

**Resultado esperado** Gráfico con título Registros por canal.

### Tamaño y subplots

**Clave** `tamano-y-subplots`

**Definición** `plt.figure(figsize=...)` configura una figura; `plt.subplots()` crea figura y uno o más Axes.

**Búsqueda** Tamaño y subplots; Crear dos vistas complementarias

**Para recordar** En funciones figure-level el tamaño se configura con `height` y `aspect`.

#### Crear dos vistas complementarias

```python
fig, axs = plt.subplots(1, 2, figsize=(9, 4))
sns.countplot(data=ventas, x="canal", ax=axs[0], color="steelblue")
sns.boxplot(data=ventas, x="canal", y="ingresos", ax=axs[1])
fig.tight_layout()
```

Cada función recibe su propio Axes.

**Resultado esperado** Dos gráficos en una misma figura.

### Títulos y etiquetas

**Clave** `titulos-y-etiquetas`

**Definición** `set_title`, `set_xlabel` y `set_ylabel` cambian los textos; las funciones `plt.title`, `plt.xlabel` y `plt.ylabel` actúan sobre el Axes actual.

**Búsqueda** Títulos y etiquetas; Etiquetar ingresos y región

**Para recordar** Incluye unidades en las etiquetas cuando importan.

#### Etiquetar ingresos y región

```python
ax = sns.barplot(data=ventas, x="region", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
ax.set(title="Ingresos por región", xlabel="Región", ylabel="Ingresos (unidades monetarias)")
```

Se documenta qué representa cada barra.

**Resultado esperado** Gráfico con título y etiquetas descriptivas.

### Límites y escalas

**Clave** `limites-y-escalas`

**Definición** `set_xlim` y `set_ylim` cambian el rango visible; `set_xscale` y `set_yscale` cambian la escala.

**Búsqueda** Límites y escalas; Mostrar ingresos en escala logarítmica

**Para recordar** No recortes el origen de barras si eso exagera diferencias; la escala log requiere valores positivos.

#### Mostrar ingresos en escala logarítmica

```python
ax = sns.scatterplot(data=ventas, x="inversion", y="ingresos")
ax.set_yscale("log")
```

El eje Y representa razones multiplicativas.

**Resultado esperado** Dispersión con eje Y logarítmico.

### log_scale

**Clave** `log-scale`

**Definición** Varias funciones de Seaborn aceptan `log_scale` para configurar escalas antes o durante el cálculo estadístico.

**Búsqueda** log_scale; Mostrar distribución en escala log

**Para recordar** Un histograma con escala logarítmica puede usar intervalos en el espacio transformado.

#### Mostrar distribución en escala log

```python
sns.histplot(data=ventas, x="ingresos", log_scale=True, bins=4, color="steelblue")
```

Se construye una distribución en escala logarítmica.

**Resultado esperado** Histograma con eje X logarítmico.

### Rotación de etiquetas

**Clave** `rotacion-de-etiquetas`

**Definición** `tick_params` o `plt.xticks(rotation=...)` permiten girar etiquetas de los ejes.

**Búsqueda** Rotación de etiquetas; Girar fechas

**Para recordar** Girar es preferible a dejar textos superpuestos.

#### Girar fechas

```python
ax = sns.lineplot(data=diarias)
ax.tick_params(axis="x", labelrotation=45)
plt.tight_layout()
```

Se rotan las marcas de fecha.

**Resultado esperado** Etiquetas temporales inclinadas 45 grados.

### Anotaciones

**Clave** `anotaciones`

**Definición** `annotate` añade texto asociado a una coordenada; `bar_label` etiqueta las barras.

**Búsqueda** Anotaciones; Etiquetar totales

**Para recordar** Anota el dato relevante, no todas las observaciones si dificulta leer el gráfico.

#### Etiquetar totales

```python
ax = sns.barplot(data=ventas, x="canal", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
ax.bar_label(ax.containers[0], fmt="%.0f")
ax.set_ylim(0, 1300)
```

Se muestran valores sobre las barras.

**Resultado esperado** Etiquetas 1120 y 960.

### Leyendas y move_legend

**Clave** `leyendas-y-move-legend`

**Definición** `legend` controla la presencia de la leyenda; `move_legend` vuelve a crearla en otra posición.

**Búsqueda** Leyendas y move_legend; Mover leyenda al exterior

**Para recordar** La leyenda no debe tapar los datos.

#### Mover leyenda al exterior

```python
ax = sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="canal")
sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))
plt.tight_layout()
```

Se desplaza la leyenda a la derecha.

**Resultado esperado** Leyenda fuera de la zona de puntos.

### alpha, color, marker y linewidth

**Clave** `alpha-color-marker-y-linewidth`

**Definición** Estos parámetros controlan transparencia, color fijo, símbolos y grosor de líneas o bordes.

**Búsqueda** alpha, color, marker y linewidth; Ajustar estilo de una serie

**Para recordar** Su efecto depende de la función; no equivalen a mapear variables mediante hue o style.

#### Ajustar estilo de una serie

```python
sns.lineplot(data=diarias["Online"], color="teal", marker="o", linewidth=2, alpha=.8)
```

Todas las observaciones usan el estilo fijo.

**Resultado esperado** Línea verde con cuatro marcadores circulares.

### Superposición de gráficos

**Clave** `superposicion-de-graficos`

**Definición** Varias funciones axes-level pueden dibujar sobre el mismo Axes.

**Búsqueda** Superposición de gráficos; Mostrar cajas y datos originales

**Para recordar** Comprueba que los ejes y categorías sean compatibles antes de combinar capas.

#### Mostrar cajas y datos originales

```python
fig, ax = plt.subplots()
sns.boxplot(data=ventas, x="canal", y="ingresos", ax=ax)
sns.stripplot(data=ventas, x="canal", y="ingresos", color="black", alpha=.6, ax=ax)
```

Los puntos complementan el resumen de la distribución.

**Resultado esperado** Dos cajas con ocho observaciones superpuestas cada una.

### Mostrar y exportar

**Clave** `mostrar-y-exportar`

**Definición** `plt.show()` muestra figuras; `savefig()` exporta imágenes o documentos vectoriales.

**Búsqueda** Mostrar y exportar; Exportar un gráfico de ventas

**Para recordar** Guarda antes de mostrar o cerrar; `dpi` afecta principalmente a la salida ráster.

#### Exportar un gráfico de ventas

```python
ax = sns.barplot(data=ventas, x="canal", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
ax.figure.savefig("ventas.png", dpi=150, bbox_inches="tight")
ax.figure.savefig("ventas.svg", bbox_inches="tight")
plt.show()
```

PNG es ráster y SVG vectorial; también puedes usar PDF.

**Resultado esperado** Archivos `ventas.png` y `ventas.svg` en el directorio actual.

### Anotación de puntos

**Clave** `anotacion-de-puntos`

**Definición** `ax.annotate()` sitúa texto asociado a una coordenada, con un desplazamiento opcional.

**Búsqueda** Anotación de puntos; Señalar el mayor ingreso

**Para recordar** Usa coordenadas de datos para señalar una observación concreta.

#### Señalar el mayor ingreso

```python
ax = sns.scatterplot(data=ventas, x="inversion", y="ingresos")
fila = ventas.loc[ventas["ingresos"].idxmax()]
ax.annotate("Mayor ingreso", xy=(fila["inversion"], fila["ingresos"]), xytext=(-80, -20), textcoords="offset points", arrowprops={"arrowstyle":"->"})
```

La flecha señala el punto de mayor ingreso.

**Resultado esperado** Etiqueta asociada al ingreso de 180.

## Facetas y cuadrículas

**Clave** `facetas-y-cuadriculas`

### Definición

**Clave** `definicion`

**Definición** Las facetas dividen datos en paneles según categorías para comparar patrones con la misma estructura.

**Búsqueda** Facetas y cuadrículas; Comparar regiones en paneles

**Para recordar** Usa `row` y `col` en funciones figure-level.

#### Comparar regiones en paneles

```python
sns.relplot(data=ventas, x="inversion", y="ingresos", col="region", hue="canal")
```

Cada región conserva sus observaciones.

**Resultado esperado** Dos diagramas de dispersión.

### row, col y col_wrap

**Clave** `row-col-y-col-wrap`

**Definición** `row` separa por filas, `col` por columnas y `col_wrap` distribuye una serie de columnas en varias filas.

**Búsqueda** row, col y col_wrap; Mostrar las cuatro sucursales

**Para recordar** `col_wrap` se usa con col sin row.

#### Mostrar las cuatro sucursales

```python
sns.relplot(data=ventas, x="fecha", y="ingresos", col="sucursal", col_wrap=2, kind="line", errorbar=None)
```

Se limita cada fila a dos facetas.

**Resultado esperado** Cuadrícula 2 × 2 de series temporales.

### height y aspect

**Clave** `height-y-aspect`

**Definición** `height` es la altura en pulgadas de cada panel; `aspect` es ancho dividido entre altura.

**Búsqueda** height y aspect; Hacer paneles horizontales

**Para recordar** No equivalen al figsize de una figura completa.

#### Hacer paneles horizontales

```python
sns.displot(data=ventas, x="ingresos", col="region", height=3, aspect=1.5)
```

Cada panel mide aproximadamente 4.5 × 3 pulgadas.

**Resultado esperado** Dos histogramas de formato horizontal.

### sharex y sharey

**Clave** `sharex-y-sharey`

**Definición** Controlan si los paneles comparten escalas de eje.

**Búsqueda** sharex y sharey; Comparar escalas comunes

**Para recordar** Las escalas compartidas permiten comparar magnitudes directamente.

#### Comparar escalas comunes

```python
sns.catplot(data=ventas, x="canal", y="ingresos", col="region", kind="box", sharey=True)
```

Se comparte el eje Y.

**Resultado esperado** Dos paneles con la misma escala vertical.

### FacetGrid y map

**Clave** `facetgrid-y-map`

**Definición** `FacetGrid` crea la cuadrícula; `map` aplica una función pasando vectores por panel.

**Búsqueda** FacetGrid y map; Dibujar histogramas por región

**Para recordar** La función debe poder recibir los argumentos en el formato utilizado por map.

#### Dibujar histogramas por región

```python
g = sns.FacetGrid(ventas, col="region")
g.map(plt.hist, "ingresos", bins=4)
```

Se aplica un histograma de Matplotlib a cada subconjunto.

**Resultado esperado** Dos histogramas, uno por región.

### map_dataframe

**Clave** `map-dataframe`

**Definición** Pasa a la función el DataFrame de cada faceta mediante `data`.

**Búsqueda** map_dataframe; Aplicar dispersión por región

**Para recordar** Es adecuado para funciones con parámetros de nombres de columnas.

#### Aplicar dispersión por región

```python
g = sns.FacetGrid(ventas, col="region", hue="canal")
g.map_dataframe(sns.scatterplot, x="inversion", y="ingresos")
g.add_legend()
```

Se mantienen los nombres de columnas y la semántica de canal.

**Resultado esperado** Dos paneles y leyenda de canales.

### Personalización de grids

**Clave** `personalizacion-de-grids`

**Definición** Los objetos de cuadrícula permiten definir títulos, etiquetas y acceder a sus Axes.

**Búsqueda** Personalización de grids; Titular facetas

**Para recordar** Usa `g.figure` para la figura y `g.axes` para paneles.

#### Titular facetas

```python
g = sns.relplot(data=ventas, x="fecha", y="ingresos", col="region", kind="line", errorbar=None)
g.set_axis_labels("Fecha", "Ingresos medios")
g.set_titles("Región: {col_name}")
```

Se actualizan textos en todos los paneles.

**Resultado esperado** Títulos Región: Norte y Región: Sur.

### PairGrid

**Clave** `pairgrid`

**Definición** Permite elegir una función diferente para la diagonal y para cada triángulo de una matriz de relaciones.

**Búsqueda** PairGrid; Construir una matriz personalizada

**Para recordar** `map_diag`, `map_upper` y `map_lower` controlan las zonas por separado.

#### Construir una matriz personalizada

```python
g = sns.PairGrid(ventas, vars=["ingresos", "inversion", "pedidos"])
g.map_diag(sns.histplot, color="steelblue")
g.map_upper(sns.scatterplot)
g.map_lower(sns.kdeplot, color="steelblue")
```

Se combina distribución, dispersión y densidad conjunta.

**Resultado esperado** Cuadrícula con tres tipos de gráficos.

### JointGrid

**Clave** `jointgrid`

**Definición** Permite configurar por separado el gráfico conjunto y las distribuciones marginales.

**Búsqueda** JointGrid; Combinar dispersión y densidades

**Para recordar** Usa `plot_joint` y `plot_marginals` para controlar las capas.

#### Combinar dispersión y densidades

```python
g = sns.JointGrid(data=ventas, x="inversion", y="ingresos")
g.plot_joint(sns.scatterplot)
g.plot_marginals(sns.kdeplot, color="steelblue")
```

Cada zona recibe una función independiente.

**Resultado esperado** Dispersión con dos curvas marginales.

## Estadística descriptiva para visualizar

**Clave** `estadistica-descriptiva`

### Definición

**Clave** `definicion`

**Definición** La estadística descriptiva resume el centro, dispersión y forma de los datos; Seaborn visualiza estas características.

**Búsqueda** Estadística descriptiva para visualizar; Consultar un resumen

**Para recordar** No interpretes una media sin conocer la distribución y el tamaño de la muestra.

#### Consultar un resumen

```python
print(ventas["ingresos"].describe())
```

Pandas calcula conteo, media, desviación, extremos y cuartiles.

**Resultado esperado** Conteo 16, media 130, mínimo 80 y máximo 180.

### Media, mediana y moda

**Clave** `media-mediana-y-moda`

**Definición** La media promedia valores, la mediana divide los datos ordenados y la moda identifica los más frecuentes.

**Búsqueda** Media, mediana y moda; Comparar medidas de centro

**Para recordar** La media suele ser más sensible a valores extremos.

#### Comparar medidas de centro

```python
s = ventas["ingresos"]
print(s.mean(), s.median(), s.mode().tolist())
```

Se calculan tres medidas con pandas.

**Resultado esperado** Media 130, mediana 130 y modas 120 y 140.

### Varianza y desviación estándar

**Clave** `varianza-y-desviacion-estandar`

**Definición** Miden dispersión; la varianza usa unidades al cuadrado y la desviación estándar vuelve a las unidades originales.

**Búsqueda** Varianza y desviación estándar; Calcular dispersión muestral

**Para recordar** Indica si usas población (`ddof=0`) o muestra (`ddof=1`).

#### Calcular dispersión muestral

```python
s = ventas["ingresos"]
print(round(s.var(ddof=1), 2), round(s.std(ddof=1), 2))
```

Pandas utiliza el denominador n-1.

**Resultado esperado** Varianza 746.67 y desviación estándar 27.33.

### Cuartiles, percentiles e IQR

**Clave** `cuartiles-percentiles-e-iqr`

**Definición** Los cuartiles son percentiles 25, 50 y 75; IQR es Q3 menos Q1.

**Búsqueda** Cuartiles, percentiles e IQR; Calcular rango intercuartílico

**Para recordar** El IQR mide el ancho de la mitad central.

#### Calcular rango intercuartílico

```python
q = ventas["ingresos"].quantile([.25, .5, .75])
print(q.tolist(), q.loc[.75] - q.loc[.25])
```

Se calculan los percentiles mediante pandas.

**Resultado esperado** Q1=115, mediana=130, Q3=145; IQR=30.

### Outliers

**Clave** `outliers`

**Definición** Un criterio descriptivo frecuente marca valores fuera de Q1−1.5×IQR y Q3+1.5×IQR.

**Búsqueda** Outliers; Detectar extremos simulados

**Para recordar** No elimines valores automáticamente: investiga su origen y relevancia.

#### Detectar extremos simulados

```python
s = pd.concat([ventas["ingresos"], pd.Series([500])], ignore_index=True)
q1, q3 = s.quantile([.25, .75])
iqr = q3 - q1
print(s[(s < q1-1.5*iqr) | (s > q3+1.5*iqr)].tolist())
```

El cálculo usa una copia ampliada con un extremo.

**Resultado esperado** `[500]`.

### Frecuencia y asimetría

**Clave** `frecuencia-y-asimetria`

**Definición** La frecuencia describe cuántas observaciones hay; la asimetría describe el desequilibrio entre las colas de la distribución.

**Búsqueda** Frecuencia y asimetría; Explorar una distribución asimétrica

**Para recordar** Un histograma puede ocultar o exagerar asimetrías según sus intervalos.

#### Explorar una distribución asimétrica

```python
sns.histplot(data=simulacion, x="ingresos", bins=20, kde=True, color="steelblue")
```

Se usa una muestra lognormal simulada.

**Resultado esperado** Distribución con cola a la derecha.

### Correlación y causalidad

**Clave** `correlacion-y-causalidad`

**Definición** La correlación mide asociación; una asociación puede surgir por confusión, selección o coincidencia.

**Búsqueda** Correlación y causalidad; Explorar asociación sin inferir causa

**Para recordar** Una recta de regresión no demuestra que X cause Y.

#### Explorar asociación sin inferir causa

```python
sns.scatterplot(data=ventas, x="inversion", y="ingresos", hue="region")
```

La región permite explorar diferencias de grupos.

**Resultado esperado** Asociación positiva visual; no prueba causal.

## Objects API: Plot y capas

**Clave** `objects-plot`

### Definición

**Clave** `definicion`

**Definición** `seaborn.objects` ofrece una interfaz declarativa: se define qué variables representar, qué marcas usar y qué transformaciones aplicar.

**Búsqueda** Objects API: Plot y capas; Crear un gráfico declarativo

**Para recordar** Es una API distinta de `sns.scatterplot`; `add()` añade capas.

#### Crear un gráfico declarativo

```python
so.Plot(ventas, x="inversion", y="ingresos").add(so.Dot()).show()
```

Plot asigna variables y Dot define la marca.

**Resultado esperado** Diagrama de dispersión.

### Plot y propiedades

**Clave** `plot-y-propiedades`

**Definición** `Plot` asigna variables a propiedades como `x`, `y`, `color` y `pointsize`.

**Búsqueda** Plot y propiedades; Colorear puntos por canal

**Para recordar** En Objects el mapeo de color se llama `color`, no `hue`.

#### Colorear puntos por canal

```python
so.Plot(ventas, x="inversion", y="ingresos", color="canal").add(so.Dot()).show()
```

Cada canal recibe un color.

**Resultado esperado** Dispersión con leyenda de canal.

### add y capas

**Clave** `add-y-capas`

**Definición** `add()` añade una marca con cero o más transformaciones; varias llamadas superponen capas.

**Búsqueda** add y capas; Mostrar puntos y tendencia

**Para recordar** Una capa puede tener su propio dataset o variables.

#### Mostrar puntos y tendencia

```python
so.Plot(ventas, x="inversion", y="ingresos").add(so.Dot()).add(so.Line(), so.PolyFit(order=1)).show()
```

Una capa muestra datos y la otra un ajuste lineal.

**Resultado esperado** Puntos y recta de tendencia.

### Marcas Dot, Dots, Line y Path

**Clave** `marcas-dot-dots-line-y-path`

**Definición** `Dot` y `Dots` representan puntos; `Line` conecta según el orden de orientación y `Path` conserva el orden de entrada.

**Búsqueda** Marcas Dot, Dots, Line y Path; Mostrar ingresos diarios

**Para recordar** Usa Line para tendencias ordenadas y Path cuando importa el recorrido original.

#### Mostrar ingresos diarios

```python
so.Plot(diarias.reset_index(), x="fecha", y="Online").add(so.Line()).add(so.Dot()).show()
```

La línea conecta las fechas y los puntos muestran las observaciones.

**Resultado esperado** Cuatro puntos conectados con valores 220, 260, 300 y 340.

### Bar, Bars y Area

**Clave** `bar-bars-y-area`

**Definición** Bar y Bars representan magnitudes desde una base; Area rellena el espacio entre la base y la curva.

**Búsqueda** Bar, Bars y Area; Dibujar ingresos diarios como área

**Para recordar** Selecciona la marca según el objetivo y no por la apariencia únicamente.

#### Dibujar ingresos diarios como área

```python
so.Plot(diarias.reset_index(), x="fecha", y="Online").add(so.Area()).show()
```

Area rellena bajo la serie de ingresos diarios.

**Resultado esperado** Área con alturas 220, 260, 300 y 340 (no es un acumulado matemático).

### Text, Dash, Range y Band

**Clave** `text-dash-range-y-band`

**Definición** Text muestra etiquetas; Dash representa segmentos orientados; Range y Band representan intervalos con líneas o relleno.

**Búsqueda** Text, Dash, Range y Band; Mostrar intervalos de dispersión

**Para recordar** Range y Band necesitan límites o una transformación que los produzca.

#### Mostrar intervalos de dispersión

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Range(), so.Est(errorbar="sd")).add(so.Dot(), so.Agg()).show()
```

Est genera límites alrededor de la media y Agg calcula el punto central.

**Resultado esperado** Dos puntos con intervalos de una desviación estándar.

### Marcas de texto

**Clave** `marcas-de-texto`

**Definición** `Text` utiliza la propiedad `text` para colocar etiquetas en coordenadas de datos.

**Búsqueda** Marcas de texto; Etiquetar ingresos diarios

**Para recordar** Text no calcula ni formatea automáticamente un total de negocio.

#### Etiquetar ingresos diarios

```python
d = diarias.reset_index()
so.Plot(d, x="fecha", y="Online", text="Online").add(so.Dot()).add(so.Text(color="black")).show()
```

El texto representa el valor de cada punto.

**Resultado esperado** Cuatro puntos con etiquetas numéricas.

### Barras de histograma y marcas de intervalo

**Clave** `barras-de-histograma-y-marcas-de-intervalo`

**Definición** `Bars` es una marca eficiente para histogramas; `Band` representa un intervalo relleno.

**Búsqueda** Barras de histograma y marcas de intervalo; Dibujar un histograma declarativo

**Para recordar** Las marcas se combinan con una transformación que genere sus coordenadas.

#### Dibujar un histograma declarativo

```python
so.Plot(ventas, x="ingresos").add(so.Bars(), so.Hist(bins=4)).show()
```

Hist calcula frecuencias y Bars las representa.

**Resultado esperado** Cuatro barras de frecuencia.

## Objects API: transformaciones estadísticas

**Clave** `objects-estadistica`

### Definición

**Clave** `definicion`

**Definición** Las transformaciones estadísticas de Objects convierten observaciones en resúmenes antes de dibujarlas.

**Búsqueda** Objects API: transformaciones estadísticas; Sumar por canal

**Para recordar** Se pasan instancias como `so.Agg()` dentro de `add()`.

#### Sumar por canal

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Bar(), so.Agg("sum")).show()
```

Agg calcula la suma para cada canal.

**Resultado esperado** Dos barras: Online 1120, Tienda 960.

### Agg y Est

**Clave** `agg-y-est`

**Definición** Agg produce un estadístico por grupo; Est añade un intervalo asociado al estadístico.

**Búsqueda** Agg y Est; Estimar media con intervalo

**Para recordar** Agg sirve para totales y medias; Est cuando también quieres incertidumbre o dispersión.

#### Estimar media con intervalo

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Range(), so.Est(errorbar=("ci",95), seed=42)).add(so.Dot(), so.Agg("mean")).show()
```

Se dibuja el intervalo junto a la media.

**Resultado esperado** Dos estimaciones con intervalos de confianza.

### Hist y Count

**Clave** `hist-y-count`

**Definición** Hist agrupa una medida en intervalos; Count cuenta observaciones dentro de grupos.

**Búsqueda** Hist y Count; Contar registros por canal

**Para recordar** Hist es para intervalos numéricos; Count para recuentos por categoría.

#### Contar registros por canal

```python
so.Plot(ventas, x="canal").add(so.Bar(), so.Count()).show()
```

Count produce un valor de conteo por canal.

**Resultado esperado** Dos barras de 8.

### Hist y KDE

**Clave** `hist-y-kde`

**Definición** Hist estima frecuencias por intervalos; KDE estima densidad suave.

**Búsqueda** Hist y KDE; Visualizar densidad de ingresos

**Para recordar** La densidad no representa conteo directo.

#### Visualizar densidad de ingresos

```python
so.Plot(ventas, x="ingresos", color="canal").add(so.Line(), so.KDE()).show()
```

KDE estima una curva por canal.

**Resultado esperado** Dos curvas suavizadas.

### Perc

**Clave** `perc`

**Definición** `Perc` reemplaza observaciones por percentiles de los grupos.

**Búsqueda** Perc; Mostrar tres percentiles por canal

**Para recordar** Especifica los niveles que deseas resumir.

#### Mostrar tres percentiles por canal

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Dot(), so.Perc([25, 50, 75])).show()
```

Se obtienen los percentiles 25, 50 y 75 por canal.

**Resultado esperado** Tres puntos por canal.

### PolyFit

**Clave** `polyfit`

**Definición** `PolyFit` ajusta un polinomio y genera valores predichos para representarlo.

**Búsqueda** PolyFit; Añadir tendencia a una dispersión

**Para recordar** `order=1` ajusta una recta.

#### Añadir tendencia a una dispersión

```python
so.Plot(ventas, x="inversion", y="ingresos").add(so.Dot()).add(so.Line(), so.PolyFit(order=1)).show()
```

La curva procede de un ajuste, no de unir observaciones.

**Resultado esperado** Recta superpuesta a los puntos.

## Objects API: posición y escalas

**Clave** `objects-posicion-y-escalas`

### Definición

**Clave** `definicion`

**Definición** Las transformaciones de posición modifican dónde se dibujan las marcas; las escalas traducen valores a propiedades gráficas.

**Búsqueda** Objects API: posición y escalas; Separar barras por canal

**Para recordar** Las transformaciones se aplican después de los estadísticos, en el orden indicado.

#### Separar barras por canal

```python
so.Plot(ventas, x="region", y="ingresos", color="canal").add(so.Bar(), so.Agg("sum"), so.Dodge()).show()
```

Dodge coloca lado a lado los grupos de color.

**Resultado esperado** Cuatro barras agrupadas.

### Dodge y Stack

**Clave** `dodge-y-stack`

**Definición** Dodge separa marcas que coinciden en posición; Stack las apila.

**Búsqueda** Dodge y Stack; Apilar totales por región

**Para recordar** Apilar sumas tiene sentido cuando representan componentes aditivos.

#### Apilar totales por región

```python
so.Plot(ventas, x="region", y="ingresos", color="canal").add(so.Bar(), so.Agg("sum"), so.Stack()).show()
```

Los totales de canales se suman visualmente.

**Resultado esperado** Dos barras apiladas con alturas 960 y 1120.

### Jitter y Shift

**Clave** `jitter-y-shift`

**Definición** Jitter introduce desplazamiento aleatorio controlado; Shift aplica un desplazamiento fijo.

**Búsqueda** Jitter y Shift; Separar puntos de una categoría

**Para recordar** No interpretes la posición desplazada como dato original.

#### Separar puntos de una categoría

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Dot(), so.Jitter(width=.3, seed=42)).show()
```

El desplazamiento lateral ayuda a ver observaciones repetidas.

**Resultado esperado** Ocho puntos por canal con desplazamiento horizontal.

### Norm

**Clave** `norm`

**Definición** Norm divide valores agregados por una referencia, por defecto su suma, dentro de los grupos definidos.

**Búsqueda** Norm; Mostrar proporción de registros

**Para recordar** Revisa qué grupos forman el denominador antes de interpretar proporciones.

#### Mostrar proporción de registros

```python
so.Plot(ventas, x="canal").add(so.Bar(), so.Count(), so.Norm()).show()
```

Cada conteo se divide por la suma global.

**Resultado esperado** Dos barras de 0.5.

### scale y tipos de escala

**Clave** `scale-y-tipos-de-escala`

**Definición** `Nominal` representa categorías, `Continuous` valores numéricos, `Temporal` fechas y `Boolean` valores lógicos.

**Búsqueda** scale y tipos de escala; Fijar la escala de color

**Para recordar** La escala controla el mapeo, no transforma el DataFrame original.

#### Fijar la escala de color

```python
so.Plot(ventas, x="inversion", y="ingresos", color="canal").add(so.Dot()).scale(color=so.Nominal(values={"Online":"#2878B5", "Tienda":"#E69F00"})).show()
```

Se asignan colores por nombre de categoría.

**Resultado esperado** Dos colores estables.

### label, limit y theme

**Clave** `label-limit-y-theme`

**Definición** Estos métodos cambian etiquetas, límites visibles y parámetros de apariencia en la interfaz Objects.

**Búsqueda** label, limit y theme; Personalizar barras

**Para recordar** Mantén separada la configuración visual del cálculo estadístico.

#### Personalizar barras

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Bar(), so.Agg("sum")).label(x="Canal", y="Ingresos", title="Totales").limit(y=(0, 1300)).theme({"axes.grid": True}).show()
```

Se etiquetan los ejes y se fija el rango vertical.

**Resultado esperado** Dos barras con escala 0–1300 y título Totales.

### Shift

**Clave** `shift`

**Definición** `Shift` mueve marcas una distancia fija en unidades de la escala correspondiente.

**Búsqueda** Shift; Desplazar una capa de etiquetas

**Para recordar** No modifica el dato almacenado.

#### Desplazar una capa de etiquetas

```python
so.Plot(ventas, x="canal", y="ingresos").add(so.Dot()).add(so.Dash(), so.Agg("mean"), so.Shift(x=.2)).show()
```

Se desplaza la marca que indica la media.

**Resultado esperado** Puntos y dos segmentos de media desplazados lateralmente.

### Escalas continuas

**Clave** `escalas-continuas`

**Definición** `Continuous` permite especificar transformaciones y rangos para escalas numéricas.

**Búsqueda** Escalas continuas; Usar escala logarítmica declarativa

**Para recordar** Una escala logarítmica requiere valores positivos.

#### Usar escala logarítmica declarativa

```python
so.Plot(ventas, x="inversion", y="ingresos").add(so.Dot()).scale(y=so.Continuous(trans="log")).show()
```

Se cambia la escala Y, no los ingresos originales.

**Resultado esperado** Puntos con eje Y logarítmico.

## Objects API: composición y exportación

**Clave** `objects-composicion`

### Definición

**Clave** `definicion`

**Definición** Objects puede dividir gráficos en facetas, construir pares de variables y controlar el diseño.

**Búsqueda** Objects API: composición y exportación; Comparar regiones

**Para recordar** `facet()` separa subconjuntos y `pair()` repite el gráfico para diferentes variables.

#### Comparar regiones

```python
so.Plot(ventas, x="inversion", y="ingresos").facet(col="region").add(so.Dot()).show()
```

Se crea un panel por región.

**Resultado esperado** Dos dispersiones.

### facet y layout

**Clave** `facet-y-layout`

**Definición** `facet` especifica variables para filas o columnas; `layout` ajusta el tamaño de la figura y su disposición.

**Búsqueda** facet y layout; Comparar cuatro sucursales

**Para recordar** `layout(size=(ancho, alto))` usa pulgadas.

#### Comparar cuatro sucursales

```python
so.Plot(ventas, x="fecha", y="ingresos").facet(col="sucursal", wrap=2).add(so.Line()).layout(size=(8, 6)).show()
```

Se distribuyen cuatro facetas en dos columnas.

**Resultado esperado** Cuadrícula 2 × 2.

### pair

**Clave** `pair`

**Definición** `pair()` crea combinaciones de variables en los ejes.

**Búsqueda** pair; Comparar predictores de ingresos

**Para recordar** Especifica listas para controlar las combinaciones.

#### Comparar predictores de ingresos

```python
so.Plot(ventas, y="ingresos").pair(x=["inversion", "pedidos"]).add(so.Dot()).show()
```

Se repite el gráfico para cada variable X.

**Resultado esperado** Dos dispersiones con ingresos en Y.

### show, save y on

**Clave** `show-save-y-on`

**Definición** `show()` muestra el gráfico; `save()` lo exporta; `on()` dirige el dibujo a un objeto de Matplotlib compatible.

**Búsqueda** show, save y on; Exportar gráfico declarativo

**Para recordar** Objects no devuelve un Axes del mismo modo que scatterplot.

#### Exportar gráfico declarativo

```python
p = so.Plot(ventas, x="canal", y="ingresos").add(so.Bar(), so.Agg("sum"))
p.save("totales-objects.png", dpi=150)
p.show()
```

Se reutiliza la misma especificación para mostrar y exportar.

**Resultado esperado** Archivo PNG y gráfico de dos barras.

## Análisis exploratorio y comunicación

**Clave** `analisis-exploratorio`

### Definición

**Clave** `definicion`

**Definición** El análisis exploratorio (EDA) combina resúmenes y gráficos para detectar patrones, valores faltantes y posibles errores antes de extraer conclusiones.

**Búsqueda** Análisis exploratorio y comunicación; Examinar los ingresos

**Para recordar** Empieza por la pregunta de negocio, la unidad de análisis y la métrica.

#### Examinar los ingresos

```python
print(ventas[["ingresos", "pedidos"]].describe())
sns.histplot(data=ventas, x="ingresos", color="steelblue")
```

El resumen numérico complementa la forma de la distribución.

**Resultado esperado** Estadísticos de dos variables e histograma de ingresos.

### Elegir el gráfico adecuado

**Clave** `elegir-el-grafico-adecuado`

**Definición** Usa líneas para evolución, barras para comparaciones, histogramas o cajas para distribuciones y dispersión para relaciones.

**Búsqueda** Elegir el gráfico adecuado; Comparar facturación regional

**Para recordar** El tipo de dato y la pregunta determinan la visualización.

#### Comparar facturación regional

```python
sns.barplot(data=ventas, x="region", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
```

La pregunta requiere totales por categoría, no promedios.

**Resultado esperado** Norte 960 y Sur 1120.

### KPIs y tasas

**Clave** `kpis-y-tasas`

**Definición** Un KPI debe tener numerador, denominador, periodo y unidad definidos.

**Búsqueda** KPIs y tasas; Mostrar ticket promedio ponderado por pedidos

**Para recordar** La razón de sumas no equivale necesariamente a la media de razones.

#### Mostrar ticket promedio ponderado por pedidos

```python
kpi = ventas.groupby("canal", as_index=False).agg(ingresos=("ingresos", "sum"), pedidos=("pedidos", "sum"))
kpi["ticket"] = kpi["ingresos"] / kpi["pedidos"]
sns.barplot(data=kpi, x="canal", y="ticket", errorbar=None, color="steelblue")
```

Primero se calcula el KPI correcto y luego se visualiza.

**Resultado esperado** Dos barras de ingresos por pedido, una por canal.

### Comparación temporal

**Clave** `comparacion-temporal`

**Definición** Una comparación temporal exige fechas ordenadas y una agregación consistente.

**Búsqueda** Comparación temporal; Identificar evolución de ingresos diarios

**Para recordar** Si cada fecha tiene varias filas, define si quieres suma o media.

#### Identificar evolución de ingresos diarios

```python
sns.lineplot(data=ventas, x="fecha", y="ingresos", estimator="sum", errorbar=None, marker="o")
```

Se usa la misma métrica para cada día.

**Resultado esperado** Tendencia creciente de 400 a 640.

### Segmentación

**Clave** `segmentacion`

**Definición** Segmentar consiste en comparar subconjuntos de negocio sin perder el contexto de las métricas.

**Búsqueda** Segmentación; Comparar variación de satisfacción

**Para recordar** El tamaño de los grupos puede cambiar las conclusiones.

#### Comparar variación de satisfacción

```python
sns.boxplot(data=ventas, x="region", y="satisfaccion", hue="canal")
```

Las cajas muestran diferencias en centro y dispersión por segmento.

**Resultado esperado** Cuatro cajas con sus medianas y bigotes.

### Visualización no engañosa

**Clave** `visualizacion-no-enganosa`

**Definición** Ejes truncados, intervalos inconsistentes y agregaciones incorrectas pueden distorsionar la interpretación.

**Búsqueda** Visualización no engañosa; Comparar totales con una base común

**Para recordar** En barras de magnitud conserva una base cero y especifica qué se mide.

#### Comparar totales con una base común

```python
ax = sns.barplot(data=ventas, x="canal", y="ingresos", estimator="sum", errorbar=None, color="steelblue")
ax.set_ylim(0, 1300)
ax.set_ylabel("Ingresos totales")
```

El origen y la unidad quedan definidos.

**Resultado esperado** Comparación proporcional entre 1120 y 960.

### Comunicar conclusiones

**Clave** `comunicar-conclusiones`

**Definición** Una visualización de negocio debe indicar qué se observó, en qué periodo y con qué limitaciones.

**Búsqueda** Comunicar conclusiones; Resumir el canal líder

**Para recordar** Distingue descripción de explicación causal.

#### Resumir el canal líder

```python
totales = ventas.groupby("canal")["ingresos"].sum()
print(totales.idxmax(), totales.max())
```

Se extrae un resultado comprobable del conjunto de datos.

**Resultado esperado** `Online 1120`; lidera en ingresos del periodo observado, sin implicar causalidad.

## Compatibilidad entre versiones

**Clave** `compatibilidad`

### Definición

**Clave** `definicion`

**Definición** La API de Seaborn cambia entre versiones, por lo que una función o parámetro puede estar disponible o desaconsejado según el entorno.

**Búsqueda** Compatibilidad entre versiones; Consultar el entorno

**Para recordar** Consulta la versión instalada y su documentación correspondiente.

#### Consultar el entorno

```python
print(sns.__version__)
```

La versión ayuda a identificar qué sintaxis usar.

**Resultado esperado** `0.13.2` en el entorno propuesto.

### ci y errorbar

**Clave** `ci-y-errorbar`

**Definición** Desde 0.12 las funciones de estimación como barplot y lineplot utilizan `errorbar` en lugar de `ci`; regplot conserva `ci`.

**Búsqueda** ci y errorbar; Desactivar intervalos en la API actual

**Para recordar** No hagas un reemplazo automático en todas las funciones.

#### Desactivar intervalos en la API actual

```python
sns.barplot(data=ventas, x="canal", y="ingresos", errorbar=None, color="steelblue")
```

Sustituye el uso anterior `ci=None` en barplot.

**Resultado esperado** Barras sin intervalos.

### distplot y sus reemplazos

**Clave** `distplot-y-sus-reemplazos`

**Definición** `distplot()` está obsoleto; histplot, kdeplot y displot son las alternativas actuales.

**Búsqueda** distplot y sus reemplazos; Reemplazar distplot

**Para recordar** Elige según la representación estadística que necesites.

#### Reemplazar distplot

```python
sns.histplot(data=ventas, x="ingresos", kde=True, color="steelblue")
```

Se conserva la combinación de histograma y densidad.

**Resultado esperado** Barras y curva suavizada.

### Cambios categóricos en 0.13

**Clave** `cambios-categoricos-en-0-13`

**Definición** La versión 0.13 introdujo cambios en color, escalas y opciones categóricas; desde 0.13.2 algunas funciones admiten weights.

**Búsqueda** Cambios categóricos en 0.13; Asignar color por categoría

**Para recordar** Para asignar una paleta por categoría, define hue explícitamente.

#### Asignar color por categoría

```python
sns.barplot(data=ventas, x="canal", y="ingresos", hue="canal", palette="colorblind", legend=False, errorbar=None)
```

El color tiene un mapeo explícito a canal.

**Resultado esperado** Dos barras de colores diferentes sin leyenda redundante.

## Fuentes

Documentación de referencia de Seaborn 0.13.2 y bibliotecas relacionadas. Las fichas son explicaciones y ejemplos propios basados en las API indicadas; el dataset es sintético.

- [Introducción](https://seaborn.pydata.org/tutorial/introduction.html) y [visión general de funciones](https://seaborn.pydata.org/tutorial/function_overview.html): arquitectura, Figure/Axes e interfaces.
- [Estructuras de datos](https://seaborn.pydata.org/tutorial/data_structure.html): formatos largo y ancho, asignación de variables.
- [Relaciones estadísticas](https://seaborn.pydata.org/tutorial/relational.html): scatterplot, lineplot, relplot y semánticas.
- [Estimación y barras de error](https://seaborn.pydata.org/tutorial/error_bars.html): estimadores, SD, SE, intervalos percentiles, IC y bootstrap.
- [Distribuciones](https://seaborn.pydata.org/tutorial/distributions.html): histogramas, KDE, ECDF y facetas.
- [Datos categóricos](https://seaborn.pydata.org/tutorial/categorical.html): conteos, estimaciones, cajas, violines y puntos.
- [Regresión](https://seaborn.pydata.org/tutorial/regression.html): ajustes y exploración de residuos.
- [Estilos](https://seaborn.pydata.org/tutorial/aesthetics.html) y [paletas](https://seaborn.pydata.org/tutorial/color_palettes.html): temas, escalas de color y accesibilidad.
- [Cuadrículas](https://seaborn.pydata.org/tutorial/axis_grids.html): FacetGrid, PairGrid, JointGrid.
- [Objects](https://seaborn.pydata.org/tutorial/objects_interface.html) y [referencia de propiedades](https://seaborn.pydata.org/tutorial/properties.html): capas, marcas, transformaciones y escalas.
- [Referencia completa](https://seaborn.pydata.org/api.html): firmas y opciones admitidas por cada función.
- [Cambios en 0.12](https://seaborn.pydata.org/whatsnew/v0.12.0.html), [0.13](https://seaborn.pydata.org/whatsnew/v0.13.0.html) y [0.13.2](https://seaborn.pydata.org/whatsnew/v0.13.2.html): cambios de API, categorías y ponderaciones.
- [pandas: reshape](https://pandas.pydata.org/docs/user_guide/reshaping.html) y [groupby](https://pandas.pydata.org/docs/user_guide/groupby.html): preparación y métricas de datos.
- [Matplotlib: tutorial inicial](https://matplotlib.org/stable/users/explain/quick_start.html): Figure, Axes, etiquetas y exportación.
- [SciPy: gaussian_kde](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gaussian_kde.html) y [statsmodels](https://www.statsmodels.org/stable/index.html): fundamentos de estimación y modelos utilizados por las opciones estadísticas.

Referencias de funciones: [scatterplot](https://seaborn.pydata.org/generated/seaborn.scatterplot.html) · [lineplot](https://seaborn.pydata.org/generated/seaborn.lineplot.html) · [relplot](https://seaborn.pydata.org/generated/seaborn.relplot.html) · [barplot](https://seaborn.pydata.org/generated/seaborn.barplot.html) · [pointplot](https://seaborn.pydata.org/generated/seaborn.pointplot.html) · [countplot](https://seaborn.pydata.org/generated/seaborn.countplot.html) · [histplot](https://seaborn.pydata.org/generated/seaborn.histplot.html) · [kdeplot](https://seaborn.pydata.org/generated/seaborn.kdeplot.html) · [ecdfplot](https://seaborn.pydata.org/generated/seaborn.ecdfplot.html) · [rugplot](https://seaborn.pydata.org/generated/seaborn.rugplot.html) · [displot](https://seaborn.pydata.org/generated/seaborn.displot.html) · [boxplot](https://seaborn.pydata.org/generated/seaborn.boxplot.html) · [violinplot](https://seaborn.pydata.org/generated/seaborn.violinplot.html) · [stripplot](https://seaborn.pydata.org/generated/seaborn.stripplot.html) · [swarmplot](https://seaborn.pydata.org/generated/seaborn.swarmplot.html) · [boxenplot](https://seaborn.pydata.org/generated/seaborn.boxenplot.html) · [catplot](https://seaborn.pydata.org/generated/seaborn.catplot.html) · [heatmap](https://seaborn.pydata.org/generated/seaborn.heatmap.html) · [clustermap](https://seaborn.pydata.org/generated/seaborn.clustermap.html) · [pairplot](https://seaborn.pydata.org/generated/seaborn.pairplot.html) · [jointplot](https://seaborn.pydata.org/generated/seaborn.jointplot.html) · [regplot](https://seaborn.pydata.org/generated/seaborn.regplot.html) · [lmplot](https://seaborn.pydata.org/generated/seaborn.lmplot.html) · [residplot](https://seaborn.pydata.org/generated/seaborn.residplot.html) · [FacetGrid](https://seaborn.pydata.org/generated/seaborn.FacetGrid.html) · [PairGrid](https://seaborn.pydata.org/generated/seaborn.PairGrid.html) · [JointGrid](https://seaborn.pydata.org/generated/seaborn.JointGrid.html) · [set_theme](https://seaborn.pydata.org/generated/seaborn.set_theme.html) · [color_palette](https://seaborn.pydata.org/generated/seaborn.color_palette.html) · [move_legend](https://seaborn.pydata.org/generated/seaborn.move_legend.html) · [objects.Plot](https://seaborn.pydata.org/generated/seaborn.objects.Plot.html) · [objects.Perc](https://seaborn.pydata.org/generated/seaborn.objects.Perc.html) · [objects.Norm](https://seaborn.pydata.org/generated/seaborn.objects.Norm.html) · [objects.Est](https://seaborn.pydata.org/generated/seaborn.objects.Est.html) · [objects.Count](https://seaborn.pydata.org/generated/seaborn.objects.Count.html).
