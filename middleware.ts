// middleware.ts
// Protegge le rotte specificate (/dashboard, /profile) e reindirizza gli autenticati da /signin, /signup
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Percorsi protetti: richiedono un token di sessione valido
const protectedPaths = [
  '/dashboard',
  '/profile',
]

export default withAuth(
  function middleware(req) {
    // Se autenticato, impedisce l'accesso a /signin e /signup
    const isAuthPage = req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/signup')
    
    if (req.nextauth.token && isAuthPage) {
      // Reindirizza l'utente autenticato a /dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // Altri handler specifici...
  },
  {
    callbacks: {
      // Logica di autorizzazione per le rotte protette
      authorized: ({ token, req }) => {
        const isProtected = protectedPaths.some((path) =>
          req.nextUrl.pathname.startsWith(path)
        )
        // Se la rotta è protetta, richiede un token
        if (isProtected) {
          return !!token
        }
        // Rotte non protette o autenticazione riuscita
        return true
      },
    },
    // Specifica la pagina di login
    pages: {
      signIn: '/signin',
    },
  }
)

export const config = {
  // Applica il middleware a tutte le pagine di autenticazione e protette
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/signin',
    '/signup',
  ],
}