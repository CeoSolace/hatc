import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export const runtime = "nodejs"

// GET conversation
export async function GET(
  req: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string
  const { id } = params

  const conversation =
    await prisma.conversation.findFirst({
      where: {
        id,
        userId
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    })

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(conversation)
}

// RENAME conversation
export async function PATCH(
  req: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string
  const { id } = params

  const body = await req.json()

  const title =
    body.title || "Untitled Chat"

  const updated =
    await prisma.conversation.updateMany({
      where: {
        id,
        userId
      },
      data: {
        title
      }
    })

  if (updated.count === 0) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true
  })
}

// DELETE conversation
export async function DELETE(
  req: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const userId = session.user.id as string
  const { id } = params

  await prisma.message.deleteMany({
    where: {
      conversationId: id
    }
  })

  const deleted =
    await prisma.conversation.deleteMany({
      where: {
        id,
        userId
      }
    })

  if (deleted.count === 0) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true
  })
}
