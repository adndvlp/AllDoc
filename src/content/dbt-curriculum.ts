// Generado desde specs/dbt.md por scripts/prepare-dbt-notes.mjs.
export const dbtCurriculum = [
  {
    "key": "fundamentos-de-dbt",
    "label": "Fundamentos de dbt",
    "children": [
      {
        "id": "analisis-de-datos/dbt/fundamentos-de-dbt/definicion",
        "label": "Definición",
        "description": "dbt transforma datos ya disponibles en una plataforma de datos y organiza el SQL como un proyecto con dependencias y validaciones."
      },
      {
        "id": "analisis-de-datos/dbt/fundamentos-de-dbt/etl-y-elt",
        "label": "ETL y ELT",
        "description": "ETL transforma antes de cargar; ELT carga primero y transforma dentro de la plataforma. dbt suele ocupar la T de ELT."
      },
      {
        "id": "analisis-de-datos/dbt/fundamentos-de-dbt/core-plataforma-y-fusion",
        "label": "Core, plataforma y Fusion",
        "description": "Core ofrece CLI autogestionada; la plataforma dbt ofrece servicios administrados y colaboración; Fusion es otro motor de ejecución/compilación de dbt."
      },
      {
        "id": "analisis-de-datos/dbt/fundamentos-de-dbt/adaptadores-y-warehouse",
        "label": "Adaptadores y warehouse",
        "description": "Un adaptador traduce operaciones de dbt al motor de datos, como PostgreSQL, Snowflake, BigQuery, Redshift, Databricks o DuckDB."
      }
    ]
  },
  {
    "key": "instalacion-y-proyecto",
    "label": "Instalación y proyecto",
    "children": [
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/definicion",
        "label": "Definición",
        "description": "Un proyecto contiene modelos, configuraciones y otros recursos que la CLI descubre y procesa."
      },
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/entorno-virtual",
        "label": "Entorno virtual",
        "description": "Aísla dependencias Python para que dos proyectos no tengan que compartir versiones."
      },
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-init",
        "label": "dbt init",
        "description": "Genera la estructura inicial de un proyecto y puede guiar la configuración de conexión."
      },
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/dbt-project-yml",
        "label": "dbt_project.yml",
        "description": "Declara el nombre, perfil, rutas y configuración por defecto de los recursos."
      },
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/profiles-yml-y-targets",
        "label": "profiles.yml y targets",
        "description": "El perfil describe conexiones; target selecciona una salida como dev o prod."
      },
      {
        "id": "analisis-de-datos/dbt/instalacion-y-proyecto/directorios-y-extensiones",
        "label": "Directorios y extensiones",
        "description": "Los directorios separan modelos SQL/Python, seeds CSV, macros SQL/Jinja, tests, snapshots, analyses y propiedades YAML."
      }
    ]
  },
  {
    "key": "sources-y-seeds",
    "label": "Sources y seeds",
    "children": [
      {
        "id": "analisis-de-datos/dbt/sources-y-seeds/definicion",
        "label": "Definición",
        "description": "Las fuentes declaran relaciones cargadas externamente; los seeds cargan archivos CSV pequeños versionados."
      },
      {
        "id": "analisis-de-datos/dbt/sources-y-seeds/source",
        "label": "source()",
        "description": "Devuelve una referencia a una tabla declarada como source y registra una dependencia."
      },
      {
        "id": "analisis-de-datos/dbt/sources-y-seeds/identifier-y-esquema",
        "label": "Identifier y esquema",
        "description": "identifier permite usar un nombre lógico diferente al nombre físico de la tabla."
      },
      {
        "id": "analisis-de-datos/dbt/sources-y-seeds/seed-y-tipos-de-columna",
        "label": "Seed y tipos de columna",
        "description": "Los seeds sirven para catálogos estáticos pequeños, no para ingestión masiva o datos sensibles."
      },
      {
        "id": "analisis-de-datos/dbt/sources-y-seeds/usar-un-seed",
        "label": "Usar un seed",
        "description": "Un seed se referencia igual que un modelo mediante ref()."
      }
    ]
  },
  {
    "key": "modelos-sql-y-dependencias",
    "label": "Modelos SQL y dependencias",
    "children": [
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/definicion",
        "label": "Definición",
        "description": "Un modelo SQL es un SELECT guardado en models; dbt genera las operaciones necesarias para construir su relación."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/ref",
        "label": "ref()",
        "description": "Resuelve el nombre físico de un recurso y registra su dependencia en el DAG."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/dag-upstream-y-downstream",
        "label": "DAG, upstream y downstream",
        "description": "El grafo dirigido acíclico representa qué recursos dependen de otros y permite ejecutarlos en orden."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/staging",
        "label": "Staging",
        "description": "Estandariza entradas con nombres, tipos y limpieza básica, normalmente cerca de la fuente."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/intermediate",
        "label": "Intermediate",
        "description": "Encapsula una transformación intermedia que simplifica modelos finales."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/marts",
        "label": "Marts",
        "description": "Contienen datos preparados para análisis, métricas y consumidores de negocio."
      },
      {
        "id": "analisis-de-datos/dbt/modelos-sql-y-dependencias/analyses",
        "label": "Analyses",
        "description": "Archivos SQL/Jinja en analyses se compilan pero no se materializan como modelos."
      }
    ]
  },
  {
    "key": "materializaciones",
    "label": "Materializaciones",
    "children": [
      {
        "id": "analisis-de-datos/dbt/materializaciones/definicion",
        "label": "Definición",
        "description": "La materialización determina cómo dbt representa el resultado de un modelo en el motor."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/view",
        "label": "view",
        "description": "Guarda la definición SQL y normalmente calcula resultados al consultar la vista."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/table",
        "label": "table",
        "description": "Materializa físicamente el resultado y lo reconstruye en ejecuciones normales."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/ephemeral",
        "label": "ephemeral",
        "description": "Inserta el SQL del modelo como CTE en los modelos consumidores, sin crear una relación propia."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/incremental",
        "label": "incremental",
        "description": "Persiste resultados y procesa un subconjunto de filas en ejecuciones posteriores cuando se configura el filtro."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/materialized-view",
        "label": "materialized_view",
        "description": "Representa una vista materializada del motor, con refresco y configuración dependientes del adaptador."
      },
      {
        "id": "analisis-de-datos/dbt/materializaciones/python-models",
        "label": "Python models",
        "description": "Permiten implementar transformaciones en Python usando la interfaz dbt y el motor compatible."
      }
    ]
  },
  {
    "key": "configuracion-de-recursos",
    "label": "Configuración de recursos",
    "children": [
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/definicion",
        "label": "Definición",
        "description": "Las configuraciones controlan ejecución y representación; las propiedades describen el recurso, columnas, tests y metadatos."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/config-y-precedencia",
        "label": "config() y precedencia",
        "description": "Un config del modelo SQL tiene prioridad sobre configuración de proyecto y propiedades del mismo recurso en el caso habitual."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/propiedades-yaml",
        "label": "Propiedades YAML",
        "description": "Se añaden bajo models y columns para declarar descripciones, tests y configuraciones del recurso."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/schemas-database-y-alias",
        "label": "Schemas, database y alias",
        "description": "schema y database determinan ubicación física; alias cambia el identificador de la relación."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/nombres-personalizados",
        "label": "Nombres personalizados",
        "description": "generate_schema_name, generate_alias_name y generate_database_name son macros que controlan la resolución de nombres físicos."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/enabled-y-tags",
        "label": "enabled y tags",
        "description": "enabled excluye un recurso del grafo activo; tags permiten clasificar y seleccionar."
      },
      {
        "id": "analisis-de-datos/dbt/configuracion-de-recursos/versiones-de-proyecto",
        "label": "Versiones de proyecto",
        "description": "require-dbt-version limita las versiones de Core permitidas por el proyecto."
      }
    ]
  },
  {
    "key": "comandos-de-trabajo",
    "label": "Comandos de trabajo",
    "children": [
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/definicion",
        "label": "Definición",
        "description": "La CLI ejecuta acciones sobre los recursos del proyecto, desde compilación hasta construcción y validación."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-debug",
        "label": "dbt debug",
        "description": "Valida archivos de configuración y conexión."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-run",
        "label": "dbt run",
        "description": "Construye solo modelos seleccionados."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-build",
        "label": "dbt build",
        "description": "Ejecuta los recursos construibles y tests seleccionados según dependencias."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-test",
        "label": "dbt test",
        "description": "Ejecuta data tests y unit tests seleccionados."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-seed-y-snapshot",
        "label": "dbt seed y snapshot",
        "description": "seed carga CSV; snapshot registra versiones de datos cambiantes."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-compile",
        "label": "dbt compile",
        "description": "Renderiza Jinja y produce SQL compilado."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-parse",
        "label": "dbt parse",
        "description": "Analiza recursos y dependencias sin construir modelos."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-ls",
        "label": "dbt ls",
        "description": "Lista recursos que coinciden con un selector."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-show",
        "label": "dbt show",
        "description": "Ejecuta una consulta de vista previa sin materializar el modelo seleccionado."
      },
      {
        "id": "analisis-de-datos/dbt/comandos-de-trabajo/dbt-clean-y-deps",
        "label": "dbt clean y deps",
        "description": "clean elimina rutas configuradas en clean-targets; deps instala paquetes declarados."
      }
    ]
  },
  {
    "key": "jinja-basico",
    "label": "Jinja básico",
    "children": [
      {
        "id": "analisis-de-datos/dbt/jinja-basico/definicion",
        "label": "Definición",
        "description": "Jinja genera texto SQL antes de que el motor ejecute la consulta."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/expresiones-y-comentarios",
        "label": "Expresiones y comentarios",
        "description": "Las expresiones {{ }} insertan texto; {% %} ejecuta instrucciones; {# #} comenta en Jinja."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/set-y-tipos",
        "label": "set y tipos",
        "description": "set asigna valores Jinja, incluidas listas, diccionarios y tuplas."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/if-elif-y-else",
        "label": "if, elif y else",
        "description": "Generan SQL condicional según valores conocidos por Jinja."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/for-loop-y-filtros",
        "label": "for, loop y filtros",
        "description": "Un bucle genera fragmentos repetidos; loop.last evita una coma final."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/filtros-jinja",
        "label": "Filtros Jinja",
        "description": "Filtros como join, default, length, map y selectattr transforman valores de plantilla."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/namespace-y-do",
        "label": "namespace y do",
        "description": "namespace conserva estado de plantilla a través de un bucle; do ejecuta una expresión sin imprimirla."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/var-y-vars",
        "label": "var() y --vars",
        "description": "var lee variables de proyecto o CLI, con un valor por defecto opcional."
      },
      {
        "id": "analisis-de-datos/dbt/jinja-basico/env-var",
        "label": "env_var()",
        "description": "Lee variables del sistema para credenciales o parámetros de entorno."
      }
    ]
  },
  {
    "key": "macros-y-contexto",
    "label": "Macros y contexto",
    "children": [
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/definicion",
        "label": "Definición",
        "description": "Una macro encapsula Jinja y SQL reutilizable dentro del proyecto."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/argumentos-y-return",
        "label": "Argumentos y return()",
        "description": "Los argumentos parametrizan la macro; return conserva el tipo de un valor Jinja."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/invocar-macros",
        "label": "Invocar macros",
        "description": "Se invocan desde expresiones Jinja o como operaciones de CLI según su propósito."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/this-y-target",
        "label": "this y target",
        "description": "this identifica la relación del modelo actual; target describe la conexión activa."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/model-graph-y-flags",
        "label": "model, graph y flags",
        "description": "model y graph exponen metadatos del nodo y del proyecto; flags contiene opciones de ejecución."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/execute-parse-y-compilacion",
        "label": "execute, parse y compilación",
        "description": "execute distingue la fase inicial de análisis de la fase de compilación/ejecución de nodos."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/run-query",
        "label": "run_query()",
        "description": "Ejecuta SQL contra la conexión y devuelve una tabla agate para consultas con resultado."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/statement-blocks",
        "label": "Statement blocks",
        "description": "Permiten ejecutar SQL con un nombre y recuperar resultados con load_result."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/adapter-y-relation",
        "label": "adapter y Relation",
        "description": "El objeto adapter permite consultar metadatos y trabajar con relaciones de forma compatible con la plataforma."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/dispatch",
        "label": "dispatch()",
        "description": "Selecciona una implementación de macro por adaptador, con fallback default."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/serializacion-json-y-yaml",
        "label": "Serialización JSON y YAML",
        "description": "fromjson/fromyaml convierten texto a objetos; tojson/toyaml los serializan."
      },
      {
        "id": "analisis-de-datos/dbt/macros-y-contexto/log-exceptions-y-metadatos",
        "label": "log, exceptions y metadatos",
        "description": "log registra mensajes; exceptions puede advertir o detener compilación. invocation_id identifica la ejecución y run_started_at su inicio."
      }
    ]
  },
  {
    "key": "data-tests",
    "label": "Data tests",
    "children": [
      {
        "id": "analisis-de-datos/dbt/data-tests/definicion",
        "label": "Definición",
        "description": "Un data test ejecuta una consulta que devuelve las filas que incumplen una regla de calidad."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/unique",
        "label": "unique",
        "description": "Comprueba que un campo no tenga valores no nulos repetidos."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/not-null",
        "label": "not_null",
        "description": "Detecta filas en que una columna tiene NULL."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/relationships",
        "label": "relationships",
        "description": "Comprueba que los valores no nulos de una columna existan en otra relación."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/accepted-values",
        "label": "accepted_values",
        "description": "Comprueba que los valores no nulos pertenezcan a un conjunto permitido."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/singular-tests",
        "label": "Singular tests",
        "description": "Una consulta SQL en tests valida una regla concreta del negocio."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/custom-generic-tests",
        "label": "Custom generic tests",
        "description": "Una macro test recibe un modelo y argumentos para reutilizar una validación."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/severity-warn-if-y-error-if",
        "label": "Severity, warn_if y error_if",
        "description": "Controlan cuándo el número de fallos produce warning o error."
      },
      {
        "id": "analisis-de-datos/dbt/data-tests/where-y-store-failures",
        "label": "where y store_failures",
        "description": "where limita las filas evaluadas; store_failures persiste los registros fallidos para inspección."
      }
    ]
  },
  {
    "key": "unit-tests-y-contratos",
    "label": "Unit tests y contratos",
    "children": [
      {
        "id": "analisis-de-datos/dbt/unit-tests-y-contratos/definicion",
        "label": "Definición",
        "description": "Los unit tests verifican la lógica de modelos SQL con entradas pequeñas controladas; los contratos fijan la estructura de salida."
      },
      {
        "id": "analisis-de-datos/dbt/unit-tests-y-contratos/unit-test-con-given-y-expect",
        "label": "Unit test con given y expect",
        "description": "given suministra datos simulados a las referencias; expect declara las filas esperadas."
      },
      {
        "id": "analisis-de-datos/dbt/unit-tests-y-contratos/overrides-y-modelos-incrementales",
        "label": "Overrides y modelos incrementales",
        "description": "overrides permite simular macros o variables durante una prueba, por ejemplo is_incremental."
      },
      {
        "id": "analisis-de-datos/dbt/unit-tests-y-contratos/model-contracts",
        "label": "Model contracts",
        "description": "Un contrato enforced comprueba que los nombres y tipos definidos correspondan a la salida del modelo."
      }
    ]
  },
  {
    "key": "source-freshness",
    "label": "Source freshness",
    "children": [
      {
        "id": "analisis-de-datos/dbt/source-freshness/definicion",
        "label": "Definición",
        "description": "Freshness mide el tiempo desde la última actualización registrada en una fuente."
      },
      {
        "id": "analisis-de-datos/dbt/source-freshness/loaded-at-field-y-umbrales",
        "label": "loaded_at_field y umbrales",
        "description": "loaded_at_field identifica el timestamp de carga; warn_after y error_after configuran edades máximas."
      }
    ]
  },
  {
    "key": "seleccion-de-nodos",
    "label": "Selección de nodos",
    "children": [
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/definicion",
        "label": "Definición",
        "description": "Los selectores eligen qué recursos se ejecutan sin modificar el proyecto."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/select-y-exclude",
        "label": "--select y --exclude",
        "description": "select incluye recursos; exclude elimina coincidencias del conjunto elegido."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/operadores-y",
        "label": "Operadores + y @",
        "description": "+ selecciona ancestros o descendientes; @ selecciona un nodo, sus descendientes y los ancestros necesarios de estos."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/metodos-de-seleccion",
        "label": "Métodos de selección",
        "description": "tag, path, config y resource_type permiten seleccionar por metadatos."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/union-e-interseccion",
        "label": "Unión e intersección",
        "description": "Un espacio combina selectores por unión; una coma exige ambas condiciones."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/selectors-yml",
        "label": "selectors.yml",
        "description": "Define selecciones con nombre para reutilizar reglas complejas."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/threads-target-y-fail-fast",
        "label": "Threads, target y fail-fast",
        "description": "threads controla paralelismo; target selecciona conexión; fail-fast detiene el trabajo al detectar un fallo."
      },
      {
        "id": "analisis-de-datos/dbt/seleccion-de-nodos/seleccion-indirecta-de-tests",
        "label": "Selección indirecta de tests",
        "description": "Controla cuándo incluir un test por selección de los modelos que referencia."
      }
    ]
  },
  {
    "key": "modelado-analitico",
    "label": "Modelado analítico",
    "children": [
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/definicion",
        "label": "Definición",
        "description": "Modelar datos es organizar hechos y atributos para contestar preguntas de negocio sin ambigüedades."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/facts-dimensions-y-esquema-estrella",
        "label": "Facts, dimensions y esquema estrella",
        "description": "Los hechos contienen eventos y medidas; dimensiones describen entidades; una estrella conecta hechos con dimensiones."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/grain-y-fan-out",
        "label": "Grain y fan-out",
        "description": "Grain es la unidad de cada fila; fan-out es la multiplicación de filas por un join uno-a-muchos."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/claves-naturales-sustitutas-y-compuestas",
        "label": "Claves naturales, sustitutas y compuestas",
        "description": "Una clave natural viene del negocio; una sustituta identifica una fila de forma técnica; una compuesta usa varias columnas."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/bridge-tables",
        "label": "Bridge tables",
        "description": "Representan relaciones muchos-a-muchos entre entidades."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/deduplicacion",
        "label": "Deduplicación",
        "description": "Selecciona un registro por clave mediante criterios explícitos de prioridad."
      },
      {
        "id": "analisis-de-datos/dbt/modelado-analitico/reconciliacion",
        "label": "Reconciliación",
        "description": "Compara métricas y claves entre origen y destino para detectar pérdidas o duplicados."
      }
    ]
  },
  {
    "key": "incrementales",
    "label": "Incrementales",
    "children": [
      {
        "id": "analisis-de-datos/dbt/incrementales/definicion",
        "label": "Definición",
        "description": "Un modelo incremental conserva su relación y puede limitar filas de entrada en siguientes ejecuciones."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/is-incremental-y-this",
        "label": "is_incremental() y this",
        "description": "is_incremental es verdadero si existe una tabla para el modelo incremental y no se solicita full-refresh."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/unique-key",
        "label": "unique_key",
        "description": "Identifica qué fila existente corresponde a una nueva versión en estrategias compatibles."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/estrategias-append-y-delete-insert",
        "label": "Estrategias append y delete+insert",
        "description": "append añade filas sin reemplazarlas; delete+insert elimina coincidencias de la clave e inserta nuevas versiones."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/estrategias-merge-e-insert-overwrite",
        "label": "Estrategias merge e insert_overwrite",
        "description": "merge actualiza o inserta por clave; insert_overwrite reemplaza particiones o conjuntos definidos por el adaptador."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/microbatch-y-event-time",
        "label": "microbatch y event_time",
        "description": "Divide datos temporales en lotes para procesar intervalos de forma independiente."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/full-refresh-y-full-refresh",
        "label": "--full-refresh y full_refresh",
        "description": "full-refresh solicita reconstruir desde cero; la configuración full_refresh puede permitirla o impedirla."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/on-schema-change",
        "label": "on_schema_change",
        "description": "Define qué hacer cuando cambia la estructura de un incremental: ignore, fail, append_new_columns o sync_all_columns."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/late-arriving-data-y-lookback",
        "label": "Late-arriving data y lookback",
        "description": "Una ventana de revisión vuelve a procesar fechas recientes para capturar registros que llegan tarde."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/incremental-predicates",
        "label": "Incremental predicates",
        "description": "Limitan la búsqueda en el destino durante ciertas estrategias incrementales, reduciendo escaneo."
      },
      {
        "id": "analisis-de-datos/dbt/incrementales/backfill-e-idempotencia",
        "label": "Backfill e idempotencia",
        "description": "Backfill reprocesa historia; idempotencia significa que mismas entradas y lógica producen el mismo estado tras repetir."
      }
    ]
  },
  {
    "key": "snapshots-e-historial",
    "label": "Snapshots e historial",
    "children": [
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/definicion",
        "label": "Definición",
        "description": "Un snapshot registra versiones observadas de filas mutables para conservar historial tipo SCD2."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/timestamp-strategy",
        "label": "Timestamp strategy",
        "description": "Detecta cambios mediante un campo updated_at que aumenta al modificar la fila."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/check-strategy",
        "label": "Check strategy",
        "description": "Compara los valores de columnas elegidas cuando no hay timestamp fiable."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/scd-tipo-1-y-tipo-2",
        "label": "SCD tipo 1 y tipo 2",
        "description": "SCD1 conserva el estado actual; SCD2 guarda versiones con intervalos de validez."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/hard-deletes-y-soft-deletes",
        "label": "Hard deletes y soft deletes",
        "description": "Un hard delete elimina la fila de origen; un soft delete usa una marca de estado."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/metadatos-e-intervalos-de-vigencia",
        "label": "Metadatos e intervalos de vigencia",
        "description": "dbt_valid_from y dbt_valid_to delimitan versiones; dbt_scd_id identifica una versión."
      },
      {
        "id": "analisis-de-datos/dbt/snapshots-e-historial/cdc-e-historial-de-hechos",
        "label": "CDC e historial de hechos",
        "description": "CDC captura cambios de origen; un snapshot observa estados periódicamente y un incremental actualiza resultados según lógica."
      }
    ]
  },
  {
    "key": "documentacion-y-linaje",
    "label": "Documentación y linaje",
    "children": [
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/definicion",
        "label": "Definición",
        "description": "La documentación asocia explicaciones y metadatos a modelos, fuentes y columnas; el DAG muestra cómo se relacionan."
      },
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/doc-blocks-y-doc",
        "label": "Doc blocks y doc()",
        "description": "Un bloque docs guarda texto Markdown reutilizable en descripciones."
      },
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/dbt-docs-generate-y-serve",
        "label": "dbt docs generate y serve",
        "description": "generate construye artefactos y catálogo; serve abre una documentación local de Core."
      },
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/lineage-e-impacto",
        "label": "Lineage e impacto",
        "description": "Permite rastrear entradas y consumidores para evaluar qué se rompe al modificar un modelo."
      },
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/exposures",
        "label": "Exposures",
        "description": "Describen consumidores externos, por ejemplo dashboards, y sus dependencias."
      },
      {
        "id": "analisis-de-datos/dbt/documentacion-y-linaje/metadata-y-persist-docs",
        "label": "Metadata y persist_docs",
        "description": "meta y tags aportan clasificación; persist_docs intenta guardar descripciones como comentarios del motor."
      }
    ]
  },
  {
    "key": "artefactos-y-depuracion",
    "label": "Artefactos y depuración",
    "children": [
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/definicion",
        "label": "Definición",
        "description": "Los artefactos JSON contienen metadatos y resultados de dbt; los logs y SQL compilados ayudan a diagnosticar errores."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/manifest-json",
        "label": "manifest.json",
        "description": "Contiene nodos, configuraciones, dependencias y metadatos del proyecto analizado."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/run-results-json",
        "label": "run_results.json",
        "description": "Registra el resultado y duración de los nodos ejecutados por un comando compatible."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/catalog-json-y-sources-json",
        "label": "catalog.json y sources.json",
        "description": "catalog describe relaciones y columnas inspeccionadas; sources registra resultados de frescura."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/sql-compilado-y-ejecutado",
        "label": "SQL compilado y ejecutado",
        "description": "target/compiled contiene SQL renderizado; target/run suele incluir SQL de construcción emitido por materializaciones."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/errores-de-compilacion-y-base-de-datos",
        "label": "Errores de compilación y base de datos",
        "description": "Un error de compilación suele impedir generar SQL; un error de base de datos surge al ejecutar SQL inválido o sin permisos."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/logs-y-flags-de-diagnostico",
        "label": "Logs y flags de diagnóstico",
        "description": "dbt escribe mensajes de ejecución en consola y logs/dbt.log; log-level y log-format permiten cambiar detalle y formato."
      },
      {
        "id": "analisis-de-datos/dbt/artefactos-y-depuracion/retry",
        "label": "Retry",
        "description": "dbt retry vuelve a intentar recursos fallidos o pendientes de una ejecución compatible previa."
      }
    ]
  },
  {
    "key": "paquetes-y-reutilizacion",
    "label": "Paquetes y reutilización",
    "children": [
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/definicion",
        "label": "Definición",
        "description": "Los paquetes incorporan código dbt de otros proyectos, como macros y tests reutilizables."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/packages-yml-y-dependencies-yml",
        "label": "packages.yml y dependencies.yml",
        "description": "packages.yml declara dependencias de código; dependencies.yml también permite declarar dependencias de proyectos para Mesh en entornos compatibles."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/lockfile-y-version-pinning",
        "label": "Lockfile y version pinning",
        "description": "package-lock.yml registra versiones resueltas; fijar dependencias evita cambios no intencionales."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-utils",
        "label": "dbt-utils",
        "description": "Incluye macros para operaciones comunes, como claves sustitutas y tests de combinaciones únicas."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-expectations-y-hub",
        "label": "dbt-expectations y Hub",
        "description": "Hub permite localizar paquetes; dbt-expectations aporta tests adicionales, sujeto a mantenimiento y compatibilidad."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-modelo",
        "label": "Hooks de modelo",
        "description": "pre_hook y post_hook ejecutan SQL antes o después de construir un recurso."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/hooks-de-proyecto",
        "label": "Hooks de proyecto",
        "description": "on-run-start y on-run-end ejecutan acciones globales de ciertos comandos."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/dbt-run-operation",
        "label": "dbt run-operation",
        "description": "Invoca una macro como operación de CLI y recibe argumentos YAML."
      },
      {
        "id": "analisis-de-datos/dbt/paquetes-y-reutilizacion/materializaciones-personalizadas",
        "label": "Materializaciones personalizadas",
        "description": "Un bloque materialization implementa cómo construir relaciones para un adaptador."
      }
    ]
  },
  {
    "key": "semantic-layer-y-metricflow",
    "label": "Semantic Layer y MetricFlow",
    "children": [
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/definicion",
        "label": "Definición",
        "description": "La capa semántica define métricas y relaciones de negocio encima de modelos para generar consultas coherentes."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/semantic-models-y-entities",
        "label": "Semantic models y entities",
        "description": "Un modelo semántico declara entidades y dimensiones sobre un modelo físico; las entidades primary, foreign, unique y natural representan identidades y relaciones."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/measures-y-simple-metrics-clasico",
        "label": "Measures y simple metrics (clásico)",
        "description": "Una measure define agregación y expresión; una simple metric publica esa agregación como métrica consultable."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/nueva-especificacion-yaml",
        "label": "Nueva especificación YAML",
        "description": "Desde Core 1.12 y entornos Fusion compatibles, se pueden declarar entidades, dimensiones y métricas directamente dentro de models."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/dimensiones-categoricas-y-temporales",
        "label": "Dimensiones categóricas y temporales",
        "description": "Permiten dividir una métrica por atributos o periodos; la granularidad temporal indica el nivel nativo de una fecha."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/ratio-metrics",
        "label": "Ratio metrics",
        "description": "Una ratio divide dos métricas agregadas, por ejemplo ingresos entre pedidos."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/derived-metrics",
        "label": "Derived metrics",
        "description": "Combinan métricas mediante una expresión aritmética."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/time-spine",
        "label": "Time spine",
        "description": "Una relación de fechas consecutivas permite análisis temporal y periodos sin eventos."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/cumulative-metrics",
        "label": "Cumulative metrics",
        "description": "Agregan una medida o métrica a través del tiempo, con ventana móvil o acumulado según configuración."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/conversion-metrics",
        "label": "Conversion metrics",
        "description": "Miden qué proporción de entidades con evento base realiza un evento posterior dentro de una ventana."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/saved-queries-y-exports",
        "label": "Saved queries y exports",
        "description": "Guardan consultas semánticas con métricas y agrupaciones; los exports persisten resultados cuando se habilitan."
      },
      {
        "id": "analisis-de-datos/dbt/semantic-layer-y-metricflow/consumo-desde-bi-y-api",
        "label": "Consumo desde BI y API",
        "description": "La plataforma permite consultar métricas con conectores compatibles o APIs semánticas."
      }
    ]
  },
  {
    "key": "estado-y-ejecucion-selectiva",
    "label": "Estado y ejecución selectiva",
    "children": [
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/definicion",
        "label": "Definición",
        "description": "La selección por estado compara el proyecto actual con artefactos de una ejecución anterior; defer permite resolver referencias contra otro entorno."
      },
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-modified-y-state-new",
        "label": "state:modified y state:new",
        "description": "modified detecta cambios respecto al manifest anterior, new identifica nodos sin identidad equivalente en él."
      },
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/defer-y-state",
        "label": "--defer y --state",
        "description": "Defer permite usar relaciones del manifest de estado para refs no seleccionados cuando corresponde."
      },
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/dbt-clone",
        "label": "dbt clone",
        "description": "Crea clones de relaciones elegibles del estado; según adaptador puede usar una vista en vez de clonación física."
      },
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/result-error-y-result-fail",
        "label": "result:error y result:fail",
        "description": "Seleccionan nodos según el estado de ejecución registrado en run_results.json de una invocación anterior."
      },
      {
        "id": "analisis-de-datos/dbt/estado-y-ejecucion-selectiva/state-aware-orchestration-y-dbt-state",
        "label": "State-aware orchestration y dbt State",
        "description": "En entornos compatibles, el motor puede evaluar cambios de lógica y frescura a nivel de nodo para decidir reutilizar, clonar o reconstruir."
      }
    ]
  },
  {
    "key": "produccion-y-ci-cd",
    "label": "Producción y CI/CD",
    "children": [
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/definicion",
        "label": "Definición",
        "description": "CI valida cambios antes de integrarlos; CD publica cambios aprobados y la orquestación programa ejecuciones."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/git-y-pull-requests",
        "label": "Git y pull requests",
        "description": "Git versiona SQL, YAML, macros y tests, y un pull request permite revisar los cambios."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/entornos-y-permisos",
        "label": "Entornos y permisos",
        "description": "Los targets distinguen conexiones o esquemas; la plataforma administra credenciales y entornos por separado."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/slim-ci",
        "label": "Slim CI",
        "description": "Construye modelos modificados y los dependientes, resolviendo padres no construidos mediante un estado conocido."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/jobs-scheduling-y-triggers",
        "label": "Jobs, scheduling y triggers",
        "description": "Un job agrupa comandos, entorno y condiciones de ejecución; puede ser programado o activado por eventos."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/orquestacion-externa",
        "label": "Orquestación externa",
        "description": "Airflow, Dagster y Prefect coordinan ingestión, transformaciones y publicación como tareas."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/github-actions",
        "label": "GitHub Actions",
        "description": "Un workflow de CI puede preparar dependencias y ejecutar dbt con secretos y un target aislado."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/docker-y-ejecucion-reproducible",
        "label": "Docker y ejecución reproducible",
        "description": "Una imagen fija el entorno de ejecución y permite ejecutar dbt en workers consistentes."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/monitoreo-y-alertas",
        "label": "Monitoreo y alertas",
        "description": "Registrar estado, duración, volumen y frescura permite detectar fallos o degradación."
      },
      {
        "id": "analisis-de-datos/dbt/produccion-y-ci-cd/recuperacion-y-rollback",
        "label": "Recuperación y rollback",
        "description": "Reintentar resuelve fallos corregidos; revertir código y reconstruir puede restaurar lógica anterior."
      }
    ]
  },
  {
    "key": "rendimiento-y-costos",
    "label": "Rendimiento y costos",
    "children": [
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/definicion",
        "label": "Definición",
        "description": "El costo de un proyecto depende del SQL ejecutado, volumen, frecuencia, materializaciones y capacidad del motor."
      },
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/materializacion-y-costo-de-lectura",
        "label": "Materialización y costo de lectura",
        "description": "Una vista difiere cálculo a consumidores; una tabla persiste resultados; un incremental limita reprocesamiento si se diseña correctamente."
      },
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/indices-particiones-y-clustering",
        "label": "Índices, particiones y clustering",
        "description": "Los mecanismos físicos dependen del motor: índices PostgreSQL, particiones/clustering BigQuery, clustering Snowflake, etc."
      },
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/explain-y-filtros",
        "label": "EXPLAIN y filtros",
        "description": "Los filtros y joins determinan qué datos examina el motor; el plan revela estrategias de acceso y estimaciones."
      },
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/partial-parsing-y-cache",
        "label": "Partial parsing y caché",
        "description": "dbt puede reutilizar información de análisis de ejecuciones anteriores para reducir tiempo de parse."
      },
      {
        "id": "analisis-de-datos/dbt/rendimiento-y-costos/concurrencia",
        "label": "Concurrencia",
        "description": "threads permite ejecutar nodos independientes simultáneamente; dependencias y límites del motor restringen la concurrencia."
      }
    ]
  },
  {
    "key": "gobernanza-y-mesh",
    "label": "Gobernanza y Mesh",
    "children": [
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/definicion",
        "label": "Definición",
        "description": "La gobernanza establece responsables, interfaces y permisos para que modelos compartidos se usen con confianza."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/groups-y-ownership",
        "label": "Groups y ownership",
        "description": "Un group agrupa modelos bajo un equipo responsable."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/access-private-protected-public",
        "label": "Access: private, protected, public",
        "description": "private restringe refs al grupo; protected permite refs dentro del proyecto/paquetes compatibles; public permite interfaces entre proyectos habilitados."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/grants",
        "label": "Grants",
        "description": "La configuración grants aplica privilegios a relaciones creadas por dbt en adaptadores compatibles."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/model-versions",
        "label": "Model versions",
        "description": "Permiten coexistir versiones de una interfaz y elegir latest_version para refs sin versión explícita."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/deprecacion",
        "label": "Deprecación",
        "description": "deprecation_date señala cuándo una versión dejará de ser una interfaz soportada."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/dbt-mesh-y-dependencias-entre-proyectos",
        "label": "dbt Mesh y dependencias entre proyectos",
        "description": "Mesh divide dominios en proyectos y permite consumir modelos públicos sin incorporar todo el código productor."
      },
      {
        "id": "analisis-de-datos/dbt/gobernanza-y-mesh/cross-project-ref",
        "label": "Cross-project ref",
        "description": "ref con dos argumentos identifica proyecto/paquete y modelo."
      }
    ]
  },
  {
    "key": "extensibilidad-e-integraciones",
    "label": "Extensibilidad e integraciones",
    "children": [
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/definicion",
        "label": "Definición",
        "description": "dbt se integra con herramientas de ingestión, orquestación, calidad y consumo mediante modelos, artefactos, APIs y adaptadores."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/dbtrunner-e-invoke",
        "label": "dbtRunner e invoke()",
        "description": "La API Python de Core permite invocar comandos dbt y examinar su resultado."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/dependencias-explicitas-y-dinamicas",
        "label": "Dependencias explícitas y dinámicas",
        "description": "dbt normalmente detecta ref/source durante parse; una referencia escondida por un condicional puede requerir una dependencia explícita."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/adaptadores-personalizados",
        "label": "Adaptadores personalizados",
        "description": "Un adaptador integra conexiones, relaciones, macros y estrategias de un motor con dbt."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/administrative-discovery-y-semantic-layer-apis",
        "label": "Administrative, Discovery y Semantic Layer APIs",
        "description": "Las APIs de plataforma permiten administrar jobs, consultar metadatos y consumir métricas respectivamente."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/observabilidad-y-telemetria",
        "label": "Observabilidad y telemetría",
        "description": "Logs estructurados y artefactos permiten alimentar plataformas de observabilidad; OpenTelemetry puede integrar trazas donde exista soporte."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/calidad-externa-y-auditoria",
        "label": "Calidad externa y auditoría",
        "description": "Great Expectations y Elementary amplían validaciones/observabilidad; dbt-audit-helper facilita comparar versiones de modelos."
      },
      {
        "id": "analisis-de-datos/dbt/extensibilidad-e-integraciones/sqlfluff-y-desarrollo",
        "label": "SQLFluff y desarrollo",
        "description": "SQLFluff analiza estilo SQL; el templater dbt puede resolver Jinja con el proyecto y adaptador configurados."
      }
    ]
  }
];
