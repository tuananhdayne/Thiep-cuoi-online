'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AudioPlayer from '../components/AudioPlayer'
import Countdown from '../components/Countdown'
import Footer from '../components/Footer'
import { TemplateProps, type Wish } from './types'

const formatDate = (value?: string | null) => {
  if (!value) return 'A NIGHT TO REMEMBER'
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

const formatTime = (value?: string | null) => value?.slice(0, 5) || ''

const getMapEmbed = (value?: string | null, location?: string | null, address?: string | null) => {
  if (value) {
    const iframe = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
    if (iframe?.[1]) return iframe[1].trim()
    if (value.includes('/embed') || value.includes('output=embed')) return value
  }

  const query = `${location || ''} ${address || ''}`.trim()
  return query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed` : null
}

function Sparkles({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 28 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-[#d4af7f]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 100}%`,
            opacity: 0.16 + (index % 5) * 0.06,
          }}
          animate={{ opacity: [0.08, 0.55, 0.12], scale: [1, 1.9, 1], y: [0, -12, 0] }}
          transition={{
            duration: 4.5 + (index % 6),
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ overline, children }: { overline: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#d4af7f]">{overline}</p>
      <h2 className="mt-4 font-display text-3xl uppercase leading-tight tracking-[-0.025em] text-[#f8f8f2] sm:text-5xl">{children}</h2>
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af7f] to-transparent" />
    </div>
  )
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[30px] border border-[#d4af7f]/24 bg-[#111827]/64 shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  )
}

