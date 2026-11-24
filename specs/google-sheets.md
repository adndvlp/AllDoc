# Google Sheets

**Clave** `google-sheets`

**Área** Análisis de datos

**Resumen** Hoja de cálculo colaborativa para limpiar, transformar, consultar y analizar datos, crear reportes y automatizar procesos.

**Alcance** Fundamentos, fórmulas, búsquedas, limpieza, agregaciones, fechas, estadística, matrices, QUERY, tablas dinámicas, visualización, análisis de negocio, colaboración, rendimiento, integraciones y automatización. Las fichas avanzadas complementan el núcleo de analista junior; no constituyen un inventario de todas las funciones especializadas del catálogo oficial.

**Entorno** Google Sheets en navegador de escritorio. Ejemplos con nombres de funciones en inglés, configuración regional Estados Unidos, separador de argumentos coma, decimal punto, zona horaria America/Mexico_City. En otras regiones pueden cambiar los separadores, formatos y nombres; consulta Archivo > Configuración. Los resultados se calcularon o dedujeron para los datos indicados; no se ejecutaron en Google Sheets. Las funciones externas requieren acceso y los menús pueden variar por idioma o edición.

## Datos compartidos

Crea las hojas `Ventas`, `Clientes`, `Productos` y `Practica`. Pega cada bloque tabulado en A1 de la hoja correspondiente. Si queda en una columna, usa Datos > Dividir texto en columnas con tabulador. Las fechas ISO deben ser fechas reales (comprueba con ISNUMBER); si no, conviértelas usando DATE. Mantén los encabezados y las celdas vacías. Cada fila de Ventas representa un pedido de un producto; cada ID de cliente y producto es único en su hoja maestra. Los precios y costos son unitarios, en MXN; solo el estado `completed` cuenta como venta realizada, salvo indicación contraria.

**Ventas (A1:I9)**

```tsv
id	fecha	cliente_id	producto_id	cantidad	precio	costo	estado	canal
101	2026-08-01	1	P1	2	100	60	completed	web
102	2026-08-03	2	P2	1	300	180	completed	store
103	2026-08-05	1	P2	2	300	180	completed	web
104	2026-08-06	3	P1	1	100	60	cancelled	web
105	2026-09-01	2	P1	3	100	60	completed	store
106	2026-09-02	3	P3	2	200	100	completed	web
107	2026-09-02	1	P3	1	200	100	completed	web
108	2026-09-04	4	P2	1	300	180	cancelled	store
```

En `Ventas!J1` escribe `importe`, en J2 `=E2*F2` y copia hasta J9. En K1 escribe `costo_total`, en K2 `=E2*G2` y copia hasta K9. Los importes de J2:J9 son 200, 300, 600, 100, 300, 400, 200, 300; los costos son 120, 180, 360, 60, 180, 200, 100, 180. Hay 8 pedidos, 6 completados por $2,000 y costo de $1,140; el total de todos los pedidos es $2,400.

**Clientes (A1:E6)**

```tsv
id	nombre	pais	alta	email
1	Ana	Mexico	2026-07-01	ana@example.com
2	Luis	Mexico	2026-07-10	luis@example.com
3	Marta	Spain	2026-07-15	marta@example.com
4	John	USA	2026-07-20	john@example.com
5	Diego		2026-07-25	
```

**Productos (A1:D5)**

```tsv
id	nombre	categoria	precio
P1	Mouse	Tech	100
P2	Monitor	Tech	300
P3	Lampara	Home	200
P4	Silla	Home	500
```

Escribe las fórmulas de cada ficha en `Practica!A1`, salvo que se indique otro lugar. Deja libre la zona de salida para fórmulas que devuelven varias celdas y borra los resultados antes de otro ejemplo. Los ejemplos de interfaz que alteran datos se hacen sobre una copia de la hoja indicada, salvo instrucciones explícitas. Una fórmula que referencia `Ventas!J2` lee el importe del primer pedido; los ejemplos con arreglos literales no necesitan datos adicionales. Las fichas que usan fuentes externas indican cómo prepararlas.


## Celdas y rangos

**Clave** `celdas-y-rangos`


### Definición

**Clave** `definicion`

**Definición** Una celda guarda un valor o una fórmula; un rango identifica un conjunto de celdas.

**Búsqueda** Celdas y rangos; leer el primer importe

**Para recordar** La letra es columna y el número es fila.

#### Leer el primer importe

```text
=Ventas!J2
```

**Resultado esperado** 200.


### Rango contiguo

**Clave** `rango-contiguo`

**Definición** Los dos puntos indican desde la primera hasta la última celda, incluidas.

**Búsqueda** Rango contiguo; leer los dos primeros importes

**Para recordar** A2:A9 contiene ocho celdas.

#### Leer los dos primeros importes

```text
=ARRAYFORMULA(Ventas!J2:J3)
```

**Resultado esperado** Una columna con 200 y 300.


### Hojas y libros

**Clave** `hojas-y-libros`

**Definición** Un archivo contiene varias hojas; el signo ! separa hoja y referencia.

**Búsqueda** Hojas y libros; leer el cliente del primer pedido

**Para recordar** Usa comillas simples si el nombre de hoja contiene espacios.

#### Leer el cliente del primer pedido

```text
=Ventas!C2
```

**Resultado esperado** 1.


### Seleccionar y editar

**Clave** `seleccionar-y-editar`

**Definición** El cuadro de nombre permite ir a una celda o rango; la barra de fórmulas muestra su contenido.

**Búsqueda** Seleccionar y editar; examinar un cálculo

**Para recordar** Editar un valor cambia sus dependencias.

#### Examinar un cálculo

En Ventas, escribe J2 en el cuadro de nombre y observa la barra de fórmulas.

**Resultado esperado** Se selecciona J2; se ve =E2*F2 y el valor 200.


### Autorrelleno

**Clave** `autorrelleno`

**Definición** Copiar o arrastrar una fórmula adapta sus referencias relativas.

**Búsqueda** Autorrelleno; calcular importes

**Para recordar** Arrastra el controlador de relleno.

#### Calcular importes

En una copia de Ventas, borra J2:J9, escribe =E2*F2 en J2 y arrastra hasta J9.

**Resultado esperado** J2=200, J3=300 y J9=300.


## Referencias

**Clave** `referencias`


### Definición

**Clave** `definicion`

**Definición** Las referencias permiten utilizar valores de otras celdas en fórmulas.

**Búsqueda** Referencias; calcular el doble del primer importe

**Para recordar** El signo $ fija la parte que le sigue al copiar.

#### Calcular el doble del primer importe

```text
=Ventas!J2*2
```

**Resultado esperado** 400.


### Relativas

**Clave** `relativas`

**Definición** Una referencia sin $ cambia al copiar la fórmula a otra posición.

**Búsqueda** Relativas; copiar una fórmula hacia abajo

**Para recordar** A1 se desplaza en filas y columnas.

#### Copiar una fórmula hacia abajo

En Practica A1 escribe =Ventas!J2 y copia a A2.

**Resultado esperado** A1=200; A2=300.


### Absolutas

**Clave** `absolutas`

**Definición** Una referencia con $ en fila y columna permanece fija al copiar.

**Búsqueda** Absolutas; mantener un multiplicador fijo

**Para recordar** $A$1 no se mueve.

#### Mantener un multiplicador fijo

En Practica B1 escribe 2; en A1 escribe =Ventas!J2*$B$1 y copia a A2.

**Resultado esperado** A1=400; A2=600.


### Mixtas

**Clave** `mixtas`

**Definición** Fijan solamente la fila o la columna; sirven en matrices de cálculo.

**Búsqueda** Mixtas; copiar una tabla de multiplicación

**Para recordar** $A2 fija columna; A$2 fija fila.

#### Copiar una tabla de multiplicación

En Practica A2:A3 escribe 2 y 3; B1:C1 escribe 10 y 20; en B2 escribe =$A2*B$1 y copia a B2:C3.

**Resultado esperado** Filas: 20,40; 30,60.


### Rangos con nombre

**Clave** `rangos-con-nombre`

**Definición** Asignan un identificador legible a un rango.

**Búsqueda** Rangos con nombre; nombrar los importes

**Para recordar** El nombre sustituye la dirección.

#### Nombrar los importes

Datos > Rangos con nombre; asigna importes a Ventas!J2:J9. En Practica A1 escribe =SUM(importes).

**Resultado esperado** 2400.


## Tipos y formatos

**Clave** `tipos-y-formatos`


### Definición

**Clave** `definicion`

**Definición** El tipo determina qué operaciones se pueden hacer; el formato controla cómo se ve un valor.

**Búsqueda** Tipos y formatos; mostrar un ratio como porcentaje

**Para recordar** Cambiar formato no equivale a convertir tipo.

#### Mostrar un ratio como porcentaje

Escribe =6/8 en Practica A1 y aplica Formato > Número > Porcentaje.

**Resultado esperado** 75%; el valor interno sigue siendo 0.75.


### Números y texto

**Clave** `numeros-y-texto`

**Definición** Un número permite operaciones aritméticas; el texto conserva caracteres, como ceros iniciales.

**Búsqueda** Números y texto; conservar un código

**Para recordar** Un apóstrofo inicial fuerza texto.

#### Conservar un código

Escribe '001 en A1 y =ISNUMBER(A1) en B1.

**Resultado esperado** A1 muestra 001; B1=FALSE.


### Moneda y decimales

**Clave** `moneda-y-decimales`

**Definición** El formato moneda añade símbolo y controla decimales sin alterar la cifra.

**Búsqueda** Moneda y decimales; mostrar ingresos en mxn

**Para recordar** No confundas redondeo visual con ROUND.

#### Mostrar ingresos en MXN

En A1 escribe 2000.5; aplica moneda personalizada MXN con dos decimales.

**Resultado esperado** Se muestra un importe de 2,000.50 con el símbolo de MXN seleccionado.


### Fechas y horas

**Clave** `fechas-y-horas`

**Definición** Sheets representa fechas y horas mediante números de serie; la hora es una fracción de día.

**Búsqueda** Fechas y horas; medir un día

**Para recordar** Usa fechas reales para ordenar y restar.

#### Medir un día

```text
=DATE(2026,9,2)-DATE(2026,9,1)
```

**Resultado esperado** 1, con formato número.


### Configuración regional

**Clave** `configuracion-regional`

**Definición** Determina convenciones de fecha, separadores y moneda del libro.

**Búsqueda** Configuración regional; configurar los ejemplos

**Para recordar** No copies fórmulas de otra región sin revisar separadores.

#### Configurar los ejemplos

Archivo > Configuración; selecciona Estados Unidos y zona horaria Ciudad de México; conserva nombres de funciones en inglés.

**Resultado esperado** Las fórmulas de esta guía usan coma y punto decimal.


## Operadores y fórmulas

**Clave** `operadores-y-formulas`


### Definición

**Clave** `definicion`

**Definición** Una fórmula empieza con = y combina valores, referencias, operadores y funciones.

**Búsqueda** Operadores y fórmulas; calcular importe

**Para recordar** Los paréntesis controlan el orden de evaluación.

#### Calcular importe

```text
=Ventas!E2*Ventas!F2
```

**Resultado esperado** 200.


### Aritmética

**Clave** `aritmetica`

**Definición** + suma, - resta, * multiplica, / divide y ^ eleva a potencia.

**Búsqueda** Aritmética; calcular utilidad

**Para recordar** Multiplicación y división preceden a suma y resta.

#### Calcular utilidad

```text
=Ventas!J2-Ventas!K2
```

**Resultado esperado** 80.


### Comparaciones

**Clave** `comparaciones`

**Definición** =, <>, >, <, >= y <= devuelven TRUE o FALSE.

**Búsqueda** Comparaciones; comprobar un umbral

**Para recordar** Las comparaciones producen valores lógicos.

#### Comprobar un umbral

```text
=Ventas!J4>=500
```

**Resultado esperado** TRUE.


### Concatenación con &

**Clave** `concatenacion-con`

**Definición** Une texto y valores en una cadena.

**Búsqueda** Concatenación con &; construir etiqueta

**Para recordar** Añade separadores explícitos.

#### Construir etiqueta

```text
=Clientes!B2&" - "&Clientes!C2
```

**Resultado esperado** Ana - Mexico.


### Porcentajes

**Clave** `porcentajes`

**Definición** Un porcentaje es una proporción; 20% equivale a 0.2.

**Búsqueda** Porcentajes; descontar 20%

**Para recordar** Para mostrar porcentaje aplica formato, no multipliques dos veces.

#### Descontar 20%

```text
=Ventas!J2*(1-20%)
```

**Resultado esperado** 160.


## Agregación

**Clave** `agregacion`


### Definición

**Clave** `definicion`

**Definición** Resume varios valores en uno, como una suma o una media.

**Búsqueda** Agregación; sumar pedidos de cualquier estado

**Para recordar** El rango define qué datos entran.

#### Sumar pedidos de cualquier estado

```text
=SUM(Ventas!J2:J9)
```

**Resultado esperado** 2400.


### SUM

**Clave** `sum`

**Definición** Suma los valores numéricos del rango.

**Búsqueda** SUM; sumar cantidades

**Para recordar** Las celdas vacías y texto del rango no suman.

#### Sumar cantidades

```text
=SUM(Ventas!E2:E9)
```

**Resultado esperado** 13.


### AVERAGE

**Clave** `average`

**Definición** Divide la suma por el número de valores numéricos.

**Búsqueda** AVERAGE; calcular importe medio

**Para recordar** Ignora vacíos, pero incluye ceros.

#### Calcular importe medio

```text
=AVERAGE(Ventas!J2:J9)
```

**Resultado esperado** 300.


### COUNT

**Clave** `count`

**Definición** Cuenta las celdas con números, incluidas fechas numéricas.

**Búsqueda** COUNT; contar pedidos por id

**Para recordar** No cuenta texto.

#### Contar pedidos por ID

```text
=COUNT(Ventas!A2:A9)
```

**Resultado esperado** 8.


### COUNTA

**Clave** `counta`

**Definición** Cuenta valores presentes, incluidos textos y fórmulas que producen cadena vacía.

**Búsqueda** COUNTA; contar nombres registrados

**Para recordar** COUNTA no comprueba calidad del contenido.

#### Contar nombres registrados

```text
=COUNTA(Clientes!B2:B6)
```

**Resultado esperado** 5.


### COUNTBLANK

**Clave** `countblank`

**Definición** Cuenta celdas vacías y cadenas de longitud cero.

**Búsqueda** COUNTBLANK; contar correos ausentes

**Para recordar** No equivale a contar ceros.

#### Contar correos ausentes

```text
=COUNTBLANK(Clientes!E2:E6)
```

**Resultado esperado** 1.


### COUNTUNIQUE

**Clave** `countunique`

**Definición** Cuenta valores diferentes; filtra vacíos cuando no deban ser una categoría.

**Búsqueda** COUNTUNIQUE; contar compradores con pedidos

**Para recordar** No cuenta filas repetidas como distintas.

#### Contar compradores con pedidos

```text
=COUNTUNIQUE(Ventas!C2:C9)
```

**Resultado esperado** 4.


### MIN y MAX

**Clave** `min-y-max`

**Definición** Devuelven el menor y mayor número.

**Búsqueda** MIN y MAX; encontrar extremos de importe

**Para recordar** No devuelven el identificador de la fila asociada.

#### Encontrar extremos de importe

```text
={MIN(Ventas!J2:J9),MAX(Ventas!J2:J9)}
```

**Resultado esperado** Una fila: 100, 600.


### PRODUCT y SUMSQ

**Clave** `product-y-sumsq`

**Definición** PRODUCT multiplica valores; SUMSQ suma sus cuadrados.

**Búsqueda** PRODUCT y SUMSQ; combinar tres cantidades

**Para recordar** Son operaciones diferentes.

#### Combinar tres cantidades

```text
={PRODUCT(2,3,4),SUMSQ(2,3,4)}
```

**Resultado esperado** 24, 29.


### SUMPRODUCT

**Clave** `sumproduct`

**Definición** Multiplica elementos de rangos compatibles y suma los productos.

**Búsqueda** SUMPRODUCT; calcular ventas brutas sin columna auxiliar

**Para recordar** Los rangos deben tener dimensiones compatibles.

#### Calcular ventas brutas sin columna auxiliar

```text
=SUMPRODUCT(Ventas!E2:E9,Ventas!F2:F9)
```

**Resultado esperado** 2400.


### AVERAGE.WEIGHTED

**Clave** `average-weighted`

**Definición** Calcula una media dando a cada valor su peso.

**Búsqueda** AVERAGE.WEIGHTED; calcular precio medio por unidad

**Para recordar** No promedies precios por fila si las cantidades son distintas.

