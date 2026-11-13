# Punto 5: catálogo compacto en portada y páginas de área

Estado: completado. Catálogo de portada y páginas de área implementado y verificado para CA-01, CA-04 y CA-05, conservando CA-02 y CA-03.

## Comportamiento implementado

- La portada presenta buscador, accesos personales cuando existen y catálogo del área activa. Se sustituyen las tarjetas de áreas y los accesos exclusivos de SQL por las 19 herramientas y los cinco grupos del catálogo canónico.
- Las filas usan los logos del sidebar, separadores discretos y sangría. SQL muestra cinco conceptos; los grupos muestran sus herramientas como contexto secundario. Solo se enlazan conceptos publicados.
- Grupos y herramientas usan `details`/`summary` nativos, empiezan contraídos y se abren de forma independiente. Las herramientas vacías muestran «Sin apuntes todavía». Abrir SQL no navega; abrir WHERE conduce a su ficha.
- Las áreas del encabezado son botones con `aria-pressed` en la portada: cambian el catálogo conservando `/`, consulta y accesos personales globales. Cambiar de área remonta su catálogo cerrado; buscar/limpiar lo mantiene montado y conserva sus despliegues.
- La selección de área solo vive en memoria de la portada y se restablece al salir. Desde una ficha, los controles del encabezado siguen enlazando las páginas de área.
- Las tres páginas de área usan el mismo `Catalog`, sin duplicar su título principal. Desarrollo web e IA muestran un estado vacío breve. Los despliegues del contenido y del sidebar son independientes.
- El catálogo se adapta al ancho de su contenedor y permite reflujo de etiquetas largas. No tiene altura fijada ni scroll propio. Controles y enlaces tienen al menos 44 px de altura; el negro puro y el acento actuales se conservan.

## Validación

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 49 aprobadas; se ampliaron las aserciones de recuentos por área/grupo |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción aislado | Aprobado |
| HTML estático de portada y tres páginas de área | Un H1 por página, catálogo correcto, desplegables cerrados y cinco enlaces solo donde hay conceptos |
| `npm run test:ui:update`, ejecutado por el usuario | 176 aprobadas, 6 omisiones previstas, 0 fallos, 0 inestables |
| Capturas de portada, catálogo y áreas | 21 revisadas en siete tamaños |

Se añadieron cuatro casos E2E: catálogo completo cerrado y navegación, cambio de área con búsqueda/accesos conservados, páginas de área con sidebar independiente y áreas vacías, y recuperación de despliegues al limpiar sin introducir un scroller. Se adaptaron las pruebas existentes que usaban los accesos directos sustituidos por el catálogo. Las rutas, los ejemplos SQL y las claves de almacenamiento permanecen iguales.

Las pruebas de recuentos incluyen conceptos de las tres áreas y verifican que los grupos vacíos no inflen el total. El componente no importa los cuerpos ni resultados SQL.

La suite se ejecutó desde la terminal del usuario porque el entorno bloquea el servidor local (`listen EPERM`). Se revisó el informe JSON: los cuatro casos nuevos pasaron en los siete proyectos y las pruebas existentes también pasaron. Las seis omisiones son las previstas: rotación en laptop/escritorio y scroll independiente de lector/sidebar en los cuatro tamaños con drawer.

Se revisaron `inicio.png`, `catalogo.png` y `area.png` en los siete tamaños. El catálogo conserva logos, negro puro, acento saturado y reflujo de nombres largos. Los grupos quedan cerrados al entrar, y las capturas desplegadas muestran navegación y estado vacío dentro de la jerarquía. En celular y horizontal, el encuadre puede empezar más abajo tras desplazar el contenido para alcanzar el control pulsado; el encabezado permanece fijo. Las imágenes corresponden al viewport, no a toda la página.

Evidencia duradera: [point-5-ui.json](point-5-ui.json), con resumen de ejecución, estados por proyecto, huellas de la app/pruebas y hashes de las 21 capturas revisadas. Vistas representativas: [portada móvil](../../tests/ui/__screenshots__/celular/inicio.png), [catálogo desplegado](../../tests/ui/__screenshots__/ipad/catalogo.png) y [página de área](../../tests/ui/__screenshots__/escritorio/area.png).

Esta ejecución actualiza referencias visuales y las vistas indicadas fueron revisadas; no es una segunda ejecución de comparación contra esas referencias. Se usa Chromium en siete tamaños emulados, sin acreditar una prueba física en Safari/iOS. Las fichas y el encabezado compacto se abordan en los siguientes puntos. Los baselines históricos permanecen intactos.

## Modern Web Guidance

Se consultaron las guías del checkout local, ya que falta su ejecutable y el entorno no puede descargarlo del registro.

- **content-first-noise-reduction:** usé desplegables nativos, siguiendo “It starts closed”, y conservé el catálogo durante la búsqueda para recuperar sus expansiones. Se retiraron las tarjetas de presentación; el encabezado sigue fijo conforme a la preferencia del usuario.
- **form-factor-adaptation:** adapté el contexto secundario por ancho del catálogo, siguiendo “Use container queries instead of viewport-width media queries for component layout”. Mantuve controles de 44 px y etiquetas que se ajustan sin recortarse.

Fuentes locales: [content-first-noise-reduction](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/content-first-noise-reduction.md), [form-factor-adaptation](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/form-factor-adaptation.md).
