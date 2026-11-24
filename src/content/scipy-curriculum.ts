// Generado desde specs/scipy.md por scripts/prepare-scipy-notes.mjs.
export const scipyCurriculum = [
  {
    "key": "entorno",
    "label": "SciPy y entorno",
    "children": [
      {
        "id": "analisis-de-datos/scipy/entorno/definicion",
        "label": "Definición",
        "description": "SciPy amplía NumPy con algoritmos científicos y estadísticos. Se importa el submódulo que contiene la operación necesaria."
      },
      {
        "id": "analisis-de-datos/scipy/entorno/importacion",
        "label": "Importación y submódulos",
        "description": "Importa el módulo o la función concreta que vas a utilizar."
      },
      {
        "id": "analisis-de-datos/scipy/entorno/axis",
        "label": "Arreglos y axis",
        "description": "`axis` indica la dimensión sobre la que se reduce un arreglo."
      },
      {
        "id": "analisis-de-datos/scipy/entorno/nan-policy",
        "label": "Valores faltantes y nan_policy",
        "description": "Muchas funciones permiten propagar, omitir o rechazar NaN."
      },
      {
        "id": "analisis-de-datos/scipy/entorno/resultados",
        "label": "Resultados y atributos",
        "description": "Varias funciones devuelven objetos con campos nombrados en lugar de un número suelto."
      },
      {
        "id": "analisis-de-datos/scipy/entorno/rng",
        "label": "Reproducibilidad y rng",
        "description": "Un generador aleatorio con semilla permite repetir simulaciones en un entorno fijo."
      }
    ]
  },
  {
    "key": "estadistica-descriptiva",
    "label": "Estadística descriptiva",
    "children": [
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/definicion",
        "label": "Definición",
        "description": "Resume el centro, la dispersión y la forma de los datos. SciPy complementa las operaciones básicas de NumPy."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/centro",
        "label": "Media, mediana y moda",
        "description": "La media usa todos los valores; la mediana es el centro ordenado y la moda el valor más frecuente."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/dispersion",
        "label": "Varianza y desviación estándar",
        "description": "La varianza mide dispersión cuadrática y la desviación estándar vuelve a las unidades originales."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/gmean",
        "label": "Media geométrica",
        "description": "Promedia factores multiplicativos positivos; es útil para crecimiento compuesto."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/hmean",
        "label": "Media armónica",
        "description": "Promedia tasas positivas cuando la cantidad base de cada tramo es igual."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/sem",
        "label": "Error estándar",
        "description": "Estima la variabilidad de la media muestral entre muestras independientes."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/skew",
        "label": "Asimetría",
        "description": "Mide el desequilibrio de las colas de una distribución."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/kurtosis",
        "label": "Curtosis",
        "description": "Mide el cuarto momento estandarizado, relacionado con el peso de las colas."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/moment",
        "label": "Momentos",
        "description": "Calcula momentos centrales de un orden indicado."
      },
      {
        "id": "analisis-de-datos/scipy/estadistica-descriptiva/variation",
        "label": "Coeficiente de variación",
        "description": "Divide la desviación estándar entre la media para comparar dispersión relativa."
      }
    ]
  },
  {
    "key": "robusta",
    "label": "Cuantiles, outliers y estadística robusta",
    "children": [
      {
        "id": "analisis-de-datos/scipy/robusta/definicion",
        "label": "Definición",
        "description": "Los cuantiles localizan posiciones y las medidas robustas reducen la influencia de valores extremos. Un outlier es una observación inusual, no necesariamente errónea."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/percentiles",
        "label": "Percentiles",
        "description": "Un percentil devuelve el valor en una posición porcentual de la distribución ordenada."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/percentileofscore",
        "label": "Rango percentil",
        "description": "Indica qué porcentaje de observaciones queda por debajo o a la altura de un valor según el criterio elegido."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/iqr",
        "label": "IQR y límites de Tukey",
        "description": "El rango Q3-Q1 permite definir límites exploratorios Q1-1.5 IQR y Q3+1.5 IQR."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/zscore",
        "label": "Puntuación Z",
        "description": "Expresa cuántas desviaciones estándar separan un dato de la media."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/mad",
        "label": "Desviación absoluta mediana",
        "description": "MAD es la mediana de las distancias absolutas a la mediana."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/trim-mean",
        "label": "Media recortada",
        "description": "Elimina una proporción de cada extremo antes de calcular la media."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/winsorize",
        "label": "Winsorización",
        "description": "Sustituye los extremos por valores límite sin eliminar registros."
      },
      {
        "id": "analisis-de-datos/scipy/robusta/rankdata",
        "label": "Ranking de datos",
        "description": "Asigna posiciones a valores ordenados con una regla de empates."
      }
    ]
  },
  {
    "key": "transformaciones",
    "label": "Transformaciones y frecuencias",
    "children": [
      {
        "id": "analisis-de-datos/scipy/transformaciones/definicion",
        "label": "Definición",
        "description": "Transformar valores o resumirlos por intervalos ayuda a estudiar distribuciones y patrones."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/boxcox",
        "label": "Box-Cox",
        "description": "Transforma datos estrictamente positivos mediante una potencia que puede estimarse de la muestra."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/yeojohnson",
        "label": "Yeo-Johnson",
        "description": "Transformación de potencia que admite cero y valores negativos."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/ecdf",
        "label": "Distribución acumulada empírica",
        "description": "Estima la fracción de datos menores o iguales que un valor sin asumir una distribución teórica."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/binned-statistic",
        "label": "Estadísticas por intervalos",
        "description": "Agrupa una variable numérica en intervalos y calcula una estadística de otra variable."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/entropy",
        "label": "Entropía",
        "description": "Mide incertidumbre de una distribución de probabilidades; con base 2 se expresa en bits."
      },
      {
        "id": "analisis-de-datos/scipy/transformaciones/circmean",
        "label": "Media circular",
        "description": "Promedia valores que se repiten cíclicamente, como horas o ángulos."
      }
    ]
  },
  {
    "key": "distribuciones",
    "label": "Distribuciones de probabilidad",
    "children": [
      {
        "id": "analisis-de-datos/scipy/distribuciones/definicion",
        "label": "Definición",
        "description": "Una distribución modela qué valores puede tomar una variable aleatoria y con qué probabilidades. Las discretas asignan masa; las continuas asignan densidad."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/norm",
        "label": "Normal",
        "description": "Distribución continua simétrica parametrizada por media loc y desviación scale."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/binom",
        "label": "Binomial",
        "description": "Modela éxitos en n ensayos independientes con probabilidad p constante."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/poisson",
        "label": "Poisson",
        "description": "Modela conteos de eventos con una tasa media mu por intervalo, bajo supuestos de independencia y tasa constante."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/uniform",
        "label": "Uniforme",
        "description": "Modelo continuo de densidad constante en un intervalo."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/expon",
        "label": "Exponencial",
        "description": "Modela tiempos entre eventos de un proceso de Poisson homogéneo."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/t",
        "label": "t de Student",
        "description": "Distribución simétrica con colas más pesadas que la normal para pocos grados de libertad."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/chi2",
        "label": "Chi-cuadrado",
        "description": "Distribución no negativa usada en pruebas de conteos y varianzas."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/f",
        "label": "Distribución F",
        "description": "Modela cocientes de varianzas escaladas bajo supuestos normales; aparece en ANOVA."
      },
      {
        "id": "analisis-de-datos/scipy/distribuciones/beta",
        "label": "Beta",
        "description": "Distribución continua entre cero y uno útil para modelar proporciones."
      }
    ]
  },
  {
    "key": "metodos-distribuciones",
    "label": "Métodos de distribuciones",
    "children": [
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/definicion",
        "label": "Definición",
        "description": "Los objetos de distribución ofrecen métodos para consultar probabilidades, cuantiles, generar muestras y ajustar parámetros."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/pdf-pmf",
        "label": "PDF y PMF",
        "description": "pdf devuelve densidad continua; pmf devuelve probabilidad de un valor discreto."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/cdf",
        "label": "CDF",
        "description": "Calcula P(X <= x)."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/sf",
        "label": "SF",
        "description": "Calcula la probabilidad estrictamente superior al umbral."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/ppf",
        "label": "PPF",
        "description": "Devuelve un cuantil a partir de una probabilidad acumulada."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/rvs",
        "label": "RVS",
        "description": "Genera observaciones de una distribución con los parámetros indicados."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/fit",
        "label": "FIT",
        "description": "Estima parámetros de una distribución a partir de datos observados."
      },
      {
        "id": "analisis-de-datos/scipy/metodos-distribuciones/interval",
        "label": "INTERVAL",
        "description": "Devuelve el intervalo central de probabilidad de una distribución."
      }
    ]
  },
  {
    "key": "inferencia",
    "label": "Inferencia estadística",
    "children": [
      {
        "id": "analisis-de-datos/scipy/inferencia/definicion",
        "label": "Definición",
        "description": "La inferencia usa muestras para estimar parámetros poblacionales o evaluar hipótesis bajo ciertos supuestos."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/hipotesis",
        "label": "Hipótesis nula y alternativa",
        "description": "H0 es la afirmación de referencia; H1 es la alternativa que se contrasta."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/pvalue",
        "label": "P-value y significancia",
        "description": "El p-value mide, suponiendo H0 y el modelo, la probabilidad de un resultado al menos tan extremo como el observado según la prueba."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/alternative",
        "label": "Pruebas unilaterales y bilaterales",
        "description": "alternative fija si se busca diferencia en ambas direcciones o solo en una."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/grados-libertad",
        "label": "Grados de libertad",
        "description": "Los grados de libertad reflejan cuánta información independiente queda para estimar variabilidad tras las restricciones del modelo."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/errores",
        "label": "Errores tipo I y II",
        "description": "Tipo I: rechazar H0 siendo verdadera. Tipo II: no rechazarla siendo falsa."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/intervalo-confianza",
        "label": "Intervalo de confianza de la media",
        "description": "Un intervalo de confianza cuantifica incertidumbre sobre un parámetro mediante un procedimiento con cobertura a largo plazo."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/t-interval",
        "label": "Intervalo t manual",
        "description": "Para una media normal con desviación desconocida, se combina la media, el error estándar y la distribución t."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/efecto",
        "label": "Tamaño del efecto",
        "description": "Mide la magnitud de una diferencia; puede expresarse en unidades originales o en desviaciones estándar."
      },
      {
        "id": "analisis-de-datos/scipy/inferencia/power",
        "label": "Potencia y tamaño muestral",
        "description": "La potencia es la probabilidad de rechazar H0 bajo una alternativa especificada. Se estima para tamaños y efectos supuestos."
      }
    ]
  },
  {
    "key": "supuestos",
    "label": "Normalidad y varianzas",
    "children": [
      {
        "id": "analisis-de-datos/scipy/supuestos/definicion",
        "label": "Definición",
        "description": "Las pruebas de normalidad y homogeneidad de varianzas aportan evidencia sobre supuestos de algunos métodos. No sustituyen la inspección del diseño ni de gráficos."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/shapiro",
        "label": "Shapiro-Wilk",
        "description": "Contrasta normalidad de una muestra."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/normaltest",
        "label": "D’Agostino-Pearson",
        "description": "Combina información de asimetría y curtosis para contrastar normalidad."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/anderson",
        "label": "Anderson-Darling",
        "description": "Contrasta el ajuste a una distribución y da especial peso a las colas."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/probplot",
        "label": "Q-Q plot y probplot",
        "description": "Compara cuantiles observados con cuantiles teóricos; una relación aproximadamente lineal sugiere compatibilidad con el modelo."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/levene",
        "label": "Levene",
        "description": "Contrasta igualdad de varianzas entre grupos independientes. Con center='median' es más robusta ante desviaciones de normalidad."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/bartlett",
        "label": "Bartlett",
        "description": "Contrasta igualdad de varianzas y es sensible a desviaciones de normalidad."
      },
      {
        "id": "analisis-de-datos/scipy/supuestos/fligner",
        "label": "Fligner-Killeen",
        "description": "Contrasta igualdad de varianzas mediante rangos y es robusta frente a no normalidad."
      }
    ]
  },
  {
    "key": "pruebas-t",
    "label": "Pruebas t",
    "children": [
      {
        "id": "analisis-de-datos/scipy/pruebas-t/definicion",
        "label": "Definición",
        "description": "Las pruebas t contrastan medias o medias de diferencias. Se elige entre una muestra, grupos independientes y observaciones emparejadas."
      },
      {
        "id": "analisis-de-datos/scipy/pruebas-t/ttest-1samp",
        "label": "t de una muestra",
        "description": "Contrasta la media poblacional con un valor de referencia."
      },
      {
        "id": "analisis-de-datos/scipy/pruebas-t/ttest-ind",
        "label": "t independiente de Student",
        "description": "Compara medias de dos grupos independientes suponiendo varianzas poblacionales iguales."
      },
      {
        "id": "analisis-de-datos/scipy/pruebas-t/welch",
        "label": "t de Welch",
        "description": "Compara medias independientes sin asumir varianzas iguales."
      },
      {
        "id": "analisis-de-datos/scipy/pruebas-t/ttest-rel",
        "label": "t emparejada",
        "description": "Contrasta si la media de las diferencias de pares es cero."
      }
    ]
  },
  {
    "key": "anova",
    "label": "ANOVA y comparaciones posteriores",
    "children": [
      {
        "id": "analisis-de-datos/scipy/anova/definicion",
        "label": "Definición",
        "description": "ANOVA compara medias de tres o más grupos. Un rechazo indica que no todas las medias son iguales, pero no identifica qué pares difieren."
      },
      {
        "id": "analisis-de-datos/scipy/anova/anova-welch",
        "label": "ANOVA de Welch",
        "description": "Contrasta medias de varios grupos independientes sin exigir varianzas iguales."
      },
      {
        "id": "analisis-de-datos/scipy/anova/tukey-hsd",
        "label": "Tukey HSD",
        "description": "Compara todos los pares de medias controlando el error familiar bajo sus supuestos."
      },
      {
        "id": "analisis-de-datos/scipy/anova/dunnett",
        "label": "Dunnett",
        "description": "Compara varios tratamientos con un control compartido ajustando las comparaciones."
      }
    ]
  },
  {
    "key": "conteos-proporciones",
    "label": "Pruebas para conteos y proporciones",
    "children": [
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/definicion",
        "label": "Definición",
        "description": "Estas pruebas evalúan frecuencias observadas, asociaciones entre categorías o proporciones frente a una hipótesis."
      },
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/chi2-contingency",
        "label": "Chi-cuadrado de independencia",
        "description": "Contrasta si dos variables categóricas son independientes con una tabla de conteos."
      },
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/chisquare",
        "label": "Chi-cuadrado de bondad de ajuste",
        "description": "Compara frecuencias observadas con frecuencias esperadas de un modelo."
      },
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/fisher-exact",
        "label": "Prueba exacta de Fisher",
        "description": "Contrasta asociación en una tabla 2x2 mediante probabilidades exactas bajo H0."
      },
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/binomtest",
        "label": "Prueba binomial",
        "description": "Contrasta la probabilidad de éxito de una muestra frente a una proporción objetivo."
      },
      {
        "id": "analisis-de-datos/scipy/conteos-proporciones/proporcion-ic",
        "label": "Intervalo de proporción",
        "description": "Estima incertidumbre de una proporción binomial con un intervalo."
      }
    ]
  },
  {
    "key": "no-parametricas",
    "label": "Pruebas no paramétricas",
    "children": [
      {
        "id": "analisis-de-datos/scipy/no-parametricas/definicion",
        "label": "Definición",
        "description": "Las pruebas no paramétricas no exigen una forma normal específica, pero tienen otros supuestos sobre independencia, simetría o distribución según el método."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/mannwhitneyu",
        "label": "Mann-Whitney U",
        "description": "Compara rangos de dos muestras independientes."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/wilcoxon",
        "label": "Wilcoxon",
        "description": "Contrasta si las diferencias emparejadas tienen distribución simétrica centrada en cero."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/kruskal",
        "label": "Kruskal-Wallis",
        "description": "Compara rangos de dos o más grupos independientes."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/kstest",
        "label": "Kolmogorov-Smirnov de una muestra",
        "description": "Compara la CDF empírica con una distribución continua completamente especificada."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/ks-2samp",
        "label": "Kolmogorov-Smirnov de dos muestras",
        "description": "Compara la mayor distancia entre las CDF empíricas de dos muestras independientes continuas."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/friedmanchisquare",
        "label": "Friedman",
        "description": "Compara tratamientos repetidos en los mismos bloques o sujetos mediante rangos."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/median-test",
        "label": "Prueba de mediana",
        "description": "Compara la proporción de observaciones por encima y debajo de la mediana común entre muestras independientes."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/brunnermunzel",
        "label": "Brunner-Munzel",
        "description": "Contrasta si la probabilidad de que un valor de un grupo supere al otro, contando medio empate, es 0.5."
      },
      {
        "id": "analisis-de-datos/scipy/no-parametricas/quantile-test",
        "label": "Prueba de cuantiles",
        "description": "Contrasta si un valor de referencia corresponde al cuantil poblacional indicado."
      }
    ]
  },
  {
    "key": "correlacion",
    "label": "Correlación",
    "children": [
      {
        "id": "analisis-de-datos/scipy/correlacion/definicion",
        "label": "Definición",
        "description": "La correlación mide asociación entre variables emparejadas. Pearson mide asociación lineal y las correlaciones de rangos captan asociaciones monótonas."
      },
      {
        "id": "analisis-de-datos/scipy/correlacion/pearsonr",
        "label": "Pearson",
        "description": "Mide dirección e intensidad de la relación lineal."
      },
      {
        "id": "analisis-de-datos/scipy/correlacion/spearmanr",
        "label": "Spearman",
        "description": "Mide correlación de los rangos y detecta relaciones monótonas."
      },
      {
        "id": "analisis-de-datos/scipy/correlacion/kendalltau",
        "label": "Kendall",
        "description": "Mide concordancia entre pares ordenados, teniendo en cuenta empates según la variante."
      }
    ]
  },
  {
    "key": "regresion",
    "label": "Regresión lineal simple",
    "children": [
      {
        "id": "analisis-de-datos/scipy/regresion/definicion",
        "label": "Definición",
        "description": "Ajusta una recta y = intercept + slope*x a pares de observaciones minimizando los residuos cuadrados en y."
      },
      {
        "id": "analisis-de-datos/scipy/regresion/coeficientes",
        "label": "Pendiente e intercepto",
        "description": "slope es la variación estimada de y por unidad de x; intercept es el valor estimado cuando x=0."
      },
      {
        "id": "analisis-de-datos/scipy/regresion/r-cuadrado",
        "label": "R cuadrado",
        "description": "En regresión lineal simple con intercepto, rvalue al cuadrado mide la fracción de variación explicada por la recta."
      },
      {
        "id": "analisis-de-datos/scipy/regresion/significancia-regresion",
        "label": "P-value y errores estándar",
        "description": "linregress devuelve el p-value para pendiente cero y errores estándar de los coeficientes."
      },
      {
        "id": "analisis-de-datos/scipy/regresion/residuos",
        "label": "Residuos",
        "description": "Un residuo es el valor observado menos el predicho por el modelo."
      }
    ]
  },
  {
    "key": "remuestreo",
    "label": "Remuestreo y simulación",
    "children": [
      {
        "id": "analisis-de-datos/scipy/remuestreo/definicion",
        "label": "Definición",
        "description": "El remuestreo aproxima incertidumbre o distribuciones de referencia mediante muestras repetidas. El método debe respetar la estructura de los datos."
      },
      {
        "id": "analisis-de-datos/scipy/remuestreo/bootstrap",
        "label": "Bootstrap",
        "description": "Remuestrea con reemplazo para aproximar la distribución de una estadística."
      },
      {
        "id": "analisis-de-datos/scipy/remuestreo/permutation-test",
        "label": "Permutaciones",
        "description": "Reasigna observaciones según una hipótesis de intercambiabilidad para construir una distribución nula."
      },
      {
        "id": "analisis-de-datos/scipy/remuestreo/monte-carlo-test",
        "label": "Monte Carlo",
        "description": "Simula muestras bajo un modelo nulo y compara la estadística observada con las simuladas."
      },
      {
        "id": "analisis-de-datos/scipy/remuestreo/gaussian-kde",
        "label": "Estimación de densidad KDE",
        "description": "Estima una densidad continua suavizando observaciones con núcleos gaussianos."
      }
    ]
  },
  {
    "key": "comparaciones-multiples",
    "label": "Comparaciones múltiples",
    "children": [
      {
        "id": "analisis-de-datos/scipy/comparaciones-multiples/definicion",
        "label": "Definición",
        "description": "Cuando se realizan muchos contrastes aumenta el riesgo de descubrimientos falsos. Se deben definir las familias de pruebas y ajustar según el objetivo."
      },
      {
        "id": "analisis-de-datos/scipy/comparaciones-multiples/fdr",
        "label": "Benjamini-Hochberg y Benjamini-Yekutieli",
        "description": "BH controla FDR bajo independencia o ciertas dependencias positivas; BY lo hace bajo dependencias más generales, con mayor conservadurismo."
      },
      {
        "id": "analisis-de-datos/scipy/comparaciones-multiples/bonferroni",
        "label": "Bonferroni",
        "description": "Controla la probabilidad de al menos un falso positivo en una familia multiplicando p-values por el número de contrastes, con límite uno."
      },
      {
        "id": "analisis-de-datos/scipy/comparaciones-multiples/combine-pvalues",
        "label": "Combinar p-values",
        "description": "Combina evidencia de pruebas independientes sobre una hipótesis global, según los supuestos del método elegido."
      }
    ]
  },
  {
    "key": "contingencia",
    "label": "Tablas de contingencia y medidas de asociación",
    "children": [
      {
        "id": "analisis-de-datos/scipy/contingencia/definicion",
        "label": "Definición",
        "description": "Las tablas de contingencia cuentan combinaciones de categorías y permiten calcular asociación o comparar riesgos entre grupos."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/crosstab",
        "label": "Tabla cruzada",
        "description": "Cuenta cada combinación de valores de dos o más variables categóricas."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/expected-freq",
        "label": "Frecuencias esperadas",
        "description": "Calcula conteos esperados si las variables de una tabla fueran independientes."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/relative-risk",
        "label": "Riesgo relativo",
        "description": "Divide el riesgo del grupo expuesto entre el riesgo del control."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/odds-ratio",
        "label": "Odds ratio",
        "description": "Compara odds de éxito entre grupos; odds es p/(1-p)."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/cramer",
        "label": "V de Cramér",
        "description": "Mide intensidad de asociación entre categorías a partir del chi-cuadrado normalizado."
      },
      {
        "id": "analisis-de-datos/scipy/contingencia/tschuprow",
        "label": "Coeficiente de Tschuprow",
        "description": "Normaliza chi-cuadrado considerando dimensiones de la tabla."
      }
    ]
  },
  {
    "key": "ab-testing",
    "label": "A/B testing y decisiones de negocio",
    "children": [
      {
        "id": "analisis-de-datos/scipy/ab-testing/definicion",
        "label": "Definición",
        "description": "Un experimento A/B compara variantes asignadas de forma aleatoria. Debe definir unidad experimental, métrica, efecto mínimo y criterio de decisión antes del análisis."
      },
      {
        "id": "analisis-de-datos/scipy/ab-testing/lift",
        "label": "Métricas de conversión y lift",
        "description": "El cambio absoluto resta tasas; el lift relativo divide el cambio por la tasa de control."
      },
      {
        "id": "analisis-de-datos/scipy/ab-testing/ab-proporciones",
        "label": "Contrastar conversiones A/B",
        "description": "Una tabla 2x2 permite contrastar igualdad de proporciones de grupos independientes."
      },
      {
        "id": "analisis-de-datos/scipy/ab-testing/ab-continuas",
        "label": "Comparar una métrica continua",
        "description": "Welch contrasta medias de grupos independientes; el intervalo de diferencia ayuda a evaluar el tamaño de efecto."
      },
      {
        "id": "analisis-de-datos/scipy/ab-testing/significancia-practica",
        "label": "Significancia práctica",
        "description": "Una diferencia estadísticamente detectable puede ser demasiado pequeña para justificar una decisión de negocio."
      },
      {
        "id": "analisis-de-datos/scipy/ab-testing/planificacion",
        "label": "Planificación y monitoreo",
        "description": "Define tamaño de muestra, duración y métricas antes de comenzar; mirar repetidamente un p-value y detener al alcanzar significancia aumenta falsos positivos."
      }
    ]
  },
  {
    "key": "optimizacion",
    "label": "Optimización numérica",
    "children": [
      {
        "id": "analisis-de-datos/scipy/optimizacion/definicion",
        "label": "Definición",
        "description": "Busca valores que minimizan una función objetivo o satisfacen restricciones. Para maximizar puede minimizarse el negativo de la función."
      },
      {
        "id": "analisis-de-datos/scipy/optimizacion/minimize",
        "label": "minimize",
        "description": "Minimiza una función escalar de una o más variables, con límites o restricciones según el método."
      },
      {
        "id": "analisis-de-datos/scipy/optimizacion/linprog",
        "label": "linprog",
        "description": "Resuelve optimización lineal con restricciones lineales y límites."
      },
      {
        "id": "analisis-de-datos/scipy/optimizacion/root",
        "label": "root",
        "description": "Busca raíces de una función o sistema, es decir, puntos donde su valor es cero."
      },
      {
        "id": "analisis-de-datos/scipy/optimizacion/curve-fit",
        "label": "curve_fit",
        "description": "Ajusta parámetros de una función a datos mediante mínimos cuadrados no lineales."
      },
      {
        "id": "analisis-de-datos/scipy/optimizacion/least-squares",
        "label": "least_squares",
        "description": "Minimiza suma de cuadrados de residuos; permite límites y pérdidas robustas."
      }
    ]
  },
  {
    "key": "interpolacion",
    "label": "Interpolación",
    "children": [
      {
        "id": "analisis-de-datos/scipy/interpolacion/definicion",
        "label": "Definición",
        "description": "Estima valores entre puntos conocidos usando una función construida a partir de ellos. No equivale a pronosticar fuera del dominio."
      },
      {
        "id": "analisis-de-datos/scipy/interpolacion/cubic-spline",
        "label": "CubicSpline",
        "description": "Construye polinomios cúbicos por tramos con continuidad de derivadas hasta orden dos."
      },
      {
        "id": "analisis-de-datos/scipy/interpolacion/pchip",
        "label": "PchipInterpolator",
        "description": "Interpola por tramos preservando la forma monótona de los datos cuando corresponde."
      },
      {
        "id": "analisis-de-datos/scipy/interpolacion/regular-grid",
        "label": "RegularGridInterpolator",
        "description": "Interpola valores sobre una cuadrícula rectilínea multidimensional."
      }
    ]
  },
  {
    "key": "algebra-lineal",
    "label": "Álgebra lineal",
    "children": [
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/definicion",
        "label": "Definición",
        "description": "Opera con matrices y vectores para resolver sistemas, descomponer matrices y estimar parámetros."
      },
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/solve",
        "label": "solve",
        "description": "Resuelve Ax=b para una matriz cuadrada no singular."
      },
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/inv-det",
        "label": "inv y det",
        "description": "inv obtiene la inversa de una matriz no singular; det calcula su determinante."
      },
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/eig",
        "label": "eig",
        "description": "Obtiene autovalores y autovectores de una matriz cuadrada."
      },
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/svd",
        "label": "SVD",
        "description": "Descompone una matriz como U @ diag(s) @ Vh."
      },
      {
        "id": "analisis-de-datos/scipy/algebra-lineal/lstsq",
        "label": "lstsq",
        "description": "Resuelve mínimos cuadrados para sistemas posiblemente sobredeterminados."
      }
    ]
  },
  {
    "key": "distancias",
    "label": "Distancias y búsqueda espacial",
    "children": [
      {
        "id": "analisis-de-datos/scipy/distancias/definicion",
        "label": "Definición",
        "description": "Las distancias cuantifican diferencia entre vectores; una métrica adecuada depende de escala, unidades y objetivo."
      },
      {
        "id": "analisis-de-datos/scipy/distancias/metricas",
        "label": "Euclidiana y Manhattan",
        "description": "Euclidiana mide distancia recta; Manhattan suma diferencias absolutas por dimensión."
      },
      {
        "id": "analisis-de-datos/scipy/distancias/cosine",
        "label": "Distancia coseno",
        "description": "Mide uno menos la similitud coseno, basada en orientación de vectores no nulos."
      },
      {
        "id": "analisis-de-datos/scipy/distancias/cdist-pdist",
        "label": "cdist y pdist",
        "description": "cdist calcula distancias entre dos conjuntos; pdist calcula pares dentro de un conjunto."
      },
      {
        "id": "analisis-de-datos/scipy/distancias/kdtree",
        "label": "KDTree",
        "description": "Organiza puntos para buscar vecinos cercanos de forma eficiente."
      }
    ]
  },
  {
    "key": "clustering",
    "label": "Clustering",
    "children": [
      {
        "id": "analisis-de-datos/scipy/clustering/definicion",
        "label": "Definición",
        "description": "Agrupa observaciones según similitud sin etiquetas previas. El resultado depende de las variables, escala, distancia y método."
      },
      {
        "id": "analisis-de-datos/scipy/clustering/linkage",
        "label": "linkage",
        "description": "Construye una jerarquía de fusiones de grupos."
      },
      {
        "id": "analisis-de-datos/scipy/clustering/dendrogram",
        "label": "Dendrograma",
        "description": "Representa la jerarquía de fusiones y sus alturas."
      },
      {
        "id": "analisis-de-datos/scipy/clustering/fcluster",
        "label": "fcluster",
        "description": "Corta una jerarquía en grupos planos según un criterio de distancia o número máximo de grupos."
      },
      {
        "id": "analisis-de-datos/scipy/clustering/kmeans",
        "label": "kmeans",
        "description": "Estima centroides que representan grupos de puntos; requiere elegir k o centroides iniciales."
      }
    ]
  },
  {
    "key": "sparse",
    "label": "Matrices dispersas",
    "children": [
      {
        "id": "analisis-de-datos/scipy/sparse/definicion",
        "label": "Definición",
        "description": "Almacenan únicamente elementos no nulos y metadatos de posición, útiles cuando casi todos los valores son cero."
      },
      {
        "id": "analisis-de-datos/scipy/sparse/csr",
        "label": "CSR",
        "description": "Formato comprimido por filas, eficiente para operaciones orientadas a filas y productos matriz-vector."
      },
      {
        "id": "analisis-de-datos/scipy/sparse/csc",
        "label": "CSC",
        "description": "Formato comprimido por columnas, adecuado para acceso por columnas."
      },
      {
        "id": "analisis-de-datos/scipy/sparse/coo",
        "label": "COO",
        "description": "Representa valores mediante coordenadas fila-columna y facilita construir matrices a partir de eventos."
      }
    ]
  },
  {
    "key": "signal",
    "label": "Procesamiento de señales",
    "children": [
      {
        "id": "analisis-de-datos/scipy/signal/definicion",
        "label": "Definición",
        "description": "Analiza secuencias medidas en el tiempo para suavizar ruido, detectar patrones o aplicar filtros."
      },
      {
        "id": "analisis-de-datos/scipy/signal/find-peaks",
        "label": "find_peaks",
        "description": "Encuentra máximos locales y permite filtrar por altura, prominencia y distancia."
      },
      {
        "id": "analisis-de-datos/scipy/signal/savgol-filter",
        "label": "Savitzky-Golay",
        "description": "Suaviza una serie mediante ajustes polinómicos locales."
      },
      {
        "id": "analisis-de-datos/scipy/signal/butter",
        "label": "Filtros Butterworth",
        "description": "Diseña filtros de frecuencia; las secciones de segundo orden permiten aplicación numéricamente estable."
      }
    ]
  },
  {
    "key": "fft",
    "label": "Transformadas de Fourier",
    "children": [
      {
        "id": "analisis-de-datos/scipy/fft/definicion",
        "label": "Definición",
        "description": "Descompone una señal en componentes de frecuencia. Es útil para identificar periodicidades en datos regularmente muestreados."
      },
      {
        "id": "analisis-de-datos/scipy/fft/fft-ifft",
        "label": "FFT e IFFT",
        "description": "fft transforma a frecuencia; ifft reconstruye la señal temporal a partir de coeficientes complejos."
      },
      {
        "id": "analisis-de-datos/scipy/fft/rfft",
        "label": "Espectro de señal real",
        "description": "rfft conserva las frecuencias no negativas de una señal real; rfftfreq proporciona sus etiquetas."
      }
    ]
  },
  {
    "key": "integracion",
    "label": "Integración y ecuaciones diferenciales",
    "children": [
      {
        "id": "analisis-de-datos/scipy/integracion/definicion",
        "label": "Definición",
        "description": "Aproxima áreas bajo curvas y soluciones de modelos dinámicos continuos."
      },
      {
        "id": "analisis-de-datos/scipy/integracion/quad",
        "label": "quad",
        "description": "Integra una función escalar entre límites y estima el error numérico."
      },
      {
        "id": "analisis-de-datos/scipy/integracion/trapezoid",
        "label": "trapezoid",
        "description": "Aproxima la integral de valores observados usando trapecios entre puntos."
      },
      {
        "id": "analisis-de-datos/scipy/integracion/solve-ivp",
        "label": "solve_ivp",
        "description": "Resuelve un problema de valor inicial para una ecuación diferencial ordinaria."
      }
    ]
  },
  {
    "key": "ndimage",
    "label": "Procesamiento multidimensional",
    "children": [
      {
        "id": "analisis-de-datos/scipy/ndimage/definicion",
        "label": "Definición",
        "description": "Aplica filtros y operaciones geométricas a arreglos multidimensionales, como imágenes o mapas de intensidad."
      },
      {
        "id": "analisis-de-datos/scipy/ndimage/gaussian-filter",
        "label": "gaussian_filter",
        "description": "Suaviza un arreglo con un núcleo gaussiano de desviación sigma."
      },
      {
        "id": "analisis-de-datos/scipy/ndimage/label",
        "label": "label",
        "description": "Etiqueta componentes conectados de elementos no nulos."
      }
    ]
  },
  {
    "key": "io",
    "label": "Archivos científicos",
    "children": [
      {
        "id": "analisis-de-datos/scipy/io/definicion",
        "label": "Definición",
        "description": "Lee y escribe formatos científicos, como MATLAB MAT y Matrix Market. Para CSV y Excel suelen usarse otras bibliotecas."
      },
      {
        "id": "analisis-de-datos/scipy/io/mat",
        "label": "MATLAB MAT",
        "description": "savemat escribe variables y loadmat recupera un diccionario de datos."
      },
      {
        "id": "analisis-de-datos/scipy/io/matrix-market",
        "label": "Matrix Market",
        "description": "mmwrite y mmread intercambian matrices densas o dispersas en formato Matrix Market."
      }
    ]
  },
  {
    "key": "special",
    "label": "Funciones matemáticas especiales",
    "children": [
      {
        "id": "analisis-de-datos/scipy/special/definicion",
        "label": "Definición",
        "description": "Incluye funciones matemáticas usadas en probabilidad, modelos numéricos y transformaciones."
      },
      {
        "id": "analisis-de-datos/scipy/special/expit-logit",
        "label": "expit y logit",
        "description": "expit transforma log-odds en probabilidad; logit es su inversa en (0,1)."
      },
      {
        "id": "analisis-de-datos/scipy/special/gamma",
        "label": "Gamma y log-gamma",
        "description": "Gamma extiende el factorial: gamma(n)=(n-1)! para enteros positivos. gammaln calcula log del valor absoluto de gamma."
      }
    ]
  },
  {
    "key": "constants",
    "label": "Constantes y conversiones",
    "children": [
      {
        "id": "analisis-de-datos/scipy/constants/definicion",
        "label": "Definición",
        "description": "Proporciona constantes matemáticas, físicas y factores de unidades definidos en SI."
      },
      {
        "id": "analisis-de-datos/scipy/constants/constantes-fisicas",
        "label": "Constantes físicas",
        "description": "Expone valores físicos y, para physical_constants, unidades e incertidumbres."
      },
      {
        "id": "analisis-de-datos/scipy/constants/conversion-unidades",
        "label": "Factores de conversión",
        "description": "Incluye factores para unidades como kilómetro, hora y milla."
      }
    ]
  },
  {
    "key": "odr",
    "label": "Regresión por distancia ortogonal",
    "children": [
      {
        "id": "analisis-de-datos/scipy/odr/definicion",
        "label": "Definición",
        "description": "ODR ajusta modelos considerando errores en las variables explicativas y de respuesta. Es un método especializado, distinto de mínimos cuadrados ordinarios."
      }
    ]
  }
];
