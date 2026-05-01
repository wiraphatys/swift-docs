import type { ReactNode } from 'react'

export type CodeExample = {
  title?: string
  lang?: 'swift' | 'bash' | 'json' | 'plain'
  code: string
}

export type Section = {
  id: string
  title: string
  intro?: ReactNode
  bullets?: ReactNode[]
  examples?: CodeExample[]
  note?: ReactNode
  pitfall?: ReactNode
  outro?: ReactNode
}

export type Topic = {
  slug: string
  title: string
  category: 'swift' | 'swiftui'
  group: string
  summary: string
  intro?: ReactNode
  sections: Section[]
}

export type TopicGroup = {
  category: 'swift' | 'swiftui'
  title: string
  slugs: string[]
}
