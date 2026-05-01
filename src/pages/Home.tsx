import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Layers, Sparkles } from 'lucide-react'
import { ALL_TOPICS, SWIFT_GROUPS, SWIFTUI_GROUPS, TOPIC_BY_SLUG } from '@/topics'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HomePage() {
  const swiftCount = ALL_TOPICS.filter((t) => t.category === 'swift').length
  const swiftuiCount = ALL_TOPICS.filter((t) => t.category === 'swiftui').length

  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-24">
      <section className="space-y-4 pt-6">
        <Badge
          variant="outline"
          className="border-swift-500/40 bg-swift-500/10 font-mono uppercase tracking-wide text-swift-600 dark:text-swift-300"
        >
          Final Exam Reference
        </Badge>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Swift &amp; SwiftUI{' '}
          <span className="text-swift-500">on demand</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A complete, exam-ready cheat sheet for the Swift language and SwiftUI
          framework. Press{' '}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>{' '}
          to jump to any topic.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-swift-500 hover:bg-swift-600"
          >
            <Link to="/swift/variables-constants">
              Start with Swift basics <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="cursor-pointer">
            <Link to="/swiftui/app-protocol">Jump to SwiftUI</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Code2} label="Swift topics" value={swiftCount} />
        <Stat icon={Layers} label="SwiftUI topics" value={swiftuiCount} />
        <Stat icon={Sparkles} label="Searchable" value="⌘K" />
      </section>

      <CategoryColumn title="Swift Language" groups={SWIFT_GROUPS} />
      <CategoryColumn title="SwiftUI Framework" groups={SWIFTUI_GROUPS} />
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Code2
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <Icon className="mb-2 h-5 w-5 text-swift-500" />
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function CategoryColumn({
  title,
  groups,
}: {
  title: string
  groups: typeof SWIFT_GROUPS
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-xl border bg-card p-4 transition-colors hover:border-swift-500/40"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </p>
            <ul className="space-y-1.5">
              {g.slugs.map((slug) => {
                const t = TOPIC_BY_SLUG[slug]
                if (!t) return null
                return (
                  <li key={slug}>
                    <Link
                      to={`/${g.category}/${slug}`}
                      className="block cursor-pointer rounded text-sm text-foreground/80 transition hover:text-swift-600 dark:hover:text-swift-300"
                    >
                      {t.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
