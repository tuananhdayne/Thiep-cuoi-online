import React from 'react'
import Image from 'next/image'
import Gallery from '../components/Gallery'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import GiftSection from '../components/GiftSection'
import { TemplateProps } from './types'

function PatternBand() {
  return (
    <svg viewBox="0 0 1200 76" className="h-9 w-full text-[#0f766e] md:h-14" fill="none" aria-hidden="true">
      <path d="M10 38h1180" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.45" />
      <path d="M0 38c24 0 24-20 48-20s24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20 24-20 48-20 24 20 48 20" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="600" cy="38" r="8" fill="currentColor" fillOpacity="0.8" />
      <circle cx="552" cy="38" r="4" fill="currentColor" fillOpacity="0.55" />
      <circle cx="648" cy="38" r="4" fill="currentColor" fillOpacity="0.55" />
    </svg>
  )
}

function CornerSeal({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="72" stroke="#2a9d8f" strokeWidth="4" strokeOpacity="0.45" />
      <circle cx="80" cy="80" r="56" stroke="#174a43" strokeWidth="2.6" strokeOpacity="0.55" />
      <path d="M80 32v96M32 80h96M47 47l66 66M113 47 47 113" stroke="#174a43" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="80" cy="80" r="20" fill="#174a43" fillOpacity="0.12" />
    </svg>
  )
}

export default function HeritageTemplate({
  couple,
  gallery,
  wishes,
  weddingGift,
  locations,
}: TemplateProps) {
  const heroBackground =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    '/placeholder.svg?height=1200&width=1200'

  const themeClass = 'theme-heritage'

  return (
    <div className={`relative overflow-hidden bg-bg-main text-primary ${themeClass}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] md:opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(15,118,110,0.18) 1px, transparent 0), radial-gradient(circle at 12px 12px, rgba(23,74,67,0.14) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <header className="relative mx-auto max-w-6xl px-4 pb-6 pt-5 md:px-8 md:pb-10 md:pt-12">
        <PatternBand />
        <div className="relative mt-3 overflow-hidden rounded-[24px] border border-[#cde3dd] bg-[#f8fcfa] shadow-[0_12px_36px_rgba(17,74,66,0.12)] md:mt-5 md:rounded-[36px] md:shadow-[0_20px_60px_rgba(17,74,66,0.14)]">
          <CornerSeal className="absolute -left-9 -top-10 hidden h-28 w-28 md:block" />
          <CornerSeal className="absolute -bottom-10 -right-9 hidden h-28 w-28 md:block" />

          <div className="grid items-stretch lg:min-h-[68vh] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-2 relative min-h-[250px] md:min-h-[340px] lg:order-1">
              <Image
                src={heroBackground}
                alt={`${couple.bride_name} va ${couple.groom_name}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c2d29]/55 via-[#15514a]/30 to-transparent" />
            </div>

            <div className="order-1 relative z-10 flex flex-col justify-center gap-4 p-5 md:gap-6 md:p-12 lg:order-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent md:text-xs md:tracking-[0.38em]">Thiệp Hỷ Truyền Thống</p>
              <h1 className="font-display text-[2.1rem] leading-[1.15] text-primary sm:text-4xl md:text-6xl">
                {couple.bride_name}
                <span className="mx-2 text-accent md:mx-3">&amp;</span>
                {couple.groom_name}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-primary-light md:text-base md:leading-8">
                {couple.intro_description || 'Trân trọng kính mời quý thân hữu tới chung vui ngày thành hôn trong không gian đậm nét cổ truyền Việt Nam.'}
              </p>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-light bg-accent-bg px-4 py-2 text-xs font-medium text-primary-light sm:gap-3 sm:px-5 sm:py-2.5 sm:text-sm">
                <span>{couple.wedding_date || '00-00-0000'}</span>
                {couple.wedding_time && <span className="text-accent">• {couple.wedding_time}</span>}
              </div>
              <div className="mt-1 flex gap-2 sm:gap-3">
                <a
                  href="#rsvp"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-light px-4 py-2 text-xs font-semibold text-white shadow-sm sm:px-5"
                >
                  Xác nhận
                </a>
                <a
                  href="#location"
                  className="inline-flex items-center justify-center rounded-full border border-border-light bg-white px-4 py-2 text-xs font-semibold text-primary sm:px-5"
                >
                  Chỉ đường
                </a>
              </div>
            </div>
          </div>
        </div>
        <PatternBand />
      </header>

      <main className="relative mx-auto max-w-6xl space-y-9 px-4 pb-14 md:space-y-14 md:px-8 md:pb-24">
        <section className="rounded-[24px] border border-border-light bg-bg-alt p-4 md:rounded-[30px] md:p-9">
          <h2 className="mb-5 font-display text-3xl text-primary md:text-4xl">Giờ Lành Đang Đến</h2>
          <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
        </section>

        <section className="rounded-[24px] border border-border-light bg-bg-alt p-3 md:rounded-[30px] md:p-8">
          {(() => {
            return (
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
            )
          })()}
        </section>

        <section className="rounded-[24px] border border-border-light bg-bg-alt p-3 md:rounded-[30px] md:p-8">
          <Gallery images={gallery || []} />
        </section>

        <GiftSection couple={couple} weddingGift={weddingGift} />

        <RsvpSection
          coupleId={couple.id}
          brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
          groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
        />

        <WishSection coupleId={couple.id} initialWishes={wishes || []} />

        <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />
      </main>

      <AudioPlayer
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay}
      />
    </div>
  )
}
