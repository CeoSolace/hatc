"use client"

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Bot } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
            <Bot size={22} />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-white">
              Hatch Bot
            </p>
            <p className="text-xs text-gray-500">
              AI SaaS Platform
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-sm md:gap-5">
          <Link href="/pricing" className="hidden text-gray-300 transition hover:text-white md:block">
            Pricing
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="rounded-xl bg-accent px-4 py-2 font-bold text-primary transition hover:bg-accent-light"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('discord')}
              className="rounded-xl bg-accent px-4 py-2 font-bold text-primary transition hover:bg-accent-light"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
