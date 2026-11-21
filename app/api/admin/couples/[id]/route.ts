import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/requireAdmin'

// DELETE /api/admin/couples/:id  — delete a couple (admin only)
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Thiếu id' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('couples').delete().eq('id', id)
  if (error) {
    return NextResponse.json({ error: 'Xoá thất bại.' }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

// PATCH /api/admin/couples/:id  — set expiry (admin only). Body: { days: number }
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Thiếu id' }, { status: 400 })
  }

  const body = await req.json().catch(() => ({}))
  const days = Number(body?.days)
  if (!Number.isFinite(days) || days <= 0) {
    return NextResponse.json({ error: 'Số ngày không hợp lệ.' }, { status: 400 })
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + days)
  const expiresIso = expiresAt.toISOString()

  const { error } = await supabaseAdmin
    .from('couples')
    .update({ expires_at: expiresIso })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Thiết lập hạn sử dụng thất bại.' }, { status: 500 })
  }
  return NextResponse.json({ success: true, expires_at: expiresIso })
}
