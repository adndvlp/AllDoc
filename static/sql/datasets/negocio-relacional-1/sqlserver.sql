-- AllDoc: negocio-relacional@1 / sqlserver
-- Ejecutar únicamente en una base de práctica vacía (o esquema vacío), con codificación Unicode.
-- Importes de esta semilla: enteros en MXN. Fechas ISO, booleanos representados por 0/1.
-- No incluye borrado ni credenciales. La creación de tablas puede confirmar cambios según el motor.
SET XACT_ABORT ON;

CREATE TABLE [categorias] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [descripcion] NVARCHAR(255) DEFAULT NULL,
  PRIMARY KEY ([id]),
  UNIQUE ([nombre])
);
CREATE TABLE [proveedores] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [pais] NVARCHAR(255) NOT NULL,
  [email] NVARCHAR(255),
  PRIMARY KEY ([id])
);
CREATE TABLE [productos] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [categoria] NVARCHAR(255) NOT NULL,
  [precio] INTEGER NOT NULL,
  [stock] INTEGER DEFAULT 0 NOT NULL,
  [proveedor_id] INTEGER,
  [activo] INTEGER DEFAULT 1 NOT NULL,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([categoria]) REFERENCES [categorias] ([nombre]),
  FOREIGN KEY ([proveedor_id]) REFERENCES [proveedores] ([id]) ON DELETE SET NULL,
  CHECK ([precio] >= 0),
  CHECK ([stock] >= 0),
  CHECK ([activo] IN (0, 1))
);
CREATE TABLE [clientes] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [email] NVARCHAR(255) NOT NULL,
  [ciudad] NVARCHAR(255) NOT NULL,
  [fecha_alta] DATE NOT NULL,
  [telefono] NVARCHAR(255),
  PRIMARY KEY ([id]),
  UNIQUE ([email])
);
CREATE TABLE [departamentos] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  PRIMARY KEY ([id]),
  UNIQUE ([nombre])
);
CREATE TABLE [empleados] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [departamento_id] INTEGER NOT NULL,
  [gerente_id] INTEGER,
  [salario] INTEGER NOT NULL,
  [fecha_ingreso] DATE NOT NULL,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([departamento_id]) REFERENCES [departamentos] ([id]),
  FOREIGN KEY ([gerente_id]) REFERENCES [empleados] ([id]),
  CHECK ([salario] > 0)
);
CREATE TABLE [pedidos] (
  [id] INTEGER NOT NULL,
  [cliente_id] INTEGER NOT NULL,
  [empleado_id] INTEGER,
  [fecha] DATE NOT NULL,
  [estado] NVARCHAR(255) DEFAULT N'pendiente' NOT NULL,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([cliente_id]) REFERENCES [clientes] ([id]),
  FOREIGN KEY ([empleado_id]) REFERENCES [empleados] ([id]) ON DELETE SET NULL,
  CHECK ([estado] IN (N'pendiente', N'entregado', N'cancelado'))
);
CREATE TABLE [detalle_pedidos] (
  [pedido_id] INTEGER NOT NULL,
  [producto_id] INTEGER NOT NULL,
  [cantidad] INTEGER DEFAULT 1 NOT NULL,
  [precio_unitario] INTEGER NOT NULL,
  [descuento] INTEGER DEFAULT 0 NOT NULL,
  PRIMARY KEY ([pedido_id], [producto_id]),
  FOREIGN KEY ([pedido_id]) REFERENCES [pedidos] ([id]) ON DELETE CASCADE,
  FOREIGN KEY ([producto_id]) REFERENCES [productos] ([id]),
  CHECK ([cantidad] > 0),
  CHECK ([precio_unitario] >= 0),
  CHECK ([descuento] >= 0),
  CHECK ([descuento] <= 100)
);
CREATE TABLE [pagos] (
  [id] INTEGER NOT NULL,
  [pedido_id] INTEGER NOT NULL,
  [fecha] DATE NOT NULL,
  [importe] INTEGER NOT NULL,
  [metodo] NVARCHAR(255) NOT NULL,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([pedido_id]) REFERENCES [pedidos] ([id]) ON DELETE CASCADE,
  CHECK ([importe] > 0),
  CHECK ([metodo] IN (N'tarjeta', N'transferencia', N'efectivo'))
);
CREATE TABLE [almacenes] (
  [id] INTEGER NOT NULL,
  [nombre] NVARCHAR(255) NOT NULL,
  [ciudad] NVARCHAR(255) NOT NULL,
  PRIMARY KEY ([id])
);
CREATE TABLE [inventario] (
  [almacen_id] INTEGER NOT NULL,
  [producto_id] INTEGER NOT NULL,
  [unidades] INTEGER DEFAULT 0 NOT NULL,
  PRIMARY KEY ([almacen_id], [producto_id]),
  FOREIGN KEY ([almacen_id]) REFERENCES [almacenes] ([id]),
  FOREIGN KEY ([producto_id]) REFERENCES [productos] ([id]) ON DELETE CASCADE,
  CHECK ([unidades] >= 0)
);
CREATE TABLE [movimientos_stock] (
  [id] INTEGER NOT NULL,
  [producto_id] INTEGER NOT NULL,
  [almacen_id] INTEGER NOT NULL,
  [empleado_id] INTEGER,
  [fecha] DATE NOT NULL,
  [tipo] NVARCHAR(255) NOT NULL,
  [cantidad] INTEGER NOT NULL,
  PRIMARY KEY ([id]),
  FOREIGN KEY ([producto_id]) REFERENCES [productos] ([id]),
  FOREIGN KEY ([almacen_id]) REFERENCES [almacenes] ([id]),
  FOREIGN KEY ([empleado_id]) REFERENCES [empleados] ([id]) ON DELETE SET NULL,
  CHECK ([cantidad] > 0),
  CHECK ([tipo] IN (N'entrada', N'salida'))
);
CREATE TABLE [cuentas] (
  [id] INTEGER NOT NULL,
  [cliente_id] INTEGER NOT NULL,
  [saldo] INTEGER DEFAULT 0 NOT NULL,
  [fecha_apertura] DATE NOT NULL,
  PRIMARY KEY ([id]),
  UNIQUE ([cliente_id]),
  FOREIGN KEY ([cliente_id]) REFERENCES [clientes] ([id]) ON DELETE CASCADE,
  CHECK ([saldo] >= 0)
);

