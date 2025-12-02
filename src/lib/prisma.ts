// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// 1. Definiamo un tipo globale per lo scopo dell'istanza di Prisma Client.
// Questo è necessario per evitare che TypeScript si lamenti della variabile globale.
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// 2. Inizializziamo o riutilizziamo l'istanza di Prisma Client.
// Se l'istanza esiste già nella variabile globale, la riutilizziamo.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Aggiungi qui le opzioni di log se vuoi tracciare le query
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

// 3. In ambiente di sviluppo (Node.js), assegniamo l'istanza al globale
// per evitare che le istanze vengano ricreate ad ogni Hot Reload.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// L'API Route (es. /api/signup) deve solo importare ed usare questa istanza 'prisma'.