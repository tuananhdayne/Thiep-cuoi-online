import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Couple, GalleryItem, Wish, WeddingGift, Location, Story } from './templates/types'
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

  // Kiểm tra hạn sử dụng thiệp cưới
  if (couple.expires_at && new Date(couple.expires_at) < new Date()) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf7f2] px-4 font-body-text">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-amber-100 p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-heading-display text-slate-800 font-bold">Thiệp Cưới Đã Hết Hạn</h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Thiệp cưới của <strong>{couple.groom_name} &amp; {couple.bride_name}</strong> đã kết thúc thời gian lưu trữ.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs uppercase tracking-wider font-semibold rounded-full shadow hover:opacity-90 transition"
          >
            Về Trang Chủ
          </Link>
        </div>
      </main>
    )
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
      />
    </main>
  )
}
