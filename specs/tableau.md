# Tableau

**Clave** `tableau`

**Área** Análisis de datos (ubicación propuesta en AllDoc)

**Resumen** Conecta, explora y visualiza datos mediante hojas, cálculos y dashboards interactivos.

**Alcance** Preparación para Data Analyst / Business Analyst Jr: Tableau Desktop, modelado, visualización, cálculos, análisis de negocio, publicación y fundamentos de Tableau Prep. Incluye temas complementarios de gobierno, rendimiento e integración; no es un inventario de todas las funciones ni de administración de servidores.

**Entorno** Tableau Desktop 2024.2 o posterior, interfaz en inglés (los nombres de funciones se mantienen en inglés). Tableau Public permite practicar buena parte del análisis con archivos locales; no presupone acceso a conectores empresariales, Server, Cloud o Prep. Los ejemplos de publicación requieren acceso y permisos; los de Prep requieren Tableau Prep Builder o edición de flujos habilitada. Los resultados son esperados, no ejecutados en Tableau.

## Datos compartidos

Dataset sintético de comercio, independiente de Sample Superstore y de los datos SQL de AllDoc. Copia cada bloque CSV a un archivo UTF-8 con el nombre indicado, o a una hoja homónima de un Excel (primera fila = encabezados). Los importes están en una misma moneda sin impuestos.

**ventas.csv** — una fila por línea de pedido. Un pedido puede tener varias líneas; `Pedido` no es una clave única, `Linea` sí. `Ventas` y `Costo` son importes de línea, no precios unitarios. `Fecha` y `Entrega` son fechas; `ClienteID` y `Pedido` son identificadores (dimensiones), `Unidades`, `Ventas` y `Costo` son medidas. El campo vacío de `Canal` es nulo.

```csv
Linea,Pedido,ClienteID,Fecha,Entrega,Region,Categoria,Producto,Canal,Estado,Unidades,Ventas,Costo
1,P01,C01,2025-01-05,2025-01-08,Norte,Tecnologia,Mouse,Web,Completado,2,100,60
2,P01,C01,2025-01-05,2025-01-08,Norte,Tecnologia,Teclado,Web,Completado,1,200,120
3,P02,C02,2025-01-12,2025-01-16,Sur,Hogar,Silla,Tienda,Completado,1,300,210
4,P03,C01,2025-02-03,2025-02-05,Norte,Hogar,Lampara,Web,Completado,2,200,100
5,P04,C03,2025-02-11,2025-02-14,Sur,Tecnologia,Mouse,,Cancelado,1,50,30
6,P05,C02,2025-03-02,2025-03-07,Sur,Hogar,Silla,Tienda,Completado,2,600,420
7,P06,C04,2025-03-10,2025-03-12,Norte,Tecnologia,Teclado,Web,Completado,1,200,120
8,P07,C03,2025-03-15,2025-03-18,Sur,Hogar,Lampara,Web,Completado,1,100,50
```

**clientes.csv** — una fila por cliente; C05 no tiene pedidos. `Pais` usa nombres en inglés reconocibles por el geocodificador.

```csv
ClienteID,Nombre,Pais,Alta
C01,Ana,Mexico,2024-12-01
C02,Luis,Mexico,2024-12-15
C03,Marta,Spain,2025-01-01
C04,John,United States,2025-02-01
C05,Elena,Spain,2025-02-10
```

**metas.csv** — una fila por región y mes. `Mes` es el primer día del mes.

```csv
Region,Mes,Meta
Norte,2025-01-01,250
Sur,2025-01-01,350
Norte,2025-02-01,250
Sur,2025-02-01,100
Norte,2025-03-01,200
Sur,2025-03-01,650
```

**leads.csv** — datos sin limpiar, una fila por registro recibido.

```csv
LeadID,Email,Origen,Enero,Febrero
L01,ana@example.com,Web,2,3
L02,ana@example.com,web,2,3
L03,luis@example.com, Tienda ,1,4
L04,,Web,0,2
```

**Preparación y convenciones de práctica**

- Conecta `ventas.csv` con **Connect > Text File**. Comprueba los tipos en Data Source; convierte `Linea` a dimensión para usarlo como identificador. En cada ejemplo empieza con una hoja nueva sin filtros, salvo que se indique lo contrario. Los demás archivos se conectan solo cuando se mencionan. No uses una unión física previa para los ejemplos de una sola tabla.
- Para los ejemplos de fórmulas: **Analysis > Create Calculated Field**, escribe la expresión y confirma. Si el ejemplo indica una línea, coloca `Linea` como dimensión discreta en Rows, el cálculo en Text (Marks) y consulta la línea indicada; si es un agregado sin dimensiones, colócalo directamente en Text. Si indica una vista por región, mes, producto u otra dimensión, coloca esa dimensión en Rows y el cálculo en Text, salvo instrucciones específicas. Para cálculos de tabla configura el direccionamiento indicado. Los agregados calculados se muestran como `AGG` cuando corresponde.
- En los ejemplos, `Mes venta` es el campo calculado `DATETRUNC('month', [Fecha])`, `Beneficio` es `[Ventas]-[Costo]`, y `Margen` es `SUM([Beneficio])/SUM([Ventas])` (formato Percentage). Crea estos campos cuando aparezcan por primera vez. Para datos completados filtra `Estado = Completado` salvo si la fórmula ya lo hace.
- Totales de control sin filtros: 8 líneas, 7 pedidos distintos, 4 clientes compradores, ventas 1750, costo 1110, beneficio 640, 11 unidades. Norte 700, Sur 1050. Enero 600, febrero 250, marzo 900. Completados: 7 líneas, 6 pedidos, ventas 1700. Los resultados no implican orden de filas salvo que se indique. Las hojas con relaciones o joins deben construirse en fuentes separadas para no alterar estos controles.

## Entorno de trabajo

**Clave** `entorno-de-trabajo`

### Definición

**Clave** `definicion`

**Definición** Un workbook contiene hojas de análisis, dashboards e historias. El espacio de trabajo permite conectar datos y construir vistas arrastrando campos.

**Búsqueda** workbook, interfaz, hoja, dónde empezar

**Para recordar** Una worksheet construye una vista; un dashboard reúne vistas.

#### Abrir una hoja

Conecta ventas.csv y pulsa Sheet 1. Arrastra Ventas a Text.

**Resultado esperado** Una marca con SUM(Ventas) = 1750.

### Data Source

**Clave** `data-source`

**Definición** La pestaña Data Source muestra conexiones, modelo y vista previa de registros.

**Búsqueda** fuente, preview, columnas, conexión

**Para recordar** Comprueba campos antes de crear gráficos.

#### Inspeccionar ventas

Abre Data Source y revisa Linea, Fecha y Ventas.

**Resultado esperado** Ocho registros; Fecha tiene tipo fecha y Ventas es numérico.

### Rows y Columns

**Clave** `rows-y-columns`

**Definición** Los estantes determinan la estructura de la vista: filas y columnas, encabezados o ejes.

**Búsqueda** estantes, shelves, eje, filas

**Para recordar** Arrastrar un campo cambia la organización de las marcas.

#### Crear una vista regional

Pon Region en Rows y Ventas en Columns.

**Resultado esperado** Dos barras horizontales: Norte 700 y Sur 1050.

### Marks card

**Clave** `marks-card`

**Definición** Controla tipo de marca y codificaciones visuales: Color, Size, Label/Text, Detail, Tooltip y Shape cuando aplica.

**Búsqueda** tarjeta marcas, color, etiqueta, detalle

**Para recordar** Detail cambia el nivel de detalle sin exigir un eje nuevo.

#### Separar marcas por categoría

En la vista regional, arrastra Categoria a Color y activa Stack Marks si es necesario.

**Resultado esperado** Cada barra regional se subdivide por categoría.

### Show Me

**Clave** `show-me`

**Definición** Sugiere visualizaciones compatibles con los campos seleccionados.

**Búsqueda** gráficos sugeridos, show me

**Para recordar** Es un punto de partida, no decide qué pregunta responde el gráfico.

#### Crear barras sugeridas

Selecciona Region y Ventas con Ctrl/Cmd y elige barras en Show Me.

**Resultado esperado** Una vista que compara las dos regiones.

### Analytics pane

**Clave** `analytics-pane`

**Definición** Permite añadir referencias, distribuciones y modelos a una vista.

**Búsqueda** panel análisis, promedio, tendencia

**Para recordar** Analytics añade contexto a marcas existentes.

#### Comparar con promedio regional

Con Region en Rows y Ventas en Columns, arrastra Average Line a Table.

**Resultado esperado** Línea de referencia en 875.

## Conexiones

**Clave** `conexiones`

### Definición

**Clave** `definicion`

**Definición** Una fuente de datos conecta Tableau con archivos, bases o fuentes publicadas; puede consultar en vivo o usar una extracción.

**Búsqueda** conectar datos, live, extract

**Para recordar** La conexión determina disponibilidad y actualización de datos.

#### Conectar CSV

1. Connect > Text File > ventas.csv
2. abre una hoja.

**Resultado esperado** Se pueden consultar las 13 columnas del archivo.

### Excel y archivos de texto

**Clave** `excel-y-texto`

**Definición** Los archivos locales permiten analizar hojas y CSV; la primera fila suele representar encabezados.

**Búsqueda** xlsx, csv, text file, Excel

**Para recordar** Verifica tipos, delimitadores y encabezados.

#### Conectar una hoja

1. Guarda el CSV como hoja Ventas de un Excel
2. Connect > Microsoft Excel
3. arrastra Ventas al lienzo.

**Resultado esperado** Ocho líneas, total 1750.

### Bases de datos y Custom SQL

**Clave** `bases-de-datos-y-custom-sql`

**Definición** Un conector SQL consulta tablas o una consulta personalizada del motor remoto.

**Búsqueda** MySQL, PostgreSQL, SQL Server, custom SQL

**Para recordar** Usa el dialecto del motor, no fórmulas de Tableau, dentro de Custom SQL.

**Nota** Requiere conector compatible, tabla cargada y permisos; Tableau puede envolver la consulta.

#### Leer solo pedidos completados

1. Si cargaste ventas en una tabla SQL, conecta al servidor con el driver y credenciales
2. elige New Custom SQL. Fórmula SQL: SELECT * FROM ventas WHERE Estado = 'Completado'

**Resultado esperado** Siete líneas, ventas 1700.

### Live

**Clave** `live`

**Definición** Una conexión Live consulta la fuente cuando Tableau necesita datos, sujeta a caché y disponibilidad.

**Búsqueda** conexión directa, datos en vivo

**Para recordar** Live no garantiza actualización instantánea de cada pantalla.

#### Consultar fuente SQL

1. En la fuente SQL anterior selecciona Live
2. cambia una fila en un entorno de prueba y refresca la vista.

**Resultado esperado** Tras refrescar, se refleja el cambio confirmado en el servidor.

### Extract

**Clave** `extract`

**Definición** Una extracción es una copia de datos optimizada para consultar con Hyper.

**Búsqueda** hyper, extracción, offline

**Para recordar** Un extract no incorpora automáticamente cambios de origen.

#### Crear extracción

En Data Source elige Extract, abre una hoja y guarda el .hyper cuando lo solicite.

**Resultado esperado** La suma de ventas sigue siendo 1750; el archivo de extracción existe localmente.

### Refresh de datos

**Clave** `refresh-de-datos`

**Definición** Actualiza la conexión o vuelve a construir una extracción con datos de origen.

**Búsqueda** refresh, full refresh, incremental

**Para recordar** Full reemplaza los datos; incremental incorpora datos según su configuración y no equivale a detectar toda modificación.

**Nota** Usa una copia; el incremental depende de conector, versión y clave o rango configurado.

#### Actualizar extract

Crea una copia de ventas.csv, extrae sus datos, añade una línea válida de ventas 50 y ejecuta un full refresh.

**Resultado esperado** Ventas pasan de 1750 a 1800.

## Data pane y campos

**Clave** `campos`

### Definición

**Clave** `definicion`

**Definición** El Data pane organiza campos y permite modificar su rol, tipo y propiedades sin modificar necesariamente el archivo de origen.

**Búsqueda** data pane, dimensión, medida, campos

**Para recordar** Rol analítico, tipo de dato y discreto/continuo son decisiones diferentes.

#### Inspeccionar roles

Abre ventas y localiza Region y Ventas.

**Resultado esperado** Region actúa como dimensión; Ventas como medida.

### Tipos de datos

**Clave** `tipos-de-datos`

**Definición** String, Number, Date, Date & Time, Boolean y roles geográficos determinan operaciones disponibles.

**Búsqueda** tipo de dato, fecha, número, booleano

**Para recordar** Un número que identifica una entidad puede ser una dimensión.

#### Cambiar tipo

En Data Source cambia Fecha a Date si se detectó como texto.

**Resultado esperado** Fecha permite elegir años, meses y días.

### Dimensions y Measures

**Clave** `dimensions-y-measures`

**Definición** Una dimensión separa las marcas en grupos; una medida representa valores que suelen agregarse.

**Búsqueda** dimension, measure, agrupación

**Para recordar** ClienteID identifica; Ventas se suma.

#### Agrupar ventas

Arrastra Region a Rows y Ventas a Text.

**Resultado esperado** Norte 700; Sur 1050.

### Discrete y Continuous

**Clave** `discrete-y-continuous`

**Definición** Los campos discretos (azules) crean encabezados; los continuos (verdes) crean ejes.

**Búsqueda** azul, verde, discreto, continuo

**Para recordar** Azul no significa necesariamente dimensión.

