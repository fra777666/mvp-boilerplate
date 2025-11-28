// src/components/wrappers/Layout.tsx
// Root Layout Wrapper (Componente Client per NextAuth Session Provider)
'use client'

import * as React from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
// Importa Header e Footer dalla cartella shared
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <NextAuthSessionProvider>
      <div className="flex items-center justify-center flex-col  min-h-screen bg-background">
        <Header /> 
        
        <main className="flex-1 container py-8">
            {children}
        </main>
        
        <Footer /> 
      </div>
    </NextAuthSessionProvider>
  )
}