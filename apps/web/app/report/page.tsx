"use client"

import { useState, useRef } from "react"
import { IconApple, IconReport, IconCheck, IconAlertTriangle, IconUpload, IconPhoto, IconX, IconUser, IconAt } from "@tabler/icons-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
} from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

const reportTypes = [
  "Mtu ananidanganya",
  "Mtu ananiomba pesa",
  "Mtu ananitisha",
  "Akaunti ya uwongo",
  "Mtu anatuma picha zisizo za kawaida",
  "Mtu ananisesa",
  "Mtu anatumia lugha ya kudharau",
  "Mengineyo",
]

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    if (selected.length === 0) return
    const newFiles = [...files, ...selected].slice(0, 5)
    setFiles(newFiles)
    const previews = newFiles.map((f) => URL.createObjectURL(f))
    setFilePreviews(previews)
  }

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx))
    setFilePreviews(filePreviews.filter((_, i) => i !== idx))
  }

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
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
            <IconReport className="size-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Ripoti Tatizo</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Una tatizo na mtu fulani kwenye Tunda? Ripoti hapa na Tunda itachukua hatua haraka. Usiogope kuripoti - usalama wako ni muhimu.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
              <IconCheck className="size-7 text-primary" />
            </div>
            <h2 className="text-lg font-bold">Asante kwa kuripoti!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tunda imepokea ripoti yako pamoja na ushahidi. Tutachunguza kwa makini na kuchukua hatua zinazofaa. Kama tunahitaji maelezo zaidi, tutakupigia.
            </p>
            <Button className="mt-4" onClick={() => window.location.href = "/"}>
              Rudi Nyumbani
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-5 sm:p-6">
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username wa mtu unayeripoti</FieldLabel>
                  <div className="relative">
                    <IconAt className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="amminey"
                      className="pl-9"
                      required
                    />
                  </div>
                  <FieldDescription>
                    Andika username bila @. Mfano: amminey
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>Aina ya tatizo</FieldLabel>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chagua aina ya tatizo" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="details">Maelezo ya tatizo</FieldLabel>
                  <textarea
                    id="details"
                    className="flex min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Eleza tatizo kwa undani. Ni nini kilifanyika, lini, na mahali palipo. Andika kila kitu unachojua kuhusu mtu huyo na tatizo lililojitokeza."
                    required
                  />
                  <FieldDescription>
                    Maelezo ya kutosha yatakusaidia kupata msaada haraka.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel>Ushahidi (Picha au Screenshots)</FieldLabel>
                  <div className="rounded-lg border-2 border-dashed border-border p-4 text-center">
                    {filePreviews.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full flex-col items-center gap-2 py-4 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <IconUpload className="size-8" />
                        <span className="text-sm font-medium">Bonyeza hapa kupakia ushahidi</span>
                        <span className="text-xs">Picha au screenshots (hadi 5)</span>
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {filePreviews.map((preview, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={preview}
                                alt={`Ushahidi ${idx + 1}`}
                                className="size-20 rounded-lg object-cover border"
                              />
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
                              >
                                <IconX className="size-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          + Ongeza picha nyingine
                        </button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <FieldDescription>
                    Pakia picha au screenshots zinazoonyesha tatizo. Hii itatusaidia kuchunguza haraka.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact">Namba yako ya simu (hiari)</FieldLabel>
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+255 7XX XXX XXX"
                  />
                  <FieldDescription>
                    Tunaweza kukupigia kama tunahitaji maelezo zaidi.
                  </FieldDescription>
                </Field>
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5">
                  <IconAlertTriangle className="size-4 shrink-0 text-destructive mt-0.5" />
                  <p className="text-xs text-destructive font-medium leading-relaxed">
                    Ripoti za uwongo zitafanya akaunti yako ifutwe. Ripoti kwa uaminifu tu. Tunda itachunguza kila ripoti kwa makini.
                  </p>
                </div>
                <Button type="submit" className="w-full">
                  <IconReport className="size-4" />
                  Tuma Ripoti
                </Button>
              </FieldGroup>
            </form>
          </div>
        )}
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
