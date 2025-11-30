// src/components/auth/ClientSignInForm.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/wrappers/Button'
import { FormInput } from '@/components/wrappers/FormInput'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Mappa degli errori di NextAuth (stessa che avevamo definito)
const errorMap: { [key: string]: string } = {
  CredentialsSignin: 'Credenziali non valide. Controlla email e password.',
  default: 'Si è verificato un errore durante l\'accesso. Riprova.',
}

export function ClientSignInForm() { // Export come funzione normale
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  
  // LOGICA DINAMICA (che causa l'errore)
  const searchParams = useSearchParams()
  const hasSuccess = searchParams.get('success') === 'true'
  const nextAuthErrorParam = searchParams.get('error')
  const displayError = nextAuthErrorParam
    ? errorMap[nextAuthErrorParam] || errorMap.default
    : null
  // FINE LOGICA DINAMICA
  
  const handleSubmit = async (e: React.FormEvent) => {
    // ... (Logica handleSubmit identica a prima) ...
    e.preventDefault()
    setIsLoading(true)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: searchParams.get('callbackUrl') || '/dashboard', 
    })

    setIsLoading(false)

    if (result?.error) {
      router.push(`/signin?error=${result.error}&callbackUrl=${searchParams.get('callbackUrl') || ''}`);
    } else if (result?.ok) {
      router.push(result.url || '/dashboard')
    }
  }

  return (
    <>
      {hasSuccess && (
         <div className="p-3 text-sm text-green-800 bg-green-100 rounded-lg">
            Registrazione avvenuta con successo! Effettua il login.
        </div>
      )}
      
      {displayError && (
        <div className="p-3 text-sm text-red-800 bg-red-100 rounded-lg">
          {displayError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
            id="password"
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Accesso in corso...' : 'Accedi'}
        </Button>
      </form>
      
      <p className="text-center text-sm text-muted-foreground">
        Non hai un account? <Link href="/signup" className="underline hover:text-primary">Registrati qui</Link>
      </p>
    </>
  )
}