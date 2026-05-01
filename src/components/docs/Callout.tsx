import type { ReactNode } from 'react'
import { AlertTriangle, Info, Lightbulb, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'note' | 'tip' | 'warn' | 'exam'

const STYLES: Record<
  Variant,
  { icon: typeof Info; classes: string; label: string }
> = {
  note: {
    icon: Info,
    classes: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-300',
    label: 'Note',
  },
  tip: {
    icon: Lightbulb,
    classes:
      'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300',
    label: 'Tip',
  },
  warn: {
    icon: AlertTriangle,
    classes:
      'border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-300',
    label: 'Pitfall',
  },
  exam: {
    icon: Sparkles,
    classes: 'border-swift-500/40 bg-swift-500/5 text-swift-600 dark:text-swift-300',
    label: 'Key',
  },
}

export function Callout({
  variant = 'note',
  children,
  title,
}: {
  variant?: Variant
  children: ReactNode
  title?: string
}) {
  const cfg = STYLES[variant]
  const Icon = cfg.icon
  return (
    <div
      className={cn(
        'my-4 flex gap-3 rounded-lg border p-4 text-sm leading-relaxed',
        cfg.classes,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
          {title ?? cfg.label}
        </p>
        <div className="text-foreground/90 [&_code]:rounded [&_code]:bg-foreground/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px]">
          {children}
        </div>
      </div>
    </div>
  )
}
