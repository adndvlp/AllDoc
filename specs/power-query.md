# Power Query

**Clave** `power-query`

**Área** Análisis de datos

**Resumen** Conecta, limpia, combina y transforma datos con operaciones reproducibles en Excel, Power BI y Power Query Online.

**Alcance** Preparación de datos para Data Analyst / Business Analyst Jr: editor visual, lenguaje M, conexiones, limpieza, transformación, integración, validación, automatización, rendimiento, actualización y publicación; incluye fundamentos de M avanzado e integración con APIs. No es un inventario de todas las funciones de la biblioteca M ni un temario de DAX.

**Entorno** Power BI Desktop en Windows como referencia visual; también Power Query de Excel para Windows y Microsoft 365 para Mac donde exista la función. Los conectores, algunos comandos y los destinos varían por producto, plataforma, licencia y versión. M se ejecuta en un motor Power Query, no en SQL Workbench ni en el editor SQLite de AllDoc. Las funciones M conservan sus nombres en inglés y distinguen mayúsculas de minúsculas. Los resultados de esta guía son esperados, no ejecutados en el motor M.

## Datos compartidos

**Preparación**

En Power BI Desktop: Inicio > Transformar datos > Nueva fuente > Consulta en blanco. En Excel, usa Datos > Obtener datos > Consulta en blanco cuando esté disponible. Abre el Editor avanzado, pega el bloque completo de cada consulta y renómbrala exactamente como se indica. Las consultas de ejemplo son independientes: no modifiques las bases. Crea una consulta en blanco por ejemplo, o duplica una base para practicar visualmente. Los fragmentos que son expresiones M completas se pueden pegar directamente en el Editor avanzado; si usas la barra de fórmulas, antepón `=`. Las consultas de archivos o servicios indican los requisitos aparte.

**Pedidos**

```powerquery
#table(
    type table [id=Int64.Type, cliente=Int64.Type, fecha=date, estado=text, importe=number, canal=nullable text],
    {
        {101, 1, #date(2026,1,5), "completado", 100, "Web"},
        {102, 1, #date(2026,1,20), "completado", 200, "Tienda"},
        {103, 2, #date(2026,1,20), "cancelado", 80, "Web"},
        {104, 2, #date(2026,2,3), "completado", 150, "Web"},
        {105, 3, #date(2026,2,3), "completado", 150, null},
        {106, 3, #date(2026,2,10), "pendiente", 50, "Tienda"},
        {107, 1, #date(2026,2,18), "completado", 300, "Web"}
    }
)
```

**Clientes**

```powerquery
#table(
    type table [cliente=Int64.Type, nombre=text, pais=nullable text, alta=date],
    {
        {1, "Ana", "México", #date(2025,12,20)},
        {2, "Luis", "México", #date(2026,1,1)},
        {3, "Marta", "España", #date(2026,1,15)},
        {4, "Diego", null, #date(2026,2,1)}
    }
)
```

**Leads**

```powerquery
#table(
    type table [id=Int64.Type, correo=nullable text, origen=text, fecha=date],
    {
        {1, " ANA@ejemplo.com ", "Ads", #date(2026,1,2)},
        {2, "ana@ejemplo.com", "Web", #date(2026,1,4)},
        {3, "luis@ejemplo.com", "Ads", #date(2026,1,5)},
        {4, "luis@ejemplo.com", "Web", #date(2026,1,6)},
        {5, null, "Web", #date(2026,1,7)},
        {6, "", "Ads", #date(2026,1,8)}
    }
)
```

**Presupuesto**

```powerquery
#table(type table [categoria=text, Ene=number, Feb=number],
    {{"Electrónica", 400, 500}, {"Hogar", 200, 300}})
```

**Importacion**

```powerquery
#table(type table [id=text, importe=text, fecha=text],
    {{"1", "1.234,50", "31/01/2026"}, {"2", "N/D", "01/02/2026"}, {"3", "25,00", "02/02/2026"}})
```

**Referencias de los datos**

- `Pedidos[cliente]` se relaciona con `Clientes[cliente]`: varios pedidos por cliente; Diego no tiene pedidos. `id` identifica cada pedido. `importe` es el valor individual, no necesariamente ingreso reconocido.
- Pedidos: 7 filas, 6 columnas; suma de importes 1030; 5 completados, suma 900; enero 380 y febrero 650 (todos los estados). Los importes completados por mes son 300 y 600. Los resultados con `Table.Group` o `Table.Distinct` se presentan como conjuntos de filas, sin prometer su orden; ordena explícitamente si lo necesitas.
- Clientes: 4 filas, 4 columnas; 3 registros con país no nulo (2 países distintos). Leads: 6 filas, con espacios, diferencias de caso, duplicados, `null` y texto vacío. Presupuesto: 2 filas, formato ancho. Importacion: 3 filas de texto con cultura `es-ES`, una conversión de importe inválida.
- Los ejemplos literales (`#table`, listas, registros, JSON de texto) no necesitan archivos externos. No se presume que este dataset ya exista en AllDoc.

## Power Query y ETL

**Clave** `power-query-y-etl`

### Definición

**Clave** `definicion`

**Definición** Power Query obtiene y transforma datos antes de cargarlos. ETL significa extraer, transformar y cargar.

**Búsqueda** qué es Power Query, ETL, para qué sirve

**Para recordar** La consulta describe cómo preparar datos, no modifica automáticamente el origen.

#### Preparar pedidos para un reporte

1. Abre una copia de Pedidos en el editor
2. Filtra estado a completado
3. Conserva id e importe

La salida solo incluye las columnas y filas que necesita el reporte.

**Resultado esperado** 5 filas: (101,100), (102,200), (104,150), (105,150), (107,300).

### Power Query, M y DAX

**Clave** `power-query-m-y-dax`

**Definición** M prepara datos; DAX calcula sobre el modelo de Power BI o Power Pivot.

**Búsqueda** diferencia M DAX SQL, cuándo usar Power Query

**Para recordar** M se evalúa al consultar o actualizar; una medida DAX responde al contexto del informe.

#### Crear importe con impuesto en la preparación

```powerquery
Table.AddColumn(Pedidos, "con_impuesto", each [importe] * 1.16, type number)
```

Table.AddColumn añade una columna; each aplica el cálculo a cada fila y [importe] lee su importe. La columna se incorpora a la tabla que se cargará al modelo.

**Resultado esperado** 7 filas; id 101 tiene con_impuesto=116. No se ha creado una medida DAX.

### Editor y vista previa

**Clave** `editor-y-vista-previa`

**Definición** El editor muestra las consultas, la vista previa y los pasos aplicados.

**Búsqueda** interfaz, panel consultas, preview

**Para recordar** Seleccionar un paso muestra su resultado intermedio.

#### Inspeccionar la consulta Pedidos

1. Selecciona Pedidos en Consultas
2. Observa la cuadrícula central
3. Revisa Configuración de consulta > Pasos aplicados

La vista previa no certifica el volumen total de un origen grande.

**Resultado esperado** 7 filas y seis columnas en este dataset.

## Obtener datos y conectores

**Clave** `obtener-datos-y-conectores`

### Definición

**Clave** `definicion`

**Definición** Un conector obtiene datos de un archivo, servicio o base de datos y devuelve los objetos disponibles.

**Búsqueda** Get Data, origen, conector, Navigator

**Para recordar** Primero eliges el origen y luego la entidad.

#### Importar una tabla del libro

1. Crea una tabla de Excel con encabezados id e importe y las filas 1/100 y 2/200
2. Usa Datos > Desde tabla o rango

En Excel, la tabla del libro pasa a una consulta.

**Resultado esperado** 2 filas con id e importe.

### Excel

**Clave** `excel`

**Definición** El conector Excel lee hojas, tablas y rangos con nombre de un libro.

**Búsqueda** Excel.Workbook, importar xlsx, Navigator

**Para recordar** Una tabla de Excel definida es más estable que un rango de posiciones.

**Nota** Requiere el archivo local; en Mac revisa la matriz de conectores de Excel.

#### Leer la tabla Ventas del archivo

1. Crea ventas.xlsx con una tabla llamada Ventas: id e importe, filas 1/100 y 2/200
2. En Power Query elige Excel Workbook y selecciona Ventas en el Navegador
3. Pulsa Transformar datos

Selecciona la tabla, no una hoja distinta.

**Resultado esperado** 2 filas con id e importe.

### CSV y TXT

**Clave** `csv-y-txt`

**Definición** Los archivos delimitados separan campos mediante caracteres como coma, punto y coma o tabulador.

**Búsqueda** CSV, TXT, Csv.Document, delimitador

**Para recordar** Comprueba delimitador y codificación antes de asignar tipos.

#### Leer texto separado por punto y coma

```powerquery
Csv.Document("id;importe#(lf)1;100#(lf)2;200", [Delimiter=";", Encoding=65001])
```

Se interpreta el texto literal como contenido CSV, no como ruta.

**Resultado esperado** Column1 y Column2: (id,importe), (1,100), (2,200), todavía como texto.

### SQL

**Clave** `sql`

**Definición** Un conector de base de datos permite navegar tablas y vistas con credenciales autorizadas.

**Búsqueda** SQL Server, MySQL, PostgreSQL, Sql.Database

**Para recordar** Usa el conector del motor correcto y permisos de lectura.

**Nota** Requiere servidor, conexión y credenciales reales. MySQL y PostgreSQL usan conectores distintos; disponibilidad según producto.

#### Importar una tabla de SQL Server

1. Con una base de prueba que tenga dbo.Ventas(id, importe) y filas (1,100),(2,200), elige SQL Server
2. Especifica servidor y base autorizados
3. Selecciona dbo.Ventas en Navegador y transforma

No necesitas escribir una consulta SQL para navegar una tabla.

**Resultado esperado** 2 filas si la tabla contiene solo los datos de prueba.

### JSON y XML

**Clave** `json-y-xml`

**Definición** Los conectores de documentos estructurados conservan listas, registros o tablas que se pueden expandir.

**Búsqueda** JSON, XML, Json.Document, Xml.Tables

**Para recordar** Una estructura anidada puede necesitar más de una expansión.

#### Leer un documento JSON pequeño

```powerquery
Json.Document("[{""id"":1},{""id"":2}]")
```

Las comillas dobles internas se escapan duplicándolas en M.

**Resultado esperado** Lista de 2 registros: [id=1] y [id=2].

### Web y SharePoint

**Clave** `web-y-sharepoint`

**Definición** Web consulta recursos HTTP; SharePoint dispone de conectores para listas y archivos.

**Búsqueda** Web, SharePoint Folder, SharePoint Online List

**Para recordar** Elige el tipo de recurso y no confundas una lista con una carpeta.

**Nota** Requiere acceso a SharePoint; no se necesita para los demás ejemplos.

#### Conectar una lista de SharePoint

1. En un sitio autorizado crea una lista Ventas con dos elementos A y B
2. Elige SharePoint Online List y proporciona la URL del sitio
3. Autentícate y selecciona Ventas

El conector navega las listas del sitio.

**Resultado esperado** 2 elementos A y B, más las columnas de sistema de SharePoint.

## Encabezados y esquema inicial

**Clave** `encabezados-y-esquema-inicial`

### Definición

**Clave** `definicion`

**Definición** El esquema indica nombres y tipos de columnas. Antes de transformar, identifica encabezados, filas útiles y formatos.

**Búsqueda** encabezados, esquema, importar columnas

**Para recordar** No conviertas la fila de títulos en una fila de datos.

#### Promover la primera fila a encabezado

```powerquery
Table.PromoteHeaders(#table({"Column1","Column2"}, {{"id","importe"},{1,100}}))
```

En interfaz: Inicio o Transformar > Usar la primera fila como encabezado.

**Resultado esperado** Columnas id e importe; una fila (1,100).

### Quitar encabezados incorrectos

**Clave** `quitar-encabezados-incorrectos`

**Definición** La degradación vuelve a colocar los nombres de columnas como primera fila de datos.

**Búsqueda** Demote Headers, Table.DemoteHeaders

**Para recordar** Úsalo si la primera promoción fue incorrecta o necesitas reorganizar el encabezado.

#### Recuperar la fila de títulos

```powerquery
Table.DemoteHeaders(#table({"id","importe"}, {{1,100}}))
```

La tabla recibe nombres genéricos.

**Resultado esperado** Column1 y Column2, filas (id,importe) y (1,100).

### Quitar filas de metadatos

**Clave** `quitar-filas-de-metadatos`

**Definición** Algunos archivos empiezan con títulos o comentarios antes de los datos reales.

**Búsqueda** Table.Skip, Remove Top Rows

**Para recordar** Quita las filas iniciales antes de promover encabezados.

#### Quitar la portada de un reporte

```powerquery
let T = #table({"A","B"}, {{"Reporte",null},{"id","importe"},{1,100}}) in Table.PromoteHeaders(Table.Skip(T,1))
```

Se elimina la fila de portada antes de promover.

**Resultado esperado** id e importe, una fila (1,100).

## Lenguaje M

**Clave** `lenguaje-m`

### Definición

**Clave** `definicion`

**Definición** M es un lenguaje de expresiones que devuelve valores; los pasos del editor son expresiones con nombre.

**Búsqueda** M, Power Query Formula Language, código

**Para recordar** Cada paso puede usar el resultado de otro paso.

#### Calcular un valor

```powerquery
100 + 50
```

Una consulta no tiene que devolver una tabla.

**Resultado esperado** 150.

### let e in

**Clave** `let-e-in`

**Definición** `let` define valores con nombre; `in` selecciona el valor que devuelve la expresión.

**Búsqueda** let in, pasos M, variable

**Para recordar** Las definiciones se separan por comas; `in` devuelve una expresión.

#### Obtener el importe con descuento

```powerquery
let
    Precio = 200,
    Descuento = 0.1,
    Neto = Precio * (1 - Descuento)
in
    Neto
```

Neto depende de Precio y Descuento.

**Resultado esperado** 180.

### Identificadores y comentarios

**Clave** `identificadores-y-comentarios`

**Definición** Los nombres con espacios pueden escribirse como `#"Nombre con espacios"`; `//` comenta una línea y `/* */` un bloque.

**Búsqueda** pasos con espacios, comentarios M

**Para recordar** M distingue mayúsculas; referencia el nombre exacto.

#### Nombrar un paso con espacios

```powerquery
let
    #"Importe neto" = 100 - 10 // Descuento aplicado
in
    #"Importe neto"
```

Las comillas del identificador no crean un texto.

**Resultado esperado** 90.

### Operadores

**Clave** `operadores`

**Definición** M usa `=`, `<>`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, operaciones aritméticas y `&` para concatenar.

**Búsqueda** operadores M, igualdad, concatenar

**Para recordar** En M `=` compara; no uses `==`.

#### Comprobar un importe

```powerquery
(150 >= 100) and not (150 = 200)
```

Los paréntesis hacen explícitas las condiciones.

**Resultado esperado** true.

### Funciones y each

**Clave** `funciones-y-each`

**Definición** Una función recibe argumentos y devuelve un valor; `each` abrevia una función de un argumento.

**Búsqueda** each, _, lambda, función M

**Para recordar** `each [importe]` equivale a `(_) => _[importe]` cuando el argumento es un registro.

#### Duplicar un importe

```powerquery
let Doble = (x as number) as number => x * 2 in Doble(50)
```

El tipo del argumento es number y el resultado también.

**Resultado esperado** 100.

## Valores estructurados de M

**Clave** `valores-estructurados-de-m`

### Definición

**Clave** `definicion`

**Definición** M representa colecciones como listas, registros y tablas. Una lista tiene posiciones, un registro campos y una tabla filas y columnas.

**Búsqueda** list record table, estructuras M

