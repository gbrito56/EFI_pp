from sqlmodel import Field, Relationship, SQLModel
from .categoria import Categoria
from .proveedor import Proveedor

class ArticuloBase(SQLModel):
    nombre: str = Field(max_length=90, index=True)
    stock: int | None = Field(default=0)
    precio: int
    activo: bool = Field(default=True)
    imagen_url: str | None = Field(default=None)
    
    # Claves foráneas obligatorias
    categoria_id: int | None = Field(default=None, foreign_key="categoria.id")
    proveedor_id: int | None = Field(default=None, foreign_key="proveedor.id")

class Articulo(ArticuloBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    
    # Relaciones para navegación
    categoria: Categoria | None = Relationship(back_populates="articulos")
    proveedor: Proveedor | None = Relationship(back_populates="articulos")

class ArticuloPublic(ArticuloBase):
    id: int
