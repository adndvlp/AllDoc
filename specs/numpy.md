# NumPy

**Clave** `numpy`

**Área** Análisis de datos (propuesta de ubicación en AllDoc).

**Resumen** Biblioteca de Python para trabajar con arrays, cálculos vectorizados, estadística y operaciones numéricas reproducibles.

**Alcance** 31 grupos y 198 fichas. Fundamentos, manipulación, limpieza y análisis numérico para Data Analyst / Business Analyst Jr; ampliación en simulación, cálculo numérico, álgebra lineal, Fourier, polinomios y memoria. Los módulos especializados amplían el temario, no son requisitos universales de entrevistas junior. No pretende inventariar cada símbolo de la API de NumPy.

**Entorno** Python 3, NumPy 2.3.5. Instalación: `pip install numpy==2.3.5`. Las fichas de integración con pandas requieren además `pandas==2.2.3`. `np.strings`, `StringDType` y `np.trapezoid` requieren NumPy 2.x. Los ejemplos fueron ejecutados en esas versiones; el formato de impresión, algunos tipos por defecto, resultados aleatorios y pequeñas diferencias numéricas pueden depender del entorno. Los datos son ficticios.

## Datos compartidos

Ejecuta este bloque antes de probar una ficha. Cada ejemplo parte de estos datos recién inicializados, independientemente de las demás fichas. Los índices de arrays relacionados conservan la correspondencia entre observaciones. Las variables locales de cada ejemplo no requieren ejecutar ejemplos previos.

```python
import numpy as np

# Filas: sucursales Norte, Centro y Sur; columnas: T1, T2, T3 y T4.
sucursales = np.array(['Norte', 'Centro', 'Sur'])
ventas = np.array([[100, 150, 200, 250],
                   [150, 200, 250, 350],
                   [200, 200, 200, 150]], dtype=np.int64)

# Seis pedidos: la misma posición corresponde al mismo pedido en cada vector.
importes = np.array([100, 250, 150, 400, 300, 200], dtype=np.int64)
clientes = np.array([1, 2, 1, 3, 2, 3])
estados = np.array(['completed', 'cancelled', 'completed',
                    'completed', 'completed', 'cancelled'])
codigos = np.array([0, 1, 0, 2, 1, 2])  # 0=Norte, 1=Centro, 2=Sur
fechas = np.array(['2026-01-05', '2026-01-12', '2026-02-03',
                   '2026-02-10', '2026-03-02', '2026-03-09'], dtype='datetime64[D]')

# Tres productos: cantidades y precios unitarios alineados.
unidades = np.array([2, 5, 3])
precios = np.array([50, 20, 100])

# Seis meses consecutivos, de enero a junio.
serie = np.array([100, 120, 110, 160, 140, 200])

# Importes con datos faltantes e inválidos para ejemplos de limpieza.
faltantes = np.array([100., np.nan, 200., 300.])
invalidos = np.array([100., np.nan, np.inf, -np.inf, 300.])
```

Las matrices se muestran en el orden de sucursales y trimestres indicado; los vectores de pedidos están alineados por posición. Las salidas proceden de `print`, no de una representación de tabla de pandas salvo en su grupo específico.


## ndarray y fundamentos

**Clave** `ndarray-y-fundamentos`


### Definición

**Clave** `definicion`

**Definición** Un ndarray contiene elementos de un mismo dtype organizados en cero o más ejes. Se usa para operar sobre colecciones numéricas sin recorrerlas manualmente.

**Búsqueda** ndarray y fundamentos; comparar dos formas de multiplicar ventas; qué es y cómo se usa.

**Para recordar** Un array tiene forma, tipo y elementos; una lista de Python es una colección general.

#### Comparar dos formas de multiplicar ventas

```python
print([10, 20] * 2)
print(np.array([10, 20]) * 2)
```

La primera línea repite los elementos; la segunda multiplica los importes por dos.

**Resultado**

```text
[10, 20, 10, 20]
[20 40]
```


### ndarray y listas

**Clave** `ndarray-y-listas`

**Definición** np.array convierte una colección en un ndarray. Los operadores aritméticos de NumPy actúan elemento a elemento, a diferencia de los de una lista de Python.

**Búsqueda** ndarray y listas; comparar dos formas de multiplicar ventas.

**Para recordar** Multiplicar una lista la repite; multiplicar un array escala sus elementos.

#### Comparar dos formas de multiplicar ventas

```python
print([10, 20] * 2)
print(np.array([10, 20]) * 2)
```

La primera línea repite los elementos; la segunda multiplica los importes por dos.

**Resultado**

```text
[10, 20, 10, 20]
[20 40]
```


### np.array y np.asarray

**Clave** `np-array-y-np-asarray`

**Definición** array crea un array y normalmente copia; asarray evita copiar si la entrada ya es compatible.

**Búsqueda** np.array y np.asarray; convertir ventas existentes.

**Para recordar** asarray no garantiza independencia de memoria.

#### Convertir ventas existentes

```python
a = np.array([100, 200])
b = np.asarray(a)
print(b)
print(b is a)
```

`b is a` confirma que en este caso asarray devolvió el mismo objeto.

**Resultado**

```text
[100 200]
True
```


### shape, ndim y size

**Clave** `shape-ndim-y-size`

**Definición** shape da el tamaño de cada eje, ndim cuenta ejes y size cuenta elementos totales.

**Búsqueda** shape, ndim y size; inspeccionar la matriz de ventas.

**Para recordar** Una matriz de 3 filas y 4 columnas tiene shape (3, 4) y size 12.

#### Inspeccionar la matriz de ventas

```python
print(ventas.shape, ventas.ndim, ventas.size)
```

La matriz compartida tiene tres sucursales y cuatro trimestres: dos ejes y doce elementos.

**Resultado**

```text
(3, 4) 2 12
```


### dtype, itemsize y nbytes

**Clave** `dtype-itemsize-y-nbytes`

**Definición** dtype identifica el tipo, itemsize los bytes por elemento y nbytes los bytes del buffer de elementos.

**Búsqueda** dtype, itemsize y nbytes; medir espacio de ventas.

**Para recordar** nbytes no incluye toda la sobrecarga de Python ni objetos referenciados.

#### Medir espacio de ventas

```python
print(ventas.dtype, ventas.itemsize, ventas.nbytes)
```

Los doce elementos int64 ocupan ocho bytes cada uno: 96 bytes en el buffer.

**Resultado**

```text
int64 8 96
```


### Escalares y arrays 0D

**Clave** `escalares-y-arrays-0d`

**Definición** Un escalar de NumPy tiene un tipo numérico propio; un array 0D tiene shape (). item extrae el valor Python.

**Búsqueda** Escalares y arrays 0D; extraer un único importe.

**Para recordar** Un array 0D tiene un elemento pero ningún eje.

#### Extraer un único importe

```python
a = np.array(200)
print(a.shape, a.ndim, a.item(), type(a.item()).__name__)
```

Un array 0D tiene un elemento pero ningún eje.

**Resultado**

```text
() 0 200 int
```


## Creación de arrays

**Clave** `creacion-de-arrays`


### Definición

**Clave** `definicion`

**Definición** Las funciones de creación construyen datos a partir de listas, dimensiones, constantes o intervalos.

**Búsqueda** Creación de arrays; crear números de trimestre; qué es y cómo se usa.

**Para recordar** Elige la función según necesites valores concretos, una forma o una secuencia.

#### Crear números de trimestre

```python
print(np.arange(1, 5))
```

El intervalo empieza en 1 y se detiene antes de 5.

**Resultado**

```text
[1 2 3 4]
```


### arange

**Clave** `arange`

**Definición** Genera una secuencia con paso fijo, excluyendo el límite final.

**Búsqueda** arange; crear números de trimestre.

**Para recordar** arange se parece a range; con pasos flotantes puede haber imprecisión.

#### Crear números de trimestre

```python
print(np.arange(1, 5))
```

El intervalo empieza en 1 y se detiene antes de 5.

**Resultado**

```text
[1 2 3 4]
```


### linspace

**Clave** `linspace`

**Definición** Genera una cantidad fija de puntos equidistantes entre dos extremos.

**Búsqueda** linspace; crear cinco tasas de descuento.

**Para recordar** El tercer argumento es el número de puntos, no el paso; incluye el final por defecto.

#### Crear cinco tasas de descuento

```python
print(np.linspace(0, 0.2, 5))
```

El tercer argumento es el número de puntos, no el paso; incluye el final por defecto.

**Resultado**

```text
[0.   0.05 0.1  0.15 0.2 ]
```


### zeros, ones y full

**Clave** `zeros-ones-y-full`

**Definición** Crean arrays llenos de cero, uno o un valor elegido.

**Búsqueda** zeros, ones y full; inicializar previsiones.

**Para recordar** La forma se indica con un entero o una tupla.

#### Inicializar previsiones

```python
print(np.zeros((2, 3), dtype=int))
print(np.ones(3, dtype=int))
print(np.full(3, 150))
```

La forma se indica con un entero o una tupla.

**Resultado**

```text
[[0 0 0]
 [0 0 0]]
[1 1 1]
[150 150 150]
```


### empty

**Clave** `empty`

**Definición** Reserva memoria sin inicializar sus valores.

**Búsqueda** empty; reservar y completar importes.

**Para recordar** No leas empty antes de llenar todos los elementos.

#### Reservar y completar importes

```python
a = np.empty(3, dtype=int)
a[:] = [100, 200, 300]
print(a)
```

No leas empty antes de llenar todos los elementos.

**Resultado**

```text
[100 200 300]
```


### eye e identity

**Clave** `eye-e-identity`

**Definición** Crean matrices con unos en una diagonal y ceros fuera de ella.

**Búsqueda** eye e identity; crear una matriz identidad.

**Para recordar** eye permite una matriz rectangular o desplazar la diagonal; identity es cuadrada.

#### Crear una matriz identidad

```python
print(np.eye(3, dtype=int))
print(np.eye(2, 3, k=1, dtype=int))
print(np.identity(2, dtype=int))
```

eye permite una matriz rectangular o desplazar la diagonal; identity es cuadrada.

**Resultado**

```text
[[1 0 0]
 [0 1 0]
 [0 0 1]]
[[0 1 0]
 [0 0 1]]
[[1 0]
 [0 1]]
```


### Funciones like

**Clave** `funciones-like`

**Definición** zeros_like, ones_like y full_like reutilizan la forma y normalmente el dtype de otro array.

**Búsqueda** Funciones like; inicializar una previsión del mismo tamaño.

**Para recordar** Indica dtype si el valor nuevo requiere otro tipo.

#### Inicializar una previsión del mismo tamaño

```python
print(np.full_like(ventas, 50))
```

Indica dtype si el valor nuevo requiere otro tipo.

**Resultado**

```text
[[50 50 50 50]
 [50 50 50 50]
 [50 50 50 50]]
```


## Tipos de datos

**Clave** `tipos-de-datos`


### Definición

**Clave** `definicion`

**Definición** dtype determina representación, rango y operaciones de los elementos. Un ndarray ordinario no almacena un tipo independiente por celda.

**Búsqueda** Tipos de datos; inspeccionar tres tipos; qué es y cómo se usa.

**Para recordar** Elige el tipo según el dato y el rango que necesitas.

#### Inspeccionar tres tipos

```python
print(np.array([1, 2], dtype=np.int64).dtype)
print(np.array([1.5, 2.5], dtype=np.float64).dtype)
print(np.array([True, False]).dtype)
```

Elige el tipo según el dato y el rango que necesitas.

**Resultado**

```text
int64
float64
bool
```


### Enteros, flotantes y booleanos

**Clave** `enteros-flotantes-y-booleanos`

**Definición** Los enteros representan cantidades discretas, los float aproximan números reales y bool representa condiciones.

**Búsqueda** Enteros, flotantes y booleanos; inspeccionar tres tipos.

**Para recordar** int64 y float64 usan 8 bytes; bool usa 1.

#### Inspeccionar tres tipos

```python
print(np.array([1, 2], dtype=np.int64).dtype)
print(np.array([1.5, 2.5], dtype=np.float64).dtype)
print(np.array([True, False]).dtype)
```

int64 y float64 usan 8 bytes; bool usa 1.

**Resultado**

```text
int64
float64
bool
```


### Texto, object y números complejos

**Clave** `texto-object-y-numeros-complejos`

**Definición** Los arrays pueden almacenar cadenas, objetos Python o complejos. object pierde muchas ventajas de la representación numérica homogénea.

**Búsqueda** Texto, object y números complejos; comparar tres representaciones.

**Para recordar** No mezcles textos y números en una matriz destinada al cálculo.

#### Comparar tres representaciones

```python
print(np.array(['Norte', 'Sur']).dtype.kind)
print(np.array([1, 'Sur'], dtype=object))
print(np.array([1 + 2j]).dtype.kind)
```

No mezcles textos y números en una matriz destinada al cálculo.

**Resultado**

```text
U
[1 'Sur']
c
```


### astype

**Clave** `astype`

**Definición** Convierte los elementos a otro dtype y por defecto crea una copia.

**Búsqueda** astype; convertir unidades estimadas.

**Para recordar** Convertir float a int trunca hacia cero, no redondea.

#### Convertir unidades estimadas

```python
print(np.array([2.9, -2.9]).astype(int))
```

Convertir float a int trunca hacia cero, no redondea.

**Resultado**

```text
[ 2 -2]
```


### Promoción de tipos

**Clave** `promocion-de-tipos`

**Definición** Al combinar dtypes NumPy elige un tipo común según sus reglas de promoción. result_type permite consultarlo.

**Búsqueda** Promoción de tipos; combinar enteros con decimales.

**Para recordar** No supongas que toda mezcla conserva el dtype original; NumPy 2 cambió reglas para escalares Python.

#### Combinar enteros con decimales

```python
a = np.array([1, 2], dtype=np.int32)
b = np.array([0.5, 1.5], dtype=np.float64)
print(np.result_type(a, b))
print(a + b)
```

No supongas que toda mezcla conserva el dtype original; NumPy 2 cambió reglas para escalares Python.

**Resultado**

```text
float64
[1.5 3.5]
```


### Rango de tipos

**Clave** `rango-de-tipos`

**Definición** iinfo describe los límites de enteros y finfo la precisión y rango de flotantes.

**Búsqueda** Rango de tipos; consultar límites numéricos.

**Para recordar** Antes de reducir bytes, comprueba que los valores caben.

#### Consultar límites numéricos

```python
print(np.iinfo(np.int8).min, np.iinfo(np.int8).max)
print(np.finfo(np.float64).eps)
```

Antes de reducir bytes, comprueba que los valores caben.

**Resultado**

```text
-128 127
2.220446049250313e-16
```


## Indexación y slicing

**Clave** `indexacion-y-slicing`


### Definición

**Clave** `definicion`

**Definición** La indexación selecciona elementos por posición; slicing selecciona intervalos. Los índices empiezan en cero.

**Búsqueda** Indexación y slicing; obtener ventas de los extremos; qué es y cómo se usa.

**Para recordar** a[fila, columna] accede a una matriz por sus ejes.

#### Obtener ventas de los extremos

```python
print(importes[0], importes[-1])
```

a[fila, columna] accede a una matriz por sus ejes.

**Resultado**

```text
100 200
```


### Índices positivos y negativos

**Clave** `indices-positivos-y-negativos`

**Definición** Los índices positivos cuentan desde cero y los negativos desde el final.

**Búsqueda** Índices positivos y negativos; obtener ventas de los extremos.

**Para recordar** -1 selecciona el último elemento.

#### Obtener ventas de los extremos

```python
print(importes[0], importes[-1])
```

-1 selecciona el último elemento.

**Resultado**

```text
100 200
```


### Slicing start:stop:step

**Clave** `slicing-start-stop-step`

**Definición** Un slice selecciona desde start hasta antes de stop, con el paso indicado.

**Búsqueda** Slicing start:stop:step; seleccionar meses y saltar posiciones.

**Para recordar** El extremo stop queda excluido; omitirlo llega al final.

#### Seleccionar meses y saltar posiciones

```python
print(importes[1:4])
print(importes[::2])
print(importes[::-1])
```

El extremo stop queda excluido; omitirlo llega al final.

**Resultado**

```text
[250 150 400]
[100 150 300]
[200 300 400 150 250 100]
```


### Filas y columnas

**Clave** `filas-y-columnas`

**Definición** En dos dimensiones, el primer índice selecciona filas y el segundo columnas.

**Búsqueda** Filas y columnas; ver una sucursal y un trimestre.

**Para recordar** Los dos puntos conservan todo el eje correspondiente.

#### Ver una sucursal y un trimestre

```python
print(ventas[1, :])
print(ventas[:, 2])
print(ventas[0, 1])
```

Los dos puntos conservan todo el eje correspondiente.

**Resultado**

```text
[150 200 250 350]
[200 250 200]
150
```


### Slicing multidimensional

**Clave** `slicing-multidimensional`

**Definición** Combina slices por eje para extraer una región rectangular.

**Búsqueda** Slicing multidimensional; seleccionar dos sucursales y dos trimestres.

**Para recordar** Seleccionar 0:2 en filas y 1:3 en columnas produce un bloque de 2 × 2.

#### Seleccionar dos sucursales y dos trimestres

```python
print(ventas[:2, 1:3])
```

Seleccionar 0:2 en filas y 1:3 en columnas produce un bloque de 2 × 2.

**Resultado**

```text
[[150 200]
 [200 250]]
```


### Ellipsis

**Clave** `ellipsis`

**Definición** Los tres puntos sustituyen los ejes intermedios no indicados.

**Búsqueda** Ellipsis; consultar el último trimestre.

**Para recordar** a[..., -1] elige el último elemento del último eje.

