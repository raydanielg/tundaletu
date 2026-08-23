const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("tunda_token")
}

interface RequestOptions {
  method?: string
  body?: string
  headers?: Record<string, string>
}

async function request(path: string, options: RequestOptions = {}): Promise<any> {
  const token = getToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Kosa la server")
    }
    return data
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Failed to fetch") {
      throw new Error("Server haipatikani. Jaribu tena baadaye.")
    }
    throw err
  }
}

export const api = {
  auth: {
    signup: (body: Record<string, string>) => request("/auth/signup", { method: "POST", body: JSON.stringify(body) }),
    login: (body: Record<string, string>) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    me: () => request("/auth/me"),
  },
  users: {
    list: (params = "") => request(`/users${params ? `?${params}` : ""}`),
    getByLevel: (level: string, params = "") => request(`/users/levels/${level}${params ? `?${params}` : ""}`),
    getById: (id: string) => request(`/users/${id}`),
    like: (id: string) => request(`/users/${id}/like`, { method: "POST" }),
    updateProfile: (body: Record<string, string>) => request("/users/profile", { method: "PUT", body: JSON.stringify(body) }),
  },
  payments: {
    create: (body: Record<string, string>) => request("/payments/create", { method: "POST", body: JSON.stringify(body) }),
    status: () => request("/payments/status"),
    history: () => request("/payments/history"),
  },
  messages: {
    list: () => request("/messages"),
    getByUser: (userId: string) => request(`/messages/${userId}`),
    send: (body: Record<string, string>) => request("/messages", { method: "POST", body: JSON.stringify(body) }),
  },
  admin: {
    stats: () => request("/admin/stats"),
    users: (params = "") => request(`/admin/users${params ? `?${params}` : ""}`),
    banUser: (id: string) => request(`/admin/users/${id}/ban`, { method: "POST" }),
    unbanUser: (id: string) => request(`/admin/users/${id}/unban`, { method: "POST" }),
    deleteUser: (id: string) => request(`/admin/users/${id}`, { method: "DELETE" }),
    payments: (params = "") => request(`/admin/payments${params ? `?${params}` : ""}`),
    approvePayment: (id: string) => request(`/admin/payments/${id}/approve`, { method: "POST" }),
    rejectPayment: (id: string) => request(`/admin/payments/${id}/reject`, { method: "POST" }),
  },
}