#### Calcular precio medio por unidad

```text
=AVERAGE.WEIGHTED({100;300},{2;1})
```

**Resultado esperado** 166.6667 aproximadamente.


### SUBTOTAL

**Clave** `subtotal`

**Definición** Resume un rango ignorando filas excluidas por un filtro; los códigos 101–111 ignoran también filas ocultas manualmente.

**Búsqueda** SUBTOTAL; sumar solo filas visibles

**Para recordar** 9 suma; 109 suma sin filas ocultas manualmente.

#### Sumar solo filas visibles

En una copia de Ventas, filtra H por completed; escribe fuera del rango filtrado =SUBTOTAL(109,J2:J9).

**Resultado esperado** 2000.


## Agregaciones con condiciones

**Clave** `agregaciones-con-condiciones`


### Definición

**Clave** `definicion`

**Definición** Calculan un resumen solo de filas que cumplen criterios.

**Búsqueda** Agregaciones con condiciones; sumar pedidos completados

**Para recordar** Los rangos deben estar alineados por fila.

#### Sumar pedidos completados

```text
=SUMIF(Ventas!H2:H9,"completed",Ventas!J2:J9)
```

**Resultado esperado** 2000.


### SUMIF y SUMIFS

**Clave** `sumif-y-sumifs`

**Definición** SUMIF usa un criterio; SUMIFS combina varios con AND.

**Búsqueda** SUMIF y SUMIFS; sumar ventas web completadas

**Para recordar** SUMIFS empieza con el rango a sumar.

#### Sumar ventas web completadas

```text
=SUMIFS(Ventas!J2:J9,Ventas!H2:H9,"completed",Ventas!I2:I9,"web")
```

**Resultado esperado** 1400.


### COUNTIF y COUNTIFS

**Clave** `countif-y-countifs`

**Definición** Cuentan las filas que cumplen uno o varios criterios.

**Búsqueda** COUNTIF y COUNTIFS; contar pedidos web completados

**Para recordar** Los operadores de criterio van entre comillas.

#### Contar pedidos web completados

```text
=COUNTIFS(Ventas!H2:H9,"completed",Ventas!I2:I9,"web")
```

**Resultado esperado** 4.


### AVERAGEIF y AVERAGEIFS

**Clave** `averageif-y-averageifs`

**Definición** Promedian valores de filas que cumplen condiciones.

**Búsqueda** AVERAGEIF y AVERAGEIFS; promediar pedidos web completados

**Para recordar** No incluyen los pedidos que no pasan los filtros.

#### Promediar pedidos web completados

```text
=AVERAGEIFS(Ventas!J2:J9,Ventas!H2:H9,"completed",Ventas!I2:I9,"web")
```

**Resultado esperado** 350.


### MINIFS y MAXIFS

**Clave** `minifs-y-maxifs`

**Definición** Obtienen extremos entre las filas elegibles.

**Búsqueda** MINIFS y MAXIFS; obtener extremos de pedidos completados

**Para recordar** Verifica que existan coincidencias antes de interpretar un cero.

#### Obtener extremos de pedidos completados

```text
={MINIFS(Ventas!J2:J9,Ventas!H2:H9,"completed"),MAXIFS(Ventas!J2:J9,Ventas!H2:H9,"completed")}
```

**Resultado esperado** 200, 600.


### COUNTUNIQUEIFS

**Clave** `countuniqueifs`

**Definición** Cuenta valores distintos restringidos por criterios.

**Búsqueda** COUNTUNIQUEIFS; contar clientes que completaron compras

**Para recordar** El rango de valores va primero.

#### Contar clientes que completaron compras

```text
=COUNTUNIQUEIFS(Ventas!C2:C9,Ventas!H2:H9,"completed")
```

**Resultado esperado** 3.


### Criterios con operadores y comodines

**Clave** `criterios-con-operadores-y-comodines`

**Definición** Los criterios pueden combinar operadores, referencias, * para varios caracteres y ? para uno.

**Búsqueda** Criterios con operadores y comodines; contar importes de al menos 300

**Para recordar** Concatena el operador con la celda o valor.

#### Contar importes de al menos 300

```text
=COUNTIF(Ventas!J2:J9,">="&300)
```

**Resultado esperado** 5.


## Funciones lógicas

**Clave** `funciones-logicas`


### Definición

**Clave** `definicion`

**Definición** Evalúan condiciones para decidir qué valor mostrar.

**Búsqueda** Funciones lógicas; clasificar un importe

**Para recordar** Una condición devuelve TRUE o FALSE.

#### Clasificar un importe

```text
=IF(Ventas!J4>=500,"Alto","Normal")
```

**Resultado esperado** Alto.


### IF

**Clave** `if`

**Definición** Devuelve un valor si la condición es verdadera y otro si es falsa.

**Búsqueda** IF; marcar pedido válido

**Para recordar** El tercer argumento es la alternativa.

#### Marcar pedido válido

```text
=IF(Ventas!H5="completed","Venta","No venta")
```

**Resultado esperado** No venta.


### IFS

**Clave** `ifs`

**Definición** Evalúa condiciones en orden y devuelve el valor de la primera verdadera.

**Búsqueda** IFS; clasificar importes en tres niveles

**Para recordar** Pon TRUE al final como caso general.

#### Clasificar importes en tres niveles

```text
=IFS(Ventas!J2>=500,"Alto",Ventas!J2>=200,"Medio",TRUE,"Bajo")
```

**Resultado esperado** Medio.


### SWITCH

**Clave** `switch`

**Definición** Compara una expresión con varios valores exactos.

**Búsqueda** SWITCH; traducir estado

**Para recordar** Útil para traducir códigos discretos.

#### Traducir estado

```text
=SWITCH(Ventas!H2,"completed","Realizado","cancelled","Cancelado","Otro")
```

**Resultado esperado** Realizado.


### AND OR NOT XOR

**Clave** `and-or-not-xor`

**Definición** AND requiere todas, OR alguna, NOT invierte, XOR indica paridad impar de condiciones verdaderas.

**Búsqueda** AND OR NOT XOR; comprobar dos requisitos

**Para recordar** Combina condiciones antes de IF.

#### Comprobar dos requisitos

```text
=AND(Ventas!H2="completed",Ventas!J2>=200)
```

**Resultado esperado** TRUE.


### TRUE y FALSE

**Clave** `true-y-false`

**Definición** Son valores booleanos, no cadenas de texto.

**Búsqueda** TRUE y FALSE; invertir un booleano

**Para recordar** TRUE() y FALSE() producen valores lógicos.

#### Invertir un booleano

```text
=NOT(TRUE())
```

**Resultado esperado** FALSE.


## Vacíos, errores y diagnóstico

**Clave** `vacios-errores-y-diagnostico`


### Definición

**Clave** `definicion`

**Definición** Distingue datos ausentes, tipos incorrectos y fallas de cálculo.

**Búsqueda** Vacíos, errores y diagnóstico; detectar email faltante

**Para recordar** No escondas errores sin saber su causa.

#### Detectar email faltante

```text
=ISBLANK(Clientes!E6)
```

**Resultado esperado** TRUE.


### ISBLANK

**Clave** `isblank`

**Definición** Comprueba si una celda está realmente vacía.

**Búsqueda** ISBLANK; diferenciar vacío y cadena vacía

**Para recordar** Una fórmula que devuelve "" no está realmente vacía.

#### Diferenciar vacío y cadena vacía

En Practica A1 escribe ="" y en B1 =ISBLANK(A1).

**Resultado esperado** FALSE.


### ISNUMBER e ISTEXT

**Clave** `isnumber-e-istext`

**Definición** Comprueban tipos de valores.

**Búsqueda** ISNUMBER e ISTEXT; diagnosticar un valor

**Para recordar** Un ID escrito como texto no es número.

#### Diagnosticar un valor

```text
={ISNUMBER(Ventas!A2),ISTEXT(Clientes!B2)}
```

**Resultado esperado** TRUE, TRUE.


### IFERROR

**Clave** `iferror`

**Definición** Reemplaza cualquier error de una expresión.

**Búsqueda** IFERROR; evitar dividir por cero

**Para recordar** Puede ocultar errores de calidad o de referencia.

#### Evitar dividir por cero

```text
=IFERROR(100/0,"Sin denominador")
```

**Resultado esperado** Sin denominador.


### IFNA e ISNA

**Clave** `ifna-e-isna`

**Definición** IFNA reemplaza exclusivamente #N/A; ISNA lo detecta.

**Búsqueda** IFNA e ISNA; gestionar ausencia

**Para recordar** Útil para búsquedas sin coincidencia.

#### Gestionar ausencia

```text
=IFNA(NA(),"No encontrado")
```

**Resultado esperado** No encontrado.


### ISERROR y ERROR.TYPE

**Clave** `iserror-y-error-type`

**Definición** ISERROR detecta errores; ERROR.TYPE identifica su categoría.

**Búsqueda** ISERROR y ERROR.TYPE; identificar una división inválida

**Para recordar** #DIV/0! tiene código 2.

#### Identificar una división inválida

```text
={ISERROR(1/0),ERROR.TYPE(1/0)}
```

**Resultado esperado** TRUE, 2.


### Errores frecuentes

**Clave** `errores-frecuentes`

**Definición** #N/A indica ausencia; #REF! referencia inválida o salida bloqueada; #VALUE! tipo incorrecto; #DIV/0! división inválida; #NAME? nombre desconocido.

**Búsqueda** Errores frecuentes; provocar un error identificable

**Para recordar** Revisa el mensaje antes de modificar la fórmula.

#### Provocar un error identificable

```text
=1/0
```

**Resultado esperado** #DIV/0!.


### TYPE e ISFORMULA

**Clave** `type-e-isformula`

**Definición** TYPE devuelve un código del tipo de dato; ISFORMULA comprueba si una celda contiene una fórmula.

**Búsqueda** TYPE e ISFORMULA; inspeccionar el importe

**Para recordar** TYPE de número es 1; de texto es 2.

#### Inspeccionar el importe

```text
={TYPE(Ventas!J2),ISFORMULA(Ventas!J2)}
```

**Resultado esperado** 1, TRUE.


### FORMULATEXT, ISREF y CELL

**Clave** `formulatext-isref-y-cell`

**Definición** Permiten inspeccionar expresiones, referencias válidas y metadatos de una celda.

**Búsqueda** FORMULATEXT, ISREF y CELL; leer una fórmula de origen

**Para recordar** FORMULATEXT necesita una celda con fórmula.

#### Leer una fórmula de origen

```text
=FORMULATEXT(Ventas!J2)
```

**Resultado esperado** =E2*F2, como texto.


## Búsqueda y referencia

**Clave** `busqueda-y-referencia`


### Definición

**Clave** `definicion`

**Definición** Recupera información de otra tabla usando una clave, como un JOIN de consulta.

**Búsqueda** Búsqueda y referencia; buscar nombre por id

**Para recordar** Verifica unicidad y tipo de clave.

#### Buscar nombre por ID

```text
=XLOOKUP(2,Clientes!A2:A6,Clientes!B2:B6,"No existe")
```

**Resultado esperado** Luis.


### VLOOKUP

**Clave** `vlookup`

**Definición** Busca en la primera columna del rango y devuelve una columna a la derecha.

**Búsqueda** VLOOKUP; buscar precio por producto

**Para recordar** FALSE exige coincidencia exacta; no omitas este argumento para IDs.

#### Buscar precio por producto

```text
=VLOOKUP("P2",Productos!A2:D5,4,FALSE)
```

**Resultado esperado** 300.


### HLOOKUP

**Clave** `hlookup`

**Definición** Busca horizontalmente en la primera fila y devuelve otra fila.

**Búsqueda** HLOOKUP; recuperar objetivo de febrero

**Para recordar** El índice de fila empieza en 1 dentro del rango.

#### Recuperar objetivo de febrero

```text
=HLOOKUP("Feb",{"Ene","Feb";100,120},2,FALSE)
```

**Resultado esperado** 120.


### XLOOKUP

**Clave** `xlookup`

**Definición** Busca en un rango y devuelve el elemento correspondiente de otro rango.

**Búsqueda** XLOOKUP; buscar un cliente inexistente

**Para recordar** No requiere que el resultado esté a la derecha; exacta por defecto.

#### Buscar un cliente inexistente

```text
=XLOOKUP(99,Clientes!A2:A6,Clientes!B2:B6,"No existe")
```

**Resultado esperado** No existe.


### INDEX

**Clave** `index`

**Definición** Recupera un valor por número de fila y columna dentro de un rango.

**Búsqueda** INDEX; leer el segundo producto

**Para recordar** Los índices empiezan en 1.

#### Leer el segundo producto

```text
=INDEX(Productos!B2:D5,2,1)
```

**Resultado esperado** Monitor.


### MATCH y XMATCH

**Clave** `match-y-xmatch`

**Definición** Devuelven la posición de una coincidencia; XMATCH usa exacta por defecto.

**Búsqueda** MATCH y XMATCH; encontrar la posición de p3

**Para recordar** MATCH con 0 exige coincidencia exacta.

#### Encontrar la posición de P3

```text
={MATCH("P3",Productos!A2:A5,0),XMATCH("P3",Productos!A2:A5)}
```

**Resultado esperado** 3, 3.


### INDEX y MATCH

**Clave** `index-y-match`

**Definición** Combina posición de una clave con extracción de un valor.

**Búsqueda** INDEX y MATCH; buscar país por id

**Para recordar** Los rangos deben corresponder a las mismas filas.

#### Buscar país por ID

```text
=INDEX(Clientes!C2:C6,MATCH(3,Clientes!A2:A6,0))
```

**Resultado esperado** Spain.


### LOOKUP y coincidencia aproximada

**Clave** `lookup-y-coincidencia-aproximada`

**Definición** Encuentra el valor asociado al umbral inferior en un rango ordenado.

**Búsqueda** LOOKUP y coincidencia aproximada; clasificar monto por umbral

**Para recordar** Ordena los umbrales de menor a mayor.

#### Clasificar monto por umbral

```text
=LOOKUP(350,{0;200;500},{"Bajo";"Medio";"Alto"})
```

**Resultado esperado** Medio.


### CHOOSE

**Clave** `choose`

**Definición** Selecciona una opción según su índice numérico.

**Búsqueda** CHOOSE; traducir prioridad

**Para recordar** El primer argumento debe apuntar a una opción existente.

#### Traducir prioridad

```text
=CHOOSE(2,"Baja","Media","Alta")
```

**Resultado esperado** Media.


### OFFSET e INDIRECT

**Clave** `offset-e-indirect`

**Definición** OFFSET desplaza una referencia; INDIRECT interpreta texto como dirección.

**Búsqueda** OFFSET e INDIRECT; leer un importe dinámicamente

**Para recordar** Las referencias dinámicas pueden complicar mantenimiento.

#### Leer un importe dinámicamente

```text
={OFFSET(Ventas!J2,1,0),INDIRECT("Ventas!J3")}
```

**Resultado esperado** 300, 300.


### ROW COLUMN ROWS COLUMNS

**Clave** `row-column-rows-columns`

**Definición** ROW y COLUMN indican posición; ROWS y COLUMNS cuentan dimensiones.

**Búsqueda** ROW COLUMN ROWS COLUMNS; medir rango

**Para recordar** No confundir posición con tamaño.

#### Medir rango

```text
={ROWS(Ventas!A2:J9),COLUMNS(Ventas!A2:J9)}
```

**Resultado esperado** 8, 10.


### ADDRESS

**Clave** `address`

**Definición** Construye una referencia como texto.

**Búsqueda** ADDRESS; construir dirección

**Para recordar** El modo 4 devuelve una dirección relativa.

#### Construir dirección

```text
=ADDRESS(2,10,4)
```

**Resultado esperado** J2.


## Texto

**Clave** `texto`


### Definición

**Clave** `definicion`

**Definición** Las funciones de texto extraen y transforman cadenas.

**Búsqueda** Texto; normalizar nombre

**Para recordar** Los espacios y caracteres ocultos afectan coincidencias.

#### Normalizar nombre

```text
=UPPER(Clientes!B2)
```

**Resultado esperado** ANA.


### LEFT RIGHT MID

**Clave** `left-right-mid`

**Definición** Extraen caracteres del inicio, final o posición indicada.

**Búsqueda** LEFT RIGHT MID; extraer partes de un código

**Para recordar** MID comienza en posición 1.

#### Extraer partes de un código

```text
={LEFT("MX-123",2),RIGHT("MX-123",3),MID("MX-123",4,3)}
```

**Resultado esperado** MX, 123, 123 (texto).


### LEN

**Clave** `len`

**Definición** Cuenta caracteres incluidos espacios.

