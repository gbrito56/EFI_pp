# Backend — Librería Kuky

API REST construida con **FastAPI**, **SQLModel** y **Alembic**, preparada para despliegue en **FastAPI Cloud**.

## Integrantes
- gbrito56
- STesando

## Tecnologías
- Python 3.12+
- FastAPI
- SQLModel (SQLAlchemy 2.0)
- SQLite
- Alembic
- FastAPI Pagination
- FastAPI Cloud CLI

## Ejecución Local

1. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

2. Iniciar el servidor:
   ```bash
   fastapi dev src/main.py
   ```

3. Acceder a la documentación interactiva:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Despliegue en FastAPI Cloud

```bash
fastapi-cloud deploy
```
