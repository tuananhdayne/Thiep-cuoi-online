import { notFound } from 'next/navigation'
import InviteInput from './components/InviteInput'
import GuestsTable from './components/GuestsTable'
import WishesList from './components/WishesList'
import GalleryManager from './components/GalleryManager'
import { supabase } from '@/lib/supabaseClient'

async function getCouple(slug: string) {
  const { data } = await supabase
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getWishes(coupleId: number) {
  const { data } = await supabase
    .from('wishes')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })
  return data || []
}

async function getGuests(coupleId: number) {
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })
  return data || []
}

export default async function ManagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const couple = await getCouple(slug)
  if (!couple) {
    return notFound()
  }

  const wishes = await getWishes(couple.id)
  const guests = await getGuests(couple.id)

  return (
    <main
      className="min-h-screen px-4 py-12 bg-[#f8f4ef]"
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(240, 221, 200, 0.18), transparent 45%), #f8f4ef`,
      }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/50 border border-amber-50 p-6 md:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Quản lý thiệp</p>
          <h1 className="font-display text-[30px] text-[#5b3a29] leading-tight">
            Quản lý thiệp cưới của {couple.bride_name} &amp; {couple.groom_name}
          </h1>
          <p className="text-sm text-[#9a7d68]">Tạo link khách mời, quản lý album ảnh và xem lời chúc.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <InviteInput coupleId={couple.id} baseSlug={slug} />
          </div>
          <div className="lg:col-span-1">
            <GuestsTable coupleId={couple.id} baseSlug={slug} initialGuests={guests} />
          </div>
        </div>

        <GalleryManager coupleId={couple.id} slug={slug} />

        <WishesList wishes={wishes} />
      </div>
    </main>
  )
}
