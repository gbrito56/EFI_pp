import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { FavoritosContext } from "../context/FavoritosContext"
import { ThemeContext } from "../context/ThemeContext"
import { AuthContext } from "../context/AuthContext"

export default function Navbar() {
  const { favoritos } = useContext(FavoritosContext)
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const { isAdmin } = useContext(AuthContext)

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? "bg-teal-600 text-white"
        : darkMode
        ? "text-zinc-300 hover:text-white hover:bg-zinc-800"
        : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200"
    }`

  return (
    <header
      className={`border-b sticky top-0 z-50 transition-colors ${
        darkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📚</span>
          <div>
            <span
              className={`text-xl font-bold transition-colors ${
                darkMode ? "text-white group-hover:text-teal-400" : "text-zinc-900 group-hover:text-teal-600"
              }`}
            >
              Librería Kuky
            </span>
            <span className="hidden sm:inline-block text-xs text-teal-500 ml-2 font-mono font-semibold">
              v1.0
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/utiles" className={navLinkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/favoritos" className={navLinkClass}>
            Favoritos
            {favoritos.length > 0 && (
              <span className="ml-1.5 px-2 py-0.5 text-xs bg-teal-500 text-black font-bold rounded-full">
                {favoritos.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin {isAdmin && <span className="text-xs text-teal-400 font-mono">●</span>}
          </NavLink>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className={`ml-2 p-2 rounded-lg transition-colors ${
              darkMode ? "hover:bg-zinc-800 text-zinc-300" : "hover:bg-zinc-200 text-zinc-700"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  )
}
