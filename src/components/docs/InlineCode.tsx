import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function C({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <code
      className={cn(
        'rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground',
        className,
      )}
    >
      {children}
    </code>
  )
}
