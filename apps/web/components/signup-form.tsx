import { cn } from "@workspace/ui/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react"
import {
  IconGenderMale,
  IconGenderFemale,
  IconInfoCircle,
  IconEye,
  IconEyeOff,
  IconUser,
  IconLock,
  IconPhone,
  IconAt,
  IconLoader2,
} from "@tabler/icons-react"
import { api } from "@/lib/api"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth()
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gender) return
    setLoading(true)
    setError("")
    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    const nickname = (form.elements.namedItem("nickname") as HTMLInputElement).value
    const realName = (form.elements.namedItem("realname") as HTMLInputElement).value
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    localStorage.setItem("tunda_gender", gender)

    // Try API first, fallback to mock
    try {
      const data = await api.auth.signup({ username, nickname, realName, phone, password, gender })
      if (data?.token) {
        localStorage.setItem("tunda_token", data.token)
        login(username, data.user.nickname, data.user)
        window.location.href = "/dashboard"
        return
      }
    } catch {
      // API failed - use mock data
    }

    // Mock signup - works without backend
    login(username, nickname, { realName, phone, gender })
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 600)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Jiunge na Tunda</CardTitle>
          <CardDescription>
            Tengeneza akaunti yako mpya ya Tunda
          </CardDescription>
        </CardHeader>
        {error && (
          <div className="mx-6 mb-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">
            {error}
          </div>
        )}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="realname">Jina Kamili</FieldLabel>
                <div className="relative">
                  <IconUser className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="realname"
                    type="text"
                    placeholder="Andika jina lako kamili"
                    className="pl-9"
                    required
                  />
                </div>
                <FieldDescription>
                  Hili ni jina lako halisi. Haliwezi kuonekana kwa wengine.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                <div className="relative">
                  <IconUser className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Andika nickname yako"
                    className="pl-9"
                    required
                  />
                </div>
                <FieldDescription>
                  Hili ndilo litakaloonekana kwa watumiaji wengine.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <div className="relative">
                  <IconAt className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Andika username yako"
                    className="pl-9"
                    required
                  />
                </div>
                <FieldDescription>
                  Username ni la lazima. Hii ndio akaunti yako ya kuingia.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Namba ya Simu</FieldLabel>
                <div className="relative">
                  <IconPhone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Andika namba yako ya simu"
                    className="pl-9"
                    required
                  />
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <IconInfoCircle className="size-4 shrink-0 text-primary mt-0.5" />
                  <p className="text-xs text-primary font-medium leading-relaxed">
                    Namba hii ya simu itaonekana kwa watumiaji wengine ndani ya mfumo wa Tunda. Watu wataweza kukupigia na kuwasiliana nawe kupitia namba hii. Tafadhali weka namba unayotumia kwa kawaida.
                  </p>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tengeneza password yako"
                    className="pl-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <IconEyeOff className="size-4" />
                    ) : (
                      <IconEye className="size-4" />
                    )}
                  </button>
                </div>
              </Field>
              <Field>
                <FieldLabel>Jinsia yako</FieldLabel>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all",
                      gender === "male"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <IconGenderMale className="size-5" />
                    Mwanaume
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all",
                      gender === "female"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    <IconGenderFemale className="size-5" />
                    Mwanamke
                  </button>
                </div>
              </Field>
              <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5">
                <IconInfoCircle className="size-4 shrink-0 text-destructive mt-0.5" />
                <p className="text-xs text-destructive font-medium leading-relaxed">
                  Kumbuka: Tunda haiungi mkono ushoga Tanzania. Tafadhali chagua jinsia yako sahihi.
                </p>
              </div>
              <Field>
                <Button type="submit" className="w-full" disabled={!gender || loading}>
                  {loading ? <IconLoader2 className="size-4 animate-spin" /> : "Jiunge"}
                </Button>
                <FieldDescription className="text-center text-sm">
                  Una akaunti tayari? <a href="/login" className="font-medium text-primary underline-offset-4 hover:underline">Ingia hapa</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Kwa kuendelea, unakubali <a href="/terms">Sharti za Matumizi</a>{" "}
        na <a href="/terms">Sera ya Faragha</a>.
      </FieldDescription>
    </div>
  )
}
