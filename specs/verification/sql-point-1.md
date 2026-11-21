# SQL — punto 1: inventario y contratos

Estado: **completado**. Entrega del [primer punto del SDD](../sql-sdd.md).
La [evidencia estructurada](sql-point-1/green.json) registra comprobaciones,
hashes y fase roja/verde. Los puntos 2 a 9 siguen pendientes.

## Resultado

- 99 archivos de conceptos inventariados, con su texto original, bytes,
  SHA-256, destinos y motivo de revisión. Se conservan también Prompt y Criterios.
- Los once archivos vacíos se identifican como trabajo editorial pendiente;
  no se convierten en fichas publicadas por existir en el inventario.
- Árbol de 34 grupos en el orden solicitado, con 153 destinos. Cada grupo
  empieza en Definición; números de orden solo en metadata. Las separaciones
  de archivos mezclados y las dos incorporaciones sin fuente propia son trazables.
- Las cinco identidades/rutas anteriores se conservan. Comentarios queda
  planificado dentro de SELECT manteniendo su ID y URL.
- Las ubicaciones de Análisis de datos y Lenguajes resuelven a la misma
  identidad SQL y al mismo perfil/workspace. Lenguajes se marca como ubicación
  planificada; este resolver no crea todavía un área ni rutas Docusaurus.
- Contratos separados para soporte documental y ejecución local. Las acciones
  preparan o copian código; nunca ejecutan automáticamente.

## Archivos de trabajo

| Archivo | Responsabilidad |
| --- | --- |
| [source-inventory.json](../sql/source-inventory.json) | Snapshot de fuentes, hashes, decisiones y destinos; verificable aunque se retire tmp |
| [contracts.ts](../../src/content/sql/contracts.ts) | Dialectos, fuentes, variantes, compatibilidad local y evidencia de ejemplos |
| [curriculum.ts](../../src/content/sql/curriculum.ts) | Árbol ordenado, IDs/rutas/archivos y validación de su coherencia |
| [placements.ts](../../src/content/sql/placements.ts) | Resolución del plan de ubicaciones, canonical y contexto de práctica común |
| [capabilities.ts](../../src/content/sql/capabilities.ts) | Matriz de seis dialectos con revisión explícita o pendiente |
| [variants.ts](../../src/content/sql/variants.ts) | Validación para publicar variantes y preparar acciones honestas |
| [sql-foundation.test.ts](../../tests/sql-foundation.test.ts) | Inventario, árbol, compatibilidad, publicación y acciones de ejemplo |

El inventario contiene los textos en documentación de desarrollo, fuera de los
imports de la app. No se usa tmp como dependencia obligatoria en CI: siempre se
comprueban los snapshots versionados, sus hashes y destinos. Si los originales
están disponibles, también se contrasta su contenido y el conjunto completo
de archivos, para detectar modificaciones o nuevas fuentes no inventariadas.

## Matriz y estados de publicación

La matriz cubre 90 claves de capacidad por seis dialectos: 540 celdas.
Treinta tienen revisión documental y 510 conservan el estado `pending`.
Los bloques editoriales siguientes completarán la revisión de cada capacidad
junto a sus variantes. Una celda pendiente no se interpreta como soporte ni
puede convertir una variante en publicable.

Las primeras revisiones cubren SELECT, WHERE, ORDER BY y límite de filas en los
seis dialectos, comentarios SQLite y diferencias de FULL OUTER JOIN. Se
registran URL, referencia de versión y fecha. El límite distingue LIMIT de
[TOP en SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/queries/top-transact-sql?view=sql-server-ver17)
y [FETCH en Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html).
La ausencia de FULL OUTER JOIN nativo en MySQL se deriva de la
[gramática publicada de JOIN](https://dev.mysql.com/doc/refman/9.7/en/join.html);
una emulación necesita su propia variante y comprobaciones.

Esto es revisión de documentación, no arranque ni ejecución de seis RDBMS.
La referencia MariaDB identifica el documento vigente consultado, que no fija
una rama concreta; los cuerpos futuros deberán precisar su rango/versiones
antes de afirmar compatibilidad de sus ejemplos.

Para que una variante quede `ready`, debe tener identidad/capacidad coherentes,
dialecto conocido, fuentes válidas con al menos una oficial de ese dialecto,
fecha real, versión declarada, SQL o explicación según corresponda, y soporte
coincidente con la celda revisada. Un borrador sigue pendiente. Las entradas
mal serializadas, los modos desconocidos y los estados contradictorios fallan.

Una acción local exige un único ejemplo SQLite verificado para ese concepto.
La acción directa requiere el mismo SQL. Un equivalente requiere además una
asociación revisada con el dialecto y código originales, explicación y la
etiqueta «Probar equivalente en SQLite». No basta con apuntar a cualquier
ejemplo SQLite que funcione. Los registros verificados de las pruebas son
fixtures del contrato; no acreditan una ejecución nueva en otro motor.

## TDD y validación

La [primera fase roja](sql-point-1/red.json) registra siete fallos de doce casos
contra la proyección de los cinco conceptos previos y contratos pendientes.
Se probaron expectativas de 34 grupos, inventario completo, ubicación compartida,
matriz y variantes revisadas; no fueron fallos por módulos ausentes.

Las regresiones adicionales conservaron fallos reales antes de corregir:

- [Equivalencia sin vínculo al concepto/código](sql-point-1/red-equivalence.log).
- [Representación de sintaxis no disponible](sql-point-1/red-unavailable.log).
- [Estados y modos serializados como arrays](sql-point-1/red-serialized-states.log).

La [fase verde](sql-point-1/green.log) aprueba las catorce pruebas nuevas.
La suite completa pasa **289 pruebas de código**, sin fallos ni omisiones.
Pasan tipos de aplicación/pruebas y build de producción. La auditoría del build
conserva las once rutas actuales, incluidas las cinco fichas SQL; no aparecen
páginas futuras ni el área Lenguajes publicada.

Se comparan los SHA-256 de los 383 archivos existentes registrados al empezar,
incluyendo fuentes/configuración y las 217 capturas de ambos conjuntos con
sus seis manifiestos. No cambian sus bytes, paquetes ni lockfile. Los nuevos
contratos quedan separados de los imports activos de la UI; no hizo falta
regenerar referencias ni pedir otra ejecución de navegador.

No se implementan en este punto el dataset relacional, los nuevos cuerpos,
el selector visible, la disposición Datos/Editor/Resultado ni la corrección
del autocompletado. Corresponden a los siguientes puntos del SDD.
