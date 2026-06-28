'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
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
    <div className="flex items-center justify-center gap-4 py-2 text-[#9aaa8d]">
      <span className="h-px w-14 bg-[#cbd4c1]" />
      <span className="h-2 w-2 rotate-45 border border-[#9aaa8d]" />
      <span className="h-px w-14 bg-[#cbd4c1]" />
    </div>
  )
}

function GardenFrame({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute text-[#879477]/25 ${className}`} aria-hidden="true">
      <BotanicalSprig className="h-full w-full" />
    </div>
  )
}

function FallingPetals({ enabled }: { enabled: boolean }) {
  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute top-[-32px] h-3 w-2 rounded-full bg-[#ead8d1]/55"
          style={{ left: `${8 + index * 8}%` }}
          animate={{ y: ['0vh', '108vh'], x: [0, index % 2 ? 22 : -18, 0], rotate: [0, 160, 320] }}
          transition={{
            duration: 18 + (index % 5) * 2,
            repeat: Infinity,
            delay: index * 1.4,
            ease: 'linear',
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
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Heading({ overline, children }: { overline: string; children: React.ReactNode }) {
  return (
    <div className="relative mb-8 text-center">
      <BotanicalSprig className="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-20 -translate-x-[180px] -translate-y-1/2 rotate-[65deg] text-[#9aaa8d]/20 sm:block" />
      <BotanicalSprig className="pointer-events-none absolute left-1/2 top-1/2 hidden h-28 w-20 translate-x-[100px] -translate-y-1/2 rotate-[-65deg] text-[#9aaa8d]/20 sm:block" flip />
      <p className="font-display text-xl text-[#b4a173]">✦</p>
      <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#879477]">{overline}</p>
      <h2 className="mt-3 font-display text-3xl text-[#3f4a38] sm:text-5xl">{children}</h2>
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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
            <BotanicalSprig className="absolute -left-8 -top-8 h-48 w-32 rotate-[18deg] text-[#edf1e7]/75 sm:h-72 sm:w-48" />
            <BotanicalSprig className="absolute -right-8 -top-8 h-48 w-32 rotate-[-18deg] text-[#edf1e7]/75 sm:h-72 sm:w-48" flip />

            <motion.div
              className="absolute inset-x-0 bottom-0 px-5 pb-10 text-center text-white sm:px-12 sm:pb-14"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#eff2e8]">Save The Date</p>
              <h1 className="mt-4 font-display text-[1.8rem] xs:text-[2.2rem] min-[390px]:text-[2.5rem] sm:text-6xl md:text-7xl leading-[1.02] drop-shadow-lg whitespace-nowrap">
                {couple.bride_name}
                <span className="mx-2 font-normal italic text-[#e5d5af]">&amp;</span>
                {couple.groom_name}
              </h1>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/85">
                {couple.wedding_date || 'Our wedding day'}
              </p>
              <div className="mx-auto mt-7 h-px w-24 bg-[#e5d5af]" />
              <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-white/80 sm:text-sm">
                We are getting married in a garden filled with love, sunlight and everyone we cherish.
              </p>
            </motion.div>
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
              <GardenFrame className="-left-14 -top-20 h-64 w-40 rotate-[35deg]" />
              <div className="relative min-h-[320px] overflow-hidden rounded-[24px] sm:min-h-[440px]">
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
          <GardenFrame className="-left-20 top-24 h-72 w-48 rotate-[22deg]" />
          <GardenFrame className="-right-20 bottom-16 h-72 w-48 rotate-[-22deg]" />
          <Heading overline="A Journey Through The Garden">Hành trình yêu thương</Heading>
          <div className="relative mx-auto max-w-3xl before:absolute before:bottom-0 before:left-[21px] before:top-0 before:w-px before:bg-[#bdc8b4] sm:before:left-1/2">
            {storyItems.map((story, index) => (
              <Reveal key={story.id} delay={index * 0.05}>
                <article className={`relative mb-9 pl-14 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}>
                  <span className="absolute left-[10px] top-7 z-10 grid h-6 w-6 place-items-center rounded-full border-4 border-[#f5f1e8] bg-[#879477] text-[10px] text-white sm:left-1/2 sm:-translate-x-1/2">
                    ✦
                  </span>
                  <div className={`${index % 2 ? 'sm:col-start-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-[22px] border border-[#d6ddcf] bg-white/90 p-3 shadow-[0_16px_45px_rgba(74,86,65,0.08)]">
                      <span className="absolute right-5 top-4 font-display text-4xl text-[#d8c9a8]/55">{String(index + 1).padStart(2, '0')}</span>
                      <BotanicalSprig className="absolute -bottom-16 -right-12 h-48 w-32 rotate-[-35deg] text-[#9aaa8d]/12" flip />
                      {story.image_url && (
                        <button type="button" onClick={() => setSelectedImage(story.image_url || null)} className="relative block aspect-[3/4] w-full overflow-hidden rounded-[16px]">
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
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-[#edf1e9]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <Heading overline="Captured In Bloom">Album kỷ niệm</Heading>
            <div className="columns-2 gap-3 sm:columns-3 sm:gap-5">
              {gallery?.map((image, index) => (
                <Reveal key={image.id} delay={(index % 4) * 0.03} className="mb-3 break-inside-avoid sm:mb-5">
                  <button type="button" onClick={() => setSelectedImage(image.image_url)} className="group relative block w-full overflow-hidden rounded-[18px] border-[5px] border-white bg-white shadow-[0_12px_35px_rgba(74,86,65,0.1)]">
                    <Image
                      src={image.image_url}
                      alt={image.caption || 'Ảnh cưới'}
                      width={800}
                      height={index % 3 === 0 ? 1000 : 700}
                      className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="mx-auto max-w-5xl px-3 py-12 sm:px-6 sm:py-16">
          <Heading overline="Wedding Celebration">Thông tin hôn lễ</Heading>
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
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
          <Reveal>
            <div className="rounded-[28px] border border-[#d3dccb] bg-white/75 px-4 py-9 shadow-[0_18px_55px_rgba(74,86,65,0.09)] backdrop-blur">
              <Heading overline="Counting Down">Ngày hạnh phúc đang đến</Heading>
              <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-5xl px-3 py-8 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <GiftSection couple={couple} weddingGift={weddingGift} />
        </div>

        <div id="rsvp" className="mx-auto max-w-5xl px-3 py-8 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <RsvpSection
            coupleId={couple.id}
            brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
            groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
            includeMessage
          />
        </div>

        <div className="mx-auto max-w-6xl px-3 py-8 pb-20 sm:px-6 [&>section]:rounded-[30px] [&>section]:border [&>section]:border-[#d3dccb] [&>section]:bg-white/80 [&>section]:shadow-[0_20px_60px_rgba(74,86,65,0.09)]">
          <WishSection coupleId={couple.id} initialWishes={wishes || []} />
        </div>
      </main>

      <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />
      <AudioPlayer musicUrl={couple.music_url} delay={couple.music_delay} volume={couple.music_volume} autoplay={couple.music_autoplay} />

      {selectedImage && (
        <button type="button" onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[100] grid place-items-center bg-[#182016]/95 p-4 backdrop-blur-md">
          <span className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.3em] text-white">Đóng</span>
          <span className="relative h-[85vh] w-full max-w-5xl">
            <Image src={selectedImage} alt="Ảnh cưới phóng to" fill sizes="100vw" className="object-contain" />
          </span>
        </button>
      )}
    </div>
  )
}
