// Generado desde specs/r.md por scripts/prepare-r-notes.mjs.
export const notes = [
  {
    "id": "analisis-de-datos/r/entorno-y-paquetes/definicion",
    "remember": "El archivo .R guarda instrucciones; la sesión guarda objetos.",
    "examples": [
      {
        "id": "r/entorno-y-paquetes/definicion/1",
        "title": "Ejecutar una operación",
        "language": "r",
        "code": "print(100 + 20)",
        "hint": "`print()` muestra el resultado.",
        "textOutput": "`120`.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/entorno-y-paquetes/rstudio-y-proyectos",
    "remember": "Usa rutas relativas al proyecto.",
    "note": "RStudio es un IDE opcional, no el lenguaje R.",
    "examples": [
      {
        "id": "r/entorno-y-paquetes/rstudio-y-proyectos/1",
        "title": "Consultar la carpeta activa",
        "language": "r",
        "code": "getwd()",
        "hint": "`getwd()` no cambia la carpeta.",
        "textOutput": "Ruta absoluta del directorio actual; depende del entorno.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/entorno-y-paquetes/instalar-y-cargar-paquetes",
    "remember": "Instala una vez; carga en cada sesión.",
    "examples": [
      {
        "id": "r/entorno-y-paquetes/instalar-y-cargar-paquetes/1",
        "title": "Cargar dplyr",
        "language": "r",
        "code": "# install.packages(\"dplyr\")\nlibrary(dplyr)",
        "hint": "Quita el comentario solo cuando necesites instalarlo.",
        "textOutput": "Paquete cargado si está instalado.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/entorno-y-paquetes/namespace-y-ayuda",
    "remember": "Usa `paquete::función` cuando haya nombres iguales.",
    "examples": [
      {
        "id": "r/entorno-y-paquetes/namespace-y-ayuda/1",
        "title": "Consultar ayuda de una función",
        "language": "r",
        "code": "?dplyr::filter",
        "hint": "El prefijo identifica la biblioteca. Practica este ejemplo en una instalación de R con el entorno indicado en la ficha.",
        "textOutput": "Página de ayuda de `filter()` en la interfaz disponible.",
        "resultLabel": "Ver resultado esperado",
        "external": true
      }
    ]
  },
  {
    "id": "analisis-de-datos/r/entorno-y-paquetes/versiones",
    "remember": "Registra versiones al compartir análisis.",
    "examples": [
      {
        "id": "r/entorno-y-paquetes/versiones/1",
        "title": "Consultar versión de dplyr",
        "language": "r",
        "code": "packageVersion(\"dplyr\")",
        "hint": "El resultado depende de la instalación.",
        "textOutput": "Versión instalada, por ejemplo 1.1.4.",
        "resultLabel": "Ver resultado esperado"
      }
    ]
  }
];
