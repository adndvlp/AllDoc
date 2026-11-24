// Generado desde specs/airflow.md por scripts/prepare-airflow-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/airflow/task-mapping/definicion",
    "remember": "expand define los elementos a procesar; el scheduler expande la tarea.",
    "examples": [
      {
        "id": "airflow/task-mapping/definicion/1",
        "title": "Procesar dos países",
        "language": "python",
        "code": "@task\ndef procesar(pais):\n    print(pais)\nprocesar.expand(pais=[\"MX\", \"ES\"])",
        "hint": "El orden de ejecución entre instancias no está garantizado.",
        "textOutput": "Dos instancias mapeadas imprimen MX y ES.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/expand-con-resultado-upstream",
    "remember": "Usa una lista o diccionario serializable de tamaño controlado.",
    "examples": [
      {
        "id": "airflow/task-mapping/expand-con-resultado-upstream/1",
        "title": "Descubrir lotes durante ejecución",
        "language": "python",
        "code": "@task\ndef descubrir():\n    return [\"2026-09-01\", \"2026-09-02\"]\n@task\ndef procesar(dia):\n    print(dia)\nprocesar.expand(dia=descubrir())",
        "hint": "Con una lista vacía la tarea mapeada queda skipped.",
        "textOutput": "El scheduler crea dos instancias cuando descubrir termina.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/partial-y-expand",
    "remember": "Los argumentos del operator como task_id van en partial.",
    "examples": [
      {
        "id": "airflow/task-mapping/partial-y-expand/1",
        "title": "Usar el mismo umbral para cada país",
        "language": "python",
        "code": "@task\ndef validar(pais, minimo):\n    print(pais, minimo)\nvalidar.partial(minimo=2).expand(pais=[\"MX\", \"ES\"])",
        "hint": "Un argumento fijo no se convierte en otro eje de expansión.",
        "textOutput": "Dos instancias imprimen su país y 2.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/expand-kwargs",
    "remember": "Las claves deben coincidir con los nombres de parámetros.",
    "examples": [
      {
        "id": "airflow/task-mapping/expand-kwargs/1",
        "title": "Configurar dos lotes distintos",
        "language": "python",
        "code": "@task\ndef cargar(pais, dia):\n    print(pais, dia)\ncargar.expand_kwargs([{\"pais\":\"MX\", \"dia\":\"2026-09-01\"}, {\"pais\":\"ES\", \"dia\":\"2026-09-02\"}])",
        "hint": "Evita combinaciones cartesianas accidentales de dos listas independientes.",
        "textOutput": "Dos instancias, una por diccionario.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/map-zip-y-concat",
    "remember": "zip sin valor de relleno termina en la secuencia más corta.",
    "examples": [
      {
        "id": "airflow/task-mapping/map-zip-y-concat/1",
        "title": "Emparejar países y fechas",
        "language": "python",
        "code": "@task\ndef paises():\n    return [\"MX\", \"ES\"]\n@task\ndef fechas():\n    return [\"2026-09-01\", \"2026-09-02\"]\n@task\ndef ejecutar(par):\n    print(par[0], par[1])\nejecutar.expand(par=paises().zip(fechas()))",
        "hint": "Para map usa una función Python normal; concat conserva elementos de las secuencias en orden.",
        "textOutput": "Se procesan los pares MX/01 y ES/02.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/map-reduce",
    "remember": "Los resultados pueden llegar como secuencia lazy; evita materializar grandes volúmenes.",
    "examples": [
      {
        "id": "airflow/task-mapping/map-reduce/1",
        "title": "Sumar importes procesados",
        "language": "python",
        "code": "@task\ndef doble(n):\n    return n * 2\n@task\ndef sumar(valores):\n    return sum(valores)\nsumar(doble.expand(n=[2,3,4]))",
        "hint": "La tarea reductora depende del conjunto de instancias.",
        "textOutput": "El retorno final es 18.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/mapped-taskgroups",
    "remember": "Cada instancia del grupo mantiene sus dependencias internas.",
    "examples": [
      {
        "id": "airflow/task-mapping/mapped-taskgroups/1",
        "title": "Validar y procesar por país",
        "language": "python",
        "code": "@task\ndef validar(pais):\n    return pais.lower()\n@task\ndef publicar(pais):\n    print(pais)\n@task_group\ndef flujo(pais):\n    publicar(validar(pais))\nflujo.expand(pais=[\"MX\", \"ES\"])",
        "hint": "No uses if sobre el argumento mapeado durante la construcción del grupo.",
        "textOutput": "Cada país tiene validación y publicación; se imprimen mx y es.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/airflow/task-mapping/map-y-concat",
    "remember": "La función de map no es una tarea decorada.",
    "examples": [
      {
        "id": "airflow/task-mapping/map-y-concat/1",
        "title": "Normalizar y combinar códigos de país",
        "language": "python",
        "code": "@task\ndef a():\n    return [\"mx\"]\n@task\ndef b():\n    return [\"es\"]\ndef mayuscula(x):\n    return x.upper()\n@task\ndef ver(pais):\n    print(pais)\nver.expand(pais=a().concat(b()).map(mayuscula))",
        "hint": "El mapping usa las referencias a los resultados de a y b.",
        "textOutput": "Dos instancias imprimen MX y ES.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  }
];
