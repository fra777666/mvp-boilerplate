// src/app/api/auth/[...nextauth]/route.ts
// Endpoint di NextAuth.js
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

// NextAuth gestisce internamente tutte le richieste GET e POST
export { handler as GET, handler as POST }