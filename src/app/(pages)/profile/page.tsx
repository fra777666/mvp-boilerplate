// src/app/(pages)/profile/page.tsx
// Pagina di Gestione Profilo: Componente Client per l'aggiornamento dei dati.
'use client'

import * as React from 'react'
import { Button } from '@/components/wrappers/Button'
import { FormInput } from '@/components/wrappers/FormInput'
import { UserAvatar } from '@/components/wrappers/Avatar'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { z } from 'zod'

// Interfaccia per i dati del profilo
interface ProfileData {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: string
}

// Schema di validazione lato client
const clientProfileSchema = z.object({
  name: z.string().min(1, 'Il nome è obbligatorio.'),
  image: z.string().url('URL non valido.').or(z.literal('')).nullable(),
})

export default function ProfilePage() {
  // update() è fondamentale per aggiornare la sessione dopo il PATCH
  const { data: session, status, update } = useSession() 
  const [profile, setProfile] = React.useState<ProfileData | null>(null)
  const [name, setName] = React.useState('')
  const [image, setImage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const userEmail = session?.user?.email

  // 1. Fetch dei dati del profilo
  React.useEffect(() => {
    if (status !== 'authenticated' || !userEmail) {
        setIsLoading(false)
        return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile')
        if (res.ok) {
          const data: ProfileData = await res.json()
          setProfile(data)
          setName(data.name || '')
          setImage(data.image || '')
        } else {
            setError('Impossibile caricare il profilo.')
        }
      } catch (err) {
        setError('Errore di rete durante il caricamento.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [status, userEmail])

  // 2. Gestione dell'aggiornamento (PATCH /api/profile)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validazione Client-Side
    const validationResult = clientProfileSchema.safeParse({ name, image: image || null })
    if (!validationResult.success) {
        setError(validationResult.error.issues[0].message)
        return
    }

    setIsUpdating(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image: image || null }),
      })

      const data = await response.json()

      if (response.ok) {
        // Aggiorna la sessione lato client per la coerenza immediata della UI
        await update({ name, image: image || null })
        setProfile(p => p ? { ...p, name, image: image || null } : null)
        alert('Profilo aggiornato con successo.')
      } else {
        setError(data.message || 'Aggiornamento fallito.')
      }
    } catch (err) {
      setError('Errore di rete/server durante l\'aggiornamento.')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading || status === 'loading') {
    return <Card className="p-8 text-center">Caricamento dati profilo...</Card>
  }
  
  if (!profile || status !== 'authenticated') {
    return <Card className="p-8 text-center text-red-500">Errore: Non autenticato o impossibile caricare il profilo.</Card>
  }

  const isFormUnchanged = name === profile.name && image === (profile.image || '')

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center">Gestione Profilo</h2>
      </CardHeader>

      <CardContent>
        {/* Visualizzazione avatar/email corrente */}
        <div className="flex flex-col items-center space-y-4 border-b pb-6 mb-6">
          <UserAvatar
            src={profile.image}
            alt={profile.name || 'Utente'}
            fallbackText={profile.name || profile.email}
            className="h-20 w-20"
          />
          <p className="text-sm font-semibold text-muted-foreground">{profile.email}</p>
        </div>

        {error && (
            <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
                {error}
            </div>
        )}

        {/* Form di aggiornamento */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <FormInput
            id="name"
            label="Nome Completo"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            id="image"
            label="URL Avatar"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <FormInput
            id="email-display"
            label="Email (Non Modificabile)"
            type="email"
            value={profile.email}
            disabled
            className="text-muted-foreground"
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isUpdating || isFormUnchanged}
          >
            {isUpdating ? 'Aggiornamento...' : 'Salva Modifiche'}
          </Button>
        </form>
      </CardContent>
    </div>
  )
}