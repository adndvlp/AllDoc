# R

**Clave** `r`

**Área** Análisis de datos · Lenguajes (ubicación propuesta)

**Resumen** Lenguaje para programar, transformar datos, realizar análisis estadísticos y comunicar resultados reproducibles.

**Alcance** Fundamentos de R, manipulación y limpieza con base R y tidyverse, estadística, visualización, consultas a bases de datos, métricas de negocio, automatización y extensiones de modelado, series temporales, ingeniería y análisis especializado. Los últimos grupos son de ampliación, no requisitos universales de entrevistas junior.

**Entorno** R 4.3 o posterior, RStudio opcional. Los ejemplos de tidyverse usan dplyr 1.1 o posterior, tidyr 1.3 o posterior y versiones compatibles de los demás paquetes. `paquete::función` indica qué biblioteca proporciona la función. Las dependencias adicionales se indican en cada ficha. No se presupone que AllDoc disponga de un ejecutor R ni de esos paquetes. Los resultados se etiquetan como esperados: no se ejecutaron en un intérprete R durante la preparación.

## Datos compartidos

Dataset ficticio de comercio. Ejecuta la preparación una vez por sesión; cada ejemplo es independiente y parte de estos objetos originales, salvo que se indiquen pasos en el propio ejemplo. Los importes están en una única moneda ficticia. `clientes$id` es único; `pedidos$cliente_id` referencia a clientes. Un pedido puede contener varias líneas de `detalle`. Los ejemplos que usan otros datos los crean localmente.

```r
# Instalar una vez si faltan los paquetes:
# install.packages(c("dplyr", "tidyr", "tibble", "readr", "stringr",
#                    "lubridate", "ggplot2", "purrr", "forcats"))

library(dplyr)
library(tidyr)

clientes <- tibble::tibble(
  id = 1:5,
  nombre = c("Ana", "Luis", "Marta", "Pedro", "Sofia"),
  pais = c("MX", "MX", "ES", NA_character_, "ES"),
  alta = as.Date(c("2026-01-01", "2026-01-10", "2026-02-01",
                  "2026-02-15", "2026-03-01"))
)
pedidos <- tibble::tibble(
  id = 101:106,
  cliente_id = c(1L, 1L, 2L, 3L, 3L, 2L),
  fecha = as.Date(c("2026-03-01", "2026-03-02", "2026-03-03",
                   "2026-04-01", "2026-04-02", "2026-04-03")),
  monto = c(100, 200, 300, 150, 50, 100),
  estado = c("completado", "completado", "completado", "cancelado",
             "completado", "completado"),
  cupon = c(NA_character_, "A10", NA_character_, NA_character_, "B5", "A10")
)
productos <- tibble::tibble(
  id = 1:3, producto = c("Mouse", "Teclado", "Monitor"),
  categoria = c("Accesorios", "Accesorios", "Pantallas"),
  precio = c(50, 100, 300)
)
detalle <- tibble::tibble(
  pedido_id = c(101L, 102L, 102L, 103L, 104L, 105L, 106L),
  producto_id = c(2L, 2L, 1L, 3L, 1L, 1L, 2L),
  cantidad = c(1, 1, 2, 1, 3, 1, 1),
  precio_unitario = c(100, 100, 50, 300, 50, 50, 100)
)
leads <- tibble::tibble(
  id = 1:5, email = c("ana@ejemplo.mx", "luis@ejemplo.mx",
    "ana@ejemplo.mx", NA_character_, "marta@ejemplo.mx"),
  canal = c("ads", "organico", "referido", "ads", "ads")
)
```

En los resultados, un vector se representa como `c(...)`; una tabla pequeña se describe por columnas y filas. Si no se especifica orden, no se promete uno. Los ejemplos que instalan paquetes, escriben archivos, generan gráficos o inician servicios necesitan los permisos correspondientes.

## Entorno y paquetes

**Clave** `entorno-y-paquetes`

### Definición

**Clave** `definicion`

**Definición** R interpreta código y devuelve objetos o resultados; una sesión conserva los objetos creados hasta que se elimina o reinicia.

**Búsqueda** R, consola, script, ejecutar código

**Para recordar** El archivo .R guarda instrucciones; la sesión guarda objetos.

#### Ejecutar una operación

```r
print(100 + 20)
```

`print()` muestra el resultado.

**Resultado esperado** `120`.

### RStudio y proyectos

**Clave** `rstudio-y-proyectos`

**Definición** Un proyecto de RStudio organiza archivos y establece un directorio de trabajo asociado al proyecto.

**Búsqueda** RStudio, proyecto, working directory

**Para recordar** Usa rutas relativas al proyecto.

**Nota** RStudio es un IDE opcional, no el lenguaje R.

#### Consultar la carpeta activa

```r
getwd()
```

`getwd()` no cambia la carpeta.

**Resultado esperado** Ruta absoluta del directorio actual; depende del entorno.

### Instalar y cargar paquetes

**Clave** `instalar-y-cargar-paquetes`

**Definición** `install.packages()` instala una biblioteca; `library()` la carga para usar sus funciones en la sesión.

**Búsqueda** CRAN, instalar dplyr, library

**Para recordar** Instala una vez; carga en cada sesión.

#### Cargar dplyr

```r
# install.packages("dplyr")
library(dplyr)
```

Quita el comentario solo cuando necesites instalarlo.

**Resultado esperado** Paquete cargado si está instalado.

### Namespace y ayuda

**Clave** `namespace-y-ayuda`

**Definición** `::` accede a una función exportada de un paquete sin adjuntarlo; `?` abre su ayuda.

**Búsqueda** ayuda, namespace, conflictos, documentación

**Para recordar** Usa `paquete::función` cuando haya nombres iguales.

#### Consultar ayuda de una función

```r
?dplyr::filter
```

El prefijo identifica la biblioteca.

**Resultado esperado** Página de ayuda de `filter()` en la interfaz disponible.

### Versiones

**Clave** `versiones`

**Definición** `R.version.string`, `packageVersion()` y `sessionInfo()` permiten registrar el entorno.

**Búsqueda** versión R, paquetes, sesión

**Para recordar** Registra versiones al compartir análisis.

#### Consultar versión de dplyr

```r
packageVersion("dplyr")
```

El resultado depende de la instalación.

**Resultado esperado** Versión instalada, por ejemplo 1.1.4.

## Variables y operadores

**Clave** `variables-y-operadores`

### Definición

**Clave** `definicion`

**Definición** Una variable es un nombre asociado a un objeto; `<-` asigna un valor.

**Búsqueda** variable, asignación, objeto

**Para recordar** `<-` asigna; `==` compara.

#### Guardar un importe

```r
venta <- 100
venta
```

La última expresión recupera el objeto.

**Resultado esperado** `100`.

### Asignación y comentarios

**Clave** `asignacion-y-comentarios`

**Definición** `=` también puede asignar en muchos contextos; `#` inicia un comentario hasta el final de la línea.

**Búsqueda** asignar, comentario, print

**Para recordar** Prefiere `<-` para objetos y `=` para argumentos nombrados.

#### Documentar un cálculo

```r
# Importe antes de impuestos
precio <- 100
print(precio)
```

El comentario no se ejecuta.

**Resultado esperado** `100`.

### Operadores aritméticos

**Clave** `operadores-aritmeticos`

**Definición** `+`, `-`, `*`, `/`, `^`, `%%` y `%/%` calculan suma, resta, producto, división, potencia, resto y cociente entero.

**Búsqueda** aritmética, módulo, división entera

**Para recordar** Usa paréntesis para expresar prioridad.

#### Calcular cajas completas y sobrantes

```r
c(cajas = 17 %/% 5, sobrantes = 17 %% 5)
```

`%/%` y `%%` separan cociente y resto.

**Resultado esperado** `c(cajas = 3, sobrantes = 2)`.

### Comparaciones

**Clave** `comparaciones`

**Definición** `==`, `!=`, `<`, `<=`, `>` y `>=` devuelven valores lógicos.

**Búsqueda** igual, diferente, mayor, menor

**Para recordar** Comparar no modifica el objeto.

#### Comprobar una meta

```r
200 >= 150
```

La meta se incluye por usar `>=`.

**Resultado esperado** `TRUE`.

### Operadores lógicos

**Clave** `operadores-logicos`

**Definición** `&`, `|` y `!` combinan o niegan condiciones elemento a elemento; `&&` y `||` evalúan condiciones escalares con cortocircuito.

**Búsqueda** AND OR NOT, condiciones múltiples

**Para recordar** Para filtrar vectores usa `&` y `|`; para condiciones escalares, `&&` y `||`.

#### Evaluar un rango

```r
x <- c(50, 100, 200)
x >= 100 & x <= 150
```

Las dos condiciones deben cumplirse.

**Resultado esperado** `c(FALSE, TRUE, FALSE)`.

## Tipos de datos

**Clave** `tipos-de-datos`

### Definición

**Clave** `definicion`

**Definición** R distingue el tipo interno de un objeto de su clase, que determina comportamientos como impresión y métodos.

**Búsqueda** typeof, class, tipos

**Para recordar** `typeof()` inspecciona almacenamiento; `class()` describe comportamiento.

#### Inspeccionar un número

```r
c(tipo = typeof(10), clase = class(10))
```

Un literal decimal o entero sin `L` es double.

**Resultado esperado** `c(tipo = "double", clase = "numeric")`.

### Numeric e integer

**Clave** `numeric-e-integer`

**Definición** Los doubles representan números de punto flotante; los integer se crean con sufijo `L`.

**Búsqueda** numeric, double, integer, números

**Para recordar** `1L` y `1` pueden tener distinto tipo.

#### Distinguir almacenamiento

```r
c(typeof(1L), typeof(1))
```

El sufijo L fuerza entero.

**Resultado esperado** `c("integer", "double")`.

### Character y logical

**Clave** `character-y-logical`

**Definición** Character guarda cadenas; logical representa `TRUE`, `FALSE` y valores faltantes lógicos.

**Búsqueda** texto, booleano, TRUE, FALSE

**Para recordar** Las comillas convierten un literal en texto.

#### Comprobar el tipo de una condición

```r
typeof(100 > 50)
```

La comparación devuelve un lógico.

**Resultado esperado** `"logical"`.

### Conversión y coerción

**Clave** `conversion-y-coercion`

**Definición** `as.numeric()`, `as.integer()`, `as.character()` y `as.logical()` convierten tipos; R también puede convertirlos automáticamente.

**Búsqueda** cast, convertir, coerción

**Para recordar** Comprueba conversiones inválidas y pérdida de precisión.

**Nota** Un texto no numérico produce NA y advertencia. Un factor requiere convertir sus etiquetas, no sus códigos.

#### Convertir importes de texto

```r
as.numeric(c("10", "20.5"))
```

El texto debe representar números válidos.

**Resultado esperado** `c(10, 20.5)`.

### Date y POSIXct

**Clave** `date-y-posixct`

**Definición** `Date` representa fechas; `POSIXct` instantes con hora y zona horaria.

**Búsqueda** fecha, timestamp, timezone

**Para recordar** No compares cadenas de fechas si necesitas aritmética temporal.

#### Crear una fecha y una hora

```r
as.Date("2026-03-01")
as.POSIXct("2026-03-01 12:00:00", tz = "UTC")
```

La zona es explícita.

**Resultado esperado** Fecha 2026-03-01 e instante 2026-03-01 12:00:00 UTC.

## Vectores

**Clave** `vectores`

### Definición

**Clave** `definicion`

**Definición** Un vector atómico contiene elementos del mismo tipo. Es la unidad básica de cálculo de R.

**Búsqueda** vector, c, colección

**Para recordar** `c()` combina elementos; un vector no es una lista heterogénea.

#### Crear importes

```r
c(100, 200, 300)
```

Los tres elementos son numéricos.

**Resultado esperado** `c(100, 200, 300)`.

### Secuencias y repetición

**Clave** `secuencias-y-repeticion`

**Definición** `:` y `seq()` generan secuencias; `rep()` repite valores.

**Búsqueda** seq, rep, rango

**Para recordar** `seq()` controla paso y longitud.

#### Generar semanas

```r
seq(2, 8, by = 2)
rep(c("A", "B"), each = 2)
```

`each` repite cada elemento.

**Resultado esperado** `c(2, 4, 6, 8)` y `c("A", "A", "B", "B")`.

### Nombres y longitud

**Clave** `nombres-y-longitud`

**Definición** `names()` asigna etiquetas a elementos; `length()` cuenta elementos.

**Búsqueda** names, length, vector nombrado

**Para recordar** El nombre no cambia la posición del elemento.

#### Etiquetar ventas

```r
x <- c(MX = 300, ES = 100)
length(x)
x["ES"]
```

El índice puede ser un nombre.

**Resultado esperado** Longitud 2 y vector nombrado `ES = 100`.

### Vectorización y reciclaje

**Clave** `vectorizacion-y-reciclaje`

**Definición** Las operaciones vectorizadas actúan elemento a elemento; los vectores cortos pueden repetirse para alcanzar la longitud del largo.

**Búsqueda** vectorizar, recycling, broadcasting

**Para recordar** No confundas reciclaje con alineación por nombre.

**Nota** Si las longitudes no son múltiplos, muchas operaciones base advierten; dplyr impone reglas más estrictas.

#### Aplicar impuesto a varios importes

```r
c(100, 200, 300) * 1.16
```

El escalar se reutiliza para cada importe.

**Resultado esperado** `c(116, 232, 348)` (aprox.).

## Listas, matrices y arrays

**Clave** `listas-matrices-y-arrays`

### Definición

**Clave** `definicion`

**Definición** Una lista puede contener objetos de tipos y longitudes diferentes. Una matriz y un array atómico organizan elementos homogéneos por dimensiones.

**Búsqueda** list, matrix, array

**Para recordar** Lista: objetos heterogéneos; matriz: dos dimensiones.

#### Guardar datos heterogéneos

```r
list(nombre = "Ana", ventas = c(100, 200))
```

Cada componente conserva su tipo.

**Resultado esperado** Lista con nombre Ana y vector de dos ventas.

### Matrices

**Clave** `matrices`

**Definición** `matrix()` crea una estructura bidimensional; `nrow()`, `ncol()` y `dim()` inspeccionan dimensiones.

**Búsqueda** matrix, filas, columnas, dim

**Para recordar** R rellena matrices por columnas salvo `byrow = TRUE`.

#### Construir ventas por sucursal

```r
m <- matrix(1:6, nrow = 2, byrow = TRUE)
m
```

`byrow` cambia el orden de llenado.

**Resultado esperado** Filas `(1,2,3)` y `(4,5,6)`.

### Arrays

**Clave** `arrays`

**Definición** `array()` organiza datos en dos o más dimensiones; los índices siguen el orden de `dim`.

**Búsqueda** array, dimensión, 3D

**Para recordar** Cada dimensión necesita su propio índice.

#### Consultar una capa

```r
a <- array(1:8, dim = c(2, 2, 2))
a[1, 2, 2]
```

Se extrae fila 1, columna 2, capa 2.

**Resultado esperado** `7`.

### Álgebra matricial

**Clave** `algebra-matricial`

**Definición** `*` multiplica elemento a elemento y `%*%` realiza producto matricial; `t()` transpone.

**Búsqueda** producto matricial, transponer

**Para recordar** Las dimensiones internas deben coincidir para `%*%`.

#### Calcular un total ponderado

```r
matrix(c(2, 3), nrow = 1) %*% matrix(c(10, 20), ncol = 1)
```

Multiplica cantidades por precios y suma.

**Resultado esperado** Matriz 1×1 con `80`.

## Data frames y tibbles

**Clave** `data-frames-y-tibbles`

### Definición

**Clave** `definicion`

**Definición** Un data frame es una tabla de columnas con igual número de filas; un tibble es una variante con impresión y reglas de selección más consistentes.

**Búsqueda** data.frame, tibble, tabla

**Para recordar** Cada columna puede tener su propio tipo.

#### Crear una tabla pequeña

```r
data.frame(id = 1:2, monto = c(100, 200))
```

Cada argumento nombrado crea una columna.

**Resultado esperado** Columnas id y monto; filas `(1,100)`, `(2,200)`.

### Tibble y tribble

**Clave** `tibble-y-tribble`

**Definición** `tibble()` crea columnas; `tribble()` permite escribir filas de una tabla pequeña.

**Búsqueda** tibble, tribble, tidyverse

**Para recordar** Los nombres con `~` en tribble son encabezados.

#### Escribir una tabla por filas

```r
tibble::tribble(
  ~pais, ~ventas,
  "MX", 300,
  "ES", 100
)
```

Cada línea de datos representa una fila.

**Resultado esperado** Filas `(MX,300)` y `(ES,100)`.

### Inspección de tablas

**Clave** `inspeccion-de-tablas`

**Definición** `head()`, `tail()`, `str()`, `glimpse()`, `dim()` y `names()` permiten revisar datos antes de analizarlos.

**Búsqueda** inspección, columnas, filas, esquema

**Para recordar** Inspecciona tipos y dimensiones antes de transformar.

#### Ver tamaño y nombres

```r
dim(pedidos)
names(pedidos)
```

