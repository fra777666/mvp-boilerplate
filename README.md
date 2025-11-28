This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🚀 NextAuth MVP Boilerplate (Next.js App Router - (pages) Convention)

Questo boilerplate utilizza l'architettura App Router con il raggruppamento `(pages)/` per le pagine principali.

## Istruzioni di Setup

### 1. Installazione e Inizializzazione

```bash
# 1. Installa tutte le dipendenze (vedi package.json per la lista completa)
npm install

# 2. Inizializza shadcn/ui (richiesto prima di avviare)
# Se non lo hai già fatto, usa:
npx shadcn@latest init
# Installa i componenti usati:
npx shadcn@latest add button input card avatar
```

mvp/
├── .next/
├── node_modules/
├── prisma/
│   └── schema.prisma                # Schema Prisma (User model)
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   |   └── [...nextauth]/
│   │   │   |       └── route.ts     # NextAuth API
│   │   │   ├── profile/
│   │   │   |   └── route.ts         # API GET/PATCH profilo utente
│   │   │   └── signup/
│   │   │       └── route.ts         # API di registrazione
│   │   ├── (pages)/
│   │   │   ├── dashboard/
│   │   │   |   └── page.tsx         # Pagina protetta
│   │   │   ├── profile/
│   │   │   |   └── page.tsx         # Pagina protetta di gestione profilo
│   │   │   ├── signin/
│   │   │   |   └── page.tsx         # Pagina di Login
│   │   │   └── signup/
│   │   │       └── page.tsx         # Pagina di Registrazione
│   │   ├── layout.tsx               # Root Layout
│   │   ├── page.tsx                 # Pagina Home (pubblica)
│   │   └── global.css                
│   ├── components/
│   │   ├── shared/                  # Componenti condivisi dalle pagine (Header, Footer)
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/                      # Primitive shadcn/ui (generate automaticamente)
│   │   │   ├── avatar.tsx           # Componente Avatar 
│   │   │   ├── button.tsx           # Componente Button 
│   │   │   ├── card.tsx             # Componente Card 
│   │   │   ├── input.tsx            # Componente Input 
│   │   │   └── label.tsx            # Componente Label
|   |   └── wrappers/                # Componenti Wrapper/Composti
│   │       ├── Avatar.tsx           # (Wrapper per logica iniziali)
│   │       ├── Button.tsx           # (Wrapper per Button primitivo)
│   │       ├── FormInput.tsx        # (Componente composto Input + Label)
│   │       └── Layout.tsx           # (Wrapper App con SessionProvider)
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── auth.ts                  # Configurazione NextAuth (NextAuthOptions)
│   │   └── prisma.ts                # Istanza Singleton di PrismaClient
|   └── types/                       # 🆕 Nuova Cartella per Dichiarazioni di Tipo
│       └── next-auth.d.ts           # Dichiarazioni per estendere Session e JWT
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── middleware.ts                    # Protezione delle rotte
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json