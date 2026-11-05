import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import { ThemeContext } from "../context/ThemeContext"
import ArticuloCard from "../components/ArticuloCard"

export default function Favoritos() {
  const { favoritos, limpiarFavoritos } = useContext(FavoritosContext)
  const { darkMode } = useContext(ThemeContext)

  const totalPrecio = favoritos.reduce((acc, item) => acc + item.precio, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
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
            Mi Lista de Favoritos
          </h1>
          <p
            className={`text-sm mt-1 transition-colors ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Artículos guardados para el ciclo escolar
          </p>
        </div>

        {favoritos.length > 0 && (
          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-medium transition-colors ${
                darkMode ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Total estimado:{" "}
              <strong className="text-teal-600 dark:text-teal-400 text-lg">
                ${totalPrecio.toLocaleString("es-AR")}
              </strong>
            </span>
            <button
              onClick={limpiarFavoritos}
              className="px-3 py-1.5 bg-red-950 text-red-400 border border-red-800 rounded-lg text-xs font-semibold hover:bg-red-900 transition-colors"
            >
              Vaciar lista
            </button>
          </div>
        )}
      </div>

      {favoritos.length === 0 ? (
        <div
          className={`text-center py-20 border border-dashed rounded-2xl space-y-4 ${
            darkMode ? "bg-zinc-850/50 border-zinc-800" : "bg-white border-zinc-300 shadow-sm"
          }`}
        >
          <span className="text-6xl">🤍</span>
          <h3 className={`text-2xl font-bold ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
            No tenés artículos guardados
          </h3>
          <p className={`text-sm max-w-sm mx-auto ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Explorá el catálogo escolar y hacé click en el corazón para armar tu lista de útiles.
          </p>
          <Link
            to="/utiles"
            className="inline-block mt-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-white font-semibold transition-colors shadow-sm"
          >
            Ir al Catálogo 🎒
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((art) => (
            <ArticuloCard key={art.id} articulo={art} />
          ))}
        </div>
      )}
    </div>
  )
}
