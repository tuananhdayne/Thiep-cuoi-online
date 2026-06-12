'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'
import Countdown from '../components/Countdown'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import GiftSection from '../components/GiftSection'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import WishSection from '../components/WishSection'
import { TemplateProps } from './types'

function CloudPattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 54" className={className} fill="none" aria-hidden="true">
      <path d="M0 28h74c3-13 14-21 28-21 13 0 24 7 28 18 5-7 13-11 23-11 14 0 25 8 29 20h178" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 38h94c3-8 10-13 20-13 9 0 16 4 20 11 4-6 11-9 19-9 9 0 17 4 21 11h138" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <circle cx="180" cy="34" r="4" fill="currentColor" />
    </svg>
  )
}

function LotusMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <path d="M60 91c-18-12-27-27-27-43 15 3 24 12 27 27 3-15 12-24 27-27 0 16-9 31-27 43Z" stroke="currentColor" strokeWidth="2" />
      <path d="M60 75c-11-17-10-34 0-50 10 16 11 33 0 50Z" stroke="currentColor" strokeWidth="2" />
      <path d="M34 73c-11-2-20 0-28 7 13 14 31 18 54 11M86 73c11-2 20 0 28 7-13 14-31 18-54 11" stroke="currentColor" strokeWidth="2" />
      <path d="M24 101h72" stroke="currentColor" strokeWidth="1.5" opacity=".65" />
    </svg>
  )
}

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a76238]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl text-[#7d1f25] sm:text-4xl">{children}</h2>
      <CloudPattern className="mx-auto mt-2 h-8 w-52 text-[#b78449]" />
    </div>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function VietSilkTemplate({
  couple,
  gallery,
  wishes,
  weddingGift,
  locations,
}: TemplateProps) {
  const reduceMotion = useReducedMotion()
  const heroImage =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=88'

  return (
    <div className="theme-viet-silk relative min-h-screen overflow-hidden bg-bg-main text-primary">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(45deg, rgba(125,31,37,.06) 25%, transparent 25%, transparent 75%, rgba(125,31,37,.06) 75%), linear-gradient(45deg, rgba(183,132,73,.05) 25%, transparent 25%, transparent 75%, rgba(183,132,73,.05) 75%)',
          backgroundPosition: '0 0, 12px 12px',
          backgroundSize: '24px 24px',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-[18%] h-36 w-36 text-[#a76238]/20 sm:h-48 sm:w-48"
        animate={reduceMotion ? undefined : { y: [0, 18, 0], rotate: [-7, 2, -7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <LotusMark className="h-full w-full" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[48%] h-40 w-40 text-[#b78449]/15 sm:h-56 sm:w-56"
        animate={reduceMotion ? undefined : { y: [0, -22, 0], rotate: [9, 1, 9] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <LotusMark className="h-full w-full" />
      </motion.div>

      <header className="relative mx-auto max-w-5xl px-3 pb-8 pt-3 sm:px-6 sm:pt-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-b-[34px] border border-[#d5af75]/45 bg-[#fff9ed] shadow-[0_24px_70px_rgba(101,34,31,0.15)]"
        >
          <div className="relative min-h-[72svh]">
            <motion.div
              className="absolute inset-0"
              animate={reduceMotion ? undefined : { scale: [1, 1.045, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={heroImage}
                alt={`Ảnh cưới của ${couple.bride_name} và ${couple.groom_name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#401013]/20 via-transparent to-[#4d1417]/85" />
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-[#ffe6a4]/20 to-transparent blur-md"
              animate={reduceMotion ? undefined : { x: ['0%', '520%'] }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-x-0 bottom-0 px-5 pb-9 text-center text-white sm:px-10 sm:pb-12"
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <LotusMark className="mx-auto h-16 w-16 text-[#f0c879] drop-shadow-md" />
              </motion.div>
              <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[#f4dca7]">Trân trọng báo hỷ</p>
              <h1 className="mt-3 font-display text-[2.75rem] leading-[1.03] drop-shadow-lg sm:text-6xl">
                {couple.bride_name}
                <span className="mx-2 font-normal italic text-[#f0c879]">&amp;</span>
                {couple.groom_name}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/80 sm:text-sm">
                {couple.intro_description || 'Hân hoan báo tin lễ thành hôn của chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình.'}
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <a href="#location" className="rounded-full bg-[#f0c879] px-5 py-2.5 text-xs font-bold text-[#671a20] shadow-lg">
                  Xem lịch lễ
                </a>
                <a href="#rsvp" className="rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-md">
                  Xác nhận tham dự
                </a>
              </div>
            </motion.div>
          </div>

          <div className="relative bg-[#7d1f25] px-4 py-5 text-center text-[#f9e6bd]">
            <CloudPattern className="absolute inset-x-0 top-0 h-7 w-full -translate-y-1/2 text-[#e5bd75]" />
            <p className="font-display text-lg italic">Chung một mái nhà · Trọn đời bên nhau</p>
          </div>
        </motion.div>
      </header>

      <main className="relative mx-auto max-w-4xl space-y-8 px-3 pb-16 sm:space-y-12 sm:px-6 sm:pb-24">
        <Reveal>
          <section className="rounded-[28px] border border-[#d9bd8d]/45 bg-[#fffaf0]/95 px-4 py-7 shadow-[0_15px_45px_rgba(101,34,31,0.08)] sm:p-9">
            <SectionTitle eyebrow="Đếm ngày chung đôi">Ngày Hạnh Phúc</SectionTitle>
            <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
          </section>
        </Reveal>

        <Reveal delay={0.04}>
          <section id="location" className="rounded-[28px] border border-[#d9bd8d]/45 bg-[#fffaf0]/95 p-3 shadow-[0_15px_45px_rgba(101,34,31,0.08)] sm:p-7">
            <SectionTitle eyebrow="Lịch trình hôn lễ">Hai Nhà Chung Vui</SectionTitle>
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
          </section>
        </Reveal>

        <Reveal delay={0.04}>
          <section className="rounded-[28px] border border-[#d9bd8d]/45 bg-[#fffaf0]/95 p-3 shadow-[0_15px_45px_rgba(101,34,31,0.08)] sm:p-7">
            <SectionTitle eyebrow="Khoảnh khắc yêu thương">Album Của Chúng Tôi</SectionTitle>
            <Gallery images={gallery || []} />
          </section>
        </Reveal>

        <Reveal>
          <div className="[&>section]:rounded-[28px] [&>section]:border [&>section]:border-[#d9bd8d]/45 [&>section]:bg-[#fffaf0]/95 [&>section]:shadow-[0_15px_45px_rgba(101,34,31,0.08)]">
            <GiftSection couple={couple} weddingGift={weddingGift} />
          </div>
        </Reveal>

        <Reveal>
          <div id="rsvp" className="[&>section]:rounded-[28px] [&>section]:border [&>section]:border-[#d9bd8d]/45 [&>section]:bg-[#fffaf0]/95 [&>section]:shadow-[0_15px_45px_rgba(101,34,31,0.08)]">
            <RsvpSection
              coupleId={couple.id}
              brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
              groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="[&>section]:rounded-[28px] [&>section]:border [&>section]:border-[#d9bd8d]/45 [&>section]:bg-[#fffaf0]/95 [&>section]:shadow-[0_15px_45px_rgba(101,34,31,0.08)]">
            <WishSection coupleId={couple.id} initialWishes={wishes || []} />
          </div>
        </Reveal>

        <motion.div
          className="pt-3 text-center"
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <LotusMark className="mx-auto h-20 w-20 text-[#a76238]" />
          <p className="font-display text-2xl italic text-[#7d1f25]">Trăm năm tình viên mãn</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-[#a76238]">Bạc đầu nghĩa phu thê</p>
        </motion.div>
      </main>

      <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />
      <AudioPlayer
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay}
      />
    </div>
  )
}