#### Consultar el último trimestre

```python
print(ventas[..., -1])
```

a[..., -1] elige el último elemento del último eje.

**Resultado**

```text
[250 350 150]
```


### Fancy indexing

**Clave** `fancy-indexing`

**Definición** Un array o lista de índices enteros selecciona posiciones concretas y puede repetirlas.

**Búsqueda** Fancy indexing; reordenar sucursales.

**Para recordar** La indexación avanzada devuelve una copia, no una vista.

#### Reordenar sucursales

```python
print(ventas[[2, 0, 2]])
```

La indexación avanzada devuelve una copia, no una vista.

**Resultado**

```text
[[200 200 200 150]
 [100 150 200 250]
 [200 200 200 150]]
```


### Índices emparejados e ix_

**Clave** `indices-emparejados-e-ix`

**Definición** Dos arrays de índices seleccionan pares de posiciones; ix_ construye el producto cartesiano de índices.

**Búsqueda** Índices emparejados e ix_; comparar selección emparejada y rectangular.

**Para recordar** No confundas pares fila-columna con una submatriz de todas las combinaciones.

#### Comparar selección emparejada y rectangular

```python
print(ventas[[0, 2], [1, 3]])
print(ventas[np.ix_([0, 2], [1, 3])])
```

No confundas pares fila-columna con una submatriz de todas las combinaciones.

**Resultado**

```text
[150 150]
[[150 250]
 [200 150]]
```


## Comparaciones y máscaras

**Clave** `comparaciones-y-mascaras`


### Definición

**Clave** `definicion`

**Definición** Las comparaciones elemento a elemento producen arrays booleanos. Una máscara selecciona los elementos donde la condición es True.

**Búsqueda** Comparaciones y máscaras; detectar importes superiores a 200; qué es y cómo se usa.

**Para recordar** La máscara debe tener una forma compatible con el eje seleccionado.

#### Detectar importes superiores a 200

```python
print(importes > 200)
print(np.equal(importes, 200))
print(np.less(importes, 200))
print(np.greater(importes, 200))
```

La máscara debe tener una forma compatible con el eje seleccionado.

**Resultado**

```text
[False  True False  True  True False]
[False False False False False  True]
[ True False  True False False False]
[False  True False  True  True False]
```


### Comparaciones y ufuncs lógicas

**Clave** `comparaciones-y-ufuncs-logicas`

**Definición** Los operadores ==, !=, >, >=, <, <= y funciones equal, greater o less comparan valores.

**Búsqueda** Comparaciones y ufuncs lógicas; detectar importes superiores a 200.

**Para recordar** La respuesta es un array de True y False, no un único booleano.

#### Detectar importes superiores a 200

```python
print(importes > 200)
print(np.equal(importes, 200))
print(np.less(importes, 200))
print(np.greater(importes, 200))
```

La respuesta es un array de True y False, no un único booleano.

**Resultado**

```text
[False  True False  True  True False]
[False False False False False  True]
[ True False  True False False False]
[False  True False  True  True False]
```


### Boolean indexing

**Clave** `boolean-indexing`

**Definición** a[mascara] devuelve los elementos que cumplen una condición.

**Búsqueda** Boolean indexing; filtrar ventas superiores a 200.

**Para recordar** El resultado de seleccionar por máscara es una copia.

#### Filtrar ventas superiores a 200

```python
print(importes[importes > 200])
```

La comparación genera una máscara y los corchetes conservan únicamente los valores que la cumplen.

**Resultado**

```text
[250 400 300]
```


### AND, OR y NOT

**Clave** `and-or-y-not`

**Definición** &, | y ~ combinan máscaras elemento a elemento; logical_and, logical_or y logical_not son sus equivalentes booleanos.

**Búsqueda** AND, OR y NOT; filtrar importes en un intervalo.

**Para recordar** Usa paréntesis alrededor de las comparaciones; no uses and/or con arrays de varios elementos.

#### Filtrar importes en un intervalo

```python
m = (importes >= 150) & (importes <= 300)
print(importes[m])
print(importes[(importes < 150) | (importes > 300)])
print(importes[~m])
print(np.array_equal(m, np.logical_and(importes >= 150, importes <= 300)))
print(np.logical_or(importes < 150, importes > 300))
print(np.logical_not(m))
```

Usa paréntesis alrededor de las comparaciones; no uses and/or con arrays de varios elementos.

**Resultado**

```text
[250 150 300 200]
[100 400]
[100 400]
True
[ True False False  True False False]
[ True False False  True False False]
```


### Máscaras de filas

**Clave** `mascaras-de-filas`

**Definición** Una máscara unidimensional aplicada a una matriz selecciona filas enteras.

**Búsqueda** Máscaras de filas; filtrar sucursales por primer trimestre.

**Para recordar** Construye la condición con una columna si quieres mantener las demás.

#### Filtrar sucursales por primer trimestre

```python
print(ventas[ventas[:, 0] >= 150])
```

Construye la condición con una columna si quieres mantener las demás.

**Resultado**

```text
[[150 200 250 350]
 [200 200 200 150]]
```


### any y all

**Clave** `any-y-all`

**Definición** any comprueba si al menos un elemento es verdadero; all si todos son verdaderos.

**Búsqueda** any y all; comprobar objetivos por sucursal.

**Para recordar** Ambas aceptan axis para comprobar grupos.

#### Comprobar objetivos por sucursal

```python
print(np.any(ventas >= 300, axis=1))
print(np.all(ventas >= 100, axis=1))
```

Ambas aceptan axis para comprobar grupos.

**Resultado**

```text
[False  True False]
[ True  True  True]
```


### isclose y allclose

**Clave** `isclose-y-allclose`

**Definición** Comparan números flotantes con tolerancia; allclose resume si todos los pares son cercanos.

**Búsqueda** isclose y allclose; comparar dos totales flotantes.

**Para recordar** Para decimales calculados evita depender siempre de ==.

#### Comparar dos totales flotantes

```python
print(0.1 + 0.2 == 0.3)
print(np.isclose(0.1 + 0.2, 0.3))
print(np.allclose([0.1 + 0.2, 1.0], [0.3, 1.0]))
```

Para decimales calculados evita depender siempre de ==.

**Resultado**

```text
False
True
True
```


### array_equal

**Clave** `array-equal`

**Definición** Comprueba igualdad de forma y elementos entre arrays, con opción equal_nan.

**Búsqueda** array_equal; validar que dos reportes coincidan.

**Para recordar** No confundir con ==, que devuelve una máscara y permite broadcasting.

#### Validar que dos reportes coincidan

```python
print(np.array_equal([1, 2], [1, 2]))
print(np.array_equal([1, 2], [[1, 2]]))
```

No confundir con ==, que devuelve una máscara y permite broadcasting.

**Resultado**

```text
True
False
```


## Operaciones vectorizadas

**Clave** `operaciones-vectorizadas`


### Definición

**Clave** `definicion`

**Definición** NumPy aplica operaciones a arrays completos mediante funciones universales y operadores. Evita ciclos Python cuando la operación se puede expresar sobre los elementos.

**Búsqueda** Operaciones vectorizadas; calcular importes, diferencias y descuentos; qué es y cómo se usa.

**Para recordar** Por defecto las operaciones aritméticas son elemento a elemento.

#### Calcular importes, diferencias y descuentos

```python
print(unidades * precios)
print(np.add(unidades, 1))
print(np.subtract(precios, 5))
print(np.divide(precios, 2))
print(unidades // 3, unidades % 3, unidades ** 2)
print(np.multiply(unidades, precios))
```

Por defecto las operaciones aritméticas son elemento a elemento.

**Resultado**

```text
[100 100 300]
[3 6 4]
[45 15 95]
[25. 10. 50.]
[0 1 1] [2 2 0] [ 4 25  9]
[100 100 300]
```


### Aritmética básica

**Clave** `aritmetica-basica`

**Definición** +, -, *, /, //, %, ** calculan sobre cada elemento; add, subtract, multiply y divide ofrecen las mismas operaciones básicas.

**Búsqueda** Aritmética básica; calcular importes, diferencias y descuentos.

**Para recordar** * multiplica elementos; @ multiplica matrices.

#### Calcular importes, diferencias y descuentos

```python
print(unidades * precios)
print(np.add(unidades, 1))
print(np.subtract(precios, 5))
print(np.divide(precios, 2))
print(unidades // 3, unidades % 3, unidades ** 2)
print(np.multiply(unidades, precios))
```

* multiplica elementos; @ multiplica matrices.

**Resultado**

```text
[100 100 300]
[3 6 4]
[45 15 95]
[25. 10. 50.]
[0 1 1] [2 2 0] [ 4 25  9]
[100 100 300]
```


### Funciones matemáticas

**Clave** `funciones-matematicas`

**Definición** sqrt, exp, log y log10 calculan raíces, exponenciales y logaritmos elemento a elemento.

**Búsqueda** Funciones matemáticas; transformar importes y escalas.

**Para recordar** log es el logaritmo natural; para datos reales requiere entradas positivas para resultados finitos.

#### Transformar importes y escalas

```python
print(np.sqrt([1, 4, 9]))
print(np.exp([0, 1]).round(4))
print(np.log([1, np.e]).round(4))
print(np.log10([10, 100]))
```

log es el logaritmo natural; para datos reales requiere entradas positivas para resultados finitos.

**Resultado**

```text
[1. 2. 3.]
[1.     2.7183]
[0. 1.]
[1. 2.]
```


### Redondeo y valor absoluto

**Clave** `redondeo-y-valor-absoluto`

**Definición** round, floor, ceil, trunc y abs transforman valores numéricos.

**Búsqueda** Redondeo y valor absoluto; redondear ajustes positivos y negativos.

**Para recordar** floor baja al entero, ceil sube y trunc corta hacia cero; round usa empate al par para mitades exactas.

#### Redondear ajustes positivos y negativos

```python
a = np.array([2.5, 3.5, -2.7])
print(np.round(a))
print(np.floor(a))
print(np.ceil(a))
print(np.trunc(a))
print(np.abs(a))
```

floor baja al entero, ceil sube y trunc corta hacia cero; round usa empate al par para mitades exactas.

**Resultado**

```text
[ 2.  4. -3.]
[ 2.  3. -3.]
[ 3.  4. -2.]
[ 2.  3. -2.]
[2.5 3.5 2.7]
```


### Trigonometría y complejos

**Clave** `trigonometria-y-complejos`

**Definición** sin, cos y tan reciben radianes; deg2rad convierte grados. real, imag y conj operan sobre complejos.

**Búsqueda** Trigonometría y complejos; calcular una fase y su conjugado.

**Para recordar** Los ángulos no se expresan en grados directamente en sin y cos.

#### Calcular una fase y su conjugado

```python
print(np.sin(np.deg2rad([0, 90])).round(4))
print(np.cos([0, np.pi]).round(4))
print(np.conj([1 + 2j]))
```

Los ángulos no se expresan en grados directamente en sin y cos.

**Resultado**

```text
[0. 1.]
[ 1. -1.]
[1.-2.j]
```


### Vectorización frente a ciclos

**Clave** `vectorizacion-frente-a-ciclos`

**Definición** Una expresión de array aplica la operación en código de NumPy. np.vectorize es una comodidad para funciones Python, no una garantía de rapidez.

**Búsqueda** Vectorización frente a ciclos; comparar una transformación de precios.

**Para recordar** Evita confundir vectorize con una ufunc nativa.

#### Comparar una transformación de precios

```python
print([p * 0.9 for p in precios])
print(precios * 0.9)
```

Evita confundir vectorize con una ufunc nativa.

**Resultado**

```text
[np.float64(45.0), np.float64(18.0), np.float64(90.0)]
[45. 18. 90.]
```


## Broadcasting

**Clave** `broadcasting`


### Definición

**Clave** `definicion`

**Definición** Broadcasting permite operar con formas diferentes alineando sus ejes desde la derecha. Cada par debe ser igual o tener tamaño 1, o faltar un eje.

**Búsqueda** Broadcasting; aplicar un impuesto uniforme; qué es y cómo se usa.

**Para recordar** Comprueba las formas antes de sumar o multiplicar arrays.

#### Aplicar un impuesto uniforme

```python
print((importes * 1.1).round(2))
```

Comprueba las formas antes de sumar o multiplicar arrays.

**Resultado**

```text
[110. 275. 165. 440. 330. 220.]
```


### Escalar con array

**Clave** `escalar-con-array`

**Definición** Un escalar se aplica a todos los elementos de un array sin replicarlo manualmente.

**Búsqueda** Escalar con array; aplicar un impuesto uniforme.

**Para recordar** No hace falta construir un array de constantes.

#### Aplicar un impuesto uniforme

```python
print((importes * 1.1).round(2))
```

No hace falta construir un array de constantes.

**Resultado**

```text
[110. 275. 165. 440. 330. 220.]
```


### Vector con matriz

**Clave** `vector-con-matriz`

**Definición** Un vector de longitud igual a las columnas se combina con cada fila de la matriz.

**Búsqueda** Vector con matriz; ajustar ventas por trimestre.

**Para recordar** Se comparan formas desde el último eje.

#### Ajustar ventas por trimestre

```python
print(ventas + np.array([10, 20, 30, 40]))
```

Se comparan formas desde el último eje.

**Resultado**

```text
[[110 170 230 290]
 [160 220 280 390]
 [210 220 230 190]]
```


### Vector columna

**Clave** `vector-columna`

**Definición** Una forma (n, 1) permite aplicar un valor por fila a una matriz (n, m).

**Búsqueda** Vector columna; aplicar un factor distinto por sucursal.

**Para recordar** None o np.newaxis añade un eje de longitud uno.

#### Aplicar un factor distinto por sucursal

```python
factores = np.array([1, 2, 3])
print(ventas * factores[:, None])
```

None o np.newaxis añade un eje de longitud uno.

**Resultado**

```text
[[100 150 200 250]
 [300 400 500 700]
 [600 600 600 450]]
```


### Compatibilidad y errores

**Clave** `compatibilidad-y-errores`

**Definición** Formas incompatibles no pueden difundirse entre sí. broadcast_shapes comprueba las formas sin calcular los datos.

**Búsqueda** Compatibilidad y errores; comprobar formas compatibles e incompatibles.

**Para recordar** Si las dimensiones enfrentadas son diferentes y ninguna vale 1, la operación falla.

#### Comprobar formas compatibles e incompatibles

```python
print(np.broadcast_shapes((3, 4), (4,)))
try:
    np.broadcast_shapes((3, 4), (3,))
except ValueError:
    print('ValueError: formas incompatibles')
```

Si las dimensiones enfrentadas son diferentes y ninguna vale 1, la operación falla.

**Resultado**

```text
(3, 4)
ValueError: formas incompatibles
```


### broadcast_to

**Clave** `broadcast-to`

**Definición** Expande lógicamente un array hasta una forma compatible sin copiar sus datos.

**Búsqueda** broadcast_to; repetir una previsión de forma lógica.

**Para recordar** broadcast_to devuelve una vista de solo lectura; copia si necesitas modificarla.

#### Repetir una previsión de forma lógica

```python
a = np.broadcast_to([100, 200], (3, 2))
print(a)
print(a.flags.writeable)
```

broadcast_to devuelve una vista de solo lectura; copia si necesitas modificarla.

**Resultado**

```text
[[100 200]
 [100 200]
 [100 200]]
False
```


## Dimensiones y ejes

**Clave** `dimensiones-y-ejes`


### Definición

**Clave** `definicion`

**Definición** Cada dimensión tiene un eje numerado desde cero. Las operaciones pueden recorrer todo el array o reducir un eje concreto.

**Búsqueda** Dimensiones y ejes; obtener totales globales y por dimensión; qué es y cómo se usa.

**Para recordar** axis indica el eje sobre el que se opera, no necesariamente el que queda.

#### Obtener totales globales y por dimensión

```python
print(np.sum(ventas))
print(np.sum(ventas, axis=0))
print(np.sum(ventas, axis=1))
```

Las tres líneas muestran el total general, los totales por trimestre y los totales por sucursal, respectivamente.

**Resultado**

```text
2400
[450 550 650 750]
[700 950 750]
```


### axis=None, axis=0 y axis=1

**Clave** `axis-none-axis-0-y-axis-1`

**Definición** Sin axis se reducen todos los elementos. En una matriz axis=0 reduce filas y axis=1 reduce columnas.

**Búsqueda** axis=None, axis=0 y axis=1; obtener totales globales y por dimensión.

**Para recordar** axis=0 da un resultado por columna; axis=1 da uno por fila.

#### Obtener totales globales y por dimensión

```python
print(np.sum(ventas))
print(np.sum(ventas, axis=0))
print(np.sum(ventas, axis=1))
```

Las tres líneas muestran el total general, los totales por trimestre y los totales por sucursal, respectivamente.

**Resultado**

```text
2400
[450 550 650 750]
[700 950 750]
```


### keepdims

**Clave** `keepdims`

**Definición** Conserva los ejes reducidos con longitud uno, lo que ayuda a operaciones posteriores con broadcasting.

**Búsqueda** keepdims; calcular participación de cada trimestre en su sucursal.

**Para recordar** keepdims=True no conserva todos los elementos, solo el número de dimensiones.

#### Calcular participación de cada trimestre en su sucursal

```python
totales = ventas.sum(axis=1, keepdims=True)
print(totales.shape)
print((ventas / totales).round(3))
```

keepdims=True no conserva todos los elementos, solo el número de dimensiones.

**Resultado**

```text
(3, 1)
[[0.143 0.214 0.286 0.357]
 [0.158 0.211 0.263 0.368]
 [0.267 0.267 0.267 0.2  ]]
```


### reshape

**Clave** `reshape`

