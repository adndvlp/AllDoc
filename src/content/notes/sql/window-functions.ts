import {defineSqlGroup} from './factory.ts';
import results from './results/window-functions.ts';
export const notes=defineSqlGroup([
  {
    "key": "window-functions/definicion",
    "examples": [
      {
        "title": "Total junto a cada empleado",
        "code": "SELECT id, salario, SUM(salario) OVER () AS total\nFROM empleados ORDER BY id;",
        "hint": "Se conservan las doce filas; el total se repite junto a cada una."
      }
    ],
    "remember": "GROUP BY reduce a grupos; una ventana conserva las filas de la consulta."
  },
  {
    "key": "window-functions/over",
    "examples": [
      {
        "title": "Ventana de todos los empleados",
        "code": "SELECT id, salario, SUM(salario) OVER () AS total\nFROM empleados ORDER BY id;",
        "hint": "Se conservan las doce filas; el total se repite junto a cada una."
      }
    ],
    "remember": "GROUP BY reduce a grupos; una ventana conserva las filas de la consulta."
  },
  {
    "key": "window-functions/partition-by",
    "examples": [
      {
        "title": "Total de cada departamento",
        "code": "SELECT id, departamento_id, salario,\n  SUM(salario) OVER (PARTITION BY departamento_id) AS total_departamento\nFROM empleados ORDER BY departamento_id, id;",
        "hint": "Cada empleado ve el total de su departamento."
      }
    ],
    "remember": "La partición no establece el orden en que se muestran las filas."
  },
  {
    "key": "window-functions/order-by",
    "examples": [
      {
        "title": "Acumulado por departamento",
        "code": "SELECT id, departamento_id, salario,\n  SUM(salario) OVER (PARTITION BY departamento_id\n    ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS acumulado\nFROM empleados ORDER BY departamento_id, id;",
        "hint": "El acumulado vuelve a empezar al cambiar de departamento."
      }
    ],
    "remember": "ORDER BY dentro de OVER y ORDER BY de salida tienen responsabilidades distintas."
  },
  {
    "key": "window-functions/frame",
    "examples": [
      {
        "title": "ROWS frente a RANGE con empates",
        "code": "SELECT id, salario,\n  SUM(salario) OVER (ORDER BY salario DESC, id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS por_fila,\n  SUM(salario) OVER (ORDER BY salario DESC\n    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS por_valor\nFROM empleados ORDER BY salario DESC, id;",
        "hint": "ROWS suma una fila cada vez; RANGE incluye los empates del salario actual."
      }
    ],
    "remember": "Declara el marco cuando cambia el acumulado; no presupongas que el marco por defecto es ROWS."
  },
  {
    "key": "window-functions/row-number",
    "examples": [
      {
        "title": "Posiciones sin empates",
        "code": "SELECT id, salario,\n  ROW_NUMBER() OVER (ORDER BY salario DESC, id) AS posicion\nFROM empleados ORDER BY salario DESC, id;",
        "hint": "id desempata salarios iguales y vuelve reproducible la posición."
      }
    ],
    "remember": "Sin desempate, las filas con el mismo salario pueden intercambiar posiciones."
  },
  {
    "key": "window-functions/rank",
    "examples": [
      {
        "title": "Dos formas de numerar empates",
        "code": "SELECT id, salario,\n  RANK() OVER (ORDER BY salario DESC) AS puesto,\n  DENSE_RANK() OVER (ORDER BY salario DESC) AS puesto_denso\nFROM empleados ORDER BY salario DESC, id;",
        "hint": "Tres salarios en primer lugar: el siguiente puesto es 4 con RANK y 2 con DENSE_RANK."
      }
    ],
    "remember": "No metas id dentro de esta ventana si quieres conservar el empate por salario."
  },
  {
    "key": "window-functions/lag-lead",
    "examples": [
      {
        "title": "Empleado anterior y siguiente",
        "code": "SELECT id, salario,\n  LAG(id) OVER (ORDER BY salario DESC, id) AS anterior,\n  LEAD(id) OVER (ORDER BY salario DESC, id) AS siguiente\nFROM empleados ORDER BY salario DESC, id;",
        "hint": "En el primer empleado no hay anterior: devuelve NULL."
      }
    ],
    "remember": "Usa el mismo orden y desempate para interpretar las filas vecinas."
  },
  {
    "key": "window-functions/agregados",
    "examples": [
      {
        "title": "Salario frente al promedio",
        "code": "SELECT id, salario, AVG(salario * 1.0) OVER () AS promedio,\n  salario - AVG(salario * 1.0) OVER () AS diferencia\nFROM empleados ORDER BY id;",
        "hint": "La diferencia es positiva si el salario supera el promedio."
      }
    ],
    "remember": "El cálculo conserva una fila por empleado; no sustituye sus valores guardados."
  }
],results);
