import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

// DELETE /api/manage/gallery/:id?coupleId=...
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { searchParams } = new URL(req.url)
  const coupleId = searchParams.get('coupleId')
  if (!id || !coupleId) {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }
  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const { error } = await supabaseAdmin
    .from('gallery')
    .delete()
    .eq('id', id)
    .eq('couple_id', coupleId)

  if (error) {
    return NextResponse.json({ error: 'Không xoá được ảnh.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

// PATCH /api/manage/gallery/:id  { coupleId, sort_order }
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  const coupleId = body?.coupleId
  const sortOrder = Number(body?.sort_order)
  if (!id || !coupleId || !Number.isFinite(sortOrder)) {
    return NextResponse.json({ error: 'Thiếu dữ liệu' }, { status: 400 })
  }
  if (!(await verifyManageAccess(coupleId))) {
    return NextResponse.json({ error: 'Không có quyền quản lý thiệp này' }, { status: 403 })
  }

  const { error } = await supabaseAdmin
    .from('gallery')
    .update({ sort_order: sortOrder })
    .eq('id', id)
    .eq('couple_id', coupleId)

  if (error) {
    return NextResponse.json({ error: 'Không cập nhật được thứ tự.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
