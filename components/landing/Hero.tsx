"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Hero() {
  const { data: session } = useSession()

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-24 md:px-8 md:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_25%)]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-light"
          >
            AI SaaS Platform • Discord Powered
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl"
          >
            Hatch Bot
            <span className="block bg-gradient-to-r from-accent via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              smarter AI chat
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg"
          >
            A modern AI workspace with conversation memory, markdown rendering, Discord authentication and a polished dashboard built for creators, communities and teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start"
          >
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-2xl bg-accent px-7 py-4 text-center font-bold text-primary transition hover:bg-accent-light"
              >
                Open Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-2xl bg-accent px-7 py-4 text-center font-bold text-primary transition hover:bg-accent-light"
              >
                Login with Discord
              </Link>
            )}

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 text-center font-bold text-white transition hover:bg-white/[0.08]"
            >
              Explore Platform
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl"
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1120] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-bold text-white">Hatch AI</p>
                <p className="text-xs text-gray-500">Connected to thehatch.store API</p>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                ONLINE
              </div>
            </div>

            <div className="space-y-4">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm font-medium text-primary">
                Build me a landing page for my startup.
              </div>

              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-gray-300">
                I can help with that. I’ll generate a modern structure with a hero section, feature grid, pricing layout and responsive design styling.
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                Streaming response...
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
