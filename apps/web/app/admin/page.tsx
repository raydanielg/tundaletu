"use client"

import { useState, useEffect } from "react"
import {
  IconApple,
  IconUsers,
  IconCreditCard,
  IconChartBar,
  IconSettings,
  IconCheck,
  IconX,
  IconClock,
  IconSearch,
  IconCrown,
  IconTrash,
  IconEye,
  IconBan,
  IconWallet,
  IconTrendingUp,
  IconUserPlus,
  IconReceipt,
  IconShieldCheck,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"

type AdminUser = {
  id: number
  username: string
  nickname: string
  gender: "male" | "female"
  level: string
  status: "active" | "expired" | "banned"
  paid: boolean
  amount: number
  phone: string
  joinedDate: string
  daysLeft: number
}

type PaymentRecord = {
  id: number
  username: string
  level: string
  amount: number
  method: string
  date: string
  status: "completed" | "pending" | "failed"
}

const mockUsers: AdminUser[] = [
  { id: 1, username: "amminey01", nickname: "Amminey", gender: "male", level: "Gold", status: "active", paid: true, amount: 30000, phone: "+255 712 345 678", joinedDate: "10 Aug 2026", daysLeft: 18 },
  { id: 2, username: "johari22", nickname: "Johari", gender: "male", level: "Silver", status: "active", paid: true, amount: 18000, phone: "+255 723 456 789", joinedDate: "12 Aug 2026", daysLeft: 7 },
  { id: 3, username: "neema88", nickname: "Neema", gender: "female", level: "Platinum", status: "active", paid: true, amount: 45000, phone: "+255 745 678 901", joinedDate: "5 Aug 2026", daysLeft: 22 },
  { id: 4, username: "zawadi33", nickname: "Zawadi", gender: "female", level: "Bronze", status: "expired", paid: false, amount: 0, phone: "+255 756 789 012", joinedDate: "1 Aug 2026", daysLeft: 0 },
  { id: 5, username: "babu77", nickname: "Babu", gender: "male", level: "Diamond", status: "active", paid: true, amount: 75000, phone: "+255 789 012 345", joinedDate: "15 Aug 2026", daysLeft: 25 },
  { id: 6, username: "halima14", nickname: "Halima", gender: "female", level: "Gold", status: "active", paid: true, amount: 30000, phone: "+255 734 567 890", joinedDate: "8 Aug 2026", daysLeft: 12 },
  { id: 7, username: "simba12", nickname: "Simba", gender: "male", level: "Bronze", status: "expired", paid: false, amount: 0, phone: "+255 767 890 123", joinedDate: "3 Aug 2026", daysLeft: 0 },
  { id: 8, username: "rehema55", nickname: "Rehema", gender: "female", level: "Silver", status: "banned", paid: false, amount: 0, phone: "+255 778 901 234", joinedDate: "20 Aug 2026", daysLeft: 0 },
  { id: 9, username: "juma99", nickname: "Juma", gender: "male", level: "Silver", status: "active", paid: true, amount: 5000, phone: "+255 789 012 456", joinedDate: "18 Aug 2026", daysLeft: 5 },
  { id: 10, username: "fatuma23", nickname: "Fatuma", gender: "female", level: "Platinum", status: "active", paid: true, amount: 12000, phone: "+255 712 345 999", joinedDate: "22 Aug 2026", daysLeft: 6 },
]

const mockPayments: PaymentRecord[] = [
  { id: 1, username: "amminey01", level: "Gold", amount: 30000, method: "M-Pesa", date: "22 Aug 2026", status: "completed" },
  { id: 2, username: "neema88", level: "Platinum", amount: 45000, method: "Tigo Pesa", date: "21 Aug 2026", status: "completed" },
  { id: 3, username: "babu77", level: "Diamond", amount: 75000, method: "Airtel Money", date: "20 Aug 2026", status: "completed" },
  { id: 4, username: "juma99", level: "Silver", amount: 5000, method: "M-Pesa", date: "19 Aug 2026", status: "pending" },
  { id: 5, username: "halima14", level: "Gold", amount: 30000, method: "Card", date: "18 Aug 2026", status: "completed" },
  { id: 6, username: "fatuma23", level: "Platinum", amount: 12000, method: "M-Pesa", date: "22 Aug 2026", status: "pending" },
]

const levelColors: Record<string, string> = {
  Bronze: "bg-amber-500/10 text-amber-600",
  Silver: "bg-slate-400/10 text-slate-500",
  Gold: "bg-yellow-500/10 text-yellow-600",
  Platinum: "bg-cyan-400/10 text-cyan-600",
  Diamond: "bg-purple-500/10 text-purple-600",
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-600",
  expired: "bg-orange-500/10 text-orange-600",
  banned: "bg-red-500/10 text-red-600",
}

const formatTsh = (amount: number) => `${amount.toLocaleString("sw-TZ")} TSh`

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [tab, setTab] = useState<"overview" | "users" | "payments" | "settings">("overview")
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState(mockUsers)
  const [payments, setPayments] = useState(mockPayments)

  const totalRevenue = payments.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0)
  const activeUsers = users.filter(u => u.status === "active").length
  const expiredUsers = users.filter(u => u.status === "expired").length
  const bannedUsers = users.filter(u => u.status === "banned").length
  const pendingPayments = payments.filter(p => p.status === "pending").length

  const filteredUsers = users.filter(u =>
    u.username.includes(search.toLowerCase()) ||
    u.nickname.toLowerCase().includes(search.toLowerCase())
  )

  const toggleBan = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u))
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const approvePayment = (id: number) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: "completed" } : p))
  }

  const rejectPayment = (id: number) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: "failed" } : p))
  }

  if (!authed) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <IconShieldCheck className="size-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="mt-2 text-sm text-muted-foreground">Ingia password ya admin ili kuendelea</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (pass === "admin123") setAuthed(true) }}>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password ya admin"
              className="mb-3 w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <Button type="submit" className="w-full">Ingia</Button>
          </form>
          {pass && pass !== "admin123" && (
            <p className="mt-3 text-center text-xs text-destructive">Password sio sahihi. Jaribu tena.</p>
          )}
          <p className="mt-4 text-center text-xs text-muted-foreground">Demo password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconApple className="size-4" />
          </div>
          <span className="text-lg font-bold">Tunda Admin</span>
        </div>
        <Button size="sm" variant="ghost" onClick={() => setAuthed(false)}>Toka</Button>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {[
            { key: "overview", label: "Muhtasari", icon: IconChartBar },
            { key: "users", label: "Watumiaji", icon: IconUsers },
            { key: "payments", label: "Malipo", icon: IconCreditCard },
            { key: "settings", label: "Mipangilio", icon: IconSettings },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md py-2 text-sm font-medium transition-colors",
                tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-green-500/10">
                  <IconWallet className="size-5 text-green-500" />
                </div>
                <p className="text-xl font-bold">{formatTsh(totalRevenue)}</p>
                <p className="text-xs text-muted-foreground">Mapato ya jumla</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-blue-500/10">
                  <IconUsers className="size-5 text-blue-500" />
                </div>
                <p className="text-xl font-bold">{users.length}</p>
                <p className="text-xs text-muted-foreground">Watumiaji wote</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-purple-500/10">
                  <IconUserPlus className="size-5 text-purple-500" />
                </div>
                <p className="text-xl font-bold">{activeUsers}</p>
                <p className="text-xs text-muted-foreground">Walipo active</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-orange-500/10">
                  <IconClock className="size-5 text-orange-500" />
                </div>
                <p className="text-xl font-bold">{pendingPayments}</p>
                <p className="text-xs text-muted-foreground">Malipo yangojeo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">Walipo Active</span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-green-500/10">
                    <IconCheck className="size-4 text-green-500" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${(activeUsers / users.length) * 100}%` }} />
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">Muda Umeisha</span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-orange-500/10">
                    <IconClock className="size-4 text-orange-500" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{expiredUsers}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${(expiredUsers / users.length) * 100}%` }} />
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold">Walipo Banned</span>
                  <span className="flex size-8 items-center justify-center rounded-full bg-red-500/10">
                    <IconBan className="size-4 text-red-500" />
                  </span>
                </div>
                <p className="text-2xl font-bold text-red-600">{bannedUsers}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${(bannedUsers / users.length) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="rounded-xl border bg-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <IconReceipt className="size-5 text-primary" />
                <h2 className="text-sm font-bold">Malipo ya Karibuni</h2>
              </div>
              <div className="space-y-2">
                {payments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <IconCreditCard className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">@{p.username} - {p.level}</p>
                      <p className="text-xs text-muted-foreground">{p.method} - {p.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold">{formatTsh(p.amount)}</p>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        p.status === "completed" && "bg-green-500/10 text-green-600",
                        p.status === "pending" && "bg-orange-500/10 text-orange-600",
                        p.status === "failed" && "bg-red-500/10 text-red-600",
                      )}>
                        {p.status === "completed" ? "Imekamilika" : p.status === "pending" ? "Inangojea" : "Imeshindwa"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Distribution */}
            <div className="rounded-xl border bg-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <IconTrendingUp className="size-5 text-primary" />
                <h2 className="text-sm font-bold">Mtawanyiko wa Levels</h2>
              </div>
              <div className="space-y-2">
                {["Bronze", "Silver", "Gold", "Platinum", "Diamond"].map((lvl) => {
                  const count = users.filter(u => u.level === lvl).length
                  const lvlColor: string = levelColors[lvl] ?? "bg-primary/10 text-primary"
                  return (
                    <div key={lvl} className="flex items-center gap-3">
                      <span className={cn("flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold shrink-0 w-24", lvlColor)}>
                        <IconCrown className="size-3" />
                        {lvl}
                      </span>
                      <div className="flex-1 h-6 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn("h-full rounded-full", (lvlColor.split(" ")[0] ?? "bg-primary").replace("/10", ""))}
                          style={{ width: `${(count / users.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold shrink-0 w-8 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tafuta mtumiaji..."
                className="w-full rounded-lg bg-background border py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              {filteredUsers.map((u) => (
                <div key={u.id} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback className={u.gender === "male" ? "bg-blue-500/10 text-blue-600" : "bg-pink-500/10 text-pink-600"}>
                        {u.nickname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold">{u.nickname}</p>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", levelColors[u.level])}>
                          {u.level}
                        </span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", statusColors[u.status])}>
                          {u.status === "active" ? "Active" : u.status === "expired" ? "Muda Umeisha" : "Banned"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">@{u.username} - {u.gender === "male" ? "Mwanaume" : "Mwanamke"}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconClock className="size-3" />
                          {u.daysLeft > 0 ? `${u.daysLeft} siku` : "Muda umekwisha"}
                        </span>
                        <span>{u.joinedDate}</span>
                        {u.paid && <span className="text-green-600 font-medium">Limefanya malipo</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={u.status === "banned" ? "text-green-600" : "text-red-600"}
                        onClick={() => toggleBan(u.id)}
                      >
                        {u.status === "banned" ? <IconCheck className="size-4" /> : <IconBan className="size-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => deleteUser(u.id)}
                      >
                        <IconTrash className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments */}
        {tab === "payments" && (
          <div className="space-y-4">
            {pendingPayments > 0 && (
              <div className="rounded-xl border-2 border-orange-500/30 bg-orange-500/5 p-4">
                <div className="flex items-center gap-2">
                  <IconClock className="size-5 text-orange-500" />
                  <p className="text-sm font-bold text-orange-600">{pendingPayments} malipo yangojeo kuidhinishwa</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {payments.map((p) => (
                <div key={p.id} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <IconCreditCard className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold">@{p.username}</p>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", levelColors[p.level])}>
                          {p.level}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{p.method} - {p.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold">{formatTsh(p.amount)}</p>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        p.status === "completed" && "bg-green-500/10 text-green-600",
                        p.status === "pending" && "bg-orange-500/10 text-orange-600",
                        p.status === "failed" && "bg-red-500/10 text-red-600",
                      )}>
                        {p.status === "completed" ? "Imekamilika" : p.status === "pending" ? "Inangojea" : "Imeshindwa"}
                      </span>
                    </div>
                    {p.status === "pending" && (
                      <div className="flex shrink-0 gap-1">
                        <Button size="sm" variant="ghost" className="text-green-600" onClick={() => approvePayment(p.id)}>
                          <IconCheck className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => rejectPayment(p.id)}>
                          <IconX className="size-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-sm font-bold">Bei za Levels</h2>
              <div className="space-y-3">
                {[
                  { name: "Bronze", weekly: 3000, monthly: 10000 },
                  { name: "Silver", weekly: 5000, monthly: 18000 },
                  { name: "Gold", weekly: 8000, monthly: 30000 },
                  { name: "Platinum", weekly: 12000, monthly: 45000 },
                  { name: "Diamond", weekly: 20000, monthly: 75000 },
                ].map((lvl) => (
                  <div key={lvl.name} className="flex items-center gap-3 rounded-lg border p-3">
                    <span className={cn("flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold w-24", levelColors[lvl.name])}>
                      <IconCrown className="size-3" />
                      {lvl.name}
                    </span>
                    <div className="flex-1 flex items-center gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Wiki</label>
                        <input
                          type="number"
                          defaultValue={lvl.weekly}
                          className="ml-2 w-24 rounded border bg-background px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Mwezi</label>
                        <input
                          type="number"
                          defaultValue={lvl.monthly}
                          className="ml-2 w-24 rounded border bg-background px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full">Hifadhi Mabadiliko</Button>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-sm font-bold">Njia za Malipo Zilizowashwa</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {["M-Pesa", "Tigo Pesa", "Airtel Money", "Halopesa", "Card", "Bank"].map((m) => (
                  <div key={m} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{m}</span>
                    <div className="flex size-6 items-center justify-center rounded-full bg-green-500/10">
                      <IconCheck className="size-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-sm font-bold">Mipangilio ya Jumla</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Mujiuko wa kujaribu (Trial)</p>
                    <p className="text-xs text-muted-foreground">Watumiaji wapya wapate siku 3 za trial</p>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-full bg-green-500/10">
                    <IconCheck className="size-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Lazima ulipie kuona namba</p>
                    <p className="text-xs text-muted-foreground">Namba ya simu inaonekana baada ya kulipia tu</p>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-full bg-green-500/10">
                    <IconCheck className="size-4 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Lazima ulipie kufungua chat</p>
                    <p className="text-xs text-muted-foreground">Chat inafunguka baada ya kulipia tu</p>
                  </div>
                  <div className="flex size-6 items-center justify-center rounded-full bg-green-500/10">
                    <IconCheck className="size-4 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
