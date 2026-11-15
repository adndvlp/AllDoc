# Compatibilidad — punto 2: práctica de escritorio

Estado: completado. Pasan veinte casos reales de Firefox/WebKit de escritorio,
218 pruebas de código, tipos de aplicación/pruebas y build. Se revisaron las
ocho capturas de diagnóstico. La [aceptación](browser-point-2-green.json)
conserva procedencia, casos originales, versiones, TDD e invariantes.

## Herramienta y TDD

La [fase roja](browser-point-2-runner-red.json) registra seis fallos funcionales
sobre la API declarada del runner, antes de implementar selección, bloqueo
previo al build y evaluación estricta de los resultados originales. Después
pasan las seis pruebas: un contador favorable no compensa casos ausentes,
omitidos, duplicados, interrumpidos, inestables o de un proyecto incorrecto.
Una ejecución filtrada no acredita el conjunto completo.

La [comprobación local](browser-point-2-local-green.json) pasa las 218 pruebas
de código, incluidas las diez nuevas de esta etapa.
Tres comprobaciones de CLI descubren veinte casos sin binarios disponibles,
reducen el recorrido corto a cuatro y permiten seleccionar un caso/motor.
Un proyecto de los tamaños futuros se rechaza antes del trabajo pesado.
El control de tipos de aplicación y pruebas está aprobado.

El [build local](../../benchmarks/browser-verifications/2026-11-15T03-23-17-648Z-a4baa35590/README.md)
compila app y runtime una vez, verifica sus paquetes fijados y audita las once
rutas publicadas. Conserva hashes de fuente, herramientas y las 165 referencias
Chromium. El modo utilizado, `--build-only`, no abre motores ni servidores.

No cambia código de la aplicación, el runtime o sus datos; tampoco dependencias,
la configuración Chromium ni sus referencias. Playwright instalado es 1.65.1.

## Casos de escritorio

| Casos por motor | Comportamiento comprobado |
| --- | --- |
| SQL-01 / PY-01 | Carga diferida, editor real, ausencia de ejecución automática y filtro sobre productos con columnas/números esperados |
| SQL-02 / PY-02 | Resaltado, escritura, deshacer/rehacer y salida de foco mediante Tab |
| SQL-03 / PY-03 | SELECT, productos y precio; Jedi DataFrame y columna precio; inserción exacta sin ejecutar |
| SQL-04 / PY-04 | Ejecución de la selección, error con archivo/línea y ejecución correcta posterior |
| SQL-05 / PY-05 | Ctrl+Enter respeta la preparación y no deja una ejecución pendiente; funciona una vez listo |

Se usan SQLite WASM, Pyodide, pandas y Jedi reales con el dataset existente.
Solo se retrasa la entrega real del frame en el caso del permiso del atajo;
no se sustituyen motores, sugerencias ni tablas. Los contextos son independientes
y no hay reintentos ni omisiones.

## Ejecución y resultados

```sh
npm run test:browser:smoke
npm run test:browser
```

El primer comando ejecuta cuatro casos; el segundo, veinte. Se puede repetir
solo uno con `npm run test:browser -- --project=webkit-escritorio --grep=PY-03`.

La comprobación de motores precede al build. Los servidores usan puertos
efímeros, orígenes separados y directorios temporales; no reutilizan el servidor
personal ni sobrescriben `.runtime-build`. Se reutilizan el resolvedor estático,
la entrega binaria y la CSP ya verificados. La terminal identifica caso/fase y
publica progreso cada quince segundos. Los resultados originales, versiones,
configuración, capturas adjuntas y trazas de fallos permanecen en cada informe,
sin depender de la siguiente ejecución de `test-results/`.

El [intento local](../../benchmarks/browser-verifications/2026-11-15T03-23-18-471Z-a4baa35590/README.md)
no pudo arrancar los motores dentro de la sandbox. El
[primer intento en terminal](../../benchmarks/browser-verifications/2026-11-15T03-24-55-073Z-a4baa35590/README.md)
encontró ambos ejecutables ausentes. Ninguno construyó ni inició servidores,
ni cuenta como fase roja funcional de la aplicación. Se solicitó reinstalar
Firefox/WebKit para la versión instalada antes de repetir el recorrido corto.

El [recorrido corto aprobado](../../benchmarks/browser-verifications/2026-11-15T03-26-10-438Z-a4baa35590/README.md)
ejecuta sus cuatro casos sin fallos ni omisiones: Firefox 159.0 y WebKit 27.2,
SQL y pandas. Fuente, herramientas y referencias permanecieron estables.
La [revisión de las cuatro imágenes](../../benchmarks/browser-verifications/2026-11-15T03-26-10-438Z-a4baa35590/review.json)
confirma tablas y controles legibles, sin solapamientos en 1280×800.

El [recorrido completo aprobado](../../benchmarks/browser-verifications/2026-11-15T03-31-51-126Z-a4baa35590/README.md)
ejecuta los veinte casos en 77,4 s de suite, con dos workers, sin fallos,
omisiones, reintentos o errores globales. Incluye su build de producción y
runtime, auditoría de rutas, versiones, configuración y resultados originales.
La fuente y todas las herramientas coinciden con los archivos actuales.

La [revisión de ocho capturas](../../benchmarks/browser-verifications/2026-11-15T03-31-51-126Z-a4baa35590/review.json)
confirma tablas, listas de sugerencias y controles legibles en ambos motores,
sin recortes. Son capturas de diagnóstico: no generan referencias del punto 4.
Las 165 referencias Chromium conservan los hashes anteriores a esta entrega.
La matriz de tamaños y el resto de comportamientos pertenecen al punto 3.

## Lectura multilínea y diagnóstico

El [primer recorrido completo](../../benchmarks/browser-verifications/2026-11-15T03-28-23-698Z-a4baa35590/README.md)
se detuvo en SQL-04 de Firefox antes de ejecutar la selección. El editor
mostraba las dos líneas correctas, pero la prueba leía `textContent`, que
concatena los bloques de línea. Se conserva el
[fallo y su causa](browser-point-2-reading-red.json). La lectura ahora usa
`innerText`, también para comprobar deshacer/rehacer y completar código Python
multilínea; conserva la expectativa del programa completo. No se modificó la app.

Otra expectativa de código reprodujo que el resumen destacaba un caso omitido
por la parada temprana antes del fallo real. Después de priorizar los casos
fallidos, pasan las siete pruebas del evaluador. Los controles de tipos pasan.
El [verde del caso aislado](browser-point-2-reading-green.json) registra SQL-04
aprobado en ambos motores antes del recorrido completo. La suite final de
218 pruebas de código también está aprobada con esa corrección.

No se encontró un defecto del producto que exigiera cambiar la aplicación.
El rojo/verde corresponde a la herramienta y a la lectura de las pruebas;
los casos de aplicación que ya pasaban se registran como cobertura adicional.
La suite Chromium completa y sus benchmarks no se repitieron por estos cambios
exclusivos de prueba. La regresión global pertinente corresponde al punto 5.