**Definición** Cambia la forma sin cambiar el número de elementos. -1 infiere el tamaño de un eje.

**Búsqueda** reshape; distribuir 12 periodos en tres filas.

**Para recordar** reshape puede devolver una vista o una copia según la disposición.

#### Distribuir 12 periodos en tres filas

```python
print(np.arange(1, 13).reshape(3, -1))
```

reshape puede devolver una vista o una copia según la disposición.

**Resultado**

```text
[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
```


### flatten y ravel

**Clave** `flatten-y-ravel`

**Definición** Ambas producen un array 1D. flatten siempre copia; ravel intenta usar una vista.

**Búsqueda** flatten y ravel; aplanar ventas.

**Para recordar** Si necesitas independencia de memoria, usa flatten o copy.

#### Aplanar ventas

```python
print(ventas.flatten())
print(np.shares_memory(ventas, ventas.ravel()))
```

Si necesitas independencia de memoria, usa flatten o copy.

**Resultado**

```text
[100 150 200 250 150 200 250 350 200 200 200 150]
True
```


### expand_dims, newaxis y squeeze

**Clave** `expand-dims-newaxis-y-squeeze`

**Definición** expand_dims o newaxis añaden un eje unitario; squeeze quita ejes de tamaño uno.

**Búsqueda** expand_dims, newaxis y squeeze; transformar un vector en columna y recuperarlo.

**Para recordar** squeeze no elimina ejes con más de un elemento.

#### Transformar un vector en columna y recuperarlo

```python
a = np.expand_dims(importes, axis=1)
print(a.shape, importes[:, None].shape, a.squeeze().shape)
```

squeeze no elimina ejes con más de un elemento.

**Resultado**

```text
(6, 1) (6, 1) (6,)
```


### Transposición y swapaxes

**Clave** `transposicion-y-swapaxes`

**Definición** T y transpose permutan ejes; swapaxes intercambia dos ejes concretos.

**Búsqueda** Transposición y swapaxes; intercambiar trimestres y sucursales.

**Para recordar** T en un vector 1D no cambia su forma.

#### Intercambiar trimestres y sucursales

```python
print(ventas.T)
print(np.transpose(ventas).shape, np.swapaxes(ventas, 0, 1).shape)
```

T en un vector 1D no cambia su forma.

**Resultado**

```text
[[100 150 200]
 [150 200 200]
 [200 250 200]
 [250 350 150]]
(4, 3) (4, 3)
```


### resize

**Clave** `resize`

**Definición** np.resize crea una forma nueva repitiendo datos si es necesario; el método ndarray.resize cambia el propio array y rellena con ceros al ampliar.

**Búsqueda** resize; comparar dos formas de ampliar un array.

**Para recordar** resize no es reshape; evita repetir datos accidentalmente.

#### Comparar dos formas de ampliar un array

```python
a = np.array([1, 2, 3])
print(np.resize(a, 5))
a.resize(5)
print(a)
```

resize no es reshape; evita repetir datos accidentalmente.

**Resultado**

```text
[1 2 3 1 2]
[1 2 3 0 0]
```


### moveaxis

**Clave** `moveaxis`

**Definición** Mueve ejes a nuevas posiciones manteniendo el orden relativo de los demás.

**Búsqueda** moveaxis; pasar el último eje al comienzo.

**Para recordar** Es útil para reorganizar dimensiones sin reordenar manualmente cada eje.

#### Pasar el último eje al comienzo

```python
a = np.zeros((2, 3, 4))
print(np.moveaxis(a, -1, 0).shape)
```

Es útil para reorganizar dimensiones sin reordenar manualmente cada eje.

**Resultado**

```text
(4, 2, 3)
```


## Copias, vistas y memoria

**Clave** `copias-vistas-y-memoria`


### Definición

**Clave** `definicion`

**Definición** Una vista comparte datos con otro array; una copia posee datos independientes. Esta diferencia afecta modificaciones y rendimiento.

**Búsqueda** Copias, vistas y memoria; modificar una selección compartida; qué es y cómo se usa.

**Para recordar** Asignar b = a no copia; comprueba memoria compartida cuando sea importante.

#### Modificar una selección compartida

```python
a = importes.copy()
b = a[:2]
b[0] = 999
print(a)
```

Cambiar b[0] modifica también a[0], porque el slice comparte la memoria de a.

**Resultado**

```text
[999 250 150 400 300 200]
```


### Slicing y vista

**Clave** `slicing-y-vista`

**Definición** El slicing básico de un ndarray suele crear una vista; los cambios sobre la vista afectan los datos originales.

**Búsqueda** Slicing y vista; modificar una selección compartida.

**Para recordar** Usa copy antes de modificar una selección que debe ser independiente.

#### Modificar una selección compartida

```python
a = importes.copy()
b = a[:2]
b[0] = 999
print(a)
```

Cambiar b[0] modifica también a[0], porque el slice comparte la memoria de a.

**Resultado**

```text
[999 250 150 400 300 200]
```


### copy y view

**Clave** `copy-y-view`

**Definición** copy copia los datos; view crea otra representación del mismo buffer de datos.

**Búsqueda** copy y view; comparar copia y vista.

**Para recordar** Una vista no es una copia de seguridad; con dtype object la copia es superficial respecto a objetos internos.

#### Comparar copia y vista

```python
a = np.array([1, 2])
b = a.copy()
c = a.view()
c[0] = 9
print(a, b, c)
```

El cambio realizado en c aparece en a, pero b conserva los valores iniciales.

**Resultado**

```text
[9 2] [1 2] [9 2]
```


### shares_memory e indexación avanzada

**Clave** `shares-memory-e-indexacion-avanzada`

**Definición** shares_memory comprueba si dos arrays comparten memoria; la indexación avanzada normalmente copia.

**Búsqueda** shares_memory e indexación avanzada; comprobar una vista y una selección de índices.

**Para recordar** No basta mirar si dos arrays contienen los mismos valores.

#### Comprobar una vista y una selección de índices

```python
print(np.shares_memory(ventas, ventas[:, :2]))
print(np.shares_memory(ventas, ventas[[0, 2]]))
```

No basta mirar si dos arrays contienen los mismos valores.

**Resultado**

```text
True
False
```


### strides y orden C/F

**Clave** `strides-y-orden-c-f`

**Definición** strides indica los bytes que se avanzan al cambiar un índice en cada eje. C ordena contiguamente por filas y F por columnas.

**Búsqueda** strides y orden C/F; inspeccionar disposición de la matriz.

**Para recordar** La transposición puede cambiar contigüidad sin mover los datos.

#### Inspeccionar disposición de la matriz

```python
print(ventas.strides, ventas.flags.c_contiguous)
print(ventas.T.strides, ventas.T.flags.f_contiguous)
print(np.asfortranarray(ventas).flags.f_contiguous)
```

La transposición puede cambiar contigüidad sin mover los datos.

**Resultado**

```text
(32, 8) True
(8, 32) True
True
```


### Operaciones in-place y out

**Clave** `operaciones-in-place-y-out`

**Definición** Operadores como += modifican el array existente; algunas ufuncs aceptan out para escribir en un buffer elegido.

**Búsqueda** Operaciones in-place y out; actualizar importes sin crear otro array de salida.

**Para recordar** El dtype de destino debe permitir el resultado; las vistas también ven cambios in-place.

#### Actualizar importes sin crear otro array de salida

```python
a = importes.copy()
a += 10
np.multiply(a, 2, out=a)
print(a)
```

El dtype de destino debe permitir el resultado; las vistas también ven cambios in-place.

**Resultado**

```text
[220 520 320 820 620 420]
```


## Agregaciones

**Clave** `agregaciones`


### Definición

**Clave** `definicion`

**Definición** Las agregaciones resumen varios elementos en un valor o en valores por eje.

**Búsqueda** Agregaciones; calcular totales y crecimiento compuesto; qué es y cómo se usa.

**Para recordar** A diferencia de una transformación vectorizada, una reducción suele disminuir dimensiones.

#### Calcular totales y crecimiento compuesto

```python
print(np.sum(importes))
print(np.prod([1.1, 1.2]).round(3))
```

A diferencia de una transformación vectorizada, una reducción suele disminuir dimensiones.

**Resultado**

```text
1400
1.32
```


### sum y prod

**Clave** `sum-y-prod`

**Definición** sum suma elementos y prod multiplica elementos.

**Búsqueda** sum y prod; calcular totales y crecimiento compuesto.

**Para recordar** Ambas aceptan axis y dtype para controlar reducción y acumulación.

#### Calcular totales y crecimiento compuesto

```python
print(np.sum(importes))
print(np.prod([1.1, 1.2]).round(3))
```

Ambas aceptan axis y dtype para controlar reducción y acumulación.

**Resultado**

```text
1400
1.32
```


### mean y average

**Clave** `mean-y-average`

**Definición** mean obtiene la media aritmética; average permite pesos explícitos.

**Búsqueda** mean y average; calcular ticket promedio y precio ponderado.

**Para recordar** El promedio ponderado divide la suma de valores por pesos entre la suma de pesos.

#### Calcular ticket promedio y precio ponderado

```python
print(np.mean(importes))
print(np.average(precios, weights=unidades).round(2))
```

El ticket promedio da el mismo peso a cada pedido; el precio ponderado da más peso a los productos con más unidades.

**Resultado**

```text
233.33333333333334
50.0
```


### min, max y ptp

**Clave** `min-max-y-ptp`

**Definición** min y max devuelven extremos; ptp calcula máximo menos mínimo.

**Búsqueda** min, max y ptp; medir extremos de importes.

**Para recordar** ptp es amplitud, no varianza ni desviación estándar.

#### Medir extremos de importes

```python
print(np.min(importes), np.max(importes), np.ptp(importes))
```

ptp es amplitud, no varianza ni desviación estándar.

**Resultado**

```text
100 400 300
```


### count_nonzero

**Clave** `count-nonzero`

**Definición** Cuenta elementos distintos de cero, o True cuando recibe una máscara.

**Búsqueda** count_nonzero; contar ventas que superan el objetivo.

**Para recordar** size cuenta todos los elementos; count_nonzero solo los verdaderos o no cero.

#### Contar ventas que superan el objetivo

```python
print(np.count_nonzero(importes > 200))
print(np.count_nonzero(ventas >= 200, axis=1))
```

size cuenta todos los elementos; count_nonzero solo los verdaderos o no cero.

**Resultado**

```text
3
[2 3 3]
```


### argmin y argmax

**Clave** `argmin-y-argmax`

**Definición** Devuelven el índice de la primera aparición de un mínimo o máximo, no el valor.

**Búsqueda** argmin y argmax; identificar la sucursal del mejor primer trimestre.

**Para recordar** Con axis=None el índice corresponde al array aplanado.

#### Identificar la sucursal del mejor primer trimestre

```python
i = np.argmax(ventas[:, 0])
print(i, sucursales[i])
print(np.argmin(importes))
```

Con axis=None el índice corresponde al array aplanado.

**Resultado**

```text
2 Sur
0
```


## Estadística descriptiva

**Clave** `estadistica-descriptiva`


### Definición

**Clave** `definicion`

**Definición** Las funciones estadísticas resumen centro, dispersión y distribución de observaciones.

**Búsqueda** Estadística descriptiva; comparar media y mediana de tickets; qué es y cómo se usa.

**Para recordar** Distingue media, mediana, cuantiles y medidas de dispersión.

#### Comparar media y mediana de tickets

```python
a = np.array([100, 110, 120, 130, 1000])
print(np.mean(a), np.median(a))
```

El importe de 1000 eleva la media a 292, mientras que el valor central permanece en 120.

**Resultado**

```text
292.0 120.0
```


### median

**Clave** `median`

**Definición** La mediana es el valor central ordenado; con un número par de datos promedia los dos centrales.

**Búsqueda** median; comparar media y mediana de tickets.

**Para recordar** Suele ser menos sensible a valores extremos que mean.

#### Comparar media y mediana de tickets

```python
a = np.array([100, 110, 120, 130, 1000])
print(np.mean(a), np.median(a))
```

El importe de 1000 eleva la media a 292, mientras que el valor central permanece en 120.

**Resultado**

```text
292.0 120.0
```


### std, var y ddof

**Clave** `std-var-y-ddof`

**Definición** var calcula varianza y std su raíz. ddof=0 divide entre N; ddof=1 divide entre N-1.

**Búsqueda** std, var y ddof; comparar dispersión poblacional y muestral.

**Para recordar** Usa ddof=1 para la varianza muestral convencional; la desviación resultante no es un estimador insesgado exacto.

#### Comparar dispersión poblacional y muestral

```python
a = np.array([10, 20, 30])
print(np.var(a).round(2), np.std(a).round(2))
print(np.var(a, ddof=1), np.std(a, ddof=1))
```

Usa ddof=1 para la varianza muestral convencional; la desviación resultante no es un estimador insesgado exacto.

**Resultado**

```text
66.67 8.16
100.0 10.0
```


### percentile y quantile

**Clave** `percentile-y-quantile`

**Definición** percentile expresa el punto de corte de 0 a 100 y quantile de 0 a 1. method controla la interpolación.

**Búsqueda** percentile y quantile; obtener cuartiles y percentil 90.

**Para recordar** El percentil 50 equivale a la mediana con el método lineal por defecto.

#### Obtener cuartiles y percentil 90

```python
print(np.percentile(importes, [25, 50, 75, 90]))
print(np.quantile(importes, [0.25, 0.5, 0.75]))
```

El percentil 50 equivale a la mediana con el método lineal por defecto.

**Resultado**

```text
[162.5 225.  287.5 350. ]
[162.5 225.  287.5]
```


### Covarianza y corrcoef

**Clave** `covarianza-y-corrcoef`

**Definición** cov calcula covarianza; corrcoef normaliza esa relación como correlación de Pearson.

**Búsqueda** Covarianza y corrcoef; medir relación lineal entre inversión e ingresos.

**Para recordar** Correlación no implica causalidad; una variable constante hace indefinida la correlación.

#### Medir relación lineal entre inversión e ingresos

```python
x = [1, 2, 3]
y = [2, 4, 6]
print(np.cov(x, y))
print(np.corrcoef(x, y))
```

Correlación no implica causalidad; una variable constante hace indefinida la correlación.

**Resultado**

```text
[[1. 2.]
 [2. 4.]]
[[1. 1.]
 [1. 1.]]
```


### histogram

**Clave** `histogram`

**Definición** Cuenta observaciones dentro de intervalos y devuelve conteos y bordes.

**Búsqueda** histogram; distribuir tickets por rango.

**Para recordar** Los intervalos son cerrados a la izquierda y abiertos a la derecha salvo el último, que incluye el extremo derecho.

#### Distribuir tickets por rango

```python
cuentas, bordes = np.histogram(importes, bins=[0, 200, 400, 600])
print(cuentas, bordes)
```

Los intervalos son cerrados a la izquierda y abiertos a la derecha salvo el último, que incluye el extremo derecho.

**Resultado**

```text
[2 3 1] [  0 200 400 600]
```


### digitize

**Clave** `digitize`

**Definición** Devuelve el índice del intervalo al que pertenece cada valor.

**Búsqueda** digitize; asignar segmentos de importe.

**Para recordar** Con right=False y bordes crecientes, usa bordes izquierdos incluidos; puede devolver 0 o len(bins).

#### Asignar segmentos de importe

```python
print(np.digitize(importes, bins=[150, 300]))
```

Con right=False y bordes crecientes, usa bordes izquierdos incluidos; puede devolver 0 o len(bins).

**Resultado**

```text
[0 1 1 2 2 1]
```


## Nulos, infinitos y datos inválidos

**Clave** `nulos-infinitos-y-datos-invalidos`


### Definición

**Clave** `definicion`

**Definición** NaN representa un valor flotante indefinido o faltante; inf representa infinito. NumPy dispone de máscaras y reducciones específicas para tratarlos.

**Búsqueda** Nulos, infinitos y datos inválidos; identificar valores problemáticos; qué es y cómo se usa.

**Para recordar** NaN no se detecta comparando con ==.

#### Identificar valores problemáticos

```python
print(np.isnan(invalidos))
print(np.isinf(invalidos))
print(np.isfinite(invalidos))
```

Las tres máscaras distinguen valores faltantes, infinitos y observaciones numéricas finitas.

**Resultado**

```text
[False  True False False False]
[False False  True  True False]
[ True False False False  True]
```


### isnan, isinf e isfinite

**Clave** `isnan-isinf-e-isfinite`

**Definición** isnan detecta NaN, isinf detecta infinitos e isfinite detecta números finitos.

**Búsqueda** isnan, isinf e isfinite; identificar valores problemáticos.

**Para recordar** Un NaN no es cero ni infinito.

#### Identificar valores problemáticos

```python
print(np.isnan(invalidos))
print(np.isinf(invalidos))
print(np.isfinite(invalidos))
```

Las tres máscaras distinguen valores faltantes, infinitos y observaciones numéricas finitas.

**Resultado**

```text
[False  True False False False]
[False False  True  True False]
[ True False False False  True]
```


### nan_to_num

**Clave** `nan-to-num`

**Definición** Sustituye NaN e infinitos por valores elegidos. Por defecto los infinitos se reemplazan por extremos finitos del dtype.

**Búsqueda** nan_to_num; limpiar un conjunto de importes.

**Para recordar** Es una sustitución, no una imputación estadística; decide el valor según el negocio.

#### Limpiar un conjunto de importes

```python
print(np.nan_to_num(invalidos, nan=0, posinf=0, neginf=0))
```

Es una sustitución, no una imputación estadística; decide el valor según el negocio.

**Resultado**

```text
[100.   0.   0.   0. 300.]
```


### nansum, nanmean y nanmedian

