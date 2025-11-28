// src/app/(pages)/signup/page.tsx
// Pagina di Registrazione: Componente Client per l'interazione del form.
'use client'

import * as React from 'react'
import { Button } from '@/components/wrappers/Button'
import { FormInput } from '@/components/wrappers/FormInput'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Componente client per gestire il form
export default function SignupPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Visualizza l'errore specifico (es. Email già in uso)
        setError(data.message || 'Errore durante la registrazione.')
        return
      }

      // Successo: reindirizza al login
      router.push('/signin?success=true')
    } catch (err) {
      console.error(err)
      setError('Errore di rete o del server.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">Crea un Account</h2>
      
      {error && (
        <div className="p-3 text-sm text-red-800 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Nome (Opzionale)"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {isLoading ? 'Registrazione...' : 'Registrati'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Hai già un account? <Link href="/signin" className="underline hover:text-primary">Accedi qui</Link>
      </p>
    </div>
  )
}