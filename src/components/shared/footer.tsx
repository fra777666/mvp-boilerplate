// src/components/shared/footer.tsx
// Componente Footer semplice (Server Component)
import * as React from 'react'

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t bg-card py-4 text-center text-sm text-muted-foreground">
      <div className="container">
        &copy; {new Date().getFullYear()} NextAuth MVP
      </div>
    </footer>
  )
}