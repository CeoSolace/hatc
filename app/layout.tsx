import "@/app/globals.css"

import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import AuthSessionProvider
from "@/components/providers/SessionProvider"

import Navbar from "@/components/ui/Navbar"

export const metadata = {
  title: "Hatch Bot",
  description:
    "AI assistant SaaS platform powered by Hatch"
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session: any =
    await getServerSession(authOptions)

  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen bg-primary text-gray-100">

        <AuthSessionProvider session={session}>

          <Navbar />

          <div className="flex-1 flex flex-col overflow-auto">
            {children}
          </div>

        </AuthSessionProvider>

      </body>
    </html>
  )
}