#### Cambiar una fecha

1. Pon Fecha en Columns y selecciona Month discreto
2. después Month continuo (date value).

**Resultado esperado** Primero encabezados de mes; después eje temporal.

### Measure Names y Measure Values

**Clave** `measure-names-y-values`

**Definición** Campos generados que permiten mostrar varias medidas en una misma vista.

**Búsqueda** nombres de medidas, valores, múltiples KPIs

**Para recordar** Measure Names identifica la medida y Measure Values contiene sus valores.

#### Comparar ventas y costo

1. Region en Rows, Measure Names en Columns, Measure Values en Text
2. filtra Measure Names a Ventas y Costo.

**Resultado esperado** Norte: 700 y 400; Sur: 1050 y 710.

### Count de tabla

**Clave** `count-de-tabla`

**Definición** Desde el modelo lógico de 2020.2, cada tabla tiene un campo generado de conteo de registros.

**Búsqueda** Number of Records, ventas Count, conteo filas

**Para recordar** Contar líneas no equivale a contar pedidos.

**Nota** Number of Records corresponde a modelos antiguos; no uses el campo Count generado dentro de otro cálculo.

#### Contar registros

Arrastra ventas(Count) a Text, en una fuente con ventas como única tabla.

**Resultado esperado** 8 registros.

### Alias y propiedades

**Clave** `alias-y-propiedades`

**Definición** Los alias cambian etiquetas de miembros discretos; las propiedades predeterminadas controlan formato y agregación inicial.

**Búsqueda** alias, formato moneda, default properties

**Para recordar** Cambiar etiqueta no cambia el valor original.

#### Renombrar etiqueta

1. Clic derecho Region > Aliases y asigna Norte a Zona Norte
2. crea una tabla regional.

**Resultado esperado** Aparece Zona Norte con ventas 700.

### Carpetas y campos ocultos

**Clave** `carpetas-y-campos-ocultos`

**Definición** Organizan el panel y reducen campos visibles; ocultar no es una medida de seguridad.

**Búsqueda** folders, hide, organizar campos

**Para recordar** Ocultar un campo no protege sus datos.

#### Organizar campos

1. Crea carpeta Métricas y coloca Ventas y Costo
2. oculta Entrega si no se usa en la hoja.

**Resultado esperado** El panel queda organizado; las ventas no cambian.

## Modelo de datos

**Clave** `modelo-de-datos`

### Definición

**Clave** `definicion`

**Definición** El modelo define cómo se combinan entidades y qué granularidad tiene cada una. Tableau distingue relaciones lógicas de joins físicos.

**Búsqueda** modelo, grain, relaciones, fact, dimension

**Para recordar** Antes de combinar, identifica qué representa cada fila.

#### Relacionar ventas y clientes

1. En Data Source añade conexión a clientes.csv y arrastra clientes junto a ventas en el lienzo lógico
2. edita relación ClienteID = ClienteID.

**Resultado esperado** Dos tablas lógicas relacionadas por el identificador.

### Granularidad

**Clave** `granularidad`

**Definición** El nivel de detalle de una tabla indica qué representa cada registro.

**Búsqueda** grain, granularidad, duplicación

**Para recordar** Pedido puede repetirse; Linea es única.

#### Comparar líneas y pedidos

En ventas, crea COUNT([Linea]) y COUNTD([Pedido]) y muestra ambos.

**Resultado esperado** 8 líneas y 7 pedidos.

### Relationships

**Clave** `relationships`

**Definición** Una relación mantiene tablas lógicas separadas; Tableau determina las combinaciones requeridas por la vista.

**Búsqueda** relación, noodle, logical layer

**Para recordar** No crea de antemano una tabla física plana.

#### Ventas por país

1. Relaciona ventas con clientes
2. coloca Pais en Rows y SUM(Ventas) en Text.

**Resultado esperado** Mexico 1400; Spain 150; United States 200.

### Cardinalidad e integridad

**Clave** `cardinalidad-e-integridad`

**Definición** Cardinalidad describe cuántas filas pueden corresponder a una clave; integridad referencial indica si hay coincidencias garantizadas.

**Búsqueda** uno a muchos, muchos a muchos, referential integrity

**Para recordar** No declares All records match sin comprobarlo.

#### Configurar relación

1. En Edit Relationship > Performance Options, ventas Many, clientes One
2. conserva Some records match si no has validado ambos lados.

**Resultado esperado** La configuración expresa 1:N; C05 no tiene venta.

### Capas lógica y física

**Clave** `capas-logica-y-fisica`

**Definición** El lienzo lógico usa relaciones; abrir una tabla lógica revela su capa física de joins y unions.

**Búsqueda** logical layer, physical layer, doble clic

**Para recordar** Las relaciones y joins no son intercambiables.

#### Abrir capa física

En Data Source haz doble clic sobre ventas.

**Resultado esperado** Se abre un lienzo donde se pueden añadir tablas físicas.

### Joins

**Clave** `joins`

**Definición** Un join combina columnas de filas compatibles mediante claves y un tipo explícito de unión.

**Búsqueda** inner join, left join, right join, full outer join

**Para recordar** Un join puede repetir filas o excluir registros.

#### Conservar todos los clientes

En una nueva fuente coloca clientes como tabla física izquierda y ventas como derecha, Left Join por ClienteID.

**Resultado esperado** 9 filas físicas: 8 líneas de venta y una fila sin venta para C05.

### Tipos de join

**Clave** `tipos-de-join`

**Definición** Inner conserva coincidencias; Left/Right conservan también el lado correspondiente; Full conserva ambos.

**Búsqueda** inner, left, right, full outer

**Para recordar** El lado se determina por la posición de las tablas.

**Nota** Full outer depende del conector.

#### Comparar inner con left

1. Usa el join anterior
2. cambia de Left a Inner y revisa la vista previa.

**Resultado esperado** Pasa de 9 a 8 filas; desaparece C05.

### Duplicación por join

**Clave** `duplicacion-por-join`

**Definición** Un join a una tabla con varias filas por clave puede multiplicar valores agregados.

**Búsqueda** fanout, duplicados, total inflado

**Para recordar** No sumes medidas repetidas de una tabla de mayor granularidad.

**Nota** Conserva fuentes separadas o preagrega; verifica claves y tipos.

#### Detectar metas repetidas

1. Une ventas a metas por Region y mes de Fecha (crear cálculo de join con DATETRUNC si se admite)
2. suma Meta.

**Resultado esperado** La suma física es 2700, no la meta original 1800, porque se repite en líneas del mismo mes y región.

### Union

**Clave** `union`

**Definición** Una unión apila filas de tablas compatibles, en lugar de añadir columnas.

**Búsqueda** append, wildcard union, apilar CSV

**Para recordar** Homologa nombres y tipos de columnas.

#### Apilar meses

1. Divide ventas.csv en dos CSV, enero-febrero y marzo, misma estructura
2. usa New Union con ambos, si el conector lo admite.

**Resultado esperado** 8 filas, ventas 1750; no se eliminan duplicados automáticamente.

### Data blending

**Clave** `data-blending`

**Definición** Combina resultados agregados de fuentes independientes mediante campos de enlace en una hoja.

**Búsqueda** blend, primary, secondary, linking field

**Para recordar** La fuente primaria define la base de la vista.

**Nota** Verifica enlace activo; no confundir con join físico.

#### Comparar metas regionales

1. Conecta ventas y metas como fuentes distintas
2. usa Region de ventas en Rows y activa enlace Region con metas
3. agrega SUM(Ventas) y SUM(Meta) secundaria.

**Resultado esperado** Norte 700 frente a 700; Sur 1050 frente a 1100.

### Multi-fact relationships

**Clave** `multi-fact-relationships`

**Definición** Desde 2024.2, el modelo permite varias tablas base de hechos conectadas por dimensiones compartidas.

**Búsqueda** multi fact, shared dimensions, metas y ventas

**Para recordar** Relaciona hechos mediante dimensiones comunes, no mediante una clave no única directa.

**Nota** Requiere versión 2024.2+ y fuente compatible; configura el modelo según la documentación.

#### Comparar hechos mensuales

1. Crea dimensión de Region y Mes con las seis claves únicas de metas
2. configura ventas y metas como tablas base y relaciónalas con dicha dimensión por región y mes.

**Resultado esperado** Las seis combinaciones se pueden comparar sin sumar metas repetidas. Por ejemplo, Norte enero: ventas 300 y meta 250.

## Campos calculados

**Clave** `campos-calculados`

### Definición

**Clave** `definicion`

**Definición** Un campo calculado deriva valores mediante una expresión que utiliza campos, constantes y funciones.

**Búsqueda** calculated field, fórmula, crear campo

**Para recordar** Usa corchetes para campos y comillas para textos.

#### Calcular beneficio

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
[Ventas]-[Costo]
```

**Resultado esperado** Linea 1: 40; suma de todas las líneas: 640.

### Cálculo por fila y agregado

**Clave** `calculo-por-fila-y-agregado`

**Definición** Un cálculo por fila trabaja sobre registros; uno agregado trabaja sobre los valores agrupados en la vista.

**Búsqueda** row level, aggregate, AGG

**Para recordar** El nivel de cálculo cambia el resultado.

#### Calcular margen global

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
SUM([Ventas]-[Costo])/SUM([Ventas])
```

**Resultado esperado** 36.57% con formato Percentage.

### Operadores

**Clave** `operadores`

**Definición** Permiten aritmética, comparación y lógica con AND, OR y NOT.

**Búsqueda** operadores, booleano, precedencia

**Para recordar** Usa paréntesis para fijar la precedencia.

#### Identificar compras grandes

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
[Ventas]>=200 AND [Estado]='Completado'
```

**Resultado esperado** Linea 2: True; linea 5: False.

### Mezcla de agregados

**Clave** `mezcla-de-agregados`

**Definición** Tableau rechaza expresiones que mezclan componentes agregados y no agregados en el mismo nivel cuando no son compatibles.

**Búsqueda** cannot mix aggregate and non-aggregate, error AGG

**Para recordar** Agrega ambos lados o trabaja por fila.

#### Corregir un margen

1. Intenta SUM([Ventas])/[Costo]
2. después reemplaza por SUM([Ventas])/SUM([Costo]).

**Resultado esperado** Primera fórmula inválida; segunda ≈1.5766 sin filtros.

### Conversión de tipos

**Clave** `conversion-de-tipos`

**Definición** STR, INT, FLOAT, DATE y DATETIME convierten valores entre tipos compatibles.

**Búsqueda** cast, string, int, float, date

**Para recordar** Formatear no es convertir.

#### Convertir identificador en texto

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
'L-'+STR([Linea])
```

**Resultado esperado** Linea 1: L-1.

## Agregaciones

**Clave** `agregaciones`

### Definición

**Clave** `definicion`

**Definición** Una agregación resume las filas en cada marca de la vista. La dimensión presente determina el grupo.

**Búsqueda** sum, aggregate, group by

**Para recordar** Sin dimensiones se obtiene normalmente una marca agregada.

#### Sumar ventas

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
SUM([Ventas])
```

**Resultado esperado** 1750.

### SUM y AVG

**Clave** `sum-y-avg`

**Definición** SUM suma valores y AVG obtiene la media aritmética de valores no nulos.

**Búsqueda** total, media, promedio

**Para recordar** AVG de líneas no es el ticket promedio por pedido.

#### Promedio de línea

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
AVG([Ventas])
```

**Resultado esperado** 218.75.

### COUNT y COUNTD

**Clave** `count-y-countd`

**Definición** COUNT cuenta valores no nulos; COUNTD cuenta valores distintos no nulos.

**Búsqueda** conteo, clientes únicos, distinct

**Para recordar** Para pedidos usa COUNTD si hay varias líneas por pedido.

#### Contar pedidos

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
COUNTD([Pedido])
```

**Resultado esperado** 7; COUNT([Pedido]) devuelve 8.

### MIN y MAX

**Clave** `min-y-max`

**Definición** Devuelven el valor menor o mayor de un conjunto.

**Búsqueda** mínimo, máximo, extrema

**Para recordar** Se pueden aplicar a números y fechas.

#### Obtener máximos regionales

1. Region en Rows
2. fórmula MAX([Ventas]) en Text.

**Resultado esperado** Norte 200, Sur 600.

### MEDIAN y dispersión

**Clave** `median-y-dispersion`

**Definición** MEDIAN devuelve la mediana; STDEV y VAR estiman dispersión muestral, con variantes poblacionales.

**Búsqueda** mediana, desviación estándar, varianza

**Para recordar** La mediana es menos sensible a valores extremos que AVG.

**Nota** Disponibilidad según conector; usa extract si la función no está soportada.

#### Mediana de ventas

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
MEDIAN([Ventas])
```

**Resultado esperado** 200.

### ATTR

**Clave** `attr`

**Definición** Devuelve un único valor si los valores no nulos de la marca coinciden; muestra asterisco si difieren.

**Búsqueda** atributo, asterisco, valor único

**Para recordar** El asterisco no significa NULL.

#### Comprobar categorías

Coloca Region en Rows y ATTR([Categoria]) en Text.

**Resultado esperado** Norte y Sur muestran * porque cada región contiene más de una categoría.

### Desagregar medidas

**Clave** `desagregar-medidas`

**Definición** Analysis > Aggregate Measures controla si se agregan las medidas en la vista.

**Búsqueda** aggregate measures, registros individuales

**Para recordar** Desagregar permite inspeccionar puntos individuales.

#### Ver pares de valores por línea

Pon Ventas en Columns, Costo en Rows y desmarca Analysis > Aggregate Measures.