`dim()` devuelve filas y columnas en ese orden.

**Resultado esperado** 6 filas, 6 columnas: id, cliente_id, fecha, monto, estado, cupon.

## Indexación

**Clave** `indexacion`

### Definición

**Clave** `definicion`

**Definición** R usa índices desde 1 para extraer elementos, filas o columnas.

**Búsqueda** index, subset, posición

**Para recordar** El primer elemento es `[1]`, no `[0]`.

#### Extraer un importe

```r
x <- c(100, 200, 300)
x[2]
```

El índice señala la segunda posición.

**Resultado esperado** `200`.

### Índices positivos y negativos

**Clave** `indices-positivos-y-negativos`

**Definición** Los índices positivos incluyen posiciones; los negativos las excluyen.

**Búsqueda** selección por posición, excluir

**Para recordar** No mezcles positivos y negativos salvo cero.

#### Eliminar el segundo elemento de la vista

```r
c(100, 200, 300)[-2]
```

La selección no modifica el vector original.

**Resultado esperado** `c(100, 300)`.

### Índices lógicos

**Clave** `indices-logicos`

**Definición** Un vector lógico selecciona las posiciones TRUE; NA puede producir una posición faltante.

**Búsqueda** máscara, boolean indexing, subset

**Para recordar** Filtra NA explícitamente cuando sea necesario.

#### Seleccionar importes grandes

```r
x <- c(100, 200, 300)
x[x >= 200]
```

La comparación construye la máscara.

**Resultado esperado** `c(200, 300)`.

### Corchetes dobles y dólar

**Clave** `corchetes-dobles-y-dolar`

**Definición** `[[ ]]` extrae un único componente; `$` accede por nombre; `[ ]` conserva una subestructura.

