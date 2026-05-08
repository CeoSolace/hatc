"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { marked } from "marked"
import hljs from "highlight.js"
import he from "he"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ConversationResponse {
  id: string
  title: string
  messages: {
    role: string
    content: string
  }[]
}

marked.setOptions({
  breaks: true,
  gfm: true
})

function renderMarkdown(content: string) {
  const decoded = he.decode(content)

  const html = marked.parse(decoded) as string

  return html.replace(
    /<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const validLang = hljs.getLanguage(lang)
        ? lang
        : "plaintext"

      const highlighted = hljs.highlight(
        he.decode(code),
        {
          language: validLang
        }
      ).value

      return `
<div class="relative group my-4">
  <button
    onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText)"
    class="
      absolute right-3 top-3
      rounded-lg border border-zinc-700
      bg-zinc-900 px-2 py-1 text-xs text-zinc-300
      opacity-0 transition group-hover:opacity-100
    "
  >
    Copy
  </button>

  <pre class="
    overflow-x-auto
    rounded-2xl
    border border-zinc-800
    bg-black/40
    p-4
    text-sm
  ">
    <code class="hljs language-${validLang}">
${highlighted}
    </code>
  </pre>
</div>
      `
    }
  )
}

export default function Chat({
  conversationId
}: {
  conversationId: string
}) {
  const router = useRouter()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("New Chat")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadConversation() {
      const response = await fetch(
        `/api/conversations/${conversationId}`
      )

      if (!response.ok) return

      const data: ConversationResponse =
        await response.json()

      setTitle(data.title || "New Chat")

      setMessages(
        data.messages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }))
      )
    }

    loadConversation()
  }, [conversationId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: "user",
      content: input
    }

    const updatedMessages = [
      ...messages,
      userMessage
    ]

    setMessages([
      ...updatedMessages,
      {
        role: "assistant",
        content: ""
      }
    ])

    setInput("")
    setLoading(true)

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            conversationId,
            messages: updatedMessages
          })
        }
      )

      const text = await response.text()

      let parsed: any = null

      try {
        parsed = JSON.parse(text)
        console.log("Hatch API Response:", parsed)
      } catch {
        parsed = null
      }

      const assistantMessage =
        parsed?.response ??
        parsed?.message ??
        parsed?.content ??
        parsed?.reply ??
        text ??
        "Hatch Bot failed to respond."

      setMessages((prev) => {
        const clone = [...prev]

        clone[clone.length - 1] = {
          role: "assistant",
          content: assistantMessage
        }

        return clone
      })
    } catch (err) {
      console.error(err)

      setMessages((prev) => {
        const clone = [...prev]

        clone[clone.length - 1] = {
          role: "assistant",
          content: "Hatch Bot failed to respond."
        }

        return clone
      })
    } finally {
      setLoading(false)
    }
  }

  async function clearConversation() {
    await fetch(
      `/api/conversations/${conversationId}`,
      {
        method: "DELETE"
      }
    )

    router.push("/dashboard")
  }

  return (
    <div className="flex h-full flex-col bg-[#0b1020] text-white">
      <div className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0b1020]/80 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {title}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Hatch Bot by ItsNicBtw
            </p>
          </div>

          <button
            onClick={clearConversation}
            className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
          >
            Clear Chat
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-3xl px-5 py-4 text-sm shadow-lg ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-black font-medium"
                    : "border border-zinc-800 bg-zinc-900/90 shadow-black/20"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div
                    className="
                      prose prose-invert max-w-none
                      prose-pre:bg-transparent
                      prose-pre:p-0
                      prose-code:text-white
                      overflow-hidden
                    "
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(msg.content)
                    }}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {msg.content}
                  </p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 px-5 py-4">
                <div className="flex items-center gap-1 text-zinc-400">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce delay-100">•</span>
                  <span className="animate-bounce delay-200">•</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-[#0b1020]/90 backdrop-blur-xl px-6 py-5">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="mx-auto flex max-w-5xl gap-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Hatch Bot..."
            rows={1}
            className="flex-1 resize-none rounded-3xl border border-zinc-800 bg-zinc-900/90 px-5 py-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  )
}
