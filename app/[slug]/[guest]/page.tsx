import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Couple, GalleryItem, Wish, WeddingGift, Location, Story } from '../templates/types'
import { loadTemplate } from '../templates/templateLoader'

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

  const [{ data: gallery }, { data: wishes }, { data: weddingGift }, { data: locations }, { data: stories }] = await Promise.all([
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
    supabase
      .from('wedding_gifts')
      .select('*')
      .eq('couple_id', couple.id)
      .maybeSingle<WeddingGift>(),
    supabase
      .from('locations')
      .select('*')
      .eq('couple_id', couple.id)
      .maybeSingle<Location>(),
    supabase
      .from('stories')
      .select('*')
      .eq('couple_id', couple.id)
      .order('sort_order', { ascending: true })
      .returns<Story[]>(),
  ])

  const TemplateToRender = await loadTemplate(couple.theme)

  return (
    <main>
      <TemplateToRender
        couple={couple}
        gallery={gallery || []}
        wishes={wishes || []}
        weddingGift={weddingGift}
        locations={locations}
        stories={stories || []}
        guestName={guestRow.guest_name}
      />
    </main>
  )
}
