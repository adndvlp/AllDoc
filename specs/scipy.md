# SciPy

**Clave** `scipy`

**Área** Análisis de datos (ubicación propuesta para AllDoc).

**Resumen** Biblioteca de Python para estadística, inferencia, experimentación, optimización y cálculo científico sobre arreglos numéricos.

**Alcance** Temario acordado: estadística descriptiva y robusta, distribuciones, pruebas de hipótesis, normalidad, correlación, regresión, experimentos, remuestreo, datos categóricos y módulos complementarios de cálculo científico. Se prioriza el uso analítico; los últimos grupos son complementarios o especializados y no representan requisitos universales de entrevistas junior.

**Entorno** Python 3.11 o superior, SciPy 1.17.0 y NumPy 2.3.5 como entorno de referencia de los ejemplos. `python -m pip install scipy==1.17.0 numpy==2.3.5`. Para los ejemplos gráficos opcionales, instalar `matplotlib`. Los ejemplos se pueden ejecutar en Python o Jupyter; requieren un runtime que tenga SciPy instalado. Los cálculos con azar reinician su generador en cada ejemplo. Los valores numéricos se muestran redondeados cuando conviene.

## Datos compartidos

Datos sintéticos de negocio, no registros reales ni datasets de AllDoc. Ejecuta esta preparación antes de cualquier ejemplo. Cada ficha parte de estos datos originales; sus variables auxiliares se crean en su propio bloque. Las importaciones de otros módulos aparecen cuando se necesitan.

```python
import numpy as np
from scipy import stats

ventas = np.array([100, 120, 120, 140, 220], dtype=float)
ventas_nan = np.array([100, 120, np.nan, 140, 220])
canal_a = np.array([98, 105, 110, 115, 120, 125, 130, 135])
canal_b = np.array([110, 118, 121, 130, 135, 142, 148, 155])
antes = np.array([42, 45, 48, 50, 54, 58, 60, 63])
despues = np.array([40, 42, 47, 46, 50, 53, 57, 58])
canal_c = np.array([120, 130, 140, 150, 160, 170, 180, 190])
publicidad = np.array([1, 2, 3, 4, 5])
ingresos = np.array([3, 5, 7, 8, 12])
matriz = np.array([[10, 20, 30], [40, 50, 60]])
# Filas A y B; columnas conversion y no conversion
conversiones = np.array([[40, 160], [60, 140]])
```

- `ventas`: importes de cinco pedidos; `ventas_nan` incluye un importe ausente.
- `canal_a`, `canal_b`, `canal_c`: importes de grupos independientes de clientes, uno por observación.
- `antes`, `despues`: tiempos del mismo conjunto de ocho empleados, emparejados por posición.
- `publicidad`, `ingresos`: inversión e ingresos de cinco periodos, en miles de unidades monetarias.
- `matriz`: dos filas (sucursales), tres columnas (periodos).
- `conversiones`: resultados de dos grupos independientes A y B; columnas conversión y no conversión.

## SciPy y entorno

**Clave** `entorno`

### Definición

**Clave** `definicion`

**Definición** SciPy amplía NumPy con algoritmos científicos y estadísticos. Se importa el submódulo que contiene la operación necesaria.

**Búsqueda** scipy importar instalar numpy stats

**Para recordar** NumPy aporta arreglos; SciPy aporta algoritmos.

#### Importar estadística y obtener el promedio

```python
from scipy import stats
print(round(stats.describe(ventas).mean, 2))
```

`stats` es el submódulo de estadística.

**Resultado esperado**

```text
140.0
```

### Importación y submódulos

**Clave** `importacion`

**Definición** Importa el módulo o la función concreta que vas a utilizar.

**Búsqueda** from scipy import stats optimize

**Para recordar** Importa solo lo que necesitas.

#### Obtener el rango intercuartílico con importación directa

```python
from scipy.stats import iqr
print(iqr(ventas))
```

`iqr` queda disponible directamente.

**Resultado esperado**

```text
20.0
```

### Arreglos y axis

**Clave** `axis`

**Definición** `axis` indica la dimensión sobre la que se reduce un arreglo.

**Búsqueda** axis 0 axis 1 columnas filas

**Para recordar** axis=0 reduce filas; axis=1 reduce columnas en 2D.

#### Calcular la media por sucursal y por periodo

```python
print(stats.describe(matriz, axis=1).mean)
print(stats.describe(matriz, axis=0).mean)
```

El primer resultado resume cada fila y el segundo cada columna.

**Resultado esperado**

```text
[20. 50.]
[25. 35. 45.]
```

### Valores faltantes y nan_policy

**Clave** `nan-policy`

**Definición** Muchas funciones permiten propagar, omitir o rechazar NaN.

**Búsqueda** NaN omit propagate raise missing

**Para recordar** Omitir no equivale a reemplazar por cero.

**Nota** No todas las funciones aceptan nan_policy; comprueba su firma.

#### Obtener el error estándar sin datos ausentes

```python
print(round(stats.sem(ventas_nan, nan_policy='omit'), 3))
```

Se analizan cuatro valores válidos.

**Resultado esperado**

```text
26.3
```

### Resultados y atributos

**Clave** `resultados`

**Definición** Varias funciones devuelven objetos con campos nombrados en lugar de un número suelto.

**Búsqueda** statistic pvalue mean variance result

**Para recordar** Consulta atributos por nombre.

#### Leer tamaño y media del resumen

```python
r = stats.describe(ventas)
print(r.nobs, r.mean)
```

`nobs` es el número de observaciones.

**Resultado esperado**

```text
5 140.0
```

### Reproducibilidad y rng

**Clave** `rng`

**Definición** Un generador aleatorio con semilla permite repetir simulaciones en un entorno fijo.

**Búsqueda** seed rng random_state

**Para recordar** Crea un generador nuevo con la misma semilla para repetir.

**Nota** En APIs recientes de remuestreo se usa rng; muchas distribuciones aún usan random_state.

#### Repetir una muestra simulada

```python
a = stats.norm.rvs(size=4, random_state=np.random.default_rng(42))
b = stats.norm.rvs(size=4, random_state=np.random.default_rng(42))
print(np.array_equal(a, b))
```

Los dos generadores comienzan en el mismo estado.

**Resultado esperado**

```text
True
```

## Estadística descriptiva

**Clave** `estadistica-descriptiva`

### Definición

**Clave** `definicion`

**Definición** Resume el centro, la dispersión y la forma de los datos. SciPy complementa las operaciones básicas de NumPy.

**Búsqueda** describe media varianza resumen

**Para recordar** Describe primero los datos antes de inferir.

#### Resumir importes de pedidos

```python
r = stats.describe(ventas)
print(r.nobs, r.minmax, r.mean)
```

El resultado incluye tamaño, mínimo, máximo y media.

**Resultado esperado**

```text
5 (np.float64(100.0), np.float64(220.0)) 140.0
```

### Media, mediana y moda

**Clave** `centro`

**Definición** La media usa todos los valores; la mediana es el centro ordenado y la moda el valor más frecuente.

**Búsqueda** mean median mode

**Para recordar** La mediana resiste mejor valores extremos.

**Nota** Si hay empate, mode devuelve una sola moda.

#### Comparar medidas de centro

```python
print(np.mean(ventas), np.median(ventas))
r = stats.mode(ventas)
print(r.mode, r.count)
```

mode devuelve también la frecuencia de la moda.

**Resultado esperado**

```text
140.0 120.0
120.0 2
```

### Varianza y desviación estándar

**Clave** `dispersion`

**Definición** La varianza mide dispersión cuadrática y la desviación estándar vuelve a las unidades originales.

**Búsqueda** var std ddof n-1

**Para recordar** ddof=1 usa divisor n-1; ddof=0 usa n.

#### Calcular dispersión muestral

```python
print(round(np.var(ventas, ddof=1), 2))
print(round(np.std(ventas, ddof=1), 2))
```

Se estima la dispersión a partir de una muestra.

**Resultado esperado**

```text
2200.0
46.9
```

### Media geométrica

**Clave** `gmean`

**Definición** Promedia factores multiplicativos positivos; es útil para crecimiento compuesto.

**Búsqueda** gmean crecimiento compuesto

**Para recordar** Promedia factores, no porcentajes directamente.

#### Calcular crecimiento medio de dos periodos

```python
factores = [1.10, 1.21]
print(round((stats.gmean(factores)-1)*100, 2))
```

Se resta uno al factor medio para obtener el porcentaje.

**Resultado esperado**

```text
15.37
```

### Media armónica

**Clave** `hmean`

**Definición** Promedia tasas positivas cuando la cantidad base de cada tramo es igual.

**Búsqueda** hmean tasas velocidades

**Para recordar** No uses media aritmética para tasas con numerador constante.

#### Promediar productividad en lotes iguales

```python
print(round(stats.hmean([10, 20]), 2))
```

Dos lotes iguales procesados a distintas tasas.

**Resultado esperado**

```text
13.33
```

### Error estándar

**Clave** `sem`

**Definición** Estima la variabilidad de la media muestral entre muestras independientes.

**Búsqueda** sem standard error

**Para recordar** SEM = desviación muestral / raíz de n.

#### Estimar incertidumbre de la media

```python
print(round(stats.sem(ventas), 3))
```

No es la dispersión de los pedidos individuales.

**Resultado esperado**

```text
20.976
```

### Asimetría

**Clave** `skew`

**Definición** Mide el desequilibrio de las colas de una distribución.

**Búsqueda** skew asimetria sesgo

**Para recordar** Positiva indica cola hacia valores altos.

#### Medir asimetría de importes

```python
print(round(stats.skew(ventas, bias=False), 3))
```

El importe 220 alarga la cola derecha.

**Resultado esperado**

```text
1.744
```

### Curtosis

**Clave** `kurtosis`

**Definición** Mide el cuarto momento estandarizado, relacionado con el peso de las colas.

**Búsqueda** kurtosis fisher bias

**Para recordar** fisher=True compara con normal = 0.

#### Calcular exceso de curtosis

```python
print(round(stats.kurtosis(ventas, fisher=True, bias=False), 3))
```

El valor es una estimación de exceso, no una prueba de normalidad.

**Resultado esperado**

```text
3.322
```

### Momentos

**Clave** `moment`

**Definición** Calcula momentos centrales de un orden indicado.

**Búsqueda** moment segundo momento

**Para recordar** El segundo momento central con divisor n es la varianza poblacional.

#### Calcular segundo momento

```python
print(stats.moment(ventas, order=2))
```

Se eleva al cuadrado la distancia de cada dato a la media.

**Resultado esperado**

```text
1760.0
```

### Coeficiente de variación

**Clave** `variation`

**Definición** Divide la desviación estándar entre la media para comparar dispersión relativa.

**Búsqueda** variation cv dispersion relativa

**Para recordar** Tiene sentido en escalas de razón y con media positiva alejada de cero.

#### Medir variabilidad relativa

```python
print(round(stats.variation(ventas, ddof=1)*100, 2))
```

El resultado está en porcentaje.

**Resultado esperado**

```text
33.5
```

## Cuantiles, outliers y estadística robusta

**Clave** `robusta`

### Definición

**Clave** `definicion`

**Definición** Los cuantiles localizan posiciones y las medidas robustas reducen la influencia de valores extremos. Un outlier es una observación inusual, no necesariamente errónea.

**Búsqueda** percentil outlier iqr robusta

**Para recordar** Investiga los extremos antes de eliminarlos.

#### Calcular el rango intercuartílico

```python
print(stats.iqr(ventas))
```

IQR es Q3 menos Q1.

**Resultado esperado**

```text
20.0
```

### Percentiles

**Clave** `percentiles`

**Definición** Un percentil devuelve el valor en una posición porcentual de la distribución ordenada.

**Búsqueda** scoreatpercentile quantile p25 p75

**Para recordar** Percentil 50 = mediana.

#### Calcular cuartiles

```python
print(stats.scoreatpercentile(ventas, 25))
print(stats.scoreatpercentile(ventas, 75))
```

Se usa interpolación por defecto; NumPy ofrece np.percentile como alternativa.

**Resultado esperado**

```text
120.0
140.0
```

### Rango percentil

**Clave** `percentileofscore`

**Definición** Indica qué porcentaje de observaciones queda por debajo o a la altura de un valor según el criterio elegido.

**Búsqueda** percentileofscore rank weak strict

**Para recordar** weak incluye los iguales; strict no.

#### Situar un pedido de 120

```python
print(stats.percentileofscore(ventas, 120, kind='weak'))
print(stats.percentileofscore(ventas, 120, kind='strict'))
```

Los empates explican la diferencia.

**Resultado esperado**

```text
60.0
20.0
```

### IQR y límites de Tukey

**Clave** `iqr`

**Definición** El rango Q3-Q1 permite definir límites exploratorios Q1-1.5 IQR y Q3+1.5 IQR.

**Búsqueda** iqr detectar atipicos tukey

**Para recordar** Los límites son criterios exploratorios, no pruebas de error.

**Nota** Los extremos de muestras pequeñas pueden ser legítimos.

#### Identificar importes fuera de límites

```python
q1, q3 = np.percentile(ventas, [25, 75])
r = stats.iqr(ventas)
print(ventas[np.logical_or(ventas < q1-1.5*r, ventas > q3+1.5*r)])
```