**Búsqueda** LEN; medir código

**Para recordar** Sirve para validar longitud de IDs.

#### Medir código

```text
=LEN("MX-123")
```

**Resultado esperado** 6.


### TRIM y CLEAN

**Clave** `trim-y-clean`

**Definición** TRIM ajusta espacios normales; CLEAN elimina caracteres de control ASCII no imprimibles.

**Búsqueda** TRIM y CLEAN; quitar espacios y saltos de línea

**Para recordar** No limpian todos los espacios Unicode.

#### Quitar espacios y saltos de línea

```text
=TRIM(CLEAN("  Ana"&CHAR(10)&"  "))
```

**Resultado esperado** Ana.


### UPPER LOWER PROPER

**Clave** `upper-lower-proper`

**Definición** Cambian mayúsculas, minúsculas o capitalización de palabras.

**Búsqueda** UPPER LOWER PROPER; normalizar nombre y correo

**Para recordar** No modifican la celda de origen.

#### Normalizar nombre y correo

```text
={PROPER("ana lopez"),LOWER("ANA@EXAMPLE.COM")}
```

**Resultado esperado** Ana Lopez, ana@example.com.


### FIND y SEARCH

**Clave** `find-y-search`

**Definición** Devuelven la posición de un fragmento; FIND distingue mayúsculas, SEARCH no.

**Búsqueda** FIND y SEARCH; localizar arroba

**Para recordar** Si no hay coincidencia devuelven error.

#### Localizar arroba

```text
=FIND("@",Clientes!E2)
```

**Resultado esperado** 4.


### REPLACE y SUBSTITUTE

**Clave** `replace-y-substitute`

**Definición** REPLACE cambia por posición; SUBSTITUTE por coincidencia textual.

**Búsqueda** REPLACE y SUBSTITUTE; normalizar un separador

**Para recordar** Elige según conozcas posición o contenido.

#### Normalizar un separador

```text
=SUBSTITUTE("MX-123","-","_")
```

**Resultado esperado** MX_123.


### CONCAT y CONCATENATE

**Clave** `concat-y-concatenate`

**Definición** CONCAT une dos valores; CONCATENATE puede unir varios.

**Búsqueda** CONCAT y CONCATENATE; construir clave

**Para recordar** No añaden separadores automáticamente.

#### Construir clave

```text
=CONCATENATE("MX","-",123)
```

**Resultado esperado** MX-123.


### TEXTJOIN y JOIN

**Clave** `textjoin-y-join`

**Definición** Unen elementos con delimitador; TEXTJOIN permite ignorar vacíos.

**Búsqueda** TEXTJOIN y JOIN; unir tres nombres

**Para recordar** Útiles para listas y etiquetas.

#### Unir tres nombres

```text
=TEXTJOIN(", ",TRUE,Clientes!B2:B4)
```

**Resultado esperado** Ana, Luis, Marta.


### SPLIT

**Clave** `split`

**Definición** Divide texto por un delimitador y devuelve columnas.

**Búsqueda** SPLIT; separar ciudad y país

**Para recordar** El tercer argumento FALSE trata un delimitador de varios caracteres como unidad.

#### Separar ciudad y país

```text
=SPLIT("CDMX-Mexico","-")
```

**Resultado esperado** CDMX, Mexico en dos columnas.


### EXACT

**Clave** `exact`

**Definición** Compara texto distinguiendo mayúsculas.

**Búsqueda** EXACT; comparar códigos

**Para recordar** No equivale a la comparación habitual sin distinción de caso.

#### Comparar códigos

```text
=EXACT("abc","ABC")
```

**Resultado esperado** FALSE.


### CHAR CODE REPT T

**Clave** `char-code-rept-t`

**Definición** CHAR convierte código en carácter, CODE hace lo inverso, REPT repite texto y T devuelve texto o cadena vacía.

**Búsqueda** CHAR CODE REPT T; crear una barra textual

**Para recordar** Útiles para limpieza y presentación.

#### Crear una barra textual

```text
=REPT("#",5)
```

**Resultado esperado** #####.


## Conversiones

**Clave** `conversiones`


### Definición

**Clave** `definicion`

**Definición** Transforman un valor entre representaciones numéricas y textuales.

**Búsqueda** Conversiones; convertir monto textual

**Para recordar** El formato no reemplaza la conversión.

#### Convertir monto textual

```text
=VALUE("300")
```

**Resultado esperado** 300 numérico.


### VALUE

**Clave** `value`

**Definición** Interpreta texto según los formatos reconocidos por la región.

**Búsqueda** VALUE; convertir precio importado

**Para recordar** No sirve para texto arbitrario.

#### Convertir precio importado

```text
=VALUE("1,200.50")
```

**Resultado esperado** 1200.5.


### TEXT y TO_TEXT

**Clave** `text-y-to-text`

**Definición** TEXT aplica un patrón y devuelve texto; TO_TEXT convierte a texto sin elegir patrón explícito.

**Búsqueda** TEXT y TO_TEXT; crear etiqueta mensual

**Para recordar** El resultado de TEXT deja de ser número.

#### Crear etiqueta mensual

```text
=TEXT(Ventas!B2,"yyyy-mm")
```

**Resultado esperado** 2026-08.


### TO_PURE_NUMBER y N

**Clave** `to-pure-number-y-n`

**Definición** TO_PURE_NUMBER elimina formato de valores numéricos; N convierte números y booleanos, entre otros tipos, a números.

**Búsqueda** TO_PURE_NUMBER y N; convertir booleanos a indicadores

**Para recordar** N de un texto común devuelve 0, no lo interpreta como VALUE.

#### Convertir booleanos a indicadores

```text
={N(TRUE),N(FALSE)}
```

**Resultado esperado** 1, 0.


### Conversión de separadores regionales

**Clave** `conversion-de-separadores-regionales`

**Definición** Si el texto importado usa separadores distintos a los del archivo, normalízalos antes de VALUE.

**Búsqueda** Conversión de separadores regionales; convertir un monto europeo en región de estados unidos

**Para recordar** NUMBERVALUE no figura en el catálogo oficial de Sheets; no presupongas compatibilidad con Excel.

#### Convertir un monto europeo en región de Estados Unidos

```text
=VALUE(SUBSTITUTE(SUBSTITUTE("1.234,50",".",""),",","."))
```

**Resultado esperado** 1234.5 como número.


## Expresiones regulares

**Clave** `expresiones-regulares`


### Definición

**Clave** `definicion`

**Definición** Las expresiones regulares describen patrones de texto; Sheets usa RE2.

**Búsqueda** Expresiones regulares; detectar código válido

**Para recordar** Los patrones se escriben como cadenas.

#### Detectar código válido

```text
=REGEXMATCH("MX-123","^[A-Z]{2}-[0-9]{3}$")
```

**Resultado esperado** TRUE.


### REGEXMATCH

**Clave** `regexmatch`

**Definición** Devuelve si un texto cumple un patrón.

**Búsqueda** REGEXMATCH; identificar dominio de correo

**Para recordar** ^ y $ anclan inicio y fin.

#### Identificar dominio de correo

```text
=REGEXMATCH(Clientes!E2,"@example\.com$")
```

**Resultado esperado** TRUE.


### REGEXEXTRACT

**Clave** `regexextract`

**Definición** Extrae la primera coincidencia o los grupos de captura.

**Búsqueda** REGEXEXTRACT; extraer dígitos del código

**Para recordar** Usa IFNA si el patrón puede faltar.

#### Extraer dígitos del código

```text
=REGEXEXTRACT("MX-123","[0-9]+")
```

**Resultado esperado** 123 como texto.


### REGEXREPLACE

**Clave** `regexreplace`

**Definición** Sustituye coincidencias del patrón.

**Búsqueda** REGEXREPLACE; limpiar teléfono

**Para recordar** No es necesario conocer el texto exacto.

#### Limpiar teléfono

```text
=REGEXREPLACE("(55) 1234-5678","[^0-9]","")
```

**Resultado esperado** 5512345678 como texto.


## Funciones numéricas

**Clave** `funciones-numericas`


### Definición

**Clave** `definicion`

**Definición** Transforman cifras y controlan precisión matemática.

**Búsqueda** Funciones numéricas; redondear una media

**Para recordar** Los decimales visibles no necesariamente son los internos.

#### Redondear una media

```text
=ROUND(10/3,2)
```

**Resultado esperado** 3.33.


### ROUND ROUNDUP ROUNDDOWN

**Clave** `round-roundup-rounddown`

**Definición** Redondean al más cercano, lejos de cero o hacia cero, respectivamente.

**Búsqueda** ROUND ROUNDUP ROUNDDOWN; comparar redondeos

**Para recordar** El segundo argumento determina decimales.

#### Comparar redondeos

```text
={ROUND(2.345,2),ROUNDUP(2.341,2),ROUNDDOWN(2.349,2)}
```

**Resultado esperado** 2.35, 2.35, 2.34.


### CEILING y FLOOR

**Clave** `ceiling-y-floor`

**Definición** Ajustan a múltiplos superiores o inferiores para números positivos.

**Búsqueda** CEILING y FLOOR; calcular múltiplos de 5

**Para recordar** Útiles para lotes o empaques.

#### Calcular múltiplos de 5

```text
={CEILING(12,5),FLOOR(12,5)}
```

**Resultado esperado** 15, 10.


### INT y TRUNC

**Clave** `int-y-trunc`

**Definición** INT redondea hacia menos infinito; TRUNC elimina decimales hacia cero.

**Búsqueda** INT y TRUNC; comparar negativos

**Para recordar** Difieren con negativos.

#### Comparar negativos

```text
={INT(-2.7),TRUNC(-2.7)}
```

**Resultado esperado** -3, -2.


### ABS y MOD

**Clave** `abs-y-mod`

**Definición** ABS devuelve magnitud; MOD devuelve residuo de división.

**Búsqueda** ABS y MOD; medir desviación y residuo

**Para recordar** Útiles en diferencias y ciclos.

#### Medir desviación y residuo

```text
={ABS(-20),MOD(13,5)}
```

**Resultado esperado** 20, 3.


### POWER y SQRT

**Clave** `power-y-sqrt`

**Definición** Calculan potencia y raíz cuadrada.

**Búsqueda** POWER y SQRT; calcular crecimiento y raíz

**Para recordar** No confundir raíz con división.

#### Calcular crecimiento y raíz

```text
={POWER(2,3),SQRT(81)}
```

**Resultado esperado** 8, 9.


### ISEVEN e ISODD

**Clave** `iseven-e-isodd`

**Definición** Comprueban si un entero es par o impar.

**Búsqueda** ISEVEN e ISODD; comprobar paridad

**Para recordar** Sirven para clasificar índices y ciclos alternos.

#### Comprobar paridad

```text
={ISEVEN(8),ISODD(7)}
```

**Resultado esperado** TRUE, TRUE.


### RAND y RANDBETWEEN

**Clave** `rand-y-randbetween`

**Definición** Generan valores aleatorios, continuo entre 0 y 1 o entero en un intervalo inclusivo.

**Búsqueda** RAND y RANDBETWEEN; simular una demanda

**Para recordar** Pueden recalcularse; pega valores para congelarlos.

#### Simular una demanda

```text
=RANDBETWEEN(10,20)
```

**Resultado esperado** Un entero entre 10 y 20, inclusive; cambia al recalcular.


## Fechas y horas

**Clave** `fechas-y-horas`


### Definición

**Clave** `definicion`

**Definición** Las fechas reales permiten filtrar, agrupar, calcular duraciones y comparar periodos.

**Búsqueda** Fechas y horas; construir inicio de mes

**Para recordar** DATE construye fechas sin depender del texto regional.

#### Construir inicio de mes

```text
=DATE(2026,9,1)
```

**Resultado esperado** 1 de septiembre de 2026 con formato fecha.


### TODAY y NOW

**Clave** `today-y-now`

**Definición** Devuelven la fecha actual o fecha y hora actuales según la zona del archivo.

**Búsqueda** TODAY y NOW; obtener fecha de corte

**Para recordar** Se recalculan y no son una marca de tiempo fija.

#### Obtener fecha de corte

```text
=TODAY()
```

**Resultado esperado** Fecha local del momento de recálculo.


### DATE y DATEVALUE

**Clave** `date-y-datevalue`

**Definición** DATE construye fecha con componentes numéricos; DATEVALUE interpreta una cadena reconocida.

**Búsqueda** DATE y DATEVALUE; convertir fecha textual

**Para recordar** Una fecha real es numérica.

#### Convertir fecha textual

```text
=DATEVALUE("9/1/2026")
```

**Resultado esperado** Fecha 2026-09-01 si se aplica formato fecha.


### YEAR MONTH DAY

**Clave** `year-month-day`

**Definición** Extraen año, mes y día de una fecha.

**Búsqueda** YEAR MONTH DAY; descomponer fecha del pedido

**Para recordar** MONTH devuelve número de mes.

#### Descomponer fecha del pedido

```text
={YEAR(Ventas!B2),MONTH(Ventas!B2),DAY(Ventas!B2)}
```

**Resultado esperado** 2026, 8, 1.


### TIME HOUR MINUTE SECOND

**Clave** `time-hour-minute-second`

**Definición** TIME construye una hora; las otras funciones extraen sus componentes.

**Búsqueda** TIME HOUR MINUTE SECOND; obtener hora y minuto

**Para recordar** Una hora es fracción de día.

#### Obtener hora y minuto

```text
={HOUR(TIME(14,30,15)),MINUTE(TIME(14,30,15)),SECOND(TIME(14,30,15))}
```

**Resultado esperado** 14, 30, 15.


### WEEKDAY WEEKNUM ISOWEEKNUM

**Clave** `weekday-weeknum-isoweeknum`

**Definición** Devuelven día de semana o número de semana; ISOWEEKNUM sigue ISO 8601.

**Búsqueda** WEEKDAY WEEKNUM ISOWEEKNUM; identificar día de semana

**Para recordar** WEEKDAY con modo 2 comienza en lunes.

#### Identificar día de semana

```text
=WEEKDAY(DATE(2026,9,1),2)
```

**Resultado esperado** 2 (martes).


### DAYS y DATEDIF

**Clave** `days-y-datedif`

**Definición** DAYS calcula diferencia en días; DATEDIF puede contar unidades completas entre fechas.

**Búsqueda** DAYS y DATEDIF; medir antigüedad en días

**Para recordar** DATEDIF recibe inicio antes de fin.

#### Medir antigüedad en días

```text
=DAYS(DATE(2026,9,1),DATE(2026,8,1))
```

**Resultado esperado** 31.


### EDATE y EOMONTH

**Clave** `edate-y-eomonth`

**Definición** Desplazan meses o devuelven el último día del mes desplazado.

**Búsqueda** EDATE y EOMONTH; encontrar cierre mensual

**Para recordar** Usa fechas reales, no etiquetas.

#### Encontrar cierre mensual

```text
=EOMONTH(Ventas!B2,0)
```

**Resultado esperado** 2026-08-31 con formato fecha.


### NETWORKDAYS y WORKDAY

**Clave** `networkdays-y-workday`

**Definición** Calculan días hábiles o desplazan una fecha por días laborales; permiten festivos.

**Búsqueda** NETWORKDAYS y WORKDAY; medir días hábiles de una semana

**Para recordar** NETWORKDAYS cuenta extremos hábiles; WORKDAY parte del día siguiente al inicio para desplazamiento positivo.

#### Medir días hábiles de una semana

```text
=NETWORKDAYS(DATE(2026,9,1),DATE(2026,9,4))
```

**Resultado esperado** 4, sin festivos adicionales.


### YEARFRAC

**Clave** `yearfrac`

**Definición** Expresa la fracción de año entre dos fechas según una convención de días.

**Búsqueda** YEARFRAC; medir fracción anual

**Para recordar** La base 3 usa días reales/365.

#### Medir fracción anual

```text
=YEARFRAC(DATE(2026,1,1),DATE(2026,7,1),3)
```

**Resultado esperado** 181/365, aproximadamente 0.49589.


### Periodos mensuales

**Clave** `periodos-mensuales`

**Definición** Normaliza cada fecha al inicio de su mes para agrupar sin mezclar años.

**Búsqueda** Periodos mensuales; obtener clave de mes

**Para recordar** Conserva fecha real y aplica formato yyyy-mm.

#### Obtener clave de mes

```text
=DATE(YEAR(Ventas!B2),MONTH(Ventas!B2),1)
```

**Resultado esperado** 2026-08-01, visualizable como 2026-08.


### Rangos de fechas

**Clave** `rangos-de-fechas`

**Definición** Usa inicio incluido y fin excluido para cubrir periodos completos, incluso horas.

