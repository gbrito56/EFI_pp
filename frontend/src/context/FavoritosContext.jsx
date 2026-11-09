import { createContext, useState, useEffect } from "react"

export const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem("kuky_favoritos")
      const parsed = guardados ? JSON.parse(guardados) : []
      // Garantizar que todos los favoritos tengan la propiedad cantidad >= 1
      return parsed.map((item) => ({
        ...item,
        cantidad: item.cantidad && item.cantidad > 0 ? item.cantidad : 1,
      }))
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
        return [...prev, { ...articulo, cantidad: 1 }]
      }
    })
  }

  const actualizarCantidad = (id, delta) => {
    setFavoritos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nuevaCantidad = (item.cantidad || 1) + delta
          return { ...item, cantidad: Math.max(1, nuevaCantidad) }
        }
        return item
      })
    )
  }

  const esFavorito = (id) => favoritos.some((item) => item.id === id)

  const limpiarFavoritos = () => setFavoritos([])

  return (
    <FavoritosContext.Provider
      value={{ favoritos, toggleFavorito, esFavorito, limpiarFavoritos, actualizarCantidad }}
    >
      {children}
    </FavoritosContext.Provider>
  )
}
