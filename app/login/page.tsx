"use client"

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const handleLogin = async () => {
    setLoading(true)
    try {
      await signIn('discord')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-6 py-3 rounded-md bg-accent text-primary font-semibold hover:bg-accent-light transition-colors disabled:opacity-50"
      >
        {loading ? 'Redirecting…' : 'Continue with Discord'}
      </button>
    </main>
  )
}