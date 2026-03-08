import { notFound } from 'next/navigation'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import LocationSection from '../components/LocationSection'
import Countdown from '../components/Countdown'
import RsvpSection from '../components/RsvpSection'
import WishSection from '../components/WishSection'
import PetalEffect from '../components/PetalEffect'
import Footer from '../components/Footer'
import AudioPlayer from '../components/AudioPlayer'
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

type Guest = {
  id: number
  guest_name: string
  guest_slug: string
  couple_id: number
}

const extractMapSrc = (value?: string | null) => {
  if (!value) return null
  const iframeMatch = value.match(/<iframe[^>]*src=["']([^"']+)["']/i)
  if (iframeMatch?.[1]) return iframeMatch[1].trim()
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return null
}

export default async function GuestInvitePage({
  params,
}: {
  params: Promise<{ slug: string; guest: string }>
}) {
  const { slug, guest } = await params

  const { data: couple } = await supabase
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single<Couple>()

  if (!couple) {
    return notFound()
  }

  const { data: guestRow } = await supabase
    .from('guests')
    .select('*')
    .eq('couple_id', couple.id)
    .eq('guest_slug', guest)
    .single<Guest>()

  if (!guestRow) {
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

  const mapLink =
    extractMapSrc(couple.bride_google_map_embed || undefined) ||
    extractMapSrc(couple.groom_google_map_embed || undefined) ||
    null

  const heroBackground = gallery?.[0]?.image_url || couple.bride_avatar || couple.groom_avatar || undefined

  return (
    <main className="bg-[#f8f4ef] text-[#5b3a29] overflow-hidden">
      <PetalEffect />

      <Hero
        brideName={couple.bride_name}
        groomName={couple.groom_name}
        introDescription={couple.intro_description}
        weddingDate={couple.wedding_date}
        weddingTime={couple.wedding_time}
        backgroundImage={heroBackground}
        guestName={guestRow.guest_name}
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
        guestName={guestRow.guest_name}
        brideAvatar={gallery?.[1]?.image_url || couple.bride_avatar}
        groomAvatar={gallery?.[0]?.image_url || couple.groom_avatar}
      />

      <WishSection coupleId={couple.id} initialWishes={wishes || []} guestName={guestRow.guest_name} />

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
