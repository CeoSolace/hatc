import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

import Sidebar from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const userId =
    session.user.id as string

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
        title: true
      }
    })

  return (
    <div className="flex h-full min-h-[calc(100vh-64px)]">
      <Sidebar
        conversations={conversations}
      />

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
