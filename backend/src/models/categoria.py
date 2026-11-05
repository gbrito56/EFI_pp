from sqlmodel import Field, Relationship, SQLModel

class CategoriaBase(SQLModel):
    nombre: str = Field(max_length=90, index=True)
    descripcion: str | None = Field(default=None, max_length=255)

class Categoria(CategoriaBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    articulos: list["Articulo"] | None = Relationship(back_populates="categoria")

class CategoriaPublic(CategoriaBase):
    id: int
