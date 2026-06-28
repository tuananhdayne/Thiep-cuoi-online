'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import AudioPlayer from '../components/AudioPlayer'
import Countdown from '../components/Countdown'
import Footer from '../components/Footer'
import GiftSection from '../components/GiftSection'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import WishSection from '../components/WishSection'
import { TemplateProps } from './types'

function BotanicalSprig({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 180 280" className={`${className} ${flip ? '-scale-x-100' : ''}`} fill="none" aria-hidden="true">
      <path d="M28 270C72 211 92 145 105 25" stroke="currentColor" strokeWidth="2" />
      <path d="M69 210C41 195 30 174 31 146c27 7 43 26 38 64ZM88 159c-24-18-31-39-23-63 25 12 36 33 23 63ZM101 105C83 84 82 64 96 43c21 17 23 38 5 62Z" fill="currentColor" opacity=".24" stroke="currentColor" strokeWidth="1.3" />
      <path d="M68 213c25-5 45-20 60-44-27-3-48 12-60 44ZM88 161c26-2 47-14 64-36-26-6-50 6-64 36ZM101 107c25 1 46-9 64-29-24-8-48 2-64 29Z" fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="50" cy="226" r="8" fill="#e8d3ca" opacity=".85" />
      <circle cx="59" cy="220" r="7" fill="#f3e8e1" />
      <circle cx="48" cy="215" r="6" fill="#fffaf4" />
    </svg>
  )
}

function FloralDivider() {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-2 text-[#9aaa8d]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.span
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        className="h-px w-14 bg-[#cbd4c1] origin-right"
      />
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: 0 },
          visible: { scale: 1, rotate: 225, transition: { type: 'spring', delay: 0.3 } }
        }}
        className="h-2 w-2 border border-[#9aaa8d]"
      />
      <motion.span
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }
        }}
        className="h-px w-14 bg-[#cbd4c1] origin-left"
      />
    </motion.div>
  )
}

