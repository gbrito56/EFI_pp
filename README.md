# Librería Kuky — Sistema de Gestión Escolar y Catálogo Web

Sistema web Fullstack para la administración de inventario, catálogo interactivo de útiles escolares, categorías y proveedores, con presupuestador de lista escolar. Proyecto desarrollado para la **Evaluación Final Integradora (EFI 2026)**.

---

## 📌 Datos Generales del Proyecto

- **Repositorio Público en GitHub:** [https://github.com/gbrito56/EFI_pp](https://github.com/gbrito56/EFI_pp)
- **Tablero Ágil Kanban (GitHub Projects):** [https://github.com/users/gbrito56/projects/1/views/1](https://github.com/users/gbrito56/projects/1/views/1)
- **Versión de Entrega:** `v1.0.0` (Tag formal en rama `main`)

### Integrantes del Equipo
- **Gustavo Brito** — [@gbrito56](https://github.com/gbrito56) *(Arquitectura Backend, Base de Datos y API REST)*
- **Soledad Tesando** — [@STesando](https://github.com/STesando) *(Desarrollo Frontend, SPA React y Componentes UI)*

---

## 🚀 Enlaces del Proyecto en Producción

- **Frontend (Aplicación Web en Vercel):** [https://efi-pp.vercel.app](https://efi-pp.vercel.app)
- **Backend (API en FastAPI Cloud):** [https://efi-d7aa302f.fastapicloud.dev](https://efi-d7aa302f.fastapicloud.dev)
- **Documentación Interactiva (Swagger UI):** [https://efi-d7aa302f.fastapicloud.dev/docs](https://efi-d7aa302f.fastapicloud.dev/docs)
- **Documentación Alternativa (ReDoc):** [https://efi-d7aa302f.fastapicloud.dev/redoc](https://efi-d7aa302f.fastapicloud.dev/redoc)

### Credenciales de Demostración (Panel `/admin`)
- **Usuario:** `admin`
- **Contraseña:** `admin`

---

## 📖 Temática Elegida y API Utilizada

### Temática
El proyecto modela la operación de **Librería Kuky**, un comercio dedicado a la venta de artículos y útiles escolares (escritura, papelería, dibujo y organización). Permite a los usuarios explorar el catálogo con filtros por categoría, consultar el detalle y especificaciones de cada producto, y armar una **lista de favoritos interactiva con multiplicador de cantidades** que calcula en tiempo real el presupuesto estimado total para el ciclo lectivo. Además, cuenta con un **panel de administración protegido** para dar de alta nuevos útiles, categorías y proveedores.

### API Utilizada
La API REST fue desarrollada desde cero con **FastAPI** y **SQLModel**, conectada a una base de datos **SQLite** relacional con claves foráneas e integridad referencial:
- **Paginación nativa:** Todos los listados implementan `fastapi-pagination` (`Page[T]`).
- **Migraciones de esquema:** Versionadas mediante **Alembic** (`001_initial_schema` y `002_add_imagen_url`), ejecutadas automáticamente al iniciar la aplicación.
- **Documentación OpenAPI interactiva:** Disponible en `/docs` (Swagger UI) y `/redoc`.
- **CORS dinámico:** Configurado para admitir conexiones locales y el dominio de despliegue en Vercel.

---

## 📋 Metodología Ágil y Organización del Trabajo

Para dar cumplimiento a los estándares de desarrollo ágil y trabajo colaborativo:

1. **Tablero Kanban:**  
   Se gestionó el flujo de trabajo mediante un tablero Kanban en [GitHub Projects](https://github.com/users/gbrito56/projects/1/views/1), dividiendo las historias de usuario y tareas técnicas en columnas *To Do*, *In Progress* y *Done*.
2. **Estrategia GitFlow:**  
   El desarrollo se estructuró de forma rigurosa en ramas para asegurar estabilidad y trazabilidad:
   - **`main`:** Código de producción estable etiquetado con la release `v1.0.0`.
   - **`develop`:** Rama de integración continua donde convergen las funcionalidades terminadas.
   - **`feature/backend-api`:** Desarrollo de modelos SQLModel, routers CRUD, migraciones de Alembic y base precargada.
   - **`feature/frontend`:** Desarrollo de la SPA en React 18, componentes modulares con TailwindCSS y contextos globales.
   - **Pull Requests (PR #1):** Integración formal de la rama de frontend mediante revisión y *Merge commit* con autoría compartida.

```
(main)       085ecfd (Init) ───────────────────────────────────● 759c8e4 [Tag: v1.0.0] (Release)
                \                                             /
(develop)        ● ─────────────────●───────────● 18b3cd8 ───/
                  \                /           /
(feature/backend)  ● f25d390 ─────/           /
                                  \          /
(feature/frontend)                 ● 68710dc (PR #1)
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Características | Despliegue |
|---|---|---|---|
| **Backend** | Python 3.12 + FastAPI + SQLModel | Arquitectura en 4 capas (`Base`/`Table`/`Public`/`Nested`), Alembic, `fastapi-pagination` | [FastAPI Cloud](https://efi-d7aa302f.fastapicloud.dev) |
| **Frontend** | React 18 + Vite + TailwindCSS | Componentes modulares, react-router-dom, Context API (Favoritos, Tema, Auth) | [Vercel](https://efi-pp.vercel.app) |
| **Base de Datos** | SQLite (`base_de_datos.db`) | 3 tablas relacionadas con FKs, precargada con 16 artículos e imágenes reales | FastAPI Cloud |
| **Control de Versiones** | Git + GitFlow | Commits semánticos (`feat:`, `fix:`, `chore:`, `release:`), PRs y Tags | GitHub |

---

## 💻 Instalación y Ejecución Local

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

---

## 📡 Mapa de Endpoints de la API

La API cuenta con CRUD completo y paginación (`Page[T]`) en sus recursos principales:

### Artículos (`/articulos`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|:---:|
| `GET` | `/articulos/` | Obtener catálogo completo de artículos | ✅ Sí |
| `GET` | `/articulos/{id}` | Obtener detalle con categoría y proveedor anidados | No |
| `GET` | `/articulos/por-categoria/{categoria_id}` | Filtrar artículos pertenecientes a una categoría | ✅ Sí |
| `POST` | `/articulos/` | Registrar un nuevo artículo escolar | No |
| `PUT` | `/articulos/{id}` | Actualizar un artículo existente | No |
| `DELETE` | `/articulos/{id}` | Eliminar artículo (físico o borrado lógico con `?logico=true`) | No |

### Categorías (`/categoria`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|:---:|
| `GET` | `/categoria/` | Obtener listado de categorías | ✅ Sí |
| `GET` | `/categoria/{id}` | Detalle de categoría con artículos asociados | No |
| `POST` | `/categoria/` | Crear una nueva categoría | No |
| `PUT` | `/categoria/{id}` | Modificar datos de una categoría | No |
| `DELETE` | `/categoria/{id}` | Eliminar una categoría | No |

### Proveedores (`/proveedor`)
| Método | Endpoint | Descripción | Paginado |
|---|---|---|:---:|
| `GET` | `/proveedor/` | Obtener listado de proveedores / marcas | ✅ Sí |
| `GET` | `/proveedor/{id}` | Detalle de proveedor con artículos asociados | No |
| `POST` | `/proveedor/` | Registrar un nuevo proveedor | No |
| `PUT` | `/proveedor/{id}` | Modificar datos de un proveedor | No |
| `DELETE` | `/proveedor/{id}` | Eliminar un proveedor | No |

---

## 🎨 Características de la Interfaz (Frontend)

- **Componentes Modulares:** Estructura limpia y desacoplada en `components/`, `pages/` y `context/`.
- **Diseño con TailwindCSS:** Interfaz moderna, adaptativa para móviles y computadoras de escritorio.
- **Soporte Dark Mode / Light Mode:** Alternancia de temas con persistencia en `localStorage` mediante `ThemeContext`.
- **4 Estados de UI:** Manejo explícito de estados de carga (**Loading** con spinner), errores (**Error** con botón de reintento), catálogo vacío (**Empty**) y visualización (**Success**).
- **Rutas Anidadas:** Uso de `<Outlet />` para alternar entre especificaciones técnicas del producto y el sistema de opiniones/calificaciones.
- **Presupuestador de Favoritos:** Multiplicador dinámico de cantidad por artículo que calcula subtotales y presupuesto final en tiempo real.
