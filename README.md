# AllDoc

Biblioteca personal de apuntes breves para recordar conceptos. Docusaurus, React,
TypeScript, MDX y CSS Modules. Solo modo oscuro.

## Ejecutar

Requiere Node.js 22.18 o posterior y acceso al registro de npm.

~~~sh
npm install
npm start
~~~

Abre manualmente http://127.0.0.1:3000, o la dirección que imprima Docusaurus
si utiliza otro puerto. Los comandos start y serve no intentan abrir el navegador
automáticamente, para evitar errores del AppleScript de Chrome en macOS.
La configuración utiliza http://localhost:3000 como URL local; para publicar
más adelante, define SITE_URL.

## Estructura inicial

~~~text
docs/
├── analisis-de-datos/
│   ├── index.mdx
│   ├── excel/
│   │   └── _category_.json
│   ├── power-query/
│   │   └── _category_.json
│   ├── sql/
│   │   ├── select.mdx
│   │   ├── where.mdx
│   │   ├── order-by.mdx
│   │   ├── limit.mdx
│   │   └── comentarios.mdx
│   ├── pandas/
│   │   ├── _category_.json
│   │   └── dataframe.mdx
│   ├── openpyxl/
│   │   └── _category_.json
│   ├── numpy/
│   │   └── _category_.json
│   ├── scipy/
│   │   └── _category_.json
│   ├── matplotlib/
│   │   └── _category_.json
│   ├── seaborn/
│   │   └── _category_.json
│   ├── sqlalchemy/
│   │   └── _category_.json
│   ├── sqlite3/
│   │   └── _category_.json
│   ├── mysql-connector-python/
│   │   └── _category_.json
│   ├── psycopg/
│   │   └── _category_.json
│   ├── requests/
│   │   └── _category_.json
│   ├── httpx/
│   │   └── _category_.json
│   ├── json/
│   │   └── _category_.json
│   ├── r/
│   │   └── _category_.json
│   ├── power-bi/
│   │   └── _category_.json
│   └── tableau/
│       └── _category_.json
├── desarrollo-web/index.mdx
└── ia/index.mdx

src/
├── content/             # Áreas, fichas SQL e índice de búsqueda
├── components/          # Fichas y navegación entre áreas
├── css/custom.css       # Tema oscuro y estilos de documentación
├── lib/search.ts        # Búsqueda local, sin servicios externos
├── pages/               # Biblioteca inicial
└── theme/SearchBar/     # Buscador con teclado y carga diferida del índice
~~~

Análisis de datos, Desarrollo web e IA se eligen desde el encabezado.
El sidebar de cada área muestra solamente sus temas y conceptos.
Análisis de datos se organiza en este orden:

- Excel.
- Power Query.
- SQL, con sus conceptos.
- Tablas y archivos: Pandas y openpyxl.
- Cálculo científico: NumPy y SciPy.
- Visualización: Matplotlib y Seaborn.
- Conexiones SQL: SQLAlchemy, sqlite3, mysql-connector-python y psycopg.
- Peticiones y formatos: requests, httpx y json.
- R.
- Power BI.
- Tableau.

Todos los grupos y secciones aparecen contraídos al abrir la página, incluido SQL
aunque contenga la página actual. Cada herramienta conserva su propio desplegable;
SQL tiene cinco conceptos y Pandas incluye un primer apunte de DataFrame;
las demás herramientas todavía están sin apuntes.
Pulsar un grupo o una sección despliega o contrae su contenido, sin abrir una página.
Se navega al pulsar un concepto. La agrupación y el orden se definen en
src/content/catalog.ts y sidebars.ts los consume; las carpetas y las rutas de los
apuntes se mantienen.
Desarrollo web e IA tienen su espacio preparado, todavía sin conceptos.

