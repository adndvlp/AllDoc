# Power BI

**Clave** `powerbi`

**Área** Análisis de datos (ubicación propuesta en AllDoc).

**Resumen** Prepara datos, construye modelos semánticos, calcula métricas con DAX y diseña, publica y mantiene informes interactivos.

**Alcance** Power BI para Data Analyst y Business Analyst Jr: preparación con Power Query y M, modelado relacional, DAX, visualización, análisis, publicación, seguridad y actualización. Incluye extensiones de rendimiento, desarrollo y Fabric como referencia avanzada. Se toma como referencia el temario PL-300 del 20 de abril de 2026, sin convertirlo en una lista de requisitos universales de contratación ni en un catálogo de todas las funciones DAX/M.

**Entorno** Power BI Desktop para Windows, Power BI Service en navegador y, cuando se indique, Microsoft Fabric, Report Builder o herramientas externas. Los ejemplos DAX usan separadores de argumentos con coma y nombres de funciones en inglés; si se habilitan separadores regionales, adapta las comas. M distingue mayúsculas de minúsculas. Los resultados son esperados, calculados sobre los datos de abajo; no se ejecutaron en Power BI. Los nombres de menús se indican en español o inglés según el contexto y pueden variar según versión, idioma, licencia o configuración. En macOS, para los pasos de Desktop se necesita un entorno Windows; el Service no sustituye todas sus funciones.

## Datos compartidos

**Modelo de ventas**

Crea estas tablas con **Inicio > Introducir datos** (Enter data), copiando cada bloque CSV a una hoja de cálculo y pegando las celdas, o guardándolo como CSV UTF-8 e importándolo. Conserva los nombres exactos. Las celdas vacías representan `null` en Power Query y `BLANK()` en el modelo. En Power Query asigna enteros a identificadores y cantidad, fecha a Fecha, Envio y MesInicio, texto a nombres y estado, número decimal fijo a Precio, Costo y Meta. No elimines registros del modelo base durante las prácticas: usa consultas de referencia separadas o un archivo de prueba.

**Clientes**

```csv
ClienteID,Nombre,Pais,Ciudad
1,Ana,Mexico,Ciudad de Mexico
2,Luis,Espana,Madrid
3,Marta,Mexico,Guadalajara
4,Diego,,
```

**Productos**

```csv
ProductoID,Producto,Categoria,Costo
1,Mouse,Tecnologia,40
2,Teclado,Tecnologia,50
3,Silla,Muebles,70
```

**Pedidos** (una fila por pedido; cada pedido contiene un único tipo de producto en este dataset simplificado).

```csv
PedidoID,ClienteID,ProductoID,Fecha,Envio,Cantidad,Precio,Estado
1,1,1,2025-01-10,2025-01-12,1,100,completed
2,2,2,2025-02-10,2025-02-12,2,100,completed
3,1,1,2026-01-05,2026-01-07,2,60,completed
4,2,2,2026-01-10,2026-01-13,1,80,completed
5,3,1,2026-01-12,,1,50,cancelled
6,1,3,2026-02-05,2026-02-06,3,100,completed
7,3,2,2026-02-10,2026-02-12,1,150,completed
8,3,3,2026-02-10,2026-02-13,1,150,completed
```

**Metas** (una fila por mes; no unir directamente con Pedidos).

```csv
MesInicio,Meta
2026-01-01,250
2026-02-01,500
```

**Sucios** (consulta auxiliar, desactiva su carga al modelo; fuerza inicialmente todas las columnas como texto). La última celda vacía representa `null`.

```csv
Id,Nombre,Importe,Pais,Codigo
1, Ana ,100,Mexico,MX-01
2,LUIS,200,Espana,ES-02
2,LUIS,200,Espana,ES-02
3,Marta,error,,MX-03
4,Diego,50,México,
```

**PresupuestoAncho** (auxiliar para pivot/unpivot):

```csv
Categoria,Enero,Febrero
Tecnologia,150,200
Muebles,100,300
```

**Accesos** (solo para prueba de RLS dinámico):

```csv
UPN,Pais
ana@example.com,Mexico
luis@example.com,Espana
```

**Preparación del modelo**

En vista Modelo crea relaciones activas `Clientes[ClienteID] (1) → Pedidos[ClienteID] (*)` y `Productos[ProductoID] (1) → Pedidos[ProductoID] (*)`, con filtro único desde dimensión a hechos. Crea la siguiente tabla DAX desde Modelado > Nueva tabla (el código se explica en el grupo de calendario):

```dax
Calendario = CALENDAR(DATE(2025,1,1), DATE(2026,12,31))
```

Marca `Calendario` como tabla de fechas usando `Date`; relaciona `Calendario[Date] (1)` con `Pedidos[Fecha] (*)` y `Metas[MesInicio] (*)` en dirección única. Crea también una relación **inactiva** con `Pedidos[Envio]` para los ejemplos correspondientes. Aunque Metas solo tiene dos filas, fija la cardinalidad 1:* con Calendario en el lado 1. Las metas se interpretan por mes, no como objetivos diarios. Crea las columnas de calendario cuando llegues al grupo correspondiente (Año, Mes, MesN, AñoMes, AñoMesN); desactiva la fecha automática si usas la dimensión común. Las tablas auxiliares quedan desconectadas.

**Medidas de referencia**

Crea cada medida por separado mediante Modelado > Nueva medida, en la tabla Pedidos; las explicaciones aparecen en sus grupos respectivos. No crees dos medidas con el mismo nombre; cada ejemplo alternativo se crea con un nombre distinto o reemplaza temporalmente la definición. Salvo indicación, evalúa sin filtros adicionales, utilizando tarjetas para escalares, tablas o matrices para resultados por dimensión. En los ejemplos que crean tablas o columnas, usa Nueva tabla o Nueva columna, no Nueva medida. Las medidas se escriben entre corchetes; las columnas con `Tabla[Columna]`. Usa `Calendario[AñoMes]` ordenado por `Calendario[AñoMesN]` para mostrar meses.

```dax
Importe = SUMX(Pedidos, Pedidos[Cantidad] * Pedidos[Precio])
Ventas = CALCULATE([Importe], Pedidos[Estado] = "completed")
Pedidos total = COUNTROWS(Pedidos)
Pedidos completados = CALCULATE([Pedidos total], Pedidos[Estado] = "completed")
Ticket = DIVIDE([Ventas], [Pedidos completados])
Objetivo = SUM(Metas[Meta])
```

Controles sin filtros: 8 pedidos, 7 completados, importe 1150, ventas completadas 1100, ticket 157.14 redondeado. México 820, España 280; Ana 520, Luis 280, Marta 300, Diego sin ventas. Tecnología 650, Muebles 450. Enero 2026: 200; febrero 2026: 600; enero 2025: 100; febrero 2025: 200. Las cifras monetarias están en una sola moneda ficticia. Las fórmulas de ventas sustituyen cualquier filtro directo de Estado por `completed`; si se requiere intersectarlo, usa `KEEPFILTERS`.

Los ejemplos de limpieza usan la consulta auxiliar original y los de servicio/infraestructura requieren los recursos explícitamente indicados; no se afirma que esos recursos existan. En cada ejemplo independiente vuelve al estado inicial si has aplicado pasos de otro ejemplo.

## Power BI y flujo de trabajo

**Clave** `power-bi-y-flujo-de-trabajo`

### Definición

**Clave** `definicion`

**Definición** Power BI transforma datos de distintos orígenes en informes interactivos. Desktop sirve para desarrollar modelos e informes; Service permite distribuirlos y gestionarlos.

**Búsqueda** qué es Power BI, Desktop, Service, flujo ETL

**Para recordar** Obtener datos → transformar → modelar → visualizar → publicar.

#### Crear un informe local

1. Abre Desktop y carga Pedidos con Introducir datos.
2. Añade una tabla visual con PedidoID y Estado.
3. Guarda el archivo PBIX.

**Resultado esperado** Ocho filas de pedidos en un informe local; aún no está publicado.

### Vistas de Desktop

**Clave** `vistas-de-desktop`

**Definición** Las vistas Informe, Tabla y Modelo permiten diseñar visuales, inspeccionar datos y configurar relaciones respectivamente.

**Búsqueda** report view, data view, model view

**Para recordar** Cada vista resuelve una tarea diferente.

#### Inspeccionar el modelo

1. Abre vista Tabla y selecciona Clientes.
2. Cambia a Modelo y localiza Clientes y Pedidos.

**Resultado esperado** Cuatro registros de clientes y una relación 1:* si ya preparaste el modelo.

### PBIX y modelo semántico

**Clave** `pbix-y-modelo-semantico`

**Definición** PBIX es el archivo habitual de Desktop. El modelo semántico contiene tablas, relaciones, medidas y metadatos que pueden reutilizar los informes.

**Búsqueda** pbix, dataset, semantic model

**Para recordar** El informe consume el modelo; no es el modelo.

#### Guardar un informe

1. Archivo > Guardar como > Ventas.pbix.
2. Cierra y reabre el archivo.

**Resultado esperado** Conserva las páginas, consultas y modelo local según el modo de conexión.

### Import, DirectQuery y Direct Lake

**Clave** `import-directquery-y-direct-lake`

**Definición** Import copia datos al modelo; DirectQuery consulta un origen compatible al interactuar; Direct Lake usa tablas Delta de OneLake con los requisitos de Fabric.

**Búsqueda** modos de almacenamiento, Direct Lake, DirectQuery, import

**Para recordar** Import necesita actualización; DirectQuery depende del origen; Direct Lake requiere Fabric.

**Nota** Direct Lake tiene variantes y condiciones de fallback; no significa que nunca se requiera procesamiento ni que toda fuente sea compatible.

#### Elegir modo para un CSV

1. Conecta Pedidos.csv desde Obtener datos.
2. Comprueba el modo en las propiedades de la tabla.

**Resultado esperado** La tabla usa Import; un CSV no ofrece DirectQuery ni Direct Lake.

### Conexión a modelo compartido

**Clave** `conexion-a-modelo-compartido`

**Definición** Un informe puede reutilizar un modelo semántico publicado en lugar de importar de nuevo sus tablas.

**Búsqueda** live connection, thin report, modelo compartido

**Para recordar** Reutiliza métricas corporativas antes de duplicarlas.

**Nota** Requiere acceso al modelo del Service.

#### Crear informe conectado

1. En Desktop, Obtener datos > Modelos semánticos de Power BI.
2. Selecciona un modelo de prueba publicado con permiso Build.
3. Crea una tarjeta de Ventas.

**Resultado esperado** La tarjeta usa la medida del modelo publicado, si existe.

## Conexiones y carga

**Clave** `conexiones-y-carga`

### Definición

**Clave** `definicion`

**Definición** Obtener datos abre conectores; Transformar datos permite preparar los datos antes de cargarlos.

**Búsqueda** get data, conectar origen, load

**Para recordar** Transformar prepara; cargar incorpora al modelo.

#### Importar clientes

1. Inicio > Obtener datos > Texto/CSV.
2. Selecciona Clientes.csv y revisa la vista previa.
3. Pulsa Transformar datos; establece ClienteID como entero.

**Resultado esperado** Cuatro filas en Power Query.

### Excel y CSV

**Clave** `excel-y-csv`

**Definición** Excel permite seleccionar hojas o tablas; CSV requiere interpretar delimitador, codificación y encabezados.

**Búsqueda** importar excel csv, delimitador, UTF-8

**Para recordar** Revisa encabezados y tipos, no confíes solo en la detección.

#### Importar CSV de productos

1. Obtén Productos.csv; selecciona delimitador coma y UTF-8.
2. Verifica las cuatro columnas; carga.

**Resultado esperado** Tres productos con sus costes.

### Bases de datos

**Clave** `bases-de-datos`

**Definición** Los conectores SQL Server, PostgreSQL y MySQL solicitan servidor, base y autenticación. El soporte de modos depende del conector.

**Búsqueda** SQL Server, PostgreSQL, MySQL, SQL connector

**Para recordar** No todos los conectores ofrecen los mismos modos.

**Nota** Requiere servidor y controlador cuando el conector lo solicite; consulta compatibilidad oficial.

#### Conectar SQL Server

1. Con una base de pruebas que contenga Pedidos, selecciona SQL Server.
2. Introduce servidor, base y credenciales de solo lectura.
3. Selecciona Import y la tabla Pedidos.

**Resultado esperado** Vista previa de la tabla del servidor; si contiene los datos compartidos, ocho filas.

### Carpetas y combinar archivos

**Clave** `carpetas-y-combinar-archivos`

**Definición** El conector Folder reúne archivos con estructura compatible y aplica una transformación común.

**Búsqueda** folder, combine files, combinar CSV

**Para recordar** Mismo esquema y archivos válidos antes de combinar.

#### Consolidar dos meses

1. Guarda los pedidos 3–5 en enero.csv y 6–8 en febrero.csv con mismos encabezados en una carpeta vacía.
2. Obtener datos > Carpeta > Combinar y transformar.
3. Verifica tipos y origen del archivo.

**Resultado esperado** Seis pedidos de 2026.

### Web, JSON y API

**Clave** `web-json-y-api`

**Definición** El conector Web obtiene recursos HTTP; Power Query puede convertir listas y registros JSON en tablas.

**Búsqueda** web connector, API REST, JSON, expand

**Para recordar** Primero identifica estructura, autenticación y paginación.

**Nota** Una API real requiere endpoint, credenciales y paginación según su contrato; no incrustes secretos en M.

#### Expandir JSON local de prueba

1. Crea una consulta en blanco, Editor avanzado, pega `let Fuente = Json.Document("[{""id"":1,""ventas"":100},{""id"":2,""ventas"":200}]"), Tabla = Table.FromRecords(Fuente) in Tabla`. 

**Resultado esperado** Dos filas con id y ventas.

### Credenciales y privacidad

**Clave** `credenciales-y-privacidad`

**Definición** La configuración del origen gestiona autenticación y niveles de privacidad que controlan combinación de datos.

**Búsqueda** data source settings, privacy, credentials

**Para recordar** Un acceso local válido no garantiza acceso desde Service.

#### Revisar credenciales

1. Archivo > Opciones y configuración > Configuración de origen de datos.
2. Selecciona el origen CSV de prueba y revisa permisos.

**Resultado esperado** Puedes identificar el origen y sus permisos actuales; no cambia el modelo si cancelas.

## Editor de Power Query

**Clave** `editor-de-power-query`

### Definición

**Clave** `definicion`

**Definición** Power Query registra transformaciones como pasos de una consulta M que se repiten al actualizar.

**Búsqueda** power query editor, applied steps, ETL

**Para recordar** Los pasos modifican la consulta, no el archivo original.

#### Observar un paso

1. Transformar datos > Sucios.
2. Renombra temporalmente Codigo como Referencia.
3. Selecciona el paso anterior en Pasos aplicados.

**Resultado esperado** El paso anterior muestra Codigo; el nuevo muestra Referencia.

### Tipos y configuración regional

**Clave** `tipos-y-configuracion-regional`

**Definición** Los tipos controlan cómo se interpretan y calculan los datos; la configuración regional define separadores y formatos de entrada.

**Búsqueda** data type, using locale, fecha decimal

**Para recordar** Una fecha aparente puede ser texto.

#### Interpretar fecha regional

1. Crea una consulta con una columna de texto `31/12/2026`.
2. Cambiar tipo > Usar configuración regional > Fecha, Español (México).

**Resultado esperado** Fecha 31 de diciembre de 2026.

### Promover encabezados

**Clave** `promover-encabezados`

**Definición** Convierte la primera fila en nombres de columnas cuando el origen no los reconoce.

**Búsqueda** use first row as headers, promote headers

**Para recordar** No promuevas dos veces un archivo ya encabezado.

#### Reparar encabezados

1. Crea tabla sin encabezado con primera fila Id, Nombre y segunda 1, Ana.
2. Inicio > Usar primera fila como encabezados.

**Resultado esperado** Columnas Id y Nombre, una fila con 1 y Ana.

### Seleccionar y eliminar columnas

**Clave** `seleccionar-y-eliminar-columnas`

**Definición** Conserva solo campos necesarios para evitar ruido y reducir tamaño del modelo.

**Búsqueda** choose columns, remove columns

**Para recordar** Elimina lo que no se usa, no claves necesarias.

#### Reducir una consulta

1. En referencia de Clientes, Elegir columnas > ClienteID, Pais.

**Resultado esperado** Cuatro filas y dos columnas.

### Filtrar, ordenar y conservar filas

**Clave** `filtrar-ordenar-y-conservar-filas`

**Definición** Los filtros excluyen registros; ordenar cambia la vista previa y operaciones dependientes de posición.

**Búsqueda** filter rows, sort, keep rows, remove rows

**Para recordar** Power Query filtra antes de cargar, no al interactuar con informe.

#### Conservar pedidos completados

1. En referencia de Pedidos, filtra Estado=completed.
2. Ordena PedidoID ascendente.

**Resultado esperado** Siete filas; se excluye pedido 5.

### Índice de filas

**Clave** `indice-de-filas`

**Definición** Agrega una numeración a partir de 0 o 1; depende del orden previo de la consulta.

**Búsqueda** index column, identificador

**Para recordar** Un índice generado no es una clave empresarial estable si cambia el orden.

#### Numerar productos

1. En referencia de Productos ordena ProductoID ascendente.
2. Agregar columna > Columna de índice > Desde 1.

**Resultado esperado** Índices 1, 2 y 3.

## Calidad y limpieza

**Clave** `calidad-y-limpieza`

### Definición

**Clave** `definicion`

**Definición** La limpieza corrige datos inconsistentes antes de usarlos en medidas o relaciones. El perfilado permite detectarlos.

**Búsqueda** data profiling, limpieza, calidad

**Para recordar** Inspecciona primero, transforma después.

#### Inspeccionar valores

1. En Sucios activa Vista > Calidad de columna, Distribución y Perfil.
2. Selecciona Importe.

**Resultado esperado** Cinco registros de texto, uno con valor literal error; aún no es un error de tipo.

### Nulos y reemplazo de valores

**Clave** `nulos-y-reemplazo-de-valores`

**Definición** Un nulo representa ausencia; reemplazarlo es una decisión de negocio, no equivalente automático a cero.

**Búsqueda** null, replace values, valores faltantes

**Para recordar** No confundir ausencia con importe cero.

#### Completar país desconocido

1. En una consulta en blanco usa `Table.ReplaceValue(Sucios, null, "Desconocido", Replacer.ReplaceValue, {"Pais"})` en Editor avanzado.

**Resultado esperado** Id 3 muestra Desconocido; conserva cinco filas.

### Duplicados

**Clave** `duplicados`

**Definición** Quitar duplicados conserva una fila por combinación de columnas elegidas. La selección de qué fila conservar puede no estar garantizada.

**Búsqueda** remove duplicates, distinct, clave duplicada

**Para recordar** Define qué columnas identifican la duplicidad.

#### Quitar registro repetido

1. En Sucios selecciona todas las columnas.
2. Inicio > Quitar filas > Quitar duplicados.

