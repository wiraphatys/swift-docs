import type { Topic } from '@/lib/topics'
import { CodeBlock } from './CodeBlock'
import { Callout } from './Callout'
import { Badge } from '@/components/ui/badge'
import { Hash } from 'lucide-react'

export function TopicPage({ topic }: { topic: Topic }) {
  return (
    <article className="prose-doc mx-auto max-w-3xl space-y-10 pb-32">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium">
          <Badge
            variant="outline"
            className="font-mono uppercase tracking-wide"
          >
            {topic.category === 'swift' ? 'Swift' : 'SwiftUI'}
          </Badge>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{topic.group}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {topic.title}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {topic.summary}
        </p>
        {topic.intro ? (
          <div className="space-y-3 pt-2 text-[15px] leading-relaxed text-foreground/85">
            {topic.intro}
          </div>
        ) : null}
      </header>

      {topic.sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="scroll-mt-24 space-y-3 border-t pt-8"
        >
          <h2 className="group flex items-center gap-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
            <a
              href={`#${s.id}`}
              aria-label={`Anchor for ${s.title}`}
              className="opacity-0 transition group-hover:opacity-100"
            >
              <Hash className="h-4 w-4 text-muted-foreground" />
            </a>
            <span>{s.title}</span>
          </h2>
          {s.intro ? (
            <div className="space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {s.intro}
            </div>
          ) : null}
          {s.bullets ? (
            <ul className="ml-4 list-disc space-y-1.5 text-[15px] leading-relaxed text-foreground/85 marker:text-swift-500">
              {s.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
          {s.examples?.map((ex, i) => (
            <CodeBlock
              key={i}
              code={ex.code}
              lang={ex.lang ?? 'swift'}
              title={ex.title}
            />
          ))}
          {s.note ? <Callout variant="note">{s.note}</Callout> : null}
          {s.pitfall ? <Callout variant="warn">{s.pitfall}</Callout> : null}
          {s.outro ? (
            <div className="space-y-3 text-[15px] leading-relaxed text-foreground/85">
              {s.outro}
            </div>
          ) : null}
        </section>
      ))}
    </article>
  )
}