**Búsqueda** Rangos de fechas; sumar septiembre completado

**Para recordar** Evita comparar solo MONTH si hay varios años.

#### Sumar septiembre completado

```text
=SUMIFS(Ventas!J2:J9,Ventas!H2:H9,"completed",Ventas!B2:B9,">="&DATE(2026,9,1),Ventas!B2:B9,"<"&DATE(2026,10,1))
```

**Resultado esperado** 900.


## Ordenar y filtrar

**Clave** `ordenar-y-filtrar`


### Definición

**Clave** `definicion`

**Definición** Ordenar cambia la posición de filas; filtrar muestra un subconjunto sin borrar el resto.

**Búsqueda** Ordenar y filtrar; filtrar pedidos realizados

**Para recordar** Ordena filas completas, no una sola columna aislada.

#### Filtrar pedidos realizados

En copia de Ventas selecciona A1:K9; Datos > Crear un filtro; en estado conserva completed.

**Resultado esperado** 6 pedidos visibles, 2 ocultos.


### Ordenamiento de rango

**Clave** `ordenamiento-de-rango`

**Definición** Ordena datos según una o varias columnas y conserva las relaciones entre celdas.

**Búsqueda** Ordenamiento de rango; ordenar por importe

**Para recordar** Marca que el rango tiene encabezados.

#### Ordenar por importe

Selecciona A1:K9 en copia de Ventas; Datos > Ordenar rango > Opciones avanzadas; marca encabezados; ordena J de Z a A.

**Resultado esperado** El pedido 103 con 600 queda primero.


### Vistas de filtro

**Clave** `vistas-de-filtro`

**Definición** Guardan un filtro u orden personal sin imponerlo a colaboradores.

**Búsqueda** Vistas de filtro; crear vista web

**Para recordar** Útiles en hojas compartidas.

#### Crear vista web

Datos > Crear vista de filtro; nómbrala Web y filtra canal por web.

**Resultado esperado** 5 pedidos visibles en esa vista; la tabla base no cambia.


### Congelar y agrupar

**Clave** `congelar-y-agrupar`

**Definición** Congelar conserva encabezados a la vista; agrupar filas o columnas permite plegarlas.

**Búsqueda** Congelar y agrupar; mantener encabezados

**Para recordar** No elimina datos.

#### Mantener encabezados

En copia de Ventas usa Ver > Inmovilizar > 1 fila y desplázate hacia abajo.

**Resultado esperado** Los encabezados siguen visibles.


## Arrays y expansión

**Clave** `arrays-y-expansion`


### Definición

**Clave** `definicion`

**Definición** Un array contiene varios valores y puede ocupar más de una celda como resultado de una fórmula.

**Búsqueda** Arrays y expansión; crear una columna de tres valores

**Para recordar** La zona de salida debe estar libre.

#### Crear una columna de tres valores

```text
={10;20;30}
```

**Resultado esperado** A1:A3 muestra 10, 20, 30.


### Literales de arrays

**Clave** `literales-de-arrays`

**Definición** Con la región indicada, la coma separa columnas y el punto y coma filas.

**Búsqueda** Literales de arrays; crear una matriz

**Para recordar** Todas las filas deben tener el mismo ancho.

#### Crear una matriz

```text
={"A","B";1,2}
```

**Resultado esperado** Dos filas: A,B; 1,2.


### ARRAYFORMULA

**Clave** `arrayformula`

**Definición** Permite aplicar ciertas expresiones a rangos y expandir resultados.

**Búsqueda** ARRAYFORMULA; calcular importes en bloque

**Para recordar** Muchas funciones de arrays ya se expanden sin ARRAYFORMULA.

#### Calcular importes en bloque

```text
=ARRAYFORMULA(Ventas!E2:E9*Ventas!F2:F9)
```

**Resultado esperado** Columna: 200,300,600,100,300,400,200,300.


### SEQUENCE

**Clave** `sequence`

**Definición** Genera números consecutivos con filas, columnas, inicio y paso.

**Búsqueda** SEQUENCE; generar cuatro ids

**Para recordar** No es necesario rellenar manualmente.

#### Generar cuatro IDs

```text
=SEQUENCE(4,1,101,1)
```

**Resultado esperado** 101,102,103,104 en columna.


### TRANSPOSE

**Clave** `transpose`

**Definición** Intercambia filas y columnas.

**Búsqueda** TRANSPOSE; convertir fila a columna

**Para recordar** Cambia la orientación, no el contenido.

#### Convertir fila a columna

```text
=TRANSPOSE({"Ene","Feb","Mar"})
```

**Resultado esperado** Ene, Feb, Mar en tres filas.


### Errores de expansión

**Clave** `errores-de-expansion`

**Definición** Si una fórmula de matriz necesita celdas ocupadas, puede producir #REF!.

**Búsqueda** Errores de expansión; provocar expansión bloqueada

**Para recordar** Limpia la zona de salida sin borrar la fórmula.

#### Provocar expansión bloqueada

En Practica A2 escribe ocupado; en A1 escribe =SEQUENCE(3).

**Resultado esperado** A1 muestra #REF! hasta liberar A2.


## FILTER SORT UNIQUE

**Clave** `filter-sort-unique`


### Definición

**Clave** `definicion`

**Definición** Generan tablas derivadas que se actualizan cuando cambia el origen.

**Búsqueda** FILTER SORT UNIQUE; mostrar importes completados

**Para recordar** No alteran el rango fuente.

#### Mostrar importes completados

```text
=FILTER(Ventas!J2:J9,Ventas!H2:H9="completed")
```

**Resultado esperado** 200,300,600,300,400,200 en columna.


### FILTER

**Clave** `filter`

**Definición** Devuelve filas o columnas que cumplen condiciones booleanas.

**Búsqueda** FILTER; mostrar ids de pedidos web completados

**Para recordar** Las condiciones deben tener dimensiones compatibles; sin coincidencias devuelve #N/A.

#### Mostrar IDs de pedidos web completados

```text
=FILTER(Ventas!A2:A9,Ventas!H2:H9="completed",Ventas!I2:I9="web")
```

**Resultado esperado** 101,103,106,107.


### SORT

**Clave** `sort`

**Definición** Ordena una salida por índice de columna o rango de ordenación.

**Búsqueda** SORT; ordenar importes

**Para recordar** TRUE ascendente, FALSE descendente.

#### Ordenar importes

```text
=SORT(Ventas!J2:J9,1,FALSE)
```

**Resultado esperado** 600,400,300,300,300,200,200,100.


### SORTN

**Clave** `sortn`

**Definición** Devuelve los primeros n registros según el orden y el tratamiento de empates.

**Búsqueda** SORTN; mostrar tres importes mayores

**Para recordar** Modo 0 devuelve como máximo n filas.

#### Mostrar tres importes mayores

```text
=SORTN(Ventas!J2:J9,3,0,1,FALSE)
```

**Resultado esperado** 600,400,300.


### UNIQUE

**Clave** `unique`

**Definición** Elimina filas duplicadas en el resultado; con varios campos considera la fila completa.

**Búsqueda** UNIQUE; listar estados únicos

**Para recordar** No altera el origen; elimina espacios inconsistentes antes si procede.

#### Listar estados únicos

```text
=UNIQUE(Ventas!H2:H9)
```

**Resultado esperado** completed, cancelled en ese orden.


### UNIQUE exactamente una vez

**Clave** `unique-exactamente-una-vez`

**Definición** El tercer argumento TRUE devuelve valores que solo aparecen una vez.

**Búsqueda** UNIQUE exactamente una vez; encontrar importes sin repetición

**Para recordar** No equivale a quitar duplicados y conservar uno de cada.

#### Encontrar importes sin repetición

```text
=UNIQUE(Ventas!J2:J9,FALSE,TRUE)
```

**Resultado esperado** 600,100,400 en ese orden.


### Combinación de funciones

**Clave** `combinacion-de-funciones`

**Definición** Puedes filtrar, deduplicar y ordenar la salida en una expresión.

**Búsqueda** Combinación de funciones; listar ids compradores completados únicos

**Para recordar** Lee las funciones anidadas desde el interior.

#### Listar IDs compradores completados únicos

```text
=SORT(UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9="completed")),1,TRUE)
```

**Resultado esperado** 1,2,3.


## Manipulación de matrices

**Clave** `manipulacion-de-matrices`


### Definición

**Clave** `definicion`

**Definición** Las funciones de matrices apilan, seleccionan o reorganizan bloques sin copiar manualmente.

**Búsqueda** Manipulación de matrices; apilar dos listas

**Para recordar** Comprueba orientación y dimensiones.

#### Apilar dos listas

```text
=VSTACK({1;2},{3;4})
```

**Resultado esperado** 1,2,3,4 en columna.


### VSTACK y HSTACK

**Clave** `vstack-y-hstack`

**Definición** Apilan rangos vertical u horizontalmente.

**Búsqueda** VSTACK y HSTACK; unir dos columnas

**Para recordar** Alinea columnas o filas para evitar rellenos #N/A.

#### Unir dos columnas

```text
=HSTACK({1;2},{"Ana";"Luis"})
```

**Resultado esperado** Filas: 1,Ana; 2,Luis.


### TOCOL TOROW FLATTEN

**Clave** `tocol-torow-flatten`

**Definición** TOCOL y TOROW convierten una matriz en una columna o fila; FLATTEN apila elementos por filas.

**Búsqueda** TOCOL TOROW FLATTEN; aplanar matriz por filas

**Para recordar** El orden de recorrido afecta el resultado.

#### Aplanar matriz por filas

```text
=TOCOL({1,2;3,4})
```

**Resultado esperado** 1,2,3,4 en columna.


### CHOOSECOLS y CHOOSEROWS

**Clave** `choosecols-y-chooserows`

**Definición** Seleccionan posiciones concretas de columnas o filas.

**Búsqueda** CHOOSECOLS y CHOOSEROWS; elegir id y precio

**Para recordar** Los índices negativos cuentan desde el final.

#### Elegir ID y precio

```text
=CHOOSECOLS(Productos!A2:D5,1,4)
```

**Resultado esperado** P1,100; P2,300; P3,200; P4,500.


### ARRAY_CONSTRAIN

**Clave** `array-constrain`

**Definición** Limita el tamaño de una salida a un número de filas y columnas.

**Búsqueda** ARRAY_CONSTRAIN; mostrar dos filas de productos

**Para recordar** No ordena ni aplica condiciones.

#### Mostrar dos filas de productos

```text
=ARRAY_CONSTRAIN(Productos!A2:D5,2,2)
```

**Resultado esperado** P1,Mouse; P2,Monitor.


### WRAPROWS y WRAPCOLS

**Clave** `wraprows-y-wrapcols`

**Definición** Reorganizan una fila o columna en bloques de tamaño fijo.

**Búsqueda** WRAPROWS y WRAPCOLS; dividir una serie en filas de dos

**Para recordar** Especifica relleno cuando no completa el bloque.

#### Dividir una serie en filas de dos

```text
=WRAPROWS({1;2;3;4;5},2,0)
```

**Resultado esperado** 1,2; 3,4; 5,0.


## LET y LAMBDA

**Clave** `let-y-lambda`


### Definición

**Clave** `definicion`

**Definición** LET nombra resultados intermedios; LAMBDA define cálculos parametrizados.

**Búsqueda** LET y LAMBDA; reutilizar un total

**Para recordar** Ayudan a evitar repetir expresiones y a hacerlas legibles.

#### Reutilizar un total

```text
=LET(total,SUM(Ventas!J2:J9),total/8)
```

**Resultado esperado** 300.


### LET

**Clave** `let`

**Definición** Asigna nombres locales a expresiones dentro de una fórmula.

**Búsqueda** LET; calcular utilidad bruta

**Para recordar** El último argumento es el resultado.

#### Calcular utilidad bruta

```text
=LET(ingresos,2000,costos,1140,ingresos-costos)
```

**Resultado esperado** 860.


### LAMBDA

**Clave** `lambda`

**Definición** Define una función con parámetros y una expresión; se puede invocar directamente o desde funciones auxiliares.

**Búsqueda** LAMBDA; aplicar un descuento

**Para recordar** Los parámetros solo existen dentro de la función.

#### Aplicar un descuento

```text
=LAMBDA(monto,monto*0.9)(200)
```

**Resultado esperado** 180.


### MAP

**Clave** `map`

**Definición** Aplica una LAMBDA a cada valor o combinación de valores de arrays alineados.

**Búsqueda** MAP; calcular iva de tres montos

**Para recordar** Cada llamada devuelve un resultado escalar.

#### Calcular IVA de tres montos

```text
=MAP({100;200;300},LAMBDA(x,x*0.16))
```

**Resultado esperado** 16,32,48 en columna.


### REDUCE

**Clave** `reduce`

**Definición** Recorre un array y actualiza un acumulador hasta producir un resultado final.

**Búsqueda** REDUCE; sumar una serie

**Para recordar** La LAMBDA recibe acumulador y valor actual.

#### Sumar una serie

```text
=REDUCE(0,{10;20;30},LAMBDA(acc,x,acc+x))
```

**Resultado esperado** 60.


### SCAN

**Clave** `scan`

**Definición** Devuelve cada resultado intermedio del acumulador.

**Búsqueda** SCAN; acumular tres ingresos

**Para recordar** Útil para acumulados como SUM OVER en SQL.

#### Acumular tres ingresos

```text
=SCAN(0,{10;20;30},LAMBDA(acc,x,acc+x))
```

**Resultado esperado** 10,30,60.


### BYROW y BYCOL

**Clave** `byrow-y-bycol`

**Definición** Aplican una LAMBDA a cada fila o columna de una matriz.

**Búsqueda** BYROW y BYCOL; sumar por fila

**Para recordar** Cada fila o columna produce un resultado escalar.

#### Sumar por fila

```text
=BYROW({1,2;3,4},LAMBDA(fila,SUM(fila)))
```

**Resultado esperado** 3,7 en columna.


### MAKEARRAY

**Clave** `makearray`

**Definición** Crea una matriz calculando cada posición con una LAMBDA de fila y columna.

**Búsqueda** MAKEARRAY; crear tabla de multiplicación

**Para recordar** Los índices empiezan en 1.

#### Crear tabla de multiplicación

```text
=MAKEARRAY(2,3,LAMBDA(f,c,f*c))
```

**Resultado esperado** 1,2,3; 2,4,6.


### Named Functions

**Clave** `named-functions`

**Definición** Guardan una fórmula reutilizable con nombre y argumentos definidos desde la interfaz.

**Búsqueda** Named Functions; definir descuento reutilizable

**Para recordar** No requieren Apps Script.

#### Definir descuento reutilizable

Datos > Funciones con nombre; crea PRECIO_NETO con argumentos monto y tasa; fórmula =monto*(1-tasa). Guarda y usa =PRECIO_NETO(200,0.1) en Practica.

**Resultado esperado** 180.


## QUERY

**Clave** `query`


### Definición

**Clave** `definicion`

**Definición** QUERY consulta una tabla mediante el lenguaje de Google Visualization.

**Búsqueda** QUERY; seleccionar ids e importes

**Para recordar** El rango sustituye FROM; el último argumento indica filas de encabezado.

#### Seleccionar IDs e importes

```text
=QUERY(Ventas!A1:K9,"select A,J",1)
```

**Resultado esperado** Encabezados id, importe; 8 filas con IDs 101–108 y sus importes.


### SELECT y columnas

**Clave** `select-y-columnas`

**Definición** Selecciona columnas por identificador, no necesariamente por encabezado visible.

**Búsqueda** SELECT y columnas; elegir columnas de un array

**Para recordar** En rango directo usa A, B, etc.; en arrays construidos normalmente Col1, Col2.

#### Elegir columnas de un array

```text
=QUERY({Ventas!A2:A9,Ventas!J2:J9},"select Col2,Col1 limit 2",0)
```

**Resultado esperado** Filas: 200,101; 300,102.


### WHERE

**Clave** `where`

**Definición** Filtra según comparaciones, operadores lógicos y valores.

**Búsqueda** WHERE; filtrar cancelados

**Para recordar** El texto de la consulta va entre comillas dobles y los literales de texto dentro entre simples.

#### Filtrar cancelados

```text
=QUERY(Ventas!A1:K9,"select A,J where H = 'cancelled' order by A",1)
```

**Resultado esperado** id, importe: 104,100; 108,300.


### Fechas en QUERY

**Clave** `fechas-en-query`

**Definición** Los literales de fecha se escriben date 'yyyy-mm-dd'.

**Búsqueda** Fechas en QUERY; listar pedidos de septiembre

**Para recordar** La columna fuente debe contener fechas reales.

#### Listar pedidos de septiembre

