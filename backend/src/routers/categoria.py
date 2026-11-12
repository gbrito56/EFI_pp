from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from database import get_db
from models.categoria import Categoria, CategoriaBase, CategoriaPublic
from models.anidados import CategoriaNested

categoria_router = APIRouter()

NOT_FOUND_RESPONSE = {
    404: {
        "description": "Categoría no encontrada",
        "content": {"application/json": {"example": {"detail": "Categoría no encontrada"}}},
    }
}

# 1. Todos (Paginado)
@categoria_router.get("/", response_model=Page[CategoriaPublic])
async def get_categorias(db: Session = Depends(get_db)):
    return paginate(db, select(Categoria))

# 2. Por ID (Nested con sus artículos)
@categoria_router.get("/{id}", responses=NOT_FOUND_RESPONSE, response_model=CategoriaNested)
async def get_categoria_by_id(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    categoria = db.get(Categoria, id)
    if categoria is not None:
        return categoria
    raise HTTPException(status_code=404, detail="Categoría no encontrada")

# 3. Crear
@categoria_router.post("/", response_model=CategoriaPublic, status_code=201)
async def crear_categoria(
    categoria_nueva: CategoriaBase,
    db: Session = Depends(get_db)
):
    categoria_db = Categoria.model_validate(categoria_nueva)
    db.add(categoria_db)
    db.commit()
    db.refresh(categoria_db)
    return categoria_db

# 4. Update
@categoria_router.put("/{id}", responses=NOT_FOUND_RESPONSE, response_model=CategoriaPublic)
async def editar_categoria(
    id: Annotated[int, Path(gt=0)],
    categoria_editar: CategoriaBase,
    db: Session = Depends(get_db)
):
    categoria_db = db.get(Categoria, id)
    if categoria_db is not None:
        categoria_db.nombre = categoria_editar.nombre
        categoria_db.descripcion = categoria_editar.descripcion
        db.commit()
        db.refresh(categoria_db)
        return categoria_db
    raise HTTPException(status_code=404, detail="Categoría no encontrada")

# 5. Delete
@categoria_router.delete("/{id}", responses=NOT_FOUND_RESPONSE, response_model=list[CategoriaPublic])
async def borrar_categoria(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    categoria_db = db.get(Categoria, id)
    if categoria_db is not None:
        db.delete(categoria_db)
        db.commit()
        return db.exec(select(Categoria)).all()
    raise HTTPException(status_code=404, detail="Categoría no encontrada")