**Para recordar** Las estructuras se pueden anidar y transformar.

#### Crear una fila de pedido

```powerquery
[id=101, importe=100]
```

El registro tiene dos campos nombrados.

**Resultado esperado** [id=101, importe=100].

### List

**Clave** `list`

**Definición** Una lista contiene elementos en secuencia y usa llaves; sus posiciones empiezan en cero.

**Búsqueda** lista, llaves, índice cero

**Para recordar** `{0}` obtiene el primer elemento.

#### Leer el segundo importe

```powerquery
{100, 200, 150}{1}
```

El índice 1 es el segundo valor.

**Resultado esperado** 200.

### Record

**Clave** `record`

**Definición** Un registro agrupa campos por nombre entre corchetes.

**Búsqueda** registro, Record.Field, campo

**Para recordar** Accede al campo por su nombre, no por posición.

#### Leer el nombre del cliente

```powerquery
[cliente=1, nombre="Ana"][nombre]
```

El segundo par de corchetes selecciona el campo.

**Resultado esperado** "Ana".

### Table

**Clave** `table`

**Definición** Una tabla contiene filas con columnas nombradas y puede tener tipos definidos.

**Búsqueda** #table, Table.FromRecords, tabla literal

**Para recordar** `#table` recibe nombres o tipo de tabla y una lista de filas.

#### Construir dos pedidos

```powerquery
#table({"id","importe"}, {{1,100},{2,200}})
```

Cada lista interna representa una fila.

**Resultado esperado** Columnas id e importe; (1,100), (2,200).

### Acceso a columnas y filas

**Clave** `acceso-a-columnas-y-filas`

**Definición** `Tabla[columna]` devuelve una lista y `Tabla{posición}` devuelve un registro de fila.

**Búsqueda** extraer columna, seleccionar fila, drill down

**Para recordar** Distingue devolver una tabla, una lista y un valor.

#### Leer el importe de la primera fila

```powerquery
Pedidos{0}[importe]
```

Primero selecciona la fila y después su campo.

**Resultado esperado** 100.

### Conversión entre estructuras

**Clave** `conversion-entre-estructuras`

**Definición** `Table.FromRecords`, `Table.FromList` y `Table.ToRecords` permiten cambiar la forma del dato.

**Búsqueda** lista a tabla, registros a tabla

**Para recordar** Una lista de registros con campos comunes puede convertirse en tabla.

#### Convertir registros en tabla

```powerquery
Table.FromRecords({[id=1, importe=100], [id=2, importe=200]})
```

Cada registro se transforma en una fila.

**Resultado esperado** 2 filas, columnas id e importe.

## Tipos de datos

**Clave** `tipos-de-datos`

### Definición

**Clave** `definicion`

**Definición** Los tipos determinan qué operaciones y comparaciones se pueden aplicar. Power Query puede inferirlos, pero conviene revisarlos.

**Búsqueda** tipos, ABC 123, type, cambio de tipo

**Para recordar** Asigna el tipo según el significado del dato, no solo su aspecto.

#### Convertir identificadores de texto a enteros

```powerquery
Table.TransformColumnTypes(Importacion, {{"id", Int64.Type}})
```

En interfaz: icono de tipo en el encabezado > Número entero.

**Resultado esperado** id=1,2,3 como enteros; importe y fecha siguen siendo texto.

### Texto y números

**Clave** `texto-y-numeros`

**Definición** `text`, `number`, `Int64.Type` y `Currency.Type` representan texto y distintos formatos numéricos.

**Búsqueda** texto, decimal, entero, moneda

**Para recordar** Los códigos con ceros a la izquierda suelen ser texto; moneda fija evita ciertos problemas de precisión.

#### Conservar un código con ceros

```powerquery
Text.From("0012")
```

No se convierte a entero.

**Resultado esperado** "0012".

### Fecha, hora y duración

**Clave** `fecha-hora-y-duracion`

**Definición** `date`, `time`, `datetime`, `datetimezone` y `duration` representan valores temporales diferentes.

**Búsqueda** date time datetime timezone duration

**Para recordar** Una duración es un intervalo, no una fecha.

#### Crear una fecha con hora

```powerquery
#datetime(2026, 2, 3, 14, 30, 0)
```

Los últimos tres componentes son hora, minuto y segundo.

**Resultado esperado** 3 de febrero de 2026, 14:30:00, sin zona horaria.

### Logical y nullable

**Clave** `logical-y-nullable`

**Definición** `logical` representa true/false; un tipo `nullable` permite además null.

**Búsqueda** boolean, logical, nullable, any

**Para recordar** `null` no es false ni cero; `any` no fija un tipo específico.

#### Comprobar un indicador

```powerquery
Value.Is(true, type logical)
```

Value.Is comprueba compatibilidad con un tipo.

**Resultado esperado** true.

### Conversión explícita

**Clave** `conversion-explicita`

**Definición** Las funciones `Number.From`, `Number.FromText`, `Text.From` y `Date.From` convierten valores individuales.

**Búsqueda** cast, conversión, Number.From, Date.From

**Para recordar** Convertir un texto inválido produce error si no lo controlas.

#### Convertir un importe de texto

```powerquery
Number.FromText("150.50", "en-US")
```

La cultura especifica cómo interpretar los separadores.

**Resultado esperado** 150.5 como número.

### Configuración regional

**Clave** `configuracion-regional`

**Definición** La cultura indica cómo interpretar separadores decimales, fechas y otros formatos regionales.

**Búsqueda** Using Locale, es-ES, en-US

**Para recordar** No interpretes 1.234,50 como si usara formato estadounidense.

**Nota** El error N/D se trata en el grupo Errores.

#### Convertir importe y fecha españoles

```powerquery
Table.TransformColumnTypes(Importacion, {{"importe", type number}, {"fecha", type date}}, "es-ES")
```

En interfaz: Cambiar tipo > Usar configuración regional.

**Resultado esperado** Importe 1234.5, Error, 25; fechas 31/01, 01/02 y 02/02 de 2026.

## Columnas

**Clave** `columnas`

### Definición

**Clave** `definicion`

**Definición** Las transformaciones de columnas cambian qué campos se conservan y cómo se llaman.

**Búsqueda** elegir columnas, seleccionar, eliminar

**Para recordar** Seleccionar columnas no es filtrar filas.

#### Conservar solo identificador e importe

```powerquery
Table.SelectColumns(Pedidos, {"id", "importe"})
```

Inicio > Elegir columnas.

**Resultado esperado** 7 filas, únicamente id e importe.

### Eliminar columnas

**Clave** `eliminar-columnas`

**Definición** `Table.RemoveColumns` descarta los campos indicados.

**Búsqueda** Remove Columns, quitar columnas

**Para recordar** Conserva los demás campos y las filas.

#### Quitar el canal

```powerquery
Table.RemoveColumns(Pedidos, {"canal"})
```

Elimina una columna sin filtrar pedidos.

**Resultado esperado** 7 filas, 5 columnas, sin canal.

### Renombrar columnas

**Clave** `renombrar-columnas`

**Definición** `Table.RenameColumns` cambia nombres sin cambiar valores.

**Búsqueda** Rename, renombrar encabezado

**Para recordar** Se indica el nombre anterior y el nuevo.

#### Renombrar importe a ventas

```powerquery
Table.RenameColumns(Pedidos, {{"importe", "ventas"}})
```

La lista interna contiene el par anterior/nuevo.

**Resultado esperado** 7 filas; ventas sustituye a importe.

### Duplicar columna

**Clave** `duplicar-columna`

**Definición** `Table.DuplicateColumn` crea una copia para conservar el original.

**Búsqueda** Duplicate Column, copiar columna

**Para recordar** Útil antes de limpiar un campo cuyo valor original necesitas conservar.

#### Copiar los correos originales

```powerquery
Table.DuplicateColumn(Leads, "correo", "correo_original")
```

La copia contiene también null y texto vacío.

**Resultado esperado** 6 filas; correo y correo_original iguales en cada fila.

### Reordenar columnas

**Clave** `reordenar-columnas`

**Definición** `Table.ReorderColumns` modifica la posición visible de las columnas.

**Búsqueda** Move, reorder, ordenar columnas

**Para recordar** No cambia el orden de las filas.

#### Poner importe primero

```powerquery
Table.ReorderColumns(Pedidos, {"importe", "id", "cliente", "fecha", "estado", "canal"})
```

Se indica el orden de las seis columnas.

**Resultado esperado** 7 filas; importe es la primera columna.

### Columnas ausentes

**Clave** `columnas-ausentes`

**Definición** Las opciones `MissingField.UseNull` e `Ignore` permiten manejar campos que no existen en una tabla.

**Búsqueda** MissingField, esquema, columna faltante

**Para recordar** No ignores columnas obligatorias sin validar el origen.

#### Seleccionar un campo opcional

```powerquery
Table.SelectColumns(Pedidos, {"id", "cupon"}, MissingField.UseNull)
```

Se crea cupon con null porque no existe.

**Resultado esperado** 7 filas, id y cupon; todos los cupones son null.

## Filtrar filas

**Clave** `filtrar-filas`

### Definición

**Clave** `definicion`

**Definición** `Table.SelectRows` conserva las filas que cumplen una condición.

**Búsqueda** filtrar, WHERE, SelectRows

**Para recordar** El filtro evalúa una condición por fila.

#### Quedarse con completados

```powerquery
Table.SelectRows(Pedidos, each [estado] = "completado")
```

Usa la flecha de filtro del encabezado estado en la interfaz.

**Resultado esperado** 5 filas, ids 101,102,104,105,107.

### Comparaciones y rangos

**Clave** `comparaciones-y-rangos`

**Definición** Los operadores numéricos y temporales permiten limitar filas a intervalos.

**Búsqueda** mayor menor, rango, fecha entre

**Para recordar** Define si los extremos son inclusivos o exclusivos.

#### Filtrar importes de 100 a 200 inclusive

```powerquery
Table.SelectRows(Pedidos, each [importe] >= 100 and [importe] <= 200)
```

Ambos extremos están incluidos.

**Resultado esperado** Ids 101,102,104,105.

### AND, OR y NOT

**Clave** `and-or-y-not`

**Definición** `and` exige ambas condiciones, `or` acepta cualquiera y `not` niega una condición.

**Búsqueda** filtros múltiples, AND OR NOT

**Para recordar** Usa paréntesis para agrupar condiciones.

#### Elegir pedidos válidos de importe alto

```powerquery
Table.SelectRows(Pedidos, each ([estado] = "completado" or [estado] = "pendiente") and not ([importe] < 150))
```

Se acepta el estado indicado y el importe mínimo.

**Resultado esperado** Ids 102,104,105,107.

### Lista de valores

**Clave** `lista-de-valores`

**Definición** `List.Contains` comprueba si un valor pertenece a una lista.

**Búsqueda** IN, filtro por lista, List.Contains

**Para recordar** La lista indica qué valores aceptas.

#### Seleccionar pedidos de dos clientes

```powerquery
Table.SelectRows(Pedidos, each List.Contains({1,3}, [cliente]))
```

La pertenencia se comprueba por fila.

**Resultado esperado** Ids 101,102,105,106,107.

### Filtros de texto

**Clave** `filtros-de-texto`

**Definición** `Text.Contains`, `Text.StartsWith` y `Text.EndsWith` buscan patrones sin comodines SQL.

**Búsqueda** contains, empieza con, termina con, LIKE

**Para recordar** Especifica comparador si quieres ignorar mayúsculas y controla null.

#### Buscar nombres con la letra a

```powerquery
Table.SelectRows(Clientes, each Text.Contains([nombre], "a", Comparer.OrdinalIgnoreCase))
```

El comparador ignora diferencias de caso.

**Resultado esperado** Ana y Marta (clientes 1 y 3).

## Conservar y quitar filas

**Clave** `conservar-y-quitar-filas`

### Definición

**Clave** `definicion`

**Definición** Las operaciones posicionales conservan o descartan filas por su posición, no por una condición de negocio.

**Búsqueda** Keep Rows, Remove Rows, FirstN, Skip

**Para recordar** Ordena primero si la posición tiene significado.

#### Conservar los dos primeros pedidos por id

```powerquery
Table.FirstN(Table.Sort(Pedidos, {{"id", Order.Ascending}}), 2)
```

Inicio > Conservar filas > Conservar filas superiores.

**Resultado esperado** Ids 101 y 102.

### Primeras y últimas filas

**Clave** `primeras-y-ultimas-filas`

**Definición** `Table.FirstN` y `Table.LastN` toman filas desde los extremos.

**Búsqueda** top n, bottom n, limitar

**Para recordar** Elige un orden antes de tomar extremos.

#### Conservar los dos últimos por id

```powerquery
Table.LastN(Table.Sort(Pedidos, {{"id", Order.Ascending}}), 2)
```

El orden ascendente determina el final de la tabla.

**Resultado esperado** Ids 106 y 107.

### Quitar filas por posición

**Clave** `quitar-filas-por-posicion`

**Definición** `Table.Skip` omite filas iniciales y `Table.RemoveLastN` elimina filas finales.

**Búsqueda** offset, quitar primeras y últimas

**Para recordar** No confundas quitar una posición con eliminar un registro del origen.

#### Omitir los dos primeros pedidos

```powerquery
Table.Skip(Table.Sort(Pedidos, {{"id", Order.Ascending}}), 2)
```

Se omiten ids 101 y 102.

**Resultado esperado** 5 filas, ids 103 a 107.

### Filas vacías

**Clave** `filas-vacias`

**Definición** Una fila completamente vacía no contiene datos útiles; un null aislado no convierte toda la fila en vacía.

**Búsqueda** Remove Blank Rows, filas en blanco

**Para recordar** Comprueba todos los campos relevantes.

#### Eliminar filas totalmente vacías

```powerquery
let T = #table({"a","b"}, {{null,""},{1,null},{null,null}}) in Table.SelectRows(T, each List.NonNullCount(List.RemoveMatchingItems(Record.FieldValues(_), {""})) > 0)
```

Se eliminan filas cuyos campos son todos null o texto vacío.

**Resultado esperado** Una fila (1,null).

## Ordenamiento e índices de fila

**Clave** `ordenamiento-e-indices-de-fila`

### Definición

**Clave** `definicion`

**Definición** `Table.Sort` ordena una tabla por una o más columnas; un índice numera filas en un orden elegido.

**Búsqueda** Sort, ASC DESC, ordenar

**Para recordar** Ordena explícitamente antes de depender de la posición.

#### Ordenar por importe descendente

```powerquery
Table.Sort(Pedidos, {{"importe", Order.Descending}, {"id", Order.Ascending}})
```

La segunda columna desempata.

**Resultado esperado** Ids 107,102,104,105,101,103,106 en ese orden.

### Varios criterios

**Clave** `varios-criterios`

**Definición** Los criterios se aplican en el orden indicado; el siguiente resuelve empates del anterior.

**Búsqueda** orden por fecha e id, multi sort

**Para recordar** El primer criterio manda; los siguientes desempatan.

#### Ordenar por fecha y luego id

```powerquery
Table.Sort(Pedidos, {{"fecha", Order.Ascending}, {"id", Order.Descending}})
```

Los pedidos del mismo día quedan por id descendente.

**Resultado esperado** Ids 101,103,102,105,104,106,107.

### Columna de índice

**Clave** `columna-de-indice`

**Definición** `Table.AddIndexColumn` añade una secuencia con inicio e incremento configurables.

**Búsqueda** Index Column, numerar filas

**Para recordar** Un índice representa el orden de este resultado, no una clave estable del negocio.

#### Numerar pedidos desde 1

```powerquery
Table.AddIndexColumn(Table.Sort(Pedidos, {{"id", Order.Ascending}}), "indice", 1, 1, Int64.Type)
```

