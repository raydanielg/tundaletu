"use client"

import { IconApple, IconShield, IconLock, IconEyeOff, IconScale, IconUserShield } from "@tabler/icons-react"

const sections = [
  {
    icon: IconShield,
    title: "Ulindaji wa Data",
    content: [
      "Tunda inalinda data zako kwa nguvu za hali ya juu. Data zako zimehifadhiwa kwa usimbaji fiche (encryption) wa hali ya juu, na zinaweza kufikiwa tu na wewe mwenyewe.",
      "Hakuna mtu yeyote, ikiwa ni pamoja na waasisi wa Tunda, wenye uwezo wa kuona data zako bila ruhusa yako.",
    ],
  },
  {
    icon: IconEyeOff,
    title: "Faragha ya Mtumiaji",
    content: [
      "Tunda HAISHIRI data za mtumiaji na mtu yeyote, chombo chochote, au taasisi yoyote. Data zako ni za faragha kabisa.",
      "Hakuna taarifa za binafsi, historia, picha, au video zako zitakazoshirwa na kampuni, serikali, au mtu yeyote bila idhini yako wazi.",
      "Tunda haiuzi data za mtumiaji. Data zako ni mali yako tu.",
    ],
  },
  {
    icon: IconUserShield,
    title: "Haki za Serikali",
    content: [
      "Hata serikali ya Tanzania au taasisi yoyote ya kisheria haina ruhusa ya kuona data zako bila idhini yako mwenyewe.",
      "Tunda inalinda haki yako ya faragha kulingana na Katiba ya Jamhuri ya Muungano wa Tanzania na sheria za faragha za Tanzania.",
      "Kama kuna ombi lolote la kisheria la kuona data zako, Tunda itakupasha habari kwanza kabla ya kutoa taarifa zozote.",
    ],
  },
  {
    icon: IconLock,
    title: "Usalama wa Akaunti",
    content: [
      "Namba yako ya simu na password zimehifadhiwa kwa usimbaji fiche. Hakuna mtu anayeweza kuziona hata wasaidizi wa Tunda.",
      "Unawajibikia kuhifadhi password yako. Tunda haitumia password yako popote pengine.",
      "Kila shughuli inafanyika kwa usalama wa hali ya juu (SSL/TLS encryption).",
    ],
  },
  {
    icon: IconScale,
    title: "Sheria na Masharti",
    content: [
      "Tunda inafuata sheria za Jamhuri ya Muungano wa Tanzania. Matumizi ya Tunda yanapaswa kufuata sheria na maadili ya Tanzania.",
      "Tunda haiungi mkono shughuli zozote zinazokiuka sheria za Tanzania, ikiwa ni pamoja na ushoga, udanganyifu, au unyanyasaji.",
      "Mtumiaji yeyote anayekiuka sheria atafutwa akaunti yake bila onyo.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <a href="/" className="flex items-center gap-2">
          <IconApple className="size-5" />
          <span className="text-lg font-bold">Tunda</span>
        </a>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconShield className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Sera ya Matumizi na Faragha</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tunda inalinda faragha yako kwa nguvu zote. Soma sera zetu hapa chini.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className="rounded-xl border bg-card p-5 sm:p-6"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h2 className="text-base font-bold sm:text-lg">{section.title}</h2>
                </div>
                <div className="space-y-2 pl-1">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 rounded-xl border-2 border-destructive/20 bg-destructive/5 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <IconUserShield className="size-5 shrink-0 text-destructive mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-destructive">
                Ahadi ya Tunda
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Tunda inaahidi kwamba data zako hazitashirwa na mtu yeyote, wakati wowote, kwa sababu yoyote. Faragha yako ni haki yako, na sisi tunaiheshimu kabisa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Sera hii ilisasishwa tarehe 22 Agosti 2026. Tunda inaweza kubadilisha sera hii wakati wowote, na mtumiaji atapashwa habari kwa mabadiliko yoyote.
          </p>
        </div>
      </div>
    </div>
  )
}
