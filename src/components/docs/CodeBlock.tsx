import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { highlight } from '@/lib/highlighter'

type Props = {
  code: string
  lang?: 'swift' | 'bash' | 'json' | 'plain'
  title?: string
  className?: string
}

export function CodeBlock({ code, lang = 'swift', title, className }: Props) {
  const [html, setHtml] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let alive = true
    highlight(code, lang).then((res) => {
      if (alive) setHtml(res)
    })
    return () => {
      alive = false
    }
  }, [code, lang])

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Copied to clipboard', {
        description: title ?? `${lang} snippet`,
      })
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <figure
      className={cn(
        'group relative my-4 overflow-hidden rounded-lg border bg-card text-sm shadow-sm',
        className,
      )}
    >
      {title ? (
        <figcaption className="flex items-center justify-between border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="font-mono">{title}</span>
          <span className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {lang}
          </span>
        </figcaption>
      ) : null}
      <div className="relative">
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            'absolute right-2 top-2 z-10 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-all duration-200 group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100',
          )}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-swift-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        {html ? (
          <div
            className="overflow-x-auto px-1 py-3 [&_pre]:bg-transparent! [&_pre]:px-4 [&_pre]:py-0 [&_pre]:text-[13px] [&_pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="overflow-x-auto px-5 py-3 text-[13px] leading-relaxed text-muted-foreground">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  )
}
