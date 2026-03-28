import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Couple, GalleryItem, Wish } from './templates/types'
import ClassicTemplate from './templates/ClassicTemplate'

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

  // Dynamic loading of templates based on couple.theme
  let TemplateToRender = ClassicTemplate

  if (couple.theme === 'rose') {
    const RoseTemplate = (await import('./templates/RoseTemplate')).default
    TemplateToRender = RoseTemplate
  } else if (couple.theme === 'ocean') {
    const OceanTemplate = (await import('./templates/OceanTemplate')).default
    TemplateToRender = OceanTemplate
  }

  return (
    <main>
      <TemplateToRender
        couple={couple}
        gallery={gallery || []}
        wishes={wishes || []}
      />
    </main>
  )
}
