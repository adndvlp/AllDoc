import {defineSqlGroup} from './factory.ts';
import results from './results/text-functions.ts';
export const notes=defineSqlGroup([
  {
    "key": "text-functions/definicion",
    "examples": [
      {
        "title": "Una etiqueta en mayúsculas",
        "code": "SELECT nombre, UPPER(nombre) AS etiqueta\nFROM productos WHERE id = 1;",
        "hint": "Teclado aparece como TECLADO en la columna calculada."
      }
    ],
    "remember": "Una función en SELECT no cambia el texto guardado."
  },
  {
    "key": "text-functions/upper",
    "examples": [
      {
        "title": "Nombre en mayúsculas",
        "code": "SELECT nombre, UPPER(nombre) AS etiqueta\nFROM productos WHERE id = 1;",
        "hint": "El nombre original sigue guardado igual.",
        "changes": {
          "sqlite": {
            "code": "SELECT nombre, UPPER(nombre) AS etiqueta\nFROM productos WHERE id = 1;",
            "explanation": "UPPER integrado convierte letras ASCII; no convierte todos los acentos sin una extensión Unicode."
          }
        }
      }
    ],
    "remember": "Las reglas de letras y acentos dependen del motor."
  },
  {
    "key": "text-functions/lower",
    "examples": [
      {
        "title": "Correo en minúsculas",
        "code": "SELECT LOWER('VENTAS@EMPRESA.TEST') AS correo\nFROM clientes WHERE id = 1;",
        "hint": "Sirve para presentar texto con un formato uniforme."
      }
    ],
    "remember": "SQLite integrado convierte ASCII; otros motores dependen de su configuración."
  },
  {
    "key": "text-functions/length",
    "examples": [
      {
        "title": "Tamaño del nombre",
        "code": "SELECT nombre, LENGTH(nombre) AS caracteres\nFROM productos WHERE id = 1;",
        "hint": "Teclado tiene 7 caracteres.",
        "changes": {
          "mysql": {
            "code": "SELECT nombre, CHAR_LENGTH(nombre) AS caracteres\nFROM productos WHERE id = 1;",
            "explanation": "CHAR_LENGTH cuenta caracteres; LENGTH cuenta bytes."
          },
          "mariadb": {
            "code": "SELECT nombre, CHAR_LENGTH(nombre) AS caracteres\nFROM productos WHERE id = 1;",
            "explanation": "CHAR_LENGTH evita depender del modo Oracle: LENGTH normalmente cuenta bytes."
          },
          "sqlserver": {
            "code": "SELECT nombre, LEN(nombre) AS caracteres\nFROM productos WHERE id = 1;",
            "explanation": "LEN no cuenta espacios al final; no es una longitud idéntica para cualquier texto."
          }
        }
      }
    ],
    "remember": "Caracteres y bytes no son la misma medida."
  },
  {
    "key": "text-functions/substring",
    "examples": [
      {
        "title": "Primeras tres letras",
        "code": "SELECT SUBSTR(nombre, 1, 3) AS prefijo\nFROM productos WHERE id = 1;",
        "hint": "Empieza en el carácter 1 y toma 3: Tec.",
        "changes": {
          "sqlserver": {
            "code": "SELECT SUBSTRING(nombre, 1, 3) AS prefijo\nFROM productos WHERE id = 1;",
            "explanation": "SQL Server usa SUBSTRING."
          }
        }
      }
    ],
    "remember": "La primera posición es 1."
  },
  {
    "key": "text-functions/trim",
    "examples": [
      {
        "title": "Limpiar un nombre",
        "code": "SELECT TRIM('  Teclado mecánico  ') AS nombre\nFROM productos WHERE id = 1;",
        "hint": "Conserva el espacio entre Teclado y mecánico."
      }
    ],
    "remember": "No elimina todos los espacios interiores."
  },
  {
    "key": "text-functions/replace",
    "examples": [
      {
        "title": "Cambiar el separador",
        "code": "SELECT REPLACE('VENTAS-2026-01', '-', '/') AS referencia\nFROM productos WHERE id = 1;",
        "hint": "La referencia se muestra como VENTAS/2026/01."
      }
    ],
    "remember": "Esta función transforma texto; no reemplaza registros."
  },
  {
    "key": "text-functions/concat",
    "examples": [
      {
        "title": "Nombre y categoría",
        "code": "SELECT nombre || ' · ' || categoria AS etiqueta\nFROM productos WHERE id = 1;",
        "hint": "Une las tres partes en una columna.",
        "changes": {
          "mysql": {
            "code": "SELECT CONCAT(nombre, ' · ', categoria) AS etiqueta\nFROM productos WHERE id = 1;",
            "explanation": "CONCAT devuelve NULL si algún argumento es NULL."
          },
          "mariadb": {
            "code": "SELECT CONCAT(nombre, ' · ', categoria) AS etiqueta\nFROM productos WHERE id = 1;",
            "explanation": "En modo habitual, CONCAT devuelve NULL si algún argumento es NULL."
          },
          "sqlserver": {
            "code": "SELECT CONCAT(nombre, ' · ', categoria) AS etiqueta\nFROM productos WHERE id = 1;",
            "explanation": "CONCAT trata NULL como texto vacío; en este ejemplo las columnas son obligatorias."
          },
          "oracle": {
            "code": "SELECT nombre || ' · ' || categoria AS etiqueta\nFROM productos WHERE id = 1;",
            "explanation": "Oracle concatena con ||; su tratamiento de NULL y cadena vacía difiere de SQLite."
          }
        }
      }
    ],
    "remember": "Si una parte puede faltar, define qué hacer con NULL."
  }
],results);
