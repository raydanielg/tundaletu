import { cn } from "@workspace/ui/lib/utils"
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
} from "@tabler/icons-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Jiunge na Tunda</CardTitle>
          <CardDescription>
            Tengeneza akaunti yako mpya ya Tunda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="realname">Jina Kamili</FieldLabel>
                <Input
                  id="realname"
                  type="text"
                  placeholder="Mfano: Ammini Juma"
                  required
                />
                <FieldDescription>
                  Hili ni jina lako halisi. Haliwezi kuonekana kwa wengine.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Mfano: Amminey"
                  required
                />
                <FieldDescription>
                  Hili ndilo litakaloonekana kwa watumiaji wengine.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="@amminey"
                  required
                />
                <FieldDescription>
                  Username ni la lazima. Hii ndio akaunti yako ya kuingia.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Namba ya Simu</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+255 7XX XXX XXX"
                  required
                />
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
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
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
                <Button type="submit" className="w-full" disabled={!gender}>
                  Jiunge
                </Button>
                <FieldDescription className="text-center">
                  Una akaunti tayari? <a href="/login">Ingia hapa</a>
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
