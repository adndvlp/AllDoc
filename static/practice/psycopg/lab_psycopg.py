import os
import psycopg
from psycopg.conninfo import make_conninfo

BASE_DSN = os.environ.get("DATABASE_URL", "")
DSN = make_conninfo(BASE_DSN, options="-c search_path=alldoc_psycopg,public")

if __name__ == "__main__":
    with psycopg.connect(BASE_DSN) as conn:
        conn.execute("CREATE SCHEMA IF NOT EXISTS alldoc_psycopg")

    with psycopg.connect(DSN) as conn:
        conn.execute("DROP TABLE IF EXISTS alldoc_psycopg.pedidos")
        conn.execute("DROP TABLE IF EXISTS alldoc_psycopg.clientes")
        conn.execute("""
            CREATE TABLE clientes (
                id integer PRIMARY KEY,
                nombre text NOT NULL,
                pais text
            )
        """)
        conn.execute("""
            CREATE TABLE pedidos (
                id integer PRIMARY KEY,
                cliente_id integer NOT NULL REFERENCES clientes(id),
                importe numeric(10,2) NOT NULL CHECK (importe >= 0),
                fecha date NOT NULL,
                estado text NOT NULL,
                nota text
            )
        """)
        with conn.cursor() as cur:
            cur.executemany("INSERT INTO clientes VALUES (%s, %s, %s)", [
                (1, "Ana", "México"), (2, "Luis", "México"),
                (3, "Marta", "España"), (4, "Diego", None),
            ])
            cur.executemany("""INSERT INTO pedidos
                VALUES (%s, %s, %s, %s, %s, %s)""", [
                (101, 1, 800, "2026-01-05", "completed", None),
                (102, 1, 200, "2026-01-10", "completed", "web"),
                (103, 2, 500, "2026-01-10", "completed", "web"),
                (104, 3, 300, "2026-02-01", "cancelled", None),
                (105, 2, 500, "2026-02-03", "completed", None),
            ])
