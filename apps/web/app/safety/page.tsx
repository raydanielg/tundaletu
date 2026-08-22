"use client"

import { IconApple, IconShield, IconLock, IconEyeOff, IconUserShield, IconAlertTriangle, IconCheck, IconPhone, IconMessage, IconReport } from "@tabler/icons-react"

const safetyTips = [
  {
    icon: IconShield,
    title: "Linda Taarifa Zako",
    desc: "Usitoe taarifa za siri kama namba ya akaunti ya benki, password, au nyumba yako kwa mtu umjua mtandaoni. Hata kama anasema ni mpenzi wako, hakuna haja ya kutoa taarifa za kifedha.",
  },
  {
    icon: IconPhone,
    title: "Mpigie Kabla ya Kuonana",
    desc: "Kabla ya kukutana na mtu umjua kwenye Tunda, mpigie simu kwanza. Sauti ya mtu inaweza kukupa hisia zaidi kuliko message. Kama anakataa kuzungumza kwenye simu, kuwa mwangalifu.",
  },
  {
    icon: IconAlertTriangle,
    title: "Kuwa Mwangalifu na Wanadamu",
    desc: "Watu wengine wanaweza kutumia Tunda kwa nia mbaya. Kama mtu anakuomba pesa, anahimiza kuhamisha pesa, au anasema ana shida za kifedha, ripoti mara moja. Hakuna mpenzi wa kweli anayeomba pesa mtandaoni.",
  },
  {
    icon: IconCheck,
    title: "Kutana Mahali Paca",
    desc: "Kukutana na mtu wa kwanza, chagua mahali pa hadharani kama kahawa, mkahawa, au sehemu yenye watu wengi. Usikubali kukutana nyumbani kwako au kwake kwa mara ya kwanza. Mpe rafiki yako habari kaha unakwenda na nani.",
  },
  {
    icon: IconEyeOff,
    title: "Faragha ya Picha",
    desc: "Usitume picha za siri kwa mtu umjua vizuri. Picha zinaweza kutumiwa kukufanyia uonevu au udanganyifu. Kama mtu anakushinikiza kutuma picha za siri, huyo si mtu wa kuwasiliana naye.",
  },
  {
    icon: IconReport,
    title: "Ripoti Watu Waovu",
    desc: "Kama unapata mtu anayefanya vitendo visivyo vya kawaida, anakudharau, au anakuonea, ripoti kwa Tunda mara moja. Tunda itaficha akaunti yake na kumzuia kuwasiliana na wengine.",
  },
]

const redFlags = [
  "Anakuomba pesa au msaada wa kifedha",
  "Anasema anahitaji pesa za dharura au matibabu",
  "Anakushinikiza kutuma picha za siri",
  "Anakataa kuzungumza kwenye simu",
  "Anasema yupo nje ya nchi na anahitaji msaada",
  "Anaakaunti mpya sana bila picha au videos",
  "Anaharakisha mahusiano sana bila kujua vizuri",
  "Anauliza taarifa za benki au password",
]

export default function SafetyPage() {
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
            <IconShield className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Usalama na Kujilinda</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base">
            Tunda inajali usalama wako. Hapa kuna maelekezo muhimu ya kujilinda unapotumia Tunda kutafuta mwenza wa maisha. Tafadhali soma kwa makini na ufuate maelekezo haya.
          </p>
        </div>

        <div className="space-y-4">
          {safetyTips.map((tip) => {
            const Icon = tip.icon
            return (
              <div key={tip.title} className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">{tip.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-xl border-2 border-destructive/20 bg-destructive/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <IconAlertTriangle className="size-5 text-destructive" />
            <h2 className="text-lg font-bold text-destructive">Dalili za Hatari</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Kama unaona mojawapo ya hizi, kuwa mwangalifu sana. Pengine ni bora kuacha kuwasiliana na mtu huyo:
          </p>
          <ul className="space-y-2">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-destructive" />
                {flag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-xl border bg-card p-6 text-center">
          <h2 className="text-lg font-bold">Una shida au unataka kuripoti?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tunda iko tayari kusikiliza. Wasiliana nasi kama una shida yoyote.
          </p>
          <a
            href="/report"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ripoti Tatizo
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
