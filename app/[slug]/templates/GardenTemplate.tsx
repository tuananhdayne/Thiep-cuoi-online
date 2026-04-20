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

export default function GardenTemplate({
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
    <div className="theme-garden relative min-h-screen overflow-hidden bg-bg-main text-primary">
      <OrnamentBackdrop variant="garden" />

      <header className="relative grid min-h-[100svh] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[42vh] overflow-hidden lg:min-h-screen">
          <Image
            src={heroBackground}
            alt={`${couple.bride_name} & ${couple.groom_name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-emerald-950/10 to-emerald-900/45" />

          <div className="absolute inset-x-6 top-6 flex items-center justify-between text-white/90 md:inset-x-8">
            <p className="text-[11px] uppercase tracking-[0.34em]">Garden Collection</p>
            <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] backdrop-blur">
              Thiệp cưới sân vườn
            </div>
          </div>

          <div className="absolute inset-0 flex items-end p-6 md:p-10">
            <div className="max-w-lg rounded-[28px] border border-white/15 bg-black/25 p-6 text-white backdrop-blur-md md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/75">Trân trọng kính mời</p>
              <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
                {couple.bride_name} <span className="text-[#d9efc4]">&amp;</span> {couple.groom_name}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {couple.intro_description || 'Một buổi tiệc nhẹ nhàng giữa vườn hoa, ấm áp và tinh tế.'}
              </p>
              <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                {couple.wedding_date}
                {couple.wedding_time && <span className="mx-2 text-white/70">•</span>}
                {couple.wedding_time}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center px-6 py-12 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-emerald-700 shadow-sm backdrop-blur">
              <span className="text-base">🌿</span>
              Mẫu Garden
            </div>
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">
              Cảm giác tự nhiên, mềm mại và rất đỗi gần gũi.
            </h2>
            <p className="text-base leading-8 text-primary-light md:text-lg">
              Thiết kế này dùng họa tiết lá, khoảng trắng thoáng và các khối nội dung như giấy in tay để tạo cảm giác thủ công hơn, không bị giống giao diện máy tạo sẵn.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border-light bg-white/90 p-5 shadow-[0_16px_40px_rgba(56,95,48,0.08)]">
                <p className="text-xs uppercase tracking-[0.26em] text-emerald-600">Điểm nhấn</p>
                <p className="mt-2 font-semibold text-primary">Lá, viền mảnh, giấy mờ</p>
              </div>
              <div className="rounded-3xl border border-border-light bg-white/90 p-5 shadow-[0_16px_40px_rgba(56,95,48,0.08)]">
                <p className="text-xs uppercase tracking-[0.26em] text-emerald-600">Phong cách</p>
                <p className="mt-2 font-semibold text-primary">Tinh tế, nhẹ nhàng, tự nhiên</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-20 px-4 py-14 md:px-6 md:py-20">
        <section className="paper-card overflow-hidden border border-emerald-100/80 bg-white/92 p-8 shadow-[0_22px_60px_rgba(56,95,48,0.08)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Lời ngỏ</p>
              <h3 className="font-display text-3xl text-primary md:text-4xl">Một ngày nên thơ giữa sắc xanh dịu mát</h3>
              <p className="max-w-xl text-base leading-8 text-primary-light md:text-lg">
                {couple.intro_description || 'Chúng mình rất mong được đón bạn trong không gian ấm cúng, gần gũi và đầy hoa lá.'}
              </p>
            </div>
            <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-inner">
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

        <section className="rounded-[34px] border border-emerald-100 bg-white p-5 shadow-[0_20px_50px_rgba(56,95,48,0.08)] md:p-8">
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