**Resultado esperado** Ocho marcas de datos, aunque algunos puntos se superponen.

## Nulos y lógica

**Clave** `nulos-y-logica`

### Definición

**Clave** `definicion`

**Definición** Las funciones lógicas permiten clasificar registros, tratar faltantes y crear indicadores.

**Búsqueda** null, if, case, booleano

**Para recordar** Un valor ausente no equivale a cero.

#### Identificar canal faltante

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
ISNULL([Canal])
```

**Resultado esperado** Linea 5: True.

### IF y ELSEIF

**Clave** `if-y-elseif`

**Definición** Evalúan condiciones en orden; ELSE define la alternativa cuando ninguna se cumple.

**Búsqueda** if then else, segmentos

**Para recordar** La primera condición verdadera determina la salida.

#### Clasificar importes

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
IF [Ventas]>=300 THEN 'Alto' ELSEIF [Ventas]>=100 THEN 'Medio' ELSE 'Bajo' END
```

**Resultado esperado** Linea 6 Alto; linea 1 Medio; linea 5 Bajo.

### CASE

**Clave** `case`

**Definición** Compara una expresión con valores concretos mediante WHEN y THEN.

**Búsqueda** case when, categorías

**Para recordar** Usa IF cuando necesites desigualdades.

#### Etiquetar canales

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
CASE [Canal] WHEN 'Web' THEN 'Digital' WHEN 'Tienda' THEN 'Fisico' ELSE 'Otro' END
```

**Resultado esperado** Linea 1 Digital; linea 3 Fisico; linea 5 Otro.

### IFNULL y ZN

**Clave** `ifnull-y-zn`

**Definición** IFNULL sustituye un nulo por un valor compatible; ZN devuelve cero si un número es nulo.

**Búsqueda** ifnull, zn, reemplazar null

**Para recordar** ZN no genera filas inexistentes.

#### Rellenar canal

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
IFNULL([Canal],'Sin canal')
```

**Resultado esperado** Linea 5: Sin canal.

### IIF

**Clave** `iif`

**Definición** IIF elige una expresión para verdadero, falso y opcionalmente desconocido.

**Búsqueda** iif, ternario

**Para recordar** La condición nula no es necesariamente falsa.

#### Crear indicador

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
IIF([Estado]='Completado',1,0)
```

**Resultado esperado** Linea 1: 1; linea 5: 0.

## Funciones de texto

**Clave** `funciones-de-texto`

### Definición

**Clave** `definicion`

**Definición** Las funciones de texto limpian, extraen y combinan cadenas para analizarlas o etiquetarlas.

**Búsqueda** string, limpiar texto, extraer caracteres

**Para recordar** Las funciones modifican el resultado del cálculo, no el CSV.

#### Normalizar categoría

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
UPPER([Categoria])
```

**Resultado esperado** Linea 1: TECNOLOGIA.

### UPPER, LOWER y TRIM

**Clave** `upper-lower-y-trim`

**Definición** Cambian mayúsculas/minúsculas o eliminan espacios de extremos.

**Búsqueda** normalizar, espacios, casing

**Para recordar** TRIM no elimina espacios internos.

#### Limpiar origen

1. Conecta leads.csv
2. crea LOWER(TRIM([Origen]))
3. muestra por LeadID.

**Resultado esperado** L01 y L02: web; L03: tienda.

### LEFT, RIGHT y MID

**Clave** `left-right-y-mid`

**Definición** Extraen caracteres del inicio, final o una posición; MID comienza a contar en 1.

**Búsqueda** subcadena, substring, prefijo

**Para recordar** La longitud se mide en caracteres.

#### Extraer número de pedido

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
RIGHT([Pedido],2)
```

**Resultado esperado** Linea 1: 01.

### CONTAINS, STARTSWITH y ENDSWITH

**Clave** `contains-startswith-y-endswith`

**Definición** Comprueban si un texto contiene, empieza o termina con un patrón.

**Búsqueda** buscar texto, contains

**Para recordar** Devuelven booleanos; normaliza el caso si importa.

#### Detectar producto

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
CONTAINS(LOWER([Producto]),'tec')
```

**Resultado esperado** Linea 2: True; linea 1: False.

### SPLIT y REPLACE

**Clave** `split-y-replace`

**Definición** SPLIT separa un token por delimitador; REPLACE sustituye coincidencias de texto.

**Búsqueda** split, replace, delimitador

**Para recordar** SPLIT depende del conector y posición.

**Nota** Si SPLIT no está disponible usa un extract compatible.

#### Extraer dominio

En leads.csv crea SPLIT([Email],'@',2) y muestra por LeadID.

**Resultado esperado** L01: example.com; L04: NULL.

### LEN y concatenación

**Clave** `len-y-concatenacion`

**Definición** LEN cuenta caracteres; + concatena cadenas en Tableau.

**Búsqueda** longitud, concatenar, etiqueta

**Para recordar** Convierte números a texto con STR antes de concatenar.

#### Crear etiqueta

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
[Pedido]+'-'+STR([Linea])
```

**Resultado esperado** Linea 1: P01-1.

## Funciones numéricas

**Clave** `funciones-numericas`

### Definición

**Clave** `definicion`

**Definición** Transforman valores numéricos para redondear, calcular magnitudes y construir métricas.

**Búsqueda** round, abs, operaciones

**Para recordar** No confundas redondear con mostrar menos decimales.

#### Calcular margen redondeado

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
ROUND(SUM([Ventas]-[Costo])/SUM([Ventas]),4)
```

**Resultado esperado** 0.3657.

### ROUND, CEILING y FLOOR

**Clave** `round-ceiling-y-floor`

**Definición** ROUND redondea a cierta precisión; CEILING y FLOOR aproximan hacia arriba y abajo respectivamente.

**Búsqueda** redondear, techo, piso

**Para recordar** CEILING y FLOOR dependen del soporte del conector.

#### Redondear un valor

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
ROUND([Ventas]/3,2)
```

**Resultado esperado** Linea 1: 33.33.

### ABS y división protegida

**Clave** `abs-y-division-protegida`

**Definición** ABS elimina el signo; una división debe tratar explícitamente un denominador cero.

**Búsqueda** valor absoluto, división por cero, ratio

**Para recordar** Devuelve NULL si la tasa no está definida.

#### Calcular margen seguro

Crea un campo calculado con esta expresión y muéstralo en Text (Marks):

```text
IF SUM([Ventas])<>0 THEN SUM([Ventas]-[Costo])/SUM([Ventas]) END
```

**Resultado esperado** 0.365714...; si el denominador fuera cero, NULL.

## Fechas

**Clave** `fechas`

### Definición

**Clave** `definicion`

**Definición** Las fechas permiten agrupar eventos en periodos, comparar tiempos y construir series cronológicas.

**Búsqueda** date, datetime, calendario

**Para recordar** Mes como parte de fecha mezcla años; mes como valor conserva el año.

#### Obtener mes de una línea

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
DATETRUNC('month',[Fecha])
```

**Resultado esperado** Linea 1: 2025-01-01.

### Date parts y date values

**Clave** `date-parts-y-date-values`

**Definición** Una parte de fecha extrae componentes; un valor truncado representa un periodo concreto.

**Búsqueda** mes azul, mes verde, date part

**Para recordar** Usa año-mes para series de varios años.

#### Construir serie mensual

Fecha en Columns como Month continuo y SUM(Ventas) en Rows.

**Resultado esperado** Enero 600, febrero 250, marzo 900.

### DATEPART y DATENAME

**Clave** `datepart-y-datename`

**Definición** DATEPART devuelve una parte numérica; DATENAME devuelve su nombre textual.

**Búsqueda** extraer año, mes, trimestre

**Para recordar** Ordena por número o fecha, no por nombre alfabético.

#### Extraer número de mes

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
DATEPART('month',[Fecha])
```

**Resultado esperado** Linea 6: 3.

### DATETRUNC

**Clave** `datetrunc`

**Definición** Lleva la fecha al inicio del periodo elegido.

**Búsqueda** truncar fecha, mes, trimestre

**Para recordar** Mantiene el año al truncar a mes.

#### Agrupar por mes

1. Crea Mes venta y úsalo en Rows como fecha exacta discreta
2. Ventas en Text.

**Resultado esperado** 2025-01-01: 600; 2025-02-01: 250; 2025-03-01: 900.

### DATEDIFF y DATEADD

**Clave** `datediff-y-dateadd`

**Definición** DATEDIFF calcula diferencias en unidades de fecha; DATEADD desplaza fechas.

**Búsqueda** días entre fechas, sumar mes

**Para recordar** DATEDIFF cuenta cambios de unidad, no necesariamente duración exacta en segundos.

#### Calcular días de entrega

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
DATEDIFF('day',[Fecha],[Entrega])
```

**Resultado esperado** Linea 1: 3; linea 6: 5.

### TODAY y NOW

**Clave** `today-y-now`

**Definición** Devuelven fecha actual y fecha-hora actual respectivamente.

**Búsqueda** hoy, fecha actual, relativo

**Para recordar** El resultado depende del reloj y entorno de ejecución.

#### Calcular antigüedad

Crea un campo calculado con esta expresión y muéstralo por `Linea`:

```text
DATEDIFF('day',[Fecha],TODAY())
```

**Resultado esperado** Días entre el pedido y la fecha actual; cambia cada día.

### DATEPARSE y MAKEDATE

**Clave** `dateparse-y-makedate`

**Definición** DATEPARSE interpreta texto con un patrón; MAKEDATE construye una fecha a partir de año, mes y día.

**Búsqueda** parsear fecha, fecha texto

**Para recordar** El patrón debe coincidir exactamente con el texto.

**Nota** DATEPARSE tiene restricciones por conector; un extract compatible permite el ejemplo.

#### Convertir una fecha literal

Crea DATEPARSE('dd/MM/yyyy','05/01/2025') y pon el campo como fecha exacta en Text.

**Resultado esperado** 2025-01-05.

### Calendario fiscal

**Clave** `calendario-fiscal`

**Definición** Configurar el inicio del año fiscal cambia determinados niveles de fecha utilizados en la vista.

**Búsqueda** fiscal year, fiscal quarter

**Para recordar** No confundas calendario fiscal con calendario natural.

#### Cambiar inicio fiscal

1. En propiedades predeterminadas de Fecha, selecciona inicio en abril
2. usa Fiscal Quarter en la vista de Fecha según opciones disponibles.

**Resultado esperado** Enero-marzo corresponden al cuarto trimestre fiscal, con año fiscal según etiquetado de Tableau.

## Filtros y ordenamiento

**Clave** `filtros-y-ordenamiento`

### Definición

**Clave** `definicion`

**Definición** Los filtros limitan datos o marcas; el ordenamiento define la secuencia de presentación.

**Búsqueda** filter, sort, excluir, incluir

**Para recordar** El tipo de filtro cambia cuándo se aplica.

#### Mostrar pedidos completados

1. Arrastra Estado a Filters y selecciona Completado
2. Ventas en Text.

**Resultado esperado** 1700.

### Filtros de dimensión

**Clave** `filtros-de-dimension`

**Definición** Seleccionan miembros de una dimensión mediante listas, patrones o condiciones.

**Búsqueda** general, wildcard, condition

**Para recordar** Un filtro de dimensión actúa sobre miembros antes de agregados de medida.

#### Filtrar zona

1. Region en Filters > Norte
2. Ventas en Text.

**Resultado esperado** 700.

### Filtros de medida

**Clave** `filtros-de-medida`

**Definición** Restringen marcas según un agregado o valores no agregados si se elige All Values.

**Búsqueda** measure filter, suma mayor que

**Para recordar** Filtrar SUM(Ventas) no es filtrar cada fila de Ventas.

#### Filtrar regiones por total

1. Region en Rows, SUM(Ventas) en Text
2. agrega Ventas a Filters como SUM y fija mínimo 800.

**Resultado esperado** Solo Sur 1050.

### Filtros de fecha

**Clave** `filtros-de-fecha`

**Definición** Permiten fechas relativas, rangos y partes de calendario.

**Búsqueda** relative date, range, month

**Para recordar** Un filtro relativo usa una fecha de referencia que puede cambiar.

#### Seleccionar febrero y marzo

1. Fecha en Filters > Range of dates
2. 2025-02-01 a 2025-03-31.

**Resultado esperado** Ventas 1150.

### Top N y filtros de contexto

**Clave** `top-n-y-contexto`

**Definición** Top N selecciona los mejores miembros por una medida; un filtro de contexto restringe primero el universo considerado.

**Búsqueda** top, context, ranking

**Para recordar** Añade Region al contexto para obtener un top dentro de esa región.

#### Producto líder en Norte

1. Filtra Region Norte y Add to Context
2. Producto > Filters > Top > Top 1 by SUM(Ventas).

**Resultado esperado** Teclado 400; sin contexto el top global podría excluirlo.

### Filtros de fuente y extract

**Clave** `filtros-de-fuente-y-extract`

**Definición** Los filtros de fuente limitan los datos disponibles para hojas de esa fuente; los de extract limitan lo extraído.

**Búsqueda** data source filter, extract filter

**Para recordar** No equivalen a ocultar marcas en una hoja.

#### Crear fuente completada

En una copia de la fuente añade Data Source Filter Estado Completado.

**Resultado esperado** Todas sus hojas muestran como máximo 1700 en ventas.

### Show Filter y alcance

**Clave** `show-filter-y-alcance`

**Definición** Expone controles y permite aplicar el filtro a una hoja o a varias compatibles.