Se conservan solo los importes fuera del rango.

**Resultado esperado**

```text
[220.]
```

### Puntuación Z

**Clave** `zscore`

**Definición** Expresa cuántas desviaciones estándar separan un dato de la media.

**Búsqueda** zscore estandarizar

**Para recordar** Z positivo está por encima de la media.

#### Estandarizar importes

```python
print(np.round(stats.zscore(ventas), 3))
```

El promedio de los Z es cero; su desviación con ddof=0 es uno.

**Resultado esperado**

```text
[-0.953 -0.477 -0.477  0.     1.907]
```

### Desviación absoluta mediana

**Clave** `mad`

**Definición** MAD es la mediana de las distancias absolutas a la mediana.

**Búsqueda** median_abs_deviation mad

**Para recordar** MAD resiste valores extremos.

#### Medir dispersión robusta

```python
print(stats.median_abs_deviation(ventas))
```

No utiliza distancias cuadráticas a la media.

**Resultado esperado**

```text
20.0
```

### Media recortada

**Clave** `trim-mean`

**Definición** Elimina una proporción de cada extremo antes de calcular la media.

**Búsqueda** trim_mean recortar

**Para recordar** 0.2 recorta el 20% de cada cola.

#### Reducir influencia de extremos

```python
print(stats.trim_mean(ventas, 0.2))
```

Con cinco datos, elimina el menor y el mayor.

**Resultado esperado**

```text
126.66666666666667
```

### Winsorización

**Clave** `winsorize`

**Definición** Sustituye los extremos por valores límite sin eliminar registros.

**Búsqueda** mstats winsorize

**Para recordar** Recorta valores, no filas.

#### Limitar importes extremos

```python
r = stats.mstats.winsorize(ventas, limits=(0.2, 0.2))
print(np.asarray(r))
```

Se conserva el número de observaciones.

**Resultado esperado**

```text
[120. 120. 120. 140. 140.]
```

### Ranking de datos

**Clave** `rankdata`

**Definición** Asigna posiciones a valores ordenados con una regla de empates.

**Búsqueda** rankdata average dense min ordinal

**Para recordar** method controla qué ocurre con empates.

#### Comparar rangos promedio y densos

```python
print(stats.rankdata(ventas, method='average'))
print(stats.rankdata(ventas, method='dense'))
```

Los dos importes 120 reciben la misma posición con estas reglas.

**Resultado esperado**

```text
[1.  2.5 2.5 4.  5. ]
[1 2 2 3 4]
```

## Transformaciones y frecuencias

**Clave** `transformaciones`

### Definición

**Clave** `definicion`

**Definición** Transformar valores o resumirlos por intervalos ayuda a estudiar distribuciones y patrones.

**Búsqueda** boxcox yeojohnson ecdf frecuencias

**Para recordar** Una transformación no corrige por sí sola los supuestos de un modelo.

#### Contar pedidos por intervalo

```python
r = stats.binned_statistic(ventas, ventas, statistic="count", bins=[0, 150, 300])
print(r.statistic)
```

Los intervalos no finales excluyen su extremo derecho.

**Resultado esperado**

```text
[4. 1.]
```

### Box-Cox

**Clave** `boxcox`

**Definición** Transforma datos estrictamente positivos mediante una potencia que puede estimarse de la muestra.

**Búsqueda** boxcox lambda normalidad

**Para recordar** Requiere valores mayores que cero.

#### Transformar importes positivos

```python
y, lam = stats.boxcox(ventas)
print(np.round(y, 3), round(lam, 3))
```

La función estima lambda y devuelve los datos transformados.

**Resultado esperado**

```text
[0.495 0.495 0.495 0.495 0.495] -2.019
```

### Yeo-Johnson

**Clave** `yeojohnson`

**Definición** Transformación de potencia que admite cero y valores negativos.

**Búsqueda** yeojohnson lambda negativos

**Para recordar** Útil cuando Box-Cox no admite los datos.

#### Transformar variaciones de ingresos

```python
y, lam = stats.yeojohnson([-10, 0, 5, 10, 40])
print(np.round(y, 3), round(lam, 3))
```

Se transforma cada variación conservando su orden.

**Resultado esperado**

```text
[-13.932   0.      3.999   7.282  23.245] 0.802
```

### Distribución acumulada empírica

**Clave** `ecdf`

**Definición** Estima la fracción de datos menores o iguales que un valor sin asumir una distribución teórica.

**Búsqueda** ecdf cdf empirica

**Para recordar** Cada observación aporta 1/n a la acumulada.

#### Calcular fracción de pedidos hasta 120

```python
r = stats.ecdf(ventas)
print(r.cdf.evaluate(120))
```

Tres de cinco observaciones no superan 120.

**Resultado esperado**

```text
0.6
```

### Estadísticas por intervalos

**Clave** `binned-statistic`

**Definición** Agrupa una variable numérica en intervalos y calcula una estadística de otra variable.

**Búsqueda** binned_statistic bins mean count

**Para recordar** Los intervalos definen los grupos.

#### Obtener importe medio por rango

```python
r = stats.binned_statistic(ventas, ventas, statistic='mean', bins=[0, 150, 300])
print(r.statistic)
```

Se calcula la media dentro de cada rango.

**Resultado esperado**

```text
[120. 220.]
```

### Entropía

**Clave** `entropy`

**Definición** Mide incertidumbre de una distribución de probabilidades; con base 2 se expresa en bits.

**Búsqueda** entropy shannon incertidumbre

**Para recordar** Más concentración implica menor entropía.

#### Comparar dos repartos de ventas

```python
print(stats.entropy([50, 50], base=2))
print(round(stats.entropy([90, 10], base=2), 3))
```

La función normaliza los conteos.

**Resultado esperado**

```text
1.0
0.469
```

### Media circular

**Clave** `circmean`

**Definición** Promedia valores que se repiten cíclicamente, como horas o ángulos.

**Búsqueda** circmean horas circular

**Para recordar** 23:00 y 01:00 están cerca de medianoche.

#### Promediar horas de actividad

```python
h = stats.circmean([23, 1], high=24, low=0)
print(round(h % 24, 6) % 24)
```

Se utiliza un ciclo de 24 horas.

**Resultado esperado**

```text
0.0
```

## Distribuciones de probabilidad

**Clave** `distribuciones`

### Definición

**Clave** `definicion`

**Definición** Una distribución modela qué valores puede tomar una variable aleatoria y con qué probabilidades. Las discretas asignan masa; las continuas asignan densidad.

**Búsqueda** norm binom poisson distribucion loc scale

**Para recordar** Elige la distribución según el proceso, no solo por comodidad.

#### Consultar una normal estándar

```python
print(stats.norm.cdf(0))
```

La mitad de la normal estándar está por debajo de cero.

**Resultado esperado**

```text
0.5
```

### Normal

**Clave** `norm`

**Definición** Distribución continua simétrica parametrizada por media loc y desviación scale.

**Búsqueda** norm gaussiana loc scale

**Para recordar** scale es desviación, no varianza.

#### Probabilidad de importe hasta 120

```python
print(round(stats.norm.cdf(120, loc=100, scale=20), 4))
```

Modelo ilustrativo con media 100 y desviación 20.

**Resultado esperado**

```text
0.8413
```

### Binomial

**Clave** `binom`

**Definición** Modela éxitos en n ensayos independientes con probabilidad p constante.

**Búsqueda** binom conversiones ensayos

**Para recordar** n es número de ensayos; p es probabilidad de éxito.

#### Probabilidad de dos conversiones en cinco

```python
print(round(stats.binom.pmf(2, n=5, p=0.2), 4))
```

Se calcula la probabilidad de exactamente dos éxitos.

**Resultado esperado**

```text
0.2048
```

### Poisson

**Clave** `poisson`

**Definición** Modela conteos de eventos con una tasa media mu por intervalo, bajo supuestos de independencia y tasa constante.

**Búsqueda** poisson conteos tasa mu

**Para recordar** mu representa eventos esperados por intervalo.

#### Probabilidad de cero incidencias

```python
print(round(stats.poisson.pmf(0, mu=3), 4))
```

Se supone una media de tres incidencias por periodo.

**Resultado esperado**

```text
0.0498
```

### Uniforme

**Clave** `uniform`

**Definición** Modelo continuo de densidad constante en un intervalo.

**Búsqueda** uniform loc scale

**Para recordar** El intervalo es loc hasta loc+scale.

#### Probabilidad de espera hasta 15 minutos

```python
print(stats.uniform.cdf(15, loc=10, scale=20))
```

El modelo abarca de 10 a 30 minutos.

**Resultado esperado**

```text
0.25
```

### Exponencial

**Clave** `expon`

**Definición** Modela tiempos entre eventos de un proceso de Poisson homogéneo.

**Búsqueda** expon espera scale tasa

**Para recordar** scale = 1/tasa.

#### Probabilidad de esperar más de diez minutos

```python
print(round(stats.expon.sf(10, scale=5), 4))
```

La espera media es cinco minutos.

**Resultado esperado**

```text
0.1353
```

### t de Student

**Clave** `t`

**Definición** Distribución simétrica con colas más pesadas que la normal para pocos grados de libertad.

**Búsqueda** t student df

**Para recordar** Con df grande se aproxima a la normal.

#### Obtener valor crítico bilateral del 95%

```python
print(round(stats.t.ppf(0.975, df=7), 4))
```

Se deja 2.5% en cada cola.

**Resultado esperado**

```text
2.3646
```

### Chi-cuadrado

**Clave** `chi2`

**Definición** Distribución no negativa usada en pruebas de conteos y varianzas.

**Búsqueda** chi2 grados libertad

**Para recordar** Su forma depende de df.

#### Obtener valor crítico superior

```python
print(round(stats.chi2.ppf(0.95, df=2), 4))
```

El 5% queda por encima del cuantil.

**Resultado esperado**

```text
5.9915
```

### Distribución F

**Clave** `f`

**Definición** Modela cocientes de varianzas escaladas bajo supuestos normales; aparece en ANOVA.

**Búsqueda** f dfn dfd

**Para recordar** Tiene grados de libertad de numerador y denominador.

#### Consultar un cuantil de F

```python
print(round(stats.f.ppf(0.95, dfn=2, dfd=21), 4))
```

Es un umbral de cola superior.

**Resultado esperado**

```text
3.4668
```

### Beta

**Clave** `beta`

**Definición** Distribución continua entre cero y uno útil para modelar proporciones.

**Búsqueda** beta a b proporciones

**Para recordar** a y b son parámetros de forma positivos.

#### Calcular media de una beta

```python
print(stats.beta.mean(a=2, b=8))
```

La media es a/(a+b).

**Resultado esperado**

```text
0.2
```

## Métodos de distribuciones

**Clave** `metodos-distribuciones`

### Definición

**Clave** `definicion`

**Definición** Los objetos de distribución ofrecen métodos para consultar probabilidades, cuantiles, generar muestras y ajustar parámetros.

**Búsqueda** pdf pmf cdf sf ppf rvs fit interval

**Para recordar** CDF convierte valor en probabilidad; PPF hace lo inverso.

#### Calcular percentil 90 de un modelo

```python
print(round(stats.norm.ppf(0.9, loc=100, scale=20), 2))
```

El 90% de la distribución queda hasta ese importe.

**Resultado esperado**

```text
125.63
```

### PDF y PMF

**Clave** `pdf-pmf`

**Definición** pdf devuelve densidad continua; pmf devuelve probabilidad de un valor discreto.

**Búsqueda** pdf pmf densidad probabilidad

**Para recordar** Una densidad en un punto no es una probabilidad puntual.

#### Consultar densidad y masa

```python
print(round(stats.norm.pdf(0), 4))
print(stats.binom.pmf(0, n=2, p=0.5))
```

La primera salida es densidad; la segunda, probabilidad.

**Resultado esperado**

```text
0.3989
0.24999999999999997
```

### CDF

**Clave** `cdf`

**Definición** Calcula P(X <= x).

**Búsqueda** cdf acumulada menor igual

**Para recordar** Para un intervalo continuo resta dos CDF.

#### Probabilidad de importe entre 80 y 120

```python
d = stats.norm(loc=100, scale=20)
print(round(d.cdf(120)-d.cdf(80), 4))
```

La resta mide el área entre ambos límites.

**Resultado esperado**

```text
0.6827
```

### SF

**Clave** `sf`

**Definición** Calcula la probabilidad estrictamente superior al umbral.

**Búsqueda** sf cola superior 1-cdf

**Para recordar** SF puede ser más precisa que 1-CDF en colas.

#### Probabilidad de tres o más conversiones

```python
print(round(stats.binom.sf(2, n=5, p=0.2), 4))
```

Para X >= 3 discreto, se usa sf(2).

**Resultado esperado**

```text
0.0579
```

### PPF

**Clave** `ppf`

**Definición** Devuelve un cuantil a partir de una probabilidad acumulada.

**Búsqueda** ppf inversa cdf cuantil

**Para recordar** La probabilidad debe estar entre 0 y 1.

#### Calcular límite del 95%

```python
print(round(stats.norm.ppf(0.95, loc=100, scale=20), 2))
```

El 95% del modelo queda por debajo.

**Resultado esperado**