Agregar columna > Columna de índice > Desde 1.

**Resultado esperado** id 101 tiene índice 1; id 107 tiene 7.

### Invertir filas

**Clave** `invertir-filas`

**Definición** `Table.ReverseRows` invierte la secuencia actual.

**Búsqueda** Reverse Rows, invertir orden

**Para recordar** Invertir no equivale a ordenar si no había un orden definido.

#### Invertir los pedidos por id

```powerquery
Table.ReverseRows(Table.Sort(Pedidos, {{"id", Order.Ascending}}))
```

Se invierte una secuencia explícita.

**Resultado esperado** Ids 107 a 101.

## Texto

**Clave** `texto`

### Definición

**Clave** `definicion`

**Definición** Las funciones `Text.*` limpian y transforman cadenas, especialmente claves y campos descriptivos.

**Búsqueda** funciones texto, normalizar cadenas

**Para recordar** Normaliza antes de comparar o combinar claves textuales.

#### Limpiar mayúsculas y espacios de correos

```powerquery
Table.TransformColumns(Leads, {{"correo", each Text.Lower(Text.Trim(_)), type nullable text}})
```

La misma transformación se aplica a cada correo.

**Resultado esperado** Ids 1 y 2 pasan a ana@ejemplo.com; null y vacío se conservan.

### Trim y Clean

**Clave** `trim-y-clean`

**Definición** `Text.Trim` quita caracteres de los extremos y `Text.Clean` elimina caracteres de control.

**Búsqueda** recortar, limpiar, espacios, saltos

**Para recordar** Trim no elimina espacios internos.

#### Limpiar texto copiado

```powerquery
Text.Trim(Text.Clean("  Ana#(tab)  "))
```

Clean elimina la tabulación; Trim elimina los espacios de los extremos.

**Resultado esperado** "Ana".

### Mayúsculas, minúsculas y capitalización

**Clave** `mayusculas-minusculas-y-capitalizacion`

**Definición** `Text.Upper`, `Text.Lower` y `Text.Proper` cambian la capitalización.

**Búsqueda** upper lower proper, capitalizar

**Para recordar** Normaliza identificadores de texto de manera coherente.

#### Normalizar un país

```powerquery
Text.Upper("México", "es-MX")
```

Se indica la cultura para el cambio de caso.

**Resultado esperado** "MÉXICO".

### Reemplazar texto

**Clave** `reemplazar-texto`

**Definición** `Text.Replace` reemplaza todas las apariciones literales de un fragmento dentro del texto.

**Búsqueda** Replace, sustituir parte del texto

**Para recordar** No es lo mismo reemplazar una parte que una celda completa.

#### Cambiar el dominio de prueba

```powerquery
Text.Replace("ana@viejo.com", "viejo.com", "nuevo.com")
```

Se sustituye únicamente el fragmento indicado.

**Resultado esperado** "ana@nuevo.com".

### Longitud y extracción

**Clave** `longitud-y-extraccion`

**Definición** `Text.Length`, `Text.Start`, `Text.End` y `Text.Middle` miden o extraen caracteres.

**Búsqueda** length, substring, izquierda derecha

**Para recordar** La posición de Text.Middle empieza en cero.

#### Extraer el número del código

```powerquery
Text.Middle("PED-101", 4, 3)
```

Comienza después de PED-.

**Resultado esperado** "101".

### Delimitadores

**Clave** `delimitadores`

**Definición** `Text.BeforeDelimiter`, `Text.AfterDelimiter` y `Text.BetweenDelimiters` extraen segmentos delimitados.

**Búsqueda** extraer antes después entre, dominio correo

**Para recordar** Útil si la longitud del segmento cambia.

#### Extraer dominio de correo

```powerquery
Text.AfterDelimiter("ana@ejemplo.com", "@")
```

El delimitador no se incluye en el resultado.

**Resultado esperado** "ejemplo.com".

### Concatenación

**Clave** `concatenacion`

**Definición** `&` une textos; `Text.Combine` une una lista con un separador.

**Búsqueda** concatenar, unir texto, concat

**Para recordar** Convierte números a texto antes de concatenarlos.

#### Crear etiqueta de pedido

```powerquery
"PED-" & Text.From(101)
```

El número se convierte antes de unirlo.

**Resultado esperado** "PED-101".

## Dividir y combinar columnas

**Clave** `dividir-y-combinar-columnas`

### Definición

**Clave** `definicion`

**Definición** Dividir separa un campo en varios; combinar reúne varios campos en uno.

**Búsqueda** Split Column, Merge Columns, separar columnas

**Para recordar** No confundas combinar columnas con Merge Queries, que une tablas.

#### Separar código y canal

```powerquery
Table.SplitColumn(#table({"codigo"}, {{"101-Web"},{"102-Tienda"}}), "codigo", Splitter.SplitTextByDelimiter("-"), {"id","canal"})
```

Transformar > Dividir columna > Por delimitador.

**Resultado esperado** Dos filas: ("101","Web"), ("102","Tienda").

### Dividir por posiciones

**Clave** `dividir-por-posiciones`

**Definición** `Splitter.SplitTextByPositions` divide en posiciones fijas.

**Búsqueda** split por posición, ancho fijo

**Para recordar** Úsalo cuando todos los códigos comparten estructura.

#### Separar prefijo y número

```powerquery
Table.SplitColumn(#table({"codigo"}, {{"PED101"},{"PED102"}}), "codigo", Splitter.SplitTextByPositions({0,3}), {"prefijo","numero"})
```

El corte ocurre antes del carácter de índice 3.

**Resultado esperado** (PED,101), (PED,102), ambos campos como texto.

### Combinar columnas

**Clave** `combinar-columnas`

**Definición** `Table.CombineColumns` sustituye las columnas elegidas por una nueva cadena.

**Búsqueda** Merge Columns, unir columnas

**Para recordar** Si quieres conservar las columnas originales, agrega una personalizada en vez de combinar.

#### Unir nombre y país

```powerquery
Table.CombineColumns(Table.SelectRows(Clientes, each [pais] <> null), {"nombre","pais"}, Combiner.CombineTextByDelimiter(" - ", QuoteStyle.None), "etiqueta")
```

Las dos columnas originales se sustituyen por etiqueta.

**Resultado esperado** 3 filas; Ana - México, Luis - México, Marta - España; cliente y alta se conservan.

### Dividir en filas

**Clave** `dividir-en-filas`

**Definición** Separar una lista de elementos en filas aumenta la granularidad.

**Búsqueda** split into rows, expand list, separar etiquetas

**Para recordar** Una fila puede convertirse en varias; revisa conteos y totales.

#### Separar canales de una campaña

```powerquery
let T = #table({"campana","canales"}, {{"A","Web,Tienda"}}), L = Table.TransformColumns(T, {{"canales", each Text.Split(_, ","), type list}}) in Table.ExpandListColumn(L, "canales")
```

La división crea una lista y la expansión crea una fila por elemento.

**Resultado esperado** (A,Web) y (A,Tienda).

## NULL, vacíos y relleno

**Clave** `null-vacios-y-relleno`

### Definición

**Clave** `definicion`

**Definición** `null` indica ausencia de valor. A diferencia de SQL, M permite comprobarlo mediante `= null` y `<> null`.

**Búsqueda** null, faltantes, IS NULL, blanco

**Para recordar** null, texto vacío y cero son valores diferentes.

#### Encontrar clientes sin país

```powerquery
Table.SelectRows(Clientes, each [pais] = null)
```

Se compara con el literal null, sin comillas.

**Resultado esperado** Una fila: Diego, cliente 4.

### Texto vacío y espacios

**Clave** `texto-vacio-y-espacios`

**Definición** `""` es una cadena de longitud cero; un texto con espacios no es vacío hasta limpiarlo.

**Búsqueda** blank, empty string, espacios, nulos

**Para recordar** Normaliza espacios antes de decidir qué falta.

#### Contar leads sin correo útil

```powerquery
Table.RowCount(Table.SelectRows(Leads, each [correo] = null or Text.Trim([correo]) = ""))
```

Se detecta ausencia o texto vacío después de limpiar.

**Resultado esperado** 2, ids 5 y 6.

### Reemplazar null

**Clave** `reemplazar-null`

**Definición** `Table.ReplaceValue` con `Replacer.ReplaceValue` sustituye valores completos.

**Búsqueda** Replace Values, reemplazar nulos, COALESCE

**Para recordar** Reemplaza solo cuando la alternativa tenga significado de negocio.

#### Mostrar país desconocido

```powerquery
Table.ReplaceValue(Clientes, null, "Desconocido", Replacer.ReplaceValue, {"pais"})
```

El cambio se limita a la columna pais.

**Resultado esperado** Diego tiene pais=Desconocido; los otros tres no cambian.

### Operador de coalescencia

**Clave** `operador-de-coalescencia`

**Definición** `??` devuelve el valor izquierdo si no es null; si es null, devuelve el derecho.

**Búsqueda** coalesce, ??, valor por defecto

**Para recordar** No reemplaza errores ni cadenas vacías.

#### Crear canal de reporte

```powerquery
Table.AddColumn(Pedidos, "canal_reporte", each [canal] ?? "Sin canal", type text)
```

La columna original se conserva.

**Resultado esperado** id 105 tiene Sin canal; los otros seis conservan su canal.

### Fill Down y Fill Up

**Clave** `fill-down-y-fill-up`

**Definición** `Table.FillDown` y `Table.FillUp` rellenan null con el valor no nulo anterior o siguiente.

**Búsqueda** rellenar hacia abajo arriba, fill

**Para recordar** Dependen del orden actual y rellenan null, no cualquier vacío.

#### Completar etiquetas de región

```powerquery
Table.FillDown(#table({"region","importe"}, {{"Norte",100},{null,200},{"Sur",50},{null,80}}), {"region"})
```

Se propaga la región hacia las filas inferiores.

**Resultado esperado** Norte,Norte,Sur,Sur con importes 100,200,50,80.

## Errores

**Clave** `errores`

### Definición

**Clave** `definicion`

**Definición** Un error es un fallo al evaluar un valor o paso; no es lo mismo que null. Puede originarse en una conversión, un campo faltante o una conexión.

**Búsqueda** Error, DataFormat.Error, Expression.Error

**Para recordar** Identifica la causa antes de eliminar o sustituir.

#### Provocar una conversión inválida

```powerquery
Number.FromText("N/D", "es-ES")
```

El texto no representa un número.

**Resultado esperado** Error de conversión, no null.

### Conservar y quitar errores

**Clave** `conservar-y-quitar-errores`

**Definición** `Table.SelectRowsWithErrors` y `Table.RemoveRowsWithErrors` permiten aislar o descartar filas con error.

**Búsqueda** Keep Errors, Remove Errors

**Para recordar** Aislar primero permite auditar cuántos registros se perderían.

#### Localizar el importe inválido

```powerquery
let T = Table.TransformColumnTypes(Importacion, {{"importe", type number}}, "es-ES") in Table.SelectRowsWithErrors(T, {"importe"})
```

Se comprueba solo la columna importe.

**Resultado esperado** Una fila: id textual "2", importe Error.

### Reemplazar errores

**Clave** `reemplazar-errores`

**Definición** `Table.ReplaceErrorValues` sustituye los errores de columnas específicas por un valor.

**Búsqueda** Replace Errors, reemplazar error

**Para recordar** No confundas un dato inválido con un importe real de cero.

#### Convertir importes inválidos a null

```powerquery
let T = Table.TransformColumnTypes(Importacion, {{"importe", type number}}, "es-ES") in Table.ReplaceErrorValues(T, {{"importe", null}})
```

El reemplazo se aplica después de convertir.

**Resultado esperado** Importes 1234.5, null y 25.

### try otherwise

**Clave** `try-otherwise`

**Definición** `try ... otherwise` usa un valor alternativo cuando falla una expresión.

**Búsqueda** try otherwise, capturar error

**Para recordar** Coloca try cerca de la operación que puede fallar.

#### Convertir un número de forma segura

```powerquery
try Number.FromText("N/D", "es-ES") otherwise null
```

Se captura la conversión inválida.

**Resultado esperado** null.

### Registro de try

**Clave** `registro-de-try`

**Definición** `try` sin otherwise devuelve un registro con `HasError` y `Value` o `Error` según el resultado.

**Búsqueda** HasError, Error.Message, auditoría

**Para recordar** Conservar el indicador de error ayuda a distinguirlo de un null de origen.

#### Detectar si hubo error

```powerquery
(try Number.FromText("N/D"))[HasError]
```

No se pierde la posibilidad de inspeccionar el error.

**Resultado esperado** true.

## Duplicados y unicidad

**Clave** `duplicados-y-unicidad`

### Definición

**Clave** `definicion`

**Definición** Un duplicado es una repetición según las columnas que definen la identidad de un dato.

**Búsqueda** duplicados, DISTINCT, unique

**Para recordar** Define primero qué columnas hacen único un registro.

#### Obtener clientes que aparecen en pedidos

```powerquery
Table.Distinct(Table.SelectColumns(Pedidos, {"cliente"}))
```

Primero limita la tabla a la clave que te interesa.

**Resultado esperado** 3 filas: clientes 1,2,3, sin orden garantizado.

### Quitar duplicados

**Clave** `quitar-duplicados`

**Definición** `Table.Distinct` conserva una fila por combinación de valores de las columnas seleccionadas.

**Búsqueda** Remove Duplicates, Table.Distinct

**Para recordar** No garantiza por sí sola cuál de las filas equivalentes conservará.

#### Obtener combinaciones cliente y estado

```powerquery
Table.Distinct(Table.SelectColumns(Pedidos, {"cliente","estado"}))
```

Se deduplica la combinación completa.

**Resultado esperado** 5 filas: (1,completado), (2,cancelado), (2,completado), (3,completado), (3,pendiente).

### Detectar duplicados

**Clave** `detectar-duplicados`

**Definición** Agrupar por clave y contar permite localizar valores repetidos sin borrar información.

**Búsqueda** contar duplicados, Keep Duplicates, Group By

**Para recordar** Normaliza claves y excluye ausencias si no son identidades válidas.

#### Encontrar correos repetidos

```powerquery
let T = Table.TransformColumns(Leads, {{"correo", each Text.Lower(Text.Trim(_)), type nullable text}}), V = Table.SelectRows(T, each [correo] <> null and [correo] <> ""), G = Table.Group(V, {"correo"}, {{"veces", each Table.RowCount(_), Int64.Type}}) in Table.SelectRows(G, each [veces] > 1)
```

Se cuenta cada correo limpio antes de filtrar.

**Resultado esperado** ana@ejemplo.com=2; luis@ejemplo.com=2.

### Conservar el registro más reciente

**Clave** `conservar-el-registro-mas-reciente`

**Definición** Para elegir un duplicado concreto, define un criterio explícito y selecciona una fila dentro de cada grupo.

**Búsqueda** deduplicar por fecha, último registro

**Para recordar** No supongas que ordenar y quitar duplicados siempre conserva la primera fila.

#### Elegir el lead más reciente de cada correo

```powerquery
let T = Table.TransformColumns(Leads, {{"correo", each Text.Lower(Text.Trim(_)), type nullable text}}), V = Table.SelectRows(T, each [correo] <> null and [correo] <> ""), G = Table.Group(V, {"correo"}, {{"ultimo", each Table.Max(_, "fecha"), type record}}) in Table.ExpandRecordColumn(G, "ultimo", {"id","origen","fecha"})
```

Cada grupo selecciona su registro de fecha máxima; aquí no hay empates por correo.

**Resultado esperado** 2 filas, ids 2 y 4; ambos origen Web.

## Columnas personalizadas y condicionales

