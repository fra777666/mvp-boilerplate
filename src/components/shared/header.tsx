// src/components/shared/header.tsx
// Header (navbar) che gestisce i link e lo stato di autenticazione.
'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/wrappers/Button'
import { UserAvatar } from '@/components/wrappers/Avatar'

// Componente Client (usa useSession)
export function Header() {
  const { data: session, status } = useSession()

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'
  const user = session?.user

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card flex items-center justify-center">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          NextAuth MVP
        </Link>

        {/* Navigazione */}
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          {isAuthenticated && (
            <Link href="/profile" className="text-sm font-medium hover:text-primary">
              Profilo
            </Link>
          )}
        </nav>

        {/* Stato Utente / Autenticazione */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Caricamento...</p>
          ) : isAuthenticated ? (
            <>
              <UserAvatar
                src={user?.image}
                alt={user?.name || 'Utente'}
                fallbackText={user?.name || user?.email || 'N/A'}
                className="h-8 w-8"
              />
              <Button 
                  onClick={() => signOut({ callbackUrl: '/signin' })} 
                  variant="destructive"
                  size="sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" size="sm">Registrati</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}