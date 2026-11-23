# SQL · punto 6: árbol y ubicación compartida

Estado: completado. Pasan 393 pruebas de código, tipos, build y comparación final de UI: 153 aprobadas y tres omisiones previstas. Revisadas 45 capturas entre nuevas y modificadas; sus hashes y otras 208 referencias permanecen intactos tras la comparación.

SQL usa los mismos 34 grupos y 153 conceptos en el catálogo y en los sidebars de Análisis de datos y Lenguajes. Las categorías solo despliegan; Definición es la primera hoja de cada grupo. Catálogos y grupos empiezan contraídos. Una ruta directa abre los ancestros del concepto SQL activo; se pueden volver a contraer manualmente sin navegar. Las demás herramientas conservan su comportamiento anterior.

Lenguajes se añade como cuarta área y contiene únicamente SQL. Sus 153 rutas de presentación reutilizan los módulos de las fichas existentes. El breadcrumb y el área activa pertenecen a Lenguajes; cada documento emite un único canonical y `og:url` hacia Análisis de datos. Los enlaces de apartados, alternativas, NULL y paginación permanecen en la ubicación actual. Cambiar entre ambas áreas conserva el concepto, los parámetros y el fragmento.

La metadata, los resultados de búsqueda, favoritos y recientes conservan la identidad canónica. Alternar la ubicación del mismo concepto no crea otra visita. El resolver de práctica devuelve el mismo contexto y workspace `analisis-de-datos/sql` desde cualquiera de las dos rutas. La prueba de navegador confirmó la continuidad real de la instancia SQLite, la tabla creada, sus datos, el resultado previo y el borrador al cambiar de área. Tras recargar confirmó el borrador y una sola clave SQL en IndexedDB; la recarga no pretende conservar la VM anterior.

## TDD y comprobaciones

| Comprobación | Evidencia |
| --- | --- |
| Rojo funcional | [red.log](sql-point-6/red.log): cinco fallos por área, árbol, identidad, recientes y front matter aún ausentes |
| Primera fase verde | [green-first.log](sql-point-6/green-first.log): cinco casos nuevos aprobados |
| Código | [native.log](sql-point-6/native.log): 393 aprobadas, incluidas siete pruebas de navegación compartida |
| Tipos | [Aplicación](sql-point-6/types-app.log) y [pruebas](sql-point-6/types-tests.log) aprobados |
| Generación | [prepare.log](sql-point-6/prepare.log): 153 fichas compartidas, 306 rutas y las mismas 166 salidas SQLite |
| Build | [build.log](sql-point-6/build.log) aprobado |
| Auditoría estática | [production.json](sql-point-6/production.json): 313 páginas, un h1 por página, 153 rutas compartidas con canonical correcto y cero cuerpos cargados por portada entre 38 assets de apuntes |
| UI nueva | [ui-navigation-update.json](sql-point-6/ui-navigation-update.json): 16 aprobados en celular/laptop, sin omisiones, fallos, reintentos ni errores globales |
| Revisión visual nueva | [visual-review-new.json](sql-point-6/visual-review-new.json): diez imágenes revisadas con sus hashes; las 243 referencias previas permanecen intactas |
| Regresión interrumpida por localizador ambiguo | [ui-structure-search-failure.json](sql-point-6/ui-structure-search-failure.json): seis aprobados, un fallo y 149 casos sin ejecutar. La prueba de encabezado confundió WHERE con Subconsulta en WHERE al buscar una subcadena. Se ajustaron encabezado, colecciones y su equivalente entre navegadores para exigir el concepto exacto; se conserva la comprobación de consulta, foco y posición. Verde confirmado en la última regresión completa |
| Rojo de solapamiento en Comentarios | [ui-structure-comments-overlap.json](sql-point-6/ui-structure-comments-overlap.json), [captura del fallo](sql-point-6/comments-overlap-before.png): trece aprobados, un fallo y 142 sin ejecutar. El botón con etiqueta tapaba tres letras del recordatorio en celular de 390 px. Se amplía de 24 a 26 rem el umbral de la variante compacta existente; la prueba de letras, el contenido, su tamaño y el nombre accesible del botón permanecen intactos. Verde confirmado en el informe siguiente |
| Verde de Comentarios y expectativa antigua de sugerencias | [ui-structure-recents-failure.json](sql-point-6/ui-structure-recents-failure.json): veinte aprobados, incluido el caso de letras tapadas; un fallo y 135 sin ejecutar. Recientes, historial, recarga y orden de SELECT/WHERE pasaron. El fallo fue exigir seis sugerencias, la totalidad del catálogo inicial; el buscador conserva su paginación de diez. La prueba exige ahora diez enlaces, las dos rutas recientes al principio, unicidad, rutas canónicas y acceso a más resultados. Verde confirmado en la última regresión completa |
| Regresión completa con un escenario de altura obsoleto | [ui-structure-panels-failure.json](sql-point-6/ui-structure-panels-failure.json): 152 aprobados, tres omisiones previstas, un fallo y cero errores globales; todos los casos se ejecutaron o se omitieron expresamente. Los dieciséis nuevos volvieron a pasar. En laptop el sidebar de 34 grupos no cabía en la altura fija de 2400 px. Se ajustó únicamente el escenario de la prueba para medir el desbordamiento real, ampliar la altura necesaria y comprobar que ambos paneles caben antes del gesto; conserva las comprobaciones de scroll e independencia |
| Revisión visual de la regresión | [visual-review-regression.json](sql-point-6/visual-review-regression.json): 35 referencias anteriores modificadas y diez nuevas revisadas con hashes actuales; otras 208 referencias intactas. Incluye una nueva revisión de la captura móvil de Lenguajes tras compactar el botón |
| Comparación final | [ui-structure-compare.json](sql-point-6/ui-structure-compare.json), [estado y hashes](sql-point-6/status.json): mismos 156 casos, 153 aprobados y tres omisiones previstas; cero fallos, errores globales o reintentos. Las 45 referencias revisadas mantienen sus hashes, otras 208 siguen intactas y no se añadieron capturas durante la comparación |
| Escenario de paneles aprobado | [panels-fitting-dimensions.json](sql-point-6/panels-fitting-dimensions.json): el sidebar desbordaba siete píxeles con viewport de 2400 px. Al ajustar el escenario a 2409 px, ambos paneles tienen 2352 px de altura visible y de scroll, con scrollTop cero. Pasa la misma comprobación de ausencia de scroll |
| Regresión afectada descubierta | [ui-structure-discovery.log](sql-point-6/ui-structure-discovery.log): 156 casos en once archivos, completados en la comparación final |
| Referencias previas | [screenshots-before.json](sql-point-6/screenshots-before.json): 243 PNG registrados antes de actualizar capturas |

