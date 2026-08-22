"use client"

import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  IconApple,
  IconSun,
  IconMoon,
  IconPhone,
  IconMapPin,
  IconUsers,
  IconVideo,
  IconPlayerPlay,
  IconMessage,
  IconUserCircle,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from "@tabler/icons-react"
import { useTheme } from "next-themes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import { GenderGate } from "@/components/gender-gate"

const regions = [
  { name: "Dar es Salaam", users: 1240 },
  { name: "Arusha", users: 580 },
  { name: "Mwanza", users: 720 },
  { name: "Dodoma", users: 310 },
  { name: "Mbeya", users: 450 },
  { name: "Tanga", users: 280 },
  { name: "Morogoro", users: 340 },
  { name: "Kilimanjaro", users: 410 },
  { name: "Zanzibar", users: 670 },
  { name: "Mtwara", users: 190 },
  { name: "Kigoma", users: 150 },
  { name: "Iringa", users: 220 },
  { name: "Shinyanga", users: 260 },
  { name: "Songwe", users: 130 },
  { name: "Geita", users: 170 },
  { name: "Simiyu", users: 140 },
  { name: "Njombe", users: 180 },
  { name: "Katavi", users: 90 },
  { name: "Ruvuma", users: 230 },
  { name: "Pwani", users: 300 },
  { name: "Kagera", users: 250 },
  { name: "Manyara", users: 200 },
  { name: "Tabora", users: 240 },
  { name: "Singida", users: 160 },
  { name: "Lindi", users: 110 },
  { name: "Rukwa", users: 120 },
]

const levels = [
  "Regular",
  "Premium",
  "VIP",
  "Elite",
]

const levelColors: Record<string, { from: string; to: string }> = {
  Regular: { from: "bg-blue-500", to: "bg-cyan-400" },
  Premium: { from: "bg-amber-500", to: "bg-yellow-400" },
  VIP: { from: "bg-purple-500", to: "bg-pink-400" },
  Elite: { from: "bg-red-500", to: "bg-orange-400" },
}

const cardImages = [
  "/download (12).jfif",
  "/download (13).jfif",
  "/download (14).jfif",
  "/download (15).jfif",
  "/download (16).jfif",
  "/download (17).jfif",
  "/download (18).jfif",
  "/download (19).jfif",
  "/download (20).jfif",
  "/download (21).jfif",
]

const sections = levels.map((level, sIdx) => ({
  level,
  cards: Array.from({ length: 16 }, (_, i) => {
    const nicknames = ["Amminey", "Johari", "Mzizi", "Babu", "Simba", "Punda", "Kaka", "Mwamba", "Jumaa", "Kibo", "Daudi", "Nuru", "Baraka", "Fundi", "Jabari", "Shuja"]
    const nickname = nicknames[(sIdx * 16 + i) % nicknames.length] ?? "Tunda"
    const username = `@${nickname.toLowerCase()}${(sIdx * 16 + i + 1) % 100}`
    const cardImg = cardImages[(sIdx * 16 + i) % cardImages.length]
    return {
    id: sIdx * 16 + i + 1,
    title: `${level} Video ${i + 1}`,
    nickname,
    username,
    phone: `+255 7${(i % 10)}${((i + 3) % 10)} ${((i + 7) % 10)}${((i + 1) % 10)}${((i + 5) % 10)} ${((i + 2) % 10)}${((i + 8) % 10)}${((i + 4) % 10)}`,
    description: `Naitwa ${nickname}, mwanaume mwenye umri wa ${20 + (i % 15)} miaka, mwenye urefu wa ${165 + (i % 20)} cm. Napenda sana mapenzi ya dhati na mahusiano ya kweli. Nina tabia nzuri, mpole, na mwenye kujali. Natafuta mwenza wa maisha ambaye tunaelewana na kujaliiana.`,
    avatar: `https://i.pravatar.cc/150?img=${(sIdx * 16 + i) % 70 + 1}`,
    cover: cardImg,
    image: cardImg,
    images: Array.from({ length: 8 }, (_, img) => ({
      id: img + 1,
      src: cardImages[(sIdx * 16 + i + img) % cardImages.length],
    })),
    videos: Array.from({ length: 8 }, (_, v) => ({
      id: v + 1,
      title: `Video ${v + 1} - ${nickname}`,
      duration: `${(v + 1)}:${(v + 3) % 6}0`,
      thumb: cardImages[(sIdx * 16 + i + v) % cardImages.length],
    })),
    }
  }),
}))

