import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import {
  MANAGE_COOKIE_MAX_AGE,
  manageCookieName,
  manageTokenMatches,
} from '@/lib/manageToken'

// POST /api/manage/session  { coupleId, token }
// Exchanges a valid plaintext manage token for an httpOnly cookie, so the token
// does not have to stay in the URL for subsequent management actions.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const coupleId = body?.coupleId
  const token = body?.token
  if (!coupleId || !token) {
    return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('couples')
    .select('manage_token_hash')
    .eq('id', coupleId)
    .single()

  if (error || !data || !manageTokenMatches(token, data.manage_token_hash)) {
    return NextResponse.json({ error: 'Token quản lý không hợp lệ' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(manageCookieName(coupleId), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MANAGE_COOKIE_MAX_AGE,
  })
  return res
}