```text
=QUERY(Ventas!A1:K9,"select A where B >= date '2026-09-01' order by A",1)
```

**Resultado esperado** Encabezado id y filas 105,106,107,108.


### GROUP BY y agregaciones

**Clave** `group-by-y-agregaciones`

**Definición** Agrupa filas y calcula sum, avg, count, min o max.

**Búsqueda** GROUP BY y agregaciones; sumar por estado

**Para recordar** Las columnas no agregadas deben agruparse.

#### Sumar por estado

```text
=QUERY(Ventas!A1:K9,"select H,sum(J) group by H order by H",1)
```

**Resultado esperado** cancelled,400; completed,2000, además de encabezados.


### ORDER BY LIMIT OFFSET

**Clave** `order-by-limit-offset`

**Definición** Ordena, limita y omite filas del resultado.

**Búsqueda** ORDER BY LIMIT OFFSET; mostrar segundo mayor pedido

**Para recordar** Para ranking estable añade criterios de desempate.

#### Mostrar segundo mayor pedido

```text
=QUERY(Ventas!A1:K9,"select A,J order by J desc,A limit 1 offset 1",1)
```

**Resultado esperado** id, importe: 106,400.


### PIVOT

**Clave** `pivot`

**Definición** Convierte valores distintos de una columna en columnas agregadas.

**Búsqueda** PIVOT; cruzar estado y canal

**Para recordar** Necesita agregación; columnas dependen de categorías presentes.

#### Cruzar estado y canal

```text
=QUERY(Ventas!A1:K9,"select I,sum(J) group by I pivot H order by I",1)
```

**Resultado esperado** Filas store: 300 cancelado, 600 completado; web: 100 cancelado, 1400 completado.


### LABEL y FORMAT

**Clave** `label-y-format`

**Definición** LABEL cambia encabezados y FORMAT cambia representación visual en la salida.

**Búsqueda** LABEL y FORMAT; nombrar total

**Para recordar** Escribe estas cláusulas después de las cláusulas de selección y agrupación.

#### Nombrar total

```text
=QUERY(Ventas!A1:K9,"select sum(J) label sum(J) 'Total' format sum(J) '#,##0.00'",1)
```

**Resultado esperado** Encabezado Total; valor 2400 mostrado como 2,400.00.


### Patrones y nulos

**Clave** `patrones-y-nulos`

**Definición** WHERE admite contains, starts with, ends with, matches, like e is null.

**Búsqueda** Patrones y nulos; encontrar clientes sin país

**Para recordar** Las comparaciones de texto del lenguaje QUERY distinguen mayúsculas.

#### Encontrar clientes sin país

```text
=QUERY(Clientes!A1:E6,"select B where C is null",1)
```

**Resultado esperado** Encabezado nombre y fila Diego.


### Parámetros dinámicos

**Clave** `parametros-dinamicos`

**Definición** Puedes construir el texto de la consulta a partir de celdas; valida entradas de usuario.

**Búsqueda** Parámetros dinámicos; consultar umbral configurable

**Para recordar** Mantén separados texto de consulta y valores.

#### Consultar umbral configurable

En Practica B1 escribe 400 y en A3 escribe =QUERY(Ventas!A1:K9,"select A,J where J >= "&B1&" order by A",1).

**Resultado esperado** 103,600; 106,400.


### Tipos y límites de QUERY

**Clave** `tipos-y-limites-de-query`

**Definición** No es SQL completo: no tiene JOIN, HAVING, DISTINCT ni funciones de ventana; en columnas mixtas el tipo mayoritario determina el tipo y los valores minoritarios se tratan como nulos.

**Búsqueda** Tipos y límites de QUERY; contar filas por estado

**Para recordar** Prepara datos homogéneos; usa UNIQUE, búsquedas o FILTER como alternativas.

#### Contar filas por estado

```text
=QUERY(Ventas!A1:K9,"select H,count(A) group by H order by H",1)
```

**Resultado esperado** cancelled,2; completed,6.


## Funciones de base de datos

**Clave** `funciones-de-base-de-datos`


### Definición

**Clave** `definicion`

**Definición** Las funciones D* resumen registros de una tabla con encabezados según un rango de criterios.

**Búsqueda** Funciones de base de datos; sumar pedidos válidos

**Para recordar** El rango de criterios incluye encabezados iguales a los de la tabla.

#### Sumar pedidos válidos

```text
=DSUM(Ventas!A1:K9,"importe",{"estado";"completed"})
```

**Resultado esperado** 2000.


### DSUM y DAVERAGE

**Clave** `dsum-y-daverage`

**Definición** Suman o promedian un campo de los registros filtrados.

**Búsqueda** DSUM y DAVERAGE; promediar completados

**Para recordar** Campo puede indicarse por encabezado o índice.

#### Promediar completados

```text
=DAVERAGE(Ventas!A1:K9,"importe",{"estado";"completed"})
```

**Resultado esperado** 333.3333 aproximadamente.


### DCOUNT y DCOUNTA

**Clave** `dcount-y-dcounta`

**Definición** Cuentan valores numéricos o no vacíos en un campo de registros filtrados.

**Búsqueda** DCOUNT y DCOUNTA; contar ids completados

**Para recordar** El campo contado debe corresponder al dato esperado.

#### Contar IDs completados

```text
=DCOUNT(Ventas!A1:K9,"id",{"estado";"completed"})
```

**Resultado esperado** 6.


### DMIN y DMAX

**Clave** `dmin-y-dmax`

**Definición** Devuelven extremos de un campo filtrado.

**Búsqueda** DMIN y DMAX; buscar máximo completado

**Para recordar** No identifican automáticamente la fila asociada.

#### Buscar máximo completado

```text
=DMAX(Ventas!A1:K9,"importe",{"estado";"completed"})
```

**Resultado esperado** 600.


### DGET

**Clave** `dget`

**Definición** Extrae un valor cuando exactamente un registro satisface el criterio.

**Búsqueda** DGET; leer importe de pedido único

**Para recordar** Si hay cero o varias coincidencias devuelve error.

#### Leer importe de pedido único

```text
=DGET(Ventas!A1:K9,"importe",{"id";103})
```

**Resultado esperado** 600.


### Criterios AND y OR

**Clave** `criterios-and-y-or`

**Definición** En el rango de criterios, una fila combina columnas con AND; varias filas representan OR.

**Búsqueda** Criterios AND y OR; sumar pedidos completados web

**Para recordar** Repite encabezados si necesitas dos condiciones para el mismo campo.

#### Sumar pedidos completados web

```text
=DSUM(Ventas!A1:K9,"importe",{"estado","canal";"completed","web"})
```

**Resultado esperado** 1400.


## Estadística descriptiva

**Clave** `estadistica-descriptiva`


### Definición

**Clave** `definicion`

**Definición** Describe centro, dispersión, posición y distribución de datos.

**Búsqueda** Estadística descriptiva; calcular mediana de importes

**Para recordar** Elige estadístico según pregunta y población.

#### Calcular mediana de importes

```text
=MEDIAN(Ventas!J2:J9)
```

**Resultado esperado** 300.


### MEDIAN y MODE

**Clave** `median-y-mode`

**Definición** MEDIAN encuentra el centro ordenado; MODE el valor más frecuente.

**Búsqueda** MEDIAN y MODE; encontrar centro y moda

**Para recordar** La mediana es menos sensible a extremos que la media.

#### Encontrar centro y moda

```text
={MEDIAN(Ventas!J2:J9),MODE(Ventas!J2:J9)}
```

**Resultado esperado** 300,300.


### STDEV.S STDEV.P VAR.S VAR.P

**Clave** `stdev-s-stdev-p-var-s-var-p`

**Definición** Miden dispersión muestral o poblacional; varianza usa unidades al cuadrado.

**Búsqueda** STDEV.S STDEV.P VAR.S VAR.P; medir dispersión de una población

**Para recordar** S para muestra, P para población completa.

#### Medir dispersión de una población

```text
={STDEV.P(2,4,6),VAR.P(2,4,6)}
```

**Resultado esperado** 1.63299 y 2.66667 aproximadamente.


### PERCENTILE y QUARTILE

**Clave** `percentile-y-quartile`

**Definición** Calculan umbrales de posición interpolando valores.

**Búsqueda** PERCENTILE y QUARTILE; calcular cuartiles

**Para recordar** Percentil 0.5 equivale a mediana.

#### Calcular cuartiles

```text
={QUARTILE({10;20;30;40;50},1),PERCENTILE({10;20;30;40;50},0.75)}
```

**Resultado esperado** 20,40.


### RANK RANK.EQ RANK.AVG

**Clave** `rank-rank-eq-rank-avg`

**Definición** Asignan posición; RANK.EQ comparte el mejor puesto en empates y RANK.AVG promedia posiciones empatadas.

**Búsqueda** RANK RANK.EQ RANK.AVG; comparar empates

**Para recordar** El orden 0 clasifica de mayor a menor.

#### Comparar empates

```text
={RANK.EQ(90,{100;90;90;80},0),RANK.AVG(90,{100;90;90;80},0)}
```

**Resultado esperado** 2,2.5.


### LARGE y SMALL

**Clave** `large-y-small`

**Definición** Devuelven el k-ésimo mayor o menor valor, incluyendo empates.

**Búsqueda** LARGE y SMALL; encontrar segundo mayor importe

**Para recordar** k empieza en 1.

#### Encontrar segundo mayor importe

```text
=LARGE(Ventas!J2:J9,2)
```

**Resultado esperado** 400.


### FREQUENCY

**Clave** `frequency`

**Definición** Cuenta observaciones por límites superiores de intervalos y agrega un intervalo final.

**Búsqueda** FREQUENCY; distribuir importes

**Para recordar** Devuelve una fila más que el número de límites.

#### Distribuir importes

```text
=FREQUENCY(Ventas!J2:J9,{200;400})
```

**Resultado esperado** 3,4,1 en columna: hasta 200, entre 200 y 400, más de 400.


### Valores atípicos e IQR

**Clave** `valores-atipicos-e-iqr`

**Definición** El rango intercuartílico Q3−Q1 permite definir límites orientativos de valores atípicos.

**Búsqueda** Valores atípicos e IQR; calcular iqr

**Para recordar** Un dato atípico no es necesariamente erróneo.

#### Calcular IQR

```text
=QUARTILE({10;20;30;40;50},3)-QUARTILE({10;20;30;40;50},1)
```

**Resultado esperado** 20.


### Promedio móvil

**Clave** `promedio-movil`

**Definición** Promedia una ventana de observaciones consecutivas.

**Búsqueda** Promedio móvil; calcular media móvil de tres días

**Para recordar** El periodo y orden deben estar definidos.

#### Calcular media móvil de tres días

En Practica B1:B5 escribe 10,20,30,40,50; en C3 escribe =AVERAGE(B1:B3) y copia hasta C5.

**Resultado esperado** C3:C5: 20,30,40.


## Estadística y pronóstico

**Clave** `estadistica-y-pronostico`


### Definición

**Clave** `definicion`

**Definición** Las funciones estadísticas permiten medir relación, ajustar tendencias y evaluar evidencia bajo supuestos.

**Búsqueda** Estadística y pronóstico; medir relación lineal

**Para recordar** Correlación no demuestra causalidad.

#### Medir relación lineal

```text
=CORREL({1;2;3},{2;4;6})
```

**Resultado esperado** 1.


### CORREL y COVARIANCE

**Clave** `correl-y-covariance`

**Definición** CORREL mide asociación lineal normalizada; COVARIANCE.P y COVARIANCE.S miden covariación.

**Búsqueda** CORREL y COVARIANCE; calcular covarianza poblacional

**Para recordar** La covarianza depende de las unidades.

#### Calcular covarianza poblacional

```text
=COVARIANCE.P({1;2;3},{2;4;6})
```

**Resultado esperado** 1.33333 aproximadamente.


### SLOPE INTERCEPT RSQ

**Clave** `slope-intercept-rsq`

**Definición** Obtienen pendiente, intercepto y coeficiente de determinación de una regresión lineal simple.

**Búsqueda** SLOPE INTERCEPT RSQ; medir ajuste de una línea

**Para recordar** Primero pasa y, después x.

#### Medir ajuste de una línea

```text
={SLOPE({2;4;6},{1;2;3}),INTERCEPT({2;4;6},{1;2;3}),RSQ({2;4;6},{1;2;3})}
```

**Resultado esperado** 2,0,1.


### FORECAST y TREND

**Clave** `forecast-y-trend`

**Definición** Proyectan valores suponiendo una relación lineal estimada.

**Búsqueda** FORECAST y TREND; predecir el cuarto periodo

**Para recordar** No garantizan valores futuros.

#### Predecir el cuarto periodo

```text
=FORECAST(4,{2;4;6},{1;2;3})
```

**Resultado esperado** 8.


### LINEST

**Clave** `linest`

**Definición** Devuelve coeficientes de regresión lineal y opcionalmente estadísticas adicionales.

**Búsqueda** LINEST; estimar pendiente e intercepto

**Para recordar** La salida puede ocupar varias celdas.

#### Estimar pendiente e intercepto

```text
=LINEST({2;4;6},{1;2;3},TRUE,FALSE)
```

**Resultado esperado** Una fila con 2,0.


### T.TEST

**Clave** `t-test`

**Definición** Devuelve un valor p de una prueba t según colas y tipo de muestra.

**Búsqueda** T.TEST; comparar dos grupos

**Para recordar** Tipo 1 pareada; 2 varianzas iguales; 3 varianzas desiguales.

#### Comparar dos grupos

```text
=T.TEST({10;12;14},{10;12;14},2,2)
```

**Resultado esperado** 1, con dos colas y varianzas iguales.


### Z.TEST

**Clave** `z-test`

**Definición** Devuelve la probabilidad unilateral de una prueba z sobre la media.

**Búsqueda** Z.TEST; evaluar media de referencia

**Para recordar** Requiere supuestos adecuados sobre la muestra y desviación.

#### Evaluar media de referencia

```text
=Z.TEST({8;10;12},10,2)
```

**Resultado esperado** 0.5.


### CHISQ.TEST

**Clave** `chisq-test`

**Definición** Compara frecuencias observadas con esperadas y devuelve valor p.

**Búsqueda** CHISQ.TEST; comparar tabla de frecuencias

**Para recordar** Usa frecuencias esperadas positivas y grados de libertad apropiados.

#### Comparar tabla de frecuencias

```text
=CHISQ.TEST({20,30;30,20},{25,25;25,25})
```

**Resultado esperado** Aproximadamente 0.0455.


### Intervalos de confianza

**Clave** `intervalos-de-confianza`

**Definición** CONFIDENCE.T y CONFIDENCE.NORM calculan márgenes de error bajo supuestos diferentes.

**Búsqueda** Intervalos de confianza; calcular margen normal

**Para recordar** Suma y resta el margen a la media; no es una garantía de resultados individuales.

#### Calcular margen normal

```text
=CONFIDENCE.NORM(0.05,10,100)
```

**Resultado esperado** Aproximadamente 1.96.


## Matrices matemáticas

**Clave** `matrices-matematicas`


### Definición

**Clave** `definicion`

**Definición** Operaciones de álgebra lineal sobre arreglos numéricos.

**Búsqueda** Matrices matemáticas; crear matriz identidad

**Para recordar** Verifica dimensiones y si la matriz es invertible.

#### Crear matriz identidad

```text
=MUNIT(2)
```

**Resultado esperado** 1,0; 0,1.


### MMULT

**Clave** `mmult`

**Definición** Multiplica matrices; columnas de la primera deben igualar filas de la segunda.

**Búsqueda** MMULT; combinar cantidades y precios

**Para recordar** No equivale a multiplicación elemento por elemento.

#### Combinar cantidades y precios

```text
=MMULT({2,1},{100;300})
```

**Resultado esperado** 500.


### MDETERM y MINVERSE

**Clave** `mdeterm-y-minverse`

**Definición** Calculan determinante e inversa de una matriz cuadrada.

**Búsqueda** MDETERM y MINVERSE; calcular determinante

**Para recordar** Una matriz singular no tiene inversa.

#### Calcular determinante

```text
=MDETERM({2,0;0,3})
```

**Resultado esperado** 6.


## Calidad y limpieza de datos

**Clave** `calidad-y-limpieza-de-datos`


### Definición

**Clave** `definicion`

**Definición** Detecta duplicados, vacíos, tipos incorrectos e inconsistencias antes de calcular indicadores.

**Búsqueda** Calidad y limpieza de datos; contar filas con clave repetida de cliente

**Para recordar** Conserva datos originales y documenta reglas de limpieza.

#### Contar filas con clave repetida de cliente

```text
=COUNTIF(Ventas!C2:C9,1)
```

