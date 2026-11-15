# Punto 8: aceptación global y rendimiento

Estado: completado. Pasan los 27 criterios del SDD, 192 pruebas de código, tipos,
build y 558 pruebas de UI con nueve omisiones previstas. Los 24 presupuestos de
rendimiento se aprobaron y se revisaron las 12 capturas nuevas de diagnóstico
y las cuatro trazas. Las 165 referencias visuales permanecen sin cambios.

La [aceptación consolidada](practice-point-8-green.json) reúne dos ejecuciones
compatibles sobre la fuente `eab186a574`: las mediciones aprobadas del
`2026-11-15T01-58-37-682Z-eab186a574` y la regresión UI corregida del
`2026-11-15T02-09-04-909Z-eab186a574`. Se comprobaron fuente actual, entorno,
navegador, versiones y hashes de las referencias y herramientas. El muestreador
no cambió entre ambas; se revisaron los cinco archivos de herramienta/pruebas
que corrigieron la entrega de rutas y habilitaron continuar solo con la UI.
Las muestras crudas se reevaluaron con el validador actual.

La ejecución de mediciones sigue identificada como parcial en su informe
original porque después falló la UI por el 404 del servidor. El informe de UI
sigue identificado como `ui-only-complete`, sin atribuirle tiempos que no midió.
La aceptación consolidada conserva esa procedencia explícita. Los puertos
efímeros y algunos hashes del build son distintos; no se afirma identidad de
todos los bytes publicados. Ambos inventarios cumplen el límite inicial.

## Resultado revisado

| Comprobación | Resultado |
| --- | --- |
| Código | 192 casos aprobados, incluidos SQLite WASM y Pyodide reales |
| Tipos y build | Aplicación, pruebas, runtime y 11 rutas publicadas aprobados |
| UI estricta | 558 aprobadas, 9 omisiones previstas, 0 fallos y 0 casos inestables |
| Tamaños | Los siete actuales, desde 320×568 hasta 1920×1080 |
| Referencias visuales | 165 hashes intactos; sin actualizar capturas ni ampliar tolerancia |
| Rendimiento | 24 combinaciones de acción/perfil/tamaño, 30 muestras cada una |
| Bundle inicial | +4921 bytes gzip en medición y +4922 en UI, frente al máximo de 5120 |
| Revisión | 12 capturas y cuatro trazas, con hashes y observaciones |

Los cambios de contexto tienen p95 de 32.5/32.4 ms para SQL/pandas en laptop y
99.8/96.5 ms en celular. Apertura/cierre preparados, escritura y sugerencias SQL
cumplen 100 ms; las sugerencias pandas cumplen 300 ms. Los tiempos detallados y
sus eventos observados están en la aceptación consolidada. No son INP de campo.

La primera apertura se conserva aparte: editor/motor SQL en laptop
160.5/260.5 ms y en celular 527.7/647.7 ms; pandas en laptop 114.7/7780.9 ms y
en celular 299.5/8461.8 ms. La VM de Python y sus paquetes no tienen el
presupuesto de una acción ya preparada. El filtro real se midió también por
separado: 48.2/46.4 ms en SQL y 48.8/63.2 ms en pandas, laptop/celular.

La [revisión visual y de trazas](practice-point-8-review.json) conserva tareas
largas de arranque, apertura fría y preparación entre muestras. En los cambios
móviles SQL ↔ pandas queda una tarea de 59 ms; las entradas de 50 ms exactos no
superan el umbral de investigación >50 ms. Se revisaron los Long Animation
Frames, estilos/layout y las reproducciones de contexto. No se observó una
tarea larga en las muestras preparadas de apertura/cierre, escritura o
sugerencias. La reproducción posterior no prueba la causa exacta de un valor
atípico de la medición original ni sustituye su presupuesto.

Firefox y WebKit no estaban instalados y sus pruebas no se ejecutaron. Esta
aceptación usa Chromium y emulación, sin acreditar Safari/iPad físicos. El
factor de CPU aplica a la página por CDP; no se presenta como ralentización
equivalente del Worker. Se conserva el alcance declarado del completado Python.

## Ejecución

Desde AllDoc:

```sh
npm run verify:practice
```

El comando comprueba Chromium primero. Después ejecuta los casos de código
`.test.ts` y `.test.mjs`, tipos de aplicación y pruebas, build de producción,
integridad del runtime, inventario inicial, mediciones y regresión UI estricta.
No actualiza las referencias visuales. Guarda salida compacta en terminal y
los detalles en `benchmarks/practice-verifications/<fecha>-<fuente>/`.

Construye y sirve la aplicación y el runtime en directorios temporales y puertos
efímeros, con hostnames separados. No reutiliza el servidor de desarrollo ni
sobrescribe `.runtime-build`. La suite UI utiliza ese mismo build de producción.
Un bloqueo impide validaciones simultáneas con esta herramienta. Las fuentes,
pruebas, herramientas y todas las referencias visuales se identifican por SHA-256
y deben permanecer iguales durante la ejecución.