export default function Page() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-svh">
      <GenderGate />
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <IconApple className="size-5" />
          <span className="text-lg font-bold">Tunda</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <IconSun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <IconMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.location.href = "/login"}>Login</Button>
        </div>
      </header>
      <div className="flex items-center gap-2 border-b bg-background/95 px-4 py-2">
        <IconMapPin className="size-4 text-muted-foreground" />
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chagua Mkoa" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.name} value={region.name}>
                <span className="flex items-center gap-2">
                  <span>{region.name}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <IconUsers className="size-3" />
                    {region.users}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 space-y-8">
        {sections.map((section) => (
          <div key={section.level} className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{section.level}</h2>
              <div className="h-px flex-1 bg-border" />
              <Button size="sm" variant="ghost" onClick={() => window.location.href = `/level/${section.level.toLowerCase()}`}>View All</Button>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
              {section.cards.map((card) => (
                <Dialog key={card.id}>
                  <DialogTrigger
                    nativeButton={false}
                    render={
                      <Card
                        className="relative aspect-square cursor-pointer overflow-hidden transition-shadow hover:ring-2 hover:ring-primary/50"
                        size="sm"
                      />
                    }
                  >
                    <img
                      src={card.image}
                      alt={card.nickname}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className={`absolute left-0 top-0 size-3 rounded-br-full ${levelColors[section.level]?.from ?? "bg-primary"}`} />
                    <div className={`absolute right-0 bottom-0 size-3 rounded-tl-full ${levelColors[section.level]?.to ?? "bg-primary"}`} />
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md p-0 max-h-[90vh] overflow-y-auto">
                    <div className="relative mb-3">
                      <img
                        src={card.cover}
                        alt={card.nickname}
                        className="h-40 w-full object-cover rounded-t-lg sm:h-52"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <DialogTitle className="text-base font-bold text-white sm:text-lg">{card.nickname}</DialogTitle>
                        <DialogDescription className="text-white/80 text-xs sm:text-sm">{card.username}</DialogDescription>
                      </div>
                    </div>
                    <div className="space-y-3 px-3 pb-3">
                      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                        <IconPhone className="size-4 shrink-0 text-muted-foreground" />
                        <span className="text-xs font-medium sm:text-sm">{card.phone}</span>
                      </div>
                      <Tabs defaultValue="videos">
                        <TabsList className="w-full">
                          <TabsTrigger value="videos" className="flex-1">
                            <IconVideo className="size-4" />
                            Videos
                          </TabsTrigger>
                          <TabsTrigger value="about" className="flex-1">
                            <IconUserCircle className="size-4" />
                            About
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="videos">
                          <div className="max-h-40 space-y-2 overflow-y-auto pt-2 sm:max-h-56">
                            {card.videos.map((video) => (
                              <div
                                key={video.id}
                                className="flex items-center gap-2 rounded-lg border p-1.5 transition-colors hover:bg-accent sm:gap-3 sm:p-2"
                              >
                                <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted sm:size-14">
                                  <img
                                    src={video.thumb}
                                    alt={video.title}
                                    className="size-full object-cover"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <IconPlayerPlay className="size-4 text-white sm:size-5" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="truncate text-xs font-medium">{video.title}</p>
                                  <p className="text-xs text-muted-foreground">{video.duration}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="about">
                          <p className="pt-2 text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                        </TabsContent>
                      </Tabs>
                      <Button size="sm" className="w-full">
                        <IconMessage className="size-4" />
                        Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        ))}
      </div>
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Tunda</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">Kuhusu Tunda</a></li>
                <li><a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Sera ya Faragha</a></li>
                <li><a href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Sharti za Matumizi</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Akaunti</h3>
              <ul className="space-y-2">
                <li><a href="/login" className="text-xs text-muted-foreground hover:text-primary transition-colors">Ingia</a></li>
                <li><a href="/signup" className="text-xs text-muted-foreground hover:text-primary transition-colors">Jiunge</a></li>
                <li><a href="/chat" className="text-xs text-muted-foreground hover:text-primary transition-colors">Chat</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Msaada</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-xs text-muted-foreground hover:text-primary transition-colors">Msaada</a></li>
                <li><a href="/safety" className="text-xs text-muted-foreground hover:text-primary transition-colors">Usalama</a></li>
                <li><a href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">Wasiliana Nasi</a></li>
                <li><a href="/report" className="text-xs text-muted-foreground hover:text-primary transition-colors">Ripoti Tatizo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">Fuata Tunda</h3>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <IconBrandInstagram className="size-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <IconBrandFacebook className="size-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <IconBrandX className="size-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <IconBrandTiktok className="size-5" />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <IconBrandWhatsapp className="size-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
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
