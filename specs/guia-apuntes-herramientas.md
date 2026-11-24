# Cómo preparar apuntes de una herramienta para AllDoc

Usa el contexto que ya tienes sobre la herramienta, mi formación y los temas que quiero cubrir. Entrega uno o varios grupos de apuntes de esa herramienta en **un solo archivo Markdown**. La finalidad es encontrar un concepto, recordarlo con pocas líneas y ver cómo se usa en un ejemplo concreto.

## Cómo está organizado SQL en la app

```text
Área
└── Herramienta
    └── Grupo colapsable
        ├── Definición
        ├── Variante o subtema
        └── Variante o subtema
```

- **Área.** SQL aparece en Análisis de datos y Lenguajes. Ambas entradas abren las mismas fichas y comparten su identidad para búsqueda, favoritos, recientes y práctica.
- **Herramienta.** Pulsar SQL despliega sus grupos. Pulsar un grupo despliega sus fichas. Se entra a una página al elegir una ficha.
- **Grupo.** Reúne un tema y sus variantes en orden de aprendizaje. Su primera ficha se llama **Definición**. El catálogo empieza contraído y un enlace directo a una ficha abre sus grupos en el sidebar.
- **Ficha.** Presenta una definición breve, uno o varios ejemplos concretos, un recordatorio y una aclaración cuando hace falta. El resultado de cada ejemplo puede consultarse en un desplegable. Una ficha introductoria puede mostrar varias formas breves de hacer lo mismo y dejar la explicación detallada en las demás fichas del grupo.
- **Práctica.** Los ejemplos compatibles tienen la acción «Probar este ejemplo». El panel muestra Datos, Editor y, después de ejecutar, Resultado. Abrir un ejemplo prepara el código para que el usuario decida cuándo ejecutarlo.

### Árbol publicado de SQL

El orden de la tabla es el del catálogo. Cada grupo empieza por **Definición** y después muestra las fichas de la segunda columna. Son **34 grupos y 153 fichas** en total. Usa esta jerarquía como referencia y decide el número de grupos y fichas según el alcance de la nueva herramienta.

| Grupo | Fichas después de Definición |
| --- | --- |
| SELECT | Todas las columnas · Columnas concretas · Alias AS · Comentarios |
| LIMIT | Máximo de filas · OFFSET |
| WHERE | Operadores · Texto, números y fechas · AND · OR · NOT · AND, OR y NOT |
| BETWEEN | Extremos incluidos · NOT BETWEEN |
| IN | Lista de valores · NOT IN |
| LIKE | Comodines % y _ · NOT LIKE |
| ORDER BY | ASC · DESC · Varias columnas · ORDER BY y LIMIT |
| DISTINCT | Una columna · Combinación de columnas |
| JOIN | Condición ON · Alias de tablas · Self join · CROSS JOIN |
| JOIN externos | LEFT JOIN · RIGHT JOIN · FULL OUTER JOIN · Anti join |
| NULL | IS NULL · IS NOT NULL · NULLIF |
| COALESCE | Varios valores alternativos |
| CASE WHEN | Condiciones y ELSE |
| CAST | Conversión explícita · Tipos por motor |
| Funciones de texto | UPPER · LOWER · Longitud · Subcadena · TRIM · REPLACE · Concatenación |
| Funciones numéricas | ROUND · ABS · División y redondeo |
| Agregación | COUNT · SUM · AVG · MIN · MAX · Concatenación agregada · Combinar agregados · Agregados con WHERE |
| GROUP BY | Agrupar varias columnas · HAVING · WHERE y HAVING |
| Orden de ejecución | Orden lógico · Orden lógico y plan físico |
| INSERT INTO | Columnas explícitas · Varias filas · Valores sin lista de columnas · Conflictos: IGNORE · Conflictos: REPLACE |
| UPDATE | Modificar varias columnas · Comprobar con SELECT |
| DELETE | Eliminar con condición · Comprobar con SELECT |
| CREATE TABLE | Tipos de datos · IF NOT EXISTS · PRIMARY KEY · NOT NULL · UNIQUE · DEFAULT · CHECK · FOREIGN KEY · Varias claves foráneas · ON DELETE CASCADE · ON DELETE SET NULL |
| ALTER TABLE | Añadir columna · Renombrar columna · Renombrar tabla · Eliminar columna |
| DROP TABLE | IF EXISTS |
| Vistas | CREATE VIEW · Vista con JOIN · Creación condicional · Reemplazar vista · DROP VIEW |
| Índices | Índice simple y compuesto · Índice UNIQUE · Consultar índices · DROP INDEX |
| Subconsultas | Subconsulta en WHERE · Subconsulta en IN · Subconsulta en SELECT · EXISTS · NOT EXISTS |
| UNION | UNION ALL · ORDER BY del resultado combinado |
| INTERSECT | Columnas compatibles |
| EXCEPT | Equivalentes por motor |
| CTE | WITH · Múltiples CTE |
| Funciones de ventana | OVER · PARTITION BY · PARTITION BY y ORDER BY · Marco de filas · ROW_NUMBER · RANK y DENSE_RANK · LAG y LEAD · Agregados de ventana |
| Transacciones | Iniciar transacción · COMMIT · ROLLBACK · Autocommit |

### Ejemplo de una ficha de SQL

La ficha introductoria de **SELECT** reúne dos operaciones básicas. Sus fichas de detalle amplían cada una y el grupo también contiene Alias AS y Comentarios. En la app, el selector permite leer variantes de seis dialectos. El editor de práctica ejecuta SQLite.

**Definición**

`SELECT` elige qué columnas quieres ver. `FROM` indica de qué tabla salen los datos.

**Todas las columnas**

