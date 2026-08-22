"use client"

import { IconApple, IconMail, IconPhone, IconMessage, IconBrandWhatsapp, IconClock } from "@tabler/icons-react"

const contacts = [
  {
    icon: IconMail,
    title: "Email",
    value: "help@tunda.co.tz",
    desc: "Tutakujibu ndani ya saa 24.",
  },
  {
    icon: IconPhone,
    title: "Simu",
    value: "+255 7XX XXX XXX",
    desc: "Kazi: Jumatatu - Jumamosi, 8:00 - 18:00",
  },
  {
    icon: IconBrandWhatsapp,
    title: "WhatsApp",
    value: "+255 7XX XXX XXX",
    desc: "Tuma message moja kwa moja kwenye WhatsApp.",
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <a href="/" className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconApple className="size-4" />
          </div>
          <span className="text-lg font-bold">Tunda</span>
        </a>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconMessage className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Wasiliana Nasi</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Una swali, maoni, au unahitaji msaada? Tunda iko hapa kwa ajili yako. Wasiliana nasi kwa njia yoyote hapo chini.
          </p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => {
            const Icon = contact.icon
            return (
              <div key={contact.title} className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-bold">{contact.title}</h2>
                    <p className="mt-1 text-sm font-medium text-primary">{contact.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{contact.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <IconClock className="size-5 text-primary" />
            <h2 className="text-base font-bold">Masaa ya Kazi</h2>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Jumatatu - Ijumaa</span>
              <span className="font-medium">8:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Jumamosi</span>
              <span className="font-medium">9:00 - 15:00</span>
            </div>
            <div className="flex justify-between">
              <span>Jumapili</span>
              <span className="font-medium">Mapumziko</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <IconApple className="size-3.5" />
              </div>
              <span className="text-sm font-bold">Tunda</span>
            </a>
            <p className="text-xs text-muted-foreground">
              &copy; 2026 Tunda. Haki zote zimehifadhiwa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
