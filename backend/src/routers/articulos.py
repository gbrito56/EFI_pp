from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from database import get_db
from models.articulos import Articulo, ArticuloBase, ArticuloPublic
from models.anidados import ArticuloNested

articulos_router = APIRouter()

NOT_FOUND_RESPONSE = {
    404: {
        "description": "Artículo no encontrado",
        "content": {"application/json": {"example": {"detail": "Artículo no encontrado"}}},
    }
}

# 1. Todos (Paginado)
@articulos_router.get("/", response_model=Page[ArticuloPublic])
async def get_articulos(db: Session = Depends(get_db)):
    return paginate(db, select(Articulo))

# 2. Por categoría (Paginado)
@articulos_router.get("/por-categoria/{categoria_id}", response_model=Page[ArticuloPublic])
async def get_articulos_por_categoria(
    categoria_id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    query = select(Articulo).where(Articulo.categoria_id == categoria_id)
    return paginate(db, query)

# 3. Por ID (Nested con categoría y proveedor)
@articulos_router.get("/{id}", responses=NOT_FOUND_RESPONSE, response_model=ArticuloNested)
async def get_articulo_by_id(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    articulo = db.get(Articulo, id)
    if articulo is not None:
        return articulo
    raise HTTPException(status_code=404, detail="Artículo no encontrado")

# 4. Crear
@articulos_router.post("/", response_model=ArticuloNested, status_code=201)
async def crear_articulo(
    articulo_nuevo: ArticuloBase,
    db: Session = Depends(get_db)
):
    articulo_db = Articulo.model_validate(articulo_nuevo)
    db.add(articulo_db)
    db.commit()
    db.refresh(articulo_db)
    return articulo_db

# 5. Update
@articulos_router.put("/{id}", responses=NOT_FOUND_RESPONSE, response_model=ArticuloPublic)
async def editar_articulo(
    id: Annotated[int, Path(gt=0)],
    articulo_editar: ArticuloBase,
    db: Session = Depends(get_db)
):
    articulo_db = db.get(Articulo, id)
    if articulo_db is not None:
        articulo_db.nombre = articulo_editar.nombre
        articulo_db.precio = articulo_editar.precio
        articulo_db.stock = articulo_editar.stock
        articulo_db.activo = articulo_editar.activo
        articulo_db.imagen_url = articulo_editar.imagen_url
        articulo_db.categoria_id = articulo_editar.categoria_id
        articulo_db.proveedor_id = articulo_editar.proveedor_id
        db.commit()
        db.refresh(articulo_db)
        return articulo_db
    raise HTTPException(status_code=404, detail="Artículo no encontrado")

# 6. Delete (con opción lógica o física)
@articulos_router.delete("/{id}", responses=NOT_FOUND_RESPONSE, response_model=list[ArticuloPublic])
async def borrar_articulo(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db),
    logico: Annotated[bool, Query(description="¿Mantener registro desactivado?")] = False
):
    articulo_db = db.get(Articulo, id)
    if articulo_db is not None:
        if logico:
            articulo_db.activo = False
        else:
            db.delete(articulo_db)
        db.commit()
        return db.exec(select(Articulo)).all()
    raise HTTPException(status_code=404, detail="Artículo no encontrado")
