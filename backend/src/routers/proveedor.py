from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import Session, select

from database import get_db
from models.proveedor import Proveedor, ProveedorBase, ProveedorPublic
from models.anidados import ProveedorNested

proveedor_router = APIRouter()

NOT_FOUND_RESPONSE = {
    404: {
        "description": "Proveedor no encontrado",
        "content": {"application/json": {"example": {"detail": "Proveedor no encontrado"}}},
    }
}

# 1. Read All (Paginado)
@proveedor_router.get("/", response_model=Page[ProveedorPublic])
async def get_proveedores(db: Session = Depends(get_db)):
    return paginate(db, select(Proveedor))

# 2. Read by ID (Nested con sus artículos)
@proveedor_router.get("/{id}", responses=NOT_FOUND_RESPONSE, response_model=ProveedorNested)
async def get_proveedor_by_id(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    proveedor = db.get(Proveedor, id)
    if proveedor is not None:
        return proveedor
    raise HTTPException(status_code=404, detail="Proveedor no encontrado")

# 3. Create
@proveedor_router.post("/", response_model=ProveedorPublic, status_code=201)
async def crear_proveedor(
    proveedor_nuevo: ProveedorBase,
    db: Session = Depends(get_db)
):
    proveedor_db = Proveedor.model_validate(proveedor_nuevo)
    db.add(proveedor_db)
    db.commit()
    db.refresh(proveedor_db)
    return proveedor_db

# 4. Update (PUT completo)
@proveedor_router.put("/{id}", responses=NOT_FOUND_RESPONSE, response_model=ProveedorPublic)
async def editar_proveedor(
    id: Annotated[int, Path(gt=0)],
    proveedor_editar: ProveedorBase,
    db: Session = Depends(get_db)
):
    proveedor_db = db.get(Proveedor, id)
    if proveedor_db is not None:
        proveedor_db.nombre = proveedor_editar.nombre
        proveedor_db.telefono = proveedor_editar.telefono
        db.commit()
        db.refresh(proveedor_db)
        return proveedor_db
    raise HTTPException(status_code=404, detail="Proveedor no encontrado")

# 5. Delete
@proveedor_router.delete("/{id}", responses=NOT_FOUND_RESPONSE, response_model=list[ProveedorPublic])
async def borrar_proveedor(
    id: Annotated[int, Path(gt=0)],
    db: Session = Depends(get_db)
):
    proveedor_db = db.get(Proveedor, id)
    if proveedor_db is not None:
        db.delete(proveedor_db)
        db.commit()
        return db.exec(select(Proveedor)).all()
    raise HTTPException(status_code=404, detail="Proveedor no encontrado")
