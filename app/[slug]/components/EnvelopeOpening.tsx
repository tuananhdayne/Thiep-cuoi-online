'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Couple } from '../templates/types'

export type EnvelopeThemeVariant =
  | 'burgundy'
  | 'songhy'
  | 'vuonxuan'
  | 'ocean'
  | 'blush'
  | 'crystal'
  | 'vintage'
  | 'lavender'
  | 'noir'
  | 'lotus'

interface EnvelopeOpeningProps {
  couple: Couple
  themeVariant: EnvelopeThemeVariant
  guestName?: string
  onOpened?: () => void
  defaultOpen?: boolean
}

const themeStyles: Record<
  EnvelopeThemeVariant,
  {
    bgGradient: string
    envelopeOuter: string
    envelopeFlap: string
    envelopeInner: string
    waxSeal: string
    sealSymbol: string
    accentText: string
    buttonStyle: React.CSSProperties
    buttonClasses: string
    envelopeImg?: string
    particles: Array<{ symbol: string; color: string }>
  }
> = {
  burgundy: {
    bgGradient: 'from-[#6e1a20] via-[#511419] to-[#380a0e]',
    envelopeOuter: 'bg-[#511419] border-[#8C3A3F]/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]',
    envelopeFlap: 'bg-gradient-to-b from-[#6e1a20] to-[#511419] border-[#8C3A3F]/60',
    envelopeInner: 'bg-[#FFF7EB] text-[#511419]',
    waxSeal: 'from-[#C9A24A] via-[#E2C785] to-[#A07B2C] text-[#511419] shadow-[0_4px_18px_rgba(201,162,74,0.55)]',
    sealSymbol: '❤',
    accentText: 'text-[#C9A24A]',
    envelopeImg: '/images/envelope/minimalism_darkred.webp',
    buttonStyle: {
      backgroundColor: '#511419',
      color: '#ECE4D8',
      borderColor: '#ECE4D844',
      boxShadow: '0 4px 18px rgba(81, 20, 25, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '❤', color: '#a8323b' },
      { symbol: '❤', color: '#ece4d8' },
      { symbol: '❤', color: '#c9a24a' },
      { symbol: '✨', color: '#f5d580' },
      { symbol: '✦', color: '#ffffff' },
    ],
  },
  songhy: {
    bgGradient: 'from-[#540000] via-[#420000] to-[#260000]',
    envelopeOuter: 'bg-[#8c0000] border-[#ffe8a4]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]',
    envelopeFlap: 'bg-gradient-to-b from-[#990000] to-[#8c0000] border-[#ffe8a4]/50',
    envelopeInner: 'bg-[#fff9e6] text-[#8c0000]',
    waxSeal: 'from-[#ffe8a4] via-[#fdcb9c] to-[#d4a340] text-[#8c0000] shadow-[0_4px_18px_rgba(255,232,164,0.5)]',
    sealSymbol: '囍',
    accentText: 'text-[#ffe8a4]',
    envelopeImg: '/images/envelope/song_hy_v2_red.webp',
    buttonStyle: {
      backgroundColor: '#8c0000',
      color: '#ffe8a4',
      borderColor: '#ffe8a455',
      boxShadow: '0 4px 18px rgba(255, 232, 164, 0.4)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '囍', color: '#ffe8a4' },
      { symbol: '囍', color: '#fdcb9c' },
      { symbol: '✨', color: '#ffe8a4' },
      { symbol: '🏮', color: '#ff6b6b' },
      { symbol: '✦', color: '#ffffff' },
    ],
  },
  vuonxuan: {
    bgGradient: 'from-[#f0f4ef] via-[#e8ede6] to-[#dfe5dd]',
    envelopeOuter: 'bg-white border-[#5d6a57]/30 shadow-[0_25px_50px_-12px_rgba(93,106,87,0.3)]',
    envelopeFlap: 'bg-gradient-to-b from-[#f4f7f3] to-[#e8eee7] border-[#5d6a57]/40',
    envelopeInner: 'bg-white text-[#5d6a57]',
    waxSeal: 'from-[#5d6a57] via-[#697a62] to-[#475242] text-white shadow-[0_4px_18px_rgba(93,106,87,0.45)]',
    sealSymbol: '🌿',
    accentText: 'text-[#5d6a57]',
    buttonStyle: {
      backgroundColor: '#5d6a57',
      color: '#ffffff',
      borderColor: '#ffffff33',
      boxShadow: '0 4px 18px rgba(93, 106, 87, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '🍃', color: '#5d6a57' },
      { symbol: '🌿', color: '#697a62' },
      { symbol: '🌱', color: '#8ca184' },
      { symbol: '✨', color: '#b9a48a' },
      { symbol: '🤍', color: '#bdcdc1' },
    ],
  },
  vintage: {
    bgGradient: 'from-[#4a3e37] via-[#3d2b1f] to-[#261e1a]',
    envelopeOuter: 'bg-[#7c6a60] border-[#f6eadd]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]',
    envelopeFlap: 'bg-gradient-to-b from-[#8a766c] to-[#7c6a60] border-[#f6eadd]/50',
    envelopeInner: 'bg-[#fff7f3] text-[#7c6a60]',
    waxSeal: 'from-[#e1bc7c] via-[#f3d9a6] to-[#b39054] text-[#3d2b1f] shadow-[0_4px_18px_rgba(225,188,124,0.5)]',
    sealSymbol: '📜',
    accentText: 'text-[#e1bc7c]',
    buttonStyle: {
      backgroundColor: '#7c6a60',
      color: '#fff7f3',
      borderColor: '#f6eadd44',
      boxShadow: '0 4px 18px rgba(124, 106, 96, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '📜', color: '#e1bc7c' },
      { symbol: '✨', color: '#f6eadd' },
      { symbol: '🌾', color: '#c4a678' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '🕊️', color: '#ded9d7' },
    ],
  },
  blush: {
    bgGradient: 'from-[#fce8eb] via-[#f9d3d9] to-[#f4b8c3]',
    envelopeOuter: 'bg-white border-[#e66474]/30 shadow-[0_25px_50px_-12px_rgba(230,100,116,0.3)]',
    envelopeFlap: 'bg-gradient-to-b from-[#fff3f5] to-[#fce4e8] border-[#e66474]/40',
    envelopeInner: 'bg-[#fefbf4] text-[#842e35]',
    waxSeal: 'from-[#e66474] via-[#dda9b8] to-[#c74c5d] text-white shadow-[0_4px_18px_rgba(230,100,116,0.45)]',
    sealSymbol: '🌸',
    accentText: 'text-[#e66474]',
    envelopeImg: '/images/envelope/silk_ribbon_pink.webp',
    buttonStyle: {
      backgroundColor: '#e66474',
      color: '#ffffff',
      borderColor: '#ffffff44',
      boxShadow: '0 4px 18px rgba(230, 100, 116, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '🌸', color: '#e66474' },
      { symbol: '🌷', color: '#dda9b8' },
      { symbol: '✨', color: '#f3dfc3' },
      { symbol: '💖', color: '#ff758c' },
      { symbol: '✦', color: '#ffffff' },
    ],
  },
  crystal: {
    bgGradient: 'from-[#383025] via-[#241f17] to-[#15120d]',
    envelopeOuter: 'bg-[#1e1e1e] border-[#a78555]/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]',
    envelopeFlap: 'bg-gradient-to-b from-[#2e2b27] to-[#1e1e1e] border-[#a78555]/60',
    envelopeInner: 'bg-[#fffdf8] text-[#1e1e1e]',
    waxSeal: 'from-[#a78555] via-[#c4a476] to-[#86683f] text-white shadow-[0_4px_18px_rgba(167,133,85,0.5)]',
    sealSymbol: '💎',
    accentText: 'text-[#a78555]',
    buttonStyle: {
      backgroundColor: '#a78555',
      color: '#fffdf8',
      borderColor: '#fffdf844',
      boxShadow: '0 4px 18px rgba(167, 133, 85, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '💎', color: '#c4a476' },
      { symbol: '✨', color: '#a78555' },
      { symbol: '❄️', color: '#f4efe7' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '⭐', color: '#e0c99f' },
    ],
  },
  ocean: {
    bgGradient: 'from-[#0c213d] via-[#051428] to-[#020a16]',
    envelopeOuter: 'bg-[#00224c] border-[#ece4d8]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]',
    envelopeFlap: 'bg-gradient-to-b from-[#0a2e61] to-[#00224c] border-[#ece4d8]/50',
    envelopeInner: 'bg-[#f7f5ee] text-[#00224c]',
    waxSeal: 'from-[#b58b2f] via-[#d4af37] to-[#8f6d1f] text-white shadow-[0_4px_18px_rgba(181,139,47,0.5)]',
    sealSymbol: '🐚',
    accentText: 'text-[#b58b2f]',
    envelopeImg: '/images/envelope/minimalism_darkblue.webp',
    buttonStyle: {
      backgroundColor: '#00224c',
      color: '#f7f5ee',
      borderColor: '#ece4d844',
      boxShadow: '0 4px 18px rgba(0, 34, 76, 0.5)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '🌊', color: '#62b6cb' },
      { symbol: '✨', color: '#b58b2f' },
      { symbol: '🐚', color: '#ece4d8' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '🫧', color: '#90e0ef' },
    ],
  },
  lavender: {
    bgGradient: 'from-[#2d2440] via-[#1e172e] to-[#110c1c]',
    envelopeOuter: 'bg-[#7869a0] border-[#c4b5dd]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]',
    envelopeFlap: 'bg-gradient-to-b from-[#8776b2] to-[#7869a0] border-[#c4b5dd]/50',
    envelopeInner: 'bg-white text-[#7869a0]',
    waxSeal: 'from-[#7869a0] via-[#9484be] to-[#5e4f84] text-white shadow-[0_4px_18px_rgba(120,105,160,0.5)]',
    sealSymbol: '🪻',
    accentText: 'text-[#c4b5dd]',
    envelopeImg: '/images/envelope/minimalism_purple.webp',
    buttonStyle: {
      backgroundColor: '#7869a0',
      color: '#ffffff',
      borderColor: '#c4b5dd44',
      boxShadow: '0 4px 18px rgba(120, 105, 160, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '🪻', color: '#c4b5dd' },
      { symbol: '✨', color: '#b58b2f' },
      { symbol: '💜', color: '#7869a0' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '🌸', color: '#e8dcff' },
    ],
  },
  noir: {
    bgGradient: 'from-[#240202] via-[#180101] to-[#0a0000]',
    envelopeOuter: 'bg-[#2b0303] border-[#ffdfaf]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]',
    envelopeFlap: 'bg-gradient-to-b from-[#3d0505] to-[#2b0303] border-[#ffdfaf]/50',
    envelopeInner: 'bg-[#ffefd6] text-[#2b0303]',
    waxSeal: 'from-[#ffdfaf] via-[#ffe8c2] to-[#d4af78] text-[#2b0303] shadow-[0_4px_18px_rgba(255,223,175,0.55)]',
    sealSymbol: '👑',
    accentText: 'text-[#ffdfaf]',
    envelopeImg: '/images/envelope/baroque_v2_darkred.webp',
    buttonStyle: {
      backgroundColor: '#ffdfaf',
      color: '#2b0303',
      borderColor: '#ffefd666',
      boxShadow: '0 4px 18px rgba(255, 223, 175, 0.45)',
    },
    buttonClasses: 'hover:brightness-105 active:scale-95 font-bold',
    particles: [
      { symbol: '👑', color: '#ffdfaf' },
      { symbol: '✨', color: '#ffefd6' },
      { symbol: '✦', color: '#d4af78' },
      { symbol: '⭐', color: '#ffffff' },
      { symbol: '🥀', color: '#511419' },
    ],
  },
  lotus: {
    bgGradient: 'from-[#0e3002] via-[#071f01] to-[#030f00]',
    envelopeOuter: 'bg-[#124d00] border-[#5e813c]/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]',
    envelopeFlap: 'bg-gradient-to-b from-[#186600] to-[#124d00] border-[#5e813c]/50',
    envelopeInner: 'bg-[#fffbed] text-[#124d00]',
    waxSeal: 'from-[#5e813c] via-[#7ba451] to-[#48662b] text-white shadow-[0_4px_18px_rgba(94,129,60,0.5)]',
    sealSymbol: '🪷',
    accentText: 'text-[#5e813c]',
    envelopeImg: '/images/envelope/lien_hoa_v2_green.webp',
    buttonStyle: {
      backgroundColor: '#124d00',
      color: '#fffbed',
      borderColor: '#5e813c44',
      boxShadow: '0 4px 18px rgba(18, 77, 0, 0.45)',
    },
    buttonClasses: 'hover:brightness-110 active:scale-95',
    particles: [
      { symbol: '🪷', color: '#f3dfc3' },
      { symbol: '🍃', color: '#5e813c' },
      { symbol: '✨', color: '#fffbed' },
      { symbol: '✦', color: '#ffffff' },
      { symbol: '🌿', color: '#7ba451' },
    ],
  },
}