```text
132.9
```

### RVS

**Clave** `rvs`

**Definición** Genera observaciones de una distribución con los parámetros indicados.

**Búsqueda** rvs simulacion random_state size

**Para recordar** Fija semilla para reproducir.

#### Simular demanda de cuatro días

```python
print(stats.poisson.rvs(mu=3, size=4, random_state=np.random.default_rng(7)))
```

Cada salida es un conteo simulado.

**Resultado esperado**

```text
[4 1 4 3]
```

### FIT

**Clave** `fit`

**Definición** Estima parámetros de una distribución a partir de datos observados.

**Búsqueda** fit ajustar loc scale

**Para recordar** Ajustar parámetros no demuestra que el modelo sea correcto.

#### Ajustar normal a importes

```python
loc, scale = stats.norm.fit(ventas)
print(round(loc, 2), round(scale, 2))
```

La desviación estimada por máxima verosimilitud usa divisor n.

**Resultado esperado**

```text
140.0 41.95
```

### INTERVAL

**Clave** `interval`

**Definición** Devuelve el intervalo central de probabilidad de una distribución.

**Búsqueda** interval probabilidad central

**Para recordar** No es automáticamente un intervalo de confianza para la media.

#### Obtener intervalo central de importes

```python
print(np.round(stats.norm.interval(0.95, loc=100, scale=20), 2))
```

El modelo asigna 95% de probabilidad al intervalo.

**Resultado esperado**

```text
[ 60.8 139.2]
```

## Inferencia estadística

**Clave** `inferencia`

### Definición

**Clave** `definicion`

**Definición** La inferencia usa muestras para estimar parámetros poblacionales o evaluar hipótesis bajo ciertos supuestos.

**Búsqueda** inferencia hipótesis pvalue alpha

**Para recordar** Una conclusión estadística depende del diseño y los supuestos.

#### Obtener un estadístico y un p-value

```python
r = stats.ttest_1samp(canal_a, popmean=100)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Se contrasta si la media poblacional es 100; la prueba t presupone observaciones independientes y, para muestras pequeñas, normalidad aproximada.

**Resultado esperado**

```text
3.8512 0.0063
```

### Hipótesis nula y alternativa

**Clave** `hipotesis`

**Definición** H0 es la afirmación de referencia; H1 es la alternativa que se contrasta.

**Búsqueda** H0 H1 prueba hipótesis

**Para recordar** Define H0 y H1 antes de analizar.

#### Contrastar una media objetivo

```python
r = stats.ttest_1samp(canal_a, 100)
print(round(r.pvalue, 4))
```

H0: media = 100; H1: media distinta de 100.

**Resultado esperado**

```text
0.0063
```

### P-value y significancia

**Clave** `pvalue`

**Definición** El p-value mide, suponiendo H0 y el modelo, la probabilidad de un resultado al menos tan extremo como el observado según la prueba.

**Búsqueda** pvalue alpha rechazar significancia

**Para recordar** p menor o igual a alpha permite rechazar H0; no es probabilidad de que H0 sea verdadera.

#### Decidir con alpha de 0.05

```python
r = stats.ttest_1samp(canal_a, 100)
print(r.pvalue <= 0.05)
```

True significa rechazar H0 bajo el criterio elegido.

**Resultado esperado**

```text
True
```

### Pruebas unilaterales y bilaterales

**Clave** `alternative`

**Definición** alternative fija si se busca diferencia en ambas direcciones o solo en una.

**Búsqueda** alternative two-sided greater less

**Para recordar** Elige la dirección antes de observar los resultados.

#### Evaluar si la media supera 100

```python
r = stats.ttest_1samp(canal_a, 100, alternative='greater')
print(round(r.pvalue, 4))
```

La hipótesis alternativa es media mayor a 100.

**Resultado esperado**

```text
0.0031
```

### Grados de libertad

**Clave** `grados-libertad`

**Definición** Los grados de libertad reflejan cuánta información independiente queda para estimar variabilidad tras las restricciones del modelo.

**Búsqueda** df ddof grados libertad

**Para recordar** En t de una muestra, df = n-1.

#### Leer grados de libertad de una prueba t

```python
r = stats.ttest_1samp(canal_a, 100)
print(r.df)
```

Ocho observaciones producen siete grados de libertad.

**Resultado esperado**

```text
7
```

### Errores tipo I y II

**Clave** `errores`

**Definición** Tipo I: rechazar H0 siendo verdadera. Tipo II: no rechazarla siendo falsa.

**Búsqueda** alpha beta falso positivo falso negativo

**Para recordar** Potencia = 1-beta; no rechazar no demuestra igualdad.

#### Simular falsos positivos bajo H0

```python
rng = np.random.default_rng(42)
x = rng.normal(100, 10, size=(2000, 20))
p = stats.ttest_1samp(x, 100, axis=1).pvalue
print(round(np.mean(p <= 0.05), 3))
```

Se estima la frecuencia de falsos positivos en un modelo donde H0 es verdadera.

**Resultado esperado**

```text
0.046
```

### Intervalo de confianza de la media

**Clave** `intervalo-confianza`

**Definición** Un intervalo de confianza cuantifica incertidumbre sobre un parámetro mediante un procedimiento con cobertura a largo plazo.

**Búsqueda** confidence_interval t.interval IC 95

**Para recordar** No significa que el 95% de los datos esté dentro.

#### Obtener IC de la media

```python
r = stats.ttest_1samp(canal_a, 100).confidence_interval(confidence_level=0.95)
print(round(r.low, 2), round(r.high, 2))
```

Se usa el intervalo t para media con desviación desconocida.

**Resultado esperado**

```text
106.66 127.84
```

### Intervalo t manual

**Clave** `t-interval`

**Definición** Para una media normal con desviación desconocida, se combina la media, el error estándar y la distribución t.

**Búsqueda** t.interval sem df loc scale

**Para recordar** Para la media, scale es SEM, no desviación de los datos.

#### Construir IC de la media

```python
ic = stats.t.interval(0.95, df=len(canal_a)-1, loc=np.mean(canal_a), scale=stats.sem(canal_a))
print(np.round(ic, 2))
```

Coincide con el intervalo de la prueba t.

**Resultado esperado**

```text
[106.66 127.84]
```

### Tamaño del efecto

**Clave** `efecto`

**Definición** Mide la magnitud de una diferencia; puede expresarse en unidades originales o en desviaciones estándar.

**Búsqueda** cohen d diferencia medias efecto

**Para recordar** Significancia no equivale a magnitud relevante.

**Nota** Si las varianzas difieren mucho, considera otra medida de efecto.

#### Calcular diferencia y Cohen d agrupado

```python
a, b = canal_a, canal_b
sd = np.sqrt(((len(a)-1)*a.var(ddof=1)+(len(b)-1)*b.var(ddof=1))/(len(a)+len(b)-2))
print(round(b.mean()-a.mean(), 2), round((b.mean()-a.mean())/sd, 3))
```

Cohen d usa la desviación agrupada de los grupos independientes.

**Resultado esperado**

```text
15.12 1.065
```

### Potencia y tamaño muestral

**Clave** `power`

**Definición** La potencia es la probabilidad de rechazar H0 bajo una alternativa especificada. Se estima para tamaños y efectos supuestos.

**Búsqueda** power sample size potencia estadistica

**Para recordar** Aumentar n suele aumentar potencia para un efecto fijo.

#### Simular potencia para dos tamaños

```python
rng = np.random.default_rng(42)
r = stats.power(lambda x, axis: stats.ttest_1samp(x, 0, axis=axis), lambda size: rng.normal(0.5, 1, size=size), n_observations=[20, 50], significance=0.05, n_resamples=2000)
print(np.round(r.power, 3))
```

El modelo simula un efecto de 0.5 desviaciones estándar; para planear n se comparan tamaños hasta alcanzar la potencia deseada.

**Resultado esperado**

```text
[0.569 0.932]
```

## Normalidad y varianzas

**Clave** `supuestos`

### Definición

**Clave** `definicion`

**Definición** Las pruebas de normalidad y homogeneidad de varianzas aportan evidencia sobre supuestos de algunos métodos. No sustituyen la inspección del diseño ni de gráficos.

**Búsqueda** shapiro levene normalidad varianzas

**Para recordar** Un p alto no demuestra normalidad ni igualdad de varianzas.

#### Evaluar normalidad de importes

```python
r = stats.shapiro(canal_a)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

H0 es que la muestra proviene de una distribución normal.

**Resultado esperado**

```text
0.9813 0.9691
```

### Shapiro-Wilk

**Clave** `shapiro`

**Definición** Contrasta normalidad de una muestra.

**Búsqueda** shapiro test normal

**Para recordar** Requiere al menos tres observaciones.

#### Evaluar tiempos antes de un cambio

```python
r = stats.shapiro(antes)
print(round(r.pvalue, 4))
```

Un p bajo aporta evidencia contra normalidad.

**Resultado esperado**

```text
0.8369
```

### D’Agostino-Pearson

**Clave** `normaltest`

**Definición** Combina información de asimetría y curtosis para contrastar normalidad.

**Búsqueda** normaltest skew kurtosis

**Para recordar** Necesita al menos ocho observaciones; muestras pequeñas tienen poca potencia.

#### Evaluar muestra simulada de importes

```python
x = np.random.default_rng(42).normal(100, 20, 100)
r = stats.normaltest(x)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Se usa una muestra de 100 observaciones.

**Resultado esperado**

```text
0.4731 0.7893
```

### Anderson-Darling

**Clave** `anderson`

**Definición** Contrasta el ajuste a una distribución y da especial peso a las colas.

**Búsqueda** anderson critical_values significancia

**Para recordar** Consulta el método de salida de tu versión.

**Nota** Sin method, la API anterior devuelve valores críticos y niveles de significancia; está en transición.

#### Comparar una muestra con normal mediante Anderson-Darling

```python
r = stats.anderson(canal_a, dist='norm', method='interpolate')
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Con SciPy 1.17 se especifica un método que devuelve p-value.

**Resultado esperado**

```text
0.1208 0.15
```

### Q-Q plot y probplot

**Clave** `probplot`

**Definición** Compara cuantiles observados con cuantiles teóricos; una relación aproximadamente lineal sugiere compatibilidad con el modelo.

**Búsqueda** probplot qq plot normal

**Para recordar** Observa desviaciones en colas y centro.

#### Obtener coordenadas y correlación del gráfico

```python
coords, ajuste = stats.probplot(canal_a, dist='norm')
print(len(coords[0]), round(ajuste[2], 4))
```

Para dibujar, usa stats.probplot(canal_a, dist='norm', plot=plt) tras importar matplotlib.pyplot as plt.

**Resultado esperado**

```text
8 0.9971
```

### Levene

**Clave** `levene`

**Definición** Contrasta igualdad de varianzas entre grupos independientes. Con center='median' es más robusta ante desviaciones de normalidad.

**Búsqueda** levene equal variance brown forsythe

**Para recordar** H0: varianzas iguales.

#### Comparar dispersión de canales

```python
r = stats.levene(canal_a, canal_b, center='median')
print(round(r.pvalue, 4))
```

No rechazar H0 no demuestra igualdad.

**Resultado esperado**

```text
0.5146
```

### Bartlett

**Clave** `bartlett`

**Definición** Contrasta igualdad de varianzas y es sensible a desviaciones de normalidad.

**Búsqueda** bartlett homocedasticidad

**Para recordar** Se prefiere con normalidad razonable.

#### Comparar varianzas bajo normalidad

```python
r = stats.bartlett(canal_a.astype(float), canal_b.astype(float))
print(round(r.pvalue, 4))
```

Es una prueba diferente de comparar medias.

**Resultado esperado**

```text
0.599
```

### Fligner-Killeen

**Clave** `fligner`

**Definición** Contrasta igualdad de varianzas mediante rangos y es robusta frente a no normalidad.

**Búsqueda** fligner dispersion

**Para recordar** Alternativa robusta para igualdad de escala.

#### Contrastar dispersión entre canales

```python
r = stats.fligner(canal_a, canal_b)
print(round(r.pvalue, 4))
```

Se utiliza una transformación basada en rangos.

**Resultado esperado**

```text
0.4289
```

## Pruebas t

**Clave** `pruebas-t`

### Definición

**Clave** `definicion`

**Definición** Las pruebas t contrastan medias o medias de diferencias. Se elige entre una muestra, grupos independientes y observaciones emparejadas.

**Búsqueda** ttest_1samp ttest_ind ttest_rel welch

**Para recordar** Identifica primero si los grupos son independientes o emparejados.

#### Comparar dos canales independientes con Welch

```python
r = stats.ttest_ind(canal_a, canal_b, equal_var=False)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Welch no exige varianzas iguales; sí requiere independencia entre observaciones.

**Resultado esperado**

```text
-2.1309 0.0521
```

### t de una muestra

**Clave** `ttest-1samp`

**Definición** Contrasta la media poblacional con un valor de referencia.

**Búsqueda** ttest_1samp popmean

**Para recordar** Una muestra frente a un objetivo.

#### Comprobar si el importe medio difiere de 115

```python
r = stats.ttest_1samp(canal_a, popmean=115)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

El estadístico mide diferencia respecto al objetivo en errores estándar.

**Resultado esperado**

