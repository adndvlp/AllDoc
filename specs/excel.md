# Excel

**Clave** `excel`

**Área** Análisis de datos (ubicación propuesta)

**Resumen** Organiza, limpia, cruza y analiza datos con fórmulas, tablas, visualizaciones y herramientas de Excel.

**Alcance** Temario amplio de referencia para Data Analyst / Business Analyst Jr, desde hojas y fórmulas hasta análisis, modelado, reporting y automatización. Incluye introducciones aplicadas a Power Query, Power Pivot, DAX y automatización; no pretende enumerar todas las funciones especializadas ni sustituir sus propios temarios.

**Entorno** Excel de Microsoft 365 de escritorio para Windows como referencia. Se señalan las funciones modernas y las prestaciones que requieren complementos o una plataforma compatible. Las fórmulas usan nombres ingleses, coma como separador de argumentos y punto decimal. En instalaciones en español, por ejemplo, `SUM` = `SUMA`, `IF` = `SI`, `XLOOKUP` = `BUSCARX`, `FILTER` = `FILTRAR`; usa los nombres y separadores de tu instalación (frecuentemente `;` y coma decimal). Consulta el listado oficial en español del anexo. Los resultados son esperados, no salidas ejecutadas en Excel.

## Datos compartidos

Crea un libro `.xlsx` con las hojas siguientes. Copia cada tabla desde A1 con sus encabezados. Las letras indican columnas, no forman parte del encabezado. Introduce las fechas como fechas reales (por ejemplo, con `=DATE(2026,1,5)` si el texto ISO no se reconoce), y los importes y cantidades como números. Las celdas indicadas como vacías deben estar realmente vacías.

**Sales** (una fila por pedido, un producto por pedido; importes en una única moneda ficticia):

| A: order_id | B: order_date | C: customer_id | D: product_id | E: quantity | F: unit_price | G: status | H: channel | I: amount |
| --- | --- | --- | --- | ---: | ---: | --- | --- | ---: |
| 101 | 2026-01-05 | C1 | P1 | 2 | 100 | completed | Online | 200 |
| 102 | 2026-01-10 | C2 | P2 | 1 | 300 | completed | Store | 300 |
| 103 | 2026-01-20 | C1 | P2 | 2 | 300 | cancelled | Online | 600 |
| 104 | 2026-02-02 | C3 | P1 | 3 | 100 | completed | Online | 300 |
| 105 | 2026-02-05 | C2 | P3 | 2 | 50 | completed | Store | 100 |
| 106 | 2026-02-05 | C1 | P3 | 4 | 50 | completed | Online | 200 |
| 107 | 2026-02-10 | C4 | P2 | 1 | 300 | pending | Store | 300 |
| 108 | 2026-02-15 | C3 | P3 | 2 | 50 | completed | Online | 100 |

**Customers** (una fila por cliente):

| A: customer_id | B: name | C: country |
| --- | --- | --- |
| C1 | Ana | Mexico |
| C2 | Luis | Mexico |
| C3 | Marta | Spain |
| C4 | Leo | |
| C5 | Eva | Mexico |

**Products** (una fila por producto):

| A: product_id | B: product_name | C: category | D: price |
| --- | --- | --- | ---: |
| P1 | Mouse | Electronics | 100 |
| P2 | Monitor | Electronics | 300 |
| P3 | Cable | Accessories | 50 |

**Targets** (metas de venta completada por mes):

| A: month | B: target | C: actual |
| --- | ---: | ---: |
| 2026-01-01 | 600 | 500 |
| 2026-02-01 | 650 | 700 |

**Leads** (registros deliberadamente repetidos):

| A: lead_id | B: email | C: source |
| --- | --- | --- |
| 1 | ana@example.com | Ads |
| 2 | luis@example.com | Organic |
| 3 | ana@example.com | Referral |
| 4 | eva@example.com | Ads |
| 5 | ana@example.com | Ads |

**Preparación común:** convierte cada rango en tabla de Excel con encabezados (Insertar > Tabla) y nómbralas `tSales`, `tCustomers`, `tProducts`, `tTargets`, `tLeads` en Diseño de tabla. Si estás estudiando las fichas de fundamentos, puedes comenzar con rangos y convertirlos cuando llegues al grupo Tablas. Crea también una hoja `Scratch` vacía. Las relaciones son `Sales.customer_id → Customers.customer_id` y `Sales.product_id → Products.product_id`; ambas de muchos a uno. El precio de venta en Sales es el histórico, no necesariamente el precio de catálogo.

**Uso:** salvo indicación distinta, escribe las fórmulas en celdas vacías de Scratch. Los ejemplos son independientes; restaura los datos originales antes de otro ejemplo que modifique una tabla, filtro o formato. Cuando se indique una celda de Sales, escribe allí o en la copia indicada. Para matrices dinámicas deja libre el área de salida y usa celdas fuera de tablas. Para prácticas de interfaz que alteran datos usa una copia. Una fórmula sin `=` en DAX, M, VBA o TypeScript sigue las reglas de su propio entorno, no las de la hoja.

**Controles del dataset:** 8 pedidos, 6 completados, 1 cancelado y 1 pendiente; importe de todos los pedidos 2100; ventas completadas 1200 (enero 500, febrero 700); 4 clientes con pedidos, 3 con pedidos completados y 1 sin pedidos. Los ejemplos llaman venta al importe completado salvo que se especifique otro alcance.


## Libro, hojas y celdas

**Clave** `libro-hojas-y-celdas`


### Definición

**Clave** `definicion`

**Definición** Un libro contiene hojas; cada hoja organiza valores en filas y columnas. Una celda es la intersección de ambas.

**Búsqueda** libro, worksheet, celda, rango

**Para recordar** La dirección combina columna y fila.


#### Localizar un pedido


En Sales, escribe A2 en el cuadro de nombres y pulsa Enter.


**Resultado esperado** Se selecciona la celda que contiene 101.


### Rangos y selección

**Clave** `rangos-y-seleccion`

**Definición** Un rango reúne celdas contiguas o seleccionadas conjuntamente.

**Búsqueda** A1, A1:B9, seleccionar rango

**Para recordar** Los dos extremos de un rango están incluidos.


#### Seleccionar importes


Escribe I2:I9 en el cuadro de nombres de Sales.


**Resultado esperado** Se seleccionan 8 importes.


### Tipos de datos y formatos

**Clave** `tipos-de-datos-y-formatos`

**Definición** Una celda puede contener números, texto, fechas, valores lógicos, fórmulas o errores; el formato cambia su presentación.

**Búsqueda** número como texto, fecha, moneda

**Para recordar** Cambiar el formato no convierte necesariamente el tipo.


#### Mostrar moneda


Selecciona Sales!I2 y aplica formato Moneda con dos decimales.


**Resultado esperado** 200 aparece con símbolo monetario y dos decimales; el valor sigue siendo 200.


### Fechas y porcentajes

**Clave** `fechas-y-porcentajes`

**Definición** Excel representa fechas mediante números de serie y porcentajes como fracciones numéricas.

**Búsqueda** serial fecha, porcentaje

**Para recordar** 0.25 con formato de porcentaje se muestra como 25%.


#### Mostrar una proporción


Escribe 0.25 en Scratch!A1 y aplica formato Porcentaje.


**Resultado esperado** 25%.


### Navegación y paneles

**Clave** `navegacion-y-paneles`

**Definición** La navegación rápida y los paneles inmovilizados facilitan trabajar con tablas extensas.

**Búsqueda** Ctrl flechas, freeze panes, encabezados

**Para recordar** Inmovilizar no modifica los datos.


#### Fijar encabezados


En Sales, Vista > Inmovilizar paneles > Inmovilizar fila superior; desplázate hacia abajo.


**Resultado esperado** La fila de títulos permanece visible.


### Gestión de hojas

**Clave** `gestion-de-hojas`

**Definición** Las hojas se renombran, copian, mueven u ocultan sin cambiar el contenido de las demás.

**Búsqueda** duplicar hoja, mover pestaña

**Para recordar** Copia una hoja antes de realizar cambios destructivos.


#### Crear copia de trabajo


Desde la pestaña Sales, usa Mover o copiar y marca Crear una copia; nómbrala SalesCopy.


**Resultado esperado** La copia conserva los 8 pedidos.


## Edición y pegado

**Clave** `edicion-y-pegado`


### Definición

**Clave** `definicion`

**Definición** Excel permite introducir, copiar y transformar valores o fórmulas directamente en la cuadrícula.

**Búsqueda** editar, copiar, pegar

**Para recordar** El pegado normal puede copiar también fórmulas y formatos.


#### Copiar un valor


Copia Sales!A2 a Scratch!A1.


**Resultado esperado** A1 contiene 101.


### Pegado especial

**Clave** `pegado-especial`

**Definición** Permite pegar solo valores, fórmulas, formatos u otras propiedades.

**Búsqueda** paste special, pegar valores

**Para recordar** Pegar valores elimina la dependencia de la fórmula original.


#### Conservar un resultado


En Scratch!A1 escribe =2*100, copia A1 y pega solo valores en B1.


**Resultado esperado** B1 contiene 200 como constante.


### Transponer

**Clave** `transponer`

**Definición** Cambia filas por columnas o viceversa.

**Búsqueda** transpose, transponer

**Para recordar** Transponer con pegado especial crea una copia estática.


#### Convertir encabezados en lista


Copia Sales!A1:C1 y pega transpuesto en Scratch!A1.


**Resultado esperado** A1:A3 contiene order_id, order_date, customer_id.


### Autorrelleno y series

**Clave** `autorrelleno-y-series`

**Definición** El controlador de relleno extiende patrones y fórmulas.

**Búsqueda** fill handle, serie

**Para recordar** Selecciona dos valores para establecer un incremento.


#### Numerar meses


Escribe 1 y 2 en Scratch!A1:A2, selecciona ambas y arrastra hasta A5.


**Resultado esperado** 1, 2, 3, 4, 5.


### Flash Fill

**Clave** `flash-fill`

**Definición** Relleno rápido infiere un patrón de texto a partir de ejemplos.

**Búsqueda** relleno rápido, flash fill

**Para recordar** El resultado es estático; revisa excepciones.


#### Extraer usuario de correo


Copia Leads!B2:B6 a Scratch!A2:A6. Escribe ana en B2 y luis en B3; Datos > Relleno rápido sobre B2:B6.


**Resultado esperado** B2:B6 contiene ana, luis, ana, eva, ana si el patrón es reconocido.


### Buscar y reemplazar

**Clave** `buscar-y-reemplazar`

**Definición** Localiza o sustituye texto en el rango seleccionado.

**Búsqueda** find, replace

**Para recordar** Limita el alcance antes de reemplazar todo.


#### Uniformar estado


En una copia de Sales selecciona G2:G9 y reemplaza cancelled por canceled.


**Resultado esperado** Solo G4 cambia a canceled.


## Fórmulas y operadores

**Clave** `formulas-y-operadores`


### Definición

**Clave** `definicion`

**Definición** Una fórmula empieza con = y calcula un resultado a partir de constantes, referencias y funciones.

**Búsqueda** formula, calcular, igual

**Para recordar** Excel recalcula las fórmulas cuando cambian sus dependencias si el cálculo es automático.


#### Calcular importe


```excel
=Sales!E2*Sales!F2
```

Excel recalcula las fórmulas cuando cambian sus dependencias si el cálculo es automático.


**Resultado esperado** 200.


### Operadores aritméticos

**Clave** `operadores-aritmeticos`

**Definición** +, -, *, /, ^ y % realizan operaciones numéricas.

**Búsqueda** sumar, restar, multiplicar, dividir

**Para recordar** * multiplica y / divide.


#### Aplicar descuento


```excel
=200*(1-10%)
```

* multiplica y / divide.


**Resultado esperado** 180.


### Comparaciones

**Clave** `comparaciones`

**Definición** =, <>, >, <, >= y <= producen TRUE o FALSE.

**Búsqueda** igual, diferente, mayor, menor

**Para recordar** Una comparación no es una asignación.


#### Comprobar meta


```excel
=Targets!C2>=Targets!B2
```

Una comparación no es una asignación.


**Resultado esperado** FALSE.


### Precedencia y paréntesis

**Clave** `precedencia-y-parentesis`

**Definición** Los operadores siguen un orden; los paréntesis fijan qué se calcula primero.

**Búsqueda** orden operaciones, paréntesis

**Para recordar** Usa paréntesis para expresar la intención.


#### Comparar cálculos


```excel
=2+3*4
=(2+3)*4
```

Usa paréntesis para expresar la intención.


**Resultado esperado** 14 y 20 respectivamente (introduce cada fórmula en una celda).


### Concatenación con &

**Clave** `concatenacion-con`

**Definición** Une valores como texto.

**Búsqueda** ampersand, juntar texto

**Para recordar** & no suma cantidades.


#### Crear etiqueta


```excel
=Customers!A2&" - "&Customers!B2
```

& no suma cantidades.


**Resultado esperado** C1 - Ana.


### Argumentos y funciones

**Clave** `argumentos-y-funciones`

**Definición** Una función recibe argumentos dentro de paréntesis; algunos son opcionales.

**Búsqueda** argumentos, sintaxis, funciones

**Para recordar** Los separadores dependen de la configuración regional.


#### Elegir máximo


```excel
=MAX(10,30,20)
```

Los separadores dependen de la configuración regional.


**Resultado esperado** 30.


## Referencias

**Clave** `referencias`


### Definición

**Clave** `definicion`

**Definición** Una referencia identifica celdas cuyo contenido usa una fórmula.

**Búsqueda** referencia, A1, anclar

**Para recordar** Al copiar una fórmula, las referencias relativas se desplazan.


#### Leer un importe


```excel
=Sales!I2
```

Al copiar una fórmula, las referencias relativas se desplazan.


**Resultado esperado** 200.


### Relativas

**Clave** `relativas`

**Definición** La referencia A1 cambia de fila o columna al copiarse.

**Búsqueda** relativa, arrastrar

**Para recordar** No lleva $.


#### Calcular importes por fila


En copia de Sales escribe =E2*F2 en J2 y rellena hasta J3.


**Resultado esperado** J2=200; J3=300.


### Absolutas

**Clave** `absolutas`

**Definición** $A$1 fija columna y fila al copiar una fórmula.

**Búsqueda** absoluta, fijar, dólar

**Para recordar** Fija la celda de parámetros compartidos.


#### Aplicar tasa fija


En Scratch, A1=10%, B2=200, B3=300; en C2 escribe =B2*$A$1 y copia a C3.


**Resultado esperado** 20 y 30.


### Mixtas

**Clave** `mixtas`

**Definición** $A1 fija columna; A$1 fija fila.

**Búsqueda** mixta, tabla de multiplicación

**Para recordar** Solo queda fija la parte precedida por $.


#### Combinar cantidades y precios


En Scratch B1=100, C1=300, A2=2, A3=3. Escribe =$A2*B$1 en B2 y copia a B2:C3.


**Resultado esperado** Filas de resultados: 200, 600 y 300, 900.


### Entre hojas y libros

**Clave** `entre-hojas-y-libros`

**Definición** Una referencia puede apuntar a otra hoja o archivo.

**Búsqueda** sheet reference, vínculo externo

**Para recordar** Los vínculos externos dependen de la ubicación y disponibilidad del archivo.


**Nota** Si la hoja contiene espacios, usa comillas simples, por ejemplo 'Sales 2026'!A2. Para otro libro, selecciónalo al construir la fórmula y revisa los vínculos.


#### Leer un nombre


```excel
=Customers!B2
```

Los vínculos externos dependen de la ubicación y disponibilidad del archivo.


**Resultado esperado** Ana.


### Referencias 3D

**Clave** `referencias-3d`

**Definición** Una referencia 3D reúne la misma celda de hojas consecutivas.

**Búsqueda** 3D reference, consolidar hojas

**Para recordar** Incluye todas las hojas entre los dos extremos.


#### Sumar meses


Crea Jan y Feb consecutivas con A1=500 y A1=700; en Scratch escribe =SUM(Jan:Feb!A1).


**Resultado esperado** 1200.


### Rangos con nombre

**Clave** `rangos-con-nombre`

**Definición** Un nombre representa una referencia o constante reutilizable.

**Búsqueda** named range, administrador nombres

**Para recordar** Define nombres significativos sin espacios.


#### Nombrar importes


Selecciona Sales!I2:I9 y define el nombre Importes; en Scratch usa =SUM(Importes).


**Resultado esperado** 2100.


## Tablas de Excel

**Clave** `tablas-de-excel`


### Definición

**Clave** `definicion`

**Definición** Una tabla de Excel es un objeto con encabezados, filtros y referencias que se amplían al incorporar filas.

**Búsqueda** Excel Table, Ctrl+T, tabla

**Para recordar** Un rango con formato no es necesariamente una tabla.


#### Crear tabla


Selecciona Sales!A1:I9 > Insertar > Tabla; confirma encabezados y nómbrala tSales.


**Resultado esperado** Tabla de 8 filas de datos y 9 columnas.


### Referencias estructuradas

**Clave** `referencias-estructuradas`

**Definición** Usan el nombre de tabla y de columna en vez de coordenadas.

**Búsqueda** structured reference, tSales, columna

**Para recordar** tSales[amount] representa la columna de datos sin encabezado.


#### Sumar columna


```excel
=SUM(tSales[amount])
```

tSales[amount] representa la columna de datos sin encabezado.


**Resultado esperado** 2100.


### Columna calculada y @

**Clave** `columna-calculada-y`

**Definición** Una fórmula de tabla puede referirse a la fila actual y extenderse a las demás.

**Búsqueda** [@quantity], calculated column

**Para recordar** @ significa esta fila.


#### Calcular importe


Añade una columna calc_amount en tSales y escribe =[@quantity]*[@unit_price] en la primera fila.


**Resultado esperado** 8 resultados: 200, 300, 600, 300, 100, 200, 300, 100.


### Fila de totales

**Clave** `fila-de-totales`

**Definición** Agrega una fila de resumen con funciones como SUBTOTAL.

**Búsqueda** total row, total visible

**Para recordar** Puede cambiar con el filtro aplicado.


#### Total de importes


Activa Fila de totales en Diseño de tabla y selecciona Suma para amount.


