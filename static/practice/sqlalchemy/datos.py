import sqlalchemy as sa
from sqlalchemy import (
    create_engine, text, select, insert, update, delete, Table, Column,
    MetaData, Integer, String, Numeric, Date, ForeignKey, func, case,
    cast, literal, bindparam, and_, or_, not_, inspect
)
from datetime import date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session, sessionmaker

engine = create_engine("sqlite+pysqlite:///:memory:")
@sa.event.listens_for(engine, "connect")
def activar_fk(dbapi_connection, connection_record):
    dbapi_connection.execute("PRAGMA foreign_keys=ON")

metadata = MetaData()
clientes = Table("clientes", metadata,
    Column("id", Integer, primary_key=True),
    Column("nombre", String(60), nullable=False),
    Column("pais", String(30)),
    Column("alta", Date, nullable=False))
pedidos = Table("pedidos", metadata,
    Column("id", Integer, primary_key=True),
    Column("cliente_id", ForeignKey("clientes.id"), nullable=False),
    Column("monto", Integer, nullable=False),
    Column("fecha", Date, nullable=False),
    Column("estado", String(20), nullable=False),
    Column("cupon", String(20)))
productos = Table("productos", metadata,
    Column("id", Integer, primary_key=True),
    Column("nombre", String(60), nullable=False),
    Column("categoria", String(30)),
    Column("precio", Integer, nullable=False))
detalles = Table("detalles", metadata,
    Column("id", Integer, primary_key=True),
    Column("pedido_id", ForeignKey("pedidos.id"), nullable=False),
    Column("producto_id", ForeignKey("productos.id"), nullable=False),
    Column("cantidad", Integer, nullable=False),
    Column("precio", Integer, nullable=False))
metadata.create_all(engine)
with engine.begin() as conn:
    conn.execute(insert(clientes), [
        dict(id=i, nombre=n, pais=p, alta=date(2026, 1, d))
        for i,n,p,d in [(1,"Ana","MX",1),(2,"Luis","MX",2),
                        (3,"Marta","ES",3),(4,"Noa",None,4),(5,"Eva","ES",5)]])
    conn.execute(insert(pedidos), [
        dict(id=i, cliente_id=c, monto=m, fecha=date.fromisoformat(f), estado=e, cupon=k)
        for i,c,m,f,e,k in [(101,1,100,"2026-02-01","completed",None),
                           (102,1,200,"2026-02-03","completed","SAVE"),
                           (103,2,200,"2026-02-03","completed",None),
                           (104,2,50,"2026-02-04","cancelled",None),
                           (105,3,300,"2026-03-01","completed","SAVE"),
                           (106,3,100,"2026-03-02","completed",None),
                           (107,4,80,"2026-03-02","cancelled",None)]])
    conn.execute(insert(productos), [dict(id=i,nombre=n,categoria=c,precio=p)
        for i,n,c,p in [(1,"Mouse","Tech",100),(2,"Teclado","Tech",200),(3,"Silla","Hogar",300)]])
    conn.execute(insert(detalles), [dict(id=i,pedido_id=o,producto_id=p,cantidad=q,precio=v)
        for i,o,p,q,v in [(1,101,1,1,100),(2,102,1,2,100),(3,103,2,1,200),
                          (4,105,3,1,300),(5,106,1,1,100)]])

# Ayudantes de práctica (no forman parte de la API de SQLAlchemy).
def ver(stmt, params=None):
    with engine.connect() as conn:
        r = conn.execute(stmt, params or {})
        print(tuple(r.keys()))
        print(r.tuples().all())

def valor(stmt, params=None):
    with engine.connect() as conn:
        print(conn.execute(stmt, params or {}).scalar_one())

class Base(DeclarativeBase):
    pass

class Cliente(Base):
    __table__ = clientes
    pedidos: Mapped[list["Pedido"]] = relationship(back_populates="cliente")

class Pedido(Base):
    __table__ = pedidos
    cliente: Mapped["Cliente"] = relationship(back_populates="pedidos")

# Los modelos reutilizan las tablas ya creadas; no crean otras.
Sesion = sessionmaker(engine)