export default function MidnightEleganceTemplate({
  couple,
  gallery,
  wishes: initialWishes,
  weddingGift,
  locations,
  stories,
}: TemplateProps) {
  const reduceMotion = useReducedMotion()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('')
  const [attendance, setAttendance] = useState('yes')
  const [guestCount, setGuestCount] = useState('1')
  const [side, setSide] = useState('bride')
  const [rsvpMessage, setRsvpMessage] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState('')
  const [wishName, setWishName] = useState('')
  const [wishMessage, setWishMessage] = useState('')
  const [wishList, setWishList] = useState<Wish[]>(initialWishes || [])

  const images = gallery?.length
    ? gallery
    : [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=88' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1529633965402-3b5bf2e4f9b1?auto=format&fit=crop&w=1200&q=88' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=88' },
      ]
  const heroImage = images[0]?.image_url

  const storyItems = stories?.length
    ? stories
    : [
        {
          id: 1,
          title: 'The First Spark',
          story_date: couple.wedding_date || '',
          description: 'Một khoảnh khắc nhẹ nhàng mở đầu cho câu chuyện tình yêu mà chúng tôi luôn trân trọng.',
          image_url: images[1]?.image_url,
        },
        {
          id: 2,
          title: 'The Promise',
          story_date: '',
          description: couple.intro_description || 'Từ những ngày bình dị, chúng tôi học cách yêu thương, lắng nghe và cùng nhau trưởng thành.',
          image_url: images[2]?.image_url,
        },
        {
          id: 3,
          title: 'The Evening Begins',
          story_date: couple.wedding_date || '',
          description: 'Đêm nay, chúng tôi mời những người thân yêu nhất đến chung vui trong khoảnh khắc thiêng liêng này.',
          image_url: images[3]?.image_url,
        },
      ]

  const events = [
    {
      label: 'BRIDE SIDE',
      title: locations?.bride_event_title || 'Lễ Vu Quy',
      date: locations?.bride_event_date || couple.wedding_date,
      time: locations?.bride_event_time || couple.wedding_time,
      location: locations?.bride_location || 'Tư gia nhà gái',
      address: locations?.bride_address || '',
      map: getMapEmbed(locations?.bride_google_map_embed, locations?.bride_location, locations?.bride_address),
    },
    {
      label: 'GROOM SIDE',
      title: locations?.groom_event_title || 'Lễ Thành Hôn',
      date: locations?.groom_event_date || couple.wedding_date,
      time: locations?.groom_event_time || couple.wedding_time,
      location: locations?.groom_location || couple.location || 'Ballroom Wedding Venue',
      address: locations?.groom_address || couple.address || '',
      map: getMapEmbed(locations?.groom_google_map_embed, locations?.groom_location, locations?.groom_address),
    },
  ]

  const submitRsvp = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!guestName.trim()) return

    setRsvpStatus('Đang gửi...')
    const payload = {
      couple_id: couple.id,
      guest_name: guestName.trim(),
      attend_status: attendance,
      guest_count: Number(guestCount),
      side,
    }
    let { error } = await supabase.from('rsvp').insert([{ ...payload, message: rsvpMessage.trim() || null }])

    if (error) {
      const retry = await supabase.from('rsvp').insert([payload])
      error = retry.error
    }

    setRsvpStatus(error ? 'Không thể gửi. Vui lòng thử lại.' : 'Cảm ơn bạn đã xác nhận tham dự.')
  }

  const submitWish = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!wishName.trim() || !wishMessage.trim()) return

    const { data, error } = await supabase
      .from('wishes')
      .insert([{ couple_id: couple.id, name: wishName.trim(), message: wishMessage.trim() }])
      .select()
      .single()

    if (!error && data) {
      setWishList((current) => [data as Wish, ...current])
      setWishName('')
      setWishMessage('')
    }
  }

  return (
    <div className="theme-midnight-elegance relative min-h-screen overflow-hidden bg-[#0f172a] text-[#f8f8f2]">
      <Sparkles enabled={!reduceMotion} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,127,0.16),transparent_32%),radial-gradient(circle_at_80%_25%,rgba(248,248,242,0.08),transparent_30%),linear-gradient(180deg,#0f172a,#111827_45%,#070b12)]" />

      <header className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src={heroImage}
            alt={`Ảnh cưới của ${couple.bride_name} và ${couple.groom_name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/45 via-[#0f172a]/34 to-[#05070d]/92" />
        <motion.div
          className="absolute inset-x-0 bottom-[8%] z-10 mx-auto max-w-4xl px-5 text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#d4af7f]">An Evening To Remember</p>
          <h1 className="mt-5 font-display text-[3rem] uppercase leading-[0.98] tracking-[-0.045em] text-[#f8f8f2] drop-shadow-2xl sm:text-7xl lg:text-[5.6rem]">
            {couple.groom_name}
            <span className="mx-3 block font-normal italic text-[#d4af7f] sm:inline">&amp;</span>
            {couple.bride_name}
          </h1>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.34em] text-[#f8f8f2]/80">{formatDate(couple.wedding_date)}</p>
          <div className="mx-auto mt-8 h-px w-36 bg-gradient-to-r from-transparent via-[#d4af7f] to-transparent" />
        </motion.div>
      </header>

      <main className="relative z-20">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <GlassCard className="relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af7f] to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#d4af7f]">Private Invitation</p>
              <h2 className="mt-4 font-display text-3xl uppercase tracking-[-0.02em] sm:text-5xl">A Luxury Evening Wedding</h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#f8f8f2]/70">
                {couple.intro_description || 'Trân trọng mời bạn đến chung vui trong buổi dạ tiệc cưới sang trọng, nơi ánh nến, pha lê và tình yêu cùng tỏa sáng.'}
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading overline="Love Timeline">Our Story</SectionHeading>
            <div className="relative mx-auto max-w-4xl before:absolute before:bottom-0 before:left-[22px] before:top-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#d4af7f]/60 before:to-transparent sm:before:left-1/2">
              {storyItems.map((story, index) => (
                <Reveal key={story.id} delay={index * 0.04}>
                  <article className={`relative mb-10 pl-14 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}>
                    <span className="absolute left-[12px] top-8 z-10 h-5 w-5 rounded-full border border-[#d4af7f] bg-[#0f172a] shadow-[0_0_22px_rgba(212,175,127,0.7)] sm:left-1/2 sm:-translate-x-1/2" />
                    <GlassCard className={`${index % 2 ? 'sm:col-start-2' : ''} overflow-hidden p-3`}>
                      {story.image_url && (
                        <button type="button" onClick={() => setSelectedImage(story.image_url || null)} className="relative block aspect-[16/10] w-full overflow-hidden rounded-[22px]">
                          <Image src={story.image_url} alt={story.title} fill sizes="(max-width: 640px) 85vw, 440px" className="object-cover transition duration-700 hover:scale-[1.04]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        </button>
                      )}
                      <div className="px-3 py-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af7f]">{story.story_date || `Chapter ${index + 1}`}</p>
                        <h3 className="mt-3 font-display text-2xl uppercase tracking-[-0.01em]">{story.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-[#f8f8f2]/65">{story.description}</p>
                      </div>
                    </GlassCard>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading overline="Editorial Gallery">A Fashion Wedding Set</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {images.slice(0, 6).map((image, index) => (
                <Reveal key={image.id} className={index === 0 || index === 5 ? 'sm:col-span-2 lg:col-span-2' : ''}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image.image_url)}
                    className={`group relative block w-full overflow-hidden rounded-[26px] border border-[#d4af7f]/20 bg-[#111827] ${index === 0 || index === 5 ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.caption || 'Ảnh cưới dạ tiệc'}
                      fill
                      sizes={index === 0 || index === 5 ? '100vw' : '(max-width: 640px) 50vw, 25vw'}
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent transition group-hover:via-[#d4af7f]/12" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading overline="Wedding Details">Evening Ceremony</SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <Reveal key={event.label}>
                <GlassCard className="overflow-hidden p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af7f]">{event.label}</p>
                  <h3 className="mt-5 font-display text-3xl uppercase">{event.title}</h3>
                  <div className="mt-7 space-y-2 text-sm text-[#f8f8f2]/70">
                    <p className="text-[#d4af7f]">{formatTime(event.time)} · {formatDate(event.date)}</p>
                    <p className="font-semibold text-[#f8f8f2]">{event.location}</p>
                    <p>{event.address}</p>
                  </div>
                  {event.map && (
                    <div className="mt-7 h-64 overflow-hidden rounded-[22px] border border-[#d4af7f]/20 grayscale">
                      <iframe src={event.map} title={event.title} className="h-full w-full" loading="lazy" />
                    </div>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-18">
          <Reveal>
            <GlassCard className="px-4 py-10 sm:p-12">
              <SectionHeading overline="Countdown">The Night Is Coming</SectionHeading>
              <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
            </GlassCard>
          </Reveal>
        </section>

        <section id="rsvp" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading overline="VIP Registration">RSVP</SectionHeading>
          <GlassCard className="p-6 sm:p-10">
            <form onSubmit={submitRsvp} className="space-y-6">
              <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Tên khách mời" className="w-full rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none placeholder:text-[#f8f8f2]/35 focus:border-[#d4af7f] focus:shadow-[0_0_24px_rgba(212,175,127,0.18)]" />
              <div className="grid gap-4 sm:grid-cols-3">
                <select value={attendance} onChange={(e) => setAttendance(e.target.value)} className="rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none focus:border-[#d4af7f]">
                  <option value="yes">Sẽ tham dự</option>
                  <option value="maybe">Chưa chắc</option>
                  <option value="no">Không tham dự</option>
                </select>
                <select value={guestCount} onChange={(e) => setGuestCount(e.target.value)} className="rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none focus:border-[#d4af7f]">
                  <option value="1">1 khách</option>
                  <option value="2">2 khách</option>
                  <option value="3">3 khách</option>
                  <option value="4">4 khách</option>
                </select>
                <select value={side} onChange={(e) => setSide(e.target.value)} className="rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none focus:border-[#d4af7f]">
                  <option value="bride">Nhà gái</option>
                  <option value="groom">Nhà trai</option>
                </select>
              </div>
              <textarea value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} rows={4} placeholder="Lời nhắn" className="w-full resize-none rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none placeholder:text-[#f8f8f2]/35 focus:border-[#d4af7f]" />
              <button className="w-full rounded-2xl bg-gradient-to-r from-[#d4af7f] to-[#f3d8a5] px-6 py-4 text-xs font-bold uppercase tracking-[0.32em] text-[#111827] shadow-[0_16px_40px_rgba(212,175,127,0.18)]">
                Confirm RSVP
              </button>
              {rsvpStatus && <p className="text-center text-xs text-[#f8f8f2]/60">{rsvpStatus}</p>}
            </form>
          </GlassCard>
        </section>

        {weddingGift?.is_enabled && (
          <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading overline="Wedding Gift">Champagne Gift Box</SectionHeading>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ['GROOM', weddingGift.groom_bank_name, weddingGift.groom_bank_holder, weddingGift.groom_bank_account, weddingGift.groom_bank_qr],
                ['BRIDE', weddingGift.bride_bank_name, weddingGift.bride_bank_holder, weddingGift.bride_bank_account, weddingGift.bride_bank_qr],
              ].map(([label, bank, holder, account, qr]) => (
                account && (
                  <GlassCard key={label as string} className="p-7 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af7f]">{label}</p>
                    {qr && (
                      <div className="mt-6 flex justify-center">
                        {/* QR URLs are user-provided and may come from domains not configured for next/image. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qr as string} alt={`QR ${label}`} className="h-40 w-40 rounded-2xl border border-[#d4af7f]/35 bg-white object-contain p-3" />
                      </div>
                    )}
                    <p className="mt-5 font-display text-2xl">{holder}</p>
                    <p className="mt-2 text-sm text-[#f8f8f2]/60">{bank}</p>
                    <p className="mt-1 text-sm tracking-[0.18em] text-[#d4af7f]">{account}</p>
                  </GlassCard>
                )
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading overline="Guest Notes">Wishes</SectionHeading>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {wishList.slice(0, 6).map((wish) => (
                <GlassCard key={wish.id} className="p-6">
                  <p className="font-display text-2xl leading-relaxed text-[#f8f8f2]">“{wish.message}”</p>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af7f]">{wish.name || 'Ẩn danh'}</p>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="p-6 sm:p-8">
              <form onSubmit={submitWish} className="space-y-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#d4af7f]">Leave a message</p>
                <input value={wishName} onChange={(e) => setWishName(e.target.value)} placeholder="Tên của bạn" className="w-full rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none placeholder:text-[#f8f8f2]/35 focus:border-[#d4af7f]" />
                <textarea value={wishMessage} onChange={(e) => setWishMessage(e.target.value)} rows={5} placeholder="Lời chúc" className="w-full resize-none rounded-2xl border border-[#d4af7f]/35 bg-[#0f172a]/70 px-5 py-4 text-sm text-[#f8f8f2] outline-none placeholder:text-[#f8f8f2]/35 focus:border-[#d4af7f]" />
                <button className="w-full rounded-2xl border border-[#d4af7f] px-6 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#d4af7f] transition hover:bg-[#d4af7f] hover:text-[#111827]">
                  Send Wishes
                </button>
              </form>
            </GlassCard>
          </div>
        </section>
      </main>

      <div className="relative z-20 bg-[#070b12]">
        <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />
      </div>
      <AudioPlayer musicUrl={couple.music_url} delay={couple.music_delay} volume={couple.music_volume} autoplay={couple.music_autoplay} />

      {selectedImage && (
        <button type="button" onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4">
          <span className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.35em] text-white/80">Close</span>
          <span className="relative h-[85vh] w-full max-w-6xl">
            <Image src={selectedImage} alt="Ảnh cưới phóng to" fill sizes="100vw" className="object-contain" />
          </span>
        </button>
      )}
    </div>
  )
}