**Resultado esperado** Cuatro filas; desaparece una copia idéntica de Id 2.

### Errores de conversión

**Clave** `errores-de-conversion`

**Definición** Una conversión incompatible genera Error; se puede conservar, quitar o reemplazar tras revisar su causa.

**Búsqueda** replace errors, remove errors, errores de importación

**Para recordar** Un error no es lo mismo que null.

#### Detectar error numérico

1. En referencia de Sucios convierte Importe a entero.
2. Conservar errores en esa columna.

**Resultado esperado** Una fila, Id 3, porque error no se convierte a número.

### Trim, Clean y mayúsculas

**Clave** `trim-clean-y-mayusculas`

**Definición** Trim recorta espacios extremos; Clean elimina caracteres de control; cambiar mayúsculas normaliza texto.

**Búsqueda** trim, clean, upper, lower, proper

**Para recordar** Normalizar antes de comparar o combinar texto.

#### Normalizar nombres

1. En Sucios selecciona Nombre > Formato > Recortar; luego Poner en mayúscula cada palabra.

**Resultado esperado** Ana, Luis, Luis, Marta, Diego.

### Fill Down y Fill Up

**Clave** `fill-down-y-fill-up`

**Definición** Rellenar hacia abajo o arriba copia el valor no nulo más cercano en la dirección elegida.

**Búsqueda** fill down, fill up, rellenar

**Para recordar** Orden y significado del bloque importan.

#### Rellenar encabezados de grupo

1. Crea tabla `Categoria,Valor` con filas A,10; null,20; B,30; null,40.
2. Rellenar hacia abajo en Categoria.

**Resultado esperado** A, A, B, B; no altera Valor.

## Transformar columnas

**Clave** `transformar-columnas`

### Definición

**Clave** `definicion`

**Definición** Power Query puede derivar columnas o cambiar las existentes antes de construir el modelo.

**Búsqueda** transform columns, add column

**Para recordar** Transformar modifica una columna; agregar conserva la original.

#### Crear importe de línea

1. En referencia de Pedidos agrega columna personalizada ` [Cantidad] * [Precio] ` con nombre ImporteLinea y tipo decimal fijo.

**Resultado esperado** Pedido 3: 120; pedido 6: 300.

### Dividir y combinar columnas

**Clave** `dividir-y-combinar-columnas`

**Definición** Dividir usa delimitadores o posiciones; combinar concatena valores con un separador.

**Búsqueda** split column, merge columns

**Para recordar** Dividir y combinar columnas no es Merge Queries.

#### Separar código y número

1. En Sucios, divide Codigo por `-` en dos columnas.

**Resultado esperado** MX-01 produce MX y 01; conserva 01 como texto para no perder el cero.

### Extraer texto y reemplazar

**Clave** `extraer-texto-y-reemplazar`

**Definición** Extraer una parte o sustituir fragmentos permite estandarizar campos sin cambiar filas.

**Búsqueda** extract, replace, Text.Start

**Para recordar** Conserva texto original si necesitas auditar.

#### Extraer prefijo

1. En Sucios agrega columna personalizada `Text.Start([Codigo], 2)` con nombre Prefijo.

**Resultado esperado** Id 1: MX; Id 2: ES; Id 4: null.

### Columna condicional

**Clave** `columna-condicional`

**Definición** Evalúa reglas en orden para asignar una categoría por fila.

**Búsqueda** conditional column, if then else

**Para recordar** La primera condición verdadera determina el resultado.

#### Clasificar pedidos

1. En referencia de Pedidos agrega columna condicional: si Cantidad >= 2, Multiple; si no, Simple.

**Resultado esperado** Pedidos 2, 3 y 6 son Multiple; los demás Simple.

### Columna personalizada

**Clave** `columna-personalizada`

**Definición** Usa una expresión M para calcular un valor por fila.

**Búsqueda** custom column, fórmula M

**Para recordar** Usa `[Campo]` dentro de una expresión de fila.

#### Calcular coste de envío fijo por unidad

1. En referencia de Pedidos crea columna EnvioEstimado con `[Cantidad] * 5`.

**Resultado esperado** Pedido 6: 15.

### Columna a partir de ejemplos

**Clave** `columna-a-partir-de-ejemplos`

**Definición** Power Query infiere una transformación a partir de resultados introducidos manualmente.

**Búsqueda** column from examples, inferencia

**Para recordar** Revisa la expresión inferida y casos no mostrados.

#### Derivar prefijo de país

1. En Sucios selecciona Codigo > Agregar columna a partir de ejemplos > Desde selección.
2. Introduce MX para MX-01 y ES para ES-02; revisa la propuesta.

**Resultado esperado** La vista previa muestra los prefijos; acepta solo si también maneja MX-03 y null correctamente.

### Fechas en Power Query

**Clave** `fechas-en-power-query`

**Definición** Las transformaciones de fecha extraen componentes o calculan duraciones antes de cargar.

**Búsqueda** date year month, duration

**Para recordar** Una duración no es una fecha.

#### Calcular días de envío

1. En referencia de Pedidos agrega columna `if [Envio] = null then null else Duration.Days([Envio] - [Fecha])`.

**Resultado esperado** Pedido 4: 3; pedido 5: null.

## Agrupar y cambiar forma

**Clave** `agrupar-y-cambiar-forma`

### Definición

**Clave** `definicion`

**Definición** Power Query resume filas o reorganiza columnas. Estas operaciones cambian la granularidad de la consulta.

**Búsqueda** group by, pivot, unpivot, transpose

**Para recordar** Comprueba qué representa una fila después del cambio.

#### Resumir cantidades

1. En referencia de Pedidos, Agrupar por Estado, suma Cantidad.

**Resultado esperado** completed: 11; cancelled: 1.

### Group By

**Clave** `group-by`

**Definición** Agrupa por claves y calcula agregados como suma, recuento, promedio o todas las filas.

**Búsqueda** group by, agregación M

**Para recordar** Una fila por combinación de claves.

#### Contar pedidos por cliente

1. En Pedidos de referencia, Agrupar por ClienteID, operación Contar filas.

**Resultado esperado** Cliente 1: 3; 2: 2; 3: 3.

### Unpivot

**Clave** `unpivot`

**Definición** Convierte encabezados de columnas en valores de una columna de atributos y sus celdas en otra columna.

**Búsqueda** unpivot, anular dinamización

**Para recordar** Útil para transformar meses en filas.

#### Normalizar presupuesto

1. En PresupuestoAncho selecciona Categoria > Anular dinamización de otras columnas.
2. Renombra Attribute a Mes y Value a Meta.

**Resultado esperado** Cuatro filas: Tecnología enero 150, febrero 200; Muebles enero 100, febrero 300 (nombres del dataset sin acento).

### Pivot

**Clave** `pivot`

**Definición** Convierte los valores de una columna en encabezados. Si hay varias filas por celda, requiere una agregación.

**Búsqueda** pivot column, dinamizar

**Para recordar** Antes de pivotar define cómo resolver duplicados.

#### Recuperar meses como columnas

1. Sobre resultado de Unpivot, selecciona Mes > Columna dinámica, valores Meta, agregación Suma.

**Resultado esperado** Dos filas y columnas Categoria, Enero, Febrero.

### Transpose

**Clave** `transpose`

**Definición** Intercambia filas y columnas; no equivale a pivotar por una clave.

**Búsqueda** transpose, transponer

**Para recordar** Después revisa encabezados y tipos.

#### Transponer una matriz

1. Crea tabla con columnas A,B y filas 1,2 y 3,4.
2. Transformar > Transponer.

**Resultado esperado** Dos filas: 1,3 y 2,4.

## Combinar consultas

**Clave** `combinar-consultas`

### Definición

**Clave** `definicion`

**Definición** Merge une columnas mediante claves; Append apila filas alineando nombres de columnas.

**Búsqueda** merge queries, append queries

**Para recordar** Merge se parece a JOIN; Append a UNION ALL.

#### Enriquecer pedidos

1. En referencia de Pedidos, Combinar consultas con Productos por ProductoID, Left outer.
2. Expande Categoria.

**Resultado esperado** Ocho filas; pedido 1 tiene Tecnologia.

### Merge y tipos de unión

**Clave** `merge-y-tipos-de-union`

**Definición** Left outer conserva izquierda; inner solo coincidencias; right/full outer y anti-joins cubren otros casos.

**Búsqueda** left outer, inner, right, full, anti join

**Para recordar** El tipo de unión determina qué filas sobreviven.

#### Encontrar clientes sin pedido

1. Combinar Clientes con Pedidos por ClienteID, Left anti.

**Resultado esperado** Una fila: Diego, ClienteID 4.

### Expandir tablas y registros

**Clave** `expandir-tablas-y-registros`

**Definición** Merge produce una columna de tablas anidadas que se expande para incorporar campos.

**Búsqueda** expand table, record, nested table

**Para recordar** Una coincidencia múltiple puede aumentar las filas.

#### Expandir pedidos de clientes

1. Merge Clientes con Pedidos mediante Left outer.
2. Expande PedidoID, sin prefijo si quieres.

**Resultado esperado** Nueve filas: ocho pedidos y Diego con PedidoID null.

### Append

**Clave** `append`

**Definición** Combina filas por nombre de columna y rellena con null los campos ausentes.

**Búsqueda** append queries, anexar

**Para recordar** No une por clave ni por posición de columnas.

#### Unir meses

1. Crea referencias Enero y Febrero filtradas a 2026 y a su mes correspondiente.
2. Anexar consultas como nueva: Enero y Febrero.

**Resultado esperado** Seis filas, con todas las columnas de Pedidos.

### Fuzzy Merge

**Clave** `fuzzy-merge`

**Definición** Busca coincidencias aproximadas entre columnas de texto; usa umbral configurable y revisión humana.

**Búsqueda** fuzzy matching, coincidencia aproximada

**Para recordar** No uses fuzzy como prueba definitiva de identidad.

#### Revisar variantes de país

1. Crea tabla de referencia con Mexico y Espana.
2. Combina Sucios[Pais] con esa tabla habilitando coincidencia aproximada.
3. Inspecciona coincidencias y ajusta umbral.

**Resultado esperado** Puedes revisar candidatos como México/Mexico; el resultado exacto depende de configuración y cultura.

## Organización y parámetros de consultas

**Clave** `organizacion-y-parametros-de-consultas`

### Definición

**Clave** `definicion`

**Definición** Las consultas pueden reutilizar pasos, aceptar parámetros y preparar tablas auxiliares sin cargarlas.

**Búsqueda** reference, duplicate, parameters, enable load

**Para recordar** Separa staging de las tablas del modelo.

#### Crear una consulta de staging

1. Duplica Sucios como StagingSucios.
2. Desactiva Habilitar carga para esa copia.

**Resultado esperado** La consulta permanece en el editor, sin una tabla adicional en el modelo.

### Reference y Duplicate

**Clave** `reference-y-duplicate`

**Definición** Reference parte del resultado de otra consulta; Duplicate copia sus pasos existentes.

**Búsqueda** referencia, duplicar

**Para recordar** Cambios en la consulta base afectan referencias, no copias independientes de sus pasos.

#### Comparar dependencia

1. Crea referencia R y duplicado D de Sucios.
2. En Sucios filtra Id=1.
3. Inspecciona R y D antes de deshacer el cambio.

**Resultado esperado** R tiene una fila; D mantiene cinco.

### Parámetros

**Clave** `parametros`

**Definición** Un parámetro es un valor configurable que una consulta puede consumir.

**Búsqueda** manage parameters, parámetro M

**Para recordar** Centraliza rutas, fechas o límites reutilizados.

#### Filtrar por importe

1. Crea parámetro decimal MinPrecio=100.
2. En referencia de Pedidos crea una consulta en blanco y usa `Table.SelectRows(Pedidos, each [Precio] >= MinPrecio)` en Editor avanzado.

**Resultado esperado** Cinco pedidos: 1, 2, 6, 7, 8.

### Habilitar carga y dependencias

**Clave** `habilitar-carga-y-dependencias`

**Definición** Desactivar carga evita crear una tabla de modelo, pero no impide que otras consultas usen ese resultado.

**Búsqueda** enable load, query dependencies

**Para recordar** Una consulta sin carga puede seguir siendo necesaria.

#### Conservar staging

1. Crea R como referencia de Sucios y desactiva carga de Sucios.
2. Abre Vista > Dependencias de consulta.

**Resultado esperado** R sigue dependiendo de Sucios.

### Query Folding

**Clave** `query-folding`

**Definición** Intenta traducir transformaciones al lenguaje del origen, reduciendo trabajo local. Puede ser total, parcial o inexistente.

**Búsqueda** query folding, native query

**Para recordar** No todo paso ni origen permite folding.

**Nota** Requiere origen compatible; CSV no ejecuta SQL remoto.

#### Comprobar filtro SQL

1. Conecta una tabla de prueba a SQL Server.
2. Aplica filtro Estado=completed.
3. Revisa Ver consulta nativa si está disponible en el paso.

**Resultado esperado** Puede aparecer una consulta SQL con filtro; un menú deshabilitado no demuestra por sí solo ausencia de folding.

### Query Diagnostics

**Clave** `query-diagnostics`

**Definición** Registra actividad y tiempos de evaluación de Power Query para investigar cuellos de botella.

**Búsqueda** query diagnostics, diagnóstico

**Para recordar** Mide antes de optimizar.

#### Medir transformación

1. En Editor de Power Query abre Herramientas > Iniciar diagnóstico.
2. Actualiza vista previa de una consulta.
3. Detén diagnóstico.

**Resultado esperado** Consultas de diagnóstico con eventos y duraciones, dependientes del entorno.

## Lenguaje M

**Clave** `lenguaje-m`

### Definición

**Clave** `definicion`

**Definición** M expresa los pasos de Power Query mediante valores, funciones y expresiones `let…in`. Se evalúa durante preparación y actualización.

**Búsqueda** lenguaje M, advanced editor, let in

**Para recordar** M prepara datos; DAX calcula sobre el modelo.

#### Filtrar desde M

```powerquery
let
    Fuente = Pedidos,
    Filtrado = Table.SelectRows(Fuente, each [Estado] = "completed")
in
    Filtrado
```

**Resultado esperado** Siete filas en una consulta en blanco distinta de Pedidos.

### let, in y pasos

**Clave** `let-in-y-pasos`

**Definición** `let` nombra expresiones; `in` define el resultado devuelto. Los nombres con espacios se escriben `#"Nombre"`.

**Búsqueda** let in, applied steps, sintaxis M

**Para recordar** El último paso devuelto lo determina in.

#### Devolver columnas seleccionadas

```powerquery
let
    Fuente = Clientes,
    #"Solo pais" = Table.SelectColumns(Fuente, {"Pais"})
in
    #"Solo pais"
```

**Resultado esperado** Cuatro filas, columna Pais.

### Listas, registros y tablas

**Clave** `listas-registros-y-tablas`

**Definición** M usa listas `{}`, registros `[]` y tablas de filas y columnas.

**Búsqueda** list record table, #table

**Para recordar** Una lista no tiene nombres de campo; un registro sí.

#### Construir tabla pequeña

```powerquery
Table.FromRecords({[Id=1, Importe=100], [Id=2, Importe=200]})
```

**Resultado esperado** Tabla de dos filas, Id e Importe.

### each y funciones personalizadas

**Clave** `each-y-funciones-personalizadas`

**Definición** `each` abrevia una función de un argumento; una función explícita usa `(x) => expresión`.

**Búsqueda** each, custom function, lambda

**Para recordar** Reutiliza lógica mediante funciones.

#### Aplicar tarifa a cantidades

```powerquery
let
    Tarifa = (n as number) as number => n * 5,
    Resultado = Table.AddColumn(Pedidos, "Tarifa", each Tarifa([Cantidad]), type number)
in
    Resultado
```

**Resultado esperado** Pedido 6: Tarifa 15.

### try otherwise

**Clave** `try-otherwise`

**Definición** Captura un error de evaluación y devuelve una alternativa definida.

**Búsqueda** try otherwise, error handling

**Para recordar** No ocultes errores sin registrar su causa.

#### Convertir texto inválido

```powerquery
Table.AddColumn(Sucios, "ImporteValido", each try Number.FromText([Importe], "en-US") otherwise null, type nullable number)
```

**Resultado esperado** Id 3: null; Id 1: 100.

### Funciones Table, Text, Number, Date

**Clave** `funciones-table-text-number-date`

**Definición** Las bibliotecas de M agrupan funciones según el tipo de valor.

**Búsqueda** Table.SelectRows, Text.Trim, Number.Round, Date.Year

**Para recordar** Comprueba el tipo de entrada y de salida.

#### Obtener año y redondeo

```powerquery
[Nombre=Text.Trim(" Ana "), Anio=Date.Year(#date(2026,2,5)), Importe=Number.Round(12.344,2)]
```

**Resultado esperado** Registro con Ana, 2026 y 12.34.

## Modelo dimensional

**Clave** `modelo-dimensional`

### Definición

**Clave** `definicion`

**Definición** Un modelo estrella separa dimensiones descriptivas de hechos medibles y los conecta mediante claves.

**Búsqueda** star schema, facts, dimensions

**Para recordar** Las dimensiones filtran; los hechos se agregan.

#### Construir una estrella

1. En Modelo coloca Pedidos al centro y Clientes, Productos, Calendario alrededor.
2. Verifica relaciones 1:* y filtro único.

**Resultado esperado** Clientes y Productos filtran Pedidos sin una relación directa entre dimensiones.

### Granularidad y claves

**Clave** `granularidad-y-claves`

**Definición** La granularidad dice qué representa una fila. Una clave identifica una fila o su dimensión relacionada.

**Búsqueda** grain, primary key, foreign key

**Para recordar** No mezcles granos sin controlar la duplicación.

#### Comprobar granularidad

1. Inspecciona Pedidos por PedidoID y Productos por ProductoID.
2. Compara con Metas por MesInicio.

**Resultado esperado** Pedidos tiene ocho IDs únicos; Metas tiene dos meses y no una fila por pedido.

### Dimensiones y hechos

**Clave** `dimensiones-y-hechos`

**Definición** Las dimensiones describen entidades y los hechos registran eventos o mediciones.

**Búsqueda** fact table, dimension table

**Para recordar** Nombre y categoría son atributos; cantidad y precio son datos del hecho.

#### Analizar ventas por categoría

1. Crea tabla visual con Productos[Categoria] y medida Ventas.

**Resultado esperado** Tecnologia 650; Muebles 450.

### Propiedades del modelo

**Clave** `propiedades-del-modelo`

**Definición** Ocultar claves, fijar formatos, categorías de datos y resumen predeterminado facilita el autoservicio.

**Búsqueda** hide fields, format, summarize by, data category

**Para recordar** Un ID numérico no es una métrica.

#### Configurar ClienteID

1. En vista Modelo selecciona Clientes[ClienteID].
2. Configura No resumir y oculta el campo de vista de informe si no se usa.

**Resultado esperado** El campo no se propone como suma y queda oculto al consumidor; la relación sigue funcionando.

