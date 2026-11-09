import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import { ThemeContext } from "../context/ThemeContext"

export default function ArticuloCard({ articulo }) {
  const { toggleFavorito, esFavorito } = useContext(FavoritosContext)
  const { darkMode } = useContext(ThemeContext)
  const fav = esFavorito(articulo.id)

  return (
    <div
      className={`border rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl group ${
        darkMode
          ? "bg-zinc-800 border-zinc-700/60 hover:border-teal-500/60 hover:shadow-teal-950/30"
          : "bg-white border-zinc-200 hover:border-teal-500 shadow-sm"
      }`}
    >
      <div className="relative">
        <img
          src={articulo.imagen_url || "https://images.unsplash.com/photo-1585336261026-6218d6a89c93?w=500&auto=format&fit=crop&q=60"}
          alt={articulo.nombre}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          onClick={() => toggleFavorito(articulo)}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-colors ${
            fav
              ? "bg-red-500/80 text-white"
              : "bg-zinc-900/60 text-zinc-300 hover:text-red-400"
          }`}
          title={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          {fav ? "❤️" : "🤍"}
        </button>

        <span
          className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded font-semibold ${
            articulo.stock > 0
              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
              : "bg-red-950/80 text-red-400 border border-red-800"
          }`}
        >
          {articulo.stock > 0 ? `Stock: ${articulo.stock}` : "Sin stock"}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className={`font-bold text-lg line-clamp-1 transition-colors ${
              darkMode ? "text-zinc-100 group-hover:text-teal-400" : "text-zinc-900 group-hover:text-teal-600"
            }`}
          >
            {articulo.nombre}
          </h3>
          <p className="text-2xl font-extrabold text-teal-500 mt-2">
            ${articulo.precio.toLocaleString("es-AR")}
          </p>
        </div>

        <Link
          to={`/utiles/${articulo.id}`}
          className="mt-4 block text-center py-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium transition-colors"
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  )
}