**Resultado esperado** 3; son pedidos diferentes, no duplicados de pedido.


### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Cuenta apariciones de una clave de negocio para marcar repeticiones.

**Búsqueda** Detectar duplicados; marcar ids repetidos

**Para recordar** La clave debe reflejar la granularidad esperada.

#### Marcar IDs repetidos

En Practica B1:B4 escribe 101,102,101,103; en C1 escribe =COUNTIF($B$1:$B$4,B1)>1 y copia hasta C4.

**Resultado esperado** TRUE,FALSE,TRUE,FALSE.


### Eliminar duplicados

**Clave** `eliminar-duplicados`

**Definición** La herramienta de limpieza modifica el rango y conserva un registro por combinación seleccionada.

**Búsqueda** Eliminar duplicados; depurar lista de ids

**Para recordar** Haz copia y define qué columnas identifican un registro.

#### Depurar lista de IDs

En Practica B1:B5 escribe id,101,102,101,103; selecciona ese rango; Datos > Limpieza de datos > Quitar duplicados; marca encabezado.

**Resultado esperado** Encabezado y tres IDs: 101,102,103.


### Normalización de claves

**Clave** `normalizacion-de-claves`

**Definición** Ajusta tipo, espacios y caso antes de buscar o agrupar.

**Búsqueda** Normalización de claves; normalizar identificador

**Para recordar** Los IDs con ceros iniciales deben mantenerse como texto si son significativos.

#### Normalizar identificador

```text
=UPPER(TRIM(" p2 "))
```

**Resultado esperado** P2.


### Dividir texto y sugerencias de limpieza

**Clave** `dividir-texto-y-sugerencias-de-limpieza`

**Definición** Las herramientas visuales detectan inconsistencias o separan campos por delimitador.

**Búsqueda** Dividir texto y sugerencias de limpieza; separar código compuesto

**Para recordar** Revisa sugerencias antes de aceptarlas.

#### Separar código compuesto

En Practica B1 escribe MX-123; selecciona B1; Datos > Dividir texto en columnas; elige guion personalizado.

**Resultado esperado** B1=MX y C1=123 (la parte numérica puede interpretarse como número).


### Reconciliación

**Clave** `reconciliacion`

**Definición** Compara claves y totales entre tablas para encontrar diferencias.

**Búsqueda** Reconciliación; detectar pedido con cliente inexistente

**Para recordar** No reemplaces ausencia por cero antes de diagnosticar.

#### Detectar pedido con cliente inexistente

```text
=ISNA(MATCH(99,Clientes!A2:A6,0))
```

**Resultado esperado** TRUE.


### Granularidad y doble conteo

**Clave** `granularidad-y-doble-conteo`

**Definición** Define qué representa una fila antes de combinar fuentes.

**Búsqueda** Granularidad y doble conteo; comparar pedidos y compradores

**Para recordar** Una relación uno a muchos puede multiplicar importes al unir.

#### Comparar pedidos y compradores

```text
={COUNT(Ventas!A2:A9),COUNTUNIQUE(Ventas!C2:C9)}
```

**Resultado esperado** 8 pedidos y 4 compradores; no son la misma métrica.


## Tablas estructuradas

**Clave** `tablas-estructuradas`


### Definición

**Clave** `definicion`

**Definición** Las tablas de Sheets organizan rangos con encabezados, tipos de columna y referencias por nombre.

**Búsqueda** Tablas estructuradas; convertir ventas en tabla

**Para recordar** No son tablas dinámicas; verifica tipos y nombres únicos.

#### Convertir ventas en tabla

En una copia de Ventas selecciona A1:K9; Formato > Convertir en tabla; nómbrala Pedidos.

**Resultado esperado** Se crea una tabla Pedidos con encabezados y filas de datos.


### Referencias de tabla

**Clave** `referencias-de-tabla`

**Definición** Permiten referir una columna por nombre en vez de coordenadas fijas.

**Búsqueda** Referencias de tabla; sumar columna estructurada

**Para recordar** Usa los nombres reales de tabla y encabezado.

#### Sumar columna estructurada

Tras crear Pedidos como en la ficha Definición, escribe =SUM(Pedidos[importe]) fuera de la tabla.

**Resultado esperado** 2400.


### Tipos de columna y vistas

**Clave** `tipos-de-columna-y-vistas`

**Definición** Los tipos ayudan a identificar entradas inconsistentes; las vistas permiten filtrar o agrupar sin modificar la tabla base.

**Búsqueda** Tipos de columna y vistas; configurar tipo numérico

**Para recordar** Una advertencia de tipo no equivale necesariamente a restricción estricta.

#### Configurar tipo numérico

En Pedidos abre el menú de encabezado cantidad, elige tipo número; crea una vista agrupada por estado si está disponible.

**Resultado esperado** La columna queda tipada y la vista agrupa completed y cancelled.


## Tablas dinámicas

**Clave** `tablas-dinamicas`


### Definición

**Clave** `definicion`

**Definición** Resumen interactivo que agrupa registros por dimensiones y calcula métricas sin escribir fórmulas.

**Búsqueda** Tablas dinámicas; resumir importe por estado

**Para recordar** Cada origen necesita encabezados y granularidad consistente.

#### Resumir importe por estado

Selecciona Ventas!A1:K9; Insertar > Tabla dinámica > Nueva hoja; Filas: estado; Valores: importe, SUM.

**Resultado esperado** cancelled 400; completed 2000; total 2400.


### Filas columnas valores filtros

**Clave** `filas-columnas-valores-filtros`

**Definición** Filas y columnas son dimensiones, valores son agregaciones, filtros limitan registros.

**Búsqueda** Filas columnas valores filtros; cruzar estado y canal

**Para recordar** Cambiar un campo de SUM a COUNT cambia la métrica.

#### Cruzar estado y canal

Crea una tabla dinámica de Ventas; Filas: canal; Columnas: estado; Valores: SUM de importe.

**Resultado esperado** store: 300 cancelado,600 completado; web: 100 cancelado,1400 completado.


### Agrupar fechas

**Clave** `agrupar-fechas`

**Definición** Agrupa fechas reales por año, mes u otros periodos desde la tabla dinámica.

**Búsqueda** Agrupar fechas; resumir meses

**Para recordar** No mezcles meses de años distintos si interesa la serie temporal.

#### Resumir meses

Crea tabla dinámica de Ventas con fecha en Filas e importe SUM en Valores; filtra estado completed; clic derecho sobre fecha y agrupa por año-mes.

**Resultado esperado** Agosto 1100; septiembre 900.


### Porcentajes y campos calculados

**Clave** `porcentajes-y-campos-calculados`

**Definición** La opción Mostrar como transforma agregados en porcentajes; un campo calculado permite derivar métricas.

**Búsqueda** Porcentajes y campos calculados; mostrar porcentaje por estado

**Para recordar** Una razón de sumas no es lo mismo que la media de razones.

#### Mostrar porcentaje por estado

En tabla dinámica de importe por estado, configura Mostrar como > % del total general.

**Resultado esperado** completed 83.33%; cancelled 16.67% aproximadamente.


### GETPIVOTDATA

**Clave** `getpivotdata`

**Definición** Extrae un agregado de una tabla dinámica por campos y elementos.

**Búsqueda** GETPIVOTDATA; recuperar total completado

**Para recordar** La referencia debe apuntar a una celda de la tabla dinámica.

#### Recuperar total completado

Crea la tabla dinámica de estado en una hoja llamada Resumen desde A1; en Practica usa =GETPIVOTDATA("SUM of importe",Resumen!A1,"estado","completed") ajustando el nombre del valor al encabezado exacto de tu tabla.

**Resultado esperado** 2000.


### Segmentadores

**Clave** `segmentadores`

**Definición** Filtran tablas dinámicas y gráficos compatibles que comparten datos.

**Búsqueda** Segmentadores; filtrar tablero por canal

**Para recordar** No sustituyen filtros de fórmulas independientes.

#### Filtrar tablero por canal

En la hoja de la tabla dinámica, Datos > Añadir segmentación de datos; selecciona Ventas!A1:K9, columna canal; conserva web.

**Resultado esperado** El total visible del resumen por estado pasa a 1500.


## Visualización

**Clave** `visualizacion`


### Definición

**Clave** `definicion`

**Definición** Los gráficos representan comparaciones, tendencias y distribuciones.

**Búsqueda** Visualización; comparar ventas por canal

**Para recordar** Elige tipo según pregunta, no solo estética.

#### Comparar ventas por canal

Crea una tabla dinámica de canal con SUM de importe; selecciona las filas store y web sin total; Insertar > Gráfico > Columnas.

**Resultado esperado** Dos columnas: store 900, web 1500.


### Barras y columnas

**Clave** `barras-y-columnas`

**Definición** Comparan magnitudes entre categorías.

**Búsqueda** Barras y columnas; comparar estados

**Para recordar** Ordena categorías si facilita lectura.

#### Comparar estados

Selecciona los dos estados y sus totales de la tabla dinámica; inserta gráfico de barras.

**Resultado esperado** completed 2000 y cancelled 400.


### Líneas

**Clave** `lineas`

**Definición** Representan evolución de una métrica ordenada en el tiempo.

**Búsqueda** Líneas; mostrar tendencia mensual

**Para recordar** Conserva el orden cronológico.

#### Mostrar tendencia mensual

Selecciona la tabla mensual de completados (agosto 1100, septiembre 900) e inserta gráfico de líneas.

**Resultado esperado** La línea baja de 1100 a 900.


### Dispersión e histogramas

**Clave** `dispersion-e-histogramas`

**Definición** Dispersión compara pares numéricos; histograma cuenta observaciones por intervalos.

**Búsqueda** Dispersión e histogramas; ver distribución de importes

**Para recordar** No confundas correlación con causalidad.

#### Ver distribución de importes

Selecciona Ventas!J1:J9; Insertar > Gráfico > Histograma.

**Resultado esperado** 8 observaciones distribuidas en intervalos automáticos.


### Gráficos combinados y ejes

**Clave** `graficos-combinados-y-ejes`

**Definición** Combinan series de distinto tipo y permiten un eje secundario si unidades difieren.

**Búsqueda** Gráficos combinados y ejes; comparar ventas y pedidos

**Para recordar** Etiqueta cada eje para evitar lecturas engañosas.

#### Comparar ventas y pedidos

En Practica crea tabla Mes,Ingresos,Pedidos con Ago,1100,3 y Sep,900,3; selecciona e inserta gráfico combinado; asigna pedidos al eje derecho.

**Resultado esperado** Columnas de ingresos y línea de 3 pedidos en ambos meses.


### SPARKLINE

**Clave** `sparkline`

**Definición** Dibuja un gráfico compacto dentro de una celda.

**Búsqueda** SPARKLINE; mostrar mini tendencia

**Para recordar** Útil para tendencias en filas de indicadores.

#### Mostrar mini tendencia

```text
=SPARKLINE({1100,900},{"charttype","line"})
```

**Resultado esperado** Una minilínea descendente.


### Formato condicional

**Clave** `formato-condicional`

**Definición** Cambia apariencia según una condición, sin alterar el valor.

**Búsqueda** Formato condicional; resaltar pedidos cancelados

**Para recordar** Las referencias relativas se evalúan desde la primera celda del rango.

#### Resaltar pedidos cancelados

En copia de Ventas aplica formato condicional a A2:K9 con fórmula personalizada =$H2="cancelled".

**Resultado esperado** Filas de pedidos 104 y 108 resaltadas.


### Escalas de color

**Clave** `escalas-de-color`

**Definición** Representan magnitudes relativas mediante colores.

**Búsqueda** Escalas de color; resaltar importes altos

**Para recordar** Los extremos dependen del rango seleccionado.

#### Resaltar importes altos

Selecciona Ventas!J2:J9 y aplica escala de color desde formato condicional.

**Resultado esperado** 600 recibe el color de máximo; 100 el de mínimo.


## Validación y control

**Clave** `validacion-y-control`


### Definición

**Clave** `definicion`

**Definición** Controla entradas, protege fórmulas y conserva consistencia.

**Búsqueda** Validación y control; limitar estados aceptados

**Para recordar** La validación no reemplaza controles de calidad posteriores.

#### Limitar estados aceptados

En copia de Ventas selecciona H2:H9; Datos > Validación de datos; desplegable completed y cancelled; selecciona rechazar entrada inválida.

**Resultado esperado** Una entrada pending es rechazada.


### Listas desplegables

**Clave** `listas-desplegables`

**Definición** Ofrecen opciones predefinidas o tomadas de un rango.

**Búsqueda** Listas desplegables; crear lista de productos

**Para recordar** Usa una fuente maestra si las categorías cambian.

#### Crear lista de productos

En Practica B1 configura validación desplegable desde Productos!A2:A5.

**Resultado esperado** B1 permite P1, P2, P3 y P4.


### Checkboxes

**Clave** `checkboxes`

**Definición** Representan estados booleanos o valores personalizados.

**Búsqueda** Checkboxes; registrar aprobación

**Para recordar** Por defecto casilla marcada TRUE y desmarcada FALSE.

#### Registrar aprobación

En Practica B1 usa Insertar > Casilla; márcala; en A1 escribe =IF(B1,"Aprobado","Pendiente").

**Resultado esperado** Aprobado.


### Validación personalizada

**Clave** `validacion-personalizada`

**Definición** Una fórmula booleana establece criterios más específicos.

**Búsqueda** Validación personalizada; aceptar cantidad positiva

**Para recordar** La referencia debe partir de la primera celda del rango.

#### Aceptar cantidad positiva

En copia de Ventas E2:E9 aplica validación fórmula personalizada =AND(ISNUMBER(E2),E2>0), rechazar entrada.

**Resultado esperado** 0 o texto no se aceptan.


### Protección de hojas y rangos

**Clave** `proteccion-de-hojas-y-rangos`

**Definición** Limita quién puede editar rangos o muestra advertencias.

**Búsqueda** Protección de hojas y rangos; proteger importes calculados

**Para recordar** No impide que usuarios autorizados vean o copien datos.

#### Proteger importes calculados

Datos > Proteger hojas y rangos; selecciona Ventas!J2:K9; configura solo propietarios o usuarios autorizados.

**Resultado esperado** Usuarios no autorizados no pueden editar esas celdas según permisos.


## Colaboración y auditoría

**Clave** `colaboracion-y-auditoria`


### Definición

**Clave** `definicion`

**Definición** Sheets permite trabajo simultáneo, comentarios, versiones y permisos de archivo.

**Búsqueda** Colaboración y auditoría; compartir para revisión

**Para recordar** Comparte el mínimo acceso necesario.

#### Compartir para revisión

En una copia de práctica pulsa Compartir; invita a una cuenta de prueba como comentarista.

**Resultado esperado** Puede comentar, no editar valores.


### Permisos y acceso externo

**Clave** `permisos-y-acceso-externo`

**Definición** Lector, comentarista y editor tienen capacidades distintas; acceso general puede ampliar exposición.

**Búsqueda** Permisos y acceso externo; revisar acceso

**Para recordar** Evita enlaces públicos para datos sensibles.

#### Revisar acceso

Abre Compartir y comprueba que Acceso general sea Restringido.

**Resultado esperado** Solo cuentas autorizadas tienen acceso, sujeto a políticas del dominio.


### Historial de versiones

**Clave** `historial-de-versiones`

**Definición** Permite revisar cambios y restaurar versiones anteriores.

**Búsqueda** Historial de versiones; guardar punto de control

**Para recordar** Nombra versiones antes de modificaciones importantes.

#### Guardar punto de control

Archivo > Historial de versiones > Asignar nombre a la versión actual; escribe Antes de limpieza.

**Resultado esperado** Aparece una versión identificable para revisión.


### Comentarios y notas

**Clave** `comentarios-y-notas`

**Definición** Comentarios permiten conversaciones y asignación según permisos; notas añaden información local a la celda.

**Búsqueda** Comentarios y notas; documentar una métrica

**Para recordar** No sustituyen documentación de fórmulas críticas.

#### Documentar una métrica

Añade una nota a Ventas!J1: cantidad por precio unitario.

**Resultado esperado** Al pasar sobre el indicador de nota se muestra la explicación.


### Auditoría de fórmulas

**Clave** `auditoria-de-formulas`

**Definición** Inspecciona fórmulas, dependencias y resultados anómalos mediante barra de fórmulas, FORMULATEXT y búsqueda.

**Búsqueda** Auditoría de fórmulas; revisar fórmula de costo

**Para recordar** Verifica rangos y criterios antes de confiar en un KPI.

#### Revisar fórmula de costo

```text
=FORMULATEXT(Ventas!K2)
```

**Resultado esperado** =E2*G2 como texto.


## Métricas de negocio