```text
0.5023 0.6308
```

### t independiente de Student

**Clave** `ttest-ind`

**Definición** Compara medias de dos grupos independientes suponiendo varianzas poblacionales iguales.

**Búsqueda** ttest_ind equal_var True

**Para recordar** No usar para medidas antes/después de las mismas personas.

#### Comparar medias de dos canales

```python
r = stats.ttest_ind(canal_a, canal_b, equal_var=True)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

La prueba agrupa la estimación de varianza.

**Resultado esperado**

```text
-2.1309 0.0513
```

### t de Welch

**Clave** `welch`

**Definición** Compara medias independientes sin asumir varianzas iguales.

**Búsqueda** ttest_ind equal_var False welch

**Para recordar** Welch suele ser una opción razonable para grupos independientes.

#### Comparar canal B contra A

```python
r = stats.ttest_ind(canal_b, canal_a, equal_var=False)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

El signo positivo corresponde a una media mayor en B.

**Resultado esperado**

```text
2.1309 0.0521
```

### t emparejada

**Clave** `ttest-rel`

**Definición** Contrasta si la media de las diferencias de pares es cero.

**Búsqueda** ttest_rel paired antes despues

**Para recordar** Cada posición debe corresponder al mismo sujeto.

#### Evaluar cambio de tiempos

```python
r = stats.ttest_rel(antes, despues)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Se analiza la diferencia antes menos después; se supone normalidad aproximada de las diferencias en muestras pequeñas.

**Resultado esperado**

```text
6.7803 0.0003
```

## ANOVA y comparaciones posteriores

**Clave** `anova`

### Definición

**Clave** `definicion`

**Definición** ANOVA compara medias de tres o más grupos. Un rechazo indica que no todas las medias son iguales, pero no identifica qué pares difieren.

**Búsqueda** f_oneway tukey dunnett anova

**Para recordar** ANOVA global primero; comparaciones específicas después según el diseño.

#### Contrastar tres canales

```python
r = stats.f_oneway(canal_a, canal_b, canal_c)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

ANOVA clásica presupone independencia, normalidad aproximada de residuos y varianzas iguales.

**Resultado esperado**

```text
8.6365 0.0018
```

### ANOVA de Welch

**Clave** `anova-welch`

**Definición** Contrasta medias de varios grupos independientes sin exigir varianzas iguales.

**Búsqueda** f_oneway equal_var False

**Para recordar** equal_var=False cambia a Welch.

**Nota** Disponible desde SciPy 1.16.

#### Comparar tres canales con varianzas distintas

```python
r = stats.f_oneway(canal_a, canal_b, canal_c, equal_var=False)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

El contraste adapta el cálculo a las varianzas de cada grupo.

**Resultado esperado**

```text
7.6657 0.0061
```

### Tukey HSD

**Clave** `tukey-hsd`

**Definición** Compara todos los pares de medias controlando el error familiar bajo sus supuestos.

**Búsqueda** tukey_hsd post hoc pares

**Para recordar** La matriz pvalue contiene un contraste por par.

**Nota** Con equal_var=False usa Games-Howell en SciPy 1.17.

#### Evaluar A contra C

```python
r = stats.tukey_hsd(canal_a, canal_b, canal_c)
print(round(r.statistic[0, 2], 3), round(r.pvalue[0, 2], 4))
```

Se lee la comparación de los grupos en posiciones 0 y 2.

**Resultado esperado**

```text
-37.75 0.0013
```

### Dunnett

**Clave** `dunnett`

**Definición** Compara varios tratamientos con un control compartido ajustando las comparaciones.

**Búsqueda** dunnett control grupo

**Para recordar** Usa Dunnett si solo interesan comparaciones contra control.

**Nota** Asume muestras independientes, normalidad y varianzas iguales.

#### Comparar B y C con A

```python
r = stats.dunnett(canal_b, canal_c, control=canal_a, rng=np.random.default_rng(42))
print(np.round(r.pvalue, 4))
```

Cada p-value corresponde a un tratamiento frente al control A.

**Resultado esperado**

```text
[0.1945 0.0009]
```

## Pruebas para conteos y proporciones

**Clave** `conteos-proporciones`

### Definición

**Clave** `definicion`

**Definición** Estas pruebas evalúan frecuencias observadas, asociaciones entre categorías o proporciones frente a una hipótesis.

**Búsqueda** chi2_contingency chisquare fisher_exact binomtest

**Para recordar** Usa conteos, no porcentajes como entrada de tablas de contingencia.

#### Evaluar asociación entre grupo y conversión

```python
r = stats.chi2_contingency(conversiones)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

H0 es independencia entre grupo y conversión.

**Resultado esperado**

```text
4.8133 0.0282
```

### Chi-cuadrado de independencia

**Clave** `chi2-contingency`

**Definición** Contrasta si dos variables categóricas son independientes con una tabla de conteos.

**Búsqueda** chi2_contingency tabla contingencia

**Para recordar** Revisa que los conteos esperados sean suficientes.

**Nota** La regla habitual de conteos esperados de al menos cinco es orientativa.

#### Comparar conversiones A/B sin corrección de Yates

```python
r = stats.chi2_contingency(conversiones, correction=False)
print(round(r.pvalue, 4))
print(r.expected_freq)
```

Sin asociación se esperan 50 conversiones por grupo.

**Resultado esperado**

```text
0.0209
[[ 50. 150.]
 [ 50. 150.]]
```

### Chi-cuadrado de bondad de ajuste

**Clave** `chisquare`

**Definición** Compara frecuencias observadas con frecuencias esperadas de un modelo.

**Búsqueda** chisquare goodness of fit

**Para recordar** Los totales observado y esperado deben coincidir por defecto.

#### Contrastar reparto uniforme de solicitudes

```python
r = stats.chisquare([30, 45, 25], f_exp=[100/3]*3)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

H0 supone la misma probabilidad para las tres categorías.

**Resultado esperado**

```text
6.5 0.0388
```

### Prueba exacta de Fisher

**Clave** `fisher-exact`

**Definición** Contrasta asociación en una tabla 2x2 mediante probabilidades exactas bajo H0.

**Búsqueda** fisher_exact conteos pequeños

**Para recordar** Útil cuando la aproximación chi-cuadrado no es adecuada.

#### Comparar incidencias escasas

```python
r = stats.fisher_exact([[1, 9], [5, 5]])
print(round(r.statistic, 4), round(r.pvalue, 4))
```

El estadístico por defecto es la odds ratio muestral para la tabla 2x2.

**Resultado esperado**

```text
0.1111 0.1409
```

### Prueba binomial

**Clave** `binomtest`

**Definición** Contrasta la probabilidad de éxito de una muestra frente a una proporción objetivo.

**Búsqueda** binomtest k n p conversion

**Para recordar** k éxitos de n ensayos independientes.

#### Comparar 60 conversiones de 200 con objetivo de 20%

```python
r = stats.binomtest(60, n=200, p=0.2, alternative='greater')
print(round(r.statistic, 3), round(r.pvalue, 5))
```

statistic contiene la proporción observada; pvalue evalúa H0.

**Resultado esperado**

```text
0.3 0.0005
```

### Intervalo de proporción

**Clave** `proporcion-ic`

**Definición** Estima incertidumbre de una proporción binomial con un intervalo.

**Búsqueda** binomtest proportion_ci clopper pearson

**Para recordar** El intervalo exacto binomial puede ser conservador.

#### Estimar conversión de B

```python
r = stats.binomtest(60, 200).proportion_ci(confidence_level=0.95, method='exact')
print(round(r.low, 4), round(r.high, 4))
```

Los extremos están en escala de 0 a 1.

**Resultado esperado**

```text
0.2374 0.3686
```

## Pruebas no paramétricas

**Clave** `no-parametricas`

### Definición

**Clave** `definicion`

**Definición** Las pruebas no paramétricas no exigen una forma normal específica, pero tienen otros supuestos sobre independencia, simetría o distribución según el método.

**Búsqueda** mannwhitneyu wilcoxon kruskal no parametrica

**Para recordar** No paramétrica no significa libre de supuestos.

#### Comparar dos canales por rangos

```python
r = stats.mannwhitneyu(canal_a, canal_b, alternative="two-sided")
print(round(r.statistic, 3), round(r.pvalue, 4))
```

Se contrasta igualdad de distribuciones bajo H0; no es en general una prueba exclusiva de medianas.

**Resultado esperado**

```text
14.5 0.0736
```

### Mann-Whitney U

**Clave** `mannwhitneyu`

**Definición** Compara rangos de dos muestras independientes.

**Búsqueda** mannwhitneyu u test

**Para recordar** Una interpretación como desplazamiento requiere distribuciones de forma similar.

#### Evaluar si B tiende a valores mayores

```python
r = stats.mannwhitneyu(canal_b, canal_a, alternative='greater')
print(round(r.statistic, 3), round(r.pvalue, 4))
```

La alternativa se formula para B frente a A.

**Resultado esperado**

```text
49.5 0.0368
```

### Wilcoxon

**Clave** `wilcoxon`

**Definición** Contrasta si las diferencias emparejadas tienen distribución simétrica centrada en cero.

**Búsqueda** wilcoxon signed rank paired

**Para recordar** Usa pares de la misma unidad.

#### Comparar tiempos antes y después

```python
r = stats.wilcoxon(antes, despues)
print(round(r.statistic, 3), round(r.pvalue, 4))
```

Se utilizan rangos de diferencias no nulas.

**Resultado esperado**

```text
0.0 0.0078
```

### Kruskal-Wallis

**Clave** `kruskal`

**Definición** Compara rangos de dos o más grupos independientes.

**Búsqueda** kruskal anova no parametrica

**Para recordar** Un rechazo no identifica los grupos concretos.

#### Comparar tres canales

```python
r = stats.kruskal(canal_a, canal_b, canal_c)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Contrasta distribuciones; la interpretación como medianas exige formas similares.

**Resultado esperado**

```text
9.9315 0.007
```

### Kolmogorov-Smirnov de una muestra

**Clave** `kstest`

**Definición** Compara la CDF empírica con una distribución continua completamente especificada.

**Búsqueda** kstest ks normal cdf

**Para recordar** No uses parámetros estimados de los mismos datos como si fueran conocidos.

#### Contrastar modelo normal predefinido

```python
r = stats.kstest(canal_a, 'norm', args=(115, 15))
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Los parámetros 115 y 15 se tratan como fijados de antemano.

**Resultado esperado**

```text
0.1306 0.9957
```

### Kolmogorov-Smirnov de dos muestras

**Clave** `ks-2samp`

**Definición** Compara la mayor distancia entre las CDF empíricas de dos muestras independientes continuas.

**Búsqueda** ks_2samp distribuciones

**Para recordar** Puede detectar cambios de forma, localización o dispersión.

#### Comparar distribución de dos canales

```python
r = stats.ks_2samp(canal_a, canal_b)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Con datos discretos o muchos empates, la calibración habitual puede no ser adecuada.

**Resultado esperado**

```text
0.375 0.6601
```

### Friedman

**Clave** `friedmanchisquare`

**Definición** Compara tratamientos repetidos en los mismos bloques o sujetos mediante rangos.

**Búsqueda** friedmanchisquare medidas repetidas

**Para recordar** Necesita al menos tres medidas emparejadas.

#### Comparar tres interfaces en ocho sujetos

```python
tercera = np.array([39, 41, 43, 44, 49, 51, 55, 56])
r = stats.friedmanchisquare(antes, despues, tercera)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

La aproximación chi-cuadrado puede ser imprecisa con pocos sujetos; ejemplo ilustrativo.

**Resultado esperado**

```text
16.0 0.0003
```

### Prueba de mediana

**Clave** `median-test`

**Definición** Compara la proporción de observaciones por encima y debajo de la mediana común entre muestras independientes.

**Búsqueda** median_test mood mediana

**Para recordar** Es menos sensible a extremos, pero pierde información de magnitud.

#### Contrastar medianas entre canales

```python
r = stats.median_test(canal_a, canal_b)
print(round(r.statistic, 4), round(r.pvalue, 4), r.median)
```

Se construye una tabla de conteos respecto a la mediana global.

**Resultado esperado**

```text
0.25 0.6171 123.0
```

### Brunner-Munzel

**Clave** `brunnermunzel`

**Definición** Contrasta si la probabilidad de que un valor de un grupo supere al otro, contando medio empate, es 0.5.

**Búsqueda** brunnermunzel heterogeneidad rangos

**Para recordar** No exige varianzas o formas idénticas.

#### Comparar orden estocástico de dos canales

```python
r = stats.brunnermunzel(canal_a, canal_b)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

Se usa la aproximación t por defecto.

**Resultado esperado**

```text
2.2714 0.0402
```

### Prueba de cuantiles

**Clave** `quantile-test`

**Definición** Contrasta si un valor de referencia corresponde al cuantil poblacional indicado.

**Búsqueda** quantile_test q p mediana

**Para recordar** q es el valor propuesto; p es el nivel del cuantil.

#### Evaluar mediana de referencia 115

```python
r = stats.quantile_test(canal_a, q=115, p=0.5)
print(round(r.pvalue, 4))
```

H0 se refiere a la mediana poblacional, no a la media.

**Resultado esperado**

```text
1.0
```