**Resultado esperado** 2100 sin filtros.


### Expansión y redimensionamiento

**Clave** `expansion-y-redimensionamiento`

**Definición** La tabla se ajusta cuando se agregan registros contiguos o se cambia explícitamente su tamaño.

**Búsqueda** resize table, autoexpand

**Para recordar** Comprueba que los nuevos registros pertenecen al objeto tabla.


#### Añadir pedido


En copia de tSales, añade la fila 109, 2026-02-16, C5, P3, 1, 50, completed, Store, 50 inmediatamente debajo de los datos (sin fila de totales).


**Resultado esperado** 9 filas; la suma de amount es 2150 si la tabla incluye la nueva fila.


## Agregaciones

**Clave** `agregaciones`


### Definición

**Clave** `definicion`

**Definición** Las funciones de agregación resumen varios valores en un solo resultado.

**Búsqueda** agregación, sumar, promedio, contar

**Para recordar** Elige la función según la pregunta, no según el tipo de gráfico.


#### Importe total


```excel
=SUM(Sales!I2:I9)
```

Elige la función según la pregunta, no según el tipo de gráfico.


**Resultado esperado** 2100.


### SUM

**Clave** `sum`

**Definición** Suma números de un rango o argumentos individuales.

**Búsqueda** SUMA, total

**Para recordar** El texto de un rango no se suma.


#### Sumar pedidos


```excel
=SUM(tSales[amount])
```

El texto de un rango no se suma.


**Resultado esperado** 2100.


### AVERAGE

**Clave** `average`

**Definición** Calcula la media aritmética de valores numéricos.

**Búsqueda** PROMEDIO, media

**Para recordar** Los ceros cuentan; las celdas vacías del rango no.


#### Ticket medio sin filtrar


```excel
=AVERAGE(tSales[amount])
```

Los ceros cuentan; las celdas vacías del rango no.


**Resultado esperado** 262.5.


### COUNT

**Clave** `count`

**Definición** Cuenta celdas con valores numéricos, incluidas fechas reales.

**Búsqueda** CONTAR, contar números

**Para recordar** COUNT no cuenta identificadores de texto.


#### Contar pedidos numéricos


```excel
=COUNT(tSales[order_id])
```

COUNT no cuenta identificadores de texto.


**Resultado esperado** 8.


### COUNTA y COUNTBLANK

**Clave** `counta-y-countblank`

**Definición** COUNTA cuenta celdas no vacías; COUNTBLANK cuenta vacías y resultados de fórmula de texto vacío.

**Búsqueda** CONTARA, CONTAR.BLANCO

**Para recordar** Una fórmula que devuelve "" puede contarse en ambas.


#### Contar países registrados


```excel
=COUNTA(Customers!C2:C6)
=COUNTBLANK(Customers!C2:C6)
```

Una fórmula que devuelve "" puede contarse en ambas.


**Resultado esperado** 4 y 1.


### MIN y MAX

**Clave** `min-y-max`

**Definición** Encuentran el menor y mayor valor numérico.

**Búsqueda** mínimo, máximo

**Para recordar** No indican por sí mismos la fila que contiene el extremo.


#### Extremos de importe


```excel
=MIN(tSales[amount])
=MAX(tSales[amount])
```

No indican por sí mismos la fila que contiene el extremo.


**Resultado esperado** 100 y 600.


### PRODUCT

**Clave** `product`

**Definición** Multiplica varios números.

**Búsqueda** PRODUCTO, multiplicar

**Para recordar** Sirve cuando hay varios factores.


#### Calcular importe


```excel
=PRODUCT(Sales!E2:F2)
```

Sirve cuando hay varios factores.


**Resultado esperado** 200.


### LARGE y SMALL

**Clave** `large-y-small`

**Definición** Devuelven el k-ésimo mayor o menor valor, contando repeticiones.

**Búsqueda** K.ESIMO.MAYOR, K.ESIMO.MENOR, top

**Para recordar** k=1 equivale al máximo o mínimo.


#### Segundo importe mayor


```excel
=LARGE(tSales[amount],2)
```

k=1 equivale al máximo o mínimo.


**Resultado esperado** 300.


### SUBTOTAL

**Clave** `subtotal`

**Definición** Resume filas visibles según el código de operación.

**Búsqueda** SUBTOTALES, suma filtrada

**Para recordar** 109 suma omitiendo filas filtradas y ocultas manualmente.


#### Sumar completados visibles


Filtra tSales[status] por completed y en Scratch escribe =SUBTOTAL(109,tSales[amount]).


**Resultado esperado** 1200.


### AGGREGATE

**Clave** `aggregate`

**Definición** Resume un rango con opciones para ignorar errores u otras filas según la función.

**Búsqueda** AGREGAR, ignorar errores

**Para recordar** El primer argumento elige la operación; el segundo la opción.


#### Sumar sin error


En Scratch A1=10, A2 =1/0, A3=20; en B1 escribe =AGGREGATE(9,6,A1:A3).


**Resultado esperado** 30.


## Funciones lógicas

**Clave** `funciones-logicas`


### Definición

**Clave** `definicion`

**Definición** Las funciones lógicas permiten decidir un resultado según condiciones.

**Búsqueda** IF, booleanos, condición

**Para recordar** Una condición verdadera o falsa dirige el cálculo.


#### Etiquetar meta


```excel
=IF(Targets!C2>=Targets!B2,"Cumple","No cumple")
```

Una condición verdadera o falsa dirige el cálculo.


**Resultado esperado** No cumple.


### IF

**Clave** `if`

**Definición** Devuelve un valor si una condición es verdadera y otro si es falsa.

**Búsqueda** SI, condicional

**Para recordar** Orden: condición, valor verdadero, valor falso.


#### Clasificar pedido


```excel
=IF(Sales!I2>=300,"Alto","Bajo")
```

Orden: condición, valor verdadero, valor falso.


**Resultado esperado** Bajo.


### AND

**Clave** `and`

**Definición** Es verdadero solo cuando todas las condiciones son verdaderas.

**Búsqueda** Y, todas condiciones

**Para recordar** Basta una condición falsa para obtener FALSE.


#### Pedido válido


```excel
=AND(Sales!G2="completed",Sales!I2>=200)
```

Basta una condición falsa para obtener FALSE.


**Resultado esperado** TRUE.


### OR y NOT

**Clave** `or-y-not`

**Definición** OR exige al menos una condición verdadera; NOT invierte un valor lógico.

**Búsqueda** O, NO, negar

**Para recordar** OR acepta cualquiera; NOT niega.


#### Detectar pedido abierto


```excel
=OR(Sales!G8="pending",Sales!G8="cancelled")
=NOT(Sales!G8="completed")
```

OR acepta cualquiera; NOT niega.


**Resultado esperado** TRUE y TRUE.


### IF anidado e IFS

**Clave** `if-anidado-e-ifs`

**Definición** Evalúan varias condiciones ordenadas.

**Búsqueda** SI anidado, SI.CONJUNTO

**Para recordar** La primera condición verdadera determina el resultado.


**Nota** En versiones sin IFS usa =IF(Sales!I2>=300,"Alto",IF(Sales!I2>=200,"Medio","Bajo")).


#### Segmentar importe


```excel
=IFS(Sales!I2>=300,"Alto",Sales!I2>=200,"Medio",TRUE,"Bajo")
```

La primera condición verdadera determina el resultado.


**Resultado esperado** Medio.


### SWITCH

**Clave** `switch`

**Definición** Compara una expresión con valores concretos y devuelve la alternativa correspondiente.

**Búsqueda** CAMBIAR, SWITCH, etiquetas

**Para recordar** Usa IF o IFS para intervalos numéricos.


#### Traducir estado


```excel
=SWITCH(Sales!G2,"completed","Cerrado","cancelled","Cancelado","Otro")
```

Usa IF o IFS para intervalos numéricos.


**Resultado esperado** Cerrado.


### CHOOSE

**Clave** `choose`

**Definición** Selecciona una alternativa según un índice numérico comenzando en 1.

**Búsqueda** ELEGIR, índice

**Para recordar** El índice indica posición, no valor de búsqueda.


#### Etiqueta de trimestre


```excel
=CHOOSE(2,"Q1","Q2","Q3","Q4")
```

El índice indica posición, no valor de búsqueda.


**Resultado esperado** Q2.


## Nulos, tipos y errores

**Clave** `nulos-tipos-y-errores`


### Definición

**Clave** `definicion`

**Definición** Excel distingue celdas vacías, texto vacío, cero y errores de cálculo.

**Búsqueda** blanks, null, errores Excel

**Para recordar** Vacío no equivale siempre a cero ni a "".


#### Comprobar país faltante


```excel
=ISBLANK(Customers!C5)
```

Vacío no equivale siempre a cero ni a "".


**Resultado esperado** TRUE.


### ISBLANK y texto vacío

**Clave** `isblank-y-texto-vacio`

**Definición** ISBLANK verifica una celda realmente vacía; ="" comprueba también resultados de texto vacío.

**Búsqueda** ESBLANCO, cadena vacía

**Para recordar** Una fórmula que devuelve "" no es una celda vacía.


#### Distinguir blancos


En Scratch A1 déjala vacía y en A2 escribe =""; en B1:B2 usa ISBLANK sobre A1 y A2.


**Resultado esperado** TRUE, FALSE.


### ISNUMBER, ISTEXT e ISLOGICAL

**Clave** `isnumber-istext-e-islogical`

**Definición** Identifican números, texto y valores lógicos.

**Búsqueda** ESNUMERO, ESTEXTO, ESLOGICO

**Para recordar** Un número guardado como texto no es numérico.


#### Validar tipos


```excel
=ISNUMBER(Sales!I2)
=ISTEXT(Sales!C2)
=ISLOGICAL(2>1)
```

Un número guardado como texto no es numérico.


**Resultado esperado** TRUE, TRUE, TRUE.


### IFERROR

**Clave** `iferror`

**Definición** Sustituye cualquier error por un valor alternativo.

**Búsqueda** SI.ERROR, controlar error

**Para recordar** No ocultes problemas de datos sin investigar.


#### Evitar división por cero


```excel
=IFERROR(100/0,"Sin base")
```

No ocultes problemas de datos sin investigar.


**Resultado esperado** Sin base.


### IFNA, ISNA e ISERROR

**Clave** `ifna-isna-e-iserror`

**Definición** IFNA trata #N/A; ISNA detecta ese error; ISERROR detecta cualquier error de Excel.

**Búsqueda** SI.ND, ESNOD, ESERROR

**Para recordar** #N/A suele indicar que no se encontró una coincidencia.


#### Tratar error de búsqueda


```excel
=IFNA(NA(),"No encontrado")
=ISERROR(1/0)
```

#N/A suele indicar que no se encontró una coincidencia.


**Resultado esperado** No encontrado; TRUE.


### Errores frecuentes

**Clave** `errores-frecuentes`

**Definición** #DIV/0!, #N/A, #VALUE!, #REF!, #NAME? y #NUM! señalan problemas distintos.

**Búsqueda** #REF, #VALUE, #NAME, #NUM

**Para recordar** Revisa referencias, tipos y argumentos antes de usar IFERROR.


#### Identificar denominador inválido


```excel
=5/0
```

Revisa referencias, tipos y argumentos antes de usar IFERROR.


**Resultado esperado** #DIV/0!.


### VALUE y NUMBERVALUE

**Clave** `value-y-numbervalue`

**Definición** Convierten texto numérico en número; NUMBERVALUE permite indicar los separadores explícitamente.

**Búsqueda** VALOR, VALOR.NUMERO, texto a número

**Para recordar** No conviertas identificadores que necesitan ceros iniciales.


#### Convertir importe


```excel
=NUMBERVALUE("1.200,50",",",".")
```

No conviertas identificadores que necesitan ceros iniciales.


**Resultado esperado** 1200.5.


### TEXT

**Clave** `text`

**Definición** Convierte un valor a texto con un formato indicado.

**Búsqueda** TEXTO, formatear fecha, ceros

**Para recordar** TEXT devuelve texto, no un número apto para sumas.


**Nota** Los códigos de formato de fecha también pueden localizarse, por ejemplo aaaa en lugar de yyyy en algunas instalaciones en español.


#### Etiquetar mes


```excel
=TEXT(Sales!B2,"yyyy-mm")
```

TEXT devuelve texto, no un número apto para sumas.


**Resultado esperado** 2026-01.


## Agregaciones condicionales

**Clave** `agregaciones-condicionales`


### Definición

**Clave** `definicion`

**Definición** Las funciones terminadas en IF o IFS resumen datos que satisfacen criterios.

**Búsqueda** SUMIF, COUNTIFS, filtrar y agregar

**Para recordar** Las variantes IFS aceptan varios criterios simultáneos.


#### Ventas completadas


```excel
=SUMIF(tSales[status],"completed",tSales[amount])
```

Las variantes IFS aceptan varios criterios simultáneos.


**Resultado esperado** 1200.


### SUMIF

**Clave** `sumif`

**Definición** Suma un rango cuando un criterio se cumple en otro.

**Búsqueda** SUMAR.SI, suma condicional

**Para recordar** Orden: rango de criterio, criterio, rango de suma.


#### Sumar Online


```excel
=SUMIF(tSales[channel],"Online",tSales[amount])
```

Orden: rango de criterio, criterio, rango de suma.


**Resultado esperado** 1400.


### SUMIFS

**Clave** `sumifs`

**Definición** Suma valores cuando se cumplen todos los criterios.

**Búsqueda** SUMAR.SI.CONJUNTO, múltiples filtros

**Para recordar** El rango de suma va primero.


#### Ventas Online completadas


```excel
=SUMIFS(tSales[amount],tSales[channel],"Online",tSales[status],"completed")
```

El rango de suma va primero.


**Resultado esperado** 800.


### COUNTIF

**Clave** `countif`

**Definición** Cuenta celdas que coinciden con un criterio.

**Búsqueda** CONTAR.SI, frecuencia

**Para recordar** No requiere rango de suma.


#### Contar cancelados


```excel
=COUNTIF(tSales[status],"cancelled")
```

No requiere rango de suma.


**Resultado esperado** 1.


### COUNTIFS

**Clave** `countifs`

**Definición** Cuenta filas que cumplen varios criterios.

**Búsqueda** CONTAR.SI.CONJUNTO, contar filtros

**Para recordar** Los criterios se combinan con AND.


#### Contar completados Online


```excel
=COUNTIFS(tSales[status],"completed",tSales[channel],"Online")
```

Los criterios se combinan con AND.


**Resultado esperado** 4.


### AVERAGEIF y AVERAGEIFS

**Clave** `averageif-y-averageifs`

**Definición** Promedian valores seleccionados por uno o varios criterios.

**Búsqueda** PROMEDIO.SI, PROMEDIO.SI.CONJUNTO

**Para recordar** AVERAGEIFS recibe el rango del promedio primero.


#### Ticket de Store completado


```excel
=AVERAGEIFS(tSales[amount],tSales[channel],"Store",tSales[status],"completed")
```

AVERAGEIFS recibe el rango del promedio primero.


**Resultado esperado** 200.


### MINIFS y MAXIFS

**Clave** `minifs-y-maxifs`

**Definición** Obtienen extremos numéricos entre filas que cumplen criterios.

**Búsqueda** MIN.SI.CONJUNTO, MAX.SI.CONJUNTO

**Para recordar** No confundir máximo filtrado con máximo de toda la tabla.


#### Extremos completados


```excel
=MINIFS(tSales[amount],tSales[status],"completed")
=MAXIFS(tSales[amount],tSales[status],"completed")
```

No confundir máximo filtrado con máximo de toda la tabla.


**Resultado esperado** 100 y 300.


### Criterios, operadores y comodines

**Clave** `criterios-operadores-y-comodines`

**Definición** Los criterios pueden contener comparaciones y patrones de texto.

**Búsqueda** >=, *, ?, tilde, criterio variable

**Para recordar** Concatena el operador y la referencia con &; ~ escapa comodines.


#### Contar importes altos


```excel
=COUNTIF(tSales[amount],">="&300)
```

Concatena el operador y la referencia con &; ~ escapa comodines.


**Resultado esperado** 4.


#### Contar correos con ana


```excel
=COUNTIF(tLeads[email],"ana*")
```

Concatena el operador y la referencia con &; ~ escapa comodines.


**Resultado esperado** 3.


### SUMPRODUCT

**Clave** `sumproduct`

**Definición** Multiplica elementos de rangos correspondientes y suma los productos; permite máscaras lógicas.

**Búsqueda** SUMAPRODUCTO, media ponderada, varios criterios

**Para recordar** Los rangos deben tener dimensiones compatibles.


#### Calcular importe desde unidades


```excel
=SUMPRODUCT(tSales[quantity],tSales[unit_price])
```

Los rangos deben tener dimensiones compatibles.


**Resultado esperado** 2100.


## Funciones de texto

**Clave** `funciones-de-texto`


### Definición

**Clave** `definicion`

**Definición** Transforman cadenas para limpiar, separar, combinar y comparar identificadores o etiquetas.

**Búsqueda** texto, strings, limpiar

**Para recordar** Conserva los identificadores como texto si sus ceros iniciales importan.


#### Normalizar nombre


```excel
=UPPER(Customers!B2)
```

Conserva los identificadores como texto si sus ceros iniciales importan.


**Resultado esperado** ANA.


### UPPER, LOWER y PROPER

**Clave** `upper-lower-y-proper`

**Definición** Cambian mayúsculas, minúsculas o iniciales de palabras.

**Búsqueda** MAYUSC, MINUSC, NOMPROPIO

**Para recordar** Normalizar texto no corrige diferencias semánticas.


#### Normalizar correo


```excel
=LOWER("ANA@EXAMPLE.COM")
```

Normalizar texto no corrige diferencias semánticas.


**Resultado esperado** ana@example.com.


### LEFT, RIGHT y MID

**Clave** `left-right-y-mid`

**Definición** Extraen caracteres desde el inicio, final o posición indicada.

**Búsqueda** IZQUIERDA, DERECHA, EXTRAE

**Para recordar** Las posiciones de MID comienzan en 1.


#### Extraer identificador


```excel
=LEFT("P123",1)
=RIGHT("P123",3)
=MID("P123",2,2)
```

Las posiciones de MID comienzan en 1.