export default function EnvelopeOpening({
  couple,
  themeVariant = 'burgundy',
  guestName,
  onOpened,
  defaultOpen = false,
}: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isOpening, setIsOpening] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ id: number; symbol: string; color: string; left: number; top: number; size: number; duration: number; delay: number }>
  >([])

  const config = themeStyles[themeVariant] || themeStyles.burgundy

  useEffect(() => {
    const items = Array.from({ length: 24 }).map((_, i) => {
      const p = config.particles[i % config.particles.length]
      return {
        id: i,
        symbol: p.symbol,
        color: p.color,
        left: Math.random() * 94 + 3,
        top: Math.random() * 90 + 5,
        size: Math.random() * 14 + 14,
        duration: Math.random() * 8 + 9,
        delay: Math.random() * 5,
      }
    })
    setParticles(items)
  }, [config])

  const handleOpen = () => {
    if (isOpening || isOpen) return
    setIsOpening(true)

    if (onOpened) {
      try {
        onOpened()
      } catch (err) {
        console.error('onOpened trigger error:', err)
      }
    }

    setTimeout(() => {
      setIsOpen(true)
    }, 1100)
  }

  if (isOpen) return null

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br ${config.bgGradient} overflow-hidden select-none`}
        >
          {/* Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: 0, opacity: 0.15 }}
                animate={{
                  y: [-25, 25, -25],
                  x: [-12, 12, -12],
                  opacity: [0.25, 0.85, 0.25],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  fontSize: `${p.size}px`,
                  color: p.color,
                }}
              >
                {p.symbol}
              </motion.div>
            ))}
          </div>

          {/* Interactive Envelope Container - responsive for mobile & laptop */}
          <div className="relative w-full max-w-[390px] sm:max-w-[440px] md:max-w-[490px] lg:max-w-[520px] flex flex-col items-center">
            {/* Top Instruction Pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-4 sm:mb-5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-widest uppercase shadow-lg flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Thiệp Cưới Điện Tử
            </motion.div>

            {/* 3D Envelope */}
            <div
              onClick={handleOpen}
              className="relative w-full aspect-[1.38/1] cursor-pointer perspective-[1200px] transition-transform duration-300 hover:scale-[1.015]"
              role="button"
              tabIndex={0}
              aria-label="Nhấn để mở thiệp cưới"
            >
              {/* Envelope Body */}
              <div className={`absolute inset-0 rounded-2xl border ${config.envelopeOuter} overflow-hidden`}>
                {config.envelopeImg && (
                  <img
                    src={config.envelopeImg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-overlay"
                  />
                )}
                {/* Decorative border */}
                <div className="absolute inset-2.5 sm:inset-3 rounded-xl border border-white/15 pointer-events-none" />

                {/* Card Peeking inside */}
                <motion.div
                  animate={
                    isOpening
                      ? { y: -140, opacity: 0.95, scale: 1.02 }
                      : { y: 0 }
                  }
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className={`absolute inset-x-5 sm:inset-x-6 top-5 bottom-4 rounded-xl shadow-inner p-4 sm:p-5 flex flex-col items-center justify-center text-center ${config.envelopeInner}`}
                >
                  <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-75 font-semibold mb-1 font-heading-display">
                    Trân trọng kính mời
                  </p>
                  {guestName && (
                    <p className="text-sm font-bold opacity-90 mb-1 font-body-text">
                      {guestName}
                    </p>
                  )}
                  <h3 className="font-cursive-names text-2xl sm:text-3xl md:text-4xl font-normal tracking-wide opacity-95 mt-0.5 leading-tight">
                    {couple.groom_name} &amp; {couple.bride_name}
                  </h3>
                  <div className="w-12 h-[1px] bg-current opacity-25 my-2" />
                  <p className="text-xs sm:text-sm font-medium opacity-80 font-body-text tracking-wide">
                    {couple.wedding_date || 'Ngày Chung Đôi Hạnh Phúc'}
                  </p>
                </motion.div>

                {/* Bottom flaps visual geometry */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.32), transparent 70%)',
                  }}
                />
              </div>

              {/* 3D Top Flap that folds up */}
              <motion.div
                animate={
                  isOpening
                    ? { rotateX: 180, zIndex: 5 }
                    : { rotateX: 0, zIndex: 30 }
                }
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className={`absolute inset-x-0 top-0 h-1/2 rounded-t-2xl border-t border-x overflow-visible ${config.envelopeFlap}`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(0,0,0,0.22))',
                  }}
                />
              </motion.div>

              {/* Wax Seal Centered */}
              <motion.div
                animate={
                  isOpening
                    ? { scale: [1, 1.25, 0], opacity: [1, 1, 0], rotate: 45 }
                    : { scale: [1, 1.05, 1] }
                }
                transition={
                  isOpening
                    ? { duration: 0.45, ease: 'easeOut' }
                    : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
                }
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${config.waxSeal} border-2 border-white/40 flex items-center justify-center relative`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/20 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-bold font-serif leading-none select-none">
                      {config.sealSymbol}
                    </span>
                  </div>

                  {!isOpening && (
                    <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-40 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Call to Action Button with Continuous Shine Beam */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex flex-col items-center gap-2 w-full"
            >
              <button
                onClick={handleOpen}
                disabled={isOpening}
                style={config.buttonStyle}
                className={`relative overflow-hidden w-full max-w-[280px] sm:max-w-[300px] py-3.5 px-8 rounded-full border font-semibold text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${config.buttonClasses}`}
              >
                {/* Continuous shine beam across button */}
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '35%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                    animation: 'shineSweep 2.8s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />

                {isOpening ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="font-badge-text tracking-[0.15em] uppercase text-xs">Đang mở thiệp...</span>
                  </>
                ) : (
                  <span className="font-badge-text font-bold tracking-[0.2em] uppercase text-xs sm:text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Mở thiệp
                  </span>
                )}
              </button>

              <p className="text-white/70 text-[11px] sm:text-xs text-center mt-1">
                Chạm phong bì hoặc bấm nút để mở thiệp &amp; phát nhạc cưới
              </p>
            </motion.div>
          </div>

          {/* Keyframe style for shine animation */}
          <style jsx>{`
            @keyframes shineSweep {
              0% {
                left: -60%;
              }
              50%,
              100% {
                left: 140%;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
