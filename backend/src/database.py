from sqlmodel import create_engine, Session

url = "sqlite:///./base_de_datos.db"

# Motor de conexión con check_same_thread=False para operaciones concurrentes en FastAPI
engine = create_engine(url, connect_args={"check_same_thread": False})

# Dependencia para inyectar la sesión en cada path operation
def get_db():
    with Session(engine) as session:
        yield session