**Resultado esperado** P, 123 como texto, 12 como texto.


### LEN

**Clave** `len`

**Definición** Cuenta caracteres, incluidos espacios.

**Búsqueda** LARGO, longitud

**Para recordar** Los espacios también cuentan.


#### Validar longitud


```excel
=LEN("C001")
```

Los espacios también cuentan.


**Resultado esperado** 4.


### TRIM y CLEAN

**Clave** `trim-y-clean`

**Definición** TRIM elimina espacios ASCII sobrantes; CLEAN elimina ciertos caracteres de control.

**Búsqueda** ESPACIOS, LIMPIAR

**Para recordar** No eliminan todos los caracteres invisibles Unicode.


#### Limpiar nombre


```excel
=TRIM("  Ana   Ruiz  ")
```

No eliminan todos los caracteres invisibles Unicode.


**Resultado esperado** Ana Ruiz.


#### Eliminar tabulador


```excel
=CLEAN("Ana"&CHAR(9)&"Ruiz")
```

No eliminan todos los caracteres invisibles Unicode.


**Resultado esperado** AnaRuiz.


### SUBSTITUTE y REPLACE

**Clave** `substitute-y-replace`

**Definición** SUBSTITUTE reemplaza coincidencias de texto; REPLACE modifica una posición y longitud.

**Búsqueda** SUSTITUIR, REEMPLAZAR

**Para recordar** Texto buscado frente a posición fija.


#### Normalizar separador


```excel
=SUBSTITUTE("C-001","-","")
```

Texto buscado frente a posición fija.


**Resultado esperado** C001.


#### Cambiar prefijo


```excel
=REPLACE("OLD001",1,3,"NEW")
```

Texto buscado frente a posición fija.


**Resultado esperado** NEW001.


### FIND y SEARCH

**Clave** `find-y-search`

**Definición** Devuelven la posición de una subcadena; FIND distingue mayúsculas y SEARCH no.

**Búsqueda** ENCONTRAR, HALLAR

**Para recordar** Ambas producen error si no encuentran el texto.


#### Localizar arroba


```excel
=FIND("@",Leads!B2)
=SEARCH("ANA",Leads!B2)
```

Ambas producen error si no encuentran el texto.


**Resultado esperado** 4 y 1.


### CONCAT y TEXTJOIN

**Clave** `concat-y-textjoin`

**Definición** CONCAT une textos; TEXTJOIN incorpora un delimitador y permite omitir vacíos.

**Búsqueda** CONCAT, UNIRCADENAS, concatenar

**Para recordar** TEXTJOIN evita añadir separadores a mano.


#### Crear etiqueta


```excel
=CONCAT(Customers!A2,"-",Customers!B2)
=TEXTJOIN(", ",TRUE,Customers!B2:B4)
```

TEXTJOIN evita añadir separadores a mano.


**Resultado esperado** C1-Ana; Ana, Luis, Marta.


### EXACT

**Clave** `exact`

**Definición** Compara textos distinguiendo mayúsculas de minúsculas.

**Búsqueda** IGUAL, case sensitive

**Para recordar** = suele ignorar mayúsculas en comparaciones de texto; EXACT no.


#### Comparar códigos


```excel
=EXACT("ABC","abc")
```

= suele ignorar mayúsculas en comparaciones de texto; EXACT no.


**Resultado esperado** FALSE.


### TEXTBEFORE y TEXTAFTER

**Clave** `textbefore-y-textafter`

**Definición** Extraen lo anterior o posterior a un delimitador.

**Búsqueda** TEXTOANTES, TEXTODESPUES, separar correo

**Para recordar** Sirven cuando la posición del delimitador varía.


**Nota** Microsoft 365 / Excel 2024; alternativa antigua: LEFT y FIND, o MID y LEN.


#### Separar correo


```excel
=TEXTBEFORE(Leads!B2,"@")
=TEXTAFTER(Leads!B2,"@")
```

Sirven cuando la posición del delimitador varía.


**Resultado esperado** ana; example.com.


### TEXTSPLIT

**Clave** `textsplit`

**Definición** Divide texto en una matriz por delimitadores.

**Búsqueda** DIVIDIRTEXTO, split

**Para recordar** Deja libre el área de derrame.


**Nota** Microsoft 365 / Excel 2024; alternativa de interfaz: Texto en columnas.


#### Separar código


```excel
=TEXTSPLIT("C1-MX-Online","-")
```

Deja libre el área de derrame.


**Resultado esperado** Tres columnas: C1, MX, Online.


## Funciones numéricas

**Clave** `funciones-numericas`


### Definición

**Clave** `definicion`

**Definición** Ajustan, redondean o transforman valores numéricos para cálculos y reportes.

**Búsqueda** round, math, redondear

**Para recordar** No confundas cambiar el formato con redondear el valor.


#### Redondear un ticket


```excel
=ROUND(100/3,2)
```

No confundas cambiar el formato con redondear el valor.


**Resultado esperado** 33.33.


### ROUND, ROUNDUP y ROUNDDOWN

**Clave** `round-roundup-y-rounddown`

**Definición** Redondean a una precisión; UP aleja de cero y DOWN acerca a cero.

**Búsqueda** REDONDEAR, redondear arriba abajo

**Para recordar** El segundo argumento define decimales.


#### Comparar redondeos


```excel
=ROUND(12.346,2)
=ROUNDUP(12.341,2)
=ROUNDDOWN(12.349,2)
```

El segundo argumento define decimales.


**Resultado esperado** 12.35, 12.35, 12.34.


### INT y TRUNC

**Clave** `int-y-trunc`

**Definición** INT baja al entero inferior; TRUNC elimina decimales hacia cero.

**Búsqueda** ENTERO, TRUNCAR

**Para recordar** Difieren con números negativos.


#### Comparar negativos


```excel
=INT(-2.7)
=TRUNC(-2.7)
```

Difieren con números negativos.


**Resultado esperado** -3 y -2.


### ABS y SIGN

**Clave** `abs-y-sign`

**Definición** ABS devuelve magnitud sin signo; SIGN indica -1, 0 o 1.

**Búsqueda** valor absoluto, signo

**Para recordar** ABS elimina dirección de la variación.


#### Magnitud de desviación


```excel
=ABS(Targets!C2-Targets!B2)
=SIGN(Targets!C2-Targets!B2)
```

ABS elimina dirección de la variación.


**Resultado esperado** 100 y -1.


### CEILING.MATH y FLOOR.MATH

**Clave** `ceiling-math-y-floor-math`

**Definición** Ajustan un valor al múltiplo superior o inferior.

**Búsqueda** techo, piso, múltiplos

**Para recordar** Útiles para empaques y lotes.


#### Agrupar en cajas de 5


```excel
=CEILING.MATH(12,5)
=FLOOR.MATH(12,5)
```

Útiles para empaques y lotes.


**Resultado esperado** 15 y 10.


### MOD y QUOTIENT

**Clave** `mod-y-quotient`

**Definición** MOD devuelve el residuo de una división; QUOTIENT su parte entera truncada.

**Búsqueda** RESIDUO, COCIENTE

**Para recordar** Distingue cajas completas de sobrantes.


#### Distribuir 17 unidades en cajas de 5


```excel
=QUOTIENT(17,5)
=MOD(17,5)
```

Distingue cajas completas de sobrantes.


**Resultado esperado** 3 y 2.


## Fechas y horas

**Clave** `fechas-y-horas`


### Definición

**Clave** `definicion`

**Definición** Las fechas reales permiten extraer componentes, calcular intervalos y agrupar periodos.

**Búsqueda** date, tiempo, calendario

**Para recordar** Una fecha real admite operaciones aritméticas.


#### Crear fecha


```excel
=DATE(2026,2,5)
```

Una fecha real admite operaciones aritméticas.


**Resultado esperado** 5 de febrero de 2026 con formato Fecha.


### TODAY y NOW

**Clave** `today-y-now`

**Definición** Devuelven la fecha actual y la fecha con hora actual respectivamente.

**Búsqueda** HOY, AHORA, fecha sistema

**Para recordar** Son dinámicas y cambian al recalcular.


#### Mostrar fecha actual


```excel
=TODAY()
```

Son dinámicas y cambian al recalcular.


**Resultado esperado** Fecha local del equipo en el momento del cálculo.


### YEAR, MONTH y DAY

**Clave** `year-month-y-day`

**Definición** Extraen año, mes y día de una fecha.

**Búsqueda** AÑO, MES, DIA

**Para recordar** MONTH devuelve un número del 1 al 12, no identifica el año.


#### Descomponer fecha


```excel
=YEAR(Sales!B2)
=MONTH(Sales!B2)
=DAY(Sales!B2)
```

MONTH devuelve un número del 1 al 12, no identifica el año.


**Resultado esperado** 2026, 1, 5.


### DATE y DATEVALUE

**Clave** `date-y-datevalue`

**Definición** DATE crea una fecha a partir de componentes; DATEVALUE interpreta una fecha escrita como texto.

**Búsqueda** FECHA, FECHANUMERO

**Para recordar** DATE es menos ambiguo entre regiones.


**Nota** Si DATEVALUE no reconoce el texto, usa el formato local o DATE con componentes separados.


#### Construir fecha


```excel
=DATE(2026,2,1)
```

DATE es menos ambiguo entre regiones.


**Resultado esperado** 1 de febrero de 2026.


#### Convertir fecha de texto


```excel
=DATEVALUE("2026-02-01")
```

DATE es menos ambiguo entre regiones.


**Resultado esperado** 1 de febrero de 2026 con formato Fecha, si la configuración reconoce ISO.


### EDATE y EOMONTH

**Clave** `edate-y-eomonth`

**Definición** Desplazan una fecha por meses o devuelven el último día del mes indicado.

**Búsqueda** FECHA.MES, FIN.MES

**Para recordar** EOMONTH con 0 obtiene el final del mismo mes.


#### Obtener periodo siguiente


```excel
=EDATE(DATE(2026,1,5),1)
=EOMONTH(DATE(2026,2,5),0)
```

EOMONTH con 0 obtiene el final del mismo mes.


**Resultado esperado** 5 de febrero y 28 de febrero de 2026.


### DAYS y DATEDIF

**Clave** `days-y-datedif`

**Definición** DAYS calcula días entre fechas; DATEDIF calcula intervalos completos en unidades como años, meses o días.

**Búsqueda** DIAS, SIFECHA, diferencia fechas

**Para recordar** DATEDIF requiere inicio no posterior al final; evita su unidad MD por limitaciones conocidas.


#### Medir antigüedad


```excel
=DAYS(DATE(2026,2,5),DATE(2026,1,5))
=DATEDIF(DATE(2025,1,5),DATE(2026,2,5),"m")
```

DATEDIF requiere inicio no posterior al final; evita su unidad MD por limitaciones conocidas.


**Resultado esperado** 31 días y 13 meses completos.


### NETWORKDAYS y WORKDAY

**Clave** `networkdays-y-workday`

**Definición** Calculan días laborables o una fecha desplazada por días laborables, excluyendo fines de semana y festivos opcionales.

**Búsqueda** DIAS.LAB, DIA.LAB, SLA

**Para recordar** NETWORKDAYS incluye extremos laborables; WORKDAY desplaza desde el inicio.


#### Contar días hábiles


```excel
=NETWORKDAYS(DATE(2026,1,5),DATE(2026,1,9))
=WORKDAY(DATE(2026,1,5),5)
```

NETWORKDAYS incluye extremos laborables; WORKDAY desplaza desde el inicio.


**Resultado esperado** 5; 12 de enero de 2026.


### WEEKDAY y WEEKNUM

**Clave** `weekday-y-weeknum`

**Definición** Identifican día de semana y número de semana con una convención explícita.

**Búsqueda** DIASEM, NUM.DE.SEMANA

**Para recordar** Indica el sistema de semana si el negocio lo requiere.


#### Identificar lunes


```excel
=WEEKDAY(DATE(2026,1,5),2)
=WEEKNUM(DATE(2026,1,5),2)
```

Indica el sistema de semana si el negocio lo requiere.


**Resultado esperado** 1 y 2.


### TIME, HOUR y MINUTE

**Clave** `time-hour-y-minute`

**Definición** Construyen horas y extraen componentes.

**Búsqueda** TIEMPO, HORA, MINUTO

**Para recordar** Las horas son fracciones de un día.


#### Calcular duración


```excel
=(TIME(10,30,0)-TIME(9,0,0))*24
```

Las horas son fracciones de un día.


**Resultado esperado** 1.5 horas.


### Rangos de fechas

**Clave** `rangos-de-fechas`

**Definición** Filtran periodos con un límite inferior y un límite superior exclusivo.

**Búsqueda** ventas por mes, intervalo fechas

**Para recordar** >= inicio y < siguiente inicio también admite timestamps.


#### Ventas de enero


```excel
=SUMIFS(tSales[amount],tSales[status],"completed",tSales[order_date],">="&DATE(2026,1,1),tSales[order_date],"<"&DATE(2026,2,1))
```

>= inicio y < siguiente inicio también admite timestamps.


**Resultado esperado** 500.


## Búsquedas clásicas

**Clave** `busquedas-clasicas`


### Definición

**Clave** `definicion`

**Definición** Las búsquedas recuperan información de otra tabla usando una clave compartida.

**Búsqueda** lookup, cruzar tablas, buscar id

**Para recordar** Una clave repetida puede producir una coincidencia no deseada.


#### Buscar precio


```excel
=VLOOKUP("P2",Products!A2:D4,4,FALSE)
```

Una clave repetida puede producir una coincidencia no deseada.


**Resultado esperado** 300.


### VLOOKUP

**Clave** `vlookup`

**Definición** Busca en la primera columna de un rango y devuelve una columna a su derecha.

**Búsqueda** BUSCARV, búsqueda vertical

**Para recordar** FALSE exige coincidencia exacta.


#### Buscar nombre de cliente


```excel
=VLOOKUP("C3",Customers!A2:C6,2,FALSE)
```

FALSE exige coincidencia exacta.


**Resultado esperado** Marta.


### HLOOKUP

**Clave** `hlookup`

**Definición** Busca en la primera fila y devuelve una fila inferior.

**Búsqueda** BUSCARH, horizontal

**Para recordar** El índice indica la fila dentro del rango.


#### Buscar meta horizontal


En Scratch escribe A1=Jan, B1=Feb, A2=600, B2=650; en D1 usa =HLOOKUP("Feb",A1:B2,2,FALSE).


**Resultado esperado** 650.


### Coincidencia aproximada

**Clave** `coincidencia-aproximada`

**Definición** Encuentra un umbral cuando no se necesita igualdad exacta.

**Búsqueda** VLOOKUP TRUE, bandas, tramos

**Para recordar** Con VLOOKUP TRUE ordena la primera columna ascendente.


#### Asignar comisión por tramo


En Scratch A1:B3 escribe filas (0,0%), (100,5%), (500,10%); en D1 usa =VLOOKUP(300,A1:B3,2,TRUE).


**Resultado esperado** 5%.


### MATCH

**Clave** `match`

**Definición** Devuelve la posición relativa de una coincidencia.

**Búsqueda** COINCIDIR, índice

**Para recordar** 0 solicita igualdad exacta.


#### Localizar P3


```excel
=MATCH("P3",Products!A2:A4,0)
```

0 solicita igualdad exacta.


**Resultado esperado** 3.


### INDEX

**Clave** `index`

**Definición** Recupera un valor por posición de fila y columna.

**Búsqueda** INDICE, index

**Para recordar** La posición es relativa al rango indicado.


#### Obtener segundo producto


```excel
=INDEX(Products!B2:B4,2)
```

La posición es relativa al rango indicado.


**Resultado esperado** Monitor.


### INDEX y MATCH

**Clave** `index-y-match`

**Definición** Combina búsqueda de posición y extracción de valor, sin exigir que la columna de retorno esté a la derecha.

**Búsqueda** INDICE COINCIDIR, buscar izquierda

**Para recordar** MATCH encuentra la posición; INDEX devuelve el valor.


#### Recuperar código a partir del nombre


```excel
=INDEX(Products!A2:A4,MATCH("Monitor",Products!B2:B4,0))
```

MATCH encuentra la posición; INDEX devuelve el valor.


**Resultado esperado** P2.


### Búsqueda bidimensional

**Clave** `busqueda-bidimensional`

**Definición** Localiza una fila y una columna por sus encabezados.

**Búsqueda** INDEX MATCH MATCH, doble búsqueda

**Para recordar** Se necesitan dos posiciones relativas.


#### Buscar precio de Monitor


```excel
=INDEX(Products!A2:D4,MATCH("P2",Products!A2:A4,0),MATCH("price",Products!A1:D1,0))
```

Se necesitan dos posiciones relativas.


**Resultado esperado** 300.


## XLOOKUP y XMATCH

**Clave** `xlookup-y-xmatch`


### Definición

**Clave** `definicion`

**Definición** XLOOKUP recupera valores mediante rangos de búsqueda y retorno separados; XMATCH devuelve posiciones.

**Búsqueda** BUSCARX, COINCIDIRX, lookup moderno

**Para recordar** La coincidencia exacta es el comportamiento predeterminado.


**Nota** Excel 2021/2024 y Microsoft 365; no disponible en Excel 2016/2019. Usa INDEX/MATCH como alternativa.


#### Cruzar cliente


```excel
=XLOOKUP("C2",tCustomers[customer_id],tCustomers[name])
```

La coincidencia exacta es el comportamiento predeterminado.


**Resultado esperado** Luis.


### Búsqueda en cualquier dirección

**Clave** `busqueda-en-cualquier-direccion`

**Definición** Los rangos de búsqueda y retorno no dependen de su posición relativa.

**Búsqueda** buscar izquierda, lookup inverso

**Para recordar** No necesitas contar columnas.


#### Obtener id de producto


```excel
=XLOOKUP("Cable",tProducts[product_name],tProducts[product_id])
```

No necesitas contar columnas.


**Resultado esperado** P3.


### Valor si no se encuentra

**Clave** `valor-si-no-se-encuentra`

**Definición** El cuarto argumento de XLOOKUP permite indicar una salida cuando no existe la clave.

**Búsqueda** if_not_found, faltantes

**Para recordar** No uses 0 como sustituto si podría confundirse con un precio real.