### Jerarquías y ordenar por columna

**Clave** `jerarquias-y-ordenar-por-columna`

**Definición** Una jerarquía agrupa niveles; Ordenar por columna establece el orden lógico de etiquetas.

**Búsqueda** hierarchy, sort by column

**Para recordar** Mes textual debe ordenarse con un número compatible.

#### Ordenar meses

1. Tras crear Mes y MesN en Calendario, selecciona Mes > Ordenar por columna > MesN.
2. Crea jerarquía Año > Mes.

**Resultado esperado** Enero precede a febrero, no se ordena alfabéticamente.

### Normalización y dimensiones históricas

**Clave** `normalizacion-y-dimensiones-historicas`

**Definición** Una dimensión puede guardar solo el valor actual (SCD tipo 1) o versiones históricas (tipo 2) con clave sustituta y vigencia.

**Búsqueda** SCD, slowly changing dimension, surrogate key

**Para recordar** Tipo 2 necesita asociar cada hecho a su versión válida.

#### Modelar cambio de país

1. En un esquema de prueba define ClienteVersionID 10 para Ana/Mexico hasta 2025 y 11 para Ana/Espana desde 2026.
2. Asigna hechos según fecha y relaciona por ClienteVersionID.

**Resultado esperado** Pedidos de Ana de años distintos se atribuyen al país histórico correspondiente; no cambia el dataset base.

## Relaciones

**Clave** `relaciones`

### Definición

**Clave** `definicion`

**Definición** Las relaciones permiten propagar filtros entre tablas a partir de columnas compatibles. No materializan una tabla unida como Merge.

**Búsqueda** relationships, filter propagation

**Para recordar** Las relaciones definen caminos de filtro.

#### Filtrar pedidos por país

1. Crea tabla visual con Clientes[Pais] y Ventas.
2. Selecciona Mexico en segmentador.

**Resultado esperado** Ventas 820.

### Cardinalidad 1:1 y 1:*

**Clave** `cardinalidad-1-1-y-1`

**Definición** 1:* exige unicidad en el lado 1; 1:1 exige unicidad en ambos lados.

**Búsqueda** one to many, one to one, cardinality

**Para recordar** Una dimensión duplicada no puede ocupar el lado 1.

#### Validar relación de clientes

1. En Modelo revisa Clientes[ClienteID] a Pedidos[ClienteID].

**Resultado esperado** 1 en Clientes, * en Pedidos; ClienteID 1 tiene tres pedidos.

### Dirección de filtro

**Clave** `direccion-de-filtro`

**Definición** Single propaga normalmente desde dimensión a hechos; Both permite ambos sentidos y puede crear ambigüedad.

**Búsqueda** cross filter direction, bidirectional

**Para recordar** Usa dirección única por defecto.

#### Comprobar filtros

1. Con filtro Productos[Categoria]=Muebles, muestra Ventas y una tabla de Clientes sin medidas.

**Resultado esperado** Ventas 450; la dimensión Clientes no se filtra automáticamente por Pedidos en el modelo unidireccional.

### Relaciones activas e inactivas

**Clave** `relaciones-activas-e-inactivas`

**Definición** La activa se usa por defecto; una inactiva puede utilizarse en una medida con USERELATIONSHIP.

**Búsqueda** active inactive, relación de envío

**Para recordar** Fecha de pedido y fecha de envío representan roles distintos.

#### Revisar fechas

1. En Modelo localiza relaciones de Calendario con Fecha y Envio.

**Resultado esperado** Línea continua a Fecha y discontinua a Envio según preparación.

### Role-playing dimensions

**Clave** `role-playing-dimensions`

**Definición** Una dimensión con varios roles puede duplicarse como tablas separadas para filtrar cada rol independientemente.

**Búsqueda** role playing, fechas múltiples

**Para recordar** Usa dimensiones separadas si ambos roles deben filtrar simultáneamente.

#### Crear calendario de envío

1. En copia del modelo crea tabla CalendarioEnvio = Calendario.
2. Relaciona su Date con Pedidos[Envio] activamente y deja Calendario con Fecha.

**Resultado esperado** Dos segmentadores independientes, uno para fecha de pedido y otro de envío.

### Muchos a muchos y tablas puente

**Clave** `muchos-a-muchos-y-tablas-puente`

**Definición** Una tabla puente representa asociaciones entre entidades cuando una clave puede tener varios vínculos; controla filtros y duplicaciones.

**Búsqueda** many to many, bridge table

**Para recordar** No conectes hechos entre sí sin estudiar el grano.

**Nota** No se modifica el modelo compartido; para diseño completo revisa guía many-to-many.

#### Representar clientes y etiquetas

1. En modelo de prueba crea Etiquetas con A,B y puente con pares (1,A),(1,B),(2,A).
2. Relaciona dimensiones con puente; define propagación controlada hacia hechos para el análisis de etiquetas.

**Resultado esperado** Ana pertenece a dos etiquetas; sumar ventas por etiqueta puede contar su importe dos veces.

## Calendario

**Clave** `calendario`

### Definición

**Clave** `definicion`

**Definición** Una tabla de fechas continua y sin duplicados permite agrupar periodos y hacer inteligencia temporal.

**Búsqueda** date table, calendar, tabla fechas

**Para recordar** Usa un calendario común y completo.

#### Crear calendario continuo

```dax
Calendario = CALENDAR(DATE(2025,1,1), DATE(2026,12,31))
```

**Resultado esperado** 730 fechas, de 2025-01-01 a 2026-12-31.

### Año, mes y orden cronológico

**Clave** `ano-mes-y-orden-cronologico`

**Definición** Deriva atributos de la fecha y un orden numérico para etiquetas de mes.

**Búsqueda** YEAR, MONTH, FORMAT, sort

**Para recordar** AñoMes debe distinguir años.

**Nota** Crea cada columna por separado; ordena Mes por MesN y AñoMes por AñoMesN.

#### Crear columnas de calendario

```dax
Año = YEAR(Calendario[Date])
MesN = MONTH(Calendario[Date])
Mes = FORMAT(Calendario[Date], "mmmm", "es-MX")
AñoMes = FORMAT(Calendario[Date], "yyyy-MM")
AñoMesN = YEAR(Calendario[Date]) * 100 + MONTH(Calendario[Date])
```

**Resultado esperado** 2026-02-10: Año 2026, MesN 2, Mes febrero, AñoMes 2026-02, AñoMesN 202602.

### Marcar tabla de fechas

**Clave** `marcar-tabla-de-fechas`

**Definición** Identifica la columna de fecha única, continua y sin blancos para inteligencia temporal clásica.

**Búsqueda** mark as date table, auto date time

**Para recordar** No dependas de jerarquías automáticas para un modelo compartido.

#### Marcar Calendario

1. Selecciona Calendario > Herramientas de tabla > Marcar como tabla de fechas > Date.

**Resultado esperado** Calendario queda identificado como tabla de fechas.

### Calendario fiscal

**Clave** `calendario-fiscal`

**Definición** El año fiscal puede comenzar en un mes distinto de enero; crea atributos específicos sin alterar la fecha original.

**Búsqueda** fiscal year, fiscal quarter

**Para recordar** Define si el año se etiqueta por inicio o cierre.

#### Año fiscal que comienza en julio

```dax
AñoFiscalInicio = YEAR(Calendario[Date]) - IF(MONTH(Calendario[Date]) < 7, 1, 0)
```

**Resultado esperado** Febrero de 2026 pertenece al ejercicio iniciado en 2025.

## Cálculos en el modelo

**Clave** `calculos-en-el-modelo`

### Definición

**Clave** `definicion`

**Definición** DAX permite crear medidas, columnas y tablas calculadas. El tipo de cálculo determina cuándo se evalúa y qué devuelve.

**Búsqueda** DAX, medidas, calculated columns, calculated tables

**Para recordar** Medida dinámica; columna por fila; tabla como conjunto de filas.

#### Crear una medida

```dax
Pedidos total = COUNTROWS(Pedidos)
```

**Resultado esperado** Tarjeta con 8; con filtro Mexico, 6.

### Medidas explícitas e implícitas

**Clave** `medidas-explicitas-e-implicitas`

**Definición** Una medida explícita tiene fórmula y nombre; una implícita resume una columna directamente en un visual.

**Búsqueda** explicit measure, implicit measure

**Para recordar** Usa medidas explícitas para definiciones reutilizables.

#### Comparar cantidades

1. Arrastra Pedidos[Cantidad] a una tarjeta y selecciona Suma.
2. Crea otra tarjeta con medida `Unidades = SUM(Pedidos[Cantidad])`.

**Resultado esperado** Ambas muestran 12 sin filtros; la medida puede reutilizarse en otras fórmulas.

### Columnas calculadas

**Clave** `columnas-calculadas`

**Definición** Una columna DAX evalúa una expresión por fila y en Import almacena el resultado en el modelo.

**Búsqueda** new column, calculated column, row context

**Para recordar** Útil para clasificación o atributo por fila, no para totales dinámicos.

**Nota** Nueva columna en Pedidos.

#### Crear importe por pedido

```dax
ImporteLinea = Pedidos[Cantidad] * Pedidos[Precio]
```

**Resultado esperado** Pedido 3: 120; pedido 6: 300.

### Tablas calculadas

**Clave** `tablas-calculadas`

**Definición** Una tabla DAX devuelve filas y columnas derivadas del modelo; no se recalcula con cada segmentador.

**Búsqueda** new table, calculated table

**Para recordar** Nueva tabla, no Nueva medida.

**Nota** Consulta de demostración; no conectar esta tabla al modelo principal.

#### Materializar pedidos completados

```dax
Completados = FILTER(Pedidos, Pedidos[Estado] = "completed")
```

**Resultado esperado** Siete filas; no cambia al elegir un país en un segmentador.

### DAX frente a Power Query

**Clave** `dax-frente-a-power-query`

**Definición** M transforma datos antes de cargar; DAX calcula en el modelo y puede aprovechar su contexto y relaciones.

**Búsqueda** M vs DAX, ETL, cálculo

**Para recordar** Prepara atributos estables en origen o M; usa medidas para análisis dinámico.

#### Comparar un atributo y una métrica

1. En Power Query de referencia agrega `[Cantidad] * [Precio]`.
2. En el modelo usa Ventas en una tarjeta y filtra Mexico.

**Resultado esperado** La columna calcula importes por fila; la tarjeta cambia de 1100 a 820.

### Sintaxis y variables VAR / RETURN

**Clave** `sintaxis-y-variables-var-return`

**Definición** Una variable guarda un resultado dentro de una expresión y RETURN indica el valor final.

**Búsqueda** VAR, RETURN, sintaxis, referencias

**Para recordar** Una variable se evalúa en su contexto de definición.

#### Calcular ticket con variables

```dax
Ticket variable =
VAR Total = [Ventas]
VAR N = [Pedidos completados]
RETURN DIVIDE(Total, N)
```

**Resultado esperado** 157.14 con formato de dos decimales.

### Quick Measures

**Clave** `quick-measures`

**Definición** Las medidas rápidas generan fórmulas DAX a partir de una plantilla y campos seleccionados.

**Búsqueda** quick measure, medida rápida

**Para recordar** Lee la fórmula generada antes de reutilizarla.

#### Calcular una diferencia sin escribir toda la fórmula

1. Inicio o Modelado > Medida rápida; elige Diferencia en operaciones matemáticas, si está disponible.
2. Configura Ventas y Objetivo como valores y acepta.
3. Filtra febrero 2026.

**Resultado esperado** La diferencia es 100; la medida generada puede inspeccionarse y editarse.

## Agregaciones DAX

**Clave** `agregaciones-dax`

### Definición

**Clave** `definicion`

**Definición** Las agregaciones condensan un conjunto de filas en un valor que responde al contexto de filtro.

**Búsqueda** SUM, AVERAGE, COUNT, agregaciones

**Para recordar** El mismo cálculo cambia según los filtros.

#### Sumar cantidades

```dax
Unidades = SUM(Pedidos[Cantidad])
```

**Resultado esperado** 12 unidades incluyendo cancelados; 11 si filtras completed.

### SUM y AVERAGE

**Clave** `sum-y-average`

**Definición** SUM suma valores de una columna; AVERAGE calcula su media excluyendo blancos.

**Búsqueda** suma, promedio, SUM, AVERAGE

**Para recordar** AVERAGE(Precio) no equivale a ticket ni a precio ponderado.

**Nota** Crea medidas independientes.

#### Comparar precio y cantidad

```dax
Precio medio = AVERAGE(Pedidos[Precio])
Unidades = SUM(Pedidos[Cantidad])
```

**Resultado esperado** Precio medio 98.75; unidades 12.

### MIN y MAX

**Clave** `min-y-max`

**Definición** Devuelven el extremo inferior o superior de una columna en el contexto actual.

**Búsqueda** mínimo, máximo, MIN, MAX

**Para recordar** Los extremos también responden a filtros.

#### Obtener extremos de precio

```dax
Precio mínimo = MIN(Pedidos[Precio])
Precio máximo = MAX(Pedidos[Precio])
```

**Resultado esperado** 50 y 150 sin filtros.

### COUNT, COUNTA y COUNTROWS

**Clave** `count-counta-y-countrows`

**Definición** COUNT cuenta valores no blancos de tipos admitidos; COUNTA cuenta valores no blancos incluyendo booleanos; COUNTROWS cuenta filas de una tabla.

**Búsqueda** count, counta, countrows

**Para recordar** Para contar pedidos usa COUNTROWS; para un campo nullable comprueba blancos.

#### Contar pedidos enviados

```dax
Enviados = COUNT(Pedidos[Envio])
Filas pedidos = COUNTROWS(Pedidos)
```

**Resultado esperado** 7 fechas no blancas; 8 filas.

### DISTINCTCOUNT y DISTINCTCOUNTNOBLANK

**Clave** `distinctcount-y-distinctcountnoblank`

**Definición** DISTINCTCOUNT cuenta valores diferentes incluyendo BLANK; DISTINCTCOUNTNOBLANK excluye el blanco.

**Búsqueda** distinctcount, clientes únicos

**Para recordar** No confundas pedidos con compradores distintos.

#### Contar compradores

```dax
Compradores = DISTINCTCOUNT(Pedidos[ClienteID])
Países conocidos = DISTINCTCOUNTNOBLANK(Clientes[Pais])
```

**Resultado esperado** 3 compradores; 2 países conocidos.

### DISTINCT y VALUES

**Clave** `distinct-y-values`

**Definición** Ambas devuelven valores únicos de una columna; VALUES puede añadir el miembro en blanco por integridad referencial en relaciones.

**Búsqueda** distinct, values, tabla virtual

**Para recordar** Devuelven tablas, no un escalar.

**Nota** Nueva tabla; VALUES daría aquí los mismos estados.

#### Listar estados únicos

```dax
Estados = DISTINCT(Pedidos[Estado])
```

**Resultado esperado** Tabla calculada con completed y cancelled, sin orden garantizado.

### MEDIAN, desviación y percentiles

**Clave** `median-desviacion-y-percentiles`

**Definición** MEDIAN devuelve el valor central; STDEV.P mide dispersión poblacional; PERCENTILE.INC calcula un percentil interpolado inclusivo.

**Búsqueda** median, stdev, percentile, estadística

**Para recordar** La media puede cambiar mucho por valores extremos.

**Nota** Crea cada medida por separado. STDEV.P mide dispersión si las ocho filas son toda la población; STDEV.S si son una muestra.

#### Medir distribución de precios

```dax
Precio mediano = MEDIAN(Pedidos[Precio])
Percentil 75 precio = PERCENTILE.INC(Pedidos[Precio], 0.75)
```

**Resultado esperado** Mediana 100; percentil 75 = 112.5.

## Contexto de evaluación

**Clave** `contexto-de-evaluacion`

### Definición

**Clave** `definicion`

**Definición** El contexto de fila identifica una fila actual; el de filtro restringe las filas visibles para el cálculo.

**Búsqueda** row context, filter context, context transition

**Para recordar** Contexto de fila no es lo mismo que filtrar toda la tabla.

#### Observar contexto de filtro

1. Pon Ventas en tarjeta.
2. Añade segmentador Clientes[Pais], selecciona Mexico.

**Resultado esperado** La medida cambia de 1100 a 820 sin alterar las filas almacenadas.

### Row context

**Clave** `row-context`

**Definición** Una columna calculada o un iterador dispone de los valores de la fila que evalúa.

**Búsqueda** row context, fila actual

**Para recordar** Un contexto de fila por sí solo no filtra un SUM sobre toda la tabla.

**Nota** Nueva columna de Pedidos.

#### Multiplicar campos de la fila

```dax
ImporteFila = Pedidos[Cantidad] * Pedidos[Precio]
```

**Resultado esperado** Pedido 2 devuelve 200; pedido 4 devuelve 80.

### Filter context

**Clave** `filter-context`

**Definición** Filtros de visual, segmentadores, relaciones y fórmulas delimitan las filas para una medida.

**Búsqueda** filter context, contexto de filtro

**Para recordar** Una medida se evalúa por cada celda del visual.

#### Ventas por cliente

1. Tabla visual con Clientes[Nombre] y Ventas.
2. Activa Mostrar elementos sin datos si quieres ver Diego.

**Resultado esperado** Ana 520, Luis 280, Marta 300; Diego en blanco si se muestra.

### Context transition

**Clave** `context-transition`

**Definición** CALCULATE sin filtros convierte el contexto de fila activo en contexto de filtro; una llamada a una medida dentro de un contexto de fila realiza transición automáticamente.

**Búsqueda** context transition, calculate, contexto de transición

**Para recordar** Una agregación directa en columna no se limita por sí sola a la fila.

**Nota** Crea cada columna por separado; es un ejemplo didáctico, no sustituye una medida dinámica.

#### Comparar dos columnas de Clientes

```dax
Sin transición = SUM(Pedidos[Cantidad])
Con transición = CALCULATE(SUM(Pedidos[Cantidad]))
```

**Resultado esperado** Sin transición: 12 en cada cliente. Con transición: Ana 6, Luis 3, Marta 3, Diego BLANK.

### Totales y contexto

**Clave** `totales-y-contexto`

**Definición** El total de una medida se recalcula con el contexto del total; no siempre suma los valores visibles.

**Búsqueda** total matrix, non additive, average

**Para recordar** Un promedio global no es suma de promedios.

#### Revisar ticket total

1. En matriz usa Clientes[Nombre], Ventas y Ticket.

**Resultado esperado** Tickets Ana 173.33, Luis 140, Marta 150; total 157.14, no 463.33.

## Operadores, condiciones y blancos

**Clave** `operadores-condiciones-y-blancos`

### Definición

**Clave** `definicion`

**Definición** DAX incluye comparaciones, lógica y funciones condicionales para calcular o clasificar resultados.

**Búsqueda** IF, SWITCH, BLANK, operadores

**Para recordar** Define qué significa ausencia antes de sustituirla.

**Nota** Nueva columna en Pedidos.

#### Clasificar estado

