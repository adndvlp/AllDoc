# Punto 7: encabezado compacto y paneles independientes

Estado: completado con TDD para CA-18 a CA-21 en Chromium emulado. La ejecución
verde terminó sin fallos y se revisaron las capturas de los siete tamaños.

## Fase roja

Se escribieron seis casos en [header.spec.ts](../../tests/ui/header.spec.ts)
antes de modificar componentes o estilos. El [plan inicial](point-7-plan.json)
conserva las huellas de aplicación y prueba anteriores a la implementación.

El usuario ejecutó el primer caso en celular y falló por la ausencia del botón
«Elegir área: Análisis de datos». La huella de aplicación coincidía exactamente
con la entrega del punto 6. El informe solo registra ese fallo funcional; el
mensaje adicional de detención corresponde al límite de un fallo configurado en
Playwright. Evidencia: [point-7-red.json](point-7-red.json).

El intento previo desde este entorno no cuenta como fase roja: `serve:ui` abortó
por límite de memoria antes de iniciar las pruebas. Un sondeo HTTP mínimo también
confirmó la restricción `listen EPERM: operation not permitted 127.0.0.1`.

## Implementación

- En móvil y tablet hasta 996 px, una sola fila con marca o menú, selector del
  área, búsqueda y color. El nombre del área permite reflujo y los controles
  conservan objetivos de al menos 44 px. En las fichas la marca se encuentra
  dentro del menú, como enlace a inicio.
- En escritorio se mantienen las tres áreas. Una container query cambia al
  selector cuando el ancho disponible resulta estrecho para el texto, incluido
  el texto ampliado. El catálogo y las rutas siguen siendo las fuentes comunes;
  se retira el antiguo registro de items de navbar que duplicaba estos controles.
- El encabezado tiene altura natural y un mínimo de 3.5 rem, más la zona segura.
  Flex asigna el resto de la ventana al lector y al sidebar. Un ResizeObserver
  comunica la altura real solo para colocar las ventanas de áreas y color;
  esa medida no controla la altura del layout ni depende del scroll.
- El menú de temas usa un diálogo nativo distinto del sidebar de escritorio.
  Tiene cierre explícito, Esc, cierre exterior y enlace a inicio. El navegador
  contiene el foco y lo devuelve al botón que abrió el menú. Los cambios de ruta
  y de composición cierran el menú y retiran la capa modal.
- Áreas y color conservan details/summary. Comparten cierre con Esc, selección,
  pulsación exterior, cambio de ruta y apertura del buscador. Elegir una opción
  devuelve el foco; elegir el color ya activo también cierra el selector.
  La paleta deja de permanecer abierta como vista previa, conforme a RF-15.
- El ancho del sidebar usa unidades relativas para dar espacio a las etiquetas
  al ampliar el texto. Se mantienen los scrolls independientes con overflow
  automático y el fondo negro puro, sin footer ni cambios en las ocho paletas,
  la sintaxis, el orden del catálogo o el contenido de los apuntes.

## Pruebas

Los seis casos nuevos cubren una fila compacta, selector accesible, teclado y
foco, consulta conservada, texto al 200%, controles sin solaparse, sidebar legible,
menú modal, scroll del menú sin desplazar el apunte, rotación con el menú abierto,
límites del lector y ausencia de desplazamiento artificial cuando todo cabe.

Los recorridos existentes se adaptaron al selector y al enlace a inicio dentro
del menú, conservando sus aserciones de contenido, persistencia y navegación.
La prueba de ocho paletas abre el selector antes de cada elección y comprueba
su cierre. Se mantiene la cobertura de visualViewport reducido por teclado,
scroll del buscador y desplazamiento independiente del sidebar.

La pulsación exterior se dirige al borde libre del encabezado, para no intentar
pulsar un título cubierto por el propio desplegable. La medición al 200% espera
el tamaño raíz, el crecimiento del encabezado y dos frames de reflujo antes de
elegir la composición visible. No se rebajan las medidas exigidas.

| Comprobación | Resultado |
| --- | --- |
| Fase roja funcional en celular | Fallo esperado: selector ausente |
| `npm test` | 49 aprobadas |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción aislado | Aprobado |
| HTML estático de SELECT | Selector y búsqueda presentes, footer ausente |
| Descubrimiento de pruebas UI | 266 casos en seis archivos y siete tamaños |
| Primer intento verde | 7 aprobadas; 1 fallo en la expectativa de foco de la prueba; ejecución detenida |
| Segundo intento verde | 36 aprobadas; seis casos del encabezado aprobados en celular pequeño; fallo en el conteo global antiguo de diálogos |
| Fase verde completa | 260 aprobadas, 6 omisiones previstas, 0 fallos, 0 inestables |
| Revisión visual del shell | 39 referencias inspeccionadas en los siete tamaños |

Las huellas previas a la ejecución verde y las comprobaciones locales están en
[point-7-pre-green.json](point-7-pre-green.json). El usuario ejecutó:

```sh
npm run test:ui:update
```

