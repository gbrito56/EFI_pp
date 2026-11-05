import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const guardado = localStorage.getItem("kuky_theme")
      return guardado ? guardado === "dark" : true
    } catch {
      return true
    }
  })

  useEffect(() => {
    localStorage.setItem("kuky_theme", darkMode ? "dark" : "light")
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
