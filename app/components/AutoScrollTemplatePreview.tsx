'use client'

import { useEffect, useRef } from 'react'

type AutoScrollTemplatePreviewProps = {
  src: string
  title: string
}

export default function AutoScrollTemplatePreview({ src, title }: AutoScrollTemplatePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let intervalId: number | null = null
    let resetTimeoutId: number | null = null
    let pausedUntil = 0
    let isResetting = false

    const clearTimers = () => {
      if (intervalId) {
        window.clearInterval(intervalId)
        intervalId = null
      }
      if (resetTimeoutId) {
        window.clearTimeout(resetTimeoutId)
        resetTimeoutId = null
      }
    }

    const startAutoScroll = () => {
      clearTimers()

      intervalId = window.setInterval(() => {
        const frame = iframeRef.current
        if (!frame?.contentWindow) return

        try {
          const win = frame.contentWindow
          const doc = win.document
          const root = doc.scrollingElement || doc.documentElement
          if (!root) return

          const maxScroll = Math.max(root.scrollHeight - win.innerHeight, 0)
          if (maxScroll <= 0) return

          if (Date.now() < pausedUntil || isResetting) return

          const current = win.scrollY
          const next = current + 0.6

          if (next >= maxScroll - 1) {
            win.scrollTo({ top: maxScroll, left: 0, behavior: 'auto' })
            isResetting = true
            pausedUntil = Date.now() + 1200

            resetTimeoutId = window.setTimeout(() => {
              try {
                const frameAgain = iframeRef.current
                frameAgain?.contentWindow?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
              } finally {
                isResetting = false
                pausedUntil = Date.now() + 400
              }
            }, 1200)
          } else {
            win.scrollTo({ top: next, left: 0, behavior: 'auto' })
          }
        } catch {
          clearTimers()
        }
      }, 16)
    }

    const onLoad = () => {
      try {
        const doc = iframe.contentWindow?.document
        if (doc && !doc.getElementById('embedded-preview-scrollbar-hide')) {
          const style = doc.createElement('style')
          style.id = 'embedded-preview-scrollbar-hide'
          style.textContent = `
            html, body {
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
            html::-webkit-scrollbar,
            body::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
              display: none !important;
            }
          `
          doc.head.appendChild(style)
        }
        iframe.contentWindow?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      } catch {
        return
      }
      startAutoScroll()
    }

    iframe.addEventListener('load', onLoad)

    return () => {
      iframe.removeEventListener('load', onLoad)
      clearTimers()
    }
  }, [src])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      loading="lazy"
      className="h-full w-full border-0 pointer-events-none"
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
