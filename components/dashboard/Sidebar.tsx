"use client"

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

interface Conversation {
  id: string
  title: string
}

export default function Sidebar({ conversations }: { conversations: Conversation[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const handleNewChat = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/conversations', { method: 'POST' })
      if (!res.ok) {
        console.error('Failed to create conversation')
        return
      }
      const conv = await res.json()
      router.push(`/dashboard/chat/${conv.id}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <aside className="hidden md:block w-64 border-r border-primary-light bg-primary-light/40 backdrop-blur-md px-4 py-6 overflow-y-auto">
      <button
        onClick={handleNewChat}
        disabled={loading}
        className="w-full mb-4 py-2 text-sm font-medium rounded-md bg-accent text-primary hover:bg-accent-light transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating…' : 'New Conversation'}
      </button>
      <nav className="space-y-1">
        {conversations.map((conv) => {
          const active = pathname?.includes(conv.id)
          return (
            <Link
              href={`/dashboard/chat/${conv.id}`}
              key={conv.id}
              className={`block px-3 py-2 rounded-md text-sm truncate ${active ? 'bg-accent text-primary' : 'hover:bg-primary dark:hover:bg-primary-light/50'}`}
            >
              {conv.title}
            </Link>
          )
        })}
        {conversations.length === 0 && (
          <p className="text-sm text-gray-500">No conversations yet</p>
        )}
      </nav>
    </aside>
  )
}