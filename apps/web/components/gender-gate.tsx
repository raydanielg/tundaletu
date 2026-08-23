"use client"

import { useState, useEffect } from "react"
import {
  IconApple,
  IconGenderMale,
  IconGenderFemale,
  IconLock,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function GenderGate() {
  const { user, loading } = useAuth()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (loading) return
    if (user) {
      setShow(false)
      return
    }
    const chosen = localStorage.getItem("tunda_gender")
    if (chosen) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [loading, user])

  const chooseGender = (gender: "male" | "female") => {
    localStorage.setItem("tunda_gender", gender)
    setShow(false)
    window.location.reload()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconApple className="size-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold sm:text-2xl">Karibu Tunda</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Ni lazima uchague jinsia yako ili kuendelea. Bila kuchagua, huwezi kuona watu wengine.
          </p>
        </div>

        <div className="mb-4 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5">
          <IconLock className="size-4 shrink-0 text-destructive mt-0.5" />
          <p className="text-xs text-destructive font-medium leading-relaxed">
            Kumbuka: Tunda haiungi mkono ushoga Tanzania. Tafadhali chagua jinsia yako sahihi.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => chooseGender("male")}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md",
              "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-blue-500/10">
              <IconGenderMale className="size-7 text-blue-500" />
            </div>
            <div>
              <p className="text-base font-bold">Mwanaume</p>
              <p className="text-xs text-muted-foreground">Utaona wanawake tu</p>
            </div>
          </button>

          <button
            onClick={() => chooseGender("female")}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:shadow-md",
              "border-border hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-pink-500/10">
              <IconGenderFemale className="size-7 text-pink-500" />
            </div>
            <div>
              <p className="text-base font-bold">Mwanamke</p>
              <p className="text-xs text-muted-foreground">Utaona wanaume tu</p>
            </div>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <IconLock className="size-3.5" />
          <span>Uchaguzi wako ni wa faragha. Hakuna mtu anayeona.</span>
        </div>
      </div>
    </div>
  )
}
