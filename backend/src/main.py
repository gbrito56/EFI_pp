import sys
from contextlib import asynccontextmanager
from pathlib import Path
from alembic import command
from alembic.config import Config
from database import engine
from datos import seed_database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from routers.articulos import articulos_router
from routers.categoria import categoria_router
from routers.proveedor import proveedor_router


# Garantizar que src esté en sys.path para imports internos (routers, models, database)
SRC_DIR = Path(__file__).resolve().parent
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))


BASE_DIR = Path(__file__).resolve().parent.parent


def run_migrations():
    ini_path = BASE_DIR / "alembic.ini"
    alembic_dir = BASE_DIR / "alembic"

    if not ini_path.exists():
        raise FileNotFoundError(f"No se encontró alembic.ini en: {ini_path}")

    alembic_cfg = Config(str(ini_path))
    alembic_cfg.set_main_option("script_location", str(alembic_dir))
    command.upgrade(alembic_cfg, "head")


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migrations()
    seed_database(engine)
    yield


app = FastAPI(lifespan=lifespan)
app.title = "Librería Kuky - API de Gestión"

# Inclusión de routers modulares
app.include_router(articulos_router, prefix="/articulos", tags=["Artículos"])
app.include_router(categoria_router, prefix="/categoria", tags=["Categorías"])
app.include_router(proveedor_router, prefix="/proveedor", tags=["Proveedores"])

# Habilitar paginación global
add_pagination(app)

# Configuración de CORS
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://efi-pp.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
