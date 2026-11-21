import crypto from 'crypto'

// Signed, httpOnly admin session cookie. The signature (HMAC-SHA256) is verified
// server-side in route handlers (Node runtime), so the session cannot be forged
// from the browser the way the old `sessionStorage` flag could.

// The signing secret MUST come from ADMIN_SESSION_SECRET. We deliberately do NOT
// fall back to a hardcoded constant or to SUPABASE_SERVICE_ROLE_KEY:
//  - a hardcoded fallback is public in the repo, so anyone could forge a cookie;
//  - reusing the DB service key as an HMAC key conflates two different secrets.
// In production a missing secret makes session issue/verify fail closed (throws
// on create, returns null on verify). A dev-only fallback keeps local dev usable.
const DEV_FALLBACK_SECRET = 'dev-only-insecure-secret'

function getSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET
  if (s && s.length >= 16) return s
  if (process.env.NODE_ENV !== 'production') return DEV_FALLBACK_SECRET
  return null
}

export const ADMIN_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours (seconds)

export function createSessionToken(username: string): string {
  const SECRET = getSecret()
  if (!SECRET) {
    throw new Error(
      'ADMIN_SESSION_SECRET is not set (min 16 chars). Refusing to issue an admin session.'
    )
  }
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
  const SECRET = getSecret()
  if (!SECRET) return null
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
