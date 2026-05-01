import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { ALL_GROUPS, TOPIC_BY_SLUG } from '@/topics'
import { Hash, FileText } from 'lucide-react'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function go(path: string) {
    setOpen(false)
    navigate(path)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Jump to"
      description="Search Swift and SwiftUI topics"
    >
      <CommandInput placeholder="Type to search topics, sections, syntax…" />
      <CommandList>
        <CommandEmpty>No matching topics.</CommandEmpty>
        {ALL_GROUPS.map((group) => {
          const topics = group.slugs
            .map((s) => TOPIC_BY_SLUG[s])
            .filter(Boolean)
          if (topics.length === 0) return null
          return (
            <div key={`${group.category}:${group.title}`}>
              <CommandGroup
                heading={`${group.category === 'swift' ? 'Swift' : 'SwiftUI'} · ${group.title}`}
              >
                {topics.map((t) => (
                  <CommandItem
                    key={t.slug}
                    value={`${t.title} ${t.summary} ${t.sections.map((s) => s.title).join(' ')}`}
                    onSelect={() => go(`/${t.category}/${t.slug}`)}
                  >
                    <FileText className="text-muted-foreground" />
                    <span>{t.title}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">
                      {t.summary.slice(0, 60)}…
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          )
        })}
        <CommandGroup heading="Sections (current page)">
          {Object.values(TOPIC_BY_SLUG)
            .find((t) => location.pathname.endsWith(t.slug))
            ?.sections.map((s) => (
              <CommandItem
                key={s.id}
                value={`section ${s.title}`}
                onSelect={() => {
                  setOpen(false)
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Hash className="text-muted-foreground" />
                <span>{s.title}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