```sql
SELECT * FROM productos;
```

El asterisco pide todas las columnas. El resultado tiene una fila por producto.

**Columnas concretas**

```sql
SELECT nombre, precio FROM productos;
```

Separa los nombres con comas. El resultado muestra `nombre` y `precio` en ese orden.

**Para recordar**

`SELECT` elige las columnas. `FROM` indica la tabla.

## Cómo redactar el contenido de la nueva herramienta

1. **Ordena por dependencia.** Presenta un concepto antes de usarlo o explícalo en su primer ejemplo. Introduce sus variantes juntas y deja las combinaciones para cuando ya se entiendan sus piezas. En SQL, `FROM` se explica junto a `SELECT`, y `ASC` y `DESC` pertenecen a `ORDER BY`.
2. **Escribe para recordar.** La definición dice qué hace el concepto y cuándo usarlo en una o dos frases. Incluye una regla útil, un error común o un efecto fácil de olvidar cuando ayude a entender el ejemplo. Usa vocabulario directo y explica un término imprescindible la primera vez que aparece.
3. **Enseña una acción por ejemplo.** Pon títulos que digan qué se consigue, como «Mostrar nombre y precio». Prioriza contextos de negocio y ejemplos cortos que dejen el código principal a la vista. Separa ejemplos cuando cambien la sintaxis, el resultado o la decisión que debe tomar quien lee.
4. **Describe resultados comprobables.** Para una tabla, indica columnas y filas cuando el resultado esté determinado. Para código sin tabla, describe el valor, la salida, el cambio observable o el error esperado. Si el orden de filas importa, hazlo explícito en el ejemplo. Llama «esperado» al resultado que todavía no se haya ejecutado.
5. **Reutiliza datos.** Si la herramienta necesita datos, propone un dataset compartido o utiliza el que ya se te dio. Incluye sus campos, registros de ejemplo, relaciones o preparación suficientes para reproducir los resultados. Si un ejemplo cambia datos o depende de otro, indica el estado inicial y los pasos en orden. Si la herramienta se usa mediante una interfaz, sustituye el código por pasos breves y un resultado visible.
6. **Indica el entorno cuando afecte al ejemplo.** Para funciones, fórmulas, variantes, versiones o plataformas con diferencias importantes, da la sintaxis o el procedimiento que corresponde a cada una. Si la práctica requiere una aplicación externa, un servicio o una biblioteca, indica ese requisito. Incluye las fuentes oficiales de las diferencias y de las reglas que necesiten verificación.

## Formato del Markdown que vas a entregar

Entrega `<herramienta>.md` con las fichas completas del alcance acordado. El orden del documento es el orden del catálogo. Usa `##` para cada grupo, `###` para cada ficha y `####` para cada ejemplo de una ficha. «Datos compartidos» y «Fuentes» son anexos del documento. Dentro de cada grupo empieza con `### Definición` y repite el formato de ficha en las demás subsecciones. Las claves permiten identificar las fichas y crear rutas estables. Escríbelas en minúsculas y con guiones, como `seleccion-de-columnas`. Mantén los nombres técnicos en los títulos visibles, como `loc` o `DataFrame`.

````markdown
# <Nombre de la herramienta>

**Clave** `nombre-de-la-herramienta`

**Área** <ubicación en AllDoc, si se conoce>

**Resumen** <una frase para el catálogo>

**Alcance** <conceptos que cubre esta entrega>

**Entorno** <lenguaje, aplicación o versión, cuando afecte a los ejemplos>

## Datos compartidos

<Si aplica, incluye la preparación y los campos o filas necesarios para reproducir
los ejemplos. Cuando se use un dataset de AllDoc, identifica cuál y sus entidades.>

## <Primer grupo>

**Clave** `primer-grupo`

### Definición

**Clave** `definicion`

**Definición** <Qué hace y cuándo usarlo, en una o dos frases.>

**Búsqueda** <términos y preguntas cortas que usaría para encontrar esta ficha>

**Para recordar** <la regla que quiero recuperar al volver a esta ficha>

**Nota** <solo si hay un requisito, una diferencia o un error importante>

#### <Título de lo que logra el ejemplo>

```<lenguaje>
<Código breve. Para una herramienta visual, usa pasos en lugar del bloque.>
```

<Una frase que señale la parte relevante del ejemplo.>

**Resultado esperado** <valor, tabla, salida o cambio observable>

### <Variante o subtema>

**Clave** `nombre-de-la-variante`

<Repite la estructura de la ficha con su propio ejemplo y resultado.>

## Fuentes

- <Enlace oficial y ficha, API o comportamiento concreto que respalda.>
````

Antes de entregar, revisa que las claves de los grupos y las de las fichas dentro de cada grupo sean únicas, que el contexto de los ejemplos alcance para reproducirlos y que la explicación siga siendo breve. Incluye más de un `####` en una ficha cuando sean necesarias varias formas de hacer la misma operación. Entrega el contenido editorial en Markdown para que la integración de rutas, componentes y práctica se haga en AllDoc.

## Referencias de AllDoc

- El currículo fija el orden y las etiquetas visibles de SQL. [Árbol de SQL](../src/content/sql/curriculum.ts)
- El apunte de SELECT muestra cómo se reúnen las primeras variantes. [Ficha de SELECT](../src/content/notes/sql/select.ts)
- Ambos accesos de SQL renderizan la misma ficha. [Análisis de datos](../docs/analisis-de-datos/sql/select.mdx) · [Lenguajes](../docs/lenguajes/sql/select/definicion.mdx)
- El SDD y su cierre recogen el alcance editorial, la práctica y la verificación. [SDD de SQL](sql-sdd.md) · [Cierre de SQL](verification/sql-point-9.md)
