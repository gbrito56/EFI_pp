# Librería Kuky - Sistema de Gestión

Sistema web Fullstack para la administración de inventario, catálogo de útiles escolares, categorías y proveedores. Proyecto integrador desarrollado para la Evaluación Final Integradora (EFI 2026).

---

## Integrantes del Equipo
- **Gustavo Brito** ([@gbrito56](https://github.com/gbrito56))
- **Soledad Tesando** ([@STesando](https://github.com/STesando))

---

## Enlaces del Proyecto en Producción

- **Frontend (Web):** [https://efi-pp.vercel.app](https://efi-pp.vercel.app)
- **Backend (API):** [https://efi-d7aa302f.fastapicloud.dev](https://efi-d7aa302f.fastapicloud.dev)
- **Documentación de la API (Swagger):** [https://efi-d7aa302f.fastapicloud.dev/docs](https://efi-d7aa302f.fastapicloud.dev/docs)
- **Documentación alternativa (ReDoc):** [https://efi-d7aa302f.fastapicloud.dev/redoc](https://efi-d7aa302f.fastapicloud.dev/redoc)

### Credenciales de prueba para el panel de administración (`/admin`)
- **Usuario:** `admin`
- **Contraseña:** `admin`

---

## Stack Tecnológico

| Capa | Tecnología | Despliegue |
|---|---|---|
| **Backend** | FastAPI + SQLModel + Alembic + FastAPI Pagination | [FastAPI Cloud](https://efi-d7aa302f.fastapicloud.dev) |
| **Frontend** | React 18 + Vite + react-router-dom + TailwindCSS | [Vercel](https://efi-pp.vercel.app) |
| **Base de Datos** | SQLite (desarrollo y producción) | FastAPI Cloud |
| **Gestor de Paquetes** | `uv` / `pip` (Python) y `npm` (Node.js) | — |

---

## Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/gbrito56/EFI_pp.git
cd EFI_pp
```

### 2. Backend (FastAPI)
```bash
cd backend

# Crear entorno virtual con uv o python
uv venv --python 3.12
# En Windows:
.venv\Scripts\activate
# En Linux/macOS:
source .venv/bin/activate

# Instalar dependencias
uv pip install -r requirements.txt
# O alternativamente con pip: pip install -r requirements.txt

# Iniciar servidor en modo desarrollo
fastapi dev src/main.py --port 8000
```
- Documentación interactiva Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 3. Frontend (React + Vite)
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```
- Aplicación web: `http://localhost:5173`

---

## 📡 Mapa de Endpoints de la API

La API cuenta con CRUD completo y paginación (`Page[T]`) con `fastapi-pagination`:

### Artículos (`/articulos`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|---|
| `GET` | `/articulos/` | Obtener todos los artículos | Sí |
| `GET` | `/articulos/{id}` | Obtener detalle de artículo con categoría y proveedor anidados | No |
| `GET` | `/articulos/por-categoria/{categoria_id}` | Filtrar artículos por categoría | Sí |
| `POST` | `/articulos/` | Crear un nuevo artículo | No |
| `PUT` | `/articulos/{id}` | Actualizar un artículo existente | No |
| `DELETE` | `/articulos/{id}` | Eliminar artículo (físico o borrado lógico con `?logico=true`) | No |

### Categorías (`/categoria`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|---|
| `GET` | `/categoria/` | Obtener todas las categorías | Sí |
| `GET` | `/categoria/{id}` | Detalle de categoría con lista de artículos asociados | No |
| `POST` | `/categoria/` | Crear una nueva categoría | No |
| `PUT` | `/categoria/{id}` | Actualizar una categoría | No |
| `DELETE` | `/categoria/{id}` | Eliminar categoría | No |

### Proveedores (`/proveedor`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|---|
| `GET` | `/proveedor/` | Obtener todos los proveedores | Sí |
| `GET` | `/proveedor/{id}` | Detalle de proveedor con lista de artículos asociados | No |
| `POST` | `/proveedor/` | Crear un nuevo proveedor | No |
| `PUT` | `/proveedor/{id}` | Actualizar un proveedor | No |
| `DELETE` | `/proveedor/{id}` | Eliminar proveedor | No |
