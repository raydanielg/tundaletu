"use client"

import { useState, useRef, useEffect } from "react"
import {
  IconApple,
  IconArrowLeft,
  IconSend,
  IconPhoto,
  IconCircleFilled,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react"
import { cn } from "@workspace/ui/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar"
import { useAuth } from "@/components/auth-provider"
import { usePayment } from "@/components/payment-provider"
import { PaymentModal } from "@/components/payment-modal"
import { IconLock } from "@tabler/icons-react"

type User = {
  id: number
  nickname: string
  username: string
  avatar: string
  online: boolean
  lastSeen: string
}

type Message = {
  id: number
  senderId: number
  text?: string
  image?: string
  time: string
}

const users: User[] = [
  { id: 1, nickname: "Amminey", username: "@amminey01", avatar: "https://i.pravatar.cc/150?img=1", online: true, lastSeen: "sasa" },
  { id: 2, nickname: "Johari", username: "@johari22", avatar: "https://i.pravatar.cc/150?img=2", online: true, lastSeen: "sasa" },
  { id: 3, nickname: "Mzizi", username: "@mzizi45", avatar: "https://i.pravatar.cc/150?img=3", online: false, lastSeen: "dakika 5 zilizopita" },
  { id: 4, nickname: "Babu", username: "@babu77", avatar: "https://i.pravatar.cc/150?img=4", online: true, lastSeen: "sasa" },
  { id: 5, nickname: "Simba", username: "@simba12", avatar: "https://i.pravatar.cc/150?img=5", online: false, lastSeen: "saa 2 zilizopita" },
  { id: 6, nickname: "Neema", username: "@neema88", avatar: "https://i.pravatar.cc/150?img=6", online: true, lastSeen: "sasa" },
  { id: 7, nickname: "Zawadi", username: "@zawadi33", avatar: "https://i.pravatar.cc/150?img=7", online: false, lastSeen: "jana" },
  { id: 8, nickname: "Rehema", username: "@rehema55", avatar: "https://i.pravatar.cc/150?img=8", online: true, lastSeen: "sasa" },
  { id: 9, nickname: "Juma", username: "@juma99", avatar: "https://i.pravatar.cc/150?img=9", online: false, lastSeen: "dakika 30 zilizopita" },
  { id: 10, nickname: "Halima", username: "@halima14", avatar: "https://i.pravatar.cc/150?img=10", online: true, lastSeen: "sasa" },
]

const initialMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 1, text: "Mambo vipi?", time: "10:30" },
    { id: 2, senderId: 0, text: "Poa sana, wewe je?", time: "10:31" },
    { id: 3, senderId: 1, text: "Mimi pia poa. Umeonaje card zangu?", time: "10:32" },
  ],
  2: [
    { id: 1, senderId: 2, text: "Nimefurahi kukutana na wewe hapa", time: "09:15" },
    { id: 2, senderId: 0, text: "Mimi pia! Tunda ni jukwaa zuri sana", time: "09:16" },
  ],
  4: [
    { id: 1, senderId: 4, text: "Habari za asubuhi?", time: "08:00" },
    { id: 2, senderId: 0, text: "Nzuri sana, asante!", time: "08:05" },
    { id: 3, senderId: 4, text: "Tukupe mara moja?", time: "08:06" },
  ],
  6: [
    { id: 1, senderId: 6, text: "Umependa profile yangu?", time: "14:20" },
    { id: 2, senderId: 0, text: "Ndiyo, imekuwa nzuri sana!", time: "14:22" },
  ],
  8: [
    { id: 1, senderId: 8, text: "Hujambo?", time: "16:00" },
  ],
  10: [
    { id: 1, senderId: 10, text: "Vipi umeshindaje?", time: "12:30" },
    { id: 2, senderId: 0, text: "Niko sawa, nafanya kazi tu", time: "12:35" },
  ],
}

const currentUser = { id: 0, nickname: "Wewe", username: "@me", avatar: "https://i.pravatar.cc/150?img=12" }

