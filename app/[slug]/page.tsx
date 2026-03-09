import { notFound } from 'next/navigation'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import LocationSection from './components/LocationSection'
import RsvpSection from './components/RsvpSection'
import Countdown from './components/Countdown'
import WishSection from './components/WishSection'
import PetalEffect from './components/PetalEffect'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import { supabase } from '@/lib/supabaseClient'

type Couple = {
  id: number
  slug: string
  bride_name: string
  groom_name: string
  bride_avatar?: string | null
  groom_avatar?: string | null
  intro_title?: string | null
  intro_description?: string | null
  wedding_date?: string | null
  wedding_time?: string | null
  location?: string | null
  address?: string | null
  bride_event_title?: string | null
  bride_event_date?: string | null
  bride_event_time?: string | null
  bride_location?: string | null
  bride_address?: string | null
  bride_google_map_embed?: string | null
  groom_event_title?: string | null
  groom_event_date?: string | null
  groom_event_time?: string | null
  groom_location?: string | null
  groom_address?: string | null
  groom_google_map_embed?: string | null
  music_url?: string | null
  music_delay?: number | null
  music_volume?: number | null
  music_autoplay?: boolean | null
  theme?: string | null
}

type GalleryItem = {
  id: number
  image_url: string
  caption?: string | null
  sort_order?: number | null
}

type Wish = {
  id: number
  name: string | null
  message: string
  created_at: string
}

const extractMapSrc = (value?: string | null) => {
  if (!value) return null
  const iframeMatch = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
  if (iframeMatch?.[1]) return iframeMatch[1].trim()
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return null
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: couple } = await supabase
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single<Couple>()

  if (!couple) {
    return notFound()
  }

  const [{ data: gallery }, { data: wishes }] = await Promise.all([
    supabase
      .from('gallery')
      .select('*')
      .eq('couple_id', couple.id)
      .order('sort_order', { ascending: true })
      .returns<GalleryItem[]>(),
    supabase
      .from('wishes')
      .select('*')
      .eq('couple_id', couple.id)
      .order('created_at', { ascending: false })
      .returns<Wish[]>(),
  ])

  const heroBackground = gallery?.[0]?.image_url || couple.bride_avatar || couple.groom_avatar || undefined

  const themeClass = couple.theme && couple.theme !== 'classic' ? `theme-${couple.theme}` : ''

  return (
    <main className={`bg-bg-main text-primary overflow-hidden ${themeClass}`}>
      <PetalEffect />

      <Hero
        brideName={couple.bride_name}
        groomName={couple.groom_name}
        introDescription={couple.intro_description}
        weddingDate={couple.wedding_date}
        weddingTime={couple.wedding_time}
        backgroundImage={heroBackground}
      />

      <LocationSection
        brideInfo={{
          title: couple.bride_event_title,
          date: couple.bride_event_date,
          time: couple.bride_event_time,
          location: couple.bride_location,
          address: couple.bride_address,
          mapEmbedUrl: couple.bride_google_map_embed,
        }}
        groomInfo={{
          title: couple.groom_event_title,
          date: couple.groom_event_date,
          time: couple.groom_event_time,
          location: couple.groom_location,
          address: couple.groom_address,
          mapEmbedUrl: couple.groom_google_map_embed,
        }}
      />

      <Countdown weddingDate={couple.wedding_date} weddingTime={couple.wedding_time} />

      <Gallery images={gallery || []} />

      <RsvpSection
        coupleId={couple.id}
        brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
        groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
      />

      <WishSection coupleId={couple.id} initialWishes={wishes || []} />

      <Footer bride={couple.bride_name} groom={couple.groom_name} date={couple.wedding_date} />

      <AudioPlayer
        musicUrl={couple.music_url}
        delay={couple.music_delay}
        volume={couple.music_volume}
        autoplay={couple.music_autoplay}
      />
    </main>
  )
}