**Clave** `nansum-nanmean-y-nanmedian`

**Definición** Estas reducciones ignoran NaN; no ignoran infinitos automáticamente.

**Búsqueda** nansum, nanmean y nanmedian; calcular métricas con un dato faltante.

**Para recordar** Un grupo con todo NaN devuelve NaN para nanmean, mientras nansum devuelve cero.

#### Calcular métricas con un dato faltante

```python
print(np.nansum(faltantes), np.nanmean(faltantes), np.nanmedian(faltantes))
```

Un grupo con todo NaN devuelve NaN para nanmean, mientras nansum devuelve cero.

**Resultado**

```text
600.0 200.0 200.0
```


### nanmin, nanmax, nanstd y nanvar

**Clave** `nanmin-nanmax-nanstd-y-nanvar`

**Definición** Calculan extremos y dispersión ignorando NaN.

**Búsqueda** nanmin, nanmax, nanstd y nanvar; resumir datos incompletos.

**Para recordar** No confundas ignorar nulos con sustituirlos por cero.

#### Resumir datos incompletos

```python
print(np.nanmin(faltantes), np.nanmax(faltantes))
print(np.nanstd(faltantes).round(2), np.nanvar(faltantes).round(2))
```

No confundas ignorar nulos con sustituirlos por cero.

**Resultado**

```text
100.0 300.0
81.65 6666.67
```


### nanpercentile y nanquantile

**Clave** `nanpercentile-y-nanquantile`

**Definición** Calculan puntos de corte ignorando NaN.

**Búsqueda** nanpercentile y nanquantile; calcular cuartiles con faltantes.

**Para recordar** Si no quedan datos válidos, no hay cuantil definido.

#### Calcular cuartiles con faltantes

```python
print(np.nanpercentile(faltantes, [25, 50, 75]))
print(np.nanquantile(faltantes, [0.25, 0.5, 0.75]))
```

Si no quedan datos válidos, no hay cuantil definido.

**Resultado**

```text
[150. 200. 250.]
[150. 200. 250.]
```


### Imputación

**Clave** `imputacion`

**Definición** Imputar consiste en reemplazar datos ausentes por una estimación razonada.

**Búsqueda** Imputación; rellenar nan con la media disponible.

**Para recordar** Conserva una máscara para distinguir los datos estimados de los observados.

#### Rellenar NaN con la media disponible

```python
a = faltantes.copy()
m = np.isnan(a)
a[m] = np.nanmean(a)
print(a, m)
```

Conserva una máscara para distinguir los datos estimados de los observados.

**Resultado**

```text
[100. 200. 200. 300.] [False  True False False]
```


## Condiciones y modificación de elementos

**Clave** `condiciones-y-modificacion-de-elementos`


### Definición

**Clave** `definicion`

**Definición** Las condiciones vectorizadas construyen valores distintos según reglas de negocio. La asignación indexada cambia elementos existentes.

**Búsqueda** Condiciones y modificación de elementos; etiquetar pedidos según importe; qué es y cómo se usa.

**Para recordar** Usa where o select para devolver valores; asignación con máscara para modificar.

#### Etiquetar pedidos según importe

```python
print(np.where(importes >= 300, 'Alto', 'Normal'))
```

Usa where o select para devolver valores; asignación con máscara para modificar.

**Resultado**

```text
['Normal' 'Normal' 'Normal' 'Alto' 'Alto' 'Normal']
```


### where

**Clave** `where`

**Definición** where(condición, verdadero, falso) elige un valor por elemento.

**Búsqueda** where; etiquetar pedidos según importe.

**Para recordar** Con un solo argumento where devuelve índices; con tres devuelve valores.

#### Etiquetar pedidos según importe

```python
print(np.where(importes >= 300, 'Alto', 'Normal'))
```

Con un solo argumento where devuelve índices; con tres devuelve valores.

**Resultado**

```text
['Normal' 'Normal' 'Normal' 'Alto' 'Alto' 'Normal']
```


### select

**Clave** `select`

**Definición** np.select aplica varias condiciones en orden y devuelve la opción de la primera verdadera.

**Búsqueda** select; crear tres segmentos de tickets.

**Para recordar** Ordena reglas de más específica a más general; default cubre el resto.

#### Crear tres segmentos de tickets

```python
print(np.select([importes >= 300, importes >= 150], ['Alto', 'Medio'], default='Bajo'))
```

Ordena reglas de más específica a más general; default cubre el resto.

**Resultado**

```text
['Bajo' 'Medio' 'Medio' 'Alto' 'Alto' 'Medio']
```


### clip

**Clave** `clip`

**Definición** Limita valores a un mínimo y máximo.

**Búsqueda** clip; limitar descuentos permitidos.

**Para recordar** clip no elimina filas; sustituye los valores fuera de límites.

#### Limitar descuentos permitidos

```python
print(np.clip([-5, 10, 45, 80], 0, 50))
```

clip no elimina filas; sustituye los valores fuera de límites.

**Resultado**

```text
[ 0 10 45 50]
```


### Asignación por índices y máscaras

**Clave** `asignacion-por-indices-y-mascaras`

**Definición** La asignación a a[índices] o a[máscara] modifica los elementos seleccionados.

**Búsqueda** Asignación por índices y máscaras; corregir importes bajos en una copia.

**Para recordar** Crea una copia si no quieres cambiar la fuente.

#### Corregir importes bajos en una copia

```python
a = importes.copy()
a[a < 150] = 150
print(a)
```

Crea una copia si no quieres cambiar la fuente.

**Resultado**

```text
[150 250 150 400 300 200]
```


### put, putmask y copyto

**Clave** `put-putmask-y-copyto`

**Definición** put escribe por índices aplanados; putmask modifica posiciones verdaderas; copyto copia con una máscara opcional.

**Búsqueda** put, putmask y copyto; aplicar ajustes puntuales.

**Para recordar** putmask y copyto modifican el destino, no devuelven un array nuevo.

#### Aplicar ajustes puntuales

```python
a = importes.copy()
np.put(a, [0], [99])
np.putmask(a, a < 150, 0)
np.copyto(a, 150, where=a == 0)
print(a)
```

putmask y copyto modifican el destino, no devuelven un array nuevo.

**Resultado**

```text
[150 250 150 400 300 200]
```


## Valores únicos y conjuntos

**Clave** `valores-unicos-y-conjuntos`


### Definición

**Clave** `definicion`

**Definición** NumPy puede obtener valores únicos, contar apariciones y comparar pertenencia entre colecciones.

**Búsqueda** Valores únicos y conjuntos; contar pedidos por estado; qué es y cómo se usa.

**Para recordar** Los conjuntos ignoran la multiplicidad; no sustituyen un join relacional.

#### Contar pedidos por estado

```python
valores, cuentas = np.unique(estados, return_counts=True)
print(valores, cuentas)
```

El primer array contiene los estados y el segundo sus frecuencias en el mismo orden.

**Resultado**

```text
['cancelled' 'completed'] [2 4]
```


### unique y return_counts

**Clave** `unique-y-return-counts`

**Definición** unique devuelve valores distintos, por defecto ordenados; return_counts devuelve además sus frecuencias.

**Búsqueda** unique y return_counts; contar pedidos por estado.

**Para recordar** Los conteos corresponden a los valores únicos en el mismo orden.

#### Contar pedidos por estado

```python
valores, cuentas = np.unique(estados, return_counts=True)
print(valores, cuentas)
```

El primer array contiene los estados y el segundo sus frecuencias en el mismo orden.

**Resultado**

```text
['cancelled' 'completed'] [2 4]
```


### return_inverse y return_index

**Clave** `return-inverse-y-return-index`

**Definición** return_inverse permite reconstruir el array original a partir de los únicos; return_index indica la primera posición de cada valor.

**Búsqueda** return_inverse y return_index; codificar y reconstruir categorías.

**Para recordar** Los índices devueltos se alinean con los valores únicos.

#### Codificar y reconstruir categorías

```python
u, idx, inv = np.unique(estados, return_index=True, return_inverse=True)
print(u, idx, inv)
print(u[inv])
```

Los índices devueltos se alinean con los valores únicos.

**Resultado**

```text
['cancelled' 'completed'] [1 0] [1 0 1 1 1 0]
['completed' 'cancelled' 'completed' 'completed' 'completed' 'cancelled']
```


### bincount

**Clave** `bincount`

**Definición** Cuenta apariciones de enteros no negativos y puede sumar pesos por código.

**Búsqueda** bincount; contar y sumar ventas por sucursal codificada.

**Para recordar** minlength asegura espacio para códigos que no aparecen.

#### Contar y sumar ventas por sucursal codificada

```python
print(np.bincount(codigos, minlength=3))
print(np.bincount(codigos, weights=importes, minlength=3))
```

minlength asegura espacio para códigos que no aparecen.

**Resultado**

```text
[2 2 2]
[250. 550. 600.]
```


### isin

**Clave** `isin`

**Definición** Comprueba si cada elemento aparece en una colección de referencia.

**Búsqueda** isin; filtrar pedidos de determinados clientes.

**Para recordar** Devuelve una máscara con la misma forma de la entrada.

#### Filtrar pedidos de determinados clientes

```python
print(importes[np.isin(clientes, [1, 3])])
```

Devuelve una máscara con la misma forma de la entrada.

**Resultado**

```text
[100 150 400 200]
```


### union1d e intersect1d

**Clave** `union1d-e-intersect1d`

**Definición** union1d reúne valores únicos; intersect1d conserva los valores compartidos.

**Búsqueda** union1d e intersect1d; comparar clientes de dos periodos.

**Para recordar** Los resultados se devuelven ordenados y sin duplicados.

#### Comparar clientes de dos periodos

```python
print(np.union1d([1, 2, 3], [2, 4]))
print(np.intersect1d([1, 2, 3], [2, 4]))
```

Los resultados se devuelven ordenados y sin duplicados.

**Resultado**

```text
[1 2 3 4]
[2]
```


### setdiff1d y setxor1d

**Clave** `setdiff1d-y-setxor1d`

**Definición** setdiff1d devuelve lo que está solo en el primer conjunto; setxor1d lo que está en uno u otro, pero no ambos.

**Búsqueda** setdiff1d y setxor1d; identificar clientes perdidos y exclusivos.

**Para recordar** La diferencia depende del orden de los argumentos.

#### Identificar clientes perdidos y exclusivos

```python
print(np.setdiff1d([1, 2, 3], [2, 4]))
print(np.setxor1d([1, 2, 3], [2, 4]))
```

La diferencia depende del orden de los argumentos.

**Resultado**

```text
[1 3]
[1 3 4]
```


## Ordenamiento, búsqueda y selección

**Clave** `ordenamiento-busqueda-y-seleccion`


### Definición

**Clave** `definicion`

**Definición** Las operaciones de ordenamiento devuelven valores o índices que permiten reorganizar otros arrays relacionados.

**Búsqueda** Ordenamiento, búsqueda y selección; ordenar tickets y sus clientes; qué es y cómo se usa.

**Para recordar** sort ordena valores; argsort devuelve posiciones.

#### Ordenar tickets y sus clientes

```python
i = np.argsort(importes, kind='stable')
print(np.sort(importes))
print(clientes[i])
```

sort ordena valores; argsort devuelve posiciones.

**Resultado**

```text
[100 150 200 250 300 400]
[1 1 3 2 2 3]
```


### sort y argsort

**Clave** `sort-y-argsort`

**Definición** np.sort devuelve una copia ordenada y argsort los índices que producirían ese orden.

**Búsqueda** sort y argsort; ordenar tickets y sus clientes.

**Para recordar** ndarray.sort modifica el array; para preservar relaciones aplica los mismos índices a todas las columnas.

#### Ordenar tickets y sus clientes

```python
i = np.argsort(importes, kind='stable')
print(np.sort(importes))
print(clientes[i])
```

ndarray.sort modifica el array; para preservar relaciones aplica los mismos índices a todas las columnas.

**Resultado**

```text
[100 150 200 250 300 400]
[1 1 3 2 2 3]
```


### Orden descendente y estabilidad

**Clave** `orden-descendente-y-estabilidad`

**Definición** Puedes invertir el orden ascendente o usar argsort de negativos en datos numéricos apropiados. stable conserva orden de empates.

**Búsqueda** Orden descendente y estabilidad; obtener importes de mayor a menor.

**Para recordar** Invertir un orden ascendente también invierte empates; para importes positivos usa argsort(-a, kind='stable').

#### Obtener importes de mayor a menor

```python
a = np.array([200, 300, 300, 100])
i = np.argsort(-a, kind='stable')
print(i)
print(a[i])
```

Invertir un orden ascendente también invierte empates; para importes positivos usa argsort(-a, kind='stable').

**Resultado**

```text
[1 2 0 3]
[300 300 200 100]
```


### lexsort

**Clave** `lexsort`

**Definición** Ordena por varias claves; la última clave de la tupla tiene prioridad.

**Búsqueda** lexsort; ordenar por cliente y después por importe descendente.

**Para recordar** Pasa primero la clave secundaria y al final la principal.

#### Ordenar por cliente y después por importe descendente

```python
i = np.lexsort((-importes, clientes))
print(np.column_stack((clientes[i], importes[i])))
```

Pasa primero la clave secundaria y al final la principal.

**Resultado**

```text
[[  1 150]
 [  1 100]
 [  2 300]
 [  2 250]
 [  3 400]
 [  3 200]]
```


### partition y argpartition

**Clave** `partition-y-argpartition`

**Definición** Colocan un elemento en su posición ordenada y separan menores y mayores sin ordenar completamente cada parte.

**Búsqueda** partition y argpartition; encontrar los tres mayores importes.

**Para recordar** Sirven para top-k; el bloque seleccionado no necesariamente está ordenado.

#### Encontrar los tres mayores importes

```python
k = 3
i = np.argpartition(importes, -k)[-k:]
print(np.sort(importes[i])[::-1])
print(np.sort(np.partition(importes, -k)[-k:]))
```

Sirven para top-k; el bloque seleccionado no necesariamente está ordenado.

**Resultado**

```text
[400 300 250]
[250 300 400]
```


### nonzero y argwhere

**Clave** `nonzero-y-argwhere`

**Definición** nonzero devuelve una tupla de arrays de índices por eje; argwhere devuelve una fila de coordenadas por coincidencia.

**Búsqueda** nonzero y argwhere; localizar ventas que superan 300.

**Para recordar** Usa nonzero para indexar; argwhere para inspeccionar coordenadas.

#### Localizar ventas que superan 300

```python
m = ventas > 300
print(np.nonzero(m))
print(np.argwhere(m))
```

Usa nonzero para indexar; argwhere para inspeccionar coordenadas.

**Resultado**

```text
(array([1]), array([3]))
[[1 3]]
```


### searchsorted

**Clave** `searchsorted`

**Definición** Devuelve posiciones donde insertar valores manteniendo el orden de un array ya ordenado.

**Búsqueda** searchsorted; ubicar un importe en una escala ordenada.

**Para recordar** side='left' elige antes de iguales y side='right' después de iguales.

#### Ubicar un importe en una escala ordenada

```python
a = np.array([100, 200, 200, 400])
print(np.searchsorted(a, [200, 350]))
print(np.searchsorted(a, 200, side='right'))
```

side='left' elige antes de iguales y side='right' después de iguales.

**Resultado**

```text
[1 3]
3
```


### take y take_along_axis

**Clave** `take-y-take-along-axis`

**Definición** take selecciona los mismos índices por un eje; take_along_axis permite índices diferentes en cada fila o sección.

**Búsqueda** take y take_along_axis; obtener los dos mejores trimestres por sucursal.

**Para recordar** take_along_axis es útil junto con argsort por eje.

#### Obtener los dos mejores trimestres por sucursal

```python
i = np.argsort(ventas, axis=1)[:, -2:]
print(np.take(ventas, [0, 2], axis=1))
print(np.take_along_axis(ventas, i, axis=1))
```

take_along_axis es útil junto con argsort por eje.

**Resultado**

```text
[[100 200]
 [150 250]
 [200 200]]
[[200 250]
 [250 350]
 [200 200]]
```


### extract y choose

**Clave** `extract-y-choose`

**Definición** extract selecciona valores con una condición aplanada; choose elige entre arrays según índices enteros.

**Búsqueda** extract y choose; extraer importes altos y traducir códigos.

**Para recordar** choose recibe códigos, no condiciones booleanas múltiples.

#### Extraer importes altos y traducir códigos

```python
print(np.extract(importes > 300, importes))
print(np.choose(codigos, ['Norte', 'Centro', 'Sur']))
```

choose recibe códigos, no condiciones booleanas múltiples.

**Resultado**

```text
[400]
['Norte' 'Centro' 'Norte' 'Sur' 'Centro' 'Sur']
```


## Combinar y dividir arrays

**Clave** `combinar-y-dividir-arrays`


### Definición

**Clave** `definicion`

**Definición** Concatenate une arrays por un eje existente; stack crea un eje nuevo. Split separa un array en partes.

**Búsqueda** Combinar y dividir arrays; unir dos periodos de ventas; qué es y cómo se usa.

**Para recordar** Comprueba que las dimensiones no combinadas sean compatibles.

#### Unir dos periodos de ventas

```python
print(np.concatenate([ventas[:, :2], ventas[:, 2:]], axis=1))
print(np.concatenate([[100, 200], [300]]))
```

Comprueba que las dimensiones no combinadas sean compatibles.

**Resultado**

```text
[[100 150 200 250]
 [150 200 250 350]
 [200 200 200 150]]
[100 200 300]
```


### concatenate

**Clave** `concatenate`

**Definición** Une arrays por un eje existente; axis=None aplana antes de unir.

**Búsqueda** concatenate; unir dos periodos de ventas.

