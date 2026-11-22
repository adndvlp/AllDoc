import {defineSqlGroup} from './factory.ts';
import results from './results/create-table.ts';
export const notes=defineSqlGroup([
  {
    "key": "create-table/definicion",
    "examples": [
      {
        "title": "Crear y usar una tabla",
        "code": "CREATE TABLE practica_contactos (\n  id INTEGER NOT NULL PRIMARY KEY,\n  nombre VARCHAR(80) NOT NULL\n);\nINSERT INTO practica_contactos VALUES (1, 'Compras');\nSELECT * FROM practica_contactos;",
        "hint": "CREATE define la estructura; INSERT añade datos; SELECT permite verlos."
      }
    ],
    "remember": "Crear una tabla no añade filas por sí solo.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/tipos",
    "examples": [
      {
        "title": "Entero, decimal y texto",
        "code": "CREATE TABLE practica_tipos (\n  unidades INTEGER, precio DECIMAL(10,2), nombre VARCHAR(80)\n);\nINSERT INTO practica_tipos VALUES (2, 19.50, 'Cable');\nSELECT * FROM practica_tipos;",
        "hint": "INTEGER para unidades, DECIMAL para importes y VARCHAR para texto."
      }
    ],
    "remember": "SQLite usa afinidad: DECIMAL no garantiza dos decimales ni precisión monetaria fija.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/if-not-exists",
    "examples": [
      {
        "title": "Creación condicional",
        "code": "CREATE TABLE IF NOT EXISTS practica_condicional (id INTEGER NOT NULL PRIMARY KEY);\nINSERT INTO practica_condicional VALUES (1);\nSELECT * FROM practica_condicional;",
        "hint": "No compara ni actualiza la estructura de una tabla existente.",
        "changes": {
          "sqlserver": {
            "unavailable": true,
            "explanation": "SQL Server no incluye IF NOT EXISTS dentro de CREATE TABLE. Se debe comprobar la existencia por separado; consulta la variante SQLite para practicar."
          }
        }
      }
    ],
    "remember": "IF NOT EXISTS no vuelve idempotentes los INSERT posteriores.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/primary-key",
    "examples": [
      {
        "title": "Identificador explícito",
        "code": "CREATE TABLE practica_clave (\n  id INTEGER NOT NULL PRIMARY KEY, nombre VARCHAR(80)\n);\nINSERT INTO practica_clave VALUES (101, 'Compras');\nSELECT * FROM practica_clave;",
        "hint": "Aquí proporcionas el id 101; la clave no genera IDs por ser PRIMARY KEY."
      },
      {
        "title": "Generar el id",
        "code": "CREATE TABLE practica_auto (id INTEGER PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
        "hint": "En una tabla SQLite normal, INTEGER PRIMARY KEY usa el rowid y puede generar el id. No garantiza que jamás se reutilice.",
        "changes": {
          "postgresql": {
            "code": "CREATE TABLE practica_auto (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
            "explanation": "La generación automática se declara por separado en este motor; no es una propiedad general de PRIMARY KEY."
          },
          "sqlserver": {
            "code": "CREATE TABLE practica_auto (id INTEGER IDENTITY(1,1) PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
            "explanation": "La generación automática se declara por separado en este motor; no es una propiedad general de PRIMARY KEY."
          },
          "oracle": {
            "code": "CREATE TABLE practica_auto (id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
            "explanation": "La generación automática se declara por separado en este motor; no es una propiedad general de PRIMARY KEY."
          },
          "mysql": {
            "code": "CREATE TABLE practica_auto (id INTEGER AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
            "explanation": "La generación automática se declara por separado en este motor; no es una propiedad general de PRIMARY KEY."
          },
          "mariadb": {
            "code": "CREATE TABLE practica_auto (id INTEGER AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(80));\nINSERT INTO practica_auto (nombre) VALUES ('Compras');\nSELECT * FROM practica_auto;",
            "explanation": "La generación automática se declara por separado en este motor; no es una propiedad general de PRIMARY KEY."
          }
        }
      }
    ],
    "remember": "Clave única y generación automática son decisiones distintas.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/not-null",
    "examples": [
      {
        "title": "Nombre obligatorio",
        "code": "CREATE TABLE practica_obligatorio (id INTEGER, nombre VARCHAR(80) NOT NULL);\nINSERT INTO practica_obligatorio VALUES (1, 'Compras');\nSELECT * FROM practica_obligatorio;",
        "hint": "Insertar NULL en nombre falla. No comprueba si el texto está compuesto solo por espacios."
      }
    ],
    "remember": "NOT NULL no equivale a texto válido o no vacío.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/unique",
    "examples": [
      {
        "title": "Correo sin duplicados",
        "code": "CREATE TABLE practica_correo (id INTEGER, correo VARCHAR(80) NOT NULL UNIQUE);\nINSERT INTO practica_correo VALUES (1, 'compras@empresa.test');\nSELECT * FROM practica_correo;",
        "hint": "Otro registro con ese correo falla. NOT NULL evita depender de las reglas de NULL del motor."
      }
    ],
    "remember": "El tratamiento de múltiples NULL y de mayúsculas depende del dialecto y la collation.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/default",
    "examples": [
      {
        "title": "Stock por defecto",
        "code": "CREATE TABLE practica_stock (id INTEGER, unidades INTEGER DEFAULT 0);\nINSERT INTO practica_stock (id) VALUES (1);\nSELECT * FROM practica_stock;",
        "hint": "unidades recibe 0 porque no se proporcionó."
      }
    ],
    "remember": "Un NULL explícito no se reemplaza por DEFAULT en esta declaración.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/check",
    "examples": [
      {
        "title": "Stock no negativo",
        "code": "CREATE TABLE practica_regla (id INTEGER, unidades INTEGER NOT NULL CHECK (unidades >= 0));\nINSERT INTO practica_regla VALUES (1, 0);\nSELECT * FROM practica_regla;",
        "hint": "0 se acepta; -1 falla. NOT NULL impide dejar el valor sin informar."
      }
    ],
    "remember": "CHECK por sí solo permite condiciones desconocidas por NULL.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/foreign-key",
    "examples": [
      {
        "title": "Producto válido",
        "code": "CREATE TABLE practica_reservas (\n  id INTEGER NOT NULL PRIMARY KEY, producto_id INTEGER NOT NULL,\n  FOREIGN KEY (producto_id) REFERENCES productos(id)\n);\nINSERT INTO practica_reservas VALUES (1, 1);\nSELECT * FROM practica_reservas;",
        "hint": "El producto 1 existe; un producto 9999 provoca error."
      }
    ],
    "remember": "En SQLite las FK deben estar activas; el panel ya las activa.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/varias-foreign-key",
    "examples": [
      {
        "title": "Cliente y producto",
        "code": "CREATE TABLE practica_solicitudes (\n  cliente_id INTEGER NOT NULL, producto_id INTEGER NOT NULL,\n  FOREIGN KEY (cliente_id) REFERENCES clientes(id),\n  FOREIGN KEY (producto_id) REFERENCES productos(id)\n);\nINSERT INTO practica_solicitudes VALUES (1, 1);\nSELECT * FROM practica_solicitudes;",
        "hint": "Ambas referencias deben existir para aceptar esta fila."
      }
    ],
    "remember": "Cada clave foránea verifica su propia relación.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/on-delete-cascade",
    "examples": [
      {
        "title": "Borrado en cascada",
        "code": "CREATE TABLE practica_padre_c (id INTEGER NOT NULL PRIMARY KEY);\nCREATE TABLE practica_hija_c (id INTEGER, padre_id INTEGER,\n  FOREIGN KEY (padre_id) REFERENCES practica_padre_c(id) ON DELETE CASCADE);\nINSERT INTO practica_padre_c VALUES (1);\nINSERT INTO practica_hija_c VALUES (1, 1);\nDELETE FROM practica_padre_c WHERE id = 1;\nSELECT COUNT(*) AS hijas FROM practica_hija_c;",
        "hint": "Borrar al padre deja 0 filas en la tabla hija."
      }
    ],
    "remember": "La cascada va del padre a sus dependientes; no al revés.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  },
  {
    "key": "create-table/on-delete-set-null",
    "examples": [
      {
        "title": "Referencia vacía, fila conservada",
        "code": "CREATE TABLE practica_padre_n (id INTEGER NOT NULL PRIMARY KEY);\nCREATE TABLE practica_hija_n (id INTEGER, padre_id INTEGER,\n  FOREIGN KEY (padre_id) REFERENCES practica_padre_n(id) ON DELETE SET NULL);\nINSERT INTO practica_padre_n VALUES (1);\nINSERT INTO practica_hija_n VALUES (1, 1);\nDELETE FROM practica_padre_n WHERE id = 1;\nSELECT id, padre_id FROM practica_hija_n;",
        "hint": "La fila hija sigue con id 1 y padre_id NULL."
      }
    ],
    "remember": "La columna de referencia debe admitir NULL.",
    "note": "El ejemplo crea su propia tabla de práctica. Si ya existe, reinicia el entorno o cambia su nombre; cambiar de ficha conserva la sesión."
  }
],results);
