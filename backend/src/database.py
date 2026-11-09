import os
from pathlib import Path
from sqlmodel import create_engine, Session

# Ruta absoluta al archivo base_de_datos.db en la raíz del backend
BASE_DIR = Path(__file__).resolve().parent.parent
db_path = BASE_DIR / "base_de_datos.db"
url = f"sqlite:///{db_path}"

# Motor de conexión con check_same_thread=False para operaciones concurrentes en FastAPI
engine = create_engine(url, connect_args={"check_same_thread": False})

# Dependencia para inyectar la sesión en cada path operation
def get_db():
    with Session(engine) as session:
        yield session