**Búsqueda** quick filter, apply to worksheets

**Para recordar** Comprueba a qué hojas afecta el control.

#### Compartir selector regional

1. Crea dos hojas de ventas
2. muestra Region con Show Filter y Apply to Worksheets > All Using This Data Source.

**Resultado esperado** Norte reduce ambas hojas a datos de esa región.

### Ordenamiento

**Clave** `ordenamiento`

**Definición** Sort cambia el orden de los miembros de una dimensión según etiqueta, campo o criterio manual.

**Búsqueda** sort, asc, desc, ranking

**Para recordar** Ordenar no elimina registros.

#### Ordenar productos

1. Producto en Rows, SUM(Ventas) en Columns
2. Sort descendente por SUM(Ventas).

**Resultado esperado** Silla 900, Teclado 400, Lampara 300, Mouse 150.

## Agrupar y segmentar

**Clave** `agrupar-y-segmentar`

### Definición

**Clave** `definicion`

**Definición** Groups, sets, bins y jerarquías organizan miembros de dimensiones para distintas preguntas.

**Búsqueda** groups, sets, bins, hierarchy

**Para recordar** Un grupo crea categorías; un set define pertenencia.

#### Crear grupo

1. Selecciona Mouse y Teclado y usa Group
2. nombra Accesorios.

**Resultado esperado** Accesorios agrupa ventas 550.

### Groups

**Clave** `groups`

**Definición** Agrupan miembros discretos bajo un nombre común.

**Búsqueda** group, categoría manual

**Para recordar** El grupo modifica cómo se agrupan marcas, no las filas originales.

#### Unir regiones

Crea Group de Region con Norte y Sur como Nacional.

**Resultado esperado** Una categoría con 1750.

### Sets

**Clave** `sets`

**Definición** Un set representa miembros In/Out; puede ser fijo o dinámico según condiciones.

**Búsqueda** set, in out, top set

**Para recordar** La pertenencia es distinta de filtrar filas.

#### Crear set Top 2

1. Producto > Create > Set > Top 2 by SUM(Ventas)
2. arrastra set y ventas a Text en una vista con set en Rows.

**Resultado esperado** In 1300 (Silla y Teclado), Out 450.

### Bins

**Clave** `bins`

**Definición** Dividen una medida numérica en intervalos de tamaño constante.

**Búsqueda** bin, histograma, intervalos

**Para recordar** El bin representa el límite inferior.

#### Agrupar importes por 200

1. Ventas > Create > Bins, tamaño 200
2. coloca bin en Rows y COUNT(Linea) en Text.

**Resultado esperado** 0: 3; 200: 4; 600: 1.

### Jerarquías

**Clave** `jerarquias`

**Definición** Organizan dimensiones en niveles para expandir y contraer detalle.

**Búsqueda** hierarchy, drill-down, drill-up

**Para recordar** La jerarquía no crea relaciones entre tablas.

#### Explorar categoría y producto

1. Crea jerarquía con Categoria sobre Producto
2. arrastra Categoria a Rows y pulsa +.

**Resultado esperado** Se muestran productos dentro de cada categoría.

## Gráficos básicos

**Clave** `graficos-basicos`

### Definición

**Clave** `definicion`

**Definición** La visualización debe corresponder a la pregunta: comparación, evolución, composición, relación o distribución.

**Búsqueda** chart, marcas, elegir gráfico

**Para recordar** Primero define la métrica y la unidad de análisis.

#### Comparar regiones

Region en Rows, SUM(Ventas) en Columns, Marks Bar.

**Resultado esperado** Dos barras 700 y 1050.

### Barras y barras apiladas

**Clave** `barras-y-apiladas`

**Definición** Las barras comparan categorías; apilarlas muestra la composición del total.

**Búsqueda** bar chart, stacked bar

**Para recordar** Una barra apilada dificulta comparar segmentos sin base común.

#### Ver composición regional

Region en Rows, SUM(Ventas) en Columns, Categoria en Color.

**Resultado esperado** Norte: Tecnologia 500, Hogar 200; Sur: Tecnologia 50, Hogar 1000.

### Líneas y áreas

**Clave** `lineas-y-areas`

**Definición** Una línea muestra evolución ordenada; un área enfatiza magnitud acumulando visualmente desde la base.

**Búsqueda** line chart, area chart, tendencia

**Para recordar** Usa fechas continuas para una escala temporal.

#### Ventas mensuales

Mes venta continuo en Columns, SUM(Ventas) en Rows, Marks Line.

**Resultado esperado** 600, 250 y 900 de enero a marzo.

### Dispersión

**Clave** `dispersion`

**Definición** Compara dos medidas numéricas por entidad o registro.

**Búsqueda** scatter plot, correlación

**Para recordar** Añade una dimensión a Detail para obtener varios puntos.

#### Comparar costo y venta

SUM(Costo) en Columns, SUM(Ventas) en Rows y Producto en Detail.

**Resultado esperado** Cuatro puntos: uno por producto.

### Tablas y crosstabs

**Clave** `tablas-y-crosstabs`

**Definición** Una tabla de texto muestra valores exactos cruzando dimensiones y medidas.

**Búsqueda** text table, crosstab

**Para recordar** Úsala cuando importan cifras precisas.

#### Cruzar región y categoría

Region en Rows, Categoria en Columns, SUM(Ventas) en Text.

**Resultado esperado** Norte: Hogar 200, Tecnologia 500; Sur: Hogar 1000, Tecnologia 50.

### Heatmap y highlight table

**Clave** `heatmap-y-highlight-table`

**Definición** Codifican valores mediante intensidad de color; la tabla resaltada también conserva valores visibles.

**Búsqueda** heat map, highlight table

**Para recordar** Usa una escala coherente y no dependas solo del color.

#### Resaltar ventas

1. Region en Rows, Categoria en Columns, Marks Square
2. Ventas en Color y Label.

**Resultado esperado** Sur-Hogar (1000) es la celda de mayor intensidad en escala creciente.

### Treemap y pie

**Clave** `treemap-y-pie`

**Definición** Representan partes de un total mediante áreas o ángulos.

**Búsqueda** composición, pie, treemap

**Para recordar** Con muchas categorías las barras son más fáciles de comparar.

#### Mostrar peso por categoría

1. Categoria en Color, SUM(Ventas) en Size y Label
2. elige Treemap en Show Me.

**Resultado esperado** Hogar 1200 ocupa más área que Tecnologia 550.

### Histogramas y box plots

**Clave** `histogramas-y-box-plots`

**Definición** Un histograma cuenta registros por intervalo; un box plot resume distribución y posibles extremos.

**Búsqueda** histogram, box plot, distribución

**Para recordar** Define qué representa cada observación antes de calcular distribución.

#### Histograma de ventas

Crea bins de tamaño 200 y usa bin en Columns y COUNT(Linea) en Rows.

**Resultado esperado** Frecuencias 3, 4 y 1 para intervalos 0, 200 y 600 respectivamente; los intervalos vacíos pueden mostrarse aparte.

## Gráficos con varias medidas

**Clave** `graficos-con-varias-medidas`

### Definición

**Clave** `definicion`

**Definición** Varias medidas pueden compartir una tabla, un eje o ejes separados según sus unidades.

**Búsqueda** combined axis, dual axis, varias medidas

**Para recordar** No compares escalas distintas como si fueran iguales.

#### Mostrar ventas y costo

1. Region en Rows
2. usa Measure Names en Columns y Measure Values en Text
3. conserva Ventas y Costo.

**Resultado esperado** Dos columnas de medidas por región: Norte 700 y 400; Sur 1050 y 710.

### Combined axis

**Clave** `combined-axis`

**Definición** Varias medidas comparten una escala mediante Measure Values.

**Búsqueda** eje combinado, blended axis

**Para recordar** Conviene cuando tienen unidades compatibles.

#### Comparar ventas y costo por mes

1. Mes venta en Columns
2. arrastra Ventas a Rows y Costo al eje existente
3. usa Measure Names en Color.

**Resultado esperado** Dos series en un eje monetario común.

### Dual axis y sincronización

**Clave** `dual-axis-y-sincronizacion`

**Definición** Dual Axis superpone dos ejes con tarjetas Marks separadas; sincronizarlos iguala escalas compatibles.

**Búsqueda** dual axis, synchronize axis, gráfico mixto

**Para recordar** No sincronices unidades incompatibles solo por estética.

#### Barras y línea

1. Mes venta en Columns, Ventas y Costo en Rows
2. Dual Axis, Synchronize Axis
3. Marks de ventas Bar y costo Line.

**Resultado esperado** Barras y línea sobre escala monetaria común, marzo ventas 900 y costo 590.

### Totales y subtotales

**Clave** `totales-y-subtotales`

**Definición** Analysis > Totals añade subtotales y totales de una tabla; Tableau puede recalcular agregados a nivel del total.

**Búsqueda** grand total, subtotal

**Para recordar** El total de un promedio o ratio no es necesariamente la suma de celdas.

#### Mostrar total regional

1. Region en Rows, Ventas en Text
2. Analysis > Totals > Show Column Grand Totals.

**Resultado esperado** Total 1750 bajo las dos regiones.

### KPI y formato

**Clave** `kpi-y-formato`

**Definición** Una tarjeta KPI resume una métrica y puede incluir contexto comparativo.

**Búsqueda** KPI, BAN, big number, formato

**Para recordar** Incluye unidad y periodo.

#### Tarjeta ventas

1. Sin dimensiones, arrastra SUM(Ventas) a Text
2. aumenta tamaño y titula Ventas totales.

**Resultado esperado** Una cifra 1750 con unidad monetaria.

## Mapas

**Clave** `mapas`

### Definición

**Clave** `definicion`

**Definición** Los mapas usan roles geográficos o coordenadas para representar datos por ubicación.

**Búsqueda** map, geographic role, latitud

**Para recordar** Region Norte/Sur no es un país geocodificable por sí solo.

#### Ventas por país

1. Relaciona clientes y ventas
2. asigna Geographic Role > Country/Region a Pais
3. doble clic en Pais y arrastra SUM(Ventas) a Size.

**Resultado esperado** Marcas para Mexico, Spain y United States.

### Roles geográficos y ubicaciones desconocidas

**Clave** `roles-geograficos-y-ubicaciones`

**Definición** El geocodificador interpreta campos con roles como país, estado o ciudad; Edit Locations resuelve ambigüedades.

**Búsqueda** unknown locations, geocoding

**Para recordar** Añade contexto de país para ciudades ambiguas.

#### Corregir rol

1. En fuente clientes asigna Country/Region a Pais y abre mapa
2. revisa indicador de ubicaciones desconocidas.

**Resultado esperado** Los tres países del dataset son reconocibles.

### Mapas de símbolos y rellenos

**Clave** `mapas-de-simbolos-y-rellenos`

**Definición** Los símbolos codifican magnitud en puntos; los mapas rellenos colorean polígonos disponibles.

**Búsqueda** symbol map, filled map

**Para recordar** No uses área geográfica como sustituto de valor.

#### Mapa relleno

1. Usa Pais con fuente relacionada y elige Filled Map en Show Me
2. Ventas en Color.

**Resultado esperado** Mexico tiene el mayor valor: 1400.

## Parámetros

**Clave** `parametros`

### Definición

**Clave** `definicion`

**Definición** Un parámetro es un valor controlado por el usuario que puede participar en cálculos, filtros o referencias.

**Búsqueda** parameter, what-if, selector

**Para recordar** Un parámetro no filtra nada por sí solo.

#### Crear umbral

1. Data pane > Create Parameter
2. nombre Umbral, Integer, valor 200
3. Show Parameter
4. crea [Ventas]>=[Umbral] y muestra por Linea.

**Resultado esperado** Cinco líneas cumplen con 200 o más.

### Lista, rango y fechas

**Clave** `lista-rango-y-fechas`

**Definición** Los parámetros pueden permitir todos los valores, una lista o un rango, según su tipo.

**Búsqueda** parameter list, range, date

**Para recordar** Elige el tipo antes de referenciarlo.

#### Seleccionar región

1. Crea parámetro string Zona con Norte y Sur
2. crea [Region]=[Zona] y usa True en Filters.

**Resultado esperado** Al seleccionar Sur, total 1050.

### Selector de métricas

**Clave** `selector-de-metricas`

**Definición** Un parámetro puede determinar cuál de varios cálculos se muestra.

**Búsqueda** metric switch, selector KPI

**Para recordar** Las ramas deben devolver tipos compatibles.

#### Alternar ventas y beneficio

1. Crea parámetro string Metrica con Ventas y Beneficio
2. cálculo CASE [Metrica] WHEN 'Ventas' THEN SUM([Ventas]) WHEN 'Beneficio' THEN SUM([Ventas]-[Costo]) END
3. ponlo en Text.

**Resultado esperado** El control alterna 1750 y 640.

### Top N dinámico

**Clave** `top-n-dinamico`

**Definición** Un parámetro entero permite modificar cuántos miembros conserva un filtro Top.

**Búsqueda** top parameter, top N

**Para recordar** Configura el universo antes del ranking.

#### Cambiar número de productos

1. Crea parámetro entero N con rango 1 a 4
2. en filtro Top de Producto usa By field > Top [N] por SUM(Ventas).

**Resultado esperado** N=2 muestra Silla y Teclado; N=1 solo Silla.

### Parámetros dinámicos

**Clave** `parametros-dinamicos`

**Definición** Pueden cargar valores permitidos o un valor inicial desde un campo al abrir el workbook.

**Búsqueda** dynamic parameter, lista actualizable