```dax
Estado legible = IF(Pedidos[Estado] = "completed", "Completado", "Otro")
```

**Resultado esperado** Pedido 5: Otro; los demás Completado.

### AND, OR, NOT e IN

**Clave** `and-or-not-e-in`

**Definición** `&&` combina condiciones, `OR` o el operador de disyunción de dos barras verticales permiten alternativas, `NOT` niega y `IN` compara contra un conjunto.

**Búsqueda** and, or, not, in, operadores DAX

**Para recordar** Usa paréntesis para hacer explícita la precedencia.

**Nota** Nueva columna.

#### Marcar pedidos grandes completados

```dax
Grande completado = Pedidos[Cantidad] >= 2 && Pedidos[Estado] = "completed"
```

**Resultado esperado** TRUE para pedidos 2, 3 y 6; FALSE para el resto.

### IF y SWITCH

**Clave** `if-y-switch`

**Definición** IF elige dos ramas; SWITCH compara valores o condiciones ordenadas mediante SWITCH(TRUE(),…).

**Búsqueda** if, switch, case when

**Para recordar** Coloca primero la condición más restrictiva.

**Nota** Nueva columna.

#### Clasificar ticket por importe

```dax
Segmento pedido =
SWITCH(TRUE(), Pedidos[Cantidad]*Pedidos[Precio]>=200,"Alto", Pedidos[Cantidad]*Pedidos[Precio]>=100,"Medio","Bajo")
```

**Resultado esperado** Pedido 6 Alto; pedido 3 Medio; pedido 5 Bajo.

### BLANK, ISBLANK y COALESCE

**Clave** `blank-isblank-y-coalesce`

**Definición** BLANK representa ausencia en DAX; ISBLANK la detecta; COALESCE toma el primer valor no blanco.

**Búsqueda** blank, isblank, coalesce, null

**Para recordar** Un blanco puede señalar que no hay actividad; cero implica otra interpretación.

#### Mostrar clientes sin ventas como cero

```dax
Ventas con cero = COALESCE([Ventas], 0)
```

**Resultado esperado** En una tabla con nombre, Diego muestra 0 en vez de blanco.

### DIVIDE

**Clave** `divide`

**Definición** Divide y devuelve BLANK o una alternativa constante si el denominador es cero o blanco.

**Búsqueda** divide, dividir por cero

**Para recordar** Usa DIVIDE para ratios de negocio.

#### Calcular ticket seguro

```dax
Ticket = DIVIDE([Ventas], [Pedidos completados])
```

**Resultado esperado** Global 157.14; Diego BLANK.

### ROUND, ABS y formato

**Clave** `round-abs-y-formato`

**Definición** ROUND cambia el valor numérico; ABS devuelve magnitud sin signo; el formato visual modifica presentación sin redondear el cálculo subyacente.

**Búsqueda** round, abs, format, formato decimal

**Para recordar** No uses FORMAT para una medida que debe seguir siendo numérica.

#### Redondear ticket

```dax
Ticket redondeado = ROUND([Ticket], 2)
```

**Resultado esperado** 157.14 como número; no texto.

### Funciones de texto y conversión

**Clave** `funciones-de-texto-y-conversion`

**Definición** DAX incluye LEFT, RIGHT, MID, LEN, TRIM, UPPER, LOWER, SUBSTITUTE, VALUE y FORMAT para manipular texto y convertir valores.

**Búsqueda** left, right, mid, len, concatenate, value, format

**Para recordar** FORMAT devuelve texto; VALUE convierte texto numérico a número.

**Nota** Nueva columna en Pedidos. Para limpiar texto al cargar suele convenir Power Query.

#### Crear identificador legible

```dax
Etiqueta pedido = "P-" & FORMAT(Pedidos[PedidoID], "000")
```

**Resultado esperado** PedidoID 3: P-003.

## Iteradores DAX

**Clave** `iteradores-dax`

### Definición

**Clave** `definicion`

**Definición** Las funciones terminadas en X evalúan una expresión por cada fila de una tabla y agregan los resultados.

**Búsqueda** SUMX, AVERAGEX, iteradores

**Para recordar** SUM suma una columna; SUMX calcula una expresión por fila.

#### Calcular importe sin columna auxiliar

```dax
Importe = SUMX(Pedidos, Pedidos[Cantidad] * Pedidos[Precio])
```

**Resultado esperado** 1150 sin filtros.

### SUMX

**Clave** `sumx`

**Definición** Evalúa una expresión numérica por fila y suma resultados.

**Búsqueda** sumx, precio por cantidad, revenue

**Para recordar** Multiplica por fila antes de sumar.

#### Calcular ventas de líneas

```dax
Importe alternativo = SUMX(Pedidos, Pedidos[Cantidad] * Pedidos[Precio])
```

**Resultado esperado** 1150; no equivale a SUM(Cantidad)*SUM(Precio).

### AVERAGEX

**Clave** `averagex`

**Definición** Promedia los valores de una expresión evaluada por fila.

**Búsqueda** averagex, promedio de expresión

**Para recordar** Define la tabla que representa las unidades del promedio.

#### Promedio por pedido incluyendo cancelados

```dax
Importe medio = AVERAGEX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])
```

**Resultado esperado** 143.75.

### MINX, MAXX y COUNTX

**Clave** `minx-maxx-y-countx`

**Definición** Calculan extremos o recuento de valores evaluados en una expresión de fila.

**Búsqueda** minx, maxx, countx

**Para recordar** Elige la función X cuando no existe una columna directa.

**Nota** Crea las medidas por separado; COUNTX(Pedidos, Pedidos[Envio]) devolvería 7.

#### Obtener importes extremos

```dax
Menor importe = MINX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])
Mayor importe = MAXX(Pedidos, Pedidos[Cantidad]*Pedidos[Precio])
```

**Resultado esperado** 50 y 300.

## CALCULATE y filtros

**Clave** `calculate-y-filtros`

### Definición

**Clave** `definicion`

**Definición** CALCULATE evalúa una expresión en un contexto de filtro modificado. CALCULATETABLE hace lo mismo para una expresión que devuelve una tabla.

**Búsqueda** calculate, calculatetable, dax filtros

**Para recordar** Expresión primero, condiciones después.

#### Calcular solo ventas completadas

```dax
Ventas = CALCULATE([Importe], Pedidos[Estado] = "completed")
```

**Resultado esperado** 1100, frente a importe 1150.

### CALCULATE con varias condiciones

**Clave** `calculate-con-varias-condiciones`

**Definición** Los argumentos de filtro se combinan para restringir el cálculo; un filtro sobre la misma columna puede reemplazar el previo.

**Búsqueda** calculate, múltiples filtros

**Para recordar** Comprueba qué filtro modifica cada argumento.

#### Ventas completadas de México

```dax
Ventas México = CALCULATE([Ventas], Clientes[Pais] = "Mexico")
```

**Resultado esperado** 820 sin filtros adicionales.

### CALCULATETABLE

**Clave** `calculatetable`

**Definición** Modifica contexto al devolver una tabla, no una cifra.

**Búsqueda** calculatetable, tabla filtrada

**Para recordar** Para usar en medida necesita otra operación que devuelva un escalar.

#### Contar filas de una tabla filtrada

```dax
Completados tabla = COUNTROWS(CALCULATETABLE(Pedidos, Pedidos[Estado] = "completed"))
```

**Resultado esperado** 7.

### FILTER

**Clave** `filter`

**Definición** Devuelve filas de una tabla que cumplen una expresión evaluada fila a fila.

**Búsqueda** filter, tabla filtrada

**Para recordar** Usa filtros booleanos simples de CALCULATE cuando basten.

#### Sumar pedidos con importe mayor de 150

```dax
Importes grandes = SUMX(FILTER(Pedidos, Pedidos[Cantidad]*Pedidos[Precio] > 150), Pedidos[Cantidad]*Pedidos[Precio])
```

**Resultado esperado** 500 por pedidos 2 y 6.

### KEEPFILTERS

**Clave** `keepfilters`

**Definición** Hace que un filtro de CALCULATE se intersecte con el filtro existente en lugar de sustituirlo sobre la misma columna.

**Búsqueda** keepfilters, intersección de filtros

**Para recordar** Permite respetar selección previa del usuario.

#### Respetar el estado seleccionado

```dax
Ventas respetadas = CALCULATE([Importe], KEEPFILTERS(Pedidos[Estado] = "completed"))
```

**Resultado esperado** Con Estado=cancelled, BLANK; la medida Ventas original devuelve 1100 sin otros filtros.

## Modificar el contexto de filtro

**Clave** `modificar-el-contexto-de-filtro`

### Definición

**Clave** `definicion`

**Definición** Las funciones de contexto permiten quitar o preservar filtros para obtener totales, porcentajes y comparaciones.

**Búsqueda** ALL, REMOVEFILTERS, ALLSELECTED, ALLEXCEPT

**Para recordar** Identifica qué filtro quieres retirar, no borres todo sin necesidad.

#### Comparar con total de países

```dax
Ventas todos países = CALCULATE([Ventas], REMOVEFILTERS(Clientes[Pais]))
```

**Resultado esperado** En tabla por país, Mexico muestra total de referencia 1100.

### REMOVEFILTERS y ALL

**Clave** `removefilters-y-all`

**Definición** REMOVEFILTERS quita filtros; ALL también puede devolver una tabla de valores o filas para otras funciones.

**Búsqueda** removefilters, all, total general

**Para recordar** REMOVEFILTERS expresa mejor la intención si solo quieres eliminar filtros.

**Nota** Formatea como porcentaje.

#### Porcentaje del total por categoría

```dax
% categoría = DIVIDE([Ventas], CALCULATE([Ventas], REMOVEFILTERS(Productos[Categoria])))
```

**Resultado esperado** Tecnologia 59.09%; Muebles 40.91%.

### ALLEXCEPT

**Clave** `allexcept`

**Definición** Quita filtros de una tabla excepto los aplicados a columnas especificadas.

**Búsqueda** allexcept, conservar filtro

**Para recordar** Especifica qué columna conserva el contexto.

#### Conservar país al quitar cliente

```dax
Ventas país = CALCULATE([Ventas], ALLEXCEPT(Clientes, Clientes[Pais]))
```

**Resultado esperado** En matriz Pais > Nombre, fila Mexico/Ana: 820, si Pais está filtrado explícitamente.

### ALLSELECTED

**Clave** `allselected`

**Definición** Recupera el contexto de selección externa y permite calcular totales visuales preservando filtros externos relevantes.

**Búsqueda** allselected, visual total

**Para recordar** No es idéntico a ALL; depende del contexto de consulta.

#### Calcular participación entre clientes seleccionados

```dax
% seleccionado = DIVIDE([Ventas], CALCULATE([Ventas], ALLSELECTED(Clientes[Nombre])))
```

**Resultado esperado** En tabla por nombre y segmentador que selecciona Ana y Marta: Ana 63.41%, Marta 36.59%.

### SELECTEDVALUE y HASONEVALUE

**Clave** `selectedvalue-y-hasonevalue`

**Definición** SELECTEDVALUE devuelve el valor único visible o una alternativa; HASONEVALUE comprueba si hay exactamente uno.

**Búsqueda** selectedvalue, hasonevalue, selección única

**Para recordar** No devuelve una lista si hay varias selecciones.

#### Título por categoría

```dax
Título categoría = "Ventas - " & SELECTEDVALUE(Productos[Categoria], "Todas o varias")
```

**Resultado esperado** Con Muebles: Ventas - Muebles; sin filtro: Ventas - Todas o varias.

### ISFILTERED e ISINSCOPE

**Clave** `isfiltered-e-isinscope`

**Definición** ISFILTERED detecta filtro directo; ISINSCOPE detecta si una columna es un nivel de agrupación activo en una jerarquía visual.

**Búsqueda** isfiltered, isinscope, matrix hierarchy

**Para recordar** Un filtro y un nivel de agrupación son cosas distintas.

#### Detectar detalle de matriz

```dax
Nivel = IF(ISINSCOPE(Productos[Producto]), "Producto", "Categoría o total")
```

**Resultado esperado** Matriz Categoria > Producto: filas de producto muestran Producto; subtotales muestran Categoría o total.

## Funciones de relaciones DAX

**Clave** `funciones-de-relaciones-dax`

### Definición

**Clave** `definicion`

**Definición** DAX puede recuperar atributos de dimensiones o modificar relaciones para un cálculo sin cambiar permanentemente el modelo.

**Búsqueda** related, relatedtable, userelationship

**Para recordar** Usa relaciones existentes cuando están correctamente definidas.

**Nota** Nueva columna en Pedidos; normalmente es preferible usar el atributo desde la dimensión.

#### Traer categoría a una columna

```dax
Categoría del pedido = RELATED(Productos[Categoria])
```

**Resultado esperado** Pedido 1: Tecnologia; pedido 6: Muebles.

### RELATED y RELATEDTABLE

**Clave** `related-y-relatedtable`

**Definición** RELATED recupera un valor del lado uno en contexto de fila; RELATEDTABLE devuelve las filas relacionadas de otra tabla.

**Búsqueda** related, relatedtable, lookup

**Para recordar** Una dimensión puede relacionarse con muchos hechos.

**Nota** Nueva columna de Clientes.

#### Contar pedidos de cada cliente

```dax
Número pedidos columna = COUNTROWS(RELATEDTABLE(Pedidos))
```

**Resultado esperado** Ana 3, Luis 2, Marta 3, Diego BLANK.

### USERELATIONSHIP

**Clave** `userelationship`

**Definición** Activa una relación existente para el cálculo actual, normalmente una relación inactiva.

**Búsqueda** userelationship, fecha envío

**Para recordar** No crea una relación nueva.

#### Ventas por fecha de envío

```dax
Ventas enviadas = CALCULATE([Ventas], USERELATIONSHIP(Calendario[Date], Pedidos[Envio]))
```

**Resultado esperado** Con Calendario[Date]=2026-01-07: 120; Ventas normal queda BLANK.

### CROSSFILTER

**Clave** `crossfilter`

**Definición** Cambia temporalmente la dirección de filtro de una relación existente para una medida.

**Búsqueda** crossfilter, both, none

**Para recordar** Evita activar bidireccionalidad global solo para un cálculo.

#### Contar clientes de una categoría

```dax
Clientes compradores = CALCULATE(DISTINCTCOUNT(Clientes[ClienteID]), CROSSFILTER(Clientes[ClienteID], Pedidos[ClienteID], BOTH))
```

**Resultado esperado** Con Muebles: 2 clientes, Ana y Marta.

### LOOKUPVALUE

**Clave** `lookupvalue`

**Definición** Busca un resultado por coincidencia de una o varias condiciones, sin requerir necesariamente una relación física.

**Búsqueda** lookupvalue, buscar valor

**Para recordar** Debe haber un único resultado compatible; si hay relación usa RELATED cuando proceda.

**Nota** Nueva columna de Pedidos.

#### Buscar país por identificador

```dax
País encontrado = LOOKUPVALUE(Clientes[Pais], Clientes[ClienteID], Pedidos[ClienteID])
```

**Resultado esperado** Pedido 2: Espana.

### TREATAS

**Clave** `treatas`

**Definición** Aplica valores de una expresión de tabla como filtros a columnas de otra tabla, incluso sin relación física.

**Búsqueda** treatas, virtual relationship

**Para recordar** El orden y cantidad de columnas deben coincidir.

#### Aplicar filtro virtual de productos

```dax
Ventas productos 1 y 3 = CALCULATE([Ventas], TREATAS({1,3}, Productos[ProductoID]))
```

**Resultado esperado** 670 sin filtros adicionales.

## Tablas virtuales y consultas DAX

**Clave** `tablas-virtuales-y-consultas-dax`

### Definición

**Clave** `definicion`

**Definición** Una expresión tabular puede ser entrada de otra función o una tabla calculada. DAX Query View permite ejecutar consultas con EVALUATE.

**Búsqueda** virtual table, evaluate, dax query view

**Para recordar** Una medida necesita resultado escalar, no tabla.

**Nota** Ejecuta en vista Consulta DAX, no como medida.

#### Consultar valores de categoría

```dax
EVALUATE
SUMMARIZECOLUMNS(Productos[Categoria], "Ventas", [Ventas])
ORDER BY [Ventas] DESC
```

**Resultado esperado** Tecnologia 650; Muebles 450.

### SUMMARIZE y SUMMARIZECOLUMNS

**Clave** `summarize-y-summarizecolumns`

**Definición** Agrupan filas por columnas; SUMMARIZECOLUMNS se usa a menudo para consultas y resúmenes con medidas.

**Búsqueda** summarize, summarizecolumns, group by DAX

**Para recordar** Comprueba el grano y contexto de filtros.

#### Resumir ventas por país

```dax
EVALUATE
SUMMARIZECOLUMNS(Clientes[Pais], "Ventas", [Ventas])
ORDER BY [Ventas] DESC
```

**Resultado esperado** Mexico 820; Espana 280; se omite grupo con todas las expresiones en blanco.

### ADDCOLUMNS y SELECTCOLUMNS

**Clave** `addcolumns-y-selectcolumns`

**Definición** ADDCOLUMNS añade expresiones a una tabla; SELECTCOLUMNS proyecta y renombra campos partiendo de sus filas.

**Búsqueda** addcolumns, selectcolumns, projection

**Para recordar** No confundir proyección con agregación.

#### Proyectar productos

```dax
EVALUATE
SELECTCOLUMNS(Productos, "Nombre", Productos[Producto], "Costo", Productos[Costo])
ORDER BY [Costo]
```

**Resultado esperado** Mouse 40; Teclado 50; Silla 70.

### TOPN

**Clave** `topn`

**Definición** Devuelve las primeras N filas por criterios de orden; puede incluir más de N si hay empate en el límite.

**Búsqueda** topn, top N, ranking

**Para recordar** TOPN no garantiza orden final de salida.

#### Seleccionar dos pedidos más caros

```dax
EVALUATE
TOPN(2, ADDCOLUMNS(Pedidos, "ImportePedido", Pedidos[Cantidad]*Pedidos[Precio]), [ImportePedido], DESC, Pedidos[PedidoID], ASC)
ORDER BY [ImportePedido] DESC
```

**Resultado esperado** Pedido 6 con 300 y pedido 2 con 200, junto a las demás columnas.

### GENERATESERIES y parámetros numéricos

**Clave** `generateseries-y-parametros-numericos`

**Definición** GENERATESERIES genera una tabla de números; un parámetro de hipótesis permite seleccionar valores en un segmentador.

**Búsqueda** generateseries, what if parameter

**Para recordar** Un parámetro desconectado no filtra hechos automáticamente.

**Nota** Nueva tabla. Medida de simulación: `[Ventas] * (1 - SELECTEDVALUE(Descuentos[Value], 0))`; al seleccionar 0.10, devuelve 990.

#### Simular descuento

```dax
Descuentos = GENERATESERIES(0, 0.2, 0.05)
```

**Resultado esperado** Cinco filas Value: 0, 0.05, 0.10, 0.15, 0.20.

### CONTAINS

**Clave** `contains`

