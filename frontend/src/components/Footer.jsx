import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export default function Footer() {
  const { darkMode } = useContext(ThemeContext)

  return (
    <footer
      className={`border-t py-6 text-sm text-center mt-12 transition-colors ${
        darkMode ? "bg-zinc-950 border-zinc-800 text-zinc-400" : "bg-white border-zinc-200 text-zinc-600 shadow-inner"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>
          <strong className={darkMode ? "text-zinc-200" : "text-zinc-800"}>Librería Kuky</strong> — Sistema de Gestión
        </p>
        <p>
          Desarrollado por <span className="text-teal-500 font-semibold">Gustavo Brito</span> y{" "}
          <span className="text-teal-500 font-semibold">Soledad Tesando</span> - EFI 2026
        </p>
      </div>
    </footer>
  )
}
