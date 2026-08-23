"use client"

import { useState } from "react"
import {
  IconX,
  IconCreditCard,
  IconCheck,
  IconCrown,
  IconLock,
  IconWallet,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { usePayment } from "@/components/payment-provider"
import { api } from "@/lib/api"

const levels = [
  { name: "Bronze", color: "from-amber-700 to-amber-500", bg: "bg-amber-500/10", text: "text-amber-600", weekly: 3000, monthly: 10000, days: 7 },
  { name: "Silver", color: "from-slate-400 to-slate-300", bg: "bg-slate-400/10", text: "text-slate-500", weekly: 5000, monthly: 18000, days: 7 },
  { name: "Gold", color: "from-yellow-500 to-yellow-300", bg: "bg-yellow-500/10", text: "text-yellow-600", weekly: 8000, monthly: 30000, days: 7 },
  { name: "Platinum", color: "from-cyan-400 to-blue-400", bg: "bg-cyan-400/10", text: "text-cyan-600", weekly: 12000, monthly: 45000, days: 7 },
  { name: "Diamond", color: "from-purple-500 to-pink-400", bg: "bg-purple-500/10", text: "text-purple-600", weekly: 20000, monthly: 75000, days: 7 },
]

const paymentMethods = [
  { name: "M-Pesa", color: "bg-green-600", number: "15000" },
  { name: "Tigo Pesa", color: "bg-blue-600", number: "15000" },
  { name: "Airtel Money", color: "bg-red-600", number: "15000" },
  { name: "Halopesa", color: "bg-yellow-500", number: "15000" },
]

const formatTsh = (amount: number) => `${amount.toLocaleString("sw-TZ")} TSh`

type PaymentModalProps = {
  open: boolean
  onClose: () => void
  reason?: string
}

export function PaymentModal({ open, onClose, reason }: PaymentModalProps) {
  const { makePayment } = usePayment()
  const [step, setStep] = useState<"levels" | "methods" | "processing" | "success">("levels")
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [billing, setBilling] = useState<"weekly" | "monthly">("weekly")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  if (!open) return null

  const level = levels[selectedLevel]!
  const amount = billing === "weekly" ? level.weekly : level.monthly
  const days = billing === "weekly" ? 7 : 30

  const handlePay = () => {
    if (!selectedMethod) return
    setStep("processing")
    setTimeout(() => {
      makePayment(level.name, days)
      setStep("success")
    }, 2000)
  }

  const handleClose = () => {
    setStep("levels")
    setSelectedMethod(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-background shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-background px-5 py-3 z-10">
          <div className="flex items-center gap-2">
            <IconWallet className="size-5 text-primary" />
            <h2 className="text-base font-bold">Lipia Mujiuko</h2>
          </div>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
            <IconX className="size-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Step indicator */}
          {(step === "levels" || step === "methods") && (
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className={cn("size-2 rounded-full transition-colors", step === "levels" ? "bg-primary" : "bg-primary/40")} />
              <div className={cn("h-0.5 w-8 transition-colors", step === "methods" ? "bg-primary" : "bg-muted")} />
              <div className={cn("size-2 rounded-full transition-colors", step === "methods" ? "bg-primary" : "bg-muted")} />
            </div>
          )}

          {/* Reason */}
          {reason && step === "levels" && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-primary/10 px-3 py-3">
              <IconLock className="size-4 shrink-0 text-primary mt-0.5" />
              <p className="text-xs font-medium text-primary leading-relaxed">{reason}</p>
            </div>
          )}

          {/* Step: Levels */}
          {step === "levels" && (
            <>
              <div className="mb-4 flex rounded-lg bg-muted p-1">
                <button
                  onClick={() => setBilling("weekly")}
                  className={cn("flex-1 rounded-md py-2 text-sm font-medium transition-colors", billing === "weekly" ? "bg-background shadow-sm" : "text-muted-foreground")}
                >
                  Kwa Wiki
                </button>
                <button
                  onClick={() => setBilling("monthly")}
                  className={cn("flex-1 rounded-md py-2 text-sm font-medium transition-colors", billing === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground")}
                >
                  Kwa Mwezi
                </button>
              </div>

              <div className="space-y-2">
                {levels.map((lvl, idx) => (
                  <button
                    key={lvl.name}
                    onClick={() => setSelectedLevel(idx)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all",
                      selectedLevel === idx ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br", lvl.color)}>
                      <IconCrown className="size-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold">{lvl.name}</p>
                      <p className="text-xs text-muted-foreground">{billing === "weekly" ? "Siku 7" : "Siku 30"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatTsh(billing === "weekly" ? lvl.weekly : lvl.monthly)}</p>
                      <p className="text-[10px] text-muted-foreground">/{billing === "weekly" ? "wiki" : "mwezi"}</p>
                    </div>
                  </button>
                ))}
              </div>

              <Button className="mt-4 w-full" onClick={() => setStep("methods")}>
                Endelea - {formatTsh(amount)}
              </Button>
            </>
          )}

          {/* Step: Methods */}
          {step === "methods" && (
            <>
              <div className="mb-4 rounded-lg bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <div className={cn("flex size-8 items-center justify-center rounded-full bg-gradient-to-br", level.color)}>
                      <IconCrown className="size-4 text-white" />
                    </div>
                    <span className="text-sm font-bold">{level.name}</span>
                  </span>
                  <span className="text-sm font-bold">{formatTsh(amount)}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{billing === "weekly" ? "Siku 7" : "Siku 30"} za mujiuko</p>
              </div>

              <h3 className="mb-3 text-sm font-bold">Chagua njia ya malipo</h3>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMethod(m.name)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border-2 p-3 transition-all",
                      selectedMethod === m.name ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className={cn("flex size-8 items-center justify-center rounded-lg", m.color)}>
                      <IconCreditCard className="size-4 text-white" />
                    </div>
                    <span className="text-xs font-medium">{m.name}</span>
                  </button>
                ))}
              </div>

              {selectedMethod && (
                <div className="mt-4 rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground mb-1">Tuma pesa kwenye namba hii:</p>
                  <p className="text-lg font-bold tracking-wider">*150*00#</p>
                  <p className="text-xs text-muted-foreground mt-1">Business: TUNDA - {selectedMethod}</p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("levels")}>
                  &larr; Rudi
                </Button>
                <Button className="flex-1" disabled={!selectedMethod} onClick={handlePay}>
                  Lipa {formatTsh(amount)}
                </Button>
              </div>
            </>
          )}

          {/* Step: Processing */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-12">
              <div className="size-12 animate-spin rounded-full border-2 border-muted border-t-primary mb-4" />
              <p className="text-sm font-medium">Inashughulikia malipo...</p>
              <p className="mt-1 text-xs text-muted-foreground">Tafadhali subiri kidogo</p>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
                <IconCheck className="size-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">Malipo Yamekamilika!</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Umelipia <span className="font-bold text-foreground">{level.name}</span> kwa {billing === "weekly" ? "wiki" : "mwezi"}. Sasa unaweza kuona namba, kutuma ujumbe, na kufungua chat.
              </p>
              <div className="mt-4 w-full rounded-lg bg-primary/10 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Level:</span>
                  <span className={cn("text-sm font-bold", level.text)}>{level.name}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Muda:</span>
                  <span className="text-sm font-bold">{days} siku</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Kiasi:</span>
                  <span className="text-sm font-bold">{formatTsh(amount)}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" onClick={handleClose}>
                Endelea Kutumia Tunda
              </Button>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { handleClose(); window.location.href = "/chat" }}>
                  Nenda Chat
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { handleClose(); window.location.href = "/dashboard" }}>
                  Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
