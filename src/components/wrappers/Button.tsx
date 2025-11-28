// src/components/wrappers/Button.tsx
// Soluzione Pulita: Importa il componente e il tipo direttamente dal primitivo.
import * as React from 'react'
// Importiamo il componente (come ShadcnButton) e il tipo (ButtonProps)
import { 
  Button as ShadcnButton, 
  ButtonProps // Ora disponibile grazie alla modifica nel Passo 1
} from '@/components/ui/button' 

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    // Aggiungi qui eventuali classi o logica comune
    return <ShadcnButton ref={ref} {...props} /> 
  }
)
Button.displayName = 'Button'

export { Button }