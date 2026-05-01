import { NavLink, useLocation } from 'react-router-dom'
import { ALL_GROUPS, TOPIC_BY_SLUG } from '@/topics'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()
  const swiftGroups = ALL_GROUPS.filter((g) => g.category === 'swift')
  const swiftuiGroups = ALL_GROUPS.filter((g) => g.category === 'swiftui')

  return (
    <nav className="flex h-full flex-col gap-6 px-3 pb-12 pt-6 text-sm">
      <Section title="Swift" badgeColor="bg-swift-500/15 text-swift-600 dark:text-swift-300 border-swift-500/30">
        {swiftGroups.map((g) => (
          <Group key={g.title} title={g.title}>
            {g.slugs.map((slug) => {
              const t = TOPIC_BY_SLUG[slug]
              if (!t) return null
              return (
                <Item
                  key={slug}
                  to={`/swift/${slug}`}
                  active={location.pathname === `/swift/${slug}`}
                  onClick={onNavigate}
                >
                  {t.title}
                </Item>
              )
            })}
          </Group>
        ))}
      </Section>
      <Section title="SwiftUI" badgeColor="bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30">
        {swiftuiGroups.map((g) => (
          <Group key={g.title} title={g.title}>
            {g.slugs.map((slug) => {
              const t = TOPIC_BY_SLUG[slug]
              if (!t) return null
              return (
                <Item
                  key={slug}
                  to={`/swiftui/${slug}`}
                  active={location.pathname === `/swiftui/${slug}`}
                  onClick={onNavigate}
                >
                  {t.title}
                </Item>
              )
            })}
          </Group>
        ))}
      </Section>
    </nav>
  )
}

function Section({
  title,
  badgeColor,
  children,
}: {
  title: string
  badgeColor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        <Badge
          variant="outline"
          className={cn('font-mono uppercase tracking-wide', badgeColor)}
        >
          {title}
        </Badge>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
        {title}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  )
}

function Item({
  to,
  active,
  onClick,
  children,
}: {
  to: string
  active: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={cn(
          'block cursor-pointer rounded-md border border-transparent px-2.5 py-1.5 text-[13px] leading-snug text-foreground/70 transition-colors duration-150 hover:bg-sidebar-accent hover:text-foreground',
          active &&
            'border-swift-500/40 bg-swift-500/10 font-medium text-swift-600 dark:text-swift-300',
        )}
      >
        {children}
      </NavLink>
    </li>
  )
}