**Para recordar** La forma debe coincidir en todos los ejes salvo el elegido.

#### Unir dos periodos de ventas

```python
print(np.concatenate([ventas[:, :2], ventas[:, 2:]], axis=1))
print(np.concatenate([[100, 200], [300]]))
```

La forma debe coincidir en todos los ejes salvo el elegido.

**Resultado**

```text
[[100 150 200 250]
 [150 200 250 350]
 [200 200 200 150]]
[100 200 300]
```


### stack

**Clave** `stack`

**Definición** Apila arrays de la misma forma introduciendo un eje nuevo.

**Búsqueda** stack; comparar dos escenarios de ventas.

**Para recordar** A diferencia de concatenate, aumenta ndim en uno.

#### Comparar dos escenarios de ventas

```python
a = np.stack([ventas, ventas + 10], axis=0)
print(a.shape)
print(a[1])
```

A diferencia de concatenate, aumenta ndim en uno.

**Resultado**

```text
(2, 3, 4)
[[110 160 210 260]
 [160 210 260 360]
 [210 210 210 160]]
```


### vstack, hstack y column_stack

**Clave** `vstack-hstack-y-column-stack`

**Definición** vstack apila por filas, hstack une horizontalmente según dimensiones y column_stack convierte vectores en columnas.

**Búsqueda** vstack, hstack y column_stack; combinar precios y cantidades.

**Para recordar** Para datos 1D, hstack concatena y column_stack crea una matriz.

#### Combinar precios y cantidades

```python
print(np.vstack([unidades, precios]))
print(np.hstack([unidades, precios]))
print(np.column_stack([unidades, precios]))
```

Para datos 1D, hstack concatena y column_stack crea una matriz.

**Resultado**

```text
[[  2   5   3]
 [ 50  20 100]]
[  2   5   3  50  20 100]
[[  2  50]
 [  5  20]
 [  3 100]]
```


### split y array_split

**Clave** `split-y-array-split`

**Definición** split divide en secciones iguales o por índices; array_split permite tamaños desiguales.

**Búsqueda** split y array_split; separar semestres y lotes de tamaños distintos.

**Para recordar** split falla si pides un número de partes iguales que no divide el eje.

#### Separar semestres y lotes de tamaños distintos

```python
print([a.tolist() for a in np.split(ventas, 2, axis=1)])
print([a.tolist() for a in np.array_split(importes, 4)])
```

split falla si pides un número de partes iguales que no divide el eje.

**Resultado**

```text
[[[100, 150], [150, 200], [200, 200]], [[200, 250], [250, 350], [200, 150]]]
[[100, 250], [150, 400], [300], [200]]
```


### hsplit y vsplit

**Clave** `hsplit-y-vsplit`

**Definición** hsplit divide una matriz horizontalmente por columnas; vsplit verticalmente por filas.

**Búsqueda** hsplit y vsplit; separar sucursales y trimestres.

**Para recordar** Son atajos para split con los ejes habituales de una matriz.

#### Separar sucursales y trimestres

```python
print([a.shape for a in np.hsplit(ventas, 2)])
print([a.shape for a in np.vsplit(ventas, 3)])
```

Son atajos para split con los ejes habituales de una matriz.

**Resultado**

```text
[(3, 2), (3, 2)]
[(1, 4), (1, 4), (1, 4)]
```


### append, insert y delete

**Clave** `append-insert-y-delete`

**Definición** Devuelven un nuevo array con elementos añadidos, insertados o eliminados.

**Búsqueda** append, insert y delete; modificar una serie sin alterar la fuente.

**Para recordar** No modifican el original; omitir axis en estas funciones puede aplanar los datos.

#### Modificar una serie sin alterar la fuente

```python
print(np.append(importes, 800))
print(np.insert(importes, 1, 50))
print(np.delete(importes, [0, 2]))
```

No modifican el original; omitir axis en estas funciones puede aplanar los datos.

**Resultado**

```text
[100 250 150 400 300 200 800]
[100  50 250 150 400 300 200]
[250 400 300 200]
```


### repeat y tile

**Clave** `repeat-y-tile`

**Definición** repeat repite cada elemento; tile repite un bloque completo.

**Búsqueda** repeat y tile; expandir dos escenarios de precios.

**Para recordar** Para cálculos suele ser preferible broadcasting a replicar grandes arrays.

#### Expandir dos escenarios de precios

```python
print(np.repeat([10, 20], 3))
print(np.tile([10, 20], 3))
```

Para cálculos suele ser preferible broadcasting a replicar grandes arrays.

**Resultado**

```text
[10 10 10 20 20 20]
[10 20 10 20 10 20]
```


## Ufuncs y operaciones avanzadas

**Clave** `ufuncs-y-operaciones-avanzadas`


### Definición

**Clave** `definicion`

**Definición** Una ufunc es una función universal con cálculo elemento a elemento, soporte de broadcasting y métodos de reducción cuando corresponde.

**Búsqueda** Ufuncs y operaciones avanzadas; calcular importes totales y acumulados; qué es y cómo se usa.

**Para recordar** No toda función np es una ufunc; sus métodos y argumentos pueden diferir.

#### Calcular importes totales y acumulados

```python
print(np.add.reduce(importes))
print(np.add.accumulate(importes))
```

reduce entrega un único total; accumulate mantiene un valor parcial por cada posición.

**Resultado**

```text
1400
[ 100  350  500  900 1200 1400]
```


### reduce y accumulate

**Clave** `reduce-y-accumulate`

**Definición** reduce combina valores de un eje hasta un resultado; accumulate conserva los resultados parciales.

**Búsqueda** reduce y accumulate; calcular importes totales y acumulados.

**Para recordar** add.reduce equivale a una suma; add.accumulate a una suma acumulada.

#### Calcular importes totales y acumulados

```python
print(np.add.reduce(importes))
print(np.add.accumulate(importes))
```

reduce entrega un único total; accumulate mantiene un valor parcial por cada posición.

**Resultado**

```text
1400
[ 100  350  500  900 1200 1400]
```


### outer

**Clave** `outer`

**Definición** El método outer de una ufunc combina cada elemento de un array con cada elemento del otro.

**Búsqueda** outer; simular ingresos con todos los precios y volúmenes.

**Para recordar** En vectores, el resultado tiene una fila por valor del primero y una columna por valor del segundo.

#### Simular ingresos con todos los precios y volúmenes

```python
print(np.multiply.outer([10, 20], [100, 200, 300]))
```

En vectores, el resultado tiene una fila por valor del primero y una columna por valor del segundo.

**Resultado**

```text
[[1000 2000 3000]
 [2000 4000 6000]]
```


### at

**Clave** `at`

**Definición** at actualiza posiciones in-place sin perder repeticiones de índices.

**Búsqueda** at; acumular importes por código de sucursal.

**Para recordar** a[idx] += valores puede no acumular índices repetidos como esperas; add.at sí lo hace.

#### Acumular importes por código de sucursal

```python
a = np.zeros(3)
np.add.at(a, codigos, importes)
print(a)
```

a[idx] += valores puede no acumular índices repetidos como esperas; add.at sí lo hace.

**Resultado**

```text
[250. 550. 600.]
```


### where y out en ufuncs

**Clave** `where-y-out-en-ufuncs`

**Definición** where indica posiciones donde calcular y out indica el destino del resultado.

**Búsqueda** where y out en ufuncs; dividir evitando divisiones entre cero.

**Para recordar** Si where es falso, out conserva sus valores; inicialízalo antes de usar la máscara.

#### Dividir evitando divisiones entre cero

```python
a = np.array([100, 200, 300])
b = np.array([2, 0, 3])
out = np.full(3, np.nan)
np.divide(a, b, out=out, where=b != 0)
print(out)
```

Si where es falso, out conserva sus valores; inicialízalo antes de usar la máscara.

**Resultado**

```text
[ 50.  nan 100.]
```


### apply_along_axis

**Clave** `apply-along-axis`

**Definición** Aplica una función 1D a cada sección de un eje de un array.

**Búsqueda** apply_along_axis; obtener amplitud de ventas por sucursal.

**Para recordar** Suele ser menos eficiente que una reducción vectorizada nativa; úsala para lógica específica.

#### Obtener amplitud de ventas por sucursal

```python
print(np.apply_along_axis(np.ptp, 1, ventas))
```

Suele ser menos eficiente que una reducción vectorizada nativa; úsala para lógica específica.

**Resultado**

```text
[150 200  50]
```


## Series, acumulados y ventanas

**Clave** `series-acumulados-y-ventanas`


### Definición

**Clave** `definicion`

**Definición** Los acumulados y las diferencias describen cambios en observaciones ordenadas. Las ventanas móviles calculan métricas sobre intervalos consecutivos.

**Búsqueda** Series, acumulados y ventanas; calcular ventas acumuladas y factores compuestos; qué es y cómo se usa.

**Para recordar** Ordena los datos temporalmente antes de calcular; NumPy no conoce por sí mismo las fechas.

#### Calcular ventas acumuladas y factores compuestos

```python
print(np.cumsum(importes))
print(np.cumprod([1.1, 1.2, 0.9]).round(3))
```

Cada posición incluye el valor actual y los anteriores; el producto usa factores en lugar de importes.

**Resultado**

```text
[ 100  350  500  900 1200 1400]
[1.1   1.32  1.188]
```


### cumsum y cumprod

**Clave** `cumsum-y-cumprod`

**Definición** cumsum suma progresivamente; cumprod multiplica progresivamente.

**Búsqueda** cumsum y cumprod; calcular ventas acumuladas y factores compuestos.

**Para recordar** Sin axis, estas funciones operan sobre la versión aplanada del array.

#### Calcular ventas acumuladas y factores compuestos

```python
print(np.cumsum(importes))
print(np.cumprod([1.1, 1.2, 0.9]).round(3))
```

Cada posición incluye el valor actual y los anteriores; el producto usa factores en lugar de importes.

**Resultado**

```text
[ 100  350  500  900 1200 1400]
[1.1   1.32  1.188]
```


### diff

**Clave** `diff`

**Definición** Calcula diferencias entre elementos consecutivos; n repite la operación.

**Búsqueda** diff; calcular cambios entre meses.

**Para recordar** El resultado tiene un elemento menos en el eje por cada diferencia, salvo que añadas prepend o append.

#### Calcular cambios entre meses

```python
print(np.diff(serie))
print(np.diff(serie, prepend=serie[0]))
```

diff resta cada mes del anterior en el sentido actual menos previo; prepend conserva la longitud con una diferencia inicial de cero.

**Resultado**

```text
[ 20 -10  50 -20  60]
[  0  20 -10  50 -20  60]
```


### Crecimiento y cambio porcentual

**Clave** `crecimiento-y-cambio-porcentual`

**Definición** El cambio relativo se obtiene dividiendo la diferencia por el valor anterior.

**Búsqueda** Crecimiento y cambio porcentual; calcular crecimiento mensual.

**Para recordar** Si el valor anterior es cero, el crecimiento relativo no está definido.

#### Calcular crecimiento mensual

```python
print((np.diff(serie) / serie[:-1] * 100).round(2))
```

serie[:-1] alinea cada diferencia con el valor del periodo inmediatamente anterior.

**Resultado**

```text
[ 20.    -8.33  45.45 -12.5   42.86]
```


### maximum.accumulate y minimum.accumulate

**Clave** `maximum-accumulate-y-minimum-accumulate`

**Definición** Conservan el máximo o mínimo observado hasta cada posición.

**Búsqueda** maximum.accumulate y minimum.accumulate; seguir máximos y mínimos históricos.

**Para recordar** No son máximos o mínimos de una ventana de tamaño fijo.

#### Seguir máximos y mínimos históricos

```python
print(np.maximum.accumulate(serie))
print(np.minimum.accumulate(serie))
```

No son máximos o mínimos de una ventana de tamaño fijo.

**Resultado**

```text
[100 120 120 160 160 200]
[100 100 100 100 100 100]
```


### convolve y media móvil

**Clave** `convolve-y-media-movil`

**Definición** convolve aplica un núcleo de pesos a una serie. Con pesos iguales y mode='valid' calcula promedios de ventanas completas.

**Búsqueda** convolve y media móvil; suavizar tres meses de ventas.

**Para recordar** valid evita resultados de bordes incompletos; un núcleo asimétrico se invierte en la convolución.

#### Suavizar tres meses de ventas

```python
print(np.convolve(serie, np.ones(3) / 3, mode='valid').round(2))
```

valid evita resultados de bordes incompletos; un núcleo asimétrico se invierte en la convolución.

**Resultado**

```text
[110.   130.   136.67 166.67]
```


### sliding_window_view

**Clave** `sliding-window-view`

**Definición** Crea vistas de todas las ventanas consecutivas de tamaño fijo.

**Búsqueda** sliding_window_view; observar ventanas de tres meses y sus medias.

**Para recordar** Las ventanas solapadas comparten memoria; la vista es de solo lectura por defecto.

#### Observar ventanas de tres meses y sus medias

```python
from numpy.lib.stride_tricks import sliding_window_view
w = sliding_window_view(serie, 3)
print(w)
print(w.mean(axis=1).round(2))
```

Las ventanas solapadas comparten memoria; la vista es de solo lectura por defecto.

**Resultado**

```text
[[100 120 110]
 [120 110 160]
 [110 160 140]
 [160 140 200]]
[110.   130.   136.67 166.67]
```


## Limpieza, escalado y métricas

**Clave** `limpieza-escalado-y-metricas`


### Definición

**Clave** `definicion`

**Definición** Las operaciones vectorizadas permiten transformar datos, detectar valores atípicos y calcular indicadores sin recorrer cada fila.

**Búsqueda** Limpieza, escalado y métricas; calcular participación por sucursal; qué es y cómo se usa.

**Para recordar** Define siempre el denominador, la política de nulos y la población que analizas.

#### Calcular participación por sucursal

```python
t = ventas.sum(axis=1)
print((t / t.sum() * 100).round(2))
```

Define siempre el denominador, la política de nulos y la población que analizas.

**Resultado**

```text
[29.17 39.58 31.25]
```


### Porcentajes y participación

**Clave** `porcentajes-y-participacion`

**Definición** Divide cada valor por el total y multiplica por 100 para expresar su participación.

**Búsqueda** Porcentajes y participación; calcular participación por sucursal.

**Para recordar** Si el total vale cero, el porcentaje no está definido.

#### Calcular participación por sucursal

```python
t = ventas.sum(axis=1)
print((t / t.sum() * 100).round(2))
```

Si el total vale cero, el porcentaje no está definido.

**Resultado**

```text
[29.17 39.58 31.25]
```


### Normalización min-max

**Clave** `normalizacion-min-max`

**Definición** Reescala datos con (x-min)/(max-min), normalmente al rango de cero a uno.

**Búsqueda** Normalización min-max; reescalar tickets.

**Para recordar** Una columna constante tiene rango cero y requiere una política específica.

#### Reescalar tickets

```python
a = importes.astype(float)
print(((a - a.min()) / np.ptp(a)).round(3))
```

El importe menor pasa a cero, el mayor a uno y los demás quedan entre esos extremos.

**Resultado**

```text
[0.    0.5   0.167 1.    0.667 0.333]
```


### Estandarización y z-score

**Clave** `estandarizacion-y-z-score`

**Definición** Un z-score expresa cuántas desviaciones estándar separan un valor de la media.

**Búsqueda** Estandarización y z-score; estandarizar los importes.

**Para recordar** Usa el mismo ddof y parámetros de referencia cuando compares conjuntos; si std=0, el z-score no está definido.

#### Estandarizar los importes

```python
z = (importes - importes.mean()) / importes.std()
print(z.round(3))
print(z.mean().round(8), z.std().round(8))
```

Usa el mismo ddof y parámetros de referencia cuando compares conjuntos; si std=0, el z-score no está definido.

**Resultado**

```text
[-1.352  0.169 -0.845  1.69   0.676 -0.338]
-0.0 1.0
```


### Outliers con IQR

**Clave** `outliers-con-iqr`

**Definición** El rango intercuartílico es Q3-Q1; una regla habitual marca valores fuera de Q1-1.5 IQR y Q3+1.5 IQR.

**Búsqueda** Outliers con IQR; marcar tickets extremos.

**Para recordar** Un valor atípico no es automáticamente un error; investiga su causa.

#### Marcar tickets extremos

```python
a = np.array([100, 110, 120, 130, 140, 1000])
q1, q3 = np.percentile(a, [25, 75])
iqr = q3 - q1
print(a[(a < q1 - 1.5 * iqr) | (a > q3 + 1.5 * iqr)])
```

Un valor atípico no es automáticamente un error; investiga su causa.

**Resultado**

```text
[1000]
```


### Outliers con z-score

**Clave** `outliers-con-z-score`

**Definición** Una regla basada en desviaciones estándar marca valores alejados de la media; el umbral es una decisión analítica.

**Búsqueda** Outliers con z-score; identificar valores alejados más de tres desviaciones.

**Para recordar** Funciona mejor con distribuciones apropiadas y puede ser sensible a los propios extremos.

#### Identificar valores alejados más de tres desviaciones

```python
a = np.array([100] * 15 + [1000])
z = (a - a.mean()) / a.std()
print(a[np.abs(z) > 3])
```

Funciona mejor con distribuciones apropiadas y puede ser sensible a los propios extremos.

**Resultado**

```text
[1000]
```


### Agrupar mediante códigos

**Clave** `agrupar-mediante-codigos`

**Definición** Combina unique con return_inverse y bincount para resumir categorías sin un ciclo explícito.

**Búsqueda** Agrupar mediante códigos; calcular ventas y ticket promedio por estado.

**Para recordar** Para tablas heterogéneas, joins o agrupaciones complejas suele convenir pandas.

