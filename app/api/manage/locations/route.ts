import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

const FORBIDDEN = new Set(['id', 'couple_id', 'created_at'])

// POST /api/manage/locations  { coupleId, fields }
// Upserts the single locations row for a couple.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const coupleId = body?.coupleId
  const fields = body?.fields
  if (!coupleId || !fields || typeof fields !== 'object') {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }

  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const payload: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(fields)) {
    if (!FORBIDDEN.has(k)) payload[k] = v
  }

  // Does a row already exist?
  const { data: existing } = await supabaseAdmin
    .from('locations')
    .select('id')
    .eq('couple_id', coupleId)
    .maybeSingle()

  let error
  if (existing) {
    ;({ error } = await supabaseAdmin
      .from('locations')
      .update(payload)
      .eq('couple_id', coupleId))
  } else {
    ;({ error } = await supabaseAdmin
      .from('locations')
      .insert({ ...payload, couple_id: coupleId }))
  }

  if (error) {
    return NextResponse.json({ error: 'Cập nhật địa điểm thất bại.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
