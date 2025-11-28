// src/lib/auth.ts
// Configurazione principale per NextAuth.js
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  // Configura l'Adapter, necessario anche se usiamo JWT per sincronizzare l'utente
  adapter: PrismaAdapter(prisma),
  
  // Usa JWT per la session strategy: scalabile e stateless
  session: {
    strategy: 'jwt',
  },
  
  // Pagine di routing personalizzate
  pages: {
    signIn: '/signin',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        // 1. Cerca l'utente nel DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) return null

        // 2. Verifica la password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (isPasswordValid) {
          // Ritorna l'oggetto utente da salvare nel token JWT
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        }
        return null // Credenziali non valide
      },
    }),
  ],

  // Callback per estendere il token JWT e la sessione
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Aggiungi l'ID e i dati principali dell'utente al token
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Estendi l'oggetto sessione con i dati del token
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
  },
}