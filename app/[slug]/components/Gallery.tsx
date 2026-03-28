'use client'

import { useState } from 'react'
import Reveal from './Reveal'

type GalleryImage = {
  id: number | string
  image_url: string
  caption?: string | null
}

type GalleryProps = {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <section className="py-16 px-6 bg-bg-alt" id="gallery">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Our memories</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary">Album ảnh</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {images.map((img, index) => (
            <Reveal key={img.id} className="h-full">
              <figure
                className="group h-full relative overflow-hidden rounded-[20px] md:rounded-[28px] shadow-[0_10px_30px_rgba(91,58,41,0.08)] bg-white cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                  <img
                    src={img.image_url}
                    alt={img.caption || 'Ảnh cưới'}
                    className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-110 ease-out"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                {img.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white px-4 py-4 md:py-5 text-xs md:text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
          style={{ animationDuration: '0.3s' }}
          onClick={closeLightbox}
        >
          {/* Nút đóng */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all z-[110]"
            onClick={closeLightbox}
            aria-label="Đóng"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Nút lùi */}
          <button
            className="absolute left-2 md:left-8 text-white/70 hover:text-white p-2 md:p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
            onClick={goToPrev}
            aria-label="Ảnh trước"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Nút tiến */}
          <button
            className="absolute right-2 md:right-8 text-white/70 hover:text-white p-2 md:p-3 hover:bg-white/10 rounded-full transition-all z-[110]"
            onClick={goToNext}
            aria-label="Ảnh sau"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Container ảnh */}
          <div
            className="relative flex flex-col items-center justify-center w-full max-w-5xl h-full p-4 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bộ đếm ảnh trên cùng */}
            <div className="absolute top-8 left-0 right-0 text-center text-white/60 text-sm tracking-[0.2em] font-medium z-[110]">
              {selectedIndex + 1} / {images.length}
            </div>

            <div 
              key={selectedIndex}
              className="relative w-full h-[75vh] md:h-[85vh] flex items-center justify-center mt-8 animate-fade-in-scale"
            >
              <img
                src={images[selectedIndex].image_url}
                alt={images[selectedIndex].caption || 'Ảnh cưới phóng to'}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            {images[selectedIndex].caption && (
              <div className="absolute bottom-8 left-0 right-0 text-center text-white/90 text-sm md:text-lg font-medium tracking-wide z-[110] drop-shadow-lg px-4">
                {images[selectedIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
