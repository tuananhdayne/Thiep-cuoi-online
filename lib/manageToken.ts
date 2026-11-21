import crypto from 'crypto'

// Per-couple secret "manage token". The plaintext is shown to the creator once
// (in the manage link); only its SHA-256 hash is stored in the DB. Knowing the
// slug alone is no longer enough to manage a wedding.

export function generateManageToken(): string {
  return crypto.randomBytes(24).toString('base64url') // ~32 url-safe chars
}

export function hashManageToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/** Constant-time compare of a plaintext token against a stored hash. */
export function manageTokenMatches(
  token: string | undefined | null,
  storedHash: string | undefined | null
): boolean {
  if (!token || !storedHash) return false
  const a = Buffer.from(hashManageToken(token))
  const b = Buffer.from(storedHash)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/** Cookie name that holds the plaintext manage token for a given couple. */
export function manageCookieName(coupleId: string | number): string {
  return `mt_${String(coupleId).replace(/[^a-zA-Z0-9]/g, '')}`
}

export const MANAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
