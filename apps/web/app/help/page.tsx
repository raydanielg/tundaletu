"use client"

import { IconApple, IconHelp, IconUser, IconShield, IconCreditCard, IconBan, IconLock, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"

const faqs = [
  {
    icon: IconUser,
    q: "Ninawekaje akaunti yangu?",
    a: "Nenda kwenye ukurasa wa Jiunge, jaza jina kamili, nickname, username, namba ya simu, password, na chagua jinsia yako. Baada ya kujisajili, unaweza kuingia kwa username na password yako.",
  },
  {
    icon: IconShield,
    q: "Je, data zangu ni salama?",
    a: "Ndiyo. Tunda inalinda data zako kwa usimbaji fiche wa hali ya juu. Hakuna mtu anayeona taarifa zako bila ruhusa yako. Hata serikali haina ruhusa ya kuona data zako bila idhini yako.",
  },
  {
    icon: IconCreditCard,
    q: "Je, Tunda ni ya bure?",
    a: "Tunda ina levels tofauti: Regular, Premium, VIP, na Elite. Unaweza kutumia Tunda bure kama Regular. Levels za juu zinaweza kuwa na malipo kwa huduma za ziada.",
  },
  {
    icon: IconBan,
    q: "Ninawezaje kuficha akaunti yangu?",
    a: "Unaweza kuficha akaunti yako muda wowote kwa kwenda kwenye mipangilio ya akaunti. Akaunti yako itafichwa na hautaonekana kwa watumiaji wengine hadi urudishe.",
  },
  {
    icon: IconLock,
    q: "Nimesahau password yangu, nifanye nini?",
    a: "Nenda kwenye ukurasa wa Login, bonyeza 'Umesahau password?' na ufuate maelekezo. Tutakutumia link ya kubadilisha password kupitia simu yako.",
  },
  {
    icon: IconShield,
    q: "Ninawezaje kuripoti mtu mbaya?",
    a: "Nenda kwenye ukurasa wa Ripoti, jaza fomu na eleza tatizo. Tunda itachunguza na kuchukua hatua haraka. Usalama wako ni muhimu kwetu.",
  },
]

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

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
            <IconHelp className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Msaada</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Una swali? Hapa kuna majibu ya maswali yanayoulizwa mara kwa mara. Kama hupati jibu la swali lako, wasiliana nasi.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon
            const isOpen = openIdx === idx
            return (
              <div key={idx} className="rounded-xl border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span className="flex-1 text-sm font-medium">{faq.q}</span>
                  <IconChevronRight className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pl-15">
                    <p className="text-sm text-muted-foreground leading-relaxed pl-11">{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6 text-center">
          <h2 className="text-base font-bold">Hujapata jibu la swali lako?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Wasiliana nasi moja kwa moja, tuko tayari kukusaidia.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Wasiliana Nasi
          </a>
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
