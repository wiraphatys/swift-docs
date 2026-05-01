import { useEffect, useState } from 'react'
import type { Topic } from '@/lib/topics'
import { cn } from '@/lib/utils'

export function TOC({ topic }: { topic: Topic }) {
  const [activeId, setActiveId] = useState<string | null>(
    topic.sections[0]?.id ?? null,
  )

  useEffect(() => {
    setActiveId(topic.sections[0]?.id ?? null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 1],
      },
    )

    const els = topic.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [topic])

  if (topic.sections.length === 0) return null

  return (
    <nav className="space-y-2 text-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
        On this page
      </p>
      <ul className="space-y-1 border-l">
        {topic.sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={cn(
                '-ml-px block cursor-pointer border-l border-transparent pl-3 py-1 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-foreground',
                activeId === s.id &&
                  'border-swift-500 font-medium text-swift-600 dark:text-swift-300',
              )}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