**Clave** `columnas-personalizadas-y-condicionales`

### Definición

**Clave** `definicion`

**Definición** `Table.AddColumn` calcula una columna nueva para cada fila sin quitar las existentes.

**Búsqueda** Add Column, Custom Column, columna calculada

**Para recordar** La expresión `each` se evalúa con el registro de la fila.

#### Calcular comisión del 5 %

```powerquery
Table.AddColumn(Pedidos, "comision", each [importe] * 0.05, type number)
```

Agregar columna > Columna personalizada; escribe [importe] * 0.05.

**Resultado esperado** 7 filas; comisiones por id: 5,10,4,7.5,7.5,2.5,15.

### if then else

**Clave** `if-then-else`

**Definición** Una expresión condicional elige un resultado según una condición lógica.

**Búsqueda** columna condicional, IF, CASE WHEN

**Para recordar** En M todo if requiere then y else.

#### Marcar pedidos completados

```powerquery
Table.AddColumn(Pedidos, "valido", each if [estado] = "completado" then 1 else 0, Int64.Type)
```

El resultado es un indicador numérico.

**Resultado esperado** Ids 101,102,104,105,107 reciben 1; 103 y 106 reciben 0.

### Condiciones encadenadas

**Clave** `condiciones-encadenadas`

**Definición** Puedes colocar otro `if` en el `else` para evaluar varias categorías.

**Búsqueda** else if, varios niveles, segmentación

**Para recordar** La primera condición verdadera determina el resultado.

#### Clasificar pedidos por importe

```powerquery
Table.AddColumn(Pedidos, "segmento", each if [importe] >= 200 then "Alto" else if [importe] >= 100 then "Medio" else "Bajo", type text)
```

Las condiciones se evalúan de mayor a menor umbral.

**Resultado esperado** Alto: 102,107; Medio: 101,104,105; Bajo: 103,106.

### Transformar o agregar

**Clave** `transformar-o-agregar`

**Definición** `Table.TransformColumns` modifica valores de columnas existentes; `Table.AddColumn` crea otra columna.

**Búsqueda** Transform vs Add Column, TransformColumns

**Para recordar** Transformar una columna recibe su valor; agregar una columna recibe la fila.

#### Redondear una columna existente

```powerquery
Table.TransformColumns(#table({"importe"}, {{10.125},{12.126}}), {{"importe", each Number.Round(_,2), type number}})
```

El campo importe se sustituye, no se duplica.

**Resultado esperado** Importes 10.12 y 12.13 (redondeo al par por defecto).

### Columna a partir de ejemplos

**Clave** `columna-a-partir-de-ejemplos`

**Definición** Column From Examples intenta deducir una transformación a partir de salidas que introduces.

**Búsqueda** columna de ejemplos, AI, extracción

**Para recordar** Revisa la fórmula generada: los ejemplos no cubren todos los casos.

**Nota** La inferencia varía; para verificarla agrega un correo con otro dominio y comprueba que cambie la salida.

#### Extraer dominios desde ejemplos

1. Crea una copia de Leads
2. Filtra correo no nulo y no vacío y limpia espacios
3. Agregar columna > Columna a partir de ejemplos > Desde selección, elige correo y escribe ejemplo.com para una fila
4. Revisa la inferencia y confirma solo si extrae el texto después de @

Comprueba que la fórmula no sea simplemente una constante; si lo es, usa Text.AfterDelimiter.

**Resultado esperado** 4 filas válidas con dominio ejemplo.com.

## Cálculos numéricos

**Clave** `calculos-numericos`

### Definición

**Clave** `definicion`

**Definición** M ofrece operaciones aritméticas y funciones `Number.*` para calcular, redondear y transformar importes.

**Búsqueda** aritmética, Number, cálculos

**Para recordar** Define unidades, precisión y tratamiento de valores ausentes.

#### Calcular el importe antes de impuesto

```powerquery
116 / 1.16
```

Se divide entre el factor del impuesto.

**Resultado esperado** 100.

### ROUND y modos de redondeo

**Clave** `round-y-modos-de-redondeo`

**Definición** `Number.Round` redondea a la precisión indicada; permite elegir un modo para los empates.

**Búsqueda** ROUND, Number.Round, redondeo

**Para recordar** El redondeo predeterminado usa empate al par; especifica un modo si el negocio exige otro.

#### Comparar dos modos de redondeo

```powerquery
{Number.Round(2.5), Number.Round(2.5, 0, RoundingMode.AwayFromZero)}
```

Ambas funciones redondean a entero.

**Resultado esperado** {2,3}.

### Valor absoluto, techo y piso

**Clave** `valor-absoluto-techo-y-piso`

**Definición** `Number.Abs`, `Number.RoundUp` y `Number.RoundDown` calculan magnitud o redondean hacia arriba o abajo.

**Búsqueda** ABS, CEIL, FLOOR

**Para recordar** RoundUp va hacia positivo y RoundDown hacia negativo.

#### Comparar ajustes

```powerquery
{Number.Abs(-25), Number.RoundUp(2.1), Number.RoundDown(2.9)}
```

Se ejecuta una función sobre cada número.

**Resultado esperado** {25,3,2}.

### División y porcentajes

**Clave** `division-y-porcentajes`

**Definición** Un porcentaje se obtiene como parte dividida entre total, multiplicada por 100 si necesitas escala 0–100.

**Búsqueda** ratio, porcentaje, dividir por cero

**Para recordar** Comprueba el denominador: M puede devolver infinito o NaN al dividir por cero.

#### Calcular porcentaje protegido

```powerquery
let Porcentaje = (parte as number, total as number) => if total = 0 then null else parte / total * 100 in {Porcentaje(5,7), Porcentaje(0,0)}
```

La condición evita dividir por cero.

**Resultado esperado** {aprox. 71.4286, null}.

## Fechas y tiempos

**Clave** `fechas-y-tiempos`

### Definición

**Clave** `definicion`

**Definición** Las funciones `Date.*`, `Time.*`, `DateTime.*` y `Duration.*` extraen componentes y calculan periodos.

**Búsqueda** fechas, calendario, duración

**Para recordar** Convierte el texto en fecha antes de aplicar funciones temporales.

#### Obtener el mes de un pedido

```powerquery
Date.Month(#date(2026,2,3))
```

Date.Month devuelve el número del mes.

**Resultado esperado** 2.

### Año, mes, trimestre y día

**Clave** `ano-mes-trimestre-y-dia`

**Definición** `Date.Year`, `Date.Month`, `Date.QuarterOfYear` y `Date.Day` extraen componentes del calendario.

**Búsqueda** YEAR MONTH QUARTER DAY, partes de fecha

**Para recordar** El mes por sí solo mezcla años distintos.

#### Extraer componentes

```powerquery
let F = #date(2026,2,3) in [anio=Date.Year(F), mes=Date.Month(F), trimestre=Date.QuarterOfYear(F), dia=Date.Day(F)]
```

Se conservan los cuatro componentes en un registro.

**Resultado esperado** [anio=2026, mes=2, trimestre=1, dia=3].

### Inicio y fin de periodo

**Clave** `inicio-y-fin-de-periodo`

**Definición** `Date.StartOfMonth` y `Date.EndOfMonth` devuelven los límites del mes; existen equivalentes para otras unidades.

**Búsqueda** inicio de mes, fin de mes, agrupar mensual

**Para recordar** Usar el inicio del mes como clave conserva año y mes juntos.

#### Crear periodo mensual

```powerquery
Table.AddColumn(Pedidos, "mes", each Date.StartOfMonth([fecha]), type date)
```

Cada fecha se convierte en el primer día de su mes.

**Resultado esperado** Ids 101–103: 2026-01-01; 104–107: 2026-02-01.

### Sumar días y meses

**Clave** `sumar-dias-y-meses`

**Definición** `Date.AddDays`, `Date.AddMonths` y `Date.AddYears` desplazan fechas por unidades de calendario.

**Búsqueda** DATEADD, sumar meses, vencimiento

**Para recordar** Un mes no siempre contiene treinta días.

#### Calcular vencimiento a 30 días

```powerquery
Date.AddDays(#date(2026,1,5),30)
```

Desplaza la fecha original treinta días.

**Resultado esperado** 2026-02-04.

### Diferencia de fechas

**Clave** `diferencia-de-fechas`

**Definición** Restar fechas del mismo tipo devuelve una duración; `Duration.Days` o `Duration.TotalDays` extraen días.

**Búsqueda** DATEDIFF, días entre fechas, antigüedad

**Para recordar** Resta fin menos inicio; TotalDays conserva fracciones.

#### Calcular días entre pedido y alta

```powerquery
Duration.Days(#date(2026,1,5) - #date(2025,12,20))
```

Se resta la fecha anterior a la posterior.

**Resultado esperado** 16 días.

### Formatear fechas

**Clave** `formatear-fechas`

**Definición** `Date.ToText` devuelve texto; se puede indicar formato y cultura.

**Búsqueda** DATE_FORMAT, YYYY-MM, nombre del mes

**Para recordar** Formatear no equivale a conservar una fecha como tipo date.

#### Crear etiqueta año-mes

```powerquery
Date.ToText(#date(2026,2,3), [Format="yyyy-MM", Culture="es-MX"])
```

El resultado es texto, adecuado para una etiqueta.

**Resultado esperado** "2026-02".

### Fecha actual y zona horaria

**Clave** `fecha-actual-y-zona-horaria`

**Definición** `DateTime.LocalNow` depende del entorno; `DateTimeZone.FixedUtcNow` devuelve un instante UTC fijo durante la evaluación.

**Búsqueda** hoy, ahora, UTC, actualización

**Para recordar** En servicios en línea la hora local puede ser UTC; define la zona requerida.

**Nota** Para pruebas reproducibles utiliza una fecha literal o parámetro.

#### Crear una fecha de referencia UTC

```powerquery
Date.From(DateTimeZone.FixedUtcNow())
```

Devuelve la fecha UTC del instante, no una fecha fija del dataset.

**Resultado esperado** Fecha UTC del momento de evaluación.

### Calendario

**Clave** `calendario`

**Definición** Una tabla calendario contiene una fila por fecha, útil para periodos sin ventas y modelos de datos.

**Búsqueda** List.Dates, tabla calendario, fechas continuas

**Para recordar** Usa un intervalo continuo con límites claros.

#### Generar siete días consecutivos

```powerquery
Table.FromList(List.Dates(#date(2026,1,1), 7, #duration(1,0,0,0)), Splitter.SplitByNothing(), {"fecha"})
```

List.Dates empieza el día indicado y suma una duración diaria.

**Resultado esperado** 7 filas del 1 al 7 de enero de 2026.

## Agregaciones y listas

**Clave** `agregaciones-y-listas`

### Definición

**Clave** `definicion`

**Definición** Las funciones `List.*` resumen los valores de una lista; `Table.RowCount` cuenta filas de una tabla.

**Búsqueda** agregaciones, SUM AVG COUNT

**Para recordar** Extraer una columna produce una lista que puedes agregar.

#### Sumar todos los importes

```powerquery
List.Sum(Pedidos[importe])
```

Se obtiene la lista de importes de Pedidos.

**Resultado esperado** 1030.

### Conteo de filas y no nulos

**Clave** `conteo-de-filas-y-no-nulos`

**Definición** `Table.RowCount` cuenta filas; `List.Count` cuenta elementos, incluidos null, y `List.NonNullCount` cuenta los no nulos.

**Búsqueda** COUNT, contar null, contar filas

**Para recordar** No confundas cantidad de registros con cantidad de valores presentes.

#### Comparar conteos de canal

```powerquery
[filas=Table.RowCount(Pedidos), valores=List.Count(Pedidos[canal]), no_nulos=List.NonNullCount(Pedidos[canal])]
```

Las dos primeras cuentas incluyen el pedido sin canal.

**Resultado esperado** [filas=7, valores=7, no_nulos=6].

### Suma, promedio, mínimo y máximo

**Clave** `suma-promedio-minimo-y-maximo`

**Definición** `List.Sum`, `List.Average`, `List.Min` y `List.Max` resumen números.

**Búsqueda** SUM AVG MIN MAX, agregados

**Para recordar** Aclara cómo se manejan null y listas vacías antes de usar agregados como métricas.

#### Resumir todos los pedidos

```powerquery
[suma=List.Sum(Pedidos[importe]), promedio=List.Average(Pedidos[importe]), minimo=List.Min(Pedidos[importe]), maximo=List.Max(Pedidos[importe])]
```

Cada función devuelve un valor.

**Resultado esperado** Suma 1030; promedio aprox. 147.1429; mínimo 50; máximo 300.

### Valores distintos

**Clave** `valores-distintos`

**Definición** `List.Distinct` conserva valores diferentes; se puede combinar con conteo y quitar null.

**Búsqueda** COUNT DISTINCT, List.Distinct, únicos

**Para recordar** Decide si un null cuenta como categoría o si debe excluirse.

#### Contar canales presentes distintos

```powerquery
List.Count(List.Distinct(List.RemoveNulls(Pedidos[canal])))
```

Se excluye null antes de deduplicar.

**Resultado esperado** 2 (Web y Tienda).

### Concatenación agregada

**Clave** `concatenacion-agregada`

**Definición** `Text.Combine` une una lista de textos y omite null.

**Búsqueda** GROUP_CONCAT, unir lista de textos

**Para recordar** Ordena y quita duplicados si necesitas una salida estable.

#### Listar países conocidos

```powerquery
Text.Combine(List.Sort(List.Distinct(List.RemoveNulls(Clientes[pais]))), ", ")
```

Se excluyen null y se deduplican países.

**Resultado esperado** "España, México" con orden ascendente habitual.

### Estadística descriptiva

**Clave** `estadistica-descriptiva`

**Definición** `List.Median`, `List.StandardDeviation` y `List.Percentile` resumen distribución además de promedio.

**Búsqueda** mediana, desviación estándar, percentil

**Para recordar** Median es el centro ordenado; StandardDeviation es muestral.

#### Calcular mediana de importes

```powerquery
List.Median(Pedidos[importe])
```

El cuarto valor de siete valores ordenados es la mediana.

**Resultado esperado** 150.

## Agrupar filas (Group By)

**Clave** `agrupar-filas-group-by`

### Definición

**Clave** `definicion`

**Definición** `Table.Group` crea un grupo por combinación de claves y devuelve agregaciones o tablas de cada grupo.

**Búsqueda** Group By, agrupar, GROUP BY

**Para recordar** La clave define la granularidad de la salida.

#### Sumar importe por cliente

```powerquery
Table.Group(Pedidos, {"cliente"}, {{"total", each List.Sum([importe]), type number}})
```

Inicio > Agrupar por; elige cliente y Suma de importe.

**Resultado esperado** 3 filas (cliente,total): (1,600),(2,230),(3,200).

### Varias agregaciones

**Clave** `varias-agregaciones`

**Definición** Un grupo puede devolver varias métricas mediante una lista de definiciones.

**Búsqueda** Group By Advanced, conteo y suma, varias métricas

**Para recordar** Cada función recibe las filas del grupo.

#### Calcular ventas y pedidos por cliente

```powerquery
Table.Group(Pedidos, {"cliente"}, {{"total", each List.Sum([importe]), type number}, {"pedidos", each Table.RowCount(_), Int64.Type}})
```

En Agrupar por, modo Avanzado, añade ambas agregaciones.

**Resultado esperado** (1,600,3),(2,230,2),(3,200,2).

### Varias claves

**Clave** `varias-claves`

**Definición** Agrupar por varias columnas crea un grupo por cada combinación, no por cada columna de manera independiente.

**Búsqueda** agrupar por cliente y estado, granularidad

**Para recordar** Más claves pueden producir más filas.

