from .articulos import ArticuloPublic, Articulo
from .categoria import CategoriaPublic, Categoria
from .proveedor import ProveedorPublic, Proveedor

class ArticuloNested(ArticuloPublic):
    categoria: Categoria | None = None
    proveedor: Proveedor | None = None

class CategoriaNested(CategoriaPublic):
    articulos: list[Articulo] = []

class ProveedorNested(ProveedorPublic):
    articulos: list[Articulo] = []