**Para recordar** No equivale a una lista que se recalcula con cada filtro.

#### Actualizar lista de regiones

Crea parámetro string con lista obtenida de Region y configura actualización al abrir el workbook si está disponible.

**Resultado esperado** La lista se obtiene de Norte y Sur al abrirlo.

### Escenarios what-if

**Clave** `escenarios-what-if`

**Definición** Un parámetro permite simular supuestos sin modificar datos reales.

**Búsqueda** simulación, precio, descuento

**Para recordar** Distingue supuesto de dato observado.

#### Simular descuento

1. Parámetro decimal Descuento=0.1
2. fórmula SUM([Ventas])*(1-[Descuento]).

**Resultado esperado** 1575; al cambiar a 0 vuelve a 1750.

## Table calculations

**Clave** `table-calculations`

### Definición

**Clave** `definicion`

**Definición** Los cálculos de tabla operan sobre marcas ya agregadas en la vista, como acumulados, rankings o comparaciones.

**Búsqueda** table calculation, quick table calculation, ventana

**Para recordar** El resultado depende del orden y nivel de detalle de la vista.

#### Acumular ventas mensuales

1. Mes venta en Rows ascendente, SUM(Ventas) en Text
2. Quick Table Calculation > Running Total
3. Compute Using Table (Down).

**Resultado esperado** 600, 850, 1750.

### Compute Using

**Clave** `compute-using`

**Definición** Determina qué dimensiones se recorren (addressing) y cuáles separan el cálculo en particiones.

**Búsqueda** table down, across, specific dimensions, partitioning

**Para recordar** Las dimensiones no marcadas en Specific Dimensions separan particiones.

#### Reiniciar acumulado por región

1. Region y Mes venta en Rows
2. RUNNING_SUM(SUM([Ventas])) en Text
3. Edit Table Calculation > Specific Dimensions: marca Mes venta y deja Region sin marcar.

**Resultado esperado** Norte: 300, 500, 700; Sur: 300, 350, 1050.

### RUNNING_SUM

**Clave** `running-sum`

**Definición** Suma desde el inicio de la partición hasta la marca actual.

**Búsqueda** running total, acumulado

**Para recordar** Ordena cronológicamente antes de acumular.

#### Acumulado mensual

1. Vista por Mes venta ascendente
2. fórmula RUNNING_SUM(SUM([Ventas]))
3. Compute Using Table (Down).

**Resultado esperado** 600, 850, 1750.

### LOOKUP

**Clave** `lookup`

**Definición** Devuelve el valor de una marca a un desplazamiento relativo; -1 consulta la anterior.

**Búsqueda** lag, lead, valor previo

**Para recordar** La primera marca no tiene anterior.

#### Comparar mes anterior

1. Vista por Mes venta ascendente
2. LOOKUP(SUM([Ventas]),-1)
3. Table (Down).

**Resultado esperado** NULL, 600, 250.

### Diferencia y porcentaje de cambio

**Clave** `diferencia-y-porcentaje-de-cambio`

**Definición** Compara el valor actual con otra marca; el cambio porcentual divide por la base de comparación.

**Búsqueda** difference, percent difference, MoM

**Para recordar** Una base cero o ausente no tiene crecimiento porcentual definido.

#### Calcular variación mensual

1. Vista por Mes venta ascendente
2. fórmula SUM([Ventas])-LOOKUP(SUM([Ventas]),-1)
3. Table (Down).

**Resultado esperado** NULL, -350, +650.

### Percent of Total

**Clave** `percent-of-total`

**Definición** Divide cada marca por la suma de la partición.

**Búsqueda** porcentaje del total, participación

**Para recordar** Filtrar marcas antes del cálculo puede cambiar el denominador.

#### Participación regional

1. Region en Rows
2. SUM([Ventas])/TOTAL(SUM([Ventas]))
3. Table (Down)
4. formato Percentage.

**Resultado esperado** Norte 40%, Sur 60%.

### RANK y RANK_DENSE

**Clave** `rank-y-rank-dense`

**Definición** Asignan posiciones por valor; RANK deja huecos tras empates, RANK_DENSE no.

**Búsqueda** ranking, dense rank

**Para recordar** No uses INDEX como equivalente de rank por valor.

#### Rankear productos

1. Producto en Rows
2. RANK(SUM([Ventas]),'desc')
3. Table (Down).

**Resultado esperado** Silla 1, Teclado 2, Lampara 3, Mouse 4.

### INDEX, FIRST, LAST y SIZE

**Clave** `index-first-last-y-size`

**Definición** INDEX numera marcas, FIRST y LAST dan desplazamientos a extremos y SIZE cuenta marcas de la partición.

**Búsqueda** número de fila, posición, tamaño ventana

**Para recordar** INDEX depende del orden de la vista.

#### Numerar meses

1. Mes venta en Rows ascendente
2. INDEX() en Text
3. Table (Down).

**Resultado esperado** 1, 2, 3; SIZE() devuelve 3 en cada marca.

### WINDOW_SUM y WINDOW_AVG

**Clave** `window-sum-y-window-avg`

**Definición** Agregan una ventana de marcas con límites relativos opcionales.

**Búsqueda** window function, ventana móvil, rolling average

**Para recordar** Los límites -1 y 0 incluyen anterior y actual.

#### Promedio móvil de dos meses

1. Vista mensual ascendente
2. WINDOW_AVG(SUM([Ventas]),-1,0)
3. Table (Down).

**Resultado esperado** 600, 425, 575; el primer mes usa solo la marca disponible.

### Filtros de table calculations

**Clave** `filtros-de-table-calculations`

**Definición** Un filtro basado en cálculo de tabla oculta marcas después de calcular la partición.

**Búsqueda** filtrar ranking, filtro tardío

**Para recordar** Puede conservar datos ocultos en el cálculo.

#### Mostrar último acumulado

1. Vista mensual con RUNNING_SUM
2. crea LAST() y filtra a 0, ambos Table (Down).

**Resultado esperado** Solo marzo, con acumulado 1750.

## LOD Expressions

**Clave** `lod-expressions`

### Definición

**Clave** `definicion`

**Definición** Una expresión de nivel de detalle (LOD) calcula agregados a una granularidad explícita, independiente o relativa a la vista.

**Búsqueda** level of detail, LOD, granularidad

**Para recordar** FIXED fija dimensiones; INCLUDE añade; EXCLUDE quita.

#### Ventas de cada cliente

Crea un campo calculado con esta expresión:

```text
{ FIXED [ClienteID] : SUM([Ventas]) }; pon ClienteID en Rows y MIN del campo en Text.
```

**Resultado esperado** C01 500, C02 900, C03 150, C04 200.

### FIXED

**Clave** `fixed`

**Definición** Calcula al nivel de las dimensiones declaradas, sin depender de las dimensiones de la vista.

**Búsqueda** fixed LOD, total por cliente

**Para recordar** Los filtros de dimensión normales no modifican FIXED; contexto sí.

#### Total de toda la fuente

1. Fórmula { FIXED : SUM([Ventas]) }
2. Region en Rows y MIN del campo en Text.

**Resultado esperado** 1750 en cada región.

### INCLUDE

**Clave** `include`

**Definición** Añade dimensiones al nivel de detalle de la vista y permite reagregar el resultado.

**Búsqueda** include LOD, promedio de pedido

**Para recordar** Útil para calcular por entidad antes de promediar.

#### Ticket promedio por región

1. Crea { INCLUDE [Pedido] : SUM([Ventas]) }
2. Region en Rows y AVG del campo en Text.

**Resultado esperado** Norte ≈233.33 (tres pedidos), Sur 262.50 (cuatro).

### EXCLUDE

**Clave** `exclude`

**Definición** Quita dimensiones del nivel de detalle de la vista.

**Búsqueda** exclude LOD, total de referencia

**Para recordar** El resultado puede repetirse entre las marcas más detalladas.

#### Total regional junto a categoría

1. Region y Categoria en Rows
2. { EXCLUDE [Categoria] : SUM([Ventas]) } en Text.

**Resultado esperado** 700 en las dos categorías de Norte y 1050 en las de Sur.

### LOD y filtros

**Clave** `lod-y-filtros`

**Definición** FIXED se evalúa después de filtros de fuente/contexto y antes de filtros ordinarios de dimensión; INCLUDE y EXCLUDE después de estos últimos.

**Búsqueda** context, fixed filter, porcentaje

**Para recordar** Decide si el denominador debe cambiar con el filtro.

#### Comparar denominador

1. Crea SUM([Ventas])/MIN({ FIXED : SUM([Ventas]) })
2. Region en Rows, filtra Norte
3. luego añade filtro al contexto.

**Resultado esperado** Sin contexto 40%; con contexto 100%.

### Elegir LOD o table calculation

**Clave** `elegir-lod-o-table-calculation`

**Definición** LOD define granularidad de agregación; table calculation opera sobre marcas de una vista concreta.

**Búsqueda** LOD vs table calc, cuándo usar

**Para recordar** Para valor previo usa LOOKUP; para total fijo por cliente usa FIXED.

#### Comparar enfoques

1. Crea vista mensual y RUNNING_SUM(SUM([Ventas]))
2. añade MIN({ FIXED : SUM([Ventas]) }).

**Resultado esperado** Acumulado cambia 600,850,1750; total fijo es 1750 en cada marca.

## Orden de operaciones

**Clave** `orden-de-operaciones`

### Definición

**Clave** `definicion`

**Definición** Tableau aplica operaciones en una secuencia definida; mover un filtro a contexto puede cambiar el significado del resultado.

**Búsqueda** order of operations, filter order

**Para recordar** Fuente/extract y contexto preceden a FIXED; dimensiones preceden a INCLUDE/EXCLUDE; medidas y cálculos de tabla van después.

#### Ver efecto de contexto

En el ejemplo LOD de denominador global añade Region Norte a contexto.

**Resultado esperado** La participación pasa de 40% a 100%.

### Top N frente a dimensión

**Clave** `top-n-frente-a-dimension`

**Definición** Top N y filtros ordinarios de dimensión no forman automáticamente un ranking condicionado uno por otro.

**Búsqueda** top N dentro de región, context

**Para recordar** Usa contexto para definir el universo del Top.

#### Producto líder de Norte

1. Aplica Top 1 global de Producto y Region Norte
2. luego añade Region a contexto.

**Resultado esperado** Sin contexto puede quedar vacío (Silla es líder global); con contexto aparece Teclado.

### Filtro de medida frente a dimensión

**Clave** `filtro-de-medida-frente-a-dimension`

**Definición** El filtro de dimensión reduce registros o miembros antes del agregado; el de medida selecciona marcas agregadas.

**Búsqueda** where vs having, filtro suma

**Para recordar** Un límite de suma no filtra cada línea individual.

#### Comparar importes

1. Region en Rows y Ventas en Text
2. filtro SUM(Ventas)>=800
3. en otra hoja filtra Ventas como All Values >=800.

**Resultado esperado** Primera: Sur 1050; segunda: ninguna fila, máximo individual 600.

## Métricas de negocio

**Clave** `metricas-de-negocio`

### Definición

**Clave** `definicion`

**Definición** Una métrica transforma datos en una medida útil para decidir. Define unidad, población, filtros y denominador antes de calcularla.

**Búsqueda** KPI, revenue, negocio

**Para recordar** El mismo nombre puede significar cosas distintas según el alcance.

#### Ventas completadas

Fórmula agregada SUM(IF [Estado]='Completado' THEN [Ventas] ELSE 0 END).

**Resultado esperado** 1700.

### Beneficio y margen

**Clave** `beneficio-y-margen`

**Definición** Beneficio resta costos de ingresos; margen divide beneficio entre ventas.

**Búsqueda** profit, profit ratio, rentabilidad

**Para recordar** Usa ratio de sumas para margen global ponderado.

#### Calcular margen

1. Crea Beneficio y Margen según Datos compartidos
2. ambos en Text con Measure Values.

**Resultado esperado** 640 de beneficio y 36.57% de margen.

### Ticket promedio y compradores

**Clave** `ticket-y-compradores`

**Definición** Ticket promedio divide ventas por pedidos distintos; compradores se cuentan por identificador único.

**Búsqueda** AOV, average order value, clientes únicos

**Para recordar** No uses AVG(Ventas) si la tabla tiene líneas de pedido.

#### Calcular ticket completado

1. Filtra Estado Completado
2. crea SUM([Ventas])/COUNTD([Pedido]) y COUNTD([ClienteID]).

**Resultado esperado** Ticket 283.33; cuatro compradores.

### Tasa de cancelación

**Clave** `tasa-de-cancelacion`

**Definición** Divide pedidos cancelados entre pedidos totales, sin duplicar líneas.

**Búsqueda** cancel rate, conditional aggregation

**Para recordar** Numerador y denominador deben usar la misma entidad.

#### Medir cancelaciones

1. Fórmula agregada COUNTD(IF [Estado]='Cancelado' THEN [Pedido] END)/COUNTD([Pedido])
2. formato Percentage.

**Resultado esperado** 14.29% (1 de 7).

### MoM, YoY y acumulados

**Clave** `mom-yoy-y-acumulados`

**Definición** MoM compara meses consecutivos; YoY compara el mismo periodo del año anterior; MTD/QTD/YTD acumulan desde inicio del periodo correspondiente.

**Búsqueda** growth, MoM, YoY, YTD, MTD, QTD

**Para recordar** No calcules YoY con el mes anterior.

#### Crecimiento MoM

1. Vista mensual ascendente
2. SUM([Ventas])/LOOKUP(SUM([Ventas]),-1)-1 con Table (Down)
3. formato Percentage.

