import crypto from 'crypto'

// Signed, httpOnly admin session cookie. The signature (HMAC-SHA256) is verified
// server-side in route handlers (Node runtime), so the session cannot be forged
// from the browser the way the old `sessionStorage` flag could.

const SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'dev-insecure-secret-change-me'

if (
  !process.env.ADMIN_SESSION_SECRET &&
  process.env.NODE_ENV === 'production'
) {
  console.warn(
    '⚠️ ADMIN_SESSION_SECRET is not set in production. Set a long random value to secure admin sessions.'
  )
}

export const ADMIN_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours (seconds)

export function createSessionToken(username: string): string {
  const exp = Date.now() + SESSION_MAX_AGE * 1000
  const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString(
    'base64url'
  )
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifySessionToken(
  token: string | undefined | null
): { u: string } | null {
  if (!token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null

  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      u?: string
      exp?: number
    }
    if (!data.exp || Date.now() > data.exp || !data.u) return null
    return { u: data.u }
  } catch {
    return null
  }
}