#### Obtener importe por cliente y estado

```powerquery
Table.Group(Pedidos, {"cliente","estado"}, {{"total", each List.Sum([importe]), type number}})
```

Se incluyen cliente y estado en la clave.

**Resultado esperado** (1,completado,600),(2,cancelado,80),(2,completado,150),(3,completado,150),(3,pendiente,50).

### Filtros antes y después

**Clave** `filtros-antes-y-despues`

**Definición** Filtrar antes de agrupar cambia las filas que entran; filtrar después cambia qué grupos aparecen.

**Búsqueda** WHERE HAVING, filtro de grupo

**Para recordar** El orden de las operaciones cambia el significado.

#### Buscar clientes con más de 200 en completados

```powerquery
let F = Table.SelectRows(Pedidos, each [estado] = "completado"), G = Table.Group(F, {"cliente"}, {{"total", each List.Sum([importe]), type number}}) in Table.SelectRows(G, each [total] > 200)
```

Se filtran estados antes y totales después.

**Resultado esperado** Una fila (1,600).

### All Rows

**Clave** `all-rows`

**Definición** La opción Todas las filas guarda la tabla de registros de cada grupo dentro de una columna.

**Búsqueda** All Rows, tablas anidadas, detalle

**Para recordar** Agrupa sin perder el acceso a los registros originales.

#### Conservar el detalle por cliente

```powerquery
Table.Group(Pedidos, {"cliente"}, {{"detalle", each _, type table}})
```

En Agrupar por, operación Todas las filas.

**Resultado esperado** 3 filas, con tablas anidadas de 3,2,2 registros para clientes 1,2,3.

## Merge Queries

**Clave** `merge-queries`

### Definición

**Clave** `definicion`

**Definición** Merge combina tablas mediante claves y un tipo de unión. `Table.NestedJoin` devuelve una columna de tablas con las coincidencias.

**Búsqueda** Merge, combinar consultas, JOIN

**Para recordar** Une por claves compatibles y revisa cuántas coincidencias tiene cada fila.

#### Relacionar pedidos con clientes

```powerquery
Table.NestedJoin(Pedidos, {"cliente"}, Clientes, {"cliente"}, "datos_cliente", JoinKind.LeftOuter)
```

Inicio > Combinar consultas; selecciona cliente en ambas tablas.

**Resultado esperado** 7 filas de pedidos; cada tabla datos_cliente contiene un registro.

### Expandir coincidencias

**Clave** `expandir-coincidencias`

**Definición** `Table.ExpandTableColumn` extrae columnas de las tablas anidadas que devuelve Merge.

**Búsqueda** expandir, doble flecha, ExpandTableColumn

**Para recordar** Expandir varias coincidencias puede aumentar el número de filas.

#### Añadir nombre y país a pedidos

```powerquery
let J = Table.NestedJoin(Pedidos, {"cliente"}, Clientes, {"cliente"}, "datos", JoinKind.LeftOuter) in Table.ExpandTableColumn(J, "datos", {"nombre","pais"}, {"nombre_cliente","pais_cliente"})
```

En el icono de expansión selecciona solo los campos necesarios.

**Resultado esperado** 7 filas; 101,102,107 tienen Ana/México; 103,104 Luis/México; 105,106 Marta/España.

### Inner Join

**Clave** `inner-join`

**Definición** `JoinKind.Inner` conserva solamente las coincidencias entre ambas tablas.

**Búsqueda** inner join, coincidencias, intersección

**Para recordar** Los registros sin coincidencia no aparecen.

#### Listar clientes con pedidos

```powerquery
let J = Table.NestedJoin(Clientes, {"cliente"}, Pedidos, {"cliente"}, "p", JoinKind.Inner) in Table.ExpandTableColumn(J,"p",{"id"},{"pedido"})
```

La expansión genera una fila por coincidencia.

**Resultado esperado** 7 filas; Diego no aparece.

### Left Outer y Right Outer

**Clave** `left-outer-y-right-outer`

**Definición** Left Outer conserva todas las filas izquierdas y Right Outer las derechas, con coincidencias cuando existan.

**Búsqueda** left join, right join, outer join

**Para recordar** Elige qué entidad debe aparecer aunque falten coincidencias.

#### Conservar todos los clientes

```powerquery
let J = Table.NestedJoin(Clientes, {"cliente"}, Pedidos, {"cliente"}, "p", JoinKind.LeftOuter) in Table.ExpandTableColumn(J,"p",{"id"},{"pedido"})
```

Right Outer con las tablas invertidas conserva la misma entidad.

**Resultado esperado** 8 filas: 7 pedidos y Diego con pedido=null.

### Full Outer

**Clave** `full-outer`

**Definición** Full Outer conserva las coincidencias y las filas sin pareja de ambos lados.

**Búsqueda** full outer join, todas las filas

**Para recordar** Las filas sin pareja tienen campos ausentes del otro lado.

#### Conciliar catálogos de dos sistemas

```powerquery
let A = #table({"id","a"},{{1,"A"},{2,"B"}}), B = #table({"id","b"},{{2,"B"},{3,"C"}}), J = Table.NestedJoin(A,{"id"},B,{"id"},"derecha",JoinKind.FullOuter) in Table.ExpandTableColumn(J,"derecha",{"id","b"},{"id_derecha","b"})
```

Se conserva el identificador de cada lado para inspeccionar faltantes.

**Resultado esperado** (id,a,id_derecha,b): (1,A,null,null),(2,B,2,B),(null,null,3,C).

### Left Anti y Right Anti

**Clave** `left-anti-y-right-anti`

**Definición** Una unión anti devuelve filas de un lado que no tienen coincidencia en el otro.

**Búsqueda** anti join, sin match, registros faltantes

**Para recordar** Left Anti conserva las filas sin pareja de la izquierda.

#### Buscar clientes sin pedidos

```powerquery
Table.Join(Clientes, {"cliente"}, Table.RenameColumns(Pedidos, {{"cliente","cliente_pedido"}}), {"cliente_pedido"}, JoinKind.LeftAnti)
```

Right Anti con las tablas invertidas encuentra las mismas claves.

**Resultado esperado** Una fila de Clientes: Diego, id 4, país null, alta 2026-02-01.

### Claves múltiples

**Clave** `claves-multiples`

**Definición** Merge permite seleccionar varias columnas como clave compuesta; su orden debe corresponder entre las tablas.

**Búsqueda** merge varias columnas, clave compuesta

**Para recordar** Comprueba tipos, orden y significado de ambas claves.

#### Relacionar por cliente y estado

```powerquery
let F = #table({"cliente","estado","objetivo"}, {{1,"completado",500},{2,"cancelado",0}}), J = Table.NestedJoin(Pedidos,{"cliente","estado"},F,{"cliente","estado"},"objetivos",JoinKind.Inner) in Table.ExpandTableColumn(J,"objetivos",{"objetivo"})
```

En el editor selecciona ambas claves en el mismo orden.

**Resultado esperado** 4 filas: ids 101,102,107 con objetivo 500; 103 con objetivo 0.

### Cardinalidad y duplicación

**Clave** `cardinalidad-y-duplicacion`

**Definición** La cardinalidad indica si una clave tiene una o varias coincidencias. Expandir una relación uno a varios repite valores del lado uno.

**Búsqueda** 1 a muchos, many-to-many, duplicación, fan-out

**Para recordar** Valida claves de la dimensión antes de sumar una tabla expandida.

#### Contar coincidencias por cliente

```powerquery
let J = Table.NestedJoin(Clientes,{"cliente"},Pedidos,{"cliente"},"p",JoinKind.LeftOuter) in Table.AddColumn(J,"coincidencias", each Table.RowCount([p]), Int64.Type)
```

El conteo se obtiene antes de expandir.

**Resultado esperado** Clientes 1,2,3,4 tienen 3,2,2,0 coincidencias respectivamente.

### Fuzzy Merge

**Clave** `fuzzy-merge`

**Definición** La unión aproximada busca similitud textual cuando no existe una coincidencia exacta.

**Búsqueda** Fuzzy Matching, combinar aproximado, similitud

**Para recordar** No es adecuada para claves de identidad sin validación humana.

**Nota** La disponibilidad y las opciones dependen del entorno; una coincidencia aproximada no demuestra identidad.

#### Comparar nombres de catálogos

1. Crea A con nombre = Ana y B con nombre = ANA, usando dos consultas en blanco
2. Combinar consultas, selecciona nombre de ambas y activa coincidencia aproximada
3. Configura ignorar mayúsculas y limita coincidencias a 1

Revisa el resultado antes de aceptarlo.

**Resultado esperado** Una coincidencia esperada Ana–ANA.

## Append Queries

**Clave** `append-queries`

### Definición

**Clave** `definicion`

**Definición** Append combina filas de varias tablas alineando columnas por nombre. En M se usa `Table.Combine`.

**Búsqueda** Append, anexar, UNION ALL

**Para recordar** Append suma filas; Merge añade coincidencias entre tablas.

#### Anexar pedidos de dos periodos

```powerquery
let E = Table.SelectRows(Pedidos, each Date.Month([fecha]) = 1), F = Table.SelectRows(Pedidos, each Date.Month([fecha]) = 2) in Table.Combine({E,F})
```

Inicio > Anexar consultas.

**Resultado esperado** 7 filas con las 6 columnas originales.

### Esquemas distintos

**Clave** `esquemas-distintos`

**Definición** Si una columna falta en una tabla anexada, el resultado la incluye con null en esas filas.

**Búsqueda** append columnas diferentes, esquema

**Para recordar** Los nombres deben coincidir exactamente para alinear campos.

#### Anexar datos con un campo opcional

```powerquery
Table.Combine({#table({"id","importe"},{{1,100}}),#table({"id","canal"},{{2,"Web"}})})
```

La unión contiene los nombres de ambas tablas.

**Resultado esperado** id, importe, canal: (1,100,null),(2,null,Web).

### Anexar varias tablas

**Clave** `anexar-varias-tablas`

**Definición** `Table.Combine` acepta una lista de tablas, no solo dos.

**Búsqueda** append tres tablas, concatenar filas

**Para recordar** No elimina duplicados automáticamente.

#### Anexar tres lotes de registros

```powerquery
Table.Combine({#table({"id"},{{1}}),#table({"id"},{{2}}),#table({"id"},{{2}})})
```

Se mantienen los registros repetidos.

**Resultado esperado** 3 filas con ids 1,2,2.

## Pivot y Unpivot

**Clave** `pivot-y-unpivot`

### Definición

**Clave** `definicion`

**Definición** Pivot convierte valores de una columna en encabezados; Unpivot convierte encabezados en valores de filas.

**Búsqueda** pivot, unpivot, dinamizar, anular dinamización

**Para recordar** Pivot ensancha; Unpivot alarga la tabla.

#### Pasar presupuesto mensual a formato largo

```powerquery
Table.Unpivot(Presupuesto, {"Ene","Feb"}, "mes", "presupuesto")
```

Transformar > Anular dinamización de columnas.

**Resultado esperado** 4 filas: (Electrónica,Ene,400),(Electrónica,Feb,500),(Hogar,Ene,200),(Hogar,Feb,300).

### Unpivot de otras columnas

**Clave** `unpivot-de-otras-columnas`

**Definición** `Table.UnpivotOtherColumns` mantiene las claves indicadas y transforma las demás columnas en atributo y valor.

**Búsqueda** Unpivot Other Columns, meses nuevos

**Para recordar** Útil para archivos donde aparecen meses nuevos, siempre que las demás columnas sean métricas comparables.

#### Conservar categoría y transformar meses

```powerquery
Table.UnpivotOtherColumns(Presupuesto, {"categoria"}, "mes", "presupuesto")
```

Se conserva categoría y se transforman todas las otras columnas.

**Resultado esperado** Las mismas cuatro filas del ejemplo anterior; un nuevo mes sería incluido automáticamente.

### Pivot con agregación

**Clave** `pivot-con-agregacion`

**Definición** `Table.Pivot` crea columnas a partir de atributos; una función de agregación resuelve varias filas para la misma celda.

**Búsqueda** Pivot Column, dinamizar con suma

**Para recordar** Si hay valores repetidos por combinación, decide cómo agregarlos.

#### Mostrar presupuesto por categoría y mes

```powerquery
let L = Table.Unpivot(Presupuesto,{"Ene","Feb"},"mes","presupuesto") in Table.Pivot(L,{"Ene","Feb"},"mes","presupuesto",List.Sum)
```

La suma define qué hacer si hay más de un importe por celda.

**Resultado esperado** Columnas categoria,Ene,Feb; Electrónica 400/500 y Hogar 200/300.

### Transpose

**Clave** `transpose`

**Definición** `Table.Transpose` intercambia filas por columnas sin usar una clave de negocio.

**Búsqueda** transponer, transpose, cambiar ejes

**Para recordar** La primera fila puede necesitar promoción a encabezado después.

#### Transponer una matriz pequeña

```powerquery
Table.Transpose(#table({"a","b"}, {{1,2},{3,4}}))
```

Los valores de una fila se convierten en columna.

**Resultado esperado** Column1 y Column2; filas (1,3),(2,4).

## Listas, registros y datos anidados

**Clave** `listas-registros-y-datos-anidados`

### Definición

**Clave** `definicion`

**Definición** Una columna puede contener listas, registros o tablas; la expansión convierte su contenido en filas o columnas.

**Búsqueda** expandir JSON, anidado, record list table

**Para recordar** Antes de expandir identifica el tipo de cada valor.

#### Expandir registros de un JSON

```powerquery
Table.FromRecords(Json.Document("[{""id"":1,""importe"":100},{""id"":2,""importe"":200}]"))
```

El JSON contiene una lista de registros con los mismos campos.

**Resultado esperado** 2 filas con id e importe: (1,100),(2,200).

### Expandir Record

**Clave** `expandir-record`

**Definición** `Table.ExpandRecordColumn` extrae campos de registros en columnas.

**Búsqueda** Expand Record, expandir registro

**Para recordar** Especifica nombres de salida para evitar conflictos.

#### Extraer ciudad y país de un registro

```powerquery
let T = #table({"id","ubicacion"}, {{1,[ciudad="CDMX",pais="México"]}}) in Table.ExpandRecordColumn(T,"ubicacion",{"ciudad","pais"})
```

La columna de registro se sustituye por dos campos.

**Resultado esperado** Una fila (1,CDMX,México).

### Expandir List

**Clave** `expandir-list`

**Definición** `Table.ExpandListColumn` produce una fila por elemento de cada lista.

**Búsqueda** Expand to New Rows, expandir lista

**Para recordar** Los campos de la fila original se repiten por cada elemento.

#### Expandir etiquetas

```powerquery
Table.ExpandListColumn(#table({"id","etiquetas"},{{1,{"A","B"}},{2,{"C"}}}),"etiquetas")
```

Una lista de dos elementos crea dos registros.

**Resultado esperado** (1,A),(1,B),(2,C).

### Expandir Table

**Clave** `expandir-table`

**Definición** `Table.ExpandTableColumn` añade campos de cada tabla anidada a la salida.

**Búsqueda** expandir tabla, expandir detalles, expand

**Para recordar** Selecciona solo las columnas necesarias y comprueba el número de filas.

#### Recuperar pedidos agrupados

```powerquery
let G = Table.Group(Pedidos,{"cliente"},{{"detalle",each _,type table}}) in Table.ExpandTableColumn(G,"detalle",{"id","importe"})
```

Se recuperan las filas de cada grupo sin duplicar la clave cliente.

**Resultado esperado** 7 filas con cliente,id,importe; cliente 1 tiene ids 101,102,107.

### Transformar listas

**Clave** `transformar-listas`