**Definición** Comprueba si una tabla contiene una fila con determinadas combinaciones de columna y valor.

**Búsqueda** contains, comprobar existencia

**Para recordar** Devuelve TRUE o FALSE, no una fila.

#### Verificar si existe un producto

```dax
Existe Mouse = CONTAINS(Productos, Productos[Producto], "Mouse")
```

**Resultado esperado** TRUE sin filtros.

### UNION, INTERSECT y EXCEPT

**Clave** `union-intersect-y-except`

**Definición** Combinan tablas, obtienen coincidencias o restan filas entre tablas con columnas compatibles. UNION conserva duplicados.

**Búsqueda** union, intersect, except, conjuntos DAX

**Para recordar** El orden de columnas debe corresponder y los duplicados importan.

**Nota** Ejecuta en vista Consulta DAX. Requiere columna Año de Calendario.

#### Comparar compradores de dos años

```dax
EVALUATE
EXCEPT(
    CALCULATETABLE(VALUES(Pedidos[ClienteID]), Calendario[Año]=2026, Pedidos[Estado]="completed"),
    CALCULATETABLE(VALUES(Pedidos[ClienteID]), Calendario[Año]=2025, Pedidos[Estado]="completed")
)
```

**Resultado esperado** Una fila, ClienteID 3, que compró en 2026 pero no en 2025.

## Rankings y comparaciones

**Clave** `rankings-y-comparaciones`

### Definición

**Clave** `definicion`

**Definición** Un ranking asigna posiciones según una métrica dentro de un conjunto de entidades.

**Búsqueda** rankx, ranking, top clientes

**Para recordar** Define el conjunto y tratamiento de empates.

**Nota** Para que Diego no muestre posición, añade IF(ISBLANK([Ventas]), BLANK(), …); en el total también puedes ocultar ranking con ISINSCOPE.

#### Ordenar clientes por ventas

```dax
Ranking cliente = RANKX(FILTER(ALL(Clientes[Nombre]), NOT ISBLANK([Ventas])), [Ventas], , DESC, DENSE)
```

**Resultado esperado** En tabla por nombre sin Diego: Ana 1, Marta 2, Luis 3.

### RANKX y empates

**Clave** `rankx-y-empates`

**Definición** RANKX evalúa una expresión para cada fila de una tabla y asigna posición. DENSE no deja huecos; SKIP deja huecos al empatar.

**Búsqueda** rankx, dense, skip

**Para recordar** El conjunto evaluado define quién compite.

**Nota** Nueva columna de Pedidos; ejemplo de orden por precio unitario, no importe.

#### Comparar empates de importes

```dax
Rank precio = RANKX(ALL(Pedidos), Pedidos[Precio], Pedidos[Precio], DESC, DENSE)
```

**Resultado esperado** Pedidos 7 y 8: rango 1 (150); precio 100: rango 2. Con SKIP sería rango 3.

### Top N visual vs ranking

**Clave** `top-n-visual-vs-ranking`

**Definición** El filtro Top N limita categorías visibles por una medida; un ranking es un cálculo que se puede mostrar o usar en otras métricas.

**Búsqueda** top n filter, rankx

**Para recordar** Top N no obliga a crear medida de ranking.

#### Mostrar dos clientes principales

1. Crea barras Nombre y Ventas.
2. En filtros del visual, Nombre > Top N > 2 por Ventas > Aplicar filtro.

**Resultado esperado** Ana 520 y Marta 300.

## Inteligencia temporal

**Clave** `inteligencia-temporal`

### Definición

**Clave** `definicion`

**Definición** DAX puede recalcular medidas para periodos anteriores, acumulados o ventanas temporales usando el calendario común.

**Búsqueda** time intelligence, fechas, periodos

**Para recordar** Filtra por Calendario, no por columnas de fecha de hechos en los ejemplos.

#### Comparar meses

1. Crea matriz Calendario[AñoMes] con Ventas.
2. Filtra Año=2026 y excluye meses sin ventas si es necesario.

**Resultado esperado** 2026-01: 200; 2026-02: 600.

### YEAR, MONTH, TODAY y DATEDIFF

**Clave** `year-month-today-y-datediff`

**Definición** Extraen componentes de fecha, devuelven la fecha actual o cuentan límites de un intervalo entre fechas.

**Búsqueda** year, month, today, datediff

**Para recordar** DATEDIFF cuenta límites de la unidad indicada, no siempre duración exacta.

**Nota** Nueva columna. TODAY() depende del día de evaluación y de la actualización cuando se usa en columnas.

#### Calcular demora de envío

```dax
Días envío = IF(ISBLANK(Pedidos[Envio]), BLANK(), DATEDIFF(Pedidos[Fecha], Pedidos[Envio], DAY))
```

**Resultado esperado** Pedido 4: 3; pedido 5: BLANK.

### DATEADD y SAMEPERIODLASTYEAR

**Clave** `dateadd-y-sameperiodlastyear`

**Definición** Desplazan el conjunto de fechas actual por un intervalo o un año para recalcular una medida.

**Búsqueda** dateadd, sameperiodlastyear, año anterior, mes anterior

**Para recordar** Usa fechas continuas y calendario marcado para la forma clásica.

**Nota** Crea cada medida por separado.

#### Comparar ventas de febrero

```dax
Ventas mes anterior = CALCULATE([Ventas], DATEADD(Calendario[Date], -1, MONTH))
Ventas año anterior = CALCULATE([Ventas], SAMEPERIODLASTYEAR(Calendario[Date]))
```

**Resultado esperado** En febrero 2026: mes anterior 200, año anterior 200.

### TOTALYTD, DATESYTD, QTD y MTD

**Clave** `totalytd-datesytd-qtd-y-mtd`

**Definición** Calculan acumulados desde el inicio del año, trimestre o mes hasta la fecha del contexto.

**Búsqueda** totalytd, datesytd, totalqtd, totalmtd

**Para recordar** Un acumulado se reinicia al comenzar su periodo.

**Nota** Equivalente clásico: CALCULATE([Ventas], DATESYTD(Calendario[Date])); TOTALQTD y TOTALMTD cambian el inicio del periodo.

#### Calcular ventas YTD

```dax
Ventas YTD = TOTALYTD([Ventas], Calendario[Date])
```

**Resultado esperado** Enero 2026: 200; febrero 2026: 800.

### DATESINPERIOD

**Clave** `datesinperiod`

**Definición** Devuelve fechas de una ventana relativa a una fecha de referencia.

**Búsqueda** datesinperiod, rolling period, periodo móvil

**Para recordar** Ancla la ventana al último día visible, no necesariamente a hoy.

#### Ventas de últimos dos meses

```dax
Ventas 2M = CALCULATE([Ventas], DATESINPERIOD(Calendario[Date], MAX(Calendario[Date]), -2, MONTH))
```

**Resultado esperado** Con febrero 2026 completo seleccionado: 800.

### Crecimiento mensual e interanual

**Clave** `crecimiento-mensual-e-interanual`

**Definición** Compara una métrica con un periodo de referencia y divide su diferencia por ese periodo.

**Búsqueda** mom, yoy, growth, variación porcentual

**Para recordar** Sin base comparable devuelve blanco con DIVIDE.

**Nota** Requiere la medida Ventas año anterior del grupo.

#### Crecimiento interanual

```dax
Crecimiento YoY = DIVIDE([Ventas] - [Ventas año anterior], [Ventas año anterior])
```

**Resultado esperado** Febrero 2026: 200%; enero 2026: 100%.

### Acumulado sin reinicio anual

**Clave** `acumulado-sin-reinicio-anual`

**Definición** Retira el filtro de fechas y conserva solo fechas anteriores o iguales al límite actual.

**Búsqueda** running total, acumulado histórico

**Para recordar** Captura fecha límite antes de quitar filtros.

#### Acumular ventas históricas

```dax
Ventas acumuladas =
VAR Corte = MAX(Calendario[Date])
RETURN CALCULATE([Ventas], FILTER(ALL(Calendario), Calendario[Date] <= Corte))
```

**Resultado esperado** Enero 2026: 500; febrero 2026: 1100, incluyendo ventas de 2025.

## Métricas de negocio

**Clave** `metricas-de-negocio`

### Definición

**Clave** `definicion`

**Definición** Un KPI debe indicar población, periodo, unidad y fórmula; las medidas permiten reproducirlo y verificarlo.

**Búsqueda** KPI, métricas, business analysis

**Para recordar** Define numerador y denominador antes de visualizar.

**Nota** Si el informe filtra Estado, decide si el denominador debe ignorarlo.

#### Medir pedidos completados

```dax
Tasa completados = DIVIDE([Pedidos completados], [Pedidos total])
```

**Resultado esperado** 87.5% global sin filtro de Estado.

### Revenue, coste y margen

**Clave** `revenue-coste-y-margen`

**Definición** Revenue es ingreso; margen bruto resta coste de ventas y margen porcentual divide por revenue.

**Búsqueda** revenue, cost, profit, gross margin

**Para recordar** Coste por unidad debe multiplicarse por cantidad de ventas completadas.

**Nota** Crea medidas por separado; Costos son ficticios y constantes.

#### Calcular margen bruto

```dax
Costo ventas = CALCULATE(SUMX(Pedidos, Pedidos[Cantidad]*RELATED(Productos[Costo])), Pedidos[Estado] = "completed")
Margen bruto = [Ventas] - [Costo ventas]
Margen % = DIVIDE([Margen bruto], [Ventas])
```

**Resultado esperado** Coste 600, margen 500, margen 45.45%.

### Ticket promedio y clientes únicos

**Clave** `ticket-promedio-y-clientes-unicos`

**Definición** Ticket divide ingresos por pedidos, no por líneas; compradores únicos cuentan clientes que cumplen el criterio.

**Búsqueda** average order value, distinct customers, ticket

**Para recordar** Si cambia el grano a líneas, cuenta pedidos distintos.

#### Medir compradores completados

```dax
Compradores completados = CALCULATE(DISTINCTCOUNT(Pedidos[ClienteID]), Pedidos[Estado] = "completed")
```

**Resultado esperado** 3 compradores; ticket global 157.14.

### Objetivos y variación

**Clave** `objetivos-y-variacion`

**Definición** Compara resultados con una meta en el mismo grano y periodo.

**Búsqueda** target, variance, cumplimiento

**Para recordar** No repitas metas mensuales por cada pedido.

**Nota** Crea medidas separadas. Analiza metas solo al nivel temporal y dimensional que representan.

#### Medir cumplimiento mensual

```dax
Cumplimiento = DIVIDE([Ventas], [Objetivo])
Brecha = [Ventas] - [Objetivo]
```

**Resultado esperado** Enero 2026: 80%, -50; febrero: 120%, 100.

### Retención y cohortes

**Clave** `retencion-y-cohortes`

**Definición** Una cohorte agrupa entidades por un evento inicial; retención mide cuántas vuelven en un periodo posterior.

**Búsqueda** retention, cohort, clientes recurrentes

**Para recordar** Define eventos, población inicial y ventana.

**Nota** Requiere AñoMes; evalúa sin filtros adicionales. No equivale a retención por cohorte de primera compra.

#### Medir retención de enero a febrero de 2026

```dax
Retención enero-febrero =
VAR Ene = CALCULATETABLE(VALUES(Pedidos[ClienteID]), REMOVEFILTERS(Calendario), Calendario[AñoMes] = "2026-01", Pedidos[Estado] = "completed")
VAR Feb = CALCULATETABLE(VALUES(Pedidos[ClienteID]), REMOVEFILTERS(Calendario), Calendario[AñoMes] = "2026-02", Pedidos[Estado] = "completed")
RETURN DIVIDE(COUNTROWS(INTERSECT(Ene, Feb)), COUNTROWS(Ene))
```

**Resultado esperado** 50%: Ana vuelve en febrero; Luis no.

### Conciliación y calidad de KPIs

**Clave** `conciliacion-y-calidad-de-kpis`

**Definición** Contrasta totales con el origen y verifica filtros, relaciones, duplicados y granularidad.

**Búsqueda** validación, reconciliation, control totals

**Para recordar** Una gráfica correcta visualmente puede tener un cálculo incorrecto.

#### Conciliar ventas

1. En tabla de Pedidos muestra PedidoID, Cantidad y Precio; filtra completed.
2. Compara la suma de productos Cantidad × Precio con la tarjeta Ventas.

**Resultado esperado** Siete pedidos y 1100; el cancelado de 50 queda excluido.

### Medidas aditivas y semiaditivas

**Clave** `medidas-aditivas-y-semiaditivas`

**Definición** Una medida aditiva puede sumarse entre dimensiones; una semiaditiva no debe sumarse en algún eje, por ejemplo saldos a través del tiempo.

**Búsqueda** semi-additive, saldo, inventario, last date

**Para recordar** Saldo de cierre no es suma de saldos diarios.

**Nota** Crea Inventario como tabla calculada de ejemplo desconectada y luego la medida por separado. Para inventarios por producto con fechas distintas se requiere lógica por entidad.

#### Obtener inventario al cierre

```dax
Inventario = UNION(ROW("Fecha", DATE(2026,1,31), "Unidades", 100), ROW("Fecha", DATE(2026,2,28), "Unidades", 80))
Inventario cierre =
VAR Ultima = MAX(Inventario[Fecha])
RETURN CALCULATE(SUM(Inventario[Unidades]), Inventario[Fecha] = Ultima)
```

**Resultado esperado** En tarjeta sin filtro: 80, no 180; con filtro de enero por Inventario[Fecha]: 100.

## Calculation Groups y cálculos visuales

**Clave** `calculation-groups-y-calculos-visuales`

### Definición

**Clave** `definicion`

**Definición** Los grupos de cálculo reutilizan transformaciones sobre medidas; los cálculos visuales operan sobre la estructura de un visual.

**Búsqueda** calculation groups, visual calculations

**Para recordar** Elige el ámbito: modelo reutilizable o visual concreto.

#### Elegir dónde calcular acumulado

1. Compara Ventas acumuladas en dos visuales con un cálculo visual Running sum creado en una matriz.

**Resultado esperado** La medida puede reutilizarse en el modelo; el cálculo visual pertenece a esa matriz.

### Calculation Groups

**Clave** `calculation-groups`

**Definición** Un grupo contiene elementos de cálculo que transforman la medida seleccionada usando SELECTEDMEASURE.

**Búsqueda** selectedmeasure, calculation item

**Para recordar** Utiliza medidas explícitas y revisa precedencia.

**Nota** Revisa compatibilidad, formato dinámico y advertencia sobre medidas implícitas.

#### Crear elemento de año anterior

1. En copia del modelo, crea grupo de cálculo Periodo en vista Modelo y elemento Año anterior con expresión `CALCULATE(SELECTEDMEASURE(), SAMEPERIODLASTYEAR(Calendario[Date]))`.
2. Añade Ventas y el elemento a una matriz por año-mes.

**Resultado esperado** Febrero 2026 con Año anterior: 200.

### Formatos dinámicos

**Clave** `formatos-dinamicos`

**Definición** Una expresión de formato dinámico cambia cómo se representa una medida sin convertir el valor a texto.

**Búsqueda** dynamic format strings, formato dinámico

**Para recordar** Mantén el tipo numérico para gráficos y ordenación.

#### Cambiar formato según categoría

1. Selecciona Ventas > Formato dinámico; usa `IF(SELECTEDVALUE(Productos[Categoria])="Muebles", "#,0.00", "#,0")`.

**Resultado esperado** Muebles aparece 450.00 y Tecnologia 650, ambos numéricos.

### Visual Calculations

**Clave** `visual-calculations`

**Definición** Evalúan expresiones DAX en las filas y columnas del visual, no en toda la tabla original.

**Búsqueda** visual calculation, running sum, moving average

**Para recordar** Orden del visual y ejes determinan el resultado.

**Nota** Usa versión de Desktop que incluya cálculos visuales; revisa limitaciones del tipo de visual.

#### Acumular ventas en matriz

1. Matriz con AñoMes y Ventas; filtra 2026 y muestra enero y febrero en orden ascendente.
2. Nuevo cálculo visual > Running sum sobre Ventas (eje de filas).

**Resultado esperado** Enero 200, febrero 800.

## Diseño de informes

**Clave** `diseno-de-informes`

### Definición

**Clave** `definicion`

**Definición** Un informe presenta páginas interactivas conectadas al modelo semántico. Cada visual responde a una pregunta específica.

**Búsqueda** report, página, dashboard, storytelling

**Para recordar** Define la pregunta antes de escoger visual.

#### Construir resumen ejecutivo

1. Crea una página Resumen, agrega tarjeta Ventas, tarjeta Pedidos completados y barras por Categoria.
2. Usa títulos que indiquen qué mide cada gráfico.

**Resultado esperado** 1100 ventas, 7 pedidos completados y barras 650/450.

### Campos y agregación de visuales

**Clave** `campos-y-agregacion-de-visuales`

**Definición** Cada visual tiene zonas de campos, como eje, valores, leyenda y tooltips; la agregación depende del campo asignado.

**Búsqueda** fields, axis, values, legend, summarize

**Para recordar** Evita sumar identificadores.

#### Mostrar pedidos sin sumar ID

1. Agrega tabla con PedidoID, Fecha y Estado.
2. Si PedidoID se resume, selecciona No resumir.

**Resultado esperado** Ocho pedidos individuales.

### Formato y temas

**Clave** `formato-y-temas`

**Definición** El formato controla etiquetas, colores y tamaños del visual; un tema unifica estilos entre visuales.

**Búsqueda** format pane, theme, report colors

**Para recordar** Mantén significado de colores consistente.

#### Aplicar estilo al informe

1. Vista > Temas, elige un tema integrado.
2. Selecciona tarjeta Ventas y ajusta unidades de visualización a Ninguna.

**Resultado esperado** La tarjeta muestra 1100, no 1.1 mil si eliges esa unidad; el tema cambia su aspecto.

### Diseño de página y storytelling

**Clave** `diseno-de-pagina-y-storytelling`

**Definición** Organiza indicadores, tendencias, causas y detalles según el recorrido de lectura del usuario.

**Búsqueda** canvas, page size, storytelling, layout

**Para recordar** El contexto del dato importa tanto como su forma.

#### Crear página de seguimiento

1. Configura página 16:9.
2. Coloca tarjetas arriba, tendencia mensual al centro y desglose por país debajo.
3. Añade texto que indique que Ventas excluye cancelados.

**Resultado esperado** Una página con resumen, evolución y detalle; la definición evita confundir 1100 con 1150.

### Accesibilidad

**Clave** `accesibilidad`

**Definición** Contraste, texto alternativo, orden de tabulación y etiquetas comprensibles ayudan a usar el informe sin depender de color o ratón.

**Búsqueda** alt text, tab order, accessibility

**Para recordar** No comuniques un estado únicamente mediante color.

#### Hacer legible un gráfico

1. Añade texto alternativo a barras por categoría; activa etiquetas; revisa contraste y orden de tabulación en panel Selección.

**Resultado esperado** Se distinguen nombres y valores 650/450 incluso sin interpretar colores.

