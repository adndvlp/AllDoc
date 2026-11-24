import sqlite3
from contextlib import closing

def abrir_demo():
    con = sqlite3.connect(":memory:", autocommit=True)
    con.execute("PRAGMA foreign_keys = ON")
    con.executescript("""
        CREATE TABLE clientes (
            id INTEGER PRIMARY KEY,
            nombre TEXT NOT NULL,
            pais TEXT
        );
        CREATE TABLE pedidos (
            id INTEGER PRIMARY KEY,
            cliente_id INTEGER NOT NULL REFERENCES clientes(id),
            monto INTEGER NOT NULL CHECK(monto >= 0),
            fecha TEXT NOT NULL,
            estado TEXT NOT NULL CHECK(estado IN ('completado', 'cancelado'))
        );
        CREATE TABLE contactos (
            id INTEGER PRIMARY KEY,
            email TEXT
        );
    """)
    con.executemany("INSERT INTO clientes VALUES (?, ?, ?)", [
        (1, 'Ana', 'Mexico'), (2, 'Luis', 'Mexico'),
        (3, 'Marta', 'Spain'), (4, 'Diego', None)
    ])
    con.executemany("INSERT INTO pedidos VALUES (?, ?, ?, ?, ?)", [
        (101, 1, 12000, '2026-08-01', 'completado'),
        (102, 1, 8000, '2026-08-03', 'completado'),
        (103, 2, 15000, '2026-08-03', 'completado'),
        (104, 2, 5000, '2026-09-01', 'cancelado'),
        (105, 3, 8000, '2026-09-02', 'completado')
    ])
    con.executemany("INSERT INTO contactos VALUES (?, ?)", [
        (1, 'ana@example.com'), (2, 'luis@example.com'),
        (3, 'ana@example.com'), (4, None)
    ])
    return con

con = abrir_demo()
