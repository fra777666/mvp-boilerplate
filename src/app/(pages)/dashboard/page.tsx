// src/app/(pages)/dashboard/page.tsx
// Pagina Dashboard: Server Component (protetta dal middleware).
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/wrappers/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card' 
import { UserAvatar } from '@/components/wrappers/Avatar'
import Link from 'next/link'

// Server Component (nessun 'use client')
export default async function DashboardPage() {
  // Ottieni i dati della sessione lato Server per SSR
  const session = await getServerSession(authOptions)
  const user = session?.user

  // Il middleware dovrebbe aver già bloccato gli accessi non autorizzati,
  // ma questo è un fallback di sicurezza.
  if (!user) {
    return (
      <Card className="text-center p-8">
        <h2 className="text-2xl font-bold">Accesso Negato</h2>
        <p className="text-muted-foreground">Sessione non trovata. Torna al <Link href="/signin" className="underline">Login</Link>.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <CardHeader>
        <CardTitle className="text-3xl">👋 Dashboard</CardTitle>
        <p className="text-muted-foreground">Area riservata, protetta dal middleware di Next.js.</p>
      </CardHeader>
      
      <CardContent className="flex items-center space-x-4 border-t pt-4">
        <UserAvatar
          src={user.image}
          alt={user.name || user.email || 'Utente'}
          fallbackText={user.name || user.email || 'N/A'}
          className="h-12 w-12"
        />
        <div className="space-y-1">
          <p className="text-xl font-medium">{user.name || 'Nome non impostato'}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>

      <CardContent className="border-t pt-4">
        <h3 className="text-xl font-semibold mb-4">La Tua Sessione</h3>
        <pre className="overflow-x-auto p-4 bg-muted rounded-md text-sm">
          {/* Mostra i dati della sessione per verifica */}
          {JSON.stringify(session, null, 2)}
        </pre>
      </CardContent>
      
      <div className="flex justify-start border-t pt-4">
        <Link href="/profile">
            <Button>Aggiorna Profilo</Button>
        </Link>
      </div>
    </div>
  )
}