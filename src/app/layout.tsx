// src/app/layout.tsx
// Root Layout: Imposta metadati, font, e avvolge l'app con AppLayout (incl. SessionProvider).
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Importa gli stili globali
import { AppLayout } from '@/components/wrappers/Layout' // Importa il wrapper client

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'NextAuth MVP Boilerplate',
  description: 'Progetto MVP con Next.js App Router, NextAuth, Prisma e shadcn/ui',
}

// Server Component Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {/* AppLayout è un componente client che fornisce la SessionProvider */}
        <AppLayout>
            {children}
        </AppLayout>
      </body>
    </html>
  )
}