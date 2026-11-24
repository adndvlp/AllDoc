# AllDoc — SDD de SQL: apuntes, dialectos y práctica relacional

**Fecha:** 21 de noviembre de 2026, America/Mexico_City.

**Estado:** completado. Se cerraron los puntos 1 a 9. [Evidencia de cierre](verification/sql-point-9.md).

**Objetivo:** convertir la base de `tmp/SQL` en apuntes completos, compactos y progresivos, compartidos entre Análisis de datos y Lenguajes, con variantes por dialecto y una práctica libre sobre un único dataset relacional.

La entrega incluye 153 fichas en 34 grupos, desde SELECT hasta Transacciones, variantes para seis dialectos y práctica en SQLite sobre el dataset `negocio-relacional@1`.

## 1. Entradas y base comprobada

Se leyeron [Prompt.md](../tmp/SQL/Prompt.md), los [criterios](<../tmp/SQL/0.- Criterios.md>) y los 99 archivos de conceptos distribuidos en 34 carpetas. Once archivos están vacíos. La captura aportada por el usuario muestra un editor SQL muy alto, con Datos y Resultados ocultos detrás de pestañas. Esta especificación incorpora su petición posterior de regiones apiladas.

Antes de iniciar el SDD, se observó esta base:

| Pieza | Base observada | Trabajo necesario |
| --- | --- | --- |
| Apuntes SQL | Cinco fichas: SELECT, WHERE, ORDER BY, LIMIT y Comentarios | Incorporar el temario, revisar lo existente y estructurar subsecciones |
| Contenido y catálogo | Metadata en `src/content/concepts.ts`, cuerpos SQL en `src/content/notes/sql.ts`, catálogo/sidebars derivados | Representar jerarquía y entradas compartidas sin duplicar contenido |
| Áreas | Análisis de datos, Desarrollo web e IA | Añadir el destino Lenguajes y reutilizar allí SQL |
| Dataset | `productos-basico@1`: una tabla, tres columnas y tres filas | Dataset SQL relacionado, con restricciones y casos de consultas complejas |
| Preparación de datos | `sqlSeedFor` genera columnas y filas; el contrato actual no expresa PK, FK ni índices | Ampliar el contrato y su materialización real |
| Inicio del editor | `editorBootstrap` está ligado al dataset de productos y a los ejemplos iniciales | Resolver la preparación por perfil/dataset registrado |
| Panel | Un editor persistente con pestañas Código, Datos y Resultados | Mostrar Datos → Editor → Resultado en la misma superficie |
| Ejecución | SQLite WASM aislado, bajo demanda; pandas tiene su propio perfil Pyodide | Mantener SQLite como motor SQL local y conservar pandas |
| Sugerencias | CodeMirror recibe un esquema; el adaptador devuelve el primer resultado no vacío de sus proveedores | Reproducir y corregir las columnas sin alias y su integración con el editor real |

Una inspección nativa, sin cambiar código, obtuvo solo `productos` al completar en `SELECT ▏ FROM productos;`; en `SELECT p.▏ FROM productos p;` obtuvo `nombre`, `categoria` y `precio`. Esto reproduce parte del problema informado, no demuestra todavía su causa completa en la UI. La implementación deberá registrar primero el fallo real y revisar resolución de tablas, combinación de proveedores, filtrado e inserción. La existencia de un esquema o de pruebas anteriores no acredita que ese caso funcione.

Se conserva la evidencia histórica del [panel de práctica](practice-sdd.md) y de la [compatibilidad entre navegadores](browser-compatibility-sdd.md). Este documento define cambios nuevos; no reescribe sus resultados ni presenta sus capturas como referencias de la nueva interfaz.

## 2. Decisiones de alcance

| ID | Decisión |
| --- | --- |
| SQ-01 | El contenido es para recordar: explicación directa, ejemplo empresarial breve y pocos elementos visibles |
| SQ-02 | Se preserva el orden de las 34 carpetas originales; sus números solo sirven para importar y ordenar, nunca se publican |
| SQ-03 | Cada grupo tiene una entrada inicial Definición y subsecciones colapsables; los dependientes permanecen bajo su concepto |
| SQ-04 | Se revisan también los archivos no vacíos; no se consideran correctos solo por contener texto o SQL |
| SQ-05 | SQLite, PostgreSQL, MySQL, SQL Server, MariaDB y Oracle SQL tienen variantes documentales explícitas |
| SQ-06 | Elegir el dialecto de los apuntes no instala ni cambia el motor de ejecución: el local sigue siendo SQLite |
| SQ-07 | SQL mantiene una sola fuente de contenido y una sola sesión de práctica aunque se acceda desde dos áreas |
| SQ-08 | Un único dataset de negocio por sesión SQL sirve para cualquier concepto; navegar no cambia tablas ni reinicia el entorno |
| SQ-09 | Datos, Editor y Resultado son regiones de un mismo panel; no son ventanas del navegador ni diálogos apilados |
| SQ-10 | El resultado aparece debajo del editor después de ejecutar, incluidos resultados vacíos, mensajes y errores |
| SQ-11 | Se corrige el autocompletado de tablas, columnas, alias y cambios del esquema real |
| SQ-12 | TDD para todo cambio de comportamiento, con motores reales y revisión visual de las modificaciones |
| SQ-13 | Se conservan negro puro, modo oscuro único, acentos saturados, encabezado estable, ausencia de footer y carga diferida |
| SQ-14 | Las dependencias nuevas o que deban actualizarse se resuelven a las últimas versiones estables compatibles al implementar; se registra el lockfile y el entorno efectivo |

No se añaden en esta entrega un backend de ejecución, conexiones a bases del usuario, credenciales, cuentas, importación de sus archivos ni runtimes MySQL/Oracle/SQL Server alojados por AllDoc. El usuario puede copiar los ejemplos y preparar el mismo dataset en su propio RDBMS. Tampoco se promete que un dataset finito sirva para cualquier dominio imaginable o que SQLite ejecute extensiones de todos los motores: el compromiso es cubrir el temario y combinaciones avanzadas con el esquema publicado.

## 3. Contrato editorial

### 3.1 Ficha mínima

Cada concepto contiene:

