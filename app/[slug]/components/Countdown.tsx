'use client'

import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal'

type CountdownProps = {
  weddingDate?: string | null
  weddingTime?: string | null
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const initial: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export default function Countdown({ weddingDate, weddingTime }: CountdownProps) {
  const target = useMemo(() => {
    if (!weddingDate) return null
    const iso = `${weddingDate}T${weddingTime || '00:00'}+07:00`
    const t = new Date(iso)
    return Number.isNaN(t.getTime()) ? null : t.getTime()
  }, [weddingDate, weddingTime])

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(initial)

  useEffect(() => {
    if (!target) return

    const tick = () => {
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft(initial)
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  if (!target) return null

  const items = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ]

  return (
    <section className="py-14 px-6 bg-bg-main" id="countdown">
      <div className="max-w-5xl mx-auto">
        <Reveal className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Countdown</p>
            <h2 className="font-display text-3xl md:text-4xl text-primary">Ngày trọng đại sắp đến</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-[0_18px_40px_rgba(91,58,41,0.06)] border border-border-light py-5 px-4 text-center transition-transform duration-500 ease-out"
              >
                <p className="text-3xl md:text-4xl font-semibold text-primary animate-pulse">
                  {item.value.toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-primary-light mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
