// src/app/page.tsx
// Pagina Home (pubblica): Server Component di benvenuto.
import Link from 'next/link'
import { Button } from '@/components/wrappers/Button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <Card className='p-8'>
        <CardContent className="flex flex-col items-center justify-center space-y-6 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
                Benvenuto nel tuo <span className="text-primary">NextAuth MVP</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
                Questo boilerplate completo con **Next.js App Router**, **NextAuth**, **Prisma** e **shadcn/ui** è pronto per la validazione del tuo prodotto.
            </p>
            
            <div className="flex space-x-4 pt-4">
                <Link href="/dashboard">
                <Button size="lg" variant="default">
                    Vai alla Dashboard
                </Button>
                </Link>
                <Link href="/signup">
                <Button size="lg" variant="secondary">
                    Inizia Subito
                </Button>
                </Link>
            </div>
        </CardContent>
    </Card>
  )
}