import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import InviteInput from './components/InviteInput'
import GuestsTable from './components/GuestsTable'
import WishesList from './components/WishesList'
import InfoManager from './components/InfoManager'
import GalleryManager from './components/GalleryManager'
import MusicManager from './components/MusicManager'
import RsvpManager from './components/RsvpManager'
import ManageSessionSync from './components/ManageSessionSync'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { manageCookieName, manageTokenMatches } from '@/lib/manageToken'

async function getCouple(slug: string) {
  const { data } = await supabaseAdmin
    .from('couples')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getWishes(coupleId: string | number) {
  const { data } = await supabaseAdmin
    .from('wishes')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })
  return data || []
}

async function getGuests(coupleId: string | number) {
  const { data } = await supabaseAdmin
    .from('guests')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })
  return data || []
}

async function getRsvps(coupleId: string | number) {
  const { data } = await supabaseAdmin
    .from('rsvp')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })
  return data || []
}

function Forbidden() {
  return (
    <main className="min-h-screen px-4 py-16 bg-[#f8f4ef] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl border border-amber-50 p-8 max-w-md text-center space-y-3">
        <h1 className="font-display text-2xl text-[#5b3a29]">Không có quyền truy cập</h1>
        <p className="text-sm text-[#9a7d68]">
          Trang quản lý này cần đúng <strong>link quản lý bí mật</strong> (có mã token) mà bạn
          nhận được khi tạo thiệp. Vui lòng mở lại bằng đúng link đó.
        </p>
        <Link href="/" className="inline-block mt-2 text-sm font-semibold text-[#b9772b] hover:underline">
          ← Về trang chủ
        </Link>
      </div>
    </main>
  )
}

export default async function ManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const { slug } = await params
  const { token: urlToken } = await searchParams

  const couple = await getCouple(slug)
  if (!couple) {
    return notFound()
  }

  // Authorize: a valid manage token (from URL or cookie) must hash to the couple's
  // stored hash. This is enforced for ALL couples — including legacy ones with no
  // hash yet — so that knowing the slug is never enough to read private data
  // (guests/rsvp) or reach the edit forms. A legacy couple with no hash has no
  // valid token, so it is denied until an admin generates a manage link for it
  // (/admin -> "Link quản lý"). This matches the write routes (verifyManageAccess),
  // which already require a valid token.
  const store = await cookies()
  const cookieToken = store.get(manageCookieName(couple.id))?.value
  const authorized =
    manageTokenMatches(urlToken, couple.manage_token_hash) ||
    manageTokenMatches(cookieToken, couple.manage_token_hash)

  if (!authorized) {
    return <Forbidden />
  }

  const { data: locations } = await supabaseAdmin
    .from('locations')
    .select('*')
    .eq('couple_id', couple.id)
    .maybeSingle()

  const wishes = await getWishes(couple.id)
  const guests = await getGuests(couple.id)
  const rsvps = await getRsvps(couple.id)

  return (
    <main
      className="min-h-screen px-4 py-12 bg-[#f8f4ef]"
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(240, 221, 200, 0.18), transparent 45%), #f8f4ef`,
      }}
    >
      <ManageSessionSync coupleId={couple.id} />
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-2xl shadow-amber-100/50 border border-amber-50 p-6 md:p-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8c6f5a]">Quản lý thiệp</p>
          <h1 className="font-display text-[30px] text-[#5b3a29] leading-tight">
            Quản lý thiệp cưới của {couple.bride_name} &amp; {couple.groom_name}
          </h1>
          <p className="text-sm text-[#9a7d68]">Sửa thông tin, chia sẻ thiệp, quản lý ảnh và nhận lời chúc.</p>
        </div>

        <InfoManager couple={couple} locations={locations || {}} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <InviteInput coupleId={couple.id} baseSlug={slug} />
          </div>
          <div className="lg:col-span-1">
            <GuestsTable coupleId={couple.id} baseSlug={slug} initialGuests={guests} />
          </div>
        </div>

        <GalleryManager coupleId={couple.id} slug={slug} />

        <MusicManager
          coupleId={couple.id}
          initialMusicUrl={couple.music_url}
          initialMusicDelay={couple.music_delay}
          initialMusicVolume={couple.music_volume}
          initialMusicAutoplay={couple.music_autoplay}
        />

        <RsvpManager rsvps={rsvps} />

        <WishesList wishes={wishes} />
      </div>
    </main>
  )
}