#### Calcular ventas y ticket promedio por estado

```python
u, i = np.unique(estados, return_inverse=True)
t = np.bincount(i, weights=importes)
n = np.bincount(i)
print(u, t, n, (t / n).round(2))
```

Para tablas heterogéneas, joins o agrupaciones complejas suele convenir pandas.

**Resultado**

```text
['cancelled' 'completed'] [450. 950.] [2 4] [225.  237.5]
```


## Fechas y duraciones

**Clave** `fechas-y-duraciones`


### Definición

**Clave** `definicion`

**Definición** datetime64 representa fechas y horas con una unidad de resolución; timedelta64 representa duraciones.

**Búsqueda** Fechas y duraciones; convertir fechas a meses; qué es y cómo se usa.

**Para recordar** No confundas meses o años calendarios con una cantidad fija de días.

#### Convertir fechas a meses

```python
print(fechas)
print(fechas.astype('datetime64[M]'))
```

No confundas meses o años calendarios con una cantidad fija de días.

**Resultado**

```text
['2026-01-05' '2026-01-12' '2026-02-03' '2026-02-10' '2026-03-02'
 '2026-03-09']
['2026-01' '2026-01' '2026-02' '2026-02' '2026-03' '2026-03']
```


### datetime64 y unidades

**Clave** `datetime64-y-unidades`

**Definición** Un dtype datetime64 puede almacenar días, segundos u otras unidades; convertir a una unidad más gruesa descarta precisión.

**Búsqueda** datetime64 y unidades; convertir fechas a meses.

**Para recordar** Las fechas NumPy no almacenan zonas horarias como una fecha consciente de zona.

#### Convertir fechas a meses

```python
print(fechas)
print(fechas.astype('datetime64[M]'))
```

Las fechas NumPy no almacenan zonas horarias como una fecha consciente de zona.

**Resultado**

```text
['2026-01-05' '2026-01-12' '2026-02-03' '2026-02-10' '2026-03-02'
 '2026-03-09']
['2026-01' '2026-01' '2026-02' '2026-02' '2026-03' '2026-03']
```


### timedelta64 y diferencias

**Clave** `timedelta64-y-diferencias`

**Definición** Restar fechas compatibles produce duraciones; sumar una duración desplaza una fecha.

**Búsqueda** timedelta64 y diferencias; calcular días entre pedidos.

**Para recordar** Divide una duración en días entre np.timedelta64(1, 'D') para obtener su magnitud.

#### Calcular días entre pedidos

```python
print(np.diff(fechas))
print((fechas - fechas[0]) / np.timedelta64(1, 'D'))
print(fechas[0] + np.timedelta64(7, 'D'))
```

Divide una duración en días entre np.timedelta64(1, 'D') para obtener su magnitud.

**Resultado**

```text
[ 7 22  7 20  7]
[ 0.  7. 29. 36. 56. 63.]
2026-01-12
```


### NaT e isnat

**Clave** `nat-e-isnat`

**Definición** NaT representa una fecha o duración faltante. isnat crea una máscara de estos valores.

**Búsqueda** NaT e isnat; detectar fechas ausentes.

**Para recordar** Usa isnat, no una comparación con NaT mediante ==.

#### Detectar fechas ausentes

```python
d = np.array(['2026-01-01', 'NaT'], dtype='datetime64[D]')
print(np.isnat(d))
```

Usa isnat, no una comparación con NaT mediante ==.

**Resultado**

```text
[False  True]
```


### Agrupación por periodo

**Clave** `agrupacion-por-periodo`

**Definición** Convertir a datetime64[M] o datetime64[Y] permite identificar meses o años de observación.

**Búsqueda** Agrupación por periodo; contar pedidos por mes.

**Para recordar** La conversión conserva año y mes, evitando mezclar enero de distintos años.

#### Contar pedidos por mes

```python
print(np.unique(fechas.astype('datetime64[M]'), return_counts=True))
```

La conversión conserva año y mes, evitando mezclar enero de distintos años.

**Resultado**

```text
(array(['2026-01', '2026-02', '2026-03'], dtype='datetime64[M]'), array([2, 2, 2]))
```


### is_busday y busday_count

**Clave** `is-busday-y-busday-count`

**Definición** is_busday identifica días laborales y busday_count cuenta días hábiles entre dos fechas, excluyendo la final.

**Búsqueda** is_busday y busday_count; contar días hábiles de un periodo.

**Para recordar** Por defecto solo lunes a viernes; configura holidays para excluir festivos.

#### Contar días hábiles de un periodo

```python
print(np.is_busday(np.array(['2026-06-01', '2026-06-06'], dtype='datetime64[D]')))
print(np.busday_count('2026-06-01', '2026-06-08'))
```

Por defecto solo lunes a viernes; configura holidays para excluir festivos.

**Resultado**

```text
[ True False]
5
```


### busday_offset y calendarios

**Clave** `busday-offset-y-calendarios`

**Definición** Desplaza una fecha en días hábiles, con reglas para fechas inicialmente no laborables. busdaycalendar permite personalizar calendario.

**Búsqueda** busday_offset y calendarios; calcular el siguiente día hábil con un festivo.

**Para recordar** roll controla cómo ajustar una fecha no laborable antes del desplazamiento.

#### Calcular el siguiente día hábil con un festivo

```python
cal = np.busdaycalendar(holidays=['2026-06-01'])
print(np.busday_offset('2026-05-29', 1, busdaycal=cal))
```

roll controla cómo ajustar una fecha no laborable antes del desplazamiento.

**Resultado**

```text
2026-06-02
```


## Texto vectorizado

**Clave** `texto-vectorizado`


### Definición

**Clave** `definicion`

**Definición** np.strings ofrece operaciones de cadenas elemento a elemento sobre arrays compatibles. No es un sustituto de todos los métodos de texto de pandas.

**Búsqueda** Texto vectorizado; normalizar etiquetas de regiones; qué es y cómo se usa.

**Para recordar** Desde NumPy 2 se recomienda np.strings para estas operaciones; np.char es la interfaz antigua.

#### Normalizar etiquetas de regiones

```python
a = np.array([' Norte ', 'SUR', ' centro'])
print(np.strings.lower(np.strings.strip(a)))
print(np.strings.upper(a))
```

Desde NumPy 2 se recomienda np.strings para estas operaciones; np.char es la interfaz antigua.

**Resultado**

```text
['norte' 'sur' 'centro']
[' NORTE ' 'SUR' ' CENTRO']
```


### upper, lower y strip

**Clave** `upper-lower-y-strip`

**Definición** upper y lower cambian mayúsculas y minúsculas; strip elimina caracteres de los extremos, espacios por defecto.

**Búsqueda** upper, lower y strip; normalizar etiquetas de regiones.

**Para recordar** strip no elimina espacios internos.

#### Normalizar etiquetas de regiones

```python
a = np.array([' Norte ', 'SUR', ' centro'])
print(np.strings.lower(np.strings.strip(a)))
print(np.strings.upper(a))
```

strip no elimina espacios internos.

**Resultado**

```text
['norte' 'sur' 'centro']
[' NORTE ' 'SUR' ' CENTRO']
```


### replace, add y str_len

**Clave** `replace-add-y-str-len`

**Definición** replace sustituye fragmentos, add concatena elementos y str_len cuenta caracteres.

**Búsqueda** replace, add y str_len; limpiar y construir etiquetas.

**Para recordar** Las operaciones se aplican por elemento, no a todo el array como una sola cadena.

#### Limpiar y construir etiquetas

```python
a = np.array(['A-01', 'A-02'])
print(np.strings.replace(a, '-', ''))
print(np.strings.add('SKU-', a))
print(np.strings.str_len(a))
```

Las operaciones se aplican por elemento, no a todo el array como una sola cadena.

**Resultado**

```text
['A01' 'A02']
['SKU-A-01' 'SKU-A-02']
[4 4]
```


### Búsqueda de cadenas

**Clave** `busqueda-de-cadenas`

**Definición** find busca la posición de una subcadena; startswith y endswith comprueban prefijos o sufijos.

**Búsqueda** Búsqueda de cadenas; filtrar códigos por prefijo.

**Para recordar** find devuelve -1 cuando no hay coincidencia.

#### Filtrar códigos por prefijo

```python
a = np.array(['MX-1', 'US-2', 'MX-3'])
print(a[np.strings.startswith(a, 'MX')])
print(np.strings.find(a, 'X'))
print(np.strings.endswith(a, '3'))
```

find devuelve -1 cuando no hay coincidencia.

**Resultado**

```text
['MX-1' 'MX-3']
[ 1 -1  1]
[False False  True]
```


### StringDType y texto de longitud fija

**Clave** `stringdtype-y-texto-de-longitud-fija`

**Definición** Los dtypes U tienen longitud fija en caracteres; StringDType almacena cadenas de longitud variable.

**Búsqueda** StringDType y texto de longitud fija; comparar asignación de textos largos.

**Para recordar** Asignar una cadena demasiado larga a un dtype U puede truncarla; StringDType requiere NumPy 2 o posterior.

#### Comparar asignación de textos largos

```python
a = np.array(['MX'], dtype='U2')
a[0] = 'Mexico'
b = np.array(['MX'], dtype=np.dtypes.StringDType())
b[0] = 'Mexico'
print(a, b)
```

Asignar una cadena demasiado larga a un dtype U puede truncarla; StringDType requiere NumPy 2 o posterior.

**Resultado**

```text
['Me'] ['Mexico']
```


## Aleatoriedad y muestreo

**Clave** `aleatoriedad-y-muestreo`


### Definición

**Clave** `definicion`

**Definición** Generator genera números pseudoaleatorios y muestras. default_rng crea un generador moderno con una semilla opcional.

**Búsqueda** Aleatoriedad y muestreo; reproducir una simulación; qué es y cómo se usa.

**Para recordar** Una semilla permite reproducir la secuencia si se conserva el generador, entorno y orden de llamadas.

#### Reproducir una simulación

```python
r1 = np.random.default_rng(42)
r2 = np.random.default_rng(42)
print(np.array_equal(r1.integers(0, 100, 5), r2.integers(0, 100, 5)))
```

Una semilla permite reproducir la secuencia si se conserva el generador, entorno y orden de llamadas.

**Resultado**

```text
True
```


### default_rng y semillas

**Clave** `default-rng-y-semillas`

**Definición** default_rng inicializa el generador; dos generadores con la misma semilla producen la misma secuencia bajo las mismas condiciones.

**Búsqueda** default_rng y semillas; reproducir una simulación.

**Para recordar** No reinicies la semilla en cada iteración si quieres muestras diferentes.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Reproducir una simulación

```python
r1 = np.random.default_rng(42)
r2 = np.random.default_rng(42)
print(np.array_equal(r1.integers(0, 100, 5), r2.integers(0, 100, 5)))
```

No reinicies la semilla en cada iteración si quieres muestras diferentes.

**Resultado**

```text
True
```


### random, integers y uniform

**Clave** `random-integers-y-uniform`

**Definición** random genera valores en [0,1), integers enteros con límite alto excluido por defecto, uniform valores de una distribución uniforme.

**Búsqueda** random, integers y uniform; simular tasas, cantidades y descuentos.

**Para recordar** Indica size para producir varios valores o una matriz.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Simular tasas, cantidades y descuentos

```python
r = np.random.default_rng(42)
print(r.random(3).round(3))
print(r.integers(1, 7, size=4))
print(r.uniform(0, 20, size=3).round(2))
```

Indica size para producir varios valores o una matriz.

**Resultado**

```text
[0.774 0.439 0.859]
[1 5 2 1]
[19.51 15.22 15.72]
```


### normal

**Clave** `normal`

**Definición** Genera muestras de una distribución normal con media loc y desviación scale.

**Búsqueda** normal; simular importes alrededor de 100.

**Para recordar** Una normal puede generar valores negativos; no siempre es apropiada para demanda.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Simular importes alrededor de 100

```python
r = np.random.default_rng(42)
print(r.normal(loc=100, scale=10, size=5).round(2))
```

loc fija la media del modelo y scale su desviación estándar; size solicita cinco observaciones.

**Resultado**

```text
[103.05  89.6  107.5  109.41  80.49]
```


### choice

**Clave** `choice`

**Definición** Selecciona valores aleatoriamente, con o sin reemplazo y pesos p opcionales.

**Búsqueda** choice; tomar una muestra de tickets.

**Para recordar** replace=False evita elegir la misma posición dos veces; con valores repetidos aún puede haber valores iguales.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Tomar una muestra de tickets

```python
r = np.random.default_rng(42)
print(r.choice(importes, size=3, replace=False))
print(r.choice(['A', 'B'], size=5, p=[0.8, 0.2]))
```

replace=False evita elegir la misma posición dos veces; con valores repetidos aún puede haber valores iguales.

**Resultado**

```text
[200 100 400]
['A' 'A' 'B' 'A' 'A']
```


### shuffle y permutation

**Clave** `shuffle-y-permutation`

**Definición** shuffle modifica la colección in-place; permutation devuelve una versión permutada.

**Búsqueda** shuffle y permutation; reordenar observaciones de forma reproducible.

**Para recordar** Si tienes columnas relacionadas, permuta los índices y aplícalos a todas.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Reordenar observaciones de forma reproducible

```python
r = np.random.default_rng(42)
a = importes.copy()
r.shuffle(a)
print(a)
print(r.permutation(importes))
```

Si tienes columnas relacionadas, permuta los índices y aplícalos a todas.

**Resultado**

```text
[400 150 200 300 250 100]
[150 300 100 250 400 200]
```


### binomial, poisson y exponential

**Clave** `binomial-poisson-y-exponential`

**Definición** Binomial modela éxitos en ensayos, Poisson conteos de eventos y exponencial tiempos de espera bajo sus hipótesis.

**Búsqueda** binomial, poisson y exponential; simular conversiones, pedidos y esperas.

**Para recordar** En exponential, scale es la media, no la tasa; en poisson, lam es la media de eventos.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Simular conversiones, pedidos y esperas

```python
r = np.random.default_rng(42)
print(r.binomial(100, 0.2, size=4))
print(r.poisson(5, size=4))
print(r.exponential(2, size=4).round(2))
```

En exponential, scale es la media, no la tasa; en poisson, lam es la media de eventos.

**Resultado**

```text
[23 19 24 22]
[5 7 9 6]
[1.28 0.69 0.64 1.76]
```


### Monte Carlo

**Clave** `monte-carlo`

**Definición** Monte Carlo estima una magnitud repitiendo simulaciones de un modelo aleatorio.

**Búsqueda** Monte Carlo; estimar probabilidad de ventas superiores al objetivo.

**Para recordar** Los resultados dependen de las distribuciones y supuestos elegidos, no son predicciones garantizadas.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Estimar probabilidad de ventas superiores al objetivo

```python
r = np.random.default_rng(42)
demanda = r.poisson(100, size=10000)
ingresos = demanda * 20
print(np.mean(ingresos > 2100).round(3))
```

Los resultados dependen de las distribuciones y supuestos elegidos, no son predicciones garantizadas.

**Resultado**

```text
0.288
```


### Bootstrap

**Clave** `bootstrap`

**Definición** Bootstrap estima variabilidad de una estadística mediante remuestreo con reemplazo de observaciones.

**Búsqueda** Bootstrap; estimar intervalo percentil de la media de tickets.

**Para recordar** Una muestra bootstrap suele tener el mismo tamaño que la original; requiere observaciones representativas y supuestos de independencia apropiados.

**Nota** La salida corresponde a la semilla y al orden de llamadas del ejemplo en NumPy 2.3.5.

#### Estimar intervalo percentil de la media de tickets

```python
r = np.random.default_rng(42)
muestras = r.choice(importes, size=(2000, importes.size), replace=True)
print(np.percentile(muestras.mean(axis=1), [2.5, 97.5]).round(2))
```

Una muestra bootstrap suele tener el mismo tamaño que la original; requiere observaciones representativas y supuestos de independencia apropiados.

**Resultado**

```text
[158.33 316.67]
```


## Precisión y errores numéricos

**Clave** `precision-y-errores-numericos`


### Definición

**Clave** `definicion`

**Definición** Los tipos numéricos tienen límites y los cálculos flotantes son aproximados. NumPy puede gestionar avisos por operaciones inválidas.

**Búsqueda** Precisión y errores numéricos; observar límites de representación; qué es y cómo se usa.

**Para recordar** Comprueba el rango, dtype y tolerancia antes de confiar en un cálculo.

#### Observar límites de representación

```python
a = np.array([127], dtype=np.int8)
print(a + np.int8(1))
print(np.exp(-1000.0))
```

Comprueba el rango, dtype y tolerancia antes de confiar en un cálculo.

**Resultado**

```text
[-128]
0.0
```


### Overflow y underflow

**Clave** `overflow-y-underflow`

**Definición** Overflow ocurre al superar el rango del tipo; underflow flotante ocurre cuando un resultado es demasiado pequeño para conservar precisión o se redondea a cero.

**Búsqueda** Overflow y underflow; observar límites de representación.

**Para recordar** Un entero de ancho fijo puede desbordarse sin aviso en operaciones de array.

#### Observar límites de representación

```python
a = np.array([127], dtype=np.int8)
print(a + np.int8(1))
print(np.exp(-1000.0))
```

Un entero de ancho fijo puede desbordarse sin aviso en operaciones de array.

**Resultado**

```text
[-128]
0.0
```


### Precisión flotante

**Clave** `precision-flotante`

**Definición** Los números binarios de punto flotante no representan exactamente todos los decimales. finfo.eps mide separación relativa cerca de uno.

**Búsqueda** Precisión flotante; comparar cálculo aproximado y centavos.

