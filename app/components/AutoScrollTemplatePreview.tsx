'use client'

import { useEffect, useRef } from 'react'

type AutoScrollTemplatePreviewProps = {
  src: string
  title: string
  autoScroll?: boolean // If true, continuous auto-scroll
  hoverScroll?: boolean // If true (default true), auto-scrolls on hover/pointer enter
  interactive?: boolean // If true, allows pointer events inside iframe
  previewData?: unknown
  onPreviewClick?: () => void
}

export default function AutoScrollTemplatePreview({
  src,
  title,
  autoScroll = false,
  hoverScroll = true,
  interactive = false,
  previewData,
  onPreviewClick,
}: AutoScrollTemplatePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previewDataRef = useRef(previewData)

  useEffect(() => {
    previewDataRef.current = previewData

    if (previewData !== undefined) {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'wedding-preview-data', payload: previewData },
        window.location.origin
      )
    }
  }, [previewData])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let intervalId: number | null = null
    let resetTimeoutId: number | null = null
    let pausedUntil = 0
    let isResetting = false
    let isAutoScrolling = false

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
      if (isAutoScrolling) return
      isAutoScrolling = true
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
          const next = current + 0.95

          if (next >= maxScroll - 1) {
            win.scrollTo({ top: maxScroll, left: 0, behavior: 'auto' })
            isResetting = true
            pausedUntil = Date.now() + 1500

            resetTimeoutId = window.setTimeout(() => {
              try {
                const frameAgain = iframeRef.current
                frameAgain?.contentWindow?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
              } finally {
                isResetting = false
                pausedUntil = Date.now() + 600
              }
            }, 1500)
          } else {
            win.scrollTo({ top: next, left: 0, behavior: 'auto' })
          }
        } catch {
          clearTimers()
        }
      }, 16)
    }

    const stopAutoScroll = () => {
      clearTimers()
      isAutoScrolling = false
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
        if (previewDataRef.current !== undefined) {
          iframe.contentWindow?.postMessage(
            { type: 'wedding-preview-data', payload: previewDataRef.current },
            window.location.origin
          )
        }
      } catch {
        return
      }

      if (autoScroll) {
        startAutoScroll()
      }
    }

    iframe.addEventListener('load', onLoad)

    const container = containerRef.current
    const handlePointerEnter = () => {
      if (hoverScroll) startAutoScroll()
    }
    const handlePointerDown = () => {
      if (hoverScroll) startAutoScroll()
    }
    const handlePointerLeave = () => {
      if (hoverScroll && !autoScroll) {
        stopAutoScroll()
      }
    }

    if (container && hoverScroll) {
      container.addEventListener('pointerenter', handlePointerEnter)
      container.addEventListener('pointerdown', handlePointerDown)
      container.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      iframe.removeEventListener('load', onLoad)
      if (container && hoverScroll) {
        container.removeEventListener('pointerenter', handlePointerEnter)
        container.removeEventListener('pointerdown', handlePointerDown)
        container.removeEventListener('pointerleave', handlePointerLeave)
      }
      clearTimers()
    }
  }, [src, autoScroll, hoverScroll])

  return (
    <div
      ref={containerRef}
      onClick={onPreviewClick}
      className={`h-full w-full relative ${onPreviewClick ? 'cursor-pointer' : ''}`}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        loading="lazy"
        className={`h-full w-full border-0 ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        tabIndex={interactive ? 0 : -1}
        aria-hidden={!interactive}
      />
    </div>
  )
}