## Correlación

**Clave** `correlacion`

### Definición

**Clave** `definicion`

**Definición** La correlación mide asociación entre variables emparejadas. Pearson mide asociación lineal y las correlaciones de rangos captan asociaciones monótonas.

**Búsqueda** pearsonr spearmanr kendalltau correlacion

**Para recordar** Correlación no implica causalidad.

#### Medir asociación entre inversión e ingresos

```python
r = stats.pearsonr(publicidad, ingresos)
print(round(r.statistic, 4), round(r.pvalue, 4))
```

El coeficiente está entre -1 y 1; la prueba clásica de Pearson supone pares independientes bajo un modelo normal bivariado.

**Resultado esperado**

```text
0.9791 0.0036
```

### Pearson

**Clave** `pearsonr`

**Definición** Mide dirección e intensidad de la relación lineal.

**Búsqueda** pearsonr r correlacion lineal

**Para recordar** Cerca de cero no descarta relaciones no lineales.

#### Medir correlación lineal

```python
r = stats.pearsonr(publicidad, ingresos)
print(round(r.statistic, 4))
```

Los valores crecen aproximadamente juntos.

**Resultado esperado**

```text
0.9791
```

### Spearman

**Clave** `spearmanr`

**Definición** Mide correlación de los rangos y detecta relaciones monótonas.

**Búsqueda** spearmanr rangos monotona

**Para recordar** Una relación creciente no tiene que ser lineal.

**Nota** Para muestras pequeñas considera una prueba de permutación en lugar del p-value asintótico.

#### Medir asociación por rangos

```python
r = stats.spearmanr(publicidad, ingresos)
print(round(r.statistic, 4))
```

Todos los rangos coinciden.

**Resultado esperado**

```text
1.0
```

### Kendall

**Clave** `kendalltau`

**Definición** Mide concordancia entre pares ordenados, teniendo en cuenta empates según la variante.

**Búsqueda** kendalltau tau concordancia

**Para recordar** Compara el orden relativo de pares.

#### Medir concordancia de rankings

```python
r = stats.kendalltau([1, 2, 3, 4], [1, 3, 2, 4])
print(round(r.statistic, 4))
```

Hay un par discordante entre seis pares.

**Resultado esperado**

```text
0.6667
```

## Regresión lineal simple

**Clave** `regresion`

### Definición

**Clave** `definicion`

**Definición** Ajusta una recta y = intercept + slope*x a pares de observaciones minimizando los residuos cuadrados en y.

**Búsqueda** linregress regresion pendiente intercepto

**Para recordar** La pendiente expresa el cambio estimado de y por unidad de x.

#### Ajustar ingresos frente a publicidad

```python
r = stats.linregress(publicidad, ingresos)
print(round(r.slope, 3), round(r.intercept, 3))
```

Los coeficientes describen la recta de mínimos cuadrados.

**Resultado esperado**

```text
2.1 0.7
```

### Pendiente e intercepto

**Clave** `coeficientes`

**Definición** slope es la variación estimada de y por unidad de x; intercept es el valor estimado cuando x=0.

**Búsqueda** slope intercept prediccion

**Para recordar** No interpretes fuera del rango observado sin justificación.

#### Predecir ingresos con inversión de 4

```python
r = stats.linregress(publicidad, ingresos)
print(round(r.intercept+r.slope*4, 3))
```

Se sustituye x en la recta ajustada.

**Resultado esperado**

```text
9.1
```

### R cuadrado

**Clave** `r-cuadrado`

**Definición** En regresión lineal simple con intercepto, rvalue al cuadrado mide la fracción de variación explicada por la recta.

**Búsqueda** rvalue r2

**Para recordar** R² no prueba causalidad ni garantiza buen pronóstico.

#### Medir ajuste lineal

```python
r = stats.linregress(publicidad, ingresos)
print(round(r.rvalue**2, 4))
```

Se eleva al cuadrado la correlación lineal.

**Resultado esperado**

```text
0.9587
```

### P-value y errores estándar

**Clave** `significancia-regresion`

**Definición** linregress devuelve el p-value para pendiente cero y errores estándar de los coeficientes.

**Búsqueda** pvalue stderr intercept_stderr

**Para recordar** La inferencia clásica requiere supuestos sobre errores.

#### Consultar incertidumbre de pendiente

```python
r = stats.linregress(publicidad, ingresos)
print(round(r.pvalue, 4), round(r.stderr, 4), round(r.intercept_stderr, 4))
```

La incertidumbre del intercepto se obtiene por separado.

**Resultado esperado**

```text
0.0036 0.2517 0.8347
```

### Residuos

**Clave** `residuos`

**Definición** Un residuo es el valor observado menos el predicho por el modelo.

**Búsqueda** residuals regresion errores

**Para recordar** Examina patrones y valores extremos antes de interpretar.

#### Calcular residuos del modelo

```python
r = stats.linregress(publicidad, ingresos)
pred = r.intercept+r.slope*publicidad
print(np.round(ingresos-pred, 3))
```

Un patrón sistemático indicaría que una recta podría ser insuficiente.

**Resultado esperado**

```text
[ 0.2  0.1  0.  -1.1  0.8]
```

## Remuestreo y simulación

**Clave** `remuestreo`

### Definición

**Clave** `definicion`

**Definición** El remuestreo aproxima incertidumbre o distribuciones de referencia mediante muestras repetidas. El método debe respetar la estructura de los datos.

**Búsqueda** bootstrap permutation_test monte_carlo_test

**Para recordar** Bootstrap remuestrea observaciones; permutación reorganiza etiquetas bajo H0.

#### Estimar incertidumbre de una media con bootstrap

```python
r = stats.bootstrap((ventas,), np.mean, n_resamples=2000, method="percentile", rng=np.random.default_rng(42))
print(round(r.confidence_interval.low, 2), round(r.confidence_interval.high, 2))
```

Se generan muestras con reemplazo del mismo tamaño.

**Resultado esperado**

```text
112.0 180.0
```

### Bootstrap

**Clave** `bootstrap`

**Definición** Remuestrea con reemplazo para aproximar la distribución de una estadística.

**Búsqueda** bootstrap n_resamples BCa percentile

**Para recordar** Las unidades remuestreadas deben corresponder al diseño.

#### Estimar IC de la mediana

```python
r = stats.bootstrap((ventas,), np.median, n_resamples=3000, method='percentile', rng=np.random.default_rng(42))
print(round(r.confidence_interval.low, 2), round(r.confidence_interval.high, 2))
```

El intervalo percentil es ilustrativo; muestras pequeñas pueden producir intervalos poco fiables.

**Resultado esperado**

```text
100.0 220.0
```

### Permutaciones

**Clave** `permutation-test`

**Definición** Reasigna observaciones según una hipótesis de intercambiabilidad para construir una distribución nula.

**Búsqueda** permutation_test independent samples pairings

**Para recordar** Para datos emparejados elige una permutación apropiada.

#### Contrastar diferencia de medias de canales

```python
def diferencia(a, b):
    return np.mean(b)-np.mean(a)
r = stats.permutation_test((canal_a, canal_b), diferencia, permutation_type='independent', n_resamples=1999, rng=np.random.default_rng(42))
print(round(r.statistic, 3), round(r.pvalue, 4))
```

Se permutan etiquetas de los grupos independientes.

**Resultado esperado**

```text
15.125 0.048
```

### Monte Carlo

**Clave** `monte-carlo-test`

**Definición** Simula muestras bajo un modelo nulo y compara la estadística observada con las simuladas.

**Búsqueda** monte_carlo_test rvs simulacion

**Para recordar** La calidad de la prueba depende del modelo nulo.

#### Contrastar media con modelo normal conocido

```python
rng = np.random.default_rng(42)
def rvs(size):
    return rng.normal(100, 20, size=size)
r = stats.monte_carlo_test(canal_a, rvs, np.mean, alternative='greater', n_resamples=1999)
print(round(r.statistic, 3), round(r.pvalue, 4))
```

El modelo nulo fija media 100 y desviación 20.

**Resultado esperado**

```text
117.25 0.0075
```

### Estimación de densidad KDE

**Clave** `gaussian-kde`

**Definición** Estima una densidad continua suavizando observaciones con núcleos gaussianos.

**Búsqueda** gaussian_kde bandwidth densidad

**Para recordar** El ancho de banda determina el suavizado.

#### Consultar densidad estimada en 120

```python
kde = stats.gaussian_kde(ventas)
print(round(kde([120])[0], 6))
```

El resultado es densidad, no probabilidad de un importe exacto.

**Resultado esperado**

```text
0.008673
```

## Comparaciones múltiples

**Clave** `comparaciones-multiples`

### Definición

**Clave** `definicion`

**Definición** Cuando se realizan muchos contrastes aumenta el riesgo de descubrimientos falsos. Se deben definir las familias de pruebas y ajustar según el objetivo.

**Búsqueda** false_discovery_control combine_pvalues bonferroni

**Para recordar** Ajustar p-values no soluciona un diseño defectuoso.

#### Ajustar tres p-values con Benjamini-Hochberg

```python
print(np.round(stats.false_discovery_control([0.01, 0.04, 0.2]), 4))
```

El ajuste controla la tasa esperada de falsos descubrimientos bajo condiciones de dependencia apropiadas.

**Resultado esperado**

```text
[0.03 0.06 0.2 ]
```

### Benjamini-Hochberg y Benjamini-Yekutieli

**Clave** `fdr`

**Definición** BH controla FDR bajo independencia o ciertas dependencias positivas; BY lo hace bajo dependencias más generales, con mayor conservadurismo.

**Búsqueda** false_discovery_control bh by

**Para recordar** FDR no es probabilidad de que una hipótesis concreta sea falsa.

#### Comparar dos ajustes

```python
p = [0.01, 0.04, 0.2]
print(np.round(stats.false_discovery_control(p, method='bh'), 4))
print(np.round(stats.false_discovery_control(p, method='by'), 4))
```

BY aumenta más los p-values ajustados.

**Resultado esperado**

```text
[0.03 0.06 0.2 ]
[0.055  0.11   0.3667]
```

### Bonferroni

**Clave** `bonferroni`

**Definición** Controla la probabilidad de al menos un falso positivo en una familia multiplicando p-values por el número de contrastes, con límite uno.

**Búsqueda** bonferroni FWER ajuste

**Para recordar** Es válido sin requerir independencia.

#### Ajustar tres contrastes

```python
p = np.array([0.01, 0.04, 0.2])
print(np.minimum(p*len(p), 1))
```

Se comparan los p-values ajustados con alpha.

**Resultado esperado**

```text
[0.03 0.12 0.6 ]
```

### Combinar p-values

**Clave** `combine-pvalues`

**Definición** Combina evidencia de pruebas independientes sobre una hipótesis global, según los supuestos del método elegido.

**Búsqueda** combine_pvalues fisher stouffer

**Para recordar** No equivale a corregir comparaciones múltiples.

#### Combinar dos experimentos independientes

```python
r = stats.combine_pvalues([0.03, 0.04], method='fisher')
print(round(r.statistic, 4), round(r.pvalue, 4))
```

La combinación de Fisher presupone p-values continuos e independientes bajo H0.

**Resultado esperado**

```text
13.4509 0.0093
```

## Tablas de contingencia y medidas de asociación

**Clave** `contingencia`

### Definición

**Clave** `definicion`

**Definición** Las tablas de contingencia cuentan combinaciones de categorías y permiten calcular asociación o comparar riesgos entre grupos.

**Búsqueda** crosstab expected_freq relative_risk odds_ratio cramér

**Para recordar** Distingue conteos, riesgos y odds.

#### Obtener frecuencias esperadas

```python
print(stats.contingency.expected_freq(conversiones))
```

Los esperados se calculan con marginales suponiendo independencia.

**Resultado esperado**

```text
[[ 50. 150.]
 [ 50. 150.]]
```

### Tabla cruzada

**Clave** `crosstab`

**Definición** Cuenta cada combinación de valores de dos o más variables categóricas.

**Búsqueda** contingency.crosstab conteos

**Para recordar** Las etiquetas indican qué representa cada posición.

#### Construir tabla de resultados de campaña

```python
r = stats.contingency.crosstab(['A','A','B','B','B'], ['si','no','si','si','no'])
print(r.elements)
print(r.count)
```

Las filas y columnas se ordenan por sus niveles.

**Resultado esperado**

```text
(array(['A', 'B'], dtype='<U1'), array(['no', 'si'], dtype='<U2'))
[[1 1]
 [1 2]]
```

### Frecuencias esperadas

**Clave** `expected-freq`

**Definición** Calcula conteos esperados si las variables de una tabla fueran independientes.

**Búsqueda** expected_freq independencia

**Para recordar** En 2D: total fila por total columna / total general.

#### Calcular esperados A/B

```python
print(stats.contingency.expected_freq(conversiones))
```

Las dos filas tienen el mismo total.

**Resultado esperado**

```text
[[ 50. 150.]
 [ 50. 150.]]
```

### Riesgo relativo

**Clave** `relative-risk`

**Definición** Divide el riesgo del grupo expuesto entre el riesgo del control.

**Búsqueda** relative_risk risk ratio

**Para recordar** RR=1 significa igualdad de riesgos observados.

#### Comparar conversión B frente a A

