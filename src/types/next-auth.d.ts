// src/types/next-auth.d.ts

import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

/**
 * Estende le interfacce di NextAuth per aggiungere campi personalizzati
 * come l'ID utente (necessario per l'autorizzazione granulare e le chiamate API).
 */

declare module "next-auth" {
  // 1. Estende l'oggetto Session (il risultato di useSession() o getServerSession())
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]; // Unisce i tipi (ID + name, email, image)
  }
  
  // 2. Estende l'oggetto User (quello restituito dal provider Authorize)
  interface User {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
  }
}

declare module "next-auth/jwt" {
  // 3. Estende l'oggetto JWT (il token salvato nel browser)
  interface JWT extends DefaultJWT {
    id: string; // Aggiunge l'ID al token
    name: string | null;
    email: string;
    picture: string | null;
  }
}