"use client"

import { use } from "react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import {
  IconApple,
  IconArrowLeft,
  IconPhone,
  IconVideo,
  IconPlayerPlay,
  IconMessage,
  IconUserCircle,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { useState, useMemo } from "react"

const levelColors: Record<string, { from: string; to: string }> = {
  regular: { from: "bg-blue-500", to: "bg-cyan-400" },
  premium: { from: "bg-amber-500", to: "bg-yellow-400" },
  vip: { from: "bg-purple-500", to: "bg-pink-400" },
  elite: { from: "bg-red-500", to: "bg-orange-400" },
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

const nicknames = ["Amminey", "Johari", "Mzizi", "Babu", "Simba", "Punda", "Kaka", "Mwamba", "Jumaa", "Kibo", "Daudi", "Nuru", "Baraka", "Fundi", "Jabari", "Shuja", "Asha", "Zawadi", "Rehema", "Neema", "Tatu", "Mwajuma", "Halima", "Saidi", "Juma", "Hamisi", "Yusuf", "Mariam", "Fatuma", "Amina"]

function generateCards(level: string, count: number) {
  const levelIdx = ["regular", "premium", "vip", "elite"].indexOf(level)
  return Array.from({ length: count }, (_, i) => {
    const nickname = nicknames[(levelIdx * count + i) % nicknames.length] ?? "Tunda"
    const username = `@${nickname.toLowerCase()}${(levelIdx * count + i + 1) % 100}`
    const cardImg = cardImages[(levelIdx * count + i) % cardImages.length]
    return {
      id: levelIdx * count + i + 1,
      nickname,
      username,
      phone: `+255 7${(i % 10)}${((i + 3) % 10)} ${((i + 7) % 10)}${((i + 1) % 10)}${((i + 5) % 10)} ${((i + 2) % 10)}${((i + 8) % 10)}${((i + 4) % 10)}`,
      description: `Naitwa ${nickname}, mwanaume mwenye umri wa ${20 + (i % 15)} miaka, mwenye urefu wa ${165 + (i % 20)} cm. Napenda sana mapenzi ya dhati na mahusiano ya kweli. Nina tabia nzuri, mpole, na mwenye kujali. Natafuta mwenza wa maisha ambaye tunaelewana na kujaliiana.`,
      avatar: `https://i.pravatar.cc/150?img=${(levelIdx * count + i) % 70 + 1}`,
      cover: cardImg,
      image: cardImg,
      rank: i + 1,
      joinedDays: Math.floor(Math.random() * 365) + 1,
      images: Array.from({ length: 8 }, (_, img) => ({
        id: img + 1,
        src: cardImages[(levelIdx * count + i + img) % cardImages.length],
      })),
      videos: Array.from({ length: 8 }, (_, v) => ({
        id: v + 1,
        title: `Video ${v + 1} - ${nickname}`,
        duration: `${(v + 1)}:${(v + 3) % 6}0`,
        thumb: cardImages[(levelIdx * count + i + v) % cardImages.length],
      })),
    }
  })
}

const PER_PAGE = 24

export default function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = use(params)
  const levelLower = level.toLowerCase()
  const levelDisplay = levelLower.charAt(0).toUpperCase() + levelLower.slice(1)

  const [filter, setFilter] = useState<"newest" | "top">("newest")
  const [page, setPage] = useState(1)

  const allCards = useMemo(() => generateCards(levelLower, 96), [levelLower])

  const sortedCards = useMemo(() => {
    const sorted = [...allCards]
    if (filter === "newest") {
      sorted.sort((a, b) => a.joinedDays - b.joinedDays)
    } else {
      sorted.sort((a, b) => a.rank - b.rank)
    }
    return sorted
  }, [allCards, filter])

  const totalPages = Math.ceil(sortedCards.length / PER_PAGE)
  const currentCards = sortedCards.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const colors = levelColors[levelLower] ?? { from: "bg-primary", to: "bg-primary" }

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Button size="sm" variant="ghost" onClick={() => window.location.href = "/"}>
            <IconArrowLeft className="size-4" />
            Nyuma
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <IconApple className="size-4" />
            </div>
            <span className="text-lg font-bold">Tunda</span>
          </div>
        </div>
      </header>

      <div className="border-b bg-background px-4 py-3">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className={`size-3 rounded-full ${colors.from}`} />
              <h1 className="text-xl font-bold">{levelDisplay}</h1>
              <span className="text-xs text-muted-foreground">({allCards.length} watu)</span>
            </div>
            <div className="flex gap-2 rounded-lg bg-muted p-1">
              <button
                onClick={() => { setFilter("newest"); setPage(1) }}
                className={`flex-1 rounded-md px-4 py-1.5 text-xs font-medium transition-colors sm:flex-none ${
                  filter === "newest"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => { setFilter("top"); setPage(1) }}
                className={`flex-1 rounded-md px-4 py-1.5 text-xs font-medium transition-colors sm:flex-none ${
                  filter === "top"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Top Ranked
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {currentCards.map((card) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {filter === "top" && (
                  <div className="absolute right-1 top-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    #{card.rank}
                  </div>
                )}
                <div className={`absolute left-0 top-0 size-3 rounded-br-full ${colors.from}`} />
                <div className={`absolute right-0 bottom-0 size-3 rounded-tl-full ${colors.to}`} />
                <CardContent className="relative flex h-full items-end pt-2 pb-2">
                  <div className="w-full">
                    <p className="truncate text-xs font-bold text-white">{card.nickname}</p>
                    <p className="truncate text-[10px] text-white/70">{card.username}</p>
                  </div>
                </CardContent>
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

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <IconChevronLeft className="size-4" />
              Awali
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex size-8 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
              <IconChevronRight className="size-4" />
            </Button>
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