```python
r = stats.contingency.relative_risk(exposed_cases=60, exposed_total=200, control_cases=40, control_total=200)
print(round(r.relative_risk, 3))
```

B tiene 1.5 veces la tasa de A.

**Resultado esperado**

```text
1.5
```

### Odds ratio

**Clave** `odds-ratio`

**Definición** Compara odds de éxito entre grupos; odds es p/(1-p).

**Búsqueda** odds_ratio OR conditional sample

**Para recordar** Odds ratio no es riesgo relativo.

#### Calcular odds ratio B frente a A

```python
r = stats.contingency.odds_ratio(conversiones[::-1], kind='sample')
print(round(r.statistic, 4))
```

Se pone B en la primera fila para obtener B/A.

**Resultado esperado**

```text
1.7143
```

### V de Cramér

**Clave** `cramer`

**Definición** Mide intensidad de asociación entre categorías a partir del chi-cuadrado normalizado.

**Búsqueda** association cramer v

**Para recordar** Va de 0 a 1; no indica dirección.

#### Medir asociación grupo-conversión

```python
print(round(stats.contingency.association(conversiones, method='cramer'), 4))
```

Se calcula sin interpretar causalidad.

**Resultado esperado**

```text
0.1155
```

### Coeficiente de Tschuprow

**Clave** `tschuprow`

**Definición** Normaliza chi-cuadrado considerando dimensiones de la tabla.

**Búsqueda** association tschuprow

**Para recordar** Puede diferir de V de Cramér en tablas rectangulares.

#### Calcular T de Tschuprow

```python
tabla = [[30, 20, 10], [15, 25, 20]]
print(round(stats.contingency.association(tabla, method='tschuprow'), 4))
```

Resume intensidad de asociación de una tabla 2x3.

**Resultado esperado**

```text
0.2289
```

## A/B testing y decisiones de negocio

**Clave** `ab-testing`

### Definición

**Clave** `definicion`

**Definición** Un experimento A/B compara variantes asignadas de forma aleatoria. Debe definir unidad experimental, métrica, efecto mínimo y criterio de decisión antes del análisis.

**Búsqueda** ab testing conversion lift experimento

**Para recordar** Analiza magnitud, incertidumbre y diseño además del p-value.

#### Calcular tasas de dos variantes

```python
tasas = conversiones[:, 0]/conversiones.sum(axis=1)
print(tasas)
```

A y B tienen 200 observaciones independientes cada uno.

**Resultado esperado**

```text
[0.2 0.3]
```

### Métricas de conversión y lift

**Clave** `lift`

**Definición** El cambio absoluto resta tasas; el lift relativo divide el cambio por la tasa de control.

**Búsqueda** conversion lift puntos porcentuales

**Para recordar** 10 puntos porcentuales no equivalen a 10% relativo.

#### Calcular cambio absoluto y relativo

```python
a, b = conversiones[:, 0]/conversiones.sum(axis=1)
print(round((b-a)*100, 2), round((b/a-1)*100, 2))
```

La primera salida son puntos porcentuales y la segunda porcentaje relativo.

**Resultado esperado**

```text
10.0 50.0
```

### Contrastar conversiones A/B

**Clave** `ab-proporciones`

**Definición** Una tabla 2x2 permite contrastar igualdad de proporciones de grupos independientes.

**Búsqueda** chi2 test conversion campañas

**Para recordar** Cada participante debe pertenecer a una sola variante.

#### Evaluar diferencia de conversiones

```python
r = stats.chi2_contingency(conversiones, correction=False)
print(round(r.pvalue, 4))
```

La prueba es bilateral; usa Fisher si los conteos son escasos.

**Resultado esperado**

```text
0.0209
```

### Comparar una métrica continua

**Clave** `ab-continuas`

**Definición** Welch contrasta medias de grupos independientes; el intervalo de diferencia ayuda a evaluar el tamaño de efecto.

**Búsqueda** ttest_ind ab ventas ticket promedio

**Para recordar** No confundas ventas por usuario con ventas por pedido.

#### Estimar cambio de importe B-A

```python
r = stats.ttest_ind(canal_b, canal_a, equal_var=False)
ic = r.confidence_interval()
print(round(canal_b.mean()-canal_a.mean(), 2), round(ic.low, 2), round(ic.high, 2))
```

La unidad de análisis debe ser independiente.

**Resultado esperado**

```text
15.12 -0.16 30.41
```

### Significancia práctica

**Clave** `significancia-practica`

**Definición** Una diferencia estadísticamente detectable puede ser demasiado pequeña para justificar una decisión de negocio.

**Búsqueda** efecto minimo ROI significancia practica

**Para recordar** Compara el efecto y su IC con un umbral de negocio predefinido.

**Nota** No se debe elegir el umbral después de ver los datos.

#### Evaluar mejora mínima de 20 unidades

```python
r = stats.ttest_ind(canal_b, canal_a, equal_var=False)
ic = r.confidence_interval()
print(ic.low > 20)
```

True solo si el límite inferior supera la mejora mínima propuesta.

**Resultado esperado**

```text
False
```

### Planificación y monitoreo

**Clave** `planificacion`

**Definición** Define tamaño de muestra, duración y métricas antes de comenzar; mirar repetidamente un p-value y detener al alcanzar significancia aumenta falsos positivos.

**Búsqueda** tamaño muestra peeking potencia asignacion aleatoria

**Para recordar** No detengas un test fijo por p-value sin un método secuencial válido.

#### Comprobar tamaño de grupos

```python
print(conversiones.sum(axis=1))
```

Ambos grupos tienen 200 observaciones; el balance por sí solo no demuestra aleatorización.

**Resultado esperado**

```text
[200 200]
```

## Optimización numérica

**Clave** `optimizacion`

### Definición

**Clave** `definicion`

**Definición** Busca valores que minimizan una función objetivo o satisfacen restricciones. Para maximizar puede minimizarse el negativo de la función.

**Búsqueda** optimize minimize linprog root curve_fit least_squares

**Para recordar** Define objetivo, variables, restricciones y verifica el resultado.

#### Minimizar un costo cuadrático

```python
from scipy.optimize import minimize
r = minimize(lambda x: (x[0]-4)**2+10, x0=[0])
print(r.success, np.round(r.x, 3), round(r.fun, 3))
```

El costo mínimo ocurre cerca de x=4.

**Resultado esperado**

```text
True [4.] 10.0
```

### minimize

**Clave** `minimize`

**Definición** Minimiza una función escalar de una o más variables, con límites o restricciones según el método.

**Búsqueda** minimize bounds x0 success fun

**Para recordar** Un óptimo local no garantiza el global.

#### Optimizar nivel de inventario entre 0 y 3

```python
from scipy.optimize import minimize
r = minimize(lambda x: (x[0]-4)**2, x0=[0], bounds=[(0,3)])
print(r.success, np.round(r.x, 3))
```

El límite superior impide llegar a cuatro.

**Resultado esperado**

```text
True [3.]
```

### linprog

**Clave** `linprog`

**Definición** Resuelve optimización lineal con restricciones lineales y límites.

**Búsqueda** linprog programación lineal presupuesto

**Para recordar** Maximizar beneficio = minimizar su negativo.

#### Asignar recursos para maximizar beneficio

```python
from scipy.optimize import linprog
r = linprog([-3,-2], A_ub=[[1,1],[2,1]], b_ub=[4,6], bounds=[(0,None),(0,None)], method='highs')
print(r.success, np.round(r.x, 3), round(-r.fun, 3))
```

Las variables son continuas; no obliga a cantidades enteras.

**Resultado esperado**

```text
True [2. 2.] 10.0
```

### root

**Clave** `root`

**Definición** Busca raíces de una función o sistema, es decir, puntos donde su valor es cero.

**Búsqueda** root ecuaciones punto equilibrio

**Para recordar** Comprueba que el residuo sea cercano a cero.

#### Encontrar punto de equilibrio

```python
from scipy.optimize import root
r = root(lambda x: 30*x-120, x0=[1])
print(r.success, np.round(r.x, 3))
```

El beneficio 30x-120 se hace cero con cuatro unidades.

**Resultado esperado**

```text
True [4.]
```

### curve_fit

**Clave** `curve-fit`

**Definición** Ajusta parámetros de una función a datos mediante mínimos cuadrados no lineales.

**Búsqueda** curve_fit parámetros modelo pcov

**Para recordar** Devuelve parámetros y covarianza estimada.

#### Ajustar modelo de respuesta cuadrática

```python
from scipy.optimize import curve_fit
def modelo(x, a, b):
    return a*x**2+b
p, cov = curve_fit(modelo, publicidad, [3,9,19,33,51])
print(np.round(p, 3))
```

Se estima a y b de una curva definida previamente.

**Resultado esperado**

```text
[2. 1.]
```

### least_squares

**Clave** `least-squares`

**Definición** Minimiza suma de cuadrados de residuos; permite límites y pérdidas robustas.

**Búsqueda** least_squares residuals robust loss

**Para recordar** La función objetivo debe devolver residuos, no su suma cuadrada.

#### Ajustar recta con residuos explícitos

```python
from scipy.optimize import least_squares
r = least_squares(lambda p: p[0]*publicidad+p[1]-ingresos, x0=[0,0])
print(r.success, np.round(r.x, 3))
```

Los dos parámetros corresponden a pendiente e intercepto.

**Resultado esperado**

```text
True [2.1 0.7]
```

## Interpolación

**Clave** `interpolacion`

### Definición

**Clave** `definicion`

**Definición** Estima valores entre puntos conocidos usando una función construida a partir de ellos. No equivale a pronosticar fuera del dominio.

**Búsqueda** interpolate CubicSpline PchipInterpolator

**Para recordar** Interpolar dentro del rango; extrapolar exige supuestos adicionales.

#### Interpolar un precio entre dos fechas

```python
from scipy.interpolate import PchipInterpolator
f = PchipInterpolator([1,3,5], [10,20,30], extrapolate=False)
print(float(f(2)))
```

El día 2 queda entre observaciones de los días 1 y 3.

**Resultado esperado**

```text
15.0
```

### CubicSpline

**Clave** `cubic-spline`

**Definición** Construye polinomios cúbicos por tramos con continuidad de derivadas hasta orden dos.

**Búsqueda** CubicSpline spline cubico

**Para recordar** Una curva suave puede sobrepasar los datos.

#### Interpolar una trayectoria cuadrática

```python
from scipy.interpolate import CubicSpline
f = CubicSpline([0,1,2,3], [0,1,4,9])
print(round(float(f(1.5)), 3))
```

Se consulta entre dos puntos conocidos.

**Resultado esperado**

```text
2.25
```

### PchipInterpolator

**Clave** `pchip`

**Definición** Interpola por tramos preservando la forma monótona de los datos cuando corresponde.

**Búsqueda** PchipInterpolator monotona

**Para recordar** Evita oscilaciones innecesarias de otros splines.

#### Estimar valor intermedio de una tarifa

```python
from scipy.interpolate import PchipInterpolator
f = PchipInterpolator([0,1,2], [0,10,20])
print(float(f(0.5)))
```

Los datos son lineales en este ejemplo.

**Resultado esperado**

```text
5.0
```

### RegularGridInterpolator

**Clave** `regular-grid`

**Definición** Interpola valores sobre una cuadrícula rectilínea multidimensional.

**Búsqueda** RegularGridInterpolator grid 2d

**Para recordar** Las dimensiones de values deben coincidir con los ejes.

#### Estimar demanda entre niveles de precio y publicidad

```python
from scipy.interpolate import RegularGridInterpolator
f = RegularGridInterpolator(([10,20],[1,2]), [[100,120],[80,100]])
print(f([[15,1.5]]))
```

Se consulta la mitad de ambos ejes.

**Resultado esperado**

```text
[100.]
```

## Álgebra lineal

**Clave** `algebra-lineal`

### Definición

**Clave** `definicion`

**Definición** Opera con matrices y vectores para resolver sistemas, descomponer matrices y estimar parámetros.

**Búsqueda** linalg solve inv det eig svd lstsq

**Para recordar** Para resolver Ax=b, usa solve antes que calcular la inversa.

#### Resolver un sistema de costos

```python
from scipy.linalg import solve
print(solve([[2,1],[1,1]], [8,5]))
```

Se buscan dos cantidades que satisfacen ambas ecuaciones.

**Resultado esperado**

```text
[3. 2.]
```

### solve

**Clave** `solve`

**Definición** Resuelve Ax=b para una matriz cuadrada no singular.

**Búsqueda** solve Ax b sistema lineal

**Para recordar** La solución debe verificar A@x=b.

#### Resolver y comprobar

```python
from scipy.linalg import solve
A = np.array([[2,1],[1,1]])
b = np.array([8,5])
x = solve(A,b)
print(x, A@x)
```

El producto reconstruye b.

**Resultado esperado**

```text
[3. 2.] [8. 5.]
```

### inv y det

**Clave** `inv-det`

**Definición** inv obtiene la inversa de una matriz no singular; det calcula su determinante.

**Búsqueda** inv det inversa determinante

**Para recordar** Determinante cero indica singularidad matemática; numéricamente no basta para medir condicionamiento.

#### Calcular inversa y determinante