**Búsqueda** [[, $, acceder columna, lista

**Para recordar** En una lista, `[1]` es lista y `[[1]]` es su contenido.

#### Extraer una columna como vector

```r
pedidos[["monto"]]
```

`[[` extrae el contenido de la columna.

**Resultado esperado** `c(100, 200, 300, 150, 50, 100)`.

### Filas y columnas

**Clave** `filas-y-columnas`

**Definición** `tabla[filas, columnas]` selecciona ambos ejes; `drop = FALSE` conserva dimensiones en data frames base.

**Búsqueda** indexación 2D, filas columnas

**Para recordar** La coma separa filas de columnas.

#### Seleccionar dos filas y una columna

```r
pedidos[1:2, "monto"]
```

Un tibble conserva su estructura tabular.

**Resultado esperado** Tibble de 2×1 con montos 100 y 200.

## Valores faltantes

**Clave** `valores-faltantes`

### Definición

**Clave** `definicion`

**Definición** `NA` representa un valor faltante; `NULL` representa ausencia de objeto o componente; `NaN` es un resultado numérico indefinido.

**Búsqueda** NA, NULL, NaN, missing

**Para recordar** No uses `x == NA`; usa `is.na(x)`.

#### Detectar países faltantes

```r
is.na(clientes$pais)
```

La posición TRUE corresponde a Pedro.

**Resultado esperado** `c(FALSE, FALSE, FALSE, TRUE, FALSE)`.

### NA, NaN e Inf

**Clave** `na-nan-e-inf`

**Definición** `is.na()` detecta NA y NaN; `is.nan()` solo NaN; `is.finite()` excluye NA, NaN e infinitos.

**Búsqueda** infinito, NaN, is.finite

**Para recordar** `Inf` no es NA.

#### Distinguir resultados inválidos

```r
x <- c(NA_real_, 0/0, 1/0, 5)
is.finite(x)
```

Solo 5 es finito.

**Resultado esperado** `c(FALSE, FALSE, FALSE, TRUE)`.

### Eliminar o ignorar NA

**Clave** `eliminar-o-ignorar-na`

**Definición** `na.omit()` elimina observaciones faltantes; `na.rm = TRUE` las excluye de una agregación compatible.

**Búsqueda** na.rm, na.omit, complete.cases

**Para recordar** Ignorar NA cambia el denominador del cálculo.

#### Calcular una media disponible

```r
mean(c(10, NA, 20), na.rm = TRUE)
```

Se promedian solo 10 y 20.

**Resultado esperado** `15`.

### NULL

**Clave** `null`

**Definición** `is.null()` comprueba ausencia de objeto; una asignación NULL a una columna puede eliminarla.

**Búsqueda** NULL, lista vacía, eliminar columna

**Para recordar** NULL no es lo mismo que NA ni que un vector vacío.

#### Comprobar ausencia

```r
c(is.null(NULL), is.null(NA), is.null(numeric(0)))
```

Solo el primer objeto es NULL.

**Resultado esperado** `c(TRUE, FALSE, FALSE)`.

## Factores y categorías

**Clave** `factores-y-categorias`

### Definición

**Clave** `definicion`

**Definición** Un factor representa categorías con niveles definidos; un factor ordenado añade una relación de orden.

**Búsqueda** factor, levels, categórico

**Para recordar** Los niveles no son los valores numéricos de las etiquetas.

#### Crear categorías de estado

```r
factor(c("bajo", "alto", "bajo"), levels = c("bajo", "alto"))
```

`levels` fija el catálogo.

**Resultado esperado** Tres valores con niveles bajo y alto.

### Factores ordenados

**Clave** `factores-ordenados`

**Definición** `ordered()` representa categorías ordinales.

**Búsqueda** ordinal, ordered, niveles

**Para recordar** Ordena por significado, no alfabéticamente.

#### Definir niveles de satisfacción

```r
x <- ordered(c("alto", "bajo"), levels = c("bajo", "medio", "alto"))
x[1] > x[2]
```

Alto supera a bajo según los niveles.

**Resultado esperado** `TRUE`.

### forcats

**Clave** `forcats`

**Definición** `forcats` permite reordenar, renombrar y agrupar niveles.

**Búsqueda** fct_relevel, fct_reorder, fct_lump

**Para recordar** Cambia niveles sin modificar el resto de los datos.

**Nota** Requiere forcats.

#### Colocar una categoría primero

```r
forcats::fct_relevel(factor(c("MX", "ES")), "MX") |> levels()
```

`fct_relevel()` modifica el orden de niveles.

**Resultado esperado** `c("MX", "ES")`.

## Condicionales y control de flujo

**Clave** `condicionales-y-control-de-flujo`

### Definición

**Clave** `definicion`

**Definición** `if` y `else` eligen qué instrucciones ejecutar según una condición de longitud uno.

**Búsqueda** if, else, condición

**Para recordar** `if` no procesa un vector de condiciones elemento a elemento.

#### Evaluar una meta de venta

```r
venta <- 120
if (venta >= 100) "meta" else "pendiente"
```

Solo se ejecuta la rama elegida.

**Resultado esperado** `"meta"`.

### else if y switch

**Clave** `else-if-y-switch`

**Definición** `else if` prueba condiciones sucesivas; `switch()` selecciona alternativas por nombre o posición.

**Búsqueda** else if, switch, ramas

**Para recordar** Evalúa primero las condiciones más específicas.

#### Elegir una tasa por país

```r
pais <- "MX"
switch(pais, MX = 0.16, ES = 0.21, NA_real_)
```

Se elige la alternativa MX.

**Resultado esperado** `0.16`.

### ifelse y if_else

**Clave** `ifelse-y-if-else`

**Definición** `ifelse()` y `dplyr::if_else()` seleccionan un valor por elemento; `if_else()` controla tipos de salida con mayor rigor.

**Búsqueda** condicional vectorial, ifelse

**Para recordar** Usa una condición por fila para clasificar columnas.

#### Clasificar importes

```r
dplyr::if_else(c(50, 200) >= 100, "alto", "bajo")
```

Se evalúa cada importe.

**Resultado esperado** `c("bajo", "alto")`.

### for y while

**Clave** `for-y-while`

**Definición** `for` recorre elementos de una secuencia; `while` repite mientras se cumpla una condición.

**Búsqueda** loop, bucle, iteración

**Para recordar** Evita while sin condición de salida.

#### Acumular tres ventas

```r
total <- 0
for (x in c(100, 200, 50)) total <- total + x
total
```

Cada iteración actualiza el total.

**Resultado esperado** `350`.

### break y next

**Clave** `break-y-next`

**Definición** `break` termina un bucle; `next` salta a la siguiente iteración.

**Búsqueda** salir bucle, continuar

**Para recordar** `next` no termina todo el ciclo.

#### Ignorar un importe inválido

```r
total <- 0
for (x in c(10, -1, 20)) {
  if (x < 0) next
  total <- total + x
}
total
```

Se omite el negativo.

**Resultado esperado** `30`.

## Funciones y alcance

**Clave** `funciones-y-alcance`

### Definición

**Clave** `definicion`

**Definición** `function()` define una operación reutilizable con argumentos y un resultado. R devuelve la última expresión evaluada salvo retorno explícito.

**Búsqueda** function, return, argumentos

**Para recordar** Define una vez y llama tantas veces como necesites.

#### Calcular un impuesto

```r
con_impuesto <- function(monto) monto * 1.16
con_impuesto(100)
```

El argumento se sustituye por 100.

**Resultado esperado** `116` (aprox.).

### Argumentos y valores por defecto

**Clave** `argumentos-y-valores-por-defecto`

**Definición** Los parámetros pueden tener valores predeterminados; los argumentos nombrados permiten seleccionar qué parámetro modificar.

**Búsqueda** default, argumentos nombrados, dots

**Para recordar** Nombra los argumentos cuando no sean evidentes.

#### Cambiar la tasa

```r
neto <- function(monto, tasa = 0.1) monto * (1 - tasa)
neto(200, tasa = 0.25)
```

La llamada reemplaza la tasa por defecto.

**Resultado esperado** `150`.

### Return y funciones anónimas

**Clave** `return-y-funciones-anonimas`

**Definición** `return()` termina una función devolviendo un objeto; una función anónima se crea sin asignarle nombre.

**Búsqueda** return, lambda, función anónima

**Para recordar** El retorno temprano evita ejecutar lo restante.

#### Controlar división por cero

```r
ratio <- function(a, b) {
  if (b == 0) return(NA_real_)
  a / b
}
ratio(5, 0)
```

Se retorna antes de dividir.

**Resultado esperado** `NA_real_`.

### Environments y lexical scoping

**Clave** `environments-y-lexical-scoping`

**Definición** Un entorno contiene asociaciones entre nombres y objetos. Las funciones buscan nombres libres en el entorno en que fueron definidas.

**Búsqueda** environment, scope, closure, alcance

**Para recordar** Una closure conserva acceso a su entorno de creación.

#### Crear una función con tasa fija

```r
crear_tasa <- function(tasa) function(x) x * tasa
iva <- crear_tasa(0.16)
iva(100)
```

La función interna conserva tasa.

**Resultado esperado** `16`.

## Iteración funcional

**Clave** `iteracion-funcional`

### Definición

**Clave** `definicion`

**Definición** Las funciones de la familia apply y purrr aplican operaciones repetidas sobre estructuras sin escribir el bucle manualmente.

**Búsqueda** apply, map, programación funcional

**Para recordar** Elige según estructura de entrada y tipo de salida.

#### Aplicar una función a un vector

```r
lapply(c(10, 20), function(x) x * 2)
```

`lapply()` siempre devuelve lista.

**Resultado esperado** Lista con 20 y 40.

### apply

**Clave** `apply`

**Definición** `apply()` aplica una función a márgenes de una matriz o array.

**Búsqueda** apply, MARGIN, filas, columnas

**Para recordar** 1 son filas; 2 son columnas.

**Nota** Un data frame mixto puede convertirse a matriz de texto: usa otras funciones para tablas heterogéneas.

#### Sumar columnas

```r
apply(matrix(1:4, nrow = 2), 2, sum)
```

Cada columna se suma por separado.

**Resultado esperado** `c(3, 7)`.

### lapply, sapply y vapply

**Clave** `lapply-sapply-y-vapply`

**Definición** `sapply()` intenta simplificar una lista; `vapply()` exige un tipo de salida explícito.

**Búsqueda** sapply, vapply, FUN.VALUE

**Para recordar** Usa vapply si necesitas una salida predecible.

#### Contar caracteres

```r
vapply(c("MX", "USA"), nchar, integer(1))
```

`integer(1)` exige un entero por elemento.

**Resultado esperado** Vector entero nombrado MX=2, USA=3.

### purrr::map

**Clave** `purrr-map`

**Definición** `map()` devuelve lista; `map_dbl()`, `map_chr()` y `map_int()` devuelven vectores del tipo indicado.

**Búsqueda** purrr, map_dbl, map2

**Para recordar** El sufijo expresa el tipo de salida.

**Nota** Requiere purrr.

#### Sumar varias listas de ventas

```r
purrr::map_dbl(list(c(10, 20), c(5, 7)), sum)
```

Cada lista se reduce a un número.

**Resultado esperado** `c(30, 12)`.

### Reduce, Filter y Map

**Clave** `reduce-filter-y-map`

**Definición** `Reduce()` combina elementos acumulativamente; `Filter()` selecciona por predicado; `Map()` aplica una función en paralelo y devuelve lista.

**Búsqueda** reduce, filter, map, función de orden superior

**Para recordar** Reduce combina; Filter selecciona; Map transforma.

#### Combinar ventas y filtrar negativos

```r
Reduce(`+`, c(10, 20, 30))
Filter(function(x) x > 0, c(10, -2, 5))
```

Cada función cumple un propósito distinto.

**Resultado esperado** `60` y `c(10, 5)`.

## Importación y exportación

**Clave** `importacion-y-exportacion`

### Definición

**Clave** `definicion`

**Definición** R lee archivos a objetos tabulares y exporta resultados a formatos intercambiables.

**Búsqueda** importar datos, CSV, exportar

**Para recordar** Declara separadores, tipos y codificación cuando sea necesario.

**Nota** Requiere readr.

#### Leer un CSV pequeño

```r
readr::read_csv(I("id,monto\n1,100\n2,200"), show_col_types = FALSE)
```

`I()` indica texto literal en vez de ruta.

**Resultado esperado** Tabla 2×2: `(1,100)`, `(2,200)`.

### CSV y tipos de columnas

**Clave** `csv-y-tipos-de-columnas`

**Definición** `read_csv()` admite `col_types`, `na` y `locale`; `read.csv()` es la alternativa base.

**Búsqueda** read.csv, read_csv, tipos, separador

**Para recordar** Conserva los identificadores con ceros a la izquierda como texto.

#### Leer códigos de cliente

```r
readr::read_csv(I("codigo,monto\n001,100"),
  col_types = readr::cols(codigo = readr::col_character()))
```

La columna codigo no se convierte en número.

**Resultado esperado** Fila codigo `"001"`, monto 100.

### Excel

**Clave** `excel`

**Definición** `readxl::read_excel()` lee hojas y rangos de un libro; writexl permite crearlos.

**Búsqueda** xlsx, sheet, range, Excel

**Para recordar** Selecciona la hoja y revisa los tipos inferidos.

**Nota** Requiere readxl y writexl.

#### Crear y leer una hoja de prueba

```r
ruta <- tempfile(fileext = ".xlsx")
writexl::write_xlsx(list(Ventas = data.frame(monto = c(10, 20))), ruta)
readxl::read_excel(ruta, sheet = "Ventas")
```

Se usa un archivo temporal.

**Resultado esperado** Tabla con monto 10 y 20.

### JSON

**Clave** `json`

**Definición** `jsonlite::fromJSON()` convierte JSON en objetos R; `toJSON()` serializa objetos.

**Búsqueda** JSON, API, datos anidados

**Para recordar** Verifica si la salida es lista o data frame.

**Nota** Requiere jsonlite.

#### Leer registros JSON

```r
jsonlite::fromJSON('[{"id":1,"monto":100},{"id":2,"monto":200}]')
```

El arreglo de objetos homogéneos se simplifica a tabla.

**Resultado esperado** Data frame con dos filas `(1,100)` y `(2,200)`.

### Exportar CSV y RDS

**Clave** `exportar-csv-y-rds`

**Definición** `write_csv()` exporta tablas; `saveRDS()` y `readRDS()` guardan y recuperan un objeto con su clase.

**Búsqueda** write.csv, write_csv, RDS, guardar

**Para recordar** CSV es interoperable; RDS conserva atributos de R.

#### Guardar y recuperar un resumen

```r
ruta <- tempfile(fileext = ".rds")
saveRDS(pedidos, ruta)
identical(readRDS(ruta), pedidos)
```

La ida y vuelta conserva el objeto.

**Resultado esperado** `TRUE`.

## Pipes y dplyr

**Clave** `pipes-y-dplyr`

### Definición

**Clave** `definicion`

**Definición** El pipe `|>` pasa el resultado de una expresión a la siguiente función, normalmente como primer argumento.

**Búsqueda** pipe, |> , tidyverse, cadena

**Para recordar** Lee las operaciones de izquierda a derecha.

#### Calcular un total en dos pasos

```r
c(10, 20, 30) |> sum()
```

El vector pasa a sum.

**Resultado esperado** `60`.

### Pipe base y magrittr

**Clave** `pipe-base-y-magrittr`

**Definición** `|>` pertenece a R base; `%>%` es de magrittr y permite usar el marcador `.`.

**Búsqueda** %>%, pipe nativo, placeholder

**Para recordar** No todos los usos de `.` se traducen directamente a `|>`.

**Nota** Pipe base desde R 4.1.

#### Encadenar dos operaciones

```r
c(10, 20) |> mean() |> round(1)
```

La salida de mean entra en round.

**Resultado esperado** `15`.

### Guardar transformaciones

**Clave** `guardar-transformaciones`

**Definición** Los verbos de dplyr normalmente devuelven un nuevo objeto; para conservarlo se asigna a un nombre.

**Búsqueda** pipeline, asignar resultado

**Para recordar** Sin `<-` no reemplazas la tabla original.

#### Guardar pedidos completados

```r
validos <- pedidos |> filter(estado == "completado")
nrow(validos)
nrow(pedidos)
```

La tabla original conserva sus seis filas.

**Resultado esperado** 5 y 6.

## Selección de columnas

**Clave** `seleccion-de-columnas`

### Definición

**Clave** `definicion`

**Definición** `select()` elige columnas de una tabla sin filtrar sus filas.

**Búsqueda** select, columnas, proyección

**Para recordar** Seleccionar columnas no elimina registros.

#### Mostrar identificador e importe

```r
pedidos |> select(id, monto)
```

El orden de columnas sigue la selección.

**Resultado esperado** 6 filas; columnas id y monto: `(101,100)` a `(106,100)` con montos 100, 200, 300, 150, 50, 100.

### Excluir y seleccionar por patrón

**Clave** `excluir-y-seleccionar-por-patron`

**Definición** `-`, `starts_with()`, `ends_with()`, `contains()` y `where()` seleccionan por exclusión, nombre o tipo.

**Búsqueda** tidyselect, starts_with, where

**Para recordar** `where(is.numeric)` selecciona columnas numéricas, no filas.

#### Mostrar columnas numéricas

```r
pedidos |> select(where(is.numeric)) |> names()
```

Date no es una columna numérica según is.numeric.

**Resultado esperado** `c("id", "cliente_id", "monto")`.

### rename y relocate

**Clave** `rename-y-relocate`

**Definición** `rename()` cambia nombres; `relocate()` mueve columnas.

**Búsqueda** renombrar, mover columna, alias

**Para recordar** En rename usa `nuevo = anterior`.

#### Renombrar el importe

```r
pedidos |> rename(importe = monto) |> names()
```

No cambia valores.

**Resultado esperado** id, cliente_id, fecha, importe, estado, cupon.

### all_of y any_of

**Clave** `all-of-y-any-of`

**Definición** `all_of()` exige que existan todos los nombres de un vector; `any_of()` ignora los ausentes.

**Búsqueda** selección dinámica, all_of, any_of

**Para recordar** Usa all_of para detectar cambios de esquema.

#### Seleccionar nombres almacenados

```r
cols <- c("id", "monto")
pedidos |> select(all_of(cols))
```

El vector cols define la selección.

**Resultado esperado** 6 filas, dos columnas id y monto.

## Filtrar filas

**Clave** `filtrar-filas`

### Definición

**Clave** `definicion`

**Definición** `filter()` conserva filas cuyas condiciones son TRUE; descarta FALSE y NA.

**Búsqueda** filter, WHERE, condiciones

**Para recordar** El filtro opera sobre filas y no cambia las columnas.

#### Conservar pedidos completados

```r
pedidos |> filter(estado == "completado") |> pull(id)
```

`pull()` extrae la columna como vector.

**Resultado esperado** `c(101, 102, 103, 105, 106)`.

### AND, OR y NOT

**Clave** `and-or-y-not`

**Definición** Usa `&`, `|`, `!` o varias condiciones separadas por comas (AND).

**Búsqueda** filtros múltiples, AND, OR, NOT

**Para recordar** Agrupa OR con paréntesis si se combina con AND.

#### Filtrar por estado e importe

```r
pedidos |> filter(estado == "completado", monto >= 200) |> pull(id)
```

Ambas condiciones deben ser verdaderas.

**Resultado esperado** `c(102, 103)`.

### Pertenencia y rangos

**Clave** `pertenencia-y-rangos`

**Definición** `%in%` comprueba pertenencia; `between()` incluye ambos límites.

**Búsqueda** IN, BETWEEN, %in%, rango

**Para recordar** `between(x, a, b)` incluye a y b.

#### Seleccionar pedidos de dos clientes en un rango

```r
pedidos |> filter(cliente_id %in% c(1, 2), between(monto, 100, 200)) |> pull(id)
```

Combina una lista de clientes y un intervalo.

**Resultado esperado** `c(101, 102, 106)`.

### Filtrar NA

**Clave** `filtrar-na`

**Definición** `is.na()` y `!is.na()` seleccionan faltantes y valores presentes.

**Búsqueda** IS NULL, IS NOT NULL, NA

**Para recordar** `filter()` descarta condiciones NA, no toda fila que contenga NA.

#### Encontrar pedidos con cupón

```r
pedidos |> filter(!is.na(cupon)) |> pull(id)
```

Solo se exige cupón informado.

**Resultado esperado** `c(102, 105, 106)`.

## Ordenamiento y primeras filas

**Clave** `ordenamiento-y-primeras-filas`

### Definición

**Clave** `definicion`

**Definición** `arrange()` ordena filas; `desc()` invierte un criterio.

**Búsqueda** ORDER BY, arrange, desc

**Para recordar** Los criterios siguientes desempatan a los anteriores.

#### Ordenar importes descendentes

```r
pedidos |> arrange(desc(monto), id) |> pull(id)
```

Los dos importes 100 se ordenan por id.

**Resultado esperado** `c(103, 102, 104, 101, 106, 105)`.

### slice y head

**Clave** `slice-y-head`

**Definición** `slice()` selecciona posiciones; `slice_head()` y `slice_tail()` conservan extremos.

**Búsqueda** LIMIT, head, tail, slice

**Para recordar** Ordena antes de tomar las primeras filas si importa el criterio.

#### Tomar dos pedidos más caros

```r
pedidos |> arrange(desc(monto), id) |> slice_head(n = 2) |> pull(id)
```

Se limita después de ordenar.

**Resultado esperado** `c(103, 102)`.

### slice_max y slice_min

**Clave** `slice-max-y-slice-min`

**Definición** Seleccionan extremos según una columna; `with_ties` controla si se incluyen empates.

**Búsqueda** top N, máximos, mínimos

**Para recordar** Con empates, la cantidad puede superar n.

#### Obtener los pedidos de menor importe

```r
pedidos |> slice_min(monto, n = 1) |> pull(id)
```

El mínimo es 50.

**Resultado esperado** `105`.

## Transformar columnas

**Clave** `transformar-columnas`

### Definición

**Clave** `definicion`

**Definición** `mutate()` añade o modifica columnas conservando las filas.

**Búsqueda** mutate, columna calculada, transformación

**Para recordar** Puedes reutilizar una columna que acabas de crear en el mismo mutate.

#### Calcular ingreso por línea

```r
detalle |> mutate(ingreso = cantidad * precio_unitario) |> pull(ingreso)
```

Cada línea se calcula independientemente.

**Resultado esperado** `c(100, 100, 100, 300, 150, 50, 100)`.

### case_when

**Clave** `case-when`

**Definición** `case_when()` clasifica con varias condiciones; gana la primera verdadera.

**Búsqueda** CASE WHEN, segmentación, condiciones

**Para recordar** Coloca las condiciones más específicas primero y define `.default`.

#### Clasificar pedidos

```r
pedidos |> mutate(nivel = case_when(
  monto >= 200 ~ "alto", monto >= 100 ~ "medio",
  .default = "bajo")) |> pull(nivel)
```

Cada condición se evalúa por fila.

**Resultado esperado** `c("medio", "alto", "alto", "medio", "bajo", "medio")`.

### across

**Clave** `across`

**Definición** `across()` aplica funciones a varias columnas dentro de mutate o summarise.

**Búsqueda** across, varias columnas

**Para recordar** Selecciona columnas y función por separado.

#### Redondear dos columnas

```r
detalle |> mutate(across(c(cantidad, precio_unitario), round)) |> select(cantidad, precio_unitario)
```

round se aplica a ambas columnas.

**Resultado esperado** 7 filas con los valores originales, ya enteros.

### transmute y pick

**Clave** `transmute-y-pick`

**Definición** `transmute()` devuelve principalmente las columnas creadas; `pick()` selecciona un conjunto dentro de un verbo.

**Búsqueda** transmute, pick, .keep

**Para recordar** `mutate(..., .keep = "none")` permite conservar solo las nuevas columnas y las de agrupación.

#### Crear una tabla de ingresos

```r
detalle |> transmute(ingreso = cantidad * precio_unitario)
```

No conserva las columnas de origen.

**Resultado esperado** Una columna ingreso con 7 filas: 100,100,100,300,150,50,100.

## Funciones de texto

**Clave** `funciones-de-texto`

### Definición

**Clave** `definicion`

**Definición** R base y stringr permiten limpiar, comparar y extraer caracteres de cadenas.

**Búsqueda** stringr, texto, string

**Para recordar** Las funciones de stringr suelen trabajar con vectores.

**Nota** Requiere stringr en las fichas que usan `str_*`.

#### Normalizar mayúsculas

```r
stringr::str_to_upper(c("mx", "es"))
```

Se convierte cada cadena.

**Resultado esperado** `c("MX", "ES")`.

### Longitud y subcadenas

**Clave** `longitud-y-subcadenas`

**Definición** `nchar()` y `str_length()` cuentan caracteres; `substr()` y `str_sub()` extraen posiciones.

**Búsqueda** longitud, substring, substr

**Para recordar** Las posiciones de texto empiezan en 1.

#### Extraer prefijos

```r
stringr::str_sub(c("MX-001", "ES-002"), 1, 2)
```

Los límites son inclusivos.

**Resultado esperado** `c("MX", "ES")`.

### Espacios y reemplazos

**Clave** `espacios-y-reemplazos`

**Definición** `trimws()` o `str_trim()` eliminan espacios de los extremos; `str_squish()` normaliza espacios internos.

**Búsqueda** TRIM, REPLACE, str_replace_all

**Para recordar** Usa limpieza antes de comparar claves textuales.

#### Normalizar un nombre

```r
stringr::str_squish("  Ana   López  ")
```

También reduce espacios interiores.

**Resultado esperado** `"Ana López"`.

### Concatenación y separación

**Clave** `concatenacion-y-separacion`

**Definición** `paste()` y `str_c()` unen cadenas; `str_split()` devuelve una lista de fragmentos.

**Búsqueda** CONCAT, paste0, split

**Para recordar** `sep` separa componentes; `collapse` junta elementos del vector.

#### Crear códigos

```r
paste(c("MX", "ES"), c("001", "002"), sep = "-")
```

Se combinan por posición.

**Resultado esperado** `c("MX-001", "ES-002")`.

### Expresiones regulares

**Clave** `expresiones-regulares`

**Definición** Un patrón regex describe texto: `^` inicio, `$` final, `.` cualquier carácter, `+` una o más repeticiones.

**Búsqueda** regex, grepl, str_detect, LIKE

**Para recordar** Escapa metacaracteres o usa búsqueda literal.

**Nota** No valida por completo una dirección de correo.

#### Detectar correos mexicanos

```r
stringr::str_detect(leads$email, "[.]mx$")
```

`[.]` representa un punto literal.

**Resultado esperado** `c(TRUE, TRUE, TRUE, NA, TRUE)`.

### Extraer y sustituir patrones

**Clave** `extraer-y-sustituir-patrones`

**Definición** `str_extract()` devuelve la coincidencia; `str_replace_all()` sustituye todas las coincidencias.

**Búsqueda** regex, extracción, reemplazo

**Para recordar** Una coincidencia ausente produce NA en str_extract.

#### Extraer número de un cupón

```r
stringr::str_extract(c("A10", "B5", "sin"), "[0-9]+")
```

Se extrae un bloque de dígitos.

**Resultado esperado** `c("10", "5", NA)`.

## Funciones numéricas

**Clave** `funciones-numericas`

### Definición

**Clave** `definicion`

**Definición** Las funciones numéricas transforman cantidades sin cambiar su significado tabular.

**Búsqueda** round, abs, cálculo

**Para recordar** Redondea al presentar resultados si necesitas preservar precisión durante el cálculo.

#### Redondear un ratio

```r
round(2 / 3, 2)
```

El segundo argumento indica decimales.

**Resultado esperado** `0.67`.

### round, floor y ceiling

**Clave** `round-floor-y-ceiling`

**Definición** `round()` aproxima al número de decimales indicado; `floor()` y `ceiling()` aproximan hacia abajo y arriba.

**Búsqueda** redondeo, piso, techo

**Para recordar** floor y ceiling no redondean al entero más cercano.

#### Calcular paquetes necesarios

```r
ceiling(17 / 5)
```

Se requieren cuatro paquetes completos para contener 17 unidades.

**Resultado esperado** `4`.

### abs, log y sqrt

**Clave** `abs-log-y-sqrt`

**Definición** `abs()` calcula magnitud; `log()` logaritmo natural por defecto; `sqrt()` raíz cuadrada.

**Búsqueda** valor absoluto, logaritmo, raíz

**Para recordar** Verifica dominio antes de aplicar log o sqrt.

#### Medir desviación de una meta

```r
abs(c(90, 110) - 100)
```

Se ignora el signo de la diferencia.

**Resultado esperado** `c(10, 10)`.

### División y porcentajes

**Clave** `division-y-porcentajes`

**Definición** Una proporción divide una parte entre un total; la división por cero puede producir Inf o NaN.

**Búsqueda** ratio, porcentaje, dividir por cero

**Para recordar** Protege el denominador antes de interpretar el resultado.

#### Calcular tasa de cumplimiento

```r
100 * mean(pedidos$estado == "completado")
```

TRUE aporta 1 y FALSE aporta 0.

**Resultado esperado** `83.33333` aproximadamente.

## Fechas y horas

**Clave** `fechas-y-horas`

### Definición

**Clave** `definicion`

**Definición** Las fechas permiten ordenar eventos, calcular intervalos y agrupar por periodos.

**Búsqueda** Date, lubridate, fechas

**Para recordar** Convierte texto a fecha antes de comparar intervalos.

#### Convertir formato día mes año

```r
as.Date("15/03/2026", format = "%d/%m/%Y")
```

El formato describe el texto de entrada.

**Resultado esperado** 2026-03-15.

### Parsear y extraer componentes

**Clave** `parsear-y-extraer-componentes`

**Definición** `ymd()`, `dmy()`, `year()`, `month()` y `day()` son funciones de lubridate para interpretar o extraer partes.

**Búsqueda** lubridate, YEAR, MONTH, DAY

**Para recordar** El orden de ymd y dmy describe el formato.

**Nota** Requiere lubridate.

#### Extraer meses

```r
lubridate::month(pedidos$fecha)
```

Devuelve número de mes.

**Resultado esperado** `c(3, 3, 3, 4, 4, 4)`.

### Agrupar por periodos

**Clave** `agrupar-por-periodos`

**Definición** `floor_date()` aproxima al inicio de un periodo; `format()` representa fechas como texto.

**Búsqueda** fecha por mes, año-mes, DATE_FORMAT

**Para recordar** Conserva el año al agrupar varios años.

#### Obtener inicio de mes

```r
lubridate::floor_date(pedidos$fecha, "month")
```

Se conserva la clase Date.

**Resultado esperado** Tres fechas 2026-03-01 y tres 2026-04-01.

### Diferencias e intervalos

**Clave** `diferencias-e-intervalos`

**Definición** Restar fechas o usar `difftime()` mide tiempo; lubridate distingue duraciones, periodos e intervalos.

**Búsqueda** DATEDIFF, difftime, interval

**Para recordar** Declara las unidades del resultado.

#### Calcular días transcurridos

```r
as.numeric(difftime(as.Date("2026-03-10"), as.Date("2026-03-01"), units = "days"))
```

Se fija la unidad días.

**Resultado esperado** `9`.

### Sumar fechas y zonas horarias

**Clave** `sumar-fechas-y-zonas-horarias`

**Definición** `days()`, `months()` y `%m+%` realizan aritmética de calendario; `with_tz()` cambia la representación de un instante.

**Búsqueda** DATE_ADD, calendario, timezone

**Para recordar** Un mes no equivale siempre a 30 días.

**Nota** Requiere lubridate; para instantes especifica tz.

#### Sumar un mes al fin de enero

```r
lubridate::add_with_rollback(as.Date("2026-01-31"), lubridate::period(months = 1))
```

Se ajusta al último día válido.

**Resultado esperado** 2026-02-28.

## Agregaciones

**Clave** `agregaciones`

### Definición

**Clave** `definicion`

**Definición** Una agregación reduce varios valores a un resultado, como suma, promedio o conteo.

**Búsqueda** sum, mean, count, agregación

**Para recordar** Distingue número de filas de número de valores presentes.

#### Sumar importes

```r
sum(pedidos$monto)
```

Incluye los seis pedidos, también el cancelado.

**Resultado esperado** `900`.

### Conteos

**Clave** `conteos`

**Definición** `nrow()` cuenta filas, `length()` elementos, `sum(!is.na(x))` valores presentes y `n_distinct()` valores diferentes.

**Búsqueda** COUNT, COUNT DISTINCT, n_distinct

**Para recordar** `n_distinct()` incluye NA por defecto; usa `na.rm = TRUE` para excluirlo.

#### Contar pedidos y clientes

```r
c(pedidos = nrow(pedidos), clientes = n_distinct(pedidos$cliente_id))
```

Los clientes repetidos cuentan una vez.

**Resultado esperado** `c(pedidos = 6, clientes = 3)`.

### Suma, media y extremos

**Clave** `suma-media-y-extremos`

**Definición** `sum()`, `mean()`, `min()`, `max()` calculan distintos resúmenes de un vector.

**Búsqueda** SUM, AVG, MIN, MAX

**Para recordar** Usa na.rm si la regla de negocio permite excluir faltantes.

#### Resumir importes

```r
c(total = sum(pedidos$monto), media = mean(pedidos$monto),
  minimo = min(pedidos$monto), maximo = max(pedidos$monto))
```

Se calcula cada estadístico sobre los seis importes.

**Resultado esperado** total 900, media 150, mínimo 50, máximo 300.

### Agregación condicional

**Clave** `agregacion-condicional`

**Definición** Se puede filtrar antes de sumar o usar una condición dentro de una agregación.

**Búsqueda** SUM CASE, count if, proporciones

**Para recordar** La condición determina el numerador, no necesariamente el denominador.

#### Sumar solo pedidos completados

```r
sum(pedidos$monto[pedidos$estado == "completado"])
```

Excluye el importe cancelado de 150.

**Resultado esperado** `750`.

## Agrupar y resumir

**Clave** `agrupar-y-resumir`

### Definición

**Clave** `definicion`

**Definición** `group_by()` define grupos; `summarise()` reduce cada grupo a una fila de resumen.

**Búsqueda** GROUP BY, summarise, agrupación

**Para recordar** Agrupar no reduce filas hasta que aplicas un resumen.

#### Calcular gasto por cliente

```r
pedidos |> group_by(cliente_id) |> summarise(total = sum(monto), .groups = "drop")
```

Cada cliente tiene su propia suma.

**Resultado esperado** Filas `(1,300)`, `(2,400)`, `(3,200)`.

### Varias agregaciones y count

**Clave** `varias-agregaciones-y-count`

**Definición** `summarise()` permite varios cálculos; `n()` cuenta filas del grupo y `count()` combina agrupación y conteo.

**Búsqueda** COUNT GROUP BY, n(), count

**Para recordar** `count(x)` produce una fila por combinación agrupada.

#### Contar por estado

```r
pedidos |> count(estado)
```

La columna n contiene el conteo.

**Resultado esperado** Filas cancelado=1 y completado=5.

### Agrupar varias columnas

**Clave** `agrupar-varias-columnas`

**Definición** La combinación de valores define cada grupo; `ungroup()` elimina agrupación residual.

**Búsqueda** varios grupos, ungroup, .groups

**Para recordar** Usa `.groups = "drop"` si no deseas heredar agrupación.

#### Resumir por cliente y estado

```r
pedidos |> group_by(cliente_id, estado) |> summarise(total = sum(monto), .groups = "drop")
```

Marta tiene dos grupos.

**Resultado esperado** Cuatro filas: `(1,completado,300)`, `(2,completado,400)`, `(3,cancelado,150)`, `(3,completado,50)`.

### Filtrar antes y después

**Clave** `filtrar-antes-y-despues`

**Definición** `filter()` antes de summarise filtra filas originales; después filtra los resultados agregados.

**Búsqueda** WHERE, HAVING, filtrar grupos

**Para recordar** El lugar del filtro cambia el universo del cálculo.

#### Mostrar clientes con gasto completado mayor a 200

```r
pedidos |> filter(estado == "completado") |>
  group_by(cliente_id) |> summarise(total = sum(monto), .groups = "drop") |>
  filter(total > 200)
```

El último filtro opera sobre el total.

**Resultado esperado** Filas `(1,300)`, `(2,400)`.

### Agregación por operación y reframe

**Clave** `agregacion-por-operacion-y-reframe`

**Definición** `.by` agrupa solo para una operación; `reframe()` permite devolver varias filas por grupo.

**Búsqueda** .by, reframe, cuantiles por grupo

**Para recordar** reframe devuelve una tabla sin grupos.

**Nota** Requiere dplyr 1.1 o posterior.

#### Obtener mínimo y máximo en filas

```r
pedidos |> reframe(extremo = range(monto), .by = cliente_id)
```

range devuelve dos valores por grupo.

**Resultado esperado** Dos filas por cliente: 1:100,200; 2:100,300; 3:50,150.

## Valores únicos y duplicados

**Clave** `valores-unicos-y-duplicados`

### Definición

**Clave** `definicion`

**Definición** `distinct()` conserva filas únicas según las columnas elegidas; `duplicated()` señala repeticiones.

**Búsqueda** DISTINCT, unique, duplicados

**Para recordar** Define qué columnas identifican un registro duplicado.

#### Mostrar países únicos

```r
clientes |> distinct(pais)
```

NA se conserva como un valor distinto.

**Resultado esperado** Tres filas en orden de aparición: MX, ES, NA.

### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Un conteo por clave seguido de un filtro identifica claves repetidas.

**Búsqueda** duplicados, count, HAVING

**Para recordar** Excluye NA si no representa una clave real.

#### Detectar correos repetidos

```r
leads |> filter(!is.na(email)) |> count(email) |> filter(n > 1)
```

No se eliminan registros aún.

**Resultado esperado** Fila `ana@ejemplo.mx`, n=2.

### Conservar una fila por clave

**Clave** `conservar-una-fila-por-clave`

**Definición** `distinct(clave, .keep_all = TRUE)` mantiene la primera fila por clave.

**Búsqueda** deduplicar, keep_all

**Para recordar** Ordena primero según la regla de prioridad.

#### Conservar el primer lead por email informado

```r
leads |> filter(!is.na(email)) |> arrange(id) |> distinct(email, .keep_all = TRUE) |> pull(id)
```

El lead 3 se descarta por repetir el email del 1.

**Resultado esperado** `c(1, 2, 5)`.

## Joins

**Clave** `joins`

### Definición

**Clave** `definicion`

**Definición** Un join combina tablas mediante claves relacionadas. `inner_join()` conserva coincidencias de ambas tablas.

**Búsqueda** JOIN, unir tablas, clave, merge

**Para recordar** Identifica la clave y la granularidad antes de unir.

#### Añadir nombre del cliente a cada pedido

```r
pedidos |> inner_join(clientes, by = c("cliente_id" = "id")) |> select(id, nombre)
```

La clave de la izquierda se llama cliente_id; la de la derecha id.

**Resultado esperado** 6 filas: `(101,Ana)`, `(102,Ana)`, `(103,Luis)`, `(104,Marta)`, `(105,Marta)`, `(106,Luis)`.

### left_join, right_join y full_join

**Clave** `left-join-right-join-y-full-join`

**Definición** Conservan respectivamente las filas de la izquierda, derecha o ambas aunque no tengan coincidencia.

**Búsqueda** LEFT JOIN, RIGHT JOIN, FULL JOIN, NA

**Para recordar** Los campos sin coincidencia se rellenan con NA.

#### Conservar clientes sin pedidos

```r
clientes |> left_join(pedidos, by = c("id" = "cliente_id")) |> select(nombre, monto)
```

La tabla izquierda determina los clientes conservados.

**Resultado esperado** 8 filas: Ana 100 y 200; Luis 300 y 100; Marta 150 y 50; Pedro NA; Sofia NA.

### semi_join y anti_join

**Clave** `semi-join-y-anti-join`

**Definición** `semi_join()` conserva filas con coincidencia sin añadir columnas; `anti_join()` conserva las que no coinciden.

**Búsqueda** EXISTS, NOT EXISTS, anti join

**Para recordar** Estas operaciones filtran sin multiplicar filas de la izquierda.

#### Encontrar clientes sin pedidos

```r
clientes |> anti_join(pedidos, by = c("id" = "cliente_id")) |> pull(nombre)
```

No hace falta comprobar una columna NA.

**Resultado esperado** `c("Pedro", "Sofia")`.

### Cardinalidad y claves múltiples

**Clave** `cardinalidad-y-claves-multiples`

**Definición** Las relaciones 1:1, 1:N y N:M determinan cuántas filas produce una unión. `relationship` permite exigir una relación esperada.

**Búsqueda** cardinalidad, duplicación, many-to-many, join_by

**Para recordar** Comprueba claves antes de sumar importes después de un join.

**Nota** Requiere dplyr 1.1 o posterior; `na_matches = "never"` evita coincidencia entre claves NA.

#### Exigir una relación muchos a uno

```r
pedidos |> left_join(clientes, by = c("cliente_id" = "id"), relationship = "many-to-one") |> nrow()
```

Cada pedido coincide con como máximo un cliente.

**Resultado esperado** `6`.

### Unir varias tablas

**Clave** `unir-varias-tablas`

**Definición** Se pueden encadenar joins; cada paso cambia las columnas y puede cambiar el número de filas.

**Búsqueda** joins múltiples, revenue, granularity

**Para recordar** Suma a la granularidad correcta: no repitas el total de un pedido por cada producto.

#### Calcular ingresos por categoría completada

```r
detalle |> inner_join(pedidos, by = c("pedido_id" = "id")) |>
  inner_join(productos, by = c("producto_id" = "id")) |>
  filter(estado == "completado") |> group_by(categoria) |>
  summarise(ingreso = sum(cantidad * precio_unitario), .groups = "drop")
```

Se suman importes de línea, no el monto repetido del pedido.

**Resultado esperado** Accesorios 450 y Pantallas 300.

### merge y cross_join

**Clave** `merge-y-cross-join`

**Definición** `merge()` es la unión de base R; `cross_join()` genera todas las combinaciones de filas. Un self join une una tabla consigo misma.

**Búsqueda** merge, CROSS JOIN, self join

**Para recordar** El producto cartesiano de n y m filas tiene n × m filas.

#### Combinar países y canales

```r
cross_join(tibble::tibble(pais = c("MX", "ES")), tibble::tibble(canal = c("ads", "web")))
```

No se requiere clave.

**Resultado esperado** 4 filas: MX/ads, MX/web, ES/ads, ES/web.

## Combinar tablas y conjuntos

**Clave** `combinar-tablas-y-conjuntos`

### Definición

**Clave** `definicion`

**Definición** `bind_rows()` apila filas por nombre de columna; `bind_cols()` coloca columnas lado a lado por posición.

**Búsqueda** rbind, cbind, UNION ALL, bind_rows

**Para recordar** Usa join si necesitas alinear por clave, no por posición.

#### Apilar dos periodos

```r
bind_rows(tibble::tibble(monto = 100), tibble::tibble(monto = 200))
```

Las columnas coinciden por nombre.

**Resultado esperado** Dos filas con montos 100 y 200.

### Operaciones de conjuntos

**Clave** `operaciones-de-conjuntos`

**Definición** `union()`, `intersect()` y `setdiff()` combinan, intersectan o restan conjuntos, eliminando duplicados.

**Búsqueda** UNION, INTERSECT, EXCEPT, setdiff

**Para recordar** `setdiff(a,b)` no equivale a `setdiff(b,a)`.

#### Encontrar códigos exclusivos

```r
setdiff(c("MX", "ES", "MX"), c("ES", "US"))
```

Se conservan valores de a ausentes de b.

**Resultado esperado** `"MX"`.

## Reestructurar datos con tidyr

**Clave** `reestructurar-datos-con-tidyr`

### Definición

**Clave** `definicion`

**Definición** En datos ordenados (tidy data), cada variable es una columna y cada observación una fila; tidyr cambia la estructura para conseguirlo.

**Búsqueda** tidy data, pivot, reshape, tidyr

**Para recordar** Identifica qué representa una fila antes de pivotar.

#### Convertir meses de columnas a filas

```r
tibble::tibble(pais = "MX", marzo = 300, abril = 100) |>
  pivot_longer(c(marzo, abril), names_to = "mes", values_to = "ventas")
```

Los nombres de meses pasan a una columna.

**Resultado esperado** Dos filas `(MX,marzo,300)`, `(MX,abril,100)`.

### pivot_wider

**Clave** `pivot-wider`

**Definición** `pivot_wider()` convierte valores de una columna en encabezados y otra columna en celdas.

**Búsqueda** pivot_wider, formato ancho, pivot table

**Para recordar** Si varias filas apuntan a la misma celda, define una agregación con `values_fn`.

#### Crear columnas por mes

```r
tibble::tibble(pais = c("MX", "MX"), mes = c("marzo", "abril"), ventas = c(300, 100)) |>
  pivot_wider(names_from = mes, values_from = ventas)
```

Cada mes se vuelve una columna.

**Resultado esperado** Una fila MX, marzo=300, abril=100.

### Separar y unir columnas

**Clave** `separar-y-unir-columnas`

**Definición** `separate_wider_delim()` divide cadenas delimitadas; `unite()` combina columnas.

**Búsqueda** separate, unite, dividir columna

**Para recordar** Define el separador y controla piezas faltantes.

**Nota** separate_wider_delim requiere tidyr 1.3 o posterior.

#### Separar país y código

```r
tibble::tibble(codigo = c("MX-001", "ES-002")) |>
  separate_wider_delim(codigo, delim = "-", names = c("pais", "id"))
```

El identificador sigue siendo texto.

**Resultado esperado** Filas `(MX,"001")`, `(ES,"002")`.

### Columnas lista y unnest

**Clave** `columnas-lista-y-unnest`

**Definición** Una list-column contiene objetos por fila; `unnest_longer()` expande sus elementos en nuevas filas.

**Búsqueda** nested data, list-column, unnest

**Para recordar** Expandir puede multiplicar el número de filas.

#### Expandir etiquetas de clientes

```r
tibble::tibble(id = 1:2, etiquetas = list(c("web", "app"), "web")) |> unnest_longer(etiquetas)
```

El cliente 1 produce dos filas.

**Resultado esperado** Tres filas `(1,web)`, `(1,app)`, `(2,web)`.

## Limpieza y calidad de datos

**Clave** `limpieza-y-calidad-de-datos`

### Definición

**Clave** `definicion`

**Definición** Limpiar datos significa corregir representaciones y tratar inconsistencias con reglas explícitas, preservando el significado original.

**Búsqueda** data cleaning, calidad, validación

**Para recordar** No conviertas ausencia en cero sin justificación de negocio.

#### Contar cupones faltantes

```r
sum(is.na(pedidos$cupon))
```

Primero se mide la ausencia.

**Resultado esperado** `3`.

### coalesce y replace_na

**Clave** `coalesce-y-replace-na`

**Definición** `coalesce()` toma el primer valor no faltante por posición; `replace_na()` sustituye faltantes con valores elegidos.

**Búsqueda** COALESCE, imputar, reemplazar NA

**Para recordar** El sustituto debe tener un tipo compatible.

#### Mostrar país desconocido

```r
clientes |> mutate(pais = coalesce(pais, "Desconocido")) |> pull(pais)
```

Solo cambia el NA.

**Resultado esperado** `c("MX", "MX", "ES", "Desconocido", "ES")`.

### na_if, drop_na y fill

**Clave** `na-if-drop-na-y-fill`

**Definición** `na_if()` transforma un valor específico en NA; `drop_na()` elimina filas; `fill()` propaga valores vecinos por orden.

**Búsqueda** NULLIF, missing values, fill

**Para recordar** Ordena y agrupa antes de propagar valores.

#### Convertir código vacío a faltante

```r
na_if(c("MX", "", "ES"), "")
```

Solo se cambia la cadena vacía.

**Resultado esperado** `c("MX", NA, "ES")`.

### complete

**Clave** `complete`

**Definición** `complete()` hace explícitas combinaciones ausentes de variables; puede rellenarlas con valores indicados.

**Búsqueda** complete, fechas faltantes, combinaciones

**Para recordar** Distingue cero observado de ausencia de registro.

#### Completar meses sin ventas

```r
tibble::tibble(mes = c(1, 3), ventas = c(100, 200)) |> complete(mes = 1:3, fill = list(ventas = 0))
```

Se crea el mes 2 bajo el supuesto de cero ventas.

**Resultado esperado** Filas `(1,100)`, `(2,0)`, `(3,200)`.

### Validación de esquema y claves

**Clave** `validacion-de-esquema-y-claves`

**Definición** `stopifnot()` permite comprobar condiciones; la unicidad y la integridad referencial son reglas verificables.

**Búsqueda** validación, primary key, foreign key, aserciones

**Para recordar** Comprueba claves, tipos y rangos antes de publicar.

#### Validar relaciones del dataset

```r
stopifnot(!anyDuplicated(clientes$id), all(pedidos$cliente_id %in% clientes$id), all(pedidos$monto >= 0))
```

Una condición falsa detiene el script.

**Resultado esperado** Sin error ni salida visible si todas las condiciones se cumplen.

### Outliers

**Clave** `outliers`

**Definición** Un valor extremo puede ser un error o un evento real; el rango intercuartílico permite marcar candidatos a revisión.

**Búsqueda** outlier, IQR, boxplot, anomalía

**Para recordar** Marcar no significa eliminar.

#### Detectar un importe extremo

```r
x <- c(10, 11, 12, 13, 100)
q <- quantile(x, c(.25, .75))
x[x > q[2] + 1.5 * IQR(x)]
```

Se usa el umbral superior del criterio IQR.

**Resultado esperado** `100`.

## Funciones de ventana

**Clave** `funciones-de-ventana`

### Definición

**Clave** `definicion`

**Definición** Las operaciones de ventana calculan valores usando otras filas sin reducir la tabla. Con dplyr se suelen combinar `mutate()`, orden y agrupación.

**Búsqueda** window functions, OVER, ranking, acumulado

**Para recordar** Ordena antes de usar funciones que dependen de la fila anterior.

#### Añadir el total a cada pedido

```r
pedidos |> mutate(total = sum(monto)) |> pull(total)
```

La suma se añade a cada fila sin reducirlas.

**Resultado esperado** Seis valores iguales a 900.

### row_number, min_rank y dense_rank

**Clave** `row-number-min-rank-y-dense-rank`

**Definición** `row_number()` asigna posiciones únicas; `min_rank()` conserva empates con saltos; `dense_rank()` conserva empates sin saltos.

**Búsqueda** ROW_NUMBER, RANK, DENSE_RANK

**Para recordar** Usa `desc()` para que el mayor valor tenga rango 1.

#### Comparar rankings con empate

```r
x <- c(200, 100, 100, 50)
tibble::tibble(x, fila = row_number(desc(x)), rango = min_rank(desc(x)), denso = dense_rank(desc(x)))
```

Cada función trata los empates de forma distinta.

**Resultado esperado** Filas `(200,1,1,1)`, `(100,2,2,2)`, `(100,3,2,2)`, `(50,4,4,3)`.

### lag y lead

**Clave** `lag-y-lead`

**Definición** `lag()` recupera valores previos; `lead()` siguientes, según orden actual o `order_by`.

**Búsqueda** LAG, LEAD, anterior, siguiente

**Para recordar** El primer lag y último lead suelen ser NA.

#### Comparar cada importe con el anterior

```r
pedidos |> arrange(fecha, id) |> mutate(anterior = lag(monto)) |> pull(anterior)
```

Se desplaza una posición.

**Resultado esperado** `c(NA, 100, 200, 300, 150, 50)`.

### Acumulados

**Clave** `acumulados`

**Definición** `cumsum()`, `cummean()`, `cummin()` y `cummax()` mantienen el resultado acumulado por posición.

**Búsqueda** running total, acumulado, cumsum

**Para recordar** Ordena antes de acumular; NA puede propagarse.

#### Acumular pedidos completados

```r
pedidos |> filter(estado == "completado") |> arrange(fecha, id) |> mutate(acumulado = cumsum(monto)) |> pull(acumulado)
```

Se excluye cancelado antes de acumular.

**Resultado esperado** `c(100, 300, 600, 650, 750)`.

### Ventanas por grupo

**Clave** `ventanas-por-grupo`

**Definición** `group_by()` antes de mutate reinicia cálculos dentro de cada grupo.

**Búsqueda** PARTITION BY, ventanas por grupo

**Para recordar** Para ventanas cronológicas ordena por fecha y clave.

#### Numerar pedidos por cliente

```r
pedidos |> arrange(cliente_id, fecha, id) |> group_by(cliente_id) |> mutate(numero = row_number()) |> ungroup() |> select(id, numero)
```

La numeración reinicia al cambiar de cliente.

**Resultado esperado** Filas `(101,1)`, `(102,2)`, `(103,1)`, `(106,2)`, `(104,1)`, `(105,2)`.

### Promedios móviles

**Clave** `promedios-moviles`

**Definición** Una ventana móvil usa un subconjunto de observaciones cercanas; `slider::slide_dbl()` permite definir cuántas anteriores y posteriores.

**Búsqueda** rolling mean, moving average, frame

**Para recordar** Aclara si permites ventanas incompletas.

**Nota** Requiere slider.

#### Calcular media móvil de tres periodos

```r
slider::slide_dbl(c(10, 20, 30, 40), mean, .before = 2, .complete = TRUE)
```

Los dos primeros no tienen tres observaciones.

**Resultado esperado** `c(NA, NA, 20, 30)`.

## Estadística descriptiva

**Clave** `estadistica-descriptiva`

### Definición

**Clave** `definicion`

**Definición** Resume la distribución de una variable mediante tendencia central, dispersión y posición.

**Búsqueda** estadística descriptiva, summary, EDA

**Para recordar** La media por sí sola no describe toda la distribución.

#### Obtener resumen de importes

```r
summary(pedidos$monto)
```

summary reúne varias medidas.

**Resultado esperado** Mínimo 50, Q1 100, mediana 125, media 150, Q3 187.5, máximo 300.

### Media, mediana y moda

**Clave** `media-mediana-y-moda`

**Definición** `mean()` y `median()` calculan media y mediana; la moda estadística es el valor más frecuente.

**Búsqueda** promedio, mediana, moda

**Para recordar** `mode()` en R no calcula moda estadística.

**Nota** Con varios modos esta expresión devuelve solo el primero.

#### Encontrar el importe más frecuente

```r
names(which.max(table(pedidos$monto)))
```

table cuenta frecuencias y which.max localiza la mayor.

**Resultado esperado** `"100"`.

### Varianza y desviación estándar

**Clave** `varianza-y-desviacion-estandar`

**Definición** `var()` y `sd()` estiman dispersión muestral usando denominador n−1.

**Búsqueda** var, sd, desviación, varianza

**Para recordar** La desviación estándar está en las unidades originales.

#### Calcular dispersión de tres ventas

```r
c(varianza = var(c(10, 20, 30)), sd = sd(c(10, 20, 30)))
```

Los valores están separados de la media por 10, 0 y 10.

**Resultado esperado** varianza 100, desviación 10.

### Cuantiles y percentiles

**Clave** `cuantiles-y-percentiles`

**Definición** `quantile()` estima puntos de corte de una distribución; `IQR()` calcula Q3−Q1.

**Búsqueda** quantile, percentil, cuartil, IQR

**Para recordar** Indica el método de cuantiles si comparas con otros sistemas.

#### Calcular percentiles

```r
quantile(c(10, 20, 30, 40, 50), c(.25, .5, .75))
```

Se usa el método por defecto de R.

**Resultado esperado** 25%=20, 50%=30, 75%=40.

### Frecuencias y proporciones

**Clave** `frecuencias-y-proporciones`

**Definición** `table()` cuenta categorías y `prop.table()` convierte conteos en proporciones.

**Búsqueda** frecuencia, tabla de contingencia, proporción

**Para recordar** Incluye NA explícitamente si debe pertenecer al denominador.

#### Calcular distribución de estados

```r
round(prop.table(table(pedidos$estado)), 3)
```

Las proporciones suman aproximadamente uno.

**Resultado esperado** cancelado=0.167; completado=0.833.

### Correlación y covarianza

**Clave** `correlacion-y-covarianza`

**Definición** `cor()` mide asociación lineal (Pearson) o monotónica (Spearman); `cov()` estima covarianza.

**Búsqueda** cor, cov, Pearson, Spearman

**Para recordar** Correlación no implica causalidad.

#### Medir asociación lineal

```r
cor(c(1, 2, 3), c(10, 20, 30))
```

Ambos vectores crecen proporcionalmente.

**Resultado esperado** `1`.

## Visualización con ggplot2

**Clave** `visualizacion-con-ggplot2`

### Definición

**Clave** `definicion`

**Definición** ggplot2 construye gráficos por capas: datos, mapeos estéticos (`aes()`) y geometrías (`geom_*`).

**Búsqueda** ggplot, aes, geom, gráfico

**Para recordar** Mapea variables dentro de aes; fija estilos constantes fuera.

**Nota** Requiere ggplot2; en scripts usa print() para mostrar objetos gráficos.

#### Graficar dos cantidades

```r
ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col()
```

geom_col usa alturas existentes.

**Resultado esperado** Tres barras: Mouse 50, Teclado 100 y Monitor 300.

### Barras y conteos

**Clave** `barras-y-conteos`

**Definición** `geom_bar()` cuenta filas por categoría; `geom_col()` utiliza valores ya calculados.

**Búsqueda** barplot, barras, geom_bar, geom_col

**Para recordar** No vuelvas a contar una tabla ya agregada si quieres graficar sumas.

#### Graficar frecuencia de estados

```r
ggplot2::ggplot(pedidos, ggplot2::aes(estado)) + ggplot2::geom_bar()
```

La estadística por defecto es el conteo.

**Resultado esperado** Barras cancelado=1 y completado=5.

### Líneas y series temporales

**Clave** `lineas-y-series-temporales`

**Definición** `geom_line()` conecta observaciones según x; `group` define series independientes.

**Búsqueda** line chart, tendencia, fecha

**Para recordar** Agrega a la granularidad deseada antes de conectar puntos.

#### Graficar ingresos de dos meses

```r
x <- pedidos |> filter(estado == "completado") |> mutate(mes = format(fecha, "%Y-%m")) |> group_by(mes) |> summarise(total = sum(monto), .groups = "drop")
ggplot2::ggplot(x, ggplot2::aes(mes, total, group = 1)) + ggplot2::geom_line() + ggplot2::geom_point()
```

group=1 conecta los dos meses discretos.

**Resultado esperado** Línea de marzo 600 a abril 150.

### Histogramas y boxplots

**Clave** `histogramas-y-boxplots`

**Definición** `geom_histogram()` divide valores numéricos en intervalos; `geom_boxplot()` muestra mediana, cuartiles y valores extremos.

**Búsqueda** histograma, distribución, boxplot

**Para recordar** El ancho de intervalo modifica la lectura del histograma.

**Nota** Con pocos datos conviene mostrar también los puntos.

#### Visualizar dispersión por estado

```r
ggplot2::ggplot(pedidos, ggplot2::aes(estado, monto)) + ggplot2::geom_boxplot()
```

El boxplot resume cada grupo.

**Resultado esperado** Dos cajas; cancelado tiene una observación en 150 y completado cinco observaciones.

### Dispersión y ajuste

**Clave** `dispersion-y-ajuste`

**Definición** `geom_point()` muestra pares numéricos; `geom_smooth()` añade un ajuste.

**Búsqueda** scatter plot, regresión, geom_smooth

**Para recordar** Un ajuste visual no establece causalidad.

#### Relacionar precio e importe simulado

```r
x <- data.frame(precio = c(10, 20, 30), ingreso = c(20, 40, 60))
ggplot2::ggplot(x, ggplot2::aes(precio, ingreso)) + ggplot2::geom_point() + ggplot2::geom_smooth(method = "lm", se = FALSE)
```

lm ajusta una recta.

**Resultado esperado** Tres puntos alineados y recta con pendiente 2.

### Facetas, escalas y temas

**Clave** `facetas-escalas-y-temas`

**Definición** `facet_wrap()` divide en paneles; `scale_*()`, `labs()` y `theme_*()` ajustan ejes, etiquetas y apariencia.

**Búsqueda** facet, theme, labels, scales

**Para recordar** Usa escalas comparables al contrastar paneles.

#### Separar productos por categoría

```r
ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col() + ggplot2::facet_wrap(~categoria) + ggplot2::labs(x = "Producto", y = "Precio") + ggplot2::theme_minimal()
```

La fórmula de facet define la categoría de panel.

**Resultado esperado** Dos paneles: Accesorios y Pantallas, con sus barras.

### Guardar gráficos

**Clave** `guardar-graficos`

**Definición** `ggsave()` escribe un gráfico a un archivo con tamaño y resolución especificados.

**Búsqueda** exportar gráfica, PNG, PDF, ggsave

**Para recordar** Pasa explícitamente el objeto gráfico.

#### Exportar un PNG temporal

```r
g <- ggplot2::ggplot(productos, ggplot2::aes(producto, precio)) + ggplot2::geom_col()
ruta <- tempfile(fileext = ".png")
ggplot2::ggsave(ruta, plot = g, width = 6, height = 4, dpi = 150)
file.exists(ruta)
```

El tamaño en pulgadas se multiplica por dpi.

**Resultado esperado** `TRUE`; PNG de 900×600 píxeles.

## Probabilidad y muestreo

**Clave** `probabilidad-y-muestreo`

### Definición

**Clave** `definicion`

**Definición** Una distribución describe los valores posibles de una variable aleatoria y sus probabilidades. R ofrece funciones d, p, q y r para densidad o masa, acumulada, cuantiles y simulación.

**Búsqueda** probabilidad, distribución, dnorm, pnorm, qnorm, rnorm

**Para recordar** El prefijo p calcula probabilidad acumulada; q hace la operación inversa.

#### Calcular probabilidad normal acumulada

```r
pnorm(0)
```

La normal estándar es simétrica en cero.

**Resultado esperado** `0.5`.

### Distribuciones discretas

**Clave** `distribuciones-discretas`

**Definición** La binomial modela éxitos en ensayos independientes de probabilidad fija; Poisson modela conteos bajo ciertas hipótesis.

**Búsqueda** binomial, Poisson, dbinom, ppois

**Para recordar** Usa una distribución acorde al proceso generador.

#### Probabilidad de dos conversiones en tres visitas

```r
dbinom(2, size = 3, prob = 0.5)
```

Calcula exactamente dos éxitos.

**Resultado esperado** `0.375`.

### Muestreo y semillas

**Clave** `muestreo-y-semillas`

**Definición** `sample()` selecciona elementos con o sin reemplazo; `set.seed()` fija el estado inicial del generador aleatorio.

**Búsqueda** sample, set.seed, muestreo aleatorio

**Para recordar** Una semilla permite repetir una simulación con el mismo entorno y algoritmo.

#### Seleccionar dos clientes sin reemplazo

```r
set.seed(42)
x <- sample(clientes$id, size = 2, replace = FALSE)
length(unique(x))
```

Se obtienen dos identificadores diferentes.

**Resultado esperado** `2`.

### Bootstrap

**Clave** `bootstrap`

**Definición** El bootstrap estima variabilidad remuestreando con reemplazo las observaciones disponibles.

**Búsqueda** bootstrap, remuestreo, intervalo

**Para recordar** El esquema de remuestreo debe respetar la dependencia de los datos.

#### Estimar variabilidad de una media

```r
set.seed(42)
x <- c(10, 20, 30, 40)
medias <- replicate(1000, mean(sample(x, replace = TRUE)))
quantile(medias, c(.025, .975))
```

Cada réplica tiene cuatro observaciones con reemplazo.

**Resultado esperado** Dos límites de un intervalo percentil empírico de las medias; dependen del remuestreo.

## Estadística inferencial

**Clave** `estadistica-inferencial`

### Definición

**Clave** `definicion`

**Definición** La inferencia usa una muestra y supuestos para estimar parámetros o contrastar hipótesis de una población.

**Búsqueda** inferencia, hipótesis nula, p-value, intervalo

**Para recordar** El valor p no es la probabilidad de que la hipótesis nula sea verdadera.

#### Contrastar una media contra una referencia

```r
t.test(c(8, 9, 10, 11, 12), mu = 10)$p.value
```

La media observada coincide con la referencia.

**Resultado esperado** `1`.

### Intervalos de confianza

**Clave** `intervalos-de-confianza`

**Definición** Un intervalo de confianza cuantifica la incertidumbre de una estimación mediante un procedimiento con cobertura nominal.

**Búsqueda** confidence interval, t.test, error estándar

**Para recordar** Un intervalo del 95% no garantiza que el parámetro esté dentro de este intervalo concreto.

#### Estimar la media de una muestra

```r
round(t.test(c(8, 9, 10, 11, 12))$conf.int, 2)
```

Se utiliza el intervalo t para una media.

**Resultado esperado** Límites aproximados 8.04 y 11.96.

### Pruebas t

**Clave** `pruebas-t`

**Definición** `t.test()` compara medias; Welch es la opción independiente por defecto, y `paired = TRUE` compara diferencias emparejadas.

**Búsqueda** t test, Welch, muestras pareadas

**Para recordar** El diseño determina si las muestras son independientes o pareadas.

#### Comparar dos muestras independientes

```r
t.test(c(10, 12, 14), c(8, 10, 12))$estimate
```

El test contrasta la diferencia de medias; también devuelve p-value e intervalo.

**Resultado esperado** Medias 12 y 10.

### Chi-cuadrada y Fisher

**Clave** `chi-cuadrada-y-fisher`

**Definición** `chisq.test()` contrasta independencia en tablas de contingencia; `fisher.test()` ofrece una prueba exacta útil con conteos pequeños.

**Búsqueda** chi cuadrada, Fisher, independencia

**Para recordar** Revisa las frecuencias esperadas y el diseño de muestreo.

#### Contrastar asociación en una tabla 2×2

```r
x <- matrix(c(30, 20, 30, 20), nrow = 2)
chisq.test(x)$p.value
```

Las dos columnas tienen proporciones idénticas.

**Resultado esperado** `1`.

### ANOVA

**Clave** `anova`

**Definición** `aov()` ajusta un modelo de análisis de varianza para comparar medias entre grupos.

**Búsqueda** ANOVA, aov, F test

**Para recordar** Un resultado global significativo no identifica qué pares difieren.

#### Comparar tres grupos

```r
x <- data.frame(grupo = factor(rep(LETTERS[1:3], each = 3)), y = c(1,2,3,4,5,6,7,8,9))
summary(aov(y ~ grupo, data = x))
```

Se compara variación entre grupos con variación interna.

**Resultado esperado** Estadístico F=27, grados de libertad 2 y 6.

### Pruebas no paramétricas

**Clave** `pruebas-no-parametricas`

**Definición** `wilcox.test()` y `kruskal.test()` usan rangos para contrastar distribuciones bajo sus respectivos supuestos.

**Búsqueda** Wilcoxon, Mann Whitney, Kruskal Wallis

**Para recordar** No interpretes automáticamente una prueba de rangos como prueba de medias.

#### Comparar dos grupos por rangos

```r
wilcox.test(c(1, 2, 3), c(4, 5, 6), exact = TRUE)$p.value
```

No hay empates; todos los valores del primer grupo son menores.

**Resultado esperado** `0.1` para alternativa bilateral.

## Experimentos y pruebas A/B

**Clave** `experimentos-y-pruebas-a-b`

### Definición

**Clave** `definicion`

**Definición** Un experimento A/B compara variantes con asignación aleatoria y una métrica definida antes de analizar resultados.

**Búsqueda** A/B testing, conversión, experimento

**Para recordar** Define unidad de aleatorización, ventana, métrica y criterio de decisión.

#### Calcular conversión por variante

```r
data.frame(variante = c("A", "B"), visitas = c(100, 100), compras = c(20, 25)) |> mutate(conversion = compras / visitas)
```

El denominador son las visitas en este ejemplo.

**Resultado esperado** A=0.20, B=0.25.

### Diferencia absoluta y lift

**Clave** `diferencia-absoluta-y-lift`

**Definición** La diferencia de tasas mide puntos porcentuales; el lift relativo divide el cambio por la tasa de referencia.

**Búsqueda** uplift, lift, puntos porcentuales

**Para recordar** 5 puntos porcentuales no son lo mismo que 5% relativo.

#### Comparar dos tasas

```r
a <- .20
b <- .25
c(puntos = 100 * (b - a), lift_pct = 100 * (b - a) / a)
```

La referencia es A.

**Resultado esperado** 5 puntos porcentuales y 25% de aumento relativo.

### Contraste de proporciones

**Clave** `contraste-de-proporciones`

**Definición** `prop.test()` compara proporciones y devuelve estimación, intervalo y valor p.

**Búsqueda** prop.test, test proporciones, conversión

**Para recordar** Una diferencia observada no basta para concluir efecto.

**Nota** Requiere observaciones adecuadamente independientes; con datos agrupados usa un diseño compatible.

#### Comparar conversiones

```r
prop.test(c(20, 25), c(100, 100))$estimate
```

El contraste utiliza éxitos y totales de cada grupo.

**Resultado esperado** Proporciones 0.20 y 0.25.

### Potencia y tamaño de muestra

**Clave** `potencia-y-tamano-de-muestra`

**Definición** `power.prop.test()` estima tamaño por grupo para detectar una diferencia de proporciones con potencia y nivel especificados.

**Búsqueda** power, sample size, MDE

**Para recordar** Calcula la muestra antes del experimento; redondea hacia arriba.

#### Planificar un experimento

```r
ceiling(power.prop.test(p1 = .20, p2 = .25, power = .8, sig.level = .05)$n)
```

Se usa la aproximación de dos proporciones.

**Resultado esperado** Aproximadamente 1,094 observaciones por grupo.

## Métricas de negocio

**Clave** `metricas-de-negocio`

### Definición

**Clave** `definicion`

**Definición** Un KPI mide un objetivo de negocio mediante una definición explícita de numerador, denominador, unidad y periodo.

**Búsqueda** KPI, ventas, ticket promedio, métrica

**Para recordar** Fija la granularidad antes de agregar.

#### Calcular ingresos y ticket promedio

```r
pedidos |> filter(estado == "completado") |> summarise(ingresos = sum(monto), pedidos = n(), ticket = mean(monto))
```

Los cancelados no participan.

**Resultado esperado** Ingresos 750, pedidos 5, ticket 150.

### Tasas y segmentación

**Clave** `tasas-y-segmentacion`

**Definición** Una tasa compara una parte con su población de referencia; segmentar repite la definición por grupo.

**Búsqueda** tasa cancelación, segmentación, ratio

**Para recordar** Evita sumar porcentajes con denominadores diferentes.

#### Calcular cancelación por cliente

```r
pedidos |> group_by(cliente_id) |> summarise(tasa = mean(estado == "cancelado"), .groups = "drop")
```

Cada tasa usa solo los pedidos de su cliente.

**Resultado esperado** Clientes 1:0, 2:0, 3:0.5.

### Crecimiento entre periodos

**Clave** `crecimiento-entre-periodos`

**Definición** El crecimiento relativo compara el valor actual con el anterior, dividiendo la diferencia por el anterior.

**Búsqueda** MoM, YoY, crecimiento, lag

**Para recordar** Si el periodo anterior es cero o falta, el crecimiento relativo no está definido.

#### Comparar ingresos mensuales

```r
pedidos |> filter(estado == "completado") |> mutate(mes = format(fecha, "%Y-%m")) |> group_by(mes) |> summarise(total = sum(monto), .groups = "drop") |> arrange(mes) |> mutate(crecimiento = total / lag(total) - 1)
```

Abril tiene 75% menos ingresos que marzo.

**Resultado esperado** Marzo: 600 y NA; abril: 150 y -0.75.

### Cohortes y retención

**Clave** `cohortes-y-retencion`

**Definición** Una cohorte agrupa clientes por fecha de inicio; la retención mide qué proporción sigue activa en un periodo posterior.

**Búsqueda** cohort, retention, churn

**Para recordar** El denominador de cada cohorte debe ser fijo y explícito.

#### Medir retorno de una cohorte de marzo

```r
marzo <- unique(pedidos$cliente_id[pedidos$fecha < as.Date("2026-04-01") & pedidos$estado == "completado"])
abril <- unique(pedidos$cliente_id[pedidos$fecha >= as.Date("2026-04-01") & pedidos$fecha < as.Date("2026-05-01") & pedidos$estado == "completado"])
length(intersect(marzo, abril)) / length(marzo)
```

La cohorte se define aquí por actividad en marzo, no por primera compra.

**Resultado esperado** `0.5`: vuelve Luis, de dos clientes activos en marzo.

### Funnel de conversión

**Clave** `funnel-de-conversion`

**Definición** Un funnel mide el paso entre etapas ordenadas y exige una regla para identificar usuarios que completaron cada paso.

**Búsqueda** funnel, conversión, embudo

**Para recordar** Cuenta usuarios elegibles, no eventos duplicados.

#### Calcular conversión entre etapas anidadas

```r
etapas <- tibble::tibble(etapa = c("visita", "carrito", "compra"), usuarios = c(100, 40, 20))
etapas |> mutate(conversion_paso = usuarios / lag(usuarios))
```

Se supone que los usuarios de cada etapa pertenecen a la anterior.

**Resultado esperado** NA, 0.4, 0.5; conversión total 20% respecto a visita.

## Regresión y modelos estadísticos

**Clave** `regresion-y-modelos-estadisticos`

### Definición

**Clave** `definicion`

**Definición** Un modelo relaciona una respuesta con variables explicativas bajo supuestos explícitos. En R, la fórmula `y ~ x` describe esa relación.

**Búsqueda** formula, lm, glm, regresión

**Para recordar** Distingue explicación, asociación y predicción.

#### Ajustar una recta

```r
x <- data.frame(unidades = 1:4, ingreso = c(10, 20, 30, 40))
coef(lm(ingreso ~ unidades, data = x))
```

Por cada unidad adicional el ingreso ajustado aumenta 10.

**Resultado esperado** Intercepto aproximadamente 0 y pendiente 10.

### Regresión múltiple e interacciones

**Clave** `regresion-multiple-e-interacciones`

**Definición** `lm(y ~ x1 + x2)` añade predictores; `x1 * x2` incluye efectos principales e interacción.

**Búsqueda** regresión múltiple, interacción, fórmula

**Para recordar** Un coeficiente se interpreta condicionado al resto del modelo.

#### Ajustar dos predictores

```r
x <- expand.grid(precio = c(10,20), publicidad = c(0,1))
x$ventas <- 100 - 2*x$precio + 5*x$publicidad
coef(lm(ventas ~ precio + publicidad, data = x))
```

Los datos fueron construidos con esa relación exacta.

**Resultado esperado** Intercepto 100, precio -2 y publicidad 5 (aprox.).

### Predicción y residuos

**Clave** `prediccion-y-residuos`

**Definición** `predict()` calcula valores ajustados o para nuevos datos; `residuals()` devuelve observado menos ajustado en lm.

**Búsqueda** predict, residuals, fitted, diagnóstico

**Para recordar** Inspecciona residuos y evita extrapolar sin justificación.

#### Predecir ingreso para cinco unidades

```r
m <- lm(ingreso ~ unidades, data = data.frame(unidades = 1:4, ingreso = 10*(1:4)))
predict(m, newdata = data.frame(unidades = 5))
```

El modelo extrapola una unidad fuera del rango observado.

**Resultado esperado** `50` aproximadamente.

### Regresión logística y GLM

**Clave** `regresion-logistica-y-glm`

**Definición** `glm(..., family = binomial())` ajusta una respuesta binaria mediante un enlace logit por defecto.

**Búsqueda** glm, logística, odds, probabilidad

**Para recordar** Usa `type = "response"` para obtener probabilidades en el modelo binomial.

#### Estimar una probabilidad base

```r
x <- data.frame(compra = c(0, 0, 0, 1))
m <- glm(compra ~ 1, data = x, family = binomial())
plogis(coef(m))
```

Sin predictores, el modelo estima la tasa observada.

**Resultado esperado** `0.25` aproximadamente.

### Resultados con broom

**Clave** `resultados-con-broom`

**Definición** `tidy()` convierte coeficientes a tabla; `glance()` resume el modelo; `augment()` añade predicciones y residuos.

**Búsqueda** broom, tidy, glance, augment

**Para recordar** No confundas el formato tabular con la validación del modelo.

**Nota** Requiere broom; mtcars es un dataset incluido en R.

#### Extraer coeficientes en tabla

```r
m <- lm(mpg ~ wt, data = mtcars)
broom::tidy(m) |> select(term, estimate)
```

Cada término ocupa una fila.

**Resultado esperado** Intercepto aproximadamente 37.285 y wt -5.344.

## Bases de datos y SQL

**Clave** `bases-de-datos-y-sql`

### Definición

**Clave** `definicion`

**Definición** DBI proporciona una interfaz para conexiones y consultas; un controlador como RSQLite, RMariaDB o RPostgres implementa el acceso al motor.

**Búsqueda** DBI, SQL, conexión, dbConnect

**Para recordar** Cierra la conexión cuando termines y no guardes credenciales en scripts.

**Nota** Requiere DBI y RSQLite.

#### Consultar SQLite en memoria

```r
con <- DBI::dbConnect(RSQLite::SQLite(), ":memory:")
DBI::dbWriteTable(con, "pedidos", as.data.frame(pedidos |> select(id, monto)))
DBI::dbGetQuery(con, "SELECT SUM(monto) AS total FROM pedidos")
DBI::dbDisconnect(con)
```

La base temporal desaparece al desconectar.

**Resultado esperado** Tabla de una fila con total 900; conexión cerrada.

### Consultas parametrizadas

**Clave** `consultas-parametrizadas`

**Definición** Los parámetros de DBI separan los valores de la sentencia SQL y evitan concatenar texto de entrada directamente.

**Búsqueda** SQL injection, params, dbGetQuery

**Para recordar** La sintaxis de marcadores depende del controlador.

#### Filtrar por importe con SQLite

```r
con <- DBI::dbConnect(RSQLite::SQLite(), ":memory:")
DBI::dbWriteTable(con, "pedidos", as.data.frame(pedidos |> select(id, monto)))
DBI::dbGetQuery(con, "SELECT id FROM pedidos WHERE monto > ? ORDER BY id", params = list(200))
DBI::dbDisconnect(con)
```

El marcador `?` recibe 200 como dato.

**Resultado esperado** Una fila id=103.

### dbplyr y evaluación diferida

**Clave** `dbplyr-y-evaluacion-diferida`

**Definición** `tbl()` sobre una conexión representa una tabla remota; dbplyr traduce verbos a SQL y ejecuta al solicitar resultados.

**Búsqueda** dbplyr, lazy, collect, show_query

**Para recordar** Filtra y agrega en el servidor antes de traer grandes volúmenes.

**Nota** Requiere dbplyr, DBI y RSQLite; no todos los verbos se traducen igual en todos los motores.

#### Consultar una tabla remota

```r
library(dbplyr)
con <- DBI::dbConnect(RSQLite::SQLite(), ":memory:")
DBI::dbWriteTable(con, "pedidos", as.data.frame(pedidos |> select(id, monto)))
q <- tbl(con, "pedidos") |> filter(monto >= 200)
q |> collect()
DBI::dbDisconnect(con)
```

collect recupera los resultados locales.

**Resultado esperado** Dos filas id 102 y 103 con montos 200 y 300 (sin orden garantizado).

### Transacciones y escritura

**Clave** `transacciones-y-escritura`

**Definición** `dbExecute()` ejecuta sentencias de modificación; `dbWithTransaction()` confirma si se completa el bloque y revierte si falla.

**Búsqueda** INSERT, UPDATE, COMMIT, ROLLBACK

**Para recordar** No pruebes modificaciones en una base de producción sin autorización.

#### Insertar en una base temporal

```r
con <- DBI::dbConnect(RSQLite::SQLite(), ":memory:")
DBI::dbExecute(con, "CREATE TABLE ventas (monto INTEGER)")
DBI::dbWithTransaction(con, { DBI::dbExecute(con, "INSERT INTO ventas VALUES (100)") })
DBI::dbGetQuery(con, "SELECT monto FROM ventas")
DBI::dbDisconnect(con)
```

La transacción confirma la inserción exitosa.

**Resultado esperado** Una fila con monto 100.

## APIs y automatización

**Clave** `apis-y-automatizacion`

### Definición

**Clave** `definicion`

**Definición** Una API HTTP intercambia solicitudes y respuestas; httr2 construye y ejecuta solicitudes, y jsonlite interpreta contenido JSON.

**Búsqueda** API, HTTP, GET, httr2, JSON

**Para recordar** Comprueba código de estado, estructura y paginación antes de analizar.

**Nota** Requiere httr2.

#### Construir una solicitud sin enviarla

```r
req <- httr2::request("https://example.org") |> httr2::req_url_query(page = 2)
req
```

Construir el objeto no hace una llamada de red.

**Resultado esperado** Solicitud GET a https://example.org/?page=2 (representación según versión).

### Autenticación y respuestas

**Clave** `autenticacion-y-respuestas`

**Definición** `req_auth_bearer_token()` adjunta un token; `req_perform()` ejecuta; `resp_body_json()` interpreta una respuesta JSON.

**Búsqueda** token, HTTP status, response, autenticación

**Para recordar** Usa variables de entorno y evita imprimir secretos.

#### Preparar autenticación sin ejecutar

```r
token <- "TOKEN_DE_EJEMPLO_NO_REAL"
req <- httr2::request("https://example.org") |> httr2::req_auth_bearer_token(token)
inherits(req, "httr2_request")
```

No se envía la petición ni se usa un token real.

**Resultado esperado** `TRUE`.

### Paginación y reintentos

**Clave** `paginacion-y-reintentos`

**Definición** Muchas APIs entregan datos por páginas; la estrategia de avance depende de su contrato. `req_retry()` configura reintentos.

**Búsqueda** paginación, retry, rate limit, cursor

**Para recordar** Respeta límites de solicitudes y detén el recorrido cuando no exista siguiente página.

#### Unir páginas simuladas

```r
paginas <- list(data.frame(id = 1:2), data.frame(id = 3:4))
bind_rows(paginas)
```

La unión representa páginas ya recuperadas, sin acceder a una API real.

**Resultado esperado** Cuatro filas id 1,2,3,4.

### Procesar archivos por lotes

**Clave** `procesar-archivos-por-lotes`

**Definición** `list.files()` localiza archivos y funciones de iteración procesan cada uno.

**Búsqueda** automatizar CSV, batch, list.files

**Para recordar** Valida esquemas antes de concatenar.

#### Leer dos archivos de prueba

```r
dir <- tempfile(); dir.create(dir)
write.csv(data.frame(monto = 10), file.path(dir, "a.csv"), row.names = FALSE)
write.csv(data.frame(monto = 20), file.path(dir, "b.csv"), row.names = FALSE)
archivos <- list.files(dir, pattern = "[.]csv$", full.names = TRUE)
bind_rows(lapply(archivos, read.csv))
```

Se trabaja únicamente en un directorio temporal.

**Resultado esperado** Dos filas con monto 10 y 20.

## Reportes reproducibles

**Clave** `reportes-reproducibles`

### Definición

**Clave** `definicion`

**Definición** Quarto y R Markdown combinan texto, código y resultados en documentos que se pueden regenerar.

**Búsqueda** Quarto, R Markdown, knitr, reporte

**Para recordar** El documento debe declarar datos, dependencias y pasos.

**Nota** Requiere knitr.

#### Generar una tabla para un reporte

```r
knitr::kable(data.frame(pais = c("MX", "ES"), ventas = c(300, 100)))
```

kable prepara la tabla para el documento.

**Resultado esperado** Tabla Markdown o del formato activo con dos filas y columnas pais y ventas.

### Quarto y R Markdown

**Clave** `quarto-y-r-markdown`

**Definición** Un archivo `.qmd` o `.Rmd` contiene bloques de código R; el motor ejecuta esos bloques durante el renderizado.

**Búsqueda** qmd, Rmd, render, chunk

**Para recordar** Un documento reproducible no debe depender de objetos creados manualmente en la consola.

**Nota** Para renderizar se necesita Quarto CLI, paquete quarto y un motor R/knitr disponible; R Markdown usa rmarkdown::render().

#### Preparar y renderizar un reporte mínimo

````r
ruta <- tempfile(fileext = ".qmd")
writeLines(c("---", "title: Ventas", "format: html", "---", "", "```{r}", "sum(c(100, 200))", "```"), ruta)
# quarto::quarto_render(ruta)
````

La llamada de renderizado queda comentada para no exigir la instalación de Quarto.

**Resultado esperado** Archivo QMD que, al renderizarse, muestra el resultado 300 en HTML.

### Semillas y dependencias

**Clave** `semillas-y-dependencias`

**Definición** `renv` registra versiones de dependencias en un archivo de bloqueo, permitiendo restaurarlas posteriormente.

**Búsqueda** renv, lockfile, reproducibilidad

**Para recordar** `renv::snapshot()` registra; `renv::restore()` restaura.

**Nota** Requiere renv; init, snapshot y restore deben ejecutarse conscientemente en el proyecto correspondiente.

#### Consultar instrucciones de restauración

```r
help("restore", package = "renv")
```

La consulta no instala ni cambia paquetes.

**Resultado esperado** Documentación de la restauración de dependencias.

### Control de versiones y pipelines

**Clave** `control-de-versiones-y-pipelines`

**Definición** Git registra cambios de archivos; targets ejecuta etapas según dependencias y resultados previamente calculados.

**Búsqueda** Git, targets, pipeline, tar_target

**Para recordar** Versiona código y configuración; excluye secretos y datos sensibles.

**Nota** Requiere targets y un archivo `_targets.R` para ejecutar el pipeline completo.

#### Definir una etapa de cálculo

```r
targets::tar_target(total, sum(c(100, 200)))
```

tar_target define la etapa; tar_make la ejecuta dentro de un pipeline.

**Resultado esperado** Objeto de especificación de una etapa llamada total, que calcularía 300.

## Dashboards y aplicaciones

**Clave** `dashboards-y-aplicaciones`

### Definición

**Clave** `definicion`

**Definición** Shiny conecta entradas de usuario con resultados reactivos en aplicaciones web de R.

**Búsqueda** Shiny, dashboard, ui, server

**Para recordar** Los resultados reactivos se recalculan cuando cambian sus dependencias.

**Nota** Requiere shiny; ejecutar la última llamada abre un servicio local.

#### Crear una aplicación mínima

```r
ui <- shiny::fluidPage(shiny::numericInput("monto", "Monto", 100), shiny::textOutput("total"))
server <- function(input, output) {
  output$total <- shiny::renderText(input$monto * 2)
}
app <- shiny::shinyApp(ui, server)
# shiny::runApp(app)
```

renderText depende de input$monto.

**Resultado esperado** Al ejecutar la app, la entrada 100 muestra 200; al cambiarla a 150 muestra 300.

### Reactivos y salidas

**Clave** `reactivos-y-salidas`

**Definición** `reactive()` define un cálculo que se puede reutilizar en múltiples salidas; `renderPlot()` y `renderTable()` generan salidas visibles.

**Búsqueda** reactivity, reactive, renderPlot, renderTable

**Para recordar** Invoca un valor reactivo como función dentro del contexto reactivo.

#### Definir una salida de tabla filtrada

```r
ui <- shiny::fluidPage(shiny::numericInput("minimo", "Mínimo", 200), shiny::tableOutput("tabla"))
server <- function(input, output) {
  datos <- shiny::reactive(pedidos |> filter(monto >= input$minimo))
  output$tabla <- shiny::renderTable(datos())
}
app <- shiny::shinyApp(ui, server)
```

El filtro depende de una entrada.

**Resultado esperado** Al iniciar app con runApp, aparecen pedidos 102 y 103; al variar mínimo cambia la tabla.

### Dashboards de reportes

**Clave** `dashboards-de-reportes`

**Definición** Quarto dashboards y flexdashboard organizan tablas, gráficos e indicadores en una interfaz de reporte.

**Búsqueda** dashboard, flexdashboard, Quarto, KPI

**Para recordar** Un dashboard estático no necesita un servidor Shiny; uno reactivo puede necesitarlo.

**Nota** El layout requiere un documento Quarto con format dashboard o flexdashboard instalado; no se crea el dashboard completo con este código.

#### Preparar un indicador para un dashboard

```r
tibble::tibble(indicador = "Ingresos completados", valor = sum(pedidos$monto[pedidos$estado == "completado"]))
```

Este resultado puede alimentar una tarjeta o tabla del dashboard.

**Resultado esperado** Una fila con indicador Ingresos completados y valor 750.

## Series temporales y pronósticos

**Clave** `series-temporales-y-pronosticos`

### Definición

**Clave** `definicion`

**Definición** Una serie temporal ordena observaciones en el tiempo; `ts()` representa series regulares con frecuencia conocida.

**Búsqueda** time series, ts, forecasting

**Para recordar** Comprueba frecuencia y huecos antes de ajustar un pronóstico.

#### Representar ventas mensuales

```r
x <- ts(c(100, 120, 140), start = c(2026, 1), frequency = 12)
frequency(x)
```

La serie representa doce periodos por año.

**Resultado esperado** `12`.

### Tendencia y estacionalidad

**Clave** `tendencia-y-estacionalidad`

**Definición** La tendencia describe cambio persistente; la estacionalidad describe patrones que se repiten con una frecuencia.

**Búsqueda** decompose, STL, estacionalidad

**Para recordar** Necesitas suficientes ciclos observados para separar componentes.

#### Descomponer una serie trimestral simulada

```r
x <- ts(rep(c(10, 20, 30, 40), 3) + 1:12, frequency = 4)
d <- decompose(x)
round(d$figure, 1)
```

El modelo aditivo separa tendencia y efecto estacional.

**Resultado esperado** Patrón estacional trimestral -15, -5, 5, 15.

### Pronóstico y evaluación temporal

**Clave** `pronostico-y-evaluacion-temporal`

**Definición** Un pronóstico estima valores futuros; modelos ETS y ARIMA representan patrones temporales distintos.

**Búsqueda** forecast, ARIMA, ETS, holdout temporal

**Para recordar** Evalúa con periodos posteriores a los de entrenamiento, sin fuga de futuro.

#### Pronosticar una serie con suavizamiento simple

```r
x <- ts(c(100, 100, 100, 100, 100))
fit <- HoltWinters(x, alpha = .5, beta = FALSE, gamma = FALSE)
as.numeric(predict(fit, n.ahead = 2))
```

El nivel constante permanece igual.

**Resultado esperado** Dos pronósticos de 100.

### zoo, xts y tsibble

**Clave** `zoo-xts-y-tsibble`

**Definición** Estos paquetes representan observaciones indexadas por tiempo; tsibble explicita índice y claves.

**Búsqueda** zoo, xts, tsibble, serie irregular

**Para recordar** No asumas intervalos regulares si las fechas son irregulares.

**Nota** Requiere zoo; xts y tsibble son alternativas.

#### Crear observaciones indexadas

```r
x <- zoo::zoo(c(100, 200), as.Date(c("2026-03-01", "2026-03-05")))
zoo::index(x)
```

El índice conserva el hueco de cuatro días.

**Resultado esperado** Fechas 2026-03-01 y 2026-03-05.

## Machine learning y evaluación

**Clave** `machine-learning-y-evaluacion`

### Definición

**Clave** `definicion`

**Definición** El aprendizaje automático ajusta reglas a datos para predecir o descubrir patrones. La evaluación debe realizarse sobre observaciones no usadas para ajustar el modelo.

**Búsqueda** machine learning, train, test, generalización

**Para recordar** Separa entrenamiento y prueba antes de aprender transformaciones.

#### Separar observaciones de forma reproducible

```r
set.seed(42)
idx <- sample(seq_len(nrow(mtcars)), 24)
c(train = nrow(mtcars[idx, ]), test = nrow(mtcars[-idx, ]))
```

Los conjuntos no comparten posiciones.

**Resultado esperado** train=24 y test=8.

### Regresión y métricas

**Clave** `regresion-y-metricas`

**Definición** MAE mide error absoluto medio; RMSE penaliza más los errores grandes; R² describe ajuste según la definición utilizada.

**Búsqueda** MAE, RMSE, R2, predicción

**Para recordar** Compara modelos con la misma muestra de evaluación.

#### Calcular error de predicción

```r
real <- c(100, 200)
pred <- c(90, 220)
c(MAE = mean(abs(real - pred)), RMSE = sqrt(mean((real - pred)^2)))
```

Los errores absolutos son 10 y 20.

**Resultado esperado** MAE=15, RMSE≈15.81.

### Clasificación y métricas

**Clave** `clasificacion-y-metricas`

**Definición** Una clasificación predice categorías. Exactitud, precisión, recall, F1 y ROC AUC capturan aspectos distintos del rendimiento.

**Búsqueda** confusion matrix, accuracy, precision, recall, F1, AUC

**Para recordar** En clases desbalanceadas, accuracy sola puede resultar engañosa.

#### Calcular precisión y recall

```r
real <- c(1, 1, 0, 0)
pred <- c(1, 0, 1, 0)
tp <- sum(real == 1 & pred == 1)
c(precision = tp / sum(pred == 1), recall = tp / sum(real == 1))
```

Hay un verdadero positivo de dos positivos predichos y dos positivos reales.

**Resultado esperado** Ambos 0.5.

### Árboles y random forest

**Clave** `arboles-y-random-forest`

**Definición** Un árbol divide observaciones mediante reglas; random forest combina muchos árboles para estabilizar predicciones.

**Búsqueda** rpart, random forest, ranger, árbol

**Para recordar** Evalúa profundidad, complejidad y desempeño fuera de muestra.

**Nota** Requiere rpart; ranger permite ajustar random forests.

#### Ajustar un árbol a datos de ejemplo

```r
m <- rpart::rpart(Species ~ ., data = iris, method = "class")
length(predict(m, iris[1:5, ], type = "class"))
```

Cada fila recibe una clase; aquí solo se muestra la interfaz.

**Resultado esperado** `5` predicciones categóricas.

### Clustering

**Clave** `clustering`

**Definición** El clustering agrupa observaciones sin una etiqueta objetivo; k-means minimiza distancias cuadráticas a centros.

**Búsqueda** kmeans, clustering, segmentación

**Para recordar** Escala variables cuando sus unidades sean incompatibles.

**Nota** Los números de etiqueta no tienen significado ordinal.

#### Separar dos grupos claros

```r
x <- matrix(c(0, 0, 1, 1, 10, 10, 11, 11), ncol = 2, byrow = TRUE)
m <- kmeans(x, centers = x[c(1, 3), ])
sort(as.integer(table(m$cluster)))
```

Cada grupo contiene dos puntos.

**Resultado esperado** `c(2, 2)`.

### Validación cruzada y tuning

**Clave** `validacion-cruzada-y-tuning`

**Definición** La validación cruzada separa varias particiones de entrenamiento y evaluación; el tuning elige hiperparámetros usando solo datos de entrenamiento.

**Búsqueda** cross validation, folds, tuning, leakage

**Para recordar** Reserva un conjunto final que no participe en el ajuste ni en el tuning.

**Nota** Requiere rsample.

#### Crear cinco particiones

```r
set.seed(42)
f <- rsample::vfold_cv(iris, v = 5, strata = Species)
nrow(f)
```

Cada partición tiene un conjunto de análisis y otro de evaluación.

**Resultado esperado** `5`.

### tidymodels y caret

**Clave** `tidymodels-y-caret`

**Definición** tidymodels separa recetas, especificación de modelo, workflows y evaluación; caret ofrece otra interfaz para entrenar y validar modelos.

**Búsqueda** tidymodels, recipes, parsnip, workflows, caret

**Para recordar** Aprende preprocesamiento solo con el conjunto de entrenamiento.

**Nota** Requiere recipes, parsnip y workflows; para evaluación real usa datos separados.

#### Crear un workflow de regresión

```r
rec <- recipes::recipe(mpg ~ wt, data = mtcars)
mod <- parsnip::linear_reg() |> parsnip::set_engine("lm")
w <- workflows::workflow() |> workflows::add_recipe(rec) |> workflows::add_model(mod)
fit <- parsnip::fit(w, data = mtcars)
predict(fit, new_data = data.frame(wt = 3))
```

El workflow reúne fórmula y modelo.

**Resultado esperado** Predicción de mpg aproximadamente 21.25.

## Evaluación de expresiones y objetos

**Clave** `evaluacion-de-expresiones-y-objetos`

### Definición

**Clave** `definicion`

**Definición** R permite que una función reciba expresiones sin evaluarlas inmediatamente. dplyr usa data masking para interpretar nombres de columnas dentro de verbos.

**Búsqueda** NSE, data masking, tidy evaluation

**Para recordar** Distingue un nombre de columna de una variable del entorno.

#### Referirse explícitamente a una columna

```r
limite <- 200
pedidos |> filter(.data$monto >= .env$limite) |> pull(id)
```

.data busca en la tabla y .env en el entorno.

**Resultado esperado** `c(102, 103)`.

### Tidy evaluation

**Clave** `tidy-evaluation`

**Definición** `{{ }}` permite pasar un argumento de columna a un verbo de tidyverse; `enquo()` captura una expresión y su entorno.

**Búsqueda** embrace, enquo, quosure, tidy eval

**Para recordar** Usa `{{ columna }}` para reenviar argumentos de data masking.

#### Crear una función de resumen

```r
resumir <- function(tabla, columna) tabla |> summarise(total = sum({{ columna }}))
resumir(pedidos, monto)
```

La columna se proporciona sin comillas.

**Resultado esperado** Una fila total=900.

### S3

**Clave** `s3`

**Definición** S3 despacha métodos según la clase del objeto mediante funciones genéricas como `print()` o `summary()`.

**Búsqueda** S3, UseMethod, class, método

**Para recordar** Una misma función genérica puede comportarse distinto según la clase.

#### Definir un método para un importe

```r
print.importe <- function(x, ...) cat("Importe:", unclass(x), "\n")
print(structure(100, class = "importe"))
```

print despacha a print.importe.

**Resultado esperado** Salida `Importe: 100`.

### S4 y R6

**Clave** `s4-y-r6`

**Definición** S4 define clases y métodos formales con slots; R6 crea objetos con métodos y semántica de referencia.

**Búsqueda** S4, R6, slots, objetos mutables

**Para recordar** R6 permite modificar el mismo objeto a través de referencias.

**Nota** Requiere R6; S4 usa methods::setClass y methods::setMethod.

#### Crear una clase de contador

```r
Contador <- R6::R6Class("Contador", public = list(n = 0, sumar = function() self$n <- self$n + 1))
x <- Contador$new()
x$sumar()
x$n
```

El método cambia el estado de la instancia.

**Resultado esperado** `1`.

## Rendimiento y datos grandes

**Clave** `rendimiento-y-datos-grandes`

### Definición

**Clave** `definicion`

**Definición** Optimizar consiste en medir tiempo y memoria, identificar cuellos de botella y reducir trabajo innecesario sin alterar resultados.

**Búsqueda** performance, profiling, benchmark

**Para recordar** Mide antes de optimizar; verifica equivalencia después.

#### Medir un cálculo

```r
system.time(sum(seq_len(100000)))
```

system.time mide la evaluación de la expresión.

**Resultado esperado** Tiempo de usuario, sistema y transcurrido; depende del equipo.

### data.table

**Clave** `data-table`

**Definición** data.table ofrece manipulación tabular mediante `DT[i, j, by]`, donde i filtra, j calcula y by agrupa.

**Búsqueda** data.table, DT, by, :=

**Para recordar** `:=` modifica por referencia; usa `copy()` si necesitas preservar el original.

**Nota** Requiere data.table.

#### Sumar por cliente

```r
dt <- data.table::as.data.table(pedidos)
dt[, .(total = sum(monto)), by = cliente_id]
```

by agrupa antes de calcular j.

**Resultado esperado** Filas `(1,300)`, `(2,400)`, `(3,200)`.

### Profiling y memoria

**Clave** `profiling-y-memoria`

**Definición** `Rprof()` registra muestras de ejecución; `object.size()` estima el tamaño de un objeto.

**Búsqueda** Rprof, profvis, memoria, benchmarking

**Para recordar** El tamaño de un objeto no equivale siempre a toda la memoria del proceso.

#### Comparar tamaños de vectores

```r
object.size(numeric(1000)) > object.size(numeric(10))
```

Se comparan dos objetos del mismo tipo.

**Resultado esperado** `TRUE`.

### Arrow y Parquet

**Clave** `arrow-y-parquet`

**Definición** Arrow facilita leer datos columnares; Parquet conserva tipos y permite lectura eficiente.

**Búsqueda** Arrow, Parquet, open_dataset

**Para recordar** Selecciona y filtra antes de materializar grandes datasets.

**Nota** Requiere arrow.

#### Guardar y leer una tabla pequeña

```r
ruta <- tempfile(fileext = ".parquet")
arrow::write_parquet(pedidos, ruta)
nrow(arrow::read_parquet(ruta))
```

Se conserva el número de registros.

**Resultado esperado** `6`.

### DuckDB

**Clave** `duckdb`

**Definición** DuckDB es un motor analítico embebido que puede consultar archivos y tablas desde R a través de DBI.

**Búsqueda** DuckDB, OLAP, SQL local

**Para recordar** Proyecta columnas y filtra antes de traer datos a memoria.

**Nota** Requiere duckdb y DBI.

#### Ejecutar SQL analítico local

```r
con <- DBI::dbConnect(duckdb::duckdb(), dbdir = ":memory:")
DBI::dbGetQuery(con, "SELECT 100 + 200 AS total")
DBI::dbDisconnect(con, shutdown = TRUE)
```

El motor ejecuta la consulta sin servidor remoto.

**Resultado esperado** Una fila total=300.

## Pruebas, errores y paquetes

**Clave** `pruebas-errores-y-paquetes`

### Definición

**Clave** `definicion`

**Definición** El código mantenible comprueba supuestos, maneja fallos y separa funciones reutilizables de scripts de ejecución.

**Búsqueda** debug, errores, test, paquete

**Para recordar** No ocultes errores sin registrar su causa.

#### Detectar una condición inválida

```r
stopifnot(all(pedidos$monto >= 0))
```

La aserción detiene una ejecución incorrecta.

**Resultado esperado** Sin error si todos los importes son no negativos.

### Condiciones y tryCatch

**Clave** `condiciones-y-trycatch`

**Definición** `stop()` señala error; `warning()` advierte; `tryCatch()` permite manejar condiciones.

**Búsqueda** tryCatch, warning, stop, error

**Para recordar** Captura únicamente los errores que sepas tratar.

#### Dar una alternativa ante un fallo conocido

```r
tryCatch(stop("Dato inválido"), error = function(e) NA_real_)
```

El manejador devuelve un valor faltante.

**Resultado esperado** `NA_real_`.

### Depuración

**Clave** `depuracion`

**Definición** `traceback()` muestra llamadas tras un error no capturado; `debugonce()` y `browser()` permiten inspeccionar ejecución.

**Búsqueda** debugonce, traceback, browser

**Para recordar** Reproduce primero el fallo con el mínimo código.

#### Inspeccionar la definición de una función

```r
calcular <- function(x) sum(x)
body(calcular)
```

Puedes revisar el cuerpo antes de iniciar depuración interactiva.

**Resultado esperado** Expresión `sum(x)`.

### testthat

**Clave** `testthat`

**Definición** testthat compara resultados reales con expectativas y agrupa comprobaciones en pruebas.

**Búsqueda** testthat, expect_equal, unit test

**Para recordar** Prueba casos normales, límites y valores faltantes.

**Nota** Requiere testthat.

#### Comprobar una función de descuento

```r
descuento <- function(x) x * .9
testthat::test_that("descuento del 10%", {
  testthat::expect_equal(descuento(100), 90)
})
```

La expectativa compara el resultado con 90.

**Resultado esperado** Prueba aprobada.

### Desarrollo de paquetes

**Clave** `desarrollo-de-paquetes`

**Definición** Un paquete organiza código en R/, metadatos en DESCRIPTION, exportaciones en NAMESPACE y pruebas en tests/.

**Búsqueda** devtools, usethis, roxygen2, R CMD check

**Para recordar** Documenta funciones y declara dependencias; no dependas de paquetes adjuntados por casualidad.

**Nota** Para crear y comprobar paquetes se usan usethis::create_package(), devtools::document() y devtools::check().

#### Consultar metadatos de un paquete instalado

```r
packageDescription("dplyr", fields = c("Package", "Version"))
```

DESCRIPTION declara metadatos.

**Resultado esperado** Nombre dplyr y versión instalada.

## Visualización interactiva y espacial

**Clave** `visualizacion-interactiva-y-espacial`

### Definición

**Clave** `definicion`

**Definición** Los gráficos interactivos permiten explorar marcas y escalas; los datos espaciales añaden geometrías y sistemas de coordenadas.

**Búsqueda** plotly, sf, mapas, animación

**Para recordar** Distingue interactividad, animación y análisis espacial.

**Nota** Requiere plotly y un visor HTML.

#### Crear un gráfico interactivo

```r
plotly::plot_ly(productos, x = ~producto, y = ~precio, type = "bar")
```

plot_ly usa las columnas para las marcas.

**Resultado esperado** Tres barras interactivas con precios 50, 100 y 300.

### Geometrías y CRS

**Clave** `geometrias-y-crs`

**Definición** sf combina atributos con geometrías; el CRS define el sistema de referencia de coordenadas.

**Búsqueda** sf, CRS, st_as_sf, coordenadas

**Para recordar** Declara el CRS de origen y transforma antes de medir distancias si corresponde.

**Nota** Requiere sf.

#### Crear dos puntos de ejemplo

```r
x <- data.frame(lon = c(-99, -98), lat = c(19, 20))
g <- sf::st_as_sf(x, coords = c("lon", "lat"), crs = 4326)
sf::st_geometry_type(g)
```

Las coordenadas están en longitud y latitud WGS84.

**Resultado esperado** Dos geometrías POINT.

### Mapas y uniones espaciales

**Clave** `mapas-y-uniones-espaciales`

**Definición** `geom_sf()` dibuja geometrías; `st_join()` relaciona objetos según predicados espaciales.

**Búsqueda** geom_sf, st_join, mapa

**Para recordar** Verifica que ambos objetos tengan CRS compatibles antes de unir.

#### Dibujar ubicaciones ficticias

```r
g <- sf::st_as_sf(data.frame(lon = c(-99, -98), lat = c(19, 20)), coords = c("lon", "lat"), crs = 4326)
ggplot2::ggplot(g) + ggplot2::geom_sf()
```

geom_sf interpreta la columna de geometría.

**Resultado esperado** Dos puntos en un plano de coordenadas geográficas.

### Animación

**Clave** `animacion`

**Definición** gganimate crea secuencias de estados a partir de gráficos ggplot2.

**Búsqueda** gganimate, transition_states, animation

**Para recordar** Cada estado debe conservar una identificación coherente de marcas.

**Nota** Requiere gganimate y un renderizador compatible para producir la animación.

#### Definir una animación de ventas

```r
x <- data.frame(mes = c("marzo", "abril"), ventas = c(600, 150))
g <- ggplot2::ggplot(x, ggplot2::aes(x = "Total", y = ventas)) + ggplot2::geom_col() + gganimate::transition_states(mes)
# gganimate::animate(g)
```

transition_states define estados sucesivos.

**Resultado esperado** Objeto animable; al renderizar muestra una barra que cambia de 600 a 150.

## Análisis estadístico especializado

**Clave** `analisis-estadistico-especializado`

### Definición

**Clave** `definicion`

**Definición** Los métodos especializados responden preguntas que necesitan supuestos, estructuras de datos o modelos adicionales a una descripción de negocio.

**Búsqueda** PCA, causalidad, Bayes, supervivencia, NLP

**Para recordar** Elige el método por la pregunta y los supuestos, no por su complejidad.

#### Comparar dimensiones de un análisis multivariante

```r
p <- prcomp(iris[, 1:4], scale. = TRUE)
dim(p$x)
```

PCA transforma variables numéricas correlacionadas en componentes ortogonales.

**Resultado esperado** 150 filas y 4 componentes principales.

### Análisis causal

**Clave** `analisis-causal`

**Definición** La inferencia causal intenta estimar efectos de intervenciones bajo supuestos de identificación; la asignación aleatoria ayuda a controlar confusión.

**Búsqueda** causal inference, ATE, confounding, DAG

**Para recordar** Una asociación observacional no es por sí sola un efecto causal.

#### Calcular una diferencia de medias experimental

```r
x <- data.frame(tratamiento = c(0,0,1,1), y = c(10,12,14,16))
mean(x$y[x$tratamiento == 1]) - mean(x$y[x$tratamiento == 0])
```

Es una diferencia observada; sería un estimador del efecto bajo un diseño aleatorio apropiado.

**Resultado esperado** `4`.

### Análisis bayesiano

**Clave** `analisis-bayesiano`

**Definición** Actualiza una distribución previa con evidencia mediante un modelo probabilístico para obtener una distribución posterior.

**Búsqueda** Bayes, prior, posterior, Beta binomial

**Para recordar** Explicita prior, verosimilitud y supuestos.

#### Actualizar una tasa de conversión

```r
a <- 1 + 20
b <- 1 + 80
a / (a + b)
```

Un prior Beta(1,1) y 20 éxitos de 100 dan Beta(21,81).

**Resultado esperado** Media posterior 21/102, aproximadamente 0.2059.

### Supervivencia

**Clave** `supervivencia`

**Definición** El análisis de supervivencia estudia tiempo hasta un evento y permite considerar observaciones censuradas.

**Búsqueda** survival, Kaplan Meier, censura, Cox

**Para recordar** Una observación censurada no equivale a un evento observado.

**Nota** Requiere survival; survfit ajusta curvas y coxph modelos de riesgos proporcionales.

#### Crear respuesta de tiempo a evento

```r
survival::Surv(time = c(2, 4, 5), event = c(1, 0, 1))
```

event=0 representa censura derecha.

**Resultado esperado** Tres tiempos: 2, 4+ y 5; el signo + indica censura.

### Texto y NLP

**Clave** `texto-y-nlp`

**Definición** El procesamiento de lenguaje natural transforma texto en representaciones útiles para analizar contenido.

**Búsqueda** tidytext, tokens, NLP, TF-IDF

**Para recordar** La tokenización depende de idioma y objetivo; cuenta términos sin perder contexto de interpretación.

**Nota** Requiere tidytext.

#### Separar reseñas en palabras

```r
x <- tibble::tibble(id = 1:2, reseña = c("muy bueno", "buen precio"))
tidytext::unnest_tokens(x, palabra, reseña) |> count(palabra)
```

Cada palabra pasa a una fila.

**Resultado esperado** Cuatro términos con frecuencia 1: buen, bueno, muy, precio.

### Simulación Monte Carlo

**Clave** `simulacion-monte-carlo`

**Definición** Monte Carlo aproxima cantidades mediante muchas realizaciones aleatorias de un modelo.

**Búsqueda** Monte Carlo, simulación, replicar

**Para recordar** Una simulación refleja los supuestos de entrada, no predice automáticamente la realidad.

#### Simular ingresos por conversiones

```r
set.seed(42)
x <- rbinom(10000, size = 100, prob = .2) * 10
mean(x)
```

Cada réplica simula 100 visitas y 10 unidades monetarias por conversión.

**Resultado esperado** Valor cercano a 200; varía por simulación.

## Fuentes

Referencias oficiales y documentación de los proyectos para ampliar las reglas y comprobar variantes por versión. Los ejemplos y el dataset son originales y sus resultados son esperados, no registros de ejecución.

- [An Introduction to R (CRAN)](https://cran.r-project.org/doc/manuals/r-release/R-intro.html): tipos, vectores, matrices, factores, indexación, funciones, modelos y gráficos base.
- [R Language Definition (CRAN)](https://cran.r-project.org/doc/manuals/r-release/R-lang.html): evaluación, entornos, funciones, indexación, coerción y objetos.
- [R Data Import/Export (CRAN)](https://cran.r-project.org/doc/manuals/r-release/R-data.html): archivos, conexiones y formatos de intercambio.
- [R manuals](https://cran.r-project.org/manuals.html): manuales del lenguaje, administración y creación de paquetes.
- [RStudio IDE](https://docs.posit.co/ide/user/): consola, proyectos, editor y depuración.
- [tibble](https://tibble.tidyverse.org/reference/): creación, impresión y extracción de tablas.
- [dplyr](https://dplyr.tidyverse.org/reference/): selección, filtrado, mutate, summarise, group_by, distinct, joins, ranking y agregación condicional.
- [dplyr: mutating joins](https://dplyr.tidyverse.org/reference/mutate-joins.html): claves, tipos de join, relationship y na_matches.
- [dplyr: window functions](https://dplyr.tidyverse.org/articles/window-functions.html): rankings, offsets y acumulados.
- [dplyr: programming](https://dplyr.tidyverse.org/articles/programming.html): data masking, .data, .env y tidy evaluation.
- [tidyr](https://tidyr.tidyverse.org/reference/): pivots, separación, unnest, complete, fill y faltantes.
- [readr](https://readr.tidyverse.org/reference/): CSV, tipos de columnas y análisis de texto delimitado.
- [readxl](https://readxl.tidyverse.org/reference/) y [writexl](https://docs.ropensci.org/writexl/): lectura y escritura de Excel.
- [stringr](https://stringr.tidyverse.org/reference/): patrones, limpieza y transformación de cadenas.
- [lubridate](https://lubridate.tidyverse.org/reference/): parseo, periodos, intervalos y calendario.
- [forcats](https://forcats.tidyverse.org/reference/) y [purrr](https://purrr.tidyverse.org/reference/): factores e iteración.
- [slider](https://slider.r-lib.org/reference/): ventanas móviles.
- [stats de R](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/00Index.html): estadística descriptiva e inferencial, pruebas, regresión, PCA, simulación y series temporales.
- [ggplot2](https://ggplot2.tidyverse.org/reference/): capas, geometrías, escalas, facetas y exportación.
- [broom](https://broom.tidymodels.org/reference/): tidy, glance y augment.
- [DBI](https://dbi.r-dbi.org/reference/), [RSQLite](https://rsqlite.r-dbi.org/) y [dbplyr](https://dbplyr.tidyverse.org/): conexiones, parámetros, transacciones y traducción a SQL.
- [httr2](https://httr2.r-lib.org/reference/) y [jsonlite (CRAN)](https://cran.r-project.org/package=jsonlite): HTTP, autenticación y JSON.
- [Quarto con R](https://quarto.org/docs/computations/r.html), [R Markdown](https://rmarkdown.rstudio.com/) y [knitr](https://yihui.org/knitr/): reportes reproducibles.
- [renv](https://rstudio.github.io/renv/), [targets](https://docs.ropensci.org/targets/) y [Git](https://git-scm.com/docs): dependencias, pipelines y control de versiones.
- [Shiny](https://shiny.posit.co/r/), [Quarto dashboards](https://quarto.org/docs/dashboards/) y [flexdashboard](https://pkgs.rstudio.com/flexdashboard/): aplicaciones reactivas y reportes en paneles.
- [zoo (CRAN)](https://cran.r-project.org/package=zoo), [xts](https://joshuaulrich.github.io/xts/) y [tsibble](https://tsibble.tidyverts.org/): datos indexados en el tiempo.
- [tidymodels: evaluación con remuestreo](https://www.tidymodels.org/start/resampling/), [recipes](https://recipes.tidymodels.org/), [parsnip](https://parsnip.tidymodels.org/), [workflows](https://workflows.tidymodels.org/) y [caret](https://topepo.github.io/caret/): entrenamiento, preprocesamiento, métricas y validación.
- [rpart (CRAN)](https://cran.r-project.org/package=rpart) y [ranger (CRAN)](https://cran.r-project.org/package=ranger): árboles y random forests.
- [R6](https://r6.r-lib.org/) y [methods de R](https://stat.ethz.ch/R-manual/R-devel/library/methods/html/00Index.html): clases y métodos.
- [data.table](https://rdatatable.gitlab.io/data.table/), [Arrow para R](https://arrow.apache.org/docs/r/) y [DuckDB para R](https://duckdb.org/docs/stable/clients/r): rendimiento, almacenamiento columnar y SQL analítico.
- [testthat](https://testthat.r-lib.org/), [devtools](https://devtools.r-lib.org/) y [usethis](https://usethis.r-lib.org/): pruebas y desarrollo de paquetes.
- [plotly para R](https://plotly.com/r/), [sf](https://r-spatial.github.io/sf/) y [gganimate](https://gganimate.com/): gráficos interactivos, geometrías y animación.
- [survival (CRAN)](https://cran.r-project.org/package=survival) y [tidytext](https://juliasilge.github.io/tidytext/): tiempo a evento y análisis de texto.
