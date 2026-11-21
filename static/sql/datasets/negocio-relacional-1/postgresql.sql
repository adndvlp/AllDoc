-- AllDoc: negocio-relacional@1 / postgresql
-- Ejecutar únicamente en una base de práctica vacía (o esquema vacío), con codificación Unicode.
-- Importes de esta semilla: enteros en MXN. Fechas ISO, booleanos representados por 0/1.
-- No incluye borrado ni credenciales. La creación de tablas puede confirmar cambios según el motor.

CREATE TABLE "categorias" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "descripcion" TEXT DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE ("nombre")
);
CREATE TABLE "proveedores" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "pais" TEXT NOT NULL,
  "email" TEXT,
  PRIMARY KEY ("id")
);
CREATE TABLE "productos" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "categoria" TEXT NOT NULL,
  "precio" INTEGER NOT NULL,
  "stock" INTEGER DEFAULT 0 NOT NULL,
  "proveedor_id" INTEGER,
  "activo" INTEGER DEFAULT 1 NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("categoria") REFERENCES "categorias" ("nombre"),
  FOREIGN KEY ("proveedor_id") REFERENCES "proveedores" ("id") ON DELETE SET NULL,
  CHECK ("precio" >= 0),
  CHECK ("stock" >= 0),
  CHECK ("activo" IN (0, 1))
);
CREATE TABLE "clientes" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "ciudad" TEXT NOT NULL,
  "fecha_alta" DATE NOT NULL,
  "telefono" TEXT,
  PRIMARY KEY ("id"),
  UNIQUE ("email")
);
CREATE TABLE "departamentos" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE ("nombre")
);
CREATE TABLE "empleados" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "departamento_id" INTEGER NOT NULL,
  "gerente_id" INTEGER,
  "salario" INTEGER NOT NULL,
  "fecha_ingreso" DATE NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("departamento_id") REFERENCES "departamentos" ("id"),
  FOREIGN KEY ("gerente_id") REFERENCES "empleados" ("id"),
  CHECK ("salario" > 0)
);
CREATE TABLE "pedidos" (
  "id" INTEGER NOT NULL,
  "cliente_id" INTEGER NOT NULL,
  "empleado_id" INTEGER,
  "fecha" DATE NOT NULL,
  "estado" TEXT DEFAULT 'pendiente' NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id"),
  FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id") ON DELETE SET NULL,
  CHECK ("estado" IN ('pendiente', 'entregado', 'cancelado'))
);
CREATE TABLE "detalle_pedidos" (
  "pedido_id" INTEGER NOT NULL,
  "producto_id" INTEGER NOT NULL,
  "cantidad" INTEGER DEFAULT 1 NOT NULL,
  "precio_unitario" INTEGER NOT NULL,
  "descuento" INTEGER DEFAULT 0 NOT NULL,
  PRIMARY KEY ("pedido_id", "producto_id"),
  FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("producto_id") REFERENCES "productos" ("id"),
  CHECK ("cantidad" > 0),
  CHECK ("precio_unitario" >= 0),
  CHECK ("descuento" >= 0),
  CHECK ("descuento" <= 100)
);
CREATE TABLE "pagos" (
  "id" INTEGER NOT NULL,
  "pedido_id" INTEGER NOT NULL,
  "fecha" DATE NOT NULL,
  "importe" INTEGER NOT NULL,
  "metodo" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id") ON DELETE CASCADE,
  CHECK ("importe" > 0),
  CHECK ("metodo" IN ('tarjeta', 'transferencia', 'efectivo'))
);
CREATE TABLE "almacenes" (
  "id" INTEGER NOT NULL,
  "nombre" TEXT NOT NULL,
  "ciudad" TEXT NOT NULL,
  PRIMARY KEY ("id")
);
CREATE TABLE "inventario" (
  "almacen_id" INTEGER NOT NULL,
  "producto_id" INTEGER NOT NULL,
  "unidades" INTEGER DEFAULT 0 NOT NULL,
  PRIMARY KEY ("almacen_id", "producto_id"),
  FOREIGN KEY ("almacen_id") REFERENCES "almacenes" ("id"),
  FOREIGN KEY ("producto_id") REFERENCES "productos" ("id") ON DELETE CASCADE,
  CHECK ("unidades" >= 0)
);
CREATE TABLE "movimientos_stock" (
  "id" INTEGER NOT NULL,
  "producto_id" INTEGER NOT NULL,
  "almacen_id" INTEGER NOT NULL,
  "empleado_id" INTEGER,
  "fecha" DATE NOT NULL,
  "tipo" TEXT NOT NULL,
  "cantidad" INTEGER NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("producto_id") REFERENCES "productos" ("id"),
  FOREIGN KEY ("almacen_id") REFERENCES "almacenes" ("id"),
  FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id") ON DELETE SET NULL,
  CHECK ("cantidad" > 0),
  CHECK ("tipo" IN ('entrada', 'salida'))
);
CREATE TABLE "cuentas" (
  "id" INTEGER NOT NULL,
  "cliente_id" INTEGER NOT NULL,
  "saldo" INTEGER DEFAULT 0 NOT NULL,
  "fecha_apertura" DATE NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE ("cliente_id"),
  FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE CASCADE,
  CHECK ("saldo" >= 0)
);