**Para recordar** Para dinero exacto, considera enteros en centavos o Decimal según el entorno.

#### Comparar cálculo aproximado y centavos

```python
print(format(0.1 + 0.2, '.17f'))
print(10 + 20)
print(np.finfo(np.float32).eps)
```

Para dinero exacto, considera enteros en centavos o Decimal según el entorno.

**Resultado**

```text
0.30000000000000004
30
1.1920929e-07
```


### errstate y seterr

**Clave** `errstate-y-seterr`

**Definición** errstate cambia temporalmente el tratamiento de errores flotantes; seterr cambia la configuración vigente y devuelve la anterior.

**Búsqueda** errstate y seterr; controlar una división inválida.

**Para recordar** raise convierte ciertos errores flotantes en FloatingPointError; no garantiza detectar todo overflow entero.

#### Controlar una división inválida

```python
try:
    with np.errstate(divide='raise'):
        np.divide(1.0, 0.0)
except FloatingPointError:
    print('FloatingPointError')
anterior = np.seterr(invalid='ignore')
try:
    print(np.sqrt(-1.0))
finally:
    np.seterr(**anterior)
```

raise convierte ciertos errores flotantes en FloatingPointError; no garantiza detectar todo overflow entero.

**Resultado**

```text
FloatingPointError
nan
```


## Álgebra lineal

**Clave** `algebra-lineal`


### Definición

**Clave** `definicion`

**Definición** Las operaciones matriciales combinan filas y columnas mediante productos y transformaciones lineales. np.linalg agrupa operaciones para resolver sistemas y descomponer matrices.

**Búsqueda** Álgebra lineal; calcular ingresos por sucursal a partir de cantidades por producto; qué es y cómo se usa.

**Para recordar** Distingue multiplicación elemento a elemento de producto matricial.

#### Calcular ingresos por sucursal a partir de cantidades por producto

```python
q = np.array([[2, 3], [4, 1]])
p = np.array([10, 20])
print(q @ p)
print(np.matmul(q, p))
print(np.dot(q, p))
```

Distingue multiplicación elemento a elemento de producto matricial.

**Resultado**

```text
[80 60]
[80 60]
[80 60]
```


### dot, matmul y @

**Clave** `dot-matmul-y`

**Definición** Para matrices 2D, dot y matmul calculan el producto matricial; @ usa matmul. Para vectores 1D dot da el producto interno.

**Búsqueda** dot, matmul y @; calcular ingresos por sucursal a partir de cantidades por producto.

**Para recordar** Para dimensiones superiores dot y matmul tienen reglas distintas.

#### Calcular ingresos por sucursal a partir de cantidades por producto

```python
q = np.array([[2, 3], [4, 1]])
p = np.array([10, 20])
print(q @ p)
print(np.matmul(q, p))
print(np.dot(q, p))
```

Para dimensiones superiores dot y matmul tienen reglas distintas.

**Resultado**

```text
[80 60]
[80 60]
[80 60]
```


### inner, outer y tensordot

**Clave** `inner-outer-y-tensordot`

**Definición** inner combina últimos ejes, outer combina pares de elementos aplanados y tensordot contrae los ejes indicados.

**Búsqueda** inner, outer y tensordot; comparar productos de vectores y contracción.

**Para recordar** Especifica qué dimensiones se multiplican y suman.

#### Comparar productos de vectores y contracción

```python
a = np.array([1, 2])
b = np.array([10, 20])
print(np.inner(a, b))
print(np.outer(a, b))
print(np.tensordot(a, b, axes=1))
```

Especifica qué dimensiones se multiplican y suman.

**Resultado**

```text
50
[[10 20]
 [20 40]]
50
```


### einsum

**Clave** `einsum`

**Definición** Describe contracciones mediante etiquetas de ejes. Las etiquetas omitidas de la salida se suman.

**Búsqueda** einsum; calcular un total ponderado por fila.

**Para recordar** ij,j->i expresa un producto matriz-vector.

#### Calcular un total ponderado por fila

```python
print(np.einsum('ij,j->i', ventas, [1, 2, 3, 4]))
print(np.einsum('ij->j', ventas))
```

ij,j->i expresa un producto matriz-vector.

**Resultado**

```text
[2000 2700 1800]
[450 550 650 750]
```


### Normas

**Clave** `normas`

**Definición** linalg.norm mide longitud de vectores o magnitudes matriciales según ord y axis.

**Búsqueda** Normas; medir distancia entre dos perfiles.

**Para recordar** La norma euclidiana de un vector es la raíz de la suma de cuadrados.

#### Medir distancia entre dos perfiles

```python
print(np.linalg.norm([3, 4]))
print(np.linalg.norm([[3, 4], [0, 2]], axis=1))
```

La norma euclidiana de un vector es la raíz de la suma de cuadrados.

**Resultado**

```text
5.0
[5. 2.]
```


### diag, trace, tril y triu

**Clave** `diag-trace-tril-y-triu`

**Definición** diag extrae o construye diagonales, trace suma la diagonal y tril/triu conservan partes triangulares.

**Búsqueda** diag, trace, tril y triu; inspeccionar una matriz de relaciones.

**Para recordar** tril y triu ponen cero fuera del triángulo seleccionado.

#### Inspeccionar una matriz de relaciones

```python
a = np.array([[1, 2], [3, 4]])
print(np.diag(a), np.trace(a))
print(np.tril(a))
print(np.triu(a))
```

tril y triu ponen cero fuera del triángulo seleccionado.

**Resultado**

```text
[1 4] 5
[[1 0]
 [3 4]]
[[1 2]
 [0 4]]
```


### solve e inv

**Clave** `solve-e-inv`

**Definición** solve obtiene x de Ax=b para una matriz cuadrada no singular; inv calcula la inversa.

**Búsqueda** solve e inv; resolver cantidades de dos productos.

**Para recordar** Para resolver un sistema usa solve en vez de calcular explícitamente la inversa.

#### Resolver cantidades de dos productos

```python
a = np.array([[2, 1], [1, 1]])
b = np.array([70, 45])
print(np.linalg.solve(a, b))
print(np.linalg.inv(a).round(2))
```

Para resolver un sistema usa solve en vez de calcular explícitamente la inversa.

**Resultado**

```text
[25. 20.]
[[ 1. -1.]
 [-1.  2.]]
```


### Determinante y rango

**Clave** `determinante-y-rango`

**Definición** det calcula el determinante de una matriz cuadrada; matrix_rank estima su rango numérico.

**Búsqueda** Determinante y rango; detectar dependencia lineal.

**Para recordar** Un determinante cercano a cero no basta para diagnosticar estabilidad; usa también rango o condición.

#### Detectar dependencia lineal

```python
a = np.array([[1, 2], [2, 4]])
print(np.linalg.det(a).round(4), np.linalg.matrix_rank(a))
```

Un determinante cercano a cero no basta para diagnosticar estabilidad; usa también rango o condición.

**Resultado**

```text
0.0 1
```


### Valores y vectores propios

**Clave** `valores-y-vectores-propios`

**Definición** eig devuelve valores y vectores propios; eigh se especializa en matrices simétricas reales o hermíticas.

**Búsqueda** Valores y vectores propios; obtener componentes principales de una matriz simétrica sencilla.

**Para recordar** Los signos de los vectores propios y el orden de algunos resultados pueden variar.

#### Obtener componentes principales de una matriz simétrica sencilla

```python
a = np.array([[3, 1], [1, 3]])
w, v = np.linalg.eigh(a)
print(w)
print(np.allclose(a @ v, v * w))
```

Los signos de los vectores propios y el orden de algunos resultados pueden variar.

**Resultado**

```text
[2. 4.]
True
```


### SVD y QR

**Clave** `svd-y-qr`

**Definición** svd descompone A en U, valores singulares y Vh; qr en Q ortogonal y R triangular.

**Búsqueda** SVD y QR; verificar reconstrucciones matriciales.

**Para recordar** Las descomposiciones se usan en reducción de dimensión y resolución numérica.

#### Verificar reconstrucciones matriciales

```python
a = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])
u, s, vh = np.linalg.svd(a, full_matrices=False)
q, r = np.linalg.qr(a)
print(s.round(3))
print(np.allclose(u * s @ vh, a), np.allclose(q @ r, a))
```

Las descomposiciones se usan en reducción de dimensión y resolución numérica.

**Resultado**

```text
[9.526 0.514]
True True
```


### Mínimos cuadrados

**Clave** `minimos-cuadrados`

**Definición** linalg.lstsq encuentra coeficientes que minimizan la norma del residuo Ax-b.

**Búsqueda** Mínimos cuadrados; ajustar ingresos lineales según inversión.

**Para recordar** No requiere un sistema cuadrado; la calidad de la predicción depende del modelo.

#### Ajustar ingresos lineales según inversión

```python
x = np.array([1, 2, 3])
y = np.array([3, 5, 7])
a = np.column_stack((x, np.ones(3)))
coef, *_ = np.linalg.lstsq(a, y, rcond=None)
print(coef.round(3))
```

No requiere un sistema cuadrado; la calidad de la predicción depende del modelo.

**Resultado**

```text
[2. 1.]
```


## Interpolación y cálculo numérico

**Clave** `interpolacion-y-calculo-numerico`


### Definición

**Clave** `definicion`

**Definición** NumPy aproxima valores entre observaciones y operaciones matemáticas discretas sobre muestras.

**Búsqueda** Interpolación y cálculo numérico; estimar ventas entre dos periodos; qué es y cómo se usa.

**Para recordar** Los resultados dependen del espaciado, la escala y el modelo elegido.

#### Estimar ventas entre dos periodos

```python
print(np.interp([1.5, 2.5], [1, 2, 3], [100, 200, 400]))
```

Los resultados dependen del espaciado, la escala y el modelo elegido.

**Resultado**

```text
[150. 300.]
```


### interp

**Clave** `interp`

**Definición** interp hace interpolación lineal 1D entre puntos de referencia ordenados.

**Búsqueda** interp; estimar ventas entre dos periodos.

**Para recordar** Por defecto fuera del rango devuelve el valor del extremo, no extrapola linealmente.

#### Estimar ventas entre dos periodos

```python
print(np.interp([1.5, 2.5], [1, 2, 3], [100, 200, 400]))
```

Por defecto fuera del rango devuelve el valor del extremo, no extrapola linealmente.

**Resultado**

```text
[150. 300.]
```


### gradient

**Clave** `gradient`

**Definición** gradient aproxima derivadas mediante diferencias finitas, con reglas especiales en bordes.

**Búsqueda** gradient; estimar cambio por unidad de tiempo.

**Para recordar** Indica el espaciado si las observaciones no están separadas por una unidad.

#### Estimar cambio por unidad de tiempo

```python
print(np.gradient([0.0, 4.0, 16.0], 2))
```

Indica el espaciado si las observaciones no están separadas por una unidad.

**Resultado**

```text
[2. 4. 6.]
```


### trapezoid

**Clave** `trapezoid`

**Definición** Integra aproximadamente valores mediante trapecios. Es útil para sumar áreas entre observaciones.

**Búsqueda** trapezoid; estimar unidades acumuladas a partir de tasas.

**Para recordar** Indica x o dx; no ordena automáticamente las coordenadas. Disponible desde NumPy 2.0.

#### Estimar unidades acumuladas a partir de tasas

```python
print(np.trapezoid([10, 20, 30], x=[0, 1, 2]))
```

Indica x o dx; no ordena automáticamente las coordenadas. Disponible desde NumPy 2.0.

**Resultado**

```text
40.0
```


## Fourier y análisis de frecuencias

**Clave** `fourier-y-analisis-de-frecuencias`


### Definición

**Clave** `definicion`

**Definición** np.fft transforma una secuencia de muestras en componentes de frecuencia. Se usa para identificar periodicidad en señales regularmente espaciadas.

**Búsqueda** Fourier y análisis de frecuencias; transformar y reconstruir un patrón periódico; qué es y cómo se usa.

**Para recordar** La frecuencia se interpreta según la unidad y separación de las muestras.

#### Transformar y reconstruir un patrón periódico

```python
a = np.array([0, 1, 0, -1])
f = np.fft.fft(a)
print(np.abs(f).round(3))
print(np.fft.ifft(f).real.round(3))
```

La frecuencia se interpreta según la unidad y separación de las muestras.

**Resultado**

```text
[0. 2. 0. 2.]
[ 0.  1.  0. -1.]
```


### fft e ifft

**Clave** `fft-e-ifft`

**Definición** fft calcula la transformada discreta de Fourier; ifft reconstruye las muestras desde sus coeficientes.

**Búsqueda** fft e ifft; transformar y reconstruir un patrón periódico.

**Para recordar** Los coeficientes suelen ser complejos, aunque los datos originales sean reales.

#### Transformar y reconstruir un patrón periódico

```python
a = np.array([0, 1, 0, -1])
f = np.fft.fft(a)
print(np.abs(f).round(3))
print(np.fft.ifft(f).real.round(3))
```

Los coeficientes suelen ser complejos, aunque los datos originales sean reales.

**Resultado**

```text
[0. 2. 0. 2.]
[ 0.  1.  0. -1.]
```


### rfft y rfftfreq

**Clave** `rfft-y-rfftfreq`

**Definición** rfft calcula solo las frecuencias no negativas necesarias para una señal real; rfftfreq indica sus frecuencias físicas.

**Búsqueda** rfft y rfftfreq; detectar una periodicidad de cuatro días.

**Para recordar** La magnitud no equivale directamente a amplitud sin una normalización adecuada.

#### Detectar una periodicidad de cuatro días

```python
t = np.arange(16)
a = np.sin(2 * np.pi * t / 4)
f = np.fft.rfftfreq(a.size, d=1)
print(f[np.argmax(np.abs(np.fft.rfft(a)))])
```

La magnitud no equivale directamente a amplitud sin una normalización adecuada.

**Resultado**

```text
0.25
```


## Polinomios

**Clave** `polinomios`


### Definición

**Clave** `definicion`

**Definición** numpy.polynomial representa polinomios y permite evaluarlos o ajustarlos a observaciones.

**Búsqueda** Polinomios; evaluar una función de costo lineal; qué es y cómo se usa.

**Para recordar** Polynomial ordena coeficientes de menor a mayor grado; polyfit clásico usa el orden inverso.

#### Evaluar una función de costo lineal

```python
from numpy.polynomial import Polynomial
p = Polynomial([100, 20])
print(p(np.array([0, 2, 5])))
```

Polynomial ordena coeficientes de menor a mayor grado; polyfit clásico usa el orden inverso.

**Resultado**

```text
[100. 140. 200.]
```


### Polynomial y evaluación

**Clave** `polynomial-y-evaluacion`

**Definición** Polynomial crea un polinomio con coeficientes constantes, lineales y de grados superiores.

**Búsqueda** Polynomial y evaluación; evaluar una función de costo lineal.

**Para recordar** Llamar al objeto evalúa el polinomio en los puntos indicados.

#### Evaluar una función de costo lineal

```python
from numpy.polynomial import Polynomial
p = Polynomial([100, 20])
print(p(np.array([0, 2, 5])))
```

Llamar al objeto evalúa el polinomio en los puntos indicados.

**Resultado**

```text
[100. 140. 200.]
```


### Polynomial.fit

**Clave** `polynomial-fit`

**Definición** Ajusta un polinomio de grado indicado por mínimos cuadrados; convert recupera coeficientes en la base estándar.

**Búsqueda** Polynomial.fit; ajustar una tendencia lineal de ventas.

**Para recordar** A mayor grado puede haber sobreajuste; no extrapoles sin validar.

#### Ajustar una tendencia lineal de ventas

```python
from numpy.polynomial import Polynomial
p = Polynomial.fit([1, 2, 3], [100, 200, 300], deg=1)
print(p(4).round(2))
print(p.convert().coef.round(2))
```

A mayor grado puede haber sobreajuste; no extrapoles sin validar.

**Resultado**

```text
400.0
[  0. 100.]
```


### Operaciones y derivadas

**Clave** `operaciones-y-derivadas`

**Definición** Los objetos Polynomial admiten suma, producto, deriv y integ.

**Búsqueda** Operaciones y derivadas; obtener costo marginal de una función cuadrática.

**Para recordar** deriv devuelve otro polinomio que representa el cambio instantáneo.

#### Obtener costo marginal de una función cuadrática

```python
from numpy.polynomial import Polynomial
p = Polynomial([100, 20, 2])
print(p.deriv().coef)
print(p.deriv()(3))
```

deriv devuelve otro polinomio que representa el cambio instantáneo.

**Resultado**

```text
[20.  4.]
32.0
```


## Arrays estructurados y enmascarados

**Clave** `arrays-estructurados-y-enmascarados`


### Definición

**Clave** `definicion`

**Definición** Los arrays estructurados almacenan registros con campos de distintos tipos; los enmascarados mantienen datos y una máscara de invalidez.

**Búsqueda** Arrays estructurados y enmascarados; crear registros de ventas heterogéneos; qué es y cómo se usa.

**Para recordar** No son un DataFrame; cada uno responde a necesidades diferentes de representación.

#### Crear registros de ventas heterogéneos

```python
a = np.array([(1, 100.0), (2, 250.0)], dtype=[('id', 'i4'), ('importe', 'f8')])
print(a['id'])
print(a['importe'].sum())
```

No son un DataFrame; cada uno responde a necesidades diferentes de representación.

**Resultado**

```text
[1 2]
350.0
```


### Structured arrays

**Clave** `structured-arrays`

**Definición** Un dtype estructurado asigna un tipo y nombre a cada campo. Los campos se acceden por su nombre.

**Búsqueda** Structured arrays; crear registros de ventas heterogéneos.

**Para recordar** Cada fila es un registro con un esquema fijo.

