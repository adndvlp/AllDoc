# Punto 6: fichas compactas y legibles

Estado: completado con TDD para las fichas (CA-14 a CA-17 y CA-25). La adaptación global del encabezado/sidebar sigue en el punto 7.

## TDD

Se escribieron seis casos de navegador antes de modificar la aplicación. Tras
aprobar la revisión de tipos se ejecutaron sobre la versión del punto 5. El fallo
rojo observado fue funcional: el bloque de código de SELECT tenía bordes interiores
de 1 px en sus cuatro lados, frente a los 0 px esperados para una envoltura única.

[point-6-red.json](point-6-red.json) conserva el fallo y la huella de la aplicación,
idéntica a la del punto 5. La ejecución del usuario abarcó la suite completa y se
detuvo en el primer fallo, según la configuración local. Los casos sin ejecutar o
interrumpidos de esa fase no se consideran aprobados.

La aserción de bordes se conserva. Para comprobar los saltos significativos del
código se leen las líneas de Prism y se unen con `\n`: el renderer usa elementos
de bloque y `br`, por lo que `textContent` del bloque entero no conserva esos saltos.
La simulación del 200% espera el tamaño computado del elemento raíz y del código
antes de medir el reflujo; conserva la exigencia de duplicar el tamaño del texto.
Las ocho paletas también esperan sus colores calculados antes de compararlos. El
selector conserva su comportamiento de vista previa abierta; la prueba lo abre
una vez, recorre las opciones y lo cierra con Esc. Los ajustes del recorrido y las
esperas no reducen los valores exigidos a la aplicación.

## Comportamiento implementado

- Una sola envoltura exterior por ejemplo, conservando el componente de código y
  su botón de copia. Se retiran el borde, el radio y el relleno duplicados del
  bloque interior; el fondo del código y de sus controles permanece negro puro.
- Código y aclaraciones de 0.875 rem, con interlineado relativo y menos relleno.
  Los ejemplos responden al ancho del contenedor y pasan a dos columnas cuando
  hay espacio; un solo ejemplo ocupa el ancho completo.
- Definición, ocho consultas, resultados, recordatorios y nota de LIMIT conservados.
  Los títulos de variantes son encabezados de segundo nivel debajo del título
  único de la ficha.
- Resultados nativos independientes, inicialmente cerrados. Las tablas mantienen
  encabezados semánticos y captions; cada contenedor tiene nombre accesible, foco
  de teclado y scroll horizontal limitado al resultado cuando sea necesario.
- Copia accesible por teclado, espacio reservado junto al código y objetivos de
  al menos 44 px. En dispositivos táctiles el control permanece visible.
- Tipografía relativa, ajuste de líneas y alturas naturales para reflujo y texto
  ampliado. Anterior/siguiente conserva sus rutas y alineación, con texto secundario.

## Validación

| Comprobación | Resultado |
| --- | --- |
| Fase roja de navegador | Fallo esperado por bordes interiores de 1 px |
| `npm test` | 49 aprobadas, incluidas las ocho consultas ejecutadas con SQLite |
| `npm run typecheck` | Aprobado |
| `npm run typecheck:tests` | Aprobado |
| Build de producción aislado | Aprobado |
| HTML estático de las cinco fichas | H1 único, variantes H2, captions únicos y regiones enlazadas con acceso por teclado |
| Fase verde de navegador | 218 aprobadas, 6 omisiones previstas, 0 fallos, 0 inestables |
| Capturas de SELECT, Comentarios y texto al 200% | 21 revisadas en siete tamaños |

Las pruebas nuevas comprueban las cinco fichas, una envoltura por ejemplo, fuente
legible, contenido esencial dentro del lector a 390×844 y 1280×800, apertura
independiente, tabla ancha controlada, copia real al portapapeles, rutas y alineación
de anterior/siguiente, texto al 200% y ocho paletas con contraste sobre negro.

Los seis casos nuevos pasaron en los siete proyectos. Las omisiones siguen siendo
las de rotación en laptop/escritorio y scroll independiente de lector/sidebar en
los cuatro tamaños con drawer. Las cinco fichas mantienen su contenido esencial
dentro del lector a 390×844 y 1280×800 con resultados cerrados; la navegación puede
quedar después. En tamaños menores u horizontales y con texto ampliado se permite
scroll para conservar el contenido.

Evidencia verde: [point-6-ui.json](point-6-ui.json), con resumen, estados por
proyecto, huellas de aplicación/pruebas y hashes de las 21 capturas revisadas.
Evidencia roja: [point-6-red.json](point-6-red.json). Vistas representativas:
[SELECT en celular](../../tests/ui/__screenshots__/celular/select.png),
[Comentarios en celular](../../tests/ui/__screenshots__/celular/comentarios.png) y
[texto ampliado en iPad](../../tests/ui/__screenshots__/ipad/select-texto-200.png).

Esta ejecución actualizó referencias visuales y las vistas indicadas se revisaron;
no es una segunda ejecución de comparación contra esas referencias. No se modificó
el baseline histórico del punto 1.

La fuente ampliada se simula en navegador para verificar reflujo; no acredita una
prueba física con el ajuste del sistema operativo ni Safari/iOS. Se mantiene el
encabezado actual hasta el punto 7. El entorno bloquea el servidor local, por lo
que las fases de navegador se ejecutan desde la terminal del usuario.

La revisión visual al 200% detecta solapamientos del encabezado en anchos como
1024 px y ajuste excesivo de etiquetas del sidebar de ancho fijo. Es una limitación
del shell existente, registrada para el punto 7; las pruebas de este punto verifican
el reflujo y acceso a las fichas y no acreditan CA-18 a CA-21 para toda la interfaz.

## Modern Web Guidance

Se consultaron las guías del checkout local, cuyo ejecutable no está presente.

- **form-factor-adaptation:** usé container queries para los ejemplos, siguiendo
  “Use container queries instead of viewport-width media queries for component layout”,
  y mantuve controles táctiles de 44 px.
- **respect-os-text-scale:** apliqué unidades relativas, interlineado sin unidad y
  alturas naturales, siguiendo “Test that text can be resized to at least 200%”.
  No se añade una dependencia del meta `text-scale` ni se fija un tamaño raíz nuevo.
- **responsive-table:** mantuve tablas semánticas y un contenedor desplazable con
  nombre y teclado: “Add a `tabindex="0"` attribute to the container”. Los resultados
  pequeños conservan su estructura de tabla, sin transformarlos en tarjetas.

Fuentes locales: [form-factor-adaptation](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/user-experience/form-factor-adaptation.md),
[respect-os-text-scale](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/accessibility/respect-os-text-scale.md),
[responsive-table](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/ui-atoms/responsive-table.md).