**Clave** `metricas-de-negocio`


### Definición

**Clave** `definicion`

**Definición** Una métrica convierte datos en una medida útil para tomar decisiones.

**Búsqueda** Métricas de negocio; calcular ingresos realizados

**Para recordar** Define población, periodo, unidad y fórmula antes de reportar.

#### Calcular ingresos realizados

```text
=SUMIF(Ventas!H2:H9,"completed",Ventas!J2:J9)
```

**Resultado esperado** 2000 MXN.


### Ingresos costos y utilidad

**Clave** `ingresos-costos-y-utilidad`

**Definición** Utilidad bruta es ingreso menos costo de mercancía para las mismas ventas.

**Búsqueda** Ingresos costos y utilidad; calcular utilidad bruta

**Para recordar** No mezcles costos de cancelados con ingresos de completados.

#### Calcular utilidad bruta

```text
=SUMIF(Ventas!H2:H9,"completed",Ventas!J2:J9)-SUMIF(Ventas!H2:H9,"completed",Ventas!K2:K9)
```

**Resultado esperado** 860 MXN.


### Margen y markup

**Clave** `margen-y-markup`

**Definición** Margen divide utilidad por ingresos; markup divide utilidad por costo.

**Búsqueda** Margen y markup; calcular margen bruto

**Para recordar** Son denominadores distintos.

#### Calcular margen bruto

```text
=(2000-1140)/2000
```

**Resultado esperado** 43%, con formato porcentaje.


### Ticket promedio

**Clave** `ticket-promedio`

**Definición** Divide ingresos entre cantidad de pedidos elegibles.

**Búsqueda** Ticket promedio; calcular ticket de completados

**Para recordar** No divide entre unidades ni clientes.

#### Calcular ticket de completados

```text
=SUMIF(Ventas!H2:H9,"completed",Ventas!J2:J9)/COUNTIF(Ventas!H2:H9,"completed")
```

**Resultado esperado** 333.3333 MXN aproximadamente.


### Tasas y ratios

**Clave** `tasas-y-ratios`

**Definición** Dividen un numerador por una base definida; el formato porcentaje solo cambia presentación.

**Búsqueda** Tasas y ratios; calcular tasa de pedidos completados

**Para recordar** IFERROR puede ocultar denominador cero; compruébalo explícitamente.

#### Calcular tasa de pedidos completados

```text
=COUNTIF(Ventas!H2:H9,"completed")/COUNTA(Ventas!A2:A9)
```

**Resultado esperado** 75% con formato porcentaje; no es conversión de visitantes a compra.


### Conversión y funnel

**Clave** `conversion-y-funnel`

**Definición** Mide avance entre etapas de una población de eventos o usuarios.

**Búsqueda** Conversión y funnel; calcular avance de visita a compra

**Para recordar** Define unidad y orden; no divides registros de poblaciones diferentes.

#### Calcular avance de visita a compra

```text
=LET(visitas,1000,compras,50,compras/visitas)
```

**Resultado esperado** 5%.


### Crecimiento MoM QoQ YoY

**Clave** `crecimiento-mom-qoq-yoy`

**Definición** Compara una métrica con el mes, trimestre o año anterior mediante actual/anterior−1.

**Búsqueda** Crecimiento MoM QoQ YoY; medir cambio mensual de ingresos

**Para recordar** La base debe ser comparable y no cero.

#### Medir cambio mensual de ingresos

```text
=900/1100-1
```

**Resultado esperado** -18.18% aproximadamente.


### Segmentación

**Clave** `segmentacion`

**Definición** Divide registros en grupos útiles para el análisis según reglas definidas.

**Búsqueda** Segmentación; clasificar importe de pedido

**Para recordar** Evita límites solapados o sin categoría.

#### Clasificar importe de pedido

```text
=IFS(Ventas!J4>=500,"Alto",Ventas!J4>=200,"Medio",TRUE,"Bajo")
```

**Resultado esperado** Alto.


### Retención y churn

**Clave** `retencion-y-churn`

**Definición** Retención mide cuántos integrantes de una cohorte siguen activos; churn mide bajas de esa cohorte.

**Búsqueda** Retención y churn; calcular retención de compradores de agosto

**Para recordar** No incluyas nuevos clientes en la base inicial.

#### Calcular retención de compradores de agosto

```text
=LET(agosto,UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9="completed",Ventas!B2:B9>=DATE(2026,8,1),Ventas!B2:B9<DATE(2026,9,1))),septiembre,UNIQUE(FILTER(Ventas!C2:C9,Ventas!H2:H9="completed",Ventas!B2:B9>=DATE(2026,9,1),Ventas!B2:B9<DATE(2026,10,1))),AVERAGE(MAP(agosto,LAMBDA(id,N(ISNUMBER(MATCH(id,septiembre,0)))))))
```

**Resultado esperado** 100%: los compradores 1 y 2 de agosto vuelven en septiembre; churn de esta cohorte 0%.


### Cohortes

**Clave** `cohortes`

**Definición** Agrupa personas según un evento de entrada y mide resultados en periodos posteriores.

**Búsqueda** Cohortes; encontrar mes de primera compra de ana

**Para recordar** Cohorte por alta no equivale a cohorte por primera compra.

#### Encontrar mes de primera compra de Ana

```text
=TEXT(MINIFS(Ventas!B2:B9,Ventas!C2:C9,1,Ventas!H2:H9,"completed"),"yyyy-mm")
```

**Resultado esperado** 2026-08.


### Pareto

**Clave** `pareto`

**Definición** Ordena contribuciones de mayor a menor y calcula su proporción acumulada.

**Búsqueda** Pareto; medir concentración por cliente

**Para recordar** No presupongas que el 20% produce exactamente el 80%.

#### Medir concentración por cliente

En Practica B1:B3 escribe ingresos por cliente ordenados 1000,600,400; en C1 escribe =SUM($B$1:B1)/SUM($B$1:$B$3) y copia hasta C3; aplica porcentaje.

**Resultado esperado** 50%,80%,100%.


### Presupuesto y variaciones

**Clave** `presupuesto-y-variaciones`

**Definición** Compara valores reales con objetivos en importe y porcentaje.

**Búsqueda** Presupuesto y variaciones; comparar ingresos contra presupuesto

**Para recordar** Aclara si una desviación positiva es favorable según métrica.

#### Comparar ingresos contra presupuesto

```text
={(2000-2200),(2000-2200)/2200}
```

**Resultado esperado** -200 MXN y -9.09% aproximadamente.


### Escenarios y punto de equilibrio

**Clave** `escenarios-y-punto-de-equilibrio`

**Definición** Cambia supuestos controlados para estimar resultados alternativos; equilibrio cubre costos totales.

**Búsqueda** Escenarios y punto de equilibrio; calcular unidades para cubrir costo fijo

**Para recordar** Mantén supuestos en celdas independientes.

#### Calcular unidades para cubrir costo fijo

```text
=ROUNDUP(1000/(100-60),0)
```

**Resultado esperado** 25 unidades.


### KPIs y dashboards

**Clave** `kpis-y-dashboards`

**Definición** Un tablero combina indicadores definidos, dimensiones, filtros y series para supervisar resultados.

**Búsqueda** KPIs y dashboards; construir tablero mínimo

**Para recordar** Mantén el mismo criterio temporal en todas las tarjetas.

#### Construir tablero mínimo

Crea hoja Dashboard con A1:B4: indicador/valor, ingresos/2000, pedidos/6, ticket/333.33; sustituye números por SUMIF, COUNTIF y división de las celdas de ingresos y pedidos; añade gráfico mensual del ejemplo de líneas.

**Resultado esperado** Tres KPIs dinámicos y tendencia agosto 1100, septiembre 900.


## Finanzas

**Clave** `finanzas`


### Definición

**Clave** `definicion`

**Definición** Las funciones financieras modelan dinero a través del tiempo con flujos y tasas.

**Búsqueda** Finanzas; calcular valor futuro

**Para recordar** Mantén periodos de tasa y pagos compatibles; ingresos y pagos tienen signos opuestos.

#### Calcular valor futuro

```text
=FV(0.1,1,0,-1000)
```

**Resultado esperado** 1100.


### PV FV PMT

**Clave** `pv-fv-pmt`

**Definición** PV y FV calculan valor presente y futuro; PMT calcula pago periódico.

**Búsqueda** PV FV PMT; calcular mensualidad sin interés

**Para recordar** Las tasas deben corresponder al periodo de pago.

#### Calcular mensualidad sin interés

```text
=PMT(0,12,1200)
```

**Resultado esperado** -100, salida mensual.


### RATE

**Clave** `rate`

**Definición** Estima la tasa periódica que hace compatibles los flujos.

**Búsqueda** RATE; obtener tasa de un periodo

**Para recordar** Puede requerir una estimación inicial y no siempre converge.

#### Obtener tasa de un periodo

```text
=RATE(1,0,-1000,1100)
```

**Resultado esperado** 10% aproximadamente.


### NPV e IRR

**Clave** `npv-e-irr`

**Definición** NPV descuenta flujos al final de periodos regulares; IRR estima la tasa que hace su valor presente neto cero.

**Búsqueda** NPV e IRR; calcular vpn de un proyecto

**Para recordar** En NPV suma por separado inversión inicial en tiempo cero.

#### Calcular VPN de un proyecto

```text
=-1000+NPV(0.1,1100)
```

**Resultado esperado** 0, salvo redondeo numérico.


### XNPV y XIRR

**Clave** `xnpv-y-xirr`

**Definición** Descuentan y calculan rentabilidad usando fechas explícitas para flujos irregulares.

**Búsqueda** XNPV y XIRR; calcular tir anual con fechas

**Para recordar** Incluye inversión inicial y fechas reales.

#### Calcular TIR anual con fechas

```text
=XIRR({-1000;1100},{DATE(2025,1,1);DATE(2026,1,1)})
```

**Resultado esperado** 10% aproximadamente.


### ROI y depreciación

**Clave** `roi-y-depreciacion`

**Definición** ROI relaciona ganancia con inversión; SLN distribuye depreciación lineal sobre vida útil.

**Búsqueda** ROI y depreciación; calcular depreciación anual

**Para recordar** ROI simple no ajusta por tiempo.

#### Calcular depreciación anual

```text
=SLN(1000,100,3)
```

**Resultado esperado** 300 por año.


### Sensibilidad y Goal Seek

**Clave** `sensibilidad-y-goal-seek`

**Definición** La sensibilidad compara resultados para distintos supuestos; Goal Seek busca un valor de entrada para alcanzar una meta.

**Búsqueda** Sensibilidad y Goal Seek; encontrar precio objetivo

**Para recordar** Goal Seek y Solver requieren complementos y permisos; no son fórmulas nativas.

#### Encontrar precio objetivo

En Practica B1=40 (unidades), B2=100 (precio), B3 =B1*B2; instala Goal Seek desde Marketplace si autorizado; fija B3 en 5000 cambiando B2.

**Resultado esperado** Precio objetivo 125; ingreso 5000. Sin complemento, calcula =5000/40.


## Importación y fuentes externas

**Clave** `importacion-y-fuentes-externas`


### Definición

**Clave** `definicion`

**Definición** Sheets puede importar archivos, leer hojas externas y conectar datos de servicios.

**Búsqueda** Importación y fuentes externas; importar un csv local

**Para recordar** Comprueba permisos, actualización, formatos y origen.

#### Importar un CSV local

Crea un archivo CSV con dos líneas: id,importe y 101,200; Archivo > Importar > Subir > Insertar nueva hoja.

**Resultado esperado** Dos columnas y una fila de datos 101,200.


### CSV TSV XLSX

**Clave** `csv-tsv-xlsx`

**Definición** CSV y TSV son texto delimitado; XLSX conserva estructura y fórmulas con posibles incompatibilidades.

**Búsqueda** CSV TSV XLSX; exportar una hoja

**Para recordar** Verifica separadores, codificación, fechas y fórmulas después de importar.

#### Exportar una hoja

Abre Ventas; Archivo > Descargar > Valores separados por comas (hoja actual).

**Resultado esperado** CSV con encabezados y ocho pedidos; no conserva fórmulas editables ni formato.


### IMPORTRANGE

**Clave** `importrange`

**Definición** Trae un rango de otro archivo de Sheets autorizado.

**Búsqueda** IMPORTRANGE; traer dos registros

**Para recordar** La primera conexión exige permitir acceso; evita cadenas de importaciones.

#### Traer dos registros

Crea otro archivo con una hoja Datos que tenga A1:B3: id,importe; 101,200; 102,300. En Practica escribe =IMPORTRANGE("ID_O_URL_REAL","Datos!A1:B3") sustituyendo el ID o URL y permite acceso.

**Resultado esperado** Encabezados y dos registros del archivo remoto cuando se conceda acceso.


### IMPORTDATA

**Clave** `importdata`

**Definición** Lee datos CSV o TSV de una URL accesible por Sheets.

**Búsqueda** IMPORTDATA; leer csv publicado

**Para recordar** No funciona con archivos locales ni con cualquier autenticación privada.

#### Leer CSV publicado

```text
=IMPORTDATA("https://example.com/datos.csv")
```

**Resultado esperado** Si sustituyes la URL ilustrativa por una URL pública que sirva id,importe seguido de 101,200, aparecerán esas dos filas. La URL de ejemplo no es una fuente de datos real.


### IMPORTHTML

**Clave** `importhtml`

**Definición** Extrae una tabla o lista HTML por índice.

**Búsqueda** IMPORTHTML; extraer primera tabla

**Para recordar** Las páginas renderizadas solo por JavaScript pueden no funcionar.

#### Extraer primera tabla

```text
=IMPORTHTML("https://example.com/tabla","table",1)
```

**Resultado esperado** Con una URL real accesible que contenga una tabla HTML con encabezado Producto y fila Mouse, devuelve ambas filas; la URL es ilustrativa.


### IMPORTXML

**Clave** `importxml`

**Definición** Extrae contenido HTML/XML mediante XPath.

**Búsqueda** IMPORTXML; extraer encabezados

**Para recordar** Depende de estructura y acceso al documento.

#### Extraer encabezados

```text
=IMPORTXML("https://example.com/","//h1")
```

**Resultado esperado** Si la página de ejemplo está accesible y conserva su encabezado habitual, devuelve Example Domain; el resultado externo puede cambiar.


### IMPORTFEED

**Clave** `importfeed`

**Definición** Importa elementos o metadatos de una fuente RSS o Atom.

**Búsqueda** IMPORTFEED; leer títulos de noticias

**Para recordar** La fuente debe ser accesible y compatible.

#### Leer títulos de noticias

```text
=IMPORTFEED("https://example.com/feed","items title",FALSE,3)
```

**Resultado esperado** Con una URL real RSS/Atom devuelve hasta tres títulos; el endpoint mostrado es ilustrativo.


### GOOGLEFINANCE

**Clave** `googlefinance`

**Definición** Consulta determinados datos financieros actuales o históricos.

**Búsqueda** GOOGLEFINANCE; consultar precio de referencia

**Para recordar** Cobertura y retraso varían; no sirve como fuente garantizada de cotizaciones en tiempo real.

#### Consultar precio de referencia

```text
=GOOGLEFINANCE("NASDAQ:GOOG","price")
```

**Resultado esperado** Un precio numérico en la moneda de cotización si el servicio dispone del símbolo; valor dinámico.


### Google Forms

**Clave** `google-forms`

**Definición** Puede enviar respuestas a una hoja de cálculo vinculada.

**Búsqueda** Google Forms; registrar una respuesta

**Para recordar** Mantén intacta la hoja de respuestas y analiza en otra.

#### Registrar una respuesta

Crea un formulario de prueba con pregunta Canal; en Respuestas vincula una hoja y envía web.

**Resultado esperado** Nueva fila con marca de tiempo y web.


### Connected Sheets y BigQuery

**Clave** `connected-sheets-y-bigquery`

**Definición** Permiten explorar conjuntos de datos de BigQuery desde Sheets sin importar necesariamente todas las filas.

**Búsqueda** Connected Sheets y BigQuery; analizar tabla de bigquery

**Para recordar** Requiere edición compatible, permisos de BigQuery y puede generar costos.

#### Analizar tabla de BigQuery

En un proyecto autorizado crea o usa una tabla de prueba con canal e importe; Datos > Conectores de datos > Conectar a BigQuery; selecciona tabla y crea resumen por canal.

**Resultado esperado** La hoja conectada permite calcular totales según los registros de esa tabla; la consulta se ejecuta en el servicio.


### Looker Studio

**Clave** `looker-studio`

**Definición** Consume hojas de cálculo como fuentes para reportes interactivos.

**Búsqueda** Looker Studio; conectar ventas a reporte