```python
from scipy import linalg
A = np.array([[2,0],[0,4]])
print(linalg.inv(A))
print(linalg.det(A))
```

La inversa revierte la transformación lineal.

**Resultado esperado**

```text
[[0.5  0.  ]
 [0.   0.25]]
8.0
```

### eig

**Clave** `eig`

**Definición** Obtiene autovalores y autovectores de una matriz cuadrada.

**Búsqueda** eig eigenvalue eigenvector

**Para recordar** A@v = lambda*v.

#### Calcular autovalores

```python
from scipy.linalg import eig
w, v = eig([[2,0],[0,4]])
print(w.real)
```

Los autovalores son factores de escala en las direcciones propias.

**Resultado esperado**

```text
[2. 4.]
```

### SVD

**Clave** `svd`

**Definición** Descompone una matriz como U @ diag(s) @ Vh.

**Búsqueda** svd singular values reducción dimensión

**Para recordar** Los valores singulares indican magnitud por componente.

#### Obtener valores singulares

```python
from scipy.linalg import svd
u, s, vh = svd([[3,0],[0,1]], full_matrices=False)
print(s)
```

Los valores se devuelven de mayor a menor.

**Resultado esperado**

```text
[3. 1.]
```

### lstsq

**Clave** `lstsq`

**Definición** Resuelve mínimos cuadrados para sistemas posiblemente sobredeterminados.

**Búsqueda** lstsq regresion minimos cuadrados

**Para recordar** Minimiza la norma de Ax-b.

#### Ajustar una recta a datos

```python
from scipy.linalg import lstsq
A = np.column_stack([publicidad, np.ones(5)])
coef, residuos, rango, s = lstsq(A, ingresos)
print(np.round(coef, 3))
```

La primera columna de A multiplica pendiente y la segunda intercepto.

**Resultado esperado**

```text
[2.1 0.7]
```

## Distancias y búsqueda espacial

**Clave** `distancias`

### Definición

**Clave** `definicion`

**Definición** Las distancias cuantifican diferencia entre vectores; una métrica adecuada depende de escala, unidades y objetivo.

**Búsqueda** spatial distance euclidean cityblock cosine KDTree

**Para recordar** Escala variables si una unidad domina la distancia.

#### Medir diferencia euclidiana entre dos perfiles

```python
from scipy.spatial.distance import euclidean
print(euclidean([0,0],[3,4]))
```

La distancia es la raíz de la suma de diferencias cuadradas.

**Resultado esperado**

```text
5.0
```

### Euclidiana y Manhattan

**Clave** `metricas`

**Definición** Euclidiana mide distancia recta; Manhattan suma diferencias absolutas por dimensión.

**Búsqueda** euclidean cityblock manhattan

**Para recordar** Elige según significado de las dimensiones.

#### Comparar dos métricas

```python
from scipy.spatial.distance import euclidean, cityblock
print(euclidean([0,0],[3,4]), cityblock([0,0],[3,4]))
```

La primera mide línea recta y la segunda suma desplazamientos.

**Resultado esperado**

```text
5.0 7
```

### Distancia coseno

**Clave** `cosine`

**Definición** Mide uno menos la similitud coseno, basada en orientación de vectores no nulos.

**Búsqueda** cosine distancia similitud

**Para recordar** Vectores proporcionales positivos tienen distancia cero.

#### Comparar patrones de consumo

```python
from scipy.spatial.distance import cosine
print(round(cosine([1,2],[2,4]), 6))
```

Los patrones tienen la misma dirección.

**Resultado esperado**

```text
0.0
```

### cdist y pdist

**Clave** `cdist-pdist`

**Definición** cdist calcula distancias entre dos conjuntos; pdist calcula pares dentro de un conjunto.

**Búsqueda** cdist pdist squareform

**Para recordar** pdist devuelve un vector condensado.

#### Calcular distancias entre perfiles

```python
from scipy.spatial.distance import cdist, pdist
x = [[0,0],[3,4],[0,4]]
print(cdist(x, [[0,0]]).ravel())
print(pdist(x))
```

La segunda salida representa pares (0,1), (0,2), (1,2).

**Resultado esperado**

```text
[0. 5. 4.]
[5. 4. 3.]
```

### KDTree

**Clave** `kdtree`

**Definición** Organiza puntos para buscar vecinos cercanos de forma eficiente.

**Búsqueda** KDTree query nearest neighbor

**Para recordar** query devuelve distancia e índice.

#### Buscar tienda más cercana

```python
from scipy.spatial import KDTree
tree = KDTree([[0,0],[3,4],[10,10]])
d, i = tree.query([2,3])
print(round(d, 3), i)
```

El índice identifica la segunda tienda.

**Resultado esperado**

```text
1.414 1
```

## Clustering

**Clave** `clustering`

### Definición

**Clave** `definicion`

**Definición** Agrupa observaciones según similitud sin etiquetas previas. El resultado depende de las variables, escala, distancia y método.

**Búsqueda** cluster linkage dendrogram fcluster kmeans

**Para recordar** Valida que los grupos sean útiles, no solo que existan.

#### Formar grupos jerárquicos de clientes

```python
from scipy.cluster.hierarchy import linkage, fcluster
x = [[0,0],[0,1],[10,10],[10,11]]
z = linkage(x, method="ward")
print(fcluster(z, t=2, criterion="maxclust"))
```

Los clientes cercanos se agrupan; los identificadores son arbitrarios.

**Resultado esperado**

```text
[1 1 2 2]
```

### linkage

**Clave** `linkage`

**Definición** Construye una jerarquía de fusiones de grupos.

**Búsqueda** linkage ward single complete

**Para recordar** Ward utiliza distancia euclidiana y minimiza aumento de dispersión interna.

#### Observar alturas de fusiones

```python
from scipy.cluster.hierarchy import linkage
z = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')
print(np.round(z[:,2], 3))
```

Las últimas fusiones unen grupos más distantes.

**Resultado esperado**

```text
[ 1.  1. 20.]
```

### Dendrograma

**Clave** `dendrogram`

**Definición** Representa la jerarquía de fusiones y sus alturas.

**Búsqueda** dendrogram cluster jerarquico

**Para recordar** La altura ayuda a elegir un corte, no garantiza grupos reales.

#### Obtener orden de hojas sin dibujar

```python
from scipy.cluster.hierarchy import linkage, dendrogram
z = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')
r = dendrogram(z, no_plot=True)
print(r['leaves'])
```

Para graficar usa dendrogram(z) con Matplotlib instalado.

**Resultado esperado**

```text
[0, 1, 2, 3]
```

### fcluster

**Clave** `fcluster`

**Definición** Corta una jerarquía en grupos planos según un criterio de distancia o número máximo de grupos.

**Búsqueda** fcluster maxclust distance

**Para recordar** Las etiquetas no tienen orden de calidad.

#### Cortar por distancia

```python
from scipy.cluster.hierarchy import linkage, fcluster
z = linkage([[0,0],[0,1],[10,10],[10,11]], method='ward')
print(fcluster(z, t=2, criterion='distance'))
```

Se separan las dos zonas de puntos.

**Resultado esperado**

```text
[1 1 2 2]
```

### kmeans

**Clave** `kmeans`

**Definición** Estima centroides que representan grupos de puntos; requiere elegir k o centroides iniciales.

**Búsqueda** kmeans vq centroides

**Para recordar** Escala datos y comprueba estabilidad del resultado.

#### Obtener centroides y asignaciones

```python
from scipy.cluster.vq import kmeans, vq
x = np.array([[0.,0.],[0.,1.],[10.,10.],[10.,11.]])
centros, dist = kmeans(x, np.array([[0.,0.],[10.,10.]]))
print(centros)
print(vq(x, centros)[0])
```

Se inicializa con dos centroides para reproducibilidad.

**Resultado esperado**

```text
[[ 0.   0.5]
 [10.  10.5]]
[0 0 1 1]
```

## Matrices dispersas

**Clave** `sparse`

### Definición

**Clave** `definicion`

**Definición** Almacenan únicamente elementos no nulos y metadatos de posición, útiles cuando casi todos los valores son cero.

**Búsqueda** sparse csr csc coo sparse array

**Para recordar** Evita convertir a denso si la matriz es grande.

#### Crear una matriz dispersa de interacciones

```python
from scipy.sparse import csr_array
x = csr_array([[0,1,0],[2,0,0]])
print(x.shape, x.nnz)
```

Hay dos valores almacenados en una matriz 2x3.

**Resultado esperado**

```text
(2, 3) 2
```

### CSR

**Clave** `csr`

**Definición** Formato comprimido por filas, eficiente para operaciones orientadas a filas y productos matriz-vector.

**Búsqueda** csr_array sparse filas

**Para recordar** @ es producto matricial; * es elemento a elemento en sparse arrays.

#### Multiplicar por un vector

```python
from scipy.sparse import csr_array
x = csr_array([[0,1,0],[2,0,0]])
print(x @ np.array([10,20,30]))
```

Se devuelve el producto de cada fila.

**Resultado esperado**

```text
[20 20]
```

### CSC

**Clave** `csc`

**Definición** Formato comprimido por columnas, adecuado para acceso por columnas.

**Búsqueda** csc_array sparse columnas

**Para recordar** Convierte de CSR a CSC cuando convenga.

#### Consultar columna

```python
from scipy.sparse import csc_array
x = csc_array([[0,1,0],[2,0,0]])
print(x[:,1:2].toarray())
```

Se usa formato denso solo para mostrar este ejemplo pequeño.

**Resultado esperado**

```text
[[1]
 [0]]
```

### COO

**Clave** `coo`

**Definición** Representa valores mediante coordenadas fila-columna y facilita construir matrices a partir de eventos.

**Búsqueda** coo_array coordenadas

**Para recordar** Al convertir a CSR se suman coordenadas duplicadas.

#### Construir matriz de interacciones

```python
from scipy.sparse import coo_array
x = coo_array(([2,3],([0,1],[1,0])), shape=(2,3))
print(x.tocsr().toarray())
```

Los dos valores se ubican en sus coordenadas.

**Resultado esperado**

```text
[[0 2 0]
 [3 0 0]]
```

## Procesamiento de señales

**Clave** `signal`

### Definición

**Clave** `definicion`

**Definición** Analiza secuencias medidas en el tiempo para suavizar ruido, detectar patrones o aplicar filtros.

**Búsqueda** signal find_peaks savgol_filter butter

**Para recordar** Conoce la frecuencia de muestreo antes de diseñar filtros.

#### Detectar picos de demanda

```python
from scipy.signal import find_peaks
p, prop = find_peaks([1,5,2,6,1], height=4)
print(p)
```

Los índices de los dos máximos locales son 1 y 3.

**Resultado esperado**

```text
[1 3]
```

### find_peaks

**Clave** `find-peaks`

**Definición** Encuentra máximos locales y permite filtrar por altura, prominencia y distancia.

**Búsqueda** find_peaks height prominence

**Para recordar** No confundir picos detectados con causas de negocio.

#### Detectar picos prominentes

```python
from scipy.signal import find_peaks
p, prop = find_peaks([1,5,2,6,1], prominence=3)
print(p, prop['prominences'])
```

La prominencia mide cuánto sobresale el pico del entorno.

**Resultado esperado**

```text
[1 3] [3. 5.]
```

### Savitzky-Golay

**Clave** `savgol-filter`

**Definición** Suaviza una serie mediante ajustes polinómicos locales.

**Búsqueda** savgol_filter window_length polyorder

**Para recordar** La ventana debe ser adecuada para la escala temporal.

#### Suavizar una secuencia

```python
from scipy.signal import savgol_filter
print(np.round(savgol_filter([10,12,9,13,11,14,12], 5, 2), 2))
```

Se devuelve una serie del mismo largo.

**Resultado esperado**

```text
[10.26 10.77 11.14 10.94 12.8  13.   12.2 ]
```

### Filtros Butterworth

**Clave** `butter`

**Definición** Diseña filtros de frecuencia; las secciones de segundo orden permiten aplicación numéricamente estable.

**Búsqueda** butter sosfilt paso bajo

**Para recordar** Un filtro causal puede introducir retraso.

#### Atenuar alternancia rápida

```python
from scipy.signal import butter, sosfilt
sos = butter(2, 2, fs=20, output='sos')
x = 10+np.tile([1.,-1.], 50)
y = sosfilt(sos, x)
print(round(float(np.std(y[-40:])), 3))
```

Se mide dispersión final evitando el transitorio inicial.

**Resultado esperado**

```text
0.0
```

## Transformadas de Fourier

**Clave** `fft`

### Definición

**Clave** `definicion`

**Definición** Descompone una señal en componentes de frecuencia. Es útil para identificar periodicidades en datos regularmente muestreados.

**Búsqueda** fft rfft rfftfreq frecuencia

**Para recordar** La frecuencia depende del intervalo entre muestras.

#### Encontrar frecuencia dominante

```python
from scipy.fft import rfft, rfftfreq
t = np.arange(100)/100
x = np.sin(2*np.pi*5*t)
f = rfftfreq(len(x), d=0.01)
print(f[np.argmax(np.abs(rfft(x)))])
```

La señal simulada tiene frecuencia de 5 Hz.

**Resultado esperado**

```text
5.0
```

### FFT e IFFT

**Clave** `fft-ifft`

