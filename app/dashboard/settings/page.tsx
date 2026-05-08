import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"

export default async function SettingsPage() {

  const session: any =
    await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Settings
      </h1>

      <p className="text-gray-400">
        Settings functionality coming soon.
      </p>
    </div>
  )
}
