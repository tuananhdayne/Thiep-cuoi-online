import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: 'Thiếu tài khoản hoặc mật khẩu' }, { status: 400 })
    }

    // Fetch admin from database with password hash
    const { data: admin, error: fetchError } = await supabase
      .from('admins')
      .select('id, username, password_hash')
      .eq('username', username)
      .single()

    if (fetchError || !admin) {
      // Return generic error to prevent user enumeration
      return NextResponse.json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' }, { status: 401 })
    }

    // Compare password with hash using bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password_hash)

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' }, { status: 401 })
    }

    // Auth successful - client will save session
    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('Admin login error:', err)
    return NextResponse.json({ error: 'Lỗi máy chủ, vui lòng thử lại sau.' }, { status: 500 })
  }
}
