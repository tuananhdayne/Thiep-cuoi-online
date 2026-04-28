'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import AudioPlayer from '../components/AudioPlayer'
import ImageLightbox from '../components/ImageLightbox'
import { TemplateProps } from './types'

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const formatShortDate = (dateStr?: string | null) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr))
}

const formatTime = (timeStr?: string | null) => {
  if (!timeStr) return ''
  return timeStr.slice(0, 5)
}

const extractMapSrc = (value?: string | null) => {
  if (!value) return null
  const iframeMatch = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
  if (iframeMatch?.[1]) return iframeMatch[1].trim()
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return null
}

const buildEmbedUrl = (mapValue: string | null, location?: string | null, address?: string | null) => {
  const source = mapValue?.trim() || ''

  if (source.includes('/embed')) {
    return source
  }

  const query = `${location || ''} ${address || ''}`.trim()
  if (query) {
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  }

  if (source && /google\.com\/maps|maps\.google/i.test(source)) {
    return source.includes('output=embed') ? source : `${source}${source.includes('?') ? '&' : '?'}output=embed`
  }

  return null
}

const getDirectMapLink = (mapUrl: string | null, location?: string | null, address?: string | null) => {
  if (!mapUrl) {
    const query = `${location || ''} ${address || ''}`.trim()
    return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : '#'
  }

  const isEmbed = mapUrl.includes('/embed') || mapUrl.includes('output=embed')
  if (!isEmbed) return mapUrl

  const pbMatch = mapUrl.match(/[?&]pb=([^&]+)/)
  if (pbMatch) {
    const pb = pbMatch[1]
    const lngMatch = pb.match(/!2d([0-9.-]+)/)
    const latMatch = pb.match(/!3d([0-9.-]+)/)
    if (latMatch && lngMatch) {
      return `https://www.google.com/maps/search/?api=1&query=${latMatch[1]},${lngMatch[1]}`
    }
  }

  const query = `${location || ''} ${address || ''}`.trim()
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

function DragonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M8 42c12-14 23-20 40-20 10 0 18 3 28 9 8 5 17 7 28 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M30 34c6-10 16-16 30-18 10-2 19 1 26 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="92" cy="32" r="3" fill="currentColor" />
      <path d="M90 20l8-6 4 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function PhoenixIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M112 42c-12-14-23-20-40-20-10 0-18 3-28 9-8 5-17 7-28 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M90 34c-6-10-16-16-30-18-10-2-19 1-26 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="32" r="3" fill="currentColor" />
      <path d="M30 20l-8-6-4 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function DoubleHappiness({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="text-[8rem] md:text-[12rem] font-[600] tracking-widest">囍</span>
    </div>
  )
}

