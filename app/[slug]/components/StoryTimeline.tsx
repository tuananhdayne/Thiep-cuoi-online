'use client'

import { useState } from 'react'
import Reveal from './Reveal'

type TimelineItem = {
  title: string
  date: string
  description: string
  image?: string
}

type StoryTimelineProps = {
  items: TimelineItem[]
}

export default function StoryTimeline({ items }: StoryTimelineProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!items || !items.length) return null

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-bg-alt to-bg-main" id="story">
      <div className="max-w-5xl mx-auto space-y-8">
        <Reveal className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-accent">Câu chuyện tình yêu</p>
          <h2 className="font-display text-3xl md:text-4xl text-primary">Hành trình bên nhau</h2>
          <p className="text-sm text-primary-light">Những khoảnh khắc đáng nhớ của chúng tôi.</p>
        </Reveal>

        <div className="relative border-l border-border-light ml-6 space-y-8">
          {items.map((item, idx) => (
            <Reveal key={item.title + idx} className="relative pl-6">
              <span className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg" />
              <div className="bg-white rounded-2xl border border-border-light shadow-[0_20px_40px_rgba(91,58,41,0.06)] p-5 flex flex-col md:flex-row gap-4">
                {item.image && (
                  <div
                    className="md:w-40 h-28 rounded-xl overflow-hidden shadow-sm cursor-pointer group"
                    onClick={() => setSelectedImage(item.image!)}
                  >
                    <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.date}</p>
                  <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-primary-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox for StoryTimeline */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          {/* Nút đóng */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all z-[110]"
            onClick={() => setSelectedImage(null)}
            aria-label="Đóng"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div
            className="relative flex flex-col items-center justify-center w-full max-w-5xl h-[75vh] md:h-[85vh] p-4 md:p-12 mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Phóng to"
                className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
