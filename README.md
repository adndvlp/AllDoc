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
│   │   └── _category_.json
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
salvo SQL, todavía están sin apuntes.
Pulsar un grupo o una sección despliega o contrae su contenido, sin abrir una página.
Se navega al pulsar un concepto. La agrupación y el orden se definen en sidebars.ts;
las carpetas y las rutas de los apuntes se mantienen.
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

En móvil y tablet de hasta 996 píxeles, las áreas permanecen como pestañas en el
encabezado y los temas se abren desde el menú. En pantallas más anchas el sidebar
permanece visible. Se respetan las zonas seguras del dispositivo y la altura
visible del navegador. Buscador y selector de color tienen scroll interno cuando
lo necesitan; las consultas se ajustan al ancho disponible en celulares.

## Pruebas

~~~sh
npm test
npm run typecheck
npm run typecheck:tests
~~~

La suite de Playwright usa Chromium y siete tamaños: celular de 320 y 390 píxeles,
celular horizontal, iPad en vertical y horizontal, laptop y escritorio. Comprueba
navegación, resultados SQL, ausencia de desbordamientos, menús, búsqueda, selección
de color, persistencia, rotación y scroll independiente. Genera cinco capturas por tamaño.

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

## Editar un concepto

Edita src/content/sql.ts. Cada ficha tiene una definición breve, una o varias
formas de hacer algo y una idea para recordar. Cada variante incluye el ejemplo,
una aclaración corta y el resultado opcional.

Las páginas MDX y el buscador reutilizan esas fichas.
Para añadir una ficha nueva, agrega sus datos y una página MDX en la carpeta SQL.
La página SELECT incluye el formato mínimo de referencia. SELECT y FROM se
explican juntos: una variante muestra todas las columnas y otra, varias columnas
concretas. Los ejemplos usan la tabla productos, con nombre, categoría y precio.

El buscador acepta términos como “filtrar” y consultas sin acentos. Se abre con
Ctrl K o ⌘ K. El índice se descarga al abrirlo.

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
