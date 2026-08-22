"use client"

import { useState, useEffect } from "react"
import {
  IconApple,
  IconGenderMale,
  IconGenderFemale,
  IconHeart,
  IconLock,
  IconArrowRight,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { useAuth } from "@/components/auth-provider"

const cardImages = [
  "/download (12).jfif",
  "/download (13).jfif",
  "/download (14).jfif",
  "/download (15).jfif",
  "/download (16).jfif",
  "/download (17).jfif",
  "/download (18).jfif",
  "/download (19).jfif",
  "/download (20).jfif",
  "/download (21).jfif",
]

const femaleNames = ["Asha", "Zawadi", "Rehema", "Neema", "Tatu", "Mwajuma", "Halima", "Mariam", "Fatuma", "Amina", "Saidi", "Khadija"]
const maleNames = ["Amminey", "Johari", "Mzizi", "Babu", "Simba", "Punda", "Kaka", "Mwamba", "Jumaa", "Kibo", "Daudi", "Nuru"]

export function GenderGate() {
  const { user, loading } = useAuth()
  const [step, setStep] = useState<"gender" | "landing" | "closed">("gender")
  const [gender, setGender] = useState<"male" | "female" | null>(null)

  useEffect(() => {
    if (!loading && user) {
      setStep("closed")
    }
  }, [loading, user])

  if (loading || step === "closed") return null

  const targetGender = gender === "male" ? "female" : "male"
  const names = gender === "male" ? femaleNames : maleNames
  const targetLabel = gender === "male" ? "Wanawake" : "Wanaume"
  const targetIcon = gender === "male" ? IconGenderFemale : IconGenderMale

  const previewCards = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    nickname: names[i % names.length] ?? "Tunda",
    username: `@${(names[i % names.length] ?? "tunda").toLowerCase()}${i + 1}`,
    image: cardImages[i % cardImages.length],
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {step === "gender" && (
        <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <IconApple className="size-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl">Karibu Tunda</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Kabla ya kuendelea, ni lazima uchague jinsia yako. Hii itatusaidia kukuletea watu unaowataka.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setGender("male"); setStep("landing") }}
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
                <p className="text-xs text-muted-foreground">Nitakuonyesha wanawake</p>
              </div>
            </button>

            <button
              onClick={() => { setGender("female"); setStep("landing") }}
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
                <p className="text-xs text-muted-foreground">Nitakuonyesha wanaume</p>
              </div>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <IconLock className="size-3.5" />
            <span>Uchaguzi wako ni wa faragha. Hakuna mtu anayeona.</span>
          </div>
        </div>
      )}

      {step === "landing" && (
        <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              {gender === "male" ? (
                <IconGenderMale className="size-7 text-blue-500" />
              ) : (
                <IconGenderFemale className="size-7 text-pink-500" />
              )}
            </div>
            <h2 className="text-xl font-bold">
              Karibu{gender === "male" ? " Kaka" : " Dada"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hapa kuna {targetLabel} wanaokutafuta wewe
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {previewCards.map((card) => (
              <div
                key={card.id}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={card.image}
                  alt={card.nickname}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-1">
                  <p className="truncate text-[10px] font-bold text-white">{card.nickname}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mb-6 rounded-lg bg-primary/10 px-4 py-3">
            <IconHeart className="size-5 text-primary" />
            <p className="text-sm font-medium text-primary">
              {previewCards.length} {targetLabel} wapo tayari kukutongoja
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => window.location.href = "/signup"}
            >
              Jiunge Sasa
              <IconArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.href = "/login"}
            >
              Nina Akaunti Tayari
            </Button>
          </div>

          <button
            onClick={() => setStep("gender")}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Badilisha jinsia
          </button>
        </div>
      )}
    </div>
  )
}
