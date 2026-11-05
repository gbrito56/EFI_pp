import { createContext, useState, useEffect } from "react"

export const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem("kuky_favoritos")
      return guardados ? JSON.parse(guardados) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("kuky_favoritos", JSON.stringify(favoritos))
    } catch (e) {
      console.error("Error al guardar favoritos", e)
    }
  }, [favoritos])

  const toggleFavorito = (articulo) => {
    setFavoritos((prev) => {
      const yaExiste = prev.some((item) => item.id === articulo.id)
      if (yaExiste) {
        return prev.filter((item) => item.id !== articulo.id)
      } else {
        return [...prev, articulo]
      }
    })
  }

  const esFavorito = (id) => favoritos.some((item) => item.id === id)

  const limpiarFavoritos = () => setFavoritos([])

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito, limpiarFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  )
}