#### Detectar código inexistente


```excel
=XLOOKUP("P9",tProducts[product_id],tProducts[price],"No existe")
```

No uses 0 como sustituto si podría confundirse con un precio real.


**Resultado esperado** No existe.


### Primera o última coincidencia

**Clave** `primera-o-ultima-coincidencia`

**Definición** El modo de búsqueda controla el sentido del recorrido.

**Búsqueda** search_mode, último pedido

**Para recordar** El modo -1 busca desde el final; no equivale a más reciente si los datos no están ordenados.


#### Última fila de C1


```excel
=XLOOKUP("C1",tSales[customer_id],tSales[order_id],"",0,-1)
```

El modo -1 busca desde el final; no equivale a más reciente si los datos no están ordenados.


**Resultado esperado** 106.


### Múltiples criterios

**Clave** `multiples-criterios`

**Definición** Una matriz de condiciones permite exigir varias coincidencias simultáneas.

**Búsqueda** XLOOKUP multiple criteria

**Para recordar** Multiplicar condiciones booleanas representa AND.


#### Encontrar pedido C2 de P3


```excel
=XLOOKUP(1,(tSales[customer_id]="C2")*(tSales[product_id]="P3"),tSales[order_id],"No existe")
```

Multiplicar condiciones booleanas representa AND.


**Resultado esperado** 105.


### XMATCH

**Clave** `xmatch`

**Definición** Devuelve la posición de la coincidencia, con modos de búsqueda configurables.

**Búsqueda** COINCIDIRX, posición

**Para recordar** Por defecto busca coincidencia exacta.


#### Posición de C3


```excel
=XMATCH("C3",tCustomers[customer_id])
```

Por defecto busca coincidencia exacta.


**Resultado esperado** 3.


## Matrices dinámicas

**Clave** `matrices-dinamicas`


### Definición

**Clave** `definicion`

**Definición** Una fórmula de matriz dinámica devuelve varios valores desde una sola celda y se expande por la cuadrícula.

**Búsqueda** dynamic array, spill, derrame

**Para recordar** Escribe la fórmula fuera de una tabla y deja espacio libre.


**Nota** FILTER, SORT, SORTBY, UNIQUE, SEQUENCE y RANDARRAY están disponibles en Excel 2021/2024 y Microsoft 365; funciones más recientes se indican aparte.


#### Obtener lista de estados


```excel
=UNIQUE(tSales[status])
```

Escribe la fórmula fuera de una tabla y deja espacio libre.


**Resultado esperado** Tres filas en orden de aparición: completed, cancelled, pending.


### Derrame y operador #

**Clave** `derrame-y-operador`

**Definición** # después de una referencia apunta a todo el rango derramado.

**Búsqueda** spill range, A1#, #SPILL!

**Para recordar** No escribas dentro del área que necesita una matriz.


#### Contar lista dinámica


