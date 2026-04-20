import React from 'react'
import Image from 'next/image'
import Gallery from '../components/Gallery'
import LocationSection from '../components/LocationSection'
import RsvpSection from '../components/RsvpSection'
import Countdown from '../components/Countdown'
import WishSection from '../components/WishSection'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
import OrnamentBackdrop from '../components/OrnamentBackdrop'
import { TemplateProps } from './types'

export default function MidnightTemplate({
  couple,
  gallery,
  wishes,
}: TemplateProps) {
  const heroBackground =
    gallery?.[0]?.image_url ||
    couple.bride_avatar ||
    couple.groom_avatar ||
    '/placeholder.svg?height=1000&width=1000'

  return (
    <div className="theme-midnight relative min-h-screen overflow-hidden bg-bg-main text-primary">
      <OrnamentBackdrop variant="midnight" />

      <section className="relative flex min-h-[100svh] items-center justify-center px-4 py-10 md:px-6">
        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="order-2 space-y-6 rounded-[34px] border border-white/10 bg-white/6 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-lg lg:order-1 lg:p-10 xl:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-white/80">
              <span className="text-base">✦</span>
              Midnight Edit
            </div>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              {couple.bride_name} <span className="text-[#d4af7a]">&amp;</span> {couple.groom_name}
            </h1>
            <p className="max-w-xl text-base leading-8 text-white/80 md:text-lg">
              {couple.intro_description || 'Một buổi tiệc tối sang trọng, giàu chiều sâu, với ánh vàng và họa tiết tinh xảo.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/60">Ngày cưới</p>
                <p className="mt-2 font-semibold">{couple.wedding_date}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/60">Giờ</p>
                <p className="mt-2 font-semibold">{couple.wedding_time || '—'}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/60">Phong cách</p>
                <p className="mt-2 font-semibold">Luxury Night</p>
              </div>
            </div>
          </div>

          <div className="order-1 relative min-h-[48vh] overflow-hidden rounded-[38px] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:order-2 lg:min-h-[86vh]">
            <Image
              src={heroBackground}
              alt={`${couple.bride_name} & ${couple.groom_name}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,122,0.28),transparent_30%),linear-gradient(180deg,rgba(3,7,18,0.15),rgba(3,7,18,0.72))]" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-white/80 md:inset-x-8">
              <p className="text-[11px] uppercase tracking-[0.34em]">Mẫu đêm</p>
              <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] backdrop-blur">
                Gold & Noir
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="rounded-[28px] border border-white/10 bg-black/35 p-6 text-white backdrop-blur-md md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/65">Trân trọng kính mời</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                  Cảm giác tối giản nhưng giàu chất liệu, không gian ánh sáng thấp, viền vàng mảnh và các họa tiết như in dập nổi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-6xl space-y-20 px-4 pb-16 md:px-6 md:pb-24">
        <section className="rounded-[34px] border border-white/10 bg-white/7 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-lg md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.02fr] lg:items-center">
            <div className="space-y-4 text-white">
              <p className="text-xs uppercase tracking-[0.32em] text-white/60">Lời ngỏ</p>
              <h2 className="font-display text-3xl md:text-5xl">Sang trọng, mạnh mẽ và khác biệt</h2>
              <p className="max-w-xl text-base leading-8 text-white/75 md:text-lg">
                {couple.intro_description || 'Một bố cục tối màu nhưng ấm, có chiều sâu, phù hợp với cặp đôi thích phong cách tinh tế.'}
              </p>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-black/20 p-5 shadow-inner md:p-6">
              <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
            </div>
          </div>
        </section>

        <LocationSection
          weddingDate={couple.wedding_date}
          weddingTime={couple.wedding_time}
          brideInfo={{
            title: couple.bride_event_title,
            location: couple.bride_location,
            address: couple.bride_address,
            mapEmbedUrl: couple.bride_google_map_embed,
          }}
          groomInfo={{
            title: couple.groom_event_title,
            location: couple.groom_location,
            address: couple.groom_address,
            mapEmbedUrl: couple.groom_google_map_embed,
          }}
        />

        <section className="rounded-[34px] border border-white/10 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-8">
          <Gallery images={gallery || []} />
        </section>

        <RsvpSection
          coupleId={couple.id}
          brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
          groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
        />

        <WishSection coupleId={couple.id} initialWishes={wishes || []} />

        <Footer
          bride={couple.bride_name}
          groom={couple.groom_name}
          date={couple.wedding_date}
        />
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
