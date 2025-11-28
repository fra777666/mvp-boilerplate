// src/app/api/profile/route.ts
// API protetta per GET/PATCH dei dati utente.
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema Zod per la validazione dell'input PATCH
const profilePatchSchema = z.object({
  name: z.string().min(1, 'Il nome non può essere vuoto.').optional(),
  image: z.string().url('URL immagine non valido.').nullable().optional(),
}).partial()

// Funzione helper per la protezione
async function getAuthenticatedUserEmail() {
  const session = await getServerSession(authOptions)
  return session?.user?.email
}

// GET /api/profile
export async function GET() {
  const email = await getAuthenticatedUserEmail()
  if (!email) {
    return NextResponse.json({ message: 'Non autenticato.' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, image: true, createdAt: true },
    })

    if (!user) {
      return NextResponse.json({ message: 'Utente non trovato.' }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Errore interno del server.' }, { status: 500 })
  }
}

// PATCH /api/profile
export async function PATCH(req: Request) {
  const email = await getAuthenticatedUserEmail()
  if (!email) {
    return NextResponse.json({ message: 'Non autenticato.' }, { status: 401 })
  }

  try {
    const json = await req.json()
    
    // 1. Validazione input
    const validatedData = profilePatchSchema.safeParse(json)
    if (!validatedData.success) {
        return NextResponse.json(
            { message: 'Errore di validazione.', errors: validatedData.error.issues },
            { status: 400 }
        )
    }

    const { name, image } = validatedData.data

    if (!name && image === undefined) {
      return NextResponse.json({ message: 'Nessun dato valido da aggiornare.' }, { status: 400 })
    }
    
    // 2. Aggiornamento utente nel DB
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name: name !== undefined ? name : undefined,
        // Permette di settare l'immagine a null se inviato esplicitamente
        image: image !== undefined ? image : undefined, 
      },
      select: { id: true, name: true, email: true, image: true },
    })

    return NextResponse.json(
      { message: 'Profilo aggiornato con successo.', user: updatedUser },
      { status: 200 }
    )
  } catch (error) {
    console.error('Errore nell\'aggiornamento del profilo:', error)
    return NextResponse.json(
      { message: 'Errore interno del server.' },
      { status: 500 }
    )
  }
}