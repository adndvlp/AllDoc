# SQL · punto 7: Datos → Editor → Resultado

Estado: punto 7 completado. Pasan 398 pruebas de código y la comparación final de 134 casos de navegador; una omisión prevista porque el modo modal no tiene separador. Tipos y builds aprobados. Las 34 imágenes revisadas se compararon sin actualizar referencias y conservan sus hashes.

El panel compartido presenta regiones colapsables en el orden Datos, Editor y Resultado. Se retiran las pestañas excluyentes. Resultado no se monta hasta iniciar una ejecución; luego aparece debajo del editor con la salida real, su estado y el aviso de revisión anterior cuando corresponde. «Ir al resultado» desplaza únicamente el cuerpo de práctica. No se añade otro modal para la salida.

La disposición interior se decide con el espacio útil del cuerpo: amplia a partir de 32 rem de ancho y 34 rem de alto; compacta por debajo de cualquiera de esos límites. Datos comienza abierto en la amplia y plegado en la compacta. Editor comienza abierto. Las decisiones manuales de apertura y la tabla elegida se conservan por workspace durante la sesión, también al alternar las dos ubicaciones de SQL. Una ejecución nueva abre Resultado; probar/restaurar código vuelve a abrir Editor.

Datos ofrece todas las entidades del esquema vivo, pero monta una sola tabla de vista previa, con hasta veinte filas, tipos, número de filas y claves primarias. «Ver esquema» abre la lista compacta de entidades y relaciones. Seleccionar una tabla cambia únicamente la inspección: no edita el código ni ejecuta una consulta. Las consultas conservan acceso al dataset completo `negocio-relacional@1`; pandas mantiene `productos-basico@1` y su DataFrame inicial.

