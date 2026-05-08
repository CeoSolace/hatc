import Link from 'next/link'
import { Bot, Brain, Clock3, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import Hero from '@/components/landing/Hero'
import FeatureCard from '@/components/landing/FeatureCard'

const features = [
  {
    icon: 'message',
    title: 'Clean AI chat',
    description: 'A fast, focused chat workspace built for real conversations, retries, copy actions and readable AI output.'
  },
  {
    icon: 'database',
    title: 'Saved history',
    description: 'Chats are built around persistent conversations, so users can return, rename, clean up and keep context.'
  },
  {
    icon: 'lock',
    title: 'Discord auth',
    description: 'Discord OAuth, protected dashboard routes and persistent sessions give Hatch Bot a proper SaaS foundation.'
  },
  {
    icon: 'code',
    title: 'Markdown + code',
    description: 'Responses are designed for creators and developers with markdown rendering and syntax highlighting support.'
  }
]

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-8 sm:grid-cols-3 md:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-glass backdrop-blur">
          <p className="text-2xl font-black text-white">Live</p>
          <p className="mt-1 text-sm text-gray-400">AI backend</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-glass backdrop-blur">
          <p className="text-2xl font-black text-white">Discord</p>
          <p className="mt-1 text-sm text-gray-400">Authentication</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center shadow-glass backdrop-blur">
          <p className="text-2xl font-black text-white">Render</p>
          <p className="mt-1 text-sm text-gray-400">Deployment</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-light">
            <Sparkles size={16} />
            Built to feel premium
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Everything a real AI SaaS needs
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2 md:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 shadow-glass">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
            <Bot size={24} />
          </div>

          <h2 className="text-3xl font-black text-white">
            Made for creators and teams
          </h2>

          <p className="mt-4 text-gray-400">
            Hatch Bot keeps the interface modern, responsive and simple while still giving users strong AI tooling.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white">
              <Zap size={18} className="text-accent-light" />
              Fast answers
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white">
              <ShieldCheck size={18} className="text-accent-light" />
              Protected access
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white">
              <Brain size={18} className="text-accent-light" />
              Smart context
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white">
              <Clock3 size={18} className="text-accent-light" />
              Faster workflow
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-accent/20 bg-accent/10 p-8 shadow-glass">
          <h3 className="text-2xl font-black text-white">
            Ready to use Hatch Bot?
          </h3>

          <p className="mt-4 text-gray-300">
            Jump into the dashboard and start chatting with the Hatch AI backend through a cleaner, redesigned interface.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-2xl bg-accent px-6 py-3 text-center font-bold text-primary transition hover:bg-accent-light"
            >
              Open Dashboard
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/15 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
            >
              View Access
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