**Definición** `List.Transform` aplica una función a cada elemento y `List.Select` conserva los que cumplen una condición.

**Búsqueda** map, filter, List.Transform, List.Select

**Para recordar** Una transformación cambia valores; un filtro cambia qué elementos quedan.

#### Aumentar importes filtrados en 10 %

```powerquery
List.Transform(List.Select({50,100,200}, each _ >= 100), each _ * 1.1)
```

Primero filtra y después transforma.

**Resultado esperado** {110,220}, con posible representación decimal aproximada.

## Perfil y validación de datos

**Clave** `perfil-y-validacion-de-datos`

### Definición

**Clave** `definicion`

**Definición** El perfilado describe la calidad y distribución de los datos; la validación comprueba reglas de negocio explícitas.

**Búsqueda** data profiling, calidad, auditoría

**Para recordar** Una vista previa limpia no demuestra que toda la tabla esté bien.

#### Activar herramientas de perfil

1. Selecciona Pedidos
2. En Vista activa Calidad de columna, Distribución de columna y Perfil de columna
3. Selecciona canal

Los tres paneles describen la columna desde perspectivas distintas.

**Resultado esperado** 7 filas: 6 canales válidos, 1 vacío por null, sin errores; dos valores no nulos distintos.

### Calidad de columna

**Clave** `calidad-de-columna`

**Definición** Column Quality muestra proporciones de valores válidos, errores y vacíos.

**Búsqueda** column quality, errores, porcentaje nulos

**Para recordar** Revisa las columnas que han pasado por conversiones.

#### Inspeccionar una conversión problemática

1. Duplica Importacion
2. Convierte importe a decimal usando configuración regional es-ES
3. Activa Calidad de columna y selecciona importe

La conversión genera un error en N/D.

**Resultado esperado** 2 válidos de 3, 1 error de 3, 0 vacíos (aprox. 67 %, 33 %, 0 %).

### Distribución de columna

**Clave** `distribucion-de-columna`

**Definición** Column Distribution muestra frecuencias, valores distintos y valores que aparecen una sola vez.

**Búsqueda** column distribution, distinct vs unique

**Para recordar** Distinto cuenta categorías; único cuenta categorías con frecuencia 1.

#### Inspeccionar estados de pedido

1. Selecciona Pedidos
2. Activa Distribución de columna en Vista
3. Observa estado

Los indicadores distinguen categorías de ocurrencias únicas.

**Resultado esperado** 3 valores distintos; 2 únicos (cancelado y pendiente); completado aparece 5 veces.

### Perfil de columna y alcance

**Clave** `perfil-de-columna-y-alcance`

**Definición** Column Profile muestra estadísticas más detalladas; normalmente el perfilado inicia sobre las primeras 1000 filas.

**Búsqueda** column profile, top 1000, dataset completo

**Para recordar** Cambia a todo el conjunto de datos si necesitas validar más allá de la muestra.

**Nota** En orígenes grandes, perfilar todos los datos puede ser costoso.

#### Ver el rango de importes

1. Selecciona Pedidos
2. Activa Perfil de columna y selecciona importe
3. En la barra inferior, cambia el perfilado a todo el conjunto de datos si está disponible

El perfil ahora usa todas las filas, no solo una muestra.

**Resultado esperado** 7 filas, mínimo 50, máximo 300, promedio aprox. 147.1429.

### Reglas de calidad

**Clave** `reglas-de-calidad`

**Definición** Las reglas de calidad se pueden expresar como filtros, conteos o indicadores para comprobar claves, rangos y faltantes.

**Búsqueda** validar PK, integridad, controles de calidad

**Para recordar** El tipo de datos no garantiza unicidad ni validez de negocio.

#### Comprobar la clave de pedidos

```powerquery
[filas=Table.RowCount(Pedidos), claves=List.Count(List.Distinct(Pedidos[id])), sin_clave=Table.RowCount(Table.SelectRows(Pedidos,each [id] = null))]
```

Si filas y claves coinciden y no hay null, la clave es única y presente.

**Resultado esperado** [filas=7, claves=7, sin_clave=0].

### Conciliación antes y después

**Clave** `conciliacion-antes-y-despues`

**Definición** Compara conteos y totales antes y después de una transformación para detectar pérdida o multiplicación accidental.

**Búsqueda** reconciliación, control de totales, fan-out

**Para recordar** El total puede cambiar si la transformación pretende cambiarlo; documenta la razón.

#### Validar que Merge no duplica pedidos

```powerquery
let J = Table.NestedJoin(Pedidos,{"cliente"},Clientes,{"cliente"},"c",JoinKind.LeftOuter), E = Table.ExpandTableColumn(J,"c",{"nombre"}) in [antes=List.Sum(Pedidos[importe]), despues=List.Sum(E[importe]), filas=Table.RowCount(E)]
```

Una clave de cliente única conserva el importe total.

**Resultado esperado** [antes=1030, despues=1030, filas=7].

## Pasos aplicados y Editor avanzado

**Clave** `pasos-aplicados-y-editor-avanzado`

### Definición

**Clave** `definicion`

**Definición** Cada paso del editor representa una expresión M. Los pasos suelen formar una cadena de transformaciones sobre el resultado anterior.

**Búsqueda** Applied Steps, pasos, editor avanzado

**Para recordar** Un paso posterior puede depender de nombres y columnas producidos antes.

#### Filtrar y conservar columnas en dos pasos

```powerquery
let
    Filtrado = Table.SelectRows(Pedidos, each [estado] = "completado"),
    Columnas = Table.SelectColumns(Filtrado, {"id","importe"})
in
    Columnas
```

La consulta devuelve el paso indicado en in.

**Resultado esperado** 5 filas, ids 101,102,104,105,107 y sus importes.

### Editar y eliminar pasos

**Clave** `editar-y-eliminar-pasos`

**Definición** Puedes editar pasos con engranaje, barra de fórmulas o Editor avanzado; eliminarlos puede romper dependencias.

**Búsqueda** edit step, delete step, engranaje

**Para recordar** Comprueba los pasos siguientes al modificar uno anterior.

#### Cambiar el filtro de una consulta

1. Crea una consulta en blanco con el ejemplo de Definición de este grupo
2. Edita Filtrado y cambia completado por cancelado
3. Selecciona Columnas

El último paso usa el nuevo resultado del filtro.

**Resultado esperado** Una fila (103,80).

### Reordenar y dependencia

**Clave** `reordenar-y-dependencia`

**Definición** Mover transformaciones altera los datos disponibles y puede cambiar resultados o producir errores.

**Búsqueda** orden de pasos, referencias, dependencias

**Para recordar** No elimines una columna antes de un paso que la necesita.

#### Detectar un orden inválido

```powerquery
let T = Table.RemoveColumns(Pedidos,{"estado"}) in Table.SelectRows(T,each [estado] = "completado")
```

El filtro intenta usar un campo que ya no existe.

**Resultado esperado** Error por el campo estado ausente.

### Barra de fórmulas y Editor avanzado

**Clave** `barra-de-formulas-y-editor-avanzado`

**Definición** La barra de fórmulas muestra la expresión del paso; el Editor avanzado muestra la consulta M completa.

**Búsqueda** formula bar, advanced editor, editar M

**Para recordar** En la barra se escribe = seguido de la expresión; en el Editor avanzado se pega la expresión completa.

#### Inspeccionar el M generado

1. Duplica Pedidos
2. Aplica un filtro en estado
3. Activa Barra de fórmulas en Vista y selecciona el paso de filtro
4. Abre Editor avanzado

El editor muestra una llamada a Table.SelectRows y las referencias al origen.

**Resultado esperado** Se observa la expresión que filtra estado y la consulta completa, con 5 filas si se eligió completado.

## Organizar y reutilizar consultas

**Clave** `organizar-y-reutilizar-consultas`

### Definición

**Clave** `definicion`

**Definición** Las consultas se pueden dividir por etapas, nombrar y reutilizar para separar extracción, limpieza y salida.

**Búsqueda** query groups, staging, referencias

**Para recordar** Una consulta intermedia puede alimentar varias salidas sin cargarla como tabla final.

#### Crear una salida a partir de Pedidos

```powerquery
Table.SelectRows(Pedidos, each [estado] = "completado")
```

Crea una nueva consulta llamada PedidosValidos; su referencia sigue usando Pedidos.

**Resultado esperado** 5 filas de pedidos completados.

### Duplicate y Reference

**Clave** `duplicate-y-reference`

**Definición** Duplicate copia los pasos de una consulta; Reference crea otra consulta que usa su salida.

**Búsqueda** duplicar, referencia, diferencia

**Para recordar** Reference depende de la consulta original; Duplicate no depende de ella automáticamente.

**Nota** Referenciar no garantiza una única lectura física del origen durante la actualización.

#### Comparar dos consultas derivadas

1. Crea una consulta BasePrueba con el literal #table({"id"},{{1},{2}})
2. Clic derecho > Duplicar y Referencia para crear dos derivadas
3. Edita BasePrueba y agrega una tercera fila {3}

La referencia cambia junto a BasePrueba; la copia mantiene sus pasos previos.

**Resultado esperado** Referencia: 3 filas; duplicado: 2 filas.

### Grupos y dependencias

**Clave** `grupos-y-dependencias`

**Definición** Los grupos de consultas ordenan el proyecto y la vista de dependencias muestra qué consultas usan otras.

**Búsqueda** query dependencies, organizar consultas, grupos

**Para recordar** Usa nombres descriptivos como origen, limpieza y salida.

#### Separar consultas de origen y salida

1. Crea grupos Origen y Reportes
2. Coloca Pedidos en Origen y PedidosValidos en Reportes
3. Abre Vista > Dependencias de consulta en Power BI Desktop

La organización visual no cambia la lógica de datos.

**Resultado esperado** Se observa la dependencia Pedidos → PedidosValidos; cada grupo contiene la consulta correspondiente.

## Parámetros

**Clave** `parametros`

### Definición

**Clave** `definicion`

**Definición** Un parámetro es un valor configurable que otras consultas pueden usar para cambiar filtros, rutas u opciones sin editar toda la lógica.

**Búsqueda** Manage Parameters, parámetro, valor dinámico

**Para recordar** Separa la configuración del código que la utiliza.

#### Filtrar por un umbral configurable

```powerquery
let Minimo = 150 in Table.SelectRows(Pedidos, each [importe] >= Minimo)
```

El valor Minimo se declara aparte del filtro.

**Resultado esperado** Ids 102,104,105,107.

### Administrar parámetros

**Clave** `administrar-parametros`

**Definición** El editor permite crear parámetros con nombre, tipo, valor actual y valores sugeridos.

**Búsqueda** Manage Parameters, New Parameter

**Para recordar** El tipo del parámetro debe coincidir con el campo o función que lo usa.

#### Crear un parámetro de importe

1. Inicio > Administrar parámetros > Nuevo parámetro
2. Nómbralo ImporteMinimo, tipo Número decimal, valor actual 150
3. Crea una consulta con Table.SelectRows(Pedidos, each [importe] >= ImporteMinimo)
4. Cambia el valor a 200

El filtro utiliza el valor actual del parámetro.

**Resultado esperado** Con 150: 4 filas; con 200: ids 102 y 107.

### Parámetros de fecha y ruta

**Clave** `parametros-de-fecha-y-ruta`

**Definición** Un parámetro puede representar una fecha límite o una ruta de origen.

**Búsqueda** parámetro fecha, ruta archivo, entorno

**Para recordar** El entorno de destino debe poder acceder a la ruta; no guardes secretos en parámetros.

#### Cambiar el inicio del periodo

```powerquery
let Desde = #date(2026,2,1) in Table.SelectRows(Pedidos, each [fecha] >= Desde)
```

Cambiar Desde cambia qué pedidos entran.

**Resultado esperado** Ids 104,105,106,107.

## Funciones personalizadas

**Clave** `funciones-personalizadas`

### Definición

**Clave** `definicion`

**Definición** Una función personalizada encapsula lógica reutilizable. Puede recibir un valor o tabla y devolver otro valor o tabla.

**Búsqueda** custom function, función M, reutilizar

**Para recordar** Define los argumentos y el resultado; invócala con valores concretos.

#### Crear una función de normalización

```powerquery
let Normalizar = (t as nullable text) as nullable text => Text.Lower(Text.Trim(t)) in Normalizar(" ANA@ejemplo.com ")
```

La función admite texto y null.

**Resultado esperado** "ana@ejemplo.com".

### Invocar una función por fila

**Clave** `invocar-una-funcion-por-fila`

**Definición** Una función guardada como consulta se puede invocar en una columna personalizada para procesar cada fila.

**Búsqueda** Invoke Custom Function, invocar función

**Para recordar** El argumento debe usar el campo correcto de cada fila.

#### Normalizar todos los leads

```powerquery
let F = (t as nullable text) as nullable text => Text.Lower(Text.Trim(t)) in Table.AddColumn(Leads,"correo_limpio", each F([correo]), type nullable text)
```

Cada fila pasa su correo a la función.

**Resultado esperado** 6 filas; ids 1 y 2 producen ana@ejemplo.com, 3 y 4 luis@ejemplo.com, 5 null, 6 texto vacío.

### Funciones que reciben tablas

**Clave** `funciones-que-reciben-tablas`

**Definición** Una función puede aplicar un conjunto de transformaciones a tablas con un esquema común.

**Búsqueda** función tabla, transformar archivos, parámetro tabla

**Para recordar** Comprueba que las columnas esperadas existan en cada entrada.

#### Reutilizar un filtro

```powerquery
let Validar = (t as table) as table => Table.SelectRows(t, each [estado] = "completado") in Validar(Pedidos)
```

La función devuelve una tabla filtrada.

**Resultado esperado** 5 filas, ids 101,102,104,105,107.

### Argumentos opcionales

**Clave** `argumentos-opcionales`

**Definición** Un parámetro declarado `optional` puede omitirse; si falta, su valor es null.

**Búsqueda** optional, argumento por defecto

**Para recordar** Define explícitamente el comportamiento para un argumento ausente.

#### Calcular comisión con tasa opcional

```powerquery
let F = (importe as number, optional tasa as nullable number) as number => importe * (tasa ?? 0.05) in {F(100), F(100,0.10)}
```

La tasa omitida usa el 5 %.

**Resultado esperado** {5,10}.

## Combinar archivos de una carpeta

**Clave** `combinar-archivos-de-una-carpeta`

### Definición

**Clave** `definicion`

**Definición** El conector de carpeta devuelve metadatos y contenido binario de archivos; Combine Files aplica una transformación común y anexa las salidas.

**Búsqueda** From Folder, Combine Files, importar carpeta

**Para recordar** Los archivos deben compartir una estructura compatible o necesitar una normalización explícita.

**Nota** Requiere acceso al sistema de archivos y conector disponible.

#### Combinar dos archivos mensuales

1. Crea una carpeta de prueba solo con ene.csv y feb.csv; ambos tienen encabezado id,importe, seguido de 101,100 y 104,150 respectivamente
2. Inicio > Obtener datos > Carpeta, selecciona la ruta
3. Pulsa Combinar y transformar datos; revisa el delimitador y tipos

La transformación del archivo de ejemplo se aplica a los dos archivos.

**Resultado esperado** 2 filas con id e importe: (101,100),(104,150); puede incluirse el nombre de archivo.

### Filtrar archivos antes de combinar

**Clave** `filtrar-archivos-antes-de-combinar`

**Definición** Se pueden filtrar extensión, nombre, ruta y atributos antes de leer el contenido.

**Búsqueda** Folder.Files, Extension, archivos ocultos

**Para recordar** Folder.Files incluye subcarpetas; Folder.Contents no recorre automáticamente todos sus descendientes.

#### Seleccionar solo CSV de prueba

