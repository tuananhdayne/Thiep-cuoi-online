"use client"

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { TemplateProps } from './types'
import ImageLightbox from '../components/ImageLightbox'

function formatDate(value?: string | null) {
  if (!value) return '15.11.2026'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.replace(/-/g, '.')
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function formatWishDate(value: string) {
  const source = value.endsWith('Z') || value.includes('+') ? value : `${value}Z`
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(source))
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 1.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function TextileWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 360"
      className="h-full w-full"
      fill="none"
    >
      <g stroke="#2C2A29" strokeWidth="1.1" opacity="1">
        <path d="M30 70h60l25 25 25-25h60" />
        <path d="M30 130h60l25 25 25-25h60" />
        <path d="M30 190h60l25 25 25-25h60" />
        <path d="M30 250h60l25 25 25-25h60" />
        <path d="M95 35v60l25 25-25 25v60" />
        <path d="M165 35v60l25 25-25 25v60" />
        <path d="M235 35v60l25 25-25 25v60" />
        <path d="M55 55h250v250H55z" opacity="0.55" />
        <path d="M180 105l35 35-35 35-35-35 35-35Z" />
        <circle cx="180" cy="180" r="16" />
      </g>
    </svg>
  )
}

function FloatingAudioOrb({
  musicUrl,
  delay,
  volume,
  autoplay,
}: {
  musicUrl?: string | null
  delay?: number | null
  volume?: number | null
  autoplay?: boolean | null
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const normalizedVolume = Math.max(0, Math.min(volume ?? 0.28, 1))

  const tryPlay = async () => {
    const audio = audioRef.current
    if (!audio || !musicUrl) return false

    audio.volume = normalizedVolume
    audio.load()

    try {
      await audio.play()
      setIsPlaying(true)
      setNeedsTap(false)
      setManuallyPaused(false)
      return true
    } catch {
      setIsPlaying(false)
      setNeedsTap(true)
      return false
    }
  }

  useEffect(() => {
    if (!musicUrl) return

    const timer = window.setTimeout(() => {
      if (autoplay !== false && !manuallyPaused) {
        void tryPlay()
      }
    }, (delay ?? 15) * 1000)

    return () => window.clearTimeout(timer)
  }, [musicUrl, delay, autoplay, manuallyPaused])

  useEffect(() => {
    if (!musicUrl || isPlaying || manuallyPaused || autoplay === false) return

    const handleInteraction = () => {
      if (!isPlaying && !manuallyPaused) {
        void tryPlay()
      }
    }

    document.addEventListener('pointerdown', handleInteraction, { passive: true })
    document.addEventListener('keydown', handleInteraction)

    return () => {
      document.removeEventListener('pointerdown', handleInteraction)
      document.removeEventListener('keydown', handleInteraction)
    }
  }, [musicUrl, isPlaying, manuallyPaused, autoplay, normalizedVolume])

  if (!musicUrl) return null

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      setManuallyPaused(true)
      return
    }

    void tryPlay()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {needsTap && !isPlaying ? (
        <span className="rounded-full border border-[#2C2A29]/15 bg-[#F2EFE9]/95 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.35em] text-[#2C2A29]/70 backdrop-blur-sm">
          Bật nhạc
        </span>
      ) : null}
      <audio ref={audioRef} src={musicUrl} loop preload="auto" playsInline className="sr-only" aria-hidden="true" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#2C2A29]/20 bg-[#F2EFE9]/90 backdrop-blur-sm transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className={`absolute inset-1 rounded-full border border-dashed border-[#2C2A29]/20 ${isPlaying ? 'animate-spin [animation-duration:22s]' : ''}`} />
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2C2A29]">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5 text-[#2C2A29]">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default function MidnightTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
  const heroImage =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600'

  const themeClass =
    couple.theme && couple.theme !== 'midnight' ? `theme-${couple.theme}` : 'theme-midnight'

  const ceremonyDate = formatDate(couple.wedding_date)
  const ceremonyTime = couple.wedding_time || '12:00'
  const venueName = couple.location || 'The Oak House'
  const venueAddress = couple.address || '28 Nguyễn Du, Quận 1, TP. Hồ Chí Minh.'
  const introText =
    couple.intro_description ||
    'Chúng tôi trân trọng mời bạn đến chung vui trong buổi lễ thành hôn được thiết kế như một bản phác thảo kiến trúc: yên tĩnh, nhiều khoảng trống và rất ít chi tiết thừa.'

  const galleryTiles = gallery.slice(0, 6)
  const wishTiles = wishes.slice(0, 4)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)

  return (
    <div className={`relative overflow-hidden bg-[#F2EFE9] text-[#2C2A29] ${themeClass}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '220px 220px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10 lg:px-12">
        <section className="relative grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14 lg:min-h-[calc(100vh-5rem)] lg:items-start">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
            <div className="absolute right-[-2rem] top-10 h-72 w-72 opacity-[0.03] md:h-96 md:w-96">
              <TextileWatermark />
            </div>
          </div>

          <FadeIn className="col-span-12 flex items-start justify-between border-b border-[#2C2A29]/10 pb-4 md:col-span-10 md:col-start-2">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/65">
                  Thiệp mời lễ cưới
                </p>
                <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-[#E34234]" />
              </div>
              <p className="max-w-xs text-[0.68rem] uppercase tracking-[0.4em] text-[#2C2A29]/35">
                Cấu Trúc Nguyên Bản / The Asymmetrical Canvas
              </p>
            </div>
            <span className="h-px w-10 bg-[#E34234]" aria-hidden="true" />
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-2 lg:pt-10" delay={0.08}>
            <div className="space-y-6">
              <p className="text-[0.7rem] uppercase tracking-[0.55em] text-[#2C2A29]/55">
                {ceremonyDate}
              </p>
              <h1 className="max-w-md break-words font-display text-[clamp(2rem,6.8vw,4.6rem)] leading-[0.9] tracking-[clamp(0.1em,0.45vw,0.28em)] text-[#2C2A29]">
                {couple.groom_name}
                <span className="mt-4 block text-sm tracking-[0.8em] text-[#E34234] md:text-base">●</span>
                <span className="mt-5 block text-[0.7em] tracking-[0.55em] text-[#2C2A29]/75">&</span>
                <span className="mt-4 block">{couple.bride_name}</span>
              </h1>
              <p className="max-w-md text-sm leading-7 text-[#2C2A29]/75 md:text-base">
                {introText}
              </p>
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-4 md:col-start-8 lg:col-span-4 lg:col-start-8 lg:row-span-3 lg:pt-6" delay={0.15}>
            <div className="ml-auto w-full max-w-[22rem] lg:max-w-none">
              <div
                className="overflow-hidden border border-[#2C2A29]/14 bg-[#e9e3d8]"
                style={{ borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}
              >
                <img
                  src={heroImage}
                  alt="Ảnh cưới chính"
                  className="h-[32rem] w-full object-cover object-center md:h-[38rem]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.5em] text-[#2C2A29]/45">
                <span>Hero / Arch frame</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E34234]" />
              </div>
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-2 lg:pt-2" delay={0.2}>
            <div className="space-y-5 border-l border-[#2C2A29]/12 pl-5 md:pl-6">
              <p className="text-[0.7rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                Lễ cưới & Tiệc cưới
              </p>
              <div className="space-y-5">
                <div className="grid grid-cols-[0.9rem_1fr] gap-4">
                  <div className="relative pt-1">
                    <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2C2A29]" />
                    <span className="absolute left-1/2 top-3 bottom-0 w-px -translate-x-1/2 bg-[#2C2A29]/20" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#2C2A29]/75">Đón khách</p>
                    <p className="mt-2 text-sm leading-7 text-[#2C2A29]/72">
                      {ceremonyTime} - Đón khách, ổn định chỗ ngồi và nhận lời chúc đầu tiên.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[0.9rem_1fr] gap-4">
                  <div className="relative pt-1">
                    <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2C2A29]" />
                    <span className="absolute left-1/2 top-3 bottom-0 w-px -translate-x-1/2 bg-[#2C2A29]/20" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#2C2A29]/75">Làm lễ</p>
                    <p className="mt-2 text-sm leading-7 text-[#2C2A29]/72">
                      Cùng hai gia đình chứng kiến nghi thức và khoảnh khắc chính của buổi lễ.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-[0.9rem_1fr] gap-4">
                  <div className="relative pt-1">
                    <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2C2A29]" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#2C2A29]/75">Tiệc mặn</p>
                    <p className="mt-2 text-sm leading-7 text-[#2C2A29]/72">
                      Nâng ly, chụp ảnh và cùng chia sẻ lời chúc sau nghi lễ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-4 md:col-start-6 lg:col-span-3 lg:col-start-6 lg:pt-2" delay={0.24}>
            <div className="space-y-8 border-t border-[#2C2A29]/12 pt-5">
              
              {/* Địa điểm Nhà Gái */}
              {(locations?.bride_location || locations?.bride_address) && (
                  <div className="space-y-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                      {locations.bride_event_title || 'Nhà Gái'}
                    </p>
                    <div className="space-y-3">
                      <p className="max-w-sm text-sm leading-7 text-[#2C2A29]/76 md:text-base font-medium">
                        {locations.bride_location}
                      </p>
                      <p className="max-w-sm text-sm leading-7 text-[#2C2A29]/68">{locations.bride_address}</p>
                      {locations.bride_google_map_embed && (
                          <a href={locations.bride_google_map_embed} target="_blank" rel="noreferrer" className="inline-block border-b border-[#2C2A29]/50 pb-0.5 text-xs uppercase tracking-widest text-[#2C2A29]/80 hover:text-[#2C2A29]">
                              Xem Bản Đồ
                          </a>
                      )}
                    </div>
                  </div>
              )}

              {/* Địa điểm Nhà Trai */}
              {(locations?.groom_location || locations?.groom_address) && (
                  <div className="space-y-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                      {locations.groom_event_title || 'Nhà Trai'}
                    </p>
                    <div className="space-y-3">
                      <p className="max-w-sm text-sm leading-7 text-[#2C2A29]/76 md:text-base font-medium">
                        {locations.groom_location}
                      </p>
                      <p className="max-w-sm text-sm leading-7 text-[#2C2A29]/68">{locations.groom_address}</p>
                      {locations.groom_google_map_embed && (
                          <a href={locations.groom_google_map_embed} target="_blank" rel="noreferrer" className="inline-block border-b border-[#2C2A29]/50 pb-0.5 text-xs uppercase tracking-widest text-[#2C2A29]/80 hover:text-[#2C2A29]">
                              Xem Bản Đồ
                          </a>
                      )}
                    </div>
                  </div>
              )}

            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-4 md:col-start-10 lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-2" delay={0.3}>
            <div className="translate-x-1 rotate-[5deg] text-right">
              <p className="text-[0.65rem] uppercase tracking-[0.6em] text-[#2C2A29]/35">
                Date stamp
              </p>
              <div className="mt-3 inline-flex items-center justify-center rounded-full border border-dashed border-[#2C2A29]/35 px-5 py-4">
                <p className="font-display text-xl tracking-[0.35em] text-[#2C2A29]/72">
                  {ceremonyDate}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="col-span-12 md:col-span-10 md:col-start-2 lg:mt-4" delay={0.34}>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                  Dress Code
                </p>
                <p className="mt-3 text-sm leading-7 text-[#2C2A29]/76">
                  Tông trắng, kem, nâu nhạt. Tránh họa tiết quá mạnh để giữ nhịp thị giác của không gian.
                </p>
              </div>
              <div className="border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5 md:translate-y-8">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                  RSVP
                </p>
                <p className="mt-3 text-sm leading-7 text-[#2C2A29]/76">
                  Vui lòng xác nhận trước ngày 01.11 để chúng tôi chuẩn bị chỗ ngồi và bữa tiệc chu đáo.
                </p>
              </div>
              <div className="border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                  Family
                </p>
                <p className="mt-3 text-sm leading-7 text-[#2C2A29]/76">
                  {couple.groom_name} & {couple.bride_name}, cùng gia đình hai bên hân hạnh đón tiếp.
                </p>
              </div>
            </div>
          </FadeIn>

          {galleryTiles.length > 0 ? (
            <FadeIn className="col-span-12 mt-2 md:col-span-10 md:col-start-2 lg:mt-6" delay={0.4}>
              <div className="grid grid-cols-12 gap-3 auto-rows-[8rem] md:auto-rows-[9rem]">
                {galleryTiles.map((item, index) => {
                  const spanClass =
                    index === 0
                      ? 'col-span-12 row-span-3 md:col-span-7 md:row-span-5'
                      : index === 1
                        ? 'col-span-6 row-span-2 md:col-span-5 md:row-span-3'
                        : index === 2
                          ? 'col-span-6 row-span-2 md:col-span-4 md:row-span-4'
                          : index === 3
                            ? 'col-span-6 row-span-2 md:col-span-3 md:row-span-3'
                            : index === 4
                              ? 'col-span-6 row-span-2 md:col-span-4 md:row-span-3'
                              : 'col-span-12 row-span-2 md:col-span-5 md:row-span-3'

                  return (
                    <button key={item.id} type="button" onClick={() => setSelectedGalleryIndex(index)} className={`overflow-hidden border border-[#2C2A29]/10 bg-[#e9e3d8] text-left ${spanClass}`}>
                      <img
                        src={item.image_url}
                        alt={item.caption || `Ảnh cưới ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </FadeIn>
          ) : null}

          {/* ── Hộp Mừng Cưới ── */}
          {weddingGift?.is_enabled && (weddingGift?.groom_bank_account || weddingGift?.bride_bank_account) ? (
            <FadeIn className="col-span-12 md:col-span-10 md:col-start-2" delay={0.43}>
              <div className="space-y-5">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                  Wedding Gift — Hộp Mừng Cưới
                </p>
                <p className="max-w-md text-sm leading-7 text-[#2C2A29]/65 italic">
                  Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha. Cảm ơn bạn rất nhiều!
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {weddingGift?.groom_bank_account && (
                    <div className="border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5 text-center flex flex-col h-full">
                      <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55 mb-4">
                        ❀ Mừng cưới đến chú rể
                      </p>
                      {weddingGift?.groom_bank_qr && (
                        <div className="flex justify-center mb-4 flex-grow items-center">
                          <img
                            src={weddingGift?.groom_bank_qr}
                            alt="QR chú rể"
                            className="w-32 h-32 object-contain border border-[#2C2A29]/10"
                          />
                        </div>
                      )}
                      <div className="space-y-1 text-sm leading-7 text-[#2C2A29]/76 mt-auto pt-2">
                        {weddingGift?.groom_bank_name && (
                          <p>NH: <strong className="text-[#2C2A29]">{weddingGift?.groom_bank_name}</strong></p>
                        )}
                        {weddingGift?.groom_bank_holder && (
                          <p>Tên: <strong className="text-[#2C2A29]">{weddingGift?.groom_bank_holder}</strong></p>
                        )}
                        <p>STK: <strong className="text-[#2C2A29]">{weddingGift?.groom_bank_account}</strong></p>
                      </div>
                    </div>
                  )}
                  {weddingGift?.bride_bank_account && (
                    <div className="border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5 text-center flex flex-col h-full">
                      <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55 mb-4">
                        ❀ Mừng cưới đến cô dâu
                      </p>
                      {weddingGift?.bride_bank_qr && (
                        <div className="flex justify-center mb-4 flex-grow items-center">
                          <img
                            src={weddingGift?.bride_bank_qr}
                            alt="QR cô dâu"
                            className="w-32 h-32 object-contain border border-[#2C2A29]/10"
                          />
                        </div>
                      )}
                      <div className="space-y-1 text-sm leading-7 text-[#2C2A29]/76 mt-auto pt-2">
                        {weddingGift?.bride_bank_name && (
                          <p>NH: <strong className="text-[#2C2A29]">{weddingGift?.bride_bank_name}</strong></p>
                        )}
                        {weddingGift?.bride_bank_holder && (
                          <p>Tên: <strong className="text-[#2C2A29]">{weddingGift?.bride_bank_holder}</strong></p>
                        )}
                        <p>STK: <strong className="text-[#2C2A29]">{weddingGift?.bride_bank_account}</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ) : null}

          {wishTiles.length > 0 ? (
            <FadeIn className="col-span-12 md:col-span-10 md:col-start-2" delay={0.46}>
              <div className="space-y-4">
                <p className="text-[0.68rem] uppercase tracking-[0.5em] text-[#2C2A29]/55">
                  Guestbook
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {wishTiles.map((wish, index) => (
                    <div
                      key={wish.id}
                      className={`border border-[#2C2A29]/10 bg-[#F2EFE9] px-5 py-5 ${index % 2 === 1 ? 'md:translate-y-6' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[#2C2A29]/55">
                            {galleryTiles.length > 0 && (
                              <ImageLightbox
                                images={galleryTiles}
                                selectedIndex={selectedGalleryIndex}
                                onClose={() => setSelectedGalleryIndex(null)}
                                onPrev={() =>
                                  setSelectedGalleryIndex((current) =>
                                    current === null ? null : (current - 1 + galleryTiles.length) % galleryTiles.length
                                  )
                                }
                                onNext={() =>
                                  setSelectedGalleryIndex((current) =>
                                    current === null ? null : (current + 1) % galleryTiles.length
                                  )
                                }
                              />
                            )}
                          {wish.name || 'Ẩn danh'}
                        </p>
                        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-[#2C2A29]/35">
                          {formatWishDate(wish.created_at)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#2C2A29]/76">{wish.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ) : null}
        </section>
      </div>

      <FloatingAudioOrb
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay}
      />
    </div>
  )
}
