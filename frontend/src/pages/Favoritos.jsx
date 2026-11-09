import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import { ThemeContext } from "../context/ThemeContext"

export default function Favoritos() {
  const { favoritos, limpiarFavoritos, toggleFavorito, actualizarCantidad } =
    useContext(FavoritosContext)
  const { darkMode } = useContext(ThemeContext)

  // Calcular precio total y unidades totales usando el multiplicador de cantidad
  const totalPrecio = favoritos.reduce(
    (acc, item) => acc + item.precio * (item.cantidad || 1),
    0
  )
  const totalUnidades = favoritos.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Encabezado y resumen del presupuesto */}
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
            Presupuesto y lista de útiles escolares para el ciclo lectivo
          </p>
        </div>

        {favoritos.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            <div
              className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition-colors ${
                darkMode
                  ? "bg-zinc-850 border-zinc-700/60"
                  : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <span className={`text-xs uppercase font-semibold ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                {totalUnidades} {totalUnidades === 1 ? "útil" : "útiles"}
              </span>
              <span className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-300"}`}>|</span>
              <span className={`text-sm font-medium ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Total:{" "}
                <strong className="text-teal-600 dark:text-teal-400 text-lg">
                  ${totalPrecio.toLocaleString("es-AR")}
                </strong>
              </span>
            </div>

            <button
              onClick={limpiarFavoritos}
              className="px-3 py-2 bg-red-950/60 text-red-400 border border-red-800/80 rounded-xl text-xs font-semibold hover:bg-red-900 hover:text-white transition-colors"
            >
              Vaciar lista
            </button>
          </div>
        )}
      </div>

      {/* Lista vacía */}
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
            Explorá el catálogo escolar y hacé click en el corazón para armar tu lista de útiles y calcular tu presupuesto.
          </p>
          <Link
            to="/utiles"
            className="inline-block mt-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl text-white font-semibold transition-colors shadow-sm"
          >
            Ir al Catálogo 🎒
          </Link>
        </div>
      ) : (
        /* Grilla de tarjetas con selector de cantidad */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((art) => {
            const cantidad = art.cantidad || 1
            const subtotal = art.precio * cantidad

            return (
              <div
                key={art.id}
                className={`border rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl ${
                  darkMode
                    ? "bg-zinc-800 border-zinc-700/60 hover:border-teal-500/60 shadow-md"
                    : "bg-white border-zinc-200 hover:border-teal-500 shadow-sm"
                }`}
              >
                {/* Imagen del producto con botón para quitar */}
                <div className="relative">
                  <img
                    src={
                      art.imagen_url ||
                      "https://images.unsplash.com/photo-1585336261026-6218d6a89c93?w=500&auto=format&fit=crop&q=60"
                    }
                    alt={art.nombre}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleFavorito(art)}
                    className="absolute top-2 right-2 p-2 rounded-full backdrop-blur-md bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-sm"
                    title="Quitar de la lista"
                  >
                    ❤️
                  </button>

                  <span
                    className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded font-semibold ${
                      art.stock > 0
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                        : "bg-red-950/80 text-red-400 border border-red-800"
                    }`}
                  >
                    {art.stock > 0 ? `Stock: ${art.stock}` : "Sin stock"}
                  </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      className={`font-bold text-lg line-clamp-1 transition-colors ${
                        darkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {art.nombre}
                    </h3>
                    <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      Precio unitario: ${art.precio.toLocaleString("es-AR")}
                    </p>
                  </div>

                  {/* Selector de cantidad interactivo */}
                  <div
                    className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
                      darkMode
                        ? "bg-zinc-900/70 border-zinc-700/50"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                      Cantidad
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => actualizarCantidad(art.id, -1)}
                        disabled={cantidad <= 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-base transition-colors ${
                          cantidad <= 1
                            ? "opacity-30 cursor-not-allowed text-zinc-500"
                            : darkMode
                            ? "bg-zinc-800 hover:bg-zinc-700 text-teal-400 border border-zinc-700"
                            : "bg-white hover:bg-zinc-200 text-teal-600 border border-zinc-300 shadow-xs"
                        }`}
                        title="Disminuir cantidad"
                      >
                        −
                      </button>

                      <span
                        className={`w-8 text-center font-bold text-base ${
                          darkMode ? "text-zinc-100" : "text-zinc-900"
                        }`}
                      >
                        {cantidad}
                      </span>

                      <button
                        onClick={() => actualizarCantidad(art.id, 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-base transition-colors ${
                          darkMode
                            ? "bg-zinc-800 hover:bg-zinc-700 text-teal-400 border border-zinc-700"
                            : "bg-white hover:bg-zinc-200 text-teal-600 border border-zinc-300 shadow-xs"
                        }`}
                        title="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal del artículo */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs font-semibold ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      Subtotal:
                    </span>
                    <span className="text-xl font-black text-teal-500">
                      ${subtotal.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {/* Acciones */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      to={`/utiles/${art.id}`}
                      className={`text-center py-2 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                        darkMode
                          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                          : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300"
                      }`}
                    >
                      Ver detalle
                    </Link>

                    <button
                      onClick={() => toggleFavorito(art)}
                      className="text-center py-2 px-3 rounded-lg text-xs font-semibold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900 border border-red-900/60 transition-colors"
                    >
                      Quitar ✕
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