El [informe verde](point-7-ui.json) conserva resultados de los 38 casos en los
siete proyectos, huellas de aplicación y pruebas, omisiones y hashes de las
referencias revisadas. La aplicación y las pruebas coinciden con las huellas
previas a esa ejecución. Los seis casos nuevos del encabezado pasaron en los
siete proyectos; los casos de menú y rotación redimensionan la ventana para
ejercitar el modo compacto y la transición a escritorio. Las seis omisiones
permanecen en los casos anteriores de rotación
para equipos sin pantalla táctil y scroll de sidebar de escritorio para tamaños
con drawer. Los casos nuevos verifican el scroll del menú móvil por separado.

Se revisaron los encabezados normal y al 200%, menú de temas, paleta y buscador
en siete tamaños, además del selector de áreas en los cuatro tamaños compactos:
39 referencias. La inspección usó mosaicos de regiones relevantes y originales,
sin modificar las referencias. Las regiones inspeccionadas y los hashes de los
archivos originales quedan identificados
en el informe. El sidebar al 200% conserva etiquetas legibles, incluido Power
Query, en iPad horizontal, laptop y escritorio.

La suite dejó 88 referencias generadas, actualizadas o aceptadas. La ejecución
con --update-snapshots valida las aserciones, pero no constituye una segunda
comparación independiente contra las referencias actualizadas. La revisión
visual complementa esas aserciones; el baseline histórico del punto 1 permanece
intacto. Ejemplos: [encabezado móvil al 200%](../../tests/ui/__screenshots__/celular/encabezado-texto-200.png),
[menú móvil](../../tests/ui/__screenshots__/celular/menu.png) y
[sidebar ampliado](../../tests/ui/__screenshots__/ipad-horizontal/encabezado-texto-200.png).

La ampliación del texto y el teclado se simulan en Chromium. No equivalen a una
comprobación física de Safari/iOS ni del ajuste del sistema operativo. La
validación global y las mediciones finales corresponden al punto 8.

## Revisión del primer intento verde

El [primer informe](point-7-first-ui.json) registra el fallo después de
Shift+Tab desde el primer enlace del menú. La traza conserva el diálogo abierto
como modal; las aserciones previas de apertura y scroll independiente pasaron.
El caso exigía que activeElement permaneciera siempre dentro del diálogo,
incluido el límite de navegación hacia atrás.

Esa condición confundía la exclusión del documento de fondo con un ciclo interno
estricto. El [modelo de navegación secuencial HTML](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation)
permite transferir el foco a la interfaz del navegador al agotar los destinos.
El [modelo de activeElement](https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement)
también contempla devolver body cuando el área enfocada es el documento. No se
añade un manejador de Tab a la aplicación para cambiar ese comportamiento nativo.

La prueba ahora exige el estado modal real, impide alcanzar controles del fondo
con Shift+Tab y prueba que intentar enfocar el botón de menú, el buscador o el
lector no saque el foco del diálogo. Conserva una comprobación de Tab y Shift+Tab
entre controles interiores, además de Esc, retorno del foco, scroll independiente
y navegación a inicio. La aplicación no se modificó para esta corrección.

Las capturas parciales de selector de áreas y encabezado al 200% en 320 px se
revisaron: los controles caben en una fila y el área se ajusta a dos líneas al
ampliar. La ejecución final completó los demás tamaños y casos, como consta en
el informe verde.

## Revisión del segundo intento verde

El [segundo informe](point-7-second-ui.json) registra 36 pruebas aprobadas,
incluidos los seis casos nuevos del encabezado en celular pequeño. El fallo se
produce en la última aserción del primer caso del buscador, después de comprobar
carga diferida, consulta, navegación por teclado y reutilización del índice.

La aserción antigua contaba todos los elementos dialog del documento y exigía
uno. Con el menú móvil nativo ahora hay dos elementos: el buscador abierto y
el menú cerrado. La prueba se acota al buscador para conservar la garantía de
una sola instancia, y exige también que haya un único diálogo abierto. Se
revisaron los demás selectores de las pruebas y del recorrido de medición; no
hay otra aserción que exija un solo diálogo global. No se cambió la aplicación.

## Modern Web Guidance

Se consultaron las guías del checkout local, cuyo ejecutable no está disponible.

- [respect-os-text-scale](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/accessibility/respect-os-text-scale.md):
  «Test that text can be resized to at least 200%». Unidades relativas, altura
  natural y comprobaciones de reflujo, sin fijar un tamaño raíz nuevo.
- [form-factor-adaptation](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/form-factor-adaptation.md):
  «Use container queries instead of viewport-width media queries for component layout».
  El encabezado cambia según su espacio; se conserva 996/997 px para el shell.
- [navigation-drawer](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-components/navigation-drawer.md):
  «use a `<dialog>` element opened with `showModal()`». El drawer es exclusivamente
  modal y el sidebar de escritorio sigue siendo un panel distinto. Se conserva
  el contenido de temas provisto por Docusaurus.
- [viewport-aware-dropdowns](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-atoms/viewport-aware-dropdowns.md):
  se acotan los selectores al área visible. Se mantienen disclosures nativos y
  posición con CSS y altura observada, sin añadir APIs de anclaje ni dependencias.
