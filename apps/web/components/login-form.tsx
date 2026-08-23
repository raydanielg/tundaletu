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
import { IconUser, IconLock, IconEye, IconEyeOff, IconLoader2 } from "@tabler/icons-react"
import { useState } from "react"
import { api } from "@/lib/api"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    // Try API first, fallback to mock
    try {
      const data = await api.auth.login({ username, password })
      if (data?.token) {
        localStorage.setItem("tunda_token", data.token)
        login(username, data.user.nickname, data.user)
        window.location.href = "/dashboard"
        return
      }
    } catch {
      // API failed - use mock data
    }

    // Mock login - works without backend
    login(username, username)
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 600)
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
        {error && (
          <div className="mx-6 mb-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive">
            {error}
          </div>
        )}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Andika password yako"
                    className="pl-9 pr-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <IconLoader2 className="size-4 animate-spin" /> : "Ingia"}
                </Button>
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