Si un paso falla, se conserva un informe parcial y el proceso termina con código
distinto de cero. No se declara completa la aceptación a partir de pruebas no
ejecutadas. `--code-only` permite verificar código, tipos, build e inventarios
sin abrir navegadores o servidores; `--measure-only` omite únicamente la
regresión UI; `--ui-only` ejecuta código, tipos, build y UI sin repetir las
mediciones ni otros navegadores. Ninguno acredita por sí solo el punto completo.
Para reunir ejecuciones separadas se comprueban fuente, versiones, referencias
visuales y procedencia de las herramientas antes de evaluar la matriz global.

## TDD y recorrido de validación

- [Fases en rojo](practice-point-8-phases-red.json): faltaban las medidas
  independientes de bootstrap, borrador, dataset, inicialización e inspección,
  y las fases del SDK y paquetes Python.
- [Evaluación en rojo](practice-point-8-audit-red.json): faltaba exigir cuatro
  perfiles, treinta muestras, timestamps válidos y presupuestos separados.
- [Matriz en rojo](practice-point-8-matrix-red.json): faltaban la matriz PA-01
  a PA-27 y el lector de resultados UI anidados que conserva fallos y omisiones.

La [comprobación local sin navegador](../../benchmarks/practice-verifications/2026-11-14T22-33-52-034Z-1aa4fd443d/README.md)
pasó 185 casos de código, ambos controles de tipos, build e integridad del
runtime. El bundle inicial registra 182221 bytes gzip de JS/CSS frente a 177301
de la referencia previa a práctica: +4920 bytes, dentro de 5120. Esta ejecución
identifica las herramientas exactas que utilizó; modificaciones posteriores
requieren una nueva validación.

La prueba de navegador local se detuvo antes de ejecutar casos: Chromium termina
con `bootstrap_check_in ... Permission denied (1100)` en esta sandbox. No cuenta
como fallo funcional, fase roja de UI ni medición de rendimiento.

La [primera medición real](../../benchmarks/practice-verifications/2026-11-15T01-37-54-068Z-1aa4fd443d/README.md)
recogió los cuatro perfiles y las treinta muestras de cada acción. Pasaron 23
presupuestos; el cambio a pandas en celular registró p95 de 100.6 ms frente a
100 ms. Además, `PerformanceMeasure.toJSON()` no incluyó `detail` en Chromium:
faltaron los estados de las fases y el informe se conservó incompleto. No se
rellenan esos estados después de la ejecución ni se modifica el límite.

Las [dos regresiones en rojo](practice-point-8-regression-red.json) reproducen
la pérdida de `detail` y la espera innecesaria del borrador ya validado en
memoria mientras se dispone la VM anterior. El lector ahora copia las
propiedades de las medidas explícitamente, también en Workers. El contexto
publica su borrador preparado de inmediato y sigue en fase de carga, sin
permitir completar o ejecutar sobre el motor anterior. Una edición durante
esa espera se conserva al terminar de preparar el motor nuevo.

La [comprobación local corregida](practice-point-8-regression-green.json) pasa
187 casos de código, tipos, build e inventarios; falta repetir los tiempos en
navegador. Las primeras trazas cubrían apertura, escritura y sugerencias; la
reproducción corregida incluye también SQL ↔ pandas. Las muestras y trazas
anteriores se conservan como evidencia histórica de su cobertura real.

La [segunda medición](../../benchmarks/practice-verifications/2026-11-15T01-46-28-409Z-9a3941baa3/README.md)
ya conserva las fases y sus estados. Los contextos móviles registraron p95 de
116.4 ms para SQL y 115.3 ms para pandas; los otros 22 presupuestos pasaron.
Las trazas de contexto muestran trabajo de interfaz y layout durante la
navegación. La inspección y las pruebas identificaron notificaciones evitables:
generación y contexto se publicaban por separado, guardar el workspace anterior
notificaba al workspace activo y publicar valores idénticos creaba otro snapshot.

Las [pruebas de notificaciones en rojo](practice-point-8-notifications-red.json)
y de [apertura idempotente en rojo](practice-point-8-idempotence-red.json)
registran esos fallos antes de corregirlos. Ahora el cambio de contexto publica
un único snapshot coherente; se ignoran eventos de otros borradores y patches
sin cambios. El componente editorial deja el consumo de la sesión en el botón
«Probar», conservando su presentación y sus acciones accesibles.

La [comprobación local de estas correcciones](practice-point-8-notifications-green.json)
pasa 190 casos de código, tipos, build e inventarios. Sus tiempos de navegador
y la regresión visual continúan pendientes; los límites y las muestras previas
se conservan sin alteraciones.

La [tercera medición](../../benchmarks/practice-verifications/2026-11-15T01-58-37-682Z-eab186a574/README.md)
aprobó los 24 presupuestos con la fuente `eab186a574`. Los cambios de contexto
registraron p95 de 32.5/32.4 ms para SQL/pandas en laptop y 99.8/96.5 ms en
celular. Los 30 datos de cada acción, fases y trazas se conservan completos.
Firefox y WebKit no estaban instalados; sus casos no se ejecutaron. La
validación global se detuvo después, durante la regresión UI.

