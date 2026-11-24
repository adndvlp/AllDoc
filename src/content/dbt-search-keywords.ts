// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const dbtKeywords: Readonly<Record<string, readonly string[]>> = {
  "analisis-de-datos/dbt/fundamentos-de-dbt/definicion": [
    "Fundamentos de dbt",
    "Seguir una transformación"
  ],
  "analisis-de-datos/dbt/fundamentos-de-dbt/etl-y-elt": [
    "ETL y ELT",
    "Ubicar dbt en el flujo"
  ],
  "analisis-de-datos/dbt/fundamentos-de-dbt/core-plataforma-y-fusion": [
    "Core, plataforma y Fusion",
    "Identificar el entorno instalado"
  ],
  "analisis-de-datos/dbt/fundamentos-de-dbt/adaptadores-y-warehouse": [
    "Adaptadores y warehouse",
    "Inspeccionar el adaptador local"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/definicion": [
    "Instalación y proyecto",
    "Comprobar el proyecto"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/entorno-virtual": [
    "Entorno virtual",
    "Instalar el adaptador"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-init": [
    "dbt init",
    "Crear un proyecto independiente"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-project-yml": [
    "dbt_project.yml",
    "Materializar marts como tablas"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/profiles-yml-y-targets": [
    "profiles.yml y targets",
    "Elegir el entorno de desarrollo"
  ],
  "analisis-de-datos/dbt/instalacion-y-proyecto/directorios-y-extensiones": [
    "Directorios y extensiones",
    "Reconocer los archivos"
  ],
  "analisis-de-datos/dbt/sources-y-seeds/definicion": [
    "Sources y seeds",
    "Cargar el catálogo de países"
  ],
  "analisis-de-datos/dbt/sources-y-seeds/source": [
    "source()",
    "Leer pedidos de origen"
  ],
  "analisis-de-datos/dbt/sources-y-seeds/identifier-y-esquema": [
    "Identifier y esquema",
    "Declarar un nombre lógico alternativo"
  ],
  "analisis-de-datos/dbt/sources-y-seeds/seed-y-tipos-de-columna": [
    "Seed y tipos de columna",
    "Fijar el tipo del código"
  ],
  "analisis-de-datos/dbt/sources-y-seeds/usar-un-seed": [
    "Usar un seed",
    "Traducir códigos de países"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/definicion": [
    "Modelos SQL y dependencias",
    "Crear un modelo de pedidos grandes (models/large_orders.sql)"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/ref": [
    "ref()",
    "Consumir el modelo de pedidos completados"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/dag-upstream-y-downstream": [
    "DAG, upstream y downstream",
    "Seguir dependencias de pedidos"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/staging": [
    "Staging",
    "Normalizar estado de pedidos"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/intermediate": [
    "Intermediate",
    "Aislar pedidos completados"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/marts": [
    "Marts",
    "Consultar ingresos por país"
  ],
  "analisis-de-datos/dbt/modelos-sql-y-dependencias/analyses": [
    "Analyses",
    "Guardar una consulta puntual (analyses/revenue.sql)"
  ],
  "analisis-de-datos/dbt/materializaciones/definicion": [
    "Materializaciones",
    "Construir una tabla (models/lab_orders.sql)"
  ],
  "analisis-de-datos/dbt/materializaciones/view": [
    "view",
    "Crear una vista"
  ],
  "analisis-de-datos/dbt/materializaciones/table": [
    "table",
    "Persistir ingresos"
  ],
  "analisis-de-datos/dbt/materializaciones/ephemeral": [
    "ephemeral",
    "Crear lógica intermedia (models/lab_ephemeral.sql)"
  ],
  "analisis-de-datos/dbt/materializaciones/incremental": [
    "incremental",
    "Definir una tabla incremental inicial"
  ],
  "analisis-de-datos/dbt/materializaciones/materialized-view": [
    "materialized_view",
    "Crear una vista materializada en PostgreSQL"
  ],
  "analisis-de-datos/dbt/materializaciones/python-models": [
    "Python models",
    "Filtrar pedidos en un modelo Snowpark (alternativo)"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/definicion": [
    "Configuración de recursos",
    "Configurar el nombre físico"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/config-y-precedencia": [
    "config() y precedencia",
    "Sobrescribir el default view"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/propiedades-yaml": [
    "Propiedades YAML",
    "Documentar y etiquetar"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/schemas-database-y-alias": [
    "Schemas, database y alias",
    "Separar un modelo en esquema finance"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/nombres-personalizados": [
    "Nombres personalizados",
    "Personalizar un esquema (macros/generate_schema_name.sql)"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/enabled-y-tags": [
    "enabled y tags",
    "Etiquetar un modelo de laboratorio"
  ],
  "analisis-de-datos/dbt/configuracion-de-recursos/versiones-de-proyecto": [
    "Versiones de proyecto",
    "Restringir la versión del motor"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/definicion": [
    "Comandos de trabajo",
    "Construir el proyecto base"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-debug": [
    "dbt debug",
    "Comprobar conexión"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-run": [
    "dbt run",
    "Construir el mart y sus padres"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-build": [
    "dbt build",
    "Construir un flujo completo"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-test": [
    "dbt test",
    "Validar el modelo de ingresos"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-seed-y-snapshot": [
    "dbt seed y snapshot",
    "Cargar catálogos y capturar historial"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-compile": [
    "dbt compile",
    "Inspeccionar SQL de un modelo"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-parse": [
    "dbt parse",
    "Generar metadatos"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-ls": [
    "dbt ls",
    "Listar modelos de marts"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-show": [
    "dbt show",
    "Previsualizar pedidos"
  ],
  "analisis-de-datos/dbt/comandos-de-trabajo/dbt-clean-y-deps": [
    "dbt clean y deps",
    "Reinstalar dependencias"
  ],
  "analisis-de-datos/dbt/jinja-basico/definicion": [
    "Jinja básico",
    "Generar una constante"
  ],
  "analisis-de-datos/dbt/jinja-basico/expresiones-y-comentarios": [
    "Expresiones y comentarios",
    "Insertar un valor"
  ],
  "analisis-de-datos/dbt/jinja-basico/set-y-tipos": [
    "set y tipos",
    "Reutilizar una constante"
  ],
  "analisis-de-datos/dbt/jinja-basico/if-elif-y-else": [
    "if, elif y else",
    "Elegir una etiqueta"
  ],
  "analisis-de-datos/dbt/jinja-basico/for-loop-y-filtros": [
    "for, loop y filtros",
    "Generar columnas de un SELECT"
  ],
  "analisis-de-datos/dbt/jinja-basico/filtros-jinja": [
    "Filtros Jinja",
    "Construir una lista de columnas"
  ],
  "analisis-de-datos/dbt/jinja-basico/namespace-y-do": [
    "namespace y do",
    "Construir una lista"
  ],
  "analisis-de-datos/dbt/jinja-basico/var-y-vars": [
    "var() y --vars",
    "Parametrizar un mínimo"
  ],
  "analisis-de-datos/dbt/jinja-basico/env-var": [
    "env_var()",
    "Leer la contraseña del perfil"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/definicion": [
    "Macros y contexto",
    "Definir macro (macros/cents.sql)"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/argumentos-y-return": [
    "Argumentos y return()",
    "Devolver una lista (macros/order_columns.sql)"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/invocar-macros": [
    "Invocar macros",
    "Convertir importes a centavos"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/this-y-target": [
    "this y target",
    "Mostrar el entorno del modelo"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/model-graph-y-flags": [
    "model, graph y flags",
    "Inspeccionar el nodo durante ejecución"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/execute-parse-y-compilacion": [
    "execute, parse y compilación",
    "Evitar acceder a un resultado durante parse"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/run-query": [
    "run_query()",
    "Consultar un total en compilación"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/statement-blocks": [
    "Statement blocks",
    "Recuperar un conteo"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/adapter-y-relation": [
    "adapter y Relation",
    "Inspeccionar columnas de staging"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/dispatch": [
    "dispatch()",
    "Crear macro despachada (macros/label.sql)"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/serializacion-json-y-yaml": [
    "Serialización JSON y YAML",
    "Extraer un valor JSON"
  ],
  "analisis-de-datos/dbt/macros-y-contexto/log-exceptions-y-metadatos": [
    "log, exceptions y metadatos",
    "Validar un parámetro"
  ],
  "analisis-de-datos/dbt/data-tests/definicion": [
    "Data tests",
    "Comprobar importes negativos (tests/no_negative_orders.sql)"
  ],
  "analisis-de-datos/dbt/data-tests/unique": [
    "unique",
    "Validar identificadores (models/schema.yml)"
  ],
  "analisis-de-datos/dbt/data-tests/not-null": [
    "not_null",
    "Exigir ID de cliente"
  ],
  "analisis-de-datos/dbt/data-tests/relationships": [
    "relationships",
    "Validar relación pedido-cliente"
  ],
  "analisis-de-datos/dbt/data-tests/accepted-values": [
    "accepted_values",
    "Restringir estados válidos"
  ],
  "analisis-de-datos/dbt/data-tests/singular-tests": [
    "Singular tests",
    "Detectar pedidos cancelados en hechos (tests/no_cancelled_facts.sql)"
  ],
  "analisis-de-datos/dbt/data-tests/custom-generic-tests": [
    "Custom generic tests",
    "Crear una regla de mínimo (tests/generic/test_minimum.sql)"
  ],
  "analisis-de-datos/dbt/data-tests/severity-warn-if-y-error-if": [
    "Severity, warn_if y error_if",
    "Advertir por países faltantes"
  ],
  "analisis-de-datos/dbt/data-tests/where-y-store-failures": [
    "where y store_failures",
    "Guardar un fallo de país"
  ],
  "analisis-de-datos/dbt/unit-tests-y-contratos/definicion": [
    "Unit tests y contratos",
    "Ejecutar solo unit tests"
  ],
  "analisis-de-datos/dbt/unit-tests-y-contratos/unit-test-con-given-y-expect": [
    "Unit test con given y expect",
    "Probar el filtro de pedidos (models/unit_tests.yml)"
  ],
  "analisis-de-datos/dbt/unit-tests-y-contratos/overrides-y-modelos-incrementales": [
    "Overrides y modelos incrementales",
    "Simular ejecución completa (fragmento de un unit test incremental)"
  ],
  "analisis-de-datos/dbt/unit-tests-y-contratos/model-contracts": [
    "Model contracts",
    "Fijar estructura de un modelo de una columna"
  ],
  "analisis-de-datos/dbt/source-freshness/definicion": [
    "Source freshness",
    "Evaluar fuentes"
  ],
  "analisis-de-datos/dbt/source-freshness/loaded-at-field-y-umbrales": [
    "loaded_at_field y umbrales",
    "Definir SLA de pedidos (fusionar en sources.yml)"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/definicion": [
    "Selección de nodos",
    "Seleccionar un mart"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/select-y-exclude": [
    "--select y --exclude",
    "Construir marts salvo un reporte"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/operadores-y": [
    "Operadores + y @",
    "Seleccionar familias"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/metodos-de-seleccion": [
    "Métodos de selección",
    "Listar tablas"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/union-e-interseccion": [
    "Unión e intersección",
    "Cruzar ruta y materialización"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/selectors-yml": [
    "selectors.yml",
    "Guardar la selección de marts"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/threads-target-y-fail-fast": [
    "Threads, target y fail-fast",
    "Ejecutar en desarrollo"
  ],
  "analisis-de-datos/dbt/seleccion-de-nodos/seleccion-indirecta-de-tests": [
    "Selección indirecta de tests",
    "Excluir tests indirectos"
  ],
  "analisis-de-datos/dbt/modelado-analitico/definicion": [
    "Modelado analítico",
    "Identificar granularidad"
  ],
  "analisis-de-datos/dbt/modelado-analitico/facts-dimensions-y-esquema-estrella": [
    "Facts, dimensions y esquema estrella",
    "Ingresos por país"
  ],
  "analisis-de-datos/dbt/modelado-analitico/grain-y-fan-out": [
    "Grain y fan-out",
    "Detectar multiplicación de clientes"
  ],
  "analisis-de-datos/dbt/modelado-analitico/claves-naturales-sustitutas-y-compuestas": [
    "Claves naturales, sustitutas y compuestas",
    "Crear clave técnica (PostgreSQL)"
  ],
  "analisis-de-datos/dbt/modelado-analitico/bridge-tables": [
    "Bridge tables",
    "Crear una relación cliente-mes de compra"
  ],
  "analisis-de-datos/dbt/modelado-analitico/deduplicacion": [
    "Deduplicación",
    "Conservar la versión más nueva (datos simulados)"
  ],
  "analisis-de-datos/dbt/modelado-analitico/reconciliacion": [
    "Reconciliación",
    "Verificar ingresos de pedidos completados"
  ],
  "analisis-de-datos/dbt/incrementales/definicion": [
    "Incrementales",
    "Crear models/inc_orders.sql"
  ],
  "analisis-de-datos/dbt/incrementales/is-incremental-y-this": [
    "is_incremental() y this",
    "Probar primera carga y actualización"
  ],
  "analisis-de-datos/dbt/incrementales/unique-key": [
    "unique_key",
    "Actualizar una orden de laboratorio (PostgreSQL directo)"
  ],
  "analisis-de-datos/dbt/incrementales/estrategias-append-y-delete-insert": [
    "Estrategias append y delete+insert",
    "Elegir estrategia de actualización"
  ],
  "analisis-de-datos/dbt/incrementales/estrategias-merge-e-insert-overwrite": [
    "Estrategias merge e insert_overwrite",
    "Configurar merge (alternativa para inc_orders)"
  ],
  "analisis-de-datos/dbt/incrementales/microbatch-y-event-time": [
    "microbatch y event_time",
    "Configurar lotes diarios (ejemplo alternativo)"
  ],
  "analisis-de-datos/dbt/incrementales/full-refresh-y-full-refresh": [
    "--full-refresh y full_refresh",
    "Reconstruir inc_orders"
  ],
  "analisis-de-datos/dbt/incrementales/on-schema-change": [
    "on_schema_change",
    "Fallar si cambia el esquema"
  ],
  "analisis-de-datos/dbt/incrementales/late-arriving-data-y-lookback": [
    "Late-arriving data y lookback",
    "Releer últimos siete días (variante de inc_orders)"
  ],
  "analisis-de-datos/dbt/incrementales/incremental-predicates": [
    "Incremental predicates",
    "Limitar escaneo del destino con merge (ejemplo PostgreSQL)"
  ],
  "analisis-de-datos/dbt/incrementales/backfill-e-idempotencia": [
    "Backfill e idempotencia",
    "Reprocesar todo en laboratorio"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/definicion": [
    "Snapshots e historial",
    "Crear snapshots/customer_history.yml"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/timestamp-strategy": [
    "Timestamp strategy",
    "Modificar un cliente (PostgreSQL directo, después del snapshot inicial)"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/check-strategy": [
    "Check strategy",
    "Capturar cambios de nombre o país (snapshot alternativo)"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/scd-tipo-1-y-tipo-2": [
    "SCD tipo 1 y tipo 2",
    "Consultar versiones vigentes"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/hard-deletes-y-soft-deletes": [
    "Hard deletes y soft deletes",
    "Cerrar versiones al borrar una fila (snapshot nuevo)"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/metadatos-e-intervalos-de-vigencia": [
    "Metadatos e intervalos de vigencia",
    "Ver historial de Ana"
  ],
  "analisis-de-datos/dbt/snapshots-e-historial/cdc-e-historial-de-hechos": [
    "CDC e historial de hechos",
    "Elegir estrategia"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/definicion": [
    "Documentación y linaje",
    "Describir el mart"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/doc-blocks-y-doc": [
    "Doc blocks y doc()",
    "Crear models/revenue_docs.md"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/dbt-docs-generate-y-serve": [
    "dbt docs generate y serve",
    "Generar y abrir documentación"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/lineage-e-impacto": [
    "Lineage e impacto",
    "Identificar afectados por staging"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/exposures": [
    "Exposures",
    "Registrar un reporte (models/exposures.yml)"
  ],
  "analisis-de-datos/dbt/documentacion-y-linaje/metadata-y-persist-docs": [
    "Metadata y persist_docs",
    "Persistir documentación de modelos"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/definicion": [
    "Artefactos y depuración",
    "Inspeccionar archivos de una ejecución"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/manifest-json": [
    "manifest.json",
    "Leer dependencias de fct_orders"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/run-results-json": [
    "run_results.json",
    "Leer estados de ejecución"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/catalog-json-y-sources-json": [
    "catalog.json y sources.json",
    "Actualizar catálogo y frescura"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/sql-compilado-y-ejecutado": [
    "SQL compilado y ejecutado",
    "Leer SQL de fct_orders"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/errores-de-compilacion-y-base-de-datos": [
    "Errores de compilación y base de datos",
    "Provocar un error de referencia (modelo temporal)"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/logs-y-flags-de-diagnostico": [
    "Logs y flags de diagnóstico",
    "Generar log estructurado"
  ],
  "analisis-de-datos/dbt/artefactos-y-depuracion/retry": [
    "Retry",
    "Reintentar un build fallido"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/definicion": [
    "Paquetes y reutilización",
    "Declarar dbt-utils (packages.yml)"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/packages-yml-y-dependencies-yml": [
    "packages.yml y dependencies.yml",
    "Resolver dependencias"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/lockfile-y-version-pinning": [
    "Lockfile y version pinning",
    "Actualizar versiones permitidas"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-utils": [
    "dbt-utils",
    "Generar clave de cliente"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-expectations-y-hub": [
    "dbt-expectations y Hub",
    "Ejemplo de test de rango tras instalar paquete compatible"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-modelo": [
    "Hooks de modelo",
    "Analizar estadísticas de una tabla PostgreSQL"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-proyecto": [
    "Hooks de proyecto",
    "Registrar el inicio (dbt_project.yml)"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-run-operation": [
    "dbt run-operation",
    "Crear una operación (macros/report_message.sql)"
  ],
  "analisis-de-datos/dbt/paquetes-y-reutilizacion/materializaciones-personalizadas": [
    "Materializaciones personalizadas",
    "Diseñar una materialización"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/definicion": [
    "Semantic Layer y MetricFlow",
    "Consultar una métrica común"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/semantic-models-y-entities": [
    "Semantic models y entities",
    "Definir pedidos en sintaxis clásica (models/semantic_orders.yml)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/measures-y-simple-metrics-clasico": [
    "Measures y simple metrics (clásico)",
    "Publicar ingresos y número de pedidos (añadir al YAML clásico)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/nueva-especificacion-yaml": [
    "Nueva especificación YAML",
    "Definir ingresos con sintaxis nueva (alternativa al YAML clásico)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/dimensiones-categoricas-y-temporales": [
    "Dimensiones categóricas y temporales",
    "Desglosar revenue por mes"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/ratio-metrics": [
    "Ratio metrics",
    "Definir ticket medio en spec clásica (añadir a metrics)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/derived-metrics": [
    "Derived metrics",
    "Estimar ingreso neto hipotético del 90% (spec clásica)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/time-spine": [
    "Time spine",
    "Crear models/time_spine.sql para un laboratorio PostgreSQL"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/cumulative-metrics": [
    "Cumulative metrics",
    "Definir acumulado de ingresos (spec clásica)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/conversion-metrics": [
    "Conversion metrics",
    "Definir conversión de visita a compra"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/saved-queries-y-exports": [
    "Saved queries y exports",
    "Guardar consulta mensual (archivo YAML en entorno compatible)"
  ],
  "analisis-de-datos/dbt/semantic-layer-y-metricflow/consumo-desde-bi-y-api": [
    "Consumo desde BI y API",
    "Consumir monthly_revenue"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/definicion": [
    "Estado y ejecución selectiva",
    "Conservar un estado inicial"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-modified-y-state-new": [
    "state:modified y state:new",
    "Detectar cambios después de editar un modelo"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/defer-y-state": [
    "--defer y --state",
    "Construir únicamente cambios y sus descendientes"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/dbt-clone": [
    "dbt clone",
    "Clonar un mart a un entorno aislado"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/result-error-y-result-fail": [
    "result:error y result:fail",
    "Listar errores de ejecución anteriores"
  ],
  "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-aware-orchestration-y-dbt-state": [
    "State-aware orchestration y dbt State",
    "Evaluar una ejecución"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/definicion": [
    "Producción y CI/CD",
    "Seguir un cambio de negocio"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/git-y-pull-requests": [
    "Git y pull requests",
    "Versionar un cambio local"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/entornos-y-permisos": [
    "Entornos y permisos",
    "Añadir salida CI (dentro de outputs del perfil, copiar demás campos de dev)"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/slim-ci": [
    "Slim CI",
    "Validar una rama con estado previo"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/jobs-scheduling-y-triggers": [
    "Jobs, scheduling y triggers",
    "Crear un job diario en dbt Platform"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/orquestacion-externa": [
    "Orquestación externa",
    "Encadenar tareas en un worker con proyecto y perfil preparados"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/github-actions": [
    "GitHub Actions",
    "Paso de workflow (dentro de jobs.<id>.steps)"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/docker-y-ejecucion-reproducible": [
    "Docker y ejecución reproducible",
    "Preparar imagen (Dockerfile en raíz del proyecto)"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/monitoreo-y-alertas": [
    "Monitoreo y alertas",
    "Diseñar una alerta"
  ],
  "analisis-de-datos/dbt/produccion-y-ci-cd/recuperacion-y-rollback": [
    "Recuperación y rollback",
    "Revertir un cambio aprobado (en rama de recuperación)"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/definicion": [
    "Rendimiento y costos",
    "Examinar un plan (PostgreSQL después de build)"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/materializacion-y-costo-de-lectura": [
    "Materialización y costo de lectura",
    "Elegir materializaciones"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/indices-particiones-y-clustering": [
    "Índices, particiones y clustering",
    "Crear índices con configuración PostgreSQL"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/explain-y-filtros": [
    "EXPLAIN y filtros",
    "Filtrar por intervalo de fecha (PostgreSQL)"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/partial-parsing-y-cache": [
    "Partial parsing y caché",
    "Forzar un parse completo"
  ],
  "analisis-de-datos/dbt/rendimiento-y-costos/concurrencia": [
    "Concurrencia",
    "Comparar dos configuraciones"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/definicion": [
    "Gobernanza y Mesh",
    "Asignar propietario de un dominio (models/groups.yml)"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/groups-y-ownership": [
    "Groups y ownership",
    "Asignar fct_orders a finanzas"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/access-private-protected-public": [
    "Access: private, protected, public",
    "Publicar un contrato de consumo"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/grants": [
    "Grants",
    "Permitir SELECT a un rol existente (modelo temporal)"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/model-versions": [
    "Model versions",
    "Versionar un modelo de laboratorio (models/versioned_orders.yml)"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/deprecacion": [
    "Deprecación",
    "Anunciar retiro de v1 (fragmento de versions)"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/dbt-mesh-y-dependencias-entre-proyectos": [
    "dbt Mesh y dependencias entre proyectos",
    "Declarar proyecto productor (dependencies.yml del consumidor)"
  ],
  "analisis-de-datos/dbt/gobernanza-y-mesh/cross-project-ref": [
    "Cross-project ref",
    "Consumir hechos publicados (proyecto consumidor)"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/definicion": [
    "Extensibilidad e integraciones",
    "Integrar una tienda"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/dbtrunner-e-invoke": [
    "dbtRunner e invoke()",
    "Ejecutar un build desde Python"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/dependencias-explicitas-y-dinamicas": [
    "Dependencias explícitas y dinámicas",
    "Registrar un padre aunque se use en una rama"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/adaptadores-personalizados": [
    "Adaptadores personalizados",
    "Diseñar integración de un motor nuevo"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/administrative-discovery-y-semantic-layer-apis": [
    "Administrative, Discovery y Semantic Layer APIs",
    "Consultar una ejecución mediante la API administrativa"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/observabilidad-y-telemetria": [
    "Observabilidad y telemetría",
    "Guardar salida estructurada para un colector"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/calidad-externa-y-auditoria": [
    "Calidad externa y auditoría",
    "Comparar dos versiones sin paquete externo"
  ],
  "analisis-de-datos/dbt/extensibilidad-e-integraciones/sqlfluff-y-desarrollo": [
    "SQLFluff y desarrollo",
    "Revisar SQL con templater dbt"
  ]
};
