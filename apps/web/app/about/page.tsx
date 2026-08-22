"use client"

import { IconApple, IconHeart, IconShield, IconUsers, IconLock, IconCheck } from "@tabler/icons-react"

const features = [
  {
    icon: IconHeart,
    title: "Mapenzi ya Dhati",
    desc: "Tunda ni jukwaa la kupata mwenza wa maisha kwa mahusiano ya kweli na ya dhati. Sisi hatukuangi na muda, tunatafuta watu wanaotaka mahusiano ya kweli.",
  },
  {
    icon: IconUsers,
    title: "Watu wa Kweli",
    desc: "Kila mtumiaji wa Tunda anajisajili kwa jina lake halisi, nickname, na namba ya simu. Hakuna akaunti za uwongo. Tunataka uhakika kwamba unawasiliana na mtu wa kweli.",
  },
  {
    icon: IconShield,
    title: "Faragha yako",
    desc: "Tunda inalinda data zako kwa usimbaji fiche wa hali ya juu. Hakuna mtu anayeona data zako bila ruhusa yako. Hata serikali haina ruhusa ya kuona taarifa zako bila idhini yako.",
  },
  {
    icon: IconLock,
    title: "Usalama wa Hali ya Juu",
    desc: "Kila shughuli kwenye Tunda inafanyika kwa SSL/TLS encryption. Password yako imehifadhiwa kwa usalama wa hali ya juu. Hakuna mtu anayeweza kuiona.",
  },
]

const steps = [
  { step: "1", title: "Jiunge", desc: "Tengeneza akaunti yako kwa kuandika jina kamili, nickname, username, namba ya simu, na password." },
  { step: "2", title: "Chagua Jinsia", desc: "Tunda inahitaji uchague jinsia yako. Hii ni muhimu kwa kuhakikisha kwamba mfumo unakuletea watu sahihi." },
  { step: "3", title: "Tafuta Mwenza", desc: "Browsu kwenye card za watu, angalia profiles zao, videos, na picha. Ukipenda mtu, mwitishe au mpigie." },
  { step: "4", title: "Wasiliana", desc: "Unaweza kumpigia au kumtumia message. Namba ya simu inaonekana kwa wengine, hivyo unaweza kuwasiliana moja kwa moja." },
]

export default function AboutPage() {
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

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconHeart className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Kuhusu Tunda</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base">
            Tunda ni jukwaa la kipekee la kutafuta mwenza wa maisha nchini Tanzania. Tunda ilianzishwa kwa lengo la kuunganisha watu wa kweli wanaotafuta mahusiano ya dhati na ya kweli. Sisi hatukuangi na muda - tunataka kusaidia watu kupata wenzi wa maisha wanaowaelewana na kuwajali.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">{feature.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-center text-xl font-bold">Jinsi Tunda Inavyofanya Kazi</h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-4 rounded-xl border bg-card p-5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
          <h2 className="text-lg font-bold">Tayari kutafuta mwenza?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Jiunge na Tunda leo na upate mwenza wa maisha.
          </p>
          <a
            href="/signup"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Jiunge Sasa
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