1. En la carpeta del ejemplo anterior añade notas.txt con cualquier texto
2. Elige Carpeta > Transformar datos
3. Filtra Extension a .csv antes de combinar Content

El archivo ajeno queda fuera de la transformación.

**Resultado esperado** Dos archivos elegibles: ene.csv y feb.csv; notas.txt no se procesa.

### Archivo de ejemplo y función

**Clave** `archivo-de-ejemplo-y-funcion`

**Definición** El asistente genera consultas auxiliares y una función para transformar cada binario según el archivo de ejemplo.

**Búsqueda** Transform Sample File, Transform File, consulta auxiliar

**Para recordar** Edita la transformación común, no cada archivo individualmente.

#### Crear una función de lectura CSV sin archivos

```powerquery
let Leer = (b as binary) as table => Table.TransformColumnTypes(Table.PromoteHeaders(Csv.Document(b,[Delimiter=",",Encoding=65001])),{{"id",Int64.Type},{"importe",type number}}), A = Text.ToBinary("id,importe#(lf)101,100"), B = Text.ToBinary("id,importe#(lf)104,150") in Table.Combine({Leer(A),Leer(B)})
```

Los binarios literales simulan el contenido de dos archivos.

**Resultado esperado** 2 filas: (101,100),(104,150), ambos campos numéricos.

### Trazabilidad y archivos nuevos

**Clave** `trazabilidad-y-archivos-nuevos`

**Definición** Guardar el nombre o periodo del archivo permite rastrear errores y distinguir lotes. La actualización vuelve a leer la carpeta.

**Búsqueda** Source.Name, origen de archivo, nuevos meses

**Para recordar** Mantén filtros de archivos y esquema estables; revisa duplicados entre lotes.

#### Agregar un nuevo periodo

1. En la carpeta de prueba añade mar.csv con encabezado id,importe y fila 108,200
2. Actualiza la consulta combinada
3. Conserva Source.Name o su equivalente si fue generado

La consulta no necesita agregar un archivo manualmente.

**Resultado esperado** 3 filas, ids 101,104,108, con sus archivos de procedencia si conservaste el nombre.

## APIs REST y Web.Contents

**Clave** `apis-rest-y-web-contents`

### Definición

**Clave** `definicion`

**Definición** Una API expone datos a través de una interfaz, a menudo HTTP y JSON. `Web.Contents` obtiene el contenido binario de una petición.

**Búsqueda** API REST, HTTP, Web.Contents, Json.Document

**Para recordar** La descarga y el análisis de JSON son pasos distintos.

#### Simular la respuesta JSON de una API

```powerquery
let Respuesta = Text.ToBinary("{""datos"":[{""id"":1,""importe"":100}]}"), J = Json.Document(Respuesta) in Table.FromRecords(J[datos])
```

Se usa una respuesta local reproducible en lugar de un servicio externo.

**Resultado esperado** Una fila (1,100). No se realizó una petición HTTP.

### Ruta relativa y parámetros HTTP

**Clave** `ruta-relativa-y-parametros-http`

**Definición** Las opciones `RelativePath` y `Query` de Web.Contents separan la URL base de la ruta y los parámetros.

**Búsqueda** RelativePath, Query, query string, URL dinámica

**Para recordar** Usa parámetros de URL en vez de concatenarlos sin codificación.

**Nota** No se requiere una API para este ejemplo. En una petición real, verifica endpoint, autenticación y límites del proveedor.

#### Preparar una URL de petición

```powerquery
Uri.BuildQueryString([pagina="2", limite="100"])
```

En una petición real se pueden pasar esos campos mediante Query=[pagina="2", limite="100"] a Web.Contents, junto con RelativePath.

**Resultado esperado** Texto de consulta equivalente a pagina=2&limite=100; el orden de parámetros no cambia su significado.

### Autenticación y credenciales

**Clave** `autenticacion-y-credenciales`

**Definición** Los conectores gestionan credenciales como anónimo, básico, cuenta organizativa o clave de API según el servicio.

**Búsqueda** API key, OAuth, headers, credenciales

**Para recordar** No incrustes contraseñas, tokens o claves reales en código M ni en documentación.

**Nota** El método exacto depende de la API; OAuth personalizado puede requerir un conector específico.

#### Configurar acceso a una API de prueba

1. Usa una API HTTPS autorizada cuya documentación indique una clave en la URL
2. Configura el conector Web y el método Web API si es compatible
3. Cuando corresponda, usa ApiKeyName en Web.Contents para el nombre del parámetro, no para el secreto

La clave se configura en el almacén de credenciales.

**Resultado esperado** Una petición autorizada devuelve datos según el contrato de la API; sin credenciales válidas puede fallar.

### Paginación

**Clave** `paginacion`

**Definición** Una API paginada devuelve los datos por lotes. Debes solicitar páginas hasta alcanzar una condición de fin.

**Búsqueda** pagination, next link, cursor, List.Generate

**Para recordar** No supongas que una primera respuesta contiene todos los registros.

**Nota** Si el proveedor usa cursor o next link, cambia la condición de avance y fin; respeta límites de llamadas.

#### Combinar páginas simuladas

```powerquery
let Paginas = {{[id=1],[id=2]},{[id=3]},{}}, Obtener = (n as number) => Paginas{n}, Lotes = List.Generate(()=>[n=0,lote=Obtener(0)], each not List.IsEmpty([lote]), each [n=[n]+1,lote=Obtener([n]+1)], each [lote]) in Table.FromRecords(List.Combine(Lotes))
```

La última página vacía detiene la generación.

**Resultado esperado** 3 filas, ids 1,2,3; no se llama a una API real.

### Errores HTTP y respuestas inesperadas

**Clave** `errores-http-y-respuestas-inesperadas`

**Definición** Las APIs pueden devolver códigos de error, límites de tasa o un esquema diferente. Registra el problema sin convertirlo silenciosamente en cero filas.

**Búsqueda** HTTP 429, 401, 500, error API, retry

**Para recordar** Una respuesta inválida no significa que el origen esté vacío.

**Nota** En HTTP real, sigue el procedimiento de reintentos del proveedor; algunos estados son administrados por el motor y otros tienen restricciones de conector.

#### Detectar un JSON con estructura inesperada

```powerquery
let J = Json.Document("{""error"":""limite de tasa""}") in if Record.HasFields(J,"datos") then J[datos] else error "Respuesta sin campo datos"
```

Se valida el contrato esperado antes de expandir.

**Resultado esperado** Error con el mensaje Respuesta sin campo datos.

## Carga, actualización y credenciales

**Clave** `carga-actualizacion-y-credenciales`

### Definición

**Clave** `definicion`

**Definición** La carga entrega el resultado al destino; la actualización vuelve a evaluar la consulta con el origen disponible.

**Búsqueda** Close & Load, Close & Apply, refresh

**Para recordar** Editar la consulta no equivale a cargarla ni a editar el origen.

#### Cargar una consulta de pedidos

1. En Power BI Desktop selecciona Pedidos y confirma que la carga esté habilitada
2. Inicio > Cerrar y aplicar
3. Abre la vista de tabla o modelo

En Excel, Cerrar y cargar permite enviar resultados a una hoja u otros destinos compatibles.

**Resultado esperado** La tabla cargada tiene 7 filas y 6 columnas.

### Carga de consultas auxiliares

**Clave** `carga-de-consultas-auxiliares`

**Definición** Una consulta intermedia puede participar en otras sin aparecer como tabla final del modelo.

**Búsqueda** Enable Load, solo conexión, staging

**Para recordar** Deshabilitar la carga no elimina sus dependencias.

#### Cargar solo la salida filtrada

1. Crea PedidosValidos como referencia de Pedidos y filtra completado
2. En Power BI Desktop desactiva Habilitar carga para Pedidos y mantenla para PedidosValidos
3. Cierra y aplica

En Excel puede usarse Solo crear conexión para consultas auxiliares, según versión.

**Resultado esperado** PedidosValidos aparece cargada con 5 filas; Pedidos sigue disponible como consulta auxiliar.

### Actualizar vista previa o destino

**Clave** `actualizar-vista-previa-o-destino`

**Definición** Actualizar vista previa consulta datos para el editor; actualizar el destino vuelve a procesar las consultas que lo alimentan.

**Búsqueda** Refresh Preview, Refresh All, actualizar datos

**Para recordar** La vista previa y los datos cargados pueden estar en estados diferentes.

#### Comprobar cambios de origen

1. Crea una consulta de prueba con #table({"id"},{{1},{2}}) y cárgala
2. Edita el origen literal para incluir {3}
3. Observa la vista previa y aplica o carga los cambios

En una fuente externa, modificar el archivo y actualizar produce un efecto equivalente.

**Resultado esperado** Vista previa: 3 filas; después de aplicar, destino: 3 filas.

### Configuración del origen

**Clave** `configuracion-del-origen`

**Definición** La configuración de origen administra rutas, autenticación y permisos guardados.

**Búsqueda** Data Source Settings, Edit Permissions, credenciales

**Para recordar** No compartas secretos ni borres permisos sin entender qué consultas los usan.

#### Revisar un origen local

1. Importa ventas.xlsx del ejemplo de Excel
2. Abre Configuración de origen de datos
3. Selecciona ese origen y revisa ruta y permisos

Al mover el archivo, cambia la referencia al origen y prueba de nuevo.

**Resultado esperado** La consulta usa la ruta configurada y muestra dos filas si el archivo existe y tiene los datos de prueba.

### Gateway y actualización programada

**Clave** `gateway-y-actualizacion-programada`

**Definición** En Power BI Service un gateway puede conectar un modelo con orígenes que el servicio no alcanza directamente; la actualización programada ejecuta refrescos periódicos.

**Búsqueda** gateway, scheduled refresh, servicio Power BI

**Para recordar** Publicar un informe no garantiza que el servicio pueda leer el origen.

#### Configurar una actualización de SQL local

1. Publica un modelo de prueba con datos de un SQL Server local autorizado
2. En la configuración del modelo semántico asigna un gateway y credenciales válidas
3. Ejecuta Actualizar ahora y revisa el historial antes de programar horarios

Requiere gateway accesible, permisos y configuración del servicio.

**Resultado esperado** La actualización de prueba figura como correcta y refleja los datos vigentes si todos los requisitos se cumplen.

## Cambios de esquema y mantenimiento

**Clave** `cambios-de-esquema-y-mantenimiento`

### Definición

**Clave** `definicion`

**Definición** Un cambio de esquema ocurre cuando un origen añade, elimina, renombra o cambia el tipo de una columna. Puede romper pasos posteriores.

**Búsqueda** schema drift, cambio de esquema, error refresh

**Para recordar** Distingue campos obligatorios de opcionales.

#### Comprobar columnas requeridas

```powerquery
Table.HasColumns(Pedidos,{"id","importe","estado"})
```

La validación comprueba nombres, no tipos ni valores.

**Resultado esperado** true.

### Campos obligatorios y opcionales

**Clave** `campos-obligatorios-y-opcionales`

**Definición** `Table.HasColumns` comprueba requisitos y `MissingField.UseNull` permite construir columnas opcionales ausentes.

**Búsqueda** columnas faltantes, MissingField, validación esquema

**Para recordar** Falla explícitamente si falta una clave o medida imprescindible.

#### Validar antes de seleccionar

```powerquery
let T = #table({"id"},{{1}}) in if Table.HasColumns(T,{"id","importe"}) then T else error "Falta importe"
```

El importe es obligatorio en esta consulta.

**Resultado esperado** Error con mensaje Falta importe.

### Cambios de tipos y archivos inconsistentes

**Clave** `cambios-de-tipos-y-archivos-inconsistentes`

**Definición** Dos archivos con las mismas columnas pueden tener formatos incompatibles. Controla conversiones por lote y conserva evidencia de errores.

**Búsqueda** tipo cambiado, CSV inconsistente, limpieza por archivo

**Para recordar** No descartes un archivo entero sin saber por qué falló.

#### Marcar importes no convertibles

```powerquery
let T = Table.AddColumn(Importacion,"conversion",each try Number.FromText([importe],"es-ES")), E = Table.AddColumn(T,"invalido",each [conversion][HasError],type logical) in Table.SelectColumns(E,{"id","invalido"})
```

El indicador conserva la información de fallo sin sustituir el importe original.

**Resultado esperado** (1,false),(2,true),(3,false), ids como texto.

## Modelo de datos y granularidad

**Clave** `modelo-de-datos-y-granularidad`

### Definición

**Clave** `definicion`

**Definición** La granularidad describe qué representa una fila. En un modelo analítico, una tabla de hechos registra eventos y una dimensión describe entidades.

**Búsqueda** hechos, dimensiones, star schema, granularidad

**Para recordar** Define qué representa una fila antes de unir o agregar.

#### Identificar las entidades del dataset

```powerquery
[pedidos=Table.RowCount(Pedidos), clientes=Table.RowCount(Clientes)]
```

Pedidos contiene eventos de compra; Clientes contiene entidades descriptivas.

**Resultado esperado** 7 pedidos y 4 clientes, con distinta granularidad.

### Claves y dimensiones

**Clave** `claves-y-dimensiones`

**Definición** Una dimensión debe tener una clave apropiada para relacionarse con una tabla de hechos. Las claves pueden ser naturales o sustitutas.

**Búsqueda** dimension, primary key, foreign key, surrogate key

**Para recordar** No confundas un índice de posición con una clave estable a través de actualizaciones.

#### Validar clave de dimensión

```powerquery
Table.RowCount(Clientes) = List.Count(List.Distinct(List.RemoveNulls(Clientes[cliente])))
```

Coincidir implica que no faltan ni se repiten claves en esta tabla.

**Resultado esperado** true.

### Relaciones del modelo frente a Merge

**Clave** `relaciones-del-modelo-frente-a-merge`

**Definición** Merge materializa campos en una consulta; una relación del modelo conecta tablas cargadas para el análisis.

**Búsqueda** relaciones Power BI, Merge vs relationship

**Para recordar** No aplanes todas las dimensiones sin necesidad; preserva la granularidad de hechos.

#### Crear una relación de clientes a pedidos

1. Carga Pedidos y Clientes sin expandirlos
2. En la vista Modelo de Power BI Desktop relaciona Clientes[cliente] con Pedidos[cliente]
3. Comprueba cardinalidad 1 a muchos y dirección de filtro adecuada

El modelo conserva dos tablas y una relación, no una nueva tabla combinada.

**Resultado esperado** Clientes mantiene 4 filas y Pedidos 7; una relación 1:* conecta ambas claves.

## Query Folding y rendimiento

**Clave** `query-folding-y-rendimiento`

### Definición

**Clave** `definicion`

**Definición** Query Folding permite que el motor delegue transformaciones al origen cuando el conector y la operación lo admiten.

**Búsqueda** query folding, plegado, pushdown

**Para recordar** El mismo código puede plegarse con un origen y no con otro.

**Nota** Las tablas literales #table no tienen servidor al que delegar; que Ver consulta nativa esté deshabilitado no demuestra por sí solo ausencia de plegado.

#### Comprobar si un filtro se delega a SQL

1. Conecta a una tabla SQL Server autorizada con columnas id e importe
2. Aplica un filtro importe >= 100
3. En el paso de filtro revisa Ver consulta nativa si está disponible

La posibilidad de delegar depende del conector y la expresión concreta.

**Resultado esperado** Si se pliega y el comando está disponible, se observa una consulta equivalente con el filtro en el origen.

### Plegado completo, parcial y sin plegado

**Clave** `plegado-completo-parcial-y-sin-plegado`

**Definición** Un flujo puede delegar todas, algunas o ninguna de las transformaciones posteriores al origen.

**Búsqueda** full partial no folding, evaluación

