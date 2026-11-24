# Instalar una vez si faltan los paquetes:
# install.packages(c("dplyr", "tidyr", "tibble", "readr", "stringr",
#                    "lubridate", "ggplot2", "purrr", "forcats"))

library(dplyr)
library(tidyr)

clientes <- tibble::tibble(
  id = 1:5,
  nombre = c("Ana", "Luis", "Marta", "Pedro", "Sofia"),
  pais = c("MX", "MX", "ES", NA_character_, "ES"),
  alta = as.Date(c("2026-01-01", "2026-01-10", "2026-02-01",
                  "2026-02-15", "2026-03-01"))
)
pedidos <- tibble::tibble(
  id = 101:106,
  cliente_id = c(1L, 1L, 2L, 3L, 3L, 2L),
  fecha = as.Date(c("2026-03-01", "2026-03-02", "2026-03-03",
                   "2026-04-01", "2026-04-02", "2026-04-03")),
  monto = c(100, 200, 300, 150, 50, 100),
  estado = c("completado", "completado", "completado", "cancelado",
             "completado", "completado"),
  cupon = c(NA_character_, "A10", NA_character_, NA_character_, "B5", "A10")
)
productos <- tibble::tibble(
  id = 1:3, producto = c("Mouse", "Teclado", "Monitor"),
  categoria = c("Accesorios", "Accesorios", "Pantallas"),
  precio = c(50, 100, 300)
)
detalle <- tibble::tibble(
  pedido_id = c(101L, 102L, 102L, 103L, 104L, 105L, 106L),
  producto_id = c(2L, 2L, 1L, 3L, 1L, 1L, 2L),
  cantidad = c(1, 1, 2, 1, 3, 1, 1),
  precio_unitario = c(100, 100, 50, 300, 50, 50, 100)
)
leads <- tibble::tibble(
  id = 1:5, email = c("ana@ejemplo.mx", "luis@ejemplo.mx",
    "ana@ejemplo.mx", NA_character_, "marta@ejemplo.mx"),
  canal = c("ads", "organico", "referido", "ads", "ads")
)