export default function ChatPage() {
  const { user, loading } = useAuth()
  const { payment } = usePayment()
  const [showPayment, setShowPayment] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages)
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onlineUsers = users.filter((u) => u.online)

  const filteredUsers = users.filter((u) =>
    u.nickname.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  const currentMessages = selectedUser ? messages[selectedUser.id] ?? [] : []

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages])

  const sendMessage = (text?: string, image?: string) => {
    if (!selectedUser || (!text && !image)) return
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
    const newMsg: Message = {
      id: Date.now(),
      senderId: 0,
      text,
      image,
      time,
    }
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] ?? []), newMsg],
    }))
    setInput("")

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        senderId: selectedUser.id,
        text: ["Sawa!", "Nimeelewa", "Asante kwa message", "Niko online sasa", "Tutaongea zaidi"][Math.floor(Math.random() * 5)],
        time,
      }
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] ?? []), reply],
      }))
    }, 1500 + Math.random() * 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      sendMessage(undefined, reader.result as string)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  if (loading) {
    return (
      <div className="flex h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconLock className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold">Inahitaji Kuingia</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Unahitaji kuingia akaunti yako ya Tunda ili kuona na kutumia chat. Tafadhali ingia au jiunge.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <a
              href="/login"
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ingia Akaunti
            </a>
            <a
              href="/signup"
              className="flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Jiunge Sasa
            </a>
          </div>
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            &larr; Rudi Nyumbani
          </a>
        </div>
      </div>
    )
  }

  if (!payment.hasPaid) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <IconLock className="size-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold">Inahitaji Mujiuko</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Chat imefungwa. Unahitaji kulipia mujiuko wa Tunda ili kuongea na watu wengine.
            </p>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Lipia Mujiuko Sasa
          </button>
          <a href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Angalia Dashboard
          </a>
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            &larr; Rudi Nyumbani
          </a>
        </div>
        <PaymentModal open={showPayment} onClose={() => setShowPayment(false)} reason="Lipia mujiuko ili kufungua chat na kuongea na watu wote." />
      </div>
    )
  }

  return (
    <div className="flex h-svh flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background/95 px-4 py-3 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          {selectedUser && (
            <button
              onClick={() => { setSelectedUser(null); setShowSidebar(true) }}
              className="sm:hidden"
            >
              <IconArrowLeft className="size-5" />
            </button>
          )}
          <a href="/" className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <IconApple className="size-4" />
            </div>
            <span className="text-lg font-bold">Tunda</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <IconCircleFilled className="size-2 text-primary" />
            <span className="text-xs font-medium text-primary">{onlineUsers.length} Online</span>
          </div>
          <a href="/dashboard" className="hidden sm:block">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <IconUsers className="size-4" />
            </button>
          </a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={cn(
          "flex-col border-r bg-background w-full sm:w-80 shrink-0",
          selectedUser ? "hidden sm:flex" : "flex",
          !showSidebar && "hidden sm:flex"
        )}>
          <div className="p-3 border-b">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tafuta mtu..."
                className="w-full rounded-lg bg-muted py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => {
              const userMsgs = messages[user.id] ?? []
              const lastMsg = userMsgs[userMsgs.length - 1]
              return (
                <button
                  key={user.id}
                  onClick={() => { setSelectedUser(user); setShowSidebar(false) }}
                  className={cn(
                    "flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50",
                    selectedUser?.id === user.id && "bg-muted"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar className="size-11">
                      <AvatarImage src={user.avatar} alt={user.nickname} />
                      <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                    </Avatar>
                    {user.online && (
                      <span className="absolute right-0 bottom-0 size-3 rounded-full bg-primary border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-bold">{user.nickname}</p>
                      {lastMsg && (
                        <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{lastMsg.time}</span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {lastMsg?.text ?? (lastMsg?.image ? "Picha" : user.online ? "Online" : user.lastSeen)}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat Area */}
        {selectedUser ? (
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b bg-background px-4 py-3 shrink-0">
              <Avatar className="size-10">
                <AvatarImage src={selectedUser.avatar} alt={selectedUser.nickname} />
                <AvatarFallback>{selectedUser.nickname[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-bold">{selectedUser.nickname}</p>
                <div className="flex items-center gap-1">
                  {selectedUser.online ? (
                    <>
                      <IconCircleFilled className="size-2 text-primary" />
                      <span className="text-xs text-primary">Online</span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">Mara ya mwisho: {selectedUser.lastSeen}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted/30">
              {currentMessages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-muted mb-3">
                    <IconUsers className="size-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Hakuna message bado</p>
                  <p className="text-xs text-muted-foreground mt-1">Anza kuzungumza na {selectedUser.nickname}</p>
                </div>
              )}
              {currentMessages.map((msg) => {
                const isMe = msg.senderId === 0
                return (
                  <div
                    key={msg.id}
                    className={cn("flex", isMe ? "justify-end" : "justify-start")}
                  >
                    <div className={cn(
                      "max-w-[75%] rounded-2xl px-3 py-2",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-background border rounded-bl-md"
                    )}>
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Picha iliyoshirwa"
                          className="mb-1 max-h-48 rounded-lg object-cover"
                        />
                      )}
                      {msg.text && (
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      )}
                      <p className={cn(
                        "mt-0.5 text-[10px]",
                        isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t bg-background p-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <IconPhoto className="size-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && input.trim()) {
                      sendMessage(input.trim())
                    }
                  }}
                  placeholder="Andika ujumbe..."
                  className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => input.trim() && sendMessage(input.trim())}
                  disabled={!input.trim()}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity"
                >
                  <IconSend className="size-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden flex-1 flex-col items-center justify-center text-center sm:flex">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted mb-4">
              <IconPhoto className="size-10 text-muted-foreground" />
            </div>
            <p className="text-base font-bold">Karibu kwenye Tunda Chat</p>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              Chagua mtu kutoka kushoto kuanza kuzungumza. Unaweza kutuma ujumbe na kushare picha.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