**Para recordar** Comprueba los pasos y no supongas que todas las operaciones se ejecutan en SQL.

#### Comparar dos pasos de una consulta

1. Importa dbo.Ventas de SQL Server con ids 1 y 2 e importes 100 y 200
2. Filtra importe >= 100
3. Añade una columna personalizada y revisa Ver consulta nativa o diagnóstico en ambos pasos

Una operación compatible puede delegarse y otra procesarse en M.

**Resultado esperado** La salida conserva las dos filas; la evidencia de plegado puede diferir por paso y conector.

### Reducir datos temprano

**Clave** `reducir-datos-temprano`

**Definición** Filtrar filas y seleccionar columnas pronto puede reducir memoria, transferencia y trabajo posterior.

**Búsqueda** optimizar, filtrar temprano, projection

**Para recordar** No cambies el orden si altera el significado del cálculo.

#### Preparar una salida pequeña

```powerquery
let F = Table.SelectRows(Pedidos,each [estado] = "completado"), C = Table.SelectColumns(F,{"cliente","importe"}) in C
```

Se conservan solo datos necesarios antes de otras transformaciones.

**Resultado esperado** 5 filas y 2 columnas.

### Table.Buffer

**Clave** `table-buffer`

**Definición** `Table.Buffer` materializa superficialmente una tabla en memoria; puede impedir plegado posterior y no siempre mejora velocidad.

**Búsqueda** buffer, caché, Table.Buffer, rendimiento

**Para recordar** No lo uses por defecto; mide antes y después. No es una caché persistente entre actualizaciones.

#### Materializar una tabla pequeña

```powerquery
Table.RowCount(Table.Buffer(Pedidos))
```

Buffer no cambia el número de filas de esta tabla.

**Resultado esperado** 7; no se afirma una mejora de rendimiento.

### Consulta nativa

**Clave** `consulta-nativa`

**Definición** Algunos conectores permiten enviar SQL escrito manualmente mediante opciones de origen o Value.NativeQuery.

**Búsqueda** native query, SQL nativo, Value.NativeQuery

**Para recordar** Usa permisos de lectura y evita concatenar entradas no confiables; el plegado posterior depende del conector.

#### Leer una consulta SQL de prueba

1. En un SQL Server autorizado crea dbo.Ventas con las filas (1,100),(2,200)
2. En Obtener datos > SQL Server > Opciones avanzadas indica SELECT id, importe FROM dbo.Ventas WHERE importe >= 200
3. Confirma la consulta y revisa la salida

La condición se ejecuta en el servidor.

**Resultado esperado** Una fila (2,200), si los datos del servidor son los de prueba.

## Privacidad y Data Privacy Firewall

**Clave** `privacidad-y-data-privacy-firewall`

### Definición

**Clave** `definicion`

**Definición** Los niveles de privacidad controlan cómo Power Query puede combinar datos de orígenes distintos y evitar transferencias no deseadas.

**Búsqueda** privacy levels, firewall, privacidad orígenes

**Para recordar** Privacidad no sustituye permisos del origen ni seguridad de filas.

#### Revisar privacidad de un archivo

1. Conecta un archivo ficticio con identificadores de clientes
2. Abre Configuración de origen de datos > Editar permisos
3. Selecciona el nivel adecuado según política de datos, por ejemplo Privado

El nivel indica cómo puede combinarse el origen con otros.

**Resultado esperado** El origen queda configurado con el nivel elegido en el producto compatible.

### Public, Organizational y Private

**Clave** `public-organizational-y-private`

**Definición** Público admite datos de libre difusión; Organizacional corresponde al ámbito de confianza de la organización; Privado protege información sensible frente a transferencias a otros orígenes.

**Búsqueda** public organizational private, clasificación

**Para recordar** Clasifica por sensibilidad real, no por comodidad de actualización.

#### Clasificar dos fuentes de prueba

1. Crea una fuente de precios públicos y otra fuente con datos internos ficticios
2. Revisa sus permisos y niveles de privacidad por separado

Asigna el nivel de acuerdo con la clasificación de la organización.

**Resultado esperado** La fuente pública se puede marcar Pública; la fuente interna se marca Organizacional o Privada según su sensibilidad y política.

### Formula.Firewall

**Clave** `formula-firewall`

**Definición** Un error de firewall puede aparecer cuando las particiones de evaluación combinan referencias y accesos a orígenes de manera incompatible con las reglas de privacidad.

**Búsqueda** Formula.Firewall, data privacy firewall

**Para recordar** No ignores privacidad para corregir un fallo de diseño o credenciales.

**Nota** No se afirma que todo error de firewall tenga una única solución; algunas capacidades varían por producto.

#### Diagnosticar una combinación bloqueada

1. Si una consulta de prueba combina un archivo privado y una consulta Web autorizada, revisa los niveles de ambos orígenes
2. Inspecciona si valores privados se usan como parámetros de la petición Web
3. Separa la extracción y combinación según las reglas del entorno y repite la prueba

El objetivo es evitar que datos privados se envíen a otro origen sin autorización.

**Resultado esperado** La consulta se mantiene bloqueada si la combinación no es válida; solo debe funcionar cuando respete las reglas de privacidad.

## Diagnóstico de consultas

**Clave** `diagnostico-de-consultas`

### Definición

**Clave** `definicion`

**Definición** Query Diagnostics registra operaciones de evaluación para ayudar a identificar consultas costosas o inesperadas en Power BI Desktop.

**Búsqueda** query diagnostics, diagnóstico, rendimiento

**Para recordar** Mide el comportamiento real; no deduzcas rendimiento solo por el número de pasos.

#### Registrar una evaluación de pedidos

1. Abre Power Query Editor en Power BI Desktop
2. En Herramientas inicia diagnóstico
3. Actualiza la vista previa de Pedidos y detén diagnóstico

El editor genera consultas de diagnóstico si la función está disponible.

**Resultado esperado** Tablas de diagnóstico con operaciones y duraciones dependientes del entorno, no un tiempo fijo.

### Duración y consultas al origen

**Clave** `duracion-y-consultas-al-origen`

**Definición** Los registros detallados permiten inspeccionar operaciones, duración y, cuando se informa, peticiones al origen.

**Búsqueda** exclusive duration, data source query, duración

**Para recordar** No sumes porcentajes de duración exclusiva de evaluaciones independientes.

**Nota** La disponibilidad y el contenido del diagnóstico dependen del conector y de la versión.

#### Identificar una lectura de SQL

1. Con una consulta SQL autorizada, inicia diagnóstico
2. Actualiza el paso filtrado y detén diagnóstico
3. Filtra el resultado por la evaluación correspondiente e inspecciona operaciones de origen

Compara la información del origen con los pasos aplicados.

**Resultado esperado** Si el conector registra la consulta nativa, se puede inspeccionar; duración y número de operaciones varían.

## Power Query Online y Dataflows

**Clave** `power-query-online-y-dataflows`

### Definición

**Clave** `definicion`

**Definición** Power Query Online ofrece preparación de datos en servicios web de Microsoft. Un dataflow guarda una definición de transformación reutilizable en el servicio.

**Búsqueda** dataflow, Power Query Online, Fabric, Gen1 Gen2

**Para recordar** El destino y la licencia dependen del producto; no es lo mismo que un archivo PBIX.

**Nota** Requiere acceso real a Power BI, Fabric o Power Platform según el tipo de flujo.

#### Crear un flujo de datos de prueba

1. En un workspace con capacidad y permisos adecuados, crea un flujo de datos del tipo disponible
2. Abre el editor Power Query Online
3. Crea una consulta en blanco con #table({"id","importe"},{{1,100},{2,200}})
4. Configura la salida o destino exigido por el producto y publica

El flujo prepara la tabla en el servicio.

**Resultado esperado** 2 filas en la salida configurada después de una ejecución correcta.

### Destinos y reutilización

**Clave** `destinos-y-reutilizacion`

**Definición** Un dataflow permite preparar tablas para consumo posterior, con destinos y conectores específicos de cada generación.

**Búsqueda** destino dataflow, lakehouse, reutilizar ETL

**Para recordar** Verifica dónde quedan los datos y qué consumidor tiene acceso.

**Nota** Dataflow Gen1, Gen2 y Power Platform no tienen los mismos destinos ni requisitos.

#### Consumir una salida preparada

1. Publica el flujo de prueba del ejemplo anterior
2. En un consumidor autorizado conecta a la salida mediante el conector o destino correspondiente
3. Selecciona la tabla preparada

El consumidor utiliza datos ya transformados.

**Resultado esperado** 2 filas (1,100),(2,200) si el flujo se ejecutó correctamente.

## M avanzado

**Clave** `m-avanzado`

### Definición

**Clave** `definicion`

**Definición** M admite funciones como valores, evaluación por dependencias y construcción programática de listas y tablas.

**Búsqueda** M avanzado, evaluación diferida, funciones de orden superior

**Para recordar** Usa técnicas avanzadas cuando simplifiquen la lógica; no por defecto.

#### Evaluar solo el resultado necesario

```powerquery
let NoUsado = error "No necesario", Total = 100 + 200 in Total
```

El valor no referenciado no necesita evaluarse en este ejemplo.

**Resultado esperado** 300, sin el error de NoUsado.

### Funciones de orden superior

**Clave** `funciones-de-orden-superior`

**Definición** Una función de orden superior recibe o devuelve otra función, como List.Transform.

**Búsqueda** higher order functions, función como argumento

**Para recordar** Pasa la función, no el resultado de invocarla, si la operación espera una función.

#### Aplicar una función a tres números

```powerquery
let Doble = (x as number) as number => 2*x in List.Transform({1,2,3},Doble)
```

List.Transform invoca Doble para cada elemento.

**Resultado esperado** {2,4,6}.

### List.Accumulate

**Clave** `list-accumulate`

**Definición** Acumula un estado inicial mientras recorre una lista. La función recibe el estado anterior y el elemento actual.

**Búsqueda** fold, reduce, acumulador, List.Accumulate

**Para recordar** Define un estado inicial coherente con lo que quieres devolver.

#### Sumar incrementos de saldo

```powerquery
List.Accumulate({100,-20,50},0,(saldo,movimiento)=>saldo+movimiento)
```

El saldo cambia con cada movimiento.

**Resultado esperado** 130.

### List.Generate

**Clave** `list-generate`

**Definición** Genera elementos mientras se cumpla una condición, a partir de un estado inicial y una regla de avance.

**Búsqueda** List.Generate, iterar, bucle, generación

**Para recordar** La condición debe permitir terminar la generación.

#### Generar tres meses

```powerquery
List.Generate(()=>#date(2026,1,1), each _ < #date(2026,4,1), each Date.AddMonths(_,1))
```

Avanza un mes hasta llegar al límite exclusivo.

**Resultado esperado** Fechas 2026-01-01, 2026-02-01 y 2026-03-01.

### Recursividad

**Clave** `recursividad`

**Definición** Una función recursiva se llama a sí misma; `@` permite referenciarse desde su definición.

**Búsqueda** recursion, @, función recursiva

**Para recordar** Incluye un caso base y evita recursión innecesaria sobre grandes volúmenes.

#### Sumar enteros hasta cuatro

```powerquery
let F = (n as number) as number => if n <= 0 then 0 else n + @F(n-1) in F(4)
```

El caso base detiene las llamadas en cero.

**Resultado esperado** 10.

## Fuentes

Referencias oficiales para consultar las funciones, los requisitos por producto y las reglas descritas. Los datos de práctica y las explicaciones de esta guía son propios; no proceden de un dataset oficial de Microsoft.

- [Documentación de Power Query](https://learn.microsoft.com/en-us/power-query/) — conceptos, productos y transformaciones.
- [Qué es Power Query](https://learn.microsoft.com/en-us/power-query/power-query-what-is-power-query) — preparación de datos y diferencias de destinos según producto.
- [Conectores disponibles](https://learn.microsoft.com/en-us/power-query/connectors/) — disponibilidad de conectores por producto.
- [Orígenes de datos según versión de Excel](https://support.microsoft.com/en-us/excel/power-query-data-sources-in-excel-versions) y [Power Query en Excel para Mac](https://support.microsoft.com/en-us/excel/import-and-shape-data-in-excel-for-mac-power-query) — diferencias entre plataformas, importación y actualización.
- [Transformar datos con la interfaz](https://learn.microsoft.com/en-us/power-query/power-query-ui) — editor, pasos y operaciones visuales.
- [Referencia de M](https://learn.microsoft.com/en-us/powerquery-m/) y [especificación del lenguaje](https://learn.microsoft.com/en-us/powerquery-m/power-query-m-language-specification) — valores, operadores, tipos, expresiones, funciones y evaluación.
- [Funciones de tabla](https://learn.microsoft.com/en-us/powerquery-m/table-functions) y [funciones de lista](https://learn.microsoft.com/en-us/powerquery-m/list-functions) — firmas y comportamiento de Table.* y List.*.
- [Control de errores de M](https://learn.microsoft.com/en-us/powerquery-m/m-spec-error-handling) — error, try, otherwise y registros de error.
- [Table.Distinct](https://learn.microsoft.com/en-us/powerquery-m/table-distinct) — ausencia de garantía sobre qué duplicado conserva el motor.
- [Agrupar filas](https://learn.microsoft.com/en-us/power-query/group-by) — agregaciones, varias claves y tablas anidadas.
- [Merge Queries](https://learn.microsoft.com/en-us/power-query/merge-queries-overview) y [Append Queries](https://learn.microsoft.com/en-us/power-query/append-queries) — uniones, claves y alineación por nombres de columnas.
- [Pivot](https://learn.microsoft.com/en-us/power-query/pivot-columns) y [Unpivot](https://learn.microsoft.com/en-us/power-query/unpivot-column) — transformación de formato ancho y largo.
- [Panel de consultas](https://learn.microsoft.com/en-us/power-query/queries-pane) — organización y operaciones sobre consultas.
- [Parámetros](https://learn.microsoft.com/en-us/power-query/power-query-query-parameters) y [funciones personalizadas](https://learn.microsoft.com/en-us/power-query/custom-function) — configuración e invocación reutilizable.
- [Combinar archivos](https://learn.microsoft.com/en-us/power-query/combine-files-overview) — archivo de ejemplo, consultas auxiliares y estructura común.
- [Web.Contents](https://learn.microsoft.com/es-es/powerquery-m/web-contents) y [conector Web](https://learn.microsoft.com/en-us/power-query/connectors/web/web) — opciones de petición, autenticación y requisitos del conector.
- [List.Generate](https://learn.microsoft.com/en-us/powerquery-m/list-generate) — generación por condición y avance, base de la paginación simulada.
- [Actualización de datos en Power BI](https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data) y [actualización programada](https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-scheduled-refresh) — modelos, gateway y actualización en servicio.
- [Buenas prácticas](https://learn.microsoft.com/en-us/power-query/best-practices) — perfilado, organización, tipos y reducción temprana de datos.
- [Query Folding](https://learn.microsoft.com/en-us/power-query/power-query-folding) y [Table.Buffer](https://learn.microsoft.com/en-us/powerquery-m/table-buffer) — delegación, evaluación y almacenamiento temporal en memoria.
- [Niveles de privacidad](https://learn.microsoft.com/en-us/power-query/privacy-levels) y [Data Privacy Firewall](https://learn.microsoft.com/en-us/power-query/data-privacy-firewall) — combinación de orígenes y aislamiento.
- [Query Diagnostics](https://learn.microsoft.com/en-us/power-query/query-diagnostics) — diagnóstico, duración y operaciones del origen.
- [Conector de dataflows](https://learn.microsoft.com/en-us/connectors/dataflows/) — consumo de resultados preparados en servicios compatibles.
