import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { sanityClient } from '@/lib/sanity'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password')
          return null
        }

        try {
          const user = await sanityClient.fetch(
            `*[_type == "user" && email == $email][0]`,
            { email: credentials.email }
          )

          console.log('User found:', user ? 'Yes' : 'No')

          if (!user) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          console.log('Password valid:', isPasswordValid)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('Error in authorize function:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('Session callback called', { session, token })
      if (session.user) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)