import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyManageAccess } from '@/lib/requireManage'

// DELETE /api/manage/guests/:id?coupleId=...
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
    .from('guests')
    .delete()
    .eq('id', id)
    .eq('couple_id', coupleId)

  if (error) {
    return NextResponse.json({ error: 'Không xoá được khách này.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
