import type { Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

const SUPPORTED_LANGS = ['swift', 'bash', 'json'] as const
type Lang = (typeof SUPPORTED_LANGS)[number] | 'plain'

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter } = await import('shiki')
      return createHighlighter({
        themes: ['github-light', 'github-dark-default'],
        langs: ['swift', 'bash', 'json'],
      })
    })()
  }
  return highlighterPromise
}

export async function highlight(code: string, lang: Lang = 'swift') {
  const safeLang: Lang = SUPPORTED_LANGS.includes(lang as never)
    ? lang
    : 'plain'
  const hl = await getHighlighter()
  return hl.codeToHtml(code, {
    lang: safeLang === 'plain' ? 'bash' : safeLang,
    themes: {
      light: 'github-light',
      dark: 'github-dark-default',
    },
    defaultColor: false,
  })
}
