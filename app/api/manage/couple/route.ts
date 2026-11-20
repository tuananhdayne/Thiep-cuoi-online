import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

// Columns the manager must never be able to overwrite via this endpoint.
const FORBIDDEN = new Set([
  'id',
  'slug',
  'created_at',
  'expires_at',
  'manage_token_hash',
])

// POST /api/manage/couple  { coupleId, fields }
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
  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: 'Không có trường hợp lệ để cập nhật' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('couples').update(payload).eq('id', coupleId)
  if (error) {
    return NextResponse.json({ error: 'Cập nhật thất bại.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
