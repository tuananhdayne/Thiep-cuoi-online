import { notFound } from 'next/navigation'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Wishes from '../components/Wishes'
import EventInfo from '../components/EventInfo'
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

  return (
    <main className="min-h-screen text-slate-900">
      <div className="bg-gradient-to-b from-[#fff8ef] via-[#fff3e3] to-white py-8 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.26em] text-[#b17b4c]">Thân gửi</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#4a3326]">{guestRow.guest_name}</h2>
        <p className="text-sm text-[#7b5e4b] mt-2">Rất hân hạnh được đón tiếp bạn trong ngày vui của chúng tôi.</p>
      </div>

      <Hero
        brideName={couple.bride_name}
        groomName={couple.groom_name}
        introDescription={couple.intro_description}
        weddingDate={couple.wedding_date}
        weddingTime={couple.wedding_time}
        location={couple.location}
        address={couple.address}
        backgroundImage={couple.bride_avatar || couple.groom_avatar || undefined}
      />

      <EventInfo
        bride={{
          eventTitle: couple.bride_event_title,
          date: couple.bride_event_date,
          time: couple.bride_event_time,
          location: couple.bride_location,
          address: couple.bride_address,
          mapEmbed: couple.bride_google_map_embed,
        }}
        groom={{
          eventTitle: couple.groom_event_title,
          date: couple.groom_event_date,
          time: couple.groom_event_time,
          location: couple.groom_location,
          address: couple.groom_address,
          mapEmbed: couple.groom_google_map_embed,
        }}
      />

      <Gallery images={gallery || []} />

      <Wishes coupleId={couple.id} initialWishes={wishes || []} />
    </main>
  )
}
