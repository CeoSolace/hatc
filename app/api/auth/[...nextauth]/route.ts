import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// NextAuth handles both GET and POST requests for authentication
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }