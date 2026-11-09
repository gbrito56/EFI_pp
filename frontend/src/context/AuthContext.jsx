import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem("kuky_admin_session") === "true"
    } catch {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem("kuky_admin_session", isAdmin ? "true" : "false")
  }, [isAdmin])

  const loginAdmin = (username, password) => {
    if (username.trim().toLowerCase() === "admin" && password === "admin") {
      setIsAdmin(true)
      return { success: true }
    }
    return { success: false, error: "Credenciales incorrectas. (Usuario: admin, Contraseña: admin)" }
  }

  const logoutAdmin = () => {
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}