## Visuales básicos

**Clave** `visuales-basicos`

### Definición

**Clave** `definicion`

**Definición** Los gráficos comparan magnitudes, tendencias y proporciones. La elección depende del tipo de pregunta.

**Búsqueda** bar, column, line, pie, donut, area

**Para recordar** Barras para comparar; líneas para evolución.

#### Comparar categorías

1. Crea gráfico de barras agrupadas con Categoria en eje Y y Ventas en X.
2. Ordena por Ventas descendente.

**Resultado esperado** Tecnologia 650 primero; Muebles 450 segundo.

### Barras y columnas

**Clave** `barras-y-columnas`

**Definición** Barras horizontales facilitan nombres largos; columnas verticales comparan categorías o periodos discretos.

**Búsqueda** bar chart, column chart

**Para recordar** Ordena por métrica o por tiempo, según pregunta.

#### Comparar ventas por cliente

1. Gráfico de columnas con Nombre en X y Ventas en Y; orden descendente.

**Resultado esperado** Ana 520, Marta 300, Luis 280; Diego sin barra.

### Líneas y áreas

**Clave** `lineas-y-areas`

**Definición** La línea muestra tendencia temporal; área enfatiza magnitud bajo la curva y sus variantes apiladas muestran composición.

**Búsqueda** line chart, area chart, trend

**Para recordar** Usa eje temporal coherente y no conviertas ausencias en cero sin decisión.

#### Mostrar evolución de 2026

1. Línea con AñoMes y Ventas; filtra 2026 y enero-febrero.

**Resultado esperado** Puntos 200 y 600; tendencia ascendente.

### Apilados y 100% apilados

**Clave** `apilados-y-100-apilados`

**Definición** Los apilados muestran composición y total; 100% apilados normalizan cada barra a una proporción.

**Búsqueda** stacked chart, 100 percent stacked

**Para recordar** El 100% apilado oculta diferencias de tamaño absoluto.

#### Comparar estados por cliente

1. Crea columnas apiladas con Nombre, Pedidos total y Estado como leyenda.
2. Cambia a 100% apiladas.

**Resultado esperado** Marta tiene 2 completed y 1 cancelled, proporciones 66.7% y 33.3%; Ana y Luis 100% completed.

### Pie y donut

**Clave** `pie-y-donut`

**Definición** Representan partes de un total no negativo con pocas categorías.

**Búsqueda** pie chart, donut, proporción

**Para recordar** Evita demasiadas porciones y categorías muy similares.

#### Mostrar participación por categoría

1. Donut con Categoria como leyenda y Ventas como valores.
2. Activa etiquetas de porcentaje.

**Resultado esperado** Tecnologia 59.09%, Muebles 40.91%.

### Gráfico combinado

**Clave** `grafico-combinado`

**Definición** Muestra dos series, por ejemplo columnas de valores y línea de referencia.

**Búsqueda** combo chart, line and clustered column

**Para recordar** Revisa escalas y no mezcles unidades sin aclaración.

#### Comparar ventas y objetivo

1. Filtra Año=2026 y enero-febrero.
2. Crea gráfico combinado con AñoMes, Ventas como columnas y Objetivo como línea.

**Resultado esperado** Enero 200 frente a 250; febrero 600 frente a 500.

## Tablas, matrices e indicadores

**Clave** `tablas-matrices-e-indicadores`

### Definición

**Clave** `definicion`

**Definición** Tablas muestran registros; matrices agrupan filas y columnas con subtotales; indicadores condensan métricas.

**Búsqueda** table, matrix, card, kpi, gauge

**Para recordar** El total de una medida se recalcula según su contexto.

#### Mostrar resumen por país

1. Crea tabla con Clientes[Pais], Ventas y Pedidos completados.

**Resultado esperado** Mexico 820 y 5; Espana 280 y 2; total 1100 y 7.

### Table y Matrix

**Clave** `table-y-matrix`

**Definición** Table muestra campos en columnas; Matrix permite ejes de filas/columnas, jerarquías y subtotales.

**Búsqueda** table visual, matrix, subtotals

**Para recordar** Elige Matrix para cruces entre dimensiones.

#### Cruzar país y categoría

1. Matriz: filas Pais, columnas Categoria, valores Ventas.

**Resultado esperado** Mexico: Tecnologia 370, Muebles 450; Espana: Tecnologia 280, Muebles BLANK.

### Card

**Clave** `card`

**Definición** Una tarjeta presenta una o varias métricas resumidas con formato destacado.

**Búsqueda** card visual, tarjetas

**Para recordar** Acompaña la cifra con unidad y definición.

#### Mostrar ventas

1. Agrega tarjeta con Ventas, título Ventas completadas.
2. Fija unidades de visualización a ninguna.

**Resultado esperado** 1100 sin filtros.

### KPI y Gauge

**Clave** `kpi-y-gauge`

**Definición** KPI muestra indicador con tendencia y objetivo; Gauge sitúa un valor dentro de un intervalo.

**Búsqueda** kpi visual, gauge, indicador meta

**Para recordar** No confundas valor del último periodo con total histórico.

#### Mostrar cumplimiento de febrero

1. Filtra febrero 2026.
2. Agrega Gauge con Ventas, Target Objetivo, mínimo 0 y máximo fijo 750.

**Resultado esperado** Valor 600, objetivo 500, por encima de la meta.

### Formato condicional

**Clave** `formato-condicional`

**Definición** Cambia color, icono, barra de datos o formato según valor o medida.

**Búsqueda** conditional formatting, rules, data bars

**Para recordar** Define umbrales con significado de negocio.

**Nota** Requiere medida Brecha del grupo Métricas de negocio; conserva signos y etiquetas para accesibilidad.

#### Resaltar metas incumplidas

1. Matriz AñoMes, Ventas y Brecha; filtra enero-febrero 2026.
2. Formato condicional de Brecha por reglas: negativo rojo, no negativo verde.

**Resultado esperado** Enero -50 resaltado como incumplido; febrero 100 como cumplido.

### KPI con tendencia temporal

**Clave** `kpi-con-tendencia-temporal`

**Definición** El visual KPI evalúa un indicador al último punto del eje temporal y lo compara con una meta.

**Búsqueda** kpi trend axis, objetivo, indicador

**Para recordar** Comprueba que el eje esté ordenado y que el último periodo tenga datos.

#### Mostrar el último mes con actividad

1. Filtra enero-febrero 2026.
2. Inserta visual KPI, Indicador Ventas, Eje de tendencia Calendario[AñoMes], Objetivo medida Objetivo; orden cronológico.

**Resultado esperado** Último mes febrero: 600 frente a objetivo 500; el indicador no muestra 800 de ambos meses.

## Visuales analíticos

**Clave** `visuales-analiticos`

### Definición

**Clave** `definicion`

**Definición** Los visuales especializados exploran relaciones, contribuciones, causas potenciales y ubicación.

**Búsqueda** scatter, waterfall, decomposition tree, maps

**Para recordar** Un patrón visual no demuestra causalidad.

#### Explorar contribución por categoría

1. Agrega Decomposition Tree, Analizar Ventas, Explicar por Categoria y Nombre.
2. Expande Categoria.

**Resultado esperado** Raíz 1100; ramas Tecnologia 650 y Muebles 450.

### Scatter y burbujas

**Clave** `scatter-y-burbujas`

**Definición** Dispersión representa dos variables numéricas y puede usar tamaño como tercera magnitud.

**Búsqueda** scatter plot, bubble chart

**Para recordar** Incluye una entidad en detalles para evitar un único punto agregado.

#### Comparar precio y cantidad por pedido

1. Crea Scatter con Precio en X, Cantidad en Y y PedidoID como detalle o campo Valores no resumido según versión.

**Resultado esperado** Ocho entidades; pedidos 7 y 8 pueden solaparse (150,1).

### Waterfall

**Clave** `waterfall`

**Definición** Muestra cómo contribuciones positivas o negativas modifican un total acumulado.

**Búsqueda** waterfall, cascada, bridge

**Para recordar** Útil para explicar variaciones, no sustituye reconciliación.

#### Explicar brecha de meta

1. Waterfall con AñoMes y Brecha; filtra enero-febrero 2026, orden cronológico.

**Resultado esperado** Contribuciones -50 y +100; acumulado final +50.

### Mapas y Azure Maps

**Clave** `mapas-y-azure-maps`

**Definición** Los visuales geográficos sitúan entidades mediante coordenadas o ubicaciones geocodificadas.

**Búsqueda** Azure Maps, geocoding, mapa

**Para recordar** Añade país o coordenadas para resolver ciudades ambiguas.

**Nota** Azure Maps requiere configuración del tenant, conectividad y disponibilidad regional; revisa privacidad de datos enviados al mapa.

#### Mostrar ventas por ciudad

1. Configura Ciudad como categoría Ciudad y Pais como País o región.
2. Crea Azure Maps con ubicación Ciudad y contexto de país, tamaño Ventas; excluye ciudades vacías.

**Resultado esperado** Se representan Ciudad de Mexico 520, Guadalajara 300 y Madrid 280 si el geocodificador reconoce las etiquetas.

### Key Influencers y Decomposition Tree

**Clave** `key-influencers-y-decomposition-tree`

**Definición** Key Influencers explora asociaciones estadísticas; Decomposition Tree desglosa medidas por dimensiones elegidas.

**Búsqueda** AI visuals, key influencers, decomposition tree

**Para recordar** Una asociación no es causa; una muestra pequeña no soporta inferencias fiables.

#### Desglosar ventas por país

1. Crea Decomposition Tree de Ventas y explica por Pais y Categoria.
2. Expande Pais y luego Mexico por Categoria.

**Resultado esperado** Mexico 820; Tecnologia 370 y Muebles 450. Key Influencers requeriría más datos para análisis útil.

### Small multiples

**Clave** `small-multiples`

**Definición** Repite el mismo gráfico para cada valor de una dimensión con ejes comparables.

**Búsqueda** small multiples, paneles pequeños

**Para recordar** Usa escalas coherentes para comparar paneles.

#### Comparar tendencia por categoría

1. Gráfico de líneas con AñoMes y Ventas; Categoria en Small multiples; filtra enero-febrero 2026.

**Resultado esperado** Tecnologia 200 y 150; Muebles sin ventas en enero y 450 en febrero.

## Filtros y segmentadores

**Clave** `filtros-y-segmentadores`

### Definición

**Clave** `definicion`

**Definición** Los filtros delimitan datos de un visual, página o informe; los slicers permiten al usuario elegir valores.

**Búsqueda** filters pane, slicer, segmentador

**Para recordar** Revisa el alcance de cada filtro.

#### Filtrar por país

1. Añade slicer Clientes[Pais] y tarjeta Ventas.
2. Selecciona Espana.

**Resultado esperado** Tarjeta 280.

### Filtro de visual, página e informe

**Clave** `filtro-de-visual-pagina-e-informe`

**Definición** Los tres niveles aplican el filtro al ámbito correspondiente; pueden combinarse con segmentadores.

**Búsqueda** visual filter, page filter, report filter

**Para recordar** El mismo campo puede aparecer en varios niveles.

#### Limitar una sola tarjeta

1. Crea dos tarjetas Ventas.
2. En filtros de una tarjeta añade Categoria=Muebles.

**Resultado esperado** Tarjeta filtrada 450; la otra 1100.

### Slicers de texto, fecha y rango

**Clave** `slicers-de-texto-fecha-y-rango`

**Definición** Los segmentadores permiten seleccionar elementos, intervalos o fechas relativas según tipo de campo.

**Búsqueda** slicer dropdown, between, relative date

**Para recordar** Usa la dimensión Calendario para fechas.

#### Seleccionar intervalo

1. Añade segmentador Calendario[Date] tipo Entre.
2. Elige 2026-01-01 a 2026-01-31.

**Resultado esperado** Ventas 200; pedidos total 3.

### Sincronizar slicers

**Clave** `sincronizar-slicers`

**Definición** Sync slicers comparte una selección entre páginas, aunque el control no sea visible en todas.

**Búsqueda** sync slicers

**Para recordar** Sincronizar y mostrar son opciones separadas.

#### Compartir país entre páginas

1. Duplica página Resumen.
2. Vista > Sincronizar segmentadores, sincroniza Pais en ambas páginas.
3. Selecciona Mexico.

**Resultado esperado** Ambas páginas muestran 820 en sus tarjetas Ventas.

### Interacciones entre visuales

**Clave** `interacciones-entre-visuales`

**Definición** Cada selección puede filtrar, resaltar o no afectar otros visuales, según compatibilidad.

**Búsqueda** edit interactions, cross filtering, cross highlighting

**Para recordar** Comprueba interacción visual por visual.

#### Mantener tarjeta global

1. Crea barras por Categoria y tarjeta Ventas.
2. Selecciona barras > Editar interacciones; desactiva efecto sobre tarjeta.
3. Pulsa Muebles.

**Resultado esperado** Tarjeta sigue en 1100; otras visualizaciones pueden filtrar según configuración.

### Orden y Top N

**Clave** `orden-y-top-n`

**Definición** Los visuales pueden ordenar por campos o medidas y limitar categorías mediante Top N.

**Búsqueda** sort, top n, orden

**Para recordar** El orden del visual no es el orden de la tabla almacenada.

#### Ordenar meses y limitar clientes

1. Ordena AñoMes cronológicamente por AñoMesN.
2. En otro gráfico aplica Top N de 2 a Nombre por Ventas.

**Resultado esperado** Meses cronológicos; clientes Ana y Marta en el gráfico Top N.

## Navegación y detalle

**Clave** `navegacion-y-detalle`

### Definición

**Clave** `definicion`

**Definición** La navegación permite explorar niveles o páginas sin saturar el resumen con todos los registros.

**Búsqueda** drill down, drillthrough, tooltip, navigation

**Para recordar** Drill down cambia nivel; drillthrough abre detalle filtrado.

#### Explorar jerarquía de productos

1. Crea barras con jerarquía Categoria > Producto y Ventas.
2. Activa drill down y selecciona Tecnologia.

**Resultado esperado** Se ven Mouse 220 y Teclado 430.

### Drill down, drill up y expandir

**Clave** `drill-down-drill-up-y-expandir`

**Definición** Drill down baja por una rama; drill up regresa; expandir muestra niveles conjuntamente.

**Búsqueda** drill down, drill up, expand hierarchy

**Para recordar** Diferencia navegar rama de expandir todas.

#### Explorar categorías

1. En jerarquía Categoria > Producto, baja a Tecnologia y vuelve arriba.

**Resultado esperado** Detalle 220/430; al volver, categorias 650/450.

### Drillthrough

**Clave** `drillthrough`

**Definición** Una página de detalle recibe un filtro desde un punto de otro visual.

**Búsqueda** drillthrough, detalle, back button

**Para recordar** El campo de origen debe corresponder al filtro de drillthrough.

#### Abrir detalle de cliente

1. Crea página Detalle con Clientes[ClienteID] en filtros Drillthrough y tabla PedidoID, Fecha, Estado.
2. En origen usa tabla de clientes con ClienteID y Ventas; clic derecho en cliente 1 > Drillthrough.

**Resultado esperado** Detalle con pedidos 1, 3 y 6 de Ana; botón Atrás permite regresar.

### Tooltips y páginas de tooltip

**Clave** `tooltips-y-paginas-de-tooltip`

**Definición** El tooltip muestra contexto al pasar sobre un punto; una página tooltip puede contener varios visuales.

**Búsqueda** tooltip, report page tooltip

**Para recordar** Incluye información auxiliar, no datos indispensables solo al pasar el cursor.

#### Mostrar ticket al pasar

1. Crea página tamaño Tooltip y habilita uso como información sobre herramientas.
2. Añade tarjeta Ticket.
3. Asigna esa página al gráfico por Categoria.

**Resultado esperado** Al pasar por Muebles, tooltip muestra ticket 225 (450 / 2).

### Bookmarks

**Clave** `bookmarks`

**Definición** Un marcador captura un estado del informe, como filtros, página o visibilidad de objetos, según sus opciones.

**Búsqueda** bookmarks, marcadores

**Para recordar** Si solo quieres controlar visibilidad, desactiva Datos en marcador.

#### Alternar resumen y detalle

1. En panel Selección crea dos grupos de visuales, oculta uno.
2. Agrega marcador Resumen; invierte visibilidad y agrega Detalle; desactiva Datos en ambos.
3. Prueba los marcadores.

**Resultado esperado** Cambia la visibilidad sin restaurar selección de país.

### Botones y navegación de páginas

**Clave** `botones-y-navegacion-de-paginas`

**Definición** Los botones ejecutan acciones como navegar, activar un marcador o retroceder.

**Búsqueda** buttons, page navigator, bookmark navigator

**Para recordar** Prueba la acción en modo lectura; en edición puede requerir Ctrl+clic.

#### Crear menú de páginas

1. Inserta Navegador de páginas para Resumen y Detalle.
2. Prueba Ctrl+clic en Desktop.

**Resultado esperado** La página activa cambia según el botón seleccionado.

### Panel Selección y capas

**Clave** `panel-seleccion-y-capas`

**Definición** Permite agrupar, ordenar y mostrar u ocultar visuales; también ayuda a controlar superposiciones.

**Búsqueda** selection pane, layering, group

**Para recordar** Los nombres claros facilitan mantener marcadores.

#### Agrupar indicadores

1. En panel Selección selecciona tarjetas de resumen y agrúpalas.
2. Nombra el grupo Indicadores.

**Resultado esperado** El grupo permite ocultar o mostrar ambas tarjetas conjuntamente.

## Personalización e interactividad avanzada

**Clave** `personalizacion-e-interactividad-avanzada`

### Definición

**Clave** `definicion`

**Definición** Los parámetros, títulos y opciones de lectura permiten adaptar un mismo informe a varias necesidades.

**Búsqueda** field parameters, dynamic titles, personalization

**Para recordar** Mantén métricas y unidades claras cuando cambie la selección.

#### Cambiar medida del gráfico

1. Modelado > Nuevo parámetro > Campos.
2. Selecciona Ventas y Pedidos completados; agrega slicer y usa el parámetro como valores de barras por Categoria.

**Resultado esperado** Con Ventas: 650/450; con Pedidos completados: 5/2.

### Field Parameters

**Clave** `field-parameters`

**Definición** Un parámetro de campos permite alternar medidas o dimensiones en un visual mediante selección.

**Búsqueda** field parameter, parámetro de campo

**Para recordar** No es lo mismo que un parámetro de Power Query.

#### Alternar agrupación

1. Crea parámetro de campos con Clientes[Pais] y Productos[Categoria].
2. Úsalo como eje de barras con Ventas y agrega slicer.

**Resultado esperado** País muestra Mexico 820 y Espana 280; categoría muestra 650 y 450.

### What-if y títulos dinámicos

**Clave** `what-if-y-titulos-dinamicos`

**Definición** Un parámetro numérico simula hipótesis; un título dinámico se vincula a una medida de texto.

**Búsqueda** what if, dynamic title, fx

