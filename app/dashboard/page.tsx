import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"

export default async function DashboardHomePage() {

  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome back
      </h1>

      <p className="text-gray-400 max-w-md">
        Select a conversation from the sidebar
        or create a new one to start chatting
        with Hatch Bot.
      </p>
    </div>
  )
}
