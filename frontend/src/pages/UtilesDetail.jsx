import { useState, useEffect, useContext } from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import { ThemeContext } from "../context/ThemeContext"

export default function UtilesDetail() {
  const { id } = useParams()
  const { darkMode } = useContext(ThemeContext)
  const [articulo, setArticulo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { toggleFavorito, esFavorito } = useContext(FavoritosContext)
  const fav = articulo ? esFavorito(articulo.id) : false

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${API_URL}/articulos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Artículo no encontrado")
        return res.json()
      })
      .then((data) => {
        setArticulo(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [API_URL, id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className={darkMode ? "text-zinc-400" : "text-zinc-600"}>Cargando detalle del artículo...</p>
      </div>
    )
  }

  if (error || !articulo) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-red-950/40 border border-red-800 rounded-2xl text-center space-y-4">
        <span className="text-5xl">❌</span>
        <h2 className="text-2xl font-bold text-red-400">Artículo no encontrado</h2>
        <p className="text-sm text-zinc-300">El producto solicitado no existe o fue dado de baja.</p>
        <Link
          to="/utiles"
          className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-lg text-white font-semibold transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link
        to="/utiles"
        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
          darkMode ? "text-teal-400 hover:underline" : "text-teal-600 hover:underline"
        }`}
      >
        ← Volver al catálogo
      </Link>

      {/* Tarjeta Principal del Producto */}
      <div
        className={`border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center transition-colors ${
          darkMode ? "bg-zinc-850 border-zinc-700/60" : "bg-white border-zinc-200 shadow-sm"
        }`}
      >
        <img
          src={articulo.imagen_url || "https://images.unsplash.com/photo-1585336261026-6218d6a89c93?w=500&auto=format&fit=crop&q=60"}
          alt={articulo.nombre}
          className="w-full md:w-80 h-72 object-cover rounded-xl shadow-md"
        />

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider border ${
                darkMode
                  ? "bg-teal-950 text-teal-400 border-teal-800"
                  : "bg-teal-50 text-teal-700 border-teal-200"
              }`}
            >
              {articulo.categoria?.nombre || "Librería"}
            </span>

            <button
              onClick={() => toggleFavorito(articulo)}
              className={`p-2 rounded-full border transition-colors ${
                fav
                  ? "bg-red-500/20 text-red-500 border-red-500/40"
                  : darkMode
                  ? "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-red-400"
                  : "bg-zinc-100 text-zinc-600 border-zinc-300 hover:text-red-500"
              }`}
            >
              {fav ? "❤️ En Favoritos" : "🤍 Guardar"}
            </button>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-extrabold transition-colors ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            {articulo.nombre}
          </h1>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-4xl font-black text-teal-500">
              ${articulo.precio.toLocaleString("es-AR")}
            </span>
            <span
              className={`text-sm font-semibold px-2 py-0.5 rounded border ${
                articulo.stock > 0
                  ? "bg-emerald-950/80 text-emerald-400 border-emerald-800"
                  : "bg-red-950/80 text-red-400 border-red-800"
              }`}
            >
              {articulo.stock > 0 ? `${articulo.stock} disponibles` : "Agotado"}
            </span>
          </div>

          <div className={`pt-2 text-sm space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            <p>
              <strong className={darkMode ? "text-zinc-200" : "text-zinc-800"}>Marca / Proveedor:</strong>{" "}
              {articulo.proveedor?.nombre || "Oficial"}
            </p>
            <p>
              <strong className={darkMode ? "text-zinc-200" : "text-zinc-800"}>Estado:</strong>{" "}
              {articulo.activo ? "Habilitado para venta escolar" : "Inactivo"}
            </p>
          </div>
        </div>
      </div>

      {/* Sub-navegación con <Outlet /> */}
      <div
        className={`border-b flex gap-4 text-sm font-semibold transition-colors ${
          darkMode ? "border-zinc-700" : "border-zinc-300"
        }`}
      >
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `pb-3 px-2 border-b-2 transition-colors ${
              isActive
                ? "border-teal-500 text-teal-500 font-bold"
                : darkMode
                ? "border-transparent text-zinc-400 hover:text-zinc-200"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`
          }
        >
          📄 Descripción y Ficha
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            `pb-3 px-2 border-b-2 transition-colors ${
              isActive
                ? "border-teal-500 text-teal-500 font-bold"
                : darkMode
                ? "border-transparent text-zinc-400 hover:text-zinc-200"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`
          }
        >
          ⭐ Opiniones y Reseñas
        </NavLink>
      </div>

      {/* Inserción con Outlet */}
      <Outlet context={{ articulo }} />
    </div>
  )
}
