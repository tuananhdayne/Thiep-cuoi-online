import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/requireAdmin'
import { generateManageToken, hashManageToken } from '@/lib/manageToken'

// POST /api/admin/couples/:id/manage-link
// Regenerates the manage token for a couple and returns the one-time secret link.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Thiếu id' }, { status: 400 })
  }

  const { data: couple, error: fetchError } = await supabaseAdmin
    .from('couples')
    .select('id, slug')
    .eq('id', id)
    .single()

  if (fetchError || !couple) {
    return NextResponse.json({ error: 'Không tìm thấy thiệp' }, { status: 404 })
  }

  const token = generateManageToken()
  const { error } = await supabaseAdmin
    .from('couples')
    .update({ manage_token_hash: hashManageToken(token) })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Không tạo được link quản lý.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, slug: couple.slug, token })
}