**Resultado esperado** Febrero -58.33%; marzo 260%; enero NULL. El dataset no tiene año previo para YoY.

### Periodos a la fecha

**Clave** `periodos-a-la-fecha`

**Definición** MTD, QTD y YTD incluyen fechas desde el inicio del mes, trimestre o año hasta una fecha de corte.

**Búsqueda** acumulado año, trimestre, mes

**Para recordar** Usa fecha de corte explícita para reproducir.

#### Calcular MTD al 10 de marzo

Fórmula agregada SUM(IF [Fecha]>=DATETRUNC('month',#2025-03-10#) AND [Fecha]<=#2025-03-10# THEN [Ventas] ELSE 0 END).

**Resultado esperado** 800.

### Metas y variación

**Clave** `metas-y-variacion`

**Definición** El cumplimiento compara resultado con objetivo; la desviación absoluta resta el objetivo.

**Búsqueda** target, actual vs budget, variance

**Para recordar** Compara metas y ventas a la misma granularidad.

**Nota** El nombre de fuente debe coincidir; usa referencias que ofrece el editor.

#### Comparar por región

1. Usa blending por Region según ficha Data blending
2. crea SUM([Ventas])/SUM([metas].[Meta]) con referencia secundaria insertada desde el editor.

**Resultado esperado** Norte 100%; Sur 95.45%.

### Cohortes

**Clave** `cohortes`

**Definición** Agrupan entidades por un evento inicial, como su primera compra.

**Búsqueda** cohort, first purchase, retención

**Para recordar** Define si el evento exige pedido completado.

#### Cohorte primera compra

1. Crea { FIXED [ClienteID] : MIN(IF [Estado]='Completado' THEN [Fecha] END) }
2. trunca resultado a mes y cuenta compradores por cohorte.

**Resultado esperado** Enero: C01 y C02; marzo: C03 y C04.

### Retención

**Clave** `retencion`

**Definición** Mide cuántas entidades de una cohorte vuelven en un periodo posterior.

**Búsqueda** retention, repeat customers

**Para recordar** El denominador es el tamaño inicial de la cohorte, no los compradores del periodo posterior.

#### Retención de enero en febrero

1. Filtra completados
2. usa cohorte de primera compra y Mes venta para una tabla COUNTD(ClienteID). Para cohorte enero compara febrero con enero.

**Resultado esperado** 1 de 2 clientes vuelve en febrero: 50%.

### Conversión y funnels

**Clave** `conversion-y-funnels`

**Definición** Un funnel compara entidades que pasan por etapas definidas, idealmente en orden y con una misma población.

**Búsqueda** funnel, conversion rate

**Para recordar** La conversión de pedidos no es conversión de visitas.

#### Medir finalización de pedidos

Usa COUNTD([Pedido]) como pedidos registrados y COUNTD(IF [Estado]='Completado' THEN [Pedido] END) como completados.

**Resultado esperado** 7 registrados, 6 completados, tasa 85.71%; no hay datos de visitas.

## Análisis estadístico

**Clave** `analisis-estadistico`

### Definición

**Clave** `definicion`

**Definición** Las herramientas analíticas añaden referencias, modelos y resúmenes de distribución a las vistas.

**Búsqueda** analytics, estadística, tendencia

**Para recordar** Un patrón visual no prueba causalidad.

#### Comparar con media

1. Region en Rows y Ventas en Columns
2. añade Average Line para Table.

**Resultado esperado** Referencia 875.

### Reference lines y bands

**Clave** `reference-lines-y-bands`

**Definición** Las líneas muestran valores de referencia; bandas señalan un intervalo.

**Búsqueda** meta, reference band, constant line

**Para recordar** Indica si la referencia aplica a tabla, pane o celda.

#### Añadir objetivo regional fijo

1. Vista de ventas por Region
2. Analytics > Reference Line, valor constante 800, alcance Table.

**Resultado esperado** Norte queda por debajo y Sur por encima.

### Trend lines

**Clave** `trend-lines`

**Definición** Ajustan modelos estadísticos a marcas para describir relación entre variables.

**Búsqueda** regresión, trend line, R squared

**Para recordar** Revisa observaciones y supuestos, no solo R².

#### Explorar costo y ventas

1. SUM(Costo) Columns, SUM(Ventas) Rows, Producto Detail
2. Analytics > Trend Line > Linear.

**Resultado esperado** Línea ajustada a cuatro puntos; no permite inferir causalidad.

### Forecast

**Clave** `forecast`

**Definición** Proyecta series temporales mediante modelos de suavizado exponencial.

**Búsqueda** forecast, pronóstico, estacionalidad

**Para recordar** Una serie corta no permite pronósticos fiables.

**Nota** Los tres meses de ventas.csv no bastan; requiere datos históricos adicionales y vista compatible.

#### Probar pronóstico

1. Usa una serie mensual con al menos 24 meses de datos de prueba, un valor por mes
2. coloca mes continuo en Columns y ventas en Rows
3. Analysis > Forecast > Show Forecast.

**Resultado esperado** Aparecen valores proyectados e intervalos si la serie cumple requisitos.

### Clustering

**Clave** `clustering`

**Definición** Agrupa marcas con características numéricas similares mediante un modelo de clustering.

**Búsqueda** clusters, segmentación estadística

**Para recordar** Los grupos dependen de variables y escala.

#### Explorar grupos de productos

1. En dispersión de Costo y Ventas por Producto, arrastra Cluster desde Analytics si está disponible
2. prueba dos clusters.

**Resultado esperado** Se asignan colores de cluster a los puntos; el conjunto es demasiado pequeño para conclusiones sólidas.

## Dashboards

**Clave** `dashboards`

### Definición

**Clave** `definicion`

**Definición** Un dashboard reúne hojas, controles y objetos para responder preguntas relacionadas en una sola pantalla.

**Búsqueda** dashboard, panel, layout

**Para recordar** Cada hoja debe aportar una decisión o contexto.

#### Crear dashboard de ventas

1. Crea hojas KPI ventas, barras por Region y línea mensual
2. New Dashboard, arrastra las tres hojas.

**Resultado esperado** Una pantalla con 1750, comparación regional y tendencia mensual.

### Contenedores y layout

**Clave** `contenedores-y-layout`

**Definición** Contenedores horizontales y verticales organizan objetos; tiled comparte espacio y floating permite posicionamiento libre.

**Búsqueda** tiled, floating, layout containers

**Para recordar** Tiled facilita alineación y redimensionamiento.

#### Alinear gráficos

1. Añade contenedor vertical
2. dentro coloca KPI y contenedor horizontal con barras y línea.

**Resultado esperado** KPI arriba, dos gráficos alineados abajo.

### Size y diseño por dispositivo

**Clave** `size-y-dispositivo`

**Definición** El tamaño del dashboard puede ser fijo, automático o rango; Device Designer permite variantes según dispositivo.

**Búsqueda** dashboard size, mobile, device preview

**Para recordar** Comprueba que etiquetas y filtros no queden cortados.

#### Previsualizar móvil

En dashboard abre Device Preview y revisa o crea Phone layout.

**Resultado esperado** Se puede reorganizar la vista para una pantalla estrecha.

### Filtros compartidos

**Clave** `filtros-compartidos`

**Definición** Un filtro mostrado en un dashboard puede afectar varias hojas según configuración.

**Búsqueda** global filter, apply to worksheets

**Para recordar** Comprueba todas las hojas afectadas.

#### Filtrar dashboard por región

1. Muestra filtro Region en la hoja de barras
2. Apply to Worksheets > All Using This Data Source.

**Resultado esperado** Al seleccionar Norte, KPI pasa a 700 y la tendencia a 300,200,200.

### Tooltips y Viz in Tooltip

**Clave** `tooltips-y-viz-in-tooltip`

**Definición** Tooltip muestra contexto al pasar por una marca; Viz in Tooltip incorpora una hoja filtrada por la marca.

**Búsqueda** tooltip, hover, viz in tooltip

**Para recordar** Evita información redundante y hojas pesadas.

**Nota** No disponible para totales y grand totals desde 2023.3.

#### Ver productos al pasar por región

1. Crea hoja detalle Producto con Ventas y hoja regional
2. edita Tooltip de la regional e inserta la hoja detalle con filtro de todos los campos.

**Resultado esperado** Al pasar sobre Norte se muestran productos de esa región.

### Diseño y accesibilidad

**Clave** `diseno-y-accesibilidad`

**Definición** Jerarquía visual, contraste, texto legible y codificación redundante ayudan a interpretar dashboards.

**Búsqueda** diseño, accesibilidad, colores, contraste

**Para recordar** No dependas solo del color para distinguir valores.

#### Mejorar lectura

Añade títulos con unidad/periodo, etiquetas regionales, contraste suficiente y revisa texto alternativo de la vista cuando esté disponible.

**Resultado esperado** Se distinguen Norte y Sur incluso sin depender de colores.

### Stories

**Clave** `stories`

**Definición** Una historia organiza puntos narrativos con hojas o dashboards y explicaciones.

**Búsqueda** story, story point, storytelling

**Para recordar** Usa secuencia cuando el análisis requiere una narrativa.

#### Presentar resultados

1. New Story
2. añade dashboard general y otro punto que destaque marzo.

**Resultado esperado** Dos puntos navegables: panorama y detalle de marzo.

## Acciones e interactividad

**Clave** `acciones-e-interactividad`

### Definición

**Clave** `definicion`

**Definición** Las acciones conectan una selección, hover o menú con cambios en otras vistas o controles.

**Búsqueda** actions, dashboard interactivo

**Para recordar** Define origen, destino, disparador y limpieza de selección.

#### Filtrar por selección

1. En dashboard de barras y línea marca barras como Use as Filter
2. pulsa Norte.

**Resultado esperado** La línea muestra ventas de Norte.

### Filter actions

**Clave** `filter-actions`

**Definición** Filtran hojas destino según valores de las marcas seleccionadas.

**Búsqueda** filter action, cross filter

**Para recordar** Configura qué sucede al limpiar la selección.

#### Filtrar por categoría

1. Dashboard > Actions > Add Action > Filter
2. origen vista de categoría, destino línea mensual, Select, clearing Show all values.

**Resultado esperado** Al elegir Hogar aparecen 300,200,700 por mes.

### Highlight actions

**Clave** `highlight-actions`

**Definición** Resaltan marcas relacionadas sin eliminar las demás.

**Búsqueda** highlight, resaltar

**Para recordar** No cambia la población como un filtro.

#### Resaltar región

1. Usa dos hojas con Region presente
2. Add Action > Highlight y selecciona Norte.

**Resultado esperado** Norte destaca y Sur permanece visible.

### URL actions

**Clave** `url-actions`

**Definición** Abren un enlace fijo o construido con valores de una marca.

**Búsqueda** go to URL, enlaces, navegación web

**Para recordar** No envíes datos sensibles en la URL.

#### Abrir documentación

1. Dashboard > Actions > Add Action > Go to URL
2. URL https://help.tableau.com/
3. Run on Menu.

**Resultado esperado** Al seleccionar una marca se ofrece un enlace a la ayuda.

### Parameter actions

**Clave** `parameter-actions`

**Definición** Cambian un parámetro según el valor de una marca seleccionada.

**Búsqueda** parameter action, selección dinámica

**Para recordar** El parámetro debe ser compatible con el campo de origen.

#### Elegir umbral con una marca

1. Crea parámetro numérico Umbral y una hoja por Linea con Ventas
2. Add Action > Change Parameter, fuente Ventas con agregación SUM, Select.

**Resultado esperado** Seleccionar línea 3 establece Umbral en 300.

### Set actions

**Clave** `set-actions`

**Definición** Actualizan miembros de un set mediante interacciones.

**Búsqueda** set action, in out, seleccionar grupo

**Para recordar** Un set puede aceptar múltiples miembros.

#### Seleccionar productos

1. Crea set de Producto
2. usa Add Action > Change Set Values con hoja Producto y Assign values to set.

**Resultado esperado** Seleccionar Silla deja Silla como miembro In.

### Navegación y drill-through

**Clave** `navegacion-y-drill-through`

**Definición** Los botones Navigation o Go to Sheet llevan a una hoja/dashboard de detalle; una filter action puede transmitir contexto.

**Búsqueda** navigation, go to sheet, drill through

**Para recordar** Navegar y filtrar son acciones distintas.

#### Abrir detalle

1. Crea dashboard Resumen y Detalle
2. añade Navigation object a Resumen con destino Detalle.

**Resultado esperado** El botón abre Detalle; añade Filter Action aparte si necesitas transferir filtros.

### Dynamic Zone Visibility

**Clave** `dynamic-zone-visibility`

**Definición** Permite mostrar u ocultar zonas del dashboard según un parámetro o campo booleano adecuado.

**Búsqueda** dynamic zone, mostrar ocultar

**Para recordar** La visibilidad de una zona no es seguridad.

**Nota** Requiere Tableau 2022.3+ y campo compatible.

#### Mostrar gráfico opcional

1. Crea parámetro booleano Mostrar detalle
2. selecciona contenedor de detalle y en Layout activa Control visibility using value, elige parámetro.

**Resultado esperado** True muestra la zona; False la oculta.

## Validación de datos

**Clave** `validacion-de-datos`

### Definición

**Clave** `definicion`

**Definición** Validar una vista consiste en comprobar que sus registros, filtros, granularidad y agregados representan la pregunta correctamente.

**Búsqueda** QA, validación, control de calidad

**Para recordar** Compara con un total independiente antes de publicar.

#### Validar total

En una hoja sin filtros coloca SUM(Ventas), COUNT(Linea) y COUNTD(Pedido) en Measure Values.

**Resultado esperado** 1750, 8 y 7 respectivamente.

### View Data y exportación

**Clave** `view-data-y-exportacion`

**Definición** View Data permite examinar datos de una marca; exportar una crosstab facilita contrastar cifras.

**Búsqueda** view data, underlying data, export CSV

**Para recordar** Comprueba qué datos exportas: resumen o detalle.

#### Inspeccionar Norte

1. Selecciona barra Norte y usa View Data
2. revisa detalle de ventas.

**Resultado esperado** Cuatro líneas que suman 700; el acceso al detalle depende de permisos.

### Duplicados y claves

**Clave** `duplicados-y-claves`

**Definición** Comparar conteo total y distinto ayuda a distinguir duplicados de una granularidad legítima.

**Búsqueda** duplicate, countd, clave

**Para recordar** Varias líneas del mismo pedido no son duplicados de línea.

#### Comprobar unicidad

Crea COUNT([Linea])-COUNTD([Linea]) y COUNT([Pedido])-COUNTD([Pedido]).

**Resultado esperado** 0 para Linea; 1 para Pedido, esperado por P01.

### Contrastar contra SQL

**Clave** `contrastar-contra-sql`

**Definición** Una consulta externa con la misma población y granularidad permite verificar agregados.

**Búsqueda** validar SQL, reconciliar, sumas

**Para recordar** Iguala filtros y tratamiento de nulos.

#### Validar pedidos completados

1. En una base de prueba con ventas ejecuta SELECT SUM(Ventas), COUNT(DISTINCT Pedido) FROM ventas WHERE Estado='Completado'
2. compara con la hoja filtrada.

**Resultado esperado** Ambas deben mostrar 1700 y 6.

## Tableau Prep: flujos

**Clave** `prep-flujos`

### Definición

**Clave** `definicion`

**Definición** Tableau Prep organiza la preparación en un flujo de pasos que se pueden revisar, combinar y ejecutar.

**Búsqueda** prep builder, flow, ETL

**Para recordar** El flujo transforma datos antes de visualizarlos.

#### Crear flujo

En Prep Builder conecta leads.csv y añade Clean Step.

**Resultado esperado** Un Input y un Clean Step muestran cuatro registros.

### Input y Profile pane

**Clave** `input-y-profile-pane`

**Definición** Input configura conexión y campos; Profile pane resume valores y distribución de campos.

**Búsqueda** input, profile pane, data grid

**Para recordar** Comprueba la muestra y los tipos antes de limpiar.

#### Inspeccionar origen

1. Conecta leads.csv
2. abre un Clean Step y revisa Origen y Email.

**Resultado esperado** Se observan variantes Web/web, espacios en Tienda si se conservaron, y correo ausente.

### Steps y ramas

**Clave** `steps-y-ramas`

**Definición** Un flujo permite dividir la preparación en ramas con pasos diferentes.

**Búsqueda** branch, clean step, flow

**Para recordar** Cada rama parte del estado anterior a la bifurcación.

#### Separar leads

1. Desde Input crea dos Clean Steps
2. en uno conserva Email no nulo y en el otro solo Email nulo.

**Resultado esperado** Tres registros en rama válida; uno en rama de revisión.

## Tableau Prep: limpieza

**Clave** `prep-limpieza`

### Definición

**Clave** `definicion`

**Definición** La limpieza corrige tipos, faltantes, etiquetas y registros repetidos mediante pasos documentados.

**Búsqueda** clean, data cleaning, calidad

**Para recordar** No elimines registros sin definir la regla de negocio.

#### Normalizar origen

En Clean Step de leads crea LOWER(TRIM([Origen])) como Origen limpio.

**Resultado esperado** web para L01, L02 y L04; tienda para L03.

### Tipos, renombrar y eliminar

**Clave** `tipos-renombrar-y-eliminar`

**Definición** Permite corregir tipo y nombres o retirar campos que no se necesitan.

**Búsqueda** change type, rename, remove

**Para recordar** Renombrar no altera el contenido.

#### Preparar columnas

En Clean Step renombra Origen a Canal y cambia Enero y Febrero a Number (whole).

**Resultado esperado** Columnas Canal, Enero y Febrero listas para análisis.

### Nulos y filtros

**Clave** `nulos-y-filtros`

**Definición** Los filtros conservan o excluyen registros; se pueden tratar nulos con cálculos o selección de valores.

**Búsqueda** filter, missing, null

**Para recordar** Conserva una rama de errores si se necesita auditoría.

#### Excluir correo ausente

En Clean Step, filtra Email para excluir Null (o texto vacío si fue importado así).

**Resultado esperado** Quedan L01, L02 y L03.

### Group Values

**Clave** `group-values`

**Definición** Agrupa variantes de texto bajo un valor elegido, manualmente o con opciones de coincidencia.

**Búsqueda** group values, fuzzy match, etiquetas

**Para recordar** Revisa coincidencias sugeridas antes de aceptarlas.

#### Unificar Web y web

En Origen usa Group Values y agrupa Web y web como Web.

**Resultado esperado** L01, L02 y L04 quedan bajo Web.

### Deduplicar

**Clave** `deduplicar`

**Definición** Deduplicar conserva un registro por clave según un criterio explícito.

**Búsqueda** duplicate rows, row number, eliminar duplicados

**Para recordar** Distingue duplicado de entidad y duplicado exacto.

**Nota** Sintaxis de Prep para ROW_NUMBER; no es la sintaxis de cálculo de tabla de Desktop.

#### Conservar primer registro de cada correo

1. Filtra Email no nulo y crea cálculo { PARTITION [Email] : { ORDERBY [LeadID] ASC : ROW_NUMBER() } }
2. filtra resultado a 1.

**Resultado esperado** Quedan L01 y L03.

### Split y cálculos

**Clave** `split-y-calculos`

**Definición** Divide texto en columnas o crea campos derivados en Clean Step.

**Búsqueda** split, calculated field, dominio

**Para recordar** Revisa nulos y delimitadores ausentes.

#### Extraer dominio de email

En Clean Step de leads crea SPLIT([Email],'@',2).

**Resultado esperado** L01: example.com; L04: NULL si Email se importó nulo.

## Tableau Prep: transformación

**Clave** `prep-transformacion`

### Definición

**Clave** `definicion`

**Definición** Los pasos de transformación cambian la forma o granularidad de los datos y combinan fuentes.

**Búsqueda** pivot, join, union, aggregate

**Para recordar** Comprueba conteos antes y después de cada cambio.

#### Resumir ventas regionales

1. Conecta ventas, añade Aggregate Step
2. Grouped Fields Region, Aggregated Fields SUM(Ventas).

**Resultado esperado** Dos filas: Norte 700, Sur 1050.

### Pivot columnas a filas

**Clave** `pivot-columnas-a-filas`

**Definición** Convierte varias columnas de una misma medida en filas con nombre y valor.

**Búsqueda** unpivot, columns to rows, wide to long

**Para recordar** Sirve para meses que llegan como columnas.

#### Transformar meses de leads

1. Añade Pivot Step, Columns to Rows
2. mueve Enero y Febrero al conjunto de pivot
3. renombra Pivot1 Names a Mes y Pivot1 Values a Contactos.

**Resultado esperado** Ocho filas; L01 tiene Enero 2 y Febrero 3.

### Pivot filas a columnas

**Clave** `pivot-filas-a-columnas`

**Definición** Convierte valores de una dimensión en columnas y agrega valores cuando es necesario.

**Búsqueda** pivot rows to columns, long to wide

**Para recordar** Define cómo agregar si varias filas comparten clave.

#### Reconstruir meses

1. Desde salida del pivot anterior añade Pivot Step Rows to Columns
2. Mes como campo de encabezados y Contactos con SUM
3. conserva LeadID y demás identificadores.

**Resultado esperado** Cuatro registros, con columnas Enero y Febrero.

### Aggregate Step

**Clave** `aggregate-step`

**Definición** Reduce filas agrupando dimensiones y calculando agregados.

**Búsqueda** aggregate, group by, sum

**Para recordar** Después del paso ya no está disponible el detalle eliminado.

#### Resumir por producto

En ventas agrupa Producto y suma Ventas.

**Resultado esperado** Silla 900, Teclado 400, Lampara 300, Mouse 150.

### Join Step

**Clave** `join-step`

**Definición** Combina columnas de entradas por claves y muestra filas coincidentes y excluidas.

**Búsqueda** join, join profile, claves

**Para recordar** Revisa no coincidencias y multiplicación de filas.

#### Conservar clientes

Combina clientes con ventas, Left Join con clientes a la izquierda por ClienteID.

**Resultado esperado** 9 filas físicas, C05 sin ventas.

### Union Step

**Clave** `union-step`

**Definición** Apila entradas con estructura compatible y permite revisar campos no coincidentes.

**Búsqueda** union, append, mismatch

**Para recordar** La unión no elimina duplicados.

#### Apilar ventas por periodo

1. Separa ventas en enero-febrero y marzo
2. conecta ambos archivos a Union Step.

**Resultado esperado** Ocho registros y suma 1750.

## Tableau Prep: salida

**Clave** `prep-salida`

### Definición

**Clave** `definicion`

**Definición** Un Output Step define dónde se guardarán los datos resultantes; ejecutar el flujo genera esa salida.

**Búsqueda** output, run flow, export

**Para recordar** Guardar el flujo no equivale a ejecutarlo.

#### Generar CSV limpio

Desde la rama válida de leads añade Output local CSV y Run Flow.

**Resultado esperado** Archivo de tres filas si solo excluiste el correo ausente.

### Archivos de flujo y salida

**Clave** `archivos-de-flujo-y-salida`

**Definición** Los archivos .tfl guardan el flujo, .tflx pueden empaquetar recursos; los resultados se pueden escribir a CSV, Hyper u otros destinos compatibles.

**Búsqueda** tfl, tflx, hyper

**Para recordar** El archivo del flujo describe transformaciones, no sustituye al resultado.

#### Guardar flujo reutilizable

1. En Prep Builder guarda el flujo y configura Output a .hyper
2. ejecútalo y conecta Tableau Desktop al extract.

**Resultado esperado** Se puede analizar el resultado preparado en Desktop.

### Publicar y programar flujos

**Clave** `publicar-y-programar-flujos`

**Definición** Publicar un flujo en Cloud/Server permite ejecutarlo y, con permisos y capacidad correspondiente, programar tareas.

**Búsqueda** Prep Conductor, schedule, flow refresh

**Para recordar** Programación y credenciales dependen del sitio y licencia.

#### Programar actualización

1. Publica un flujo con salida a fuente publicada en un entorno autorizado
2. configura tarea programada si está habilitada.

**Resultado esperado** El sitio muestra el flujo y su próxima ejecución configurada; no presupone que la ejecución haya ocurrido.

## Archivos y publicación

**Clave** `archivos-y-publicacion`

### Definición

**Clave** `definicion`

**Definición** Un workbook puede guardarse localmente o publicarse para que otros usuarios lo consulten según permisos.

**Búsqueda** publish, workbook, compartir

**Para recordar** Publicar no siempre significa hacer público.

#### Guardar análisis

1. File > Save As
2. guarda un workbook de ventas.

**Resultado esperado** Existe un archivo .twb o .twbx según formato elegido.

### TWB, TWBX, TDS y TDSX

**Clave** `twb-twbx-tds-tdsx`

**Definición** TWB guarda definición del workbook; TWBX puede empaquetar recursos locales. TDS describe una fuente y TDSX puede empaquetarla con datos locales.

**Búsqueda** extensiones, packaged workbook, data source

**Para recordar** Un paquete puede contener datos; revísalo antes de compartir.

#### Empaquetar práctica

1. Guarda el workbook local de ventas como Tableau Packaged Workbook (.twbx)
2. ábrelo en entorno compatible.

**Resultado esperado** Hojas y recursos locales empaquetados están disponibles sin buscar el CSV original, si se incluyó.

### Tableau Public

**Clave** `tableau-public`

**Definición** Servicio para publicar visualizaciones públicamente; las opciones de visibilidad no convierten el contenido publicado en privado.

**Búsqueda** public, portfolio, publicar gratis

**Para recordar** Usa exclusivamente datos que puedan ser públicos.

#### Publicar práctica

Con datos sintéticos y cuenta Public, usa la opción de guardar/publicar a Tableau Public.

**Resultado esperado** Una visualización publicada accesible según las condiciones de Public; no subas datos reales confidenciales.

### Tableau Cloud y Server

**Clave** `tableau-cloud-y-server`

**Definición** Cloud es servicio alojado; Server se despliega y administra en infraestructura propia o gestionada.

**Búsqueda** server, cloud, publicar empresa

**Para recordar** La edición, descarga y consulta dependen de licencia, rol y permisos.

#### Publicar workbook

1. En Desktop inicia sesión en un sitio autorizado
2. Server > Publish Workbook
3. elige proyecto y nombre.

**Resultado esperado** Workbook disponible en el proyecto si la publicación se completa.

### Fuentes publicadas

**Clave** `fuentes-publicadas`

**Definición** Una fuente publicada centraliza conexión, modelo y metadatos para reutilizarlos en varios workbooks.

**Búsqueda** published data source, reuse, gobernanza

**Para recordar** Actualizar fuente compartida puede afectar varios análisis.

#### Reutilizar fuente

Publica la fuente de ventas en un proyecto de prueba y conecta un workbook nuevo a ella.

**Resultado esperado** La nueva hoja puede mostrar total 1750 sin reconstruir el modelo local.

### Refresh programado y Bridge

**Clave** `refresh-programado-y-bridge`

**Definición** Un sitio puede programar refrescos de extract; Bridge permite ciertas conexiones entre Cloud y fuentes en redes privadas.

**Búsqueda** schedule, refresh, tableau bridge

**Para recordar** Revisa credenciales, conectividad y estado de última ejecución.

#### Configurar refresco

1. Publica una extracción compatible y define un schedule autorizado
2. si la red privada lo requiere, configura Bridge con el administrador.

**Resultado esperado** Aparece una tarea de actualización; valida su historial tras ejecutarse.

### Suscripciones y alertas

**Clave** `suscripciones-y-alertas`

**Definición** Las suscripciones envían vistas programadas; alertas basadas en datos avisan cuando una medida supera una condición compatible.

**Búsqueda** subscription, data-driven alert

**Para recordar** Requieren sitio, permisos y soporte de la vista.

#### Crear alerta

En una vista publicada compatible con eje continuo de ventas, configura alerta sobre un umbral de 1000 si está disponible.

**Resultado esperado** La alerta queda configurada; el envío depende de evaluación y permisos.

## Seguridad y gobernanza

**Clave** `seguridad-y-gobernanza`

### Definición

**Clave** `definicion`

**Definición** La gobernanza establece quién usa, modifica y valida datos y contenido.

**Búsqueda** governance, permissions, security

**Para recordar** Ocultar columnas u hojas no es seguridad.

#### Revisar acceso

En un proyecto de prueba revisa Permissions de un workbook.

**Resultado esperado** Se muestran capacidades permitidas o denegadas por usuario/grupo según reglas efectivas.

### Roles y permisos

**Clave** `roles-y-permisos`

**Definición** El rol de sitio limita capacidades máximas y los permisos controlan operaciones sobre contenido.

**Búsqueda** creator, explorer, viewer, permisos

**Para recordar** Un permiso no supera las capacidades del rol y licencia.

#### Validar acceso

Con un administrador configura grupo de lectura para un proyecto de prueba y verifica con una cuenta de prueba.

**Resultado esperado** La cuenta ve el contenido permitido sin poder editarlo si las capacidades efectivas lo impiden.

### Row-level security

**Clave** `row-level-security`

**Definición** Restringe qué filas puede consultar cada usuario mediante una política aplicada a los datos.

**Búsqueda** RLS, user filter, username

**Para recordar** No basta con ocultar un selector o un dashboard.

**Nota** Asegura también acceso a fuentes, descargas y edición; no trates un filtro de hoja aislado como protección suficiente.

#### Restringir región

1. En entorno autorizado añade tabla de asignación Usuario-Region (ejemplo analista_norte → Norte) y configura una política o filtro de usuario basado en USERNAME() según el método del sitio
2. prueba con esa cuenta.

**Resultado esperado** La cuenta autorizada para Norte ve 700, no Sur.

### Certificación y linaje

**Clave** `certificacion-y-linaje`

**Definición** Una fuente certificada identifica contenido respaldado por responsables; el linaje muestra dependencias si Catalog está habilitado.

**Búsqueda** certified data source, lineage, catalog

**Para recordar** Certificación no sustituye validación de métricas.

#### Identificar fuente autorizada

En sitio habilitado busca fuente de ventas certificada y revisa propietario y dependencias.

**Resultado esperado** Se distingue la fuente aprobada de copias no certificadas; linaje depende de capacidades del sitio.

## Rendimiento

**Clave** `rendimiento`

### Definición

**Clave** `definicion`

**Definición** Optimizar implica reducir trabajo innecesario de consulta y renderizado sin alterar la respuesta del análisis.

**Búsqueda** performance, optimización, dashboard lento

**Para recordar** Mide antes y después con el mismo escenario.

#### Reducir marcas

Compara vista de líneas de pedido con vista agregada por Region.

**Resultado esperado** La segunda representa 2 marcas en lugar de 8; no implica una mejora medible con tan pocos datos.

### Performance Recorder

**Clave** `performance-recorder`

**Definición** Registra eventos y tiempos de construcción de vistas y consultas donde están disponibles.

**Búsqueda** performance recording, queries, timing

**Para recordar** Identifica el cuello de botella antes de cambiar el modelo.

**Nota** Los eventos disponibles dependen de conexión y versión.

#### Registrar dashboard

1. En Desktop Help > Settings and Performance > Start Performance Recording
2. interactúa con dashboard
3. Stop Performance Recording.

**Resultado esperado** Se abre un workbook con eventos y duraciones registrados.

### Optimizar modelo y filtros

**Clave** `optimizar-modelo-y-filtros`

**Definición** Granularidad adecuada, menos campos necesarios y filtros selectivos reducen carga potencial; el beneficio depende de la fuente.

**Búsqueda** cardinality, extract, filter performance

**Para recordar** No declares cardinalidad falsa para acelerar.

#### Comparar alternativas

1. Duplica workbook, oculta campos no necesarios, reduce marcas o usa extract
2. mide ambos con Performance Recorder.

**Resultado esperado** Obtienes tiempos comparables; conserva la alternativa que mantenga resultados y mejore tiempos medidos.

## Integraciones

**Clave** `integraciones`

### Definición

**Clave** `definicion`

**Definición** Tableau se integra con servicios y aplicaciones externas para ampliar cálculos, automatización o visualización embebida.

**Búsqueda** API, extensiones, python, R

**Para recordar** No son requisitos universales junior; requieren entornos adicionales.

#### Identificar integración

Revisa la opción Analytics Extension Connection en Desktop si está disponible.

**Resultado esperado** Se pueden configurar servicios compatibles; no se ejecuta código externo por defecto.

### Python y R

**Clave** `python-y-r`

**Definición** Las extensiones analíticas permiten enviar datos agregados a servicios externos como TabPy o Rserve mediante funciones SCRIPT_* compatibles.

**Búsqueda** tabpy, rserve, script_real

**Para recordar** Requiere servicio autorizado y una salida compatible con las marcas.

**Nota** No envíes datos privados a un servicio externo no autorizado.

#### Probar servicio

1. Con TabPy ya configurado en un entorno de prueba, crea SCRIPT_REAL('return _arg1', SUM([Ventas]))
2. usa vista regional con Compute Using adecuado.

**Resultado esperado** 700 y 1050 si el servicio devuelve la entrada sin cambios.

### REST API y automatización

**Clave** `rest-api-y-automatizacion`

**Definición** REST API permite gestionar contenido y tareas de un sitio mediante autenticación y permisos.

**Búsqueda** rest api, automation, refresh, scripting

**Para recordar** La API no reemplaza las reglas de permisos.

#### Consultar workbooks

En un sitio de pruebas autentícate por método permitido y usa la operación Query Workbooks de la REST API para ese sitio.

**Resultado esperado** Respuesta estructurada con workbooks accesibles a la cuenta, no todos necesariamente.

### Embedded Analytics y extensiones

**Clave** `embedded-analytics-y-extensiones`

**Definición** Embedding API integra vistas publicadas en una web; extensiones pueden ampliar la funcionalidad de dashboards.

**Búsqueda** embedding api, extensions, web

**Para recordar** Una vista embebida conserva sus requisitos de autenticación.

#### Integrar vista

Con workbook publicado y permiso de embedding, usa el código de inserción generado por Share en una aplicación de prueba.

**Resultado esperado** La vista se muestra en la aplicación para usuarios autorizados.

## Fuentes

Documentación oficial de Tableau. Los ejemplos y datasets de estas fichas son propios; las fuentes respaldan el funcionamiento de las herramientas y sus restricciones.

- [Tableau Desktop y Web Authoring](https://help.tableau.com/current/pro/desktop/en-us/default.htm): entorno, construcción de hojas y navegación general.
- [Roles, dimensiones y medidas](https://help.tableau.com/current/pro/desktop/en-us/datafields_typesandroles.htm) y [Data pane y campos generados](https://help.tableau.com/current/pro/desktop/en-us/datafields_understanddatawindow.htm): tipos, discreto/continuo, conteo de tabla.
- [Measure Names y Measure Values](https://help.tableau.com/current/pro/desktop/en-gb/datafields_understanddatawindow_meavalues.htm): múltiples medidas.
- [Fuentes de datos y Custom SQL](https://help.tableau.com/current/pro/desktop/en-us/howto_connect.htm) y [Extracts](https://help.tableau.com/current/pro/desktop/en-us/extracting_data.htm): conexiones y extracciones.
- [Modelo de datos](https://help.tableau.com/current/online/en-us/datasource_datamodel.htm), [relaciones](https://help.tableau.com/current/pro/desktop/en-us/relate_tables.htm) y [preguntas sobre el modelo](https://help.tableau.com/current/pro/desktop/en-us/datasource_datamodel_faq.htm): granularidad, cardinalidad y multi-fact (2024.2+).
- [Joins](https://help.tableau.com/current/pro/desktop/en-us/joining_tables.htm), [unions](https://help.tableau.com/current/pro/desktop/en-us/union.htm) y [data blending](https://help.tableau.com/current/pro/desktop/en-us/multiple_connections.htm): combinación de datos.
- [Tipos de cálculos](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_understand.htm), [operadores](https://help.tableau.com/current/pro/desktop/en-us/functions_operators.htm) y [funciones por categoría](https://help.tableau.com/current/pro/desktop/en-us/functions_all_categories.htm): sintaxis y funciones, agregaciones, nulos y conversiones.
- [Funciones de texto](https://help.tableau.com/current/pro/desktop/en-us/functions_functions_string.htm) y [funciones de fecha](https://help.tableau.com/current/pro/desktop/en-us/functions_functions_date.htm): cadenas, fechas y soporte según conector.
- [Filtros](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm), [filtros de contexto](https://help.tableau.com/current/pro/desktop/en-us/filtering_context.htm) y [orden de operaciones](https://help.tableau.com/current/pro/desktop/en-us/order_of_operations.htm): Top N, filtros y secuencia.
- [Show Me](https://help.tableau.com/current/pro/desktop/en-us/buildauto_showme.htm) y [Analytics pane](https://help.tableau.com/current/pro/desktop/en-us/environ_workspace_analytics_pane.htm): vistas y herramientas analíticas.
- [Cálculos de tabla](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations.htm), [configuración avanzada](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_custom.htm) y [funciones de cálculo de tabla](https://help.tableau.com/current/pro/desktop/en-us/functions_functions_tablecalculation.htm): Compute Using, acumulados, ranking y ventanas.
- [LOD](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod.htm), [LOD y filtros](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod_filters.htm) y [elegir tipo de cálculo](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_understand_which.htm): FIXED, INCLUDE, EXCLUDE.
- [Acciones](https://help.tableau.com/current/pro/desktop/en-us/actions.htm), [acciones de parámetros](https://help.tableau.com/current/pro/desktop/en-us/actions_parameters.htm), [Viz in Tooltip](https://help.tableau.com/current/pro/desktop/en-us/viz_in_tooltip.htm) y [visibilidad dinámica](https://help.tableau.com/current/pro/desktop/es-es/dynamic_zone_visibility.htm): interactividad y diferencias de versión.
- [Referencias y distribuciones](https://help.tableau.com/current/pro/desktop/en-us/reference_lines.htm), [tendencias](https://help.tableau.com/current/pro/desktop/en-us/trends.htm) y [forecast](https://help.tableau.com/current/pro/desktop/en-us/forecasting.htm): análisis estadístico.
- [Tableau Prep](https://help.tableau.com/current/prep/en-us/prep_welcome.htm), [limpieza](https://help.tableau.com/current/prep/en-us/prep_clean.htm), [flujos](https://help.tableau.com/current/prep/en-us/prep_build_flow.htm) y [agregar, unir y combinar](https://help.tableau.com/current/prep/en-us/prep_combine.htm): transformación y salidas.
- [Publicar workbook](https://help.tableau.com/current/pro/desktop/en-us/publish_workbooks_howto.htm), [preparación para publicar](https://help.tableau.com/current/pro/desktop/en-us/publish_workbooks_prepare.htm), [permisos](https://help.tableau.com/current/pro/desktop/en-us/publish_workbooks_permissions_add.htm) y [refrescos programados](https://help.tableau.com/current/pro/desktop/en-us/publish_workbooks_schedules.htm): publicación, recursos y acceso.
- [Performance Recorder](https://help.tableau.com/current/pro/desktop/en-us/perf_record_create_desktop.htm): medición de rendimiento.
- [REST API](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm) y [Embedding API](https://help.tableau.com/current/api/embedding_api/en-us/index.html): integraciones y automatización.

- [Crear parámetros](https://help.tableau.com/current/pro/desktop/en-us/parameters_create.htm) y [layouts por dispositivo](https://help.tableau.com/current/pro/desktop/en-us/dashboards_dsd_create.htm): controles y diseño adaptable.
- [Eliminar duplicados en Prep](https://help.tableau.com/current/prep/en-us/prep_remove_duplicates.htm) y [cálculos de Prep](https://help.tableau.com/current/prep/en-us/prep_calculations.htm): sintaxis de partición y orden.
- [Opciones de seguridad por fila](https://help.tableau.com/current/server/en-us/rls_options_overview.htm) y [proteger filtros de usuario](https://help.tableau.com/current/pro/desktop/en-us/publish_userfilters_create.htm): requisitos de seguridad.
- [Extensiones analíticas](https://help.tableau.com/current/pro/desktop/en-us/r_connection_manage.htm): conexión a servicios externos y funciones SCRIPT.
