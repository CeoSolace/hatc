import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export const runtime = "nodejs"

// GET all conversations
export async function GET() {
  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string

  const conversations =
    await prisma.conversation.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc"
      },
      select: {
        id: true,
        title: true,
        updatedAt: true
      }
    })

  return NextResponse.json(
    conversations
  )
}

// CREATE conversation
export async function POST(req: Request) {
  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string

  let body: any = {}

  try {
    body = await req.json()
  } catch {}

  const conversation =
    await prisma.conversation.create({
      data: {
        userId,
        title:
          body.title || "New Chat"
      }
    })

  return NextResponse.json(
    conversation
  )
}
