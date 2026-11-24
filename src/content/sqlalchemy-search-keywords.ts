// Generado desde specs/sqlalchemy.md por scripts/prepare-sqlalchemy-notes.mjs.
export const sqlalchemyKeywords: Readonly<Record<string, readonly string[]>> = {
  "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/definicion": [
    "Definición",
    "Contar pedidos con SQL directo"
  ],
  "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/instalacion": [
    "Instalación",
    "Instalar en el entorno activo"
  ],
  "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/core-frente-a-orm": [
    "Core frente a ORM",
    "Comparar dos consultas equivalentes"
  ],
  "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/dbapi-dialecto-y-driver": [
    "DBAPI, dialecto y driver",
    "Identificar SQLite y su controlador"
  ],
  "analisis-de-datos/sqlalchemy/sqlalchemy-arquitectura/api-2-0-y-codigo-legado": [
    "API 2.0 y código legado",
    "Consultar con la API 2.0"
  ],
  "analisis-de-datos/sqlalchemy/engine/definicion": [
    "Definición",
    "Crear y probar un motor local"
  ],
  "analisis-de-datos/sqlalchemy/engine/url-de-conexion": [
    "URL de conexión",
    "Inspeccionar una URL local"
  ],
  "analisis-de-datos/sqlalchemy/engine/url-create": [
    "URL.create()",
    "Construir una URL PostgreSQL sin abrir conexión"
  ],
  "analisis-de-datos/sqlalchemy/engine/drivers-por-motor": [
    "Drivers por motor",
    "Comparar prefijos sin conectarse"
  ],
  "analisis-de-datos/sqlalchemy/engine/credenciales-y-variables-de-entorno": [
    "Credenciales y variables de entorno",
    "Leer una configuración de ejemplo"
  ],
  "analisis-de-datos/sqlalchemy/engine/connect-args-creator-y-tls": [
    "connect_args, creator y TLS",
    "Ajustar timeout de SQLite"
  ],
  "analisis-de-datos/sqlalchemy/engine/echo-logging-y-hide-parameters": [
    "echo, logging y hide_parameters",
    "Configurar diagnóstico sin imprimir valores"
  ],
  "analisis-de-datos/sqlalchemy/engine/dispose": [
    "dispose()",
    "Desechar un motor de ejemplo"
  ],
  "analisis-de-datos/sqlalchemy/connection/definicion": [
    "Definición",
    "Ejecutar una consulta textual"
  ],
  "analisis-de-datos/sqlalchemy/connection/connect-y-close": [
    "connect() y close()",
    "Comprobar el cierre"
  ],
  "analisis-de-datos/sqlalchemy/connection/text-y-execute": [
    "text() y execute()",
    "Leer nombres con SQL escrito a mano"
  ],
  "analisis-de-datos/sqlalchemy/connection/exec-driver-sql": [
    "exec_driver_sql()",
    "Usar un placeholder SQLite"
  ],
  "analisis-de-datos/sqlalchemy/connection/raw-connection": [
    "raw_connection()",
    "Consultar con cursor DBAPI"
  ],
  "analisis-de-datos/sqlalchemy/connection/execution-options": [
    "execution_options()",
    "Consultar una opción personalizada"
  ],
  "analisis-de-datos/sqlalchemy/parametros/definicion": [
    "Definición",
    "Filtrar con parámetro nombrado"
  ],
  "analisis-de-datos/sqlalchemy/parametros/bindparam": [
    "bindparam()",
    "Consultar un umbral variable"
  ],
  "analisis-de-datos/sqlalchemy/parametros/bindparams-y-columns": [
    "bindparams() y columns()",
    "Declarar una columna textual"
  ],
  "analisis-de-datos/sqlalchemy/parametros/expanding-true": [
    "expanding=True",
    "Filtrar varios clientes dinámicamente"
  ],
  "analisis-de-datos/sqlalchemy/parametros/sql-injection-e-identificadores": [
    "SQL injection e identificadores",
    "Tratar una entrada maliciosa como valor literal"
  ],
  "analisis-de-datos/sqlalchemy/parametros/identificadores-dinamicos-permitidos": [
    "Identificadores dinámicos permitidos",
    "Ordenar por una columna permitida"
  ],
  "analisis-de-datos/sqlalchemy/resultados/definicion": [
    "Definición",
    "Leer una fila"
  ],
  "analisis-de-datos/sqlalchemy/resultados/all-y-fetchall": [
    "all() y fetchall()",
    "Leer todos los nombres"
  ],
  "analisis-de-datos/sqlalchemy/resultados/fetchone-y-fetchmany": [
    "fetchone() y fetchmany()",
    "Leer una fila y luego dos"
  ],
  "analisis-de-datos/sqlalchemy/resultados/first": [
    "first()",
    "Leer el primer cliente"
  ],
  "analisis-de-datos/sqlalchemy/resultados/one-y-one-or-none": [
    "one() y one_or_none()",
    "Validar una búsqueda única"
  ],
  "analisis-de-datos/sqlalchemy/resultados/scalar-y-scalars": [
    "scalar() y scalars()",
    "Obtener IDs como lista"
  ],
  "analisis-de-datos/sqlalchemy/resultados/scalar-one-y-scalar-one-or-none": [
    "scalar_one() y scalar_one_or_none()",
    "Buscar una clave inexistente"
  ],
  "analisis-de-datos/sqlalchemy/resultados/row-mappings-y-mapping": [
    "Row, mappings() y _mapping",
    "Convertir filas a diccionarios"
  ],
  "analisis-de-datos/sqlalchemy/resultados/keys-columns-y-unique": [
    "keys(), columns() y unique()",
    "Elegir una columna y deduplicar"
  ],
  "analisis-de-datos/sqlalchemy/resultados/partitions-iteracion-y-close": [
    "partitions(), iteración y close()",
    "Leer IDs por lotes"
  ],
  "analisis-de-datos/sqlalchemy/resultados/rowcount-y-claves-insertadas": [
    "rowcount y claves insertadas",
    "Insertar y comprobar clave"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/definicion": [
    "Definición",
    "Confirmar un cambio"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/autobegin-y-begin": [
    "Autobegin y begin()",
    "Inspeccionar el inicio automático"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/commit-y-rollback": [
    "commit() y rollback()",
    "Revertir una modificación"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/engine-begin-y-excepciones": [
    "engine.begin() y excepciones",
    "Cancelar una carga fallida"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/begin-nested-y-savepoints": [
    "begin_nested() y savepoints",
    "Revertir únicamente el segundo cambio"
  ],
  "analisis-de-datos/sqlalchemy/transacciones/aislamiento-y-autocommit": [
    "Aislamiento y AUTOCOMMIT",
    "Consultar aislamiento SQLite"
  ],
  "analisis-de-datos/sqlalchemy/errores/definicion": [
    "Definición",
    "Detectar una clave primaria repetida"
  ],
  "analisis-de-datos/sqlalchemy/errores/dbapierror-y-diagnostico": [
    "DBAPIError y diagnóstico",
    "Detectar una tabla inexistente"
  ],
  "analisis-de-datos/sqlalchemy/errores/integrityerror-dataerror-y-programmingerror": [
    "IntegrityError, DataError y ProgrammingError",
    "Detectar una clave foránea inválida"
  ],
  "analisis-de-datos/sqlalchemy/errores/operationalerror-timeouterror-y-disconnectionerror": [
    "OperationalError, TimeoutError y DisconnectionError",
    "Simular un fallo operativo controlado"
  ],
  "analisis-de-datos/sqlalchemy/errores/noresultfound-y-multipleresultsfound": [
    "NoResultFound y MultipleResultsFound",
    "Comprobar una búsqueda sin resultado"
  ],
  "analisis-de-datos/sqlalchemy/errores/statementerror-e-invalidrequesterror": [
    "StatementError e InvalidRequestError",
    "Detectar un parámetro no suministrado"
  ],
  "analisis-de-datos/sqlalchemy/metadatos/definicion": [
    "Definición",
    "Inspeccionar las columnas compartidas"
  ],
  "analisis-de-datos/sqlalchemy/metadatos/table-y-column": [
    "Table y Column",
    "Definir una tabla de referencia"
  ],
  "analisis-de-datos/sqlalchemy/metadatos/create-all-y-drop-all": [
    "create_all() y drop_all()",
    "Crear y eliminar una tabla aislada"
  ],
  "analisis-de-datos/sqlalchemy/metadatos/schema-y-naming-convention": [
    "schema y naming_convention",
    "Nombrar una restricción automáticamente"
  ],
  "analisis-de-datos/sqlalchemy/metadatos/ddl-explicito-y-alter-table": [
    "DDL explícito y ALTER TABLE",
    "Generar el DDL sin ejecutarlo"
  ],
  "analisis-de-datos/sqlalchemy/tipos/definicion": [
    "Definición",
    "Consultar los tipos de las columnas"
  ],
  "analisis-de-datos/sqlalchemy/tipos/integer-biginteger-float-y-numeric": [
    "Integer, BigInteger, Float y Numeric",
    "Declarar precisión y escala"
  ],
  "analisis-de-datos/sqlalchemy/tipos/string-text-char-y-unicode": [
    "String, Text, CHAR y Unicode",
    "Ver tipos declarados"
  ],
  "analisis-de-datos/sqlalchemy/tipos/date-datetime-time-y-interval": [
    "Date, DateTime, Time y Interval",
    "Leer una fecha como objeto Python"
  ],
  "analisis-de-datos/sqlalchemy/tipos/boolean-enum-largebinary-y-uuid": [
    "Boolean, Enum, LargeBinary y Uuid",
    "Crear tipos de una tabla auxiliar"
  ],
  "analisis-de-datos/sqlalchemy/tipos/json-y-array": [
    "JSON y ARRAY",
    "Guardar y leer JSON"
  ],
  "analisis-de-datos/sqlalchemy/tipos/cast-y-type-coerce": [
    "cast() y type_coerce()",
    "Convertir un monto a texto"
  ],
  "analisis-de-datos/sqlalchemy/tipos/with-variant-y-tipos-por-dialecto": [
    "with_variant() y tipos por dialecto",
    "Compilar un tipo distinto en PostgreSQL"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/definicion": [
    "Definición",
    "Inspeccionar claves existentes"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/primary-key-unique-y-not-null": [
    "PRIMARY KEY, UNIQUE y NOT NULL",
    "Declarar restricciones de una tabla"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/foreignkey-claves-compuestas-y-cascade": [
    "ForeignKey, claves compuestas y CASCADE",
    "Inspeccionar una clave foránea"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/checkconstraint-y-uniqueconstraint": [
    "CheckConstraint y UniqueConstraint",
    "Crear restricciones de negocio"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/default-server-default-y-onupdate": [
    "default, server_default y onupdate",
    "Insertar usando valores por defecto"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/identity-sequence-y-autoincrement": [
    "Identity, Sequence y autoincrement",
    "Generar una clave automáticamente"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/computed": [
    "Computed()",
    "Calcular un importe en la base"
  ],
  "analisis-de-datos/sqlalchemy/restricciones/index-e-indices-compuestos": [
    "Index() e índices compuestos",
    "Crear e inspeccionar un índice"
  ],
  "analisis-de-datos/sqlalchemy/reflection/definicion": [
    "Definición",
    "Descubrir tablas"
  ],
  "analisis-de-datos/sqlalchemy/reflection/autoload-with": [
    "autoload_with",
    "Reflejar pedidos y consultar sus columnas"
  ],
  "analisis-de-datos/sqlalchemy/reflection/metadata-reflect": [
    "metadata.reflect()",
    "Reflejar clientes y pedidos"
  ],
  "analisis-de-datos/sqlalchemy/reflection/get-columns-y-get-foreign-keys": [
    "get_columns() y get_foreign_keys()",
    "Consultar columnas y destino de FK"
  ],
  "analisis-de-datos/sqlalchemy/reflection/vistas-e-indices": [
    "Vistas e índices",
    "Crear y descubrir una vista"
  ],
  "analisis-de-datos/sqlalchemy/reflection/reflection-parcial-y-extend-existing": [
    "Reflection parcial y extend_existing",
    "Reflejar únicamente id y monto"
  ],
  "analisis-de-datos/sqlalchemy/select/definicion": [
    "Definición",
    "Consultar todos los productos"
  ],
  "analisis-de-datos/sqlalchemy/select/columnas-concretas-y-c": [
    "Columnas concretas y .c",
    "Mostrar nombre y precio"
  ],
  "analisis-de-datos/sqlalchemy/select/select-from": [
    "select_from()",
    "Contar clientes"
  ],
  "analisis-de-datos/sqlalchemy/select/label-y-alias": [
    "label() y alias()",
    "Nombrar un importe"
  ],
  "analisis-de-datos/sqlalchemy/select/literal-literal-column-y-column": [
    "literal(), literal_column() y column()",
    "Combinar una constante y una expresión"
  ],
  "analisis-de-datos/sqlalchemy/select/true-false-y-null": [
    "true(), false() y null()",
    "Construir constantes SQL"
  ],
  "analisis-de-datos/sqlalchemy/select/add-columns-y-with-only-columns": [
    "add_columns() y with_only_columns()",
    "Ampliar y reducir una consulta"
  ],
  "analisis-de-datos/sqlalchemy/filtros/definicion": [
    "Definición",
    "Pedidos de al menos 200"
  ],
  "analisis-de-datos/sqlalchemy/filtros/comparaciones-y-fechas": [
    "Comparaciones y fechas",
    "Pedidos desde marzo"
  ],
  "analisis-de-datos/sqlalchemy/filtros/and-or-y-not": [
    "and_(), or_() y not_()",
    "Filtrar completados y de monto alto"
  ],
  "analisis-de-datos/sqlalchemy/filtros/operadores-y": [
    "Operadores &, | y ~",
    "Excluir pedidos pequeños y cancelados"
  ],
  "analisis-de-datos/sqlalchemy/filtros/in-y-not-in": [
    "in_() y not_in()",
    "Consultar dos países"
  ],
  "analisis-de-datos/sqlalchemy/filtros/between": [
    "between()",
    "Pedidos en un rango"
  ],
  "analisis-de-datos/sqlalchemy/filtros/like-e-ilike": [
    "like() e ilike()",
    "Buscar nombres con A al inicio"
  ],
  "analisis-de-datos/sqlalchemy/filtros/contains-startswith-y-endswith": [
    "contains(), startswith() y endswith()",
    "Buscar productos con prefijo M"
  ],
  "analisis-de-datos/sqlalchemy/filtros/tuple-any-y-all": [
    "tuple_(), any_() y all_()",
    "Filtrar pares cliente y monto"
  ],
  "analisis-de-datos/sqlalchemy/null-condiciones/definicion": [
    "Definición",
    "Encontrar clientes sin país"
  ],
  "analisis-de-datos/sqlalchemy/null-condiciones/is-e-is-not": [
    "is_() e is_not()",
    "Seleccionar pedidos con cupón"
  ],
  "analisis-de-datos/sqlalchemy/null-condiciones/func-coalesce": [
    "func.coalesce()",
    "Mostrar país desconocido"
  ],
  "analisis-de-datos/sqlalchemy/null-condiciones/func-nullif": [
    "func.nullif()",
    "Evitar división por cero"
  ],
  "analisis-de-datos/sqlalchemy/null-condiciones/case": [
    "case()",
    "Clasificar montos"
  ],
  "analisis-de-datos/sqlalchemy/orden-paginacion/definicion": [
    "Definición",
    "Mostrar los dos pedidos de mayor monto"
  ],
  "analisis-de-datos/sqlalchemy/orden-paginacion/asc-desc-y-varios-criterios": [
    "asc(), desc() y varios criterios",
    "Ordenar por monto y fecha"
  ],
  "analisis-de-datos/sqlalchemy/orden-paginacion/nulls-first-y-nulls-last": [
    "nulls_first() y nulls_last()",
    "Mostrar países desconocidos al final"
  ],
  "analisis-de-datos/sqlalchemy/orden-paginacion/limit-y-offset": [
    "limit() y offset()",
    "Leer la segunda página de dos clientes"
  ],
  "analisis-de-datos/sqlalchemy/orden-paginacion/distinct": [
    "distinct()",
    "Listar países conocidos"
  ],
  "analisis-de-datos/sqlalchemy/joins/definicion": [
    "Definición",
    "Cruzar pedidos y clientes"
  ],
  "analisis-de-datos/sqlalchemy/joins/join-con-condicion-explicita": [
    "join() con condición explícita",
    "Mostrar pedidos y nombres"
  ],
  "analisis-de-datos/sqlalchemy/joins/outerjoin-y-filtros-on": [
    "outerjoin() y filtros ON",
    "Contar completados incluyendo clientes sin pedidos"
  ],
  "analisis-de-datos/sqlalchemy/joins/right-join-y-full-outer-join": [
    "RIGHT JOIN y FULL OUTER JOIN",
    "Conservar clientes invirtiendo el lado lógico"
  ],
  "analisis-de-datos/sqlalchemy/joins/anti-join": [
    "Anti join",
    "Encontrar clientes sin pedidos"
  ],
  "analisis-de-datos/sqlalchemy/joins/self-join-y-alias": [
    "Self join y alias()",
    "Encontrar parejas de clientes del mismo país"
  ],
  "analisis-de-datos/sqlalchemy/joins/cross-join": [
    "CROSS JOIN",
    "Combinar clientes y productos"
  ],
  "analisis-de-datos/sqlalchemy/joins/join-from-y-varias-tablas": [
    "join_from() y varias tablas",
    "Obtener importe por categoría"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/definicion": [
    "Definición",
    "Redondear el promedio"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/texto-upper-lower-trim-y-length": [
    "Texto: upper, lower, trim y length",
    "Normalizar nombres"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/texto-substr-replace-y-concatenacion": [
    "Texto: substr, replace y concatenación",
    "Construir etiquetas"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/numericas-round-abs-ceil-floor-y-mod": [
    "Numéricas: round, abs, ceil, floor y mod",
    "Calcular diferencia absoluta y resto"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/extract-y-funciones-de-fecha": [
    "extract() y funciones de fecha",
    "Extraer año y mes"
  ],
  "analisis-de-datos/sqlalchemy/funciones-sql/diferencias-de-fechas-y-dialectos": [
    "Diferencias de fechas y dialectos",
    "Calcular días desde el alta"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/definicion": [
    "Definición",
    "Calcular venta por cliente"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/count-y-count-distinct": [
    "count() y count(distinct())",
    "Comparar tres conteos"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/sum-avg-min-y-max": [
    "sum(), avg(), min() y max()",
    "Resumir pedidos completados"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/group-by-con-varias-columnas": [
    "group_by() con varias columnas",
    "Contar pedidos por país y estado"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/having-y-where": [
    "having() y where()",
    "Clientes con dos pedidos completados"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/agregacion-condicional-y-porcentajes": [
    "Agregación condicional y porcentajes",
    "Calcular porcentaje de completados"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/filter-en-agregados": [
    "filter() en agregados",
    "Contar completados y todos a la vez"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/concatenacion-agregada": [
    "Concatenación agregada",
    "Unir los nombres de países de clientes"
  ],
  "analisis-de-datos/sqlalchemy/agregaciones/rollup-cube-y-grouping-sets": [
    "rollup(), cube() y grouping_sets()",
    "Compilar subtotales para PostgreSQL"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/definicion": [
    "Definición",
    "Filtrar montos superiores al promedio"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/subquery-y-c": [
    "subquery() y .c",
    "Filtrar totales calculados"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/scalar-subquery-y-correlacion": [
    "scalar_subquery() y correlación",
    "Contar pedidos por cliente sin agrupar la consulta exterior"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/in-con-subconsultas": [
    "IN con subconsultas",
    "Clientes con compras completadas"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/exists-y-not-exists": [
    "exists() y NOT EXISTS",
    "Clientes sin pedidos completados"
  ],
  "analisis-de-datos/sqlalchemy/subconsultas/lateral": [
    "lateral()",
    "Compilar el último pedido de cada cliente"
  ],
  "analisis-de-datos/sqlalchemy/cte/definicion": [
    "Definición",
    "Filtrar gasto por cliente"
  ],
  "analisis-de-datos/sqlalchemy/cte/ctes-multiples": [
    "CTEs múltiples",
    "Obtener clientes por encima del promedio"
  ],
  "analisis-de-datos/sqlalchemy/cte/cte-recursivo": [
    "CTE recursivo",
    "Generar los números 1 a 4"
  ],
  "analisis-de-datos/sqlalchemy/conjuntos/definicion": [
    "Definición",
    "Unir IDs de dos filtros"
  ],
  "analisis-de-datos/sqlalchemy/conjuntos/union-y-union-all": [
    "union() y union_all()",
    "Combinar países sin deduplicar"
  ],
  "analisis-de-datos/sqlalchemy/conjuntos/intersect-y-except": [
    "intersect() y except_()",
    "Clientes con completados y cancelados"
  ],
  "analisis-de-datos/sqlalchemy/conjuntos/compoundselect-y-orden-final": [
    "CompoundSelect y orden final",
    "Consultar el resultado de una unión"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/definicion": [
    "Definición",
    "Mostrar total general junto a cada pedido"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/partition-by": [
    "partition_by",
    "Mostrar total por cliente junto a cada pedido"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/row-number": [
    "row_number()",
    "Numerar pedidos por cliente"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/rank-y-dense-rank": [
    "rank() y dense_rank()",
    "Comparar dos rankings"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/lag-y-lead": [
    "lag() y lead()",
    "Comparar montos consecutivos"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/rows-range-y-groups": [
    "ROWS, RANGE y GROUPS",
    "Acumular ventas fila por fila"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/promedio-movil": [
    "Promedio móvil",
    "Promediar el pedido actual y el anterior"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/first-value-last-value-y-ntile": [
    "first_value(), last_value() y ntile()",
    "Obtener último monto y dos segmentos"
  ],
  "analisis-de-datos/sqlalchemy/ventanas/filtrar-resultados-de-ventana": [
    "Filtrar resultados de ventana",
    "Obtener el último pedido de cada cliente"
  ],
  "analisis-de-datos/sqlalchemy/dml/definicion": [
    "Definición",
    "Insertar un producto"
  ],
  "analisis-de-datos/sqlalchemy/dml/insert-multiple-y-executemany": [
    "INSERT múltiple y executemany",
    "Cargar dos productos en bloque"
  ],
  "analisis-de-datos/sqlalchemy/dml/insert-from-select": [
    "insert().from_select()",
    "Guardar un catálogo reducido"
  ],
  "analisis-de-datos/sqlalchemy/dml/update-where-values": [
    "update().where().values()",
    "Actualizar un precio"
  ],
  "analisis-de-datos/sqlalchemy/dml/delete-where": [
    "delete().where()",
    "Eliminar un cliente sin pedidos"
  ],
  "analisis-de-datos/sqlalchemy/dml/returning-y-return-defaults": [
    "returning() y return_defaults()",
    "Recuperar el ID insertado"
  ],
  "analisis-de-datos/sqlalchemy/dml/upsert-en-sqlite-y-postgresql": [
    "Upsert en SQLite y PostgreSQL",
    "Actualizar un producto existente"
  ],
  "analisis-de-datos/sqlalchemy/dml/upsert-en-mysql": [
    "Upsert en MySQL",
    "Compilar un upsert MySQL"
  ],
  "analisis-de-datos/sqlalchemy/consultas-dinamicas/definicion": [
    "Definición",
    "Aplicar un filtro opcional"
  ],
  "analisis-de-datos/sqlalchemy/consultas-dinamicas/compile-y-parametros": [
    "compile() y parámetros",
    "Ver SQL y valores separados"
  ],
  "analisis-de-datos/sqlalchemy/consultas-dinamicas/literal-binds-y-depuracion": [
    "literal_binds y depuración",
    "Inspeccionar una consulta con constante"
  ],
  "analisis-de-datos/sqlalchemy/consultas-dinamicas/lambda-stmt-y-cache-de-compilacion": [
    "lambda_stmt() y caché de compilación",
    "Ejecutar una sentencia reutilizable"
  ],
  "analisis-de-datos/sqlalchemy/pandas/definicion": [
    "Definición",
    "Leer pedidos completados en un DataFrame"
  ],
  "analisis-de-datos/sqlalchemy/pandas/read-sql-read-sql-query-y-read-sql-table": [
    "read_sql(), read_sql_query() y read_sql_table()",
    "Leer una tabla y seleccionar un subconjunto"
  ],
  "analisis-de-datos/sqlalchemy/pandas/params-index-col-y-parse-dates": [
    "params, index_col y parse_dates",
    "Leer pedidos con fecha e índice"
  ],
  "analisis-de-datos/sqlalchemy/pandas/dtype-dtype-backend-y-coerce-float": [
    "dtype, dtype_backend y coerce_float",
    "Leer valores con tipo nullable"
  ],
  "analisis-de-datos/sqlalchemy/pandas/chunksize-en-lectura": [
    "chunksize en lectura",
    "Leer pedidos por lotes"
  ],
  "analisis-de-datos/sqlalchemy/pandas/to-sql-if-exists-e-index": [
    "to_sql(), if_exists e index",
    "Guardar un resumen nuevo"
  ],
  "analisis-de-datos/sqlalchemy/pandas/dtype-schema-index-label-y-escritura-por-bloques": [
    "dtype, schema, index_label y escritura por bloques",
    "Escribir con tipos explícitos"
  ],
  "analisis-de-datos/sqlalchemy/pandas/to-sql-en-una-transaccion": [
    "to_sql() en una transacción",
    "Agregar una fila y verificar"
  ],
  "analisis-de-datos/sqlalchemy/orm-modelos/definicion": [
    "Definición",
    "Consultar una entidad"
  ],
  "analisis-de-datos/sqlalchemy/orm-modelos/declarativebase-mapped-y-mapped-column": [
    "DeclarativeBase, Mapped y mapped_column()",
    "Declarar una entidad nueva"
  ],
  "analisis-de-datos/sqlalchemy/orm-modelos/tablename-table-y-table-args": [
    "__tablename__, __table__ y __table_args__",
    "Comprobar el mapeo sobre una tabla existente"
  ],
  "analisis-de-datos/sqlalchemy/orm-modelos/registry-y-mapeo-imperativo": [
    "registry() y mapeo imperativo",
    "Mapear productos sin anotaciones declarativas"
  ],
  "analisis-de-datos/sqlalchemy/orm-modelos/mapped-as-dataclass": [
    "mapped_as_dataclass()",
    "Construir una entidad como dataclass"
  ],
  "analisis-de-datos/sqlalchemy/session/definicion": [
    "Definición",
    "Consultar una lista de entidades"
  ],
  "analisis-de-datos/sqlalchemy/session/sessionmaker-y-context-manager": [
    "sessionmaker() y context manager",
    "Crear y cerrar una sesión"
  ],
  "analisis-de-datos/sqlalchemy/session/execute-scalars-y-get": [
    "execute(), scalars() y get()",
    "Comparar lectura escalar y por PK"
  ],
  "analisis-de-datos/sqlalchemy/session/select-y-filtros-orm": [
    "select() y filtros ORM",
    "Consultar clientes de México"
  ],
  "analisis-de-datos/sqlalchemy/session/from-statement-y-sql-textual-orm": [
    "from_statement() y SQL textual ORM",
    "Leer entidades desde SQL textual"
  ],
  "analisis-de-datos/sqlalchemy/session/identity-map-y-unit-of-work": [
    "identity map y unit of work",
    "Comprobar identidad"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/definicion": [
    "Definición",
    "Modificar y confirmar una entidad"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/add-y-add-all": [
    "add() y add_all()",
    "Insertar un cliente"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/delete-y-actualizacion-por-atributos": [
    "delete() y actualización por atributos",
    "Eliminar un cliente sin compras"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/flush-commit-y-rollback": [
    "flush(), commit() y rollback()",
    "Ver un ID y revertir su inserción"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/transient-pending-persistent-deleted-y-detached": [
    "Transient, pending, persistent, deleted y detached",
    "Observar tres estados y separación"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/new-dirty-y-deleted": [
    "new, dirty y deleted",
    "Inspeccionar cambios pendientes"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/refresh-expire-y-expire-all": [
    "refresh(), expire() y expire_all()",
    "Recuperar un valor original"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/merge-y-expunge": [
    "merge() y expunge()",
    "Reasociar estado de una entidad"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/autoflush-no-autoflush-y-expire-on-commit": [
    "autoflush, no_autoflush y expire_on_commit",
    "Consultar antes y después del flush"
  ],
  "analisis-de-datos/sqlalchemy/orm-persistencia/dml-masivo-orm": [
    "DML masivo ORM",
    "Actualizar un conjunto de entidades"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/definicion": [
    "Definición",
    "Navegar pedidos de un cliente"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-many-y-many-to-one": [
    "One-to-many y many-to-one",
    "Ir de pedido a cliente"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/one-to-one": [
    "One-to-one",
    "Comprobar la cardinalidad mapeada"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/many-to-many-y-secondary": [
    "Many-to-many y secondary",
    "Identificar la tabla puente en el dataset"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/join-con-relaciones-y-aliased": [
    "join() con relaciones y aliased()",
    "Consultar cliente y pedido por relación"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/any-y-has": [
    "any() y has()",
    "Buscar clientes con compras altas"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/cascade-delete-orphan-y-passive-deletes": [
    "cascade, delete-orphan y passive_deletes",
    "Inspeccionar cascada actual"
  ],
  "analisis-de-datos/sqlalchemy/orm-relaciones/primaryjoin-y-secondaryjoin": [
    "primaryjoin y secondaryjoin",
    "Inspeccionar el JOIN inferido"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/definicion": [
    "Definición",
    "Cargar clientes y pedidos en lotes"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/lazy-loading-y-n-1": [
    "Lazy loading y N+1",
    "Contar consultas lazy de clientes y pedidos"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/selectinload": [
    "selectinload()",
    "Reducir consultas de colecciones"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/joinedload-y-unique": [
    "joinedload() y unique()",
    "Cargar clientes con sus pedidos"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/subqueryload-y-contains-eager": [
    "subqueryload() y contains_eager()",
    "Reutilizar un JOIN para cargar una colección"
  ],
  "analisis-de-datos/sqlalchemy/orm-carga/raiseload-load-only-defer-y-undefer": [
    "raiseload(), load_only(), defer() y undefer()",
    "Consultar solo atributos necesarios"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/definicion": [
    "Definición",
    "Inspeccionar las columnas mapeadas"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/hybrid-property": [
    "hybrid_property",
    "Consultar un cálculo híbrido"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/column-property": [
    "column_property()",
    "Exponer el doble del precio"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/association-proxy": [
    "association_proxy",
    "Exponer los IDs de pedidos de un cliente"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/herencia-y-polimorfismo": [
    "Herencia y polimorfismo",
    "Mapear subtipos en una tabla"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/version-id-col": [
    "version_id_col",
    "Incrementar una versión al modificar"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/validates": [
    "validates()",
    "Normalizar una categoría"
  ],
  "analisis-de-datos/sqlalchemy/orm-avanzado/automap-y-deferredreflection": [
    "Automap y DeferredReflection",
    "Mapear una tabla ya existente"
  ],
  "analisis-de-datos/sqlalchemy/pool/definicion": [
    "Definición",
    "Identificar el pool de SQLite en memoria"
  ],
  "analisis-de-datos/sqlalchemy/pool/queuepool-nullpool-y-staticpool": [
    "QueuePool, NullPool y StaticPool",
    "Crear un motor sin reutilización"
  ],
  "analisis-de-datos/sqlalchemy/pool/pool-size-max-overflow-y-pool-timeout": [
    "pool_size, max_overflow y pool_timeout",
    "Configurar límites del pool"
  ],
  "analisis-de-datos/sqlalchemy/pool/pool-recycle-y-pool-pre-ping": [
    "pool_recycle y pool_pre_ping",
    "Activar controles de conexión"
  ],
  "analisis-de-datos/sqlalchemy/pool/invalidate-y-reconexion": [
    "invalidate() y reconexión",
    "Invalidar una conexión de prueba"
  ],
  "analisis-de-datos/sqlalchemy/pool/hilos-procesos-y-sesiones": [
    "Hilos, procesos y sesiones",
    "Crear dos sesiones independientes"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/definicion": [
    "Definición",
    "Consultar un plan SQLite"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/stream-results-y-yield-per": [
    "stream_results y yield_per",
    "Procesar dos pedidos por lote"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/insertmanyvalues-y-cargas-masivas": [
    "insertmanyvalues y cargas masivas",
    "Insertar y devolver varios IDs"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/event-listen-y-listens-for": [
    "event.listen() y listens_for()",
    "Medir cuántas sentencias se emiten"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/eventos-de-pool-y-sesion": [
    "Eventos de pool y sesión",
    "Registrar el préstamo y devolución"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/perfilado-y-tiempos": [
    "Perfilado y tiempos",
    "Cronometrar una consulta"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/typedecorator-y-userdefinedtype": [
    "TypeDecorator y UserDefinedType",
    "Normalizar texto al guardar"
  ],
  "analisis-de-datos/sqlalchemy/rendimiento/multiples-engines-y-sharding": [
    "Múltiples engines y sharding",
    "Consultar dos bases independientes"
  ],
  "analisis-de-datos/sqlalchemy/asyncio/definicion": [
    "Definición",
    "Ejecutar SQL asíncrono con SQLite"
  ],
  "analisis-de-datos/sqlalchemy/asyncio/asyncsession-y-async-sessionmaker": [
    "AsyncSession y async_sessionmaker()",
    "Consultar un valor en una sesión asíncrona"
  ],
  "analisis-de-datos/sqlalchemy/asyncio/run-sync-y-asyncresult": [
    "run_sync() y AsyncResult",
    "Crear tablas con un motor asíncrono"
  ],
  "analisis-de-datos/sqlalchemy/alembic/definicion": [
    "Definición",
    "Inicializar un entorno de migración"
  ],
  "analisis-de-datos/sqlalchemy/alembic/revision-y-autogenerate": [
    "revision y autogenerate",
    "Generar una revisión a partir de modelos"
  ],
  "analisis-de-datos/sqlalchemy/alembic/upgrade-downgrade-y-revision-history": [
    "upgrade(), downgrade() y revision history",
    "Aplicar e inspeccionar revisiones"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/definicion": [
    "Definición",
    "Extraer pedidos y validar conteo"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/carga-de-csv-excel-y-json": [
    "Carga de CSV, Excel y JSON",
    "Cargar un CSV pequeño en una tabla"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/cargas-incrementales-y-watermark": [
    "Cargas incrementales y watermark",
    "Extraer pedidos posteriores a una marca compuesta"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/deduplicacion-y-validacion": [
    "Deduplicación y validación",
    "Detectar clientes repetidos en los pedidos"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/exportar-y-automatizar-reportes": [
    "Exportar y automatizar reportes",
    "Generar CSV sin crear un archivo"
  ],
  "analisis-de-datos/sqlalchemy/etl-pruebas/testing-con-sqlite-en-memoria-y-rollback": [
    "Testing con SQLite en memoria y rollback",
    "Validar una operación y revertirla"
  ]
};