**Definición** fft transforma a frecuencia; ifft reconstruye la señal temporal a partir de coeficientes complejos.

**Búsqueda** fft ifft transformada inversa

**Para recordar** La inversa reconstruye salvo errores de redondeo.

#### Transformar y reconstruir

```python
from scipy.fft import fft, ifft
x = np.array([1,2,3,4])
print(np.round(ifft(fft(x)).real, 6))
```

Se recuperan los valores originales.

**Resultado esperado**

```text
[1. 2. 3. 4.]
```

### Espectro de señal real

**Clave** `rfft`

**Definición** rfft conserva las frecuencias no negativas de una señal real; rfftfreq proporciona sus etiquetas.

**Búsqueda** rfft rfftfreq frecuencia dominante

**Para recordar** Quita la media si solo interesan ciclos no constantes.

#### Detectar periodicidad semanal

```python
from scipy.fft import rfft, rfftfreq
x = 10+np.sin(2*np.pi*np.arange(28)/7)
f = rfftfreq(len(x), d=1)
i = np.argmax(np.abs(rfft(x-x.mean())))
print(round(1/f[i], 2))
```

Se expresa el periodo en días.

**Resultado esperado**

```text
7.0
```

## Integración y ecuaciones diferenciales

**Clave** `integracion`

### Definición

**Clave** `definicion`

**Definición** Aproxima áreas bajo curvas y soluciones de modelos dinámicos continuos.

**Búsqueda** integrate quad trapezoid solve_ivp

**Para recordar** Distingue integrar una función de integrar datos muestreados.

#### Integrar una tasa de ingresos

```python
from scipy.integrate import quad
r, error = quad(lambda t: 2*t, 0, 3)
print(round(r, 3))
```

El ingreso acumulado es el área bajo la tasa instantánea.

**Resultado esperado**

```text
9.0
```

### quad

**Clave** `quad`

**Definición** Integra una función escalar entre límites y estima el error numérico.

**Búsqueda** quad integral error

**Para recordar** La segunda salida es estimación del error de integración.

#### Integrar demanda instantánea

```python
from scipy.integrate import quad
r, err = quad(lambda x: x**2, 0, 3)
print(round(r, 3))
```

La integral definida vale nueve.

**Resultado esperado**

```text
9.0
```

### trapezoid

**Clave** `trapezoid`

**Definición** Aproxima la integral de valores observados usando trapecios entre puntos.

**Búsqueda** trapezoid datos tiempo

**Para recordar** Proporciona x para intervalos irregulares.

#### Acumular una tasa medida en tres instantes

```python
from scipy.integrate import trapezoid
print(trapezoid([10,20,30], x=[0,1,3]))
```

Las anchuras de los intervalos son uno y dos.

**Resultado esperado**

```text
65.0
```

### solve_ivp

**Clave** `solve-ivp`

**Definición** Resuelve un problema de valor inicial para una ecuación diferencial ordinaria.

**Búsqueda** solve_ivp ODE crecimiento

**Para recordar** Define derivada, tiempo e inicial.

#### Simular crecimiento continuo del 10%

```python
from scipy.integrate import solve_ivp
r = solve_ivp(lambda t,y: 0.1*y, (0,2), [100], t_eval=[0,1,2], rtol=1e-9, atol=1e-9)
print(np.round(r.y[0], 2))
```

El modelo aproxima 100*exp(0.1*t).

**Resultado esperado**

```text
[100.   110.52 122.14]
```

## Procesamiento multidimensional

**Clave** `ndimage`

### Definición

**Clave** `definicion`

**Definición** Aplica filtros y operaciones geométricas a arreglos multidimensionales, como imágenes o mapas de intensidad.

**Búsqueda** ndimage gaussian_filter label zoom

**Para recordar** Los filtros cambian valores y pueden alterar los bordes.

#### Suavizar un mapa de intensidad

```python
from scipy.ndimage import gaussian_filter
x = np.array([[0.,0.,0.],[0.,9.,0.],[0.,0.,0.]])
print(np.round(gaussian_filter(x, sigma=1), 2))
```

La intensidad central se reparte entre vecinos.

**Resultado esperado**

```text
[[0.79 1.09 0.79]
 [1.09 1.5  1.09]
 [0.79 1.09 0.79]]
```

### gaussian_filter

**Clave** `gaussian-filter`

**Definición** Suaviza un arreglo con un núcleo gaussiano de desviación sigma.

**Búsqueda** gaussian_filter suavizado imagen

**Para recordar** Sigma mayor produce más suavizado.

#### Suavizar una línea de intensidad

```python
from scipy.ndimage import gaussian_filter
print(np.round(gaussian_filter(np.array([0.,0.,9.,0.,0.]), sigma=1), 2))
```

La salida conserva el tamaño.

**Resultado esperado**

```text
[0.53 2.18 3.59 2.18 0.53]
```

### label

**Clave** `label`

**Definición** Etiqueta componentes conectados de elementos no nulos.

**Búsqueda** label componentes conectados

**Para recordar** La conectividad define qué píxeles son vecinos.

#### Contar zonas de actividad

```python
from scipy.ndimage import label
r, n = label([[1,0,1],[1,0,0]])
print(r)
print(n)
```

Hay dos componentes separadas.

**Resultado esperado**

```text
[[1 0 2]
 [1 0 0]]
2
```

## Archivos científicos

**Clave** `io`

### Definición

**Clave** `definicion`

**Definición** Lee y escribe formatos científicos, como MATLAB MAT y Matrix Market. Para CSV y Excel suelen usarse otras bibliotecas.

**Búsqueda** scipy.io loadmat savemat mmread

**Para recordar** Usa el lector específico del formato.

#### Guardar y recuperar una matriz MAT en memoria

```python
from scipy.io import savemat, loadmat
from io import BytesIO
b = BytesIO()
savemat(b, {"ventas": ventas})
b.seek(0)
print(loadmat(b)["ventas"].ravel())
```

BytesIO evita crear archivos en el disco.

**Resultado esperado**

```text
[100. 120. 120. 140. 220.]
```

### MATLAB MAT

**Clave** `mat`

**Definición** savemat escribe variables y loadmat recupera un diccionario de datos.

**Búsqueda** savemat loadmat matlab

**Para recordar** El formato MAT v7.3 usa HDF5 y no lo lee loadmat directamente.

#### Recuperar variable desde MAT

```python
from scipy.io import savemat, loadmat
from io import BytesIO
b = BytesIO()
savemat(b, {'x': np.array([1,2,3])})
b.seek(0)
print(loadmat(b)['x'].shape)
```

El vector se recupera como matriz fila con la configuración usada.

**Resultado esperado**

```text
(1, 3)
```

### Matrix Market

**Clave** `matrix-market`

**Definición** mmwrite y mmread intercambian matrices densas o dispersas en formato Matrix Market.

**Búsqueda** mmread mmwrite sparse

**Para recordar** Conserva dimensiones y valores de matrices.

#### Guardar y recuperar matriz

```python
from scipy.io import mmwrite, mmread
from io import BytesIO
b = BytesIO()
mmwrite(b, np.array([[1,0],[0,2]]))
b.seek(0)
print(mmread(b))
```

El contenido se recupera sin archivos externos.

**Resultado esperado**

```text
[[1 0]
 [0 2]]
```

## Funciones matemáticas especiales

**Clave** `special`

### Definición

**Clave** `definicion`

**Definición** Incluye funciones matemáticas usadas en probabilidad, modelos numéricos y transformaciones.

**Búsqueda** special expit logit gamma

**Para recordar** Usa funciones especializadas para estabilidad numérica.

#### Transformar puntuación en probabilidad

```python
from scipy.special import expit
print(expit(0))
```

La función logística transforma cero en 0.5.

**Resultado esperado**

```text
0.5
```

### expit y logit

**Clave** `expit-logit`

**Definición** expit transforma log-odds en probabilidad; logit es su inversa en (0,1).

**Búsqueda** expit logit sigmoid odds

**Para recordar** logit de 0 o 1 produce infinito.

#### Convertir probabilidad en log-odds y volver

```python
from scipy.special import expit, logit
z = logit(0.8)
print(round(z, 4), round(expit(z), 4))
```

Se recupera la probabilidad inicial.

**Resultado esperado**

```text
1.3863 0.8
```

### Gamma y log-gamma

**Clave** `gamma`

**Definición** Gamma extiende el factorial: gamma(n)=(n-1)! para enteros positivos. gammaln calcula log del valor absoluto de gamma.

**Búsqueda** gamma gammaln factorial

**Para recordar** Usa gammaln para evitar desbordamientos en cálculos logarítmicos.

#### Calcular gamma de cinco

```python
from scipy.special import gamma, gammaln
print(gamma(5), round(gammaln(5), 4))
```

Gamma de cinco equivale a 4 factorial.

**Resultado esperado**

```text
24.0 3.1781
```

## Constantes y conversiones

**Clave** `constants`

### Definición

**Clave** `definicion`

**Definición** Proporciona constantes matemáticas, físicas y factores de unidades definidos en SI.

**Búsqueda** constants pi speed_of_light physical_constants

**Para recordar** Verifica las unidades antes de operar.

#### Convertir kilovatios-hora a julios

```python
from scipy import constants
print(2*constants.kilo*constants.hour)
```

Dos kWh equivalen a dos mil vatios durante 3600 segundos.

**Resultado esperado**

```text
7200000.0
```

### Constantes físicas

**Clave** `constantes-fisicas`

**Definición** Expone valores físicos y, para physical_constants, unidades e incertidumbres.

**Búsqueda** physical_constants constantes unidades SI

**Para recordar** No mezcles unidades de distintas escalas.

#### Consultar velocidad de la luz

```python
from scipy import constants
print(constants.c)
```

La constante se expresa en metros por segundo.

**Resultado esperado**

```text
299792458.0
```

### Factores de conversión

**Clave** `conversion-unidades`

**Definición** Incluye factores para unidades como kilómetro, hora y milla.

**Búsqueda** constants kilo hour mile conversion

**Para recordar** Multiplica por el factor a SI.

#### Convertir tres millas a metros

```python
from scipy import constants
print(round(3*constants.mile, 3))
```

El resultado está en metros.

**Resultado esperado**

```text
4828.032
```

## Regresión por distancia ortogonal

**Clave** `odr`

### Definición

**Clave** `definicion`

**Definición** ODR ajusta modelos considerando errores en las variables explicativas y de respuesta. Es un método especializado, distinto de mínimos cuadrados ordinarios.

**Búsqueda** odr orthogonal distance regression errores x y

**Para recordar** Si x también tiene error, considera un modelo que lo represente.

**Nota** API de referencia SciPy 1.17.0; scipy.odr está deprecado desde esa versión. Para proyectos nuevos se recomienda la alternativa externa odrpack; se conserva aquí por el temario acordado.

#### Ajustar recta con incertidumbre en ambos ejes

```python
from scipy import odr
def recta(beta, x):
    return beta[0]*x+beta[1]
datos = odr.RealData(publicidad, ingresos, sx=np.full(5,0.2), sy=np.full(5,0.5))
r = odr.ODR(datos, odr.Model(recta), beta0=[2,0]).run()
print(np.round(r.beta, 3))
```

Se declaran desviaciones conocidas en x e y.

**Resultado esperado**

```text
[2.138 0.587]
```

## Fuentes

Documentación oficial de la versión de referencia (SciPy 1.17.0):

- [stats.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/stats.html) — Funciones estadísticas, distribuciones, pruebas, remuestreo y asociación.
- [generated/scipy.stats.anderson.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/generated/scipy.stats.anderson.html) — Transición de la API de Anderson-Darling.
- [generated/scipy.stats.f_oneway.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/generated/scipy.stats.f_oneway.html) — ANOVA clásica y de Welch.
- [generated/scipy.stats.tukey_hsd.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/generated/scipy.stats.tukey_hsd.html) — Comparaciones múltiples y Games-Howell.
- [generated/scipy.stats.power.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/generated/scipy.stats.power.html) — Simulación de potencia.
- [generated/scipy.stats.quantile_test.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/generated/scipy.stats.quantile_test.html) — Contraste de cuantiles.
- [optimize.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/optimize.html) — Optimización y ajuste de curvas.
- [interpolate.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/interpolate.html) — Interpolación.
- [linalg.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/linalg.html) — Álgebra lineal.
- [spatial.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/spatial.html) — Búsqueda espacial y distancias.
- [cluster.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/cluster.html) — Clustering.
- [sparse.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/sparse.html) — Formatos de matrices dispersas.
- [signal.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/signal.html) — Filtros y picos.
- [fft.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/fft.html) — Transformadas de Fourier.
- [integrate.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/integrate.html) — Integración y ecuaciones diferenciales.
- [ndimage.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/ndimage.html) — Procesamiento multidimensional.
- [io.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/io.html) — Archivos científicos.
- [special.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/special.html) — Funciones especiales.
- [constants.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/constants.html) — Constantes y conversiones.
- [odr.html](https://docs.scipy.org/doc/scipy-1.17.0/reference/odr.html) — Regresión por distancia ortogonal y estado de deprecación.
- [NumPy 2.3: referencia](https://numpy.org/doc/2.3/reference/) — arreglos, operaciones básicas y generadores aleatorios.