**Para recordar** Mantén encabezados únicos y tipos consistentes.

#### Conectar ventas a reporte

En Looker Studio crea una fuente de datos Google Sheets; selecciona archivo, hoja Ventas, rango A1:K9; añade tabla canal con SUM de importe.

**Resultado esperado** store 900 y web 1500, si se incluyen todos los estados.


## Rendimiento y cálculo

**Clave** `rendimiento-y-calculo`


### Definición

**Clave** `definicion`

**Definición** El tiempo de recálculo depende de rangos, dependencias, funciones externas y tamaño del archivo.

**Búsqueda** Rendimiento y cálculo; limitar un rango de cálculo

**Para recordar** Reduce trabajo repetido y mide el efecto.

#### Limitar un rango de cálculo

```text
=SUM(Ventas!J2:J9)
```

**Resultado esperado** 2400; evita recorrer una columna completa innecesariamente en este dataset.


### Rangos abiertos y dependencias

**Clave** `rangos-abiertos-y-dependencias`

**Definición** Referencias de columna completa pueden procesar muchas celdas; cadenas largas introducen dependencias.

**Búsqueda** Rangos abiertos y dependencias; reutilizar total

**Para recordar** Acota rangos cuando su tamaño sea conocido; considera crecimiento futuro.

#### Reutilizar total

```text
=LET(total,SUM(Ventas!J2:J9),total*0.1+total*0.05)
```

**Resultado esperado** 360; el total se define una sola vez.


### Funciones volátiles

**Clave** `funciones-volatiles`

**Definición** NOW, TODAY, RAND y RANDBETWEEN pueden recalcularse y propagar cambios.

**Búsqueda** Funciones volátiles; fijar fecha de corte

**Para recordar** Centraliza fecha de corte y evita repetir cálculos variables.

#### Fijar fecha de corte

En Practica B1 escribe =TODAY(); copia B1 y usa Pegado especial > Solo valores.

**Resultado esperado** B1 conserva la fecha obtenida hasta editarla manualmente.


### Referencias circulares

**Clave** `referencias-circulares`

**Definición** Una fórmula circular depende de sí misma directa o indirectamente.

**Búsqueda** Referencias circulares; diagnosticar un ciclo

**Para recordar** No actives cálculo iterativo para ocultar un error accidental.

#### Diagnosticar un ciclo

Con cálculo iterativo desactivado, escribe =A1+1 en Practica A1.

**Resultado esperado** Error de dependencia circular (#REF!).


### Cálculo iterativo y recálculo

**Clave** `calculo-iterativo-y-recalculo`

**Definición** La configuración permite controlar recálculo y, opcionalmente, iteración de referencias circulares.

**Búsqueda** Cálculo iterativo y recálculo; revisar configuración de cálculo

**Para recordar** Úsalo solo para modelos que requieran iteración y tengan criterio de convergencia.

#### Revisar configuración de cálculo

Archivo > Configuración > Cálculo; revisa recálculo y mantén cálculo iterativo desactivado para esta guía.

**Resultado esperado** Los ciclos accidentales se detectan como errores.


### Optimización de importaciones

**Clave** `optimizacion-de-importaciones`

**Definición** Importa rangos pequeños o resultados resumidos en origen; evita dependencias entre muchos archivos.

**Búsqueda** Optimización de importaciones; reducir una transferencia

**Para recordar** Una conexión externa puede tener latencia y límites.

#### Reducir una transferencia

En el archivo remoto del ejemplo IMPORTRANGE calcula total en D1 con =SUM(B2:B3); en el destino importa solo Datos!D1.

**Resultado esperado** Un valor 500 en lugar de toda la tabla.


## Macros y Apps Script

**Clave** `macros-y-apps-script`


### Definición

**Clave** `definicion`

**Definición** Apps Script usa JavaScript para automatizar hojas y ampliar su interfaz; las macros registran acciones repetibles.

**Búsqueda** Macros y Apps Script; abrir el editor

**Para recordar** Prueba en una copia y revisa permisos antes de ejecutar.

#### Abrir el editor

En la copia del archivo abre Extensiones > Apps Script.

**Resultado esperado** Se abre el proyecto de script asociado a la hoja.


### Macros

**Clave** `macros`

**Definición** Registran acciones de la interfaz y generan un script reutilizable.

**Búsqueda** Macros; grabar formato de encabezado

**Para recordar** Distingue referencias relativas y absolutas durante la grabación.

#### Grabar formato de encabezado

En copia de Ventas selecciona A1:K1; Extensiones > Macros > Grabar macro; aplica negrita; guarda con nombre Encabezado y ejecuta.

**Resultado esperado** Al ejecutar se aplica negrita al rango registrado según modo de referencia.


### SpreadsheetApp y rangos

**Clave** `spreadsheetapp-y-rangos`

**Definición** El servicio permite leer y escribir celdas mediante objetos de archivo, hoja y rango.

**Búsqueda** SpreadsheetApp y rangos; leer el primer importe

**Para recordar** getValues devuelve una matriz bidimensional.

#### Leer el primer importe

```javascript
function leerImporte() { const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ventas'); console.log(s.getRange('J2').getValue()); }
```

**Resultado esperado** Al ejecutar leerImporte desde editor asociado al archivo, el registro muestra 200.


### Escritura por lotes

**Clave** `escritura-por-lotes`

**Definición** setValues escribe una matriz con las mismas dimensiones que el rango; evita llamadas celda por celda.

**Búsqueda** Escritura por lotes; escribir dos kpis

**Para recordar** No sobrescribas datos de origen.

#### Escribir dos KPIs

```javascript
function escribirKPIs() { const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Practica'); s.getRange('D1:E2').setValues([['Ingresos',2000],['Pedidos',6]]); }
```

**Resultado esperado** D1:E2 contiene Ingresos,2000; Pedidos,6. Autoriza el script si se solicita.


### Funciones personalizadas

**Clave** `funciones-personalizadas`

**Definición** Una función JavaScript puede invocarse desde una celda y devolver un valor o matriz.

**Búsqueda** Funciones personalizadas; crear función de margen

**Para recordar** No debe editar arbitrariamente otras celdas; pasa rangos como argumentos para recalcular.

#### Crear función de margen

```javascript
function MARGEN_NETO(ingresos, costos) { return ingresos === 0 ? '' : (ingresos-costos)/ingresos; }
```

**Resultado esperado** Guarda el script y usa =MARGEN_NETO(2000,1140) en Practica; devuelve 0.43.


### Triggers simples

**Clave** `triggers-simples`

**Definición** Funciones como onOpen y onEdit se ejecutan ante eventos definidos y tienen restricciones de autorización.

**Búsqueda** Triggers simples; registrar edición en una hoja

**Para recordar** onEdit responde a edición de usuario, no a cambios por fórmula o API.

#### Registrar edición en una hoja

```javascript
function onEdit(e) { if(e.range.getSheet().getName()==='Practica' && e.range.getA1Notation()==='B1') e.range.getSheet().getRange('C1').setValue('Editado'); }
```

**Resultado esperado** Guarda y edita manualmente B1 en Practica; C1 muestra Editado. No ejecutes onEdit manualmente sin evento.


### Triggers instalables

**Clave** `triggers-instalables`

**Definición** Permiten programar ejecuciones o responder a eventos con la autorización del creador.

**Búsqueda** Triggers instalables; programar un reporte

**Para recordar** Controla propietario, cuotas y evita crear duplicados.

#### Programar un reporte

Guarda escribirKPIs del ejemplo de escritura; en Apps Script > Activadores añade uno basado en tiempo para esa función. En copia de prueba verifica ejecuciones y elimina el activador al terminar.

**Resultado esperado** La función se ejecuta en el intervalo configurado y actualiza D1:E2 si cuenta con autorización.


### APIs externas desde script

**Clave** `apis-externas-desde-script`

**Definición** UrlFetchApp realiza solicitudes HTTP desde Apps Script con autorización según contexto.

**Búsqueda** APIs externas desde script; comprobar respuesta http

**Para recordar** No incrustes credenciales en hojas o scripts compartidos.

#### Comprobar respuesta HTTP

```javascript
function consultar() { const r=UrlFetchApp.fetch('https://example.com/'); console.log(r.getResponseCode()); }
```

**Resultado esperado** Con acceso externo y servicio disponible, el registro muestra 200; puede variar por red o permisos.


## Google Sheets API y Python

**Clave** `google-sheets-api-y-python`


### Definición

**Clave** `definicion`

**Definición** La API permite leer o modificar archivos de Sheets desde otros programas con credenciales autorizadas.

**Búsqueda** Google Sheets API y Python; identificar archivo

**Para recordar** El ID del archivo no sustituye autenticación ni permiso de acceso.

#### Identificar archivo

Abre un archivo de prueba y copia la parte de su URL entre /d/ y /edit; úsala como spreadsheetId en una solicitud autorizada.

**Resultado esperado** Se identifica el archivo, no se concede acceso automáticamente.


### Autenticación y OAuth

**Clave** `autenticacion-y-oauth`

**Definición** OAuth delega permisos de un usuario; una cuenta de servicio actúa con su propia identidad y necesita acceso al archivo.

**Búsqueda** Autenticación y OAuth; preparar acceso de lectura

**Para recordar** Usa scopes mínimos y guarda credenciales fuera del repositorio.

#### Preparar acceso de lectura

En proyecto Google Cloud habilita Sheets API; configura OAuth según quickstart oficial con scope spreadsheets.readonly; autoriza cuenta con acceso al archivo de prueba.

**Resultado esperado** La aplicación obtiene credenciales para leer archivos permitidos; no escribir con ese scope.


### Lectura y escritura de valores

**Clave** `lectura-y-escritura-de-valores`

**Definición** values.get lee rangos; values.update y append escriben con modo RAW o USER_ENTERED.

**Búsqueda** Lectura y escritura de valores; leer dos columnas

**Para recordar** RAW no interpreta fórmulas; USER_ENTERED aplica interpretación de entrada.

#### Leer dos columnas

```python
resultado = service.spreadsheets().values().get(spreadsheetId=sheet_id, range='Productos!A2:B3').execute()
print(resultado['values'])
```

**Resultado esperado** Con service autenticado y sheet_id del archivo de esta guía: [['P1','Mouse'],['P2','Monitor']].


### Peticiones por lotes

**Clave** `peticiones-por-lotes`

**Definición** values.batchUpdate escribe múltiples rangos; spreadsheets.batchUpdate cambia estructura, formatos y otros objetos.

**Búsqueda** Peticiones por lotes; escribir un valor sin fórmula

**Para recordar** Agrupa solicitudes y revisa alcance para evitar modificaciones parciales no deseadas.

#### Escribir un valor sin fórmula

```python
service.spreadsheets().values().batchUpdate(spreadsheetId=sheet_id, body={'valueInputOption':'RAW','data':[{'range':'Practica!F1','values':[[2000]]}]}).execute()
```

**Resultado esperado** F1 contiene 2000. Requiere scope de escritura y permiso de edición.


### Cuotas y reintentos

**Clave** `cuotas-y-reintentos`

**Definición** La API limita solicitudes; ante 429 aplica espera exponencial con variación aleatoria y límite de intentos.

**Búsqueda** Cuotas y reintentos; identificar saturación

**Para recordar** No reintentes escrituras no idempotentes a ciegas.

#### Identificar saturación

En los registros de una aplicación revisa errores HTTP 429; reduce frecuencia, agrupa lecturas y usa backoff según documentación de cuotas.

**Resultado esperado** Se distingue un límite de uso de un error de permisos; no provoques tráfico excesivo para probarlo.


### gspread y pandas

**Clave** `gspread-y-pandas`

**Definición** gspread facilita acceso a Sheets y pandas permite transformar los registros en DataFrames.

**Búsqueda** gspread y pandas; leer productos con python

**Para recordar** Son bibliotecas externas; instala y configura autenticación antes de usar.

#### Leer productos con Python

```python
import gspread
import pandas as pd
gc = gspread.service_account(filename='credenciales.json')
ws = gc.open_by_key(sheet_id).worksheet('Productos')
df = pd.DataFrame(ws.get_all_records())
print(df[['id','precio']].to_string(index=False))
```

**Resultado esperado** Cuatro filas: P1 100, P2 300, P3 200, P4 500. Requiere pip install gspread pandas, credenciales válidas y archivo compartido con la cuenta de servicio.


## Gemini en Sheets

**Clave** `gemini-en-sheets`


### Definición

**Clave** `definicion`

**Definición** Gemini puede asistir en generación de fórmulas, tablas, gráficos y análisis según cuenta, región y edición.

**Búsqueda** Gemini en Sheets; pedir resumen de ventas

**Para recordar** Comprueba resultados y no expongas datos sensibles.

#### Pedir resumen de ventas

En una copia sin información sensible, abre Gemini si está disponible y solicita sumar importe por estado usando Ventas A1:K9.

**Resultado esperado** Un resumen sugerido que debe comprobarse contra 400 cancelado y 2000 completado; no se garantiza salida exacta.


### Verificación de resultados

**Clave** `verificacion-de-resultados`

**Definición** Una propuesta de IA puede contener referencias incorrectas o supuestos no declarados.

**Búsqueda** Verificación de resultados; contrastar una fórmula sugerida

**Para recordar** Valida filtros, rangos, denominadores y casos límite.

#### Contrastar una fórmula sugerida

```text
=SUMIF(Ventas!H2:H9,"completed",Ventas!J2:J9)
```

**Resultado esperado** 2000; cualquier resumen equivalente debe coincidir con este cálculo para los datos de la guía.


## Fuentes

- [Catálogo oficial de funciones de Google Sheets](https://support.google.com/docs/table/25273): sintaxis de funciones, categorías y variantes; referencia para ampliar funciones especializadas.
- [Configuración regional y de cálculo](https://support.google.com/docs/answer/58515) y [formatos numéricos](https://support.google.com/docs/answer/56470): idioma de funciones, región, recálculo y representación.
- [Ordenar y filtrar](https://support.google.com/docs/answer/3540681), [limpieza de datos](https://support.google.com/docs/answer/10098582) y [análisis de datos](https://support.google.com/docs/answer/9330962): operaciones de interfaz.
- [Tablas](https://support.google.com/docs/answer/14239833) y [referencias de tabla](https://support.google.com/docs/answer/15637642): estructura y referencias por nombre.
- [QUERY](https://support.google.com/docs/answer/3093343) y [lenguaje Google Visualization](https://developers.google.com/chart/interactive/docs/querylanguage): cláusulas, tipos, fechas y diferencias con SQL.
- [Funciones con nombre](https://support.google.com/docs/answer/12504534): definición y reutilización de fórmulas.
- [Tablas dinámicas](https://support.google.com/docs/answer/1272900), [formato condicional](https://support.google.com/docs/answer/78413) y [segmentadores](https://support.google.com/docs/answer/9245556): resúmenes, reglas visuales y filtros.
- [Protección de rangos](https://support.google.com/docs/answer/1218656) y [compartir archivos](https://support.google.com/drive/answer/2494822): permisos y límites de protección.
- [Goal Seek](https://support.google.com/docs/answer/9506732): complemento y búsqueda de valor objetivo.
- [IMPORTRANGE](https://support.google.com/docs/answer/3093340), [ingestión de datos](https://support.google.com/docs/answer/12236443), [Connected Sheets](https://support.google.com/docs/answer/9703214) y [conector de Sheets para Looker Studio](https://cloud.google.com/looker/docs/studio/connect-to-google-sheets): fuentes externas.
- [Rendimiento de Sheets](https://support.google.com/docs/answer/11468464) y [optimizar referencias](https://support.google.com/docs/answer/12159115): rangos, dependencias y cálculos.
- [Apps Script para Sheets](https://developers.google.com/apps-script/guides/sheets), [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet), [funciones personalizadas](https://developers.google.com/apps-script/guides/sheets/functions), [activadores simples](https://developers.google.com/apps-script/guides/triggers), [activadores instalables](https://developers.google.com/apps-script/guides/triggers/installable) y [buenas prácticas](https://developers.google.com/apps-script/guides/support/best-practices): automatización.
- [Sheets API quickstart de Python](https://developers.google.com/workspace/sheets/api/quickstart/python), [referencia REST](https://developers.google.com/workspace/sheets/api/reference/rest), [values.batchUpdate](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate) y [cuotas](https://developers.google.com/workspace/sheets/api/limits): autenticación, operaciones y límites.
- [gspread](https://docs.gspread.org/en/latest/) y [pandas](https://pandas.pydata.org/docs/): bibliotecas externas de Python.
- [Gemini en Google Sheets](https://support.google.com/docs/answer/14356410): asistencia y disponibilidad según cuenta.
