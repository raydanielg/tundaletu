"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type PaymentStatus = {
  hasPaid: boolean
  level: string | null
  daysLeft: number
  paidDate: string | null
  billingCycle?: "weekly" | "monthly"
  amount?: number
  method?: string
}

type PaymentContextType = {
  payment: PaymentStatus
  makePayment: (level: string, days: number, extra?: Partial<PaymentStatus>) => void
  checkPayment: () => boolean
  loading: boolean
}

const PaymentContext = createContext<PaymentContextType>({
  payment: { hasPaid: false, level: null, daysLeft: 0, paidDate: null },
  makePayment: () => {},
  checkPayment: () => false,
  loading: true,
})

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [payment, setPayment] = useState<PaymentStatus>({
    hasPaid: false,
    level: null,
    daysLeft: 0,
    paidDate: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tunda_payment")
      if (stored) {
        const data = JSON.parse(stored) as PaymentStatus
        const paidTime = data.paidDate ? new Date(data.paidDate).getTime() : 0
        const elapsedDays = Math.floor((Date.now() - paidTime) / 86400000)
        const remaining = Math.max(0, data.daysLeft - elapsedDays)
        const updated = { ...data, daysLeft: remaining, hasPaid: remaining > 0 }
        setPayment(updated)
        if (remaining <= 0) {
          localStorage.removeItem("tunda_payment")
        }
      }
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const makePayment = (level: string, days: number, extra?: Partial<PaymentStatus>) => {
    const newPayment: PaymentStatus = {
      hasPaid: true,
      level,
      daysLeft: days,
      paidDate: new Date().toISOString(),
      ...extra,
    }
    localStorage.setItem("tunda_payment", JSON.stringify(newPayment))
    setPayment(newPayment)

    // Also update the auth user
    try {
      const userStored = localStorage.getItem("tunda_user")
      if (userStored) {
        const user = JSON.parse(userStored)
        user.hasPaid = true
        user.level = level
        user.daysLeft = days
        localStorage.setItem("tunda_user", JSON.stringify(user))
      }
    } catch {
      // ignore
    }
  }

  const checkPayment = () => payment.hasPaid

  return (
    <PaymentContext.Provider value={{ payment, makePayment, checkPayment, loading }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  return useContext(PaymentContext)
}