Los iconos se importan individualmente de React Icons (`latest`). Lucide se usa
para la interfaz y los grupos; Simple Icons, Phosphor e Ionicons aportan los logos.
Los SVG de React Icons se incluyen en la compilación y no se solicitan a una API.
La asignación del sidebar está en src/components/TopicIcon/index.tsx.
Power Query, Matplotlib, Seaborn, requests y httpx usan logos de sus fuentes
oficiales o de Devicon; Power BI usa el SVG del repositorio de Microsoft.
openpyxl usa el archivo aportado por el usuario, mostrando el símbolo junto al
nombre del menú. Estos siete archivos se guardan en static/img/topics;
las procedencias y licencias están en SOURCES.md y licenses/ dentro de esa carpeta.
Los SVG se optimizan y los PNG de requests y httpx se reducen a 64 píxeles;
se sirven desde el propio sitio.
Los símbolos oscuros de openpyxl y httpx llevan una base clara para conservar
su legibilidad sobre el fondo negro.
sqlite3, mysql-connector-python y psycopg usan los logos de SQLite, MySQL y
PostgreSQL respectivamente. SQL usa un icono genérico de base de datos.

El selector «Texto» del encabezado cambia el color de los textos destacados,
enlaces, iconos de interfaz y palabras clave del código: Azul, Violeta, Verde,
Ámbar, Cian, Fucsia, Rojo o Blanco. Los colores son vivos y saturados; el azul
es la opción inicial.
El fondo, los paneles y los bloques de código usan siempre negro puro (#000000).
El texto de lectura conserva sus tonos neutros; cadenas, números y comentarios
mantienen los colores de sintaxis Dark+ de VS Code.
La elección se guarda en este navegador y las antiguas paletas se convierten a
su color equivalente. Los colores se definen en src/css/palettes.css.

El encabezado permanece fijo y no hay footer. El contenido y el sidebar ocupan
el espacio restante de la ventana y tienen scroll independiente: cada panel
solo se desplaza cuando su contenido supera la altura disponible. Llegar al
final de un panel no desplaza el otro ni la página completa.

En móvil y tablet de hasta 996 píxeles, un selector de áreas comparte una sola
fila con inicio o menú, búsqueda y color. Los temas se abren en un diálogo con
enlace a inicio; en pantallas más anchas el sidebar permanece visible. El
encabezado crece con el texto y también usa el selector cuando sus áreas no
caben cómodamente. Se respetan las zonas seguras y la altura visible del
navegador. Los selectores se cierran con Esc o al elegir, devolviendo el foco.
Buscador y selectores tienen scroll interno cuando lo necesitan; las consultas
se ajustan al ancho disponible en celulares.

## Pruebas

El desarrollo sigue TDD: primero se escribe una prueba del comportamiento pedido
y se ejecuta sobre la versión actual para comprobar el fallo esperado; después se
implementa el cambio mínimo y se vuelve a ejecutar. La refactorización se realiza
con las pruebas en verde. Para cambios visuales se usan aserciones de comportamiento
y medidas del navegador; actualizar capturas no sustituye esas comprobaciones.

~~~sh
npm test
npm run typecheck
npm run typecheck:tests
~~~

La comprobación nativa adicional del dataset y el ejemplo pandas se ejecuta con
`npm run test:practice-data`. Requiere `python3` con pandas instalado; no instala
paquetes ni forma parte de las dependencias del sitio. Comprueba preparación,
reinicio, columnas, índice, precio numérico y resultado editorial con pandas real.

La suite de Playwright usa Chromium y siete tamaños: celular de 320 y 390 píxeles,
celular horizontal, iPad en vertical y horizontal, laptop y escritorio. Comprueba
navegación, resultados SQL, ausencia de desbordamientos, menús, búsqueda, selección
de color, persistencia, rotación y scroll independiente. Incluye búsqueda compartida,
cargas tardías, reintento, teclado y composición de texto. También comprueba
recientes y favoritos, guardado bloqueado o lleno y sincronización entre dos
pestañas. El catálogo se comprueba en portada y en páginas de área, incluyendo
despliegues independientes y selección de área sin navegar. Las fichas añaden
comprobaciones de compacidad en celular/laptop,
texto al 200%, copia real al portapapeles, resultados accesibles y las ocho paletas;
el encabezado añade vistas normales y ampliadas y el selector móvil de áreas.
Se conservan 102 referencias visuales, incluidas las vistas de DataFrame a tamaño
normal y con texto al 200% en los siete tamaños.

~~~sh
npx playwright install chromium
npm run test:ui:update
npm run test:ui
npm run test:ui:report
~~~

La primera ejecución con `test:ui:update` genera las referencias visuales en
tests/ui/__screenshots__; tras revisarlas, `test:ui` compara contra esas imágenes.
Los resultados JSON se guardan en test-results/results.json; las capturas de errores
y trazas, en test-results/artifacts. La suite compila en .ui-build y levanta su propio
servidor en el puerto 4173, sin usar el servidor de desarrollo del puerto 3000.
Para probar un servidor ya preparado, define PLAYWRIGHT_BASE_URL.

La salida de terminal usa puntos. Una comprobación global detecta si falta Chromium
antes de iniciar las pruebas; si es necesario, ejecuta `npx playwright install chromium`.
En local se detiene tras el primer fallo; el detalle queda en los informes HTML/JSON.

La verificación final ejecuta las pruebas y los tipos, compara la UI contra las
referencias ya revisadas y mide producción frente al baseline del punto 1:

~~~sh
npm run verify:final
~~~

Guarda resultados en `benchmarks/verifications/` y una nueva medición en
`benchmarks/runs/`. No actualiza capturas ni usa el servidor de desarrollo.
`npm run verify:final -- --code-only` valida código y build, dejando explícitamente
pendientes navegador y rendimiento. Procedimiento y límites en
[benchmarks/README.md](benchmarks/README.md).

## Editar un concepto

La metadata común se edita en [src/content/concepts.ts](src/content/concepts.ts):
ID global, área, herramienta, título, descripción breve, etiqueta y orden.
Las rutas se derivan del ID, por ejemplo `analisis-de-datos/sql/select`.
El catálogo de las tres áreas, sus herramientas y grupos se define en
[src/content/catalog.ts](src/content/catalog.ts); el sidebar se genera desde él.
Las herramientas vacías conservan su lugar y solo los conceptos publicados
aportan enlaces, recuentos y entradas de búsqueda.

Los ejemplos, resultados, recordatorios y notas SQL se editan en
[src/content/notes/sql.ts](src/content/notes/sql.ts), vinculados a la metadata por ID global.
[src/content/sql.ts](src/content/sql.ts) conserva la API usada por los MDX.
El miniapunte pandas está en [src/content/notes/pandas.ts](src/content/notes/pandas.ts).
Ambas herramientas comparten la presentación compacta de
[ConceptNote](src/components/ConceptNote/index.tsx), con resultado inicialmente
cerrado; pandas muestra su índice como encabezado de fila, separado de los datos.
Los cuerpos de nuevas herramientas siguen la carpeta `src/content/notes/`;
el build los separa por herramienta para que la portada cargue solo su catálogo.
Cada variante incluye el ejemplo, una aclaración corta y el resultado opcional.
Las palabras clave de búsqueda están en
[src/content/search-keywords.ts](src/content/search-keywords.ts).

Para añadir un concepto, registra su metadata, cuerpo, palabras clave y página
MDX en la herramienta correspondiente. Las páginas SQL actuales siguen usando
`<SqlConceptCard conceptId="select" />`; también se admite su ID global.
Docusaurus obtiene título, descripción, orden y slug desde la metadata común,
así que esos campos no se repiten en el frontmatter de cada concepto.
`seoDescription` permite conservar una descripción para buscadores diferente
de la definición breve de lectura.

El índice de búsqueda y la navegación utilizan metadata, sin importar los
cuerpos ni las tablas de todas las fichas.

El dataset `productos-basico@1` tiene una fuente tipada común en
[src/practice/datasets/rows/products.ts](src/practice/datasets/rows/products.ts).
Su manifiesto ligero contiene columnas y tipos; las filas se cargan por separado.
Los materializadores generan JSON y esquema para Python, y un plan de sentencias
con parámetros para SQLite. Cada preparación recibe sus propios bytes y esquema.
Precio permanece entero y no se añade una columna `id` a los ejemplos existentes.
La portada no carga los cuerpos ni el chunk de filas compartidas.
La página SELECT incluye el formato mínimo de referencia. SELECT y FROM se
explican juntos: una variante muestra todas las columnas y otra, varias columnas
concretas. Los ejemplos usan la tabla productos, con nombre, categoría y precio.

La portada tiene un campo de búsqueda. Acepta términos como «filtrar», «cómo
filtrar» o «qué es SELECT», sin distinguir acentos o mayúsculas. El campo y el
diálogo del encabezado comparten consulta, resultados y caché. El índice se
descarga al enfocar el campo o abrir el diálogo, una sola vez; un fallo permite
reintentar. Se muestran diez resultados por lote.

Ctrl K o ⌘ K abre el diálogo. Las flechas recorren resultados, Enter abre el
primero o el enlace enfocado y Esc cierra el diálogo conservando lo escrito.
Elegir un resultado limpia la consulta. Limpiar el campo recupera el contenido
de portada que permanecía oculto mientras se buscaba. La búsqueda no guarda
consultas ni envía datos a un servicio externo.

## Catálogo en portada y páginas de área

Debajo del buscador y los accesos personales aparece el catálogo del área activa,
con el mismo orden, grupos y logos del sidebar. Las filas se despliegan mediante
`details`/`summary` nativos; abrir SQL muestra sus cinco conceptos y pulsar un
concepto abre la ficha. Las herramientas vacías muestran «Sin apuntes todavía».
El catálogo usa el scroll de la página, sin crear otro panel desplazable.

En portada, las áreas del encabezado son botones de selección: cambian el catálogo
y conservan `/`, la consulta y los accesos personales. Cambiar de área contrae sus
categorías. La elección no se guarda y al volver a la portada comienza Análisis de
datos. Buscar y limpiar recupera el catálogo con sus despliegues previos.

En las fichas, los controles de área siguen siendo enlaces a sus páginas. Esas
páginas usan el mismo componente de catálogo, con despliegues independientes del
sidebar. Desarrollo web e IA permanecen vacías, sin contenido inventado. La metadata
está en `src/content/catalog.ts` y la presentación en `src/components/Catalog`.

## Recientes y favoritos

Al abrir una ficha se registra una visita, también desde una URL directa o el
historial del navegador. Los recientes conservan veinte conceptos sin duplicados;
revisitar mueve el concepto al principio. Abrir categorías no registra visitas.
La estrella junto al título guarda o quita un favorito sin mover el contenido.

La portada muestra hasta seis elementos por colección, con una acción para
desplegar el resto. Los favoritos conservan el orden de guardado y sus botones de
quitar mantienen el foco dentro de la sección; al vaciarla vuelve al buscador.
Al escribir se ocultan las colecciones, sin interferir con los resultados.
El diálogo vacío sugiere primero los recientes y después el resto del catálogo,
sin duplicados. Una consulta mantiene su ranking habitual.

Se guardan en `alldoc-recents-v1` y `alldoc-favorites-v1`, con `version: 1` e IDs
globales de la metadata; la paleta usa su clave independiente. Se validan datos,
fechas e IDs antes de usarlos. La inicialización no escribe ni borra colecciones.
Los cambios de otras pestañas actualizan únicamente su colección. Si el guardado
falla, la biblioteca continúa en memoria y muestra «Guardado en esta sesión».
No se añade ningún servicio externo ni dependencia para estas colecciones.

## Referencia de rendimiento y capturas

Para registrar el estado actual antes de implementar el rediseño del
[SDD](specs/alldoc-sdd.md):

~~~sh
npm run baseline
~~~

Compila producción en un directorio aislado, registra tamaños JS/CSS y capturas
en los siete tamaños, y mide las interacciones actuales en laptop y celular
emulado. Guarda las condiciones y la evidencia en una carpeta nueva de
benchmarks/runs/. Una ejecución parcial indica exactamente qué falta.
El procedimiento y las limitaciones de cada métrica están en
[benchmarks/README.md](benchmarks/README.md).

## Versiones latest

Las dependencias iniciales apuntan a la etiqueta latest de npm, no a betas ni
canaries. La instalación genera package-lock.json con las versiones resueltas.
Conserva ese archivo para reproducir la instalación con npm ci.

Para consultar e instalar otra vez las últimas versiones estables de todo el
stack y comprobar que siguen funcionando juntas:

~~~sh
npm run update:stack
~~~

Ese comando actualiza las dependencias directas a latest, guarda sus versiones
exactas y ejecuta tipos, pruebas y compilación. Si npm detecta incompatibilidades
entre paquetes, se detiene; no usa --force ni --legacy-peer-deps.

## Verificar

~~~sh
npm run typecheck
npm test
npm run build
~~~

Las pruebas verifican la búsqueda y ejecutan los ejemplos contra SQLite para
comprobar que los resultados enseñados son correctos.

La compilación produce el sitio estático en build/. Esta primera estructura
está pensada para revisión local; no incluye configuración de despliegue.
