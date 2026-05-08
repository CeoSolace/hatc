import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { streamChat, ChatMessageInput } from "@/lib/chatApi"
import { consume } from "@/lib/rateLimiter"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string

  // 20 requests per minute
  const allowed = consume(userId, 20, 60_000)

  if (!allowed) {
    return NextResponse.json(
      { error: "Too Many Requests" },
      { status: 429 }
    )
  }

  let body: {
    conversationId?: string
    messages: ChatMessageInput[]
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    )
  }

  const { conversationId, messages } = body

  if (!messages || messages.length === 0) {
    return NextResponse.json(
      { error: "No messages provided" },
      { status: 400 }
    )
  }

  const lastMessage = messages[messages.length - 1]

  if (lastMessage.role !== "user") {
    return NextResponse.json(
      { error: "Last message must be from user" },
      { status: 400 }
    )
  }

  let convId = conversationId

  // Create conversation
  if (!convId) {
    const createdConversation =
      await prisma.conversation.create({
        data: {
          userId,
          title:
            lastMessage.content.slice(0, 48) ||
            "New Chat"
        }
      })

    convId = createdConversation.id
  }

  // Save user message
  await prisma.message.create({
    data: {
      conversationId: convId,
      role: "user",
      content: lastMessage.content,
      tokens: lastMessage.content.length
    }
  })

  // Stream response from Hatch API
  const remoteStream = await streamChat(messages)

  let assistantContent = ""

  const stream = new ReadableStream({
    async start(controller) {
      const reader = remoteStream.getReader()
      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } =
            await reader.read()

          if (done) break

          const chunk =
            decoder.decode(value)

          assistantContent += chunk

          controller.enqueue(value)
        }

        // Save assistant response
        await prisma.message.create({
          data: {
            conversationId: convId!,
            role: "assistant",
            content: assistantContent,
            tokens: assistantContent.length
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  })
}
