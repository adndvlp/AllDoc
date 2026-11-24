from datetime import date, datetime
from decimal import Decimal
from pathlib import Path
import tempfile
from pyspark.sql import SparkSession, Row, Window
from pyspark.sql import functions as F, types as T

base = Path(tempfile.mkdtemp(prefix="alldoc-pyspark-"))
spark = (
    SparkSession.builder.master("local[2]").appName("AllDoc")
    .config("spark.sql.session.timeZone", "UTC")
    .config("spark.sql.shuffle.partitions", "4")
    .config("spark.sql.ansi.enabled", "true")
    .config("spark.sql.caseSensitive", "false")
    .config("spark.sql.adaptive.enabled", "true")
    .config("spark.sql.cbo.enabled", "false")
    .config("spark.sql.warehouse.dir", str(base / "warehouse"))
    .getOrCreate()
)

customers = spark.createDataFrame([
    (1, "Ana", "MX", date(2026, 7, 1)),
    (2, "Luis", "MX", date(2026, 7, 5)),
    (3, "Marta", "ES", date(2026, 8, 1)),
    (4, "Diego", None, date(2026, 8, 10)),
    (5, "Sofia", "ES", date(2026, 8, 12)),
], "customer_id INT, name STRING, country STRING, signup_date DATE")

orders = spark.createDataFrame([
    (101, 1, 500, date(2026, 8, 1), "completed", None),
    (102, 1, 200, date(2026, 8, 2), "completed", "SAVE"),
    (103, 2, 700, date(2026, 8, 2), "completed", None),
    (104, 3, 100, date(2026, 9, 1), "completed", None),
    (105, 2, 300, date(2026, 9, 2), "cancelled", "SAVE"),
    (106, 3, 800, date(2026, 9, 3), "completed", "VIP"),
], "order_id INT, customer_id INT, amount INT, order_date DATE, status STRING, coupon STRING")

products = spark.createDataFrame([
    (1, "Monitor", "Electronics"),
    (2, "Desk", "Furniture"),
    (3, "Mouse", "Electronics"),
], "product_id INT, product_name STRING, category STRING")

items = spark.createDataFrame([
    (1,101,1,1,300), (2,101,3,2,100), (3,102,2,1,200),
    (4,103,1,2,350), (5,104,3,1,100), (6,105,2,1,300),
    (7,106,2,2,400),
], "item_id INT, order_id INT, product_id INT, quantity INT, unit_price INT")

leads = spark.createDataFrame([
    (1,"ana@demo.test","ads"), (2,"luis@demo.test","web"),
    (3,"ana@demo.test","web"), (4,"marta@demo.test","ads"),
], "lead_id INT, email STRING, source STRING")

nested = spark.createDataFrame([
    (1,["vip","new","vip"],{"MX":2},(1,"Ana")),
    (2,[],{"ES":1},(2,"Luis")),
], "id INT, tags ARRAY<STRING>, stock MAP<STRING,INT>, person STRUCT<id:INT,name:STRING>")

ml_data = spark.createDataFrame([
    (float(x),float(2*x),float(x>=4)) for x in range(1,7)
], "x DOUBLE, target DOUBLE, label DOUBLE")

# Archivos pequeños para ejemplos de lectura y streaming.
(base / "sample.csv").write_text("id,amount\n1,100\n2,200\n", encoding="utf-8")
(base / "sample.json").write_text('{"id":1,"amount":100}\n{"id":2,"amount":200}\n', encoding="utf-8")
(base / "events").mkdir()
(base / "events" / "batch1.json").write_text((base / "sample.json").read_text(), encoding="utf-8")
orders.write.mode("overwrite").parquet(str(base / "orders.parquet"))

for name, df in [("customers",customers),("orders",orders),("products",products),("items",items),("leads",leads)]:
    df.createOrReplaceTempView(name)