function FloatingGardenFrame({ className = '', rotate = 0, delay = 0 }: { className?: string; rotate?: number; delay?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={`pointer-events-none absolute text-[#879477]/25 ${className}`}
      animate={reduceMotion ? undefined : {
        rotate: [rotate - 3, rotate + 3, rotate - 3],
        y: [0, 8, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    >
      <BotanicalSprig className="h-full w-full" />
    </motion.div>
  )
}

function CharacterReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = Array.from(text)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  }
  const childVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -40 : 40,
      y: index % 3 === 0 ? -25 : 25,
      scale: 0.5,
      rotate: index % 2 === 0 ? -20 : 20
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={childVariants}
          className="inline-block origin-center"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function ScrollCharacterReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = Array.from(text)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: delay }
    }
  }
  const childVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: -50,
      scale: 0.8,
      skewX: -15,
      rotate: -5
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      skewX: 0,
      rotate: 0,
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.02 }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={childVariants}
          className="inline-block origin-center"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function WeddingCalendar({ weddingDate }: { weddingDate?: string | null }) {
  const dateObj = weddingDate ? new Date(weddingDate) : new Date()
  const isValid = weddingDate ? !isNaN(dateObj.getTime()) : false
  
  const year = isValid ? dateObj.getFullYear() : 2025
  const monthIndex = isValid ? dateObj.getMonth() : 6 // 6 is July
  const targetDay = isValid ? dateObj.getDate() : 5

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const monthName = monthNames[monthIndex]

  // Start offset: 1st of month
  const firstDay = new Date(year, monthIndex, 1)
  const startDayOfWeek = firstDay.getDay() // 0 = Sunday, 1 = Monday...
  // Map Sun (0) to index 6, Mon (1) to index 0, Tue (2) to index 1...
  const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1
  
  // Total days in month
  const totalDays = new Date(year, monthIndex + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) {
    cells.push(null)
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push(day)
  }

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center select-none">
      {/* Year & Month Header Overlay */}
      <div className="relative mb-6">
        <h3 className="font-display text-[5.5rem] leading-none tracking-wider text-[#3f4a38]/12 select-none">
          {year}
        </h3>
        <p className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 font-cursive text-5xl sm:text-6xl text-[#748469] font-light capitalize tracking-wide whitespace-nowrap">
          {monthName}
        </p>
      </div>

      {/* Calendar Grid Container */}
      <div className="w-full max-w-[300px] sm:max-w-[340px] px-1">
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {daysOfWeek.map((day) => (
            <span key={day} className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#879477]">
              {day}
            </span>
          ))}
        </div>

        {/* Days of Month */}
        <div className="grid grid-cols-7 gap-y-3.5 gap-x-1 text-center items-center justify-items-center">
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-8 w-8" />
            }

            const isWeddingDay = day === targetDay

            return (
              <div key={`day-${day}`} className="relative h-8 w-8 flex items-center justify-center text-xs sm:text-sm">
                {isWeddingDay ? (
                  <div className="relative flex items-center justify-center h-8 w-8">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-9 w-9 -translate-y-[1px] stroke-[#879477] fill-none stroke-[2] overflow-visible">
                      <path d="M50 82C50 82 88 56 88 34C88 18 73 6 56 18C50 23 50 23 50 23C50 23 50 23 44 18C27 6 12 18 12 34C12 56 50 82 50 82Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="relative z-10 font-bold text-[#3f4a38]">{day}</span>
                  </div>
                ) : (
                  <span className="text-[#687060] font-medium">{day}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FallingPetals({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, index) => {
        const isLeaf = index % 2 === 0
        const colorClass = isLeaf ? 'bg-[#9aaa8d]/25' : 'bg-[#e9d6cb]/45'
        const sizeWidth = 10 + (index % 4) * 3
        const sizeHeight = 14 + (index % 3) * 4
        const startLeft = 5 + (index * 6)

        return (
          <motion.span
            key={index}
            className={`absolute top-[-32px] rounded-tl-full rounded-br-full ${colorClass}`}
            style={{
              left: `${startLeft}%`,
              width: `${sizeWidth}px`,
              height: `${sizeHeight}px`,
            }}
            animate={{
              y: ['0vh', '108vh'],
              x: [0, index % 2 ? 35 : -35, index % 3 ? 15 : -15],
              rotate: [0, 180, 360],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 20 + (index % 6) * 3,
              repeat: Infinity,
              delay: index * 1.2,
              ease: 'linear',
            }}
          />
        )
      })}
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  )
}

function Heading({ overline, children }: { overline: string; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="relative mb-8 text-center">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-20 -translate-x-[180px] -translate-y-1/2 text-[#9aaa8d]/20 sm:block"
        animate={reduceMotion ? undefined : { rotate: [61, 67, 61] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originY: 0.5, originX: 0.5 }}
      >
        <BotanicalSprig className="h-full w-full" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-20 translate-x-[100px] -translate-y-1/2 text-[#9aaa8d]/20 sm:block"
        animate={reduceMotion ? undefined : { rotate: [-61, -67, -61] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ originY: 0.5, originX: 0.5 }}
      >
        <BotanicalSprig className="h-full w-full" flip />
      </motion.div>
      <p className="font-display text-xl text-[#b4a173]">✦</p>
      <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#879477]">{overline}</p>
      <h2 className="mt-3 font-display text-3xl text-[#3f4a38] sm:text-5xl">
        {typeof children === 'string' ? (
          <ScrollCharacterReveal text={children} />
        ) : (
          children
        )}
      </h2>
      <FloralDivider />
    </div>
  )
}

export default function BotanicalGardenTemplate({
  couple,
  gallery,
  wishes,
  weddingGift,
  locations,
  stories,
}: TemplateProps) {
  const reduceMotion = useReducedMotion()
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null || lightboxImages.length === 0) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % lightboxImages.length : null))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null))
      } else if (e.key === 'Escape') {
        setLightboxIndex(null)
        setLightboxImages([])
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, lightboxImages])
  const heroImage =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90'

  const storyItems = stories?.length
    ? stories
    : [
        {
          id: 1,
          title: 'Ngày đầu gặp gỡ',
          story_date: couple.wedding_date || '',
          description: 'Từ một cuộc gặp gỡ giản dị, chúng tôi đã tìm thấy ở nhau sự bình yên và đồng điệu.',
          image_url: gallery?.[1]?.image_url,
        },
        {
          id: 2,
          title: 'Cùng nhau trưởng thành',
          story_date: '',
          description: couple.intro_description || 'Những ngày bên nhau trở thành khu vườn nhỏ nuôi dưỡng tình yêu bằng sự chân thành.',
          image_url: gallery?.[2]?.image_url,
        },
        {
          id: 3,
          title: 'Về chung một nhà',
          story_date: couple.wedding_date || '',
          description: 'Chúng tôi chọn nắm tay nhau bước vào một hành trình mới, với gia đình và những người thân yêu bên cạnh.',
          image_url: gallery?.[3]?.image_url,
        },
      ]

  return (
    <div className="theme-botanical relative min-h-screen overflow-hidden bg-bg-main text-primary">
      <FallingPetals enabled={!reduceMotion} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:radial-gradient(#718064_0.55px,transparent_0.55px)] [background-size:18px_18px]" />

      <motion.div
        className="pointer-events-none absolute -left-16 top-[17%] h-72 w-48 text-[#748469]/30"
        animate={reduceMotion ? undefined : { rotate: [-3, 3, -3], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BotanicalSprig className="h-full w-full" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-16 top-[48%] h-80 w-52 text-[#879477]/25"
        animate={reduceMotion ? undefined : { rotate: [4, -2, 4], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BotanicalSprig className="h-full w-full" flip />
      </motion.div>

      <header className="relative mx-auto max-w-6xl px-3 pb-10 pt-3 sm:px-6 sm:pt-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[#faf7ef] shadow-[0_28px_80px_rgba(74,86,65,0.16)]"
        >
          <div className="relative min-h-[82svh]">
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={heroImage}
                alt={`Ảnh cưới của ${couple.bride_name} và ${couple.groom_name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1150px"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#30402d]/5 via-transparent to-[#263423]/70" />
            <motion.div
              className="absolute -left-8 -top-8 h-48 w-32 text-[#edf1e7]/75 sm:h-72 sm:w-48"
              animate={reduceMotion ? undefined : { rotate: [16, 21, 16] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              style={{ originY: 0, originX: 0 }}
            >
              <BotanicalSprig className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute -right-8 -top-8 h-48 w-32 text-[#edf1e7]/75 sm:h-72 sm:w-48"
              animate={reduceMotion ? undefined : { rotate: [-16, -21, -16] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ originY: 0, originX: 1 }}
            >
              <BotanicalSprig className="h-full w-full" flip />
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-center text-white sm:px-12 sm:pb-14 z-20">
              <motion.p
                className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#eff2e8]"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2 }}
              >
                Save The Date
              </motion.p>
              <h1 className="mt-4 font-display text-[1.8rem] xs:text-[2.2rem] min-[390px]:text-[2.5rem] sm:text-6xl md:text-7xl leading-[1.02] drop-shadow-lg whitespace-nowrap flex items-center justify-center gap-1 sm:gap-2">
                <CharacterReveal text={couple.bride_name} delay={0.4} />
                <motion.span
                  className="mx-2 font-normal italic text-[#e5d5af] inline-block"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.75, damping: 12 }}
                >
                  &amp;
                </motion.span>
                <CharacterReveal text={couple.groom_name} delay={0.85} />
              </h1>
              <motion.p
                className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/85"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.65 }}
              >
                {couple.wedding_date || 'Our wedding day'}
              </motion.p>
              <motion.div
                className="mx-auto mt-7 h-px w-24 bg-[#e5d5af]"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                style={{ originX: 0.5 }}
              />
              <motion.p
                className="mx-auto mt-5 max-w-lg text-xs leading-6 text-white/80 sm:text-sm"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.95 }}
              >
                We are getting married in a garden filled with love, sunlight and everyone we cherish.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </header>

      <main className="relative">
        <section className="mx-auto max-w-4xl px-4 py-9 sm:px-6 sm:py-14">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 px-6 py-10 text-center shadow-[0_20px_60px_rgba(74,86,65,0.09)] backdrop-blur-md sm:px-12 sm:py-14">
              <BotanicalSprig className="absolute -bottom-16 -left-12 h-56 w-36 rotate-[32deg] text-[#8fa083]/20" />
              <BotanicalSprig className="absolute -right-12 -top-16 h-56 w-36 rotate-[-28deg] text-[#8fa083]/20" flip />
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#879477]">Our Love Story Begins</p>
              <h2 className="mt-4 font-display text-3xl text-[#3f4a38] sm:text-5xl">Chúng tôi sắp kết hôn</h2>
              <FloralDivider />
              <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-8 text-[#687060]">
                {couple.intro_description || 'Giữa khu vườn đầy nắng và hoa, chúng tôi mong được chia sẻ ngày hạnh phúc cùng gia đình và những người thân yêu.'}
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 sm:pb-14">
          <Reveal>
            <div className="relative grid overflow-hidden rounded-[30px] border border-[#d7decf] bg-white/70 p-3 shadow-[0_20px_60px_rgba(74,86,65,0.1)] sm:grid-cols-[1.05fr_0.95fr] sm:p-4">
              <FloatingGardenFrame className="-left-14 -top-20 h-64 w-40" rotate={35} delay={0.2} />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px]">
                <Image
                  src={gallery?.[1]?.image_url || heroImage}
                  alt={`Ảnh cặp đôi ${couple.bride_name} và ${couple.groom_name}`}
                  fill
                  sizes="(max-width: 640px) 90vw, 520px"
                  className="object-cover"
                />
              </div>
              <div className="relative flex flex-col justify-center px-5 py-9 text-center sm:px-10 sm:text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#879477]">Garden Portrait</p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-[#3f4a38] sm:text-5xl">
                  European garden,
                  <span className="block italic text-[#a8976d]">timeless love.</span>
                </h2>
                <div className="my-6 h-px w-20 bg-[#b4a173] max-sm:mx-auto" />
                <p className="text-sm leading-8 text-[#687060]">
                  Một khung ảnh mềm như ánh nắng trong nhà kính, nơi hoa trắng, eucalyptus và champagne gold giữ lại khoảnh khắc đẹp nhất của ngày cưới.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <FloatingGardenFrame className="-left-20 top-24 h-72 w-48" rotate={22} delay={0.4} />
          <FloatingGardenFrame className="-right-20 bottom-16 h-72 w-48" rotate={-22} delay={0.8} />
          <Heading overline="A Journey Through The Garden">Hành trình yêu thương</Heading>
          <div className="relative mx-auto max-w-3xl before:absolute before:bottom-0 before:left-[21px] before:top-0 before:w-px before:bg-[#bdc8b4] sm:before:left-1/2">
            {storyItems.map((story, index) => (
              <Reveal key={story.id} delay={index * 0.05}>
                <article className={`relative mb-9 pl-14 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}>
                  <span className="absolute left-[10px] top-7 z-10 grid h-6 w-6 place-items-center rounded-full border-4 border-[#f5f1e8] bg-[#879477] text-[10px] text-white sm:left-1/2 sm:-translate-x-1/2">
                    ✦
                  </span>
                  <div className={`${index % 2 ? 'sm:col-start-2' : ''}`}>
                    <motion.div
                      whileHover={reduceMotion ? undefined : { y: -6, boxShadow: "0 22px 55px rgba(74,86,65,0.13)" }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative overflow-hidden rounded-[22px] border border-[#d6ddcf] bg-white/90 p-3 shadow-[0_16px_45px_rgba(74,86,65,0.08)]"
                    >
                      <span className="absolute right-5 top-4 font-display text-4xl text-[#d8c9a8]/55">{String(index + 1).padStart(2, '0')}</span>
                      <BotanicalSprig className="absolute -bottom-16 -right-12 h-48 w-32 rotate-[-35deg] text-[#9aaa8d]/12" flip />
                      {story.image_url && (
                        <button type="button" onClick={() => {
                          if (story.image_url) {
                            setLightboxImages([story.image_url])
                            setLightboxIndex(0)
                          }
                        }} className="relative block aspect-[3/4] w-full overflow-hidden rounded-[16px]">
                          <Image src={story.image_url} alt={story.title} fill sizes="(max-width: 640px) 85vw, 360px" className="object-cover transition duration-700 hover:scale-105" />
                        </button>
                      )}
                      <div className="relative px-3 py-5">
                        {story.story_date && <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a38a5a]">{story.story_date}</p>}
                        <div className="mt-3 flex items-center gap-3 sm:justify-inherit">
                          <span className="text-[#879477]">🌿</span>
                          <span className="h-px flex-1 bg-[#d6ddcf]" />
                        </div>
                        <h3 className="mt-3 font-display text-2xl text-[#44503e]">{story.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[#72796c]">{story.description}</p>
                      </div>
                    </motion.div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-[#edf1e9]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Heading overline="Captured In Bloom">Album kỷ niệm</Heading>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {gallery?.map((image, index) => {
                const isLeft = index % 2 === 0
                const xOffset = isLeft ? -60 : 60
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: xOffset }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.02 }}
                    transition={{
                      duration: 1.4,
                      ease: [0.16, 1, 0.3, 1] as const,
                      delay: (index % 2) * 0.12,
                    }}
                    className="w-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const urls = gallery?.map(img => img.image_url) || []
                        setLightboxImages(urls)
                        setLightboxIndex(index)
                      }}
                      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[18px] border-[4px] sm:border-[6px] border-white bg-white shadow-[0_12px_35px_rgba(74,86,65,0.1)]"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.caption || 'Ảnh cưới'}
                        fill
                        sizes="(max-width: 640px) 50vw, 450px"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="location" className="mx-auto max-w-5xl px-3 py-12 sm:px-6 sm:py-16">
          <Heading overline="Wedding Celebration">Thông tin hôn lễ</Heading>
          <Reveal>
            <div className="overflow-hidden rounded-[30px] border border-[#ced8c6] bg-white/75 shadow-[0_20px_60px_rgba(74,86,65,0.1)] [&_section]:bg-transparent">
              <LocationSection
                weddingDate={couple.wedding_date}
                weddingTime={couple.wedding_time}
                brideInfo={{
                  title: locations?.bride_event_title,
                  location: locations?.bride_location,
                  address: locations?.bride_address,
                  mapEmbedUrl: locations?.bride_google_map_embed,
                }}
                groomInfo={{
                  title: locations?.groom_event_title,
                  location: locations?.groom_location,
                  address: locations?.groom_address,
                  mapEmbedUrl: locations?.groom_google_map_embed,
                }}
              />
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
          <Reveal>
            <div className="rounded-[28px] border border-[#d3dccb] bg-white/75 px-4 py-9 shadow-[0_18px_55px_rgba(74,86,65,0.09)] backdrop-blur">
              <Heading overline="Counting Down">Ngày hạnh phúc đang đến</Heading>
              
              <div className="mb-6 flex justify-center">
                <WeddingCalendar weddingDate={couple.wedding_date} />
              </div>
              
              <div className="h-px w-32 bg-[#bdc8b4] mx-auto mb-8 opacity-65" />

              <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-5xl px-3 py-8 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <Reveal>
            <GiftSection couple={couple} weddingGift={weddingGift} />
          </Reveal>
        </div>

        <div id="rsvp" className="mx-auto max-w-5xl px-3 py-8 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <Reveal>
            <RsvpSection
              coupleId={couple.id}
              brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
              groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
              includeMessage
            />
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-3 py-8 pb-20 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <Reveal>
            <WishSection coupleId={couple.id} initialWishes={wishes || []} />
          </Reveal>
        </div>
      </main>

      <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />
      <AudioPlayer musicUrl={couple.music_url} delay={couple.music_delay} volume={couple.music_volume} autoplay={couple.music_autoplay} />

      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <div
          onClick={() => {
            setLightboxIndex(null)
            setLightboxImages([])
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#182016]/96 p-4 backdrop-blur-md select-none"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => {
              setLightboxIndex(null)
              setLightboxImages([])
            }}
            className="absolute right-5 top-5 z-[110] px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/80 hover:text-white transition-colors bg-white/5 rounded-full border border-white/10 hover:bg-white/10"
          >
            Đóng
          </button>

          {/* Left Arrow */}
          {lightboxImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null))
              }}
              className="absolute left-4 md:left-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl text-white/80 hover:bg-black/70 hover:text-white transition-all active:scale-95"
              aria-label="Ảnh trước"
            >
              ⟨
            </button>
          )}

          {/* Image Container */}
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImages[lightboxIndex]}
              alt="Ảnh cưới phóng to"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Right Arrow */}
          {lightboxImages.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % lightboxImages.length : null))
              }}
              className="absolute right-4 md:right-8 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/45 text-xl text-white/80 hover:bg-black/70 hover:text-white transition-all active:scale-95"
              aria-label="Ảnh tiếp theo"
            >
              ⟩
            </button>
          )}

          {/* Page Counter Indicator */}
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[110] bg-black/45 border border-white/10 px-4 py-1.5 rounded-full text-xs text-white/80 tracking-widest font-medium">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