BEGIN TRANSACTION;
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (1, N'Accesorios', NULL);
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (2, N'Pantallas', N'Productos de Pantallas');
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (3, N'Audio', NULL);
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (4, N'Almacenamiento', N'Productos de Almacenamiento');
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (5, N'Mobiliario', NULL);
INSERT INTO [categorias] ([id], [nombre], [descripcion]) VALUES (6, N'Redes', N'Productos de Redes');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (1, N'Distribuidora Norte', N'México', N'contacto1@ejemplo.test');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (2, N'Distribuidora Centro', N'Colombia', N'contacto2@ejemplo.test');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (3, N'Distribuidora Sur', N'España', N'contacto3@ejemplo.test');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (4, N'Distribuidora Pacífico', N'México', N'contacto4@ejemplo.test');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (5, N'Distribuidora Atlántico', N'Colombia', N'contacto5@ejemplo.test');
INSERT INTO [proveedores] ([id], [nombre], [pais], [email]) VALUES (6, N'Distribuidora Sin catálogo', N'España', NULL);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (1, N'Teclado', N'Accesorios', 500, 45, 1, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (2, N'Mouse', N'Accesorios', 250, 35, 2, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (3, N'Monitor', N'Pantallas', 3500, 25, 3, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (4, N'Bocina', N'Audio', 800, 15, 4, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (5, N'Audífonos', N'Audio', 1200, 30, 1, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (6, N'SSD', N'Almacenamiento', 1500, 45, 2, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (7, N'Memoria USB', N'Almacenamiento', 200, 35, 3, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (8, N'Webcam', N'Accesorios', 900, 25, 4, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (9, N'Micrófono', N'Audio', 1100, 15, 1, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (10, N'Cable HDMI', N'Accesorios', 150, 30, 2, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (11, N'Pantalla portátil', N'Pantallas', 2500, 45, 3, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (12, N'Disco externo', N'Almacenamiento', 1800, 35, 4, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (13, N'Soporte', N'Accesorios', 300, 25, 1, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (14, N'Adaptador', N'Accesorios', 250, 15, 2, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (15, N'Lector de tarjetas', N'Accesorios', 400, 30, 3, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (16, N'Hub USB', N'Accesorios', 700, 45, 4, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (17, N'Control remoto', N'Accesorios', 0, 35, NULL, 1);
INSERT INTO [productos] ([id], [nombre], [categoria], [precio], [stock], [proveedor_id], [activo]) VALUES (18, N'Cable auxiliar', N'Audio', 100, 0, NULL, 0);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (1, N'Ana 1', N'cliente1@ejemplo.test', N'Monterrey', CONVERT(date, '20240101', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (2, N'Luis 2', N'cliente2@ejemplo.test', N'Guadalajara', CONVERT(date, '20250201', 112), N'55501002');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (3, N'María 3', N'cliente3@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260301', 112), N'55501003');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (4, N'Carlos 4', N'cliente4@ejemplo.test', N'Monterrey', CONVERT(date, '20240401', 112), N'55501004');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (5, N'Elena 5', N'cliente5@ejemplo.test', N'Guadalajara', CONVERT(date, '20250501', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (6, N'José 6', N'cliente6@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260601', 112), N'');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (7, N'Lucía 7', N'cliente7@ejemplo.test', N'Monterrey', CONVERT(date, '20240701', 112), N'55501007');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (8, N'Raúl 8', N'cliente8@ejemplo.test', N'Guadalajara', CONVERT(date, '20250801', 112), N'55501008');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (9, N'Sofía 9', N'cliente9@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260901', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (10, N'Diego 10', N'cliente10@ejemplo.test', N'Monterrey', CONVERT(date, '20241001', 112), N'55501010');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (11, N'Inés 11', N'cliente11@ejemplo.test', N'Guadalajara', CONVERT(date, '20251101', 112), N'');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (12, N'Andrés 12', N'cliente12@ejemplo.test', N'Ciudad de México', CONVERT(date, '20261201', 112), N'55501012');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (13, N'Ana 13', N'cliente13@ejemplo.test', N'Monterrey', CONVERT(date, '20240101', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (14, N'Luis 14', N'cliente14@ejemplo.test', N'Guadalajara', CONVERT(date, '20250201', 112), N'55501014');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (15, N'María 15', N'cliente15@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260301', 112), N'55501015');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (16, N'Carlos 16', N'cliente16@ejemplo.test', N'Monterrey', CONVERT(date, '20240401', 112), N'');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (17, N'Elena 17', N'cliente17@ejemplo.test', N'Guadalajara', CONVERT(date, '20250501', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (18, N'José 18', N'cliente18@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260601', 112), N'55501018');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (19, N'Lucía 19', N'cliente19@ejemplo.test', N'Monterrey', CONVERT(date, '20240701', 112), N'55501019');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (20, N'Raúl 20', N'cliente20@ejemplo.test', N'Guadalajara', CONVERT(date, '20250801', 112), N'55501020');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (21, N'Sofía 21', N'cliente21@ejemplo.test', N'Ciudad de México', CONVERT(date, '20260901', 112), NULL);
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (22, N'Diego 22', N'cliente22@ejemplo.test', N'Monterrey', CONVERT(date, '20241001', 112), N'55501022');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (23, N'Inés 23', N'cliente23@ejemplo.test', N'Guadalajara', CONVERT(date, '20251101', 112), N'55501023');
INSERT INTO [clientes] ([id], [nombre], [email], [ciudad], [fecha_alta], [telefono]) VALUES (24, N'Andrés 24', N'cliente24@ejemplo.test', N'Ciudad de México', CONVERT(date, '20261201', 112), N'55501024');
INSERT INTO [departamentos] ([id], [nombre]) VALUES (1, N'Dirección');
INSERT INTO [departamentos] ([id], [nombre]) VALUES (2, N'Ventas');
INSERT INTO [departamentos] ([id], [nombre]) VALUES (3, N'Operaciones');
INSERT INTO [departamentos] ([id], [nombre]) VALUES (4, N'Finanzas');
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (1, N'Ana', 1, NULL, 20000, CONVERT(date, '20230115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (2, N'Luis', 2, NULL, 25000, CONVERT(date, '20240115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (3, N'María', 3, NULL, 30000, CONVERT(date, '20250115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (4, N'Carlos', 4, 1, 35000, CONVERT(date, '20230115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (5, N'Elena', 1, 2, 20000, CONVERT(date, '20240115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (6, N'José', 2, 3, 25000, CONVERT(date, '20250115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (7, N'Lucía', 3, 1, 30000, CONVERT(date, '20230115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (8, N'Raúl', 4, 2, 35000, CONVERT(date, '20240115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (9, N'Sofía', 1, 3, 20000, CONVERT(date, '20250115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (10, N'Diego', 2, 1, 25000, CONVERT(date, '20230115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (11, N'Inés', 3, 2, 30000, CONVERT(date, '20240115', 112));
INSERT INTO [empleados] ([id], [nombre], [departamento_id], [gerente_id], [salario], [fecha_ingreso]) VALUES (12, N'Andrés', 4, 3, 35000, CONVERT(date, '20250115', 112));
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (1, 1, NULL, CONVERT(date, '20240101', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (2, 2, 2, CONVERT(date, '20240202', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (3, 3, 3, CONVERT(date, '20240303', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (4, 4, 4, CONVERT(date, '20240404', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (5, 5, 5, CONVERT(date, '20240505', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (6, 6, NULL, CONVERT(date, '20240606', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (7, 7, 7, CONVERT(date, '20240707', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (8, 8, 8, CONVERT(date, '20240808', 112), N'cancelado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (9, 9, 9, CONVERT(date, '20240909', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (10, 10, 10, CONVERT(date, '20241010', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (11, 11, NULL, CONVERT(date, '20241111', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (12, 12, 12, CONVERT(date, '20241212', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (13, 13, 1, CONVERT(date, '20240113', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (14, 14, 2, CONVERT(date, '20240214', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (15, 15, 3, CONVERT(date, '20240315', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (16, 16, NULL, CONVERT(date, '20240416', 112), N'cancelado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (17, 17, 5, CONVERT(date, '20240517', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (18, 18, 6, CONVERT(date, '20240618', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (19, 1, 7, CONVERT(date, '20240719', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (20, 2, 8, CONVERT(date, '20240820', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (21, 3, NULL, CONVERT(date, '20240901', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (22, 4, 10, CONVERT(date, '20241002', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (23, 5, 11, CONVERT(date, '20241103', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (24, 6, 12, CONVERT(date, '20241204', 112), N'cancelado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (25, 7, 1, CONVERT(date, '20250105', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (26, 8, NULL, CONVERT(date, '20250206', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (27, 9, 3, CONVERT(date, '20250307', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (28, 10, 4, CONVERT(date, '20250408', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (29, 11, 5, CONVERT(date, '20250509', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (30, 12, 6, CONVERT(date, '20250610', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (31, 13, NULL, CONVERT(date, '20250711', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (32, 14, 8, CONVERT(date, '20250812', 112), N'cancelado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (33, 15, 9, CONVERT(date, '20250913', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (34, 16, 10, CONVERT(date, '20251014', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (35, 17, 11, CONVERT(date, '20251115', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (36, 18, NULL, CONVERT(date, '20251216', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (37, 1, 1, CONVERT(date, '20250117', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (38, 2, 2, CONVERT(date, '20250218', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (39, 3, 3, CONVERT(date, '20250319', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (40, 4, 4, CONVERT(date, '20250420', 112), N'cancelado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (41, 5, NULL, CONVERT(date, '20250501', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (42, 6, 6, CONVERT(date, '20250602', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (43, 7, 7, CONVERT(date, '20250703', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (44, 8, 8, CONVERT(date, '20250804', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (45, 9, 9, CONVERT(date, '20250905', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (46, 10, NULL, CONVERT(date, '20251006', 112), N'pendiente');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (47, 11, 11, CONVERT(date, '20251107', 112), N'entregado');
INSERT INTO [pedidos] ([id], [cliente_id], [empleado_id], [fecha], [estado]) VALUES (48, 12, 12, CONVERT(date, '20251208', 112), N'cancelado');
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (1, 1, 1, 500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (1, 2, 2, 250, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (2, 3, 1, 3500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (2, 4, 2, 800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (3, 5, 1, 1200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (3, 6, 2, 1500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (4, 7, 1, 200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (4, 8, 2, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (5, 9, 1, 1100, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (5, 10, 2, 150, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (6, 11, 1, 2500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (6, 12, 2, 1800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (7, 13, 1, 300, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (7, 14, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (8, 15, 1, 400, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (8, 1, 2, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (9, 2, 1, 250, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (9, 3, 2, 3500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (10, 4, 1, 800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (10, 5, 2, 1200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (11, 6, 1, 1500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (11, 7, 2, 200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (12, 8, 1, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (12, 9, 2, 1100, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (13, 10, 1, 150, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (13, 11, 2, 2500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (14, 12, 1, 1800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (14, 13, 2, 300, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (15, 14, 1, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (15, 15, 2, 400, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (16, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (16, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (17, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (17, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (18, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (18, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (19, 7, 1, 200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (19, 8, 2, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (20, 9, 1, 1100, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (20, 10, 2, 150, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (21, 11, 1, 2500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (21, 12, 2, 1800, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (22, 13, 1, 300, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (22, 14, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (23, 15, 1, 400, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (23, 1, 2, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (24, 2, 1, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (24, 3, 2, 3500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (25, 4, 1, 800, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (25, 5, 2, 1200, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (26, 6, 1, 1500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (26, 7, 2, 200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (27, 8, 1, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (27, 9, 2, 1100, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (28, 10, 1, 150, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (28, 11, 2, 2500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (29, 12, 1, 1800, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (29, 13, 2, 300, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (30, 14, 1, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (30, 15, 2, 400, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (31, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (31, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (32, 3, 1, 3500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (32, 4, 2, 800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (33, 5, 1, 1200, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (33, 6, 2, 1500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (34, 7, 1, 200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (34, 8, 2, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (35, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (35, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (36, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (36, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (37, 13, 1, 300, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (37, 14, 2, 250, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (38, 15, 1, 400, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (38, 1, 2, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (39, 2, 1, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (39, 3, 2, 3500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (40, 4, 1, 800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (40, 5, 2, 1200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (41, 6, 1, 1500, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (41, 7, 2, 200, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (42, 8, 1, 900, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (42, 9, 2, 1100, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (43, 10, 1, 150, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (43, 11, 2, 2500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (44, 12, 1, 1800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (44, 13, 2, 300, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (45, 14, 1, 250, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (45, 15, 2, 400, 10);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (46, 1, 1, 500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (46, 2, 2, 250, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (47, 3, 1, 3500, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (47, 4, 2, 800, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (48, 5, 1, 1200, 0);
INSERT INTO [detalle_pedidos] ([pedido_id], [producto_id], [cantidad], [precio_unitario], [descuento]) VALUES (48, 6, 2, 1500, 0);
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (1, 1, CONVERT(date, '20240101', 112), 900, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (2, 2, CONVERT(date, '20240202', 112), 5100, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (3, 3, CONVERT(date, '20240303', 112), 4200, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (4, 4, CONVERT(date, '20240404', 112), 1000, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (5, 5, CONVERT(date, '20240505', 112), 1260, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (6, 6, CONVERT(date, '20240606', 112), 6100, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (7, 7, CONVERT(date, '20240707', 112), 800, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (8, 9, CONVERT(date, '20240909', 112), 6525, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (9, 10, CONVERT(date, '20241010', 112), 3200, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (10, 11, CONVERT(date, '20241111', 112), 1900, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (11, 12, CONVERT(date, '20241212', 112), 1550, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (12, 13, CONVERT(date, '20240113', 112), 4635, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (13, 14, CONVERT(date, '20240214', 112), 2400, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (14, 15, CONVERT(date, '20240315', 112), 1050, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (15, 17, CONVERT(date, '20240517', 112), 1000, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (16, 18, CONVERT(date, '20240618', 112), 1000, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (17, 19, CONVERT(date, '20240719', 112), 2000, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (18, 20, CONVERT(date, '20240820', 112), 700, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (19, 21, CONVERT(date, '20240901', 112), 5490, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (20, 22, CONVERT(date, '20241002', 112), 800, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (21, 23, CONVERT(date, '20241103', 112), 1400, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (22, 25, CONVERT(date, '20250105', 112), 1440, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (23, 25, CONVERT(date, '20250105', 112), 720, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (24, 26, CONVERT(date, '20250206', 112), 950, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (25, 26, CONVERT(date, '20250206', 112), 475, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (26, 27, CONVERT(date, '20250307', 112), 1550, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (27, 27, CONVERT(date, '20250307', 112), 775, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (28, 28, CONVERT(date, '20250408', 112), 2575, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (29, 28, CONVERT(date, '20250408', 112), 1287, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (30, 29, CONVERT(date, '20250509', 112), 1080, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (31, 29, CONVERT(date, '20250509', 112), 540, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (32, 30, CONVERT(date, '20250610', 112), 525, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (33, 30, CONVERT(date, '20250610', 112), 262, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (34, 31, CONVERT(date, '20250711', 112), 500, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (35, 31, CONVERT(date, '20250711', 112), 250, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (36, 33, CONVERT(date, '20250913', 112), 1890, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (37, 33, CONVERT(date, '20250913', 112), 945, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (38, 34, CONVERT(date, '20251014', 112), 1000, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (39, 34, CONVERT(date, '20251014', 112), 500, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (40, 35, CONVERT(date, '20251115', 112), 500, N'tarjeta');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (41, 35, CONVERT(date, '20251115', 112), 250, N'transferencia');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (42, 36, CONVERT(date, '20251216', 112), 500, N'efectivo');
INSERT INTO [pagos] ([id], [pedido_id], [fecha], [importe], [metodo]) VALUES (43, 36, CONVERT(date, '20251216', 112), 250, N'tarjeta');
INSERT INTO [almacenes] ([id], [nombre], [ciudad]) VALUES (1, N'Principal', N'Monterrey');
INSERT INTO [almacenes] ([id], [nombre], [ciudad]) VALUES (2, N'Occidente', N'Guadalajara');
INSERT INTO [almacenes] ([id], [nombre], [ciudad]) VALUES (3, N'Centro', N'Ciudad de México');
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 1, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 1, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 1, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 2, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 2, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 2, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 3, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 3, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 3, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 4, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 4, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 4, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 5, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 5, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 5, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 6, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 6, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 6, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 7, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 7, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 7, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 8, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 8, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 8, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 9, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 9, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 9, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 10, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 10, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 10, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 11, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 11, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 11, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 12, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 12, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 12, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 13, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 13, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 13, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 14, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 14, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 14, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 15, 5);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 15, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 15, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 16, 10);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 16, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 16, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 17, 15);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 17, 20);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 17, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (1, 18, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (2, 18, 0);
INSERT INTO [inventario] ([almacen_id], [producto_id], [unidades]) VALUES (3, 18, 0);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (1, 1, 1, NULL, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (2, 1, 2, 2, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (3, 1, 3, 3, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (4, 2, 1, 4, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (5, 2, 2, 5, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (6, 3, 1, 6, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (7, 3, 3, 7, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (8, 4, 2, NULL, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (9, 4, 3, 9, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (10, 5, 1, 10, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (11, 5, 2, 11, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (12, 5, 3, 12, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (13, 6, 1, 1, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (14, 6, 2, 2, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (15, 6, 3, NULL, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (16, 7, 1, 4, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (17, 7, 2, 5, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (18, 8, 1, 6, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (19, 8, 3, 7, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (20, 9, 2, 8, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (21, 9, 3, 9, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (22, 10, 1, NULL, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (23, 10, 2, 11, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (24, 10, 3, 12, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (25, 11, 1, 1, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (26, 11, 2, 2, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (27, 11, 3, 3, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (28, 12, 1, 4, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (29, 12, 2, NULL, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (30, 13, 1, 6, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (31, 13, 3, 7, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (32, 14, 2, 8, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (33, 14, 3, 9, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (34, 15, 1, 10, CONVERT(date, '20240101', 112), N'entrada', 5);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (35, 15, 2, 11, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (36, 15, 3, NULL, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (37, 16, 1, 1, CONVERT(date, '20240101', 112), N'entrada', 10);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (38, 16, 2, 2, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (39, 16, 3, 3, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (40, 17, 1, 4, CONVERT(date, '20240101', 112), N'entrada', 15);
INSERT INTO [movimientos_stock] ([id], [producto_id], [almacen_id], [empleado_id], [fecha], [tipo], [cantidad]) VALUES (41, 17, 2, 5, CONVERT(date, '20240101', 112), N'entrada', 20);
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (1, 1, 10000, CONVERT(date, '20240101', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (2, 2, 11000, CONVERT(date, '20250201', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (3, 3, 12000, CONVERT(date, '20260301', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (4, 4, 13000, CONVERT(date, '20240401', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (5, 5, 14000, CONVERT(date, '20250501', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (6, 6, 10000, CONVERT(date, '20260601', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (7, 7, 11000, CONVERT(date, '20240701', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (8, 8, 12000, CONVERT(date, '20250801', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (9, 9, 13000, CONVERT(date, '20260901', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (10, 10, 14000, CONVERT(date, '20241001', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (11, 11, 10000, CONVERT(date, '20251101', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (12, 12, 11000, CONVERT(date, '20261201', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (13, 13, 12000, CONVERT(date, '20240101', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (14, 14, 13000, CONVERT(date, '20250201', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (15, 15, 14000, CONVERT(date, '20260301', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (16, 16, 10000, CONVERT(date, '20240401', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (17, 17, 11000, CONVERT(date, '20250501', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (18, 18, 12000, CONVERT(date, '20260601', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (19, 19, 13000, CONVERT(date, '20240701', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (20, 20, 14000, CONVERT(date, '20250801', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (21, 21, 10000, CONVERT(date, '20260901', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (22, 22, 11000, CONVERT(date, '20241001', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (23, 23, 12000, CONVERT(date, '20251101', 112));
INSERT INTO [cuentas] ([id], [cliente_id], [saldo], [fecha_apertura]) VALUES (24, 24, 0, CONVERT(date, '20261201', 112));
COMMIT;
