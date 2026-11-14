# Punto 5: aislamiento y SQLite WASM

Estado: completado. Motor, suite completa y comparación visual independiente
aprobados. pandas mantiene la ejecución pendiente.

## Comportamiento implementado

SQL ejecuta SQLite 3.54.1, paquete `@sqlite.org/sqlite-wasm@3.54.1-build1`,
con manifiesto fijado y comprobado contra el motor y el lockfile. Se cargan
SQLite, el frame y el Worker al abrir práctica, fuera del origen de AllDoc.
El editor y el borrador permanecen en la app.

«Ejecutar» y Ctrl/⌘+Enter usan la selección cuando existe; en otro caso ejecutan
el archivo. SQLite decide los límites de cada sentencia, incluidos comentarios,
cadenas y triggers: no se divide el programa por punto y coma. Se respetan
transacciones explícitas, resultados múltiples, columnas con cero filas, NULL,
texto vacío, valores mixtos y enteros grandes sin perder precisión.

Las mutaciones afectan solo a la base temporal. «Datos» y las sugerencias
reflejan el esquema inspeccionado, también tras un error con cambios previos.
Reiniciar restaura los tres productos y conserva el código. Cancelar o superar
diez segundos destruye el motor ocupado; ejecutar después crea una sesión
limpia y conserva la última edición.

## TDD y comprobaciones

- [Rojo del núcleo y política](practice-point-5-red.json): once fallos
  funcionales con módulos resolubles, antes de implementar el motor.
- [Rojo del puente](practice-point-5-bridge-red.json): validación de mensajes.
- [Rojo de UI](practice-point-5-ui-red.json): el botón estaba desactivado.
  El comando del usuario seleccionó más proyectos, pero el fallo comprobado
  corresponde a ese requisito; no se cuenta la interrupción como otro fallo.
- [Rojo de la vista de datos](practice-point-5-preview-red.json): la inspección
  aún no devolvía la vista previa de las filas modificadas.
- [Verde de código y build](practice-point-5-code-green.json): 137 pruebas,
  tipos de app y pruebas, build y runtime. SQLite WASM real se carga también
  en Node para validar el núcleo; los adaptadores controlados solo prueban
  carreras y ciclo de vida del gestor.
- [Verde de UI SQL](practice-point-5-sql-ui-green.json): 49 aprobadas, sin
  omisiones, fallos ni casos inestables, en siete tamaños. Comprueba consultas,
  selección, resultados, datos mutables, autocompletado, aislamiento, cancelación
  y timeout reales. La prueba de aislamiento verifica otro hostname, denegación
  de almacenamiento del padre, cookies separadas, conexión bloqueada al origen
  de la app y navegación superior denegada.

La [suite completa con actualización](practice-point-5-ui-update.json) pasó
446 casos, con nueve omisiones previstas y ningún caso inestable. Se revisaron
32 capturas nuevas o modificadas: catorce de resultados/esquema y dieciocho del
panel existente, incluidos sus controles al 200%. Se conservan 144 referencias.
La prueba SQL espera el guardado antes de capturar. La [comparación independiente](practice-point-5-green.json)
también pasó 446 casos, con nueve omisiones previstas, sin fallos ni casos
inestables. Se verificó la misma huella de fuentes, herramientas y 144 referencias
sin cambios; no se actualizaron capturas durante esa ejecución.

## Build y límites

El [inventario de producción](../../benchmarks/runs/2026-11-14T07-50-28-961Z-da564ac16f/README.md)
declara 159279 bytes gzip de JavaScript y 22358 de CSS en portada: 263 bytes
adicionales de JS frente al punto 4, sin aumento de CSS. El incremento conjunto
frente al punto 3 es de 4336 bytes, dentro de 5 KiB. SQLite y su WASM de 879084
bytes están en el paquete estático separado; no forman parte de esa descarga
inicial. Esto mide archivos, no INP ni latencia fría del motor.

La CSP del runtime se aplica también al Worker; la de AllDoc limita los frames
al origen configurado. El puente usa un MessagePort privado y valida sesión,
protocolo, peticiones, eventos y esquema. La salida se renderiza como texto.
Las restricciones de SQL y las vistas truncadas se prueban con el motor real,
incluido que truncar RETURNING no omita mutaciones.

La [configuración de publicación](../practice-runtime-deployment.md) entrega dos
sitios estáticos. No se desplegó un servicio externo. Producción requiere un
dominio de runtime dedicado sin cookies de la app y sus cabeceras configuradas;
la validación local no acredita un host externo. No se activan COOP/COEP globales
ni se exige SharedArrayBuffer para cancelar.

Chromium se ejecutó desde la terminal del usuario: la sandbox devuelve EPERM
al abrir el servidor local. Los tamaños emulados no sustituyen una prueba en
Safari ni en dispositivos físicos. Pyodide/Jedi, acciones de ejemplos y
aceptación global siguen en los puntos 6, 7 y 8.

## Guía local aplicada

Se consultó la copia local de `modern-web-guidance` indicada por el usuario,
repositorio [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance),
commit `4dd968349e54ca45a05dd5c818fb035c9054b022`.

- [Validación de orígenes](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/security/validate-origins.md): orígenes HTTP(S) normalizados, sin comparar prefijos ni aceptar `null`; conexión inicial ligada a la ventana padre y origen esperados.
- [Restricción de conexiones](../../tmp/modern-web-guidance/skills/modern-web-guidance/guides/security/restrict-outbound-connections.md): CSP del origen de ejecución y Workers propios, sin conceder red a SQL. No se depende de Connection-Allowlist, de soporte todavía limitado, para aislar la ejecución.

Las decisiones del wrapper siguen las APIs [OO1](https://sqlite.org/wasm/doc/tip/api-oo1.md)
y [C](https://sqlite.org/wasm/doc/tip/api-c-style.md) de SQLite. No se usa la API
Worker1 obsoleta. El aislamiento se apoya en el origen separado y las políticas
del frame/Worker; un Worker del origen de AllDoc por sí solo no cumpliría el SDD.
