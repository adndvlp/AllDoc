CREATE DATABASE alldoc_connector_lab CHARACTER SET utf8mb4;
USE alldoc_connector_lab;
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    country VARCHAR(40),
    signup_date DATE NOT NULL
) ENGINE=InnoDB;
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE=InnoDB;
INSERT INTO customers VALUES
(1,'Ana','Mexico','2026-01-01'),
(2,'Luis','Mexico','2026-01-05'),
(3,'Marta','Spain','2026-01-10'),
(4,'Diego',NULL,'2026-01-12');
INSERT INTO orders VALUES
(101,1,800.00,'2026-02-01','completed'),
(102,1,300.00,'2026-02-03','completed'),
(103,2,1200.00,'2026-02-04','completed'),
(104,2,250.00,'2026-02-05','cancelled'),
(105,3,450.00,'2026-03-01','completed');