La [traza y captura del fallo de UI](../../benchmarks/practice-verifications/2026-11-15T01-58-37-682Z-eab186a574/ui-failure/)
conservan la respuesta 404 vacía a `/apuntes/analisis-de-datos`. El servidor de
verificación escogía el directorio de fichas, cuyo `index.html` no existe, y
descartaba el archivo hermano `analisis-de-datos.html`. Las [pruebas en rojo](practice-point-8-routes-red.json)
reproducen esa coexistencia y la falta de comprobación de rutas canónicas.
El resolvedor ahora prueba también el HTML hermano sin perder los límites del
build ni la prioridad de un índice existente.

La [comprobación corregida](practice-point-8-routes-green.json) pasa 192 casos de
código, tipos, build y las 11 rutas publicadas. La fuente de la aplicación
permanece idéntica a la que aprobó rendimiento; cambian el servidor y su
auditoría. La continuación con `--ui-only` deja los presupuestos pendientes en
su propia matriz: solo se reunirán con las mediciones previas después de
comprobar compatibilidad y revisar las capturas y trazas.

## Método de medición

Se utilizan cuatro combinaciones secuenciales: SQL y pandas en laptop
1280×800/CPU 1× y celular 390×844/CPU 4×. Cada perfil empieza en un contexto nuevo,
sin caché HTTP por CDP, sobre red local sin limitación artificial. El informe
registra navegador, versiones fijadas del stack, equipo y condiciones. El factor
de CPU se aplica a la página por CDP; no acredita un dispositivo físico ni una
ralentización idéntica del Worker.

Cada acción preparada conserva treinta muestras crudas desde el evento nativo
hasta observar el estado esperado y el siguiente `requestAnimationFrame`:

- Apertura y cierre: panel con el motor ya preparado, sin reiniciarlo.
- Escritura: una tecla real modifica el documento; no espera al completador.
- SQL: `SEL` y `SELECT productos.pre`, invocados con Ctrl+Space.
- pandas/Jedi: `import pandas as pd\npd.Da` y `productos["pre`, invocados con
  Ctrl+Space. Son las formas comprobadas, no inferencia Python universal.
- Cambio SQL ↔ pandas: termina al mostrar título, lenguaje y borrador correcto.
  El arranque de la nueva VM queda fuera de ese presupuesto. La búsqueda y la
  elección del destino se preparan antes de iniciar la ventana medida.

Los límites p95 son 100 ms salvo sugerencias pandas, con 300 ms. Se calcula el
percentil directamente de las treinta muestras; resúmenes favorables o
presupuestos incluidos en datos de entrada no pueden alterar el resultado.

La primera apertura registra por separado disponibilidad del editor y del
motor, solicitudes de editor/runtime/wheels, y fases con estado y duración.
Python distingue SDK, paquetes, preparación de datos y precalentamiento de
Jedi. La fase `python-data` incluye los helpers e imports, además del dataset.
Las marcas son acotadas a una entrada por fase y realm; no contienen código del
usuario, datos de tablas ni resultados. La ejecución de un filtro real se mide
aparte, sin exigir que cualquier programa termine en 100 ms.

`PerformanceObserver` registra Event Timing cuando existe, tareas largas y
Long Animation Frames cuando están disponibles. La ausencia de una entrada no
se interpreta como 0 ms. No se informa INP de campo. Una traza CDP por perfil
reproduce acciones después de las muestras, sin contaminar el presupuesto.
Las tareas y frames conservan su fase para revisión; obtener una traza no
equivale a investigar y aprobar una regresión.

El inventario compara JS/CSS inicial por página con la referencia
`2026-11-14T05-52-07-925Z-68412ecc98`. Sus archivos históricos no cambian. No se
compara la suma de chunks diferidos como si fuera descarga inicial, ni se
inventan latencias de práctica anteriores a la existencia del panel.

## Aceptación y revisión

La matriz exige casos realmente aprobados de código y UI para los 27 criterios,
con archivo, nombre y proyecto de cada evidencia. Exige los siete tamaños,
tipos, build, mediciones, bundle y referencias estables. Los casos fallidos,
interrumpidos o inestables no se convierten en aprobados. El estado automático
final es `ready-for-review`: quedan por revisar capturas y trazas antes de
cerrar el SDD.

En esta entrega esa revisión quedó completada en `practice-point-8-review.json`
y el cierre global en `practice-point-8-green.json`. Los resultados originales
de cada ejecución conservan su estado y alcance propios.

Además de Chromium, se intentan smoke tests reales de SQL y pandas en Firefox
y WebKit si sus ejecutables están instalados. Su ausencia se declara como
limitación; un navegador instalado que falla no se omite. Estos dos casos no
equivalen a la suite completa ni a una validación en Safari/iPad físicos.

Se continúa la guía local de rendimiento aplicada en los puntos anteriores:
[`identify-inp-causes.md`](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/performance/identify-inp-causes.md).
Las medidas de laboratorio se mantienen separadas de datos de campo; las APIs
de diagnóstico se inyectan solo en el navegador de verificación.
