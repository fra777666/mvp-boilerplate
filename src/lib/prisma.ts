// src/lib/prisma.ts
// Istanza Singleton di PrismaClient per prevenire warning in sviluppo (hot reloading)
import { PrismaClient } from '@prisma/client'

// Previene la creazione di nuove istanze ad ogni hot reload in dev
declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient({
  log: ['warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}