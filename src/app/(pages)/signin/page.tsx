// src/app/(pages)/signin/page.tsx
// Pagina di Login: Componente Client per l'autenticazione tramite Credenziali.
'use client'

import * as React from 'react'
import { Button } from '@/components/wrappers/Button'
import { FormInput } from '@/components/wrappers/FormInput'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Componente client per l'interazione del form
export default function SignInPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasSuccess = searchParams.get('success') === 'true'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Usa signIn di NextAuth.js
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      // Passa l'URL di destinazione se presente, altrimenti /dashboard
      callbackUrl: searchParams.get('callbackUrl') || '/dashboard', 
    })

    setIsLoading(false)

    if (result?.error) {
      console.error(result.error)
      setError('Credenziali non valide. Riprova.')
    } else if (result?.ok) {
      // Reindirizza l'utente dopo il successo
      router.push(result.url || '/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">Accedi al tuo Account</h2>

      {hasSuccess && (
         <div className="p-3 text-sm text-green-800 bg-green-100 rounded-lg">
            Registrazione avvenuta con successo! Effettua il login.
        </div>
      )}
      
      {error && (
        <div className="p-3 text-sm text-red-800 bg-red-100 rounded-lg">
          {error}
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
    </div>
  )
}