from sqlmodel import Field, Relationship, SQLModel

class ProveedorBase(SQLModel):
    nombre: str = Field(max_length=90, index=True)
    telefono: str | None = Field(default=None, max_length=50)

class Proveedor(ProveedorBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    articulos: list["Articulo"] | None = Relationship(back_populates="proveedor")

class ProveedorPublic(ProveedorBase):
    id: int
