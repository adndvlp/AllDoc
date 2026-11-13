# Punto 2: metadata y catálogo compartidos

Estado: completado. Refactor de las fuentes de datos sobre el stack existente.

El catálogo abarca Análisis de datos, Desarrollo web e IA. Conserva las 19 herramientas y los cinco grupos actuales; los conceptos publicados siguen siendo los cinco de SQL. Las áreas y herramientas vacías mantienen su estado actual.

## Cambios

- [concepts.ts](../../src/content/concepts.ts): IDs globales, títulos, descripciones, orden y slugs canónicos. La descripción SEO opcional conserva el texto previo de cada página.
- [catalog.ts](../../src/content/catalog.ts): definición única de áreas, herramientas y grupos, con pertenencia de conceptos derivada de la metadata.
- [catalog-sidebar.ts](../../src/lib/catalog-sidebar.ts): categorías contraídas, grupos sin navegación y enlaces exclusivamente a conceptos publicados.
- [search-index.ts](../../src/content/search-index.ts) y [search-keywords.ts](../../src/content/search-keywords.ts): índice para cualquier área, con contexto derivado del catálogo y palabras clave por ID global.
- [concept-front-matter.ts](../../src/lib/concept-front-matter.ts): parser de Docusaurus que suministra metadata a las páginas MDX, evitando repetirla en sus encabezados YAML.
- [sql.ts](../../src/content/sql.ts): cuerpos vinculados por ID global y adaptador que sigue admitiendo los IDs cortos de las páginas actuales. La consulta de la vista previa se comparte en un módulo mínimo.

La navegación y el índice de búsqueda no importan los cuerpos ni resultados de las fichas. El buscador sigue cargando su índice al abrirse. Su etiqueta inicial se deriva de las herramientas publicadas.

## Validación

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 28 pruebas aprobadas, incluidas las ocho consultas ejecutadas en SQLite |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción aislado | Aprobado, sin enlaces rotos |
| Diez rutas antes/después | Mismas rutas y mismo HTML normalizado |
| Contenido SQL antes/después | Mismas ocho consultas, resultados, aclaraciones, recordatorios, notas, orden y palabras clave |
| Catálogo genérico | Fixtures de Excel, React e IA verifican orden, contexto, IDs repetibles entre áreas y generación del sidebar |
| Datos inválidos | Rechazo de conceptos huérfanos e IDs duplicados de conceptos, áreas y categorías |
| Integración MDX | Títulos, descripciones, orden y slugs coinciden con la metadata, conservando contenido y opciones de la página |

La comparación de HTML elimina scripts, referencias a assets JS/CSS y comentarios de React antes de comparar. Los hashes y las rutas están en [point-2-html.json](point-2-html.json). También se comprueba que el CSS generado permanece idéntico.

La consulta `WHERE precio >= 1000` estaba en `main.245a617f.js` antes del refactor y quedó en `common.eead87aa.js`, compartido por las fichas, después. Esto verifica la separación del cuerpo respecto del bundle principal; no implica que el navegador nunca pueda precargar ese chunk.

Las compilaciones usan el mismo directorio generado de Docusaurus, `.docusaurus-verify`, para evitar cambios de IDs de Webpack causados por variar esa ruta. Los builds antes/después se guardaron temporalmente fuera del proyecto.

## Trazabilidad y límites

Commit de partida: `0e03a689551286597b2e2cbc929622723c14089f`.

Huella SHA-256 de las fuentes de la app tras el refactor: `7c402dc10c148b2ea3aefd8f66237bb7cf7d640245fa0bd87589426e19ac28ae`.

Esta evidencia cubre la estructura de datos, el build y la salida HTML/CSS. No se ejecutó una nueva sesión de Playwright en el entorno restringido; la comparación de HTML no sustituye una captura de navegador ni acredita tiempos de interacción. La referencia de capturas y tiempos del punto 1 se conserva intacta.