1. **Definición:** una o dos frases sencillas, centradas en qué permite hacer.
2. **Esquema base:** opcional; solo si representa el concepto mejor que el ejemplo. No se repite mecánicamente en todas las fichas.
3. **Ejemplo aplicado:** SQL real sobre el dataset de negocio, con un título que diga qué se obtiene o modifica.
4. **Clave importante:** opcional; una confusión, regla o consecuencia que cambie la interpretación. Las ampliaciones se despliegan.

Ejemplo del tono esperado:

> WHERE deja solo las filas que cumplen una condición.

```sql
SELECT nombre, precio
FROM productos
WHERE precio >= 1000;
```

No se convierten las fichas en capítulos largos ni en listas de preguntas de entrevista. Las confusiones útiles de entrevistas se explican junto a la operación correspondiente, con lenguaje cotidiano. Como orientación editorial, el ejemplo principal ocupa hasta ocho líneas; JOIN, CTE y ventanas pueden necesitar más. Las combinaciones largas son subsecciones propias, no relleno de la definición.

La primera visita abre Definición. El resto comienza contraído; un enlace directo a una subsección abre sus ancestros. La explicación y el ejemplo principal deben caber sin scroll en el tamaño de referencia que lo permita. En móvil y al 200% se prioriza legibilidad sobre forzar una altura fija o recortar texto.

Los ejemplos se redactan en contexto de productos, clientes, pedidos, inventario o empleados. No se conservan nombres de videojuegos de la referencia. Se usa redacción propia; Aprende SQL sirve para contrastar cobertura y uso, no como contenido copiado de la app.

### 3.2 Orden y dependencias

- SELECT explica FROM, `*`, listas de columnas y el primer uso de AS. No se crea una lección aislada de FROM.
- ASC y DESC son subsecciones de ORDER BY; AND, OR y NOT son subsecciones de WHERE.
- LIMIT conserva su lugar antes de ORDER BY. Allí se explica que limitar no garantiza cuáles filas se obtienen; la combinación ordenada aparece cuando ya se enseñó ORDER BY.
- Las agregaciones básicas no usan GROUP BY antes de presentarlo. La concatenación global se ve primero; su versión por grupo aparece después.
- Las referencias a NULL antes de su grupo incluyen una aclaración mínima y un enlace, sin exigir leer otra lección para entender el ejemplo.
- Los nuevos nombres imprescindibles se explican al primer uso. Las combinaciones se presentan después de sus componentes.
- Los 99 archivos de entrada se relacionan con su destino en un inventario de importación. Unificación, cambio de nombre o incorporación tienen motivo explícito; no se descarta silenciosamente un archivo.

### 3.3 Nombres y organización

Los archivos publicados no llevan prefijos numéricos: `select/definicion.mdx`, `where/and.mdx`, etc. La etiqueta visible es «Definición»; el nombre físico evita acentos para mantener rutas sencillas. El orden vive en metadata explícita, no en orden alfabético del sistema de archivos.

Agregación, funciones de texto, funciones numéricas, vistas y subconsultas también empiezan con una definición corta de su familia. Es una decisión de este diseño para resolver la duda del archivo Prompt: después se abren COUNT, UPPER o la operación concreta sin repetir la explicación general.

La clasificación se conserva así; la columna de orden es de diseño y no se muestra en la app:

| Orden | Grupo publicado | Subsecciones mínimas |
| --- | --- | --- |
| 1 | SELECT | Definición, todas las columnas, columnas concretas, alias AS, comentarios |
| 2 | LIMIT / límite de filas | Definición, límite, OFFSET; nombres y variantes según dialecto |
| 3 | WHERE | Definición, operadores y tipos, AND, OR, NOT, combinación con paréntesis |
| 4 | BETWEEN | Definición, extremos incluidos, NOT BETWEEN |
| 5 | IN | Definición, lista, NOT IN |
| 6 | LIKE | Definición, `%`, `_`, NOT LIKE |
| 7 | ORDER BY | Definición, ASC, DESC, varias columnas, combinación con LIMIT |
| 8 | DISTINCT | Definición, una columna, combinación de columnas |
| 9 | JOIN | Definición/INNER JOIN, ON, alias de tablas, self join, CROSS JOIN |
| 10 | JOIN externos | Definición, LEFT, RIGHT, FULL OUTER, anti join |
| 11 | NULL | Definición, IS NULL, IS NOT NULL, NULLIF |
| 12 | COALESCE | Definición y varios valores alternativos |
| 13 | CASE WHEN | Definición, condiciones y ELSE |
| 14 | CAST | Definición, conversión explícita y diferencias de tipo por motor |
| 15 | Funciones de texto | Definición, UPPER, LOWER, longitud, subcadena, TRIM, REPLACE; concatenación donde corresponda |
| 16 | Funciones numéricas | Definición, ROUND, ABS; división y redondeo cuando cambian el resultado |
| 17 | Agregación | Definición, COUNT, SUM, AVG, MIN, MAX, concatenación, combinaciones y WHERE |
| 18 | GROUP BY | Definición, varias columnas, HAVING y comparación con WHERE |
| 19 | Orden de ejecución | Definición, orden lógico con ejemplo y diferencia frente al plan físico |
| 20 | INSERT INTO | Definición, columnas explícitas, varias filas, conflictos y variantes IGNORE/REPLACE |
| 21 | UPDATE | Definición, varias columnas, comprobar primero con SELECT |
| 22 | DELETE | Definición, condiciones, comprobar primero con SELECT |
| 23 | CREATE TABLE | Definición, tipos, IF NOT EXISTS, PK, NOT NULL, UNIQUE, DEFAULT, CHECK, FK, varias FK, CASCADE y SET NULL |
| 24 | ALTER TABLE | Definición, añadir/renombrar/eliminar columnas y renombrar tabla según capacidad |
| 25 | DROP TABLE | Definición e IF EXISTS cuando exista |
| 26 | Vistas | Definición, CREATE VIEW, JOIN, creación condicional/reemplazo y DROP VIEW |
| 27 | Índices | Definición, simple/compuesto, UNIQUE, consultar índices y DROP |
| 28 | Subconsultas | Definición, WHERE, IN, SELECT, EXISTS, NOT EXISTS |
| 29 | UNION | Definición, UNION ALL, ORDER BY al resultado combinado |
| 30 | INTERSECT | Definición y columnas compatibles |
| 31 | EXCEPT | Definición y equivalente/nombre según motor |
| 32 | CTE | Definición, WITH y múltiples CTE |
| 33 | Funciones de ventana | Definición/OVER, PARTITION BY, ORDER BY, marco de filas, ROW_NUMBER, RANK/DENSE_RANK, LAG/LEAD y agregaciones |
| 34 | Transacciones | Definición, BEGIN/inicio por motor, COMMIT, ROLLBACK y autocommit |

