# Punto 3: búsqueda compartida en portada y encabezado

Estado: completado. La búsqueda de la portada y el diálogo global comparten la consulta, el índice preparado, sus resultados y la caché de carga.

## Comportamiento implementado

- Campo `type="search"` en la portada, sin enfoque automático al entrar. Sustituye el bloque grande de presentación. Las tarjetas y los accesos actuales permanecen montados y se ocultan mientras hay consulta, para recuperarlos al limpiar.
- Un solo diálogo global y un listener para Ctrl K/⌘ K. La consulta se conserva al abrir/cerrar y se limpia al elegir un resultado. Cerrar durante una carga no permite que su resolución reabra el diálogo.
- Índice diferido en el chunk `search-index`, cargado al enfocar o abrir. Una sola promesa durante la carga; normalización preparada una vez por índice y caché conservada al navegar entre páginas.
- Búsqueda por metadata y palabras clave, sin distinguir acentos o mayúsculas. Se ignoran auxiliares como «cómo», «qué» y «es», conservando `--` y `/*`.
- Ranking por título completo, prefijo y coincidencias, con desempate por el orden del catálogo. Resultados en lotes de diez y acción para mostrar más.
- Estados visibles de carga, coincidencias, consulta sin resultados, solo auxiliares y error con reintento. El campo permanece disponible durante la carga y conserva lo escrito.
- Navegación mediante flechas, Enter, enlaces y botón de envío; protección de Enter durante composición IME. Reintentar y mostrar más mantienen un foco útil.
- Anuncio del recuento tras una pausa breve de escritura; los resultados se actualizan inmediatamente. Las superficies no presentan dos listas activas mientras está abierto el diálogo.
- Diálogo ajustado al viewport visual, con controles táctiles de 44 px y contención de scroll. Se utiliza el comportamiento nativo de foco y Esc.

En el diálogo, el campo usa `type="text"` y `role="searchbox"`. Así el control de búsqueda del navegador no consume Esc para borrar antes de cerrar el modal. El campo de portada mantiene `type="search"`.

## Archivos principales

| Archivo | Responsabilidad |
| --- | --- |
| [search-store.ts](../../src/lib/search-store.ts) | Estado compartido, promesa, reintento, caché y paginación |
| [search.ts](../../src/lib/search.ts) | Preparación del índice, términos y ranking |
| [SearchProvider](../../src/components/SearchProvider/index.tsx) | Instancia del store y suscripción React compatible con SSR |
| [SearchDialog](../../src/components/SearchDialog/index.tsx) | Modal nativo único, atajo y viewport visual |
| [HomeSearch](../../src/components/HomeSearch/index.tsx) | Campo y resultados en portada |
| [SearchResults](../../src/components/SearchResults/index.tsx) | Estados, listas y acciones comunes |
| [Root.tsx](../../src/theme/Root.tsx) | Montaje único del provider y el diálogo |

La adaptación del selector de control en el script de baseline admite el nuevo `searchbox` del diálogo y el antiguo `type="search"`; mantiene el mismo criterio de disponibilidad DOM. La referencia histórica del punto 1 permanece intacta.

## Validación

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 35 aprobadas |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción | Aprobado |
| `npm run test:ui:update`, ejecutado por el usuario | 99 aprobadas, 6 omisiones previstas, 0 fallos, 0 inestables |
| Revisión visual | 21 capturas revisadas en siete tamaños |

Las seis omisiones corresponden a rotación en laptop/escritorio y a la prueba de scroll independiente de lector/sidebar en los cuatro tamaños que usan drawer. No corresponden a fallos del buscador.

Las pruebas de navegador comprueban carga diferida y petición única, consultas pedagógicas, transferencia al diálogo, Esc y restauración de foco, carga tardía, reintento tras aborto del recurso, ausencia de coincidencias, auxiliares, composición IME simulada, viewport visual reducido y scroll del fondo. Las pruebas de código cubren además ranking, paginación, suscripciones y un índice de mil entradas.

La salida de Playwright se hizo compacta mediante `dot`. Una comprobación global valida el arranque de Chromium antes de los proyectos y el modo local se detiene al primer fallo. El detalle completo permanece en los informes HTML y JSON.

Evidencia duradera: [point-3-ui.json](point-3-ui.json), con el resumen de ejecución, estados por proyecto, huella de la app y hashes de las capturas revisadas.

Capturas representativas: [portada móvil](../../tests/ui/__screenshots__/celular/inicio.png), [búsqueda en portada](../../tests/ui/__screenshots__/celular/busqueda-inicio.png) y [diálogo en escritorio](../../tests/ui/__screenshots__/escritorio/buscador.png).

## Modern Web Guidance

- **dialog:** conservé el modal nativo y su foco, sin una trampa adicional, siguiendo “Use the native `<dialog>` element”. El cierre exterior usa `closedby="any"` y una alternativa con coordenadas cuando falta esa propiedad; no cierra por pulsar huecos interiores.
- **ime-safe-enter-submit:** protegí el envío con “event.isComposing || event.keyCode === 229”, evitando abrir un resultado al confirmar una composición de texto.
- **form-factor-adaptation:** mantuve controles de “at least 44×44 on touch screens”, texto relativo y espacio para las zonas seguras; el diálogo también atiende cambios del viewport visual.

Fuentes locales: [dialog](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-components/dialog.md), [ime-safe-enter-submit](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/forms/ime-safe-enter-submit.md), [form-factor-adaptation](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/form-factor-adaptation.md).

## Alcance de la evidencia

Las pruebas de navegador usan Chromium en siete tamaños emulados. El teclado móvil y la composición se simulan; no acreditan una prueba física en Safari/iOS. Esta ejecución actualiza referencias visuales intencionadas y sus capturas fueron revisadas.

Recientes y favoritos corresponden al punto 4. El catálogo desplegable en portada y la composición definitiva corresponden al punto 5; mientras tanto se conservan las tarjetas y accesos actuales bajo el buscador. Este punto no aporta una nueva medición de INP de campo.
