import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../context/ThemeContext"

export default function Home() {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-4">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          Librería <span className="text-teal-500">Kuky</span>
        </h1>
        <p className={`text-lg sm:text-xl leading-relaxed ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
          Sistema de gestión de catálogo, inventario de útiles escolares, marcas oficiales y control de stock en tiempo real.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/utiles"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-950/30 hover:scale-105"
          >
            Explorar Catálogo
          </Link>
          <Link
            to="/admin"
            className={`px-6 py-3 font-semibold rounded-xl border transition-colors ${
              darkMode
                ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                : "bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-sm"
            }`}
          >
            Panel de Gestión
          </Link>
        </div>
      </section>

      {/* Características del Negocio */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-2xl border space-y-3 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-800"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <h3 className="text-xl font-bold">Catálogo Completo</h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Escritura, papelería, arte y organización. Todo lo que necesitas en nuestro negocio.
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl border space-y-3 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-800"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <h3 className="text-xl font-bold">Lista de Favoritos</h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Guardá tu lista escolar para revisar en cualquier momento lo que necesites.
          </p>
        </div>

        <div
          className={`p-6 rounded-2xl border space-y-3 transition-colors ${
            darkMode
              ? "bg-zinc-850 border-zinc-800"
              : "bg-white border-zinc-200 shadow-sm"
          }`}
        >
          <h3 className="text-xl font-bold">Atención y Consultas</h3>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            ¿Tenés dudas sobre stock o presupuestos escolares? Escribinos a{" "}
            <a
              href="mailto:libreriakuky@gmail.com"
              className="text-teal-500 font-semibold hover:underline break-all"
            >
              libreriakuky@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