**Para recordar** La simulación no modifica ventas reales.

#### Mostrar título según selección

1. Crea medida Título categoría del grupo Modificar el contexto de filtro.
2. En título del gráfico, botón fx > Valor de campo > Título categoría.
3. Selecciona Muebles.

**Resultado esperado** Título Ventas - Muebles; la medida Ventas sigue calculándose normalmente.

### Personalizar visuales

**Clave** `personalizar-visuales`

**Definición** El autor puede permitir que lectores ajusten campos o tipo de visual dentro de límites configurados.

**Búsqueda** personalize visuals, reader customization

**Para recordar** No es permiso de edición del informe ni del modelo.

**Nota** Requiere Service para comprobar experiencia de lector.

#### Permitir cambiar una vista

1. Activa Personalizar visuales en configuración del informe y en un gráfico compatible.
2. Publica y prueba como lector.

**Resultado esperado** El lector puede cambiar opciones admitidas sin alterar el informe original para otros usuarios.

### Diseño móvil

**Clave** `diseno-movil`

**Definición** Permite reorganizar visuales para pantalla vertical sin cambiar la página de escritorio.

**Búsqueda** mobile layout, phone layout

**Para recordar** Prioriza métricas y controles esenciales.

#### Diseñar versión de teléfono

1. Vista > Diseño móvil; coloca tarjetas y gráfico de tendencia en columna vertical.

**Resultado esperado** Vista móvil organizada de arriba a abajo; escritorio conserva su distribución.

## Análisis exploratorio de visuales

**Clave** `analisis-exploratorio-de-visuales`

### Definición

**Clave** `definicion`

**Definición** Power BI incluye herramientas para identificar patrones, valores extremos y explicaciones potenciales.

**Búsqueda** analytics pane, analyze, anomaly detection

**Para recordar** Valida patrones con datos suficientes y contexto.

#### Añadir línea de referencia

1. En gráfico de columnas de Ventas por AñoMes, filtra enero-febrero 2026.
2. Agrega línea constante de 500 en Analytics o formato equivalente.

**Resultado esperado** Enero 200 queda debajo y febrero 600 por encima.

### Agrupación y binning

**Clave** `agrupacion-y-binning`

**Definición** Los grupos reúnen categorías manualmente; los bins crean intervalos para columnas numéricas o fechas compatibles.

**Búsqueda** grouping, binning, histogram

**Para recordar** Los intervalos modifican el nivel de detalle.

#### Agrupar precios en intervalos

1. En Pedidos[Precio] crea grupo tipo Bin, tamaño 50.
2. Tabla con el campo agrupado y Pedidos total.

**Resultado esperado** Para intervalos alineados desde 50: [50,100) 3, [100,150) 3, [150,200) 2; revisa límites mostrados por la aplicación.

### Clustering

**Clave** `clustering`

**Definición** Agrupa observaciones por similitud entre variables; su resultado depende de los datos y método.

**Búsqueda** clustering, scatter, segmentos

**Para recordar** Un cluster no es automáticamente un segmento comercial válido.

#### Explorar clusters

1. Usa dispersión por PedidoID con Precio y Cantidad.
2. Si está disponible, activa búsqueda automática de clústeres y revisa agrupaciones.

**Resultado esperado** Se crea o propone una agrupación de puntos; con ocho registros no se espera una segmentación estable.

### Forecast y anomalías

**Clave** `forecast-y-anomalias`

**Definición** Los pronósticos extrapolan series temporales; la detección de anomalías señala valores inesperados según patrones.

**Búsqueda** forecast, anomaly detection

**Para recordar** Requieren series suficientes y visuales compatibles.

**Nota** No uses los cuatro meses de actividad del dataset compartido para inferir tendencias confiables.

#### Preparar serie para pronóstico

1. Crea tabla calculada `Serie = ADDCOLUMNS(GENERATESERIES(0,23,1), "Mes", EDATE(DATE(2024,1,1),[Value]), "VentasSimuladas", 100 + 5*[Value] + IF(MOD([Value],6)=0,20,0))`; crea línea temporal continua de Mes y VentasSimuladas.
2. En Analytics prueba Forecast o Anomalies si están habilitados.

**Resultado esperado** Se muestra proyección con intervalo o marcas de anomalía según serie; los valores concretos dependen de configuración y algoritmo.

### Error bars y Analyze

**Clave** `error-bars-y-analyze`

**Definición** Barras de error muestran límites de incertidumbre definidos; Analyze explora factores asociados a cambios.

**Búsqueda** error bars, analyze increase, reference lines

**Para recordar** Declara cómo se obtienen límites; Analyze no prueba causalidad.

#### Mostrar rango presupuestario

1. Crea medidas `Límite bajo = [Objetivo]*0.9` y `Límite alto = [Objetivo]*1.1`.
2. En columnas de Ventas por mes, configura barras de error con esas medidas si el visual lo permite.

**Resultado esperado** Febrero: límites 450 y 550; son tolerancias de meta, no intervalos estadísticos.

### Copilot y narrativa

**Clave** `copilot-y-narrativa`

**Definición** Copilot puede ayudar a proponer páginas, resúmenes o consultas según capacidades disponibles y permisos.

**Búsqueda** copilot, narrative visual, AI summary

**Para recordar** Verifica cada cifra contra medidas y filtros.

**Nota** Requiere configuración y capacidad elegibles; no compartas datos sensibles sin autorización.

#### Solicitar resumen de ventas

1. En entorno habilitado, solicita una narrativa que compare enero y febrero de 2026 usando Ventas.
2. Contrasta cada afirmación con matriz mensual.

**Resultado esperado** Hechos a validar: 200 a 600, aumento de 400; el texto generado no tiene resultado determinista.

### Copilot para páginas y modelos

**Clave** `copilot-para-paginas-y-modelos`

**Definición** Copilot puede proponer visuales para una página o resumir un modelo semántico según las funciones habilitadas.

**Búsqueda** copilot create report page, model summary

**Para recordar** Revisa el modelo y las medidas antes de aceptar sugerencias.

**Nota** Requiere capacidad elegible y permisos; no hay un diseño predeterminado.

#### Proponer una página ejecutiva

1. En un entorno elegible abre Copilot y solicita una página con ventas completadas, pedidos y evolución mensual.
2. Comprueba campos y filtros y corrige visuales si procede.

**Resultado esperado** Propuesta de página o sugerencias disponibles; la validación debe reconciliar 1100 y 7 sin filtros.

## Power BI Service y publicación

**Clave** `power-bi-service-y-publicacion`

### Definición

**Clave** `definicion`

**Definición** Service aloja informes y modelos, permite compartirlos y administrar su ciclo de vida.

**Búsqueda** publish, service, workspace, app.powerbi.com

**Para recordar** Publicar no equivale a dar acceso a todos.

**Nota** Requiere cuenta organizacional y permisos/licencia apropiados.

#### Publicar informe de prueba

1. Inicia sesión en Desktop.
2. Inicio > Publicar y elige un workspace de prueba donde tengas permiso.
3. Abre informe en Service.

**Resultado esperado** Se crean o actualizan informe y modelo semántico, según conexión y artefactos existentes.

### Workspaces y roles

**Clave** `workspaces-y-roles`

**Definición** Los workspaces agrupan contenido; Admin, Member, Contributor y Viewer tienen permisos diferentes.

**Búsqueda** workspace roles, admin, member, contributor, viewer

**Para recordar** Asigna mínimo privilegio.

#### Separar autores y lectores

1. En workspace de prueba abre Administrar acceso.
2. Asigna a un usuario autorizado rol Viewer y a un autor Contributor.
3. Revisa acceso como cada perfil.

**Resultado esperado** Viewer puede consumir contenido permitido; Contributor puede editar contenido del workspace dentro de sus permisos.

### Reportes y dashboards

**Clave** `reportes-y-dashboards`

**Definición** Un reporte contiene una o varias páginas interactivas; un dashboard del Service reúne mosaicos en una única página.

**Búsqueda** report vs dashboard, tiles, pin

**Para recordar** Dashboard no es sinónimo de cualquier página visual.

#### Anclar una tarjeta

1. Abre informe publicado en Service; ancla visual de Ventas a un dashboard nuevo, si admite anclaje.

**Resultado esperado** Dashboard con mosaico de Ventas; al abrirlo se navega al contenido según configuración.

### Apps y audiencias

**Clave** `apps-y-audiencias`

**Definición** Una app distribuye contenido seleccionado del workspace a audiencias definidas.

**Búsqueda** publish app, audiences, distribution

**Para recordar** Una app organiza consumo, no concede automáticamente todos los permisos del workspace.

#### Publicar app de prueba

1. En workspace autorizado crea o actualiza app, incluye Resumen y configura audiencia de prueba.
2. Abre app como lector autorizado.

**Resultado esperado** El lector ve el contenido asignado a su audiencia.

### Compartir y permisos Build

**Clave** `compartir-y-permisos-build`

**Definición** Compartir da acceso al contenido según permisos; Build permite crear nuevos contenidos a partir de un modelo.

**Búsqueda** share, read, build, reshare

**Para recordar** Leer informe no implica permiso para construir informes nuevos.

#### Revisar acceso al modelo

1. En Service abre Administrar permisos del modelo publicado.
2. Comprueba que un lector de prueba tenga solo acceso necesario y concede Build solo si se autoriza autoservicio.

**Resultado esperado** Los permisos muestran quién puede consumir o construir contenido, según configuración.

### Licencias y capacidades

**Clave** `licencias-y-capacidades`

**Definición** Free, Pro, PPU y capacidades Fabric tienen condiciones distintas de creación, distribución y consumo.

**Búsqueda** license, pro, ppu, fabric capacity

**Para recordar** Verifica licencia del autor, lector y capacidad del workspace.

**Nota** No asumas que cualquier capacidad Fabric permite lectores gratuitos; consulta la documentación oficial de SKU y licencias.

#### Determinar distribución

1. En Service inspecciona licencia del usuario y tipo de capacidad del workspace.
2. Contrasta con tabla oficial de licencias antes de compartir.

**Resultado esperado** Puedes determinar si el lector necesita Pro/PPU o si la capacidad permite consumo sin Pro, conforme a condiciones vigentes.

### Suscripciones y alertas

**Clave** `suscripciones-y-alertas`

**Definición** Las suscripciones envían instantáneas o enlaces según configuración; alertas notifican condiciones compatibles.

**Búsqueda** subscription, data alert, email

**Para recordar** No son lo mismo que actualizar el modelo.

#### Configurar aviso de prueba

1. En informe publicado usa Suscribirse si está habilitado; programa envío de prueba a tu propia cuenta.
2. Para alertas, revisa mosaicos compatibles o alertas de Fabric según entorno.

**Resultado esperado** Queda configurada una suscripción y, si está disponible, una regla de alerta; entrega depende de permisos y configuración.

### Exportar y compartir fuera del informe

**Clave** `exportar-y-compartir-fuera-del-informe`

**Definición** Los informes admiten exportación según visual, permisos, formato y políticas; Publish to web hace contenido públicamente accesible.

**Búsqueda** export data, PDF, publish to web, embed

**Para recordar** Nunca uses Publish to web para información privada.

#### Exportar detalle autorizado

1. En un visual de prueba abre Más opciones > Exportar datos.
2. Selecciona datos resumidos si está disponible y revisa archivo.

**Resultado esperado** El archivo refleja datos permitidos y filtros aplicados; no necesariamente incluye cada fila del modelo.

### Endorsement y métricas de uso

**Clave** `endorsement-y-metricas-de-uso`

**Definición** Promoción/certificación indican contenido recomendado o validado según políticas; métricas de uso muestran actividad registrada.

**Búsqueda** promoted, certified, usage metrics

**Para recordar** Certificar requiere autoridad y proceso de calidad.

#### Revisar adopción

1. Abre métricas de uso de un informe publicado con permisos adecuados.
2. Inspecciona vistas y usuarios según periodo disponible.

**Resultado esperado** Aparecen métricas registradas si el servicio las tiene; no se supone un número de visitas.

## Actualización y gateways

**Clave** `actualizacion-y-gateways`

### Definición

**Clave** `definicion`

**Definición** Actualizar recupera cambios del origen para modelos Import; un gateway conecta orígenes que Service no puede alcanzar directamente.

**Búsqueda** refresh, gateway, scheduled refresh

**Para recordar** Actualizar visual no siempre actualiza el modelo.

**Nota** No aplica a una tabla introducida manualmente: usa CSV conectado; restaura el archivo de prueba.

#### Actualizar un CSV

1. En modelo de prueba que importa CSV externo añade una fila válida al archivo.
2. En Desktop pulsa Actualizar.
3. Compara recuento anterior y posterior.

**Resultado esperado** Si el archivo tenía ocho pedidos y agregaste uno, la tarjeta Pedidos total pasa a nueve.

### Scheduled Refresh

**Clave** `scheduled-refresh`

**Definición** Programa actualización del modelo en Service y utiliza credenciales válidas para sus orígenes.

**Búsqueda** scheduled refresh, refresh schedule

**Para recordar** Configura credenciales, gateway si aplica y horario.

#### Programar actualización

1. En modelo publicado de prueba abre Configuración > Credenciales de origen y Actualización programada.
2. Configura un horario autorizado.
3. Revisa historial después de una ejecución real.

**Resultado esperado** Aparece ejecución programada y su estado; no garantiza éxito hasta comprobar historial.

### Gateway local

**Clave** `gateway-local`

**Definición** El gateway permite al servicio acceder a datos en una red privada sin exponer directamente el servidor.

**Búsqueda** on premises gateway, gateway connection

**Para recordar** Servidor y base deben coincidir con la conexión del modelo.

#### Vincular SQL Server local

1. Con administrador autorizado instala/configura gateway estándar en máquina accesible al origen.
2. Registra origen SQL Server con credenciales permitidas y asigna conexión al modelo.

**Resultado esperado** El modelo muestra una conexión de gateway válida si red, credenciales y permisos son correctos.

### Historial y errores de actualización

**Clave** `historial-y-errores-de-actualizacion`

**Definición** El historial identifica fallos de autenticación, gateway, esquema, tipos o tiempos de espera.

**Búsqueda** refresh history, troubleshooting

**Para recordar** Investiga el mensaje antes de cambiar credenciales o pasos.

#### Diagnosticar columna renombrada

1. En copia local de un CSV conectado cambia encabezado Precio a PrecioNuevo; actualiza consulta que esperaba Precio.
2. Revisa error y restaura encabezado.

**Resultado esperado** La consulta dependiente de Precio puede fallar; al restaurar el esquema, vuelve a cargar si no hay otros errores.

### Incremental Refresh

**Clave** `incremental-refresh`

**Definición** Divide la actualización por ventanas de tiempo usando parámetros RangeStart y RangeEnd; conserva histórico y actualiza periodos recientes según política.

**Búsqueda** incremental refresh, partitions, rangestart rangeend

**Para recordar** Filtra >= RangeStart y < RangeEnd para evitar solapamientos.

#### Configurar política temporal

1. Usa tabla de prueba con FechaHora DateTime y origen plegable.
2. Crea parámetros DateTime RangeStart/RangeEnd; filtra rango semiabierto.
3. Configura política y publica en entorno compatible.

**Resultado esperado** Después de actualización inicial en Service se crean particiones conforme a política; no es una ejecución comprobada aquí.

### Automatic Page Refresh

**Clave** `automatic-page-refresh`

**Definición** Actualiza visuales periódicamente en páginas compatibles, típicamente con DirectQuery.

**Búsqueda** automatic page refresh, fixed interval, change detection

**Para recordar** No sustituye actualización de datos Import.

**Nota** Requiere origen/modo compatible y permisos de capacidad; no está disponible igual para todos los modelos.

#### Configurar página en DirectQuery

1. En informe de prueba conectado mediante DirectQuery selecciona página > Formato > Actualización de página.
2. Configura intervalo permitido.
3. Prueba cambios en origen.

**Resultado esperado** Los visuales consultan de nuevo según intervalo y límites de capacidad.

## Seguridad y gobierno

**Clave** `seguridad-y-gobierno`

### Definición

**Clave** `definicion`

**Definición** Power BI combina permisos de acceso con reglas de seguridad de datos y políticas de protección.

**Búsqueda** RLS, OLS, security, governance

**Para recordar** Ocultar una columna no equivale a protegerla.

#### Probar acceso regional

1. En copia del modelo crea rol Mexico con expresión `Clientes[Pais] = "Mexico"` en Clientes.
2. Usa Ver como rol Mexico y abre tarjeta Ventas.

**Resultado esperado** 820 en vez de 1100.

### RLS estático

**Clave** `rls-estatico`

**Definición** Row-level security restringe las filas accesibles a un rol mediante filtros DAX que se propagan por relaciones.

**Búsqueda** row level security, manage roles, view as

**Para recordar** Prueba con rol y como lector real en Service.

#### Crear rol regional

1. Modelado > Administrar roles > Crear Espana.
2. En Clientes usa filtro `Clientes[Pais] = "Espana"`.
3. Ver como Espana.

**Resultado esperado** Ventas 280 y dos pedidos visibles.

### RLS dinámico

**Clave** `rls-dinamico`

**Definición** Usa la identidad del usuario y una tabla de permisos para decidir qué filas puede ver.

**Búsqueda** dynamic RLS, USERPRINCIPALNAME, access table

**Para recordar** No codifiques un rol por usuario si puedes mapear identidades.

**Nota** Protege también la tabla Accesos (por ejemplo, RLS sobre su UPN); en Service asigna usuarios/grupos al rol y prueba con Viewer. RLS no restringe roles de workspace con permiso de edición, como Admin/Member/Contributor.

#### Filtrar por usuario

1. En copia con Accesos desconectada crea rol con filtro en Clientes: `Clientes[Pais] IN SELECTCOLUMNS(FILTER(Accesos, Accesos[UPN] = USERPRINCIPALNAME()), "Pais", Accesos[Pais])`.
2. En Ver como, selecciona rol y Otro usuario ana@example.com.

**Resultado esperado** Ventas 820; con un usuario no mapeado, ninguna venta.

### Object-Level Security

**Clave** `object-level-security`

**Definición** OLS restringe acceso a tablas o columnas y sus metadatos para determinados roles de modelo.

**Búsqueda** OLS, object level security

**Para recordar** Ocultar campos en modelo no proporciona seguridad.

**Nota** Requiere entorno compatible y permisos; no es una opción equivalente a RLS en Desktop.

#### Proteger coste

1. En modelo de prueba compatible usa una herramienta de modelado que configure OLS; niega acceso a Productos[Costo] para un rol de lector.
2. Prueba consulta de esa columna como lector.

**Resultado esperado** El lector restringido no puede consultar el coste; medidas dependientes pueden fallar si requieren el objeto.

### Etiquetas de sensibilidad

**Clave** `etiquetas-de-sensibilidad`

**Definición** Las etiquetas clasifican contenido y pueden aplicar políticas de protección de Microsoft Purview.

**Búsqueda** sensitivity label, confidential, governance

**Para recordar** Clasificación no sustituye permisos ni RLS.

