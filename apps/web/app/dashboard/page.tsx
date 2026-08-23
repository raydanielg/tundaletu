"use client"

import { useState, useEffect } from "react"
import {
  IconApple,
  IconUser,
  IconCrown,
  IconCalendar,
  IconClock,
  IconCheck,
  IconCreditCard,
  IconChartBar,
  IconHeart,
  IconEye,
  IconMessage,
  IconStar,
  IconArrowUp,
  IconArrowLeft,
  IconCircleFilled,
  IconReceipt,
  IconWallet,
  IconUsers,
  IconShieldCheck,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { useAuth } from "@/components/auth-provider"
import { usePayment } from "@/components/payment-provider"
import { PaymentModal } from "@/components/payment-modal"

const levels = [
  { name: "Bronze", color: "from-amber-700 to-amber-500", textColor: "text-amber-600", bg: "bg-amber-500/10", price: { weekly: 3000, monthly: 10000 } },
  { name: "Silver", color: "from-slate-400 to-slate-300", textColor: "text-slate-500", bg: "bg-slate-400/10", price: { weekly: 5000, monthly: 18000 } },
  { name: "Gold", color: "from-yellow-500 to-yellow-300", textColor: "text-yellow-600", bg: "bg-yellow-500/10", price: { weekly: 8000, monthly: 30000 } },
  { name: "Platinum", color: "from-cyan-400 to-blue-400", textColor: "text-cyan-600", bg: "bg-cyan-400/10", price: { weekly: 12000, monthly: 45000 } },
  { name: "Diamond", color: "from-purple-500 to-pink-400", textColor: "text-purple-600", bg: "bg-purple-500/10", price: { weekly: 20000, monthly: 75000 } },
]

const formatTsh = (amount: number) => `${amount.toLocaleString("sw-TZ")} TSh`

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const { payment } = usePayment()
  const [showPayment, setShowPayment] = useState(false)
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("weekly")
  const [stats, setStats] = useState({ views: 0, messages: 0, likes: 0 })

  const daysLeft = payment.daysLeft
  const hasPaid = payment.hasPaid

  useEffect(() => {
    const stored = localStorage.getItem("tunda_gender") as "male" | "female" | null
    setGender(stored || (user?.gender as "male" | "female" | null))
    if (user) {
      setStats({
        views: Math.floor(Math.random() * 200) + 50,
        messages: Math.floor(Math.random() * 30) + 5,
        likes: Math.floor(Math.random() * 80) + 10,
      })
      // Set level from payment
      if (payment.level) {
        const lvlIdx = levels.findIndex(l => l.name === payment.level)
        if (lvlIdx >= 0) setCurrentLevel(lvlIdx)
      }
    }
  }, [user, payment.level])

  if (loading) {
    return (
      <div className="flex h-svh items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconUser className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold">Inahitaji Kuingia</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Unahitaji akaunti ya Tunda ili kuona dashboard yako.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <a href="/login" className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              Ingia Akaunti
            </a>
            <a href="/signup" className="flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium">
              Jiunge Sasa
            </a>
          </div>
        </div>
      </div>
    )
  }

  const level = levels[currentLevel]!
  const isExpired = daysLeft <= 0

  return (
    <div className="min-h-svh bg-muted/30">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <a href="/" className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconApple className="size-4" />
          </div>
          <span className="text-lg font-bold">Tunda</span>
        </a>
        <div className="flex items-center gap-2">
          <a href="/chat" className="hidden sm:block">
            <Button size="sm" variant="ghost">
              <IconMessage className="size-4" />
              Chat
            </Button>
          </a>
          <a href="/admin" className="hidden sm:block">
            <Button size="sm" variant="ghost">
              Admin
            </Button>
          </a>
          <Button size="sm" variant="ghost" onClick={() => { logout(); window.location.href = "/" }}>
            <IconArrowLeft className="size-4" />
            Toka
          </Button>
          <Avatar className="size-8">
            <AvatarFallback>{user.nickname?.[0] ?? user.username[0]}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:block">{user.nickname ?? user.username}</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="size-16 shrink-0">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.nickname} />}
              <AvatarFallback className="text-xl font-bold">{user.nickname?.[0] ?? user.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{user.nickname ?? user.username}</h1>
                <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold", level.bg, level.textColor)}>
                  <IconCrown className="size-3" />
                  {level.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {gender === "male" ? "♂ Mwanaume" : gender === "female" ? "♀ Mwanamke" : "Jinsia haijachaguliwa"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className={cn(
          "rounded-2xl border-2 p-5",
          isExpired ? "border-destructive/30 bg-destructive/5" : "border-primary/20 bg-primary/5"
        )}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <IconCalendar className="size-5 text-primary" />
                <h2 className="text-base font-bold">Mujiuko wa Sasa</h2>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={cn("rounded-lg px-3 py-1 text-sm font-bold", level.bg, level.textColor)}>
                  {level.name}
                </span>
                <span className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  isExpired ? "text-destructive" : daysLeft <= 3 ? "text-orange-500" : "text-muted-foreground"
                )}>
                  <IconClock className="size-4" />
                  {isExpired ? "Umekwisha muda!" : `Siku ${daysLeft} zimesalia`}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Muda wa mwisho</p>
              <p className="text-sm font-bold">{new Date(Date.now() + daysLeft * 86400000).toLocaleDateString("sw-TZ")}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r transition-all", level.color)}
                style={{ width: `${Math.min((daysLeft / 30) * 100, 100)}%` }}
              />
            </div>
          </div>

          {isExpired && (
            <div className="mt-4 flex flex-col gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-destructive">
                Mujiuko wako umekwisha. Lipia tena ili kuendelea kuonekana.
              </p>
              <Button size="sm" className="shrink-0" onClick={() => setShowPayment(true)}>
                Lipia Sasa
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-blue-500/10">
              <IconEye className="size-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">{stats.views}</p>
            <p className="text-xs text-muted-foreground">Waliokuona</p>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-pink-500/10">
              <IconHeart className="size-5 text-pink-500" />
            </div>
            <p className="text-2xl font-bold">{stats.likes}</p>
            <p className="text-xs text-muted-foreground">Kupendwa</p>
          </div>
          <div className="rounded-xl border bg-card p-4 text-center">
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-green-500/10">
              <IconMessage className="size-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{stats.messages}</p>
            <p className="text-xs text-muted-foreground">Ujumbe</p>
          </div>
        </div>

        {/* Levels & Payment */}
        <div id="payment" className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <IconCrown className="size-5 text-primary" />
            <h2 className="text-base font-bold">Chagua Level yako</h2>
          </div>

          {/* Billing cycle toggle */}
          <div className="mb-4 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setBillingCycle("weekly")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                billingCycle === "weekly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Kwa Wiki
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
                billingCycle === "monthly" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              Kwa Mwezi
            </button>
          </div>

          <div className="space-y-2">
            {levels.map((lvl, idx) => {
              const isActive = idx === currentLevel
              const isCurrent = idx === currentLevel
              return (
                <div
                  key={lvl.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border-2 p-3 transition-all",
                    isActive ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br", lvl.color)}>
                    <IconCrown className="size-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold">{lvl.name}</p>
                      {isCurrent && (
                        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          <IconCircleFilled className="size-2" />
                          Sasa
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {billingCycle === "weekly" ? "Wiki 7 siku" : "Mwezi 30 siku"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">{formatTsh(lvl.price[billingCycle])}</p>
                    <p className="text-[10px] text-muted-foreground">/{billingCycle === "weekly" ? "wiki" : "mwezi"}</p>
                  </div>
                  {!isCurrent && (
                    <Button
                      size="sm"
                      variant={isActive ? "default" : "outline"}
                      className="shrink-0"
                      onClick={() => { setCurrentLevel(idx); setShowPayment(true) }}
                    >
                      {idx > currentLevel ? (
                        <>
                          <IconArrowUp className="size-3.5" />
                          Pandisha
                        </>
                      ) : (
                        "Chagua"
                      )}
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <IconWallet className="size-5 text-primary" />
            <h2 className="text-base font-bold">Njia za Malipo</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { name: "M-Pesa", color: "bg-green-600" },
              { name: "Tigo Pesa", color: "bg-blue-600" },
              { name: "Airtel Money", color: "bg-red-600" },
              { name: "Halopesa", color: "bg-yellow-500" },
              { name: "Card", color: "bg-slate-700" },
              { name: "Bank", color: "bg-indigo-600" },
            ].map((method) => (
              <button
                key={method.name}
                className="flex items-center gap-2 rounded-xl border p-3 transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className={cn("flex size-8 items-center justify-center rounded-lg", method.color)}>
                  <IconCreditCard className="size-4 text-white" />
                </div>
                <span className="text-xs font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <IconReceipt className="size-5 text-primary" />
            <h2 className="text-base font-bold">Historia ya Malipo</h2>
          </div>
          <div className="space-y-2">
            {[
              { level: "Silver", amount: 18000, date: "15 Aug 2026", status: "Imekamilika" },
              { level: "Silver", amount: 5000, date: "8 Aug 2026", status: "Imekamilika" },
              { level: "Bronze", amount: 10000, date: "1 Aug 2026", status: "Imekamilika" },
            ].map((payment, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <IconCheck className="size-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{payment.level} - {formatTsh(payment.amount)}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-600">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <a href="/chat" className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <IconMessage className="size-5 text-primary" />
            </div>
            <span className="text-xs font-bold">Chat</span>
          </a>
          <a href="/" className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <IconUsers className="size-5 text-primary" />
            </div>
            <span className="text-xs font-bold">Watu</span>
          </a>
          <button onClick={() => setShowPayment(true)} className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <IconWallet className="size-5 text-primary" />
            </div>
            <span className="text-xs font-bold">Lipia</span>
          </button>
          <a href="/admin" className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <IconShieldCheck className="size-5 text-primary" />
            </div>
            <span className="text-xs font-bold">Admin</span>
          </a>
        </div>

        {/* Level Benefits */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <IconStar className="size-5 text-primary" />
            <h2 className="text-base font-bold">Faida za Level yako ({level.name})</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Kuonekana na watu wote",
              "Kutuma ujumbe bila kikomo",
              "Kuweka video 5 kwenye profile",
              "Kuonekana mwenyeki kwenye search",
              "Priority kwenye recommendations",
              "Badge ya level kwenye profile",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                <IconCheck className="size-4 shrink-0 text-green-500" />
                <span className="text-xs font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} reason="Lipia mujiuko wako ili kufungua namba, chat, na kuonekana na watu wote." />
    </div>
  )
}
