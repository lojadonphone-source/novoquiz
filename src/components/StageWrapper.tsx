import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StageWrapperProps {
  children: ReactNode
  className?: string
}

export function StageWrapper({ children, className }: StageWrapperProps) {
  return (
    <div
      className={cn(
        'flex flex-col w-full max-w-[600px] mx-auto px-4 py-8 md:py-12 animate-fade-in-up',
        className,
      )}
    >
      {children}
    </div>
  )
}
