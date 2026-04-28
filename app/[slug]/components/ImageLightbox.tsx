'use client'

import { useEffect } from 'react'

type LightboxImage = {
  id: number | string
  image_url: string
  caption?: string | null
}

type ImageLightboxProps = {
  images: LightboxImage[]
  selectedIndex: number | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function ImageLightbox({ images, selectedIndex, onClose, onNext, onPrev }: ImageLightboxProps) {
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex, onClose, onNext, onPrev])

  if (selectedIndex === null || !images[selectedIndex]) return null

  const current = images[selectedIndex]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all z-[110]"
        onClick={onClose}
        aria-label="Đóng"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <button
        type="button"
        className="absolute left-2 md:left-8 text-white/70 hover:text-white p-2 md:p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Ảnh trước"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-2 md:right-8 text-white/70 hover:text-white p-2 md:p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Ảnh sau"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl h-full p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-8 left-0 right-0 text-center text-white/60 text-sm tracking-[0.2em] font-medium z-[110]">
          {selectedIndex + 1} / {images.length}
        </div>

        <div key={selectedIndex} className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center mt-8 animate-fade-in-scale">
          <img
            src={current.image_url}
            alt={current.caption || 'Ảnh cưới phóng to'}
            className="max-h-full max-w-full object-contain drop-shadow-2xl"
          />
        </div>

        {current.caption && (
          <div className="absolute bottom-8 left-0 right-0 text-center text-white/90 text-sm md:text-lg font-medium tracking-wide z-[110] drop-shadow-lg px-4">
            {current.caption}
          </div>
        )}
      </div>
    </div>
  )
}