import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {

  providers: [
    DiscordProvider({
      clientId:
        process.env.DISCORD_CLIENT_ID || "",

      clientSecret:
        process.env.DISCORD_CLIENT_SECRET || ""
    })
  ],

  secret:
    process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  callbacks: {

    async jwt({
      token,
      profile
    }) {

      if (profile) {

        token.id =
          (profile as any).id

      }

      return token
    },

    async session({
      session,
      token
    }) {

      if (session.user) {

        ;(session.user as any).id =
          token.id

      }

      return session
    }
  }
}
