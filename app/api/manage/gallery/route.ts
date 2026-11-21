import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

// POST /api/manage/gallery  { coupleId, items: [{ image_url, sort_order }] }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const coupleId = body?.coupleId
  const items = Array.isArray(body?.items) ? body.items : []
  if (!coupleId || items.length === 0) {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }
  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const rows = items
    .filter((it: any) => it && typeof it.image_url === 'string')
    .map((it: any) => ({
      couple_id: coupleId,
      image_url: it.image_url,
      sort_order: Number.isFinite(Number(it.sort_order)) ? Number(it.sort_order) : 0,
    }))

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Không có ảnh hợp lệ' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('gallery').insert(rows)
  if (error) {
    return NextResponse.json({ error: 'Không lưu được ảnh vào database.' }, { status: 500 })
  }
  return NextResponse.json({ success: true, added: rows.length })
}
