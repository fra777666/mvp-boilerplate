// src/app/api/signup/route.ts
// API di registrazione: crea un nuovo utente con password hashata.
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { z } from 'zod' // Aggiunta Zod per la validazione

const SALT_ROUNDS = 10 

// Schema Zod per la validazione dell'input
const signupSchema = z.object({
  email: z.string().email('Email non valida.'),
  password: z.string().min(8, 'La password deve avere almeno 8 caratteri.'),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    
    // 1. Validazione input con Zod
    const validatedData = signupSchema.safeParse(json)
    if (!validatedData.success) {
      return NextResponse.json(
        { message: 'Errore di validazione.', errors: validatedData.error.issues },
        { status: 400 }
      )
    }

    const { email, password, name } = validatedData.data

    // 2. Verifica utente esistente
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Un utente con questa email esiste già.' },
        { status: 409 }
      )
    }

    // 3. Hashing password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // 4. Creazione utente
    const newUser = await prisma.user.create({
      data: {
        email,
        name: name || null,
        hashedPassword,
      },
      select: { id: true, email: true, name: true },
    })

    return NextResponse.json(
      { message: 'Registrazione completata con successo.', user: newUser },
      { status: 201 }
    )
  } catch (error) {
    console.error('Errore durante la registrazione:', error)
    return NextResponse.json(
      { message: 'Errore interno del server.' },
      { status: 500 }
    )
  }
}