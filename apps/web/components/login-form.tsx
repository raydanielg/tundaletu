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
import { IconUser, IconLock } from "@tabler/icons-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    login(username)
    window.location.href = "/chat"
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Karibu Tunda</CardTitle>
          <CardDescription>
            Ingia akaunti yako ya Tunda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <div className="relative">
                  <IconUser className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Andika username yako"
                    className="pl-9"
                    required
                  />
                </div>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ms-auto text-xs font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Umesahau password?
                  </a>
                </div>
                <div className="relative">
                  <IconLock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Andika password yako"
                    className="pl-9"
                    required
                  />
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full">Login</Button>
                <FieldDescription className="text-center text-sm">
                  Huna akaunti? <a href="/signup" className="font-medium text-primary underline-offset-4 hover:underline">Jiunge sasa</a>
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
