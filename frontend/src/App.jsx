import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Utiles from "./pages/Utiles"
import UtilesDetail from "./pages/UtilesDetail"
import ArticuloDescription from "./components/ArticuloDescription"
import ArticuloReviews from "./components/ArticuloReviews"
import Favoritos from "./pages/Favoritos"
import Admin from "./pages/Admin"
import { FavoritosProvider } from "./context/FavoritosContext"
import { ThemeProvider, ThemeContext } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"

function AppContent() {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        darkMode
          ? "bg-zinc-900 text-zinc-100 selection:bg-teal-500 selection:text-black"
          : "bg-zinc-100 text-zinc-900 selection:bg-teal-600 selection:text-white"
      }`}
    >
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Rutas Base */}
          <Route path="/" element={<Home />} />
          <Route path="/utiles" element={<Utiles />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/admin" element={<Admin />} />

          {/* Ruta Dinámica con Subrutas Anidadas (<Outlet />) */}
          <Route path="/utiles/:id" element={<UtilesDetail />}>
            <Route index element={<ArticuloDescription />} />
            <Route path="reviews" element={<ArticuloReviews />} />
          </Route>

          {/* Ruta 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="text-center py-24 space-y-4">
                <span className="text-6xl">🔍</span>
                <h1 className="text-4xl font-black">404 - Página no encontrada</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                  La ruta que buscas no existe en Librería Kuky.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritosProvider>
          <AppContent />
        </FavoritosProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
