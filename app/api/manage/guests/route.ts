import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

function slugifyGuest(name: string): string {
  const cleaned = name.trim()
  if (!cleaned) return ''
  return cleaned
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
}

// GET /api/manage/guests?coupleId=...  — list guests (private; manager only)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const coupleId = searchParams.get('coupleId')
  if (!coupleId) {
    return NextResponse.json({ error: 'Thiếu coupleId' }, { status: 400 })
  }
  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const { data, error } = await supabaseAdmin
    .from('guests')
    .select('*')
    .eq('couple_id', coupleId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Không thể tải danh sách khách.' }, { status: 500 })
  }
  return NextResponse.json({ guests: data || [] })
}

// POST /api/manage/guests  { coupleId, names: string[] }
// Generates guest_slug + resolves collisions server-side, skips existing names.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const coupleId = body?.coupleId
  const names: string[] = Array.isArray(body?.names) ? body.names : []
  if (!coupleId || names.length === 0) {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }
  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const { data: existingGuests, error: fetchError } = await supabaseAdmin
    .from('guests')
    .select('guest_name, guest_slug')
    .eq('couple_id', coupleId)

  if (fetchError) {
    return NextResponse.json({ error: 'Không thể kiểm tra danh sách khách hiện tại.' }, { status: 500 })
  }

  const usedSlugs = new Set<string>()
  ;(existingGuests || []).forEach((g) => g.guest_slug && usedSlugs.add(g.guest_slug))

  const uniqueNames = Array.from(
    new Set(
      names
        .map((n) => (typeof n === 'string' ? n.trim() : ''))
        .filter((n) => n.length > 0 && n.length <= 120)
    )
  )

  const rows: { couple_id: string | number; guest_name: string; guest_slug: string }[] = []
  for (const guestName of uniqueNames) {
    const already = (existingGuests || []).find(
      (g) => g.guest_name?.trim().toLowerCase() === guestName.toLowerCase()
    )
    if (already) continue

    const base = slugifyGuest(guestName) || 'khach'
    let finalSlug = base
    let suffix = 1
    while (usedSlugs.has(finalSlug)) {
      finalSlug = `${base}-${suffix}`
      suffix++
    }
    usedSlugs.add(finalSlug)
    rows.push({ couple_id: coupleId, guest_name: guestName, guest_slug: finalSlug })
  }

  if (rows.length > 0) {
    const { error: insertError } = await supabaseAdmin.from('guests').insert(rows)
    if (insertError) {
      return NextResponse.json({ error: 'Không thể lưu danh sách khách.' }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true, added: rows.length })
}
