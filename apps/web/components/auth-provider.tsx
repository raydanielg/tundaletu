"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type AuthUser = {
  id: string
  username: string
  nickname: string
  realName?: string
  phone?: string
  gender?: string
  level?: string
  hasPaid?: boolean
  daysLeft?: number
  role?: string
  avatar?: string
  region?: string
  joinedDate?: string
}

type AuthContextType = {
  user: AuthUser | null
  loading: boolean
  login: (username: string, nickname?: string, extra?: Partial<AuthUser>) => void
  updateUser: (updates: Partial<AuthUser>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  updateUser: () => {},
  logout: () => {},
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

  const login = (username: string, nickname?: string, extra?: Partial<AuthUser>) => {
    const userData: AuthUser = {
      id: extra?.id || "local_" + Date.now(),
      username,
      nickname: nickname ?? username,
      realName: extra?.realName,
      phone: extra?.phone,
      gender: extra?.gender || localStorage.getItem("tunda_gender") || undefined,
      level: extra?.level || "Bronze",
      hasPaid: extra?.hasPaid || false,
      daysLeft: extra?.daysLeft || 0,
      role: extra?.role || "user",
      avatar: extra?.avatar || `https://i.pravatar.cc/150?u=${username}`,
      region: extra?.region || "Dar es Salaam",
      joinedDate: extra?.joinedDate || new Date().toLocaleDateString("sw-TZ"),
    }
    localStorage.setItem("tunda_user", JSON.stringify(userData))
    setUser(userData)
  }

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      localStorage.setItem("tunda_user", JSON.stringify(updated))
      return updated
    })
  }

  const logout = () => {
    localStorage.removeItem("tunda_user")
    localStorage.removeItem("tunda_token")
    localStorage.removeItem("tunda_payment")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
