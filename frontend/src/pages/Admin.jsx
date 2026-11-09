import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { ThemeContext } from "../context/ThemeContext"

export default function Admin() {
  const navigate = useNavigate()
  const { isAdmin, loginAdmin, logoutAdmin } = useContext(AuthContext)
  const { darkMode } = useContext(ThemeContext)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  // Estado del login
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState(null)

  // Datos para selects
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])

  // Estado del formulario de creación de artículo
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria_id: "",
    proveedor_id: "",
    imagen_url: "",
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Estado para creación de nueva categoría y nuevo proveedor
  const [newCategoria, setNewCategoria] = useState({ nombre: "", descripcion: "" })
  const [submittingCat, setSubmittingCat] = useState(false)
  const [newProveedor, setNewProveedor] = useState({ nombre: "", telefono: "" })
  const [submittingProv, setSubmittingProv] = useState(false)

  // Cargar categorías y proveedores sólo si es admin
  const cargarCatalogos = () => {
    fetch(`${API_URL}/categoria/?size=50`)
      .then((res) => res.json())
      .then((data) => setCategorias(data.items || []))
      .catch((err) => console.error("Error categorías", err))

    fetch(`${API_URL}/proveedor/?size=50`)
      .then((res) => res.json())
      .then((data) => setProveedores(data.items || []))
      .catch((err) => console.error("Error proveedores", err))
  }

  useEffect(() => {
    if (isAdmin) {
      cargarCatalogos()
    }
  }, [API_URL, isAdmin])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoginError(null)
    const result = loginAdmin(loginForm.username, loginForm.password)
    if (!result.success) {
      setLoginError(result.error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateArticulo = () => {
    const newErrors = {}
    if (!form.nombre.trim() || form.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre es obligatorio y debe tener al menos 3 caracteres."
    }
    if (!form.precio || Number(form.precio) <= 0) {
      newErrors.precio = "El precio debe ser un número mayor a 0."
    }
    if (form.stock === "" || Number(form.stock) < 0) {
      newErrors.stock = "El stock debe ser un entero mayor o igual a 0."
    }
    if (!form.categoria_id) {
      newErrors.categoria_id = "Debes seleccionar una categoría."
    }
    if (!form.proveedor_id) {
      newErrors.proveedor_id = "Debes seleccionar un proveedor."
    }
    return newErrors
  }

  const handleSubmitArticulo = async (e) => {
    e.preventDefault()
    setServerError(null)
    setSuccessMsg(null)

    const formErrors = validateArticulo()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setSubmitting(true)

    const payload = {
      nombre: form.nombre.trim(),
      precio: parseInt(form.precio, 10),
      stock: parseInt(form.stock, 10),
      activo: true,
      categoria_id: parseInt(form.categoria_id, 10),
      proveedor_id: parseInt(form.proveedor_id, 10),
      imagen_url: form.imagen_url.trim() || null,
    }

    try {
      const res = await fetch(`${API_URL}/articulos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo crear el artículo en el backend`)
      }

      const creado = await res.json()
      setSuccessMsg(`¡Artículo "${creado.nombre}" creado exitosamente!`)
      setForm({
        nombre: "",
        precio: "",
        stock: "",
        categoria_id: "",
        proveedor_id: "",
        imagen_url: "",
      })

      setTimeout(() => {
        navigate(`/utiles/${creado.id}`)
      }, 1500)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCrearCategoria = async (e) => {
    e.preventDefault()
    setServerError(null)
    setSuccessMsg(null)

    if (!newCategoria.nombre.trim() || newCategoria.nombre.trim().length < 3) {
      setServerError("El nombre de la categoría debe tener al menos 3 caracteres.")
      return
    }

    setSubmittingCat(true)
    try {
      const payload = {
        nombre: newCategoria.nombre.trim(),
        descripcion: newCategoria.descripcion.trim() || null,
      }
      const res = await fetch(`${API_URL}/categoria/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo crear la categoría`)
      }

      const creada = await res.json()
      setSuccessMsg(`¡Categoría "${creada.nombre}" creada con éxito!`)
      setNewCategoria({ nombre: "", descripcion: "" })
      cargarCatalogos()
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmittingCat(false)
    }
  }

  const handleCrearProveedor = async (e) => {
    e.preventDefault()
    setServerError(null)
    setSuccessMsg(null)

    if (!newProveedor.nombre.trim() || newProveedor.nombre.trim().length < 3) {
      setServerError("El nombre del proveedor debe tener al menos 3 caracteres.")
      return
    }

    setSubmittingProv(true)
    try {
      const payload = {
        nombre: newProveedor.nombre.trim(),
        telefono: newProveedor.telefono.trim() || null,
      }
      const res = await fetch(`${API_URL}/proveedor/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo crear el proveedor`)
      }

      const creado = await res.json()
      setSuccessMsg(`¡Proveedor "${creado.nombre}" creado con éxito!`)
      setNewProveedor({ nombre: "", telefono: "" })
      cargarCatalogos()
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmittingProv(false)
    }
  }

  // PANTALLA 1: Login exclusivo (si NO está autenticado)
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-5xl">🔐</span>
          <h1 className={`text-3xl font-black ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Acceso de Administración
          </h1>
          <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Ingresá las credenciales para gestionar el inventario de Librería Kuky
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-sm text-center">
            {loginError}
          </div>
        )}

        <form
          onSubmit={handleLoginSubmit}
          className={`p-6 sm:p-8 rounded-2xl border shadow-lg space-y-4 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-700/60"
              : "bg-white border-zinc-200"
          }`}
        >
          <div>
            <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
              Usuario
            </label>
            <input
              type="text"
              placeholder="admin"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-colors ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="•••••"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-colors ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal-950/40"
          >
            Ingresar como Administrador
          </button>
        </form>
      </div>
    )
  }

  // PANTALLA 2: Panel de Gestión COMPLETO (SÓLO cuando isAdmin === true)
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Encabezado */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 transition-colors ${
          darkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <div>
          <h1 className={`text-3xl font-black ${darkMode ? "text-white" : "text-zinc-900"}`}>
            Panel de Administración
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Gestión de inventario, categorías y proveedores de Librería Kuky
          </p>
        </div>

        <button
          onClick={logoutAdmin}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            darkMode
              ? "bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border-zinc-700"
              : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300"
          }`}
        >
          Cerrar Sesión 🔒
        </button>
      </div>

      {/* Alertas globales */}
      {serverError && (
        <div className="p-4 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-sm">
          {serverError}
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {/* FORMULARIO 1: Alta de Artículo */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border space-y-5 transition-colors ${
          darkMode
            ? "bg-zinc-850 border-zinc-700/60"
            : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <div className="border-b pb-3 border-zinc-700/30">
          <h2 className={`text-xl font-bold ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
            📦 Alta de Nuevo Artículo
          </h2>
          <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
            Completá los datos del útil escolar para publicarlo en el catálogo
          </p>
        </div>

        <form onSubmit={handleSubmitArticulo} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
              Nombre del Artículo *
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Cuaderno A4 80 Hojas Rayado"
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none ${
                errors.nombre ? "border-red-500" : "focus:border-teal-500"
              } ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
            />
            {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Precio ($ AR) *
              </label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="Ej: 3500"
                min="1"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none ${
                  errors.precio ? "border-red-500" : "focus:border-teal-500"
                } ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              />
              {errors.precio && <p className="text-xs text-red-400 mt-1">{errors.precio}</p>}
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Stock Disponible *
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Ej: 50"
                min="0"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none ${
                  errors.stock ? "border-red-500" : "focus:border-teal-500"
                } ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              />
              {errors.stock && <p className="text-xs text-red-400 mt-1">{errors.stock}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Categoría *
              </label>
              <select
                name="categoria_id"
                value={form.categoria_id}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none ${
                  errors.categoria_id ? "border-red-500" : "focus:border-teal-500"
                } ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              {errors.categoria_id && <p className="text-xs text-red-400 mt-1">{errors.categoria_id}</p>}
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Proveedor / Marca *
              </label>
              <select
                name="proveedor_id"
                value={form.proveedor_id}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none ${
                  errors.proveedor_id ? "border-red-500" : "focus:border-teal-500"
                } ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              >
                <option value="">Seleccionar proveedor</option>
                {proveedores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              {errors.proveedor_id && <p className="text-xs text-red-400 mt-1">{errors.proveedor_id}</p>}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-1 ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
              URL de la Imagen (Opcional)
            </label>
            <input
              type="url"
              name="imagen_url"
              value={form.imagen_url}
              onChange={handleChange}
              placeholder="https://..."
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-teal-500 ${
                darkMode
                  ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                  : "bg-zinc-50 border-zinc-300 text-zinc-900"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal-950/40"
          >
            {submitting ? "Guardando artículo..." : "Registrar Artículo en Inventario"}
          </button>
        </form>
      </div>

      {/* SECCIÓN DOBLE: Crear Categoría y Crear Proveedor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORMULARIO 2: Nueva Categoría */}
        <div
          className={`p-6 rounded-2xl border space-y-4 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-700/60"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <div className="border-b pb-2 border-zinc-700/30">
            <h3 className={`text-lg font-bold ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
              🏷️ Nueva Categoría
            </h3>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
              Agregá un rubro para agrupar útiles
            </p>
          </div>

          <form onSubmit={handleCrearCategoria} className="space-y-3">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Nombre de Categoría *
              </label>
              <input
                type="text"
                placeholder="Ej: Regalería o Mochilas"
                value={newCategoria.nombre}
                onChange={(e) => setNewCategoria({ ...newCategoria, nombre: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-teal-500 ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Descripción (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Mochilas escolares y cartucheras"
                value={newCategoria.descripcion}
                onChange={(e) => setNewCategoria({ ...newCategoria, descripcion: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-teal-500 ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={submittingCat}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-teal-400 font-bold border border-teal-500/30 rounded-xl text-sm transition-colors"
            >
              {submittingCat ? "Guardando..." : "+ Crear Categoría"}
            </button>
          </form>
        </div>

        {/* FORMULARIO 3: Nuevo Proveedor */}
        <div
          className={`p-6 rounded-2xl border space-y-4 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-700/60"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <div className="border-b pb-2 border-zinc-700/30">
            <h3 className={`text-lg font-bold ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
              🏭 Nuevo Proveedor
            </h3>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
              Registrá una marca o distribuidor
            </p>
          </div>

          <form onSubmit={handleCrearProveedor} className="space-y-3">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Nombre del Proveedor *
              </label>
              <input
                type="text"
                placeholder="Ej: Pelikan o Mooving"
                value={newProveedor.nombre}
                onChange={(e) => setNewProveedor({ ...newProveedor, nombre: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-teal-500 ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Teléfono de Contacto (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: 11-4567-8901"
                value={newProveedor.telefono}
                onChange={(e) => setNewProveedor({ ...newProveedor, telefono: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-teal-500 ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={submittingProv}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-teal-400 font-bold border border-teal-500/30 rounded-xl text-sm transition-colors"
            >
              {submittingProv ? "Guardando..." : "+ Crear Proveedor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
