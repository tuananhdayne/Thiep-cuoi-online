'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'
import ImageLightbox from '../components/ImageLightbox'
import Reveal from '../components/Reveal'
import { supabase } from '@/lib/supabaseClient'
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

function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 34c10-3 19-11 25-24 4 13 3 23-1 31-7 3-16 2-24-7Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path d="M17 31c6-5 11-10 16-17" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function PastelTemplate({ couple, gallery, wishes, weddingGift, locations }: TemplateProps) {
  const heroImage =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    'https://images.unsplash.com/photo-1523438097201-512ae7d59c1f?auto=format&fit=crop&q=80&w=1600'

  const { scrollYProgress } = useScroll()
  const slowParallax = useTransform(scrollYProgress, [0, 1], ['0px', '120px'])
  const softDrift = useTransform(scrollYProgress, [0, 1], ['0px', '-90px'])

  const [typedName, setTypedName] = useState('')
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)
  const [formName, setFormName] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const titleDate = formatShortDate(couple.wedding_date)
  const titleTime = formatTime(couple.wedding_time)
  const introText =
    couple.intro_description ||
    'Một khung thiệp sáng, mềm và thật nhiều khoảng thở để tình yêu được kể bằng cảm xúc tinh tế nhất.'

  const weddingDayText = formatDate(couple.wedding_date)
  const displayedGallery = (gallery.length
    ? gallery
    : [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1529633965402-3b5bf2e4f9b1?auto=format&fit=crop&q=80' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80' },
        { id: 5, image_url: 'https://images.unsplash.com/photo-1507209696998-3c532be9b2b4?auto=format&fit=crop&q=80' },
      ]).slice(0, 9)

  const wishList = wishes.slice(0, 8)

  const brideTitle = locations?.bride_event_title || 'Lễ Vu Quy'
  const brideVenue = locations?.bride_location || 'Tư gia nhà gái'
  const brideAddress = locations?.bride_address || 'Địa chỉ nhà gái'
  const brideDate = formatShortDate(locations?.bride_event_date || couple.wedding_date)
  const brideTime = formatTime(locations?.bride_event_time || couple.wedding_time)

  const groomTitle = locations?.groom_event_title || 'Lễ Thành Hôn'
  const groomVenue = locations?.groom_location || 'Trung tâm tiệc cưới'
  const groomAddress = locations?.groom_address || 'Địa chỉ nhà trai'
  const groomDate = formatShortDate(locations?.groom_event_date || couple.wedding_date)
  const groomTime = formatTime(locations?.groom_event_time || couple.wedding_time)

  const giftEnabled = weddingGift?.is_enabled ?? couple.gift_enabled ?? false

  useEffect(() => {
    const fullName = `${couple.groom_name} & ${couple.bride_name}`.trim()
    const chars = Array.from(fullName)
    let currentIndex = 0

    setTypedName('')

    const timer = window.setInterval(() => {
      currentIndex += 1
      setTypedName(chars.slice(0, currentIndex).join(''))

      if (currentIndex >= chars.length) {
        window.clearInterval(timer)
      }
    }, 55)

    return () => window.clearInterval(timer)
  }, [couple.groom_name, couple.bride_name])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formName.trim() || !formMsg.trim()) return

    setIsSubmitting(true)
    try {
      await supabase.from('wishes').insert([
        { couple_id: couple.id, name: formName.trim(), message: formMsg.trim() },
      ])
      setToastMsg('Lời chúc đã được gửi.')
      setFormName('')
      setFormMsg('')
      window.setTimeout(() => setToastMsg(''), 3000)
    } catch {
      setToastMsg('Không thể gửi lời chúc, vui lòng thử lại.')
      window.setTimeout(() => setToastMsg(''), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openLightbox = (index: number) => setSelectedGalleryIndex(index)
  const closeLightbox = () => setSelectedGalleryIndex(null)
  const nextLightbox = () => {
    if (selectedGalleryIndex === null) return
    setSelectedGalleryIndex((selectedGalleryIndex + 1) % displayedGallery.length)
  }
  const prevLightbox = () => {
    if (selectedGalleryIndex === null) return
    setSelectedGalleryIndex((selectedGalleryIndex - 1 + displayedGallery.length) % displayedGallery.length)
  }

  const storyCards = [
    {
      eyebrow: '01',
      title: 'Không gian nhẹ như giấy',
      text: introText,
    },
    {
      eyebrow: '02',
      title: 'Khoảng thở tinh tế',
      text: `Thiết kế ưu tiên nền sáng, đường viền mảnh và hiệu ứng watercolor dịu mắt để cảm xúc được đặt ở trung tâm.`,
    },
    {
      eyebrow: '03',
      title: 'Ngày hạnh phúc',
      text: weddingDayText || 'Ngày hạnh phúc được ghi lại bằng kiểu chữ mềm và bố cục magazine.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f8f6f2)] text-[#6B6B6B]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Great+Vibes&display=swap');

        @keyframes pastel-float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) translateX(8px) rotate(3deg);
          }
        }

        @keyframes pastel-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes pastel-shimmer {
          0%,
          100% {
            opacity: 0.65;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: slowParallax }}
          className="absolute -left-24 top-12 h-96 w-96 rounded-full bg-[#E8CFCF]/40 blur-3xl"
        />
        <motion.div
          style={{ y: softDrift }}
          className="absolute right-[-4rem] top-32 h-[28rem] w-[28rem] rounded-full bg-[#DCE8F2]/70 blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-multiply" />
        <Leaf className="absolute left-6 top-24 h-12 w-12 text-[#A8C3BC]/30" />
        <Leaf className="absolute right-10 top-32 h-10 w-10 rotate-[18deg] text-[#E8CFCF]/45" />
        <Leaf className="absolute bottom-24 left-[12%] h-14 w-14 -rotate-12 text-[#A8C3BC]/20" />
        <Leaf className="absolute bottom-16 right-[14%] h-12 w-12 rotate-[15deg] text-[#DCE8F2]/70" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10 lg:px-12">
        <Reveal className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(107,107,107,0.08)] bg-white/75 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#A8C3BC]" />
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[#7d7d7d]">
                Soft Romantic / Korean Pastel
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[0.72rem] uppercase tracking-[0.55em] text-[#A8C3BC]">
                {titleDate || weddingDayText}
              </p>
              <h1
                className="max-w-2xl text-5xl leading-[0.92] text-[#5f6664] md:text-7xl lg:text-[5.6rem]"
                style={{ fontFamily: '"Great Vibes", "Cormorant Garamond", serif' }}
              >
                <span className="block">{typedName || `${couple.groom_name} & ${couple.bride_name}`}</span>
              </h1>
              <p className="max-w-xl text-sm leading-8 text-[#7C7C7C] md:text-base md:leading-9">
                {couple.intro_title ? `${couple.intro_title}. ` : ''}
                {introText}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="paper-card border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.78)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                <p className="text-[0.64rem] uppercase tracking-[0.45em] text-[#9aa6a2]">Thời gian</p>
                <p className="mt-3 font-display text-2xl text-[#5f6664]">{titleTime || '18:00'}</p>
                <p className="mt-1 text-sm text-[#7C7C7C]">Khoảng lặng dịu dàng, vừa đủ để bắt đầu một ngày vui.</p>
              </div>
              <div className="paper-card border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.78)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                <p className="text-[0.64rem] uppercase tracking-[0.45em] text-[#9aa6a2]">Địa điểm</p>
                <p className="mt-3 font-display text-2xl text-[#5f6664]">{couple.location || groomVenue}</p>
                <p className="mt-1 text-sm text-[#7C7C7C]">{couple.address || groomAddress}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-full border border-[#D8D2C8] bg-white px-6 py-3 text-sm font-medium text-[#5f6664] transition-all hover:-translate-y-0.5 hover:border-[#A8C3BC] hover:shadow-[0_12px_30px_rgba(168,195,188,0.18)]"
              >
                Xem Câu Chuyện
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full bg-[#A8C3BC] px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(168,195,188,0.25)]"
              >
                Xem Album Ảnh
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[32rem]">
            <motion.div
              style={{ y: slowParallax }}
              className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-[#E8CFCF]/40 blur-2xl"
            />
            <motion.div
              style={{ y: softDrift }}
              className="absolute -right-8 bottom-12 h-28 w-28 rounded-full bg-[#DCE8F2]/60 blur-2xl"
            />

            <div className="relative rotate-[-4deg] rounded-[32px] border border-[rgba(107,107,107,0.08)] bg-white/85 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <div className="overflow-hidden rounded-[26px] border border-[rgba(107,107,107,0.08)] bg-[#fdfbf8]">
                <img
                  src={heroImage}
                  alt="Ảnh bìa thiệp"
                  className="h-[32rem] w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex items-center justify-between px-2 pb-1">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.45em] text-[#A8C3BC]">The Story of Love</p>
                  <p className="mt-2 text-sm text-[#7C7C7C]">Một khung ảnh mềm, sáng và rất nhiều khoảng thở.</p>
                </div>
                <div className="rounded-full border border-dashed border-[#D8D2C8] px-4 py-2 text-right">
                  <p className="text-[0.63rem] uppercase tracking-[0.42em] text-[#9aa6a2]">Ngày cưới</p>
                  <p className="mt-1 font-display text-lg text-[#5f6664]">{weddingDayText || 'WEDDING DAY'}</p>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-4 w-[11rem] rounded-[22px] border border-[rgba(107,107,107,0.08)] bg-white/88 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-md"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#A8C3BC]">Piano Mood</p>
              <p className="mt-2 text-sm leading-6 text-[#7C7C7C]">Yiruma / acoustic / indie</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-2 top-12 w-[10.5rem] rounded-[22px] border border-[rgba(107,107,107,0.08)] bg-white/82 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.05)] backdrop-blur-md"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.48em] text-[#E0BEBE]">Airy Details</p>
              <p className="mt-2 text-sm leading-6 text-[#7C7C7C]">White space, watercolor, leaves.</p>
            </motion.div>
          </div>
        </Reveal>

        <div id="story" className="scroll-mt-24">
          <Reveal className="mt-20 space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.55em] text-[#A8C3BC]">Story Section</p>
                <h2 className="mt-3 font-display text-4xl text-[#5f6664] md:text-5xl">Hành trình dịu dàng</h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-[#7C7C7C]">
                Bố cục lệch nhẹ, khoảng trắng rộng và một chút watercolor để cảm giác như đang lật từng trang tạp chí cưới.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  eyebrow: '01',
                  title: 'Không gian nhẹ như giấy',
                  text: introText,
                },
                {
                  eyebrow: '02',
                  title: 'Khoảng thở tinh tế',
                  text: 'Thiết kế ưu tiên nền sáng, đường viền mảnh và hiệu ứng watercolor dịu mắt để cảm xúc được đặt ở trung tâm.',
                },
                {
                  eyebrow: '03',
                  title: 'Ngày hạnh phúc',
                  text: weddingDayText || 'Ngày hạnh phúc được ghi lại bằng kiểu chữ mềm và bố cục magazine.',
                },
              ].map((card, index) => (
                <div
                  key={card.eyebrow}
                  className={`rounded-[28px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.8)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md ${index === 1 ? 'md:translate-y-6' : ''}`}
                >
                  <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#A8C3BC]">0{card.eyebrow}</p>
                  <h3 className="mt-4 font-display text-2xl text-[#5f6664]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#7C7C7C]">{card.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.55em] text-[#A8C3BC]">Event Info</p>
              <h2 className="mt-3 font-display text-4xl text-[#5f6664] md:text-5xl">Thông tin sự kiện</h2>
            </div>
            <p className="max-w-2xl text-sm leading-8 text-[#7C7C7C]">
              Card kính mờ, viền mảnh và bố cục sạch sẽ giúp phần thông tin rõ ràng nhưng vẫn giữ cảm xúc mềm mại.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.62)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-[12px]">
              <div className="flex items-center justify-between gap-4 border-b border-dashed border-[rgba(107,107,107,0.12)] pb-4">
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#A8C3BC]">Nhà Gái</p>
                  <h3 className="mt-3 font-display text-3xl text-[#5f6664]">{brideTitle}</h3>
                </div>
                <Leaf className="h-10 w-10 text-[#E8CFCF]" />
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#7C7C7C]">
                <p className="font-medium text-[#5f6664]">{brideVenue}</p>
                <p>{brideAddress}</p>
                <p>
                  {brideDate}
                  {brideTime ? ` • ${brideTime}` : ''}
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.62)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-[12px]">
              <div className="flex items-center justify-between gap-4 border-b border-dashed border-[rgba(107,107,107,0.12)] pb-4">
                <div>
                  <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#A8C3BC]">Nhà Trai</p>
                  <h3 className="mt-3 font-display text-3xl text-[#5f6664]">{groomTitle}</h3>
                </div>
                <Leaf className="h-10 w-10 rotate-12 text-[#DCE8F2]" />
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#7C7C7C]">
                <p className="font-medium text-[#5f6664]">{groomVenue}</p>
                <p>{groomAddress}</p>
                <p>
                  {groomDate}
                  {groomTime ? ` • ${groomTime}` : ''}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div id="gallery" className="scroll-mt-24">
          <Reveal className="mt-20 space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.55em] text-[#A8C3BC]">Gallery</p>
                <h2 className="mt-3 font-display text-4xl text-[#5f6664] md:text-5xl">Pinterest style album</h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-[#7C7C7C]">
                Ảnh bo góc lớn, bóng đổ nhẹ và xếp lớp như một bảng cảm hứng cưới rất sáng.
              </p>
            </div>

            <div className="grid auto-rows-[10rem] gap-4 sm:grid-cols-2 md:auto-rows-[12rem] lg:grid-cols-3">
              {displayedGallery.map((item, index) => {
                const spanClass =
                  index === 0
                    ? 'sm:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2'
                    : index === 3
                      ? 'lg:row-span-2'
                      : index === 5
                        ? 'sm:col-span-2 lg:col-span-1'
                        : ''

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className={`group relative overflow-hidden rounded-[24px] border border-[rgba(107,107,107,0.08)] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] ${spanClass}`}
                  >
                    <img
                      src={item.image_url}
                      alt={item.caption || 'Ảnh cưới'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.32))]" />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white/80 px-4 py-3 text-left text-sm text-[#5f6664] backdrop-blur-sm">
                        {item.caption}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        {giftEnabled && (
          <Reveal className="mt-20 space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.66rem] uppercase tracking-[0.55em] text-[#A8C3BC]">Gift Corner</p>
                <h2 className="mt-3 font-display text-4xl text-[#5f6664] md:text-5xl">Mừng cưới</h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-[#7C7C7C]">
                Một góc nhỏ, tinh tế và kín đáo dành cho những lời chúc gửi kèm hồng ân.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[30px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.7)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-[12px]">
                <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#E0BEBE]">{weddingGift?.groom_bank_name || 'Ngân hàng'}</p>
                <h3 className="mt-3 font-display text-3xl text-[#5f6664]">{weddingGift?.groom_bank_holder || couple.groom_name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#7C7C7C]">{weddingGift?.groom_bank_account || 'Số tài khoản đang cập nhật'}</p>
              </div>
              <div className="rounded-[30px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.7)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-[12px]">
                <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#E0BEBE]">{weddingGift?.bride_bank_name || 'Ngân hàng'}</p>
                <h3 className="mt-3 font-display text-3xl text-[#5f6664]">{weddingGift?.bride_bank_holder || couple.bride_name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#7C7C7C]">{weddingGift?.bride_bank_account || 'Số tài khoản đang cập nhật'}</p>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-20 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.55em] text-[#A8C3BC]">Wishes</p>
              <h2 className="mt-3 font-display text-4xl text-[#5f6664] md:text-5xl">Những lời chúc</h2>
            </div>
            <p className="max-w-2xl text-sm leading-8 text-[#7C7C7C]">
              Mỗi lời chúc được đặt trong một tấm note nhỏ để giữ đúng tinh thần emotional và nhẹ nhàng của template pastel.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {wishList.length > 0 ? (
                wishList.map((wish, index) => (
                  <div
                    key={wish.id}
                    className={`min-h-[11rem] rounded-[24px] border border-[rgba(107,107,107,0.08)] bg-white/82 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md ${index % 2 === 1 ? 'sm:translate-y-4' : ''}`}
                  >
                    <p className="text-[0.62rem] uppercase tracking-[0.45em] text-[#A8C3BC]">
                      {wish.name || 'Khách mời'}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#5f6664]">“{wish.message}”</p>
                    <p className="mt-4 text-[0.68rem] uppercase tracking-[0.35em] text-[#C9B9B9]">
                      {new Intl.DateTimeFormat('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }).format(new Date(wish.created_at))}
                    </p>
                  </div>
                ))
              ) : (
                <div className="sm:col-span-2 rounded-[24px] border border-[rgba(107,107,107,0.08)] bg-white/82 p-6 text-sm leading-7 text-[#7C7C7C] shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md">
                  Chưa có lời chúc nào. Hãy để lại một lời nhắn thật mềm cho cặp đôi.
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[rgba(107,107,107,0.08)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-[12px]"
            >
              <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[#A8C3BC]">Write a note</p>
              <h3 className="mt-3 font-display text-3xl text-[#5f6664]">Gửi lời chúc của bạn</h3>

              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full rounded-[18px] border border-[rgba(107,107,107,0.12)] bg-white/85 px-4 py-3 text-sm text-[#5f6664] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#A8C3BC]"
                />
                <textarea
                  value={formMsg}
                  onChange={(event) => setFormMsg(event.target.value)}
                  placeholder="Chúc hai bạn..."
                  rows={5}
                  className="w-full rounded-[18px] border border-[rgba(107,107,107,0.12)] bg-white/85 px-4 py-3 text-sm text-[#5f6664] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#A8C3BC]"
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#A8C3BC] px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(168,195,188,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi lời chúc'}
                </button>
                <span className="text-sm text-[#7C7C7C]">Nhẹ nhàng, tinh tế, vừa đủ.</span>
              </div>

              {toastMsg && (
                <p className="mt-4 rounded-[18px] border border-[rgba(107,107,107,0.08)] bg-white/90 px-4 py-3 text-sm text-[#5f6664] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  {toastMsg}
                </p>
              )}
            </form>
          </div>
        </Reveal>

        <footer className="mt-20 border-t border-[rgba(107,107,107,0.08)] py-8 text-center text-sm text-[#7C7C7C]">
          <p className="font-display text-3xl text-[#5f6664]" style={{ fontFamily: '"Great Vibes", "Cormorant Garamond", serif' }}>
            {couple.bride_name} & {couple.groom_name}
          </p>
          <p className="mt-2 uppercase tracking-[0.35em] text-[#A8C3BC]">Elegant · Romantic · Clean · Emotional</p>
        </footer>
      </main>

      <ImageLightbox
        images={displayedGallery}
        selectedIndex={selectedGalleryIndex}
        onClose={closeLightbox}
        onNext={nextLightbox}
        onPrev={prevLightbox}
      />

      <AudioPlayer
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay}
      />
    </div>
  )
}