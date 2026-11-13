# Punto 4: recientes y favoritos locales

Estado: completado. Recientes y favoritos locales implementados y verificados para CA-10 a CA-13.

## Comportamiento implementado

- Un provider de biblioteca personal montado una vez en `Root`, con un store externo y snapshot inicial vacío compatible con SSR. Lee ambas claves antes de permitir escrituras; los efectos repetidos no duplican visitas.
- Recientes por activación de ruta reconocida, incluyendo entrada directa, recarga y navegación por historial. Cambiar consulta/hash o desplegar categorías no registra visitas. Máximo veinte, sin duplicados; revisitar mueve al principio. Fechas descendentes con desempate estable por ID.
- Estrella de 44 px junto al único título de cada ficha, con estado `aria-pressed`, nombre accesible y foco conservado. La reserva de espacio para el aviso evita desplazar el contenido al cambiar el estado de guardado.
- Accesos de recientes y favoritos debajo del buscador de portada. Hasta seis por colección y expansión dentro de la misma sección. Favoritos en orden de inserción, enlace y botón de quitar separados; el foco pasa al siguiente botón o al campo al vaciar la sección.
- El diálogo sin consulta coloca recientes primero y completa con conceptos publicados sin duplicados. Recibir datos de otra pestaña no reordena enlaces de un diálogo abierto; se aplican en la siguiente apertura o al limpiar la consulta. Las consultas conservan su ranking.
- Claves versionadas `alldoc-recents-v1` y `alldoc-favorites-v1`, separadas de la paleta. Validación de estructura, versión, IDs y fechas; corrupción aislada por colección. Las referencias retiradas se filtran al leer y se limpian en la siguiente escritura de su colección.
- Fallos de lectura o escritura mantienen una biblioteca en memoria con «Guardado en esta sesión» después de una acción. No se sobrescribe una colección que no pudo leerse. Tras una cuota temporalmente llena se puede volver a persistir en la siguiente acción.
- Sincronización por eventos `storage`, solo sobre la clave afectada y sin escrituras de respuesta. Quitar una clave o vaciar el almacenamiento se refleja en la otra pestaña. Última escritura recibida de una clave prevalece.

El código usa metadata global para cualquier área/herramienta; no añade conceptos ni reordena el catálogo. La composición definitiva del catálogo y las fichas corresponde a los puntos siguientes.

## Validación

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 49 aprobadas |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción aislado | Aprobado |
| `npm run test:ui:update`, ejecutado por el usuario | 148 aprobadas, 6 omisiones previstas, 0 fallos, 0 inestables |
| Revisión visual | 14 capturas de ficha y colecciones revisadas en siete tamaños |

Las pruebas de lógica usan treinta conceptos de tres áreas para comprobar el límite de veinte, fechas, revisitas, deduplicación, claves independientes, corrupción, almacenamiento bloqueado/lleno, sincronización y sugerencias. La expansión por encima de seis no puede recorrerse con el contenido publicado actual, que tiene cinco conceptos; no se añaden fichas ficticias al sitio para esa comprobación.

Dos pruebas ejecutan los módulos tras transformarlos con el preset cliente real de Docusaurus. Verifican guardar/recargar y sugerencias con duplicados: la configuración `loose` convierte expansiones de iterables en concatenaciones de arrays. Se usa `Array.from` para colecciones `Set` y valores de `Map`, evitando introducir el iterable como un elemento del array.

Las nuevas pruebas de navegador cubren rutas directas/historial/recarga, categorías sin visitas, teclado y foco al quitar favoritos, persistencia, datos dañados o retirados, fallos de lectura/escritura y eventos entre dos páginas reales del mismo contexto. Se incluye una captura de portada con ambas colecciones pobladas, además de las seis vistas existentes.

Este entorno impide abrir el servidor local (`listen EPERM`); la suite se ejecutó desde la terminal del usuario. Se revisaron el informe JSON y las capturas guardadas. Las seis omisiones corresponden a rotación en laptop/escritorio y al scroll independiente del lector/sidebar en los cuatro tamaños con drawer. Los siete casos nuevos de biblioteca personal pasaron en los siete proyectos, junto con las pruebas existentes.

Evidencia duradera: [point-4-ui.json](point-4-ui.json), con el resumen de ejecución, estados por proyecto, huellas de la app y de las pruebas, y hashes de las capturas revisadas. Capturas representativas: [colecciones en celular](../../tests/ui/__screenshots__/celular/colecciones.png), [colecciones en iPad](../../tests/ui/__screenshots__/ipad/colecciones.png), [colecciones en escritorio](../../tests/ui/__screenshots__/escritorio/colecciones.png) y [estrella en la ficha](../../tests/ui/__screenshots__/celular/select.png).

Las capturas conservan negro puro y acento saturado, título único y estrella alineada. Las filas pasan de una columna en celular a dos o tres según el espacio disponible. Las imágenes corresponden al viewport inicial; en pantallas pequeñas y horizontales hay elementos debajo del encuadre que las pruebas alcanzan mediante scroll. Esta ejecución actualiza referencias visuales y se revisaron las vistas de ficha y colecciones; no constituye una comparación adicional posterior contra esas referencias.

La suite usa Chromium en siete tamaños emulados, sin acreditar una prueba física en Safari/iOS. La tipografía y la composición definitiva se ajustarán en los puntos siguientes. El baseline histórico del punto 1 permanece intacto.

## Modern Web Guidance

Se consultaron los archivos del checkout local; el ejecutable declarado por la habilidad no está presente y no hay acceso al registro para descargarlo.

- **natural-interactions:** usé botones para acciones y enlaces para abrir conceptos, con foco visible y controles de 44 px: “Use `<button>` for actions and `<a>` with an `href` for navigation”. Quitar un favorito devuelve el foco a un control que sigue disponible.
- **dark-mode-toggle:** apliqué su tratamiento de persistencia a las colecciones, capturando errores de acceso y escuchando cambios externos: “handle `window`'s `storage` event to stay in sync”. Se conserva el modo oscuro y la paleta actuales; no se añade un selector de tema.

Fuentes locales: [natural-interactions](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/natural-interactions.md), [dark-mode-toggle](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-components/dark-mode-toggle.md).
