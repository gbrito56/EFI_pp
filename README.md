# Librería Kuky — Sistema de Gestión

Sistema web para la administración de inventario, catálogo interactivo de útiles escolares, categorías y proveedores, con presupuestador de lista escolar.

---

## Datos Generales del Proyecto

- **Repositorio Público en GitHub:** [https://github.com/gbrito56/EFI_pp](https://github.com/gbrito56/EFI_pp)
- **Tablero Ágil Kanban (GitHub Projects):** [https://github.com/users/gbrito56/projects/1/views/1](https://github.com/users/gbrito56/projects/1/views/1)
- **Versión de Entrega:** `v1.0.0`

### Integrantes del Equipo
- **Gustavo Brito** — [@gbrito56](https://github.com/gbrito56) *(Backend, Base de Datos y API REST)*
- **Soledad Tesando** — [@STesando](https://github.com/STesando) *(Frontend, SPA React y Componentes UI)*

---

## Enlaces del Proyecto

- **Frontend (Aplicación Web en Vercel):** [https://efi-pp.vercel.app](https://efi-pp.vercel.app)
- **Backend (API en FastAPI Cloud):** [https://efi-d7aa302f.fastapicloud.dev](https://efi-d7aa302f.fastapicloud.dev)
- **Documentación Interactiva (Swagger UI):** [https://efi-d7aa302f.fastapicloud.dev/docs](https://efi-d7aa302f.fastapicloud.dev/docs)
- **Tablero Kanban:** [GitHub Projects](https://github.com/users/gbrito56/projects/1/views/1)

### Credenciales de Demostración (Panel `/admin`)
- **Usuario:** `admin`
- **Contraseña:** `admin`

---

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/gbrito56/EFI_pp.git
cd EFI_pp
```

### 2. Backend (FastAPI)
```bash
cd backend

# Crear entorno virtual con uv o Python 3.12
uv venv --python 3.12

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate
# En Linux/macOS:
source .venv/bin/activate

# Instalar dependencias
uv pip install -r requirements.txt
# O alternativamente con pip: pip install -r requirements.txt

# Iniciar servidor de desarrollo
fastapi dev src/main.py --port 8000
```
- API pública local: `http://localhost:8000`
- Documentación Swagger UI: `http://localhost:8000/docs`
- Documentación ReDoc: `http://localhost:8000/redoc`

### 3. Frontend (React + Vite)
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```
- Aplicación web: `http://localhost:5173`

