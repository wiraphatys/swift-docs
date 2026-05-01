import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Mode = 'light' | 'dark'

function getInitial(): Mode {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('theme') as Mode | null
  if (stored === 'light' || stored === 'dark') return stored
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(getInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
    localStorage.setItem('theme', mode)
  }, [mode])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-pointer"
      onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
    >
      {mode === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
