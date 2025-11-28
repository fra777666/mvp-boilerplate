// src/components/wrappers/Avatar.tsx
// Wrapper dell'Avatar con logica per le iniziali.
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage, } from '@/components/ui/avatar' // Primitiva shadcn/ui

interface UserAvatarProps {
  src?: string | null
  alt: string
  fallbackText: string
  className?: string
}

// Helper per estrarre le iniziali
const getInitials = (name: string) => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function UserAvatar({ src, alt, fallbackText, className }: UserAvatarProps) {
  const initials = getInitials(fallbackText)
  
  return (
    <ShadcnAvatar className={className}> 
      <AvatarImage src={src || ''} alt={alt} />
      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
        {initials || '??'}
      </AvatarFallback>
    </ShadcnAvatar>
  )
}