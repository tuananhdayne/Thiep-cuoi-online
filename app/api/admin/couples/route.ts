import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/requireAdmin'

// GET /api/admin/couples  — list all couples (admin only)
export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('couples')
    .select('id, slug, bride_name, groom_name, wedding_date, location, created_at, expires_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Không thể tải danh sách thiệp.' }, { status: 500 })
  }
  return NextResponse.json({ couples: data || [] })
}
