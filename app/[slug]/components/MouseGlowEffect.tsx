'use client'

import { useEffect, useState } from 'react'

type MouseGlowEffectProps = {
  variant: 'rose' | 'ocean'
}

const glowStyles = {
  rose: {
    primary: 'bg-rose-200/40',
    secondary: 'bg-fuchsia-200/30',
    accent: 'bg-pink-100/40',
  },
  ocean: {
    primary: 'bg-cyan-200/35',
    secondary: 'bg-blue-200/25',
    accent: 'bg-teal-100/35',
  },
}

export default function MouseGlowEffect({ variant }: MouseGlowEffectProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  const colors = glowStyles[variant]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute h-80 w-80 rounded-full blur-3xl transition-transform duration-300 ease-out ${colors.primary}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={`absolute h-56 w-56 rounded-full blur-3xl transition-transform duration-500 ease-out ${colors.secondary}`}
        style={{
          left: `${Math.max(8, 100 - position.x)}%`,
          top: `${Math.max(12, position.y - 10)}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={`absolute h-28 w-28 rounded-full blur-2xl transition-transform duration-700 ease-out ${colors.accent}`}
        style={{
          left: `${Math.min(92, position.x + 18)}%`,
          top: `${Math.min(88, position.y + 12)}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
