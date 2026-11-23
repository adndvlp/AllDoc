import {defineSqlGroup} from './factory.ts';
import results from './results/transactions.ts';
export const notes=defineSqlGroup([
  {
    "key": "transactions/definicion",
    "examples": [
      {
        "title": "Deshacer un cambio",
        "code": "BEGIN;\nUPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nROLLBACK;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
        "hint": "ROLLBACK devuelve la cuenta 1 a su saldo inicial de 10000.",
        "changes": {
          "mysql": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nROLLBACK;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "mariadb": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nROLLBACK;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "oracle": {
            "code": "UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nROLLBACK;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "Oracle inicia la transacción con el primer DML; BEGIN de PL/SQL no equivale a BEGIN TRANSACTION."
          },
          "sqlserver": {
            "code": "BEGIN TRANSACTION;\nUPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;\nROLLBACK;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "BEGIN TRANSACTION inicia el bloque T-SQL; ante errores debes tratar el estado y revertir cuando corresponda."
          }
        }
      },
      {
        "title": "Transferencia comprobada",
        "code": "CREATE TEMP TABLE IF NOT EXISTS practica_control (ok INTEGER NOT NULL);\nBEGIN;\nUPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\nINSERT OR ROLLBACK INTO practica_control\n  VALUES (CASE WHEN changes() = 1 THEN 1 ELSE NULL END);\nUPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\nINSERT OR ROLLBACK INTO practica_control\n  VALUES (CASE WHEN changes() = 1 THEN 1 ELSE NULL END);\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
        "hint": "El control exige una fila afectada después de cada UPDATE. Si no, NULL viola NOT NULL y OR ROLLBACK revierte todo; no se acredita saldo sin débito.",
        "changes": {
          "postgresql": {
            "code": "DO $transfer$\nBEGIN\n  UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\n  IF NOT FOUND THEN RAISE EXCEPTION 'Debito no realizado'; END IF;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\n  IF NOT FOUND THEN RAISE EXCEPTION 'Destino inexistente'; END IF;\nEND;\n$transfer$;\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
            "explanation": "DO es una sentencia atómica en una sesión con autocommit: una excepción aborta sus cambios. Si ya hay una transacción externa, queda fallida y debes hacer ROLLBACK. Este PL/pgSQL se copia para tu servidor.",
            "external": true
          },
          "sqlserver": {
            "code": "BEGIN TRY\n  BEGIN TRANSACTION;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\n  IF @@ROWCOUNT <> 1 THROW 51000, 'Debito no realizado', 1;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\n  IF @@ROWCOUNT <> 1 THROW 51001, 'Destino inexistente', 1;\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF XACT_STATE() <> 0 ROLLBACK;\n  THROW;\nEND CATCH;\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
            "explanation": "T-SQL comprueba @@ROWCOUNT y revierte en CATCH. Úsalo sin una transacción previa abierta; se copia para tu servidor.",
            "external": true
          },
          "oracle": {
            "code": "BEGIN\n  UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\n  IF SQL%ROWCOUNT <> 1 THEN RAISE_APPLICATION_ERROR(-20001, 'Debito no realizado'); END IF;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\n  IF SQL%ROWCOUNT <> 1 THEN RAISE_APPLICATION_ERROR(-20002, 'Destino inexistente'); END IF;\n  COMMIT;\nEXCEPTION WHEN OTHERS THEN\n  ROLLBACK;\n  RAISE;\nEND;\n/\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
            "explanation": "PL/SQL valida SQL%ROWCOUNT y hace ROLLBACK ante un error. / termina el bloque en SQL*Plus/SQLcl. Se copia para tu servidor.",
            "external": true
          },
          "mysql": {
            "code": "DROP PROCEDURE IF EXISTS alldoc_transferir_demo;\nDELIMITER //\nCREATE PROCEDURE alldoc_transferir_demo()\nBEGIN\n  DECLARE EXIT HANDLER FOR SQLEXCEPTION\n  BEGIN ROLLBACK; RESIGNAL; END;\n  START TRANSACTION;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\n  IF ROW_COUNT() <> 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debito no realizado'; END IF;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\n  IF ROW_COUNT() <> 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destino inexistente'; END IF;\n  COMMIT;\nEND//\nDELIMITER ;\nCALL alldoc_transferir_demo();\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
            "explanation": "Rutina de práctica para una sesión sin trabajo pendiente. El cliente mysql/mariadb usa DELIMITER; requiere permisos de rutina y tablas InnoDB. El handler revierte ante un error. Se copia para tu servidor.",
            "external": true
          },
          "mariadb": {
            "code": "DROP PROCEDURE IF EXISTS alldoc_transferir_demo;\nDELIMITER //\nCREATE PROCEDURE alldoc_transferir_demo()\nBEGIN\n  DECLARE EXIT HANDLER FOR SQLEXCEPTION\n  BEGIN ROLLBACK; RESIGNAL; END;\n  START TRANSACTION;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE id = 1 AND saldo >= 500;\n  IF ROW_COUNT() <> 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debito no realizado'; END IF;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE id = 2;\n  IF ROW_COUNT() <> 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destino inexistente'; END IF;\n  COMMIT;\nEND//\nDELIMITER ;\nCALL alldoc_transferir_demo();\nSELECT id, saldo FROM cuentas WHERE id IN (1, 2) ORDER BY id;",
            "explanation": "Rutina de práctica para una sesión sin trabajo pendiente. El cliente mysql/mariadb usa DELIMITER; requiere permisos de rutina y tablas InnoDB. El handler revierte ante un error. Se copia para tu servidor.",
            "external": true
          }
        }
      }
    ],
    "remember": "Una transferencia debe validar ambas cuentas y el débito antes de confirmar.",
    "note": "Usa una sesión de práctica sin una transacción previa abierta. BEGIN/COMMIT no revierten todos los errores automáticamente. DDL puede confirmar implícitamente en MySQL, MariaDB y Oracle; su rollback no es universal."
  },
  {
    "key": "transactions/begin",
    "examples": [
      {
        "title": "Cambio todavía pendiente",
        "code": "BEGIN;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
        "hint": "Puedes ejecutar COMMIT; o ROLLBACK; después, en el mismo panel.",
        "changes": {
          "mysql": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "mariadb": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "oracle": {
            "code": "UPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "Oracle inicia la transacción con el primer DML; BEGIN de PL/SQL no equivale a BEGIN TRANSACTION."
          },
          "sqlserver": {
            "code": "BEGIN TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "BEGIN TRANSACTION inicia el bloque T-SQL; ante errores debes tratar el estado y revertir cuando corresponda."
          }
        }
      }
    ],
    "remember": "Ver tu propio cambio no significa haberlo confirmado.",
    "note": "Usa una sesión de práctica sin una transacción previa abierta. BEGIN/COMMIT no revierten todos los errores automáticamente. DDL puede confirmar implícitamente en MySQL, MariaDB y Oracle; su rollback no es universal."
  },
  {
    "key": "transactions/commit",
    "examples": [
      {
        "title": "Confirmar el cambio",
        "code": "BEGIN;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
        "hint": "El saldo queda en 10100 con la semilla inicial.",
        "changes": {
          "mysql": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "mariadb": {
            "code": "START TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "oracle": {
            "code": "UPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "Oracle inicia la transacción con el primer DML; BEGIN de PL/SQL no equivale a BEGIN TRANSACTION."
          },
          "sqlserver": {
            "code": "BEGIN TRANSACTION;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "BEGIN TRANSACTION inicia el bloque T-SQL; ante errores debes tratar el estado y revertir cuando corresponda."
          }
        }
      }
    ],
    "remember": "Después de confirmar, un ROLLBACK posterior no deshace ese bloque.",
    "note": "Usa una sesión de práctica sin una transacción previa abierta. BEGIN/COMMIT no revierten todos los errores automáticamente. DDL puede confirmar implícitamente en MySQL, MariaDB y Oracle; su rollback no es universal."
  },
  {
    "key": "transactions/rollback",
    "examples": [
      {
        "title": "Recuperar un movimiento",
        "code": "BEGIN;\nDELETE FROM movimientos_stock WHERE id = 1;\nROLLBACK;\nSELECT COUNT(*) AS conservado FROM movimientos_stock WHERE id = 1;",
        "hint": "El movimiento vuelve a estar: conservado vale 1.",
        "changes": {
          "mysql": {
            "code": "START TRANSACTION;\nDELETE FROM movimientos_stock WHERE id = 1;\nROLLBACK;\nSELECT COUNT(*) AS conservado FROM movimientos_stock WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "mariadb": {
            "code": "START TRANSACTION;\nDELETE FROM movimientos_stock WHERE id = 1;\nROLLBACK;\nSELECT COUNT(*) AS conservado FROM movimientos_stock WHERE id = 1;",
            "explanation": "START TRANSACTION inicia el bloque con tablas transaccionales; no incluyas DDL que provoque commit implícito."
          },
          "oracle": {
            "code": "DELETE FROM movimientos_stock WHERE id = 1;\nROLLBACK;\nSELECT COUNT(*) AS conservado FROM movimientos_stock WHERE id = 1;",
            "explanation": "Oracle inicia la transacción con el primer DML; BEGIN de PL/SQL no equivale a BEGIN TRANSACTION."
          },
          "sqlserver": {
            "code": "BEGIN TRANSACTION;\nDELETE FROM movimientos_stock WHERE id = 1;\nROLLBACK;\nSELECT COUNT(*) AS conservado FROM movimientos_stock WHERE id = 1;",
            "explanation": "BEGIN TRANSACTION inicia el bloque T-SQL; ante errores debes tratar el estado y revertir cuando corresponda."
          }
        }
      }
    ],
    "remember": "Solo se revierten operaciones pendientes que el motor permita revertir.",
    "note": "Usa una sesión de práctica sin una transacción previa abierta. BEGIN/COMMIT no revierten todos los errores automáticamente. DDL puede confirmar implícitamente en MySQL, MariaDB y Oracle; su rollback no es universal."
  },
  {
    "key": "transactions/autocommit",
    "examples": [
      {
        "title": "Sin BEGIN en el panel SQLite",
        "code": "UPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
        "hint": "En este panel SQLite la sentencia terminada se confirma automáticamente.",
        "changes": {
          "postgresql": {
            "code": "UPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "El cliente psql normalmente usa autocommit; otros clientes o drivers pueden abrir una transacción. Comprueba su configuración."
          },
          "mysql": {
            "code": "SET autocommit = 1;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "SET autocommit = 1 puede confirmar trabajo pendiente. Ejecútalo solo en una sesión de práctica sin transacción abierta."
          },
          "mariadb": {
            "code": "SET autocommit = 1;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "El modo de sesión controla autocommit. Cambiarlo puede confirmar trabajo pendiente; usa una sesión sin cambios previos."
          },
          "sqlserver": {
            "code": "SET IMPLICIT_TRANSACTIONS OFF;\nUPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "Fuera de un bloque explícito, IMPLICIT_TRANSACTIONS OFF permite autocommit; no confirma por sí solo una transacción ya abierta."
          },
          "oracle": {
            "code": "UPDATE cuentas SET saldo = saldo + 100 WHERE id = 1;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id = 1;",
            "explanation": "El cliente controla el autocommit de Oracle; aquí COMMIT es explícito para no suponer su configuración."
          }
        }
      }
    ],
    "remember": "Confirmado significa dentro de esta base en memoria: reiniciar el entorno reconstruye los datos.",
    "note": "Usa una sesión de práctica sin una transacción previa abierta. BEGIN/COMMIT no revierten todos los errores automáticamente. DDL puede confirmar implícitamente en MySQL, MariaDB y Oracle; su rollback no es universal."
  }
],results);