#### Crear registros de ventas heterogéneos

```python
a = np.array([(1, 100.0), (2, 250.0)], dtype=[('id', 'i4'), ('importe', 'f8')])
print(a['id'])
print(a['importe'].sum())
```

Cada fila es un registro con un esquema fijo.

**Resultado**

```text
[1 2]
350.0
```


### Record arrays

**Clave** `record-arrays`

**Definición** Un recarray permite acceder a campos mediante atributos además de índices por nombre.

**Búsqueda** Record arrays; consultar campos de registros.

**Para recordar** Los atributos pueden chocar con nombres de métodos; el acceso por nombre sigue siendo explícito.

#### Consultar campos de registros

```python
a = np.rec.array([(1, 100.0), (2, 200.0)], dtype=[('id', 'i4'), ('importe', 'f8')])
print(a.importe)
print(a['id'])
```

Los atributos pueden chocar con nombres de métodos; el acceso por nombre sigue siendo explícito.

**Resultado**

```text
[100. 200.]
[1 2]
```


### Masked arrays y np.ma

**Clave** `masked-arrays-y-np-ma`

**Definición** np.ma.array guarda valores junto con una máscara; True indica un elemento oculto o inválido.

**Búsqueda** Masked arrays y np.ma; calcular una media excluyendo una observación.

**Para recordar** Las reducciones de np.ma excluyen elementos enmascarados; filled los reemplaza por un valor concreto.

#### Calcular una media excluyendo una observación

```python
a = np.ma.array([100, 200, 999], mask=[False, False, True])
print(a)
print(a.mean())
print(a.filled(0))
```

Las reducciones de np.ma excluyen elementos enmascarados; filled los reemplaza por un valor concreto.

**Resultado**

```text
[100 200 --]
150.0
[100 200   0]
```


### masked_invalid y compresión

**Clave** `masked-invalid-y-compresion`

**Definición** masked_invalid enmascara NaN e infinitos. compressed devuelve un array 1D de los elementos no enmascarados.

**Búsqueda** masked_invalid y compresión; recuperar valores finitos.

**Para recordar** compressed descarta la estructura original; conserva la máscara si necesitas posiciones.

#### Recuperar valores finitos

```python
a = np.ma.masked_invalid(invalidos)
print(a.compressed())
print(a.mask)
```

compressed descarta la estructura original; conserva la máscara si necesitas posiciones.

**Resultado**

```text
[100. 300.]
[False  True  True  True False]
```


## Archivos e intercambio de datos

**Clave** `archivos-e-intercambio-de-datos`


### Definición

**Clave** `definicion`

**Definición** NumPy puede leer y escribir texto numérico, archivos binarios propios y arrays mapeados en memoria.

**Búsqueda** Archivos e intercambio de datos; guardar y recuperar ventas en csv sin crear archivos permanentes; qué es y cómo se usa.

**Para recordar** Usa formatos de NumPy para conservar forma y dtype; usa herramientas tabulares para CSV complejos.

#### Guardar y recuperar ventas en CSV sin crear archivos permanentes

```python
from io import StringIO
f = StringIO()
np.savetxt(f, ventas, delimiter=',', fmt='%d')
f.seek(0)
print(np.loadtxt(f, delimiter=',', dtype=int))
```

Usa formatos de NumPy para conservar forma y dtype; usa herramientas tabulares para CSV complejos.

**Resultado**

```text
[[100 150 200 250]
 [150 200 250 350]
 [200 200 200 150]]
```


### loadtxt y savetxt

**Clave** `loadtxt-y-savetxt`

**Definición** loadtxt lee texto numérico regular; savetxt escribe valores con formato y delimitador configurables.

**Búsqueda** loadtxt y savetxt; guardar y recuperar ventas en csv sin crear archivos permanentes.

**Para recordar** loadtxt no gestiona faltantes complejos; usa genfromtxt o pandas en esos casos.

#### Guardar y recuperar ventas en CSV sin crear archivos permanentes

```python
from io import StringIO
f = StringIO()
np.savetxt(f, ventas, delimiter=',', fmt='%d')
f.seek(0)
print(np.loadtxt(f, delimiter=',', dtype=int))
```

loadtxt no gestiona faltantes complejos; usa genfromtxt o pandas en esos casos.

**Resultado**

```text
[[100 150 200 250]
 [150 200 250 350]
 [200 200 200 150]]
```


### genfromtxt

**Clave** `genfromtxt`

**Definición** Lee texto y permite reconocer valores ausentes, encabezados y tipos. Para float, los datos vacíos suelen convertirse en NaN.

**Búsqueda** genfromtxt; leer un csv con un valor faltante.

**Para recordar** Configura delimiter y skip_header según el archivo.

#### Leer un CSV con un valor faltante

```python
from io import StringIO
f = StringIO(chr(10).join(['id,importe', '1,100', '2,', '3,300']))
print(np.genfromtxt(f, delimiter=',', skip_header=1))
```

Configura delimiter y skip_header según el archivo.

**Resultado**

```text
[[  1. 100.]
 [  2.  nan]
 [  3. 300.]]
```


### save y load

**Clave** `save-y-load`

**Definición** save almacena un array en formato NPY y load lo recupera con su forma y dtype.

**Búsqueda** save y load; guardar y recuperar un array binario.

**Para recordar** Evita allow_pickle=True con archivos de origen no confiable.

#### Guardar y recuperar un array binario

```python
from io import BytesIO
f = BytesIO()
np.save(f, ventas)
f.seek(0)
a = np.load(f, allow_pickle=False)
print(np.array_equal(a, ventas), a.dtype)
```

Evita allow_pickle=True con archivos de origen no confiable.

**Resultado**

```text
True int64
```


### savez y savez_compressed

**Clave** `savez-y-savez-compressed`

**Definición** Guardan varios arrays nombrados en un archivo NPZ; la segunda función comprime el contenido.

**Búsqueda** savez y savez_compressed; guardar varios conjuntos en un archivo lógico.

**Para recordar** Usa un gestor de contexto al abrir NPZ para cerrar el archivo.

#### Guardar varios conjuntos en un archivo lógico

```python
from io import BytesIO
f = BytesIO()
np.savez_compressed(f, ventas=ventas, clientes=clientes)
f.seek(0)
with np.load(f) as datos:
    print(datos.files)
    print(datos['clientes'])
f2 = BytesIO()
np.savez(f2, ventas=ventas)
f2.seek(0)
with np.load(f2) as datos:
    print(datos['ventas'].shape)
```

Usa un gestor de contexto al abrir NPZ para cerrar el archivo.

**Resultado**

```text
['ventas', 'clientes']
[1 2 1 3 2 3]
(3, 4)
```


### memmap

**Clave** `memmap`

**Definición** Mapea un archivo binario para acceder a regiones del array sin cargarlo completo de una vez.

**Búsqueda** memmap; crear y consultar un archivo mapeado temporal.

**Para recordar** Especifica dtype y shape correctos; mode='r' abre solo lectura. No elimina la necesidad de almacenamiento ni memoria de trabajo.

#### Crear y consultar un archivo mapeado temporal

```python
from tempfile import TemporaryDirectory
from pathlib import Path
with TemporaryDirectory() as d:
    p = Path(d) / 'ventas.bin'
    a = np.memmap(p, dtype='int64', mode='w+', shape=(3, 4))
    a[:] = ventas
    a.flush()
    del a
    b = np.memmap(p, dtype='int64', mode='r', shape=(3, 4))
    print(b[1])
    del b
```

Especifica dtype y shape correctos; mode='r' abre solo lectura. No elimina la necesidad de almacenamiento ni memoria de trabajo.

**Resultado**

```text
[150 200 250 350]
```


## Integración con pandas

**Clave** `integracion-con-pandas`


### Definición

**Clave** `definicion`

**Definición** Pandas representa datos tabulares con etiquetas y tipos por columna; NumPy aporta arrays y operaciones numéricas. to_numpy permite pasar de pandas a NumPy.

**Búsqueda** Integración con pandas; extraer una columna de importes; qué es y cómo se usa.

**Para recordar** Al convertir, las etiquetas del índice y columnas no se conservan dentro del ndarray.

#### Extraer una columna de importes

```python
import pandas as pd
s = pd.Series(importes)
a = s.to_numpy()
print(a)
print(type(a).__name__)
```

Al convertir, las etiquetas del índice y columnas no se conservan dentro del ndarray.

**Resultado**

```text
[100 250 150 400 300 200]
ndarray
```


### Series.to_numpy

**Clave** `series-to-numpy`

**Definición** Convierte una Series a un ndarray. Puede cambiar el dtype o requerir una copia según el tipo original.

**Búsqueda** Series.to_numpy; extraer una columna de importes.

**Para recordar** copy=False no garantiza que no haya copia; copy=True solicita independencia de los datos del array.

**Nota** Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.

#### Extraer una columna de importes

```python
import pandas as pd
s = pd.Series(importes)
a = s.to_numpy()
print(a)
print(type(a).__name__)
```

copy=False no garantiza que no haya copia; copy=True solicita independencia de los datos del array.

**Resultado**

```text
[100 250 150 400 300 200]
ndarray
```


### DataFrame.to_numpy

**Clave** `dataframe-to-numpy`

**Definición** Convierte columnas seleccionadas a una matriz con un dtype común. Si hay texto y números, puede resultar object.

**Búsqueda** DataFrame.to_numpy; extraer columnas para cálculo numérico.

**Para recordar** Selecciona columnas numéricas antes de calcular; especifica dtype si es necesario.

**Nota** Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.

#### Extraer columnas para cálculo numérico

```python
import pandas as pd
df = pd.DataFrame({'cliente': clientes, 'importe': importes, 'estado': estados.astype(object)})
print(df[['cliente', 'importe']].to_numpy())
print(df.to_numpy().dtype)
```

La selección de dos columnas produce una matriz numérica; incluir el estado textual produce dtype object en este ejemplo.

**Resultado**

```text
[[  1 100]
 [  2 250]
 [  1 150]
 [  3 400]
 [  2 300]
 [  3 200]]
object
```


### Convertir ndarray a Series o DataFrame

**Clave** `convertir-ndarray-a-series-o-dataframe`

**Definición** Los constructores de pandas aceptan arrays y permiten recuperar etiquetas explícitas.

**Búsqueda** Convertir ndarray a Series o DataFrame; crear un reporte con sucursales y trimestres.

**Para recordar** Asigna nombres coherentes con el significado de cada eje.

**Nota** Requiere pandas 2.2.3; las opciones de copia y los dtypes pueden variar con el tipo de columna y versión.

#### Crear un reporte con sucursales y trimestres

```python
import pandas as pd
df = pd.DataFrame(ventas, index=sucursales, columns=['T1', 'T2', 'T3', 'T4'])
print(df)
```

Asigna nombres coherentes con el significado de cada eje.

**Resultado**

```text
T1   T2   T3   T4
Norte   100  150  200  250
Centro  150  200  250  350
Sur     200  200  200  150
```


## Rendimiento y validación

**Clave** `rendimiento-y-validacion`


### Definición

**Clave** `definicion`

**Definición** La eficiencia de NumPy depende de vectorización, formas, tipos y copias. Antes de optimizar, verifica que las operaciones produzcan resultados equivalentes.

**Búsqueda** Rendimiento y validación; comparar una operación python y numpy; qué es y cómo se usa.

**Para recordar** No afirmes que una operación es más rápida sin medir en tu contexto.

#### Comparar una operación Python y NumPy

```python
from timeit import timeit
a = np.arange(1000)
t1 = timeit(lambda: [int(x) * 2 for x in a], number=100)
t2 = timeit(lambda: a * 2, number=100)
print(np.array_equal([int(x) * 2 for x in a], a * 2))
print(t1 >= 0 and t2 >= 0)
```

No afirmes que una operación es más rápida sin medir en tu contexto.

**Resultado**

```text
True
True
```


### Medir tiempos con timeit

**Clave** `medir-tiempos-con-timeit`

**Definición** timeit repite una operación y permite comparar tiempos bajo el mismo entorno. Los tiempos dependen del equipo y la carga.

**Búsqueda** Medir tiempos con timeit; comparar una operación python y numpy.

**Para recordar** Compara operaciones equivalentes; no uses un solo tiempo como conclusión general.

#### Comparar una operación Python y NumPy

```python
from timeit import timeit
a = np.arange(1000)
t1 = timeit(lambda: [int(x) * 2 for x in a], number=100)
t2 = timeit(lambda: a * 2, number=100)
print(np.array_equal([int(x) * 2 for x in a], a * 2))
print(t1 >= 0 and t2 >= 0)
```

Compara operaciones equivalentes; no uses un solo tiempo como conclusión general.

**Resultado**

```text
True
True
```


### Consumo de memoria y dtype

**Clave** `consumo-de-memoria-y-dtype`

**Definición** Reducir el ancho del tipo puede ahorrar memoria si mantiene el rango y precisión requeridos.

**Búsqueda** Consumo de memoria y dtype; comparar almacenamiento con dos dtypes.

**Para recordar** Comprueba límites antes de convertir y evita conversiones repetidas.

#### Comparar almacenamiento con dos dtypes

```python
a = np.arange(1000, dtype=np.int64)
b = a.astype(np.int32)
print(a.nbytes, b.nbytes, np.array_equal(a, b))
```

Comprueba límites antes de convertir y evita conversiones repetidas.

**Resultado**

```text
8000 4000 True
```


### Validación con numpy.testing

**Clave** `validacion-con-numpy-testing`

**Definición** assert_array_equal comprueba valores y forma; assert_allclose comprueba aproximación numérica con tolerancias.

**Búsqueda** Validación con numpy.testing; verificar totales y resultados aproximados.

**Para recordar** Una aserción fallida produce AssertionError; una prueba correcta no imprime nada por sí sola.

#### Verificar totales y resultados aproximados

```python
np.testing.assert_array_equal(ventas.sum(axis=0), [450, 550, 650, 750])
np.testing.assert_allclose(np.array([0.1 + 0.2]), [0.3])
print('Validación correcta')
```

Una aserción fallida produce AssertionError; una prueba correcta no imprime nada por sí sola.

**Resultado**

```text
Validación correcta
```


## Fuentes

Documentación oficial para ampliar las fichas y consultar parámetros, versiones, excepciones y variantes de cada función. Las explicaciones y datos de ejemplo son propios.


- [Guía de usuario: fundamentos, creación, indexación, tipos y ufuncs](https://numpy.org/doc/2.3/user/index.html)

- [Referencia Python y catálogo completo de funciones por tema](https://numpy.org/doc/2.3/reference/routines.html)

- [ndarray: propiedades, métodos, shape, dtype y memoria](https://numpy.org/doc/2.3/reference/arrays.ndarray.html)

- [Indexación básica, avanzada y máscaras](https://numpy.org/doc/2.3/user/basics.indexing.html)

- [Tipos de datos y conversiones](https://numpy.org/doc/2.3/user/basics.types.html)

- [Promoción de tipos en NumPy 2](https://numpy.org/doc/2.3/reference/arrays.promotion.html)

- [Broadcasting: reglas de compatibilidad de formas](https://numpy.org/doc/2.3/user/basics.broadcasting.html)

- [Copias y vistas: slicing, reshape y selección avanzada](https://numpy.org/doc/2.3/user/basics.copies.html)

- [Manipulación de arrays, dimensiones y combinación](https://numpy.org/doc/2.3/reference/routines.array-manipulation.html)

- [Ufuncs: métodos, argumentos where y out](https://numpy.org/doc/2.3/reference/ufuncs.html)

- [Funciones matemáticas y acumulados](https://numpy.org/doc/2.3/reference/routines.math.html)

- [Estadística, cuantiles, dispersión, correlación y NaN](https://numpy.org/doc/2.3/reference/routines.statistics.html)

- [Ordenamiento, búsqueda y conteo](https://numpy.org/doc/2.3/reference/routines.sort.html)

- [Operaciones de conjuntos y valores únicos](https://numpy.org/doc/2.3/reference/routines.set.html)

- [Ventanas móviles: sliding_window_view](https://numpy.org/doc/2.3/reference/generated/numpy.lib.stride_tricks.sliding_window_view.html)

- [Fechas, duraciones, NaT y días hábiles](https://numpy.org/doc/2.3/reference/arrays.datetime.html)

- [Funciones de texto np.strings](https://numpy.org/doc/2.3/reference/routines.strings.html)

- [Dtypes de texto fijo y variable](https://numpy.org/doc/2.3/user/basics.strings.html)

- [Generator: semilla, muestreo y distribuciones](https://numpy.org/doc/2.3/reference/random/generator.html)

- [Errores flotantes y errstate](https://numpy.org/doc/2.3/reference/routines.err.html)

- [Álgebra lineal y descomposiciones](https://numpy.org/doc/2.3/reference/routines.linalg.html)

- [Transformada discreta de Fourier](https://numpy.org/doc/2.3/reference/routines.fft.html)

- [Polinomios](https://numpy.org/doc/2.3/reference/routines.polynomials.html)

- [Arrays estructurados](https://numpy.org/doc/2.3/user/basics.rec.html)

- [Arrays enmascarados](https://numpy.org/doc/2.3/reference/maskedarray.html)

- [Entrada y salida de archivos](https://numpy.org/doc/2.3/reference/routines.io.html)

- [Pruebas de arrays y tolerancias](https://numpy.org/doc/2.3/reference/routines.testing.html)

- [Pandas Series.to_numpy (2.2)](https://pandas.pydata.org/pandas-docs/version/2.2/reference/api/pandas.Series.to_numpy.html)

- [Pandas DataFrame.to_numpy (2.2)](https://pandas.pydata.org/pandas-docs/version/2.2/reference/api/pandas.DataFrame.to_numpy.html)
