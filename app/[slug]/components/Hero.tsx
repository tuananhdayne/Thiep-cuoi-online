'use client'

import { useEffect, useState } from 'react'

type HeroProps = {
  brideName: string
  groomName: string
  introDescription?: string | null
  weddingDate?: string | null
  weddingTime?: string | null
  backgroundImage?: string | null
  guestName?: string | null
}

const formatDate = (date?: string | null) => {
  if (!date) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(date))
}

const formatTime = (time?: string | null) => {
  if (!time) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(`1970-01-01T${time}+07:00`))
}

export default function Hero({
  brideName,
  groomName,
  introDescription,
  weddingDate,
  weddingTime,
  backgroundImage,
  guestName,
}: HeroProps) {
  const [showTitles, setShowTitles] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitles(true), 120)
    const t2 = setTimeout(() => setShowSubtitle(true), 620)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const date = formatDate(weddingDate)
  const time = formatTime(weddingTime)

  return (
    <section className="relative isolate min-h-screen overflow-hidden flex items-center justify-center text-center px-6 py-16">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: backgroundImage
              ? `linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6)), url(${backgroundImage})`
              : 'radial-gradient(circle at 20% 20%, rgba(255, 214, 170, 0.25), transparent 32%), radial-gradient(circle at 80% 0%, rgba(255, 182, 193, 0.2), transparent 35%), radial-gradient(circle at 50% 80%, rgba(255, 214, 170, 0.28), transparent 30%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/55" />
      </div>

      <div className="relative z-10 max-w-3xl space-y-6 text-white">
        {!guestName ? (
          <p className={`text-xs uppercase tracking-[0.35em] text-white/90 transition-all duration-700 ${showTitles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            Trân trọng kính mời
          </p>
        ) : (
          <div className={`space-y-3 transition-all duration-700 delay-100 ${showTitles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <p className="text-sm md:text-base italic text-white/90 font-serif">
              Thân gửi
            </p>
            <p className="text-2xl md:text-4xl font-bold text-accent uppercase tracking-wider drop-shadow-md">
              {guestName}
            </p>
          </div>
        )}
        <h1
          className={`font-display text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl transition-all duration-700 ease-out delay-200 mt-2 ${showTitles ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.97] translate-y-4'
            }`}
        >
          {brideName} <span className="text-accent-light">&</span> {groomName}
        </h1>
        {introDescription && (
          <p
            className={`text-base md:text-lg text-white/85 leading-relaxed transition-all duration-700 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
          >
            {introDescription}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          {(date || time) && (
            <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-lg backdrop-blur">
              <p className="font-semibold">{date}</p>
              {time && <p className="text-white/80 text-sm mt-1">{time}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
