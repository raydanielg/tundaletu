"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type AuthUser = {
  username: string
  nickname: string
}

type AuthContextType = {
  user: AuthUser | null
  login: (username: string, nickname?: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tunda_user")
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const login = (username: string, nickname?: string) => {
    const userData = { username, nickname: nickname ?? username }
    localStorage.setItem("tunda_user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("tunda_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