export default function LuxuryTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
  const heroImage =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600'

  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [activeVenue, setActiveVenue] = useState<'bride' | 'groom'>('bride')
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)

  const brideTitle = locations?.bride_event_title || 'Lễ Vu Quy'
  const brideDate = formatShortDate(locations?.bride_event_date || couple.wedding_date)
  const brideTime = formatTime(locations?.bride_event_time || couple.wedding_time) || '09:00'
  const brideVenue = locations?.bride_location || 'Tư Gia Nhà Gái'
  const brideAddr = locations?.bride_address || '123 Đường Hoa Hồng, Quận 1, TP. HCM'
  const brideMapLink = locations?.bride_google_map_embed

  const groomTitle = locations?.groom_event_title || 'Lễ Thành Hôn'
  const groomDate = formatShortDate(locations?.groom_event_date || couple.wedding_date)
  const groomTime = formatTime(locations?.groom_event_time || couple.wedding_time) || '18:00'
  const groomVenue = locations?.groom_location || 'Trung tâm Hội nghị The Grand'
  const groomAddr = locations?.groom_address || '456 Đại lộ Hạnh Phúc, Quận 7, TP. HCM'
  const groomMapLink = locations?.groom_google_map_embed

  const currentVenue = activeVenue === 'bride'
    ? {
        title: brideTitle,
        date: brideDate,
        time: brideTime,
        location: brideVenue,
        address: brideAddr,
        map: brideMapLink,
      }
    : {
        title: groomTitle,
        date: groomDate,
        time: groomTime,
        location: groomVenue,
        address: groomAddr,
        map: groomMapLink,
      }

  const currentMapSrc = extractMapSrc(currentVenue.map)
  const currentMapEmbed = buildEmbedUrl(currentMapSrc, currentVenue.location, currentVenue.address)
  const currentMapLink = getDirectMapLink(currentMapSrc, currentVenue.location, currentVenue.address)

  const timeline = [
    {
      title: brideTitle,
      date: brideDate,
      time: brideTime,
      location: brideVenue,
      address: brideAddr,
      map: brideMapLink,
      side: 'bride',
    },
    {
      title: groomTitle,
      date: groomDate,
      time: groomTime,
      location: groomVenue,
      address: groomAddr,
      map: groomMapLink,
      side: 'groom',
    },
  ]

  const wishList = wishes.slice(0, 6)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formMsg.trim()) return

    setIsSubmitting(true)
    try {
      await supabase.from('wishes').insert([
        { couple_id: couple.id, name: formName.trim(), message: formMsg.trim() },
      ])
      setToastMsg('Gửi lời chúc thành công!')
      setFormName('')
      setFormMsg('')
      setTimeout(() => setToastMsg(''), 3000)
    } catch {
      setToastMsg('Có lỗi xảy ra.')
      setTimeout(() => setToastMsg(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#8B0000,#4B0000)] text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(212,175,55,0.4) 1px, transparent 0), radial-gradient(circle at 14px 14px, rgba(212,175,55,0.3) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <DoubleHappiness className="absolute left-1/2 top-10 -translate-x-1/2 text-[#FFD700]/20" />
        <div className="absolute -left-10 top-1/4 h-52 w-52 rounded-full border border-[#D4AF37]/30 blur-[1px]" />
        <div className="absolute -right-12 bottom-20 h-64 w-64 rounded-full border border-[#D4AF37]/20" />
      </div>

      <section className="relative z-10 flex min-h-[92vh] items-center justify-center px-6 py-16 text-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Ảnh bìa"
            className="relative z-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(75,0,0,0.05)_0%,rgba(75,0,0,0.12)_42%,rgba(75,0,0,0.25)_100%)]" />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(139,0,0,0.08)_72%,rgba(75,0,0,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#4B0000]/70 to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 w-full max-w-3xl"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-[#FFD700]">Thiệp Hỷ Truyền Thống</p>

          <div className="mt-10 flex items-center justify-center gap-4 md:gap-8">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
              <DragonIcon className="h-12 w-28 text-[#D4AF37] md:h-14 md:w-36" />
            </motion.div>

            <div className="px-4">
              <h1
                className="text-5xl md:text-7xl leading-tight text-[#FFD700]"
                style={{ fontFamily: '"Great Vibes", "Playfair Display", serif' }}
              >
                {couple.bride_name}
              </h1>
              <div className="my-2 text-2xl text-white/80">&amp;</div>
              <h1
                className="text-5xl md:text-7xl leading-tight text-[#FFD700]"
                style={{ fontFamily: '"Great Vibes", "Playfair Display", serif' }}
              >
                {couple.groom_name}
              </h1>
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.8 }}>
              <PhoenixIcon className="h-12 w-28 text-[#D4AF37] md:h-14 md:w-36" />
            </motion.div>
          </div>

          <div className="mx-auto mt-8 h-px w-24 bg-[#FFD700]/70" />
          <p className="mt-6 text-sm uppercase tracking-[0.5em] text-white/90">
            {formatDate(couple.wedding_date)}
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#8B0000]/70 px-5 py-2 text-xs uppercase tracking-[0.4em] text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            Long Trọng • Truyền Thống
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 bg-[#4B0000]/60 px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={fadeUp}
          className="mx-auto max-w-3xl rounded-[28px] border border-[#D4AF37]/50 bg-[#5a0000]/70 p-8 text-center shadow-[0_0_24px_rgba(212,175,55,0.2)] md:p-12"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Lời Ngỏ</p>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.2em] text-white">Trân Trọng Kính Mời</h2>
          <p className="mt-6 text-base leading-8 text-white/80">
            {couple.intro_description ||
              'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày trọng đại. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.'}
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Chương Trình</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Ngày Vui</h2>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#D4AF37]/40" />
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`relative flex flex-col gap-6 md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-1/2 top-5 h-4 w-4 -translate-x-1/2 rounded-full bg-[#FFD700] shadow-[0_0_18px_rgba(212,175,55,0.6)]" />
                <div className="w-full md:w-1/2" />
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#5a0000]/75 p-6 shadow-[0_0_24px_rgba(212,175,55,0.2)]">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">{item.date} • {item.time}</p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.2em] text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/80">
                      <span className="font-semibold text-white">{item.location}</span>
                      <br />
                      {item.address}
                    </p>
                    {item.map && (
                      <a
                        href={item.map}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center justify-center rounded-full border border-[#D4AF37]/60 px-5 py-2 text-xs uppercase tracking-[0.3em] text-[#FFD700] transition-colors hover:bg-[#FFD700] hover:text-[#4B0000]"
                      >
                        Bản Đồ
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {(currentMapEmbed || currentVenue.location || currentVenue.address) && (
        <section className="relative z-10 bg-[#4B0000]/55 px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeUp}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Bản Đồ</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Xem Trên Google Maps</h2>
          </motion.div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[28px] border border-[#D4AF37]/50 bg-[#5a0000]/75 p-4 shadow-[0_0_24px_rgba(212,175,55,0.2)] md:p-6">
            <div className="flex justify-center">
              <div className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#4B0000] p-1">
                <button
                  type="button"
                  onClick={() => setActiveVenue('bride')}
                  className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em] transition-colors ${activeVenue === 'bride' ? 'bg-[#FFD700] text-[#4B0000]' : 'text-white/80 hover:text-white'}`}
                >
                  Nhà Gái
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVenue('groom')}
                  className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em] transition-colors ${activeVenue === 'groom' ? 'bg-[#FFD700] text-[#4B0000]' : 'text-white/80 hover:text-white'}`}
                >
                  Nhà Trai
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#D4AF37]/40 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="bg-[#5a0000]/80 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">
                  {activeVenue === 'bride' ? 'Nhà Gái' : 'Nhà Trai'}
                </p>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.16em] text-white">
                  {currentVenue.title}
                </h3>
                <p className="mt-5 text-sm uppercase tracking-[0.3em] text-white/85">
                  {currentVenue.date} • {currentVenue.time}
                </p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-white/80">
                  <p>
                    <span className="block text-xs uppercase tracking-[0.35em] text-[#FFD700]">Địa điểm</span>
                    <span className="mt-1 block text-white">{currentVenue.location}</span>
                  </p>
                  <p>
                    <span className="block text-xs uppercase tracking-[0.35em] text-[#FFD700]">Địa chỉ</span>
                    <span className="mt-1 block">{currentVenue.address}</span>
                  </p>
                </div>

                <a
                  href={currentMapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#8B0000] px-5 py-3 text-xs uppercase tracking-[0.35em] text-[#FFD700] transition-colors hover:bg-[#FFD700] hover:text-[#4B0000]"
                >
                  Mở trên Google Maps
                </a>
              </div>

              <div className="min-h-[320px] bg-[#3f0000] md:min-h-[420px]">
                {currentMapEmbed ? (
                  <iframe
                    src={currentMapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    suppressHydrationWarning
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full min-h-[320px] items-center justify-center text-center text-[#FFD700]">
                    <div>
                      <p className="text-4xl">🗺️</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.3em]">Chưa có bản đồ</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {gallery && gallery.length > 0 && (
        <section className="relative z-10 bg-[#4B0000]/60 px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeUp}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Khoảnh Khắc</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Album Ảnh</h2>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 9).map((img, idx) => (
              <motion.div
                key={img.id || idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-[#D4AF37]/50 bg-[#5a0000]/70 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedGalleryIndex(idx)}
                  className="block w-full text-left"
                >
                  <img
                    src={img.image_url}
                    alt={img.caption || `Ảnh cưới ${idx + 1}`}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <ImageLightbox
          images={gallery.slice(0, 9)}
          selectedIndex={selectedGalleryIndex}
          onClose={() => setSelectedGalleryIndex(null)}
          onPrev={() =>
            setSelectedGalleryIndex((current) =>
              current === null ? null : (current - 1 + gallery.slice(0, 9).length) % gallery.slice(0, 9).length
            )
          }
          onNext={() =>
            setSelectedGalleryIndex((current) =>
              current === null ? null : (current + 1) % gallery.slice(0, 9).length
            )
          }
        />
      )}
      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={fadeUp}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Thông Tin</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Lễ Cưới</h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {timeline.map((item) => (
            <motion.div
              key={`${item.title}-${item.side}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="rounded-2xl border border-[#D4AF37]/50 bg-[#5a0000]/75 p-6 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-[#FFD700] text-[#FFD700] flex items-center justify-center">
                {item.side === 'bride' ? 'N' : 'T'}
              </div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">{item.side === 'bride' ? 'Nhà Gái' : 'Nhà Trai'}</p>
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.2em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm text-white/80">
                {item.date} • {item.time}
              </p>
              <p className="mt-2 text-sm text-white/80">
                <span className="font-semibold text-white">{item.location}</span>
                <br />
                {item.address}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {weddingGift?.is_enabled && (
        <section className="relative z-10 bg-[#4B0000]/60 px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Hộp Mừng</p>
            <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Mừng Cưới</h2>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {weddingGift.bride_bank_name && weddingGift.bride_bank_account && (
              <div className="rounded-2xl border border-[#D4AF37]/50 bg-[#5a0000]/75 p-6 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">Nhà Gái</p>
                {weddingGift.bride_bank_qr && (
                  <img
                    src={weddingGift.bride_bank_qr}
                    alt="QR Nhà Gái"
                    className="mx-auto my-4 h-32 w-32 rounded-xl bg-white p-2"
                  />
                )}
                <p className="text-sm uppercase tracking-[0.3em] text-white">{weddingGift.bride_bank_name}</p>
                <p className="mt-2 text-lg text-[#FFD700] tracking-wider">{weddingGift.bride_bank_account}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">{weddingGift.bride_bank_holder}</p>
              </div>
            )}

            {weddingGift.groom_bank_name && weddingGift.groom_bank_account && (
              <div className="rounded-2xl border border-[#D4AF37]/50 bg-[#5a0000]/75 p-6 text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">Nhà Trai</p>
                {weddingGift.groom_bank_qr && (
                  <img
                    src={weddingGift.groom_bank_qr}
                    alt="QR Nhà Trai"
                    className="mx-auto my-4 h-32 w-32 rounded-xl bg-white p-2"
                  />
                )}
                <p className="text-sm uppercase tracking-[0.3em] text-white">{weddingGift.groom_bank_name}</p>
                <p className="mt-2 text-lg text-[#FFD700] tracking-wider">{weddingGift.groom_bank_account}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/70">{weddingGift.groom_bank_holder}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="relative z-10 px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#FFD700]">Gửi Lời Chúc</p>
          <h2 className="mt-3 font-display text-4xl uppercase tracking-[0.2em] text-white">Phúc Lộc Viên Mãn</h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {wishList.map((wish) => (
              <div
                key={wish.id}
                className="rounded-2xl border border-[#D4AF37]/40 bg-[#5a0000]/70 p-5 text-white/90"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#FFD700]">{wish.name || 'Khách Mời'}</p>
                <p className="mt-2 text-sm leading-7">{wish.message}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#D4AF37]/50 bg-[#5a0000]/75 p-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <label className="text-xs uppercase tracking-[0.3em] text-[#FFD700]">Họ Tên</label>
            <input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#D4AF37]/40 bg-[#4B0000] px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Nhập họ tên"
            />

            <label className="mt-5 block text-xs uppercase tracking-[0.3em] text-[#FFD700]">Lời Chúc</label>
            <textarea
              value={formMsg}
              onChange={(e) => setFormMsg(e.target.value)}
              rows={5}
              className="mt-2 w-full rounded-xl border border-[#D4AF37]/40 bg-[#4B0000] px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Gửi lời chúc tốt đẹp"
            />

            <button
              type="submit"
              disabled={isSubmitting || !formName || !formMsg}
              className="mt-6 w-full rounded-xl bg-[#8B0000] py-3 text-xs uppercase tracking-[0.4em] text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-colors hover:bg-[#FFD700] hover:text-[#4B0000] disabled:opacity-40"
            >
              {isSubmitting ? 'Đang Gửi...' : 'Gửi Lời Chúc'}
            </button>
          </form>
        </div>
      </section>

      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-full border border-[#D4AF37]/40 bg-[#5a0000]/90 px-6 py-3 text-sm text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            {toastMsg}
          </div>
        </div>
      )}

      <AudioPlayer
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay ?? true}
      />
    </div>
  )
}
