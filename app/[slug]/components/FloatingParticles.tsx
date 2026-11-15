'use client'

import React, { useMemo } from 'react'

export type ParticleVariant =
  | 'burgundy'
  | 'songhy'
  | 'vuonxuan'
  | 'vintage'
  | 'blush'
  | 'crystal'
  | 'ocean'
  | 'lavender'
  | 'noir'
  | 'lotus'

interface FloatingParticlesProps {
  variant: ParticleVariant
}

interface ParticleConfig {
  items: Array<{ symbol: string; color: string; isSvg?: boolean }>
}

const variantConfigs: Record<ParticleVariant, ParticleConfig> = {
  lotus: {
    items: [
      { symbol: '🪷', color: '#f7c5cc' },
      { symbol: '🌸', color: '#ffb7c5' },
      { symbol: '🍃', color: '#7ba451' },
      { symbol: '✨', color: '#cbb06b' },
      { symbol: '✦', color: '#5e813c' },
      { symbol: '•', color: '#b8dfd8' },
    ],
  },
  songhy: {
    items: [
      { symbol: '囍', color: '#ffe8a4' },
      { symbol: '🏮', color: '#ff4d4d' },
      { symbol: '✨', color: '#ffd700' },
      { symbol: '✦', color: '#ff6b6b' },
      { symbol: '•', color: '#fdcb9c' },
    ],
  },
  blush: {
    items: [
      { symbol: '🌸', color: '#ff8fa3' },
      { symbol: '🌷', color: '#ffb3c1' },
      { symbol: '💖', color: '#ff758f' },
      { symbol: '✨', color: '#ffCCD5' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '•', color: '#fca311' },
    ],
  },
  burgundy: {
    items: [
      { symbol: '🌹', color: '#c9184a' },
      { symbol: '❤', color: '#800f2f' },
      { symbol: '✨', color: '#c9a24a' },
      { symbol: '✦', color: '#e2c785' },
      { symbol: '•', color: '#ffb3c1' },
    ],
  },
  noir: {
    items: [
      { symbol: '👑', color: '#ffdfaf' },
      { symbol: '✨', color: '#ffd700' },
      { symbol: '✦', color: '#e5b972' },
      { symbol: '⭐', color: '#fff' },
      { symbol: '•', color: '#d4af78' },
    ],
  },
  crystal: {
    items: [
      { symbol: '💎', color: '#c4a476' },
      { symbol: '✨', color: '#e0c99f' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '❄️', color: '#f5ebe0' },
      { symbol: '•', color: '#d4af37' },
    ],
  },
  vuonxuan: {
    items: [
      { symbol: '🍃', color: '#52b788' },
      { symbol: '🌿', color: '#74c69d' },
      { symbol: '🌱', color: '#95d5b2' },
      { symbol: '✨', color: '#d4af37' },
      { symbol: '✦', color: '#ffffff' },
    ],
  },
  ocean: {
    items: [
      { symbol: '🫧', color: '#90e0ef' },
      { symbol: '🌊', color: '#48cae4' },
      { symbol: '✨', color: '#b58b2f' },
      { symbol: '✦', color: '#caf0f8' },
      { symbol: '•', color: '#0077b6' },
    ],
  },
  lavender: {
    items: [
      { symbol: '🪻', color: '#b388eb' },
      { symbol: '🌸', color: '#d8bbff' },
      { symbol: '💜', color: '#9b5de5' },
      { symbol: '✨', color: '#f15bb5' },
      { symbol: '✦', color: '#ffffff' },
    ],
  },
  vintage: {
    items: [
      { symbol: '📜', color: '#c69255' },
      { symbol: '🌾', color: '#dfb175' },
      { symbol: '✨', color: '#e1bc7c' },
      { symbol: '✦', color: '#f6eadd' },
      { symbol: '•', color: '#b39054' },
    ],
  },
}

export default function FloatingParticles({ variant }: FloatingParticlesProps) {
  const config = variantConfigs[variant] || variantConfigs.burgundy
  const [shouldRender, setShouldRender] = React.useState(true)

  React.useEffect(() => {
    // If inside a tiny embedded card preview iframe (not modal or full screen), skip rendering to save CPU/GPU
    if (typeof window !== 'undefined' && window.self !== window.top) {
      const isQuickViewModal = window.location.search.includes('open=1')
      if (!isQuickViewModal) {
        setShouldRender(false)
      }
    }
  }, [])

  // Generate 16 fixed particle definitions with consistent deterministic pseudo-random math
  const particles = useMemo(() => {
    if (!shouldRender) return []
    return Array.from({ length: 16 }).map((_, i) => {
      const item = config.items[i % config.items.length]
      // Deterministic spread
      const left = ((i * 23 + 17) % 94) + 3 // 3% to 97%
      const duration = 9 + ((i * 7) % 8) // 9s to 16s
      const delay = (i * 1.3) % 9 // 0s to 9s
      const size = 12 + ((i * 5) % 10) // 12px to 21px
      const swayDistance = (i % 2 === 0 ? 1 : -1) * (18 + ((i * 4) % 18)) // -36px to +36px
      const rotateDeg = 180 + ((i * 45) % 180)

      return {
        id: i,
        symbol: item.symbol,
        color: item.color,
        left,
        duration,
        delay,
        size,
        swayDistance,
        rotateDeg,
      }
    })
  }, [config])

  if (!shouldRender) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden select-none"
    >
      <style>{`
        @keyframes weddingParticleFall {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.65;
          }
          100% {
            transform: translate3d(var(--sway-x), 1200px, 0) rotate(var(--rot-deg));
            opacity: 0;
          }
        }
      `}</style>

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block pointer-events-none"
          style={
            {
              left: `${p.left}%`,
              top: '-20px',
              fontSize: `${p.size}px`,
              color: p.color,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
              animation: `weddingParticleFall ${p.duration}s linear ${p.delay}s infinite`,
              '--sway-x': `${p.swayDistance}px`,
              '--rot-deg': `${p.rotateDeg}deg`,
              willChange: 'transform, opacity',
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}
    </div>
  )
}
