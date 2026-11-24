import os
import mysql.connector
from decimal import Decimal
from datetime import date, datetime, timedelta

CONFIG = {
    "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.getenv("MYSQL_PORT", "3306")),
    "user": os.environ["MYSQL_USER"],
    "password": os.environ["MYSQL_PASSWORD"],
    "database": "alldoc_connector_lab",
    "autocommit": False,
    "allow_local_infile": False,
}

def abrir(**opciones):
    return mysql.connector.connect(**(CONFIG | opciones))