BEGIN;
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (1, 'Accesorios', NULL);
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (2, 'Pantallas', 'Productos de Pantallas');
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (3, 'Audio', NULL);
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (4, 'Almacenamiento', 'Productos de Almacenamiento');
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (5, 'Mobiliario', NULL);
INSERT INTO "categorias" ("id", "nombre", "descripcion") VALUES (6, 'Redes', 'Productos de Redes');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (1, 'Distribuidora Norte', 'México', 'contacto1@ejemplo.test');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (2, 'Distribuidora Centro', 'Colombia', 'contacto2@ejemplo.test');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (3, 'Distribuidora Sur', 'España', 'contacto3@ejemplo.test');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (4, 'Distribuidora Pacífico', 'México', 'contacto4@ejemplo.test');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (5, 'Distribuidora Atlántico', 'Colombia', 'contacto5@ejemplo.test');
INSERT INTO "proveedores" ("id", "nombre", "pais", "email") VALUES (6, 'Distribuidora Sin catálogo', 'España', NULL);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (1, 'Teclado', 'Accesorios', 500, 45, 1, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (2, 'Mouse', 'Accesorios', 250, 35, 2, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (3, 'Monitor', 'Pantallas', 3500, 25, 3, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (4, 'Bocina', 'Audio', 800, 15, 4, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (5, 'Audífonos', 'Audio', 1200, 30, 1, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (6, 'SSD', 'Almacenamiento', 1500, 45, 2, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (7, 'Memoria USB', 'Almacenamiento', 200, 35, 3, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (8, 'Webcam', 'Accesorios', 900, 25, 4, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (9, 'Micrófono', 'Audio', 1100, 15, 1, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (10, 'Cable HDMI', 'Accesorios', 150, 30, 2, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (11, 'Pantalla portátil', 'Pantallas', 2500, 45, 3, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (12, 'Disco externo', 'Almacenamiento', 1800, 35, 4, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (13, 'Soporte', 'Accesorios', 300, 25, 1, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (14, 'Adaptador', 'Accesorios', 250, 15, 2, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (15, 'Lector de tarjetas', 'Accesorios', 400, 30, 3, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (16, 'Hub USB', 'Accesorios', 700, 45, 4, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (17, 'Control remoto', 'Accesorios', 0, 35, NULL, 1);
INSERT INTO "productos" ("id", "nombre", "categoria", "precio", "stock", "proveedor_id", "activo") VALUES (18, 'Cable auxiliar', 'Audio', 100, 0, NULL, 0);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (1, 'Ana 1', 'cliente1@ejemplo.test', 'Monterrey', DATE '2024-01-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (2, 'Luis 2', 'cliente2@ejemplo.test', 'Guadalajara', DATE '2025-02-01', '55501002');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (3, 'María 3', 'cliente3@ejemplo.test', 'Ciudad de México', DATE '2026-03-01', '55501003');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (4, 'Carlos 4', 'cliente4@ejemplo.test', 'Monterrey', DATE '2024-04-01', '55501004');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (5, 'Elena 5', 'cliente5@ejemplo.test', 'Guadalajara', DATE '2025-05-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (6, 'José 6', 'cliente6@ejemplo.test', 'Ciudad de México', DATE '2026-06-01', '');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (7, 'Lucía 7', 'cliente7@ejemplo.test', 'Monterrey', DATE '2024-07-01', '55501007');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (8, 'Raúl 8', 'cliente8@ejemplo.test', 'Guadalajara', DATE '2025-08-01', '55501008');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (9, 'Sofía 9', 'cliente9@ejemplo.test', 'Ciudad de México', DATE '2026-09-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (10, 'Diego 10', 'cliente10@ejemplo.test', 'Monterrey', DATE '2024-10-01', '55501010');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (11, 'Inés 11', 'cliente11@ejemplo.test', 'Guadalajara', DATE '2025-11-01', '');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (12, 'Andrés 12', 'cliente12@ejemplo.test', 'Ciudad de México', DATE '2026-12-01', '55501012');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (13, 'Ana 13', 'cliente13@ejemplo.test', 'Monterrey', DATE '2024-01-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (14, 'Luis 14', 'cliente14@ejemplo.test', 'Guadalajara', DATE '2025-02-01', '55501014');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (15, 'María 15', 'cliente15@ejemplo.test', 'Ciudad de México', DATE '2026-03-01', '55501015');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (16, 'Carlos 16', 'cliente16@ejemplo.test', 'Monterrey', DATE '2024-04-01', '');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (17, 'Elena 17', 'cliente17@ejemplo.test', 'Guadalajara', DATE '2025-05-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (18, 'José 18', 'cliente18@ejemplo.test', 'Ciudad de México', DATE '2026-06-01', '55501018');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (19, 'Lucía 19', 'cliente19@ejemplo.test', 'Monterrey', DATE '2024-07-01', '55501019');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (20, 'Raúl 20', 'cliente20@ejemplo.test', 'Guadalajara', DATE '2025-08-01', '55501020');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (21, 'Sofía 21', 'cliente21@ejemplo.test', 'Ciudad de México', DATE '2026-09-01', NULL);
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (22, 'Diego 22', 'cliente22@ejemplo.test', 'Monterrey', DATE '2024-10-01', '55501022');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (23, 'Inés 23', 'cliente23@ejemplo.test', 'Guadalajara', DATE '2025-11-01', '55501023');
INSERT INTO "clientes" ("id", "nombre", "email", "ciudad", "fecha_alta", "telefono") VALUES (24, 'Andrés 24', 'cliente24@ejemplo.test', 'Ciudad de México', DATE '2026-12-01', '55501024');
INSERT INTO "departamentos" ("id", "nombre") VALUES (1, 'Dirección');
INSERT INTO "departamentos" ("id", "nombre") VALUES (2, 'Ventas');
INSERT INTO "departamentos" ("id", "nombre") VALUES (3, 'Operaciones');
INSERT INTO "departamentos" ("id", "nombre") VALUES (4, 'Finanzas');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (1, 'Ana', 1, NULL, 20000, DATE '2023-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (2, 'Luis', 2, NULL, 25000, DATE '2024-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (3, 'María', 3, NULL, 30000, DATE '2025-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (4, 'Carlos', 4, 1, 35000, DATE '2023-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (5, 'Elena', 1, 2, 20000, DATE '2024-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (6, 'José', 2, 3, 25000, DATE '2025-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (7, 'Lucía', 3, 1, 30000, DATE '2023-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (8, 'Raúl', 4, 2, 35000, DATE '2024-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (9, 'Sofía', 1, 3, 20000, DATE '2025-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (10, 'Diego', 2, 1, 25000, DATE '2023-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (11, 'Inés', 3, 2, 30000, DATE '2024-01-15');
INSERT INTO "empleados" ("id", "nombre", "departamento_id", "gerente_id", "salario", "fecha_ingreso") VALUES (12, 'Andrés', 4, 3, 35000, DATE '2025-01-15');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (1, 1, NULL, DATE '2024-01-01', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (2, 2, 2, DATE '2024-02-02', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (3, 3, 3, DATE '2024-03-03', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (4, 4, 4, DATE '2024-04-04', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (5, 5, 5, DATE '2024-05-05', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (6, 6, NULL, DATE '2024-06-06', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (7, 7, 7, DATE '2024-07-07', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (8, 8, 8, DATE '2024-08-08', 'cancelado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (9, 9, 9, DATE '2024-09-09', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (10, 10, 10, DATE '2024-10-10', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (11, 11, NULL, DATE '2024-11-11', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (12, 12, 12, DATE '2024-12-12', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (13, 13, 1, DATE '2024-01-13', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (14, 14, 2, DATE '2024-02-14', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (15, 15, 3, DATE '2024-03-15', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (16, 16, NULL, DATE '2024-04-16', 'cancelado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (17, 17, 5, DATE '2024-05-17', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (18, 18, 6, DATE '2024-06-18', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (19, 1, 7, DATE '2024-07-19', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (20, 2, 8, DATE '2024-08-20', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (21, 3, NULL, DATE '2024-09-01', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (22, 4, 10, DATE '2024-10-02', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (23, 5, 11, DATE '2024-11-03', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (24, 6, 12, DATE '2024-12-04', 'cancelado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (25, 7, 1, DATE '2025-01-05', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (26, 8, NULL, DATE '2025-02-06', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (27, 9, 3, DATE '2025-03-07', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (28, 10, 4, DATE '2025-04-08', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (29, 11, 5, DATE '2025-05-09', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (30, 12, 6, DATE '2025-06-10', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (31, 13, NULL, DATE '2025-07-11', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (32, 14, 8, DATE '2025-08-12', 'cancelado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (33, 15, 9, DATE '2025-09-13', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (34, 16, 10, DATE '2025-10-14', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (35, 17, 11, DATE '2025-11-15', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (36, 18, NULL, DATE '2025-12-16', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (37, 1, 1, DATE '2025-01-17', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (38, 2, 2, DATE '2025-02-18', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (39, 3, 3, DATE '2025-03-19', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (40, 4, 4, DATE '2025-04-20', 'cancelado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (41, 5, NULL, DATE '2025-05-01', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (42, 6, 6, DATE '2025-06-02', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (43, 7, 7, DATE '2025-07-03', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (44, 8, 8, DATE '2025-08-04', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (45, 9, 9, DATE '2025-09-05', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (46, 10, NULL, DATE '2025-10-06', 'pendiente');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (47, 11, 11, DATE '2025-11-07', 'entregado');
INSERT INTO "pedidos" ("id", "cliente_id", "empleado_id", "fecha", "estado") VALUES (48, 12, 12, DATE '2025-12-08', 'cancelado');
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (1, 1, 1, 500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (1, 2, 2, 250, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (2, 3, 1, 3500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (2, 4, 2, 800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (3, 5, 1, 1200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (3, 6, 2, 1500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (4, 7, 1, 200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (4, 8, 2, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (5, 9, 1, 1100, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (5, 10, 2, 150, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (6, 11, 1, 2500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (6, 12, 2, 1800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (7, 13, 1, 300, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (7, 14, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (8, 15, 1, 400, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (8, 1, 2, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (9, 2, 1, 250, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (9, 3, 2, 3500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (10, 4, 1, 800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (10, 5, 2, 1200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (11, 6, 1, 1500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (11, 7, 2, 200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (12, 8, 1, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (12, 9, 2, 1100, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (13, 10, 1, 150, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (13, 11, 2, 2500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (14, 12, 1, 1800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (14, 13, 2, 300, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (15, 14, 1, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (15, 15, 2, 400, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (16, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (16, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (17, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (17, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (18, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (18, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (19, 7, 1, 200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (19, 8, 2, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (20, 9, 1, 1100, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (20, 10, 2, 150, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (21, 11, 1, 2500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (21, 12, 2, 1800, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (22, 13, 1, 300, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (22, 14, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (23, 15, 1, 400, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (23, 1, 2, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (24, 2, 1, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (24, 3, 2, 3500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (25, 4, 1, 800, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (25, 5, 2, 1200, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (26, 6, 1, 1500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (26, 7, 2, 200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (27, 8, 1, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (27, 9, 2, 1100, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (28, 10, 1, 150, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (28, 11, 2, 2500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (29, 12, 1, 1800, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (29, 13, 2, 300, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (30, 14, 1, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (30, 15, 2, 400, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (31, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (31, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (32, 3, 1, 3500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (32, 4, 2, 800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (33, 5, 1, 1200, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (33, 6, 2, 1500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (34, 7, 1, 200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (34, 8, 2, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (35, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (35, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (36, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (36, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (37, 13, 1, 300, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (37, 14, 2, 250, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (38, 15, 1, 400, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (38, 1, 2, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (39, 2, 1, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (39, 3, 2, 3500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (40, 4, 1, 800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (40, 5, 2, 1200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (41, 6, 1, 1500, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (41, 7, 2, 200, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (42, 8, 1, 900, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (42, 9, 2, 1100, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (43, 10, 1, 150, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (43, 11, 2, 2500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (44, 12, 1, 1800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (44, 13, 2, 300, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (45, 14, 1, 250, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (45, 15, 2, 400, 10);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (46, 1, 1, 500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (46, 2, 2, 250, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (47, 3, 1, 3500, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (47, 4, 2, 800, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (48, 5, 1, 1200, 0);
INSERT INTO "detalle_pedidos" ("pedido_id", "producto_id", "cantidad", "precio_unitario", "descuento") VALUES (48, 6, 2, 1500, 0);
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (1, 1, DATE '2024-01-01', 900, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (2, 2, DATE '2024-02-02', 5100, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (3, 3, DATE '2024-03-03', 4200, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (4, 4, DATE '2024-04-04', 1000, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (5, 5, DATE '2024-05-05', 1260, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (6, 6, DATE '2024-06-06', 6100, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (7, 7, DATE '2024-07-07', 800, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (8, 9, DATE '2024-09-09', 6525, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (9, 10, DATE '2024-10-10', 3200, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (10, 11, DATE '2024-11-11', 1900, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (11, 12, DATE '2024-12-12', 1550, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (12, 13, DATE '2024-01-13', 4635, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (13, 14, DATE '2024-02-14', 2400, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (14, 15, DATE '2024-03-15', 1050, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (15, 17, DATE '2024-05-17', 1000, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (16, 18, DATE '2024-06-18', 1000, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (17, 19, DATE '2024-07-19', 2000, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (18, 20, DATE '2024-08-20', 700, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (19, 21, DATE '2024-09-01', 5490, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (20, 22, DATE '2024-10-02', 800, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (21, 23, DATE '2024-11-03', 1400, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (22, 25, DATE '2025-01-05', 1440, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (23, 25, DATE '2025-01-05', 720, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (24, 26, DATE '2025-02-06', 950, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (25, 26, DATE '2025-02-06', 475, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (26, 27, DATE '2025-03-07', 1550, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (27, 27, DATE '2025-03-07', 775, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (28, 28, DATE '2025-04-08', 2575, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (29, 28, DATE '2025-04-08', 1287, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (30, 29, DATE '2025-05-09', 1080, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (31, 29, DATE '2025-05-09', 540, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (32, 30, DATE '2025-06-10', 525, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (33, 30, DATE '2025-06-10', 262, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (34, 31, DATE '2025-07-11', 500, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (35, 31, DATE '2025-07-11', 250, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (36, 33, DATE '2025-09-13', 1890, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (37, 33, DATE '2025-09-13', 945, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (38, 34, DATE '2025-10-14', 1000, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (39, 34, DATE '2025-10-14', 500, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (40, 35, DATE '2025-11-15', 500, 'tarjeta');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (41, 35, DATE '2025-11-15', 250, 'transferencia');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (42, 36, DATE '2025-12-16', 500, 'efectivo');
INSERT INTO "pagos" ("id", "pedido_id", "fecha", "importe", "metodo") VALUES (43, 36, DATE '2025-12-16', 250, 'tarjeta');
INSERT INTO "almacenes" ("id", "nombre", "ciudad") VALUES (1, 'Principal', 'Monterrey');
INSERT INTO "almacenes" ("id", "nombre", "ciudad") VALUES (2, 'Occidente', 'Guadalajara');
INSERT INTO "almacenes" ("id", "nombre", "ciudad") VALUES (3, 'Centro', 'Ciudad de México');
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 1, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 1, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 1, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 2, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 2, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 2, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 3, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 3, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 3, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 4, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 4, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 4, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 5, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 5, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 5, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 6, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 6, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 6, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 7, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 7, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 7, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 8, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 8, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 8, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 9, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 9, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 9, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 10, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 10, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 10, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 11, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 11, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 11, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 12, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 12, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 12, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 13, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 13, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 13, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 14, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 14, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 14, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 15, 5);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 15, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 15, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 16, 10);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 16, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 16, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 17, 15);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 17, 20);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 17, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (1, 18, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (2, 18, 0);
INSERT INTO "inventario" ("almacen_id", "producto_id", "unidades") VALUES (3, 18, 0);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (1, 1, 1, NULL, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (2, 1, 2, 2, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (3, 1, 3, 3, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (4, 2, 1, 4, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (5, 2, 2, 5, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (6, 3, 1, 6, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (7, 3, 3, 7, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (8, 4, 2, NULL, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (9, 4, 3, 9, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (10, 5, 1, 10, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (11, 5, 2, 11, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (12, 5, 3, 12, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (13, 6, 1, 1, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (14, 6, 2, 2, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (15, 6, 3, NULL, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (16, 7, 1, 4, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (17, 7, 2, 5, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (18, 8, 1, 6, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (19, 8, 3, 7, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (20, 9, 2, 8, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (21, 9, 3, 9, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (22, 10, 1, NULL, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (23, 10, 2, 11, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (24, 10, 3, 12, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (25, 11, 1, 1, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (26, 11, 2, 2, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (27, 11, 3, 3, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (28, 12, 1, 4, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (29, 12, 2, NULL, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (30, 13, 1, 6, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (31, 13, 3, 7, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (32, 14, 2, 8, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (33, 14, 3, 9, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (34, 15, 1, 10, DATE '2024-01-01', 'entrada', 5);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (35, 15, 2, 11, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (36, 15, 3, NULL, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (37, 16, 1, 1, DATE '2024-01-01', 'entrada', 10);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (38, 16, 2, 2, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (39, 16, 3, 3, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (40, 17, 1, 4, DATE '2024-01-01', 'entrada', 15);
INSERT INTO "movimientos_stock" ("id", "producto_id", "almacen_id", "empleado_id", "fecha", "tipo", "cantidad") VALUES (41, 17, 2, 5, DATE '2024-01-01', 'entrada', 20);
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (1, 1, 10000, DATE '2024-01-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (2, 2, 11000, DATE '2025-02-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (3, 3, 12000, DATE '2026-03-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (4, 4, 13000, DATE '2024-04-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (5, 5, 14000, DATE '2025-05-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (6, 6, 10000, DATE '2026-06-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (7, 7, 11000, DATE '2024-07-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (8, 8, 12000, DATE '2025-08-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (9, 9, 13000, DATE '2026-09-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (10, 10, 14000, DATE '2024-10-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (11, 11, 10000, DATE '2025-11-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (12, 12, 11000, DATE '2026-12-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (13, 13, 12000, DATE '2024-01-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (14, 14, 13000, DATE '2025-02-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (15, 15, 14000, DATE '2026-03-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (16, 16, 10000, DATE '2024-04-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (17, 17, 11000, DATE '2025-05-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (18, 18, 12000, DATE '2026-06-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (19, 19, 13000, DATE '2024-07-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (20, 20, 14000, DATE '2025-08-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (21, 21, 10000, DATE '2026-09-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (22, 22, 11000, DATE '2024-10-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (23, 23, 12000, DATE '2025-11-01');
INSERT INTO "cuentas" ("id", "cliente_id", "saldo", "fecha_apertura") VALUES (24, 24, 0, DATE '2026-12-01');
COMMIT;
