"use client"

import { LoginForm } from "@/components/login-form"
import { IconApple, IconHeart, IconShieldCheck, IconUsers } from "@tabler/icons-react"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col bg-gradient-to-br from-muted via-muted to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="relative flex flex-1 flex-col justify-center px-4 py-8 sm:items-center sm:justify-center sm:p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="/" className="flex flex-col items-center gap-3 self-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <IconApple className="size-7" />
            </div>
            <div className="text-center">
              <span className="text-xl font-bold">Tunda</span>
              <p className="text-xs text-muted-foreground">Pata tunda wa maisha yako</p>
            </div>
          </a>
          <LoginForm />
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><IconShieldCheck className="size-3.5" /> Salama</span>
            <span className="flex items-center gap-1"><IconHeart className="size-3.5" /> Faragha</span>
            <span className="flex items-center gap-1"><IconUsers className="size-3.5" /> 1,200+</span>
          </div>
        </div>
      </div>
    </div>
  )
}
