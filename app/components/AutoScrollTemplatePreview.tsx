'use client'

import { useEffect, useRef, useState } from 'react'

type AutoScrollTemplatePreviewProps = {
  src: string
  title: string
  autoScroll?: boolean // If true, continuous auto-scroll when in view
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
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Lazy render iframe only when close to viewport (IntersectionObserver)
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
        } else {
          // When card scrolls far out of view, we can pause/keep minimal footprint
          setIsInView(false)
        }
      },
      { rootMargin: '300px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    previewDataRef.current = previewData

    if (previewData !== undefined && isLoaded) {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'wedding-preview-data', payload: previewData },
        window.location.origin
      )
    }
  }, [previewData, isLoaded])

  useEffect(() => {
    if (!isInView) return
    const iframe = iframeRef.current
    if (!iframe) return

    let rafId: number | null = null
    let resetTimeoutId: number | null = null
    let pausedUntil = 0
    let isResetting = false
    let isAutoScrolling = false

    const stopAnimation = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (resetTimeoutId !== null) {
        clearTimeout(resetTimeoutId)
        resetTimeoutId = null
      }
      isAutoScrolling = false
    }

    const scrollLoop = () => {
      const frame = iframeRef.current
      if (!frame?.contentWindow) {
        stopAnimation()
        return
      }

      try {
        const win = frame.contentWindow
        const doc = win.document
        const root = doc.scrollingElement || doc.documentElement
        if (!root) {
          rafId = requestAnimationFrame(scrollLoop)
          return
        }

        const maxScroll = Math.max(root.scrollHeight - win.innerHeight, 0)
        if (maxScroll <= 0) {
          rafId = requestAnimationFrame(scrollLoop)
          return
        }

        if (Date.now() < pausedUntil || isResetting) {
          rafId = requestAnimationFrame(scrollLoop)
          return
        }

        const current = win.scrollY
        const next = current + 0.85

        if (next >= maxScroll - 1) {
          win.scrollTo({ top: maxScroll, left: 0, behavior: 'auto' })
          isResetting = true
          pausedUntil = Date.now() + 1400

          resetTimeoutId = window.setTimeout(() => {
            try {
              iframeRef.current?.contentWindow?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            } finally {
              isResetting = false
              pausedUntil = Date.now() + 500
            }
          }, 1400)
        } else {
          win.scrollTo({ top: next, left: 0, behavior: 'auto' })
        }

        rafId = requestAnimationFrame(scrollLoop)
      } catch {
        stopAnimation()
      }
    }

    const startAutoScroll = () => {
      if (isAutoScrolling) return
      isAutoScrolling = true
      rafId = requestAnimationFrame(scrollLoop)
    }

    const onLoad = () => {
      setIsLoaded(true)
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
    const handlePointerLeave = () => {
      if (hoverScroll && !autoScroll) {
        stopAnimation()
      }
    }

    if (container && hoverScroll) {
      container.addEventListener('pointerenter', handlePointerEnter)
      container.addEventListener('pointerleave', handlePointerLeave)
    }

    return () => {
      iframe.removeEventListener('load', onLoad)
      if (container && hoverScroll) {
        container.removeEventListener('pointerenter', handlePointerEnter)
        container.removeEventListener('pointerleave', handlePointerLeave)
      }
      stopAnimation()
    }
  }, [src, autoScroll, hoverScroll, isInView])

  return (
    <div
      ref={containerRef}
      onClick={onPreviewClick}
      className={`h-full w-full relative overflow-hidden bg-stone-900 ${onPreviewClick ? 'cursor-pointer' : ''}`}
    >
      {isInView ? (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          className={`h-full w-full border-0 transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
          tabIndex={interactive ? 0 : -1}
          aria-hidden={!interactive}
        />
      ) : null}

      {/* Elegant lightweight placeholder while offscreen or loading */}
      {(!isInView || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 p-6 text-stone-400">
          <div className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
          <p className="mt-3 text-[11px] font-medium tracking-wider text-amber-200/60 uppercase">Đang tải xem trước...</p>
        </div>
      )}
    </div>
  )
}
