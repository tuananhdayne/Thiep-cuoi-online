import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Couple, GalleryItem, Wish, WeddingGift, Location } from './templates/types'
import { loadTemplate } from './templates/templateLoader'

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

  const [{ data: gallery }, { data: wishes }, { data: weddingGift }, { data: locations }] = await Promise.all([
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
      />
    </main>
  )
}
