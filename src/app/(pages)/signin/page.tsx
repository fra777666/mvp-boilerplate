// src/app/(pages)/signin/page.tsx
// Server Component per il layout statico
import { Suspense } from 'react';
import { ClientSignInForm } from '@/components/auth/clientSignInForm';

// Componente principale della pagina
export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center">Accedi al tuo Account</h2>

      {/* ⚠️ Risoluzione: Avvolgi il componente che usa useSearchParams in Suspense */}
      <Suspense fallback={<div>Caricamento form di accesso...</div>}>
        <ClientSignInForm />
      </Suspense>

    </div>
  )
}