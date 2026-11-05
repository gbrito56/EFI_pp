import { useState, useEffect, useContext } from "react"
import { useSearchParams } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"
import ArticuloCard from "../components/ArticuloCard"

export default function Utiles() {
  const { darkMode } = useContext(ThemeContext)
  const [articulos, setArticulos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaSeleccionada = searchParams.get("categoria") || ""
  const paginaActual = parseInt(searchParams.get("page") || "1", 10)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

  // 1. Cargar lista de categorías
  useEffect(() => {
    fetch(`${API_URL}/categoria/?size=50`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar categorías")
        return res.json()
      })
      .then((data) => setCategorias(data.items || []))
      .catch((err) => console.error(err))
  }, [API_URL])

  // 2. Cargar artículos
  useEffect(() => {
    setLoading(true)
    setError(null)

    const endpoint = categoriaSeleccionada
      ? `${API_URL}/articulos/por-categoria/${categoriaSeleccionada}?page=${paginaActual}&size=6`
      : `${API_URL}/articulos/?page=${paginaActual}&size=6`

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar los artículos`)
        return res.json()
      })
      .then((data) => {
        setArticulos(data.items || [])
        setTotalPaginas(data.pages || 1)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [API_URL, categoriaSeleccionada, paginaActual])

  const handleCategoriaChange = (e) => {
    const val = e.target.value
    if (val) {
      setSearchParams({ categoria: val, page: "1" })
    } else {
      setSearchParams({ page: "1" })
    }
  }

  const cambiarPagina = (nueva) => {
    const params = { page: String(nueva) }
    if (categoriaSeleccionada) params.categoria = categoriaSeleccionada
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Encabezado y Filtros */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 transition-colors ${
          darkMode ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        <div>
          <h1
            className={`text-3xl font-black transition-colors ${
              darkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Catálogo de Útiles
          </h1>
          <p
            className={`text-sm mt-1 transition-colors ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Explorá el stock oficial de la librería escolar
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            htmlFor="catSelect"
            className={`text-sm font-semibold transition-colors ${
              darkMode ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            Categoría:
          </label>
          <select
            id="catSelect"
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
            className={`flex-1 sm:flex-initial px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:border-teal-500 transition-colors ${
              darkMode
                ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                : "bg-white border-zinc-300 text-zinc-800 shadow-sm"
            }`}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id} className={darkMode ? "bg-zinc-800 text-zinc-100" : "bg-white text-zinc-800"}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Loading State */}
      {loading && (
        <div className="text-center py-20 space-y-3">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className={darkMode ? "text-zinc-400 text-lg" : "text-zinc-600 text-lg"}>
            Cargando catálogo escolar...
          </p>
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="max-w-md mx-auto text-center py-16 px-6 bg-red-950/40 border border-red-800/80 rounded-2xl space-y-4">
          <span className="text-4xl">⚠️</span>
          <h3 className="text-xl font-bold text-red-400">Error de conexión</h3>
          <p className="text-sm text-zinc-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* 3. Empty State */}
      {!loading && !error && articulos.length === 0 && (
        <div
          className={`text-center py-20 border border-dashed rounded-2xl space-y-3 ${
            darkMode ? "bg-zinc-850/50 border-zinc-800" : "bg-white border-zinc-300 shadow-sm"
          }`}
        >
          <span className="text-5xl">📭</span>
          <h3 className={`text-xl font-bold ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
            No se encontraron artículos
          </h3>
          <p className={darkMode ? "text-zinc-400 text-sm" : "text-zinc-600 text-sm"}>
            No hay productos en esta categoría por el momento.
          </p>
          {categoriaSeleccionada && (
            <button
              onClick={() => setSearchParams({ page: "1" })}
              className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Ver todos los artículos
            </button>
          )}
        </div>
      )}

      {/* 4. Success State */}
      {!loading && !error && articulos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articulos.map((art) => (
              <ArticuloCard key={art.id} articulo={art} />
            ))}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center gap-3 pt-6">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual <= 1}
                className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  darkMode
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                    : "bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-sm"
                }`}
              >
                ← Anterior
              </button>

              <span className={`text-sm font-medium ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Página <strong className={darkMode ? "text-zinc-100" : "text-zinc-900"}>{paginaActual}</strong> de{" "}
                <strong className={darkMode ? "text-zinc-100" : "text-zinc-900"}>{totalPaginas}</strong>
              </span>

              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual >= totalPaginas}
                className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  darkMode
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                    : "bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-sm"
                }`}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