SQLite inspecciona claves mediante `table_xinfo` y `foreign_key_list`, incluidas claves compuestas e implícitas. El contrato añade campos opcionales de claves y relaciones; el puente valida sus tipos, tamaños y correspondencia con las columnas locales sin exigir que existan en adaptadores anteriores. Las referencias a tablas aún no creadas siguen siendo representables. [PRAGMA de SQLite](https://sqlite.org/pragma.html).

Los mensajes DML informan las filas afectadas directamente por la sentencia; no cuentan efectos auxiliares de triggers ni reutilizan ese contador para DDL. La clasificación se obtiene del authorizer del parser y el recuento de `changes`, conservando los rechazos existentes. [Authorizer](https://sqlite.org/c3ref/set_authorizer.html), [changes](https://sqlite.org/c3ref/changes.html).

CodeMirror permanece montado al cerrar una región; se solicita una nueva medición cuando cambia su tamaño. El cuerpo del panel, el editor, la tabla seleccionada y los resultados usan scroll propio cuando desbordan. La altura del editor está acotada; no depende de crear un lienzo que ocupe todo el panel. El contenedor modal sigue usando `visualViewport` y los controles conservan su nombre accesible.

## TDD y comprobaciones

| Comprobación | Evidencia |
| --- | --- |
| Rojo de código | [red.log](sql-point-7/red.log): cuatro fallos funcionales por regiones, disposición interior, claves/relaciones y mensajes DML |
| Rojo del puente | [red-bridge.log](sql-point-7/red-bridge.log): el esquema antiguo aceptaba claves y relaciones mal formadas al ignorar esos campos |
| Rojo de navegador | [ui-red.json](sql-point-7/ui-red.json): un caso en celular; existe un tablist cuando el contrato exige regiones sin pestañas |
| Verde focalizado | [green-first.log](sql-point-7/green-first.log): 32 aprobadas, incluido renderizado con preset cliente real y SQLite WASM |
| Código completo | [native.log](sql-point-7/native.log): 398 aprobadas |
| Tipos | [Aplicación](sql-point-7/types-app.log) y [pruebas](sql-point-7/types-tests.log) aprobados |
| Build | [Aplicación](sql-point-7/build.log) y [runtime](sql-point-7/build-runtime.log) aprobados |
| Auditoría de producción | [production.json](sql-point-7/production.json): 313 páginas correctas y cero cuerpos de apuntes cargados por portada entre 38 assets de cuerpos |
| Casos nuevos | [ui-regions-green.json](sql-point-7/ui-regions-green.json): 27 aprobados en celular, iPad y laptop, sin omisiones ni fallos |
| Primera ejecución de regiones | [Diagnóstico recuperado](sql-point-7/ui-regions-trace-failures.json): tres fallos de la misma aserción de rotación; `textContent` concatenaba las líneas de CodeMirror. La lectura corregida con `innerText` conserva las comprobaciones de código completo y selección ejecutada; la reejecución pasó los 27 casos |
| Regresión afectada | [ui-regression-green.json](sql-point-7/ui-regression-green.json): 125 aprobados y una omisión prevista en celular/laptop; el caso de separador se omite solo en el modo modal |
| Recaptura de resultados | [ui-captures-green.json](sql-point-7/ui-captures-green.json): seis aprobados; las filas de negocio, SQLite y pandas quedan dentro del viewport después de usar «Ir al resultado» |
| Revisión visual completa | [visual-review.json](sql-point-7/visual-review.json): 34 imágenes revisadas y fijadas por hash (doce nuevas y 22 modificadas). Las otras 231 referencias previas permanecen iguales. A 320 px y 200% el cuerpo de práctica requiere scroll vertical para alcanzar Editor |
| Comparación final | [comparison.json](sql-point-7/comparison.json): 134 aprobados, una omisión prevista, cero fallos y cero casos inestables; sin actualizar capturas. [Regresión: 125 aprobados/una omisión](sql-point-7/ui-regression-compare.json) e [iPad: nueve aprobados](sql-point-7/ui-ipad-compare.json); los 34 hashes revisados permanecen iguales |
| Herramienta de medición | [measurement-tooling.log](sql-point-7/measurement-tooling.log): su prueba de datos pasa; los recorridos se adaptan a regiones, sin acreditar una nueva medición de rendimiento |

Los recorridos nuevos cubren orden y aparición de regiones, una sola vista previa, acceso a todas las tablas, esquema actualizado después de CREATE/DROP, reinicio, aperturas elegidas, selección de código, rotación, scroll de la práctica, revisiones, cero filas, DML/DDL, errores, pandas, 320 px al 200%, teclado virtual y cancelación.

La regresión anterior se adapta a la interacción nueva: abre regiones mediante sus controles, selecciona la entidad para inspeccionarla y distingue sus tablas de las tablas del resultado. Antes de ejecutar exige que no exista una región de salida, en lugar de buscar una pestaña vacía. Las comprobaciones de datos, mensajes, edición, foco, selección, borradores, recuperación y aislamiento se conservan. Las pruebas entre navegadores y el script de medición usan el mismo contrato visual; su ejecución global corresponde al punto 9.

## Cierre

`npm run test:ui:sql:regions:compare` terminó sin actualizar referencias: 125 aprobados y una omisión en celular/laptop; después nueve aprobados en iPad. Ambos JSON están archivados. La comprobación posterior de hashes confirma que se usaron las 34 imágenes revisadas y que ninguna otra referencia cambió.

La revisión detectó que las antiguas capturas de resultados de negocio, SQLite y pandas mantenían la tabla debajo del área visible; los casos comprobaban sus datos, pero la imagen no mostraba las filas. Solo esos tres recorridos se ajustan para usar «Ir al resultado», exigir la última fila dentro del viewport y esperar el guardado local. No cambia la implementación ni se eliminan comprobaciones de datos.

El JSON de la primera ejecución se sobrescribió accidentalmente al descubrir la regresión con `--list`. Se conservan los tres diagnósticos originales de `error-context.md` y `.last-run.json`. El [resultado compartido por el usuario](sql-point-7/ui-regions-first-user-report.json) confirma 24 aprobados y tres fallidos en 1.6 minutos; ese recuento no procede de un JSON original reconstruido. Las tres trazas contienen la versión anterior de la aserción, sin `useInnerText`. Los siguientes descubrimientos deben usar `--reporter=list` para no escribir informes. Las capturas nuevas esperan «Guardado local»; las de resultados usan la acción explícita «Ir al resultado» después de comprobar que la ejecución mantiene el foco en el editor.

No se modifica el completado de columnas; corresponde al punto 8. Tampoco se amplía el temario ni se habilitan motores de servidor. La compatibilidad y medición global del punto 9 siguen pendientes.