En Scratch A1 escribe =UNIQUE(tSales[status]); en C1 escribe =ROWS(A1#).


**Resultado esperado** 3. Si A2 está ocupada antes de introducir la primera fórmula, A1 puede mostrar #SPILL!.


### UNIQUE

**Clave** `unique`

**Definición** Devuelve valores o filas distintos; permite obtener los que aparecen exactamente una vez.

**Búsqueda** UNICOS, distinct

**Para recordar** No elimina registros de origen.


#### Clientes con pedidos


```excel
=UNIQUE(tSales[customer_id])
```

No elimina registros de origen.


**Resultado esperado** C1, C2, C3, C4 en cuatro filas.


### FILTER

**Clave** `filter`

**Definición** Devuelve filas o columnas que cumplen una condición.

**Búsqueda** FILTRAR, filtro fórmula

**Para recordar** La matriz de condiciones debe corresponder al tamaño del eje filtrado.


#### Extraer pedidos cancelados


```excel
=FILTER(tSales[order_id],tSales[status]="cancelled","Sin pedidos")
```

La matriz de condiciones debe corresponder al tamaño del eje filtrado.


**Resultado esperado** 103.


### FILTER con varias condiciones

**Clave** `filter-con-varias-condiciones`

**Definición** Combina máscaras booleanas: multiplicación para AND, suma mayor que cero para OR.

**Búsqueda** filter and or, condiciones múltiples

**Para recordar** Las condiciones deben estar entre paréntesis.


#### Completados de importe alto


```excel
=FILTER(tSales[order_id],(tSales[status]="completed")*(tSales[amount]>=300),"Sin pedidos")
```

Las condiciones deben estar entre paréntesis.


**Resultado esperado** 102 y 104.


### SORT y SORTBY

**Clave** `sort-y-sortby`

**Definición** SORT ordena una matriz por índice de columna; SORTBY usa una matriz de claves de orden separada.

**Búsqueda** ORDENAR, ORDENARPOR

**Para recordar** 1 es ascendente; -1 descendente.


#### Ordenar pedidos por importe e id


```excel
=SORTBY(tSales[order_id],tSales[amount],-1,tSales[order_id],1)
```

1 es ascendente; -1 descendente.


**Resultado esperado** 103, 102, 104, 107, 101, 106, 105, 108.


### SEQUENCE y RANDARRAY

**Clave** `sequence-y-randarray`

**Definición** SEQUENCE genera una progresión; RANDARRAY genera valores aleatorios.

**Búsqueda** SECUENCIA, MATRIZALEAT, generar filas

**Para recordar** RANDARRAY cambia al recalcular.


#### Generar números de fila


```excel
=SEQUENCE(4,1,10,2)
```

RANDARRAY cambia al recalcular.


**Resultado esperado** 10, 12, 14, 16.


### TAKE y DROP

**Clave** `take-y-drop`

**Definición** Extraen o descartan filas o columnas desde el inicio o final de una matriz.

**Búsqueda** top n, take, drop

**Para recordar** Un número negativo cuenta desde el extremo final.


**Nota** Microsoft 365 / Excel 2024; para versiones antiguas usa un filtro Top N u ordena y selecciona.


#### Obtener los dos pedidos mayores


```excel
=TAKE(SORTBY(tSales[order_id],tSales[amount],-1,tSales[order_id],1),2)
```

Un número negativo cuenta desde el extremo final.


**Resultado esperado** 103 y 102.


### CHOOSECOLS y CHOOSEROWS

**Clave** `choosecols-y-chooserows`

**Definición** Seleccionan columnas o filas por posiciones dentro de una matriz.

**Búsqueda** elegir columnas, elegir filas

**Para recordar** Los índices corresponden a la matriz de entrada.


**Nota** Microsoft 365 / Excel 2024.


#### Mostrar id e importe


```excel
=CHOOSECOLS(Sales!A2:I3,1,9)
```

Los índices corresponden a la matriz de entrada.


**Resultado esperado** Dos filas: 101,200 y 102,300.


### VSTACK y HSTACK

**Clave** `vstack-y-hstack`

**Definición** Apilan matrices vertical u horizontalmente.

**Búsqueda** apilarv, apilarh, unir matrices

**Para recordar** Las dimensiones incompatibles pueden rellenarse con #N/A.


**Nota** Microsoft 365 / Excel 2024.


#### Combinar listas


```excel
=VSTACK(Customers!B2:B3,Customers!B4:B5)
```

Las dimensiones incompatibles pueden rellenarse con #N/A.


**Resultado esperado** Ana, Luis, Marta, Leo.


#### Unir id y nombre


```excel
=HSTACK(Customers!A2:A3,Customers!B2:B3)
```

Las dimensiones incompatibles pueden rellenarse con #N/A.


**Resultado esperado** Dos filas: C1,Ana y C2,Luis.


### TOCOL, TOROW y TRANSPOSE

**Clave** `tocol-torow-y-transpose`

**Definición** Convierten una matriz en columna, fila o transponen sus ejes.

**Búsqueda** reshape, transponer fórmula

**Para recordar** TOCOL recorre por filas de forma predeterminada.


**Nota** TOCOL y TOROW requieren Microsoft 365 / Excel 2024; TRANSPOSE existe también en versiones antiguas (puede requerir fórmula matricial clásica).


#### Aplanar dos filas


```excel
=TOCOL(Sales!E2:F3)
=TRANSPOSE(Sales!E2:F3)
```

TOCOL recorre por filas de forma predeterminada.


**Resultado esperado** TOCOL: 2,100,1,300; TRANSPOSE: filas (2,1) y (100,300).


## Fórmulas reutilizables y matrices

**Clave** `formulas-reutilizables-y-matrices`


### Definición

**Clave** `definicion`

**Definición** Las fórmulas pueden operar sobre conjuntos de valores, nombrar cálculos internos y encapsular lógica para reutilizarla.

**Búsqueda** array formulas, LET, LAMBDA

**Para recordar** Elige una fórmula legible antes que una combinación innecesariamente compleja.


#### Calcular un total con nombre


```excel
=LET(total,SUM(tSales[amount]),total*10%)
```

Elige una fórmula legible antes que una combinación innecesariamente compleja.


**Resultado esperado** 210.


### LET

**Clave** `let`

**Definición** Asigna nombres a valores o cálculos dentro de la misma fórmula.

**Búsqueda** LET, variables

**Para recordar** El último argumento devuelve el resultado.


**Nota** Excel 2021/2024 o Microsoft 365.


#### Calcular ticket


```excel
=LET(total,SUM(tSales[amount]),n,COUNT(tSales[order_id]),total/n)
```

El último argumento devuelve el resultado.


**Resultado esperado** 262.5.


### LAMBDA

**Clave** `lambda`

**Definición** Define una función personalizada mediante parámetros y una expresión, sin VBA.

**Búsqueda** LAMBDA, función propia

**Para recordar** Puede registrarse como nombre de libro para reutilizarla.


**Nota** Microsoft 365 / Excel 2024.


#### Calcular impuesto


```excel
=LAMBDA(base,tasa,base*tasa)(200,16%)
```

Puede registrarse como nombre de libro para reutilizarla.


**Resultado esperado** 32.


### MAP y BYROW/BYCOL

**Clave** `map-y-byrow-bycol`

**Definición** Aplican una LAMBDA a elementos, filas o columnas de una matriz.

**Búsqueda** MAP, BYROW, BYCOL

**Para recordar** BYROW debe devolver un valor por fila.


**Nota** Microsoft 365 / Excel 2024.


#### Calcular importe fila a fila


```excel
=BYROW(Sales!E2:F3,LAMBDA(fila,PRODUCT(fila)))
```

BYROW debe devolver un valor por fila.


**Resultado esperado** 200 y 300.


### REDUCE y SCAN

**Clave** `reduce-y-scan`

**Definición** REDUCE acumula y devuelve el valor final; SCAN devuelve cada estado intermedio.

**Búsqueda** acumulador, reduce, scan

**Para recordar** El valor inicial es el primer argumento.


**Nota** Microsoft 365 / Excel 2024; alternativa clásica: SUM con referencia inicial absoluta.


#### Acumular importes


```excel
=SCAN(0,Sales!I2:I4,LAMBDA(acum,valor,acum+valor))
```

El valor inicial es el primer argumento.


**Resultado esperado** 200, 500, 1100.


### Fórmulas matriciales clásicas

**Clave** `formulas-matriciales-clasicas`

**Definición** En versiones antiguas ciertas operaciones de matriz requieren Ctrl+Shift+Enter en vez de Enter.

**Búsqueda** CSE, array formula clásica

**Para recordar** No escribas manualmente las llaves de una fórmula CSE.


#### Multiplicar y sumar rangos


En Scratch, introduce =SUM(Sales!E2:E3*Sales!F2:F3); en Excel antiguo confirma con Ctrl+Shift+Enter; en 365 usa Enter.


**Resultado esperado** 500. SUMPRODUCT ofrece una alternativa sin CSE.


### OFFSET e INDIRECT

**Clave** `offset-e-indirect`

**Definición** OFFSET construye una referencia desplazada; INDIRECT interpreta texto como referencia.

**Búsqueda** DESREF, INDIRECTO, rango dinámico

**Para recordar** Ambas son volátiles; prefiere tablas o referencias directas cuando sea posible.


#### Leer celda desplazada


```excel
=OFFSET(Sales!I2,1,0)
=INDIRECT("Sales!I3")
```

Ambas son volátiles; prefiere tablas o referencias directas cuando sea posible.


**Resultado esperado** 300 y 300.


## Ordenar y filtrar

**Clave** `ordenar-y-filtrar`


### Definición

**Clave** `definicion`

**Definición** Ordenar reorganiza registros; filtrar oculta filas que no cumplen criterios sin borrarlas.

**Búsqueda** sort, filter, ordenar datos

**Para recordar** Ordena filas completas para conservar la integridad de los registros.


#### Filtrar pedidos completados


Activa el filtro de status y marca solo completed.


**Resultado esperado** 6 registros visibles; los otros dos siguen en la tabla.


### Orden ascendente y descendente

**Clave** `orden-ascendente-y-descendente`

**Definición** Organiza números, fechas o texto según el criterio elegido.

**Búsqueda** A-Z, Z-A, menor mayor

**Para recordar** Incluye todas las columnas de la tabla al ordenar.


#### Ordenar importes


En copia de Sales, ordena amount de mayor a menor.


**Resultado esperado** Primer pedido 103 con 600; los últimos importes son 100.


### Orden por varias columnas

**Clave** `orden-por-varias-columnas`

**Definición** Usa niveles de ordenamiento; los secundarios resuelven empates.

**Búsqueda** custom sort, múltiples columnas

**Para recordar** El primer criterio tiene prioridad.


#### Ordenar por fecha e id


En copia de Sales, Datos > Ordenar: order_date ascendente; agrega nivel order_id ascendente.


**Resultado esperado** En el empate del 5 de febrero aparece 105 antes de 106.


### Filtros por valor y condición

**Clave** `filtros-por-valor-y-condicion`

**Definición** Los filtros permiten seleccionar valores, intervalos, patrones y condiciones de fechas.

**Búsqueda** autofilter, number filters, date filters

**Para recordar** Filtros de columnas distintas se combinan.


#### Filtrar importes


En tSales filtra status=completed e importe mayor o igual a 200.


**Resultado esperado** 101, 102, 104 y 106 visibles.


### Top N y filtro avanzado

**Clave** `top-n-y-filtro-avanzado`

**Definición** Top N selecciona valores extremos; Filtro avanzado usa un rango de criterios.

**Búsqueda** top 10, advanced filter

**Para recordar** El filtro por Top N puede incluir empates; no es un límite estricto de filas.


**Nota** La interfaz de filtro avanzado puede variar según plataforma; UNIQUE es una alternativa moderna para generar una lista.


#### Seleccionar importes mayores


En tSales, Filtros de número > Diez mejores; selecciona 2 elementos superiores.


**Resultado esperado** Pedidos 103, 102, 104 y 107 visibles (empate en 300).


#### Seleccionar registros únicos


En Scratch escribe country en A1 y Mexico, Mexico, Spain, Mexico en A2:A5; Datos > Avanzadas; copia a otro lugar y activa Solo registros únicos.


**Resultado esperado** Mexico y Spain.


## Limpieza y transformación de datos

**Clave** `limpieza-y-transformacion-de-datos`


### Definición

**Clave** `definicion`

**Definición** Limpiar datos consiste en corregir inconsistencias, tipos y duplicados sin perder información legítima.

**Búsqueda** data cleaning, calidad, normalizar

**Para recordar** Define la unidad de cada fila antes de quitar duplicados.


#### Detectar texto con espacios


```excel
=TRIM("  Mexico  ")
```

Define la unidad de cada fila antes de quitar duplicados.


**Resultado esperado** Mexico.


### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Identifica valores de una clave que aparecen más de una vez.

**Búsqueda** duplicate, COUNTIF, clave repetida

**Para recordar** Un cliente puede tener muchos pedidos válidos; no son duplicados por eso.


#### Marcar correos repetidos


En copia de Leads escribe =COUNTIF($B$2:$B$6,B2)>1 en D2 y copia hasta D6.


**Resultado esperado** TRUE, FALSE, TRUE, FALSE, TRUE.


### Quitar duplicados

**Clave** `quitar-duplicados`

**Definición** Elimina filas repetidas según las columnas elegidas.

**Búsqueda** remove duplicates, deduplicar

**Para recordar** Conserva una copia y decide primero qué registro conservar.


#### Deduplicar leads por correo


En copia de Leads, Datos > Quitar duplicados; marca únicamente email.


**Resultado esperado** Quedan 3 filas, lead_id 1, 2 y 4 (primera aparición en el orden original).


### Texto en columnas

**Clave** `texto-en-columnas`

**Definición** Separa una columna usando delimitadores o posiciones fijas.

**Búsqueda** text to columns, split

**Para recordar** Revisa las columnas de destino para no sobrescribir datos.


#### Separar un código


Escribe C1-MX-Online en Scratch!A1; Datos > Texto en columnas > Delimitado > Otro: guion; destino A1.


**Resultado esperado** Las celdas A1, B1 y C1 contienen respectivamente los textos C1, MX y Online.


### Espacios invisibles

**Clave** `espacios-invisibles`

**Definición** Algunos caracteres requieren sustitución adicional a TRIM y CLEAN.

**Búsqueda** espacio no separable, CHAR(160)

**Para recordar** Normaliza antes de hacer búsquedas.


#### Eliminar espacio no separable


```excel
=TRIM(SUBSTITUTE("Ana"&CHAR(160),CHAR(160)," "))
```

Normaliza antes de hacer búsquedas.


**Resultado esperado** Ana.


### Valores vacíos e imputación

**Clave** `valores-vacios-e-imputacion`

**Definición** Los faltantes deben distinguirse de ceros y completarse solo con una regla justificada.

**Búsqueda** missing values, NA, rellenar

**Para recordar** No imputes un país desconocido como país real.


#### Etiquetar país faltante


```excel
=IF(Customers!C5="","Unknown",Customers!C5)
```

No imputes un país desconocido como país real.


**Resultado esperado** Unknown.


### Tipos e identificadores

**Clave** `tipos-e-identificadores`

**Definición** Convierte importes y fechas a tipos utilizables; conserva códigos como texto.

**Búsqueda** data type, leading zeros

**Para recordar** Un identificador no es una magnitud.


#### Conservar ceros iniciales


En Scratch aplica formato Texto a A1 antes de escribir 00123.


**Resultado esperado** Se conserva 00123 como texto.


## Validación de datos

**Clave** `validacion-de-datos`


### Definición

**Clave** `definicion`

**Definición** Controla qué valores puede introducir el usuario en celdas de captura.

**Búsqueda** data validation, dropdown

**Para recordar** No sustituye una comprobación posterior de calidad, especialmente con pegados.


#### Restringir estado


En copia de Sales selecciona G2:G9, Datos > Validación > Lista; origen completed,cancelled,pending (usa separador local).


**Resultado esperado** La lista ofrece los tres estados.


### Listas desde rangos

**Clave** `listas-desde-rangos`

**Definición** Una validación puede tomar sus opciones de un rango o nombre definido.

**Búsqueda** dropdown dinámico, lista catálogo

**Para recordar** Usa un catálogo en vez de repetir valores manualmente.


#### Elegir producto


Define el nombre ProductosID sobre Products!A2:A4; en Scratch A1 aplica validación Lista con origen =ProductosID.


**Resultado esperado** El desplegable ofrece P1, P2, P3.


### Restricciones numéricas y fechas

**Clave** `restricciones-numericas-y-fechas`

**Definición** Limitan valores según intervalos o condiciones.

**Búsqueda** whole number, fecha válida

**Para recordar** Activa alerta de error tipo Detener para bloquear entradas directas inválidas.


#### Limitar cantidad


En copia de Sales E2:E9 valida Número entero entre 1 y 100; intenta escribir -1.


**Resultado esperado** Excel rechaza la entrada directa con la alerta Detener activa.


### Validación personalizada

**Clave** `validacion-personalizada`

**Definición** Una fórmula TRUE/FALSE decide si se permite una entrada.

**Búsqueda** custom validation, id único

**Para recordar** Usa referencias relativas para evaluar cada celda.


#### Evitar id duplicado


En copia de Sales selecciona A2:A9 con A2 activa; Validación > Personalizada: =COUNTIF($A$2:$A$9,A2)=1; activa Detener e intenta cambiar A3 a 101.


**Resultado esperado** Se rechaza la duplicación introducida manualmente.


## Formato condicional

**Clave** `formato-condicional`


### Definición

**Clave** `definicion`

**Definición** Aplica estilos automáticamente según valores o fórmulas sin modificar los datos.

**Búsqueda** conditional formatting, alertas

**Para recordar** El formato resalta; no filtra ni corrige.


#### Resaltar importes altos


Selecciona Sales!I2:I9; Inicio > Formato condicional > Mayor que 300.


**Resultado esperado** Se resalta 600 del pedido 103.


### Reglas con fórmulas

**Clave** `reglas-con-formulas`

**Definición** Una fórmula lógica determina qué celdas reciben formato.

**Búsqueda** custom conditional formatting, fila completa

**Para recordar** Fija la columna con $ cuando la regla deba evaluarse por fila.


#### Resaltar cancelados


Selecciona Sales!A2:I9 con A2 activa; nueva regla basada en fórmula =$G2="cancelled".


**Resultado esperado** Se resalta la fila completa del pedido 103.


### Duplicados

**Clave** `duplicados`

**Definición** Una regla de valores duplicados resalta coincidencias sin eliminarlas.

**Búsqueda** duplicate values, resaltar repetidos

**Para recordar** Permite inspeccionar antes de eliminar.


#### Resaltar correos


Aplica Valores duplicados a Leads!B2:B6.


**Resultado esperado** Se resaltan B2, B4 y B6.


### Barras, escalas e iconos

**Clave** `barras-escalas-e-iconos`

**Definición** Representan magnitud, posición relativa o categorías mediante formato visual.

**Búsqueda** data bars, color scales, icon sets

**Para recordar** Revisa los umbrales y unidades antes de interpretar colores.


#### Comparar importes


Aplica barras de datos a Sales!I2:I9.


**Resultado esperado** 600 tiene la barra más larga; los valores 100 comparten la más corta.


### Administrar reglas

**Clave** `administrar-reglas`

**Definición** Permite cambiar alcance, prioridad y condiciones de formato.

**Búsqueda** manage rules, stop if true

**Para recordar** Reglas superpuestas pueden competir.


#### Corregir alcance


En Administrar reglas fija Se aplica a =Sales!$I$2:$I$9 (o la referencia local equivalente).


**Resultado esperado** La regla de importes afecta únicamente las ocho celdas previstas.


## Tablas dinámicas

**Clave** `tablas-dinamicas`


### Definición

**Clave** `definicion`

**Definición** Una tabla dinámica resume datos por dimensiones y métricas sin modificar la fuente.

**Búsqueda** PivotTable, pivot, agrupar

**Para recordar** Filas y columnas definen grupos; Valores define cálculos.


#### Ventas por estado


Insertar > Tabla dinámica desde tSales; status en Filas y amount en Valores como Suma.


**Resultado esperado** cancelled=600, completed=1200, pending=300; total 2100.


### Filas, columnas y filtros

**Clave** `filas-columnas-y-filtros`

**Definición** Ubican categorías en ejes y limitan los datos del resumen.

**Búsqueda** pivot rows columns filters

**Para recordar** Una dimensión puede mostrar varios niveles.


#### Cruzar estado y canal


Crea pivot de tSales con status en Filas, channel en Columnas, Suma de amount en Valores.


**Resultado esperado** completed: Online 800, Store 400; cancelled: Online 600; pending: Store 300; total 2100.


### Suma, recuento y promedio

**Clave** `suma-recuento-y-promedio`

**Definición** La configuración de campo de valor cambia la agregación.

**Búsqueda** value field settings, count, average

**Para recordar** Comprueba si Excel eligió Suma o Recuento automáticamente.


#### Ticket por estado


status en Filas y amount en Valores, selecciona Promedio.


**Resultado esperado** cancelled 600; completed 200; pending 300.


### Agrupar fechas

**Clave** `agrupar-fechas`

**Definición** Agrupa fechas reales en meses, trimestres o años.

**Búsqueda** pivot group dates, por mes

**Para recordar** Agrupa año y mes si hay varios años.


#### Ventas mensuales


order_date en Filas; agrupa por Años y Meses; status como filtro completed; Suma de amount.


**Resultado esperado** Enero 500; febrero 700; total 1200.


### Mostrar valores como

**Clave** `mostrar-valores-como`

**Definición** Presenta una métrica como porcentaje, diferencia, acumulado o ranking sin cambiar la agregación base.

**Búsqueda** show values as, porcentaje total

**Para recordar** El porcentaje depende del contexto de la tabla dinámica.


#### Participación por canal


channel en Filas, status filtrado completed, amount como Suma; Mostrar valores como % del total general.


**Resultado esperado** Online 66.67%; Store 33.33%.


### Campos y elementos calculados

**Clave** `campos-y-elementos-calculados`

**Definición** Añaden cálculos en pivots clásicas; su semántica puede diferir de cálculos por fila.

**Búsqueda** calculated field, calculated item

**Para recordar** No uses un campo calculado para multiplicar cantidades por precios de distintas filas; calcula el importe en origen.


**Nota** Para el Modelo de datos se usan medidas DAX, no campos calculados clásicos.


#### Comisión fija


En pivot clásica con status en Filas, crea campo calculado Commission con fórmula =amount*0.10.


**Resultado esperado** Total 210; para completed 120.


### Segmentadores y escala de tiempo

**Clave** `segmentadores-y-escala-de-tiempo`

**Definición** Controles visuales para filtrar campos y fechas de pivots compatibles.

**Búsqueda** slicer, timeline

**Para recordar** Una segmentación solo controla las pivots conectadas.


#### Filtrar canal


Inserta segmentador channel en la pivot de ventas por estado; pulsa Online.


**Resultado esperado** completed 800, cancelled 600; total visible 1400.


### Actualizar y cambiar origen

**Clave** `actualizar-y-cambiar-origen`

**Definición** Actualizar relee el origen y recalcula el resumen.

**Búsqueda** refresh pivot, change source

**Para recordar** Una tabla fuente facilita incorporar filas; actualizar sigue siendo necesario cuando no hay actualización automática.


#### Agregar un registro


En copia de tSales añade 109, 2026-02-16, C5, P3, 1, 50, completed, Store, 50; actualiza la pivot de ventas por estado.


**Resultado esperado** completed 1250; total 2150.


### GETPIVOTDATA

**Clave** `getpivotdata`

**Definición** Recupera un valor de una tabla dinámica identificando campos y elementos.

**Búsqueda** IMPORTARDATOSDINAMICOS, pivot fórmula

**Para recordar** Es más resistente al movimiento de celdas que una referencia fija.


#### Extraer total completado


Crea en Scratch!A3 una pivot de status y Suma de amount. Escribe =GETPIVOTDATA("amount",$A$3,"status","completed") fuera de ella (si Excel asigna otro nombre al campo de datos, usa ese nombre).


**Resultado esperado** 1200.


## Gráficos

**Clave** `graficos`


### Definición

**Clave** `definicion`

**Definición** Un gráfico representa datos para comparar categorías, tendencias, distribuciones o relaciones.

**Búsqueda** charts, visualización

**Para recordar** El tipo de gráfico depende de la pregunta.


#### Comparar metas


Selecciona Targets!A1:C3 e inserta columnas agrupadas.


**Resultado esperado** Dos grupos de barras: enero 600/500 y febrero 650/700.


### Barras y columnas

**Clave** `barras-y-columnas`

**Definición** Comparan magnitudes entre categorías.

**Búsqueda** bar, column, ranking

**Para recordar** Las barras horizontales facilitan leer nombres largos.


#### Comparar productos


En Scratch crea tabla de dos columnas product_name y price con Products!B2:B4 y D2:D4; inserta barras.


**Resultado esperado** Mouse 100, Monitor 300, Cable 50.


### Líneas

**Clave** `lineas`

**Definición** Muestran tendencias en un eje ordenado, generalmente temporal.

**Búsqueda** line chart, tendencia

**Para recordar** Ordena periodos y usa intervalos coherentes.


#### Mostrar ventas mensuales


Selecciona Targets!A1:A3 y C1:C3 como etiquetas y serie; inserta gráfico de líneas.


**Resultado esperado** Dos puntos de actual: 500 y 700.


### Dispersión

**Clave** `dispersion`

**Definición** Muestra pares numéricos X/Y para estudiar relaciones.

**Búsqueda** scatter, correlación

**Para recordar** No confundas eje de valores con categorías.


#### Precio frente a cantidad


Copia Sales!F2:F9 como X y E2:E9 como Y en dos columnas de Scratch; inserta Dispersión.


**Resultado esperado** Ocho pares, algunos superpuestos, por ejemplo (100,2) y (300,1).


### Circular y anillos

**Clave** `circular-y-anillos`

**Definición** Muestran participación de categorías de un total positivo.

**Búsqueda** pie, donut, share

**Para recordar** Úsalos con pocas categorías que formen un total.


#### Participación por canal


En Scratch crea canal/venta: Online 800, Store 400; inserta gráfico circular.


**Resultado esperado** Dos sectores 66.67% y 33.33%.


### Combinado y eje secundario

**Clave** `combinado-y-eje-secundario`

**Definición** Combina tipos de serie; un eje secundario sirve para escalas o unidades distintas.

**Búsqueda** combo chart, secondary axis

**Para recordar** Etiqueta ambos ejes y no sugieras relaciones falsas.


#### Comparar venta y cumplimiento


En Scratch crea month/actual/rate con enero 500 y =500/600, febrero 700 y =700/650; inserta combinado columnas para actual y línea en eje secundario para rate.


**Resultado esperado** Barras 500 y 700; línea 83.33% y 107.69%.


### Histograma, Pareto y caja

**Clave** `histograma-pareto-y-caja`

**Definición** Muestran frecuencias, contribuciones ordenadas o distribución estadística.

**Búsqueda** histogram, pareto, boxplot

**Para recordar** Un histograma usa intervalos, no una barra por fila.


#### Distribución de importes


Selecciona Sales!I2:I9; Insertar > Histograma; configura ancho de intervalo 200.


**Resultado esperado** Barras de frecuencia según los límites que muestre Excel; las frecuencias suman 8.


### Cascada

**Clave** `cascada`

**Definición** Explica cómo incrementos y decrementos llevan de un valor inicial a uno final.

**Búsqueda** waterfall, bridge

**Para recordar** Marca los valores inicial y final como totales.


#### Explicar crecimiento


En Scratch crea etiquetas Jan, Change, Feb con valores 500, 200, 700; inserta cascada y marca Jan y Feb como totales.


**Resultado esperado** 500 + 200 = 700, sin volver a acumular el total final.


### Minigráficos

**Clave** `minigraficos`

**Definición** Muestran una serie pequeña dentro de una celda.

**Búsqueda** sparklines, tendencia celda

**Para recordar** Útiles como contexto, no sustituyen ejes de un gráfico detallado.


#### Tendencia breve


En Scratch A1:B1 introduce 500 y 700; Insertar > Minigráfico de línea con destino C1.


**Resultado esperado** Línea ascendente en C1.


### Gráficos dinámicos

**Clave** `graficos-dinamicos`

**Definición** Visualizan el resultado de una tabla dinámica y responden a sus filtros.

**Búsqueda** PivotChart, gráfico pivot

**Para recordar** Los filtros de la pivot determinan la serie visible.


#### Visualizar estados


Selecciona pivot de ventas por estado e inserta gráfico dinámico de columnas.


**Resultado esperado** Tres barras de 600, 1200 y 300; al filtrar completed permanece 1200.


## Métricas de negocio

**Clave** `metricas-de-negocio`


### Definición

**Clave** `definicion`

**Definición** Una métrica cuantifica un resultado de negocio con población, periodo y unidades definidos.

**Búsqueda** KPI, indicador, métricas ventas

**Para recordar** Define numerador, denominador y filtros antes de calcular.


#### Ingresos reconocidos


```excel
=SUMIFS(tSales[amount],tSales[status],"completed")
```

Define numerador, denominador y filtros antes de calcular.


**Resultado esperado** 1200.


### Volumen y ticket promedio

**Clave** `volumen-y-ticket-promedio`

**Definición** El volumen cuenta eventos; el ticket divide ingresos entre pedidos válidos.

**Búsqueda** average order value, AOV, pedidos

**Para recordar** El denominador es el número de pedidos, no de líneas si existen varios productos por pedido.


#### Ticket completado


```excel
=SUMIF(tSales[status],"completed",tSales[amount])/COUNTIF(tSales[status],"completed")
```

El denominador es el número de pedidos, no de líneas si existen varios productos por pedido.


**Resultado esperado** 200.


### Porcentaje y ratio

**Clave** `porcentaje-y-ratio`

**Definición** Una proporción divide una parte entre un total; el formato porcentaje multiplica visualmente por 100.

**Búsqueda** percentage, ratio, tasa cancelación

**Para recordar** No multipliques por 100 si vas a aplicar formato Porcentaje.


#### Tasa de cancelación


```excel
=COUNTIF(tSales[status],"cancelled")/COUNT(tSales[order_id])
```

No multipliques por 100 si vas a aplicar formato Porcentaje.


**Resultado esperado** 12.5% con formato Porcentaje.


### Crecimiento y variación

**Clave** `crecimiento-y-variacion`

**Definición** La variación absoluta resta periodos; la relativa divide el cambio por el periodo base.

**Búsqueda** MoM, crecimiento, variación

**Para recordar** Si la base es cero, la tasa no está definida.


#### Crecimiento febrero


```excel
=Targets!C3-Targets!C2
=Targets!C3/Targets!C2-1
```

Si la base es cero, la tasa no está definida.


**Resultado esperado** 200 y 40%.


### Cumplimiento de meta

**Clave** `cumplimiento-de-meta`

**Definición** Compara el valor real con su objetivo y cuantifica desviación.

**Búsqueda** actual vs target, attainment

**Para recordar** Aclara si un valor alto o bajo es deseable.


#### Cumplimiento febrero


```excel
=Targets!C3/Targets!B3
=Targets!C3-Targets!B3
```

Aclara si un valor alto o bajo es deseable.


**Resultado esperado** 107.69% redondeado en pantalla; +50.


### Clientes únicos

**Clave** `clientes-unicos`

**Definición** Cuenta entidades distintas, no filas repetidas.

**Búsqueda** distinct count, unique customers

**Para recordar** Excluye identificadores vacíos cuando sea necesario.


**Nota** Requiere funciones dinámicas; si no hay coincidencias esta fórmula necesita tratamiento explícito del caso vacío.


#### Clientes con pedidos completados


```excel
=ROWS(UNIQUE(FILTER(tSales[customer_id],tSales[status]="completed")))
```

Excluye identificadores vacíos cuando sea necesario.


**Resultado esperado** 3.


### Media ponderada

**Clave** `media-ponderada`

**Definición** Pondera cada valor por su peso antes de dividir por la suma de pesos.

**Búsqueda** weighted average, precio medio unidad

**Para recordar** No promedies promedios sin sus ponderaciones.


#### Precio por unidad de todos los pedidos


```excel
=SUMPRODUCT(tSales[quantity],tSales[unit_price])/SUM(tSales[quantity])
```

No promedies promedios sin sus ponderaciones.


**Resultado esperado** 123.5294 aproximadamente (2100/17).


### Acumulado y comparación con anterior

**Clave** `acumulado-y-comparacion-con-anterior`

**Definición** Resume hasta la fila actual o compara con una fila anterior en una serie ordenada.

**Búsqueda** running total, delta, acumulado

**Para recordar** Ordena y fija el inicio del rango antes de copiar.


#### Acumular venta por mes


En Targets escribe =SUM($C$2:C2) en D2 y copia a D3; en E3 escribe =C3-C2.


**Resultado esperado** D2=500, D3=1200, E3=200.


### Conversión y retención

**Clave** `conversion-y-retencion`

**Definición** Conversión mide una transición entre etapas; retención mide la continuidad de una cohorte entre periodos.

**Búsqueda** conversion, retention, cohort

**Para recordar** Usa la misma población y una definición de actividad consistente.


#### Retención de enero a febrero


En Scratch A2:A3 registra C1,C2 (clientes con pedidos completados en enero); B2:B4 registra C3,C2,C1 (febrero); en C2 usa =COUNTIF($B$2:$B$4,A2)>0 y copia a C3; en D2 usa =COUNTIF(C2:C3,TRUE)/COUNTA(A2:A3).


**Resultado esperado** 2 de 2 clientes de enero repiten: 100%.


### Margen y rentabilidad

**Clave** `margen-y-rentabilidad`

**Definición** El beneficio bruto resta coste directo a ingresos; el margen divide beneficio entre ingresos.

**Búsqueda** gross margin, profit

**Para recordar** No uses precio de catálogo como coste sin confirmarlo.


**Nota** Ejemplo con costes hipotéticos, no incluidos en Sales.


#### Calcular margen


```excel
=LET(ingreso,500,coste,350,(ingreso-coste)/ingreso)
```

No uses precio de catálogo como coste sin confirmarlo.


**Resultado esperado** 30%.


## Estadística descriptiva

**Clave** `estadistica-descriptiva`


### Definición

**Clave** `definicion`

**Definición** Resume distribución, dispersión y relaciones entre variables para interpretar datos.

**Búsqueda** estadística, descriptive statistics

**Para recordar** La media sola no describe toda la distribución.


#### Mediana de importes


```excel
=MEDIAN(tSales[amount])
```

La media sola no describe toda la distribución.


**Resultado esperado** 250.


### MEDIAN y MODE.SNGL

**Clave** `median-y-mode-sngl`

**Definición** MEDIAN encuentra el centro ordenado; MODE.SNGL devuelve un valor de máxima frecuencia.

**Búsqueda** mediana, moda

**Para recordar** La moda no equivale al promedio.


#### Mediana y moda


```excel
=MEDIAN(tSales[amount])
=MODE.SNGL(tSales[amount])
```

La moda no equivale al promedio.


**Resultado esperado** 250 y 300.


### STDEV.S y STDEV.P

**Clave** `stdev-s-y-stdev-p`

**Definición** Miden dispersión con fórmulas de muestra o población.

**Búsqueda** desviación estándar, sample population

**Para recordar** Usa .S si tus datos son una muestra de una población más grande.


#### Comparar dispersión


```excel
=STDEV.S(10,20,30)
=STDEV.P(10,20,30)
```

Usa .S si tus datos son una muestra de una población más grande.


**Resultado esperado** 10 y aproximadamente 8.165.


### VAR.S y VAR.P

**Clave** `var-s-y-var-p`

**Definición** Calculan varianza de muestra o población.

**Búsqueda** varianza

**Para recordar** La varianza tiene unidades al cuadrado.


#### Calcular varianza


```excel
=VAR.S(10,20,30)
```

La varianza tiene unidades al cuadrado.


**Resultado esperado** 100.


### PERCENTILE.INC y QUARTILE.INC

**Clave** `percentile-inc-y-quartile-inc`

**Definición** Estiman posiciones de distribución usando extremos inclusivos.

**Búsqueda** percentiles, quartiles, p90, p25

**Para recordar** Un percentil puede interpolar valores no observados.


#### Obtener tercer cuartil


```excel
=QUARTILE.INC(tSales[amount],3)
=PERCENTILE.INC(tSales[amount],0.75)
```

Un percentil puede interpolar valores no observados.


**Resultado esperado** 300 y 300.


### CORREL

**Clave** `correl`

**Definición** Mide la relación lineal entre dos series numéricas.

**Búsqueda** correlación, Pearson

**Para recordar** Correlación no demuestra causalidad.


#### Relacionar volumen e ingreso


En Scratch A1:A3=1,2,3 y B1:B3=100,200,300; escribe =CORREL(A1:A3,B1:B3).


**Resultado esperado** 1.


### RANK.EQ y RANK.AVG

**Clave** `rank-eq-y-rank-avg`

**Definición** Asignan posiciones en un conjunto; EQ comparte puesto y AVG promedia los puestos empatados.

**Búsqueda** jerarquía, ranking, empate

**Para recordar** Con orden 0, mayor valor recibe 1.


#### Rankear importe de 300


```excel
=RANK.EQ(300,tSales[amount],0)
=RANK.AVG(300,tSales[amount],0)
```

Con orden 0, mayor valor recibe 1.


**Resultado esperado** 2 y 3.


### Detección de valores atípicos

**Clave** `deteccion-de-valores-atipicos`

**Definición** Una regla estadística marca observaciones inusuales para investigar.

**Búsqueda** outlier, IQR, atípicos

**Para recordar** Un outlier no es automáticamente un error.


**Nota** LET requiere Excel 2021/2024 o 365; puede sustituirse por cálculos separados.


#### Aplicar regla IQR


```excel
=LET(cuartiluno,QUARTILE.INC(tSales[amount],1),cuartiltres,QUARTILE.INC(tSales[amount],3),MAX(tSales[amount])>cuartiltres+1.5*(cuartiltres-cuartiluno))
```

Un outlier no es automáticamente un error.


**Resultado esperado** TRUE (Q1=175, Q3=300, límite superior=487.5).


## Pronósticos y análisis estadístico

**Clave** `pronosticos-y-analisis-estadistico`


### Definición

**Clave** `definicion`

**Definición** Excel permite estimar tendencias y realizar análisis estadísticos con funciones o complementos.

**Búsqueda** forecast, regresión, Analysis ToolPak

**Para recordar** Un pronóstico depende de supuestos y calidad de datos.


#### Proyectar tendencia lineal


```excel
=FORECAST.LINEAR(4,{10,20,30},{1,2,3})
```

Un pronóstico depende de supuestos y calidad de datos.


**Resultado esperado** 40.


### FORECAST.LINEAR y TREND

**Clave** `forecast-linear-y-trend`

**Definición** Estiman una relación lineal por mínimos cuadrados.

**Búsqueda** previsión lineal, tendencia

**Para recordar** Extrapolar lejos de los datos aumenta el riesgo.


#### Proyectar ventas


En Scratch A1:A3=1,2,3 y B1:B3=100,120,140; usa =FORECAST.LINEAR(4,B1:B3,A1:A3).


**Resultado esperado** 160.


### Promedio móvil

**Clave** `promedio-movil`

**Definición** Suaviza una serie usando una ventana de observaciones consecutivas.

**Búsqueda** moving average, rolling

**Para recordar** Indica tamaño de ventana y tratamiento de periodos iniciales.


#### Media de tres meses


En Scratch B2:B5 introduce 100,120,140,180; en C4 escribe =AVERAGE(B2:B4) y copia a C5.


**Resultado esperado** 120 y 146.6667 aproximadamente.


### FORECAST.ETS

**Clave** `forecast-ets`

**Definición** Estima valores en series temporales mediante suavizado exponencial.

**Búsqueda** ETS, estacionalidad

**Para recordar** Usa una frecuencia temporal regular y suficiente historial; dos meses no bastan para validar estacionalidad.


**Nota** Disponible en Excel de escritorio compatible; no asumir disponibilidad en web o móvil.


#### Proyectar serie regular


En Scratch A2:A25 introduce fechas mensuales del 1 de enero de 2024 al 1 de diciembre de 2025; B2:B25=100 en cada mes. Usa =FORECAST.ETS(DATE(2026,1,1),B2:B25,A2:A25,1).


**Resultado esperado** Alrededor de 100 para una serie constante.


### Analysis ToolPak y regresión

**Clave** `analysis-toolpak-y-regresion`

**Definición** El complemento ofrece procedimientos estadísticos como regresión y estadísticas descriptivas.

**Búsqueda** herramientas análisis, regression, toolpak

**Para recordar** Revisa residuos, supuestos y tamaño muestral, no solo R cuadrado.


**Nota** En Windows activa el complemento desde Opciones; en Mac desde Herramientas > Complementos de Excel.


#### Ajustar relación lineal


Activa Analysis ToolPak; Scratch A1=x, B1=y, A2:A5=1,2,3,4 y B2:B5=10,20,30,40. Datos > Análisis de datos > Regresión; X=A1:A5, Y=B1:B5, marca Rótulos.


**Resultado esperado** Pendiente 10, intercepto aproximadamente 0, R²=1; ejemplo perfecto artificial.


### Pruebas de hipótesis

**Clave** `pruebas-de-hipotesis`

**Definición** Comparan datos con una hipótesis usando un estadístico y un p-valor.

**Búsqueda** T.TEST, significancia, prueba t

**Para recordar** El tipo de prueba depende del diseño; p-valor no mide tamaño del efecto.


#### Comparar dos grupos


En Scratch A1:A3=10,12,14 y B1:B3=20,22,24; usa =T.TEST(A1:A3,B1:B3,2,3).


**Resultado esperado** p-valor aproximadamente 0.0036 para prueba bilateral de Welch.


## Importación y conexiones

**Clave** `importacion-y-conexiones`


### Definición

**Clave** `definicion`

**Definición** Excel puede leer archivos y fuentes externas para incorporar datos a una hoja, consulta o modelo.

**Búsqueda** importar, CSV, obtener datos

**Para recordar** Comprueba tipos, encabezados, delimitador y codificación antes de cargar.


#### Importar CSV


Guarda un archivo UTF-8 llamado products.csv con encabezado product_id,product_name,category,price y las tres filas de Products separadas por coma. Datos > Desde texto/CSV; elige coma, UTF-8 y Cargar.


**Resultado esperado** Tabla de 3 productos y 4 columnas.


### CSV, TXT y delimitadores

**Clave** `csv-txt-y-delimitadores`

**Definición** Los archivos de texto necesitan una regla para separar columnas.

**Búsqueda** CSV, TSV, separador, encoding

**Para recordar** Abrir directamente puede convertir fechas o códigos automáticamente.


#### Conservar código


Crea codes.csv con encabezado code,amount y una fila 00123,200. Importa mediante Desde texto/CSV > Transformar datos; establece code como Texto antes de que se convierta a número (elimina el paso de tipo automático si existe).


**Resultado esperado** 00123 se conserva; amount es 200.


### Otros libros y carpetas

**Clave** `otros-libros-y-carpetas`

**Definición** Obtiene datos de hojas, tablas y múltiples archivos con estructura común.

**Búsqueda** import xlsx, folder, combinar archivos

**Para recordar** Los encabezados y tipos deben ser consistentes.


#### Leer catálogo


Guarda una copia del libro como catalog.xlsx; Datos > Obtener datos > Desde libro de Excel; selecciona tProducts y carga.


**Resultado esperado** 3 productos y 4 columnas.


### Bases de datos y ODBC

**Clave** `bases-de-datos-y-odbc`

**Definición** Una conexión permite recuperar datos mediante un conector y credenciales autorizadas.

**Búsqueda** SQL, ODBC, conexión externa

**Para recordar** Selecciona solo los datos necesarios y no guardes contraseñas en celdas.


**Nota** Requiere fuente real, controlador compatible y permisos; la lista de conectores depende de plataforma y edición.


#### Consultar catálogo


En una base de pruebas con tabla products equivalente a Products, configura el conector o DSN ODBC autorizado; selecciona products y carga sus cuatro campos.


**Resultado esperado** Si la fuente tiene los tres registros compartidos, se obtienen tres filas.


### Actualizar y administrar conexiones

**Clave** `actualizar-y-administrar-conexiones`

**Definición** Una conexión guarda información de origen; actualizar recupera cambios.

**Búsqueda** refresh all, consultas y conexiones

**Para recordar** Actualizar no es lo mismo que recalcular fórmulas.


#### Actualizar CSV


Importa el products.csv del primer ejemplo; agrega P4,Stand,Accessories,80 al archivo y guárdalo; en Excel usa Datos > Actualizar todo.


**Resultado esperado** La consulta importada devuelve cuatro filas si no hay un paso que las limite.


## Power Query

**Clave** `power-query`


### Definición

**Clave** `definicion`

**Definición** Power Query importa y transforma datos mediante pasos que pueden ejecutarse nuevamente al actualizar.

**Búsqueda** get and transform, ETL, Power Query

**Para recordar** No modifica la fuente por defecto; entrega una salida transformada.


**Nota** El entorno completo de referencia es Windows. Mac y web admiten Power Query con capacidades y conectores distintos; consulta las fuentes del anexo.


#### Crear consulta


Selecciona tSales > Datos > Desde tabla o rango; abre el Editor de Power Query.


**Resultado esperado** Vista de 8 filas y 9 columnas.


### Tipos y encabezados

**Clave** `tipos-y-encabezados`

**Definición** Permite promover encabezados y asignar tipos para evitar comparaciones incorrectas.

**Búsqueda** changed type, promote headers

**Para recordar** Define tipos antes de calcular y combinar.


#### Asignar tipos


En consulta tSales, configura order_date como Fecha, quantity como Número entero y amount como Número decimal.


**Resultado esperado** Las fechas y números se reconocen como sus tipos correspondientes.


### Filtrar y seleccionar columnas

**Clave** `filtrar-y-seleccionar-columnas`

**Definición** Los pasos limitan filas o columnas de la salida.

**Búsqueda** remove columns, filter rows

**Para recordar** Conserva las claves necesarias para combinar luego.


#### Preparar ventas


En consulta tSales filtra completed y conserva order_id, customer_id, amount.


**Resultado esperado** 6 filas y 3 columnas: 101/C1/200, 102/C2/300, 104/C3/300, 105/C2/100, 106/C1/200, 108/C3/100.


### Columna personalizada y condicional

**Clave** `columna-personalizada-y-condicional`

**Definición** Crea columnas calculadas mediante expresiones de M o reglas de interfaz.

**Búsqueda** custom column, conditional column

**Para recordar** M usa nombres de campo entre corchetes.


#### Calcular importe


En consulta original tSales, Agregar columna > Columna personalizada, nombre calc_amount, expresión [quantity]*[unit_price].


**Resultado esperado** 8 valores iguales a amount; suma 2100.


### Limpiar texto, null y duplicados

**Clave** `limpiar-texto-null-y-duplicados`

**Definición** Transformaciones como Recortar, Limpiar y Quitar duplicados modifican la salida de forma repetible.

**Búsqueda** trim, clean, replace null, remove duplicates

**Para recordar** Quitar duplicados por clave no garantiza qué registro se conserva en todas las situaciones; define un criterio explícito si importa.


#### Crear lista única


Desde tLeads conserva solo email y quita duplicados.


**Resultado esperado** 3 correos: ana@example.com, luis@example.com y eva@example.com, sin orden garantizado.


### Group By

**Clave** `group-by`

**Definición** Agrupa filas según claves y calcula agregados por grupo.

**Búsqueda** agrupar, group by

**Para recordar** La salida cambia a una fila por grupo.


#### Ventas por estado


Desde consulta tSales, Inicio > Agrupar por status; nueva columna total, operación Suma sobre amount.


**Resultado esperado** completed 1200, cancelled 600, pending 300.


### Merge

**Clave** `merge`

**Definición** Combina consultas por claves mediante un tipo de unión y permite expandir columnas de la tabla relacionada.

**Búsqueda** merge, join, combinar consultas

**Para recordar** Verifica cardinalidad; varias coincidencias pueden multiplicar filas.


#### Traer nombre de cliente


Crea consultas de tSales y tCustomers; Combinar con tSales como izquierda y customer_id en ambas, unión externa izquierda; expande name.


**Resultado esperado** 8 filas; 101 tiene Ana, 104 tiene Marta.


### Append

**Clave** `append`

**Definición** Apila registros de consultas compatibles por nombre de columna.

**Búsqueda** append, anexar consultas, union all

**Para recordar** Las columnas ausentes reciben null.


#### Unir meses


Crea dos referencias de tSales filtrando respectivamente enero y febrero de 2026; Anexar como nueva consulta.


**Resultado esperado** 8 filas; 3 de enero y 5 de febrero.


### Pivot y Unpivot

**Clave** `pivot-y-unpivot`

**Definición** Pivot convierte valores en encabezados; Unpivot convierte encabezados en pares atributo/valor.

**Búsqueda** despivotar, normalizar columnas

**Para recordar** Unpivot es útil para columnas que representan periodos.


#### Normalizar metas


Desde tTargets selecciona target y actual > Anular dinamización de columnas.


**Resultado esperado** 4 filas con month, Attribute, Value: enero target 600, enero actual 500, febrero target 650, febrero actual 700.


### Parámetros y lenguaje M

**Clave** `parametros-y-lenguaje-m`

**Definición** M expresa cada transformación; un parámetro permite reutilizar valores en consultas.

**Búsqueda** M language, applied steps, parameter

**Para recordar** Los pasos posteriores dependen de los anteriores.


**Nota** Pega el código en Editor avanzado de una consulta del libro con tSales. El tipo de cada columna depende del origen; establece tipos explícitos cuando sean necesarios.


#### Filtrar con M


```powerquery
let
    Source = Excel.CurrentWorkbook(){[Name="tSales"]}[Content],
    Completed = Table.SelectRows(Source, each [status] = "completed")
in
    Completed
```

Los pasos posteriores dependen de los anteriores.


**Resultado esperado** 6 filas de pedidos completados.


### Carga y actualización

**Clave** `carga-y-actualizacion`

**Definición** Cerrar y cargar entrega el resultado a una hoja o conexión/modelo si está disponible.

**Búsqueda** close load, only connection, refresh

**Para recordar** Decide dónde se necesita la salida; evita duplicar tablas grandes.


#### Cargar ventas completadas


En consulta filtrada a completed, Cerrar y cargar en una nueva hoja.


**Resultado esperado** Tabla de seis pedidos; puede actualizarse al cambiar tSales.


## Modelo de datos y Power Pivot

**Clave** `modelo-de-datos-y-power-pivot`


### Definición

**Clave** `definicion`

**Definición** El Modelo de datos relaciona tablas para analizarlas juntas; Power Pivot permite administrarlas y crear cálculos DAX.

**Búsqueda** data model, power pivot, modelo relacional

**Para recordar** Una tabla de hechos registra eventos y una dimensión describe entidades.


**Nota** Power Pivot requiere una edición de Excel para Windows compatible; Mac y web no ofrecen la misma capacidad de autoría.


#### Crear modelo


En Excel Windows compatible, carga tSales y tCustomers al Modelo de datos; crea relación tSales[customer_id] → tCustomers[customer_id].


**Resultado esperado** Modelo con dos tablas y una relación muchos a uno.


### Claves, relaciones y cardinalidad

**Clave** `claves-relaciones-y-cardinalidad`

**Definición** Una relación conecta una clave de dimensión única con valores repetibles de hechos.

**Búsqueda** primary key, foreign key, 1:N

**Para recordar** El lado uno debe tener claves únicas.


#### Relacionar productos


Añade tProducts al modelo; relaciona tSales[product_id] con tProducts[product_id].


**Resultado esperado** Cada pedido se vincula a uno de tres productos.


### Esquema estrella

**Clave** `esquema-estrella`

**Definición** Organiza una tabla de hechos central y dimensiones de análisis alrededor.

**Búsqueda** star schema, fact, dimension

**Para recordar** Conserva la granularidad del hecho y evita relaciones ambiguas.


#### Diseñar ventas


En vista de diagrama conecta tCustomers y tProducts con tSales mediante sus claves; no conectes directamente las dos dimensiones.


**Resultado esperado** Dos relaciones 1:N hacia la tabla central de pedidos.


### Tabla calendario

**Clave** `tabla-calendario`

**Definición** Una dimensión de fechas contiene un registro por fecha y atributos de periodo.

**Búsqueda** calendar table, date dimension

**Para recordar** Usa fechas únicas, contiguas y con cobertura suficiente.


#### Crear calendario


En hoja Calendar escribe date en A1 y =DATE(2026,1,1) en A2; en A3 escribe =A2+1 y rellena hasta 31 de diciembre de 2026 (fila 366); añade year y month con YEAR/MONTH. Convierte en tCalendar, carga al modelo y relaciona date con tSales[order_date]. Marca como tabla de fechas si procede.


**Resultado esperado** 365 fechas; todos los pedidos tienen una fecha relacionada.


### Pivot desde el modelo

**Clave** `pivot-desde-el-modelo`

**Definición** Una tabla dinámica basada en el modelo puede utilizar campos de distintas tablas y medidas.

**Búsqueda** pivot model, distinct count

**Para recordar** No es necesario unir físicamente todas las columnas en una hoja.


#### Contar clientes compradores


Crea una pivot desde el modelo; tCustomers[country] en Filas y tSales[customer_id] en Valores como Recuento distinto, sin filtrar status.


**Resultado esperado** Mexico 2, Spain 1, país vacío 1; total distinto 4. Eva no tiene pedido.


## DAX en Excel

**Clave** `dax-en-excel`


### Definición

**Clave** `definicion`

**Definición** DAX es el lenguaje de cálculo del Modelo de datos; crea columnas calculadas y medidas que responden al contexto.

**Búsqueda** DAX, medida, contexto de filtro

**Para recordar** DAX no es una fórmula de celda de Excel.


**Nota** Ejemplos para Power Pivot Windows. Define las medidas en el área de cálculo o diálogo Nueva medida; el diálogo puede pedir nombre y fórmula por separado. Usa los nombres de tabla del modelo; conserva las medidas creadas en este grupo para los ejemplos posteriores.


#### Crear medida


```dax
ImporteTotal := SUM(tSales[amount])
```

DAX no es una fórmula de celda de Excel.


**Resultado esperado** 2100 sin filtros del modelo.


### Columnas calculadas

**Clave** `columnas-calculadas`

**Definición** Evalúan una expresión para cada fila del modelo y guardan el resultado calculado.

**Búsqueda** calculated column, row context

**Para recordar** Una columna calculada tiene un valor por fila.


#### Calcular importe


```dax
=tSales[quantity] * tSales[unit_price]
```

Una columna calculada tiene un valor por fila.


**Resultado esperado** 8 valores iguales a amount; suma 2100.


### Medidas y contexto de filtro

**Clave** `medidas-y-contexto-de-filtro`

**Definición** Una medida se calcula según los filtros de la celda de pivot donde se muestra.

**Búsqueda** measure, filter context

**Para recordar** La medida no tiene un valor fijo por fila como una columna.


#### Mostrar ImporteTotal por canal


Añade channel a Filas de una pivot del modelo e ImporteTotal a Valores.


**Resultado esperado** Online 1400 y Store 700; total 2100.


### SUMX

**Clave** `sumx`

**Definición** Itera filas de una tabla, evalúa una expresión por fila y suma sus resultados.

**Búsqueda** iterador, SUMX

**Para recordar** SUMX calcula primero el producto por fila.


#### Sumar importes calculados


```dax
ImporteCalculado := SUMX(tSales, tSales[quantity] * tSales[unit_price])
```

SUMX calcula primero el producto por fila.


**Resultado esperado** 2100.


### DISTINCTCOUNT y COUNTROWS

**Clave** `distinctcount-y-countrows`

**Definición** DISTINCTCOUNT cuenta valores diferentes; COUNTROWS cuenta filas de una tabla.

**Búsqueda** clientes únicos, count rows

**Para recordar** DISTINCTCOUNT incluye BLANK si existe; exclúyelo si la definición lo exige.


#### Contar pedidos y clientes


```dax
Pedidos := COUNTROWS(tSales)
Clientes := DISTINCTCOUNT(tSales[customer_id])
```

DISTINCTCOUNT incluye BLANK si existe; exclúyelo si la definición lo exige.


**Resultado esperado** 8 pedidos y 4 clientes sin filtros. Crea cada medida por separado.


### CALCULATE

**Clave** `calculate`

**Definición** Evalúa una expresión en un contexto de filtros modificado.

**Búsqueda** calculate, filter context

**Para recordar** Un filtro nuevo sobre la misma columna puede reemplazar el existente.


#### Ventas completadas


```dax
Ventas := CALCULATE([ImporteTotal], tSales[status] = "completed")
```

Un filtro nuevo sobre la misma columna puede reemplazar el existente.


**Resultado esperado** 1200 sin otros filtros.


### DIVIDE

**Clave** `divide`

**Definición** Divide dos expresiones y admite una salida alternativa si el divisor es cero.

**Búsqueda** divide, ratio, cero

**Para recordar** Usa BLANK para un ratio no definido si no se necesita otro valor.


#### Ticket completado


```dax
Ticket := DIVIDE([Ventas], CALCULATE([Pedidos], tSales[status] = "completed"))
```

Usa BLANK para un ratio no definido si no se necesita otro valor.


**Resultado esperado** 200 sin otros filtros.


### RELATED

**Clave** `related`

**Definición** Recupera un atributo de la tabla relacionada del lado uno en un contexto de fila.

**Búsqueda** related, buscar dimensión

**Para recordar** Requiere una relación adecuada y contexto de fila.


#### Traer categoría a tSales


```dax
=RELATED(tProducts[category])
```

Requiere una relación adecuada y contexto de fila.


**Resultado esperado** Primera fila Electronics; pedido 105 Accessories.


### FILTER

**Clave** `filter`

**Definición** Devuelve una tabla cuyas filas cumplen una condición.

**Búsqueda** filter table, condiciones DAX

**Para recordar** FILTER recibe tabla y expresión lógica por fila.


#### Sumar completados grandes


```dax
VentasGrandes := SUMX(FILTER(tSales, tSales[status] = "completed" && tSales[amount] >= 300), tSales[amount])
```

FILTER recibe tabla y expresión lógica por fila.


**Resultado esperado** 600.


### ALL y REMOVEFILTERS

**Clave** `all-y-removefilters`

**Definición** Permiten eliminar filtros de columnas o tablas para calcular totales de referencia.

**Búsqueda** all, removefilters, participación

**Para recordar** Quita solo los filtros que deben ignorarse.


**Nota** ALL como modificador es una alternativa compatible con Power Pivot clásico; REMOVEFILTERS no está disponible en todas las versiones del motor DAX de Excel.


#### Participación de canal


```dax
ParticipacionCanal := DIVIDE([Ventas], CALCULATE([Ventas], ALL(tSales[channel])))
```

Quita solo los filtros que deben ignorarse.


**Resultado esperado** En pivot por channel: Online 66.67%, Store 33.33%.


### RANKX

**Clave** `rankx`

**Definición** Rankea una expresión sobre una tabla de valores, con tratamiento de empates configurable.

**Búsqueda** ranking DAX, dense, skip

**Para recordar** El conjunto que se rankea debe corresponder al universo elegido.


#### Rankear canales


```dax
RankingCanal := RANKX(ALL(tSales[channel]), [Ventas], , DESC, Dense)
```

El conjunto que se rankea debe corresponder al universo elegido.


**Resultado esperado** En una pivot por channel: Online 1, Store 2.


### Inteligencia de tiempo

**Clave** `inteligencia-de-tiempo`

**Definición** Utiliza una tabla de fechas para comparar periodos y acumular métricas.

**Búsqueda** time intelligence, DATEADD, YTD

**Para recordar** Usa la fecha del calendario, no una columna de hechos dispersa.


**Nota** Requiere tCalendar relacionada y marcada como tabla de fechas según la versión.


#### Ventas acumuladas del año


```dax
VentasYTD := TOTALYTD([Ventas], tCalendar[date])
```

Usa la fecha del calendario, no una columna de hechos dispersa.


**Resultado esperado** En pivot con meses del calendario: enero 500, febrero 1200.


## Dashboards y reportes

**Clave** `dashboards-y-reportes`


### Definición

**Clave** `definicion`

**Definición** Un dashboard reúne métricas y visualizaciones para responder preguntas de seguimiento de negocio.

**Búsqueda** dashboard, reporte, KPI

**Para recordar** Define objetivo, periodo, población y fuente antes del diseño.


#### Resumen comercial


Crea hoja Report con tres celdas: ventas =SUMIF(tSales[status],"completed",tSales[amount]), pedidos =COUNTIF(tSales[status],"completed"), ticket =ventas/pedidos usando las referencias de esas dos celdas.


**Resultado esperado** 1200, 6, 200.


### Tarjetas KPI y metas

**Clave** `tarjetas-kpi-y-metas`

**Definición** Muestran un indicador junto a meta, variación y periodo cuando aporta contexto.

**Búsqueda** KPI card, actual target

**Para recordar** No confundas ventas totales con ventas completadas.


#### Tarjeta de febrero


En Report enlaza Targets!C3, Targets!B3 y una fórmula =Targets!C3/Targets!B3-1; aplica porcentaje a la variación.


**Resultado esperado** Actual 700, meta 650, desviación relativa +7.69%.


### Interactividad

**Clave** `interactividad`

**Definición** Segmentadores, filtros y controles permiten explorar subconjuntos.

**Búsqueda** dashboard slicer, report connections

**Para recordar** Conecta cada segmentador solo a reportes compatibles.


#### Controlar dos pivots


Crea dos pivots desde el mismo origen compatible tSales: ventas por estado y ventas por producto. Inserta segmentador channel y usa Conexiones de informe para ambas; selecciona Online.


**Resultado esperado** Ambas pivots reflejan los cinco pedidos Online; total general 1400.


### Diseño y actualización

**Clave** `diseno-y-actualizacion`

**Definición** Organiza indicadores y detalles de forma consistente, con fecha de actualización visible.

**Búsqueda** report layout, refresh, dashboard maintenance

**Para recordar** Una fecha de recálculo con NOW no certifica que el origen se actualizó.


#### Actualizar reporte


En copia del libro, añade pedido 109 completado por 50 y actualiza consultas/pivots del reporte antes de registrar manualmente la fecha de actualización.


**Resultado esperado** Ventas completadas 1250 y 7 pedidos; las visualizaciones deben coincidir con estos totales.


## Análisis de escenarios

**Clave** `analisis-de-escenarios`


### Definición

**Clave** `definicion`

**Definición** El análisis de hipótesis modifica supuestos para explorar resultados posibles.

**Búsqueda** what-if analysis, sensibilidad

**Para recordar** Mantén separados parámetros, fórmulas y salidas.


#### Probar un precio


En Scratch A1=100 (precio), B1=5 (unidades), C1 =A1*B1; cambia A1 a 120.


**Resultado esperado** El ingreso cambia de 500 a 600.


### Goal Seek

**Clave** `goal-seek`

**Definición** Busca el valor de una entrada para que una fórmula alcance un objetivo.

**Búsqueda** buscar objetivo, goal seek

**Para recordar** Modifica una sola celda de entrada.


#### Alcanzar ingreso


En Scratch A1=100, B1=5, C1 =A1*B1; Datos > Análisis de hipótesis > Buscar objetivo: definir C1 a 750 cambiando A1.


**Resultado esperado** A1=150 aproximadamente y C1=750.


### Scenario Manager

**Clave** `scenario-manager`

**Definición** Guarda conjuntos de supuestos y permite alternar entre ellos.

**Búsqueda** administrador de escenarios, base, pesimista

**Para recordar** Un escenario no asigna probabilidades automáticamente.


#### Comparar supuestos


En Scratch A1=100, B1=5, C1 =A1*B1; crea escenarios Base (100,5) y Alto (120,6) para A1:B1; muestra cada uno.


**Resultado esperado** C1=500 en Base, 720 en Alto.


### Data Tables

**Clave** `data-tables`

**Definición** Una tabla de datos calcula el resultado para varias alternativas de una o dos entradas.

**Búsqueda** what-if data table, sensibilidad

**Para recordar** No es lo mismo que Insertar > Tabla.


#### Sensibilidad a precio


En Scratch A1=100, B1=5, C1 =A1*B1. Deja E1 vacío; F1 =C1; E2:E4=80,100,120. Selecciona E1:F4 > Análisis de hipótesis > Tabla de datos; celda de entrada de columna A1.


**Resultado esperado** F2:F4=400,500,600.


### Solver

**Clave** `solver`

**Definición** Optimiza una fórmula objetivo variando una o más celdas bajo restricciones.

**Búsqueda** solver, optimización lineal

**Para recordar** Define objetivo, variables, restricciones y método.


**Nota** Requiere complemento Solver compatible.


#### Maximizar utilidad


Activa Solver. Scratch A1=0 (unidades), B1 =A1*20; maximiza B1 cambiando A1 con restricciones A1>=0, A1<=10 y entero; usa Simplex LP.


**Resultado esperado** 10 unidades y utilidad 200.


## Funciones financieras y presupuestos

**Clave** `funciones-financieras-y-presupuestos`


### Definición

**Clave** `definicion`

**Definición** Excel permite comparar flujos de caja, préstamos y presupuestos usando tasas y periodos consistentes.

**Búsqueda** finance, presupuesto, rentabilidad

**Para recordar** Usa una misma periodicidad para tasas y flujos.


#### Descontar un flujo


```excel
=100/(1+10%)
```

Usa una misma periodicidad para tasas y flujos.


**Resultado esperado** 90.9091 aproximadamente.


### PMT

**Clave** `pmt`

**Definición** Calcula el pago periódico de un préstamo con tasa y pagos constantes.

**Búsqueda** PAGO, cuota, amortización

**Para recordar** Los signos indican entradas y salidas de efectivo.


#### Calcular cuota


```excel
=-PMT(12%/12,12,1200)
```

Los signos indican entradas y salidas de efectivo.


**Resultado esperado** 106.62 aproximadamente por mes.


### NPV e IRR

**Clave** `npv-e-irr`

**Definición** NPV descuenta flujos periódicos futuros; IRR encuentra la tasa que hace cero el valor presente neto.

**Búsqueda** VNA, TIR, inversión

**Para recordar** En NPV, el flujo inicial en t=0 se suma aparte.


#### Evaluar inversión


```excel
=-100+NPV(10%,120)
=IRR({-100,120})
```

En NPV, el flujo inicial en t=0 se suma aparte.


**Resultado esperado** 9.0909 aproximadamente y 20%.


### XNPV y XIRR

**Clave** `xnpv-y-xirr`

**Definición** Calculan valor presente neto y tasa interna para flujos con fechas reales.

**Búsqueda** VNA.NO.PER, TIR.NO.PER, flujos irregulares

**Para recordar** El primer flujo representa la fecha base; incluye signos positivos y negativos.


#### Evaluar flujo fechado


En Scratch A1:A2 introduce 1 de enero de 2025 y 1 de enero de 2026; B1:B2=-100,120; usa =XNPV(10%,B1:B2,A1:A2) y =XIRR(B1:B2,A1:A2).


**Resultado esperado** 9.0909 aproximadamente y 20%.


### Presupuesto y forecast

**Clave** `presupuesto-y-forecast`

**Definición** Un presupuesto fija un plan; un forecast actualiza una estimación según la información disponible.

**Búsqueda** budget, forecast, desviación

**Para recordar** Distingue objetivos de proyecciones.


#### Consolidar presupuesto


```excel
=SUM(Targets!B2:B3)
=SUM(Targets!C2:C3)-SUM(Targets!B2:B3)
```

Distingue objetivos de proyecciones.


**Resultado esperado** Presupuesto 1250; desviación real -50.


## Control de calidad y conciliación

**Clave** `control-de-calidad-y-conciliacion`


### Definición

**Clave** `definicion`

**Definición** La validación analítica verifica que los datos y cálculos sean completos, coherentes y reconciliables.

**Búsqueda** data quality, control totals, reconciliación

**Para recordar** Una fórmula sin error no garantiza un resultado correcto.


#### Comprobar total


```excel
=SUM(tSales[amount])-SUMPRODUCT(tSales[quantity],tSales[unit_price])
```

Una fórmula sin error no garantiza un resultado correcto.


**Resultado esperado** 0.


### Unicidad y granularidad

**Clave** `unicidad-y-granularidad`

**Definición** Una clave debe ser única en la tabla que representa una entidad o evento único.

**Búsqueda** primary key, duplicate id, granularidad

**Para recordar** Verifica qué representa cada fila antes de contarla.


**Nota** Excel moderno; alternativa clásica: columna COUNTIF y revisión de valores mayores a 1.


#### Comprobar pedidos únicos


```excel
=COUNTA(tSales[order_id])-ROWS(UNIQUE(tSales[order_id]))
```

Verifica qué representa cada fila antes de contarla.


**Resultado esperado** 0 duplicados de id, con los datos sin blancos.


### Integridad referencial

**Clave** `integridad-referencial`

**Definición** Comprueba que los identificadores de una tabla tengan correspondencia en el catálogo.

**Búsqueda** foreign key, orphan, missing lookup

**Para recordar** Una búsqueda no encontrada debe investigarse.


#### Comprobar clientes


```excel
=SUMPRODUCT(--(COUNTIF(tCustomers[customer_id],tSales[customer_id])=0))
```

Una búsqueda no encontrada debe investigarse.


**Resultado esperado** 0 pedidos con cliente desconocido.


### Completitud y rangos

**Clave** `completitud-y-rangos`

**Definición** Verifica campos obligatorios, límites numéricos y valores permitidos.

**Búsqueda** completeness, valid range, missing

**Para recordar** Distingue ausencia de valor de valor inválido.


#### Controlar países faltantes


```excel
=COUNTBLANK(tCustomers[country])
```

Distingue ausencia de valor de valor inválido.


**Resultado esperado** 1.


### Cruces y conciliación

**Clave** `cruces-y-conciliacion`

**Definición** Compara registros y totales entre orígenes independientes o niveles de detalle.

**Búsqueda** reconcile, comparar archivos, cuadre

**Para recordar** Usa la misma definición de métrica y periodo.


#### Conciliar reporte


```excel
=SUM(Targets!C2:C3)-SUMIF(tSales[status],"completed",tSales[amount])
```

Usa la misma definición de métrica y periodo.


**Resultado esperado** 0; los reales de Targets coinciden con ventas completadas.


### Control de errores y excepciones

**Clave** `control-de-errores-y-excepciones`

**Definición** Separa filas problemáticas para revisión antes de corregirlas.

**Búsqueda** exception report, validar fórmulas

**Para recordar** No reemplaces todos los errores por cero automáticamente.


**Nota** FILTER requiere Excel moderno; alternativa: columna COUNTIF en Customers y filtro de ceros.


#### Encontrar clientes sin compras


```excel
=FILTER(tCustomers[name],COUNTIF(tSales[customer_id],tCustomers[customer_id])=0,"Ninguno")
```

No reemplaces todos los errores por cero automáticamente.


**Resultado esperado** Eva.


## Auditoría y rendimiento

**Clave** `auditoria-y-rendimiento`


### Definición

**Clave** `definicion`

**Definición** La auditoría ayuda a rastrear cálculos y el rendimiento reduce trabajo innecesario de recálculo.

**Búsqueda** formula auditing, performance

**Para recordar** Prioriza resultados verificables antes de optimizar.


#### Mostrar fórmula


En Scratch A1 escribe =SUM(10,20); en B1 escribe =FORMULATEXT(A1).


**Resultado esperado** B1 muestra =SUM(10,20) como texto.


### Precedentes y dependientes

**Clave** `precedentes-y-dependientes`

**Definición** Muestran qué celdas alimentan o utilizan una fórmula.

**Búsqueda** trace precedents, trace dependents

**Para recordar** Las flechas permiten revisar dependencias, no prueban corrección del modelo.


#### Rastrear importe


En copia de Sales J2 escribe =E2*F2; selecciona J2 > Fórmulas > Rastrear precedentes.


**Resultado esperado** Flechas desde E2 y F2.


### Evaluar fórmula y errores

**Clave** `evaluar-formula-y-errores`

**Definición** La evaluación paso a paso permite inspeccionar partes de una fórmula.

**Búsqueda** evaluate formula, error checking

**Para recordar** Revisa primero el término que produce el error.


**Nota** La disponibilidad del evaluador depende de plataforma; en su ausencia, separa los cálculos en celdas auxiliares.


#### Evaluar condición


En Scratch A1 escribe =IF(5>3,10,0); Fórmulas > Evaluar fórmula.


**Resultado esperado** Se evalúa la condición TRUE y el resultado final 10.


### Referencias circulares

**Clave** `referencias-circulares`

**Definición** Se producen cuando una fórmula depende directa o indirectamente de sí misma.

**Búsqueda** circular reference, iterative calculation

**Para recordar** Evítalas salvo modelos iterativos deliberados.


#### Detectar ciclo


En una copia de Scratch, con cálculo iterativo deshabilitado, escribe =A1+1 en A1.


**Resultado esperado** Excel detecta referencia circular y no ofrece un resultado fiable; elimina la fórmula.


### Cálculo automático y manual

**Clave** `calculo-automatico-y-manual`

**Definición** El modo automático recalcula dependencias; el manual exige una orden de cálculo.

**Búsqueda** calculation options, recalcular, F9

**Para recordar** Un libro en modo manual puede mostrar valores desactualizados.


#### Probar recálculo


En Scratch A1=10 y B1 =A1*2; activa cálculo manual, cambia A1 a 20 y usa Calcular ahora. Restaura automático.


**Resultado esperado** Tras recalcular B1=40.


### Rangos acotados y funciones volátiles

**Clave** `rangos-acotados-y-funciones-volatiles`

**Definición** Limitar rangos y evitar cálculos repetidos reduce costo en libros grandes.

**Búsqueda** volatile functions, full column, LET

**Para recordar** Prefiere referencias a tablas, reutilización y medición real.


#### Evitar cálculo repetido


```excel
=LET(total,SUM(tSales[amount]),total+total*10%)
```

Prefiere referencias a tablas, reutilización y medición real.


**Resultado esperado** 2310; el total se define una vez.


## Archivos, colaboración y protección

**Clave** `archivos-colaboracion-y-proteccion`


### Definición

**Clave** `definicion`

**Definición** Los formatos y opciones de colaboración determinan qué puede conservarse y quién puede modificar un libro.

**Búsqueda** xlsx, xlsm, compartir, proteger

**Para recordar** La protección de hoja evita ediciones accidentales, no reemplaza permisos de acceso.


#### Guardar libro


Archivo > Guardar como > Libro de Excel (.xlsx).


**Resultado esperado** Se conserva el libro con múltiples hojas y fórmulas.


### XLSX, XLSM y CSV

**Clave** `xlsx-xlsm-y-csv`

**Definición** XLSX conserva contenido de libro sin VBA; XLSM permite macros; CSV exporta datos de una sola hoja sin fórmulas ni formatos de libro.

**Búsqueda** formatos Excel, exportar CSV

**Para recordar** No uses CSV como copia completa de un modelo.


#### Exportar pedidos


Guarda una copia de Sales como CSV UTF-8; conserva el XLSX original.


**Resultado esperado** Archivo de texto con encabezado y 8 filas; sin pivots, formatos ni otras hojas.


### Protección de hoja y libro

**Clave** `proteccion-de-hoja-y-libro`

**Definición** Restringe cambios en celdas o estructura del libro.

**Búsqueda** protect sheet, protect workbook, locked cells

**Para recordar** Bloqueada solo actúa cuando la hoja está protegida.


#### Proteger fórmulas


En Scratch A1=10, B1 =A1*2; desbloquea A1 mediante Formato de celdas > Protección; protege hoja con B1 bloqueada.


**Resultado esperado** A1 se puede editar; B1 no se puede cambiar directamente mientras esté protegida.


### Coautoría, comentarios e historial

**Clave** `coautoria-comentarios-e-historial`

**Definición** Permiten trabajar con otras personas y recuperar versiones en ubicaciones compatibles.

**Búsqueda** coauthoring, comments, version history

**Para recordar** Controla permisos de edición y lectura en el almacenamiento.


**Nota** Requiere cuenta, almacenamiento y permisos compatibles. No publiques datos sensibles.


#### Colaborar en copia


Guarda libro en OneDrive o SharePoint autorizado; comparte con permiso de lectura a un colaborador de prueba y añade un comentario a Sales!I2.


**Resultado esperado** La persona autorizada puede abrir el libro según el permiso; el comentario queda asociado a I2.


### Vínculos externos

**Clave** `vinculos-externos`

**Definición** Son referencias o conexiones a otros archivos o fuentes.

**Búsqueda** workbook links, external links

**Para recordar** Mover la fuente puede romper vínculos; revisa antes de distribuir.


#### Crear y revisar vínculo


Guarda dos libros en la misma carpeta; en el segundo escribe una fórmula seleccionando Sales!I2 del primero; revisa Datos > Vínculos de libro o Editar vínculos según versión.


**Resultado esperado** Resultado inicial 200; el vínculo apunta al primer libro.


## Macros y VBA

**Clave** `macros-y-vba`


### Definición

**Clave** `definicion`

**Definición** Una macro automatiza acciones repetitivas; VBA permite programar Excel de escritorio.

**Búsqueda** macro, VBA, automatización

**Para recordar** Ejecuta solo macros de origen confiable.


**Nota** Usa Excel de escritorio compatible y un libro .xlsm para guardar VBA; Excel web no ejecuta macros VBA.


#### Grabar formato


En Scratch, graba una macro llamada FormatearTitulo que aplique negrita a A1, detén grabación y ejecútala sobre el libro de prueba.


**Resultado esperado** A1 queda en negrita.


### Editor VBA y procedimientos

**Clave** `editor-vba-y-procedimientos`

**Definición** Un procedimiento Sub agrupa instrucciones ejecutables desde un módulo.

**Búsqueda** VBE, Sub, módulo

**Para recordar** Especifica libro y hoja para no modificar la hoja activa por accidente.


**Nota** Inserta un módulo estándar en el libro de prueba y ejecuta el procedimiento.


#### Escribir indicador


```vba
Sub EscribirIndicador()
    ThisWorkbook.Worksheets("Scratch").Range("A1").Value = "Ventas"
End Sub
```

Especifica libro y hoja para no modificar la hoja activa por accidente.


**Resultado esperado** Scratch!A1 contiene Ventas.


### Objetos, rangos y variables

**Clave** `objetos-rangos-y-variables`

**Definición** VBA manipula objetos como Workbook, Worksheet y Range mediante propiedades y métodos.

**Búsqueda** Range, Cells, Dim, object model

**Para recordar** Califica los rangos con su hoja.


#### Copiar total


```vba
Sub CopiarTotal()
    Dim total As Double
    total = Application.WorksheetFunction.Sum(ThisWorkbook.Worksheets("Sales").Range("I2:I9"))
    ThisWorkbook.Worksheets("Scratch").Range("B1").Value = total
End Sub
```

Califica los rangos con su hoja.


**Resultado esperado** Scratch!B1 contiene 2100.


### Condiciones y bucles

**Clave** `condiciones-y-bucles`

**Definición** If y For permiten decisiones y repetición sobre rangos.

**Búsqueda** VBA If, For Each, loop

**Para recordar** Para grandes rangos conviene trabajar con matrices en memoria.


#### Contar completados


```vba
Sub ContarCompletados()
    Dim celda As Range, n As Long
    For Each celda In ThisWorkbook.Worksheets("Sales").Range("G2:G9")
        If celda.Value = "completed" Then n = n + 1
    Next celda
    ThisWorkbook.Worksheets("Scratch").Range("B2").Value = n
End Sub
```

Para grandes rangos conviene trabajar con matrices en memoria.


**Resultado esperado** Scratch!B2 contiene 6.


### Eventos y formularios

**Clave** `eventos-y-formularios`

**Definición** Los eventos responden a acciones de Excel y los formularios ofrecen interfaces de captura.

**Búsqueda** Workbook_Open, Worksheet_Change, UserForm

**Para recordar** Evita eventos que se disparen a sí mismos; los controles compatibles varían por plataforma.


**Nota** Coloca el código en ThisWorkbook, no en un módulo estándar. No uses este evento en archivos ajenos.


#### Registrar apertura


```vba
Private Sub Workbook_Open()
    Me.Worksheets("Scratch").Range("A1").Value = "Abierto"
End Sub
```

Evita eventos que se disparen a sí mismos; los controles compatibles varían por plataforma.


**Resultado esperado** Al reabrir el .xlsm con macros habilitadas, Scratch!A1 contiene Abierto.


## Office Scripts y automatización de flujos

**Clave** `office-scripts-y-automatizacion-de-flujos`


### Definición

**Clave** `definicion`

**Definición** Office Scripts automatiza operaciones de Excel mediante TypeScript y puede integrarse en flujos de Power Automate.

**Búsqueda** office scripts, typescript, automate

**Para recordar** No es VBA: su API y entorno son distintos.


**Nota** Requiere una cuenta, plataforma y configuración de Microsoft 365 que admitan Office Scripts. Abre Automatizar > Nuevo script en un libro de prueba.


#### Escribir etiqueta


```typescript
function main(workbook: ExcelScript.Workbook) {
  workbook.getWorksheet("Scratch").getRange("A1").setValue("Ventas");
}
```

No es VBA: su API y entorno son distintos.


**Resultado esperado** Scratch!A1 contiene Ventas.


### Leer y escribir matrices

**Clave** `leer-y-escribir-matrices`

**Definición** getValues y setValues transfieren rangos completos de datos.

**Búsqueda** ExcelScript, getValues, setValues

**Para recordar** Las matrices deben coincidir con las dimensiones del rango.


#### Copiar clientes


```typescript
function main(workbook: ExcelScript.Workbook) {
  const data = workbook.getWorksheet("Customers").getRange("A2:B6").getValues();
  workbook.getWorksheet("Scratch").getRange("A2:B6").setValues(data);
}
```

Las matrices deben coincidir con las dimensiones del rango.


**Resultado esperado** Cinco filas de identificadores y nombres, de C1/Ana a C5/Eva.


### Power Automate

**Clave** `power-automate`

**Definición** Un flujo puede ejecutar scripts de Excel mediante desencadenantes y acciones en servicios compatibles.

**Búsqueda** power automate, scheduled flow, run script

**Para recordar** Prueba entradas, permisos, concurrencia y salida antes de programar.


**Nota** Requiere acceso a Power Automate, conector y licencia compatibles; las políticas de organización pueden limitar la acción.


#### Ejecutar script de prueba


Guarda el libro de prueba y el primer script en una ubicación compatible; en Power Automate crea un flujo manual con acción Ejecutar script de Excel Online (Business), selecciona archivo y script, y ejecuta.


**Resultado esperado** Si cuenta y permisos lo admiten, el flujo termina correctamente y Scratch!A1 contiene Ventas.


## Fuentes

Documentación oficial consultada para las familias de funciones, compatibilidad y comportamiento de Excel. Los ejemplos y datos de este documento son propios; sus resultados son esperados.

- [Funciones de Excel (orden alfabético, inglés)](https://support.microsoft.com/en-us/excel/excel-functions-alphabetical): sintaxis, categorías, disponibilidad por versión y enlaces individuales para funciones de hoja.
- [Funciones de Excel (orden alfabético, español)](https://support.microsoft.com/es-es/excel/excel-functions-alphabetical): nombres localizados y referencias individuales.
- [Funciones por categoría](https://support.microsoft.com/es-es/excel/excel-functions-by-category): clasificación de funciones matemáticas, texto, estadísticas, fechas, financieras, búsqueda y lógica.
- [Nombres en fórmulas](https://support.microsoft.com/en-us/excel/get-started/define-and-use-names-in-formulas): rangos con nombre.
- [Referencias estructuradas](https://support.microsoft.com/en-us/excel/using-structured-references-with-excel-tables): tablas, columnas y referencia de fila actual.
- [XLOOKUP](https://support.microsoft.com/en-gb/excel/functions/xlookup-function): argumentos y ausencia en Excel 2016/2019.
- [Matrices dinámicas y derrame](https://support.microsoft.com/en-us/excel/dynamic-array-formulas-and-spilled-array-behavior): operador de derrame, restricciones dentro de tablas y comportamiento.
- [Matrices dinámicas frente a CSE](https://support.microsoft.com/en-us/excel/dynamic-array-formulas-vs-legacy-cse-array-formulas): diferencias de introducción y expansión.
- [FILTER](https://support.microsoft.com/en-us/excel/functions/filter-function): condiciones booleanas y compatibilidad.
- [LAMBDA](https://support.microsoft.com/es-es/excel/functions/lambda-function): creación de funciones y versiones.
- [Ordenar](https://support.microsoft.com/en-us/excel/sort-data-in-a-range-or-table-in-excel) y [filtrar](https://support.microsoft.com/en-us/excel/get-started/filter-data-in-a-range-or-table-in-excel): manipulación de registros.
- [Valores únicos y duplicados](https://support.microsoft.com/en-us/excel/get-started/filter-for-unique-values-or-remove-duplicate-values): filtrado y eliminación.
- [Formato condicional](https://support.microsoft.com/en-us/excel/use-conditional-formatting-to-highlight-information-in-excel): reglas, formatos y visualización.
- [Tablas dinámicas](https://support.microsoft.com/en-us/excel/get-started/create-a-pivottable-to-analyze-worksheet-data): creación, campos y origen.
- [Power Query en Excel](https://support.microsoft.com/es-es/excel/about-power-query-in-excel): disponibilidad y diferencias de plataforma.
- [Crear, cargar o editar consultas](https://support.microsoft.com/en-us/excel/create-load-or-edit-a-query-in-excel-power-query): consultas y destinos de carga.
- [Power Query en Mac](https://support.microsoft.com/en-us/excel/import-and-shape-data-in-excel-for-mac-power-query): importación, actualización y diferencias del entorno.
- [Power Query y Power Pivot](https://support.microsoft.com/es-es/excel/learn-to-use-power-query-and-power-pivot-in-excel): capacidades y compatibilidad.
- [Modelo de datos](https://support.microsoft.com/en-us/excel/create-a-data-model-in-excel): relaciones y tablas dinámicas multitabla.
- [Introducción a DAX](https://learn.microsoft.com/es-es/dax/dax-overview): medidas, columnas, contextos y relación con Power Pivot.
- [Análisis de hipótesis](https://support.microsoft.com/es-es/excel/introduction-to-what-if-analysis): escenarios, Buscar objetivo y tablas de datos.
- [Solver](https://support.microsoft.com/es-es/excel/define-and-solve-a-problem-with-solver): optimización, objetivos y restricciones.
- [Analysis ToolPak](https://support.microsoft.com/es-es/excel/use-the-analysis-toolpak-to-perform-complex-data-analysis): regresión y otros procedimientos.
- [VBA frente a Office Scripts](https://learn.microsoft.com/es-es/office/dev/scripts/resources/vba-differences): plataformas, diferencias de ejecución y automatización.
- [Office Scripts](https://learn.microsoft.com/es-es/office/dev/scripts/overview/excel): creación, ejecución e integración con Power Automate.
- [Requisitos de Office Scripts](https://learn.microsoft.com/en-us/office/dev/scripts/testing/platform-limits): restricciones de plataforma, cuenta y ejecución.