#### Clasificar informe

1. En Service autorizado aplica una etiqueta de prueba permitida por la organización.
2. Revisa la etiqueta en el informe y opciones de exportación.

**Resultado esperado** El contenido queda clasificado según política; protección de exportaciones depende de formato y configuración.

## Rendimiento del modelo

**Clave** `rendimiento-del-modelo`

### Definición

**Clave** `definicion`

**Definición** El rendimiento depende del tamaño del modelo, cardinalidad, relaciones, expresiones DAX y origen.

**Búsqueda** optimization, performance, VertiPaq

**Para recordar** Mide el cuello de botella antes de cambiar el modelo.

#### Medir visuales

1. Desktop > Optimizar o Vista > Analizador de rendimiento.
2. Inicia grabación y actualiza visuales.
3. Expande tiempos del gráfico por categoría.

**Resultado esperado** Se desglosan tiempos de consulta DAX, representación y otros; valores dependen del equipo.

### VertiPaq y cardinalidad

**Clave** `vertipaq-y-cardinalidad`

**Definición** VertiPaq almacena datos Import en columnas comprimidas. Muchas combinaciones únicas y columnas innecesarias pueden aumentar tamaño.

**Búsqueda** vertipaq, compression, cardinality

**Para recordar** Reduce columnas y cardinalidad sin perder significado.

#### Reducir datos no utilizados

1. En copia del modelo elimina una columna de texto de alta cardinalidad no usada, verificando dependencias.
2. Compara tamaño guardado y memoria con herramienta compatible.

**Resultado esperado** El tamaño puede reducirse; no se promete una reducción medible con ocho filas.

### Formula Engine y Storage Engine

**Clave** `formula-engine-y-storage-engine`

**Definición** El Formula Engine coordina lógica DAX; el Storage Engine recupera/agrega datos desde el almacenamiento o el origen según modo.

**Búsqueda** formula engine, storage engine, dax performance

**Para recordar** No toda fórmula lenta se arregla con el mismo cambio.

**Nota** DAX Studio es externo; requiere instalación y permiso de conexión.

#### Examinar tiempos

1. Conecta DAX Studio al PBIX abierto.
2. Activa Server Timings y ejecuta `EVALUATE SUMMARIZECOLUMNS(Productos[Categoria], "Ventas", [Ventas])`.

**Resultado esperado** Dos resultados 650/450 y tiempos según caché/equipo.

### DAX Query View y Performance Analyzer

**Clave** `dax-query-view-y-performance-analyzer`

**Definición** Query View ejecuta consultas DAX; Performance Analyzer ayuda a obtener la consulta generada por un visual.

**Búsqueda** dax query view, performance analyzer, copy query

**Para recordar** Consulta DAX permite inspeccionar resultados sin modificar visuales.

#### Inspeccionar consulta de un visual

1. Graba gráfico de categorías en Analizador de rendimiento.
2. Copia consulta DAX del visual y ejecútala en Query View.

**Resultado esperado** Devuelve datos usados por el visual, incluyendo ventas por categoría y posibles campos auxiliares.

### Optimización de consultas y medidas

**Clave** `optimizacion-de-consultas-y-medidas`

**Definición** Filtros simples, eliminación de trabajo redundante y un modelo estrella ayudan a evitar cálculos costosos.

**Búsqueda** dax optimization, filter performance

**Para recordar** Compara resultados y tiempos, no solo longitud de fórmula.

#### Comparar dos medidas

1. Crea `Ventas A = CALCULATE([Importe], Pedidos[Estado]="completed")` y `Ventas B = CALCULATE([Importe], FILTER(ALL(Pedidos[Estado]), Pedidos[Estado]="completed"))`.
2. Compara sin filtros y por país; mide tiempos.

**Resultado esperado** Ambas dan 1100 global, 820 Mexico y 280 Espana; el tiempo no está predeterminado.

### Tablas de agregación y modelos compuestos

**Clave** `tablas-de-agregacion-y-modelos-compuestos`

**Definición** Los modelos compuestos combinan modos de almacenamiento; agregaciones precomputadas pueden resolver consultas sin leer todo el detalle.

**Búsqueda** composite model, aggregation table, dual mode

**Para recordar** Agregación y detalle deben conservar semántica compatible.

**Nota** No es automático: requiere origen, columnas y mapeo compatibles. Inspecciona la consulta real.

#### Diseñar agregado mensual

1. En modelo de prueba DirectQuery crea tabla agregada Import por mes y categoría con suma de importe completado.
2. Configura Administrar agregaciones y verifica consulta por mes/categoría.

**Resultado esperado** Con configuración válida, el motor puede usar agregado; enero 2026 Tecnologia 200 y febrero Muebles 450.

### Tablas híbridas y particiones

**Clave** `tablas-hibridas-y-particiones`

**Definición** Una tabla híbrida combina particiones Import con una partición DirectQuery para datos recientes en escenarios compatibles.

**Búsqueda** hybrid table, partition, realtime incremental refresh

**Para recordar** Equilibra actualidad y rendimiento con requisitos de capacidad.

#### Diseñar histórico y reciente

1. En modelo compatible configura actualización incremental con opción de datos en tiempo real si disponible.
2. Revisa particiones tras publicar y actualizar.

**Resultado esperado** Histórico en Import y segmento reciente DirectQuery si se cumplen requisitos; el detalle depende de política.

### Reducir filas y granularidad

**Clave** `reducir-filas-y-granularidad`

**Definición** Eliminar filas no necesarias o cargar agregados en lugar de detalle reduce volumen, pero puede impedir análisis posteriores.

**Búsqueda** reduce granularity, remove rows, optimization

**Para recordar** Conserva el detalle cuando lo necesiten KPIs o drillthrough.

#### Comparar detalle y resumen mensual

1. En copia de Pedidos de Power Query, calcula ImporteLinea, filtra completed, agrega AñoMes y agrupa por mes sumando ImporteLinea.
2. Compara número de filas y total con modelo de detalle.

**Resultado esperado** Cuatro filas mensuales: 100, 200, 200 y 600; total 1100. Se pierde detalle de clientes/pedidos si no se conserva en otra tabla.

## Fabric e integración de datos

**Clave** `fabric-e-integracion-de-datos`

### Definición

**Clave** `definicion`

**Definición** Fabric integra almacenamiento, ingeniería y análisis alrededor de OneLake; Power BI consume modelos sobre esos datos.

**Búsqueda** Microsoft Fabric, OneLake, Lakehouse, Warehouse

**Para recordar** Power BI es una capa de análisis, no todo el ecosistema Fabric.

#### Elegir arquitectura

1. Para un modelo con ventas en archivos Delta de Fabric, compara Import y Direct Lake en entorno de prueba autorizado.

**Resultado esperado** Puedes elegir un modo compatible y evaluar actualización, rendimiento y permisos; no se presupone capacidad activa.

### Dataflows y Dataflows Gen2

**Clave** `dataflows-y-dataflows-gen2`

**Definición** Los dataflows permiten reutilizar transformaciones Power Query en servicio; Gen2 añade destinos de datos de Fabric y otros destinos compatibles.

**Búsqueda** dataflow, gen2, ETL cloud

**Para recordar** Separa preparación compartida de cálculos del modelo.

**Nota** Gen1 y Gen2 tienen diferencias de licencia, capacidad y destino; usa el tipo disponible.

#### Preparar productos reutilizables

1. En workspace compatible crea dataflow de prueba, conecta Productos.csv desde un origen accesible al servicio.
2. Tipa columnas y configura destino si Gen2.
3. Ejecuta y conecta al resultado desde Desktop.

**Resultado esperado** Tres productos en origen preparado si el flujo finaliza correctamente.

### Lakehouse, Warehouse y Direct Lake

**Clave** `lakehouse-warehouse-y-direct-lake`

**Definición** Lakehouse combina archivos y tablas Delta; Warehouse ofrece experiencia SQL analítica. Direct Lake consume tablas compatibles de OneLake mediante modelos semánticos.

**Búsqueda** lakehouse, warehouse, direct lake, delta

**Para recordar** No es necesario copiar todos los datos a Import en escenarios Direct Lake compatibles.

**Nota** Requiere Fabric y permisos/capacidad; comportamiento de Direct Lake depende de variante y configuración.

#### Crear modelo desde Lakehouse

1. En Fabric autorizado carga Pedidos como tabla Delta de un Lakehouse de prueba.
2. Crea modelo semántico compatible en Direct Lake; añade dimensiones y relaciones equivalentes.
3. Crea Importe.

**Resultado esperado** Con datos completos y modelo equivalente, 1150 sin filtros; revisa modo efectivo.

## Desarrollo y ciclo de vida

**Clave** `desarrollo-y-ciclo-de-vida`

### Definición

**Clave** `definicion`

**Definición** Proyectos, herramientas externas y entornos separados facilitan mantener, revisar y desplegar modelos e informes.

**Búsqueda** PBIP, TMDL, Git, deployment pipelines

**Para recordar** Versiona definiciones y evita publicar cambios sin validación.

#### Separar desarrollo y producción

1. Crea espacios de prueba Dev y Test con acceso autorizado.
2. Publica primero en Dev y verifica medidas con datos de prueba antes de desplegar.

**Resultado esperado** El contenido de prueba se valida sin reemplazar directamente producción.

### PBIP y Git

**Clave** `pbip-y-git`

**Definición** Power BI Project separa definiciones de informe y modelo en archivos de proyecto aptos para control de versiones.

**Búsqueda** pbip, project, git, source control

**Para recordar** No subas credenciales ni datos privados al repositorio.

**Nota** Revisa compatibilidad y limitaciones de PBIP de tu versión.

#### Guardar proyecto

1. En Desktop compatible guarda copia como Power BI Project (.pbip).
2. Inspecciona carpetas de informe y modelo; añade al repositorio privado autorizado con exclusiones adecuadas.

**Resultado esperado** Archivos de definición versionables y un historial de cambios si haces commit.

### TMDL, XMLA y Tabular Editor

**Clave** `tmdl-xmla-y-tabular-editor`

**Definición** TMDL representa metadatos tabulares en texto; XMLA permite conexión al modelo en capacidades compatibles; Tabular Editor administra metadatos avanzados.

**Búsqueda** tmdl, xmla endpoint, tabular editor

**Para recordar** Metadatos y datos son cosas distintas.

**Nota** XMLA remoto y herramientas externas requieren capacidad, permisos y configuración compatibles.

#### Inspeccionar definición de medida

1. En Desktop compatible abre vista TMDL y arrastra tabla Pedidos o medida Ventas para generar definición.
2. Inspecciona expresión sin aplicar cambios.

**Resultado esperado** La definición muestra fórmula y propiedades de la medida; no cambia el resultado 1100.

### Deployment Pipelines

**Clave** `deployment-pipelines`

**Definición** Permiten promover contenido entre etapas y gestionar reglas de despliegue según recursos compatibles.

**Búsqueda** deployment pipelines, dev test prod

**Para recordar** Valida conexiones y medidas en cada etapa.

#### Desplegar a entorno de prueba

1. En Fabric/Service compatible crea pipeline, asigna Dev y Test.
2. Compara elementos y despliega solo informe/modelo de prueba.
3. Revisa credenciales y reglas de origen.

**Resultado esperado** Artefactos disponibles en Test tras despliegue exitoso; revisa que el modelo apunte a datos de prueba.

### REST API y Embedded

**Clave** `rest-api-y-embedded`

**Definición** Las API permiten automatizar operaciones autorizadas; Embedded integra informes en aplicaciones mediante autenticación y permisos apropiados.

**Búsqueda** power bi rest api, embedded, automation

**Para recordar** Token, identidad y permisos deben corresponder al escenario.

**Nota** Embedded requiere diseño de identidad, capacidad y licencias según escenario; no uses Publish to web para reemplazar autenticación.

#### Consultar workspaces autorizados

1. En entorno de desarrollo autorizado obtiene token de Microsoft Entra con permisos necesarios.
2. Realiza GET `https://api.powerbi.com/v1.0/myorg/groups` con Authorization Bearer del token.
3. No publiques el token.

**Resultado esperado** JSON con `value` que lista workspaces accesibles o error de autorización si faltan permisos.

## Informes paginados

**Clave** `informes-paginados`

### Definición

**Clave** `definicion`

**Definición** Los paginated reports tienen diseño de página fijo y están orientados a documentos detallados, impresión y exportación.

**Búsqueda** paginated report, RDL, report builder

**Para recordar** Usa reporte interactivo para exploración y paginado para detalle imprimible.

**Nota** Report Builder es herramienta externa para Windows; publicar/consumir en Service requiere permisos y licencias aplicables.

#### Diseñar listado de pedidos

1. En Power BI Report Builder compatible conecta origen o modelo autorizado.
2. Crea dataset que devuelva PedidoID, Fecha, Estado y una tabla Tablix.
3. Previsualiza y exporta a PDF si tienes permiso.

**Resultado esperado** Listado de ocho pedidos si el dataset corresponde al modelo compartido sin filtros; el formato controla saltos de página.

### Parámetros y diseño de impresión

**Clave** `parametros-y-diseno-de-impresion`

**Definición** Los parámetros filtran datasets o controlan presentación; el diseño fija márgenes, encabezados y paginación.

**Búsqueda** RDL parameters, tablix, page layout

**Para recordar** Comprueba tamaño de página antes de exportar.

#### Filtrar listado por estado

1. En Report Builder añade parámetro Estado con valores completed y cancelled.
2. Vincula a un filtro de dataset o Tablix sobre Estado.
3. Previsualiza con completed.

**Resultado esperado** Siete filas, una por pedido completado, si se usa el dataset compartido.

## Fuentes

Documentación oficial utilizada como referencia de alcance y comportamiento. Los datasets, fórmulas adaptadas y casos de negocio de estas fichas son ejemplos editoriales propios. Para características dependientes del tenant, capacidad, versión o licencia, verifica las condiciones del artículo correspondiente antes de aplicar los pasos.

- [Guía PL-300, Microsoft Power BI Data Analyst](https://learn.microsoft.com/es-mx/credentials/certifications/resources/study-guides/pl-300): objetivos vigentes desde el 20 de abril de 2026; preparación, modelado, análisis, administración y seguridad.
- [Documentación de Power BI](https://learn.microsoft.com/en-us/power-bi/): Desktop, Service, informes y documentación de implementación.
- [Documentación de Power Query](https://learn.microsoft.com/en-us/power-query/): conectores, editor, tipos, transformaciones, combinación, parámetros y perfilado.
- [Buenas prácticas de Power Query](https://learn.microsoft.com/en-us/power-query/best-practices): tipos, perfilado, filtros y organización.
- [Evaluación y query folding](https://learn.microsoft.com/power-query/power-query-folding): plegado total, parcial y procesamiento local.
- [Referencia de M](https://learn.microsoft.com/en-us/powerquery-m/): sintaxis y funciones Table, List, Text, Date, Number y tratamiento de errores.
- [Conectores de Power Query](https://learn.microsoft.com/en-us/power-query/connectors/): modos y requisitos por fuente.
- [Esquema estrella](https://learn.microsoft.com/power-bi/guidance/star-schema): granularidad, hechos, dimensiones y modelado histórico.
- [Relaciones de modelo](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-relationships-understand): cardinalidad, dirección, relaciones activas e inactivas.
- [Guía de relaciones muchos a muchos](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-many-to-many): tablas puente y propagación.
- [Tablas de fechas](https://learn.microsoft.com/en-us/power-bi/guidance/model-date-tables): calendario continuo y marcado de fecha.
- [Opciones de cálculo en Desktop](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-calculations-options): medida, columna, tabla y cálculo visual.
- [Introducción a DAX](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-quickstart-learn-dax-basics): sintaxis y contextos.
- [Referencia de sintaxis DAX](https://learn.microsoft.com/en-us/dax/dax-syntax-reference): referencias, operadores y tipos.
- [Referencia de funciones DAX](https://learn.microsoft.com/en-us/dax/dax-function-reference): agregaciones, iteradores, lógica, fechas, tablas, ranking y funciones de filtro.
- [CALCULATE](https://learn.microsoft.com/en-us/dax/calculate-function-dax/): filtros, reemplazo de contexto y transición de contexto.
- [Funciones de filtro DAX](https://learn.microsoft.com/en-us/dax/filter-functions-dax): ALL, KEEPFILTERS, REMOVEFILTERS, FILTER y funciones relacionadas.
- [Grupos de cálculo](https://learn.microsoft.com/en-us/power-bi/transform-model/calculation-groups): elementos de cálculo y medidas explícitas.
- [Cálculos visuales](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-create): ámbito y edición de cálculos visuales.
- [Informes de Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-reports-overview): visuales, navegación, marcadores y opciones de informe.
- [Documentación de visualizaciones](https://learn.microsoft.com/en-us/power-bi/visuals/): configuración y compatibilidad de gráficos.
- [Segmentadores](https://learn.microsoft.com/power-bi/visuals/power-bi-visualization-slicers): filtros interactivos y sincronización.
- [Drillthrough](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough): navegación a detalle y filtros.
- [Field parameters](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-field-parameters): selección dinámica de campos.
- [Tutorial completo de datos a app](https://learn.microsoft.com/power-bi/create-reports/tutorial-end-to-end-power-bi): modelado, diseño y publicación.
- [Actualización de datos](https://learn.microsoft.com/power-bi/connect-data/refresh-data): modos, actualización y requisitos.
- [Actualización programada](https://learn.microsoft.com/power-bi/connect-data/refresh-scheduled-refresh): credenciales, horarios y gateway.
- [Guía de DirectQuery](https://learn.microsoft.com/en-us/power-bi/guidance/directquery-model-guidance): modelado y rendimiento.
- [Seguridad a nivel de fila](https://learn.microsoft.com/power-bi/service-admin-rls): roles, usuarios, seguridad y límites.
- [Documentación de Microsoft Fabric](https://learn.microsoft.com/en-us/fabric/): capacidades, OneLake, Direct Lake, dataflows, implementación y gobierno.
- [Documentación de Power BI para desarrolladores](https://learn.microsoft.com/en-us/power-bi/developer/): Embedded y automatización.
- [API REST de Power BI](https://learn.microsoft.com/en-us/rest/api/power-bi/): endpoints y autorización.
- [Informes paginados](https://learn.microsoft.com/en-us/power-bi/paginated-reports/): Report Builder, datasets, parámetros y exportación.
- [DAX Studio](https://daxstudio.org/docs/): herramienta externa, consultas y Server Timings.
- [Tabular Editor](https://docs.tabulareditor.com/): herramienta externa de modelado y metadatos.
- [Licencias y características del servicio](https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type): requisitos por licencia y capacidad.
- [Actualización incremental](https://learn.microsoft.com/en-us/power-bi/connect-data/incremental-refresh-overview): particiones, ventanas y tiempo real.
- [Proyectos PBIP](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview): definición de proyectos y limitaciones.
- [Seguridad OLS](https://learn.microsoft.com/en-us/fabric/security/service-admin-object-level-security): protección de tablas y columnas y límites según rol.
