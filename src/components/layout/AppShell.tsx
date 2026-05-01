import { Outlet, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { TOC } from './TOC'
import { ThemeToggle } from './ThemeToggle'
import { CommandPalette } from './CommandPalette'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TOPIC_BY_SLUG } from '@/topics'
import { Toaster } from '@/components/ui/sonner'

export function AppShell() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const slug = location.pathname.split('/').filter(Boolean).pop() ?? ''
  const topic = TOPIC_BY_SLUG[slug]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 items-center gap-3 px-4 lg:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation"
                className="cursor-pointer lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b">
                <SheetTitle>SwiftDocs</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto">
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Link
            to="/"
            className="flex cursor-pointer items-center gap-2 font-display text-base font-semibold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-swift-500 font-mono text-sm font-bold text-white">
              S
            </span>
            <span className="hidden sm:inline">SwiftDocs</span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <SearchTrigger />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 px-4 lg:grid-cols-[260px_minmax(0,1fr)_220px] lg:gap-8 lg:px-6">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto border-r lg:block">
          <Sidebar />
        </aside>

        <main className="min-w-0 px-1 py-8 lg:px-6">
          <Outlet />
        </main>

        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto py-8 xl:block">
          {topic ? <TOC topic={topic} /> : null}
        </aside>
      </div>

      <CommandPalette />
      <Toaster richColors position="bottom-right" />
    </div>
  )
}

function SearchTrigger() {
  function dispatch() {
    const evt = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
    })
    window.dispatchEvent(evt)
  }
  return (
    <button
      type="button"
      onClick={dispatch}
      className="group inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search topics</span>
      <kbd className="ml-2 hidden rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] tracking-wide sm:inline">
        ⌘K
      </kbd>
    </button>
  )
}
