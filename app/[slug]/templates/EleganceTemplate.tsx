"use client"

import { useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import type { TemplateProps } from './types'
import ImageLightbox from '../components/ImageLightbox'

/* ─── helpers ─── */
function formatDate(v?: string | null) {
  if (!v) return '25.12.2026'
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return v.replace(/-/g, '.')
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d)
}

function formatWishDate(v: string) {
  const src = v.endsWith('Z') || v.includes('+') ? v : `${v}Z`
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(src))
}

/* ─── fade-in wrapper ─── */
function FadeIn({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduced ? { duration: 0 } : { duration: 0.9, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── ornament SVG ─── */
function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12h45M75 12h45" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <path d="M52 4c-4 4-4 12 0 16M68 4c4 4 4 12 0 16" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      <circle cx="60" cy="12" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

const getDirectMapLink = (mapUrl: string | null | undefined, location?: string | null, address?: string | null) => {
    if (!mapUrl) {
        const query = `${location || ''} ${address || ''}`.trim()
        return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : '#'
    }
    
    const isEmbed = mapUrl.includes('/embed') || mapUrl.includes('output=embed')
    if (!isEmbed) return mapUrl

    // If it's an embed URL, try to extract exact coordinates from pb parameter
    const pbMatch = mapUrl.match(/[?&]pb=([^&]+)/)
    if (pbMatch) {
        const pb = pbMatch[1]
        const lngMatch = pb.match(/!2d([0-9.-]+)/)
        const latMatch = pb.match(/!3d([0-9.-]+)/)
        if (latMatch && lngMatch) {
            return `https://www.google.com/maps/search/?api=1&query=${latMatch[1]},${lngMatch[1]}`
        }
    }

    // Fallback if parsing fails
    const query = `${location || ''} ${address || ''}`.trim()
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/* ─── event card ─── */
function EventCard({ title, date, time, venue, address, side, mapLink }: {
  title: string; date: string; time: string; venue: string; address: string; side: 'bride' | 'groom'; mapLink?: string | null
}) {
  const mapHref = getDirectMapLink(mapLink, venue, address)
  return (
    <div className="rounded-2xl border border-[#d4c5a9]/40 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#b39a6a] mb-3">
        {side === 'bride' ? '❀ Nhà Gái' : '❀ Nhà Trai'}
      </p>
      <h3 className="font-display text-2xl md:text-3xl text-[#2d2a26] mb-4">{title}</h3>
      <div className="space-y-2 text-sm text-[#4a453d] leading-relaxed">
        <p className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#b39a6a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {date}
        </p>
        <p className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#b39a6a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          {time}
        </p>
        <p className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#b39a6a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span><strong>{venue}</strong><br />{address}</span>
        </p>
      </div>
      <a
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full border border-[#b39a6a]/50 text-[#b39a6a] text-xs uppercase tracking-[0.2em] hover:bg-[#b39a6a] hover:text-white transition-all duration-300"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Xem bản đồ
      </a>
    </div>
  )
}

/* ─── RSVP form (client) ─── */
function RsvpForm({ coupleId }: { coupleId: number }) {
  const [name, setName] = useState('')
  const [count, setCount] = useState('1')
  const [side, setSide] = useState('groom')
  const [attending, setAttending] = useState<'yes' | 'no' | 'maybe' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { showToast('Vui lòng nhập tên của bạn'); return }
    if (!attending) { showToast('Vui lòng chọn trạng thái tham dự'); return }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('rsvp').insert([
        {
          couple_id: coupleId,
          guest_name: name.trim(),
          attend_status: attending,
          guest_count: parseInt(count, 10),
          side: side,
        },
      ])
      if (error) throw error
      showToast('Cảm ơn bạn đã xác nhận!')
      setName('')
      setAttending(null)
      setCount('1')
    } catch (err) {
      console.error(err)
      showToast('Có lỗi xảy ra, vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#d4c5a9]/50"
  const selectClass = `${inputClass} appearance-none`

  const attendBtn = (value: 'yes' | 'no' | 'maybe', label: string) => (
    <button type="button" onClick={() => setAttending(value)}
      className={`py-3 rounded-xl text-sm font-medium transition-all border ${
        attending === value
          ? value === 'yes' ? 'bg-[#d4c5a9] text-[#2d2a26] border-[#d4c5a9]' : 'bg-white/20 text-white border-white/30'
          : 'border-white/20 text-white/60 hover:border-white/40'
      }`}>
      {label}
    </button>
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
        <input type="text" placeholder="Họ và tên của bạn" value={name} onChange={e => setName(e.target.value)} required className={inputClass} />
        <select value={count} onChange={e => setCount(e.target.value)} className={selectClass}>
          {[1,2,3,4].map(n => <option key={n} value={String(n)} className="text-[#2d2a26]">{n} người{n === 4 ? ' trở lên' : ''}</option>)}
        </select>
        <select value={side} onChange={e => setSide(e.target.value)} className={selectClass}>
          <option value="groom" className="text-[#2d2a26]">Khách Nhà Trai</option>
          <option value="bride" className="text-[#2d2a26]">Khách Nhà Gái</option>
        </select>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {attendBtn('yes', '✓ Sẽ đến')}
          {attendBtn('maybe', '🤔 Chưa chắc')}
          {attendBtn('no', '✗ Vắng mặt')}
        </div>

        <button type="submit" disabled={isSubmitting || !name || !attending}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4c5a9] to-[#b39a6a] text-[#2d2a26] font-semibold text-sm uppercase tracking-[0.15em] hover:shadow-[0_8px_30px_rgba(212,197,169,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5">
          {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
        </button>
      </form>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm text-[#2d2a26] px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
            <span className="text-xl">{toastMessage.includes('lỗi') ? '⚠️' : '✅'}</span>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </>
  )
}

/* ══════════════════════════════════════════
   MAIN TEMPLATE
   ══════════════════════════════════════════ */
export default function EleganceTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const heroImg = gallery?.[0]?.image_url || couple.bride_avatar || couple.groom_avatar
    || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600'
  const date = formatDate(couple.wedding_date)
  const introText = couple.intro_description
    || 'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi trong ngày trọng đại. Sự hiện diện của quý khách là niềm vinh hạnh lớn lao.'

  const brideTitle = locations?.bride_event_title || 'Lễ Vu Quy'
  const brideDate = formatDate(locations?.bride_event_date || couple.wedding_date)
  const brideTime = locations?.bride_event_time || couple.wedding_time || '09:00'
  const brideVenue = locations?.bride_location || 'Tư Gia Nhà Gái'
  const brideAddr = locations?.bride_address || '123 Đường Hoa Hồng, Quận 1, TP. HCM'
  const brideMapLink = locations?.bride_google_map_embed

  const groomTitle = locations?.groom_event_title || 'Lễ Thành Hôn'
  const groomDate = formatDate(locations?.groom_event_date || couple.wedding_date)
  const groomTime = locations?.groom_event_time || couple.wedding_time || '18:00'
  const groomVenue = locations?.groom_location || 'Trung tâm Hội nghị The Grand'
  const groomAddr = locations?.groom_address || '456 Đại lộ Hạnh Phúc, Quận 7, TP. HCM'
  const groomMapLink = locations?.groom_google_map_embed

  const wishList = wishes.slice(0, 8)

  return (
    <div className="relative bg-[#f8f6f1] text-[#2d2a26] overflow-hidden">
      {/* ── noise texture ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] mix-blend-multiply"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

      {/* ════════ SECTION 1 — HERO ════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Ảnh bìa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />

        <FadeIn className="relative z-10 w-[88%] max-w-lg mx-auto">
          <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-xl p-8 md:p-12 text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.5em] text-white/70 mb-6">We are getting married</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-wide">
              {couple.groom_name}
              <span className="block my-3 text-lg md:text-xl text-[#d4c5a9] tracking-[0.4em]">&amp;</span>
              {couple.bride_name}
            </h1>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px flex-1 bg-white/25" />
              <p className="text-xs md:text-sm tracking-[0.3em] text-white/80 whitespace-nowrap">{date}</p>
              <span className="h-px flex-1 bg-white/25" />
            </div>
          </div>
        </FadeIn>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* ════════ SECTION 2 — LỜI NGỎ ════════ */}
      <section className="py-20 md:py-28 px-6">
        <FadeIn className="max-w-xl mx-auto text-center space-y-6">
          <Ornament className="w-28 mx-auto text-[#b39a6a]" />
          <svg className="w-8 h-8 mx-auto text-[#b39a6a]/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="font-display text-lg md:text-xl italic text-[#4a453d] leading-relaxed">
            &ldquo;{introText}&rdquo;
          </p>
          <Ornament className="w-28 mx-auto text-[#b39a6a]" />
        </FadeIn>
      </section>

      {/* ════════ SECTION 3 — SỰ KIỆN ════════ */}
      <section className="py-16 md:py-24 px-6 bg-[#f3f0e8]/60">
        <FadeIn className="max-w-xl mx-auto text-center mb-12">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[#b39a6a] mb-3">Save the date</p>
          <h2 className="font-display text-3xl md:text-4xl text-[#2d2a26]">Thông Tin Sự Kiện</h2>
        </FadeIn>

        <div className="max-w-2xl mx-auto space-y-6">
          <FadeIn delay={0.1}>
            <EventCard title={brideTitle} date={brideDate} time={brideTime} venue={brideVenue} address={brideAddr} side="bride" mapLink={brideMapLink} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <EventCard title={groomTitle} date={groomDate} time={groomTime} venue={groomVenue} address={groomAddr} side="groom" mapLink={groomMapLink} />
          </FadeIn>
        </div>
      </section>

      {/* ════════ SECTION 4 — ALBUM ẢNH ════════ */}
      {gallery.length > 0 && (
        <section className="py-16 md:py-24 px-6">
          <FadeIn className="max-w-xl mx-auto text-center mb-12">
            <Ornament className="w-24 mx-auto text-[#b39a6a] mb-4" />
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[#b39a6a] mb-3">Our Moments</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#2d2a26]">Album Ảnh Cưới</h2>
          </FadeIn>

          <div className="max-w-4xl mx-auto columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {gallery.slice(0, 9).map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.07} className="break-inside-avoid">
                <button type="button" onClick={() => setSelectedGalleryIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl border border-[#d4c5a9]/25 shadow-sm text-left">
                  <img
                    src={img.image_url}
                    alt={img.caption || `Ảnh cưới ${i + 1}`}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '1/1' : '4/3' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-xs text-white/90 text-center">{img.caption}</p>
                    </div>
                  )}
                </button>
              </FadeIn>
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

      {/* ════════ SECTION — HỘP MỪNG CƯỚI ════════ */}
      {weddingGift?.is_enabled && (weddingGift?.groom_bank_account || weddingGift?.bride_bank_account) && (
        <section className="py-16 md:py-24 px-6 bg-[#f3f0e8]/60">
          <FadeIn className="max-w-xl mx-auto text-center mb-10">
            <Ornament className="w-24 mx-auto text-[#b39a6a] mb-4" />
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[#b39a6a] mb-3">Wedding Gift</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#2d2a26]">Hộp Mừng Cưới</h2>
            <p className="mt-3 text-sm text-[#4a453d]/70 italic max-w-md mx-auto">
              Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha. Cảm ơn bạn rất nhiều!
            </p>
          </FadeIn>

          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Groom bank card */}
            {weddingGift?.groom_bank_account && (
              <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-[#d4c5a9]/40 bg-white/80 backdrop-blur-sm p-6 text-center shadow-sm h-full flex flex-col">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#b39a6a] mb-2">❀ Mừng cưới đến chú rể</p>
                  {weddingGift?.groom_bank_qr && (
                    <div className="flex justify-center my-4 flex-grow items-center">
                      <img src={weddingGift?.groom_bank_qr} alt="QR chú rể" className="w-36 h-36 object-contain rounded-xl border border-[#d4c5a9]/30" />
                    </div>
                  )}
                  <div className="space-y-1 text-sm text-[#4a453d] mt-auto">
                    {weddingGift?.groom_bank_name && (
                      <p>Ngân hàng: <strong>{weddingGift?.groom_bank_name}</strong></p>
                    )}
                    {weddingGift?.groom_bank_holder && (
                      <p>Tên: <strong>{weddingGift?.groom_bank_holder}</strong></p>
                    )}
                    <p>STK: <strong>{weddingGift?.groom_bank_account}</strong></p>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Bride bank card */}
            {weddingGift?.bride_bank_account && (
              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-[#d4c5a9]/40 bg-white/80 backdrop-blur-sm p-6 text-center shadow-sm h-full flex flex-col">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#b39a6a] mb-2">❀ Mừng cưới đến cô dâu</p>
                  {weddingGift?.bride_bank_qr && (
                    <div className="flex justify-center my-4 flex-grow items-center">
                      <img src={weddingGift?.bride_bank_qr} alt="QR cô dâu" className="w-36 h-36 object-contain rounded-xl border border-[#d4c5a9]/30" />
                    </div>
                  )}
                  <div className="space-y-1 text-sm text-[#4a453d] mt-auto">
                    {weddingGift?.bride_bank_name && (
                      <p>Ngân hàng: <strong>{weddingGift?.bride_bank_name}</strong></p>
                    )}
                    {weddingGift?.bride_bank_holder && (
                      <p>Tên: <strong>{weddingGift?.bride_bank_holder}</strong></p>
                    )}
                    <p>STK: <strong>{weddingGift?.bride_bank_account}</strong></p>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      {/* ════════ SECTION 5 — SỔ LƯU BÚT ════════ */}
      <section className="py-16 md:py-24 px-6">
        <FadeIn className="max-w-xl mx-auto text-center mb-10">
          <Ornament className="w-24 mx-auto text-[#b39a6a] mb-4" />
          <h2 className="font-display text-3xl md:text-4xl text-[#2d2a26]">Sổ Lưu Bút</h2>
        </FadeIn>

        <div className="max-w-2xl mx-auto space-y-4">
          {wishList.length === 0 && (
            <p className="text-center text-sm text-[#4a453d]/60 italic">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>
          )}
          {wishList.map((w, i) => (
            <FadeIn key={w.id} delay={i * 0.06}>
              <div className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] rounded-2xl ${i % 2 === 0 ? 'rounded-bl-sm' : 'rounded-br-sm'} border border-[#d4c5a9]/30 bg-white/80 backdrop-blur-sm px-5 py-4 shadow-sm`}>
                  <div className="flex items-center justify-between gap-4 mb-1.5">
                    <p className="text-xs font-semibold text-[#b39a6a] tracking-wide">{w.name || 'Ẩn danh'}</p>
                    <p className="text-[0.6rem] text-[#4a453d]/45">{formatWishDate(w.created_at)}</p>
                  </div>
                  <p className="text-sm text-[#4a453d] leading-relaxed">{w.message}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 5 — RSVP ════════ */}
      <section className="py-16 md:py-24 px-6 bg-[#2d2a26] text-white relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <FadeIn className="relative z-10 max-w-xl mx-auto text-center mb-10">
          <Ornament className="w-24 mx-auto text-[#d4c5a9]/60 mb-4" />
          <h2 className="font-display text-3xl md:text-4xl text-white">Xác Nhận Tham Dự</h2>
          <p className="mt-3 text-sm text-white/55">Vui lòng xác nhận để chúng tôi chuẩn bị chu đáo nhất</p>
        </FadeIn>

        <FadeIn className="relative z-10" delay={0.15}>
          <RsvpForm coupleId={couple.id} />
        </FadeIn>
      </section>

      {/* ── footer ── */}
      <footer className="py-10 text-center bg-[#f8f6f1] border-t border-[#d4c5a9]/20">
        <Ornament className="w-20 mx-auto text-[#b39a6a] mb-4" />
        <p className="font-display text-lg text-[#2d2a26]">
          {couple.groom_name} &amp; {couple.bride_name}
        </p>
        <p className="text-xs text-[#4a453d]/50 mt-1 tracking-widest">{date}</p>
      </footer>
    </div>
  )
}
