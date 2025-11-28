// src/components/wrappers/FormInput.tsx
// Componente Composto che unisce Label e Input di shadcn.
'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label' // Primitiva shadcn/ui
import { Input as ShadcnInput } from '@/components/ui/input' // Primitiva shadcn/ui

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, type = 'text', placeholder, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label> 
        <ShadcnInput
          type={type}
          id={id}
          placeholder={placeholder || `Inserisci ${label.toLowerCase()}`}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export { FormInput }