Los nuevos casos de navegador verificaron desplegables independientes, navegación directa/recarga, breadcrumbs, enlaces, canonical, favoritos, recientes, búsqueda sin duplicados y dialecto. También crearon una tabla real en SQLite, cambiaron de área mediante navegación SPA y comprobaron la misma instancia del runtime, datos, resultado y borrador; tras recargar comprobaron una sola clave SQL en IndexedDB. Incluyen entrada de área sin descargar editor/WASM y controles a 320 px con texto al 200%. Ese escenario ampliado usa reflujo y scroll vertical; ambas capturas de 200% se toman deliberadamente a 320 px, incluso en el proyecto laptop.

Las expectativas anteriores de SQL plano, tres áreas y todos los padres cerrados en una ruta activa se adaptaron al contrato del punto 6. Se mantienen los umbrales de capturas, las comprobaciones de scroll/foco y las condiciones de ejecución. La configuración de Firefox/WebKit sigue disponible; su ejecución y la actualización de sus referencias corresponden al punto 9.

La búsqueda «filtrar» admite dos resultados del temario completo: WHERE y Subconsulta en WHERE. El ajuste del localizador no cambia el algoritmo ni elimina coincidencias; las pruebas identifican WHERE por su título exacto y ruta canónica. Las capturas parciales no se aceptaron al producirse esos fallos; la revisión posterior de la ejecución completa se registra en `visual-review-regression.json`.

Las sugerencias sin consulta conservan la paginación de diez elementos ya comprobada en las pruebas de `search-store`; [las nueve pruebas del store pasan](sql-point-6/search-contract.log). El catálogo inicial solo tenía seis conceptos; la prueba de recientes todavía confundía ese total histórico con el tamaño de página. El ajuste no cambia recientes ni la búsqueda. El comando focalizado `test:ui:sql:structure` ejecuta ahora todos sus casos aunque encuentre un fallo (`--max-failures=0`), para reunir los problemas en un solo informe; no añade reintentos ni cambia las comprobaciones o el código de salida.

El árbol nuevo y el área añadida hacen que el breadcrumb de Comentarios ocupe dos líneas en celular. La ficha sigue cabiendo en el lector, pero su recordatorio alcanzaba la zona del botón flotante. La corrección usa el botón de 44 × 44 px en lectores menores de 26 rem, con el mismo nombre accesible «Practicar SQL»; evita tapar esas letras sin recortar contenido ni reducir tipografía. La revisión de capturas y la comparación final incluyen esta corrección.

## Cierre

`npm run test:ui:sql:structure` completó la comparación de los 156 casos afectados con las referencias revisadas y confirmó la corrección del escenario de altura. El comando se ejecutó sin la opción de actualizar capturas: se comprobaron las identidades de los casos y los hashes de las 253 referencias resultantes, sin cambios ni nuevas imágenes durante la comparación. El punto 6 queda cerrado.

Las tres omisiones corresponden al separador de práctica en modo modal de celular, la rotación de laptop y el scroll de sidebar de escritorio en celular. Sus escenarios aplicables sí se ejecutan en el otro proyecto. No se omite ningún caso nuevo de navegación SQL.

No se cambian el dataset, sus restricciones, los programas SQL, el layout del editor ni el autocompletado. El layout Datos → Editor → Resultado y las sugerencias de columnas pertenecen a los puntos 7 y 8.

Las categorías sin navegación y las rutas se apoyan en los contratos de Docusaurus: [sidebar items](https://docusaurus.io/docs/sidebar/items) y [routing](https://docusaurus.io/docs/advanced/routing). La identidad canónica y el uso de las dos áreas son decisiones del SDD.