Se corrigen nombres como `BEtweem`, `NULL IF`, `numércias` y la etiqueta ambigua NOT NULL del grupo NULL: allí corresponde IS NOT NULL; la restricción NOT NULL pertenece a CREATE TABLE. Comentarios se conserva dentro de SELECT y mantiene su ruta existente. No se recuperan «Repaso Completo» ni «SQL de un vistazo».

### 3.4 Revisión de exactitud obligatoria

La revisión no se limita a completar los once archivos vacíos. Debe cubrir, al menos:

- CAST debe explicar conversión, no limitarse a una consulta de antigüedad y concatenación.
- NOT IN y las negaciones deben tratar correctamente el caso NULL; no reducirlo siempre a «lo contrario».
- JOIN debe explicar multiplicación de filas, ausencia de coincidencias y el efecto de mover condiciones entre ON y WHERE.
- La selección con límite y las posiciones de ventana necesitan desempates explícitos cuando se espera un resultado reproducible.
- COUNT, agregados sin filas y valores NULL necesitan ejemplos que diferencien los casos.
- REPLACE no se presenta como sinónimo universal de UPDATE. Las diferencias de resolución de conflictos se documentan por motor; [SQLite describe sus algoritmos](https://sqlite.org/lang_conflict.html).
- Una clave primaria no se presenta como autoincremento universal. Las variantes de identidad se verifican por RDBMS.
- Un índice no garantiza ser utilizado ni ser siempre más rápido. Se elimina la afirmación absoluta de que una segunda columna nunca puede aprovecharse: [SQLite documenta, entre otras estrategias, skip-scan](https://sqlite.org/optoverview.html#skipscan).
- En ventanas se distingue ordenar la ventana de ordenar la salida, y se explica el marco cuando afecta acumulados. [Referencia de SQLite](https://sqlite.org/windowfunctions.html).
- Una transferencia no puede acreditar al destino si el débito no afectó filas. El ejemplo debe verificar el débito y revertir ante incumplimiento; no basta con rodear dos UPDATE de BEGIN/COMMIT.
- Una transacción no se describe como garantía de idéntico comportamiento de DDL en todos los motores. Las diferencias tienen fuente y versión.

## 4. Fuente de contenido y navegación compartida

### 4.1 Un árbol SQL, varias ubicaciones

Se define una sola estructura ordenada de grupos y conceptos, reutilizada por catálogo, sidebar, páginas y búsqueda. Sus nodos separan identidad, orden, etiqueta, hijos y referencia al cuerpo. No se mantienen listas de temas escritas a mano en cada componente.

Como propuesta concreta, **Lenguajes será una nueva área del encabezado**, junto a las tres actuales; inicialmente contiene la entrada SQL. No se añaden otras herramientas a esa área en esta entrega. Ambas ubicaciones renderizan el mismo árbol SQL, con categorías contraídas por defecto. Pulsar SQL o una categoría solo despliega; sus hojas navegan.

Los cinco conceptos existentes mantienen sus IDs, slugs canónicos y asociaciones de favoritos/recientes. Las nuevas páginas reciben IDs estables sin numeración. El archivo físico Definición puede declarar el slug anterior; no se exige que mover carpetas rompa enlaces publicados.

El acceso desde Lenguajes tiene rutas de presentación equivalentes, breadcrumb y área activa de Lenguajes; remite al mismo concepto y cuerpo, con canonical hacia la ruta principal existente de Análisis de datos. No duplica fichas en búsqueda, favoritos o recientes. Un manifiesto de ubicaciones resuelve ruta → concepto → herramienta; el último segmento de una URL no identifica por sí solo el contexto.

El `toolKey` histórico SQL se normaliza a una identidad compartida para ambos accesos. Borrador, dataset, motor vivo, revisión anterior y resultados no se duplican por área. Cambiar de área conservando SQL no se trata como SQL → pandas.

### 4.2 Representación propuesta

El contrato separa tres registros:

- **Árbol:** grupos, hijos, orden y ubicaciones; sin motores ni filas.
- **Concepto:** identidad, definición, esquema opcional, ejemplos, claves y fuentes.
- **Variante:** dialecto, disponibilidad, SQL concreto y compatibilidad con la ejecución local.

Los cuerpos comunes se reutilizan. Una diferencia puntual cambia solo la variante necesaria; no se escriben seis copias completas de cada ficha. Esquema conceptual:

```ts
type SqlDialectId = 'sqlite' | 'postgresql' | 'mysql'
  | 'sqlserver' | 'mariadb' | 'oracle';

type LocalExecution =
  | {kind: 'sqlite'; exampleId: string}
  | {kind: 'sqlite-equivalent'; exampleId: string; explanation: string}
  | {kind: 'external'; explanation: string};

type SqlVariant = {
  dialectId: SqlDialectId;
  support: 'native' | 'equivalent' | 'unavailable';
  code?: string;
  explanation?: string;
  localExecution: LocalExecution;
  sources: {url: string; checkedAt: string; targetVersion: string}[];
};
```

Son contratos de diseño, no código ya implementado. `support` describe el concepto en el dialecto documental; `localExecution` describe el motor del panel. Su distinción impide confundir «existe en MySQL» con «ejecutado aquí como MySQL».

## 5. Selector de dialecto y uso con un RDBMS propio

El selector solo aparece en SQL. Su valor inicial es SQLite; recuerda la preferencia local con una clave nueva y validada. Un parámetro de enlace compartido puede fijar el dialecto y prevalece para esa navegación. Las rutas de concepto siguen siendo estables. Un valor desconocido usa SQLite y no rompe la página ni borra la preferencia válida anterior.

Cambiar de dialecto actualiza definición o notas cuando sea necesario, código, nombre de función, disponibilidad y acción de práctica. Conserva el concepto activo y sus ancestros abiertos. No desplaza al principio de la página, no sustituye el borrador y no ejecuta nada. La carga tardía de una variante no puede revertir una selección más reciente.

El contenido incluye al menos estas familias de diferencias, contrastadas durante la implementación con documentación oficial y versión concreta:

| Familia | Tratamiento requerido |
| --- | --- |
| Limitar/paginar | LIMIT, TOP u OFFSET/FETCH según dialecto; requisitos de ordenación |
| Texto | Nombre y semántica de longitud/subcadena y concatenación |
| Agregación de texto | GROUP_CONCAT, STRING_AGG o LISTAGG según capacidad; orden y separador |
| JOIN y conjuntos | Soporte nativo, equivalente o ausencia; no asumir igualdad entre MySQL y MariaDB |
| DDL | Tipos, identidad, condiciones de creación, ALTER, vistas, índices y claves foráneas |
| Conflictos | IGNORE, REPLACE y alternativas; no traducción por sustitución de palabras |
| Transacciones | Inicio, autocommit, errores y operaciones DDL |
| Extensiones | Aclarar que PL/SQL y T-SQL incorporan capacidades propias; no tratarlas como motores intercambiables |

Cuando no exista la operación, la ficha dice qué falta y ofrece un equivalente si lo hay. La categoría puede omitir una subsección exclusiva de otro motor, pero una URL directa siempre muestra la explicación y un camino útil; nunca una página vacía o una desaparición silenciosa.

Las definiciones y ejemplos del dialecto elegido son utilizables sin abrir el editor de AllDoc. Cada ejemplo permite copiar SQL. Se ofrecen scripts de preparación del dataset para los seis RDBMS, con tablas, restricciones, datos y orden de importación adecuados; son archivos estáticos, no conexiones a sus servidores. Los scripts se limitan al esquema/base de práctica indicada, no contienen credenciales ni borran bases ajenas.

La cabecera de práctica identifica siempre **Motor local: SQLite**. Las acciones de ejemplo son:

| Compatibilidad | Acción |
| --- | --- |
| Mismo SQL verificado en SQLite | Probar en SQLite; conserva claro que el apunte puede mostrar otro dialecto |
| Requiere otra implementación local | Probar equivalente en SQLite, con explicación visible antes de sustituir el código |
| Solo ejecutable externamente | Copiar SQL y obtener preparación; no simular un resultado ni cambiar el motor anunciado |

No se traduce automáticamente el SQL libre del usuario mediante expresiones regulares. Si escribe SQL incompatible en el editor local, recibe el error real de SQLite. Un resultado obtenido en SQLite no acredita ejecución en PostgreSQL, MySQL, SQL Server, MariaDB u Oracle.

## 6. Dataset de negocio común

### 6.1 Identidad y tablas

Se crea `negocio-relacional@1` para SQL. Es una base en memoria de una empresa que vende productos, con ventas, personal e inventario. Se carga una vez por entorno SQL y no depende de la ficha abierta. La propuesta inicial de esquema es:

| Tabla | Campos principales y relaciones |
| --- | --- |
| categorias | id PK, nombre UNIQUE, descripción opcional |
| proveedores | id PK, nombre, país, email opcional |
| productos | id PK, nombre, categoria FK → categorias.nombre, precio, stock, proveedor_id FK opcional, activo |
| clientes | id PK, nombre, email UNIQUE, ciudad, fecha_alta, teléfono opcional |
| departamentos | id PK, nombre UNIQUE |
| empleados | id PK, nombre, departamento_id FK, gerente_id FK a empleados opcional, salario, fecha_ingreso |
| pedidos | id PK, cliente_id FK, empleado_id FK opcional, fecha, estado |
| detalle_pedidos | pedido_id FK + producto_id FK como PK compuesta, cantidad, precio_unitario, descuento |
| pagos | id PK, pedido_id FK, fecha, importe, método |
| almacenes | id PK, nombre, ciudad |
| inventario | almacen_id FK + producto_id FK como PK compuesta, unidades |
| movimientos_stock | id PK, producto_id FK, almacen_id FK, empleado_id FK opcional, fecha, tipo, cantidad |
| cuentas | id PK, cliente_id FK, saldo, fecha_apertura |

`productos` conserva los nombres `nombre`, `categoria` y `precio` para que los borradores simples anteriores sigan siendo utilizables. La FK de texto `categoria` referencia una columna UNIQUE; la decisión y sus consecuencias se documentan. Se evita mantener dos categorías modificables que puedan contradecirse.

El contrato del dataset expresa tipos, nulabilidad, PK simples/compuestas, UNIQUE, CHECK, DEFAULT, FK y acciones referenciales, además de filas. El materializador crea las restricciones reales; una etiqueta visual «FK» sin integridad comprobada no cumple. En SQLite se activa y comprueba la integridad referencial al preparar cada conexión, antes de iniciar la sesión del usuario. [Documentación de SQLite](https://sqlite.org/foreignkeys.html).

El punto de implementación del dataset fijará todos los nombres, tipos y filas en un manifiesto versionado. No se cambia el mismo `@1` después de publicar; se crea otra versión y una migración si es necesario.

### 6.2 Casos representativos

La semilla es determinista: IDs y fechas fijos, sin aleatoriedad ni dependencia de la hora actual. Objetivo inicial: 300–600 filas en total, repartidas entre las trece tablas. La variedad importa más que añadir miles de filas.

Debe incluir clientes sin pedidos y con varios pedidos; proveedores y categorías sin productos; productos sin ventas o proveedor; pedidos sin pagos y con pagos parciales/múltiples; gerentes y subordinados; repetición de importes para empates de ranking; fechas en meses y años distintos; NULL, cero y cadenas vacías donde sean válidos; y texto con acentos. No se insertan FK rotas para fabricar un JOIN externo: las ausencias se modelan mediante NULL o padres sin hijos.

Debe permitir resultados comprobables para JOIN de varias tablas, anti joins, self join, agregaciones, HAVING, subconsultas correlacionadas, CTE, conjuntos, ventanas, modificaciones, integridad y transacciones. Un ejemplo avanzado de referencia combina clientes, pedidos y detalles, agrega ventas por cliente y aplica un ranking con empate. Las pruebas comparan sus filas y números reales.

El dinero usa una representación declarada y consistente entre semilla, documentos y exportaciones. Se comprueban los tipos efectivos en SQLite; no se atribuye precisión decimal fija a una afinidad que no la garantice. Fechas y booleanos también documentan su representación por motor.

### 6.3 Una sesión libre

- Abrir SELECT, WHERE, JOIN o una hoja distinta mantiene el mismo estado SQL, incluidas las tablas y vistas creadas por el usuario.
- Se permiten las operaciones compatibles del temario, no solo SELECT. La lección no filtra qué sentencia se puede escribir.
- La semilla inicial y las páginas no dictan el resultado del usuario. Datos muestra el esquema y una vista previa del entorno vivo.
- Reiniciar entorno reconstruye el dataset, elimina cambios de la sesión y conserva el código. Restaurar código no reinicia datos.
- BEGIN, modificaciones y COMMIT/ROLLBACK pueden ejecutarse por separado sin que una inspección o una actualización de UI confirme la transacción. Se respeta [el comportamiento real de SQLite](https://sqlite.org/lang_transaction.html).
- Un error de varias sentencias muestra los resultados completados y el fallo; no se inventa una reversión global que el motor no haya hecho.
- Se conservan tiempo máximo, cancelación y aislamiento vigentes. Si detener/timeout reconstruye el motor, se anuncia la pérdida del estado temporal y la restauración de la semilla; se mantiene el borrador.
- El dataset nuevo no altera `productos-basico@1`, usado por pandas. SQL tiene un solo dataset activo; el antiguo se conserva como formato histórico para migración, no como selector por lección.

### 6.4 Borradores existentes

Se migra el borrador SQL anterior al nuevo contexto una sola vez, sin ejecutarlo. El registro anterior se conserva como copia recuperable. La migración es idempotente, valida formato y revisión, y respeta los conflictos de IndexedDB entre pestañas. Una interrupción no puede borrar ambos registros ni sobrescribir una edición nueva. Si falla el almacenamiento, continúa en memoria con aviso.

El cambio de dataset inicial se anuncia brevemente; no se ofrece preservar una VM antigua al recargar. Las claves de favoritos/recientes y el borrador pandas permanecen intactos. Cambiar el dialecto documental no crea seis borradores SQL diferentes ni seis datasets.

## 7. Panel: Datos → Editor → Resultado

### 7.1 Orden y uso del espacio

La superficie SQL usa este orden visual y de lectura:

```text
Práctica SQL                                  Motor local: SQLite

Datos         [Tabla: productos ▾] [Ver esquema]
┌──────────────────────────────────────────────────────────────┐
│ Columnas y vista previa de la tabla seleccionada              │
└──────────────────────────────────────────────────────────────┘

Editor        consulta.sql    [Ejecutar] [Reiniciar entorno] [⋯]
┌──────────────────────────────────────────────────────────────┐
│ SELECT nombre, precio FROM productos;                        │
└──────────────────────────────────────────────────────────────┘

Resultado     aparece al ejecutar
┌──────────────────────────────────────────────────────────────┐
│ Tabla, filas afectadas, salida o error real                   │
└──────────────────────────────────────────────────────────────┘
```

Las regiones tienen título y semántica accesible. Se eliminan las pestañas excluyentes que ocultan Datos o Resultado para esta disposición. El resultado no reemplaza el editor ni abre otro modal. Antes de la primera ejecución no ocupa una tercera región vacía.

Datos muestra una tabla elegida entre todas las entidades actuales, con tipos, claves, número de filas y hasta veinte filas de vista previa. Cambiar esa tabla solo cambia la inspección; no cambia la base, el código ni la tabla a la que se permite consultar. «Ver esquema» despliega una lista compacta de tablas y relaciones. No se montan trece tablas completas simultáneamente.

El editor mantiene una única instancia de CodeMirror. Sus alturas se adaptan al espacio útil: vista previa acotada, editor con mínimo legible y resultado visible después de ejecutar. El cuerpo del panel puede desplazarse si las tres regiones no caben; editor y tablas tienen scroll propio solo al desbordar. No se conserva un lienzo de editor gigantesco a costa de esconder el resto.

La propuesta de partida considera disposición amplia cuando el cuerpo dispone de unos 32 rem de ancho y 34 rem de alto. Son parámetros de diseño a ajustar con las pruebas, no detección por marca de dispositivo. Con menos espacio se usa la disposición compacta de la sección siguiente. No se reduce la fuente para conseguir que todo quepa.

### 7.2 Móvil, iPad y teclado virtual

En móvil se conserva el mismo orden vertical dentro de un panel a pantalla disponible:

- Datos empieza como una cabecera colapsable con selector/resumen; se puede abrir sin salir del editor.
- Editor empieza abierto, con altura acotada y controles accesibles. No se fuerza a convivir a tres miniaturas ilegibles en la altura del teléfono.
- Resultado no existe antes de ejecutar; al hacerlo se abre debajo del editor, con tabla, mensaje o error. El editor permanece montado y no pierde código ni selección.
- Los encabezados permiten colapsar las regiones y volver a ellas. Son secciones del mismo flujo, no pestañas que sustituyan toda la pantalla.
- «Ir al resultado» desplaza únicamente la práctica. El resultado se anuncia brevemente; no roba el foco del editor ni mueve el apunte de fondo.

En iPad se aplica el modo que permita su espacio efectivo, incluida orientación horizontal. El teclado virtual reduce la superficie mediante `visualViewport`, sin desmontar CodeMirror ni resetear aperturas elegidas por el usuario. Girar o ampliar texto conserva editor, selección, consulta, datos, resultado y foco útil. Al volver a abrir una región se recalcula la geometría del editor.

Controles táctiles de al menos 44×44 CSS px, etiquetas legibles al 200% y sin desbordamiento horizontal de la página. Las tablas anchas desplazan solo su contenedor. Un resultado largo puede paginar o truncar su representación con aviso; la consulta se ejecuta sobre todas las filas del dataset.

### 7.3 Ejecución y resultados

«Ejecutar» y **Cmd+Enter en macOS / Ctrl+Enter en los demás teclados** realizan la misma acción. Una selección ejecuta solo el fragmento; sin selección, el documento. No interceptan Enter normal ni una composición IME. Si el motor no está listo, el atajo respeta el botón desactivado y no deja una ejecución pendiente.

El estado de ejecución aparece en Resultado; puede reutilizar la región previa, marcada como perteneciente a la ejecución anterior mientras se prepara la nueva. Al completar, muestra las tablas/mensajes del último run con su revisión. Un cambio posterior del código marca que el resultado corresponde a una revisión anterior. Cero filas conserva cabeceras; DML muestra filas afectadas y DDL su confirmación; los errores mantienen ubicación cuando el motor la ofrece.

Los lotes con varios resultados se presentan en su orden dentro de esa tercera región, sin confundir datos inspeccionados con salida de consulta. Una respuesta tardía de otra sesión o ejecución se descarta. Error, cancelación y timeout dejan el editor utilizable.

La estructura de regiones pertenece al panel compartido. pandas debe conservar ejecución, DataFrames, borradores y sus acciones sobre el dataset anterior; no se le aplica el nuevo dataset SQL ni el selector de dialecto. La regresión incluye la adaptación visual del contenedor compartido.

## 8. Autocompletado de esquema real

El proveedor local usa el esquema vivo de SQLite. Ofrece palabras clave, tablas y columnas, con contexto y alias; no una lista de columnas inventada a partir de la ficha abierta. CodeMirror ofrece soporte SQL y un proveedor de esquema que se evaluarán como base. [Proyecto oficial](https://github.com/codemirror/lang-sql), [implementación de completado](https://github.com/codemirror/lang-sql/blob/main/src/complete.ts).

Casos mínimos, donde `▏` indica el cursor:

| Caso | Expectativa |
| --- | --- |
| `SELECT ▏ FROM productos;` | Columnas de productos, incluyendo nombre, categoria y precio |
| `SELECT pre▏ FROM productos;` | precio y reemplazo correcto del prefijo, sin duplicarlo |
| `SELECT p.▏ FROM productos p;` | Columnas de productos; insertar no repite `p.` |
| `SELECT p.▏ FROM productos AS p JOIN proveedores AS v ON …` | Solo columnas de p en ese acceso calificado |
| `SELECT ▏ FROM productos p JOIN proveedores v ON …` | Candidatas de ambas fuentes; calificar nombres ambiguos cuando corresponda |
| `SELECT nombre FROM ▏` | Tablas y vistas del esquema actual |
| `… WHERE p.▏`, `… ORDER BY p.▏` | Columnas accesibles en ese contexto |
| CTE y subconsulta con alias | Proyección reconocida de forma conservadora; no afirmar resolución de expresiones que no se analicen |

Antes de terminar FROM puede ofrecer una alternativa explícita de columnas del esquema, identificada por tabla; al existir contexto se prioriza el origen resuelto. No ejecuta el documento para averiguar qué sugerir. Si falla el análisis, mantiene palabras clave y alternativas conservadoras, sin mezclar columnas de una tabla equivocada.

CREATE/ALTER/DROP, vistas, COMMIT, ROLLBACK y reinicio refrescan la inspección y la versión de esquema. Las columnas nuevas aparecen, las eliminadas desaparecen y las revertidas vuelven a su estado anterior. Las peticiones llevan workspace, archivo, revisión y generación; se abortan o descartan respuestas obsoletas. El menú nunca queda asociado a una edición anterior ni al perfil pandas.

Se comprueban tanto las opciones ofrecidas como la inserción real con teclado y toque. Mostrar una palabra clave y capturar una pantalla no basta para acreditar columnas. La causa del fallo actual se determina en la fase roja; no se prescribe eliminar todos los proveedores y sustituirlos por sugerencias estáticas.

## 9. Arquitectura y rendimiento

Se conserva React, Docusaurus, TypeScript, MDX, Webpack, CSS Modules, CodeMirror, SQLite WASM y el aislamiento de ejecución existente. Esta entrega no migra de bundler ni introduce otro editor.

Cambios previstos, con rutas orientativas:

| Responsabilidad | Ubicación actual / extensión |
| --- | --- |
| IDs, ubicaciones y árbol | `src/content/concepts.ts`, `catalog.ts`, `areas.ts` y un registro SQL modular |
| Cuerpos y variantes | `src/content/notes/sql.ts` pasa a módulos por grupo, con adaptación de las páginas existentes |
| Fichas y navegación | `ConceptNote`, `SqlNotes`, catálogo, sidebar, búsqueda y enlaces de ubicación |
| Dataset y semilla | `src/practice/datasets/`, manifiesto, adaptador/materializador y scripts estáticos por dialecto |
| Perfil y migración | `profiles.ts`, `editor-bootstrap.ts`, contexto y persistencia de workspaces |
| Regiones de práctica | `PracticePanel`, `PracticeEditor`, `PracticeResults` y reglas de layout |
| Sugerencias | `editor-language.ts`, adaptador SQLite y actualización del esquema del manager |

La metadata ligera no importa todos los cuerpos, las filas ni los motores. El índice de búsqueda se carga bajo demanda como ahora; no se insertan seis copias de una ficha en él. Buscar acepta nombres y equivalentes del dialecto: por ejemplo, encontrar el concepto de límite con TOP sin crear otro favorito para la misma idea.

El dataset, CodeMirror y WASM siguen fuera de la descarga inicial. Los cuerpos se dividen por grupos; cambiar dialecto carga únicamente las diferencias necesarias. No se importan todos los scripts externos de preparación para pintar el selector. La inspección usa vistas previas acotadas y reutiliza metadata; escribir no vuelve a materializar las trece tablas.

Se toma una referencia antes de implementar y se comparan JS/CSS iniciales, carga diferida, apertura de práctica, cambio de concepto/dialecto y latencia de completado. Para el completado local con este dataset se propone p95 ≤100 ms en contexto caliente, medido con treinta muestras por escenario en celular y laptop de referencia. Si no se cumple, se corrige y se conserva la medición; no se amplía el presupuesto solo para aprobar. Las cifras no se llaman INP de campo.

## 10. TDD y comprobaciones

Cada cambio de comportamiento registra una expectativa, un fallo funcional real contra la versión anterior, la corrección mínima y su comprobación. Un binario ausente, ENOSPC, EPERM o módulo sin instalar no cuenta como rojo funcional. Las fases no repiten toda la suite por cada edición de texto.

| Área | Pruebas necesarias |
| --- | --- |
| Importación/editorial | Inventario de 99 fuentes, once vacíos resueltos, cobertura de 34 grupos y orden, definición inicial, IDs únicos y trazabilidad de cambios |
| Contenido modular | Resolver cuerpo/variante, desconocidos, equivalentes, contenido no disponible, rutas directas y carga tardía |
| Navegación | Árbol compartido, grupos contraídos, categorías que solo despliegan, hojas que navegan, ruta previa válida, mismo favorito/reciente y workspace en ambas áreas |
| Dataset | Semilla determinista, tipos efectivos, todas las FK/UNIQUE/CHECK reales, estados NULL/empates/ausencias, migración y reconstrucción |
| SQL real | Cada ejemplo SQLite desde semilla limpia; secuencias declaradas para DDL/DML, varias tablas, consultas avanzadas y transacciones entre ejecuciones |
| Dialectos externos | Fuente oficial y versión por variante; scripts revisados y sin afirmaciones de ejecución en un motor no probado |
| Sugerencias | Contexto sin alias, con alias, JOIN, prefijo, inserción, esquema mutado/revertido, errores y respuestas obsoletas |
| Panel | Orden Datos/Editor/Resultado, dos regiones antes de ejecutar y tercera al ejecutar; sin pestañas excluyentes, editor único y scroll contenido |
| Accesibilidad | Teclado/toque, foco, regiones, plegado, anuncios, Cmd/Ctrl+Enter, IME, 200%, 320 px y teclado virtual |
| Persistencia | Borrador anterior recuperable, conflictos entre conexiones, recarga, memoria de respaldo y ausencia de ejecución automática |
| Regresión | pandas, búsqueda, temas, favoritos, recientes, ocho acentos, datos/reinicio, cancelación, timeout y aislamiento |

Los resultados editoriales se contrastan con ejecuciones reales cuando son SQLite. Una operación destructiva usa una VM limpia en el test y prerequisitos declarados; el lector conserva una sola sesión libre. Si una salida no tiene ORDER BY, las pruebas no atribuyen garantía de orden a filas que SQL no ordena.

Los seis dialectos se verifican documentalmente contra versiones registradas; si se usa un motor externo real durante desarrollo se conserva su resultado separado. Un análisis estático o una prueba SQLite no se rotula como una ejecución de los seis motores.

Se comprueba la interfaz en los siete tamaños Chromium actuales y en Firefox/WebKit estrecho, tableta y escritorio, concentrando allí los recorridos pertinentes. Se descubren los casos aplicables antes de cerrar; el SDD no fija un número inventado de pruebas aprobadas. Las omisiones necesitan motivo y cobertura alternativa.

La nueva interfaz y dataset cambiarán capturas legítimamente. Primero se inspeccionan y aprueban las imágenes afectadas; después se comparan sin actualización. Las evidencias anteriores permanecen intactas y el umbral visual no se amplía para ocultar un defecto.

## 11. Secuencia de implementación

Cada punto termina en una entrega revisable y evidencia de sus comprobaciones. La implementación se realiza por punto a petición del usuario; la petición del primero no activa los siguientes.

| Punto | Entrega | Cierre del punto |
| --- | --- | --- |
| 1 | Inventario definitivo, árbol SQL, contratos de variante/ubicación/ejecución y matriz de capacidades | Completado: 99 fuentes con snapshot/hash y destino, 34 grupos y 153 destinos; cinco IDs/rutas conservados, contratos y matriz de seis dialectos con revisión explícita o pendiente; 14 pruebas nuevas, 289 de código en total, tipos y build aprobados. [Evidencia](verification/sql-point-1.md) |
| 2 | Dataset `negocio-relacional@1`, restricciones, preparación/migración de SQL y exportaciones por dialecto | Completado: 13 tablas, 379 filas, restricciones, transacciones, reinicio, migración y seis exportaciones; pandas conserva su dataset. [Evidencia](verification/sql-point-2.md) |
| 3 | Renderer modular, primer bloque SELECT → CAST y selector de dialecto | Completado: 53 fichas en 14 grupos, 61 ejemplos SQLite, selector de seis dialectos y acciones locales explícitas; rutas anteriores conservadas, 368 pruebas de código y 88 de UI aprobadas, dos omisiones previstas, tipos y build correctos. [Evidencia](verification/sql-point-3.md) |
| 4 | Segundo bloque: funciones de texto → CREATE TABLE | Completado: 52 fichas nuevas, 55 ejemplos SQLite WASM y seis dialectos revisados; 377 pruebas de código, tipos y build aprobados. Comparación final UI: 98 aprobadas y dos omisiones previstas, diez capturas revisadas y otras 225 referencias intactas. [Evidencia](verification/sql-point-4.md) |
| 5 | Tercer bloque: ALTER TABLE → Transacciones | Completado: 48 fichas nuevas y 50 programas SQLite WASM; 153 destinos completos, 99 fuentes revisadas y once vacíos cubiertos. 386 pruebas de código, tipos y build aprobados; comparación final UI con 130 aprobadas y dos omisiones previstas, catorce capturas revisadas y otras 229 referencias intactas. [Evidencia](verification/sql-point-5.md) |
| 6 | Catálogo/sidebars SQL colapsables y entrada compartida en Lenguajes | Completado: árbol de 34 grupos, 153 rutas compartidas y sesión SQLite común; 393 pruebas de código, tipos y build aprobados. Comparación final UI: 153 aprobados y tres omisiones previstas, sin fallos, errores globales ni reintentos. Las 45 capturas revisadas conservan sus hashes y otras 208 referencias siguen intactas. [Evidencia](verification/sql-point-6.md) |
| 7 | Panel Datos → Editor → Resultado y adaptación compacta | Completado. Regiones compartidas, vista previa elegida, claves y relaciones vivas, resultado al ejecutar y editor persistente. 398 pruebas de código, tipos y builds aprobados. Comparación final: 134 aprobados y una omisión prevista; 34 imágenes revisadas sin cambios en sus hashes. [Evidencia](verification/sql-point-7.md) |
| 8 | Corrección del autocompletado y refinamiento de acciones de ejecución | Completado. Columnas contextuales, prefijos, alias, JOIN/CTE/subconsultas y esquema vivo; descarte de respuestas antiguas, selección/atajos, protección durante preparación/IME y recuperación tras cancelar/timeout. 415 pruebas de código, tipos y builds aprobados. Comparación final: 83 aprobados y una omisión prevista; cuatro capturas revisadas y otras 265 referencias intactas. [Evidencia](verification/sql-point-8.md) |
| 9 | Revisión editorial final, compatibilidad, comparación visual y medición | Completado. 420 pruebas de código, tipos y builds aprobados. Chromium acredita 873 casos y nueve omisiones previstas. Firefox y WebKit acreditan 168 casos funcionales, 26 visuales y 66 específicos de SQL. El p95 máximo de completado quedó en 83.7 ms en celular y 85.4 ms en laptop. [Evidencia](verification/sql-point-9.md) |

En los bloques editoriales, una variante aún sin revisar se conserva como pendiente de trabajo y no se publica como compatible. El trabajo puede subdividir cada punto en commits, manteniendo un estado explícito de lo publicado. Implementar el primer punto significa solo la base de contratos e inventario, no toda la tabla.

## 12. Criterios de aceptación global

| ID | Condición |
| --- | --- |
| SA-01 | Los 34 grupos y las 99 fuentes están cubiertos o unificados con motivo; no queda un concepto publicado vacío |
| SA-02 | Orden respetado, nombres sin numeración, Definición inicial y dependientes bajo su concepto; navegación directa abre ancestros |
| SA-03 | Explicaciones pedagógicas breves y ejemplos de negocio correctos; las reglas importantes están junto al concepto |
| SA-04 | Los seis dialectos tienen resolución explícita, fuentes/versiones y selector persistente; no hay variantes implícitas o páginas en blanco |
| SA-05 | Análisis de datos y Lenguajes usan el mismo contenido y la misma identidad de concepto/práctica, sin duplicar favoritos/recientes/borradores |
| SA-06 | El dataset único contiene relaciones y casos avanzados comprobados; cambiar de lección no reemplaza ni limita sus datos |
| SA-07 | PK/FK/UNIQUE/CHECK y reinicio son reales; la inspección muestra los cambios y las transacciones conservan su semántica |
| SA-08 | Se ven Datos arriba y Editor debajo; ejecutar añade Resultado debajo, sin ocultar el código mediante pestañas excluyentes |
| SA-09 | Móvil/iPad, teclado virtual, rotación, 320 px y 200% conservan legibilidad, foco, editor y desplazamiento contenido |
| SA-10 | Tablas y columnas se sugieren e insertan correctamente, incluidos alias/JOIN y actualizaciones del esquema; sin ejecutar para completar |
| SA-11 | Botón y Cmd/Ctrl+Enter ejecutan explícitamente selección o documento; carga, error, cancelación y timeout no dejan acciones pendientes |
| SA-12 | El editor anuncia SQLite y las variantes externas ofrecen copiar/preparar o un equivalente explícito; no se atribuye ejecución a otro RDBMS |
| SA-13 | Borradores anteriores recuperables, migración idempotente y regresión de pandas/almacenamiento/navegación aprobadas |
| SA-14 | Contenido, filas, editor y motores mantienen carga diferida; mediciones comparables y presupuesto de completado verificado |
| SA-15 | TDD, SQL real, UI pertinente en tres motores, referencias revisadas y comparación posterior sin actualización tienen evidencia trazable |

## 13. Fuentes consultadas y alcance de sus afirmaciones

Consultadas el 21 de noviembre de 2026. Las versiones de producto objetivo se fijan de nuevo durante la implementación; estas referencias no se presentan como una comprobación de que todos sus motores estén instalados.

| Fuente | Uso en esta especificación |
| --- | --- |
| [Aprende SQL](https://www.aprendesql.dev/), [SELECT](https://www.aprendesql.dev/consultas-select-basicas), [Transacciones](https://www.aprendesql.dev/transacciones) | Referencia aportada por el usuario para cobertura y práctica; se contrastan sus ejemplos, no se asume su arquitectura interna |
| [SQLite: SELECT](https://sqlite.org/lang_select.html) | Sintaxis, límites y resultado de consultas en el motor local |
| [SQLite: conflictos](https://sqlite.org/lang_conflict.html) | Revisar IGNORE/REPLACE y efectos de errores |
| [SQLite: claves foráneas](https://sqlite.org/foreignkeys.html) | Integridad referencial real al preparar la conexión |
| [SQLite: transacciones](https://sqlite.org/lang_transaction.html) | Sesión viva entre ejecuciones y semántica de confirmar/revertir |
| [SQLite: ventanas](https://sqlite.org/windowfunctions.html) e [índices/optimizador](https://sqlite.org/optoverview.html#skipscan) | Marcos de ventana y evitar reglas absolutas de optimización |
| [PostgreSQL: SELECT](https://www.postgresql.org/docs/current/sql-select.html) | Variante documental PostgreSQL |
| [MySQL: SELECT](https://dev.mysql.com/doc/refman/8.4/en/select.html) | Variante documental MySQL; no se toma esta versión de referencia como etiqueta «latest» |
| [SQL Server: SELECT](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17) | Variante documental T-SQL y TOP |
| [MariaDB: SELECT](https://mariadb.com/docs/server/reference/sql-statements/data-manipulation/selecting-data/select) | Variante documental MariaDB |
| [Oracle SQL: SELECT](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/SELECT.html) | Variante documental Oracle SQL, diferenciada de PL/SQL |
| [CodeMirror SQL](https://github.com/codemirror/lang-sql) y [proveedor de completado](https://github.com/codemirror/lang-sql/blob/main/src/complete.ts) | Base técnica para resolver tablas, columnas y alias sin resultados ficticios |

La elección de las trece tablas, el diseño de regiones, el modo móvil, la nueva ubicación Lenguajes y la secuencia de entrega son decisiones de este SDD a partir de las necesidades del usuario. Las fuentes externas documentan las variantes de cada dialecto. Las pruebas de ejecución corresponden a SQLite y el informe del punto 9 registra la implementación, las comparaciones visuales y las mediciones finales. [Evidencia de cierre](verification/sql-point-9.md).
