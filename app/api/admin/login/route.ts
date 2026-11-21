import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from '@/lib/adminSession'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Thiếu tài khoản hoặc mật khẩu' }, { status: 400 })
    }

    const { data: admin, error: fetchError } = await supabaseAdmin
      .from('admins')
      .select('id, username, password_hash')
      .eq('username', username)
      .single()

    if (fetchError || !admin) {
      // Generic error to prevent user enumeration
      return NextResponse.json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' }, { status: 401 })
    }

    // Issue a signed, httpOnly session cookie. The browser cannot forge this.
    const token = createSessionToken(admin.username)
    const res = NextResponse.json({ success: true })
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    })
    return res
  } catch (err) {
    console.error('Admin login error:', err)
    return NextResponse.json({ error: 'Lỗi máy chủ, vui lòng thử lại sau.' }, { status: 500 })
  }
}
